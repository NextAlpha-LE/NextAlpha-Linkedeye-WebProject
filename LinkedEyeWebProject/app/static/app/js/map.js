var _0x4b7b4a = _0x39bc;
(function (_0x26d6c5, _0x1bb2e1) {
    var _0x521169 = _0x39bc,
        _0x28e253 = _0x26d6c5();
    while (!![]) {
        try {
            var _0x1669e8 = parseInt(_0x521169(0x1e3)) / 0x1 + parseInt(_0x521169(0x1eb)) / 0x2 * (parseInt(_0x521169(0x1f0)) / 0x3) + -parseInt(_0x521169(0x29e)) / 0x4 * (-parseInt(_0x521169(0x24a)) / 0x5) + -parseInt(_0x521169(0x335)) / 0x6 + parseInt(_0x521169(0x24b)) / 0x7 * (parseInt(_0x521169(0x308)) / 0x8) + parseInt(_0x521169(0x2c9)) / 0x9 * (parseInt(_0x521169(0x23c)) / 0xa) + -parseInt(_0x521169(0x277)) / 0xb;
            if (_0x1669e8 === _0x1bb2e1) break;
            else _0x28e253['push'](_0x28e253['shift']());
        } catch (_0x411fad) {
            _0x28e253['push'](_0x28e253['shift']());
        }
    }
}(_0x2362, 0x8e816));
var siteinfo, wsConnected = ![],
    connectionTries = 0x6,
    sitesData = [],
    count = 0x1,
    counts = 0x1,
    SiteObj, arr = {},
    statearr = {},
    dataarr = [],
    a, websitename = '',
    maplastreconnect = '',
    worldobject, isappended = !![],
    istableappended = !![],
    mclient = {},
    mapobj = {},
    mapsdata = '',
    allSiteNames = '',
    mapsitedata = {},
    mapintervaldata = {},
    worldstatusdata = {},
    targetdata = {},
    worldstatus = '',
    totalstatus = 0x0,
    sitecount = 0x0,
    tempObj = {
        'hardware': {
            'CRITICAL': 0x0,
            'OK': 0x0,
            'WARNING': 0x0,
            'UNKNOWN': 0x0
        },
        'software': {
            'CRITICAL': 0x0,
            'OK': 0x0,
            'WARNING': 0x0,
            'UNKNOWN': 0x0
        },
        'application': {
            'CRITICAL': 0x0,
            'OK': 0x0,
            'WARNING': 0x0,
            'UNKNOWN': 0x0
        }
    },
    chartdata_list = {},
    sitenull_list = {};
$(document)[_0x4b7b4a(0x2e2)](function () {
    var _0xde42dc = _0x4b7b4a;
    if (sessionStorage[_0xde42dc(0x294)]('tempobj')) {
        let _0x20cad6 = sessionStorage[_0xde42dc(0x294)](_0xde42dc(0x304)),
            _0x4e7f55 = sessionStorage[_0xde42dc(0x294)](_0xde42dc(0x2f6));
        fillHostServiceCount(JSON[_0xde42dc(0x2f9)](_0x20cad6)), $(_0xde42dc(0x280))[_0xde42dc(0x20d)](_0x4e7f55), $(_0xde42dc(0x2cf))['append']('<h3\x20style=\x22background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%;text-align:\x20center;top:\x2013%;position:\x20absolute;\x22>\x20REFRESHING....\x20</h3>'), sessionStorage[_0xde42dc(0x2b5)](_0xde42dc(0x304)), sessionStorage['removeItem'](_0xde42dc(0x2f6));
    }
});

function maprefresh() {
    var _0x2cb85a = _0x4b7b4a;
    document['getElementById'](_0x2cb85a(0x26e))[_0x2cb85a(0x25e)][_0x2cb85a(0x206)] = 0.3, document[_0x2cb85a(0x226)](_0x2cb85a(0x29f))[_0x2cb85a(0x25e)][_0x2cb85a(0x206)] = 0x1, $(_0x2cb85a(0x2ec))[_0x2cb85a(0x2b8)](), $(_0x2cb85a(0x33f))[_0x2cb85a(0x2b8)](), $(_0x2cb85a(0x1e8))[_0x2cb85a(0x2b8)](), mapsitedata = {}, sitecount = 0x0, mapload(), document[_0x2cb85a(0x226)](_0x2cb85a(0x2df))[_0x2cb85a(0x258)]['contains']('map-height') && document[_0x2cb85a(0x226)]('audience-map-div')[_0x2cb85a(0x258)][_0x2cb85a(0x28a)](_0x2cb85a(0x288)), count++;
}

function createHeatmap() {
    var _0x367d23 = _0x4b7b4a,
        _0x20bed0 = '',
        _0x55e88b = '';
    for (const [_0xa7a7bc, _0xdfd8f9] of Object[_0x367d23(0x2ad)](chartdata_list)) {
        var _0x2fb954 = _0x367d23(0x2c1);
        if (_0xdfd8f9[_0x367d23(0x22e)]['0'] > 0x0 || _0xdfd8f9[_0x367d23(0x1e7)]['0'] > 0x0 || _0xdfd8f9['application']['0'] > 0x0) _0x2fb954 = _0x367d23(0x2c1);
        else {
            if (_0xdfd8f9['hardware']['1'] > 0x0 || _0xdfd8f9[_0x367d23(0x1e7)]['1'] > 0x0 || _0xdfd8f9[_0x367d23(0x259)]['1'] > 0x0) _0x2fb954 = _0x367d23(0x202);
            else _0xdfd8f9['hardware']['2'] > 0x0 || _0xdfd8f9[_0x367d23(0x1e7)]['2'] > 0x0 || _0xdfd8f9[_0x367d23(0x259)]['2'] > 0x0 ? _0x2fb954 = _0x367d23(0x2ea) : _0x2fb954 = _0x367d23(0x1e4);
        }
        var _0x5802a8 = gettime();
        _0x55e88b += _0x367d23(0x1ea) + _0xa7a7bc + _0x367d23(0x323), _0x55e88b += _0x367d23(0x2a6) + _0xa7a7bc + _0x367d23(0x2d9) + _0xa7a7bc + _0x367d23(0x252) + _0xa7a7bc + _0x367d23(0x1f5) + _0x2fb954 + _0x367d23(0x319) + _0xa7a7bc + _0x367d23(0x222), _0x55e88b += _0x367d23(0x2ba) + _0xa7a7bc + _0x367d23(0x299) + _0xa7a7bc + '\x27\x20target\x20=\x20\x27_blank\x27\x20>\x20' + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x22e)]['0']) + _0x367d23(0x236), _0x55e88b += '<td\x20class=\x27td-min-width\x27\x20\x20id=\x27' + _0xa7a7bc + _0x367d23(0x20a) + _0xa7a7bc + '\x27\x20target\x20=\x20\x27_blank\x27\x20>\x20\x20' + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x22e)]['1']) + _0x367d23(0x236), _0x55e88b += _0x367d23(0x272) + _0xa7a7bc + 'hardware_ok\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:green;color:white\x27>\x20<a\x20\x20href\x20=\x20\x27/lesites?site=' + _0xa7a7bc + _0x367d23(0x248) + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x22e)]['2']) + _0x367d23(0x30e), _0x55e88b += _0x367d23(0x272) + _0xa7a7bc + 'hardware_unknown\x27\x20style=\x27border-right:3px\x20solid\x20#030303;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:white;color:black\x27><a\x20\x20href\x20=\x20\x27/lesites?site=' + _0xa7a7bc + '\x27\x20target\x20=\x20\x27_blank\x27\x20style=\x27color:black\x27\x20>\x20' + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x22e)]['3']) + _0x367d23(0x269), _0x55e88b += _0x367d23(0x272) + _0xa7a7bc + _0x367d23(0x216) + _0xa7a7bc + _0x367d23(0x248) + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x1e7)]['0']) + _0x367d23(0x30e), _0x55e88b += _0x367d23(0x272) + _0xa7a7bc + _0x367d23(0x262) + _0xa7a7bc + _0x367d23(0x21c) + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x1e7)]['1']) + _0x367d23(0x236), _0x55e88b += _0x367d23(0x272) + _0xa7a7bc + _0x367d23(0x325) + _0xa7a7bc + _0x367d23(0x26c) + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x1e7)]['2']) + _0x367d23(0x1fe), _0x55e88b += '<td\x20class=\x27td-min-width\x27\x20\x20id=\x27' + _0xa7a7bc + _0x367d23(0x224) + _0xa7a7bc + _0x367d23(0x27b) + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x1e7)]['3']) + _0x367d23(0x30e), _0x55e88b += _0x367d23(0x272) + _0xa7a7bc + 'application_critical\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:red;color:white\x27>\x20\x20<a\x20\x20href\x20=\x20\x27/lesites?site=' + _0xa7a7bc + _0x367d23(0x26c) + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x259)]['0']) + _0x367d23(0x30e), _0x55e88b += _0x367d23(0x272) + _0xa7a7bc + _0x367d23(0x2b9) + _0xa7a7bc + _0x367d23(0x26c) + parseInt(chartdata_list[_0xa7a7bc]['application']['1']) + _0x367d23(0x253), _0x55e88b += _0x367d23(0x272) + _0xa7a7bc + _0x367d23(0x2dd) + _0xa7a7bc + _0x367d23(0x248) + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x259)]['2']) + _0x367d23(0x30e), _0x55e88b += '<td\x20class=\x27td-min-width\x27\x20\x20id=\x27' + _0xa7a7bc + _0x367d23(0x261) + _0xa7a7bc + _0x367d23(0x217) + parseInt(chartdata_list[_0xa7a7bc][_0x367d23(0x259)]['3']) + _0x367d23(0x30e), _0x55e88b += _0x367d23(0x272) + _0xa7a7bc + 'datarefresh\x27\x20onclick=\x27seperateRef(\x22' + targetdata[_0xa7a7bc + _0x367d23(0x2e7)] + _0x367d23(0x265) + _0xa7a7bc + _0x367d23(0x273) + targetdata[_0xa7a7bc + _0x367d23(0x2e7)] + '</span>\x20\x20&emsp;&emsp;\x20&emsp;\x20\x20</td>', _0x55e88b += '<td\x20class=\x27td-min-width\x27\x20\x20id=\x27' + _0xa7a7bc + 'datatime\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;\x27>' + _0x5802a8['hour'] + ':' + _0x5802a8[_0x367d23(0x268)] + ':' + _0x5802a8['second'] + _0x367d23(0x2a4), _0x55e88b += '</tr>';
    }
    _0x20bed0 += '<div\x20id=\x22data-view\x22\x20style=\x22display:none\x22>', _0x20bed0 += _0x367d23(0x30a), _0x20bed0 += _0x367d23(0x315), _0x20bed0 += _0x367d23(0x328), _0x20bed0 += _0x367d23(0x2a7), _0x20bed0 += _0x367d23(0x2c2), _0x20bed0 += _0x367d23(0x321), _0x20bed0 += _0x367d23(0x221), _0x20bed0 += _0x367d23(0x283), _0x20bed0 += '</tr>', _0x20bed0 += _0x367d23(0x328), _0x20bed0 += _0x367d23(0x207), _0x20bed0 += _0x367d23(0x2cc), _0x20bed0 += '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-o-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>OK</span></th>', _0x20bed0 += _0x367d23(0x338), _0x20bed0 += '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-c-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>CRITICAL</span></th>', _0x20bed0 += _0x367d23(0x2cc), _0x20bed0 += '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-o-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>OK</span></th>', _0x20bed0 += _0x367d23(0x311), _0x20bed0 += _0x367d23(0x209), _0x20bed0 += _0x367d23(0x2cc), _0x20bed0 += '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-o-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>OK</span></th>', _0x20bed0 += _0x367d23(0x311), _0x20bed0 += '<th\x20class=\x22has-details\x22><i\x20class=\x22fas\x20fa-exchange-alt\x22\x20style=\x22display:contents\x20!important;font-size:20px\x22></i><span\x20class=\x22\x20details\x22>CONNECTIONS</span></th>', _0x20bed0 += _0x367d23(0x251), _0x20bed0 += _0x367d23(0x2eb), _0x20bed0 += _0x367d23(0x290), _0x20bed0 += _0x367d23(0x25b), _0x20bed0 += _0x55e88b, _0x20bed0 += _0x367d23(0x2be), _0x20bed0 += _0x367d23(0x339), _0x20bed0 += '</div>', $(_0x367d23(0x280))[_0x367d23(0x20d)](_0x20bed0), $(_0x367d23(0x2f7))[_0x367d23(0x32e)]({
        'bPaginate': ![],
        'bFilter': ![],
        'rowReorder': !![],
        'dom': _0x367d23(0x23b)
    }), sessionStorage[_0x367d23(0x1e1)]('heatmapHtml', $(_0x367d23(0x280))[_0x367d23(0x21f)]()), $(_0x367d23(0x2ec))['show'](), $('#right-arrow')[_0x367d23(0x284)]();
}

function appendheatmap(_0x43e501) {
    var _0x14ce8a = _0x4b7b4a;
    isappended = ![], fillHostServiceCount(tempObj), sessionStorage[_0x14ce8a(0x1e1)](_0x14ce8a(0x304), JSON['stringify'](tempObj)), document[_0x14ce8a(0x226)]('heat-map')['innerHTML'] = '', document[_0x14ce8a(0x226)](_0x14ce8a(0x213))['innerHTML'] = '', $(_0x14ce8a(0x280))['append'](_0x43e501), $('#refresh-btn')[_0x14ce8a(0x284)](), $('#heat-map-div')[_0x14ce8a(0x26b)]({
        'max-height': window['innerHeight']
    }), createHeatmap(), $(_0x14ce8a(0x203))[_0x14ce8a(0x32e)]({
        'bPaginate': ![],
        'bFilter': ![],
        'rowReorder': !![],
        'dom': _0x14ce8a(0x23b)
    });
}

function siteredirect(_0x2df24a, _0x5ea616) {
    var _0x5134bd = _0x4b7b4a;
    sessionStorage[_0x5134bd(0x1e1)](_0x5134bd(0x304), JSON[_0x5134bd(0x208)](tempObj)), sessionStorage['setItem'](_0x5134bd(0x2f6), $('#heat-map')[_0x5134bd(0x21f)]()), sessionStorage[_0x5134bd(0x1e1)](_0x5134bd(0x21a), _0x5ea616), window['open'](_0x2df24a, '_self');
}

function switchmap() {
    var _0x3d6836 = _0x4b7b4a;
    document[_0x3d6836(0x226)]('audience-map-div')[_0x3d6836(0x258)][_0x3d6836(0x2de)](_0x3d6836(0x27a)) ? (document[_0x3d6836(0x226)](_0x3d6836(0x2df))[_0x3d6836(0x258)][_0x3d6836(0x28a)](_0x3d6836(0x27a)), document[_0x3d6836(0x226)](_0x3d6836(0x2ee))[_0x3d6836(0x258)][_0x3d6836(0x30c)](_0x3d6836(0x27a)), document['getElementById'](_0x3d6836(0x2ee))[_0x3d6836(0x25e)][_0x3d6836(0x307)] = _0x3d6836(0x324), document[_0x3d6836(0x226)]('left-arrow')[_0x3d6836(0x25e)][_0x3d6836(0x206)] = 0x1, document['getElementById'](_0x3d6836(0x29f))[_0x3d6836(0x25e)][_0x3d6836(0x206)] = 0.3) : (document[_0x3d6836(0x226)](_0x3d6836(0x2ee))[_0x3d6836(0x258)][_0x3d6836(0x28a)](_0x3d6836(0x27a)), document[_0x3d6836(0x226)](_0x3d6836(0x2df))[_0x3d6836(0x258)]['add'](_0x3d6836(0x27a)), document[_0x3d6836(0x226)](_0x3d6836(0x2df))[_0x3d6836(0x25e)][_0x3d6836(0x307)] = _0x3d6836(0x220), document[_0x3d6836(0x226)](_0x3d6836(0x26e))[_0x3d6836(0x25e)][_0x3d6836(0x206)] = 0.3, document['getElementById'](_0x3d6836(0x29f))['style'][_0x3d6836(0x206)] = 0x1);
}

