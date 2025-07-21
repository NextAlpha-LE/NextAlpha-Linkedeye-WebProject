var _0xd55339 = _0x4526;
(function (_0x46b905, _0x14282f) {
    var _0xf016f4 = _0x4526,
        _0x2d4c36 = _0x46b905();
    while (!![]) {
        try {
            var _0x3e5112 = -parseInt(_0xf016f4(0x1ac)) / 0x1 + -parseInt(_0xf016f4(0x1f8)) / 0x2 + -parseInt(_0xf016f4(0x170)) / 0x3 * (parseInt(_0xf016f4(0x1f4)) / 0x4) + parseInt(_0xf016f4(0x13b)) / 0x5 * (-parseInt(_0xf016f4(0x1ea)) / 0x6) + -parseInt(_0xf016f4(0x212)) / 0x7 + -parseInt(_0xf016f4(0x1c6)) / 0x8 * (parseInt(_0xf016f4(0x153)) / 0x9) + parseInt(_0xf016f4(0x14f)) / 0xa;
            if (_0x3e5112 === _0x14282f) break;
            else _0x2d4c36['push'](_0x2d4c36['shift']());
        } catch (_0x3220d0) {
            _0x2d4c36['push'](_0x2d4c36['shift']());
        }
    }
}(_0x39e1, 0x7fa4e));

function _0x4526(_0x52c563, _0x474555) {
    var _0x39e16d = _0x39e1();
    return _0x4526 = function (_0x4526cc, _0x434831) {
        _0x4526cc = _0x4526cc - 0x11c;
        var _0x26daa0 = _0x39e16d[_0x4526cc];
        return _0x26daa0;
    }, _0x4526(_0x52c563, _0x474555);
}
var params = new URLSearchParams(document['location'][_0xd55339(0x159)]);
sites = [], selectedsite = '\x20', sites[_0xd55339(0x1ef)](params[_0xd55339(0x1ec)](_0xd55339(0x1a7)));
var selectedsite = params[_0xd55339(0x1ec)](_0xd55339(0x1a7));
redisKeys = [];
var eodFinalStatus = '',
    connectionTries = 0x6,
    isWSConnected = ![],
    siteHtml = '\x20',
    eodSiteResponse, eodSitesData = [],
    eodResponse, colorClass = _0xd55339(0x1d1),
    firsteodtableid = '',
    totaleodlen = 0x0,
    operationsCompletedeod = 0x0,
    export_eodExcel = ![],
    checkeodbx = '',
    open_rows = !![],
    user_name = '',
    changed_key = '',
    isEdit_dict = {};
$(document)[_0xd55339(0x205)](function () {
    var _0x2230e5 = _0xd55339;
    if (pageName === 'Dashboard') $(_0x2230e5(0x18d))['css'](_0x2230e5(0x1c5), localStorage[_0x2230e5(0x15f)]('newlabeldisplay'));
    else localStorage['setItem'](_0x2230e5(0x22d), _0x2230e5(0x185));
    $(_0x2230e5(0x21c))[_0x2230e5(0x1aa)](), profilename(), geteodSiteList();
    var _0x4dddaa = $('.playpause');
    _0x4dddaa['click'](function () {
        var _0x1e36fe = _0x2230e5;
        _0x4dddaa[_0x1e36fe(0x131)](_0x1e36fe(0x1af));
        var _0x2d917e = $(_0x1e36fe(0x1ab));
        return _0x4dddaa[_0x1e36fe(0x1d7)](_0x1e36fe(0x1af)) ? (_0x2d917e[_0x1e36fe(0x128)](_0x1e36fe(0x183)), open_rows = ![], $(_0x1e36fe(0x1ae))[_0x1e36fe(0x1ad)](_0x1e36fe(0x1a8), _0x1e36fe(0x1bd))) : (refreshBODEOD(), _0x2d917e['text']('Live\x20Update'), open_rows = !![], $(_0x1e36fe(0x1ae))[_0x1e36fe(0x1ad)](_0x1e36fe(0x1a8), _0x1e36fe(0x1eb))), ![];
    });
});

function refreshBODEOD() {
    var _0x54d9d0 = _0xd55339;
    requestDataFromServer(_0x54d9d0(0x207), {
        'sitename': params[_0x54d9d0(0x1ec)](_0x54d9d0(0x1a7)),
        'mode': _0x54d9d0(0x216)
    }, 'GET')[_0x54d9d0(0x1bc)](function (_0x4069c8) {
        var _0x1aa094 = _0x54d9d0;
        if (typeof eoddisplaykeys === 'function') eoddisplaykeys(_0x4069c8['responseData'][0x0], _0x4069c8[_0x1aa094(0x132)]);
        if (typeof ledColors === _0x1aa094(0x1bb)) ledColors(selected_sitename, selected_leurl, selected_websocurl);
    });
}

function profilename() {
    var _0x2b76d9 = _0xd55339;
    requestDataFromServer(_0x2b76d9(0x1a2), {}, 'GET')[_0x2b76d9(0x1bc)](getprofilenameResponse);
}

function getprofilenameResponse(_0x5ad2de) {
    var _0x52944f = _0xd55339;
    res = JSON[_0x52944f(0x1d4)](_0x5ad2de), res[_0x52944f(0x1ed)] == 0xc8 ? (userobject = res[_0x52944f(0x195)], user_name = userobject[_0x52944f(0x1fa)]) : swal(_0x5ad2de['msg'], '\x20', _0x52944f(0x147));
}

function exporteodtable() {
    var _0x557fc0 = _0xd55339;
    export_eodExcel = !![], $('#' + firsteodtableid)[_0x557fc0(0x152)]('.buttons-excel')['click']();
};

function geteodHeaderNames(_0x211bcd) {
    var _0x1d04b7 = _0xd55339,
        _0x3949f5 = $(_0x211bcd)['find'](_0x1d04b7(0x217))[_0x1d04b7(0x151)]()[_0x1d04b7(0x1e8)]()[_0x1d04b7(0x162)]()[_0x1d04b7(0x1b6)](),
        _0x26aa69 = [];
    return _0x3949f5[_0x1d04b7(0x196)](function (_0x1a4c00) {
        var _0x4d5173 = _0x1d04b7;
        _0x26aa69[_0x4d5173(0x1ef)]($(_0x1a4c00)[_0x4d5173(0x19d)]());
    }), _0x26aa69;
}

function buildeodCols(_0x240a4d) {
    var _0x374ade = _0xd55339,
        _0x191771 = _0x374ade(0x17d);
    for (i = 0x0; i < _0x240a4d[_0x374ade(0x168)]; i++) {
        colNum = i + 0x1, _0x191771 += _0x374ade(0x171) + colNum + _0x374ade(0x1dc) + colNum + _0x374ade(0x145);
    }
    return _0x191771 += _0x374ade(0x191), _0x191771;
}

function buildeodRow(_0x27d9a8, _0x3049ee, _0x2ed3b7) {
    var _0x57ebb7 = _0xd55339,
        _0x39e997 = _0x2ed3b7 ? _0x57ebb7(0x139) + _0x2ed3b7 + '\x22' : '',
        _0x57fc38 = _0x57ebb7(0x19e) + _0x3049ee + '\x22>';
    for (i = 0x0; i < _0x27d9a8['length']; i++) {
        colNum = (i + 0xa)[_0x57ebb7(0x14e)](0x24)[_0x57ebb7(0x12c)]();
        var _0x37078d = colNum + _0x3049ee;
        _0x57fc38 += _0x57ebb7(0x218) + _0x37078d + '\x22' + _0x39e997 + '>' + _0x57ebb7(0x226) + '<t>' + _0x27d9a8[i] + _0x57ebb7(0x1cc) + '</is>' + _0x57ebb7(0x228);
    }
    return _0x57fc38 += _0x57ebb7(0x20b), _0x57fc38;
}

