var _0x2d0daa = _0x20d9;
(function (_0x5de605, _0x44cc9c) {
    var _0xf8d952 = _0x20d9,
        _0x35086d = _0x5de605();
    while (!![]) {
        try {
            var _0x47f3e4 = parseInt(_0xf8d952(0x2a3)) / 0x1 + parseInt(_0xf8d952(0x1bf)) / 0x2 * (parseInt(_0xf8d952(0x19a)) / 0x3) + parseInt(_0xf8d952(0x1fd)) / 0x4 * (parseInt(_0xf8d952(0x223)) / 0x5) + parseInt(_0xf8d952(0x19d)) / 0x6 * (-parseInt(_0xf8d952(0x286)) / 0x7) + -parseInt(_0xf8d952(0x1df)) / 0x8 + parseInt(_0xf8d952(0x19c)) / 0x9 + -parseInt(_0xf8d952(0x254)) / 0xa * (parseInt(_0xf8d952(0x1d8)) / 0xb);
            if (_0x47f3e4 === _0x44cc9c) break;
            else _0x35086d['push'](_0x35086d['shift']());
        } catch (_0x4e1ccb) {
            _0x35086d['push'](_0x35086d['shift']());
        }
    }
}(_0x2af4, 0xa823e));
var totalTickets = 0x0,
    device = '',
    servicetype = '',
    servertypes = '',
    servertypesrow = '',
    serveros = '',
    serverosrow = '',
    serversoftware = '',
    servernic = '',
    serversoftwarerow = '',
    switcheslayers = '',
    switcheslayersrow = '',
    switchesmodel = '',
    switchesmodelrow = '',
    firewallstypes = '',
    firewallstypesrow = '',
    firewallsmodel = '',
    firewallsmodelrow = '',
    editdata = '',
    deldata = '',
    rowid = '',
    selectedFileType = '',
    hostPath = _0x2d0daa(0x21c),
    nametype = '',
    snmp_xml_2c = '',
    snmp_xml_3c = '';
$(document)['ready'](function () {
    var _0x1b5c05 = _0x2d0daa;
    $(_0x1b5c05(0x265))[_0x1b5c05(0x25c)](function (_0x1879cf) {
        var _0xcca630 = _0x1b5c05;
        $(this)[_0xcca630(0x292)]() == '' || $(this)[_0xcca630(0x292)]() == null ? ($(this)[_0xcca630(0x2b4)]()[_0xcca630(0x229)]('label')[_0xcca630(0x1f5)](_0xcca630(0x248), '#ff9eac'), $(this)[_0xcca630(0x2b4)]()[_0xcca630(0x229)](_0xcca630(0x1f6))[_0xcca630(0x241)](_0xcca630(0x1db))) : $(this)[_0xcca630(0x2b4)]()[_0xcca630(0x229)]('.error-msg')[_0xcca630(0x241)]('');
    }), getSnmpXML(), getsnmpdata();
});

function getSnmpXML() {
    var _0x40471a = _0x2d0daa;
    requestDataFromServer(_0x40471a(0x263), {
        'filename': _0x40471a(0x26f)
    }, 'GET')[_0x40471a(0x205)](function (_0x2120af) {
        snmp_xml_2c = _0x2120af;
    }), requestDataFromServer(_0x40471a(0x263), {
        'filename': _0x40471a(0x1f1)
    }, _0x40471a(0x25f))['done'](function (_0x43c3b4) {
        snmp_xml_3c = _0x43c3b4;
    });
}
let sendSnmp2DataToServer = () => {
    var _0x2c266e = _0x2d0daa,
        _0x1e30e4 = validateInputs('snmp_input');
    if (_0x1e30e4 == !![]) {
        sendSnmpDataToServers();
        const _0x548ac4 = document[_0x2c266e(0x1ff)](_0x2c266e(0x2b3)),
            _0x450adf = document[_0x2c266e(0x1ff)](_0x2c266e(0x1dc)),
            _0x1afee4 = document['getElementById'](_0x2c266e(0x215)),
            _0x551fdb = document[_0x2c266e(0x1ff)](_0x2c266e(0x1a6));
        var _0x20ac0b = snmp_xml_2c;
        _0x20ac0b = _0x20ac0b['replaceAll'](_0x2c266e(0x2a6), _0x450adf['value']), _0x20ac0b = _0x20ac0b[_0x2c266e(0x1b9)](_0x2c266e(0x26e), _0x1afee4[_0x2c266e(0x271)]), _0x20ac0b = _0x20ac0b[_0x2c266e(0x1b9)](_0x2c266e(0x2ad), _0x551fdb[_0x2c266e(0x271)]), _0x20ac0b = _0x20ac0b[_0x2c266e(0x1b9)](_0x2c266e(0x220), _0x548ac4[_0x2c266e(0x271)]);
    }
},
    sendSnmp3DataToServer = () => {
        var _0x4604e9 = _0x2d0daa,
            _0x3a3351 = validateingInput(_0x4604e9(0x294));
        if (_0x3a3351 == !![]) {
            sendSnmpDataToServers();
            const _0x4062a9 = document[_0x4604e9(0x1ff)]('snmp_version'),
                _0x30e621 = document[_0x4604e9(0x1ff)](_0x4604e9(0x1dc)),
                _0x256652 = document[_0x4604e9(0x1ff)](_0x4604e9(0x215)),
                _0x3137f1 = document[_0x4604e9(0x1ff)](_0x4604e9(0x261)),
                _0xfe98 = document[_0x4604e9(0x1ff)]('Authentication_mtd'),
                _0x2a53d9 = document[_0x4604e9(0x1ff)](_0x4604e9(0x1d9)),
                _0x57270d = document[_0x4604e9(0x1ff)](_0x4604e9(0x1d5)),
                _0x36ad7c = document[_0x4604e9(0x1ff)]('privacy_password'),
                _0x494fac = document[_0x4604e9(0x1ff)](_0x4604e9(0x1da));
            var _0x3e7042 = snmp_xml_3c;
            _0x3e7042 = _0x3e7042[_0x4604e9(0x1b9)](_0x4604e9(0x2a6), _0x30e621['value']), _0x3e7042 = _0x3e7042[_0x4604e9(0x1b9)](_0x4604e9(0x26e), _0x256652[_0x4604e9(0x271)]), _0x3e7042 = _0x3e7042[_0x4604e9(0x1b9)](_0x4604e9(0x220), _0x4062a9[_0x4604e9(0x271)]), _0x3e7042 = _0x3e7042[_0x4604e9(0x1b9)](_0x4604e9(0x1cb), _0x3137f1[_0x4604e9(0x271)]), _0x3e7042 = _0x3e7042[_0x4604e9(0x1b9)](_0x4604e9(0x282), _0x494fac[_0x4604e9(0x271)]), _0x3e7042 = _0x3e7042[_0x4604e9(0x1b9)](_0x4604e9(0x2af), _0xfe98[_0x4604e9(0x271)]), _0x3e7042 = _0x3e7042[_0x4604e9(0x1b9)](_0x4604e9(0x198), _0x57270d[_0x4604e9(0x271)]), _0x3e7042 = _0x3e7042[_0x4604e9(0x1b9)]('__PRIVMTD__', _0x2a53d9['value']), _0x3e7042 = _0x3e7042['replaceAll'](_0x4604e9(0x25d), _0x36ad7c[_0x4604e9(0x271)]);
        }
    };
var new_snmpip = '';

function newonbipadd(_0x4eb186) {
    new_snmpip = _0x4eb186;
}
var snmplabelNames = ['uptime_w', _0x2d0daa(0x273), _0x2d0daa(0x19b), _0x2d0daa(0x27f), _0x2d0daa(0x24d), _0x2d0daa(0x2b0), _0x2d0daa(0x235), 'mem_c', 'mem_t', _0x2d0daa(0x1f0), _0x2d0daa(0x234), _0x2d0daa(0x1ee)],
    snmpdefaultValues = [0x5a, 0x78, 0x11940, 0x46, 0x50, 0xa, 0x46, 0x50, 0xa, 0x46, 0x50, 0xa];

