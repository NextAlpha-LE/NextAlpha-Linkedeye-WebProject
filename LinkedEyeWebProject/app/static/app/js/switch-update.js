var _0x5d334a = _0x1052;

function _0x1052(_0x268661, _0xd7682d) {
    var _0x33ac36 = _0x33ac();
    return _0x1052 = function (_0x1052c9, _0x489750) {
        _0x1052c9 = _0x1052c9 - 0x1de;
        var _0x34e90e = _0x33ac36[_0x1052c9];
        return _0x34e90e;
    }, _0x1052(_0x268661, _0xd7682d);
} (function (_0x259a35, _0x5ca8c2) {
    var _0x647fb4 = _0x1052,
        _0x1521ff = _0x259a35();
    while (!![]) {
        try {
            var _0x2a65cb = -parseInt(_0x647fb4(0x277)) / 0x1 * (parseInt(_0x647fb4(0x249)) / 0x2) + parseInt(_0x647fb4(0x1e9)) / 0x3 * (-parseInt(_0x647fb4(0x200)) / 0x4) + -parseInt(_0x647fb4(0x201)) / 0x5 + parseInt(_0x647fb4(0x23e)) / 0x6 * (parseInt(_0x647fb4(0x295)) / 0x7) + parseInt(_0x647fb4(0x2b8)) / 0x8 + parseInt(_0x647fb4(0x278)) / 0x9 + parseInt(_0x647fb4(0x27b)) / 0xa;
            if (_0x2a65cb === _0x5ca8c2) break;
            else _0x1521ff['push'](_0x1521ff['shift']());
        } catch (_0x253b29) {
            _0x1521ff['push'](_0x1521ff['shift']());
        }
    }
}(_0x33ac, 0x33a28));
var params = new URLSearchParams(document[_0x5d334a(0x298)]['search']);
sites = [], selectedsite = '\x20', sites['push'](params[_0x5d334a(0x27a)](_0x5d334a(0x23c)));
var selectedsite = params[_0x5d334a(0x27a)](_0x5d334a(0x23c)),
    responseFromServer, cyGraph, zoom = 0x1,
    titleToId = {},
    wsConnected = ![],
    connectionTries = 0x6,
    sitesData = [];
entitySelectedsite = '\x20';
var siteResponse, entityResponse, sortedJson = {},
    nodeList, switchlastreconnect = '',
    map = {},
    sclient = {},
    portcount = [],
    switchips = [],
    switchportscount = {};
$(document)[_0x5d334a(0x220)](function () {
    FirstTimeDataLoad();
});

function getarrowdata(_0x317791, _0x50fd72) {
    map[_0x317791] = _0x50fd72;
}

function getEntityDatas() {
    var _0x4c6e96 = _0x5d334a;
    requestDataFromServer(_0x4c6e96(0x26b), {
        'sitename': params[_0x4c6e96(0x27a)](_0x4c6e96(0x23c))
    }, type = _0x4c6e96(0x21c))['done'](FirstTimeDataLoad);
}

function FirstTimeDataLoad() {
    var _0x4dbae9 = _0x5d334a,
        _0x43d4e1 = params[_0x4dbae9(0x27a)]('site');
    requestDataFromServer(_0x4dbae9(0x288), {
        'type': _0x4dbae9(0x26c),
        'site': params['get'](_0x4dbae9(0x23c))
    }, _0x4dbae9(0x21c))[_0x4dbae9(0x1ed)](function (_0x3d57bb) {
        var _0x1584cd = _0x4dbae9;
        res = JSON[_0x1584cd(0x212)](_0x3d57bb);
        var _0x1c911a = res['data'][0x0][_0x1584cd(0x217)];
    });
}
var switobj = {};

function displayswittooltips(_0x45eb3e, _0x1ed18f) {
    var _0x910ef7 = _0x5d334a;
    document[_0x910ef7(0x268)](_0x1ed18f)[_0x910ef7(0x296)]['contains']('switshown') ? (document[_0x910ef7(0x268)](_0x45eb3e)['classList']['remove'](_0x910ef7(0x256)), document[_0x910ef7(0x268)](_0x1ed18f)[_0x910ef7(0x296)][_0x910ef7(0x226)](_0x910ef7(0x279))) : (document[_0x910ef7(0x268)](_0x45eb3e)[_0x910ef7(0x296)][_0x910ef7(0x29b)](_0x910ef7(0x256)), document['getElementById'](_0x1ed18f)[_0x910ef7(0x296)][_0x910ef7(0x29b)](_0x910ef7(0x279)));
}
var sitesname = 'switsitesname',
    wsocname = 'swit-pipe',
    switchhtml = _0x5d334a(0x20a) + wsocname + '\x27,\x27' + sitesname + '\x27)\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22tooltiptext\x22\x20id=\x22switsitesname\x22\x20style=\x22\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</i>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>';
$(_0x5d334a(0x274))[_0x5d334a(0x285)](), $(_0x5d334a(0x274))[_0x5d334a(0x20f)](switchhtml);

function iconclose(_0x15f086) {
    var _0x21e40d = _0x5d334a;
    isToBeConnect = !{}[!![]], switobj[_0x15f086] && switobj[_0x15f086][_0x21e40d(0x29d)]();
}

function _0x33ac() {
    var _0x21c8cf = ['</td></tr>', '-indicator', 'white_class', '<div\x20class=\x22row\x20tooltiping\x22>', 'style', '</tr>', 'toLocaleString', '#g-switch,\x20#g-div,\x20#s_hw,\x20#server-div', 'position', 'getElementsByClassName', 'orange', 'NIC', 'block', 'site', '_class', '385716TFnOLw', '<div\x20class=\x22badgetltp-data\x20\x22>', '#e99123', '.num-data', '#pills-ok-tab', 'pills-unknown-tab', 'pills-warning-tab', 'status', 'swistatus-conn', ':NIC', 'attr', '63350FcYUBL', 'css', '-</td>\x20<td>', 'red_class', '<tr\x20class=\x22col-12\x22>', 'body', '/entity/getneo4jspecificelement', '<td\x20class=\x22col-4\x20details_ts\x22\x20id=\x22', 'contains', 'mode', 'rgb(255,\x20255,\x20255)', 'findIndex', '#pills-unknown-tabip_', 'switborder-clr', 'html', '<div\x20class=\x22badgetltp-elem\x22\x20style=\x22color:green;font-weight:bold\x22>', 'software', 'application', 'Lastconnect\x20:\x20', 'textContent', 'rgb(0,\x200,\x200)', 'Critical(', 'includes', 'pills-unknown-tabip_', '<i\x20class=\x22mdi\x20icon-data\x20mdi-arrow-left-drop-circle\x22>', 'data', 'green_class', 'getSeconds', '<p\x20style=\x22font-size:\x2013px;margin-left:\x2011px;\x22><b>Queue\x20Name\x20:</b>\x20switch_update</p>', 'from', '<tr\x20style=\x22color:green\x22><td\x20id=\x22', 'getElementById', 'addClass', '#16d39a', '../dashboard/getneo4jnodes', 'clicksite', 'entries', 'fill', 'isEmptyObject', '#node-view\x20#', 'url', 'length', '#ip_', '#switch-html', 'red', 'pills-critical-tab', '6KhmfDr', '290520xtQMGp', 'switshown', 'get', '3469710hMHRre', 'background-color', '<span\x20class=\x22bold-text\x20red\x22>Critical(', '<span\x20class=\x22bold-text\x20green\x22>Ok(', 'pills-critical-tabip_', 'alias', ')-</td>\x20<td>', 'linkedeye', '\x22\x20>', 'rgb(255,\x2061,\x2087)', 'empty', 'connect', '<thead></thead>', '/lesites/getallsitenames', 'swit-pipe', 'getFullYear', 'overview', 'Ok(', '<tr\x20style=\x22color:red\x22><td\x20id=\x22', 'replaceAll', 'getMinutes', 'sqrt', '#badgeip_', '#pills-critical-tabip_', ')</span>', '\x27)\x22\x20></i\x20><i\x20class=\x22mdi\x20mdi-close-box\x22\x20style=\x22color:#ff3d57;\x22\x20onclick=\x22iconclose(\x27', '7WGXFYT', 'classList', '#1f1f1f', 'location', 'fade', '</i><div\x20class=\x22num-data\x22>', 'add', 'insertBefore', 'disconnect', '#ff3d57', '<i\x20class=\x22mdi\x20icon-data\x20\x20mdi-arrow-left-drop-circle\x22>', '\x20<p\x20class=\x22tooltiptexting\x22\x20id=\x22', 'grey', '<table>', 'replace', '<p\x20class=\x22col-3\x22\x20id=\x22swidisplay-icon', '<div\x20class=\x22badgetltp-elem\x22\x20style=\x22color:orange;font-weight:bold\x22>', 'ps_hw', '2px\x20solid\x20', 'pills-ok-tabip_', 'appendChild', '_tooltip', 'DiskVolumes_list', 'online', 'backgroundColor', 'scroll', 'pills-warning-tabip_', '#pills-warning-tabip_', '#ffffff', 'function', 'square', '#pills-critical-tab', 'black', 'WebSocket', '\x27)\x22\x20></i\x20></p>', '1282400nEJitI', 'getMonth', 'indexOf', '<div\x20class=\x22badgetltp-elem\x22\x20style=\x22font-weight:bold;color:grey\x22>', 'Warning(', 'rgb', '</div><i\x20class=\x22\x20col-2\x20mdi\x20mdi-pin-outline\x22\x20id=\x22', 'connectionTries', 'white', 'innerHTML', 'disc', 'vms_hw', 'mac', 'hardware', '\x22\x20style=\x22display:none;margin-top:\x2013px;\x22><i\x20class=\x22mdi\x20mdi-checkbox-marked\x22\x20style=\x22color:#16d39a;\x22\x20onclick=\x22iconconnect(\x27', 'swilast-conn\x22></p>', '579wfXWvr', 'overviewstats', 'linear', 'removeClass', 'done', '#g-switch,\x20#p-switch,\x20#p_swi,\x20#f-switch,\x20#f_swi,\x20#e_swi,\x20#e-switch,\x20#g-div,\x20#s_hw,\x20#server-div', '<span\x20class=\x22bold-text\x20warning\x22>Warning(', 'MAX_VALUE', 'startsWith', '/exchange/switch_update', 'innerText', 'port', 'match', 'client', 'Unknown', 'hasClass', 'onclick', 'borderColor', 'display', 'rgb(', 'Unknown(', 'color', '#000000', '4036wMBaFk', '37770TWTxbU', 'swilast-conn', 'SW_Disk', 'link', '#swidisplay-icon', '<span\x20class=\x22bold-text\x20\x22style=\x22color:white\x22>Unknown(', 'Nics_list', 'querySelector', 'map', '<div\x20class=\x22indicator\x22\x20id=\x22swit-pipe\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22mdi\x20mdi-check-network-outline\x20tooltip\x22\x20id=\x22icon-chats\x22\x20onclick=\x22displayswittooltips(\x27', '#pills-unknown-tab', 'mouseover', 'getHours', 'pills-ok-tab', 'append', 'Trying(', 'forEach', 'parse', 'statusFunction(this)', 'split', 'hasOwnProperty', 'ip_', 'websocket_url', 'isWSConnected', 'mouseout', '</div>', 'keys', 'GET', '</table>', 'show', 'critical_opaque', 'ready', 'percentage', '#pills-warning-tab', 'none', 'hide', 'toString', 'remove', 'title', 'swistatus-conn\x22\x20></td>', 'getDate', '#e59105', 'green', 'trim', 'toLowerCase', 'addEventListener'];
    _0x33ac = function () {
        return _0x21c8cf;
    };
    return _0x33ac();
}

