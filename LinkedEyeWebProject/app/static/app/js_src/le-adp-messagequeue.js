// Fetches from messagequeue_views.py which queries analytics database.
// Note: Isolation is handled by hitting remote le_url directly (ADP pattern).

var MQ_API_BASE = '/bod-eodstatus';

// ─── State ────────────────────────────────────────────────
var _mqCharts = {};
var _mqWired = false;
var _mqRefreshSeq = 0;
var _mqLastSite = null;
var _mqSiteUrl = '';

// ─── Site Utils ───────────────────────────────────────────
function mqGetCurrentSite() {
    return new URLSearchParams(document.location.search).get('site') || '';
}

// ─── Utility ─────────────────────────────────────────────
function mqFmtNum(n, digits) {
    if (n === null || n === undefined || n === '') return '--';
    var v = Number(n);
    if (!isFinite(v)) return '--';
    if (typeof digits === 'number') return v.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
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

function mqFetch(url, isRemote) {
    var finalUrl = url;
    if (isRemote && _mqSiteUrl) {
        var base = _mqSiteUrl.trim();
        var path = url.trim();
        if (path.indexOf('/') === 0) path = path.substring(1);
        finalUrl = base + (base.endsWith('/') ? '' : '/') + path;
        console.log('[MQ FETCH REMOTE] finalUrl:', finalUrl);
    } else {
        console.log('[MQ FETCH LOCAL] url:', url);
    }
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", finalUrl, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try { resolve(JSON.parse(xhr.responseText)); } catch(e) { resolve(null); }
            } else {
                console.warn('MQ fetch failed', finalUrl, xhr.status);
                resolve(null);
            }
        };
        xhr.onerror = function () { resolve(null); };
        xhr.send();
    });
}

function mqFetchLocal(url) {
    console.log('[MQ FETCH LOCAL]', url);
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) { try { resolve(JSON.parse(xhr.responseText)); } catch (e) { resolve(null); } }
            else { resolve(null); }
        };
        xhr.onerror = function () { resolve(null); };
        xhr.send();
    });
}

function mqUpdateSiteUrl(site, callback) {
    if (!site) { _mqSiteUrl = ''; if (callback) callback(); return; }
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
                console.log('--- MQ: Site le_url ---', _mqSiteUrl); 
            } else { 
                _mqSiteUrl = ''; 
            }
        } catch (e) { _mqSiteUrl = ''; }
        if (callback) callback();
    }).fail(function () { _mqSiteUrl = ''; if (callback) callback(); });
}

var _analyticsData = { orderLatency: null, queueLine1: null, queueLine2: null };

var MQPage = {
    init: function () {
        console.log('--- MQPage.init ---');
        var root = document.getElementById('mqPage');
        if (!root) return;
        if (typeof window.Chart === 'undefined') return;
        var currentSite = mqGetCurrentSite();
        if (!_mqWired) { mqWireControls(root); _mqWired = true; }
        if (currentSite !== _mqLastSite) { 
            _mqLastSite = currentSite; 
            mqUpdateSiteUrl(currentSite, function () { mqLoadDates(root); }); 
        } else { 
            mqRefresh(root); 
        }
    }
};
window.MQPage = MQPage;

