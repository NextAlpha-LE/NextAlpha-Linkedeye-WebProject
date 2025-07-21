var _0x10991d = _0x10c8;
(function (_0x4958cc, _0x467bb4) {
    var _0x3e5f6d = _0x10c8,
        _0x2d177c = _0x4958cc();
    while (!![]) {
        try {
            var _0x3c9368 = parseInt(_0x3e5f6d(0x1cf)) / 0x1 * (parseInt(_0x3e5f6d(0x263)) / 0x2) + -parseInt(_0x3e5f6d(0x26e)) / 0x3 * (parseInt(_0x3e5f6d(0x20b)) / 0x4) + parseInt(_0x3e5f6d(0x1ff)) / 0x5 + parseInt(_0x3e5f6d(0x226)) / 0x6 + parseInt(_0x3e5f6d(0x25e)) / 0x7 + -parseInt(_0x3e5f6d(0x221)) / 0x8 + -parseInt(_0x3e5f6d(0x255)) / 0x9 * (parseInt(_0x3e5f6d(0x1d2)) / 0xa);
            if (_0x3c9368 === _0x467bb4) break;
            else _0x2d177c['push'](_0x2d177c['shift']());
        } catch (_0x2c131b) {
            _0x2d177c['push'](_0x2d177c['shift']());
        }
    }
}(_0x597a, 0xf33aa));
var allData = {},
    jsonObj = {},
    rowid = '1',
    permissions = {
        'VA': [_0x10991d(0x293)],
        'VSA': ['VA', 'EA'],
        'EA': [_0x10991d(0x290), _0x10991d(0x293)],
        'ESA': ['EA']
    },
    permisionOrder = [_0x10991d(0x293), 'VA', _0x10991d(0x290), 'EA', _0x10991d(0x1f8), 'DA'],
    selectedPermisions = [],
    roleList = [],
    permissionsOfGroup = [],
    isStoreApplication = ![],
    applicationList = [],
    userList, isEdit = ![],
    selectedRowid = 0x0,
    totalUsers = 0x0;
$(document)[_0x10991d(0x264)](function () {
    var _0x1a6725 = _0x10991d;
    $(_0x1a6725(0x1af))[_0x1a6725(0x22e)](), $(_0x1a6725(0x24e))[_0x1a6725(0x222)](function () {
        inputFocusIn($(this));
    }), $(_0x1a6725(0x24e))[_0x1a6725(0x1b7)](function (_0x499c73) {
        inputFocusOut($(this));
    }), $(_0x1a6725(0x21b))['focusout'](function (_0x1bffb5) {
        var _0x24ddd5 = _0x1a6725;
        isEmailValid = validateEmail(), isEmailValid == ![] ? ($(this)['parent']()[_0x24ddd5(0x1fe)](_0x24ddd5(0x1ac))['css'](_0x24ddd5(0x21d), _0x24ddd5(0x1b9)), $(this)['parent']()[_0x24ddd5(0x1fe)](_0x24ddd5(0x1a2))['text'](_0x24ddd5(0x21c))) : $(_0x24ddd5(0x265))[_0x24ddd5(0x1e6)]() != '' && $(this)[_0x24ddd5(0x20c)]()['find']('.error-msg')[_0x24ddd5(0x285)]('');
    }), $(_0x1a6725(0x1da))[_0x1a6725(0x1b7)](function (_0x4e6727) {
        var _0x4e5fe1 = _0x1a6725;
        ispasswordValid = validatePassword(), ispasswordValid == ![] ? ($(this)['parent']()[_0x4e5fe1(0x1fe)](_0x4e5fe1(0x1ac))[_0x4e5fe1(0x248)](_0x4e5fe1(0x21d), _0x4e5fe1(0x1b9)), $(this)[_0x4e5fe1(0x20c)]()[_0x4e5fe1(0x1fe)](_0x4e5fe1(0x1a2))[_0x4e5fe1(0x285)](_0x4e5fe1(0x1ea))) : $(_0x4e5fe1(0x24b))[_0x4e5fe1(0x1e6)]() != '' && $(this)[_0x4e5fe1(0x20c)]()[_0x4e5fe1(0x1fe)](_0x4e5fe1(0x1a2))[_0x4e5fe1(0x285)]('');
    }), getuserlist(), getallGroups(), getallPermissions(), getAllSite();
});

function getAllSite() {
    var _0x2233d6 = _0x10991d;
    requestDataFromServer(_0x2233d6(0x229), {
        'type': _0x2233d6(0x1c9)
    }, _0x2233d6(0x25b))['done'](function (_0x46e01b) {
        var _0x593779 = _0x2233d6;
        res = JSON[_0x593779(0x22b)](_0x46e01b);
        if (res[_0x593779(0x212)] == 0xc8) {
            var _0x4daf42 = '';
            $(_0x593779(0x208))[_0x593779(0x26d)](), $(_0x593779(0x237))[_0x593779(0x26d)](), res[_0x593779(0x210)][_0x593779(0x1dd)](function (_0x42ad45) {
                var _0x5eabe7 = _0x593779;
                _0x4daf42 += _0x5eabe7(0x1ba) + _0x42ad45['id'] + '\x22>' + _0x42ad45[_0x5eabe7(0x291)] + '</option>';
            }), $('#multi-select-site')[_0x593779(0x1e2)](_0x4daf42), $(_0x593779(0x237))['append'](_0x4daf42), registerMultiSelectSite();
        } else { }
    });
}

function _0x10c8(_0x30c13d, _0x39f1d3) {
    var _0x597ae3 = _0x597a();
    return _0x10c8 = function (_0x10c8ae, _0x501a2b) {
        _0x10c8ae = _0x10c8ae - 0x19b;
        var _0xd565da = _0x597ae3[_0x10c8ae];
        return _0xd565da;
    }, _0x10c8(_0x30c13d, _0x39f1d3);
}

function getuserlist() {
    var _0xc16d03 = _0x10991d;
    requestDataFromServer(_0xc16d03(0x269), {}, _0xc16d03(0x25b))[_0xc16d03(0x19d)](function (_0x2ce7f1) {
        var _0x16ca81 = _0xc16d03;
        $(_0x16ca81(0x1f0))[_0x16ca81(0x26d)](), res = JSON[_0x16ca81(0x22b)](_0x2ce7f1);
        if (res[_0x16ca81(0x212)] == 0xc8) {
            serviceHtml = '', $(_0x16ca81(0x1af))[_0x16ca81(0x1c0)](), $(_0x16ca81(0x23f))[_0x16ca81(0x22e)](), res[_0x16ca81(0x210)][_0x16ca81(0x1dd)](function (_0x5587ae) {
                totalUsers++, addUserRow(_0x5587ae);
            }), $('#totalUsers')[_0x16ca81(0x285)](totalUsers);
            let _0x218664 = {
                'valueNames': [_0x16ca81(0x23e), _0x16ca81(0x270), {
                    'name': _0x16ca81(0x241),
                    'attr': _0x16ca81(0x19c)
                }]
            };
            userList = new List('usertemplate', _0x218664);
        } else $(_0x16ca81(0x1af))[_0x16ca81(0x22e)](), $(_0x16ca81(0x23f))['show'](), $(_0x16ca81(0x19e))[_0x16ca81(0x26b)](_0x16ca81(0x1aa), ![]), $('#usertemplate-nodata\x20#nodatamessage')['text'](res['error_msg']);
    });
}

