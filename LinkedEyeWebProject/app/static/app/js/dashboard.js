var _0x4e5130 = _0x5157;
(function (_0x2db91e, _0x1e8855) {
    var _0x53c68c = _0x5157,
        _0x24b38b = _0x2db91e();
    while (!![]) {
        try {
            var _0x1fcf18 = -parseInt(_0x53c68c(0x28e)) / 0x1 + -parseInt(_0x53c68c(0x2d9)) / 0x2 * (-parseInt(_0x53c68c(0x2a5)) / 0x3) + parseInt(_0x53c68c(0x1e5)) / 0x4 + -parseInt(_0x53c68c(0x2f8)) / 0x5 + parseInt(_0x53c68c(0x2da)) / 0x6 * (-parseInt(_0x53c68c(0x269)) / 0x7) + parseInt(_0x53c68c(0x23f)) / 0x8 * (-parseInt(_0x53c68c(0x226)) / 0x9) + -parseInt(_0x53c68c(0x2b2)) / 0xa * (-parseInt(_0x53c68c(0x26d)) / 0xb);
            if (_0x1fcf18 === _0x1e8855) break;
            else _0x24b38b['push'](_0x24b38b['shift']());
        } catch (_0x1d1282) {
            _0x24b38b['push'](_0x24b38b['shift']());
        }
    }
}(_0x4010, 0xe2596));
var prometheusdata, firstrow = [{
    'label': _0x4e5130(0x243),
    'type': _0x4e5130(0x1ee)
}, {
    'label': _0x4e5130(0x266),
    'type': _0x4e5130(0x2a6)
}],
    hardwaretitle = 'Hardware',
    softwaretitle = _0x4e5130(0x23a),
    applicationtitle = _0x4e5130(0x29c),
    eodSitesData = [],
    adpSitesData = [],
    bodSitesData = [],
    selected_sitename = '',
    selected_leurl = '',
    selected_websocketurl = '',
    colors_called = 0x1;
$(document)[_0x4e5130(0x223)](function () {
    var _0x4424c9 = _0x4e5130;
    getallTicketSiteNames();
    let _0x5bf1db = sessionStorage['getItem'](_0x4424c9(0x2a8));
    _0x5bf1db != null && (document[_0x4424c9(0x21d)](_0x5bf1db)[_0x4424c9(0x2be)](), sessionStorage[_0x4424c9(0x24e)](_0x4424c9(0x2a8))), google[_0x4424c9(0x24c)][_0x4424c9(0x236)]('current', {
        'packages': [_0x4424c9(0x265)]
    });
});
var timeline, data, nodeid;
statuses = [];
var getLEDCOLOR = async function (_0x160299, _0x1c6fcb) {
    return await new Promise(function (_0x315f96, _0x44c01c) {
        var _0xdbf6e = _0x5157,
            _0x2bd873 = new XMLHttpRequest();
        _0x2bd873[_0xdbf6e(0x2a3)](_0xdbf6e(0x2bf), _0x160299, !![]), _0x2bd873[_0xdbf6e(0x20b)] = 'json', _0x2bd873[_0xdbf6e(0x250)] = 0x1388, _0x2bd873[_0xdbf6e(0x1e8)] = function () {
            var _0x411242 = _0x2bd873['status'];
            _0x411242 == 0xc8 ? _0x315f96(_0x2bd873['response']) : _0x44c01c(_0x411242);
        }, _0x2bd873[_0xdbf6e(0x2e1)] = () => {
            var _0xa1784f = _0xdbf6e;
            console[_0xa1784f(0x1ff)](_0xa1784f(0x260)), _0x44c01c({
                'site': _0x1c6fcb,
                'status': _0x2bd873['status'],
                'statusText': _0x2bd873['statusText']
            });
        }, _0x2bd873[_0xdbf6e(0x1eb)] = function () {
            var _0x3f39fe = _0xdbf6e;
            _0x44c01c({
                'site': _0x1c6fcb,
                'status': _0x2bd873[_0x3f39fe(0x213)],
                'statusText': _0x2bd873[_0x3f39fe(0x27b)]
            });
        }, _0x2bd873['send']();
    });
};

function colorSwitch(_0xb00d5) {
    var _0x1968c8 = _0x4e5130,
        _0x336ebf = '';
    switch (_0xb00d5) {
        case 0x0:
            _0x336ebf = '#ff3d57';
            break;
        case 0x1:
            _0x336ebf = _0x1968c8(0x286);
            break;
        case 0x2:
            _0x336ebf = _0x1968c8(0x20c);
            break;
        default:
            _0x336ebf = _0x1968c8(0x1f8);
    }
    return _0x336ebf;
}

