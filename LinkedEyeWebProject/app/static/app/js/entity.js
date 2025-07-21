var _0xb91c06 = _0x3a84;
(function (_0x387bd1, _0x285d7e) {
    var _0xb3c51c = _0x3a84,
        _0x3ac5ed = _0x387bd1();
    while (!![]) {
        try {
            var _0x1f2a2b = parseInt(_0xb3c51c(0x122)) / 0x1 + parseInt(_0xb3c51c(0xa6)) / 0x2 * (parseInt(_0xb3c51c(0x113)) / 0x3) + parseInt(_0xb3c51c(0xb7)) / 0x4 + -parseInt(_0xb3c51c(0x131)) / 0x5 * (parseInt(_0xb3c51c(0x112)) / 0x6) + parseInt(_0xb3c51c(0x86)) / 0x7 * (parseInt(_0xb3c51c(0xa3)) / 0x8) + parseInt(_0xb3c51c(0xfd)) / 0x9 * (parseInt(_0xb3c51c(0x121)) / 0xa) + -parseInt(_0xb3c51c(0x11c)) / 0xb * (parseInt(_0xb3c51c(0x12b)) / 0xc);
            if (_0x1f2a2b === _0x285d7e) break;
            else _0x3ac5ed['push'](_0x3ac5ed['shift']());
        } catch (_0x378446) {
            _0x3ac5ed['push'](_0x3ac5ed['shift']());
        }
    }
}(_0x3cd5, 0xedd64));
var params = new URLSearchParams(document[_0xb91c06(0x138)][_0xb91c06(0x98)]);
sites = [], selectedsite = '\x20', sites[_0xb91c06(0xb0)](params[_0xb91c06(0xd6)](_0xb91c06(0x94)));

function _0x3a84(_0x23d3b9, _0x28c5d9) {
    var _0x3cd53c = _0x3cd5();
    return _0x3a84 = function (_0x3a842e, _0x2c9ade) {
        _0x3a842e = _0x3a842e - 0x79;
        var _0xe2ee41 = _0x3cd53c[_0x3a842e];
        return _0xe2ee41;
    }, _0x3a84(_0x23d3b9, _0x28c5d9);
}
var selectedsite = params[_0xb91c06(0xd6)](_0xb91c06(0x94)),
    responseFromServer, cyGraph, zoom = 0x1,
    titleToId = {},
    wsConnected = ![],
    connectionTries = 0x6,
    Datanodes = '',
    swi_xml_24 = '',
    swi_xml_48 = '',
    sdeltalastreconnect = '',
    clientdata, newip = [],
    declient = {},
    criticalNodeCount = 0x0;
hCriticalStatusCount = 0x0, hOkStatusCount = 0x0, hPendingStatusCount = 0x0, hWarningStatusCount = 0x0, hUnknownStatusCount = 0x0, sCriticalStatusCount = 0x0, sOkStatusCount = 0x0, sPendingStatusCount = 0x0, sWarningStatusCount = 0x0, sUnknownStatusCount = 0x0;
let options = {
    'valueNames': [_0xb91c06(0xc6), 'ip', _0xb91c06(0x83)]
};
var graphLayout = {
    'name': _0xb91c06(0xcb),
    'directed': !![],
    'padding': 0xa,
    'animate': ![],
    'fit': !![],
    'nodeOverlap': 0x1388
},
    hwsitesData = [],
    chartsitesData = [];
entitySelectedsite = '\x20';
var siteResponse, entityResponse, sortedJson = {},
    sumsortedJson = {},
    nodeList;
$(document)[_0xb91c06(0xd9)](function () {
    var _0x2dda77 = _0xb91c06;
    getSiteNames(), pageName === 'Dashboard' ? ($(_0x2dda77(0x11b))[_0x2dda77(0x13f)](), $('#entity-heading')[_0x2dda77(0xbe)](_0x2dda77(0x145))) : ($('#entity-next')[_0x2dda77(0x13f)](), $(_0x2dda77(0x12a))[_0x2dda77(0x130)](_0x2dda77(0x91)), $(_0x2dda77(0x12a))['addClass'](_0x2dda77(0x136)), $(_0x2dda77(0xcd))[_0x2dda77(0x130)](_0x2dda77(0x134)), $(_0x2dda77(0xcd))['addClass'](_0x2dda77(0x12c))), $('#table-view')[_0x2dda77(0x13f)](), $('.icon-node')['hide'](), $(_0x2dda77(0xfc))[_0x2dda77(0x133)](function () {
        var _0x55d76f = _0x2dda77;
        window[_0x55d76f(0x138)][_0x55d76f(0xdb)] = _0x55d76f(0xec);
    }), $(_0x2dda77(0xf6))[_0x2dda77(0xb3)](function () {
        var _0xe968b5 = _0x2dda77;
        $('.modal-body')[_0xe968b5(0xca)]({
            'filename': 'table_%DD%-%MM%-%YY%',
            'format': $(_0xe968b5(0xf6))['val']()
        });
    });
});

function getSiteNames() {
    var _0x5ba569 = _0xb91c06;
    requestDataFromServer('/lesites/getallsitenames', {
        'type': _0x5ba569(0x140),
        'site': params['get'](_0x5ba569(0x94))
    }, _0x5ba569(0xe5))[_0x5ba569(0xd3)](function (_0x251cc6) {
        var _0x253350 = _0x5ba569;
        res = JSON[_0x253350(0xb1)](_0x251cc6), res['status'] == 0xc8 && (siteResponse = res['data']), getHardwareData();
    });
}