function onRecentlyAdd() {
    var _0x28931c = _0x10991d;
    userList['sort'](_0x28931c(0x241), {
        'order': _0x28931c(0x27f)
    });
}

function reloadUsers() {
    getuserlist();
}

function addUserRow(_0x2ccb34) {
    var _0x4f45da = _0x10991d;
    if (_0x2ccb34[_0x4f45da(0x1a0)]) var _0x108bfe = new Date(_0x2ccb34[_0x4f45da(0x1a0)] * 0x3e8)['toLocaleDateString'](_0x4f45da(0x209));
    else var _0x108bfe = new Date()[_0x4f45da(0x23d)]('en-US');
    serviceHtml = '\x20', serviceHtml += _0x4f45da(0x1e1) + _0x2ccb34['id'] + '>', serviceHtml += _0x4f45da(0x22a), serviceHtml += '<div\x20class=\x22profile\x22>', serviceHtml += '<img\x20src=\x22../static/app/images/profile.png\x22/>', serviceHtml += '</div>', serviceHtml += '</td>', serviceHtml += _0x4f45da(0x20d) + _0x2ccb34['id'] + _0x4f45da(0x256) + _0x2ccb34[_0x4f45da(0x23e)] + _0x4f45da(0x27b), serviceHtml += _0x4f45da(0x257) + _0x2ccb34[_0x4f45da(0x270)] + _0x4f45da(0x27b), serviceHtml += '<td\x20class=\x22date\x22\x20data-timestamp=\x22' + _0x2ccb34[_0x4f45da(0x1a0)] + _0x4f45da(0x25d) + _0x108bfe + _0x4f45da(0x27b), serviceHtml += '<td>', serviceHtml += _0x4f45da(0x1a9);
    if (_0x2ccb34[_0x4f45da(0x1c5)] == undefined) serviceHtml += _0x4f45da(0x22d) + _0x2ccb34['id'] + _0x4f45da(0x1bc) + _0x2ccb34['id'] + '\x27)\x22/>', serviceHtml += _0x4f45da(0x232), serviceHtml += '<span\x20class=\x22switch_label\x22\x20id=\x22switch_label_' + _0x2ccb34['id'] + _0x4f45da(0x203);
    else {
        html = '', html = _0x4f45da(0x22d) + _0x2ccb34['id'] + _0x4f45da(0x1bc) + _0x2ccb34['id'] + _0x4f45da(0x251);
        if (!_0x2ccb34['is_active']) html += _0x4f45da(0x206);
        if (_0x2ccb34[_0x4f45da(0x270)] == _0x4f45da(0x277)) html += _0x4f45da(0x1aa);
        serviceHtml += html + '/>', serviceHtml += _0x4f45da(0x232), _0x2ccb34['is_active'] ? serviceHtml += _0x4f45da(0x236) + _0x2ccb34['id'] + _0x4f45da(0x203) : serviceHtml += _0x4f45da(0x236) + _0x2ccb34['id'] + '\x22></span>';
    }
    serviceHtml += _0x4f45da(0x1bd), serviceHtml += _0x4f45da(0x28b), serviceHtml += _0x4f45da(0x1a7), serviceHtml += _0x4f45da(0x27b), serviceHtml += _0x4f45da(0x202), serviceHtml += _0x4f45da(0x259) + _0x2ccb34['id'] + '\x22\x20onclick=\x22userInfo(' + _0x2ccb34['id'] + _0x4f45da(0x1d6), serviceHtml += '<i\x20class=\x22icon-select\x22\x20style=\x22color:#6c757d\x22></i>', serviceHtml += _0x4f45da(0x1d7), serviceHtml += _0x4f45da(0x217), serviceHtml += _0x4f45da(0x258), serviceHtml += _0x4f45da(0x1d9), serviceHtml += _0x4f45da(0x1d7), serviceHtml += '<div\x20class=\x22dropdown-menu\x22\x20aria-labelledby=\x22moreoption\x22>', _0x2ccb34['email'] == _0x4f45da(0x277) ? display = _0x4f45da(0x288) : display = _0x4f45da(0x278), serviceHtml += _0x4f45da(0x1ca) + _0x2ccb34['id'] + ')\x22\x20style=\x22display:' + display + '\x22><i\x20class=\x22icon-delete\x22></i>Delete</a>', serviceHtml += _0x4f45da(0x246) + _0x2ccb34[_0x4f45da(0x23e)] + _0x4f45da(0x1ab) + _0x2ccb34['id'] + _0x4f45da(0x27a) + _0x2ccb34[_0x4f45da(0x1ce)] + _0x4f45da(0x1a6), serviceHtml += _0x4f45da(0x27e), serviceHtml += _0x4f45da(0x27e), serviceHtml += '</td>', serviceHtml += _0x4f45da(0x1b0), serviceHtml += _0x4f45da(0x292), serviceHtml += '<td\x20colspan=\x2212\x22\x20class=\x22hiddenRow\x20border-0\x22>', serviceHtml += _0x4f45da(0x289) + _0x2ccb34['id'] + '\x22>', serviceHtml += _0x4f45da(0x20e), serviceHtml += _0x4f45da(0x28c), serviceHtml += _0x4f45da(0x286), serviceHtml += '<div\x20class=\x22col-6\x20my-auto\x22>', serviceHtml += _0x4f45da(0x23c), serviceHtml += _0x4f45da(0x1fc) + _0x2ccb34['id'] + _0x4f45da(0x28f) + _0x2ccb34[_0x4f45da(0x1ce)] + _0x4f45da(0x228), serviceHtml += _0x4f45da(0x27e), serviceHtml += '<div\x20class=\x22col-6\x20my-auto\x22>', serviceHtml += '<p\x20class=\x22mb-1\x20size12\x20bold-text\x22>Added\x20on</p>', serviceHtml += _0x4f45da(0x239) + _0x2ccb34[_0x4f45da(0x1a0)] + '\x22>' + _0x108bfe + _0x4f45da(0x228), serviceHtml += _0x4f45da(0x27e), serviceHtml += _0x4f45da(0x27e), serviceHtml += _0x4f45da(0x27e), serviceHtml += _0x4f45da(0x1c2), serviceHtml += _0x4f45da(0x27e), serviceHtml += _0x4f45da(0x27e), serviceHtml += _0x4f45da(0x27e), serviceHtml += _0x4f45da(0x27b), serviceHtml += _0x4f45da(0x1ef), serviceHtml += '</tr>', siteHtml += _0x4f45da(0x1b0), $(_0x4f45da(0x1f0))[_0x4f45da(0x1e2)](serviceHtml);
}