function ledColors(_0x147648, _0x51ed51, _0xc0e472) {
    var _0x33ab71 = _0x4e5130;
    const _0x44b9f8 = new URL(_0x33ab71(0x2d0), _0x51ed51),
        _0x26c96e = new URLSearchParams();
    _0x26c96e[_0x33ab71(0x228)](_0x33ab71(0x234), _0x147648), _0x44b9f8[_0x33ab71(0x2a0)] = _0x26c96e[_0x33ab71(0x29f)]();
    var _0x14cd93 = 0x0,
        _0xe1ba1e = 0x0,
        _0x4af9c4 = 0x0,
        _0x1894ac = getLEDCOLOR(_0x44b9f8, _0x147648)[_0x33ab71(0x246)](function (_0x40fd47) {
            var _0x3aa882 = _0x33ab71;
            document[_0x3aa882(0x21d)](_0x3aa882(0x2f7))[_0x3aa882(0x241)]['color'] = colorSwitch(_0x40fd47[_0x3aa882(0x2a7)][_0x3aa882(0x22c)]), document[_0x3aa882(0x21d)](_0x3aa882(0x219))[_0x3aa882(0x241)][_0x3aa882(0x209)] = colorSwitch(_0x40fd47[_0x3aa882(0x2a7)]['eod']), document[_0x3aa882(0x21d)](_0x3aa882(0x1e9))[_0x3aa882(0x241)][_0x3aa882(0x209)] = colorSwitch(_0x40fd47[_0x3aa882(0x2a7)][_0x3aa882(0x212)]), document[_0x3aa882(0x21d)]('entityLED')[_0x3aa882(0x241)][_0x3aa882(0x209)] = colorSwitch(_0x40fd47[_0x3aa882(0x2a7)][_0x3aa882(0x252)]);
            var _0x10131a = _0x40fd47[_0x3aa882(0x2a7)][_0x3aa882(0x25d)][_0x3aa882(0x2a7)],
                _0x461df5 = {
                    'hardware': {
                        'CRITICAL': _0x10131a[_0x3aa882(0x2ea)][0x0],
                        'OK': _0x10131a[_0x3aa882(0x2ea)][0x2],
                        'WARNING': _0x10131a[_0x3aa882(0x2ea)][0x1],
                        'UNKNOWN': _0x10131a[_0x3aa882(0x2ea)][0x3]
                    },
                    'software': {
                        'CRITICAL': _0x10131a[_0x3aa882(0x28d)][0x0],
                        'OK': _0x10131a[_0x3aa882(0x28d)][0x2],
                        'WARNING': _0x10131a[_0x3aa882(0x28d)][0x1],
                        'UNKNOWN': _0x10131a['software'][0x3]
                    },
                    'application': {
                        'CRITICAL': _0x10131a[_0x3aa882(0x222)][0x0],
                        'OK': _0x10131a[_0x3aa882(0x222)][0x2],
                        'WARNING': _0x10131a['application'][0x1],
                        'UNKNOWN': _0x10131a['application'][0x3]
                    }
                },
                _0x2ce7bf = Object[_0x3aa882(0x200)](_0x461df5[_0x3aa882(0x2ea)]),
                _0x56b38c = _0x2ce7bf[_0x3aa882(0x29e)](function (_0x458d95, _0xb88079) {
                    return _0x458d95 + _0xb88079;
                }),
                _0x1515ed = Object[_0x3aa882(0x200)](_0x461df5[_0x3aa882(0x28d)]),
                _0x30ffa5 = _0x1515ed[_0x3aa882(0x29e)](function (_0x13e964, _0x46ba76) {
                    return _0x13e964 + _0x46ba76;
                }),
                _0x434acd = Object[_0x3aa882(0x200)](_0x461df5['application']),
                _0x219763 = _0x434acd[_0x3aa882(0x29e)](function (_0x2c8d14, _0x2c0784) {
                    return _0x2c8d14 + _0x2c0784;
                });
            _0x14cd93 = _0x56b38c, _0xe1ba1e = _0x30ffa5, _0x4af9c4 = _0x219763;
            _0x56b38c == 0x0 ? document[_0x3aa882(0x21d)](_0x3aa882(0x29a))[_0x3aa882(0x241)][_0x3aa882(0x28c)] = _0x3aa882(0x288) : document[_0x3aa882(0x21d)](_0x3aa882(0x29a))['style'][_0x3aa882(0x28c)] = _0x3aa882(0x22e);
            _0x30ffa5 == 0x0 ? document[_0x3aa882(0x21d)](_0x3aa882(0x245))[_0x3aa882(0x241)]['display'] = _0x3aa882(0x288) : document[_0x3aa882(0x21d)]('software-heading')[_0x3aa882(0x241)][_0x3aa882(0x28c)] = 'none';
            _0x219763 == 0x0 ? document[_0x3aa882(0x21d)]('application-heading')[_0x3aa882(0x241)][_0x3aa882(0x28c)] = _0x3aa882(0x288) : document[_0x3aa882(0x21d)](_0x3aa882(0x215))[_0x3aa882(0x241)][_0x3aa882(0x28c)] = 'none';
            fillHostServiceCount(_0x461df5);
            var _0x478293 = {};
            _0x478293[_0x3aa882(0x261)] = _0x147648;
            if (_0x40fd47[_0x3aa882(0x2a7)][_0x3aa882(0x1e4)]) _0x478293[_0x3aa882(0x262)] = ![];
            else _0x478293['isSuccess'] = !![];
            _0x478293['isWSConnected'] = ![], eodSitesData['push'](_0x478293);
            if (_0x40fd47[_0x3aa882(0x2a7)]['adp']) _0x478293[_0x3aa882(0x262)] = ![];
            else _0x478293[_0x3aa882(0x262)] = !![];
            adpSitesData['push'](_0x478293);
            if (_0x40fd47[_0x3aa882(0x2a7)][_0x3aa882(0x22c)]) _0x478293[_0x3aa882(0x262)] = ![];
            else _0x478293[_0x3aa882(0x262)] = !![];
            bodSitesData['push'](_0x478293), colors_called && (colors_called = 0x0, connectEodWebSocket(_0xc0e472, _0x147648, 0x0, Math[_0x3aa882(0x1fd)]()[_0x3aa882(0x29f)](0x24)[_0x3aa882(0x24d)](0x2, 0x5)), connectAdpWebSocket(_0xc0e472, _0x147648, 0x0, Math[_0x3aa882(0x1fd)]()[_0x3aa882(0x29f)](0x24)[_0x3aa882(0x24d)](0x2, 0x5)), connectWebSocket(_0xc0e472, _0x147648, 0x0, Math[_0x3aa882(0x1fd)]()[_0x3aa882(0x29f)](0x24)[_0x3aa882(0x24d)](0x2, 0x5)));
        })[_0x33ab71(0x25e)](function (_0x11afef) {
            var _0x323175 = _0x33ab71;
            console[_0x323175(0x1ff)](_0x323175(0x1fa) + _0x11afef[_0x323175(0x261)] + '\x20' + _0x11afef[_0x323175(0x27b)]), _0x14cd93 == 0x0 ? document[_0x323175(0x21d)]('hardware-heading')[_0x323175(0x241)][_0x323175(0x28c)] = _0x323175(0x1e3) : document[_0x323175(0x21d)](_0x323175(0x29a))[_0x323175(0x241)][_0x323175(0x28c)] = _0x323175(0x22e), _0xe1ba1e == 0x0 ? document[_0x323175(0x21d)](_0x323175(0x245))[_0x323175(0x241)][_0x323175(0x28c)] = _0x323175(0x1e3) : document['getElementById'](_0x323175(0x245))[_0x323175(0x241)][_0x323175(0x28c)] = _0x323175(0x22e), _0x4af9c4 == 0x0 ? document[_0x323175(0x21d)](_0x323175(0x215))[_0x323175(0x241)][_0x323175(0x28c)] = _0x323175(0x1e3) : document['getElementById'](_0x323175(0x215))[_0x323175(0x241)][_0x323175(0x28c)] = _0x323175(0x22e), stopLoader(_0x323175(0x216)), stopLoader('containerpie-softwares'), stopLoader(_0x323175(0x255));
        });
}

function sortObjectByKeys(_0x6f5561) {
    var _0x15ef30 = _0x4e5130;
    return Object[_0x15ef30(0x284)](_0x6f5561)[_0x15ef30(0x2c1)]()[_0x15ef30(0x29e)]((_0x1531b1, _0x53230f) => (_0x1531b1[_0x53230f] = _0x6f5561[_0x53230f], _0x1531b1), {});
}

function displayChart() { }
var pieServiceChart, pieHostChart, hostStatus = {
    'CRITICAL': 0x0,
    'WARNING': 0x0,
    'PENDING': 0x0,
    'UNKNOWN': 0x0,
    'OK': 0x0
},
    serviceStatus = {
        'CRITICAL': 0x0,
        'WARNING': 0x0,
        'PENDING': 0x0,
        'UNKNOWN': 0x0,
        'OK': 0x0
    };

