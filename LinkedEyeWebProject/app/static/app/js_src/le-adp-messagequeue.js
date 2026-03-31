// Fetches from messagequeue_views.py which queries linkedeye.* using Django's
// default connection with schema-qualified names — same pattern as
// notification_system.events in notification/views.py.

var MQ_API_BASE = '/bod-eodstatus'; // Flattened paths follow this base
// ─── State ────────────────────────────────────────────────

var _mqCharts = {};
var _mqWired = false;
var _mqRefreshSeq = 0;
var _mqLastSite = null;
var _mqSiteUrl = '';

// ─── Site Utils ───────────────────────────────────────────

// Read site dynamically from URL on every call — NOT cached at script load.
function mqGetCurrentSite() {
    return new URLSearchParams(document.location.search).get('site') || '';
}

// ─── Utility ─────────────────────────────────────────────

function mqFmtNum(n, digits) {
    if (n === null || n === undefined || n === '') return '--';
    var v = Number(n);
    if (!isFinite(v)) return '--';
    if (typeof digits === 'number') {
        return v.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
    }
    return v.toLocaleString();
}

function mqSafeText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
}

function mqQs(params) {
    var esc = encodeURIComponent;
    return Object.keys(params)
        .filter(function (k) { return params[k] !== undefined && params[k] !== null && params[k] !== ''; })
        .map(function (k) { return esc(k) + '=' + esc(String(params[k])); })
        .join('&');
}

function mqFetch(url) {
    // If a site-specific URL base is set, prepend it
    var finalUrl = url;
    if (_mqSiteUrl && url.indexOf('http') !== 0) {
        // MATCH "on-board devices" style: base + path (ensuring no double slash)
        var base = _mqSiteUrl;
        if (base.endsWith('/') && url.startsWith('/')) {
            finalUrl = base + url.substring(1);
        } else if (!base.endsWith('/') && !url.startsWith('/')) {
            finalUrl = base + '/' + url;
        } else {
            finalUrl = base + url;
        }
    }

    console.log('--- MQ FETCH ---', finalUrl);

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", finalUrl, true);
        // MATCH "on-board devices" headers
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch (e) {
                    console.warn('MQ JSON parse error', finalUrl, e);
                    resolve(null);
                }
            } else {
                console.error('MQ fetch failed', finalUrl, xhr.status);
                resolve(null);
            }
        };
        xhr.onerror = function () {
            console.error('MQ fetch error', finalUrl);
            resolve(null);
        };
        xhr.send();
    });
    // BUG FIX: removed dead fetchOrderLatency/fetchQueueLine1/fetchQueueLine2 calls
    // that were placed after the return statement — they never ran.
    // These are now called correctly inside mqRefresh() below.
}

// Local fetch function - does NOT prepend remote site URL
// Used for endpoints that query linkedeye database directly from Django
function mqFetchLocal(url) {
    console.log('--- MQ FETCH LOCAL ---', url);

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch (e) {
                    console.warn('MQ JSON parse error', url, e);
                    resolve(null);
                }
            } else {
                console.error('MQ fetch failed', url, xhr.status);
                resolve(null);
            }
        };
        xhr.onerror = function () {
            console.error('MQ fetch error', url);
            resolve(null);
        };
        xhr.send();
    });
}

function mqSafeDestroy(chart) {
    try { if (chart && chart.destroy) chart.destroy(); } catch (e) { /* noop */ }
}

function mqMergeTimeline(seriesList) {
    var set = {};
    seriesList.forEach(function (s) {
        (s.points || []).forEach(function (p) { if (p && p.time) set[p.time] = true; });
    });
    return Object.keys(set).sort();
}

function mqBuildLookup(points) {
    var map = {};
    (points || []).forEach(function (p) { map[p.time] = p.queue_size; });
    return map;
}

function mqAlign(labels, lookup) {
    return labels.map(function (t) {
        return Object.prototype.hasOwnProperty.call(lookup, t) ? lookup[t] : null;
    });
}

