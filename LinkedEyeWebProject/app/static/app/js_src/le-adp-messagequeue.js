// le-adp-messagequeue.js
// Fetches from messagequeue_views.py which queries the local analytics database.

var MQ_API_BASE = '/bod-eodstatus';

// ─── State ────────────────────────────────────────────────
var _mqCharts    = {};
var _mqWired     = false;
var _mqRefreshSeq = 0;
var _mqLastSite  = null;
var _mqSiteUrl   = '';

// Segment colour map
var MQ_SEG_COLORS = {
    NSE: 'rgb(255,82,82)',
    NFO: 'rgb(255,179,71)',
    BSE: 'rgb(76,175,80)',
    BFO: 'rgb(149,117,205)',
};
function mqSegColor(seg) { return MQ_SEG_COLORS[seg] || 'rgb(200,200,200)'; }

// ─── Utility ─────────────────────────────────────────────
function mqFmtNum(n, digits) {
    if (n === null || n === undefined || n === '') return '--';
    var v = Number(n);
    if (!isFinite(v)) return '--';
    if (typeof digits === 'number')
        return v.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
    return v.toLocaleString();
}
function mqSafeText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
}
function mqSetLoading(root, isLoading) {
    var ind = root.querySelector('#mqLoadingIndicator');
    if (ind) ind.style.display = isLoading ? '' : 'none';
    // .seg-badge are divs, not form controls -- .disabled is a no-op on them,
    // so only the real controls (select/inputs/buttons) are covered here.
    root.querySelectorAll('#tradeDateSelect, #timeStart, #timeEnd, .time-btn')
        .forEach(function (el) { el.disabled = isLoading; });
}
function mqSafeDestroy(chart) {
    try { if (chart) chart.destroy(); } catch (e) {}
}
// Also destroy any orphaned Chart.js instance registered on a canvas element
function mqDestroyCanvas(canvasId) {
    try {
        var el = document.getElementById(canvasId);
        if (!el) return;
        if (typeof Chart !== 'undefined' && Chart.getChart) {
            var existing = Chart.getChart(el);
            if (existing) existing.destroy();
        }
    } catch (e) {}
}
function mqQs(params) {
    var esc = encodeURIComponent;
    return Object.keys(params)
        .filter(function (k) { return params[k] !== undefined && params[k] !== null && params[k] !== ''; })
        .map(function (k) { return esc(k) + '=' + esc(String(params[k])); })
        .join('&');
}

var _mqAlertEnabled = false;

function mqAlert(title, msg, type) {
    if (!_mqAlertEnabled) return;   // only alert when tab is explicitly opened
    _mqAlertEnabled = false;        // reset so auto-refresh doesn't re-fire
    var textColor = type === 'error' ? '#ff8a80' : '#e0e0e0';
    if (typeof swal === 'function') {
        swal({
            title: title || "Data Missing",
            text: "<span style='color:" + textColor + ";font-size:14px;'>" + (msg || "Database or Table not found. Check with administrator.") + "</span>",
            html: true,
            type: type || "warning",
            confirmButtonText: "OK",
            confirmButtonColor: type === "error" ? "#ff5252" : "#e99123"
        });
    } else {
        alert(title + ": " + msg);
    }
}

// ─── HTTP helpers ─────────────────────────────────────────
function mqFetch(url) {
    return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            var resp = null;
            try { resp = JSON.parse(xhr.responseText); } catch (e) { resp = null; }
            if (resp) resp.status = resp.status || xhr.status;
            else resp = { status: xhr.status, error: "Network Error" };
            resolve(resp);
        };
        xhr.onerror = function () { resolve({ status: 500, error: "Network Error" }); };
        xhr.send();
    });
}

// ─── Page entry-point ─────────────────────────────────────
var MQPage = {
    init: function () {
        var root = document.getElementById('page-messagequeue');
        if (!root) return;
        if (typeof window.Chart === 'undefined') return;
        if (!_mqWired) { mqWireControls(root); _mqWired = true; }
        _mqAlertEnabled = true;   // user explicitly clicked MQ tab
        mqLoadDates(root);
    },
    refresh: function () {
        var root = document.getElementById('page-messagequeue');
        if (root) mqRefresh(root);
    }
};
window.MQPage = MQPage;

