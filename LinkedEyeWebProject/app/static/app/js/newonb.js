var _0x1c480c = _0x53e3;
(function (_0x316ac1, _0xdf9078) {
    var _0xcb1d49 = _0x53e3,
        _0x53ae1b = _0x316ac1();
    while (!![]) {
        try {
            var _0x230e40 = -parseInt(_0xcb1d49(0x24c)) / 0x1 * (parseInt(_0xcb1d49(0x1ad)) / 0x2) + -parseInt(_0xcb1d49(0x25c)) / 0x3 * (parseInt(_0xcb1d49(0x187)) / 0x4) + parseInt(_0xcb1d49(0x2c0)) / 0x5 + parseInt(_0xcb1d49(0x2ea)) / 0x6 + -parseInt(_0xcb1d49(0x240)) / 0x7 + parseInt(_0xcb1d49(0x312)) / 0x8 * (-parseInt(_0xcb1d49(0x17f)) / 0x9) + parseInt(_0xcb1d49(0x19c)) / 0xa;
            if (_0x230e40 === _0xdf9078) break;
            else _0x53ae1b['push'](_0x53ae1b['shift']());
        } catch (_0x45f48b) {
            _0x53ae1b['push'](_0x53ae1b['shift']());
        }
    }
}(_0x93b7, 0x88fbd));
var global_all_services, global_ip_addresses, service_list = [],
    ilomgmt_list = [],
    nodemgmt_list = [],
    serviceIdCount = 0x0,
    selectedFileType = '',
    isEdit = ![],
    editRespone, registeredIPAddress = [],
    isServiceEdit = ![],
    hostPath = _0x1c480c(0x282),
    applicationNames = [],
    vaults = [],
    deleteBtn, toBeDeletedHost = !![],
    requestData = {},
    registeredMultiSelect = ![],
    isFillHostDetails = !![],
    emailLists = [],
    nicdatas = '',
    nicdatasip = '',
    nicid = '',
    mgmtilo = '',
    v2cipaddr = '',
    v2cid = '',
    v3cipaddr = '',
    v2cpro = '',
    v3cpro = '',
    v3cid = '',
    mgmtidrac = '',
    mgmtnodeexp = '',
    mgmtiloipaddr = '',
    mgmtidracipaddr = '',
    mgmtnodeipaddr = '',
    gatewayswitch = 0x0,
    publicswitch = 0x0,
    exchangeswitch = 0x0,
    fortigate50E = 0x0,
    fortigate60E = 0x0,
    fortigate60F = 0x0,
    fortigate80F = 0x0,
    fortigate100E = 0x0,
    fortigate100F = 0x0,
    fortigate200F = 0x0,
    physicalser = 0x0,
    virtualser = 0x0,
    nametype = '',
    gcount = 0x0,
    ecount = 0x0,
    scount = 0x0,
    pcount = 0x0,
    fcount = 0x0;
$(document)[_0x1c480c(0x40e)](function () {
    var _0x1401af = _0x1c480c;
    $(_0x1401af(0x382))[_0x1401af(0x331)](), emailListResponse(), getServices();
    window['location'][_0x1401af(0x186)][_0x1401af(0x39e)]('?')['pop']() === 'redirectToAddhostPage' && (isFillHostDetails = ![], $(_0x1401af(0x29d))[_0x1401af(0x408)](_0x1401af(0x3cd), getFileNames(), getServices(), getVaultInformation(), $(_0x1401af(0x248))[_0x1401af(0x331)](), $(_0x1401af(0x180))['hide'](), $(_0x1401af(0x1bf))[_0x1401af(0x39a)]()));
    if (window['location']['href'][_0x1401af(0x39e)]('!')[_0x1401af(0x26d)]() === _0x1401af(0x212)) {
        isFillHostDetails = !![];
        var _0x5852da = window['location'][_0x1401af(0x186)][_0x1401af(0x39e)]('?')[_0x1401af(0x26d)](),
            _0x7576c6 = _0x5852da[_0x1401af(0x39e)]('!')[0x0];
        getVaultInformation(), editRegisteredHosts(_0x7576c6);
    }
    isFillHostDetails && (fillHostDetails(), $(_0x1401af(0x248))['hide'](), $(_0x1401af(0x1bf))[_0x1401af(0x331)]()), $(_0x1401af(0x29d))['click'](function () {
        var _0x447de9 = _0x1401af;
        getFileNames(), getServices(), getVaultInformation(), $('#nodata')['hide'](), $(_0x447de9(0x180))[_0x447de9(0x331)](), $(_0x447de9(0x1bf))[_0x447de9(0x39a)]();
    }), $('#save')[_0x1401af(0x3cd)](function () {
        sendFormDataToServer();
    }), $('#service-selected')[_0x1401af(0x331)](), $(_0x1401af(0x21a))[_0x1401af(0x331)](), $('#multipleIPAddressSelect')['hide'](), $(_0x1401af(0x263))['on'](_0x1401af(0x2f4), function () {
        var _0x56ad06 = _0x1401af;
        $(_0x56ad06(0x191))[_0x56ad06(0x2c1)](''), $(_0x56ad06(0x398))[_0x56ad06(0x2c2)]();
    }), $(_0x1401af(0x2b5))['on'](_0x1401af(0x217), function () {
        var _0x32c94b = _0x1401af;
        if (global_ip_addresses !== undefined) {
            var _0x4db80d = _0x32c94b(0x21c);
            global_ip_addresses[_0x32c94b(0x2d5)](function (_0x1debf8) {
                var _0x3ca916 = _0x1debf8['ip'];
            }), $('#ip-dropdown')[_0x32c94b(0x207)](_0x4db80d);
        }
    });
});

function serverFunction(_0x3c2240) {
    var _0x221d10 = _0x1c480c,
        _0x2a8e44 = _0x3c2240;
    _0x3c2240 == 'VM' ? ($(_0x221d10(0x332))[_0x221d10(0x3c2)]('display', _0x221d10(0x1ec)), $(_0x221d10(0x1bc))[_0x221d10(0x3c2)](_0x221d10(0x230), _0x221d10(0x1eb)), $('#snmp_val')[_0x221d10(0x3c2)]('display', 'none')) : ($(_0x221d10(0x1bc))[_0x221d10(0x3c2)]('display', _0x221d10(0x1eb)), $(_0x221d10(0x332))[_0x221d10(0x3c2)]('display', _0x221d10(0x1eb)), $(_0x221d10(0x1cc))['css'](_0x221d10(0x230), _0x221d10(0x1eb))), html = '', html += _0x221d10(0x3b7) + _0x3c2240 + '\x22>' + _0x3c2240 + _0x221d10(0x1c1), $(_0x221d10(0x219))[_0x221d10(0x207)](html), document[_0x221d10(0x2ad)](_0x221d10(0x24a))[_0x221d10(0x373)] = _0x221d10(0x362) + _0x3c2240 + _0x221d10(0x243), getFileNames(_0x2a8e44);
}

function niccard() {
    var _0x22094d = _0x1c480c;
    requestDataFromServer('Serversnic', {
        'csrfmiddlewaretoken': csfr_token
    }, _0x22094d(0x359))['done'](function (_0xd7bddf) {
        var _0x241ffb = _0x22094d;
        nicres = JSON['parse'](_0xd7bddf);
        var _0x1b60ef = '';
        $(_0x241ffb(0x2d0))[_0x241ffb(0x2c2)](), nicres[_0x241ffb(0x1ef)][_0x241ffb(0x2d5)](function (_0x460e8b) {
            var _0x4a6ef7 = _0x241ffb;
            _0x1b60ef += _0x4a6ef7(0x236), _0x1b60ef += '<div\x20class=\x22col-2\x22\x20type=\x22\x22\x20\x20id=\x22' + _0x460e8b[_0x4a6ef7(0x3e4)] + _0x4a6ef7(0x28f) + _0x460e8b['nic'] + _0x4a6ef7(0x2d6), _0x1b60ef += _0x4a6ef7(0x31a), _0x1b60ef += '<div\x20class=\x22col-6\x20multiip\x22>', _0x1b60ef += _0x4a6ef7(0x292) + _0x460e8b[_0x4a6ef7(0x3e4)] + _0x4a6ef7(0x1c2) + _0x460e8b[_0x4a6ef7(0x3e4)] + '\x27)\x22>', _0x1b60ef += _0x4a6ef7(0x195) + _0x460e8b['nic'] + _0x4a6ef7(0x32d) + _0x460e8b['nic'] + _0x4a6ef7(0x38d), _0x1b60ef += '<input\x20class=\x22ipadd\x22\x20type=\x22text\x22\x20name=\x22' + _0x460e8b['nic'] + '\x22\x20placeholder=\x22Enter\x20IP\x22\x20value=\x22\x22\x20id=\x22' + _0x460e8b[_0x4a6ef7(0x3e4)] + _0x4a6ef7(0x365), _0x1b60ef += _0x4a6ef7(0x31a), _0x1b60ef += _0x4a6ef7(0x336), _0x1b60ef += _0x4a6ef7(0x31a), _0x1b60ef += _0x4a6ef7(0x3f3);
        }), $('#niccardhtml')[_0x241ffb(0x207)](_0x1b60ef);
    });
}

function savenicdata() {
    var _0x4bf280 = _0x1c480c,
        _0x5475b4 = {};
    $(_0x4bf280(0x1c6))['each'](function () {
        var _0x42af9a = _0x4bf280,
            _0x5f4d51 = $(this)[_0x42af9a(0x2d8)](_0x42af9a(0x251))[_0x42af9a(0x2c1)](),
            _0x44a36c = $(this)['find'](_0x42af9a(0x32c))[_0x42af9a(0x2c1)](),
            _0x39a843 = $(this)[_0x42af9a(0x2d8)](_0x42af9a(0x32c))[_0x42af9a(0x327)]('id')[_0x42af9a(0x39e)](_0x42af9a(0x258))[0x0];
        _0x5f4d51 != '' && (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/['test'](_0x44a36c) ? (_0x5475b4[_0x39a843] = {}, _0x5475b4[_0x39a843]['alias'] = _0x5f4d51, _0x5475b4[_0x39a843]['ip'] = _0x44a36c, $(_0x42af9a(0x387))[_0x42af9a(0x331)]()) : (swal(_0x42af9a(0x22e), '\x20', _0x42af9a(0x177)), $(_0x42af9a(0x387))['show']()));
    }), document[_0x4bf280(0x2ad)](_0x4bf280(0x401))['value'] = JSON[_0x4bf280(0x2b2)](_0x5475b4);
}

function Niccards(_0x8da90b, _0xe9f189) {
    var _0x4001ff = _0x1c480c,
        _0x443f49 = document[_0x4001ff(0x2ad)](_0xe9f189 + _0x4001ff(0x258)),
        _0x1c9a00 = document[_0x4001ff(0x2ad)](_0xe9f189 + _0x4001ff(0x2c4));
    _0x443f49[_0x4001ff(0x25f)] = _0x8da90b['checked'] ? ![] : !![], _0x1c9a00[_0x4001ff(0x25f)] = _0x8da90b[_0x4001ff(0x275)] ? ![] : !![], !_0x443f49[_0x4001ff(0x25f)] && _0x443f49[_0x4001ff(0x1e6)](), !_0x1c9a00['disabled'] && _0x1c9a00[_0x4001ff(0x1e6)]();
}

function firewallFunction(_0x205bc4) {
    var _0x5a8296 = _0x1c480c,
        _0x383721 = _0x205bc4;
    $(_0x5a8296(0x3a6))['css'](_0x5a8296(0x230), _0x5a8296(0x1eb)), $(_0x5a8296(0x332))[_0x5a8296(0x3c2)](_0x5a8296(0x230), _0x5a8296(0x1eb)), $(_0x5a8296(0x1bc))[_0x5a8296(0x3c2)](_0x5a8296(0x230), 'none'), $(_0x5a8296(0x1b9))[_0x5a8296(0x3c2)](_0x5a8296(0x230), 'none'), html = '', html += '<option\x20selected\x20value=\x22' + _0x205bc4 + '\x22>' + _0x205bc4 + _0x5a8296(0x1c1), $(_0x5a8296(0x219))[_0x5a8296(0x207)](html), document[_0x5a8296(0x2ad)](_0x5a8296(0x24a))[_0x5a8296(0x373)] = 'Create\x20' + _0x205bc4, getFileNames(_0x383721);
}

function firewalltype() {
    var _0xff8251 = _0x1c480c;
    requestDataFromServer(_0xff8251(0x3ab), {
        'csrfmiddlewaretoken': csfr_token
    }, _0xff8251(0x359))[_0xff8251(0x368)](function (_0x53dd68) {
        var _0x48cf09 = _0xff8251;
        fireres = JSON[_0x48cf09(0x321)](_0x53dd68);
        var _0x583097 = '',
            _0x232c3c;
        $(_0x48cf09(0x33f))['empty'](), fireres[_0x48cf09(0x1ef)] != '' ? (fireres[_0x48cf09(0x1ef)][_0x48cf09(0x2d5)](function (_0x60b392) {
            var _0x39562c = _0x48cf09,
                _0x44d080 = _0x60b392['types'];
            _0x232c3c = _0x44d080['replace'](/\s/g, ''), _0x583097 += _0x39562c(0x33b), _0x583097 += _0x39562c(0x288), _0x583097 += '<div\x20class=\x22row\x22\x20style=\x22display:flex\x22>', _0x583097 += '<div\x20class=\x22col-lg-3\x20col-4\x20my-auto\x22>', _0x583097 += '<div\x20class=\x22mdi\x20mdi-security\x20display-4\x20text-success\x20icon-size-increase\x22></div>', _0x583097 += _0x39562c(0x31a), _0x583097 += _0x39562c(0x305), _0x583097 += _0x39562c(0x2f8) + _0x60b392['types'] + _0x39562c(0x3c8), _0x583097 += _0x39562c(0x1d5) + _0x232c3c + _0x39562c(0x2fc), _0x583097 += _0x39562c(0x348), _0x583097 += _0x39562c(0x290), _0x583097 += _0x39562c(0x307), _0x583097 += _0x39562c(0x27b) + _0x60b392['types'] + _0x39562c(0x190), _0x583097 += _0x39562c(0x36a), _0x583097 += _0x39562c(0x290), _0x583097 += _0x39562c(0x31a), _0x583097 += '</div>', _0x583097 += _0x39562c(0x304);
        }), $(_0x48cf09(0x33f))[_0x48cf09(0x207)](_0x583097)) : swal(_0x48cf09(0x1d7), '\x20', _0x48cf09(0x181)), document['getElementById'](_0x48cf09(0x2af)) != null && (document[_0x48cf09(0x2ad)](_0x48cf09(0x2af))[_0x48cf09(0x373)] = fortigate50E), document['getElementById'](_0x48cf09(0x396)) != null && (document[_0x48cf09(0x2ad)]('Fortigate60E')['textContent'] = fortigate60E), document[_0x48cf09(0x2ad)]('Fortigate60F') != null && (document['getElementById']('Fortigate60F')[_0x48cf09(0x373)] = fortigate60F), document[_0x48cf09(0x2ad)]('Fortigate80F') != null && (document[_0x48cf09(0x2ad)](_0x48cf09(0x1a0))['textContent'] = fortigate80F), document[_0x48cf09(0x2ad)](_0x48cf09(0x2fd)) != null && (document['getElementById']('Fortigate100E')[_0x48cf09(0x373)] = fortigate100E), document[_0x48cf09(0x2ad)](_0x48cf09(0x402)) != null && (document[_0x48cf09(0x2ad)](_0x48cf09(0x402))[_0x48cf09(0x373)] = fortigate100F), document[_0x48cf09(0x2ad)](_0x48cf09(0x184)) != null && (document['getElementById'](_0x48cf09(0x184))['textContent'] = fortigate200F);
    });
}

function serverstype() {
    var _0x415d58 = _0x1c480c;
    requestDataFromServer(_0x415d58(0x298), {
        'csrfmiddlewaretoken': csfr_token
    }, _0x415d58(0x359))['done'](function (_0x36f6ae) {
        var _0x513ba1 = _0x415d58;
        res = JSON[_0x513ba1(0x321)](_0x36f6ae);
        var _0x11e213 = '';
        $(_0x513ba1(0x1da))[_0x513ba1(0x2c2)](), res['data'] != '' ? (res[_0x513ba1(0x1ef)][_0x513ba1(0x2d5)](function (_0x19ff10) {
            var _0x294d39 = _0x513ba1;
            _0x11e213 += _0x294d39(0x33b), _0x11e213 += _0x294d39(0x288), _0x11e213 += _0x294d39(0x2cb), _0x11e213 += _0x294d39(0x3a9), _0x11e213 += _0x294d39(0x3a5), _0x11e213 += _0x294d39(0x31a), _0x11e213 += _0x294d39(0x305), _0x11e213 += _0x294d39(0x2f8) + _0x19ff10[_0x294d39(0x2ba)] + _0x294d39(0x3c8), _0x11e213 += _0x294d39(0x1d5) + _0x19ff10[_0x294d39(0x2ba)] + _0x294d39(0x2fc), _0x11e213 += _0x294d39(0x208), _0x11e213 += _0x294d39(0x290), _0x11e213 += _0x294d39(0x307), _0x11e213 += '<i\x20class=\x22mdi\x20mdi-plus\x20mobile\x22\x20onclick=\x22serverFunction(\x27' + _0x19ff10[_0x294d39(0x2ba)] + _0x294d39(0x190), _0x11e213 += _0x294d39(0x36a), _0x11e213 += '</div\x20>', _0x11e213 += _0x294d39(0x31a), _0x11e213 += _0x294d39(0x31a), _0x11e213 += _0x294d39(0x304);
        }), $(_0x513ba1(0x1da))[_0x513ba1(0x207)](_0x11e213)) : swal(_0x513ba1(0x3c3), '\x20', _0x513ba1(0x181)), document['getElementById'](_0x513ba1(0x1a4)) != null && (document['getElementById'](_0x513ba1(0x1a4))[_0x513ba1(0x373)] = physicalser), document[_0x513ba1(0x2ad)]('VM') != null && (document[_0x513ba1(0x2ad)]('VM')[_0x513ba1(0x373)] = virtualser);
    }), Serveros(), Serversoftware();
}

function Serveros() {
    var _0x4c7a14 = _0x1c480c;
    requestDataFromServer('Serversos', {
        'csrfmiddlewaretoken': csfr_token
    }, _0x4c7a14(0x359))[_0x4c7a14(0x368)](function (_0x52d573) {
        var _0x577312 = _0x4c7a14;
        osres = JSON['parse'](_0x52d573);
        var _0x506fe5 = '';
        osres[_0x577312(0x1ef)][_0x577312(0x2d5)](function (_0x30d75f) {
            var _0x1aa88d = _0x577312;
            _0x506fe5 += _0x1aa88d(0x346) + _0x30d75f['os'] + '\x22>' + _0x30d75f['os'] + _0x1aa88d(0x1c1);
        }), $(_0x577312(0x308))[_0x577312(0x207)](_0x506fe5);
    });
}

function Serversoftware() {
    var _0x3a3fa1 = _0x1c480c;
    requestDataFromServer(_0x3a3fa1(0x23e), {
        'csrfmiddlewaretoken': csfr_token
    }, _0x3a3fa1(0x359))[_0x3a3fa1(0x368)](function (_0x3d6c58) {
        var _0x1a2de7 = _0x3a3fa1;
        softres = JSON['parse'](_0x3d6c58);
        var _0x4c5af4 = '';
        softres[_0x1a2de7(0x1ef)][_0x1a2de7(0x2d5)](function (_0x375404) {
            var _0x2db16b = _0x1a2de7;
            _0x4c5af4 += _0x2db16b(0x346) + _0x375404[_0x2db16b(0x285)] + '\x22>' + _0x375404[_0x2db16b(0x285)] + _0x2db16b(0x1c1);
        }), $('#servicessoft-dropdown')['append'](_0x4c5af4);
    });
}

function switchFunction(_0x587469) {
    var _0x56278c = _0x1c480c,
        _0x15ae20 = _0x587469;
    $(_0x56278c(0x332))[_0x56278c(0x3c2)](_0x56278c(0x230), _0x56278c(0x1eb)), $(_0x56278c(0x3a6))['css'](_0x56278c(0x230), _0x56278c(0x1eb)), $(_0x56278c(0x1bc))['css']('display', _0x56278c(0x1eb)), $('#Node_val')[_0x56278c(0x3c2)](_0x56278c(0x230), _0x56278c(0x1eb)), html = '', html += '<option\x20selected\x20value=\x22' + _0x587469 + '\x22>' + _0x587469 + _0x56278c(0x1c1), $(_0x56278c(0x219))[_0x56278c(0x207)](html), document[_0x56278c(0x2ad)](_0x56278c(0x24a))[_0x56278c(0x373)] = _0x56278c(0x1bb) + _0x587469, getFileNames(_0x15ae20);
}

function Switchlayer() {
    var _0x4a7125 = _0x1c480c;
    requestDataFromServer(_0x4a7125(0x3f5), {
        'csrfmiddlewaretoken': csfr_token
    }, 'GET')[_0x4a7125(0x368)](function (_0x2e06a6) {
        var _0x3d17da = _0x4a7125;
        swires = JSON['parse'](_0x2e06a6);
        var _0x256ec0 = '';
        $(_0x3d17da(0x333))[_0x3d17da(0x2c2)](), swires['data'] != '' ? (swires[_0x3d17da(0x1ef)]['forEach'](function (_0x23d7b5) {
            var _0x287ed8 = _0x3d17da,
                _0x1227da = _0x23d7b5['layers'],
                _0x4602bb = _0x1227da[_0x287ed8(0x33d)](/\s/g, '');
            _0x256ec0 += _0x287ed8(0x33b), _0x256ec0 += _0x287ed8(0x288), _0x256ec0 += _0x287ed8(0x2cb), _0x256ec0 += _0x287ed8(0x3a9), _0x256ec0 += '<div\x20class=\x22mdi\x20mdi-server-network\x20display-4\x20text-success\x20icon-size-increase\x22></div>', _0x256ec0 += _0x287ed8(0x31a), _0x256ec0 += _0x287ed8(0x305), _0x256ec0 += _0x287ed8(0x2f8) + _0x23d7b5[_0x287ed8(0x3d6)] + _0x287ed8(0x3c8), _0x256ec0 += _0x287ed8(0x1d5) + _0x4602bb + _0x287ed8(0x2fc), _0x256ec0 += _0x287ed8(0x1ba), _0x256ec0 += _0x287ed8(0x290), _0x256ec0 += _0x287ed8(0x307), _0x256ec0 += '<i\x20class=\x22mdi\x20mdi-plus\x20mobile\x22\x20onclick=\x22switchFunction(\x27' + _0x23d7b5['layers'] + _0x287ed8(0x190), _0x256ec0 += _0x287ed8(0x36a), _0x256ec0 += '</div\x20>', _0x256ec0 += _0x287ed8(0x31a), _0x256ec0 += '</div>', _0x256ec0 += _0x287ed8(0x304);
        }), $(_0x3d17da(0x333))['append'](_0x256ec0)) : swal(_0x3d17da(0x2f1), '\x20', 'warning'), document[_0x3d17da(0x2ad)]('GatewaySwitch') != null && (document[_0x3d17da(0x2ad)]('GatewaySwitch')[_0x3d17da(0x373)] = gatewayswitch), document['getElementById']('PublicSwitch') != null && (document[_0x3d17da(0x2ad)]('PublicSwitch')['textContent'] = publicswitch), document[_0x3d17da(0x2ad)](_0x3d17da(0x1b2)) != null && (document['getElementById']('ExchangeSwitch')[_0x3d17da(0x373)] = exchangeswitch);
    });
}

function tablenewonb() {
    var _0x2ae9e2 = _0x1c480c;
    requestDataFromServer(_0x2ae9e2(0x3d9), {
        'csrfmiddlewaretoken': csfr_token
    }, _0x2ae9e2(0x359))[_0x2ae9e2(0x368)](function (_0x377d09) {
        var _0x2a9f64 = _0x2ae9e2;
        newonbs = JSON['parse'](_0x377d09);
        var _0x4c1b6c = 0x0,
            _0x5d5f06 = 0x0,
            _0x495a71 = 0x0,
            _0x4b0960 = 0x0,
            _0x7cef1e = 0x0,
            _0x5e6cd7 = 0x0,
            _0x40a01f = 0x0,
            _0x54ea56 = 0x0,
            _0x47cb35 = 0x0,
            _0x18486b = 0x0,
            _0x516348 = 0x0,
            _0x2f8db6 = 0x0;
        newonbs[_0x2a9f64(0x1ef)][_0x2a9f64(0x2d5)](function (_0x42888e) {
            var _0x38f39e = _0x2a9f64;
            registeredIPAddress[_0x38f39e(0x36d)](_0x42888e[_0x38f39e(0x23a)]), _0x42888e[_0x38f39e(0x3fe)] == _0x38f39e(0x1a4) && (_0x4c1b6c++, phy = _0x4c1b6c, physicalser = phy), _0x42888e[_0x38f39e(0x3fe)] == 'VM' && (_0x5d5f06++, vir = _0x5d5f06, virtualser = vir), _0x42888e['pathhost'] == _0x38f39e(0x3d8) && (_0x495a71++, psw = _0x495a71, publicswitch = psw), _0x42888e[_0x38f39e(0x3fe)] == _0x38f39e(0x389) && (_0x4b0960++, gsw = _0x4b0960, gatewayswitch = gsw), _0x42888e[_0x38f39e(0x3fe)] == 'Exchange\x20Switch' && (_0x7cef1e++, esw = _0x7cef1e, exchangeswitch = esw), _0x42888e[_0x38f39e(0x3fe)] == _0x38f39e(0x1f2) && (_0x54ea56++, fw50e = _0x54ea56, fortigate50E = fw50e), _0x42888e[_0x38f39e(0x3fe)] == 'Fortigate\x2060E' && (_0x5e6cd7++, fw60e = _0x5e6cd7, fortigate60E = fw60e), _0x42888e[_0x38f39e(0x3fe)] == _0x38f39e(0x2df) && (_0x40a01f++, fw60f = _0x40a01f, fortigate60F = fw60f), _0x42888e['pathhost'] == 'Fortigate\x2080F' && (_0x47cb35++, fw80f = _0x47cb35, fortigate80F = fw80f), _0x42888e['pathhost'] == _0x38f39e(0x378) && (_0x18486b++, fw100e = _0x18486b, fortigate100E = fw100e), _0x42888e[_0x38f39e(0x3fe)] == _0x38f39e(0x179) && (_0x516348++, fw100f = _0x516348, fortigate100F = fw100f), _0x42888e[_0x38f39e(0x3fe)] == _0x38f39e(0x1e1) && (_0x2f8db6++, fw200f = _0x2f8db6, fortigate200F = fw200f);
        });
        var _0x5be39d = gatewayswitch + publicswitch + exchangeswitch,
            _0x349d4 = physicalser + virtualser,
            _0x577e28 = fortigate50E + fortigate60E + fortigate60F + fortigate80F + fortigate100E + fortigate100F + fortigate200F;
        _0x5be39d != '' ? document['getElementById'](_0x2a9f64(0x35c))['textContent'] = _0x5be39d : document[_0x2a9f64(0x2ad)]('totalswitch')[_0x2a9f64(0x373)] = 0x0, _0x349d4 != '' ? document[_0x2a9f64(0x2ad)](_0x2a9f64(0x3c1))[_0x2a9f64(0x373)] = _0x349d4 : document[_0x2a9f64(0x2ad)]('totalServers')[_0x2a9f64(0x373)] = 0x0, _0x577e28 != '' ? document['getElementById'](_0x2a9f64(0x239))[_0x2a9f64(0x373)] = _0x577e28 : document['getElementById'](_0x2a9f64(0x239))[_0x2a9f64(0x373)] = 0x0;
    });
}

