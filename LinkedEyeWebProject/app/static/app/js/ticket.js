var _0x274090 = _0x4b74;
(function (_0xbea950, _0x185054) {
    var _0x3d7b97 = _0x4b74,
        _0x59a87b = _0xbea950();
    while (!![]) {
        try {
            var _0x49b409 = -parseInt(_0x3d7b97(0x156)) / 0x1 + -parseInt(_0x3d7b97(0x150)) / 0x2 + parseInt(_0x3d7b97(0x10c)) / 0x3 * (-parseInt(_0x3d7b97(0xc8)) / 0x4) + parseInt(_0x3d7b97(0x184)) / 0x5 * (-parseInt(_0x3d7b97(0xb3)) / 0x6) + -parseInt(_0x3d7b97(0x149)) / 0x7 + parseInt(_0x3d7b97(0x131)) / 0x8 * (-parseInt(_0x3d7b97(0x169)) / 0x9) + -parseInt(_0x3d7b97(0xc4)) / 0xa * (-parseInt(_0x3d7b97(0x177)) / 0xb);
            if (_0x49b409 === _0x185054) break;
            else _0x59a87b['push'](_0x59a87b['shift']());
        } catch (_0x3fbe11) {
            _0x59a87b['push'](_0x59a87b['shift']());
        }
    }
}(_0x1044, 0x4be3c), google[_0x274090(0xf0)][_0x274090(0x13f)](_0x274090(0x161), {
    'packages': ['corechart']
}), google[_0x274090(0xf0)]['setOnLoadCallback'](displayStatusChart), $(document)[_0x274090(0xd2)](function () {
    var _0x32a229 = _0x274090,
        _0x34df90 = {
            'NEW': 0x0,
            'IN\x20PROGRESS': 0x0,
            'RESOLVED': 0x0,
            'FEEDBACK': 0x0,
            'CLOSED': 0x0,
            'REJECTED': 0x0
        },
        _0x54ac2e = Object['keys'](_0x34df90),
        _0x3475cc = Object['values'](_0x34df90);
    overviewgauges(_0x32a229(0xa1), _0x54ac2e, _0x3475cc, 'container-hosts');
}));

function fillHostServiceCount(_0x5988a4) {
    var _0x4bd583 = _0x274090,
        _0x32d91a = Object[_0x4bd583(0xa0)](_0x5988a4),
        _0x5275cd = Object[_0x4bd583(0x113)](_0x5988a4);
    overviewgauges(_0x4bd583(0xa1), _0x32d91a, _0x5275cd, 'container-hosts');
}
colors = {
    'New': _0x274090(0xc9),
    'Closed': '#00D2A1',
    'Resolved': _0x274090(0x164),
    'Rejected': _0x274090(0x164),
    'Progress': '#FDB278',
    'Feedback': _0x274090(0x124)
};
var params = new URLSearchParams(document[_0x274090(0xf5)][_0x274090(0xd8)]);
sites = [], selectedsite = '\x20', sites[_0x274090(0x108)](params['get'](_0x274090(0x14f)));
var selectedsite = params[_0x274090(0x18c)](_0x274090(0x14f));
requestData = {};
var startdate, enddate;
statuses = [], users = [];
var dataType = _0x274090(0xd0);
user = '', ticketId = 0x1;
var loginuser = '';
selecteduser = '', timeline = '', isInfopage = ![], isClickonticket = ![], selectedRow = 0x0, ticketOverviewData = [], isChartloaded = ![], isUpdateTicket = ![], isClickedOnCluster = ![], totalOverviewData = [];
var connectionTries = 0x6,
    ticketSiteResponse, allTicketResponse, ticketSitesData = [];
$(document)[_0x274090(0xd2)](function () {
    var _0x36220b = _0x274090;
    $(_0x36220b(0xa8))[_0x36220b(0xd1)](_0x36220b(0x187)), $(_0x36220b(0xfb))[_0x36220b(0x107)](), $(_0x36220b(0x175))['click'](function (_0x1f5025) {
        var _0x2c3504 = _0x36220b;
        _0x1f5025[_0x2c3504(0x9f)]();
        var _0x54954b = $(this)[_0x2c3504(0xd4)](_0x2c3504(0xee));
        $(this)[_0x2c3504(0x116)]()[_0x2c3504(0xd1)]('active'), $(this)['parent']()[_0x2c3504(0x143)]()[_0x2c3504(0x130)](_0x2c3504(0x187)), $(_0x54954b)[_0x2c3504(0x11d)](), $(_0x54954b)[_0x2c3504(0x143)](_0x2c3504(0xdc))[_0x2c3504(0x107)]();
    });
    const _0x1c8c32 = new URLSearchParams(window['location'][_0x36220b(0xd8)]);
    _0x1c8c32[_0x36220b(0x18c)](_0x36220b(0x17a)) && (isInfopage = _0x1c8c32[_0x36220b(0x18c)](_0x36220b(0x17a)), changePageHeader(_0x36220b(0x185))), _0x1c8c32[_0x36220b(0x18c)](_0x36220b(0x166)) && (isClickonticket = _0x1c8c32[_0x36220b(0x18c)]('isClickonticket'), selectedRow = _0x1c8c32['get'](_0x36220b(0xf3))), _0x1c8c32[_0x36220b(0x18c)](_0x36220b(0x14f)) && (ticketSelectedsite = _0x1c8c32[_0x36220b(0x18c)](_0x36220b(0x14f)));
});

function getStatuses(_0x1bd58f) {
    var _0xeea6e5 = _0x274090;
    requestDataFromServer(_0xeea6e5(0x16b), {
        'sitename': params[_0xeea6e5(0x18c)]('site')
    }, type = 'GET')[_0xeea6e5(0x119)](function (_0x591d1d) {
        var _0x989ac7 = _0xeea6e5;
        statuses = _0x591d1d;
        var _0x8233d9 = '';
        statuses && (isInfopage && (statuses[_0x989ac7(0x14a)](_0x308626 => {
            var _0x24d8a6 = _0x989ac7;
            _0x8233d9 += '<a\x20class=\x22select-link\x20dropdown-item\x20position-relative\x22\x20onclick=\x22onSelectStatus(\x27' + _0x308626['name'] + _0x24d8a6(0x160) + _0x308626[_0x24d8a6(0x110)] + _0x24d8a6(0x174);
        }), $(_0x989ac7(0x172))[_0x989ac7(0x17e)](_0x8233d9), $(_0x989ac7(0x16e))[_0x989ac7(0xc0)](statuses[0x0][_0x989ac7(0x110)]))), ticketResponse(_0x1bd58f);
    });
}

