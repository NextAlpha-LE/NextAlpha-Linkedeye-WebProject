var _0xebf728 = _0x8b76;
(function (_0x57db80, _0x288147) {
    var _0x34e9ba = _0x8b76,
        _0x2c6e3f = _0x57db80();
    while (!![]) {
        try {
            var _0x54e0e9 = -parseInt(_0x34e9ba(0x121)) / 0x1 * (-parseInt(_0x34e9ba(0x138)) / 0x2) + -parseInt(_0x34e9ba(0x14e)) / 0x3 * (parseInt(_0x34e9ba(0x18e)) / 0x4) + -parseInt(_0x34e9ba(0xbe)) / 0x5 + parseInt(_0x34e9ba(0x11f)) / 0x6 + parseInt(_0x34e9ba(0xaf)) / 0x7 + parseInt(_0x34e9ba(0xc4)) / 0x8 + parseInt(_0x34e9ba(0x109)) / 0x9 * (-parseInt(_0x34e9ba(0x1b0)) / 0xa);
            if (_0x54e0e9 === _0x288147) break;
            else _0x2c6e3f['push'](_0x2c6e3f['shift']());
        } catch (_0x150040) {
            _0x2c6e3f['push'](_0x2c6e3f['shift']());
        }
    }
}(_0x2604, 0x2fa04));
var global_all_services, global_ip_addresses, service_list = [],
    serviceIdCount = 0x0,
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
    emailLists = [];
$(document)[_0xebf728(0x148)](function () {
    var _0x3e229f = _0xebf728;
    $(_0x3e229f(0x182))[_0x3e229f(0x104)](), emailListResponse();
    window[_0x3e229f(0x119)][_0x3e229f(0xad)][_0x3e229f(0xc6)]('?')[_0x3e229f(0x171)]() === _0x3e229f(0xc0) && (isFillHostDetails = ![], $('.add')['trigger'](_0x3e229f(0x17b), getFileNames(), getServices(), getVaultInformation(), $('#nodata')[_0x3e229f(0x104)](), $('#hostcontent')['hide'](), $(_0x3e229f(0x147))['show']()));
    if (window[_0x3e229f(0x119)][_0x3e229f(0xad)][_0x3e229f(0xc6)]('!')['pop']() === 'redirectToEditRegisteredHostsPage') {
        isFillHostDetails = !![];
        var _0x507ed9 = window[_0x3e229f(0x119)]['href'][_0x3e229f(0xc6)]('?')['pop'](),
            _0x4bebe9 = _0x507ed9[_0x3e229f(0xc6)]('!')[0x0];
        getVaultInformation(), editRegisteredHosts(_0x4bebe9);
    }
    isFillHostDetails && (fillHostDetails(), $(_0x3e229f(0x1a1))['hide'](), $(_0x3e229f(0x147))['hide']()), $('.add')['click'](function () {
        var _0x3a6092 = _0x3e229f;
        getFileNames(), getServices(), getVaultInformation(), $(_0x3a6092(0x1a1))['hide'](), $('#hostcontent')[_0x3a6092(0x104)](), $(_0x3a6092(0x147))[_0x3a6092(0xaa)]();
    }), $(_0x3e229f(0x11b))['click'](function () {
        sendFormDataToServer();
    }), $(_0x3e229f(0x16f))[_0x3e229f(0x104)](), $(_0x3e229f(0x111))[_0x3e229f(0x104)](), $(_0x3e229f(0xe8))[_0x3e229f(0x104)](), $(_0x3e229f(0x1a0))['on'](_0x3e229f(0xe0), function () {
        var _0x5e1d26 = _0x3e229f;
        $('#applicationname')[_0x5e1d26(0x137)](''), $(_0x5e1d26(0x14a))[_0x5e1d26(0xa2)]();
    }), $(_0x3e229f(0xb7))['on']('show.bs.modal', function () {
        var _0x5558d0 = _0x3e229f;
        if (global_ip_addresses !== undefined) {
            var _0xe2ebf7 = '<option\x20disabled>Choose\x20IP</option>';
            global_ip_addresses[_0x5558d0(0xe3)](function (_0x50fbc9) {
                var _0xaaadcd = _0x5558d0,
                    _0x5ce0b3 = _0x50fbc9['ip'];
                _0xe2ebf7 += _0xaaadcd(0xf2) + _0x5ce0b3 + '\x22>' + _0x5ce0b3 + _0xaaadcd(0xda);
            }), $(_0x5558d0(0xf5))[_0x5558d0(0x188)](_0xe2ebf7);
        }
    });
});

function editRegisteredHosts(_0x216a6f) {
    var _0xdee2ac = _0xebf728;
    isEdit = !![], requestDataFromServer('edithostdetails', {
        'ipaddress': _0x216a6f
    }, _0xdee2ac(0x19c))['done'](editResponse);
}

function scanHS() {
    var _0x105a90 = _0xebf728,
        _0x35b60e = $(_0x105a90(0xf5))[_0x105a90(0x137)](),
        _0x55cbef = $('#configpath')['val']();
    requestDataFromServer(_0x105a90(0x196), {
        'ipaddress': _0x35b60e,
        'path': _0x55cbef,
        'csrfmiddlewaretoken': csfr_token
    }, _0x105a90(0x178))['done'](parseconfigdata);
}

function parseconfigdata(_0x2239b2) {
    var _0x50a31e = _0xebf728;
    res = JSON[_0x50a31e(0xbd)](_0x2239b2), res['status'] == 0xc8 ? ($(_0x50a31e(0xf5))[_0x50a31e(0x137)](''), $(_0x50a31e(0x185))[_0x50a31e(0x137)](''), $(_0x50a31e(0xb7))[_0x50a31e(0x199)](_0x50a31e(0xb8)), requestDataFromServer(_0x50a31e(0xdb), {
        'fileName': hostPath + _0x50a31e(0xc9)
    }, _0x50a31e(0x19c))['done'](fillServicesValuesafterHSDiscover)) : swal(_0x50a31e(0xe7), '', _0x50a31e(0xeb));
}

function fillServicesValuesafterHSDiscover(_0x12850b) {
    var _0x5e8040 = _0xebf728;
    global_all_services = JSON[_0x5e8040(0xbd)](_0x12850b);
    if ($(_0x5e8040(0x168))['is'](_0x5e8040(0x108))) {
        var _0x51634b = _0x5e8040(0x18d),
            _0x33bee0 = $(_0x5e8040(0x187))['val']()[_0x5e8040(0xc6)]('_')[0x0];
        global_all_services !== undefined && global_all_services[_0x5e8040(0xb5)] > 0x0 && ($(_0x5e8040(0x168))[_0x5e8040(0xa2)](), global_all_services[_0x5e8040(0xe3)](function (_0x4c7ebe) {
            var _0x18ee14 = _0x5e8040;
            _0x4c7ebe[_0x18ee14(0xc6)]('_')[0x0] === _0x33bee0 && (_0x51634b += _0x18ee14(0xf2) + _0x4c7ebe + '\x22>' + _0x4c7ebe['split']('_')[0x2][_0x18ee14(0x180)](_0x18ee14(0x126), '') + _0x18ee14(0xda));
        }), $('#services-dropdown')[_0x5e8040(0x188)](_0x51634b));
    }
}

function saveapplication() {
    var _0x33c7c5 = _0xebf728;
    if ($(_0x33c7c5(0xbc))[_0x33c7c5(0x137)]() == '') return ![];
    else {
        var _0x5cf9fd = {};
        _0x5cf9fd[_0x33c7c5(0x116)] = $(_0x33c7c5(0xbc))['val'](), _0x5cf9fd['operation'] = 'add', _0x5cf9fd[_0x33c7c5(0xbb)] = 0x1, requestData[_0x33c7c5(0x14f)] = _0x5cf9fd, requestDataFromServer('/applications/applicationactions', {
            'clientData': JSON[_0x33c7c5(0x151)](requestData),
            'csrfmiddlewaretoken': csfr_token
        }, _0x33c7c5(0x178))[_0x33c7c5(0x19a)](applicationResponse);
    }
}

function applicationResponse(_0x16b1bd) {
    var _0x4ec737 = _0xebf728;
    if (_0x16b1bd && _0x16b1bd['status'] == 0x1f4) $(_0x4ec737(0x14a))[_0x4ec737(0x18a)](_0x16b1bd[_0x4ec737(0x19b)]);
    else {
        data = requestData[_0x4ec737(0x14f)], data[_0x4ec737(0x116)], applicationNames[_0x4ec737(0xf7)](data[_0x4ec737(0x116)]);
        if ($(_0x4ec737(0x16b))['is'](':visible')) {
            var _0x329052 = $(_0x4ec737(0x16b))[_0x4ec737(0x137)](),
                _0x2eb709 = '\x20';
            _0x2eb709 += _0x4ec737(0xf2) + data[_0x4ec737(0x116)] + '\x22>' + data[_0x4ec737(0x116)] + _0x4ec737(0xda), $('#GLOBAL_APPLICATION')[_0x4ec737(0x188)](_0x2eb709);
            if (_0x329052 !== null && _0x329052 !== '') $(_0x4ec737(0x16b))['val'](_0x329052);
            else $(_0x4ec737(0x16b))[_0x4ec737(0x137)](data[_0x4ec737(0x116)]);
        }
        swal(_0x16b1bd['msg'], '\x20', 'success'), $(_0x4ec737(0x1a0))['modal'](_0x4ec737(0xb8));
    }
}

