var _0x96b63a = _0x31d5;
(function (_0xa969af, _0x55f7ba) {
    var _0x5bb0dc = _0x31d5,
        _0x4131fe = _0xa969af();
    while (!![]) {
        try {
            var _0x532591 = parseInt(_0x5bb0dc(0x1d6)) / 0x1 + parseInt(_0x5bb0dc(0x1b7)) / 0x2 + parseInt(_0x5bb0dc(0x19e)) / 0x3 * (parseInt(_0x5bb0dc(0x1a4)) / 0x4) + -parseInt(_0x5bb0dc(0x24a)) / 0x5 + parseInt(_0x5bb0dc(0x200)) / 0x6 + -parseInt(_0x5bb0dc(0x23f)) / 0x7 + parseInt(_0x5bb0dc(0x19d)) / 0x8 * (-parseInt(_0x5bb0dc(0x23d)) / 0x9);
            if (_0x532591 === _0x55f7ba) break;
            else _0x4131fe['push'](_0x4131fe['shift']());
        } catch (_0x3e68d4) {
            _0x4131fe['push'](_0x4131fe['shift']());
        }
    }
}(_0x5b9a, 0x8e35c), redisKeys = []);
var bodeodFinalStatus = '',
    connectionTries = 0x6,
    isWSConnected = ![];
sites = [];
var siteHtml = '\x20';
selectedsite = '\x20';

function _0x31d5(_0x30547d, _0x57a827) {
    var _0x5b9a35 = _0x5b9a();
    return _0x31d5 = function (_0x31d541, _0x35b95a) {
        _0x31d541 = _0x31d541 - 0x19c;
        var _0x2aded7 = _0x5b9a35[_0x31d541];
        return _0x2aded7;
    }, _0x31d5(_0x30547d, _0x57a827);
}
var bodSiteResponse, sitesResponse, bodSitesData = [],
    bodeodResponse;
$(document)[_0x96b63a(0x22b)](function () {
    getSiteListMainPage(), profilename();
});

function profilename() {
    var _0x37cf39 = _0x96b63a;
    requestDataFromServer('/notificationsettings/getallservices', {}, _0x37cf39(0x1b2))['done'](getprofilenameResponse);
}

function getSiteListMainPage() {
    var _0x3bfd41 = _0x96b63a;
    requestDataFromServer('/lesites/getallsitenames', {
        'type': _0x3bfd41(0x207),
        'isOnlyEnabled': !![]
    }, _0x3bfd41(0x1b2))[_0x3bfd41(0x1d1)](ListInMainPage);
}

function getprofilenameResponse(_0x3b6849) {
    var _0x264f3a = _0x96b63a;
    res = JSON[_0x264f3a(0x24c)](_0x3b6849), res[_0x264f3a(0x20c)] == 0xc8 ? ($(_0x264f3a(0x1fe))[_0x264f3a(0x21b)](), serviceList = res[_0x264f3a(0x1cd)], userobject = res['userobj'], document[_0x264f3a(0x1e8)](_0x264f3a(0x23c))[_0x264f3a(0x220)] = userobject['first_name'], document['getElementById']('profile_text')['textContent'] = userobject[_0x264f3a(0x223)]) : swal(_0x3b6849[_0x264f3a(0x209)], '\x20', _0x264f3a(0x1ad));
}

function sortOn(_0x42c0b7, _0x59f4a2) {
    var _0x29752d = _0x96b63a;
    _0x42c0b7[_0x29752d(0x1a3)](function (_0x14ec1a, _0x4cad48) {
        if (_0x14ec1a[_0x59f4a2] < _0x4cad48[_0x59f4a2]) return -0x1;
        else return _0x14ec1a[_0x59f4a2] > _0x4cad48[_0x59f4a2] ? 0x1 : 0x0;
    });
}