function getUsers() {
    var _0x5d72ca = _0x274090;
    requestDataFromServer(_0x5d72ca(0xe3), {
        'sitename': params[_0x5d72ca(0x18c)]('site')
    }, type = _0x5d72ca(0x122))[_0x5d72ca(0x119)](function (_0x500167) {
        var _0x325eb6 = _0x5d72ca;
        users = _0x500167[_0x325eb6(0xf6)];
        var _0x24c537 = '',
            _0x4c8ba3 = '';
        users && (users[_0x325eb6(0x14a)](_0x32c5d3 => {
            var _0x3319a1 = _0x325eb6;
            _0x24c537 += _0x3319a1(0xed) + _0x32c5d3[_0x3319a1(0xde)] + _0x3319a1(0x160) + _0x32c5d3[_0x3319a1(0xde)] + _0x3319a1(0x174), _0x4c8ba3 += _0x3319a1(0x118) + _0x32c5d3[_0x3319a1(0xde)] + '\x27)\x22>' + _0x32c5d3[_0x3319a1(0xde)] + _0x3319a1(0x174);
        }), $(_0x325eb6(0x14b))[_0x325eb6(0x17e)](_0x24c537), $(_0x325eb6(0x18a))[_0x325eb6(0x17e)](_0x4c8ba3)), changeUserText(_0x500167[_0x325eb6(0xd0)]);
    });
}

function getactions(_0x33f540) {
    var _0x4e4ad5 = _0x274090;
    requestDataFromServer(_0x4e4ad5(0xf4), {
        'ticketId': JSON[_0x4e4ad5(0xaa)](_0x33f540),
        'sitename': ticketSelectedsite,
        'csrfmiddlewaretoken': csfr_token
    }, type = 'post')[_0x4e4ad5(0x119)](function (_0x3e482a) {
        displayActions(_0x3e482a);
    });
}

function _0x1044() {
    var _0x4df30f = ['attr', 'No\x20time\x20log\x20available', 'min', 'rangechanged', 'search', '</span></a>', '#comments', 'className', '.usersection-content', 'visibility', 'login', 'responseData', 'content', 'innerHTML', 'selectedSite', '/ticket/getUsers', 'value', 'click', 'disabled', '#selectAssignee', 'class', 'overviewList', 'isSuccess', 'Progress', 'resultsList', '<a\x20class=\x22select-link\x20dropdown-item\x20position-relative\x22\x20onclick=\x22onSelectuser(\x27', 'href', 'green', 'charts', '#ticketList', 'getElementById', 'selectedRow', '/ticket/getactions', 'location', 'userList', 'days', 'team', 'floor', '\x20Progress-bg', '.usersection-content:not(:first)', 'visualization', 'findIndex', 'notes', '<span\x20class=\x22white-text\x20', 'enddate', '#ticketinfo\x20#ticketDescription', 'ticketSubject', 'ticketId', '-bg', 'block', '#tickettemplate\x20#site-list\x20#', 'hide', 'push', 'uploadecode', 'websocket_url', 'draw', '3fBPAbJ', 'selecteduser', '#userId', '100%', 'name', 'format', 'items', 'values', 'max', 'getSelection', 'parent', 'css', '<a\x20class=\x22select-link\x20dropdown-item\x20position-relative\x22\x20onclick=\x22onSelectAssignee(\x27', 'done', 'subject', 'T00:00:00Z', 'ticketDescription', 'show', '-bg\x22></span>\x20<span\x20class=\x22mx-2\x22>', 'siteData', 'info', 'In\x20Progress', 'GET', 'style', '#7B7B7B', 'failure', '<div\x20class=\x22timeline-inner\x22>', 'getCluster', 'display', '<div\x20class=\x22icon-outline\x22><i\x20class=\x22icon-calender\x22></i></div>', 'start', 'journals', 'btn-danger', 'uploadmsg', '100px', '_li\x20', 'removeClass', '1644056jpWlNv', 'random', 'year', 'nodata', 'parse', 'YYYY-MM-DD', 'ticketstatus', '#ticketpage\x20#ticket_title\x20#', '-bg\x20py-1\x20px-2\x20radius-8\x20size12\x22>', '<li\x20class=\x22timeline\x20my-3\x22>', 'POST', 'filecontent', 'issuecount', 'dashboard-tickets', 'load', 'abcdefghijklmnopqrstuvwxyz', 'startdate', 'visible', 'siblings', 'Cannot\x20load\x20tickets\x20\x22', 'none', '#fileLoader', 'getData', '#ticketinfo\x20#info', '3518844CYhySc', 'forEach', '#userList', '</span></span></div>', 'true', '</li>', 'site', '1187938qZKjvE', 'row', 'hidden', 'empty', 'readAsText', '</div>', '22879dyNRQw', 'post', 'Error', '<span\x20class=\x22username\x22>\x20<a>', 'find', 'Cannot\x20load\x20ticket\x22', 'setAttribute', '<span\x20class=\x22size12\x20grey-text\x20d-block\x22>', 'addListener', 'error', '\x27)\x22>', 'current', 'addEventListener', 'onerror', '#00D2A1', 'submit', 'isClickonticket', '&isClickonticket=true&selectedRow=', 'data', '18dlPFsv', 'filename', '/ticket/getStatuses', 'origin', 'clusterTickets', '#selectStatus', '<div\x20class=\x22opt\x20mb-2\x22>\x20<span\x20class=\x22indicator\x20', 'white-text\x20py-1\x20px-2\x20size12\x20radius-8', 'onload', '#statuslist', '<div\x20class=\x22icon-outline\x22><i\x20class=\x22mdi\x20mdi-calendar\x22\x20style=\x22color:#6c757d\x22></i></div>', '</a>', '.teamlist\x20ul\x20li\x20a', 'select', '360415tzaBVX', '#ticketinfo\x20#ticketSubject', 'sitename', 'isInfopage', ')\x22>', 'status', '<div\x20class=\x22page-header\x22>\x20', 'append', 'querySelector', 'add', 'clicksite', 'length', '/ticket/getTicket', '5ufWVZK', 'Ticket\x20Analysis', 'No\x20time\x20log\x20available\x20for\x20this\x20Ticket', 'active', 'getVisibleChartRange', '_li', '#assigneelist', '<div\x20class=\x22timeline-content\x20d-flex\x22>', 'get', 'Not\x20able\x20to\x20show\x20tickets.\x20Please\x20try\x20again.', '#total-tickets', 'substring', 'comment', 'isWSConnected', '#visualization', 'preventDefault', 'keys', 'Overview', '#selectUser', '&nbsp;</a>', 'events', 'total_overviewList', 'isTotalOverview', 'white-text\x20py-1\x20px-2\x20size12\x20radius-8\x20', '.teamlist\x20.users:first', 'month', 'stringify', 'text', 'target', 'toString', 'New', 'comments', 'criticalTicketCount', 'No\x20Cancel', '/ticket/getAllTickets', '2782524aOWvkX', 'success', '<a\x20class=\x22dropdown-item\x20size16\x20border-b\x22\x20onclick=\x22onSelectTicket(', '#overview', '#list-timeline', 'files', 'message', 'userid', '.confirm', 'assigned_to_id', '<div\x20class=\x22py-1\x20my-1\x22>', 'assigned_to', 'setVisibleChartRange', 'html', 'setVisibleChartRangeAuto', 'created_on', 'red', '730okDQdp', '/ticket/?isInfopage=true&site=', '_li\x20a', 'tickets-card', '346772bIlXaM', '#FF6060', 'end', '<span\x20class=\x22beat\x22></span>\x20</span>\x20</div>', '&ensp;>&ensp;Ticket\x20Status</div>', '#tickettemplate\x20#site-list', 'date', 'description', 'user', 'addClass', 'ready', 'object'];
    _0x1044 = function () {
        return _0x4df30f;
    };
    return _0x1044();
}