function pathselected(_0x45cfb1) {
    var _0x1a9055 = _0xebf728;
    $('#host-form-div')[_0x1a9055(0xa2)](), $('#service-form-div')['empty'](), $(_0x1a9055(0x102))[_0x1a9055(0xa2)](), $(_0x1a9055(0xcf))[_0x1a9055(0x170)](_0x1a9055(0x1a4), 'block'), $(_0x1a9055(0x112))[_0x1a9055(0xa2)](), $(_0x1a9055(0x168))[_0x1a9055(0xa2)](), $(_0x1a9055(0x187))['empty'](), $(_0x1a9055(0x16f))[_0x1a9055(0x104)](), $(_0x1a9055(0x111))[_0x1a9055(0x104)](), $(_0x1a9055(0xe8))[_0x1a9055(0x104)](), hostPath = $(_0x45cfb1)[_0x1a9055(0x137)](), getFileNames();
}

function fillHostDetails() {
    var _0x322bce = _0xebf728;
    requestDataFromServer(_0x322bce(0xfe), {}, _0x322bce(0x19c))[_0x322bce(0x19a)](fillHostResponse);
}

function fillHostResponse(_0x5d6deb) {
    var _0x18230c = _0xebf728;
    res = JSON[_0x18230c(0xbd)](_0x5d6deb);
    var _0x77462a = '';
    if (res[_0x18230c(0x12a)] == 0xc8) {
        $(_0x18230c(0x147))[_0x18230c(0x104)](), $(_0x18230c(0x1a1))[_0x18230c(0x104)](), host_details = res[_0x18230c(0x14f)];
        if (host_details[_0x18230c(0xb5)] > 0x0) {
            var _0x53c1d6 = 0x0,
                _0x2fec1c = 0x0,
                _0x4df1e6 = 0x0,
                _0x46aacd = 0x0,
                _0x3ff20b = 0x0;
            host_details[_0x18230c(0xe3)](function (_0x2ed247) {
                var _0x2241aa = _0x18230c,
                    _0xaf5176 = '';
                registeredIPAddress['push'](_0x2ed247[_0x2241aa(0x132)]), _0xaf5176 += _0x2241aa(0x133), _0xaf5176 += '<div\x20class=\x22card\x20onboards\x22>', _0xaf5176 += _0x2241aa(0xa8), _0xaf5176 += _0x2241aa(0xa3), _0xaf5176 += _0x2241aa(0xb9) + _0x2ed247[_0x2241aa(0x132)] + _0x2241aa(0x129) + _0x2ed247[_0x2241aa(0xc8)] + _0x2241aa(0x150), _0xaf5176 += '</div>', _0xaf5176 += _0x2241aa(0xc5) + _0x2ed247['address'] + '\x22style=\x22color:white;\x20float:right\x22>', _0xaf5176 += _0x2241aa(0xb3) + _0x2ed247[_0x2241aa(0xc8)] + '</p>', _0xaf5176 += _0x2241aa(0x141) + _0x2ed247['contact_email'] + _0x2241aa(0xb1), _0xaf5176 += _0x2241aa(0xc7) + _0x2ed247['application'] + _0x2241aa(0xb1), _0xaf5176 += '<p\x20class=\x22bold-text\x20mb-0\x20text-color\x20\x22>Automation\x20:\x20' + _0x2ed247[_0x2241aa(0x18c)] + _0x2241aa(0xb1), _0xaf5176 += _0x2241aa(0x10a) + _0x2ed247[_0x2241aa(0xdc)] + _0x2241aa(0xb1), _0xaf5176 += _0x2241aa(0x103), _0xaf5176 += '</div>', _0xaf5176 += _0x2241aa(0xd1), _0x77462a = _0x2ed247[_0x2241aa(0xdc)];
                var _0x2ae8e6 = '';
                if (_0x77462a == _0x2241aa(0x17f)) $('#nohost')['hide'](), $(_0x2241aa(0x15c))[_0x2241aa(0xaa)](), _0x2ae8e6 = '#totalGateway', _0x53c1d6++, $(_0x2ae8e6)['text'](_0x53c1d6);
                else {
                    if (_0x77462a == 'fw') $('#nohost')[_0x2241aa(0x104)](), $(_0x2241aa(0x144))[_0x2241aa(0xaa)](), _0x2ae8e6 = _0x2241aa(0x183), _0x2fec1c++, $(_0x2ae8e6)[_0x2241aa(0xd4)](_0x2fec1c);
                    else {
                        if (_0x77462a == _0x2241aa(0x159)) $(_0x2241aa(0x16c))[_0x2241aa(0x104)](), $(_0x2241aa(0xf9))['show'](), _0x2ae8e6 = _0x2241aa(0xbf), _0x4df1e6++, $(_0x2ae8e6)['text'](_0x4df1e6);
                        else _0x77462a == _0x2241aa(0x13e) ? ($(_0x2241aa(0x16c))[_0x2241aa(0x104)](), $(_0x2241aa(0xe4))[_0x2241aa(0xaa)](), _0x2ae8e6 = _0x2241aa(0xcc), _0x46aacd++, $(_0x2ae8e6)[_0x2241aa(0xd4)](_0x46aacd)) : ($(_0x2241aa(0x16c))['hide'](), $(_0x2241aa(0x1af))[_0x2241aa(0xaa)](), _0x2ae8e6 = '#totalExchange', _0x3ff20b++, $(_0x2ae8e6)[_0x2241aa(0xd4)](_0x3ff20b));
                    }
                }
                $('#' + _0x77462a)[_0x2241aa(0x188)](_0xaf5176), $(_0x2241aa(0x100))[_0x2241aa(0xaa)](), $(_0x2241aa(0x1a1))[_0x2241aa(0xaa)]();
            });
        } else $(_0x18230c(0x1a1))[_0x18230c(0xaa)]();
    } else swal(_0x18230c(0x14b), '\x20', 'error');
}

function getIpAddress() {
    var _0x3ba300 = _0xebf728;
    if (global_ip_addresses === undefined) requestDataFromServer('getiplist', {}, _0x3ba300(0x19c))[_0x3ba300(0x19a)](fillIPValues);
}

function fillIPValues(_0x32a28a) {
    var _0x138ffd = _0xebf728;
    res = JSON[_0x138ffd(0xbd)](_0x32a28a), res[_0x138ffd(0x12a)] == 0xc8 ? (global_ip_addresses = res['data'], getApplicationNames()) : swal('Issue\x20in\x20gettin\x20Iplist', '\x20', _0x138ffd(0xeb));
}

function getFileNames() {
    var _0x3e2cc7 = _0xebf728;
    requestDataFromServer(_0x3e2cc7(0xdb), {
        'fileName': hostPath + _0x3e2cc7(0x1a8)
    }, _0x3e2cc7(0x19c))[_0x3e2cc7(0x19a)](fillHostValues);
}

function fillHostValues(_0x2945c8) {
    var _0x5758b9 = _0xebf728;
    res = JSON[_0x5758b9(0xbd)](_0x2945c8);
    if (res['status'] == 0xc8) {
        requestDataFromServer('getfilenames', {
            'fileName': hostPath + _0x5758b9(0xc9)
        }, _0x5758b9(0x19c))[_0x5758b9(0x19a)](fillServicesValues);
        var _0x59ac10 = _0x5758b9(0x14d),
            _0x2cfed5 = res[_0x5758b9(0x14f)];
        _0x2cfed5[_0x5758b9(0xe3)](function (_0x3ed5d3) {
            var _0x2d721c = _0x5758b9;
            _0x59ac10 += '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22' + _0x3ed5d3 + '\x22>' + _0x3ed5d3[_0x2d721c(0x180)](_0x2d721c(0x126), '') + _0x2d721c(0xda);
        }), $(_0x5758b9(0x187))[_0x5758b9(0x188)](_0x59ac10);
        if (isEdit) autoSelectHost();
    } else swal(_0x5758b9(0xf4), '\x20', _0x5758b9(0xeb));
}

function fillServicesValues(_0x531d5e) {
    var _0xfe9ca4 = _0xebf728;
    res = JSON[_0xfe9ca4(0xbd)](_0x531d5e), res[_0xfe9ca4(0x12a)] == 0xc8 ? (getIpAddress(), global_all_services = res[_0xfe9ca4(0x14f)]) : swal(_0xfe9ca4(0x136), '\x20', 'error');
}

function serviceselected(_0xb2eb65) {
    var _0xcdd6d6 = _0xebf728;
    selectedFileType = _0xcdd6d6(0x18f), $(_0xcdd6d6(0x16f))['hide'](), $('#service-form-div')[_0xcdd6d6(0xa2)](), $(_0xb2eb65)[_0xcdd6d6(0x137)]() != null && ($('#service-header')[_0xcdd6d6(0xd4)]($(_0xb2eb65)['val']()[_0xcdd6d6(0xc6)]('_')[0x2][_0xcdd6d6(0x180)]('.j2', '')), requestDataFromServer(_0xcdd6d6(0x153), {
        'filename': hostPath + '_SERVICES_' + $(_0xb2eb65)[_0xcdd6d6(0x137)](),
        'csrfmiddlewaretoken': csfr_token
    }, _0xcdd6d6(0x178))[_0xcdd6d6(0x19a)](handleFileContentResponse));
}

function hostselected(_0x4236d3) {
    var _0x4c2824 = _0xebf728;
    selectedFileType = _0x4c2824(0x143), $('#host-form-div')[_0x4c2824(0xa2)](), $('#service-form-div')['empty'](), $('#registered-service-div')['empty'](), $('#registered-service-no-data')[_0x4c2824(0x170)](_0x4c2824(0x1a4), _0x4c2824(0xa6)), requestDataFromServer(_0x4c2824(0x153), {
        'filename': hostPath + _0x4c2824(0x175) + $(_0x4236d3)['val'](),
        'csrfmiddlewaretoken': csfr_token
    }, 'POST')[_0x4c2824(0x19a)](handleFileContentResponse);
}