function geteodTableData(_0x4d3886, _0x25c785) {
    var _0xb745e4 = _0xd55339,
        _0x4ec836 = geteodHeaderNames(_0x4d3886),
        _0x4d3886 = $(_0x4d3886)[_0xb745e4(0x152)](_0xb745e4(0x217))['DataTable'](),
        _0x32088a = 0x1,
        _0x48f542 = '',
        _0x43a3f9 = '';
    return _0x43a3f9 += buildeodCols(_0x4ec836), _0x43a3f9 += _0xb745e4(0x19c), _0x25c785['length'] > 0x0 && (_0x43a3f9 += buildeodRow([_0x25c785], _0x32088a, 0x33), _0x32088a++, mergeCol = (_0x4ec836['length'] - 0x1 + 0xa)[_0xb745e4(0x14e)](0x24)[_0xb745e4(0x12c)](), _0x48f542 = _0xb745e4(0x225) + _0xb745e4(0x22b) + mergeCol + _0xb745e4(0x138) + '</mergeCells>'), _0x43a3f9 += buildeodRow(_0x4ec836, _0x32088a, 0x2), _0x32088a++, _0x4d3886['rows']()[_0xb745e4(0x198)](function (_0x541bb4, _0x5aa403, _0x16c462) {
        var _0x5055d8 = _0xb745e4,
            _0x30ab28 = this[_0x5055d8(0x1e6)]();
        _0x43a3f9 += buildeodRow(_0x30ab28, _0x32088a, ''), _0x32088a++;
    }), _0x43a3f9 += _0xb745e4(0x16d) + _0x48f542, _0x43a3f9;
}

function seteodSheetName(_0x1d9b06, _0x881861) {
    var _0x38604e = _0xd55339;
    if (_0x881861[_0x38604e(0x168)] > 0x0) {
        var _0x5eae60 = _0x1d9b06['xl']['workbook.xml'][_0x38604e(0x206)]('sheet')[0x0];
        _0x5eae60[_0x38604e(0x1c0)](_0x38604e(0x14b), _0x881861);
    }
}

function addeodSheet(_0x4d8ffd, _0x493b88, _0x172d77, _0x2a19b5, _0x47fdd7) {
    var _0x2a0199 = _0xd55339,
        _0x44cade = _0x4d8ffd[_0x2a0199(0x210)]['getElementsByTagName'](_0x2a0199(0x215))[0x1],
        _0x125834 = _0x44cade[_0x2a0199(0x163)](!![]);
    _0x125834[_0x2a0199(0x1c0)]('PartName', _0x2a0199(0x209) + _0x47fdd7 + '.xml'), _0x4d8ffd[_0x2a0199(0x210)][_0x2a0199(0x206)](_0x2a0199(0x20e))[0x0][_0x2a0199(0x213)](_0x125834);
    var _0x44cade = _0x4d8ffd['xl'][_0x2a0199(0x1db)][_0x2a0199(0x1c8)][_0x2a0199(0x206)](_0x2a0199(0x124))[0x0],
        _0x125834 = _0x44cade[_0x2a0199(0x163)](!![]);
    _0x125834[_0x2a0199(0x1c0)]('Id', _0x2a0199(0x1c4) + _0x47fdd7 + 0x1), _0x125834[_0x2a0199(0x1c0)](_0x2a0199(0x20a), _0x2a0199(0x17c) + _0x47fdd7 + _0x2a0199(0x229)), _0x4d8ffd['xl']['_rels'][_0x2a0199(0x1c8)]['getElementsByTagName'](_0x2a0199(0x178))[0x0][_0x2a0199(0x213)](_0x125834);
    var _0x44cade = _0x4d8ffd['xl'][_0x2a0199(0x18f)]['getElementsByTagName']('sheet')[0x0],
        _0x125834 = _0x44cade[_0x2a0199(0x163)](!![]);
    _0x125834[_0x2a0199(0x1c0)]('name', _0x2a19b5), _0x125834[_0x2a0199(0x1c0)]('sheetId', _0x47fdd7), _0x125834['setAttribute']('r:id', _0x2a0199(0x1c4) + _0x47fdd7 + 0x1), _0x4d8ffd['xl'][_0x2a0199(0x18f)][_0x2a0199(0x206)](_0x2a0199(0x146))[0x0][_0x2a0199(0x213)](_0x125834);
    var _0x2ac4d9 = _0x2a0199(0x15c) + _0x2a0199(0x194) + geteodTableData(_0x493b88, _0x172d77) + '</worksheet>';
    _0x4d8ffd['xl'][_0x2a0199(0x17a)][_0x2a0199(0x19f) + _0x47fdd7 + '.xml'] = $[_0x2a0199(0x1e5)](_0x2ac4d9);
}

function Exporteodmultiplesheets() {
    var _0x1b2dd2 = _0xd55339;
    const _0x54e1e2 = document[_0x1b2dd2(0x222)](_0x1b2dd2(0x1ba));
    if (_0x54e1e2 != null && _0x54e1e2 != undefined) {
        const _0x450f25 = Array[_0x1b2dd2(0x18a)](_0x54e1e2[_0x1b2dd2(0x1df)]);
        _0x450f25[_0x1b2dd2(0x1f7)](), _0x450f25[_0x1b2dd2(0x1f7)]();
        const _0xfdc87e = _0x450f25[_0x1b2dd2(0x17b)](_0x30422d => {
            return _0x30422d['id'];
        });
        firsteodtableid = _0xfdc87e[0x1][_0x1b2dd2(0x12e)](_0x1b2dd2(0x224))[0x1] + _0x1b2dd2(0x16f);
        var _0x3ddf20 = '';
        _0xfdc87e[0x1][_0x1b2dd2(0x15b)]('EOD-') ? _0x3ddf20 = _0xfdc87e[0x0][_0x1b2dd2(0x12e)]('EOD-')[0x1] : _0x3ddf20 = _0xfdc87e[0x0]['split'](_0x1b2dd2(0x220))[0x1];
        var _0x21bf3c = 0x0;
        $('#' + firsteodtableid)[_0x1b2dd2(0x152)]('#data')[_0x1b2dd2(0x151)]({
            'dom': 'Bfrtip',
            'pageLength': 0x64,
            'ordering': ![],
            'buttons': [{
                'extend': _0x1b2dd2(0x1e4),
                'title': 'EOD',
                'customize': function (_0x33b948) {
                    var _0x5f2d4d = _0x1b2dd2;
                    seteodSheetName(_0x33b948, _0x3ddf20);
                    for (let _0x363d60 = 0x3; _0x363d60 < _0xfdc87e[_0x5f2d4d(0x168)]; _0x363d60++) {
                        if (_0x363d60 > 0x2 && _0xfdc87e[_0x363d60][_0x5f2d4d(0x15b)](_0x5f2d4d(0x224))) {
                            var _0x26b200 = _0xfdc87e[_0x363d60]['split'](_0x5f2d4d(0x224))[0x1] + _0x5f2d4d(0x16f);
                            _0xfdc87e[_0x363d60][_0x5f2d4d(0x15b)](_0x5f2d4d(0x179)) ? tablename = _0xfdc87e[_0x363d60][_0x5f2d4d(0x12e)]('EOD-')[0x1] : tablename = _0xfdc87e[_0x363d60][_0x5f2d4d(0x12e)](_0x5f2d4d(0x220))[0x1], addeodSheet(_0x33b948, '#' + _0x26b200, tablename, tablename, (_0x363d60 - 0x1)[_0x5f2d4d(0x14e)]()), _0x21bf3c++;
                        }
                    }
                }
            }]
        }), totaleodlen = _0xfdc87e[_0x1b2dd2(0x168)];
        for (k = 0x3; k < _0xfdc87e[_0x1b2dd2(0x168)]; k++) {
            if (_0xfdc87e[k][_0x1b2dd2(0x15b)](_0x1b2dd2(0x224))) {
                var _0x473c7b = _0xfdc87e[k]['split'](_0x1b2dd2(0x224))[0x1] + _0x1b2dd2(0x16f);
                $('#' + _0x473c7b)[_0x1b2dd2(0x152)](_0x1b2dd2(0x217))[_0x1b2dd2(0x151)]({
                    'dom': 'Bfrtip',
                    'pageLength': 0x64,
                    'ordering': ![],
                    'buttons': [{
                        'extend': _0x1b2dd2(0x1e4),
                        'title': _0x1b2dd2(0x216)
                    }]
                }), operationsCompletedeod = k;
            }
        }
    }
}