function switchview() {
    var _0x1a564a = _0x4b7b4a;
    document[_0x1a564a(0x226)](_0x1a564a(0x20f))[_0x1a564a(0x258)][_0x1a564a(0x2de)]('show-map') ? (document[_0x1a564a(0x226)](_0x1a564a(0x20f))[_0x1a564a(0x258)][_0x1a564a(0x28a)](_0x1a564a(0x27a)), document[_0x1a564a(0x226)](_0x1a564a(0x2d0))[_0x1a564a(0x258)][_0x1a564a(0x30c)](_0x1a564a(0x27a)), document[_0x1a564a(0x226)](_0x1a564a(0x26e))[_0x1a564a(0x25e)][_0x1a564a(0x206)] = 0x1, document[_0x1a564a(0x226)](_0x1a564a(0x29f))[_0x1a564a(0x25e)]['opacity'] = 0.3) : (document[_0x1a564a(0x226)]('heatmap-view')[_0x1a564a(0x258)][_0x1a564a(0x30c)](_0x1a564a(0x27a)), document['getElementById']('data-view')[_0x1a564a(0x258)][_0x1a564a(0x28a)](_0x1a564a(0x27a)), document[_0x1a564a(0x226)]('left-arrow')[_0x1a564a(0x25e)][_0x1a564a(0x206)] = 0.3, document[_0x1a564a(0x226)](_0x1a564a(0x29f))[_0x1a564a(0x25e)][_0x1a564a(0x206)] = 0x1);
}

function pinfunc(_0x46dc25, _0xd68e4e) {
    var _0x4e180c = _0x4b7b4a;
    _0x46dc25[_0x4e180c(0x258)][_0x4e180c(0x2de)]('selected-btn') ? (_0x46dc25[_0x4e180c(0x258)][_0x4e180c(0x28a)](_0x4e180c(0x2ed)), document[_0x4e180c(0x226)](_0xd68e4e)[_0x4e180c(0x258)]['remove'](_0x4e180c(0x33d))) : (_0x46dc25[_0x4e180c(0x258)][_0x4e180c(0x30c)](_0x4e180c(0x2ed)), document[_0x4e180c(0x226)](_0xd68e4e)[_0x4e180c(0x258)][_0x4e180c(0x30c)](_0x4e180c(0x33d)));
}

function pinheatmap(_0x51d97e) {
    var _0x2f476e = _0x4b7b4a,
        _0x5f9661 = document[_0x2f476e(0x226)](_0x51d97e),
        _0x5b78a0 = document[_0x2f476e(0x226)](_0x2f476e(0x263));
    _0x5f9661['classList'][_0x2f476e(0x2de)]('sticky-div') ? (_0x5f9661[_0x2f476e(0x258)][_0x2f476e(0x28a)](_0x2f476e(0x1f2)), _0x5b78a0[_0x2f476e(0x258)]['remove']('mdi-pin'), _0x5b78a0[_0x2f476e(0x258)][_0x2f476e(0x30c)](_0x2f476e(0x33e)), _0x5b78a0['style'][_0x2f476e(0x310)] = _0x2f476e(0x2e3), maprefresh()) : (_0x5f9661['classList'][_0x2f476e(0x30c)]('sticky-div'), _0x5b78a0[_0x2f476e(0x258)][_0x2f476e(0x28a)](_0x2f476e(0x33e)), _0x5b78a0['classList']['add'](_0x2f476e(0x327)), _0x5b78a0['style'][_0x2f476e(0x310)] = _0x2f476e(0x2bc));
}

function opensitesmodal(_0x74a263) {
    var _0x426f96 = _0x4b7b4a;
    _0x74a263[_0x426f96(0x258)][_0x426f96(0x2de)]('show-modal') ? _0x74a263[_0x426f96(0x258)]['remove'](_0x426f96(0x293)) : _0x74a263['classList'][_0x426f96(0x30c)](_0x426f96(0x293));
}
var getJSON = async function (_0x5c05ff, _0x23a117) {
    return await new Promise(function (_0x4aaa5c, _0x1fd607) {
        var _0x5e3910 = _0x39bc,
            _0x551fed = new XMLHttpRequest();
        _0x551fed[_0x5e3910(0x27c)](_0x5e3910(0x257), _0x5c05ff, !![]), _0x551fed[_0x5e3910(0x256)] = _0x5e3910(0x2a1), _0x551fed[_0x5e3910(0x26a)] = 0x1388, _0x551fed[_0x5e3910(0x2ce)] = function () {
            var _0xc29e = _0x5e3910,
                _0x5fffbf = _0x551fed[_0xc29e(0x24f)];
            _0x5fffbf == 0xc8 ? _0x4aaa5c(_0x551fed['response']) : _0x1fd607(_0x5fffbf);
        }, _0x551fed['ontimeout'] = () => {
            var _0x3511b0 = _0x5e3910;
            console[_0x3511b0(0x296)](_0x3511b0(0x298)), _0x1fd607({
                'site': _0x23a117,
                'status': _0x551fed[_0x3511b0(0x24f)],
                'statusText': _0x551fed[_0x3511b0(0x326)]
            });
        }, _0x551fed[_0x5e3910(0x1ec)] = function () {
            var _0x54525a = _0x5e3910;
            _0x1fd607({
                'site': _0x23a117,
                'status': _0x551fed[_0x54525a(0x24f)],
                'statusText': _0x551fed[_0x54525a(0x326)]
            });
        }, _0x551fed[_0x5e3910(0x1e6)]();
    });
};

function dismissfunc(_0x4dd080) {
    var _0x350a79 = _0x4b7b4a;
    _0x4dd080[_0x350a79(0x2af)][_0x350a79(0x25e)][_0x350a79(0x2c3)] = 'none';
}
async function triggerThis(_0x58d02d) {
    var _0x6c0355 = _0x4b7b4a,
        _0x64c031 = [],
        _0x10a069 = JSON[_0x6c0355(0x2f9)](_0x58d02d);
    siteinfo = _0x10a069[_0x6c0355(0x2e6)];
    var _0x5b786d = '',
        _0x1bc013 = '',
        _0x1099fd = 0x0,
        _0x4492bb = 0x0,
        _0x43696e, _0x4f2b76 = 0x0,
        _0x5b7657 = '';
    for (let _0x409549 = 0x0; _0x409549 < siteinfo[_0x6c0355(0x22c)]; _0x409549++) {
        var _0x56019b = siteinfo[_0x409549];
        const _0x3eef95 = new URL(_0x6c0355(0x219), _0x56019b[_0x6c0355(0x330)]),
            _0x52984b = new URLSearchParams();
        _0x52984b['set']('sitename', _0x56019b['sitename']), _0x3eef95[_0x6c0355(0x27d)] = _0x52984b['toString'](), await getJSON(new URL(_0x3eef95, _0x56019b['le_url']), _0x56019b[_0x6c0355(0x2a0)])[_0x6c0355(0x2ca)](function (_0xf36d60) {
            var _0x232b63 = _0x6c0355;
            if (_0xf36d60 == null) {
                var _0x49b468 = '';
                arr[_0x56019b[_0x232b63(0x316)]] = 'red';
                if (_0x4f2b76 < 0x1) { } else { }
                _0x4f2b76++;
            } else {
                _0x43696e = _0xf36d60[_0x232b63(0x2e6)];
                var _0x5bc2a7 = (Math[_0x232b63(0x2ff)]() * (1.5 - 0.0001) + 0.1)['toFixed'](0x4),
                    _0xe05589 = _0x232b63(0x1fa) + _0x56019b[_0x232b63(0x2a0)] + '\x20-\x20' + _0x43696e + '</h2>';
                $(_0x232b63(0x2b1))[_0x232b63(0x20d)](_0xe05589);
                var _0x4d074e = _0x43696e[_0x232b63(0x276)],
                    _0x9be5e0 = _0x43696e[_0x232b63(0x337)],
                    _0xd16cf2 = _0x43696e['adp'],
                    _0x47392a = _0x43696e[_0x232b63(0x210)];
                status = _0x4d074e === 0x0 || _0x9be5e0 === 0x0 || _0xd16cf2 === 0x0 || _0x47392a === 0x0 ? 0x0 : _0x4d074e === 0x1 || _0x9be5e0 === 0x1 || _0xd16cf2 === 0x1 || _0x47392a === 0x1 ? 0x1 : _0x4d074e === 0x2 && _0x9be5e0 === 0x2 && _0xd16cf2 === 0x2 && _0x47392a === 0x2 ? 0x2 : 0x3, statearr[_0x56019b['sitename']] = status == 0x1 ? 'orange' : status == 0x2 ? 'green' : status == 0x3 ? 'white' : 'red', _0x64c031[_0x232b63(0x242)]({
                    'latLng': [parseFloat(_0x56019b[_0x232b63(0x1fb)]) + parseFloat(_0x5bc2a7), parseFloat(_0x56019b['lng']) + parseFloat(_0x5bc2a7)],
                    'name': _0x56019b[_0x232b63(0x2a0)],
                    'bod': _0x4d074e,
                    'eod': _0x9be5e0,
                    'adp': _0xd16cf2,
                    'entity': _0x47392a,
                    'status': status,
                    'weburl': _0x232b63(0x2fd) + _0x56019b['sitename'],
                    'statename': _0x56019b['location'],
                    'colorarray': ''
                }), _0x5b786d = _0x64c031[_0x4492bb]['statename'], _0x1bc013 = _0x64c031[_0x4492bb][_0x232b63(0x24f)] == 0x1 ? _0x232b63(0x202) : _0x64c031[_0x4492bb][_0x232b63(0x24f)] == 0x2 ? _0x232b63(0x2ea) : _0x64c031[_0x4492bb]['status'] == 0x3 ? 'white' : 'red';
                if (_0x64c031[_0x4492bb][_0x232b63(0x343)] in arr && arr[_0x64c031[_0x4492bb]['statename']] == _0x1bc013) arr[_0x5b786d] = _0x1bc013;
                else {
                    if (_0x64c031[_0x4492bb]['statename'] in arr && arr[_0x64c031[_0x4492bb][_0x232b63(0x343)]] == _0x232b63(0x2c1)) arr[_0x5b786d] = _0x232b63(0x2c1);
                    else {
                        if (_0x64c031[_0x4492bb][_0x232b63(0x343)] in arr && arr[_0x64c031[_0x4492bb][_0x232b63(0x343)]] == _0x232b63(0x202)) _0x1bc013 == 'red' ? _0x1bc013 = _0x232b63(0x2c1) : _0x1bc013 = _0x232b63(0x202), arr[_0x5b786d] = _0x1bc013;
                        else {
                            if (_0x64c031[_0x4492bb][_0x232b63(0x343)] in arr && arr[_0x64c031[_0x4492bb][_0x232b63(0x343)]] == _0x232b63(0x2ea)) {
                                _0x1bc013 = _0x232b63(0x2ea);
                                if (_0x1bc013 == _0x232b63(0x2c1)) _0x1bc013 = _0x232b63(0x2c1);
                                else _0x1bc013 == _0x232b63(0x202) && (_0x1bc013 = 'orange');
                                arr[_0x5b786d] = _0x1bc013;
                            } else arr[_0x5b786d] = _0x1bc013;
                        }
                    }
                }
                _0x4492bb++;
            }
        })[_0x6c0355(0x1e2)](function (_0x4f20fa) {
            var _0x3b23af = _0x6c0355;
            console['log'](_0x3b23af(0x31b) + _0x4f20fa[_0x3b23af(0x2e7)] + '\x20' + _0x4f20fa[_0x3b23af(0x326)]);
            var _0x24538a = '';
            if (_0x4f2b76 < 0x1) { } else { }
            arr[_0x56019b[_0x3b23af(0x316)]] = _0x3b23af(0x2c1), _0x4f2b76++;
        });
    };
    return _0x5b7657 += _0x6c0355(0x2be), _0x64c031[_0x6c0355(0x22c)] == 0x0 && _0x64c031['push']({
        'latLng': '',
        'name': '',
        'status': '',
        'weburl': '',
        'statename': '',
        'colorarray': ''
    }), _0x4492bb >= 0x1 && (_0x64c031[_0x4492bb - 0x1]['colorarray'] = arr), a = _0x64c031, _0x64c031;
}

function gettime() {
    var _0x3b5922 = _0x4b7b4a,
        _0xa07d3c = {},
        _0x211ded = new Date();
    return _0xa07d3c[_0x3b5922(0x24e)] = (_0x211ded[_0x3b5922(0x2d4)]() < 0xa ? '0' : '') + _0x211ded[_0x3b5922(0x2d4)](), _0xa07d3c[_0x3b5922(0x268)] = (_0x211ded[_0x3b5922(0x336)]() < 0xa ? '0' : '') + _0x211ded[_0x3b5922(0x336)](), _0xa07d3c['second'] = (_0x211ded[_0x3b5922(0x309)]() < 0xa ? '0' : '') + _0x211ded['getSeconds'](), _0xa07d3c;
}