function mqBaseSeg(seg) {
    return String(seg || '').split('-')[0].toUpperCase();
}

// ─── Chart Config ─────────────────────────────────────────

var MQ_COLORS = {
    NSE: 'rgb(255,82,82)',
    NFO: 'rgb(255,179,71)',
    BSE: 'rgb(76,175,80)',
    BFO: 'rgb(179,136,255)',
    ACCENT: 'rgb(233,145,35)'
};

function mqGetChartOptions(yLabel) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: { color: '#888', font: { size: 11 }, boxWidth: 12, boxHeight: 3, padding: 14 }
            },
            tooltip: {
                backgroundColor: 'rgba(18,18,18,0.95)',
                borderColor: 'rgba(255,255,255,0.08)',
                borderWidth: 1,
                titleColor: '#ccc',
                bodyColor: '#aaa',
                titleFont: { size: 12, weight: '600' },
                bodyFont: { size: 11 },
                padding: 10,
                cornerRadius: 6,
                displayColors: true,
                boxWidth: 10,
                boxHeight: 3
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                ticks: { color: '#555', font: { size: 10, family: 'Consolas, monospace' }, maxTicksLimit: 12, maxRotation: 0 },
                border: { display: false }
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                ticks: { color: '#555', font: { size: 10 }, padding: 6 },
                border: { display: false },
                title: yLabel ? { display: true, text: yLabel, color: '#888', font: { size: 10 } } : undefined
            }
        }
    };
}

function mqDatasetLine(label, data, color, fillAlpha, dashed) {
    return {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: typeof fillAlpha === 'number'
            ? color.replace('rgb(', 'rgba(').replace(')', ',' + fillAlpha + ')')
            : 'transparent',
        borderWidth: dashed ? 1.5 : 1.2,
        pointRadius: 0,
        pointHoverRadius: 3,
        fill: typeof fillAlpha === 'number',
        tension: 0.3,
        borderDash: dashed ? [4, 3] : undefined,
        spanGaps: false
    };
}

function mqUpdateSiteUrl(site, callback) {
    if (!site) {
        _mqSiteUrl = '';
        if (callback) callback();
        return;
    }
    console.log('--- MQ: Fetching le_url for site ---', site);
    $.ajax({
        url: '/lesites/getallsitenames',
        type: 'GET',
        data: { type: 'clicksite', site: site }
    }).done(function (response) {
        try {
            var res = typeof response === 'string' ? JSON.parse(response) : response;
            if (res.status == 200 && res.data && res.data.length > 0) {
                _mqSiteUrl = res.data[0].le_url || '';
                console.log('--- MQ: Site le_url is ---', _mqSiteUrl);
            } else {
                _mqSiteUrl = '';
            }
        } catch (e) {
            console.warn('MQ: Error parsing site url response', e);
            _mqSiteUrl = '';
        }
        if (callback) callback();
    }).fail(function () {
        console.warn('MQ: Failed to fetch site le_url');
        _mqSiteUrl = '';
        if (callback) callback();
    });
}

// ─── Analytics table data (stored after fetch, used by render functions) ──

var _analyticsData = {
    orderLatency: null,
    queueLine1: null,
    queueLine2: null
};

// ─── MQPage ───────────────────────────────────────────────

var MQPage = {
    init: function () {
        console.log('--- MQPage.init ---');
        var root = document.getElementById('mqPage');
        if (!root) { console.warn('MQPage: #mqPage not found'); return; }
        if (typeof window.Chart === 'undefined') { console.warn('MQPage: Chart.js not loaded'); return; }

        var currentSite = mqGetCurrentSite();

        if (!_mqWired) {
            mqWireControls(root);
            _mqWired = true;
        }

        if (currentSite !== _mqLastSite) {
            console.log('MQPage: site changed from', _mqLastSite, 'to', currentSite, '— updating URL and reloading');
            _mqLastSite = currentSite;
            mqUpdateSiteUrl(currentSite, function () {
                mqLoadDates(root);
            });
        } else {
            mqRefresh(root);
        }
    }
};