function displayActions(_0x22d693) {
    var _0x270255 = _0x274090;
    if (_0x22d693) {
        var _0x14e64a = '';
        $('#list-timeline')[_0x270255(0x153)](), count = _0x22d693['length'];
        for (i = count - 0x1; i >= 0x0; i--) {
            _0x22d693[i][_0x270255(0xfe)] && (_0x14e64a += _0x270255(0x13a), _0x14e64a += _0x270255(0x126), _0x14e64a += _0x270255(0x129), _0x14e64a += _0x270255(0x18b), _0x14e64a += _0x270255(0x159) + selecteduser + '&nbsp;</a>' + _0x22d693[i][_0x270255(0xfe)] + _0x270255(0x15d) + _0x22d693[i][_0x270255(0xc2)] + _0x270255(0x14c), _0x14e64a += '</div>', _0x14e64a += _0x270255(0x14e));
        }
        _0x22d693[_0x270255(0x182)] == 0x0 || _0x14e64a == '' ? (element = document['getElementById']('nodata'), element[_0x270255(0x123)][_0x270255(0x128)] = _0x270255(0x105), element[_0x270255(0xe1)] = _0x270255(0x186)) : ($(_0x270255(0xb7))[_0x270255(0x17e)](_0x14e64a), document[_0x270255(0xf2)]('nodata')['style'][_0x270255(0x128)] = _0x270255(0x145));
    }
    dataType == 'team' && loginuser != selecteduser ? ($('#assigneelist')[_0x270255(0x117)]('display', _0x270255(0x145)), $('#statuslist')['css'](_0x270255(0x128), _0x270255(0x145)), document[_0x270255(0xf2)]('submit')[_0x270255(0xe6)] = !![]) : ($('#assigneelist')[_0x270255(0x117)](_0x270255(0x128), ''), $(_0x270255(0x172))[_0x270255(0x117)](_0x270255(0x128), ''), document[_0x270255(0xf2)](_0x270255(0x165))[_0x270255(0xe6)] = ![]);
}

function dispalyTickets(_0x277275) {
    var _0x3838d2 = _0x274090;
    showLoader(_0x3838d2(0x13e)), showLoader(_0x3838d2(0xc7)), requestDataFromServer(_0x3838d2(0xb2), {
        'site': JSON[_0x3838d2(0xaa)](_0x277275),
        'sitename': _0x277275[_0x3838d2(0x179)]
    }, type = _0x3838d2(0x122))[_0x3838d2(0x119)](allSiteTicketsResponse);
}

function getactions(_0x2e639e) {
    var _0x1bfc2f = _0x274090;
    requestDataFromServer(_0x1bfc2f(0xf4), {
        'ticketId': JSON[_0x1bfc2f(0xaa)](_0x2e639e),
        'sitename': ticketSelectedsite,
        'csrfmiddlewaretoken': csfr_token
    }, type = _0x1bfc2f(0x157))[_0x1bfc2f(0x119)](function (_0x215879) {
        displayActions(_0x215879);
    });
}

function displayActions(_0x39b320) {
    var _0x4135c4 = _0x274090;
    if (_0x39b320) {
        var _0x45737e = '';
        $(_0x4135c4(0xb7))['empty'](), count = _0x39b320[_0x4135c4(0x182)];
        for (i = count - 0x1; i >= 0x0; i--) {
            _0x39b320[i][_0x4135c4(0xfe)] && (_0x45737e += _0x4135c4(0x13a), _0x45737e += '<div\x20class=\x22timeline-inner\x22>', _0x45737e += _0x4135c4(0x173), _0x45737e += _0x4135c4(0x18b), _0x45737e += _0x4135c4(0x159) + selecteduser + _0x4135c4(0xa3) + _0x39b320[i][_0x4135c4(0xfe)] + _0x4135c4(0x15d) + _0x39b320[i][_0x4135c4(0xc2)] + '</span></span></div>', _0x45737e += _0x4135c4(0x155), _0x45737e += _0x4135c4(0x14e));
        }
        _0x39b320['length'] == 0x0 || _0x45737e == '' ? (element = document[_0x4135c4(0xf2)](_0x4135c4(0x134)), element[_0x4135c4(0x123)][_0x4135c4(0x128)] = _0x4135c4(0x105), element['innerHTML'] = 'No\x20time\x20log\x20available\x20for\x20this\x20Ticket') : ($(_0x4135c4(0xb7))['append'](_0x45737e), document['getElementById'](_0x4135c4(0x134))['style'][_0x4135c4(0x128)] = _0x4135c4(0x145));
    }
    dataType == _0x4135c4(0xf8) && loginuser != selecteduser ? ($(_0x4135c4(0x18a))[_0x4135c4(0x117)]('display', _0x4135c4(0x145)), $('#statuslist')[_0x4135c4(0x117)](_0x4135c4(0x128), 'none'), document[_0x4135c4(0xf2)]('submit')[_0x4135c4(0xe6)] = !![]) : ($('#assigneelist')[_0x4135c4(0x117)](_0x4135c4(0x128), ''), $(_0x4135c4(0x172))[_0x4135c4(0x117)](_0x4135c4(0x128), ''), document[_0x4135c4(0xf2)](_0x4135c4(0x165))[_0x4135c4(0xe6)] = ![]);
}