function _0x5b9a() {
    var _0x395a7f = ['each', '892392avUjHZ', '<tr\x20class=\x22text-uppercase\x20size12\x20bold-text\x22>', 'btn-success', '#new-label', '</table>', '<span\x20class=\x22size12\x20', 'site_data', 'Your\x20browser\x20does\x20not\x20support\x20WebSockets.\x20Updates\x20will\x20not\x20work\x20properly.', 'block', 'display', '#bod-eodstatus\x20#site-list', 'includes', 'responseData', 'file-info', '<i\x20class=\x22icon-select\x22></i>', 'Failure', 'over', 'file_content', 'getElementById', 'filter', 'checked', '<tr\x20class=\x22\x22>', '<td>', '<td\x20class=\x22col-10\x22>', 'stringify', 'No\x20Cancel', 'failure', '\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<label\x20class=\x22container\x22>\x20', '#bod-eodstatus\x20#bod-eodstatus-nodata', '</a></li>', '-indicator', 'code', 'Yes,\x20try\x20again', '<td\x20class=\x22white-text\x20', 'connectionTries', 'site', 'forEach', 'html', '</tbody>', '\x20</td>', '#notificationpreferences\x20#servicelist', 'background', '168330WXMbFM', 'Expand', '\x22style=\x22margin-left:\x2010px;\x20font-weight:\x20bold;\x22>', '#bod-eodstatus\x20#site-list\x20li\x20a.active', '\x20<a\x20data-toggle=\x22collapse\x22\x20class=\x22accordion-toggle\x22\x20href=\x22#', 'hidden', '</div>\x20', 'userbased', 'refresh', 'msg', '#site-data', '<table\x20id=\x22data\x22>', 'status', '#dialog-for-content\x20#nodata', 'replace', '.switch_label', 'Success', '/exchange/bodeod_update', 'green', 'text', '<tr\x20class=\x22collapse-tr\x20parent\x20row\x22\x20id=\x22', '\x22\x20\x20id=\x22', '<td\x20colspan=\x2212\x22\x20class=\x22hiddenRow\x20border-0\x20p-0\x20col-12\x22>', '<button\x20class=\x22btn\x20btn-default\x20btn-ripple\x20accordion-toggle\x20ml-2\x22\x20data-toggle=\x22collapse\x22\x20data-target=\x22#', '#bod-eodstatus\x20#site-data', 'matrix', 'none', 'empty', '<a\x20class=\x22dropdown-item\x20preview-item\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22preview-item-content\x22\x20\x20style=\x22text-align:\x20right;\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22preview-subject\x20card-title\x22>SELECT\x20SITES</p>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</a>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22dropdown-divider\x22></div>', 'bod-eodstatus', '</td>', '</button>', 'textContent', 'visibility', '<h5\x20class=\x22size14\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22>Executed\x20On\x20:\x20', 'first_name', '#bod-eodstatus\x20#site-list\x20li\x20a', 'show', 'No\x20Keys', '#ff3d57', '#bod-eodstatus\x20#site-list\x20#', 'append', '#file_content', 'ready', 'active', 'success', 'key', 'linkedeye', 'isWSConnected', 'red', '<td\x20class=\x22px-5\x20py-1\x20profile-td\x22><a\x20id=\x22', 'dialog-for-content', 'inline', 'addClass', '_li', '<div\x20class=\x22accordian-body\x20collapse\x20col-12\x20border-b\x22\x20id=\x22', 'setItem', 'WebSocket', '<li\x20class=\x22nav-item\x22\x20id=\x22', 'object', 'profile_name', '5184XDHvLW', '<div\x20class=\x22row\x20py-2\x20site-keys\x22\x20id=\x22', '2253762azFVNp', 'No\x20Data', 'length', 'sitename', '\x22\x20id=\x22', 'split', 'hide', '<tbody\x20class=\x22col-12\x22>', '<thead\x20class=\x22table-head\x22>', 'push', '\x27)\x22>', '4570665FexFCx', 'Collapse', 'parse', 'removeClass', 'connect', '<td\x20class=\x22col-2\x20action-btn\x20float-right\x20text-right\x22>', '2840xlHDNe', '39yBXdoq', '<input\x20type\x20=\x20\x22radio\x22\x20checked\x20name\x20=\x20\x22radio\x22\x20>', '<div\x20class=\x22row\x20card-body\x20py-lg-4\x20py-2\x20bg\x22>', '#bod-eodstatus\x20#', '#bodeodstatus', 'sort', '223308RslDCV', 'refreshedsite', 'websocket_url', 'key_data', 'ctcl_id', '<h4\x20class=\x22card-title\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22><i\x20class=\x22\x20icon-play\x22></i>', '\x27\x22\x20', 'isSuccess', '#dialog-for-content\x20#nodata\x20#nodatamessage', 'error', '_li\x20a', 'Want\x20to\x20get\x20bod-eod\x20updates?', '#bod-eodstatus-nodata\x20#nodatamessage', '<div\x20id=\x22table-view\x22\x20class=\x22col-12\x22\x20style=\x22overflow-x:\x20auto;\x22>', 'GET', 'css', 'online', 'collapse', '<tr\x20class=\x22border-0\x20collapse-content\x20row\x22\x20id=\x22child-', '753746idjCKd', '\x20</a>', 'Redis\x20not\x20reachable.', '<input\x20type\x20=\x20\x22radio\x22\x20name\x20=\x20\x22radio\x22\x20\x20onclick=\x22location.href=\x27/lesites?site=', '\x22\x20data-toggle=\x22tab\x22\x20onclick=\x22onBodSiteTabchange(\x27', '</tr>', '#bod-eodstatus\x20#bod-eodstatus-expand', 'visible', '_li\x20', '</div>', '-indicator\x22></span>\x20<a\x20class=\x22nav-link\x20red\x20bold-text\x22\x20data-id=\x22', '#get-sites-main-page\x20#site-list', 'BOD-EODStatus', '/bod-eodstatus/readfile', '\x22\x20onclick=\x22onFileinfo(\x27', 'type', '#dialog-for-content\x20#file_content', '/bod-eodstatus/getbodeodkeys', 'keyName', 'file_path', 'subscribe', '<td></td>', 'data', '<div\x20class=\x22col-12\x22>', 'emsg', '-data', 'done', 'some', 'red-bg', 'info'];
    _0x5b9a = function () {
        return _0x395a7f;
    };
    return _0x5b9a();
}

