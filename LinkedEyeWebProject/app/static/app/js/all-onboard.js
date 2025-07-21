var _0x772837 = _0x143e;
(function (_0x31e5c3, _0xd42c09) {
    var _0x39c257 = _0x143e,
        _0x290fed = _0x31e5c3();
    while (!![]) {
        try {
            var _0xc71768 = -parseInt(_0x39c257(0x34d)) / 0x1 * (parseInt(_0x39c257(0x15e)) / 0x2) + parseInt(_0x39c257(0x1a5)) / 0x3 * (parseInt(_0x39c257(0x3a9)) / 0x4) + -parseInt(_0x39c257(0x1cb)) / 0x5 + parseInt(_0x39c257(0x1b1)) / 0x6 * (parseInt(_0x39c257(0x2eb)) / 0x7) + parseInt(_0x39c257(0x252)) / 0x8 * (parseInt(_0x39c257(0x1e5)) / 0x9) + -parseInt(_0x39c257(0x2ed)) / 0xa * (-parseInt(_0x39c257(0x1ac)) / 0xb) + parseInt(_0x39c257(0x1de)) / 0xc;
            if (_0xc71768 === _0xd42c09) break;
            else _0x290fed['push'](_0x290fed['shift']());
        } catch (_0x3717e3) {
            _0x290fed['push'](_0x290fed['shift']());
        }
    }
}(_0x1b39, 0xa3eee));
var params = new URLSearchParams(document['location'][_0x772837(0x1f0)]);
sites = [], selectedsite = '\x20', sites[_0x772837(0x239)](params[_0x772837(0x2f2)](_0x772837(0x300)));
var selectedsite = params[_0x772837(0x2f2)](_0x772837(0x300)),
    global_all_services, global_ip_addresses, serviceIdCount = 0x0,
    selectedFileType = '',
    isEdit = ![],
    editRespone, registeredIPAddress = [],
    isServiceEdit = ![],
    hostPath = 'DIRECT',
    applicationNames = [],
    vaults = [],
    deleteBtn, toBeDeletedHost = !![],
    requestData = {},
    registeredMultiSelect = ![],
    isFillHostDetails = !![],
    emailLists = [],
    onboardselectValue, selectkeyValue, gatewayswitch = 0x0,
    routerswitch = 0x0,
    publicswitch = 0x0,
    exchangeswitch = 0x0,
    fortigate50E = 0x0,
    fortigate60E = 0x0,
    fortigate60F = 0x0,
    fortigate80F = 0x0,
    fortigate100E = 0x0,
    fortigate100F = 0x0,
    fortigate200F = 0x0,
    router4321 = 0x0,
    physicalser = 0x0,
    virtualser = 0x0,
    gcount = 0x0,
    ecount = 0x0,
    scount = 0x0,
    pcount = 0x0,
    fcount = 0x0,
    rcount = 0x0,
    ilomgmt_list = [],
    idrac_list = [],
    nodemgmt_list = [],
    winmgmt_list = [],
    ngnixmgmt_list = [],
    validationip = '',
    leurl = '';
$(document)[_0x772837(0x19d)](function () {
    var _0xcf18b7 = _0x772837;
    $(_0xcf18b7(0x3ac))[_0xcf18b7(0x25c)](), initializeModal(), getclickSiteNames();
    window[_0xcf18b7(0x22f)][_0xcf18b7(0x3aa)][_0xcf18b7(0x101)]('?')[_0xcf18b7(0x1a4)]() === _0xcf18b7(0x218) && (isFillHostDetails = ![], $('.add')[_0xcf18b7(0x380)]('click', $('#nodata')[_0xcf18b7(0x25c)](), $(_0xcf18b7(0x236))['hide'](), $(_0xcf18b7(0xa4))['show']()));
    if (window['location'][_0xcf18b7(0x3aa)]['split']('!')[_0xcf18b7(0x1a4)]() === _0xcf18b7(0x39c)) {
        isFillHostDetails = !![];
        var _0x2fbfdf = window['location'][_0xcf18b7(0x3aa)][_0xcf18b7(0x101)]('?')[_0xcf18b7(0x1a4)](),
            _0x13e403 = _0x2fbfdf[_0xcf18b7(0x101)]('!')[0x0];
        getVaultInformation(), editRegisteredHosts(_0x13e403);
    }
    isFillHostDetails && ($(_0xcf18b7(0x344))[_0xcf18b7(0x25c)](), $(_0xcf18b7(0xa4))['hide']()), $('.add')[_0xcf18b7(0x160)](function () {
        var _0x230779 = _0xcf18b7;
        $(_0x230779(0x344))['hide'](), $(_0x230779(0x236))[_0x230779(0x25c)](), $(_0x230779(0xa4))[_0x230779(0x140)]();
    }), $(_0xcf18b7(0x273))['click'](function () {
        sendFormDataToServer();
    }), $(_0xcf18b7(0xde))[_0xcf18b7(0x25c)](), $('#multipleIPAddressSelect')['hide'](), $(_0xcf18b7(0x158))['on'](_0xcf18b7(0x89), function () {
        var _0x3d3510 = _0xcf18b7;
        $(_0x3d3510(0x19c))[_0x3d3510(0x23c)](''), $('#error-application')['empty']();
    }), $(_0xcf18b7(0x1d5))['on'](_0xcf18b7(0x10e), function () {
        var _0x19e0af = _0xcf18b7;
        if (global_ip_addresses !== undefined) {
            var _0x1753fb = '<option\x20disabled>Choose\x20IP</option>';
            global_ip_addresses[_0x19e0af(0x1f1)](function (_0x4a30e7) {
                var _0x2484f1 = _0x4a30e7['ip'];
            }), $(_0x19e0af(0x39b))[_0x19e0af(0x122)](_0x1753fb);
        }
    });
});

function getclickSiteNames() {
    var _0x2144d9 = _0x772837;
    requestDataFromServer(_0x2144d9(0x38e), {
        'type': _0x2144d9(0x2d6),
        'site': params['get']('site')
    }, _0x2144d9(0xc5))[_0x2144d9(0x390)](function (_0x1dc87f) {
        var _0x219853 = _0x2144d9;
        res = JSON['parse'](_0x1dc87f), res[_0x219853(0x37b)] == 0xc8 && (siteResponse = res['data'], leurl = siteResponse[0x0]['le_url']), tablenewonb(), displaynewonb();
    });
}

function initializeModal() {
    var _0xaad15e = _0x772837,
        _0x40a301 = 0x1,
        _0x5c65fd = {};

    function _0x5cd6ec(_0x589ae5) {
        var _0x238a05 = _0x143e;
        $('#modalBodyStep' + _0x40a301)[_0x238a05(0x25c)](), _0x40a301 = _0x589ae5, $('#modalBodyStep' + _0x40a301)[_0x238a05(0x140)](), nexticon(), _0x4993a7(), _0x3a418d(), _0x40a301 === 0x3 && nextdata(), _0x40a301 === 0x4 && toggleServiceId(), _0x40a301 === 0x5 && saveFormData();
    }

    function _0x5c8da8() {
        if (!_0xf77c2b(_0x40a301)) {
            _0x461308();
            return;
        }
        _0x12c3d6(), _0x5cd6ec(_0x40a301 + 0x1);
    }

    function _0x5173ac(_0x3bf9ea, _0x566934) {
        var _0x3cfb94 = _0x143e;
        $(document)['on'](_0x3cfb94(0x1a6), _0x3bf9ea, function () {
            var _0xa3782f = _0x3cfb94,
                _0x542f72 = $(this)[_0xa3782f(0x23c)]();
            _0x542f72 && (_0x40a301 === _0x566934 && _0x12c3d6(), _0x5cd6ec(_0x40a301 + 0x1));
        });
    }
    _0x5173ac('#onboardSelect', 0x1), _0x5173ac(_0xaad15e(0x19f), 0x2);

    function _0xfb15a() {
        _0x5cd6ec(_0x40a301 - 0x1), _0x25850d();
    }

    function _0x4993a7() {
        var _0x338457 = _0xaad15e,
            _0x2c51df = '';
        for (var _0x1fa83c = 0x1; _0x1fa83c <= _0x40a301; _0x1fa83c++) {
            var _0x1e13e0 = $(_0x338457(0x3b3) + _0x1fa83c + _0x338457(0x2ee))[_0x338457(0x275)]();
            _0x1fa83c === _0x40a301 ? _0x2c51df += '<span\x20style=\x22color:\x20#e99123;\x22>' + _0x1e13e0 + _0x338457(0x392) : _0x2c51df += _0x338457(0x1e4) + _0x1fa83c + '\x22>' + _0x1e13e0 + _0x338457(0x1b3), _0x1fa83c < _0x40a301 && (_0x2c51df += _0x338457(0x2e4));
        }
        $(_0x338457(0x179))[_0x338457(0x33b)](_0x2c51df);
    }

    function _0x3a418d() {
        var _0x20132f = _0xaad15e;
        $(_0x20132f(0x26b))[_0x20132f(0x2cc)](_0x40a301 > 0x1), $(_0x20132f(0x221))[_0x20132f(0x33b)](_0x40a301 === 0x5 ? _0x20132f(0x388) : _0x20132f(0x31a));
    }

    function _0xf77c2b(_0xfeadc1) {
        var _0x3afb2c = _0xaad15e,
            _0x3c9e24 = !![],
            _0xd203b8 = [],
            _0x376dab = _0x3afb2c(0x1cc);
        if (_0xfeadc1 === 0x1) {
            _0xd203b8 = ['#onboardSelect'];
            var _0x2840f0 = $(_0x3afb2c(0x2de)),
                _0x49e8e0 = _0x2840f0[_0x3afb2c(0x23c)]();
            _0x49e8e0 === null || _0x49e8e0 === '' ? (_0x2840f0[_0x3afb2c(0x235)](_0x3afb2c(0x37c), _0x3afb2c(0x205)), _0x3c9e24 = ![]) : (_0x2840f0[_0x3afb2c(0x235)](_0x3afb2c(0x37c), ''), onboardselectValue = _0x49e8e0);
        } else {
            if (_0xfeadc1 === 0x2) _0xd203b8 = [_0x3afb2c(0x19f)];
            else {
                if (_0xfeadc1 === 0x3) {
                    var _0x1ac1c1 = [_0x3afb2c(0x110), _0x3afb2c(0x1c9), _0x3afb2c(0x242), '#sub-multi-select-ip', _0x3afb2c(0x199), _0x3afb2c(0x301), _0x3afb2c(0x267)];
                    _0xfeadc1 === 0x3 && $('#path-dropdown')[_0x3afb2c(0x23c)]() === 'VM' && _0x1ac1c1[_0x3afb2c(0x239)](_0x3afb2c(0x3af));
                    _0xd203b8 = _0x1ac1c1;
                    if (_0x1ac1c1['includes'](_0x3afb2c(0x3af))) {
                        var _0x5aa6e8 = $(_0x3afb2c(0x3af)),
                            _0x336f8a = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
                            _0x49e8e0 = _0x5aa6e8[_0x3afb2c(0x23c)]();
                        !_0x336f8a[_0x3afb2c(0x368)](_0x49e8e0) ? (_0x5aa6e8[_0x3afb2c(0x235)](_0x3afb2c(0x37c), _0x3afb2c(0x205)), _0x3c9e24 = ![], swal(_0x3afb2c(0x38d), '\x20', 'warning')) : _0x5aa6e8['css']('border-color', '');
                    }
                }
            }
        }
        return _0xd203b8[_0x3afb2c(0x1f1)](function (_0xe48702) {
            var _0x30445c = _0x3afb2c,
                _0x52556c = $(_0xe48702)[_0x30445c(0x23c)]();
            _0x52556c === null || _0x52556c === '' ? ($(_0xe48702)[_0x30445c(0x235)](_0x30445c(0x37c), _0x30445c(0x205)), _0x3c9e24 = ![]) : $(_0xe48702)[_0x30445c(0x235)](_0x30445c(0x37c), '');
        }), _0x3c9e24;
    }

    function _0x461308() {
        var _0x36a416 = _0xaad15e;
        $(_0x36a416(0xc0))[_0x36a416(0x33b)](_0x36a416(0x2c2)), setTimeout(function () {
            var _0x3d88c4 = _0x36a416;
            $(_0x3d88c4(0xc0))['empty'](), $(_0x3d88c4(0x3a4))[_0x3d88c4(0xe4)]('error-border');
        }, 0x7d0);
    }

    function _0x25850d() {
        var _0x6c17f0 = _0xaad15e,
            _0xd17b09 = _0x5c65fd[_0x40a301];
        typeof _0xd17b09 === _0x6c17f0(0xb4) && Object[_0x6c17f0(0x96)](_0xd17b09)[_0x6c17f0(0x1f1)](function (_0x454fd0) {
            var _0x3e1426 = _0x6c17f0,
                _0x22eb06 = _0x454fd0[_0x3e1426(0x131)]('#') ? _0x454fd0 : '#' + _0x454fd0,
                _0x21508e = _0xd17b09[_0x454fd0];
            $(_0x22eb06)['is']('select') ? setTimeout(function () {
                var _0x24a40b = _0x3e1426;
                $(_0x22eb06)[_0x24a40b(0x23c)](_0x21508e);
            }, 0x5dc) : $(_0x22eb06)[_0x3e1426(0x23c)](_0x21508e);
        });
    }

    function _0x12c3d6() {
        var _0x4b5deb = _0xaad15e,
            _0x48f49a = [];
        if (_0x40a301 === 0x1) _0x48f49a = [_0x4b5deb(0x2de)];
        else {
            if (_0x40a301 === 0x2) _0x48f49a = [_0x4b5deb(0x19f)];
            else {
                if (_0x40a301 === 0x3) {
                    var _0x3a327a = ['#path-dropdown', _0x4b5deb(0x1c9), '#multi-select-ip', _0x4b5deb(0x1bf), _0x4b5deb(0x199), _0x4b5deb(0x301), '#FRNDLY_NAME'];
                    $(_0x4b5deb(0x110))[_0x4b5deb(0x23c)]() === 'VM' && _0x3a327a[_0x4b5deb(0x239)](_0x4b5deb(0x3af)), _0x48f49a = _0x3a327a;
                }
            }
        }
        if (_0x48f49a[_0x4b5deb(0xf7)] > 0x0) {
            var _0x4e8e91 = {};
            _0x48f49a[_0x4b5deb(0x1f1)](function (_0x8f1414) {
                var _0x340752 = _0x4b5deb,
                    _0x11aaed = $(_0x8f1414)[_0x340752(0x23c)]();
                _0x4e8e91[_0x8f1414] = _0x11aaed;
            }), _0x5c65fd[_0x40a301] = _0x4e8e91;
        } else delete _0x5c65fd[_0x40a301];
    }
    $(_0xaad15e(0x221))[_0xaad15e(0x160)](function () {
        if (_0x40a301 === 0x5) {
            if (!_0xf77c2b(_0x40a301)) {
                _0x461308();
                return;
            }
            saveModaldata();
        } else _0x5c8da8();
    }), $(_0xaad15e(0x26b))[_0xaad15e(0x160)](function () {
        _0xfb15a();
    }), $(document)['on']('click', _0xaad15e(0x2c1), function (_0x4da6a7) {
        var _0x1a12c6 = _0xaad15e;
        _0x4da6a7[_0x1a12c6(0x2ff)]();
        var _0x3bc6af = $(this)['data'](_0x1a12c6(0x3a6));
        if (_0x3bc6af < _0x40a301) _0xfb15a();
        else _0x3bc6af > _0x40a301 && _0x5c8da8();
    }), $(_0xaad15e(0xbb))['on'](_0xaad15e(0x152), function () {
        resetModal();
    });
}

function toggleServiceId() {
    var _0x3d3676 = _0x772837,
        _0xeab916 = $('#service-id'),
        _0x31a52e = $(_0x3d3676(0x2de))[_0x3d3676(0x23c)]();
    _0x31a52e === _0x3d3676(0x1d2) ? _0xeab916[_0x3d3676(0x140)]() : _0xeab916[_0x3d3676(0x25c)]();
}

function resetModal() {
    var _0x171019 = _0x772837;
    currentStep = 0x1, $(_0x171019(0x38a))['hide'](), $(_0x171019(0x29d))[_0x171019(0x140)](), $(_0x171019(0x26b))['hide'](), $('#nextButton')['html'](_0x171019(0x31a)), location[_0x171019(0x289)]();
}

function Switchlayer() {
    var _0x2cf4be = _0x772837;
    requestDataFromServer('Switcheslayer', {
        'csrfmiddlewaretoken': csfr_token
    }, _0x2cf4be(0xc5))[_0x2cf4be(0x390)](function (_0x3033a1) {
        var _0x20d006 = _0x2cf4be,
            _0x31b46d = JSON['parse'](_0x3033a1),
            _0x8d8bd4 = '<table\x20class=\x22table\x22>';
        _0x8d8bd4 += _0x20d006(0x326), _0x8d8bd4 += '<tbody>', _0x31b46d[_0x20d006(0x29a)] !== '' ? (_0x31b46d[_0x20d006(0x29a)][_0x20d006(0x1f1)](function (_0x1f7d5c) {
            var _0x14d114 = _0x20d006,
                _0x4933dd = _0x1f7d5c['layers'],
                _0x43780c = _0x4933dd[_0x14d114(0x10c)](/\s/g, '');
            _0x8d8bd4 += _0x14d114(0x8c), _0x8d8bd4 += _0x14d114(0x145) + _0x4933dd + '</td>', _0x8d8bd4 += _0x14d114(0x145) + _0x14d114(0x356) + _0x43780c + _0x14d114(0x232) + '</td>', _0x8d8bd4 += _0x14d114(0xe2);
        }), _0x8d8bd4 += _0x20d006(0x1a2), $(_0x20d006(0x35d))['html'](_0x8d8bd4)) : swal(_0x20d006(0xb3), '\x20', _0x20d006(0x312)), document['getElementById'](_0x20d006(0x3ab)) != null && (document['getElementById'](_0x20d006(0x3ab))[_0x20d006(0x248)] = gatewayswitch), document['getElementById'](_0x20d006(0x377)) != null && (document[_0x20d006(0x259)]('PublicSwitch')['textContent'] = publicswitch), document['getElementById']('ExchangeSwitch') != null && (document['getElementById'](_0x20d006(0x291))[_0x20d006(0x248)] = exchangeswitch);
    });
}

function firewalltype() {
    var _0x5da0e0 = _0x772837;
    requestDataFromServer(_0x5da0e0(0x1e9), {
        'csrfmiddlewaretoken': csfr_token
    }, _0x5da0e0(0xc5))[_0x5da0e0(0x390)](function (_0x4ff04f) {
        var _0x1a682e = _0x5da0e0;
        fireres = JSON['parse'](_0x4ff04f);
        var _0x3ec897 = _0x1a682e(0x2c3);
        _0x3ec897 += _0x1a682e(0x326), _0x3ec897 += '<tbody>', fireres[_0x1a682e(0x29a)] != '' ? (fireres[_0x1a682e(0x29a)][_0x1a682e(0x1f1)](function (_0x3ee505) {
            var _0x1c984a = _0x1a682e,
                _0x311192 = _0x3ee505['types'];
            flayering = _0x311192[_0x1c984a(0x10c)](/\s/g, ''), _0x3ec897 += '<tr>', _0x3ec897 += _0x1c984a(0x145) + _0x311192 + '</td>', _0x3ec897 += _0x1c984a(0x145) + _0x1c984a(0x356) + flayering + '\x22>0</p>' + _0x1c984a(0x1e6), _0x3ec897 += _0x1c984a(0xe2);
        }), _0x3ec897 += '</tbody></table>', $('#firewalltypelist')[_0x1a682e(0x33b)](_0x3ec897)) : swal(_0x1a682e(0x18a), '\x20', 'warning'), document[_0x1a682e(0x259)](_0x1a682e(0x28b)) != null && (document['getElementById']('Fortigate50E')[_0x1a682e(0x248)] = fortigate50E), document['getElementById'](_0x1a682e(0x3b1)) != null && (document[_0x1a682e(0x259)](_0x1a682e(0x3b1))[_0x1a682e(0x248)] = fortigate60E), document[_0x1a682e(0x259)](_0x1a682e(0x1f7)) != null && (document[_0x1a682e(0x259)](_0x1a682e(0x1f7))['textContent'] = fortigate60F), document[_0x1a682e(0x259)](_0x1a682e(0x1b6)) != null && (document[_0x1a682e(0x259)]('Fortigate80F')['textContent'] = fortigate80F), document[_0x1a682e(0x259)](_0x1a682e(0x1f8)) != null && (document[_0x1a682e(0x259)](_0x1a682e(0x1f8))[_0x1a682e(0x248)] = fortigate100E), document[_0x1a682e(0x259)](_0x1a682e(0x1e1)) != null && (document['getElementById'](_0x1a682e(0x1e1))[_0x1a682e(0x248)] = fortigate100F), document[_0x1a682e(0x259)]('Fortigate200F') != null && (document['getElementById'](_0x1a682e(0x137))['textContent'] = fortigate200F);
    });
}

function serverstype() {
    var _0x843f42 = _0x772837;
    requestDataFromServer(_0x843f42(0x192), {
        'csrfmiddlewaretoken': csfr_token
    }, _0x843f42(0xc5))['done'](function (_0x5362df) {
        var _0x86787e = _0x843f42;
        res = JSON[_0x86787e(0x11d)](_0x5362df);
        var _0x2b07eb = _0x86787e(0x2c3);
        _0x2b07eb += _0x86787e(0x326), _0x2b07eb += _0x86787e(0x2fe), res[_0x86787e(0x29a)] != '' ? (res[_0x86787e(0x29a)]['forEach'](function (_0x54c6ee) {
            var _0x53bed0 = _0x86787e;
            _0x2b07eb += '<tr>', _0x2b07eb += _0x53bed0(0x145) + _0x54c6ee[_0x53bed0(0x2d1)] + '</td>', _0x2b07eb += '<td>' + _0x53bed0(0x356) + _0x54c6ee[_0x53bed0(0x2d1)] + _0x53bed0(0x232) + _0x53bed0(0x1e6), _0x2b07eb += _0x53bed0(0xe2);
        }), _0x2b07eb += _0x86787e(0x1a2), $(_0x86787e(0xc6))['html'](_0x2b07eb)) : swal(_0x86787e(0x1ef), '\x20', _0x86787e(0x312)), document[_0x86787e(0x259)](_0x86787e(0x281)) != null && (document['getElementById'](_0x86787e(0x281))[_0x86787e(0x248)] = physicalser), document['getElementById']('VM') != null && (document[_0x86787e(0x259)]('VM')['textContent'] = virtualser);
    });
}

function routertype() {
    var _0x3ab0e7 = _0x772837;
    requestDataFromServer(_0x3ab0e7(0x14a), {
        'csrfmiddlewaretoken': csfr_token
    }, _0x3ab0e7(0xc5))[_0x3ab0e7(0x390)](function (_0x121f1f) {
        var _0xff63d1 = _0x3ab0e7;
        res = JSON['parse'](_0x121f1f);
        var _0x3d1a7c = _0xff63d1(0x2c3);
        _0x3d1a7c += _0xff63d1(0x326), _0x3d1a7c += _0xff63d1(0x2fe), res[_0xff63d1(0x29a)] != '' ? (res['data'][_0xff63d1(0x1f1)](function (_0x48406d) {
            var _0x44d5c1 = _0xff63d1;
            _0x3d1a7c += _0x44d5c1(0x8c), _0x3d1a7c += '<td>' + _0x48406d[_0x44d5c1(0x243)] + _0x44d5c1(0x1e6), _0x3d1a7c += '<td>' + '<p\x20class=\x22primary-text\x20bold-text\x20size18\x20mb-1\x22\x20id=\x22' + _0x48406d[_0x44d5c1(0x243)] + _0x44d5c1(0x232) + _0x44d5c1(0x1e6), _0x3d1a7c += _0x44d5c1(0xe2);
        }), _0x3d1a7c += _0xff63d1(0x1a2), $(_0xff63d1(0x97))['html'](_0x3d1a7c)) : swal('Routers\x27s\x20type\x20not\x20Added,\x20Please\x20check\x20Administrator', '\x20', _0xff63d1(0x312)), document['getElementById'](_0xff63d1(0x228)) != null && (document['getElementById']('router\x204321')[_0xff63d1(0x248)] = router4321);
    });
}

function toggleAddon() {
    var _0x3ffeeb = _0x772837,
        _0x32de8c = document['getElementById'](_0x3ffeeb(0x1da)),
        _0x4c8a6d = document[_0x3ffeeb(0x259)](_0x3ffeeb(0x19e));
    if (_0x32de8c[_0x3ffeeb(0xe0)]) {
        addonmodal(), _0x4c8a6d[_0x3ffeeb(0x1b4)]['display'] = 'block', toggleAddonCheckboxes();
        var _0x189734 = $(_0x3ffeeb(0x242))[_0x3ffeeb(0x23c)]();
        validationip = _0x189734, newonbipadd(_0x189734);
    } else _0x4c8a6d[_0x3ffeeb(0x1b4)][_0x3ffeeb(0x2e2)] = _0x3ffeeb(0x13e);
}

function toggleAddonCheckboxes() {
    var _0x3a97fd = _0x772837,
        _0x5e4b00 = $(_0x3a97fd(0x16e));
    _0x5e4b00[_0x3a97fd(0x1a9)](function () {
        var _0x344f58 = _0x3a97fd,
            _0x44f859 = $(this),
            _0x84c542 = _0x44f859['next'](_0x344f58(0xfc)),
            _0x711f2f = _0x84c542[_0x344f58(0x275)]()[_0x344f58(0x277)]();
        ['Fortigate', _0x344f58(0x1ab), _0x344f58(0xb9)][_0x344f58(0x33f)](_0x284d2a => selectkeyValue[_0x344f58(0x14b)](_0x284d2a)) && _0x711f2f === _0x344f58(0x198) || selectkeyValue === _0x344f58(0x281) && [_0x344f58(0x327), _0x344f58(0x21c), 'Node\x20Expo', _0x344f58(0xd1), _0x344f58(0x103)][_0x344f58(0x14b)](_0x711f2f) || selectkeyValue === 'VM' && [_0x344f58(0x283), _0x344f58(0x103), _0x344f58(0xd1)][_0x344f58(0x14b)](_0x711f2f) ? _0x44f859['parent']()[_0x344f58(0x140)]() : _0x44f859[_0x344f58(0x224)]()[_0x344f58(0x25c)]();
    });
}

function addonmodal() {
    var _0xfd1570 = _0x772837,
        _0x4ebde3 = [{
            'label': _0xfd1570(0x327),
            'modalId': _0xfd1570(0x314)
        }, {
            'label': _0xfd1570(0x21c),
            'modalId': _0xfd1570(0xd2)
        }, {
            'label': 'Node\x20Expo',
            'modalId': 'nodeModal'
        }, {
            'label': _0xfd1570(0xd1),
            'modalId': _0xfd1570(0x379)
        }, {
            'label': 'Nginx\x20Expo',
            'modalId': _0xfd1570(0x2b0)
        }, {
            'label': _0xfd1570(0x198),
            'modalId': _0xfd1570(0x139)
        }],
        _0xd4bf46 = $(_0xfd1570(0x342));
    _0xd4bf46[_0xfd1570(0x2c4)](), _0x4ebde3[_0xfd1570(0x1f1)](function (_0x2a444a) {
        var _0xef655a = _0xfd1570,
            _0x41eaa1 = _0xef655a(0x279) + _0x2a444a[_0xef655a(0xfc)][_0xef655a(0x10c)](/\s/g, '-')[_0xef655a(0x280)](),
            _0x56eefb = $(_0xef655a(0xcf), {
                'class': 'form-check-input',
                'type': _0xef655a(0x108),
                'value': '',
                'id': _0x41eaa1
            }),
            _0x164eff = $(_0xef655a(0x2dc), {
                'class': _0xef655a(0x21a),
                'for': _0x41eaa1,
                'text': _0x2a444a[_0xef655a(0xfc)]
            }),
            _0x131241 = $(_0xef655a(0xaa), {
                'class': 'form-check'
            })[_0xef655a(0x122)](_0x56eefb, _0x164eff);
        _0xd4bf46['append'](_0x131241), _0x2a444a['modalId'] && _0x56eefb['on']('change', function () {
            var _0x525a41 = _0xef655a,
                _0x4f8d67 = '#' + _0x2a444a[_0x525a41(0x1cf)];
            $(this)['is'](_0x525a41(0x147)) ? $(_0x4f8d67)[_0x525a41(0x2a6)](_0x525a41(0x140)) : $(_0x4f8d67)[_0x525a41(0x2a6)](_0x525a41(0x25c));
        });
    });
}

function toggleautomation() {
    var _0x3f57e4 = _0x772837,
        _0x3c234f = []['concat']($(_0x3f57e4(0x1bf))[_0x3f57e4(0x23c)]()),
        _0x451783 = []['concat']($(_0x3f57e4(0x242))[_0x3f57e4(0x23c)]()),
        _0x6a18de = _0x451783[_0x3f57e4(0x260)](_0x3c234f),
        _0x502315 = $(_0x3f57e4(0xeb));
    _0x502315['empty'](), _0x6a18de[_0x3f57e4(0x1f1)](function (_0x2b06a5) {
        var _0x5efa1e = _0x3f57e4,
            _0x5e7afa = $(_0x5efa1e(0xfb))[_0x5efa1e(0x23c)](_0x2b06a5)['on'](_0x5efa1e(0x1a6), function () {
                var _0xf852cf = _0x5efa1e,
                    _0x4a0ebc = $(this)[_0xf852cf(0x8d)](_0xf852cf(0x2f7))[_0xf852cf(0x241)](_0xf852cf(0x12b));
                $(this)['is'](_0xf852cf(0x147)) ? _0x4a0ebc[_0xf852cf(0x140)]() : _0x4a0ebc[_0xf852cf(0x25c)]();
            }),
            _0x7f8509 = '',
            _0x1ffbc2 = $(_0x5efa1e(0x2dc))[_0x5efa1e(0x122)](_0x5e7afa)[_0x5efa1e(0x122)](_0x2b06a5),
            _0x14a9f2 = $(_0x5efa1e(0x13d));
        _0x7f8509 += _0x5efa1e(0x167), _0x7f8509 += '<option\x20style=\x22color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;\x22\x20value=\x22\x22>secret1</option>', _0x7f8509 += '<option\x20style=\x22color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;\x22\x20value=\x22\x22>secret2</option>', _0x14a9f2['append'](_0x7f8509), _0x14a9f2[_0x5efa1e(0x25c)]();
        var _0xf8b926 = $('<div>')[_0x5efa1e(0x34b)]('row')[_0x5efa1e(0x122)]($(_0x5efa1e(0xaa))[_0x5efa1e(0x34b)](_0x5efa1e(0x159))['append'](_0x1ffbc2))[_0x5efa1e(0x122)]($(_0x5efa1e(0xaa))['addClass']('col-md-6')[_0x5efa1e(0x122)](_0x14a9f2));
        _0x502315['append'](_0xf8b926);
    });
    var _0xa3e8e9 = $(_0x3f57e4(0xdc));
    _0xa3e8e9[_0x3f57e4(0x18f)]('checked') ? _0x502315[_0x3f57e4(0x140)]() : _0x502315['hide']();
}
var selectedonbValue = '';

function nexticon() {
    var _0x3561de = _0x772837,
        _0x1842b4 = document[_0x3561de(0x259)](_0x3561de(0x284));
    selectedonbValue = _0x1842b4[_0x3561de(0x1a3)], document[_0x3561de(0x259)](_0x3561de(0x184))[_0x3561de(0x248)] = _0x3561de(0x271) + selectedonbValue + '\x20Type', onboarddevice(selectedonbValue);
}