function allSiteTicketsResponse(_0x240dd8) {
    var _0x285bda = _0x274090;
    const _0xf8a6d8 = Math[_0x285bda(0x132)]()[_0x285bda(0xad)](0x24)[_0x285bda(0x18f)](0x2, 0x5);
    stopLoader('dashboard-tickets'), stopLoader('tickets-card');
    if (_0x240dd8 == undefined) return;
    allTicketResponse = _0x240dd8[_0x285bda(0xdf)], loginuser = _0x240dd8[_0x285bda(0xd0)], selecteduser = _0x240dd8[_0x285bda(0x10d)];
    var _0xdbfafc = {};
    _0xdbfafc[_0x285bda(0x14f)] = _0x240dd8[_0x285bda(0xe2)], _0xdbfafc[_0x285bda(0xea)] = !![], _0xdbfafc[_0x285bda(0x9d)] = ![], _0xdbfafc[_0x285bda(0xb0)], siteTickets = _0x240dd8[_0x285bda(0x11f)];
    if (siteTickets[_0x285bda(0xe9)][_0x285bda(0x182)] > 0x0) {
        var _0xf42b17 = siteTickets[_0x285bda(0xe9)]['filter'](_0x22ca57 => _0x22ca57['name'] == 'New')[0x0];
        _0xf42b17[_0x285bda(0x13d)] > 0x0 && (_0xdbfafc[_0x285bda(0xea)] = ![], _0xdbfafc[_0x285bda(0xb0)] = _0xf42b17[_0x285bda(0x13d)]);
    }
    ticketSitesData[_0x285bda(0x108)](_0xdbfafc);
    var _0x5990a1 = ticketSiteResponse[0x0];
    makeWsConnection(_0x5990a1[_0x285bda(0x10a)], _0xdbfafc[_0x285bda(0x14f)], 0x0, _0xdbfafc[_0x285bda(0xb0)], _0xf8a6d8);
    var _0x5df7ed = '',
        _0x20913f = '';
    $(_0x285bda(0xcd))[_0x285bda(0x153)](), ticketSitesData['forEach'](function (_0x468825, _0x497df5) {
        var _0x593c74 = _0x285bda;
        _0x468825[_0x593c74(0xea)] ? _0x5df7ed += _0x593c74(0x17d) + _0x468825[_0x593c74(0x14f)] + _0x593c74(0xcc) : _0x20913f += _0x593c74(0x17d) + _0x468825[_0x593c74(0x14f)] + _0x593c74(0xcc);
    }), $('#ticketpage\x20#ticket_title')['append'](_0x20913f), $('#ticketpage\x20#ticket_title')[_0x285bda(0x17e)](_0x5df7ed), ticketSelectedsite = _0x240dd8[_0x285bda(0xe2)], $(_0x285bda(0x138) + ticketSelectedsite)[_0x285bda(0xd1)](_0x285bda(0x187));
    var _0x255d51 = allTicketResponse;
    isInfopage && getUsers(), getStatuses(_0x240dd8[_0x285bda(0x11f)]);
}

function _0x4b74(_0x5077ee, _0x822bf9) {
    var _0x10447e = _0x1044();
    return _0x4b74 = function (_0x4b74b2, _0x39ecd8) {
        _0x4b74b2 = _0x4b74b2 - 0x9d;
        var _0x51f1ed = _0x10447e[_0x4b74b2];
        return _0x51f1ed;
    }, _0x4b74(_0x5077ee, _0x822bf9);
}

function onTicketSiteTabchange(_0x342eb7, _0x465c30 = {}) {
    var _0x703e47 = _0x274090;
    const _0x357ea4 = _0x703e47(0x140),
        _0x5a6b14 = _0x357ea4[Math[_0x703e47(0xf9)](Math[_0x703e47(0x132)]() * _0x357ea4[_0x703e47(0x182)])];
    ticketSelectedsite = _0x342eb7, $('#tickettemplate\x20#site-list\x20li\x20a.active')[_0x703e47(0x130)](_0x703e47(0x187)), $(_0x703e47(0x106) + _0x342eb7 + _0x703e47(0x12f) + 'a')[_0x703e47(0xd1)](_0x703e47(0x187));
    if (_0x465c30 == {}) {
        var _0x45702c = ticketSitesData[0x0],
            _0x2b4791 = _0x45702c[_0x703e47(0xb0)];
        _0x45702c[_0x703e47(0x9d)] == ![] && (_0x45702c = ticketSiteResponse[0x0], makeWsConnection(_0x45702c['websocket_url'], _0x342eb7, 0x0, _0x2b4791, _0x5a6b14));
    } else {
        var _0x45702c = _0x465c30,
            _0x2b4791 = 0x0;
        makeWsConnection(_0x45702c[_0x703e47(0x10a)], _0x342eb7, 0x0, _0x2b4791, _0x5a6b14);
    }
    $('#visualization')['css'](_0x703e47(0x128), _0x703e47(0x145)), showLoader('dashboard-tickets'), showLoader('tickets-card'), requestDataFromServer(_0x703e47(0x183), {
        'sitename': params['get'](_0x703e47(0x14f))
    }, type = _0x703e47(0x122))[_0x703e47(0x119)](function (_0x2dace1) {
        ticketResponse(_0x2dace1);
    });
}