function generateThresholdHTML() {
    var _0x1cf9a9 = _0x2d0daa,
        _0x3cf9d3 = '';
    _0x3cf9d3 += _0x1cf9a9(0x1e4), _0x3cf9d3 += _0x1cf9a9(0x2b2), _0x3cf9d3 += _0x1cf9a9(0x27d), _0x3cf9d3 += '<label\x20for=\x22threshold\x22>\x20Threshold</label>', _0x3cf9d3 += '</div>', _0x3cf9d3 += _0x1cf9a9(0x219), _0x3cf9d3 += _0x1cf9a9(0x264), _0x3cf9d3 += _0x1cf9a9(0x207), _0x3cf9d3 += _0x1cf9a9(0x210), _0x3cf9d3 += _0x1cf9a9(0x22f), _0x3cf9d3 += _0x1cf9a9(0x25b), _0x3cf9d3 += _0x1cf9a9(0x1a4), _0x3cf9d3 += _0x1cf9a9(0x1fb), _0x3cf9d3 += '<th>Units</th>', _0x3cf9d3 += _0x1cf9a9(0x23e), _0x3cf9d3 += _0x1cf9a9(0x25b), _0x3cf9d3 += '<td>w</td>', _0x3cf9d3 += _0x1cf9a9(0x1af), _0x3cf9d3 += _0x1cf9a9(0x1cd), _0x3cf9d3 += _0x1cf9a9(0x23e), _0x3cf9d3 += _0x1cf9a9(0x25b), _0x3cf9d3 += '<td>c</td>', _0x3cf9d3 += _0x1cf9a9(0x1e0), _0x3cf9d3 += _0x1cf9a9(0x1cd), _0x3cf9d3 += _0x1cf9a9(0x23e), _0x3cf9d3 += '<tr\x20class=\x22small-row\x22>', _0x3cf9d3 += _0x1cf9a9(0x25a), _0x3cf9d3 += '<td>Time</td>', _0x3cf9d3 += _0x1cf9a9(0x281), _0x3cf9d3 += _0x1cf9a9(0x23e), _0x3cf9d3 += _0x1cf9a9(0x29b), _0x3cf9d3 += _0x1cf9a9(0x207), _0x3cf9d3 += _0x1cf9a9(0x207), _0x3cf9d3 += _0x1cf9a9(0x22d);
    for (var _0x323bc5 = 0x0; _0x323bc5 < snmplabelNames['length']; _0x323bc5++) {
        _0x3cf9d3 += _0x1cf9a9(0x1e4), _0x3cf9d3 += _0x1cf9a9(0x1c5), _0x3cf9d3 += '<div\x20class=\x22col-4\x22>', _0x3cf9d3 += '<label\x20for=\x22' + snmplabelNames[_0x323bc5] + '\x22>' + snmplabelNames[_0x323bc5] + _0x1cf9a9(0x291), _0x3cf9d3 += '</div>', _0x3cf9d3 += _0x1cf9a9(0x224), _0x3cf9d3 += _0x1cf9a9(0x1ab) + snmplabelNames[_0x323bc5] + _0x1cf9a9(0x287) + snmpdefaultValues[_0x323bc5] + '\x22>', _0x3cf9d3 += _0x1cf9a9(0x207), _0x3cf9d3 += _0x1cf9a9(0x19f), _0x3cf9d3 += _0x1cf9a9(0x207);
    }
    return _0x3cf9d3 += _0x1cf9a9(0x207), _0x3cf9d3;
}

function snmpv2c(_0x304f3f) {
    var _0x49ef07 = _0x2d0daa;
    $(_0x49ef07(0x1ae))['empty']();
    var _0x262e08 = '';
    _0x304f3f == _0x49ef07(0x2b6) ? (_0x262e08 += _0x49ef07(0x1ec), _0x262e08 += _0x49ef07(0x2a0), _0x262e08 += '<input\x20type=\x22text\x22\x20class=\x22form-control\x20snmp_input\x20full-input\x22\x20placeholder=\x22Enter\x20IPAddress\x22\x20value=\x22' + new_snmpip + _0x49ef07(0x266), _0x262e08 += _0x49ef07(0x232), _0x262e08 += _0x49ef07(0x207), _0x262e08 += '<div\x20class=\x22col-12\x20my-4\x20password-group\x22>', _0x262e08 += _0x49ef07(0x1bd), _0x262e08 += _0x49ef07(0x1b5), _0x262e08 += '<span\x20class=\x22error-msg\x22\x20id=\x22\x22></span>', _0x262e08 += _0x49ef07(0x297), _0x262e08 += _0x49ef07(0x207), _0x262e08 += '<div\x20class=\x22col-12\x20mt-3\x22>', _0x262e08 += _0x49ef07(0x246), _0x262e08 += '<div\x20class=\x22dropdown\x20select-btn-dropdown\x20full-select-dropdown\x22>', _0x262e08 += _0x49ef07(0x2a2), _0x262e08 += '</select>', _0x262e08 += '<span\x20class=\x22error-msg\x22\x20id=\x22snmpmod-error-msg\x22>\x20</span>', _0x262e08 += _0x49ef07(0x207), _0x262e08 += _0x49ef07(0x207), _0x262e08 += generateThresholdHTML(), _0x262e08 += '<br>', _0x262e08 += '<div\x20class=\x22modal-footer\x20mx-auto\x20col-md-11\x20col-12\x22>', _0x262e08 += _0x49ef07(0x1d2), _0x262e08 += _0x49ef07(0x2b8), _0x262e08 += _0x49ef07(0x207), _0x262e08 += _0x49ef07(0x1d2), _0x262e08 += _0x49ef07(0x278), _0x262e08 += _0x49ef07(0x207), _0x262e08 += _0x49ef07(0x1ea), _0x262e08 += _0x49ef07(0x207)) : (_0x262e08 += _0x49ef07(0x1ec), _0x262e08 += _0x49ef07(0x2a0), _0x262e08 += _0x49ef07(0x199) + new_snmpip + _0x49ef07(0x266), _0x262e08 += _0x49ef07(0x232), _0x262e08 += _0x49ef07(0x207), _0x262e08 += '<div\x20class=\x22col-12\x20my-2\x22>', _0x262e08 += _0x49ef07(0x1de), _0x262e08 += _0x49ef07(0x26b), _0x262e08 += _0x49ef07(0x232), _0x262e08 += _0x49ef07(0x207), _0x262e08 += _0x49ef07(0x1be), _0x262e08 += _0x49ef07(0x21d), _0x262e08 += _0x49ef07(0x1a9), _0x262e08 += _0x49ef07(0x2b7), _0x262e08 += _0x49ef07(0x21f), _0x262e08 += _0x49ef07(0x1c7), _0x262e08 += '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20\x20value=\x22AuthNoPriv\x22>AuthNoPriv</option>', _0x262e08 += _0x49ef07(0x279), _0x262e08 += _0x49ef07(0x274), _0x262e08 += '<span\x20class=\x22error-msg\x22\x20id=\x22securitylevel-error-msg\x22>\x20</span>', _0x262e08 += '</div>', _0x262e08 += _0x49ef07(0x207), _0x262e08 += _0x49ef07(0x1be), _0x262e08 += '<label\x20for=\x22snmp_models\x22\x20id=\x22snmpmod-label\x22>Model</label>', _0x262e08 += _0x49ef07(0x1a9), _0x262e08 += _0x49ef07(0x2a2), _0x262e08 += _0x49ef07(0x274), _0x262e08 += _0x49ef07(0x212), _0x262e08 += '</div>', _0x262e08 += '</div>', _0x262e08 += _0x49ef07(0x1be), _0x262e08 += _0x49ef07(0x22a), _0x262e08 += _0x49ef07(0x1a9), _0x262e08 += _0x49ef07(0x21b), _0x262e08 += _0x49ef07(0x2a4), _0x262e08 += _0x49ef07(0x1dd), _0x262e08 += '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22MD5\x22>MD5</option>', _0x262e08 += _0x49ef07(0x298), _0x262e08 += _0x49ef07(0x274), _0x262e08 += _0x49ef07(0x258), _0x262e08 += '</div>', _0x262e08 += _0x49ef07(0x207), _0x262e08 += _0x49ef07(0x1c9), _0x262e08 += _0x49ef07(0x20d), _0x262e08 += _0x49ef07(0x20b), _0x262e08 += _0x49ef07(0x1c8), _0x262e08 += _0x49ef07(0x23f), _0x262e08 += _0x49ef07(0x207), _0x262e08 += _0x49ef07(0x1be), _0x262e08 += _0x49ef07(0x24c), _0x262e08 += _0x49ef07(0x1a9), _0x262e08 += _0x49ef07(0x2a7), _0x262e08 += _0x49ef07(0x283), _0x262e08 += _0x49ef07(0x243), _0x262e08 += _0x49ef07(0x28f), _0x262e08 += '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22AES192\x22>AES192</option>', _0x262e08 += _0x49ef07(0x1b1), _0x262e08 += _0x49ef07(0x2bc), _0x262e08 += '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x223DES\x22>3DES</option>', _0x262e08 += _0x49ef07(0x226), _0x262e08 += '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22DES\x22>DES</option>', _0x262e08 += '</select>', _0x262e08 += '<span\x20class=\x22error-msg\x22\x20id=\x22privmtd-error-msg\x22>\x20</span>', _0x262e08 += _0x49ef07(0x207), _0x262e08 += _0x49ef07(0x207), _0x262e08 += _0x49ef07(0x1c9), _0x262e08 += '<label\x20for=\x22CommunityString\x22>\x20Privacy\x20Password</label><br>', _0x262e08 += _0x49ef07(0x21e), _0x262e08 += _0x49ef07(0x1c8), _0x262e08 += _0x49ef07(0x1fa), _0x262e08 += _0x49ef07(0x207), _0x262e08 += generateThresholdHTML(), _0x262e08 += '<br>', _0x262e08 += '<div\x20class=\x22modal-footer\x20mx-auto\x20col-md-11\x20col-12\x22>', _0x262e08 += _0x49ef07(0x1d2), _0x262e08 += _0x49ef07(0x2b8), _0x262e08 += _0x49ef07(0x207), _0x262e08 += '<div\x20class=\x22col-5\x20px-1\x22>', _0x262e08 += _0x49ef07(0x1d6), _0x262e08 += '</div>', _0x262e08 += _0x49ef07(0x1e5), _0x262e08 += _0x49ef07(0x207)), $(_0x49ef07(0x1ae))['append'](_0x262e08), snmpmodel();
}