// ─── Control wiring ───────────────────────────────────────
function mqWireControls(root) {
    // Time-preset buttons
    root.querySelectorAll('.time-btn[data-start][data-end]').forEach(function (btn) {
        btn.onclick = function () {
            root.querySelectorAll('.time-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var tsEl = root.querySelector('#timeStart');
            var teEl = root.querySelector('#timeEnd');
            if (tsEl) tsEl.value = btn.dataset.start;
            if (teEl) teEl.value = btn.dataset.end;
            mqRefresh(root);
        };
    });
    // Segment badges toggle
    root.querySelectorAll('.seg-badge[data-seg]').forEach(function (btn) {
        btn.onclick = function () { btn.classList.toggle('inactive'); mqRefresh(root); };
    });
    // Date selector
    var dSel = root.querySelector('#tradeDateSelect');
    if (dSel) { dSel.onchange = function () { mqRefresh(root); }; }
}

// ─── Load available dates ─────────────────────────────────
function mqLoadDates(root) {
    mqFetch(MQ_API_BASE + '/messagequeue-dates').then(function (resp) {
        if (!resp) { mqRefresh(root); return; }
        if (resp.status === 503 || resp.status === 500) {
            mqAlert("Configuration Error", resp.error || "Database error fetching dates.", "error");
            mqRefresh(root); return;
        }
        if (resp.status !== 200) { mqRefresh(root); return; }
        var dates = resp.dates || [];
        var sel   = root.querySelector('#tradeDateSelect');
        if (sel) {
            sel.innerHTML = '';
            if (!dates.length) {
                var opt = document.createElement('option');
                opt.value = ''; opt.textContent = 'No dates available'; sel.appendChild(opt);
            } else {
                dates.forEach(function (d, idx) {
                    var opt = document.createElement('option');
                    opt.value = d; opt.textContent = d;
                    if (idx === 0) opt.selected = true;
                    sel.appendChild(opt);
                });
            }
        }
        mqRefresh(root);
    });
}

// ─── Main refresh ─────────────────────────────────────────
function mqRefresh(root) {
    var seq    = ++_mqRefreshSeq;
    var dateEl = root.querySelector('#tradeDateSelect');
    var tsEl   = root.querySelector('#timeStart');
    var teEl   = root.querySelector('#timeEnd');

    var fileDate  = (dateEl && dateEl.value) || '';
    var timeStart = (tsEl && tsEl.value) || '09:15';
    var timeEnd   = (teEl && teEl.value) || '15:35';

    var activeSegs = [];
    root.querySelectorAll('.seg-badge[data-seg]').forEach(function (b) {
        if (!b.classList.contains('inactive')) activeSegs.push(b.dataset.seg);
    });
    if (!activeSegs.length) activeSegs = ['NSE', 'NFO', 'BSE', 'BFO'];

    var p = { file_date: fileDate, time_start: timeStart, time_end: timeEnd };

    mqSetLoading(root, true);

    Promise.all([
        mqFetch(MQ_API_BASE + '/messagequeue-stats?'   + mqQs(p)),
        mqFetch(MQ_API_BASE + '/messagequeue-data?'    + mqQs(Object.assign({}, p, { segment: activeSegs.join(',') }))),
        mqFetch(MQ_API_BASE + '/messagequeue-latency?' + mqQs(p)),
    ]).then(function (arr) {
        if (seq !== _mqRefreshSeq) return;   // a newer refresh is already in flight
        mqSetLoading(root, false);

        var statsResp = arr[0], dataResp = arr[1], latResp = arr[2];

        // Error Check
        var failed = [statsResp, dataResp, latResp].filter(function(r) { return r && (r.status === 503 || r.status === 500); })[0];
        if (failed) {
            mqAlert("Database Error", failed.error || "One or more tables are missing.", "error");
        } else if (dataResp && dataResp.status === 200 && (!dataResp.data || dataResp.data.length === 0)) {
            mqAlert("No Data", "Data is not present for the selected date.", "info");
        }

        // Always render, even on failure/empty -- passing {} clears stat tiles,
        // tables and charts back to their empty state. Rendering only on
        // status===200 left the PREVIOUS date's numbers and charts on screen
        // whenever a request failed or returned nothing, so changing the date
        // looked like it silently did nothing.
        mqRenderStats(statsResp && statsResp.status === 200 ? statsResp : {}, root);
        mqRenderQueue(dataResp && dataResp.status === 200 ? dataResp : {}, statsResp, root);
        mqRenderLatency(latResp && latResp.status === 200 ? latResp : {}, statsResp, root);
    });
}

// ─── Render stat cards ────────────────────────────────────
function mqRenderStats(resp, root) {
    var qStats = resp.queue_stats    || {};
    var lat    = resp.latency_stats  || {};
    var segLat = resp.seg_latency    || {};

    // ── Peak Queue ──────────────────────────────────────────
    var bestPeak = { peak: 0, segment: '', pts: 0 };
    Object.keys(qStats).forEach(function (s) {
        if (qStats[s].peak_queue > bestPeak.peak) {
            bestPeak.peak    = qStats[s].peak_queue;
            bestPeak.segment = s;
            bestPeak.pts     = qStats[s].total_points;
        }
    });
    mqSafeText('mqStatPeakQueueVal', mqFmtNum(bestPeak.peak));
    mqSafeText('mqStatPeakQueueSub', bestPeak.segment ? bestPeak.segment : '--');

    // ── Avg Queue ───────────────────────────────────────────
    mqSafeText('mqStatAvgQueueVal', mqFmtNum(resp.avg_all, 1));
    mqSafeText('mqStatAvgQueueSub', 'all segments');

    // ── Data Points ─────────────────────────────────────────
    mqSafeText('mqStatDataPointsVal', mqFmtNum(resp.total_data_points));
    mqSafeText('mqStatDataPointsSub', 'queue records');

    // ── P50 OMS ─────────────────────────────────────────────
    mqSafeText('mqStatP50OmsVal', mqFmtNum(resp.overall_p50, 1));
    mqSafeText('mqStatP50OmsSub', 'median latency');

    // ── Avg OMS ─────────────────────────────────────────────
    mqSafeText('mqStatAvgOmsVal', mqFmtNum(lat.avg_oms_latency, 1));
    mqSafeText('mqStatAvgOmsSub', 'mean OMS');

    // ── Total Orders ────────────────────────────────────────
    mqSafeText('mqStatTotalOrdersVal', lat.total_orders ? mqFmtNum(lat.total_orders) : '--');
    mqSafeText('mqStatTotalOrdersSub', 'order latency rows');

    // ── Segment badges — update pts counts ──────────────────
    ['NSE', 'NFO', 'BSE', 'BFO'].forEach(function (seg) {
        var el = document.getElementById('mqPts' + seg);
        if (!el) return;
        var pts = qStats[seg] ? qStats[seg].total_points : 0;
        el.textContent = pts ? mqFmtNum(pts) + ' pts' : '0 pts';
    });

    // ── Latency breakdown table ──────────────────────────────
    var tbody = document.getElementById('mqLatencyTableBody');
    if (tbody && Object.keys(segLat).length) {
        var segOrder = ['NSE', 'NFO', 'BSE', 'BFO'];
        var rows = '';
        segOrder.forEach(function (seg) {
            if (!segLat[seg]) return;
            var s = segLat[seg];
            var dot = '<span style="background:' + mqSegColor(seg) + ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:6px;"></span>';
            rows += '<tr>'
                + '<td>' + dot + seg + '</td>'
                + '<td>' + mqFmtNum(s.orders) + '</td>'
                + '<td style="color:var(--green)">' + mqFmtNum(s.p50, 1) + '</td>'
                + '<td>' + mqFmtNum(s.avg, 1) + '</td>'
                + '<td>' + mqFmtNum(s.p95, 1) + '</td>'
                + '<td>' + mqFmtNum(s.p99, 1) + '</td>'
                + '<td style="color:var(--red)">' + mqFmtNum(s.max, 1) + '</td>'
                + '</tr>';
        });
        // Any extra segments not in the fixed list
        Object.keys(segLat).forEach(function (seg) {
            if (segOrder.indexOf(seg) !== -1) return;
            var s = segLat[seg];
            rows += '<tr>'
                + '<td>' + seg + '</td>'
                + '<td>' + mqFmtNum(s.orders) + '</td>'
                + '<td style="color:var(--green)">' + mqFmtNum(s.p50, 1) + '</td>'
                + '<td>' + mqFmtNum(s.avg, 1) + '</td>'
                + '<td>' + mqFmtNum(s.p95, 1) + '</td>'
                + '<td>' + mqFmtNum(s.p99, 1) + '</td>'
                + '<td style="color:var(--red)">' + mqFmtNum(s.max, 1) + '</td>'
                + '</tr>';
        });
        tbody.innerHTML = rows || '<tr><td colspan="7" class="text-center text-muted">No data available in table</td></tr>';
    } else if (tbody) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No data available in table</td></tr>';
    }
}