function createChart(_0x36a99d, _0x4bbfe4) {
    var _0x58411d = _0x4b7b4a;
    if (_0x36a99d[_0x58411d(0x2e6)][_0x58411d(0x233)](_0x58411d(0x2bf))) {
        var _0x3dfc40 = _0x36a99d[_0x58411d(0x2e6)][_0x58411d(0x2bf)][_0x58411d(0x2e6)],
            _0x4281fd = _0x3dfc40[_0x58411d(0x22e)],
            _0x41ad3a = _0x3dfc40[_0x58411d(0x1e7)],
            _0x395e67 = _0x3dfc40[_0x58411d(0x259)];
        chartdata_list[_0x4bbfe4] = {
            'hardware': {
                '0': _0x4281fd['0'],
                '1': _0x4281fd['1'],
                '2': _0x4281fd['2'],
                '3': _0x4281fd['3']
            },
            'software': {
                '0': _0x41ad3a['0'],
                '1': _0x41ad3a['1'],
                '2': _0x41ad3a['2'],
                '3': _0x41ad3a['3']
            },
            'application': {
                '0': _0x395e67['0'],
                '1': _0x395e67['1'],
                '2': _0x395e67['2'],
                '3': _0x395e67['3']
            }
        };
        const _0x310ca9 = Object['values'](chartdata_list)['reduce']((_0x56dcd6, _0x45638f) => _0x56dcd6 + _0x45638f['hardware']['0'], 0x0),
            _0x6d69aa = Object['values'](chartdata_list)[_0x58411d(0x2cd)]((_0x5938e1, _0x19803a) => _0x5938e1 + _0x19803a[_0x58411d(0x22e)]['1'], 0x0),
            _0x29c0a6 = Object[_0x58411d(0x2a8)](chartdata_list)[_0x58411d(0x2cd)]((_0x234005, _0x43bb59) => _0x234005 + _0x43bb59['hardware']['2'], 0x0),
            _0x43465a = Object['values'](chartdata_list)['reduce']((_0x76c7b3, _0x4fcb00) => _0x76c7b3 + _0x4fcb00[_0x58411d(0x22e)]['3'], 0x0),
            _0x6a59a3 = Object['values'](chartdata_list)['reduce']((_0x3b8816, _0x560b45) => _0x3b8816 + _0x560b45[_0x58411d(0x1e7)]['0'], 0x0),
            _0x2d7c4d = Object[_0x58411d(0x2a8)](chartdata_list)['reduce']((_0x272cd2, _0x24ac90) => _0x272cd2 + _0x24ac90[_0x58411d(0x1e7)]['1'], 0x0),
            _0x11028b = Object[_0x58411d(0x2a8)](chartdata_list)[_0x58411d(0x2cd)]((_0x34a932, _0x4da75a) => _0x34a932 + _0x4da75a[_0x58411d(0x1e7)]['2'], 0x0),
            _0x21549d = Object[_0x58411d(0x2a8)](chartdata_list)['reduce']((_0x28e186, _0x1ff4e5) => _0x28e186 + _0x1ff4e5[_0x58411d(0x1e7)]['3'], 0x0),
            _0x5f0dec = Object[_0x58411d(0x2a8)](chartdata_list)[_0x58411d(0x2cd)]((_0x1a8e26, _0x53debb) => _0x1a8e26 + _0x53debb['application']['0'], 0x0),
            _0x11f656 = Object[_0x58411d(0x2a8)](chartdata_list)['reduce']((_0x917b02, _0x59d1e7) => _0x917b02 + _0x59d1e7[_0x58411d(0x259)]['1'], 0x0),
            _0x4eb7a5 = Object[_0x58411d(0x2a8)](chartdata_list)['reduce']((_0x1056d3, _0x29d8d1) => _0x1056d3 + _0x29d8d1[_0x58411d(0x259)]['2'], 0x0),
            _0x1fb6df = Object[_0x58411d(0x2a8)](chartdata_list)[_0x58411d(0x2cd)]((_0x5b11a8, _0x1f8dd5) => _0x5b11a8 + _0x1f8dd5['application']['3'], 0x0);
        tempObj[_0x58411d(0x22e)] = {
            'CRITICAL': _0x310ca9,
            'OK': _0x29c0a6,
            'WARNING': _0x6d69aa,
            'UNKNOWN': _0x43465a
        }, tempObj[_0x58411d(0x1e7)] = {
            'CRITICAL': _0x6a59a3,
            'OK': _0x11028b,
            'WARNING': _0x2d7c4d,
            'UNKNOWN': _0x21549d
        }, tempObj[_0x58411d(0x259)] = {
            'CRITICAL': _0x5f0dec,
            'OK': _0x4eb7a5,
            'WARNING': _0x11f656,
            'UNKNOWN': _0x1fb6df
        }, sessionStorage['setItem'](_0x58411d(0x304), JSON[_0x58411d(0x208)](tempObj)), fillHostServiceCount(tempObj);
    }
}

function _0x2362() {
    var _0x42e9d3 = ['\x27\x20target\x20=\x20\x27_blank\x27\x20>\x20', '#ffffff', 'left-arrow', 'Trying(', 'use\x20strict', 'owlCarousel', '<td\x20class=\x27td-min-width\x27\x20\x20id=\x27', '\x22)\x27\x20class=\x27has-details\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:green\x27>&emsp;\x20&emsp;&emsp;\x20\x20<i\x20class=\x27\x20\x20mdi\x20mdi-sync\x27\x20></i><span\x20class=\x27alignr\x20details\x27>', 'round', '/static/app/images/white-navigator.png', 'bod', '13801084cFSKFh', 'rtl', 'eod\x27\x20onclick=\x27siteredirect(\x22/lesites?site=', 'show-map', '\x27\x20target\x20=\x20\x27_blank\x27\x20style=\x27color:black\x27>', 'open', 'search', 'path', '<td\x20id=\x27', '#heat-map', 'hasClass', '/static/app/images/green-navigator.png', '<th\x20colspan=\x222\x22style=\x22border-right:3px\x20solid\x20#030303;border-top:3px\x20solid\x20#030303;\x22>Time</th>', 'show', '\x22,\x22bodLED\x22)\x27\x20\x20style=\x27background-color:#fff;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;\x27></td>', '\x20<p\x20class=\x22tooltiptexting\x22\x20id=\x22', 'disconnect', 'map-height', 'adp', 'remove', '#ff0000', 'image', '#owl-carousel-rtl', 'icon-chats', '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-e-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>EOD</span></th>', '</thead>', '#hardware-title-clr', '<b>ENTITY:</b>', 'show-modal', 'getItem', '<p\x20class=\x22col-3\x22\x20id=\x22display-icon', 'log', 'hardware_unknown', 'INSIDE\x20TIMEOUT', 'hardware_critical\x27\x20style=\x27border-left:\x203px\x20solid\x20#030303;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:red;color:white\x27>\x20<a\x20\x20href\x20=\x20\x27/lesites?site=', 'GET', 'locationbased', 'done', 'forEach', '293420kjuGjT', 'right-arrow', 'sitename', 'json', 'datatime', 'latLng', '\x20\x20</td>', '</b><br/>', '<td\x20class\x20=\x20\x27site\x20fixed-column\x27\x20id=\x27', '<th\x20class=\x22fixed-column\x22\x20rowspan=\x222\x22>SITENAME</th>', 'values', '<div\x20class=\x22col-12\x22\x20>', '\x22)\x27\x20class=\x27has-details\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:green\x27><i\x20class=\x27\x20\x20mdi\x20mdi-sync\x27\x20></i><span\x20class=\x27alignr\x20details\x27>', 'linkedeye', 'mlast-conn\x22></p>', 'entries', '<th\x20class=\x22has-details\x22><i\x20class=\x22fas\x20fa-exchange-alt\x22\x20style=\x22display:contents\x20!important;font-size:20px\x22></i><span\x20class=\x22\x20details\x22>CONNECTIONS</span></th>', 'parentElement', '<div\x20class=\x22indicator\x22\x20id=\x22map-pipe\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22mdi\x20mdi-check-network-outline\x20tooltip\x22\x20id=\x22icon-chats\x22\x20onclick=\x22displaytooltip(\x27', '#sitess-list', '<tr\x20class=\x22col-12\x22>', 'text', 'animate', 'removeItem', '<b>ADP:</b>', '#383f47', 'hide', 'application_warning\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:orange;color:white\x27>\x20<a\x20\x20href\x20=\x20\x27/lesites?site=', '<td\x20class=\x27td-min-width\x27\x20id=\x27', 'Lastconnect\x20:\x20', '#e99123', '#software-title-clr', '</tbody>', 'chart', 'sitename\x27\x20>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<a\x20class=\x27dropdown-item\x20preview-item\x27\x20href\x20=\x20\x27/lesites?site=', 'red', '<th\x20colspan=\x224\x22style=\x22border-right:3px\x20solid\x20#030303;border-left:3px\x20solid\x20#030303;border-top:3px\x20solid\x20#030303;\x22>Hardwares</th>', 'display', '/static/app/images/orange-navigator.png', 'hardware_ok', '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-a-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>ADP</span></th>', '</td>', '<div\x20class=\x22row\x20tooltiping\x22>', '9XNZNwh', 'then', 'client', '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-w-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>WARNING</span></th>', 'reduce', 'onload', '#incorrect_data', 'data-view', '#audience-map', '#display-icon', '/exchange/map_update', 'getHours', 'bod\x27\x20onclick=\x27siteredirect(\x22/lesites?site=', '/static/app/images/red-navigator.png', 'isprocess', 'application_critical', 'datasitename\x27\x20>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<a\x20class=\x27dropdown-item\x20preview-item\x20dropdown-item-height\x27\x20href\x20=\x20\x27/lesites?site=', '\x22,\x22bodLED\x22)\x27\x20\x20style=\x27background-color:#fff;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;\x27>white</td>', 'second', 'getFullYear', 'application_ok\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:green;color:white\x27>\x20<a\x20\x20href\x20=\x20\x27/lesites?site=', 'contains', 'audience-map-div', 'easeInOut', '<th\x20class=\x22fixed-column\x22\x20>SITENAME</th>', 'ready', '#fff', 'CRITICAL', 'fontSize', 'data', 'site', 'value', 'software_unknown', 'green', '</tr>', '#left-arrow', 'selected-btn', 'heat-map-div', 'mdi\x20mdi-help-network-outline\x20tooltip', 'websocket_url', 'null', '-\x20:\x20-\x20:\x20-', 'empty', 'polynomial', '\x22,\x22entityLED\x22)\x27\x20style=\x27background-color:#fff;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;\x27></td>', 'heatmapHtml', '.tables', 'status-conn', 'parse', 'row\x27>', '\x22,\x22eodLED\x22)\x27\x20style=\x27background-color:#fff;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;\x27>white</td>', 'stroke', '/lesites?site=', '</p>', 'random', 'adp\x27\x20onclick=\x27siteredirect(\x22/lesites?site=', 'connectionTries', 'web-name', 'className', 'tempobj', 'connect', '\x22,\x22eodLED\x22)\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:', 'animation', '8FXdgfG', 'getSeconds', '<table\x20class=\x22tables\x22\x20id=\x22data-view-id\x22>', 'sitename\x27\x20class\x20=\x20\x27site\x20fixed-column\x27\x20>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<a\x20class=\x27dropdown-item\x20preview-item\x27\x20href\x20=\x20\x27/lesites?site=', 'add', ';color:', '\x20</a>\x20</td>', '\x20-\x20:\x20-\x20:\x20-', 'color', '<th\x20class=\x22has-details\x22\x20style=\x22border-right:3px\x20solid\x20#030303;\x22><i\x20class=\x22mdi\x20mdi-alpha-u-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>UNKNOWN</span></th>', 'entity\x27\x20onclick=\x27siteredirect(\x22/lesites?site=', 'getMonth', 'mdi\x20mdi-close-network-outline\x20tooltip', '<thead\x20class=\x22table-head\x20border-t\x22\x20style=\x22text-align:center\x22>', 'location', '\x22,\x22adpLED\x22)\x27\x20\x20style=\x27background-color:#fff;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;\x27></td>', 'WARNING', ';font-size:medium\x27>', '#000000', 'Augh,\x20there\x20was\x20an\x20error!', 'False(', 'setText', 'software_warning', '<table\x20class=\x22table\x22>', 'audience-map', '<th\x20colspan=\x224\x22style=\x22border-right:3px\x20solid\x20#030303;border-top:3px\x20solid\x20#030303;\x22>Softwares</th>', '_blank', 'datarow\x27>', 'leftmove\x202s', 'software_ok\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:green;color:white\x27>\x20\x20<a\x20\x20href\x20=\x20\x27/lesites?site=', 'statusText', 'mdi-pin', '<tr>', '<div\x20class=\x22show-map\x22\x20id=\x22heatmap-view\x22\x20style=\x22display:none\x22>', 'innerText', 'servers', '#india-map', 'map', 'DataTable', 'name', 'le_url', 'font', 'time\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;\x27>', '\x22,\x22bodLED\x22)\x27\x20\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:', 'body', '245142eFyuyv', 'getMinutes', 'eod', '<th\x20class=\x22has-details\x22style=\x22border-right:3px\x20solid\x20#030303;\x22><i\x20class=\x22mdi\x20mdi-alpha-u-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>UNKNOWN</span></th>', '</table>', '\x22,\x22adpLED\x22)\x27\x20\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:', 'none', '/lesites/getallsitenames', 'list-hover', 'mdi-pin-outline', '#right-arrow', 'software_ok', '<i\x20class=\x27mdi\x20mdi-chevron-left\x27></i>', '<td\x20class=\x22col-8\x20details_td\x22\x20style=\x22width:\x20150px;\x22>', 'statename', '#application-title-clr', '\x22\x20style=\x22display:none;margin-top:\x2013px;\x22><i\x20class=\x22mdi\x20mdi-checkbox-marked\x22\x20style=\x22color:#16d39a;\x22\x20onclick=\x22iconconnect(\x27', 'setItem', 'catch', '655059IzZSsl', 'white', '#map-html', 'send', 'software', '#refresh-btn', 'border-clr', '<tr\x20id=\x27', '2byOlWj', 'onerror', 'width', 'Your\x20browser\x20does\x20not\x20support\x20WebSockets.\x20Updates\x20will\x20not\x20work\x20properly.', '</div>', '2549529wFpgSq', 'vectorMap', 'sticky-div', '\x27,\x27', 'application_ok', 'datafont\x27\x20style=\x27color:\x20', '<table>', '</span></td>', '<div\x20id=\x22empty-div\x22>', 'mclient', '<h2\x20style=\x22font-size:16px;white-space:nowrap;text-align:left\x22>', 'lat', '<i\x20class=\x27mdi\x20mdi-chevron-right\x27></i>', '<iframe\x20src=\x22/india\x22\x20frameborder=\x220\x22\x20style=\x22border:0\x22\x20></iframe>', '</a>\x20\x20</td>', '#ff3d57', '</br>', '\x22)\x27\x20class=\x27has-details\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:red\x27><i\x20class=\x27\x20\x20mdi\x20mdi-sync\x27\x20></i><span\x20class=\x27alignr\x20details\x27>', 'orange', '.table', '<td\x20class=\x22col-4\x20details_ts\x22\x20id=\x22', 'apply', 'opacity', '<th\x20class=\x22has-details\x22style=\x22border-left:3px\x20solid\x20#030303;\x22><i\x20class=\x22mdi\x20mdi-alpha-c-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>CRITICAL</span></th>', 'stringify', '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-c-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>CRITICAL</span></th>', 'hardware_warning\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:orange;color:white\x27>\x20\x20<a\x20\x20href\x20=\x20\x27/lesites?site=', '\x22,\x22entityLED\x22)\x27\x20style=\x27background-color:#fff;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;\x27>white</td>', 'isWSConnected', 'append', '\x22,\x22entityLED\x22)\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:', 'heatmap-view', 'entity', 'transparent', 'click', 'incorrect_data', 'jvectormap-tip', ':</b>', 'software_critical\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:red;color:white\x27>\x20<a\x20\x20href\x20=\x20\x27/lesites?site=', '\x27\x20target\x20=\x20\x27_blank\x27style=\x27color:black\x27\x20>\x20', 'toString', 'sitehealth/overall', 'click-this-button-after-page-loads', 'time\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center\x27>', '\x27\x20target\x20=\x20\x27_blank\x27\x20>', 'subscribe', '<b>SERVERS:</b>', 'html', 'rightmove\x202.5s', '<th\x20colspan=\x224\x22style=\x22border-right:3px\x20solid\x20#030303;border-top:3px\x20solid\x20#030303;\x22>Applications</th>', '</p>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</a>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>', 'refresh\x27\x20onclick=\x27seperateRef(\x22', 'software_unknown\x27\x20style=\x27border-right:3px\x20solid\x20#030303;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:white;color:black\x27>\x20\x20\x20<a\x20\x20href\x20=\x20\x27/lesites?site=', 'hardware_critical', 'getElementById', 'getDate', 'asite-list', 'font\x27\x20style=\x27color:red;font-size:medium\x27>', 'userbased', 'stroke-width', 'length', '<div\x20id=\x22information_modal\x22\x20class=\x22z-depth-1-half\x20india-map-container-9\x22>', 'hardware', '<th\x20class=\x22has-details\x22><i\x20class=\x22icon-node\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>ENTITY</span></th>', '<div\x20class=\x22row\x22>', 'Circle', '<div\x20id=\x22sitess-list\x22\x20style=\x22white-space:nowrap;width:100%;display:flex;overflow:scroll\x22></div>', 'hasOwnProperty', '#siteslist', 'application_warning', '\x20</a>\x20\x20</td>', '#owl-carousel-basic', '1.5rem', 'getElementsByClassName', '<b>EOD:</b>', 'Bfrtip', '2755390OkYNOu', 'innerHTML', '#d53f3a', '<tbody\x20class=\x22row\x22>', '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-b-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>BOD</span></th>', 'White', 'push', 'time', 'toLocaleString', '#228B22', 'refresh', '#16d39a', '\x27\x20target\x20=\x20\x27_blank\x27\x20>\x20\x20', 'map-pipe', '5yahZhV', '177849keRoxO', 'querySelector', 'sites-list', 'hour', 'status', '\x27)\x22\x20></i\x20><i\x20class=\x22mdi\x20mdi-close-box\x22\x20style=\x22color:#ff3d57;\x22\x20onclick=\x22iconclose(\x27', '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alarm-check\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>LAST\x20UPDATE</span></th>', '\x27\x20target\x20=\x20\x27_blank\x27\x20>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x27preview-item-\x20content\x27\x20\x20style=\x27text-align:\x20center;\x20\x27>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x27preview-subject\x27\x20id=\x27', '</a></td>', 'url', 'weburl', 'responseType', 'get', 'classList', 'application', 'includes', '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22\x20>', 'addBack', 'colorarray', 'style', '#0d0d0d', '<b>BOD:</b>', 'application_unknown\x27\x20style=\x27border-right:3px\x20solid\x20#030303;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:white;color:black\x27>\x20\x20<a\x20\x20href\x20=\x20\x27/lesites?site=', 'software_warning\x27\x20style=\x27border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;background-color:orange;color:white\x27>\x20\x20<a\x20href\x20=\x20\x27/lesites?site=', 'heat-pin', '<b>SITENAME\x20:\x20', '\x22,\x22', 'application_unknown', 'in_mill', 'minute', '</a>\x20</td>', 'timeout', 'css'];
    _0x2362 = function () {
        return _0x42e9d3;
    };
    return _0x2362();
}