function ticketResponse(_0x11cd71) {
    var _0x40dd6f = _0x274090;
    $(_0x40dd6f(0x9e))[_0x40dd6f(0x117)]('display', 'block'), stopLoader(_0x40dd6f(0x13e)), stopLoader(_0x40dd6f(0xc7)), tickets = [], ticketOverviewData = [];
    if (_0x11cd71 == undefined) return;
    data = [], tickets = _0x11cd71['overviewList'];
    for (i in tickets) {
        item = {}, item['id'] = tickets[i]['id'], item[_0x40dd6f(0xe0)] = tickets[i]['id'], item['start'] = new Date(tickets[i]['created_on']), status = tickets[i][_0x40dd6f(0x110)], status == 'In\x20Progress' ? item[_0x40dd6f(0xdb)] = _0x40dd6f(0xeb) : item['className'] = status, data[_0x40dd6f(0x108)](item);
    }
    var _0x36681f = {
        'width': _0x40dd6f(0x10f),
        'height': _0x40dd6f(0x12e),
        'clusterMaxItems': 0x2,
        'cluster': !![],
        'zoomMin': 0x5265c00
    };
    try {
        timeline = new links['Timeline'](document[_0x40dd6f(0xf2)](_0x40dd6f(0xfc)), _0x36681f);
    } catch (_0x2d2c9a) { }
    if (isInfopage) onRangeChanged(timeline);
    links[_0x40dd6f(0xa4)]['addListener'](timeline, _0x40dd6f(0xd7), onRangeChanged), links[_0x40dd6f(0xa4)][_0x40dd6f(0x15e)](timeline, _0x40dd6f(0x176), onTicketselect), loginuser = _0x11cd71['user'];
    try {
        timeline['draw'](data);
    } catch (_0x52f199) { }
    if (loginuser != 'admin') {
        var _0x1d4300 = moment(),
            _0x1ec85a = moment()[_0x40dd6f(0x180)](0x1, _0x40dd6f(0xf7));
        !isInfopage && (_0x36681f[_0x40dd6f(0xd6)] = new Date(_0x1d4300[_0x40dd6f(0x133)](), _0x1d4300[_0x40dd6f(0xa9)](), _0x1d4300[_0x40dd6f(0xce)]()), _0x36681f[_0x40dd6f(0x114)] = new Date(_0x1ec85a['year'](), _0x1ec85a[_0x40dd6f(0xa9)](), _0x1ec85a[_0x40dd6f(0xce)]())), timeline[_0x40dd6f(0xbf)](new Date(_0x1d4300[_0x40dd6f(0x133)](), _0x1d4300[_0x40dd6f(0xa9)](), _0x1d4300[_0x40dd6f(0xce)]()), new Date(_0x1ec85a['year'](), _0x1ec85a[_0x40dd6f(0xa9)](), _0x1ec85a['date']()));
    }
    selecteduser = _0x11cd71['selecteduser'];
    if (isInfopage) {
        if (_0x11cd71['overviewList']) ticketOverviewData = _0x11cd71['overviewList'];
        if (_0x11cd71[_0x40dd6f(0xa5)]) totalOverviewData = _0x11cd71[_0x40dd6f(0xa5)];
        $(_0x40dd6f(0x10e))[_0x40dd6f(0xab)](selecteduser), displayTicketOverview();
        if (isClickonticket) {
            obj = selectedRow;
            var _0x5e363f = JSON[_0x40dd6f(0x135)](obj);
            key = Object[_0x40dd6f(0xa0)](_0x5e363f)[0x0], key == _0x40dd6f(0x151) ? (isClickedOnCluster = ![], onTicketselect(_0x5e363f[key])) : (isClickedOnCluster = !![], document['getElementById'](_0x40dd6f(0x16d))['style'][_0x40dd6f(0xdd)] = 'visible', clickedOnCluster(_0x5e363f[key]));
        } else {
            if (tickets['length'] > 0x0) { } else clearAllvalues();
        }
    }
}

function displayTicketOverview() {
    var _0x10c5b6 = _0x274090,
        _0x3b8b97 = '',
        _0x3614af = 0x0;
    $(_0x10c5b6(0xb6))[_0x10c5b6(0x153)]();
    var _0x4f0866 = [],
        _0x16bf4f = {};
    _0x4f0866[_0x10c5b6(0x108)](['Status', 'Total\x20Tickets']), statuses[_0x10c5b6(0x14a)](_0x23646d => {
        var _0x2ef441 = _0x10c5b6;
        obj = {}, obj['id'] = _0x23646d['id'], obj['name'] = _0x23646d['name'], obj[_0x2ef441(0x13d)] = 0x0, typeof ticketOverviewData == 'object' && (!ticketOverviewData['some'](_0x709ceb => _0x709ceb['id'] == _0x23646d['id']) && ticketOverviewData[_0x2ef441(0x108)](obj)), typeof totalOverviewData == _0x2ef441(0xd3) && (!totalOverviewData['some'](_0x277362 => _0x277362['id'] == _0x23646d['id']) && totalOverviewData['push'](obj));
    });
    var _0x276523 = [];
    ticketOverviewData['forEach'](_0x182b36 => {
        var _0x218786 = _0x10c5b6;
        _0x4f0866[_0x218786(0x108)]([_0x182b36[_0x218786(0x110)], Number(_0x182b36[_0x218786(0x13d)])]), _0x16bf4f[_0x182b36[_0x218786(0x110)]] = Number(_0x182b36[_0x218786(0x13d)]), _0x3614af += Number(_0x182b36[_0x218786(0x13d)]), _0x182b36['name'] == _0x218786(0x121) ? status = _0x218786(0xeb) : status = _0x182b36[_0x218786(0x110)], _0x276523['push'](colors[status]), totaltickets = totalOverviewData[_0x218786(0x15a)](_0x49b13d => _0x49b13d['id'] === _0x182b36['id'])['issuecount'];
        if (_0x182b36[_0x218786(0x110)] == _0x218786(0xae) && _0x182b36[_0x218786(0x13d)] > 0x0) _0x3b8b97 += _0x218786(0x16f) + status + _0x218786(0x11e) + _0x182b36[_0x218786(0x110)] + '(' + totaltickets + ')' + '</span><span\x20class=\x22float-right\x22>' + _0x182b36[_0x218786(0x13d)] + _0x218786(0xcb);
        else _0x3b8b97 += '<div\x20class=\x22opt\x20mb-2\x22>\x20<span\x20class=\x22indicator\x20' + status + _0x218786(0x11e) + _0x182b36[_0x218786(0x110)] + '(' + totaltickets + ')' + '</span><span\x20class=\x22float-right\x22>' + _0x182b36[_0x218786(0x13d)] + '</span>\x20</div>';
    }), $(_0x10c5b6(0xb6))[_0x10c5b6(0x17e)](_0x3b8b97), fillHostServiceCount(_0x16bf4f), $(_0x10c5b6(0x18e))[_0x10c5b6(0xc0)](_0x3614af);
}

