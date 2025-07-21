var _0x81ccdf = _0x5292;
(function (_0x50f140, _0x2fd80b) {
    var _0x13bfbc = _0x5292,
        _0x1c47a9 = _0x50f140();
    while (!![]) {
        try {
            var _0x3b4352 = -parseInt(_0x13bfbc(0x41d)) / 0x1 + parseInt(_0x13bfbc(0x3f6)) / 0x2 * (-parseInt(_0x13bfbc(0x3f4)) / 0x3) + -parseInt(_0x13bfbc(0x1dc)) / 0x4 + parseInt(_0x13bfbc(0x3a6)) / 0x5 * (parseInt(_0x13bfbc(0x341)) / 0x6) + -parseInt(_0x13bfbc(0x4aa)) / 0x7 + parseInt(_0x13bfbc(0x1db)) / 0x8 + parseInt(_0x13bfbc(0x208)) / 0x9;
            if (_0x3b4352 === _0x2fd80b) break;
            else _0x1c47a9['push'](_0x1c47a9['shift']());
        } catch (_0x6c43da) {
            _0x1c47a9['push'](_0x1c47a9['shift']());
        }
    }
}(_0x57d9, 0x78eda));
var params = new URLSearchParams(document[_0x81ccdf(0x44a)][_0x81ccdf(0x1b8)]);
sites = [], selectedsite = '\x20', sites[_0x81ccdf(0x250)](params[_0x81ccdf(0x48c)]('site'));
var selectedsite = params['get'](_0x81ccdf(0x461)),
    responseFromServer, cyGraph = {},
    zoom = 0x1,
    titleToId = {},
    wsConnected = ![],
    all_Vms = !![],
    connectionTries = 0x6,
    Datanodes = '',
    swi_xml_24 = '',
    swi_xml_32 = '',
    swi_xml_24stack = '',
    swi_xml_32stack = '',
    swi_xml_L24T4X_A1 = '',
    swi_xml_S5720_52X = '',
    swi_xml_S6720S_24S = '',
    swi_xml_S6720S_24S_stc = '',
    swi_xml_C2960_48TT = '',
    swi_xml_C2960_48TT_stc = '',
    swi_xml_Cisco_2960 = '',
    swi_xml_L24T4X_A1_stc = '',
    swi_xml_S5720_52X_stc = '',
    swi_xml_Cisco_2960_stc = '',
    swi_xml_48 = '',
    swi_xml_48stack = '',
    swi_xml_SG350X_24 = '',
    swi_xml_SG350X_24_stc = '',
    swi_xml_barracuda = '',
    swi_xml_barracuda_stc = '',
    swi_xml_big_ip = '',
    swi_xml_big_ip_stc = '',
    swi_xml_cisco_2911 = '',
    swi_xml_cisco_2911_stc = '',
    swi_xml_cisco_2921 = '',
    swi_xml_cisco_2921_stc = '',
    swi_xml_cisco_2960 = '',
    swi_xml_cisco_2960_stc = '',
    swi_xml_cisco_3945 = '',
    swi_xml_cisco_3945_stc = '',
    swi_xml_cisco_ftd = '',
    swi_xml_cisco_ftd_stc = '',
    swi_xml_cisco_isr = '',
    swi_xml_cisco_isr_stc = '',
    swi_xml_cisco_nexus = '',
    swi_xml_cisco_nexus_stc = '',
    swi_xml_hpe_sn3600b = '',
    swi_xml_hpe_sn3600b_stc = '',
    swi_xml_netapp_aff = '',
    swi_xml_netapp_aff_stc = '',
    swi_xml_radware_brox10 = '',
    swi_xml_radware_brox10_stc = '',
    clientdata, newip = [],
    nicconnect = [],
    arrowdata = [],
    InitialPortStatus = [],
    IndividualPortStatus = [],
    InitialSwitchIcons = [],
    InitialSwitchStatus = [],
    InitialhwdivStatus = [],
    criticalStatusCount = {},
    okStatusCount = {},
    pendingStatusCount = {},
    warningStatusCount = {},
    unknownStatusCount = {},
    hardwarebg = '',
    hardwarebgcolorstatus = [],
    adata = [],
    layers = [_0x81ccdf(0x2e2), _0x81ccdf(0x493), _0x81ccdf(0x31c), _0x81ccdf(0x263), _0x81ccdf(0x4b4)],
    port_swi = [],
    gcount = 0x0,
    ecount = 0x0,
    pcount = 0x0,
    fcount = 0x0,
    rcount = 0x0,
    map = {},
    xcoor, ycoor, swiportcounts = {},
    swiips = [],
    leurl = '';
let options = {
    'valueNames': [_0x81ccdf(0x30b), 'ip', 'status']
};
var graphLayout = {
    'name': _0x81ccdf(0x390),
    'directed': !![],
    'padding': 0xa,
    'animate': ![],
    'fit': !![],
    'nodeOverlap': 0x1388
},
    sitesData = [];
entitySelectedsite = '\x20';
var siteResponse, entityResponse, sortedJson = {},
    sumsortedJson = {},
    nodeList, server_hosts = {},
    server_report, niccon_links = {},
    arrow_links = {},
    tog_nicconnect = {},
    tog_arrowdata = {};
$(document)[_0x81ccdf(0x268)](function () {
    var _0x292dee = _0x81ccdf,
        _0x52b283 = '';
    _0x52b283 += _0x292dee(0x483) + params[_0x292dee(0x48c)](_0x292dee(0x461)) + _0x292dee(0x2be) + params[_0x292dee(0x48c)](_0x292dee(0x461)) + _0x292dee(0x4c9) + params[_0x292dee(0x48c)](_0x292dee(0x461)) + _0x292dee(0x20e) + params[_0x292dee(0x48c)](_0x292dee(0x461)) + '\x22\x20data-toggle=\x22tab\x22\x20>' + params[_0x292dee(0x48c)](_0x292dee(0x461)) + _0x292dee(0x33f), $(_0x292dee(0x1ce))[_0x292dee(0x322)](_0x52b283), requestDataFromServer(_0x292dee(0x33e), {
        'sitename': params[_0x292dee(0x48c)]('site')
    }, type = 'GET')[_0x292dee(0x338)](setstatusdata), getSwitchXML(), getSiteNames(), pageName === _0x292dee(0x399) ? ($('.table-node')['hide'](), $(_0x292dee(0x30f))[_0x292dee(0x203)](_0x292dee(0x240))) : ($(_0x292dee(0x36c))[_0x292dee(0x3d1)](), $(_0x292dee(0x3e2))[_0x292dee(0x346)]('col-lg-3'), $(_0x292dee(0x3e2))[_0x292dee(0x476)]('col-lg-4'), $(_0x292dee(0x487))[_0x292dee(0x346)]('col-lg-7'), $(_0x292dee(0x487))[_0x292dee(0x476)](_0x292dee(0x2db))), $(_0x292dee(0x249))[_0x292dee(0x3d1)](), $(_0x292dee(0x3ce))[_0x292dee(0x3d1)](), $(_0x292dee(0x36c))[_0x292dee(0x33b)](function () {
        var _0xca1434 = _0x292dee;
        window[_0xca1434(0x44a)]['href'] = _0xca1434(0x2ad);
    }), $('#export-to-select')['change'](function () {
        var _0x3cb8c2 = _0x292dee;
        $(_0x3cb8c2(0x2cb))[_0x3cb8c2(0x1f8)]({
            'filename': _0x3cb8c2(0x264),
            'format': $('#export-to-select')[_0x3cb8c2(0x2b5)]()
        });
    }), $(document)['on'](_0x292dee(0x33b), function (_0x4856ec) {
        var _0x3229e4 = _0x292dee;
        const _0x1af286 = $('#portinfo');
        !_0x1af286['is'](_0x4856ec[_0x3229e4(0x211)]) && !(_0x4856ec[_0x3229e4(0x211)][_0x3229e4(0x452)] === 'g') && !(_0x4856ec[_0x3229e4(0x211)][_0x3229e4(0x452)] === 'path') && !_0x4856ec[_0x3229e4(0x211)]['classList'][_0x3229e4(0x4df)](_0x3229e4(0x2fa)) && !_0x4856ec['target'][_0x3229e4(0x4e9)][_0x3229e4(0x4df)](_0x3229e4(0x2dd)) && _0x1af286[_0x3229e4(0x27e)]('display') === _0x3229e4(0x275) && _0x1af286[_0x3229e4(0x292)](_0x4856ec['target'])['length'] === 0x0 && _0x1af286['css'](_0x3229e4(0x326), _0x3229e4(0x432));
    }), document[_0x292dee(0x431)](_0x292dee(0x223))[_0x292dee(0x309)]('change', function () {
        var _0x250aee = _0x292dee;
        this[_0x250aee(0x32e)] ? (document[_0x250aee(0x431)](_0x250aee(0x223))[_0x250aee(0x1ca)] = 'VM', all_Vms = ![], Object['keys'](niccon_links)[_0x250aee(0x1cd)](_0x3f3a4f => {
            var _0x4ab4f0 = _0x250aee,
                _0x4a2571 = niccon_links[_0x3f3a4f];
            document['getElementById'](_0x4ab4f0(0x1d2))[_0x4ab4f0(0x4ba)](_0x4ab4f0(0x4c6), AnimEvent[_0x4ab4f0(0x489)](function () {
                _0x4a2571['position']();
            }), ![]), document['getElementById'](_0x4ab4f0(0x3a0))[_0x4ab4f0(0x4ba)]('scroll', AnimEvent[_0x4ab4f0(0x489)](function () {
                _0x4a2571['position']();
            }), ![]), document[_0x4ab4f0(0x431)]('ps_hw')[_0x4ab4f0(0x4ba)](_0x4ab4f0(0x4c6), AnimEvent[_0x4ab4f0(0x489)](function () {
                var _0x3fd155 = _0x4ab4f0;
                _0x4a2571[_0x3fd155(0x49e)]();
            }), ![]), document[_0x4ab4f0(0x431)](_0x4ab4f0(0x30e))[_0x4ab4f0(0x4ba)]('scroll', AnimEvent[_0x4ab4f0(0x489)](function () {
                var _0x1d6e46 = _0x4ab4f0;
                _0x4a2571[_0x1d6e46(0x49e)]();
            }), ![]), Array[_0x4ab4f0(0x3db)](document[_0x4ab4f0(0x3bd)]('icon-evts'))[_0x4ab4f0(0x1cd)](function (_0x20f9b3) {
                var _0x1a1468 = _0x4ab4f0;
                _0x20f9b3[_0x1a1468(0x4ba)](_0x1a1468(0x33b), AnimEvent[_0x1a1468(0x489)](function () {
                    var _0x2a2cbf = _0x1a1468;
                    _0x4a2571[_0x2a2cbf(0x49e)]();
                }), ![]);
            }), Array[_0x4ab4f0(0x3db)](document['getElementsByClassName'](_0x4ab4f0(0x3f3)))[_0x4ab4f0(0x1cd)](function (_0x2a6f74) {
                var _0x54cb24 = _0x4ab4f0;
                _0x2a6f74['removeEventListener'](_0x54cb24(0x33b), AnimEvent[_0x54cb24(0x489)](function () {
                    setTimeout(function () {
                        var _0x28a88e = _0x5292;
                        _0x4a2571[_0x28a88e(0x49e)]();
                    }, 0x7d0);
                }), ![]);
            }), document[_0x4ab4f0(0x431)](_0x4ab4f0(0x36b))['removeEventListener'](_0x4ab4f0(0x4c6), AnimEvent[_0x4ab4f0(0x489)](function () {
                var _0x65c7c5 = _0x4ab4f0;
                _0x4a2571[_0x65c7c5(0x49e)]();
            }), ![]), document[_0x4ab4f0(0x431)](_0x4ab4f0(0x325))['removeEventListener'](_0x4ab4f0(0x4c6), AnimEvent[_0x4ab4f0(0x489)](function () {
                var _0x247192 = _0x4ab4f0;
                _0x4a2571[_0x247192(0x49e)]();
            }), ![]), document[_0x4ab4f0(0x431)](_0x4ab4f0(0x310))[_0x4ab4f0(0x4ba)]('scroll', AnimEvent['add'](function () {
                var _0x3d84d6 = _0x4ab4f0;
                _0x4a2571[_0x3d84d6(0x49e)]();
            }), ![]), document[_0x4ab4f0(0x431)](_0x4ab4f0(0x3f2))[_0x4ab4f0(0x4ba)]('scroll', AnimEvent[_0x4ab4f0(0x489)](function () {
                var _0x375a06 = _0x4ab4f0;
                _0x4a2571[_0x375a06(0x49e)]();
            }), ![]), document[_0x4ab4f0(0x431)](_0x4ab4f0(0x1d2))[_0x4ab4f0(0x4ba)](_0x4ab4f0(0x4c6), AnimEvent['add'](function () {
                _0x4a2571['position']();
            }), ![]), document[_0x4ab4f0(0x431)]('server-div')['removeEventListener'](_0x4ab4f0(0x4c6), AnimEvent[_0x4ab4f0(0x489)](function () {
                _0x4a2571['position']();
            }), ![]), document[_0x4ab4f0(0x431)](_0x4ab4f0(0x4ce))['removeEventListener']('scroll', AnimEvent[_0x4ab4f0(0x489)](function () {
                var _0x1e1815 = _0x4ab4f0;
                _0x4a2571[_0x1e1815(0x49e)]();
            }), ![]), document[_0x4ab4f0(0x431)](_0x4ab4f0(0x30e))['removeEventListener'](_0x4ab4f0(0x4c6), AnimEvent[_0x4ab4f0(0x489)](function () {
                var _0x3df315 = _0x4ab4f0;
                _0x4a2571[_0x3df315(0x49e)]();
            }), ![]), Array[_0x4ab4f0(0x3db)](document[_0x4ab4f0(0x3bd)](_0x4ab4f0(0x3c1)))[_0x4ab4f0(0x1cd)](function (_0x7bcc8c) {
                var _0x2e1dd1 = _0x4ab4f0;
                _0x7bcc8c[_0x2e1dd1(0x4ba)](_0x2e1dd1(0x33b), AnimEvent[_0x2e1dd1(0x489)](function () {
                    var _0x241df6 = _0x2e1dd1;
                    _0x4a2571[_0x241df6(0x49e)]();
                }), ![]);
            }), AnimEvent[_0x4ab4f0(0x465)](function () {
                var _0x29d4aa = _0x4ab4f0;
                _0x4a2571[_0x29d4aa(0x49e)]();
            }), Array[_0x4ab4f0(0x3db)](document[_0x4ab4f0(0x3bd)](_0x4ab4f0(0x3f3)))[_0x4ab4f0(0x1cd)](function (_0x597427) {
                var _0x305d5e = _0x4ab4f0;
                _0x597427[_0x305d5e(0x4ba)]('click', AnimEvent[_0x305d5e(0x489)](function () {
                    setTimeout(function () {
                        var _0x55417e = _0x5292;
                        _0x4a2571[_0x55417e(0x49e)]();
                    }, 0x7d0);
                }), ![]);
            }), AnimEvent[_0x4ab4f0(0x465)](function () {
                setTimeout(function () {
                    var _0x33f7aa = _0x5292;
                    _0x4a2571[_0x33f7aa(0x49e)]();
                }, 0x7d0);
            });
            var _0x481897 = tog_nicconnect[_0x3f3a4f];
            niccon_links[_0x3f3a4f][_0x4ab4f0(0x465)]();
            var _0x1abc18 = '',
                _0x16ad3b = '';
            _0x481897[_0x4ab4f0(0x34e)][_0x4ab4f0(0x1f9)](_0x4ab4f0(0x1c0)) ? (_0x16ad3b = _0x481897[_0x4ab4f0(0x34e)][_0x4ab4f0(0x320)](_0x4ab4f0(0x1c0), _0x4ab4f0(0x41f)), _0x1abc18 = document['getElementById'](_0x4ab4f0(0x375) + _0x16ad3b['replaceAll']('.', '_'))) : _0x1abc18 = document[_0x4ab4f0(0x431)](_0x481897['start'][_0x4ab4f0(0x320)]('.', '_') + _0x4ab4f0(0x356));
            var _0x1d647a = _0x1abc18['cloneNode'](!![]);
            _0x1abc18['parentNode']['replaceChild'](_0x1d647a, _0x1abc18), _0x481897['end']['includes'](_0x4ab4f0(0x1c0)) ? (_0x16ad3b = _0x481897[_0x4ab4f0(0x2e4)][_0x4ab4f0(0x320)](_0x4ab4f0(0x1c0), _0x4ab4f0(0x41f)), _0x1abc18 = document[_0x4ab4f0(0x431)](_0x4ab4f0(0x375) + _0x16ad3b['replaceAll']('.', '_'))) : _0x1abc18 = document['getElementById'](_0x481897['end'][_0x4ab4f0(0x320)]('.', '_') + _0x4ab4f0(0x356)), _0x1d647a = _0x1abc18[_0x4ab4f0(0x269)](!![]), _0x1abc18[_0x4ab4f0(0x20f)]['replaceChild'](_0x1d647a, _0x1abc18);
        }), Object[_0x250aee(0x385)](arrow_links)[_0x250aee(0x1cd)](_0x821055 => {
            var _0x17fb6c = _0x250aee,
                _0xff93c4 = tog_arrowdata[_0x821055],
                _0x2a92f4 = arrow_links[_0x821055];
            $(_0x17fb6c(0x4be))[_0x17fb6c(0x201)](), $(_0x17fb6c(0x29b))['off'](), AnimEvent['remove'](function () {
                var _0x571e26 = _0x17fb6c;
                _0x2a92f4[_0x571e26(0x49e)]();
            }), AnimEvent[_0x17fb6c(0x465)](function () {
                setTimeout(function () {
                    var _0x30e296 = _0x5292;
                    _0x2a92f4[_0x30e296(0x49e)]();
                }, 0x7d0);
            }), arrow_links[_0x821055][_0x17fb6c(0x465)]();
            var _0x1c95db = '',
                _0x4709c9 = _0xff93c4['start'][_0x17fb6c(0x444)](':')[0x0][_0x17fb6c(0x320)]('.', '_'),
                _0x4e3b36 = _0xff93c4['start']['split'](':')[0x1],
                _0x77f60b = '';
            if (_0xff93c4['start']['includes'](':p')) _0x77f60b = 'p_';
            else _0xff93c4[_0x17fb6c(0x34e)]['includes'](':s') && (_0x77f60b = 's_');
            _0x1c95db = document[_0x17fb6c(0x431)](_0x77f60b + _0x4709c9)[_0x17fb6c(0x431)](_0x4e3b36);
            var _0x51fe29 = _0x1c95db[_0x17fb6c(0x269)](!![]);
            _0x1c95db['parentNode'][_0x17fb6c(0x32b)](_0x51fe29, _0x1c95db);
            var _0x385bb3 = _0xff93c4[_0x17fb6c(0x2e4)][_0x17fb6c(0x320)]('.', '_'),
                _0x2b61ed = '';
            _0xff93c4[_0x17fb6c(0x2e4)]['includes'](':') && (_0x385bb3 = _0xff93c4[_0x17fb6c(0x2e4)][_0x17fb6c(0x444)](':')[0x0]['replaceAll']('.', '_'), _0x2b61ed = _0xff93c4[_0x17fb6c(0x2e4)]['split'](':')[0x1]);
            if (_0xff93c4[_0x17fb6c(0x2e4)]['includes'](':p')) _0x1c95db = document[_0x17fb6c(0x431)]('p_' + _0x385bb3)[_0x17fb6c(0x431)](_0x2b61ed);
            else _0xff93c4[_0x17fb6c(0x2e4)][_0x17fb6c(0x1f9)](':s') ? _0x1c95db = document['getElementById']('s_' + _0x385bb3)['getElementById'](_0x2b61ed) : _0x1c95db = document[_0x17fb6c(0x431)](_0x17fb6c(0x375) + _0x385bb3 + _0x17fb6c(0x32a));
            _0x51fe29 = _0x1c95db['cloneNode'](!![]), _0x1c95db['parentNode'][_0x17fb6c(0x32b)](_0x51fe29, _0x1c95db);
        })) : (document[_0x250aee(0x431)](_0x250aee(0x1e3))[_0x250aee(0x3b0)][_0x250aee(0x326)] = _0x250aee(0x432), document[_0x250aee(0x431)](_0x250aee(0x223))[_0x250aee(0x1ca)] = _0x250aee(0x414), document['querySelectorAll'](_0x250aee(0x48e))[_0x250aee(0x1cd)](_0x383001 => {
            var _0x344785 = _0x250aee;
            _0x383001[_0x344785(0x4e9)][_0x344785(0x465)](_0x344785(0x26d)), _0x383001[_0x344785(0x4e9)]['remove'](_0x344785(0x496));
        }), sortAndGroupElements(psHw), sortAndGroupElements(vmsHw), all_Vms = !![], Object[_0x250aee(0x385)](tog_nicconnect)[_0x250aee(0x1cd)](_0x1bf412 => {
            var _0x5cba79 = _0x250aee,
                _0x4bb8bd = tog_nicconnect[_0x1bf412],
                _0x259480 = ';';
            if (document[_0x5cba79(0x431)](_0x4bb8bd[_0x5cba79(0x34e)][_0x5cba79(0x320)]('.', '_'))) _0x259480 = document[_0x5cba79(0x431)](_0x4bb8bd[_0x5cba79(0x34e)][_0x5cba79(0x320)]('.', '_'));
            else {
                var _0x4020fd = document[_0x5cba79(0x3bd)](_0x4bb8bd[_0x5cba79(0x34e)]['replaceAll']('.', '_'));
                _0x259480 = _0x4020fd[0x0];
            }
            var _0x3487a8 = '';
            if (document[_0x5cba79(0x431)](_0x4bb8bd[_0x5cba79(0x2e4)][_0x5cba79(0x320)]('.', '_'))) _0x3487a8 = document[_0x5cba79(0x431)](_0x4bb8bd[_0x5cba79(0x2e4)][_0x5cba79(0x320)]('.', '_'));
            else {
                var _0x232b46 = document['getElementsByClassName'](_0x4bb8bd[_0x5cba79(0x2e4)][_0x5cba79(0x320)]('.', '_'));
                _0x3487a8 = _0x232b46[0x0];
            }
            if (_0x259480 != null && _0x3487a8 != null && _0x3487a8 != undefined) {
                var _0xfbbd39;
                if (_0x4bb8bd['status'][_0x5cba79(0x2da)]() == '2') {
                    var _0x45837e = new LeaderLine(_0x259480, _0x3487a8, {
                        'hide': !![],
                        'color': _0x5cba79(0x354),
                        'positionByWindowResize': ![],
                        'size': 0x2,
                        'endPlug': _0x5cba79(0x1be),
                        'startPlug': _0x5cba79(0x439),
                        'startPlugColor': _0x5cba79(0x425),
                        'outlineColor': _0x5cba79(0x425),
                        'endPlugColor': _0x5cba79(0x425),
                        'outline': !![],
                        'startPlugOutline': !![],
                        'endPlugOutline': !![],
                        'startPlugOutlineColor': _0x5cba79(0x3af),
                        'endPlugOutlineColor': '#000000'
                    });
                    _0x259480['addEventListener'](_0x5cba79(0x308), function () {
                        var _0x4a71c0 = _0x5cba79;
                        _0x45837e[_0x4a71c0(0x2e0)]([_0x4a71c0(0x1ff)[{
                            'duration': 0x12c,
                            'timing': _0x4a71c0(0x282)
                        }]]);
                    }, ![]), _0x259480['addEventListener'](_0x5cba79(0x38d), function () {
                        var _0x55d15e = _0x5cba79;
                        _0x45837e[_0x55d15e(0x3d1)](['fade'[{
                            'duration': 0x12c,
                            'timing': _0x55d15e(0x282)
                        }]]);
                    }, ![]), _0x3487a8[_0x5cba79(0x309)](_0x5cba79(0x308), function () {
                        var _0x1dfbec = _0x5cba79;
                        _0x45837e['show']([_0x1dfbec(0x1ff)[{
                            'duration': 0x12c,
                            'timing': _0x1dfbec(0x282)
                        }]]);
                    }, ![]), _0x3487a8[_0x5cba79(0x309)](_0x5cba79(0x38d), function () {
                        var _0x267cc4 = _0x5cba79;
                        _0x45837e[_0x267cc4(0x3d1)]([_0x267cc4(0x1ff)[{
                            'duration': 0x12c,
                            'timing': _0x267cc4(0x282)
                        }]]);
                    }, ![]), $(_0x5cba79(0x1bb))['on'](_0x5cba79(0x4c6), AnimEvent[_0x5cba79(0x489)](function () {
                        var _0x4c18b4 = _0x5cba79;
                        _0x45837e[_0x4c18b4(0x49e)]();
                    })), $(_0x5cba79(0x336))[_0x5cba79(0x2f5)](function () {
                        var _0x4bcd52 = _0x5cba79;
                        $(this)['on']('click', AnimEvent[_0x4bcd52(0x489)](function () {
                            setTimeout(function () {
                                _0x45837e['position']();
                            }, 0x7d0);
                        }));
                    }), $('.fancy')['each'](function () {
                        $(this)['on']('click', AnimEvent['add'](function () {
                            setTimeout(function () {
                                _0x45837e['position']();
                            }, 0x7d0);
                        }));
                    }), getarrowdata('s' + _0x4bb8bd[_0x5cba79(0x34e)][_0x5cba79(0x320)]('.', '_'), _0x45837e), niccon_links[_0x4bb8bd[_0x5cba79(0x34e)][_0x5cba79(0x320)]('.', '_')] = _0x45837e;
                } else {
                    var _0x3e7ace = '';
                    switch (_0x4bb8bd['status']) {
                        case 0x1:
                            _0xfbbd39 = _0x5cba79(0x27b), _0x3e7ace = _0x5cba79(0x25e);
                            break;
                        case 0x0:
                            _0xfbbd39 = _0x5cba79(0x27a), _0x3e7ace = _0x5cba79(0x2fd);
                            break;
                        default:
                            _0x3e7ace = 'grey', _0xfbbd39 = _0x5cba79(0x27a);
                    }
                    var _0x45837e = new LeaderLine(_0x259480, _0x3487a8, {
                        'color': _0xfbbd39,
                        'positionByWindowResize': ![],
                        'size': 0x2,
                        'endPlug': 'square',
                        'startPlug': 'disc',
                        'startPlugColor': _0x3e7ace,
                        'outlineColor': _0x3e7ace,
                        'endPlugColor': _0x3e7ace,
                        'outline': !![],
                        'startPlugOutline': !![],
                        'endPlugOutline': !![],
                        'startPlugOutlineColor': _0x5cba79(0x3af),
                        'endPlugOutlineColor': _0x5cba79(0x3af)
                    });
                    $(_0x5cba79(0x1bb))['on'](_0x5cba79(0x4c6), AnimEvent[_0x5cba79(0x489)](function () {
                        var _0x23888e = _0x5cba79;
                        _0x45837e[_0x23888e(0x49e)]();
                    })), $(_0x5cba79(0x336))[_0x5cba79(0x2f5)](function () {
                        var _0x286ca8 = _0x5cba79;
                        $(this)['on'](_0x286ca8(0x33b), AnimEvent['add'](function () {
                            setTimeout(function () {
                                _0x45837e['position']();
                            }, 0x7d0);
                        }));
                    }), $(_0x5cba79(0x37d))[_0x5cba79(0x2f5)](function () {
                        var _0x4d9a5e = _0x5cba79;
                        $(this)['on'](_0x4d9a5e(0x33b), AnimEvent[_0x4d9a5e(0x489)](function () {
                            setTimeout(function () {
                                var _0x1ddf93 = _0x5292;
                                _0x45837e[_0x1ddf93(0x49e)]();
                            }, 0x7d0);
                        }));
                    }), getarrowdata('s' + _0x4bb8bd['start']['replaceAll']('.', '_'), _0x45837e), niccon_links[_0x4bb8bd[_0x5cba79(0x34e)][_0x5cba79(0x320)]('.', '_')] = _0x45837e;
                }
            }
        }), Object[_0x250aee(0x385)](tog_arrowdata)[_0x250aee(0x1cd)](_0x329f99 => {
            var _0x118a1c = _0x250aee,
                _0x3f48d2 = tog_arrowdata[_0x329f99],
                _0x108f73 = _0x3f48d2['start'][_0x118a1c(0x444)](':')[0x1],
                _0x5c1f6a = '',
                _0x4cf3a3 = '',
                _0x1ebc3b = '';
            if (_0x3f48d2[_0x118a1c(0x34e)][_0x118a1c(0x1f9)](':p')) _0x3f48d2[_0x118a1c(0x34e)][_0x118a1c(0x1f9)](':') ? _0x5c1f6a = 'p_' + _0x3f48d2[_0x118a1c(0x34e)]['split'](':')[0x0]['replaceAll']('.', '_') : _0x5c1f6a = 'p_' + _0x3f48d2[_0x118a1c(0x34e)]['replaceAll']('.', '_'), _0x4cf3a3 = _0x5c1f6a['split']('p_')[0x1];
            else _0x3f48d2[_0x118a1c(0x34e)][_0x118a1c(0x1f9)](':s') && (_0x3f48d2[_0x118a1c(0x34e)][_0x118a1c(0x1f9)](':') ? _0x5c1f6a = 's_' + _0x3f48d2['start'][_0x118a1c(0x444)](':')[0x0]['replaceAll']('.', '_') : _0x5c1f6a = 's_' + _0x3f48d2[_0x118a1c(0x34e)][_0x118a1c(0x320)]('.', '_'), _0x4cf3a3 = _0x5c1f6a[_0x118a1c(0x444)]('s_')[0x1]);
            if (_0x3f48d2[_0x118a1c(0x2e4)] != _0x118a1c(0x4c5) && jQuery['isEmptyObject'](_0x3f48d2[_0x118a1c(0x2e4)]) != !![] && _0x3f48d2[_0x118a1c(0x2e4)] != _0x118a1c(0x432)) {
                var _0x2b1026 = document['getElementById'](_0x5c1f6a)[_0x118a1c(0x431)](_0x3f48d2['start'][_0x118a1c(0x444)](':')[0x1]),
                    _0x49f341 = '',
                    _0x38764d = '';
                if (_0x3f48d2[_0x118a1c(0x2e4)][_0x118a1c(0x1f9)](':p')) _0x38764d = 'p_' + _0x3f48d2[_0x118a1c(0x2e4)][_0x118a1c(0x444)](':')[0x0]['replaceAll']('.', '_'), _0x1ebc3b = _0x38764d['split']('p_')[0x1];
                else _0x3f48d2[_0x118a1c(0x2e4)][_0x118a1c(0x1f9)](':s') && (_0x38764d = 's_' + _0x3f48d2[_0x118a1c(0x2e4)]['split'](':')[0x0][_0x118a1c(0x320)]('.', '_'), _0x1ebc3b = _0x38764d['split']('s_')[0x1]);
                if (_0x3f48d2[_0x118a1c(0x2e4)][_0x118a1c(0x1f9)](':') && document[_0x118a1c(0x431)](_0x3f48d2[_0x118a1c(0x2e4)][_0x118a1c(0x444)](':')[0x0][_0x118a1c(0x320)]('.', '_')) != null) _0x49f341 = document[_0x118a1c(0x431)](_0x38764d)[_0x118a1c(0x431)](_0x3f48d2[_0x118a1c(0x2e4)]['split'](':')[0x1]);
                else {
                    var _0x580ee3 = document['getElementsByName'](_0x3f48d2[_0x118a1c(0x2e4)][_0x118a1c(0x444)](':')[0x0][_0x118a1c(0x320)]('.', '_') + _0x118a1c(0x32a)),
                        _0x1b3a4f = document[_0x118a1c(0x3bd)](_0x3f48d2['end'][_0x118a1c(0x444)](':')[0x0][_0x118a1c(0x320)]('.', '_') + ':NIC');
                    _0x49f341 = _0x1b3a4f[0x0];
                }
                if (_0x108f73 != undefined && _0x108f73 != null && _0x2b1026 != null && _0x49f341 != null && _0x49f341 != undefined) {
                    var _0x3deaca;
                    if (_0x3f48d2[_0x118a1c(0x34d)][_0x118a1c(0x2da)]() == '2') {
                        var _0xe14e3d = document['getElementById'](_0x118a1c(0x36b)),
                            _0x19e9d4 = new LeaderLine(_0x2b1026, _0x49f341, {
                                'color': _0x118a1c(0x354),
                                'hide': !![],
                                'positionByWindowResize': ![],
                                'size': 0x2,
                                'endPlug': _0x118a1c(0x1be),
                                'startPlug': _0x118a1c(0x439),
                                'startPlugColor': _0x118a1c(0x425),
                                'outlineColor': _0x118a1c(0x425),
                                'endPlugColor': _0x118a1c(0x425),
                                'outline': !![],
                                'startPlugOutline': !![],
                                'endPlugOutline': !![],
                                'startPlugOutlineColor': _0x118a1c(0x3af),
                                'endPlugOutlineColor': _0x118a1c(0x3af)
                            });
                        _0x2b1026[_0x118a1c(0x309)](_0x118a1c(0x308), function () {
                            var _0x2dc248 = _0x118a1c;
                            _0x19e9d4[_0x2dc248(0x2e0)]([_0x2dc248(0x1ff)[{
                                'duration': 0x12c,
                                'timing': _0x2dc248(0x282)
                            }]]);
                        }, ![]), _0x2b1026['addEventListener'](_0x118a1c(0x38d), function () {
                            var _0x3b51c0 = _0x118a1c;
                            _0x19e9d4['hide']([_0x3b51c0(0x1ff)[{
                                'duration': 0x12c,
                                'timing': _0x3b51c0(0x282)
                            }]]);
                        }, ![]), _0x49f341[_0x118a1c(0x309)]('mouseover', function () {
                            var _0x173099 = _0x118a1c;
                            _0x19e9d4['show']([_0x173099(0x1ff)[{
                                'duration': 0x12c,
                                'timing': 'linear'
                            }]]);
                        }, ![]), _0x49f341[_0x118a1c(0x309)](_0x118a1c(0x38d), function () {
                            var _0x2ceda1 = _0x118a1c;
                            _0x19e9d4[_0x2ceda1(0x3d1)]([_0x2ceda1(0x1ff)[{
                                'duration': 0x12c,
                                'timing': _0x2ceda1(0x282)
                            }]]);
                        }, ![]), $('#g-switch')['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            var _0xbeb4a1 = _0x118a1c;
                            _0x19e9d4[_0xbeb4a1(0x49e)]();
                        })), $(_0x118a1c(0x271))['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            var _0x3d1c19 = _0x118a1c;
                            _0x19e9d4[_0x3d1c19(0x49e)]();
                        })), $(_0x118a1c(0x471))['on']('scroll', AnimEvent[_0x118a1c(0x489)](function () {
                            _0x19e9d4['position']();
                        })), $('#g-div')['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            var _0x37cee2 = _0x118a1c;
                            _0x19e9d4[_0x37cee2(0x49e)]();
                        })), $(_0x118a1c(0x2e3))['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            var _0x4fe1c7 = _0x118a1c;
                            _0x19e9d4[_0x4fe1c7(0x49e)]();
                        })), $(_0x118a1c(0x312))['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            var _0x4165f6 = _0x118a1c;
                            _0x19e9d4[_0x4165f6(0x49e)]();
                        })), $(_0x118a1c(0x3ee))['on']('scroll', AnimEvent[_0x118a1c(0x489)](function () {
                            _0x19e9d4['position']();
                        })), $(_0x118a1c(0x1f7))['on']('scroll', AnimEvent[_0x118a1c(0x489)](function () {
                            _0x19e9d4['position']();
                        })), $(_0x118a1c(0x336))[_0x118a1c(0x2f5)](function () {
                            var _0x93657e = _0x118a1c;
                            $(this)['on'](_0x93657e(0x33b), AnimEvent[_0x93657e(0x489)](function () {
                                setTimeout(function () {
                                    var _0x337821 = _0x5292;
                                    _0x19e9d4[_0x337821(0x49e)]();
                                }, 0x7d0);
                            }));
                        }), $(_0x118a1c(0x37d))['each'](function () {
                            var _0x4744bd = _0x118a1c;
                            $(this)['on']('click', AnimEvent[_0x4744bd(0x489)](function () {
                                setTimeout(function () {
                                    var _0x370440 = _0x5292;
                                    _0x19e9d4[_0x370440(0x49e)]();
                                }, 0x7d0);
                            }));
                        });
                    } else {
                        var _0x4b1da3 = '';
                        switch (_0x3f48d2[_0x118a1c(0x34d)]) {
                            case 0x0:
                                _0x3deaca = _0x118a1c(0x27a), _0x4b1da3 = _0x118a1c(0x2fd);
                                break;
                            case 0x1:
                                _0x3deaca = _0x118a1c(0x27b), _0x4b1da3 = 'orange';
                                break;
                            default:
                                _0x4b1da3 = _0x118a1c(0x2e5), _0x3deaca = '#ffffff';
                        }
                        var _0x19e9d4 = new LeaderLine(_0x2b1026, _0x49f341, {
                            'color': _0x3deaca,
                            'positionByWindowResize': ![],
                            'size': 0x2,
                            'endPlug': 'square',
                            'startPlug': _0x118a1c(0x439),
                            'startPlugColor': _0x4b1da3,
                            'outlineColor': _0x4b1da3,
                            'endPlugColor': _0x4b1da3,
                            'outline': !![],
                            'startPlugOutline': !![],
                            'endPlugOutline': !![],
                            'startPlugOutlineColor': _0x118a1c(0x3af),
                            'endPlugOutlineColor': _0x118a1c(0x3af)
                        });
                        $('#g-switch')['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            var _0x5380bc = _0x118a1c;
                            _0x19e9d4[_0x5380bc(0x49e)]();
                        })), $(_0x118a1c(0x271))['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            var _0x2f743e = _0x118a1c;
                            _0x19e9d4[_0x2f743e(0x49e)]();
                        })), $(_0x118a1c(0x471))['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            _0x19e9d4['position']();
                        })), $(_0x118a1c(0x2a8))['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            var _0x23cf4a = _0x118a1c;
                            _0x19e9d4[_0x23cf4a(0x49e)]();
                        })), $('#s_hw')['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            var _0xb01f7c = _0x118a1c;
                            _0x19e9d4[_0xb01f7c(0x49e)]();
                        })), $(_0x118a1c(0x312))['on'](_0x118a1c(0x4c6), AnimEvent[_0x118a1c(0x489)](function () {
                            var _0x257631 = _0x118a1c;
                            _0x19e9d4[_0x257631(0x49e)]();
                        })), $(_0x118a1c(0x3ee))['on'](_0x118a1c(0x4c6), AnimEvent['add'](function () {
                            var _0x1f79b1 = _0x118a1c;
                            _0x19e9d4[_0x1f79b1(0x49e)]();
                        })), $(_0x118a1c(0x1f7))['on']('scroll', AnimEvent['add'](function () {
                            var _0x6b3124 = _0x118a1c;
                            _0x19e9d4[_0x6b3124(0x49e)]();
                        })), $(_0x118a1c(0x336))[_0x118a1c(0x2f5)](function () {
                            var _0x4bb21c = _0x118a1c;
                            $(this)['on'](_0x4bb21c(0x33b), AnimEvent[_0x4bb21c(0x489)](function () {
                                setTimeout(function () {
                                    var _0xc2aa91 = _0x5292;
                                    _0x19e9d4[_0xc2aa91(0x49e)]();
                                }, 0x7d0);
                            }));
                        }), $(_0x118a1c(0x37d))['each'](function () {
                            var _0x2f8a2a = _0x118a1c;
                            $(this)['on'](_0x2f8a2a(0x33b), AnimEvent[_0x2f8a2a(0x489)](function () {
                                setTimeout(function () {
                                    var _0x4f40ad = _0x5292;
                                    _0x19e9d4[_0x4f40ad(0x49e)]();
                                }, 0x7d0);
                            }));
                        });
                    }
                }
            }
        }));
    });
});

function anim_evtHandler(_0x2c1602) {
    var _0x11e18d = _0x81ccdf;
    _0x2c1602[_0x11e18d(0x49e)](), AnimEvent[_0x11e18d(0x489)](function () {
        var _0xee0e64 = _0x11e18d;
        _0x2c1602[_0xee0e64(0x49e)]();
    });
}

function anim_eventHandler(_0x36e045) {
    var _0x1e70e2 = _0x81ccdf;
    AnimEvent[_0x1e70e2(0x489)](function () {
        setTimeout(function () {
            _0x36e045['position']();
        }, 0x7d0);
    });
}

function getniccondata(_0x1e5008, _0x4415de, _0x332865, _0x1365cc) {
    var _0x32c499 = _0x81ccdf;
    tog_nicconnect[_0x1e5008[_0x32c499(0x320)]('.', '_')] = {
        'start': _0x1e5008,
        'end': _0x4415de,
        'status': _0x332865
    }, niccon_links[_0x1e5008[_0x32c499(0x320)]('.', '_')] = _0x1365cc;
}

function updatedarrowdata(_0x261cdc, _0x442858, _0x4f763f, _0x16f3c7, _0xbd5689) {
    var _0x43215b = _0x81ccdf;
    tog_arrowdata[_0x261cdc['replaceAll']('.', '_') + ':' + _0x442858] = {
        'start': _0x261cdc + ':' + _0x442858,
        'end': _0x4f763f,
        'status': _0x16f3c7
    }, arrow_links[_0x261cdc[_0x43215b(0x320)]('.', '_') + ':' + _0x442858] = _0xbd5689;
}

function categorizeColor(_0x3f8659) {
    var _0x36a5ec = _0x81ccdf;
    _0x3f8659 = _0x3f8659[_0x36a5ec(0x327)](/\s/g, '');
    const _0x22426e = {
        'green': _0x36a5ec(0x43a),
        'red': _0x36a5ec(0x2bd),
        'white': _0x36a5ec(0x3e4),
        'orange': _0x36a5ec(0x222),
        'black': _0x36a5ec(0x1c5)
    };
    if (_0x3f8659 in _0x22426e) return _0x3f8659;
    const _0x2debfa = _0x3f8659[_0x36a5ec(0x3f8)](/\d+/g);
    if (!_0x2debfa || _0x2debfa['length'] !== 0x3) return _0x36a5ec(0x49c);
    const [_0x690487, _0x528c79, _0x1ca37f] = _0x2debfa['map'](Number);
    let _0x5ea345 = 'Unknown',
        _0x2b85bf = Number[_0x36a5ec(0x2ed)];
    for (const _0x3d70c6 in _0x22426e) {
        const _0xe40f25 = _0x22426e[_0x3d70c6],
            [_0x3c1b08, _0xdb46f0, _0x490428] = _0xe40f25['match'](/\d+/g)[_0x36a5ec(0x3a8)](Number),
            _0x37e00b = Math[_0x36a5ec(0x47f)]((_0x3c1b08 - _0x690487) ** 0x2 + (_0xdb46f0 - _0x528c79) ** 0x2 + (_0x490428 - _0x1ca37f) ** 0x2);
        _0x37e00b < _0x2b85bf && (_0x2b85bf = _0x37e00b, _0x5ea345 = _0x3d70c6);
    }
    return _0x5ea345;
}

function getNormalizedColor(_0x16345e) {
    var _0x4e0157 = _0x81ccdf;
    if (_0x16345e[_0x4e0157(0x262)]('rgb')) {
        const _0x1d35cb = _0x16345e[_0x4e0157(0x3f8)](/\d+/g);
        if (_0x1d35cb && _0x1d35cb[_0x4e0157(0x1bd)] === 0x3) return _0x4e0157(0x2f6) + _0x1d35cb[0x0] + ',\x20' + _0x1d35cb[0x1] + ',\x20' + _0x1d35cb[0x2] + ')';
    }
    return _0x16345e['toLowerCase']()[_0x4e0157(0x355)]();
}

function customSort(_0x2400a6, _0x610310) {
    var _0x1eab69 = _0x81ccdf;
    const _0x51a2da = getNormalizedColor(_0x2400a6[_0x1eab69(0x301)]('.badge')['style'][_0x1eab69(0x415)]),
        _0x647d9 = getNormalizedColor(_0x610310[_0x1eab69(0x301)](_0x1eab69(0x3d7))[_0x1eab69(0x3b0)][_0x1eab69(0x415)]),
        _0x2cbec2 = parseInt(_0x2400a6[_0x1eab69(0x301)]('.num-data')[_0x1eab69(0x1ca)]),
        _0x4094b0 = parseInt(_0x610310[_0x1eab69(0x301)](_0x1eab69(0x458))[_0x1eab69(0x1ca)]);
    return _0x51a2da === _0x647d9 ? _0x4094b0 - _0x2cbec2 : badgeColorSort(_0x51a2da, _0x647d9);
}

function badgeColorSort(_0x3ccb2f, _0x76355) {
    var _0x5bc0e4 = _0x81ccdf;
    const _0x1606fa = [_0x5bc0e4(0x2fd), _0x5bc0e4(0x25e), _0x5bc0e4(0x24d), _0x5bc0e4(0x425), 'black'];
    return _0x1606fa[_0x5bc0e4(0x23a)](_0x3ccb2f) - _0x1606fa[_0x5bc0e4(0x23a)](_0x76355);
}

function sortAndGroupElements(_0x3649d4) {
    var _0x1d4fa2 = _0x81ccdf;
    const _0x2b0976 = Array[_0x1d4fa2(0x3db)](_0x3649d4[_0x1d4fa2(0x488)]('a'));
    _0x2b0976['sort'](customSort);
    const _0x59fc98 = {};
    _0x2b0976[_0x1d4fa2(0x1cd)](_0x39f091 => {
        var _0xcc70f0 = _0x1d4fa2;
        const _0xf02b8a = categorizeColor(_0x39f091['style'][_0xcc70f0(0x3c3)]);
        _0xf02b8a && _0x39f091[_0xcc70f0(0x4e9)][_0xcc70f0(0x489)](_0xf02b8a + '_class'), !_0x59fc98[_0xf02b8a] && (_0x59fc98[_0xf02b8a] = []), _0x59fc98[_0xf02b8a][_0xcc70f0(0x250)](_0x39f091);
    });
    const _0x301a57 = [_0x1d4fa2(0x2fd), _0x1d4fa2(0x25e), 'white', 'green', _0x1d4fa2(0x41b)],
        _0x215c7a = [];
    _0x301a57[_0x1d4fa2(0x1cd)](_0x365fcb => {
        _0x59fc98[_0x365fcb] && _0x215c7a['push'](_0x59fc98[_0x365fcb]);
    }), _0x3649d4[_0x1d4fa2(0x46e)] = '', _0x215c7a[_0x1d4fa2(0x1cd)](_0x1fd88b => {
        var _0x2e9be0 = _0x1d4fa2;
        _0x1fd88b[_0x2e9be0(0x3f9)](customSort), _0x1fd88b['forEach'](_0x7eee4b => _0x3649d4['appendChild'](_0x7eee4b));
    });
}
const psHw = document[_0x81ccdf(0x431)](_0x81ccdf(0x4ce)),
    vmsHw = document[_0x81ccdf(0x431)](_0x81ccdf(0x30e));

function getSwitchXML() {
    var _0x2866cd = _0x81ccdf;
    requestDataFromServer('/getfilecontent', {
        'filename': '24_switch.j2'
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0xce77b6) {
        swi_xml_24 = _0xce77b6;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x44d)
    }, 'GET')[_0x2866cd(0x338)](function (_0x32b79f) {
        swi_xml_24stack = _0x32b79f;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': '48_switch.j2'
    }, 'GET')[_0x2866cd(0x338)](function (_0x328858) {
        swi_xml_48 = _0x328858;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x2f1)
    }, _0x2866cd(0x1c9))['done'](function (_0x2ae9a3) {
        swi_xml_48stack = _0x2ae9a3;
    }), requestDataFromServer('/getfilecontent', {
        'filename': 'fortigate_firewall.j2'
    }, _0x2866cd(0x1c9))['done'](function (_0x2ea04f) {
        swi_xml_fortigate = _0x2ea04f;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x468)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x424b74) {
        swi_xml_fortigatestack = _0x424b74;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x3ea)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x4a599e) {
        swi_xml_fortigate50E = _0x4a599e;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x363)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x2cd4e4) {
        swi_xml_fortigatestack50E = _0x2cd4e4;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x4bf)
    }, 'GET')[_0x2866cd(0x338)](function (_0x54be65) {
        swi_xml_fortigate60E = _0x54be65;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'fortigate_firewall_stack_60E.j2'
    }, _0x2866cd(0x1c9))['done'](function (_0x7cc4c3) {
        swi_xml_fortigatestack60E = _0x7cc4c3;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'fortigate_firewall_60F.j2'
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x2bde60) {
        swi_xml_fortigate60F = _0x2bde60;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x41a)
    }, 'GET')[_0x2866cd(0x338)](function (_0x14e364) {
        swi_xml_fortigate80F = _0x14e364;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x2a4)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x4b8960) {
        swi_xml_fortigatestack80F = _0x4b8960;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x427)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x3b8a91) {
        swi_xml_fortigatestack60F = _0x3b8a91;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x348)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x1bdf8b) {
        swi_xml_fortigate100E = _0x1bdf8b;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'fortigate_firewall_stack_100E.j2'
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x49e92a) {
        swi_xml_fortigatestack100E = _0x49e92a;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'fortigate_firewall_100F.j2'
    }, _0x2866cd(0x1c9))['done'](function (_0x281dea) {
        swi_xml_fortigate100F = _0x281dea;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x3b4)
    }, _0x2866cd(0x1c9))['done'](function (_0x5223bf) {
        swi_xml_fortigatestack100F = _0x5223bf;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x372)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0xf76400) {
        swi_xml_fortigate200F = _0xf76400;
    }), requestDataFromServer('/getfilecontent', {
        'filename': _0x2866cd(0x279)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x23a27c) {
        swi_xml_fortigatestack200F = _0x23a27c;
    }), requestDataFromServer('/getfilecontent', {
        'filename': _0x2866cd(0x1b3)
    }, 'GET')[_0x2866cd(0x338)](function (_0xa46113) {
        swi_xml_router_4321 = _0xa46113;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x2d7)
    }, 'GET')[_0x2866cd(0x338)](function (_0x44f342) {
        swi_xml_32 = _0x44f342;
    }), requestDataFromServer('/getfilecontent', {
        'filename': _0x2866cd(0x1d6)
    }, 'GET')[_0x2866cd(0x338)](function (_0x460290) {
        swi_xml_32stack = _0x460290;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x303)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x49f1b3) {
        swi_xml_L24T4X_A1 = _0x49f1b3;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x1fe)
    }, 'GET')[_0x2866cd(0x338)](function (_0x4afb7d) {
        swi_xml_L24T4X_A1_stc = _0x4afb7d;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x321)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x4ac690) {
        swi_xml_S5720_52X = _0x4ac690;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'Huawei_S5720_52X_LI_AC_stack.j2'
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x5e774d) {
        swi_xml_S5720_52X_stc = _0x5e774d;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'Cisco_Catalyst_2960_S.j2'
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x5c8fd8) {
        swi_xml_Cisco_2960 = _0x5c8fd8;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x29c)
    }, _0x2866cd(0x1c9))['done'](function (_0x41d88e) {
        swi_xml_Cisco_2960_stc = _0x41d88e;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x1e7)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x2ac15d) {
        swi_xml_S6720S_24S = _0x2ac15d;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x259)
    }, _0x2866cd(0x1c9))['done'](function (_0x35119b) {
        swi_xml_S6720S_24S_stc = _0x35119b;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x416)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x103bf6) {
        swi_xml_C2960_48TT = _0x103bf6;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x20d)
    }, 'GET')['done'](function (_0x2d2d2d) {
        swi_xml_C2960_48TT_stc = _0x2d2d2d;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'cisco_SG350X_24.j2'
    }, _0x2866cd(0x1c9))['done'](function (_0x3c6eae) {
        swi_xml_SG350X_24 = _0x3c6eae;
    }), requestDataFromServer('/getfilecontent', {
        'filename': 'cisco_SG350X_24_stack.j2'
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x25dec8) {
        swi_xml_SG350X_24_stc = _0x25dec8;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'BARRACUDA_300.j2'
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x2a48ec) {
        swi_xml_barracuda = _0x2a48ec;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'BARRACUDA_300_stack.j2'
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x41d3d6) {
        swi_xml_barracuda_stc = _0x41d3d6;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x419)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x3d284b) {
        swi_xml_big_ip = _0x3d284b;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x402)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x5ee1bf) {
        swi_xml_big_ip_stc = _0x5ee1bf;
    }), requestDataFromServer('/getfilecontent', {
        'filename': _0x2866cd(0x40f)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x2e0832) {
        swi_xml_cisco_2911 = _0x2e0832;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'Cisco_2911_stack.j2'
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x267893) {
        swi_xml_cisco_2911_stc = _0x267893;
    }), requestDataFromServer('/getfilecontent', {
        'filename': _0x2866cd(0x29a)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x5b228e) {
        swi_xml_cisco_2921 = _0x5b228e;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x1d3)
    }, _0x2866cd(0x1c9))['done'](function (_0x4dd1b1) {
        swi_xml_cisco_2921_stc = _0x4dd1b1;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x248)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x4a4690) {
        swi_xml_cisco_2960 = _0x4a4690;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x216)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x30eb82) {
        swi_xml_cisco_2960_stc = _0x30eb82;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x257)
    }, 'GET')[_0x2866cd(0x338)](function (_0x35223f) {
        swi_xml_cisco_3945 = _0x35223f;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x408)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x31dff6) {
        swi_xml_cisco_3945_stc = _0x31dff6;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x4eb)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x56d66e) {
        swi_xml_cisco_ftd = _0x56d66e;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x371)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0xea7d5d) {
        swi_xml_cisco_ftd_stc = _0xea7d5d;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x3ed)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x5bdcc1) {
        swi_xml_cisco_isr = _0x5bdcc1;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x2eb)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x35ec09) {
        swi_xml_cisco_isr_stc = _0x35ec09;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x482)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x4af107) {
        swi_xml_cisco_nexus = _0x4af107;
    }), requestDataFromServer('/getfilecontent', {
        'filename': _0x2866cd(0x38c)
    }, _0x2866cd(0x1c9))['done'](function (_0x5ca4a6) {
        swi_xml_cisco_nexus_stc = _0x5ca4a6;
    }), requestDataFromServer('/getfilecontent', {
        'filename': _0x2866cd(0x4e6)
    }, 'GET')[_0x2866cd(0x338)](function (_0x33162d) {
        swi_xml_hpe_sn3600b = _0x33162d;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'HPE_SN3600B_FC_stack.j2'
    }, _0x2866cd(0x1c9))['done'](function (_0x5ee294) {
        swi_xml_hpe_sn3600b_stc = _0x5ee294;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x418)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0xefeb04) {
        swi_xml_netapp_aff = _0xefeb04;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': 'NetApp_AFF_A200_stack.j2'
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x34a50a) {
        swi_xml_netapp_aff_stc = _0x34a50a;
    }), requestDataFromServer('/getfilecontent', {
        'filename': _0x2866cd(0x463)
    }, _0x2866cd(0x1c9))[_0x2866cd(0x338)](function (_0x402c1b) {
        swi_xml_radware_brox10 = _0x402c1b;
    }), requestDataFromServer(_0x2866cd(0x369), {
        'filename': _0x2866cd(0x39e)
    }, _0x2866cd(0x1c9))['done'](function (_0x1d0c1) {
        swi_xml_radware_brox10_stc = _0x1d0c1;
    });
}

function getSiteNames() {
    var _0xfeca44 = _0x81ccdf;
    requestDataFromServer('/lesites/getallsitenames', {
        'type': _0xfeca44(0x4b7),
        'site': params['get'](_0xfeca44(0x461))
    }, _0xfeca44(0x1c9))[_0xfeca44(0x338)](function (_0x49f47b) {
        var _0x1aacb8 = _0xfeca44;
        res = JSON[_0x1aacb8(0x4cd)](_0x49f47b), res[_0x1aacb8(0x34d)] == 0xc8 && (siteResponse = res['data'], leurl = siteResponse[0x0][_0x1aacb8(0x366)]), getServerHostData();
    });
}

function statusFunction(_0x1a661e) {
    var _0x12a993 = _0x81ccdf;
    isCalledStompCon = ![];
    var _0x26c860 = $(_0x1a661e)[_0x12a993(0x1e8)](_0x12a993(0x27f)),
        _0x379f50 = $(_0x1a661e)[_0x12a993(0x1e8)]('id')[_0x12a993(0x444)](_0x12a993(0x36e))[0x1];
    _0x26c860 === 'pills-all' ? (cyGraph[_0x12a993(0x1d5) + _0x379f50][_0x12a993(0x43b)]()[_0x12a993(0x346)](_0x12a993(0x423)), cyGraph['s_sw' + _0x379f50][_0x12a993(0x43b)]()[_0x12a993(0x346)](_0x12a993(0x24a)), cyGraph['s_sw' + _0x379f50][_0x12a993(0x43b)]()[_0x12a993(0x3b0)]({
        'line-color': _0x12a993(0x1f1),
        'target-arrow-color': _0x12a993(0x1f1)
    })) : (showLoader('node-view'), requestDataFromServer('../dashboard/getnodespecificdetails', {
        'nodeid': _0x26c860,
        'mode': '',
        'csrfmiddlewaretoken': csfr_token,
        'selectedSite': entitySelectedsite,
        'ip': _0x379f50
    }, type = 'POST')[_0x12a993(0x338)](searchNodeResponse));
}

function searchNodes(_0x3b0dc5) {
    var _0x32c017 = _0x81ccdf,
        _0x567f5f = $(_0x3b0dc5)['attr']('id')[_0x32c017(0x444)]('i_')[0x1];
    $(_0x3b0dc5)[_0x32c017(0x1e8)]('id')['includes'](_0x32c017(0x424)) && (_0x567f5f = $(_0x3b0dc5)[_0x32c017(0x1e8)]('id')['split'](_0x32c017(0x424))[0x1]);
    if (document[_0x32c017(0x431)](_0x32c017(0x1d5) + _0x567f5f)[_0x32c017(0x3b0)][_0x32c017(0x326)] == _0x32c017(0x275)) {
        var _0x1458a5 = $(_0x32c017(0x202) + _0x567f5f)['val']();
        valueLength = _0x1458a5[_0x32c017(0x355)]()[_0x32c017(0x1bd)];
        if (valueLength < 0x2) swal(_0x32c017(0x39a), '\x20', _0x32c017(0x1f0));
        else showLoader(_0x32c017(0x311)), requestDataFromServer(_0x32c017(0x382), {
            'nodeid': _0x1458a5,
            'mode': _0x32c017(0x3fa),
            'csrfmiddlewaretoken': csfr_token,
            'selectedSite': entitySelectedsite,
            'ip': _0x567f5f
        }, type = _0x32c017(0x2ca))[_0x32c017(0x338)](searchNodeResponse);
    }
}

function searchNodeResponse(_0x2b3370) {
    var _0x5b303a = _0x81ccdf;
    stopLoader(_0x5b303a(0x311));
    var _0xc635e4 = _0x2b3370[_0x5b303a(0x2a2)];
    if (_0xc635e4[_0x5b303a(0x34d)] == 0xc8) {
        var _0x3d7a96 = _0xc635e4[_0x5b303a(0x448)][_0x5b303a(0x1bd)];
        if (_0x3d7a96 > 0x0) {
            var _0x4aa66c = {};
            _0x4aa66c['nodes'] = _0x2b3370['nodedetails'], _0x4aa66c[_0x5b303a(0x3df)] = '', specificNodeDetails(_0x4aa66c);
        } else swal(_0x5b303a(0x3a5), '\x20', _0x5b303a(0x1f0));
    } else swal(_0x5b303a(0x410), 'Search\x20like\x20hostIp(172.16.0.2)\x20or\x20hostIp:serviceName(172.16.0.2:Info)', _0x5b303a(0x1f0));
}

function specificNodeDetails(_0x5452be) {
    var _0x592668 = _0x81ccdf,
        _0x4ec0e1 = _0x592668(0x449) + _0x5452be[_0x592668(0x462)][_0x592668(0x448)][0x0][0x7]['replaceAll']('.', '_');
    if (_0x5452be == undefined) return;
    var _0x1ef699 = _0x5452be,
        _0x5d5acf = _0x1ef699['nodes'];
    _0x5d5acf[_0x592668(0x34d)] == 0xc8 && (cyGraph[_0x4ec0e1][_0x592668(0x43b)]()['addClass'](_0x592668(0x423)), _0x5d5acf[_0x592668(0x448)][_0x592668(0x1cd)](function (_0x2ecb34) {
        var _0x5e0802 = _0x592668,
            _0x187148 = _0x2ecb34[0x1][_0x5e0802(0x444)](':')[0x1],
            _0x27a8ec = cyGraph[_0x4ec0e1][_0x5e0802(0x462)](_0x5e0802(0x4da) + _0x2ecb34[0x1] + '\x27]');
        _0x27a8ec[_0x5e0802(0x346)](_0x5e0802(0x423)), _0x27a8ec['addClass'](_0x5e0802(0x24a));
    }));
}

function onExport(_0x297bc9) {
    var _0x1ced66 = _0x81ccdf,
        _0x59bf79 = {
            'type': _0x297bc9,
            'tableName': 'Table\x20name'
        };
    $[_0x1ced66(0x3c7)](!![], options, _0x59bf79), $(_0x1ced66(0x2cb))['tableExport'](options);
}

function swapDivgswi(_0x204e7b, _0x421fb9, _0x266303) {
    var _0x1f1b6c = _0x81ccdf,
        _0x3110ea = $(_0x1f1b6c(0x373) + _0x421fb9)[_0x1f1b6c(0x2b5)](),
        _0x25277d = 's' + _0x3110ea[_0x1f1b6c(0x320)]('.', '_');
    _0x204e7b = document['getElementById'](_0x25277d), _0x204e7b[_0x1f1b6c(0x20f)]['insertBefore'](_0x204e7b, document['getElementById'](_0x421fb9)['children'][0x0]);
}

function swapDiv(_0x55336d, _0x47162d = '') {
    var _0x3581a2 = _0x81ccdf,
        _0x5026b5 = $('#overalltag')[_0x3581a2(0x2b5)]();
    if (_0x47162d == _0x3581a2(0x4ce)) _0x5026b5 = $(_0x3581a2(0x343))['val'](), swapid = _0x3581a2(0x375) + _0x5026b5['replaceAll']('.', '_') + _0x3581a2(0x32a), _0x55336d = document[_0x3581a2(0x431)](swapid), _0x55336d[_0x3581a2(0x20f)][_0x3581a2(0x4c4)](_0x55336d, document[_0x3581a2(0x431)](_0x3581a2(0x4ce))['children'][0x0]);
    else _0x47162d == _0x3581a2(0x30e) && (_0x5026b5 = $(_0x3581a2(0x2c7))[_0x3581a2(0x2b5)](), swapid = _0x3581a2(0x375) + _0x5026b5[_0x3581a2(0x320)]('.', '_') + _0x3581a2(0x32a), _0x55336d = document['getElementById'](swapid), _0x55336d[_0x3581a2(0x20f)][_0x3581a2(0x4c4)](_0x55336d, document[_0x3581a2(0x431)]('vms_hw')[_0x3581a2(0x392)][0x0]));
}

function swapServers() {
    var _0x53556c = _0x81ccdf,
        _0x24d727 = document[_0x53556c(0x488)](_0x53556c(0x235)),
        _0x4ad554 = document['getElementById'](_0x53556c(0x493))['getElementsByClassName'](_0x53556c(0x232)),
        _0x19424b = document['getElementById']('g_swi')[_0x53556c(0x3bd)]('critical_opaque'),
        _0x33f428 = document[_0x53556c(0x431)](_0x53556c(0x263))[_0x53556c(0x3bd)](_0x53556c(0x232)),
        _0x3d36a7 = document[_0x53556c(0x431)](_0x53556c(0x4b4))[_0x53556c(0x3bd)](_0x53556c(0x232)),
        _0x34b552 = document[_0x53556c(0x431)](_0x53556c(0x31c))['getElementsByClassName']('critical_opaque');
    Array[_0x53556c(0x3db)](_0x24d727)[_0x53556c(0x1cd)](function (_0x5da4d8) {
        var _0x409be6 = _0x53556c;
        _0x5da4d8['parentNode'][_0x409be6(0x4c4)](_0x5da4d8, document[_0x409be6(0x431)](_0x409be6(0x1d2))[_0x409be6(0x392)][0x0]);
    }), Array[_0x53556c(0x3db)](_0x4ad554)[_0x53556c(0x1cd)](function (_0x5a6f39) {
        var _0x3cdb2e = _0x53556c;
        _0x5a6f39['parentNode']['insertBefore'](_0x5a6f39, document[_0x3cdb2e(0x431)](_0x3cdb2e(0x493))[_0x3cdb2e(0x392)][0x0]);
    }), Array[_0x53556c(0x3db)](_0x19424b)[_0x53556c(0x1cd)](function (_0x1fbaac) {
        var _0x2b125a = _0x53556c;
        _0x1fbaac['parentNode'][_0x2b125a(0x4c4)](_0x1fbaac, document[_0x2b125a(0x431)](_0x2b125a(0x2e2))[_0x2b125a(0x392)][0x0]);
    }), Array[_0x53556c(0x3db)](_0x33f428)[_0x53556c(0x1cd)](function (_0x102316) {
        var _0x1047a5 = _0x53556c;
        _0x102316[_0x1047a5(0x20f)][_0x1047a5(0x4c4)](_0x102316, document[_0x1047a5(0x431)](_0x1047a5(0x263))[_0x1047a5(0x392)][0x0]);
    }), Array['from'](_0x34b552)[_0x53556c(0x1cd)](function (_0xac18d2) {
        var _0x491d3f = _0x53556c;
        _0xac18d2[_0x491d3f(0x20f)]['insertBefore'](_0xac18d2, document[_0x491d3f(0x431)](_0x491d3f(0x31c))[_0x491d3f(0x392)][0x0]);
    }), Array[_0x53556c(0x3db)](_0x3d36a7)[_0x53556c(0x1cd)](function (_0x2ef05e) {
        var _0xfc3c4 = _0x53556c;
        _0x2ef05e[_0xfc3c4(0x20f)][_0xfc3c4(0x4c4)](_0x2ef05e, document[_0xfc3c4(0x431)](_0xfc3c4(0x4b4))[_0xfc3c4(0x392)][0x0]);
    });
}

function tableNodes() {
    var _0x16db44 = _0x81ccdf,
        _0x414ebb, _0x5e10e0, _0x24fb3a, _0x284639, _0x13ae88, _0x3076a0, _0x5de624;
    _0x414ebb = document['getElementById'](_0x16db44(0x2a1)), _0x5e10e0 = _0x414ebb[_0x16db44(0x4e5)][_0x16db44(0x225)](), _0x24fb3a = document[_0x16db44(0x431)]('accordionExample'), _0x284639 = _0x24fb3a[_0x16db44(0x44c)]('tr');
    for (_0x3076a0 = 0x0; _0x3076a0 < _0x284639[_0x16db44(0x1bd)]; _0x3076a0++) {
        _0x13ae88 = _0x284639[_0x3076a0][_0x16db44(0x44c)]('td')[0x1], _0x13ae88 && (_0x5de624 = _0x13ae88[_0x16db44(0x1ca)] || _0x13ae88[_0x16db44(0x3c5)], _0x5de624[_0x16db44(0x225)]()[_0x16db44(0x23a)](_0x5e10e0) > -0x1 ? _0x284639[_0x3076a0][_0x16db44(0x3b0)][_0x16db44(0x326)] = '' : _0x284639[_0x3076a0][_0x16db44(0x3b0)]['display'] = _0x16db44(0x432));
    }
}

function getEntityData(_0x3a9683) {
    var _0x4e5b02 = _0x81ccdf;
    requestDataFromServer(_0x4e5b02(0x3ae), {
        'sitename': params['get']('site'),
        'layer': _0x4e5b02(0x1d5),
        'ip': _0x4e5b02(0x375) + _0x3a9683
    }, type = _0x4e5b02(0x1c9))['done'](function (_0x775d32) {
        fillNodeDetails(_0x775d32, 'ip_' + _0x3a9683);
    });
}

function getHardwareData() {
    var _0x31fb3d = _0x81ccdf;
    showLoader(_0x31fb3d(0x311)), requestDataFromServer(_0x31fb3d(0x3ae), {
        'sitename': params[_0x31fb3d(0x48c)](_0x31fb3d(0x461)),
        'layer': _0x31fb3d(0x1d2)
    }, type = _0x31fb3d(0x1c9))['done'](fillHWNodeDetails);
}

function categorizeColor(_0x22e6a4) {
    var _0x392d9f = _0x81ccdf;
    _0x22e6a4 = _0x22e6a4[_0x392d9f(0x327)](/\s/g, '');
    const _0x3f516e = {
        'green': _0x392d9f(0x43a),
        'red': _0x392d9f(0x2bd),
        'white': _0x392d9f(0x3e4),
        'orange': _0x392d9f(0x222),
        'black': _0x392d9f(0x1c5)
    };
    if (_0x22e6a4 in _0x3f516e) return _0x22e6a4;
    const _0x2dd39d = _0x22e6a4['match'](/\d+/g);
    if (!_0x2dd39d || _0x2dd39d[_0x392d9f(0x1bd)] !== 0x3) return _0x392d9f(0x49c);
    const [_0x149280, _0x2c803d, _0xff7fe4] = _0x2dd39d[_0x392d9f(0x3a8)](Number);
    let _0x4bb4cc = _0x392d9f(0x49c),
        _0x341fac = Number['MAX_VALUE'];
    for (const _0x1f9dc0 in _0x3f516e) {
        const _0x33b0e5 = _0x3f516e[_0x1f9dc0],
            [_0x45b5d7, _0x404d08, _0x2ad010] = _0x33b0e5[_0x392d9f(0x3f8)](/\d+/g)[_0x392d9f(0x3a8)](Number),
            _0x4dff67 = Math[_0x392d9f(0x47f)]((_0x45b5d7 - _0x149280) ** 0x2 + (_0x404d08 - _0x2c803d) ** 0x2 + (_0x2ad010 - _0xff7fe4) ** 0x2);
        _0x4dff67 < _0x341fac && (_0x341fac = _0x4dff67, _0x4bb4cc = _0x1f9dc0);
    }
    return _0x4bb4cc;
}

function thresholdfun(_0x5ac336) {
    var _0x1b08a4 = _0x81ccdf,
        _0x1b45ec = new XMLHttpRequest();
    _0x1b45ec[_0x1b08a4(0x2a3)](_0x1b08a4(0x1c9), leurl + _0x1b08a4(0x38e) + encodeURIComponent(_0x5ac336), !![]), _0x1b45ec[_0x1b08a4(0x4a1)] = function () {
        var _0x46eb50 = _0x1b08a4;
        if (_0x1b45ec[_0x46eb50(0x434)] == 0x4) {
            if (_0x1b45ec[_0x46eb50(0x34d)] == 0xc8) {
                var _0x38b9a0 = JSON[_0x46eb50(0x4cd)](_0x1b45ec['responseText']);
                const _0x1bf105 = _0x46eb50(0x4b8) + _0x5ac336['replaceAll']('.', '_');
                document['getElementById'](_0x46eb50(0x376) + _0x5ac336[_0x46eb50(0x320)]('.', '_'))['textContent'] = _0x5ac336 + _0x46eb50(0x4bc), $('#' + _0x1bf105 + _0x46eb50(0x3cc))[_0x46eb50(0x398)]();
                if (_0x38b9a0[_0x46eb50(0x34d)] === 0xc8) {
                    if (_0x38b9a0 && _0x38b9a0[_0x46eb50(0x448)] && Array[_0x46eb50(0x294)](_0x38b9a0[_0x46eb50(0x448)])) {
                        const _0x1f6919 = _0x38b9a0['data'][_0x46eb50(0x3ab)](_0x249276 => _0x249276[_0x46eb50(0x46d)] === _0x46eb50(0x4ad) || _0x249276[_0x46eb50(0x46d)] === _0x46eb50(0x32c));
                        if (_0x1f6919 && _0x1f6919[_0x46eb50(0x2d2)]) {
                            const _0xb397ed = _0x1f6919[_0x46eb50(0x2d2)][_0x46eb50(0x327)](/'/g, '\x22'),
                                _0x54c88b = JSON[_0x46eb50(0x4cd)](_0xb397ed),
                                _0x3f9b49 = document[_0x46eb50(0x30d)](_0x46eb50(0x1c6));
                            _0x3f9b49['className'] = 'col-12';
                            for (const _0x32ec5e in _0x54c88b) {
                                if (_0x54c88b[_0x46eb50(0x39d)](_0x32ec5e)) {
                                    const _0x53bc0f = _0x54c88b[_0x32ec5e];
                                    if (_0x53bc0f[_0x46eb50(0x1bd)] !== 0x0) {
                                        const _0x46e6be = document['createElement'](_0x46eb50(0x1c6));
                                        _0x46e6be[_0x46eb50(0x26e)] = _0x46eb50(0x3f0), _0x46e6be[_0x46eb50(0x46e)] = _0x46eb50(0x318) + _0x32ec5e + '</p>';
                                        const _0x41285d = document[_0x46eb50(0x30d)](_0x46eb50(0x1c6));
                                        _0x41285d['className'] = _0x46eb50(0x23d), _0x41285d[_0x46eb50(0x46e)] = '<p\x20>-</p>';
                                        const _0x52a724 = document[_0x46eb50(0x30d)](_0x46eb50(0x1c6));
                                        _0x52a724['className'] = _0x46eb50(0x204), _0x52a724[_0x46eb50(0x46e)] = _0x46eb50(0x21e) + _0x53bc0f + '</p>';
                                        const _0x404b74 = document['createElement'](_0x46eb50(0x1c6));
                                        _0x404b74[_0x46eb50(0x26e)] = _0x46eb50(0x329), _0x404b74[_0x46eb50(0x492)](_0x46e6be), _0x404b74[_0x46eb50(0x492)](_0x41285d), _0x404b74['appendChild'](_0x52a724), _0x3f9b49[_0x46eb50(0x492)](_0x404b74);
                                    }
                                }
                            }
                            $('#' + _0x1bf105 + _0x46eb50(0x3cc))[_0x46eb50(0x203)](_0x3f9b49), $('#' + _0x1bf105 + _0x46eb50(0x2e7))[_0x46eb50(0x2e0)]();
                        }
                    }
                } else $('#' + _0x1bf105 + _0x46eb50(0x3cc))[_0x46eb50(0x203)]('<p\x20style=\x27font-size:\x2015px;text-align:\x20center;\x27>No\x20data\x20in\x20table</p>'), $('#' + _0x1bf105 + _0x46eb50(0x2e7))[_0x46eb50(0x3d1)]();
                $('#' + _0x1bf105)[_0x46eb50(0x319)](_0x46eb50(0x2e0));
            } else console['error'](_0x46eb50(0x40b), _0x1b45ec[_0x46eb50(0x2c2)]);
        }
    }, _0x1b45ec[_0x1b08a4(0x2de)]();
}

function openm_func(_0x592369, _0x3ea0fa = '') {
    var _0x1b2f1c = _0x81ccdf,
        _0x317fab = $(_0x592369)['attr']('id')[_0x1b2f1c(0x444)](_0x1b2f1c(0x498))[0x1];
    if (_0x3ea0fa == 'multiple') $(_0x1b2f1c(0x2a6) + _0x317fab)['hide']();
    else {
        document['getElementById'](_0x1b2f1c(0x477) + _0x317fab)['remove']();
        var _0x49b4ac = document['getElementsByClassName'](_0x1b2f1c(0x440) + _0x317fab)[0x0];
        document[_0x1b2f1c(0x431)](_0x1b2f1c(0x475) + _0x317fab['replaceAll'](_0x1b2f1c(0x375), '_'))[_0x1b2f1c(0x465)](), _0x49b4ac['remove']();
    }
}

function openServerModal(_0x2bb81f) {
    var _0xbffb78 = _0x81ccdf,
        _0x223fda = document[_0xbffb78(0x431)](_0xbffb78(0x30e)),
        _0x43e541 = document[_0xbffb78(0x3bd)](_0x2bb81f['replaceAll']('.', '_') + _0xbffb78(0x32a));
    if (all_Vms || _0x223fda[_0xbffb78(0x4df)](_0x43e541[0x0])) {
        all_Vms && (document[_0xbffb78(0x431)]('no_vm_div')['style']['display'] = _0xbffb78(0x432), document[_0xbffb78(0x488)](_0xbffb78(0x48e))[_0xbffb78(0x1cd)](_0x40bde3 => {
            var _0x2283a5 = _0xbffb78;
            _0x40bde3[_0x2283a5(0x4e9)]['remove'](_0x2283a5(0x26d)), _0x40bde3['classList'][_0x2283a5(0x465)](_0x2283a5(0x496));
        }));
        var _0x49f139 = _0xbffb78(0x375) + _0x2bb81f[_0xbffb78(0x320)]('.', '_') + _0xbffb78(0x32a),
            _0x5b79af, _0x1b0724 = server_hosts[_0x2bb81f[_0xbffb78(0x320)]('_', '.')],
            _0x318587 = 'ip_' + _0x1b0724[0x1][_0xbffb78(0x320)]('.', '_'),
            _0x34f24a = _0x1b0724[0x1],
            _0x3b30bf = '',
            _0x23bf7b = document[_0xbffb78(0x431)](_0xbffb78(0x477) + _0x318587),
            _0x50aaa7 = _0x1b0724[0x13],
            _0x10c87b = [];
        if (!_0x23bf7b) {
            var _0x581d04 = [];
            if (jQuery[_0xbffb78(0x24c)](_0x50aaa7) != !![] && _0x50aaa7 != null) _0x3b30bf += _0xbffb78(0x3d3) + _0xbffb78(0x1c6) + _0x318587 + _0xbffb78(0x22e), _0x3b30bf += _0xbffb78(0x274) + _0x318587 + _0xbffb78(0x22a) + _0xbffb78(0x23f) + '\x27)\x22>', _0x3b30bf += _0xbffb78(0x407), _0x3b30bf += '</button></legend>', _0x3b30bf += _0xbffb78(0x3ba), Array[_0xbffb78(0x3db)](_0x50aaa7)[_0xbffb78(0x1cd)](function (_0x4a0d73) {
                var _0x4a4b51 = _0xbffb78;
                array_ip = _0x4a4b51(0x375) + _0x4a0d73[_0x4a4b51(0x320)]('.', '_'), _0x581d04[_0x4a4b51(0x250)](_0x4a4b51(0x3de) + _0x4a0d73[_0x4a4b51(0x320)]('.', '_')), _0x10c87b[_0x4a4b51(0x250)]('\x27' + _0x4a0d73[_0x4a4b51(0x2da)]() + '\x27'), criticalStatusCount[array_ip] = 0x0, okStatusCount[array_ip] = 0x0, warningStatusCount[array_ip] = 0x0, unknownStatusCount[array_ip] = 0x0;
                var _0x1f7706 = document['getElementById'](array_ip + _0x4a4b51(0x32a)),
                    _0x31d795 = categorizeColor(_0x1f7706['style'][_0x4a4b51(0x3c3)]);
                _0x31d795 = getIcons_clr(_0x31d795), _0x3b30bf += _0x4a4b51(0x1e2) + array_ip + '\x22\x20style=\x22margin-bottom:0;border:1px\x20solid\x20' + _0x31d795 + _0x4a4b51(0x4b1), _0x3b30bf += '<legend>', _0x3b30bf += _0x4a4b51(0x241), _0x3b30bf += '<div\x20class=\x22row\x22>', _0x3b30bf += _0x4a4b51(0x28b), _0x3b30bf += '<p\x20id=\x22nicname' + array_ip + '\x22>' + _0x4a0d73 + _0x4a4b51(0x2e8), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x29e), _0x3b30bf += _0x4a4b51(0x469) + _0x34f24a + _0x4a4b51(0x49b), _0x3b30bf += _0x4a4b51(0x2d4), _0x3b30bf += '</button>', _0x3b30bf += '<i\x20class=\x22icon-search\x22\x20id=\x22no-lens' + array_ip + _0x4a4b51(0x3cf), _0x3b30bf += _0x4a4b51(0x205) + array_ip + _0x4a4b51(0x2d1), _0x3b30bf += '<i\x20class=\x22mdi\x20mdi-information-outline\x22\x20id=\x22' + _0x4a0d73[_0x4a4b51(0x320)]('.', '_') + ':Info\x22\x20\x20title=\x22\x22\x20style=\x22color:white;font-size:\x2016px;\x22\x20\x20></i>', _0x3b30bf += _0x4a4b51(0x272), _0x3b30bf += _0x4a4b51(0x474) + array_ip + _0x4a4b51(0x4c3), _0x3b30bf += _0x4a4b51(0x2fb) + array_ip + _0x4a4b51(0x1fb), _0x3b30bf += '<i\x20class=\x22icon-node\x22\x20data-toggle=\x22tooltip\x22\x20id=\x22nodeview' + array_ip + _0x4a4b51(0x25c), _0x3b30bf += _0x4a4b51(0x272), _0x3b30bf += _0x4a4b51(0x242) + array_ip + _0x4a4b51(0x45c), _0x3b30bf += '<button\x20id=\x22hardwaresdata' + array_ip + _0x4a4b51(0x2f8), _0x3b30bf += '<div\x20class=\x22dropdown\x20switch-dropdown\x22\x20style=\x22background-color:\x20#55a8fd;\x22>', _0x3b30bf += _0x4a4b51(0x3be), _0x3b30bf += _0x4a4b51(0x494), _0x3b30bf += _0x4a4b51(0x3d6), _0x3b30bf += _0x4a4b51(0x307) + array_ip + _0x4a4b51(0x21a), _0x3b30bf += _0x4a4b51(0x29f), _0x3b30bf += '</button>', _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x2e8), _0x3b30bf += _0x4a4b51(0x2b3), _0x3b30bf += _0x4a4b51(0x48f) + array_ip + _0x4a4b51(0x49a), _0x3b30bf += _0x4a4b51(0x3da), _0x3b30bf += _0x4a4b51(0x1bf), _0x3b30bf += '<input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22tag' + array_ip + _0x4a4b51(0x328), _0x3b30bf += _0x4a4b51(0x288) + array_ip + _0x4a4b51(0x31e), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x23e), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x3cb) + array_ip + _0x4a4b51(0x25f), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += '<div\x20class=\x22row\x22\x20style=\x22margin-right:0rem;\x22>', _0x3b30bf += _0x4a4b51(0x49d) + array_ip + '_opq\x22\x20style=\x22display:flex;\x22>', _0x3b30bf += _0x4a4b51(0x267) + array_ip + _0x4a4b51(0x45f), _0x3b30bf += _0x4a4b51(0x3f5), _0x3b30bf += '</div>', _0x3b30bf += _0x4a4b51(0x3b3) + array_ip + _0x4a4b51(0x1cb), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += '<div\x20class=\x22pill-contain\x20p-0\x22\x20style\x20=\x20\x22z-index:\x20100;\x22\x20>', _0x3b30bf += _0x4a4b51(0x3b9), _0x3b30bf += _0x4a4b51(0x2f4) + array_ip + _0x4a4b51(0x331), _0x3b30bf += _0x4a4b51(0x33c), _0x3b30bf += _0x4a4b51(0x317) + array_ip + _0x4a4b51(0x2df) + array_ip + _0x4a4b51(0x35a) + criticalStatusCount[array_ip] + _0x4a4b51(0x212), _0x3b30bf += _0x4a4b51(0x272), _0x3b30bf += _0x4a4b51(0x3ef), _0x3b30bf += _0x4a4b51(0x441) + array_ip + _0x4a4b51(0x3a4) + array_ip + _0x4a4b51(0x3d2) + okStatusCount[array_ip] + _0x4a4b51(0x212), _0x3b30bf += _0x4a4b51(0x272), _0x3b30bf += _0x4a4b51(0x3ef), _0x3b30bf += '\x20\x20\x20\x20<a\x20class=\x22nav-link\x22\x20id=\x22pills-warning-tab' + array_ip + _0x4a4b51(0x2c5) + array_ip + _0x4a4b51(0x3bb) + warningStatusCount[array_ip] + '</a>', _0x3b30bf += _0x4a4b51(0x272), _0x3b30bf += '<button\x20class=\x22nav-item\x20mx-2\x22>', _0x3b30bf += _0x4a4b51(0x20a) + array_ip + _0x4a4b51(0x2e6) + array_ip + '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-unknown\x22\x20aria-selected=\x22false\x22\x20onclick=\x22statusFunction(this);\x22>' + unknownStatusCount[array_ip] + _0x4a4b51(0x3d6), _0x3b30bf += _0x4a4b51(0x272), _0x3b30bf += _0x4a4b51(0x3ef), _0x3b30bf += _0x4a4b51(0x1e5) + array_ip + _0x4a4b51(0x42c) + array_ip + _0x4a4b51(0x335), _0x3b30bf += _0x4a4b51(0x272), _0x3b30bf += _0x4a4b51(0x4cf), _0x3b30bf += '</div\x20>', _0x3b30bf += _0x4a4b51(0x2ef), _0x3b30bf += _0x4a4b51(0x42a), _0x3b30bf += '<div\x20class=\x22modal\x20fade\x22\x20id=\x22thresholdModal_' + _0x34f24a['replaceAll']('.', '_') + _0x4a4b51(0x1d7), _0x3b30bf += '<div\x20class=\x22modal-dialog\x22\x20role=\x22document\x22>', _0x3b30bf += _0x4a4b51(0x4d6), _0x3b30bf += _0x4a4b51(0x239), _0x3b30bf += _0x4a4b51(0x44f) + _0x34f24a[_0x4a4b51(0x320)]('.', '_') + '\x22></h5>', _0x3b30bf += '<button\x20type=\x22button\x22\x20class=\x22close\x22\x20data-dismiss=\x22modal\x22\x20aria-label=\x22Close\x22\x20style=\x22background-color:#1f1f1f;color:white;border:\x201px\x20solid\x20#ff0000\x22>', _0x3b30bf += _0x4a4b51(0x2c8), _0x3b30bf += _0x4a4b51(0x272), _0x3b30bf += '</div>', _0x3b30bf += _0x4a4b51(0x23b), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += '<div\x20class=\x22modal-footer\x22>', _0x3b30bf += _0x4a4b51(0x459), _0x3b30bf += _0x4a4b51(0x2ef), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x2c3), _0x3b30bf += _0x4a4b51(0x24f), _0x3b30bf += '<div\x20class=\x22modal-content\x22>', _0x3b30bf += _0x4a4b51(0x4e8), _0x3b30bf += _0x4a4b51(0x330) + _0x4a0d73[_0x4a4b51(0x320)]('.', '_') + _0x4a4b51(0x395), _0x3b30bf += '<div\x20class=\x22col-3\x22\x20id=\x22entity-search\x22>', _0x3b30bf += _0x4a4b51(0x1bf), _0x3b30bf += _0x4a4b51(0x426), _0x3b30bf += _0x4a4b51(0x1b6), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x446), _0x3b30bf += '<div\x20class=\x22dropdown\x20select-btn-dropdown\x20full-select-dropdown\x20mob-data\x22\x20id=\x22exort-to' + array_ip + '\x22>', _0x3b30bf += _0x4a4b51(0x2b9), _0x3b30bf += _0x4a4b51(0x2fc), _0x3b30bf += _0x4a4b51(0x3d0), _0x3b30bf += _0x4a4b51(0x302), _0x3b30bf += _0x4a4b51(0x265), _0x3b30bf += _0x4a4b51(0x352), _0x3b30bf += _0x4a4b51(0x473), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x3e0) + array_ip + _0x4a4b51(0x3c0), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += _0x4a4b51(0x3aa), _0x3b30bf += _0x4a4b51(0x4d9), _0x3b30bf += '</div>', _0x3b30bf += _0x4a4b51(0x2ef);
            }), _0x3b30bf += '</div>', _0x3b30bf += '</div>';
            else {
                criticalStatusCount[_0x318587] = 0x0, okStatusCount[_0x318587] = 0x0, warningStatusCount[_0x318587] = 0x0, unknownStatusCount[_0x318587] = 0x0;
                var _0x379ad5 = document[_0xbffb78(0x431)](_0x318587 + _0xbffb78(0x32a)),
                    _0x48a3ee = categorizeColor(_0x379ad5[_0xbffb78(0x3b0)]['borderColor']);
                _0x48a3ee = getIcons_clr(_0x48a3ee), _0x3b30bf += _0xbffb78(0x28d) + _0xbffb78(0x1c6) + _0x318587 + _0xbffb78(0x1c1) + _0x318587 + _0xbffb78(0x3b1) + _0x48a3ee + _0xbffb78(0x4b1), _0x3b30bf += _0xbffb78(0x470), _0x3b30bf += _0xbffb78(0x241), _0x3b30bf += _0xbffb78(0x4cb), _0x3b30bf += _0xbffb78(0x28b), _0x3b30bf += _0xbffb78(0x26c) + _0x318587 + '\x22>' + _0x1b0724[0x1] + _0xbffb78(0x2e8), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x29e), _0x3b30bf += _0xbffb78(0x469) + _0x34f24a + _0xbffb78(0x49b), _0x3b30bf += _0xbffb78(0x2d4), _0x3b30bf += '</button>', _0x3b30bf += _0xbffb78(0x34c) + _0x318587 + _0xbffb78(0x3cf), _0x3b30bf += _0xbffb78(0x205) + _0x318587 + _0xbffb78(0x2d1), _0x3b30bf += _0xbffb78(0x3f7) + _0x1b0724[0x1][_0xbffb78(0x320)]('.', '_') + ':Info\x22\x20\x20title=\x22\x22\x20style=\x22color:white;font-size:\x2016px;\x22\x20\x20></i>', _0x3b30bf += _0xbffb78(0x272), _0x3b30bf += _0xbffb78(0x474) + _0x318587 + '\x22\x20style=\x22margin-left:-1%\x22>', _0x3b30bf += '<i\x20class=\x22icon-tableview\x22\x20id=\x22tableview' + _0x318587 + '\x22\x20\x20title=\x22Table\x20view\x22\x20style=\x22color:white;font-size:\x2016px;\x22\x20onclick=\x22displayTable(this)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#staticBackdrop\x22></i>', _0x3b30bf += '<i\x20class=\x22icon-node\x22\x20data-toggle=\x22tooltip\x22\x20id=\x22nodeview' + _0x318587 + _0xbffb78(0x25c), _0x3b30bf += '</button>', _0x3b30bf += _0xbffb78(0x242) + _0x318587 + _0xbffb78(0x45c), _0x3b30bf += _0xbffb78(0x242) + _0x318587 + _0xbffb78(0x429), _0x3b30bf += _0xbffb78(0x447), _0x3b30bf += _0xbffb78(0x272), _0x3b30bf += _0xbffb78(0x35c) + _0x318587 + _0xbffb78(0x2f8), _0x3b30bf += _0xbffb78(0x403), _0x3b30bf += '<a\x20class=\x22btn\x20selector\x20dropdown-toggle\x22\x20href=\x22#\x22\x20role=\x22button\x22\x20id=\x22dropdownMenuLink\x22\x20data-toggle=\x22dropdown\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22>', _0x3b30bf += _0xbffb78(0x494), _0x3b30bf += _0xbffb78(0x3d6), _0x3b30bf += _0xbffb78(0x307) + _0x318587 + _0xbffb78(0x21a), _0x3b30bf += _0xbffb78(0x29f), _0x3b30bf += _0xbffb78(0x272), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x2e8), _0x3b30bf += _0xbffb78(0x2b3), _0x3b30bf += '<div\x20class=\x22row\x22\x20id=\x22search-row' + _0x318587 + _0xbffb78(0x49a), _0x3b30bf += '<div\x20class=\x22\x22\x20id=\x22entity-search\x22>', _0x3b30bf += _0xbffb78(0x1bf), _0x3b30bf += _0xbffb78(0x2b2) + _0x318587 + _0xbffb78(0x328), _0x3b30bf += '<i\x20class=\x22icon-search\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:18px;\x22\x20id=\x22i_' + _0x318587 + _0xbffb78(0x31e), _0x3b30bf += '</div>', _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x23e), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += '</div>', _0x3b30bf += _0xbffb78(0x3cb) + _0x318587 + _0xbffb78(0x25f), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += '<div\x20class=\x22row\x22\x20style=\x22margin-right:0rem;\x22>', _0x3b30bf += _0xbffb78(0x49d) + _0x318587 + _0xbffb78(0x37e), _0x3b30bf += _0xbffb78(0x267) + _0x318587 + _0xbffb78(0x45f), _0x3b30bf += _0xbffb78(0x3f5), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x3b3) + _0x318587 + _0xbffb78(0x1cb), _0x3b30bf += '</div>', _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x2b8), _0x3b30bf += '<div\x20class=\x22row\x22\x20style=\x22margin-left:0;\x22>', _0x3b30bf += _0xbffb78(0x2f4) + _0x318587 + _0xbffb78(0x331), _0x3b30bf += '\x20<button\x20class=\x22nav-item\x20mx-2\x20\x22>', _0x3b30bf += '\x20\x20\x20\x20<a\x20class=\x22nav-link\x22\x20id=\x22pills-critical-tab' + _0x318587 + '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-critical' + _0x318587 + _0xbffb78(0x35a) + criticalStatusCount[_0x318587] + _0xbffb78(0x212), _0x3b30bf += _0xbffb78(0x272), _0x3b30bf += _0xbffb78(0x3ef), _0x3b30bf += _0xbffb78(0x441) + _0x318587 + _0xbffb78(0x3a4) + _0x318587 + _0xbffb78(0x3d2) + okStatusCount[_0x318587] + _0xbffb78(0x212), _0x3b30bf += _0xbffb78(0x272), _0x3b30bf += _0xbffb78(0x3ef), _0x3b30bf += _0xbffb78(0x4d8) + _0x318587 + _0xbffb78(0x2c5) + _0x318587 + '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-warning\x22\x20aria-selected=\x22false\x22\x20onclick=\x22statusFunction(this);\x22>' + warningStatusCount[_0x318587] + '</a>', _0x3b30bf += _0xbffb78(0x272), _0x3b30bf += _0xbffb78(0x3ef), _0x3b30bf += _0xbffb78(0x20a) + _0x318587 + _0xbffb78(0x2e6) + _0x318587 + _0xbffb78(0x2a0) + unknownStatusCount[_0x318587] + '</a>', _0x3b30bf += _0xbffb78(0x272), _0x3b30bf += _0xbffb78(0x3ef), _0x3b30bf += _0xbffb78(0x1e5) + _0x318587 + _0xbffb78(0x42c) + _0x318587 + '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-all\x22\x20aria-selected=\x22false\x22\x20onclick=\x22statusFunction(this);\x22>All</a>', _0x3b30bf += '</button>', _0x3b30bf += _0xbffb78(0x4cf), _0x3b30bf += '</div\x20>', _0x3b30bf += _0xbffb78(0x2ef), _0x3b30bf += _0xbffb78(0x42a), _0x3b30bf += _0xbffb78(0x314) + _0x34f24a[_0xbffb78(0x320)]('.', '_') + _0xbffb78(0x1d7), _0x3b30bf += _0xbffb78(0x25a), _0x3b30bf += _0xbffb78(0x4d6), _0x3b30bf += _0xbffb78(0x239), _0x3b30bf += _0xbffb78(0x44f) + _0x34f24a[_0xbffb78(0x320)]('.', '_') + _0xbffb78(0x2ee), _0x3b30bf += _0xbffb78(0x42d), _0x3b30bf += _0xbffb78(0x2c8), _0x3b30bf += _0xbffb78(0x272), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x23b), _0x3b30bf += '</div>', _0x3b30bf += _0xbffb78(0x27c), _0x3b30bf += _0xbffb78(0x4d4), _0x3b30bf += '</div\x20>', _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += '<div\x20class=\x22modal\x20fade\x20closable\x20staticBackdropip_' + _0x1b0724[0x1][_0xbffb78(0x320)]('.', '_') + '\x22\x20id=\x22staticBackdrop\x22\x20data-backdrop=\x22static\x22\x20data-keyboard=\x22false\x22\x20tabindex=\x22-1\x22\x20aria-labelledby=\x22staticBackdropLabel\x22\x20aria-hidden=\x22true\x22\x20style=\x22overflow-y:hidden\x20!important\x22>', _0x3b30bf += _0xbffb78(0x24f), _0x3b30bf += _0xbffb78(0x332), _0x3b30bf += _0xbffb78(0x4e8), _0x3b30bf += _0xbffb78(0x330) + _0x1b0724[0x1][_0xbffb78(0x320)]('.', '_') + _0xbffb78(0x395), _0x3b30bf += '<div\x20class=\x22col-3\x22\x20id=\x22entity-search\x22>', _0x3b30bf += _0xbffb78(0x1bf), _0x3b30bf += _0xbffb78(0x426), _0x3b30bf += _0xbffb78(0x1b6), _0x3b30bf += '</div>', _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += '<div\x20class=\x22col-3\x20\x22\x20id=\x22change-col4-size\x22>', _0x3b30bf += '<div\x20class=\x22dropdown\x20select-btn-dropdown\x20full-select-dropdown\x20mob-data\x22\x20id=\x22exort-to' + _0x318587 + '\x22>', _0x3b30bf += _0xbffb78(0x38a), _0x3b30bf += _0xbffb78(0x2fc), _0x3b30bf += _0xbffb78(0x3d0), _0x3b30bf += _0xbffb78(0x302), _0x3b30bf += '<a\x20class=\x22select-link\x20dropdown-item\x22\x20onclick=\x22onExport(\x22excel\x22)\x22>XLS</a>', _0x3b30bf += _0xbffb78(0x352), _0x3b30bf += _0xbffb78(0x473), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += '</div>', _0x3b30bf += _0xbffb78(0x3e0) + _0x318587 + _0xbffb78(0x3c0), _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x3aa), _0x3b30bf += '</div>', _0x3b30bf += _0xbffb78(0x4d9), _0x3b30bf += _0xbffb78(0x2ef);
            }
            $(_0xbffb78(0x249) + _0x318587)[_0xbffb78(0x3d1)](), $(_0xbffb78(0x3ce) + _0x318587)[_0xbffb78(0x3d1)](), $(_0xbffb78(0x35e))[_0xbffb78(0x322)](_0x3b30bf), _0x1b0724[0xc] && (friendlyname = _0x1b0724[0x1] + _0xbffb78(0x1d1) + _0x1b0724[0xc] + '\x20)', document[_0xbffb78(0x431)](_0xbffb78(0x1b7) + _0x318587)[_0xbffb78(0x1ca)] = friendlyname, document[_0xbffb78(0x431)](_0xbffb78(0x1b7) + _0x318587)[_0xbffb78(0x3b0)]['backgroundColor'] = _0xbffb78(0x25d), document[_0xbffb78(0x431)]('nicname' + _0x318587)['style'][_0xbffb78(0x450)] = _0xbffb78(0x389), document[_0xbffb78(0x431)](_0xbffb78(0x1b7) + _0x318587)[_0xbffb78(0x3b0)][_0xbffb78(0x3cd)] = 'fit-content'), document[_0xbffb78(0x3bd)]('div' + _0x318587)[0x0]['classList'][_0xbffb78(0x489)](..._0x581d04), showLoader(_0xbffb78(0x449) + _0x1b0724[0x1][_0xbffb78(0x327)]('.', '_')), jQuery['isEmptyObject'](_0x50aaa7) != !![] && _0x50aaa7 != null ? Array[_0xbffb78(0x3db)](_0x50aaa7)['forEach'](function (_0x36f6f3) {
                var _0x5c5ab8 = _0xbffb78;
                getEntityData(_0x36f6f3[_0x5c5ab8(0x320)]('.', '_'));
            }) : (getEntityData(_0x1b0724[0x1][_0xbffb78(0x320)]('.', '_')), _0x10c87b[_0xbffb78(0x250)]('\x27' + _0x2bb81f[_0xbffb78(0x2da)]() + '\x27')), $(_0xbffb78(0x287))['on'](_0xbffb78(0x4c8), function (_0x277fcc) {
                var _0x3f2e3c = _0xbffb78;
                _0x277fcc[_0x3f2e3c(0x386)] === 'Enter' && (_0x277fcc[_0x3f2e3c(0x273)](), searchNodes(_0x277fcc[_0x3f2e3c(0x211)]));
            }), requestDataFromServer(_0xbffb78(0x39b), {
                'sitename': params[_0xbffb78(0x48c)]('site'),
                'ip': '[' + _0x10c87b + ']'
            }, type = _0xbffb78(0x1c9))[_0xbffb78(0x338)](function (_0x35fb2c) {
                var _0x4cb516 = _0xbffb78;
                _0x5b79af = _0x35fb2c;
                var _0x2f07ce = _0x35fb2c['responseData'][0x0][_0x4cb516(0x313)]['icons'][_0x4cb516(0x448)];
                _0x2f07ce[_0x4cb516(0x1cd)](function (_0x14d25a) {
                    var _0x4bf3fc = _0x4cb516,
                        _0x135ec9 = '',
                        _0x473db7 = '';
                    _0x14d25a[0x1]['includes'](':') ? _0x135ec9 = _0x4bf3fc(0x375) + _0x14d25a[0x1][_0x4bf3fc(0x444)](':')[0x0][_0x4bf3fc(0x320)]('.', '_') : _0x135ec9 = 'ip_' + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_');
                    _0x473db7 = _0x14d25a[0xb];
                    (criticalStatusCount[_0x135ec9] == undefined || criticalStatusCount[_0x135ec9] == null) && (criticalStatusCount[_0x135ec9] = 0x0);
                    (okStatusCount[_0x135ec9] == undefined || okStatusCount[_0x135ec9] == null) && (okStatusCount[_0x135ec9] = 0x0);
                    (pendingStatusCount[_0x135ec9] == undefined || pendingStatusCount[_0x135ec9] == null) && (pendingStatusCount[_0x135ec9] = 0x0);
                    (warningStatusCount[_0x135ec9] == undefined || warningStatusCount[_0x135ec9] == null) && (warningStatusCount[_0x135ec9] = 0x0);
                    (unknownStatusCount[_0x135ec9] == undefined || unknownStatusCount[_0x135ec9] == null) && (unknownStatusCount[_0x135ec9] = 0x0);
                    if (_0x473db7 == 0x2) okStatusCount[_0x135ec9] += 0x1;
                    else {
                        if (_0x473db7 == 0x0) criticalStatusCount[_0x135ec9] += 0x1;
                        else {
                            if (_0x473db7 == 0x3) unknownStatusCount[_0x135ec9] += 0x1;
                            else _0x473db7 == 0x1 && (warningStatusCount[_0x135ec9] += 0x1);
                        }
                    }
                    if (criticalStatusCount[_0x135ec9] == 0x0) $(_0x4bf3fc(0x4a9) + _0x135ec9)['html'](_0x4bf3fc(0x443) + criticalStatusCount[_0x135ec9] + ')');
                    else {
                        var _0x49adb3 = _0x4bf3fc(0x477) + _0x135ec9;
                        elm = document[_0x4bf3fc(0x431)](_0x49adb3), elm[_0x4bf3fc(0x20f)][_0x4bf3fc(0x4c4)](elm, document[_0x4bf3fc(0x431)](_0x4bf3fc(0x1d2))[_0x4bf3fc(0x392)][0x0]), $('#pills-critical-tab' + _0x135ec9)[_0x4bf3fc(0x1e8)]('onclick', 'statusFunction(this)'), $(_0x4bf3fc(0x4a9) + _0x135ec9)[_0x4bf3fc(0x203)]('<span\x20class=\x22bold-text\x20red\x22>Critical(' + criticalStatusCount[_0x135ec9] + ')</span>');
                    }
                    okStatusCount[_0x135ec9] == 0x0 ? $('#pills-ok-tab' + _0x135ec9)[_0x4bf3fc(0x203)](_0x4bf3fc(0x323) + okStatusCount[_0x135ec9] + ')') : ($(_0x4bf3fc(0x480) + _0x135ec9)[_0x4bf3fc(0x1e8)](_0x4bf3fc(0x2c0), _0x4bf3fc(0x1fd)), $(_0x4bf3fc(0x480) + _0x135ec9)[_0x4bf3fc(0x203)]('<span\x20class=\x22bold-text\x20green\x22>Ok(' + okStatusCount[_0x135ec9] + ')</span>'));
                    pendingStatusCount[_0x135ec9] == 0x0 ? $('#pills-pending-tab' + _0x135ec9)['html'](_0x4bf3fc(0x214) + pendingStatusCount[_0x135ec9] + ')') : ($('#pills-pending-tab' + _0x135ec9)['attr']('onclick', 'statusFunction(this)'), $(_0x4bf3fc(0x4b0) + _0x135ec9)[_0x4bf3fc(0x203)](_0x4bf3fc(0x1ec) + pendingStatusCount[_0x135ec9] + _0x4bf3fc(0x38b)));
                    warningStatusCount[_0x135ec9] == 0x0 ? $(_0x4bf3fc(0x20c) + _0x135ec9)['html'](_0x4bf3fc(0x24b) + warningStatusCount[_0x135ec9] + ')') : ($(_0x4bf3fc(0x20c) + _0x135ec9)[_0x4bf3fc(0x1e8)]('onclick', 'statusFunction(this)'), $('#pills-warning-tab' + _0x135ec9)['html']('<span\x20class=\x22bold-text\x20warning\x22>Warning(' + warningStatusCount[_0x135ec9] + _0x4bf3fc(0x38b)));
                    unknownStatusCount[_0x135ec9] == 0x0 ? $(_0x4bf3fc(0x3c8) + _0x135ec9)[_0x4bf3fc(0x203)](_0x4bf3fc(0x221) + unknownStatusCount[_0x135ec9] + ')') : ($(_0x4bf3fc(0x3c8) + _0x135ec9)[_0x4bf3fc(0x1e8)]('onclick', _0x4bf3fc(0x1fd)), $(_0x4bf3fc(0x3c8) + _0x135ec9)['html']('<span\x20class=\x22bold-text\x20\x22\x20style=\x22color:white\x22>Unknown(' + unknownStatusCount[_0x135ec9] + _0x4bf3fc(0x38b)));
                    var _0x4b7bb8 = _0x14d25a[0x0],
                        _0x51a7f5 = _0x14d25a[0x1][_0x4bf3fc(0x444)](':')[0x0][_0x4bf3fc(0x320)]('.', '_'),
                        _0x42699f = _0x14d25a[0x1]['split'](':')[0x1],
                        _0x5033c2 = _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x1fc),
                        _0x22bf12 = getIcons_clr(_0x14d25a[0xb]),
                        _0x235575 = _0x4bf3fc(0x4e1) + _0x14d25a[0x1]['replaceAll']('.', '_') + '\x22\x20id=\x22' + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x442) + _0x14d25a[0x1]['replaceAll']('.', '_') + _0x4bf3fc(0x397) + _0x14d25a[0x5] + '\x22\x20alt=\x22\x22\x20onclick=\x22openOnImageClick(this,\x20\x27' + _0x4b7bb8 + _0x4bf3fc(0x4db) + _0x51a7f5 + _0x4bf3fc(0x4ea) + _0x5033c2 + _0x4bf3fc(0x4bb) + _0x22bf12 + _0x4bf3fc(0x4b2) + _0x22bf12 + _0x4bf3fc(0x4af) + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x467) + _0x14d25a[0x5][_0x4bf3fc(0x444)]('.')[0x0] + _0x4bf3fc(0x359);
                    if (_0x42699f != 'Processes' && _0x42699f != _0x4bf3fc(0x2ec) && _0x42699f) {
                        if (_0x42699f[_0x4bf3fc(0x1f9)]('NIC')) {
                            var _0x20a0f7 = _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_'),
                                _0xd2fead = {};
                            try {
                                var _0xd2fead = JSON[_0x4bf3fc(0x4cd)](_0x14d25a[0xd]);
                            } catch (_0x2f710d) {
                                console[_0x4bf3fc(0x2a7)]('<----GETTING\x20ERROR---->');
                            }
                            if (_0xd2fead != null && Object['keys'](_0xd2fead)[_0x4bf3fc(0x1bd)] && jQuery[_0x4bf3fc(0x24c)](_0xd2fead) != !![]) {
                                var _0xd17382 = _0x4bf3fc(0x4b6),
                                    _0x32e5e7 = '',
                                    _0x55ceec = '',
                                    _0x1d75af = '';
                                for (const [_0x396b1d, _0x57cddc] of Object['entries'](JSON['parse'](_0x14d25a[0xd]))) {
                                    var _0xbf054 = _0x57cddc[_0x4bf3fc(0x34d)] == 0x2 ? _0x4bf3fc(0x425) : _0x4bf3fc(0x2fd);
                                    if (_0x57cddc['ip'] != undefined) {
                                        if (_0x57cddc[_0x4bf3fc(0x34d)] == 0x0) _0x20a0f7 = _0x20a0f7 + '\x20' + _0x396b1d[_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f, _0x55ceec += '<tr\x20style=\x22color:red\x22><td\x20id=\x22' + _0x396b1d[_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f + _0x4bf3fc(0x1cb) + _0x396b1d + '(' + _0x57cddc[_0x4bf3fc(0x47a)] + _0x4bf3fc(0x34b) + _0x57cddc['ip'] + _0x4bf3fc(0x413);
                                        else {
                                            if (_0x57cddc[_0x4bf3fc(0x34d)] == 0x1) _0x20a0f7 = _0x20a0f7 + '\x20' + _0x396b1d[_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f, _0x32e5e7 += _0x4bf3fc(0x253) + _0x396b1d[_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f + _0x4bf3fc(0x1cb) + _0x396b1d + '(' + _0x57cddc['alias'] + _0x4bf3fc(0x34b) + _0x57cddc['ip'] + '</td></tr>';
                                            else {
                                                if (_0x57cddc[_0x4bf3fc(0x34d)] == 0x2) _0x20a0f7 = _0x20a0f7 + '\x20' + _0x396b1d[_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f, _0x32e5e7 += '<tr\x20style=\x22color:green\x22><td\x20id=\x22' + _0x396b1d[_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f + _0x4bf3fc(0x1cb) + _0x396b1d + '(' + _0x57cddc['alias'] + _0x4bf3fc(0x34b) + _0x57cddc['ip'] + _0x4bf3fc(0x413);
                                                else _0x57cddc[_0x4bf3fc(0x34d)] == 0x3 && (_0x20a0f7 = _0x20a0f7 + '\x20' + _0x396b1d[_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f, _0x1d75af += _0x4bf3fc(0x437) + _0x396b1d[_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f + '\x22\x20>' + _0x396b1d + '(' + _0x57cddc[_0x4bf3fc(0x47a)] + _0x4bf3fc(0x34b) + _0x57cddc['ip'] + _0x4bf3fc(0x413));
                                            }
                                        }
                                    } else {
                                        var _0x36e233 = _0x396b1d[_0x4bf3fc(0x320)]('.', '_');
                                        if (_0x36e233[_0x4bf3fc(0x1f9)]('-')) _0x36e233 = _0x36e233[_0x4bf3fc(0x320)]('-', '_');
                                        if (_0x57cddc['status'] == 0x0) _0x20a0f7 = _0x20a0f7 + '\x20' + _0x57cddc[_0x4bf3fc(0x3d5)][_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f, _0x55ceec += '<tr\x20style=\x22color:red\x22><td\x20id=\x22' + _0x36e233 + ':' + _0x42699f + '\x22\x20>' + _0x396b1d + '(' + _0x57cddc[_0x4bf3fc(0x47a)] + _0x4bf3fc(0x34b) + _0x57cddc[_0x4bf3fc(0x3d5)] + _0x4bf3fc(0x413);
                                        else {
                                            if (_0x57cddc[_0x4bf3fc(0x34d)] == 0x1) _0x20a0f7 = _0x20a0f7 + '\x20' + _0x57cddc[_0x4bf3fc(0x3d5)][_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f, _0x32e5e7 += '<tr\x20style=\x22color:orange\x22><td\x20id=\x22' + _0x36e233 + ':' + _0x42699f + _0x4bf3fc(0x1cb) + _0x396b1d + '(' + _0x57cddc[_0x4bf3fc(0x47a)] + _0x4bf3fc(0x34b) + _0x57cddc[_0x4bf3fc(0x3d5)] + _0x4bf3fc(0x413);
                                            else {
                                                if (_0x57cddc[_0x4bf3fc(0x34d)] == 0x2) _0x20a0f7 = _0x20a0f7 + '\x20' + _0x57cddc['mac'][_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f, _0x32e5e7 += _0x4bf3fc(0x31f) + _0x36e233 + ':' + _0x42699f + _0x4bf3fc(0x1cb) + _0x396b1d + '(' + _0x57cddc[_0x4bf3fc(0x47a)] + _0x4bf3fc(0x34b) + _0x57cddc[_0x4bf3fc(0x3d5)] + _0x4bf3fc(0x413);
                                                else _0x57cddc[_0x4bf3fc(0x34d)] == 0x3 && (_0x20a0f7 = _0x20a0f7 + '\x20' + _0x57cddc['mac'][_0x4bf3fc(0x320)]('.', '_') + ':' + _0x42699f, _0x1d75af += '<tr><td\x20id=\x22' + _0x36e233 + ':' + _0x42699f + _0x4bf3fc(0x1cb) + _0x396b1d + '(' + _0x57cddc[_0x4bf3fc(0x47a)] + _0x4bf3fc(0x34b) + _0x57cddc['mac'] + _0x4bf3fc(0x413));
                                            }
                                        }
                                    }
                                }
                                _0xd17382 += _0x55ceec + _0x32e5e7 + _0x1d75af, _0xd17382 += '</table>', _0x235575 = _0x4bf3fc(0x4e1) + _0x20a0f7 + _0x4bf3fc(0x20e) + _0x14d25a[0x1]['replaceAll']('.', '_') + '\x22\x20name=\x22' + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x397) + _0x14d25a[0x5] + _0x4bf3fc(0x4d1) + _0x4b7bb8 + _0x4bf3fc(0x4db) + _0x51a7f5 + _0x4bf3fc(0x2a5) + _0x5033c2 + _0x4bf3fc(0x4bb) + _0x22bf12 + ';background-color:\x20' + _0x22bf12 + _0x4bf3fc(0x4b5) + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x21c) + _0x14d25a[0x5][_0x4bf3fc(0x444)]('.')[0x0] + _0x4bf3fc(0x4bd) + _0x5033c2 + _0x4bf3fc(0x46c) + _0x5033c2 + _0x4bf3fc(0x234) + _0xd17382 + _0x4bf3fc(0x3dc);
                            } else _0x235575 = _0x4bf3fc(0x4e1) + _0x20a0f7 + _0x4bf3fc(0x20e) + _0x14d25a[0x1]['replaceAll']('.', '_') + _0x4bf3fc(0x442) + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x397) + _0x14d25a[0x5] + _0x4bf3fc(0x4d1) + _0x4b7bb8 + _0x4bf3fc(0x4db) + _0x51a7f5 + _0x4bf3fc(0x2a5) + _0x5033c2 + '\x27,event)\x22\x20style=\x22width:205%;height:55%;margin-left:10%;\x20border:1px\x20solid\x20' + _0x22bf12 + ';background-color:' + _0x22bf12 + _0x4bf3fc(0x4af) + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x3a9) + _0x14d25a[0x5]['split']('.')[0x0] + '<br>No\x20nic\x20summary</span></div>';
                        }
                        if (_0x42699f[_0x4bf3fc(0x1f9)]('SW_Disk')) {
                            var _0x2ea3ec = JSON[_0x4bf3fc(0x4cd)](_0x14d25a[0xf]);
                            if (jQuery[_0x4bf3fc(0x24c)](_0x2ea3ec) != !![] && _0x2ea3ec != null) {
                                var _0x20a0f7 = _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_'),
                                    _0xd17382 = _0x4bf3fc(0x4b6),
                                    _0x32e5e7 = '',
                                    _0x249c7d = '',
                                    _0x55ceec = '',
                                    _0x5033c2 = _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x1fc);
                                for (const [_0x19af73, _0x3de513] of Object[_0x4bf3fc(0x3b5)](JSON[_0x4bf3fc(0x4cd)](_0x14d25a[0xf]))) {
                                    _0x20a0f7 = _0x20a0f7 + '\x20' + _0x51a7f5 + ':' + _0x19af73 + ':' + _0x42699f;
                                    if (_0x3de513[_0x4bf3fc(0x34d)] == 0x2) _0x32e5e7 += _0x4bf3fc(0x31f) + _0x51a7f5 + ':' + _0x19af73 + ':' + _0x42699f + '\x22>' + _0x19af73 + '-</td>\x20<td>' + _0x3de513[_0x4bf3fc(0x47d)] + '</td></tr>';
                                    else _0x3de513[_0x4bf3fc(0x34d)] == 0x1 ? _0x249c7d += _0x4bf3fc(0x253) + _0x51a7f5 + ':' + _0x19af73 + ':' + _0x42699f + '\x22>' + _0x19af73 + _0x4bf3fc(0x280) + _0x3de513[_0x4bf3fc(0x47d)] + '</td></tr>' : _0x55ceec += _0x4bf3fc(0x224) + _0x51a7f5 + ':' + _0x19af73 + ':' + _0x42699f + '\x22>' + _0x19af73 + _0x4bf3fc(0x280) + _0x3de513[_0x4bf3fc(0x47d)] + _0x4bf3fc(0x413);
                                }
                                _0xd17382 += _0x55ceec + _0x249c7d + _0x32e5e7, _0xd17382 += _0x4bf3fc(0x435), _0x235575 = _0x4bf3fc(0x4e1) + _0x20a0f7 + '\x22\x20id=\x22' + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x442) + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + '\x22\x20src=\x22/static/images/' + _0x14d25a[0x5] + '\x22\x20alt=\x22\x22\x20onclick=\x22openOnImageClick(this,\x20\x27' + _0x4b7bb8 + _0x4bf3fc(0x4db) + _0x51a7f5 + '\x27,event)\x22\x20\x20onmouseover=\x22hovered(\x27' + _0x5033c2 + _0x4bf3fc(0x4bb) + _0x22bf12 + _0x4bf3fc(0x491) + _0x22bf12 + _0x4bf3fc(0x4b5) + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x37a) + _0x14d25a[0x5][_0x4bf3fc(0x444)]('.')[0x0] + _0x4bf3fc(0x45b) + _0x5033c2 + _0x4bf3fc(0x46c) + _0x5033c2 + _0x4bf3fc(0x234) + _0xd17382 + _0x4bf3fc(0x3dc);
                            } else _0x235575 = '<div\x20class=\x22col-1\x20tooltips\x22\x20style=\x22max-width:\x202.6rem;\x22><img\x20class=\x22imgsize\x20\x22\x20id=\x22' + _0x14d25a[0x1]['replaceAll']('.', '_') + _0x4bf3fc(0x442) + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x397) + _0x14d25a[0x5] + '\x22\x20alt=\x22\x22\x20onclick=\x22openOnImageClick(this,\x20\x27' + _0x4b7bb8 + _0x4bf3fc(0x4db) + _0x51a7f5 + _0x4bf3fc(0x2a5) + _0x5033c2 + _0x4bf3fc(0x31b) + _0x22bf12 + _0x4bf3fc(0x491) + _0x22bf12 + '\x22/><span\x20class=\x22tooltiptexts\x22\x20id=\x22' + _0x14d25a[0x1][_0x4bf3fc(0x320)]('.', '_') + _0x4bf3fc(0x37f) + _0x14d25a[0x5][_0x4bf3fc(0x444)]('.')[0x0] + _0x4bf3fc(0x306);
                        }
                        _0x42699f[_0x4bf3fc(0x1f9)](_0x4bf3fc(0x281)) ? $('#swicons' + _0x135ec9)['append'](_0x235575) : $('#' + _0x135ec9)['append'](_0x235575);
                    }
                    if (_0x14d25a[0x1] == _0x14d25a[0x1][_0x4bf3fc(0x444)](':')[0x0] + _0x4bf3fc(0x466)) {
                        var _0x1063a5 = _0x14d25a[0x0],
                            _0x592680 = _0x14d25a[0x1][_0x4bf3fc(0x444)](':')[0x0][_0x4bf3fc(0x320)]('.', '_');
                        document[_0x4bf3fc(0x431)](_0x592680 + _0x4bf3fc(0x466))[_0x4bf3fc(0x309)](_0x4bf3fc(0x33b), function () {
                            openNav(_0x1063a5, siteName, _0x318587);
                        });
                    }
                });
            }), showLoader('ps_hw');
        } else $(_0xbffb78(0x406) + _0x318587)[_0xbffb78(0x2e0)](), $(_0xbffb78(0x42f) + _0x318587)[_0xbffb78(0x2e0)](), $(_0xbffb78(0x2a6) + _0x318587)['show']();
    } else {
        document['getElementById'](_0xbffb78(0x1e3))[_0xbffb78(0x3c5)] = _0xbffb78(0x45e) + _0x2bb81f + '\x20)', document[_0xbffb78(0x431)](_0xbffb78(0x1e3))[_0xbffb78(0x3b0)][_0xbffb78(0x326)] = _0xbffb78(0x275);
        var _0x5c26a8 = 0x2710;
        setTimeout(_0x67e01c, _0x5c26a8);

        function _0x67e01c() {
            var _0x2c9475 = _0xbffb78;
            document[_0x2c9475(0x431)](_0x2c9475(0x1e3))[_0x2c9475(0x3b0)][_0x2c9475(0x326)] = _0x2c9475(0x432);
        }
        var _0x5eba47 = document[_0xbffb78(0x488)](_0xbffb78(0x247))['length'],
            _0x4e0776 = document[_0xbffb78(0x431)]('vms_hw')[_0xbffb78(0x21f)];
        document[_0xbffb78(0x488)](_0xbffb78(0x394))[_0xbffb78(0x1cd)](_0x47e889 => {
            var _0x34c59c = _0xbffb78;
            _0x47e889[_0x34c59c(0x4e9)][_0x34c59c(0x4df)](_0x34c59c(0x230) + _0x2bb81f[_0x34c59c(0x320)]('.', '_')) ? (_0x47e889['classList'][_0x34c59c(0x465)](_0x34c59c(0x26d)), !_0x47e889[_0x34c59c(0x4e9)][_0x34c59c(0x4df)](_0x34c59c(0x496)) && _0x47e889[_0x34c59c(0x4e9)][_0x34c59c(0x489)]('display_vms')) : (_0x47e889[_0x34c59c(0x4e9)][_0x34c59c(0x465)](_0x34c59c(0x496)), !_0x47e889[_0x34c59c(0x4e9)]['contains'](_0x34c59c(0x26d)) && _0x47e889[_0x34c59c(0x4e9)]['add'](_0x34c59c(0x26d)));
        }), _0x5eba47 = document[_0xbffb78(0x488)](_0xbffb78(0x247))[_0xbffb78(0x1bd)], _0x4e0776 = document[_0xbffb78(0x431)]('vms_hw')[_0xbffb78(0x21f)], _0x5eba47 == _0x4e0776 ? document[_0xbffb78(0x431)](_0xbffb78(0x2d8))['style'][_0xbffb78(0x326)] = _0xbffb78(0x275) : document[_0xbffb78(0x431)](_0xbffb78(0x2d8))[_0xbffb78(0x3b0)][_0xbffb78(0x326)] = _0xbffb78(0x432);
    }
}

function setstatusdata(_0xc9a6d0) {
    var _0x54b553 = _0x81ccdf;
    _0xc9a6d0['responseData'][0x0][_0x54b553(0x3a3)] == 0x1f4 ? (server_report = {}, swal({
        'title': _0x54b553(0x39c),
        'text': _0x54b553(0x3ac),
        'type': 'warning',
        'confirmButtonClass': _0x54b553(0x3e3),
        'closeOnConfirm': !![]
    })) : server_report = _0xc9a6d0['responseData'][0x0]['status_data'][_0x54b553(0x350)]['data'], server_report = _0xc9a6d0[_0x54b553(0x47b)][0x0]['status_data'][_0x54b553(0x350)]['data'];
}

function getServerHostData() {
    var _0x1a4124 = _0x81ccdf;
    showLoader(_0x1a4124(0x311)), requestDataFromServer(_0x1a4124(0x445), {
        'sitename': params[_0x1a4124(0x48c)](_0x1a4124(0x461))
    }, type = _0x1a4124(0x1c9))[_0x1a4124(0x338)](nicconnectFetch), requestDataFromServer(_0x1a4124(0x2b7), {
        'sitename': params['get']('site')
    }, type = _0x1a4124(0x1c9))['done'](createServerButtons);
}

function nicconnectFetch(_0x8238a8) {
    var _0x3ee154 = _0x81ccdf;
    _0x8238a8[_0x3ee154(0x47b)][_0x3ee154(0x1bd)] > 0x0 && _0x8238a8[_0x3ee154(0x47b)][_0x3ee154(0x1cd)](function (_0x3ca033, _0x4279d1) {
        var _0xe81c00 = _0x3ee154;
        responseFromServer = _0x3ca033['nicconnect_data'];
        if (Object[_0xe81c00(0x385)](responseFromServer)[_0xe81c00(0x1bd)] > 0x0) {
            var _0x3b2980 = responseFromServer[_0xe81c00(0x200)];
            _0x3b2980[_0xe81c00(0x34d)] == 0xc8 && _0x3b2980[_0xe81c00(0x448)][_0xe81c00(0x1bd)] > 0x0 && _0x3b2980[_0xe81c00(0x448)][_0xe81c00(0x1cd)](function (_0x49fb05) {
                var _0x3f5451 = _0xe81c00;
                tog_nicconnect[_0x49fb05[0x1][_0x3f5451(0x320)]('.', '_')] = {
                    'start': _0x49fb05[0x1],
                    'end': _0x49fb05[0x10],
                    'status': _0x49fb05[0xb]
                }, nicconnect[_0x3f5451(0x250)](_0x49fb05);
            });
        }
    });
}

function createServerButtons(_0x1f8e44) {
    var _0x2cc54f = _0x81ccdf;
    const _0x38d90e = Math[_0x2cc54f(0x4e0)]()[_0x2cc54f(0x2da)](0x24)[_0x2cc54f(0x45d)](0x2, 0x5);
    if (_0x1f8e44 == undefined) return;
    entityResponse = _0x1f8e44['responseData'];
    if (_0x1f8e44[_0x2cc54f(0x47b)]['length'] > 0x0) {
        var _0x4e14fa = {},
            _0x5a7796 = 0x0,
            _0x4abfd7 = 0x0;
        _0x1f8e44['responseData'][_0x2cc54f(0x1cd)](function (_0x256563, _0x3e7a27) {
            var _0x31167e = _0x2cc54f;
            responseFromServer = _0x256563['nodes_data'];
            if (Object[_0x31167e(0x385)](responseFromServer)['length'] > 0x0) {
                var _0x85ba26 = responseFromServer[_0x31167e(0x304)];
                _0x85ba26['status'] == 0xc8 && _0x85ba26[_0x31167e(0x448)][_0x31167e(0x1bd)] > 0x0 ? _0x85ba26[_0x31167e(0x448)][_0x31167e(0x1cd)](function (_0x44b76e) {
                    var _0x4c7e43 = _0x31167e;
                    server_hosts[_0x44b76e[0x1]] = _0x44b76e;
                    var _0x1aba3e = '',
                        _0x281801 = '';
                    _0x44b76e[0x1][_0x4c7e43(0x1f9)](':') ? _0x1aba3e = _0x4c7e43(0x375) + _0x44b76e[0x1]['split'](':')[0x0][_0x4c7e43(0x320)]('.', '_') : _0x1aba3e = 'ip_' + _0x44b76e[0x1][_0x4c7e43(0x320)]('.', '_');
                    _0x281801 = _0x44b76e[0xb];
                    var _0x522e8e = server_report[_0x44b76e[0x1][_0x4c7e43(0x2da)]()],
                        _0x2c66de = _0x4c7e43(0x261);
                    !(_0x522e8e['0'] == undefined) && _0x522e8e['0'] > 0x0 && (_0x2c66de += _0x4c7e43(0x27d) + _0x522e8e['0'] + _0x4c7e43(0x4d9));
                    !(_0x522e8e['1'] == undefined) && _0x522e8e['1'] > 0x0 && (_0x2c66de += '<div\x20class=\x22badgetltp-elem\x22\x20style=\x22color:orange;font-weight:bold\x22>' + _0x522e8e['1'] + _0x4c7e43(0x4d9));
                    !(_0x522e8e['3'] == undefined) && _0x522e8e['3'] > 0x0 && (_0x2c66de += _0x4c7e43(0x39f) + _0x522e8e['3'] + _0x4c7e43(0x4d9));
                    !(_0x522e8e['2'] == undefined) && _0x522e8e['2'] > 0x0 && (_0x2c66de += _0x4c7e43(0x1df) + _0x522e8e['2'] + _0x4c7e43(0x4d9));
                    !(_0x522e8e['4'] == undefined) && _0x522e8e['4'] > 0x0 && (_0x2c66de += _0x4c7e43(0x2d3) + _0x522e8e['4'] + _0x4c7e43(0x4d9));
                    _0x2c66de += _0x4c7e43(0x4d9);
                    var _0x57e5d2 = '';
                    if (!(_0x522e8e['0'] == undefined) && _0x522e8e['0'] > 0x0) _0x57e5d2 += _0x4c7e43(0x256) + _0x1aba3e + _0x4c7e43(0x36f) + _0x2c66de + '</i><div\x20class=\x22num-data\x22>' + _0x522e8e['0'] + _0x4c7e43(0x4a3);
                    else {
                        if (!(_0x522e8e['1'] == undefined) && _0x522e8e['1'] > 0x0) _0x57e5d2 += _0x4c7e43(0x298) + _0x1aba3e + '\x22\x20><i\x20class=\x22mdi\x20icon-data\x20\x20mdi-arrow-left-drop-circle\x22>' + _0x2c66de + '</i><div\x20class=\x22num-data\x22>' + _0x522e8e['1'] + _0x4c7e43(0x4a3);
                        else {
                            if (!(_0x522e8e['3'] == undefined) && _0x522e8e['3'] > 0x0) _0x57e5d2 += _0x4c7e43(0x3ad) + _0x1aba3e + _0x4c7e43(0x3b2) + _0x2c66de + '</i><div\x20class=\x22num-data\x22>' + _0x522e8e['3'] + _0x4c7e43(0x4a3);
                            else {
                                if (!(_0x522e8e['2'] == undefined) && _0x522e8e['2'] > 0x0) _0x57e5d2 += '<span\x20\x20class=\x22badgetltp\x20\x20badge\x20\x22\x20\x20style=\x22background-color:green\x22\x20\x20id=\x22badge' + _0x1aba3e + _0x4c7e43(0x3b2) + _0x2c66de + '</i><div\x20class=\x22num-data\x22>' + _0x522e8e['2'] + _0x4c7e43(0x4a3);
                                else !(_0x522e8e['4'] == undefined) && _0x522e8e['4'] > 0x0 && (_0x57e5d2 += _0x4c7e43(0x215) + _0x1aba3e + '\x22\x20><i\x20class=\x22mdi\x20icon-data\x20\x20mdi-arrow-left-drop-circle\x22>' + _0x2c66de + _0x4c7e43(0x1da) + _0x522e8e['4'] + _0x4c7e43(0x4a3));
                            }
                        }
                    } (criticalStatusCount[_0x1aba3e] == undefined || criticalStatusCount[_0x1aba3e] == null) && (criticalStatusCount[_0x1aba3e] = 0x0);
                    (okStatusCount[_0x1aba3e] == undefined || okStatusCount[_0x1aba3e] == null) && (okStatusCount[_0x1aba3e] = 0x0);
                    (pendingStatusCount[_0x1aba3e] == undefined || pendingStatusCount[_0x1aba3e] == null) && (pendingStatusCount[_0x1aba3e] = 0x0);
                    (warningStatusCount[_0x1aba3e] == undefined || warningStatusCount[_0x1aba3e] == null) && (warningStatusCount[_0x1aba3e] = 0x0);
                    (unknownStatusCount[_0x1aba3e] == undefined || unknownStatusCount[_0x1aba3e] == null) && (unknownStatusCount[_0x1aba3e] = 0x0);
                    if (_0x281801 == 0x2) okStatusCount[_0x1aba3e] += 0x1;
                    else {
                        if (_0x281801 == 0x0) criticalStatusCount[_0x1aba3e] += 0x1;
                        else {
                            if (_0x281801 == 0x3) unknownStatusCount[_0x1aba3e] += 0x1;
                            else _0x281801 == 0x1 && (warningStatusCount[_0x1aba3e] += 0x1);
                        }
                    }
                    if (typeof (_0x44b76e[0xb] == _0x4c7e43(0x2b0))) var _0x281801 = parseInt(_0x44b76e[0xb]);
                    else var _0x281801 = _0x44b76e[0xb];
                    var _0x57deed;
                    _0x281801 === 0x0 && (_0x4e14fa[_0x4c7e43(0x324)] = ![], entitySelectedsite == '\x20' && (entitySelectedsite = _0x256563[_0x4c7e43(0x461)]), _0x57deed = _0x4c7e43(0x27a));
                    _0x281801 === 0x2 && (_0x57deed = _0x4c7e43(0x354));
                    _0x281801 === 0x1 && (_0x57deed = _0x4c7e43(0x42b));
                    _0x281801 === 0x3 && (_0x57deed = _0x4c7e43(0x283));
                    _0x281801 === 0x4 && (_0x57deed = _0x4c7e43(0x3af));
                    var _0x25bdce = '',
                        _0x196e5f = _0x4c7e43(0x375) + _0x44b76e[0x1]['replaceAll']('.', '_'),
                        _0x35be58 = _0x4c7e43(0x230) + _0x44b76e['14'][_0x4c7e43(0x320)]('.', '_');
                    _0x25bdce += _0x4c7e43(0x1bc) + _0x44b76e[0x1][_0x4c7e43(0x320)]('.', '_') + _0x4c7e43(0x46a) + _0x44b76e[0x1][_0x4c7e43(0x320)]('.', '_') + ':NIC\x20' + _0x35be58 + _0x4c7e43(0x251) + _0x44b76e[0xc] + _0x4c7e43(0x258) + _0x44b76e[0x1] + _0x4c7e43(0x40e) + _0x196e5f + _0x4c7e43(0x28c) + _0x57deed + _0x4c7e43(0x1ee) + _0x57e5d2 + _0x4c7e43(0x43c) + _0x44b76e[0x1] + '</br>' + (_0x44b76e[0xc] != '' ? '(' + _0x44b76e[0xc] + ')' : _0x44b76e[0xc]) + _0x4c7e43(0x226), _0x44b76e[0x11] == 'physical' ? (_0x5a7796++, $('#ps_hw')[_0x4c7e43(0x322)](_0x25bdce), $(_0x4c7e43(0x3a2))['css'](_0x4c7e43(0x3c4), _0x4c7e43(0x1cf)), $(_0x4c7e43(0x2cf))[_0x4c7e43(0x27e)](_0x4c7e43(0x326), _0x4c7e43(0x368)), $(_0x4c7e43(0x2c1))[_0x4c7e43(0x2e0)]()) : (_0x4abfd7++, $(_0x4c7e43(0x1f7))[_0x4c7e43(0x322)](_0x25bdce), $(_0x4c7e43(0x1de))[_0x4c7e43(0x27e)](_0x4c7e43(0x326), _0x4c7e43(0x368)));
                }) : _0x4e14fa[_0x31167e(0x324)] = ![];
            } else _0x4e14fa[_0x31167e(0x324)] = ![];
            sitesData[_0x31167e(0x250)](_0x4e14fa);
        }), makeWebSocConnectionk8(siteResponse[0x0][_0x2cc54f(0x3fb)], _0x4e14fa[_0x2cc54f(0x461)], 0x0, 0x0, _0x38d90e), makeWebSwitchConnection(siteResponse[0x0]['websocket_url'], _0x4e14fa[_0x2cc54f(0x461)], 0x0, _0x38d90e);
        var _0x4bad56 = entityResponse[0x0];
        if (_0x4bad56 && _0x4bad56[_0x2cc54f(0x3a3)] === 0xc8 && _0x4bad56[_0x2cc54f(0x313)]['hosts']['data'][_0x2cc54f(0x1bd)] > 0x0) {
            if (_0x5a7796) {
                var _0x22adc3 = 'pserversearch-row';
                $(_0x2cc54f(0x1f3))['html']('<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>PHYSICAL\x20SERVERS<div\x20style=\x22background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center\x22>' + _0x5a7796 + _0x2cc54f(0x1f2) + _0x22adc3 + _0x2cc54f(0x3fe) + _0x22adc3 + _0x2cc54f(0x497)), $(_0x2cc54f(0x1f3))[_0x2cc54f(0x322)](_0x2cc54f(0x455) + _0x2cc54f(0x4ce) + '\x27)\x22></i><i\x20class=\x22icon-close\x20icon-evts\x22\x20id=\x22icon-close\x22\x20onclick=\x22closesearchbar(\x27' + _0x22adc3 + _0x2cc54f(0x3bf));
            }
            if (_0x4abfd7) {
                var _0x22adc3 = 'vmserversearch-row';
                $(_0x2cc54f(0x430))[_0x2cc54f(0x203)](_0x2cc54f(0x1b9) + _0x4abfd7 + _0x2cc54f(0x1f2) + _0x22adc3 + _0x2cc54f(0x3fe) + _0x22adc3 + '\x27)\x22\x20style=\x22font-size:\x2016px;\x22></i></div>'), $(_0x2cc54f(0x430))[_0x2cc54f(0x322)](_0x2cc54f(0x266) + _0x2cc54f(0x30e) + _0x2cc54f(0x472) + _0x22adc3 + '\x27)\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:12px;\x22></i></div></div><div\x20class=\x22col-2\x22\x20text-right></div></div>');
            }
            sortAndGroupElements(psHw), sortAndGroupElements(vmsHw), switchs()[_0x2cc54f(0x2bc)](function () {
                var _0x2e348b = _0x2cc54f;
                nicconnect[_0x2e348b(0x1cd)](function (_0x33dfb7) {
                    var _0x355a77 = _0x2e348b,
                        _0x49d940 = ';';
                    if (document[_0x355a77(0x431)](_0x33dfb7[0x1][_0x355a77(0x320)]('.', '_'))) _0x49d940 = document['getElementById'](_0x33dfb7[0x1][_0x355a77(0x320)]('.', '_'));
                    else {
                        var _0x289a97 = document[_0x355a77(0x3bd)](_0x33dfb7[0x1]['replaceAll']('.', '_'));
                        _0x49d940 = _0x289a97[0x0];
                    }
                    var _0x3603b5 = '';
                    if (document[_0x355a77(0x431)](_0x33dfb7[0x10][_0x355a77(0x320)]('.', '_'))) _0x3603b5 = document[_0x355a77(0x431)](_0x33dfb7[0x10][_0x355a77(0x320)]('.', '_'));
                    else {
                        var _0x481dab = document[_0x355a77(0x3bd)](_0x33dfb7[0x10]['replaceAll']('.', '_'));
                        _0x3603b5 = _0x481dab[0x0];
                    }
                    if (_0x49d940 != null && _0x3603b5 != null && _0x3603b5 != undefined) {
                        var _0x237908;
                        if (_0x33dfb7[0xb][_0x355a77(0x2da)]() == '2') {
                            var _0x4910b9 = new LeaderLine(_0x49d940, _0x3603b5, {
                                'hide': !![],
                                'color': _0x355a77(0x354),
                                'positionByWindowResize': ![],
                                'size': 0x2,
                                'endPlug': _0x355a77(0x1be),
                                'startPlug': _0x355a77(0x439),
                                'startPlugColor': 'green',
                                'outlineColor': 'green',
                                'endPlugColor': _0x355a77(0x425),
                                'outline': !![],
                                'startPlugOutline': !![],
                                'endPlugOutline': !![],
                                'startPlugOutlineColor': '#000000',
                                'endPlugOutlineColor': '#000000'
                            });
                            _0x49d940[_0x355a77(0x309)](_0x355a77(0x308), function () {
                                var _0x422b1c = _0x355a77;
                                _0x4910b9[_0x422b1c(0x2e0)]([_0x422b1c(0x1ff)[{
                                    'duration': 0x12c,
                                    'timing': 'linear'
                                }]]);
                            }, ![]), _0x49d940[_0x355a77(0x309)](_0x355a77(0x38d), function () {
                                var _0x1c2b2c = _0x355a77;
                                _0x4910b9[_0x1c2b2c(0x3d1)]([_0x1c2b2c(0x1ff)[{
                                    'duration': 0x12c,
                                    'timing': _0x1c2b2c(0x282)
                                }]]);
                            }, ![]), _0x3603b5[_0x355a77(0x309)](_0x355a77(0x308), function () {
                                var _0x1f27bd = _0x355a77;
                                _0x4910b9['show']([_0x1f27bd(0x1ff)[{
                                    'duration': 0x12c,
                                    'timing': _0x1f27bd(0x282)
                                }]]);
                            }, ![]), _0x3603b5['addEventListener']('mouseout', function () {
                                var _0x4c5ac3 = _0x355a77;
                                _0x4910b9[_0x4c5ac3(0x3d1)]([_0x4c5ac3(0x1ff)[{
                                    'duration': 0x12c,
                                    'timing': 'linear'
                                }]]);
                            }, ![]), $('#s_hw,\x20#server-div,\x20#ps_hw,\x20#vms_hw')['on']('scroll', AnimEvent[_0x355a77(0x489)](function () {
                                _0x4910b9['position']();
                            })), $('.icon-evts')[_0x355a77(0x2f5)](function () {
                                var _0x59905a = _0x355a77;
                                $(this)['on'](_0x59905a(0x33b), AnimEvent[_0x59905a(0x489)](function () {
                                    setTimeout(function () {
                                        _0x4910b9['position']();
                                    }, 0x7d0);
                                }));
                            }), $(_0x355a77(0x37d))[_0x355a77(0x2f5)](function () {
                                var _0x43f7c5 = _0x355a77;
                                $(this)['on']('click', AnimEvent[_0x43f7c5(0x489)](function () {
                                    setTimeout(function () {
                                        var _0x184a5c = _0x5292;
                                        _0x4910b9[_0x184a5c(0x49e)]();
                                    }, 0x7d0);
                                }));
                            }), getarrowdata('s' + _0x33dfb7[0x1][_0x355a77(0x320)]('.', '_'), _0x4910b9), niccon_links[_0x33dfb7[0x1][_0x355a77(0x320)]('.', '_')] = _0x4910b9;
                        } else {
                            var _0x57123b = '';
                            switch (_0x33dfb7[0xb]) {
                                case 0x1:
                                    _0x237908 = _0x355a77(0x27b), _0x57123b = 'orange';
                                    break;
                                case 0x0:
                                    _0x237908 = _0x355a77(0x27a), _0x57123b = 'red';
                                    break;
                                default:
                                    _0x57123b = _0x355a77(0x2e5), _0x237908 = '#ff3d57';
                            }
                            var _0x4910b9 = new LeaderLine(_0x49d940, _0x3603b5, {
                                'color': _0x237908,
                                'positionByWindowResize': ![],
                                'size': 0x2,
                                'endPlug': _0x355a77(0x1be),
                                'startPlug': _0x355a77(0x439),
                                'startPlugColor': _0x57123b,
                                'outlineColor': _0x57123b,
                                'endPlugColor': _0x57123b,
                                'outline': !![],
                                'startPlugOutline': !![],
                                'endPlugOutline': !![],
                                'startPlugOutlineColor': _0x355a77(0x3af),
                                'endPlugOutlineColor': _0x355a77(0x3af)
                            });
                            $(_0x355a77(0x1bb))['on'](_0x355a77(0x4c6), AnimEvent[_0x355a77(0x489)](function () {
                                var _0x5c6eaf = _0x355a77;
                                _0x4910b9[_0x5c6eaf(0x49e)]();
                            })), $(_0x355a77(0x336))['each'](function () {
                                var _0x2bc357 = _0x355a77;
                                $(this)['on'](_0x2bc357(0x33b), AnimEvent[_0x2bc357(0x489)](function () {
                                    setTimeout(function () {
                                        var _0x4d8ee6 = _0x5292;
                                        _0x4910b9[_0x4d8ee6(0x49e)]();
                                    }, 0x7d0);
                                }));
                            }), $(_0x355a77(0x37d))[_0x355a77(0x2f5)](function () {
                                var _0x1d170e = _0x355a77;
                                $(this)['on']('click', AnimEvent[_0x1d170e(0x489)](function () {
                                    setTimeout(function () {
                                        var _0x4f277d = _0x5292;
                                        _0x4910b9[_0x4f277d(0x49e)]();
                                    }, 0x7d0);
                                }));
                            }), getarrowdata('s' + _0x33dfb7[0x1]['replaceAll']('.', '_'), _0x4910b9), niccon_links[_0x33dfb7[0x1][_0x355a77(0x320)]('.', '_')] = _0x4910b9;
                        }
                    }
                });
                for (let _0x21ac26 = 0x0; _0x21ac26 < layers[_0x2e348b(0x1bd)]; _0x21ac26++) {
                    arrowdata[_0x21ac26][_0x2e348b(0x1cd)](function (_0x26d9ed) {
                        var _0x3aba0f = _0x2e348b,
                            _0x29f493 = _0x26d9ed[0x1][_0x3aba0f(0x444)](':')[0x1],
                            _0x18f220 = layers[_0x21ac26]['split']('_')[0x0],
                            _0x9463d7 = '';
                        if (_0x26d9ed[0x1][_0x3aba0f(0x1f9)](':p')) _0x9463d7 = 'p_' + _0x26d9ed[0x7][_0x3aba0f(0x320)]('.', '_');
                        else _0x26d9ed[0x1][_0x3aba0f(0x1f9)](':s') && (_0x9463d7 = 's_' + _0x26d9ed[0x7][_0x3aba0f(0x320)]('.', '_'));
                        if (_0x26d9ed[0xa] != _0x3aba0f(0x4c5) && jQuery[_0x3aba0f(0x24c)](_0x26d9ed[0xa]) != !![] && _0x26d9ed[0xa] != _0x3aba0f(0x432)) {
                            tog_arrowdata[_0x26d9ed[0x1][_0x3aba0f(0x320)]('.', '_')] = {
                                'start': _0x26d9ed[0x1],
                                'end': _0x26d9ed[0xa],
                                'status': _0x26d9ed[0xb]
                            };
                            var _0xbf5c31 = document[_0x3aba0f(0x431)](_0x9463d7)[_0x3aba0f(0x431)](_0x26d9ed[0x1]['split'](':')[0x1]),
                                _0x3795bd = '',
                                _0xd7ebfb = '';
                            if (_0x26d9ed[0xa][_0x3aba0f(0x1f9)](':p')) _0xd7ebfb = 'p_' + _0x26d9ed[0xa][_0x3aba0f(0x444)](':')[0x0][_0x3aba0f(0x320)]('.', '_');
                            else _0x26d9ed[0xa][_0x3aba0f(0x1f9)](':s') && (_0xd7ebfb = 's_' + _0x26d9ed[0xa][_0x3aba0f(0x444)](':')[0x0][_0x3aba0f(0x320)]('.', '_'));
                            if (_0x26d9ed[0xa]['includes'](':') && document['getElementById'](_0x26d9ed[0xa]['split'](':')[0x0][_0x3aba0f(0x320)]('.', '_')) != null) _0x3795bd = document[_0x3aba0f(0x431)](_0xd7ebfb)[_0x3aba0f(0x431)](_0x26d9ed[0xa][_0x3aba0f(0x444)](':')[0x1]);
                            else {
                                var _0x6cbebd = document['getElementsByName'](_0x26d9ed[0xa][_0x3aba0f(0x444)](':')[0x0][_0x3aba0f(0x320)]('.', '_') + _0x3aba0f(0x32a)),
                                    _0x18dba5 = document[_0x3aba0f(0x3bd)](_0x26d9ed[0xa][_0x3aba0f(0x444)](':')[0x0][_0x3aba0f(0x320)]('.', '_') + _0x3aba0f(0x32a));
                                _0x3795bd = _0x18dba5[0x0];
                            }
                            if (_0x26d9ed[0x5] == _0x3aba0f(0x47e) && _0x29f493 != undefined && _0x29f493 != null && _0xbf5c31 != null && _0x3795bd != null && _0x3795bd != undefined) {
                                var _0x1cf40b;
                                if (_0x26d9ed[0xb]['toString']() == '2') {
                                    var _0x331f6e = document[_0x3aba0f(0x431)]('g-switch'),
                                        _0x51bd79 = new LeaderLine(_0xbf5c31, _0x3795bd, {
                                            'color': _0x3aba0f(0x354),
                                            'hide': !![],
                                            'positionByWindowResize': ![],
                                            'size': 0x2,
                                            'endPlug': _0x3aba0f(0x1be),
                                            'startPlug': _0x3aba0f(0x439),
                                            'startPlugColor': 'green',
                                            'outlineColor': _0x3aba0f(0x425),
                                            'endPlugColor': _0x3aba0f(0x425),
                                            'outline': !![],
                                            'startPlugOutline': !![],
                                            'endPlugOutline': !![],
                                            'startPlugOutlineColor': _0x3aba0f(0x3af),
                                            'endPlugOutlineColor': _0x3aba0f(0x3af)
                                        });
                                    _0xbf5c31[_0x3aba0f(0x309)](_0x3aba0f(0x308), function () {
                                        var _0x1c2ef8 = _0x3aba0f;
                                        _0x51bd79[_0x1c2ef8(0x2e0)]([_0x1c2ef8(0x1ff)[{
                                            'duration': 0x12c,
                                            'timing': _0x1c2ef8(0x282)
                                        }]]);
                                    }, ![]), _0xbf5c31[_0x3aba0f(0x309)](_0x3aba0f(0x38d), function () {
                                        var _0xe6fb4c = _0x3aba0f;
                                        _0x51bd79[_0xe6fb4c(0x3d1)]([_0xe6fb4c(0x1ff)[{
                                            'duration': 0x12c,
                                            'timing': _0xe6fb4c(0x282)
                                        }]]);
                                    }, ![]), _0x3795bd[_0x3aba0f(0x309)](_0x3aba0f(0x308), function () {
                                        var _0x2d047f = _0x3aba0f;
                                        _0x51bd79[_0x2d047f(0x2e0)]([_0x2d047f(0x1ff)[{
                                            'duration': 0x12c,
                                            'timing': _0x2d047f(0x282)
                                        }]]);
                                    }, ![]), _0x3795bd[_0x3aba0f(0x309)](_0x3aba0f(0x38d), function () {
                                        var _0x17998b = _0x3aba0f;
                                        _0x51bd79[_0x17998b(0x3d1)]([_0x17998b(0x1ff)[{
                                            'duration': 0x12c,
                                            'timing': 'linear'
                                        }]]);
                                    }, ![]), $(_0x3aba0f(0x3bc))['on']('scroll', AnimEvent['add'](function () {
                                        var _0x4e3934 = _0x3aba0f;
                                        _0x51bd79[_0x4e3934(0x49e)]();
                                    })), $(_0x3aba0f(0x271))['on'](_0x3aba0f(0x4c6), AnimEvent[_0x3aba0f(0x489)](function () {
                                        var _0xabcadc = _0x3aba0f;
                                        _0x51bd79[_0xabcadc(0x49e)]();
                                    })), $('#e-switch')['on'](_0x3aba0f(0x4c6), AnimEvent[_0x3aba0f(0x489)](function () {
                                        var _0x440431 = _0x3aba0f;
                                        _0x51bd79[_0x440431(0x49e)]();
                                    })), $('#g-div')['on'](_0x3aba0f(0x4c6), AnimEvent[_0x3aba0f(0x489)](function () {
                                        var _0x127213 = _0x3aba0f;
                                        _0x51bd79[_0x127213(0x49e)]();
                                    })), $('#s_hw')['on'](_0x3aba0f(0x4c6), AnimEvent[_0x3aba0f(0x489)](function () {
                                        _0x51bd79['position']();
                                    })), $(_0x3aba0f(0x312))['on']('scroll', AnimEvent[_0x3aba0f(0x489)](function () {
                                        _0x51bd79['position']();
                                    })), $(_0x3aba0f(0x3ee))['on'](_0x3aba0f(0x4c6), AnimEvent[_0x3aba0f(0x489)](function () {
                                        _0x51bd79['position']();
                                    })), $('#vms_hw')['on'](_0x3aba0f(0x4c6), AnimEvent['add'](function () {
                                        var _0x1b8d07 = _0x3aba0f;
                                        _0x51bd79[_0x1b8d07(0x49e)]();
                                    })), $(_0x3aba0f(0x336))[_0x3aba0f(0x2f5)](function () {
                                        var _0x38d30e = _0x3aba0f;
                                        $(this)['on']('click', AnimEvent[_0x38d30e(0x489)](function () {
                                            setTimeout(function () {
                                                var _0x4b5038 = _0x5292;
                                                _0x51bd79[_0x4b5038(0x49e)]();
                                            }, 0x7d0);
                                        }));
                                    }), $('.fancy')[_0x3aba0f(0x2f5)](function () {
                                        var _0x3398e9 = _0x3aba0f;
                                        $(this)['on'](_0x3398e9(0x33b), AnimEvent[_0x3398e9(0x489)](function () {
                                            setTimeout(function () {
                                                var _0x36bc38 = _0x5292;
                                                _0x51bd79[_0x36bc38(0x49e)]();
                                            }, 0x7d0);
                                        }));
                                    }), getarrowdata('l' + _0x26d9ed[0x7][_0x3aba0f(0x320)]('.', '_') + _0x29f493, _0x51bd79), arrow_links[_0x26d9ed[0x7][_0x3aba0f(0x320)]('.', '_') + ':' + _0x29f493] = _0x51bd79;
                                } else {
                                    var _0x1df1df = '';
                                    switch (_0x26d9ed[0xb]) {
                                        case 0x0:
                                            _0x1cf40b = _0x3aba0f(0x27a), _0x1df1df = _0x3aba0f(0x2fd);
                                            break;
                                        case 0x1:
                                            _0x1cf40b = '#e59105', _0x1df1df = _0x3aba0f(0x25e);
                                            break;
                                        default:
                                            _0x1df1df = _0x3aba0f(0x2e5), _0x1cf40b = _0x3aba0f(0x283);
                                    }
                                    var _0x51bd79 = new LeaderLine(_0xbf5c31, _0x3795bd, {
                                        'color': _0x1cf40b,
                                        'positionByWindowResize': ![],
                                        'size': 0x2,
                                        'endPlug': 'square',
                                        'startPlug': _0x3aba0f(0x439),
                                        'startPlugColor': _0x1df1df,
                                        'outlineColor': _0x1df1df,
                                        'endPlugColor': _0x1df1df,
                                        'outline': !![],
                                        'startPlugOutline': !![],
                                        'endPlugOutline': !![],
                                        'startPlugOutlineColor': '#000000',
                                        'endPlugOutlineColor': _0x3aba0f(0x3af)
                                    });
                                    $(_0x3aba0f(0x3bc))['on'](_0x3aba0f(0x4c6), AnimEvent[_0x3aba0f(0x489)](function () {
                                        var _0x356c71 = _0x3aba0f;
                                        _0x51bd79[_0x356c71(0x49e)]();
                                    })), $('#p-switch')['on'](_0x3aba0f(0x4c6), AnimEvent[_0x3aba0f(0x489)](function () {
                                        var _0x419fa0 = _0x3aba0f;
                                        _0x51bd79[_0x419fa0(0x49e)]();
                                    })), $(_0x3aba0f(0x471))['on'](_0x3aba0f(0x4c6), AnimEvent[_0x3aba0f(0x489)](function () {
                                        _0x51bd79['position']();
                                    })), $(_0x3aba0f(0x2a8))['on'](_0x3aba0f(0x4c6), AnimEvent['add'](function () {
                                        var _0x21646c = _0x3aba0f;
                                        _0x51bd79[_0x21646c(0x49e)]();
                                    })), $('#s_hw')['on']('scroll', AnimEvent[_0x3aba0f(0x489)](function () {
                                        var _0x354ec2 = _0x3aba0f;
                                        _0x51bd79[_0x354ec2(0x49e)]();
                                    })), $(_0x3aba0f(0x312))['on'](_0x3aba0f(0x4c6), AnimEvent[_0x3aba0f(0x489)](function () {
                                        var _0x2b9f5c = _0x3aba0f;
                                        _0x51bd79[_0x2b9f5c(0x49e)]();
                                    })), $('#ps_hw')['on'](_0x3aba0f(0x4c6), AnimEvent['add'](function () {
                                        var _0x1d426d = _0x3aba0f;
                                        _0x51bd79[_0x1d426d(0x49e)]();
                                    })), $('#vms_hw')['on'](_0x3aba0f(0x4c6), AnimEvent['add'](function () {
                                        _0x51bd79['position']();
                                    })), $(_0x3aba0f(0x336))[_0x3aba0f(0x2f5)](function () {
                                        var _0x121a9d = _0x3aba0f;
                                        $(this)['on'](_0x121a9d(0x33b), AnimEvent[_0x121a9d(0x489)](function () {
                                            setTimeout(function () {
                                                var _0x27a9f2 = _0x5292;
                                                _0x51bd79[_0x27a9f2(0x49e)]();
                                            }, 0x7d0);
                                        }));
                                    }), $(_0x3aba0f(0x37d))[_0x3aba0f(0x2f5)](function () {
                                        var _0x6255d1 = _0x3aba0f;
                                        $(this)['on'](_0x6255d1(0x33b), AnimEvent[_0x6255d1(0x489)](function () {
                                            setTimeout(function () {
                                                _0x51bd79['position']();
                                            }, 0x7d0);
                                        }));
                                    }), getarrowdata('l' + _0x26d9ed[0x7][_0x3aba0f(0x320)]('.', '_') + _0x29f493, _0x51bd79), arrow_links[_0x26d9ed[0x7][_0x3aba0f(0x320)]('.', '_') + ':' + _0x29f493] = _0x51bd79;
                                }
                            }
                        }
                    });
                }
                stopLoader(_0x2e348b(0x311));
            }), $(_0x2cc54f(0x3d7))[_0x2cc54f(0x367)](function () {
                var _0x4c09cc = _0x2cc54f;
                $(this)[_0x4c09cc(0x476)](_0x4c09cc(0x486)), $(this)[_0x4c09cc(0x3ab)](_0x4c09cc(0x4d5))['show'](), $(this)[_0x4c09cc(0x3ab)]('.num-data')[_0x4c09cc(0x3d1)]();
            }, function () {
                var _0x5ae6f7 = _0x2cc54f;
                $(this)[_0x5ae6f7(0x346)]('transp-badge'), $(this)['find']('.icon-data')[_0x5ae6f7(0x3d1)](), $(this)[_0x5ae6f7(0x3ab)]('.num-data')['show']();
            });
        } else {
            if (_0x4bad56 && _0x4bad56['code'] === 0xc8 && _0x4bad56[_0x2cc54f(0x313)][_0x2cc54f(0x304)]['data']['length'] === 0x0) {
                var _0x5a689f = '';
                _0x5a689f += '<div\x20id=\x22warningmes\x22\x20style=\x22padding:\x202%;height:25px;margin-top:25%;background:\x20#f44336;border-radius:\x2012px;z-index:\x20999;\x22>', _0x5a689f += _0x2cc54f(0x358), _0x5a689f += _0x2cc54f(0x4d0), _0x5a689f += _0x2cc54f(0x4d9), $(_0x2cc54f(0x1ed))[_0x2cc54f(0x322)](_0x5a689f);
            } else {
                if (_0x4bad56 && _0x4bad56[_0x2cc54f(0x3a3)] === 0x1f4) {
                    var _0x7caa63 = '';
                    _0x7caa63 += '<div\x20id=\x22warningmes\x22\x20style=\x22padding:\x202%;height:25px;margin-top:25%;background:\x20#f44336;border-radius:\x2012px;z-index:\x20999;\x22>', _0x7caa63 += _0x2cc54f(0x358), _0x7caa63 += _0x2cc54f(0x2a9), _0x7caa63 += '</div>', $(_0x2cc54f(0x2f3))['append'](_0x7caa63);
                }
            }
        }
    } else stopLoader(_0x2cc54f(0x311)), $(_0x2cc54f(0x4e7))[_0x2cc54f(0x27e)](_0x2cc54f(0x326), _0x2cc54f(0x432)), $('#node-view\x20#entity-nodata')[_0x2cc54f(0x27e)]('display', 'block'), $(_0x2cc54f(0x245))[_0x2cc54f(0x2ff)](_0x2cc54f(0x4d7));
    if (pageName === _0x2cc54f(0x399)) {
        var _0x4604c8 = siteResponse[0x0];
        onTicketSiteTabchange(entitySelectedsite, _0x4604c8), findCount();
    }
}

function fillNodeDetails(_0x513fb2, _0x306e7b) {
    var _0x179f6f = _0x81ccdf;
    const _0x3aa545 = Math[_0x179f6f(0x4e0)]()['toString'](0x24)[_0x179f6f(0x45d)](0x2, 0x5);
    if (_0x513fb2 == undefined) return;
    entityResponse = _0x513fb2[_0x179f6f(0x47b)];
    if (_0x513fb2[_0x179f6f(0x47b)][_0x179f6f(0x1bd)] > 0x0) {
        _0x513fb2[_0x179f6f(0x47b)]['forEach'](function (_0x3551bf, _0x44c74a) {
            var _0x495321 = _0x179f6f,
                _0x53ed9f = {};
            _0x53ed9f['site'] = _0x3551bf[_0x495321(0x461)], _0x53ed9f[_0x495321(0x324)] = !![], _0x53ed9f[_0x495321(0x278)] = ![], _0x53ed9f['criticalNodeCount'] = 0x0, _0x53ed9f[_0x495321(0x252)] = {
                'host': {
                    'criticalCount': 0x0,
                    'okCount': 0x0,
                    'pendingCount': 0x0,
                    'warningCount': 0x0,
                    'unknownCount': 0x0
                },
                'service': {
                    'criticalCount': 0x0,
                    'okCount': 0x0,
                    'pendingCount': 0x0,
                    'warningCount': 0x0,
                    'unknownCount': 0x0
                }
            }, responseFromServer = _0x3551bf[_0x495321(0x3e9)];
            if (Object['keys'](responseFromServer)['length'] > 0x0) {
                var _0x2e37eb = responseFromServer[_0x495321(0x462)];
                if (_0x2e37eb['status'] == 0xc8 && _0x2e37eb[_0x495321(0x448)][_0x495321(0x1bd)] > 0x0) {
                    var _0x2b19c6 = 0x0;
                    hCriticalStatusCount = 0x0, hOkStatusCount = 0x0, hPendingStatusCount = 0x0, hWarningStatusCount = 0x0, hUnknownStatusCount = 0x0, sCriticalStatusCount = 0x0, sOkStatusCount = 0x0, sPendingStatusCount = 0x0, sWarningStatusCount = 0x0, sUnknownStatusCount = 0x0, _0x2e37eb[_0x495321(0x448)]['forEach'](function (_0x5ec13c) {
                        var _0xb27684 = _0x495321;
                        if (typeof (_0x5ec13c[0xb] == _0xb27684(0x2b0))) var _0x26d13e = parseInt(_0x5ec13c[0xb]);
                        else var _0x26d13e = _0x5ec13c[0xb];
                        _0x26d13e === 0x0 && (_0x2b19c6++, _0x53ed9f[_0xb27684(0x324)] = ![], entitySelectedsite == '\x20' && (entitySelectedsite = _0x3551bf[_0xb27684(0x461)]), _0x5ec13c[0x4] == _0xb27684(0x384) || _0x5ec13c[0x4]['startsWith'](_0xb27684(0x387)) ? hCriticalStatusCount++ : sCriticalStatusCount++), _0x26d13e === 0x2 && (_0x5ec13c[0x4] == 'Host' || _0x5ec13c[0x4]['startsWith'](_0xb27684(0x387)) ? hOkStatusCount++ : sOkStatusCount++), _0x26d13e === 0x1 && (_0x5ec13c[0x4] == _0xb27684(0x384) || _0x5ec13c[0x4]['startsWith'](_0xb27684(0x387)) ? hWarningStatusCount++ : sWarningStatusCount++), _0x26d13e === 0x3 && (_0x5ec13c[0x4] == _0xb27684(0x384) || _0x5ec13c[0x4][_0xb27684(0x262)]('Node') ? hUnknownStatusCount++ : sUnknownStatusCount++);
                    }), _0x53ed9f[_0x495321(0x4ac)] = _0x2b19c6, _0x53ed9f[_0x495321(0x252)][_0x495321(0x4c1)][_0x495321(0x32f)] = hCriticalStatusCount, _0x53ed9f[_0x495321(0x252)][_0x495321(0x4c1)][_0x495321(0x3eb)] = hOkStatusCount, _0x53ed9f[_0x495321(0x252)]['host'][_0x495321(0x361)] = hWarningStatusCount, _0x53ed9f[_0x495321(0x252)]['host'][_0x495321(0x401)] = hUnknownStatusCount, _0x53ed9f[_0x495321(0x252)]['service'][_0x495321(0x32f)] = sCriticalStatusCount, _0x53ed9f[_0x495321(0x252)][_0x495321(0x30b)][_0x495321(0x3eb)] = sOkStatusCount, _0x53ed9f[_0x495321(0x252)][_0x495321(0x30b)][_0x495321(0x361)] = sWarningStatusCount, _0x53ed9f[_0x495321(0x252)][_0x495321(0x30b)][_0x495321(0x401)] = sUnknownStatusCount;
                } else stopLoader(_0x495321(0x1d5) + _0x306e7b), _0x53ed9f['isSuccess'] = ![];
            } else _0x53ed9f['isSuccess'] = ![];
            sitesData[_0x495321(0x250)](_0x53ed9f);
            var _0x27dd12 = siteResponse[0x0];
            clientdata = _0x53ed9f[_0x495321(0x461)], _0x3551bf[_0x495321(0x3e9)][_0x495321(0x462)]['data'] != '' && makeWebSocConnectionk8(_0x27dd12[_0x495321(0x3fb)], _0x53ed9f['site'], 0x0, _0x53ed9f[_0x495321(0x4ac)], _0x3aa545);
        }), sSitehtml = '';
        var _0x401b13 = entityResponse[0x0];
        dispalyNodes(_0x401b13[_0x179f6f(0x3e9)], _0x401b13[_0x179f6f(0x3a3)], _0x306e7b);
    } else stopLoader(_0x179f6f(0x311)), $(_0x179f6f(0x21b))['css'](_0x179f6f(0x326), 'none'), $('#node-view\x20#entity-nodata')['css'](_0x179f6f(0x326), _0x179f6f(0x275)), $(_0x179f6f(0x245))[_0x179f6f(0x2ff)](_0x179f6f(0x4d7));
    if (pageName === 'Dashboard') {
        var _0x1d6563 = siteResponse[0x0];
        onTicketSiteTabchange(entitySelectedsite, _0x1d6563), findCount();
    }
}

function fillHWNodeDetails(_0x45f4f1) {
    var _0x378bb3 = _0x81ccdf;
    const _0x14f416 = Math['random']()[_0x378bb3(0x2da)](0x24)[_0x378bb3(0x45d)](0x2, 0x5);
    if (_0x45f4f1 == undefined) return;
    entityResponse = _0x45f4f1[_0x378bb3(0x47b)];
    if (_0x45f4f1[_0x378bb3(0x47b)][_0x378bb3(0x1bd)] > 0x0) {
        _0x45f4f1[_0x378bb3(0x47b)][_0x378bb3(0x1cd)](function (_0x28f1ea, _0x59ce0e) {
            var _0x51753a = _0x378bb3,
                _0x46a0a5 = {};
            _0x46a0a5['site'] = _0x28f1ea[_0x51753a(0x461)], _0x46a0a5['isSuccess'] = !![], _0x46a0a5[_0x51753a(0x278)] = ![], _0x46a0a5[_0x51753a(0x4ac)] = 0x0, _0x46a0a5['nodeCount'] = {
                'host': {
                    'criticalCount': 0x0,
                    'okCount': 0x0,
                    'pendingCount': 0x0,
                    'warningCount': 0x0,
                    'unknownCount': 0x0
                },
                'service': {
                    'criticalCount': 0x0,
                    'okCount': 0x0,
                    'pendingCount': 0x0,
                    'warningCount': 0x0,
                    'unknownCount': 0x0
                }
            }, responseFromServer = _0x28f1ea['site_data'];
            if (Object[_0x51753a(0x385)](responseFromServer)[_0x51753a(0x1bd)] > 0x0) {
                var _0x186b0e = responseFromServer['nodes'];
                if (_0x186b0e['status'] == 0xc8 && _0x186b0e[_0x51753a(0x448)][_0x51753a(0x1bd)] > 0x0) {
                    var _0x57efdc = 0x0;
                    hCriticalStatusCount = 0x0, hOkStatusCount = 0x0, hPendingStatusCount = 0x0, hWarningStatusCount = 0x0, hUnknownStatusCount = 0x0, sCriticalStatusCount = 0x0, sOkStatusCount = 0x0, sPendingStatusCount = 0x0, sWarningStatusCount = 0x0, sUnknownStatusCount = 0x0, _0x186b0e['data'][_0x51753a(0x1cd)](function (_0x2890b1) {
                        var _0x38d8cc = _0x51753a;
                        _0x2890b1[0x10] != '' && _0x2890b1[0x10] != null && nicconnect[_0x38d8cc(0x250)](_0x2890b1);
                        if (typeof (_0x2890b1[0xb] == _0x38d8cc(0x2b0))) var _0x36c31c = parseInt(_0x2890b1[0xb]);
                        else var _0x36c31c = _0x2890b1[0xb];
                        _0x36c31c === 0x0 && (_0x57efdc++, _0x46a0a5[_0x38d8cc(0x324)] = ![], entitySelectedsite == '\x20' && (entitySelectedsite = _0x28f1ea[_0x38d8cc(0x461)]), _0x2890b1[0x4] == 'Host' || _0x2890b1[0x4]['startsWith']('Node') ? hCriticalStatusCount++ : sCriticalStatusCount++), _0x36c31c === 0x2 && (_0x2890b1[0x4] == _0x38d8cc(0x384) || _0x2890b1[0x4][_0x38d8cc(0x262)](_0x38d8cc(0x387)) ? hOkStatusCount++ : sOkStatusCount++), _0x36c31c === 0x1 && (_0x2890b1[0x4] == _0x38d8cc(0x384) || _0x2890b1[0x4][_0x38d8cc(0x262)](_0x38d8cc(0x387)) ? hWarningStatusCount++ : sWarningStatusCount++), _0x36c31c === 0x3 && (_0x2890b1[0x4] == _0x38d8cc(0x384) || _0x2890b1[0x4]['startsWith'](_0x38d8cc(0x387)) ? hUnknownStatusCount++ : sUnknownStatusCount++);
                    }), _0x46a0a5[_0x51753a(0x4ac)] = _0x57efdc, _0x46a0a5[_0x51753a(0x252)][_0x51753a(0x4c1)]['criticalCount'] = hCriticalStatusCount, _0x46a0a5['nodeCount'][_0x51753a(0x4c1)][_0x51753a(0x3eb)] = hOkStatusCount, _0x46a0a5['nodeCount'][_0x51753a(0x4c1)][_0x51753a(0x361)] = hWarningStatusCount, _0x46a0a5[_0x51753a(0x252)][_0x51753a(0x4c1)][_0x51753a(0x401)] = hUnknownStatusCount, _0x46a0a5[_0x51753a(0x252)][_0x51753a(0x30b)]['criticalCount'] = sCriticalStatusCount, _0x46a0a5[_0x51753a(0x252)][_0x51753a(0x30b)][_0x51753a(0x3eb)] = sOkStatusCount, _0x46a0a5[_0x51753a(0x252)][_0x51753a(0x30b)][_0x51753a(0x361)] = sWarningStatusCount, _0x46a0a5[_0x51753a(0x252)][_0x51753a(0x30b)][_0x51753a(0x401)] = sUnknownStatusCount;
                } else _0x46a0a5[_0x51753a(0x324)] = ![];
            } else _0x46a0a5[_0x51753a(0x324)] = ![];
            sitesData[_0x51753a(0x250)](_0x46a0a5);
            var _0x2565e6 = siteResponse[0x0];
            makeWebSwitchConnection(_0x2565e6[_0x51753a(0x3fb)], _0x46a0a5[_0x51753a(0x461)], 0x0, _0x46a0a5['criticalNodeCount'], _0x14f416);
        });
        var _0x20d2a8 = entityResponse[0x0];
        if (_0x20d2a8 && _0x20d2a8[_0x378bb3(0x3a3)] === 0xc8 && _0x20d2a8[_0x378bb3(0x3e9)][_0x378bb3(0x462)][_0x378bb3(0x448)][_0x378bb3(0x1bd)] > 0x0) displayNodes(_0x20d2a8[_0x378bb3(0x3e9)], _0x20d2a8[_0x378bb3(0x3a3)]);
        else {
            if (_0x20d2a8 && _0x20d2a8[_0x378bb3(0x3a3)] === 0xc8 && _0x20d2a8[_0x378bb3(0x3e9)][_0x378bb3(0x462)][_0x378bb3(0x448)]['length'] === 0x0) {
                var _0x2cfae1 = '';
                _0x2cfae1 += _0x378bb3(0x417), _0x2cfae1 += _0x378bb3(0x358), _0x2cfae1 += _0x378bb3(0x4d0), _0x2cfae1 += '</div>', $(_0x378bb3(0x1ed))[_0x378bb3(0x322)](_0x2cfae1);
            } else {
                if (_0x20d2a8 && _0x20d2a8[_0x378bb3(0x3a3)] === 0x1f4) {
                    var _0x5876c1 = '';
                    _0x5876c1 += _0x378bb3(0x417), _0x5876c1 += _0x378bb3(0x358), _0x5876c1 += '<h3\x20style=\x22text-align:center;margin-top:-10px;\x20font-size:15px;\x22>\x20URL\x20Not\x20Reachable</h3>', _0x5876c1 += '</div>', $('#warningerror')[_0x378bb3(0x322)](_0x5876c1);
                }
            }
        }
    } else stopLoader(_0x378bb3(0x311)), $(_0x378bb3(0x4e7))[_0x378bb3(0x27e)](_0x378bb3(0x326), _0x378bb3(0x432)), $('#node-view\x20#entity-nodata')[_0x378bb3(0x27e)](_0x378bb3(0x326), 'block'), $(_0x378bb3(0x245))[_0x378bb3(0x2ff)]('No\x20Data');
    if (pageName === _0x378bb3(0x399)) {
        var _0xb1ccbd = siteResponse[0x0];
        onTicketSiteTabchange(entitySelectedsite, _0xb1ccbd), findCount();
    }
}

function openmodal(_0x33d041) {
    var _0x5021a8 = _0x81ccdf,
        _0x1ed6a9 = $(_0x33d041)['attr']('id')[_0x5021a8(0x444)]('right')[0x1],
        _0xb38298 = _0x33d041[_0x5021a8(0x301)]('i');
    _0xb38298['classList']['toggle'](_0x5021a8(0x2b1)), _0xb38298[_0x5021a8(0x4e9)]['toggle'](_0x5021a8(0x374)), $(_0x5021a8(0x406) + _0x1ed6a9)['attr'](_0x5021a8(0x25b))['includes']('fullscreen') ? ($('#card' + _0x1ed6a9)[_0x5021a8(0x346)](_0x5021a8(0x229)), $(_0x5021a8(0x35b) + _0x1ed6a9)[_0x5021a8(0x346)]('cyto-fullscreen')) : ($(_0x5021a8(0x406) + _0x1ed6a9)[_0x5021a8(0x476)](_0x5021a8(0x229)), $(_0x5021a8(0x35b) + _0x1ed6a9)[_0x5021a8(0x476)](_0x5021a8(0x4d3)));
}

function dismissfunc(_0x1ef408) {
    var _0x1836f0 = _0x81ccdf;
    _0x1ef408['parentElement'][_0x1836f0(0x3b0)][_0x1836f0(0x326)] = _0x1836f0(0x432);
}

function displayrow(_0x151c8d) {
    var _0x2ea1ed = _0x81ccdf,
        _0x896677 = $(_0x151c8d)[_0x2ea1ed(0x1e8)]('id')[_0x2ea1ed(0x444)](_0x2ea1ed(0x377))[0x1];
    $(_0x151c8d)[_0x2ea1ed(0x1e8)]('id')[_0x2ea1ed(0x444)](_0x2ea1ed(0x377))[0x0] == 'no-' ? (document[_0x2ea1ed(0x431)](_0x2ea1ed(0x381) + _0x896677)[_0x2ea1ed(0x206)]('id', _0x2ea1ed(0x484) + _0x896677), document[_0x2ea1ed(0x431)](_0x2ea1ed(0x4b9) + _0x896677)[_0x2ea1ed(0x3b0)]['display'] = _0x2ea1ed(0x368), $(_0x2ea1ed(0x35b) + _0x896677)[_0x2ea1ed(0x476)](_0x2ea1ed(0x2af))) : (document[_0x2ea1ed(0x431)](_0x2ea1ed(0x484) + _0x896677)['setAttribute']('id', 'no-lens' + _0x896677), document[_0x2ea1ed(0x431)](_0x2ea1ed(0x4b9) + _0x896677)[_0x2ea1ed(0x3b0)][_0x2ea1ed(0x326)] = 'none', $(_0x2ea1ed(0x35b) + _0x896677)[_0x2ea1ed(0x346)](_0x2ea1ed(0x2af)));
}

function pintool(_0x6f3023) {
    var _0x4dde8a = _0x81ccdf,
        _0x6ff78b = document[_0x4dde8a(0x431)](_0x6f3023),
        _0x37a45f = document[_0x4dde8a(0x431)](_0x6f3023 + _0x4dde8a(0x485));
    _0x6ff78b[_0x4dde8a(0x4e9)][_0x4dde8a(0x4df)]('visible-tltp') ? (_0x6ff78b[_0x4dde8a(0x4e9)][_0x4dde8a(0x465)]('visible-tltp'), _0x37a45f[_0x4dde8a(0x3b0)][_0x4dde8a(0x236)] = '#fff') : (_0x6ff78b['classList']['add']('visible-tltp'), _0x37a45f['style'][_0x4dde8a(0x236)] = _0x4dde8a(0x42b));
}

function hovered(_0x580db0, _0x1324ab) {
    var _0x2ff812 = _0x81ccdf,
        _0x311fb1 = _0x1324ab[_0x2ff812(0x211)],
        _0x4fbe81 = _0x311fb1[_0x2ff812(0x4ae)](),
        _0x7c5b9a = $(window),
        _0x44e536 = document['getElementById'](_0x580db0);
    _0x44e536[_0x2ff812(0x3b0)][_0x2ff812(0x326)] = _0x2ff812(0x368), _0x44e536[_0x2ff812(0x3b0)][_0x2ff812(0x49e)] = _0x2ff812(0x1eb);
    var _0x39a0c7 = _0x4fbe81[_0x2ff812(0x260)] / window['innerWidth'] * 0x64;
    if (_0x39a0c7 < 0x55 && (_0x580db0[_0x2ff812(0x1f9)]('NIC') || _0x580db0['includes']('disk'))) _0x44e536['style'][_0x2ff812(0x498)] = '-520%', _0x44e536['style'][_0x2ff812(0x260)] = '70%';
    else {
        if (_0x39a0c7 < 0x55) _0x44e536[_0x2ff812(0x3b0)][_0x2ff812(0x498)] = '-60%';
        else {
            if (_0x39a0c7 > 0x55) { }
        }
    }
}
async function displayNodes(_0x4c2af7, _0x316518) {
    var _0x488d64 = _0x81ccdf;
    if (Object[_0x488d64(0x385)](_0x4c2af7)[_0x488d64(0x1bd)] > 0x0 && _0x4c2af7[_0x488d64(0x462)] && _0x4c2af7[_0x488d64(0x462)][_0x488d64(0x448)][_0x488d64(0x1bd)] > 0x0) {
        $(_0x488d64(0x3a2))[_0x488d64(0x27e)](_0x488d64(0x3c4), _0x488d64(0x1cf)), $('#node-view\x20#s_hw')[_0x488d64(0x27e)](_0x488d64(0x326), _0x488d64(0x368)), $(_0x488d64(0x4de))[_0x488d64(0x2e0)](), $('#node-view\x20#entity-nodata')[_0x488d64(0x27e)](_0x488d64(0x326), _0x488d64(0x432));
        var _0xcdcd49 = sitesData[0x0];
        responseFromServer = _0x4c2af7;
        var _0x5e9919 = [],
            _0x22c26c = [],
            _0x4b67b2 = '',
            _0x86b2c8 = 0x0;
        sortedJson = {};
        var _0x16402a = responseFromServer[_0x488d64(0x462)];
        _0x16402a[_0x488d64(0x34d)] == 0xc8 && ($(_0x488d64(0x316))['html'](_0x488d64(0x44e) + _0x16402a[_0x488d64(0x448)][_0x488d64(0x1bd)] + ')'), _0x16402a[_0x488d64(0x448)][_0x488d64(0x1cd)](function (_0x161798) {
            var _0x58e343 = _0x488d64,
                _0x29d9a8 = '',
                _0x50f44d = '';
            _0x161798[0x1][_0x58e343(0x1f9)](':') ? _0x29d9a8 = _0x58e343(0x375) + _0x161798[0x1][_0x58e343(0x444)](':')[0x0][_0x58e343(0x320)]('.', '_') : _0x29d9a8 = _0x58e343(0x375) + _0x161798[0x1][_0x58e343(0x320)]('.', '_');
            _0x50f44d = _0x161798[0xb];
            (criticalStatusCount[_0x29d9a8] == undefined || criticalStatusCount[_0x29d9a8] == null) && (criticalStatusCount[_0x29d9a8] = 0x0);
            (okStatusCount[_0x29d9a8] == undefined || okStatusCount[_0x29d9a8] == null) && (okStatusCount[_0x29d9a8] = 0x0);
            (pendingStatusCount[_0x29d9a8] == undefined || pendingStatusCount[_0x29d9a8] == null) && (pendingStatusCount[_0x29d9a8] = 0x0);
            (warningStatusCount[_0x29d9a8] == undefined || warningStatusCount[_0x29d9a8] == null) && (warningStatusCount[_0x29d9a8] = 0x0);
            (unknownStatusCount[_0x29d9a8] == undefined || unknownStatusCount[_0x29d9a8] == null) && (unknownStatusCount[_0x29d9a8] = 0x0);
            if (_0x50f44d == 0x2) okStatusCount[_0x29d9a8] += 0x1;
            else {
                if (_0x50f44d == 0x0) criticalStatusCount[_0x29d9a8] += 0x1;
                else {
                    if (_0x50f44d == 0x3) unknownStatusCount[_0x29d9a8] += 0x1;
                    else _0x50f44d == 0x1 && (warningStatusCount[_0x29d9a8] += 0x1);
                }
            }
            _0x86b2c8 = getSizeForNode(_0x161798[0x4]);
            var _0x2a3c02 = _0x161798[0x1];
            if (_0x161798[0x4] != null && (_0x161798[0x4] == _0x58e343(0x384) || _0x161798[0x4][_0x58e343(0x262)]('Node'))) _0x4b67b2 = _0x2a3c02, sortedJson[_0x2a3c02] === undefined && (sortedJson[_0x2a3c02] = {
                'host': '',
                'services': [],
                'hostms': []
            }), sortedJson[_0x2a3c02][_0x58e343(0x4c1)] = _0x161798;
            else {
                var _0x4d15bf = _0x2a3c02['split'](':');
                sortedJson[_0x4d15bf[0x0]] === undefined && (sortedJson[_0x4d15bf[0x0]] = {
                    'host': '',
                    'services': [],
                    'hostms': []
                }), (_0x161798[0x4] == _0x58e343(0x3c9) || _0x161798[0x4] == _0x58e343(0x22c)) && (_0x161798[0x4] == _0x58e343(0x22c) ? (_0x4b67b2 = _0x4d15bf[0x2], sortedJson[_0x4d15bf[0x0]][_0x4d15bf[0x1]] === undefined && (sortedJson[_0x4d15bf[0x0]][_0x4d15bf[0x1]] = []), sortedJson[_0x4d15bf[0x0]][_0x4d15bf[0x1]]['push'](_0x161798)) : (_0x4b67b2 = _0x4d15bf[0x1], sortedJson[_0x4d15bf[0x0]][_0x58e343(0x2e9)][_0x58e343(0x250)](_0x161798))), _0x161798[0x4] != null && (_0x161798[0x4] == _0x58e343(0x412) || _0x161798[0x4]['startsWith'](_0x58e343(0x499))) && (_0x4b67b2 = _0x4d15bf[0x1], sortedJson[_0x4d15bf[0x0]][_0x58e343(0x3e5)][_0x58e343(0x250)](_0x161798)), _0x161798[0x4] != _0x58e343(0x384) && _0x161798[0x4] != 'HostMS' && _0x161798[0x4] != _0x58e343(0x412) && _0x161798[0x4] != _0x58e343(0x22c) && (_0x4b67b2 = _0x4d15bf[0x1] ? _0x4d15bf[0x1] : _0x4d15bf[0x0]);
            }
            var _0x10efdc = _0x58e343(0x217);
            _0x161798[0x8] === null && (_0x10efdc = _0x58e343(0x217));
            var _0x3fa9c3 = {
                'data': {
                    'id': _0x161798[0x0],
                    'fullname': _0x2a3c02,
                    'dashboardenabled': _0x10efdc,
                    'dashboard_url': _0x161798[0x8],
                    'text': _0x4b67b2,
                    'image': image_path + _0x161798[0x5],
                    'color': _0x161798[0xb],
                    'size': _0x86b2c8,
                    'friendlyname': _0x161798[0xc],
                    'niclist': _0x161798[0xd],
                    'volumelist': _0x161798[0xf]
                }
            };
            _0x5e9919[_0x58e343(0x250)](_0x3fa9c3), titleToId[_0x2a3c02] = _0x161798[0x0];
        }));
        var _0x456a72 = responseFromServer[_0x488d64(0x3df)];
        _0x456a72[_0x488d64(0x34d)] == 0xc8 && _0x456a72[_0x488d64(0x448)][_0x488d64(0x1cd)](function (_0x564efe) {
            var _0x398ebf = {
                'data': {
                    'source': _0x564efe[0x0],
                    'target': _0x564efe[0x1],
                    'id': 'id_' + _0x564efe[0x0] + _0x564efe[0x1],
                    'label': _0x564efe[0x2]
                }
            };
            _0x22c26c['push'](_0x398ebf);
        });
        Datanodes = _0x5e9919, hardwarebg = Datanodes;
        var _0x198c87 = 0x0;
        await Datanodes[_0x488d64(0x1cd)](function (_0x819b77) {
            var _0x12581c = _0x488d64,
                _0x2bc829 = '',
                _0x306340 = '',
                _0x556c10 = _0x12581c(0x375) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x444)](':')[0x0][_0x12581c(0x320)]('.', '_'),
                _0xa9137f = document[_0x12581c(0x431)](_0x556c10);
            !_0xa9137f && (_0x2bc829 += _0x12581c(0x1d8) + _0x556c10 + _0x12581c(0x207), _0x2bc829 += _0x12581c(0x470), _0x2bc829 += '<p\x20style=\x22margin-left:2%\x22>', _0x2bc829 += _0x12581c(0x4cb), _0x2bc829 += _0x12581c(0x28b), _0x2bc829 += _0x12581c(0x26c) + _0x556c10 + '\x22></p>', _0x2bc829 += '</div>', _0x2bc829 += _0x12581c(0x29e), _0x2bc829 += '<i\x20class=\x22icon-search\x22\x20id=\x22no-lens' + _0x556c10 + _0x12581c(0x1d4), _0x2bc829 += _0x12581c(0x205) + _0x556c10 + _0x12581c(0x2d1), _0x2bc829 += _0x12581c(0x3f7) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x444)](':')[0x0][_0x12581c(0x320)]('.', '_') + _0x12581c(0x345), _0x2bc829 += '</button>', _0x2bc829 += '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-default\x20table-node\x20btn-ripple\x20sm-hide\x22\x20id=\x22button' + _0x556c10 + _0x12581c(0x4c3), _0x2bc829 += '<i\x20class=\x22icon-tableview\x22\x20id=\x22tableview' + _0x556c10 + _0x12581c(0x1fb), _0x2bc829 += _0x12581c(0x438) + _0x556c10 + _0x12581c(0x25c), _0x2bc829 += _0x12581c(0x272), _0x2bc829 += _0x12581c(0x242) + _0x556c10 + _0x12581c(0x36a), _0x2bc829 += _0x12581c(0x242) + _0x556c10 + _0x12581c(0x47c), _0x2bc829 += '<i\x20class=\x22fa\x20fa-window-restore\x22\x20style=\x22color:\x20#ffffff;font-size:\x2016px;margin-left:\x20-70%;\x22></i>', _0x2bc829 += _0x12581c(0x272), _0x2bc829 += '<button\x20id=\x22hardwaresdata' + _0x556c10 + _0x12581c(0x2f8), _0x2bc829 += _0x12581c(0x403), _0x2bc829 += '<a\x20class=\x22btn\x20selector\x20dropdown-toggle\x22\x20href=\x22#\x22\x20role=\x22button\x22\x20id=\x22dropdownMenuLink\x22\x20data-toggle=\x22dropdown\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22>', _0x2bc829 += _0x12581c(0x494), _0x2bc829 += '</a>', _0x2bc829 += _0x12581c(0x307) + _0x556c10 + '\x22\x20style=\x22top:-150px\x20!important;\x22></div>', _0x2bc829 += _0x12581c(0x29f), _0x2bc829 += _0x12581c(0x272), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += _0x12581c(0x2e8), _0x2bc829 += _0x12581c(0x2b3), _0x2bc829 += _0x12581c(0x48f) + _0x556c10 + '\x22\x20style=\x22margin-left:0%;display:none\x22>', _0x2bc829 += '<div\x20class=\x22\x22\x20id=\x22entity-search\x22>', _0x2bc829 += _0x12581c(0x1bf), _0x2bc829 += '<input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22tag' + _0x556c10 + _0x12581c(0x328), _0x2bc829 += _0x12581c(0x288) + _0x556c10 + '\x22\x20onclick=\x22searchNodes(this)\x22></i>', _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += _0x12581c(0x23e), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += '</div>', _0x2bc829 += _0x12581c(0x3cb) + _0x556c10 + _0x12581c(0x25f), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += '<div\x20class=\x22row\x22\x20style=\x22margin-right:0rem;\x22>', _0x2bc829 += _0x12581c(0x49d) + _0x556c10 + _0x12581c(0x37e), _0x2bc829 += _0x12581c(0x37b) + _0x556c10 + _0x12581c(0x297), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += '<div\x20class=\x22col-2\x20icon-bares\x20mob_hsicon\x22\x20id=\x22swicons' + _0x556c10 + _0x12581c(0x1cb), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += '<div\x20class=\x22pill-contain\x20p-0\x22\x20style\x20=\x20\x22z-index:\x20100;\x22\x20>', _0x2bc829 += '<div\x20class=\x22row\x22\x20style=\x22margin-left:0;\x22>', _0x2bc829 += '<ul\x20class=\x22nav\x20nav-pills\x20mb-2\x22\x20id=\x22pills-tab' + _0x556c10 + '\x22\x20role=\x22tablist\x22>', _0x2bc829 += '\x20<button\x20class=\x22nav-item\x20mx-2\x20\x22>', _0x2bc829 += _0x12581c(0x317) + _0x556c10 + '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-critical' + _0x556c10 + '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-critical\x22\x20aria-selected=\x22true\x22\x20onclick=\x22statusFunction(this);\x22>' + criticalStatusCount[_0x556c10] + _0x12581c(0x212), _0x2bc829 += _0x12581c(0x272), _0x2bc829 += '<button\x20class=\x22nav-item\x20mx-2\x22>', _0x2bc829 += _0x12581c(0x441) + _0x556c10 + '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-ok' + _0x556c10 + _0x12581c(0x3d2) + okStatusCount[_0x556c10] + _0x12581c(0x212), _0x2bc829 += _0x12581c(0x272), _0x2bc829 += _0x12581c(0x3ef), _0x2bc829 += _0x12581c(0x4d8) + _0x556c10 + _0x12581c(0x2c5) + _0x556c10 + _0x12581c(0x3bb) + warningStatusCount[_0x556c10] + _0x12581c(0x3d6), _0x2bc829 += _0x12581c(0x272), _0x2bc829 += _0x12581c(0x3ef), _0x2bc829 += _0x12581c(0x20a) + _0x556c10 + '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-unknown' + _0x556c10 + '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-unknown\x22\x20aria-selected=\x22false\x22\x20onclick=\x22statusFunction(this);\x22>' + unknownStatusCount[_0x556c10] + _0x12581c(0x3d6), _0x2bc829 += _0x12581c(0x272), _0x2bc829 += '<button\x20class=\x22nav-item\x20mx-2\x22>', _0x2bc829 += '\x20\x20\x20\x20<a\x20class=\x22nav-link\x20active\x22\x20id=\x22pills-all-tab' + _0x556c10 + _0x12581c(0x42c) + _0x556c10 + '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-all\x22\x20aria-selected=\x22false\x22\x20onclick=\x22statusFunction(this);\x22>All</a>', _0x2bc829 += '</button>', _0x2bc829 += _0x12581c(0x4cf), _0x2bc829 += _0x12581c(0x2ef), _0x2bc829 += _0x12581c(0x2ef), _0x2bc829 += '</fieldset>', _0x2bc829 += _0x12581c(0x2c3), _0x2bc829 += _0x12581c(0x24f), _0x2bc829 += _0x12581c(0x332), _0x2bc829 += _0x12581c(0x4e8), _0x2bc829 += _0x12581c(0x330) + _0x819b77[_0x12581c(0x448)]['fullname'][_0x12581c(0x444)](':')[0x0] + '</h5>', _0x2bc829 += _0x12581c(0x244), _0x2bc829 += _0x12581c(0x1bf), _0x2bc829 += _0x12581c(0x426), _0x2bc829 += '<i\x20class=\x22icon-search\x22\x20id=\x22data-mobile\x22></i>', _0x2bc829 += '</div>', _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += '<div\x20class=\x22col-3\x20\x22\x20id=\x22change-col4-size\x22>', _0x2bc829 += '<div\x20class=\x22dropdown\x20select-btn-dropdown\x20full-select-dropdown\x20mob-data\x22\x20id=\x22exort-to' + _0x556c10 + '\x22>', _0x2bc829 += _0x12581c(0x233), _0x2bc829 += _0x12581c(0x2fc), _0x2bc829 += _0x12581c(0x3d0), _0x2bc829 += _0x12581c(0x302), _0x2bc829 += _0x12581c(0x265), _0x2bc829 += '<a\x20class=\x22select-link\x20dropdown-item\x22\x20onclick=\x22onExport(\x22sql\x22)\x22>SQL</a>', _0x2bc829 += _0x12581c(0x473), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += '</div>', _0x2bc829 += '</div>', _0x2bc829 += _0x12581c(0x3e0) + _0x556c10 + _0x12581c(0x3c0), _0x2bc829 += '</div>', _0x2bc829 += _0x12581c(0x3aa), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += _0x12581c(0x4d9), _0x2bc829 += _0x12581c(0x2ef), $(_0x12581c(0x249) + _0x556c10)[_0x12581c(0x3d1)](), $(_0x12581c(0x3ce) + _0x556c10)['hide'](), _0x198c87++, $('#s_hw')[_0x12581c(0x322)](_0x2bc829), getEntityData(_0x819b77['data'][_0x12581c(0x453)]['split'](':')[0x0][_0x12581c(0x320)]('.', '_')), criticalStatusCount[_0x556c10] == 0x0 ? (_0xcdcd49['isSuccess'] = !![], $(_0x12581c(0x4a9) + _0x556c10)[_0x12581c(0x1e8)]('onclick', '\x20'), $(_0x12581c(0x4a9) + _0x556c10)[_0x12581c(0x203)](_0x12581c(0x443) + criticalStatusCount[_0x556c10] + ')')) : (_0xcdcd49[_0x12581c(0x324)] = ![], $(_0x12581c(0x4a9) + _0x556c10)[_0x12581c(0x1e8)]('onclick', 'statusFunction(this)'), $(_0x12581c(0x4a9) + _0x556c10)[_0x12581c(0x203)]('<span\x20class=\x22bold-text\x20red\x22>Critical(' + criticalStatusCount[_0x556c10] + _0x12581c(0x38b))), okStatusCount[_0x556c10] == 0x0 ? ($('#pills-ok-tab' + _0x556c10)[_0x12581c(0x1e8)](_0x12581c(0x2c0), '\x20'), $(_0x12581c(0x480) + _0x556c10)[_0x12581c(0x203)](_0x12581c(0x323) + okStatusCount[_0x556c10] + ')')) : ($(_0x12581c(0x480) + _0x556c10)[_0x12581c(0x1e8)](_0x12581c(0x2c0), 'statusFunction(this)'), $(_0x12581c(0x480) + _0x556c10)['html']('<span\x20class=\x22bold-text\x20green\x22>Ok(' + okStatusCount[_0x556c10] + _0x12581c(0x38b))), warningStatusCount == 0x0 ? ($(_0x12581c(0x20c))[_0x12581c(0x1e8)](_0x12581c(0x2c0), '\x20'), $('#pills-warning-tab')[_0x12581c(0x203)](_0x12581c(0x24b) + warningStatusCount + ')')) : ($(_0x12581c(0x20c) + _0x556c10)[_0x12581c(0x1e8)](_0x12581c(0x2c0), 'statusFunction(this)'), $(_0x12581c(0x20c))[_0x12581c(0x203)](_0x12581c(0x2f0) + warningStatusCount + ')</span>')), unknownStatusCount[_0x556c10] == 0x0 ? ($('#pills-unknown-tab' + _0x556c10)[_0x12581c(0x1e8)](_0x12581c(0x2c0), '\x20'), $(_0x12581c(0x3c8) + _0x556c10)['html'](_0x12581c(0x221) + unknownStatusCount[_0x556c10] + ')')) : ($(_0x12581c(0x3c8) + _0x556c10)['attr'](_0x12581c(0x2c0), _0x12581c(0x1fd)), $(_0x12581c(0x3c8) + _0x556c10)[_0x12581c(0x203)]('<span\x20class=\x22bold-text\x20unknown\x22\x20style=\x22color:white\x22>Unknown(' + unknownStatusCount[_0x556c10] + ')</span>')));
            if (_0x819b77[_0x12581c(0x448)][_0x12581c(0x2ff)] == _0x819b77['data'][_0x12581c(0x453)][_0x12581c(0x444)](':')[0x0]) {
                _0x306340 = _0x819b77[_0x12581c(0x448)]['fullname'][_0x12581c(0x444)](':')[0x0] + _0x12581c(0x1d1) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x305)] + '\x20)', document[_0x12581c(0x431)](_0x12581c(0x1b7) + _0x556c10)[_0x12581c(0x1ca)] = _0x306340;
                if (document[_0x12581c(0x431)](_0x12581c(0x1b7) + _0x556c10 + _0x12581c(0x1c2))) document[_0x12581c(0x431)](_0x12581c(0x1b7) + _0x556c10 + _0x12581c(0x1c2))[_0x12581c(0x1ca)] = _0x12581c(0x37c);
            }
            var _0x1d60e0 = _0x819b77[_0x12581c(0x448)]['id'],
                _0x4a4a47 = _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x444)](':')[0x0]['replaceAll']('.', '_'),
                _0xc9c700 = _0x819b77['data'][_0x12581c(0x453)][_0x12581c(0x444)](':')[0x1],
                _0xaf6655 = _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_') + _0x12581c(0x1fc),
                _0x5baacd = _0x12581c(0x4e1) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_') + _0x12581c(0x20e) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_') + _0x12581c(0x442) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_') + '\x22\x20src=\x22' + _0x819b77[_0x12581c(0x448)][_0x12581c(0x231)] + _0x12581c(0x4d1) + _0x1d60e0 + _0x12581c(0x4db) + _0x4a4a47 + _0x12581c(0x4ea) + _0xaf6655 + '\x27,event)\x22\x20style=\x22width:205%;height:55%;margin-left:10%;\x20border:1px\x20solid\x20#ffffff;background-color:\x20#ffffff\x22/><span\x20class=\x22tooltiptexts\x22\x20id=\x22' + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_') + _0x12581c(0x467) + _0x819b77['data'][_0x12581c(0x231)][_0x12581c(0x444)]('/')[0x3][_0x12581c(0x444)]('.')[0x0] + _0x12581c(0x359);
            if (_0xc9c700 != 'Processes' && _0xc9c700 != _0x12581c(0x2ec) && _0xc9c700) {
                if (_0xc9c700[_0x12581c(0x1f9)](_0x12581c(0x41f))) {
                    var _0x2c06b8 = _0x819b77['data'][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_'),
                        _0x446542 = {};
                    try {
                        var _0x446542 = JSON['parse'](_0x819b77['data'][_0x12581c(0x4e3)]);
                    } catch (_0x4d7684) {
                        console['log'](_0x12581c(0x1ba));
                    }
                    if (_0x446542 != null && Object[_0x12581c(0x385)](_0x446542)[_0x12581c(0x1bd)] && jQuery[_0x12581c(0x24c)](_0x446542) != !![]) {
                        var _0x4e404f = _0x12581c(0x4b6),
                            _0x3c7738 = '',
                            _0x5f3ce2 = '',
                            _0x41b1c8 = '';
                        for (const [_0x3927dc, _0x1c325d] of Object['entries'](JSON[_0x12581c(0x4cd)](_0x819b77[_0x12581c(0x448)]['niclist']))) {
                            var _0x3f2e1a = _0x1c325d[_0x12581c(0x34d)] == 0x2 ? _0x12581c(0x425) : 'red';
                            if (_0x1c325d['ip'] != undefined) {
                                if (_0x1c325d[_0x12581c(0x34d)] == 0x0) _0x2c06b8 = _0x2c06b8 + '\x20' + _0x3927dc['replaceAll']('.', '_') + ':' + _0xc9c700, _0x5f3ce2 += '<tr\x20style=\x22color:red\x22><td\x20id=\x22' + _0x3927dc['replaceAll']('.', '_') + ':' + _0xc9c700 + _0x12581c(0x1cb) + _0x3927dc + '(' + _0x1c325d['alias'] + _0x12581c(0x34b) + _0x1c325d['ip'] + '</td></tr>';
                                else {
                                    if (_0x1c325d[_0x12581c(0x34d)] == 0x1) _0x2c06b8 = _0x2c06b8 + '\x20' + _0x3927dc[_0x12581c(0x320)]('.', '_') + ':' + _0xc9c700, _0x3c7738 += _0x12581c(0x253) + _0x3927dc[_0x12581c(0x320)]('.', '_') + ':' + _0xc9c700 + '\x22\x20>' + _0x3927dc + '(' + _0x1c325d['alias'] + _0x12581c(0x34b) + _0x1c325d['ip'] + _0x12581c(0x413);
                                    else {
                                        if (_0x1c325d['status'] == 0x2) _0x2c06b8 = _0x2c06b8 + '\x20' + _0x3927dc[_0x12581c(0x320)]('.', '_') + ':' + _0xc9c700, _0x3c7738 += _0x12581c(0x31f) + _0x3927dc[_0x12581c(0x320)]('.', '_') + ':' + _0xc9c700 + _0x12581c(0x1cb) + _0x3927dc + '(' + _0x1c325d['alias'] + ')-</td>\x20<td>' + _0x1c325d['ip'] + _0x12581c(0x413);
                                        else _0x1c325d[_0x12581c(0x34d)] == 0x3 && (_0x2c06b8 = _0x2c06b8 + '\x20' + _0x3927dc[_0x12581c(0x320)]('.', '_') + ':' + _0xc9c700, _0x41b1c8 += _0x12581c(0x437) + _0x3927dc[_0x12581c(0x320)]('.', '_') + ':' + _0xc9c700 + '\x22\x20>' + _0x3927dc + '(' + _0x1c325d[_0x12581c(0x47a)] + _0x12581c(0x34b) + _0x1c325d['ip'] + _0x12581c(0x413));
                                    }
                                }
                            } else {
                                var _0x1469e6 = _0x3927dc[_0x12581c(0x320)]('.', '_');
                                if (_0x1469e6[_0x12581c(0x1f9)]('-')) _0x1469e6 = _0x1469e6[_0x12581c(0x320)]('-', '_');
                                if (_0x1c325d[_0x12581c(0x34d)] == 0x0) _0x2c06b8 = _0x2c06b8 + '\x20' + _0x1c325d[_0x12581c(0x3d5)][_0x12581c(0x320)]('.', '_') + ':' + _0xc9c700, _0x5f3ce2 += _0x12581c(0x224) + _0x1469e6 + ':' + _0xc9c700 + _0x12581c(0x1cb) + _0x3927dc + '(' + _0x1c325d[_0x12581c(0x47a)] + _0x12581c(0x34b) + _0x1c325d['mac'] + '</td></tr>';
                                else {
                                    if (_0x1c325d[_0x12581c(0x34d)] == 0x1) _0x2c06b8 = _0x2c06b8 + '\x20' + _0x1c325d[_0x12581c(0x3d5)][_0x12581c(0x320)]('.', '_') + ':' + _0xc9c700, _0x3c7738 += _0x12581c(0x253) + _0x1469e6 + ':' + _0xc9c700 + _0x12581c(0x1cb) + _0x3927dc + '(' + _0x1c325d['alias'] + _0x12581c(0x34b) + _0x1c325d[_0x12581c(0x3d5)] + _0x12581c(0x413);
                                    else {
                                        if (_0x1c325d[_0x12581c(0x34d)] == 0x2) _0x2c06b8 = _0x2c06b8 + '\x20' + _0x1c325d[_0x12581c(0x3d5)][_0x12581c(0x320)]('.', '_') + ':' + _0xc9c700, _0x3c7738 += _0x12581c(0x31f) + _0x1469e6 + ':' + _0xc9c700 + _0x12581c(0x1cb) + _0x3927dc + '(' + _0x1c325d['alias'] + _0x12581c(0x34b) + _0x1c325d['mac'] + _0x12581c(0x413);
                                        else _0x1c325d['status'] == 0x3 && (_0x2c06b8 = _0x2c06b8 + '\x20' + _0x1c325d['mac'][_0x12581c(0x320)]('.', '_') + ':' + _0xc9c700, _0x41b1c8 += _0x12581c(0x437) + _0x1469e6 + ':' + _0xc9c700 + '\x22\x20>' + _0x3927dc + '(' + _0x1c325d['alias'] + _0x12581c(0x34b) + _0x1c325d['mac'] + '</td></tr>');
                                    }
                                }
                            }
                        }
                        _0x4e404f += _0x5f3ce2 + _0x3c7738 + _0x41b1c8, _0x4e404f += _0x12581c(0x435), _0x5baacd = _0x12581c(0x4e1) + _0x2c06b8 + _0x12581c(0x20e) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_') + _0x12581c(0x442) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_') + _0x12581c(0x3dd) + _0x819b77[_0x12581c(0x448)]['image'] + _0x12581c(0x4d1) + _0x1d60e0 + _0x12581c(0x4db) + _0x4a4a47 + _0x12581c(0x2a5) + _0xaf6655 + '\x27,event)\x22\x20style=\x22width:205%;height:55%;margin-left:10%;\x20border:1px\x20solid\x20#ffffff;background-color:\x20#ffffff\x22/><span\x20class=\x22tooltiptexts\x20row\x22\x20id=\x22' + _0x819b77[_0x12581c(0x448)]['fullname'][_0x12581c(0x320)]('.', '_') + '_tooltip\x22\x20style=\x22right:\x2020px\x20!important;width:auto\x20!important;max-height:300%;overflow-y:scroll;min-width:\x20200%\x20!important;\x22><div\x20class=\x22col-10\x22\x20style=\x22padding-left:0\x22\x20>' + _0x819b77[_0x12581c(0x448)][_0x12581c(0x231)][_0x12581c(0x444)]('/')[0x3][_0x12581c(0x444)]('.')[0x0] + _0x12581c(0x4bd) + _0xaf6655 + _0x12581c(0x46c) + _0xaf6655 + _0x12581c(0x234) + _0x4e404f + _0x12581c(0x3dc);
                    } else _0x5baacd = _0x12581c(0x4e1) + _0x2c06b8 + _0x12581c(0x20e) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)]['replaceAll']('.', '_') + _0x12581c(0x442) + _0x819b77['data'][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_') + _0x12581c(0x3dd) + _0x819b77[_0x12581c(0x448)]['image'] + _0x12581c(0x4d1) + _0x1d60e0 + '\x27,\x27' + _0x4a4a47 + _0x12581c(0x2a5) + _0xaf6655 + _0x12581c(0x20b) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_') + _0x12581c(0x3a9) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x231)][_0x12581c(0x444)]('/')[0x3][_0x12581c(0x444)]('.')[0x0] + _0x12581c(0x344);
                }
                if (_0xc9c700[_0x12581c(0x1f9)]('SW_Disk')) {
                    var _0x8c9e00 = JSON[_0x12581c(0x4cd)](_0x819b77[_0x12581c(0x448)][_0x12581c(0x456)]);
                    if (jQuery[_0x12581c(0x24c)](_0x8c9e00) != !![] && _0x8c9e00 != null) {
                        var _0x2c06b8 = _0x819b77['data'][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_'),
                            _0x4e404f = _0x12581c(0x4b6),
                            _0x3c7738 = '',
                            _0x22f980 = '',
                            _0x5f3ce2 = '',
                            _0xaf6655 = _0x819b77['data'][_0x12581c(0x453)]['replaceAll']('.', '_') + '_tooltip';
                        for (const [_0x4c1092, _0x47b9dc] of Object['entries'](JSON[_0x12581c(0x4cd)](_0x819b77[_0x12581c(0x448)][_0x12581c(0x456)]))) {
                            _0x2c06b8 = _0x2c06b8 + '\x20' + _0x4a4a47 + ':' + _0x4c1092 + ':' + _0xc9c700;
                            if (_0x47b9dc[_0x12581c(0x34d)] == 0x2) _0x3c7738 += _0x12581c(0x31f) + _0x4a4a47 + ':' + _0x4c1092 + ':' + _0xc9c700 + '\x22>' + _0x4c1092 + _0x12581c(0x280) + _0x47b9dc[_0x12581c(0x47d)] + '</td></tr>';
                            else _0x47b9dc[_0x12581c(0x34d)] == 0x1 ? _0x22f980 += _0x12581c(0x253) + _0x4a4a47 + ':' + _0x4c1092 + ':' + _0xc9c700 + '\x22>' + _0x4c1092 + '-</td>\x20<td>' + _0x47b9dc[_0x12581c(0x47d)] + _0x12581c(0x413) : _0x5f3ce2 += '<tr\x20style=\x22color:red\x22><td\x20id=\x22' + _0x4a4a47 + ':' + _0x4c1092 + ':' + _0xc9c700 + '\x22>' + _0x4c1092 + _0x12581c(0x280) + _0x47b9dc[_0x12581c(0x47d)] + _0x12581c(0x413);
                        }
                        _0x4e404f += _0x5f3ce2 + _0x22f980 + _0x3c7738, _0x4e404f += _0x12581c(0x435), _0x5baacd = '<div\x20class=\x22col-1\x20tooltips\x22\x20style=\x22max-width:\x202.6rem;\x22><img\x20class=\x22imgsize\x20' + _0x2c06b8 + '\x22\x20id=\x22' + _0x819b77[_0x12581c(0x448)]['fullname'][_0x12581c(0x320)]('.', '_') + _0x12581c(0x442) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x320)]('.', '_') + _0x12581c(0x3dd) + _0x819b77[_0x12581c(0x448)]['image'] + '\x22\x20alt=\x22\x22\x20onclick=\x22openOnImageClick(this,\x20\x27' + _0x1d60e0 + _0x12581c(0x4db) + _0x4a4a47 + _0x12581c(0x2a5) + _0xaf6655 + '\x27,event)\x22\x20style=\x22width:205%;height:55%;margin-left:10%;\x20border:1px\x20solid\x20#ffffff;background-color:\x20#ffffff\x22/><span\x20class=\x22tooltiptexts\x20row\x22\x20id=\x22' + _0x819b77[_0x12581c(0x448)]['fullname'][_0x12581c(0x320)]('.', '_') + '_tooltip\x22\x20style=\x22right:\x2020px\x20!important;width:auto\x20!important;max-height:300%;overflow-y:scroll;min-width:\x20200%\x20!important;\x22><div\x20class=\x22col-8\x22\x20style=\x22padding-left:0\x22\x20>' + _0x819b77['data'][_0x12581c(0x231)]['split']('/')[0x3][_0x12581c(0x444)]('.')[0x0] + '</div><i\x20class=\x22\x20col-4\x20mdi\x20mdi-pin-outline\x22\x20id=\x22' + _0xaf6655 + _0x12581c(0x46c) + _0xaf6655 + _0x12581c(0x234) + _0x4e404f + _0x12581c(0x3dc);
                    } else _0x5baacd = _0x12581c(0x1e0) + _0x819b77['data']['fullname'][_0x12581c(0x320)]('.', '_') + _0x12581c(0x442) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)]['replaceAll']('.', '_') + _0x12581c(0x3dd) + _0x819b77[_0x12581c(0x448)]['image'] + _0x12581c(0x4d1) + _0x1d60e0 + _0x12581c(0x4db) + _0x4a4a47 + _0x12581c(0x2a5) + _0xaf6655 + _0x12581c(0x20b) + _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)]['replaceAll']('.', '_') + '_tooltip\x22\x20style=\x22right:\x2020px\x20!important;width:auto\x20!important;max-height:300%;overflow-y:scroll;min-width:\x20200%\x20!important;\x22>' + _0x819b77['data'][_0x12581c(0x231)][_0x12581c(0x444)]('/')[0x3][_0x12581c(0x444)]('.')[0x0] + '<br>No\x20disk\x20summary</span></div>';
                }
                _0xc9c700['includes'](_0x12581c(0x281)) ? $(_0x12581c(0x362) + _0x556c10)[_0x12581c(0x322)](_0x5baacd) : $('#' + _0x556c10)[_0x12581c(0x322)](_0x5baacd);
            }
            if (_0x819b77['data']['fullname'] == _0x819b77[_0x12581c(0x448)][_0x12581c(0x453)][_0x12581c(0x444)](':')[0x0] + _0x12581c(0x466)) {
                var _0x4748a4 = _0x819b77[_0x12581c(0x448)]['id'],
                    _0xa5bc6f = _0x819b77['data'][_0x12581c(0x453)][_0x12581c(0x444)](':')[0x0][_0x12581c(0x320)]('.', '_');
                document[_0x12581c(0x431)](_0xa5bc6f + _0x12581c(0x466))[_0x12581c(0x309)](_0x12581c(0x33b), function () {
                    openNav(_0x4748a4, siteName, _0x556c10);
                });
            }
        });
        var _0xb85dde = _0x488d64(0x36d);
        $(_0x488d64(0x333))['html'](_0x488d64(0x41c) + _0x198c87 + _0x488d64(0x22f) + _0xb85dde + _0x488d64(0x299) + divid + _0x488d64(0x495) + _0xb85dde + '\x27)\x22\x20style=\x22font-size:\x2016px;\x22></i></div>'), $(_0x488d64(0x333))[_0x488d64(0x322)](_0x488d64(0x293) + _0xb85dde + _0x488d64(0x3bf)), switchs()[_0x488d64(0x2bc)](function () {
            var _0x134e10 = _0x488d64;
            nicconnect['forEach'](function (_0x441c0b) {
                var _0x3c00e3 = _0x5292,
                    _0x22e563 = document[_0x3c00e3(0x431)](_0x441c0b[0x1]['replaceAll']('.', '_')),
                    _0x292f9a = document[_0x3c00e3(0x431)](_0x441c0b[0x10][_0x3c00e3(0x320)]('.', '_'));
                if (_0x22e563 != null && _0x292f9a != null && _0x292f9a != undefined) {
                    var _0x2070b9;
                    if (_0x441c0b[0xb]['toString']() == '0') {
                        var _0x186cf9 = new LeaderLine(_0x22e563, _0x292f9a, {
                            'color': _0x3c00e3(0x27a),
                            'positionByWindowResize': ![],
                            'size': 0x2,
                            'endPlug': 'square',
                            'startPlug': _0x3c00e3(0x439),
                            'startPlugColor': _0x3c00e3(0x2fd),
                            'outlineColor': 'red',
                            'endPlugColor': _0x3c00e3(0x2fd),
                            'outline': !![],
                            'startPlugOutline': !![],
                            'endPlugOutline': !![],
                            'startPlugOutlineColor': _0x3c00e3(0x3af),
                            'endPlugOutlineColor': '#000000'
                        });
                        document[_0x3c00e3(0x431)]('s_hw')[_0x3c00e3(0x309)](_0x3c00e3(0x4c6), AnimEvent[_0x3c00e3(0x489)](function () {
                            var _0x18426b = _0x3c00e3;
                            _0x186cf9[_0x18426b(0x49e)]();
                        }), ![]), document[_0x3c00e3(0x431)](_0x3c00e3(0x3a0))[_0x3c00e3(0x309)]('scroll', AnimEvent[_0x3c00e3(0x489)](function () {
                            var _0x16ee3f = _0x3c00e3;
                            _0x186cf9[_0x16ee3f(0x49e)]();
                        }), ![]), getarrowdata('s' + _0x441c0b[0x1][_0x3c00e3(0x320)]('.', '_'), _0x186cf9);
                    } else {
                        var _0x1940a9 = '';
                        switch (_0x441c0b[0xb]) {
                            case 0x1:
                                _0x2070b9 = '#e59105', _0x1940a9 = _0x3c00e3(0x25e);
                                break;
                            case 0x2:
                                _0x2070b9 = '#16d39a', _0x1940a9 = _0x3c00e3(0x425);
                                break;
                            default:
                                _0x1940a9 = _0x3c00e3(0x2e5), _0x2070b9 = _0x3c00e3(0x27a);
                        }
                        var _0x186cf9 = new LeaderLine(_0x22e563, _0x292f9a, {
                            'color': _0x2070b9,
                            'hide': !![],
                            'positionByWindowResize': ![],
                            'size': 0x2,
                            'endPlug': 'square',
                            'startPlug': _0x3c00e3(0x439),
                            'startPlugColor': _0x1940a9,
                            'outlineColor': _0x1940a9,
                            'endPlugColor': _0x1940a9,
                            'outline': !![],
                            'startPlugOutline': !![],
                            'endPlugOutline': !![],
                            'startPlugOutlineColor': '#000000',
                            'endPlugOutlineColor': _0x3c00e3(0x3af)
                        });
                        _0x22e563['addEventListener']('mouseover', function () {
                            var _0x30af1b = _0x3c00e3;
                            _0x186cf9['show'](['fade'[{
                                'duration': 0x12c,
                                'timing': _0x30af1b(0x282)
                            }]]);
                        }, ![]), _0x22e563[_0x3c00e3(0x309)](_0x3c00e3(0x38d), function () {
                            var _0x2ea026 = _0x3c00e3;
                            _0x186cf9[_0x2ea026(0x3d1)]([_0x2ea026(0x1ff)[{
                                'duration': 0x12c,
                                'timing': 'linear'
                            }]]);
                        }, ![]), _0x292f9a['addEventListener'](_0x3c00e3(0x308), function () {
                            var _0x3edb7c = _0x3c00e3;
                            _0x186cf9[_0x3edb7c(0x2e0)]([_0x3edb7c(0x1ff)[{
                                'duration': 0x12c,
                                'timing': _0x3edb7c(0x282)
                            }]]);
                        }, ![]), _0x292f9a[_0x3c00e3(0x309)]('mouseout', function () {
                            var _0x72bcf = _0x3c00e3;
                            _0x186cf9[_0x72bcf(0x3d1)]([_0x72bcf(0x1ff)[{
                                'duration': 0x12c,
                                'timing': _0x72bcf(0x282)
                            }]]);
                        }, ![]), document[_0x3c00e3(0x431)](_0x3c00e3(0x1d2))[_0x3c00e3(0x309)](_0x3c00e3(0x4c6), AnimEvent[_0x3c00e3(0x489)](function () {
                            var _0x1099a6 = _0x3c00e3;
                            _0x186cf9[_0x1099a6(0x49e)]();
                        }), ![]), document[_0x3c00e3(0x431)](_0x3c00e3(0x3a0))['addEventListener'](_0x3c00e3(0x4c6), AnimEvent[_0x3c00e3(0x489)](function () {
                            var _0x5b5802 = _0x3c00e3;
                            _0x186cf9[_0x5b5802(0x49e)]();
                        }), ![]), getarrowdata('s' + _0x441c0b[0x1][_0x3c00e3(0x320)]('.', '_'), _0x186cf9);
                    }
                }
            });
            for (let _0x5b1556 = 0x0; _0x5b1556 < layers[_0x134e10(0x1bd)]; _0x5b1556++) {
                arrowdata[_0x5b1556][_0x134e10(0x1cd)](function (_0x5a09fe) {
                    var _0x318f7d = _0x134e10,
                        _0x2e879c = _0x5a09fe[0x1][_0x318f7d(0x444)](':')[0x1],
                        _0x2f6b94 = layers[_0x5b1556][_0x318f7d(0x444)]('_')[0x0],
                        _0x386775 = '';
                    if (_0x5a09fe[0x1]['includes'](':p')) _0x386775 = 'p_' + _0x5a09fe[0x7][_0x318f7d(0x320)]('.', '_');
                    else _0x5a09fe[0x1]['includes'](':s') && (_0x386775 = 's_' + _0x5a09fe[0x7][_0x318f7d(0x320)]('.', '_'));
                    if (_0x5a09fe[0xa] != _0x318f7d(0x4c5) && jQuery[_0x318f7d(0x24c)](_0x5a09fe[0xa]) != !![] && _0x5a09fe[0xa] != _0x318f7d(0x432)) {
                        var _0x50a34b = document['getElementById'](_0x386775)[_0x318f7d(0x431)](_0x5a09fe[0x1][_0x318f7d(0x444)](':')[0x1]),
                            _0x588bb3 = '',
                            _0x5254b7 = '';
                        if (_0x5a09fe[0xa][_0x318f7d(0x1f9)](':p')) _0x5254b7 = 'p_' + _0x5a09fe[0xa][_0x318f7d(0x444)](':')[0x0]['replaceAll']('.', '_');
                        else _0x5a09fe[0xa][_0x318f7d(0x1f9)](':s') && (_0x5254b7 = 's_' + _0x5a09fe[0xa][_0x318f7d(0x444)](':')[0x0][_0x318f7d(0x320)]('.', '_'));
                        if (_0x5a09fe[0xa][_0x318f7d(0x1f9)](':') && document[_0x318f7d(0x431)](_0x5a09fe[0xa][_0x318f7d(0x444)](':')[0x0][_0x318f7d(0x320)]('.', '_')) != null) _0x588bb3 = document['getElementById'](_0x5254b7)[_0x318f7d(0x431)](_0x5a09fe[0xa]['split'](':')[0x1]);
                        else {
                            var _0x3b7851 = document[_0x318f7d(0x1e1)](_0x5a09fe[0xa]['split'](':')[0x0][_0x318f7d(0x320)]('.', '_') + _0x318f7d(0x32a)),
                                _0x5653c7 = document['getElementsByClassName'](_0x5a09fe[0xa][_0x318f7d(0x444)](':')[0x0][_0x318f7d(0x320)]('.', '_') + _0x318f7d(0x32a));
                            _0x588bb3 = _0x5653c7[0x0];
                        }
                        if (_0x5a09fe[0x5] == 'port' && _0x2e879c != undefined && _0x2e879c != null && _0x50a34b != null && _0x588bb3 != null && _0x588bb3 != undefined) {
                            var _0x4330f6;
                            if (_0x5a09fe[0xb][_0x318f7d(0x2da)]() == '2') {
                                console[_0x318f7d(0x2a7)](_0x5a09fe[0x1] + _0x318f7d(0x48d));
                                var _0x5878e9 = document[_0x318f7d(0x431)](_0x318f7d(0x36b)),
                                    _0x4667cb = new LeaderLine(_0x50a34b, _0x588bb3, {
                                        'color': _0x318f7d(0x354),
                                        'hide': !![],
                                        'positionByWindowResize': ![],
                                        'size': 0x2,
                                        'endPlug': 'square',
                                        'startPlug': _0x318f7d(0x439),
                                        'startPlugColor': 'green',
                                        'outlineColor': 'green',
                                        'endPlugColor': _0x318f7d(0x425),
                                        'outline': !![],
                                        'startPlugOutline': !![],
                                        'endPlugOutline': !![],
                                        'startPlugOutlineColor': _0x318f7d(0x3af),
                                        'endPlugOutlineColor': _0x318f7d(0x3af)
                                    });
                                _0x50a34b[_0x318f7d(0x309)](_0x318f7d(0x308), function () {
                                    var _0x31d500 = _0x318f7d;
                                    _0x4667cb['show']([_0x31d500(0x1ff)[{
                                        'duration': 0x12c,
                                        'timing': 'linear'
                                    }]]);
                                }, ![]), _0x50a34b[_0x318f7d(0x309)](_0x318f7d(0x38d), function () {
                                    var _0x1a8af5 = _0x318f7d;
                                    _0x4667cb[_0x1a8af5(0x3d1)](['fade'[{
                                        'duration': 0x12c,
                                        'timing': _0x1a8af5(0x282)
                                    }]]);
                                }, ![]), _0x588bb3[_0x318f7d(0x309)]('mouseover', function () {
                                    var _0x4e04ea = _0x318f7d;
                                    _0x4667cb['show']([_0x4e04ea(0x1ff)[{
                                        'duration': 0x12c,
                                        'timing': _0x4e04ea(0x282)
                                    }]]);
                                }, ![]), _0x588bb3['addEventListener'](_0x318f7d(0x38d), function () {
                                    var _0x1e2043 = _0x318f7d;
                                    _0x4667cb[_0x1e2043(0x3d1)]([_0x1e2043(0x1ff)[{
                                        'duration': 0x12c,
                                        'timing': _0x1e2043(0x282)
                                    }]]);
                                }, ![]), document[_0x318f7d(0x431)](_0x318f7d(0x36b))['addEventListener'](_0x318f7d(0x4c6), AnimEvent[_0x318f7d(0x489)](function () {
                                    var _0x2745a7 = _0x318f7d;
                                    _0x4667cb[_0x2745a7(0x49e)]();
                                }), ![]), document[_0x318f7d(0x431)](_0x318f7d(0x325))['addEventListener'](_0x318f7d(0x4c6), AnimEvent['add'](function () {
                                    var _0x171be1 = _0x318f7d;
                                    _0x4667cb[_0x171be1(0x49e)]();
                                }), ![]), document['getElementById'](_0x318f7d(0x310))[_0x318f7d(0x309)](_0x318f7d(0x4c6), AnimEvent['add'](function () {
                                    var _0x4abfd0 = _0x318f7d;
                                    _0x4667cb[_0x4abfd0(0x49e)]();
                                }), ![]), document['getElementById'](_0x318f7d(0x3f2))['addEventListener'](_0x318f7d(0x4c6), AnimEvent[_0x318f7d(0x489)](function () {
                                    var _0x1da786 = _0x318f7d;
                                    _0x4667cb[_0x1da786(0x49e)]();
                                }), ![]), document[_0x318f7d(0x431)]('s_hw')[_0x318f7d(0x309)](_0x318f7d(0x4c6), AnimEvent['add'](function () {
                                    var _0x2f9f77 = _0x318f7d;
                                    _0x4667cb[_0x2f9f77(0x49e)]();
                                }), ![]), document['getElementById'](_0x318f7d(0x3a0))[_0x318f7d(0x309)]('scroll', AnimEvent['add'](function () {
                                    var _0x3e5570 = _0x318f7d;
                                    _0x4667cb[_0x3e5570(0x49e)]();
                                }), ![]), getarrowdata('l' + _0x5a09fe[0x7][_0x318f7d(0x320)]('.', '_') + _0x2e879c, _0x4667cb);
                            } else {
                                var _0xd850b4 = '';
                                switch (_0x5a09fe[0xb]) {
                                    case 0x0:
                                        _0x4330f6 = '#ff3d57', _0xd850b4 = _0x318f7d(0x2fd);
                                        break;
                                    case 0x1:
                                        _0x4330f6 = _0x318f7d(0x27b), _0xd850b4 = _0x318f7d(0x25e);
                                        break;
                                    default:
                                        _0xd850b4 = 'grey', _0x4330f6 = _0x318f7d(0x283);
                                }
                                var _0x4667cb = new LeaderLine(_0x50a34b, _0x588bb3, {
                                    'color': _0x4330f6,
                                    'positionByWindowResize': ![],
                                    'size': 0x2,
                                    'endPlug': _0x318f7d(0x1be),
                                    'startPlug': 'disc',
                                    'startPlugColor': _0xd850b4,
                                    'outlineColor': _0xd850b4,
                                    'endPlugColor': _0xd850b4,
                                    'outline': !![],
                                    'startPlugOutline': !![],
                                    'endPlugOutline': !![],
                                    'startPlugOutlineColor': _0x318f7d(0x3af),
                                    'endPlugOutlineColor': _0x318f7d(0x3af)
                                });
                                document[_0x318f7d(0x431)](_0x318f7d(0x36b))[_0x318f7d(0x309)](_0x318f7d(0x4c6), AnimEvent[_0x318f7d(0x489)](function () {
                                    var _0x381a25 = _0x318f7d;
                                    _0x4667cb[_0x381a25(0x49e)]();
                                }), ![]), document[_0x318f7d(0x431)](_0x318f7d(0x325))['addEventListener']('scroll', AnimEvent[_0x318f7d(0x489)](function () {
                                    var _0x428b6c = _0x318f7d;
                                    _0x4667cb[_0x428b6c(0x49e)]();
                                }), ![]), document[_0x318f7d(0x431)](_0x318f7d(0x310))[_0x318f7d(0x309)](_0x318f7d(0x4c6), AnimEvent[_0x318f7d(0x489)](function () {
                                    _0x4667cb['position']();
                                }), ![]), document[_0x318f7d(0x431)](_0x318f7d(0x3f2))[_0x318f7d(0x309)](_0x318f7d(0x4c6), AnimEvent[_0x318f7d(0x489)](function () {
                                    var _0x5cb4cc = _0x318f7d;
                                    _0x4667cb[_0x5cb4cc(0x49e)]();
                                }), ![]), document[_0x318f7d(0x431)]('s_hw')[_0x318f7d(0x309)](_0x318f7d(0x4c6), AnimEvent['add'](function () {
                                    var _0x43df05 = _0x318f7d;
                                    _0x4667cb[_0x43df05(0x49e)]();
                                }), ![]), document[_0x318f7d(0x431)](_0x318f7d(0x3a0))['addEventListener'](_0x318f7d(0x4c6), AnimEvent[_0x318f7d(0x489)](function () {
                                    _0x4667cb['position']();
                                }), ![]), getarrowdata('l' + _0x5a09fe[0x7][_0x318f7d(0x320)]('.', '_') + _0x2e879c, _0x4667cb);
                            }
                        }
                    }
                });
            }
        });
    } else {
        $(_0x488d64(0x4e7))[_0x488d64(0x27e)]('display', 'none'), $(_0x488d64(0x334))[_0x488d64(0x27e)](_0x488d64(0x326), _0x488d64(0x432));
        if (_0x316518 == 0xc8) $(_0x488d64(0x3b8))[_0x488d64(0x2ff)](_0x488d64(0x4d7));
        else $(_0x488d64(0x3b8))[_0x488d64(0x2ff)](_0x488d64(0x35f));
    }
}

function displaysearchbar(_0x293b3c) {
    var _0x4cd00c = _0x81ccdf;
    $('#' + _0x293b3c)[_0x4cd00c(0x27e)](_0x4cd00c(0x326)) != _0x4cd00c(0x432) ? ($(_0x4cd00c(0x2d9) + _0x293b3c)[_0x4cd00c(0x2e0)](), $('#' + _0x293b3c)[_0x4cd00c(0x27e)]('display', _0x4cd00c(0x432))) : ($(_0x4cd00c(0x2d9) + _0x293b3c)[_0x4cd00c(0x3d1)](), $('#' + _0x293b3c)[_0x4cd00c(0x27e)](_0x4cd00c(0x326), _0x4cd00c(0x368)));
}

function closesearchbar(_0x2f8094) {
    var _0x15e81c = _0x81ccdf;
    $('#' + _0x2f8094)['css']('display', _0x15e81c(0x432)), $('.hide-val' + _0x2f8094)[_0x15e81c(0x2e0)]();
}

function dispalyNodes(_0x3215fc, _0x5a05e7, _0x262724) {
    var _0x12d4b0 = _0x81ccdf;
    if (Object[_0x12d4b0(0x385)](_0x3215fc)[_0x12d4b0(0x1bd)] > 0x0 && _0x3215fc[_0x12d4b0(0x462)] && _0x3215fc[_0x12d4b0(0x462)][_0x12d4b0(0x448)][_0x12d4b0(0x1bd)] > 0x0) {
        $(_0x12d4b0(0x3a2))[_0x12d4b0(0x27e)](_0x12d4b0(0x3c4), _0x12d4b0(0x1cf)), $(_0x12d4b0(0x21b))[_0x12d4b0(0x27e)](_0x12d4b0(0x326), 'block'), $(_0x12d4b0(0x334))[_0x12d4b0(0x27e)]('display', _0x12d4b0(0x432));
        var _0x56d1c4 = sitesData[0x0];
        responseFromServer = _0x3215fc;
        var _0xc0d2f6 = [],
            _0x2c023f = [],
            _0x19edb0 = '',
            _0x3c3349 = 0x0;
        sortedJson = {};
        var _0x4528f8 = responseFromServer[_0x12d4b0(0x462)];
        _0x4528f8['status'] == 0xc8 && ($(_0x12d4b0(0x316))[_0x12d4b0(0x203)]('Nodes\x20(' + _0x4528f8[_0x12d4b0(0x448)][_0x12d4b0(0x1bd)] + ')'), _0x4528f8['data'][_0x12d4b0(0x1cd)](function (_0x16870c) {
            var _0xa4baea = _0x12d4b0;
            if (_0x16870c[0xb] && typeof _0x16870c[0xb] == _0xa4baea(0x2b0)) var _0x3a35a0 = parseInt(_0x16870c[0xb]);
            else var _0x3a35a0 = _0x16870c[0xb];
            _0x3a35a0 === 0x0 && (criticalStatusCount[_0x262724] += 0x1);
            _0x3a35a0 === 0x2 && (okStatusCount[_0x262724] += 0x1);
            _0x3a35a0 === 0x1 && (warningStatusCount[_0x262724] += 0x1);
            _0x3a35a0 === 0x3 && (unknownStatusCount[_0x262724] += 0x1);
            var _0x5ea40e = getColorForNodeState(_0x3a35a0);
            _0x3c3349 = getSizeForNode(_0x16870c[0x4]);
            var _0x1d918b = _0x16870c[0x1];
            if (_0x16870c[0x4] != null && (_0x16870c[0x4] == 'Host' || _0x16870c[0x4][_0xa4baea(0x262)](_0xa4baea(0x387)))) _0x19edb0 = _0x1d918b, sortedJson[_0x1d918b] === undefined && (sortedJson[_0x1d918b] = {
                'host': '',
                'services': [],
                'hostms': []
            }), sortedJson[_0x1d918b]['host'] = _0x16870c;
            else {
                var _0x46ccf5 = _0x1d918b['split'](':');
                sortedJson[_0x46ccf5[0x0]] === undefined && (sortedJson[_0x46ccf5[0x0]] = {
                    'host': '',
                    'services': [],
                    'hostms': []
                }), (_0x16870c[0x4] == _0xa4baea(0x3c9) || _0x16870c[0x4] == _0xa4baea(0x22c)) && (_0x16870c[0x4] == _0xa4baea(0x22c) ? (_0x19edb0 = _0x46ccf5[0x2], sortedJson[_0x46ccf5[0x0]][_0x46ccf5[0x1]] === undefined && (sortedJson[_0x46ccf5[0x0]][_0x46ccf5[0x1]] = []), sortedJson[_0x46ccf5[0x0]][_0x46ccf5[0x1]][_0xa4baea(0x250)](_0x16870c)) : (_0x19edb0 = _0x46ccf5[0x1], sortedJson[_0x46ccf5[0x0]][_0xa4baea(0x2e9)][_0xa4baea(0x250)](_0x16870c))), _0x16870c[0x4] != null && (_0x16870c[0x4] == 'Service' || _0x16870c[0x4][_0xa4baea(0x262)]('Pod')) && (_0x19edb0 = _0x46ccf5[0x1], sortedJson[_0x46ccf5[0x0]]['services']['push'](_0x16870c)), _0x16870c[0x4] != _0xa4baea(0x384) && _0x16870c[0x4] != _0xa4baea(0x3c9) && _0x16870c[0x4] != 'Service' && _0x16870c[0x4] != _0xa4baea(0x22c) && (_0x19edb0 = _0x46ccf5[0x1] ? _0x46ccf5[0x1] : _0x46ccf5[0x0]);
            }
            var _0x53421b = _0xa4baea(0x217);
            _0x16870c[0x8] === null && (_0x53421b = _0xa4baea(0x217));
            var _0x5b081e = {
                'data': {
                    'id': _0x16870c[0x0],
                    'fullname': _0x1d918b,
                    'dashboardenabled': _0x53421b,
                    'dashboard_url': _0x16870c[0x8],
                    'text': _0x19edb0,
                    'image': image_path + _0x16870c[0x5],
                    'color': _0x5ea40e,
                    'size': _0x3c3349
                }
            };
            _0xc0d2f6[_0xa4baea(0x250)](_0x5b081e), titleToId[_0x1d918b] = _0x16870c[0x0];
        }));
        if (criticalStatusCount[_0x262724] == 0x0) _0x56d1c4[_0x12d4b0(0x324)] = !![], $(_0x12d4b0(0x4a9) + _0x262724)[_0x12d4b0(0x1e8)]('onclick', '\x20'), $(_0x12d4b0(0x4a9) + _0x262724)[_0x12d4b0(0x203)](_0x12d4b0(0x443) + criticalStatusCount[_0x262724] + ')');
        else {
            _0x56d1c4[_0x12d4b0(0x324)] = ![];
            var _0x4e9d5a = 'card' + _0x262724;
            elm = document[_0x12d4b0(0x431)](_0x4e9d5a), elm['parentNode']['insertBefore'](elm, document['getElementById'](_0x12d4b0(0x1d2))[_0x12d4b0(0x392)][0x0]), $(_0x12d4b0(0x4a9) + _0x262724)[_0x12d4b0(0x1e8)](_0x12d4b0(0x2c0), _0x12d4b0(0x1fd)), $('#pills-critical-tab' + _0x262724)[_0x12d4b0(0x203)]('<span\x20class=\x22bold-text\x20red\x22>Critical(' + criticalStatusCount[_0x262724] + ')</span>');
        }
        if (okStatusCount[_0x262724] == 0x0) $('#pills-ok-tab' + _0x262724)[_0x12d4b0(0x1e8)](_0x12d4b0(0x2c0), '\x20'), $(_0x12d4b0(0x480) + _0x262724)['html']('Ok\x20(' + okStatusCount[_0x262724] + ')');
        else $('#pills-ok-tab' + _0x262724)['html']('<span\x20class=\x22bold-text\x20green\x22>Ok(' + okStatusCount[_0x262724] + _0x12d4b0(0x38b));
        if (pendingStatusCount[_0x262724] == 0x0) $(_0x12d4b0(0x4b0) + _0x262724)[_0x12d4b0(0x1e8)](_0x12d4b0(0x2c0), '\x20'), $(_0x12d4b0(0x4b0) + _0x262724)[_0x12d4b0(0x203)]('Pending\x20(' + pendingStatusCount[_0x262724] + ')');
        else $(_0x12d4b0(0x4b0) + _0x262724)['html'](_0x12d4b0(0x1ec) + pendingStatusCount[_0x262724] + _0x12d4b0(0x38b));
        if (warningStatusCount[_0x262724] == 0x0) $(_0x12d4b0(0x20c) + _0x262724)[_0x12d4b0(0x1e8)](_0x12d4b0(0x2c0), '\x20'), $(_0x12d4b0(0x20c) + _0x262724)[_0x12d4b0(0x203)](_0x12d4b0(0x24b) + warningStatusCount[_0x262724] + ')');
        else $(_0x12d4b0(0x20c) + _0x262724)['html']('<span\x20class=\x22bold-text\x20warning\x22>Warning(' + warningStatusCount[_0x262724] + ')</span>');
        if (unknownStatusCount[_0x262724] == 0x0) $(_0x12d4b0(0x3c8) + _0x262724)['attr'](_0x12d4b0(0x2c0), '\x20'), $('#pills-unknown-tab' + _0x262724)[_0x12d4b0(0x203)](_0x12d4b0(0x221) + unknownStatusCount[_0x262724] + ')');
        else $(_0x12d4b0(0x3c8) + _0x262724)[_0x12d4b0(0x203)](_0x12d4b0(0x23c) + unknownStatusCount[_0x262724] + ')</span>');
        var _0x344d28 = responseFromServer[_0x12d4b0(0x3df)];
        _0x344d28[_0x12d4b0(0x34d)] == 0xc8 && _0x344d28[_0x12d4b0(0x448)]['forEach'](function (_0x5bff37) {
            var _0x38bb10 = _0x12d4b0,
                _0x3b868c = {
                    'data': {
                        'source': _0x5bff37[0x0],
                        'target': _0x5bff37[0x1],
                        'id': _0x38bb10(0x1b1) + _0x5bff37[0x0] + _0x5bff37[0x1],
                        'label': _0x5bff37[0x2]
                    }
                };
            _0x2c023f['push'](_0x3b868c);
        }), createGraph(_0xc0d2f6, _0x2c023f, _0x262724), sumsortedJson[_0x262724] = sortedJson, sortedJson = [];
    } else {
        $(_0x12d4b0(0x21b))[_0x12d4b0(0x27e)](_0x12d4b0(0x326), _0x12d4b0(0x432)), $(_0x12d4b0(0x334))['css']('display', 'block');
        if (_0x5a05e7 == 0xc8) $(_0x12d4b0(0x3b8))[_0x12d4b0(0x2ff)]('No\x20Data');
        else $(_0x12d4b0(0x3b8))[_0x12d4b0(0x2ff)](_0x12d4b0(0x35f));
    }
}

function displayTable(_0x3f8468) {
    var _0x3fc650 = _0x81ccdf,
        _0x2d3588 = $(_0x3f8468)[_0x3fc650(0x1e8)]('id')[_0x3fc650(0x444)]('view')[0x1];
    jsondata = sumsortedJson[_0x2d3588];
    if ($(_0x3f8468)[_0x3fc650(0x1e8)](_0x3fc650(0x25b)) == _0x3fc650(0x3fc)) {
        $('#table-data' + _0x2d3588)[_0x3fc650(0x398)]();
        var _0xed07c4 = '';
        _0xed07c4 += _0x3fc650(0x243), _0xed07c4 += _0x3fc650(0x2ac), _0xed07c4 += _0x3fc650(0x29d), _0xed07c4 += _0x3fc650(0x228), _0xed07c4 += _0x3fc650(0x2bb), _0xed07c4 += _0x3fc650(0x2c6), _0xed07c4 += _0x3fc650(0x1b4), _0xed07c4 += _0x3fc650(0x1ef), _0xed07c4 += _0x3fc650(0x2c4), _0xed07c4 += _0x3fc650(0x2ce);
        if (typeof jsondata !== _0x3fc650(0x3ca)) $['each'](jsondata, function (_0x3ba138, _0x33f54c) {
            var _0x1fe723 = _0x3fc650,
                _0x1c5060 = '',
                _0x2a8837 = _0x33f54c[_0x1fe723(0x2e9)]['length'] + _0x33f54c[_0x1fe723(0x3e5)][_0x1fe723(0x1bd)],
                _0x8cca71 = 0x0,
                _0x2c5090 = '';
            _0x2c5090 += _0x1fe723(0x2ac), _0x2c5090 += _0x1fe723(0x49f) + _0xa40360 + '\x27>' + _0x33f54c['host'][0x7] + '</td>', _0x2c5090 += _0x1fe723(0x3a1);
            const _0x46ef03 = _0x33f54c[_0x1fe723(0x4c1)][0x6],
                _0x227b60 = new Date(_0x46ef03);
            _0x2c5090 += _0x1fe723(0x1c8) + _0x227b60['toLocaleString']() + _0x1fe723(0x32d);
            var _0x73fee6 = getColorForNodeState(_0x33f54c[_0x1fe723(0x4c1)][0x2]),
                _0x45d544 = _0x33f54c['host'][0x2] == '' ? 'OK' : _0x33f54c[_0x1fe723(0x4c1)][0x2];
            _0x2c5090 += '<td\x20><span\x20class=\x27white-text\x20py-1\x20px-2\x20size12\x20radius-8\x20status\x27\x20style=\x27background:' + _0x73fee6 + '\x27>' + _0x45d544 + _0x1fe723(0x46b), _0x2c5090 += _0x1fe723(0x1c8) + _0x33f54c[_0x1fe723(0x4c1)][0x3] + _0x1fe723(0x32d), _0x2c5090 += _0x1fe723(0x1ef);
            var _0x25f5c7 = '';
            _0x33f54c[_0x1fe723(0x3e5)]['length'] > 0x0 && $['each'](_0x33f54c[_0x1fe723(0x3e5)], function (_0x17af45, _0x5d7b3f) {
                var _0x3ce1e9 = _0x1fe723;
                _0x25f5c7 += _0x3ce1e9(0x2ac), _0x25f5c7 += _0x3ce1e9(0x2fe), _0x25f5c7 += '<td\x20style=\x27border-left:\x201px\x20solid\x20#eee;\x27\x20class=\x27service\x27>' + _0x5d7b3f[0x1][_0x3ce1e9(0x444)](':')[0x1] + _0x3ce1e9(0x32d);
                const _0x449b1e = _0x5d7b3f[0x6],
                    _0x297c73 = new Date(_0x449b1e);
                _0x25f5c7 += _0x3ce1e9(0x1c8) + _0x297c73[_0x3ce1e9(0x35d)]() + _0x3ce1e9(0x32d);
                var _0xd7a777 = getColorForNodeState(_0x5d7b3f[0x2]),
                    _0x12f7f5 = _0x5d7b3f[0x2] == '' ? 'OK' : _0x5d7b3f[0x2];
                _0x25f5c7 += '<td\x20><span\x20class=\x27white-text\x20py-1\x20px-2\x20size12\x20radius-8\x20status\x27\x20style=\x27background:' + _0xd7a777 + '\x27>' + _0x12f7f5 + _0x3ce1e9(0x46b), _0x25f5c7 += _0x3ce1e9(0x1c8) + _0x5d7b3f[0x3] + _0x3ce1e9(0x32d), _0x25f5c7 += _0x3ce1e9(0x1ef);
            });
            var _0xa40360 = _0x2a8837 + _0x8cca71 + 0x1,
                _0x12965a = '';
            $[_0x1fe723(0x2f5)](_0x33f54c['hostms'], function (_0x120df7, _0x1a7273) {
                var _0x1b9992 = _0x1fe723;
                _0x12965a += _0x1b9992(0x2ac), _0x12965a += '<td\x20class\x20=\x20\x27ip\x27>\x20</td>', _0x12965a += _0x1b9992(0x3fd) + _0x1a7273[0x1]['split'](':')[0x1] + '</td>', _0x12965a += _0x1b9992(0x1c8) + getFormatedDate(_0x1a7273[0x6]) + _0x1b9992(0x32d);
                var _0x19d5c = getColorForNodeState(_0x1a7273[0x2]),
                    _0x46e1ac = _0x1a7273[0x2] == '' ? 'OK' : _0x1a7273[0x2];
                _0x12965a += _0x1b9992(0x347) + _0x19d5c + '\x27>' + _0x46e1ac + '</span></td>', _0x12965a += _0x1b9992(0x1c8) + _0x1a7273[0x3] + _0x1b9992(0x32d), _0x12965a += '</tr>';
            }), _0x1c5060 = _0x2c5090 + _0x25f5c7 + _0x12965a, _0xed07c4 += _0x1c5060;
        });
        else var _0xed07c4 = _0x3fc650(0x4b3);
        _0xed07c4 = _0xed07c4 + _0x3fc650(0x490), $(_0x3fc650(0x2cb))['append'](_0xed07c4), $(_0x3fc650(0x4ca))['text'](_0x2d3588[_0x3fc650(0x444)]('p_')[0x1][_0x3fc650(0x320)]('_', '.'));
        let _0x3f10e9 = {
            'valueNames': [_0x3fc650(0x30b), 'ip', _0x3fc650(0x34d)]
        };
        nodeList = new List(_0x3fc650(0x33d), _0x3f10e9), $(_0x3fc650(0x4a4))[_0x3fc650(0x2ae)](0x64);
    } else $(_0x3fc650(0x2cb))['children']()[_0x3fc650(0x465)](), $(_0x3fc650(0x421))[_0x3fc650(0x2ae)](0x64);
}

function nodeStatus(_0x6bd1fd) {
    var _0x4aeaa7 = _0x81ccdf,
        _0x1d04b7 = 0x0,
        _0x54a2a8 = 0x0,
        _0x330ea0 = 0x0,
        _0x1222ba = 0x0,
        _0x581bf1 = 0x0,
        _0x2f25ed = {
            'criticalCount': 0x0,
            'okStatusCount': 0x0,
            'pendingCount': 0x0,
            'warningCount': 0x0
        };
    return _0x6bd1fd[_0x4aeaa7(0x1cd)](function (_0x5bfcbd) {
        var _0x599644 = _0x4aeaa7;
        if (_0x5bfcbd[0x0]) var _0x3b9d7e = _0x5bfcbd[0x0]['toUpperCase']();
        else var _0x3b9d7e = _0x5bfcbd[0x0];
        (_0x3b9d7e === _0x599644(0x295) || _0x3b9d7e === _0x599644(0x3f1) || _0x3b9d7e === _0x599644(0x30c) || _0x3b9d7e === 'FALSE' || _0x3b9d7e === _0x599644(0x4d2)) && (_0x1d04b7 = _0x1d04b7 + _0x5bfcbd[0x1]), (_0x3b9d7e == '' || _0x3b9d7e === _0x599644(0x1ea) || _0x3b9d7e === _0x599644(0x1d9) || _0x3b9d7e === 'OK' || _0x3b9d7e === 'UP') && (_0x54a2a8 = _0x54a2a8 + _0x5bfcbd[0x1]), _0x3b9d7e === _0x599644(0x4a2) && (_0x330ea0 = _0x330ea0 + _0x5bfcbd[0x1]), _0x3b9d7e === _0x599644(0x22d) && (_0x1222ba = _0x1222ba + _0x5bfcbd[0x1]), (_0x3b9d7e === _0x599644(0x364) || _0x3b9d7e === _0x599644(0x21d) || _0x3b9d7e === 'TERMINATED') && (_0x581bf1 = _0x581bf1 + _0x5bfcbd[0x1]);
    }), _0x2f25ed = {
        'criticalCount': _0x1d04b7,
        'okCount': _0x54a2a8,
        'pendingCount': _0x330ea0,
        'warningCount': _0x1222ba,
        'unknownCount': _0x581bf1
    }, _0x2f25ed;
}

function findCount() {
    var _0xe9031a = _0x81ccdf,
        _0x592244 = 0x0,
        _0x3a0ac5 = 0x0,
        _0x239262 = 0x0,
        _0x3086d7 = 0x0,
        _0x1f50a1 = 0x0,
        _0x4498dc = 0x0,
        _0x48360c = 0x0,
        _0x1d3c34 = 0x0,
        _0x341f61 = 0x0,
        _0x18cb9b = 0x0;
    sitesData[_0xe9031a(0x1cd)](function (_0x337594) {
        var _0x5693b8 = _0xe9031a;
        if (_0x337594[_0x5693b8(0x252)] == undefined) return;
        var _0x429448 = _0x337594[_0x5693b8(0x252)];
        _0x592244 = _0x592244 + _0x429448['host'][_0x5693b8(0x32f)], _0x3a0ac5 = _0x3a0ac5 + _0x429448[_0x5693b8(0x4c1)][_0x5693b8(0x3eb)], _0x239262 = _0x239262 + _0x429448['host'][_0x5693b8(0x2bf)], _0x3086d7 = _0x3086d7 + _0x429448['host'][_0x5693b8(0x361)], _0x1f50a1 = _0x1f50a1 + _0x429448[_0x5693b8(0x4c1)][_0x5693b8(0x401)], _0x4498dc = _0x4498dc + _0x429448[_0x5693b8(0x30b)]['criticalCount'], _0x48360c = _0x48360c + _0x429448[_0x5693b8(0x30b)][_0x5693b8(0x3eb)], _0x1d3c34 = _0x1d3c34 + _0x429448['service'][_0x5693b8(0x2bf)], _0x341f61 = _0x341f61 + _0x429448['service'][_0x5693b8(0x361)], _0x18cb9b = _0x18cb9b + _0x429448[_0x5693b8(0x30b)][_0x5693b8(0x401)];
        return;
    });
    var _0x308618 = {};
    _0x308618[_0xe9031a(0x4c1)] = {
        'CRITICAL': _0x592244,
        'OK': _0x3a0ac5,
        'PENDING': _0x239262,
        'WARNING': _0x3086d7,
        'UNKNOWN': _0x1f50a1
    }, _0x308618['service'] = {
        'CRITICAL': _0x4498dc,
        'OK': _0x48360c,
        'PENDING': _0x1d3c34,
        'WARNING': _0x341f61,
        'UNKNOWN': _0x18cb9b
    }, fillHostServiceCount(_0x308618);
}

function createGraph(_0x3103c1, _0x41ac2f, _0x3848db) {
    var _0x477159 = _0x81ccdf;
    $(_0x477159(0x35b) + _0x3848db)[_0x477159(0x398)](), cyGraph[_0x477159(0x1d5) + _0x3848db] = cytoscape({
        'container': document[_0x477159(0x431)]('s_sw' + _0x3848db),
        'boxSelectionEnabled': ![],
        'autounselectify': ![],
        'style': cytoscape[_0x477159(0x42e)]()[_0x477159(0x380)](_0x477159(0x48b))[_0x477159(0x27e)]({
            'font-size': '8',
            'width': _0x477159(0x481),
            'height': 'data(size)',
            'background-fit': 'cover',
            'background-color': 'data(color)',
            'border-width': 0x1,
            'border-opacity': 0.5,
            'border-color': _0x477159(0x277),
            'background-image': _0x477159(0x255),
            'color': 'data(color)'
        })[_0x477159(0x380)](_0x477159(0x457))[_0x477159(0x27e)]({
            'curve-style': _0x477159(0x1b5),
            'width': 0.5,
            'target-arrow-shape': _0x477159(0x388),
            'line-color': '#aeaeae',
            'target-arrow-color': _0x477159(0x1f1)
        })[_0x477159(0x380)]('node.highlight')['css']({
            'border-width': '3',
            'font-size': '20'
        })[_0x477159(0x380)]('node.semitransp')['css']({
            'opacity': _0x477159(0x428),
            'border-width': '1',
            'font-size': '8'
        })[_0x477159(0x380)]('edge.highlight')['css']({
            'width': _0x477159(0x2f7),
            'label': 'data(label)',
            'text-rotation': _0x477159(0x4a7),
            'text-margin-y': _0x477159(0x38f),
            'font-size': '10'
        })['selector'](_0x477159(0x404))[_0x477159(0x27e)]({
            'opacity': '0.2',
            'width': '0.5'
        })[_0x477159(0x380)]('node.hasLabel')[_0x477159(0x27e)]({
            'label': 'data(text)'
        }),
        'elements': {
            'nodes': _0x3103c1,
            'edges': _0x41ac2f,
            'position': {
                'x': 0x0,
                'y': 0x0
            }
        },
        'layout': graphLayout
    }), (cyGraph[_0x477159(0x1d5) + _0x3848db][_0x477159(0x365)](), cyGraph[_0x477159(0x1d5) + _0x3848db][_0x477159(0x409)](0.3), cyGraph[_0x477159(0x1d5) + _0x3848db][_0x477159(0x383)]({
        'x': 0x5,
        'y': 0x5
    })), cyGraph[_0x477159(0x1d5) + _0x3848db]['on'](_0x477159(0x4c7), _0x477159(0x48b), function (_0x4e1356) {
        var _0x236083 = _0x477159,
            _0x5cbd38 = _0x4e1356[_0x236083(0x211)];
        cyGraph['s_sw' + _0x3848db][_0x236083(0x43b)]()['difference'](_0x5cbd38[_0x236083(0x3d4)]()['union'](_0x5cbd38[_0x236083(0x2f9)]()))[_0x236083(0x43e)](_0x5cbd38)[_0x236083(0x476)](_0x236083(0x423)), _0x5cbd38[_0x236083(0x476)]('highlight')[_0x236083(0x3d4)]()[_0x236083(0x476)](_0x236083(0x24a)), _0x5cbd38[_0x236083(0x476)]('highlight')['incomers']()[_0x236083(0x476)](_0x236083(0x24a));
        var _0x1b09ba = _0x5cbd38[0x0]['_private']['data'][_0x236083(0x236)];
        _0x5cbd38[_0x236083(0x48a)]()['style']({
            'line-color': _0x1b09ba,
            'target-arrow-color': _0x1b09ba,
            'color': _0x1b09ba
        });
    }), cyGraph['s_sw' + _0x3848db]['on'](_0x477159(0x33b), function (_0x53f52c) {
        var _0x5d6f79 = _0x477159;
        cyGraph[_0x5d6f79(0x1d5) + _0x3848db]['elements']()['removeClass'](_0x5d6f79(0x423)), cyGraph[_0x5d6f79(0x1d5) + _0x3848db][_0x5d6f79(0x43b)]()[_0x5d6f79(0x346)](_0x5d6f79(0x24a)), cyGraph[_0x5d6f79(0x1d5) + _0x3848db][_0x5d6f79(0x43b)]()[_0x5d6f79(0x3b0)]({
            'line-color': _0x5d6f79(0x1f1),
            'target-arrow-color': _0x5d6f79(0x1f1)
        });
    }), cyGraph['s_sw' + _0x3848db]['on'](_0x477159(0x409), function (_0x59c4b5) {
        var _0x10fc25 = _0x477159;
        if (cyGraph[_0x10fc25(0x1d5) + _0x3848db][_0x10fc25(0x409)]() > 0x1) cyGraph['s_sw' + _0x3848db][_0x10fc25(0x43b)]()[_0x10fc25(0x462)]()[_0x10fc25(0x476)]('hasLabel');
        else {
            if (cyGraph[_0x10fc25(0x1d5) + _0x3848db][_0x10fc25(0x409)]() < 0x1) cyGraph[_0x10fc25(0x1d5) + _0x3848db][_0x10fc25(0x43b)]()[_0x10fc25(0x462)]()[_0x10fc25(0x346)]('hasLabel');
        }
    }), cyGraph[_0x477159(0x1d5) + _0x3848db][_0x477159(0x34a)]({
        'openMenuEvents': 'cxttapstart\x20tap',
        'menuRadius': 0x4b,
        'indicatorSize': 0x0,
        'selector': _0x477159(0x285),
        'commands': [{
            'content': _0x477159(0x1f4),
            'select': function (_0x4a7ff1) {
                openNav(_0x4a7ff1['id'](), entitySelectedsite, _0x3848db);
            }
        }, {
            'content': _0x477159(0x213),
            'select': function (_0x1c9faf) {
                openNavs(_0x1c9faf['id'](), entitySelectedsite, _0x3848db);
            }
        }, {
            'content': '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-help\x22\x20style=\x22color:white\x22\x20></i></span>',
            'select': function (_0x1a2c2e) {
                openhelp(_0x1a2c2e['id'](), entitySelectedsite, _0x3848db);
            }
        }]
    }), cyGraph[_0x477159(0x1d5) + _0x3848db]['cxtmenu']({
        'selector': 'node[dashboardenabled=\x22false\x22]',
        'commands': [{
            'content': _0x477159(0x478),
            'select': function (_0x582c9a) {
                openNav(_0x582c9a['id'](), entitySelectedsite);
            }
        }, {
            'content': _0x477159(0x342),
            'select': function (_0x3e9b3f) {
                var _0x17a3f4 = _0x477159;
                openNagiosGraph(_0x3e9b3f['id'](), _0x3e9b3f['data'](_0x17a3f4(0x453)));
            }
        }, {
            'content': _0x477159(0x370),
            'select': function (_0x59deab) {
                openhelp(_0x59deab['id'](), entitySelectedsite);
            }
        }]
    });
}

function setAnim(_0x4d8a21, _0x305c59) {
    var _0xef15ee = _0x81ccdf;
    if (_0x305c59 != undefined) {
        var _0x4499bf = 0xfa,
            _0x6ec164 = 0x258;
        cyGraph[_0x4d8a21][_0xef15ee(0x462)](_0xef15ee(0x4a8) + _0x305c59 + ']')[_0xef15ee(0x3ff)]({
            'style': {
                'opacity': 0.8
            }
        }, {
            'duration': _0x6ec164
        })['delay'](_0x4499bf)['animate']({
            'style': {
                'opacity': 0.2
            }
        }, {
            'duration': _0x6ec164
        })[_0xef15ee(0x1e6)](_0x4499bf)[_0xef15ee(0x3ff)]({
            'style': {
                'opacity': 0.2
            }
        }, {
            'duration': _0x6ec164
        })['delay'](_0x4499bf)[_0xef15ee(0x3ff)]({
            'style': {
                'opacity': 0.2
            }
        }, {
            'duration': _0x6ec164
        })[_0xef15ee(0x1e6)](_0x4499bf)[_0xef15ee(0x3ff)]({
            'style': {
                'opacity': 0.2
            }
        }, {
            'duration': _0x6ec164
        })[_0xef15ee(0x1e6)](_0x4499bf)[_0xef15ee(0x3ff)]({
            'style': {
                'opacity': 0.2
            }
        }, {
            'duration': _0x6ec164
        })[_0xef15ee(0x1e6)](_0x4499bf)['animate']({
            'style': {
                'opacity': 0x1
            }
        }, {
            'duration': _0x6ec164
        });
    }
}

function nodeSpecificDetails(_0xa931be, _0x3ff741) {
    var _0x2b1562 = _0x81ccdf;
    $(_0x2b1562(0x360))[_0x2b1562(0x27e)](_0x2b1562(0x326)) != _0x2b1562(0x432) && (nodeTitle = $(_0x2b1562(0x289))[_0x2b1562(0x2ff)](), _0xa931be != undefined && nodeTitle == _0x3ff741 && (showLoader(_0x2b1562(0x254)), requestDataFromServer('../dashboard/getnodespecificdetails', {
        'nodeid': _0xa931be,
        'mode': '',
        'csrfmiddlewaretoken': csfr_token,
        'selectedSite': entitySelectedsite
    }, type = _0x2b1562(0x2ca))[_0x2b1562(0x338)](nodespecificdetialsresponse)));
}

function changeSiteStatus(_0x24b1b2, _0x12afa4) {
    var _0x4da1f3 = _0x81ccdf,
        _0x14f86b = sitesData[0x0];
    _0x14f86b && (_0x14f86b['criticalNodeCount'] = _0x12afa4, _0x12afa4 == 0x0 ? (_0x14f86b[_0x4da1f3(0x324)] = !![], $(_0x4da1f3(0x4a0) + _0x24b1b2 + _0x4da1f3(0x4c2))[_0x4da1f3(0x346)](_0x4da1f3(0x2dc))[_0x4da1f3(0x476)]('success')) : (_0x14f86b[_0x4da1f3(0x324)] = ![], $('#node-view\x20#site-list\x20#' + _0x24b1b2 + _0x4da1f3(0x4c2))[_0x4da1f3(0x346)](_0x4da1f3(0x1c4))[_0x4da1f3(0x476)](_0x4da1f3(0x2dc))));
}

function InitialPortUpdate(_0x914432) {
    _0x914432['forEach'](function (_0x4ad761) {
        var _0xec7ade = _0x5292,
            _0x24fac4 = 0x0;
        if (_0x4ad761[_0xec7ade(0x34d)] == 0x3) { }
        switch (_0x4ad761[_0xec7ade(0x34d)]) {
            case 0x0:
                color = _0xec7ade(0x27a), _0x24fac4++;
                break;
            case 0x1:
                color = _0xec7ade(0x27b), _0x24fac4++;
                break;
            case 0x2:
                color = _0xec7ade(0x354), _0x24fac4++;
                break;
            case 0x3:
                color = '#ffffff', _0x24fac4++;
                break;
            case 0x4:
                break;
            case 0x5:
                break;
            default:
                color = _0xec7ade(0x283), _0x24fac4++;
        }
        _0x24fac4 == 0x1 && $('#' + _0x4ad761['ip'][_0xec7ade(0x320)]('.', '_') + '\x20#' + _0x4ad761['port'][_0xec7ade(0x320)]('/', '_'))[_0xec7ade(0x27e)]('fill', color);
    });
}

function switchportcounts(_0x29191f) {
    var _0x443bee = _0x81ccdf;
    _0x29191f[_0x443bee(0x1cd)](function (_0x25109e) {
        var _0x56d45e = _0x443bee;
        swiportcounts[_0x25109e['ip'] + '-conn'] == undefined && (swiportcounts[_0x25109e['ip'] + _0x56d45e(0x420)] = 0x0, swiportcounts[_0x25109e['ip'] + _0x56d45e(0x4e4)] = 0x0, swiportcounts[_0x25109e['ip'] + '-unknown'] = 0x0);
        swiips[_0x56d45e(0x250)](_0x25109e['ip']);
        switch (_0x25109e[_0x56d45e(0x34d)]) {
            case 0x0:
                swiportcounts[_0x25109e['ip'] + _0x56d45e(0x420)]++;
                break;
            case 0x2:
                swiportcounts[_0x25109e['ip'] + _0x56d45e(0x4e4)]++;
                break;
            case 0x3:
                swiportcounts[_0x25109e['ip'] + _0x56d45e(0x26b)]++;
        }
    });
}

function countloop() {
    swiips['forEach'](function (_0x274b8c) {
        var _0x132247 = _0x5292;
        if (swiportcounts[_0x274b8c + _0x132247(0x4e4)] == 0x0) $(_0x132247(0x480) + _0x274b8c[_0x132247(0x320)]('.', '_'))['attr'](_0x132247(0x2c0), '\x20'), $(_0x132247(0x480) + _0x274b8c['replaceAll']('.', '_'))[_0x132247(0x203)]('Connected\x20(' + swiportcounts[_0x274b8c + _0x132247(0x4e4)] + ')');
        else $(_0x132247(0x480) + _0x274b8c[_0x132247(0x320)]('.', '_'))['html'](_0x132247(0x1f6) + swiportcounts[_0x274b8c + _0x132247(0x4e4)] + _0x132247(0x38b));
        if (swiportcounts[_0x274b8c + '-disconn'] == 0x0) $(_0x132247(0x4a9) + _0x274b8c[_0x132247(0x320)]('.', '_'))[_0x132247(0x1e8)]('onclick', '\x20'), $(_0x132247(0x4a9) + _0x274b8c[_0x132247(0x320)]('.', '_'))[_0x132247(0x203)](_0x132247(0x290) + swiportcounts[_0x274b8c + '-disconn'] + ')');
        else $(_0x132247(0x4a9) + _0x274b8c['replaceAll']('.', '_'))[_0x132247(0x203)](_0x132247(0x1d0) + swiportcounts[_0x274b8c + '-disconn'] + _0x132247(0x38b));
        if (swiportcounts[_0x274b8c + '-unknown'] == 0x0) $(_0x132247(0x3c8) + _0x274b8c['replaceAll']('.', '_'))[_0x132247(0x1e8)]('onclick', '\x20'), $(_0x132247(0x3c8) + _0x274b8c[_0x132247(0x320)]('.', '_'))[_0x132247(0x203)](_0x132247(0x221) + swiportcounts[_0x274b8c + '-unknown'] + ')');
        else $('#pills-unknown-tab' + _0x274b8c[_0x132247(0x320)]('.', '_'))[_0x132247(0x203)]('<span\x20class=\x22bold-text\x22\x20style=\x22color:white;\x22>Unknown(' + swiportcounts[_0x274b8c + _0x132247(0x26b)] + _0x132247(0x38b));
    });
}

function InitialswitchUpdates(_0x11a50a) {
    var _0x99956c = _0x81ccdf;
    _0x11a50a[_0x99956c(0x1cd)](function (_0xf7461) {
        var _0x3dc212 = _0x99956c;
        switch (_0xf7461['status']) {
            case 0x0:
                color = '#ff3d57';
                !$('#s' + _0xf7461['ip'][_0x3dc212(0x320)]('.', '_'))[_0x3dc212(0x30a)]('critical_opaque') && $('#s' + _0xf7461['ip'][_0x3dc212(0x320)]('.', '_'))['addClass'](_0x3dc212(0x232));
                break;
            case 0x1:
                color = _0x3dc212(0x27b);
                $('#s' + _0xf7461['ip'][_0x3dc212(0x320)]('.', '_'))[_0x3dc212(0x30a)]('critical_opaque') && $('#s' + _0xf7461['ip'][_0x3dc212(0x320)]('.', '_'))[_0x3dc212(0x346)]('critical_opaque');
                break;
            case 0x2:
                color = _0x3dc212(0x354);
                $('#s' + _0xf7461['ip'][_0x3dc212(0x320)]('.', '_'))[_0x3dc212(0x30a)]('critical_opaque') && $('#s' + _0xf7461['ip'][_0x3dc212(0x320)]('.', '_'))[_0x3dc212(0x346)]('critical_opaque');
                break;
            case 0x3:
                color = _0x3dc212(0x283);
                $('#s' + _0xf7461['ip'][_0x3dc212(0x320)]('.', '_'))[_0x3dc212(0x30a)](_0x3dc212(0x232)) && $('#s' + _0xf7461['ip'][_0x3dc212(0x320)]('.', '_'))[_0x3dc212(0x346)](_0x3dc212(0x232));
                break;
            default:
                color = _0x3dc212(0x3af);
                $('#s' + _0xf7461['ip'][_0x3dc212(0x320)]('.', '_'))[_0x3dc212(0x30a)]('critical_opaque') && $('#s' + _0xf7461['ip'][_0x3dc212(0x320)]('.', '_'))[_0x3dc212(0x346)](_0x3dc212(0x232));
        }
        $('#s' + _0xf7461['ip']['replaceAll']('.', '_'))[_0x3dc212(0x27e)](_0x3dc212(0x1c3), _0x3dc212(0x3c2) + color);
    });
}

function overallbgcolor(_0x5577c1) {
    var _0x5b3955 = _0x81ccdf;
    _0x5577c1[_0x5b3955(0x1cd)](function (_0x4e24b2) {
        var _0x8864c7 = _0x5b3955;
        switch (_0x4e24b2[_0x8864c7(0x34d)]) {
            case 0x0:
                color = _0x8864c7(0x27a);
                !$(_0x8864c7(0x2b6) + _0x4e24b2['ip'][_0x8864c7(0x320)]('.', '_'))[_0x8864c7(0x30a)](_0x8864c7(0x232)) && $(_0x8864c7(0x2b6) + _0x4e24b2['ip'][_0x8864c7(0x320)]('.', '_'))[_0x8864c7(0x476)](_0x8864c7(0x232));
                var _0x39bd98 = _0x8864c7(0x3de) + _0x4e24b2['ip'][_0x8864c7(0x320)]('.', '_');
                elm = document[_0x8864c7(0x431)](_0x39bd98);
                if (elm != null) elm['parentNode'][_0x8864c7(0x4c4)](elm, document[_0x8864c7(0x431)]('s_hw')[_0x8864c7(0x392)][0x0]);
                break;
            case 0x1:
                color = _0x8864c7(0x27b);
                $('#cardip_' + _0x4e24b2['ip'][_0x8864c7(0x320)]('.', '_'))[_0x8864c7(0x30a)]('critical_opaque') && $(_0x8864c7(0x2b6) + _0x4e24b2['ip'][_0x8864c7(0x320)]('.', '_'))[_0x8864c7(0x346)](_0x8864c7(0x232));
                break;
            case 0x2:
                color = '#16d39a';
                $(_0x8864c7(0x2b6) + _0x4e24b2['ip'][_0x8864c7(0x320)]('.', '_'))[_0x8864c7(0x30a)](_0x8864c7(0x232)) && $(_0x8864c7(0x2b6) + _0x4e24b2['ip']['replaceAll']('.', '_'))[_0x8864c7(0x346)]('critical_opaque');
                break;
            case 0x3:
                color = _0x8864c7(0x283);
                $(_0x8864c7(0x2b6) + _0x4e24b2['ip'][_0x8864c7(0x320)]('.', '_'))[_0x8864c7(0x30a)](_0x8864c7(0x232)) && $(_0x8864c7(0x2b6) + _0x4e24b2['ip'][_0x8864c7(0x320)]('.', '_'))[_0x8864c7(0x346)]('critical_opaque');
                break;
            default:
                color = _0x8864c7(0x3af);
                $('#cardip_' + _0x4e24b2['ip']['replaceAll']('.', '_'))[_0x8864c7(0x30a)](_0x8864c7(0x232)) && $(_0x8864c7(0x2b6) + _0x4e24b2['ip'][_0x8864c7(0x320)]('.', '_'))[_0x8864c7(0x346)](_0x8864c7(0x232));
        }
        $('#cardip_' + _0x4e24b2['ip'][_0x8864c7(0x320)]('.', '_'))[_0x8864c7(0x27e)](_0x8864c7(0x1c3), _0x8864c7(0x3c2) + color);
    });
}

function InitialhardwareUpdate(_0x40152c) {
    var _0x2f0570 = _0x81ccdf;
    _0x40152c[_0x2f0570(0x1cd)](function (_0x239099) {
        var _0x343651 = _0x2f0570,
            _0x4dc5a5 = _0x239099['ip']['split'](':')[0x0][_0x343651(0x320)]('.', '_'),
            _0x2bb06a = _0x343651(0x375) + _0x239099['ip'][_0x343651(0x444)](':')[0x0][_0x343651(0x320)]('.', '_'),
            _0x2ca471 = _0x239099['ip'][_0x343651(0x444)](':')[0x1],
            _0x5b56ac = '#' + _0x4dc5a5 + '\x5c:' + _0x2ca471;
        switch (parseInt(_0x239099[_0x343651(0x34d)])) {
            case 0x0:
                color = _0x343651(0x27a), $(_0x5b56ac)[_0x343651(0x27e)](_0x343651(0x1c3), '1px\x20solid\x20#ffffff');
                break;
            case 0x1:
                color = _0x343651(0x27b), $(_0x5b56ac)[_0x343651(0x27e)](_0x343651(0x1c3), _0x343651(0x219));
                break;
            case 0x2:
                color = _0x343651(0x354), $(_0x5b56ac)[_0x343651(0x27e)](_0x343651(0x1c3), _0x343651(0x219));
                break;
            case 0x3:
                color = _0x343651(0x283), $(_0x5b56ac)[_0x343651(0x27e)]('border', '1px\x20solid\x20#ffffff');
                break;
            case 0x5:
                color = '#1f1f1f', $(_0x5b56ac)[_0x343651(0x27e)](_0x343651(0x1c3), '1px\x20solid\x20#1f1f1f');
                break;
            default:
                color = _0x343651(0x3af), $(_0x5b56ac)[_0x343651(0x27e)](_0x343651(0x1c3), _0x343651(0x219));
        }
        _0x4dc5a5 + ':' + _0x2ca471 == _0x4dc5a5 + _0x343651(0x466) ? ($(_0x5b56ac)[_0x343651(0x27e)](_0x343651(0x236), _0x343651(0x283)), $(_0x5b56ac)[_0x343651(0x27e)](_0x343651(0x1c3), _0x343651(0x432))) : $(_0x5b56ac)[_0x343651(0x27e)](_0x343651(0x1fa), color);
    });
}

function InitialhardwareUpdates(_0x26d17c) {
    var _0x56e978 = _0x81ccdf,
        _0x3b7872 = _0x26d17c[_0x56e978(0x238)]['split'](':')[0x0][_0x56e978(0x320)]('.', '_'),
        _0x3da681 = 'ip_' + _0x26d17c[_0x56e978(0x238)][_0x56e978(0x444)](':')[0x0]['replaceAll']('.', '_'),
        _0x3b22a0 = _0x26d17c[_0x56e978(0x238)]['split'](':')[0x1];
    switch (parseInt(_0x26d17c[_0x56e978(0x34d)])) {
        case 0x0:
            color = _0x56e978(0x27a), $('#' + _0x3b7872 + '\x5c:' + _0x3b22a0)['css'](_0x56e978(0x1c3), _0x56e978(0x219));
            break;
        case 0x1:
            color = '#e59105', $('#' + _0x3b7872 + '\x5c:' + _0x3b22a0)[_0x56e978(0x27e)](_0x56e978(0x1c3), _0x56e978(0x219));
            break;
        case 0x2:
            color = _0x56e978(0x354), $('#' + _0x3b7872 + '\x5c:' + _0x3b22a0)['css'](_0x56e978(0x1c3), '1px\x20solid\x20#ffffff');
            break;
        case 0x3:
            color = '#ffffff', $('#' + _0x3b7872 + '\x5c:' + _0x3b22a0)[_0x56e978(0x27e)](_0x56e978(0x1c3), _0x56e978(0x219));
            break;
        case 0x5:
            color = '#1f1f1f', $('#' + _0x3b7872 + '\x5c:' + _0x3b22a0)[_0x56e978(0x27e)]('border', _0x56e978(0x284));
            break;
        default:
            color = '#000000', $('#' + _0x3b7872 + '\x5c:' + _0x3b22a0)[_0x56e978(0x27e)](_0x56e978(0x1c3), '1px\x20solid\x20#ffffff');
    }
    _0x3b7872 + ':' + _0x3b22a0 == _0x3b7872 + _0x56e978(0x466) ? ($('#' + _0x3b7872 + '\x5c:' + _0x3b22a0)['css']('color', _0x56e978(0x283)), $('#' + _0x3b7872 + '\x5c:' + _0x3b22a0)['css'](_0x56e978(0x1c3), 'none')) : $('#' + _0x3b7872 + '\x5c:' + _0x3b22a0)['css'](_0x56e978(0x1fa), color);
}

function overalldivcolor(_0xea335f) {
    var _0x5c3cd3 = _0x81ccdf;
    switch (_0xea335f[_0x5c3cd3(0x34d)]) {
        case 0x0:
            color = _0x5c3cd3(0x27a);
            !$(_0x5c3cd3(0x2b6) + _0xea335f['ip']['replaceAll']('.', '_'))[_0x5c3cd3(0x30a)](_0x5c3cd3(0x232)) && $(_0x5c3cd3(0x2b6) + _0xea335f['ip'][_0x5c3cd3(0x320)]('.', '_'))[_0x5c3cd3(0x476)](_0x5c3cd3(0x232));
            var _0x53f416 = _0x5c3cd3(0x3de) + _0xea335f['ip'][_0x5c3cd3(0x320)]('.', '_');
            elm = document[_0x5c3cd3(0x431)](_0x53f416);
            if (elm != null) elm['parentNode'][_0x5c3cd3(0x4c4)](elm, document[_0x5c3cd3(0x431)](_0x5c3cd3(0x1d2))[_0x5c3cd3(0x392)][0x0]);
            break;
        case 0x1:
            color = _0x5c3cd3(0x27b);
            $(_0x5c3cd3(0x2b6) + _0xea335f['ip'][_0x5c3cd3(0x320)]('.', '_'))[_0x5c3cd3(0x30a)](_0x5c3cd3(0x232)) && $(_0x5c3cd3(0x2b6) + _0xea335f['ip'][_0x5c3cd3(0x320)]('.', '_'))[_0x5c3cd3(0x346)]('critical_opaque');
            break;
        case 0x2:
            color = _0x5c3cd3(0x354);
            $(_0x5c3cd3(0x2b6) + _0xea335f['ip'][_0x5c3cd3(0x320)]('.', '_'))[_0x5c3cd3(0x30a)](_0x5c3cd3(0x232)) && $(_0x5c3cd3(0x2b6) + _0xea335f['ip'][_0x5c3cd3(0x320)]('.', '_'))[_0x5c3cd3(0x346)](_0x5c3cd3(0x232));
            break;
        default:
            color = _0x5c3cd3(0x3af);
            $(_0x5c3cd3(0x2b6) + _0xea335f['ip'][_0x5c3cd3(0x320)]('.', '_'))[_0x5c3cd3(0x30a)](_0x5c3cd3(0x232)) && $('#cardip_' + _0xea335f['ip'][_0x5c3cd3(0x320)]('.', '_'))[_0x5c3cd3(0x346)](_0x5c3cd3(0x232));
    }
    $(_0x5c3cd3(0x2b6) + _0xea335f['ip'][_0x5c3cd3(0x320)]('.', '_'))[_0x5c3cd3(0x27e)](_0x5c3cd3(0x1c3), _0x5c3cd3(0x3c2) + color);
}

function _0x57d9() {
    var _0x1e2b3f = ['<span\x20\x20class=\x22badgetltp\x20\x20badge\x20\x22\x20\x20style=\x22background-color:white;color:grey\x22\x20\x20id=\x22badge', '../dashboard/getneo4jnodes', '#000000', 'style', '\x22\x20style=\x22margin-bottom:0;border:\x201px\x20solid\x20', '\x22\x20><i\x20class=\x22mdi\x20icon-data\x20\x20mdi-arrow-left-drop-circle\x22>', '<div\x20class=\x22col-2\x20icon-bares\x20mob_hsicon\x22\x20id=\x22swicons', 'fortigate_firewall_stack_100F.j2', 'entries', '\x20style=\x22border:1px\x20solid\x20#1f1f1f;\x20height:100%;\x22></fieldset>&emsp;&emsp;', '#eswitch-heading', '#entity-nodata\x20#nodatamessage', '<div\x20class=\x22row\x22\x20style=\x22margin-left:0;\x22>', '<div\x20class=\x22mul-ip-div\x22\x20style=\x22display:\x20flex;overflow:\x20auto;\x22>', '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-warning\x22\x20aria-selected=\x22false\x22\x20onclick=\x22statusFunction(this);\x22>', '#g-switch', 'getElementsByClassName', '<a\x20class=\x22btn\x20selector\x20dropdown-toggle\x22\x20href=\x22#\x22\x20role=\x22button\x22\x20id=\x22dropdownMenuLink\x22\x20data-toggle=\x22dropdown\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22>', '\x27)\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:12px;\x22></i></div></div><div\x20class=\x22col-2\x22\x20text-right></div></div>', '\x22\x20class=\x22btn-close\x22\x20data-dismiss=\x22modal\x22\x20aria-label=\x22Close\x22\x20onclick=\x22displayTable(this)\x22\x20style=\x22background-color:#1f1f1f;color:white\x22>x</button\x20>', 'icon-evts', '1px\x20solid', 'borderColor', 'visibility', 'innerText', '\x27\x20not\x20found\x20in\x20the\x20DOM.', 'extend', '#pills-unknown-tab', 'HostMS', 'undefined', '<div\x20class=\x22row\x22\x20id=\x22', '\x20.modal-body', 'width', '.icon-node', '\x22\x20onclick=\x22displayrow(this)\x22\x20style=\x22margin-left:2%;font-size:\x2016px;\x22></i>', '<a\x20class=\x22select-link\x20dropdown-item\x20\x22\x20onclick=\x22onExport(\x22csv\x22)\x22>CSV</a>', 'hide', '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-ok\x22\x20aria-selected=\x22false\x22\x20onclick=\x22statusFunction(this);\x22>', '<div\x20class=\x22', 'outgoers', 'mac', '</a>', '.badge', '#gswitch-heading', '<p\x20id=\x22snmpfooter\x22><span\x20style=\x22color:red;\x20font-size:15px;\x22>*</span>\x20w\x20(warning),\x20c\x20(Critical),\x20t\x20(Time)</p>', '<div\x20class=\x22\x22\x20id=\x22entity-search\x22>', 'from', '</span></div>', '\x22\x20src=\x22', 'cardip_', 'relationships', '<button\x20type\x20=\x20\x22button\x22\x20id=\x22nodeview', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-health\x22\x20onclick=\x22openNavs(\x27', '#change-col3-size', 'btn-danger', 'rgb(255,\x20255,\x20255)', 'services', '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-critical\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-critical\x22\x20aria-selected=\x22false\x22\x20>Disconnected\x20(0)</a>', 'ifAlias', 'snmp_threshold', 'site_data', 'fortigate_firewall_50E.j2', 'okCount', 'Cisco_Catalyst_2960_S.j2', 'Cisco_ISR_1000.j2', '#ps_hw', '<button\x20class=\x22nav-item\x20mx-2\x22>', 'col-7', 'DOWN', 'g-div', 'fancy', '799881DtqdJg', '<div\x20class=\x22loader\x22\x20id=\x22loader\x22\x20style=\x22\x22><img\x20src=\x22/static/app/images/loading-gif.gif\x22></div\x20>\x20', '2eLYyVA', '<i\x20class=\x22mdi\x20mdi-information-outline\x22\x20id=\x22', 'match', 'sort', 'name', 'websocket_url', 'icon-tableview', '<td\x20style=\x27border-left:\x201px\x20solid\x20#eee;\x27\x20class=\x27service\x27>', '\x22\x20id=\x22no-lens\x22\x20onclick=\x22displaysearchbar(\x27', 'animate', '#pswitch-heading', 'unknownCount', 'BIG_IP_i4600_stack.j2', '<div\x20class=\x22dropdown\x20switch-dropdown\x22\x20style=\x22background-color:\x20#55a8fd;\x22>', 'edge.semitransp', '/entity/getneo4jspecificelement', '#card', '<i\x20class=\x22fa\x20fa-times-circle\x22\x20style=\x22color:\x20#ffffff;font-size:\x2020px;margin-left:\x20-70%;opacity:0.8\x22></i>', 'Cisco_3945_stack.j2', 'zoom', '#player-heading', 'Error\x20fetching\x20data:', 'cisco_SG350X_24_stack.j2', 'scrollTop', '\x27)\x22\x20id=\x22', 'Cisco_2911.j2', 'Node\x20Doesn\x27t\x20Exists', '#swihw', 'Service', '</td></tr>', 'ALL', 'backgroundColor', 'Cisco_C2960_48TT_L.j2', '<div\x20id=\x22warningmes\x22\x20style=\x22padding:\x202%;height:25px;margin-top:25%;background:\x20#f44336;border-radius:\x2012px;z-index:\x20999;\x22>', 'NetApp_AFF_A200.j2', 'BIG_IP_i4600.j2', 'fortigate_firewall_80F.j2', 'black', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>SERVERS<div\x20style=\x22background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center\x22>', '492934RJWoPA', '\x27),closedropdown()\x22\x20style=\x22color:#fff\x22></i></span>', 'NIC', '-disconn', '.icon-node,\x20.icon-tableview\x20', '#rswitch-heading', 'semitransp', 'tag', 'green', '<input\x20class=\x22search-input\x20w-100\x20search\x22\x20style=\x22width:85%\x20!important\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20onkeyup=\x22tableNodes()\x22\x20id=\x22myInput\x22\x20placeholder=\x22Search\x22\x20/>', 'fortigate_firewall_stack_60F.j2', '0.5', '\x22\x20onclick=\x22openm_func(this)\x22>', '</fieldset>', '#e99123', '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-all', '<button\x20type=\x22button\x22\x20class=\x22close\x22\x20data-dismiss=\x22modal\x22\x20aria-label=\x22Close\x22\x20style=\x22background-color:#1f1f1f;color:white;border:\x201px\x20solid\x20#ff0000\x22>', 'stylesheet', '.card', '#virtual-servers-heading', 'getElementById', 'none', 'Huawei_S5720_52X_LI_AC_stack.j2', 'readyState', '</table>', '#portinfo', '<tr><td\x20id=\x22', '<i\x20class=\x22icon-node\x22\x20data-toggle=\x22tooltip\x22\x20id=\x22nodeview', 'disc', 'rgb(22,\x20211,\x20154)', 'elements', '\x20\x20<span\x20class=\x22top-key\x22\x20></span><div\x20class=\x22\x22>', '#rlayer-heading', 'not', '#iconip', 'staticBackdrop', '\x20\x20\x20\x20<a\x20class=\x22nav-link\x22\x20id=\x22pills-ok-tab', '\x22\x20name=\x22', 'Critical\x20(', 'split', '../dashboard/getNicConnectnodes', '<div\x20class=\x22col-3\x20\x22\x20id=\x22change-col4-size\x22>', '<i\x20class=\x22fa\x20fa-window-restore\x22\x20style=\x22color:\x20#ffffff;font-size:\x2016px;margin-left:\x20-70%;\x22></i>', 'data', 's_swip_', 'location', 'col-12', 'getElementsByTagName', '24_stack_switch.j2', 'Nodes\x20(', '<h5\x20class=\x22modal-title\x22\x20id=\x22thresholdModals_', 'borderRadius', 'eswitch-heading', 'tagName', 'fullname', '<p\x20>-</p>', '<div\x20class=\x22row\x22\x20id=\x22pserversearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22entity-search\x22><div\x20class=\x22input-with-icon\x20position-relative\x22\x20style=\x22color:white\x22><input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22ps_overalltag\x22\x20placeholder=\x22Search\x22\x20/><i\x20class=\x22icon-search\x20icon-evts\x22\x20id=\x22icon-search\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:12px;\x22\x20id=\x22i_\x22\x20onclick=\x22swapDiv(this,\x20\x27', 'volumelist', 'edge', '.num-data', '<p\x20id=\x22nodefooter\x22><span\x20style=\x22color:red;\x20font-size:15px;\x22>*</span>\x20w\x20(warning),\x20c\x20(Critical),\x20t\x20(Time)</p>', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-help\x22\x20onclick=\x22openhelp(\x27', '</div><i\x20class=\x22\x20col-4\x20mdi\x20mdi-pin-outline\x22\x20id=\x22', '\x22\x20onclick=\x22openm_func(this)\x22\x20style=\x22display:none\x22\x20>', 'substring', 'Showing\x20VMs\x20for\x20Physical\x20Server\x20(\x20', '\x22\x20style=\x22height:\x20420px;\x20width:90%;\x20position:relative;\x20margin-left:5%;display:block\x22>', '<fieldset\x20class=\x22swicolor\x22\x20id=s', 'site', 'nodes', 'radware_defence_bro_x10.j2', '\x27,event)\x22\x20style=\x22width:205%;height:55%;margin-left:10%;\x20border:1px\x20solid\x20#ffffff;background-color:\x20#ffffff\x22/>', 'remove', ':Info', '_tooltip\x22\x20\x20style=\x22right:\x2020px\x20!important;width:auto\x20!important;max-height:300%;overflow-y:scroll\x22><p>', 'fortigate_firewall_stack.j2', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-default\x20btn-ripple\x20sm-hide\x22\x20id=\x22\x22\x20onclick=\x22thresholdfun(\x27', ':SW_NIC\x20', '</span></td>', 'tltp-pin\x22\x20style=\x22\x20z-index:1000;\x22\x20onclick=\x22pintool(\x27', 'prototype', 'innerHTML', 'allonboard/snmpdatatable?ipaddress=', '<legend>', '#e-switch', '\x27)\x22></i><i\x20class=\x22icon-close\x20icon-evts\x22\x20id=\x22icon-close\x20\x22\x20onclick=\x22closesearchbar(\x27', '<a\x20class=\x22select-link\x20dropdown-item\x22\x20onclick=\x22onExport(\x22json\x22)\x22>JSON</a>', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-default\x20table-node\x20btn-ripple\x20sm-hide\x22\x20id=\x22button', 'thresholdModal', 'addClass', 'card', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-analysis\x20text-white\x22></i></span>', '<div\x20class=\x22row\x22\x20id=\x22publicsearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22entity-search\x22><div\x20class=\x22input-with-icon\x20position-relative\x22\x20style=\x22color:white\x22><input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22switag', 'alias', 'responseData', '\x22\x20onclick=\x22openmodal(this)\x22>', 'percentage', 'port', 'sqrt', '#pills-ok-tab', 'data(size)', 'Cisco_Nexus_9000.j2', '<li\x20class=\x22nav-item\x22\x20id=\x22', 'show-lens', 'tltp-pin', 'transp-badge', '#change-col7-size', 'querySelectorAll', 'add', 'connectedEdges', 'node', 'get', '\x20is\x20Red', '#vms_hw\x20*', '<div\x20class=\x22row\x22\x20id=\x22search-row', '</tbody>', ';background-color:', 'appendChild', 'e_swi', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-dashboard\x22\x20style=\x22color:#ffffff\x22></span>', '\x22\x20onclick=\x22displaysearchbar(\x27', 'display_vms', '\x27)\x22\x20style=\x22font-size:\x2016px;\x22></i></div>', 'right', 'Pod', '\x22\x20style=\x22margin-left:0%;display:none\x22>', '\x27)\x22\x20style=\x22margin-left:1%\x22>', 'Unknown', '<div\x20class=\x22col-12\x22\x20id=\x22s_sw', 'position', '<td\x20class\x20=\x20\x27ip\x27\x20rowspan=\x27', '#node-view\x20#site-list\x20#', 'onreadystatechange', 'PENDING', '</div></span>', '.icon-tableview,\x20.icon-node', '\x20style=\x22border:1px\x20solid\x20#1f1f1f\x22></fieldset>&emsp;&emsp;', '\x20style=\x22border:1px\x20solid\x20#1f1f1f;width:570px;height:85%;\x22></fieldset>&emsp;&emsp;', 'autorotate', '[id*=', '#pills-critical-tab', '2373469YptYnx', '<div\x20class=\x22row\x22\x20id=\x22entitysearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22entity-search\x22><div\x20class=\x22input-with-icon\x20position-relative\x22\x20style=\x22color:white\x22><input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22switag', 'criticalNodeCount', 'Node\x20Expo', 'getBoundingClientRect', '\x22/><span\x20class=\x22tooltiptexts\x22\x20id=\x22', '#pills-pending-tab', ';\x20background-color:#1f1f1f;box-shadow:5px\x205px\x2050px\x2010px\x20#0e0e0e\x22>', ';background-color:\x20', '<h4\x20style=\x22margin-left:40%;font-size:15px;\x22>No\x20(Nodes/Pods)service\x20Available!</h4>', 'r_swi', '\x22/><span\x20class=\x22tooltiptexts\x20row\x22\x20id=\x22', '<table>', 'clicksite', 'thresholdModal_', 'search-row', 'removeEventListener', '\x27,event)\x22\x20style=\x22width:205%;height:55%;margin-left:10%;\x20border:1px\x20solid\x20', '\x20-\x20Threshold\x20Values', '</div><i\x20class=\x22\x20col-2\x20mdi\x20mdi-pin-outline\x22\x20id=\x22', '#g-switch,\x20#p-switch,\x20#e-switch,\x20#g-div,\x20#s_hw,\x20#server-div,\x20#ps_hw,\x20#vms_hw', 'fortigate_firewall_60E.j2', 'fortigate_firewall.j2', 'host', '_li', '\x22\x20style=\x22margin-left:-1%\x22>', 'insertBefore', 'null', 'scroll', 'tap', 'keyup', '\x22></span>\x20<a\x20class=\x22bold-text\x22\x20style=\x22color:#c8c8c8;\x22\x20data-id=\x22', '.modal-title', '<div\x20class=\x22row\x22>', 'Element\x20with\x20ID\x20\x27', 'parse', 'ps_hw', '</ul\x20>', '<h3\x20style=\x22text-align:center;margin-top:-10px;\x20font-size:15px;\x22>\x20Hardware\x20information\x20missing!\x20Please\x20Onboard\x20server\x20or\x20contact\x20administrator</h3>', '\x22\x20alt=\x22\x22\x20onclick=\x22openOnImageClick(this,\x20\x27', 'WAITING', 'cyto-fullscreen', '<p\x20nodefooter><span\x20style=\x22color:red;\x20font-size:15px;\x22>*</span>\x20w\x20(warning),\x20c\x20(Critical),\x20t\x20(Time)</p>', '.icon-data', '<div\x20class=\x22modal-content\x20thresh-content\x22\x20style=\x22width:\x2060%;\x20!important\x22>', 'No\x20Data', '\x20\x20\x20\x20<a\x20class=\x22nav-link\x22\x20id=\x22pills-warning-tab', '</div>', '[fullname=\x27', '\x27,\x27', '48_switch.j2', 'fortigate_firewall_60F.j2', '#slayer-heading', 'contains', 'random', '<div\x20class=\x22col-1\x20tooltips\x22\x20style=\x22max-width:\x202.6rem;\x22><img\x20class=\x22imgsize\x20', 'entitysearch-row', 'niclist', '-conn', 'value', 'HPE_SN3600B_FC.j2', '#node-view\x20#s_hw', '<div\x20class=\x22modal-header\x20\x22\x20>', 'classList', '\x27,event)\x22\x20onmouseover=\x22hovered(\x27', 'Cisco_FTD_2130.j2', 'publicsearch-row', 'id_', '\x20style=\x22border:1px\x20solid\x20#1f1f1f;\x20height:70%;\x22></fieldset>&emsp;&emsp;', 'router_4321.j2', '<th>Message</th>', 'bezier', '<i\x20class=\x22icon-search\x22\x20id=\x22data-mobile\x22></i>', 'nicname', 'search', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>VIRTUAL\x20MACHINES\x20<div\x20style=\x22background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center\x22>', '<----GETTING\x20ERROR---->', '#s_hw,\x20#server-div,\x20#ps_hw,\x20#vms_hw', '<a\x20class=\x22\x20fancy\x20', 'length', 'square', '<div\x20class=\x22input-with-icon\x20position-relative\x22\x20style=\x22color:white\x22>', 'SW_NIC', '\x22\x20id=\x22card', '_second', 'border', 'success', 'rgb(0,\x200,\x200)', 'div', '\x22\x20style=\x22margin-left:0px\x22\x20onclick=\x22openOnImageClick(this,\x20\x27', '<td\x20>', 'GET', 'textContent', '\x22\x20>', 'pswitch-heading', 'forEach', '#node-view\x20#site-list', 'visible', '<span\x20class=\x22bold-text\x20red\x22>Disconnected(', '\x20(\x20', 's_hw', 'Cisco_2921_stack.j2', '\x22\x20onclick=\x22displayrow(this)\x22\x20style=\x22margin-left:4%;font-size:\x2016px;\x22></i>', 's_sw', 'Huawei_S5720_32X_EI_AC_stack.j2', '\x22\x20tabindex=\x22-1\x22\x20role=\x22dialog\x22\x20aria-labelledby=\x22thresholdModalLabel\x22\x20aria-hidden=\x22true\x22\x20style=\x22overflow-y:hidden\x20!important;top:\x2020px\x20!important;\x22>', '<fieldset\x20class=\x22card\x20sswcard\x22\x20id=\x22card', 'TRUE', '</i><div\x20class=\x22num-data\x22>', '2770352ucnLCJ', '2472164ZiRzEx', 'thresholdsnmpModal_', '#vmslayer-heading', '<div\x20class=\x22badgetltp-elem\x22\x20style=\x22color:green;font-weight:bold\x22>', '<div\x20class=\x22col-1\x20tooltips\x22\x20style=\x22max-width:\x202.6rem;\x22><img\x20class=\x22imgsize\x20\x22\x20id=\x22', 'getElementsByName', '<fieldset\x20class=\x22card\x20\x20sswcard\x22\x20id=\x22card', 'vmselectedip', 'BARRACUDA_300.j2', '\x20\x20\x20\x20<a\x20class=\x22nav-link\x20active\x22\x20id=\x22pills-all-tab', 'delay', 'Huawei_S6720S_26Q_EI_24S_AC.j2', 'attr', '\x27)\x22></i><i\x20class=\x22icon-close\x22\x20id=\x22icon-close\x22\x20onclick=\x22closesearchbar(\x27', 'RUNNING', 'absolute', '<span\x20class=\x22bold-text\x20pending-text\x22>Pending(', '#warningdata', '\x22>\x20\x20', '</tr>', 'error', '#aeaeae', '</div><i\x20class=\x22icon-search\x20icon-evts\x20hide-val', '#physical-servers-heading', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-analysis\x22\x20style=\x22color:white\x22></i></span>', 'fortigate_firewall_100F.j2', '<span\x20class=\x22bold-text\x20green\x22>Connected(', '#vms_hw', 'tableExport', 'includes', 'background-color', '\x22\x20\x20title=\x22Table\x20view\x22\x20style=\x22color:white;font-size:\x2016px;\x22\x20onclick=\x22displayTable(this)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#staticBackdrop\x22></i>', '_tooltip', 'statusFunction(this)', 'Huawei_S5735_L24T4X_A1_stack.j2', 'fade', 'Nicconnect', 'off', '#tag', 'html', 'col-4', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-default\x20btn-ripple\x20sm-hide\x22\x20id=\x22button', 'setAttribute', '\x22\x20style=\x22margin-bottom:0;border:\x201px\x20solid\x20#1f1f1f;\x20background-color:#1f1f1f\x22>', '9559125Ptkrtx', '#fswitch-heading', '\x20\x20\x20\x20<a\x20class=\x22nav-link\x22\x20id=\x22pills-unknown-tab', '\x27,event)\x22\x20style=\x22width:205%;height:55%;margin-left:10%;\x20border:1px\x20solid\x20#ffffff;background-color:\x20#ffffff\x22/><span\x20class=\x22tooltiptexts\x22\x20id=\x22', '#pills-warning-tab', 'Cisco_C2960_48TT_L_stack.j2', '\x22\x20id=\x22', 'parentNode', '\x27)\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:12px;\x22></i></i></div></div><div\x20class=\x22col-2\x22\x20text-right></div></div>', 'target', '</span></a>', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-health\x22\x20style=\x22color:white\x22></i></span>', 'Pending\x20(', '<span\x20\x20class=\x22badgetltp\x20\x20badge\x20\x22\x20\x20style=\x22background-color:#121212;color:white\x22\x20id=\x22badge', 'Cisco_2960_G_stack.j2', 'true', '<div\x20class=\x22row\x22\x20id=\x22firewallsearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22entity-search\x22><div\x20class=\x22input-with-icon\x20position-relative\x22\x20style=\x22color:white\x22><input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22switag', '1px\x20solid\x20#ffffff', '\x22\x20style=\x22top:-150px\x20!important;\x22></div>', '#node-view\x20#s_sw', '_tooltip\x22\x20style=\x22right:\x2020px\x20!important;width:auto\x20!important;max-height:300%;overflow-y:scroll;min-width:\x20200%\x20!important;\x22><div\x20class=\x22col-10\x22\x20style=\x22padding-left:0\x22\x20>', 'DELETED', '<p\x20style=\x27font-size:\x2015px;\x27>', 'childElementCount', '<div\x20class=\x22fa\x22><i\x20class=\x22icon-close\x22\x20onclick=\x22closedropdown()\x22\x20style=\x22color:#fff\x22></i></div>', 'Unknown\x20(', 'rgb(233,\x20145,\x2035)', 'toggleButton', '<tr\x20style=\x22color:red\x22><td\x20id=\x22', 'toUpperCase', '</div><span\x20class=\x22bottom-key-1\x22></span><span\x20class=\x22bottom-key-2\x22></span>\x20\x20</a\x20>', '<p\x20style=\x27font-size:\x2015px;text-align:\x20center;\x27>No\x20data\x20in\x20table</p>', '<th>Service</th>', 'fullscreen', '\x22\x20onclick=\x22openm_func(this,\x20\x27', '\x20style=\x22border:1px\x20solid\x20#1f1f1f;height:100%;\x22></fieldset>&emsp;&emsp;', 'ServiceMS', 'WARNING', '\x20mul-fullscreen\x20closable\x22\x20style=\x22width:88%\x20!important;\x22>', '</div><i\x20class=\x22icon-search\x20hide-val', 'phy_', 'image', 'critical_opaque', '<a\x20class=\x22form-btn\x20btn-dropdown-link\x20select-input-link\x20text-left\x22\x20type\x20=\x20\x22button\x22\x20style=\x22\x22\x20id\x20=\x20\x22dropdownMenuButton\x22\x20data-toggle=\x22dropdown\x22\x20aria-haspopup=\x22true\x22\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20aria-expanded=\x22false\x22\x20>\x20<i\x20class=\x22mdi\x20mdi-download\x22\x20id=\x22exporting\x22\x20style=\x22color:#ffffff\x22></i>\x20</a\x20>', '\x27)\x22></i>', '.sswcard.critical_opaque', 'color', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-default\x20btn-ripple\x20sm-hide\x22\x20id=\x22thresholdsnmp_', 'title', '<div\x20class=\x22modal-header\x22>', 'indexOf', '<div\x20class=\x22modal-body\x22>', '<span\x20class=\x22bold-text\x20\x22\x20style=\x22color:white\x22>Unknown(', 'col-1', '<div\x20class=\x22col-2\x22\x20text-right>', 'multiple', 'Entities', '<p\x20style=\x22margin-left:2%\x22>', '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-default\x20table-node\x20btn-ripple\x20sm-hide\x22\x20id=\x22modal_view_right', '<thead\x20class=\x22table-head\x20border-t\x22>', '<div\x20class=\x22col-3\x22\x20id=\x22entity-search\x22>', '#node-view\x20#nodatamessage', '.png', '#vms_hw\x20.display_no_vms', 'Cisco_2960_G.j2', '#table-view', 'highlight', 'Warning\x20(', 'isEmptyObject', 'white', '\x22\x20placeholder=\x22Search\x22\x20/><i\x20class=\x22icon-search\x22\x20id=\x22icon-search\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:12px;\x22\x20id=\x22i_\x22\x20onclick=\x22swapDivgswi(\x27', '<div\x20class=\x22modal-dialog\x20modal-dialog-centered\x20modal-dialog-scrollable\x22\x20>', 'push', '\x22\x20data-text=\x22', 'nodeCount', '<tr\x20style=\x22color:orange\x22><td\x20id=\x22', 'node-detail', 'data(image)', '<span\x20\x20class=\x22badgetltp\x20badge\x20\x22\x20\x20style=\x22background-color:red\x22\x20id=\x22badge', 'Cisco_3945.j2', '\x22\x20onclick=\x22openServerModal(\x27', 'Huawei_S6720S_26Q_EI_24S_AC_stack.j2', '<div\x20class=\x22modal-dialog\x22\x20role=\x22document\x22>', 'class', '\x22\x20data-placement=\x22top\x22\x20title=\x22Node\x20view\x22\x20style=\x22display:\x20none;\x20color:white;font-size:\x2016px;\x22\x20onclick=\x22displayTable(this)\x22\x20data-dismiss=\x22modal\x22></i>', '#1f1f1f', 'orange', '\x22\x20style=\x22height:\x2010%;\x20width:\x20100%\x20!important\x22>', 'left', '<div\x20class=\x22badgetltp-data\x20\x22>', 'startsWith', 'f_swi', 'table_%DD%-%MM%-%YY%', '<a\x20class=\x22select-link\x20dropdown-item\x22\x20onclick=\x22onExport(\x22excel\x22)\x22>XLS</a>', '<div\x20class=\x22row\x22\x20id=\x22vmserversearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22entity-search\x22><div\x20class=\x22input-with-icon\x20position-relative\x22\x20style=\x22color:white\x22><input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22vms_overalltag\x22\x20placeholder=\x22Search\x22\x20/><i\x20class=\x22icon-search\x20icon-evts\x22\x20id=\x22icon-search\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:12px;\x22\x20id=\x22i_\x22\x20onclick=\x22swapDiv(this,\x20\x27', '<div\x20class=\x22col-10\x20cyto-fullscreen\x22\x20id=\x22s_sw', 'ready', 'cloneNode', '__IP__', '-unknown', '<p\x20id=\x22nicname', 'display_no_vms', 'className', '\x20style=\x22border:1px\x20solid\x20#1f1f1f;width:570px;height:100%;\x22></fieldset>&emsp;&emsp;', '24_switch.j2', '#p-switch', '</button>', 'preventDefault', '<legend\x20style=\x22display:flex;justify-content:end;\x22><button\x20type=\x22button\x22\x20class=\x22btn\x20btn-default\x20table-node\x20btn-ripple\x20sm-hide\x22\x20id=\x22modal_view_right', 'block', 'gatewaysearch-row', 'data(color)', 'isWSConnected', 'fortigate_firewall_stack_200F.j2', '#ff3d57', '#e59105', '<div\x20class=\x22modal-footer\x22>', '<div\x20class=\x22badgetltp-elem\x22\x20style=\x22color:red;font-weight:bold\x22>', 'css', 'aria-controls', '-</td>\x20<td>', 'SW_', 'linear', '#ffffff', '1px\x20solid\x20#1f1f1f', 'node[dashboardenabled=\x22true\x22]', '<span\x20class=\x22tooltiptexts\x22\x20style=\x22right:\x200px\x20!important;left:12px\x20!important;width:200%\x20!important;\x22><p>', '.search-input', '<i\x20class=\x22icon-search\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:18px;\x22\x20id=\x22i_', '#node-name', 'top', '<div\x20class=\x22col-7\x22\x20style=\x22margin-top:2%\x22>', ':NIC\x22\x20style=\x22border:2px\x20solid\x20', '<fieldset\x20class=\x22card\x20fullscreen\x20closable\x20sswcard\x20', 'thresholdsnmpModals_', 'portid', 'Disconnected\x20(', '\x20style=\x22border:1px\x20solid\x20#1f1f1f;height:95%;\x22></fieldset>&emsp;&emsp;', 'has', '<div\x20class=\x22row\x22\x20id=\x22serversearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22entity-search\x22><div\x20class=\x22input-with-icon\x20position-relative\x22\x20style=\x22color:white\x22><input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22overalltag\x22\x20placeholder=\x22Search\x22\x20/><i\x20class=\x22icon-search\x22\x20id=\x22icon-search\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:12px;\x22\x20id=\x22i_\x22\x20onclick=\x22swapDiv(this)\x22></i><i\x20class=\x22icon-close\x22\x20id=\x22icon-close\x22\x20onclick=\x22closesearchbar(\x27', 'isArray', 'CRITICAL', 'portinfo', '\x22\x20style=\x22height:\x20346px;\x20width:90%;\x20position:relative;\x20margin-left:5%;display:block\x22>', '<span\x20\x20class=\x22badgetltp\x20\x20badge\x20\x22\x20\x20style=\x22background-color:orange\x22\x20id=\x22badge', '\x22\x20id=\x22no-lens', 'Cisco_2921.j2', '.icon-evts,\x20.fancy', 'Cisco_Catalyst_2960_S_stack.j2', '<th>IP</th>', '<div\x20class=\x22col-5\x20option-icons\x22>', '</i>', '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-unknown\x22\x20aria-selected=\x22false\x22\x20onclick=\x22statusFunction(this);\x22>', 'myInput', 'nodedetails', 'open', 'fortigate_firewall_stack_80F.j2', '\x27,event)\x22\x20\x20onmouseover=\x22hovered(\x27', '.div', 'log', '#g-div', '<h3\x20style=\x22text-align:center;margin-top:-10px;\x20font-size:15px;\x22>\x20URL\x20Not\x20Reachable</h3>', 'fswitch-heading', '\x20port\x20-\x20', '<tr>', '../entity/', 'toggle', 'cyto-height', 'string', 'fa-window-maximize', '<input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22tag', '</legend>', 'cisco_SG350X_24.j2', 'val', '#cardip_', '../dashboard/getHostnodes', '<div\x20class=\x22pill-contain\x20p-0\x22\x20style\x20=\x20\x22z-index:\x20100;\x22\x20>', '<a\x20class=\x22form-btn\x20btn-dropdown-link\x20select-input-link\x20text-left\x22\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20type\x20=\x20\x22button\x22\x20style=\x22\x22\x20id\x20=\x20\x22dropdownMenuButton\x22\x20data-toggle=\x22dropdown\x22\x20aria-haspopup=\x22true\x22\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20aria-expanded=\x22false\x22\x20>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22mdi\x20mdi-download\x22\x20id=\x22exporting\x22\x20style=\x22color:#ffffff\x22></i>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</a\x20>', '\x27)\x22><i\x20class=\x22icon-close\x22\x20id=\x22icon-close\x22\x20onclick=\x22closesearchbar(\x27', '<th>Last\x20Update\x20(mm/dd/yyyy)</th>', 'then', 'rgb(255,\x2061,\x2087)', '_li\x22\x20style=\x22position:\x20relative;\x22><span\x20class=\x22\x22\x20style=\x22z-index:\x20100;position:\x20absolute;top:\x20-4px;right:\x206px;\x22\x20id=\x22', 'pendingCount', 'onclick', '#pslayer-heading', 'statusText', '<div\x20class=\x22modal\x20fade\x20closable\x22\x20id=\x22staticBackdrop\x22\x20data-backdrop=\x22static\x22\x20data-keyboard=\x22false\x22\x20tabindex=\x22-1\x22\x20aria-labelledby=\x22staticBackdropLabel\x22\x20aria-hidden=\x22true\x22\x20style=\x22overflow-y:hidden\x20!important\x22>', '</thead>', '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-warning', '<th>Status</th>', '#vms_overalltag', '<span\x20aria-hidden=\x22true\x22>&times;</span>', '<ul\x20class=\x22nav\x20nav-pills\x20mb-2\x22\x20id=\x22pills-tab\x22\x20role=\x22tablist\x22>', 'POST', '.modal-body', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>FIREWALL<div\x20style=\x22background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center\x22>', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-analysis\x22\x20onclick=\x22openNav(\x27', '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22>', '#node-view\x20#ps_hw', 'fortigate_firewall_stack_100E.j2', '\x22\x20style=\x22margin-left:1%\x22>', 'threshold', '<div\x20class=\x22badgetltp-elem\x22\x20style=\x22background-color:#1f1f1f;color:white;border:0.5px\x20solid\x20grey\x22>', '<i\x20class=\x22mdi\x20mdi-alpha-t-box-outline\x22\x20id=\x22\x22\x20\x20title=\x22\x22\x20style=\x22color:white;font-size:\x2016px;\x22\x20\x20></i>', '\x22\x20tabindex=\x22-1\x22\x20role=\x22dialog\x22\x20aria-labelledby=\x22thresholdModalLabel\x22\x20aria-hidden=\x22true\x22\x20style=\x22overflow-y:hidden\x20!important;top:25px\x20!important;\x22>', 'Info.png', 'Huawei_S5720_32X_EI_AC.j2', 'no_vm_div', '.hide-val', 'toString', 'col-lg-8', 'failure', 'mdi-information-outline', 'send', '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-critical', 'show', '<div\x20class=\x22row\x22\x20id=\x22routersearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22entity-search\x22><div\x20class=\x22input-with-icon\x20position-relative\x22\x20style=\x22color:white\x22><input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22switag', 'g_swi', '#s_hw', 'end', 'grey', '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-unknown', '\x20#nodefooter', '</p>', 'hostms', 'firewallsearch-row', 'Cisco_ISR_1000_stack.j2', 'Info', 'MAX_VALUE', '\x22></h5>', '</div\x20>', '<span\x20class=\x22bold-text\x20warning\x22>Warning(', '48_stack_switch.j2', 'newip', '#warningerror', '<ul\x20class=\x22nav\x20nav-pills\x20mb-2\x22\x20id=\x22pills-tab', 'each', 'rgb(', '1.5', '\x22\x20style=\x22display:none\x22>', 'incomers', 'imgsize', '<i\x20class=\x22icon-tableview\x22\x20id=\x22tableview', '<div\x20class=\x22dropdown-menu\x22\x20id=\x22export-to-select\x22\x20aria-labelledby=\x22dropdownMenuButton\x22>', 'red', '<td\x20class\x20=\x20\x27ip\x27>\x20</td>', 'text', '\x20port\x20selected', 'querySelector', '<a\x20class=\x22select-link\x20dropdown-item\x22\x20onclick=\x22onExport(\x22txt\x22)\x22>TXT</a>', 'Huawei_S5735_L24T4X_A1.j2', 'hosts', 'friendlyname', '<br>No\x20disk\x20summary</span></div>', '<div\x20class=\x22dropdown-menu\x20dropdown-menu-hw\x22\x20aria-labelledby=\x22dropdownMenuLink\x22\x20id=\x22portinfos', 'mouseover', 'addEventListener', 'hasClass', 'service', 'UNREACHABLE', 'createElement', 'vms_hw', '#entity-heading', 'e-switch', 'node-view', '#server-div', 'nodes_data', '<div\x20class=\x22modal\x20fade\x22\x20id=\x22thresholdModal_', 'selectedip', '#total-nodes', '\x20\x20\x20\x20<a\x20class=\x22nav-link\x22\x20id=\x22pills-critical-tab', '<p\x20style=\x27margin-left:5%;\x20font-size:\x2015px;\x27>', 'modal', 'Cisco_2911_stack.j2', '\x27,event)\x22\x20style=\x22width:205%;height:55%;margin-left:10%;\x20border:1px\x20solid', 'p_swi', 'nodeid', '\x22\x20onclick=\x22searchNodes(this)\x22></i>', '<tr\x20style=\x22color:green\x22><td\x20id=\x22', 'replaceAll', 'Huawei_S5720_52X_LI_AC.j2', 'append', 'Ok\x20(', 'isSuccess', 'p-switch', 'display', 'replace', '\x22\x20placeholder=\x22Search\x22\x20/>', 'row', ':NIC', 'replaceChild', 'Window\x20Expo', '</td>', 'checked', 'criticalCount', '<h5\x20class=\x22modal-title\x20col-3\x22\x20id=\x22staticBackdropLabel\x22>', '\x22\x20role=\x22tablist\x22>', '<div\x20class=\x22modal-content\x22>', '#servers-heading', '#node-view\x20#entity-nodata', '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-all\x22\x20aria-selected=\x22false\x22\x20onclick=\x22statusFunction(this);\x22>All</a>', '.icon-evts', '\x20style=\x22border:1px\x20solid\x20#1f1f1f;\x20height:80%;\x22></fieldset>&emsp;&emsp;', 'done', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>ROUTER<div\x20style=\x22background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center\x22>', '<i\x20class=\x22mdi\x20mdi-alpha-t-box-outline\x22\x20id=\x22\x22\x20style=\x22color:white;font-size:\x2016px;\x22\x20\x20></i>', 'click', '\x20<button\x20class=\x22nav-item\x20mx-2\x20\x22>', 'modal-body', '../dashboard/getstatusAll', '&ensp;>&ensp;</a></li><h2\x20style=\x22font-size:15px;\x22>Entity\x20Status<h2>', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>PUBLIC\x20-\x20SWITCH<div\x20style=\x22background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center\x22>', '924eECTKt', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-health\x20text-white\x22></i></span>', '#ps_overalltag', '<br>No\x20nic\x20summary</span></div>', ':Info\x22\x20\x20title=\x22\x22\x20style=\x22color:white;font-size:\x2016px;\x22\x20\x20></i>', 'removeClass', '<td\x20><span\x20class=\x27white-text\x20py-1\x20px-2\x20size12\x20radius-8\x20status\x27\x20style=\x27background:', 'fortigate_firewall_100E.j2', '#elayer-heading', 'cxtmenu', ')-</td>\x20<td>', '<i\x20class=\x22icon-search\x22\x20id=\x22no-lens', 'status', 'start', 'routersearch-row', 'Status_data', 'scrollLeft', '<a\x20class=\x22select-link\x20dropdown-item\x22\x20onclick=\x22onExport(\x22sql\x22)\x22>SQL</a>', '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>GATEWAY\x20-\x20SWITCH<div\x20style=\x22background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center\x22>', '#16d39a', 'trim', ':SW_NIC', '<div\x20class=\x22row\x22\x20id=\x22gatewaysearch-row\x22\x20style=\x22margin-left:0%;display:none\x22><div\x20class=\x22\x22\x20id=\x22entity-search\x22><div\x20class=\x22input-with-icon\x20position-relative\x22\x20style=\x22color:white\x22><input\x20class=\x22search-input\x20w-100\x20search\x22\x20type=\x22search\x22\x20name=\x22tags\x22\x20\x20id=\x22switag', '<span\x20class=\x22closebuttn\x22\x20type=\x22button\x22\x20onclick=\x22dismissfunc(this)\x22\x20style=\x22margin-left:\x2015px;color:\x20white;font-weight:\x20bold;float:\x20right;font-size:\x2040px;line-height:\x2020px;margin-top:-10px;cursor:\x20pointer;transition:\x200.3s;\x22>&times;</span>', '</p></span></div>', '\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-critical\x22\x20aria-selected=\x22true\x22\x20onclick=\x22statusFunction(this);\x22>', '#s_sw', '<button\x20id=\x22hardwaresdata', 'toLocaleString', '#node-view-card', 'Entity\x20server\x20not\x20reachable.', '#node-detail', 'warningCount', '#swicons', 'fortigate_firewall_stack_50E.j2', 'UNKNOWN', 'center', 'le_url', 'hover', 'flex', '/getfilecontent', '\x22\x20onclick=\x22openmodal(this)\x22\x20style=\x22display:none\x22\x20>', 'g-switch', '#entity-next', 'serversearch-row', 'tab', '\x22\x20><i\x20class=\x22mdi\x20icon-data\x20mdi-arrow-left-drop-circle\x22>', '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-help\x20text-white\x22></i></span>', 'Cisco_FTD_2130_stack.j2', 'fortigate_firewall_200F.j2', '#switag', 'fa-window-restore', 'ip_', 'thresholdModals_', 'lens', 'NetApp_AFF_A200_stack.j2', 'responseText', '_tooltip\x22\x20style=\x22right:\x2020px\x20!important;width:auto\x20!important;max-height:300%;overflow-y:scroll;min-width:\x20200%\x20!important;\x22><div\x20class=\x22col-8\x22\x20style=\x22padding-left:0\x22\x20>', '<div\x20class=\x22col-10\x22\x20id=\x22s_sw', 'SECONDARY-IP', '.fancy', '_opq\x22\x20style=\x22display:flex;\x22>', '_tooltip\x22\x20style=\x22right:\x2020px\x20!important;width:auto\x20!important;max-height:300%;overflow-y:scroll;min-width:\x20200%\x20!important;\x22>', 'selector', 'no-lens', '../dashboard/getnodespecificdetails', 'pan', 'Host', 'keys', 'key', 'Node', 'vee', '7px', '<a\x20class=\x22form-btn\x20btn-dropdown-link\x20select-input-link\x20text-left\x22\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20type\x20=\x20\x22button\x22\x20style=\x22\x22\x20id\x20=\x20\x22dropdownMenuButton\x22\x20data-toggle=\x22dropdown\x22\x20aria-haspopup=\x22true\x22\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20aria-expanded=\x22false\x22\x20>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22mdi\x20mdi-download\x22\x20id=\x22exporting\x22\x20style=\x22color:#ffffff\x22></i>\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</a\x20>', ')</span>', 'Cisco_Nexus_9000_stack.j2', 'mouseout', 'allonboard/getmgmntdata?ipaddress=', '-10px', 'cose', '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-unknown\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-unknown\x22\x20aria-selected=\x22false\x22\x20>Unknown\x20(0)</a>', 'children', '\x20#snmpfooter', '#vms_hw\x20.fancy', '</h5>', 'fortigate_firewall_stack_60E.j2', '\x22\x20src=\x22/static/images/', 'empty', 'Dashboard', 'Please\x20enter\x20at\x20least\x202\x20characters', '../dashboard/getIconspecificnodes', 'FAILURE!', 'hasOwnProperty', 'radware_defence_bro_x10_stack.j2', '<div\x20class=\x22badgetltp-elem\x22\x20style=\x22font-weight:bold;color:grey\x22>', 'server-div', '<td\x20style=\x27border-left:\x201px\x20solid\x20#eee;\x27>Server</td>', '#node-view\x20#entity-search', 'code', '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-ok', 'Node/Pod\x20Doesn\x27t\x20Exists', '26090wYtHTB', 'innerWidth', 'map', '_tooltip\x22\x20style=\x22right:\x2020px\x20!important;width:auto\x20!important;max-height:300%;overflow-y:scroll;\x22>', '<div\x20class=\x22modal-body\x22\x20style=\x22padding:0\x22></div>', 'find', 'Server\x20Status\x20Data\x20500\x20Error'];
    _0x57d9 = function () {
        return _0x1e2b3f;
    };
    return _0x57d9();
}

function InitialswitchUpdate(_0x4ec409) {
    var _0x496a02 = _0x81ccdf;
    switch (_0x4ec409[_0x496a02(0x34d)]) {
        case 0x0:
            color = _0x496a02(0x27a);
            !$('#s' + _0x4ec409['ip'][_0x496a02(0x320)]('.', '_'))['hasClass'](_0x496a02(0x232)) && $('#s' + _0x4ec409['ip'][_0x496a02(0x320)]('.', '_'))[_0x496a02(0x476)](_0x496a02(0x232));
            break;
        case 0x1:
            color = _0x496a02(0x27b);
            $('#s' + _0x4ec409['ip'][_0x496a02(0x320)]('.', '_'))['hasClass']('critical_opaque') && $('#s' + _0x4ec409['ip']['replaceAll']('.', '_'))[_0x496a02(0x346)](_0x496a02(0x232));
            break;
        case 0x2:
            color = _0x496a02(0x354);
            $('#s' + _0x4ec409['ip'][_0x496a02(0x320)]('.', '_'))['hasClass']('critical_opaque') && $('#s' + _0x4ec409['ip'][_0x496a02(0x320)]('.', '_'))[_0x496a02(0x346)]('critical_opaque');
            break;
        default:
            color = _0x496a02(0x3af);
            $('#s' + _0x4ec409['ip']['replaceAll']('.', '_'))[_0x496a02(0x30a)](_0x496a02(0x232)) && $('#s' + _0x4ec409['ip'][_0x496a02(0x320)]('.', '_'))[_0x496a02(0x346)](_0x496a02(0x232));
    }
    $('#s' + _0x4ec409['ip'][_0x496a02(0x320)]('.', '_'))['css'](_0x496a02(0x1c3), _0x496a02(0x3c2) + color);
}
async function reqdata(_0x390994, _0x391803) {
    return await new Promise(function (_0x264edd, _0x586d10) {
        var _0x51dcfe = _0x5292;
        _0x264edd(requestDataFromServer(_0x51dcfe(0x3ae), {
            'sitename': params[_0x51dcfe(0x48c)](_0x51dcfe(0x461)),
            'layer': _0x390994
        }, _0x51dcfe(0x1c9))[_0x51dcfe(0x338)](function (_0x284d61) {
            var _0x46f0b7 = _0x51dcfe;
            adata = _0x284d61['responseData'][0x0][_0x46f0b7(0x3e9)]['nodes'][_0x46f0b7(0x448)], arrowdata[_0x391803] = _0x284d61[_0x46f0b7(0x47b)][0x0][_0x46f0b7(0x3e9)][_0x46f0b7(0x462)][_0x46f0b7(0x448)], adata[_0x46f0b7(0x1cd)](function (_0x518459) {
                var _0x101f3f = _0x46f0b7,
                    _0x3cfbdb = _0x518459[0x1][_0x101f3f(0x444)](':')[0x1];
                if (_0x518459[0xb] == 0x3) { }
                IndividualPortStatus[_0x101f3f(0x250)]({
                    'ip': _0x518459[0x7],
                    'layer': _0x390994,
                    'port': _0x518459[0x1][_0x101f3f(0x444)](':')[0x1],
                    'status': _0x518459[0xb]
                });
                if (_0x518459[0x5] == _0x101f3f(0x47e)) InitialPortStatus['push']({
                    'ip': _0x518459[0x7],
                    'layer': _0x390994,
                    'port': _0x518459[0x1]['split'](':')[0x1],
                    'status': _0x518459[0xb]
                });
                else {
                    if (_0x518459[0x5][_0x101f3f(0x1f9)](_0x101f3f(0x246)) || _0x518459[0x5][_0x101f3f(0x1f9)]('.jpg')) InitialSwitchIcons[_0x101f3f(0x250)](_0x518459);
                    else {
                        let _0x328d53 = document[_0x101f3f(0x431)](_0x390994);
                        IndividualPortStatus['push']({
                            'ip': _0x518459[0x7],
                            'layer': _0x390994,
                            'port': _0x518459[0x1]['split'](':')[0x1],
                            'status': _0x518459[0xb]
                        });
                        if (_0x390994 == _0x101f3f(0x2e2)) {
                            gcount++, $('#glayer-heading')['show']();
                            var _0x376542 = _0x101f3f(0x276);
                            document[_0x101f3f(0x431)]('gswitch-heading')[_0x101f3f(0x46e)] = _0x101f3f(0x353) + gcount + _0x101f3f(0x22f) + _0x376542 + _0x101f3f(0x299) + divid + '\x22\x20onclick=\x22displaysearchbar(\x27' + _0x376542 + '\x27)\x22\x20style=\x22font-size:\x2016px;\x22></i></div>', $(_0x101f3f(0x3d8))[_0x101f3f(0x322)](_0x101f3f(0x357) + _0x390994 + _0x101f3f(0x24e) + this + _0x101f3f(0x4db) + _0x390994 + '\x27,\x27' + _0x518459[0x7] + _0x101f3f(0x1e9) + _0x376542 + '\x27)\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:12px;\x22></i></div></div><div\x20class=\x22col-2\x22\x20text-right></div></div>');
                        } else {
                            if (_0x390994 == _0x101f3f(0x493)) {
                                ecount++, $(_0x101f3f(0x349))[_0x101f3f(0x2e0)]();
                                var _0x376542 = _0x101f3f(0x4e2);
                                document[_0x101f3f(0x431)](_0x101f3f(0x451))[_0x101f3f(0x46e)] = '<div\x20class=\x22row\x20row-width\x22\x20style=\x22margin:unset\x22>EXCHANGE\x20-\x20SWITCH<div\x20style=\x22background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center\x22>' + ecount + _0x101f3f(0x22f) + _0x376542 + _0x101f3f(0x299) + divid + _0x101f3f(0x495) + _0x376542 + _0x101f3f(0x497), $(_0x101f3f(0x3b7))['append'](_0x101f3f(0x4ab) + _0x390994 + _0x101f3f(0x24e) + this + '\x27,\x27' + _0x390994 + _0x101f3f(0x4db) + _0x518459[0x7] + _0x101f3f(0x1e9) + _0x376542 + _0x101f3f(0x3bf));
                            } else {
                                if (_0x390994 == _0x101f3f(0x263)) {
                                    fcount++, $('#flayer-heading')[_0x101f3f(0x2e0)]();
                                    var _0x376542 = _0x101f3f(0x2ea);
                                    document[_0x101f3f(0x431)](_0x101f3f(0x2aa))[_0x101f3f(0x46e)] = _0x101f3f(0x2cc) + fcount + _0x101f3f(0x22f) + _0x376542 + _0x101f3f(0x299) + divid + '\x22\x20onclick=\x22displaysearchbar(\x27' + _0x376542 + '\x27)\x22\x20style=\x22font-size:\x2016px;\x22></i></div>', $(_0x101f3f(0x209))['append'](_0x101f3f(0x218) + _0x390994 + _0x101f3f(0x24e) + this + _0x101f3f(0x4db) + _0x390994 + _0x101f3f(0x4db) + _0x518459[0x7] + _0x101f3f(0x2ba) + _0x376542 + _0x101f3f(0x210));
                                } else {
                                    if (_0x390994 == _0x101f3f(0x4b4)) {
                                        rcount++, $(_0x101f3f(0x43d))[_0x101f3f(0x2e0)]();
                                        var _0x376542 = _0x101f3f(0x34f);
                                        document[_0x101f3f(0x431)]('rswitch-heading')[_0x101f3f(0x46e)] = _0x101f3f(0x339) + rcount + _0x101f3f(0x22f) + _0x376542 + _0x101f3f(0x299) + divid + _0x101f3f(0x495) + _0x376542 + _0x101f3f(0x497), $(_0x101f3f(0x422))[_0x101f3f(0x322)](_0x101f3f(0x2e1) + _0x390994 + _0x101f3f(0x24e) + this + _0x101f3f(0x4db) + _0x390994 + _0x101f3f(0x4db) + _0x518459[0x7] + '\x27)\x22><i\x20class=\x22icon-close\x22\x20id=\x22icon-close\x22\x20onclick=\x22closesearchbar(\x27' + _0x376542 + _0x101f3f(0x210));
                                    } else {
                                        pcount++, $(_0x101f3f(0x40a))[_0x101f3f(0x2e0)]();
                                        var _0x376542 = _0x101f3f(0x4ec);
                                        document[_0x101f3f(0x431)](_0x101f3f(0x1cc))[_0x101f3f(0x46e)] = _0x101f3f(0x340) + pcount + _0x101f3f(0x22f) + _0x376542 + _0x101f3f(0x299) + divid + _0x101f3f(0x495) + _0x376542 + _0x101f3f(0x497), $(_0x101f3f(0x400))[_0x101f3f(0x322)](_0x101f3f(0x479) + _0x390994 + '\x22\x20placeholder=\x22Search\x22\x20/><i\x20class=\x22icon-search\x22\x20id=\x22icon-search\x22\x20style=\x22position:\x20inherit;\x20color:\x20white;font-size:12px;\x22\x20id=\x22i_\x22\x20onclick=\x22swapDivgswi(\x27' + this + _0x101f3f(0x4db) + _0x390994 + _0x101f3f(0x4db) + _0x518459[0x7] + _0x101f3f(0x1e9) + _0x376542 + _0x101f3f(0x3bf));
                                    }
                                }
                            }
                        }
                        var _0x4c9ce2 = '';
                        _0x4c9ce2 += _0x101f3f(0x2b8), _0x4c9ce2 += _0x101f3f(0x3b9), _0x4c9ce2 += _0x101f3f(0x2c9), _0x4c9ce2 += '<button\x20class=\x22nav-item\x20mx-2\x22>', _0x4c9ce2 += _0x101f3f(0x317) + _0x518459[0x7]['replaceAll']('.', '_') + _0x101f3f(0x3e6), _0x4c9ce2 += _0x101f3f(0x272), _0x4c9ce2 += _0x101f3f(0x3ef), _0x4c9ce2 += _0x101f3f(0x441) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x22\x20data-toggle=\x22pill\x22\x20href=\x22#pills-ok\x22\x20role=\x22tab\x22\x20aria-controls=\x22pills-ok\x22\x20aria-selected=\x22false\x22>Connected\x20(0)</span></a>', _0x4c9ce2 += _0x101f3f(0x272), _0x4c9ce2 += _0x101f3f(0x3ef), _0x4c9ce2 += _0x101f3f(0x20a) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x391), _0x4c9ce2 += _0x101f3f(0x272), _0x4c9ce2 += _0x101f3f(0x4cf), _0x4c9ce2 += _0x101f3f(0x2ef), _0x4c9ce2 += _0x101f3f(0x2ef);
                        if (_0x518459[0x5] == _0x101f3f(0x270)) swihtml = _0x101f3f(0x460) + _0x518459[0x7]['replaceAll']('.', '_') + _0x101f3f(0x4a5), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_24[_0x101f3f(0x320)]('__IP__', _0x518459[0x7]['replaceAll']('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                        else {
                            if (_0x518459[0x5] == _0x101f3f(0x44d)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_24stack['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                            else {
                                if (_0x518459[0x5] == '48_stack_switch.j2') swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_48stack[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                else {
                                    if (_0x518459[0x5] == _0x101f3f(0x4dc)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_48[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                    else {
                                        if (_0x518459[0x5] == _0x101f3f(0x4c0)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7]['replaceAll']('.', '_') + _0x101f3f(0x1b2), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigate[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                        else {
                                            if (_0x518459[0x5] == _0x101f3f(0x468)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f\x22></fieldset>&emsp;&emsp;', _0x328d53[_0x101f3f(0x46e)] += swihtml, document['getElementById']('s' + _0x518459[0x7]['replaceAll']('.', '_'))['innerHTML'] += swi_xml_fortigatestack[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                            else {
                                                if (_0x518459[0x5] == _0x101f3f(0x3ea)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x3b6), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigate50E[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7]['replaceAll']('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                else {
                                                    if (_0x518459[0x5] == _0x101f3f(0x363)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigatestack50E[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                    else {
                                                        if (_0x518459[0x5] == _0x101f3f(0x4bf)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f;\x20height:100%;\x22></fieldset>&emsp;&emsp;', _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_fortigate60E[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                        else {
                                                            if (_0x518459[0x5] == _0x101f3f(0x396)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigatestack60E[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                            else {
                                                                if (_0x518459[0x5] == _0x101f3f(0x4dd)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f;\x20height:100%;\x22></fieldset>&emsp;&emsp;', _0x328d53[_0x101f3f(0x46e)] += swihtml, document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigate60F[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                else {
                                                                    if (_0x518459[0x5] == _0x101f3f(0x427)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigatestack60F['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                    else {
                                                                        if (_0x518459[0x5] == _0x101f3f(0x41a)) swihtml = _0x101f3f(0x460) + _0x518459[0x7]['replaceAll']('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f;\x20height:100%;\x22></fieldset>&emsp;&emsp;', _0x328d53[_0x101f3f(0x46e)] += swihtml, document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_fortigate80F[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                                        else {
                                                                            if (_0x518459[0x5] == _0x101f3f(0x2a4)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x291), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigatestack80F[_0x101f3f(0x320)]('__IP__', _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                            else {
                                                                                if (_0x518459[0x5] == 'fortigate_firewall_100E.j2') swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x337), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigate100E[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                else {
                                                                                    if (_0x518459[0x5] == _0x101f3f(0x2d0)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x22b), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigatestack100E[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                    else {
                                                                                        if (_0x518459[0x5] == _0x101f3f(0x1f5)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x337), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_fortigate100F['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                        else {
                                                                                            if (_0x518459[0x5] == 'fortigate_firewall_stack_100F.j2') swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f;height:100%;\x22></fieldset>&emsp;&emsp;', _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigatestack100F[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                                                            else {
                                                                                                if (_0x518459[0x5] == 'fortigate_firewall_200F.j2') swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a6), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigate200F[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                else {
                                                                                                    if (_0x518459[0x5] == _0x101f3f(0x279)) swihtml = _0x101f3f(0x460) + _0x518459[0x7]['replaceAll']('.', '_') + _0x101f3f(0x26f), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_fortigatestack200F['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                    else {
                                                                                                        if (_0x518459[0x5] == _0x101f3f(0x1b3)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x26f), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_router_4321[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                                                                        else {
                                                                                                            if (_0x518459[0x5] == _0x101f3f(0x2d7)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f\x22></fieldset>&emsp;&emsp;', _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_32[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                            else {
                                                                                                                if (_0x518459[0x5] == _0x101f3f(0x1d6)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_32stack[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                else {
                                                                                                                    if (_0x518459[0x5] == _0x101f3f(0x303)) swihtml = _0x101f3f(0x460) + _0x518459[0x7]['replaceAll']('.', '_') + _0x101f3f(0x4a5), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_L24T4X_A1['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                    else {
                                                                                                                        if (_0x518459[0x5] == 'Huawei_S5735_L24T4X_A1_stack.j2') swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f\x22></fieldset>&emsp;&emsp;', _0x328d53['innerHTML'] += swihtml, document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_L24T4X_A1_stc['replaceAll']('__IP__', _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                        else {
                                                                                                                            if (_0x518459[0x5] == _0x101f3f(0x321)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_S5720_52X['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                            else {
                                                                                                                                if (_0x518459[0x5] == _0x101f3f(0x433)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))['innerHTML'] += swi_xml_S5720_52X_stc[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                else {
                                                                                                                                    if (_0x518459[0x5] == _0x101f3f(0x3ec)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_Cisco_2960[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                    else {
                                                                                                                                        if (_0x518459[0x5] == _0x101f3f(0x29c)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_Cisco_2960_stc[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                                                                                                        else {
                                                                                                                                            if (_0x518459[0x5] == _0x101f3f(0x1e7)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_S6720S_24S[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                            else {
                                                                                                                                                if (_0x518459[0x5] == _0x101f3f(0x259)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_S6720S_24S_stc[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                else {
                                                                                                                                                    if (_0x518459[0x5] == _0x101f3f(0x416)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_C2960_48TT['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                    else {
                                                                                                                                                        if (_0x518459[0x5] == _0x101f3f(0x20d)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_C2960_48TT_stc[_0x101f3f(0x320)]('__IP__', _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                                                                                                                        else {
                                                                                                                                                            if (_0x518459[0x5] == _0x101f3f(0x2b4)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f\x22></fieldset>&emsp;&emsp;', _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_SG350X_24[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                            else {
                                                                                                                                                                if (_0x518459[0x5] == _0x101f3f(0x40c)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_SG350X_24_stc['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                else {
                                                                                                                                                                    if (_0x518459[0x5] == _0x101f3f(0x1e4)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_barracuda['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                    else {
                                                                                                                                                                        if (_0x518459[0x5] == 'BARRACUDA_300_stack.j2') swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_barracuda_stc[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                        else {
                                                                                                                                                                            if (_0x518459[0x5] == _0x101f3f(0x419)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_big_ip[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                            else {
                                                                                                                                                                                if (_0x518459[0x5] == _0x101f3f(0x402)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f\x22></fieldset>&emsp;&emsp;', _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_big_ip_stc[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                else {
                                                                                                                                                                                    if (_0x518459[0x5] == _0x101f3f(0x40f)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_cisco_2911['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                    else {
                                                                                                                                                                                        if (_0x518459[0x5] == _0x101f3f(0x31a)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_cisco_2911_stc[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                        else {
                                                                                                                                                                                            if (_0x518459[0x5] == _0x101f3f(0x29a)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_cisco_2921[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                            else {
                                                                                                                                                                                                if (_0x518459[0x5] == _0x101f3f(0x1d3)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f\x22></fieldset>&emsp;&emsp;', _0x328d53[_0x101f3f(0x46e)] += swihtml, document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_cisco_2921_stc[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                else {
                                                                                                                                                                                                    if (_0x518459[0x5] == _0x101f3f(0x248)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_cisco_2960['replaceAll']('__IP__', _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                    else {
                                                                                                                                                                                                        if (_0x518459[0x5] == _0x101f3f(0x216)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_cisco_2960_stc[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                        else {
                                                                                                                                                                                                            if (_0x518459[0x5] == _0x101f3f(0x257)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_cisco_3945[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                            else {
                                                                                                                                                                                                                if (_0x518459[0x5] == _0x101f3f(0x408)) swihtml = _0x101f3f(0x460) + _0x518459[0x7]['replaceAll']('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f\x22></fieldset>&emsp;&emsp;', _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_cisco_3945_stc[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                                else {
                                                                                                                                                                                                                    if (_0x518459[0x5] == _0x101f3f(0x4eb)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_cisco_ftd['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                                    else {
                                                                                                                                                                                                                        if (_0x518459[0x5] == 'Cisco_FTD_2130_stack.j2') swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_cisco_ftd_stc[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                                                                                                                                                                                        else {
                                                                                                                                                                                                                            if (_0x518459[0x5] == 'Cisco_ISR_1000.j2') swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_cisco_isr[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                                            else {
                                                                                                                                                                                                                                if (_0x518459[0x5] == _0x101f3f(0x2eb)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_cisco_isr_stc[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                                                else {
                                                                                                                                                                                                                                    if (_0x518459[0x5] == _0x101f3f(0x482)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += swi_xml_cisco_nexus[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                                                    else {
                                                                                                                                                                                                                                        if (_0x518459[0x5] == _0x101f3f(0x38c)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_cisco_nexus_stc[_0x101f3f(0x320)]('__IP__', _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                                                        else {
                                                                                                                                                                                                                                            if (_0x518459[0x5] == _0x101f3f(0x4e6)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_hpe_sn3600b[_0x101f3f(0x320)]('__IP__', _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                                                                                                                                                                                                            else {
                                                                                                                                                                                                                                                if (_0x518459[0x5] == 'HPE_SN3600B_FC_stack.j2') swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f\x22></fieldset>&emsp;&emsp;', _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_hpe_sn3600b_stc[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                                                                                                                                                                                                                else {
                                                                                                                                                                                                                                                    if (_0x518459[0x5] == _0x101f3f(0x418)) swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_netapp_aff[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                                                                    else {
                                                                                                                                                                                                                                                        if (_0x518459[0x5] == _0x101f3f(0x378)) swihtml = _0x101f3f(0x460) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))[_0x101f3f(0x46e)] += swi_xml_netapp_aff_stc[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7]['replaceAll']('.', '_')), document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))['innerHTML'] += _0x4c9ce2;
                                                                                                                                                                                                                                                        else {
                                                                                                                                                                                                                                                            if (_0x518459[0x5] == _0x101f3f(0x463)) swihtml = _0x101f3f(0x460) + _0x518459[0x7]['replaceAll']('.', '_') + _0x101f3f(0x4a5), _0x328d53[_0x101f3f(0x46e)] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += swi_xml_radware_brox10['replaceAll'](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2;
                                                                                                                                                                                                                                                            else _0x518459[0x5] == 'radware_defence_bro_x10_stack.j2' && (swihtml = '<fieldset\x20class=\x22swicolor\x22\x20id=s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_') + '\x20style=\x22border:1px\x20solid\x20#1f1f1f\x22></fieldset>&emsp;&emsp;', _0x328d53['innerHTML'] += swihtml, document[_0x101f3f(0x431)]('s' + _0x518459[0x7]['replaceAll']('.', '_'))['innerHTML'] += swi_xml_radware_brox10_stc[_0x101f3f(0x320)](_0x101f3f(0x26a), _0x518459[0x7][_0x101f3f(0x320)]('.', '_')), document['getElementById']('s' + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'))[_0x101f3f(0x46e)] += _0x4c9ce2);
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
                        }
                        var _0x113b28 = _0x101f3f(0x2f2) + _0x518459[0x7][_0x101f3f(0x320)]('.', '_'),
                            _0x3db3a6 = document[_0x101f3f(0x431)](_0x113b28);
                        _0x3db3a6 ? _0x518459[0xc] !== '' || _0x518459[0xc] !== null ? _0x3db3a6['textContent'] = _0x518459[0x7] + _0x101f3f(0x1d1) + _0x518459[0xc] + '\x20)' : _0x3db3a6[_0x101f3f(0x1ca)] = _0x518459[0x7] : console['error'](_0x101f3f(0x4cc) + _0x113b28 + _0x101f3f(0x3c6));
                    }
                }
                port_swi[_0x101f3f(0x250)]({
                    'ip': '#' + _0x518459[0x7]['replaceAll']('.', '_'),
                    'portid': '#' + _0x3cfbdb,
                    'nodeid': _0x518459[0x0]
                });
            }), InitialPortUpdate(InitialPortStatus), switchportcounts(IndividualPortStatus), switchiconsstate(InitialSwitchIcons), InitialPortStatus = [], IndividualPortStatus = [], InitialSwitchIcons = [], port_swi[_0x46f0b7(0x1cd)](function (_0x3c09ed) {
                var _0x36f7b8 = _0x46f0b7;
                $(_0x3c09ed['ip'] + '\x20' + _0x3c09ed[_0x36f7b8(0x28f)][_0x36f7b8(0x320)]('/', '_'))[_0x36f7b8(0x1e8)](_0x36f7b8(0x31d), _0x3c09ed[_0x36f7b8(0x31d)]);
            }), port_swi = [], stopLoader(_0x46f0b7(0x311));
        }));
    });
}

function switchiconsstate(_0x3da7a6) {
    var _0xa3a3c8 = _0x81ccdf;
    _0x3da7a6[_0xa3a3c8(0x1cd)](function (_0x4dd601) {
        var _0x1e9461 = _0xa3a3c8,
            _0x2dcce8 = _0x4dd601[0x0],
            _0x2e5eaf = _0x4dd601[0x7][_0x1e9461(0x444)](':')[0x0][_0x1e9461(0x320)]('.', '_'),
            _0x3eb97a = _0x4dd601[0x7]['split'](':')[0x0],
            _0x483bc6 = '',
            _0xc605d = '';
        _0x4dd601[0x5] == _0x1e9461(0x2d6) && (_0xc605d += _0x1e9461(0x237) + _0x2e5eaf + '\x22\x20onclick=\x22thresholdsnmp(\x27' + _0x3eb97a + '\x27)\x22\x20style=\x22margin-left:-57px\x22>', _0xc605d += _0x1e9461(0x33a), _0xc605d += '</button>', _0xc605d += '<button\x20type=\x22button\x22\x20class=\x22btn\x20btn-default\x20btn-ripple\x20sm-hide\x22\x20id=\x22button' + _0x2e5eaf + _0x1e9461(0x1c7) + _0x2dcce8 + _0x1e9461(0x4db) + _0x2e5eaf + '\x27,event)\x22>', _0xc605d += _0x1e9461(0x3f7) + _0x2e5eaf + _0x1e9461(0x345), _0xc605d += '</button>', _0xc605d += '<div\x20class=\x22modal\x20fade\x22\x20id=\x22thresholdsnmpModal_' + _0x3eb97a['replaceAll']('.', '_') + _0x1e9461(0x2d5), _0xc605d += _0x1e9461(0x25a), _0xc605d += '<div\x20class=\x22modal-content\x20thresh-content\x22\x20style=\x22width:\x2050%;\x20!important\x22>', _0xc605d += _0x1e9461(0x239), _0xc605d += '<h5\x20class=\x22modal-title\x22\x20id=\x22thresholdsnmpModals_' + _0x3eb97a[_0x1e9461(0x320)]('.', '_') + _0x1e9461(0x2ee), _0xc605d += '<button\x20type=\x22button\x22\x20class=\x22close\x22\x20data-dismiss=\x22modal\x22\x20aria-label=\x22Close\x22\x20style=\x22background-color:#1f1f1f;color:white;border:\x201px\x20solid\x20#ff0000\x22>', _0xc605d += _0x1e9461(0x2c8), _0xc605d += _0x1e9461(0x272), _0xc605d += '</div>', _0xc605d += '<div\x20class=\x22modal-body\x22>', _0xc605d += _0x1e9461(0x4d9), _0xc605d += _0x1e9461(0x27c), _0xc605d += _0x1e9461(0x3d9), _0xc605d += _0x1e9461(0x2ef), _0xc605d += _0x1e9461(0x4d9), _0xc605d += _0x1e9461(0x4d9), _0xc605d += _0x1e9461(0x4d9)), _0x4dd601[0x5] != _0x1e9461(0x2d6) && (_0x483bc6 += '<div\x20class=\x22col-1\x20tooltips\x22\x20style=\x22max-width:\x202.6rem;\x22><img\x20class=\x22imgsize\x22\x20id=\x22' + _0x4dd601[0x1]['replaceAll']('.', '_') + '\x22\x20src=\x22/static/images/' + _0x4dd601[0x5] + _0x1e9461(0x4d1) + _0x2dcce8 + '\x27,\x27' + _0x2e5eaf + _0x1e9461(0x464), _0x483bc6 += _0x1e9461(0x286) + _0x4dd601[0x1]['split'](':')[0x1] + '</p></span>', _0x483bc6 += '</div\x20>'), $(_0x1e9461(0x411) + _0x4dd601[0x7][_0x1e9461(0x320)]('.', '_'))[_0x1e9461(0x322)](_0x483bc6), $(_0x1e9461(0x43f) + _0x4dd601[0x7]['replaceAll']('.', '_'))[_0x1e9461(0x322)](_0xc605d);
    });
}

function _0x5292(_0x27e284, _0x2f3408) {
    var _0x57d954 = _0x57d9();
    return _0x5292 = function (_0x5292af, _0x6ff5e8) {
        _0x5292af = _0x5292af - 0x1b1;
        var _0xe16d7 = _0x57d954[_0x5292af];
        return _0xe16d7;
    }, _0x5292(_0x27e284, _0x2f3408);
}

function thresholdsnmp(_0x48c667) {
    var _0x237fc1 = _0x81ccdf,
        _0x5d3477 = new XMLHttpRequest();
    _0x5d3477[_0x237fc1(0x2a3)]('GET', leurl + _0x237fc1(0x46f) + encodeURIComponent(_0x48c667), !![]), _0x5d3477[_0x237fc1(0x4a1)] = function () {
        var _0x3802d0 = _0x237fc1;
        if (_0x5d3477['readyState'] == 0x4) {
            if (_0x5d3477[_0x3802d0(0x34d)] == 0xc8) {
                var _0x3c8778 = JSON['parse'](_0x5d3477[_0x3802d0(0x379)]);
                const _0x5a5e27 = _0x3802d0(0x1dd) + _0x48c667[_0x3802d0(0x320)]('.', '_');
                document[_0x3802d0(0x431)](_0x3802d0(0x28e) + _0x48c667[_0x3802d0(0x320)]('.', '_'))[_0x3802d0(0x1ca)] = _0x48c667 + _0x3802d0(0x4bc), $('#' + _0x5a5e27 + _0x3802d0(0x3cc))[_0x3802d0(0x398)]();
                if (_0x3c8778[_0x3802d0(0x34d)] === 0xc8) {
                    if (_0x3c8778 && _0x3c8778[_0x3802d0(0x448)] && Array[_0x3802d0(0x294)](_0x3c8778[_0x3802d0(0x448)])) {
                        const _0x5a8fa6 = _0x3c8778[_0x3802d0(0x448)][0x0][_0x3802d0(0x3e8)],
                            _0x473b03 = JSON[_0x3802d0(0x4cd)](_0x5a8fa6['replace'](/'/g, '\x22')),
                            _0x2f8f26 = document['createElement'](_0x3802d0(0x1c6));
                        _0x2f8f26[_0x3802d0(0x26e)] = _0x3802d0(0x44b);
                        for (const _0x5e1f6b in _0x473b03) {
                            if (_0x473b03[_0x3802d0(0x39d)](_0x5e1f6b)) {
                                const _0x2182b1 = _0x473b03[_0x5e1f6b];
                                if (_0x2182b1[_0x3802d0(0x1bd)] !== 0x0) {
                                    const _0x2fe878 = document['createElement']('div');
                                    _0x2fe878['className'] = _0x3802d0(0x3f0), _0x2fe878[_0x3802d0(0x46e)] = '<p\x20style=\x27margin-left:5%;\x20font-size:\x2015px;\x27>' + _0x5e1f6b + _0x3802d0(0x2e8);
                                    const _0x25e59a = document[_0x3802d0(0x30d)]('div');
                                    _0x25e59a[_0x3802d0(0x26e)] = _0x3802d0(0x23d), _0x25e59a[_0x3802d0(0x46e)] = _0x3802d0(0x454);
                                    const _0x179f82 = document['createElement']('div');
                                    _0x179f82[_0x3802d0(0x26e)] = _0x3802d0(0x204), _0x179f82[_0x3802d0(0x46e)] = _0x3802d0(0x21e) + _0x2182b1 + '</p>';
                                    const _0x19d4ef = document['createElement'](_0x3802d0(0x1c6));
                                    _0x19d4ef[_0x3802d0(0x26e)] = 'row', _0x19d4ef['appendChild'](_0x2fe878), _0x19d4ef[_0x3802d0(0x492)](_0x25e59a), _0x19d4ef[_0x3802d0(0x492)](_0x179f82), _0x2f8f26[_0x3802d0(0x492)](_0x19d4ef);
                                }
                            }
                        }
                        $('#' + _0x5a5e27 + _0x3802d0(0x3cc))[_0x3802d0(0x203)](_0x2f8f26), $('#' + _0x5a5e27 + '\x20#snmpfooter')[_0x3802d0(0x2e0)]();
                    }
                } else $('#' + _0x5a5e27 + '\x20.modal-body')[_0x3802d0(0x203)](_0x3802d0(0x227)), $('#' + _0x5a5e27 + _0x3802d0(0x393))[_0x3802d0(0x3d1)]();
                $('#' + _0x5a5e27)[_0x3802d0(0x319)](_0x3802d0(0x2e0));
            } else console['error'](_0x3802d0(0x40b), _0x5d3477[_0x3802d0(0x2c2)]);
        }
    }, _0x5d3477[_0x237fc1(0x2de)]();
}

function getdivcolorDatas() {
    var _0x175411 = _0x81ccdf;
    requestDataFromServer('../dashboard/getHostOrIconnodes', {
        'sitename': params[_0x175411(0x48c)](_0x175411(0x461))
    }, type = _0x175411(0x1c9))[_0x175411(0x338)](function (_0x435348) {
        var _0x58bfe5 = _0x175411;
        host_divbgcolor = _0x435348[_0x58bfe5(0x47b)][0x0][_0x58bfe5(0x313)][_0x58bfe5(0x304)][_0x58bfe5(0x448)], icons_bgcolor = _0x435348[_0x58bfe5(0x47b)][0x0][_0x58bfe5(0x313)]['icons'][_0x58bfe5(0x448)], host_divbgcolor[_0x58bfe5(0x1cd)](function (_0x3dcf5e) {
            var _0x14ed9e = _0x58bfe5;
            InitialhwdivStatus[_0x14ed9e(0x250)]({
                'ip': _0x3dcf5e[0x7],
                'status': _0x3dcf5e[0xb]
            }), overallbgcolor(InitialhwdivStatus), InitialSwitchStatus[_0x14ed9e(0x250)]({
                'ip': _0x3dcf5e[0x7],
                'status': _0x3dcf5e[0xb]
            }), InitialswitchUpdates(InitialSwitchStatus);
        }), icons_bgcolor['forEach'](function (_0x1e657b) {
            var _0x513491 = _0x58bfe5;
            hardwarebgcolorstatus[_0x513491(0x250)]({
                'ip': _0x1e657b[0x1],
                'status': _0x1e657b[0xb]
            }), InitialhardwareUpdate(hardwarebgcolorstatus);
        });
    });
}
async function switchs() {
    var _0x3d016 = _0x81ccdf;
    InitialPortStatus = [], data = [], layers = [_0x3d016(0x2e2), 'e_swi', _0x3d016(0x31c), _0x3d016(0x263), _0x3d016(0x4b4)], port_swi = [], (gcount = 0x0, ecount = 0x0, pcount = 0x0, fcount = 0x0, rcount = 0x0);
    var _0x54c58c = 0x0;
    for (let _0x1c60c1 = 0x0; _0x1c60c1 < layers['length']; _0x1c60c1++) {
        await reqdata(layers[_0x1c60c1], _0x54c58c), _0x54c58c++;
    };
    getdivcolorDatas(), countloop();
}

function clicked(_0x59b819) {
    var _0x10d4e1 = _0x81ccdf,
        _0x51b20 = _0x59b819[_0x10d4e1(0x211)],
        _0x51fc2d = _0x51b20[_0x10d4e1(0x4ae)](),
        _0x267e6e = $(window),
        _0x349ada = document[_0x10d4e1(0x431)](_0x10d4e1(0x296));
    _0x349ada['style'][_0x10d4e1(0x326)] = 'block', _0x349ada['style'][_0x10d4e1(0x49e)] = _0x10d4e1(0x1eb);
    var _0x32671c = _0x51fc2d['left'] / window[_0x10d4e1(0x3a7)] * 0x64;
    window[_0x10d4e1(0x3a7)] <= 0x15e ? (_0x32671c > 0x46 ? _0x349ada['style']['left'] = 0.85 * window[_0x10d4e1(0x3a7)] - 0x32 + 'px' : _0x349ada['style'][_0x10d4e1(0x260)] = _0x51fc2d['left'] + _0x267e6e['scrollLeft']() + 'px', _0x349ada[_0x10d4e1(0x3b0)][_0x10d4e1(0x28a)] = _0x51fc2d[_0x10d4e1(0x28a)] + _0x267e6e[_0x10d4e1(0x40d)]() + 'px') : (_0x32671c > 0x55 ? _0x349ada['style'][_0x10d4e1(0x260)] = 0.85 * window['innerWidth'] + 'px' : _0x349ada['style'][_0x10d4e1(0x260)] = _0x51fc2d['left'] + _0x267e6e[_0x10d4e1(0x351)]() + 'px', _0x349ada[_0x10d4e1(0x3b0)]['top'] = _0x51fc2d[_0x10d4e1(0x28a)] + _0x267e6e[_0x10d4e1(0x40d)]() + 'px');
}

function closedropdown() {
    var _0x4150be = _0x81ccdf,
        _0x256980 = document['getElementById'](_0x4150be(0x296));
    _0x256980['style']['display'] = 'none';
}

function click(_0x423e23, _0x1d3ffa) {
    var _0x35d3f0 = _0x81ccdf,
        _0x4489ad = '',
        _0x2e84bf = _0x35d3f0(0x375) + $(_0x423e23)[_0x35d3f0(0x1e8)](_0x35d3f0(0x25b))['split']('-')[0x1],
        _0x5cc3fc = $(_0x423e23)[_0x35d3f0(0x1e8)](_0x35d3f0(0x25b))[_0x35d3f0(0x444)]('-')[0x0],
        _0x2aa186 = $(_0x423e23)[_0x35d3f0(0x1e8)]('class')[_0x35d3f0(0x444)]('-')[0x1][_0x35d3f0(0x320)]('_', '.') + ':' + _0x5cc3fc,
        _0xb7d73e, _0x34628b = $(_0x423e23)[_0x35d3f0(0x1e8)](_0x35d3f0(0x31d)),
        _0x1179de = '';
    requestDataFromServer(_0x35d3f0(0x405), {
        'title': _0x2aa186,
        'required': _0x35d3f0(0x3e7),
        'sitename': selectedsite
    }, _0x35d3f0(0x1c9))[_0x35d3f0(0x338)](function (_0x7304a8) {
        var _0x566265 = _0x35d3f0,
            _0x19656a = JSON['parse'](_0x7304a8);
        _0xb7d73e = _0x19656a[_0x566265(0x448)][_0x566265(0x448)], _0x1179de = document['getElementById']('s' + $(_0x423e23)[_0x566265(0x1e8)](_0x566265(0x25b))[_0x566265(0x444)]('-')[0x1])[_0x566265(0x20f)]['id'][_0x566265(0x444)]('_')[0x0];
        _0xb7d73e != null && _0xb7d73e != '' ? document[_0x566265(0x431)](_0x1179de + 'selectedip')[_0x566265(0x3c5)] = $(_0x423e23)['attr'](_0x566265(0x25b))['split']('-')[0x1] + '\x20' + _0x5cc3fc + _0x566265(0x2ab) + _0xb7d73e : document[_0x566265(0x431)](_0x1179de + 'selectedip')[_0x566265(0x3c5)] = $(_0x423e23)['attr']('class')[_0x566265(0x444)]('-')[0x1] + '\x20' + _0x5cc3fc + _0x566265(0x300);
        document[_0x566265(0x431)](_0x1179de + _0x566265(0x315))['style'][_0x566265(0x326)] = _0x566265(0x275);
        var _0x39cc6c = 0x2710;
        setTimeout(_0x18b299, _0x39cc6c);

        function _0x18b299() {
            var _0x3e3510 = _0x566265;
            document[_0x3e3510(0x431)](_0x1179de + 'selectedip')['style'][_0x3e3510(0x326)] = 'none';
        }
    }), $(_0x35d3f0(0x436))[_0x35d3f0(0x398)](), _0x4489ad += _0x35d3f0(0x2cd) + _0x34628b + _0x35d3f0(0x4db) + siteName + '\x27,\x27' + _0x2e84bf + _0x35d3f0(0x41e), _0x4489ad += _0x35d3f0(0x3e1) + _0x34628b + _0x35d3f0(0x4db) + siteName + '\x27,\x27' + _0x2e84bf + '\x27),closedropdown()\x22\x20style=\x22color:#fff\x22></i></span>', _0x4489ad += _0x35d3f0(0x45a) + _0x34628b + _0x35d3f0(0x4db) + siteName + '\x27,\x27' + _0x2e84bf + _0x35d3f0(0x41e), _0x4489ad += _0x35d3f0(0x220), $(_0x35d3f0(0x436))[_0x35d3f0(0x322)](_0x4489ad);
    var _0x4cf6a1 = $(_0x423e23)['attr'](_0x35d3f0(0x25b))[_0x35d3f0(0x2da)]();
    clicked(_0x1d3ffa);
}

function openOnImageClick(_0x5a2bf1, _0x55247c, _0x2e9d29, _0x633cf5) {
    var _0x403464 = _0x81ccdf,
        _0x31ada4 = 'ip_' + _0x2e9d29,
        _0xcbddd8 = _0x55247c,
        _0x4ed86f = '';
    $(_0x403464(0x436))[_0x403464(0x398)](), _0x4ed86f += '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-analysis\x22\x20onclick=\x22openNav(\x27' + _0xcbddd8 + '\x27,\x27' + siteName + _0x403464(0x4db) + _0x31ada4 + _0x403464(0x41e), _0x4ed86f += _0x403464(0x3e1) + _0xcbddd8 + _0x403464(0x4db) + siteName + _0x403464(0x4db) + _0x31ada4 + _0x403464(0x41e), _0x4ed86f += '<span\x20class=\x22fa\x20fa-2x\x22><i\x20class=\x22icon-help\x22\x20onclick=\x22openhelp(\x27' + _0xcbddd8 + '\x27,\x27' + siteName + '\x27,\x27' + _0x31ada4 + _0x403464(0x41e), _0x4ed86f += _0x403464(0x220), $('#portinfo')[_0x403464(0x322)](_0x4ed86f), clicked(_0x633cf5);
}

function startEntityLoader() {
    var _0x13876c = _0x81ccdf;
    $(_0x13876c(0x334))[_0x13876c(0x27e)]('display', _0x13876c(0x432)), $(_0x13876c(0x21b))[_0x13876c(0x27e)](_0x13876c(0x326), 'none'), $(_0x13876c(0x4e7))[_0x13876c(0x27e)](_0x13876c(0x326), 'none'), showLoader('node-view');
}

function stopEntityLoader() {
    var _0x22d301 = _0x81ccdf;
    $(_0x22d301(0x334))['css'](_0x22d301(0x326), _0x22d301(0x275)), $(_0x22d301(0x21b))[_0x22d301(0x27e)](_0x22d301(0x326), 'block'), $('#node-view\x20#s_hw')[_0x22d301(0x27e)](_0x22d301(0x326), _0x22d301(0x275)), stopLoader(_0x22d301(0x311));
}