function _0x4010() {
    var _0x2e0bde = ['GET', 'containerpie-applications', 'tickets-card', '<span\x20class=\x22bold-text\x20warning\x22>Warning(', 'info-query.json', 'getSeconds', ':Disk', 'pendingCount', 'append', 'chart', 'catch', '#analuticsurl', 'INSIDE\x20TIMEOUT', 'site', 'isSuccess', 'onclick', 'empty', 'corechart', 'count', 'length', ':temperature', '67207edTLDV', '</p>', '<span\x20class=\x27beat\x20p-0\x27>', 'switch-cpu-query.json', '11VxBVHc', 'nav-health', '#node-values', 'login-query.json', 'Service\x20Health', '#nodemonmessage', '#pills-ok-tab', 'nav-help', ':NIC', 'unknownCount', 'hostIp', '</span>', 'le_url', ':SW_Login', 'statusText', 'hide', 'expand', 'datetime', 'minute', 'switch-uptime-query.json', 'FALSE', 'fortigate', 'visualization', 'keys', ':SW_Disk', '#e59105', 'attr', 'block', 'Warning\x20(', 'switch-query.json', 'firewall-info-query.json', 'display', 'software', '1574606UcnLjo', 'Server', 'node-detail', 'monitor_status', 'location', '#nodename', ':SW_Uptime', 'dashboard-tickets', '../analytics/dashboard?jsonname=', 'server-load-query.json', '<h3\x20style=\x22background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%\x22>', 'UNREACHABLE', 'hardware-heading', 'okCount', 'Application', '#TicketsOverview\x20#print-error', 'reduce', 'toString', 'search', 'src', '<p>', 'open', '<span\x20class=\x22bold-text\x20red\x22>Critical(', '102183HsujLm', 'number', 'data', 'click-this-button-after-page-loads', 'criticalCount', 'show', 'layer', 'PENDING', 'forEach', '#total-service', 'product_model', 'service', '#pills-pending-tab', '34604150DqLcnh', '200', 'containerpie-softwares', 'includes', '#nodeipaddress', ':Info', 'val', 'nav-info', 'automation_isEnabled', 'temperature-query.json', 'checked', 'sw_memory-query.json', 'click', 'get', 'Count', 'sort', ':fan', 'smooth', 'icon', '#total-host', ':Uptime', 'DELETED', 'switch-memory-query.json', '/getfilecontent', 'code', 'clearChart', 'contact_email', '&amp;', '#node-keys', 'uptime-query.json', 'sitehealth/overall', 'No\x20Dashboard!!', 'power-supply-query.json', 'Nodes\x20(', 'name', 'yhyhyy', 'html', 'TERMINATED', '#nodelastupdated', '28tnuUlq', '588XGeZiL', 'replaceAll', '<span\x20class=\x22bold-text\x20pending-text\x22>Pending(', 'bod-eodstatus-expand', ':Power-Supply', 'RUNNING', 'memory-query.json', 'ontimeout', 'epoch', ':Memory', '\x22></span>', 'sw_disk-query.json', 'firewall-temperature-query.json', 'disk-query.json', '#total-nodes', 'each', 'hardware', 'host', '#series_chart_div\x20#loader\x20img', '#node-detail', '<span\x20class=\x22bold-text\x20unknown\x22>Unknown(', 'origin', 'swi', 'error', 'Pending\x20(', ':CPU', 'map', 'fan-query.json', 'Critical\x20(', 'bodLED', '2684535IccyKJ', '#pills-warning-tab', 'WARNING', 'flex', 'eod', '7123316HiiuoE', 'done', 'Last\x20update:-\x20[\x20', 'onload', 'adpLED', '#nagiosgraph', 'onerror', 'nodedetails', 'monitor_message', 'string', '<p\x20style=\x27margin-left:5%\x27>', 'setOnLoadCallback', 'function', 'cgi-bin/showgraph.cgi?period=day&amp;rrdopts=-w+200+-j&amp;', '<span\x20class=\x22bold-text\x20green\x22>Ok(', '</h3>', '#H-', ':SW_Memory', 'All\x20Tickets', '#ffffff', 'UNKNOWN(', 'Augh,\x20there\x20was\x20an\x20error!', 'title', 'colors', 'random', '#S-', 'log', 'values', 'firewall-cpu-query.json', '#pills-unknown-tab', 'clicksite', 'getHours', '<span>', 'DOWN', 'Tickets\x20of\x20the\x20Current\x20month', '#nodehasautomation', 'color', 'draw', 'responseType', '#16d39a', 'firewall-query.json', 'hasOwnProperty', ':battery', '#nagiosform', 'CRITICAL', 'adp', 'status', 'toUpperCase', 'application-heading', 'containerpie-hardwares', 'service=', 'UNKNOWN', 'eodLED', 'Ok\x20(', 'warningCount', 'firewall-memory-query.json', 'getElementById', 'POST', 'innerHTML', '/lesites/getallsitenames', 'Status', 'application', 'ready', 'TRUE', 'tab', '6039fajRRb', 'Unknown\x20(', 'set', 'firewall-uptime-query.json', '<span\x20class=\x27white-text\x20py-1\x20px-2\x20size12\x20radius-8\x27\x20style=\x27background:', ':SW_CPU', 'bod', 'Totoal\x20Server', 'none', '\x20error\x20occurred\x20while\x20getting\x20queries!', ')</span>', 'push', 'total_count', 'href', 'sitename', 'arrayToDataTable', 'load', '#nodestatus', '.nav-tabs\x20a[href=\x22#', 'host=', 'Software', 'sw_nic-query.json', '#nodeimage', 'OK(', 'Not\x20able\x20to\x20show\x20node\x20details', '20728PWfwMa', '#node-name', 'style', 'Critical(', 'type', 'parse', 'software-heading', 'then', 'last-update', 'second', 'WARNING(', 'getMinutes', 'Nics_list', 'charts', 'substring', 'removeItem', '#pills-critical-tab', 'timeout', '../dashboard/getnodespecificdetails', 'entity', 'hour'];
    _0x4010 = function () {
        return _0x2e0bde;
    };
    return _0x4010();
}

function fillHostServiceCount(_0x526c28) {
    var _0x1f96ad = _0x4e5130,
        _0x1ffb1f = Object(_0x526c28[_0x1f96ad(0x2ea)]),
        _0x141358 = [];
    _0x141358[_0x1f96ad(0x231)](firstrow);
    var _0x4812dd = [
        [_0x1f96ad(0x242) + _0x1ffb1f[_0x1f96ad(0x211)] + ')', _0x1ffb1f[_0x1f96ad(0x211)]],
        [_0x1f96ad(0x23d) + _0x1ffb1f['OK'] + ')', _0x1ffb1f['OK']],
        ['WARNING(' + _0x1ffb1f[_0x1f96ad(0x2fa)] + ')', _0x1ffb1f[_0x1f96ad(0x2fa)]],
        [_0x1f96ad(0x1f9) + _0x1ffb1f[_0x1f96ad(0x218)] + ')', _0x1ffb1f['UNKNOWN']]
    ],
        _0x235ed5 = _0x1ffb1f[_0x1f96ad(0x211)] + _0x1ffb1f['OK'] + _0x1ffb1f['WARNING'] + _0x1ffb1f['UNKNOWN'];
    if (_0x235ed5) {
        document[_0x1f96ad(0x21d)](_0x1f96ad(0x29a))[_0x1f96ad(0x241)]['display'] = 'none';
        for (var _0x527f48 in _0x4812dd) {
            _0x141358['push'](_0x4812dd[_0x527f48]);
        }
        google[_0x1f96ad(0x24c)][_0x1f96ad(0x1f0)](function () {
            var _0x370f88 = _0x1f96ad;
            drawpiechart(_0x141358, hardwaretitle, _0x370f88(0x216));
        });
    } else document[_0x1f96ad(0x21d)]('containerpie-hardwares')[_0x1f96ad(0x21f)] = '', document[_0x1f96ad(0x21d)](_0x1f96ad(0x29a))[_0x1f96ad(0x241)][_0x1f96ad(0x28c)] = _0x1f96ad(0x1e3), stopLoader(_0x1f96ad(0x216));
    var _0xe45b16 = Object(_0x526c28['software']),
        _0x50aad6 = [];
    _0x50aad6[_0x1f96ad(0x231)](firstrow);
    var _0x22e0d9 = [
        ['Critical(' + _0xe45b16['CRITICAL'] + ')', _0xe45b16[_0x1f96ad(0x211)]],
        [_0x1f96ad(0x23d) + _0xe45b16['OK'] + ')', _0xe45b16['OK']],
        [_0x1f96ad(0x249) + _0xe45b16[_0x1f96ad(0x2fa)] + ')', _0xe45b16['WARNING']],
        [_0x1f96ad(0x1f9) + _0xe45b16['UNKNOWN'] + ')', _0xe45b16[_0x1f96ad(0x218)]]
    ],
        _0x8e3e05 = _0xe45b16[_0x1f96ad(0x211)] + _0xe45b16['OK'] + _0xe45b16['WARNING'] + _0xe45b16['UNKNOWN'];
    if (_0x8e3e05) {
        document['getElementById'](_0x1f96ad(0x245))[_0x1f96ad(0x241)][_0x1f96ad(0x28c)] = 'none';
        for (var _0x527f48 in _0x22e0d9) {
            _0x50aad6['push'](_0x22e0d9[_0x527f48]);
        }
        google[_0x1f96ad(0x24c)][_0x1f96ad(0x1f0)](function () {
            var _0x471b81 = _0x1f96ad;
            drawpiechart(_0x50aad6, softwaretitle, _0x471b81(0x2b4));
        });
    } else document[_0x1f96ad(0x21d)](_0x1f96ad(0x2b4))[_0x1f96ad(0x21f)] = '', document['getElementById'](_0x1f96ad(0x245))[_0x1f96ad(0x241)][_0x1f96ad(0x28c)] = _0x1f96ad(0x1e3), stopLoader(_0x1f96ad(0x2b4));
    var _0x2e2668 = Object(_0x526c28[_0x1f96ad(0x222)]),
        _0x6921ff = [];
    _0x6921ff['push'](firstrow);
    var _0x528541 = [
        [_0x1f96ad(0x242) + _0x2e2668[_0x1f96ad(0x211)] + ')', _0x2e2668['CRITICAL']],
        [_0x1f96ad(0x23d) + _0x2e2668['OK'] + ')', _0x2e2668['OK']],
        [_0x1f96ad(0x249) + _0x2e2668[_0x1f96ad(0x2fa)] + ')', _0x2e2668[_0x1f96ad(0x2fa)]],
        [_0x1f96ad(0x1f9) + _0x2e2668[_0x1f96ad(0x218)] + ')', _0x2e2668[_0x1f96ad(0x218)]]
    ],
        _0x5c3e49 = _0x2e2668['CRITICAL'] + _0x2e2668['OK'] + _0x2e2668[_0x1f96ad(0x2fa)] + _0x2e2668[_0x1f96ad(0x218)];
    updatetime();
    if (_0x5c3e49) {
        document[_0x1f96ad(0x21d)](_0x1f96ad(0x215))[_0x1f96ad(0x241)][_0x1f96ad(0x28c)] = _0x1f96ad(0x22e);
        for (var _0x527f48 in _0x528541) {
            _0x6921ff[_0x1f96ad(0x231)](_0x528541[_0x527f48]);
        }
        google[_0x1f96ad(0x24c)][_0x1f96ad(0x1f0)](function () {
            var _0x5137a0 = _0x1f96ad;
            drawpiechart(_0x6921ff, applicationtitle, _0x5137a0(0x255));
        });
    } else document[_0x1f96ad(0x21d)](_0x1f96ad(0x255))[_0x1f96ad(0x21f)] = '', document[_0x1f96ad(0x21d)](_0x1f96ad(0x215))[_0x1f96ad(0x241)][_0x1f96ad(0x28c)] = 'flex', stopLoader(_0x1f96ad(0x255));
}