window.MQPage = MQPage;

// ─── Wire Controls ────────────────────────────────────────

function mqWireControls(root) {
    console.log('--- mqWireControls ---');

    root.querySelectorAll('.time-btn[data-start][data-end]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            root.querySelectorAll('.time-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var startEl = root.querySelector('#timeStart');
            var endEl = root.querySelector('#timeEnd');
            if (startEl) startEl.value = btn.dataset.start;
            if (endEl) endEl.value = btn.dataset.end;
            mqRefresh(root);
        });
    });

    root.querySelectorAll('.seg-badge[data-seg]').forEach(function (badge) {
        badge.addEventListener('click', function () {
            badge.classList.toggle('inactive');
            mqRefresh(root);
        });
    });

    var dateSel = root.querySelector('#tradeDateSelect');
    if (dateSel) {
        dateSel.addEventListener('change', function () { mqRefresh(root); });
    }

    var tsEl = root.querySelector('#timeStart');
    var teEl = root.querySelector('#timeEnd');
    if (tsEl) tsEl.addEventListener('change', function () { mqRefresh(root); });
    if (teEl) teEl.addEventListener('change', function () { mqRefresh(root); });
}

// ─── Load Dates ───────────────────────────────────────────

function mqLoadDates(root) {
    var site = mqGetCurrentSite();
    var url = MQ_API_BASE + '/messagequeue-dates' + (site ? '?site=' + encodeURIComponent(site) : '');
    console.log('--- mqLoadDates ---', url);

    mqFetch(url).then(function (resp) {
        console.log('MQ dates response:', resp);

        if (!resp || resp.status !== 200) {
            console.warn('MQ dates: bad response', resp);
            mqRefresh(root);
            return;
        }

        var dates = resp.dates || [];
        var sel = root.querySelector('#tradeDateSelect');

        if (sel) {
            sel.innerHTML = '';
            if (!dates.length) {
                var opt = document.createElement('option');
                opt.value = '';
                opt.textContent = 'No dates';
                sel.appendChild(opt);
            } else {
                dates.forEach(function (d, idx) {
                    var opt = document.createElement('option');
                    opt.value = d;
                    opt.textContent = d;
                    if (idx === 0) opt.selected = true;
                    sel.appendChild(opt);
                });
            }
        }

        mqRefresh(root);
    });
}

// ─── Refresh ──────────────────────────────────────────────
// FIX: fetchOrderLatency, fetchQueueLine1, fetchQueueLine2 are now called
// here in parallel with the existing MQ API calls, using the current site.