function handleFileContentResponse(_0x55629b) {
    var _0x457c09 = _0xebf728;
    res = JSON[_0x457c09(0xbd)](_0x55629b);
    if (res[_0x457c09(0x12a)] == 0xc8) {
        data = res['data'];
        if (data[_0x457c09(0xb5)] != 0x0) {
            var _0x10afd4 = '',
                _0x2ee93b = -0x1,
                _0x4183c5 = data,
                _0x68b015 = _0x4183c5;
            _0x4183c5[_0x457c09(0xe3)](function (_0x1b8644) {
                var _0xcd76ee = _0x457c09;
                _0x2ee93b++;
                if (_0x1b8644[_0xcd76ee(0x1ab)]('__') >= 0x0) {
                    var _0x69fddd = _0x1b8644['split']('__');
                    if (_0x69fddd[0x0] == 'BOOL') {
                        var _0x151469 = _0x69fddd[0x1],
                            _0x3bf870 = -0x1;
                        _0x4183c5[_0xcd76ee(0xe3)](function (_0x364b3c) {
                            var _0x344422 = _0xcd76ee;
                            _0x3bf870++;
                            var _0x5d9d8a = _0x364b3c[_0x344422(0xc6)]('__');
                            if (_0x5d9d8a[0x0] == _0x151469) {
                                var _0x533c8b = _0x4183c5[_0x2ee93b],
                                    _0x3afe8e = _0x4183c5[_0x3bf870];
                                delete _0x68b015[_0x2ee93b], delete _0x68b015[_0x3bf870], _0x68b015[_0x344422(0xf7)](_0x533c8b), _0x68b015[_0x344422(0xf7)](_0x3afe8e);
                            }
                        });
                    }
                }
            });
            var _0x31326c = [];
            _0x68b015[_0x457c09(0xe3)](function (_0x50ac5c) {
                var _0x1bd681 = _0x457c09;
                if (selectedFileType === _0x1bd681(0x143) && _0x50ac5c === _0x1bd681(0xb2)) {
                    if (!isEdit) drawMultiplIPAddresses();
                    return;
                }
                var _0x2dc829 = _0x50ac5c[_0x1bd681(0xc6)]('_');
                _0x50ac5c[_0x1bd681(0x1ab)]('__') >= 0x0 && (_0x2dc829 = _0x50ac5c['split']('__')[0x1][_0x1bd681(0xc6)]('_'));
                if (selectedFileType === _0x1bd681(0x18f) && (_0x2dc829[0x0] === 'COMMON' || _0x2dc829[0x0] === _0x1bd681(0x155))) {
                    $('#' + _0x50ac5c)[_0x1bd681(0x137)]() !== undefined && (_0x10afd4 += _0x1bd681(0xef) + _0x50ac5c + _0x1bd681(0x135) + $('#' + _0x50ac5c)[_0x1bd681(0x137)]() + '\x22>');
                    return;
                }
                var _0x3a977a = ![],
                    _0x527214 = '',
                    _0x53d799 = '',
                    _0x175f60 = '',
                    _0x5fd902 = '',
                    _0x805cc8 = '',
                    _0x921dcd = '',
                    _0x276ba0 = '',
                    _0x1c63c8 = '';
                if (_0x50ac5c['indexOf']('__') >= 0x0) {
                    var _0x255d96 = _0x50ac5c[_0x1bd681(0xc6)]('__');
                    if (_0x255d96[0x0] === _0x1bd681(0x11d)) {
                        _0x3a977a = !![];
                        if (selectedFileType === _0x1bd681(0x18f)) {
                            _0x175f60 = _0x255d96[0x1] + '_' + serviceIdCount;
                            var _0x2b2788 = $('.' + _0x255d96[0x1])[_0x1bd681(0x15e)]()['is'](_0x1bd681(0x108));
                            _0x2b2788 && (_0x1c63c8 = _0x1bd681(0x190));
                            if (isServiceEdit) _0x1c63c8 = '';
                        } else _0x175f60 = _0x255d96[0x1];
                    } else {
                        if (selectedFileType === _0x1bd681(0x18f)) {
                            _0x921dcd = _0x255d96[0x0] + '_' + serviceIdCount;
                            var _0x2b2788 = $('.' + _0x255d96[0x0])[_0x1bd681(0x15e)]()['is'](_0x1bd681(0x108));
                            _0x2b2788 ? _0x276ba0 = _0x1bd681(0x16a) : _0x276ba0 = 'style=display:none;', isServiceEdit && (isServiceEdit = ![], _0x276ba0 = 'style=display:none;');
                        } else _0x921dcd = _0x255d96[0x0], _0x276ba0 = _0x1bd681(0x110);
                    }
                }
                selectedFileType === _0x1bd681(0x143) && _0x50ac5c === _0x1bd681(0x16d) && (_0x276ba0 = _0x1bd681(0x110));
                var _0x124b4e = '';
                if (_0x2dc829['length'] > 0x2) {
                    var _0x12f43a = 0x0;
                    _0x2dc829[_0x1bd681(0xe3)](function (_0x43e7b9) {
                        if (_0x12f43a > 0x0) _0x805cc8 += _0x43e7b9 + '\x20';
                        _0x12f43a++, _0x124b4e = _0x43e7b9;
                    }), _0x805cc8[_0x1bd681(0xd0)]();
                } else _0x805cc8 = _0x2dc829[0x1], _0x124b4e = _0x2dc829[0x1];
                selectedFileType === 'Service' ? (_0x527214 = _0x50ac5c + '_' + serviceIdCount, $('#' + _0x50ac5c)[_0x1bd681(0x137)]() !== undefined && (_0x53d799 = _0x1bd681(0xb6), _0x5fd902 = _0x1bd681(0xe9) + $('#' + _0x50ac5c)[_0x1bd681(0x137)]())) : _0x527214 = _0x50ac5c;
                if (_0x2dc829[0x0] === _0x1bd681(0x193)) {
                    var _0x3d36f3 = _0x1bd681(0xdf) + _0x50ac5c;
                    _0x53d799 += _0x3d36f3, selectedFileType === _0x1bd681(0x143) && _0x31326c[_0x1bd681(0xf7)](_0x3d36f3);
                }
                if (_0x3a977a) _0x10afd4 += _0x1bd681(0x1a2), _0x10afd4 += '<label\x20class=\x22text-lowercase\x22\x20style=\x22left:80px\x22\x20id=\x22label_' + _0x527214 + '\x22>' + _0x805cc8 + _0x1bd681(0x181), _0x10afd4 += '<span\x20class=\x22\x22\x20style=\x22display:\x20list-item\x20!important;\x20padding-bottom:\x2045px;\x20overflow:\x20hidden;\x22>', _0x10afd4 += _0x1bd681(0x107), _0x10afd4 += _0x1bd681(0x173) + _0x527214 + _0x1bd681(0x10f) + _0x50ac5c + _0x1bd681(0x158) + _0x175f60 + _0x1bd681(0x154) + _0x1c63c8 + '>', _0x10afd4 += '<span\x20class=\x22slider\x20round\x22></span>', _0x10afd4 += _0x1bd681(0x13d), _0x10afd4 += '</span>', _0x10afd4 += _0x1bd681(0xd1);
                else {
                    if (_0x50ac5c === 'REUSABLE_AUTOMATION__REUSABLE_VAULT' || _0x50ac5c === _0x1bd681(0xae)) {
                        var _0x1e0f0d = '';
                        if (_0x50ac5c === 'GLOBAL_APPLICATION') _0x1e0f0d = _0x1bd681(0x177), applicationNames['forEach'](function (_0x2db1e2) {
                            var _0x3a2464 = _0x1bd681;
                            _0x1e0f0d += _0x3a2464(0x130) + _0x2db1e2 + '\x22>' + _0x2db1e2 + _0x3a2464(0xda);
                        });
                        else {
                            _0x1e0f0d = _0x1bd681(0xc2);
                            var _0x33a3c2 = '';
                            selectedFileType === 'Service' && ($('#' + _0x50ac5c)['val']() !== undefined && (_0x33a3c2 = $('#' + _0x50ac5c)['val']())), vaults['forEach'](function (_0x10bf5d) {
                                var _0x26a75a = _0x1bd681;
                                if (_0x33a3c2 !== '' && _0x33a3c2 === _0x10bf5d) _0x1e0f0d += _0x26a75a(0xf2) + _0x10bf5d + _0x26a75a(0xfa) + _0x10bf5d + '</option>';
                                else _0x1e0f0d += _0x26a75a(0xf2) + _0x10bf5d['url'] + '\x22>' + _0x10bf5d[_0x26a75a(0x12e)] + _0x26a75a(0xda);
                            });
                        }
                        _0x10afd4 += _0x1bd681(0x179) + _0x921dcd + _0x1bd681(0xc1) + _0x527214 + _0x1bd681(0x189) + _0x276ba0 + '>', _0x10afd4 += _0x1bd681(0xab), _0x10afd4 += _0x1bd681(0x19f) + _0x527214 + _0x1bd681(0x10f) + _0x50ac5c + '\x22>', _0x10afd4 += _0x1e0f0d, _0x10afd4 += _0x1bd681(0xec), _0x10afd4 += _0x1bd681(0xd1), _0x10afd4 += _0x1bd681(0xd1);
                    } else {
                        if (_0x50ac5c === _0x1bd681(0x1aa)) {
                            var _0x1e0f0d = '<option\x20disabled\x20selected>Select\x20E-Mail</option>';
                            emailLists[_0x1bd681(0xe3)](function (_0xdbc200) {
                                var _0x5b9054 = _0x1bd681;
                                _0x1e0f0d += _0x5b9054(0x130) + _0xdbc200 + '\x22>' + _0xdbc200 + '</option>';
                            }), _0x10afd4 += '<div\x20class=\x22w-50\x20my-3\x20px-md-4\x20px-2\x20pt-3\x20' + _0x921dcd + _0x1bd681(0xc1) + _0x527214 + _0x1bd681(0x189) + _0x276ba0 + '>', _0x10afd4 += _0x1bd681(0xab), _0x10afd4 += _0x1bd681(0x1a7) + _0x53d799 + _0x1bd681(0xc1) + _0x527214 + _0x1bd681(0x10f) + _0x50ac5c + _0x1bd681(0x163) + _0x124b4e + _0x1bd681(0xd7) + selectedFileType + '\x22>', _0x10afd4 += _0x1e0f0d, _0x10afd4 += _0x1bd681(0xec), _0x10afd4 += _0x1bd681(0xd1), _0x10afd4 += _0x1bd681(0xd1);
                        } else _0x10afd4 += _0x1bd681(0x191) + _0x921dcd + _0x1bd681(0xc1) + _0x527214 + '-div\x22\x20' + _0x276ba0 + '>', _0x10afd4 += _0x1bd681(0x1ae), _0x10afd4 += '<label\x20for=\x22' + _0x527214 + _0x1bd681(0x123) + _0x805cc8 + '</label>', _0x10afd4 += _0x1bd681(0x184) + _0x527214 + _0x1bd681(0x10f) + _0x50ac5c + _0x1bd681(0xa1) + _0x53d799 + _0x1bd681(0x163) + _0x124b4e + _0x1bd681(0x10b) + selectedFileType + '\x22\x20' + _0x5fd902 + '>', _0x10afd4 += _0x1bd681(0xa9), _0x10afd4 += _0x1bd681(0xd1);
                    }
                }
            });
            if (selectedFileType === _0x457c09(0x143)) {
                $('#host-form-div')[_0x457c09(0x188)](_0x10afd4);
                var _0xedba0 = _0x457c09(0x18d),
                    _0x1b6952 = $('#hosts-dropdown')[_0x457c09(0x137)]()[_0x457c09(0xc6)]('_')[0x0];
                global_all_services !== undefined && global_all_services['length'] > 0x0 && ($(_0x457c09(0x168))['empty'](), global_all_services['forEach'](function (_0x41aa5f) {
                    var _0x38fe3e = _0x457c09;
                    _0x41aa5f[_0x38fe3e(0xc6)]('_')[0x0] === _0x1b6952 && (_0xedba0 += _0x38fe3e(0x130) + _0x41aa5f + '\x22>' + _0x41aa5f['split']('_')[0x2][_0x38fe3e(0x180)]('.j2', '') + _0x38fe3e(0xda));
                }), $(_0x457c09(0x168))[_0x457c09(0x188)](_0xedba0), $(_0x457c09(0x111))[_0x457c09(0xaa)]());
                if (isEdit) editCallback();
            } else $('#service-form-div')[_0x457c09(0x188)](_0x10afd4), $(_0x457c09(0x16f))['show'](), $(_0x457c09(0x13f))[_0x457c09(0x104)]();
            fieldValidation(), registerInputFieldEvents(), registerLocalInputFieldEvents(_0x31326c);
        }
    } else swal('Failure\x20in\x20getting\x20all\x20content', '\x20', 'error');
}

