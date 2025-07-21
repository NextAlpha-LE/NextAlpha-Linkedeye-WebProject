var _0xe113df = _0x4a94;
(function (_0x513755, _0x3d9caf) {
    var _0x41e9a3 = _0x4a94,
        _0xf0b3a2 = _0x513755();
    while (!![]) {
        try {
            var _0x36e6d3 = -parseInt(_0x41e9a3(0x163)) / 0x1 + -parseInt(_0x41e9a3(0x177)) / 0x2 + -parseInt(_0x41e9a3(0x168)) / 0x3 + parseInt(_0x41e9a3(0x192)) / 0x4 + parseInt(_0x41e9a3(0x18d)) / 0x5 * (parseInt(_0x41e9a3(0x182)) / 0x6) + parseInt(_0x41e9a3(0x17c)) / 0x7 + parseInt(_0x41e9a3(0x16a)) / 0x8;
            if (_0x36e6d3 === _0x3d9caf) break;
            else _0xf0b3a2['push'](_0xf0b3a2['shift']());
        } catch (_0x50c36c) {
            _0xf0b3a2['push'](_0xf0b3a2['shift']());
        }
    }
}(_0x382d, 0x814e7));
var dataResponse, bodeodFinalStatus = '',
    connectionTries = 0x6,
    isWSConnected = ![];
sites = [];
var siteHtml = '\x20';
selectedsite = '\x20';

function _0x4a94(_0x304960, _0x3096b3) {
    var _0x382db4 = _0x382d();
    return _0x4a94 = function (_0x4a944d, _0x1893d5) {
        _0x4a944d = _0x4a944d - 0x148;
        var _0x440fd1 = _0x382db4[_0x4a944d];
        return _0x440fd1;
    }, _0x4a94(_0x304960, _0x3096b3);
}
var bodSiteResponse, bodSitesData = [],
    bodeodResponse;
$(document)[_0xe113df(0x14f)](function () {
    getCalendarData();
});

function getCalendarData() {
    var _0x5af9be = _0xe113df;
    showLoader(_0x5af9be(0x172)), requestDataFromServer('/calendar/getCalendarData', {}, 'GET')[_0x5af9be(0x14d)](calendarDataResponse);
}

function myFunction(_0x1b8203) {
    var _0x1d2ca3 = _0xe113df,
        _0x250fc5 = _0x1b8203['querySelector']('i');
    _0x250fc5['classList'][_0x1d2ca3(0x14b)](_0x1d2ca3(0x150)), _0x250fc5['classList'][_0x1d2ca3(0x14b)]('mdi-menu-down');
}

function calendarDataResponse(_0x2511ab) {
    var _0x53fac6 = _0xe113df;
    stopLoader(_0x53fac6(0x172));
    if (_0x2511ab == undefined) return;
    _0x2511ab[_0x53fac6(0x14a)] == 0xc8 ? (dataResponse = _0x2511ab[_0x53fac6(0x17e)], _0x2511ab[_0x53fac6(0x17e)][_0x53fac6(0x193)] > 0x0 ? (finalHtml = '\x20', mfinalHtml = '\x20', $(_0x53fac6(0x167))[_0x53fac6(0x170)](), _0x2511ab[_0x53fac6(0x17e)][_0x53fac6(0x15d)](function (_0x18c27c) {
        var _0x4dde26 = _0x53fac6;
        if (_0x18c27c[_0x4dde26(0x154)] === _0x4dde26(0x15c)) html = displayKeys(_0x18c27c), finalHtml = finalHtml + html, $('#calendar\x20#data\x20#holiday')[_0x4dde26(0x153)](finalHtml);
        else _0x18c27c[_0x4dde26(0x154)] === _0x4dde26(0x183) && (html = displaymockKeys(_0x18c27c), mfinalHtml = mfinalHtml + html, $(_0x4dde26(0x17d))[_0x4dde26(0x153)](mfinalHtml));
    })) : ($(_0x53fac6(0x178))['css']('display', _0x53fac6(0x16c)), $(_0x53fac6(0x169))[_0x53fac6(0x15e)](_0x53fac6(0x160), 'block'), $(_0x53fac6(0x148))[_0x53fac6(0x189)](_0x53fac6(0x18e)))) : ($('#calendar\x20#data')[_0x53fac6(0x15e)](_0x53fac6(0x160), _0x53fac6(0x16c)), $(_0x53fac6(0x169))[_0x53fac6(0x15e)](_0x53fac6(0x160), _0x53fac6(0x158)), $(_0x53fac6(0x148))['text'](_0x2511ab[_0x53fac6(0x149)]));
}

