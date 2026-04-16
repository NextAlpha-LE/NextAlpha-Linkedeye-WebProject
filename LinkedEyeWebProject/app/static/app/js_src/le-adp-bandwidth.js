/**
 * le-adp-bandwidth.js
 * Bandwidth Monitoring Dashboard — APM Status Page.
 * Renders: summary stats, aggregate row, grouped link monitor, sparklines, trend charts.
 */

var BWPage = {
    charts: {},
    sparkCharts: {},
    refreshInterval: null,
    clockInterval: null,
    hasRealData: false,

    // ── Category config (icon, colour, bg-tint, display label) ───────────────
    CAT: {
        INTERNET:       { icon: 'fa-globe',          color: '#3b82f6', bg: 'rgba(59,130,246,0.13)',   label: 'Internet'      },
        MPLS:           { icon: 'fa-server',         color: '#ef4444', bg: 'rgba(239,68,68,0.13)',    label: 'MPLS'          },
        CLOUD:          { icon: 'fa-cloud',          color: '#06b6d4', bg: 'rgba(6,182,212,0.13)',    label: 'Cloud'         },
        AWS:            { icon: 'fa-cloud',          color: '#06b6d4', bg: 'rgba(6,182,212,0.13)',    label: 'Cloud'         },
        VPN:            { icon: 'fa-lock',           color: '#f59e0b', bg: 'rgba(245,158,11,0.13)',   label: 'VPN'           },
        EXCHANGE:       { icon: 'fa-chart-line',     color: '#ef4444', bg: 'rgba(239,68,68,0.13)',    label: 'Exchange'      },
        FIREWALL:       { icon: 'fa-shield-alt',     color: '#10b981', bg: 'rgba(16,185,129,0.13)',   label: 'Firewall'      },
        FORTIGATE:      { icon: 'fa-shield-alt',     color: '#10b981', bg: 'rgba(16,185,129,0.13)',   label: 'Firewall'      },
        CISCO:          { icon: 'fa-server',         color: '#a855f7', bg: 'rgba(168,85,247,0.13)',   label: 'Cisco'         },
        'LOAD BALANCER':{ icon: 'fa-balance-scale',  color: '#06b6d4', bg: 'rgba(6,182,212,0.13)',    label: 'Load Balancer' }
    },

    // ── Init ───────────────────────────────────────────────────────────────

    init: function () {
        console.log('BWPage init');
        this.site = new URLSearchParams(window.location.search).get('site');
        
        this.startClock();
        this.bindTimeFilters();
        this.fetchAll();

        if (this.refreshInterval) clearInterval(this.refreshInterval);
        this.refreshInterval = setInterval(() => {
            if ($('#page-bandwidth').hasClass('active')) this.fetchAll();
        }, 30000);
    },

    startClock: function () {
        if (this.clockInterval) clearInterval(this.clockInterval);
        const updateClock = () => {
            const now = new Date();
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const day = days[now.getDay()];
            let hrs = now.getHours();
            const ampm = hrs >= 12 ? 'PM' : 'AM';
            hrs = hrs % 12 || 12; // convert to 12-hour format
            const mins = String(now.getMinutes()).padStart(2, '0');
            const secs = String(now.getSeconds()).padStart(2, '0');
            const timeStr = `${day} ${String(hrs).padStart(2, '0')}:${mins}:${secs} ${ampm}`;
            const clockEl = document.getElementById('bw-live-clock');
            if (clockEl) clockEl.textContent = timeStr;
        };
        updateClock();
        this.clockInterval = setInterval(updateClock, 1000);
    },

    bindTimeFilters: function () {
        const btns = document.querySelectorAll('.bw-time-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active styling from all
                btns.forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'transparent';
                    b.style.color = '#94a3b8';
                });
                // Add active styling to clicked
                e.target.classList.add('active');
                e.target.style.background = '#fff';
                e.target.style.color = '#1e293b';
                // Trigger a fetchAll logic if necessary here
            });
        });
    },

    fetchAll: function () {
        this.fetchSummary();
        this.fetchInterfaceStatus();
    },

    // ── Sync ───────────────────────────────────────────────────────────────

    forceSync: function () {
        if (!this.site) return;
        const $btn = $('#btn-bw-sync');
        const orig = $btn.html();
        $btn.html('<i class="fas fa-spinner fa-spin"></i> Syncing…').prop('disabled', true);
        requestDataFromServer('/bod-eodstatus/bandwidth-sync', { site: this.site }, 'GET')
        .done((res) => { if (res.status === 200) { this.hasRealData = true; this.fetchAll(); } })
        .always(() => { $btn.html(orig).prop('disabled', false); });
    },

    // ── Summary Stats (top 4 le-stat cards) ───────────────────────────────

    fetchSummary: function () {
        if (!this.site) return;
        requestDataFromServer('/bod-eodstatus/bandwidth-summary', { site: this.site }, 'GET')
        .done((res) => {
            if (res.status !== 200) return;
            const s = res.summary;
            if (!this.hasRealData && s.exchange.rx === 0 && s.aws.rx === 0) {
                this._simulateSummary(s);
            } else if (s.exchange.rx > 0 || s.aws.rx > 0) {
                this.hasRealData = true;
            }
            $('#stat-bw-exchange').text((s.exchange.rx + s.exchange.tx).toFixed(2));
            $('#stat-bw-aws').text((s.aws.rx + s.aws.tx).toFixed(2));
            $('#stat-bw-firewall').text((s.fortigate.rx + s.fortigate.tx).toFixed(2));
            $('#stat-bw-vpn').text((s.vpn.rx + s.vpn.tx).toFixed(2));
            $('#bw-last-updated').text(new Date().toLocaleTimeString('en-US', {
                hour12:true, hour:'2-digit', minute:'2-digit', second:'2-digit'
            }).toLowerCase());
        });
    },

    _simulateSummary: function (s) {
        s.exchange.rx = 45.2;  s.exchange.tx  = 12.8;
        s.aws.rx      = 155.4; s.aws.tx       = 88.2;
        s.fortigate.rx = 210.5; s.fortigate.tx = 45.1;
        s.vpn.rx       = 5.2;  s.vpn.tx       = 1.1;
    },

    // Format Mbps value → "288 Mbps" or "1.9 Gbps"
    _fmtMbps: function (mbps) {
        if (mbps >= 1000) return (mbps / 1000).toFixed(1) + ' Gbps';
        return Math.round(mbps) + ' Mbps';
    },

    // ── Interface Status (grouped table + aggregate row + sparklines) ──────

    fetchInterfaceStatus: function () {
        if (!this.site) return;
        requestDataFromServer('/bod-eodstatus/bandwidth-status', { site: this.site }, 'GET')
        .done((res) => {
            if (res.status !== 200) return;
            let data = res.data;
            if ((!data || !data.length) && !this.hasRealData) data = this._demoInterfaces();
            this.renderAggregateRow(data);
            this.renderGroupedTable(data);
            this.renderSparklines(data);
        });
    },

    // ── Demo Data ──────────────────────────────────────────────────────────

    _demoInterfaces: function () {
        return [
            // INTERNET
            { interface: 'ISP Primary — Airtel',    source_type: 'INTERNET', priority: 'P1', status: 'UP',   rx_bytes_total: 307e6, tx_bytes_total: 240e6, speed_mbps: 1000,  uptime: '99.97%', instance: 'ISP-GW-01' },
            { interface: 'ISP Secondary — Jio',     source_type: 'INTERNET', priority: 'P2', status: 'UP',   rx_bytes_total:  50e6, tx_bytes_total:  39e6, speed_mbps:  500,  uptime: '99.91%', instance: 'ISP-GW-02' },
            // MPLS
            { interface: 'MPLS — Mumbai DC Primary',source_type: 'MPLS',     priority: 'P1', status: 'UP',   rx_bytes_total: 596e6, tx_bytes_total: 351e6, speed_mbps: 1000,  uptime: '100%',   instance: 'MPLS-PE-01' },
            { interface: 'MPLS — Mumbai DC Secondary',source_type:'MPLS',    priority: 'P2', status: 'UP',   rx_bytes_total:  12e6, tx_bytes_total:   8e6, speed_mbps: 1000,  uptime: '99.99%', instance: 'MPLS-PE-02' },
            // CLOUD
            { interface: 'AWS Direct Connect',      source_type: 'CLOUD',    priority: 'P1', status: 'UP',   rx_bytes_total: 242e6, tx_bytes_total: 172e6, speed_mbps: 1000,  uptime: '99.95%', instance: 'AWS-DX-01' },
            { interface: 'Azure ExpressRoute',      source_type: 'CLOUD',    priority: 'P2', status: 'UP',   rx_bytes_total: 156e6, tx_bytes_total:  90e6, speed_mbps:  500,  uptime: '99.88%', instance: 'AZURE-ER-01' },
            // VPN
            { interface: 'IPsec — DR Site Chennai', source_type: 'VPN',      priority: 'P1', status: 'UP',   rx_bytes_total:  21e6, tx_bytes_total:  45e6, speed_mbps:  100,  uptime: '99.92%', instance: 'VPN-GW-01' },
            { interface: 'SSL VPN — Remote Users',  source_type: 'VPN',      priority: 'P2', status: 'UP',   rx_bytes_total: 104e6, tx_bytes_total:  58e6, speed_mbps:  200,  uptime: '99.85%', instance: 'VPN-GW-02' },
            // EXCHANGE
            { interface: 'NSE Primary Exchange',    source_type: 'EXCHANGE',  priority: 'P1', status: 'UP',   rx_bytes_total: 735e6, tx_bytes_total: 474e6, speed_mbps: 1000,  uptime: '100%',   instance: 'NSE-FIX-01' },
            { interface: 'BSE Primary Exchange',    source_type: 'EXCHANGE',  priority: 'P1', status: 'UP',   rx_bytes_total: 425e6, tx_bytes_total: 322e6, speed_mbps: 1000,  uptime: '100%',   instance: 'BSE-FIX-01' },
            // FIREWALL
            { interface: 'FortiGate WAN1',          source_type: 'FIREWALL',  priority: 'P1', status: 'UP',   rx_bytes_total: 2300e6,tx_bytes_total:2300e6, speed_mbps:10000,  uptime: '100%',   instance: 'FG-Primary' },
            // LOAD BALANCER
            { interface: 'F5 Uplink',               source_type: 'LOAD BALANCER',priority:'P1',status:'UP',   rx_bytes_total: 580e6, tx_bytes_total: 210e6, speed_mbps: 10000, uptime: '100%',   instance: 'F5-BIG-IP' }
        ];
    },

    // ── Aggregate Row (Total Capacity / Throughput / Utilization / Links) ─

    renderAggregateRow: function (data) {
        const up = data.filter(d => d.status === 'UP');
        const totalCap  = data.reduce((a, d) => a + (d.speed_mbps || 0), 0);          // Mbps
        const totalRx   = data.reduce((a, d) => a + (d.rx_bytes_total || 0) / 1e6, 0);// Mbps
        const totalTx   = data.reduce((a, d) => a + (d.tx_bytes_total || 0) / 1e6, 0);
        const throughput= totalRx + totalTx;
        const avgUtil   = totalCap > 0 ? (throughput / totalCap * 100) : 0;

        const fmt = v => v >= 1000 ? (v / 1000).toFixed(1) + ' Gbps' : v.toFixed(1) + ' Mbps';

        $('#agg-total-capacity').text(fmt(totalCap));
        $('#agg-throughput').text(fmt(throughput));
        $('#agg-utilization').text(avgUtil.toFixed(1) + '%');
        $('#agg-active-links').text(up.length);
        $('#bw-header-link-count').text(data.length);
        $('#bw-link-badge').text(data.length + ' links');
    },

    // ── Grouped Link Monitor Table ─────────────────────────────────────────

    renderGroupedTable: function (data) {
        const $body = $('#bw-status-body');
        $body.empty();

        if (!data || !data.length) {
            $body.append('<tr><td colspan="8" class="text-center py-4 text-muted">No data. Click Sync.</td></tr>');
            return;
        }

        // Group by source_type preserving order of first appearance
        const order  = [];
        const groups = {};
        data.forEach(item => {
            const cat = (item.source_type || 'OTHER').toUpperCase();
            if (!groups[cat]) { groups[cat] = []; order.push(cat); }
            groups[cat].push(item);
        });

        order.forEach(cat => {
            const cfg   = this.CAT[cat] || { icon: 'fa-network-wired', color: '#888', label: cat };
            const items = groups[cat];

            // Group header row
            $body.append(`
                <tr class="bw-group-row">
                    <td colspan="8" style="color:${cfg.color}">
                        <i class="fas ${cfg.icon} me-2" style="color:${cfg.color}"></i>
                        ${cfg.label.toUpperCase()} (${items.length})
                    </td>
                </tr>
            `);
            items.forEach(item => {
                const rxMbps  = item.rx_bytes_total / 1e6;
                const txMbps  = item.tx_bytes_total / 1e6;
                const rxFmt   = this._fmtMbps(rxMbps);
                const txFmt   = this._fmtMbps(txMbps);
                const util    = Math.min(((rxMbps + txMbps) / (item.speed_mbps || 1000) * 100), 200).toFixed(1);
                const dot     = item.status === 'UP' ? 'var(--green)' : 'var(--red)';
                const barClr  = +util > 90 ? 'var(--red)' : +util > 70 ? 'var(--orange)' : 'var(--green)';
                const capFmt  = item.speed_mbps >= 1000
                    ? (item.speed_mbps / 1000).toFixed(1) + ' Gbps'
                    : item.speed_mbps + ' Mbps';
                const catBadge   = `<span style="display:inline-block;padding:1px 8px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:0.5px;background:${cfg.bg};color:${cfg.color}">${cfg.label}</span>`;
                const priColor   = item.priority === 'P1' ? '#f59e0b' : 'var(--text-muted)';
                const uptimeClr  = (item.uptime || '100%') === '100%' ? 'var(--green)' : 'var(--text-secondary)';

                $body.append(`
                    <tr>
                        <td>
                            <div class="d-flex align-items-center gap-2">
                                <span style="width:8px;height:8px;border-radius:50%;background:${dot};display:inline-block;flex-shrink:0"></span>
                                <div>
                                    <div style="font-weight:600;color:var(--text-primary);font-size:12px">${item.interface}</div>
                                    <div style="font-size:10px;color:var(--text-muted)">${item.instance || ''}</div>
                                </div>
                            </div>
                        </td>
                        <td>${catBadge}</td>
                        <td style="font-weight:700;color:${priColor};font-size:11px">${item.priority || '—'}</td>
                        <td>
                            <span style="color:var(--green);font-weight:600;font-size:12px">
                                <i class="fas fa-arrow-down" style="font-size:8px;margin-right:3px;opacity:0.8"></i>${rxFmt}
                            </span>
                        </td>
                        <td>
                            <span style="color:var(--cyan);font-weight:600;font-size:12px">
                                <i class="fas fa-arrow-up" style="font-size:8px;margin-right:3px;opacity:0.8"></i>${txFmt}
                            </span>
                        </td>
                        <td style="min-width:130px">
                            <div class="d-flex align-items-center gap-2">
                                <div style="flex:1;height:5px;background:rgba(255,255,255,0.07);border-radius:3px">
                                    <div style="width:${Math.min(+util,100)}%;height:100%;background:${barClr};border-radius:3px"></div>
                                </div>
                                <span style="font-size:10px;color:var(--text-muted);min-width:38px;text-align:right">${util}%</span>
                            </div>
                        </td>
                        <td style="color:var(--text-muted);font-size:11px">${capFmt}</td>
                        <td style="color:${uptimeClr};font-size:11px;font-weight:600">${item.uptime || '100%'}</td>
                    </tr>
                `);
            });
        });
    },

    // ── Sparklines Grid ────────────────────────────────────────────────────

    renderSparklines: function (data) {
        const $grid = $('#bw-sparklines-grid');
        $grid.empty();

        // Destroy old sparkline charts
        Object.keys(this.sparkCharts).forEach(k => {
            if (this.sparkCharts[k]) { this.sparkCharts[k].destroy(); }
        });
        this.sparkCharts = {};

        if (!data || !data.length) return;

        data.forEach((item, idx) => {
            const util     = Math.min(((item.rx_bytes_total + item.tx_bytes_total) / 1e6 / (item.speed_mbps || 1000) * 100), 200).toFixed(1);
            const lineClr  = +util > 90 ? '#ef4444' : +util > 70 ? '#f59e0b' : '#10b981';
            const canvasId = `spark-${idx}`;
            // Extract name before the dash (e.g. "ISP Primary -- Airtel" -> "ISP Primary")
            const shortName = item.interface.split(/[-—]/)[0].trim();

            // Card layout: Left Column (Name + Pct), Right Column (Chart)
            $grid.append(`
                <div class="col-md-3 col-sm-6">
                    <div class="bw-spark-card" style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                        <div style="display:flex; flex-direction:column; justify-content:center; flex-shrink:0; max-width:110px;">
                            <span class="bw-spark-name" title="${item.interface}">${shortName}</span>
                            <div class="bw-spark-pct" style="color:${lineClr}; margin-top:2px;">${util}%</div>
                        </div>
                        <div class="bw-spark-chart" style="flex:1; height:32px; position:relative;">
                            <canvas id="${canvasId}"></canvas>
                        </div>
                    </div>
                </div>
            `);
        });

        // Render sparkline Charts after DOM is ready
        setTimeout(() => {
            // Map line colour → translucent fill (hex replace trick doesn't work for hex values)
            const fillMap = {
                '#ef4444': 'rgba(239,68,68,0.08)',
                '#f59e0b': 'rgba(245,158,11,0.08)',
                '#10b981': 'rgba(16,185,129,0.08)'
            };

            data.forEach((item, idx) => {
                const util    = +((item.rx_bytes_total + item.tx_bytes_total) / 1e6 / (item.speed_mbps || 1000) * 100).toFixed(1);
                const lineClr = util > 90 ? '#ef4444' : util > 70 ? '#f59e0b' : '#10b981';
                const fillClr = fillMap[lineClr];
                const points  = this._sparkPoints(util);
                const ctx     = document.getElementById(`spark-${idx}`);
                if (!ctx) return;

                this.sparkCharts[`spark-${idx}`] = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: points.map((_, i) => i),
                        datasets: [{
                            label: ' ',
                            data: points,
                            borderColor: lineClr,
                            backgroundColor: fillClr,
                            borderWidth: 1.5,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 0,
                            pointHoverRadius: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        events: [],
                        // Chart.js v2 syntax to hide legend & tooltips
                        legend: { display: false },
                        tooltips: { enabled: false },
                        // Chart.js v3/v4 syntax
                        plugins: {
                            legend:  { display: false },
                            tooltip: { enabled: false }
                        },
                        scales: {
                            // Chart.js v3/v4 syntax
                            x: { display: false, border: { display: false } },
                            y: { display: false, border: { display: false }, beginAtZero: true, grace: '10%' },
                            // Chart.js v2 syntax
                            xAxes: [{ display: false, gridLines: { display: false } }],
                            yAxes: [{ display: false, gridLines: { display: false }, ticks: { display: false, beginAtZero: true } }]
                        },
                        animation: { duration: 300 }
                    }
                });
            });
        }, 80);


    },

    _sparkPoints: function (center) {
        const pts = [];
        let v = center * 0.8;
        for (let i = 0; i < 20; i++) {
            v = Math.max(0, v + (Math.random() - 0.48) * center * 0.25);
            pts.push(+v.toFixed(1));
        }
        return pts;
    },
};