function operationeod() {
    var _0x1fb5e2 = _0xd55339;
    ++operationsCompletedeod, operationsCompletedeod === totaleodlen && ($('#' + firsteodtableid)[_0x1fb5e2(0x152)](_0x1fb5e2(0x1f2))[_0x1fb5e2(0x21d)](), export_eodExcel = ![]);
}

function geteodSiteList() {
    var _0x47b308 = _0xd55339;
    showLoader(_0x47b308(0x120)), requestDataFromServer(_0x47b308(0x165), {
        'type': _0x47b308(0x1e7),
        'site': params[_0x47b308(0x1ec)](_0x47b308(0x1a7))
    }, _0x47b308(0x175))[_0x47b308(0x1bc)](function (_0x5713a6) {
        var _0x260c56 = _0x47b308;
        res = JSON[_0x260c56(0x1d4)](_0x5713a6);
        if (res[_0x260c56(0x1ed)] == 0xc8) eodSiteResponse = res[_0x260c56(0x1e6)], geteodkeys();
        else stopLoader(_0x260c56(0x120));
    });
}

function geteodkeys() {
    var _0x56353f = _0xd55339;
    requestDataFromServer(_0x56353f(0x207), {
        'sitename': params[_0x56353f(0x1ec)](_0x56353f(0x1a7)),
        'mode': _0x56353f(0x216)
    }, _0x56353f(0x175))[_0x56353f(0x1bc)](eodkeysResponse);
}

function eodkeysResponse(_0x5c7597) {
    var _0x5a85c4 = _0xd55339;
    const _0x3ef7a5 = Math[_0x5a85c4(0x1fc)]()[_0x5a85c4(0x14e)](0x24)[_0x5a85c4(0x12f)](0x2, 0x5);
    if (_0x5c7597 == undefined) return;
    eodResponse = _0x5c7597[_0x5a85c4(0x1ee)], stopLoader(_0x5a85c4(0x120));
    if (_0x5c7597[_0x5a85c4(0x1ee)][_0x5a85c4(0x168)] > 0x0) {
        _0x5c7597[_0x5a85c4(0x1ee)][_0x5a85c4(0x196)](function (_0x1ad2dc) {
            var _0xf17c35 = _0x5a85c4,
                _0x4c6537 = {};
            _0x4c6537['site'] = _0x1ad2dc[_0xf17c35(0x1a7)], _0x4c6537[_0xf17c35(0x20c)] = !![], _0x4c6537['isWSConnected'] = ![];
            var _0xa4348a = 0x0;
            if (_0x1ad2dc['site_data'][_0xf17c35(0x168)] > 0x0) {
                _0x1ad2dc['site_data'][_0xf17c35(0x196)](function (_0x31b07c) {
                    var _0x5aca5e = _0xf17c35,
                        _0x5e8497 = _0x31b07c[_0x5aca5e(0x14d)],
                        _0x428ac2 = _0x5e8497[_0x5aca5e(0x1e6)];
                    if (_0x5e8497[_0x5aca5e(0x167)] == 'matrix') $[_0x5aca5e(0x219)](_0x428ac2, function (_0x46fc23) {
                        var _0x3af86c = _0x428ac2[_0x46fc23];
                        $['each'](_0x3af86c, function (_0x39d5b2, _0x77ea84) {
                            var _0x11bd20 = _0x4526,
                                _0x1e2b43 = _0x3af86c[_0x39d5b2];
                            _0x1e2b43[_0x11bd20(0x20c)] == ![] && _0xa4348a++;
                        });
                    });
                    else
                        for (var _0x4b6ada = 0x0; _0x4b6ada < _0x428ac2['length']; _0x4b6ada++) {
                            _0x428ac2[_0x4b6ada][_0x5aca5e(0x20c)] == ![] && _0xa4348a++;
                        }
                });
                if (_0xa4348a != 0x0) {
                    _0x4c6537[_0xf17c35(0x20c)] = ![];
                    if (selectedsite == '\x20') selectedsite = _0x1ad2dc[_0xf17c35(0x1a7)];
                }
            } else {
                _0x4c6537['isSuccess'] = ![];
                if (selectedsite == '\x20') selectedsite = _0x1ad2dc[_0xf17c35(0x1a7)];
            }
            eodSitesData[_0xf17c35(0x1ef)](_0x4c6537);
            var _0x680dde = eodSiteResponse[0x0];
            connectEodWebSocket(_0x680dde[_0xf17c35(0x1f0)], _0x4c6537['site'], 0x0, _0x3ef7a5);
        });
        var _0x464134 = '',
            _0x583aaa = '';
        $(_0x5a85c4(0x16a))[_0x5a85c4(0x1b4)](), siteFailCount = 0x0, eodSitesData['forEach'](function (_0x4b3b2b) {
            var _0x20a4d8 = _0x5a85c4;
            _0x4b3b2b[_0x20a4d8(0x20c)] ? _0x464134 += '<div\x20class=\x22page-header\x22>\x20' + _0x4b3b2b['site'] + _0x20a4d8(0x1b9) : (siteFailCount++, _0x583aaa += _0x20a4d8(0x164) + _0x4b3b2b[_0x20a4d8(0x1a7)] + _0x20a4d8(0x22c));
        });
        if (siteFailCount != 0x0) eodFinalStatus = _0x5a85c4(0x161);
        else eodFinalStatus = 'Success';
        $(_0x5a85c4(0x17f))['html'](eodFinalStatus), eodFinalStatus == _0x5a85c4(0x161) ? $('#eodstatus')[_0x5a85c4(0x1ce)](_0x5a85c4(0x123))[_0x5a85c4(0x19a)](_0x5a85c4(0x1fb)) : $(_0x5a85c4(0x17f))[_0x5a85c4(0x1ce)](_0x5a85c4(0x1fb))[_0x5a85c4(0x19a)]('green'), $(_0x5a85c4(0x16a))[_0x5a85c4(0x13c)](_0x583aaa), $(_0x5a85c4(0x16a))[_0x5a85c4(0x13c)](_0x464134), $(_0x5a85c4(0x15a))['eq'](0x0)['addClass'](_0x5a85c4(0x180));
        if ($(_0x5a85c4(0x15a))['eq'](0x0)['data']()) selectedsite = $(_0x5a85c4(0x15a))['eq'](0x0)[_0x5a85c4(0x1e6)]()['id'];
        else {
            if (selectedsite && eodSitesData[_0x5a85c4(0x168)] > 0x0) selectedsite = eodSitesData[0x0]['site'];
        }
        var _0x501128 = eodResponse[0x0];
        eoddisplaykeys(_0x501128, selectedsite);
    } else $(_0x5a85c4(0x172))['css'](_0x5a85c4(0x1c5), _0x5a85c4(0x185)), $(_0x5a85c4(0x154))[_0x5a85c4(0x1ad)]('display', _0x5a85c4(0x137)), $(_0x5a85c4(0x1a5))[_0x5a85c4(0x128)](_0x5a85c4(0x16e)), $(_0x5a85c4(0x1b5))['css']('display', _0x5a85c4(0x185));
}

function openShowcommentModal(_0x269d2f, _0x4bc04f) {
    var _0x171b09 = _0xd55339;
    console[_0x171b09(0x1a1)](user_name + _0x171b09(0x192) + JSON[_0x171b09(0x19b)](_0x4bc04f)), changed_key = _0x4bc04f;
    var _0x544785 = '';
    _0x544785 += '<div\x20class=\x22row\x22>', _0x4bc04f = isEdit_dict[_0x4bc04f], _0x4bc04f = JSON[_0x171b09(0x1d4)](_0x4bc04f);
    for (var _0x4e7e53 = 0x0; _0x4e7e53 < _0x4bc04f[_0x171b09(0x168)]; _0x4e7e53++) {
        var _0x54b49c = _0x4bc04f[_0x4e7e53];
        _0x544785 += _0x171b09(0x129) + (_0x4e7e53 % 0x2 === 0x0 ? _0x171b09(0x223) : _0x171b09(0x1f9)) + '\x20mt-4\x20text-justify\x20float-left\x22>', _0x544785 += '<h4>' + _0x54b49c['username'] + _0x171b09(0x22a), _0x544785 += '<span>-' + _0x54b49c[_0x171b09(0x204)] + _0x171b09(0x1c1), _0x544785 += _0x171b09(0x166) + _0x54b49c[_0x171b09(0x223)] + _0x171b09(0x169), _0x544785 += '</div>';
    }
    _0x544785 += _0x171b09(0x1d9), $(_0x171b09(0x186))[_0x171b09(0x19d)](_0x544785);
}