function updatetime() {
    var _0x8a221c = _0x4e5130,
        _0x43b189 = {},
        _0x239324 = new Date();
    _0x43b189[_0x8a221c(0x253)] = (_0x239324[_0x8a221c(0x204)]() < 0xa ? '0' : '') + _0x239324[_0x8a221c(0x204)](), _0x43b189[_0x8a221c(0x27f)] = (_0x239324[_0x8a221c(0x24a)]() < 0xa ? '0' : '') + _0x239324[_0x8a221c(0x24a)](), _0x43b189[_0x8a221c(0x248)] = (_0x239324[_0x8a221c(0x259)]() < 0xa ? '0' : '') + _0x239324[_0x8a221c(0x259)](), document[_0x8a221c(0x21d)](_0x8a221c(0x247))[_0x8a221c(0x21f)] = _0x8a221c(0x1e7) + _0x43b189['hour'] + ':' + _0x43b189[_0x8a221c(0x27f)] + ':' + _0x43b189['second'] + '\x20]';
}

function statusCount(_0x34fba7, _0x23f6d2) {
    var _0x20c351 = _0x4e5130;
    return totalCount = 0x0, _0x34fba7[_0x20c351(0x2ad)](function (_0x3a6892) {
        var _0x8bc02b = _0x20c351;
        if (_0x3a6892[0x0]) var _0x189485 = _0x3a6892[0x0][_0x8bc02b(0x214)]();
        else var _0x189485 = _0x3a6892[0x0];
        (_0x189485 === _0x8bc02b(0x211) || _0x189485 === _0x8bc02b(0x206) || _0x189485 === _0x8bc02b(0x299) || _0x189485 === _0x8bc02b(0x281) || _0x189485 === 'WAITING') && (_0x23f6d2[_0x8bc02b(0x211)] = _0x23f6d2[_0x8bc02b(0x211)] + _0x3a6892[0x1]), (_0x189485 == '' || _0x189485 === _0x8bc02b(0x2df) || _0x189485 === _0x8bc02b(0x224) || _0x189485 === 'OK' || _0x189485 === 'UP') && (_0x23f6d2['OK'] = _0x23f6d2['OK'] + _0x3a6892[0x1]), _0x189485 === _0x8bc02b(0x2ac) && (_0x23f6d2[_0x8bc02b(0x2ac)] = _0x23f6d2['PENDING'] + _0x3a6892[0x1]), _0x189485 === 'WARNING' && (_0x23f6d2[_0x8bc02b(0x2fa)] = _0x23f6d2[_0x8bc02b(0x2fa)] + _0x3a6892[0x1]), (_0x189485 === 'UNKNOWN' || _0x189485 === _0x8bc02b(0x2c7) || _0x189485 === _0x8bc02b(0x2d7)) && (_0x23f6d2[_0x8bc02b(0x218)] = _0x23f6d2[_0x8bc02b(0x218)] + _0x3a6892[0x1]), totalCount = totalCount + _0x3a6892[0x1];
    }), totalCount;
}

function readyHandler() { }

