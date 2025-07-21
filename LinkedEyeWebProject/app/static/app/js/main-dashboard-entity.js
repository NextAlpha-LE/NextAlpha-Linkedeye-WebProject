var _0xb0a8f5 = _0x3725;
(function (_0x4fe6a4, _0x278564) {
    var _0x348e7e = _0x3725,
        _0x611911 = _0x4fe6a4();
    while (!![]) {
        try {
            var _0x259614 = parseInt(_0x348e7e(0x1ac)) / 0x1 * (-parseInt(_0x348e7e(0x157)) / 0x2) + parseInt(_0x348e7e(0xcc)) / 0x3 * (parseInt(_0x348e7e(0x11a)) / 0x4) + -parseInt(_0x348e7e(0x1d1)) / 0x5 * (-parseInt(_0x348e7e(0x136)) / 0x6) + -parseInt(_0x348e7e(0x182)) / 0x7 * (parseInt(_0x348e7e(0x197)) / 0x8) + parseInt(_0x348e7e(0x1ca)) / 0x9 * (-parseInt(_0x348e7e(0xde)) / 0xa) + parseInt(_0x348e7e(0x19e)) / 0xb * (parseInt(_0x348e7e(0x1af)) / 0xc) + -parseInt(_0x348e7e(0x185)) / 0xd * (-parseInt(_0x348e7e(0x1cd)) / 0xe);
            if (_0x259614 === _0x278564) break;
            else _0x611911['push'](_0x611911['shift']());
        } catch (_0x2ac885) {
            _0x611911['push'](_0x611911['shift']());
        }
    }
}(_0x5199, 0xc9f0e));
var responseFromServer, params = new URLSearchParams(document[_0xb0a8f5(0x188)][_0xb0a8f5(0xec)]),
    cyGraph, zoom = 0x1,
    titleToId = {},
    wsConnected = ![],
    connectionTries = 0x6,
    mdeltalastreconnect = '',
    dclient = {},
    graphLayout = {
        'name': _0xb0a8f5(0x1e2),
        'directed': !![],
        'padding': 0xa,
        'animate': ![],
        'fit': !![],
        'nodeOverlap': 0x1388
    },
    sitesData = [],
    chartsData = [],
    abc = {
        'hosts': {
            'ok': 0x1
        }
    };
entitySelectedsite = '\x20';
var siteResponse, entityResponse, sortedJson = {},
    delobj = {},
    nodeList, site_list = [],
    chartdata_list = {};
$(document)[_0xb0a8f5(0x16d)](function () {
    getEntityDataChart(), getSiteNamesChart();
});

function getSiteNamesChart() {
    var _0x25e802 = _0xb0a8f5;
    requestDataFromServer(_0x25e802(0x16e), {
        'type': _0x25e802(0x176),
        'isOnlyEnabled': !![]
    }, _0x25e802(0x18a))[_0x25e802(0x1a0)](function (_0x17c138) {
        var _0x1e0d2d = _0x25e802;
        res = JSON['parse'](_0x17c138), site_list = res[_0x1e0d2d(0x1d4)][_0x1e0d2d(0x11f)](({
            sitename: _0x28c9f6
        }) => _0x28c9f6), res['status'] == 0xc8 && (siteResponse = res[_0x1e0d2d(0x1d4)]);
    });
}

function searchNodesChart() {
    var _0x11eab6 = _0xb0a8f5,
        _0x49ead2 = document[_0x11eab6(0x139)](_0x11eab6(0x196));
    _0x49ead2[_0x11eab6(0x1c5)]('keyup', function (_0x23043f) {
        var _0x2bf593 = _0x11eab6;
        if (document['getElementById'](_0x2bf593(0x15c))[_0x2bf593(0x106)]['display'] == _0x2bf593(0xfa)) {
            if (_0x23043f['keyCode'] === 0xd) {
                _0x23043f['preventDefault']();
                var _0x35ced4 = $(_0x2bf593(0x1d2))[_0x2bf593(0x10c)]();
                valueLength = _0x35ced4[_0x2bf593(0x192)]()[_0x2bf593(0xd5)];
                if (valueLength < 0x3) swal(_0x2bf593(0xc8), '\x20', _0x2bf593(0xe0));
                else showLoader(_0x2bf593(0x10d)), requestDataFromServer(_0x2bf593(0xe1), {
                    'nodeid': _0x35ced4,
                    'mode': _0x2bf593(0x10f),
                    'csrfmiddlewaretoken': csfr_token,
                    'selectedSite': entitySelectedsite
                }, type = _0x2bf593(0x1b2))['done'](searchNodeResponseChart);
            }
        }
    });
}