function onTicketselect(_0x4d3949) {
    var _0x278c77 = _0x274090;
    if (isInfopage == ![]) window[_0x278c77(0xf5)][_0x278c77(0xee)] = window['location'][_0x278c77(0x16c)] + _0x278c77(0xc5) + entitySelectedsite + _0x278c77(0x167) + encodeURIComponent(JSON[_0x278c77(0xaa)](getSelectedRow()));
    else {
        _0x4d3949 != null ? (row = _0x4d3949, isClickedOnCluster = ![]) : (obj = getSelectedRow(), key = Object[_0x278c77(0xa0)](obj)[0x0], key == _0x278c77(0x151) ? (row = obj[key], isClickedOnCluster = ![]) : (isClickedOnCluster = !![], document[_0x278c77(0xf2)](_0x278c77(0x16d))[_0x278c77(0x123)][_0x278c77(0xdd)] = _0x278c77(0x142), clickedOnCluster(obj[key])));
        if (isClickedOnCluster == ![]) {
            $(_0x278c77(0x148))[_0x278c77(0x153)](), $(_0x278c77(0x101))[_0x278c77(0x153)](), $(_0x278c77(0x178))[_0x278c77(0x153)]();
            var _0xb639db = '';
            if (row != undefined) {
                var _0x6ea900 = {};
                if (tickets[row]) {
                    _0x6ea900 = tickets[row];
                    _0x6ea900['assigned_to'] ? _0x6ea900[_0x278c77(0xbe)]['id'] = _0x6ea900['assigned_to']['id'] : (_0x6ea900[_0x278c77(0xbe)] = {}, _0x6ea900[_0x278c77(0xbe)]['id'] = 0x1);
                    var _0x30d220 = users['filter'](_0x1b7c6c => _0x1b7c6c['id'] == _0x6ea900[_0x278c77(0xbe)]['id'])[0x0];
                    $(_0x278c77(0xe7))[_0x278c77(0xab)](_0x30d220['login']), _0xb639db += _0x278c77(0xbd) + _0x6ea900['id'] + _0x278c77(0x155), _0xb639db += _0x278c77(0xbd) + _0x6ea900[_0x278c77(0xc2)] + _0x278c77(0x155), $(_0x278c77(0x148))[_0x278c77(0x17e)](_0xb639db), document['getElementById']('ticketDescription')[_0x278c77(0xe1)] = _0x6ea900[_0x278c77(0xcf)], document[_0x278c77(0xf2)](_0x278c77(0x102))[_0x278c77(0xe1)] = _0x6ea900[_0x278c77(0x11a)], status = _0x6ea900[_0x278c77(0x17c)]['name'], $(_0x278c77(0x16e))[_0x278c77(0xab)](_0x6ea900[_0x278c77(0x17c)]['name']), element = document[_0x278c77(0xf2)](_0x278c77(0x137)), element[_0x278c77(0x123)][_0x278c77(0xdd)] = _0x278c77(0x142), element['innerHTML'] = status, status == 'In\x20Progress' ? classValue = _0x278c77(0x170) + _0x278c77(0xfa) : classValue = _0x278c77(0xa7) + status + _0x278c77(0x104), element[_0x278c77(0x15c)](_0x278c77(0xe8), classValue), ticketId = _0x6ea900['id'], getactions(ticketId);
                } else {
                    var _0x245ee4 = timeline[_0x278c77(0x147)]();
                    if (_0x245ee4[row]) {
                        var _0xce8ea7 = _0x245ee4[row]['id'];
                        requestDataFromServer('/ticket/getTicketInfo', {
                            'ticketId': JSON['stringify'](_0xce8ea7),
                            'sitename': ticketSelectedsite,
                            'csrfmiddlewaretoken': csfr_token
                        }, type = 'post')['done'](function (_0x3401bd) {
                            var _0x1dfd3d = _0x278c77;
                            _0x3401bd[_0x1dfd3d(0x17c)] == 0xc8 ? (_0x6ea900 = _0x3401bd, _0xb639db += _0x1dfd3d(0xbd) + _0x6ea900['id'] + _0x1dfd3d(0x155), _0xb639db += '<div\x20class=\x22py-1\x20my-1\x22>' + _0x6ea900[_0x1dfd3d(0xc2)] + _0x1dfd3d(0x155), $('#ticketinfo\x20#info')[_0x1dfd3d(0x17e)](_0xb639db), document[_0x1dfd3d(0xf2)](_0x1dfd3d(0x11c))[_0x1dfd3d(0xe1)] = _0x6ea900['description'], document[_0x1dfd3d(0xf2)](_0x1dfd3d(0x102))['innerHTML'] = _0x6ea900[_0x1dfd3d(0x11a)], status = _0x6ea900[_0x1dfd3d(0x17c)][_0x1dfd3d(0x110)], $(_0x1dfd3d(0x16e))[_0x1dfd3d(0xab)](status), element = document[_0x1dfd3d(0xf2)]('ticketstatus'), element['style'][_0x1dfd3d(0xdd)] = 'visible', element['innerHTML'] = status, status == _0x1dfd3d(0x121) ? classValue = _0x1dfd3d(0x170) + _0x1dfd3d(0xfa) : classValue = _0x1dfd3d(0xa7) + status + _0x1dfd3d(0x104), element[_0x1dfd3d(0x15c)]('class', classValue), ticketId = _0x6ea900['id'], displayActions(_0x6ea900[_0x1dfd3d(0x12b)])) : swal({
                                'title': _0x1dfd3d(0x158),
                                'text': _0x1dfd3d(0x144) + _0x3401bd[_0x1dfd3d(0xb9)],
                                'type': _0x1dfd3d(0x120),
                                'showCancelButton': !![],
                                'cancelButtonText': 'close',
                                'closeOnConfirm': !![],
                                'closeOnCancel': !![]
                            });
                        });
                    }
                }
            }
        }
    }
}

function clickedOnCluster(_0x19b5c0) {
    var _0x1e80af = _0x274090;
    clusterObj = timeline[_0x1e80af(0x127)](_0x19b5c0);
    var _0x45109d = '',
        _0x5e4cff = '';
    $(_0x1e80af(0xf1))[_0x1e80af(0x153)]();
    var _0xbaec8e = '';
    clusterObj['items'] && (clusterObj[_0x1e80af(0x112)][_0x1e80af(0x14a)](_0x4a2204 => {
        var _0x6c4e38 = _0x1e80af;
        _0x4a2204['className'] == _0x6c4e38(0x121) ? _0xbaec8e = 'Progress' : _0xbaec8e = _0x4a2204['className'];
        if (_0x4a2204['className'] == _0x6c4e38(0xae)) _0x5e4cff += _0x6c4e38(0xb5) + _0x4a2204['id'] + _0x6c4e38(0x17b) + _0x4a2204['id'] + _0x6c4e38(0xff) + _0xbaec8e + _0x6c4e38(0x139) + _0x4a2204['className'] + _0x6c4e38(0xd9);
        else _0x45109d += _0x6c4e38(0xb5) + _0x4a2204['id'] + _0x6c4e38(0x17b) + _0x4a2204['id'] + _0x6c4e38(0xff) + _0xbaec8e + _0x6c4e38(0x139) + _0x4a2204[_0x6c4e38(0xdb)] + _0x6c4e38(0xd9);
    }), $(_0x1e80af(0xf1))[_0x1e80af(0x17e)](_0x5e4cff), $('#ticketList')['append'](_0x45109d));
}

function onSelectTicket(_0x1dd5dc) {
    var _0x593d73 = _0x274090;
    ticketIndex = tickets[_0x593d73(0xfd)](_0x160647 => _0x160647['id'] == _0x1dd5dc), onTicketselect(ticketIndex);
}