function updateHostServiceValues(_0x660882) {
    var _0x36ed6c = _0x4e5130,
        _0x4afce5 = [],
        _0x9b22c6 = 0x0;
    Object[_0x36ed6c(0x284)](_0x660882[_0x36ed6c(0x2eb)])[_0x36ed6c(0x267)] > 0x0 && (objToArray = Object[_0x36ed6c(0x284)](_0x660882[_0x36ed6c(0x2eb)])[_0x36ed6c(0x2f4)](_0x40cd28 => [_0x40cd28, Number(_0x660882[_0x36ed6c(0x2eb)][_0x40cd28])]), hostStatus = {
        'CRITICAL': 0x0,
        'WARNING': 0x0,
        'PENDING': 0x0,
        'UNKNOWN': 0x0,
        'OK': 0x0
    }, _0x9b22c6 = statusCount(objToArray, hostStatus), $(_0x36ed6c(0x2c5))['html'](_0x9b22c6), _0x4afce5['push']([_0x36ed6c(0x22d), 'Server\x20Health']), $[_0x36ed6c(0x2e9)](hostStatus, function (_0xbec647, _0x2c55ce) {
        var _0x5e934a = _0x36ed6c;
        _0x4afce5[_0x5e934a(0x231)]([_0xbec647, _0x2c55ce]), _0xbec647 === _0x5e934a(0x211) && _0x2c55ce > 0x0 ? $(_0x5e934a(0x1f5) + _0xbec647)[_0x5e934a(0x2d6)](_0x5e934a(0x26b) + _0x2c55ce + '</span>') : $(_0x5e934a(0x1f5) + _0xbec647)[_0x5e934a(0x2d6)](_0x2c55ce);
    }));
    if (pieHostChart !== undefined) {
        var _0x47f43e = google[_0x36ed6c(0x283)][_0x36ed6c(0x235)](_0x4afce5);
        options[_0x36ed6c(0x1fc)] = [criticalColor, warningColor, pendingColor, unkownColor, okColor], pieHostChart[_0x36ed6c(0x2cb)](), pieHostChart['draw'](_0x47f43e, options);
    }
    var _0x3e35bd = [],
        _0x3ec132 = 0x0;
    Object[_0x36ed6c(0x284)](_0x660882[_0x36ed6c(0x2b0)])[_0x36ed6c(0x267)] > 0x0 && (_0x3e35bd['push'](['Total\x20Service', _0x36ed6c(0x271)]), objToArray = Object[_0x36ed6c(0x284)](_0x660882[_0x36ed6c(0x2b0)])[_0x36ed6c(0x2f4)](_0x1c3d29 => [_0x1c3d29, Number(_0x660882[_0x36ed6c(0x2b0)][_0x1c3d29])]), serviceStatus = {
        'CRITICAL': 0x0,
        'WARNING': 0x0,
        'PENDING': 0x0,
        'UNKNOWN': 0x0,
        'OK': 0x0
    }, _0x3ec132 = statusCount(objToArray, serviceStatus), $(_0x36ed6c(0x2ae))[_0x36ed6c(0x2d6)](_0x3ec132), $['each'](serviceStatus, function (_0x4df980, _0x23acd9) {
        var _0x4e12fe = _0x36ed6c;
        _0x3e35bd[_0x4e12fe(0x231)]([_0x4df980, _0x23acd9]), _0x4df980 === 'CRITICAL' && _0x23acd9 > 0x0 ? $(_0x4e12fe(0x1fe) + _0x4df980)['html']('<span\x20class=\x27beat\x20p-0\x27>' + _0x23acd9 + '</span>') : $('#S-' + _0x4df980)[_0x4e12fe(0x2d6)](_0x23acd9);
    }));
    if (pieServiceChart !== undefined) {
        var _0x29b353 = google[_0x36ed6c(0x283)][_0x36ed6c(0x235)](_0x3e35bd);
        options['colors'] = [criticalColor, warningColor, pendingColor, unkownColor, okColor], pieServiceChart['clearChart'](), pieServiceChart[_0x36ed6c(0x20a)](_0x29b353, options);
    }
    var _0x5ed860 = _0x3ec132 + _0x9b22c6;
    $(_0x36ed6c(0x2e8))[_0x36ed6c(0x2d6)](_0x36ed6c(0x2d3) + _0x5ed860 + ')'), criticalStatusCount = hostStatus['CRITICAL'] + serviceStatus[_0x36ed6c(0x211)];
    if (criticalStatusCount == 0x0) $(_0x36ed6c(0x24f))[_0x36ed6c(0x287)](_0x36ed6c(0x263), '\x20'), $(_0x36ed6c(0x24f))[_0x36ed6c(0x2d6)](_0x36ed6c(0x2f6) + criticalStatusCount + ')');
    else $(_0x36ed6c(0x24f))[_0x36ed6c(0x2d6)](_0x36ed6c(0x2a4) + criticalStatusCount + _0x36ed6c(0x230));
    okStatusCount = hostStatus['OK'] + serviceStatus['OK'];
    if (okStatusCount == 0x0) $(_0x36ed6c(0x273))[_0x36ed6c(0x287)](_0x36ed6c(0x263), '\x20'), $(_0x36ed6c(0x273))[_0x36ed6c(0x2d6)](_0x36ed6c(0x21a) + okStatusCount + ')');
    else $('#pills-ok-tab')[_0x36ed6c(0x2d6)](_0x36ed6c(0x1f3) + okStatusCount + _0x36ed6c(0x230));
    pendingStatusCount = hostStatus[_0x36ed6c(0x2ac)] + serviceStatus[_0x36ed6c(0x2ac)];
    if (pendingStatusCount == 0x0) $(_0x36ed6c(0x2b1))[_0x36ed6c(0x287)](_0x36ed6c(0x263), '\x20'), $(_0x36ed6c(0x2b1))[_0x36ed6c(0x2d6)](_0x36ed6c(0x2f2) + pendingStatusCount + ')');
    else $('#pills-pending-tab')[_0x36ed6c(0x2d6)](_0x36ed6c(0x2dc) + pendingStatusCount + ')</span>');
    warningStatusCount = hostStatus[_0x36ed6c(0x2fa)] + serviceStatus[_0x36ed6c(0x2fa)];
    if (warningStatusCount == 0x0) $('#pills-warning-tab')[_0x36ed6c(0x287)]('onclick', '\x20'), $(_0x36ed6c(0x2f9))[_0x36ed6c(0x2d6)](_0x36ed6c(0x289) + warningStatusCount + ')');
    else $(_0x36ed6c(0x2f9))[_0x36ed6c(0x2d6)]('<span\x20class=\x22bold-text\x20warning\x22>Warning(' + warningStatusCount + _0x36ed6c(0x230));
    unknownStatusCount = hostStatus[_0x36ed6c(0x218)] + serviceStatus[_0x36ed6c(0x218)];
    if (unknownStatusCount == 0x0) $('#pills-unknown-tab')['attr'](_0x36ed6c(0x263), '\x20'), $(_0x36ed6c(0x202))['html'](_0x36ed6c(0x227) + unknownStatusCount + ')');
    else $(_0x36ed6c(0x202))[_0x36ed6c(0x2d6)](_0x36ed6c(0x2ee) + unknownStatusCount + _0x36ed6c(0x230));
}

function updateValues(_0x47fdf8) {
    var _0x4cd86b = _0x4e5130,
        _0x264643 = 0x0,
        _0x1ad181 = 0x0,
        _0x5873bd = 0x0,
        _0xd1935b = 0x0,
        _0x5b04b5 = 0x0,
        _0x3e081c = _0x47fdf8['host'],
        _0x56f2c5 = _0x47fdf8[_0x4cd86b(0x2b0)],
        _0x5578a0 = 0x0;
    _0x264643 = _0x3e081c[_0x4cd86b(0x2a9)] + _0x56f2c5['criticalCount'], _0x5578a0 = _0x5578a0 + _0x264643;
    if (_0x264643 == 0x0) $(_0x4cd86b(0x24f))['attr'](_0x4cd86b(0x263), '\x20'), $(_0x4cd86b(0x24f))['html'](_0x4cd86b(0x2f6) + _0x264643 + ')');
    else $('#pills-critical-tab')[_0x4cd86b(0x2d6)](_0x4cd86b(0x2a4) + _0x264643 + _0x4cd86b(0x230));
    _0x1ad181 = _0x3e081c[_0x4cd86b(0x29b)] + _0x56f2c5['okCount'], _0x5578a0 = _0x5578a0 + _0x1ad181;
    if (_0x1ad181 == 0x0) $(_0x4cd86b(0x273))[_0x4cd86b(0x287)](_0x4cd86b(0x263), '\x20'), $(_0x4cd86b(0x273))[_0x4cd86b(0x2d6)]('Ok\x20(' + _0x1ad181 + ')');
    else $(_0x4cd86b(0x273))[_0x4cd86b(0x2d6)](_0x4cd86b(0x1f3) + _0x1ad181 + _0x4cd86b(0x230));
    _0x5873bd = _0x3e081c[_0x4cd86b(0x25b)] + _0x56f2c5[_0x4cd86b(0x25b)], _0x5578a0 = _0x5578a0 + _0x5873bd;
    if (_0x5873bd == 0x0) $('#pills-pending-tab')[_0x4cd86b(0x287)](_0x4cd86b(0x263), '\x20'), $('#pills-pending-tab')[_0x4cd86b(0x2d6)](_0x4cd86b(0x2f2) + _0x5873bd + ')');
    else $('#pills-pending-tab')[_0x4cd86b(0x2d6)](_0x4cd86b(0x2dc) + pendingStatusCount + _0x4cd86b(0x230));
    _0xd1935b = _0x3e081c[_0x4cd86b(0x21b)] + _0x56f2c5[_0x4cd86b(0x21b)], _0x5578a0 = _0x5578a0 + _0xd1935b;
    if (_0xd1935b == 0x0) $(_0x4cd86b(0x2f9))['attr'](_0x4cd86b(0x263), '\x20'), $(_0x4cd86b(0x2f9))[_0x4cd86b(0x2d6)](_0x4cd86b(0x289) + _0xd1935b + ')');
    else $(_0x4cd86b(0x2f9))['html'](_0x4cd86b(0x257) + _0xd1935b + _0x4cd86b(0x230));
    _0x5b04b5 = _0x3e081c[_0x4cd86b(0x276)] + _0x56f2c5[_0x4cd86b(0x276)], _0x5578a0 = _0x5578a0 + _0x5b04b5;
    if (_0x5b04b5 == 0x0) $(_0x4cd86b(0x202))[_0x4cd86b(0x287)](_0x4cd86b(0x263), '\x20'), $(_0x4cd86b(0x202))['html'](_0x4cd86b(0x227) + _0x5b04b5 + ')');
    else $('#pills-unknown-tab')[_0x4cd86b(0x2d6)](_0x4cd86b(0x2ee) + _0x5b04b5 + ')</span>');
    $(_0x4cd86b(0x2e8))[_0x4cd86b(0x2d6)](_0x4cd86b(0x2d3) + _0x5578a0 + ')');
}