function iconconnect(_0x59a18d) {
    var _0x1dca58 = _0x5d334a;
    isToBeConnect = {}[!![]], makeWebSwitchConnection(switobj[_0x59a18d]['ws'][_0x1dca58(0x271)], switobj[_0x59a18d]['id'], 0x0);
}

function makeWebSwitchConnection(_0x44f594, _0x3ba409, _0x17532a, _0xb2de49) {
    var _0x163448 = _0x5d334a,
        _0x16d791 = _0x163448(0x1f6) + _0xb2de49;
    try {
        if (window[_0x163448(0x2b6)]) {
            var _0x56a3a7 = _0x163448(0x1f2);
            _0x16d791 = Stomp[_0x163448(0x1f6)](_0x44f594), _0x16d791['id'] = _0x3ba409, _0x16d791[_0x163448(0x1e0)] = _0x17532a, switobj[_0x3ba409] = _0x16d791;
            var _0x148857 = '';
            _0x148857 += _0x163448(0x232), _0x148857 += _0x163448(0x265), _0x148857 += '<table>', _0x148857 += _0x163448(0x287), _0x148857 += '<tbody\x20class=\x22row\x22\x20style=\x22margin-left:6px;>', _0x148857 += _0x163448(0x24d), _0x148857 += '<td\x20class=\x22col-8\x20details_td\x22\x20style=\x22width:\x20100px;\x22>isConnected</td>', _0x148857 += _0x163448(0x250) + _0x3ba409 + _0x163448(0x228), _0x148857 += _0x163448(0x234), _0x148857 += '</tbody>', _0x148857 += _0x163448(0x21d), _0x148857 += _0x163448(0x2a0) + _0x3ba409 + _0x163448(0x1e8), _0x148857 += _0x163448(0x2a4) + _0x3ba409 + _0x163448(0x1e7) + _0x3ba409 + _0x163448(0x294) + _0x3ba409 + _0x163448(0x2b7), _0x148857 += _0x163448(0x21a), $('#switsitesname')[_0x163448(0x285)](), $('#switsitesname')['append'](_0x148857);
            var _0x35e31f = function () {
                var _0x1b2d2c = _0x163448;
                wsConnected = !![];
                var _0x50af0f = sitesData[0x0];
                _0x50af0f[_0x1b2d2c(0x218)] = !![], isToBeConnect = {}[!![]], document[_0x1b2d2c(0x268)](_0x3ba409 + _0x1b2d2c(0x246))[_0x1b2d2c(0x1f3)] = 'True(0)', document[_0x1b2d2c(0x268)](_0x3ba409 + _0x1b2d2c(0x246))[_0x1b2d2c(0x233)]['color'] = _0x1b2d2c(0x26a), document[_0x1b2d2c(0x268)]('swit-pipe')[_0x1b2d2c(0x233)]['color'] = '#16d39a', $('#swidisplay-icon' + _0x3ba409)[_0x1b2d2c(0x24a)](_0x1b2d2c(0x1fb), _0x1b2d2c(0x223)), document['getElementById'](_0x3ba409 + _0x1b2d2c(0x202))[_0x1b2d2c(0x1f3)] = _0x1b2d2c(0x25b) + switchlastreconnect, _0x16d791['subscribe'](_0x56a3a7, function (_0x5532b6) {
                    var _0x391c27 = _0x1b2d2c,
                        _0x20a867 = '';
                    update = JSON[_0x391c27(0x212)](_0x5532b6[_0x391c27(0x24e)]);
                    if (update[_0x391c27(0x227)] == update['ip']) {
                        overalldivcolor(update);
                        switch (update[_0x391c27(0x245)]) {
                            case 0x0:
                                color = '#ff3d57';
                                !$(_0x391c27(0x273) + update['ip']['replaceAll']('.', '_') + ':NIC')['hasClass']('critical_opaque') && $(_0x391c27(0x273) + update['ip'][_0x391c27(0x28e)]('.', '_') + _0x391c27(0x247))[_0x391c27(0x269)](_0x391c27(0x21f));
                                break;
                            case 0x1:
                                color = _0x391c27(0x240);
                                $(_0x391c27(0x273) + update['ip'][_0x391c27(0x28e)]('.', '_') + _0x391c27(0x247))[_0x391c27(0x1f8)](_0x391c27(0x21f)) && $(_0x391c27(0x273) + update['ip']['replaceAll']('.', '_') + ':NIC')['removeClass'](_0x391c27(0x21f));
                                break;
                            case 0x2:
                                color = _0x391c27(0x26a);
                                $(_0x391c27(0x273) + update['ip'][_0x391c27(0x28e)]('.', '_') + ':NIC')['hasClass'](_0x391c27(0x21f)) && $(_0x391c27(0x273) + update['ip']['replaceAll']('.', '_') + _0x391c27(0x247))[_0x391c27(0x1ec)]('critical_opaque');
                                break;
                            case 0x3:
                                color = _0x391c27(0x2b1);
                                $(_0x391c27(0x273) + update['ip']['replaceAll']('.', '_') + _0x391c27(0x247))[_0x391c27(0x1f8)](_0x391c27(0x21f)) && $(_0x391c27(0x273) + update['ip']['replaceAll']('.', '_') + ':NIC')[_0x391c27(0x1ec)](_0x391c27(0x21f));
                                break;
                            default:
                                color = _0x391c27(0x1ff);
                                $(_0x391c27(0x273) + update['ip'][_0x391c27(0x28e)]('.', '_') + _0x391c27(0x247))[_0x391c27(0x1f8)](_0x391c27(0x21f)) && $(_0x391c27(0x273) + update['ip']['replaceAll']('.', '_') + _0x391c27(0x247))['removeClass'](_0x391c27(0x21f));
                        }
                        if (document['getElementById'](_0x391c27(0x216) + update['ip']['replaceAll']('.', '_') + _0x391c27(0x247))) document['getElementById'](_0x391c27(0x216) + update['ip'][_0x391c27(0x28e)]('.', '_') + _0x391c27(0x247))[_0x391c27(0x233)]['border'] = _0x391c27(0x2a7) + color;
                        InitialswitchUpdate(update), swapServers();
                    }
                    if (update[_0x391c27(0x227)] == update['ip'] + ':' + update[_0x391c27(0x252)]) {
                        if (update['DiskVolumes_list'] != null && update[_0x391c27(0x252)] == _0x391c27(0x203) && jQuery[_0x391c27(0x26f)](update['DiskVolumes_list']) != !![]) {
                            var _0x405088 = update['ip'][_0x391c27(0x28e)]('.', '_'),
                                _0x4bb43d = update[_0x391c27(0x252)],
                                _0x568af0 = 'Disk<table>',
                                _0x826258 = '',
                                _0x4ad441 = '';
                            for (const [_0x49ec10, _0x3d5f03] of Object['entries'](JSON[_0x391c27(0x212)](update[_0x391c27(0x2ab)]))) {
                                _0x3d5f03['status'] == 0x2 ? _0x826258 += '<tr\x20style=\x22color:green\x22><td\x20id=\x22' + _0x405088 + ':' + _0x49ec10 + ':' + _0x4bb43d + '\x22>' + _0x49ec10 + '-</td>\x20<td>' + _0x3d5f03['percentage'] + _0x391c27(0x22f) : _0x4ad441 += _0x391c27(0x28d) + _0x405088 + ':' + _0x49ec10 + ':' + _0x4bb43d + '\x22>' + _0x49ec10 + _0x391c27(0x24b) + _0x3d5f03[_0x391c27(0x221)] + _0x391c27(0x22f);
                            }
                            _0x568af0 += _0x4ad441 + _0x826258, _0x568af0 += _0x391c27(0x21d), document['getElementById'](update[_0x391c27(0x227)][_0x391c27(0x28e)]('.', '_') + _0x391c27(0x2aa)) != null && (document[_0x391c27(0x268)](update['title'][_0x391c27(0x28e)]('.', '_') + '_tooltip')[_0x391c27(0x1e2)] = _0x568af0);
                        }
                        InitialhardwareUpdates(update);
                    }
                    switch (update[_0x391c27(0x245)]) {
                        case 0x0:
                            color = _0x391c27(0x29e);
                            break;
                        case 0x1:
                            color = _0x391c27(0x22a);
                            break;
                        case 0x2:
                            color = '#16d39a';
                            break;
                        case 0x3:
                            color = '#ffffff';
                            break;
                        case 0x4:
                            color = _0x391c27(0x297);
                            break;
                        case 0x5:
                            color = _0x391c27(0x297);
                            break;
                        default:
                            color = _0x391c27(0x2b1);
                    }
                    var _0x1e85e4 = update['port'];
                    update['port'] != undefined && update['port'] != null && update[_0x391c27(0x1f4)] != '' && (_0x20a867 = $('#' + update['ip'][_0x391c27(0x28e)]('.', '_') + '\x20#' + update[_0x391c27(0x1f4)][_0x391c27(0x28e)]('/', '_'))[_0x391c27(0x24a)](_0x391c27(0x26e)), $('#' + update['ip']['replaceAll']('.', '_') + '\x20#' + update['port'][_0x391c27(0x28e)]('/', '_'))[_0x391c27(0x24a)]('fill', color), _0x1e85e4 = update[_0x391c27(0x1f4)][_0x391c27(0x28e)]('/', '_'));
                    var _0x3e5a4e = '',
                        _0x555a85 = update[_0x391c27(0x1ea)][_0x391c27(0x262)][_0x391c27(0x28b)][update['ip']],
                        _0x196650 = update['overviewstats'][_0x391c27(0x262)]['overall'],
                        _0x4aca1a = _0x196650['hardware']['0'],
                        _0x4bfbfc = _0x196650[_0x391c27(0x1e6)]['1'],
                        _0x384e70 = _0x196650['hardware']['2'],
                        _0x193683 = _0x196650[_0x391c27(0x1e6)]['3'],
                        _0x3923fd = _0x196650[_0x391c27(0x259)]['0'],
                        _0x1508cc = _0x196650['software']['1'],
                        _0x152b01 = _0x196650[_0x391c27(0x259)]['2'],
                        _0x439914 = _0x196650[_0x391c27(0x259)]['3'],
                        _0x40ccae = _0x196650[_0x391c27(0x25a)]['0'],
                        _0x1b9e3b = _0x196650[_0x391c27(0x25a)]['1'],
                        _0xe10ea8 = _0x196650[_0x391c27(0x25a)]['2'],
                        _0x498674 = _0x196650['application']['3'],
                        _0x5d7bfe = '',
                        _0x59b996 = '',
                        _0x43fbf6 = '',
                        _0x5b8ac3 = '',
                        _0x11b532 = update['ip'][_0x391c27(0x28e)]('.', '_'),
                        _0x317bc0 = 0x0,
                        _0x236a69 = 0x0,
                        _0x227c1e = 0x0,
                        _0x276223 = 0x0;
                    _0x555a85[_0x391c27(0x215)]('2') ? (_0x43fbf6 = _0x555a85['2'][0x0], _0x276223 = Number(_0x555a85['2'][0x0])) : _0x43fbf6 = 0x0;
                    _0x555a85['hasOwnProperty']('0') ? (_0x59b996 = _0x555a85['0'][0x0], _0x317bc0 = Number(_0x555a85['0'][0x0])) : _0x59b996 = 0x0;
                    _0x555a85[_0x391c27(0x215)]('1') ? (_0x5d7bfe = _0x555a85['1'][0x0], _0x236a69 = Number(_0x555a85['1'][0x0])) : _0x5d7bfe = 0x0;
                    _0x555a85[_0x391c27(0x215)]('3') ? (_0x5b8ac3 = _0x555a85['3'][0x0], _0x227c1e = Number(_0x555a85['3'][0x0])) : _0x5b8ac3 = 0x0;
                    if (document[_0x391c27(0x268)](_0x391c27(0x20e) + _0x11b532) || document[_0x391c27(0x268)](_0x391c27(0x2a8) + _0x11b532)) {
                        if (_0x43fbf6) {
                            $('#pills-ok-tab' + _0x11b532)[_0x391c27(0x257)]('<span\x20class=\x22bold-text\x20green\x22>Ok(' + _0x43fbf6 + ')</span>');
                            if (document[_0x391c27(0x268)](_0x391c27(0x2a8) + _0x11b532)) $('#pills-ok-tabip_' + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x27e) + _0x43fbf6 + _0x391c27(0x293));
                            $(_0x391c27(0x242) + _0x11b532)[_0x391c27(0x248)]('onclick', _0x391c27(0x213));
                        } else {
                            $(_0x391c27(0x242) + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x28c) + _0x43fbf6 + ')');
                            if (document[_0x391c27(0x268)](_0x391c27(0x2a8) + _0x11b532)) $('#pills-ok-tabip_' + _0x11b532)['html'](_0x391c27(0x28c) + _0x43fbf6 + ')');
                        }
                    }
                    if (document[_0x391c27(0x268)](_0x391c27(0x276) + _0x11b532) || document['getElementById'](_0x391c27(0x27f) + _0x11b532)) {
                        if (_0x59b996) {
                            $('#pills-critical-tab' + _0x11b532)['html'](_0x391c27(0x27d) + _0x59b996 + _0x391c27(0x293));
                            if (document[_0x391c27(0x268)]('pills-critical-tabip_' + _0x11b532)) $(_0x391c27(0x292) + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x27d) + _0x59b996 + _0x391c27(0x293));
                            $(_0x391c27(0x2b4) + _0x11b532)[_0x391c27(0x248)](_0x391c27(0x1f9), _0x391c27(0x213));
                        } else {
                            $(_0x391c27(0x2b4) + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x25e) + _0x59b996 + ')');
                            if (document[_0x391c27(0x268)]('pills-critical-tabip_' + _0x11b532)) $('#pills-critical-tabip_' + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x25e) + _0x59b996 + ')');
                        }
                    }
                    if (document[_0x391c27(0x268)](_0x391c27(0x244) + _0x11b532) || document[_0x391c27(0x268)](_0x391c27(0x2af) + _0x11b532)) {
                        if (_0x5d7bfe) {
                            $(_0x391c27(0x222) + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x1ef) + _0x5d7bfe + _0x391c27(0x293));
                            if (document[_0x391c27(0x268)](_0x391c27(0x2af) + _0x11b532)) $('#pills-warning-tabip_' + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x1ef) + _0x5d7bfe + _0x391c27(0x293));
                            $(_0x391c27(0x222) + _0x11b532)[_0x391c27(0x248)](_0x391c27(0x1f9), _0x391c27(0x213));
                        } else {
                            $('#pills-warning-tab' + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x2bc) + _0x5d7bfe + ')');
                            if (document[_0x391c27(0x268)]('pills-warning-tabip_' + _0x11b532)) $(_0x391c27(0x2b0) + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x2bc) + _0x5d7bfe + ')');
                        }
                    }
                    if (document[_0x391c27(0x268)](_0x391c27(0x243) + _0x11b532) || document[_0x391c27(0x268)](_0x391c27(0x260) + _0x11b532)) {
                        if (_0x5b8ac3) {
                            $('#pills-unknown-tab' + _0x11b532)['html']('<span\x20class=\x22bold-text\x20\x22style=\x22color:white\x22>Unknown(' + _0x5b8ac3 + _0x391c27(0x293));
                            if (document[_0x391c27(0x268)]('pills-unknown-tabip_' + _0x11b532)) $('#pills-unknown-tabip_' + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x206) + _0x5b8ac3 + _0x391c27(0x293));
                            $(_0x391c27(0x20b) + _0x11b532)[_0x391c27(0x248)](_0x391c27(0x1f9), 'statusFunction(this)');
                        } else {
                            $(_0x391c27(0x20b) + _0x11b532)['html']('Unknown(' + _0x5b8ac3 + ')');
                            if (document[_0x391c27(0x268)]('pills-unknown-tabip_' + _0x11b532)) $(_0x391c27(0x255) + _0x11b532)[_0x391c27(0x257)](_0x391c27(0x1fd) + _0x5b8ac3 + ')');
                        }
                    }
                    var _0x3608b1 = _0x391c27(0x23f);
                    _0x317bc0 > 0x0 && (_0x3608b1 += '<div\x20class=\x22badgetltp-elem\x22\x20style=\x22color:red;font-weight:bold\x22>' + _0x317bc0 + _0x391c27(0x21a));
                    _0x236a69 > 0x0 && (_0x3608b1 += _0x391c27(0x2a5) + _0x236a69 + _0x391c27(0x21a));
                    _0x227c1e > 0x0 && (_0x3608b1 += _0x391c27(0x2bb) + _0x227c1e + '</div>');
                    _0x276223 > 0x0 && (_0x3608b1 += _0x391c27(0x258) + _0x276223 + '</div>');
                    _0x3608b1 += '</div>';
                    var _0x1057b7 = '';
                    if (_0x317bc0 > 0x0) _0x1057b7 += _0x391c27(0x261) + _0x3608b1 + _0x391c27(0x29a) + _0x317bc0 + _0x391c27(0x21a), $('#badgeip_' + _0x11b532)['css']('background-color', 'red');
                    else {
                        if (_0x236a69 > 0x0) _0x1057b7 += _0x391c27(0x29f) + _0x3608b1 + '</i><div\x20class=\x22num-data\x22>' + _0x236a69 + _0x391c27(0x21a), $('#badgeip_' + _0x11b532)[_0x391c27(0x24a)](_0x391c27(0x27c), _0x391c27(0x239));
                        else {
                            if (_0x227c1e > 0x0) _0x1057b7 += _0x391c27(0x29f) + _0x3608b1 + _0x391c27(0x29a) + _0x227c1e + _0x391c27(0x21a), $(_0x391c27(0x291) + _0x11b532)[_0x391c27(0x24a)](_0x391c27(0x27c), _0x391c27(0x1e1)), $(_0x391c27(0x291) + _0x11b532)[_0x391c27(0x24a)](_0x391c27(0x1fe), _0x391c27(0x2a1));
                            else _0x276223 > 0x0 && (_0x1057b7 += _0x391c27(0x29f) + _0x3608b1 + _0x391c27(0x29a) + _0x276223 + _0x391c27(0x21a), $('#badgeip_' + _0x11b532)['css'](_0x391c27(0x27c), _0x391c27(0x22b)));
                        }
                    }
                    $(_0x391c27(0x291) + _0x11b532)['html'](_0x1057b7);
                    var _0x904435 = {
                        'hardware': {
                            'CRITICAL': _0x4aca1a,
                            'OK': _0x384e70,
                            'WARNING': _0x4bfbfc,
                            'UNKNOWN': _0x193683
                        },
                        'software': {
                            'CRITICAL': _0x3923fd,
                            'OK': _0x152b01,
                            'WARNING': _0x1508cc,
                            'UNKNOWN': _0x439914
                        },
                        'application': {
                            'CRITICAL': _0x40ccae,
                            'OK': _0xe10ea8,
                            'WARNING': _0x1b9e3b,
                            'UNKNOWN': _0x498674
                        }
                    };
                    typeof getnewchart === _0x391c27(0x2b2) && fillHostServiceCount(_0x904435);
                    const _0x3f8b4b = document['getElementById'](_0x391c27(0x2a6)),
                        _0x2fa712 = document[_0x391c27(0x268)](_0x391c27(0x1e4));

                    function _0x279961(_0x25f82c) {
                        var _0x16e15e = _0x391c27;
                        _0x25f82c = _0x25f82c[_0x16e15e(0x2a3)](/\s/g, '');
                        const _0x20e63e = {
                            'green': 'rgb(22,\x20211,\x20154)',
                            'red': _0x16e15e(0x284),
                            'white': _0x16e15e(0x253),
                            'orange': 'rgb(233,\x20145,\x2035)',
                            'black': _0x16e15e(0x25d)
                        };
                        if (_0x25f82c in _0x20e63e) return _0x25f82c;
                        const _0x1975f1 = _0x25f82c[_0x16e15e(0x1f5)](/\d+/g);
                        if (!_0x1975f1 || _0x1975f1[_0x16e15e(0x272)] !== 0x3) return _0x16e15e(0x1f7);
                        const [_0x36d554, _0x314975, _0x1bce3f] = _0x1975f1[_0x16e15e(0x209)](Number);
                        let _0x1a6c5f = _0x16e15e(0x1f7),
                            _0x48d4ee = Number[_0x16e15e(0x1f0)];
                        for (const _0x32ba21 in _0x20e63e) {
                            const _0x22fe48 = _0x20e63e[_0x32ba21],
                                [_0x44f83b, _0x57189a, _0x4a5630] = _0x22fe48['match'](/\d+/g)['map'](Number),
                                _0x4c3e01 = Math[_0x16e15e(0x290)]((_0x44f83b - _0x36d554) ** 0x2 + (_0x57189a - _0x314975) ** 0x2 + (_0x4a5630 - _0x1bce3f) ** 0x2);
                            _0x4c3e01 < _0x48d4ee && (_0x48d4ee = _0x4c3e01, _0x1a6c5f = _0x32ba21);
                        }
                        return _0x1a6c5f;
                    }

                    function _0x3c23e0(_0x380b09, _0x2a5dc2, _0x2e9793) {
                        var _0x4da675 = _0x391c27;
                        const _0x366f54 = [_0x4da675(0x24c), 'orange_class', _0x4da675(0x231), _0x4da675(0x263), 'black_class'];
                        _0x366f54[_0x4da675(0x211)](_0x1f0c93 => {
                            var _0x40fbf3 = _0x4da675;
                            _0x2a5dc2[_0x40fbf3(0x296)][_0x40fbf3(0x226)](_0x1f0c93);
                        });
                        const _0x3aed00 = _0x279961(_0x2a5dc2[_0x4da675(0x233)][_0x4da675(0x1fa)]);
                        _0x3aed00 && _0x2a5dc2[_0x4da675(0x296)][_0x4da675(0x29b)](_0x3aed00 + _0x4da675(0x23d));
                        const _0x1219e6 = Array[_0x4da675(0x266)](_0x380b09['querySelectorAll']('a')),
                            _0x507b77 = _0x1219e6[_0x4da675(0x254)](_0x154e58 => _0x1a9e31(_0x2a5dc2, _0x154e58) < 0x0);
                        _0x507b77 === -0x1 ? _0x380b09[_0x4da675(0x2a9)](_0x2a5dc2) : _0x380b09[_0x4da675(0x29c)](_0x2a5dc2, _0x1219e6[_0x507b77]);
                    }

                    function _0x3fc713(_0x53b099) {
                        var _0x2528db = _0x391c27;
                        const _0x39980e = [_0x2528db(0x24c), 'orange_class', _0x2528db(0x231), _0x2528db(0x263), 'black_class'],
                            _0x571593 = [];
                        _0x39980e[_0x2528db(0x211)](_0x138549 => {
                            var _0x4ff824 = _0x2528db;
                            const _0x34828f = Array[_0x4ff824(0x266)](_0x53b099[_0x4ff824(0x238)](_0x138549));
                            _0x34828f['sort'](_0x1a9e31), _0x571593['push'](..._0x34828f);
                        }), _0x53b099[_0x2528db(0x1e2)] = '', _0x571593['forEach'](_0x3aec9f => {
                            var _0x182599 = _0x2528db;
                            _0x53b099[_0x182599(0x2a9)](_0x3aec9f);
                        }), Object['keys'](map)[_0x2528db(0x211)](_0x2330ca => {
                            var _0x3689df = _0x2528db;
                            map[_0x2330ca][_0x3689df(0x237)]();
                        });
                    }

                    function _0x1a9e31(_0x45f394, _0x1a2395) {
                        var _0x4b9fe8 = _0x391c27;
                        const _0x3b2f73 = [_0x4b9fe8(0x275), _0x4b9fe8(0x239), _0x4b9fe8(0x1e1), _0x4b9fe8(0x22b), _0x4b9fe8(0x2b5)],
                            _0x3231f8 = _0x45f394[_0x4b9fe8(0x208)]('.badge'),
                            _0x2dadd3 = _0x1a2395[_0x4b9fe8(0x208)]('.badge'),
                            _0x59df45 = _0x7a0af5(_0x3231f8['style'][_0x4b9fe8(0x2ad)]),
                            _0x3b0887 = _0x7a0af5(_0x2dadd3[_0x4b9fe8(0x233)]['backgroundColor']),
                            _0x190cf7 = parseInt(_0x3231f8['querySelector'](_0x4b9fe8(0x241))[_0x4b9fe8(0x25c)]),
                            _0x3950f4 = parseInt(_0x2dadd3['querySelector']('.num-data')[_0x4b9fe8(0x25c)]);
                        return _0x59df45 === _0x3b0887 ? _0x3950f4 - _0x190cf7 : _0x11e0a0(_0x59df45, _0x3b0887);
                    }

                    function _0x11e0a0(_0x4595b4, _0x481217) {
                        var _0x2bc654 = _0x391c27;
                        const _0x33ee32 = [_0x2bc654(0x275), _0x2bc654(0x239), _0x2bc654(0x1e1), _0x2bc654(0x22b), _0x2bc654(0x2b5)];
                        return _0x33ee32[_0x2bc654(0x2ba)](_0x4595b4) - _0x33ee32['indexOf'](_0x481217);
                    }

                    function _0x7a0af5(_0x94598c) {
                        var _0x128005 = _0x391c27;
                        if (_0x94598c[_0x128005(0x1f1)](_0x128005(0x1de))) {
                            const _0x11d4f6 = _0x94598c[_0x128005(0x1f5)](/\d+/g);
                            if (_0x11d4f6 && _0x11d4f6['length'] === 0x3) return _0x128005(0x1fc) + _0x11d4f6[0x0] + ',\x20' + _0x11d4f6[0x1] + ',\x20' + _0x11d4f6[0x2] + ')';
                        }
                        return _0x94598c[_0x128005(0x22d)]()[_0x128005(0x22c)]();
                    }
                    changedElement = document['getElementById'](_0x391c27(0x216) + _0x11b532 + _0x391c27(0x247));
                    if (_0x3f8b4b[_0x391c27(0x251)](changedElement)) _0x3c23e0(_0x3f8b4b, changedElement, _0x391c27(0x2a6)), _0x3fc713(_0x3f8b4b);
                    else _0x2fa712[_0x391c27(0x251)](changedElement) && (_0x3c23e0(_0x2fa712, changedElement, _0x391c27(0x1e4)), _0x3fc713(_0x2fa712));
                    update[_0x391c27(0x215)](_0x391c27(0x252)) && (update[_0x391c27(0x252)]['includes'](_0x391c27(0x23a)) && update['mode'] != undefined && requestDataFromServer(_0x391c27(0x24f), {
                        'title': update['ip'],
                        'required': _0x391c27(0x204),
                        'sitename': selectedsite
                    }, _0x391c27(0x21c))['done'](function (_0x168f72) {
                        var _0x338b53 = _0x391c27,
                            _0x2b7c = JSON[_0x338b53(0x212)](_0x168f72);
                        messagedata = _0x2b7c[_0x338b53(0x262)][_0x338b53(0x262)];
                        var _0x424e0c = document[_0x338b53(0x268)](update['ip'] + ':NIC'),
                            _0x4b1b56 = document[_0x338b53(0x268)](messagedata + _0x338b53(0x247));
                        if (_0x424e0c != null && _0x4b1b56 != null && _0x4b1b56 != undefined) {
                            if (update[_0x338b53(0x245)]['toString']() == '0') map['s' + update['ip'][_0x338b53(0x28e)]('.', '_')] ? (map['s' + update['ip']['replaceAll']('.', '_')][_0x338b53(0x226)](), map['s' + update['ip']['replaceAll']('.', '_')] = new LeaderLine(_0x424e0c, _0x4b1b56, {
                                'color': _0x338b53(0x29e),
                                'positionByWindowResize': ![],
                                'size': 0x2,
                                'endPlug': _0x338b53(0x2b3),
                                'startPlug': _0x338b53(0x1e3),
                                'startPlugColor': _0x338b53(0x275),
                                'outlineColor': _0x338b53(0x275),
                                'endPlugColor': 'red',
                                'outline': !![],
                                'startPlugOutline': !![],
                                'endPlugOutline': !![],
                                'startPlugOutlineColor': _0x338b53(0x1ff),
                                'endPlugOutlineColor': '#000000'
                            }), $(_0x338b53(0x236))['on']('scroll', AnimEvent['add'](function () {
                                var _0x274926 = _0x338b53;
                                map['s' + update['ip'][_0x274926(0x28e)]('.', '_')][_0x274926(0x237)]();
                            }))) : (map['s' + update['ip'][_0x338b53(0x28e)]('.', '_')] = new LeaderLine(_0x424e0c, _0x4b1b56, {
                                'color': '#ff3d57',
                                'positionByWindowResize': ![],
                                'size': 0x2,
                                'endPlug': 'square',
                                'startPlug': 'disc',
                                'startPlugColor': _0x338b53(0x275),
                                'outlineColor': _0x338b53(0x275),
                                'endPlugColor': _0x338b53(0x275),
                                'outline': !![],
                                'startPlugOutline': !![],
                                'endPlugOutline': !![],
                                'startPlugOutlineColor': '#000000',
                                'endPlugOutlineColor': _0x338b53(0x1ff)
                            }), $('#g-switch,\x20#g-div,\x20#s_hw,\x20#server-div')['on'](_0x338b53(0x2ae), AnimEvent['add'](function () {
                                var _0x1c0046 = _0x338b53;
                                map['s' + update['ip'][_0x1c0046(0x28e)]('.', '_')][_0x1c0046(0x237)]();
                            }))), getniccondata(update['ip'], messagedata, update['status'][_0x338b53(0x225)](), map['s' + update['ip'][_0x338b53(0x28e)]('.', '_')]);
                            else {
                                var _0x246f30 = '';
                                switch (update[_0x338b53(0x245)]) {
                                    case 0x1:
                                        _0x2ee6cc = _0x338b53(0x22a), _0x246f30 = _0x338b53(0x239);
                                        break;
                                    case 0x2:
                                        _0x2ee6cc = '#16d39a', _0x246f30 = _0x338b53(0x22b);
                                        break;
                                    default:
                                        _0x246f30 = _0x338b53(0x2a1), _0x2ee6cc = _0x338b53(0x29e);
                                }
                                map['s' + update['ip'][_0x338b53(0x28e)]('.', '_')] ? (map['s' + update['ip'][_0x338b53(0x28e)]('.', '_')][_0x338b53(0x226)](), map['s' + update['ip'][_0x338b53(0x28e)]('.', '_')] = new LeaderLine(_0x424e0c, _0x4b1b56, {
                                    'color': _0x2ee6cc,
                                    'hide': !![],
                                    'positionByWindowResize': ![],
                                    'size': 0x2,
                                    'endPlug': _0x338b53(0x2b3),
                                    'startPlug': _0x338b53(0x1e3),
                                    'startPlugColor': _0x246f30,
                                    'outlineColor': _0x246f30,
                                    'endPlugColor': _0x246f30,
                                    'outline': !![],
                                    'startPlugOutline': !![],
                                    'endPlugOutline': !![],
                                    'startPlugOutlineColor': '#000000',
                                    'endPlugOutlineColor': _0x338b53(0x1ff)
                                })) : map['s' + update['ip'][_0x338b53(0x28e)]('.', '_')] = new LeaderLine(_0x424e0c, _0x4b1b56, {
                                    'color': _0x2ee6cc,
                                    'hide': !![],
                                    'positionByWindowResize': ![],
                                    'size': 0x2,
                                    'endPlug': _0x338b53(0x2b3),
                                    'startPlug': _0x338b53(0x1e3),
                                    'startPlugColor': _0x246f30,
                                    'outlineColor': _0x246f30,
                                    'endPlugColor': _0x246f30,
                                    'outline': !![],
                                    'startPlugOutline': !![],
                                    'endPlugOutline': !![],
                                    'startPlugOutlineColor': _0x338b53(0x1ff),
                                    'endPlugOutlineColor': _0x338b53(0x1ff)
                                }), _0x424e0c[_0x338b53(0x22e)](_0x338b53(0x20c), function () {
                                    var _0x5852a1 = _0x338b53;
                                    map['s' + update['ip'][_0x5852a1(0x28e)]('.', '_')][_0x5852a1(0x21e)]([_0x5852a1(0x299)[{
                                        'duration': 0x12c,
                                        'timing': 'linear'
                                    }]]);
                                }, ![]), _0x424e0c[_0x338b53(0x22e)](_0x338b53(0x219), function () {
                                    var _0x33b180 = _0x338b53;
                                    map['s' + update['ip']['replaceAll']('.', '_')][_0x33b180(0x224)]([_0x33b180(0x299)[{
                                        'duration': 0x12c,
                                        'timing': _0x33b180(0x1eb)
                                    }]]);
                                }, ![]), $(_0x338b53(0x236))['on'](_0x338b53(0x2ae), AnimEvent['add'](function () {
                                    var _0x4bb010 = _0x338b53;
                                    map['s' + update['ip'][_0x4bb010(0x28e)]('.', '_')][_0x4bb010(0x237)]();
                                })), getniccondata(update['ip'], map['s' + update['ip']['replaceAll']('.', '_')]);
                            }
                        } else {
                            if (update[_0x338b53(0x207)] != null && Object[_0x338b53(0x21b)](update['Nics_list'])[_0x338b53(0x272)] && jQuery[_0x338b53(0x26f)](update['Nics_list']) != !![]) {
                                var _0x50ee38 = update[_0x338b53(0x227)][_0x338b53(0x28e)]('.', '_'),
                                    _0x166689 = update['title'][_0x338b53(0x28e)]('.', '_') + '_tooltip',
                                    _0x3f514c = _0x338b53(0x2a2),
                                    _0x53e31f = '',
                                    _0x5efb9a = '',
                                    _0xadc2b1 = '',
                                    _0x376acb = update['mode'],
                                    _0x49d50e = '';
                                for (const [_0x2f1aa4, _0x191c23] of Object[_0x338b53(0x26d)](JSON[_0x338b53(0x212)](update[_0x338b53(0x207)]))) {
                                    if (_0x191c23['ip'] != undefined) {
                                        if (_0x191c23[_0x338b53(0x245)] == 0x0) _0x50ee38 = _0x50ee38 + '\x20' + _0x2f1aa4[_0x338b53(0x28e)]('.', '_') + ':' + _0x376acb, _0x5efb9a += _0x338b53(0x28d) + _0x2f1aa4[_0x338b53(0x28e)]('.', '_') + ':' + _0x376acb + _0x338b53(0x283) + _0x2f1aa4 + '(' + _0x191c23[_0x338b53(0x280)] + _0x338b53(0x281) + _0x191c23['ip'] + _0x338b53(0x22f);
                                        else {
                                            if (_0x191c23[_0x338b53(0x245)] == 0x2) _0x50ee38 = _0x50ee38 + '\x20' + _0x2f1aa4[_0x338b53(0x28e)]('.', '_') + ':' + _0x376acb, _0x53e31f += _0x338b53(0x267) + _0x2f1aa4[_0x338b53(0x28e)]('.', '_') + ':' + _0x376acb + _0x338b53(0x283) + _0x2f1aa4 + '(' + _0x191c23[_0x338b53(0x280)] + ')-</td>\x20<td>' + _0x191c23['ip'] + _0x338b53(0x22f);
                                            else _0x191c23[_0x338b53(0x245)] == 0x3 && (_0x50ee38 = _0x50ee38 + '\x20' + _0x2f1aa4['replaceAll']('.', '_') + ':' + _0x376acb, _0xadc2b1 += '<tr><td\x20id=\x22' + _0x2f1aa4[_0x338b53(0x28e)]('.', '_') + ':' + _0x376acb + _0x338b53(0x283) + _0x2f1aa4 + '(' + _0x191c23['alias'] + _0x338b53(0x281) + _0x191c23['ip'] + _0x338b53(0x22f));
                                        }
                                    } else {
                                        var _0x50d78b = _0x2f1aa4[_0x338b53(0x28e)]('.', '_');
                                        if (_0x50d78b[_0x338b53(0x25f)]('-')) _0x50d78b = _0x50d78b[_0x338b53(0x28e)]('-', '_');
                                        if (_0x191c23['status'] == 0x0) _0x50ee38 = _0x50ee38 + '\x20' + _0x191c23[_0x338b53(0x1e5)][_0x338b53(0x28e)]('.', '_') + ':' + _0x376acb, _0x5efb9a += _0x338b53(0x28d) + _0x50d78b + ':' + _0x376acb + '\x22\x20>' + _0x2f1aa4 + '(' + _0x191c23['alias'] + _0x338b53(0x281) + _0x191c23['mac'] + _0x338b53(0x22f);
                                        else {
                                            if (_0x191c23['status'] == 0x2) _0x50ee38 = _0x50ee38 + '\x20' + _0x191c23[_0x338b53(0x1e5)]['replaceAll']('.', '_') + ':' + _0x376acb, _0x53e31f += _0x338b53(0x267) + _0x50d78b + ':' + _0x376acb + _0x338b53(0x283) + _0x2f1aa4 + '(' + _0x191c23['alias'] + _0x338b53(0x281) + _0x191c23[_0x338b53(0x1e5)] + _0x338b53(0x22f);
                                            else _0x191c23[_0x338b53(0x245)] == 0x3 && (_0x50ee38 = _0x50ee38 + '\x20' + _0x191c23[_0x338b53(0x1e5)][_0x338b53(0x28e)]('.', '_') + ':' + _0x376acb, _0xadc2b1 += '<tr><td\x20id=\x22' + _0x50d78b + ':' + _0x376acb + _0x338b53(0x283) + _0x2f1aa4 + '(' + _0x191c23[_0x338b53(0x280)] + _0x338b53(0x281) + _0x191c23['mac'] + '</td></tr>');
                                        }
                                    }
                                }
                                _0x3f514c += _0x5efb9a + _0x53e31f + _0xadc2b1, _0x3f514c += _0x338b53(0x21d), _nodehtml = '<div\x20class=\x22col-10\x22\x20style=\x22padding-left:0\x22\x20>' + _0x376acb + _0x338b53(0x1df) + _0x166689 + 'tltp-pin\x22\x20style=\x22\x20z-index:1000;\x22\x20onclick=\x22pintool(\x27' + _0x166689 + '\x27)\x22></i>' + _0x3f514c;
                                if (document[_0x338b53(0x268)](_0x166689) != null) document['getElementById'](_0x166689)[_0x338b53(0x1e2)] = _nodehtml;
                            }
                        }
                    }));
                    if (update[_0x391c27(0x204)] != 'null' && jQuery[_0x391c27(0x26f)](update[_0x391c27(0x204)]) != !![] && jQuery[_0x391c27(0x26f)](update[_0x391c27(0x252)]) == !![] && update[_0x391c27(0x245)] != 0x4) {
                        var _0x44f408 = '';
                        if (update[_0x391c27(0x227)]['includes'](':p')) _0x44f408 = 'p_' + update['ip']['replaceAll']('.', '_');
                        else update[_0x391c27(0x227)][_0x391c27(0x25f)](':s') && (_0x44f408 = 's_' + update['ip'][_0x391c27(0x28e)]('.', '_'));
                        var _0x1ef1eb = document[_0x391c27(0x268)](_0x44f408)[_0x391c27(0x268)](_0x1e85e4),
                            _0x1e9aaf = '';
                        if (update[_0x391c27(0x204)][_0x391c27(0x25f)](':') && document['getElementById'](update['link'][_0x391c27(0x214)](':')[0x0][_0x391c27(0x28e)]('.', '_')) != null) {
                            var _0x4d4673 = '';
                            if (update['link'][_0x391c27(0x25f)](':p')) _0x4d4673 = 'p_' + update[_0x391c27(0x204)][_0x391c27(0x214)](':')[0x0][_0x391c27(0x28e)]('.', '_');
                            else update[_0x391c27(0x204)][_0x391c27(0x25f)](':s') && (_0x4d4673 = 's_' + update[_0x391c27(0x204)]['split'](':')[0x0][_0x391c27(0x28e)]('.', '_'));
                            _0x1e9aaf = document['getElementById'](_0x4d4673)['getElementById'](update['link'][_0x391c27(0x214)](':')[0x1]);
                        } else {
                            var _0x3d5628 = document[_0x391c27(0x238)](update['link'][_0x391c27(0x214)](':')[0x0][_0x391c27(0x28e)]('.', '_') + _0x391c27(0x247));
                            _0x1e9aaf = _0x3d5628[0x0];
                        }
                        var _0x507099 = update['ip'][_0x391c27(0x28e)]('.', '_');
                        if (_0x1e85e4 != undefined && _0x1e85e4 != null && _0x1ef1eb != null && _0x1e9aaf != null && _0x1e9aaf != undefined) {
                            $('#' + update['ip'][_0x391c27(0x28e)]('.', '_') + '\x20#' + update[_0x391c27(0x1f4)]['replaceAll']('/', '_'))[_0x391c27(0x24a)](_0x391c27(0x26e), color);
                            var _0x2ee6cc;
                            if (update['status'][_0x391c27(0x225)]() == '2') map['l' + _0x507099 + _0x1e85e4] ? (map['l' + _0x507099 + _0x1e85e4]['remove'](), map['l' + _0x507099 + _0x1e85e4] = new LeaderLine(_0x1ef1eb, _0x1e9aaf, {
                                'color': _0x391c27(0x26a),
                                'hide': !![],
                                'positionByWindowResize': ![],
                                'size': 0x2,
                                'endPlug': _0x391c27(0x2b3),
                                'startPlug': _0x391c27(0x1e3),
                                'startPlugColor': _0x391c27(0x22b),
                                'outlineColor': _0x391c27(0x22b),
                                'endPlugColor': _0x391c27(0x22b),
                                'outline': !![],
                                'startPlugOutline': !![],
                                'endPlugOutline': !![],
                                'startPlugOutlineColor': _0x391c27(0x1ff),
                                'endPlugOutlineColor': '#000000'
                            }), _0x1ef1eb[_0x391c27(0x22e)]('mouseover', function () {
                                var _0x111b42 = _0x391c27;
                                map['l' + _0x507099 + _0x1e85e4]['show']([_0x111b42(0x299)[{
                                    'duration': 0x12c,
                                    'timing': 'linear'
                                }]]);
                            }, ![]), _0x1ef1eb['addEventListener'](_0x391c27(0x219), function () {
                                var _0x4ba952 = _0x391c27;
                                map['l' + _0x507099 + _0x1e85e4]['hide']([_0x4ba952(0x299)[{
                                    'duration': 0x12c,
                                    'timing': _0x4ba952(0x1eb)
                                }]]);
                            }, ![]), _0x1e9aaf[_0x391c27(0x22e)](_0x391c27(0x20c), function () {
                                var _0x2e0cf9 = _0x391c27;
                                map['l' + _0x507099 + _0x1e85e4][_0x2e0cf9(0x21e)]([_0x2e0cf9(0x299)[{
                                    'duration': 0x12c,
                                    'timing': _0x2e0cf9(0x1eb)
                                }]]);
                            }, ![]), _0x1e9aaf[_0x391c27(0x22e)]('mouseout', function () {
                                var _0x323a8f = _0x391c27;
                                map['l' + _0x507099 + _0x1e85e4][_0x323a8f(0x224)]([_0x323a8f(0x299)[{
                                    'duration': 0x12c,
                                    'timing': _0x323a8f(0x1eb)
                                }]]);
                            }, ![]), $(_0x391c27(0x1ee))['on'](_0x391c27(0x2ae), AnimEvent[_0x391c27(0x29b)](function () {
                                map['l' + _0x507099 + _0x1e85e4]['position']();
                            }))) : (map['l' + _0x507099 + _0x1e85e4] = new LeaderLine(_0x1ef1eb, _0x1e9aaf, {
                                'color': '#ff3d57',
                                'hide': !![],
                                'positionByWindowResize': ![],
                                'size': 0x2,
                                'endPlug': _0x391c27(0x2b3),
                                'startPlug': _0x391c27(0x1e3),
                                'startPlugColor': _0x391c27(0x275),
                                'outlineColor': _0x391c27(0x275),
                                'endPlugColor': _0x391c27(0x275),
                                'outline': !![],
                                'startPlugOutline': !![],
                                'endPlugOutline': !![],
                                'startPlugOutlineColor': '#000000',
                                'endPlugOutlineColor': '#000000'
                            }), _0x1ef1eb[_0x391c27(0x22e)](_0x391c27(0x20c), function () {
                                var _0x103f15 = _0x391c27;
                                map['l' + _0x507099 + _0x1e85e4][_0x103f15(0x21e)](['fade'[{
                                    'duration': 0x12c,
                                    'timing': _0x103f15(0x1eb)
                                }]]);
                            }, ![]), _0x1ef1eb[_0x391c27(0x22e)](_0x391c27(0x219), function () {
                                var _0x112a0a = _0x391c27;
                                map['l' + _0x507099 + _0x1e85e4][_0x112a0a(0x224)]([_0x112a0a(0x299)[{
                                    'duration': 0x12c,
                                    'timing': _0x112a0a(0x1eb)
                                }]]);
                            }, ![]), _0x1e9aaf[_0x391c27(0x22e)](_0x391c27(0x20c), function () {
                                var _0x4df0c1 = _0x391c27;
                                map['l' + _0x507099 + _0x1e85e4]['show']([_0x4df0c1(0x299)[{
                                    'duration': 0x12c,
                                    'timing': _0x4df0c1(0x1eb)
                                }]]);
                            }, ![]), _0x1e9aaf[_0x391c27(0x22e)](_0x391c27(0x219), function () {
                                var _0x177e39 = _0x391c27;
                                map['l' + _0x507099 + _0x1e85e4]['hide']([_0x177e39(0x299)[{
                                    'duration': 0x12c,
                                    'timing': _0x177e39(0x1eb)
                                }]]);
                            }, ![]), $(_0x391c27(0x1ee))['on']('scroll', AnimEvent[_0x391c27(0x29b)](function () {
                                var _0x59eabe = _0x391c27;
                                map['l' + _0x507099 + _0x1e85e4][_0x59eabe(0x237)]();
                            }))), updatedarrowdata(update['ip'], _0x1e85e4, update[_0x391c27(0x204)], update[_0x391c27(0x245)], map['l' + _0x507099 + _0x1e85e4]);
                            else {
                                var _0x440d37 = '';
                                switch (update[_0x391c27(0x245)]) {
                                    case 0x0:
                                        _0x2ee6cc = _0x391c27(0x29e), _0x440d37 = 'red';
                                        break;
                                    case 0x1:
                                        _0x2ee6cc = '#e59105', _0x440d37 = _0x391c27(0x239);
                                        break;
                                    default:
                                        _0x440d37 = _0x391c27(0x2a1), _0x2ee6cc = _0x391c27(0x2b1);
                                }
                                var _0x5d7bfe = '',
                                    _0x43fbf6 = '',
                                    _0x5b8ac3 = '';
                                map['l' + _0x507099 + _0x1e85e4] ? (map['l' + _0x507099 + _0x1e85e4][_0x391c27(0x226)](), map['l' + _0x507099 + _0x1e85e4] = new LeaderLine(_0x1ef1eb, _0x1e9aaf, {
                                    'color': _0x2ee6cc,
                                    'positionByWindowResize': ![],
                                    'size': 0x2,
                                    'endPlug': 'square',
                                    'startPlug': 'disc',
                                    'startPlugColor': _0x440d37,
                                    'outlineColor': _0x440d37,
                                    'endPlugColor': _0x440d37,
                                    'outline': !![],
                                    'startPlugOutline': !![],
                                    'endPlugOutline': !![],
                                    'startPlugOutlineColor': _0x391c27(0x1ff),
                                    'endPlugOutlineColor': '#000000'
                                })) : map['l' + _0x507099 + _0x1e85e4] = new LeaderLine(_0x1ef1eb, _0x1e9aaf, {
                                    'color': _0x2ee6cc,
                                    'positionByWindowResize': ![],
                                    'size': 0x2,
                                    'endPlug': _0x391c27(0x2b3),
                                    'startPlug': 'disc',
                                    'startPlugColor': _0x440d37,
                                    'outlineColor': _0x440d37,
                                    'endPlugColor': _0x440d37,
                                    'outline': !![],
                                    'startPlugOutline': !![],
                                    'endPlugOutline': !![],
                                    'startPlugOutlineColor': _0x391c27(0x1ff),
                                    'endPlugOutlineColor': _0x391c27(0x1ff)
                                }), _0x1ef1eb[_0x391c27(0x22e)](_0x391c27(0x20c), function () {
                                    var _0x5a49c8 = _0x391c27;
                                    map['l' + _0x507099 + _0x1e85e4][_0x5a49c8(0x21e)]([_0x5a49c8(0x299)[{
                                        'duration': 0x12c,
                                        'timing': _0x5a49c8(0x1eb)
                                    }]]);
                                }, ![]), _0x1ef1eb[_0x391c27(0x22e)]('mouseout', function () {
                                    var _0x1cf4a7 = _0x391c27;
                                    map['l' + _0x507099 + _0x1e85e4]['show']([_0x1cf4a7(0x299)[{
                                        'duration': 0x12c,
                                        'timing': _0x1cf4a7(0x1eb)
                                    }]]);
                                }, ![]), _0x1e9aaf[_0x391c27(0x22e)](_0x391c27(0x20c), function () {
                                    var _0x171264 = _0x391c27;
                                    map['l' + _0x507099 + _0x1e85e4]['show']([_0x171264(0x299)[{
                                        'duration': 0x12c,
                                        'timing': _0x171264(0x1eb)
                                    }]]);
                                }, ![]), _0x1e9aaf[_0x391c27(0x22e)](_0x391c27(0x219), function () {
                                    var _0x21855f = _0x391c27;
                                    map['l' + _0x507099 + _0x1e85e4][_0x21855f(0x21e)](['fade'[{
                                        'duration': 0x12c,
                                        'timing': _0x21855f(0x1eb)
                                    }]]);
                                }, ![]), $('#g-switch,\x20#p-switch,\x20#p_swi,\x20#f-switch,\x20#f_swi,\x20#e_swi,\x20#e-switch,\x20#g-div,\x20#s_hw,\x20#server-div')['on']('scroll', AnimEvent['add'](function () {
                                    var _0x5ec3b9 = _0x391c27;
                                    map['l' + _0x507099 + _0x1e85e4][_0x5ec3b9(0x237)]();
                                })), updatedarrowdata(update['ip'], _0x1e85e4, update['link'], update[_0x391c27(0x245)], map['l' + _0x507099 + _0x1e85e4]);
                            }
                        }
                    }
                }), $(_0x1b2d2c(0x270) + _0x16d791['id'] + _0x1b2d2c(0x230))['css'](_0x1b2d2c(0x26e), _0x1b2d2c(0x26a));
            },
                _0x4eaf6b = function (_0x5bdd96) {
                    var _0xde3095 = _0x163448;
                    $(_0xde3095(0x270) + _0x16d791['id'] + _0xde3095(0x230))[_0xde3095(0x24a)](_0xde3095(0x26e), _0xde3095(0x29e));
                    var _0x3c7253 = sitesData[0x0];
                    _0x3c7253['isWSConnected'] = ![], isToBeConnect = !{}[!![]], document['getElementById'](_0x3ba409 + _0xde3095(0x246))[_0xde3095(0x1f3)] = 'False(' + _0x16d791[_0xde3095(0x1e0)] + ')', document['getElementById'](_0x3ba409 + _0xde3095(0x246))['style']['color'] = _0xde3095(0x29e), document[_0xde3095(0x268)](_0xde3095(0x289))[_0xde3095(0x233)]['color'] = '#ff3d57', $(_0xde3095(0x205) + _0x3ba409)[_0xde3095(0x24a)]('display', _0xde3095(0x23b)), document[_0xde3095(0x268)](_0x3ba409 + _0xde3095(0x202))[_0xde3095(0x1f3)] = _0xde3095(0x25b) + switchlastreconnect, _0x16d791['connectionTries']++;
                    const _0x3d2c78 = new Date(),
                        _0x1d2f40 = new Date(_0x3d2c78);
                    var _0x2cdeb4 = _0x1d2f40[_0xde3095(0x2b9)]() + 0x1,
                        _0x566d49 = _0x1d2f40[_0xde3095(0x229)](),
                        _0x487a3e = _0x1d2f40[_0xde3095(0x28a)](),
                        _0x3670e4 = _0x1d2f40[_0xde3095(0x20d)](),
                        _0x1c0811 = _0x1d2f40[_0xde3095(0x28f)](),
                        _0x22687a = _0x1d2f40['getSeconds'](),
                        _0x5b9f50 = _0x566d49 + '/' + _0x2cdeb4 + '/' + _0x487a3e + '\x20' + _0x3670e4 + ':' + _0x1c0811 + ':' + _0x22687a;
                    switchlastreconnect = _0x5b9f50[_0xde3095(0x235)]();
                    if (networkStatus === _0xde3095(0x2ac)) {
                        if (_0x16d791[_0xde3095(0x1e0)] >= 0xa) isToBeConnect = !{}[!![]];
                        else {
                            const _0x4925d9 = new Date(),
                                _0x19c2ec = new Date(_0x4925d9);
                            var _0x2cdeb4 = _0x19c2ec[_0xde3095(0x2b9)]() + 0x1,
                                _0x566d49 = _0x19c2ec['getDate'](),
                                _0x487a3e = _0x19c2ec[_0xde3095(0x28a)](),
                                _0x3670e4 = _0x19c2ec[_0xde3095(0x20d)](),
                                _0x1c0811 = _0x19c2ec[_0xde3095(0x28f)](),
                                _0x22687a = _0x19c2ec[_0xde3095(0x264)](),
                                _0x5b9f50 = _0x566d49 + '/' + _0x2cdeb4 + '/' + _0x487a3e + '\x20' + _0x3670e4 + ':' + _0x1c0811 + ':' + _0x22687a;
                            switchlastreconnect = _0x5b9f50[_0xde3095(0x235)](), document[_0xde3095(0x268)](_0x3ba409 + _0xde3095(0x246))[_0xde3095(0x1f3)] = _0xde3095(0x210) + _0x16d791[_0xde3095(0x1e0)] + ')', document[_0xde3095(0x268)](_0x3ba409 + _0xde3095(0x246))[_0xde3095(0x233)]['color'] = '#e99123', document['getElementById']('swit-pipe')[_0xde3095(0x233)]['color'] = _0xde3095(0x240), $(_0xde3095(0x205) + _0x3ba409)[_0xde3095(0x24a)](_0xde3095(0x1fb), 'block'), document['getElementById'](_0x3ba409 + _0xde3095(0x202))['innerText'] = _0xde3095(0x25b) + switchlastreconnect, (isToBeConnect = {}[!![]]) && makeWebSwitchConnection(_0x16d791['ws'][_0xde3095(0x271)], _0x16d791['id'], _0x16d791[_0xde3095(0x1e0)]);
                        }
                    }
                };
            _0x16d791[_0x163448(0x286)]('linkedeye', _0x163448(0x282), _0x35e31f, _0x4eaf6b, '/');
        } else alert('Your\x20browser\x20does\x20not\x20support\x20WebSockets.\x20Updates\x20will\x20not\x20work\x20properly.');
    } catch (_0x2b4e37) {
        return;
    }
}