function getSelectedRow() {
    var _0x21273b = _0x274090,
        _0x1c6c89 = undefined,
        _0x537688 = timeline[_0x21273b(0x115)]();
    return _0x537688['length'] && (Object[_0x21273b(0xa0)](_0x537688[0x0])['length'] > 0x0 && (_0x1c6c89 = _0x537688[0x0])), _0x1c6c89;
}

function onRangeChanged(_0x1241ec) {
    var _0x2c09e9 = _0x274090;
    clearAllvalues(), data = {}, startdate = _0x1241ec[_0x2c09e9(0x12a)], data[_0x2c09e9(0x141)] = moment(startdate)[_0x2c09e9(0x111)]('YYYY-MM-DD'), enddate = _0x1241ec[_0x2c09e9(0xca)], data['enddate'] = moment(enddate)['format'](_0x2c09e9(0x136)), data['user'] = dataType, data['isTotalOverview'] = ![], dataType == _0x2c09e9(0xf8) && (data[_0x2c09e9(0xba)] = $('#selectUser')[_0x2c09e9(0xab)]()), requestData['data'] = data, requestDataFromServer(_0x2c09e9(0x183), {
        'clientData': JSON[_0x2c09e9(0xaa)](requestData),
        'sitename': ticketSelectedsite,
        'csrfmiddlewaretoken': csfr_token
    }, 'POST')['done'](rangeChangeResponse);
}

function rangeChangeResponse(_0x433e8e) {
    var _0xae75c = _0x274090;
    if (_0x433e8e['code'] == 0xc8) {
        tickets = [];
        var _0x5e5fa6 = startdate ? new Date(startdate) : '\x20',
            _0x17cfba = enddate ? new Date(enddate) : '\x20';
        if (_0x433e8e == undefined) return;
        data = [], tickets = _0x433e8e[_0xae75c(0xec)], selecteduser = _0x433e8e[_0xae75c(0x10d)], changeUserText(selecteduser);
        for (i in tickets) {
            item = {}, item['id'] = tickets[i]['id'], item[_0xae75c(0xe0)] = tickets[i]['id'], item['start'] = new Date(tickets[i]['created_on']), status = tickets[i][_0xae75c(0x17c)][_0xae75c(0x110)], status == _0xae75c(0x121) ? item[_0xae75c(0xdb)] = _0xae75c(0xeb) : item[_0xae75c(0xdb)] = status, data['push'](item);
        }
        try {
            timeline[_0xae75c(0x10b)](data);
        } catch (_0x5f0e41) {
            swal(_0xae75c(0x18d), '\x20', 'error');
        }
        startdate != '\x20' ? timeline[_0xae75c(0xbf)](_0x5e5fa6, _0x17cfba) : timeline[_0xae75c(0xc1)]();
        if (tickets[_0xae75c(0x182)] > 0x0) {
            if (isUpdateTicket == !![]) {
                var _0x34cdc2 = tickets[_0xae75c(0xfd)](_0xc08212 => _0xc08212['id'] == ticketId);
                if (_0x34cdc2 > 0x0) onTicketselect(_0x34cdc2);
            }
        } else clearAllvalues();
    } else swal({
        'title': _0xae75c(0x158),
        'text': _0xae75c(0x15b) + _0x433e8e[_0xae75c(0xb9)],
        'type': _0xae75c(0x120),
        'showCancelButton': !![],
        'cancelButtonText': _0xae75c(0xb1),
        'closeOnConfirm': !![],
        'closeOnCancel': !![]
    });
}

function changeTicketSiteStatus(_0x49faf9, _0x4644ba) {
    var _0x18d93d = _0x274090,
        _0x994aa8 = ticketSitesData[0x0];
    _0x994aa8 && (_0x994aa8[_0x18d93d(0xb0)] = _0x4644ba, _0x4644ba == 0x0 ? (_0x994aa8[_0x18d93d(0xea)] = !![], $('#tickettemplate\x20#site-list\x20#' + _0x49faf9 + '_li')[_0x18d93d(0x130)](_0x18d93d(0x125))[_0x18d93d(0xd1)](_0x18d93d(0xb4)), $(_0x18d93d(0x106) + _0x49faf9 + _0x18d93d(0xc6))[_0x18d93d(0x130)](_0x18d93d(0xc3))['addClass'](_0x18d93d(0xef))) : (_0x994aa8[_0x18d93d(0xea)] = ![], $(_0x18d93d(0x106) + _0x49faf9 + _0x18d93d(0x189))[_0x18d93d(0x130)](_0x18d93d(0xb4))[_0x18d93d(0xd1)]('failure'), $(_0x18d93d(0x106) + _0x49faf9 + '_li\x20a')[_0x18d93d(0x130)](_0x18d93d(0xef))['addClass']('red')));
}

function openfileDialog() {
    var _0x2fa113 = _0x274090;
    $(_0x2fa113(0x146))[_0x2fa113(0xe5)]();
}

function updateticket() {
    var _0x327500 = _0x274090;
    comment = document['getElementById'](_0x327500(0xaf))[_0x327500(0xe4)];
    if (comment) {
        var _0x257a1e = timeline[_0x327500(0x188)]();
        startdate = _0x257a1e[_0x327500(0x12a)], enddate = _0x257a1e[_0x327500(0xca)], data = {}, data[_0x327500(0x103)] = ticketId;
        var _0x17b4f9 = users['filter'](_0xf8ab34 => _0xf8ab34['login'] == $(_0x327500(0xe7))['text']())[0x0];
        data[_0x327500(0xbc)] = _0x17b4f9['id'];
        var _0x4e4500 = statuses[0x0];
        data['status_id'] = _0x4e4500['id'], data[_0x327500(0x190)] = document[_0x327500(0xf2)]('comments')[_0x327500(0xe4)], data[_0x327500(0x13c)] = '', data[_0x327500(0x16a)] = '';
        var _0x6e36a = document['getElementById']('fileLoader')[_0x327500(0xb8)][0x0];
        if (_0x6e36a) {
            var _0x5db12a = new FileReader();
            _0x5db12a[_0x327500(0x154)](_0x6e36a, 'UTF-8'), _0x5db12a[_0x327500(0x171)] = function (_0x1511ca) {
                var _0x22ef37 = _0x327500;
                data[_0x22ef37(0x13c)] = _0x1511ca[_0x22ef37(0xac)]['result'], data[_0x22ef37(0x16a)] = _0x6e36a[_0x22ef37(0x110)], requestData['data'] = data, requestDataFromServer('/ticket/updateticket', {
                    'updateData': JSON['stringify'](requestData),
                    'sitename': ticketSelectedsite,
                    'csrfmiddlewaretoken': csfr_token
                }, 'POST')[_0x22ef37(0x119)](ticketUpdateResponse);
            }, _0x5db12a[_0x327500(0x163)] = function (_0x1924ca) {
                swal('Not\x20able\x20to\x20attach\x20file', '\x20', 'error');
            };
        } else requestData[_0x327500(0x168)] = data, requestDataFromServer('/ticket/updateticket', {
            'updateData': JSON[_0x327500(0xaa)](requestData),
            'sitename': ticketSelectedsite,
            'csrfmiddlewaretoken': csfr_token
        }, 'POST')[_0x327500(0x119)](ticketUpdateResponse);
    } else swal({
        'title': _0x327500(0x158),
        'text': 'Please\x20enter\x20comment',
        'type': _0x327500(0x15f),
        'showCancelButton': ![],
        'confirmButtonClass': _0x327500(0x12c)
    });
}