function getEntityDataChart() {
    var _0x40ebb1 = _0xb0a8f5;
    showLoader(_0x40ebb1(0x10d)), requestDataFromServer(_0x40ebb1(0x111), {
        'sitename': '\x20'
    }, type = _0x40ebb1(0x18a))['done'](function (_0x7b4a7e) {
        var _0x21a197 = _0x40ebb1;
        const _0x63af0e = Math['random']()[_0x21a197(0x1d7)](0x24)['substring'](0x2, 0x5);
        if (_0x7b4a7e == undefined) return;
        entityResponse = _0x7b4a7e['responseData'], _0x7b4a7e[_0x21a197(0x1cf)][_0x21a197(0xd5)] > 0x0 ? _0x7b4a7e[_0x21a197(0x1cf)][_0x21a197(0x1c0)](function (_0x550549, _0x4ada7f) {
            var _0x4c141d = _0x21a197,
                _0x2d1b63 = {};
            _0x2d1b63['site'] = _0x550549[_0x4c141d(0x16a)], _0x2d1b63[_0x4c141d(0x19c)] = !![], _0x2d1b63[_0x4c141d(0x1e9)] = ![], _0x2d1b63['criticalNodeCount'] = 0x0, _0x2d1b63[_0x4c141d(0x10a)] = {
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
            }, responseFromServer = _0x550549[_0x4c141d(0xbd)], sitesData[_0x4c141d(0x135)](_0x2d1b63);
            var _0x3f288e = siteResponse[_0x4c141d(0x124)](_0x17363b => _0x17363b[_0x4c141d(0xc6)] === _0x550549[_0x4c141d(0x16a)])[0x0];
            makeWebSocConnectionChart(_0x3f288e[_0x4c141d(0x1d3)], _0x2d1b63[_0x4c141d(0x16a)], 0x0, _0x2d1b63[_0x4c141d(0xe6)], _0x63af0e);
        }) : (stopLoader(_0x21a197(0x10d)), $(_0x21a197(0x13c))[_0x21a197(0x11d)](_0x21a197(0x1c7), 'hidden'), $(_0x21a197(0x155))[_0x21a197(0x11d)]('display', _0x21a197(0x1c3)), $('#node-view\x20#entity-nodata')[_0x21a197(0x11d)](_0x21a197(0x1a1), 'block'), $(_0x21a197(0x119))[_0x21a197(0xc5)](_0x21a197(0x113)));
    });
}
var getoverallJSON = async function (_0x321767, _0x269ac6) {
    return await new Promise(function (_0x6957b0, _0x27ac29) {
        var _0x3aa99b = _0x3725,
            _0x25e9f7 = _0x321767,
            _0x156dff = params['get'](_0x3aa99b(0x16a)),
            _0x1e90d6 = '';
        const _0x3e0ee6 = {
            'sitename': _0x156dff,
            'layer': _0x1e90d6
        };
        console[_0x3aa99b(0x1eb)]('3-getoverallJSON\x20for\x20--->' + _0x269ac6 + '\x20'), fetch(_0x25e9f7 + '?' + new URLSearchParams(_0x3e0ee6), {
            'method': _0x3aa99b(0x18a),
            'headers': {
                'Content-Type': 'application/json'
            }
        })[_0x3aa99b(0x1e6)](_0x248385 => _0x248385['json']())[_0x3aa99b(0x1e6)](_0x72befe => {
            var _0x1d1c4c = _0x3aa99b,
                _0x553690 = _0x72befe['data'],
                _0x2abe20 = 0x0,
                _0xb9dda = 0x0,
                _0xd911d5 = 0x0,
                _0x5883a5 = 0x0,
                _0x41616e = 0x0,
                _0x599063 = 0x0,
                _0x107b43 = 0x0,
                _0xf9b3f8 = 0x0;
            for (const [_0x1fbab8, _0x20fad0] of Object[_0x1d1c4c(0xc3)](_0x553690)) {
                _0x2abe20 += _0x20fad0['Host']['0'], _0xb9dda += _0x20fad0['Host']['1'], _0xd911d5 += _0x20fad0['Host']['2'], _0x5883a5 += _0x20fad0[_0x1d1c4c(0x162)]['3'], _0x41616e += _0x20fad0[_0x1d1c4c(0x112)]['0'], _0x599063 += _0x20fad0[_0x1d1c4c(0x112)]['1'], _0x107b43 += _0x20fad0[_0x1d1c4c(0x112)]['2'], _0xf9b3f8 += _0x20fad0[_0x1d1c4c(0x112)]['3'];
            }
            chartresponse = {
                'host': {
                    'CRITICAL': _0x2abe20,
                    'OK': _0xd911d5,
                    'WARNING': _0xb9dda,
                    'UNKNOWN': _0x5883a5
                },
                'service': {
                    'CRITICAL': _0x41616e,
                    'OK': _0x107b43,
                    'WARNING': _0x599063,
                    'UNKNOWN': _0xf9b3f8
                }
            }, _0x6957b0(chartresponse), chartresponse[_0x1d1c4c(0x12c)]();
        })[_0x3aa99b(0x15f)](_0x3c812a => {
            var _0x343e24 = _0x3aa99b;
            stopLoader(_0x343e24(0x1c8)), stopLoader('containerpie-services');
        }), console[_0x3aa99b(0x1b1)](_0x3aa99b(0xe9) + _0x269ac6 + '\x20');
    });
}, getchartJSON = async function (_0x3792be, _0x52d95f) {
    return await new Promise(function (_0x901fb5, _0x446f95) {
        var _0x55283b = _0x3725,
            _0x3414dc = new XMLHttpRequest();
        _0x3414dc[_0x55283b(0xe7)]('get', _0x3792be, !![]), _0x3414dc[_0x55283b(0xf4)] = _0x55283b(0x1ce), _0x3414dc['timeout'] = 0x7d0, _0x3414dc[_0x55283b(0xd0)] = function () {
            var _0x1cb9a9 = _0x55283b,
                _0x31f6d5 = _0x3414dc[_0x1cb9a9(0x104)];
            _0x31f6d5 == 0xc8 ? _0x901fb5(_0x3414dc[_0x1cb9a9(0x1ec)]) : _0x446f95(_0x31f6d5);
        }, _0x3414dc[_0x55283b(0x18c)] = function () {
            var _0x356fc1 = _0x55283b;
            _0x446f95({
                'site': _0x52d95f,
                'status': _0x3414dc[_0x356fc1(0x104)],
                'statusText': _0x3414dc['statusText']
            });
        }, _0x3414dc[_0x55283b(0x12c)]();
    });
};
async function requestdata(_0x359491) {
    return await new Promise(function (_0xa602e7, _0x4e6a25) {
        var _0x5edf7f = _0x3725;
        const _0x3e6ab8 = new URL(_0x5edf7f(0xfd), document[_0x5edf7f(0x188)]),
            _0x12ae54 = new URLSearchParams();
        _0x12ae54[_0x5edf7f(0x114)](_0x5edf7f(0xc6), _0x359491[_0x5edf7f(0x16a)]), _0x12ae54[_0x5edf7f(0x114)](_0x5edf7f(0x151), ''), _0x3e6ab8[_0x5edf7f(0xec)] = _0x12ae54[_0x5edf7f(0x1d7)](), console[_0x5edf7f(0x1eb)](_0x5edf7f(0x14d) + _0x359491[_0x5edf7f(0x16a)] + '\x20'), _0xa602e7(getoverallJSON(_0x3e6ab8, _0x359491[_0x5edf7f(0x16a)])[_0x5edf7f(0x1e6)](function (_0x44ffa1) {
            chartsData['push'](_0x44ffa1);
        })[_0x5edf7f(0x15f)](function (_0x101800) { })), console[_0x5edf7f(0x1b1)](_0x5edf7f(0x14d) + _0x359491[_0x5edf7f(0x16a)] + '\x20');
    });
}
async function getnewchart() {
    var _0x2885b2 = _0xb0a8f5,
        _0x3f9e02;
    console[_0x2885b2(0x1eb)](_0x2885b2(0xca));
    var _0x579cdf = {
        'host': {
            'CRITICAL': 0x0,
            'OK': 0x0,
            'WARNING': 0x0,
            'UNKNOWN': 0x0
        },
        'service': {
            'CRITICAL': 0x0,
            'OK': 0x0,
            'WARNING': 0x0,
            'UNKNOWN': 0x0
        }
    };
    const _0x1f4c52 = new URL(_0x2885b2(0xfd), document[_0x2885b2(0x188)]);
    await Promise[_0x2885b2(0x173)](site_list[_0x2885b2(0x11f)](_0x251f85 => {
        var _0x9e8f8 = _0x2885b2;
        const _0x5cfe3d = {
            'sitename': _0x251f85,
            'layer': '',
            'allsite': _0x9e8f8(0x167)
        };
        return Promise[_0x9e8f8(0x198)]([fetch(_0x1f4c52 + '?' + new URLSearchParams(_0x5cfe3d), {
            'method': _0x9e8f8(0x18a),
            'headers': {
                'Content-Type': _0x9e8f8(0xed)
            }
        })])[_0x9e8f8(0x1e6)](_0x45a4d6 => _0x45a4d6[_0x9e8f8(0x1ce)]())[_0x9e8f8(0x1e6)](_0x452966 => {
            var _0x50c7bf = _0x9e8f8;
            console[_0x50c7bf(0x1ae)](_0x50c7bf(0x10e) + JSON[_0x50c7bf(0x153)](_0x452966));
            var _0x5b0ff5 = _0x452966['data'][_0x50c7bf(0xf7)],
                _0x1b8321 = _0x452966[_0x50c7bf(0x1d4)][_0x50c7bf(0x1c6)];
            _0x579cdf[_0x50c7bf(0xf7)] = {
                'CRITICAL': _0x579cdf[_0x50c7bf(0xf7)][_0x50c7bf(0x145)] + _0x5b0ff5[_0x50c7bf(0x145)],
                'OK': _0x579cdf[_0x50c7bf(0xf7)]['OK'] + _0x5b0ff5['OK'],
                'WARNING': _0x579cdf[_0x50c7bf(0xf7)][_0x50c7bf(0xf5)] + _0x5b0ff5[_0x50c7bf(0xf5)],
                'UNKNOWN': _0x579cdf[_0x50c7bf(0xf7)][_0x50c7bf(0x1e1)] + _0x5b0ff5[_0x50c7bf(0x1e1)]
            }, _0x579cdf[_0x50c7bf(0x1c6)] = {
                'CRITICAL': _0x579cdf[_0x50c7bf(0x1c6)][_0x50c7bf(0x145)] + _0x1b8321[_0x50c7bf(0x145)],
                'OK': _0x579cdf['service']['OK'] + _0x1b8321['OK'],
                'WARNING': _0x579cdf[_0x50c7bf(0x1c6)][_0x50c7bf(0xf5)] + _0x1b8321[_0x50c7bf(0xf5)],
                'UNKNOWN': _0x579cdf[_0x50c7bf(0x1c6)][_0x50c7bf(0x1e1)] + _0x1b8321[_0x50c7bf(0x1e1)]
            }, chartdata_list[_0x452966[_0x50c7bf(0x16a)]] = _0x452966[_0x50c7bf(0x1d4)];
        })[_0x9e8f8(0x15f)](_0x3b38e5 => {
            var _0x4ae62c = _0x9e8f8;
            console[_0x4ae62c(0xe0)](_0x4ae62c(0xce), _0x3b38e5);
        });
    })), fillHostServiceCount(_0x579cdf);
}

function fillNodeDetailsChart(_0x1b8574) {
    var _0x5bdbca = _0xb0a8f5;
    const _0x4d4eb9 = Math[_0x5bdbca(0xd4)]()[_0x5bdbca(0x1d7)](0x24)[_0x5bdbca(0xda)](0x2, 0x5);
    if (_0x1b8574 == undefined) return;
    entityResponse = _0x1b8574[_0x5bdbca(0x1cf)];
    if (_0x1b8574['responseData'][_0x5bdbca(0xd5)] > 0x0) {
        _0x1b8574['responseData'][_0x5bdbca(0x1c0)](function (_0x57d460, _0x14e955) {
            var _0x4e2975 = _0x5bdbca,
                _0xcdf588 = {};
            _0xcdf588[_0x4e2975(0x16a)] = _0x57d460[_0x4e2975(0x16a)], _0xcdf588[_0x4e2975(0x19c)] = !![], _0xcdf588[_0x4e2975(0x1e9)] = ![], _0xcdf588[_0x4e2975(0xe6)] = 0x0, _0xcdf588[_0x4e2975(0x10a)] = {
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
            }, responseFromServer = _0x57d460[_0x4e2975(0xbd)], sitesData[_0x4e2975(0x135)](_0xcdf588);
            var _0x3017fe = siteResponse['filter'](_0x281752 => _0x281752[_0x4e2975(0xc6)] === _0x57d460[_0x4e2975(0x16a)])[0x0];
            makeWebSocConnectionChart(_0x3017fe[_0x4e2975(0x1d3)], _0xcdf588[_0x4e2975(0x16a)], 0x0, _0xcdf588[_0x4e2975(0xe6)], _0x4d4eb9);
        }), sSitehtml = '', fSitehtml = '', $(_0x5bdbca(0xe8))[_0x5bdbca(0x169)](), sitesData[_0x5bdbca(0x1c0)](function (_0x29c587, _0x22bec4) {
            var _0x1645ac = _0x5bdbca;
            if (_0x29c587[_0x1645ac(0x19c)]) sSitehtml += '<li\x20class=\x22nav-item\x20success\x22\x20id=\x22' + _0x29c587[_0x1645ac(0x16a)] + _0x1645ac(0x18e) + _0x29c587[_0x1645ac(0x16a)] + _0x1645ac(0xc4) + _0x29c587[_0x1645ac(0x16a)] + _0x1645ac(0xff) + _0x29c587['site'] + _0x1645ac(0x13f) + _0x29c587['site'] + _0x1645ac(0xdb) + _0x29c587['site'] + _0x1645ac(0x146);
            else fSitehtml += _0x1645ac(0x165) + _0x29c587[_0x1645ac(0x16a)] + '_li\x22\x20style=\x22position:\x20relative;\x22><span\x20class=\x22indicator-circle\x22\x20style=\x22background:\x20#ff3d57;\x20z-index:\x20100;position:\x20absolute;top:\x20-4px;right:\x206px;\x22\x20id=\x22' + _0x29c587[_0x1645ac(0x16a)] + _0x1645ac(0xd9) + _0x29c587[_0x1645ac(0x16a)] + _0x1645ac(0x1b6) + _0x29c587[_0x1645ac(0x16a)] + _0x1645ac(0x13f) + _0x29c587[_0x1645ac(0x16a)] + _0x1645ac(0xdb) + _0x29c587[_0x1645ac(0x16a)] + _0x1645ac(0x146);
        }), $('#node-view\x20#site-list')[_0x5bdbca(0x1bd)](fSitehtml), $(_0x5bdbca(0xe8))['append'](sSitehtml);
        $(_0x5bdbca(0x11c))['eq'](0x0)[_0x5bdbca(0x1d4)]() && (entitySelectedsite = $(_0x5bdbca(0x11c))['eq'](0x0)[_0x5bdbca(0x1d4)]()['id']);
        var _0x3f04d8 = entityResponse[_0x5bdbca(0x124)](_0x522bc6 => _0x522bc6[_0x5bdbca(0x16a)] === entitySelectedsite)[0x0];
        stopLoader(_0x5bdbca(0x10d));
    } else stopLoader(_0x5bdbca(0x10d)), $('#node-view\x20#entity-search')[_0x5bdbca(0x11d)]('visibility', _0x5bdbca(0x12e)), $(_0x5bdbca(0x155))[_0x5bdbca(0x11d)](_0x5bdbca(0x1a1), _0x5bdbca(0x1c3)), $(_0x5bdbca(0x128))[_0x5bdbca(0x11d)](_0x5bdbca(0x1a1), _0x5bdbca(0xfa)), $(_0x5bdbca(0x119))[_0x5bdbca(0xc5)]('No\x20Data');
    if (pageName === _0x5bdbca(0x18d)) var _0x457935 = siteResponse['filter'](_0x20c5a3 => _0x20c5a3[_0x5bdbca(0xc6)] === entitySelectedsite)[0x0];
}