function getApplicationNames() {
    var _0x41b30e = _0xebf728;
    if (applicationNames['length'] === 0x0) requestDataFromServer('/applications/getallapplicationnames', {}, 'GET')[_0x41b30e(0x19a)](handleApplicationNamesResponse);
}

function getVaultInformation() {
    var _0x395cf4 = _0xebf728;
    vaults[_0x395cf4(0xb5)] === 0x0 && requestDataFromServer(_0x395cf4(0x169), {}, _0x395cf4(0x19c))[_0x395cf4(0x19a)](handlevaultresponse);
}

function handlevaultresponse(_0x366f56) {
    var _0x4bf2f9 = _0xebf728,
        _0x3ebca1 = '\x20';
    res = JSON[_0x4bf2f9(0xbd)](_0x366f56), $(_0x4bf2f9(0x162))[_0x4bf2f9(0xee)](_0x4bf2f9(0xde))['length'] == 0x0 && (_0x3ebca1 = _0x4bf2f9(0xc2)), res['status'] == 0xc8 ? res[_0x4bf2f9(0x14f)][_0x4bf2f9(0xe3)](function (_0x334351) {
        var _0xe988ed = _0x4bf2f9;
        vaults['push'](_0x334351), !$(_0xe988ed(0xba) + _0x334351['url'] + '\x27]')[_0xe988ed(0xb5)] > 0x0 && (_0x3ebca1 += _0xe988ed(0x130) + _0x334351[_0xe988ed(0x12e)] + '\x22>' + _0x334351[_0xe988ed(0x12e)] + _0xe988ed(0xda));
    }) : swal(_0x4bf2f9(0x13c), '\x20', _0x4bf2f9(0xeb)), $(_0x4bf2f9(0x162))['append'](_0x3ebca1);
}

function handleApplicationNamesResponse(_0x1ab7ea) {
    var _0x4636e5 = _0xebf728;
    res = JSON[_0x4636e5(0xbd)](_0x1ab7ea);
    var _0x4d409e = '\x20';
    $(_0x4636e5(0x16b))[_0x4636e5(0xee)](_0x4636e5(0xde))[_0x4636e5(0xb5)] == 0x0 && (_0x4d409e = '<option\x20disabled\x20selected>Select\x20Application</option>'), res[_0x4636e5(0x12a)] == 0xc8 ? res['data'][_0x4636e5(0xe3)](function (_0x4fa149) {
        var _0x3457fc = _0x4636e5;
        applicationNames[_0x3457fc(0xf7)](_0x4fa149['applicationname']), !$(_0x3457fc(0x128) + _0x4fa149[_0x3457fc(0x116)] + ']')[_0x3457fc(0xb5)] > 0x0 && (_0x4d409e += _0x3457fc(0xf2) + _0x4fa149[_0x3457fc(0x116)] + '\x22>' + _0x4fa149[_0x3457fc(0x116)] + '</option>');
    }) : swal('Failure\x20in\x20getallapplicationnames\x20', '\x20', _0x4636e5(0xeb)), $('#GLOBAL_APPLICATION')[_0x4636e5(0x188)](_0x4d409e);
}

function drawMultiplIPAddresses() {
    var _0x4acf7f = _0xebf728;
    if (global_ip_addresses !== undefined) {
        var _0x4387a1 = '';
        global_ip_addresses['forEach'](function (_0xf66042) {
            var _0x26381c = _0x8b76,
                _0x5ccf73 = _0xf66042['ip'],
                _0x3a0995 = registeredIPAddress[_0x26381c(0xed)](_0x5ccf73),
                _0x5ccc15 = '';
            if (_0x3a0995) _0x5ccc15 = _0x26381c(0xd2);
            _0x4387a1 += _0x26381c(0xf2) + _0x5ccf73 + '\x22\x20' + _0x5ccc15 + '>' + _0x5ccf73 + _0x26381c(0xda);
        }), $(_0x4acf7f(0x112))['append'](_0x4387a1);
    }
    $(_0x4acf7f(0xe8))[_0x4acf7f(0xaa)](), registerMultiSelect();
}

function drawSingleIpAddress(_0x454498) {
    var _0x50630a = _0xebf728,
        _0xd17463 = _0x50630a(0xf2) + _0x454498 + '\x22>' + _0x454498 + _0x50630a(0xda);
    $(_0x50630a(0x112))['append'](_0xd17463), $(_0x50630a(0xe8))['show'](), registerMultiSelect();
}

function registerMultiSelect() {
    var _0x2abaa5 = _0xebf728;
    if (registeredMultiSelect === !![]) return;
    registeredMultiSelect = !![], $(_0x2abaa5(0x112))[_0x2abaa5(0x15f)]({
        'placeholder': _0x2abaa5(0x19d),
        'filter': !![],
        'filterPlaceholder': _0x2abaa5(0x131),
        'filterAcceptOnEnter': !![],
        'showClear': !![],
        'filterByDataLength': 0xa
    });
}

function boolValueChanged(_0x22df9d) {
    var _0x37a64c = _0xebf728;
    _0x22df9d[_0x37a64c(0x190)] == !![] ? $('.' + $(_0x22df9d)[_0x37a64c(0x186)](_0x37a64c(0x15a)))[_0x37a64c(0xaa)]() : $('.' + $(_0x22df9d)['attr'](_0x37a64c(0x15a)))[_0x37a64c(0x104)]();
}