function getnewchart() {
    var _0x3c8cbe = _0xb91c06,
        _0x317115 = _0x3c8cbe(0xa4),
        _0x3eccd9 = params[_0x3c8cbe(0xd6)](_0x3c8cbe(0x94)),
        _0x233d98 = '',
        _0x137cf8 = ![];
    const _0x46f5c5 = {
        'sitename': _0x3eccd9,
        'layer': _0x233d98,
        'allsite': _0x137cf8
    };
    fetch(_0x317115 + '?' + new URLSearchParams(_0x46f5c5), {
        'method': _0x3c8cbe(0xe5),
        'headers': {
            'Content-Type': _0x3c8cbe(0xed)
        }
    })[_0x3c8cbe(0xa9)](_0x341eb2 => _0x341eb2[_0x3c8cbe(0xf7)]())['then'](_0x7126cd => {
        var _0x452a7d = _0x3c8cbe,
            _0x49839f = _0x7126cd[_0x452a7d(0x8d)],
            _0x3e7828 = 0x0,
            _0x59c184 = 0x0,
            _0x4a0676 = 0x0,
            _0x771f12 = 0x0,
            _0x232046 = 0x0,
            _0x296591 = 0x0,
            _0x366b36 = 0x0,
            _0x1ac629 = 0x0,
            _0xe1a69c = 0x0,
            _0x229fb9 = 0x0,
            _0x404bcb = 0x0,
            _0xd2eb9f = 0x0;
        for (const [_0x5a2782, _0x93d3a0] of Object[_0x452a7d(0x11d)](_0x49839f)) {
            _0x3e7828 += _0x93d3a0[_0x452a7d(0x132)]['0'], _0x59c184 += _0x93d3a0[_0x452a7d(0x132)]['1'], _0x4a0676 += _0x93d3a0[_0x452a7d(0x132)]['2'], _0x771f12 += _0x93d3a0[_0x452a7d(0x132)]['3'], _0x232046 += _0x93d3a0[_0x452a7d(0xbd)]['0'], _0x296591 += _0x93d3a0['software']['1'], _0x366b36 += _0x93d3a0['software']['2'], _0x1ac629 += _0x93d3a0['software']['3'], _0xe1a69c += _0x93d3a0[_0x452a7d(0x12d)]['0'], _0x229fb9 += _0x93d3a0['application']['1'], _0x404bcb += _0x93d3a0[_0x452a7d(0x12d)]['2'], _0xd2eb9f += _0x93d3a0[_0x452a7d(0x12d)]['3'];
        }
        chartresponse = {
            'hardware': {
                'CRITICAL': _0x3e7828,
                'OK': _0x4a0676,
                'WARNING': _0x59c184,
                'UNKNOWN': _0x771f12
            },
            'software': {
                'CRITICAL': _0x232046,
                'OK': _0x366b36,
                'WARNING': _0x296591,
                'UNKNOWN': _0x1ac629
            },
            'application': {
                'CRITICAL': _0xe1a69c,
                'OK': _0x404bcb,
                'WARNING': _0x229fb9,
                'UNKNOWN': _0xd2eb9f
            }
        };
        var _0x383e70 = Object[_0x452a7d(0xbb)](chartresponse['hardware']),
            _0xc4f7bb = _0x383e70[_0x452a7d(0x11a)](function (_0x17948e, _0x3677ed) {
                return _0x17948e + _0x3677ed;
            }),
            _0x459bad = Object[_0x452a7d(0xbb)](chartresponse['software']),
            _0x43593f = _0x459bad['reduce'](function (_0x40311a, _0x1f2310) {
                return _0x40311a + _0x1f2310;
            }),
            _0x474d19 = Object[_0x452a7d(0xbb)](chartresponse[_0x452a7d(0x12d)]),
            _0x4b2056 = _0x474d19[_0x452a7d(0x11a)](function (_0x261b8a, _0x272985) {
                return _0x261b8a + _0x272985;
            });
        if (_0xc4f7bb == 0x0) {
            var _0x3184c4 = _0x452a7d(0x7e);
            document[_0x452a7d(0x9b)](_0x452a7d(0x139))[_0x452a7d(0x141)][_0x452a7d(0x129)] = _0x452a7d(0xc1);
        } else document[_0x452a7d(0x9b)]('hardware-heading')['style'][_0x452a7d(0x129)] = _0x452a7d(0x88);
        _0x43593f == 0x0 ? document[_0x452a7d(0x9b)](_0x452a7d(0x107))[_0x452a7d(0x141)][_0x452a7d(0x129)] = _0x452a7d(0xc1) : document['getElementById'](_0x452a7d(0x107))['style'][_0x452a7d(0x129)] = _0x452a7d(0x88);
        _0x4b2056 == 0x0 ? document[_0x452a7d(0x9b)](_0x452a7d(0xb6))[_0x452a7d(0x141)][_0x452a7d(0x129)] = 'block' : document[_0x452a7d(0x9b)](_0x452a7d(0xb6))[_0x452a7d(0x141)][_0x452a7d(0x129)] = _0x452a7d(0x88);
        var _0x4c9c5a = _0x3e7828 + _0x232046 + _0xe1a69c,
            _0x518f3e = _0x59c184 + _0x296591 + _0x229fb9;
        if (_0x4c9c5a > 0x0) $('#entityLED')[_0x452a7d(0xbc)](_0x452a7d(0x10a));
        else _0x518f3e > 0x0 ? $(_0x452a7d(0x12f))[_0x452a7d(0xbc)](_0x452a7d(0xc3)) : $(_0x452a7d(0x12f))[_0x452a7d(0xbc)]('green');
        fillHostServiceCount(chartresponse);
    })[_0x3c8cbe(0x87)](_0xff8be8 => {
        var _0x21e2f0 = _0x3c8cbe;
        console[_0x21e2f0(0x8b)]('ERROR\x20TEXT--->' + _0xff8be8), stopLoader(_0x21e2f0(0xd5)), stopLoader(_0x21e2f0(0xc9)), stopLoader('containerpie-applications'), document[_0x21e2f0(0x9b)](_0x21e2f0(0x139))[_0x21e2f0(0x141)][_0x21e2f0(0x129)] = _0x21e2f0(0xc1), document[_0x21e2f0(0x9b)](_0x21e2f0(0x139))['style'][_0x21e2f0(0xb9)] = _0x21e2f0(0x8c), document['getElementById'](_0x21e2f0(0x139))['innerText'] = _0x21e2f0(0x7b), document[_0x21e2f0(0x9b)](_0x21e2f0(0x107))['style'][_0x21e2f0(0x129)] = _0x21e2f0(0xc1), document[_0x21e2f0(0x9b)](_0x21e2f0(0x107))['style'][_0x21e2f0(0xb9)] = _0x21e2f0(0x8c), document[_0x21e2f0(0x9b)](_0x21e2f0(0x107))[_0x21e2f0(0x9c)] = _0x21e2f0(0x7b), document['getElementById'](_0x21e2f0(0xb6))['style']['display'] = _0x21e2f0(0xc1), document[_0x21e2f0(0x9b)]('application-heading')[_0x21e2f0(0x141)]['width'] = _0x21e2f0(0x8c), document[_0x21e2f0(0x9b)](_0x21e2f0(0xb6))[_0x21e2f0(0x9c)] = _0x21e2f0(0x7b);
    });
}