function getjsondata(_0x852c25) {
    var _0x5e973a = _0x4e5130,
        _0xa04691 = JSON[_0x5e973a(0x244)](_0x852c25);
    prometheusarray(prometheusdata, _0xa04691);
}

function nodespecificdetialsresponse(_0x511a96) {
    var _0x42e273 = _0x4e5130;
    prometheusdata = _0x511a96;
    !_0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0][_0x42e273(0x20e)](_0x42e273(0x2af)) && (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2af)] = _0x42e273(0x28f));
    $('#nagiosgraph')[_0x42e273(0x264)]();
    try {
        if ((_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](':p') || _0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0]['name'][_0x42e273(0x2b5)](':s')) && !_0x511a96[_0x42e273(0x1ec)]['data'][0x0]['product_model']['includes'](_0x42e273(0x282))) requestDataFromServer('/getfilecontent', {
            'filename': _0x42e273(0x28a)
        }, _0x42e273(0x254))['done'](getjsondata);
        else {
            if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2ab)][_0x42e273(0x2b5)]('s_sw')) requestDataFromServer('/getfilecontent', {
                'filename': 'prometheus-query.json'
            }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
            else {
                if (_0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0]['name']['includes'](_0x42e273(0x2f3)) && _0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2af)][_0x42e273(0x2b5)](_0x42e273(0x282))) requestDataFromServer(_0x42e273(0x2c9), {
                    'filename': _0x42e273(0x201)
                }, _0x42e273(0x254))['done'](getjsondata);
                else {
                    if (_0x511a96[_0x42e273(0x1ec)]['data'][0x0]['name']['includes'](_0x42e273(0x2e3)) && _0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2af)]['includes'](_0x42e273(0x282))) requestDataFromServer(_0x42e273(0x2c9), {
                        'filename': _0x42e273(0x21c)
                    }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                    else {
                        if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x268)) && _0x511a96[_0x42e273(0x1ec)]['data'][0x0]['product_model'][_0x42e273(0x2b5)](_0x42e273(0x282))) requestDataFromServer(_0x42e273(0x2c9), {
                            'filename': _0x42e273(0x2e6)
                        }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                        else {
                            if (_0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](':Uptime') && _0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0][_0x42e273(0x2af)][_0x42e273(0x2b5)](_0x42e273(0x282))) requestDataFromServer(_0x42e273(0x2c9), {
                                'filename': _0x42e273(0x229)
                            }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                            else {
                                if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x2b7)) && _0x511a96[_0x42e273(0x1ec)]['data'][0x0]['product_model'][_0x42e273(0x2b5)](_0x42e273(0x282))) requestDataFromServer(_0x42e273(0x2c9), {
                                    'filename': _0x42e273(0x28b)
                                }, 'GET')[_0x42e273(0x1e6)](getjsondata);
                                else {
                                    if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2ab)][_0x42e273(0x2b5)](_0x42e273(0x2f0)) && _0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0]['name'][_0x42e273(0x2b5)](_0x42e273(0x2f3))) requestDataFromServer(_0x42e273(0x2c9), {
                                        'filename': _0x42e273(0x26c)
                                    }, _0x42e273(0x254))['done'](getjsondata);
                                    else {
                                        if (_0x511a96['nodedetails']['data'][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x2f3))) requestDataFromServer('/getfilecontent', {
                                            'filename': 'cpu-query.json'
                                        }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                        else {
                                            if (_0x511a96['nodedetails']['data'][0x0][_0x42e273(0x2ab)][_0x42e273(0x2b5)](_0x42e273(0x2f0)) && _0x511a96[_0x42e273(0x1ec)]['data'][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x2b7))) requestDataFromServer(_0x42e273(0x2c9), {
                                                'filename': 'switch-info-query.json'
                                            }, 'GET')[_0x42e273(0x1e6)](getjsondata);
                                            else {
                                                if (_0x511a96['nodedetails']['data'][0x0]['layer']['includes'](_0x42e273(0x2f0)) && _0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x2e3))) requestDataFromServer(_0x42e273(0x2c9), {
                                                    'filename': _0x42e273(0x2c8)
                                                }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                else {
                                                    if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0]['name'][_0x42e273(0x2b5)](_0x42e273(0x2b7))) requestDataFromServer('/getfilecontent', {
                                                        'filename': _0x42e273(0x258)
                                                    }, 'GET')[_0x42e273(0x1e6)](getjsondata);
                                                    else {
                                                        if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)]['includes'](':Memory')) requestDataFromServer(_0x42e273(0x2c9), {
                                                            'filename': _0x42e273(0x2e0)
                                                        }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                        else {
                                                            if (_0x511a96[_0x42e273(0x1ec)]['data'][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x25a))) requestDataFromServer('/getfilecontent', {
                                                                'filename': _0x42e273(0x2e7)
                                                            }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                            else {
                                                                if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x275))) requestDataFromServer(_0x42e273(0x2c9), {
                                                                    'filename': 'nic-query.json'
                                                                }, 'GET')[_0x42e273(0x1e6)](getjsondata);
                                                                else {
                                                                    if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2ab)][_0x42e273(0x2b5)]('swi') && _0x511a96['nodedetails']['data'][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](':fan')) requestDataFromServer(_0x42e273(0x2c9), {
                                                                        'filename': 'switch-fan-query.json'
                                                                    }, 'GET')[_0x42e273(0x1e6)](getjsondata);
                                                                    else {
                                                                        if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x2c2))) requestDataFromServer(_0x42e273(0x2c9), {
                                                                            'filename': _0x42e273(0x2f5)
                                                                        }, 'GET')['done'](getjsondata);
                                                                        else {
                                                                            if (_0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0]['name'][_0x42e273(0x2b5)](_0x42e273(0x20f))) requestDataFromServer(_0x42e273(0x2c9), {
                                                                                'filename': 'battery-query.json'
                                                                            }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                                            else {
                                                                                if (_0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x2de))) requestDataFromServer('/getfilecontent', {
                                                                                    'filename': _0x42e273(0x2d2)
                                                                                }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                                                else {
                                                                                    if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2ab)][_0x42e273(0x2b5)](_0x42e273(0x2f0)) && _0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x268))) requestDataFromServer(_0x42e273(0x2c9), {
                                                                                        'filename': 'switch-temperature-query.json'
                                                                                    }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                                                    else {
                                                                                        if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x268))) requestDataFromServer(_0x42e273(0x2c9), {
                                                                                            'filename': _0x42e273(0x2bb)
                                                                                        }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                                                        else {
                                                                                            if (_0x511a96[_0x42e273(0x1ec)]['data'][0x0][_0x42e273(0x2ab)]['includes']('swi') && _0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0]['product_model']['includes']('fortigate')) requestDataFromServer(_0x42e273(0x2c9), {
                                                                                                'filename': _0x42e273(0x20d)
                                                                                            }, 'GET')['done'](getjsondata);
                                                                                            else {
                                                                                                if (_0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0]['layer']['includes'](_0x42e273(0x2f0)) && _0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x2c6))) requestDataFromServer(_0x42e273(0x2c9), {
                                                                                                    'filename': _0x42e273(0x280)
                                                                                                }, _0x42e273(0x254))['done'](getjsondata);
                                                                                                else {
                                                                                                    if (_0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0]['name'][_0x42e273(0x2b5)](_0x42e273(0x294))) requestDataFromServer(_0x42e273(0x2c9), {
                                                                                                        'filename': _0x42e273(0x2cf)
                                                                                                    }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                                                                    else {
                                                                                                        if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](':SW_LoadAvg')) requestDataFromServer(_0x42e273(0x2c9), {
                                                                                                            'filename': _0x42e273(0x297)
                                                                                                        }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                                                                        else {
                                                                                                            if (_0x511a96['nodedetails'][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x27a))) requestDataFromServer(_0x42e273(0x2c9), {
                                                                                                                'filename': _0x42e273(0x270)
                                                                                                            }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                                                                            else {
                                                                                                                if (_0x511a96[_0x42e273(0x1ec)]['data'][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](':SW_NIC')) requestDataFromServer('/getfilecontent', {
                                                                                                                    'filename': _0x42e273(0x23b)
                                                                                                                }, 'GET')[_0x42e273(0x1e6)](getjsondata);
                                                                                                                else {
                                                                                                                    if (_0x511a96[_0x42e273(0x1ec)]['data'][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x285))) requestDataFromServer(_0x42e273(0x2c9), {
                                                                                                                        'filename': _0x42e273(0x2e5)
                                                                                                                    }, 'GET')[_0x42e273(0x1e6)](getjsondata);
                                                                                                                    else {
                                                                                                                        if (_0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x1f6))) requestDataFromServer(_0x42e273(0x2c9), {
                                                                                                                            'filename': _0x42e273(0x2bd)
                                                                                                                        }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                                                                                        else _0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)][0x0][_0x42e273(0x2d4)][_0x42e273(0x2b5)](_0x42e273(0x22b)) && requestDataFromServer(_0x42e273(0x2c9), {
                                                                                                                            'filename': 'sw_cpu-query.json'
                                                                                                                        }, _0x42e273(0x254))[_0x42e273(0x1e6)](getjsondata);
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (_0x5f43b4) {
        swal(_0x5f43b4 + _0x42e273(0x22f), '\x20', 'error');
    }
    stopLoader('node-detail'), $(_0x42e273(0x2ce))['empty'](), $(_0x42e273(0x26f))['empty'](), $(_0x42e273(0x240))['empty']();
    if (_0x511a96 == undefined) return;
    if (_0x511a96['nodedetails'][_0x42e273(0x213)] == 0xc8) {
        var _0x3867ef = _0x511a96[_0x42e273(0x1ec)][_0x42e273(0x2a7)],
            _0x2f3de8 = _0x3867ef[0x0],
            _0x3384f7 = '',
            _0x701f99 = _0x2f3de8[_0x42e273(0x2d4)];
        $(_0x42e273(0x240))['append'](_0x701f99), $('#node-name')[_0x42e273(0x287)]('title', _0x701f99), $(_0x42e273(0x23c))[_0x42e273(0x287)](_0x42e273(0x2a1), image_path + _0x2f3de8[_0x42e273(0x2c4)]), $(_0x42e273(0x293))[_0x42e273(0x2d6)](_0x42e273(0x205) + _0x2f3de8[_0x42e273(0x1fb)] + _0x42e273(0x278));
        if (_0x2f3de8[_0x42e273(0x1fb)] !== _0x2f3de8[_0x42e273(0x277)]) $(_0x42e273(0x2b6))['html'](_0x42e273(0x205) + _0x2f3de8[_0x42e273(0x277)] + _0x42e273(0x278));
        if (_0x2f3de8[_0x42e273(0x291)] !== undefined) {
            var _0x28dc24 = getColorForNodeState(_0x2f3de8['monitor_status']),
                _0x27d9ce = '<span\x20class=\x22indicator-circle\x20ml-2\x22\x20\x20style=\x22background:' + _0x28dc24 + _0x42e273(0x2e4);
            $(_0x42e273(0x240))[_0x42e273(0x25c)](_0x27d9ce), $(_0x42e273(0x237))[_0x42e273(0x2d6)](_0x42e273(0x22a) + _0x28dc24 + '\x27>' + _0x42e273(0x2d5) + _0x42e273(0x278));
        }
        var _0x1dd70e = _0x2f3de8[_0x42e273(0x2e2)] / 0x3e8;
        if (_0x1dd70e !== 0x0) {
            var _0xf6952d = getFormatedDate(_0x1dd70e);
            $(_0x42e273(0x2d8))[_0x42e273(0x2d6)](_0x42e273(0x205) + _0xf6952d + _0x42e273(0x278));
        }
        if (_0x2f3de8[_0x42e273(0x1ed)] !== undefined) $(_0x42e273(0x272))[_0x42e273(0x2d6)](_0x42e273(0x205) + _0x2f3de8[_0x42e273(0x1ed)] + _0x42e273(0x278));
        if (_0x2f3de8[_0x42e273(0x2cc)] !== undefined) $('#nodecontactemail')[_0x42e273(0x2d6)](_0x42e273(0x205) + _0x2f3de8[_0x42e273(0x2cc)] + _0x42e273(0x278));
        if (_0x2f3de8[_0x42e273(0x2ba)] === undefined) $(_0x42e273(0x208))[_0x42e273(0x2d6)](_0x42e273(0x205) + _0x2f3de8[_0x42e273(0x2ba)] + _0x42e273(0x278));
        var _0x425659 = new URL(_0x42e273(0x1f2), monitorurl);
        if (_0x2f3de8[_0x42e273(0x243)] === 'Host') _0x425659 += _0x42e273(0x239) + _0x2f3de8[_0x42e273(0x1fb)] + ';';
        else _0x425659 += _0x42e273(0x239) + _0x2f3de8[_0x42e273(0x1fb)]['split'](':')[0x0] + _0x42e273(0x2cd), _0x425659 += _0x42e273(0x217) + _0x2f3de8['title'] + ';';
        document[_0x42e273(0x21d)](_0x42e273(0x290));
        var _0x18c774 = '',
            _0x189db1 = '';
        for (var _0x1ced8b in _0x2f3de8) {
            if (_0x2f3de8[_0x42e273(0x20e)](_0x1ced8b)) {
                var _0x357631 = _0x2f3de8[_0x1ced8b];
                _0x357631 !== '' && (_0x357631['length'] !== 0x0 ? _0x1ced8b !== _0x42e273(0x24b) && (_0x18c774 += _0x42e273(0x1ef) + _0x1ced8b + _0x42e273(0x26a), _0x189db1 += _0x42e273(0x2a2) + _0x357631 + _0x42e273(0x26a)) : (_0x18c774 += _0x42e273(0x2a2) + _0x1ced8b + _0x42e273(0x26a), _0x189db1 += '<p>\x27\x27</p>'));
            }
        }
        $(_0x42e273(0x2ce))[_0x42e273(0x25c)](_0x18c774), $(_0x42e273(0x26f))[_0x42e273(0x25c)](_0x189db1);
    } else swal(_0x42e273(0x23e), '\x20', _0x42e273(0x2f1));
}