function seperateRef(_0x4e3aa5, _0x5afb40) {
    var _0x538613 = _0x4b7b4a;
    targetdata[_0x5afb40 + 'isprocess'] == 0x0 && (targetdata[_0x5afb40 + 'isprocess'] = 0x1, getJSON(_0x4e3aa5, _0x5afb40)['then'](function (_0x1f0cba) {
        var _0x1d7780 = _0x39bc;
        createChart(_0x1f0cba, _0x5afb40), statusdata = _0x1f0cba['data'];
        var _0x1c38a7 = statusdata[_0x1d7780(0x2bf)]['data'];
        mapsitedata[_0x5afb40] = statusdata;
        var _0x40ded4 = statusdata[_0x1d7780(0x276)],
            _0x31303c = statusdata[_0x1d7780(0x337)],
            _0x3f48bb = statusdata[_0x1d7780(0x289)],
            _0x2e6e9d = statusdata['entity'];
        status = _0x40ded4 === 0x0 || _0x31303c === 0x0 || _0x3f48bb === 0x0 || _0x2e6e9d === 0x0 ? 0x0 : _0x40ded4 === 0x1 || _0x31303c === 0x1 || _0x3f48bb === 0x1 || _0x2e6e9d === 0x1 ? 0x1 : _0x40ded4 === 0x2 && _0x31303c === 0x2 && _0x3f48bb === 0x2 && _0x2e6e9d === 0x2 ? 0x2 : 0x3;
        var _0x505f30;
        if (_0x1c38a7['hardware']['0'] > 0x0 || _0x1c38a7[_0x1d7780(0x1e7)]['0'] > 0x0 || _0x1c38a7[_0x1d7780(0x259)]['0'] > 0x0) _0x505f30 = 0x0;
        else {
            if (_0x1c38a7['hardware']['1'] > 0x0 || _0x1c38a7['software']['1'] > 0x0 || _0x1c38a7[_0x1d7780(0x259)]['1'] > 0x0) _0x505f30 = 0x1;
            else _0x1c38a7[_0x1d7780(0x22e)]['2'] > 0x0 || _0x1c38a7['software']['2'] > 0x0 || _0x1c38a7[_0x1d7780(0x259)]['2'] > 0x0 ? _0x505f30 = 0x2 : _0x505f30 = 0x3;
        }
        worldstatusdata[_0x5afb40] = status, totalstatus += parseInt(status), sitecount++;
        var _0x22b492 = gettime();
        $('#' + _0x5afb40 + 'font')[_0x1d7780(0x26b)]({
            'color': status == 0x1 ? 'orange' : status == 0x2 ? 'green' : status == 0x3 ? _0x1d7780(0x1e4) : _0x1d7780(0x2c1)
        }), $('#' + _0x5afb40 + 'datafont')[_0x1d7780(0x26b)]({
            'color': _0x505f30 == 0x1 ? _0x1d7780(0x202) : _0x505f30 == 0x2 ? _0x1d7780(0x2ea) : _0x505f30 == 0x3 ? _0x1d7780(0x1e4) : _0x1d7780(0x2c1)
        }), $('#' + _0x5afb40 + _0x1d7780(0x276))[_0x1d7780(0x26b)]({
            'background': statusdata[_0x1d7780(0x276)] == 0x1 ? _0x1d7780(0x202) : statusdata[_0x1d7780(0x276)] == 0x2 ? _0x1d7780(0x2ea) : statusdata[_0x1d7780(0x276)] == 0x3 ? 'white' : _0x1d7780(0x2c1),
            'color': statusdata['bod'] == 0x1 ? _0x1d7780(0x202) : statusdata[_0x1d7780(0x276)] == 0x2 ? _0x1d7780(0x2ea) : statusdata['bod'] == 0x3 ? _0x1d7780(0x1e4) : _0x1d7780(0x2c1)
        }), $('#' + _0x5afb40 + _0x1d7780(0x337))['css']({
            'background': statusdata['eod'] == 0x1 ? _0x1d7780(0x202) : statusdata[_0x1d7780(0x337)] == 0x2 ? 'green' : statusdata['eod'] == 0x3 ? 'white' : _0x1d7780(0x2c1),
            'color': statusdata[_0x1d7780(0x337)] == 0x1 ? 'orange' : statusdata[_0x1d7780(0x337)] == 0x2 ? _0x1d7780(0x2ea) : statusdata[_0x1d7780(0x337)] == 0x3 ? _0x1d7780(0x1e4) : _0x1d7780(0x2c1)
        }), $('#' + _0x5afb40 + _0x1d7780(0x289))[_0x1d7780(0x26b)]({
            'background': statusdata[_0x1d7780(0x289)] == 0x1 ? _0x1d7780(0x202) : statusdata[_0x1d7780(0x289)] == 0x2 ? _0x1d7780(0x2ea) : statusdata[_0x1d7780(0x289)] == 0x3 ? _0x1d7780(0x1e4) : _0x1d7780(0x2c1),
            'color': statusdata[_0x1d7780(0x289)] == 0x1 ? _0x1d7780(0x202) : statusdata['adp'] == 0x2 ? _0x1d7780(0x2ea) : statusdata[_0x1d7780(0x289)] == 0x3 ? _0x1d7780(0x1e4) : _0x1d7780(0x2c1)
        }), $('#' + _0x5afb40 + _0x1d7780(0x210))[_0x1d7780(0x26b)]({
            'background': statusdata[_0x1d7780(0x210)] == 0x1 ? _0x1d7780(0x202) : statusdata['entity'] == 0x2 ? 'green' : statusdata[_0x1d7780(0x210)] == 0x3 ? _0x1d7780(0x1e4) : _0x1d7780(0x2c1),
            'color': statusdata[_0x1d7780(0x210)] == 0x1 ? _0x1d7780(0x202) : statusdata['entity'] == 0x2 ? _0x1d7780(0x2ea) : statusdata[_0x1d7780(0x210)] == 0x3 ? _0x1d7780(0x1e4) : _0x1d7780(0x2c1)
        }), $('#' + _0x5afb40 + 'refresh')['css']({
            'background': 'green'
        }), $('#' + _0x5afb40 + 'time')[_0x1d7780(0x26b)]({
            'color': 'white'
        }), document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x276))['innerText'] = statusdata['bod'] == 0x1 ? _0x1d7780(0x202) : statusdata[_0x1d7780(0x276)] == 0x2 ? _0x1d7780(0x2ea) : statusdata[_0x1d7780(0x276)] == 0x3 ? _0x1d7780(0x1e4) : _0x1d7780(0x2c1), document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x337))['innerText'] = statusdata[_0x1d7780(0x337)] == 0x1 ? 'orange' : statusdata['eod'] == 0x2 ? _0x1d7780(0x2ea) : statusdata[_0x1d7780(0x337)] == 0x3 ? 'white' : _0x1d7780(0x2c1), document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x289))[_0x1d7780(0x32a)] = statusdata[_0x1d7780(0x289)] == 0x1 ? 'orange' : statusdata[_0x1d7780(0x289)] == 0x2 ? 'green' : statusdata[_0x1d7780(0x289)] == 0x3 ? _0x1d7780(0x1e4) : 'red', document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x210))[_0x1d7780(0x32a)] = statusdata[_0x1d7780(0x210)] == 0x1 ? 'orange' : statusdata[_0x1d7780(0x210)] == 0x2 ? _0x1d7780(0x2ea) : statusdata[_0x1d7780(0x210)] == 0x3 ? _0x1d7780(0x1e4) : _0x1d7780(0x2c1), document[_0x1d7780(0x226)](_0x5afb40 + 'time')[_0x1d7780(0x32a)] = _0x22b492['hour'] + ':' + _0x22b492['minute'] + ':' + _0x22b492[_0x1d7780(0x2db)], document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x225))['querySelector']('a')['innerText'] = _0x1c38a7[_0x1d7780(0x22e)]['0'], document[_0x1d7780(0x226)](_0x5afb40 + 'hardware_warning')[_0x1d7780(0x24c)]('a')[_0x1d7780(0x32a)] = _0x1c38a7[_0x1d7780(0x22e)]['1'], document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x2c5))[_0x1d7780(0x24c)]('a')[_0x1d7780(0x32a)] = _0x1c38a7[_0x1d7780(0x22e)]['2'], document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x297))['querySelector']('a')[_0x1d7780(0x32a)] = _0x1c38a7[_0x1d7780(0x22e)]['3'], document[_0x1d7780(0x226)](_0x5afb40 + 'software_critical')[_0x1d7780(0x24c)]('a')[_0x1d7780(0x32a)] = _0x1c38a7[_0x1d7780(0x1e7)]['0'], document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x31e))[_0x1d7780(0x24c)]('a')[_0x1d7780(0x32a)] = _0x1c38a7[_0x1d7780(0x1e7)]['1'], document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x340))['querySelector']('a')[_0x1d7780(0x32a)] = _0x1c38a7['software']['2'], document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x2e9))[_0x1d7780(0x24c)]('a')['innerText'] = _0x1c38a7[_0x1d7780(0x1e7)]['3'], document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x2d8))[_0x1d7780(0x24c)]('a')[_0x1d7780(0x32a)] = _0x1c38a7[_0x1d7780(0x259)]['0'], document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x235))[_0x1d7780(0x24c)]('a')['innerText'] = _0x1c38a7[_0x1d7780(0x259)]['1'], document['getElementById'](_0x5afb40 + _0x1d7780(0x1f4))['querySelector']('a')[_0x1d7780(0x32a)] = _0x1c38a7[_0x1d7780(0x259)]['2'], document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x266))[_0x1d7780(0x24c)]('a')[_0x1d7780(0x32a)] = _0x1c38a7['application']['3'], document[_0x1d7780(0x226)](_0x5afb40 + _0x1d7780(0x2a2))[_0x1d7780(0x32a)] = _0x22b492[_0x1d7780(0x24e)] + ':' + _0x22b492[_0x1d7780(0x268)] + ':' + _0x22b492[_0x1d7780(0x2db)], mapsitedata[_0x5afb40][_0x1d7780(0x243)] = _0x22b492[_0x1d7780(0x24e)] + ':' + _0x22b492[_0x1d7780(0x268)] + ':' + _0x22b492['second'], sitenull_list[_0x5afb40] = 'OK';
        JSON[_0x1d7780(0x208)](sitenull_list)[_0x1d7780(0x25a)](_0x1d7780(0x2f1)) ? ($(_0x1d7780(0x291))['css'](_0x1d7780(0x310), _0x1d7780(0x202)), $(_0x1d7780(0x2bd))[_0x1d7780(0x26b)](_0x1d7780(0x310), 'orange'), $(_0x1d7780(0x344))[_0x1d7780(0x26b)](_0x1d7780(0x310), _0x1d7780(0x202))) : ($(_0x1d7780(0x291))['css'](_0x1d7780(0x310), 'White'), $(_0x1d7780(0x2bd))[_0x1d7780(0x26b)]('color', _0x1d7780(0x241)), $(_0x1d7780(0x344))[_0x1d7780(0x26b)](_0x1d7780(0x310), _0x1d7780(0x241)));
        if (Object[_0x1d7780(0x2a8)](worldstatusdata)[_0x1d7780(0x25a)]('0')) worldstatus = '#ff0000';
        else {
            if (Object[_0x1d7780(0x2a8)](worldstatusdata)[_0x1d7780(0x25a)]('1')) worldstatus = _0x1d7780(0x2bc);
            else Object[_0x1d7780(0x2a8)](worldstatusdata)[_0x1d7780(0x25a)]('2') ? worldstatus = _0x1d7780(0x245) : worldstatus = _0x1d7780(0x26d);
        }
        loadmap(), targetdata[_0x5afb40 + _0x1d7780(0x2d7)] = 0x0, clearTimeout(mapintervaldata[_0x5afb40]), mapintervaldata[_0x5afb40] = setTimeout(function () {
            seperateRef(_0x4e3aa5, _0x5afb40);
        }, 0xea60);
    })[_0x538613(0x1e2)](function (_0x1165e8) {
        var _0x3fe0c3 = _0x538613;
        if (mapsitedata[_0x5afb40][_0x3fe0c3(0x276)] == null) $('#' + _0x5afb40 + _0x3fe0c3(0x331))[_0x3fe0c3(0x26b)](_0x3fe0c3(0x310), _0x3fe0c3(0x2c1)), $('#' + _0x5afb40 + _0x3fe0c3(0x2a0))[_0x3fe0c3(0x26b)]({
            'background': _0x3fe0c3(0x211),
            'color': _0x3fe0c3(0x2c1)
        }), $('#' + _0x5afb40 + _0x3fe0c3(0x276))[_0x3fe0c3(0x26b)]({
            'background': _0x3fe0c3(0x1e4),
            'color': 'white'
        }), $('#' + _0x5afb40 + 'eod')['css']({
            'background': _0x3fe0c3(0x1e4),
            'color': _0x3fe0c3(0x1e4)
        }), $('#' + _0x5afb40 + _0x3fe0c3(0x289))[_0x3fe0c3(0x26b)]({
            'background': _0x3fe0c3(0x1e4),
            'color': _0x3fe0c3(0x1e4)
        }), $('#' + _0x5afb40 + 'entity')['css']({
            'background': _0x3fe0c3(0x1e4),
            'color': _0x3fe0c3(0x1e4)
        }), $('#' + _0x5afb40 + _0x3fe0c3(0x246))[_0x3fe0c3(0x26b)]({
            'background': _0x3fe0c3(0x2c1),
            'color': _0x3fe0c3(0x1e4)
        }), $('#' + _0x5afb40 + 'time')[_0x3fe0c3(0x26b)]({
            'background': _0x3fe0c3(0x211),
            'color': _0x3fe0c3(0x1e4)
        }), document[_0x3fe0c3(0x226)](_0x5afb40 + _0x3fe0c3(0x276))[_0x3fe0c3(0x32a)] = _0x3fe0c3(0x1e4), document['getElementById'](_0x5afb40 + _0x3fe0c3(0x337))[_0x3fe0c3(0x32a)] = _0x3fe0c3(0x1e4), document[_0x3fe0c3(0x226)](_0x5afb40 + _0x3fe0c3(0x289))[_0x3fe0c3(0x32a)] = _0x3fe0c3(0x1e4), document[_0x3fe0c3(0x226)](_0x5afb40 + _0x3fe0c3(0x210))['innerText'] = 'white', document['getElementById'](_0x5afb40 + _0x3fe0c3(0x243))[_0x3fe0c3(0x32a)] = _0x3fe0c3(0x2f2);
        else {
            var _0x54f1ab = gettime();
            document['getElementById'](_0x5afb40 + _0x3fe0c3(0x276))[_0x3fe0c3(0x32a)] = mapsitedata[_0x5afb40][_0x3fe0c3(0x276)] == 0x1 ? _0x3fe0c3(0x202) : mapsitedata[_0x5afb40]['bod'] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40][_0x3fe0c3(0x276)] == 0x3 ? _0x3fe0c3(0x1e4) : _0x3fe0c3(0x2c1), document['getElementById'](_0x5afb40 + 'eod')[_0x3fe0c3(0x32a)] = mapsitedata[_0x5afb40]['eod'] == 0x1 ? 'orange' : mapsitedata[_0x5afb40][_0x3fe0c3(0x337)] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40][_0x3fe0c3(0x337)] == 0x3 ? _0x3fe0c3(0x1e4) : _0x3fe0c3(0x2c1), document[_0x3fe0c3(0x226)](_0x5afb40 + _0x3fe0c3(0x289))[_0x3fe0c3(0x32a)] = mapsitedata[_0x5afb40]['adp'] == 0x1 ? _0x3fe0c3(0x202) : mapsitedata[_0x5afb40][_0x3fe0c3(0x289)] == 0x2 ? 'green' : mapsitedata[_0x5afb40][_0x3fe0c3(0x289)] == 0x3 ? _0x3fe0c3(0x1e4) : _0x3fe0c3(0x2c1), document[_0x3fe0c3(0x226)](_0x5afb40 + _0x3fe0c3(0x210))[_0x3fe0c3(0x32a)] = mapsitedata[_0x5afb40]['entity'] == 0x1 ? _0x3fe0c3(0x202) : mapsitedata[_0x5afb40]['entity'] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40]['entity'] == 0x3 ? _0x3fe0c3(0x1e4) : _0x3fe0c3(0x2c1), document[_0x3fe0c3(0x226)](_0x5afb40 + _0x3fe0c3(0x243))['innerText'] = _0x54f1ab[_0x3fe0c3(0x24e)] + ':' + _0x54f1ab[_0x3fe0c3(0x268)] + ':' + _0x54f1ab[_0x3fe0c3(0x2db)], $('#' + _0x5afb40 + _0x3fe0c3(0x331))['css'](_0x3fe0c3(0x310), 'orange'), $('#' + _0x5afb40 + 'bod')[_0x3fe0c3(0x26b)]({
                'background': mapsitedata[_0x5afb40][_0x3fe0c3(0x276)] == 0x1 ? _0x3fe0c3(0x202) : mapsitedata[_0x5afb40][_0x3fe0c3(0x276)] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40][_0x3fe0c3(0x276)] == 0x3 ? _0x3fe0c3(0x1e4) : _0x3fe0c3(0x2c1),
                'color': mapsitedata[_0x5afb40][_0x3fe0c3(0x276)] == 0x1 ? _0x3fe0c3(0x202) : mapsitedata[_0x5afb40]['bod'] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40][_0x3fe0c3(0x276)] == 0x3 ? 'white' : _0x3fe0c3(0x2c1)
            }), $('#' + _0x5afb40 + 'eod')[_0x3fe0c3(0x26b)]({
                'background': mapsitedata[_0x5afb40][_0x3fe0c3(0x337)] == 0x1 ? _0x3fe0c3(0x202) : mapsitedata[_0x5afb40][_0x3fe0c3(0x337)] == 0x2 ? 'green' : mapsitedata[_0x5afb40]['eod'] == 0x3 ? _0x3fe0c3(0x1e4) : _0x3fe0c3(0x2c1),
                'color': mapsitedata[_0x5afb40][_0x3fe0c3(0x337)] == 0x1 ? _0x3fe0c3(0x202) : mapsitedata[_0x5afb40][_0x3fe0c3(0x337)] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40][_0x3fe0c3(0x337)] == 0x3 ? 'white' : _0x3fe0c3(0x2c1)
            }), $('#' + _0x5afb40 + _0x3fe0c3(0x289))[_0x3fe0c3(0x26b)]({
                'background': mapsitedata[_0x5afb40][_0x3fe0c3(0x289)] == 0x1 ? _0x3fe0c3(0x202) : mapsitedata[_0x5afb40][_0x3fe0c3(0x289)] == 0x2 ? 'green' : mapsitedata[_0x5afb40][_0x3fe0c3(0x289)] == 0x3 ? _0x3fe0c3(0x1e4) : 'red',
                'color': mapsitedata[_0x5afb40]['adp'] == 0x1 ? _0x3fe0c3(0x202) : mapsitedata[_0x5afb40][_0x3fe0c3(0x289)] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40]['adp'] == 0x3 ? _0x3fe0c3(0x1e4) : _0x3fe0c3(0x2c1)
            }), $('#' + _0x5afb40 + _0x3fe0c3(0x210))[_0x3fe0c3(0x26b)]({
                'background': mapsitedata[_0x5afb40][_0x3fe0c3(0x210)] == 0x1 ? 'orange' : mapsitedata[_0x5afb40]['entity'] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40]['entity'] == 0x3 ? _0x3fe0c3(0x1e4) : _0x3fe0c3(0x2c1),
                'color': mapsitedata[_0x5afb40][_0x3fe0c3(0x210)] == 0x1 ? 'orange' : mapsitedata[_0x5afb40][_0x3fe0c3(0x210)] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40][_0x3fe0c3(0x210)] == 0x3 ? _0x3fe0c3(0x1e4) : 'red'
            }), $('#' + _0x5afb40 + _0x3fe0c3(0x210))[_0x3fe0c3(0x26b)]({
                'background': mapsitedata[_0x5afb40]['entity'] == 0x1 ? _0x3fe0c3(0x202) : mapsitedata[_0x5afb40][_0x3fe0c3(0x210)] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40][_0x3fe0c3(0x210)] == 0x3 ? 'white' : _0x3fe0c3(0x2c1),
                'color': mapsitedata[_0x5afb40][_0x3fe0c3(0x210)] == 0x1 ? 'orange' : mapsitedata[_0x5afb40][_0x3fe0c3(0x210)] == 0x2 ? _0x3fe0c3(0x2ea) : mapsitedata[_0x5afb40]['entity'] == 0x3 ? _0x3fe0c3(0x1e4) : _0x3fe0c3(0x2c1)
            }), $('#' + _0x5afb40 + _0x3fe0c3(0x243))[_0x3fe0c3(0x26b)]({
                'color': _0x3fe0c3(0x202)
            });
        }
        mapsitedata[_0x5afb40][_0x3fe0c3(0x276)] = null, mapsitedata[_0x5afb40]['eod'] = null, mapsitedata[_0x5afb40][_0x3fe0c3(0x289)] = null, mapsitedata[_0x5afb40]['entity'] = null, sitenull_list[_0x5afb40] = null, $(_0x3fe0c3(0x291))['css']('color', _0x3fe0c3(0x202)), $(_0x3fe0c3(0x2bd))['css'](_0x3fe0c3(0x310), _0x3fe0c3(0x202)), $(_0x3fe0c3(0x344))[_0x3fe0c3(0x26b)](_0x3fe0c3(0x310), _0x3fe0c3(0x202)), worldstatusdata[_0x5afb40] = 0x0, worldstatus = '#ff0000', loadmap(), targetdata[_0x5afb40 + _0x3fe0c3(0x2d7)] = 0x0, clearTimeout(mapintervaldata[_0x5afb40]), mapintervaldata[_0x5afb40] = setTimeout(function () {
            seperateRef(_0x4e3aa5, _0x5afb40);
        }, 0xea60);
    }));
}