function onUpdateUser(_0x29ecca) {
    var _0x2cb210 = _0x10991d;
    isEdit = !![], selectedRowid = _0x29ecca['id'], requestDataFromServer(_0x2cb210(0x229), {
        'userId': JSON[_0x2cb210(0x218)](selectedRowid),
        'csrfmiddlewaretoken': csfr_token
    }, type = _0x2cb210(0x216))[_0x2cb210(0x19d)](function (_0x1a08b0) {
        var _0x1c32ec = _0x2cb210,
            _0x3ee657 = [];
        res = JSON['parse'](_0x1a08b0), res[_0x1c32ec(0x212)] == 0xc8 && (_0x3ee657 = res[_0x1c32ec(0x210)], $('#edit-multi-select-site')['multipleSelect'](_0x1c32ec(0x1f2), _0x3ee657));
    }), id = _0x29ecca['id'] + _0x2cb210(0x254), $(_0x2cb210(0x234))[_0x2cb210(0x1e6)]($('#usertemplate\x20#' + id)[_0x2cb210(0x285)]()[_0x2cb210(0x1de)]()), id = _0x29ecca['id'] + _0x2cb210(0x274), $(_0x2cb210(0x21a))[_0x2cb210(0x1c7)](function (_0x31b216) {
        var _0x19be2f = _0x2cb210;
        $(this)['parent']()[_0x19be2f(0x1fe)](_0x19be2f(0x1ac))[_0x19be2f(0x248)](_0x19be2f(0x21d), _0x19be2f(0x1d1)), $(this)[_0x19be2f(0x20c)]()[_0x19be2f(0x1fe)](_0x19be2f(0x1a2))['text']('\x20');
    }), $(_0x2cb210(0x233))['text']('\x20'), onRoleSelect($(_0x2cb210(0x1b2) + id)[_0x2cb210(0x285)]()[_0x2cb210(0x1de)]()), $('#edit')[_0x2cb210(0x248)](_0x2cb210(0x1ee), 'block'), $(_0x2cb210(0x1f6))['css'](_0x2cb210(0x1ee), _0x2cb210(0x288));
}

function userInfo(_0x35e518) {
    var _0x541332 = _0x10991d;
    console[_0x541332(0x24c)](_0x541332(0x26c) + _0x35e518);
    if ($(_0x541332(0x24d) + _0x35e518 + _0x541332(0x24a))[_0x541332(0x1a3)]() == '') {
        var _0x5d3973 = 0x0;
        requestDataFromServer(_0x541332(0x227), {
            'assigned_to_id': _0x35e518
        }, _0x541332(0x25b))['done'](function (_0x4c3d50) {
            var _0x1f4f07 = _0x541332;
            if (_0x4c3d50[_0x1f4f07(0x212)] == 0xc8) {
                if (_0x4c3d50['totalTickets'] != _0x1f4f07(0x1ec)) _0x5d3973 = _0x4c3d50[_0x1f4f07(0x260)];
                $(_0x1f4f07(0x24d) + _0x35e518 + _0x1f4f07(0x24a))[_0x1f4f07(0x26d)](), serviceHtml = '\x20', serviceHtml += _0x1f4f07(0x1d0) + _0x5d3973 + _0x1f4f07(0x220), _0x4c3d50[_0x1f4f07(0x1d8)][_0x1f4f07(0x244)] && (serviceHtml += _0x1f4f07(0x1eb), html = '\x20', _0x4c3d50[_0x1f4f07(0x1d8)][_0x1f4f07(0x1dd)](function (_0x559db3) {
                    var _0x1691c9 = _0x1f4f07;
                    percenatge = Math['floor'](Number(_0x559db3[_0x1691c9(0x1f7)]) / Number(_0x5d3973) * 0x64), _0x559db3['name'] == _0x1691c9(0x1d4) ? status = _0x1691c9(0x23a) : status = _0x559db3['name'], html += _0x1691c9(0x281) + status + _0x1691c9(0x1d5) + percenatge + '%;height:100%\x22\x20data-toggle=\x22tooltip\x22\x20title=\x22' + _0x559db3[_0x1691c9(0x207)] + '(' + percenatge + _0x1691c9(0x1cc);
                }), serviceHtml += html, serviceHtml += _0x1f4f07(0x27e));
            } else serviceHtml = '\x20', serviceHtml += _0x1f4f07(0x1d0) + _0x5d3973 + _0x1f4f07(0x220);
            $(_0x1f4f07(0x24d) + _0x35e518 + _0x1f4f07(0x24a))['append'](serviceHtml);
        });
    }
}

function clickOnaddrole() {
    var _0x190008 = _0x10991d;
    document[_0x190008(0x25a)](_0x190008(0x27d))['value'] = '', $(_0x190008(0x1cb))['text']('\x20'), $(_0x190008(0x1c4))[_0x190008(0x1c7)](function (_0x4beb7b) {
        var _0x47bc83 = _0x190008;
        id = $(this)[_0x47bc83(0x1e8)]('id'), document[_0x47bc83(0x25a)](id)[_0x47bc83(0x1fb)] = '', $(this)['parent']()[_0x47bc83(0x1fe)]('.error-msg')[_0x47bc83(0x285)]('\x20');
    }), permisionOrder[_0x190008(0x1dd)](function (_0x61a02e) {
        var _0x29e9c8 = _0x190008;
        document[_0x29e9c8(0x25a)](_0x61a02e) != null && document[_0x29e9c8(0x25a)](_0x61a02e)[_0x29e9c8(0x206)] && (document[_0x29e9c8(0x25a)](_0x61a02e)[_0x29e9c8(0x206)] = ![]);
    });
}

function getallGroups() {
    var _0xf46ee3 = _0x10991d;
    requestDataFromServer(_0xf46ee3(0x1f4), {}, _0xf46ee3(0x25b))['done'](function (_0x10deab) {
        var _0x255c1d = _0xf46ee3;
        res = JSON[_0x255c1d(0x22b)](_0x10deab), $(_0x255c1d(0x19b))[_0x255c1d(0x26d)](), $('#edit_rolelist')['empty'](), roleList = [];
        if (res[_0x255c1d(0x212)] == 0xc8) {
            var _0x16368f = '';
            res[_0x255c1d(0x210)][_0x255c1d(0x1dd)](function (_0x2c6279) {
                var _0x19ead6 = _0x255c1d;
                if (_0x2c6279[_0x19ead6(0x207)] != _0x19ead6(0x1e9)) _0x16368f += _0x19ead6(0x261) + _0x2c6279[_0x19ead6(0x207)] + _0x19ead6(0x276) + _0x2c6279[_0x19ead6(0x207)] + '</a>';
            }), $(_0x255c1d(0x19b))[_0x255c1d(0x1e2)](_0x16368f), $(_0x255c1d(0x224))[_0x255c1d(0x1e2)](_0x16368f), roleList = res[_0x255c1d(0x210)];
        } else swal(res[_0x255c1d(0x1f3)], '\x20', _0x255c1d(0x235));
    });
}

function getallPermissions() {
    var _0x3a47b8 = _0x10991d;
    requestDataFromServer(_0x3a47b8(0x1ed), {}, _0x3a47b8(0x25b))[_0x3a47b8(0x19d)](handlePermissionsResponse);
}