function getHardwareData() {
    var _0x38df1b = _0xb91c06;
    requestDataFromServer('../dashboard/getneo4jnodes', {
        'sitename': params['get'](_0x38df1b(0x94)),
        'layer': _0x38df1b(0x85)
    }, type = _0x38df1b(0xe5))[_0x38df1b(0xd3)](fillHWNodeDetails);
}

function fillHWNodeDetails(_0x2ea98c) {
    var _0x3ac062 = _0xb91c06;
    const _0x1318ad = Math['random']()[_0x3ac062(0x128)](0x24)[_0x3ac062(0x8a)](0x2, 0x5),
        _0x1d9116 = Math[_0x3ac062(0x10d)]()[_0x3ac062(0x128)](0x24)['substring'](0x2, 0x5),
        _0xf5d4f3 = Math[_0x3ac062(0x10d)]()['toString'](0x24)[_0x3ac062(0x8a)](0x2, 0x5),
        _0x5c93f0 = Math[_0x3ac062(0x10d)]()[_0x3ac062(0x128)](0x24)[_0x3ac062(0x8a)](0x2, 0x5),
        _0x3a1890 = Math['random']()[_0x3ac062(0x128)](0x24)[_0x3ac062(0x8a)](0x2, 0x5),
        _0x39c0cc = Math['random']()[_0x3ac062(0x128)](0x24)[_0x3ac062(0x8a)](0x2, 0x5);
    if (_0x2ea98c == undefined) return;
    entityResponse = _0x2ea98c['responseData'];
    if (_0x2ea98c[_0x3ac062(0x119)][_0x3ac062(0x126)] > 0x0) {
        _0x2ea98c[_0x3ac062(0x119)][_0x3ac062(0x9e)](function (_0x1e7451, _0x301339) {
            var _0x2cc575 = _0x3ac062,
                _0x24d080 = {};
            _0x24d080[_0x2cc575(0x94)] = _0x1e7451['site'], _0x24d080[_0x2cc575(0xb8)] = !![], _0x24d080[_0x2cc575(0x11e)] = ![], _0x24d080[_0x2cc575(0x123)] = 0x0, _0x24d080[_0x2cc575(0x82)] = {
                'host': {
                    'criticalCount': 0x0,
                    'okCount': 0x0,
                    'warningCount': 0x0,
                    'unknownCount': 0x0
                },
                'service': {
                    'criticalCount': 0x0,
                    'okCount': 0x0,
                    'warningCount': 0x0,
                    'unknownCount': 0x0
                }
            }, responseFromServer = _0x1e7451[_0x2cc575(0xfe)];
            if (Object[_0x2cc575(0xf1)](responseFromServer)['length'] > 0x0) {
                var _0x54214d = responseFromServer[_0x2cc575(0x84)];
                _0x54214d['status'] == 0xc8 && _0x54214d[_0x2cc575(0x8d)][_0x2cc575(0x126)] > 0x0 ? (criticalNodeCount = 0x0, hCriticalStatusCount = 0x0, hOkStatusCount = 0x0, hPendingStatusCount = 0x0, hWarningStatusCount = 0x0, hUnknownStatusCount = 0x0, _0x54214d[_0x2cc575(0x8d)][_0x2cc575(0x9e)](function (_0x169ba2) {
                    var _0x36142a = _0x2cc575;
                    if (typeof _0x169ba2[0x2] != 'number') var _0x330e26 = _0x169ba2[0x2][_0x36142a(0x13a)]();
                    else var _0x330e26 = _0x169ba2[0x2];
                    (_0x330e26 === 'CRITICAL' || _0x330e26 === 'DOWN' || _0x330e26 === _0x36142a(0x97) || _0x330e26 === _0x36142a(0x105) || _0x330e26 === _0x36142a(0x104)) && (criticalNodeCount++, _0x24d080['isSuccess'] = ![], entitySelectedsite == '\x20' && (entitySelectedsite = _0x1e7451[_0x36142a(0x94)]), _0x169ba2[0x4] == _0x36142a(0xcf) || _0x169ba2[0x4]['startsWith'](_0x36142a(0x100)) ? hCriticalStatusCount++ : sCriticalStatusCount), (_0x330e26 == '' || _0x330e26 === 'RUNNING' || _0x330e26 === _0x36142a(0xe4) || _0x330e26 === 'OK' || _0x330e26 === 'UP') && (_0x169ba2[0x4] == _0x36142a(0xcf) || _0x169ba2[0x4][_0x36142a(0xf3)]('Node') ? hOkStatusCount++ : sOkStatusCount), _0x330e26 === _0x36142a(0x95) && (_0x169ba2[0x4] == _0x36142a(0xcf) || _0x169ba2[0x4]['startsWith'](_0x36142a(0x100)) ? hPendingStatusCount++ : sPendingStatusCount), _0x330e26 === 'WARNING' && (_0x169ba2[0x4] == _0x36142a(0xcf) || _0x169ba2[0x4][_0x36142a(0xf3)]('Node') ? hWarningStatusCount++ : sWarningStatusCount), (_0x330e26 === _0x36142a(0xc4) || _0x330e26 === _0x36142a(0xc5) || _0x330e26 === _0x36142a(0x13c)) && (_0x169ba2[0x4] == 'Host' || _0x169ba2[0x4]['startsWith'](_0x36142a(0x100)) ? hUnknownStatusCount++ : sUnknownStatusCount);
                }), _0x24d080[_0x2cc575(0x123)] = criticalNodeCount, _0x24d080[_0x2cc575(0x82)][_0x2cc575(0xc7)][_0x2cc575(0xdc)] = hCriticalStatusCount, _0x24d080[_0x2cc575(0x82)]['host'][_0x2cc575(0x125)] = hOkStatusCount, _0x24d080[_0x2cc575(0x82)][_0x2cc575(0xc7)][_0x2cc575(0x110)] = hPendingStatusCount, _0x24d080[_0x2cc575(0x82)][_0x2cc575(0xc7)]['warningCount'] = hWarningStatusCount, _0x24d080[_0x2cc575(0x82)]['host']['unknownCount'] = hUnknownStatusCount, _0x24d080[_0x2cc575(0x82)][_0x2cc575(0xc6)][_0x2cc575(0xdc)] = 0x0, _0x24d080[_0x2cc575(0x82)][_0x2cc575(0xc6)][_0x2cc575(0x125)] = 0x0, _0x24d080[_0x2cc575(0x82)][_0x2cc575(0xc6)][_0x2cc575(0x110)] = 0x0, _0x24d080[_0x2cc575(0x82)][_0x2cc575(0xc6)][_0x2cc575(0xfa)] = 0x0, _0x24d080['nodeCount']['service'][_0x2cc575(0xff)] = 0x0) : _0x24d080[_0x2cc575(0xb8)] = ![];
            } else _0x24d080[_0x2cc575(0xb8)] = ![];
            chartsitesData[_0x2cc575(0xb0)](_0x24d080);
            var _0x332618 = siteResponse[0x0];
            connectbodWebSocket(_0x332618[_0x2cc575(0xf8)], _0x24d080['site'], 0x0, _0x5c93f0), connectsiteAdpWebSocket(_0x332618[_0x2cc575(0xf8)], _0x24d080[_0x2cc575(0x94)], 0x0, _0x3a1890), connectsiteEodWebSocket(_0x332618[_0x2cc575(0xf8)], _0x24d080[_0x2cc575(0x94)], 0x0, _0x39c0cc), makeWebSocConnectionk8entity(_0x332618[_0x2cc575(0xf8)], _0x24d080[_0x2cc575(0x94)], 0x0, _0x24d080['criticalNodeCount'], _0x1318ad), makeWebSocConnectionsites(_0x332618[_0x2cc575(0xf8)], _0x24d080[_0x2cc575(0x94)], 0x0, _0x24d080[_0x2cc575(0x123)], _0x1d9116), makeWebsiteSwitchConnection(_0x332618[_0x2cc575(0xf8)], _0x24d080['site'], 0x0, _0x24d080[_0x2cc575(0x123)], _0xf5d4f3);
        }), sSitehtml = '', fSitehtml = '', $(_0x3ac062(0xd7))[_0x3ac062(0xda)](), chartsitesData[_0x3ac062(0x9e)](function (_0x1619f4, _0x42b564) {
            var _0x3eca44 = _0x3ac062;
            _0x1619f4[_0x3eca44(0xb8)] ? (sSitehtml = '', sSitehtml += _0x3eca44(0x10e) + _0x1619f4[_0x3eca44(0x94)] + _0x3eca44(0x12e) + _0x1619f4[_0x3eca44(0x94)] + _0x3eca44(0xba) + _0x1619f4[_0x3eca44(0x94)] + '\x22\x20id=\x22' + _0x1619f4[_0x3eca44(0x94)] + _0x3eca44(0xa1) + _0x1619f4[_0x3eca44(0x94)] + _0x3eca44(0xb2)) : (fSitehtml = '', fSitehtml += _0x3eca44(0xa8) + _0x1619f4[_0x3eca44(0x94)] + _0x3eca44(0x12e) + _0x1619f4[_0x3eca44(0x94)] + _0x3eca44(0xba) + _0x1619f4[_0x3eca44(0x94)] + _0x3eca44(0x10c) + _0x1619f4[_0x3eca44(0x94)] + _0x3eca44(0xa1) + _0x1619f4[_0x3eca44(0x94)] + _0x3eca44(0xb2));
        }), $('#node-view\x20#site-list')['append'](fSitehtml), $(_0x3ac062(0xd7))[_0x3ac062(0xa7)](sSitehtml);
        $(_0x3ac062(0xf2))['eq'](0x0)[_0x3ac062(0x8d)]() && (entitySelectedsite = $(_0x3ac062(0xf2))['eq'](0x0)[_0x3ac062(0x8d)]()['id']);
        var _0x30cb5f = entityResponse[0x0];
        if (_0x30cb5f[_0x3ac062(0xf0)] == 0xc8 && _0x30cb5f[_0x3ac062(0xfe)][_0x3ac062(0x84)]['data'] != '') _0x30cb5f = entityResponse[0x0];
        else {
            var _0x1c9aec = '';
            _0x1c9aec += _0x3ac062(0x111), _0x1c9aec += _0x3ac062(0xcc), _0x1c9aec += _0x3ac062(0xf5), _0x1c9aec += _0x3ac062(0x108), $(_0x3ac062(0xee))[_0x3ac062(0xa7)](_0x1c9aec);
        }
    } else $(_0x3ac062(0xdd))[_0x3ac062(0x11f)]('visibility', _0x3ac062(0x13e)), $(_0x3ac062(0x114))[_0x3ac062(0x11f)](_0x3ac062(0x129), _0x3ac062(0x88)), $(_0x3ac062(0x13b))[_0x3ac062(0x11f)](_0x3ac062(0x129), _0x3ac062(0xc1)), $(_0x3ac062(0x13d))[_0x3ac062(0xaf)](_0x3ac062(0xb5));
    if (pageName === _0x3ac062(0xab) || pageName === _0x3ac062(0x9f)) var _0x530c00 = siteResponse[0x0];
}