function loadmap() {
    var _0x32a5ef = _0x4b7b4a;
    document[_0x32a5ef(0x226)](_0x32a5ef(0x320))[_0x32a5ef(0x23d)] = '', document[_0x32a5ef(0x226)](_0x32a5ef(0x2df)) != null && document['getElementById'](_0x32a5ef(0x2df))[_0x32a5ef(0x258)][_0x32a5ef(0x2de)](_0x32a5ef(0x288)) && document[_0x32a5ef(0x226)](_0x32a5ef(0x2df))[_0x32a5ef(0x258)][_0x32a5ef(0x28a)](_0x32a5ef(0x288)), worldobject = $(_0x32a5ef(0x2d1))[_0x32a5ef(0x1f1)]({
        'map': 'world_mill_en',
        'backgroundColor': 'transparent',
        'panOnDrag': !![],
        'focusOn': {
            'x': 0.5,
            'y': 0.5,
            'scale': 0x1,
            'animate': !![]
        },
        'onRegionClick': function (_0x550a3b, _0x819810) {
            var _0x5c79b3 = _0x32a5ef;
            requestDataFromServer('/lesites/getallsitenames', {
                'type': _0x5c79b3(0x29b),
                'location': _0x819810
            }, _0x5c79b3(0x29a))[_0x5c79b3(0x29c)](function (_0x21fa7e) {
                var _0x3bee9f = _0x5c79b3;
                if (_0x819810 == 'IN') {
                    document[_0x3bee9f(0x226)](_0x3bee9f(0x24d))[_0x3bee9f(0x23d)] = '';
                    var _0x460bc6 = '';
                    _0x460bc6 += '<div\x20class=\x22col-6\x22\x20id=\x22dropdown\x22>', _0x460bc6 += _0x3bee9f(0x232), _0x460bc6 += _0x3bee9f(0x1ef), _0x460bc6 += _0x3bee9f(0x1ef), _0x460bc6 += _0x3bee9f(0x230), _0x460bc6 += _0x3bee9f(0x2a9), _0x460bc6 += _0x3bee9f(0x22d), _0x460bc6 += _0x3bee9f(0x1fd), _0x460bc6 += _0x3bee9f(0x1ef), _0x460bc6 += '</div>', _0x460bc6 += _0x3bee9f(0x1ef), document[_0x3bee9f(0x226)](_0x3bee9f(0x320))['innerHTML'] = '', $(_0x3bee9f(0x2d1))['append'](_0x460bc6), document[_0x3bee9f(0x226)](_0x3bee9f(0x2df))[_0x3bee9f(0x258)]['add']('map-height');
                } else {
                    document[_0x3bee9f(0x226)]('siteslist')['innerHTML'] = '';
                    var _0x29bfd9 = '<h3\x20style=\x22background-color:#a33219;color:white;border-radius:3px;font-size:16px;width:30%;text-align:\x20center;\x22>No\x20sites\x20activated</h3>';
                    $(_0x3bee9f(0x234))[_0x3bee9f(0x20d)](_0x29bfd9);
                    var _0x246b7a = 0x9c4;
                    setTimeout(_0x3727b7, _0x246b7a);

                    function _0x3727b7() {
                        var _0x30bd51 = _0x3bee9f;
                        $('#siteslist')[_0x30bd51(0x2f3)]();
                    }
                }
            }), setTimeout(_0x142c12, 0x9c4);

            function _0x142c12() {
                var _0x12ff8d = _0x5c79b3;
                for (let _0x5eca43 of document[_0x12ff8d(0x239)](_0x12ff8d(0x214))) {
                    _0x5eca43[_0x12ff8d(0x25e)][_0x12ff8d(0x2c3)] = _0x12ff8d(0x33b);
                }
            }
        },
        'series': {
            'regions': [{
                'scale': [_0x32a5ef(0x31a), worldstatus],
                'normalizeFunction': 'polynomial',
                'values': {
                    'IN': 15.45
                }
            }]
        }
    });
}