function _0x382d() {
    var _0x28c33a = ['#calendar\x20#calendar-nodata', '14367056oLKKrd', '<tr>', 'none', '<tr\x20class=\x22collapse-tr\x20parent\x20row\x22\x20id=\x22', '<div\x20class=\x22col-12\x20table-container\x22\x20style=\x22max-height:\x20300px;\x20overflow-y:\x20scroll;\x22>', 'key_data', 'empty', '</tbody>', 'calendar', '<i\x20class=\x22mdi\x20mdi-menu-down\x22></i>', '</thead>', '<h5\x20class=\x22size14\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22>Executed\x20On\x20:\x20', '<div\x20class=\x22col-12\x22>', '1818102fxifiD', '#calendar\x20#data', 'data', 'each', '<td></td>', '214123nmakBD', '#mockcalendar\x20#mockdata\x20#mock', 'responseData', '<h4\x20class=\x22card-title\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;margin-bottom:1.125rem;position:absolute\x22>', '-data', '</div>', '2730xABUFO', 'Mock', '<tr\x20class=\x22text-uppercase\x20size12\x20bold-text\x22\x20style=\x22text-align:\x20center;font-size:\x2016px;\x22>', 'stringify', '</tr>', '<button\x20class=\x22btn\x20btn-default\x20btn-ripple\x20accordion-toggle\x20calendar\x22\x20onclick=\x22myFunction(this)\x22\x20data-toggle=\x22collapse\x22\x20data-target=\x22#', '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22>', 'text', '<table\x20id=\x22data\x22>', '<td\x20class=\x22col-2\x20action-btn\x20float-right\x20text-right\x20mob-cal\x22\x20style=\x22left:\x20-10%;\x22>', '</h4>', '3070hjpQsG', 'No\x20Data', '<tr\x20class=\x22\x22\x20style=\x22border:\x201px\x20solid\x20#303234;\x22>', '<td\x20colspan=\x2212\x22\x20class=\x22hiddenRow\x20\x20p-0\x20col-12\x22>', '<td\x20style=\x22text-align:center;min-width:30vh;border:\x201px\x20solid\x20#303234;\x22>', '672040QyLbNf', 'length', 'executedOn', '#calendar\x20#nodatamessage', 'msg', 'status', 'toggle', '<tr\x20class=\x22border-0\x20collapse-content\x20row\x22\x20id=\x22child-', 'done', '<td\x20style=\x22border:\x201px\x20solid\x20#303234;\x22>', 'ready', 'mdi-menu-right', '<div\x20id=\x22table-view\x22\x20class=\x22col-12\x20table-fixed-header\x22\x20style=\x22overflow-x:auto;\x22>', '</td\x20>', 'append', 'key', '<td>', 'isSuccess', 'type', 'block', '<td\x20class=\x22col-10\x22>', '</a>', '<thead\x20class=\x22table-head\x22>', 'Holiday', 'forEach', 'css', 'object', 'display', '\x20<a\x20data-toggle=\x22collapse\x22\x20class=\x22accordion-toggle\x22\x20href=\x22#', 'keys', '660371jmVyBH', '<div\x20class=\x22accordian-body\x20collapse\x20col-12\x20border-b\x20show\x22\x20id=\x22', 'matrix', '</td>', '#calendar\x20#data\x20tbody', '524370bESxSD'];
    _0x382d = function () {
        return _0x28c33a;
    };
    return _0x382d();
}