function opendashboarsuperset(_0x6d2a82, _0x4d2bef) {
    var _0x1aa774 = _0x4e5130;
    _0x4d2bef !== null ? ($(_0x1aa774(0x25f))['attr'](_0x1aa774(0x233), _0x1aa774(0x296) + _0x4d2bef), $(_0x1aa774(0x25f))[0x0][_0x1aa774(0x2be)]()) : alert(_0x1aa774(0x2d1));
}

function openNagiosGraph(_0x184bb1, _0x50130a) {
    var _0x5c418b = _0x4e5130;
    $('#servicedata')[_0x5c418b(0x2b8)](_0x50130a), $(_0x5c418b(0x210))['submit']();
}

function monitorresponse(_0x5370f1) { }

function _0x5157(_0x41a8ee, _0x11bd98) {
    var _0x4010af = _0x4010();
    return _0x5157 = function (_0x5157cb, _0x2c71c6) {
        _0x5157cb = _0x5157cb - 0x1e3;
        var _0x48e3dd = _0x4010af[_0x5157cb];
        return _0x48e3dd;
    }, _0x5157(_0x41a8ee, _0x11bd98);
}

function openNav(_0x500025, _0x321a29, _0x17b0b4 = '') {
    var _0x365279 = _0x4e5130;
    $('.nav-tabs\x20a[href=\x22#' + _0x365279(0x2b9) + '\x22]')[_0x365279(0x225)](_0x365279(0x2aa)), $(_0x365279(0x2ed))[_0x365279(0x2aa)](), requestDataFromServer(_0x365279(0x251), {
        'nodeid': _0x500025,
        'mode': '',
        'csrfmiddlewaretoken': csfr_token,
        'selectedSite': _0x321a29,
        'ip': _0x17b0b4
    }, type = _0x365279(0x21e))[_0x365279(0x1e6)](nodespecificdetialsresponse);
}