function getGroupPermissions(_0x392c94) {
    var _0x453d42 = _0x10991d,
        _0x53e36e = [],
        _0x33b254 = parseInt(_0x392c94, 0xa)[_0x453d42(0x28e)](0x2);
    while (_0x33b254['length'] < permisionOrder[_0x453d42(0x244)]) {
        _0x33b254 = '0' + _0x33b254;
    }
    for (let _0x31214d = permisionOrder[_0x453d42(0x244)] - 0x1; _0x31214d >= 0x0; _0x31214d--) {
        _0x33b254[_0x31214d] == 0x1 && _0x53e36e[_0x453d42(0x1e5)](permisionOrder[_0x31214d]);
    }
    return _0x53e36e;
}

function onRoleSelect(_0x482afc) {
    var _0x4b3dd3 = _0x10991d;
    isEdit == ![] ? (document[_0x4b3dd3(0x25a)](_0x4b3dd3(0x1ce))['textContent'] = _0x482afc, id = _0x4b3dd3(0x25f), applicationdivid = _0x4b3dd3(0x284), $(_0x4b3dd3(0x23b))['text']('')) : (document['getElementById']('edit_role')[_0x4b3dd3(0x25c)] = _0x482afc, id = 'edit-multi-select-application', applicationdivid = _0x4b3dd3(0x240), $(_0x4b3dd3(0x233))[_0x4b3dd3(0x285)](''));
    permissionsOfGroup = [];
    var _0x38aeb5 = roleList[_0x4b3dd3(0x287)](_0x18fd13 => _0x18fd13[_0x4b3dd3(0x207)] == _0x482afc)[0x0]['weightage'];
    permissionsOfGroup = getGroupPermissions(_0x38aeb5), permissionsOfGroup[_0x4b3dd3(0x1c8)](_0x4b3dd3(0x290)) > -0x1 || permissionsOfGroup[_0x4b3dd3(0x1c8)](_0x4b3dd3(0x293)) > -0x1 ? (document['getElementById'](applicationdivid)[_0x4b3dd3(0x1df)][_0x4b3dd3(0x1ee)] = _0x4b3dd3(0x278), $('#' + id)[_0x4b3dd3(0x275)](_0x4b3dd3(0x266)), $('#multi-select-application-error-msg')[_0x4b3dd3(0x285)]('\x20')) : document[_0x4b3dd3(0x25a)](applicationdivid)[_0x4b3dd3(0x1df)]['display'] = _0x4b3dd3(0x288);
}

function handlePermissionsResponse(_0x36a099) {
    var _0x464cfd = _0x10991d;
    res = JSON[_0x464cfd(0x22b)](_0x36a099);
    if (res[_0x464cfd(0x212)] == 0xc8) {
        var _0x200cab = '';
        res[_0x464cfd(0x210)][_0x464cfd(0x1dd)](function (_0xe928db) {
            var _0x409ca6 = _0x464cfd;
            _0x200cab += _0x409ca6(0x22f) + _0xe928db[_0x409ca6(0x200)] + '\x22>' + _0xe928db['name'], _0x200cab += '<input\x20type=\x22checkbox\x22\x20id=\x22' + _0xe928db[_0x409ca6(0x200)] + '\x22\x20onchange=\x22clickedOnPermission(this)\x22/>', _0x200cab += '<span\x20class=\x22checkmark\x22></span>', _0x200cab += _0x409ca6(0x1a7);
        }), $(_0x464cfd(0x214))['append'](_0x200cab), getApplicationNamesforUser();
    } else swal(_0x464cfd(0x279), '\x20', _0x464cfd(0x235));
}

function openAddrolesDialog() {
    var _0x54f2b6 = _0x10991d;
    document[_0x54f2b6(0x25a)](_0x54f2b6(0x27d))[_0x54f2b6(0x1fb)] = '', selectedPermisions = [], $('input:checkbox[name=type]')[_0x54f2b6(0x1c7)](function () {
        var _0x154534 = _0x54f2b6;
        document[_0x154534(0x25a)]($(this)[_0x154534(0x1e8)]('id'))[_0x154534(0x206)] = ![], document[_0x154534(0x25a)]($(this)['attr']('id'))['disabled'] = ![];
    });
}

function clickedOnPermission(_0x38de56) {
    var _0x4ac18b = _0x10991d;
    id = $(_0x38de56)[_0x4ac18b(0x1e8)]('id'), temp = permissions[id];
    if (_0x38de56['checked']) {
        if (selectedPermisions[_0x4ac18b(0x1c8)](id) == -0x1) selectedPermisions[_0x4ac18b(0x1e5)](id);
        temp[_0x4ac18b(0x1dd)](function (_0x394545) {
            var _0xd6536 = _0x4ac18b,
                _0x458ead = document['getElementById'](_0x394545);
            _0x458ead[_0xd6536(0x1aa)] = !![];
            if (_0x458ead['checked']) _0x458ead[_0xd6536(0x206)] = ![];
        });
    } else selectedPermisions['splice'](selectedPermisions['indexOf'](id), 0x1), temp['forEach'](function (_0x4797cf) {
        var _0x13e195 = _0x4ac18b,
            _0x52b87e = document[_0x13e195(0x25a)](_0x4797cf);
        _0x52b87e['disabled'] = ![];
    });
}

function clickedOnApplication(_0x439a43) {
    var _0x50a549 = _0x10991d;
    id = $(_0x439a43)[_0x50a549(0x1e8)]('id');
    var _0x5c3b73 = applicationList[_0x50a549(0x287)](_0x87c802 => _0x87c802['id'] == id);
    _0x439a43['checked'] ? _0x5c3b73[0x0][_0x50a549(0x230)] = parseInt('11', 0x2)[_0x50a549(0x28e)](0xa) : _0x5c3b73[0x0]['weightage'] = parseInt('10', 0x2)[_0x50a549(0x28e)](0xa);
}

function saveEditapplications() {
    var _0x41695b = _0x10991d;
    jsonObj[_0x41695b(0x210)]['isStoreApplication'] = !![], jsonObj[_0x41695b(0x210)]['applications'] = applicationList, $(_0x41695b(0x22c))[_0x41695b(0x1e8)](_0x41695b(0x28d), _0x41695b(0x1db)), $(_0x41695b(0x205))[_0x41695b(0x1e8)](_0x41695b(0x28d), _0x41695b(0x1db)), requestDataFromServer(_0x41695b(0x219), {
        'alldata': JSON[_0x41695b(0x218)](jsonObj),
        'csrfmiddlewaretoken': csfr_token
    }, _0x41695b(0x272))[_0x41695b(0x19d)](useronboardResponse);
}