function displayKeys(_0x326608) {
    var _0x1ca36d = _0xe113df;
    keyHtml = '';
    var _0x362068 = _0x326608['key_data'],
        _0x3fb98c = _0x362068[_0x1ca36d(0x179)];
    rowHtml = '';
    var _0x3bc3a0 = _0x326608['key'];
    if (_0x362068['type'] == _0x1ca36d(0x165)) {
        var _0x37cb7a = '';
        $[_0x1ca36d(0x17a)](_0x3fb98c, function (_0x501d58) {
            var _0x2c5315 = _0x1ca36d;
            html = _0x2c5315(0x14e) + _0x501d58 + _0x2c5315(0x166);
            var _0x33a58d = '',
                _0x371a9c = _0x3fb98c[_0x501d58];
            $['each'](_0x371a9c, function (_0x42f700, _0x44f0d7) {
                var _0xefbb4b = _0x2c5315,
                    _0x56fd52 = _0x371a9c[_0x42f700];
                _0x33a58d += _0xefbb4b(0x191) + _0x56fd52 + _0xefbb4b(0x166);
            }), html = html + _0x33a58d, _0x37cb7a += _0x2c5315(0x18f) + html + _0x2c5315(0x186);
        }), rowHtml = _0x37cb7a;
    } else {
        var _0x37cb7a = '';
        for (var _0x551b87 = 0x0; _0x551b87 < _0x3fb98c['length']; _0x551b87++) {
            tempHtml = '', $[_0x1ca36d(0x17a)](_0x3fb98c[_0x551b87], function (_0x100149, _0x3184de) {
                var _0x28fa1e = _0x1ca36d;
                if (typeof _0x3184de == _0x28fa1e(0x15f)) _0x3184de = JSON[_0x28fa1e(0x185)](_0x3184de);
                else {
                    if (_0x100149 != 'isSuccess') tempHtml += _0x28fa1e(0x155) + _0x3184de + '</td>';
                }
            }), _0x37cb7a += _0x1ca36d(0x16b) + tempHtml + '</tr>';
        }
        rowHtml = _0x37cb7a;
    }
    var _0x203fe8 = _0x326608['key'];
    return keyName = _0x203fe8, keyHtml += _0x1ca36d(0x16d) + _0x326608[_0x1ca36d(0x154)] + '\x22>', keyHtml += _0x1ca36d(0x159), keyHtml += _0x1ca36d(0x161) + _0x3bc3a0 + '-data' + '\x22>', keyHtml += _0x1ca36d(0x17f) + keyName + _0x1ca36d(0x18c), keyHtml += _0x1ca36d(0x155), keyHtml += _0x1ca36d(0x18b), keyHtml += _0x1ca36d(0x187) + _0x3bc3a0 + '-data' + '\x22>', keyHtml += '<i\x20class=\x22mdi\x20mdi-menu-down\x22></i>', keyHtml += '</button>', keyHtml += _0x1ca36d(0x166), keyHtml += _0x1ca36d(0x15a), keyHtml += _0x1ca36d(0x166), keyHtml += _0x1ca36d(0x186), keyHtml += _0x1ca36d(0x14c) + _0x326608[_0x1ca36d(0x154)] + '\x22>', keyHtml += _0x1ca36d(0x190), keyHtml += _0x1ca36d(0x164) + _0x3bc3a0 + _0x1ca36d(0x180) + '\x22>', keyHtml += '<div\x20class=\x22row\x20card-body\x20py-lg-4\x20py-2\x22>', keyHtml += _0x1ca36d(0x176), keyHtml += '<h5\x20class=\x22size14\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22>Executed\x20On\x20:\x20' + _0x362068[_0x1ca36d(0x194)] + '</h5>', keyHtml += _0x1ca36d(0x181), keyHtml += _0x1ca36d(0x151), keyHtml += _0x1ca36d(0x16e), keyHtml += _0x1ca36d(0x18a), keyHtml += '<thead\x20class=\x22table-head\x22>', keyHtml += _0x1ca36d(0x184), theadHtml = '', _0x362068[_0x1ca36d(0x157)] == _0x1ca36d(0x165) ? (theadHtml += _0x1ca36d(0x17b), $[_0x1ca36d(0x17a)](_0x3fb98c[Object[_0x1ca36d(0x162)](_0x3fb98c)[0x0]], function (_0xe62683) {
        var _0x308053 = _0x1ca36d;
        theadHtml += _0x308053(0x155) + _0xe62683 + _0x308053(0x166);
    })) : $[_0x1ca36d(0x17a)](_0x3fb98c[0x0], function (_0x1efd79) {
        var _0x5c9684 = _0x1ca36d;
        if (_0x1efd79 != 'isSuccess') theadHtml += _0x5c9684(0x155) + _0x1efd79 + '</td>';
    }), keyHtml = keyHtml + theadHtml, keyHtml += '</tr>', keyHtml += _0x1ca36d(0x174), keyHtml += '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22>', keyHtml = keyHtml + rowHtml, keyHtml += '</tbody>', keyHtml += '</table>', keyHtml += _0x1ca36d(0x181), keyHtml += _0x1ca36d(0x181), keyHtml += _0x1ca36d(0x181), keyHtml += _0x1ca36d(0x181), keyHtml += _0x1ca36d(0x152), keyHtml += _0x1ca36d(0x186), keyHtml;
}