function mqRefresh(root) {
    var seq = ++_mqRefreshSeq;

    var dateEl = root.querySelector('#tradeDateSelect');
    var tsEl = root.querySelector('#timeStart');
    var teEl = root.querySelector('#timeEnd');

    var fileDate = (dateEl && dateEl.value) || '';
    var timeStart = (tsEl && tsEl.value) || '09:15';
    var timeEnd = (teEl && teEl.value) || '15:35';

    var activeSegs = [];
    root.querySelectorAll('.seg-badge[data-seg]').forEach(function (b) {
        if (!b.classList.contains('inactive')) activeSegs.push(b.dataset.seg);
    });
    if (!activeSegs.length) activeSegs = ['NSE', 'NFO', 'BSE', 'BFO'];

    var p = { site: mqGetCurrentSite(), file_date: fileDate, time_start: timeStart, time_end: timeEnd };

    var statsUrl = MQ_API_BASE + '/messagequeue-stats?' + mqQs(p);
    var dataUrl = MQ_API_BASE + '/messagequeue-data?' + mqQs(Object.assign({}, p, { segment: activeSegs.join(',') }));
    var latUrl = MQ_API_BASE + '/messagequeue-latency?' + mqQs(p);

    var currentSite = mqGetCurrentSite();

    console.log('--- mqRefresh ---', 'date:', fileDate, 'time:', timeStart, '-', timeEnd, 'segs:', activeSegs, 'site:', currentSite);

    // Run all 6 fetches in parallel
    // stats/data/latency → remote site via le_url (each site has its own analytics DB)
    // order_latency/queue_line1/queue_line2 → local Django (central DB)
    Promise.all([
        mqFetch(statsUrl),
        mqFetch(dataUrl),
        mqFetch(latUrl),
        fetchOrderLatency(currentSite),
        fetchQueueLine1(currentSite),
        fetchQueueLine2(currentSite)
    ]).then(function (arr) {
        if (seq !== _mqRefreshSeq) { console.log('MQ stale response, skip'); return; }

        var statsResp = arr[0];
        var dataResp = arr[1];
        var latResp = arr[2];

        // Store analytics results globally so render functions can use them
        _analyticsData.orderLatency = arr[3];
        _analyticsData.queueLine1 = arr[4];
        _analyticsData.queueLine2 = arr[5];

        console.log('MQ stats resp  — status:', statsResp && statsResp.status);
        console.log('MQ data  resp  — status:', dataResp && dataResp.status, 'series:', dataResp && dataResp.series_count);
        console.log('MQ lat   resp  — status:', latResp && latResp.status, 'points:', latResp && latResp.total_points);
        console.log('order_latency  — status:', _analyticsData.orderLatency && _analyticsData.orderLatency.status, 'rows:', _analyticsData.orderLatency && _analyticsData.orderLatency.data && _analyticsData.orderLatency.data.length);
        console.log('queue_line1    — status:', _analyticsData.queueLine1 && _analyticsData.queueLine1.status, 'rows:', _analyticsData.queueLine1 && _analyticsData.queueLine1.data && _analyticsData.queueLine1.data.length);
        console.log('queue_line2    — status:', _analyticsData.queueLine2 && _analyticsData.queueLine2.status, 'rows:', _analyticsData.queueLine2 && _analyticsData.queueLine2.data && _analyticsData.queueLine2.data.length);

        if (statsResp && statsResp.status === 200) mqRenderStats(statsResp);
        if (dataResp && dataResp.status === 200) mqRenderQueue(dataResp, statsResp);
        if (latResp && latResp.status === 200) mqRenderLatency(latResp);
    });
}

// ─── Render: Stats Cards ──────────────────────────────────