function registerLocalInputFieldEvents(_0x29cc1b) {
    var _0x18a6d5 = _0xebf728;
    selectedFileType === _0x18a6d5(0x18f) && $(_0x18a6d5(0xfc))[_0x18a6d5(0x13b)](function () {
        var _0x2466bf = _0x18a6d5;
        if ($(this)['attr']('data-attribute') === _0x2466bf(0xb0)) {
            var _0x5447fb = $('#REUSABLE_EMAIL')['val'](),
                _0x19a85b = document['getElementsByClassName'](_0x2466bf(0x157))[0x0][_0x2466bf(0x174)];
            for (i = 0x0; i < _0x19a85b['length']; i++) {
                if (_0x19a85b[i]['text'][_0x2466bf(0x1ab)](_0x5447fb) > -0x1) {
                    _0x19a85b[i][_0x2466bf(0x167)] = !![];
                    break;
                }
            }
        }
        if (document[_0x2466bf(0x134)](_0x2466bf(0x1ac))['checked'] === !![]) {
            var _0xe816ef = $(_0x2466bf(0x162))['val'](),
                _0x19a85b = $(_0x2466bf(0x16e))[0x0][_0x2466bf(0x174)];
            for (i = 0x0; i < _0x19a85b['length']; i++) {
                if (_0x19a85b[i][_0x2466bf(0xd4)][_0x2466bf(0x1ab)](_0xe816ef) > -0x1) {
                    _0x19a85b[i][_0x2466bf(0x167)] = !![];
                    break;
                }
            }
        }
        $(this)[_0x2466bf(0x137)]() !== '' && ($(this)[_0x2466bf(0xa0)]()['find'](_0x2466bf(0x13a))[_0x2466bf(0x120)]('move_label'), $(this)['parent']()[_0x2466bf(0x120)](_0x2466bf(0x140)));
    }), _0x29cc1b[_0x18a6d5(0xe3)](function (_0x1a4df3) {
        $('.' + _0x1a4df3)['focusout'](function (_0x401239) {
            var _0x56bef6 = _0x8b76;
            if ($(this)[_0x56bef6(0x186)]('data-template') === _0x56bef6(0x143)) {
                var _0x1533da = _0x56bef6(0xdf) + $(this)[_0x56bef6(0x186)](_0x56bef6(0x161)),
                    _0x5973c0 = $(this)[_0x56bef6(0x137)]();
                $('.' + _0x1533da)[_0x56bef6(0x13b)](function () {
                    var _0x31f082 = _0x56bef6;
                    $(this)[_0x31f082(0x186)](_0x31f082(0x124)) === _0x31f082(0x18f) && $(this)[_0x31f082(0x137)]() === '' && ($(this)[_0x31f082(0x137)](_0x5973c0), $(this)[_0x31f082(0xa0)]()[_0x31f082(0x101)](_0x31f082(0x13a))[_0x31f082(0x120)](_0x31f082(0x18b)), $(this)[_0x31f082(0xa0)]()['addClass'](_0x31f082(0x140)));
                });
            }
        });
    });
}

function serviceSubmit() {
    var _0x28ae19 = _0xebf728;
    if (checkIfFieldIsEmpty(_0x28ae19(0x143))) return;
    if (checkIfFieldIsEmpty(_0x28ae19(0x18f))) return;
    if ($(_0x28ae19(0x152) + serviceIdCount)['val']() === null) {
        alert(_0x28ae19(0x1b1));
        return;
    }
    if (document[_0x28ae19(0x134)](_0x28ae19(0x139) + serviceIdCount)['checked']) {
        if ($(_0x28ae19(0xff) + serviceIdCount)[_0x28ae19(0x137)]() === null) {
            alert('Choose\x20Secret.');
            return;
        }
    }
    var _0x49f168 = {};
    _0x49f168['id'] = serviceIdCount;
    var _0x348447 = $(_0x28ae19(0xe1))[_0x28ae19(0x12f)]();
    _0x348447[_0x28ae19(0xe3)](function (_0x429dba) {
        var _0x43725e = _0x28ae19;
        _0x49f168['SERVICE_TEMPLATE'] = $(_0x43725e(0x168))[_0x43725e(0x137)](), _0x49f168[_0x429dba[_0x43725e(0x161)]] = _0x429dba[_0x43725e(0x106)];
    }), service_list[_0x28ae19(0xf7)](_0x49f168);
    var _0x1da8a7 = _0x49f168['CUSTOM_SERVICENAME'];
    _0x1da8a7 === undefined && (_0x1da8a7 = '--');
    var _0x3afcd9 = '';
    _0x3afcd9 += _0x28ae19(0xa7) + serviceIdCount + '\x22>', _0x3afcd9 += _0x28ae19(0x145), _0x3afcd9 += '<div\x20class=\x22col-10\x20p-0\x22>', _0x3afcd9 += _0x28ae19(0x198) + serviceIdCount + _0x28ae19(0xd7) + $(_0x28ae19(0x168))[_0x28ae19(0x137)]() + '\x22>', _0x3afcd9 += _0x28ae19(0x17c) + _0x1da8a7 + _0x28ae19(0xa5), _0x3afcd9 += _0x28ae19(0xcd) + $('#services-dropdown')[_0x28ae19(0x137)]()[_0x28ae19(0xc6)]('_')[0x2][_0x28ae19(0x180)](_0x28ae19(0x126), '') + _0x28ae19(0xa9), _0x3afcd9 += '</a>', _0x3afcd9 += _0x28ae19(0xd1), _0x3afcd9 += _0x28ae19(0x11a), _0x3afcd9 += '<button\x20class=\x22btn\x20float-right\x22\x20type=\x22button\x22\x20onclick=\x22closeClick(this)\x22\x20data-id=\x22' + serviceIdCount + _0x28ae19(0x192), _0x3afcd9 += '</div>', _0x3afcd9 += _0x28ae19(0xd1), _0x3afcd9 += '</div>', $(_0x28ae19(0xcf))[_0x28ae19(0x170)](_0x28ae19(0x1a4), _0x28ae19(0xac)), $(_0x28ae19(0x102))[_0x28ae19(0x188)](_0x3afcd9), $(_0x28ae19(0x16f))[_0x28ae19(0x104)](), $(_0x28ae19(0xf0))[_0x28ae19(0xa2)](), $(_0x28ae19(0x168))['val'](_0x28ae19(0x117)), serviceIdCount++;
}

function editHost(_0x138237) {
    var _0x2e233f = _0xebf728;
    isEdit = !![];
    var _0x423601 = $(_0x138237)[_0x2e233f(0x186)]('data-ipaddress');
    requestDataFromServer('edithostdetails', {
        'ipaddress': _0x423601
    }, _0x2e233f(0x19c))[_0x2e233f(0x19a)](editResponse);
}

function editResponse(_0x4d7d3d) {
    var _0x462400 = _0xebf728;
    res = JSON['parse'](_0x4d7d3d);
    if (res[_0x462400(0x12a)] == 0xc8 & res['data'] != '') {
        getApplicationNames(), getVaultInformation();
        var _0x13a7ef = res[_0x462400(0x14f)];
        if (_0x13a7ef[_0x462400(0xb5)] > 0x0) {
            var _0x11c0fa;
            _0x13a7ef['forEach'](function (_0x4fd8ec) {
                var _0x388b99 = _0x462400;
                if (_0x4fd8ec[_0x388b99(0xca)] === '') {
                    _0x11c0fa = _0x4fd8ec;
                    return;
                }
            });
            var _0x1f7424 = JSON[_0x462400(0xbd)](_0x11c0fa['json']);
            $('#path-dropdown')[_0x462400(0x137)](_0x1f7424['PATH_TEMPLATE'])[_0x462400(0x12d)](), $('#nodata')['hide'](), $(_0x462400(0x100))[_0x462400(0x104)](), $('.maincontent')[_0x462400(0xaa)](), editRespone = _0x13a7ef, $(_0x462400(0x125))[_0x462400(0x186)]('disabled', _0x462400(0xd2));
            var _0xf69400 = _0x462400(0xcb) + _0x1f7424[_0x462400(0xd6)] + '\x22>';
            $(_0x462400(0x176))[_0x462400(0x188)](_0xf69400);
        }
    } else res[_0x462400(0x12a)] == 0xc8 & res[_0x462400(0x14f)] == '' ? swal('Not\x20able\x20to\x20fetch\x20data', '\x20', _0x462400(0xf6)) : swal(_0x462400(0xf1), '\x20', _0x462400(0xeb));
}

function hostCloseClick(_0x6f48af) {
    var _0x12e937 = _0xebf728;
    toBeDeletedHost = !![], deleteBtn = _0x6f48af, swal({
        'title': 'Delete\x20Host',
        'text': 'Want\x20to\x20permanently\x20delete\x20this\x20host?',
        'type': _0x12e937(0xf6),
        'showCancelButton': !![],
        'confirmButtonClass': 'btn-danger',
        'confirmButtonText': _0x12e937(0xe6),
        'closeOnConfirm': ![]
    }, function () {
        deleteEntry();
    });
}

function editService(_0x5e79a1) {
    var _0x3e2961 = _0xebf728;
    $(_0x3e2961(0x16f))['is'](_0x3e2961(0x108)) && $(_0x3e2961(0xb4))[_0x3e2961(0x14c)](_0x3e2961(0x17b)), isServiceEdit = !![], $(_0x3e2961(0x168))[_0x3e2961(0x137)]($(_0x5e79a1)[_0x3e2961(0x186)](_0x3e2961(0x124)))['change'](), setTimeout(function () {
        var _0x13637b = _0x3e2961,
            _0x1d10b6 = parseInt($(_0x5e79a1)[_0x13637b(0x186)](_0x13637b(0xf3))),
            _0x4a409b = 0x0;
        service_list[_0x13637b(0xe3)](function (_0x1fa02e) {
            var _0x19b0ec = _0x13637b;
            if (parseInt(_0x1fa02e['id']) === _0x1d10b6) {
                $[_0x19b0ec(0x13b)](_0x1fa02e, function (_0x595fa8, _0xebafa9) {
                    var _0x3d8427 = _0x19b0ec,
                        _0x492c6a = ![];
                    if (_0x595fa8['indexOf']('__') >= 0x0) {
                        var _0x320d77 = _0x595fa8[_0x3d8427(0xc6)]('__');
                        _0x320d77[0x0] == _0x3d8427(0x11d) && _0xebafa9 == 'on' && (_0x492c6a = !![], $('#' + _0x595fa8 + '_' + serviceIdCount)[_0x3d8427(0x17e)](_0x3d8427(0x190), !![]), $('.' + $('#' + _0x595fa8 + '_' + serviceIdCount)['attr']('data-to-hide'))[_0x3d8427(0xaa)]());
                    } !_0x492c6a && ($('#' + _0x595fa8 + '_' + serviceIdCount)[_0x3d8427(0x137)](_0xebafa9), $('#' + _0x595fa8 + '_' + serviceIdCount)[_0x3d8427(0xa0)]()[_0x3d8427(0x101)](_0x3d8427(0x13a))['addClass'](_0x3d8427(0x18b)), $('#' + _0x595fa8 + '_' + serviceIdCount)[_0x3d8427(0xa0)]()['addClass']('bg_input'));
                }), service_list['splice'](_0x4a409b, 0x1);
                return;
            }
            _0x4a409b++;
        }), $(_0x13637b(0x122) + _0x1d10b6)[_0x13637b(0x195)]();
    }, 0x1f4);
}