function mapload() {
    var _0x54c211 = _0x4b7b4a;
    $(_0x54c211(0x1e8))[_0x54c211(0x2b8)](), _0x54c211(0x270), worldstatus = '', totalstatus = 0x0, sitecount = 0x0, $['fn']['andSelf'] = function () {
        var _0x1a5201 = _0x54c211;
        return this[_0x1a5201(0x25c)][_0x1a5201(0x205)](this, arguments);
    }, $(function () {
        var _0x18bf2e = _0x54c211;
        if ($('#currentBalanceCircle')[_0x18bf2e(0x22c)]) {
            var _0x158df4 = new ProgressBar[(_0x18bf2e(0x231))](currentBalanceCircle, {
                'color': '#000',
                'strokeWidth': 0xc,
                'trailWidth': 0xc,
                'trailColor': _0x18bf2e(0x25f),
                'easing': _0x18bf2e(0x2e0),
                'duration': 0x578,
                'text': {
                    'autoStyleContainer': ![]
                },
                'from': {
                    'color': _0x18bf2e(0x23e),
                    'width': 0xc
                },
                'to': {
                    'color': _0x18bf2e(0x23e),
                    'width': 0xc
                },
                'step': function (_0x1d431c, _0x26a0c5) {
                    var _0x21f878 = _0x18bf2e;
                    _0x26a0c5[_0x21f878(0x27e)]['setAttribute'](_0x21f878(0x2fc), _0x1d431c[_0x21f878(0x310)]), _0x26a0c5[_0x21f878(0x27e)]['setAttribute'](_0x21f878(0x22b), _0x1d431c[_0x21f878(0x1ed)]);
                    var _0x32f147 = Math[_0x21f878(0x274)](_0x26a0c5[_0x21f878(0x2e8)]() * 0x64);
                    _0x26a0c5[_0x21f878(0x31d)]('');
                }
            });
            _0x158df4[_0x18bf2e(0x2b3)][_0x18bf2e(0x25e)][_0x18bf2e(0x2e5)] = _0x18bf2e(0x238), _0x158df4[_0x18bf2e(0x2b4)](0.4);
        }

        function _0xd6d255(_0x49a861) {
            var _0x4dab2d = _0x18bf2e;
            $(_0x4dab2d(0x2ec))[_0x4dab2d(0x2b8)](), $(_0x4dab2d(0x33f))[_0x4dab2d(0x2b8)](), $(_0x4dab2d(0x1e8))[_0x4dab2d(0x2b8)]();
            var _0xc6e258 = JSON[_0x4dab2d(0x2f9)](_0x49a861);
            siteinfo = _0xc6e258['data'];
            var _0x172a47, _0x361597 = 0x0;
            sitecount = 0x0, document[_0x4dab2d(0x226)]('audience-map')['innerHTML'] = '';
            var _0x47dadb = '';
            tempObj = {
                'hardware': {
                    'CRITICAL': 0x0,
                    'OK': 0x0,
                    'WARNING': 0x0,
                    'UNKNOWN': 0x0
                },
                'software': {
                    'CRITICAL': 0x0,
                    'OK': 0x0,
                    'WARNING': 0x0,
                    'UNKNOWN': 0x0
                },
                'application': {
                    'CRITICAL': 0x0,
                    'OK': 0x0,
                    'WARNING': 0x0,
                    'UNKNOWN': 0x0
                }
            }, loadmap();
            var _0x144e65 = '',
                _0x29f1fa = '';
            siteinfo[_0x4dab2d(0x29d)](function (_0x74eb5a) {
                var _0x323cb1 = _0x4dab2d;
                const _0x1debb4 = new URL(_0x323cb1(0x219), _0x74eb5a[_0x323cb1(0x330)]);
                targetdata[_0x74eb5a[_0x323cb1(0x2a0)] + _0x323cb1(0x2e7)] = _0x1debb4, targetdata[_0x74eb5a[_0x323cb1(0x2a0)] + _0x323cb1(0x2d7)] = 0x0;
                const _0x520f75 = new URLSearchParams();
                _0x520f75['set']('sitename', _0x74eb5a[_0x323cb1(0x2a0)]), _0x1debb4[_0x323cb1(0x27d)] = _0x520f75[_0x323cb1(0x218)]();
                mapintervaldata[_0x323cb1(0x233)](_0x74eb5a['sitename']) && clearTimeout(mapintervaldata[_0x74eb5a[_0x323cb1(0x2a0)]]);
                var _0xda8ce7 = getJSON(_0x1debb4, _0x74eb5a[_0x323cb1(0x2a0)])[_0x323cb1(0x2ca)](function (_0x380fc4) {
                    var _0x1eae2b = _0x323cb1;
                    if (_0x380fc4[_0x1eae2b(0x2e6)][_0x1eae2b(0x233)](_0x1eae2b(0x2bf))) {
                        var _0x19e60a = _0x380fc4[_0x1eae2b(0x2e6)]['chart']['data'][_0x1eae2b(0x22e)],
                            _0x606126 = _0x380fc4['data'][_0x1eae2b(0x2bf)][_0x1eae2b(0x2e6)][_0x1eae2b(0x1e7)],
                            _0x1c7408 = _0x380fc4['data'][_0x1eae2b(0x2bf)][_0x1eae2b(0x2e6)]['application'];
                        tempObj[_0x1eae2b(0x22e)] = {
                            'CRITICAL': tempObj[_0x1eae2b(0x22e)][_0x1eae2b(0x2e4)] + _0x19e60a['0'],
                            'OK': tempObj[_0x1eae2b(0x22e)]['OK'] + _0x19e60a['2'],
                            'WARNING': tempObj['hardware']['WARNING'] + _0x19e60a['1'],
                            'UNKNOWN': tempObj[_0x1eae2b(0x22e)]['UNKNOWN'] + _0x19e60a['3']
                        }, tempObj['software'] = {
                            'CRITICAL': tempObj[_0x1eae2b(0x1e7)][_0x1eae2b(0x2e4)] + _0x606126['0'],
                            'OK': tempObj[_0x1eae2b(0x1e7)]['OK'] + _0x606126['2'],
                            'WARNING': tempObj[_0x1eae2b(0x1e7)][_0x1eae2b(0x318)] + _0x606126['1'],
                            'UNKNOWN': tempObj['software']['UNKNOWN'] + _0x606126['3']
                        }, tempObj[_0x1eae2b(0x259)] = {
                            'CRITICAL': tempObj[_0x1eae2b(0x259)][_0x1eae2b(0x2e4)] + _0x1c7408['0'],
                            'OK': tempObj['application']['OK'] + _0x1c7408['2'],
                            'WARNING': tempObj[_0x1eae2b(0x259)][_0x1eae2b(0x318)] + _0x1c7408['1'],
                            'UNKNOWN': tempObj[_0x1eae2b(0x259)]['UNKNOWN'] + _0x1c7408['3']
                        }, chartdata_list[_0x74eb5a[_0x1eae2b(0x2a0)]] = _0x380fc4[_0x1eae2b(0x2e6)]['chart'][_0x1eae2b(0x2e6)];
                    }
                    if (_0x380fc4 == null) { }
                    _0x172a47 = _0x380fc4[_0x1eae2b(0x2e6)], mapsitedata[_0x74eb5a[_0x1eae2b(0x2a0)]] = _0x172a47;
                    var _0x1ad81f = _0x172a47['bod'],
                        _0xac53bf = _0x172a47['eod'],
                        _0x574301 = _0x172a47[_0x1eae2b(0x289)],
                        _0x5e4eb4 = _0x172a47[_0x1eae2b(0x210)];
                    status = _0x1ad81f === 0x0 || _0xac53bf === 0x0 || _0x574301 === 0x0 || _0x5e4eb4 === 0x0 ? 0x0 : _0x1ad81f === 0x1 || _0xac53bf === 0x1 || _0x574301 === 0x1 || _0x5e4eb4 === 0x1 ? 0x1 : _0x1ad81f === 0x2 && _0xac53bf === 0x2 && _0x574301 === 0x2 && _0x5e4eb4 === 0x2 ? 0x2 : 0x3, worldstatusdata[_0x74eb5a['sitename']] = status, totalstatus += parseInt(status), sitecount++;
                    var _0x3cde29 = gettime();
                    _0x144e65 += '<tr\x20id=\x27' + _0x74eb5a['sitename'] + _0x1eae2b(0x2fa), _0x144e65 += _0x1eae2b(0x2a6) + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x2c0) + _0x74eb5a['sitename'] + _0x1eae2b(0x252) + _0x74eb5a[_0x1eae2b(0x2a0)] + 'font\x27\x20style=\x27color:\x20' + (status == 0x1 ? _0x1eae2b(0x202) : status == 0x2 ? _0x1eae2b(0x2ea) : status == 0x3 ? _0x1eae2b(0x1e4) : _0x1eae2b(0x2c1)) + ';font-size:medium\x27>' + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x222), _0x144e65 += _0x1eae2b(0x27f) + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x2d5) + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x333) + (_0x172a47[_0x1eae2b(0x276)] == 0x1 ? _0x1eae2b(0x202) : _0x172a47[_0x1eae2b(0x276)] == 0x2 ? _0x1eae2b(0x2ea) : _0x172a47[_0x1eae2b(0x276)] == 0x3 ? _0x1eae2b(0x1e4) : _0x1eae2b(0x2c1)) + _0x1eae2b(0x30d) + (_0x172a47[_0x1eae2b(0x276)] == 0x1 ? _0x1eae2b(0x202) : _0x172a47[_0x1eae2b(0x276)] == 0x2 ? _0x1eae2b(0x2ea) : _0x172a47[_0x1eae2b(0x276)] == 0x3 ? 'white' : 'red') + '\x27>' + (_0x172a47['bod'] == 0x1 ? _0x1eae2b(0x202) : _0x172a47[_0x1eae2b(0x276)] == 0x2 ? 'green' : _0x172a47['bod'] == 0x3 ? _0x1eae2b(0x1e4) : _0x1eae2b(0x2c1)) + _0x1eae2b(0x2c7), _0x144e65 += _0x1eae2b(0x27f) + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x279) + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x306) + (_0x172a47[_0x1eae2b(0x337)] == 0x1 ? 'orange' : _0x172a47[_0x1eae2b(0x337)] == 0x2 ? _0x1eae2b(0x2ea) : _0x172a47[_0x1eae2b(0x337)] == 0x3 ? 'white' : 'red') + ';color:' + (_0x172a47[_0x1eae2b(0x337)] == 0x1 ? _0x1eae2b(0x202) : _0x172a47[_0x1eae2b(0x337)] == 0x2 ? 'green' : _0x172a47[_0x1eae2b(0x337)] == 0x3 ? _0x1eae2b(0x1e4) : _0x1eae2b(0x2c1)) + '\x27>' + (_0x172a47[_0x1eae2b(0x337)] == 0x1 ? 'orange' : _0x172a47[_0x1eae2b(0x337)] == 0x2 ? _0x1eae2b(0x2ea) : _0x172a47[_0x1eae2b(0x337)] == 0x3 ? _0x1eae2b(0x1e4) : _0x1eae2b(0x2c1)) + _0x1eae2b(0x2c7), _0x144e65 += _0x1eae2b(0x27f) + _0x74eb5a['sitename'] + _0x1eae2b(0x300) + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x33a) + (_0x172a47[_0x1eae2b(0x289)] == 0x1 ? _0x1eae2b(0x202) : _0x172a47[_0x1eae2b(0x289)] == 0x2 ? 'green' : _0x172a47[_0x1eae2b(0x289)] == 0x3 ? _0x1eae2b(0x1e4) : 'red') + _0x1eae2b(0x30d) + (_0x172a47[_0x1eae2b(0x289)] == 0x1 ? 'orange' : _0x172a47[_0x1eae2b(0x289)] == 0x2 ? _0x1eae2b(0x2ea) : _0x172a47[_0x1eae2b(0x289)] == 0x3 ? _0x1eae2b(0x1e4) : _0x1eae2b(0x2c1)) + '\x27>' + (_0x172a47[_0x1eae2b(0x289)] == 0x1 ? _0x1eae2b(0x202) : _0x172a47[_0x1eae2b(0x289)] == 0x2 ? _0x1eae2b(0x2ea) : _0x172a47[_0x1eae2b(0x289)] == 0x3 ? _0x1eae2b(0x1e4) : _0x1eae2b(0x2c1)) + '</td>', _0x144e65 += '<td\x20id=\x27' + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x312) + _0x74eb5a['sitename'] + _0x1eae2b(0x20e) + (_0x172a47[_0x1eae2b(0x210)] == 0x1 ? _0x1eae2b(0x202) : _0x172a47['entity'] == 0x2 ? _0x1eae2b(0x2ea) : _0x172a47[_0x1eae2b(0x210)] == 0x3 ? _0x1eae2b(0x1e4) : _0x1eae2b(0x2c1)) + _0x1eae2b(0x30d) + (_0x172a47[_0x1eae2b(0x210)] == 0x1 ? 'orange' : _0x172a47[_0x1eae2b(0x210)] == 0x2 ? _0x1eae2b(0x2ea) : _0x172a47['entity'] == 0x3 ? _0x1eae2b(0x1e4) : _0x1eae2b(0x2c1)) + '\x27>' + (_0x172a47[_0x1eae2b(0x210)] == 0x1 ? _0x1eae2b(0x202) : _0x172a47[_0x1eae2b(0x210)] == 0x2 ? _0x1eae2b(0x2ea) : _0x172a47[_0x1eae2b(0x210)] == 0x3 ? 'white' : _0x1eae2b(0x2c1)) + _0x1eae2b(0x2c7), _0x144e65 += _0x1eae2b(0x27f) + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x223) + _0x1debb4 + _0x1eae2b(0x265) + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x2aa) + _0x1debb4 + _0x1eae2b(0x1f7), _0x144e65 += '<td\x20id=\x27' + _0x74eb5a[_0x1eae2b(0x2a0)] + _0x1eae2b(0x332) + _0x3cde29[_0x1eae2b(0x24e)] + ':' + _0x3cde29[_0x1eae2b(0x268)] + ':' + _0x3cde29[_0x1eae2b(0x2db)] + _0x1eae2b(0x2c7), mapsitedata[_0x74eb5a[_0x1eae2b(0x2a0)]][_0x1eae2b(0x243)] = _0x3cde29[_0x1eae2b(0x24e)] + ':' + _0x3cde29[_0x1eae2b(0x268)] + ':' + _0x3cde29[_0x1eae2b(0x2db)], _0x144e65 += _0x1eae2b(0x2eb);
                    if (Object[_0x1eae2b(0x2a8)](worldstatusdata)[_0x1eae2b(0x25a)]('0')) worldstatus = _0x1eae2b(0x28b);
                    else {
                        if (Object[_0x1eae2b(0x2a8)](worldstatusdata)[_0x1eae2b(0x25a)]('1')) worldstatus = _0x1eae2b(0x2bc);
                        else Object['values'](worldstatusdata)[_0x1eae2b(0x25a)]('2') ? worldstatus = '#228B22' : worldstatus = _0x1eae2b(0x26d);
                    }
                    loadmap(), sitecount == siteinfo[_0x1eae2b(0x22c)] && (sitecount = 0x0, _0x47dadb += '<div\x20class=\x22show-map\x22\x20id=\x22heatmap-view\x22\x20style=\x22display:none\x22>', _0x47dadb += _0x1eae2b(0x1f8), _0x47dadb += _0x1eae2b(0x31f), _0x47dadb += '<thead\x20class=\x22table-head\x20border-t\x22\x20style=\x22text-align:center\x22>', _0x47dadb += '<tr>', _0x47dadb += _0x1eae2b(0x2e1), _0x47dadb += _0x1eae2b(0x240), _0x47dadb += _0x1eae2b(0x28f), _0x47dadb += _0x1eae2b(0x2c6), _0x47dadb += _0x1eae2b(0x22f), _0x47dadb += _0x1eae2b(0x2ae), _0x47dadb += '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alarm-check\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>LAST\x20UPDATE</span></th>', _0x47dadb += _0x1eae2b(0x2eb), _0x47dadb += _0x1eae2b(0x290), _0x47dadb += '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22\x20>', _0x47dadb += _0x144e65, _0x47dadb += _0x1eae2b(0x2be), _0x47dadb += '</table>', _0x47dadb += _0x1eae2b(0x1ef), _0x47dadb += '</div>', appendheatmap(_0x47dadb)), clearTimeout(mapintervaldata[_0x74eb5a[_0x1eae2b(0x2a0)]]), mapintervaldata[_0x74eb5a[_0x1eae2b(0x2a0)]] = setTimeout(function () {
                        var _0x202162 = _0x1eae2b;
                        seperateRef(_0x1debb4, _0x74eb5a[_0x202162(0x2a0)]);
                    }, 0xea60);
                })[_0x323cb1(0x1e2)](function (_0x84521b) {
                    var _0x4c44ad = _0x323cb1;
                    mapsitedata[_0x74eb5a['sitename']] = {}, mapsitedata[_0x74eb5a[_0x4c44ad(0x2a0)]][_0x4c44ad(0x276)] = null, mapsitedata[_0x74eb5a['sitename']][_0x4c44ad(0x337)] = null, mapsitedata[_0x74eb5a[_0x4c44ad(0x2a0)]][_0x4c44ad(0x289)] = null, mapsitedata[_0x74eb5a[_0x4c44ad(0x2a0)]][_0x4c44ad(0x210)] = null, sitenull_list[_0x74eb5a[_0x4c44ad(0x2a0)]] = null, worldstatusdata[_0x74eb5a[_0x4c44ad(0x2a0)]] = 0x0, $(_0x4c44ad(0x291))[_0x4c44ad(0x26b)]('color', _0x4c44ad(0x202)), $('#software-title-clr')['css'](_0x4c44ad(0x310), _0x4c44ad(0x202)), $(_0x4c44ad(0x344))[_0x4c44ad(0x26b)](_0x4c44ad(0x310), _0x4c44ad(0x202));
                    var _0x4abff0 = '';
                    _0x361597 < 0x1 ? (_0x144e65 += _0x4c44ad(0x1ea) + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x2fa), _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x30b) + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x252) + _0x74eb5a[_0x4c44ad(0x2a0)] + 'font\x27\x20style=\x27color:red;font-size:medium\x27>' + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x222), _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a['sitename'] + 'bod\x27\x20onclick=\x27siteredirect(\x22/lesites?site=' + _0x74eb5a['sitename'] + _0x4c44ad(0x2da), _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a['sitename'] + _0x4c44ad(0x279) + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x2fb), _0x144e65 += '<td\x20id=\x27' + _0x74eb5a['sitename'] + _0x4c44ad(0x300) + _0x74eb5a[_0x4c44ad(0x2a0)] + '\x22,\x22adpLED\x22)\x27\x20\x20style=\x27background-color:#fff;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;\x27>white</td>', _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a[_0x4c44ad(0x2a0)] + 'entity\x27\x20onclick=\x27siteredirect(\x22/lesites?site=' + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x20b), _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a['sitename'] + _0x4c44ad(0x223) + _0x1debb4 + _0x4c44ad(0x265) + _0x74eb5a['sitename'] + _0x4c44ad(0x201) + _0x1debb4 + _0x4c44ad(0x1f7), _0x144e65 += '<td\x20id=\x27' + _0x74eb5a['sitename'] + _0x4c44ad(0x21b) + _0x4c44ad(0x30f) + '</td>') : (_0x144e65 += '<tr\x20id=\x27' + _0x74eb5a['sitename'] + _0x4c44ad(0x2fa), _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a[_0x4c44ad(0x2a0)] + 'sitename\x27\x20class\x20=\x20\x27site\x20fixed-column\x27\x20>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<a\x20class=\x27dropdown-item\x20preview-item\x27\x20href\x20=\x20\x27/lesites?site=' + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x252) + _0x74eb5a['sitename'] + _0x4c44ad(0x229) + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x222), _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a['sitename'] + _0x4c44ad(0x2d5) + _0x74eb5a['sitename'] + _0x4c44ad(0x285), _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x279) + _0x74eb5a[_0x4c44ad(0x2a0)] + '\x22,\x22eodLED\x22)\x27\x20style=\x27background-color:#fff;border-left:\x201px\x20solid\x20#000;border-bottom:\x201px\x20solid\x20#000;text-align:center;\x27></td>', _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a['sitename'] + 'adp\x27\x20onclick=\x27siteredirect(\x22/lesites?site=' + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x317), _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x312) + _0x74eb5a['sitename'] + _0x4c44ad(0x2f5), _0x144e65 += '<td\x20id=\x27' + _0x74eb5a['sitename'] + _0x4c44ad(0x223) + _0x1debb4 + _0x4c44ad(0x265) + _0x74eb5a[_0x4c44ad(0x2a0)] + _0x4c44ad(0x201) + _0x1debb4 + _0x4c44ad(0x1f7), _0x144e65 += _0x4c44ad(0x27f) + _0x74eb5a['sitename'] + _0x4c44ad(0x21b) + '\x20-\x20:\x20-\x20:\x20-' + _0x4c44ad(0x2c7));
                    _0x361597++, sitecount++;
                    if (Object['values'](worldstatusdata)['includes']('0')) worldstatus = _0x4c44ad(0x28b);
                    else {
                        if (Object[_0x4c44ad(0x2a8)](worldstatusdata)[_0x4c44ad(0x25a)]('1')) worldstatus = _0x4c44ad(0x2bc);
                        else Object[_0x4c44ad(0x2a8)](worldstatusdata)['includes']('2') ? worldstatus = _0x4c44ad(0x245) : worldstatus = _0x4c44ad(0x26d);
                    }
                    loadmap(), sitecount == siteinfo[_0x4c44ad(0x22c)] && (_0x47dadb += _0x4c44ad(0x329), _0x47dadb += _0x4c44ad(0x1f8), _0x47dadb += _0x4c44ad(0x31f), _0x47dadb += _0x4c44ad(0x315), _0x47dadb += _0x4c44ad(0x328), _0x47dadb += _0x4c44ad(0x2e1), _0x47dadb += _0x4c44ad(0x240), _0x47dadb += '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-e-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>EOD</span></th>', _0x47dadb += '<th\x20class=\x22has-details\x22><i\x20class=\x22mdi\x20mdi-alpha-a-box\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>ADP</span></th>', _0x47dadb += '<th\x20class=\x22has-details\x22><i\x20class=\x22icon-node\x22\x20style=\x22font-size:1.5rem\x22></i><span\x20class=\x22\x20details\x22>ENTITY</span></th>', _0x47dadb += _0x4c44ad(0x2ae), _0x47dadb += _0x4c44ad(0x251), _0x47dadb += _0x4c44ad(0x2eb), _0x47dadb += _0x4c44ad(0x290), _0x47dadb += _0x4c44ad(0x25b), _0x47dadb += _0x144e65, _0x47dadb += _0x4c44ad(0x2be), _0x47dadb += _0x4c44ad(0x339), _0x47dadb += _0x4c44ad(0x1ef), _0x47dadb += _0x4c44ad(0x1ef), appendheatmap(_0x47dadb)), clearTimeout(mapintervaldata[_0x74eb5a[_0x4c44ad(0x2a0)]]), mapintervaldata[_0x74eb5a['sitename']] = setTimeout(function () {
                        var _0xc2ba37 = _0x4c44ad;
                        seperateRef(_0x1debb4, _0x74eb5a[_0xc2ba37(0x2a0)]);
                    }, 0xea60);
                });
            });
        }
        $('#audience-map')['length'] && (allSiteNames == '' ? requestDataFromServer(_0x18bf2e(0x33c), {
            'type': _0x18bf2e(0x22a),
            'isOnlyEnabled': !![]
        }, _0x18bf2e(0x29a))[_0x18bf2e(0x29c)](function (_0x155832) {
            var _0x1dbb97 = _0x18bf2e;
            allSiteNames = _0x155832, SiteObj = JSON['parse'](_0x155832), counts <= 0x1 && (SiteObj['data'][_0x1dbb97(0x29d)](function (_0x369ab0) {
                var _0x3d2079 = _0x1dbb97;
                makeWebSocConnection(_0x369ab0['websocket_url'], _0x369ab0[_0x3d2079(0x2a0)], 0x0, 0x0, _0x369ab0['sitename']);
            }), counts++), _0xd6d255(_0x155832);
        }) : (SiteObj = JSON[_0x18bf2e(0x2f9)](allSiteNames), counts <= 0x1 && (SiteObj['data'][_0x18bf2e(0x29d)](function (_0x2ca387) {
            var _0x3f3c82 = _0x18bf2e;
            makeWebSocConnection(_0x2ca387[_0x3f3c82(0x2f0)], _0x2ca387[_0x3f3c82(0x2a0)], 0x0, 0x0, _0x2ca387[_0x3f3c82(0x2a0)]);
        }), counts++), _0xd6d255(allSiteNames)));
        $(_0x18bf2e(0x32c))[_0x18bf2e(0x22c)] && (allSiteNames == '' ? requestDataFromServer(_0x18bf2e(0x33c), {
            'type': _0x18bf2e(0x22a),
            'isOnlyEnabled': !![]
        }, _0x18bf2e(0x29a))[_0x18bf2e(0x29c)](function (_0x3a62c9) {
            var _0x579c4a = _0x18bf2e;
            allSiteNames = _0x3a62c9;
            var _0x5269fa = triggerThis(_0x3a62c9)[_0x579c4a(0x2ca)](function () {
                var _0x19935d = _0x579c4a;
                $(_0x19935d(0x32c))[_0x19935d(0x1f1)]({
                    'map': _0x19935d(0x267),
                    'normalizeFunction': _0x19935d(0x2f4),
                    'hoverOpacity': 0.7,
                    'hoverColor': ![],
                    'backgroundColor': _0x19935d(0x2b7),
                    'markers': a[_0x19935d(0x32d)](function (_0x1bb191) {
                        var _0x1f6a91 = _0x19935d;
                        return {
                            'name': _0x1bb191[_0x1f6a91(0x32f)],
                            'latLng': _0x1bb191[_0x1f6a91(0x2a3)],
                            'array': _0x1bb191['colorarray'],
                            'statename': _0x1bb191[_0x1f6a91(0x343)],
                            'status': _0x1bb191[_0x1f6a91(0x24f)],
                            'bod': _0x1bb191[_0x1f6a91(0x276)],
                            'entity': _0x1bb191[_0x1f6a91(0x210)],
                            'eod': _0x1bb191[_0x1f6a91(0x337)],
                            'adp': _0x1bb191[_0x1f6a91(0x289)]
                        };
                    }),
                    'markerStyle': {
                        'initial': {
                            'width': 0x1,
                            'height': 0x1
                        }
                    },
                    'backgroundColor': _0x19935d(0x211),
                    'panOnDrag': !![],
                    'focusOn': {
                        'x': 1.5,
                        'y': 1.5,
                        'scale': 0x1,
                        'animate': !![]
                    },
                    'onMarkerTipShow': function (_0x373986, _0x5ed5d1, _0x2de5c3) {
                        var _0x4f5c4d = _0x19935d,
                            _0x2a807f = [],
                            _0x23b5ba = [],
                            _0x1b5de5 = [],
                            _0x2faa42 = [],
                            _0x4ec4d5 = a['reduce'](function (_0xcc7f1d, _0x377653, _0x4c4773) {
                                var _0x57922f = _0x39bc;
                                return _0xcc7f1d[_0x4c4773] = _0x377653[_0x57922f(0x32f)], _0x2a807f[_0x4c4773] = _0x377653[_0x57922f(0x276)], _0x23b5ba[_0x4c4773] = _0x377653[_0x57922f(0x210)], _0x1b5de5[_0x4c4773] = _0x377653[_0x57922f(0x337)], _0x2faa42[_0x4c4773] = _0x377653[_0x57922f(0x289)], _0xcc7f1d;
                            }, {});
                        _0x5ed5d1[_0x4f5c4d(0x21f)]('<b>SITENAME\x20:\x20' + _0x4ec4d5[parseInt(_0x2de5c3)] + '</b><br/>' + '<b>BOD:</b>' + _0x2a807f[parseInt(_0x2de5c3)] + _0x4f5c4d(0x200) + _0x4f5c4d(0x292) + _0x23b5ba[parseInt(_0x2de5c3)] + _0x4f5c4d(0x200) + _0x4f5c4d(0x23a) + _0x1b5de5[parseInt(_0x2de5c3)] + _0x4f5c4d(0x200) + _0x4f5c4d(0x2b6) + _0x2faa42[parseInt(_0x2de5c3)] + _0x4f5c4d(0x200));
                    },
                    'onRegionClick': function (_0x2e1b42, _0x478983) {
                        var _0x29b0eb = _0x19935d;
                        requestDataFromServer(_0x29b0eb(0x33c), {
                            'type': 'locationbased',
                            'location': _0x478983
                        }, _0x29b0eb(0x29a))[_0x29b0eb(0x29c)](function (_0x160c5c) {
                            var _0x132e27 = _0x29b0eb,
                                _0x3d0da3 = JSON[_0x132e27(0x2f9)](_0x160c5c);
                            if (_0x3d0da3[_0x132e27(0x24f)] == 0xc8) {
                                if (_0x3d0da3[_0x132e27(0x2e6)][_0x132e27(0x22c)] == 0x64) siteinfo = _0x3d0da3[_0x132e27(0x2e6)][0x0], window[_0x132e27(0x27c)](_0x132e27(0x2fd) + siteinfo[_0x132e27(0x2a0)], _0x132e27(0x322));
                                else {
                                    if (_0x3d0da3[_0x132e27(0x2e6)][_0x132e27(0x22c)] >= 0x1) {
                                        siteinfo = _0x3d0da3[_0x132e27(0x2e6)];
                                        var _0x3c7a71 = '';
                                    } else document[_0x132e27(0x226)](_0x132e27(0x228))[_0x132e27(0x23d)] = '';
                                }
                            }
                        });
                    },
                    'series': {
                        'markers': [{
                            'attribute': _0x19935d(0x28c),
                            'scale': {
                                '3': _0x19935d(0x275),
                                '2': _0x19935d(0x282),
                                '1': _0x19935d(0x2c4),
                                '0': _0x19935d(0x2d6)
                            },
                            'values': a[_0x19935d(0x2cd)](function (_0x237944, _0x25441e, _0x1e4f90) {
                                var _0xd68bd9 = _0x19935d;
                                return _0x237944[_0x1e4f90] = _0x25441e[_0xd68bd9(0x24f)], _0x237944;
                            }, {})
                        }]
                    },
                    'onMarkerClick': function (_0x23be83, _0x1cebda) {
                        window['open'](a[_0x1cebda]['weburl']);
                    }
                });
            });
        }) : triggerThis(allSiteNames)[_0x18bf2e(0x2ca)](function () {
            var _0x5348b3 = _0x18bf2e;
            $('#india-map')['vectorMap']({
                'map': _0x5348b3(0x267),
                'normalizeFunction': _0x5348b3(0x2f4),
                'hoverOpacity': 0.7,
                'hoverColor': ![],
                'backgroundColor': _0x5348b3(0x2b7),
                'markers': a[_0x5348b3(0x32d)](function (_0xe2dd26) {
                    var _0x5051fd = _0x5348b3;
                    return {
                        'name': _0xe2dd26[_0x5051fd(0x32f)],
                        'latLng': _0xe2dd26[_0x5051fd(0x2a3)],
                        'array': _0xe2dd26[_0x5051fd(0x25d)],
                        'statename': _0xe2dd26['statename'],
                        'status': _0xe2dd26[_0x5051fd(0x24f)],
                        'bod': _0xe2dd26[_0x5051fd(0x276)],
                        'entity': _0xe2dd26['entity'],
                        'servers': _0xe2dd26[_0x5051fd(0x32b)]
                    };
                }),
                'markerStyle': {
                    'initial': {
                        'width': 0x1,
                        'height': 0x1
                    }
                },
                'backgroundColor': 'transparent',
                'panOnDrag': !![],
                'focusOn': {
                    'x': 1.5,
                    'y': 1.5,
                    'scale': 0x1,
                    'animate': !![]
                },
                'onMarkerTipShow': function (_0x320dc4, _0x59c262, _0x4319bc) {
                    var _0x5ce0f7 = _0x5348b3,
                        _0x4e608a = [],
                        _0x17130d = [],
                        _0x574412 = [],
                        _0xb0d40 = a[_0x5ce0f7(0x2cd)](function (_0x24b252, _0x4d38e6, _0x14ac3c) {
                            var _0x81fd7c = _0x5ce0f7;
                            return _0x24b252[_0x14ac3c] = _0x4d38e6[_0x81fd7c(0x32f)], _0x4e608a[_0x14ac3c] = _0x4d38e6[_0x81fd7c(0x276)], _0x17130d[_0x14ac3c] = _0x4d38e6[_0x81fd7c(0x210)], _0x574412[_0x14ac3c] = _0x4d38e6['servers'], _0x24b252;
                        }, {});
                    _0x59c262[_0x5ce0f7(0x21f)](_0x5ce0f7(0x264) + _0xb0d40[parseInt(_0x4319bc)] + _0x5ce0f7(0x2a5) + _0x5ce0f7(0x260) + _0x4e608a[parseInt(_0x4319bc)] + _0x5ce0f7(0x200) + _0x5ce0f7(0x292) + _0x17130d[parseInt(_0x4319bc)] + '</br>' + _0x5ce0f7(0x21e) + _0x574412[parseInt(_0x4319bc)] + '</br>');
                },
                'onRegionClick': function (_0x5a01b0, _0x1bc67c) {
                    var _0x562257 = _0x5348b3;
                    requestDataFromServer(_0x562257(0x33c), {
                        'type': _0x562257(0x29b),
                        'location': _0x1bc67c
                    }, _0x562257(0x29a))[_0x562257(0x29c)](function (_0x1fdfd6) {
                        var _0x531c69 = _0x562257,
                            _0x4b7eac = JSON[_0x531c69(0x2f9)](_0x1fdfd6);
                        if (_0x4b7eac['status'] == 0xc8) {
                            if (_0x4b7eac[_0x531c69(0x2e6)][_0x531c69(0x22c)] == 0x64) siteinfo = _0x4b7eac[_0x531c69(0x2e6)][0x0], window[_0x531c69(0x27c)]('/lesites?site=' + siteinfo[_0x531c69(0x2a0)], '_blank');
                            else {
                                if (_0x4b7eac[_0x531c69(0x2e6)]['length'] >= 0x1) {
                                    siteinfo = _0x4b7eac[_0x531c69(0x2e6)];
                                    var _0x29b173 = '';
                                } else document[_0x531c69(0x226)](_0x531c69(0x228))[_0x531c69(0x23d)] = '';
                            }
                        }
                    });
                },
                'series': {
                    'markers': [{
                        'attribute': _0x5348b3(0x28c),
                        'scale': {
                            '1': '/static/app/images/green-navigator.png',
                            '0': _0x5348b3(0x2d6)
                        },
                        'values': a['reduce'](function (_0x57836a, _0x3cf1f5, _0x1fe609) {
                            var _0x104c00 = _0x5348b3;
                            return _0x57836a[_0x1fe609] = _0x3cf1f5[_0x104c00(0x24f)], _0x57836a;
                        }, {})
                    }]
                },
                'onMarkerClick': function (_0x59f2f6, _0x14f445) {
                    var _0xb30b18 = _0x5348b3;
                    window[_0xb30b18(0x27c)](a[_0x14f445][_0xb30b18(0x255)]);
                }
            });
        }));
        $('#owl-carousel-basic')['length'] && $(_0x18bf2e(0x237))[_0x18bf2e(0x271)]({
            'loop': !![],
            'margin': 0xa,
            'dots': ![],
            'nav': !![],
            'autoplay': !![],
            'autoplayTimeout': 0x1194,
            'navText': ['<i\x20class=\x27mdi\x20mdi-chevron-left\x27></i>', _0x18bf2e(0x1fc)],
            'responsive': {
                0x0: {
                    'items': 0x1
                },
                0x258: {
                    'items': 0x1
                },
                0x3e8: {
                    'items': 0x1
                }
            }
        });
        var _0x3a5d62 = $('body')[_0x18bf2e(0x281)](_0x18bf2e(0x278));
        $(_0x18bf2e(0x28d))[_0x18bf2e(0x22c)] && $(_0x18bf2e(0x28d))[_0x18bf2e(0x271)]({
            'loop': !![],
            'margin': 0xa,
            'dots': ![],
            'nav': !![],
            'rtl': _0x3a5d62,
            'autoplay': !![],
            'autoplayTimeout': 0x1194,
            'navText': [_0x18bf2e(0x1fc), _0x18bf2e(0x341)],
            'responsive': {
                0x0: {
                    'items': 0x1
                },
                0x258: {
                    'items': 0x1
                },
                0x3e8: {
                    'items': 0x1
                }
            }
        });
    });
} (function (_0x4aeb25) {
    mapload();
}(jQuery));