function mqRenderStats(resp) {
    console.log('--- mqRenderStats ---', resp.file_date, resp.time_range);

    var qStats = resp.queue_stats || {};
    var pct = resp.latency_percentiles || {};
    var lat = resp.latency_stats || {};
    var pctBySeg = resp.latency_percentiles_by_segment || {};

    var totalPoints = 0;
    var weightedAvg = 0;
    var weightedDen = 0;
    var bestPeak = { peak: 0, segment: '', time: '' };
    var byBase = { NSE: 0, NFO: 0, BSE: 0, BFO: 0 };

    Object.keys(qStats).forEach(function (seg) {
        var s = qStats[seg] || {};
        var pts = Number(s.total_points || 0);
        var avg = Number(s.avg_queue || 0);
        var pk = Number(s.peak_queue || 0);

        totalPoints += pts;
        weightedAvg += avg * pts;
        weightedDen += pts;

        var b = mqBaseSeg(seg);
        if (Object.prototype.hasOwnProperty.call(byBase, b)) byBase[b] += pts;

        if (pk > bestPeak.peak) bestPeak = { peak: pk, segment: seg, time: s.peak_time || '' };
    });

    mqSafeText('mqPtsNSE', mqFmtNum(byBase.NSE) + ' pts');
    mqSafeText('mqPtsNFO', mqFmtNum(byBase.NFO) + ' pts');
    mqSafeText('mqPtsBSE', mqFmtNum(byBase.BSE) + ' pts');
    mqSafeText('mqPtsBFO', mqFmtNum(byBase.BFO) + ' pts');

    mqSafeText('mqStatPeakQueueVal', mqFmtNum(bestPeak.peak));
    mqSafeText('mqStatPeakQueueSub',
        bestPeak.segment ? bestPeak.segment + (bestPeak.time ? ' @ ' + bestPeak.time : '') : '--');

    var avgQueueAll = weightedDen ? (weightedAvg / weightedDen) : 0;
    mqSafeText('mqStatAvgQueueVal', mqFmtNum(avgQueueAll, 1));
    mqSafeText('mqStatAvgQueueSub',
        Object.keys(qStats).length ? 'across ' + Object.keys(qStats).length + ' series' : '--');

    mqSafeText('mqStatDataPointsVal', mqFmtNum(totalPoints));
    mqSafeText('mqStatDataPointsSub',
        Object.keys(qStats).length ? Object.keys(qStats).length + ' series' : '--');

    mqSafeText('mqStatP50OmsVal', mqFmtNum(pct.p50_oms, 1));
    mqSafeText('mqStatP50OmsSub',
        pct.p50_oms ? (pct.p50_oms / 1000).toFixed(3) + ' ms median' : '--');

    mqSafeText('mqStatAvgOmsVal', mqFmtNum(lat.avg_oms_latency, 2));
    mqSafeText('mqStatAvgOmsSub',
        lat.avg_oms_latency ? (lat.avg_oms_latency / 1000).toFixed(3) + ' ms mean' : '--');

    mqSafeText('mqStatTotalOrdersVal', mqFmtNum(lat.total_orders));
    mqSafeText('mqStatTotalOrdersSub', 'all segments');

    mqSafeText('mqMainBadgeDate', resp.file_date || '--');
    mqSafeText('mqMainSubtitle',
        (resp.time_range || '--') + ' IST \u2022 ' +
        mqFmtNum(totalPoints) + ' pts \u2022 ' +
        Object.keys(qStats).length + ' series combined');

    mqSafeText('mqLatencyBadgeOrders', mqFmtNum(lat.total_orders));
    mqSafeText('mqLatencySubtitle',
        'Per-minute P50, avg & max OMS latency (\u00b5s) \u2022 ' + (resp.time_range || '--'));

    var tbody = document.getElementById('mqLatencyTableBody');
    if (tbody) {
        tbody.innerHTML = '';
        var latSegs = resp.latency_by_segment || [];
        latSegs.forEach(function (r) {
            var seg = String(r.segment || '').toUpperCase();
            var p = pctBySeg[seg] || {};
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td><span style="color:var(--text-primary);font-weight:600">' + seg + '</span></td>' +
                '<td>' + mqFmtNum(r.orders) + '</td>' +
                '<td style="color:var(--green)">' + mqFmtNum(p.p50_oms, 1) + '</td>' +
                '<td>' + mqFmtNum(r.avg_oms, 2) + '</td>' +
                '<td>' + mqFmtNum(p.p95_oms, 2) + '</td>' +
                '<td>' + mqFmtNum(p.p99_oms, 2) + '</td>' +
                '<td style="color:var(--red)">' + mqFmtNum(r.max_oms, 2) + '</td>';
            tbody.appendChild(tr);
        });
    }
}

// ─── Render: Queue Charts ─────────────────────────────────