function displayNodesChart(_0x1037e4, _0x2e1428) {
    var _0xf8388a = _0xb0a8f5;
    if (Object['keys'](_0x1037e4)[_0xf8388a(0xd5)] > 0x0 && _0x1037e4['nodes'] && _0x1037e4[_0xf8388a(0x1a2)][_0xf8388a(0x1d4)][_0xf8388a(0xd5)] > 0x0) {
        $(_0xf8388a(0x13c))['css']('visibility', _0xf8388a(0xd2)), $(_0xf8388a(0x155))[_0xf8388a(0x11d)](_0xf8388a(0x1a1), _0xf8388a(0xfa)), $(_0xf8388a(0x128))['css'](_0xf8388a(0x1a1), _0xf8388a(0x1c3));
        var _0x34e057 = sitesData[_0xf8388a(0x124)](_0x500427 => _0x500427[_0xf8388a(0x16a)] === entitySelectedsite)[0x0];
        responseFromServer = _0x1037e4;
        var _0x35b585 = [],
            _0x107884 = [],
            _0x1ba0d2 = '',
            _0x6e1bce = 0x0;
        sortedJson = {};
        var _0x5675c5 = responseFromServer[_0xf8388a(0x1a2)],
            _0x18eae3 = 0x0,
            _0x557b0c = 0x0,
            _0x19735e = 0x0,
            _0x3bf22b = 0x0,
            _0x376700 = 0x0;
        _0x5675c5[_0xf8388a(0x104)] == 0xc8 && ($(_0xf8388a(0x191))['html'](_0xf8388a(0x12f) + _0x5675c5[_0xf8388a(0x1d4)]['length'] + ')'), _0x5675c5[_0xf8388a(0x1d4)][_0xf8388a(0x1c0)](function (_0x2a1158) {
            var _0xb250af = _0xf8388a;
            if (_0x2a1158[0x2]) var _0x4b9892 = _0x2a1158[0x2][_0xb250af(0x148)]();
            else var _0x4b9892 = _0x2a1158[0x2];
            (_0x4b9892 === _0xb250af(0x145) || _0x4b9892 === _0xb250af(0x133) || _0x4b9892 === _0xb250af(0x17e) || _0x4b9892 === _0xb250af(0x1c9) || _0x4b9892 === 'WAITING') && (_0x18eae3 += 0x1);
            (_0x4b9892 == '' || _0x4b9892 === _0xb250af(0x1e7) || _0x4b9892 === _0xb250af(0x14f) || _0x4b9892 === 'OK' || _0x4b9892 === 'UP') && (_0x557b0c += 0x1);
            _0x4b9892 === 'PENDING' && (_0x19735e += 0x1);
            _0x4b9892 === _0xb250af(0xf5) && (_0x3bf22b += 0x1);
            (_0x4b9892 === _0xb250af(0x1e1) || _0x4b9892 === _0xb250af(0x14a) || _0x4b9892 === _0xb250af(0x1e4)) && (_0x376700 += 0x1);
            var _0x2ed864 = getColorForNodeState(_0x2a1158[0x2]);
            _0x6e1bce = getSizeForNode(_0x2a1158[0x4]);
            var _0x27ce00 = _0x2a1158[0x1];
            if (_0x2a1158[0x4] == _0xb250af(0x162) || _0x2a1158[0x4]['startsWith']('Node')) _0x1ba0d2 = _0x27ce00, sortedJson[_0x27ce00] === undefined && (sortedJson[_0x27ce00] = {
                'host': '',
                'services': [],
                'hostms': []
            }), sortedJson[_0x27ce00][_0xb250af(0xf7)] = _0x2a1158;
            else {
                var _0x116801 = _0x27ce00[_0xb250af(0x121)](':');
                sortedJson[_0x116801[0x0]] === undefined && (sortedJson[_0x116801[0x0]] = {
                    'host': '',
                    'services': [],
                    'hostms': []
                }), (_0x2a1158[0x4] == _0xb250af(0x122) || _0x2a1158[0x4] == _0xb250af(0x1d0)) && (_0x2a1158[0x4] == _0xb250af(0x1d0) ? (_0x1ba0d2 = _0x116801[0x2], sortedJson[_0x116801[0x0]][_0x116801[0x1]] === undefined && (sortedJson[_0x116801[0x0]][_0x116801[0x1]] = []), sortedJson[_0x116801[0x0]][_0x116801[0x1]][_0xb250af(0x135)](_0x2a1158)) : (_0x1ba0d2 = _0x116801[0x1], sortedJson[_0x116801[0x0]][_0xb250af(0x1db)][_0xb250af(0x135)](_0x2a1158))), (_0x2a1158[0x4] == _0xb250af(0x112) || _0x2a1158[0x4][_0xb250af(0x14b)]('Pod')) && (_0x1ba0d2 = _0x116801[0x1], sortedJson[_0x116801[0x0]][_0xb250af(0x129)][_0xb250af(0x135)](_0x2a1158)), _0x2a1158[0x4] != _0xb250af(0x162) && _0x2a1158[0x4] != _0xb250af(0x122) && _0x2a1158[0x4] != _0xb250af(0x112) && _0x2a1158[0x4] != 'ServiceMS' && (_0x1ba0d2 = _0x116801[0x1] ? _0x116801[0x1] : _0x116801[0x0]);
            }
            var _0x5113e7 = _0xb250af(0x144);
            _0x2a1158[0x8] === null && (_0x5113e7 = _0xb250af(0x144));
            var _0x27ee1e = {
                'data': {
                    'id': _0x2a1158[0x0],
                    'fullname': _0x27ce00,
                    'dashboardenabled': _0x5113e7,
                    'dashboard_url': _0x2a1158[0x8],
                    'text': _0x1ba0d2,
                    'image': image_path + _0x2a1158[0x5],
                    'color': _0x2ed864,
                    'size': _0x6e1bce
                }
            };
            _0x35b585['push'](_0x27ee1e), titleToId[_0x27ce00] = _0x2a1158[0x0];
        }));
        if (_0x18eae3 == 0x0) _0x34e057[_0xf8388a(0x19c)] = !![], $(_0xf8388a(0x15e))[_0xf8388a(0x101)](_0xf8388a(0x193), '\x20'), $(_0xf8388a(0x15e))['html'](_0xf8388a(0xfe) + _0x18eae3 + ')');
        else {
            _0x34e057[_0xf8388a(0x19c)] = ![];
            var _0x3d1ca1 = $('#' + entitySelectedsite + '_li')[_0xf8388a(0x101)](_0xf8388a(0xd3));
            _0x3d1ca1[_0xf8388a(0xcf)](_0xf8388a(0x131)) == ![] && ($(_0xf8388a(0x183) + client['id'] + _0xf8388a(0xf2))['removeClass']('success'), $('#node-view\x20#' + client['id'] + _0xf8388a(0xf2))[_0xf8388a(0xc9)]('failure'), $(_0xf8388a(0x183) + client['id'] + _0xf8388a(0x1ba))[_0xf8388a(0xdf)](_0xf8388a(0x1da)), $('#node-view\x20#' + client['id'] + _0xf8388a(0x1ba))['addClass']('red')), $(_0xf8388a(0x15e))['html'](_0xf8388a(0xef) + _0x18eae3 + ')</span>');
        }
        if (_0x557b0c == 0x0) $(_0xf8388a(0x1bb))[_0xf8388a(0x101)]('onclick', '\x20'), $(_0xf8388a(0x1bb))[_0xf8388a(0x171)]('Ok\x20(' + _0x557b0c + ')');
        else $(_0xf8388a(0x1bb))[_0xf8388a(0x171)](_0xf8388a(0x14e) + _0x557b0c + _0xf8388a(0xeb));
        if (_0x19735e == 0x0) $(_0xf8388a(0x147))[_0xf8388a(0x101)](_0xf8388a(0x193), '\x20'), $(_0xf8388a(0x147))['html'](_0xf8388a(0x1e8) + _0x19735e + ')');
        else $('#pills-pending-tab')[_0xf8388a(0x171)](_0xf8388a(0x194) + _0x19735e + _0xf8388a(0xeb));
        if (_0x3bf22b == 0x0) $(_0xf8388a(0x1b5))[_0xf8388a(0x101)](_0xf8388a(0x193), '\x20'), $(_0xf8388a(0x1b5))[_0xf8388a(0x171)](_0xf8388a(0x142) + _0x3bf22b + ')');
        else $('#pills-warning-tab')[_0xf8388a(0x171)](_0xf8388a(0x1a7) + _0x3bf22b + _0xf8388a(0xeb));
        if (_0x376700 == 0x0) $('#pills-unknown-tab')[_0xf8388a(0x101)](_0xf8388a(0x193), '\x20'), $(_0xf8388a(0x18f))[_0xf8388a(0x171)]('Unknown\x20(' + _0x376700 + ')');
        else $('#pills-unknown-tab')[_0xf8388a(0x171)](_0xf8388a(0x116) + _0x376700 + _0xf8388a(0xeb));
        var _0x589699 = responseFromServer['relationships'];
        _0x589699['status'] == 0xc8 && _0x589699[_0xf8388a(0x1d4)][_0xf8388a(0x1c0)](function (_0x296c26) {
            var _0xf476a = _0xf8388a,
                _0xaa42b9 = {
                    'data': {
                        'source': _0x296c26[0x0],
                        'target': _0x296c26[0x1],
                        'id': _0xf476a(0x15a) + _0x296c26[0x0] + _0x296c26[0x1],
                        'label': _0x296c26[0x2]
                    }
                };
            _0x107884['push'](_0xaa42b9);
        }), createGraphChart(_0x35b585, _0x107884);
    } else {
        $(_0xf8388a(0x13c))[_0xf8388a(0x11d)](_0xf8388a(0x1c7), _0xf8388a(0x12e)), $('#node-view\x20#vis')[_0xf8388a(0x11d)](_0xf8388a(0x1a1), _0xf8388a(0x1c3)), $(_0xf8388a(0x128))[_0xf8388a(0x11d)](_0xf8388a(0x1a1), _0xf8388a(0xfa));
        if (_0x2e1428 == 0xc8) $(_0xf8388a(0x163))[_0xf8388a(0xc5)](_0xf8388a(0x113));
        else $('#entity-nodata\x20#nodatamessage')[_0xf8388a(0xc5)](_0xf8388a(0x1cc));
    }
}