function openNavs(_0x38dc11, _0x56e844, _0x263e35 = '') {
    var _0x21eb8e = _0x4e5130;
    $(_0x21eb8e(0x1ea))[_0x21eb8e(0x264)](), $(_0x21eb8e(0x238) + _0x21eb8e(0x26e) + '\x22]')['tab'](_0x21eb8e(0x2aa)), $(_0x21eb8e(0x2ed))['show'](), document[_0x21eb8e(0x21d)](_0x21eb8e(0x27d))[_0x21eb8e(0x2bc)] = ![], document['getElementById'](_0x21eb8e(0x2dd))['scrollIntoView']({
        'block': 'center',
        'behavior': _0x21eb8e(0x2c3)
    }), requestDataFromServer(_0x21eb8e(0x251), {
        'nodeid': _0x38dc11,
        'mode': '',
        'csrfmiddlewaretoken': csfr_token,
        'selectedSite': _0x56e844,
        'ip': _0x263e35
    }, type = 'POST')['done'](nodespecificdetialsresponse);
}

function openhelp(_0x2fcd19, _0x5a5b8d, _0x1e9892 = '') {
    var _0x51cde7 = _0x4e5130;
    $(_0x51cde7(0x238) + _0x51cde7(0x274) + '\x22]')[_0x51cde7(0x225)](_0x51cde7(0x2aa)), $(_0x51cde7(0x2ed))[_0x51cde7(0x2aa)](), requestDataFromServer(_0x51cde7(0x251), {
        'nodeid': _0x2fcd19,
        'mode': '',
        'csrfmiddlewaretoken': csfr_token,
        'selectedSite': _0x5a5b8d,
        'ip': _0x1e9892
    }, type = _0x51cde7(0x21e))[_0x51cde7(0x1e6)](nodespecificdetialsresponse);
}

function closeNav() {
    var _0x46c3cc = _0x4e5130;
    $(_0x46c3cc(0x2ed))[_0x46c3cc(0x27c)](), hideGraphPopup();
}

function ticketInfo() {
    var _0x223b2 = _0x4e5130;
    window[_0x223b2(0x292)][_0x223b2(0x233)] = window['location'][_0x223b2(0x2ef)] + '/incidents/?isInfopage=true';
}

function getallTicketSiteNames() {
    var _0x27a3de = _0x4e5130;
    requestDataFromServer(_0x27a3de(0x220), {
        'type': _0x27a3de(0x203),
        'isOnlyEnabled': 'true',
        'site': params[_0x27a3de(0x2bf)]('site')
    }, 'GET')[_0x27a3de(0x1e6)](function (_0x84670) {
        var _0x4253b4 = _0x27a3de;
        res = JSON[_0x4253b4(0x244)](_0x84670), res['status'] == 0xc8 && (ticketSiteResponse = res[_0x4253b4(0x2a7)]), getChartData(ticketSiteResponse), selected_sitename = res['data'][0x0][_0x4253b4(0x234)], selected_leurl = res['data'][0x0][_0x4253b4(0x279)], selected_websocurl = res[_0x4253b4(0x2a7)][0x0]['websocket_url'], ledColors(res[_0x4253b4(0x2a7)][0x0][_0x4253b4(0x234)], res['data'][0x0][_0x4253b4(0x279)], res[_0x4253b4(0x2a7)][0x0]['websocket_url']);
    });
}

function getChartData(_0x226bbd) {
    var _0x2c8013 = _0x4e5130;
    showLoader(_0x2c8013(0x295)), showLoader(_0x2c8013(0x256)), requestDataFromServer('/ticket/getdbdata', {
        'sites': JSON['stringify'](_0x226bbd),
        'view': 'siteview',
        'periods': 0x1e
    }, type = _0x2c8013(0x254))[_0x2c8013(0x1e6)](function (_0x12bf4e) {
        var _0x572d36 = _0x2c8013;
        chart_res = _0x12bf4e[_0x572d36(0x2a7)];
        if (_0x12bf4e[_0x572d36(0x2ca)] == _0x572d36(0x2b3)) {
            var _0x428076 = _0x572d36(0x1f7),
                _0x3fb8ff = [],
                _0x2d0eb9 = ['ID', {
                    'type': _0x572d36(0x27e),
                    'label': 'Date'
                }, _0x572d36(0x2c0), _0x572d36(0x221), _0x572d36(0x232)];
            _0x3fb8ff[_0x572d36(0x231)](_0x2d0eb9), chart_res['forEach'](function (_0x5c742b) {
                var _0x28facb = _0x572d36;
                _0x5c742b[0x1] = new Date(_0x5c742b[0x1][_0x28facb(0x2db)]('-', ',')), _0x3fb8ff['push'](_0x5c742b);
            });
            var _0x428076 = _0x572d36(0x207);
            typeof drawSeriesChart === _0x572d36(0x1f1) && google[_0x572d36(0x24c)][_0x572d36(0x1f0)](function () {
                drawSeriesChart(_0x3fb8ff, _0x428076);
            });
        } else {
            var _0x7e800a = '';
            _0x7e800a += _0x572d36(0x298) + _0x12bf4e['message'] + _0x572d36(0x1f4), $(_0x572d36(0x29d))[_0x572d36(0x25c)](_0x7e800a), $(_0x572d36(0x2ec))[_0x572d36(0x27c)]();
        }
    });
}