function openAddcommentModal(_0x3b9bf6, _0x548b48) {
    var _0x121b1d = _0xd55339;
    changed_key = _0x548b48, $(_0x121b1d(0x13d))[_0x121b1d(0x19d)](_0x121b1d(0x11e) + changed_key + '</div>');
}

function addComment() {
    var _0x5280c7 = _0xd55339;
    data = {};
    var _0x4c2af0 = new Date();
    data[_0x5280c7(0x1fa)] = user_name, data[_0x5280c7(0x204)] = _0x4c2af0[_0x5280c7(0x1d0)]() + '/' + (_0x4c2af0[_0x5280c7(0x15e)]() + 0x1) + '/' + _0x4c2af0[_0x5280c7(0x1fe)]() + '\x20@\x20' + _0x4c2af0[_0x5280c7(0x13f)]() + ':' + _0x4c2af0[_0x5280c7(0x1a4)]() + ':' + _0x4c2af0['getSeconds'](), data[_0x5280c7(0x223)] = $(_0x5280c7(0x1cb))[_0x5280c7(0x174)](), requestDataFromServer(_0x5280c7(0x202), {
        'sitename': params['get'](_0x5280c7(0x1a7)),
        'existing_key': changed_key,
        'value': JSON[_0x5280c7(0x19b)](data)
    }, _0x5280c7(0x175))[_0x5280c7(0x1bc)](function (_0x420b52) {
        var _0x8399ed = _0x5280c7;
        _0x420b52[_0x8399ed(0x1ee)][_0x8399ed(0x1cd)] == 0xc8 ? swal({
            'title': 'Comment\x20Status',
            'text': _0x8399ed(0x1b3) + _0x420b52['responseData']['site_data'] + '\x22.',
            'type': _0x8399ed(0x148),
            'confirmButtonClass': _0x8399ed(0x125),
            'confirmButtonText': 'OK',
            'closeOnConfirm': !![],
            'closeOnCancel': !![]
        }, function (_0x58247e) {
            var _0x39cc68 = _0x8399ed;
            _0x58247e && ($('#syntax')[_0x39cc68(0x174)](''), requestDataFromServer('/bod-eodstatus/getbodeodkeys', {
                'sitename': params[_0x39cc68(0x1ec)](_0x39cc68(0x1a7)),
                'mode': 'EOD'
            }, _0x39cc68(0x175))[_0x39cc68(0x1bc)](function (_0x316f39) {
                var _0x5b3fe8 = _0x39cc68;
                if (typeof eoddisplaykeys === _0x5b3fe8(0x1bb)) eoddisplaykeys(_0x316f39[_0x5b3fe8(0x1ee)][0x0], _0x316f39[_0x5b3fe8(0x132)]);
                if (typeof ledColors === _0x5b3fe8(0x1bb)) ledColors(selected_sitename, selected_leurl, selected_websocurl);
            }));
        }) : swal(_0x420b52[_0x8399ed(0x1ee)][_0x8399ed(0x149)], '\x20', _0x8399ed(0x147)), $('#dialog-for-addcomment')[_0x8399ed(0x152)]('.dismiss-btn')[_0x8399ed(0x21d)]();
    });
}

function _0x39e1() {
    var _0x46a8dd = ['addClass', 'stringify', '<sheetData>', 'html', '<row\x20r=\x22', 'sheet', 'replaceAll', 'log', '/notificationsettings/getallservices', 'add', 'getMinutes', '#eod-status-nodata\x20#nodatamessage', 'keyName', 'site', 'border', 'value', 'hide', '#plps-text', '715339CsFtkO', 'css', '.playpause-div', 'paused', 'keys', 'key', '<table\x20id=\x22data\x22\x20style=\x22border:\x201px;\x20background-color:\x20##191818\x22>', 'Successfully\x20commented\x20on\x20\x22', 'empty', '#eod-status\x20#eod-status-expand', 'toArray', '#ff3d57', '<td\x20class=\x22col-10\x22>', '\x20&ensp;>&ensp;\x20<h3\x20class=\x22page-title\x22>\x20eod\x20Status\x20</h3></div>', 'mob-width', 'function', 'done', '2px\x20solid\x20#ff3d57', '<td\x20class=\x22\x22\x20style=\x22color:#808080\x22>', '#eod-status\x20#site-list\x20#', 'setAttribute', '</span><br>', 'orange-bg', '<td\x20style=\x22color:#0000cd\x20\x22>', 'rId', 'display', '6644936drPlah', 'eodLED', 'workbook.xml.rels', 'success', '</tbody>', '#syntax', '</t>', 'code', 'removeClass', 'hidden', 'getDate', 'white', '/eod-status/geteodkeys', 'blue', 'parse', '<tr\x20class=\x22collapse-tr\x20parent\x20row\x22\x20style=\x22background-color:#1f1f1f;visibility:hidden;height:0px\x22\x20id=\x22', '<tr><td\x20class=\x22details_td\x22>', 'hasClass', 'No\x20Keys', '</div>', '<td\x20class=\x22px-5\x20py-1\x20profile-td\x22><a\x20id=\x22', '_rels', '\x22\x20max=\x22', '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-showcomments\x22></i>', '<div\x20class=\x22row\x20card-body\x20py-lg-4\x20py-2\x20\x22>', 'children', '\x22\x20\x20>', '\x22\x20style=\x22border:\x201px;\x22>', '<tr\x20class=\x22', '<tr\x20class=\x22border-0\x20collapse-content\x20row\x22\x20id=\x22child-', 'excel', 'parseXML', 'data', 'clicksite', 'columns', '<td\x20style=\x22color:#ff3d57\x22>', '252jplkxO', '2px\x20solid\x20#16d39a', 'get', 'status', 'responseData', 'push', 'websocket_url', '\x22\x20style=\x22visibility:hidden;height:1px;display:block\x22\x20>', '.buttons-excel', 'style', '76YnMkUE', 'file-info', 'dialog-for-content', 'shift', '1956074koJUPY', 'darker', 'username', 'red', 'random', 'unshift', 'getFullYear', '<i\x20data-feather=\x22message-square\x22\x20onclick=\x22openShowcommentModal(this,\x27', '<td\x20class=\x22white-text\x20has-details\x20', '#dialog-for-content\x20#file_content', '/bod-eodstatus/updatekeys', 'id\x22\x20style=\x22color:#C0C0C0\x22>', 'commented_time', 'ready', 'getElementsByTagName', '/bod-eodstatus/getbodeodkeys', 'visibility', '/xl/worksheets/sheet', 'Target', '</row>', 'isSuccess', 'entries', 'Types', 'Success', '[Content_Types].xml', '_tooltip', '6385715VrEzlT', 'appendChild', '<td>', 'Override', 'EOD', '#data', '<c\x20t=\x22inlineStr\x22\x20r=\x22', 'each', '<td\x20style=\x22color:#16d39a\x22>', 'POST', '#eod-status\x20#table-view', 'click', 'replace', '<i\x20data-feather=\x22edit\x22\x20onclick=\x22openAddcommentModal(this,\x27', 'EOD_', '</h5>', 'getElementById', 'comment', 'child-', '<mergeCells\x20count=\x221\x22>', '<is>', '<tr\x20class=\x22\x22\x20id=\x22', '</c>', '.xml', '</h4>', '<mergeCell\x20ref=\x22A1:', '\x20&ensp;>&ensp;\x20<h3\x20class=\x22page-title\x22\x20>\x20eod\x20Status\x20</h3></div>', 'newlabeldisplay', '</div>\x20', '</table>', '<h5\x20class=\x22col-4\x22\x20style=\x22padding-right:0\x22>Add\x20comment\x20to\x20-\x20</h5><div\x20class=\x22col-8\x22style=\x22color:#e99123;padding-left:0;\x22>', '<h4\x20class=\x22card-titles\x20', 'eod-status', '\x22\x20style=\x22border:\x201px\x20solid\x20#303234;\x20white-space:nowrap;font-size:12px;\x22>', '</td>', 'green', 'Relationship', 'btn-success', 'remove', '</th>', 'text', '<div\x20class=\x22', '\x22\x20>', '_li\x20', 'toUpperCase', '</thead>', 'split', 'substring', '\x20<a\x20data-toggle=\x22collapse\x22\x20class=\x22accordion-toggle\x20row\x22\x20href=\x22#', 'toggleClass', 'refreshedsite', 'orange', '<div\x20class=\x22col-12\x22>', 'show', 'visible', 'block', '1\x22/>', '\x20s=\x22', '_li\x20a', '63545uNAdrc', 'append', '#dialog-for-addcomment\x20.modal-title', '<table>', 'getHours', '#file_content', '<div\x20id=\x22table-view\x22\x20class=\x22col-12\x22\x20style=\x22overflow-x:\x20auto;\x22>', '#dialog-for-content\x20#nodata', '</tr>', 'isWSConnected', '\x22\x20width=\x2220\x22\x20customWidth=\x221\x22/>', 'sheets', 'error', 'info', 'site_data', '\x20</a>', 'name', '<thead\x20class=\x22table-head\x22\x20style=\x22border:\x201px\x20solid\x20#303234;\x22>', 'key_data', 'toString', '46199370CBIXNy', 'classList', 'DataTable', 'find', '9EjIXxA', '#eod-status\x20#eod-status-nodata', '_li', 'EOD\x20UPDATE\x20PAUSED', 'file_content', '.switch_label', 'search', '#eod-status\x20#site-list\x20li\x20a', 'includes', '<?xml\x20version=\x221.0\x22\x20encoding=\x22UTF-8\x22\x20standalone=\x22yes\x22?>', '<th\x20>', 'getMonth', 'getItem', 'Redis\x20not\x20reachable.', 'Failure', 'header', 'cloneNode', '<div\x20class=\x22page-header\x22>\x20', '/lesites/getallsitenames', '<p\x20class=\x22tab-indent\x22>-', 'type', 'length', '</p>', '#eod-status\x20#site-list', 'some', 'tooltip', '</sheetData>', 'No\x20Data', '-data', '20067emPyUh', '<col\x20min=\x22', '#eod-status\x20#site-data', 'collapse', 'val', 'GET', 'EOD:EOD_UPDATED_DATA', '<tr\x20class=\x22collapse-tr\x20parent\x20row\x22\x20style=\x22background-color:#1f1f1f\x22\x20id=\x22', 'Relationships', 'EOD-', 'worksheets', 'map', 'worksheets/sheet', '<cols>', 'object', '#eodstatus', 'active', '<th\x20style=\x22border:\x201px\x20solid\x20#303234;\x22>', 'filter', 'Update\x20Paused', '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-addcomment\x22></i>', 'none', '#dialog-for-showcomments\x20.modal-body', '#16d39a', '</td\x20class=\x22details_td\x22>\x20<td>:</td><td\x20class=\x22details_td\x22>', '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22>', 'from', '<th></th>', '/eod-status/readfile', '#new-label', '</td></tr>', 'workbook.xml', 'checked', '</cols>', '\x20commented\x20on\x20', '\x20</td>', '<worksheet\x20xmlns=\x22http://schemas.openxmlformats.org/spreadsheetml/2006/main\x22\x20xmlns:r=\x22http://schemas.openxmlformats.org/officeDocument/2006/relationships\x22\x20xmlns:mc=\x22http://schemas.openxmlformats.org/markup-compatibility/2006\x22\x20xmlns:x14ac=\x22http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac\x22\x20mc:Ignorable=\x22x14ac\x22>', 'userobj', 'forEach', 'color', 'every', 'white-bg'];
    _0x39e1 = function () {
        return _0x46a8dd;
    };
    return _0x39e1();
}