function ListInMainPage(_0x4c2523) {
    var _0x3ca50b = _0x96b63a;
    if (_0x4c2523 == undefined) return;
    sitesResponse = JSON[_0x3ca50b(0x24c)](_0x4c2523), sitesData = sitesResponse['data'], sortOn(sitesData, _0x3ca50b(0x242));
    var _0x26601d = _0x3ca50b(0x21c);
    sitesData['length'] > 0x0 && sitesData[_0x3ca50b(0x1fa)](function (_0x26333a) {
        var _0x31384e = _0x3ca50b;
        _0x26601d += '<a\x20class=\x22dropdown-item\x20preview-item\x20\x22\x20href=\x22/lesites?site=' + _0x26333a[_0x31384e(0x242)] + _0x31384e(0x1f1), selectedsite != null && selectedsite == _0x26333a[_0x31384e(0x242)] ? _0x26601d += _0x31384e(0x19f) : _0x26601d += _0x31384e(0x1ba) + _0x26333a[_0x31384e(0x242)] + _0x31384e(0x1aa), _0x26601d += '<span\x20class=\x22checkmark\x22></span>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</label>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22preview-item-content\x22\x20\x20style=\x22text-align:\x20right;\x22>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22preview-subject\x22>' + _0x26333a[_0x31384e(0x242)] + '</p>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</a>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22dropdown-divider\x22></div>';
    }), $(_0x3ca50b(0x1c2))['append'](_0x26601d);
}

function getBodEodkeys() {
    var _0x5a52da = _0x96b63a;
    requestDataFromServer(_0x5a52da(0x1c8), {
        'sitename': '\x20'
    }, 'GET')[_0x5a52da(0x1d1)](bodEodkeysResponse);
}

function bodEodkeysResponse(_0x50840a) {
    var _0x5d98a3 = _0x96b63a;
    if (_0x50840a == undefined) return;
    bodeodResponse = _0x50840a[_0x5d98a3(0x1e2)], stopLoader(_0x5d98a3(0x21d));
    if (_0x50840a[_0x5d98a3(0x1e2)]['length'] > 0x0) {
        _0x50840a['responseData']['forEach'](function (_0xc92a85) {
            var _0xd2aaf0 = _0x5d98a3,
                _0x5a7e63 = {};
            _0x5a7e63['site'] = _0xc92a85['site'], _0x5a7e63[_0xd2aaf0(0x1ab)] = !![], _0x5a7e63[_0xd2aaf0(0x230)] = ![];
            var _0x142973 = 0x0;
            if (_0xc92a85[_0xd2aaf0(0x1dc)][_0xd2aaf0(0x241)] > 0x0) {
                _0xc92a85[_0xd2aaf0(0x1dc)][_0xd2aaf0(0x1fa)](function (_0x4889cb) {
                    var _0x1548fd = _0xd2aaf0,
                        _0x7a9246 = _0x4889cb[_0x1548fd(0x1a7)],
                        _0x4eb930 = _0x7a9246[_0x1548fd(0x1cd)];
                    if (_0x7a9246[_0x1548fd(0x1c6)] == _0x1548fd(0x219)) $[_0x1548fd(0x1d5)](_0x4eb930, function (_0x47746e) {
                        var _0x65a326 = _0x1548fd,
                            _0x51eabe = _0x4eb930[_0x47746e];
                        $[_0x65a326(0x1d5)](_0x51eabe, function (_0x3ec0ed, _0x8ab9af) {
                            var _0x5d2bce = _0x51eabe[_0x3ec0ed];
                            _0x5d2bce['isSuccess'] == ![] && _0x142973++;
                        });
                    });
                    else
                        for (var _0x225bbc = 0x0; _0x225bbc < _0x4eb930[_0x1548fd(0x241)]; _0x225bbc++) {
                            _0x4eb930[_0x225bbc][_0x1548fd(0x1ab)] == ![] && _0x142973++;
                        }
                });
                if (_0x142973 != 0x0) {
                    _0x5a7e63[_0xd2aaf0(0x1ab)] = ![];
                    if (selectedsite == '\x20') selectedsite = _0xc92a85['site'];
                }
            } else {
                _0x5a7e63[_0xd2aaf0(0x1ab)] = ![];
                if (selectedsite == '\x20') selectedsite = _0xc92a85[_0xd2aaf0(0x1f9)];
            }
            bodSitesData[_0xd2aaf0(0x248)](_0x5a7e63);
            var _0x1d99d7 = bodSiteResponse[_0xd2aaf0(0x1e9)](_0x3d8a8e => _0x3d8a8e[_0xd2aaf0(0x242)] === _0x5a7e63['site'])[0x0];
            connectWebSocket(_0x1d99d7[_0xd2aaf0(0x1a6)], _0x5a7e63[_0xd2aaf0(0x1f9)], 0x0);
        });
        var _0x33f795 = '',
            _0x49c87d = '';
        siteFailCount = 0x0, bodSitesData[_0x5d98a3(0x1fa)](function (_0x2bb903) {
            var _0x2fa7c4 = _0x5d98a3;
            _0x2bb903['isSuccess'] ? _0x33f795 += _0x2fa7c4(0x23a) + _0x2bb903['site'] + '_li\x22\x20style=\x22position:\x20relative;\x22><span\x20class=\x22indicator-circle\x22\x20style=\x22background:\x20#ff3d57;\x20z-index:\x20100;position:\x20absolute;top:\x20-4px;right:\x206px;\x22\x20id=\x22' + _0x2bb903['site'] + '-indicator\x22></span>\x20<a\x20class=\x22nav-link\x20green\x20bold-text\x22\x20data-id=\x22' + _0x2bb903[_0x2fa7c4(0x1f9)] + _0x2fa7c4(0x243) + _0x2bb903['site'] + _0x2fa7c4(0x1bb) + _0x2bb903['site'] + _0x2fa7c4(0x249) + _0x2bb903['site'] + _0x2fa7c4(0x1f3) : (siteFailCount++, _0x49c87d += _0x2fa7c4(0x23a) + _0x2bb903['site'] + '_li\x22\x20style=\x22position:\x20relative;\x22><span\x20class=\x22indicator-circle\x22\x20style=\x22background:\x20#ff3d57;\x20z-index:\x20100;position:\x20absolute;top:\x20-4px;right:\x206px;\x22\x20id=\x22' + _0x2bb903[_0x2fa7c4(0x1f9)] + _0x2fa7c4(0x1c1) + _0x2bb903[_0x2fa7c4(0x1f9)] + _0x2fa7c4(0x215) + _0x2bb903[_0x2fa7c4(0x1f9)] + _0x2fa7c4(0x1bb) + _0x2bb903['site'] + _0x2fa7c4(0x249) + _0x2bb903[_0x2fa7c4(0x1f9)] + _0x2fa7c4(0x1f3));
        });
        if (siteFailCount != 0x0) bodeodFinalStatus = _0x5d98a3(0x1e5);
        else bodeodFinalStatus = 'Success';
        $('#bodeodstatus')[_0x5d98a3(0x1fb)](bodeodFinalStatus), bodeodFinalStatus == _0x5d98a3(0x1e5) ? $(_0x5d98a3(0x1a2))[_0x5d98a3(0x24d)](_0x5d98a3(0x212))[_0x5d98a3(0x235)](_0x5d98a3(0x231)) : $(_0x5d98a3(0x1a2))[_0x5d98a3(0x24d)](_0x5d98a3(0x231))[_0x5d98a3(0x235)]('green'), $('#bod-eodstatus\x20#site-list')[_0x5d98a3(0x229)](_0x49c87d), $(_0x5d98a3(0x1e0))[_0x5d98a3(0x229)](_0x33f795), $(_0x5d98a3(0x224))['eq'](0x0)['addClass'](_0x5d98a3(0x22c));
        if ($('#bod-eodstatus\x20#site-list\x20li\x20a')['eq'](0x0)['data']()) selectedsite = $(_0x5d98a3(0x224))['eq'](0x0)[_0x5d98a3(0x1cd)]()['id'];
        else {
            if (selectedsite && bodSitesData[_0x5d98a3(0x241)] > 0x0) selectedsite = bodSitesData[0x0][_0x5d98a3(0x1f9)];
        }
        var _0x23babe = bodeodResponse[_0x5d98a3(0x1e9)](_0x166d14 => _0x166d14[_0x5d98a3(0x1f9)] === selectedsite)[0x0];
        displayKeys(_0x23babe, selectedsite);
    } else $(_0x5d98a3(0x218))[_0x5d98a3(0x1b3)]('display', 'none'), $(_0x5d98a3(0x1f2))['css'](_0x5d98a3(0x1df), _0x5d98a3(0x1de)), $(_0x5d98a3(0x1b0))[_0x5d98a3(0x213)](_0x5d98a3(0x240)), $(_0x5d98a3(0x1bd))[_0x5d98a3(0x1b3)](_0x5d98a3(0x1df), 'none');
}