function savedata() {
    var _0x26be4f = _0x1c480c;
    requestData = {}, data = {};
    var _0x3689e0 = $(_0x26be4f(0x2cf))[_0x26be4f(0x2db)](),
        _0x3010ba = {},
        _0x5c8bcc = '';
    _0x3689e0['forEach'](function (_0x52b9b9) {
        var _0x4f4998 = _0x26be4f;
        _0x3010ba[_0x52b9b9['name']] = _0x52b9b9['value'], _0x5c8bcc = _0x3010ba[_0x52b9b9[_0x4f4998(0x231)]];
    }), data[_0x26be4f(0x270)] = $(_0x26be4f(0x18b))['val'](), data[_0x26be4f(0x23a)] = $(_0x26be4f(0x196))[_0x26be4f(0x2c1)](), data[_0x26be4f(0x199)] = $(_0x26be4f(0x25b))[_0x26be4f(0x2c1)](), data['emailid'] = $(_0x26be4f(0x2ce))[_0x26be4f(0x2c1)](), data['servicename'] = $(_0x26be4f(0x37a))[_0x26be4f(0x2c1)](), data[_0x26be4f(0x1dd)] = $(_0x26be4f(0x20e))['val'](), data[_0x26be4f(0x30c)] = _0x3010ba, data[_0x26be4f(0x3fe)] = $(_0x26be4f(0x2e0))[_0x26be4f(0x2c1)](), data[_0x26be4f(0x26b)] = $('#CreateServer\x20#PHYSICAL_IP')['val'](), data['operation'] = 'add', requestData['data'] = data, $(_0x26be4f(0x2a7))[_0x26be4f(0x327)]('data-dismiss', 'modal'), requestDataFromServer(_0x26be4f(0x1b5), {
        'clientData': JSON[_0x26be4f(0x2b2)](requestData),
        'csrfmiddlewaretoken': csfr_token
    }, _0x26be4f(0x3ac))[_0x26be4f(0x368)](onboardResponse);
}

function onboardResponse(_0x48de2a) {
    var _0x39a644 = _0x1c480c;
    data = requestData[_0x39a644(0x1ef)];
    if (_0x48de2a && _0x48de2a[_0x39a644(0x295)] == 0xc8) {
        data['id'] = _0x48de2a['rowid'];
        var _0x1a335b = '';
        _0x1a335b += _0x39a644(0x31c) + data['id'] + '-' + data[_0x39a644(0x40c)] + '\x22>' + data[_0x39a644(0x40c)] + '</option>', $(_0x39a644(0x36e))[_0x39a644(0x207)](_0x1a335b), $(_0x39a644(0x301))[_0x39a644(0x207)](_0x1a335b), $(_0x39a644(0x36e))[_0x39a644(0x3c6)](_0x39a644(0x338)), $(_0x39a644(0x301))[_0x39a644(0x3c6)]('refresh');
        var _0x43bc71 = data['users'],
            _0x5c11c4 = _0x43bc71[_0x39a644(0x352)](_0x269aa2 => _0x269aa2[_0x39a644(0x1be)] == loginuserId);
        _0x5c11c4 && (siteHtml = '\x20', addSite(data), $(_0x39a644(0x296))[_0x39a644(0x207)](siteHtml)), swal(_0x48de2a[_0x39a644(0x3fd)], '\x20', 'success');
    } else swal(_0x48de2a[_0x39a644(0x3fd)], '\x20', _0x39a644(0x177));
}

function editRegisteredHosts(_0x5b47b8) {
    var _0x67bbd4 = _0x1c480c;
    isEdit = !![], requestDataFromServer(_0x67bbd4(0x3bb), {
        'ipaddress': _0x5b47b8
    }, _0x67bbd4(0x359))[_0x67bbd4(0x368)](editResponse);
}

function scanHS() {
    var _0x48d5a8 = _0x1c480c,
        _0x59c702 = $('#ip-dropdown')[_0x48d5a8(0x2c1)](),
        _0x47009f = $(_0x48d5a8(0x3f7))[_0x48d5a8(0x2c1)]();
    requestDataFromServer(_0x48d5a8(0x19e), {
        'ipaddress': _0x59c702,
        'path': _0x47009f,
        'csrfmiddlewaretoken': csfr_token
    }, 'POST')[_0x48d5a8(0x368)](parseconfigdata);
}

function parseconfigdata(_0x2aae4e) {
    var _0x2d34c4 = _0x1c480c;
    res = JSON[_0x2d34c4(0x321)](_0x2aae4e), res['status'] == 0xc8 ? ($(_0x2d34c4(0x26c))[_0x2d34c4(0x2c1)](''), $('#configpath')[_0x2d34c4(0x2c1)](''), $(_0x2d34c4(0x2b5))[_0x2d34c4(0x27d)](_0x2d34c4(0x37b)), requestDataFromServer(_0x2d34c4(0x1af), {
        'fileName': hostPath
    }, _0x2d34c4(0x359))[_0x2d34c4(0x368)](fillServicesValuesafterHSDiscover)) : swal(_0x2d34c4(0x376), '', _0x2d34c4(0x177));
}

function fillServicesValuesafterHSDiscover(_0x4c20f8) {
    var _0x371388 = _0x1c480c;
    global_all_services = JSON[_0x371388(0x321)](_0x4c20f8);
    if ($(_0x371388(0x3f2))['is'](_0x371388(0x221))) {
        var _0x4d6ec8 = '<option\x20selected\x20disabled>Select\x20service</option>',
            _0x1a99c9 = $('#hosts-dropdown')['val']()[_0x371388(0x39e)]('_')[0x0];
        global_all_services !== undefined && global_all_services[_0x371388(0x34f)] > 0x0 && ($('#services-dropdown')['empty'](), global_all_services[_0x371388(0x2d5)](function (_0x2383c6) {
            var _0x2a3313 = _0x371388;
            _0x4d6ec8 += '<option\x20value=\x22' + _0x2383c6 + '\x22>' + _0x2383c6[_0x2a3313(0x33d)]('.j2', '') + _0x2a3313(0x1c1);
        }), $(_0x371388(0x3f2))[_0x371388(0x207)](_0x4d6ec8));
    }
}

function saveapplication() {
    var _0x4faae9 = _0x1c480c;
    if ($(_0x4faae9(0x191))['val']() == '') return ![];
    else {
        var _0x4255d9 = {};
        _0x4255d9[_0x4faae9(0x3ed)] = $(_0x4faae9(0x191))[_0x4faae9(0x2c1)](), _0x4255d9[_0x4faae9(0x34d)] = 'add', _0x4255d9['rowid'] = 0x1, requestData['data'] = _0x4255d9, requestDataFromServer(_0x4faae9(0x17d), {
            'clientData': JSON[_0x4faae9(0x2b2)](requestData),
            'csrfmiddlewaretoken': csfr_token
        }, _0x4faae9(0x3ac))[_0x4faae9(0x368)](applicationResponse);
    }
}

function applicationResponse(_0x115f9e) {
    var _0x1d7a99 = _0x1c480c;
    if (_0x115f9e && _0x115f9e[_0x1d7a99(0x295)] == 0x1f4) $(_0x1d7a99(0x398))['html'](_0x115f9e[_0x1d7a99(0x3fd)]);
    else {
        data = requestData[_0x1d7a99(0x1ef)], data[_0x1d7a99(0x3ed)], applicationNames['push'](data['applicationname']);
        if ($(_0x1d7a99(0x255))['is'](_0x1d7a99(0x221))) {
            var _0x439969 = $('#GLOBAL_APPLICATION')[_0x1d7a99(0x2c1)](),
                _0x542c3e = '\x20';
            _0x542c3e += _0x1d7a99(0x31c) + data[_0x1d7a99(0x3ed)] + '\x22>' + data[_0x1d7a99(0x3ed)] + _0x1d7a99(0x1c1), $('#GLOBAL_APPLICATION')[_0x1d7a99(0x207)](_0x542c3e);
            if (_0x439969 !== null && _0x439969 !== '') $(_0x1d7a99(0x255))['val'](_0x439969);
            else $(_0x1d7a99(0x255))[_0x1d7a99(0x2c1)](data[_0x1d7a99(0x3ed)]);
        }
        swal(_0x115f9e[_0x1d7a99(0x3fd)], '\x20', _0x1d7a99(0x3b3)), $('#dialog-for-iframe')[_0x1d7a99(0x27d)](_0x1d7a99(0x37b));
    }
}

function pathselected(_0x124206) {
    var _0x3fdf3b = _0x1c480c;
    $(_0x3fdf3b(0x216))[_0x3fdf3b(0x2c2)](), $('#service-form-div')[_0x3fdf3b(0x2c2)](), $(_0x3fdf3b(0x2b3))[_0x3fdf3b(0x2c2)](), $(_0x3fdf3b(0x20b))[_0x3fdf3b(0x3c2)](_0x3fdf3b(0x230), _0x3fdf3b(0x1ec)), $(_0x3fdf3b(0x1fe))[_0x3fdf3b(0x2c2)](), $(_0x3fdf3b(0x3f2))[_0x3fdf3b(0x2c2)](), $(_0x3fdf3b(0x3e6))['empty'](), $('#service-selected')[_0x3fdf3b(0x331)](), $(_0x3fdf3b(0x21a))[_0x3fdf3b(0x331)](), $('#multipleIPAddressSelect')[_0x3fdf3b(0x331)](), hostPath = $(_0x124206)[_0x3fdf3b(0x2c1)]();
}

function fillHostDetails() {
    var _0x1383d7 = _0x1c480c;
    requestDataFromServer(_0x1383d7(0x22f), {}, _0x1383d7(0x359))['done'](fillHostResponse);
}

function fillHostResponse(_0x4d50c7) {
    var _0x537cb9 = _0x1c480c;
    res = JSON[_0x537cb9(0x321)](_0x4d50c7);
    var _0xb75198 = '';
    if (res[_0x537cb9(0x295)] == 0xc8) {
        $(_0x537cb9(0x1bf))[_0x537cb9(0x331)](), $(_0x537cb9(0x248))[_0x537cb9(0x331)](), host_details = res[_0x537cb9(0x1ef)];
        if (host_details[_0x537cb9(0x34f)] > 0x0) {
            var _0x48a367 = 0x0,
                _0x481857 = 0x0,
                _0x28563c = 0x0,
                _0x4ea5c7 = 0x0,
                _0x2549ae = 0x0;
            host_details[_0x537cb9(0x2d5)](function (_0x3a250c) {
                var _0x421c59 = _0x537cb9,
                    _0xa4926e = '';
                requestDataFromServer(_0x421c59(0x3de), {
                    'csrfmiddlewaretoken': csfr_token
                }, _0x421c59(0x359))['done'](function (_0x110765) {
                    var _0x7edde2 = _0x421c59;
                    const _0x4e0a5e = JSON[_0x7edde2(0x321)](_0x110765)[_0x7edde2(0x1ef)] || [],
                        _0x2fda4d = [],
                        _0x152f83 = [],
                        _0x5f4bd0 = [],
                        _0x3367b6 = [];
                    for (const _0x14a8f2 of _0x4e0a5e) {
                        _0x14a8f2['version'] === _0x7edde2(0x2e9) && (_0x5f4bd0[_0x7edde2(0x36d)](_0x14a8f2['id']), v2cpro = _0x14a8f2[_0x7edde2(0x1e7)], _0x2fda4d[_0x7edde2(0x36d)](_0x14a8f2[_0x7edde2(0x23a)])), _0x14a8f2[_0x7edde2(0x1e7)] === 'v3' && (_0x3367b6[_0x7edde2(0x36d)](_0x14a8f2['id']), v3cpro = _0x14a8f2[_0x7edde2(0x1e7)], _0x152f83[_0x7edde2(0x36d)](_0x14a8f2[_0x7edde2(0x23a)]));
                    }
                    requestDataFromServer(_0x7edde2(0x21f), {
                        'ipaddress': _0x3a250c[_0x7edde2(0x228)]
                    }, 'GET')[_0x7edde2(0x368)](function (_0x46b921) {
                        var _0x110077 = _0x7edde2;
                        const _0x358188 = JSON[_0x110077(0x321)](_0x46b921)['data'] || [],
                            _0x5062c9 = [],
                            _0x2bebb6 = [],
                            _0x57f0e4 = [];
                        for (const _0x51280a of _0x358188) {
                            _0x51280a[_0x110077(0x226)] === _0x110077(0x244) && (mgmtilo = _0x51280a[_0x110077(0x226)], _0x5062c9[_0x110077(0x36d)](_0x51280a[_0x110077(0x23a)])), _0x51280a['prototype'] === 'idrac' && (mgmtidrac = _0x51280a['prototype'], _0x2bebb6['push'](_0x51280a[_0x110077(0x23a)])), _0x51280a[_0x110077(0x226)] === _0x110077(0x2b0) && (mgmtnodeexp = _0x51280a[_0x110077(0x226)], _0x57f0e4['push'](_0x51280a[_0x110077(0x23a)]));
                        }
                        _0xa4926e += _0x110077(0x353) + _0x3a250c['address'][_0x110077(0x27e)]('.', '_') + _0x110077(0x245), _0xa4926e += _0x110077(0x3d5), _0xa4926e += '<div\x20class=\x22row\x22>', _0xa4926e += _0x110077(0x2c3), _0xa4926e += _0x110077(0x2aa) + _0x3a250c[_0x110077(0x17c)] + '(' + _0x3a250c['server_type'] + _0x110077(0x31f), _0xa4926e += '</div>', _0xa4926e += _0x110077(0x339), _0xa4926e += _0x110077(0x39f) + _0x3a250c[_0x110077(0x228)] + _0x110077(0x3c9), _0xa4926e += _0x110077(0x1ac) + _0x3a250c[_0x110077(0x228)] + _0x110077(0x35b), _0xa4926e += _0x110077(0x3b0) + _0x3a250c[_0x110077(0x228)] + _0x110077(0x35e) + _0x3a250c[_0x110077(0x17c)] + _0x110077(0x350), _0xa4926e += '</div>', _0xa4926e += _0x110077(0x31a), _0xa4926e += _0x110077(0x32e), _0xa4926e += _0x110077(0x328), _0xa4926e += '<div\x20class=\x22col-12\x22\x20style=\x22display:flex;\x22>', _0xa4926e += _0x110077(0x3a1), _0xa4926e += _0x110077(0x1d4) + _0x3a250c['friend'] + _0x110077(0x306), _0xa4926e += _0x110077(0x211) + _0x3a250c[_0x110077(0x19f)] + _0x110077(0x306), _0xa4926e += _0x110077(0x3af) + _0x3a250c[_0x110077(0x193)] + _0x110077(0x306), _0xa4926e += _0x110077(0x328), _0xa4926e += _0x110077(0x320), _0xa4926e += '<i\x20class=\x22mdi\x20mdi-plus-circle-outline\x20col-2\x22\x20onclick=\x22editHost(this)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#CreateServer\x22\x20data-ipaddress=\x22' + _0x3a250c[_0x110077(0x228)] + '\x22\x20style=\x22color:green;\x20float:right;margin-left:\x20-25%;\x22></i>', _0xa4926e += _0x110077(0x31a), _0xa4926e += '</div>', _0xa4926e += _0x110077(0x32b);
                        _0x3a250c['automation'] == 'No' ? _0xa4926e += _0x110077(0x2cc) : _0xa4926e += _0x110077(0x3b6);
                        var _0x409617 = _0x110077(0x2e9),
                            _0x1f1147 = 'v3';
                        [_0x2fda4d, _0x152f83]['forEach'](function (_0x4d1a2d) {
                            _0x4d1a2d['forEach'](function (_0x4d7617, _0x168d6e) {
                                var _0x759501 = _0x53e3,
                                    _0x393e96 = _0x4d1a2d === _0x2fda4d ? _0x409617 : _0x1f1147,
                                    _0x32608f = _0x4d1a2d === _0x2fda4d ? _0x5f4bd0[_0x168d6e] : _0x3367b6[_0x168d6e];
                                _0x4d7617 === _0x3a250c[_0x759501(0x228)] && (v3cipaddr = _0x4d7617, v2cipaddr = _0x4d7617, _0xa4926e += _0x759501(0x3be), _0xa4926e += '<i\x20class=\x22mdi\x20mdi-alpha-s-box-outline\x20icon-val\x22\x20onclick=\x22\x22\x20id=\x22addsnmp\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-addsnmp\x22\x20style=\x22color:#55a8fd;\x22></i>', _0xa4926e += _0x759501(0x185), _0xa4926e += '<div\x20class=\x22\x22>', _0xa4926e += _0x759501(0x34a), _0xa4926e += _0x759501(0x40a) + _0x393e96 + '\x20Added</p>&ensp;&ensp;', _0xa4926e += _0x759501(0x311) + _0x393e96 + '\x22\x20data-target=\x22#CreateServer\x22\x20data-ipaddress=\x22' + _0x3a250c[_0x759501(0x228)] + _0x759501(0x1d3), _0xa4926e += _0x759501(0x189) + _0x32608f + _0x759501(0x3fc) + _0x4d7617 + '\x22\x20data-host-name=\x22' + _0x393e96 + _0x759501(0x22b), _0xa4926e += _0x759501(0x31a), _0xa4926e += _0x759501(0x31a), _0xa4926e += '</div>');
                            });
                        });
                        var _0x3c51ba = [{
                            'type': 'ilo',
                            'addrArr': _0x5062c9
                        }, {
                            'type': _0x110077(0x3a4),
                            'addrArr': _0x2bebb6
                        }, {
                            'type': _0x110077(0x2b0),
                            'addrArr': _0x57f0e4
                        }];
                        _0x3c51ba['forEach'](function (_0x3108da) {
                            var _0x11aa8b = _0x110077;
                            if (_0x3108da[_0x11aa8b(0x3fa)]['includes'](_0x3a250c[_0x11aa8b(0x228)])) {
                                var _0x27dfc1 = '';
                                if (_0x3108da[_0x11aa8b(0x404)] === _0x11aa8b(0x244)) _0x27dfc1 = _0x11aa8b(0x1f9);
                                else {
                                    if (_0x3108da['type'] === _0x11aa8b(0x3a4)) _0x27dfc1 = _0x11aa8b(0x1f9);
                                    else _0x3108da[_0x11aa8b(0x404)] === _0x11aa8b(0x2b0) && (_0x27dfc1 = _0x11aa8b(0x1d9));
                                }
                                _0xa4926e += _0x11aa8b(0x3be), _0xa4926e += _0x27dfc1, _0xa4926e += _0x11aa8b(0x185), _0xa4926e += _0x11aa8b(0x1c0), _0xa4926e += _0x11aa8b(0x34a), _0xa4926e += _0x11aa8b(0x40a) + _0x3108da['type'] + _0x11aa8b(0x1f5), _0xa4926e += '<i\x20class=\x22mdi\x20mdi-lead-pencil\x22\x20onclick=\x22editmgmnt(this)\x22\x20data-toggle=\x22modal\x22\x20name=\x22' + _0x3108da['type'] + _0x11aa8b(0x1b4) + _0x3a250c['address'] + '\x22\x20style=\x22color:white;\x22></i>&ensp;', _0xa4926e += _0x11aa8b(0x2c7) + _0x3108da[_0x11aa8b(0x3fa)]['join'](',') + _0x11aa8b(0x35e) + _0x3108da[_0x11aa8b(0x404)] + _0x11aa8b(0x22b), _0xa4926e += _0x11aa8b(0x31a), _0xa4926e += _0x11aa8b(0x31a), _0xa4926e += _0x11aa8b(0x31a);
                            }
                        }), _0xa4926e += _0x110077(0x31a), _0xa4926e += '</div>', _0xa4926e += _0x110077(0x31a), _0xa4926e += _0x110077(0x31a), _0xa4926e += _0x110077(0x1a5), _0xb75198 = _0x3a250c['layer'];
                        if (_0xb75198 == _0x110077(0x40b)) {
                            gcount++, $(_0x110077(0x238))[_0x110077(0x331)](), $(_0x110077(0x1aa))[_0x110077(0x39a)]();
                            var _0x527dd4 = _0x110077(0x291);
                            document[_0x110077(0x2ad)](_0x110077(0x2d9))['innerHTML'] = _0x110077(0x262) + gcount + _0x110077(0x2d4) + _0x527dd4 + _0x110077(0x241) + _0x3a250c[_0x110077(0x228)] + _0x110077(0x2a5) + _0x527dd4 + _0x110077(0x194), $(_0x110077(0x171))[_0x110077(0x207)]('<div\x20class=\x22row\x22\x20id=\x22gatewaysearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag' + _0xb75198 + _0x110077(0x287) + _0xb75198 + _0x110077(0x403) + _0x3a250c[_0x110077(0x228)] + '\x27)\x22></i><i\x20class=\x22mdi\x20mdi-close\x20icon-clsbtn\x22\x20id=\x22icon-close\x22\x20onclick=\x22closesearchbar(\x27' + _0x527dd4 + _0x110077(0x234));
                        } else {
                            if (_0xb75198 == _0x110077(0x2e3)) {
                                fcount++, $(_0x110077(0x238))[_0x110077(0x331)](), $(_0x110077(0x17b))[_0x110077(0x39a)]();
                                var _0x527dd4 = _0x110077(0x1e2);
                                document[_0x110077(0x2ad)](_0x110077(0x1db))[_0x110077(0x40d)] = _0x110077(0x2f6) + fcount + _0x110077(0x2d4) + _0x527dd4 + _0x110077(0x241) + _0x3a250c['address'] + '\x22\x20onclick=\x22displaysearchbar(\x27' + _0x527dd4 + _0x110077(0x194), $('#fswitch-heading')[_0x110077(0x207)](_0x110077(0x1bd) + _0xb75198 + _0x110077(0x287) + _0xb75198 + _0x110077(0x403) + _0x3a250c[_0x110077(0x228)] + _0x110077(0x393) + _0x527dd4 + _0x110077(0x234));
                            } else {
                                if (_0xb75198 == _0x110077(0x220)) {
                                    scount++, $(_0x110077(0x238))['hide'](), $('#sswi')[_0x110077(0x39a)]();
                                    var _0x527dd4 = _0x110077(0x377);
                                    document['getElementById']('server-heading')[_0x110077(0x40d)] = '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>SERVERS<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>' + scount + _0x110077(0x2d4) + _0x527dd4 + _0x110077(0x241) + _0x3a250c[_0x110077(0x228)] + '\x22\x20onclick=\x22displaysearchbar(\x27' + _0x527dd4 + '\x27)\x22\x20style=\x22font-size:\x2019px;color:#e99123\x22></i></div>', $(_0x110077(0x310))['append'](_0x110077(0x317) + _0xb75198 + _0x110077(0x287) + _0xb75198 + _0x110077(0x403) + _0x3a250c['address'] + _0x110077(0x393) + _0x527dd4 + '\x27)\x22\x20style=\x22position:\x20inherit;font-size:18px;\x22></i></button></div></div></div><div\x20class=\x22col-2\x22\x20text-right></div></div>');
                                } else {
                                    if (_0xb75198 == _0x110077(0x22c)) {
                                        pcount++, $(_0x110077(0x238))[_0x110077(0x331)](), $(_0x110077(0x1ab))[_0x110077(0x39a)]();
                                        var _0x527dd4 = 'publicsearch-row';
                                        document[_0x110077(0x2ad)]('pswitch-heading')['innerHTML'] = _0x110077(0x326) + pcount + _0x110077(0x2d4) + _0x527dd4 + _0x110077(0x241) + _0x3a250c[_0x110077(0x228)] + '\x22\x20onclick=\x22displaysearchbar(\x27' + _0x527dd4 + _0x110077(0x194), $(_0x110077(0x391))[_0x110077(0x207)](_0x110077(0x325) + _0xb75198 + _0x110077(0x287) + _0xb75198 + _0x110077(0x403) + _0x3a250c[_0x110077(0x228)] + _0x110077(0x393) + _0x527dd4 + _0x110077(0x234));
                                    } else {
                                        ecount++, $(_0x110077(0x238))[_0x110077(0x331)](), $(_0x110077(0x213))[_0x110077(0x39a)]();
                                        var _0x527dd4 = _0x110077(0x1df);
                                        document[_0x110077(0x2ad)]('eswitch-heading')[_0x110077(0x40d)] = _0x110077(0x2b6) + ecount + _0x110077(0x2d4) + _0x527dd4 + _0x110077(0x241) + _0x3a250c[_0x110077(0x228)] + _0x110077(0x2a5) + _0x527dd4 + _0x110077(0x194), $(_0x110077(0x356))[_0x110077(0x207)]('<div\x20class=\x22row\x22\x20id=\x22exchangesearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag' + _0xb75198 + _0x110077(0x287) + _0xb75198 + _0x110077(0x403) + _0x3a250c[_0x110077(0x228)] + _0x110077(0x393) + _0x527dd4 + '\x27)\x22\x20style=\x22position:\x20inherit;font-size:18px;\x22></i></button></div></div></div><div\x20class=\x22col-2\x22\x20text-right></div></div>');
                                    }
                                }
                            }
                        }
                        $('#' + _0xb75198)[_0x110077(0x207)](_0xa4926e), $(_0x110077(0x180))['show'](), $(_0x110077(0x248))[_0x110077(0x39a)]();
                    });
                });
            });
        } else $(_0x537cb9(0x248))[_0x537cb9(0x39a)]();
    } else swal(_0x537cb9(0x2ec), '\x20', _0x537cb9(0x177));
    tablenewonb();
}
let exportone = _0x1fa927 => {
    var _0x1edcae = _0x1c480c;
    const _0x121127 = _0x1fa927[_0x1edcae(0x343)]('data-ipaddress-name');
    requestDataFromServer('newonbtable', {
        'csrfmiddlewaretoken': csfr_token
    }, _0x1edcae(0x359))[_0x1edcae(0x368)](function (_0xd9ba82) {
        var _0x39cad9 = _0x1edcae;
        const _0x21f238 = JSON['parse'](_0xd9ba82)['data'],
            _0xa2b105 = _0x21f238[_0x39cad9(0x2d8)](_0xbd0b61 => _0xbd0b61[_0x39cad9(0x23a)] === _0x121127);
        if (_0xa2b105) {
            const {
                id: _0x4491d0,
                ..._0x1c0713
            } = _0xa2b105, _0x2832e5 = Object[_0x39cad9(0x2ac)](_0x1c0713)[_0x39cad9(0x24d)](([_0x3cb689, _0x4eebf3]) => _0x3cb689 + ':' + (_0x4eebf3 || ''))[_0x39cad9(0x268)]('\x0a'), _0x215055 = _0xa2b105[_0x39cad9(0x23a)] + _0x39cad9(0x2a0), _0x3490ee = new Blob([_0x2832e5], {
                'type': _0x39cad9(0x1b1)
            }), _0x180701 = document[_0x39cad9(0x2ef)]('a');
            _0x180701[_0x39cad9(0x253)] = _0x215055, window[_0x39cad9(0x302)] != null ? _0x180701[_0x39cad9(0x186)] = window[_0x39cad9(0x302)][_0x39cad9(0x2c6)](_0x3490ee) : (_0x180701[_0x39cad9(0x186)] = window[_0x39cad9(0x30a)]['createObjectURL'](_0x3490ee), _0x180701[_0x39cad9(0x1fb)][_0x39cad9(0x230)] = _0x39cad9(0x1eb), document['body'][_0x39cad9(0x277)](_0x180701)), _0x180701[_0x39cad9(0x3cd)]();
        } else console[_0x39cad9(0x222)](_0x39cad9(0x218) + _0x121127);
    });
};