function addRole() {
    var _0x14598c = _0x10991d,
        _0x58a6aa = '';
    for (let _0x1af261 = permisionOrder['length'] - 0x1; _0x1af261 >= 0x0; _0x1af261--) {
        if (selectedPermisions[_0x14598c(0x1c8)](permisionOrder[_0x1af261]) != -0x1) _0x58a6aa = '1' + _0x58a6aa;
        else _0x58a6aa = '0' + _0x58a6aa;
    }
    jsonObj = {}, data = {}, $(_0x14598c(0x1a8))[_0x14598c(0x1e6)]() != '' ? ($('#addrole')[_0x14598c(0x1e8)]('data-dismiss', _0x14598c(0x1db)), data['rolename'] = $(_0x14598c(0x273))[_0x14598c(0x1e6)](), data['weightage'] = parseInt(_0x58a6aa, 0x2)['toString'](0xa), jsonObj[_0x14598c(0x210)] = data, requestDataFromServer(_0x14598c(0x249), {
        'alldata': JSON['stringify'](jsonObj),
        'csrfmiddlewaretoken': csfr_token
    }, _0x14598c(0x272))['done'](addRoleResponse)) : ($(_0x14598c(0x280))[_0x14598c(0x248)](_0x14598c(0x21d), _0x14598c(0x1b9)), $(_0x14598c(0x1cb))[_0x14598c(0x285)]('Field\x20cannot\x20be\x20empty'));
}

function addRoleResponse(_0x348a59) {
    var _0x170b8b = _0x10991d;
    res = JSON[_0x170b8b(0x22b)](_0x348a59);
    if (res[_0x170b8b(0x212)] == 0x190) swal(res[_0x170b8b(0x1f3)], '\x20', _0x170b8b(0x235));
    else {
        if (roleList[_0x170b8b(0x1c8)]('res.data.rolename') == -0x1) {
            var _0x6814b5 = {};
            _0x6814b5[_0x170b8b(0x207)] = res['data'][_0x170b8b(0x27d)], _0x6814b5[_0x170b8b(0x230)] = res[_0x170b8b(0x210)][_0x170b8b(0x230)], roleList['push'](_0x6814b5);
        }
        var _0xc06089 = '';
        _0xc06089 += _0x170b8b(0x261) + res[_0x170b8b(0x210)]['rolename'] + _0x170b8b(0x276) + res['data'][_0x170b8b(0x27d)] + _0x170b8b(0x283), $(_0x170b8b(0x19b))[_0x170b8b(0x1e2)](_0xc06089), $('#edit_rolelist')[_0x170b8b(0x1e2)](_0xc06089), swal(_0x170b8b(0x294), '\x20', 'success');
    }
}

function getApplicationNamesforUser() {
    var _0x1b08e0 = _0x10991d;
    requestDataFromServer(_0x1b08e0(0x1d3), {}, _0x1b08e0(0x25b))[_0x1b08e0(0x19d)](applicationNames);
}

function applicationNames(_0x19c35a) {
    var _0x1269bb = _0x10991d;
    res = JSON[_0x1269bb(0x22b)](_0x19c35a);
    if (res[_0x1269bb(0x212)] == 0xc8) {
        var _0xadd2a0 = '';
        $('#multi-select-application')['empty'](), $(_0x1269bb(0x1e7))[_0x1269bb(0x26d)](), res['data']['forEach'](function (_0x4459b4) {
            var _0x37200d = _0x1269bb;
            _0xadd2a0 += _0x37200d(0x1ba) + _0x4459b4['id'] + '-' + _0x4459b4[_0x37200d(0x253)] + '\x22>' + _0x4459b4[_0x37200d(0x253)] + '</option>';
        }), $(_0x1269bb(0x20a))[_0x1269bb(0x1e2)](_0xadd2a0), $(_0x1269bb(0x1e7))[_0x1269bb(0x1e2)](_0xadd2a0), registerMultiSelect();
    } else swal(_0x1269bb(0x213), '\x20', 'error');
}

function registerMultiSelect() {
    var _0x59cc35 = _0x10991d;
    $('#multi-select-application')[_0x59cc35(0x275)]({
        'placeholder': 'Select\x20Application',
        'showClear': !![],
        'selectAll': ![]
    }), $(_0x59cc35(0x1e7))[_0x59cc35(0x275)]({
        'placeholder': 'Select\x20Application',
        'showClear': !![],
        'selectAll': ![]
    });
}

function registerMultiSelectSite() {
    var _0x57bedf = _0x10991d;
    $(_0x57bedf(0x208))[_0x57bedf(0x275)]({
        'placeholder': _0x57bedf(0x1b8),
        'showClear': !![],
        'selectAll': !![]
    }), $('#edit-multi-select-site')[_0x57bedf(0x275)]({
        'placeholder': 'Select\x20Site',
        'showClear': !![],
        'selectAll': !![]
    });
}

function validateEmail() {
    var _0x4b89ca = _0x10991d;
    isEmailValid = !![];
    var _0xbb80cd = new RegExp(_0x4b89ca(0x238));
    return email = $(_0x4b89ca(0x265))[_0x4b89ca(0x1e6)]()[_0x4b89ca(0x1de)](), email != '' && !_0xbb80cd[_0x4b89ca(0x223)](email) ? isEmailValid = ![] : isEmailValid = !![], isEmailValid;
}

function validatePassword() {
    var _0x1cda72 = _0x10991d;
    ispasswordValid = !![];
    var _0x211ffe = new RegExp(_0x1cda72(0x1f5));
    return $(_0x1cda72(0x24b))[_0x1cda72(0x1e6)]() != '' && !_0x211ffe[_0x1cda72(0x223)]($('#password')[_0x1cda72(0x1e6)]()) ? ispasswordValid = ![] : ispasswordValid = !![], ispasswordValid;
}