// ─── Render queue chart + per-segment mini-charts ─────────
function mqRenderQueue(resp, statsResp, root) {
    var allData   = resp.data || [];
    var qStats    = (statsResp && statsResp.queue_stats) || {};
    var fileDate  = resp.file_date || '';
    var totalPts  = resp.total_points || 0;

    // ── Badge for chart date ─────────────────────────────────
    mqSafeText('mqMainBadgeDate', fileDate);
    mqSafeText('mqMainSubtitle',
        (root.querySelector('#timeStart') ? root.querySelector('#timeStart').value : '') + ' – ' +
        (root.querySelector('#timeEnd')   ? root.querySelector('#timeEnd').value   : '') +
        ' IST • ' + mqFmtNum(totalPts) + ' pts • ' + allData.length + ' series combined'
    );

    // ── Latency badge (orders count from stats) ──────────────
    if (statsResp && statsResp.latency_stats) {
        mqSafeText('mqLatencyBadgeOrders', mqFmtNum(statsResp.latency_stats.total_orders));
    }

    // ── Main combined chart ──────────────────────────────────
    var mainCtx = document.getElementById('mainQueueChart');
    if (mainCtx) {
        mqSafeDestroy(_mqCharts.mainQueue);
        mqDestroyCanvas('mainQueueChart');
        _mqCharts.mainQueue = null;
        var datasets = allData.map(function (s) {
            var color = mqSegColor(s.segment);
            return {
                label: s.segment,
                data: s.points.map(function (p) { return { x: p.time, y: p.queue_size }; }),
                borderColor: color,
                backgroundColor: color.replace('rgb(', 'rgba(').replace(')', ',0.15)'),
                borderWidth: 2,
                pointRadius: 2,
                pointHoverRadius: 5,
                fill: true,
                tension: 0.3,
            };
        });
        _mqCharts.mainQueue = new Chart(mainCtx, {
            type: 'line',
            data: { datasets: datasets },
            options: {
                animation: false,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { type: 'category', ticks: { maxTicksLimit: 12, color: '#888', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#888', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.07)' } },
                },
                plugins: { legend: { labels: { color: '#ccc', font: { size: 11 } } } },
            }
        });
    }

    // ── Per-segment mini-charts (Dynamic Grid) ────────────────
    var container = document.getElementById('mqMiniChartsContainer');
    if (container) {
        container.innerHTML = ''; // Clear old cards
        
        allData.forEach(function (segData, i) {
            var segId   = segData.segment;
            var baseSeg = 'NSE'; 
            if (segId.indexOf('NFO') > -1) baseSeg = 'NFO';
            else if (segId.indexOf('BSE') > -1) baseSeg = 'BSE';
            else if (segId.indexOf('BFO') > -1) baseSeg = 'BFO';

            var stat  = qStats[segId] || {};
            var color = mqSegColor(baseSeg);
            var canvasId = 'chart_seg_' + segId.replace(/[^a-zA-Z0-9]/g, '_');
            
            // Create Card HTML
            var cardHtml = 
                '<div class="col-lg-6">' +
                    '<div class="le-card seg-card-border" style="border-top-color:' + color + '">' +
                        '<div class="d-flex justify-content-between align-items-start">' +
                            '<div>' +
                                '<div class="card-title" style="font-size:13px;">' +
                                    '<span class="dot" style="background:' + color + ';width:8px;height:8px;border-radius:50%;display:inline-block"></span>' +
                                    ' <span>' + segId + '</span> &nbsp;<span style="font-size:11px;color:var(--text-muted);font-weight:400;">' + (segData.line || 'Line-1') + ' • ' + (stat.total_points || 0).toLocaleString() + ' pts</span>' +
                                '</div>' +
                                '<div class="card-subtitle" style="margin-bottom:8px;">Avg: ' + mqFmtNum(stat.avg_queue, 1) + ' | Peak: ' + mqFmtNum(stat.peak_queue) + '</div>' +
                            '</div>' +
                            '<div class="peak-value" style="color:' + color + '">Peak ' + mqFmtNum(stat.peak_queue) + '</div>' +
                        '</div>' +
                        '<div class="chart-wrap" style="height:200px;">' +
                            '<canvas id="' + canvasId + '"></canvas>' +
                        '</div>' +
                    '</div>' +
                '</div>';
                
            container.insertAdjacentHTML('beforeend', cardHtml);

            // Render Chart
            var ctx = document.getElementById(canvasId);
            if (!ctx) return;
            
            // We use the segment name as a key in _mqCharts to allow persistence/cleanup
            mqSafeDestroy(_mqCharts[canvasId]);
            _mqCharts[canvasId] = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: segId,
                        data: segData.points.map(function (p) { return { x: p.time, y: p.queue_size }; }),
                        borderColor: color,
                        backgroundColor: color.replace('rgb(', 'rgba(').replace(')', ',0.3)'),
                        borderWidth: 2,
                        pointRadius: 2,
                        pointHoverRadius: 5,
                        fill: true,
                        tension: 0.3,
                    }]
                },
                options: {
                    animation: false,
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { type: 'category', ticks: { maxTicksLimit: 6, color: '#666', font: { size: 9 } }, grid: { display: false } },
                        y: { ticks: { color: '#666', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { mode: 'index', intersect: false, bodyFont: { size: 10 } }
                    }
                }
            });
        });
    }
    
}