function displaysearchbar(_0x1a3016) {
    var _0x50c5da = _0x1c480c;
    $('#' + _0x1a3016)['css'](_0x50c5da(0x230)) != _0x50c5da(0x1eb) ? ($(_0x50c5da(0x363) + _0x1a3016)['show'](), $('#' + _0x1a3016)[_0x50c5da(0x3c2)]('display', 'none')) : ($('.hide-val' + _0x1a3016)[_0x50c5da(0x331)](), $('#' + _0x1a3016)['css'](_0x50c5da(0x230), _0x50c5da(0x1d6)));
}

function closesearchbar(_0x5f1f25) {
    var _0x209930 = _0x1c480c;
    $('#' + _0x5f1f25)['css'](_0x209930(0x230), _0x209930(0x1eb)), $(_0x209930(0x363) + _0x5f1f25)['show']();
}

function swapDivgonb(_0x1937db, _0x253637, _0x249885) {
    var _0x583a9e = _0x1c480c,
        _0x1c4f2c = $(_0x583a9e(0x3a0) + _0x253637)[_0x583a9e(0x2c1)](),
        _0x538f00 = 's' + _0x1c4f2c[_0x583a9e(0x27e)]('.', '_');
    _0x1937db = document[_0x583a9e(0x2ad)](_0x538f00), _0x1937db[_0x583a9e(0x214)][_0x583a9e(0x2b9)](_0x1937db, document[_0x583a9e(0x2ad)](_0x253637)[_0x583a9e(0x358)][0x0]), _0x1937db[_0x583a9e(0x19b)]('afterend', '&ensp;&ensp;');
}

function getIpAddress() {
    var _0xf04e0d = _0x1c480c;
    if (global_ip_addresses === undefined) requestDataFromServer('getiplist', {}, _0xf04e0d(0x359))[_0xf04e0d(0x368)](fillIPValues);
}

function fillIPValues(_0x4becd4) {
    var _0x47fdb1 = _0x1c480c;
    res = JSON[_0x47fdb1(0x321)](_0x4becd4), res[_0x47fdb1(0x295)] == 0xc8 ? (global_ip_addresses = res[_0x47fdb1(0x1ef)], getApplicationNames()) : swal('Issue\x20in\x20gettin\x20Iplist', '\x20', 'error');
}

function getFileNames(_0x36922f) {
    var _0x5867e = _0x1c480c;
    nametype = _0x36922f, requestDataFromServer(_0x5867e(0x1af), {
        'fileName': hostPath
    }, _0x5867e(0x359))[_0x5867e(0x368)](fillHostValues);
}

function fillHostValues(_0x8fa895) {
    var _0x2601f6 = _0x1c480c;
    res = JSON[_0x2601f6(0x321)](_0x8fa895);
    if (res['status'] == 0xc8) {
        requestDataFromServer(_0x2601f6(0x1af), {
            'fileName': hostPath
        }, 'GET')['done'](fillServicesValues);
        var _0x1b4c85 = _0x2601f6(0x29c),
            _0x432503 = res['data'];
        $(_0x2601f6(0x3e6))[_0x2601f6(0x2c2)](), _0x432503[_0x2601f6(0x2d5)](function (_0x34a2d1) {
            var _0x32f9f4 = _0x2601f6,
                _0x46d73a = nametype[_0x32f9f4(0x33d)](_0x32f9f4(0x3a7), ''),
                _0x3fb3f7 = nametype[_0x32f9f4(0x33d)]('\x20switch', ''),
                _0x389a20 = nametype[_0x32f9f4(0x39e)]('\x20')[0x1],
                _0x53716c = nametype;
            if (_0x34a2d1[_0x32f9f4(0x36f)](_0x53716c)) _0x1b4c85 += _0x32f9f4(0x346) + _0x34a2d1 + _0x32f9f4(0x341) + _0x34a2d1[_0x32f9f4(0x33d)]('.j2', '') + _0x32f9f4(0x1c1), $(_0x32f9f4(0x3e9))[_0x32f9f4(0x327)](_0x32f9f4(0x1fb), _0x32f9f4(0x385));
            else {
                if (_0x34a2d1[_0x32f9f4(0x36f)](_0x3fb3f7)) _0x1b4c85 += _0x32f9f4(0x346) + _0x34a2d1 + _0x32f9f4(0x341) + _0x34a2d1[_0x32f9f4(0x33d)](_0x32f9f4(0x18e), '') + _0x32f9f4(0x1c1), $('#service-data-ip')['attr']('style', 'display:none\x20!important');
                else {
                    if (_0x34a2d1[_0x32f9f4(0x36f)](_0x389a20)) _0x1b4c85 += _0x32f9f4(0x346) + _0x34a2d1 + _0x32f9f4(0x341) + _0x34a2d1[_0x32f9f4(0x33d)]('.j2', '') + _0x32f9f4(0x1c1), $('#service-data-ip')['attr'](_0x32f9f4(0x1fb), 'display:none\x20!important');
                    else _0x34a2d1[_0x32f9f4(0x36f)](_0x46d73a) && (_0x1b4c85 += _0x32f9f4(0x346) + _0x34a2d1 + _0x32f9f4(0x341) + _0x34a2d1['replace'](_0x32f9f4(0x18e), '') + '</option>', $(_0x32f9f4(0x3e9))[_0x32f9f4(0x327)](_0x32f9f4(0x1fb), _0x32f9f4(0x29b)));
                }
            }
        }), $(_0x2601f6(0x3e6))[_0x2601f6(0x207)](_0x1b4c85);
        if (isEdit) autoSelectHost();
    } else swal(_0x2601f6(0x335), '\x20', _0x2601f6(0x177));
}

function fillServicesValues(_0x347be5) {
    var _0x3f3aa7 = _0x1c480c;
    res = JSON[_0x3f3aa7(0x321)](_0x347be5), res[_0x3f3aa7(0x295)] == 0xc8 ? (getIpAddress(), global_all_services = res[_0x3f3aa7(0x1ef)]) : swal('Issue\x20in\x20getting\x20serviceses', '\x20', _0x3f3aa7(0x177));
}

function serviceselected(_0x46669f) {
    var _0x3094cb = _0x1c480c;
    selectedFileType = 'Service', $(_0x3094cb(0x1ae))['hide'](), $(_0x3094cb(0x3bd))[_0x3094cb(0x2c2)](), $(_0x46669f)['val']() != null && ($('#service-header')[_0x3094cb(0x1a6)]($(_0x46669f)['val']()[_0x3094cb(0x33d)](_0x3094cb(0x18e), '')), requestDataFromServer('/allonboard/getfilecontentdata', {
        'filename': hostPath + '_' + $(_0x46669f)['val'](),
        'csrfmiddlewaretoken': csfr_token
    }, 'POST')['done'](handleFileContentResponse));
}

function hostselected(_0x14c8a6) {
    var _0x26c5c8 = _0x1c480c;
    selectedFileType = _0x26c5c8(0x3ef), $(_0x26c5c8(0x216))['empty'](), $(_0x26c5c8(0x3bd))['empty'](), $(_0x26c5c8(0x2b3))[_0x26c5c8(0x2c2)](), $(_0x26c5c8(0x20b))[_0x26c5c8(0x3c2)]('display', 'block'), requestDataFromServer(_0x26c5c8(0x2a1), {
        'filename': hostPath + '_' + $(_0x14c8a6)[_0x26c5c8(0x2c1)](),
        'csrfmiddlewaretoken': csfr_token
    }, _0x26c5c8(0x3ac))[_0x26c5c8(0x368)](handleFileContentResponse);
}

function handleFileContentResponse(_0x186f8d) {
    var _0x387459 = _0x1c480c;
    $('#nic_style')[_0x387459(0x3c2)](_0x387459(0x230), 'block'), $(_0x387459(0x216))[_0x387459(0x2c2)](), res = JSON[_0x387459(0x321)](_0x186f8d);
    if (res[_0x387459(0x295)] == 0xc8) {
        data = res[_0x387459(0x1ef)];
        if (data['length'] != 0x0) {
            var _0x241458 = '',
                _0x193cba = -0x1,
                _0x497c61 = data,
                _0x3578b4 = _0x497c61;
            _0x497c61[_0x387459(0x2d5)](function (_0x4d1fe6) {
                var _0x28e5d5 = _0x387459;
                _0x193cba++;
                if (_0x4d1fe6['indexOf']('__') >= 0x0) {
                    var _0x12a2f5 = _0x4d1fe6[_0x28e5d5(0x39e)]('__');
                    if (_0x12a2f5[0x0] == _0x28e5d5(0x1de)) {
                        var _0x40e713 = _0x12a2f5[0x1],
                            _0x7eabeb = -0x1;
                        _0x497c61[_0x28e5d5(0x2d5)](function (_0x4dc344) {
                            var _0x28fca5 = _0x28e5d5;
                            _0x7eabeb++;
                            var _0x15c605 = _0x4dc344['split']('__');
                            if (_0x15c605[0x0] == _0x40e713) {
                                var _0x13884b = _0x497c61[_0x193cba],
                                    _0xd1d2f3 = _0x497c61[_0x7eabeb];
                                delete _0x3578b4[_0x193cba], delete _0x3578b4[_0x7eabeb], _0x3578b4[_0x28fca5(0x36d)](_0x13884b), _0x3578b4[_0x28fca5(0x36d)](_0xd1d2f3);
                            }
                        });
                    }
                }
            });
            var _0x4f28cf = [];
            _0x3578b4[_0x387459(0x2d5)](function (_0x2bd2b0) {
                var _0x28de14 = _0x387459;
                if (selectedFileType === _0x28de14(0x3ef) && _0x2bd2b0 === 'COMMON_IPADDRESS') {
                    if (!isEdit) drawMultiplIPAddresses();
                    return;
                }
                var _0x122b7c = _0x2bd2b0[_0x28de14(0x39e)]('_');
                _0x2bd2b0[_0x28de14(0x232)]('__') >= 0x0 && (_0x122b7c = _0x2bd2b0[_0x28de14(0x39e)]('_'));
                if (selectedFileType === _0x28de14(0x35f) && (_0x122b7c[0x0] === _0x28de14(0x28e) || _0x122b7c[0x0] === 'GLOBAL')) {
                    $('#' + _0x2bd2b0)[_0x28de14(0x2c1)]() !== undefined && (_0x241458 += _0x28de14(0x2d7) + _0x2bd2b0 + '\x22\x20\x20value=\x22' + $('#' + _0x2bd2b0)[_0x28de14(0x2c1)]() + '\x22>');
                    return;
                }
                var _0x23da05 = ![],
                    _0x1fb6f7 = '',
                    _0x4e3d84 = '',
                    _0x143a6d = '',
                    _0x510dd7 = '',
                    _0x3ade92 = '',
                    _0x1b521a = '',
                    _0x2ff968 = '',
                    _0x3a4b6f = '';
                if (_0x2bd2b0[_0x28de14(0x232)]('__') >= 0x0) {
                    var _0x2752b1 = _0x2bd2b0[_0x28de14(0x39e)]('__');
                    if (_0x2752b1[0x0] === _0x28de14(0x1de)) {
                        _0x23da05 = !![];
                        if (selectedFileType === _0x28de14(0x35f)) {
                            _0x143a6d = _0x2752b1[0x1] + '_' + serviceIdCount;
                            var _0x227a45 = $('.' + _0x2752b1[0x1])[_0x28de14(0x1f8)]()['is'](_0x28de14(0x221));
                            _0x227a45 && (_0x3a4b6f = 'checked');
                            if (isServiceEdit) _0x3a4b6f = '';
                        } else _0x143a6d = _0x2752b1[0x1];
                    } else {
                        if (selectedFileType === _0x28de14(0x35f)) {
                            _0x1b521a = _0x2752b1[0x0] + '_' + serviceIdCount;
                            var _0x227a45 = $('.' + _0x2752b1[0x0])[_0x28de14(0x1f8)]()['is'](_0x28de14(0x221));
                            _0x227a45 ? _0x2ff968 = _0x28de14(0x3ba) : _0x2ff968 = _0x28de14(0x3b9), isServiceEdit && (isServiceEdit = ![], _0x2ff968 = _0x28de14(0x3b9));
                        } else _0x1b521a = _0x2752b1[0x0], _0x2ff968 = _0x28de14(0x3b9);
                    }
                }
                selectedFileType === _0x28de14(0x3ef) && _0x2bd2b0 === 'COMMON_HOSTNAME' && (_0x2ff968 = _0x28de14(0x3b9));
                var _0x359af3 = '';
                if (_0x122b7c['length'] > 0x2) {
                    var _0x27a1cd = 0x0;
                    _0x122b7c[_0x28de14(0x2d5)](function (_0x3de0e6) {
                        if (_0x27a1cd > 0x0) _0x3ade92 += _0x3de0e6 + '\x20';
                        _0x27a1cd++, _0x359af3 = _0x3de0e6;
                    }), _0x3ade92[_0x28de14(0x3b4)]();
                } else _0x3ade92 = _0x122b7c[0x1], _0x359af3 = _0x122b7c[0x1];
                selectedFileType === 'Service' ? (_0x1fb6f7 = _0x2bd2b0 + '_' + serviceIdCount, $('#' + _0x2bd2b0)['val']() !== undefined && (_0x4e3d84 = _0x28de14(0x1cb), _0x510dd7 = 'value=' + $('#' + _0x2bd2b0)['val']())) : _0x1fb6f7 = _0x2bd2b0;
                if (_0x122b7c[0x0] === 'REUSABLE') {
                    var _0x457c27 = 'reusable-class-' + _0x2bd2b0;
                    _0x4e3d84 += _0x457c27, selectedFileType === 'Host' && _0x4f28cf[_0x28de14(0x36d)](_0x457c27);
                }
                if (_0x23da05) _0x241458 += _0x28de14(0x1f6), _0x241458 += _0x28de14(0x328), _0x241458 += _0x28de14(0x174), _0x241458 += _0x28de14(0x1ed), _0x241458 += _0x28de14(0x2dc) + _0x1fb6f7 + '\x22>' + _0x3ade92 + '\x20REQUIRED?</label>', _0x241458 += '<span\x20class=\x22\x22\x20style=\x22display:\x20list-item\x20!important;\x20padding-bottom:\x2062px;\x20overflow:\x20hidden;\x22>', _0x241458 += _0x28de14(0x297), _0x241458 += '<input\x20type=\x22checkbox\x22\x20id=\x22' + _0x1fb6f7 + _0x28de14(0x39b) + _0x2bd2b0 + '\x22\x20data-to-hide=\x22' + _0x143a6d + '\x22\x20onchange=\x22boolValueChanged(this)\x22\x20' + _0x3a4b6f + '>', _0x241458 += '<span\x20class=\x22slider\x20round\x22></span>', _0x241458 += _0x28de14(0x2b1), _0x241458 += _0x28de14(0x24b), _0x241458 += '</div>', _0x241458 += _0x28de14(0x31a), _0x241458 += _0x28de14(0x174), _0x241458 += '<div\x20class=\x22form-group\x20password-group\x20pan\x20w-60\x20d-inline-block\x20my-3\x20px-md-4\x20px-2\x22\x20style=\x22margin-left:1%;\x22>', _0x241458 += '<span\x20class=\x22input_box\x20pass-box\x22>', _0x241458 += _0x28de14(0x2eb), _0x241458 += _0x28de14(0x24b), _0x241458 += _0x28de14(0x31a), _0x241458 += _0x28de14(0x31a), _0x241458 += '</div>';
                else {
                    if (_0x2bd2b0 === 'REUSABLE_AUTOMATION__REUSABLE_VAULT' || _0x2bd2b0 === _0x28de14(0x316)) {
                        var _0x5ecf68 = '';
                        if (_0x2bd2b0 === 'GLOBAL_APPLICATION') _0x5ecf68 = _0x28de14(0x1ca), applicationNames[_0x28de14(0x2d5)](function (_0x43bd3e) {
                            var _0x190436 = _0x28de14;
                            _0x5ecf68 += '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22' + _0x43bd3e + '\x22>' + _0x43bd3e + _0x190436(0x1c1);
                        });
                        else {
                            _0x5ecf68 = '<option\x20disabled\x20selected>Select\x20Secret</option>';
                            var _0x3f1f8d = '';
                            selectedFileType === _0x28de14(0x35f) && ($('#' + _0x2bd2b0)[_0x28de14(0x2c1)]() !== undefined && (_0x3f1f8d = $('#' + _0x2bd2b0)[_0x28de14(0x2c1)]())), vaults[_0x28de14(0x2d5)](function (_0x4adf69) {
                                var _0x1ed628 = _0x28de14;
                                if (_0x3f1f8d !== '' && _0x3f1f8d === _0x4adf69) _0x5ecf68 += _0x1ed628(0x31c) + _0x4adf69 + _0x1ed628(0x2e1) + _0x4adf69 + _0x1ed628(0x1c1);
                                else _0x5ecf68 += _0x1ed628(0x31c) + _0x4adf69['url'] + '\x22>' + _0x4adf69[_0x1ed628(0x1d8)] + '</option>';
                            });
                        }
                        _0x241458 += _0x28de14(0x1e3) + _0x1b521a + _0x28de14(0x242) + _0x1fb6f7 + _0x28de14(0x392) + _0x2ff968 + '>', _0x241458 += _0x28de14(0x3d0), _0x241458 += _0x28de14(0x27a) + _0x1fb6f7 + _0x28de14(0x39b) + _0x2bd2b0 + '\x22>', _0x241458 += _0x5ecf68, _0x241458 += _0x28de14(0x2da), _0x241458 += _0x28de14(0x31a), _0x241458 += _0x28de14(0x31a);
                    } else {
                        if (_0x2bd2b0 === _0x28de14(0x27c)) {
                            var _0x5ecf68 = _0x28de14(0x300);
                            emailLists['forEach'](function (_0x3a3d1a) {
                                var _0xf054 = _0x28de14;
                                _0x5ecf68 += _0xf054(0x346) + _0x3a3d1a + '\x22>' + _0x3a3d1a + '</option>';
                            }), _0x241458 += _0x28de14(0x1e3) + _0x1b521a + _0x28de14(0x242) + _0x1fb6f7 + _0x28de14(0x392) + _0x2ff968 + '>', _0x241458 += _0x28de14(0x3d0), _0x241458 += '<select\x20class=\x22custom-select\x20select-input\x20px-2\x20' + _0x4e3d84 + _0x28de14(0x242) + _0x1fb6f7 + '\x22\x20name=\x22' + _0x2bd2b0 + '\x22\x20data-attribute=\x22' + _0x359af3 + _0x28de14(0x18f) + selectedFileType + '\x22>', _0x241458 += _0x5ecf68, _0x241458 += _0x28de14(0x2da), _0x241458 += '</div>', _0x241458 += _0x28de14(0x31a);
                        } else {
                            _0x241458 += _0x28de14(0x1cf) + _0x1b521a + _0x28de14(0x242) + _0x1fb6f7 + _0x28de14(0x392) + _0x2ff968 + '>', _0x241458 += _0x28de14(0x286);
                            if (_0x1fb6f7 == _0x28de14(0x3da)) _0x241458 += '<label\x20for=\x22' + _0x1fb6f7 + '\x22\x20class=\x22lightgray-text\x20text-lowercase\x22>' + _0x1fb6f7 + _0x28de14(0x2b1), _0x241458 += _0x28de14(0x3ee) + _0x1fb6f7 + _0x28de14(0x39b) + _0x2bd2b0 + _0x28de14(0x264) + _0x4e3d84 + '\x22\x20data-attribute=\x22' + _0x359af3 + _0x28de14(0x3f0) + selectedFileType + '\x22\x20' + _0x510dd7 + '>';
                            else _0x1fb6f7 == _0x28de14(0x23d) ? (_0x241458 += _0x28de14(0x2de) + _0x1fb6f7 + _0x28de14(0x360) + _0x1fb6f7 + _0x28de14(0x2b1), _0x241458 += _0x28de14(0x3ee) + _0x1fb6f7 + _0x28de14(0x39b) + _0x2bd2b0 + _0x28de14(0x264) + _0x4e3d84 + _0x28de14(0x3dd) + _0x359af3 + '\x22\x20autocomplete=\x22off\x22\x20data-template=\x22' + selectedFileType + '\x22\x20' + _0x510dd7 + '>') : (_0x241458 += _0x28de14(0x2de) + _0x1fb6f7 + '\x22\x20class=\x22lightgray-text\x20text-lowercase\x22>' + _0x3ade92 + _0x28de14(0x2b1), _0x241458 += '<input\x20type=\x22text\x22\x20id=\x22' + _0x1fb6f7 + _0x28de14(0x39b) + _0x2bd2b0 + _0x28de14(0x264) + _0x4e3d84 + _0x28de14(0x3dd) + _0x359af3 + '\x22\x20autocomplete=\x22off\x22\x20data-template=\x22' + selectedFileType + '\x22\x20' + _0x510dd7 + '>');
                            _0x241458 += _0x28de14(0x24b), _0x241458 += _0x28de14(0x31a);
                        }
                    }
                }
            });
            if (selectedFileType === _0x387459(0x3ef)) {
                $(_0x387459(0x216))['append'](_0x241458);
                var _0x55476a = _0x387459(0x252),
                    _0xb42993 = $(_0x387459(0x3e6))[_0x387459(0x2c1)]();
                global_all_services !== undefined && global_all_services[_0x387459(0x34f)] > 0x0 && ($(_0x387459(0x3f2))[_0x387459(0x2c2)](), global_all_services['forEach'](function (_0x367e9b) {
                    var _0x14d7f3 = _0x387459;
                    _0x367e9b[_0x14d7f3(0x36f)](_0x14d7f3(0x279)) && (sevices_txt = _0x367e9b['replace'](_0x14d7f3(0x279), ''), _0x55476a += _0x14d7f3(0x346) + _0x367e9b + '\x22>' + sevices_txt['replace']('.j2', '') + _0x14d7f3(0x1c1));
                }), $('#services-dropdown')[_0x387459(0x207)](_0x55476a), $('#services-select-div')[_0x387459(0x39a)]());
                if (isEdit) editCallback();
            } else {
                $('#service-form-div')[_0x387459(0x207)](_0x241458), $('#service-selected')[_0x387459(0x39a)]();
                var _0x667eb4 = document[_0x387459(0x2ad)](_0x387459(0x249));
                _0x667eb4[_0x387459(0x1ff)]['contains']('col-12') && (_0x667eb4[_0x387459(0x1ff)]['remove']('col-12'), _0x667eb4[_0x387459(0x1ff)][_0x387459(0x34c)]('col-lg-6')), $(_0x387459(0x30d))[_0x387459(0x331)]();
            }
            fieldValidation(), registerInputFieldEvents(), registerLocalInputFieldEvents(_0x4f28cf);
        }
    } else swal(_0x387459(0x383), '\x20', _0x387459(0x177));
}

function getApplicationNames() {
    var _0x41ad6b = _0x1c480c;
    if (applicationNames[_0x41ad6b(0x34f)] === 0x0) requestDataFromServer('/applications/getallapplicationnames', {}, 'GET')['done'](handleApplicationNamesResponse);
}

function getVaultInformation() {
    var _0x32af07 = _0x1c480c;
    vaults[_0x32af07(0x34f)] === 0x0 && requestDataFromServer(_0x32af07(0x397), {}, _0x32af07(0x359))['done'](handlevaultresponse);
}

function handlevaultresponse(_0x20ce6b) {
    var _0x6512e9 = _0x1c480c,
        _0x316e67 = '\x20';
    res = JSON[_0x6512e9(0x321)](_0x20ce6b);
    $(_0x6512e9(0x3ce))['children']('option')[_0x6512e9(0x34f)] == 0x0 && (_0x316e67 = _0x6512e9(0x371));
    if (res[_0x6512e9(0x295)] == 0xc8) res['data'][_0x6512e9(0x2d5)](function (_0x4a0fe8) {
        var _0x58216f = _0x6512e9;
        vaults['push'](_0x4a0fe8), !$(_0x58216f(0x3a2) + _0x4a0fe8[_0x58216f(0x1d8)] + '\x27]')[_0x58216f(0x34f)] > 0x0 && (_0x316e67 += _0x58216f(0x346) + _0x4a0fe8[_0x58216f(0x1d8)] + '\x22>' + _0x4a0fe8['url'] + _0x58216f(0x1c1));
    });
    else { }
    $(_0x6512e9(0x3ce))[_0x6512e9(0x207)](_0x316e67);
}