function submitdata() {
    var _0x318347 = _0x10991d;
    if (isEdit == ![]) var _0x47d16d = inputValidation(_0x318347(0x268));
    if (_0x47d16d || isEdit == !![]) {
        isEmailValid = validateEmail(), ispasswordValid = validatePassword();
        if ((isEmailValid == ![] || ispasswordValid == ![]) && isEdit == ![]) isEmailValid == ![] && ($('#email_label')[_0x318347(0x248)](_0x318347(0x21d), _0x318347(0x1b9)), $('#email-error-msg')[_0x318347(0x285)](_0x318347(0x21c))), ispasswordValid == ![] && ($(_0x318347(0x231))[_0x318347(0x248)]('color', _0x318347(0x1b9)), $(_0x318347(0x1c1))['text'](_0x318347(0x1ea)));
        else {
            if (permissionsOfGroup[_0x318347(0x1c8)]('ESA') > -0x1 || permissionsOfGroup['indexOf'](_0x318347(0x293)) > -0x1) {
                applicationList = [], isEdit == ![] ? id = _0x318347(0x25f) : id = 'edit-multi-select-application';
                var _0x1db4f4 = $('#' + id)[_0x318347(0x275)](_0x318347(0x1bb));
                _0x1db4f4['forEach'](function (_0x88abb5) {
                    var _0x4fc6ee = _0x318347;
                    tempObj = _0x88abb5[_0x4fc6ee(0x215)]('-'), application = {}, application['id'] = tempObj[0x0], application[_0x4fc6ee(0x253)] = tempObj[0x1], application['weightage'] = parseInt('10', 0x2)[_0x4fc6ee(0x28e)](0xa), applicationList[_0x4fc6ee(0x1e5)](application);
                });
                if (permissionsOfGroup[_0x318347(0x1c8)](_0x318347(0x290)) > -0x1) {
                    if (applicationList[_0x318347(0x244)] > 0x0) {
                        var _0x2714c3 = '';
                        isEdit == ![] ? ($(_0x318347(0x1b1))[_0x318347(0x248)](_0x318347(0x1ee), _0x318347(0x288)), $(_0x318347(0x1be))[_0x318347(0x248)](_0x318347(0x1ee), 'block'), applicationdivid = 'applications') : ($(_0x318347(0x1ad))['css'](_0x318347(0x1ee), _0x318347(0x288)), $(_0x318347(0x1f6))[_0x318347(0x248)]('display', _0x318347(0x278)), applicationdivid = _0x318347(0x1e3)), isEdit == ![] ? $('#applications')[_0x318347(0x26d)]() : $(_0x318347(0x1a4))[_0x318347(0x26d)](), applicationList['forEach'](function (_0x77015) {
                            var _0x4979d4 = _0x318347;
                            _0x2714c3 += _0x4979d4(0x22f) + _0x77015['id'] + '\x22>' + _0x77015[_0x4979d4(0x253)], _0x2714c3 += _0x4979d4(0x250) + _0x77015['id'] + _0x4979d4(0x1b3), _0x2714c3 += _0x4979d4(0x21e), _0x2714c3 += _0x4979d4(0x1a7), _0x77015[_0x4979d4(0x230)] = parseInt('11', 0x2)[_0x4979d4(0x28e)](0xa);
                        }), isEdit == ![] ? $('#applications')[_0x318347(0x1e2)](_0x2714c3) : $(_0x318347(0x1a4))[_0x318347(0x1e2)](_0x2714c3);
                    }
                }
            } else isStoreApplication = ![];
            data = {};
            isEdit == ![] ? (data[_0x318347(0x23e)] = $('#firstname')[_0x318347(0x1e6)](), data[_0x318347(0x247)] = $(_0x318347(0x204))[_0x318347(0x1e6)](), data[_0x318347(0x270)] = $('#email')['val'](), data['password'] = $(_0x318347(0x24b))['val'](), data[_0x318347(0x1ce)] = document[_0x318347(0x25a)](_0x318347(0x1ce))[_0x318347(0x25c)], data['operation'] = 'register') : (data[_0x318347(0x23e)] = $('#edit_firstname')[_0x318347(0x1e6)](), data['role'] = document['getElementById'](_0x318347(0x24f))[_0x318347(0x25c)], data[_0x318347(0x26f)] = _0x318347(0x1e4), data[_0x318347(0x245)] = selectedRowid);
            data['applications'] = applicationList, data[_0x318347(0x271)] = isStoreApplication, siteList = [], isEdit == ![] ? id = _0x318347(0x20f) : id = _0x318347(0x1c6);
            var _0x2de7f = $('#' + id)[_0x318347(0x275)](_0x318347(0x1bb));
            _0x2de7f[_0x318347(0x1dd)](function (_0x245bd0) {
                site = {}, site['id'] = _0x245bd0, site['isEnabled'] = !![], siteList['push'](site);
            }), data[_0x318347(0x27c)] = siteList, jsonObj[_0x318347(0x210)] = data;
            if (permissionsOfGroup[_0x318347(0x1c8)](_0x318347(0x290)) == -0x1) {
                $(_0x318347(0x243))[_0x318347(0x1e8)]('data-dismiss', _0x318347(0x1db)), $('#dialog-for-edituser\x20#updatebtn')[_0x318347(0x1e8)](_0x318347(0x28d), _0x318347(0x1db));
                if (isEdit == !![] && $(_0x318347(0x1bf))[_0x318347(0x1e6)]() == '') return ![];
                requestDataFromServer('/useronboard/useroperations/', {
                    'alldata': JSON[_0x318347(0x218)](jsonObj),
                    'csrfmiddlewaretoken': csfr_token
                }, _0x318347(0x272))[_0x318347(0x19d)](useronboardResponse);
            }
        }
    }
}