function displayKeys(_0x257596, _0x56ac77) {
    var _0x16f6e0 = _0x96b63a;
    keyFailCount = 0x0, _0x257596[_0x16f6e0(0x1dc)]['length'] > 0x0 ? (redisKeys = [], keyHtml = '', keyHtml += _0x16f6e0(0x23e) + _0x257596[_0x16f6e0(0x1f9)] + '\x22>', keyHtml += '<div\x20class=\x22col-12\x22>', keyHtml += '<table\x20class=\x22row\x22>', keyHtml += _0x16f6e0(0x246), _0x257596[_0x16f6e0(0x1dc)][_0x16f6e0(0x1fa)](function (_0x1901e4) {
        var _0x4fa9ea = _0x16f6e0,
            _0x24bc84 = {},
            _0x4525cc = _0x1901e4[_0x4fa9ea(0x1a7)],
            _0x99db16 = _0x4525cc[_0x4fa9ea(0x1cd)];
        failCount = 0x0, rowHtml = '';
        var _0x101247 = _0x1901e4[_0x4fa9ea(0x22e)];
        _0x101247 = _0x101247[_0x4fa9ea(0x20e)](/[:.]/g, '_');
        if (_0x4525cc[_0x4fa9ea(0x1c6)] == _0x4fa9ea(0x219)) {
            var _0x72ebfd = '';
            $['each'](_0x99db16, function (_0x5ae5dd) {
                var _0xa32792 = _0x4fa9ea;
                html = _0xa32792(0x1ec) + _0x5ae5dd + _0xa32792(0x21e);
                var _0x1e892d = '',
                    _0x22cb22 = _0x99db16[_0x5ae5dd];
                $[_0xa32792(0x1d5)](_0x22cb22, function (_0x5df8e9, _0x5f2982) {
                    var _0x1bc3b7 = _0xa32792,
                        _0x3631f8 = _0x22cb22[_0x5df8e9];
                    if (typeof _0x3631f8 == _0x1bc3b7(0x23b)) {
                        if (_0x3631f8['isSuccess'] == ![]) bgcolor = _0x1bc3b7(0x1d3), failCount++, keyFailCount++;
                        else bgcolor = 'green-bg';
                        _0x1e892d += _0x1bc3b7(0x1f7) + bgcolor + '\x22>' + _0x3631f8[_0x1bc3b7(0x1a8)] + _0x1bc3b7(0x21e);
                    } else _0x1e892d += '<td>' + _0x3631f8 + _0x1bc3b7(0x21e);
                }), html = html + _0x1e892d, _0x72ebfd += _0xa32792(0x1eb) + html + _0xa32792(0x1bc);
            }), rowHtml = _0x72ebfd;
        } else {
            var _0x72ebfd = '';
            for (var _0x1fdb0c = 0x0; _0x1fdb0c < _0x99db16['length']; _0x1fdb0c++) {
                var _0x1330ab = !![];
                tempHtml = '', $[_0x4fa9ea(0x1d5)](_0x99db16[_0x1fdb0c], function (_0xcae4b0, _0x1bfbb4) {
                    var _0x14bcc8 = _0x4fa9ea;
                    _0xcae4b0 == _0x14bcc8(0x1ab) && _0x1bfbb4 == ![] && (_0x1330ab = ![]);
                    if (typeof _0x1bfbb4 == _0x14bcc8(0x23b)) _0x1bfbb4 = JSON[_0x14bcc8(0x1ee)](_0x1bfbb4);
                    if (_0xcae4b0[_0x14bcc8(0x1e1)](_0x14bcc8(0x1ca))) tempHtml += _0x14bcc8(0x232) + _0x1fdb0c + '-' + _0x14bcc8(0x1e3) + _0x14bcc8(0x1c5) + _0x1bfbb4 + '\x27,' + _0x1fdb0c + ',\x27' + _0x1901e4[_0x14bcc8(0x22e)][_0x14bcc8(0x20e)](/[:.]/g, '_') + '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-content\x22\x20class=\x22profile\x22><img\x20src=\x22../static/app/icons/view\x20file.png\x22/></a></td>';
                    else {
                        if (_0xcae4b0 != _0x14bcc8(0x1ab)) tempHtml += '<td>' + _0x1bfbb4 + _0x14bcc8(0x21e);
                    }
                });
                if (_0x1330ab == ![]) rowColor = 'red', failCount++, keyFailCount++;
                else rowColor = 'green';
                _0x72ebfd += '<tr\x20class=\x22' + rowColor + '\x22>' + tempHtml + '</tr>';
            }
            rowHtml = _0x72ebfd;
        }
        var _0x117c98 = _0x1901e4['key'];
        _0x24bc84[_0x4fa9ea(0x1c9)] = _0x117c98, _0x24bc84[_0x4fa9ea(0x1f9)] = _0x257596[_0x4fa9ea(0x1f9)], keyName = _0x117c98[_0x4fa9ea(0x244)](':')[0x1]['replace']('_', '-'), keyHtml += _0x4fa9ea(0x214) + _0x1901e4['key'] + '\x22>', keyHtml += _0x4fa9ea(0x1ed), keyHtml += _0x4fa9ea(0x204) + _0x101247 + '-data' + '\x22>';
        var _0x240e8e = _0x4fa9ea(0x210),
            _0x4bb146 = _0x4fa9ea(0x212);
        if (failCount != 0x0) {
            var _0x240e8e = _0x4fa9ea(0x1e5),
                _0x4bb146 = _0x4fa9ea(0x231);
            _0x24bc84[_0x4fa9ea(0x1ab)] = ![];
        } else _0x24bc84[_0x4fa9ea(0x1ab)] = !![];
        redisKeys[_0x4fa9ea(0x248)](_0x24bc84), keyHtml += _0x4fa9ea(0x1a9) + keyName + _0x4fa9ea(0x1db) + _0x4bb146 + _0x4fa9ea(0x202) + _0x240e8e + '</span></h4>', keyHtml += _0x4fa9ea(0x1ec), keyHtml += _0x4fa9ea(0x19c), keyHtml += _0x4fa9ea(0x217) + _0x101247 + _0x4fa9ea(0x1d0) + '\x22>', keyHtml += _0x4fa9ea(0x1e4), keyHtml += _0x4fa9ea(0x21f), keyHtml += _0x4fa9ea(0x1b8), keyHtml += _0x4fa9ea(0x1fd), keyHtml += _0x4fa9ea(0x1bc), keyHtml += _0x4fa9ea(0x1b6) + _0x1901e4[_0x4fa9ea(0x22e)][_0x4fa9ea(0x20e)](/[:.]/g, '_') + '\x22>', keyHtml += _0x4fa9ea(0x216), keyHtml += _0x4fa9ea(0x237) + _0x101247 + '-data' + '\x22>', keyHtml += _0x4fa9ea(0x1a0), keyHtml += _0x4fa9ea(0x1ce), keyHtml += _0x4fa9ea(0x222) + _0x4525cc['executedOn'] + '</h5>', keyHtml += _0x4fa9ea(0x1c0), keyHtml += _0x4fa9ea(0x1b1), keyHtml += _0x4fa9ea(0x20b), keyHtml += _0x4fa9ea(0x247), keyHtml += _0x4fa9ea(0x1d7);
        var _0x4525cc = _0x1901e4[_0x4fa9ea(0x1a7)],
            _0x99db16 = _0x4525cc[_0x4fa9ea(0x1cd)];
        theadHtml = '', _0x4525cc[_0x4fa9ea(0x1c6)] == _0x4fa9ea(0x219) ? (theadHtml += _0x4fa9ea(0x1cc), $[_0x4fa9ea(0x1d5)](_0x99db16[Object['keys'](_0x99db16)[0x0]], function (_0x466892) {
            var _0x1cc7b7 = _0x4fa9ea;
            theadHtml += _0x1cc7b7(0x1ec) + _0x466892 + _0x1cc7b7(0x21e);
        })) : $[_0x4fa9ea(0x1d5)](_0x99db16[0x0], function (_0x49c931) {
            var _0x2235f9 = _0x4fa9ea;
            if (_0x49c931 != _0x2235f9(0x1ab)) theadHtml += _0x2235f9(0x1ec) + _0x49c931 + _0x2235f9(0x21e);
        }), keyHtml = keyHtml + theadHtml, keyHtml += _0x4fa9ea(0x1bc), keyHtml += '</thead>', keyHtml += '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22>', keyHtml = keyHtml + rowHtml, keyHtml += '</tbody>', keyHtml += _0x4fa9ea(0x1da), keyHtml += _0x4fa9ea(0x1c0), keyHtml += _0x4fa9ea(0x1c0), keyHtml += _0x4fa9ea(0x206), keyHtml += _0x4fa9ea(0x21e), keyHtml += _0x4fa9ea(0x1bc);
    }), keyHtml += _0x16f6e0(0x1fc), keyHtml += _0x16f6e0(0x1da), keyHtml += _0x16f6e0(0x1c0), keyHtml += _0x16f6e0(0x1c0), _0x56ac77 === selectedsite && ($('#bod-eodstatus\x20#site-data')[_0x16f6e0(0x1b3)](_0x16f6e0(0x1df), _0x16f6e0(0x1de)), $(_0x16f6e0(0x1f2))['css']('display', 'none'), $('#bod-eodstatus\x20#bod-eodstatus-expand')['css'](_0x16f6e0(0x1df), 'block'), $(_0x16f6e0(0x20a))[_0x16f6e0(0x21b)](), $(_0x16f6e0(0x20a))[_0x16f6e0(0x229)](keyHtml))) : (keyFailCount++, $('#bod-eodstatus\x20#site-data')[_0x16f6e0(0x1b3)]('display', 'none'), $(_0x16f6e0(0x1f2))['css'](_0x16f6e0(0x1df), _0x16f6e0(0x1de)), $(_0x16f6e0(0x1bd))[_0x16f6e0(0x1b3)](_0x16f6e0(0x1df), _0x16f6e0(0x21a)), _0x257596[_0x16f6e0(0x1f5)] == 0xc8 ? $(_0x16f6e0(0x1b0))[_0x16f6e0(0x213)](_0x16f6e0(0x226)) : $(_0x16f6e0(0x1b0))[_0x16f6e0(0x213)](_0x16f6e0(0x1b9))), changeStatus(_0x56ac77, keyFailCount);
}