function changeSiteStatus(_0x2df1cd, _0x47d208) {
    var _0xaa8027 = _0xb91c06,
        _0x5eac40;
    requestDataFromServer('../dashboard/getchartspecificdetails', {
        'sitename': params[_0xaa8027(0xd6)](_0xaa8027(0x94)),
        'layer': ''
    }, type = _0xaa8027(0xe5))[_0xaa8027(0xd3)](function (_0x46cf46) {
        var _0x51bf48 = _0xaa8027,
            _0x1c8ff5 = _0x46cf46[_0x51bf48(0x8d)];
        _0x5eac40 = _0x1c8ff5[_0x51bf48(0xae)][0x0][0x0] + _0x1c8ff5[_0x51bf48(0xc2)][0x0][0x0] + _0x1c8ff5[_0x51bf48(0xc8)][0x0][0x0];
    }), _0x5eac40 == 0x0 ? ($(_0xaa8027(0x10f) + _0x2df1cd + _0xaa8027(0xd8))[_0xaa8027(0x130)](_0xaa8027(0x124))[_0xaa8027(0xbc)](_0xaa8027(0xde)), $(_0xaa8027(0x10f) + _0x2df1cd + _0xaa8027(0x9a))[_0xaa8027(0x130)](_0xaa8027(0x10a))['addClass'](_0xaa8027(0xd0)), $('#entityLED')[_0xaa8027(0x130)]('red')[_0xaa8027(0xbc)]('green')) : ($(_0xaa8027(0x10f) + _0x2df1cd + _0xaa8027(0xd8))['removeClass'](_0xaa8027(0xde))[_0xaa8027(0xbc)]('failure'), $(_0xaa8027(0x10f) + _0x2df1cd + _0xaa8027(0x9a))[_0xaa8027(0x130)](_0xaa8027(0xd0))[_0xaa8027(0xbc)]('red'), $(_0xaa8027(0x12f))[_0xaa8027(0x130)](_0xaa8027(0xd0))[_0xaa8027(0xbc)](_0xaa8027(0x10a)));
}