function resetsnmpValues() {
    var _0x10f2aa = _0x2d0daa,
        _0x3b3302 = document[_0x10f2aa(0x1ff)](_0x10f2aa(0x275)),
        _0x550ee4 = document[_0x10f2aa(0x1ff)]('threshold-snmp'),
        _0x3d94b8 = _0x550ee4[_0x10f2aa(0x2ba)](_0x10f2aa(0x267));
    if (_0x3b3302[_0x10f2aa(0x2bb)])
        for (var _0x46ec2c = 0x0; _0x46ec2c < _0x3d94b8[_0x10f2aa(0x1bb)]; _0x46ec2c++) {
            _0x3d94b8[_0x46ec2c][_0x10f2aa(0x271)] = snmpdefaultValues[_0x46ec2c];
        } else
        for (var _0x46ec2c = 0x0; _0x46ec2c < _0x3d94b8[_0x10f2aa(0x1bb)]; _0x46ec2c++) {
            _0x3d94b8[_0x46ec2c][_0x10f2aa(0x271)] = '';
        }
}

function toggleTextsnmp(_0x299803) {
    var _0x4223c7 = _0x2d0daa,
        _0x294958 = document['getElementById'](_0x4223c7(0x231)),
        _0x38ca21 = document[_0x4223c7(0x1ff)](_0x4223c7(0x1c6)),
        _0x1b8337 = document[_0x4223c7(0x1ff)]('threshold-snmpicon');
    _0x299803[_0x4223c7(0x2bb)] ? (_0x294958[_0x4223c7(0x1a5)]['display'] = 'block', _0x38ca21[_0x4223c7(0x1a5)][_0x4223c7(0x24b)] = _0x4223c7(0x1e9), _0x1b8337[_0x4223c7(0x1a5)]['display'] = _0x4223c7(0x216)) : (_0x294958['style'][_0x4223c7(0x24b)] = 'none', _0x38ca21[_0x4223c7(0x1a5)][_0x4223c7(0x24b)] = 'none', _0x1b8337[_0x4223c7(0x1a5)]['display'] = _0x4223c7(0x238));
}

function securitylevel() {
    var _0x5b2f54 = _0x2d0daa,
        _0x1c561e = $(_0x5b2f54(0x247))[_0x5b2f54(0x292)]();
    if (_0x1c561e === _0x5b2f54(0x285)) noAuthNoPriv();
    else {
        if (_0x1c561e === 'AuthNoPriv') AuthNoPriv();
        else _0x1c561e === _0x5b2f54(0x1bc) && authPriv();
    }
}

function noAuthNoPriv() {
    var _0x4ad6f5 = _0x2d0daa;
    $(_0x4ad6f5(0x245))[_0x4ad6f5(0x292)]('None'), $(_0x4ad6f5(0x214))[_0x4ad6f5(0x292)](_0x4ad6f5(0x19e)), $(_0x4ad6f5(0x201))[_0x4ad6f5(0x292)](_0x4ad6f5(0x25e)), $(_0x4ad6f5(0x233))['val']('NOVALUE'), $('#Authentication_mtd')['prop'](_0x4ad6f5(0x1c4), !![]), $('#auth_password')['prop'](_0x4ad6f5(0x1c4), !![]), $(_0x4ad6f5(0x214))[_0x4ad6f5(0x2b5)](_0x4ad6f5(0x1c4), !![]), $(_0x4ad6f5(0x233))['prop']('disabled', !![]);
}

function _0x20d9(_0x528a8f, _0x13f47a) {
    var _0x2af40e = _0x2af4();
    return _0x20d9 = function (_0x20d96c, _0x5db41a) {
        _0x20d96c = _0x20d96c - 0x198;
        var _0xf026d1 = _0x2af40e[_0x20d96c];
        return _0xf026d1;
    }, _0x20d9(_0x528a8f, _0x13f47a);
}

function AuthNoPriv() {
    var _0x128051 = _0x2d0daa;
    $(_0x128051(0x214))[_0x128051(0x292)]('None'), $(_0x128051(0x233))[_0x128051(0x292)](_0x128051(0x25e)), $(_0x128051(0x245))[_0x128051(0x2b5)]('disabled', ![]), $('#auth_password')[_0x128051(0x2b5)]('disabled', ![]), $(_0x128051(0x214))[_0x128051(0x2b5)](_0x128051(0x1c4), !![]), $('#privacy_password')[_0x128051(0x2b5)](_0x128051(0x1c4), !![]);
}

function authPriv() {
    var _0x200e81 = _0x2d0daa;
    $('#Authentication_mtd')[_0x200e81(0x2b5)](_0x200e81(0x1c4), ![]), $(_0x200e81(0x201))[_0x200e81(0x2b5)]('disabled', ![]), $(_0x200e81(0x214))['prop']('disabled', ![]), $(_0x200e81(0x233))[_0x200e81(0x2b5)]('disabled', ![]);
}