function handleApplicationNamesResponse(_0x1a4e47) {
    var _0x4b0e99 = _0x1c480c;
    res = JSON['parse'](_0x1a4e47);
    var _0x2227d0 = '\x20';
    $(_0x4b0e99(0x255))[_0x4b0e99(0x358)]('option')[_0x4b0e99(0x34f)] == 0x0 && (_0x2227d0 = '<option\x20disabled\x20selected>Select\x20Application</option>'), res[_0x4b0e99(0x295)] == 0xc8 ? res[_0x4b0e99(0x1ef)]['forEach'](function (_0x2e7671) {
        var _0xb28725 = _0x4b0e99;
        applicationNames[_0xb28725(0x36d)](_0x2e7671[_0xb28725(0x3ed)]), !$(_0xb28725(0x29e) + _0x2e7671[_0xb28725(0x3ed)] + ']')[_0xb28725(0x34f)] > 0x0 && (_0x2227d0 += _0xb28725(0x346) + _0x2e7671['applicationname'] + '\x22>' + _0x2e7671[_0xb28725(0x3ed)] + _0xb28725(0x1c1));
    }) : swal(_0x4b0e99(0x1b7), '\x20', _0x4b0e99(0x177)), $(_0x4b0e99(0x255))['append'](_0x2227d0), $(_0x4b0e99(0x280))[_0x4b0e99(0x207)](_0x2227d0);
}

function drawMultiplIPAddresses() {
    var _0x1becbc = _0x1c480c;
    if (global_ip_addresses !== undefined) {
        $('#multi-select-ip')[_0x1becbc(0x2c2)]();
        var _0x58619c = _0x1becbc(0x3ff);
        global_ip_addresses[_0x1becbc(0x2d5)](function (_0x8d680) {
            var _0x312493 = _0x1becbc,
                _0x1665ca = _0x8d680['ip'],
                _0x1daba2 = registeredIPAddress[_0x312493(0x36f)](_0x1665ca),
                _0x55fe2e = '';
            _0x1daba2 ? _0x58619c += '<option\x20style=\x22color:\x20gray\x20!important;\x20font-size:\x200.875rem;\x22\x20value=\x22' + _0x1665ca + '\x22\x20' + _0x55fe2e + _0x312493(0x1f7) + _0x1665ca + _0x312493(0x1c1) : _0x58619c += _0x312493(0x1a3) + _0x1665ca + _0x312493(0x3e2) + _0x1665ca + '</option>', _0x58619c += '<option\x20disabled\x20style=\x22color:\x20transparent;\x20font-size:\x200;\x22></option>';
        }), $(_0x1becbc(0x1fe))[_0x1becbc(0x207)](_0x58619c);
    }
    $('#multipleIPAddressSelect')[_0x1becbc(0x39a)](), registerMultiSelect();
}

function drawSingleIpAddress(_0x21ab96) {
    var _0x21cb85 = _0x1c480c,
        _0x374f1e = _0x21cb85(0x346) + _0x21ab96 + '\x22>' + _0x21ab96 + _0x21cb85(0x1c1);
    $(_0x21cb85(0x1fe))['append'](_0x374f1e), $(_0x21cb85(0x399))[_0x21cb85(0x39a)](), registerMultiSelect();
}

function registerMultiSelect() {
    var _0x1b3855 = _0x1c480c;
    if (registeredMultiSelect === !![]) return;
    registeredMultiSelect = !![], $(_0x1b3855(0x27f))[_0x1b3855(0x260)]({
        'placeholder': _0x1b3855(0x2ae),
        'allowClear': !![],
        'theme': 'bootstrap'
    });
}

function boolValueChanged(_0x275b76) {
    var _0x1ffb80 = _0x1c480c;
    _0x275b76[_0x1ffb80(0x275)] == !![] ? $('.' + $(_0x275b76)[_0x1ffb80(0x327)]('data-to-hide'))[_0x1ffb80(0x39a)]() : $('.' + $(_0x275b76)[_0x1ffb80(0x327)](_0x1ffb80(0x21e)))[_0x1ffb80(0x331)]();
}

function registerLocalInputFieldEvents(_0x2c0dc4) {
    var _0x49de76 = _0x1c480c;
    selectedFileType === _0x49de76(0x35f) && $(_0x49de76(0x182))[_0x49de76(0x2f9)](function () {
        var _0x26163d = _0x49de76;
        if ($(this)[_0x26163d(0x327)](_0x26163d(0x3f1)) === 'EMAIL') {
            var _0xa0a027 = $(_0x26163d(0x1ce))[_0x26163d(0x2c1)](),
                _0x5e8a73 = document[_0x26163d(0x26e)](_0x26163d(0x2d2))[0x0]['options'];
            for (i = 0x0; i < _0x5e8a73[_0x26163d(0x34f)]; i++) {
                if (_0x5e8a73[i][_0x26163d(0x1a6)]['indexOf'](_0xa0a027) > -0x1) {
                    _0x5e8a73[i][_0x26163d(0x37d)] = !![];
                    break;
                }
            }
        }
        if (document[_0x26163d(0x2ad)](_0x26163d(0x2f2))[_0x26163d(0x275)] === !![]) {
            var _0x468021 = $(_0x26163d(0x3ce))['val'](),
                _0x5e8a73 = $(_0x26163d(0x21d))[0x0]['options'];
            for (i = 0x0; i < _0x5e8a73[_0x26163d(0x34f)]; i++) {
                if (_0x5e8a73[i]['text']['indexOf'](_0x468021) > -0x1) {
                    _0x5e8a73[i]['selected'] = !![];
                    break;
                }
            }
        }
        $(this)['val']() !== '' && ($(this)[_0x26163d(0x2ee)]()[_0x26163d(0x2d8)](_0x26163d(0x372))[_0x26163d(0x2a9)](_0x26163d(0x2d1)), $(this)[_0x26163d(0x2ee)]()[_0x26163d(0x2a9)](_0x26163d(0x38f)));
    }), _0x2c0dc4[_0x49de76(0x2d5)](function (_0x57c557) {
        var _0x4cc39d = _0x49de76;
        $('.' + _0x57c557)[_0x4cc39d(0x1b3)](function (_0x2203e8) {
            var _0x4daaa5 = _0x4cc39d;
            if ($(this)[_0x4daaa5(0x327)]('data-template') === _0x4daaa5(0x3ef)) {
                var _0x5dd6be = _0x4daaa5(0x20c) + $(this)[_0x4daaa5(0x327)](_0x4daaa5(0x231)),
                    _0xf6ae2a = $(this)[_0x4daaa5(0x2c1)]();
                $('.' + _0x5dd6be)[_0x4daaa5(0x2f9)](function () {
                    var _0x1fcb92 = _0x4daaa5;
                    $(this)['attr'](_0x1fcb92(0x1ee)) === _0x1fcb92(0x35f) && $(this)[_0x1fcb92(0x2c1)]() === '' && ($(this)[_0x1fcb92(0x2c1)](_0xf6ae2a), $(this)[_0x1fcb92(0x2ee)]()[_0x1fcb92(0x2d8)](_0x1fcb92(0x372))['addClass'](_0x1fcb92(0x2d1)), $(this)[_0x1fcb92(0x2ee)]()[_0x1fcb92(0x2a9)]('bg_input'));
                });
            }
        });
    });
}

function serviceSubmit() {
    var _0x515bf8 = _0x1c480c;
    if (checkIfFieldIsEmpty(_0x515bf8(0x3ef))) return;
    if (checkIfFieldIsEmpty(_0x515bf8(0x35f))) return;
    if ($('#REUSABLE_EMAIL_' + serviceIdCount)[_0x515bf8(0x2c1)]() === null) {
        alert(_0x515bf8(0x2fa));
        return;
    }
    if (document['getElementById'](_0x515bf8(0x384) + serviceIdCount)['checked']) {
        if ($(_0x515bf8(0x34b) + serviceIdCount)[_0x515bf8(0x2c1)]() === null) {
            alert('Choose\x20Secret.');
            return;
        }
    }
    var _0x3d8a9b = {};
    _0x3d8a9b['id'] = serviceIdCount;
    var _0x136904 = $(_0x515bf8(0x37f))['serializeArray']();
    _0x136904[_0x515bf8(0x2d5)](function (_0x5cc335) {
        var _0x396c56 = _0x515bf8;
        _0x3d8a9b[_0x396c56(0x206)] = $(_0x396c56(0x3f2))[_0x396c56(0x2c1)](), _0x3d8a9b[_0x5cc335['name']] = _0x5cc335[_0x396c56(0x3d7)];
    }), service_list[_0x515bf8(0x36d)](_0x3d8a9b);
    var _0x348a2b = _0x3d8a9b[_0x515bf8(0x3b8)];
    _0x348a2b === undefined && (_0x348a2b = '--');
    var _0x5e3ee7 = '';
    _0x5e3ee7 += _0x515bf8(0x3e7) + serviceIdCount + '\x22>', _0x5e3ee7 += _0x515bf8(0x1c7), _0x5e3ee7 += '<div\x20class=\x22col-10\x20p-0\x22>', _0x5e3ee7 += _0x515bf8(0x2e6) + serviceIdCount + '\x22\x20data-template=\x22' + $(_0x515bf8(0x3f2))[_0x515bf8(0x2c1)]() + '\x22>', _0x5e3ee7 += _0x515bf8(0x229) + _0x348a2b + _0x515bf8(0x3c8), _0x5e3ee7 += _0x515bf8(0x272) + $(_0x515bf8(0x3f2))[_0x515bf8(0x2c1)]()[_0x515bf8(0x33d)]('.j2', '') + _0x515bf8(0x24b), _0x5e3ee7 += _0x515bf8(0x2e7), _0x5e3ee7 += '</div>', _0x5e3ee7 += _0x515bf8(0x273), _0x5e3ee7 += '<button\x20class=\x22btn\x20float-right\x22\x20type=\x22button\x22\x20onclick=\x22closeClick(this)\x22\x20data-id=\x22' + serviceIdCount + _0x515bf8(0x1d0), _0x5e3ee7 += _0x515bf8(0x31a), _0x5e3ee7 += '</div>', _0x5e3ee7 += _0x515bf8(0x31a), $('#registered-service-no-data')[_0x515bf8(0x3c2)](_0x515bf8(0x230), 'none'), $(_0x515bf8(0x2b3))['append'](_0x5e3ee7), $(_0x515bf8(0x1ae))[_0x515bf8(0x331)](), $(_0x515bf8(0x3bd))[_0x515bf8(0x2c2)](), $('#services-dropdown')[_0x515bf8(0x2c1)](_0x515bf8(0x1b8)), serviceIdCount++;
}

function editHost(_0x444a81) {
    var _0x5797f8 = _0x1c480c;
    isEdit = !![];
    var _0x2e6939 = $(_0x444a81)['attr']('data-ipaddress');
    requestDataFromServer('edithostdetails', {
        'ipaddress': _0x2e6939
    }, _0x5797f8(0x359))[_0x5797f8(0x368)](editResponse);
}
var prototypes = '';

function editmgmnt(_0x3bac7a) {
    var _0x234260 = _0x1c480c;
    isEdit = !![];
    var _0x4ad51a = $(_0x3bac7a)[_0x234260(0x327)]('data-ipaddress');
    prototypes = $(_0x3bac7a)[_0x234260(0x327)]('name'), requestDataFromServer('edithostdetails', {
        'ipaddress': _0x4ad51a
    }, _0x234260(0x359))[_0x234260(0x368)](editmgmtResponse);
}
var validationip = '';