function closeClick(_0x4a8902) {
    var _0x42726a = _0xebf728;
    toBeDeletedHost = ![], deleteBtn = _0x4a8902, swal({
        'title': _0x42726a(0x1a5),
        'text': 'Want\x20to\x20permanently\x20delete\x20this\x20service?',
        'type': 'warning',
        'showCancelButton': !![],
        'confirmButtonClass': _0x42726a(0x160),
        'confirmButtonText': _0x42726a(0xe6),
        'closeOnConfirm': !![]
    }, function () {
        deleteEntry();
    });
}

function _0x2604() {
    var _0x4ad20d = ['#dialog-for-addsecret\x20#serviceList', 'gethostservicedata', '#REUSABLE_AUTOMATION__REUSABLE_VAULT_', '#hostcontent', 'find', '#registered-service-div', '</a>', 'hide', 'operation', 'value', '<label\x20class=\x22switch\x20position-relative\x22>', ':visible', '547731aFbuec', '<p\x20class=\x22bold-text\x20mb-0\x20text-color\x20\x22>layer\x20:\x20', '\x22\x20autocomplete=\x22off\x22\x20data-template=\x22', 'reload', '#serviceList', 'Not\x20able\x20to\x20add\x20secret', '\x22\x20name=\x22', 'style=display:none;', '#services-select-div', '#multi-select-ip', 'data-dismiss', 'SERVICE_TEMPLATE', 'Choose\x20Secret.', 'applicationname', 'Select\x20service', 'password', 'location', '<div\x20class=\x22col-2\x20p-0\x20mt-1\x20text-right\x22>', '#save', 'email', 'BOOL', '#addbtn', '2279082wmRIFr', 'addClass', '54HuThYy', '#reg-service-', '\x22\x20class=\x22lightgray-text\x20text-lowercase\x22>', 'data-template', '#path-dropdown', '.j2', 'data-host-name', '#GLOBAL_APPLICATION\x20option[value=', '\x22\x20data-host-name=\x22', 'status', 'success', '#dialog-for-addsecret\x20#password', 'change', 'url', 'serializeArray', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22', 'Search\x20IP', 'address', '<div\x20class=\x22col-3\x20mt-3\x22\x20style=\x22max-width:28%\x20!important\x22>', 'getElementById', '\x22\x20\x20value=\x22', 'Issue\x20in\x20getting\x20serviceses', 'val', '8090XNvdPO', 'BOOL__REUSABLE_AUTOMATION_', 'label', 'each', 'Failure\x20in\x20get\x20all\x20secrets', '</label>', 'p_swi', '#nodata-hide', 'bg_input', '<p\x20class=\x22bold-text\x20mb-0\x20text-color\x20\x22>E-Mail\x20:\x20', 'getSelects', 'Host', '#fswi', '<div\x20class=\x22row\x20eachrow\x22>', 'HOST_TEMPLATE', '.maincontent', 'ready', '/useronboard/getuserlist', '#error-application', 'Not\x20able\x20to\x20get\x20host\x20details', 'trigger', '<option\x20selected\x20disabled>Select\x20host</option>', '803631KMovNr', 'data', '\x22\x20style=\x22color:white;\x20float:right\x22></i>', 'stringify', '#REUSABLE_EMAIL_', 'getfilecontentdata', '\x22\x20onchange=\x22boolValueChanged(this)\x22\x20', 'GLOBAL', '-div', 'service-input', '\x22\x20data-to-hide=\x22', 's_hw', 'data-to-hide', '#errormessage-username', '#gswi', 'deletehost', 'first', 'multipleSelect', 'btn-danger', 'name', '#REUSABLE_AUTOMATION__REUSABLE_VAULT', '\x22\x20data-attribute=\x22', 'disable', 'json', 'checkAll', 'selected', '#services-dropdown', '../vault/getallsecrets', 'style=display:block;', '#GLOBAL_APPLICATION', '#nohost', 'COMMON_HOSTNAME', '#REUSABLE_AUTOMATION__REUSABLE_VAULT_0', '#service-selected', 'css', 'pop', 'filter', '<input\x20type=\x22checkbox\x22\x20id=\x22', 'options', '_HOSTS_', '#hostdata', '<option\x20disabled\x20selected>Select\x20Application</option>', 'POST', '<div\x20class=\x22w-50\x20my-3\x20px-md-4\x20px-2\x20pt-3\x20', 'focusout', 'click', '<h6>', 'selected\x20disabled>Select\x20service</option>', 'prop', 'g_swi', 'replace', '\x20REQUIRED?</label>', '.loader', '#totalFirewall', '<input\x20type=\x22text\x22\x20id=\x22', '#configpath', 'attr', '#hosts-dropdown', 'append', '-div\x22\x20', 'html', 'move_label', 'automation', '<option\x20selected\x20disabled>Select\x20service</option>', '4ulSful', 'Service', 'checked', '<div\x20class=\x22form-group\x20m-0\x20w-50\x20password-group\x20px-md-4\x20px-1\x20mt-3\x20', '\x22\x20style=\x22padding:0px;\x20background:transparent;\x22><i\x20class=\x22mdi\x20mdi-close\x22\x20style=\x22color:white;\x22></i></button>', 'REUSABLE', 'username', 'remove', '../hsonboard/gethsconfig', 'service', '<a\x20style=\x22cursor:\x20pointer;\x22\x20onclick=\x22editService(this)\x22\x20data-id=\x22', 'modal', 'done', 'msg', 'GET', 'IP\x20Address', 'add', '<select\x20class=\x22custom-select\x20select-input\x20px-2\x22\x20id=\x22', '#dialog-for-iframe', '#nodata', '<div\x20class=\x22form-group\x20m-0\x20w-50\x20px-md-4\x20px-1\x20mt-3\x22>', '<div\x20class=\x22col-10\x20p-0\x22>', 'display', 'Delete\x20Service', '<option\x20value=\x22\x20\x22', '<select\x20class=\x22custom-select\x20select-input\x20px-2\x20', '/HOSTS', '#dialog-for-addsecret\x20#username', 'REUSABLE_EMAIL', 'indexOf', 'BOOL__REUSABLE_AUTOMATION', 'isedit', '<span\x20class=\x22input_box\x22>', '#eswi', '10ILZgna', 'Choose\x20Email\x20Address.', 'splice', 'parent', '\x22\x20class=\x22form-control\x20input_effect\x20inputvalidation\x20', 'empty', '<div\x20class=\x22col-10\x22></div>', 'host', '</h6>', 'block', '<div\x20class=\x22col-lg-2\x20col-md-3\x20col-6\x20each-card\x20each-card-service\x20mr-2\x20primary-low\x22\x20id=\x22reg-service-', '<div\x20class=\x22row\x22>', '</span>', 'show', '<div\x20class=\x22select-service\x22>', 'none', 'href', 'GLOBAL_APPLICATION', '469994SnvXLP', 'EMAIL', '</p>', 'COMMON_IPADDRESS', '<p\x20class=\x22bold-text\x20mb-0\x20text-color\x20\x22>IP\x20:\x20', '#serviceBtn', 'length', 'service-input\x20', '#dialog-for-hsdiscover', 'toggle', '<i\x20class=\x22mdi\x20mdi-close\x20col-2\x22\x20onclick=\x22hostCloseClick(this)\x22\x20data-host-ip=\x22', '#REUSABLE_AUTOMATION__REUSABLE_VAULT\x20option[value=\x27', 'rowid', '#applicationname', 'parse', '1201200JcuFOR', '#totalServers', 'redirectToAddhostPage', '\x22\x20id=\x22', '<option\x20disabled\x20selected>Select\x20Secret</option>', 'Submit\x20services\x20before\x20saving.', '789064PQrbyu', '<a\x20class=\x22onboard\x22\x20style=\x22cursor:\x20pointer;\x20line-height:180%;\x22\x20onclick=\x22editHost(this)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#CreateHostModal\x22\x20data-ipaddress=\x22', 'split', '<p\x20class=\x22bold-text\x20mb-0\x20text-color\x20\x22>Application\x20:\x20', 'host_name', '/SERVICES', 'servicename', '<input\x20type=\x22hidden\x22\x20name=\x22PATH_TEMPLATE\x22\x20\x20value=\x22', '#totalPublic', '<span\x20class=\x22d-block\x22\x20style=\x22font-size:10px;\x22>\x20', 'data-host-ip', '#registered-service-no-data', 'trim', '</div>', 'disabled', 'Secret\x20added\x20sucessfully', 'text', 'SERVICES', 'PATH_TEMPLATE', '\x22\x20data-template=\x22', '#ip', '#REUSABLE_EMAIL', '</option>', 'getfilenames', 'layer', 'CUSTOM_SERVICENAME', 'option', 'reusable-class-', 'hide.bs.modal', '#servicedata', '#error-message-view', 'forEach', '#pswi', 'createcfg', 'Yes,\x20delete', 'Not\x20able\x20to\x20scan', '#multipleIPAddressSelect', 'value=', 'Choose\x20Application.', 'error', '</select>', 'includes', 'children', '<input\x20type=\x22hidden\x22\x20name=\x22', '#service-form-div', 'Not\x20able\x20to\x20edit\x20host', '<option\x20value=\x22', 'data-id', 'Issue\x20in\x20getting\x20filename', '#ip-dropdown', 'warning', 'push', 'input_feild', '#sswi', '\x22\x20selected>', '<input\x20type=\x22hidden\x22\x20name=\x22HOST_TEMPLATE\x22\x20\x20value=\x22', '.service-input'];
    _0x2604 = function () {
        return _0x4ad20d;
    };
    return _0x2604();
}

function handledeleteresponse(_0x422634) {
    var _0x56f443 = _0xebf728;
    res = JSON['parse'](_0x422634);
    if (res[_0x56f443(0x12a)] == 0xc8) swal(res['data'], '\x20', _0x56f443(0x12b)), location['reload']();
    else swal(res['data'], '\x20', _0x56f443(0xeb));
}

function deleteEntry() {
    var _0xb8e005 = _0xebf728;
    if (toBeDeletedHost) {
        var _0x57f042 = $(deleteBtn)[_0xb8e005(0x186)](_0xb8e005(0x127)),
            _0x1dd2be = $(deleteBtn)[_0xb8e005(0x186)](_0xb8e005(0xce));
        $(_0xb8e005(0x182))[_0xb8e005(0xaa)](), requestDataFromServer(_0xb8e005(0x15d), {
            'hostname': _0x57f042,
            'ipaddress': _0x1dd2be,
            'csrfmiddlewaretoken': csfr_token
        }, 'POST')[_0xb8e005(0x19a)](handledeleteresponse);
    } else {
        var _0x138190 = parseInt($(deleteBtn)[_0xb8e005(0x186)]('data-id')),
            _0x28f604 = 0x0;
        service_list[_0xb8e005(0xe3)](function (_0x4da55b) {
            var _0x3cae6f = _0xb8e005;
            parseInt(_0x4da55b['id']) === _0x138190 && service_list[_0x3cae6f(0x9f)](_0x28f604, 0x1), _0x28f604++;
        }), $(_0xb8e005(0x122) + _0x138190)[_0xb8e005(0x195)]();
        if (service_list[_0xb8e005(0xb5)] == 0x0) $(_0xb8e005(0xcf))[_0xb8e005(0x170)](_0xb8e005(0x1a4), _0xb8e005(0xa6));
    }
}

function sendFormDataToServer() {
    var _0x442186 = _0xebf728;
    if (checkIfFieldIsEmpty(_0x442186(0x143))) return;
    var _0x49ae29 = $(_0x442186(0x112))[_0x442186(0x15f)](_0x442186(0x142));
    if (_0x49ae29['length'] == 0x0) {
        alert('Choose\x20atleast\x20one\x20ip\x20address\x20to\x20create\x20host.');
        return;
    }
    if ($('#GLOBAL_APPLICATION')[_0x442186(0x137)]() === null) {
        alert(_0x442186(0xea));
        return;
    }
    if ($(_0x442186(0xd9))[_0x442186(0x137)]() === null) {
        alert('Choose\x20Email\x20Address.');
        return;
    }
    if (document['getElementById'](_0x442186(0x1ac))[_0x442186(0x190)]) {
        if ($(_0x442186(0x162))[_0x442186(0x137)]() === null) {
            alert(_0x442186(0x115));
            return;
        }
    }
    if ($('#service-selected')['is'](':visible')) {
        alert(_0x442186(0xc3));
        return;
    }
    $(_0x442186(0x11b))[_0x442186(0x104)](), $(_0x442186(0x182))[_0x442186(0xaa)]();
    var _0x4b4f5d = $(_0x442186(0x176))['serializeArray'](),
        _0x55348b = {};
    _0x4b4f5d[_0x442186(0xe3)](function (_0x4d16b9) {
        var _0x42f44a = _0x442186;
        _0x55348b[_0x4d16b9[_0x42f44a(0x161)]] = _0x4d16b9[_0x42f44a(0x106)];
    });
    var _0x5a544d = {};
    _0x5a544d[_0x442186(0x1ad)] = isEdit, _0x5a544d[_0x442186(0xa4)] = _0x55348b, _0x5a544d[_0x442186(0x197)] = service_list, _0x5a544d['iplist'] = _0x49ae29, requestDataFromServer(_0x442186(0xe5), {
        'data': JSON[_0x442186(0x151)](_0x5a544d),
        'csrfmiddlewaretoken': csfr_token
    }, _0x442186(0x178))[_0x442186(0x19a)](handleFileCreationResponse);
}

function handleFileCreationResponse(_0x147b66) {
    var _0x3ba12b = _0xebf728;
    res = JSON['parse'](_0x147b66), $(_0x3ba12b(0x182))['hide']();
    if (res['status'] == 0xc8) swal(res['data'], '\x20', _0x3ba12b(0x12b)), location[_0x3ba12b(0x10c)]();
    else swal(res[_0x3ba12b(0x14f)], '\x20', _0x3ba12b(0xeb));
}

function checkIfFieldIsEmpty(_0x5613ba) {
    var _0x159c5b = _0xebf728,
        _0x437d62 = ![];
    return $('.input_effect')[_0x159c5b(0x13b)](function () {
        var _0x50f6a7 = _0x159c5b,
            _0xbe9202 = $(this)['attr']('id'),
            _0x12ac4d = $(this)[_0x50f6a7(0x186)](_0x50f6a7(0x124));
        _0x12ac4d == _0x5613ba && ($('#' + _0xbe9202 + _0x50f6a7(0x156))['is'](_0x50f6a7(0x108)) && $(this)[_0x50f6a7(0x137)]()[_0x50f6a7(0xd0)]() === '' && ($(this)[_0x50f6a7(0x17a)](), _0x437d62 = !![]));
    }), _0x5613ba === _0x159c5b(0x143) && ($(_0x159c5b(0x15b))['is'](_0x159c5b(0x108)) && (_0x437d62 = !![])), _0x437d62;
}

function autoSelectHost() {
    var _0x2f3c72 = _0xebf728,
        _0x3e050a;
    editRespone['forEach'](function (_0x1726b4) {
        var _0x1c1c33 = _0x8b76;
        if (_0x1726b4[_0x1c1c33(0xca)] === '') {
            _0x3e050a = _0x1726b4;
            return;
        }
    });
    var _0x541581 = JSON[_0x2f3c72(0xbd)](_0x3e050a['json']);
    $('#hosts-dropdown')['val'](_0x541581[_0x2f3c72(0x146)])['change'](), $('#hosts-dropdown')[_0x2f3c72(0x186)](_0x2f3c72(0xd2), _0x2f3c72(0xd2)), drawSingleIpAddress(_0x3e050a['ipaddress']), $(_0x2f3c72(0x112))[_0x2f3c72(0x15f)](_0x2f3c72(0x166)), $(_0x2f3c72(0x112))[_0x2f3c72(0x15f)](_0x2f3c72(0x164));
    var _0x1dad9e = _0x2f3c72(0xfb) + _0x541581[_0x2f3c72(0x146)] + '\x22>';
    $('#hostdata')['append'](_0x1dad9e);
}

function editCallback() {
    var _0x2f97db = _0xebf728,
        _0x15ef3f;
    editRespone[_0x2f97db(0xe3)](function (_0xf9b1ee) {
        var _0x269e03 = _0x2f97db;
        if (_0xf9b1ee[_0x269e03(0xca)] === '') {
            _0x15ef3f = _0xf9b1ee;
            return;
        }
    });
    var _0xb862cc = JSON[_0x2f97db(0xbd)](_0x15ef3f[_0x2f97db(0x165)]);
    $['each'](_0xb862cc, function (_0x3b030f, _0x38a37c) {
        var _0x3a3a10 = _0x2f97db;
        if (_0x3b030f !== _0x3a3a10(0x146)) {
            var _0x3d31c6 = ![];
            if (_0x3b030f['indexOf']('__') >= 0x0) {
                var _0x331a30 = _0x3b030f[_0x3a3a10(0xc6)]('__');
                _0x331a30[0x0] == _0x3a3a10(0x11d) && _0x38a37c == 'on' && (_0x3d31c6 = !![], $('#' + _0x3b030f)['prop'](_0x3a3a10(0x190), !![]), $('.' + $('#' + _0x3b030f)['attr'](_0x3a3a10(0x15a)))[_0x3a3a10(0xaa)]());
            } !_0x3d31c6 && ($('#' + _0x3b030f)[_0x3a3a10(0x137)](_0x38a37c), $('#' + _0x3b030f)[_0x3a3a10(0xa0)]()['find']('label')['addClass'](_0x3a3a10(0x18b)), $('#' + _0x3b030f)[_0x3a3a10(0xa0)]()[_0x3a3a10(0x120)]('bg_input'));
        }
    }), fillserviceList();
}

function fillserviceList() {
    var _0x205746 = _0xebf728,
        _0xb95905 = '',
        _0x4df3b3 = 0x0;
    editRespone[_0x205746(0xe3)](function (_0x4c0e2e) {
        var _0x1e2335 = _0x205746;
        if (_0x4c0e2e['servicename'] !== '') {
            var _0x368e55 = JSON['parse'](_0x4c0e2e[_0x1e2335(0x165)]),
                _0x4bc566 = parseInt(_0x368e55['id']);
            _0x4df3b3 < _0x4bc566 && (_0x4df3b3 = _0x4bc566);
            var _0x1e031e = {};
            _0x1e031e['id'] = _0x4bc566, $[_0x1e2335(0x13b)](_0x368e55, function (_0x6abfe7, _0x4acb14) {
                _0x1e031e[_0x6abfe7] = _0x4acb14;
            });
            var _0x5b1a59 = _0x368e55[_0x1e2335(0x114)],
                _0x2433b8 = _0x368e55[_0x1e2335(0xdd)];
            _0x2433b8 === undefined && (_0x2433b8 = '--'), _0xb95905 += _0x1e2335(0xa7) + _0x4bc566 + '\x22>', _0xb95905 += '<div\x20class=\x22row\x20eachrow\x22>', _0xb95905 += _0x1e2335(0x1a3), _0xb95905 += '<a\x20style=\x22cursor:\x20pointer;\x22\x20onclick=\x22editService(this)\x22\x20data-id=\x22' + _0x4bc566 + _0x1e2335(0xd7) + _0x5b1a59 + '\x22>', _0xb95905 += _0x1e2335(0x17c) + _0x2433b8 + '</h6>', _0xb95905 += _0x1e2335(0xcd) + _0x5b1a59['split']('_')[0x2]['replace'](_0x1e2335(0x126), '') + _0x1e2335(0xa9), _0xb95905 += '</a>', _0xb95905 += _0x1e2335(0xd1), _0xb95905 += _0x1e2335(0x11a), _0xb95905 += '<button\x20class=\x22btn\x20float-right\x22\x20type=\x22button\x22\x20onclick=\x22closeClick(this)\x22\x20data-id=\x22' + _0x4bc566 + '\x22\x20style=\x22padding:0px;\x20background:transparent;\x22><i\x20class=\x22icon-close\x22></i></button>', _0xb95905 += '</div>', _0xb95905 += _0x1e2335(0xd1), _0xb95905 += '</div>', service_list[_0x1e2335(0xf7)](_0x1e031e), serviceIdCount++;
        }
    }), serviceIdCount = serviceIdCount + _0x4df3b3, $(_0x205746(0xcf))['css'](_0x205746(0x1a4), _0x205746(0xac)), $('#registered-service-div')[_0x205746(0x188)](_0xb95905), $(_0x205746(0x16f))[_0x205746(0x104)](), $(_0x205746(0xf0))['empty']();
}

function getServices() {
    var _0x229f73 = _0xebf728;
    $(_0x229f73(0x182))['show'](), requestDataFromServer('/vault/getfilenames', {
        'fileName': _0x229f73(0xd5)
    }, 'GET')[_0x229f73(0x19a)](fillServices);
}

function fillServices(_0x28744d) {
    var _0x444808 = _0xebf728;
    $(_0x444808(0x182))[_0x444808(0x104)]();
    var _0x39dc8a = '\x20';
    res = JSON[_0x444808(0xbd)](_0x28744d);
    var _0x39dc8a = _0x444808(0x1a6) + _0x444808(0x17d);
    res['status'] == 0xc8 && (global_all_services = res[_0x444808(0x14f)], global_all_services !== undefined && global_all_services[_0x444808(0xb5)] > 0x0 && global_all_services[_0x444808(0xe3)](function (_0x2d189b) {
        var _0x3ad567 = _0x444808;
        option_value = _0x2d189b, _0x39dc8a += _0x3ad567(0xf2) + option_value + '\x22>' + option_value + _0x3ad567(0xda);
    })), $(_0x444808(0x10d))[_0x444808(0x188)](_0x39dc8a);
}

function onAddSecrets() {
    var _0xddce40 = _0xebf728,
        _0x129e14 = validation(_0xddce40(0xf8));
    if (!_0x129e14) $('#error-message-view')[_0xddce40(0xaa)](), $('#error-message')[_0xddce40(0x18a)]('Please\x20fill\x20all\x20feilds');
    else {
        $(_0xddce40(0xe2))[_0xddce40(0x104)](), $(_0xddce40(0x11e))['attr'](_0xddce40(0x113), _0xddce40(0x199)), data = [], requestData = {}, ip_array = [], ipValue = $(_0xddce40(0xd8))[_0xddce40(0x137)]();
        ipValue[_0xddce40(0xed)](',') ? (ip_list = ipValue[_0xddce40(0xc6)](','), ip_array = ip_list[_0xddce40(0x172)]((_0x371a43, _0x3bfe3a) => ip_list[_0xddce40(0x1ab)](_0x371a43) === _0x3bfe3a)) : ip_array[0x0] = ipValue;
        for (var _0x446ae3 = 0x0; _0x446ae3 < ip_array[_0xddce40(0xb5)]; _0x446ae3++) {
            clientData = {}, (clientData[_0xddce40(0x194)] = $(_0xddce40(0x1a9))[_0xddce40(0x137)](), clientData[_0xddce40(0x118)] = $(_0xddce40(0x12c))['val'](), clientData[_0xddce40(0x197)] = $(_0xddce40(0xfd))[_0xddce40(0x137)](), clientData['ip'] = ip_array[_0x446ae3], clientData[_0xddce40(0x105)] = _0xddce40(0x19e)), data[_0xddce40(0xf7)](clientData);
        }
        requestData[_0xddce40(0x14f)] = data, requestDataFromServer('/vault/vaultOperation', {
            'clientData': JSON[_0xddce40(0x151)](requestData),
            'csrfmiddlewaretoken': csfr_token
        }, _0xddce40(0x178))[_0xddce40(0x19a)](addSecretResponse);
    }
}

function addSecretResponse(_0x5b9273) {
    var _0x489d2b = _0xebf728;
    if (_0x5b9273[_0x489d2b(0xb5)] > 0x0) _0x5b9273[_0x489d2b(0xe3)](function (_0x19979b) {
        var _0x63cc6e = _0x489d2b;
        if (_0x19979b && _0x19979b[_0x63cc6e(0x12a)] == 0xcc) {
            swal(_0x63cc6e(0xd3), '\x20', _0x63cc6e(0x12b));
            var _0xd82f49 = _0x19979b[_0x63cc6e(0x12e)][_0x63cc6e(0xc6)]('/'),
                _0x2e5b9a = {};
            _0x2e5b9a['id'] = _0x19979b[_0x63cc6e(0xbb)], _0x2e5b9a[_0x63cc6e(0x194)] = _0xd82f49[0x4], _0x2e5b9a[_0x63cc6e(0x197)] = _0xd82f49[0x2], _0x2e5b9a['ip'] = _0xd82f49[0x3], _0x2e5b9a[_0x63cc6e(0x12e)] = _0x19979b[_0x63cc6e(0x12e)], vaults['push'](_0x2e5b9a);
            if ($('#REUSABLE_AUTOMATION__REUSABLE_VAULT')['is'](_0x63cc6e(0x108))) {
                var _0x1f8e79 = $('#REUSABLE_AUTOMATION__REUSABLE_VAULT')[_0x63cc6e(0x137)](),
                    _0x10088b = '\x20';
                _0x10088b += _0x63cc6e(0xf2) + _0x19979b['url'] + '\x22>' + _0x19979b[_0x63cc6e(0x12e)] + '</option>', $(_0x63cc6e(0x162))[_0x63cc6e(0x188)](_0x10088b);
                if (_0x1f8e79 !== null && _0x1f8e79 !== '') $(_0x63cc6e(0x162))[_0x63cc6e(0x137)](_0x1f8e79);
                else $(_0x63cc6e(0x162))[_0x63cc6e(0x137)](_0x19979b[_0x63cc6e(0x12e)]);
            }
        } else return swal('Not\x20able\x20to\x20add\x20secret', '\x20', _0x63cc6e(0xeb)), ![];
    });
    else return swal(_0x489d2b(0x10e), '\x20', _0x489d2b(0xeb)), ![];
}

function validation(_0x5a1837) {
    var _0x58d263 = _0xebf728,
        _0x4ec093 = !![];
    return $('.' + _0x5a1837)[_0x58d263(0x13b)](function (_0x24c9ba) {
        var _0x3158e6 = _0x58d263;
        ($(this)[_0x3158e6(0x137)]() == '' || $(this)[_0x3158e6(0x137)]() == null) && (_0x4ec093 = ![]);
    }), _0x4ec093;
}

function _0x8b76(_0x3aa95e, _0x2a2170) {
    var _0x2604ff = _0x2604();
    return _0x8b76 = function (_0x8b76ba, _0x3422a3) {
        _0x8b76ba = _0x8b76ba - 0x9f;
        var _0x363edb = _0x2604ff[_0x8b76ba];
        return _0x363edb;
    }, _0x8b76(_0x3aa95e, _0x2a2170);
}

function addSecret() {
    var _0x257667 = _0xebf728;
    document[_0x257667(0x134)]('ip')['value'] = '', document['getElementById'](_0x257667(0x194))[_0x257667(0x106)] = '', $(_0x257667(0x10d))['val']('\x20');
}

function emailListResponse() {
    var _0x1c698a = _0xebf728;
    requestDataFromServer(_0x1c698a(0x149), {}, _0x1c698a(0x19c))['done'](function (_0x3d83f1) {
        var _0x2fdbfe = _0x1c698a,
            _0x22c438 = JSON[_0x2fdbfe(0xbd)](_0x3d83f1);
        if (_0x22c438[_0x2fdbfe(0x12a)] == 0xc8) _0x22c438[_0x2fdbfe(0x14f)][_0x2fdbfe(0xe3)](function (_0x4858a4) {
            var _0x4ab4b8 = _0x2fdbfe;
            _0x4858a4[_0x4ab4b8(0x11c)] !== 'admin' && emailLists[_0x4ab4b8(0xf7)](_0x4858a4[_0x4ab4b8(0x11c)]);
        });
        else { }
    });
}