function changeStatus(_0x6fdaab, _0x3ad4a9) {
    var _0x2ebaca = _0x96b63a,
        _0x2a9fc2 = bodSitesData['filter'](_0x1c6eaa => _0x1c6eaa['site'] === _0x6fdaab)[0x0];
    _0x3ad4a9 == 0x0 ? (_0x2a9fc2[_0x2ebaca(0x1ab)] = !![], $(_0x2ebaca(0x228) + _0x6fdaab + _0x2ebaca(0x236))[_0x2ebaca(0x24d)](_0x2ebaca(0x1f0))[_0x2ebaca(0x235)]('success'), $('#bod-eodstatus\x20#site-list\x20#' + _0x6fdaab + _0x2ebaca(0x1ae))[_0x2ebaca(0x24d)]('red')[_0x2ebaca(0x235)]('green')) : (_0x2a9fc2[_0x2ebaca(0x1ab)] = ![], $(_0x2ebaca(0x228) + _0x6fdaab + _0x2ebaca(0x236))[_0x2ebaca(0x24d)](_0x2ebaca(0x22d))[_0x2ebaca(0x235)](_0x2ebaca(0x1f0)), $(_0x2ebaca(0x228) + _0x6fdaab + _0x2ebaca(0x1ae))['removeClass']('green')[_0x2ebaca(0x235)](_0x2ebaca(0x231)));
    var _0x2f40a9 = bodSitesData[_0x2ebaca(0x1d2)](_0x387c29 => _0x387c29[_0x2ebaca(0x1ab)] == ![]);
    _0x2f40a9 ? bodeodFinalStatus = _0x2ebaca(0x1e5) : bodeodFinalStatus = _0x2ebaca(0x210), $(_0x2ebaca(0x1a2))[_0x2ebaca(0x1fb)](bodeodFinalStatus), bodeodFinalStatus == _0x2ebaca(0x1e5) ? $(_0x2ebaca(0x1a2))['removeClass'](_0x2ebaca(0x212))[_0x2ebaca(0x235)]('red') : $(_0x2ebaca(0x1a2))[_0x2ebaca(0x24d)](_0x2ebaca(0x231))['addClass'](_0x2ebaca(0x212));
}