function ticketUpdateResponse(_0x47fbb8) {
    var _0x41af69 = _0x274090;
    _0x47fbb8[_0x41af69(0x109)] == 0x1f4 && swal(_0x47fbb8[_0x41af69(0x12d)], '\x20', _0x41af69(0x15f));
    if (_0x47fbb8['code'] == 0x1f4) swal(_0x47fbb8['msg'], '\x20', 'error');
    else {
        swal(_0x47fbb8['msg'], '\x20', 'success'), isUpdateTicket = !![], clearAllvalues();
        var _0x64d864 = document[_0x41af69(0x17f)](_0x41af69(0xbb));
        _0x64d864[_0x41af69(0x162)]('click', () => {
            var _0xd40f5a = _0x41af69;
            document[_0xd40f5a(0x17f)]('#cancelbtn')[_0xd40f5a(0xe5)]();
        }), data = {}, data[_0x41af69(0x141)] = moment(startdate)['format']('YYYY-MM-DD'), data[_0x41af69(0x100)] = moment(enddate)[_0x41af69(0x111)](_0x41af69(0x136)), data[_0x41af69(0xd0)] = dataType, data[_0x41af69(0xa6)] = !![], dataType == _0x41af69(0xf8) && (data[_0x41af69(0xba)] = $(_0x41af69(0xa2))[_0x41af69(0xab)]()), requestData['data'] = data, requestDataFromServer(_0x41af69(0x183), {
            'clientData': JSON[_0x41af69(0xaa)](requestData),
            'sitename': ticketSelectedsite,
            'csrfmiddlewaretoken': csfr_token
        }, 'POST')[_0x41af69(0x119)](rangeChangeResponse);
    }
}

function onSelectuser(_0x5abc2a) {
    var _0x34d2f4 = _0x274090;
    clearAllvalues(), data = {}, data[_0x34d2f4(0xd0)] = dataType, startdate = moment()['format']('YYYY-MM-DD') + _0x34d2f4(0x11b), data[_0x34d2f4(0x141)] = startdate, enddate = moment()[_0x34d2f4(0x180)](0x1, _0x34d2f4(0xf7))['format']('YYYY-MM-DD') + _0x34d2f4(0x11b), data[_0x34d2f4(0x100)] = enddate, $('#selectAssignee')['text'](_0x5abc2a), $(_0x34d2f4(0xa2))[_0x34d2f4(0xab)](_0x5abc2a), data[_0x34d2f4(0xba)] = _0x5abc2a, data[_0x34d2f4(0xa6)] = !![], requestData[_0x34d2f4(0x168)] = data, requestDataFromServer(_0x34d2f4(0x183), {
        'clientData': JSON[_0x34d2f4(0xaa)](requestData),
        'sitename': ticketSelectedsite,
        'csrfmiddlewaretoken': csfr_token
    }, _0x34d2f4(0x13b))[_0x34d2f4(0x119)](rangeChangeResponse);
}

function clearAllvalues() {
    var _0x4c882f = _0x274090;
    $(_0x4c882f(0x18a))[_0x4c882f(0x117)](_0x4c882f(0x128), _0x4c882f(0x145)), $(_0x4c882f(0x172))[_0x4c882f(0x117)](_0x4c882f(0x128), _0x4c882f(0x145)), document[_0x4c882f(0xf2)](_0x4c882f(0x165))[_0x4c882f(0xe6)] = !![], $('#ticketinfo\x20#info')[_0x4c882f(0x153)](), $('#ticketinfo\x20#ticketDescription')[_0x4c882f(0x153)](), $(_0x4c882f(0x178))['empty'](), $(_0x4c882f(0xb7))[_0x4c882f(0x153)](), $(_0x4c882f(0xda))[_0x4c882f(0x153)](), document['getElementById'](_0x4c882f(0xaf))['value'] = '', document[_0x4c882f(0xf2)](_0x4c882f(0x137))[_0x4c882f(0x123)][_0x4c882f(0xdd)] = _0x4c882f(0x152), element = document['getElementById'](_0x4c882f(0x134)), element[_0x4c882f(0x123)][_0x4c882f(0x128)] = 'block', element[_0x4c882f(0xe1)] = _0x4c882f(0xd5), document[_0x4c882f(0xf2)](_0x4c882f(0x16d))[_0x4c882f(0x123)][_0x4c882f(0xdd)] = 'hidden';
}

function changeUserText(_0x21b026) {
    var _0x19a84c = _0x274090;
    $('#selectAssignee')[_0x19a84c(0xab)](_0x21b026), $(_0x19a84c(0xa2))['text'](_0x21b026), $(_0x19a84c(0x10e))[_0x19a84c(0xab)](_0x21b026);
}

function displayStatusChart() {
    var _0x5e5f94 = _0x274090;
    isChartloaded = !![], isInfopage = _0x5e5f94(0x14d), isInfopage == _0x5e5f94(0x14d) && getTicketSiteNames();
}

function onSelectAssignee(_0x46cddf) {
    var _0x2bc157 = _0x274090;
    $(_0x2bc157(0xe7))[_0x2bc157(0xab)](_0x46cddf);
}

function onSelectStatus(_0x41cebf) {
    var _0x554599 = _0x274090;
    $(_0x554599(0x16e))[_0x554599(0xab)](_0x41cebf);
}

function getTicketSiteNames() {
    var _0x35967f = _0x274090;
    requestDataFromServer('/lesites/getallsitenames', {
        'type': _0x35967f(0x181),
        'site': params[_0x35967f(0x18c)]('site')
    }, _0x35967f(0x122))[_0x35967f(0x119)](function (_0x7d1ec4) {
        var _0x3eda92 = _0x35967f;
        res = JSON[_0x3eda92(0x135)](_0x7d1ec4), res[_0x3eda92(0x17c)] == 0xc8 && (ticketSiteResponse = res[_0x3eda92(0x168)]), dispalyTickets(ticketSiteResponse[0x0]);
    });
}