function nodeStatus(_0x54533d) {
    var _0x45e379 = _0xb91c06,
        _0x21bdcc = 0x0,
        _0x4ff15f = 0x0,
        _0x1e1e6b = 0x0,
        _0x32c954 = 0x0,
        _0x25d064 = 0x0,
        _0x4a53ca = {
            'criticalCount': 0x0,
            'okStatusCount': 0x0,
            'pendingCount': 0x0,
            'warningCount': 0x0
        };
    return _0x54533d[_0x45e379(0x9e)](function (_0x3bc1fc) {
        var _0x558f21 = _0x45e379;
        if (_0x3bc1fc[0x0]) var _0x134a9c = _0x3bc1fc[0x0]['toUpperCase']();
        else var _0x134a9c = _0x3bc1fc[0x0];
        (_0x134a9c === _0x558f21(0x7d) || _0x134a9c === _0x558f21(0x8e) || _0x134a9c === _0x558f21(0x97) || _0x134a9c === _0x558f21(0x105) || _0x134a9c === _0x558f21(0x104)) && (_0x21bdcc = _0x21bdcc + _0x3bc1fc[0x1]), (_0x134a9c == '' || _0x134a9c === _0x558f21(0x120) || _0x134a9c === _0x558f21(0xe4) || _0x134a9c === 'OK' || _0x134a9c === 'UP') && (_0x4ff15f = _0x4ff15f + _0x3bc1fc[0x1]), _0x134a9c === _0x558f21(0x95) && (_0x1e1e6b = _0x1e1e6b + _0x3bc1fc[0x1]), _0x134a9c === _0x558f21(0xaa) && (_0x32c954 = _0x32c954 + _0x3bc1fc[0x1]), (_0x134a9c === 'UNKNOWN' || _0x134a9c === 'DELETED' || _0x134a9c === 'TERMINATED') && (_0x25d064 = _0x25d064 + _0x3bc1fc[0x1]);
    }), _0x4a53ca = {
        'criticalCount': _0x21bdcc,
        'okCount': _0x4ff15f,
        'pendingCount': _0x1e1e6b,
        'warningCount': _0x32c954,
        'unknownCount': _0x25d064
    }, _0x4a53ca;
}