function eoddisplaykeys(_0x2c10d8, _0x5c3205) {
    var _0x347a6d = _0xd55339;
    isEdit_dict = {};
    if (open_rows) {
        keyFailCount = 0x0, keyGreenCount = 0x0, keyBlueCount = 0x0, keyOrangeCount = 0x0, keyWhiteCount = 0x0;
        if (_0x2c10d8['site_data'][_0x347a6d(0x168)] > 0x0) {
            redisKeys = [], keyHtml = '';
            var _0x2f1bfa = '',
                _0x24cad0 = '',
                _0x2a2328 = '',
                _0x12f2a1 = '',
                _0x348dc3 = '';
            outkeyHtml = '', outkeyHtml += '<div\x20class=\x22row\x20py-2\x20site-keys\x22\x20id=\x22' + _0x2c10d8[_0x347a6d(0x1a7)] + '\x22>', outkeyHtml += _0x347a6d(0x134), outkeyHtml += '<table\x20class=\x22row\x22>', outkeyHtml += '<tbody\x20class=\x22col-12\x22\x20id=\x22mob-width\x22>';
            const _0x2c2c21 = {
                'key': _0x347a6d(0x176),
                'key_data': {
                    'overallStatus': !![],
                    'status': 0x0,
                    'type': 'table',
                    'data': [{
                        'segment': 'Eod\x20enable\x20with\x20live\x20updates',
                        'isSuccess': !![],
                        'status': 0x2
                    }]
                }
            };
            _0x2c10d8[_0x347a6d(0x149)][_0x347a6d(0x1fd)](_0x2c2c21);
            var _0x48873c = 0x1;
            _0x2c10d8[_0x347a6d(0x149)]['forEach'](function (_0x356c58) {
                var _0x2d4f61 = _0x347a6d,
                    _0x27ea45 = {},
                    _0x35adce = _0x356c58[_0x2d4f61(0x14d)],
                    _0x1aa842 = _0x35adce[_0x2d4f61(0x1e6)],
                    _0x1e617e = _0x35adce['edit'];
                failCount = 0x0, greenCount = 0x0, blueCount = 0x0, orangeCount = 0x0, whiteCount = 0x0, rowHtmlgreen = '', rowHtmlblue = '', rowHtmlred = '', rowHtmlorange = '', rowHtmlwhite = '', rowHtml = '';
                var _0x104435 = '',
                    _0x22f0d9 = '',
                    _0x2c1053 = '',
                    _0x390dea = '',
                    _0x5cbc3f = '',
                    _0x3fd57c = _0x356c58[_0x2d4f61(0x1b1)];
                _0x3fd57c = _0x3fd57c[_0x2d4f61(0x21e)](/[:.]/g, '_');
                if (_0x35adce['type'] == 'matrix') {
                    var _0x23abdf = '';
                    _0x104435 = '', _0x22f0d9 = '', _0x2c1053 = '', _0x390dea = '', _0x5cbc3f = '', $[_0x2d4f61(0x219)](_0x1aa842, function (_0x3bab96) {
                        var _0x803192 = _0x2d4f61;
                        isRowContainsRed = 0x0, isRowContainsGreen = 0x0, isRowContainsBlue = 0x0, isRowContainsOrange = 0x0, isRowContainsWhite = 0x0;
                        var _0x435ce3 = _0x3bab96 + _0x803192(0x211),
                            _0x53018b = '',
                            _0x2e982c = _0x1aa842[_0x3bab96],
                            _0x1a7647 = '';
                        $[_0x803192(0x219)](_0x2e982c, function (_0x521bce, _0x3e9004) {
                            var _0x480cd6 = _0x803192,
                                _0x592a03 = _0x2e982c[_0x521bce];
                            if (typeof _0x592a03 == _0x480cd6(0x17e)) {
                                if (_0x592a03[_0x480cd6(0x1ed)] == 0x0) _0x1a7647 = 'red-bg', failCount++, isRowContainsRed++;
                                else {
                                    if (_0x592a03[_0x480cd6(0x1ed)] == 0x1) _0x1a7647 = _0x480cd6(0x1c2), orangeCount++, isRowContainsOrange++;
                                    else {
                                        if (_0x592a03['status'] == 0x2) _0x1a7647 = 'green-bg', greenCount++, isRowContainsGreen++;
                                        else _0x592a03[_0x480cd6(0x1ed)] == 0x5 ? (_0x1a7647 = 'blue-bg', blueCount++, isRowContainsBlue++) : (_0x1a7647 = _0x480cd6(0x199), whiteCount++, isRowContainsWhite++);
                                    }
                                }
                                if (_0x592a03['hasOwnProperty'](_0x480cd6(0x16c))) {
                                    var _0x2ef8fa = _0x480cd6(0x13e),
                                        _0x25f25e = '';
                                    for (const [_0x5d42af, _0x3b0936] of Object[_0x480cd6(0x20d)](_0x592a03[_0x480cd6(0x16c)])) {
                                        _0x25f25e += _0x480cd6(0x1d6) + _0x5d42af + _0x480cd6(0x188) + _0x3b0936 + _0x480cd6(0x18e);
                                    }
                                    _0x2ef8fa += _0x25f25e, _0x2ef8fa += _0x480cd6(0x11d), _0x53018b += _0x480cd6(0x200) + _0x1a7647 + _0x480cd6(0x1e0) + _0x592a03[_0x480cd6(0x1a9)] + '<span\x20class=\x22details\x22>' + _0x2ef8fa + '</span></td>';
                                } else _0x53018b += '<td\x20class=\x22white-text\x20' + _0x1a7647 + '\x22>' + _0x592a03[_0x480cd6(0x1a9)] + '</td>';
                            } else _0x53018b += _0x480cd6(0x1be) + _0x592a03 + _0x480cd6(0x122);
                        });
                        if (isRowContainsRed) html = _0x803192(0x1e9) + _0x3bab96 + _0x803192(0x122), html = html + _0x53018b, _0x104435 += _0x803192(0x227) + _0x3bab96[_0x803192(0x1a0)]('/', '_') + _0x803192(0x203) + html + '</tr>';
                        else {
                            if (isRowContainsOrange) html = '<td\x20style=\x22color:#e99123\x22>' + _0x3bab96 + _0x803192(0x122), html = html + _0x53018b, _0x390dea += _0x803192(0x227) + _0x3bab96[_0x803192(0x1a0)]('/', '_') + 'id\x22\x20style=\x22color:#C0C0C0\x22>' + html + _0x803192(0x143);
                            else {
                                if (isRowContainsBlue) html = _0x803192(0x1c3) + _0x3bab96 + '</td>', html = html + _0x53018b, _0x2c1053 += _0x803192(0x227) + _0x3bab96[_0x803192(0x1a0)]('/', '_') + _0x803192(0x203) + html + '</tr>';
                                else isRowContainsGreen ? (html = _0x803192(0x21a) + _0x3bab96 + '</td>', html = html + _0x53018b, _0x22f0d9 += _0x803192(0x227) + _0x3bab96['replaceAll']('/', '_') + _0x803192(0x203) + html + _0x803192(0x143)) : (html = '<td\x20style=\x22color:#C0C0C0\x22>' + _0x3bab96 + _0x803192(0x122), html = html + _0x53018b, _0x5cbc3f += _0x803192(0x227) + _0x3bab96[_0x803192(0x1a0)]('/', '_') + 'id\x22\x20style=\x22color:#C0C0C0\x22>' + html + _0x803192(0x143));
                            }
                        }
                    }), rowHtml = _0x104435 + _0x390dea + _0x2c1053 + _0x22f0d9 + _0x5cbc3f;
                } else {
                    var _0x23abdf = '';
                    for (var _0x2f5d40 = 0x0; _0x2f5d40 < _0x1aa842[_0x2d4f61(0x168)]; _0x2f5d40++) {
                        var _0x579e1a = !![];
                        tempHtml = '', $[_0x2d4f61(0x219)](_0x1aa842[_0x2f5d40], function (_0x4f392d, _0x2f71ab) {
                            var _0x50798b = _0x2d4f61;
                            _0x4f392d == _0x50798b(0x20c) && _0x2f71ab == ![] && (_0x579e1a = ![]);
                            if (typeof _0x2f71ab == _0x50798b(0x17e)) _0x2f71ab = JSON['stringify'](_0x2f71ab);
                            if (_0x4f392d['includes']('file_path')) tempHtml += _0x50798b(0x1da) + _0x2f5d40 + '-' + _0x50798b(0x1f5) + '\x22\x20onclick=\x22onFileinfo(\x27' + _0x2f71ab + '\x27,' + _0x2f5d40 + ',\x27' + _0x356c58[_0x50798b(0x1b1)]['replace'](/[/:.]/g, '_') + '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-content\x22\x20class=\x22profile\x22>OUTPUT</a></td>';
                            else {
                                if (_0x4f392d != _0x50798b(0x20c)) tempHtml += _0x50798b(0x214) + _0x2f71ab + '</td>';
                            }
                        });
                        if (_0x1aa842[_0x2f5d40]['status'] == 0x0) rowColor = _0x2d4f61(0x1fb), failCount++, rowHtmlred += _0x2d4f61(0x1e2) + rowColor + _0x2d4f61(0x121) + tempHtml + _0x2d4f61(0x143);
                        else {
                            if (_0x1aa842[_0x2f5d40][_0x2d4f61(0x1ed)] == 0x1) rowColor = 'orange', orangeCount++, rowHtmlorange += _0x2d4f61(0x1e2) + rowColor + '\x22\x20style=\x22border:\x201px\x20solid\x20#303234;\x20white-space:nowrap;font-size:12px;\x22>' + tempHtml + _0x2d4f61(0x143);
                            else {
                                if (_0x1aa842[_0x2f5d40][_0x2d4f61(0x1ed)] == 0x2) rowColor = _0x2d4f61(0x123), greenCount++, rowHtmlgreen += _0x2d4f61(0x1e2) + rowColor + _0x2d4f61(0x121) + tempHtml + _0x2d4f61(0x143);
                                else _0x1aa842[_0x2f5d40][_0x2d4f61(0x1ed)] == 0x5 ? (rowColor = 'blue', blueCount++, rowHtmlblue += _0x2d4f61(0x1e2) + rowColor + _0x2d4f61(0x121) + tempHtml + '</tr>') : (rowColor = _0x2d4f61(0x1d1), whiteCount++, rowHtmlwhite += '<tr\x20class=\x22' + rowColor + _0x2d4f61(0x121) + tempHtml + _0x2d4f61(0x143));
                            }
                        }
                    }
                }
                var _0x3e1f7c = _0x356c58[_0x2d4f61(0x1b1)];
                _0x27ea45[_0x2d4f61(0x1a6)] = _0x3e1f7c, _0x27ea45[_0x2d4f61(0x1a7)] = _0x2c10d8[_0x2d4f61(0x1a7)], keyName = _0x3e1f7c[_0x2d4f61(0x12e)](':')[0x1][_0x2d4f61(0x21e)]('_', '-');
                _0x48873c ? (keyHtml += _0x2d4f61(0x1d5) + _0x356c58[_0x2d4f61(0x1b1)] + '\x22>', --_0x48873c) : keyHtml += _0x2d4f61(0x177) + _0x356c58['key'] + '\x22>';
                keyHtml += _0x2d4f61(0x1b8), keyHtml += _0x2d4f61(0x130) + _0x3fd57c[_0x2d4f61(0x1a0)]('/', '_') + _0x2d4f61(0x16f) + '\x22>';
                var _0x3c3b15 = _0x2d4f61(0x20f);
                if (_0x356c58['key_data']['hasOwnProperty']('status')) {
                    if (_0x356c58[_0x2d4f61(0x14d)][_0x2d4f61(0x1ed)] == 0x0) {
                        var _0x3c3b15 = _0x2d4f61(0x161),
                            _0x5945b2 = _0x2d4f61(0x1fb);
                        keyFailCount++, _0x27ea45[_0x2d4f61(0x20c)] = ![];
                    } else {
                        if (_0x356c58[_0x2d4f61(0x14d)][_0x2d4f61(0x1ed)] == 0x1) {
                            var _0x5945b2 = _0x2d4f61(0x133);
                            keyOrangeCount++, _0x27ea45[_0x2d4f61(0x20c)] = ![];
                        } else {
                            if (_0x356c58[_0x2d4f61(0x14d)]['status'] == 0x5) {
                                var _0x5945b2 = _0x2d4f61(0x1d3);
                                keyBlueCount++, _0x27ea45[_0x2d4f61(0x20c)] = ![];
                            } else {
                                if (_0x356c58[_0x2d4f61(0x14d)][_0x2d4f61(0x1ed)] == 0x2) {
                                    var _0x5945b2 = _0x2d4f61(0x123);
                                    keyGreenCount++, _0x27ea45[_0x2d4f61(0x20c)] = !![];
                                } else _0x27ea45[_0x2d4f61(0x20c)] = !![];
                            }
                        }
                    }
                } else var _0x5945b2 = 'white';
                redisKeys[_0x2d4f61(0x1ef)](_0x27ea45), keyHtml += _0x2d4f61(0x11f) + _0x5945b2 + '\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22>' + keyName + _0x2d4f61(0x22a);
                (_0x5945b2 == _0x2d4f61(0x1fb) || _0x5945b2 == 'orange' || _0x5945b2 == 'blue') && (_0x1e617e != undefined && (_0x1e617e[_0x2d4f61(0x168)] != 0x0 && (isEdit_dict[_0x3e1f7c] = JSON[_0x2d4f61(0x19b)](_0x1e617e), keyHtml += _0x2d4f61(0x1ff) + _0x3e1f7c + _0x2d4f61(0x1dd))), keyHtml += _0x2d4f61(0x21f) + _0x3e1f7c + _0x2d4f61(0x184));
                keyHtml += '<td>', keyHtml += _0x2d4f61(0x14a), keyHtml += _0x2d4f61(0x193), keyHtml += '</tr>';
                _0x356c58[_0x2d4f61(0x1b1)] == 'EOD:EOD_UPDATED_DATA' ? keyHtml += _0x2d4f61(0x1e3) + _0x356c58['key'][_0x2d4f61(0x21e)](/[/:.]/g, '_') + _0x2d4f61(0x1f1) : keyHtml += _0x2d4f61(0x1e3) + _0x356c58[_0x2d4f61(0x1b1)][_0x2d4f61(0x21e)](/[/:.]/g, '_') + _0x2d4f61(0x12a);
                keyHtml += '<td\x20colspan=\x2212\x22\x20class=\x22hiddenRow\x20border-0\x20p-0\x20col-12\x22>', keyHtml += '<div\x20class=\x22accordian-body\x20collapse\x20col-12\x20border-b\x22\x20id=\x22' + _0x3fd57c[_0x2d4f61(0x1a0)]('/', '_') + '-data' + _0x2d4f61(0x1e1), keyHtml += _0x2d4f61(0x1de), keyHtml += _0x2d4f61(0x134), keyHtml += '<h5\x20class=\x22size14\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22>Executed\x20On\x20:\x20' + _0x35adce['executedOn'] + _0x2d4f61(0x221), keyHtml += _0x2d4f61(0x1d9), keyHtml += _0x2d4f61(0x141), keyHtml += _0x2d4f61(0x1b2), keyHtml += _0x2d4f61(0x14c), keyHtml += '<tr\x20class=\x22text-uppercase\x22\x20style=\x22border:\x201px;\x20background-color:\x20#056aa1;\x20font-size:12px\x22>';
                var _0x35adce = _0x356c58[_0x2d4f61(0x14d)],
                    _0x1aa842 = _0x35adce[_0x2d4f61(0x1e6)];
                theadHtml = '';
                _0x35adce['type'] == 'matrix' ? (theadHtml += _0x2d4f61(0x18b), $[_0x2d4f61(0x219)](_0x1aa842[Object[_0x2d4f61(0x1b0)](_0x1aa842)[0x0]], function (_0x2742c0) {
                    var _0xae882f = _0x2d4f61;
                    theadHtml += _0xae882f(0x15d) + _0x2742c0 + _0xae882f(0x127);
                })) : $['each'](_0x1aa842[0x0], function (_0x1cedd0) {
                    var _0x28edd8 = _0x2d4f61;
                    if (_0x1cedd0 != _0x28edd8(0x20c)) theadHtml += _0x28edd8(0x181) + _0x1cedd0 + _0x28edd8(0x127);
                });
                keyHtml = keyHtml + theadHtml, keyHtml += _0x2d4f61(0x143), keyHtml += _0x2d4f61(0x12d), keyHtml += _0x2d4f61(0x189), keyHtml += rowHtml + rowHtmlred + rowHtmlorange + rowHtmlgreen + rowHtmlwhite, keyHtml += '</tbody>', keyHtml += '</table>', keyHtml += _0x2d4f61(0x1d9), keyHtml += '</div>', keyHtml += _0x2d4f61(0x11c), keyHtml += _0x2d4f61(0x122), keyHtml += _0x2d4f61(0x143);
                if (_0x5945b2 == _0x2d4f61(0x1fb)) _0x2f1bfa += keyHtml;
                else {
                    if (_0x5945b2 == 'orange') _0x24cad0 += keyHtml;
                    else {
                        if (_0x5945b2 == _0x2d4f61(0x123)) _0x12f2a1 += keyHtml;
                        else _0x5945b2 == 'blue' ? _0x2a2328 += keyHtml : _0x348dc3 += keyHtml;
                    }
                }
                keyHtml = '', rowHtmlgreen = '', rowHtmlorange = '', rowHtmlblue = '', rowHtmlwhite = '', rowHtmlred = '';
            }), outkeyHtml += _0x2f1bfa, outkeyHtml += _0x24cad0, outkeyHtml += _0x2a2328, outkeyHtml += _0x12f2a1, outkeyHtml += _0x348dc3, outkeyHtml += _0x347a6d(0x1ca), outkeyHtml += _0x347a6d(0x11d), outkeyHtml += _0x347a6d(0x1d9), outkeyHtml += '</div>', _0x5c3205 === selectedsite && ($(_0x347a6d(0x172))[_0x347a6d(0x1ad)](_0x347a6d(0x1c5), 'block'), $('#eod-status\x20#eod-status-nodata')[_0x347a6d(0x1ad)]('display', _0x347a6d(0x185)), $(_0x347a6d(0x1b5))[_0x347a6d(0x1ad)](_0x347a6d(0x1c5), _0x347a6d(0x137)), $('#eod-status\x20#site-data')[_0x347a6d(0x1b4)](), $(_0x347a6d(0x172))[_0x347a6d(0x13c)](outkeyHtml));
        } else keyFailCount++, $(_0x347a6d(0x172))[_0x347a6d(0x1ad)](_0x347a6d(0x1c5), _0x347a6d(0x185)), $(_0x347a6d(0x154))['css'](_0x347a6d(0x1c5), 'block'), $(_0x347a6d(0x1b5))[_0x347a6d(0x1ad)](_0x347a6d(0x1c5), _0x347a6d(0x185)), _0x2c10d8['code'] == 0xc8 ? $(_0x347a6d(0x1a5))['text'](_0x347a6d(0x1d8)) : $(_0x347a6d(0x1a5))['text'](_0x347a6d(0x160));
        feather[_0x347a6d(0x21e)](), Exporteodmultiplesheets();
        checkeodbx[_0x347a6d(0x190)] == !![] && checkeodbx[_0x347a6d(0x21d)]();
        if (document['getElementById']('eodLED')) {
            if (keyFailCount != 0x0) document[_0x347a6d(0x222)](_0x347a6d(0x1c7))[_0x347a6d(0x1f3)]['color'] = _0x347a6d(0x1b7);
            else {
                if (keyOrangeCount != 0x0) document[_0x347a6d(0x222)](_0x347a6d(0x1c7))[_0x347a6d(0x1f3)][_0x347a6d(0x197)] = '#e99123';
                else {
                    if (keyGreenCount != 0x0) document['getElementById'](_0x347a6d(0x1c7))[_0x347a6d(0x1f3)][_0x347a6d(0x197)] = _0x347a6d(0x187);
                    else document['getElementById'](_0x347a6d(0x1c7))['style'][_0x347a6d(0x197)] = 'white';
                }
            }
        }
    } else console[_0x347a6d(0x1a1)](_0x347a6d(0x156));
}