function mqWireControls(root) {
    root.querySelectorAll('.time-btn[data-start][data-end]').forEach(function (btn) {
        btn.onclick = function () {
            root.querySelectorAll('.time-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            root.querySelector('#timeStart').value = btn.dataset.start;
            root.querySelector('#timeEnd').value = btn.dataset.end;
            mqRefresh(root);
        };
    });
    root.querySelectorAll('.seg-badge[data-seg]').forEach(function (btn) {
        btn.onclick = function () { btn.classList.toggle('inactive'); mqRefresh(root); };
    });
    var dSel = root.querySelector('#tradeDateSelect');
    if (dSel) { dSel.onchange = function () { mqRefresh(root); }; }
}

function mqLoadDates(root) {
    var isRemote = _mqSiteUrl && _mqSiteUrl.length > 5;
    var url = MQ_API_BASE + '/messagequeue-dates';
    console.log('[MQ] mqLoadDates -> url:', url, 'isRemote:', isRemote);

    mqFetch(url, isRemote).then(function (resp) {
        if (!resp || resp.status !== 200) { mqRefresh(root); return; }
        var dates = resp.dates || [], sel = root.querySelector('#tradeDateSelect');
        if (sel) {
            sel.innerHTML = '';
            if (!dates.length) { var opt = document.createElement('option'); opt.value = ''; opt.textContent = 'No dates'; sel.appendChild(opt); }
            else { dates.forEach(function (d, idx) { var opt = document.createElement('option'); opt.value = d; opt.textContent = d; if (idx === 0) opt.selected = true; sel.appendChild(opt); }); }
        }
        mqRefresh(root);
    });
}

function mqRefresh(root) {
    var seq = ++_mqRefreshSeq;
    var dateEl = root.querySelector('#tradeDateSelect'), tsEl = root.querySelector('#timeStart'), teEl = root.querySelector('#timeEnd');
    var fileDate = (dateEl && dateEl.value) || '', timeStart = (tsEl && tsEl.value) || '09:15', timeEnd = (teEl && teEl.value) || '15:35';
    var activeSegs = [];
    root.querySelectorAll('.seg-badge[data-seg]').forEach(function (b) { if (!b.classList.contains('inactive')) activeSegs.push(b.dataset.seg); });
    if (!activeSegs.length) activeSegs = ['NSE', 'NFO', 'BSE', 'BFO'];

    var isRemote = _mqSiteUrl && _mqSiteUrl.length > 5;
    var p = { file_date: fileDate, time_start: timeStart, time_end: timeEnd };

    Promise.all([
        mqFetch(MQ_API_BASE + '/messagequeue-stats?' + mqQs(p), isRemote),
        mqFetch(MQ_API_BASE + '/messagequeue-data?' + mqQs(Object.assign({}, p, { segment: activeSegs.join(',') })), isRemote),
        mqFetch(MQ_API_BASE + '/messagequeue-latency?' + mqQs(p), isRemote),
        mqFetchLocal('/bod-eodstatus/messagequeue-order-latency'),
        mqFetchLocal('/bod-eodstatus/messagequeue-queue-line1'),
        mqFetchLocal('/bod-eodstatus/messagequeue-queue-line2')
    ]).then(function (arr) {
        if (seq !== _mqRefreshSeq) return;
        var statsResp = arr[0], dataResp = arr[1], latResp = arr[2];
        _analyticsData.orderLatency = arr[3]; _analyticsData.queueLine1 = arr[4]; _analyticsData.queueLine2 = arr[5];
        if (statsResp && statsResp.status === 200) mqRenderStats(statsResp);
        if (dataResp && dataResp.status === 200) mqRenderQueue(dataResp, statsResp);
        if (latResp && latResp.status === 200) mqRenderLatency(latResp);
    });
}

function mqRenderStats(resp) {
    var qStats = resp.queue_stats || {}, pct = resp.latency_percentiles || {}, lat = resp.latency_stats || {};
    var bestPeak = { peak: 0, segment: '', time: '' };
    Object.keys(qStats).forEach(function (s) { if (qStats[s].peak_queue > bestPeak.peak) { bestPeak.peak = qStats[s].peak_queue; bestPeak.segment = s; bestPeak.time = qStats[s].peak_time; } });
    mqSafeText('mqStatPeakQueueVal', mqFmtNum(bestPeak.peak));
    mqSafeText('mqStatPeakQueueSub', bestPeak.segment ? bestPeak.segment + ' @ ' + bestPeak.time : '--');
    mqSafeText('mqStatAvgQueueVal', mqFmtNum(resp.avg_all, 1));
}

function mqRenderQueue(resp, stats) {
    var ctx = document.getElementById('mainQueueChart');
    if (!ctx) return;
    mqSafeDestroy(_mqCharts.mainQueue);
    var datasets = (resp.data || []).map(function (s) {
        return {
            label: s.segment, data: (s.points || []).map(function (p) { return { x: p.time, y: p.queue_size }; }),
            borderColor: 'rgb(255,82,82)', borderWidth: 1.2, pointRadius: 0, tension: 0.3
        };
    });
    _mqCharts.mainQueue = new Chart(ctx, { type: 'line', data: { datasets: datasets }, options: { scales: { x: { type: 'category' } } } });
}

function mqRenderLatency(resp) {
    var ctx = document.getElementById('latencyChart');
    if (!ctx) return;
    mqSafeDestroy(_mqCharts.latency);
    var pts = resp.data || [];
    _mqCharts.latency = new Chart(ctx, { 
        type: 'line', 
        data: { labels: pts.map(function(p){return p.time;}), datasets: [{ label: 'OMS', data: pts.map(function(p){return p.avg_oms;}), borderColor: 'rgb(233,145,35)' }] } 
    });
}