function mqRenderQueue(resp, statsResp) {
    console.log('--- mqRenderQueue ---', 'series:', resp.series_count, 'points:', resp.total_points);

    ['mainQueue', 'chartNSE5864', 'chartNSE2729', 'chartNFO13424', 'chartBSE'].forEach(function (k) {
        mqSafeDestroy(_mqCharts[k]);
        delete _mqCharts[k];
    });

    var series = resp.data || [];
    if (!series.length) {
        console.warn('MQ queue: no series data');
        mqSafeText('mqMainSubtitle', 'No data available for this date / time range');
        return;
    }

    var labels = mqMergeTimeline(series);
    var mainCanvas = document.getElementById('mainQueueChart');

    if (mainCanvas) {
        var datasets = series.map(function (s) {
            var b = mqBaseSeg(s.base_segment || s.segment);
            var color = MQ_COLORS[b] || MQ_COLORS.ACCENT;
            var fillAlpha = (b === 'NSE') ? 0.10 : 0.08;
            return mqDatasetLine(s.segment, mqAlign(labels, mqBuildLookup(s.points)), color, fillAlpha, false);
        });

        var opts = mqGetChartOptions('Queue Size');
        opts.spanGaps = false;

        _mqCharts.mainQueue = new Chart(mainCanvas, {
            type: 'line',
            data: { labels: labels, datasets: datasets },
            options: opts
        });
    }

    var qStats = (statsResp && statsResp.queue_stats) ? statsResp.queue_stats : {};

    function pointsOf(s) {
        return (qStats[s.segment] && qStats[s.segment].total_points)
            ? qStats[s.segment].total_points
            : (s.points || []).length;
    }
    function sortByPoints(a, b) { return pointsOf(b) - pointsOf(a); }

    var nseSeries = series.filter(function (s) { return mqBaseSeg(s.base_segment || s.segment) === 'NSE'; }).sort(sortByPoints);
    var nfoSeries = series.filter(function (s) { return mqBaseSeg(s.base_segment || s.segment) === 'NFO'; }).sort(sortByPoints);
    var bseSeries = series.filter(function (s) { return mqBaseSeg(s.base_segment || s.segment) === 'BSE'; }).sort(sortByPoints);
    var bfoSeries = series.filter(function (s) { return mqBaseSeg(s.base_segment || s.segment) === 'BFO'; }).sort(sortByPoints);

    var picks = [
        { idx: 0, canvasId: 'chartNSE5864', item: nseSeries[0] || null, color: MQ_COLORS.NSE },
        { idx: 1, canvasId: 'chartNSE2729', item: nseSeries[1] || nseSeries[0] || null, color: 'rgba(255,82,82,0.6)' },
        { idx: 2, canvasId: 'chartNFO13424', item: nfoSeries[0] || null, color: MQ_COLORS.NFO },
        { idx: 3, canvasId: 'chartBSE', item: bseSeries[0] || bfoSeries[0] || null, color: bseSeries[0] ? MQ_COLORS.BSE : MQ_COLORS.BFO }
    ];

    picks.forEach(function (pick) {
        if (!pick.item) return;

        var s = pick.item;
        var st = qStats[s.segment] || {};

        mqSafeText('mqSegTitle' + pick.idx, s.segment || '--');
        mqSafeText('mqSegMeta' + pick.idx, (s.line || st.line || '--') + (s.id_label ? ' / ' + s.id_label : ''));
        mqSafeText('mqSegPeak' + pick.idx, mqFmtNum(st.peak_queue));
        mqSafeText('mqSegSub' + pick.idx,
            mqFmtNum(st.total_points || (s.points || []).length) + ' pts' +
            ' \u2022 Peak: ' + mqFmtNum(st.peak_queue) +
            (st.peak_time ? ' @ ' + st.peak_time : '') +
            ' \u2022 Avg: ' + mqFmtNum(st.avg_queue, 1));

        var canvas = document.getElementById(pick.canvasId);
        if (!canvas) return;

        var labelsLocal = (s.points || []).map(function (pt) { return pt.time; });
        var valsLocal = (s.points || []).map(function (pt) { return pt.queue_size; });
        var ds = mqDatasetLine(s.segment, valsLocal, pick.color, 0.10, false);
        ds.pointRadius = labelsLocal.length <= 10 ? 3 : 0;
        ds.pointHoverRadius = labelsLocal.length <= 10 ? 6 : 3;

        var o = mqGetChartOptions('QSz');
        o.plugins = Object.assign({}, o.plugins, { legend: { display: false } });

        _mqCharts[pick.canvasId] = new Chart(canvas, {
            type: 'line',
            data: { labels: labelsLocal, datasets: [ds] },
            options: o
        });
    });
}

// ─── Render: Latency Chart ────────────────────────────────