function clickOnAll(_0x189d5b) {
    var _0x515c97 = _0x96b63a,
        _0x18cbd5 = redisKeys['filter'](_0x3a3742 => _0x3a3742['site'] === selectedsite);
    _0x189d5b[_0x515c97(0x1ea)] == !![] ? ($(_0x515c97(0x20f))[_0x515c97(0x213)](_0x515c97(0x24b)), _0x18cbd5[_0x515c97(0x1fa)](function (_0x5162ed) {
        var _0xe4442 = _0x515c97,
            _0x50723e = _0x5162ed[_0xe4442(0x1c9)];
        _0x50723e = _0x50723e['replace'](/[:.]/g, '_'), $('#' + selectedsite + '\x20#' + _0x50723e + '-data')[_0xe4442(0x1b5)](_0xe4442(0x225));
    })) : ($('.switch_label')[_0x515c97(0x213)](_0x515c97(0x201)), _0x189d5b[_0x515c97(0x1ea)] == ![], _0x18cbd5[_0x515c97(0x1fa)](function (_0x3e0b3a) {
        var _0x536746 = _0x515c97,
            _0x1bd0c3 = _0x3e0b3a[_0x536746(0x1c9)];
        _0x1bd0c3 = _0x1bd0c3[_0x536746(0x20e)](/[:.]/g, '_'), $('#' + selectedsite + '\x20#' + _0x1bd0c3 + '-data')[_0x536746(0x1b5)](_0x536746(0x245));
    }));
}