function _0x597a() {
    var _0x5cce04 = ['post', '<div\x20class=\x22dropdown\x20custom-dropdown\x20mr-3\x22>', 'stringify', '/useronboard/useroperations/', '.edit-input_effect', '#dialog-for-adduser\x20#email', 'Enter\x20a\x20valid\x20Email', 'color', '<span\x20class=\x22checkmark\x22></span>', 'delete', ')</span></span>', '3158400OPLpnt', 'focus', 'test', '#edit_rolelist', 'register', '4746246ABNdEd', '/useronboard/gettickets', '</p>', '/lesites/getallsitenames', '<td\x20class=\x22px-3\x20py-1\x20profile-td\x22>', 'parse', '#savebtn', '<input\x20type=\x22checkbox\x22\x20id\x20=', 'hide', '<label\x20class=\x22checkbox-container\x22\x20for=\x22', 'weightage', '#password_label', '<span>', '#edit_role-error-msg', '#dialog-for-edituser\x20#edit_firstname', 'error', '<span\x20class=\x22switch_label\x22\x20id=\x22switch_label_', '#edit-multi-select-site', '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', '<p\x20class=\x22mb-2\x20size13\x20date\x22\x20data-timestamp=\x22', 'Progress', '#role-error-msg', '<p\x20class=\x22mb-1\x20size12\x20bold-text\x22>Role</p>', 'toLocaleDateString', 'firstname', '#usertemplate-nodata', 'edit-application-select-div', 'date', 'success', '#yesbtn', 'length', 'rowid', '<a\x20class=\x22dropdown-item\x22\x20onclick=\x22onUpdateUser({\x27firstname\x27:\x27', 'lastname', 'css', '/useronboard/addRoles', '\x20#user-ticketinfo', '#password', 'log', '#usertemplate\x20#user-detail-', '#dialog-for-adduser\x20.input_effect', 'edit_role', '<input\x20type=\x22checkbox\x22\x20id=\x22', '\x27)\x22', '#multi-select-application-error-msg', 'applicationname', '-firstname', '27hpccUB', '-firstname\x22>', '<td\x20class=\x22email\x22>', '<button\x20class=\x22btn\x20btn-default\x20btn-ripple\x20btn-dropdown-link\x20dropdown-toggle\x20icon-dropdown\x22\x20type=\x22button\x22\x20id=\x22moreoption\x22\x20data-toggle=\x22dropdown\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22>', '<button\x20class=\x22btn\x20btn-default\x20btn-ripple\x20accordion-toggle\x20ml-2\x22\x20data-toggle=\x22collapse\x22\x20data-target=\x22#user-detail-', 'getElementById', 'GET', 'textContent', '\x22\x20style=\x22display:none;\x22>', '11958044IeEUqo', 'multi-select-application', 'totalTickets', '<a\x20class=\x22select-link\x20dropdown-item\x20position-relative\x22\x20onclick=\x22onRoleSelect(\x27', '#multi-select-site-error-msg', '7874wzVdXo', 'ready', '#email', 'uncheckAll', 'Enable', 'input_effect', '/useronboard/getuserlist', '#multi-select-application-label', 'prop', 'userInfo--->', 'empty', '3LZnnMu', 'operation', 'email', 'isStoreApplication', 'POST', '#rolename', '-userrole', 'multipleSelect', '\x27)\x22>', 'admin', 'block', 'Failure\x20in\x20getting\x20permissions\x20', '\x27,\x27role\x27:\x27', '</td>', 'sites', 'rolename', '</div>', 'desc', '#v-pills-role\x20#rolename-label', '<span\x20class=\x22open\x20', '#dialog-for-adduser\x20#role', '</a>', 'application-select-div', 'text', '<div\x20class=\x22row\x22>', 'filter', 'none', '<div\x20class=\x22accordian-body\x20collapse\x20col-12\x20border-b\x22\x20id=\x22user-detail-', '#multi-select-user', '<a></a>', '<div\x20class=\x22col-5\x20border-r\x22>', 'data-dismiss', 'toString', '-userrole\x22>', 'ESA', 'sitename', '<tr\x20class=\x22border-0\x20collapse-content\x22>', 'VSA', 'Role\x20added\x20successfully', 'role-error-msg', '#rolelist', 'data-timestamp', 'done', '#usertemplate-nodata\x20#tryagainbtn', 'Want\x20to\x20permanently\x20delete\x20this\x20user?', 'date_joined', 'btn-danger', '.error-msg', 'html', '#dialog-for-edituser\x20#applications', '#multi-select-site-label', '\x27})\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-edituser\x22><i\x20class=\x22icon-edit2\x22></i>Edit</a>', '</label>', '#v-pills-role\x20#rolename', '<label\x20class=\x22toggleSwitch\x20large\x20position-absolute\x22\x20onclick=\x22\x22>', 'disabled', '\x27,\x27id\x27:\x27', 'label', '#edit', 'Field\x20cannot\x20be\x20empty', '#usertemplate\x20#table-view', '<tr></tr>', '#register', '#usertemplate\x20#', '\x22\x20onchange=\x22clickedOnApplication(this)\x22\x20checked/>', 'changestatus', 'Yes,\x20delete', 'warning', 'focusout', 'Select\x20Site', '#ff9eac', '<option\x20value=\x22', 'getSelects', '_status\x20onchange=\x22clickOnStatus(this,\x20\x27', '</span>', '#dialog-for-application', '#edit_firstname', 'show', '#password-error-msg', '<div\x20class=\x22col-7\x20my-auto\x20d-flex\x20cursor-pointer\x22\x20id=\x22user-ticketinfo\x22>', 'msg1', '.input_effect', 'is_active', 'edit-multi-select-site', 'each', 'indexOf', 'all', '<a\x20class=\x22dropdown-item\x22\x20onclick=\x22onDeleteUser(', '#v-pills-role\x20#rolename-error-msg', '%)\x22></span>', 'Delete\x20User', 'role', '55WgTtzw', '<span\x20class=\x22size10\x20bold-text\x22>Tickets\x20<span\x20class=\x22secondary-text\x20bold-text\x20size14\x22>(', '#ffffff', '4294130beoWmG', '/applications/getallapplicationnames', 'In\x20Progress', '-bg\x20d-block\x22\x20style=\x22width:', ')\x22>', '</button>', 'ticketStatusList', '<i\x20class=\x22icon-more_option\x22\x20style=\x22color:#6c757d\x22></i>', '#dialog-for-adduser\x20#password', 'modal', 'role-label', 'forEach', 'trim', 'style', '</option>', '<tr\x20class=\x22collapse-tr\x22\x20\x20id\x20=', 'append', 'applications', 'update', 'push', 'val', '#edit-multi-select-application', 'attr', 'Admin', 'Password\x20too\x20short\x20(Minimum\x208\x20characters)', '<div\x20class=\x22ml-3\x20progress-overview\x20d-flex\x20mt-2\x22\x20style=\x22height:10px;width:100%\x22>', 'None', '/useronboard/getallPermissions', 'display', '</tr>', '#usertemplate\x20#data\x20tbody', '#totalUsers', 'setSelects', 'error_msg', '/useronboard/get_all_groups', '^[a-zA-Z0-9@#$%^&*]{8,}$', '#dialog-for-edituser\x20#dialog-for-application', 'issuecount', 'DSA', '#dialog-for-adduser\x20#application-select-div', 'Select\x20Role', 'value', '<p\x20class=\x22mb-2\x20size13\x22\x20id=\x22', 'msg', 'find', '6832020fnCxUk', 'codename', 'remove', '<td\x20class=\x22p-lg-0\x20px-4\x20py-1\x20action-btn\x22>', '\x22></span>', '#lastname', '#dialog-for-edituser\x20#edit-savebtn', 'checked', 'name', '#multi-select-site', 'en-US', '#multi-select-application', '5611868BjUdbJ', 'parent', '<td\x20class=\x22pl-0\x20firstname\x22\x20id=\x22', '<div\x20class=\x22row\x20\x20py-lg-4\x20py-2\x20bg\x22>', 'multi-select-site', 'data', 'click', 'status', 'Failure\x20in\x20getting\x20application\x20names', '#permission', 'split'];
    _0x597a = function () {
        return _0x5cce04;
    };
    return _0x597a();
}

function clickOnBack() {
    var _0x3b01cd = _0x10991d;
    isEdit == ![] ? ($(_0x3b01cd(0x1b1))['css'](_0x3b01cd(0x1ee), _0x3b01cd(0x278)), $('#dialog-for-application')[_0x3b01cd(0x248)]('display', _0x3b01cd(0x288))) : ($(_0x3b01cd(0x1ad))['css'](_0x3b01cd(0x1ee), _0x3b01cd(0x278)), $(_0x3b01cd(0x1f6))['css'](_0x3b01cd(0x1ee), _0x3b01cd(0x288)));
}

function useronboardResponse(_0x7bc012) {
    var _0x299775 = _0x10991d;
    data = jsonObj[_0x299775(0x210)];
    if (_0x7bc012 && _0x7bc012[_0x299775(0x212)] == 0xc8) {
        if (_0x7bc012[_0x299775(0x1c3)]) swal(_0x7bc012[_0x299775(0x1fd)], _0x7bc012[_0x299775(0x1c3)], _0x299775(0x242));
        else swal(_0x7bc012[_0x299775(0x1fd)], '\x20', 'success');
        if (data[_0x299775(0x26f)] == _0x299775(0x21f)) {
            var _0x21e7d7 = _0x7bc012[_0x299775(0x245)];
            $('#usertemplate\x20#' + _0x21e7d7)[_0x299775(0x201)](), $(_0x299775(0x24d) + _0x21e7d7)['remove'](), totalUsers--, $(_0x299775(0x1f1))[_0x299775(0x285)](totalUsers);
        } else {
            if (data[_0x299775(0x26f)] == _0x299775(0x225)) {
                var _0x549f10 = '';
                data['id'] = _0x7bc012[_0x299775(0x245)], addUserRow(data), totalUsers++, $(_0x299775(0x1f1))[_0x299775(0x285)](totalUsers);
                var _0x65e639 = '';
                _0x65e639 += _0x299775(0x1ba) + data['id'] + '\x22>' + data[_0x299775(0x270)] + _0x299775(0x1e0), $('#multi-select-user')[_0x299775(0x1e2)](_0x65e639), $(_0x299775(0x28a))[_0x299775(0x275)]('refresh');
            } else data[_0x299775(0x26f)] == _0x299775(0x1e4) && (_0x21e7d7 = _0x7bc012[_0x299775(0x245)] + _0x299775(0x254), $('#usertemplate\x20#' + _0x21e7d7)[_0x299775(0x285)](data['firstname']), _0x21e7d7 = _0x7bc012[_0x299775(0x245)] + _0x299775(0x274), $('#usertemplate\x20#' + _0x21e7d7)[_0x299775(0x285)](data[_0x299775(0x1ce)]));
        }
    } else {
        swal(_0x7bc012[_0x299775(0x1fd)], _0x7bc012[_0x299775(0x1c3)], _0x299775(0x235));
        return;
    }
}