function editmgmtResponse(_0x4befe9) {
    var _0x13d453 = _0x1c480c;
    res = JSON[_0x13d453(0x321)](_0x4befe9);
    res[_0x13d453(0x1ef)][0x0][_0x13d453(0x3fe)] == _0x13d453(0x1a4) || res[_0x13d453(0x1ef)][0x0][_0x13d453(0x3fe)] == 'VM' ? document[_0x13d453(0x2ad)](_0x13d453(0x24a))[_0x13d453(0x373)] = _0x13d453(0x201) + res[_0x13d453(0x1ef)][0x0]['pathhost'] + _0x13d453(0x243) : document[_0x13d453(0x2ad)](_0x13d453(0x24a))[_0x13d453(0x373)] = _0x13d453(0x201) + res[_0x13d453(0x1ef)][0x0][_0x13d453(0x3fe)];
    var _0x5edbf3 = res['data'][0x0]['ipaddress'],
        _0x973a57 = res[_0x13d453(0x1ef)][0x0][_0x13d453(0x3fe)][_0x13d453(0x39e)]('\x20')[0x1],
        _0xacc186 = res[_0x13d453(0x1ef)][0x0][_0x13d453(0x3fe)][_0x13d453(0x39e)]('\x20')[0x0],
        _0x4d9a47 = JSON[_0x13d453(0x2b2)](res[_0x13d453(0x1ef)][0x0][_0x13d453(0x270)][_0x13d453(0x39e)]('.')[0x0]),
        _0x41dab2 = _0x4d9a47[_0x13d453(0x39e)]('7')[0x1],
        _0x578a23 = _0x4d9a47[_0x13d453(0x39e)]('8')[0x1],
        _0x4fe9fb = JSON['stringify'](res[_0x13d453(0x1ef)][0x0]['pathhost']);
    validationip = _0x5edbf3;
    _0x41dab2 == _0x13d453(0x203) || _0x578a23 == _0x13d453(0x203) ? $('#Mgmnt_val')[_0x13d453(0x3c2)](_0x13d453(0x230), _0x13d453(0x1eb)) : $(_0x13d453(0x1bc))[_0x13d453(0x3c2)]('display', _0x13d453(0x1ec));
    jsval = _0x4fe9fb[_0x13d453(0x33d)](/['"]+/g, ''), getFileNames(jsval);
    var _0x1a8e9f = _0x13d453(0x3c4) + jsval + _0x13d453(0x2a6) + jsval + _0x13d453(0x2f7);
    $('#path-dropdown')[_0x13d453(0x207)](_0x1a8e9f);
    if (res[_0x13d453(0x295)] == 0xc8 & res[_0x13d453(0x1ef)] != '') {
        getApplicationNames(), getVaultInformation();
        var _0x27dbc0 = res[_0x13d453(0x1ef)];
        if (_0x27dbc0[_0x13d453(0x34f)] > 0x0) {
            var _0x3c08bf;
            _0x27dbc0[_0x13d453(0x2d5)](function (_0x38303c) {
                var _0x193784 = _0x13d453;
                if (_0x38303c[_0x193784(0x269)] === '') {
                    _0x3c08bf = _0x38303c;
                    return;
                }
            });
            var _0x580574 = JSON['parse'](_0x3c08bf[_0x13d453(0x30c)]);
            $(_0x13d453(0x3e6))[_0x13d453(0x2c1)](_0x580574[_0x13d453(0x38c)])[_0x13d453(0x284)](), $('#multi-ip-ip')[_0x13d453(0x2c1)](_0x580574[_0x13d453(0x3bf)])[_0x13d453(0x284)](), $(_0x13d453(0x248))['hide'](), $(_0x13d453(0x180))[_0x13d453(0x39a)](), $(_0x13d453(0x1bf))[_0x13d453(0x39a)](), $(_0x13d453(0x2e4))[_0x13d453(0x2c2)](), $(_0x13d453(0x2e4))[_0x13d453(0x39a)](), $(_0x13d453(0x3fb))[_0x13d453(0x327)](_0x13d453(0x1fb), _0x13d453(0x29b)), editRespone = _0x27dbc0, $('#hosts-dropdown')['attr'](_0x13d453(0x25f), _0x13d453(0x25f));
            var _0x3bb58d = _0x13d453(0x38a) + _0x580574[_0x13d453(0x38c)] + '\x22>',
                _0xa85af1 = _0x13d453(0x256) + _0x580574['COMMON_HOSTNAME'] + '\x22>\x20' + _0x580574[_0x13d453(0x3bf)] + '</input\x20>';
            $('#spabid')[_0x13d453(0x331)](), $(_0x13d453(0x2cf))[_0x13d453(0x207)](_0x3bb58d), $(_0x13d453(0x2e4))[_0x13d453(0x207)](_0xa85af1);
        }
    } else res[_0x13d453(0x295)] == 0xc8 & res[_0x13d453(0x1ef)] == '' ? swal(_0x13d453(0x357), '\x20', _0x13d453(0x181)) : swal(_0x13d453(0x18c), '\x20', 'error');
    if (_0x973a57 == _0x13d453(0x407) || _0xacc186 == 'Fortigate') {
        $(_0x13d453(0x1cc))[_0x13d453(0x3c2)](_0x13d453(0x230), _0x13d453(0x1ec)), $(_0x13d453(0x1bc))[_0x13d453(0x3c2)](_0x13d453(0x230), _0x13d453(0x1eb)), $(_0x13d453(0x1b9))[_0x13d453(0x3c2)](_0x13d453(0x230), _0x13d453(0x1eb)), document[_0x13d453(0x2ad)](_0x13d453(0x250))['click']();
        if (prototypes == _0x13d453(0x2e9) && validationip == _0x5edbf3) {
            $(_0x13d453(0x1cc))[_0x13d453(0x3c2)](_0x13d453(0x2bc), '#55a8fd');
            const _0x3febe3 = document[_0x13d453(0x2ad)](_0x13d453(0x1b6));
            _0x3febe3[_0x13d453(0x25d)] = 0x1, _0x3febe3['dispatchEvent'](new Event('change')), requestDataFromServer(_0x13d453(0x3de), {
                'csrfmiddlewaretoken': csfr_token
            }, _0x13d453(0x359))['done'](function (_0x2e243f) {
                var _0x5e0644 = _0x13d453;
                snmp_res = JSON[_0x5e0644(0x321)](_0x2e243f), snmp_res[_0x5e0644(0x295)] == 0xc8 && snmp_res[_0x5e0644(0x1ef)] != '' && (snmpres_details = snmp_res[_0x5e0644(0x1ef)], snmpres_details['forEach'](function (_0x18e006) {
                    var _0x4e7cf9 = _0x5e0644;
                    _0x18e006[_0x4e7cf9(0x23a)] == _0x5edbf3 && ($(_0x4e7cf9(0x28b))[_0x4e7cf9(0x2c1)](_0x18e006['ipaddress']), $(_0x4e7cf9(0x366))[_0x4e7cf9(0x2c1)](_0x18e006[_0x4e7cf9(0x37c)]), $(_0x4e7cf9(0x3cb))[_0x4e7cf9(0x2c1)](_0x18e006[_0x4e7cf9(0x261)]));
                }));
            });
        } else {
            if (prototypes == 'v3' && validationip == _0x5edbf3) {
                $(_0x13d453(0x1cc))[_0x13d453(0x3c2)]('color', _0x13d453(0x24f));
                const _0x1d46f9 = document['getElementById'](_0x13d453(0x1b6));
                _0x1d46f9[_0x13d453(0x25d)] = 0x2, _0x1d46f9[_0x13d453(0x1e0)](new Event(_0x13d453(0x284))), requestDataFromServer(_0x13d453(0x3de), {
                    'csrfmiddlewaretoken': csfr_token
                }, _0x13d453(0x359))['done'](function (_0x222c6e) {
                    var _0x16fa10 = _0x13d453;
                    snmp_res = JSON[_0x16fa10(0x321)](_0x222c6e), snmp_res[_0x16fa10(0x295)] == 0xc8 && snmp_res[_0x16fa10(0x1ef)] != '' && (snmpres_details = snmp_res[_0x16fa10(0x1ef)], snmpres_details[_0x16fa10(0x2d5)](function (_0x1af95e) {
                        var _0x3e5271 = _0x16fa10;
                        _0x1af95e[_0x3e5271(0x23a)] == _0x5edbf3 && ($('#CreateSnmp\x20#snmp-select-ip')['val'](_0x1af95e[_0x3e5271(0x23a)]), $('#CreateSnmp\x20#user_name')[_0x3e5271(0x2c1)](_0x1af95e[_0x3e5271(0x24e)]), $(_0x3e5271(0x3cf))[_0x3e5271(0x2c1)](_0x1af95e[_0x3e5271(0x2fe)]), $(_0x3e5271(0x3cb))[_0x3e5271(0x2c1)](_0x1af95e[_0x3e5271(0x261)]), $(_0x3e5271(0x1b0))['val'](_0x1af95e['auth_method']), $(_0x3e5271(0x215))[_0x3e5271(0x2c1)](_0x1af95e['auth_password']), $('#CreateSnmp\x20#Privacy_mtd')[_0x3e5271(0x2c1)](_0x1af95e['priv_method']), $(_0x3e5271(0x30f))['val'](_0x1af95e[_0x3e5271(0x205)]));
                    }));
                });
            }
        }
    } else {
        $(_0x13d453(0x1cc))['css'](_0x13d453(0x230), 'none');
        if (prototypes == 'idrac' || prototypes == 'ilo') {
            document[_0x13d453(0x2ad)](_0x13d453(0x175))['click']();
            if (prototypes == _0x13d453(0x3a4)) {
                const _0x513b7e = document[_0x13d453(0x2ad)]('mgmts_version');
                _0x513b7e[_0x13d453(0x25d)] = 0x2, _0x513b7e[_0x13d453(0x1e0)](new Event(_0x13d453(0x284))), requestDataFromServer(_0x13d453(0x21f), {
                    'ipaddress': _0x5edbf3
                }, _0x13d453(0x359))[_0x13d453(0x368)](function (_0x55b33e) {
                    var _0x2a8b36 = _0x13d453;
                    mgmt_res = JSON[_0x2a8b36(0x321)](_0x55b33e);
                    var _0xd1bae7 = JSON[_0x2a8b36(0x321)](mgmt_res['data'][0x0][_0x2a8b36(0x35d)][_0x2a8b36(0x33d)](/'/g, '\x22'));
                    mgmt_res[_0x2a8b36(0x295)] == 0xc8 && mgmt_res['data'] != '' && (mgmtres_details = mgmt_res[_0x2a8b36(0x1ef)], mgmtres_details[_0x2a8b36(0x2d5)](function (_0x65bccf) {
                        var _0x10d26d = _0x2a8b36;
                        if (_0x65bccf[_0x10d26d(0x226)] == _0x10d26d(0x3a4)) {
                            $(_0x10d26d(0x3ae))['val'](_0x65bccf[_0x10d26d(0x278)]);
                            var _0x3ba31a = {};
                            _0x3ba31a[_0x10d26d(0x2ed)] = isEdit, _0x3ba31a[_0x10d26d(0x226)] = _0x65bccf[_0x10d26d(0x226)], _0x3ba31a[_0x10d26d(0x24e)] = '', _0x3ba31a[_0x10d26d(0x3a3)] = '', _0x3ba31a[_0x10d26d(0x33a)] = '', _0x3ba31a[_0x10d26d(0x278)] = _0x65bccf['port'], _0x3ba31a[_0x10d26d(0x35d)] = '', ilomgmt_list[_0x10d26d(0x36d)](_0x3ba31a);
                        }
                        if (_0x65bccf['prototype'] == _0x10d26d(0x244)) {
                            var _0x3ba31a = {};
                            _0x3ba31a[_0x10d26d(0x2ed)] = isEdit, _0x3ba31a[_0x10d26d(0x226)] = _0x65bccf[_0x10d26d(0x226)], _0x3ba31a[_0x10d26d(0x24e)] = _0x65bccf['username'], _0x3ba31a['password'] = _0x65bccf['password'], _0x3ba31a['iloip'] = _0x65bccf[_0x10d26d(0x33a)], _0x3ba31a[_0x10d26d(0x278)] = '', _0x3ba31a[_0x10d26d(0x35d)] = '', ilomgmt_list[_0x10d26d(0x36d)](_0x3ba31a);
                        }
                        if (_0x65bccf[_0x10d26d(0x226)] == 'Node\x20Expo') {
                            var _0x3ba31a = {};
                            _0x3ba31a['isedit'] = isEdit, _0x3ba31a['prototype'] = _0x65bccf[_0x10d26d(0x226)], _0x3ba31a[_0x10d26d(0x24e)] = '', _0x3ba31a[_0x10d26d(0x3a3)] = '', _0x3ba31a[_0x10d26d(0x33a)] = '', _0x3ba31a['port'] = _0x65bccf[_0x10d26d(0x278)], _0x3ba31a[_0x10d26d(0x35d)] = _0xd1bae7;
                            for (var _0x3139f4 in _0xd1bae7) {
                                if (_0xd1bae7[_0x10d26d(0x2b7)](_0x3139f4)) {
                                    var _0x1cebec = document[_0x10d26d(0x2ad)](_0x3139f4);
                                    _0x1cebec && (_0x1cebec[_0x10d26d(0x3d7)] = _0xd1bae7[_0x3139f4]);
                                }
                            }
                            nodemgmt_list[_0x10d26d(0x36d)](_0x3ba31a);
                        }
                    }));
                });
            } else {
                const _0x58a105 = document[_0x13d453(0x2ad)]('mgmts_version');
                _0x58a105[_0x13d453(0x25d)] = 0x1, _0x58a105[_0x13d453(0x1e0)](new Event(_0x13d453(0x284))), requestDataFromServer(_0x13d453(0x21f), {
                    'ipaddress': _0x5edbf3
                }, _0x13d453(0x359))[_0x13d453(0x368)](function (_0x1602b7) {
                    var _0x1b7d89 = _0x13d453;
                    mgmt_res = JSON[_0x1b7d89(0x321)](_0x1602b7);
                    var _0x4e9ae9 = JSON['parse'](mgmt_res[_0x1b7d89(0x1ef)][0x0][_0x1b7d89(0x35d)][_0x1b7d89(0x33d)](/'/g, '\x22'));
                    mgmt_res[_0x1b7d89(0x295)] == 0xc8 && mgmt_res[_0x1b7d89(0x1ef)] != '' && (mgmtres_details = mgmt_res[_0x1b7d89(0x1ef)], mgmtres_details[_0x1b7d89(0x2d5)](function (_0x32c13f) {
                        var _0x3f8ddf = _0x1b7d89;
                        if (_0x32c13f[_0x3f8ddf(0x226)] == _0x3f8ddf(0x244)) {
                            $(_0x3f8ddf(0x224))['val'](_0x32c13f['username']), $(_0x3f8ddf(0x2fb))[_0x3f8ddf(0x2c1)](_0x32c13f['password']), $('#CreateMgmt\x20#ilo_ip')[_0x3f8ddf(0x2c1)](_0x32c13f[_0x3f8ddf(0x33a)]);
                            var _0x3d81e3 = {};
                            _0x3d81e3['isedit'] = isEdit, _0x3d81e3['prototype'] = _0x32c13f[_0x3f8ddf(0x226)], _0x3d81e3['username'] = _0x32c13f[_0x3f8ddf(0x24e)], _0x3d81e3[_0x3f8ddf(0x3a3)] = _0x32c13f[_0x3f8ddf(0x3a3)], _0x3d81e3[_0x3f8ddf(0x33a)] = _0x32c13f['iloip'], _0x3d81e3['port'] = '', _0x3d81e3['threshold'] = '', ilomgmt_list[_0x3f8ddf(0x36d)](_0x3d81e3);
                        }
                        if (_0x32c13f[_0x3f8ddf(0x226)] == _0x3f8ddf(0x3a4)) {
                            var _0x3d81e3 = {};
                            _0x3d81e3[_0x3f8ddf(0x2ed)] = isEdit, _0x3d81e3[_0x3f8ddf(0x226)] = _0x32c13f[_0x3f8ddf(0x226)], _0x3d81e3[_0x3f8ddf(0x24e)] = '', _0x3d81e3[_0x3f8ddf(0x3a3)] = '', _0x3d81e3[_0x3f8ddf(0x33a)] = '', _0x3d81e3[_0x3f8ddf(0x278)] = _0x32c13f[_0x3f8ddf(0x278)], _0x3d81e3[_0x3f8ddf(0x35d)] = '', ilomgmt_list[_0x3f8ddf(0x36d)](_0x3d81e3);
                        }
                        if (_0x32c13f['prototype'] == _0x3f8ddf(0x2b0)) {
                            var _0x3d81e3 = {};
                            _0x3d81e3[_0x3f8ddf(0x2ed)] = isEdit, _0x3d81e3[_0x3f8ddf(0x226)] = _0x32c13f[_0x3f8ddf(0x226)], _0x3d81e3[_0x3f8ddf(0x24e)] = '', _0x3d81e3[_0x3f8ddf(0x3a3)] = '', _0x3d81e3[_0x3f8ddf(0x33a)] = '', _0x3d81e3['port'] = _0x32c13f[_0x3f8ddf(0x278)], _0x3d81e3[_0x3f8ddf(0x35d)] = _0x4e9ae9;
                            for (var _0x3e2d61 in _0x4e9ae9) {
                                if (_0x4e9ae9['hasOwnProperty'](_0x3e2d61)) {
                                    var _0x135947 = document[_0x3f8ddf(0x2ad)](_0x3e2d61);
                                    _0x135947 && (_0x135947['value'] = _0x4e9ae9[_0x3e2d61]);
                                }
                            }
                            nodemgmt_list[_0x3f8ddf(0x36d)](_0x3d81e3);
                        }
                    }));
                });
            }
        }
        if (prototypes == 'Node\x20Expo') {
            document[_0x13d453(0x2ad)]('Node_val')[_0x13d453(0x3cd)]();
            if (prototypes == _0x13d453(0x2b0)) {
                const _0x26aabc = document[_0x13d453(0x2ad)](_0x13d453(0x1e4));
                _0x26aabc[_0x13d453(0x25d)] = 0x1, _0x26aabc[_0x13d453(0x1e0)](new Event(_0x13d453(0x284))), requestDataFromServer(_0x13d453(0x21f), {
                    'ipaddress': _0x5edbf3
                }, _0x13d453(0x359))[_0x13d453(0x368)](function (_0x9c1313) {
                    var _0x549aef = _0x13d453;
                    mgmt_res = JSON[_0x549aef(0x321)](_0x9c1313);
                    var _0x4c62fd = JSON[_0x549aef(0x321)](mgmt_res[_0x549aef(0x1ef)][0x0][_0x549aef(0x35d)][_0x549aef(0x33d)](/'/g, '\x22'));
                    mgmt_res['status'] == 0xc8 && mgmt_res['data'] != '' && (mgmtres_details = mgmt_res[_0x549aef(0x1ef)], mgmtres_details[_0x549aef(0x2d5)](function (_0xec0ca0) {
                        var _0x1a3929 = _0x549aef;
                        if (_0xec0ca0[_0x1a3929(0x226)] == _0x1a3929(0x2b0)) {
                            $(_0x1a3929(0x1c5))[_0x1a3929(0x2c1)](_0xec0ca0['port']);
                            var _0x80b5a0 = {};
                            _0x80b5a0[_0x1a3929(0x2ed)] = isEdit, _0x80b5a0[_0x1a3929(0x226)] = _0xec0ca0['prototype'], _0x80b5a0['username'] = '', _0x80b5a0[_0x1a3929(0x3a3)] = '', _0x80b5a0['iloip'] = '', _0x80b5a0['port'] = _0xec0ca0['port'], _0x80b5a0['threshold'] = _0x4c62fd;
                            for (var _0x558038 in _0x4c62fd) {
                                if (_0x4c62fd[_0x1a3929(0x2b7)](_0x558038)) {
                                    var _0x45d73c = document[_0x1a3929(0x2ad)](_0x558038);
                                    _0x45d73c && (_0x45d73c[_0x1a3929(0x3d7)] = _0x4c62fd[_0x558038]);
                                }
                            }
                            nodemgmt_list[_0x1a3929(0x36d)](_0x80b5a0);
                        }
                        if (_0xec0ca0[_0x1a3929(0x226)] == _0x1a3929(0x244)) {
                            var _0x80b5a0 = {};
                            _0x80b5a0[_0x1a3929(0x2ed)] = isEdit, _0x80b5a0[_0x1a3929(0x226)] = _0xec0ca0[_0x1a3929(0x226)], _0x80b5a0[_0x1a3929(0x24e)] = _0xec0ca0[_0x1a3929(0x24e)], _0x80b5a0[_0x1a3929(0x3a3)] = _0xec0ca0['password'], _0x80b5a0[_0x1a3929(0x33a)] = _0xec0ca0[_0x1a3929(0x33a)], _0x80b5a0[_0x1a3929(0x278)] = '', _0x80b5a0['threshold'] = '', ilomgmt_list[_0x1a3929(0x36d)](_0x80b5a0);
                        }
                        if (_0xec0ca0[_0x1a3929(0x226)] == 'idrac') {
                            var _0x80b5a0 = {};
                            _0x80b5a0[_0x1a3929(0x2ed)] = isEdit, _0x80b5a0['prototype'] = _0xec0ca0[_0x1a3929(0x226)], _0x80b5a0[_0x1a3929(0x24e)] = '', _0x80b5a0[_0x1a3929(0x3a3)] = '', _0x80b5a0[_0x1a3929(0x33a)] = '', _0x80b5a0[_0x1a3929(0x278)] = _0xec0ca0[_0x1a3929(0x278)], _0x80b5a0['threshold'] = '', ilomgmt_list['push'](_0x80b5a0);
                        }
                    }));
                });
            }
        }
    }
}

function editResponse(_0x1d2341) {
    var _0x1eae85 = _0x1c480c;
    res = JSON['parse'](_0x1d2341);
    res[_0x1eae85(0x1ef)][0x0][_0x1eae85(0x3fe)] == _0x1eae85(0x1a4) || res[_0x1eae85(0x1ef)][0x0]['pathhost'] == 'VM' ? document['getElementById']('hoststitle')[_0x1eae85(0x373)] = _0x1eae85(0x201) + res[_0x1eae85(0x1ef)][0x0][_0x1eae85(0x3fe)] + _0x1eae85(0x243) : document['getElementById'](_0x1eae85(0x24a))['textContent'] = _0x1eae85(0x201) + res[_0x1eae85(0x1ef)][0x0][_0x1eae85(0x3fe)];
    var _0xb8ec27 = res[_0x1eae85(0x1ef)][0x0][_0x1eae85(0x23a)],
        _0x294a72 = res['data'][0x0][_0x1eae85(0x3fe)][_0x1eae85(0x39e)]('\x20')[0x1],
        _0x284d2e = res['data'][0x0]['pathhost'][_0x1eae85(0x39e)]('\x20')[0x0],
        _0x457c64 = JSON['stringify'](res[_0x1eae85(0x1ef)][0x0]['selecthost'][_0x1eae85(0x39e)]('.')[0x0]),
        _0x353323 = _0x457c64[_0x1eae85(0x39e)]('7')[0x1],
        _0x20b384 = _0x457c64[_0x1eae85(0x39e)]('8')[0x1],
        _0x5ee9e2 = JSON[_0x1eae85(0x2b2)](res['data'][0x0][_0x1eae85(0x3fe)]);
    validationip = _0xb8ec27, newonbipadd(_0xb8ec27);
    if (_0x294a72 == _0x1eae85(0x407) || _0x284d2e == _0x1eae85(0x172)) {
        $(_0x1eae85(0x1cc))[_0x1eae85(0x3c2)](_0x1eae85(0x230), _0x1eae85(0x1ec)), $(_0x1eae85(0x1bc))['css'](_0x1eae85(0x230), _0x1eae85(0x1eb)), $(_0x1eae85(0x1b9))['css'](_0x1eae85(0x230), _0x1eae85(0x1eb));
        var _0x5ccde8 = ![];
        requestDataFromServer(_0x1eae85(0x3de), {
            'csrfmiddlewaretoken': csfr_token
        }, _0x1eae85(0x359))[_0x1eae85(0x368)](function (_0x2fc5a4) {
            var _0xbe8df = _0x1eae85;
            snmp_res = JSON[_0xbe8df(0x321)](_0x2fc5a4), snmp_res[_0xbe8df(0x295)] == 0xc8 && snmp_res[_0xbe8df(0x1ef)] != '' && (snmpres_details = snmp_res['data'], snmpres_details[_0xbe8df(0x2d5)](function (_0x32891b) {
                var _0x40bd21 = _0xbe8df;
                if (_0x32891b[_0x40bd21(0x23a)] == _0xb8ec27 && _0x32891b[_0x40bd21(0x1e7)] == 'v2c') {
                    $(_0x40bd21(0x1cc))[_0x40bd21(0x3c2)](_0x40bd21(0x2bc), _0x40bd21(0x24f));
                    const _0x38e495 = document[_0x40bd21(0x2ad)](_0x40bd21(0x1b6));
                    _0x38e495[_0x40bd21(0x25d)] = 0x1, _0x38e495[_0x40bd21(0x1e0)](new Event(_0x40bd21(0x284))), $('#CreateSnmp\x20#snmp-select-ip')[_0x40bd21(0x2c1)](_0x32891b['ipaddress']), $(_0x40bd21(0x366))['val'](_0x32891b[_0x40bd21(0x37c)]), !_0x5ccde8 && (setTimeout(function () {
                        var _0x5b0693 = _0x40bd21;
                        $(_0x5b0693(0x3cb))[_0x5b0693(0x2c1)](_0x32891b[_0x5b0693(0x261)])[_0x5b0693(0x408)]('change');
                    }, 0x3e8), _0x5ccde8 = !![]);
                } else {
                    if (_0x32891b['ipaddress'] == _0xb8ec27 && _0x32891b['version'] == 'v3') {
                        $('#snmp_val')['css']('color', _0x40bd21(0x24f));
                        const _0x39e6b6 = document[_0x40bd21(0x2ad)](_0x40bd21(0x1b6));
                        _0x39e6b6[_0x40bd21(0x25d)] = 0x2, _0x39e6b6[_0x40bd21(0x1e0)](new Event(_0x40bd21(0x284))), $('#CreateSnmp\x20#snmp-select-ip')['val'](_0x32891b[_0x40bd21(0x23a)]), $(_0x40bd21(0x1dc))[_0x40bd21(0x2c1)](_0x32891b['username']), $(_0x40bd21(0x3cf))[_0x40bd21(0x2c1)](_0x32891b[_0x40bd21(0x2fe)]), !_0x5ccde8 && (setTimeout(function () {
                            var _0x27f805 = _0x40bd21;
                            $(_0x27f805(0x3cb))['val'](_0x32891b['model'])[_0x27f805(0x408)](_0x27f805(0x284));
                        }, 0x3e8), _0x5ccde8 = !![]), $(_0x40bd21(0x1b0))[_0x40bd21(0x2c1)](_0x32891b[_0x40bd21(0x2bd)]), $('#CreateSnmp\x20#auth_password')[_0x40bd21(0x2c1)](_0x32891b[_0x40bd21(0x28c)]), $('#CreateSnmp\x20#Privacy_mtd')[_0x40bd21(0x2c1)](_0x32891b[_0x40bd21(0x3b2)]), $(_0x40bd21(0x30f))[_0x40bd21(0x2c1)](_0x32891b['priv_password']);
                    }
                }
            }));
        });
    } else _0x353323 == _0x1eae85(0x203) || _0x20b384 == 'VM\x22' ? ($(_0x1eae85(0x1bc))[_0x1eae85(0x3c2)](_0x1eae85(0x230), _0x1eae85(0x1eb)), $(_0x1eae85(0x1b9))[_0x1eae85(0x3c2)]('display', 'block')) : ($('#Mgmnt_val')[_0x1eae85(0x3c2)](_0x1eae85(0x230), _0x1eae85(0x1ec)), $(_0x1eae85(0x1b9))[_0x1eae85(0x3c2)]('display', 'block')), $(_0x1eae85(0x1cc))[_0x1eae85(0x3c2)](_0x1eae85(0x230), 'none'), requestDataFromServer(_0x1eae85(0x21f), {
        'ipaddress': _0xb8ec27
    }, _0x1eae85(0x359))['done'](function (_0x33addd) {
        var _0x305b02 = _0x1eae85;
        edmgmt_res = JSON[_0x305b02(0x321)](_0x33addd);
        var _0x1aaafa = JSON[_0x305b02(0x321)](edmgmt_res[_0x305b02(0x1ef)][0x0]['threshold']['replace'](/'/g, '\x22'));
        edmgmt_res[_0x305b02(0x295)] == 0xc8 && edmgmt_res[_0x305b02(0x1ef)] != '' && (edmgmtres_details = edmgmt_res[_0x305b02(0x1ef)], edmgmtres_details[_0x305b02(0x2d5)](function (_0x19ea6f) {
            var _0x36b199 = _0x305b02;
            if (_0x19ea6f[_0x36b199(0x226)] == 'idrac') {
                $(_0x36b199(0x1bc))['css'](_0x36b199(0x2bc), _0x36b199(0x24f));
                const _0x2280c6 = document[_0x36b199(0x2ad)]('mgmts_version');
                _0x2280c6['selectedIndex'] = 0x2, _0x2280c6[_0x36b199(0x1e0)](new Event('change')), $(_0x36b199(0x3ae))[_0x36b199(0x2c1)](_0x19ea6f[_0x36b199(0x278)]);
                var _0x42afe0 = {};
                _0x42afe0[_0x36b199(0x2ed)] = isEdit, _0x42afe0['prototype'] = _0x19ea6f[_0x36b199(0x226)], _0x42afe0[_0x36b199(0x24e)] = '', _0x42afe0[_0x36b199(0x3a3)] = '', _0x42afe0['iloip'] = '', _0x42afe0['port'] = _0x19ea6f[_0x36b199(0x278)], _0x42afe0['threshold'] = '', ilomgmt_list[_0x36b199(0x36d)](_0x42afe0);
            }
            if (_0x19ea6f[_0x36b199(0x226)] == _0x36b199(0x244)) {
                $(_0x36b199(0x1bc))[_0x36b199(0x3c2)]('color', _0x36b199(0x24f));
                const _0x30e6ed = document[_0x36b199(0x2ad)](_0x36b199(0x2a4));
                _0x30e6ed['selectedIndex'] = 0x1, _0x30e6ed[_0x36b199(0x1e0)](new Event(_0x36b199(0x284))), $('#CreateMgmt\x20#user_name')['val'](_0x19ea6f[_0x36b199(0x24e)]), $(_0x36b199(0x2fb))['val'](_0x19ea6f['password']), $(_0x36b199(0x3db))[_0x36b199(0x2c1)](_0x19ea6f['iloip']);
                var _0x42afe0 = {};
                _0x42afe0[_0x36b199(0x2ed)] = isEdit, _0x42afe0[_0x36b199(0x226)] = _0x19ea6f[_0x36b199(0x226)], _0x42afe0['username'] = _0x19ea6f[_0x36b199(0x24e)], _0x42afe0[_0x36b199(0x3a3)] = _0x19ea6f[_0x36b199(0x3a3)], _0x42afe0[_0x36b199(0x33a)] = _0x19ea6f['iloip'], _0x42afe0['port'] = '', _0x42afe0[_0x36b199(0x35d)] = '', ilomgmt_list['push'](_0x42afe0);
            }
            if (_0x19ea6f[_0x36b199(0x226)] == _0x36b199(0x2b0)) {
                $(_0x36b199(0x1b9))['css'](_0x36b199(0x2bc), _0x36b199(0x24f));
                const _0x277374 = document[_0x36b199(0x2ad)](_0x36b199(0x1e4));
                _0x277374['selectedIndex'] = 0x1, _0x277374[_0x36b199(0x1e0)](new Event('change')), $('#CreateNode\x20#port_nodes')[_0x36b199(0x2c1)](_0x19ea6f['port']);
                var _0x42afe0 = {};
                _0x42afe0['isedit'] = isEdit, _0x42afe0[_0x36b199(0x226)] = _0x19ea6f[_0x36b199(0x226)], _0x42afe0['username'] = '', _0x42afe0[_0x36b199(0x3a3)] = '', _0x42afe0[_0x36b199(0x33a)] = '', _0x42afe0[_0x36b199(0x278)] = _0x19ea6f['port'], _0x42afe0[_0x36b199(0x35d)] = _0x1aaafa;
                for (var _0xcfe639 in _0x1aaafa) {
                    if (_0x1aaafa[_0x36b199(0x2b7)](_0xcfe639)) {
                        var _0x3b16d6 = document[_0x36b199(0x2ad)](_0xcfe639);
                        _0x3b16d6 && (_0x3b16d6[_0x36b199(0x3d7)] = _0x1aaafa[_0xcfe639]);
                    }
                }
                nodemgmt_list['push'](_0x42afe0);
            }
        }));
    });
    jsval = _0x5ee9e2['replace'](/['"]+/g, ''), getFileNames(jsval);
    var _0x11e1f9 = _0x1eae85(0x3c4) + jsval + _0x1eae85(0x2a6) + jsval + _0x1eae85(0x2f7);
    $(_0x1eae85(0x219))[_0x1eae85(0x207)](_0x11e1f9);
    if (res[_0x1eae85(0x295)] == 0xc8 & res['data'] != '') {
        getApplicationNames(), getVaultInformation();
        var _0x4e7236 = res[_0x1eae85(0x1ef)];
        if (_0x4e7236[_0x1eae85(0x34f)] > 0x0) {
            var _0x13865e;
            _0x4e7236[_0x1eae85(0x2d5)](function (_0x5649c1) {
                var _0x524810 = _0x1eae85;
                if (_0x5649c1[_0x524810(0x269)] === '') {
                    _0x13865e = _0x5649c1;
                    return;
                }
            });
            var _0x25c666 = JSON[_0x1eae85(0x321)](_0x13865e['json']);
            $(_0x1eae85(0x3e6))[_0x1eae85(0x2c1)](_0x25c666[_0x1eae85(0x38c)])[_0x1eae85(0x284)](), $(_0x1eae85(0x2e4))[_0x1eae85(0x2c1)](_0x25c666[_0x1eae85(0x3bf)])['change'](), $('#nodata')[_0x1eae85(0x331)](), $(_0x1eae85(0x180))[_0x1eae85(0x39a)](), $('.maincontent')[_0x1eae85(0x39a)](), $('#multi-ip-ip')['empty'](), $(_0x1eae85(0x2e4))[_0x1eae85(0x39a)](), $(_0x1eae85(0x3fb))[_0x1eae85(0x327)](_0x1eae85(0x1fb), _0x1eae85(0x29b)), editRespone = _0x4e7236, $(_0x1eae85(0x3e6))[_0x1eae85(0x327)](_0x1eae85(0x25f), _0x1eae85(0x25f));
            var _0x7c5554 = _0x1eae85(0x38a) + _0x25c666[_0x1eae85(0x38c)] + '\x22>',
                _0x4d0832 = '<input\x20type=\x22hidden\x22\x20value=\x22' + _0x25c666[_0x1eae85(0x3bf)] + _0x1eae85(0x2a6) + _0x25c666['COMMON_HOSTNAME'] + _0x1eae85(0x25a);
            $(_0x1eae85(0x1fa))[_0x1eae85(0x331)](), $('#hostdata')['append'](_0x7c5554), $(_0x1eae85(0x2e4))[_0x1eae85(0x207)](_0x4d0832);
        }
    } else res[_0x1eae85(0x295)] == 0xc8 & res[_0x1eae85(0x1ef)] == '' ? swal(_0x1eae85(0x357), '\x20', _0x1eae85(0x181)) : swal(_0x1eae85(0x18c), '\x20', _0x1eae85(0x177));
}

function hostCloseClick(_0x53876c) {
    var _0x3bcd0e = _0x1c480c;
    toBeDeletedHost = !![], deleteBtn = _0x53876c, swal({
        'title': _0x3bcd0e(0x1a7),
        'text': _0x3bcd0e(0x330),
        'type': 'warning',
        'showCancelButton': !![],
        'confirmButtonClass': _0x3bcd0e(0x313),
        'confirmButtonText': _0x3bcd0e(0x294),
        'closeOnConfirm': ![]
    }, function () {
        deleteEntry();
    });
}

function mgmntCloseClick(_0x10dd3a) {
    var _0x384e11 = _0x1c480c;
    toBeDeletedHost = !![], deleteBtn = _0x10dd3a, swal({
        'title': 'Delete\x20Management',
        'text': _0x384e11(0x354),
        'type': _0x384e11(0x181),
        'showCancelButton': !![],
        'confirmButtonClass': _0x384e11(0x313),
        'confirmButtonText': _0x384e11(0x294),
        'closeOnConfirm': ![]
    }, function () {
        mgmtdeleteEntry();
    });
}

function mgmtdeleteEntry() {
    var _0xf07ec5 = _0x1c480c;
    if (toBeDeletedHost) {
        var _0x55e763 = $(deleteBtn)[_0xf07ec5(0x327)](_0xf07ec5(0x3c5)),
            _0x5e3486 = $(deleteBtn)[_0xf07ec5(0x327)]('data-host-ip');
        $(_0xf07ec5(0x382))[_0xf07ec5(0x39a)](), requestDataFromServer(_0xf07ec5(0x315), {
            'prototype': _0x55e763,
            'ipaddress': _0x5e3486,
            'csrfmiddlewaretoken': csfr_token
        }, _0xf07ec5(0x3ac))[_0xf07ec5(0x368)](handledeleteresponse);
    } else {
        var _0x20cbaf = parseInt($(deleteBtn)['attr'](_0xf07ec5(0x1fc))),
            _0x34b3eb = 0x0;
        service_list[_0xf07ec5(0x2d5)](function (_0x4e0d2c) {
            var _0x289950 = _0xf07ec5;
            parseInt(_0x4e0d2c['id']) === _0x20cbaf && service_list[_0x289950(0x1fd)](_0x34b3eb, 0x1), _0x34b3eb++;
        }), $(_0xf07ec5(0x361) + _0x20cbaf)[_0xf07ec5(0x3bc)]();
        if (service_list['length'] == 0x0) $(_0xf07ec5(0x20b))[_0xf07ec5(0x3c2)](_0xf07ec5(0x230), _0xf07ec5(0x1ec));
    }
}

function editService(_0x24a482) {
    var _0x4ee1d0 = _0x1c480c;
    $('#service-selected')['is'](_0x4ee1d0(0x221)) && $('#serviceBtn')[_0x4ee1d0(0x408)]('click'), isServiceEdit = !![], $('#services-dropdown')[_0x4ee1d0(0x2c1)]($(_0x24a482)[_0x4ee1d0(0x327)](_0x4ee1d0(0x1ee)))[_0x4ee1d0(0x284)](), setTimeout(function () {
        var _0x2e7acb = _0x4ee1d0,
            _0x1d370a = parseInt($(_0x24a482)['attr'](_0x2e7acb(0x1fc))),
            _0x1cadd5 = 0x0;
        service_list[_0x2e7acb(0x2d5)](function (_0x41ed0d) {
            var _0x1fa469 = _0x2e7acb;
            if (parseInt(_0x41ed0d['id']) === _0x1d370a) {
                $['each'](_0x41ed0d, function (_0x1f02e4, _0x3f07bf) {
                    var _0x3b5fc1 = _0x53e3,
                        _0x4fd1ed = ![];
                    if (_0x1f02e4[_0x3b5fc1(0x232)]('__') >= 0x0) {
                        var _0x36c105 = _0x1f02e4['split']('__');
                        _0x36c105[0x0] == _0x3b5fc1(0x1de) && _0x3f07bf == 'on' && (_0x4fd1ed = !![], $('#' + _0x1f02e4 + '_' + serviceIdCount)['prop'](_0x3b5fc1(0x275), !![]), $('.' + $('#' + _0x1f02e4 + '_' + serviceIdCount)[_0x3b5fc1(0x327)](_0x3b5fc1(0x21e)))[_0x3b5fc1(0x39a)]());
                    } !_0x4fd1ed && ($('#' + _0x1f02e4 + '_' + serviceIdCount)[_0x3b5fc1(0x2c1)](_0x3f07bf), $('#' + _0x1f02e4 + '_' + serviceIdCount)[_0x3b5fc1(0x2ee)]()[_0x3b5fc1(0x2d8)]('label')[_0x3b5fc1(0x2a9)](_0x3b5fc1(0x2d1)), $('#' + _0x1f02e4 + '_' + serviceIdCount)[_0x3b5fc1(0x2ee)]()[_0x3b5fc1(0x2a9)]('bg_input'));
                }), service_list[_0x1fa469(0x1fd)](_0x1cadd5, 0x1);
                return;
            }
            _0x1cadd5++;
        }), $(_0x2e7acb(0x361) + _0x1d370a)[_0x2e7acb(0x3bc)]();
    }, 0x1f4);
}

function closeClick(_0x1d2933) {
    var _0x20433b = _0x1c480c;
    toBeDeletedHost = ![], deleteBtn = _0x1d2933, swal({
        'title': _0x20433b(0x276),
        'text': 'Want\x20to\x20permanently\x20delete\x20this\x20service?',
        'type': _0x20433b(0x181),
        'showCancelButton': !![],
        'confirmButtonClass': _0x20433b(0x313),
        'confirmButtonText': _0x20433b(0x294),
        'closeOnConfirm': !![]
    }, function () {
        deleteEntry();
    });
}

function handledeleteresponse(_0x2d8031) {
    var _0x211dab = _0x1c480c;
    res = JSON[_0x211dab(0x321)](_0x2d8031);
    if (res['status'] == 0xc8) swal({
        'title': res[_0x211dab(0x1ef)],
        'type': _0x211dab(0x3b3),
        'confirmButtonClass': _0x211dab(0x223),
        'confirmButtonText': 'OK'
    }, function (_0xe2b8c) {
        var _0x95e4a8 = _0x211dab;
        _0xe2b8c && location[_0x95e4a8(0x374)]();
    });
    else swal(res[_0x211dab(0x1ef)], '\x20', _0x211dab(0x177));
}

function deleteEntry() {
    var _0x42d080 = _0x1c480c;
    if (toBeDeletedHost) {
        var _0x9f347b = $(deleteBtn)['attr']('data-host-name'),
            _0x3c8f65 = $(deleteBtn)[_0x42d080(0x327)]('data-host-ip');
        $(_0x42d080(0x382))['show'](), requestDataFromServer(_0x42d080(0x324), {
            'hostname': _0x9f347b,
            'ipaddress': _0x3c8f65,
            'csrfmiddlewaretoken': csfr_token
        }, _0x42d080(0x3ac))[_0x42d080(0x368)](handledeleteresponse);
    } else {
        var _0x113abd = parseInt($(deleteBtn)['attr'](_0x42d080(0x1fc))),
            _0x523eef = 0x0;
        service_list[_0x42d080(0x2d5)](function (_0x16cc1a) {
            var _0x1a7870 = _0x42d080;
            parseInt(_0x16cc1a['id']) === _0x113abd && service_list[_0x1a7870(0x1fd)](_0x523eef, 0x1), _0x523eef++;
        }), $(_0x42d080(0x361) + _0x113abd)['remove']();
        if (service_list['length'] == 0x0) $(_0x42d080(0x20b))['css']('display', 'block');
    }
}

function sendiloDataToServer() {
    var _0x177eec = _0x1c480c,
        _0x2bf422 = validatesInputs(_0x177eec(0x37e));
    ilomgmt_list = [];
    if (_0x2bf422 == !![]) {
        var _0x448548 = {};
        _0x448548['isedit'] = isEdit, _0x448548[_0x177eec(0x226)] = $('#CreateMgmt\x20#mgmts_version')[_0x177eec(0x2c1)](), _0x448548[_0x177eec(0x24e)] = $(_0x177eec(0x224))[_0x177eec(0x2c1)](), _0x448548[_0x177eec(0x3a3)] = $(_0x177eec(0x2fb))['val'](), _0x448548[_0x177eec(0x33a)] = $(_0x177eec(0x3db))['val'](), _0x448548[_0x177eec(0x278)] = '', _0x448548[_0x177eec(0x35d)] = '', ilomgmt_list['push'](_0x448548), $('#mgmtModal\x20#ilo_save')['attr'](_0x177eec(0x3f4), _0x177eec(0x27d));
    } else swal(_0x177eec(0x1f0), '\x20', 'error');
}

function sendidracDataToServer() {
    var _0x2abec3 = _0x1c480c,
        _0x18631f = validateingInputs(_0x2abec3(0x37e));
    ilomgmt_list = [];
    if (_0x18631f == !![]) {
        var _0x40d7b4 = {};
        _0x40d7b4[_0x2abec3(0x2ed)] = isEdit, _0x40d7b4['prototype'] = $('#CreateMgmt\x20#mgmts_version')['val'](), _0x40d7b4[_0x2abec3(0x24e)] = '', _0x40d7b4[_0x2abec3(0x3a3)] = '', _0x40d7b4[_0x2abec3(0x33a)] = '', _0x40d7b4['port'] = $(_0x2abec3(0x3ae))['val'](), _0x40d7b4[_0x2abec3(0x35d)] = '', ilomgmt_list[_0x2abec3(0x36d)](_0x40d7b4), $('#mgmtModal\x20#idrac_save')['attr'](_0x2abec3(0x3f4), _0x2abec3(0x27d));
    } else swal(_0x2abec3(0x3df), '\x20', 'error');
}

function sendnodeDataToServer() {
    var _0x353d71 = _0x1c480c,
        _0x423cec = validateInputing(_0x353d71(0x3c0));
    nodemgmt_list = [];
    var _0x46f74c = {
        'disk_w': parseFloat($(_0x353d71(0x23c))[_0x353d71(0x2c1)]()),
        'disk_c': parseFloat($(_0x353d71(0x3d4))[_0x353d71(0x2c1)]()),
        'disk_t': parseInt($(_0x353d71(0x3b5))[_0x353d71(0x2c1)]()),
        'cpu_w': parseFloat($(_0x353d71(0x1d1))[_0x353d71(0x2c1)]()),
        'cpu_c': parseFloat($('#cpu_c')[_0x353d71(0x2c1)]()),
        'cpu_t': parseInt($(_0x353d71(0x237))[_0x353d71(0x2c1)]()),
        'mem_w': parseFloat($('#mem_w')[_0x353d71(0x2c1)]()),
        'mem_c': parseFloat($(_0x353d71(0x2f5))[_0x353d71(0x2c1)]()),
        'mem_t': parseInt($('#mem_t')['val']()),
        'load_w': parseFloat($('#load_w')['val']()),
        'load_c': parseFloat($(_0x353d71(0x18a))[_0x353d71(0x2c1)]()),
        'load_t': parseInt($(_0x353d71(0x395))[_0x353d71(0x2c1)]()),
        'uptime_w': parseFloat($(_0x353d71(0x1c4))['val']()),
        'uptime_c': parseFloat($(_0x353d71(0x351))[_0x353d71(0x2c1)]()),
        'uptime_t': parseInt($(_0x353d71(0x29a))[_0x353d71(0x2c1)]()),
        'login_w': parseFloat($('#login_w')[_0x353d71(0x2c1)]()),
        'login_c': parseFloat($(_0x353d71(0x173))[_0x353d71(0x2c1)]()),
        'login_t': parseInt($(_0x353d71(0x197))[_0x353d71(0x2c1)]())
    };
    if (_0x423cec == !![]) {
        var _0x366edd = {};
        _0x366edd['isedit'] = isEdit, _0x366edd[_0x353d71(0x226)] = $(_0x353d71(0x2dd))['val'](), _0x366edd[_0x353d71(0x24e)] = '', _0x366edd[_0x353d71(0x3a3)] = '', _0x366edd[_0x353d71(0x33a)] = '', _0x366edd[_0x353d71(0x278)] = $(_0x353d71(0x1c5))[_0x353d71(0x2c1)](), _0x366edd[_0x353d71(0x35d)] = _0x46f74c, nodemgmt_list[_0x353d71(0x36d)](_0x366edd), $(_0x353d71(0x3eb))[_0x353d71(0x327)]('data-dismiss', _0x353d71(0x27d));
    } else swal(_0x353d71(0x2a2), '\x20', _0x353d71(0x177));
}

function sendFormDataToServer() {
    var _0x29497f = _0x1c480c;
    if (checkIfFieldIsEmpty(_0x29497f(0x3ef))) return;
    var _0x4a6c4f = $(_0x29497f(0x196))['val']();
    if ($(_0x29497f(0x1fe))['val']() === null) {
        alert(_0x29497f(0x289));
        return;
    }
    if ($(_0x29497f(0x255))['val']() === null) {
        alert(_0x29497f(0x3f9));
        return;
    }
    if ($(_0x29497f(0x1ce))[_0x29497f(0x2c1)]() === null) {
        alert(_0x29497f(0x2fa));
        return;
    }
    if (document['getElementById']('BOOL__REUSABLE_AUTOMATION')[_0x29497f(0x275)]) {
        if ($('#REUSABLE_AUTOMATION__REUSABLE_VAULT')['val']() === null) {
            alert(_0x29497f(0x381));
            return;
        }
    }
    if ($(_0x29497f(0x1ae))['is'](_0x29497f(0x221))) {
        alert('Submit\x20services\x20before\x20saving.');
        return;
    }
    $(_0x29497f(0x20d))[_0x29497f(0x331)](), $('.loader')[_0x29497f(0x39a)]();
    var _0x4e132b = $(_0x29497f(0x2cf))[_0x29497f(0x2db)](),
        _0x4e3d6c = {};
    _0x4e132b[_0x29497f(0x2d5)](function (_0x45699a) {
        var _0x43ffc3 = _0x29497f;
        _0x4e3d6c[_0x45699a[_0x43ffc3(0x231)]] = _0x45699a[_0x43ffc3(0x3d7)];
    });
    var _0x2a53bf = {};
    _0x2a53bf[_0x29497f(0x2ed)] = isEdit, _0x2a53bf[_0x29497f(0x2e8)] = _0x4e3d6c, _0x2a53bf[_0x29497f(0x2c5)] = service_list, _0x2a53bf[_0x29497f(0x3a8)] = ilomgmt_list, _0x2a53bf['nodemgmt'] = nodemgmt_list, _0x2a53bf[_0x29497f(0x34e)] = _0x4a6c4f, _0x2a53bf[_0x29497f(0x270)] = $(_0x29497f(0x18b))[_0x29497f(0x2c1)](), _0x2a53bf[_0x29497f(0x199)] = $(_0x29497f(0x25b))[_0x29497f(0x2c1)](), _0x2a53bf[_0x29497f(0x1d2)] = $(_0x29497f(0x2ce))[_0x29497f(0x2c1)](), _0x2a53bf[_0x29497f(0x1dd)] = $(_0x29497f(0x20e))[_0x29497f(0x2c1)](), _0x2a53bf['pathhost'] = $(_0x29497f(0x2e0))[_0x29497f(0x2c1)](), _0x2a53bf[_0x29497f(0x3fe)] == 'VM' ? _0x2a53bf[_0x29497f(0x26b)] = $('#CreateServer\x20#PHYSICAL_IP')[_0x29497f(0x2c1)]() : _0x2a53bf['phyipaddress'] = '', console['log'](_0x29497f(0x18d) + JSON[_0x29497f(0x2b2)](_0x2a53bf)), $(_0x29497f(0x2a7))[_0x29497f(0x327)](_0x29497f(0x3f4), _0x29497f(0x27d)), requestDataFromServer(_0x29497f(0x3d2), {
        'data': JSON[_0x29497f(0x2b2)](_0x2a53bf),
        'csrfmiddlewaretoken': csfr_token
    }, _0x29497f(0x3ac))[_0x29497f(0x368)](handleFileCreationResponse);
}
let exportonbdata = () => {
    var _0x2fb8ff = _0x1c480c;
    requestDataFromServer(_0x2fb8ff(0x3d9), {
        'csrfmiddlewaretoken': csfr_token
    }, _0x2fb8ff(0x359))[_0x2fb8ff(0x368)](function (_0x335a60) {
        var _0x1c59d0 = _0x2fb8ff;
        const _0xddb8bb = JSON[_0x1c59d0(0x321)](_0x335a60)[_0x1c59d0(0x1ef)];
        _0xddb8bb[_0x1c59d0(0x2d5)](_0x51e8bf => {
            var _0x8a6da1 = _0x1c59d0;
            const {
                id: _0x4ef424,
                ..._0x26f73c
            } = _0x51e8bf, _0x69892d = Object[_0x8a6da1(0x2ac)](_0x26f73c)['map'](([_0x5e5278, _0x16cc9a]) => _0x5e5278 + ':' + (_0x16cc9a || ''))[_0x8a6da1(0x268)]('\x0a'), _0x42a6e2 = _0x51e8bf[_0x8a6da1(0x23a)] + _0x8a6da1(0x2a0), _0x2936a1 = new Blob([_0x69892d], {
                'type': 'text/plain'
            }), _0x56e56c = document[_0x8a6da1(0x2ef)]('a');
            _0x56e56c[_0x8a6da1(0x253)] = _0x42a6e2, window['webkitURL'] != null ? _0x56e56c[_0x8a6da1(0x186)] = window['webkitURL'][_0x8a6da1(0x2c6)](_0x2936a1) : (_0x56e56c['href'] = window['URL']['createObjectURL'](_0x2936a1), _0x56e56c['style'][_0x8a6da1(0x230)] = _0x8a6da1(0x1eb), document[_0x8a6da1(0x35a)][_0x8a6da1(0x277)](_0x56e56c)), _0x56e56c['click']();
        });
    });
};

function handleFileUpload(_0x48e4a1) {
    var _0x15f93c = _0x1c480c;
    const _0x189df4 = _0x48e4a1[_0x15f93c(0x3d1)][_0x15f93c(0x1f1)][0x0],
        _0x5d44db = new FileReader();
    _0x5d44db[_0x15f93c(0x3ec)] = function (_0x410e80) {
        var _0x2bbf8f = _0x15f93c;
        const _0x4dddc1 = _0x410e80[_0x2bbf8f(0x3d1)][_0x2bbf8f(0x2bb)],
            _0x2c899e = parseFileContent(_0x4dddc1);
        populateFormFields(_0x2c899e);
    }, _0x5d44db[_0x15f93c(0x367)](_0x189df4);
}

function parseFileContent(_0x2e84fc) {
    var _0x170799 = _0x1c480c;
    const _0x3249c0 = _0x2e84fc['split']('\x0a'),
        _0x3d2f36 = {};
    return _0x3249c0[_0x170799(0x2d5)](_0x4af474 => {
        var _0x56998d = _0x170799;
        const [_0x3d3450, _0x6efeb0] = _0x4af474[_0x56998d(0x39e)](':');
        _0x3d2f36[_0x3d3450] = _0x6efeb0[_0x56998d(0x3b4)]();
    }), _0x3d2f36;
}

function populateFormFields(_0xe320cc) {
    var _0x3ab090 = _0x1c480c;
    console['log'](_0x3ab090(0x2bf) + JSON[_0x3ab090(0x2b2)](_0xe320cc));
    var _0x59ba5f = document[_0x3ab090(0x2ad)]('hosts-dropdown');
    _0x59ba5f[_0x3ab090(0x3d7)] = _0xe320cc[_0x3ab090(0x270)] || '';
    var _0x55549e = new Event(_0x3ab090(0x284), {
        'bubbles': !![]
    });
    _0x59ba5f[_0x3ab090(0x1e0)](_0x55549e), setTimeout(function () {
        var _0x5cc672 = _0x3ab090;
        $(_0x5cc672(0x25b))[_0x5cc672(0x2c1)](_0xe320cc[_0x5cc672(0x199)] || ''), $(_0x5cc672(0x2ce))[_0x5cc672(0x2c1)](_0xe320cc[_0x5cc672(0x1d2)] || ''), document[_0x5cc672(0x2ad)](_0x5cc672(0x20f))['value'] = _0xe320cc[_0x5cc672(0x269)] || _0x5cc672(0x1b8), $(_0x5cc672(0x20e))[_0x5cc672(0x2c1)](_0xe320cc[_0x5cc672(0x1dd)] || ''), document['getElementById'](_0x5cc672(0x2cd))[_0x5cc672(0x3d7)] = _0xe320cc['pathhost'] || '', $(_0x5cc672(0x23f))[_0x5cc672(0x2c1)](_0xe320cc[_0x5cc672(0x247)] || ''), $(_0x5cc672(0x196))['val'](_0xe320cc['ipaddress'] || '');
    }, 0x1f4);
}

function handleFileCreationResponse(_0x273b61) {
    var _0x5f395d = _0x1c480c;
    res = JSON[_0x5f395d(0x321)](_0x273b61), $('.loader')[_0x5f395d(0x331)]();
    if (res[_0x5f395d(0x295)] == 0xc8) swal({
        'title': res['data'],
        'type': _0x5f395d(0x3b3),
        'confirmButtonClass': _0x5f395d(0x223),
        'confirmButtonText': 'OK'
    }, function (_0x59dbf9) {
        var _0x2f83b9 = _0x5f395d;
        _0x59dbf9 && parent[_0x2f83b9(0x3d3)][_0x2f83b9(0x2a3)][_0x2f83b9(0x374)](!![]);
    });
    else swal(res['data'], '\x20', 'error');
}

function _0x93b7() {
    var _0x5dc561 = ['Not\x20able\x20to\x20fetch\x20data', 'children', 'GET', 'body', '\x22style=\x22color:white;font-size:\x2020px;\x20padding-left:7%\x20!important;\x22></i>', 'totalswitch', 'threshold', '\x22\x20data-host-name=\x22', 'Service', '\x22\x20class=\x22lightgray-text\x20text-lowercase\x22>', '#reg-service-', 'create\x20', '.hide-val', 'disk_c', 'txt\x22\x20style=\x22background-color:\x20#1f1f1f;color:\x20#878787;\x20border:\x201px\x20solid\x20#e58e22\x22\x20disabled\x20/>', '#CreateSnmp\x20#comm_string', 'readAsText', 'done', '/useronboard/getuserlist', '<a\x20href=\x22#hard\x20servers\x22\x20class=\x22detail-link\x20warning\x20size10\x20view\x22>View</a>', '\x22\x20value=\x22', '<div\x20class=\x22col-10\x20p-0\x22>', 'push', '#multi-select-site', 'includes', '#ilo_ip', '<option\x20disabled\x20selected>Select\x20Secret</option>', 'label', 'textContent', 'reload', '#port_ips', 'Not\x20able\x20to\x20scan', 'server-row', 'Fortigate\x20100E', '<div\x20class=\x22col-1\x22>', '#CreateServer\x20#servicessoft-dropdown', 'toggle', 'comm_string', 'selected', 'mgnt_input', '#servicedata', 'Enter\x20ILO\x20IP', 'Choose\x20Secret.', '.loader', 'Failure\x20in\x20getting\x20all\x20content', 'BOOL__REUSABLE_AUTOMATION_', 'display:block\x20!important', 'setAttribute', '#morenicModal', 'mem_t', 'Gateway\x20Switch', '<input\x20type=\x22hidden\x22\x20name=\x22HOST_TEMPLATE\x22\x20\x20value=\x22', 'Not\x20able\x20to\x20add\x20secret', 'HOST_TEMPLATE', 'vtxt\x22\x20style=\x22background-color:\x20#1f1f1f;color:\x20#878787;\x20border:\x201px\x20solid\x20#e58e22\x22\x20disabled\x20/>', 'Enter\x20User\x20Name', 'bg_input', '</tr>', '#pswitch-heading', '-div\x22\x20', '\x27)\x22></i><i\x20class=\x22mdi\x20mdi-close\x20icon-clsbtn\x22\x20id=\x22icon-close\x22\x20onclick=\x22closesearchbar(\x27', '#addbtn', '#load_t', 'Fortigate60E', '../vault/getallsecrets', '#error-application', '#multipleIPAddressSelect', 'show', '\x22\x20name=\x22', 'cpu_t', '<table\x20class=\x22table\x22\x20id=\x22table-fields\x22\x20style=\x22display:none;\x22>', 'split', '<i\x20class=\x22mdi\x20mdi-download\x22\x20onclick=\x22exportone(this)\x22\x20data-ipaddress-name=\x22', '#switag', '<div\x20class=\x22col-10\x22>', '#REUSABLE_AUTOMATION__REUSABLE_VAULT\x20option[value=\x27', 'password', 'idrac', '<div\x20class=\x22mdi\x20mdi-server-network\x20display-4\x20text-success\x20icon-size-increase\x22></div>', '#Mgmnt_btn', '\x20Switch', 'mgmnt', '<div\x20class=\x22col-lg-3\x20col-4\x20my-auto\x22>', '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#ff0000;\x22>Failure\x20in\x20Validation...</p>', 'Firewalltype', 'POST', 'load_w', '#CreateMgmt\x20#port_ips', '<p\x20class=\x22mb-0\x20text-color\x22\x20style=\x22font-size:12px;\x22><b>Application\x20:</b>\x20', '<i\x20class=\x22mdi\x20mdi-close\x22\x20onclick=\x22hostCloseClick(this)\x22\x20data-host-ip=\x22', 'load_c', 'priv_method', 'success', 'trim', '#disk_t', '<p\x20class=\x22bold-text\x20tooltip\x20mb-0\x20text-color\x20\x22><img\x20class=\x22imaged\x22\x20src=\x22/static/images/robot-icon-1.png\x22\x20style=\x22width:\x2022px\x20!important;\x20float:left;margin-left:\x207px;\x22/><span\x20class=\x22tooltiptext\x22>Automation\x20Enabled</span></p>', '<option\x20selected\x20value=\x22', 'CUSTOM_SERVICENAME', 'style=display:none;', 'style=display:block;', 'edithostdetails', 'remove', '#service-form-div', '<div\x20class=\x22icon-let\x22>', 'COMMON_HOSTNAME', 'node_input', 'totalServers', 'css', 'Server\x27s\x20type\x20not\x20Added,\x20Please\x20check\x20Administrator', '<option\x20type=\x22\x22\x20name=\x22PATH_TEMPLATE\x22\x20value=\x22', 'data-host-name', 'multipleSelect', '<div\x20class=\x22col-1\x22></div>', '</h6>', '\x22\x20style=\x22color:white;font-size:\x2020px;\x20padding-left:18%\x20!important;\x22></i>', 'port-node-label', '#CreateSnmp\x20#snmp_models', 'pass_word', 'click', '#REUSABLE_AUTOMATION__REUSABLE_VAULT', '#CreateSnmp\x20#security_level', '<div\x20class=\x22select-service\x22>', 'target', 'createcfg', 'window', '#disk_c', '<legend>', 'layers', 'value', 'Public\x20Switch', 'newonbtable', 'FRNDLY_NAME', '#CreateMgmt\x20#ilo_ip', 'disk_t', '\x22\x20data-attribute=\x22', '/dashboard/snmpnewtable', 'idrac\x20Not\x20able\x20added', 'port_ips', '<br>', '\x22>&nbsp;', 'ilo-label', 'nic', 'username-label', '#hosts-dropdown', '<div\x20class=\x22col-lg-2\x20col-md-3\x20col-6\x20each-card\x20each-card-service\x20mr-2\x20primary-low\x22\x20id=\x22reg-service-', '<div\x20class=\x22col-2\x22></div>', '#service-data-ip', '<span\x20class=\x22error-msg\x22\x20id=\x22ilo-error-msg\x22>\x20</span>', '#nodeModal\x20#node_save', 'onload', 'applicationname', '<input\x20type=\x22text\x22\x20id=\x22', 'Host', '\x22\x20autocomplete=\x22off\x22\x20data-template=\x22', 'data-attribute', '#services-dropdown', '<br\x20/>', 'data-dismiss', 'Switcheslayer', 'checkAll', '#configpath', '#error-message', 'Choose\x20Application.', 'addrArr', '#ip-data-ip', '\x22\x20data-host-ip=\x22', 'msg', 'pathhost', '<option\x20value=\x22\x22\x20selected\x20disabled>IP\x20Address</option>', '<label\x20for=\x22port_ip\x22\x20id=\x22port-label\x22>IDRAC\x20Port</label>', 'NICS_LIST', 'Fortigate100F', '\x27,\x27', 'type', '#CreateMgmt\x20#mgmts_version', '#EmailLists', 'Switch', 'trigger', 'mem_c', '<p\x20class=\x22bold-text\x20mb-0\x20text-color\x22>\x20', 'g_swi', 'sitename', 'innerHTML', 'ready', 'Secret\x20added\x20sucessfully', '#gswitch-heading', 'Fortigate', '#login_c', '<div\x20class=\x22col-6\x22>', 'Mgmnt_val', '<span\x20class=\x22error-msg\x22\x20id=\x22password-error-msg\x22>\x20</span>', 'error', '#EmailList', 'Fortigate\x20100F', '#dialog-for-addsecret\x20#password', '#fswi', 'host_name', '/applications/applicationactions', '<input\x20type=\x22number\x22\x20class=\x22form-control\x20mgnt_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20IDRAC\x20Port\x22\x20value=\x229137\x22\x20required=\x22\x22\x20id=\x22port_ips\x22\x20autocomplete=\x22off\x22>', '8804070eGVVSD', '#hostcontent', 'warning', '.service-input', 'port-label', 'Fortigate200F', '<span\x20class=\x22text\x22>', 'href', '204956Wyvdqf', 'uptime_c', '<i\x20class=\x22mdi\x20mdi-close-octagon-outline\x22\x20onclick=\x22onDeleteSnmp(this)\x22\x20data-id=\x22', '#load_c', '#CreateServer\x20#hosts-dropdown', 'Not\x20able\x20to\x20edit\x20host', 'sendFormDataToServer====//====>', '.j2', '\x22\x20data-template=\x22', '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#CreateServer\x22></i><br\x20/><br\x20/>', '#applicationname', 'threshold-icon', 'application', '\x27)\x22\x20style=\x22font-size:\x2019px;color:#e99123\x22></i></div>', '<input\x20class=\x22aliasname\x22\x20type=\x22text\x22\x20name=\x22', '#CreateServer\x20#multi-select-ip', '#login_t', '<input\x20type=\x22password\x22\x20class=\x22form-control\x20mgnt_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20PassWord\x22\x20required=\x22\x22\x20id=\x22pass_word\x22\x20autocomplete=\x22new-password\x22>', 'servertype', 'ilo_ip', 'insertAdjacentHTML', '16207990DgrfJe', '#serviceList', '../hsonboard/gethsconfig', 'contact_email', 'Fortigate80F', 'cpu_w', '<div\x20class=\x22\x22\x20id=\x22valids_row\x22></div>', '<option\x20style=\x22color:\x20#ffffff\x20!important;\x20font-size:\x200.875rem;\x22\x20value=\x22', 'Physical', '</fieldset>&ensp;&ensp;', 'text', 'Delete\x20Host', '/vault/vaultOperation', 'Please\x20fill\x20all\x20feilds', '#gswi', '#pswi', '<i\x20class=\x22mdi\x20mdi-pen\x22\x20onclick=\x22editHost(this)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#CreateServer\x22\x20data-ipaddress=\x22', '136xdJULa', '#service-selected', 'getfilenames', '#CreateSnmp\x20#Authentication_mtd', 'text/plain', 'ExchangeSwitch', 'focusout', '\x22\x20data-target=\x22#CreateServer\x22\x20data-ipaddress=\x22', 'Saveonboard', 'snmp_version', 'Failure\x20in\x20getallapplicationnames\x20', 'Select\x20service', '#Node_val', '<p\x20class=\x22size12\x20d-md-block\x20d-none\x20mb-md-0\x22\x20style=\x22font-size:10px;\x22>Switchs\x20Available</p>', 'Create\x20', '#Mgmnt_val', '<div\x20class=\x22row\x22\x20id=\x22firwallsearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag', 'user_id', '.maincontent', '<div\x20class=\x22\x22>', '</option>', '\x22\x20onclick=\x22Niccards(this,\x20\x27', '#port_nodes', '#uptime_w', '#CreateNode\x20#port_nodes', '.multiip', '<div\x20class=\x22row\x20eachrow\x22>', 'username-error-msg', '<span\x20class=\x22error-msg\x22\x20id=\x22idrac-error-msg\x22>\x20</span>', '<option\x20disabled\x20selected>Select\x20Application</option>', 'service-input\x20', '#snmp_val', 'Field\x20cannot\x20be\x20empty', '#REUSABLE_EMAIL', '<div\x20class=\x22form-group\x20m-0\x20w-50\x20password-group\x20px-md-4\x20px-1\x20mt-3\x20', '\x22\x20style=\x22padding:0px;\x20background:transparent;\x22><i\x20class=\x22mdi\x20mdi-close\x22\x20style=\x22color:white;\x22></i></button>', '#cpu_w', 'emailid', '\x22\x20style=\x22color:white;\x22></i>&ensp;', '<p\x20class=\x22mb-0\x20text-color\x22\x20style=\x22font-size:12px;\x22><b>Name\x20:</b>\x20', '<p\x20class=\x22primary-text\x20bold-text\x20size18\x20mb-1\x22\x20id=\x22', 'flex', 'Firewall\x27s\x20type\x20not\x20Added,\x20Please\x20check\x20Administrator', 'url', '<i\x20class=\x22mdi\x20mdi-alpha-n-box-outline\x20icon-val\x22\x20style=\x22color:#55a8fd;\x22></i>', '#servertypelist', 'fswitch-heading', '#CreateSnmp\x20#user_name', 'textname', 'BOOL', 'exchangesearch-row', 'dispatchEvent', 'Fortigate\x20200F', 'firwallsearch-row', '<div\x20class=\x22w-50\x20my-3\x20px-md-4\x20px-2\x20pt-3\x20', 'node_version', 'disable', 'focus', 'version', 'Enter\x20PassWord', '<td>Critical</td>', 'port_nodes', 'none', 'block', '<div\x20class=\x22form-group\x20m-0\x20px-md-4\x20px-1\x22>', 'data-template', 'data', 'ilo\x20Not\x20able\x20added', 'files', 'Fortigate\x2050E', '<th>Units</th>', '#errormessage-username', '\x20Added</p>&ensp;&ensp;', '<div\x20class=\x22col-12\x22>', '\x20disabled\x22>&nbsp;', 'first', '<i\x20class=\x22mdi\x20mdi-alpha-m-box-outline\x20icon-val\x22\x20style=\x22color:#55a8fd;\x22></i>', '#spabid', 'style', 'data-id', 'splice', '#multi-select-ip', 'classList', '<button\x20class=\x22btn\x20float-right\x22\x20type=\x22button\x22\x20onclick=\x22closeClick(this)\x22\x20data-id=\x22', 'Edit\x20', 'login_c', 'VM\x22', 'idrac_save', 'priv_password', 'SERVICE_TEMPLATE', 'append', '<p\x20class=\x22size12\x20d-md-block\x20d-none\x20mb-md-0\x22\x20style=\x22font-size:10px;\x22>Servers\x20Available</p>', 'uptime_w', 'uptime_t', '#registered-service-no-data', 'reusable-class-', '#save', '#CreateServer\x20#FRNDLY_NAME', 'services-dropdown', 'onclick', '<p\x20class=\x22mb-0\x20text-color\x22\x20style=\x22font-size:12px;\x22><b>E-Mail\x20:</b>\x20', 'redirectToEditRegisteredHostsPage', '#eswi', 'parentNode', '#CreateSnmp\x20#auth_password', '#host-form-div', 'show.bs.modal', 'Data\x20not\x20found\x20for\x20IP\x20address:\x20', '#path-dropdown', '#services-select-div', '<td>Time</td>', '<option\x20disabled>Choose\x20IP</option>', '#REUSABLE_AUTOMATION__REUSABLE_VAULT_0', 'data-to-hide', 'getmgmntdata', 's_hw', ':visible', 'log', 'btn-success', '#CreateMgmt\x20#user_name', 'prop', 'prototype', 'Add', 'address', '<h6>', 'Node-error-msg', '\x22\x20style=\x22color:red;\x20float:right\x22></i>', 'p_swi', 'mdi-eye-outline', 'You\x20have\x20entered\x20an\x20invalid\x20IP\x20address!', 'gethostservicedata', 'display', 'name', 'indexOf', '#nodetype', '\x27)\x22\x20style=\x22position:\x20inherit;font-size:18px;\x22></i></button></div></div></div><div\x20class=\x22col-2\x22\x20text-right></div></div>', '<div\x20class=\x22col-12\x20my-4\x20password-group\x22>', '<div\x20class=\x22row\x22\x20id=\x22\x22>', '#cpu_t', '#nohost', 'totalFirewall', 'ipaddress', '<i\x20class=\x22mdi\x20mdi-reload\x20io-con\x22\x20id=\x22threshold-icon\x22\x20onclick=\x22resetInputValues()\x22\x20style=\x22color:#e99123;display:none;\x22></i>', '#disk_w', 'PHYSICAL_IP', 'Serverssoftware', '#CreateServer\x20#PHYSICAL_IP', '243537RJghok', '\x22\x20id=\x22no-lens', '\x22\x20id=\x22', '\x20Server', 'ilo', '\x22\x20style=\x22margin-bottom:0;border:\x201px\x20solid\x20#fff;\x20width:330px\x20!important\x22>', '#ff9eac', 'physical_ip', '#nodata', 'scrolls', 'hoststitle', '</span>', '13853bLuiYV', 'map', 'username', '#55a8fd', 'snmp_val', '.aliasname', '<option\x20selected\x20disabled>Select\x20service</option>', 'download', 'password-error-msg', '#GLOBAL_APPLICATION', '<input\x20type=\x22hidden\x22\x20value=\x22', 'login_t', 'txt', '<div\x20class=\x22modal-footer\x20mx-auto\x20col-md-11\x20col-12\x22>', '</input\x20>', '#CreateServer\x20#GLOBAL_APPLICATION', '21DAEhZP', 'selectedIndex', '<td>sec</td>', 'disabled', 'select2', 'model', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>GATEWAY\x20-\x20SWITCH<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>', '#dialog-for-iframe', '\x22\x20class=\x22form-control\x20input_effect\x20inputvalidation\x20', 'sendiloDataToServer()', '<input\x20type=\x22number\x22\x20step=\x22any\x22\x20class=\x22form-control\x22\x20id=\x22', 'ilo-error-msg', 'join', 'servicename', 'toggleClass', 'phyipaddress', '#ip-dropdown', 'pop', 'getElementsByClassName', 'innerText', 'selecthost', '/allonboard/nodeexpvalidation', '<span\x20class=\x22d-block\x22\x20style=\x22font-size:10px;\x22>\x20', '<div\x20class=\x22col-2\x20p-0\x20mt-1\x20text-right\x22>', '<input\x20type=\x22text\x22\x20class=\x22form-control\x20mgnt_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20ILO\x20IP\x22\x20required=\x22\x22\x20id=\x22ilo_ip\x22\x20autocomplete=\x22off\x22>', 'checked', 'Delete\x20Service', 'appendChild', 'port', 'Ser', '<select\x20class=\x22custom-select\x20select-input\x20px-2\x22\x20id=\x22', '<i\x20class=\x22mdi\x20mdi-plus\x20mobile\x22\x20onclick=\x22firewallFunction(\x27', 'REUSABLE_EMAIL', 'modal', 'replaceAll', '#single-select-ip', '#GLOBAL_APPLICATIONS', '<div\x20class=\x22\x22\x20id=\x22valid_row\x22></div>', 'DIRECT', 'sendnodeDataToServer()', 'change', 'software', '<span\x20class=\x22input_box\x22>', '\x22\x20aria-label=\x22Search\x22><div\x20class=\x22input-group-append\x22><button\x20class=\x22btn\x20btn-outline-secondary\x20button-clr\x20size12\x22\x20type=\x22button\x22><i\x20class=\x22mdi\x20mdi-magnify\x20icon-btnclr\x22\x20id=\x22icon-search\x22\x20style=\x22position:\x20inherit;font-size:18px;\x22\x20id=\x22i_\x22\x20onclick=\x22swapDivgonb(this,\x27', '<div\x20class=\x22card\x20addcard\x22\x20style=\x22border:\x201px\x20solid\x20aliceblue\x22>', 'Choose\x20atleast\x20one\x20ip\x20address\x20to\x20create\x20host.', 'cpu_c', '#CreateSnmp\x20#snmp-select-ip', 'auth_password', '#icons_change', 'COMMON', '\x22\x20onclick=\x22\x22\x20style=\x22display:block;\x22\x20/>', '</div\x20>', 'gatewaysearch-row', '<input\x20class=\x22form-check-input\x22\x20type=\x22checkbox\x22\x20id=\x22', '#dialog-for-addsecret\x20#serviceList', 'Yes,\x20delete', 'status', '#sitetemplate\x20#data\x20tbody', '<label\x20class=\x22switch\x20position-relative\x22>', 'getserverstype', '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#00ff00;\x22>Success\x20in\x20Validation...</p>', '#uptime_t', 'display:none\x20!important', '<option\x20selected\x20disabled>Select\x20host</option>', '.add', '#GLOBAL_APPLICATION\x20option[value=', 'table', '.txt', '/allonboard/getfilecontentdata', 'NodeExpo\x20Not\x20able\x20added', 'location', 'mgmts_version', '\x22\x20onclick=\x22displaysearchbar(\x27', '\x22>\x20', '#CreateServer\x20#save', '<div\x20class=\x22col-5\x22>', 'addClass', '<p\x20class=\x22bold-text\x20mb-0\x20text-color\x22\x20style=\x22font-size:\x2012px;\x22>\x20', 'threshold-fields', 'entries', 'getElementById', 'IP\x20Address', 'Fortigate50E', 'Node\x20Expo', '</label>', 'stringify', '#registered-service-div', 'node_save', '#dialog-for-hsdiscover', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>EXCHANGE\x20-\x20SWITCH<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>', 'hasOwnProperty', '<div\x20class=\x22\x22\x20id=\x22valid_rows\x22></div>', 'insertBefore', 'types', 'result', 'color', 'auth_method', '<th>Abbreviation</th>', 'Form\x20data:------->', '1825290MlgWmG', 'val', 'empty', '<div\x20class=\x22col-8\x22\x20style=\x22margin-top:2%;margin-left:2%;\x22>', 'vtxt', 'service', 'createObjectURL', '<i\x20class=\x22mdi\x20mdi-close-octagon-outline\x22\x20onclick=\x22mgmntCloseClick(this)\x22\x20data-host-ip=\x22', '#mgmts_version', '<tr\x20class=\x22small-row\x22>', '<td>t</td>', '<div\x20class=\x22row\x22\x20style=\x22display:flex\x22>', '<p\x20class=\x22bold-text\x20tooltip\x20mb-0\x20text-color\x20\x22><img\x20class=\x22imageing\x22\x20src=\x22/static/images/robot-icon-1.png\x22\x20style=\x22width:\x2022px\x20!important;\x20float:left;margin-left:\x207px;\x22/><span\x20class=\x22tooltiptext\x22>Automation\x20Not\x20Enabled</span></p>', 'path-dropdown', '#CreateServer\x20#REUSABLE_EMAIL', '#hostdata', '#niccardhtml', 'move_label', 'service-input', 'mem_w', '</div><i\x20class=\x22mdi\x20mdi-magnify\x20hide-val', 'forEach', '\x20:\x20', '<input\x20type=\x22hidden\x22\x20name=\x22', 'find', 'gswitch-heading', '</select>', 'serializeArray', '<label\x20class=\x22text-lowercase\x22\x20style=\x22left:80px\x22\x20id=\x22label_', '#CreateNode\x20#node_version', '<label\x20for=\x22', 'Fortigate\x2060F', '#CreateServer\x20#path-dropdown', '\x22\x20selected>', '<div\x20class=\x22col-5\x20px-1\x22>', 'f_swi', '#multi-ip-ip', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20w-100\x22\x20id=\x22ilo_save\x22\x20onclick=\x22verifyiloServer()\x22>Verify</button>', '<a\x20style=\x22cursor:\x20pointer;\x22\x20onclick=\x22editService(this)\x22\x20data-id=\x22', '</a>', 'host', 'v2c', '5333556gxuciW', '<textarea\x20class=\x22form-control\x20input_feild\x22\x20type=\x22text\x22\x20placeholder=\x22text\x22\x20required=\x22\x22\x20id=\x22FRNDLY_NAMES\x22\x20autocomplete=\x22off\x22\x20style=\x22width:\x20fit-content;\x20padding-bottom:\x200%;\x20padding-top:\x202%;\x20padding-right:\x20200px;\x20display:none;\x20\x22></textarea>', 'Not\x20able\x20to\x20get\x20host\x20details', 'isedit', 'parent', 'createElement', '#valids_row', 'Switch\x27s\x20type\x20not\x20Added,\x20Please\x20check\x20Administrator', 'BOOL__REUSABLE_AUTOMATION', '\x22\x20style=\x22padding:0px;\x20background:transparent;\x22><i\x20class=\x22icon-close\x22></i></button>', 'hide.bs.modal', '#mem_c', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>FIREWALL<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>', '</option\x20>', '<h6\x20class=\x22mb-1\x22\x20style=\x22font-size:13px;\x22>', 'each', 'Choose\x20Email\x20Address.', '#CreateMgmt\x20#pass_word', '\x22>0</p>', 'Fortigate100E', 'sec_level', '-div', '<option\x20disabled\x20selected>Select\x20E-Mail</option>', '#edit-multi-select-site', 'webkitURL', 'ilo_save', '</div>&emsp;&emsp;&ensp;', '<div\x20class=\x22col-lg-6\x20col-8\x20my-auto\x22>', '</p>', '<div\x20class=\x22col-lg-3\x20col-12\x20position-relativemt-auto\x20px-lg-0\x20px-2\x20text-md-right\x20text-lg-center\x22\x20style\x20=\x20\x22padding-bottom:\x203%;\x22>', '#oshost-dropdown', 'errorMsg', 'URL', '<input\x20type=\x22number\x22\x20class=\x22form-control\x20node_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20Node\x20Port\x22\x20value=\x229100\x22\x20required=\x22\x22\x20id=\x22port_nodes\x22\x20autocomplete=\x22off\x22>', 'json', '#nodata-hide', '#valid_row', '#CreateSnmp\x20#privacy_password', '#server-heading', '<i\x20class=\x22mdi\x20mdi-lead-pencil\x22\x20onclick=\x22editmgmnt(this)\x22\x20data-toggle=\x22modal\x22\x20name=\x22', '8eZDcBT', 'btn-danger', '/allonboard/idracvalidation', 'mgmtdeletehost', 'GLOBAL_APPLICATION', '<div\x20class=\x22row\x22\x20id=\x22server-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag', '<label\x20for=\x22user_name\x22\x20id=\x22username-label\x22>User\x20Name</label>', '<div\x20class=\x22col-4\x22>', '</div>', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20cancel-btn\x20w-100\x22\x20data-dismiss=\x22modal\x22>Cancel</button>', '<option\x20value=\x22', '<span\x20class=\x22error-msg\x22\x20id=\x22Node-error-msg\x22>\x20</span>', '#pass_word', ')</p>', '<p\x20class=\x22bold-text\x20mb-0\x20text-color\x20col-10\x22\x20style=\x22font-size:12px;\x22>Enabled\x20Monitor\x20plugins</p>', 'parse', '<input\x20type=\x22checkbox\x22\x20id=\x22threshold\x22\x20name=\x22threshold', '<label\x20for=\x22port_node\x22\x20id=\x22port-node-label\x22>Node\x20Port</label>', 'deletehost', '<div\x20class=\x22row\x22\x20id=\x22publicsearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>PUBLIC\x20-\x20SWITCH<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>', 'attr', '<div\x20class=\x22row\x22>', 'SERVICES', 'filter', '<div\x20class=\x22col-2\x22>', '.ipadd', '\x22\x20placeholder=\x22Enter\x20Alias\x22\x20value=\x22\x22\x20id=\x22', '</legend>', 'load_t', 'Want\x20to\x20permanently\x20delete\x20this\x20host?', 'hide', '#PHYSICAL_IP', '#swithtypelist', 'form-control', 'Issue\x20in\x20getting\x20filename', '<div\x20class=\x22col-4\x22></div>', 'Enter\x20IDRAC\x20Port', 'refresh', '<div\x20class=\x22col-4\x22\x20style=\x22margin-left:-4%;\x22>', 'iloip', '<div\x20class=\x22col-3\x22>', '#ip', 'replace', '<div\x20class=\x22col-12\x20my-2\x22>', '#firewalltypelist', 'table-fields', '\x22\x20>', 'input_feild', 'getAttribute', '<label\x20for=\x22pass_word\x22\x20id=\x22password-label\x22>Password</label><br>', '#valid_rows', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22', 'disk_w', '<p\x20class=\x22size12\x20d-md-block\x20d-none\x20mb-md-0\x22\x20style=\x22font-size:10px;\x22>Firewalls\x20Available</p>', 'email', '<div\x20class=\x22col-12\x22\x20style=\x22display:flex;margin-left:\x200px\x22>', '#REUSABLE_AUTOMATION__REUSABLE_VAULT_', 'add', 'operation', 'iplist', 'length', '\x22\x20style=\x22color:white;font-size:\x2020px;\x20padding-left:\x207%\x20!important;\x22></i>', '#uptime_c', 'some', '<fieldset\x20class=\x22card\x20onboards\x22\x20id=\x22s', 'Want\x20to\x20permanently\x20delete\x20this\x20management?', '.input_effect', '#eswitch-heading'];
    _0x93b7 = function () {
        return _0x5dc561;
    };
    return _0x93b7();
}

function checkIfFieldIsEmpty(_0x877d39) {
    var _0x1f67bf = _0x1c480c,
        _0x5f5e2b = ![];
    return $(_0x1f67bf(0x355))[_0x1f67bf(0x2f9)](function () {
        var _0x226f1d = _0x1f67bf,
            _0x227f51 = $(this)['attr']('id'),
            _0x54fda5 = $(this)['attr']('data-template');
        _0x54fda5 == _0x877d39 && ($('#' + _0x227f51 + _0x226f1d(0x2ff))['is'](':visible') && $(this)[_0x226f1d(0x2c1)]()[_0x226f1d(0x3b4)]() === '' && ($(this)[_0x226f1d(0x1b3)](), _0x5f5e2b = !![]));
    }), _0x877d39 === _0x1f67bf(0x3ef) && ($(_0x1f67bf(0x1f4))['is'](_0x1f67bf(0x221)) && (_0x5f5e2b = !![])), _0x5f5e2b;
}

function autoSelectHost() {
    var _0xe5c499 = _0x1c480c,
        _0x5beebd;
    editRespone[_0xe5c499(0x2d5)](function (_0x13293e) {
        var _0x463a4f = _0xe5c499;
        if (_0x13293e[_0x463a4f(0x269)] === '') {
            _0x5beebd = _0x13293e;
            return;
        }
    });
    var _0x19040e = JSON[_0xe5c499(0x321)](_0x5beebd[_0xe5c499(0x30c)]);
    $(_0xe5c499(0x3e6))[_0xe5c499(0x2c1)](_0x19040e['HOST_TEMPLATE'])[_0xe5c499(0x284)](), $(_0xe5c499(0x3e6))[_0xe5c499(0x327)](_0xe5c499(0x25f), _0xe5c499(0x25f)), drawSingleIpAddress(_0x5beebd[_0xe5c499(0x23a)]), $(_0xe5c499(0x1fe))[_0xe5c499(0x3c6)](_0xe5c499(0x3f6)), $('#multi-select-ip')[_0xe5c499(0x3c6)](_0xe5c499(0x1e5));
    var _0x223195 = '<input\x20type=\x22hidden\x22\x20name=\x22HOST_TEMPLATE\x22\x20\x20value=\x22' + _0x19040e[_0xe5c499(0x38c)] + '\x22>';
    $(_0xe5c499(0x2cf))[_0xe5c499(0x207)](_0x223195);
}

function editCallback() {
    var _0x3da0be = _0x1c480c,
        _0x3489c2;
    editRespone[_0x3da0be(0x2d5)](function (_0x184d9c) {
        var _0x142d23 = _0x3da0be;
        if (_0x184d9c[_0x142d23(0x269)] === '') {
            _0x3489c2 = _0x184d9c;
            return;
        }
    });
    var _0x2d7369 = JSON[_0x3da0be(0x321)](_0x3489c2[_0x3da0be(0x30c)]);
    $[_0x3da0be(0x2f9)](_0x2d7369, function (_0x317ede, _0x1c5bde) {
        var _0x2ea8e0 = _0x3da0be;
        if (_0x317ede !== 'HOST_TEMPLATE') {
            var _0x5d8c02 = ![];
            if (_0x317ede[_0x2ea8e0(0x232)]('__') >= 0x0) {
                var _0x50c6b9 = _0x317ede['split']('__');
                _0x50c6b9[0x0] == _0x2ea8e0(0x1de) && _0x1c5bde == 'on' && (_0x5d8c02 = !![], $('#' + _0x317ede)[_0x2ea8e0(0x225)](_0x2ea8e0(0x275), !![]), $('.' + $('#' + _0x317ede)['attr'](_0x2ea8e0(0x21e)))['show']());
            } !_0x5d8c02 && ($('#' + _0x317ede)['val'](_0x1c5bde), $('#' + _0x317ede)[_0x2ea8e0(0x2ee)]()[_0x2ea8e0(0x2d8)](_0x2ea8e0(0x372))[_0x2ea8e0(0x2a9)](_0x2ea8e0(0x2d1)), $('#' + _0x317ede)[_0x2ea8e0(0x2ee)]()['addClass'](_0x2ea8e0(0x38f)));
        }
    }), fillserviceList();
}

function fillserviceList() {
    var _0x5acd53 = _0x1c480c,
        _0x40c7d3 = '',
        _0xd9fcbd = 0x0;
    editRespone[_0x5acd53(0x2d5)](function (_0x5f5610) {
        var _0x11cf5e = _0x5acd53;
        if (_0x5f5610['servicename'] !== '') {
            var _0x15e793 = JSON['parse'](_0x5f5610['json']),
                _0x261221 = parseInt(_0x15e793['id']);
            _0xd9fcbd < _0x261221 && (_0xd9fcbd = _0x261221);
            var _0x2d173f = {};
            _0x2d173f['id'] = _0x261221, $[_0x11cf5e(0x2f9)](_0x15e793, function (_0xd7c096, _0x16931e) {
                _0x2d173f[_0xd7c096] = _0x16931e;
            });
            var _0x2c352a = _0x15e793['SERVICE_TEMPLATE'],
                _0x4457fd = _0x15e793[_0x11cf5e(0x3b8)];
            _0x4457fd === undefined && (_0x4457fd = '--'), _0x40c7d3 += _0x11cf5e(0x3e7) + _0x261221 + '\x22>', _0x40c7d3 += _0x11cf5e(0x1c7), _0x40c7d3 += _0x11cf5e(0x36c), _0x40c7d3 += _0x11cf5e(0x2e6) + _0x261221 + _0x11cf5e(0x18f) + _0x2c352a + '\x22>', _0x40c7d3 += '<h6>' + _0x4457fd + _0x11cf5e(0x3c8), _0x40c7d3 += _0x11cf5e(0x272) + _0x2c352a[_0x11cf5e(0x33d)](_0x11cf5e(0x18e), '') + _0x11cf5e(0x24b), _0x40c7d3 += _0x11cf5e(0x2e7), _0x40c7d3 += _0x11cf5e(0x31a), _0x40c7d3 += _0x11cf5e(0x273), _0x40c7d3 += _0x11cf5e(0x200) + _0x261221 + _0x11cf5e(0x2f3), _0x40c7d3 += _0x11cf5e(0x31a), _0x40c7d3 += _0x11cf5e(0x31a), _0x40c7d3 += _0x11cf5e(0x31a), service_list[_0x11cf5e(0x36d)](_0x2d173f), serviceIdCount++;
        }
    }), serviceIdCount = serviceIdCount + _0xd9fcbd, $('#registered-service-no-data')[_0x5acd53(0x3c2)]('display', _0x5acd53(0x1eb)), $('#registered-service-div')['append'](_0x40c7d3), $('#service-selected')[_0x5acd53(0x331)](), $(_0x5acd53(0x3bd))[_0x5acd53(0x2c2)]();
}

function getServices() {
    var _0x3ee6d1 = _0x1c480c;
    $(_0x3ee6d1(0x382))[_0x3ee6d1(0x39a)](), requestDataFromServer('/vault/getfilenames', {
        'fileName': _0x3ee6d1(0x329)
    }, 'GET')[_0x3ee6d1(0x368)](fillServices);
}

function fillServices(_0x44a8c2) {
    var _0x35e8e4 = _0x1c480c;
    $(_0x35e8e4(0x382))[_0x35e8e4(0x331)]();
    var _0x2451a4 = '\x20';
    res = JSON[_0x35e8e4(0x321)](_0x44a8c2), res[_0x35e8e4(0x295)] == 0xc8 && (global_all_services = res[_0x35e8e4(0x1ef)], global_all_services !== undefined && global_all_services[_0x35e8e4(0x34f)] > 0x0 && global_all_services['forEach'](function (_0x335085) {
        var _0x3b0821 = _0x35e8e4;
        option_value = _0x335085, _0x2451a4 += _0x3b0821(0x31c) + option_value + '\x22>' + option_value + _0x3b0821(0x1c1);
    })), $(_0x35e8e4(0x19d))[_0x35e8e4(0x207)](_0x2451a4);
}

function onAddSecrets() {
    var _0x193911 = _0x1c480c,
        _0x3fc36e = validation(_0x193911(0x342));
    if (!_0x3fc36e) $('#error-message-view')[_0x193911(0x39a)](), $(_0x193911(0x3f8))['html'](_0x193911(0x1a9));
    else {
        $('#error-message-view')[_0x193911(0x331)](), $(_0x193911(0x394))['attr'](_0x193911(0x3f4), _0x193911(0x27d)), data = [], requestData = {}, ip_array = [], ipValue = $(_0x193911(0x33c))['val']();
        ipValue[_0x193911(0x36f)](',') ? (ip_list = ipValue[_0x193911(0x39e)](','), ip_array = ip_list[_0x193911(0x32a)]((_0x267c15, _0x29d154) => ip_list['indexOf'](_0x267c15) === _0x29d154)) : ip_array[0x0] = ipValue;
        for (var _0x162c84 = 0x0; _0x162c84 < ip_array['length']; _0x162c84++) {
            clientData = {}, (clientData['username'] = $('#dialog-for-addsecret\x20#username')['val'](), clientData[_0x193911(0x3a3)] = $(_0x193911(0x17a))[_0x193911(0x2c1)](), clientData[_0x193911(0x2c5)] = $(_0x193911(0x293))['val'](), clientData['ip'] = ip_array[_0x162c84], clientData[_0x193911(0x34d)] = _0x193911(0x34c)), data['push'](clientData);
        }
        requestData[_0x193911(0x1ef)] = data, requestDataFromServer(_0x193911(0x1a8), {
            'clientData': JSON['stringify'](requestData),
            'csrfmiddlewaretoken': csfr_token
        }, _0x193911(0x3ac))[_0x193911(0x368)](addSecretResponse);
    }
}

function addSecretResponse(_0x5966b4) {
    var _0x5271ee = _0x1c480c;
    if (_0x5966b4[_0x5271ee(0x34f)] > 0x0) _0x5966b4[_0x5271ee(0x2d5)](function (_0x31c094) {
        var _0x1a3ee3 = _0x5271ee;
        if (_0x31c094 && _0x31c094[_0x1a3ee3(0x295)] == 0xcc) {
            swal(_0x1a3ee3(0x40f), '\x20', _0x1a3ee3(0x3b3));
            var _0x4cfbde = _0x31c094[_0x1a3ee3(0x1d8)]['split']('/'),
                _0x10f6ce = {};
            _0x10f6ce['id'] = _0x31c094['rowid'], _0x10f6ce[_0x1a3ee3(0x24e)] = _0x4cfbde[0x4], _0x10f6ce[_0x1a3ee3(0x2c5)] = _0x4cfbde[0x2], _0x10f6ce['ip'] = _0x4cfbde[0x3], _0x10f6ce['url'] = _0x31c094[_0x1a3ee3(0x1d8)], vaults[_0x1a3ee3(0x36d)](_0x10f6ce);
            if ($(_0x1a3ee3(0x3ce))['is'](':visible')) {
                var _0x46db8b = $(_0x1a3ee3(0x3ce))[_0x1a3ee3(0x2c1)](),
                    _0x269875 = '\x20';
                _0x269875 += _0x1a3ee3(0x31c) + _0x31c094[_0x1a3ee3(0x1d8)] + '\x22>' + _0x31c094[_0x1a3ee3(0x1d8)] + _0x1a3ee3(0x1c1), $(_0x1a3ee3(0x3ce))[_0x1a3ee3(0x207)](_0x269875);
                if (_0x46db8b !== null && _0x46db8b !== '') $('#REUSABLE_AUTOMATION__REUSABLE_VAULT')[_0x1a3ee3(0x2c1)](_0x46db8b);
                else $(_0x1a3ee3(0x3ce))['val'](_0x31c094['url']);
            }
        } else return swal(_0x1a3ee3(0x38b), '\x20', _0x1a3ee3(0x177)), ![];
    });
    else return swal(_0x5271ee(0x38b), '\x20', _0x5271ee(0x177)), ![];
}

function validation(_0x48dcca) {
    var _0x54e2ef = !![];
    return $('.' + _0x48dcca)['each'](function (_0x429cac) {
        var _0x520e03 = _0x53e3;
        ($(this)[_0x520e03(0x2c1)]() == '' || $(this)[_0x520e03(0x2c1)]() == null) && (_0x54e2ef = ![]);
    }), _0x54e2ef;
}

function addSecret() {
    var _0x4e50e7 = _0x1c480c;
    document[_0x4e50e7(0x2ad)]('ip')[_0x4e50e7(0x3d7)] = '', document[_0x4e50e7(0x2ad)](_0x4e50e7(0x24e))[_0x4e50e7(0x3d7)] = '', $(_0x4e50e7(0x19d))[_0x4e50e7(0x2c1)]('\x20');
}

function emailListResponse() {
    var _0x528063 = _0x1c480c;
    requestDataFromServer(_0x528063(0x369), {}, _0x528063(0x359))[_0x528063(0x368)](function (_0x1e5307) {
        var _0x14d82b = _0x528063,
            _0x4bced1 = JSON['parse'](_0x1e5307);
        emailHtml = '';
        if (_0x4bced1['status'] == 0xc8) _0x4bced1['data'][_0x14d82b(0x2d5)](function (_0x51e5ca) {
            var _0x396858 = _0x14d82b;
            _0x51e5ca[_0x396858(0x349)] !== 'admin' && (emailLists[_0x396858(0x36d)](_0x51e5ca['email']), emailHtml += _0x396858(0x31c) + _0x51e5ca[_0x396858(0x349)] + '\x22>' + _0x51e5ca['email'] + _0x396858(0x1c1));
        }), $(_0x14d82b(0x178))[_0x14d82b(0x207)](emailHtml), $(_0x14d82b(0x406))[_0x14d82b(0x207)](emailHtml);
        else { }
    });
}

function myFunctionpass() {
    var _0x145f4b = _0x1c480c,
        _0x55cb86 = document[_0x145f4b(0x2ad)](_0x145f4b(0x3cc));
    _0x55cb86[_0x145f4b(0x404)] === _0x145f4b(0x3a3) ? ($(_0x145f4b(0x28d))[_0x145f4b(0x26a)](_0x145f4b(0x22d)), _0x55cb86[_0x145f4b(0x404)] = 'text') : ($(_0x145f4b(0x28d))[_0x145f4b(0x26a)](_0x145f4b(0x22d)), _0x55cb86['type'] = _0x145f4b(0x3a3));
}

function mgmttype(_0x2bda89) {
    var _0x5245f3 = _0x1c480c;
    $('#mgmnttype')['empty']();
    var _0x1d61c7 = '';
    _0x2bda89 == _0x5245f3(0x244) ? (_0x1d61c7 += '<div\x20class=\x22col-12\x20my-2\x22>', _0x1d61c7 += _0x5245f3(0x318), _0x1d61c7 += '<input\x20type=\x22text\x22\x20class=\x22form-control\x20mgnt_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20User\x20Name\x22\x20required=\x22\x22\x20id=\x22user_name\x22\x20autocomplete=\x22off\x22>', _0x1d61c7 += '<span\x20class=\x22error-msg\x22\x20id=\x22username-error-msg\x22>\x20</span>', _0x1d61c7 += '</div>', _0x1d61c7 += _0x5245f3(0x235), _0x1d61c7 += _0x5245f3(0x344), _0x1d61c7 += _0x5245f3(0x198), _0x1d61c7 += '<div\x20class=\x22d-inline-block\x20icon\x22><i\x20class=\x22mdi\x20mdi-eye-off-outline\x20toggle-password\x22\x20id=\x22icons_change\x22\x20onclick=\x22myFunctionpass()\x22></i></div>', _0x1d61c7 += _0x5245f3(0x176), _0x1d61c7 += '</div>', _0x1d61c7 += _0x5245f3(0x33e), _0x1d61c7 += '<label\x20for=\x22ilo_ip\x22\x20id=\x22ilo-label\x22>ILO\x20IP</label>', _0x1d61c7 += _0x5245f3(0x274), _0x1d61c7 += _0x5245f3(0x3ea), _0x1d61c7 += _0x5245f3(0x31a), _0x1d61c7 += _0x5245f3(0x3e1), _0x1d61c7 += _0x5245f3(0x259), _0x1d61c7 += _0x5245f3(0x2e2), _0x1d61c7 += _0x5245f3(0x31b), _0x1d61c7 += '</div>', _0x1d61c7 += _0x5245f3(0x2e2), _0x1d61c7 += _0x5245f3(0x2e5), _0x1d61c7 += '</div>', _0x1d61c7 += _0x5245f3(0x281), _0x1d61c7 += _0x5245f3(0x31a)) : (_0x1d61c7 += _0x5245f3(0x33e), _0x1d61c7 += _0x5245f3(0x400), _0x1d61c7 += _0x5245f3(0x17e), _0x1d61c7 += _0x5245f3(0x1c9), _0x1d61c7 += '</div>', _0x1d61c7 += _0x5245f3(0x3e1), _0x1d61c7 += _0x5245f3(0x259), _0x1d61c7 += _0x5245f3(0x2e2), _0x1d61c7 += _0x5245f3(0x31b), _0x1d61c7 += _0x5245f3(0x31a), _0x1d61c7 += '<div\x20class=\x22col-5\x20px-1\x22>', _0x1d61c7 += '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20w-100\x22\x20id=\x22idrac_save\x22\x20onclick=\x22verifiedidracServer()\x22>Verify</button>', _0x1d61c7 += _0x5245f3(0x31a), _0x1d61c7 += _0x5245f3(0x1a2), _0x1d61c7 += _0x5245f3(0x31a)), $('#mgmnttype')['append'](_0x1d61c7);
}
var labelNames = [_0x1c480c(0x347), _0x1c480c(0x364), _0x1c480c(0x3dc), _0x1c480c(0x1a1), _0x1c480c(0x28a), _0x1c480c(0x39c), _0x1c480c(0x2d3), _0x1c480c(0x409), _0x1c480c(0x388), _0x1c480c(0x3ad), _0x1c480c(0x3b1), _0x1c480c(0x32f), _0x1c480c(0x209), _0x1c480c(0x188), _0x1c480c(0x20a), 'login_w', _0x1c480c(0x202), _0x1c480c(0x257)],
    defaultValues = [0x46, 0x4b, 0x258, 0x46, 0x50, 0xa, 0x46, 0x50, 0xa, 0.6, 0.8, 0xa, 0x5a, 0x78, 0x11940, 0x2, 0x5, 0xa];

function nodetype(_0x685e8d) {
    var _0x1a6202 = _0x1c480c;
    $(_0x1a6202(0x233))['empty']();
    var _0x52b8ff = '';
    if (_0x685e8d == 'Node\x20Expo') {
        _0x52b8ff += _0x1a6202(0x33e), _0x52b8ff += _0x1a6202(0x323), _0x52b8ff += _0x1a6202(0x30b), _0x52b8ff += _0x1a6202(0x31d), _0x52b8ff += '</div>', _0x52b8ff += _0x1a6202(0x328), _0x52b8ff += _0x1a6202(0x319), _0x52b8ff += _0x1a6202(0x322) + _0x685e8d + '\x22\x20value=\x22threshold\x22\x20onchange=\x22toggleTextFields(this)\x22>', _0x52b8ff += '<label\x20for=\x22threshold\x22>\x20Threshold</label>', _0x52b8ff += _0x1a6202(0x31a), _0x52b8ff += _0x1a6202(0x379), _0x52b8ff += _0x1a6202(0x23b), _0x52b8ff += _0x1a6202(0x31a), _0x52b8ff += _0x1a6202(0x174), _0x52b8ff += _0x1a6202(0x39d), _0x52b8ff += _0x1a6202(0x2c9), _0x52b8ff += '<th></th>', _0x52b8ff += _0x1a6202(0x2be), _0x52b8ff += _0x1a6202(0x1f3), _0x52b8ff += '</tr>', _0x52b8ff += _0x1a6202(0x2c9), _0x52b8ff += '<td>w</td>', _0x52b8ff += '<td>Warning</td>', _0x52b8ff += '<td>num</td>', _0x52b8ff += _0x1a6202(0x390), _0x52b8ff += _0x1a6202(0x2c9), _0x52b8ff += '<td>c</td>', _0x52b8ff += _0x1a6202(0x1e9), _0x52b8ff += '<td>num</td>', _0x52b8ff += _0x1a6202(0x390), _0x52b8ff += _0x1a6202(0x2c9), _0x52b8ff += _0x1a6202(0x2ca), _0x52b8ff += _0x1a6202(0x21b), _0x52b8ff += _0x1a6202(0x25e), _0x52b8ff += _0x1a6202(0x390), _0x52b8ff += '</table>', _0x52b8ff += '</div>', _0x52b8ff += _0x1a6202(0x31a), _0x52b8ff += '<div\x20id=\x22threshold-fields\x22\x20style=\x22display:none;\x22>';
        for (var _0x1a9145 = 0x0; _0x1a9145 < labelNames[_0x1a6202(0x34f)]; _0x1a9145++) {
            _0x52b8ff += '<div\x20class=\x22row\x22>', _0x52b8ff += _0x1a6202(0x3c7), _0x52b8ff += '<div\x20class=\x22col-4\x22>', _0x52b8ff += _0x1a6202(0x2de) + labelNames[_0x1a9145] + '\x22>' + labelNames[_0x1a9145] + '</label>', _0x52b8ff += '</div>', _0x52b8ff += _0x1a6202(0x2a8), _0x52b8ff += _0x1a6202(0x266) + labelNames[_0x1a9145] + _0x1a6202(0x36b) + defaultValues[_0x1a9145] + '\x22>', _0x52b8ff += _0x1a6202(0x31a), _0x52b8ff += _0x1a6202(0x3e8), _0x52b8ff += _0x1a6202(0x31a);
        }
        _0x52b8ff += '</div>', _0x52b8ff += _0x1a6202(0x3e1), _0x52b8ff += '<div\x20class=\x22modal-footer\x20mx-auto\x20col-md-11\x20col-12\x22>', _0x52b8ff += _0x1a6202(0x2e2), _0x52b8ff += _0x1a6202(0x31b), _0x52b8ff += _0x1a6202(0x31a), _0x52b8ff += _0x1a6202(0x2e2), _0x52b8ff += '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20w-100\x22\x20id=\x22node_save\x22\x20onclick=\x22verifynodeServer()\x22>Verify</button>', _0x52b8ff += '</div>', _0x52b8ff += _0x1a6202(0x2b8), _0x52b8ff += '</div>';
    }
    $(_0x1a6202(0x233))[_0x1a6202(0x207)](_0x52b8ff);
}

function resetInputValues() {
    var _0x34fe17 = _0x1c480c,
        _0x1aa3fe = document['getElementById'](_0x34fe17(0x35d)),
        _0x4d5f5c = document[_0x34fe17(0x2ad)](_0x34fe17(0x2ab)),
        _0x422939 = _0x4d5f5c[_0x34fe17(0x26e)](_0x34fe17(0x334));
    if (_0x1aa3fe[_0x34fe17(0x275)])
        for (var _0x412b94 = 0x0; _0x412b94 < _0x422939[_0x34fe17(0x34f)]; _0x412b94++) {
            _0x422939[_0x412b94][_0x34fe17(0x3d7)] = defaultValues[_0x412b94];
        } else
        for (var _0x412b94 = 0x0; _0x412b94 < _0x422939[_0x34fe17(0x34f)]; _0x412b94++) {
            _0x422939[_0x412b94][_0x34fe17(0x3d7)] = '';
        }
}

function toggleTextFields(_0x1e9d86) {
    var _0x224daf = _0x1c480c,
        _0x2b93bd = document[_0x224daf(0x2ad)](_0x224daf(0x2ab)),
        _0x1fcdde = document['getElementById'](_0x224daf(0x340)),
        _0x1cabc6 = document[_0x224daf(0x2ad)](_0x224daf(0x192));
    _0x1e9d86[_0x224daf(0x275)] ? (_0x2b93bd[_0x224daf(0x1fb)][_0x224daf(0x230)] = _0x224daf(0x1ec), _0x1fcdde[_0x224daf(0x1fb)]['display'] = _0x224daf(0x29f), _0x1cabc6[_0x224daf(0x1fb)][_0x224daf(0x230)] = _0x224daf(0x1ec)) : (_0x2b93bd[_0x224daf(0x1fb)][_0x224daf(0x230)] = _0x224daf(0x1eb), _0x1fcdde[_0x224daf(0x1fb)][_0x224daf(0x230)] = _0x224daf(0x1eb), _0x1cabc6['style'][_0x224daf(0x230)] = _0x224daf(0x1eb));
}

function verifiedidracServer() {
    var _0x3e64b7 = _0x1c480c,
        _0x879960 = {};
    _0x879960[_0x3e64b7(0x2ed)] = isEdit, _0x879960['prototype'] = $(_0x3e64b7(0x405))[_0x3e64b7(0x2c1)](), _0x879960['ip'] = validationip, _0x879960[_0x3e64b7(0x278)] = $(_0x3e64b7(0x3ae))['val'](), ilomgmt_list['push'](_0x879960), requestDataFromServer(_0x3e64b7(0x314), {
        'data': JSON['stringify'](_0x879960),
        'csrfmiddlewaretoken': csfr_token
    }, 'POST')[_0x3e64b7(0x368)](idracvalidResponse);
}

function idracvalidResponse(_0x3e0d44) {
    var _0x4537b0 = _0x1c480c;
    res = JSON['parse'](_0x3e0d44), $('#valids_row')['empty'](), $('.loader')[_0x4537b0(0x331)]();
    if (res[_0x4537b0(0x2bb)] == !![]) {
        const _0x38f9a3 = document[_0x4537b0(0x2ad)](_0x4537b0(0x204));
        _0x38f9a3[_0x4537b0(0x386)]('onclick', 'sendidracDataToServer()'), _0x38f9a3[_0x4537b0(0x26f)] = _0x4537b0(0x227);
        var _0x5bb38a = _0x4537b0(0x299);
        $('#valids_row')[_0x4537b0(0x207)](_0x5bb38a), setTimeout(function () {
            var _0x54bda4 = _0x4537b0;
            $('#valids_row')[_0x54bda4(0x2c2)]();
        }, 0xbb8), $(_0x4537b0(0x2c8))['prop'](_0x4537b0(0x25f), !![]), $(_0x4537b0(0x375))[_0x4537b0(0x225)](_0x4537b0(0x25f), !![]);
    } else {
        if (res[_0x4537b0(0x2bb)] == ![]) {
            var _0x5bb38a = _0x4537b0(0x3aa);
            $(_0x4537b0(0x2f0))['append'](_0x5bb38a), setTimeout(function () {
                $('#valids_row')['empty']();
            }, 0xbb8);
        }
    }
}

function verifyiloServer() {
    var _0x3763cc = _0x1c480c,
        _0x2bbed2 = {};
    _0x2bbed2['isedit'] = isEdit, _0x2bbed2[_0x3763cc(0x226)] = $(_0x3763cc(0x405))[_0x3763cc(0x2c1)](), _0x2bbed2[_0x3763cc(0x24e)] = $(_0x3763cc(0x224))['val'](), _0x2bbed2[_0x3763cc(0x3a3)] = $(_0x3763cc(0x2fb))[_0x3763cc(0x2c1)](), _0x2bbed2['iloip'] = $(_0x3763cc(0x3db))[_0x3763cc(0x2c1)](), _0x2bbed2['ip'] = validationip, ilomgmt_list['push'](_0x2bbed2), requestDataFromServer('/allonboard/ilovalidation', {
        'data': JSON[_0x3763cc(0x2b2)](_0x2bbed2),
        'csrfmiddlewaretoken': csfr_token
    }, _0x3763cc(0x3ac))[_0x3763cc(0x368)](ilovalidResponse);
}

function ilovalidResponse(_0x2bc20d) {
    var _0x5c7f7f = _0x1c480c;
    res = JSON[_0x5c7f7f(0x321)](_0x2bc20d), $(_0x5c7f7f(0x30e))['empty'](), $(_0x5c7f7f(0x382))[_0x5c7f7f(0x331)]();
    if (res[_0x5c7f7f(0x2bb)] == !![]) {
        const _0x353e0e = document[_0x5c7f7f(0x2ad)](_0x5c7f7f(0x303));
        _0x353e0e[_0x5c7f7f(0x386)](_0x5c7f7f(0x210), _0x5c7f7f(0x265)), _0x353e0e['innerText'] = _0x5c7f7f(0x227);
        var _0x2723a4 = '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#00ff00;\x22>Success\x20in\x20Validation...</p>';
        $(_0x5c7f7f(0x30e))['append'](_0x2723a4), setTimeout(function () {
            var _0xf9c054 = _0x5c7f7f;
            $(_0xf9c054(0x30e))['empty']();
        }, 0xbb8), $(_0x5c7f7f(0x2c8))['prop'](_0x5c7f7f(0x25f), !![]), $('#user_name')[_0x5c7f7f(0x225)](_0x5c7f7f(0x25f), !![]), $(_0x5c7f7f(0x31e))[_0x5c7f7f(0x225)](_0x5c7f7f(0x25f), !![]), $(_0x5c7f7f(0x370))[_0x5c7f7f(0x225)]('disabled', !![]);
    } else {
        if (res[_0x5c7f7f(0x2bb)] == ![]) {
            var _0x2723a4 = _0x5c7f7f(0x3aa);
            $(_0x5c7f7f(0x30e))['append'](_0x2723a4), setTimeout(function () {
                $('#valid_row')['empty']();
            }, 0xbb8);
        }
    }
}

function verifynodeServer() {
    var _0x5bda19 = _0x1c480c,
        _0x3a78ed = {};
    _0x3a78ed[_0x5bda19(0x2ed)] = isEdit, _0x3a78ed[_0x5bda19(0x226)] = $('#CreateNode\x20#node_version')[_0x5bda19(0x2c1)](), _0x3a78ed['ip'] = validationip, _0x3a78ed[_0x5bda19(0x278)] = $(_0x5bda19(0x1c5))['val'](), nodemgmt_list['push'](_0x3a78ed), requestDataFromServer(_0x5bda19(0x271), {
        'data': JSON['stringify'](_0x3a78ed),
        'csrfmiddlewaretoken': csfr_token
    }, 'POST')['done'](nodevalidResponse);
}

function nodevalidResponse(_0x582c58) {
    var _0x4cdcfa = _0x1c480c;
    res = JSON[_0x4cdcfa(0x321)](_0x582c58), $(_0x4cdcfa(0x345))[_0x4cdcfa(0x2c2)](), $(_0x4cdcfa(0x382))['hide']();
    if (res[_0x4cdcfa(0x2bb)] == !![]) {
        const _0x123045 = document[_0x4cdcfa(0x2ad)](_0x4cdcfa(0x2b4));
        _0x123045[_0x4cdcfa(0x386)](_0x4cdcfa(0x210), _0x4cdcfa(0x283)), _0x123045[_0x4cdcfa(0x26f)] = _0x4cdcfa(0x227);
        var _0x52a9c0 = _0x4cdcfa(0x299);
        $(_0x4cdcfa(0x345))['append'](_0x52a9c0), setTimeout(function () {
            var _0x59b68d = _0x4cdcfa;
            $(_0x59b68d(0x345))[_0x59b68d(0x2c2)]();
        }, 0xbb8), $('#node_version')[_0x4cdcfa(0x225)](_0x4cdcfa(0x25f), !![]), $(_0x4cdcfa(0x1c3))['prop'](_0x4cdcfa(0x25f), !![]);
    } else {
        if (res[_0x4cdcfa(0x2bb)] == ![]) {
            var _0x52a9c0 = '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#ff0000;\x22>Failure\x20in\x20Validation...</p>';
            $('#valid_rows')[_0x4cdcfa(0x207)](_0x52a9c0), setTimeout(function () {
                var _0xd0e897 = _0x4cdcfa;
                $(_0xd0e897(0x345))[_0xd0e897(0x2c2)]();
            }, 0xbb8);
        }
    }
}

function _0x53e3(_0x3d8e2d, _0x2fb0b4) {
    var _0x93b707 = _0x93b7();
    return _0x53e3 = function (_0x53e3ff, _0x551700) {
        _0x53e3ff = _0x53e3ff - 0x171;
        var _0x5c3873 = _0x93b707[_0x53e3ff];
        return _0x5c3873;
    }, _0x53e3(_0x3d8e2d, _0x2fb0b4);
}

function validatesInputs(_0x323081) {
    var _0x1385e8 = _0x1c480c,
        _0x57defe = checkAllfeildsfilled(_0x323081);
    const _0x3dc2e2 = [{
        'id': 'user_name',
        'label': _0x1385e8(0x3e5),
        'errorMsg': _0x1385e8(0x1c8),
        'value': _0x1385e8(0x38e)
    }, {
        'id': 'pass_word',
        'label': 'password-label',
        'errorMsg': _0x1385e8(0x254),
        'value': _0x1385e8(0x1e8)
    }, {
        'id': _0x1385e8(0x19a),
        'label': _0x1385e8(0x3e3),
        'errorMsg': _0x1385e8(0x267),
        'value': _0x1385e8(0x380)
    }];
    let _0x1c7821 = ![];
    for (let _0x50ae46 = 0x0; _0x50ae46 < _0x3dc2e2[_0x1385e8(0x34f)]; _0x50ae46++) {
        const _0x1acdd4 = _0x3dc2e2[_0x50ae46],
            _0x3916f5 = document[_0x1385e8(0x2ad)](_0x1acdd4['id']);
        _0x3916f5[_0x1385e8(0x3d7)] === _0x1acdd4[_0x1385e8(0x3d7)] ? (document[_0x1385e8(0x2ad)](_0x1acdd4[_0x1385e8(0x309)])[_0x1385e8(0x373)] = _0x1385e8(0x1cd), document[_0x1385e8(0x2ad)](_0x1acdd4[_0x1385e8(0x372)])[_0x1385e8(0x1fb)][_0x1385e8(0x2bc)] = _0x1385e8(0x246), _0x1c7821 = !![]) : document[_0x1385e8(0x2ad)](_0x1acdd4['errorMsg'])[_0x1385e8(0x373)] = '';
    }
    return _0x57defe;
    return !_0x1c7821;
}

function validateingInputs(_0x413f75) {
    var _0x14135a = _0x1c480c,
        _0x37e11f = checkAllfeildsfilled(_0x413f75);
    const _0x1c9fe0 = [{
        'id': _0x14135a(0x3e0),
        'label': _0x14135a(0x183),
        'errorMsg': 'idrac-error-msg',
        'value': _0x14135a(0x337)
    }];
    let _0xd4600 = ![];
    for (let _0xd2a7c9 = 0x0; _0xd2a7c9 < _0x1c9fe0[_0x14135a(0x34f)]; _0xd2a7c9++) {
        const _0x274f33 = _0x1c9fe0[_0xd2a7c9],
            _0x5d97fe = document[_0x14135a(0x2ad)](_0x274f33['id']);
        _0x5d97fe[_0x14135a(0x3d7)] === _0x274f33[_0x14135a(0x3d7)] ? (document[_0x14135a(0x2ad)](_0x274f33['errorMsg'])[_0x14135a(0x373)] = _0x14135a(0x1cd), document[_0x14135a(0x2ad)](_0x274f33[_0x14135a(0x372)])['style'][_0x14135a(0x2bc)] = '#ff9eac', _0xd4600 = !![]) : document[_0x14135a(0x2ad)](_0x274f33['errorMsg'])[_0x14135a(0x373)] = '';
    }
    return _0x37e11f;
    return !_0xd4600;
}

function validateInputing(_0x4390a2) {
    var _0x31d092 = _0x1c480c,
        _0x48c97f = checkAllfeildsfilled(_0x4390a2);
    const _0x5684bf = [{
        'id': _0x31d092(0x1ea),
        'label': _0x31d092(0x3ca),
        'errorMsg': _0x31d092(0x22a),
        'value': 'Enter\x20Node\x20Port'
    }];
    let _0x27b0e6 = ![];
    for (let _0x36599d = 0x0; _0x36599d < _0x5684bf[_0x31d092(0x34f)]; _0x36599d++) {
        const _0x4abe30 = _0x5684bf[_0x36599d],
            _0x1027b7 = document[_0x31d092(0x2ad)](_0x4abe30['id']);
        _0x1027b7[_0x31d092(0x3d7)] === _0x4abe30[_0x31d092(0x3d7)] ? (document[_0x31d092(0x2ad)](_0x4abe30[_0x31d092(0x309)])['textContent'] = 'Field\x20cannot\x20be\x20empty', document[_0x31d092(0x2ad)](_0x4abe30['label'])[_0x31d092(0x1fb)][_0x31d092(0x2bc)] = _0x31d092(0x246), _0x27b0e6 = !![]) : document['getElementById'](_0x4abe30[_0x31d092(0x309)])[_0x31d092(0x373)] = '';
    }
    return _0x48c97f;
    return !_0x27b0e6;
}