function displaytooltip(_0x5d43c4, _0x45b906) {
    var _0x429a07 = _0x4b7b4a;
    document['getElementById'](_0x45b906)[_0x429a07(0x258)][_0x429a07(0x2de)]('shown') ? (document[_0x429a07(0x226)](_0x5d43c4)[_0x429a07(0x258)][_0x429a07(0x28a)](_0x429a07(0x1e9)), document['getElementById'](_0x45b906)['classList'][_0x429a07(0x28a)]('shown')) : (document[_0x429a07(0x226)](_0x5d43c4)[_0x429a07(0x258)][_0x429a07(0x30c)](_0x429a07(0x1e9)), document[_0x429a07(0x226)](_0x45b906)[_0x429a07(0x258)][_0x429a07(0x30c)]('shown'));
}

function _0x39bc(_0x510e52, _0x5e9257) {
    var _0x23628a = _0x2362();
    return _0x39bc = function (_0x39bca7, _0xfe1023) {
        _0x39bca7 = _0x39bca7 - 0x1e1;
        var _0xab6479 = _0x23628a[_0x39bca7];
        return _0xab6479;
    }, _0x39bc(_0x510e52, _0x5e9257);
}
var sitesname = 'msitesname',
    wsocname = _0x4b7b4a(0x249),
    maphtml = _0x4b7b4a(0x2b0) + wsocname + _0x4b7b4a(0x1f3) + sitesname + '\x27)\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22tooltiptext\x22\x20id=\x22msitesname\x22\x20style=\x22overflow-y:scroll\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p><b>Queue\x20Name\x20:</b>\x20map_update</p>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</i>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>';