function eodchangestatus(_0x21b00b, _0x417448) {
    var _0x44429e = _0xd55339,
        _0x34bc51 = eodSitesData[0x0];
    _0x417448 == 0x0 ? (_0x34bc51[_0x44429e(0x20c)] = !![], $('#eod-status\x20#site-list\x20#' + _0x21b00b + '_li')['removeClass']('failure')[_0x44429e(0x19a)](_0x44429e(0x1c9)), $(_0x44429e(0x1bf) + _0x21b00b + _0x44429e(0x13a))[_0x44429e(0x1ce)]('red')[_0x44429e(0x19a)](_0x44429e(0x123))) : (_0x34bc51[_0x44429e(0x20c)] = ![], $(_0x44429e(0x1bf) + _0x21b00b + _0x44429e(0x155))[_0x44429e(0x1ce)]('success')['addClass']('failure'), $(_0x44429e(0x1bf) + _0x21b00b + _0x44429e(0x13a))['removeClass']('green')[_0x44429e(0x19a)](_0x44429e(0x1fb)));
    var _0x42bcf4 = eodSitesData[_0x44429e(0x16b)](_0x3bbacb => _0x3bbacb[_0x44429e(0x20c)] == ![]);
    _0x42bcf4 ? eodFinalStatus = _0x44429e(0x161) : eodFinalStatus = _0x44429e(0x20f), $(_0x44429e(0x17f))[_0x44429e(0x19d)](eodFinalStatus), document[_0x44429e(0x222)](_0x44429e(0x1c7)) != null && (eodFinalStatus == _0x44429e(0x161) ? document[_0x44429e(0x222)](_0x44429e(0x1c7))[_0x44429e(0x150)][_0x44429e(0x126)]('green') : document['getElementById'](_0x44429e(0x1c7))[_0x44429e(0x150)][_0x44429e(0x126)](_0x44429e(0x1fb)), eodFinalStatus == _0x44429e(0x161) ? document[_0x44429e(0x222)]('eodLED')['classList'][_0x44429e(0x1a3)](_0x44429e(0x1fb)) : document[_0x44429e(0x222)]('eodLED')[_0x44429e(0x150)]['add']('green'));
}