function onboarddevice(_0x4e5a3a) {
    var _0x2663df = _0x772837,
        _0x12fa36 = _0x4e5a3a;

    function _0x2c3c54(_0x2ddf2b, _0x4a81b5, _0x2011ad) {
        var _0x4f72dd = _0x143e,
            _0x218ed5 = '';
        $(_0x4f72dd(0x19f))[_0x4f72dd(0x2c4)](), _0x218ed5 += _0x4f72dd(0x2a4), _0x2ddf2b != '' && (_0x2ddf2b[_0x4f72dd(0x1f1)](function (_0x1dcb94) {
            var _0x46a549 = _0x4f72dd;
            _0x218ed5 += _0x46a549(0x1c1) + _0x1dcb94[_0x4a81b5] + '\x22>' + _0x1dcb94[_0x2011ad] + '</option>';
        }), $(_0x4f72dd(0x19f))[_0x4f72dd(0x122)](_0x218ed5));
    }
    if (_0x12fa36 == _0x2663df(0x1d2)) requestDataFromServer(_0x2663df(0x192), {
        'csrfmiddlewaretoken': csfr_token
    }, _0x2663df(0xc5))['done'](function (_0x3c3588) {
        var _0xa599d9 = _0x2663df,
            _0x475bab = JSON['parse'](_0x3c3588);
        _0x2c3c54(_0x475bab[_0xa599d9(0x29a)], _0xa599d9(0x2d1), _0xa599d9(0x2d1));
    });
    else {
        if (_0x12fa36 == _0x2663df(0xc4)) requestDataFromServer(_0x2663df(0x1e9), {
            'csrfmiddlewaretoken': csfr_token
        }, _0x2663df(0xc5))['done'](function (_0x204011) {
            var _0x34295d = _0x2663df,
                _0x11b78e = JSON[_0x34295d(0x11d)](_0x204011);
            _0x2c3c54(_0x11b78e['data'], 'types', 'types');
        });
        else {
            if (_0x12fa36 == 'Switch') requestDataFromServer(_0x2663df(0x90), {
                'csrfmiddlewaretoken': csfr_token
            }, _0x2663df(0xc5))[_0x2663df(0x390)](function (_0x3a2b5d) {
                var _0x5eb732 = _0x2663df,
                    _0xda475f = JSON[_0x5eb732(0x11d)](_0x3a2b5d);
                _0x2c3c54(_0xda475f[_0x5eb732(0x29a)], 'layers', 'layers');
            });
            else _0x12fa36 == _0x2663df(0x17c) && requestDataFromServer(_0x2663df(0x14a), {
                'csrfmiddlewaretoken': csfr_token
            }, _0x2663df(0xc5))[_0x2663df(0x390)](function (_0x568ade) {
                var _0x116084 = _0x2663df,
                    _0xe2fdd4 = JSON['parse'](_0x568ade);
                _0x2c3c54(_0xe2fdd4[_0x116084(0x29a)], _0x116084(0x243), _0x116084(0x243));
            });
        }
    }
}

function nextdata() {
    var _0x35b236 = _0x772837,
        _0xcd0ca4 = document[_0x35b236(0x259)]('selectdevice'),
        _0x1f83f6 = _0xcd0ca4[_0x35b236(0x1a3)];
    gethostfile(_0x1f83f6), getIpAddress();
}

function gethostfile(_0x58f0f9) {
    var _0x2104c7 = _0x772837,
        _0x562a46 = _0x58f0f9;
    selectkeyValue = _0x562a46;
    var _0x4b85cd = '<option\x20selected\x20value=\x22' + _0x562a46 + '\x22>' + _0x562a46 + _0x2104c7(0x32a);
    $(_0x2104c7(0x110))[_0x2104c7(0x122)](_0x4b85cd), requestDataFromServer('getfilenames', {
        'fileName': hostPath
    }, 'GET')[_0x2104c7(0x390)](function (_0x298edd) {
        var _0x2d65ff = _0x2104c7,
            _0x1299d1 = JSON['parse'](_0x298edd);
        if (_0x1299d1[_0x2d65ff(0x37b)] == 0xc8) {
            var _0x18ea98 = generateHostOptions(_0x1299d1[_0x2d65ff(0x29a)], _0x562a46);
            $(_0x2d65ff(0x1c9))['empty']()['append'](_0x18ea98);
        }
    });
}