$('#map-html')['empty'](), $(_0x4b7b4a(0x1e5))[_0x4b7b4a(0x20d)](maphtml);

function iconclose(_0x4a6148) {
    var _0xd5cbfd = _0x4b7b4a;
    isToBeConnect = !{}[!![]], mapobj[_0x4a6148][_0xd5cbfd(0x287)]();
}

function iconconnect(_0xc8f559) {
    isToBeConnect = {}[!![]], makeWebSocConnection(mapobj[_0xc8f559]['ws']['url'], mapobj[_0xc8f559]['id'], 0x0);
}
var alltrue = {},
    sitenum = 0x0;

function makeWebSocConnection(_0x380363, _0x10f9fd, _0x4017d1, _0x52f1bc, _0x1fcea7) {
    var _0x3c23b8 = _0x4b7b4a,
        _0x54ad63 = _0x3c23b8(0x1f9) + _0x1fcea7;
    try {
        if (window['WebSocket']) {
            var _0x54a281 = _0x3c23b8(0x2d3);
            _0x54ad63 = Stomp[_0x3c23b8(0x2cb)](_0x380363), _0x54ad63['id'] = _0x10f9fd, _0x54ad63[_0x3c23b8(0x301)] = _0x4017d1, mapobj[_0x10f9fd] = _0x54ad63;
            if (document[_0x3c23b8(0x226)](_0x10f9fd) == null) {
                var _0x1ff315 = '';
                _0x1ff315 += _0x3c23b8(0x2c8), _0x1ff315 += _0x3c23b8(0x286) + _0x10f9fd + _0x3c23b8(0x2ac), _0x1ff315 += _0x3c23b8(0x1f6), _0x1ff315 += '<thead></thead>', _0x1ff315 += _0x3c23b8(0x23f), _0x1ff315 += _0x3c23b8(0x2b2), _0x1ff315 += _0x3c23b8(0x342) + _0x10f9fd + _0x3c23b8(0x2c7), _0x1ff315 += _0x3c23b8(0x204) + _0x10f9fd + 'status-conn\x22\x20></td>', _0x1ff315 += _0x3c23b8(0x2eb), _0x1ff315 += _0x3c23b8(0x2be), _0x1ff315 += '</table>', _0x1ff315 += _0x3c23b8(0x295) + _0x10f9fd + _0x3c23b8(0x345) + _0x10f9fd + _0x3c23b8(0x250) + _0x10f9fd + '\x27)\x22\x20></i\x20></p>', _0x1ff315 += _0x3c23b8(0x1ef), $('#msitesname')[_0x3c23b8(0x20d)](_0x1ff315), alltrue[_0x10f9fd] = 0x0, sitenum++;
            }
            var _0xd952a2 = function () {
                var _0x17b909 = _0x3c23b8;
                wsConnected = !![];
                var _0x2a138b = sitesData[0x0];
                _0x2a138b['isWSConnected'] = !![], isToBeConnect = {}[!![]], document[_0x17b909(0x226)](_0x10f9fd + 'status-conn')[_0x17b909(0x32a)] = 'True(0)', document[_0x17b909(0x226)](_0x10f9fd + _0x17b909(0x2f8))[_0x17b909(0x25e)]['color'] = '#16d39a', document[_0x17b909(0x226)](_0x17b909(0x28e))[_0x17b909(0x303)] = 'mdi\x20mdi-check-network-outline\x20tooltip', $(_0x17b909(0x2d2) + _0x10f9fd)[_0x17b909(0x26b)](_0x17b909(0x2c3), 'none'), alltrue[_0x10f9fd] = 0x1, document[_0x17b909(0x226)](_0x10f9fd + 'mlast-conn')[_0x17b909(0x32a)] = _0x17b909(0x2bb) + maplastreconnect;
                var _0x1db2e8 = Object[_0x17b909(0x2a8)](alltrue),
                    _0x10c1ab = _0x1db2e8[_0x17b909(0x2cd)](function (_0x4f8bf6, _0x10749b) {
                        return _0x4f8bf6 + _0x10749b;
                    });
                sitenum == _0x10c1ab ? document[_0x17b909(0x226)](_0x17b909(0x249))[_0x17b909(0x25e)]['color'] = _0x17b909(0x247) : document['getElementById']('map-pipe')[_0x17b909(0x25e)][_0x17b909(0x310)] = _0x17b909(0x1ff), _0x54ad63[_0x17b909(0x21d)](_0x54a281, function (_0x3b3da1) {
                    var _0x5450c8 = _0x17b909;
                    typeof _0x3b3da1[_0x5450c8(0x334)] == 'string' ? update = JSON[_0x5450c8(0x2f9)](_0x3b3da1[_0x5450c8(0x334)]) : update = _0x3b3da1[_0x5450c8(0x334)];
                    if (update[_0x5450c8(0x246)] == 0x1) {
                        istableappended = ![];
                        var _0x21b255 = update['site'];
                        !document[_0x5450c8(0x226)](_0x5450c8(0x2df))[_0x5450c8(0x258)][_0x5450c8(0x2de)](_0x5450c8(0x27a)) && document[_0x5450c8(0x226)]('left-arrow')[_0x5450c8(0x212)](), seperateRef(targetdata[_0x21b255 + _0x5450c8(0x2e7)], _0x21b255), document[_0x5450c8(0x226)]('audience-map-div')[_0x5450c8(0x258)][_0x5450c8(0x2de)](_0x5450c8(0x288)) && document[_0x5450c8(0x226)](_0x5450c8(0x2df))['classList']['remove'](_0x5450c8(0x288)), count++;
                    }
                });
            },
                _0x18f72c = function (_0x4eafc5) {
                    var _0x531dfa = _0x3c23b8,
                        _0x4c46db = sitesData[0x0];
                    isToBeConnect = !{}[!![]], _0x54ad63[_0x531dfa(0x301)]++;
                    const _0x52e878 = new Date(),
                        _0x59916e = new Date(_0x52e878);
                    var _0x42cbd2 = _0x59916e['getMonth']() + 0x1,
                        _0x22679e = _0x59916e[_0x531dfa(0x227)](),
                        _0x12902f = _0x59916e[_0x531dfa(0x2dc)](),
                        _0x75f46d = _0x59916e[_0x531dfa(0x2d4)](),
                        _0x3ef78c = _0x59916e[_0x531dfa(0x336)](),
                        _0xc95f9d = _0x59916e[_0x531dfa(0x309)](),
                        _0x6dddc2 = _0x22679e + '/' + _0x42cbd2 + '/' + _0x12902f + '\x20' + _0x75f46d + ':' + _0x3ef78c + ':' + _0xc95f9d;
                    maplastreconnect = _0x6dddc2[_0x531dfa(0x244)](), document[_0x531dfa(0x226)](_0x10f9fd + _0x531dfa(0x2f8))[_0x531dfa(0x32a)] = _0x531dfa(0x31c) + _0x54ad63[_0x531dfa(0x301)] + ')', document[_0x531dfa(0x226)](_0x10f9fd + _0x531dfa(0x2f8))[_0x531dfa(0x25e)][_0x531dfa(0x310)] = _0x531dfa(0x1ff), document[_0x531dfa(0x226)]('icon-chats')['className'] = _0x531dfa(0x314), alltrue[_0x10f9fd] = 0x0, document[_0x531dfa(0x226)](_0x10f9fd + 'mlast-conn')[_0x531dfa(0x32a)] = _0x531dfa(0x2bb) + maplastreconnect, $(_0x531dfa(0x2d2) + _0x10f9fd)[_0x531dfa(0x26b)](_0x531dfa(0x2c3), 'block');
                    var _0x4d0fe3 = Object['values'](alltrue),
                        _0x1add26 = _0x4d0fe3[_0x531dfa(0x2cd)](function (_0x9be9e, _0x1ab043) {
                            return _0x9be9e + _0x1ab043;
                        });
                    sitenum == _0x1add26 ? document[_0x531dfa(0x226)](_0x531dfa(0x249))[_0x531dfa(0x25e)]['color'] = _0x531dfa(0x247) : document[_0x531dfa(0x226)]('map-pipe')[_0x531dfa(0x25e)][_0x531dfa(0x310)] = _0x531dfa(0x1ff);
                    _0x4c46db[_0x531dfa(0x20c)] = ![];
                    if (networkStatus === 'online') {
                        if (_0x54ad63[_0x531dfa(0x301)] >= 0xa) isToBeConnect = !{}[!![]];
                        else {
                            const _0x71679c = new Date(),
                                _0x27833f = new Date(_0x71679c);
                            var _0x42cbd2 = _0x27833f[_0x531dfa(0x313)]() + 0x1,
                                _0x22679e = _0x27833f[_0x531dfa(0x227)](),
                                _0x12902f = _0x27833f[_0x531dfa(0x2dc)](),
                                _0x75f46d = _0x27833f['getHours'](),
                                _0x3ef78c = _0x27833f[_0x531dfa(0x336)](),
                                _0xc95f9d = _0x27833f[_0x531dfa(0x309)](),
                                _0x6dddc2 = _0x22679e + '/' + _0x42cbd2 + '/' + _0x12902f + '\x20' + _0x75f46d + ':' + _0x3ef78c + ':' + _0xc95f9d;
                            maplastreconnect = _0x6dddc2[_0x531dfa(0x244)](), document[_0x531dfa(0x226)](_0x10f9fd + 'status-conn')[_0x531dfa(0x32a)] = _0x531dfa(0x26f) + _0x54ad63[_0x531dfa(0x301)] + ')', document[_0x531dfa(0x226)](_0x10f9fd + _0x531dfa(0x2f8))[_0x531dfa(0x25e)][_0x531dfa(0x310)] = _0x531dfa(0x2bc), document[_0x531dfa(0x226)](_0x531dfa(0x28e))[_0x531dfa(0x303)] = _0x531dfa(0x2ef), alltrue[_0x10f9fd] = 0x0, document[_0x531dfa(0x226)](_0x10f9fd + 'mlast-conn')[_0x531dfa(0x32a)] = _0x531dfa(0x2bb) + maplastreconnect, $(_0x531dfa(0x2d2) + _0x10f9fd)[_0x531dfa(0x26b)](_0x531dfa(0x2c3), 'block');
                            var _0x4d0fe3 = Object['values'](alltrue),
                                _0x1add26 = _0x4d0fe3[_0x531dfa(0x2cd)](function (_0x49ce18, _0x4b48ee) {
                                    return _0x49ce18 + _0x4b48ee;
                                });
                            sitenum == _0x1add26 ? document[_0x531dfa(0x226)]('map-pipe')[_0x531dfa(0x25e)]['color'] = _0x531dfa(0x247) : document[_0x531dfa(0x226)](_0x531dfa(0x249))[_0x531dfa(0x25e)]['color'] = _0x531dfa(0x2bc), (isToBeConnect = {}[!![]]) && makeWebSocConnection(_0x54ad63['ws'][_0x531dfa(0x254)], _0x54ad63['id'], _0x54ad63[_0x531dfa(0x301)]);
                        }
                    }
                };
            _0x54ad63[_0x3c23b8(0x305)](_0x3c23b8(0x2ab), 'linkedeye', _0xd952a2, _0x18f72c, '/');
        } else alert(_0x3c23b8(0x1ee));
    } catch (_0x5571de) {
        return;
    }
    if (websitename != '') wsnamehtml = '<p><b>' + websitename + _0x3c23b8(0x215) + wsConnected + _0x3c23b8(0x2fe), $('#' + websitename + _0x3c23b8(0x302))['append'](wsnamehtml);
    else { }
}