function displayTableChart() {
    var _0x4086fc = _0xb0a8f5;
    $(_0x4086fc(0x13d))[_0x4086fc(0x169)]();
    var _0x2884c5 = '';
    _0x2884c5 += '<thead\x20class=\x22table-head\x20border-t\x22>', _0x2884c5 += _0x4086fc(0x1ad), _0x2884c5 += '<th>IP\x20Address</th>', _0x2884c5 += '<th>Service</th>', _0x2884c5 += _0x4086fc(0x19a), _0x2884c5 += _0x4086fc(0x1c1), _0x2884c5 += _0x4086fc(0x1be), _0x2884c5 += _0x4086fc(0x1b8), _0x2884c5 += _0x4086fc(0x166), _0x2884c5 += _0x4086fc(0x1d5), $[_0x4086fc(0x1ea)](sortedJson, function (_0xde1e0, _0x5cca80) {
        var _0x38c1ff = _0x4086fc,
            _0x2d5ed7 = '',
            _0x309180 = _0x5cca80[_0x38c1ff(0x1db)][_0x38c1ff(0xd5)] + _0x5cca80[_0x38c1ff(0x129)][_0x38c1ff(0xd5)],
            _0x3231b5 = 0x0,
            _0x4c00c3 = '';
        _0x4c00c3 += _0x38c1ff(0x1ad), _0x4c00c3 += _0x38c1ff(0xc1) + _0x212f61 + '\x27>' + _0x5cca80[_0x38c1ff(0xf7)][0x7] + '</td>', _0x4c00c3 += '<td\x20style=\x27border-left:\x201px\x20solid\x20#eee;\x27>Server</td>', _0x4c00c3 += _0x38c1ff(0x184) + getFormatedDate(_0x5cca80['host'][0x6]) + '</td>';
        var _0x4aab60 = getColorForNodeState(_0x5cca80['host'][0x2]),
            _0x3b6ca6 = _0x5cca80[_0x38c1ff(0xf7)][0x2] == '' ? 'OK' : _0x5cca80[_0x38c1ff(0xf7)][0x2];
        _0x4c00c3 += _0x38c1ff(0x1a5) + _0x4aab60 + '\x27>' + _0x3b6ca6 + _0x38c1ff(0xe5), _0x4c00c3 += _0x38c1ff(0x184) + _0x5cca80[_0x38c1ff(0xf7)][0x3] + _0x38c1ff(0x16c), _0x4c00c3 += _0x38c1ff(0x1b8);
        var _0x13c2be = '';
        _0x5cca80['services'][_0x38c1ff(0xd5)] > 0x0 && $[_0x38c1ff(0x1ea)](_0x5cca80[_0x38c1ff(0x129)], function (_0x2ed6ba, _0x2d4557) {
            var _0x5b5c83 = _0x38c1ff;
            _0x13c2be += _0x5b5c83(0x1ad), _0x13c2be += _0x5b5c83(0x159), _0x13c2be += _0x5b5c83(0x1cb) + _0x2d4557[0x1]['split'](':')[0x1] + _0x5b5c83(0x16c), _0x13c2be += _0x5b5c83(0x184) + _0x2d4557[0x6] + _0x5b5c83(0x16c);
            var _0x969ad1 = getColorForNodeState(_0x2d4557[0x2]),
                _0x943361 = _0x2d4557[0x2] == '' ? 'OK' : _0x2d4557[0x2];
            _0x13c2be += _0x5b5c83(0x1a5) + _0x969ad1 + '\x27>' + _0x943361 + _0x5b5c83(0xe5), _0x13c2be += _0x5b5c83(0x184) + _0x2d4557[0x3] + '</td>', _0x13c2be += _0x5b5c83(0x1b8);
        });
        var _0x212f61 = _0x309180 + _0x3231b5 + 0x1,
            _0x52fde6 = '';
        $['each'](_0x5cca80[_0x38c1ff(0x1db)], function (_0x26160a, _0x267684) {
            var _0x471d03 = _0x38c1ff;
            _0x52fde6 += _0x471d03(0x1ad), _0x52fde6 += '<td\x20class\x20=\x20\x27ip\x27>\x20</td>', _0x52fde6 += _0x471d03(0x1cb) + _0x267684[0x1][_0x471d03(0x121)](':')[0x1] + _0x471d03(0x16c), _0x52fde6 += _0x471d03(0x184) + getFormatedDate(_0x267684[0x6]) + '</td>';
            var _0x2899c0 = getColorForNodeState(_0x267684[0x2]),
                _0x33e5e5 = _0x267684[0x2] == '' ? 'OK' : _0x267684[0x2];
            _0x52fde6 += _0x471d03(0x1a5) + _0x2899c0 + '\x27>' + _0x33e5e5 + _0x471d03(0xe5), _0x52fde6 += _0x471d03(0x184) + _0x267684[0x3] + _0x471d03(0x16c), _0x52fde6 += _0x471d03(0x1b8);
        }), _0x2d5ed7 = _0x4c00c3 + _0x13c2be + _0x52fde6, _0x2884c5 += _0x2d5ed7;
    }), _0x2884c5 = _0x2884c5 + _0x4086fc(0x118), $(_0x4086fc(0x13d))[_0x4086fc(0x1bd)](_0x2884c5);
    let _0x3db4a3 = {
        'valueNames': [_0x4086fc(0x1c6), 'ip', _0x4086fc(0x104)]
    };
    nodeList = new List(_0x4086fc(0x10d), _0x3db4a3);
}

function nodeStatus(_0x537bc8) {
    var _0xe40fe9 = _0xb0a8f5,
        _0x442231 = 0x0,
        _0x1270c0 = 0x0,
        _0x14a3c6 = 0x0,
        _0x4f7048 = 0x0,
        _0x158089 = 0x0,
        _0x37e046 = {
            'criticalCount': 0x0,
            'okStatusCount': 0x0,
            'pendingCount': 0x0,
            'warningCount': 0x0
        };
    return _0x537bc8[_0xe40fe9(0x1c0)](function (_0x234b9f) {
        var _0x41a63a = _0xe40fe9;
        if (_0x234b9f[0x0]) var _0x8e4e19 = _0x234b9f[0x0][_0x41a63a(0x148)]();
        else var _0x8e4e19 = _0x234b9f[0x0];
        (_0x8e4e19 === _0x41a63a(0x145) || _0x8e4e19 === _0x41a63a(0x133) || _0x8e4e19 === 'UNREACHABLE' || _0x8e4e19 === _0x41a63a(0x1c9) || _0x8e4e19 === _0x41a63a(0x12a)) && (_0x442231 = _0x442231 + _0x234b9f[0x1]), (_0x8e4e19 == '' || _0x8e4e19 === _0x41a63a(0x1e7) || _0x8e4e19 === _0x41a63a(0x14f) || _0x8e4e19 === 'OK' || _0x8e4e19 === 'UP') && (_0x1270c0 = _0x1270c0 + _0x234b9f[0x1]), _0x8e4e19 === _0x41a63a(0x1a6) && (_0x14a3c6 = _0x14a3c6 + _0x234b9f[0x1]), _0x8e4e19 === _0x41a63a(0xf5) && (_0x4f7048 = _0x4f7048 + _0x234b9f[0x1]), (_0x8e4e19 === 'UNKNOWN' || _0x8e4e19 === _0x41a63a(0x14a) || _0x8e4e19 === _0x41a63a(0x1e4)) && (_0x158089 = _0x158089 + _0x234b9f[0x1]);
    }), _0x37e046 = {
        'criticalCount': _0x442231,
        'okCount': _0x1270c0,
        'pendingCount': _0x14a3c6,
        'warningCount': _0x4f7048,
        'unknownCount': _0x158089
    }, _0x37e046;
}