function verifiedv2ctoserver() {
    var _0x44faa3 = _0x2d0daa,
        _0x4c5e90 = $('#snmp-select-ip')[_0x44faa3(0x292)](),
        _0x209097 = $(_0x44faa3(0x277))[_0x44faa3(0x213)](),
        _0xa5a799 = {};
    _0x209097['forEach'](function (_0x1c7936) {
        var _0x59d946 = _0x44faa3;
        _0xa5a799[_0x1c7936[_0x59d946(0x1f9)]] = _0x1c7936[_0x59d946(0x271)];
    });
    var _0x1bcaa7 = {};
    _0x1bcaa7[_0x44faa3(0x26c)] = isEdit, _0x1bcaa7[_0x44faa3(0x1e1)] = _0x4c5e90, _0x1bcaa7[_0x44faa3(0x29d)] = $(_0x44faa3(0x1ad))[_0x44faa3(0x292)](), _0x1bcaa7['models'] = $(_0x44faa3(0x28d))['val'](), _0x1bcaa7['securitylevel'] = $(_0x44faa3(0x29f))[_0x44faa3(0x292)](), _0x1bcaa7['Authentication'] = $(_0x44faa3(0x253))['val'](), _0x1bcaa7[_0x44faa3(0x1a0)] = $(_0x44faa3(0x21a))[_0x44faa3(0x292)](), _0x1bcaa7[_0x44faa3(0x1d5)] = $(_0x44faa3(0x259))[_0x44faa3(0x292)](), _0x1bcaa7['privacy_password'] = $('#CreateSnmp\x20#privacy_password')[_0x44faa3(0x292)](), _0x1bcaa7['comm_string'] = $('#CreateSnmp\x20#comm_string')[_0x44faa3(0x292)](), _0x1bcaa7[_0x44faa3(0x1da)] = $(_0x44faa3(0x1eb))[_0x44faa3(0x292)](), requestDataFromServer('/dashboard/snmpvalidation', {
        'data': JSON[_0x44faa3(0x200)](_0x1bcaa7),
        'csrfmiddlewaretoken': csfr_token
    }, _0x44faa3(0x284))[_0x44faa3(0x205)](snmpvalid2CreationResponse);
}

function verifiedv3toserver() {
    var _0x2d9acf = _0x2d0daa,
        _0x4ce281 = $(_0x2d9acf(0x1b8))[_0x2d9acf(0x292)](),
        _0x2ee11c = $('#snmpformdata')['serializeArray'](),
        _0x1d65d0 = {};
    _0x2ee11c[_0x2d9acf(0x1a8)](function (_0x5d8fe7) {
        var _0x2874d1 = _0x2d9acf;
        _0x1d65d0[_0x5d8fe7[_0x2874d1(0x1f9)]] = _0x5d8fe7['value'];
    });
    var _0x5480a0 = {};
    _0x5480a0[_0x2d9acf(0x26c)] = isEdit, _0x5480a0[_0x2d9acf(0x1e1)] = _0x4ce281, _0x5480a0[_0x2d9acf(0x29d)] = $(_0x2d9acf(0x1ad))[_0x2d9acf(0x292)](), _0x5480a0[_0x2d9acf(0x2b9)] = $(_0x2d9acf(0x28d))[_0x2d9acf(0x292)](), _0x5480a0[_0x2d9acf(0x1c3)] = $('#CreateSnmp\x20#security_level')[_0x2d9acf(0x292)](), _0x5480a0[_0x2d9acf(0x1e3)] = $(_0x2d9acf(0x253))[_0x2d9acf(0x292)](), _0x5480a0[_0x2d9acf(0x1a0)] = $(_0x2d9acf(0x21a))[_0x2d9acf(0x292)](), _0x5480a0[_0x2d9acf(0x1d5)] = $(_0x2d9acf(0x259))['val'](), _0x5480a0[_0x2d9acf(0x23a)] = $(_0x2d9acf(0x1a3))[_0x2d9acf(0x292)](), _0x5480a0['comm_string'] = $('#CreateSnmp\x20#comm_string')[_0x2d9acf(0x292)](), _0x5480a0[_0x2d9acf(0x1da)] = $('#CreateSnmp\x20#user_name')[_0x2d9acf(0x292)](), requestDataFromServer(_0x2d9acf(0x1e2), {
        'data': JSON['stringify'](_0x5480a0),
        'csrfmiddlewaretoken': csfr_token
    }, _0x2d9acf(0x284))[_0x2d9acf(0x205)](snmpvalid3CreationResponse);
}

function snmpvalid2CreationResponse(_0x5d93ac) {
    var _0x28425f = _0x2d0daa;
    res = JSON[_0x28425f(0x1b3)](_0x5d93ac), $(_0x28425f(0x228))[_0x28425f(0x262)](), $(_0x28425f(0x1f7))[_0x28425f(0x2ac)]();
    if (res[_0x28425f(0x222)] == !![]) {
        const _0x4be2a6 = document[_0x28425f(0x1ff)](_0x28425f(0x1fc));
        _0x4be2a6[_0x28425f(0x227)]('onclick', _0x28425f(0x27b)), _0x4be2a6[_0x28425f(0x218)] = _0x28425f(0x22e);
        var _0x15c648 = _0x28425f(0x2a9);
        $(_0x28425f(0x228))[_0x28425f(0x211)](_0x15c648), $(_0x28425f(0x26d))[_0x28425f(0x2b5)](_0x28425f(0x1c4), !![]), $(_0x28425f(0x2ae))['prop'](_0x28425f(0x1c4), !![]), $(_0x28425f(0x276))[_0x28425f(0x2b5)](_0x28425f(0x1c4), !![]);
    } else {
        var _0x15c648 = _0x28425f(0x1ed);
        $(_0x28425f(0x228))[_0x28425f(0x211)](_0x15c648), setTimeout(function () {
            $('#valid_row')['empty']();
        }, 0xbb8);
    }
}

function snmpvalid3CreationResponse(_0x2809b4) {
    var _0x14e40e = _0x2d0daa;
    res = JSON[_0x14e40e(0x1b3)](_0x2809b4), $(_0x14e40e(0x256))[_0x14e40e(0x262)](), $(_0x14e40e(0x1f7))[_0x14e40e(0x2ac)]();
    if (res[_0x14e40e(0x222)] == !![]) {
        const _0x41661c = document[_0x14e40e(0x1ff)](_0x14e40e(0x28c));
        _0x41661c[_0x14e40e(0x227)](_0x14e40e(0x236), 'sendSnmp3DataToServer()'), _0x41661c[_0x14e40e(0x218)] = _0x14e40e(0x22e);
        var _0x16d1ac = _0x14e40e(0x2a9);
        $(_0x14e40e(0x256))[_0x14e40e(0x211)](_0x16d1ac), $(_0x14e40e(0x26d))[_0x14e40e(0x2b5)](_0x14e40e(0x1c4), !![]), $(_0x14e40e(0x1a7))[_0x14e40e(0x2b5)]('disabled', !![]), $(_0x14e40e(0x247))[_0x14e40e(0x2b5)]('disabled', !![]), $(_0x14e40e(0x2ae))['prop'](_0x14e40e(0x1c4), !![]), $('#Authentication_mtd')['prop'](_0x14e40e(0x1c4), !![]), $(_0x14e40e(0x201))[_0x14e40e(0x2b5)](_0x14e40e(0x1c4), !![]), $(_0x14e40e(0x214))[_0x14e40e(0x2b5)](_0x14e40e(0x1c4), !![]), $(_0x14e40e(0x233))[_0x14e40e(0x2b5)]('disabled', !![]);
    } else {
        $(_0x14e40e(0x23d))[_0x14e40e(0x2b5)](_0x14e40e(0x1c4), !![]);
        var _0x16d1ac = _0x14e40e(0x1ed);
        $(_0x14e40e(0x256))[_0x14e40e(0x211)](_0x16d1ac), setTimeout(function () {
            var _0x1b7bb0 = _0x14e40e;
            $('#valids_row')[_0x1b7bb0(0x262)]();
        }, 0xbb8);
    }
}

function mypasscommFunction() {
    var _0x327500 = _0x2d0daa,
        _0x3d2f82 = document['getElementById'](_0x327500(0x1a6));
    _0x3d2f82[_0x327500(0x20f)] === _0x327500(0x1c2) ? ($(_0x327500(0x296))[_0x327500(0x1d7)](_0x327500(0x28a)), _0x3d2f82[_0x327500(0x20f)] = 'text') : ($(_0x327500(0x296))[_0x327500(0x1d7)](_0x327500(0x28a)), _0x3d2f82['type'] = 'password');
}

function mypassFunction() {
    var _0x28b332 = _0x2d0daa,
        _0x1ef49d = document[_0x28b332(0x1ff)](_0x28b332(0x1d5));
    _0x1ef49d['type'] === 'password' ? ($('#icon_change')['toggleClass']('mdi-eye-outline'), _0x1ef49d[_0x28b332(0x20f)] = _0x28b332(0x241)) : ($(_0x28b332(0x296))[_0x28b332(0x1d7)](_0x28b332(0x28a)), _0x1ef49d[_0x28b332(0x20f)] = _0x28b332(0x1c2));
}