function displaymockKeys(_0x192098) {
    var _0x4c3752 = _0xe113df;
    keyHtml = '';
    var _0xd6df86 = _0x192098[_0x4c3752(0x16f)],
        _0x15accd = _0xd6df86['data'];
    rowHtml = '';
    var _0x56cb6d = _0x192098[_0x4c3752(0x154)];
    if (_0xd6df86['type'] == _0x4c3752(0x165)) {
        var _0x292a23 = '';
        $['each'](_0x15accd, function (_0x45eccf) {
            var _0x5b5b93 = _0x4c3752;
            html = _0x5b5b93(0x14e) + _0x45eccf + _0x5b5b93(0x166);
            var _0x3d7690 = '',
                _0x3f8539 = _0x15accd[_0x45eccf];
            $[_0x5b5b93(0x17a)](_0x3f8539, function (_0x8f74dc, _0x1b2faa) {
                var _0x4b655f = _0x5b5b93,
                    _0x2f2839 = _0x3f8539[_0x8f74dc];
                _0x3d7690 += _0x4b655f(0x191) + _0x2f2839 + '</td>';
            }), html = html + _0x3d7690, _0x292a23 += _0x5b5b93(0x18f) + html + _0x5b5b93(0x186);
        }), rowHtml = _0x292a23;
    } else {
        var _0x292a23 = '';
        for (var _0x1c10b5 = 0x0; _0x1c10b5 < _0x15accd['length']; _0x1c10b5++) {
            tempHtml = '', $['each'](_0x15accd[_0x1c10b5], function (_0x3620de, _0x266276) {
                var _0x2382cd = _0x4c3752;
                if (typeof _0x266276 == 'object') _0x266276 = JSON[_0x2382cd(0x185)](_0x266276);
                else {
                    if (_0x3620de != _0x2382cd(0x156)) tempHtml += '<td>' + _0x266276 + '</td>';
                }
            }), _0x292a23 += '<tr>' + tempHtml + _0x4c3752(0x186);
        }
        rowHtml = _0x292a23;
    }
    var _0x3d0983 = _0x192098['key'];
    return keyName = _0x3d0983, keyHtml += _0x4c3752(0x16d) + _0x192098[_0x4c3752(0x154)] + '\x22>', keyHtml += _0x4c3752(0x159), keyHtml += '\x20<a\x20data-toggle=\x22collapse\x22\x20class=\x22accordion-toggle\x22\x20href=\x22#' + _0x56cb6d + _0x4c3752(0x180) + '\x22>', keyHtml += '<h4\x20class=\x22card-title\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;margin-bottom:1.125rem;position:absolute\x22>' + keyName + _0x4c3752(0x18c), keyHtml += _0x4c3752(0x155), keyHtml += _0x4c3752(0x18b), keyHtml += '<button\x20class=\x22btn\x20btn-default\x20btn-ripple\x20accordion-toggle\x20calendar\x22\x20onclick=\x22myFunction(this)\x22\x20data-toggle=\x22collapse\x22\x20data-target=\x22#' + _0x56cb6d + _0x4c3752(0x180) + '\x22>', keyHtml += _0x4c3752(0x173), keyHtml += '</button>', keyHtml += _0x4c3752(0x166), keyHtml += _0x4c3752(0x15a), keyHtml += _0x4c3752(0x166), keyHtml += _0x4c3752(0x186), keyHtml += _0x4c3752(0x14c) + _0x192098[_0x4c3752(0x154)] + '\x22>', keyHtml += _0x4c3752(0x190), keyHtml += '<div\x20class=\x22accordian-body\x20collapse\x20col-12\x20border-b\x20show\x22\x20id=\x22' + _0x56cb6d + _0x4c3752(0x180) + '\x22>', keyHtml += '<div\x20class=\x22row\x20card-body\x20py-lg-4\x20py-2\x22>', keyHtml += _0x4c3752(0x176), keyHtml += _0x4c3752(0x175) + _0xd6df86[_0x4c3752(0x194)] + '</h5>', keyHtml += _0x4c3752(0x181), keyHtml += _0x4c3752(0x151), keyHtml += '<div\x20class=\x22col-12\x20table-container\x22\x20style=\x22max-height:\x20300px;\x20overflow-y:\x20scroll;\x22>', keyHtml += _0x4c3752(0x18a), keyHtml += _0x4c3752(0x15b), keyHtml += '<tr\x20class=\x22text-uppercase\x20size12\x20bold-text\x22\x20style=\x22text-align:\x20center;font-size:\x2016px;\x22>', theadHtml = '', _0xd6df86[_0x4c3752(0x157)] == _0x4c3752(0x165) ? (theadHtml += _0x4c3752(0x17b), $[_0x4c3752(0x17a)](_0x15accd[Object[_0x4c3752(0x162)](_0x15accd)[0x0]], function (_0x517118) {
        var _0x345a24 = _0x4c3752;
        theadHtml += _0x345a24(0x155) + _0x517118 + _0x345a24(0x166);
    })) : $[_0x4c3752(0x17a)](_0x15accd[0x0], function (_0x3f1519) {
        var _0x3831a4 = _0x4c3752;
        if (_0x3f1519 != _0x3831a4(0x156)) theadHtml += _0x3831a4(0x155) + _0x3f1519 + _0x3831a4(0x166);
    }), keyHtml = keyHtml + theadHtml, keyHtml += _0x4c3752(0x186), keyHtml += '</thead>', keyHtml += _0x4c3752(0x188), keyHtml = keyHtml + rowHtml, keyHtml += _0x4c3752(0x171), keyHtml += '</table>', keyHtml += _0x4c3752(0x181), keyHtml += '</div>', keyHtml += _0x4c3752(0x181), keyHtml += _0x4c3752(0x181), keyHtml += '</td\x20>', keyHtml += _0x4c3752(0x186), keyHtml;
}