function findCountChart(_0x58dc10) {
    var _0x1945e0 = _0xb0a8f5,
        _0x53667f = 0x0,
        _0x456370 = 0x0,
        _0x23433e = 0x0,
        _0x47372d = 0x0,
        _0x44e9cf = 0x0,
        _0x473f93 = 0x0,
        _0x29d35c = 0x0,
        _0x430f4d = 0x0;
    console['time'](_0x1945e0(0x160)), chartsData[_0x1945e0(0x1c0)](function (_0x26217b) {
        var _0x4896da = _0x1945e0;
        _0x53667f = _0x53667f + _0x26217b[_0x4896da(0xf7)][_0x4896da(0x145)], _0x456370 = _0x456370 + _0x26217b[_0x4896da(0xf7)]['OK'], _0x23433e = _0x23433e + _0x26217b['host'][_0x4896da(0xf5)], _0x47372d = _0x47372d + _0x26217b[_0x4896da(0xf7)][_0x4896da(0x1e1)], _0x44e9cf = _0x44e9cf + _0x26217b[_0x4896da(0x1c6)][_0x4896da(0x145)], _0x473f93 = _0x473f93 + _0x26217b[_0x4896da(0x1c6)]['OK'], _0x29d35c = _0x29d35c + _0x26217b[_0x4896da(0x1c6)]['WARNING'], _0x430f4d = _0x430f4d + _0x26217b[_0x4896da(0x1c6)]['UNKNOWN'];
    });
    var _0xef9d50 = {};
    _0xef9d50[_0x1945e0(0xf7)] = {
        'CRITICAL': _0x53667f,
        'OK': _0x456370,
        'WARNING': _0x23433e,
        'UNKNOWN': _0x47372d
    }, _0xef9d50[_0x1945e0(0x1c6)] = {
        'CRITICAL': _0x44e9cf,
        'OK': _0x473f93,
        'WARNING': _0x29d35c,
        'UNKNOWN': _0x430f4d
    }, console[_0x1945e0(0x1b1)]('\x204-findCountChart'), fillHostServiceCount(_0xef9d50), fillNodeDetailsChart(_0x58dc10);
}

function createGraphChart(_0x23218f, _0x4f6cec) {
    var _0x46e72b = _0xb0a8f5;
    $(_0x46e72b(0x12b))[_0x46e72b(0x169)](), cyGraph = cytoscape({
        'container': document[_0x46e72b(0x139)](_0x46e72b(0x15c)),
        'boxSelectionEnabled': ![],
        'autounselectify': ![],
        'style': cytoscape[_0x46e72b(0xf0)]()['selector'](_0x46e72b(0x164))[_0x46e72b(0x11d)]({
            'font-size': '8',
            'width': _0x46e72b(0x143),
            'height': _0x46e72b(0x143),
            'background-fit': _0x46e72b(0x174),
            'background-color': _0x46e72b(0x103),
            'border-width': 0x1,
            'border-opacity': 0.5,
            'border-color': _0x46e72b(0x103),
            'background-image': _0x46e72b(0xc7),
            'color': _0x46e72b(0x103)
        })[_0x46e72b(0x177)](_0x46e72b(0x1de))['css']({
            'curve-style': 'bezier',
            'width': 0.5,
            'target-arrow-shape': _0x46e72b(0x11b),
            'line-color': _0x46e72b(0x158),
            'target-arrow-color': '#aeaeae'
        })['selector']('node.highlight')[_0x46e72b(0x11d)]({
            'border-width': '3',
            'font-size': '20'
        })[_0x46e72b(0x177)](_0x46e72b(0x17b))[_0x46e72b(0x11d)]({
            'opacity': _0x46e72b(0x175),
            'border-width': '1',
            'font-size': '8'
        })[_0x46e72b(0x177)](_0x46e72b(0x1d9))['css']({
            'width': _0x46e72b(0x132),
            'label': _0x46e72b(0xe4),
            'text-rotation': _0x46e72b(0xe2),
            'text-margin-y': '-10px',
            'font-size': '10'
        })['selector'](_0x46e72b(0x16f))[_0x46e72b(0x11d)]({
            'opacity': '0.2',
            'width': _0x46e72b(0x175)
        })['selector'](_0x46e72b(0xdd))[_0x46e72b(0x11d)]({
            'label': _0x46e72b(0x108)
        }),
        'elements': {
            'nodes': _0x23218f,
            'edges': _0x4f6cec
        },
        'layout': graphLayout
    }), cyGraph['on'](_0x46e72b(0x181), _0x46e72b(0x164), function (_0x54a27f) {
        var _0x14efcf = _0x46e72b,
            _0x28ba81 = _0x54a27f['target'];
        cyGraph['elements']()[_0x14efcf(0xcb)](_0x28ba81[_0x14efcf(0x195)]()[_0x14efcf(0x17c)](_0x28ba81['incomers']()))['not'](_0x28ba81)['addClass'](_0x14efcf(0x1a4)), _0x28ba81[_0x14efcf(0xc9)](_0x14efcf(0x156))[_0x14efcf(0x195)]()['addClass'](_0x14efcf(0x156)), _0x28ba81[_0x14efcf(0xc9)](_0x14efcf(0x156))['incomers']()[_0x14efcf(0xc9)](_0x14efcf(0x156));
        var _0x5510ea = _0x28ba81[0x0][_0x14efcf(0x16b)]['data'][_0x14efcf(0x125)];
        _0x28ba81[_0x14efcf(0x186)]()[_0x14efcf(0x106)]({
            'line-color': _0x5510ea,
            'target-arrow-color': _0x5510ea,
            'color': _0x5510ea
        });
    }), cyGraph['on']('click', function (_0x488755) {
        var _0x47ed44 = _0x46e72b;
        cyGraph[_0x47ed44(0x1b3)]()['removeClass'](_0x47ed44(0x1a4)), cyGraph[_0x47ed44(0x1b3)]()['removeClass']('highlight'), cyGraph['elements']()[_0x47ed44(0x106)]({
            'line-color': '#aeaeae',
            'target-arrow-color': _0x47ed44(0x158)
        });
    }), cyGraph['on'](_0x46e72b(0x13b), function (_0x18a2f7) {
        var _0x70d2e7 = _0x46e72b;
        if (cyGraph[_0x70d2e7(0x13b)]() > 0x1) cyGraph[_0x70d2e7(0x1b3)]()[_0x70d2e7(0x1a2)]()[_0x70d2e7(0xc9)](_0x70d2e7(0x138));
        else {
            if (cyGraph[_0x70d2e7(0x13b)]() < 0x1) cyGraph[_0x70d2e7(0x1b3)]()[_0x70d2e7(0x1a2)]()[_0x70d2e7(0xdf)](_0x70d2e7(0x138));
        }
    }), cyGraph[_0x46e72b(0x19f)]({
        'menuRadius': 0x4b,
        'indicatorSize': 0x0,
        'selector': _0x46e72b(0x105),
        'commands': [{
            'content': _0x46e72b(0x1e0),
            'select': function (_0x2405f7) {
                var _0x3efd2f = _0x46e72b;
                opendashboarsuperset(_0x2405f7['id'](), _0x2405f7[_0x3efd2f(0x1d4)](_0x3efd2f(0x117)));
            }
        }, {
            'content': '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-downtime\x20text-white\x22></i></span>',
            'select': function (_0x769b37) { }
        }, {
            'content': _0x46e72b(0x1d8),
            'select': function (_0x3bab10) {
                var _0x5d6a92 = _0x46e72b;
                openNagiosGraph(_0x3bab10['id'](), _0x3bab10[_0x5d6a92(0x1d4)](_0x5d6a92(0x1bf)));
            }
        }, {
            'content': _0x46e72b(0x1b4),
            'select': function (_0x2b9a3d) {
                openNav(_0x2b9a3d['id'](), entitySelectedsite);
            }
        }]
    }), cyGraph[_0x46e72b(0x19f)]({
        'selector': _0x46e72b(0x109),
        'commands': [{
            'content': _0x46e72b(0x1e0),
            'enabled': ![]
        }, {
            'content': _0x46e72b(0x149),
            'select': function (_0x5b5238) { }
        }, {
            'content': _0x46e72b(0x1d8),
            'select': function (_0xdfbbc) {
                var _0x341842 = _0x46e72b;
                openNagiosGraph(_0xdfbbc['id'](), _0xdfbbc[_0x341842(0x1d4)]('fullname'));
            }
        }, {
            'content': _0x46e72b(0x1b4),
            'select': function (_0x15948a) {
                openNav(_0x15948a['id'](), entitySelectedsite);
            }
        }]
    });
}

function setAnimChart(_0x178c03) {
    var _0x7bb597 = _0xb0a8f5;
    if (_0x178c03 != undefined) {
        var _0x593ef6 = 0xfa,
            _0xc70c = 0x258;
        cyGraph[_0x7bb597(0x1a2)](_0x7bb597(0x11e) + _0x178c03 + ']')['animate']({
            'style': {
                'opacity': 0.8
            }
        }, {
            'duration': _0xc70c
        })[_0x7bb597(0x123)](_0x593ef6)[_0x7bb597(0x1b9)]({
            'style': {
                'opacity': 0.2
            }
        }, {
            'duration': _0xc70c
        })[_0x7bb597(0x123)](_0x593ef6)[_0x7bb597(0x1b9)]({
            'style': {
                'opacity': 0.2
            }
        }, {
            'duration': _0xc70c
        })[_0x7bb597(0x123)](_0x593ef6)[_0x7bb597(0x1b9)]({
            'style': {
                'opacity': 0.2
            }
        }, {
            'duration': _0xc70c
        })[_0x7bb597(0x123)](_0x593ef6)[_0x7bb597(0x1b9)]({
            'style': {
                'opacity': 0.2
            }
        }, {
            'duration': _0xc70c
        })[_0x7bb597(0x123)](_0x593ef6)[_0x7bb597(0x1b9)]({
            'style': {
                'opacity': 0.2
            }
        }, {
            'duration': _0xc70c
        })[_0x7bb597(0x123)](_0x593ef6)[_0x7bb597(0x1b9)]({
            'style': {
                'opacity': 0x1
            }
        }, {
            'duration': _0xc70c
        });
    }
}