function _0x3cd5() {
    var _0x3766d7 = ['TERMINATED', '#node-view\x20#nodatamessage', 'hidden', 'hide', 'clicksite', 'style', '\x22\x20style=\x22display:none;margin-top:\x2013px;\x22><i\x20class=\x22mdi\x20mdi-checkbox-marked\x22\x20style=\x22color:#16d39a;\x22\x20onclick=\x22iconconnect(\x27', '\x27,\x27', 'getFullYear', 'Entities', '<td\x20class=\x22col-8\x20details_td\x22\x20style=\x22width:\x20100px;\x22>isConnected</td>', 'map', 'monitor_status', 'body', 'URL\x20ERROR', 'node-detail', 'CRITICAL', '<div\x20id=\x22no-hosts\x22\x20style=\x22background-color:#a33219;color:white;border-radius:3px;font-size:16px;width:30%;text-align:\x20center;\x22>No\x20Data</div>', 'title', 'delast-conn\x22></p>', 'destatus-conn\x22\x20></td>', 'nodeCount', 'status', 'nodes', 's_hw', '49nULHwt', 'catch', 'none', '\x20<p\x20class=\x22tooltiptexting\x22\x20id=\x22', 'substring', 'log', '30%', 'data', 'DOWN', 'color', 'delborder-clr', 'col-lg-3', '</table>', '#dedisplay-icon', 'site', 'PENDING', '<p\x20class=\x22col-3\x22\x20id=\x22dedisplay-icon', 'UNREACHABLE', 'search', '_private', '_li\x20a', 'getElementById', 'innerText', 'connect', 'forEach', 'Entity', 'True(0)', '\x22\x20data-toggle=\x22tab\x22\x20onclick=\x22onEntitySiteTabchange(\x27', 'getMonth', '873176mUACLn', '../dashboard/getoverallchartdetails', 'getHours', '11464PKBcsY', 'append', '<li\x20class=\x22nav-item\x20failure\x22\x20id=\x22', 'then', 'WARNING', 'Dashboard', 'add', 'delast-conn', 'SwCritical-count', 'text', 'push', 'parse', '\x27)\x22></a></li>', 'change', '#e99123', 'No\x20Data', 'application-heading', '6877536bcTMqe', 'isSuccess', 'width', '-indicator\x22></span>\x20<a\x20class=\x22bold-text\x22\x20style=\x22color:#c8c8c8;\x22\x20data-id=\x22', 'values', 'addClass', 'software', 'html', '<tbody\x20class=\x22row\x22>', 'toLocaleString', 'block', 'HostMsdown-count', 'amber', 'UNKNOWN', 'DELETED', 'service', 'host', 'SwitchPort-disconn', 'containerpie-softwares', 'tableExport', 'cose', '<span\x20class=\x22closebuttn\x22\x20type=\x22button\x22\x20onclick=\x22dismissfunc(this)\x22\x20style=\x22margin-left:\x2015px;color:\x20white;font-weight:\x20bold;float:\x20right;font-size:\x2040px;line-height:\x2020px;margin-top:-10px;cursor:\x20pointer;transition:\x200.3s;\x22>&times;</span>', '#change-col7-size', 'False(', 'Host', 'green', 'getDate', '#delta-html', 'done', '#node-name', 'containerpie-hardwares', 'get', '#node-view\x20#site-list', '_li', 'ready', 'empty', 'href', 'criticalCount', '#node-view\x20#entity-search', 'success', 'subscribe', '<td\x20class=\x22col-4\x20details_ts\x22\x20id=\x22', 'background', '-indicator', 'node[id\x20=\x20', 'TRUE', 'GET', 'linkedeye', '#delsitesname', 'getSeconds', '/exchange/delta_update', 'Your\x20browser\x20does\x20not\x20support\x20WebSockets.\x20Updates\x20will\x20not\x20work\x20properly.', 'Trying(', '../entity/', 'application/json', '#warningdata', 'url', 'code', 'keys', '#node-view\x20#site-list\x20li\x20a', 'startsWith', 'delshown', '<h3\x20style=\x22text-align:center;margin-top:-10px;\x20font-size:15px;\x22>\x20Hardware\x20information\x20missing!\x20Please\x20Onboard\x20server\x20or\x20contact\x20administrator</h3>', '#export-to-select', 'json', 'websocket_url', '../dashboard/getnodespecificdetails', 'warningCount', 'Lastconnect\x20:\x20', '#entity-next', '657AEAQNu', 'site_data', 'unknownCount', 'Node', 'classList', 'client', 'connectionTries', 'WAITING', 'FALSE', 'getMinutes', 'software-heading', '</div>', 'selector', 'red', 'destatus-conn', '\x22\x20id=\x22', 'random', '<li\x20class=\x22nav-item\x20success\x22\x20id=\x22', '#node-view\x20#site-list\x20#', 'pendingCount', '<div\x20class=\x22\x22\x20style=\x22padding:\x202%;height:25px;margin-top:25%;background:\x20#f44336;border-radius:\x2012px;z-index:\x20999;\x22>', '162qKKLWT', '729FRGekr', '#node-view\x20#s_hw', 'WebSocket', '<thead></thead>', '\x27)\x22\x20></i\x20></p>', 'delta-pipe', 'responseData', 'reduce', '.table-node', '22nJltdF', 'entries', 'isWSConnected', 'css', 'RUNNING', '148710EJWupF', '1088963SdfNgf', 'criticalNodeCount', 'failure', 'okCount', 'length', '#node-view\x20#', 'toString', 'display', '#change-col3-size', '25968156pYHhIz', 'col-lg-8', 'application', '_li\x22\x20style=\x22position:\x20relative;\x22><span\x20class=\x22\x22\x20style=\x22z-index:\x20100;position:\x20absolute;top:\x20-4px;right:\x206px;\x22\x20id=\x22', '#entityLED', 'removeClass', '138635QJuRoV', 'hardware', 'click', 'col-lg-7', '#16d39a', 'col-lg-4', '[fullname=\x27', 'location', 'hardware-heading', 'toUpperCase', '#node-view\x20#entity-nodata'];
    _0x3cd5 = function () {
        return _0x3766d7;
    };
    return _0x3cd5();
}

function nodeSpecificDetails(_0xb10d7b, _0x27f2f9) {
    var _0x19ee12 = _0xb91c06;
    $('#node-detail')['css']('display') != 'none' && (nodeTitle = $(_0x19ee12(0xd4))[_0x19ee12(0xaf)](), _0xb10d7b != undefined && nodeTitle == _0x27f2f9 && (showLoader(_0x19ee12(0x7c)), requestDataFromServer(_0x19ee12(0xf9), {
        'nodeid': _0xb10d7b,
        'mode': '',
        'csrfmiddlewaretoken': csfr_token,
        'selectedSite': entitySelectedsite
    }, type = 'POST')['done'](nodespecificdetialsresponse)));
}
var delobj = {};

function displaydeltooltips(_0x5ea0cd, _0x2f1af6) {
    var _0x906a48 = _0xb91c06;
    document[_0x906a48(0x9b)](_0x2f1af6)[_0x906a48(0x101)]['contains'](_0x906a48(0xf4)) ? (document[_0x906a48(0x9b)](_0x5ea0cd)[_0x906a48(0x101)]['remove']('delborder-clr'), document[_0x906a48(0x9b)](_0x2f1af6)[_0x906a48(0x101)]['remove'](_0x906a48(0xf4))) : (document['getElementById'](_0x5ea0cd)[_0x906a48(0x101)][_0x906a48(0xac)](_0x906a48(0x90)), document[_0x906a48(0x9b)](_0x2f1af6)['classList'][_0x906a48(0xac)](_0x906a48(0xf4)));
}
var sitesname = 'delsitesname',
    wsocname = _0xb91c06(0x118),
    deltahtml = '<div\x20class=\x22indicator\x22\x20id=\x22delta-pipe\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22mdi\x20mdi-check-network-outline\x20tooltip\x22\x20id=\x22icon-chats\x22\x20onclick=\x22displaydeltooltips(\x27' + wsocname + _0xb91c06(0x143) + sitesname + '\x27)\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22tooltiptext\x22\x20id=\x22delsitesname\x22\x20style=\x22overflow-y:scroll\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p><b>Queue\x20Name\x20:</b>\x20delta_update</p>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</i>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>';