// ─── Render latency chart ─────────────────────────────────
function mqRenderLatency(resp, statsResp, root) {
    var pts = resp.data || [];
    var totalOrders = resp.total_orders || 0;

    // Update latency card subtitle
    mqSafeText('mqLatencySubtitle',
        'Per-minute OMS latency avg/max  •  ' + mqFmtNum(totalOrders) + ' orders in range'
    );
    mqSafeText('mqLatencyBadgeOrders', mqFmtNum(totalOrders));

    var ctx = document.getElementById('latencyChart');
    if (!ctx) return;

    // Destroy both our reference AND any Chart.js canvas registry entry
    mqSafeDestroy(_mqCharts.latency);
    mqDestroyCanvas('latencyChart');
    _mqCharts.latency = null;

    if (!pts.length) return;

    _mqCharts.latency = new Chart(ctx, {
        type: 'line',
        data: {
            labels: pts.map(function (p) { return p.time; }),
            datasets: [
                {
                    label: 'Avg OMS (\u00b5s)',
                    data: pts.map(function (p) { return p.avg_oms; }),
                    borderColor: 'rgb(233,145,35)',
                    backgroundColor: 'rgba(233,145,35,0.08)',
                    borderWidth: 1.5,
                    pointRadius: 0,
                    fill: true,
                    tension: 0.3,
                },
                {
                    label: 'Max OMS (\u00b5s)',
                    data: pts.map(function (p) { return p.max_oms; }),
                    borderColor: 'rgba(255,82,82,0.6)',
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderDash: [4, 3],
                    pointRadius: 0,
                    fill: false,
                    tension: 0.3,
                }
            ]
        },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: { maxTicksLimit: 12, color: '#888', font: { size: 10 } },
                    grid:  { color: 'rgba(255,255,255,0.05)' }
                },
                y: {
                    ticks: { color: '#888', font: { size: 10 } },
                    grid:  { color: 'rgba(255,255,255,0.07)' }
                }
            },
            plugins: {
                legend: { labels: { color: '#ccc', font: { size: 11 } } },
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            return item.dataset.label + ': ' + mqFmtNum(item.parsed.y, 1) + ' \u00b5s';
                        }
                    }
                }
            }
        }
    });
}