function delclose(_0x14db26) {
    isToBeConnect = !{}[!![]], delobj[_0x14db26]['disconnect']();
}

function delconnect(_0x153fbc) {
    var _0x1eb72e = _0xb0a8f5;
    isToBeConnect = {}[!![]], makeWebSocConnectionChart(delobj[_0x153fbc]['ws'][_0x1eb72e(0x168)], delobj[_0x153fbc]['id'], 0x0, delobj[_0x153fbc]['criticalNodeCount']);
}
var esitesname = _0xb0a8f5(0x134),
    ewsocname = 'entity-pipe',
    deltahtml = _0xb0a8f5(0x17f) + ewsocname + '\x27,\x27' + esitesname + _0xb0a8f5(0xea);

function _0x5199() {
    var _0xddcbc7 = ['edge.semitransp', 'connectionTries', 'html', '#ff3d57', 'all', 'cover', '0.5', 'userbased', 'selector', 'online', 'origin', '-indicator', 'node.semitransp', 'union', 'active', 'UNREACHABLE', '<div\x20class=\x22indicator\x22\x20id=\x22entity-pipe\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22mdi\x20mdi-check-network-outline\x20tooltip\x22\x20id=\x22delta-icon-chats\x22\x20style=\x22font-size:27px\x22\x20onclick=\x22displaytooltip(\x27', '#e99123', 'tap', '7lFZdom', '#node-view\x20#', '<td\x20>', '60190qndwZN', 'connectedEdges', 'update', 'location', '</table>', 'GET', '\x27)\x22\x20></i\x20></p>', 'onerror', 'Dashboard', '_li\x22\x20style=\x22position:\x20relative;\x22><span\x20class=\x22indicator-circle\x22\x20style=\x22background:\x20#ff3d57;\x20z-index:\x20100;position:\x20absolute;top:\x20-4px;right:\x206px;\x22\x20id=\x22', '#pills-unknown-tab', 'subscribe', '#total-nodes', 'trim', 'onclick', '<span\x20class=\x22bold-text\x20pending-text\x22>Pending(', 'outgoers', 'tag', '110360WLqAHs', 'race', 'mdi\x20mdi-close-network-outline\x20tooltip', '<th>Last\x20Update</th>', '../dashboard/getneo4jnodes', 'isSuccess', 'WebSocket', '7384586OpMedY', 'cxtmenu', 'done', 'display', 'nodes', '#node-view\x20#site-list\x20li\x20a.active', 'semitransp', '<td\x20><span\x20class=\x27white-text\x20py-1\x20px-2\x20size12\x20radius-8\x20status\x27\x20style=\x27background:', 'PENDING', '<span\x20class=\x22bold-text\x20warning\x22>Warning(', 'code', 'client', 'monitor_status', '#node-view\x20#site-list\x20#', '3414FHxGrS', '<tr>', 'log', '24fVuhyo', 'viewport', 'timeEnd', 'POST', 'elements', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-help\x20text-white\x22></i></span>', '#pills-warning-tab', '\x22\x20\x20id=\x22', 'last-conn\x22></p>', '</tr>', 'animate', '_li\x20.nav-link', '#pills-ok-tab', '</div>', 'append', '<th>Message</th>', 'fullname', 'forEach', '<th>Status</th>', '<p\x20class=\x22col-3\x22\x20id=\x22displays-icon', 'none', '<table>', 'addEventListener', 'service', 'visibility', 'containerpie-hosts', 'FALSE', '9DgXsHD', '<td\x20style=\x27border-left:\x201px\x20solid\x20#eee;\x27\x20class=\x27service\x27>', 'Entity\x20server\x20not\x20reachable.', '2072zmmYEn', 'json', 'responseData', 'ServiceMS', '5xDyjDr', '#tag', 'websocket_url', 'data', '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22>', 'success', 'toString', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-health\x20text-white\x22></i></span>', 'edge.highlight', 'green', 'hostms', 'getMinutes', 'last-conn', 'edge', 'node-detail', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-analysis\x20text-white\x22></i></span>', 'UNKNOWN', 'cose', '\x20<p\x20class=\x22tooltiptexting\x22\x20id=\x22', 'TERMINATED', '/exchange/delta_update', 'then', 'RUNNING', 'Pending\x20(', 'isWSConnected', 'each', 'time', 'response', 'site_data', '#16d39a', 'delta-icon-chats', '#displays-icon', '<td\x20class\x20=\x20\x27ip\x27\x20rowspan=\x27', 'Trying(', 'entries', '-indicator\x22></span>\x20<a\x20class=\x22nav-link\x20green\x20bold-text\x22\x20data-id=\x22', 'text', 'sitename', 'data(image)', 'Please\x20enter\x20at\x20least\x203\x20characters', 'addClass', '1-getnewchart\x20', 'difference', '7329RkfOAD', 'node[id\x20=\x20', 'Error\x20during\x20fetch:', 'includes', 'onload', '_li\x20', 'visible', 'class', 'random', 'length', 'toLocaleString', 'getDate', 'reduce', '-indicator\x22></span>\x20<a\x20class=\x22nav-link\x20red\x20bold-text\x22\x20data-id=\x22', 'substring', '\x27)\x22>', 'values', 'node.hasLabel', '13656030WenOiy', 'removeClass', 'error', '../dashboard/getnodespecificdetails', 'autorotate', '[fullname=\x27', 'data(label)', '</span></td>', 'criticalNodeCount', 'open', '#node-view\x20#site-list', '3-getoverallJSON\x20for\x20--->', '\x27)\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22tooltiptext\x22\x20id=\x22sitesname\x22\x20style=\x22overflow-y:scroll\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p><b>Queue\x20Name\x20:</b>\x20delta_update</p>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20id=\x22last-conn\x22></p></span>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</i>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>', ')</span>', 'search', 'application/json', '<tbody\x20class=\x22row\x22>', '<span\x20class=\x22bold-text\x20red\x22>Critical(', 'stylesheet', '\x27)\x22\x20></i\x20><i\x20class=\x22mdi\x20mdi-close-box\x22\x20style=\x22color:#ff3d57;\x22\x20onclick=\x22iconclose(\x27', '_li', 'keys', 'responseType', 'WARNING', '<td\x20class=\x22col-8\x20details_td\x22\x20style=\x22width:\x20150px;\x22>', 'host', 'connect', 'status-conn', 'block', 'getMonth', '#node-name', 'getoverallchartdetails', 'Critical\x20(', '\x22\x20id=\x22', 'status-conn\x22\x20></td>', 'attr', 'title', 'data(color)', 'status', 'node[dashboardenabled=\x22true\x22]', 'style', '<td\x20class=\x22col-4\x20details_ts\x22\x20id=\x22e_', 'data(text)', 'node[dashboardenabled=\x22false\x22]', 'nodeCount', '#delta-html', 'val', 'node-view', 'DATA--->', 'name', '<div\x20class=\x22row\x20tooltiping\x22>', '/dashboard/getneo4jnodes', 'Service', 'No\x20Data', 'set', 'parse', '<span\x20class=\x22bold-text\x20unknown\x22>Unknown(', 'dashboard_url', '</tbody>', '#node-view\x20#nodatamessage', '668kUQajv', 'vee', '#node-view\x20#site-list\x20li\x20a', 'css', '[id*=', 'map', '#node-detail', 'split', 'HostMS', 'delay', 'filter', 'color', '_li\x20a', 'Your\x20browser\x20does\x20not\x20support\x20WebSockets.\x20Updates\x20will\x20not\x20work\x20properly.', '#node-view\x20#entity-nodata', 'services', 'WAITING', '#vis', 'send', 'red', 'hidden', 'Nodes\x20(', 'mdi\x20mdi-check-network-outline\x20tooltip', 'failure', '1.5', 'DOWN', 'sitesname', 'push', '4093278ObWlwu', '/entity/', 'hasLabel', 'getElementById', 'entity-pipe', 'zoom', '#node-view\x20#entity-search', '#table-data', 'getSeconds', '\x22\x20data-toggle=\x22tab\x22\x20onclick=\x22onEntitySiteTabchange(\x27', 'True(0)', 'background', 'Warning\x20(', 'data(size)', 'true', 'CRITICAL', '</a></li>', '#pills-pending-tab', 'toUpperCase', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-downtime\x20text-white\x22></i></span>', 'DELETED', 'startsWith', 'innerText', '2-requestdata\x20for\x20--->', '<span\x20class=\x22bold-text\x20green\x22>Ok(', 'TRUE', 'getHours', 'layer', 'linkedeye', 'stringify', 'className', '#node-view\x20#vis', 'highlight', '534mSHhNE', '#aeaeae', '<td\x20class\x20=\x20\x27ip\x27>\x20</td>', 'id_', 'dclient', 'vis', '\x22\x20style=\x22display:none;margin-top:\x2013px;\x22><i\x20class=\x22mdi\x20mdi-checkbox-marked\x22\x20style=\x22color:#16d39a;\x22\x20onclick=\x22iconconnect(\x27', '#pills-critical-tab', 'catch', '\x204-findCountChart', 'Lastconnect\x20:\x20', 'Host', '#entity-nodata\x20#nodatamessage', 'node', '<li\x20class=\x22nav-item\x20failure\x22\x20id=\x22', '</thead>', 'True', 'url', 'empty', 'site', '_private', '</td>', 'ready', '/lesites/getallsitenames'];
    _0x5199 = function () {
        return _0xddcbc7;
    };
    return _0x5199();
}
$(_0xb0a8f5(0x10b))[_0xb0a8f5(0x169)](), $(_0xb0a8f5(0x10b))[_0xb0a8f5(0x1bd)](deltahtml);
var alldeltatrue = {},
    sitenumber = 0x0;

function makeWebSocConnectionChart(_0x1b8bad, _0x50469d, _0x5df24c, _0x2d855a, _0x2f2c97) {
    var _0x3f858e = _0xb0a8f5,
        _0x440c7c = _0x3f858e(0x15b) + _0x2f2c97;
    try {
        if (window[_0x3f858e(0x19d)]) {
            var _0x283dab = _0x3f858e(0x1e5);
            _0x440c7c = Stomp[_0x3f858e(0x1a9)](_0x1b8bad), _0x440c7c['id'] = _0x50469d, _0x440c7c[_0x3f858e(0x170)] = _0x5df24c, _0x440c7c[_0x3f858e(0xe6)] = _0x2d855a, delobj[_0x50469d] = _0x440c7c;
            if (document['getElementById']('e_' + _0x50469d) == null) {
                var _0x3e9312 = '';
                _0x3e9312 += _0x3f858e(0x110), _0x3e9312 += _0x3f858e(0x1c4), _0x3e9312 += '<thead></thead>', _0x3e9312 += _0x3f858e(0xee), _0x3e9312 += '<tr\x20class=\x22col-12\x22>', _0x3e9312 += _0x3f858e(0xf6) + _0x50469d + '</td>', _0x3e9312 += _0x3f858e(0x107) + _0x50469d + _0x3f858e(0x100), _0x3e9312 += _0x3f858e(0x1b8), _0x3e9312 += _0x3f858e(0x118), _0x3e9312 += _0x3f858e(0x189), _0x3e9312 += _0x3f858e(0x1e3) + _0x50469d + _0x3f858e(0x1b7), _0x3e9312 += _0x3f858e(0x1c2) + _0x50469d + _0x3f858e(0x15d) + _0x50469d + _0x3f858e(0xf1) + _0x50469d + _0x3f858e(0x18b), _0x3e9312 += _0x3f858e(0x1bc), $('#sitesname')[_0x3f858e(0x1bd)](_0x3e9312), alldeltatrue[_0x50469d] = 0x0, sitenumber++;
            }
            var _0x4e9aa4 = function () {
                var _0x4f1fad = _0x3f858e;
                wsConnected = !![], isToBeConnect = {}[!![]];
                var _0x139f51 = sitesData[_0x4f1fad(0x124)](_0x4ed87a => _0x4ed87a[_0x4f1fad(0x16a)] === _0x440c7c['id'])[0x0];
                _0x139f51[_0x4f1fad(0x1e9)] = !![], document[_0x4f1fad(0x139)]('e_' + _0x50469d + _0x4f1fad(0xf9))[_0x4f1fad(0x14c)] = _0x4f1fad(0x140), document['getElementById']('e_' + _0x50469d + _0x4f1fad(0xf9))[_0x4f1fad(0x106)][_0x4f1fad(0x125)] = _0x4f1fad(0xbe), document[_0x4f1fad(0x139)](_0x4f1fad(0xbf))[_0x4f1fad(0x154)] = _0x4f1fad(0x130), $(_0x4f1fad(0xc0) + _0x50469d)[_0x4f1fad(0x11d)](_0x4f1fad(0x1a1), _0x4f1fad(0x1c3)), alldeltatrue[_0x50469d] = 0x1, document[_0x4f1fad(0x139)](_0x50469d + _0x4f1fad(0x1dd))[_0x4f1fad(0x14c)] = _0x4f1fad(0x161) + mdeltalastreconnect;
                var _0x475460 = Object[_0x4f1fad(0xdc)](alldeltatrue),
                    _0x466375 = _0x475460['reduce'](function (_0x1d1878, _0x438d6f) {
                        return _0x1d1878 + _0x438d6f;
                    });
                sitenum == _0x466375 ? document[_0x4f1fad(0x139)](_0x4f1fad(0x13a))['style'][_0x4f1fad(0x125)] = '#16d39a' : document[_0x4f1fad(0x139)](_0x4f1fad(0x13a))[_0x4f1fad(0x106)]['color'] = _0x4f1fad(0x172), _0x440c7c[_0x4f1fad(0x190)](_0x283dab, function (_0x19a1c3) {
                    var _0x586ab6 = _0x4f1fad,
                        _0x1031af = JSON[_0x586ab6(0x115)](_0x19a1c3['body']),
                        _0x284615 = _0x1031af[_0x586ab6(0x1aa)];
                    _0x284615 === 'CRITICAL' || _0x284615 === 'DOWN' || _0x284615 === 'UNREACHABLE' || _0x284615 === _0x586ab6(0x1c9) || _0x284615 === _0x586ab6(0x12a) ? _0x440c7c[_0x586ab6(0xe6)]++ : _0x440c7c[_0x586ab6(0xe6)]--;
                    if (_0x440c7c['id'] == entitySelectedsite) {
                        var _0x4f517c = titleToId[_0x1031af[_0x586ab6(0x102)]];
                        if (_0x4f517c !== undefined) {
                            var _0x27a276 = getColorForNodeState(_0x1031af['monitor_status']);
                            if (cyGraph['nodes']('[fullname=\x27' + _0x1031af[_0x586ab6(0x102)] + '\x27]')[0x0]) cyGraph[_0x586ab6(0x1a2)](_0x586ab6(0xe3) + _0x1031af[_0x586ab6(0x102)] + '\x27]')[0x0]['_private'][_0x586ab6(0x1d4)][_0x586ab6(0x125)] = _0x27a276;
                            cyGraph[_0x586ab6(0x106)]()[_0x586ab6(0x177)](_0x586ab6(0xcd) + _0x4f517c + ']')[_0x586ab6(0x106)]({
                                'background-color': _0x27a276,
                                'border-color': _0x27a276
                            })[_0x586ab6(0x187)](), setAnimChart(_0x4f517c);
                        }
                        nodeSpecificDetailsChart(_0x4f517c, _0x1031af[_0x586ab6(0x102)]);
                    }
                    if (_0x1031af[_0x586ab6(0xf7)] !== undefined) {
                        var _0x205206 = {};
                        _0x205206[_0x586ab6(0xf7)] = nodeStatus(Object[_0x586ab6(0xf3)](_0x1031af[_0x586ab6(0xf7)])[_0x586ab6(0x11f)](_0x1f060f => [_0x1f060f, Number(_0x1031af[_0x586ab6(0xf7)][_0x1f060f])])), _0x205206['service'] = nodeStatus(Object[_0x586ab6(0xf3)](_0x1031af[_0x586ab6(0x1c6)])['map'](_0x678b13 => [_0x678b13, Number(_0x1031af[_0x586ab6(0x1c6)][_0x678b13])])), _0x139f51[_0x586ab6(0x10a)] = _0x205206;
                    }
                    changeSiteStatusChart(_0x440c7c['id'], _0x440c7c[_0x586ab6(0xe6)]);
                }), $(_0x4f1fad(0x183) + _0x440c7c['id'] + _0x4f1fad(0x17a))['css'](_0x4f1fad(0x141), _0x4f1fad(0xbe));
            },
                _0x4469e1 = function (_0x3bab07) {
                    var _0x33115e = _0x3f858e;
                    $(_0x33115e(0x183) + _0x440c7c['id'] + _0x33115e(0x17a))['css']('background', '#ff3d57'), isToBeConnect = !{}[!![]];
                    var _0x7cad6e = sitesData[_0x33115e(0x124)](_0x4db083 => _0x4db083[_0x33115e(0x16a)] === _0x440c7c['id'])[0x0];
                    _0x440c7c[_0x33115e(0x170)]++;
                    const _0x57b848 = new Date(),
                        _0x1b4fe5 = new Date(_0x57b848);
                    var _0x3ad446 = _0x1b4fe5['getMonth']() + 0x1,
                        _0x2fd8f9 = _0x1b4fe5[_0x33115e(0xd7)](),
                        _0x5251ef = _0x1b4fe5['getFullYear'](),
                        _0x4a4a79 = _0x1b4fe5[_0x33115e(0x150)](),
                        _0x2724c4 = _0x1b4fe5[_0x33115e(0x1dc)](),
                        _0x3585a0 = _0x1b4fe5[_0x33115e(0x13e)](),
                        _0x5b4e95 = _0x2fd8f9 + '/' + _0x3ad446 + '/' + _0x5251ef + '\x20' + _0x4a4a79 + ':' + _0x2724c4 + ':' + _0x3585a0;
                    mdeltalastreconnect = _0x5b4e95[_0x33115e(0xd6)](), document[_0x33115e(0x139)]('e_' + _0x50469d + 'status-conn')[_0x33115e(0x14c)] = 'False(' + _0x440c7c[_0x33115e(0x170)] + ')', document[_0x33115e(0x139)]('e_' + _0x50469d + 'status-conn')[_0x33115e(0x106)][_0x33115e(0x125)] = '#ff3d57', document[_0x33115e(0x139)](_0x33115e(0xbf))[_0x33115e(0x154)] = _0x33115e(0x199), $(_0x33115e(0xc0) + _0x50469d)[_0x33115e(0x11d)](_0x33115e(0x1a1), _0x33115e(0xfa)), alldeltatrue[_0x50469d] = 0x0, document['getElementById'](_0x50469d + _0x33115e(0x1dd))[_0x33115e(0x14c)] = _0x33115e(0x161) + mdeltalastreconnect;
                    var _0x478ad9 = Object[_0x33115e(0xdc)](alldeltatrue),
                        _0x67dbd9 = _0x478ad9[_0x33115e(0xd8)](function (_0xad26b3, _0x253279) {
                            return _0xad26b3 + _0x253279;
                        });
                    sitenum == _0x67dbd9 ? document[_0x33115e(0x139)]('entity-pipe')[_0x33115e(0x106)]['color'] = '#16d39a' : document['getElementById'](_0x33115e(0x13a))[_0x33115e(0x106)][_0x33115e(0x125)] = '#ff3d57';
                    _0x7cad6e[_0x33115e(0x1e9)] = ![];
                    if (networkStatus === _0x33115e(0x178)) {
                        if (_0x440c7c[_0x33115e(0x170)] >= 0xa) isToBeConnect = !{}[!![]];
                        else {
                            const _0x48e4ce = new Date(),
                                _0xb9f428 = new Date(_0x48e4ce);
                            var _0x3ad446 = _0xb9f428[_0x33115e(0xfb)]() + 0x1,
                                _0x2fd8f9 = _0xb9f428[_0x33115e(0xd7)](),
                                _0x5251ef = _0xb9f428['getFullYear'](),
                                _0x4a4a79 = _0xb9f428['getHours'](),
                                _0x2724c4 = _0xb9f428[_0x33115e(0x1dc)](),
                                _0x3585a0 = _0xb9f428[_0x33115e(0x13e)](),
                                _0x5b4e95 = _0x2fd8f9 + '/' + _0x3ad446 + '/' + _0x5251ef + '\x20' + _0x4a4a79 + ':' + _0x2724c4 + ':' + _0x3585a0;
                            mdeltalastreconnect = _0x5b4e95[_0x33115e(0xd6)](), document[_0x33115e(0x139)]('e_' + _0x50469d + _0x33115e(0xf9))[_0x33115e(0x14c)] = _0x33115e(0xc2) + _0x440c7c['connectionTries'] + ')', document[_0x33115e(0x139)]('e_' + _0x50469d + _0x33115e(0xf9))[_0x33115e(0x106)][_0x33115e(0x125)] = _0x33115e(0x180), document[_0x33115e(0x139)](_0x33115e(0xbf))[_0x33115e(0x154)] = 'mdi\x20mdi-help-network-outline\x20tooltip', alldeltatrue[_0x50469d] = 0x0, document['getElementById'](_0x50469d + _0x33115e(0x1dd))[_0x33115e(0x14c)] = _0x33115e(0x161) + mdeltalastreconnect, $(_0x33115e(0xc0) + _0x50469d)[_0x33115e(0x11d)](_0x33115e(0x1a1), _0x33115e(0xfa));
                            var _0x478ad9 = Object[_0x33115e(0xdc)](alldeltatrue),
                                _0x67dbd9 = _0x478ad9[_0x33115e(0xd8)](function (_0x51eae, _0x23b06e) {
                                    return _0x51eae + _0x23b06e;
                                });
                            sitenum == _0x67dbd9 ? document[_0x33115e(0x139)](_0x33115e(0x13a))[_0x33115e(0x106)][_0x33115e(0x125)] = '#16d39a' : document[_0x33115e(0x139)]('entity-pipe')[_0x33115e(0x106)][_0x33115e(0x125)] = '#e99123', (isToBeConnect = {}[!![]]) && makeWebSocConnectionChart(_0x440c7c['ws'][_0x33115e(0x168)], _0x440c7c['id'], _0x440c7c['connectionTries'], _0x440c7c[_0x33115e(0xe6)]);
                        }
                    }
                };
            _0x440c7c[_0x3f858e(0xf8)](_0x3f858e(0x152), _0x3f858e(0x152), _0x4e9aa4, _0x4469e1, '/');
        } else alert(_0x3f858e(0x127));
    } catch (_0x2d6425) {
        return;
    }
}

function nodeSpecificDetailsChart(_0x43781e, _0x310662) {
    var _0x11a966 = _0xb0a8f5;
    $(_0x11a966(0x120))[_0x11a966(0x11d)](_0x11a966(0x1a1)) != _0x11a966(0x1c3) && (nodeTitle = $(_0x11a966(0xfc))[_0x11a966(0xc5)](), _0x43781e != undefined && nodeTitle == _0x310662 && (showLoader(_0x11a966(0x1df)), requestDataFromServer(_0x11a966(0xe1), {
        'nodeid': _0x43781e,
        'mode': '',
        'csrfmiddlewaretoken': csfr_token,
        'selectedSite': entitySelectedsite
    }, type = _0x11a966(0x1b2))[_0x11a966(0x1a0)](nodespecificdetialsresponse)));
}

function changeSiteStatusChart(_0x3309d1, _0x43bed4) {
    var _0x5b5960 = _0xb0a8f5,
        _0x39ad27 = sitesData[_0x5b5960(0x124)](_0x549eb1 => _0x549eb1['site'] === _0x3309d1)[0x0];
    _0x39ad27 && (_0x39ad27[_0x5b5960(0xe6)] = _0x43bed4, _0x43bed4 == 0x0 ? (_0x39ad27[_0x5b5960(0x19c)] = !![], $(_0x5b5960(0x1ab) + _0x3309d1 + _0x5b5960(0xf2))['removeClass'](_0x5b5960(0x131))[_0x5b5960(0xc9)]('success'), $('#node-view\x20#site-list\x20#' + _0x3309d1 + '_li\x20a')[_0x5b5960(0xdf)](_0x5b5960(0x12d))[_0x5b5960(0xc9)](_0x5b5960(0x1da))) : (_0x39ad27[_0x5b5960(0x19c)] = ![], $(_0x5b5960(0x1ab) + _0x3309d1 + '_li')['removeClass'](_0x5b5960(0x1d6))[_0x5b5960(0xc9)](_0x5b5960(0x131)), $(_0x5b5960(0x1ab) + _0x3309d1 + _0x5b5960(0x126))[_0x5b5960(0xdf)](_0x5b5960(0x1da))[_0x5b5960(0xc9)](_0x5b5960(0x12d))));
}

function reloadgraph(_0x184e4d) { }

function increasedecreasezoom(_0x5b6ff4) {
    var _0x998733 = _0xb0a8f5;
    if (_0x5b6ff4 == 0x1) zoom++;
    else zoom--;
    cyGraph[_0x998733(0x1b0)]({
        'zoom': zoom
    });
}

function entity() {
    var _0x3466e4 = _0xb0a8f5;
    window[_0x3466e4(0x188)]['href'] = window[_0x3466e4(0x188)][_0x3466e4(0x179)] + _0x3466e4(0x137);
}

function onEntitySiteTabchange(_0x1a44d6) {
    var _0x213f61 = _0xb0a8f5;
    const _0x59f5b6 = Math[_0x213f61(0xd4)]()[_0x213f61(0x1d7)](0x24)[_0x213f61(0xda)](0x2, 0x5);
    startEntityLoader(), entitySelectedsite = _0x1a44d6, $(_0x213f61(0x1a3))[_0x213f61(0xdf)]('active'), $(_0x213f61(0x1ab) + _0x1a44d6 + _0x213f61(0xd1) + 'a')['addClass'](_0x213f61(0x17d));
    var _0x2327fc = sitesData[_0x213f61(0x124)](_0xb4497e => _0xb4497e[_0x213f61(0x16a)] === _0x1a44d6)[0x0],
        _0x5a9284 = _0x2327fc[_0x213f61(0xe6)];
    _0x2327fc[_0x213f61(0x1e9)] == ![] && (_0x2327fc = siteResponse['filter'](_0x1d223f => _0x1d223f[_0x213f61(0xc6)] === _0x1a44d6)[0x0], makeWebSocConnectionChart(_0x2327fc[_0x213f61(0x1d3)], _0x1a44d6, 0x0, _0x5a9284, _0x59f5b6)), $(_0x213f61(0x12b))['empty'](), requestDataFromServer(_0x213f61(0x19b), {
        'sitename': _0x1a44d6
    }, type = _0x213f61(0x18a))[_0x213f61(0x1a0)](function (_0x3598a3) {
        var _0x6bfc16 = _0x213f61;
        stopEntityLoader(), displayNodesChart(_0x3598a3[_0x6bfc16(0x1cf)][0x0]['site_data'], _0x3598a3[_0x6bfc16(0x1cf)][0x0][_0x6bfc16(0x1a8)]);
    }), onTicketSiteTabchange(_0x1a44d6, _0x2327fc);
}

function _0x3725(_0x474834, _0x2de39e) {
    var _0x5199bb = _0x5199();
    return _0x3725 = function (_0x3725f4, _0x54f620) {
        _0x3725f4 = _0x3725f4 - 0xbd;
        var _0x44d07b = _0x5199bb[_0x3725f4];
        return _0x44d07b;
    }, _0x3725(_0x474834, _0x2de39e);
}

function startEntityLoader() {
    var _0xd156da = _0xb0a8f5;
    $(_0xd156da(0x128))[_0xd156da(0x11d)](_0xd156da(0x1a1), 'none'), $(_0xd156da(0x155))[_0xd156da(0x11d)](_0xd156da(0x1a1), _0xd156da(0x1c3)), showLoader(_0xd156da(0x10d));
}

function stopEntityLoader() {
    var _0x32aec8 = _0xb0a8f5;
    $(_0x32aec8(0x128))['css']('display', _0x32aec8(0xfa)), $(_0x32aec8(0x155))[_0x32aec8(0x11d)](_0x32aec8(0x1a1), _0x32aec8(0xfa)), stopLoader(_0x32aec8(0x10d));
}