function clickOnAll(_0x4385e0) {
    var _0x3cc7bd = _0xd55339;
    checkeodbx = _0x4385e0;
    var _0x3f7348 = redisKeys[_0x3cc7bd(0x182)](_0x58f735 => _0x58f735['site'] === selectedsite);
    _0x4385e0[_0x3cc7bd(0x190)] == !![] ? ($(_0x3cc7bd(0x158))[_0x3cc7bd(0x128)](''), _0x3f7348[_0x3cc7bd(0x196)](function (_0x3d96b8) {
        var _0x38ec61 = _0x3cc7bd,
            _0x3dcfbe = _0x3d96b8[_0x38ec61(0x1a6)];
        _0x3dcfbe = _0x3dcfbe[_0x38ec61(0x21e)](/[/:.]/g, '_'), $('#' + selectedsite + '\x20#' + _0x3dcfbe + _0x38ec61(0x16f))[_0x38ec61(0x173)](_0x38ec61(0x135));
    })) : ($(_0x3cc7bd(0x158))[_0x3cc7bd(0x128)](''), _0x4385e0[_0x3cc7bd(0x190)] == ![], _0x3f7348[_0x3cc7bd(0x196)](function (_0x3c0f09) {
        var _0x122ef2 = _0x3cc7bd,
            _0x479622 = _0x3c0f09[_0x122ef2(0x1a6)];
        _0x479622 = _0x479622[_0x122ef2(0x21e)](/[/:.]/g, '_'), $('#' + selectedsite + '\x20#' + _0x479622 + '-data')['collapse']('hide');
    }));
}