$(_0xb91c06(0xd2))[_0xb91c06(0xda)](), $('#delta-html')[_0xb91c06(0xa7)](deltahtml);

function iconclose(_0x141d52) {
    isToBeConnect = !{}[!![]], delobj[_0x141d52] && delobj[_0x141d52]['disconnect']();
}

function iconconnect(_0x40780d) {
    var _0xff6bc6 = _0xb91c06;
    isToBeConnect = {}[!![]], makeWebSocConnectionsites(delobj[_0x40780d]['ws'][_0xff6bc6(0xef)], delobj[_0x40780d]['id'], 0x0);
}

function makeWebSocConnectionsites(_0x22b062, _0x2c463d, _0x376fdc, _0x432c90, _0x72d4b7) {
    var _0x1a53b3 = _0xb91c06,
        _0x377848 = _0x1a53b3(0x102) + _0x72d4b7;
    try {
        if (window[_0x1a53b3(0x115)]) {
            var _0x2ae3ca = _0x1a53b3(0xe9);
            _0x377848 = Stomp['client'](_0x22b062), _0x377848['id'] = _0x2c463d, _0x377848[_0x1a53b3(0x103)] = _0x376fdc, _0x377848[_0x1a53b3(0x123)] = _0x432c90, delobj[_0x2c463d] = _0x377848;
            var _0x22f723 = '';
            _0x22f723 += '<div\x20class=\x22row\x20tooltiping\x22>', _0x22f723 += '<table>', _0x22f723 += _0x1a53b3(0x116), _0x22f723 += _0x1a53b3(0xbf), _0x22f723 += '<tr\x20class=\x22col-12\x22>', _0x22f723 += _0x1a53b3(0x146), _0x22f723 += _0x1a53b3(0xe0) + _0x2c463d + _0x1a53b3(0x81), _0x22f723 += '</tr>', _0x22f723 += '</tbody>', _0x22f723 += _0x1a53b3(0x92), _0x22f723 += _0x1a53b3(0x89) + _0x2c463d + _0x1a53b3(0x80), _0x22f723 += _0x1a53b3(0x96) + _0x2c463d + _0x1a53b3(0x142) + _0x2c463d + '\x27)\x22\x20></i\x20><i\x20class=\x22mdi\x20mdi-close-box\x22\x20style=\x22color:#ff3d57;\x22\x20onclick=\x22iconclose(\x27' + _0x2c463d + _0x1a53b3(0x117), _0x22f723 += _0x1a53b3(0x108), $(_0x1a53b3(0xe7))['append'](_0x22f723);
            var _0x4d9e7b = function () {
                var _0x2aa069 = _0x1a53b3;
                wsConnected = !![];
                var _0x224351 = sitesData[0x0];
                _0x224351[_0x2aa069(0x11e)] = !![], isToBeConnect = {}[!![]], document[_0x2aa069(0x9b)](_0x2c463d + 'destatus-conn')['innerText'] = _0x2aa069(0xa0), document[_0x2aa069(0x9b)](_0x2c463d + 'destatus-conn')['style'][_0x2aa069(0x8f)] = _0x2aa069(0x135), document[_0x2aa069(0x9b)](_0x2aa069(0x118))[_0x2aa069(0x141)][_0x2aa069(0x8f)] = _0x2aa069(0x135), $(_0x2aa069(0x93) + _0x2c463d)['css'](_0x2aa069(0x129), _0x2aa069(0x88)), document[_0x2aa069(0x9b)](_0x2c463d + _0x2aa069(0xad))[_0x2aa069(0x9c)] = 'Lastconnect\x20:\x20' + sdeltalastreconnect, _0x377848[_0x2aa069(0xdf)](_0x2ae3ca, function (_0x179e47) {
                    var _0x3f1c27 = _0x2aa069,
                        _0x8e5d55 = JSON[_0x3f1c27(0xb1)](_0x179e47[_0x3f1c27(0x7a)]),
                        _0xfb592d = _0x8e5d55[_0x3f1c27(0x79)];
                    _0xfb592d === 'CRITICAL' || _0xfb592d === 'DOWN' || _0xfb592d === _0x3f1c27(0x97) || _0xfb592d === 'FALSE' || _0xfb592d === _0x3f1c27(0x104) ? _0x377848[_0x3f1c27(0x123)]++ : _0x377848[_0x3f1c27(0x123)]--;
                    if (_0x377848['id'] == entitySelectedsite) {
                        var _0x206f25 = titleToId[_0x8e5d55[_0x3f1c27(0x7f)]];
                        if (_0x206f25 !== undefined) {
                            var _0x3148f0 = getColorForNodeState(_0x8e5d55[_0x3f1c27(0x79)]);
                            if (cyGraph[_0x3f1c27(0x84)](_0x3f1c27(0x137) + _0x8e5d55[_0x3f1c27(0x7f)] + '\x27]')[0x0]) cyGraph['nodes'](_0x3f1c27(0x137) + _0x8e5d55[_0x3f1c27(0x7f)] + '\x27]')[0x0][_0x3f1c27(0x99)][_0x3f1c27(0x8d)]['color'] = _0x3148f0;
                            cyGraph['style']()[_0x3f1c27(0x109)](_0x3f1c27(0xe3) + _0x206f25 + ']')['style']({
                                'background-color': _0x3148f0,
                                'border-color': _0x3148f0
                            })['update'](), setAnimChart(_0x206f25);
                        }
                        nodeSpecificDetailssites(_0x206f25, _0x8e5d55[_0x3f1c27(0x7f)]);
                    }
                    if (_0x8e5d55[_0x3f1c27(0xc7)] !== undefined) {
                        var _0x1f755c = {};
                        _0x1f755c[_0x3f1c27(0xc7)] = nodeStatus(Object[_0x3f1c27(0xf1)](_0x8e5d55['host'])[_0x3f1c27(0x147)](_0x4121fc => [_0x4121fc, Number(_0x8e5d55['host'][_0x4121fc])])), _0x1f755c[_0x3f1c27(0xc6)] = nodeStatus(Object[_0x3f1c27(0xf1)](_0x8e5d55[_0x3f1c27(0xc6)])[_0x3f1c27(0x147)](_0x4d5f39 => [_0x4d5f39, Number(_0x8e5d55[_0x3f1c27(0xc6)][_0x4d5f39])])), _0x224351['nodeCount'] = _0x1f755c;
                        if (pageName === 'Dashboard') getnewchart();
                        entitySelectedsite == _0x377848['id'] && updateValues(_0x1f755c);
                    }
                }), $(_0x2aa069(0x127) + _0x377848['id'] + '-indicator')[_0x2aa069(0x11f)](_0x2aa069(0xe1), _0x2aa069(0x135));
            },
                _0x5e227a = function (_0x537b8f) {
                    var _0x16a83a = _0x1a53b3;
                    $(_0x16a83a(0x127) + _0x377848['id'] + _0x16a83a(0xe2))[_0x16a83a(0x11f)](_0x16a83a(0xe1), '#ff3d57');
                    var _0xf663c6 = sitesData[0x0];
                    isToBeConnect = !{}[!![]], _0xf663c6[_0x16a83a(0x11e)] = ![], document[_0x16a83a(0x9b)](_0x2c463d + _0x16a83a(0x10b))[_0x16a83a(0x9c)] = _0x16a83a(0xce) + _0x377848[_0x16a83a(0x103)] + ')', document['getElementById'](_0x2c463d + 'destatus-conn')[_0x16a83a(0x141)]['color'] = '#ff3d57', document[_0x16a83a(0x9b)]('delta-pipe')[_0x16a83a(0x141)][_0x16a83a(0x8f)] = '#ff3d57', $(_0x16a83a(0x93) + _0x2c463d)[_0x16a83a(0x11f)](_0x16a83a(0x129), _0x16a83a(0xc1)), document[_0x16a83a(0x9b)](_0x2c463d + _0x16a83a(0xad))[_0x16a83a(0x9c)] = 'Lastconnect\x20:\x20' + sdeltalastreconnect, _0x377848[_0x16a83a(0x103)]++;
                    const _0x47d974 = new Date(),
                        _0x15b9f6 = new Date(_0x47d974);
                    var _0x13a6ca = _0x15b9f6['getMonth']() + 0x1,
                        _0x307a49 = _0x15b9f6[_0x16a83a(0xd1)](),
                        _0x53dae4 = _0x15b9f6[_0x16a83a(0x144)](),
                        _0x41a043 = _0x15b9f6[_0x16a83a(0xa5)](),
                        _0x4e545e = _0x15b9f6[_0x16a83a(0x106)](),
                        _0x44a110 = _0x15b9f6['getSeconds'](),
                        _0x386204 = _0x307a49 + '/' + _0x13a6ca + '/' + _0x53dae4 + '\x20' + _0x41a043 + ':' + _0x4e545e + ':' + _0x44a110;
                    sdeltalastreconnect = _0x386204[_0x16a83a(0xc0)]();
                    if (networkStatus === 'online') {
                        if (_0x377848['connectionTries'] >= 0xa) isToBeConnect = !{}[!![]];
                        else {
                            const _0x19dd8e = new Date(),
                                _0x552664 = new Date(_0x19dd8e);
                            var _0x13a6ca = _0x552664[_0x16a83a(0xa2)]() + 0x1,
                                _0x307a49 = _0x552664[_0x16a83a(0xd1)](),
                                _0x53dae4 = _0x552664[_0x16a83a(0x144)](),
                                _0x41a043 = _0x552664[_0x16a83a(0xa5)](),
                                _0x4e545e = _0x552664[_0x16a83a(0x106)](),
                                _0x44a110 = _0x552664[_0x16a83a(0xe8)](),
                                _0x386204 = _0x307a49 + '/' + _0x13a6ca + '/' + _0x53dae4 + '\x20' + _0x41a043 + ':' + _0x4e545e + ':' + _0x44a110;
                            sdeltalastreconnect = _0x386204[_0x16a83a(0xc0)](), document[_0x16a83a(0x9b)](_0x2c463d + 'destatus-conn')[_0x16a83a(0x9c)] = _0x16a83a(0xeb) + _0x377848[_0x16a83a(0x103)] + ')', document['getElementById'](_0x2c463d + _0x16a83a(0x10b))[_0x16a83a(0x141)][_0x16a83a(0x8f)] = _0x16a83a(0xb4), document[_0x16a83a(0x9b)](_0x16a83a(0x118))[_0x16a83a(0x141)]['color'] = '#e99123', $(_0x16a83a(0x93) + _0x2c463d)[_0x16a83a(0x11f)](_0x16a83a(0x129), _0x16a83a(0xc1)), document['getElementById'](_0x2c463d + _0x16a83a(0xad))['innerText'] = _0x16a83a(0xfb) + sdeltalastreconnect, (isToBeConnect = {}[!![]]) && makeWebSocConnectionsites(_0x377848['ws'][_0x16a83a(0xef)], _0x377848['id'], _0x377848[_0x16a83a(0x103)], _0x377848[_0x16a83a(0x123)]);
                        }
                    }
                };
            _0x377848[_0x1a53b3(0x9d)]('linkedeye', _0x1a53b3(0xe6), _0x4d9e7b, _0x5e227a, '/');
        } else alert(_0x1a53b3(0xea));
    } catch (_0x1e3420) {
        return;
    }
}