function mqRenderLatency(resp) {
    console.log('--- mqRenderLatency ---', 'date:', resp.file_date, 'points:', resp.total_points);

    mqSafeDestroy(_mqCharts.latency);
    delete _mqCharts.latency;

    var rows = resp.data || [];
    var canvas = document.getElementById('latencyChart');
    if (!canvas || !rows.length) { console.warn('MQ latency: no canvas or no data'); return; }

    var labels = rows.map(function (r) { return r.time; });
    var p50 = rows.map(function (r) { return Number(r.p50_oms || 0); });
    var avg = rows.map(function (r) { return Number(r.avg_oms || 0); });
    var max = rows.map(function (r) { return Number(r.max_oms || 0); });

    var opts = mqGetChartOptions('Latency (\u00b5s)');
    opts.plugins = Object.assign({}, opts.plugins, {
        tooltip: Object.assign({}, opts.plugins.tooltip, {
            callbacks: {
                label: function (ctx) {
                    var v = ctx.parsed && typeof ctx.parsed.y === 'number' ? ctx.parsed.y : 0;
                    if (v >= 1000) {
                        return ctx.dataset.label + ': ' +
                            v.toLocaleString(undefined, { maximumFractionDigits: 1 }) +
                            ' \u00b5s (' + (v / 1000).toFixed(2) + ' ms)';
                    }
                    return ctx.dataset.label + ': ' +
                        v.toLocaleString(undefined, { maximumFractionDigits: 1 }) + ' \u00b5s';
                }
            }
        })
    });

    _mqCharts.latency = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                mqDatasetLine('P50 OMS (\u00b5s)', p50, MQ_COLORS.BSE, 0.10, false),
                mqDatasetLine('Avg OMS (\u00b5s)', avg, MQ_COLORS.NFO, null, false),
                mqDatasetLine('Max OMS (\u00b5s)', max, MQ_COLORS.NSE, null, true)
            ]
        },
        options: opts
    });
}

// ─── API Docs Toggle ──────────────────────────────────────

function toggleApiDocs(el) {
    var body = document.getElementById('apiDocsBody');
    if (!body) return;
    if (body.style.display === 'none') {
        body.style.display = '';
        if (el && el.classList) el.classList.remove('collapsed');
    } else {
        body.style.display = 'none';
        if (el && el.classList) el.classList.add('collapsed');
    }
}

// ─── Analytics Table Fetch Functions ─────────────────────
// Called inside mqRefresh() above as part of the parallel Promise.all.
// Uses mqFetchLocal — all site data lives in the single central DB,
// filtered by the site column. Same DB as messagequeue-stats/data/latency.

function fetchOrderLatency(site) {
    var url = MQ_API_BASE + '/messagequeue-order-latency' + (site ? '?site=' + encodeURIComponent(site) : '');
    return mqFetchLocal(url).then(function (result) {
        if (result) {
            console.log('[linkedeye] order_latency response:', result);
            if (result.status === 200) {
                console.log('order_latency fetched:', (result.data || []).length, 'rows');
                return result;
            }
            console.error('order_latency error:', result.msg);
        }
        return null;
    });
}

function fetchQueueLine1(site) {
    var url = MQ_API_BASE + '/messagequeue-queue-line1' + (site ? '?site=' + encodeURIComponent(site) : '');
    return mqFetchLocal(url).then(function (result) {
        if (result) {
            console.log('[linkedeye] queue_line1 response:', result);
            if (result.status === 200) {
                console.log('queue_line1 fetched:', (result.data || []).length, 'rows');
                return result;
            }
            console.error('queue_line1 error:', result.msg);
        }
        return null;
    });
}

function fetchQueueLine2(site) {
    var url = MQ_API_BASE + '/messagequeue-queue-line2' + (site ? '?site=' + encodeURIComponent(site) : '');
    return mqFetchLocal(url).then(function (result) {
        if (result) {
            console.log('[linkedeye] queue_line2 response:', result);
            if (result.status === 200) {
                console.log('queue_line2 fetched:', (result.data || []).length, 'rows');
                return result;
            }
            console.error('queue_line2 error:', result.msg);
        }
        return null;
    });
}

console.log('le-adp-messagequeue.js loaded — MQ_API_BASE:', MQ_API_BASE);