function _0x2af4() {
    var _0xae4b2c = ['__PROTO__', 'then', 'result', '20KGRCoq', '<div\x20class=\x22col-5\x22>', '<td\x20class=\x22pl-0\x22>auth\x20method</td>', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22DES56\x22>DES56</option>', 'setAttribute', '#valid_row', 'find', '<label\x20for=\x22Authentication_mtd\x22\x20id=\x22authmtd-label\x22>Authentication\x20Method</label>', '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22margin-left:95%\x20!important;margin-top:15%\x20!important;\x22>No\x20SNMP\x20Data\x20Available...</p>', 'Select\x20Model', '<div\x20id=\x22threshold-snmp\x22\x20style=\x22display:none;\x22>', 'Add', '<table\x20class=\x22table\x22\x20id=\x22table-snmp\x22\x20style=\x22display:none;\x22>', 'auth_method', 'threshold-snmp', '<span\x20class=\x22error-msg\x22\x20id=\x22\x22>\x20</span>', '#privacy_password', 'cpu_c', 'mem_w', 'onclick', '<td\x20class=\x22pl-0\x22>username</td>', 'none', '</option>', 'privacy_password', '#cpu_c', 'Select\x20Authentication\x20Method', '#snmbv3cs', '</tr>', '<div\x20class=\x22d-inline-block\x20icon\x22><i\x20class=\x22mdi\x20mdi-eye-off-outline\x20toggle-password\x22\x20id=\x22icon_change\x22\x20onclick=\x22mypassFunction()\x22></i></div>', '<td\x20class=\x22p-lg-0\x20px-4\x20py-1\x20action-btn\x22>', 'text', 'warning', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x20display:none;\x22\x20value=\x22None\x22>None</option>', '#uptime_w', '#Authentication_mtd', '<label\x20for=\x22snmp_models\x22\x20id=\x22snmpmod-label\x22>Model</label>', '#security_level', 'color', 'securitylevel-error-msg', '/dashboard/deleteactions', 'display', '<label\x20for=\x22Privacy_mtd\x22\x20id=\x22privmtd-label\x22>Privacy\x20Method</label>', 'temp_c', '<option\x20selected\x20disabled>Select\x20Model</option>', 'securitylevel-label', '/allonboard/Firewallmodel', '#ff9eac', 'error', '#CreateSnmp\x20#Authentication_mtd', '430840SgdZCS', 'authmtd-label', '#valids_row', 'msg', '<span\x20class=\x22error-msg\x22\x20id=\x22authmtd-error-msg\x22>\x20</span>', '#CreateSnmp\x20#auth_password', '<td>t</td>', '<tr\x20class=\x22small-row\x22>', 'focusout', '__PRIVPASS__', 'NOVALUE', 'GET', '<button\x20class=\x22btn\x20btn-default\x20btn-ripple\x20accordion-toggle\x20ml-5\x22\x20data-toggle=\x22collapse\x22\x20data-target=\x22#snmp-detail-', 'security_level', 'empty', '/getsnmpfilecontent', '<i\x20class=\x22mdi\x20mdi-reload\x20io-con\x22\x20id=\x22threshold-snmpicon\x22\x20onclick=\x22resetsnmpValues()\x22\x20style=\x22color:#e99123;display:none;\x22></i>', '.snmp_input', '\x22\x20required=\x22\x22\x20id=\x22snmp-select-ip\x22\x20style=\x22background-color:transparent;\x22\x20autocomplete=\x22off\x22\x20readonly>', 'form-control', 'sec_level', '<tbody\x20class=\x22accordion\x22\x20id=\x22\x22>', 'model', '<input\x20type=\x22text\x22\x20class=\x22form-control\x20snmp_input\x20full-input\x22\x20placeholder=\x22Enter\x20User\x20Name\x22\x20required=\x22\x22\x20id=\x22user_name\x22\x20autocomplete=\x22off\x22>', 'isedit', '#snmp_version', '__MODEL__', 'v2c.j2', '\x22\x20onclick=\x22userInfo(', 'value', 'ipaddress', 'uptime_c', '</select>', 'thresholds', '#comm_string', '#snmpformdata', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20w-100\x22\x20id=\x22snmbv2cs\x22\x20onclick=\x22verifiedv2ctoserver()\x22>Verify</button>', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22authPriv\x22>authPriv</option>', '<td\x20class=\x22pl-0\x22>priv\x20method</td>', 'sendSnmp2DataToServer()', '#mem_c', '<input\x20type=\x22checkbox\x22\x20id=\x22thresholds\x22\x20name=\x22threshold\x22\x20value=\x22threshold\x22\x20onchange=\x22toggleTextsnmp(this)\x22>', 'priv_password', 'temp_w', 'errorMsg', '<td>sec</td>', '__USER__', '<option\x20selected\x20disabled>Select\x20Privacy\x20Method</option>', 'POST', 'noAuthNoPriv', '329rovjTA', '\x22\x20value=\x22', '#icons_change', '<table\x20id=\x22\x22>', 'mdi-eye-outline', '#temp_t', 'snmbv3cs', '#CreateSnmp\x20#snmp_models', '<td\x20class=\x22pl-0\x22\x20style=\x22-webkit-text-security:\x20square;\x22>', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22AES128\x22>AES128</option>', '<thead\x20class=\x22table-head\x22>', '</label>', 'val', 'success', 'snmp_input', '<td\x20class=\x22pl-0\x22>security\x20level</td>', '#icon_change', '<div\x20class=\x22d-inline-block\x20icon\x22><i\x20class=\x22mdi\x20mdi-eye-off-outline\x20toggle-password\x22\x20id=\x22icon_change\x22\x20onclick=\x22mypasscommFunction()\x22></i></div>', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22SHA\x22>SHA</option>', 'remove', '<tr\x20class=\x22collapse-tr\x22\x20id\x20=', '</table>', 'rowid', 'version', 'snmpmod-error-msg', '#CreateSnmp\x20#security_level', '<label\x20for=\x22snmp-select-ip\x22\x20id=\x22snmpip-label\x22>IP\x20Address</label>', '<td></td>', '<select\x20class=\x22form-btn\x20btn-dropdown-link\x20dropdown-toggle\x20snmp_input\x20w-100\x22\x20style=\x22height:33px\x20!important;\x22\x20type=\x22button\x22\x20id=\x22snmp_models\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22>', '180423dzMTSL', '<option\x20selected\x20disabled>Select\x20Authentication\x20Method</option>', 'btn-danger', '__IP__', '<select\x20class=\x22form-btn\x20btn-dropdown-link\x20dropdown-toggle\x20snmp_input\x20w-100\x22\x20style=\x22height:33px\x20!important;\x22\x20type=\x22button\x22\x20id=\x22Privacy_mtd\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22>', 'status', '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#00ff00;\x22>Success\x20in\x20Validation...</p>', '#mem_w', '<div\x20class=\x22dropdown\x20custom-dropdown\x20mr-3\x22>', 'hide', '__COMMUNITYSTRING__', '#snmp_models', '__AUTHMTD__', 'temp_t', '\x20--', '<div\x20class=\x22col-4\x22>', 'snmp_version', 'parent', 'prop', 'v2c', '<select\x20class=\x22form-btn\x20btn-dropdown-link\x20dropdown-toggle\x20snmp_input\x20w-100\x22\x20style=\x22height:33px\x20!important;\x22\x20type=\x22button\x22\x20onchange=\x22securitylevel()\x22\x20id=\x22security_level\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22>', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20cancel-btn\x20w-100\x22\x20data-dismiss=\x22modal\x22>Cancel</button>', 'models', 'getElementsByClassName', 'checked', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22AES\x22>AES</option>', '__AUTHPASS__', '<input\x20type=\x22text\x22\x20class=\x22form-control\x20snmp_input\x20full-input\x22\x20placeholder=\x22Enter\x20IPAddress\x22\x20value=\x22', '3wLQkER', 'uptime_t', '597987TcYjro', '6030oGBtVY', 'None', '<div\x20class=\x22col-2\x22></div>', 'Privacy', '#temp_c', '/allonboard/Routertypes', '#CreateSnmp\x20#privacy_password', '<th></th>', 'style', 'comm_string', '#user_name', 'forEach', '<div\x20class=\x22dropdown\x20select-btn-dropdown\x20full-select-dropdown\x22>', '#snmpModal', '<input\x20type=\x22number\x22\x20step=\x22any\x22\x20class=\x22form-control\x22\x20id=\x22', '#uptime_c', '#CreateSnmp\x20#snmp_version', '#snmpver2c', '<td>Warning</td>', '<i\x20class=\x22icon-select\x22\x20style=\x22color:\x20#6c757d\x22></i>', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20value=\x22AES256\x22>AES256</option>', 'reload', 'parse', '<div\x20class=\x22accordian-body\x20collapse\x20col-12\x20border-b\x22\x20id=\x22snmp-detail-', '<input\x20type=\x22password\x22\x20class=\x22form-control\x20snmp_input\x20full-input\x22\x20placeholder=\x22Enter\x20Community\x20String\x22\x20required=\x22\x22\x20id=\x22comm_string\x22\x20autocomplete=\x22new-password\x22>', '#snmp_table\x20#', '/dashboard/savedatabase', '#snmp-select-ip', 'replaceAll', '</button>', 'length', 'authPriv', '<label\x20for=\x22comm_string\x22\x20id=\x22commstring-label\x22>Community\x20String</label>', '<div\x20class=\x22col-12\x20mt-3\x22>', '1641696Drhjco', '#temp_w', 'trigger', 'password', 'securitylevel', 'disabled', '<div\x20class=\x22col-1\x22></div>', 'table-snmp', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;\x22\x20\x20value=\x22noAuthNoPriv\x22>noAuthNoPriv</option>', '<span\x20class=\x22error-msg\x22\x20id=\x22\x22></span>', '<div\x20class=\x22col-12\x20my-4\x20password-group\x22>', '<i\x20class=\x22mdi\x20mdi-delete\x22\x20onclick=\x22onDeleteSnmp(', '__SECLEV__', '</td>', '<td>num</td>', '<td\x20class=\x22pl-0\x22>priv\x20password</td>', 'data', '<td\x20class=\x22pl-0\x22>auth\x20password</td>', 'textContent', '<div\x20class=\x22col-5\x20px-1\x22>', 'when', 'threshold', 'auth_password', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-outline-secondary\x20w-100\x22\x20id=\x22snmbv3cs\x22\x20onclick=\x22verifiedv3toserver()\x22>Verify</button>', 'toggleClass', '33icvOXF', 'Privacy_mtd', 'user_name', 'Field\x20cannot\x20be\x20empty', 'snmp-select-ip', '<option\x20style=\x22color:#ffffff;font-size:0.875rem;display:none;\x22\x20value=\x22None\x22>None</option>', '<label\x20for=\x22user_name\x22\x20id=\x22user-label\x22>User\x20Name</label>', '2409448oJtiip', '<td>Critical</td>', 'iplists', '/dashboard/snmpvalidation', 'Authentication', '<div\x20class=\x22row\x22>', '<div\x20class=\x22\x22\x20id=\x22valids_row\x22></div>', 'modal', '#dialog-for-addsnmp\x20#cancelbtn', 'username', 'table', '<div\x20class=\x22\x22\x20id=\x22valid_row\x22></div>', '#CreateSnmp\x20#user_name', '<div\x20class=\x22col-12\x20my-2\x22>', '<p\x20class=\x22text-center\x20size12\x22\x20style=\x22color:#ff0000;\x22>Failure\x20in\x20Validation...</p>', 'cpu_t', '#mem_t', 'cpu_w', 'v3c.j2', '#cpu_w', '<tr></tr>', 'snmpmod-label', 'css', '.error-msg', '.loader', 'fail', 'name', '<div\x20class=\x22d-inline-block\x20icon\x22><i\x20class=\x22mdi\x20mdi-eye-off-outline\x20toggle-password\x22\x20id=\x22icons_change\x22\x20onclick=\x22myprivFunction()\x22></i></div>', '<th>Abbreviation</th>', 'snmbv2cs', '98656gjlNKn', 'Yes,\x20delete', 'getElementById', 'stringify', '#auth_password', 'privmtd-label', 'privmtd-error-msg', 'Select\x20Privacy\x20Method', 'done', 'Authentication_mtd', '</div>', '<td\x20class=\x22pl-0\x22>', '<td\x20class=\x22pl-3\x22>', '#snmp_table\x20#data\x20tbody', '<input\x20type=\x22password\x22\x20class=\x22form-control\x20snmp_input\x20full-input\x22\x20placeholder=\x22Enter\x20Authentication\x20Password\x22\x20required=\x22\x22\x20id=\x22auth_password\x22\x20autocomplete=\x22new-password\x22>', 'label', '<label\x20for=\x22CommunityString\x22>\x20Authentication\x20Password</label><br>', '<td\x20class=\x22pl-0\x22>comm_string</td>', 'type', '<div\x20class=\x22col-6\x22>', 'append', '<span\x20class=\x22error-msg\x22\x20id=\x22snmpmod-error-msg\x22>\x20</span>', 'serializeArray', '#Privacy_mtd', 'snmp_models', 'block', '</tbody>', 'innerText', '<div\x20class=\x22col-1\x22>', '#CreateSnmp\x20#Privacy_mtd', '<select\x20class=\x22form-btn\x20btn-dropdown-link\x20dropdown-toggle\x20snmp_input\x20w-100\x22\x20style=\x22height:33px\x20!important;\x22\x20type=\x22button\x22\x20id=\x22Authentication_mtd\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22>', 'DIRECT', '<label\x20for=\x22security_level\x22\x20id=\x22securitylevel-label\x22>Security\x20Level</label>', '<input\x20type=\x22password\x22\x20class=\x22form-control\x20snmp_input\x20full-input\x22\x20placeholder=\x22Enter\x20Privacy\x20Password\x22\x20required=\x22\x22\x20id=\x22privacy_password\x22\x20autocomplete=\x22new-password\x22>', '<option\x20selected\x20disabled>\x20Select\x20Security\x20level</option>'];
    _0x2af4 = function () {
        return _0xae4b2c;
    };
    return _0x2af4();
}

function myprivFunction() {
    var _0x1e6d41 = _0x2d0daa,
        _0x513d18 = document[_0x1e6d41(0x1ff)](_0x1e6d41(0x23a));
    _0x513d18[_0x1e6d41(0x20f)] === _0x1e6d41(0x1c2) ? ($(_0x1e6d41(0x288))[_0x1e6d41(0x1d7)](_0x1e6d41(0x28a)), _0x513d18[_0x1e6d41(0x20f)] = _0x1e6d41(0x241)) : ($('#icons_change')['toggleClass'](_0x1e6d41(0x28a)), _0x513d18[_0x1e6d41(0x20f)] = _0x1e6d41(0x1c2));
}

function snmpmodel() {
    var _0xa2d3f8 = _0x2d0daa;
    $(_0xa2d3f8(0x2ae))[_0xa2d3f8(0x262)]();
    var _0x4d6ffd = _0xa2d3f8(0x24e);
    $[_0xa2d3f8(0x1d3)](requestDataFromServer('/allonboard/Switchesmodel', {
        'csrfmiddlewaretoken': csfr_token
    }, _0xa2d3f8(0x25f)), requestDataFromServer(_0xa2d3f8(0x250), {
        'csrfmiddlewaretoken': csfr_token
    }, _0xa2d3f8(0x25f)), requestDataFromServer(_0xa2d3f8(0x1a2), {
        'csrfmiddlewaretoken': csfr_token
    }, _0xa2d3f8(0x25f)))[_0xa2d3f8(0x221)](function (_0x1f70e7, _0xb6363, _0x30c442) {
        var _0x142b45 = _0xa2d3f8,
            _0x3ae3b5 = JSON[_0x142b45(0x1b3)](_0x1f70e7[0x0]),
            _0x534935 = JSON['parse'](_0xb6363[0x0]),
            _0x30ebd6 = JSON[_0x142b45(0x1b3)](_0x30c442[0x0]);
        _0x4d6ffd += buildModelOptionsHtml(_0x3ae3b5[_0x142b45(0x1cf)]), _0x4d6ffd += buildModelOptionsHtml(_0x534935['data']), _0x4d6ffd += buildModelOptionsHtml(_0x30ebd6[_0x142b45(0x1cf)]), $('#snmp_models')[_0x142b45(0x211)](_0x4d6ffd);
    })[_0xa2d3f8(0x1f8)](function (_0x1d01b8) {
        var _0x11aa38 = _0xa2d3f8;
        console[_0x11aa38(0x252)](_0x1d01b8);
    });
}

function buildModelOptionsHtml(_0x3ff014) {
    var _0x4f1bfa = _0x2d0daa,
        _0x5b6c5e = '';
    return _0x3ff014[_0x4f1bfa(0x1a8)](function (_0x521548) {
        var _0x162a01 = _0x4f1bfa;
        _0x5b6c5e += '<option\x20style=\x22color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;\x22\x20value=\x22' + _0x521548[_0x162a01(0x26a)] + '\x22>' + _0x521548[_0x162a01(0x26a)] + _0x162a01(0x239);
    }), _0x5b6c5e;
}

function validateInputs(_0x1c025c) {
    var _0x5dc92a = _0x2d0daa,
        _0x461e48 = checkAllfeildsfilled(_0x1c025c);
    const _0x3c0c33 = [{
        'id': 'snmp_models',
        'label': _0x5dc92a(0x1f4),
        'errorMsg': _0x5dc92a(0x29e),
        'value': _0x5dc92a(0x22c)
    }];
    let _0x11f823 = ![];
    for (let _0x2b8bfb = 0x0; _0x2b8bfb < _0x3c0c33['length']; _0x2b8bfb++) {
        const _0x285e42 = _0x3c0c33[_0x2b8bfb],
            _0x5c430d = document[_0x5dc92a(0x1ff)](_0x285e42['id']);
        _0x5c430d[_0x5dc92a(0x271)] === _0x285e42[_0x5dc92a(0x271)] ? (document[_0x5dc92a(0x1ff)](_0x285e42[_0x5dc92a(0x280)])[_0x5dc92a(0x1d1)] = _0x5dc92a(0x1db), document[_0x5dc92a(0x1ff)](_0x285e42[_0x5dc92a(0x20c)])[_0x5dc92a(0x1a5)][_0x5dc92a(0x248)] = _0x5dc92a(0x251), _0x11f823 = !![]) : document['getElementById'](_0x285e42[_0x5dc92a(0x280)])[_0x5dc92a(0x1d1)] = '';
    }
    return _0x461e48;
    return !_0x11f823;
}

function validateingInput(_0x1a0460) {
    var _0x59fd03 = _0x2d0daa,
        _0x1275de = checkAllfeildsfilled(_0x1a0460);
    const _0x17ed0b = [{
        'id': 'security_level',
        'label': _0x59fd03(0x24f),
        'errorMsg': _0x59fd03(0x249),
        'value': 'Select\x20Security\x20level'
    }, {
        'id': _0x59fd03(0x215),
        'label': _0x59fd03(0x1f4),
        'errorMsg': _0x59fd03(0x29e),
        'value': _0x59fd03(0x22c)
    }, {
        'id': _0x59fd03(0x206),
        'label': _0x59fd03(0x255),
        'errorMsg': 'authmtd-error-msg',
        'value': _0x59fd03(0x23c)
    }, {
        'id': _0x59fd03(0x1d9),
        'label': _0x59fd03(0x202),
        'errorMsg': _0x59fd03(0x203),
        'value': _0x59fd03(0x204)
    }];
    let _0x12f6d8 = ![];
    for (let _0xaa2eb6 = 0x0; _0xaa2eb6 < _0x17ed0b[_0x59fd03(0x1bb)]; _0xaa2eb6++) {
        const _0x27cf87 = _0x17ed0b[_0xaa2eb6],
            _0x159ef6 = document[_0x59fd03(0x1ff)](_0x27cf87['id']);
        _0x159ef6[_0x59fd03(0x271)] === _0x27cf87[_0x59fd03(0x271)] ? (document['getElementById'](_0x27cf87[_0x59fd03(0x280)])[_0x59fd03(0x1d1)] = 'Field\x20cannot\x20be\x20empty', document['getElementById'](_0x27cf87['label'])[_0x59fd03(0x1a5)][_0x59fd03(0x248)] = _0x59fd03(0x251), _0x12f6d8 = !![]) : document['getElementById'](_0x27cf87[_0x59fd03(0x280)])[_0x59fd03(0x1d1)] = '';
    }
    return _0x1275de;
    return !_0x12f6d8;
}

function sendSnmpDataToServers() {
    var _0x59e835 = _0x2d0daa,
        _0x52f52d = {
            'uptime_w': parseFloat($(_0x59e835(0x244))[_0x59e835(0x292)]()),
            'uptime_c': parseFloat($(_0x59e835(0x1ac))[_0x59e835(0x292)]()),
            'uptime_t': parseInt($('#uptime_t')[_0x59e835(0x292)]()),
            'temp_w': parseFloat($(_0x59e835(0x1c0))[_0x59e835(0x292)]()),
            'temp_c': parseFloat($(_0x59e835(0x1a1))[_0x59e835(0x292)]()),
            'temp_t': parseInt($(_0x59e835(0x28b))[_0x59e835(0x292)]()),
            'mem_w': parseFloat($(_0x59e835(0x2aa))[_0x59e835(0x292)]()),
            'mem_c': parseFloat($(_0x59e835(0x27c))[_0x59e835(0x292)]()),
            'mem_t': parseInt($(_0x59e835(0x1ef))[_0x59e835(0x292)]()),
            'cpu_w': parseFloat($(_0x59e835(0x1f2))['val']()),
            'cpu_c': parseFloat($(_0x59e835(0x23b))['val']()),
            'cpu_t': parseInt($('#cpu_t')[_0x59e835(0x292)]())
        },
        _0x10e621 = $(_0x59e835(0x1b8))[_0x59e835(0x292)](),
        _0x458361 = $(_0x59e835(0x277))[_0x59e835(0x213)](),
        _0x3d6eca = {};
    _0x458361[_0x59e835(0x1a8)](function (_0x30e635) {
        var _0x4dc102 = _0x59e835;
        _0x3d6eca[_0x30e635[_0x4dc102(0x1f9)]] = _0x30e635[_0x4dc102(0x271)];
    });
    var _0x317e3e = {};
    _0x317e3e[_0x59e835(0x26c)] = isEdit, _0x317e3e[_0x59e835(0x1e1)] = _0x10e621, _0x317e3e[_0x59e835(0x29d)] = $(_0x59e835(0x1ad))['val'](), _0x317e3e['models'] = $(_0x59e835(0x28d))[_0x59e835(0x292)](), _0x317e3e[_0x59e835(0x1c3)] = $('#CreateSnmp\x20#security_level')['val'](), _0x317e3e[_0x59e835(0x1e3)] = $(_0x59e835(0x253))[_0x59e835(0x292)](), _0x317e3e[_0x59e835(0x1a0)] = $(_0x59e835(0x21a))[_0x59e835(0x292)](), _0x317e3e[_0x59e835(0x1d5)] = $(_0x59e835(0x259))[_0x59e835(0x292)](), _0x317e3e[_0x59e835(0x23a)] = $(_0x59e835(0x1a3))[_0x59e835(0x292)](), _0x317e3e[_0x59e835(0x1a6)] = $('#CreateSnmp\x20#comm_string')[_0x59e835(0x292)](), _0x317e3e[_0x59e835(0x1da)] = $(_0x59e835(0x1eb))[_0x59e835(0x292)](), _0x317e3e[_0x59e835(0x1d4)] = _0x52f52d, requestDataFromServer(_0x59e835(0x1b7), {
        'data': JSON['stringify'](_0x317e3e),
        'csrfmiddlewaretoken': csfr_token
    }, 'POST')[_0x59e835(0x205)](snmpFileCreationResponse);
}

function snmpFileCreationResponse(_0x287226) {
    var _0x4f68ad = _0x2d0daa;
    res = JSON['parse'](_0x287226), $(_0x4f68ad(0x1f7))[_0x4f68ad(0x2ac)]();
    if (res['status'] == 0xc8) swal({
        'title': res[_0x4f68ad(0x1cf)],
        'type': 'success',
        'confirmButtonClass': 'btn-success',
        'confirmButtonText': 'OK'
    }, function (_0x88c48f) {
        var _0x191092 = _0x4f68ad;
        _0x88c48f && (swal(res[_0x191092(0x1cf)], '\x20', _0x191092(0x293)), $('#dialog-for-addsnmp')[_0x191092(0x1e6)](_0x191092(0x2ac)), $(_0x191092(0x1aa))[_0x191092(0x1e6)]('hide'));
    });
    else swal(res['data'], '\x20', _0x4f68ad(0x252));
}

function getsnmpdata() {
    var _0x3149eb = _0x2d0daa;
    requestDataFromServer('/dashboard/snmpnewtable', {
        'csrfmiddlewaretoken': csfr_token
    }, 'GET')[_0x3149eb(0x205)](function (_0xfefa02) {
        var _0xc9d9b4 = _0x3149eb;
        snmptable = JSON[_0xc9d9b4(0x1b3)](_0xfefa02);
        var _0x20025f = '';
        snmptable[_0xc9d9b4(0x1cf)] != '' ? snmptable[_0xc9d9b4(0x1cf)][_0xc9d9b4(0x1a8)](function (_0x2d2782) {
            var _0x2b0fc2 = _0xc9d9b4;
            _0x20025f += _0x2b0fc2(0x29a) + _0x2d2782['id'] + '\x20style=\x22text-align:center\x20!important;\x22>', _0x20025f += _0x2b0fc2(0x209) + _0x2d2782['version'] + _0x2b0fc2(0x1cc), _0x20025f += _0x2b0fc2(0x209) + _0x2d2782[_0x2b0fc2(0x272)] + _0x2b0fc2(0x1cc), _0x20025f += _0x2b0fc2(0x209) + _0x2d2782[_0x2b0fc2(0x26a)] + _0x2b0fc2(0x1cc), _0x20025f += _0x2b0fc2(0x240), _0x20025f += _0x2b0fc2(0x260) + _0x2d2782['id'] + _0x2b0fc2(0x270) + _0x2d2782['id'] + ')\x22>', _0x20025f += _0x2b0fc2(0x1b0), _0x20025f += _0x2b0fc2(0x1ba), _0x20025f += _0x2b0fc2(0x2ab), _0x20025f += '<button\x20class=\x22btn\x20btn-default\x20btn-ripple\x20btn-dropdown-link\x20dropdown-toggle\x20icon-dropdown\x22\x20type=\x22button\x22\x20id=\x22moreoption\x22\x20data-toggle=\x22dropdown\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22>', _0x20025f += _0x2b0fc2(0x1ca) + _0x2d2782['id'] + ')\x22\x20style=\x22color:\x20#6c757d\x22></i>', _0x20025f += _0x2b0fc2(0x1ba), _0x20025f += '</div>', _0x20025f += _0x2b0fc2(0x1cc), _0x20025f += '<tr\x20class=\x22border-0\x20collapse-content\x22>', _0x20025f += '<td\x20colspan=\x2212\x22\x20class=\x22hiddenRow\x20border-0\x22>', _0x20025f += _0x2b0fc2(0x1b4) + _0x2d2782['id'] + '\x22>', _0x20025f += _0x2b0fc2(0x289), _0x20025f += _0x2b0fc2(0x290), _0x20025f += '<tr\x20class=\x22text-uppercase\x20size12\x20bold-text\x22>', _0x20025f += _0x2b0fc2(0x237), _0x20025f += _0x2b0fc2(0x20e), _0x20025f += _0x2b0fc2(0x295), _0x20025f += _0x2b0fc2(0x225), _0x20025f += _0x2b0fc2(0x1d0), _0x20025f += _0x2b0fc2(0x27a), _0x20025f += _0x2b0fc2(0x1ce), _0x20025f += _0x2b0fc2(0x2a1), _0x20025f += _0x2b0fc2(0x23e), _0x20025f += '</thead>', _0x20025f += _0x2b0fc2(0x269), _0x20025f += '<tr\x20data-toggle=\x22collapse\x22\x20data-target=\x22#user-detail\x22\x20class=\x22accordion-toggle\x20cursor-pointer\x22\x20style=\x22text-align:center\x20!important;\x22\x20id=\x221\x22>', _0x20025f += _0x2b0fc2(0x208) + _0x2d2782[_0x2b0fc2(0x1e8)][_0x2b0fc2(0x1b9)](_0x2b0fc2(0x25e), '\x20--') + _0x2b0fc2(0x1cc), _0x20025f += '<td\x20class=\x22pl-0\x22>' + _0x2d2782[_0x2b0fc2(0x1a6)][_0x2b0fc2(0x1b9)](_0x2b0fc2(0x25e), _0x2b0fc2(0x2b1)) + '</td>', _0x20025f += _0x2b0fc2(0x208) + _0x2d2782[_0x2b0fc2(0x268)][_0x2b0fc2(0x1b9)](_0x2b0fc2(0x25e), _0x2b0fc2(0x2b1)) + _0x2b0fc2(0x1cc), _0x20025f += _0x2b0fc2(0x208) + _0x2d2782[_0x2b0fc2(0x230)][_0x2b0fc2(0x1b9)](_0x2b0fc2(0x25e), _0x2b0fc2(0x2b1)) + '</td>', _0x20025f += _0x2b0fc2(0x28e) + _0x2d2782['auth_password'][_0x2b0fc2(0x1b9)](_0x2b0fc2(0x25e), '--') + '</td>', _0x20025f += _0x2b0fc2(0x208) + _0x2d2782['priv_method'][_0x2b0fc2(0x1b9)](_0x2b0fc2(0x25e), _0x2b0fc2(0x2b1)) + _0x2b0fc2(0x1cc), _0x20025f += _0x2b0fc2(0x28e) + _0x2d2782[_0x2b0fc2(0x27e)]['replaceAll'](_0x2b0fc2(0x25e), '--') + _0x2b0fc2(0x1cc), _0x20025f += '<td></td>', _0x20025f += _0x2b0fc2(0x23e), _0x20025f += _0x2b0fc2(0x217), _0x20025f += _0x2b0fc2(0x29b), _0x20025f += _0x2b0fc2(0x207), _0x20025f += _0x2b0fc2(0x1cc), _0x20025f += _0x2b0fc2(0x1f3), _0x20025f += _0x2b0fc2(0x23e);
        }) : _0x20025f += _0xc9d9b4(0x22b), $(_0xc9d9b4(0x20a))[_0xc9d9b4(0x211)](_0x20025f);
    });
}

function onDeleteSnmp(_0x64437e) {
    var _0x1d7c12 = _0x2d0daa,
        _0x5f6851 = $(_0x64437e)['data']('id');
    data = {}, requestData = {}, data[_0x1d7c12(0x29c)] = _0x5f6851, requestData[_0x1d7c12(0x1cf)] = data, swal({
        'title': 'Delete\x20SNMP',
        'text': 'Want\x20to\x20permanently\x20delete\x20this\x20snmp?',
        'type': _0x1d7c12(0x242),
        'showCancelButton': !![],
        'confirmButtonClass': _0x1d7c12(0x2a5),
        'confirmButtonText': _0x1d7c12(0x1fe),
        'closeOnConfirm': ![]
    }, function () {
        var _0x6d1266 = _0x1d7c12;
        requestDataFromServer(_0x6d1266(0x24a), {
            'data': JSON[_0x6d1266(0x200)](requestData),
            'csrfmiddlewaretoken': csfr_token
        }, _0x6d1266(0x284))[_0x6d1266(0x205)](function (_0x402b09) {
            var _0x509859 = _0x6d1266;
            deltable = JSON[_0x509859(0x1b3)](_0x402b09), $(_0x509859(0x1e7))[_0x509859(0x1c1)]('click'), deltable && deltable[_0x509859(0x2a8)] == 0xc8 ? (rowid = deltable[_0x509859(0x29c)], $(_0x509859(0x1b6) + rowid)[_0x509859(0x299)](), swal(deltable[_0x509859(0x257)], '\x20', _0x509859(0x293)), location[_0x509859(0x1b2)]()) : swal(deltable[_0x509859(0x257)], '\x20', _0x509859(0x252));
        });
    });
}