function connectWebSocket(_0x37c075, _0x35a8ea, _0x56dc17) {
    var _0x8fc8c2 = _0x96b63a;
    try {
        if (window[_0x8fc8c2(0x239)]) {
            var _0xa8223b = _0x8fc8c2(0x211),
                _0x5f5190 = new WebSocket(_0x37c075),
                _0x861baf = Stomp[_0x8fc8c2(0x1e6)](_0x5f5190);
            _0x861baf['id'] = _0x35a8ea, _0x861baf[_0x8fc8c2(0x1f8)] = _0x56dc17;
            var _0x4bc7d0 = function () {
                var _0x1841cb = _0x8fc8c2,
                    _0x42839b = bodSitesData[_0x1841cb(0x1e9)](_0x3d21ad => _0x3d21ad[_0x1841cb(0x1f9)] === _0x861baf['id'])[0x0];
                _0x42839b[_0x1841cb(0x230)] = !![], isWSConnected = !![], _0x861baf[_0x1841cb(0x1cb)](_0xa8223b, function (_0x2853e6) {
                    var _0x26a915 = _0x1841cb,
                        _0x1a82e8 = JSON['parse'](_0x2853e6['body']),
                        _0x23f855 = bodSitesData['some'](_0x495c8e => _0x495c8e['site'] == _0x1a82e8[_0x26a915(0x1f9)]);
                    _0x1a82e8[_0x26a915(0x208)] == 0x1 && _0x23f855 && (requestDataFromServer('/bod-eodstatus/getbodeodkeys', {
                        'sitename': _0x1a82e8['site']
                    }, 'GET')[_0x26a915(0x1d1)](function (_0x4714e2) {
                        var _0xc8d7c = _0x26a915;
                        displayKeys(_0x4714e2[_0xc8d7c(0x1e2)][0x0], _0x4714e2[_0xc8d7c(0x1a5)]);
                    }), pageName != _0x26a915(0x1c3) && (localStorage[_0x26a915(0x238)]('newlabeldisplay', _0x26a915(0x234)), $(_0x26a915(0x1d9))[_0x26a915(0x1b3)](_0x26a915(0x1df), 'inline')));
                }), $(_0x1841cb(0x1a1) + _0x861baf['id'] + '-indicator')['css'](_0x1841cb(0x1ff), '#16d39a'), this[_0x1841cb(0x1f8)] = 0x6;
            },
                _0x1877b6 = function (_0x4424cc) {
                    var _0x4d9c89 = _0x8fc8c2;
                    $(_0x4d9c89(0x1a1) + _0x861baf['id'] + _0x4d9c89(0x1f4))[_0x4d9c89(0x1b3)]('background', _0x4d9c89(0x227));
                    var _0x3263a4 = bodSitesData[_0x4d9c89(0x1e9)](_0x4df754 => _0x4df754[_0x4d9c89(0x1f9)] === _0x861baf['id'])[0x0];
                    _0x3263a4['isWSConnected'] = ![], networkStatus === _0x4d9c89(0x1b4) && (_0x861baf[_0x4d9c89(0x1f8)] == 0xa ? swal({
                        'title': _0x4d9c89(0x1af),
                        'text': 'Not\x20able\x20to\x20connect\x20web\x20socket\x20of\x20\x22' + _0x861baf['id'] + '\x22.\x20Please\x20check\x20once!.',
                        'type': _0x4d9c89(0x1d4),
                        'showCancelButton': !![],
                        'confirmButtonClass': _0x4d9c89(0x1d8),
                        'confirmButtonText': _0x4d9c89(0x1f6),
                        'cancelButtonText': _0x4d9c89(0x1ef),
                        'closeOnConfirm': !![],
                        'closeOnCancel': !![]
                    }, function (_0xa84924) {
                        var _0x5fe344 = _0x4d9c89;
                        _0xa84924 ? connectWebSocket(_0x861baf['ws']['url'], _0x861baf['id'], 0x0) : $('#bod-eodstatus\x20#' + _0x861baf['id'] + _0x5fe344(0x1f4))[_0x5fe344(0x1b3)](_0x5fe344(0x1ff), '#ff3d57');
                    }) : (_0x861baf[_0x4d9c89(0x1f8)]++, connectWebSocket(_0x861baf['ws']['url'], _0x861baf['id'], _0x861baf['connectionTries'])));
                };
            _0x861baf[_0x8fc8c2(0x24e)]('linkedeye', _0x8fc8c2(0x22f), _0x4bc7d0, _0x1877b6, '/');
        } else alert(_0x8fc8c2(0x1dd));
    } catch (_0x50f1ce) {
        return;
    }
}