function generateHostOptions(_0x57b706, _0xa70843) {
    var _0x3efd4d = _0x772837,
        _0x43e953 = _0x3efd4d(0xdb),
        _0x4f2f9f = '',
        _0x4e3e37 = {
            'svrhostname': _0xa70843,
            'hahostname': _0xa70843[_0x3efd4d(0x101)]('-')[0x0],
            'publtypename': _0xa70843['replace']('\x20switch', ''),
            'firetypename': _0xa70843[_0x3efd4d(0x101)]('\x20')[0x1],
            'routertypename': _0xa70843[_0x3efd4d(0x101)]('\x20')[0x1],
            'gatetypename': _0xa70843[_0x3efd4d(0x10c)]('\x20Switch', '')
        },
        _0x55a416 = _0xa70843[_0x3efd4d(0x14b)](_0x3efd4d(0x1ab)) || _0xa70843[_0x3efd4d(0x14b)](_0x3efd4d(0x1d3)) || _0xa70843[_0x3efd4d(0x14b)](_0x3efd4d(0xb9)) ? _0x3efd4d(0x36a) : _0x3efd4d(0x22b);
    $(_0x3efd4d(0x151))[_0x3efd4d(0x29e)](_0x3efd4d(0x1b4), _0x55a416);
    var _0x34751d = _0xa70843 === 'VM' ? _0x3efd4d(0x22b) : _0x3efd4d(0x36a);
    return $('#PHYSICAL_IP')['attr'](_0x3efd4d(0x1b4), _0x34751d), _0x57b706[_0x3efd4d(0x1f1)](function (_0x53eb6e) {
        var _0x36d841 = _0x3efd4d;
        if (_0xa70843 === 'Physical' || _0xa70843 === 'VM') _0x4f2f9f = _0x53eb6e[_0x36d841(0x101)]('-')[0x0];
        else {
            if (_0xa70843 === _0x36d841(0x37e)) _0x4f2f9f = _0x53eb6e[_0x36d841(0x101)]('-')[0x0];
            else {
                if (_0xa70843 === _0x36d841(0x304)) _0x4f2f9f = _0x53eb6e[_0x36d841(0x101)]('-')[0x0];
                else {
                    if (_0xa70843 === _0x36d841(0x216)) _0x4f2f9f = _0x53eb6e['split']('-')[0x0];
                    else {
                        if (_0xa70843 === 'Fortigate\x2050E') _0x4f2f9f = _0x53eb6e[_0x36d841(0x101)]('-')[0x0];
                        else {
                            if (_0xa70843 === 'Fortigate\x2060E') _0x4f2f9f = _0x53eb6e[_0x36d841(0x101)]('-')[0x0];
                            else {
                                if (_0xa70843 === _0x36d841(0x358)) _0x4f2f9f = _0x53eb6e['split']('-')[0x0];
                                else {
                                    if (_0xa70843 === _0x36d841(0x2fc)) _0x4f2f9f = _0x53eb6e[_0x36d841(0x101)]('-')[0x0];
                                    else {
                                        if (_0xa70843 === _0x36d841(0x138)) _0x4f2f9f = _0x53eb6e['split']('-')[0x0];
                                        else {
                                            if (_0xa70843 === 'Fortigate\x20100F') _0x4f2f9f = _0x53eb6e[_0x36d841(0x101)]('-')[0x0];
                                            else {
                                                if (_0xa70843 === _0x36d841(0x104)) _0x4f2f9f = _0x53eb6e[_0x36d841(0x101)]('-')[0x0];
                                                else _0xa70843 === _0x36d841(0x228) && (_0x4f2f9f = _0x53eb6e[_0x36d841(0x101)]('-')[0x0]);
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
        isHostMatching(_0x53eb6e, _0x4e3e37) ? (_0x43e953 += _0x36d841(0xc3) + _0x53eb6e + _0x36d841(0x212) + _0x4f2f9f + _0x36d841(0x32a), $(_0x36d841(0x2a9))[_0x36d841(0x29e)]('style', _0x36d841(0x22b))) : $('#service-data-ip')[_0x36d841(0x29e)](_0x36d841(0x1b4), _0x36d841(0x36a));
    }), _0x43e953;
}

function isHostMatching(_0x18e1cc, _0x4c3621) {
    var _0x897243 = _0x772837;
    for (var _0x1d88bc in _0x4c3621) {
        if (_0x18e1cc[_0x897243(0x14b)](_0x4c3621[_0x1d88bc])) return !![];
    }
    return ![];
}

function hostselected(_0xd2be7a) {
    var _0x3c69aa = _0x772837;
    $('#ipaddress-details')[_0x3c69aa(0x29e)](_0x3c69aa(0x1b4), _0x3c69aa(0x143));
}

function ipaddrselected(_0x22c0b0) {
    var _0x40c7bf = _0x772837;
    $(_0x40c7bf(0x2bd))[_0x40c7bf(0x29e)]('style', _0x40c7bf(0x143));
}

function appselected(_0x1b841a) {
    var _0x443398 = _0x772837;
    $(_0x443398(0xda))[_0x443398(0x29e)](_0x443398(0x1b4), 'display:block\x20!important;padding-right:4%\x20!important;');
}

function getIpAddress() {
    var _0x29df8c = _0x772837;
    if (global_ip_addresses === undefined) requestDataFromServer(_0x29df8c(0x1e8), {}, _0x29df8c(0xc5))[_0x29df8c(0x390)](fillIPValues);
}

function fillIPValues(_0x176c33) {
    var _0x987208 = _0x772837;
    res = JSON['parse'](_0x176c33), res[_0x987208(0x37b)] == 0xc8 ? global_ip_addresses = res[_0x987208(0x29a)] : swal(_0x987208(0xf0), '\x20', _0x987208(0x217)), drawMultiplIPAddresses();
}

function drawIPAddresses(_0x344520, _0x5c83a4) {
    var _0x26c053 = _0x772837;
    if (global_ip_addresses !== undefined) {
        $(_0x344520)[_0x26c053(0x2c4)]();
        var _0x190a67 = '';
        _0x5c83a4 == _0x26c053(0x119) ? _0x190a67 += _0x26c053(0x203) + _0x5c83a4 + _0x26c053(0x32a) : _0x190a67 += _0x26c053(0x1aa) + _0x5c83a4 + '</option>', global_ip_addresses['forEach'](function (_0x37595b) {
            var _0x298ffd = _0x26c053,
                _0x16c42a = _0x37595b['ip'],
                _0x2b58f0 = registeredIPAddress[_0x298ffd(0x14b)](_0x16c42a),
                _0x2e16f2 = _0x2b58f0 ? 'disabled' : '',
                _0xf49381 = _0x2b58f0 ? _0x298ffd(0x385) : _0x298ffd(0x31c);
            _0x190a67 += _0x298ffd(0x126) + _0xf49381 + ';font-size:0.875rem;\x22\x20value=\x22' + _0x16c42a + '\x22\x20' + _0x2e16f2 + '>' + _0x16c42a + '</option>';
        }), $(_0x344520)[_0x26c053(0x122)](_0x190a67);
    }
}

function drawMultiplIPAddresses() {
    var _0xef3379 = _0x772837;
    drawIPAddresses('#multi-select-ip', _0xef3379(0x119)), $('#multipleIPAddressSelect')[_0xef3379(0x140)](), drawsubMultiplIPAddresses();
}

function drawsubMultiplIPAddresses() {
    var _0x2dc2f2 = _0x772837;
    drawIPAddresses('#sub-multi-select-ip', _0x2dc2f2(0x207)), registerMultiSelect(), getemailNames(), getApplicationNames();
}

function registerMultiSelect() {
    var _0x128075 = _0x772837;
    !registeredMultiSelect && (registeredMultiSelect = !![], $(_0x128075(0x1bf))[_0x128075(0x318)]({
        'placeholder': _0x128075(0x207),
        'filter': !![],
        'filterPlaceholder': _0x128075(0x2f1),
        'filterAcceptOnEnter': !![],
        'showClear': !![],
        'filterByDataLength': 0xa
    }));
}

function populateMultiSelect(_0x1abd31, _0x3b1efe, _0xc221bf) {
    var _0x298f6a = _0x772837,
        _0x5f23b5 = [][_0x298f6a(0x260)]($(_0x298f6a(0x1bf))['val']()),
        _0x17702f = [][_0x298f6a(0x260)]($(_0x298f6a(0x242))[_0x298f6a(0x23c)]()),
        _0x2d19b6 = _0x17702f['concat'](_0x5f23b5),
        _0x506029 = $('#' + _0x1abd31);
    _0x506029['empty']();
    var _0x46cebb = '<option\x20value=\x22\x22\x20disabled>' + _0x3b1efe + _0x298f6a(0x32a);
    _0x2d19b6['forEach'](function (_0x1ddab7) {
        var _0x511312 = _0x298f6a;
        _0x46cebb += _0x511312(0xc3) + _0x1ddab7 + '\x22>' + _0x1ddab7 + _0x511312(0x32a);
    }), _0x506029[_0x298f6a(0x122)](_0x46cebb), registermgmtMultiSelect(_0x1abd31, _0x3b1efe);
}

function registermgmtMultiSelect(_0x3a3e33, _0x1391ed) {
    var _0x4214ec = _0x772837,
        _0x57a35a = $('#' + _0x3a3e33);
    !_0x57a35a[_0x4214ec(0x303)](_0x4214ec(0x320)) && _0x57a35a[_0x4214ec(0x318)]({
        'placeholder': _0x1391ed,
        'filter': !![],
        'filterPlaceholder': _0x4214ec(0x2f1),
        'filterAcceptOnEnter': !![],
        'showClear': !![],
        'filterByDataLength': 0xa
    });
}

function iloipaddr() {
    var _0x57e258 = _0x772837;
    populateMultiSelect(_0x57e258(0x121), _0x57e258(0x3b5), 'iloipaddr');
}

function idracipaddr() {
    var _0x4f4d69 = _0x772837;
    populateMultiSelect(_0x4f4d69(0x290), _0x4f4d69(0x3b5), 'idracipaddr');
}

function nodeipaddr() {
    var _0xdb4d4d = _0x772837;
    populateMultiSelect(_0xdb4d4d(0xe3), _0xdb4d4d(0x3b5), 'nodeipaddr');
}

function nginxipaddr() {
    var _0x1b9873 = _0x772837;
    populateMultiSelect(_0x1b9873(0x8b), _0x1b9873(0x3b5), 'nginxipaddr');
}

function winipaddr() {
    var _0x3525e6 = _0x772837;
    populateMultiSelect(_0x3525e6(0x13f), _0x3525e6(0x3b5), _0x3525e6(0x18d));
}

function getemailNames() {
    var _0x38b27e = _0x772837,
        _0x5cb880 = new XMLHttpRequest();
    _0x5cb880['open']('GET', leurl + _0x38b27e(0x181), !![]), _0x5cb880[_0x38b27e(0x365)] = function () {
        var _0x47b514 = _0x38b27e;
        _0x5cb880[_0x47b514(0x3a1)] == 0x4 && (_0x5cb880[_0x47b514(0x37b)] == 0xc8 ? handleEmailNamesResponse(_0x5cb880[_0x47b514(0xb7)]) : swal(_0x47b514(0xb6), '\x20', _0x47b514(0x217)));
    }, _0x5cb880[_0x38b27e(0x341)]();
}

function handleEmailNamesResponse(_0x4e3566) {
    var _0x56e28b = _0x772837,
        _0x20fd5c = JSON['parse'](_0x4e3566);
    emailHtml = '', $(_0x56e28b(0x199))[_0x56e28b(0x2c4)](), _0x20fd5c[_0x56e28b(0x37b)] == 0xc8 ? (emailHtml += _0x56e28b(0x220), _0x20fd5c['data'][_0x56e28b(0x1f1)](function (_0x5729a8) {
        var _0x16fa1e = _0x56e28b;
        _0x5729a8[_0x16fa1e(0x389)] !== _0x16fa1e(0x150) && (emailLists['push'](_0x5729a8[_0x16fa1e(0x389)]), emailHtml += '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22' + _0x5729a8[_0x16fa1e(0x389)] + '\x22>' + _0x5729a8[_0x16fa1e(0x389)] + _0x16fa1e(0x32a));
    }), $(_0x56e28b(0x199))[_0x56e28b(0x122)](emailHtml)) : swal(_0x56e28b(0xb6), '\x20', _0x56e28b(0x217));
}

function getApplicationNames() {
    var _0x219d90 = _0x772837;
    if (applicationNames[_0x219d90(0xf7)] === 0x0) {
        var _0xb466fe = new XMLHttpRequest();
        _0xb466fe[_0x219d90(0x34a)](_0x219d90(0xc5), leurl + _0x219d90(0xd3), !![]), _0xb466fe['setRequestHeader']('Content-Type', _0x219d90(0x2df)), _0xb466fe[_0x219d90(0x365)] = function () {
            var _0x1e4338 = _0x219d90;
            _0xb466fe['readyState'] == 0x4 && (_0xb466fe[_0x1e4338(0x37b)] == 0xc8 ? handleApplicationNamesResponse(_0xb466fe[_0x1e4338(0xb7)]) : console[_0x1e4338(0x217)](_0x1e4338(0x28d), _0xb466fe['statusText']));
        }, _0xb466fe[_0x219d90(0x341)]();
    }
}

function _0x143e(_0x14c933, _0x5be729) {
    var _0x1b3945 = _0x1b39();
    return _0x143e = function (_0x143e71, _0x28bb0b) {
        _0x143e71 = _0x143e71 - 0x88;
        var _0x5a4a4a = _0x1b3945[_0x143e71];
        return _0x5a4a4a;
    }, _0x143e(_0x14c933, _0x5be729);
}

function handleApplicationNamesResponse(_0x3821c9) {
    var _0x3ef044 = _0x772837;
    res = JSON[_0x3ef044(0x11d)](_0x3821c9);
    var _0x1bcacc = '\x20';
    $(_0x3ef044(0x301))[_0x3ef044(0x13b)](_0x3ef044(0x230))[_0x3ef044(0xf7)] == 0x0 && (_0x1bcacc = _0x3ef044(0x109)), res[_0x3ef044(0x37b)] == 0xc8 ? res['data'][_0x3ef044(0x1f1)](function (_0x2e0552) {
        var _0x585abb = _0x3ef044;
        applicationNames[_0x585abb(0x239)](_0x2e0552['applicationname']), !$(_0x585abb(0x360) + _0x2e0552[_0x585abb(0x2e3)] + ']')['length'] > 0x0 && (_0x1bcacc += '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22' + _0x2e0552['applicationname'] + '\x22>' + _0x2e0552[_0x585abb(0x2e3)] + _0x585abb(0x32a));
    }) : swal(_0x3ef044(0xd7), '\x20', _0x3ef044(0x217)), $(_0x3ef044(0x301))['append'](_0x1bcacc);
}

function saveapplication() {
    var _0x14e569 = _0x772837;
    if ($('#applicationname')[_0x14e569(0x23c)]() == '') return ![];
    else {
        var _0x4c78dd = {};
        _0x4c78dd[_0x14e569(0x2e3)] = $(_0x14e569(0x19c))['val'](), _0x4c78dd[_0x14e569(0x386)] = _0x14e569(0x30b), _0x4c78dd[_0x14e569(0x17a)] = 0x1, requestData[_0x14e569(0x29a)] = _0x4c78dd;
        var _0x2573e7 = new XMLHttpRequest();
        _0x2573e7[_0x14e569(0x34a)]('POST', leurl + _0x14e569(0x15a), !![]), _0x2573e7[_0x14e569(0x31f)](_0x14e569(0x2b5), 'application/json'), _0x2573e7[_0x14e569(0x365)] = function () {
            var _0x43d2fb = _0x14e569;
            _0x2573e7['readyState'] == 0x4 && (_0x2573e7[_0x43d2fb(0x37b)] == 0xc8 ? applicationResponse(JSON[_0x43d2fb(0x11d)](_0x2573e7[_0x43d2fb(0xb7)])) : $(_0x43d2fb(0x2f0))['html'](_0x43d2fb(0x263)));
        }, _0x2573e7['send'](JSON['stringify']({
            'clientData': requestData,
            'csrfmiddlewaretoken': csfr_token
        }));
    }
}

function applicationResponse(_0x3cb713) {
    var _0x293928 = _0x772837;
    if (_0x3cb713 && _0x3cb713[_0x293928(0x37b)] == 0x1f4) $('#error-application')[_0x293928(0x33b)](_0x3cb713[_0x293928(0x91)]);
    else {
        data = requestData[_0x293928(0x29a)], data[_0x293928(0x2e3)], applicationNames[_0x293928(0x239)](data['applicationname']);
        if ($(_0x293928(0x301))['is'](_0x293928(0xa1))) {
            var _0x202681 = $(_0x293928(0x301))[_0x293928(0x23c)](),
                _0x55df50 = '\x20';
            _0x55df50 += '<option\x20value=\x22' + data['applicationname'] + '\x22>' + data['applicationname'] + _0x293928(0x32a), $(_0x293928(0x301))[_0x293928(0x122)](_0x55df50);
            if (_0x202681 !== null && _0x202681 !== '') $(_0x293928(0x301))['val'](_0x202681);
            else $(_0x293928(0x301))[_0x293928(0x23c)](data[_0x293928(0x2e3)]);
        }
        swal(_0x3cb713[_0x293928(0x91)], '\x20', _0x293928(0x188)), $(_0x293928(0x158))[_0x293928(0x2a6)]('toggle');
    }
}

function toggleservice() {
    var _0x495132 = _0x772837,
        _0x4c7b4e = document[_0x495132(0x259)](_0x495132(0xa5)),
        _0x59a85f = document[_0x495132(0x259)](_0x495132(0x231));
    _0x4c7b4e['checked'] ? (getservicefile(), _0x59a85f['style'][_0x495132(0x2e2)] = _0x495132(0x1fb)) : _0x59a85f[_0x495132(0x1b4)][_0x495132(0x2e2)] = _0x495132(0x13e);
}

function getservicefile() {
    var _0x2f5a0a = _0x772837;
    requestDataFromServer(_0x2f5a0a(0x1cd), {
        'fileName': hostPath
    }, _0x2f5a0a(0xc5))[_0x2f5a0a(0x390)](function (_0xc9aec3) {
        var _0xccfc15 = _0x2f5a0a;
        res = JSON['parse'](_0xc9aec3);
        if (res[_0xccfc15(0x37b)] == 0xc8) {
            var _0x2b614b = generateCheckboxes(res[_0xccfc15(0x29a)], _0xccfc15(0xba), _0xccfc15(0x231));
            $('#services-dropdown')[_0xccfc15(0x2c4)]()[_0xccfc15(0x122)](_0x2b614b);
        }
    });
}

function generateCheckboxes(_0xeb7ae2, _0x2b300a, _0x2cc80d) {
    var _0x1b241b = '';
    return _0xeb7ae2['forEach'](function (_0x5f7ddf) {
        var _0x56e7f6 = _0x143e;
        if (_0x5f7ddf['includes'](_0x2b300a)) {
            var _0x2eb60c = _0x5f7ddf[_0x56e7f6(0x10c)](_0x2b300a, '')['replace'](_0x56e7f6(0x282), ''),
                _0x5a3aa9 = _0x56e7f6(0x279) + _0x2eb60c[_0x56e7f6(0x10c)](/\s/g, '-')['toLowerCase'](),
                _0x3ff889 = _0x56e7f6(0x396) + _0x5a3aa9 + '\x22><label\x20class=\x22form-check-label\x22\x20for=\x22' + _0x5a3aa9 + '\x22>' + _0x2eb60c + '</label></div>';
            _0x1b241b += _0x3ff889;
        }
    }), _0x1b241b;
}

function toggleUploadForm() {
    var _0x1fcb6d = _0x772837,
        _0x1d911f = document[_0x1fcb6d(0x259)](_0x1fcb6d(0xb2)),
        _0x2b920f = document[_0x1fcb6d(0x259)](_0x1fcb6d(0xe5));
    _0x1d911f[_0x1fcb6d(0x1b4)]['display'] === _0x1fcb6d(0x13e) ? (_0x1d911f[_0x1fcb6d(0x1b4)][_0x1fcb6d(0x2e2)] = _0x1fcb6d(0x1fb), _0x2b920f[_0x1fcb6d(0x1b4)]['display'] = 'block') : _0x1d911f[_0x1fcb6d(0x1b4)][_0x1fcb6d(0x2e2)] = _0x1fcb6d(0x13e), importonbdata();
}

function saveFormData() {
    var _0x100c0e = _0x772837,
        _0x5b239c = {};
    _0x5b239c['selectModaldetails'] = {
        'pathhost': $(_0x100c0e(0x110))[_0x100c0e(0x23c)](),
        'hostname': $(_0x100c0e(0x1c9))[_0x100c0e(0x23c)]()[_0x100c0e(0x10c)](_0x100c0e(0x2dd), '')
    }, _0x5b239c[_0x100c0e(0x21b)] = {
        'ipAddress': $(_0x100c0e(0x242))['val'](),
        'subIpAddress': String($(_0x100c0e(0x1bf))['val']())[_0x100c0e(0x101)](',')
    }, _0x5b239c[_0x100c0e(0x208)] = {
        'Email': $('#REUSABLE_EMAIL')['val'](),
        'ApplicationName': $(_0x100c0e(0x301))[_0x100c0e(0x23c)]()
    }, _0x5b239c[_0x100c0e(0x11a)] = {
        'FriendlyName': $(_0x100c0e(0x267))[_0x100c0e(0x23c)](),
        'physicalIP': $(_0x100c0e(0x3af))[_0x100c0e(0x23c)]()
    }, _0x5b239c[_0x100c0e(0xaf)] = {
        'service': $(_0x100c0e(0x23e))[_0x100c0e(0x23c)]()
    };
    var _0x55865b = '';
    for (var _0x57645f in _0x5b239c) {
        for (var _0x34cb78 in _0x5b239c[_0x57645f]) {
            _0x55865b += _0x100c0e(0xf3) + _0x34cb78 + '</td><td>&nbsp;&nbsp;&nbsp;&nbsp;' + _0x5b239c[_0x57645f][_0x34cb78] + '</td></tr>';
        }
    }
    $(_0x100c0e(0x1df))[_0x100c0e(0x33b)]('<table\x20style=\x22width:100%\x22>' + _0x55865b + _0x100c0e(0x11e));
}

function saveModaldata() {
    var _0x3f9b6e = _0x772837,
        _0x5a86e0 = $(_0x3f9b6e(0x10b))['serializeArray'](),
        _0x660028 = {},
        _0x267bc7 = ![],
        _0x15c426 = ![];
    _0x5a86e0['forEach'](function (_0x397da1) {
        var _0x421d16 = _0x3f9b6e;
        if (_0x397da1[_0x421d16(0xd0)] === 'HOST_TEMPLATE') _0x267bc7 = !![];
        else _0x397da1['name'] === _0x421d16(0x14e) && (_0x15c426 = !![]);
        _0x660028[_0x397da1[_0x421d16(0xd0)]] ? Array['isArray'](_0x660028[_0x397da1[_0x421d16(0xd0)]]) ? _0x660028[_0x397da1['name']][_0x421d16(0x239)](_0x397da1[_0x421d16(0x1a3)]) : _0x660028[_0x397da1[_0x421d16(0xd0)]] = [_0x660028[_0x397da1['name']], _0x397da1[_0x421d16(0x1a3)]] : _0x660028[_0x397da1[_0x421d16(0xd0)]] = _0x397da1[_0x421d16(0x1a3)];
    });
    !_0x267bc7 && (_0x660028[_0x3f9b6e(0x255)] = $(_0x3f9b6e(0x1c9))[_0x3f9b6e(0x23c)]());
    !_0x15c426 && (_0x660028[_0x3f9b6e(0x14e)] = $('#multi-select-ip')['val']()[_0x3f9b6e(0x260)]($(_0x3f9b6e(0x1bf))[_0x3f9b6e(0x23c)]()));
    _0x660028[_0x3f9b6e(0x370)] = '';
    var _0x1163da = {};
    _0x1163da['isedit'] = isEdit, _0x1163da[_0x3f9b6e(0x295)] = _0x660028, _0x1163da[_0x3f9b6e(0x3ae)] = $(_0x3f9b6e(0x1c9))[_0x3f9b6e(0x23c)](), _0x1163da[_0x3f9b6e(0x35c)] = $(_0x3f9b6e(0x110))[_0x3f9b6e(0x23c)](), _0x1163da[_0x3f9b6e(0x2c6)] = $(_0x3f9b6e(0x242))[_0x3f9b6e(0x23c)](), _0x1163da['subIpAddress'] = $(_0x3f9b6e(0x1bf))[_0x3f9b6e(0x23c)](), _0x1163da[_0x3f9b6e(0x209)] = [_0x1163da['ipAddress']][_0x3f9b6e(0x260)](_0x1163da['subIpAddress']), _0x1163da[_0x3f9b6e(0xec)] = $('#REUSABLE_EMAIL')[_0x3f9b6e(0x23c)](), _0x1163da[_0x3f9b6e(0x20e)] = $(_0x3f9b6e(0x301))[_0x3f9b6e(0x23c)](), _0x1163da[_0x3f9b6e(0x362)] = $(_0x3f9b6e(0x267))[_0x3f9b6e(0x23c)]();
    _0x1163da[_0x3f9b6e(0x35c)] == 'VM' ? _0x1163da[_0x3f9b6e(0x24d)] = $(_0x3f9b6e(0x3af))['val']() : _0x1163da['physicalIP'] = '';
    _0x1163da[_0x3f9b6e(0xa2)] = $(_0x3f9b6e(0x23e))['val'](), _0x1163da[_0x3f9b6e(0x398)] = ilomgmt_list, _0x1163da[_0x3f9b6e(0x28e)] = idrac_list, _0x1163da[_0x3f9b6e(0x111)] = nodemgmt_list, _0x1163da['winmgmt'] = winmgmt_list, _0x1163da['ngnixmgmt'] = ngnixmgmt_list, console[_0x3f9b6e(0x330)](_0x3f9b6e(0xe9) + JSON[_0x3f9b6e(0x1bd)](_0x1163da));
    var _0x2de229 = new XMLHttpRequest();
    _0x2de229['open'](_0x3f9b6e(0x227), leurl + 'allonboard/Saveonboard', !![]), _0x2de229[_0x3f9b6e(0x31f)](_0x3f9b6e(0x2b5), _0x3f9b6e(0x30c)), _0x2de229[_0x3f9b6e(0x31f)](_0x3f9b6e(0x169), csfr_token), _0x2de229['onreadystatechange'] = function () {
        var _0x1ab766 = _0x3f9b6e;
        _0x2de229[_0x1ab766(0x3a1)] == 0x4 && (_0x2de229[_0x1ab766(0x37b)] == 0xc8 ? (console[_0x1ab766(0x330)]('xhr.responseText---->' + _0x2de229[_0x1ab766(0xb7)]), handleFileCreationResponse(_0x2de229[_0x1ab766(0xb7)])) : console['error']('Failed\x20to\x20save\x20data:\x20' + _0x2de229[_0x1ab766(0x23f)]));
    };
    var _0x3f94de = _0x3f9b6e(0x2a7) + encodeURIComponent(JSON['stringify'](_0x1163da)) + _0x3f9b6e(0x39d) + encodeURIComponent(csfr_token);
    _0x2de229[_0x3f9b6e(0x341)](_0x3f94de);
}

function handleFileCreationResponse(_0x3450b4) {
    var _0x452fdf = _0x772837;
    res = JSON['parse'](_0x3450b4), res['status'] == 0xc8 ? swal({
        'title': res[_0x452fdf(0x29a)],
        'type': _0x452fdf(0x188),
        'confirmButtonClass': 'btn-success',
        'confirmButtonText': 'OK'
    }, function (_0x51fde9) {
        var _0x3b6dbf = _0x452fdf;
        _0x51fde9 && parent[_0x3b6dbf(0x25f)][_0x3b6dbf(0x22f)][_0x3b6dbf(0x289)](!![]);
    }) : swal({
        'title': res[_0x452fdf(0x29a)],
        'text': '\x20',
        'type': _0x452fdf(0x217),
        'confirmButtonClass': _0x452fdf(0x27e),
        'confirmButtonText': 'OK'
    }, function (_0x593d3a) {
        var _0x206052 = _0x452fdf;
        _0x593d3a && location[_0x206052(0x289)]();
    });
}

function tablenewonb() {
    var _0x298d5d = _0x772837,
        _0xd2e2f6 = new XMLHttpRequest(),
        _0x39240d = leurl + 'allonboard/newonbtable';
    _0xd2e2f6[_0x298d5d(0x34a)]('GET', _0x39240d, !![]), _0xd2e2f6[_0x298d5d(0x31f)](_0x298d5d(0x2b5), _0x298d5d(0x9d)), _0xd2e2f6['onload'] = function () {
        var _0x11c2b7 = _0x298d5d;
        if (_0xd2e2f6[_0x11c2b7(0x37b)] >= 0xc8 && _0xd2e2f6['status'] < 0x12c) {
            var _0x52eef7 = JSON[_0x11c2b7(0x11d)](_0xd2e2f6[_0x11c2b7(0xb7)]),
                _0x35b2d0 = calculateHostCounts(_0x52eef7['data']);
            updateElementText('totalswitch', _0x35b2d0['switches']), updateElementText('totalServers', _0x35b2d0[_0x11c2b7(0x144)]), updateElementText(_0x11c2b7(0x15f), _0x35b2d0['firewalls']), updateElementText(_0x11c2b7(0x15c), _0x35b2d0[_0x11c2b7(0x1bb)]);
        } else console['error']('Request\x20failed\x20with\x20status:', _0xd2e2f6[_0x11c2b7(0x37b)]);
    }, _0xd2e2f6['onerror'] = function () {
        var _0x2a64ef = _0x298d5d;
        console[_0x2a64ef(0x217)]('Request\x20failed');
    }, _0xd2e2f6[_0x298d5d(0x341)]();
}

function calculateHostCounts(_0x46b054) {
    var _0x1e7ed2 = _0x772837,
        _0x46b6df = {
            'switches': 0x0,
            'servers': 0x0,
            'firewalls': 0x0,
            'routers': 0x0
        };
    return _0x46b054[_0x1e7ed2(0x1f1)](function (_0x587e93) {
        var _0x34e732 = _0x1e7ed2;
        registeredIPAddress[_0x34e732(0x239)](_0x587e93[_0x34e732(0x229)]);
        switch (_0x587e93[_0x34e732(0x35c)]) {
            case _0x34e732(0x281):
                physicalser++, _0x46b6df[_0x34e732(0x144)]++;
                break;
            case 'VM':
                virtualser++, _0x46b6df[_0x34e732(0x144)]++;
                break;
            case _0x34e732(0x304):
                publicswitch++, _0x46b6df[_0x34e732(0x313)]++;
                break;
            case _0x34e732(0x37e):
                gatewayswitch++, _0x46b6df[_0x34e732(0x313)]++;
                break;
            case _0x34e732(0x216):
                exchangeswitch++, _0x46b6df[_0x34e732(0x313)]++;
                break;
            case _0x34e732(0xf4):
                fortigate50E++, _0x46b6df[_0x34e732(0x1b9)]++;
                break;
            case 'Fortigate\x2060E':
                fortigate60E++, _0x46b6df[_0x34e732(0x1b9)]++;
                break;
            case _0x34e732(0x358):
                fortigate60F++, _0x46b6df['firewalls']++;
                break;
            case 'Fortigate\x2080F':
                fortigate80F++, _0x46b6df['firewalls']++;
                break;
            case _0x34e732(0x138):
                fortigate100E++, _0x46b6df[_0x34e732(0x1b9)]++;
                break;
            case _0x34e732(0x32d):
                fortigate100F++, _0x46b6df['firewalls']++;
                break;
            case _0x34e732(0x104):
                fortigate200F++, _0x46b6df[_0x34e732(0x1b9)]++;
                break;
            case 'router\x204321':
                router4321++, _0x46b6df[_0x34e732(0x1bb)]++;
                break;
        }
    }), _0x46b6df;
}

function updateElementText(_0x9ae14b, _0x57d16a) {
    var _0x382aca = _0x772837,
        _0x1885d7 = document[_0x382aca(0x259)](_0x9ae14b);
    _0x57d16a !== '' ? _0x1885d7[_0x382aca(0x248)] = _0x57d16a : _0x1885d7['textContent'] = 0x0;
}

function mgmttype(_0x2f49c5) {
    var _0x33fef1 = _0x772837;
    $(_0x33fef1(0x1be))[_0x33fef1(0x2c4)]();
    var _0x13f481 = '';
    _0x2f49c5 == _0x33fef1(0x251) && (_0x13f481 += _0x33fef1(0xf5), _0x13f481 += _0x33fef1(0x2b4), _0x13f481 += _0x33fef1(0x190), _0x13f481 += _0x33fef1(0xdd), _0x13f481 += '</select>', _0x13f481 += _0x33fef1(0x8f), _0x13f481 += '<span\x20class=\x22error-msg\x22\x20id=\x22server-ip-error-msg\x22\x20style=\x22color:#ff9eac\x22>\x20</span>', _0x13f481 += _0x33fef1(0x8f), _0x13f481 += _0x33fef1(0x24c), _0x13f481 += _0x33fef1(0x16f), _0x13f481 += _0x33fef1(0x256), _0x13f481 += _0x33fef1(0xb8), _0x13f481 += _0x33fef1(0x8f), _0x13f481 += _0x33fef1(0x1e2), _0x13f481 += _0x33fef1(0xce), _0x13f481 += _0x33fef1(0x133), _0x13f481 += _0x33fef1(0x36f), _0x13f481 += '<span\x20class=\x22error-msg\x22\x20id=\x22password-error-msg\x22>\x20</span>', _0x13f481 += _0x33fef1(0x8f), _0x13f481 += _0x33fef1(0x24c), _0x13f481 += _0x33fef1(0x316), _0x13f481 += _0x33fef1(0xad), _0x13f481 += '<span\x20class=\x22error-msg\x22\x20id=\x22ilo-error-msg\x22>\x20</span>', _0x13f481 += '</div>', _0x13f481 += _0x33fef1(0x185), _0x13f481 += _0x33fef1(0x373), _0x13f481 += _0x33fef1(0x30a), _0x13f481 += _0x33fef1(0x2d4), _0x13f481 += _0x33fef1(0x8f), _0x13f481 += _0x33fef1(0x30a), _0x13f481 += _0x33fef1(0x1e0), _0x13f481 += _0x33fef1(0x8f), _0x13f481 += '<div\x20class=\x22\x22\x20id=\x22valid_row\x22></div>', _0x13f481 += _0x33fef1(0x8f)), $(_0x33fef1(0x1be))[_0x33fef1(0x122)](_0x13f481), iloipaddr();
}

function myFunctionpass() {
    var _0x288036 = _0x772837,
        _0x5450be = document[_0x288036(0x259)](_0x288036(0x17e));
    _0x5450be['type'] === _0x288036(0x250) ? ($(_0x288036(0x375))[_0x288036(0x2e6)](_0x288036(0x310)), _0x5450be[_0x288036(0x222)] = _0x288036(0x275)) : ($(_0x288036(0x375))[_0x288036(0x2e6)](_0x288036(0x310)), _0x5450be[_0x288036(0x222)] = _0x288036(0x250));
}

function validatesInputs(_0x4f63b6) {
    var _0x5552d9 = _0x772837,
        _0x5f1119 = checkAllfeildsfilled(_0x4f63b6);
    const _0x5611e6 = [{
        'id': _0x5552d9(0x3a0),
        'label': _0x5552d9(0x9e),
        'errorMsg': _0x5552d9(0xb1),
        'value': _0x5552d9(0x38f)
    }, {
        'id': _0x5552d9(0x17e),
        'label': _0x5552d9(0x3b4),
        'errorMsg': 'password-error-msg',
        'value': _0x5552d9(0x1d9)
    }, {
        'id': _0x5552d9(0x32b),
        'label': _0x5552d9(0xc2),
        'errorMsg': _0x5552d9(0x17d),
        'value': _0x5552d9(0xa8)
    }, {
        'id': _0x5552d9(0x121),
        'label': _0x5552d9(0x2e1),
        'errorMsg': 'server-ip-error-msg',
        'value': ''
    }];
    let _0x1bb5b6 = ![];
    for (let _0x48f54d = 0x0; _0x48f54d < _0x5611e6[_0x5552d9(0xf7)]; _0x48f54d++) {
        const _0x2f0b20 = _0x5611e6[_0x48f54d],
            _0x23fb64 = document[_0x5552d9(0x259)](_0x2f0b20['id']);
        _0x23fb64[_0x5552d9(0x1a3)] === _0x2f0b20[_0x5552d9(0x1a3)] ? (document['getElementById'](_0x2f0b20[_0x5552d9(0x142)])['textContent'] = 'Field\x20cannot\x20be\x20empty', document[_0x5552d9(0x259)](_0x2f0b20[_0x5552d9(0xfc)])[_0x5552d9(0x1b4)]['color'] = _0x5552d9(0x2aa), _0x1bb5b6 = !![]) : document[_0x5552d9(0x259)](_0x2f0b20[_0x5552d9(0x142)])[_0x5552d9(0x248)] = '';
    }
    return _0x5f1119;
    return !_0x1bb5b6;
}

function sendiloDataToServer() {
    var _0x3e403a = _0x772837;
    ilomgmt_list = [];
    var _0x1ace63 = {};
    _0x1ace63[_0x3e403a(0x328)] = isEdit, _0x1ace63[_0x3e403a(0x324)] = $(_0x3e403a(0x1a0))['val'](), _0x1ace63['username'] = $('#CreateMgmt\x20#user_name')[_0x3e403a(0x23c)](), _0x1ace63[_0x3e403a(0x250)] = $(_0x3e403a(0x35e))[_0x3e403a(0x23c)](), _0x1ace63[_0x3e403a(0x2c5)] = $(_0x3e403a(0x200))[_0x3e403a(0x23c)](), _0x1ace63[_0x3e403a(0x2bf)] = '', _0x1ace63[_0x3e403a(0x1f3)] = $(_0x3e403a(0x254))[_0x3e403a(0x23c)](), _0x1ace63[_0x3e403a(0xac)] = '', ilomgmt_list[_0x3e403a(0x239)](_0x1ace63), swal(_0x3e403a(0x213), '\x20', _0x3e403a(0x188)), $(_0x3e403a(0x2bc))[_0x3e403a(0x29e)](_0x3e403a(0x35b), 'modal');
}

function verifyiloServer() {
    var _0x6705f7 = _0x772837,
        _0x9503e8 = validatesInputs(_0x6705f7(0x18e)),
        _0x37cbb2 = $(_0x6705f7(0x254))['val']();
    if (_0x9503e8 == !![] && _0x37cbb2 && _0x37cbb2[_0x6705f7(0xf7)] > 0x0) {
        var _0xde7c5b = {};
        _0xde7c5b[_0x6705f7(0x328)] = isEdit, _0xde7c5b['prototype'] = $(_0x6705f7(0x1a0))[_0x6705f7(0x23c)](), _0xde7c5b[_0x6705f7(0x387)] = $(_0x6705f7(0x238))['val'](), _0xde7c5b[_0x6705f7(0x250)] = $(_0x6705f7(0x35e))[_0x6705f7(0x23c)](), _0xde7c5b[_0x6705f7(0x2c5)] = $(_0x6705f7(0x200))[_0x6705f7(0x23c)](), _0xde7c5b['ip'] = validationip, _0xde7c5b[_0x6705f7(0x1f3)] = _0x37cbb2, ilomgmt_list[_0x6705f7(0x239)](_0xde7c5b), requestDataFromServer(_0x6705f7(0x210), {
            'data': JSON[_0x6705f7(0x1bd)](_0xde7c5b),
            'csrfmiddlewaretoken': csfr_token
        }, _0x6705f7(0x227))[_0x6705f7(0x390)](ilovalidResponse);
    } else swal(_0x6705f7(0x219), '\x20', _0x6705f7(0x217));
}

function ilovalidResponse(_0x5f4d8d) {
    var _0x54b922 = _0x772837;
    res = JSON[_0x54b922(0x11d)](_0x5f4d8d), $('#valid_row')[_0x54b922(0x2c4)](), $('.loader')['hide']();
    if (res['result'] == !![]) {
        const _0x20893c = document[_0x54b922(0x259)](_0x54b922(0x19a));
        _0x20893c[_0x54b922(0x1f2)](_0x54b922(0x11f), 'sendiloDataToServer()'), _0x20893c[_0x54b922(0x26e)] = 'Add';
        var _0x9d00d4 = '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#00ff00;\x22>Success\x20in\x20Validation...</p>';
        $(_0x54b922(0x1eb))['append'](_0x9d00d4), setTimeout(function () {
            var _0xef97b8 = _0x54b922;
            $(_0xef97b8(0x1eb))['empty']();
        }, 0xbb8), $(_0x54b922(0x14d))[_0x54b922(0x18f)](_0x54b922(0x173), !![]), $('#user_name')[_0x54b922(0x18f)](_0x54b922(0x173), !![]), $(_0x54b922(0x13a))[_0x54b922(0x18f)](_0x54b922(0x173), !![]), $(_0x54b922(0x9b))[_0x54b922(0x18f)]('disabled', !![]);
    } else {
        if (res['result'] == ![]) {
            var _0x9d00d4 = _0x54b922(0x244);
            $(_0x54b922(0x1eb))[_0x54b922(0x122)](_0x9d00d4), setTimeout(function () {
                var _0x3a9e38 = _0x54b922;
                $(_0x3a9e38(0x1eb))[_0x3a9e38(0x2c4)]();
            }, 0xbb8);
        }
    }
}

function idractype(_0x15405e) {
    var _0x3fe998 = _0x772837;
    $(_0x3fe998(0x16c))['empty']();
    var _0x4c9e58 = '';
    _0x15405e == _0x3fe998(0xe6) && (_0x4c9e58 += _0x3fe998(0xf5), _0x4c9e58 += _0x3fe998(0x24e), _0x4c9e58 += _0x3fe998(0x26a), _0x4c9e58 += _0x3fe998(0x394), _0x4c9e58 += _0x3fe998(0xd4), _0x4c9e58 += '</div>', _0x4c9e58 += _0x3fe998(0x30e), _0x4c9e58 += '</div>', _0x4c9e58 += _0x3fe998(0x24c), _0x4c9e58 += _0x3fe998(0x176), _0x4c9e58 += _0x3fe998(0x2f9), _0x4c9e58 += _0x3fe998(0x1f4), _0x4c9e58 += _0x3fe998(0x8f), _0x4c9e58 += '<br>', _0x4c9e58 += _0x3fe998(0x373), _0x4c9e58 += _0x3fe998(0x30a), _0x4c9e58 += _0x3fe998(0x2d4), _0x4c9e58 += '</div>', _0x4c9e58 += _0x3fe998(0x30a), _0x4c9e58 += _0x3fe998(0x1e7), _0x4c9e58 += _0x3fe998(0x8f), _0x4c9e58 += _0x3fe998(0x2c0), _0x4c9e58 += '</div>'), $(_0x3fe998(0x16c))[_0x3fe998(0x122)](_0x4c9e58), idracipaddr();
}

function validateingInputs(_0xdbc764) {
    var _0x56f73a = _0x772837,
        _0x122b53 = checkAllfeildsfilled(_0xdbc764);
    const _0x47630a = [{
        'id': _0x56f73a(0x13c),
        'label': _0x56f73a(0x2e7),
        'errorMsg': _0x56f73a(0x266),
        'value': _0x56f73a(0x3a7)
    }, {
        'id': _0x56f73a(0x290),
        'label': 'multiselect-label',
        'errorMsg': _0x56f73a(0x2f3),
        'value': ''
    }];
    let _0x2e3850 = ![];
    for (let _0x1cdc1c = 0x0; _0x1cdc1c < _0x47630a[_0x56f73a(0xf7)]; _0x1cdc1c++) {
        const _0x35eb16 = _0x47630a[_0x1cdc1c],
            _0x22d4fb = document['getElementById'](_0x35eb16['id']);
        _0x22d4fb[_0x56f73a(0x1a3)] === _0x35eb16[_0x56f73a(0x1a3)] ? (document[_0x56f73a(0x259)](_0x35eb16[_0x56f73a(0x142)])[_0x56f73a(0x248)] = _0x56f73a(0x189), document[_0x56f73a(0x259)](_0x35eb16[_0x56f73a(0xfc)])['style']['color'] = _0x56f73a(0x2aa), _0x2e3850 = !![]) : document['getElementById'](_0x35eb16[_0x56f73a(0x142)])['textContent'] = '';
    }
    return _0x122b53;
    return !_0x2e3850;
}

function sendidracDataToServer() {
    var _0x5e2c43 = _0x772837;
    idrac_list = [];
    var _0x52f836 = {};
    _0x52f836[_0x5e2c43(0x328)] = isEdit, _0x52f836[_0x5e2c43(0x324)] = $(_0x5e2c43(0x191))[_0x5e2c43(0x23c)](), _0x52f836[_0x5e2c43(0x387)] = '', _0x52f836[_0x5e2c43(0x250)] = '', _0x52f836['iloip'] = '', _0x52f836['port'] = $(_0x5e2c43(0x1dc))['val'](), _0x52f836[_0x5e2c43(0x1f3)] = $(_0x5e2c43(0x1a7))[_0x5e2c43(0x23c)](), _0x52f836[_0x5e2c43(0xac)] = '', idrac_list[_0x5e2c43(0x239)](_0x52f836), swal(_0x5e2c43(0x246), '\x20', 'success'), $(_0x5e2c43(0x33a))[_0x5e2c43(0x29e)](_0x5e2c43(0x35b), 'modal');
}

function verifiedidracServer() {
    var _0x22fdee = _0x772837,
        _0x148ebc = validateingInputs(_0x22fdee(0x18e)),
        _0x49f507 = $(_0x22fdee(0x1a7))[_0x22fdee(0x23c)]();
    if (_0x148ebc == !![] && _0x49f507 && _0x49f507[_0x22fdee(0xf7)] > 0x0) {
        var _0x1d8888 = {};
        _0x1d8888['isedit'] = isEdit, _0x1d8888[_0x22fdee(0x324)] = $(_0x22fdee(0x191))['val'](), _0x1d8888['ip'] = validationip, _0x1d8888[_0x22fdee(0x2bf)] = $('#CreateIdrac\x20#port_ips')['val'](), _0x1d8888[_0x22fdee(0x1f3)] = _0x49f507, idrac_list[_0x22fdee(0x239)](_0x1d8888), requestDataFromServer(_0x22fdee(0xae), {
            'data': JSON[_0x22fdee(0x1bd)](_0x1d8888),
            'csrfmiddlewaretoken': csfr_token
        }, 'POST')[_0x22fdee(0x390)](idracvalidResponse);
    } else swal('Please\x20fill\x20all\x20required\x20fields\x20and\x20select\x20at\x20least\x20one\x20IP\x20address.', '\x20', 'error');
}

function idracvalidResponse(_0x579be2) {
    var _0x3965ad = _0x772837;
    res = JSON['parse'](_0x579be2), $(_0x3965ad(0x3ad))[_0x3965ad(0x2c4)](), $(_0x3965ad(0x3ac))['hide']();
    if (res[_0x3965ad(0x2e5)] == !![]) {
        const _0xa913af = document['getElementById']('idrac_save');
        _0xa913af[_0x3965ad(0x1f2)](_0x3965ad(0x11f), _0x3965ad(0x23a)), _0xa913af[_0x3965ad(0x26e)] = _0x3965ad(0x2d3);
        var _0x271fc8 = '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#00ff00;\x22>Success\x20in\x20Validation...</p>';
        $('#valids_row')[_0x3965ad(0x122)](_0x271fc8), setTimeout(function () {
            var _0x570233 = _0x3965ad;
            $('#valids_row')[_0x570233(0x2c4)]();
        }, 0xbb8), $(_0x3965ad(0x14d))[_0x3965ad(0x18f)](_0x3965ad(0x173), !![]), $('#port_ips')[_0x3965ad(0x18f)](_0x3965ad(0x173), !![]);
    } else {
        if (res['result'] == ![]) {
            var _0x271fc8 = '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#ff0000;\x22>Failure\x20in\x20Validation...</p>';
            $(_0x3965ad(0x3ad))[_0x3965ad(0x122)](_0x271fc8), setTimeout(function () {
                var _0x45a509 = _0x3965ad;
                $(_0x45a509(0x3ad))[_0x45a509(0x2c4)]();
            }, 0xbb8);
        }
    }
}
var labelNames = [_0x772837(0x2ae), _0x772837(0x39a), _0x772837(0x99), _0x772837(0x369), _0x772837(0x125), _0x772837(0x247), _0x772837(0x1db), _0x772837(0x1fe), 'mem_t', _0x772837(0x1a8), _0x772837(0x352), 'load_t', 'uptime_w', _0x772837(0x146), 'uptime_t', _0x772837(0x258), _0x772837(0x2d5), _0x772837(0x164)],
    defaultValues = [0x46, 0x4b, 0x258, 0x46, 0x50, 0xa, 0x46, 0x50, 0xa, 0.6, 0.8, 0xa, 0x5a, 0x78, 0x11940, 0x2, 0x5, 0xa];

function nodetype(_0x59c045) {
    var _0x34763b = _0x772837;
    $(_0x34763b(0x3b6))['empty']();
    var _0x58f6df = '';
    if (_0x59c045 == _0x34763b(0x283)) {
        _0x58f6df += _0x34763b(0xf5), _0x58f6df += '<label\x20for=\x22multi-select-node\x22\x20id=\x22multiselect-label\x22>Select\x20IP\x20Address</label>', _0x58f6df += _0x34763b(0x34f), _0x58f6df += '<select\x20class=\x22input-select\x20multiple-select\x20custom-select\x20select-input\x20multi-select-input\x20w-100\x22\x20name=\x22NODE_IPADDRESS\x22\x20multiple=\x22multiple\x22\x20id=\x22multi-select-node\x22>', _0x58f6df += '</select>', _0x58f6df += _0x34763b(0x8f), _0x58f6df += _0x34763b(0x30e), _0x58f6df += _0x34763b(0x8f), _0x58f6df += _0x34763b(0x24c), _0x58f6df += _0x34763b(0x2e0), _0x58f6df += '<input\x20type=\x22number\x22\x20class=\x22form-control\x20node_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20Node\x20Port\x22\x20value=\x229100\x22\x20required=\x22\x22\x20id=\x22port_nodes\x22\x20autocomplete=\x22off\x22>', _0x58f6df += _0x34763b(0x319), _0x58f6df += _0x34763b(0x8f), _0x58f6df += _0x34763b(0x3b7), _0x58f6df += _0x34763b(0x31b), _0x58f6df += _0x34763b(0x339) + _0x59c045 + _0x34763b(0x1ea), _0x58f6df += '<label\x20for=\x22threshold\x22>\x20Threshold</label>', _0x58f6df += _0x34763b(0x8f), _0x58f6df += _0x34763b(0x298), _0x58f6df += _0x34763b(0x350), _0x58f6df += '</div>', _0x58f6df += '<div\x20class=\x22col-6\x22>', _0x58f6df += _0x34763b(0x1ad), _0x58f6df += _0x34763b(0x33c), _0x58f6df += _0x34763b(0x2f5), _0x58f6df += _0x34763b(0x24b), _0x58f6df += '<th>Units</th>', _0x58f6df += _0x34763b(0xe2), _0x58f6df += '<tr\x20class=\x22small-row\x22>', _0x58f6df += _0x34763b(0xbe), _0x58f6df += _0x34763b(0xc7), _0x58f6df += _0x34763b(0x2d2), _0x58f6df += _0x34763b(0xe2), _0x58f6df += _0x34763b(0x33c), _0x58f6df += _0x34763b(0x2ef), _0x58f6df += _0x34763b(0x331), _0x58f6df += '<td>num</td>', _0x58f6df += '</tr>', _0x58f6df += '<tr\x20class=\x22small-row\x22>', _0x58f6df += _0x34763b(0x383), _0x58f6df += '<td>Time</td>', _0x58f6df += _0x34763b(0x141), _0x58f6df += '</tr>', _0x58f6df += _0x34763b(0x11e), _0x58f6df += '</div>', _0x58f6df += _0x34763b(0x8f), _0x58f6df += '<div\x20id=\x22threshold-fields\x22\x20style=\x22display:none;\x22>';
        for (var _0x474d18 = 0x0; _0x474d18 < labelNames[_0x34763b(0xf7)]; _0x474d18++) {
            _0x58f6df += '<div\x20class=\x22row\x22>', _0x58f6df += _0x34763b(0x27f), _0x58f6df += '<div\x20class=\x22col-4\x22>', _0x58f6df += _0x34763b(0x307) + labelNames[_0x474d18] + '\x22>' + labelNames[_0x474d18] + _0x34763b(0x1d0), _0x58f6df += _0x34763b(0x8f), _0x58f6df += '<div\x20class=\x22col-5\x22>', _0x58f6df += _0x34763b(0x177) + labelNames[_0x474d18] + _0x34763b(0x233) + defaultValues[_0x474d18] + '\x22>', _0x58f6df += _0x34763b(0x8f), _0x58f6df += _0x34763b(0x35a), _0x58f6df += _0x34763b(0x8f);
        }
        _0x58f6df += _0x34763b(0x8f), _0x58f6df += _0x34763b(0x185), _0x58f6df += _0x34763b(0x373), _0x58f6df += _0x34763b(0x30a), _0x58f6df += _0x34763b(0x2d4), _0x58f6df += _0x34763b(0x8f), _0x58f6df += _0x34763b(0x30a), _0x58f6df += _0x34763b(0xb5), _0x58f6df += _0x34763b(0x8f), _0x58f6df += _0x34763b(0x31d), _0x58f6df += '</div>';
    }
    $(_0x34763b(0x3b6))[_0x34763b(0x122)](_0x58f6df), nodeipaddr();
}

function verifynodeServer() {
    var _0xaf3117 = _0x772837,
        _0x5885fc = validateInputing(_0xaf3117(0x8a)),
        _0xb94ced = $(_0xaf3117(0x100))['val']();
    if (_0x5885fc == !![] && _0xb94ced && _0xb94ced[_0xaf3117(0xf7)] > 0x0) {
        var _0x46a0a6 = {};
        _0x46a0a6[_0xaf3117(0x328)] = isEdit, _0x46a0a6[_0xaf3117(0x324)] = $('#CreateNode\x20#node_version')[_0xaf3117(0x23c)](), _0x46a0a6['ip'] = validationip, _0x46a0a6[_0xaf3117(0x2bf)] = $(_0xaf3117(0x338))[_0xaf3117(0x23c)](), _0x46a0a6['selectilo'] = _0xb94ced, nodemgmt_list[_0xaf3117(0x239)](_0x46a0a6), requestDataFromServer(_0xaf3117(0x2c7), {
            'data': JSON[_0xaf3117(0x1bd)](_0x46a0a6),
            'csrfmiddlewaretoken': csfr_token
        }, _0xaf3117(0x227))[_0xaf3117(0x390)](nodevalidResponse);
    } else swal(_0xaf3117(0x219), '\x20', _0xaf3117(0x217));
}

function nodevalidResponse(_0x2d5ce5) {
    var _0x33e63b = _0x772837;
    res = JSON[_0x33e63b(0x11d)](_0x2d5ce5), $(_0x33e63b(0x117))[_0x33e63b(0x2c4)](), $(_0x33e63b(0x3ac))['hide']();
    if (res['result'] == !![]) {
        const _0x30837a = document[_0x33e63b(0x259)](_0x33e63b(0x257));
        _0x30837a['setAttribute'](_0x33e63b(0x11f), 'sendnodeDataToServer()'), _0x30837a[_0x33e63b(0x26e)] = _0x33e63b(0x2d3);
        var _0x273961 = _0x33e63b(0x1ae);
        $(_0x33e63b(0x117))[_0x33e63b(0x122)](_0x273961), setTimeout(function () {
            var _0x1af12f = _0x33e63b;
            $(_0x1af12f(0x117))[_0x1af12f(0x2c4)]();
        }, 0xbb8), $(_0x33e63b(0x2ec))[_0x33e63b(0x18f)](_0x33e63b(0x173), !![]), $('#port_nodes')[_0x33e63b(0x18f)]('disabled', !![]);
    } else {
        if (res[_0x33e63b(0x2e5)] == ![]) {
            var _0x273961 = _0x33e63b(0x244);
            $(_0x33e63b(0x117))['append'](_0x273961), setTimeout(function () {
                var _0xc6a5e = _0x33e63b;
                $(_0xc6a5e(0x117))['empty']();
            }, 0xbb8);
        }
    }
}

function sendnodeDataToServer() {
    var _0x5957a4 = _0x772837;
    nodemgmt_list = [];
    var _0x56da26 = {
        'disk_w': parseFloat($('#disk_w')['val']()),
        'disk_c': parseFloat($(_0x5957a4(0x37a))['val']()),
        'disk_t': parseInt($('#disk_t')[_0x5957a4(0x23c)]()),
        'cpu_w': parseFloat($(_0x5957a4(0x1bc))[_0x5957a4(0x23c)]()),
        'cpu_c': parseFloat($(_0x5957a4(0x163))[_0x5957a4(0x23c)]()),
        'cpu_t': parseInt($(_0x5957a4(0x32f))['val']()),
        'mem_w': parseFloat($('#mem_w')['val']()),
        'mem_c': parseFloat($(_0x5957a4(0x23b))[_0x5957a4(0x23c)]()),
        'mem_t': parseInt($(_0x5957a4(0x21e))['val']()),
        'load_w': parseFloat($(_0x5957a4(0x376))[_0x5957a4(0x23c)]()),
        'load_c': parseFloat($(_0x5957a4(0x268))[_0x5957a4(0x23c)]()),
        'load_t': parseInt($(_0x5957a4(0x1f6))[_0x5957a4(0x23c)]()),
        'uptime_w': parseFloat($(_0x5957a4(0x155))[_0x5957a4(0x23c)]()),
        'uptime_c': parseFloat($('#uptime_c')[_0x5957a4(0x23c)]()),
        'uptime_t': parseInt($('#uptime_t')[_0x5957a4(0x23c)]()),
        'login_w': parseFloat($(_0x5957a4(0x1d4))[_0x5957a4(0x23c)]()),
        'login_c': parseFloat($(_0x5957a4(0x2d0))[_0x5957a4(0x23c)]()),
        'login_t': parseInt($(_0x5957a4(0x391))['val']())
    },
        _0x218646 = {};
    _0x218646[_0x5957a4(0x328)] = isEdit, _0x218646[_0x5957a4(0x324)] = $('#CreateNode\x20#node_version')[_0x5957a4(0x23c)](), _0x218646[_0x5957a4(0x387)] = '', _0x218646[_0x5957a4(0x250)] = '', _0x218646[_0x5957a4(0x2c5)] = '', _0x218646[_0x5957a4(0x2bf)] = $(_0x5957a4(0x338))['val'](), _0x218646[_0x5957a4(0x1f3)] = $('#CreateNode\x20#multi-select-node')['val'](), _0x218646['threshold'] = _0x56da26, nodemgmt_list[_0x5957a4(0x239)](_0x218646), swal(_0x5957a4(0x1d7), '\x20', 'success'), $(_0x5957a4(0x2af))[_0x5957a4(0x29e)](_0x5957a4(0x35b), _0x5957a4(0x2a6));
}

function nginxtype(_0x519d2a) {
    var _0x242fad = _0x772837;
    $(_0x242fad(0x276))['empty']();
    var _0x5d503c = '';
    _0x519d2a == _0x242fad(0x103) && (_0x5d503c += _0x242fad(0xf5), _0x5d503c += _0x242fad(0x237), _0x5d503c += _0x242fad(0x12e), _0x5d503c += _0x242fad(0x2a5), _0x5d503c += _0x242fad(0xd4), _0x5d503c += _0x242fad(0x8f), _0x5d503c += _0x242fad(0x30e), _0x5d503c += _0x242fad(0x8f), _0x5d503c += _0x242fad(0x24c), _0x5d503c += _0x242fad(0x22a), _0x5d503c += _0x242fad(0x1dd), _0x5d503c += _0x242fad(0x1b8), _0x5d503c += _0x242fad(0x8f), _0x5d503c += _0x242fad(0x185), _0x5d503c += '<div\x20class=\x22modal-footer\x20mx-auto\x20col-md-11\x20col-12\x22>', _0x5d503c += _0x242fad(0x30a), _0x5d503c += _0x242fad(0x2d4), _0x5d503c += _0x242fad(0x8f), _0x5d503c += _0x242fad(0x30a), _0x5d503c += _0x242fad(0x345), _0x5d503c += _0x242fad(0x8f), _0x5d503c += _0x242fad(0x2c9), _0x5d503c += _0x242fad(0x8f)), $(_0x242fad(0x276))[_0x242fad(0x122)](_0x5d503c), nginxipaddr();
}

function verifiednginxServer() {
    var _0x211029 = _0x772837,
        _0x115d1f = validatedInput(_0x211029(0xfd)),
        _0x2d36e0 = $(_0x211029(0x1b5))[_0x211029(0x23c)]();
    if (_0x115d1f == !![] && _0x2d36e0 && _0x2d36e0[_0x211029(0xf7)] > 0x0) {
        var _0x392bfa = {};
        _0x392bfa[_0x211029(0x328)] = isEdit, _0x392bfa['prototype'] = $(_0x211029(0x156))[_0x211029(0x23c)](), _0x392bfa['ip'] = validationip, _0x392bfa[_0x211029(0x2bf)] = $(_0x211029(0x98))[_0x211029(0x23c)](), _0x392bfa[_0x211029(0x1f3)] = _0x2d36e0, ngnixmgmt_list[_0x211029(0x239)](_0x392bfa), requestDataFromServer(_0x211029(0x22d), {
            'data': JSON['stringify'](_0x392bfa),
            'csrfmiddlewaretoken': csfr_token
        }, _0x211029(0x227))[_0x211029(0x390)](ngnixvalidResponse);
    } else swal(_0x211029(0x219), '\x20', _0x211029(0x217));
}

function ngnixvalidResponse(_0x554730) {
    var _0x31d0e6 = _0x772837;
    res = JSON['parse'](_0x554730), $(_0x31d0e6(0x165))['empty'](), $(_0x31d0e6(0x3ac))[_0x31d0e6(0x25c)]();
    if (res[_0x31d0e6(0x2e5)] == !![]) {
        const _0x527445 = document[_0x31d0e6(0x259)](_0x31d0e6(0x171));
        _0x527445['setAttribute'](_0x31d0e6(0x11f), _0x31d0e6(0x118)), _0x527445[_0x31d0e6(0x26e)] = _0x31d0e6(0x2d3);
        var _0x4aa2d0 = _0x31d0e6(0x1ae);
        $(_0x31d0e6(0x165))[_0x31d0e6(0x122)](_0x4aa2d0), setTimeout(function () {
            var _0x14fa91 = _0x31d0e6;
            $('#validate_row')[_0x14fa91(0x2c4)]();
        }, 0xbb8), $(_0x31d0e6(0x2ac))['prop']('disabled', !![]), $(_0x31d0e6(0x264))['prop'](_0x31d0e6(0x173), !![]);
    } else {
        if (res[_0x31d0e6(0x2e5)] == ![]) {
            var _0x4aa2d0 = '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#ff0000;\x22>Failure\x20in\x20Validation...</p>';
            $(_0x31d0e6(0x165))['append'](_0x4aa2d0), setTimeout(function () {
                var _0x3384c8 = _0x31d0e6;
                $(_0x3384c8(0x165))[_0x3384c8(0x2c4)]();
            }, 0xbb8);
        }
    }
}

function validatedInput(_0x15b97b) {
    var _0x136cbe = _0x772837,
        _0x702f73 = checkAllfeildsfilled(_0x15b97b);
    const _0x4db8e9 = [{
        'id': _0x136cbe(0x2e8),
        'label': _0x136cbe(0x12f),
        'errorMsg': _0x136cbe(0x20f),
        'value': 'Enter\x20NGINX\x20Port'
    }, {
        'id': _0x136cbe(0x8b),
        'label': _0x136cbe(0x2e1),
        'errorMsg': _0x136cbe(0x2f3),
        'value': ''
    }];
    let _0x104e61 = ![];
    for (let _0x1ad5a3 = 0x0; _0x1ad5a3 < _0x4db8e9[_0x136cbe(0xf7)]; _0x1ad5a3++) {
        const _0x5ef3c5 = _0x4db8e9[_0x1ad5a3],
            _0x2ec1df = document[_0x136cbe(0x259)](_0x5ef3c5['id']),
            _0x2b9e17 = document[_0x136cbe(0x259)](_0x5ef3c5[_0x136cbe(0x142)]);
        if (!_0x2ec1df) {
            console[_0x136cbe(0x217)](_0x136cbe(0x16b) + _0x5ef3c5['id'] + _0x136cbe(0x95));
            continue;
        }
        if (!_0x2b9e17) {
            console[_0x136cbe(0x217)]('Error\x20message\x20element\x20with\x20ID\x20' + _0x5ef3c5['errorMsg'] + _0x136cbe(0x95));
            continue;
        }
        _0x2ec1df['value'] === _0x5ef3c5[_0x136cbe(0x1a3)] ? (_0x2b9e17['textContent'] = _0x136cbe(0x189), _0x104e61 = !![]) : _0x2b9e17['textContent'] = '';
    }
    return _0x702f73 && !_0x104e61;
}

function sendnginxDataToServer() {
    var _0x47b72b = _0x772837;
    ngnixmgmt_list = [];
    var _0x5218ed = {};
    _0x5218ed['isedit'] = isEdit, _0x5218ed[_0x47b72b(0x324)] = $(_0x47b72b(0x156))[_0x47b72b(0x23c)](), _0x5218ed[_0x47b72b(0x387)] = '', _0x5218ed[_0x47b72b(0x250)] = '', _0x5218ed[_0x47b72b(0x2c5)] = '', _0x5218ed[_0x47b72b(0x2bf)] = $(_0x47b72b(0x98))[_0x47b72b(0x23c)](), _0x5218ed[_0x47b72b(0x1f3)] = $(_0x47b72b(0x1b5))[_0x47b72b(0x23c)](), _0x5218ed[_0x47b72b(0xac)] = '', ngnixmgmt_list[_0x47b72b(0x239)](_0x5218ed), swal('NgnixExpo\x20added\x20sucessfully', '\x20', _0x47b72b(0x188)), $(_0x47b72b(0x293))[_0x47b72b(0x29e)](_0x47b72b(0x35b), 'modal');
}
var wlabelNames = ['disk_w', _0x772837(0x39a), _0x772837(0x99), _0x772837(0x369), _0x772837(0x125), _0x772837(0x247), _0x772837(0x1db), _0x772837(0x1fe), _0x772837(0x323), 'load_w', _0x772837(0x352), _0x772837(0xcd), _0x772837(0x102), 'uptime_c', 'uptime_t', _0x772837(0x258), _0x772837(0x2d5), _0x772837(0x164)],
    wdefaultValues = [0x46, 0x4b, 0x258, 0x46, 0x50, 0xa, 0x46, 0x50, 0xa, 0.6, 0.8, 0xa, 0x5a, 0x78, 0x11940, 0x2, 0x5, 0xa];

function windowtype(_0x4d362c) {
    var _0x2d79b9 = _0x772837;
    $(_0x2d79b9(0x20a))[_0x2d79b9(0x2c4)]();
    var _0x2c2ddd = '';
    if (_0x4d362c == 'Window\x20Expo') {
        _0x2c2ddd += _0x2d79b9(0xf5), _0x2c2ddd += _0x2d79b9(0x2f6), _0x2c2ddd += _0x2d79b9(0x27d), _0x2c2ddd += _0x2d79b9(0xca), _0x2c2ddd += _0x2d79b9(0xd4), _0x2c2ddd += _0x2d79b9(0x8f), _0x2c2ddd += _0x2d79b9(0x30e), _0x2c2ddd += '</div>', _0x2c2ddd += _0x2d79b9(0x24c), _0x2c2ddd += _0x2d79b9(0xf6), _0x2c2ddd += _0x2d79b9(0x306), _0x2c2ddd += _0x2d79b9(0x23d), _0x2c2ddd += _0x2d79b9(0x8f), _0x2c2ddd += _0x2d79b9(0x3b7), _0x2c2ddd += _0x2d79b9(0x31b), _0x2c2ddd += _0x2d79b9(0x1c0) + _0x4d362c + '\x22\x20value=\x22wthreshold\x22\x20onchange=\x22wtoggleTextFields(this)\x22>', _0x2c2ddd += _0x2d79b9(0xd8), _0x2c2ddd += _0x2d79b9(0x8f), _0x2c2ddd += '<div\x20class=\x22col-1\x22>', _0x2c2ddd += '<i\x20class=\x22mdi\x20mdi-reload\x20io-con\x22\x20id=\x22wthreshold-icon\x22\x20onclick=\x22wresetInputValues()\x22\x20style=\x22color:#e99123;display:none;\x22></i>', _0x2c2ddd += _0x2d79b9(0x8f), _0x2c2ddd += _0x2d79b9(0x1c2), _0x2c2ddd += _0x2d79b9(0x106), _0x2c2ddd += '<tr\x20class=\x22small-row\x22>', _0x2c2ddd += _0x2d79b9(0x2f5), _0x2c2ddd += _0x2d79b9(0x24b), _0x2c2ddd += _0x2d79b9(0x381), _0x2c2ddd += '</tr>', _0x2c2ddd += _0x2d79b9(0x33c), _0x2c2ddd += _0x2d79b9(0xbe), _0x2c2ddd += _0x2d79b9(0xc7), _0x2c2ddd += _0x2d79b9(0x2d2), _0x2c2ddd += _0x2d79b9(0xe2), _0x2c2ddd += _0x2d79b9(0x33c), _0x2c2ddd += _0x2d79b9(0x2ef), _0x2c2ddd += _0x2d79b9(0x331), _0x2c2ddd += _0x2d79b9(0x2d2), _0x2c2ddd += '</tr>', _0x2c2ddd += _0x2d79b9(0x33c), _0x2c2ddd += _0x2d79b9(0x383), _0x2c2ddd += '<td>Time</td>', _0x2c2ddd += _0x2d79b9(0x141), _0x2c2ddd += _0x2d79b9(0xe2), _0x2c2ddd += '</table>', _0x2c2ddd += _0x2d79b9(0x8f), _0x2c2ddd += _0x2d79b9(0x8f), _0x2c2ddd += _0x2d79b9(0x309);
        for (var _0x14ad5f = 0x0; _0x14ad5f < wlabelNames[_0x2d79b9(0xf7)]; _0x14ad5f++) {
            _0x2c2ddd += '<div\x20class=\x22row\x22>', _0x2c2ddd += _0x2d79b9(0x27f), _0x2c2ddd += _0x2d79b9(0x31b), _0x2c2ddd += '<label\x20for=\x22' + wlabelNames[_0x14ad5f] + '\x22>' + wlabelNames[_0x14ad5f] + _0x2d79b9(0x1d0), _0x2c2ddd += _0x2d79b9(0x8f), _0x2c2ddd += '<div\x20class=\x22col-5\x22>', _0x2c2ddd += _0x2d79b9(0x177) + wlabelNames[_0x14ad5f] + '\x22\x20value=\x22' + wdefaultValues[_0x14ad5f] + '\x22>', _0x2c2ddd += _0x2d79b9(0x8f), _0x2c2ddd += _0x2d79b9(0x35a), _0x2c2ddd += '</div>';
        }
        _0x2c2ddd += _0x2d79b9(0x8f), _0x2c2ddd += _0x2d79b9(0x185), _0x2c2ddd += _0x2d79b9(0x373), _0x2c2ddd += _0x2d79b9(0x30a), _0x2c2ddd += _0x2d79b9(0x2d4), _0x2c2ddd += _0x2d79b9(0x8f), _0x2c2ddd += '<div\x20class=\x22col-5\x20px-1\x22>', _0x2c2ddd += _0x2d79b9(0x11c), _0x2c2ddd += '</div>', _0x2c2ddd += '<div\x20class=\x22\x22\x20id=\x22valided_rows\x22></div>', _0x2c2ddd += _0x2d79b9(0x8f);
    }
    $('#windowtype')['append'](_0x2c2ddd), winipaddr();
}

function wresetInputValues() {
    var _0x1e37ea = _0x772837,
        _0x8f4088 = document['getElementById'](_0x1e37ea(0x2a0)),
        _0x4ab2d6 = document['getElementById'](_0x1e37ea(0x1c7)),
        _0x407674 = _0x4ab2d6[_0x1e37ea(0x38c)]('form-control');
    if (_0x8f4088['checked'])
        for (var _0x47a7d5 = 0x0; _0x47a7d5 < _0x407674[_0x1e37ea(0xf7)]; _0x47a7d5++) {
            _0x407674[_0x47a7d5][_0x1e37ea(0x1a3)] = defaultValues[_0x47a7d5];
        } else
        for (var _0x47a7d5 = 0x0; _0x47a7d5 < _0x407674[_0x1e37ea(0xf7)]; _0x47a7d5++) {
            _0x407674[_0x47a7d5][_0x1e37ea(0x1a3)] = '';
        }
}

function wtoggleTextFields(_0xcaac8e) {
    var _0x133c1e = _0x772837,
        _0x3a0d18 = document['getElementById']('wthreshold-fields'),
        _0x162059 = document[_0x133c1e(0x259)](_0x133c1e(0x88)),
        _0x2c9673 = document[_0x133c1e(0x259)](_0x133c1e(0x2b6));
    _0xcaac8e[_0x133c1e(0xe0)] ? (_0x3a0d18[_0x133c1e(0x1b4)][_0x133c1e(0x2e2)] = _0x133c1e(0x1fb), _0x162059['style'][_0x133c1e(0x2e2)] = _0x133c1e(0x107), _0x2c9673[_0x133c1e(0x1b4)]['display'] = _0x133c1e(0x1fb)) : (_0x3a0d18[_0x133c1e(0x1b4)][_0x133c1e(0x2e2)] = _0x133c1e(0x13e), _0x162059[_0x133c1e(0x1b4)]['display'] = _0x133c1e(0x13e), _0x2c9673[_0x133c1e(0x1b4)][_0x133c1e(0x2e2)] = 'none');
}

function verifywinServer() {
    var _0x37070b = _0x772837,
        _0x4fc880 = validatewinInputing(_0x37070b(0x325)),
        _0xf2316f = $('#CreateWindow\x20#multi-select-win')['val']();
    if (_0x4fc880 == !![] && _0xf2316f && _0xf2316f[_0x37070b(0xf7)] > 0x0) {
        var _0x8ed0e8 = {};
        _0x8ed0e8[_0x37070b(0x328)] = isEdit, _0x8ed0e8[_0x37070b(0x324)] = $('#CreateWindow\x20#window_version')['val'](), _0x8ed0e8['ip'] = validationip, _0x8ed0e8[_0x37070b(0x2bf)] = $(_0x37070b(0x120))[_0x37070b(0x23c)](), _0x8ed0e8['selectilo'] = _0xf2316f, winmgmt_list[_0x37070b(0x239)](_0x8ed0e8), requestDataFromServer('/allonboard/winexpvalidation', {
            'data': JSON[_0x37070b(0x1bd)](_0x8ed0e8),
            'csrfmiddlewaretoken': csfr_token
        }, 'POST')[_0x37070b(0x390)](winvalidResponse);
    } else swal(_0x37070b(0x219), '\x20', _0x37070b(0x217));
}

function winvalidResponse(_0x3c83a1) {
    var _0x46d948 = _0x772837;
    res = JSON[_0x46d948(0x11d)](_0x3c83a1), $('#valided_rows')['empty'](), $('.loader')[_0x46d948(0x25c)]();
    if (res[_0x46d948(0x2e5)] == !![]) {
        const _0x429045 = document[_0x46d948(0x259)](_0x46d948(0x166));
        _0x429045['setAttribute'](_0x46d948(0x11f), _0x46d948(0x374)), _0x429045[_0x46d948(0x26e)] = _0x46d948(0x2d3);
        var _0x347419 = _0x46d948(0x1ae);
        $(_0x46d948(0x36d))['append'](_0x347419), setTimeout(function () {
            var _0x5cc73a = _0x46d948;
            $(_0x5cc73a(0x36d))[_0x5cc73a(0x2c4)]();
        }, 0xbb8), $(_0x46d948(0x269))['prop'](_0x46d948(0x173), !![]), $(_0x46d948(0x240))[_0x46d948(0x18f)](_0x46d948(0x173), !![]);
    } else {
        if (res[_0x46d948(0x2e5)] == ![]) {
            var _0x347419 = '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#ff0000;\x22>Failure\x20in\x20Validation...</p>';
            $(_0x46d948(0x36d))[_0x46d948(0x122)](_0x347419), setTimeout(function () {
                var _0x4081e5 = _0x46d948;
                $('#valided_rows')[_0x4081e5(0x2c4)]();
            }, 0xbb8);
        }
    }
}

function sendwinDataToServer() {
    var _0x31526b = _0x772837;
    winmgmt_list = [];
    var _0x16ab23 = {
        'disk_w': parseFloat($(_0x31526b(0x24a))[_0x31526b(0x23c)]()),
        'disk_c': parseFloat($(_0x31526b(0x37a))[_0x31526b(0x23c)]()),
        'disk_t': parseInt($(_0x31526b(0x2bb))[_0x31526b(0x23c)]()),
        'cpu_w': parseFloat($(_0x31526b(0x1bc))[_0x31526b(0x23c)]()),
        'cpu_c': parseFloat($(_0x31526b(0x163))[_0x31526b(0x23c)]()),
        'cpu_t': parseInt($(_0x31526b(0x32f))[_0x31526b(0x23c)]()),
        'mem_w': parseFloat($(_0x31526b(0xef))[_0x31526b(0x23c)]()),
        'mem_c': parseFloat($(_0x31526b(0x23b))[_0x31526b(0x23c)]()),
        'mem_t': parseInt($(_0x31526b(0x21e))[_0x31526b(0x23c)]()),
        'load_w': parseFloat($(_0x31526b(0x376))[_0x31526b(0x23c)]()),
        'load_c': parseFloat($('#load_c')[_0x31526b(0x23c)]()),
        'load_t': parseInt($(_0x31526b(0x1f6))[_0x31526b(0x23c)]()),
        'uptime_w': parseFloat($(_0x31526b(0x155))[_0x31526b(0x23c)]()),
        'uptime_c': parseFloat($(_0x31526b(0x1c8))['val']()),
        'uptime_t': parseInt($(_0x31526b(0x332))[_0x31526b(0x23c)]()),
        'login_w': parseFloat($(_0x31526b(0x1d4))[_0x31526b(0x23c)]()),
        'login_c': parseFloat($(_0x31526b(0x2d0))['val']()),
        'login_t': parseInt($(_0x31526b(0x391))[_0x31526b(0x23c)]())
    },
        _0x39cbeb = {};
    _0x39cbeb[_0x31526b(0x328)] = isEdit, _0x39cbeb[_0x31526b(0x324)] = $(_0x31526b(0x186))[_0x31526b(0x23c)](), _0x39cbeb[_0x31526b(0x387)] = '', _0x39cbeb[_0x31526b(0x250)] = '', _0x39cbeb[_0x31526b(0x2c5)] = '', _0x39cbeb[_0x31526b(0x2bf)] = $(_0x31526b(0x120))[_0x31526b(0x23c)](), _0x39cbeb['selectilo'] = $(_0x31526b(0x353))[_0x31526b(0x23c)](), _0x39cbeb[_0x31526b(0xac)] = _0x16ab23, winmgmt_list['push'](_0x39cbeb), swal(_0x31526b(0xfe), '\x20', _0x31526b(0x188)), $(_0x31526b(0xd5))[_0x31526b(0x29e)](_0x31526b(0x35b), _0x31526b(0x2a6));
}

function validatewinInputing(_0x54f9d2) {
    var _0x134275 = _0x772837,
        _0x3c4f37 = checkAllfeildsfilled(_0x54f9d2);
    const _0x4c7e02 = [{
        'id': _0x134275(0x24f),
        'label': 'port-win-label',
        'errorMsg': 'win-error-msg',
        'value': _0x134275(0x349)
    }, {
        'id': _0x134275(0x13f),
        'label': 'multiselect-label',
        'errorMsg': _0x134275(0x2f3),
        'value': ''
    }];
    let _0x490b97 = ![];
    for (let _0x45c316 = 0x0; _0x45c316 < _0x4c7e02[_0x134275(0xf7)]; _0x45c316++) {
        const _0x40ac12 = _0x4c7e02[_0x45c316],
            _0xd44f6 = document[_0x134275(0x259)](_0x40ac12['id']);
        _0xd44f6[_0x134275(0x1a3)] === _0x40ac12['value'] ? (document[_0x134275(0x259)](_0x40ac12[_0x134275(0x142)])[_0x134275(0x248)] = _0x134275(0x189), document[_0x134275(0x259)](_0x40ac12[_0x134275(0xfc)])[_0x134275(0x1b4)][_0x134275(0x19b)] = _0x134275(0x2aa), _0x490b97 = !![]) : document[_0x134275(0x259)](_0x40ac12[_0x134275(0x142)])[_0x134275(0x248)] = '';
    }
    return _0x3c4f37;
    return !_0x490b97;
}

function validateInputing(_0x3957fa) {
    var _0x3f82ef = _0x772837,
        _0x297cc1 = checkAllfeildsfilled(_0x3957fa);
    const _0x3f7b2c = [{
        'id': _0x3f82ef(0x183),
        'label': _0x3f82ef(0x393),
        'errorMsg': _0x3f82ef(0x2a8),
        'value': _0x3f82ef(0xdf)
    }, {
        'id': _0x3f82ef(0xe3),
        'label': _0x3f82ef(0x2e1),
        'errorMsg': _0x3f82ef(0x2f3),
        'value': ''
    }];
    let _0x38708d = ![];
    for (let _0x5e28fc = 0x0; _0x5e28fc < _0x3f7b2c['length']; _0x5e28fc++) {
        const _0x37160f = _0x3f7b2c[_0x5e28fc],
            _0x546486 = document['getElementById'](_0x37160f['id']);
        _0x546486[_0x3f82ef(0x1a3)] === _0x37160f['value'] ? (document['getElementById'](_0x37160f[_0x3f82ef(0x142)])[_0x3f82ef(0x248)] = _0x3f82ef(0x189), document[_0x3f82ef(0x259)](_0x37160f[_0x3f82ef(0xfc)])[_0x3f82ef(0x1b4)]['color'] = _0x3f82ef(0x2aa), _0x38708d = !![]) : document[_0x3f82ef(0x259)](_0x37160f[_0x3f82ef(0x142)])[_0x3f82ef(0x248)] = '';
    }
    return _0x297cc1;
    return !_0x38708d;
}

function resetInputValues() {
    var _0x375a38 = _0x772837,
        _0x34fc01 = document['getElementById']('threshold'),
        _0x40f444 = document[_0x375a38(0x259)](_0x375a38(0x261)),
        _0x532b00 = _0x40f444['getElementsByClassName'](_0x375a38(0x265));
    if (_0x34fc01['checked'])
        for (var _0x5bbd4f = 0x0; _0x5bbd4f < _0x532b00[_0x375a38(0xf7)]; _0x5bbd4f++) {
            _0x532b00[_0x5bbd4f][_0x375a38(0x1a3)] = defaultValues[_0x5bbd4f];
        } else
        for (var _0x5bbd4f = 0x0; _0x5bbd4f < _0x532b00[_0x375a38(0xf7)]; _0x5bbd4f++) {
            _0x532b00[_0x5bbd4f][_0x375a38(0x1a3)] = '';
        }
}

function toggleTextFields(_0x3b9e22) {
    var _0x4069df = _0x772837,
        _0x437864 = document[_0x4069df(0x259)]('threshold-fields'),
        _0x35762c = document['getElementById']('table-fields'),
        _0xd082c4 = document[_0x4069df(0x259)]('threshold-icon');
    _0x3b9e22[_0x4069df(0xe0)] ? (_0x437864[_0x4069df(0x1b4)][_0x4069df(0x2e2)] = _0x4069df(0x1fb), _0x35762c[_0x4069df(0x1b4)]['display'] = _0x4069df(0x107), _0xd082c4[_0x4069df(0x1b4)][_0x4069df(0x2e2)] = _0x4069df(0x1fb)) : (_0x437864[_0x4069df(0x1b4)][_0x4069df(0x2e2)] = _0x4069df(0x13e), _0x35762c[_0x4069df(0x1b4)]['display'] = 'none', _0xd082c4[_0x4069df(0x1b4)]['display'] = _0x4069df(0x13e));
}
$(_0x772837(0x294))['on'](_0x772837(0x160), function () {
    var _0x44d079 = _0x772837;
    $('.card-checkbox')['prop'](_0x44d079(0xe0), function (_0x4d77d6, _0x43d28c) {
        return !_0x43d28c;
    }), $('#icons-mores')[_0x44d079(0x22e)](_0x44d079(0x2cc));
});

function displaynewonb() {
    var _0x2f460a = _0x772837,
        _0x7a46a1 = new XMLHttpRequest(),
        _0x583865 = leurl + 'allonboard/newonbtable',
        _0x47da2a = _0x2f460a(0xc5),
        _0xaee80f = {
            'csrfmiddlewaretoken': csfr_token
        };
    _0x7a46a1[_0x2f460a(0x34a)](_0x47da2a, _0x583865, !![]), _0x7a46a1['setRequestHeader']('Content-Type', _0x2f460a(0x9d)), _0x7a46a1[_0x2f460a(0x2cf)] = function () {
        var _0x513806 = _0x2f460a;
        if (_0x7a46a1[_0x513806(0x37b)] >= 0xc8 && _0x7a46a1[_0x513806(0x37b)] < 0x12c) {
            var _0x499e1c = JSON[_0x513806(0x11d)](_0x7a46a1['responseText']);
            _0x499e1c ? $(_0x513806(0xbf))[_0x513806(0x25c)]() : $(_0x513806(0xbf))[_0x513806(0x140)]();
            var _0x3e263f = '',
                _0x37b46f = '';
            _0x499e1c[_0x513806(0x29a)][_0x513806(0x1f1)](function (_0x144f77) {
                var _0x45dd86 = _0x513806,
                    _0xd22724 = '',
                    _0x55afc2 = new XMLHttpRequest();
                _0x55afc2['open'](_0x45dd86(0xc5), leurl + _0x45dd86(0x1fa), !![]), _0x55afc2[_0x45dd86(0x31f)]('Content-Type', _0x45dd86(0x9d)), _0x55afc2['onload'] = function () {
                    var _0x42ca2e = _0x45dd86;
                    if (_0x55afc2[_0x42ca2e(0x37b)] >= 0xc8 && _0x55afc2[_0x42ca2e(0x37b)] < 0x12c) {
                        var _0x515d2c = JSON[_0x42ca2e(0x11d)](_0x55afc2['responseText']);
                        const _0x5af988 = _0x515d2c[_0x42ca2e(0x29a)] || [],
                            _0x16448f = [],
                            _0xb8dbdd = [],
                            _0x86c9f1 = [],
                            _0x12577d = [];
                        for (const _0x2996fc of _0x5af988) {
                            _0x2996fc[_0x42ca2e(0x27c)] === _0x42ca2e(0xa9) && (_0x86c9f1[_0x42ca2e(0x239)](_0x2996fc['id']), v2cpro = _0x2996fc[_0x42ca2e(0x27c)], _0x16448f[_0x42ca2e(0x239)](_0x2996fc['ipaddress'])), _0x2996fc['version'] === 'v3' && (_0x12577d['push'](_0x2996fc['id']), v3cpro = _0x2996fc[_0x42ca2e(0x27c)], _0xb8dbdd['push'](_0x2996fc['ipaddress']));
                        }
                        var _0x3bf700 = new XMLHttpRequest();
                        _0x3bf700[_0x42ca2e(0x34a)](_0x42ca2e(0xc5), leurl + 'allonboard/getmgmntdata?ipaddress=' + _0x144f77[_0x42ca2e(0x229)], !![]), _0x3bf700[_0x42ca2e(0x31f)](_0x42ca2e(0x2b5), 'application/json;charset=UTF-8'), _0x3bf700['onload'] = function () {
                            var _0x2a1cba = _0x42ca2e;
                            if (_0x3bf700[_0x2a1cba(0x37b)] >= 0xc8 && _0x3bf700[_0x2a1cba(0x37b)] < 0x12c) {
                                var _0x5b4612 = JSON['parse'](_0x3bf700[_0x2a1cba(0xb7)]);
                                const _0x5fc7bd = _0x5b4612[_0x2a1cba(0x29a)] || [],
                                    _0x3cd537 = [],
                                    _0x42199b = [],
                                    _0x5b4d2a = [],
                                    _0x52c916 = [],
                                    _0x315a63 = [];
                                for (const _0x571244 of _0x5fc7bd) {
                                    _0x571244[_0x2a1cba(0x324)] === _0x2a1cba(0x251) && (mgmtilo = _0x571244[_0x2a1cba(0x324)], _0x3cd537[_0x2a1cba(0x239)](_0x571244[_0x2a1cba(0x229)])), _0x571244[_0x2a1cba(0x324)] === _0x2a1cba(0xe6) && (mgmtidrac = _0x571244[_0x2a1cba(0x324)], _0x42199b[_0x2a1cba(0x239)](_0x571244[_0x2a1cba(0x229)])), _0x571244[_0x2a1cba(0x324)] === _0x2a1cba(0x283) && (mgmtnodeexp = _0x571244[_0x2a1cba(0x324)], _0x5b4d2a[_0x2a1cba(0x239)](_0x571244['ipaddress'])), _0x571244[_0x2a1cba(0x324)] === _0x2a1cba(0x103) && (mgmtnginxexp = _0x571244[_0x2a1cba(0x324)], _0x52c916['push'](_0x571244['ipaddress'])), _0x571244[_0x2a1cba(0x324)] === 'Window\x20Expo' && (mgmtwindowexp = _0x571244[_0x2a1cba(0x324)], _0x315a63[_0x2a1cba(0x239)](_0x571244[_0x2a1cba(0x229)]));
                                }
                                if (_0x144f77[_0x2a1cba(0x35c)] === _0x2a1cba(0x281) || _0x144f77[_0x2a1cba(0x35c)] === 'VM') _0x37b46f = _0x144f77['selecthost'][_0x2a1cba(0x101)]('-')[0x0];
                                else {
                                    if (_0x144f77['pathhost'] === _0x2a1cba(0x37e)) _0x37b46f = _0x144f77['selecthost']['split']('-')[0x0];
                                    else {
                                        if (_0x144f77[_0x2a1cba(0x35c)] === _0x2a1cba(0x304)) _0x37b46f = _0x144f77[_0x2a1cba(0x20c)][_0x2a1cba(0x101)]('-')[0x0];
                                        else {
                                            if (_0x144f77['pathhost'] === _0x2a1cba(0x216)) _0x37b46f = _0x144f77['selecthost'][_0x2a1cba(0x101)]('-')[0x0];
                                            else {
                                                if (_0x144f77[_0x2a1cba(0x35c)] === _0x2a1cba(0xf4)) _0x37b46f = _0x144f77[_0x2a1cba(0x20c)][_0x2a1cba(0x101)]('-')[0x0];
                                                else {
                                                    if (_0x144f77[_0x2a1cba(0x35c)] === _0x2a1cba(0x351)) _0x37b46f = _0x144f77[_0x2a1cba(0x20c)][_0x2a1cba(0x101)]('-')[0x0];
                                                    else {
                                                        if (_0x144f77[_0x2a1cba(0x35c)] === _0x2a1cba(0x358)) _0x37b46f = _0x144f77[_0x2a1cba(0x20c)]['split']('-')[0x0];
                                                        else {
                                                            if (_0x144f77['pathhost'] === _0x2a1cba(0x2fc)) _0x37b46f = _0x144f77[_0x2a1cba(0x20c)]['split']('-')[0x0];
                                                            else {
                                                                if (_0x144f77['pathhost'] === 'Fortigate\x20100E') _0x37b46f = _0x144f77[_0x2a1cba(0x20c)][_0x2a1cba(0x101)]('-')[0x0];
                                                                else {
                                                                    if (_0x144f77['pathhost'] === _0x2a1cba(0x32d)) _0x37b46f = _0x144f77['selecthost'][_0x2a1cba(0x101)]('-')[0x0];
                                                                    else {
                                                                        if (_0x144f77[_0x2a1cba(0x35c)] === _0x2a1cba(0x104)) _0x37b46f = _0x144f77[_0x2a1cba(0x20c)]['split']('-')[0x0];
                                                                        else _0x144f77[_0x2a1cba(0x35c)] === _0x2a1cba(0x228) && (_0x37b46f = _0x144f77['selecthost']['split']('.')[0x0]);
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
                                _0xd22724 += _0x2a1cba(0xbd) + _0x144f77[_0x2a1cba(0x229)][_0x2a1cba(0x27b)]('.', '_') + _0x2a1cba(0x36b) + _0x144f77[_0x2a1cba(0x149)]['replaceAll']('.', '_') + _0x2a1cba(0x28a), _0xd22724 += _0x2a1cba(0x148), _0xd22724 += _0x2a1cba(0x3b7), _0xd22724 += _0x2a1cba(0x322), _0xd22724 += '<p\x20class=\x22bold-text\x20mb-0\x20text-color\x22\x20style=\x22font-size:\x2012px;\x22>\x20' + _0x144f77['ipaddress'] + '(' + _0x144f77[_0x2a1cba(0x35c)] + _0x2a1cba(0x31e), _0xd22724 += _0x2a1cba(0x8f), _0xd22724 += '<div\x20class=\x22col-4\x22\x20style=\x22margin-left:2%;\x22>', _0xd22724 += _0x2a1cba(0x2b8) + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x2b2) + _0x144f77[_0x2a1cba(0x1c4)] + _0x2a1cba(0x206) + _0x144f77['hostname'] + '\x22>', _0xd22724 += _0x2a1cba(0x115) + _0x144f77[_0x2a1cba(0x229)] + '\x22\x20data-hosts-name=\x22' + _0x144f77[_0x2a1cba(0x35c)] + _0x2a1cba(0x1f9), _0xd22724 += '<i\x20class=\x22mdi\x20mdi-pen\x20io-con\x22\x20id=\x22edit-onb\x22\x20onclick=\x22editHost(this)\x22\x20data-ipaddress=\x22' + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x202), _0xd22724 += _0x2a1cba(0x93) + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x36e) + _0x144f77[_0x2a1cba(0x3ae)] + _0x2a1cba(0x249) + _0x144f77[_0x2a1cba(0x1c4)] + _0x2a1cba(0x157), _0xd22724 += '</div>', _0xd22724 += _0x2a1cba(0x8f), _0xd22724 += _0x2a1cba(0x136), _0xd22724 += _0x2a1cba(0x3b7), _0xd22724 += _0x2a1cba(0x286), _0xd22724 += '<div\x20class=\x22col-10\x22>', _0xd22724 += _0x2a1cba(0xed) + _0x144f77[_0x2a1cba(0x26d)] + _0x2a1cba(0xe8), _0xd22724 += _0x2a1cba(0x16d) + _0x37b46f + _0x2a1cba(0xe8), _0xd22724 += '<p\x20class=\x22mb-0\x20text-color\x22\x20style=\x22font-size:12px;\x22><b>E-Mail\x20:</b>\x20' + _0x144f77[_0x2a1cba(0xea)] + _0x2a1cba(0xe8), _0xd22724 += '<p\x20class=\x22mb-0\x20text-color\x22\x20style=\x22font-size:12px;\x22><b>Application\x20:</b>\x20' + _0x144f77[_0x2a1cba(0x34e)] + _0x2a1cba(0xe8), _0xd22724 += '</div>', _0xd22724 += '<div\x20class=\x22col-2\x22>';
                                var _0x184e76 = _0x2a1cba(0xa9),
                                    _0xbae81b = 'v3';
                                [_0x16448f, _0xb8dbdd][_0x2a1cba(0x1f1)](function (_0x117ca7) {
                                    var _0x3a3aed = _0x2a1cba;
                                    _0x117ca7[_0x3a3aed(0x1f1)](function (_0x487acd, _0x3454ab) {
                                        var _0x541d7e = _0x3a3aed,
                                            _0x1a7f13 = _0x117ca7 === _0x16448f ? _0x184e76 : _0xbae81b,
                                            _0x2cba9e = _0x117ca7 === _0x16448f ? _0x86c9f1[_0x3454ab] : _0x12577d[_0x3454ab];
                                        _0x487acd === _0x144f77[_0x541d7e(0x229)] && (v3cipaddr = _0x487acd, v2cipaddr = _0x487acd, _0xd22724 += _0x541d7e(0x39e), _0xd22724 += _0x541d7e(0x1ee), _0xd22724 += _0x541d7e(0x274), _0xd22724 += _0x541d7e(0x384), _0xd22724 += '<div\x20class=\x22col-12\x22\x20style=\x22display:flex;margin-left:\x200px\x22>', _0xd22724 += _0x541d7e(0x343) + _0x1a7f13 + _0x541d7e(0x1ba), _0xd22724 += _0x541d7e(0x262) + _0x2cba9e + '\x22\x20data-host-ip=\x22' + _0x487acd + _0x541d7e(0x36e) + _0x1a7f13 + '\x22\x20style=\x22color:red;\x20float:right\x22></i>', _0xd22724 += _0x541d7e(0x8f), _0xd22724 += '</div>', _0xd22724 += _0x541d7e(0x392), _0xd22724 += _0x541d7e(0x8f));
                                    });
                                });
                                var _0x17cfa1 = [{
                                    'type': _0x2a1cba(0x251),
                                    'addrArr': _0x3cd537
                                }, {
                                    'type': _0x2a1cba(0xe6),
                                    'addrArr': _0x42199b
                                }, {
                                    'type': _0x2a1cba(0x283),
                                    'addrArr': _0x5b4d2a
                                }, {
                                    'type': _0x2a1cba(0x103),
                                    'addrArr': _0x52c916
                                }, {
                                    'type': 'Window\x20Expo',
                                    'addrArr': _0x315a63
                                }];
                                _0x17cfa1['forEach'](function (_0x4cf2ea) {
                                    var _0x4af698 = _0x2a1cba;
                                    if (_0x4cf2ea[_0x4af698(0x378)][_0x4af698(0x14b)](_0x144f77[_0x4af698(0x229)])) {
                                        var _0x39ebe1 = '';
                                        if (_0x4cf2ea[_0x4af698(0x222)] === _0x4af698(0x251)) _0x39ebe1 = _0x4af698(0x193);
                                        else {
                                            if (_0x4cf2ea[_0x4af698(0x222)] === 'idrac') _0x39ebe1 = _0x4af698(0x193);
                                            else {
                                                if (_0x4cf2ea[_0x4af698(0x222)] === 'Node\x20Expo') _0x39ebe1 = '<i\x20class=\x22mdi\x20mdi-alpha-n-box-outline\x20icon-val\x22\x20style=\x22color:#55a8fd;\x22></i>';
                                                else {
                                                    if (_0x4cf2ea[_0x4af698(0x222)] === _0x4af698(0xd1)) _0x39ebe1 = _0x4af698(0x2db);
                                                    else _0x4cf2ea[_0x4af698(0x222)] === 'Nginx\x20Expo' && (_0x39ebe1 = _0x4af698(0x2d7));
                                                }
                                            }
                                        }
                                        _0xd22724 += '<div\x20class=\x22icon-let\x22>', _0xd22724 += _0x39ebe1, _0xd22724 += _0x4af698(0x274), _0xd22724 += _0x4af698(0x384), _0xd22724 += _0x4af698(0x347), _0xd22724 += _0x4af698(0x343) + _0x4cf2ea[_0x4af698(0x222)] + _0x4af698(0x1ba), _0xd22724 += _0x4af698(0x2f8) + _0x4cf2ea['addrArr'][_0x4af698(0x2b1)](',') + _0x4af698(0x36e) + _0x4cf2ea[_0x4af698(0x222)] + _0x4af698(0x2c8), _0xd22724 += '</div>', _0xd22724 += _0x4af698(0x8f), _0xd22724 += '</span>', _0xd22724 += _0x4af698(0x8f);
                                    }
                                }), _0xd22724 += _0x2a1cba(0x8f), _0xd22724 += _0x2a1cba(0x8f), _0xd22724 += '</div>', _0xd22724 += '</div>', _0xd22724 += _0x2a1cba(0xf2), _0x3e263f = _0x144f77[_0x2a1cba(0x35c)];
                                var _0x42b13c = '',
                                    _0x5acc4e = 'ip_' + _0x144f77[_0x2a1cba(0x149)][_0x2a1cba(0x27b)]('.', '_');
                                if (_0x3e263f == _0x2a1cba(0x281) || _0x3e263f == 'VM') {
                                    scount++, $(_0x2a1cba(0xbf))[_0x2a1cba(0x25c)](), $(_0x2a1cba(0x9a))[_0x2a1cba(0x140)]();
                                    var _0x4cfc38 = document['getElementById'](_0x5acc4e);
                                    !_0x4cfc38 ? (_0x42b13c += _0x2a1cba(0x297) + _0x5acc4e + '\x22>', _0x42b13c += _0xd22724, _0x42b13c += _0x2a1cba(0x8f), $(_0x2a1cba(0x25e))[_0x2a1cba(0x122)](_0x42b13c)) : (!_0x4cfc38['classList'][_0x2a1cba(0x10f)](_0x2a1cba(0x38b)) && _0x4cfc38['classList'][_0x2a1cba(0x30b)](_0x2a1cba(0x38b)), $(_0x2a1cba(0x105) + _0x5acc4e)[_0x2a1cba(0x122)](_0xd22724), $('#s_hw\x20#' + _0x5acc4e + _0x2a1cba(0x15d))['css'](_0x2a1cba(0x34c), 'transparent'));
                                    changeBorderColorByDataName('s' + _0x144f77[_0x2a1cba(0x149)][_0x2a1cba(0x10c)](/\./g, '_'));
                                    var _0x246f03 = _0x2a1cba(0x201),
                                        _0xa3bd91 = _0x2a1cba(0xab);
                                    document[_0x2a1cba(0x259)]('server-heading')[_0x2a1cba(0x3a3)] = _0x2a1cba(0x21f) + scount + _0x2a1cba(0xa7) + _0x246f03 + _0x2a1cba(0x92) + _0x144f77['ipaddress'] + _0x2a1cba(0x161) + _0x246f03 + _0x2a1cba(0x180), $(_0x2a1cba(0xcb))[_0x2a1cba(0x122)](_0x2a1cba(0x395) + _0xa3bd91 + _0x2a1cba(0x2ca) + _0xa3bd91 + '\x27,\x27' + _0x144f77[_0x2a1cba(0x229)] + '\x27)\x22></i><i\x20class=\x22mdi\x20mdi-close\x20icon-clsbtn\x22\x20id=\x22icon-close\x22\x20onclick=\x22closesearchbar(\x27' + _0x246f03 + _0x2a1cba(0x25d));
                                } else {
                                    if (_0x3e263f == 'Gateway\x20Switch') {
                                        gcount++, $(_0x2a1cba(0xbf))[_0x2a1cba(0x25c)](), $('#gswi')[_0x2a1cba(0x140)](), $(_0x2a1cba(0x11b))[_0x2a1cba(0x122)](_0xd22724);
                                        var _0x246f03 = _0x2a1cba(0x285),
                                            _0xa3bd91 = _0x2a1cba(0x1b7);
                                        document[_0x2a1cba(0x259)](_0x2a1cba(0x334))[_0x2a1cba(0x3a3)] = _0x2a1cba(0x1c5) + gcount + _0x2a1cba(0xa7) + _0x246f03 + '\x22\x20id=\x22no-lens' + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x161) + _0x246f03 + _0x2a1cba(0x180), $(_0x2a1cba(0x17f))[_0x2a1cba(0x122)]('<div\x20class=\x22row\x22\x20id=\x22gatewaysearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag' + _0xa3bd91 + _0x2a1cba(0x2ca) + _0xa3bd91 + _0x2a1cba(0x1d8) + _0x144f77['ipaddress'] + _0x2a1cba(0x37f) + _0x246f03 + _0x2a1cba(0x25d));
                                    } else {
                                        if (_0x3e263f == _0x2a1cba(0x304)) {
                                            pcount++, $(_0x2a1cba(0xbf))[_0x2a1cba(0x25c)](), $(_0x2a1cba(0x317))[_0x2a1cba(0x140)](), $(_0x2a1cba(0x9c))[_0x2a1cba(0x122)](_0xd22724);
                                            var _0x246f03 = _0x2a1cba(0x94),
                                                _0xa3bd91 = _0x2a1cba(0x1ed);
                                            document[_0x2a1cba(0x259)](_0x2a1cba(0x16a))[_0x2a1cba(0x3a3)] = _0x2a1cba(0x8e) + pcount + _0x2a1cba(0xa7) + _0x246f03 + _0x2a1cba(0x92) + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x161) + _0x246f03 + _0x2a1cba(0x180), $(_0x2a1cba(0x129))[_0x2a1cba(0x122)]('<div\x20class=\x22row\x22\x20id=\x22publicsearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag' + _0xa3bd91 + _0x2a1cba(0x2ca) + _0xa3bd91 + _0x2a1cba(0x1d8) + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x37f) + _0x246f03 + _0x2a1cba(0x25d));
                                        } else {
                                            if (_0x3e263f[_0x2a1cba(0x14b)](_0x2a1cba(0x1d3))) {
                                                fcount++, $(_0x2a1cba(0xbf))['hide'](), $('#fswi')[_0x2a1cba(0x140)](), $(_0x2a1cba(0x361))[_0x2a1cba(0x122)](_0xd22724);
                                                var _0x246f03 = 'firwallsearch-row',
                                                    _0xa3bd91 = _0x2a1cba(0x29f);
                                                document[_0x2a1cba(0x259)](_0x2a1cba(0xf1))[_0x2a1cba(0x3a3)] = _0x2a1cba(0x3b0) + fcount + _0x2a1cba(0xa7) + _0x246f03 + '\x22\x20id=\x22no-lens' + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x161) + _0x246f03 + _0x2a1cba(0x180), $('#fswitch-heading')['append'](_0x2a1cba(0xc8) + _0xa3bd91 + '\x22\x20aria-label=\x22Search\x22><div\x20class=\x22input-group-append\x22><button\x20class=\x22btn\x20btn-outline-secondary\x20button-clr\x20size12\x22\x20type=\x22button\x22><i\x20class=\x22mdi\x20mdi-magnify\x20icon-btnclr\x22\x20id=\x22icon-search\x22\x20style=\x22position:\x20inherit;font-size:18px;\x22\x20id=\x22i_\x22\x20onclick=\x22swapDivgonb(this,\x27' + _0xa3bd91 + _0x2a1cba(0x1d8) + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x37f) + _0x246f03 + _0x2a1cba(0x25d));
                                            } else {
                                                if (_0x3e263f['includes'](_0x2a1cba(0xb9))) {
                                                    rcount++, $('#nohost')[_0x2a1cba(0x25c)](), $(_0x2a1cba(0x33d))['show'](), $(_0x2a1cba(0x2ad))[_0x2a1cba(0x122)](_0xd22724);
                                                    var _0x246f03 = _0x2a1cba(0x225),
                                                        _0xa3bd91 = _0x2a1cba(0x3a5);
                                                    document['getElementById'](_0x2a1cba(0x1fc))['innerHTML'] = _0x2a1cba(0x196) + rcount + _0x2a1cba(0xa7) + _0x246f03 + _0x2a1cba(0x92) + _0x144f77['ipaddress'] + _0x2a1cba(0x161) + _0x246f03 + _0x2a1cba(0x180), $(_0x2a1cba(0x253))[_0x2a1cba(0x122)]('<div\x20class=\x22row\x22\x20id=\x22routersearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag' + _0xa3bd91 + _0x2a1cba(0x2ca) + _0xa3bd91 + _0x2a1cba(0x1d8) + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x37f) + _0x246f03 + '\x27)\x22\x20style=\x22position:\x20inherit;font-size:18px;\x22></i></button></div></div></div><div\x20class=\x22col-2\x22\x20text-right></div></div>');
                                                } else {
                                                    if (_0x3e263f == _0x2a1cba(0x216)) {
                                                        ecount++, $(_0x2a1cba(0xbf))['hide'](), $('#eswi')[_0x2a1cba(0x140)](), $(_0x2a1cba(0xe7))[_0x2a1cba(0x122)](_0xd22724);
                                                        var _0x246f03 = _0x2a1cba(0x315),
                                                            _0xa3bd91 = 'e_swi';
                                                        document[_0x2a1cba(0x259)](_0x2a1cba(0x363))[_0x2a1cba(0x3a3)] = _0x2a1cba(0x1a1) + ecount + _0x2a1cba(0xa7) + _0x246f03 + '\x22\x20id=\x22no-lens' + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x161) + _0x246f03 + _0x2a1cba(0x180), $(_0x2a1cba(0xee))[_0x2a1cba(0x122)]('<div\x20class=\x22row\x22\x20id=\x22exchangesearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag' + _0xa3bd91 + _0x2a1cba(0x2ca) + _0xa3bd91 + '\x27,\x27' + _0x144f77[_0x2a1cba(0x229)] + _0x2a1cba(0x37f) + _0x246f03 + _0x2a1cba(0x25d));
                                                    } else swal(_0x2a1cba(0x114) + _0x144f77[_0x2a1cba(0x35c)] + _0x2a1cba(0x2a1) + _0x144f77[_0x2a1cba(0x229)], '\x20', _0x2a1cba(0x312)), $(_0x2a1cba(0xbf))['hide'](), $(_0x2a1cba(0x20d))['show'](), $('#un_swi')[_0x2a1cba(0x122)](_0xd22724);
                                                }
                                            }
                                        }
                                    }
                                }
                                $(_0x2a1cba(0x236))['show'](), $(_0x2a1cba(0x344))['show']();
                            } else console[_0x2a1cba(0x217)](_0x2a1cba(0x36c), _0x3bf700[_0x2a1cba(0x23f)]);
                        }, _0x3bf700['onerror'] = function () {
                            var _0x9dca3c = _0x42ca2e;
                            console[_0x9dca3c(0x217)](_0x9dca3c(0x36c), _0x3bf700[_0x9dca3c(0x23f)]);
                        }, _0x3bf700[_0x42ca2e(0x341)]();
                    } else console[_0x42ca2e(0x217)](_0x42ca2e(0x36c), _0x55afc2[_0x42ca2e(0x23f)]);
                }, _0x55afc2[_0x45dd86(0x130)] = function () {
                    var _0x103819 = _0x45dd86;
                    console[_0x103819(0x217)](_0x103819(0x36c), _0x55afc2['statusText']);
                }, _0x55afc2[_0x45dd86(0x341)]();
            });
        } else console[_0x513806(0x217)]('Error:', _0x7a46a1['statusText']);
    }, _0x7a46a1['onerror'] = function () {
        var _0x2af5f2 = _0x2f460a;
        console['error']('Error:', _0x7a46a1[_0x2af5f2(0x23f)]);
    }, _0x7a46a1[_0x2f460a(0x341)](JSON[_0x2f460a(0x1bd)](_0xaee80f));
}

function getRandomColor() {
    var _0x24375f = _0x772837;
    const _0x39621e = _0x24375f(0x333);
    let _0x259458 = '#';
    for (let _0x25a653 = 0x0; _0x25a653 < 0x6; _0x25a653++) {
        _0x259458 += _0x39621e[Math[_0x24375f(0x367)](Math['random']() * 0x10)];
    }
    return _0x259458;
}

function changeBorderColorByDataName(_0x177d9a) {
    var _0x366a04 = _0x772837;
    const _0x31b713 = document[_0x366a04(0x124)]('.border-changeable[data-name=\x22' + _0x177d9a + '\x22]'),
        _0xaab49d = getRandomColor();
    _0x31b713[_0x366a04(0x1f1)](_0x57741a => {
        var _0x13396d = _0x366a04;
        _0x57741a[_0x13396d(0x1b4)][_0x13396d(0x2a3)] = _0x13396d(0x33e);
    });
}
$(document)['on'](_0x772837(0x160), _0x772837(0x134), function () {
    var _0x21bcd0 = _0x772837;
    $(this)['toggleClass'](_0x21bcd0(0x26f)), $(this)['siblings'](_0x21bcd0(0x28f))[_0x21bcd0(0x2e6)](_0x21bcd0(0x140));
}), $(document)['on']('click', '.circle-menu\x20div', function () {
    var _0x29cbd3 = _0x772837;
    console[_0x29cbd3(0x330)](_0x29cbd3(0x10a), $(this)['attr'](_0x29cbd3(0x321)));
});

function displaysearchbar(_0x29120f) {
    var _0x553c46 = _0x772837;
    $('#' + _0x29120f)['css'](_0x553c46(0x2e2)) != _0x553c46(0x13e) ? ($('.hide-val' + _0x29120f)[_0x553c46(0x140)](), $('#' + _0x29120f)[_0x553c46(0x235)](_0x553c46(0x2e2), _0x553c46(0x13e))) : ($(_0x553c46(0x135) + _0x29120f)['hide'](), $('#' + _0x29120f)['css'](_0x553c46(0x2e2), _0x553c46(0x1f5)));
}

function closesearchbar(_0x486ad6) {
    var _0x5bca04 = _0x772837;
    $('#' + _0x486ad6)['css']('display', 'none'), $(_0x5bca04(0x135) + _0x486ad6)[_0x5bca04(0x140)]();
}

function swapDivgonb(_0x28ab54, _0x4bf945, _0x4e4418) {
    var _0x5283e2 = _0x772837,
        _0x4c6196 = $(_0x5283e2(0x112) + _0x4bf945)[_0x5283e2(0x23c)](),
        _0x419811 = 's' + _0x4c6196[_0x5283e2(0x27b)]('.', '_');
    _0x28ab54 = document['getElementById'](_0x419811), _0x28ab54[_0x5283e2(0x12c)]['insertBefore'](_0x28ab54, document[_0x5283e2(0x259)](_0x4bf945)[_0x5283e2(0x13b)][0x0]), _0x28ab54[_0x5283e2(0x311)]('afterend', '&ensp;&ensp;');
}

function deleteSelectedHosts() {
    var _0x399e0f = _0x772837;
    const _0xffc115 = [],
        _0x4f0c41 = [],
        _0x5e8ba6 = [];
    $(_0x399e0f(0x226))[_0x399e0f(0x1a9)](function () {
        var _0x1c6469 = _0x399e0f;
        _0xffc115[_0x1c6469(0x239)]($(this)['data'](_0x1c6469(0x229)));
        const _0x490166 = $(this)[_0x1c6469(0x29a)](_0x1c6469(0x1c4));
        Array['isArray'](_0x490166) && _0x490166[_0x1c6469(0xf7)] === 0x2 && _0x490166[0x0][_0x1c6469(0xf7)] === 0x0 && _0x490166[0x1][_0x1c6469(0xf7)] === 0x0 ? _0x4f0c41[_0x1c6469(0x239)]('') : _0x4f0c41[_0x1c6469(0x239)](_0x490166), _0x5e8ba6[_0x1c6469(0x239)]($(this)[_0x1c6469(0x29a)]('hostname'));
    });
    JSON[_0x399e0f(0x1bd)](_0x4f0c41) === _0x399e0f(0x1c3) && (_0x4f0c41[_0x399e0f(0xf7)] = 0x0, _0x4f0c41[_0x399e0f(0x239)](''));
    if (_0xffc115[_0x399e0f(0xf7)] === 0x0) {
        alert('Select\x20at\x20least\x20one\x20card\x20to\x20delete.');
        return;
    }
    swal({
        'title': _0x399e0f(0x366),
        'text': _0x399e0f(0x2d9),
        'type': _0x399e0f(0x312),
        'showCancelButton': !![],
        'confirmButtonClass': _0x399e0f(0x27e),
        'confirmButtonText': _0x399e0f(0x2fb),
        'closeOnConfirm': ![],
        'showLoaderOnConfirm': !![]
    }, function () {
        var _0x582319 = _0x399e0f;
        $(_0x582319(0x3ac))['show'](), requestDataFromServer(_0x582319(0x12d), {
            'ipaddress': JSON[_0x582319(0x1bd)](_0xffc115),
            'subipaddress': JSON[_0x582319(0x1bd)](_0x4f0c41),
            'hostname': JSON[_0x582319(0x1bd)](_0x5e8ba6),
            'csrfmiddlewaretoken': csfr_token
        }, _0x582319(0x227))[_0x582319(0x390)](handledeleteresponse);
    });
}

function hostCloseClick(_0x137cc8) {
    var _0x264cfa = _0x772837;
    toBeDeletedHost = !![], deleteBtn = _0x137cc8, swal({
        'title': _0x264cfa(0x12a),
        'text': 'Want\x20to\x20permanently\x20delete\x20this\x20host?',
        'type': _0x264cfa(0x312),
        'showCancelButton': !![],
        'confirmButtonClass': _0x264cfa(0x27e),
        'confirmButtonText': _0x264cfa(0x2fb),
        'closeOnConfirm': ![]
    }, function () {
        var _0x3a07b5 = _0x264cfa;
        if (toBeDeletedHost) {
            const _0x2c0a96 = $(deleteBtn)['attr']('data-host-ip');
            let _0xc0858 = $(deleteBtn)['attr']('data-sub-name');
            const _0x2d986d = $(deleteBtn)[_0x3a07b5(0x29e)](_0x3a07b5(0x2cd));
            _0xc0858 = JSON[_0x3a07b5(0x11d)](_0xc0858);
            Array[_0x3a07b5(0x178)](_0xc0858) && _0xc0858[_0x3a07b5(0xf7)] === 0x2 && _0xc0858[0x0][_0x3a07b5(0xf7)] === 0x0 && _0xc0858[0x1][_0x3a07b5(0xf7)] === 0x0 ? _0xc0858 = '' : _0xc0858 = JSON[_0x3a07b5(0x1bd)](_0xc0858);
            const _0x1aefab = {
                'ipaddress': [_0x2c0a96],
                'subipaddress': [_0xc0858 === '[]' ? '' : _0xc0858],
                'hostname': [_0x2d986d]
            };
            $('.loader')[_0x3a07b5(0x140)](), requestDataFromServer('deletehost', {
                'ipaddress': JSON[_0x3a07b5(0x1bd)](_0x1aefab[_0x3a07b5(0x229)]),
                'subipaddress': JSON['stringify'](_0x1aefab[_0x3a07b5(0x1c4)]),
                'hostname': JSON[_0x3a07b5(0x1bd)](_0x1aefab[_0x3a07b5(0x3ae)]),
                'csrfmiddlewaretoken': csfr_token
            }, 'POST')[_0x3a07b5(0x390)](handledeleteresponse);
        } else {
            var _0x2c07bf = parseInt($(deleteBtn)[_0x3a07b5(0x29e)](_0x3a07b5(0x2b7))),
                _0x116c76 = 0x0;
            service_list[_0x3a07b5(0x1f1)](function (_0x3dcfb5) {
                parseInt(_0x3dcfb5['id']) === _0x2c07bf && service_list['splice'](_0x116c76, 0x1), _0x116c76++;
            }), $(_0x3a07b5(0x272) + _0x2c07bf)[_0x3a07b5(0x10d)]();
            if (service_list[_0x3a07b5(0xf7)] == 0x0) $(_0x3a07b5(0xff))[_0x3a07b5(0x235)](_0x3a07b5(0x2e2), _0x3a07b5(0x1fb));
        }
    });
}

function handledeleteresponse(_0x17daf4) {
    var _0x2dd4d1 = _0x772837;
    res = JSON[_0x2dd4d1(0x11d)](_0x17daf4);
    if (res[_0x2dd4d1(0x37b)] == 0xc8) swal({
        'title': res[_0x2dd4d1(0x29a)],
        'type': _0x2dd4d1(0x188),
        'confirmButtonClass': _0x2dd4d1(0x335),
        'confirmButtonText': 'OK'
    }, function (_0x1faf91) {
        var _0x3a8c4d = _0x2dd4d1;
        _0x1faf91 && location[_0x3a8c4d(0x289)]();
    });
    else swal(res[_0x2dd4d1(0x29a)], '\x20', _0x2dd4d1(0x217));
}

function mgmntCloseClick(_0xc22e8c) {
    var _0x149abe = _0x772837;
    toBeDeletedHost = !![], deleteBtn = _0xc22e8c, swal({
        'title': 'Delete\x20Management',
        'text': _0x149abe(0xf8),
        'type': _0x149abe(0x312),
        'showCancelButton': !![],
        'confirmButtonClass': _0x149abe(0x27e),
        'confirmButtonText': _0x149abe(0x2fb),
        'closeOnConfirm': ![]
    }, function () {
        mgmtdeleteEntry();
    });
}

function mgmtdeleteEntry() {
    var _0x2a8373 = _0x772837;
    if (toBeDeletedHost) {
        var _0x1b4ebe = $(deleteBtn)[_0x2a8373(0x29e)](_0x2a8373(0x2cd)),
            _0x5c92c3 = $(deleteBtn)[_0x2a8373(0x29e)]('data-host-ip');
        $('.loader')[_0x2a8373(0x140)]();
        var _0x473625 = new XMLHttpRequest();
        _0x473625[_0x2a8373(0x34a)]('POST', leurl + _0x2a8373(0x348), !![]), _0x473625[_0x2a8373(0x31f)](_0x2a8373(0x2b5), 'application/json;charset=UTF-8'), _0x473625[_0x2a8373(0x2cf)] = function () {
            var _0x3ded3b = _0x2a8373;
            _0x473625[_0x3ded3b(0x37b)] >= 0xc8 && _0x473625[_0x3ded3b(0x37b)] < 0x12c ? handledeleteresponse(_0x473625['responseText']) : console[_0x3ded3b(0x217)](_0x3ded3b(0x36c), _0x473625[_0x3ded3b(0x23f)]);
        }, _0x473625[_0x2a8373(0x130)] = function () {
            var _0x48e3d9 = _0x2a8373;
            console[_0x48e3d9(0x217)](_0x48e3d9(0x21d));
        }, _0x473625[_0x2a8373(0x341)](JSON[_0x2a8373(0x1bd)]({
            'prototype': _0x1b4ebe,
            'ipaddress': _0x5c92c3,
            'csrfmiddlewaretoken': csfr_token
        }));
    } else {
        var _0x2bd6ca = parseInt($(deleteBtn)[_0x2a8373(0x29e)](_0x2a8373(0x2b7))),
            _0xfe0e89 = 0x0;
        service_list[_0x2a8373(0x1f1)](function (_0x308774) {
            var _0x232c30 = _0x2a8373;
            parseInt(_0x308774['id']) === _0x2bd6ca && service_list[_0x232c30(0x1af)](_0xfe0e89, 0x1), _0xfe0e89++;
        }), $(_0x2a8373(0x272) + _0x2bd6ca)[_0x2a8373(0x10d)]();
        if (service_list[_0x2a8373(0xf7)] == 0x0) $(_0x2a8373(0xff))[_0x2a8373(0x235)](_0x2a8373(0x2e2), _0x2a8373(0x1fb));
    }
}
let exportone = _0x58ccd9 => {
    var _0x108b3c = _0x772837;
    const _0x65436c = _0x58ccd9[_0x108b3c(0x132)]('data-ipaddress-name'),
        _0x1cf1f4 = _0x58ccd9[_0x108b3c(0x132)]('data-hosts-name');
    console['log'](_0x108b3c(0x305) + _0x1cf1f4), requestDataFromServer(_0x108b3c(0x22c), {
        'csrfmiddlewaretoken': csfr_token
    }, 'GET')['done'](function (_0x1f018e) {
        var _0x4eb6ff = _0x108b3c;
        const _0x153db6 = JSON[_0x4eb6ff(0x11d)](_0x1f018e)[_0x4eb6ff(0x29a)],
            _0x1f05af = _0x153db6['find'](_0x340084 => _0x340084[_0x4eb6ff(0x229)] === _0x65436c);
        if (_0x1f05af) {
            const _0x1e420c = new ExcelJS['Workbook'](),
                _0x494c8d = _0x1e420c[_0x4eb6ff(0x39f)](_0x4eb6ff(0x2da)),
                {
                    id: _0x1de9ec,
                    json: _0x30027e,
                    hostname: _0x32d586,
                    mainipaddress: _0x228a85,
                    ..._0x3223a
                } = _0x1f05af,
                _0x3e64a5 = Object[_0x4eb6ff(0x308)](_0x3223a);
            _0x3e64a5['forEach'](([_0x139589, _0x1e56f3], _0x155023) => {
                var _0x26054e = _0x4eb6ff;
                _0x494c8d[_0x26054e(0x162)](0x1, _0x155023 + 0x1)['value'] = _0x139589;
                if (_0x139589 === _0x26054e(0x20c)) {
                    const _0x166e94 = _0x1e56f3['split']('-');
                    if (_0x166e94['length'] > 0x0) {
                        const _0xa2039d = _0x166e94[0x0];
                        console[_0x26054e(0x330)](_0x26054e(0x175) + _0xa2039d), _0x494c8d[_0x26054e(0x162)](0x2, _0x155023 + 0x1)[_0x26054e(0x1a3)] = _0xa2039d;
                    }
                } else _0x494c8d[_0x26054e(0x162)](0x2, _0x155023 + 0x1)[_0x26054e(0x1a3)] = _0x1e56f3;
                console[_0x26054e(0x330)](_0x26054e(0x1b2) + _0x139589), console[_0x26054e(0x330)](_0x26054e(0x9f) + _0x1e56f3);
            });
            let _0x504ab2, _0x38c733;
            _0x1cf1f4 === _0x4eb6ff(0x281) || _0x1cf1f4 === 'VM' ? (_0x504ab2 = requestDataFromServer(_0x4eb6ff(0xa6), {
                'ipaddress': _0x65436c
            }, _0x4eb6ff(0xc5)), _0x38c733 = _0x4eb6ff(0x3a8)) : (_0x504ab2 = requestDataFromServer(_0x4eb6ff(0x14f), {
                'ipaddress': _0x65436c
            }, _0x4eb6ff(0xc5)), _0x38c733 = _0x4eb6ff(0x1d1)), _0x504ab2[_0x4eb6ff(0x390)](function (_0x179b24) {
                var _0x318dce = _0x4eb6ff;
                const _0x29284e = JSON[_0x318dce(0x11d)](_0x179b24)['data'] || [],
                    _0x14743d = _0x1e420c[_0x318dce(0x39f)](_0x38c733),
                    _0x174bac = Object[_0x318dce(0x96)](_0x29284e[_0x318dce(0xf7)] > 0x0 ? _0x29284e[0x0] : {})[_0x318dce(0xb0)](_0x99882f => _0x99882f !== 'id' && _0x99882f !== 'ip_id');
                _0x174bac[_0x318dce(0x1f1)]((_0x1e3d62, _0x5c7a08) => {
                    var _0x180f36 = _0x318dce;
                    _0x14743d[_0x180f36(0x162)](0x1, _0x5c7a08 + 0x1)[_0x180f36(0x1a3)] = _0x1e3d62;
                });
                if (_0x29284e[_0x318dce(0xf7)] > 0x0) _0x29284e[_0x318dce(0x1f1)]((_0x2d3d16, _0x2ec4e0) => {
                    var _0x3912ab = _0x318dce;
                    _0x174bac[_0x3912ab(0x1f1)]((_0x1da86b, _0x4671f6) => {
                        var _0x133258 = _0x3912ab;
                        const _0x3dacb6 = _0x2d3d16[_0x1da86b] === _0x133258(0x32c) ? '' : _0x2d3d16[_0x1da86b];
                        _0x14743d['getCell'](_0x2ec4e0 + 0x2, _0x4671f6 + 0x1)[_0x133258(0x1a3)] = _0x3dacb6;
                    });
                });
                else {
                    const _0x4e7e1b = _0x174bac[_0x318dce(0x1c6)]((_0x30e7a4, _0x13420a) => ({
                        ..._0x30e7a4,
                        [_0x13420a]: _0x13420a
                    }), {});
                    _0x14743d[_0x318dce(0x1d6)](_0x4e7e1b);
                }
                _0x1e420c[_0x318dce(0xcc)]['writeBuffer']()[_0x318dce(0x382)](_0x4489e9 => {
                    var _0x224321 = _0x318dce;
                    const _0x59bf62 = new Blob([_0x4489e9], {
                        'type': _0x224321(0x18c)
                    }),
                        _0x2d6c35 = _0x1f05af[_0x224321(0x229)] + _0x224321(0x278),
                        _0x3b5a83 = document[_0x224321(0xfa)]('a');
                    _0x3b5a83['href'] = window[_0x224321(0x1e3)][_0x224321(0x270)](_0x59bf62), _0x3b5a83[_0x224321(0x245)] = _0x2d6c35, _0x3b5a83[_0x224321(0x1b4)]['display'] = _0x224321(0x13e), document['body'][_0x224321(0x299)](_0x3b5a83), _0x3b5a83[_0x224321(0x160)]();
                });
            });
        } else console[_0x4eb6ff(0x330)](_0x4eb6ff(0x354) + _0x65436c);
    });
},
    exportonbdata = () => {
        var _0x100b80 = _0x772837;
        requestDataFromServer(_0x100b80(0x22c), {
            'csrfmiddlewaretoken': csfr_token
        }, 'GET')['done'](function (_0x2f8f96) {
            var _0x267a90 = _0x100b80;
            const _0xfd28b0 = JSON[_0x267a90(0x11d)](_0x2f8f96)[_0x267a90(0x29a)];
            requestDataFromServer(_0x267a90(0x1ec), {
                'csrfmiddlewaretoken': csfr_token
            }, 'GET')['done'](function (_0x12231a) {
                var _0x40e95d = _0x267a90;
                const _0x19ff4d = JSON['parse'](_0x12231a)['data'];
                requestDataFromServer(_0x40e95d(0x1fa), {
                    'csrfmiddlewaretoken': csfr_token
                }, _0x40e95d(0xc5))[_0x40e95d(0x390)](function (_0x3542e3) {
                    var _0x16904a = _0x40e95d;
                    const _0x4112 = JSON[_0x16904a(0x11d)](_0x3542e3)['data'],
                        _0x475bee = new ExcelJS['Workbook'](),
                        _0x3789a7 = _0x475bee[_0x16904a(0x39f)](_0x16904a(0x399)),
                        _0x5e373a = Object[_0x16904a(0x96)](_0xfd28b0[0x0])[_0x16904a(0xb0)](_0x227444 => _0x227444 !== 'id' && _0x227444 !== 'json' && _0x227444 !== 'hostname' && _0x227444 !== 'mainipaddress');
                    _0x5e373a['forEach']((_0x3cd9da, _0x2a50a5) => {
                        var _0x55aad7 = _0x16904a;
                        _0x3789a7[_0x55aad7(0x162)](0x1, _0x2a50a5 + 0x1)[_0x55aad7(0x1a3)] = _0x3cd9da;
                    }), _0xfd28b0[_0x16904a(0x1f1)]((_0x5ea2c3, _0x1fab7f) => {
                        var _0x3023bb = _0x16904a;
                        const _0x4bab0c = _0x5e373a[_0x3023bb(0x2fd)](_0x1c2e5 => {
                            var _0x366fa9 = _0x3023bb;
                            if (_0x1c2e5 === _0x366fa9(0x20c)) {
                                const _0x1fbcfd = _0x5ea2c3[_0x1c2e5][_0x366fa9(0x101)]('-');
                                if (_0x1fbcfd[_0x366fa9(0xf7)] > 0x0) return _0x1fbcfd[0x0];
                            }
                            return _0x5ea2c3[_0x1c2e5];
                        });
                        _0x4bab0c[_0x3023bb(0x1f1)]((_0x27550f, _0x13ed52) => {
                            var _0x55c157 = _0x3023bb;
                            _0x3789a7[_0x55c157(0x162)](_0x1fab7f + 0x2, _0x13ed52 + 0x1)[_0x55c157(0x1a3)] = _0x27550f;
                        });
                    });
                    if (_0x19ff4d[_0x16904a(0xf7)] > 0x0) {
                        const _0x15e8f9 = _0x475bee[_0x16904a(0x39f)]('mgmt-Addon'),
                            _0x4fc30c = Object[_0x16904a(0x96)](_0x19ff4d[0x0])['filter'](_0x175acf => _0x175acf !== 'id' && _0x175acf !== _0x16904a(0x355));
                        _0x4fc30c[_0x16904a(0x1f1)]((_0x2f1a62, _0x1d5bab) => {
                            var _0x514098 = _0x16904a;
                            _0x15e8f9[_0x514098(0x162)](0x1, _0x1d5bab + 0x1)[_0x514098(0x1a3)] = _0x2f1a62;
                        }), _0x19ff4d['forEach']((_0x2cb851, _0x5a492b) => {
                            var _0x5c5e14 = _0x16904a;
                            const _0x5ceae6 = _0x4fc30c[_0x5c5e14(0x2fd)](_0x3b3948 => _0x2cb851[_0x3b3948] === '{}' ? '' : _0x2cb851[_0x3b3948]);
                            _0x5ceae6['forEach']((_0x63ccc8, _0x406bd0) => {
                                var _0x4c47be = _0x5c5e14;
                                _0x15e8f9['getCell'](_0x5a492b + 0x2, _0x406bd0 + 0x1)[_0x4c47be(0x1a3)] = _0x63ccc8;
                            });
                        });
                    } else _0x475bee[_0x16904a(0x39f)](_0x16904a(0x3a8));
                    if (_0x4112['length'] > 0x0) {
                        const _0x196cd1 = _0x475bee[_0x16904a(0x39f)]('snmp'),
                            _0x22b803 = Object[_0x16904a(0x96)](_0x4112[0x0])[_0x16904a(0xb0)](_0xb5ce56 => _0xb5ce56 !== 'id' && _0xb5ce56 !== 'ip_id');
                        _0x22b803[_0x16904a(0x1f1)]((_0x4e8efa, _0x1d87c1) => {
                            var _0x174d1a = _0x16904a;
                            _0x196cd1[_0x174d1a(0x162)](0x1, _0x1d87c1 + 0x1)[_0x174d1a(0x1a3)] = _0x4e8efa;
                        }), _0x4112['forEach']((_0x26d099, _0x701dfb) => {
                            var _0x16d5e2 = _0x16904a;
                            const _0x3250aa = _0x22b803[_0x16d5e2(0x2fd)](_0x24290d => _0x26d099[_0x24290d] === _0x16d5e2(0x32c) ? '' : _0x26d099[_0x24290d]);
                            _0x3250aa[_0x16d5e2(0x1f1)]((_0x431137, _0x504a40) => {
                                _0x196cd1['getCell'](_0x701dfb + 0x2, _0x504a40 + 0x1)['value'] = _0x431137;
                            });
                        });
                    } else _0x475bee[_0x16904a(0x39f)](_0x16904a(0x1d1));
                    _0x475bee[_0x16904a(0xcc)]['writeBuffer']()[_0x16904a(0x382)](_0x4fb250 => {
                        var _0x4fad80 = _0x16904a;
                        const _0x2b6add = new Blob([_0x4fb250], {
                            'type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        }),
                            _0x209c91 = _0x4fad80(0x2e9),
                            _0x19e32b = document[_0x4fad80(0xfa)]('a');
                        _0x19e32b['href'] = window[_0x4fad80(0x1e3)]['createObjectURL'](_0x2b6add), _0x19e32b['download'] = _0x209c91, _0x19e32b['style'][_0x4fad80(0x2e2)] = _0x4fad80(0x13e), document[_0x4fad80(0x29c)][_0x4fad80(0x299)](_0x19e32b), _0x19e32b[_0x4fad80(0x160)]();
                    });
                });
            });
        });
    };
async function importonbdata() {
    var _0x4ce2cf = _0x772837;
    const _0x322d53 = document[_0x4ce2cf(0x259)](_0x4ce2cf(0x2a2)),
        _0x5f4430 = _0x322d53[_0x4ce2cf(0x28c)];
    let _0x257218 = 0x0;

    function _0x1149b3(_0x54b32c) {
        return new Promise((_0x4ff3d0, _0x3df1b9) => {
            var _0x26f72f = _0x143e;
            if (_0x54b32c >= _0x5f4430[_0x26f72f(0xf7)]) {
                _0x4ff3d0();
                return;
            }
            const _0x19c60b = _0x5f4430[_0x54b32c],
                _0x535c8d = new FileReader();
            _0x535c8d['onload'] = function (_0x803269) {
                var _0x38ed3d = _0x26f72f;
                const _0x105258 = _0x803269[_0x38ed3d(0x26c)]['result'],
                    _0x13e2d7 = XLSX[_0x38ed3d(0x197)](_0x105258, {
                        'type': _0x38ed3d(0x364)
                    }),
                    _0x410f6c = _0x13e2d7['SheetNames'];
                async function _0x143aa9(_0x4fe502) {
                    var _0x4b450c = _0x38ed3d;
                    if (_0x4fe502 < _0x410f6c['length']) {
                        const _0x4d7531 = _0x410f6c[_0x4fe502],
                            _0xb5b34a = _0x13e2d7[_0x4b450c(0xd6)][_0x4d7531],
                            _0x1811a8 = XLSX[_0x4b450c(0x153)][_0x4b450c(0x359)](_0xb5b34a);
                        async function _0x4a61ab(_0x2485ea) {
                            var _0x4c82af = _0x4b450c;
                            if (_0x2485ea < _0x1811a8[_0x4c82af(0xf7)]) {
                                const _0x444d6d = _0x1811a8[_0x2485ea],
                                    _0x150f4c = _0x444d6d['ipaddress'];
                                swal({
                                    'title': _0x4c82af(0x288),
                                    'text': _0x4c82af(0x2ba) + _0x150f4c + _0x4c82af(0x292) + _0x4d7531 + _0x4c82af(0x170),
                                    'showCancelButton': ![],
                                    'showConfirmButton': ![],
                                    'allowOutsideClick': ![],
                                    'allowEscapeKey': ![],
                                    'allowEnterKey': ![],
                                    'showLoaderOnConfirm': !![]
                                }), await new Promise(_0x48f735 => setTimeout(_0x48f735, 0x3e8)), await _0x4a61ab(_0x2485ea + 0x1);
                            } else await saveToDatabase(JSON[_0x4c82af(0x1bd)](_0x1811a8), _0x4d7531), _0x143aa9(_0x4fe502 + 0x1);
                        }
                        await _0x4a61ab(0x0);
                    } else _0x4ff3d0(_0x1149b3(_0x54b32c + 0x1));
                }
                _0x143aa9(0x0);
            }, _0x535c8d[_0x26f72f(0x2b3)](_0x19c60b);
        });
    }
    await _0x1149b3(_0x257218);
}
const allInvalidIpAddresses = [],
    mgmtInvalidIpAddresses = [],
    non_validated_snmp_ipaddresses = [];
async function saveToDatabase(_0x4eac26, _0x3bd551) {
    var _0x403f0c = _0x772837;
    if (_0x4eac26 === null) {
        console[_0x403f0c(0x217)]('Contents\x20are\x20null');
        return;
    }
    const _0xe6d945 = new XMLHttpRequest(),
        _0x221238 = _0x403f0c(0x1fd),
        _0x395025 = 'POST';
    _0xe6d945['open'](_0x395025, _0x221238, !![]), _0xe6d945[_0x403f0c(0x31f)]('Content-Type', 'application/json');
    const _0x5a0c5d = getCookie(_0x403f0c(0x1ce));
    _0xe6d945['setRequestHeader'](_0x403f0c(0x169), _0x5a0c5d);
    try {
        const _0x4660d8 = await sendRequest(_0xe6d945, _0x4eac26, _0x3bd551);
        console[_0x403f0c(0x330)](_0x403f0c(0x1b0) + JSON[_0x403f0c(0x1bd)](_0x4660d8));
        if (_0x4660d8['status'] === _0x403f0c(0x312)) {
            let _0x1c80c2 = _0x4660d8[_0x403f0c(0x172)],
                _0x1f384c = '';
            allInvalidIpAddresses[_0x403f0c(0x239)](..._0x4660d8['invalid_ip_addresses']), mgmtInvalidIpAddresses[_0x403f0c(0x239)](..._0x4660d8[_0x403f0c(0x397)][_0x403f0c(0x2fd)](_0x29a1fe => _0x29a1fe['ip'] + '\x20(' + _0x29a1fe['prototype'] + ')')), Array[_0x403f0c(0x178)](allInvalidIpAddresses) && allInvalidIpAddresses[_0x403f0c(0xf7)] > 0x0 && (_0x1c80c2 += '\x0aWarning:\x20The\x20following\x20IP\x20addresses\x20are\x20invalid:\x20' + allInvalidIpAddresses[_0x403f0c(0x2b1)](',\x20')), Array[_0x403f0c(0x178)](mgmtInvalidIpAddresses) && mgmtInvalidIpAddresses['length'] > 0x0 && (_0x1f384c += _0x403f0c(0x2d8) + mgmtInvalidIpAddresses[_0x403f0c(0x2b1)](',\x20') + _0x403f0c(0x211)), Array['isArray'](_0x4660d8['non_validated_snmp_ipaddresses']) && _0x4660d8['non_validated_snmp_ipaddresses']['length'] > 0x0 && (_0x1f384c += _0x403f0c(0x223) + _0x4660d8['non_validated_snmp_ipaddresses'][_0x403f0c(0x2fd)](_0x563d0c => _0x563d0c['ip'] + _0x403f0c(0x174) + _0x563d0c[_0x403f0c(0x27c)] + ')')[_0x403f0c(0x2b1)](',\x20') + '</p></i>'), await new Promise(_0x600b11 => setTimeout(_0x600b11, 0x3e8)), swal({
                'title': _0x1c80c2,
                'html': !![],
                'text': _0x1f384c,
                'type': _0x403f0c(0x312),
                'confirmButtonClass': _0x403f0c(0x335),
                'confirmButtonText': 'OK'
            }, _0x32ebe5 => {
                var _0x53e944 = _0x403f0c;
                _0x32ebe5 && parent[_0x53e944(0x25f)][_0x53e944(0x22f)]['reload'](!![]);
            }), console['error'](_0x403f0c(0x2be), _0x4660d8[_0x403f0c(0x172)]);
        } else swal({
            'title': _0x4660d8[_0x403f0c(0x172)],
            'type': _0x403f0c(0x188),
            'confirmButtonClass': 'btn-success',
            'confirmButtonText': 'OK'
        }, _0x373fda => {
            var _0xcbe43f = _0x403f0c;
            _0x373fda && parent[_0xcbe43f(0x25f)][_0xcbe43f(0x22f)][_0xcbe43f(0x289)](!![]);
        }), console[_0x403f0c(0x330)](_0x403f0c(0x154), _0x4660d8[_0x403f0c(0x172)]);
    } catch (_0x475193) {
        swal(_0x403f0c(0x194) + _0x3bd551 + '\x27:\x20Server\x20Error', '\x20', _0x403f0c(0x217)), console[_0x403f0c(0x217)](_0x403f0c(0x194) + _0x3bd551 + _0x403f0c(0x168), _0x475193);
    }
}

function sendRequest(_0x4ad2bd, _0x282b6c, _0x471754) {
    return new Promise((_0x5486f9, _0x472a52) => {
        var _0x5681e5 = _0x143e;
        _0x4ad2bd[_0x5681e5(0x2cf)] = function () {
            var _0x5cc549 = _0x5681e5;
            if (_0x4ad2bd[_0x5cc549(0x37b)] === 0xc8) {
                const _0x11e49b = JSON[_0x5cc549(0x11d)](_0x4ad2bd['responseText']);
                _0x5486f9(_0x11e49b);
            } else _0x472a52(_0x4ad2bd[_0x5cc549(0x37b)]);
        }, _0x4ad2bd[_0x5681e5(0x341)](_0x282b6c);
    });
}

function getCookie(_0xaa79e6) {
    var _0x34f619 = _0x772837;
    const _0x5b37d5 = document[_0x34f619(0x329)]['match'](_0x34f619(0x214) + _0xaa79e6 + _0x34f619(0x35f));
    return _0x5b37d5 ? _0x5b37d5[_0x34f619(0x1a4)]() : '';
}

function downloadtemp() {
    var _0x456104 = _0x772837;
    console['log']('file\x20temp');
    var _0x1bc85e = _0x456104(0x25a),
        _0x3edc99 = '/allonboard/download_file?testname=' + encodeURIComponent(_0x1bc85e) + _0x456104(0x39d) + encodeURIComponent(csfr_token);
    window['location']['href'] = _0x3edc99;
}
var editipaddr = '';

function editHost(_0x27889) {
    var _0x1e3e60 = _0x772837;
    isEdit = !![];
    var _0x264f7d = $(_0x27889)[_0x1e3e60(0x29a)]('ipaddress');
    editipaddr = _0x264f7d, validationip = editipaddr, $('#modalBodyStep5')[_0x1e3e60(0x241)](_0x1e3e60(0xd9))[_0x1e3e60(0x275)](_0x264f7d), $(_0x1e3e60(0xbb))['modal'](_0x1e3e60(0x140)), showModalSteps(0x1);
}

function showModalSteps(_0x81aaf4) {
    var _0x377270 = _0x772837,
        _0x1635ba = {},
        _0x5a2894 = _0x81aaf4;
    $(_0x377270(0x215))[_0x377270(0x25c)](), _0x529b1b(), $(_0x377270(0x3b3) + _0x81aaf4)[_0x377270(0x140)]();
    var _0x1571fe = new XMLHttpRequest();
    _0x1571fe[_0x377270(0x34a)](_0x377270(0xc5), leurl + _0x377270(0x357), !![]), _0x1571fe[_0x377270(0x31f)](_0x377270(0x2b5), _0x377270(0x9d)), _0x1571fe['onload'] = function () {
        var _0x4f8388 = _0x377270;
        if (_0x1571fe[_0x4f8388(0x37b)] >= 0xc8 && _0x1571fe[_0x4f8388(0x37b)] < 0x12c) {
            var _0x4c037f = JSON['parse'](_0x1571fe['responseText']),
                _0xac9a5a = _0x4c037f[_0x4f8388(0x29a)];
            _0xac9a5a[_0x4f8388(0x1f1)](function (_0x4c3787) {
                var _0x513968 = _0x4f8388;
                editipaddr == _0x4c3787[_0x513968(0x229)] && _0x1546be(_0x4c3787, _0x5a2894, selectedonbValue);
            });
        } else console[_0x4f8388(0x217)](_0x4f8388(0x187), _0x1571fe[_0x4f8388(0x37b)]);
    }, _0x1571fe['onerror'] = function () {
        var _0x43d227 = _0x377270;
        console[_0x43d227(0x217)](_0x43d227(0x21d));
    }, _0x1571fe['send']();

    function _0x19411e(_0x3d5160, _0x1fddd0, _0x513e39) {
        var _0x4db889 = _0x377270;
        const _0x535d7d = document[_0x4db889(0x259)](_0x3d5160);
        _0x535d7d[_0x4db889(0x182)] = _0x1fddd0, _0x535d7d[_0x4db889(0x336)](new Event(_0x4db889(0x1a6))), _0x513e39 && $('#' + _0x3d5160)[_0x4db889(0x18f)](_0x4db889(0x173), !![]);
    }

    function _0x1546be(_0x50bf3e, _0x1e1157, _0x4fc3ec) {
        var _0x2544a3 = _0x377270;
        if (_0x1e1157 === 0x1) {
            const _0x4af5fc = document[_0x2544a3(0x259)](_0x2544a3(0x284));
            if (_0x50bf3e['pathhost'][_0x2544a3(0x14b)]('Fortigate')) _0x19411e(_0x2544a3(0x284), 0x1, !![]);
            else {
                if (_0x50bf3e['pathhost']['includes'](_0x2544a3(0x281)) || _0x50bf3e['pathhost']['includes']('VM')) _0x19411e(_0x2544a3(0x284), 0x2, !![]);
                else {
                    if (_0x50bf3e[_0x2544a3(0x35c)][_0x2544a3(0x14b)](_0x2544a3(0x1ab))) _0x19411e(_0x2544a3(0x284), 0x3, !![]);
                    else _0x50bf3e['pathhost'][_0x2544a3(0x14b)](_0x2544a3(0xb9)) && _0x19411e(_0x2544a3(0x284), 0x4, !![]);
                }
            }
            $(_0x2544a3(0x2de))[_0x2544a3(0x18f)](_0x2544a3(0x173), !![]);
        }
        _0x1e1157 === 0x2 && setTimeout(function () {
            var _0x32d612 = _0x2544a3;
            if (_0x4fc3ec === _0x32d612(0x1d2)) {
                if (_0x50bf3e[_0x32d612(0x35c)] === _0x32d612(0x281)) _0x19411e(_0x32d612(0x3a2), 0x1, !![]);
                else _0x50bf3e['pathhost'] === 'VM' && _0x19411e(_0x32d612(0x3a2), 0x2, !![]);
            } else {
                if (_0x4fc3ec === 'Switch') {
                    if (_0x50bf3e[_0x32d612(0x35c)][_0x32d612(0x14b)](_0x32d612(0x128))) _0x19411e(_0x32d612(0x3a2), 0x1, !![]);
                    else {
                        if (_0x50bf3e[_0x32d612(0x35c)][_0x32d612(0x14b)](_0x32d612(0xc1))) _0x19411e(_0x32d612(0x3a2), 0x2, !![]);
                        else _0x50bf3e[_0x32d612(0x35c)]['includes'](_0x32d612(0x15b)) && _0x19411e(_0x32d612(0x3a2), 0x3, !![]);
                    }
                } else {
                    if (_0x4fc3ec === 'Firewall') {
                        if (_0x50bf3e[_0x32d612(0x35c)]['includes'](_0x32d612(0x2fa))) _0x19411e(_0x32d612(0x3a2), 0x1, !![]);
                        else {
                            if (_0x50bf3e[_0x32d612(0x35c)][_0x32d612(0x14b)](_0x32d612(0x113))) _0x19411e(_0x32d612(0x3a2), 0x2, !![]);
                            else {
                                if (_0x50bf3e['pathhost'][_0x32d612(0x14b)]('\x2060F')) _0x19411e(_0x32d612(0x3a2), 0x3, !![]);
                                else {
                                    if (_0x50bf3e[_0x32d612(0x35c)][_0x32d612(0x14b)](_0x32d612(0x371))) _0x19411e(_0x32d612(0x3a2), 0x4, !![]);
                                    else {
                                        if (_0x50bf3e[_0x32d612(0x35c)][_0x32d612(0x14b)](_0x32d612(0x30d))) _0x19411e(_0x32d612(0x3a2), 0x5, !![]);
                                        else {
                                            if (_0x50bf3e[_0x32d612(0x35c)]['includes']('\x20100F')) _0x19411e(_0x32d612(0x3a2), 0x6, !![]);
                                            else _0x50bf3e[_0x32d612(0x35c)][_0x32d612(0x14b)](_0x32d612(0x2ce)) && _0x19411e('selectdevice', 0x7, !![]);
                                        }
                                    }
                                }
                            }
                        }
                    } else _0x4fc3ec === _0x32d612(0x17c) && (_0x50bf3e[_0x32d612(0x35c)][_0x32d612(0x14b)]('router') && _0x19411e(_0x32d612(0x3a2), 0x1, !![]));
                }
            }
            $(_0x32d612(0x19f))[_0x32d612(0x18f)](_0x32d612(0x173), !![]);
        }, 0x64);
    }
    _0x5a2894 === 0x3 && editDatas();
    _0x5a2894 === 0x4 && toggleServicesId();
    _0x5a2894 === 0x5 && editFormData();

    function _0x529b1b() {
        var _0x27e4f0 = _0x377270;
        $(_0x27e4f0(0x26b))[_0x27e4f0(0x2cc)](_0x5a2894 > 0x1), $(_0x27e4f0(0x221))[_0x27e4f0(0x33b)](_0x5a2894 === 0x5 ? 'Submit' : _0x27e4f0(0x31a));
    }
    $(_0x377270(0x26b))[_0x377270(0x160)](function () {
        _0x5a2894--, showModalSteps(_0x5a2894);
    });

    function _0x4df181() {
        showModalSteps(_0x5a2894 - 0x1), _0x4f4614();
    }
    $(_0x377270(0x221))[_0x377270(0x160)](function () {
        if (_0x5a2894 === 0x5) {
            if (!_0x328f38(_0x5a2894)) {
                _0x4a076b();
                return;
            }
        } else _0x3b89a6();
    });

    function _0x3b89a6() {
        if (!_0x328f38(_0x5a2894)) {
            _0x4a076b();
            return;
        }
        _0x19237e(), _0x5a2894++, showModalSteps(_0x5a2894);
    }

    function _0x328f38(_0x3f065e) {
        var _0x34e3cb = _0x377270,
            _0x57e867 = !![],
            _0x1b41a5 = [],
            _0xeae1d3 = 'error-border';
        if (_0x3f065e === 0x1) {
            _0x1b41a5 = [_0x34e3cb(0x2de)];
            var _0x2eeee5 = $(_0x34e3cb(0x2de)),
                _0x38aa30 = _0x2eeee5[_0x34e3cb(0x23c)]();
            _0x38aa30 === null || _0x38aa30 === '' ? (_0x2eeee5[_0x34e3cb(0x235)](_0x34e3cb(0x37c), '#ff3d57'), _0x57e867 = ![]) : (_0x2eeee5['css'](_0x34e3cb(0x37c), ''), onboardselectValue = _0x38aa30);
        } else {
            if (_0x3f065e === 0x2) _0x1b41a5 = [_0x34e3cb(0x19f)];
            else {
                if (_0x3f065e === 0x3) {
                    var _0x162d5c = [_0x34e3cb(0x110), _0x34e3cb(0x1c9), _0x34e3cb(0x242), _0x34e3cb(0x1bf), _0x34e3cb(0x199), _0x34e3cb(0x301), _0x34e3cb(0x267)];
                    _0x3f065e === 0x3 && $('#path-dropdown')[_0x34e3cb(0x23c)]() === 'VM' && _0x162d5c[_0x34e3cb(0x239)](_0x34e3cb(0x3af)), _0x1b41a5 = _0x162d5c;
                }
            }
        }
        return _0x1b41a5[_0x34e3cb(0x1f1)](function (_0x5a982d) {
            var _0x255885 = _0x34e3cb,
                _0x2e25e8 = $(_0x5a982d)[_0x255885(0x23c)]();
            _0x2e25e8 === null || _0x2e25e8 === '' ? ($(_0x5a982d)[_0x255885(0x235)](_0x255885(0x37c), _0x255885(0x205)), _0x57e867 = ![]) : $(_0x5a982d)[_0x255885(0x235)]('border-color', '');
        }), _0x57e867;
    }

    function _0x4a076b() {
        var _0x194bed = _0x377270;
        $(_0x194bed(0xc0))[_0x194bed(0x33b)](_0x194bed(0x2c2)), setTimeout(function () {
            var _0x573ccd = _0x194bed;
            $(_0x573ccd(0xc0))[_0x573ccd(0x2c4)](), $(_0x573ccd(0x3a4))[_0x573ccd(0xe4)](_0x573ccd(0x1cc));
        }, 0x7d0);
    }

    function _0x4f4614() {
        var _0x49122b = _0x377270,
            _0x32b75d = _0x5a2894;
        typeof _0x32b75d === _0x49122b(0xb4) && Object[_0x49122b(0x96)](_0x32b75d)['forEach'](function (_0x16fb5d) {
            var _0x11194c = _0x49122b,
                _0x301976 = _0x16fb5d['startsWith']('#') ? _0x16fb5d : '#' + _0x16fb5d,
                _0x53ae4b = _0x32b75d[_0x16fb5d];
            $(_0x301976)['is'](_0x11194c(0x12b)) ? setTimeout(function () {
                var _0x2926dc = _0x11194c;
                $(_0x301976)[_0x2926dc(0x23c)](_0x53ae4b);
            }, 0x5dc) : $(_0x301976)[_0x11194c(0x23c)](_0x53ae4b);
        });
    }

    function _0x19237e() {
        var _0x51eb45 = _0x377270,
            _0xa695c4 = [];
        if (_0x5a2894 === 0x1) _0xa695c4 = [_0x51eb45(0x2de)];
        else {
            if (_0x5a2894 === 0x2) _0xa695c4 = ['#selectdevice'];
            else {
                if (_0x5a2894 === 0x3) {
                    var _0x5db0ec = ['#path-dropdown', _0x51eb45(0x1c9), '#multi-select-ip', _0x51eb45(0x1bf), _0x51eb45(0x199), _0x51eb45(0x301), _0x51eb45(0x267)];
                    $(_0x51eb45(0x110))[_0x51eb45(0x23c)]() === 'VM' && _0x5db0ec[_0x51eb45(0x239)]('#PHYSICAL_IP'), _0xa695c4 = _0x5db0ec;
                }
            }
        }
        if (_0xa695c4[_0x51eb45(0xf7)] > 0x0) {
            var _0x22fbc7 = {};
            _0xa695c4[_0x51eb45(0x1f1)](function (_0x1cb3c3) {
                var _0x21fd1f = _0x51eb45,
                    _0x2ce105 = $(_0x1cb3c3)[_0x21fd1f(0x23c)]();
                _0x22fbc7[_0x1cb3c3] = _0x2ce105;
            }), _0x1635ba[_0x5a2894] = _0x22fbc7;
        } else delete _0x1635ba[_0x5a2894];
    }
}

function editDatas() {
    var _0x1a4096 = _0x772837,
        _0x25703f = new XMLHttpRequest();
    _0x25703f[_0x1a4096(0x34a)](_0x1a4096(0xc5), leurl + 'allonboard/newonbtable', !![]), _0x25703f[_0x1a4096(0x31f)]('Content-Type', _0x1a4096(0x2df)), _0x25703f[_0x1a4096(0x31f)](_0x1a4096(0x169), csfr_token), _0x25703f[_0x1a4096(0x365)] = function () {
        var _0x3b5fc3 = _0x1a4096;
        if (_0x25703f[_0x3b5fc3(0x3a1)] == 0x4 && _0x25703f[_0x3b5fc3(0x37b)] == 0xc8) {
            var _0x5b2657 = JSON[_0x3b5fc3(0x11d)](_0x25703f[_0x3b5fc3(0xb7)]),
                _0x2fed34 = _0x5b2657,
                _0x3d2fcf = _0x2fed34[_0x3b5fc3(0x29a)];
            _0x3d2fcf['forEach'](function (_0x129253) {
                var _0x54061d = _0x3b5fc3;
                editipaddr == _0x129253[_0x54061d(0x229)] && setTimeout(function () {
                    populateFormFields(_0x129253);
                }, 0x3e8);
            }), $(_0x3b5fc3(0x110))[_0x3b5fc3(0x18f)](_0x3b5fc3(0x173), !![]), $(_0x3b5fc3(0x1c9))['prop'](_0x3b5fc3(0x173), !![]), $('#multi-select-ip')[_0x3b5fc3(0x18f)](_0x3b5fc3(0x173), !![]);
        }
    }, _0x25703f[_0x1a4096(0x341)]();
}

function populateFormFields(_0x3b3222) {
    var _0xef3153 = _0x772837;
    $(_0xef3153(0x110))['val'](_0x3b3222[_0xef3153(0x35c)]), $('#hosts-dropdown')[_0xef3153(0x23c)](_0x3b3222[_0xef3153(0x20c)]);
    var _0xa6e66 = _0x3b3222['ipaddress'][_0xef3153(0x101)](','),
        _0x62298f = document[_0xef3153(0x259)](_0xef3153(0x116));
    _0x62298f[_0xef3153(0x3a3)] = '', _0xa6e66[_0xef3153(0x1f1)](function (_0x53d1d7) {
        var _0x5696f8 = _0xef3153,
            _0xca6b64 = document[_0x5696f8(0xfa)](_0x5696f8(0x230));
        _0xca6b64[_0x5696f8(0x1a3)] = _0x53d1d7, _0xca6b64[_0x5696f8(0x275)] = _0x53d1d7, _0x62298f[_0x5696f8(0x299)](_0xca6b64);
    }), $(_0xef3153(0x199))[_0xef3153(0x23c)](_0x3b3222['emailid']), $(_0xef3153(0x301))[_0xef3153(0x23c)](_0x3b3222[_0xef3153(0x34e)]), $(_0xef3153(0x267))[_0xef3153(0x23c)](_0x3b3222['textname']), $(_0xef3153(0x3af))[_0xef3153(0x23c)](_0x3b3222['physical_ip']), _0x3b3222[_0xef3153(0x229)] !== '' && $('#ipaddress-details')[_0xef3153(0x140)](), _0x3b3222[_0xef3153(0xea)] !== '' && $(_0xef3153(0x2bd))['show'](), _0x3b3222[_0xef3153(0x26d)] !== '' && $(_0xef3153(0xda))['show']();
}
var toggleServicesIdCalled = ![];

function fetchDataFromServer(_0x4d0afb, _0x378a41, _0xcc701a, _0x161514) {
    var _0x32ee69 = _0x772837,
        _0x369c1e = _0x4d0afb;
    if (_0xcc701a === _0x32ee69(0xc5) && _0x378a41) {
        var _0x5b0aa8 = Object['keys'](_0x378a41)[_0x32ee69(0x2fd)](_0x18ab5d => _0x18ab5d + '=' + encodeURIComponent(_0x378a41[_0x18ab5d]))[_0x32ee69(0x2b1)]('&');
        _0x369c1e += '?' + _0x5b0aa8;
    }
    var _0x552b84 = new XMLHttpRequest();
    _0x552b84[_0x32ee69(0x34a)](_0xcc701a, _0x369c1e, !![]), _0x552b84['setRequestHeader'](_0x32ee69(0x2b5), _0x32ee69(0x2df)), _0x552b84[_0x32ee69(0x31f)](_0x32ee69(0x169), csfr_token), _0x552b84[_0x32ee69(0x365)] = function () {
        var _0x296e3e = _0x32ee69;
        if (_0x552b84[_0x296e3e(0x3a1)] == 0x4) {
            if (_0x552b84[_0x296e3e(0x37b)] == 0xc8) {
                var _0x12f0bb = JSON[_0x296e3e(0x11d)](_0x552b84[_0x296e3e(0xb7)]),
                    _0x4c1322 = document[_0x296e3e(0x259)](_0x296e3e(0x1da));
                _0x12f0bb[_0x296e3e(0x29a)][0x0]['ipaddress'] === editipaddr && (_0x12f0bb[_0x296e3e(0xe1)](_0x296e3e(0x29a)) && Array[_0x296e3e(0x178)](_0x12f0bb[_0x296e3e(0x29a)]) && _0x12f0bb[_0x296e3e(0x29a)][_0x296e3e(0xf7)] > 0x0 ? (_0x4c1322[_0x296e3e(0xe0)] = !![], addoncheckmodal(), AddonCheckboxes(_0x12f0bb), checkboxdata(_0x12f0bb[_0x296e3e(0x29a)])) : _0x4c1322['checked'] = ![]), _0x161514 && typeof _0x161514 === _0x296e3e(0x372) && _0x161514(_0x12f0bb);
            } else console[_0x296e3e(0x217)](_0x296e3e(0x2b9) + _0x552b84[_0x296e3e(0x23f)]);
        }
    }, _0xcc701a === _0x32ee69(0xc5) ? _0x552b84[_0x32ee69(0x341)]() : _0x552b84[_0x32ee69(0x341)](JSON[_0x32ee69(0x1bd)](_0x378a41));
}

function toggleServicesId() {
    var _0x29635d = _0x772837;
    if (toggleServicesIdCalled) return;
    toggleServicesIdCalled = !![], selectkeyValue === _0x29635d(0x281) || selectkeyValue === 'VM' ? fetchDataFromServer(leurl + 'allonboard/getmgmntdata', {
        'ipaddress': editipaddr
    }, _0x29635d(0xc5), function (_0x334ee7) { }) : fetchDataFromServer(leurl + _0x29635d(0x18b), {
        'ipaddress': editipaddr
    }, _0x29635d(0xc5), function (_0x4713fd) { });
}

function checkboxdata(_0x59dee7) {
    var _0x365ba3 = _0x772837,
        _0x112607 = [],
        _0x35b388 = ![];
    _0x59dee7[_0x365ba3(0x1f1)](function (_0x1a14ef) {
        var _0x94344c = _0x365ba3;
        if (_0x1a14ef['prototype'] === 'ilo') {
            const _0x5a70fc = document[_0x94344c(0x259)](_0x94344c(0x1ff));
            _0x5a70fc[_0x94344c(0x182)] = 0x1, _0x5a70fc[_0x94344c(0x336)](new Event(_0x94344c(0x1a6))), $('#CreateMgmt\x20#user_name')[_0x94344c(0x23c)](_0x1a14ef[_0x94344c(0x387)]), $(_0x94344c(0x35e))[_0x94344c(0x23c)](_0x1a14ef['password']), $('#CreateMgmt\x20#ilo_ip')[_0x94344c(0x23c)](_0x1a14ef['iloip']), $('#CreateMgmt\x20#multi-select-ilo')[_0x94344c(0x23c)](_0x1a14ef['ipaddress']);
            var _0xe3b06 = {};
            _0xe3b06['isedit'] = isEdit, _0xe3b06['prototype'] = _0x1a14ef['prototype'], _0xe3b06['username'] = _0x1a14ef[_0x94344c(0x387)], _0xe3b06[_0x94344c(0x250)] = _0x1a14ef[_0x94344c(0x250)], _0xe3b06[_0x94344c(0x2c5)] = _0x1a14ef[_0x94344c(0x2c5)], _0xe3b06[_0x94344c(0x2bf)] = '', _0x112607[_0x94344c(0x239)](_0x1a14ef[_0x94344c(0x229)]), _0xe3b06[_0x94344c(0x1f3)] = _0x112607, _0xe3b06[_0x94344c(0xac)] = '', ilomgmt_list[_0x94344c(0x239)](_0xe3b06);
        } else {
            if (_0x1a14ef[_0x94344c(0x324)] === _0x94344c(0xe6)) {
                const _0x44f37e = document[_0x94344c(0x259)](_0x94344c(0xf9));
                _0x44f37e[_0x94344c(0x182)] = 0x1, _0x44f37e[_0x94344c(0x336)](new Event('change')), $(_0x94344c(0x1dc))['val'](_0x1a14ef[_0x94344c(0x2bf)]), $('#CreateIdrac\x20#multi-select-idrac')['val'](_0x1a14ef[_0x94344c(0x229)]);
                var _0xe3b06 = {};
                _0xe3b06[_0x94344c(0x328)] = isEdit, _0xe3b06[_0x94344c(0x324)] = _0x1a14ef[_0x94344c(0x324)], _0xe3b06['username'] = '', _0xe3b06[_0x94344c(0x250)] = '', _0xe3b06[_0x94344c(0x2c5)] = '', _0xe3b06[_0x94344c(0x2bf)] = _0x1a14ef[_0x94344c(0x2bf)], _0x112607['push'](_0x1a14ef[_0x94344c(0x229)]), _0xe3b06[_0x94344c(0x1f3)] = _0x112607, _0xe3b06[_0x94344c(0xac)] = '', idrac_list[_0x94344c(0x239)](_0xe3b06);
            } else {
                if (_0x1a14ef[_0x94344c(0x324)] === _0x94344c(0x283)) {
                    var _0x1647f2 = {},
                        _0x48416a = _0x1a14ef[_0x94344c(0xac)][_0x94344c(0x204)](/'([^']+)':\s*([^,}]+)/g);
                    for (const _0x3fb65f of _0x48416a) {
                        const _0x2831d2 = _0x3fb65f[0x1][_0x94344c(0x277)]();
                        let _0x28c8c5 = _0x3fb65f[0x2][_0x94344c(0x277)]();
                        !isNaN(_0x28c8c5) && (_0x28c8c5 = parseFloat(_0x28c8c5)), _0x1647f2[_0x2831d2] = _0x28c8c5;
                    }
                    const _0x27edd2 = document[_0x94344c(0x259)](_0x94344c(0x17b));
                    _0x27edd2[_0x94344c(0x182)] = 0x1, _0x27edd2[_0x94344c(0x336)](new Event('change')), $(_0x94344c(0x338))[_0x94344c(0x23c)](_0x1a14ef['port']);
                    var _0x4ca07e = $(_0x94344c(0x100)),
                        _0x4faeee = _0x1a14ef[_0x94344c(0x229)];
                    _0x4ca07e[_0x94344c(0x23c)]([]), _0x4ca07e[_0x94344c(0x241)](_0x94344c(0x230))[_0x94344c(0x1a9)](function () {
                        var _0x29ae10 = _0x94344c;
                        $(this)[_0x29ae10(0x23c)]() === _0x4faeee && $(this)[_0x29ae10(0x18f)]('selected', !![]);
                    }), _0x4ca07e[_0x94344c(0x380)](_0x94344c(0x1a6));
                    for (var _0x559cde in _0x1647f2) {
                        if (_0x1647f2[_0x94344c(0xe1)](_0x559cde)) {
                            var _0x2f448b = document[_0x94344c(0x259)](_0x559cde);
                            _0x2f448b && (_0x2f448b[_0x94344c(0x1a3)] = _0x1647f2[_0x559cde]);
                        }
                    }
                    var _0xe3b06 = {};
                    _0xe3b06[_0x94344c(0x328)] = isEdit, _0xe3b06[_0x94344c(0x324)] = _0x1a14ef['prototype'], _0xe3b06[_0x94344c(0x387)] = '', _0xe3b06[_0x94344c(0x250)] = '', _0xe3b06['iloip'] = '', _0xe3b06['port'] = _0x1a14ef['port'], _0x112607[_0x94344c(0x239)](_0x1a14ef['ipaddress']), _0xe3b06[_0x94344c(0x1f3)] = _0x112607, _0xe3b06[_0x94344c(0xac)] = _0x1647f2, nodemgmt_list[_0x94344c(0x239)](_0xe3b06);
                } else {
                    if (_0x1a14ef[_0x94344c(0x324)] === 'Window\x20Expo') {
                        var _0x3ea609 = {},
                            _0x46f491 = _0x1a14ef[_0x94344c(0xac)][_0x94344c(0x204)](/'([^']+)':\s*([^,}]+)/g);
                        for (const _0x5676ae of _0x46f491) {
                            const _0x24367b = _0x5676ae[0x1][_0x94344c(0x277)]();
                            let _0x80c89d = _0x5676ae[0x2][_0x94344c(0x277)]();
                            !isNaN(_0x80c89d) && (_0x80c89d = parseFloat(_0x80c89d)), _0x3ea609[_0x24367b] = _0x80c89d;
                        }
                        const _0x151a6b = document['getElementById']('window_version');
                        _0x151a6b['selectedIndex'] = 0x1, _0x151a6b[_0x94344c(0x336)](new Event(_0x94344c(0x1a6))), $('#CreateWindow\x20#port_windows')[_0x94344c(0x23c)](_0x1a14ef['port']);
                        var _0x409c04 = $(_0x94344c(0x353)),
                            _0x4faeee = _0x1a14ef['ipaddress'];
                        _0x409c04[_0x94344c(0x23c)]([]), _0x409c04[_0x94344c(0x241)]('option')[_0x94344c(0x1a9)](function () {
                            var _0x36dce7 = _0x94344c;
                            $(this)['val']() === _0x4faeee && $(this)[_0x36dce7(0x18f)](_0x36dce7(0x195), !![]);
                        }), _0x409c04[_0x94344c(0x380)]('change');
                        for (var _0x559cde in _0x3ea609) {
                            if (_0x3ea609[_0x94344c(0xe1)](_0x559cde)) {
                                var _0x2f448b = document[_0x94344c(0x259)](_0x559cde);
                                _0x2f448b && (_0x2f448b[_0x94344c(0x1a3)] = _0x3ea609[_0x559cde]);
                            }
                        }
                        var _0xe3b06 = {};
                        _0xe3b06[_0x94344c(0x328)] = isEdit, _0xe3b06[_0x94344c(0x324)] = _0x1a14ef['prototype'], _0xe3b06['username'] = '', _0xe3b06[_0x94344c(0x250)] = '', _0xe3b06[_0x94344c(0x2c5)] = '', _0xe3b06[_0x94344c(0x2bf)] = _0x1a14ef['port'], _0x112607[_0x94344c(0x239)](_0x1a14ef[_0x94344c(0x229)]), _0xe3b06[_0x94344c(0x1f3)] = _0x112607, _0xe3b06['threshold'] = _0x3ea609, winmgmt_list[_0x94344c(0x239)](_0xe3b06);
                    } else {
                        if (_0x1a14ef['prototype'] === _0x94344c(0x103)) {
                            const _0x25eb3d = document[_0x94344c(0x259)](_0x94344c(0x3b2));
                            _0x25eb3d[_0x94344c(0x182)] = 0x1, _0x25eb3d[_0x94344c(0x336)](new Event(_0x94344c(0x1a6))), $(_0x94344c(0x98))[_0x94344c(0x23c)](_0x1a14ef[_0x94344c(0x2bf)]), $(_0x94344c(0x1b5))['val'](_0x1a14ef[_0x94344c(0x229)]);
                            var _0xe3b06 = {};
                            _0xe3b06[_0x94344c(0x328)] = isEdit, _0xe3b06[_0x94344c(0x324)] = _0x1a14ef['prototype'], _0xe3b06[_0x94344c(0x387)] = '', _0xe3b06['password'] = '', _0xe3b06['iloip'] = '', _0xe3b06[_0x94344c(0x2bf)] = _0x1a14ef[_0x94344c(0x2bf)], _0x112607[_0x94344c(0x239)](_0x1a14ef[_0x94344c(0x229)]), _0xe3b06['selectilo'] = _0x112607, _0xe3b06[_0x94344c(0xac)] = '', ngnixmgmt_list[_0x94344c(0x239)](_0xe3b06);
                        } else {
                            if (_0x1a14ef['version'] === 'v2c') {
                                $(_0x94344c(0x2f4))['css'](_0x94344c(0x19b), _0x94344c(0x20b));
                                var _0x9397b3 = {},
                                    _0xdbef60 = _0x1a14ef[_0x94344c(0xa0)][_0x94344c(0x204)](/'([^']+)':\s*([^,}]+)/g);
                                for (const _0x3195e3 of _0xdbef60) {
                                    const _0x18b01a = _0x3195e3[0x1][_0x94344c(0x277)]();
                                    let _0x4e9360 = _0x3195e3[0x2][_0x94344c(0x277)]();
                                    !isNaN(_0x4e9360) && (_0x4e9360 = parseFloat(_0x4e9360)), _0x9397b3[_0x18b01a] = _0x4e9360;
                                }
                                const _0x1aa0a5 = document[_0x94344c(0x259)](_0x94344c(0x2ab));
                                _0x1aa0a5[_0x94344c(0x182)] = 0x1, _0x1aa0a5['dispatchEvent'](new Event(_0x94344c(0x1a6))), $(_0x94344c(0x2ea))[_0x94344c(0x23c)](_0x1a14ef[_0x94344c(0x229)]), $(_0x94344c(0x37d))[_0x94344c(0x23c)](_0x1a14ef[_0x94344c(0x29b)]);
                                !_0x35b388 && (setTimeout(function () {
                                    var _0x1ce6bb = _0x94344c;
                                    $('#CreateSnmp\x20#snmp_models')['val'](_0x1a14ef[_0x1ce6bb(0x243)])[_0x1ce6bb(0x380)](_0x1ce6bb(0x1a6));
                                }, 0x3e8), _0x35b388 = !![]);
                                for (var _0x559cde in _0x9397b3) {
                                    if (_0x9397b3[_0x94344c(0xe1)](_0x559cde)) {
                                        var _0x2f448b = document[_0x94344c(0x259)](_0x559cde);
                                        _0x2f448b && (_0x2f448b[_0x94344c(0x1a3)] = _0x9397b3[_0x559cde]);
                                    }
                                }
                            } else {
                                if (_0x1a14ef['version'] === 'v3') {
                                    $('#snmp_val')['css'](_0x94344c(0x19b), '#55a8fd');
                                    var _0x9397b3 = {},
                                        _0xdbef60 = _0x1a14ef['snmp_threshold']['matchAll'](/'([^']+)':\s*([^,}]+)/g);
                                    for (const _0x108277 of _0xdbef60) {
                                        const _0x55debf = _0x108277[0x1][_0x94344c(0x277)]();
                                        let _0x789a3c = _0x108277[0x2][_0x94344c(0x277)]();
                                        !isNaN(_0x789a3c) && (_0x789a3c = parseFloat(_0x789a3c)), _0x9397b3[_0x55debf] = _0x789a3c;
                                    }
                                    const _0x334c36 = document[_0x94344c(0x259)](_0x94344c(0x2ab));
                                    _0x334c36[_0x94344c(0x182)] = 0x2, _0x334c36['dispatchEvent'](new Event('change')), $(_0x94344c(0x2ea))[_0x94344c(0x23c)](_0x1a14ef['ipaddress']), $(_0x94344c(0x32e))['val'](_0x1a14ef[_0x94344c(0x387)]), $('#CreateSnmp\x20#security_level')[_0x94344c(0x23c)](_0x1a14ef[_0x94344c(0xc9)]);
                                    !_0x35b388 && (setTimeout(function () {
                                        var _0xbcadef = _0x94344c;
                                        $(_0xbcadef(0xbc))['val'](_0x1a14ef['model'])[_0xbcadef(0x380)](_0xbcadef(0x1a6));
                                    }, 0x3e8), _0x35b388 = !![]);
                                    $(_0x94344c(0x27a))['val'](_0x1a14ef[_0x94344c(0x302)]), $(_0x94344c(0x1ca))[_0x94344c(0x23c)](_0x1a14ef[_0x94344c(0x30f)]), $('#CreateSnmp\x20#Privacy_mtd')[_0x94344c(0x23c)](_0x1a14ef['priv_method']), $('#CreateSnmp\x20#privacy_password')[_0x94344c(0x23c)](_0x1a14ef[_0x94344c(0x337)]);
                                    for (var _0x559cde in _0x9397b3) {
                                        if (_0x9397b3[_0x94344c(0xe1)](_0x559cde)) {
                                            var _0x2f448b = document[_0x94344c(0x259)](_0x559cde);
                                            _0x2f448b && (_0x2f448b[_0x94344c(0x1a3)] = _0x9397b3[_0x559cde]);
                                        }
                                    }
                                } else console[_0x94344c(0x330)](_0x94344c(0x234), _0x1a14ef);
                            }
                        }
                    }
                }
            }
        }
    });
}

function _0x1b39() {
    var _0x35837e = ['subipaddress', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>GATEWAY\x20-\x20SWITCH<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>', 'reduce', 'wthreshold-fields', '#uptime_c', '#hosts-dropdown', '#CreateSnmp\x20#auth_password', '3681225hPHGBz', 'error-border', 'getfilenames', 'csrftoken', 'modalId', '</label>', 'snmp', 'Server', 'Fortigate', '#login_w', '#dialog-for-hsdiscover', 'addRow', 'NodeExpo\x20added\x20sucessfully', '\x27,\x27', 'Enter\x20PassWord', 'addonSwitch', 'mem_w', '#CreateIdrac\x20#port_ips', '<input\x20type=\x22number\x22\x20class=\x22form-control\x20nginx_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20NGINX\x20Port\x22\x20value=\x2230164\x22\x20required=\x22\x22\x20id=\x22port_nginx\x22\x20autocomplete=\x22off\x22>', '10440144LPcqsP', '#displaydata', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20w-100\x22\x20id=\x22ilo_save\x22\x20onclick=\x22verifyiloServer()\x22>Verify</button>', 'Fortigate100F', '<div\x20class=\x22col-12\x20my-4\x20password-group\x22>', 'URL', '<a\x20href=\x22#\x22\x20class=\x22breadcrumb-step\x22\x20data-step=\x22', '18090jIRiZZ', '</td>', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20w-100\x22\x20id=\x22idrac_save\x22\x20onclick=\x22verifiedidracServer()\x22>Verify</button>', 'getiplist', 'Firewalltype', '\x22\x20value=\x22threshold\x22\x20onchange=\x22toggleTextFields(this)\x22>', '#valid_row', 'getallmgmntdata', 'p_swi', '<i\x20class=\x22mdi\x20mdi-alpha-s-box-outline\x20icon-val\x22\x20onclick=\x22\x22\x20id=\x22addsnmp\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-addsnmp\x22\x20style=\x22color:#55a8fd;\x22></i>', 'Server\x27s\x20type\x20not\x20Added,\x20Please\x20check\x20Administrator', 'search', 'forEach', 'setAttribute', 'selectilo', '<span\x20class=\x22error-msg\x22\x20id=\x22idrac-error-msg\x22>\x20</span>', 'flex', '#load_t', 'Fortigate60F', 'Fortigate100E', '\x22\x20style=\x22color:white;font-size:\x2020px;\x20padding-left:5%\x20!important;\x22></i>', '/dashboard/snmpnewtable', 'block', 'rswitch-heading', 'save-data-to-database', 'mem_c', 'mgmts_version', '#CreateMgmt\x20#ilo_ip', 'server-row', '\x22style=\x22color:white;font-size:\x2020px;\x20padding-left:7%\x20!important;\x22></i>', '<option\x20value=\x22\x22\x20selected\x20disabled>', 'matchAll', '#ff3d57', '\x22\x20data-hostname=\x22', 'Sub\x20IP\x20Address', 'selectModalemail', 'iplist', '#windowtype', '#55a8fd', 'selecthost', '#unswi', 'ApplicationName', 'nginx-error-msg', '/allonboard/ilovalidation', '</p></i>', '\x22\x20>', 'ilo\x20added\x20sucessfully', '(^|;)\x5cs*', '.modal-body\x20.modal-step', 'Exchange\x20Switch', 'error', 'redirectToAddhostPage', 'Please\x20fill\x20all\x20required\x20fields\x20and\x20select\x20at\x20least\x20one\x20IP\x20address.', 'form-check-label', 'selectModalipaddress', 'IDRAC', 'Request\x20failed', '#mem_t', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>SERVERS<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>', '<option\x20value=\x22\x22>Select\x20Email</option>', '#nextButton', 'type', '<i\x20style=\x22color:\x20#ffeb3b;font-size:\x2025px\x20!important;\x22\x20class=\x22mdi\x20mdi-alert-octagon\x22><p\x20style=\x22color:#cd1f1f\x20!important;\x22>Non-Validated\x20SNMP\x20IP\x20Addresses:\x20', 'parent', 'routersearch-row', '.card-checkbox:checked', 'POST', 'router\x204321', 'ipaddress', '<label\x20for=\x22port_ip\x22\x20id=\x22port_nginx-label\x22>NGINX\x20Port</label>', 'display:block\x20!important', 'newonbtable', '/allonboard/ngnixexpvalidation', 'dropdown', 'location', 'option', 'services-dropdown', '\x22>0</p>', '\x22\x20value=\x22', 'This\x20is\x20a\x20different\x20prototype:', 'css', '#hostcontent', '<label\x20for=\x22multi-select-nginx\x22\x20id=\x22multiselect-label\x22>Select\x20IP\x20Address</label>', '#CreateMgmt\x20#user_name', 'push', 'sendidracDataToServer()', '#mem_c', 'val', '<span\x20class=\x22error-msg\x22\x20id=\x22win-error-msg\x22>\x20</span>', '#services-dropdown', 'statusText', '#port_windows', 'find', '#multi-select-ip', 'model', '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#ff0000;\x22>Failure\x20in\x20Validation...</p>', 'download', 'idrac\x20added\x20sucessfully', 'cpu_t', 'textContent', '\x22\x20data-sub-name=\x22', '#disk_w', '<th>Abbreviation</th>', '<div\x20class=\x22col-12\x20my-2\x22>', 'physicalIP', '<label\x20for=\x22multi-select-idrac\x22\x20id=\x22multiselect-label\x22>Select\x20IP\x20Address</label>', 'port_windows', 'password', 'ilo', '1728EjpBgm', '#rswitch-heading', '#CreateMgmt\x20#multi-select-ilo', 'HOST_TEMPLATE', '<input\x20type=\x22text\x22\x20class=\x22form-control\x20mgnt_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20User\x20Name\x22\x20required=\x22\x22\x20id=\x22user_name\x22\x20autocomplete=\x22off\x22>', 'node_save', 'login_w', 'getElementById', 'finspot_onboard-v1', 'nodeModal', 'hide', '\x27)\x22\x20style=\x22position:\x20inherit;font-size:18px;\x22></i></button></div></div></div><div\x20class=\x22col-2\x22\x20text-right></div></div>', '#s_hw', 'window', 'concat', 'threshold-fields', '<i\x20class=\x22mdi\x20mdi-close-octagon-outline\x22\x20onclick=\x22onDeleteSnmp(this)\x22\x20data-id=\x22', 'Error\x20in\x20saving\x20application', '#port_nginx', 'form-control', 'idrac-error-msg', '#FRNDLY_NAME', '#load_c', '#window_version', '<div\x20class=\x22select-service\x22\x20id=\x22idrac-multipleIPAddressSelect\x22>', '#backButton', 'target', 'textname', 'innerText', 'mdi-chevron-left\x20mdi-chevron-down', 'createObjectURL', 'Select\x20', '#reg-service-', '#save', '<span\x20class=\x22text\x22>', 'text', '#nginxtype', 'trim', '.xlsx', 'checkbox-', '#CreateSnmp\x20#Authentication_mtd', 'replaceAll', 'version', '<div\x20class=\x22select-service\x22\x20id=\x22win-multipleIPAddressSelect\x22>', 'btn-danger', '<div\x20class=\x22col-1\x22></div>', 'toLowerCase', 'Physical', '.yaml', 'Node\x20Expo', 'onboardSelect', 'gatewaysearch-row', '<div\x20class=\x22col-12\x22\x20style=\x22display:flex;margin-top:-3%\x20!important;margin-left:3%\x20!important;\x22>', '</td></tr>', 'Please\x20wait', 'reload', '\x22\x20style=\x22margin-bottom:0;border:\x201px\x20solid\x20#fff;\x20width:330px\x20!important;margin-left:0%\x22>', 'Fortigate50E', 'files', 'Error\x20in\x20getallapplicationnames:', 'idracmgnt', '.circle-menu', 'multi-select-idrac', 'ExchangeSwitch', '\x20on\x20', '#nginxModal\x20#ngnix_save', '#checkButton', 'host', 'form-check', '<div\x20class=\x22row\x20\x22\x20id=\x22', '<div\x20class=\x22col-1\x22>', 'appendChild', 'data', 'comm_string', 'body', '#modalBodyStep1', 'attr', 'f_swi', 'wthreshold', '\x27\x20for\x20', 'fileInput', 'border', '<option\x20style=\x22color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;\x22\x20value=\x22\x22\x20selected\x20disabled>Select\x20Type</option>', '<select\x20class=\x22input-select\x20multiple-select\x20custom-select\x20select-input\x20multi-select-input\x20w-100\x22\x20name=\x22NGINX_IPADDRESS\x22\x20multiple=\x22multiple\x22\x20id=\x22multi-select-nginx\x22>', 'modal', 'data=', 'Node-error-msg', '#service-data-ip', '#ff9eac', 'snmp_version', '#nginx_version', '#r_swi', 'disk_w', '#nodeModal\x20#node_save', 'nginxModal', 'join', '\x22\x20data-subipaddress=\x22', 'readAsBinaryString', '<label\x20for=\x22multi-select-ilo\x22\x20id=\x22multiselect-label\x22>Select\x20IP\x20Address</label>', 'Content-Type', 'wthreshold-icon', 'data-id', '<input\x20type=\x22checkbox\x22\x20class=\x22card-checkbox\x22\x20data-ipaddress=\x22', 'Failed\x20to\x20retrieve\x20data:\x20', 'Processing\x20IP\x20address:\x20', '#disk_t', '#mgmtModal\x20#ilo_save', '#email-details', 'failed\x20to\x20save\x20data\x20to\x20the\x20database:', 'port', '<div\x20class=\x22\x22\x20id=\x22valids_row\x22></div>', '.breadcrumb-step', '<span\x20style=\x22color:\x20#ff3d57;margin-left:4%;\x22>Please\x20fill\x20in\x20all\x20the\x20required\x20fields.</span>', '<table\x20class=\x22table\x22>', 'empty', 'iloip', 'ipAddress', '/allonboard/nodeexpvalidation', '\x22\x20style=\x22color:red;\x20float:right\x22></i>', '<div\x20class=\x22\x22\x20id=\x22validate_row\x22></div>', '\x22\x20aria-label=\x22Search\x22><div\x20class=\x22input-group-append\x22><button\x20class=\x22btn\x20btn-outline-secondary\x20button-clr\x20size12\x22\x20type=\x22button\x22><i\x20class=\x22mdi\x20mdi-magnify\x20icon-btnclr\x22\x20id=\x22icon-search\x22\x20style=\x22position:\x20inherit;font-size:18px;\x22\x20id=\x22i_\x22\x20onclick=\x22swapDivgonb(this,\x27', 'window\x20expo', 'toggle', 'data-host-name', '\x20200F', 'onload', '#login_c', 'types', '<td>num</td>', 'Add', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20cancel-btn\x20w-100\x22\x20data-dismiss=\x22modal\x22>Cancel</button>', 'login_c', 'clicksite', '<i\x20class=\x22mdi\x20mdi-alpha-n-box-outline\x20icon-val\x22\x20style=\x22color:#55a8fd;\x22></i>', '<i\x20style=\x22color:\x20#ffeb3b;font-size:\x2025px\x20!important;\x22\x20class=\x22mdi\x20mdi-alert-octagon\x22><p\x20style=\x22color:#cd1f1f\x20!important;\x22>Management\x20Non-Validated\x20IP\x20Addresses:\x20', 'Want\x20to\x20permanently\x20delete\x20the\x20selected\x20hosts?', 'Device', '<i\x20class=\x22mdi\x20mdi-alpha-w-box-outline\x20icon-val\x22\x20style=\x22color:#55a8fd;\x22></i>', '<label>', '.j2', '#onboardSelect', 'application/json', '<label\x20for=\x22port_node\x22\x20id=\x22port-node-label\x22>Node\x20Port</label>', 'multiselect-label', 'display', 'applicationname', '\x20>\x20', 'result', 'toggleClass', 'port-label', 'port_nginx', 'Restore\x20Devices.xlsx', '#CreateSnmp\x20#snmp-select-ip', '18613ngMjzm', '#node_version', '844230dfUQlh', '\x20h5', '<td>c</td>', '#error-application', 'Search\x20IP', 'get', 'server-ip-error-msg', '#snmp_val', '<th></th>', '<label\x20for=\x22multi-select-win\x22\x20id=\x22multiselect-label\x22>Select\x20IP\x20Address</label>', '.row', '<i\x20class=\x22mdi\x20mdi-close-octagon-outline\x22\x20onclick=\x22mgmntCloseClick(this)\x22\x20data-host-ip=\x22', '<input\x20type=\x22number\x22\x20class=\x22form-control\x20mgnt_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20IDRAC\x20Port\x22\x20value=\x229137\x22\x20required=\x22\x22\x20id=\x22port_ips\x22\x20autocomplete=\x22off\x22>', '\x2050E', 'Yes,\x20delete', 'Fortigate\x2080F', 'map', '<tbody>', 'preventDefault', 'site', '#GLOBAL_APPLICATION', 'auth_method', 'hasClass', 'Public\x20Switch', 'hostsName--->', '<input\x20type=\x22number\x22\x20class=\x22form-control\x20win_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20windows\x20Port\x22\x20value=\x229182\x22\x20required=\x22\x22\x20id=\x22port_windows\x22\x20autocomplete=\x22off\x22>', '<label\x20for=\x22', 'entries', '<div\x20id=\x22wthreshold-fields\x22\x20style=\x22display:none;\x22>', '<div\x20class=\x22col-5\x20px-1\x22>', 'add', 'application/x-www-form-urlencoded', '\x20100E', '<span\x20class=\x22error-msg\x22\x20id=\x22server-ip-error-msg\x22\x20style=\x22color:#ff9eac\x22>\x20</span>', 'auth_password', 'mdi-eye-outline', 'insertAdjacentHTML', 'warning', 'switches', 'mgmtModal', 'exchangesearch-row', '<label\x20for=\x22ilo_ip\x22\x20id=\x22ilo-label\x22>ILO\x20IP</label>', '#pswi', 'multipleSelect', '<span\x20class=\x22error-msg\x22\x20id=\x22Node-error-msg\x22>\x20</span>', 'Next\x20&raquo;', '<div\x20class=\x22col-4\x22>', '#ffffff', '<div\x20class=\x22\x22\x20id=\x22valid_rows\x22></div>', ')</p>', 'setRequestHeader', 'ms-parent', 'class', '<div\x20class=\x22col-7\x22\x20style=\x22margin-top:2%;margin-left:2%;\x22>', 'mem_t', 'prototype', 'win_input', '<thead><tr><th>Types</th><th>Count</th></tr></thead>', 'ILO', 'isedit', 'cookie', '</option>', 'ilo_ip', 'NOVALUE', 'Fortigate\x20100F', '#CreateSnmp\x20#user_name', '#cpu_t', 'log', '<td>Critical</td>', '#uptime_t', '0123456789ABCDEF', 'gswitch-heading', 'btn-success', 'dispatchEvent', 'priv_password', '#CreateNode\x20#port_nodes', '<input\x20type=\x22checkbox\x22\x20id=\x22threshold\x22\x20name=\x22threshold', '#idracModal\x20#idrac_save', 'html', '<tr\x20class=\x22small-row\x22>', '#rswi', '1px\x20solid\x20#ffffff', 'some', 'selectModaldetails', 'send', '#addon-content', '<p\x20class=\x22bold-text\x20mb-0\x20text-color\x22>\x20', '#nodata', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20w-100\x22\x20id=\x22ngnix_save\x22\x20onclick=\x22verifiednginxServer()\x22>Verify</button>', 'nginx\x20expo', '<div\x20class=\x22col-12\x22\x20style=\x22display:flex;margin-left:\x200px\x22>', 'allonboard/mgmtdeletehost', 'Enter\x20windows\x20Port', 'open', 'addClass', 'background', '1RVdeTx', 'servertype', '<div\x20class=\x22select-service\x22\x20id=\x22node-multipleIPAddressSelect\x22>', '<i\x20class=\x22mdi\x20mdi-reload\x20io-con\x22\x20id=\x22threshold-icon\x22\x20onclick=\x22resetInputValues()\x22\x20style=\x22color:#e99123;display:none;\x22></i>', 'Fortigate\x2060E', 'load_c', '#CreateWindow\x20#multi-select-win', 'Data\x20not\x20found\x20for\x20IP\x20address:\x20', 'ip_id', '<p\x20class=\x22primary-text\x20bold-text\x20size18\x20mb-1\x22\x20id=\x22', 'allonboard/newonbtable', 'Fortigate\x2060F', 'sheet_to_json', '<div\x20class=\x22col-2\x22></div>', 'data-dismiss', 'pathhost', '#swithtypelist', '#CreateMgmt\x20#pass_word', '\x5cs*=\x5cs*([^;]+)', '#GLOBAL_APPLICATION\x20option[value=', '#f_swi', 'FriendlyName', 'eswitch-heading', 'binary', 'onreadystatechange', 'Delete\x20Hosts', 'floor', 'test', 'cpu_w', 'display:none\x20!important', '\x22\x20data-name=\x22s', 'Error:', '#valided_rows', '\x22\x20data-host-name=\x22', '<div\x20class=\x22d-inline-block\x20icon\x22><i\x20class=\x22mdi\x20mdi-eye-off-outline\x20toggle-password\x22\x20id=\x22icons_change\x22\x20onclick=\x22myFunctionpass()\x22></i></div>', 'COMMON_HOSTNAME', '\x2080F', 'function', '<div\x20class=\x22modal-footer\x20mx-auto\x20col-md-11\x20col-12\x22>', 'sendwinDataToServer()', '#icons_change', '#load_w', 'PublicSwitch', 'addrArr', 'windowModal', '#disk_c', 'status', 'border-color', '#CreateSnmp\x20#comm_string', 'Gateway\x20Switch', '\x27)\x22></i><i\x20class=\x22mdi\x20mdi-close\x20icon-clsbtn\x22\x20id=\x22icon-close\x22\x20onclick=\x22closesearchbar(\x27', 'trigger', '<th>Units</th>', 'then', '<td>t</td>', '<div\x20class=\x22\x22>', 'gray', 'operation', 'username', 'Submit', 'email', '#modalBodyStep2,\x20#modalBodyStep3,\x20#modalBodyStep4,\x20#modalBodyStep5', 'mainip-group', 'getElementsByClassName', 'Fill\x20\x27IPADDRESS\x27\x20in\x20correct\x20format\x20on\x20\x27PHYSICAL\x20IP\x27\x20field', '/lesites/getallsitenames', 'Enter\x20User\x20Name', 'done', '#login_t', '</span>', 'port-node-label', '<select\x20class=\x22input-select\x20multiple-select\x20custom-select\x20select-input\x20multi-select-input\x20w-100\x22\x20name=\x22IDRAC_IPADDRESS\x22\x20multiple=\x22multiple\x22\x20id=\x22multi-select-idrac\x22>', '<div\x20class=\x22row\x22\x20id=\x22server-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag', '<div\x20class=\x22form-check\x22><input\x20class=\x22form-check-input\x22\x20type=\x22checkbox\x22\x20value=\x22\x22\x20id=\x22', 'non_validated', 'ilomgnt', 'Devices', 'disk_c', '#ip-dropdown', 'redirectToEditRegisteredHostsPage', '&csrfmiddlewaretoken=', '<div\x20class=\x22icon-let\x22>', 'addWorksheet', 'user_name', 'readyState', 'selectdevice', 'innerHTML', '#onboardSelect,\x20#selectdevice,\x20#hosts-dropdown,\x20#multi-select-ip,\x20#sub-multi-select-ip,\x20#REUSABLE_EMAIL,\x20#GLOBAL_APPLICATION,\x20#FRNDLY_NAME,\x20#PHYSICAL_IP', 'r_swi', 'step', 'Enter\x20IDRAC\x20Port', 'mgmt-Addon', '152liQffc', 'href', 'GatewaySwitch', '.loader', '#valids_row', 'hostname', '#PHYSICAL_IP', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>FIREWALL<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>', 'Fortigate60E', 'nginx_version', '#modalBodyStep', 'password-label', 'Server\x20IP\x20Address', '#nodetype', '<div\x20class=\x22row\x22>', 'wtable-fields', 'hide.bs.modal', 'node_input', 'multi-select-nginx', '<tr>', 'closest', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>PUBLIC\x20-\x20SWITCH<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>', '</div>', 'Switcheslayer', 'msg', '\x22\x20id=\x22no-lens', '<i\x20class=\x22mdi\x20mdi-close\x20io-con\x22\x20id=\x22del-onb\x22\x20onclick=\x22hostCloseClick(this)\x22\x20data-host-ip=\x22', 'publicsearch-row', '\x20not\x20found.', 'keys', '#routertypelist', '#CreateNginx\x20#port_nginx', 'disk_t', '#sswi', '#ilo_ip', '#p_swi', 'application/json;charset=UTF-8', 'username-label', 'device\x20sheet--value--->', 'snmp_threshold', ':visible', 'service', '</td><td>&nbsp;&nbsp;&nbsp;&nbsp;', '.maincontent', 'serviceSwitch', 'getmgmntdata', '</div><i\x20class=\x22mdi\x20mdi-magnify\x20hide-val', 'Enter\x20ILO\x20IP', 'v2c', '<div>', 's_hw', 'threshold', '<input\x20type=\x22text\x22\x20class=\x22form-control\x20mgnt_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20ILO\x20IP\x22\x20required=\x22\x22\x20id=\x22ilo_ip\x22\x20autocomplete=\x22off\x22>', '/allonboard/idracvalidation', 'selectModalService', 'filter', 'username-error-msg', 'uploadContainer', 'Switch\x27s\x20type\x20not\x20added,\x20please\x20check\x20Administrator', 'object', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20w-100\x22\x20id=\x22node_save\x22\x20onclick=\x22verifynodeServer()\x22>Verify</button>', 'Failure\x20in\x20getallemails\x20', 'responseText', '<span\x20class=\x22error-msg\x22\x20id=\x22username-error-msg\x22>\x20</span>', 'router', 'Ser', '#onboardModal', '#CreateSnmp\x20#snmp_models', '<fieldset\x20class=\x22card\x20onboards\x20border-changeable\x22\x20id=\x22s', '<td>w</td>', '#nohost', '#showerror', 'Public\x20', 'ilo-label', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22', 'Firewall', 'GET', '#servertypelist', '<td>Warning</td>', '<div\x20class=\x22row\x22\x20id=\x22firwallsearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22onb-search\x22><div\x20class=\x22input-group\x20md-form\x20form-sm\x20form-2\x20pl-0\x22\x20style=\x22color:white\x22><input\x20type=\x22search\x22\x20class=\x22form-control\x20search\x22\x20placeholder=\x22Search\x22\x20name=\x22tags\x22\x20id=\x22switag', 'sec_level', '<select\x20class=\x22input-select\x20multiple-select\x20custom-select\x20select-input\x20multi-select-input\x20w-100\x22\x20name=\x22WINDOWS_IPADDRESS\x22\x20multiple=\x22multiple\x22\x20id=\x22multi-select-win\x22>', '#server-heading', 'xlsx', 'load_t', '<label\x20for=\x22pass_word\x22\x20id=\x22password-label\x22>Password</label><br>', '<input>', 'name', 'Window\x20Expo', 'idracModal', '/applications/getallapplicationnames', '</select>', '#windowModal\x20#win_save', 'Sheets', 'Failure\x20in\x20getallapplicationnames\x20', '<label\x20for=\x22wthreshold\x22>\x20Threshold</label>', '.ip-address', '#friendly-details', '<option\x20selected\x20disabled>Select\x20host</option>', '#automationSwitch', '<select\x20class=\x22input-select\x20multiple-select\x20custom-select\x20select-input\x20multi-select-input\x20w-100\x22\x20name=\x22ILO_IPADDRESS\x22\x20multiple=\x22multiple\x22\x20id=\x22multi-select-ilo\x22>', '#service-selected', 'Enter\x20Node\x20Port', 'checked', 'hasOwnProperty', '</tr>', 'multi-select-node', 'removeClass', 'icons-more', 'idrac', '#e_swi', '</p>', 'JSON----->', 'emailid', '#automation-content', 'Email', '<p\x20class=\x22mb-0\x20text-color\x22\x20style=\x22font-size:12px;\x22><b>Name\x20:</b>\x20', '#eswitch-heading', '#mem_w', 'Issue\x20in\x20gettin\x20Iplist', 'fswitch-heading', '</fieldset>&ensp;&ensp;', '<tr><td>', 'Fortigate\x2050E', '<div\x20class=\x22col-12\x20mt-3\x22>', '<label\x20for=\x22win_node\x22\x20id=\x22port-win-label\x22>Windows\x20Port</label>', 'length', 'Want\x20to\x20permanently\x20delete\x20this\x20management?', 'idrac_version', 'createElement', '<input\x20type=\x22checkbox\x22>', 'label', 'nginx_input', 'WindowsExpo\x20added\x20sucessfully', '#registered-service-no-data', '#CreateNode\x20#multi-select-node', 'split', 'uptime_w', 'Nginx\x20Expo', 'Fortigate\x20200F', '#s_hw\x20#', '<table\x20class=\x22table\x22\x20id=\x22wtable-fields\x22\x20style=\x22display:none;\x22>', 'table', 'checkbox', '<option\x20disabled\x20selected>Select\x20Application</option>', 'Menu\x20option\x20clicked:', '#devicedata', 'replace', 'remove', 'show.bs.modal', 'contains', '#path-dropdown', 'nodemgmt', '#switag', '\x2060E', 'Unknown\x20pathhost\x20name\x20\x27', '<i\x20class=\x22mdi\x20mdi-download\x20io-con\x22\x20id=\x22download-exe\x22\x20onclick=\x22exportone(this)\x22\x20data-ipaddress-name=\x22', 'multi-select-ip', '#valid_rows', 'sendnginxDataToServer()', 'IP\x20Address', 'selectModaltext', '#g_swi', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20w-100\x22\x20id=\x22win_save\x22\x20onclick=\x22verifywinServer()\x22>Verify</button>', 'parse', '</table>', 'onclick', '#CreateWindow\x20#port_windows', 'multi-select-ilo', 'append', 'blue', 'querySelectorAll', 'cpu_c', '<option\x20style=\x22color:', 'form-check-input', 'Gateway\x20', '#pswitch-heading', 'Delete\x20Host', 'select', 'parentNode', 'deletehost', '<div\x20class=\x22select-service\x22\x20id=\x22ngnix-multipleIPAddressSelect\x22>', 'port_nginx-label', 'onerror', 'startsWith', 'getAttribute', '<input\x20type=\x22password\x22\x20class=\x22form-control\x20mgnt_input\x20full-input\x22\x20style=\x22background-color:transparent;\x22\x20placeholder=\x22Enter\x20PassWord\x22\x20required=\x22\x22\x20id=\x22pass_word\x22\x20autocomplete=\x22new-password\x22>', '.icon-circle', '.hide-val', '</legend>', 'Fortigate200F', 'Fortigate\x20100E', 'snmpModal', '#pass_word', 'children', 'port_ips', '<select\x20class=\x22custom-select\x20btn-dropdown\x20dropdown-toggle\x20px-2\x22\x20style=\x22width:140%\x20!important;margin-left:-40px\x20!important;height:\x2025px\x20!important;\x22>', 'none', 'multi-select-win', 'show', '<td>sec</td>', 'errorMsg', 'display:block\x20!important;padding-right:4%\x20!important;', 'servers', '<td>', 'uptime_c', ':checked', '<legend>', 'mainipaddress', 'Routermodel', 'includes', 'node\x20expo', '#mgmts_version', 'IP_ADDRESS', 'snmpdatatable', 'admin', '#sub-data-ip', 'hidden.bs.modal', 'utils', 'save\x20data\x20to\x20the\x20database:', '#uptime_w', '#CreateNginx\x20#nginx_version', '\x22\x20style=\x22color:white;font-size:\x2020px;\x20padding-left:\x207%\x20!important;\x22></i>', '#dialog-for-iframe', 'col-md-6', '/applications/applicationactions', 'Exchange\x20', 'totalRoters', '\x20fieldset', '2450418jWNGMJ', 'totalFirewall', 'click', '\x22\x20onclick=\x22displaysearchbar(\x27', 'getCell', '#cpu_c', 'login_t', '#validate_row', 'win_save', '<option\x20style=\x22color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;\x22\x20value=\x22\x22\x20selected\x20disabled>Select\x20Secret</option>', '\x27:\x20Server\x20Error', 'X-CSRFToken', 'pswitch-heading', 'Element\x20with\x20ID\x20', '#idractype', '<p\x20class=\x22mb-0\x20text-color\x22\x20style=\x22font-size:12px;\x22><b>Device\x20Type\x20:</b>\x20', '#addon-content\x20input[type=\x22checkbox\x22]', '<label\x20for=\x22user_name\x22\x20id=\x22username-label\x22>User\x20Name</label>', '\x20worksheet...', 'ngnix_save', 'message', 'disabled', '\x20(Version:\x20', 'device\x20sheet--cleaned\x20value--->', '<label\x20for=\x22port_ip\x22\x20id=\x22port-label\x22>IDRAC\x20Port</label>', '<input\x20type=\x22number\x22\x20step=\x22any\x22\x20class=\x22form-control\x22\x20id=\x22', 'isArray', '#showlist', 'rowid', 'node_version', 'Router', 'ilo-error-msg', 'pass_word', '#gswitch-heading', '\x27)\x22\x20style=\x22font-size:\x2019px;color:#e99123\x22></i></div>', '/useronboard/getuserlist', 'selectedIndex', 'port_nodes', 'selectonb', '<br>', '#CreateWindow\x20#window_version', 'Request\x20failed\x20with\x20status:', 'success', 'Field\x20cannot\x20be\x20empty', 'Firewall\x27s\x20type\x20not\x20Added,\x20Please\x20check\x20Administrator', 'allonboard/snmpdatatable', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'winipaddr', 'mgnt_input', 'prop', '<div\x20class=\x22select-service\x22\x20id=\x22ilo-multipleIPAddressSelect\x22>', '#CreateIdrac\x20#idrac_version', 'getserverstype', '<i\x20class=\x22mdi\x20mdi-alpha-m-box-outline\x20icon-val\x22\x20style=\x22color:#55a8fd;\x22></i>', 'Error\x20in\x20sheet\x20\x27', 'selected', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>ROUTER<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>', 'read', 'SNMP', '#REUSABLE_EMAIL', 'ilo_save', 'color', '#applicationname', 'ready', 'addon-content', '#selectdevice', '#CreateMgmt\x20#mgmts_version', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>EXCHANGE\x20-\x20SWITCH<div\x20style=\x22background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center\x22>', '</tbody></table>', 'value', 'pop', '6711NFOljW', 'change', '#CreateIdrac\x20#multi-select-idrac', 'load_w', 'each', '<option\x20value=\x22\x22\x20disabled>', 'Switch', '55cOTKcK', '<table\x20class=\x22table\x22\x20id=\x22table-fields\x22\x20style=\x22display:none;\x22>', '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#00ff00;\x22>Success\x20in\x20Validation...</p>', 'splice', 'response--->', '1854Ycvjlm', 'device\x20sheet--key--->', '</a>', 'style', '#CreateNginx\x20#multi-select-nginx', 'Fortigate80F', 'g_swi', '<span\x20class=\x22error-msg\x22\x20id=\x22nginx-error-msg\x22>\x20</span>', 'firewalls', '\x20Added</p>&ensp;&ensp;', 'routers', '#cpu_w', 'stringify', '#mgmnttype', '#sub-multi-select-ip', '<input\x20type=\x22checkbox\x22\x20id=\x22wthreshold\x22\x20name=\x22wthreshold', '<option\x20style=\x22color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;\x22\x20value=\x22', '<div\x20class=\x22col-6\x22>', '[[],[]]'];
    _0x1b39 = function () {
        return _0x35837e;
    };
    return _0x1b39();
}

function AddonCheckboxes(_0x134d5e) {
    var _0x38dbbd = _0x772837,
        _0x1ba13d = $(_0x38dbbd(0x16e));
    _0x1ba13d[_0x38dbbd(0x1a9)](function () {
        var _0x5672fd = _0x38dbbd,
            _0x39d36d = $(this),
            _0xd327be = _0x39d36d[_0x5672fd(0x224)]()[_0x5672fd(0x241)](_0x5672fd(0xfc)),
            _0x5b2809 = _0xd327be['text']()[_0x5672fd(0x277)]()['toLowerCase'](),
            _0x30e7c5 = _0x39d36d[_0x5672fd(0x29e)]('id'),
            _0x1e2ca9 = _0x134d5e[_0x5672fd(0x29a)][_0x5672fd(0xb0)](function (_0x37f19d) {
                var _0x30ff8c = _0x5672fd;
                return _0x37f19d[_0x30ff8c(0x324)] && _0x37f19d[_0x30ff8c(0x324)][_0x30ff8c(0x280)]() === _0x30e7c5[_0x30ff8c(0x10c)](_0x30ff8c(0x279), '') || _0x37f19d[_0x30ff8c(0x27c)] && (_0x37f19d[_0x30ff8c(0x27c)]['toLowerCase']() === 'v3' || _0x37f19d[_0x30ff8c(0x27c)][_0x30ff8c(0x280)]() === 'v2c');
            });
        _0x1e2ca9['length'] > 0x0 ? (_0xd327be[_0x5672fd(0x235)](_0x5672fd(0x19b), _0x5672fd(0x123)), _0x39d36d[_0x5672fd(0x18f)]('checked', !![])) : (_0xd327be[_0x5672fd(0x235)](_0x5672fd(0x19b), '#6c7293'), _0x39d36d[_0x5672fd(0x18f)]('checked', ![])), [_0x5672fd(0x1d3), _0x5672fd(0x1ab), _0x5672fd(0xb9)]['some'](_0x4cce5f => selectkeyValue[_0x5672fd(0x14b)](_0x4cce5f)) && _0x5b2809 === _0x5672fd(0x1d1) || selectkeyValue === _0x5672fd(0x281) && [_0x5672fd(0x251), _0x5672fd(0xe6), _0x5672fd(0x14c), 'window\x20expo', _0x5672fd(0x346)][_0x5672fd(0x14b)](_0x5b2809) || selectkeyValue === 'VM' && [_0x5672fd(0x14c), _0x5672fd(0x346), _0x5672fd(0x2cb)]['includes'](_0x5b2809) ? _0x39d36d[_0x5672fd(0x224)]()[_0x5672fd(0x140)]() : _0x39d36d[_0x5672fd(0x224)]()[_0x5672fd(0x25c)]();
    });
}

function addoncheckmodal() {
    var _0x1595f2 = _0x772837,
        _0x1fa9ca = [{
            'label': 'ILO',
            'modalId': _0x1595f2(0x314)
        }, {
            'label': _0x1595f2(0x21c),
            'modalId': 'idracModal'
        }, {
            'label': 'Node\x20Expo',
            'modalId': _0x1595f2(0x25b)
        }, {
            'label': _0x1595f2(0xd1),
            'modalId': _0x1595f2(0x379)
        }, {
            'label': _0x1595f2(0x103),
            'modalId': _0x1595f2(0x2b0)
        }, {
            'label': _0x1595f2(0x198),
            'modalId': _0x1595f2(0x139)
        }],
        _0xc7bba4 = $(_0x1595f2(0x342));
    _0xc7bba4['empty'](), _0x1fa9ca[_0x1595f2(0x1f1)](function (_0x22583a) {
        var _0x3b9c35 = _0x1595f2,
            _0x10c366 = _0x3b9c35(0x279) + _0x22583a[_0x3b9c35(0xfc)][_0x3b9c35(0x10c)](/\s/g, '\x20')['toLowerCase'](),
            _0x53bd8b = $(_0x3b9c35(0xcf), {
                'class': _0x3b9c35(0x127),
                'type': _0x3b9c35(0x108),
                'value': '',
                'id': _0x10c366
            }),
            _0x21696c = $(_0x3b9c35(0x2dc), {
                'class': 'form-check-label',
                'for': _0x10c366,
                'id': _0x10c366,
                'text': _0x22583a[_0x3b9c35(0xfc)]
            }),
            _0x1b9aaf = $('<div>', {
                'class': _0x3b9c35(0x296)
            })[_0x3b9c35(0x122)](_0x53bd8b, _0x21696c);
        _0xc7bba4[_0x3b9c35(0x122)](_0x1b9aaf), _0x22583a[_0x3b9c35(0x1cf)] && _0x53bd8b['on']('change', function () {
            var _0x16a7dc = _0x3b9c35,
                _0x3c87b4 = '#' + _0x22583a[_0x16a7dc(0x1cf)];
            $(this)['is'](':checked') ? $(_0x3c87b4)[_0x16a7dc(0x2a6)](_0x16a7dc(0x140)) : $(_0x3c87b4)[_0x16a7dc(0x2a6)](_0x16a7dc(0x25c));
        });
    });
}

function editFormData() {
    var _0xb917c3 = _0x772837,
        _0x1381c6 = {};
    $(_0xb917c3(0x1df))[_0xb917c3(0x2c4)](), _0x1381c6[_0xb917c3(0x340)] = {
        'pathhost': $(_0xb917c3(0x110))[_0xb917c3(0x23c)](),
        'hostname': $(_0xb917c3(0x1c9))[_0xb917c3(0x23c)]()[_0xb917c3(0x10c)](_0xb917c3(0x282), '')
    }, _0x1381c6[_0xb917c3(0x21b)] = {
        'ipAddress': $(_0xb917c3(0x242))['val'](),
        'subIpAddress': String($(_0xb917c3(0x1bf))[_0xb917c3(0x23c)]())[_0xb917c3(0x101)](',')
    }, _0x1381c6[_0xb917c3(0x208)] = {
        'Email': $(_0xb917c3(0x199))[_0xb917c3(0x23c)](),
        'ApplicationName': $(_0xb917c3(0x301))['val']()
    }, _0x1381c6[_0xb917c3(0x11a)] = {
        'FriendlyName': $(_0xb917c3(0x267))[_0xb917c3(0x23c)](),
        'physicalIP': $('#PHYSICAL_IP')['val']()
    }, _0x1381c6[_0xb917c3(0xaf)] = {
        'service': $(_0xb917c3(0x23e))[_0xb917c3(0x23c)]()
    };
    var _0x5d4df3 = '';
    for (var _0x2e5286 in _0x1381c6) {
        for (var _0xd3eb80 in _0x1381c6[_0x2e5286]) {
            _0x5d4df3 += '<tr><td>' + _0xd3eb80 + _0xb917c3(0xa3) + _0x1381c6[_0x2e5286][_0xd3eb80] + _0xb917c3(0x287);
        }
    }
    $(_0xb917c3(0x1df))[_0xb917c3(0x33b)]('<table\x20style=\x22width:100%\x22>' + _0x5d4df3 + '</table>');
}