function oneodSiteTabchange(_0x2357db) {
    var _0x5cf72a = _0xd55339;
    selectedsite = _0x2357db, $('#eod-status\x20#site-list\x20li\x20a.active')['removeClass']('active'), $(_0x5cf72a(0x1bf) + _0x2357db + _0x5cf72a(0x12b) + 'a')[_0x5cf72a(0x19a)](_0x5cf72a(0x180)), $('#site-data')['empty']();
    var _0x1bedf4 = eodSitesData[0x0];
    _0x1bedf4[_0x5cf72a(0x144)] == ![] && (_0x1bedf4 = eodSiteResponse[0x0], connectEodWebSocket(_0x1bedf4['websocket_url'], selectedsite, 0x0)), starteodLoader(), requestDataFromServer(_0x5cf72a(0x1d2), {
        'sitename': params[_0x5cf72a(0x1ec)]('site')
    }, _0x5cf72a(0x175))['done'](function (_0x12ddda) {
        var _0x532cdf = _0x5cf72a;
        selectedsite = _0x12ddda[_0x532cdf(0x132)], stopeodLoader(), eoddisplaykeys(_0x12ddda[_0x532cdf(0x1ee)][0x0], _0x12ddda[_0x532cdf(0x132)]);
    });
}

function onFileinfo(_0x2edf82, _0x404e21, _0x303b0d) {
    var _0x36b914 = _0xd55339;
    $(_0x36b914(0x140))[_0x36b914(0x1b4)](), showLoader('dialog-for-content'), requestDataFromServer(_0x36b914(0x18c), {
        'filepath': _0x2edf82,
        'csrfmiddlewaretoken': csfr_token
    }, _0x36b914(0x21b))[_0x36b914(0x1bc)](function (_0x56df3c) {
        var _0xd7a169 = _0x36b914;
        stopLoader(_0xd7a169(0x1f6)), $(_0xd7a169(0x140))['empty'](), _0x56df3c[_0xd7a169(0x1ed)] == 0xc8 ? ($('#dialog-for-content\x20#file_content')[_0xd7a169(0x1ad)](_0xd7a169(0x208), 'visible'), $('#dialog-for-content\x20#nodata')[_0xd7a169(0x1ad)](_0xd7a169(0x208), _0xd7a169(0x1cf)), $(_0xd7a169(0x140))[_0xd7a169(0x13c)](_0x56df3c[_0xd7a169(0x157)])) : ($(_0xd7a169(0x201))[_0xd7a169(0x1ad)](_0xd7a169(0x208), _0xd7a169(0x1cf)), $(_0xd7a169(0x142))['css'](_0xd7a169(0x208), _0xd7a169(0x136)), $('#dialog-for-content\x20#nodata\x20#nodatamessage')[_0xd7a169(0x128)](_0x56df3c['emsg']));
    });
}

function starteodLoader() {
    var _0x1e18d9 = _0xd55339;
    $(_0x1e18d9(0x1b5))[_0x1e18d9(0x1ad)]('display', _0x1e18d9(0x185)), $('#eod-status\x20#eod-status-nodata')[_0x1e18d9(0x1ad)]('display', 'none'), $(_0x1e18d9(0x172))[_0x1e18d9(0x1ad)](_0x1e18d9(0x1c5), _0x1e18d9(0x185)), showLoader(_0x1e18d9(0x120));
}

function stopeodLoader() {
    var _0x1deb4d = _0xd55339;
    $(_0x1deb4d(0x1b5))[_0x1deb4d(0x1ad)](_0x1deb4d(0x1c5), _0x1deb4d(0x137)), $(_0x1deb4d(0x154))['css'](_0x1deb4d(0x1c5), _0x1deb4d(0x137)), $(_0x1deb4d(0x172))[_0x1deb4d(0x1ad)](_0x1deb4d(0x1c5), _0x1deb4d(0x137)), stopLoader(_0x1deb4d(0x120));
}