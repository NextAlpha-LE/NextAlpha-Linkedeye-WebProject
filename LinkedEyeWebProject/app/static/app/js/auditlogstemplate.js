var _0x5bea19 = _0x5d00;

function _0x5d00(_0x33e35f, _0x12ebac) {
    var _0x1fb84a = _0x1fb8();
    return _0x5d00 = function (_0x5d007, _0xbc6b20) {
        _0x5d007 = _0x5d007 - 0x15a;
        var _0xf0ece7 = _0x1fb84a[_0x5d007];
        return _0xf0ece7;
    }, _0x5d00(_0x33e35f, _0x12ebac);
}

function _0x1fb8() {
    var _0x3cb01c = ['\x22\x20>', 'created', 'prop', 'status', '\x22\x20data-toggle=\x22tooltip\x22\x20title=\x22', 'disabled', '2gBZzQp', '#auditlogstemplate\x20#table-view', '3nPnECZ', 'msg', '<td\x20style=\x22', 'getMinutes', 'ready', '<td\x20class=\x22date\x20pl-1\x22\x20data-timestamp=\x22', 'data', 'append', 'username', 'getDate', '54078DJgnjj', '#auditlogstemplate\x20#data\x20tbody', 'No\x20logs\x20available', '629072iHByGO', '277692zjjZwg', '3760425BZwpkW', '<td\x20class=\x22username\x22>', '</td>', 'text', '7XoQEIT', '<td\x20class=\x22action\x22>', '<tr\x20id=', 'desc', 'hide', 'done', 'GET', 'sort', '#auditlogstemplate-nodata\x20#nodatamessage', '#auditlogstemplate-nodata\x20#tryagainbtn', 'message', '10KUnSmX', 'forEach', '1043205pLWzrm', '#auditlogstemplate-nodata', '</tr>', 'action', 'show', '/auditlogs/getAuditlogs', '333208VcWlBe', 'display:\x20inline-block;\x20width:\x20400px;\x20white-space:\x20nowrap;\x20overflow:\x20hidden;\x20text-overflow:\x20ellipsis;', 'date', '5324869qzPiWL', 'getHours', 'auditlogstemplate'];
    _0x1fb8 = function () {
        return _0x3cb01c;
    };
    return _0x1fb8();
} (function (_0xada78a, _0x281331) {
    var _0x13928a = _0x5d00,
        _0x50f7ea = _0xada78a();
    while (!![]) {
        try {
            var _0x496ad5 = parseInt(_0x13928a(0x173)) / 0x1 * (parseInt(_0x13928a(0x183)) / 0x2) + -parseInt(_0x13928a(0x175)) / 0x3 * (-parseInt(_0x13928a(0x182)) / 0x4) + -parseInt(_0x13928a(0x161)) / 0x5 + parseInt(_0x13928a(0x17f)) / 0x6 * (-parseInt(_0x13928a(0x188)) / 0x7) + -parseInt(_0x13928a(0x167)) / 0x8 + -parseInt(_0x13928a(0x184)) / 0x9 + parseInt(_0x13928a(0x15f)) / 0xa * (parseInt(_0x13928a(0x16a)) / 0xb);
            if (_0x496ad5 === _0x281331) break;
            else _0x50f7ea['push'](_0x50f7ea['shift']());
        } catch (_0x546ff0) {
            _0x50f7ea['push'](_0x50f7ea['shift']());
        }
    }
}(_0x1fb8, 0x3b0f5));
var logList;
$(document)[_0x5bea19(0x179)](function () {
    getLogs();
});

function getLogs() {
    var _0x2d8c2a = _0x5bea19;
    showLoader(_0x2d8c2a(0x16c)), requestDataFromServer(_0x2d8c2a(0x166), {}, _0x2d8c2a(0x15a))[_0x2d8c2a(0x18d)](logsResponse);
}

function logsResponse(_0x34b9ef) {
    var _0x126ddc = _0x5bea19;
    stopLoader(_0x126ddc(0x16c));
    if (_0x34b9ef[_0x126ddc(0x170)] == 0xc8) {
        $('#auditlogstemplate\x20#table-view')['show'](), $(_0x126ddc(0x162))[_0x126ddc(0x18c)](), _0x34b9ef[_0x126ddc(0x17b)][_0x126ddc(0x160)](function (_0x274092) {
            addLogRow(_0x274092);
        });
        let _0x2366a6 = {
            'valueNames': [_0x126ddc(0x170), 'username', _0x126ddc(0x164), {
                'name': 'date',
                'attr': 'data-timestamp'
            }]
        };
        logList = new List(_0x126ddc(0x16c), _0x2366a6);
    } else _0x34b9ef[_0x126ddc(0x176)] ? msg = _0x34b9ef[_0x126ddc(0x176)] : msg = _0x126ddc(0x181), $(_0x126ddc(0x174))[_0x126ddc(0x18c)](), $(_0x126ddc(0x162))[_0x126ddc(0x165)](), $(_0x126ddc(0x15d))[_0x126ddc(0x16f)](_0x126ddc(0x172), ![]), $(_0x126ddc(0x15c))[_0x126ddc(0x187)](msg);
}

function addLogRow(_0x3013e5) {
    var _0x23cb49 = _0x5bea19,
        _0xb47968 = _0x23cb49(0x168),
        _0x31f6db = new Date(_0x3013e5[_0x23cb49(0x16e)] * 0x3e8),
        _0x9761d9 = _0x31f6db['getFullYear'](),
        _0x5e1e59 = _0x31f6db['getMonth'](),
        _0x15c899 = _0x31f6db[_0x23cb49(0x17e)](),
        _0x5bc88f = _0x31f6db[_0x23cb49(0x16b)](),
        _0x1917cd = _0x31f6db[_0x23cb49(0x178)](),
        _0x1ee80e = _0x31f6db['getSeconds']();
    createdDate = _0x15c899 + '\x20' + month[_0x5e1e59] + ',\x20' + _0x9761d9 + '\x20' + _0x5bc88f + ':' + _0x1917cd + ':' + _0x1ee80e, logHtml = '\x20', logHtml += _0x23cb49(0x18a) + _0x3013e5['id'] + '>', logHtml += _0x23cb49(0x17a) + _0x3013e5['created'] + _0x23cb49(0x16d) + createdDate + _0x23cb49(0x186), logHtml += _0x23cb49(0x185) + _0x3013e5[_0x23cb49(0x17d)] + _0x23cb49(0x186), logHtml += _0x23cb49(0x189) + _0x3013e5[_0x23cb49(0x164)] + _0x23cb49(0x186), logHtml += '<td\x20class=\x22status\x22>' + _0x3013e5[_0x23cb49(0x170)] + _0x23cb49(0x186), logHtml += _0x23cb49(0x177) + _0xb47968 + _0x23cb49(0x171) + _0x3013e5[_0x23cb49(0x15e)] + '\x22>' + _0x3013e5[_0x23cb49(0x15e)] + '</td>', logHtml += _0x23cb49(0x163), $(_0x23cb49(0x180))[_0x23cb49(0x17c)](logHtml);
}

function onRecentLogs() {
    var _0x2ef6cb = _0x5bea19;
    logList[_0x2ef6cb(0x15b)](_0x2ef6cb(0x169), {
        'order': _0x2ef6cb(0x18b)
    });
}