function onDeleteUser(_0x52ea59) {
    var _0x455253 = _0x10991d;
    data = {}, data[_0x455253(0x26f)] = 'delete', data['rowid'] = _0x52ea59, jsonObj[_0x455253(0x210)] = data, swal({
        'title': _0x455253(0x1cd),
        'text': _0x455253(0x19f),
        'type': _0x455253(0x1b6),
        'showCancelButton': !![],
        'confirmButtonClass': _0x455253(0x1a1),
        'confirmButtonText': _0x455253(0x1b5),
        'closeOnConfirm': ![]
    }, function () {
        var _0x570f48 = _0x455253;
        requestDataFromServer('/useronboard/useroperations/', {
            'alldata': JSON['stringify'](jsonObj),
            'csrfmiddlewaretoken': csfr_token
        }, _0x570f48(0x272))['done'](useronboardResponse);
    });
}

function inputValidation(_0xa62900) {
    var _0x1b75e5 = _0x10991d,
        _0x5af610 = checkAllfeildsfilled(_0xa62900);
    if (document[_0x1b75e5(0x25a)]('application-select-div')['style'][_0x1b75e5(0x1ee)] == _0x1b75e5(0x278)) {
        var _0x1c5bc6 = $(_0x1b75e5(0x20a))[_0x1b75e5(0x275)]('getSelects');
        _0x1c5bc6[_0x1b75e5(0x244)] == 0x0 ? ($(_0x1b75e5(0x252))[_0x1b75e5(0x285)]('Field\x20cannot\x20be\x20empty'), $(_0x1b75e5(0x26a))[_0x1b75e5(0x248)](_0x1b75e5(0x21d), _0x1b75e5(0x1b9))) : $(_0x1b75e5(0x252))[_0x1b75e5(0x285)]('\x20');
    }
    $(_0x1b75e5(0x282))[_0x1b75e5(0x285)]() == 'Select\x20Role' ? (_0x5af610 = ![], document[_0x1b75e5(0x25a)](_0x1b75e5(0x295))['innerHTML'] = _0x1b75e5(0x1ae), document[_0x1b75e5(0x25a)](_0x1b75e5(0x1dc))[_0x1b75e5(0x1df)][_0x1b75e5(0x21d)] = '#ff9eac') : document['getElementById'](_0x1b75e5(0x295))['innerHTML'] = '';
    var _0x4b9a2a = $('#multi-select-site')[_0x1b75e5(0x275)]('getSelects');
    return _0x4b9a2a[_0x1b75e5(0x244)] == 0x0 ? (_0x5af610 = ![], $(_0x1b75e5(0x262))[_0x1b75e5(0x285)](_0x1b75e5(0x1ae)), $(_0x1b75e5(0x1a5))['css'](_0x1b75e5(0x21d), '#ff9eac')) : $(_0x1b75e5(0x262))['text']('\x20'), _0x5af610;
}

function clickOnStatus(_0x2011d9, _0x2272f0) {
    var _0x2c0f98 = _0x10991d;
    data = {}, jsonObj = {}, data['operation'] = _0x2c0f98(0x1b4), data['rowid'] = _0x2272f0, rowid = _0x2272f0, _0x2011d9[_0x2c0f98(0x206)] == !![] ? data[_0x2c0f98(0x212)] = _0x2c0f98(0x267) : (data[_0x2c0f98(0x212)] = 'Disable', _0x2011d9[_0x2c0f98(0x206)] == ![]), jsonObj['data'] = data, requestDataFromServer(_0x2c0f98(0x219), {
        'alldata': JSON['stringify'](jsonObj),
        'csrfmiddlewaretoken': csfr_token
    }, _0x2c0f98(0x272))['done'](function (_0x231d6a) {
        var _0x281615 = _0x2c0f98,
            _0x4ebb47 = 'Enable';
        _0x231d6a && _0x231d6a['status'] != 0xc8 ? swal(_0x231d6a['errorMsg'], '\x20', _0x281615(0x235)) : swal(_0x231d6a['errorMsg'], '\x20', 'error'), _0x4ebb47 = _0x231d6a[_0x281615(0x1fd)] ? _0x231d6a[_0x281615(0x1fd)] : data[_0x281615(0x212)], _0x4ebb47 == _0x281615(0x267) ? document[_0x281615(0x25a)](rowid + '_status')[_0x281615(0x206)] = ![] : document[_0x281615(0x25a)](rowid + '_status')[_0x281615(0x206)] = !![];
    });
}

function onAdduser() {
    var _0x53bcc8 = _0x10991d;
    $('#v-pills-register-tab')[_0x53bcc8(0x211)](), isEdit = ![], $(_0x53bcc8(0x1c4))[_0x53bcc8(0x1c7)](function (_0x4f3898) {
        var _0x543962 = _0x53bcc8;
        id = $(this)[_0x543962(0x1e8)]('id'), document['getElementById'](id)['value'] = '', $(this)[_0x543962(0x20c)]()['find']('.error-msg')[_0x543962(0x285)]('\x20');
    }), $('#dialog-for-adduser\x20#role')['text'](_0x53bcc8(0x1fa)), $('#dialog-for-adduser\x20#role-error-msg')[_0x53bcc8(0x285)]('\x20'), $(_0x53bcc8(0x1f9))['css'](_0x53bcc8(0x1ee), _0x53bcc8(0x288)), $(_0x53bcc8(0x22c))[_0x53bcc8(0x1e8)](_0x53bcc8(0x28d), '\x20'), $('#yesbtn')[_0x53bcc8(0x1e8)](_0x53bcc8(0x28d), '\x20'), $(_0x53bcc8(0x1be))[_0x53bcc8(0x248)](_0x53bcc8(0x1ee), 'none'), $(_0x53bcc8(0x1b1))[_0x53bcc8(0x248)]('display', 'block'), $(_0x53bcc8(0x208))[_0x53bcc8(0x275)](_0x53bcc8(0x266)), $(_0x53bcc8(0x262))[_0x53bcc8(0x285)]('\x20');
}