function onBodSiteTabchange(_0x565855) {
    var _0x13ba7b = _0x96b63a;
    selectedsite = _0x565855, $(_0x13ba7b(0x203))[_0x13ba7b(0x24d)]('active'), $(_0x13ba7b(0x228) + _0x565855 + _0x13ba7b(0x1bf) + 'a')[_0x13ba7b(0x235)](_0x13ba7b(0x22c)), $(_0x13ba7b(0x20a))[_0x13ba7b(0x21b)]();
    var _0x447b97 = bodSitesData[_0x13ba7b(0x1e9)](_0x262104 => _0x262104[_0x13ba7b(0x1f9)] === selectedsite)[0x0];
    _0x447b97['isWSConnected'] == ![] && (_0x447b97 = bodSiteResponse[_0x13ba7b(0x1e9)](_0x340368 => _0x340368[_0x13ba7b(0x242)] === selectedsite)[0x0], connectWebSocket(_0x447b97[_0x13ba7b(0x1a6)], selectedsite, 0x0)), startBodLoader(), requestDataFromServer(_0x13ba7b(0x1c8), {
        'sitename': selectedsite
    }, _0x13ba7b(0x1b2))[_0x13ba7b(0x1d1)](function (_0x14a7d9) {
        var _0x2aacb2 = _0x13ba7b;
        selectedsite = _0x14a7d9[_0x2aacb2(0x1a5)], stopBodLoader(), displayKeys(_0x14a7d9[_0x2aacb2(0x1e2)][0x0], _0x14a7d9[_0x2aacb2(0x1a5)]);
    });
}

function onFileinfo(_0x13bcf2, _0x44b361, _0x19086a) {
    var _0x845bca = _0x96b63a;
    $('#file_content')['empty'](), showLoader(_0x845bca(0x233)), requestDataFromServer(_0x845bca(0x1c4), {
        'filepath': _0x13bcf2,
        'csrfmiddlewaretoken': csfr_token
    }, 'POST')[_0x845bca(0x1d1)](function (_0x482dc4) {
        var _0x1983f9 = _0x845bca;
        stopLoader(_0x1983f9(0x233)), $(_0x1983f9(0x22a))[_0x1983f9(0x21b)](), _0x482dc4[_0x1983f9(0x20c)] == 0xc8 ? ($(_0x1983f9(0x1c7))[_0x1983f9(0x1b3)](_0x1983f9(0x221), _0x1983f9(0x1be)), $('#dialog-for-content\x20#nodata')['css'](_0x1983f9(0x221), _0x1983f9(0x205)), $(_0x1983f9(0x22a))[_0x1983f9(0x229)](_0x482dc4[_0x1983f9(0x1e7)])) : ($('#dialog-for-content\x20#file_content')[_0x1983f9(0x1b3)](_0x1983f9(0x221), _0x1983f9(0x205)), $(_0x1983f9(0x20d))[_0x1983f9(0x1b3)]('visibility', _0x1983f9(0x1be)), $(_0x1983f9(0x1ac))[_0x1983f9(0x213)](_0x482dc4[_0x1983f9(0x1cf)]));
    });
}

function startBodLoader() {
    var _0x1e42e3 = _0x96b63a;
    $(_0x1e42e3(0x1bd))[_0x1e42e3(0x1b3)](_0x1e42e3(0x1df), _0x1e42e3(0x21a)), $(_0x1e42e3(0x1f2))['css']('display', _0x1e42e3(0x21a)), $('#bod-eodstatus\x20#site-data')['css'](_0x1e42e3(0x1df), _0x1e42e3(0x21a)), showLoader(_0x1e42e3(0x21d));
}

function stopBodLoader() {
    var _0x9844b6 = _0x96b63a;
    $(_0x9844b6(0x1bd))[_0x9844b6(0x1b3)]('display', _0x9844b6(0x1de)), $(_0x9844b6(0x1f2))[_0x9844b6(0x1b3)]('display', _0x9844b6(0x1de)), $(_0x9844b6(0x218))['css']('display', 'block'), stopLoader(_0x9844b6(0x21d));
}