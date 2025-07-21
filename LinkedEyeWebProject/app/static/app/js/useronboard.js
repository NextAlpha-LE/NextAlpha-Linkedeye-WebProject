function _0xe557(_0x53b21f, _0xa70a2c) {
    var _0x254160 = _0x2541();
    return _0xe557 = function (_0xe557a1, _0x7d5293) {
        _0xe557a1 = _0xe557a1 - 0x1dd;
        var _0x4d5c01 = _0x254160[_0xe557a1];
        return _0x4d5c01;
    }, _0xe557(_0x53b21f, _0xa70a2c);
}
var _0x1cc56d = _0xe557;
(function (_0x8817d2, _0x2bf3ec) {
    var _0x2703a9 = _0xe557,
        _0x5d6412 = _0x8817d2();
    while (!![]) {
        try {
            var _0x4bbfb5 = parseInt(_0x2703a9(0x236)) / 0x1 * (parseInt(_0x2703a9(0x280)) / 0x2) + parseInt(_0x2703a9(0x271)) / 0x3 * (-parseInt(_0x2703a9(0x211)) / 0x4) + parseInt(_0x2703a9(0x221)) / 0x5 + -parseInt(_0x2703a9(0x241)) / 0x6 * (-parseInt(_0x2703a9(0x244)) / 0x7) + parseInt(_0x2703a9(0x200)) / 0x8 + -parseInt(_0x2703a9(0x22c)) / 0x9 * (-parseInt(_0x2703a9(0x248)) / 0xa) + parseInt(_0x2703a9(0x26d)) / 0xb * (-parseInt(_0x2703a9(0x25a)) / 0xc);
            if (_0x4bbfb5 === _0x2bf3ec) break;
            else _0x5d6412['push'](_0x5d6412['shift']());
        } catch (_0x3dbd5b) {
            _0x5d6412['push'](_0x5d6412['shift']());
        }
    }
}(_0x2541, 0xea60f));
var allFileNames = [],
    selectedFileName = '',
    selectedFileType = '',
    serviceIdCount = 0x0,
    allData = {},
    serviceNames = [],
    jsonObj = {},
    rowid = '1',
    permissions = {
        'VA': [_0x1cc56d(0x1e8)],
        'VSA': ['VA', 'EA'],
        'EA': [_0x1cc56d(0x208), _0x1cc56d(0x1e8)],
        'ESA': ['EA']
    },
    permisionOrder = [_0x1cc56d(0x1e8), 'VA', 'ESA', 'EA', 'DSA', 'DA'],
    selectedPermisions = [],
    roleList = [],
    permissionsOfGroup = [],
    isStoreApplication = ![],
    applicationList = [];
$(document)[_0x1cc56d(0x281)](function () {
    var _0x598917 = _0x1cc56d;
    $(_0x598917(0x27d))[_0x598917(0x1fe)](function () {
        var _0x5392dc = _0x598917;
        document[_0x5392dc(0x1e5)](_0x5392dc(0x1fb))[0x0][_0x5392dc(0x251)]['color'] = '';
    }), $(_0x598917(0x27d))[_0x598917(0x26e)](function (_0x3e68a1) {
        var _0x569c95 = _0x598917;
        $(this)[_0x569c95(0x20d)]() == '' || $(this)['val']() == null ? ($(this)['addClass'](_0x569c95(0x238)), document[_0x569c95(0x1e5)]('select-input')[0x0][_0x569c95(0x251)][_0x569c95(0x1e9)] = _0x569c95(0x212), $(this)[_0x569c95(0x247)]()[_0x569c95(0x261)](_0x569c95(0x1f9))[_0x569c95(0x22b)](_0x569c95(0x27f))) : ($(this)[_0x569c95(0x24b)](_0x569c95(0x238)), $(this)[_0x569c95(0x247)]()[_0x569c95(0x261)](_0x569c95(0x1f9))[_0x569c95(0x22b)](''));
    }), $(_0x598917(0x243))[_0x598917(0x1fe)](function () {
        var _0x2ac7c8 = _0x598917;
        $(this)[_0x2ac7c8(0x247)]()[_0x2ac7c8(0x261)](_0x2ac7c8(0x239))[_0x2ac7c8(0x23e)](_0x2ac7c8(0x1e2)), $(this)['parent']()[_0x2ac7c8(0x23e)]('bg_input');
    }), $(_0x598917(0x243))['focusout'](function (_0x19a430) {
        var _0x2a9c45 = _0x598917;
        $(this)['val']() == '' ? ($(this)[_0x2a9c45(0x232)](_0x2a9c45(0x229), _0x2a9c45(0x267)), $(this)[_0x2a9c45(0x247)]()[_0x2a9c45(0x261)]('label')[_0x2a9c45(0x232)](_0x2a9c45(0x1e9), _0x2a9c45(0x212)), $(this)[_0x2a9c45(0x247)]()[_0x2a9c45(0x247)]()[_0x2a9c45(0x261)](_0x2a9c45(0x1ff))[_0x2a9c45(0x22b)]('Field\x20cannot\x20be\x20empty'), $(this)['parent']()[_0x2a9c45(0x261)]('label')[_0x2a9c45(0x24b)](_0x2a9c45(0x1e2)), $(this)['parent']()[_0x2a9c45(0x24b)](_0x2a9c45(0x1e1))) : ($(this)[_0x2a9c45(0x232)](_0x2a9c45(0x229), _0x2a9c45(0x206)), $(this)['parent']()[_0x2a9c45(0x261)](_0x2a9c45(0x239))[_0x2a9c45(0x232)]('color', '#404E67'), $(this)['parent']()[_0x2a9c45(0x247)]()['find'](_0x2a9c45(0x1ff))[_0x2a9c45(0x22b)](''));
    }), $(_0x598917(0x218))['focus'](function () {
        var _0x46d8e3 = _0x598917;
        $(this)[_0x46d8e3(0x247)]()[_0x46d8e3(0x23e)](_0x46d8e3(0x1e1));
    }), $(_0x598917(0x218))['focusout'](function (_0x14dfb9) {
        var _0x4cb9f1 = _0x598917;
        id = $(this)[_0x4cb9f1(0x253)]('id'), $(this)[_0x4cb9f1(0x20d)]() == '' ? ($(this)[_0x4cb9f1(0x232)]('border-color', '#FF7588'), document[_0x4cb9f1(0x20f)](id + _0x4cb9f1(0x235))[_0x4cb9f1(0x24a)] = 'Field\x20cannot\x20be\x20empty') : ($(this)[_0x4cb9f1(0x232)](_0x4cb9f1(0x229), _0x4cb9f1(0x206)), document[_0x4cb9f1(0x20f)](id + _0x4cb9f1(0x235))[_0x4cb9f1(0x24a)] = '\x20');
    }), $('#email')['focusout'](function (_0x422d8c) {
        var _0x4bfb18 = _0x598917;
        isEmailValid = validateEmail(), isEmailValid == ![] ? ($(this)[_0x4bfb18(0x232)](_0x4bfb18(0x229), '#FF7588'), $(this)[_0x4bfb18(0x247)]()[_0x4bfb18(0x261)](_0x4bfb18(0x239))[_0x4bfb18(0x232)]('color', _0x4bfb18(0x212)), $(this)[_0x4bfb18(0x247)]()[_0x4bfb18(0x247)]()[_0x4bfb18(0x261)]('.error-msg')[_0x4bfb18(0x22b)]('Enter\x20a\x20valid\x20Email')) : $(_0x4bfb18(0x23d))['val']() != '' && ($(this)[_0x4bfb18(0x232)]('border-color', _0x4bfb18(0x206)), $(this)[_0x4bfb18(0x247)]()[_0x4bfb18(0x261)](_0x4bfb18(0x239))['css']('color', _0x4bfb18(0x204)), $(this)[_0x4bfb18(0x247)]()['parent']()[_0x4bfb18(0x261)](_0x4bfb18(0x1ff))[_0x4bfb18(0x22b)](''));
    }), $('#password1')['focusout'](function (_0x3c819c) {
        var _0x5595a4 = _0x598917;
        ispasswordValid = validatePassword(), ispasswordValid == ![] ? ($(this)['css'](_0x5595a4(0x229), _0x5595a4(0x267)), $(this)[_0x5595a4(0x247)]()['find'](_0x5595a4(0x239))['css'](_0x5595a4(0x1e9), _0x5595a4(0x212)), $(this)[_0x5595a4(0x247)]()[_0x5595a4(0x247)]()[_0x5595a4(0x261)](_0x5595a4(0x1ff))[_0x5595a4(0x22b)](_0x5595a4(0x255))) : $(_0x5595a4(0x23d))[_0x5595a4(0x20d)]() != '' && ($(this)[_0x5595a4(0x232)]('border-color', _0x5595a4(0x206)), $(this)[_0x5595a4(0x247)]()['find']('label')[_0x5595a4(0x232)](_0x5595a4(0x1e9), _0x5595a4(0x204)), $(this)[_0x5595a4(0x247)]()[_0x5595a4(0x247)]()[_0x5595a4(0x261)]('.error-msg')[_0x5595a4(0x22b)](''));
    }), getallGroups(), getallPermissions();
});

function getallGroups() {
    var _0x276a6c = _0x1cc56d;
    requestDataFromServer(_0x276a6c(0x215), {}, 'GET')[_0x276a6c(0x256)](function (_0x45e0f4) {
        var _0x360ac4 = _0x276a6c;
        res = JSON['parse'](_0x45e0f4), $(_0x360ac4(0x25c))[_0x360ac4(0x26c)](), roleList = [];
        if (res[_0x360ac4(0x260)] == 0xc8) {
            var _0x3e2da1 = '';
            _0x3e2da1 = '<option\x20disabled=true\x20value\x20=\x20\x22\x22\x20selected>Select\x20Role</option>', res['data'][_0x360ac4(0x20e)](function (_0x359e3c) {
                var _0x5c9fc9 = _0x360ac4;
                _0x3e2da1 += '<option\x20value\x20=\x20\x22' + _0x359e3c['name'] + '\x22>' + _0x359e3c['name'] + _0x5c9fc9(0x225);
            }), $('#role')[_0x360ac4(0x23f)](_0x3e2da1), roleList = res[_0x360ac4(0x242)];
        } else swal(res['error_msg'], '\x20', _0x360ac4(0x21e));
    });
}

function getallPermissions() {
    var _0x339f97 = _0x1cc56d;
    requestDataFromServer(_0x339f97(0x1e6), {}, _0x339f97(0x219))['done'](handlePermissionsResponse);
}

function getGroupPermissions(_0x11f313) {
    var _0x5ca5b2 = _0x1cc56d,
        _0x1e9798 = [],
        _0x5e111b = parseInt(_0x11f313, 0xa)[_0x5ca5b2(0x240)](0x2);
    while (_0x5e111b[_0x5ca5b2(0x21a)] < permisionOrder[_0x5ca5b2(0x21a)]) {
        _0x5e111b = '0' + _0x5e111b;
    }
    for (let _0x2bb37a = permisionOrder['length'] - 0x1; _0x2bb37a >= 0x0; _0x2bb37a--) {
        _0x5e111b[_0x2bb37a] == 0x1 && _0x1e9798[_0x5ca5b2(0x250)](permisionOrder[_0x2bb37a]);
    }
    return _0x1e9798;
}

function onRoleSelect(_0x43053b) {
    var _0x50306c = _0x1cc56d;
    permissionsOfGroup = [];
    var _0x23c685 = $(_0x43053b)[_0x50306c(0x20d)](),
        _0x14537e = roleList[_0x50306c(0x22e)](_0x192e07 => _0x192e07[_0x50306c(0x1fa)] == _0x23c685)[0x0][_0x50306c(0x272)];
    permissionsOfGroup = getGroupPermissions(_0x14537e), permissionsOfGroup['indexOf'](_0x50306c(0x208)) > -0x1 || permissionsOfGroup[_0x50306c(0x1f1)]('VSA') > -0x1 ? (document[_0x50306c(0x20f)]('application-select-div')[_0x50306c(0x251)]['display'] = 'block', $(_0x50306c(0x245))[_0x50306c(0x23a)](_0x50306c(0x207))) : document[_0x50306c(0x20f)](_0x50306c(0x237))[_0x50306c(0x251)][_0x50306c(0x223)] = 'none';
}

function handlePermissionsResponse(_0x1d7d93) {
    var _0x5b2eb0 = _0x1cc56d;
    res = JSON['parse'](_0x1d7d93);
    if (res['status'] == 0xc8) {
        var _0x1495f4 = '';
        res[_0x5b2eb0(0x242)][_0x5b2eb0(0x20e)](function (_0x20f78b) {
            var _0x4ebd98 = _0x5b2eb0;
            _0x1495f4 += '<div\x20class=\x22custom-control\x20custom-checkbox\x22>', _0x1495f4 += _0x4ebd98(0x1ee) + _0x20f78b['codename'] + _0x4ebd98(0x1e7), _0x1495f4 += '<label\x20class=\x22custom-control-label\x22\x20for=\x22' + _0x20f78b[_0x4ebd98(0x1f5)] + '\x22>' + _0x20f78b['name'] + _0x4ebd98(0x273), _0x1495f4 += _0x4ebd98(0x202);
        }), $('#permission')[_0x5b2eb0(0x23f)](_0x1495f4), getApplicationNames();
    } else swal(_0x5b2eb0(0x1fc), '\x20', _0x5b2eb0(0x21e));
}

function openAddrolesDialog() {
    var _0x3bac81 = _0x1cc56d;
    document[_0x3bac81(0x20f)](_0x3bac81(0x233))['value'] = '', selectedPermisions = [], $('input:checkbox[name=type]')[_0x3bac81(0x254)](function () {
        var _0x15713 = _0x3bac81;
        document[_0x15713(0x20f)]($(this)[_0x15713(0x253)]('id'))[_0x15713(0x20a)] = ![], document[_0x15713(0x20f)]($(this)[_0x15713(0x253)]('id'))[_0x15713(0x22a)] = ![];
    });
}

function clickedOnPermission(_0x287404) {
    var _0x46efd4 = _0x1cc56d;
    id = $(_0x287404)[_0x46efd4(0x253)]('id'), temp = permissions[id];
    if (_0x287404[_0x46efd4(0x20a)]) {
        if (selectedPermisions[_0x46efd4(0x1f1)](id) == -0x1) selectedPermisions[_0x46efd4(0x250)](id);
        temp['forEach'](function (_0x45b07f) {
            var _0x2025e3 = _0x46efd4,
                _0x2b8ac5 = document[_0x2025e3(0x20f)](_0x45b07f);
            _0x2b8ac5[_0x2025e3(0x22a)] = !![];
            if (_0x2b8ac5[_0x2025e3(0x20a)]) _0x2b8ac5[_0x2025e3(0x20a)] = ![];
        });
    } else selectedPermisions[_0x46efd4(0x1f0)](selectedPermisions[_0x46efd4(0x1f1)](id), 0x1), temp[_0x46efd4(0x20e)](function (_0x161ac1) {
        var _0x167c54 = _0x46efd4,
            _0x341ed2 = document['getElementById'](_0x161ac1);
        _0x341ed2[_0x167c54(0x22a)] = ![];
    });
}

function clickedOnApplication(_0x4def46) {
    var _0x48ef06 = _0x1cc56d;
    id = $(_0x4def46)[_0x48ef06(0x253)]('id');
    var _0x4a09f2 = applicationList[_0x48ef06(0x22e)](_0x4bd0fa => _0x4bd0fa['id'] == id);
    _0x4def46[_0x48ef06(0x20a)] ? _0x4a09f2[0x0][_0x48ef06(0x272)] = parseInt('11', 0x2)[_0x48ef06(0x240)](0xa) : _0x4a09f2[0x0][_0x48ef06(0x272)] = parseInt('10', 0x2)[_0x48ef06(0x240)](0xa);
}

function saveEditapplications() {
    var _0x514f99 = _0x1cc56d;
    jsonObj[_0x514f99(0x242)]['isStoreApplication'] = !![], jsonObj[_0x514f99(0x242)]['applications'] = applicationList, $(_0x514f99(0x246))['attr'](_0x514f99(0x213), _0x514f99(0x26a)), requestDataFromServer(_0x514f99(0x1f7), {
        'alldata': JSON[_0x514f99(0x264)](jsonObj),
        'csrfmiddlewaretoken': csfr_token
    }, _0x514f99(0x224))[_0x514f99(0x256)](useronboardResponse);
}

function addRole() {
    var _0x3e2dc6 = _0x1cc56d,
        _0x3cb7c1 = '';
    for (let _0x117f3f = permisionOrder['length'] - 0x1; _0x117f3f >= 0x0; _0x117f3f--) {
        if (selectedPermisions[_0x3e2dc6(0x1f1)](permisionOrder[_0x117f3f]) != -0x1) _0x3cb7c1 = '1' + _0x3cb7c1;
        else _0x3cb7c1 = '0' + _0x3cb7c1;
    }
    jsonObj = {}, data = {}, $(_0x3e2dc6(0x274))[_0x3e2dc6(0x20d)]() != '' ? ($(_0x3e2dc6(0x27c))['attr']('data-dismiss', _0x3e2dc6(0x26a)), data[_0x3e2dc6(0x233)] = $(_0x3e2dc6(0x274))[_0x3e2dc6(0x20d)](), data[_0x3e2dc6(0x272)] = parseInt(_0x3cb7c1, 0x2)[_0x3e2dc6(0x240)](0xa), jsonObj[_0x3e2dc6(0x242)] = data, requestDataFromServer(_0x3e2dc6(0x214), {
        'alldata': JSON['stringify'](jsonObj),
        'csrfmiddlewaretoken': csfr_token
    }, _0x3e2dc6(0x224))['done'](addRoleResponse)) : (document[_0x3e2dc6(0x20f)](_0x3e2dc6(0x276))[_0x3e2dc6(0x24a)] = _0x3e2dc6(0x27f), document[_0x3e2dc6(0x20f)]('rolename')['style'][_0x3e2dc6(0x1fd)] = _0x3e2dc6(0x267));
}

function addRoleResponse(_0x49c3ad) {
    var _0x50e362 = _0x1cc56d;
    res = JSON['parse'](_0x49c3ad);
    if (res[_0x50e362(0x260)] == 0x190) swal(res[_0x50e362(0x20b)], '\x20', _0x50e362(0x21e));
    else {
        if (roleList[_0x50e362(0x1f1)](_0x50e362(0x1de)) == -0x1) {
            var _0xfb7a48 = {};
            _0xfb7a48[_0x50e362(0x1fa)] = res['data'][_0x50e362(0x233)], _0xfb7a48[_0x50e362(0x272)] = res[_0x50e362(0x242)]['weightage'], roleList[_0x50e362(0x250)](_0xfb7a48);
        }
        var _0x386cdb = '';
        _0x386cdb += _0x50e362(0x220) + res[_0x50e362(0x242)]['rolename'] + '\x22>' + res[_0x50e362(0x242)][_0x50e362(0x233)] + _0x50e362(0x225), $('#role')[_0x50e362(0x23f)](_0x386cdb), swal('Role\x20added\x20successfully', '\x20', 'success');
    }
}

function getApplicationNames() {
    requestDataFromServer('/applications/getallapplicationnames', {}, 'GET')['done'](handleApplicationNamesResponse);
}

function handleApplicationNamesResponse(_0x243512) {
    var _0x22a9ec = _0x1cc56d;
    res = JSON[_0x22a9ec(0x270)](_0x243512);
    if (res[_0x22a9ec(0x260)] == 0xc8) {
        var _0x3f3d25 = '';
        $('#multi-select-application')[_0x22a9ec(0x26c)](), res[_0x22a9ec(0x242)][_0x22a9ec(0x20e)](function (_0x1cc2f8) {
            var _0x297834 = _0x22a9ec;
            _0x3f3d25 += _0x297834(0x220) + _0x1cc2f8['id'] + '-' + _0x1cc2f8[_0x297834(0x25f)] + '\x22>' + _0x1cc2f8[_0x297834(0x25f)] + _0x297834(0x225);
        }), $('#multi-select-application')[_0x22a9ec(0x23f)](_0x3f3d25), registerMultiSelect();
    } else swal(_0x22a9ec(0x1f3), '\x20', 'error');
}

function registerMultiSelect() {
    var _0x128ed9 = _0x1cc56d;
    $(_0x128ed9(0x245))[_0x128ed9(0x23a)]({
        'placeholder': _0x128ed9(0x24e),
        'showClear': !![],
        'selectAll': ![]
    });
}

function validateEmail() {
    var _0x129307 = _0x1cc56d;
    isEmailValid = !![];
    var _0x4871c5 = new RegExp(_0x129307(0x1ef));
    return email = $('#email')[_0x129307(0x20d)]()[_0x129307(0x252)](), email != '' && !_0x4871c5[_0x129307(0x1df)](email) ? isEmailValid = ![] : isEmailValid = !![], isEmailValid;
}

function validatePassword() {
    var _0x383c3e = _0x1cc56d;
    ispasswordValid = !![];
    var _0x501fbe = new RegExp('^[a-z0-9@#$%^&*]{8,}$');
    return $('#password1')['val']() != '' && !_0x501fbe[_0x383c3e(0x1df)]($(_0x383c3e(0x25d))[_0x383c3e(0x20d)]()) ? ispasswordValid = ![] : ispasswordValid = !![], ispasswordValid;
}

function submitdetails() {
    var _0x193a8b = _0x1cc56d,
        _0x5745c2 = validation('input_effect');
    if (_0x5745c2) {
        console[_0x193a8b(0x234)]('submitdetails\x20feildvalid'), isEmailValid = validateEmail(), ispasswordValid = validatePassword();
        if (isEmailValid == ![]) document[_0x193a8b(0x20f)](_0x193a8b(0x265))[_0x193a8b(0x251)]['color'] = '#ff9eac', document['getElementById']('email-error-msg')[_0x193a8b(0x24a)] = _0x193a8b(0x1ed), document['getElementById'](_0x193a8b(0x1ec))['style'][_0x193a8b(0x1fd)] = _0x193a8b(0x267);
        else {
            if (ispasswordValid == ![]) document['getElementById']('password1_label')['style'][_0x193a8b(0x1e9)] = _0x193a8b(0x212), document[_0x193a8b(0x20f)](_0x193a8b(0x22d))[_0x193a8b(0x24a)] = 'Password\x20too\x20short\x20(Minimum\x208\x20characters)', document[_0x193a8b(0x20f)](_0x193a8b(0x1eb))[_0x193a8b(0x251)]['borderBottomColor'] = _0x193a8b(0x267);
            else {
                if (permissionsOfGroup[_0x193a8b(0x1f1)](_0x193a8b(0x208)) > -0x1 || permissionsOfGroup[_0x193a8b(0x1f1)](_0x193a8b(0x1e8)) > -0x1) {
                    applicationList = [];
                    var _0x903033 = $('#multi-select-application')[_0x193a8b(0x23a)](_0x193a8b(0x227));
                    _0x903033[_0x193a8b(0x20e)](function (_0x5a663a) {
                        var _0x2a4aa0 = _0x193a8b;
                        tempObj = _0x5a663a['split']('-'), application = {}, application['id'] = tempObj[0x0], application[_0x2a4aa0(0x25f)] = tempObj[0x1], application[_0x2a4aa0(0x272)] = parseInt('10', 0x2)[_0x2a4aa0(0x240)](0xa), applicationList[_0x2a4aa0(0x250)](application);
                    });
                    if (permissionsOfGroup[_0x193a8b(0x1f1)](_0x193a8b(0x208)) > -0x1) {
                        if (applicationList['length'] > 0x0) {
                            var _0x30d1fb = '';
                            $('#applications')[_0x193a8b(0x26c)](), applicationList[_0x193a8b(0x20e)](function (_0x111f73) {
                                var _0x4b751e = _0x193a8b;
                                _0x30d1fb += _0x4b751e(0x27b), _0x30d1fb += '<input\x20type=\x22checkbox\x22\x20name=\x22type\x22\x20class=\x22custom-control-input\x20application-checkbox\x22\x20id=\x22' + _0x111f73['id'] + _0x4b751e(0x283), _0x30d1fb += '<label\x20class=\x22custom-control-label\x22\x20for=\x22' + _0x111f73['id'] + '\x22>' + _0x111f73[_0x4b751e(0x25f)] + _0x4b751e(0x273), _0x30d1fb += _0x4b751e(0x202), _0x111f73['weightage'] = parseInt('11', 0x2)['toString'](0xa);
                            }), $(_0x193a8b(0x1f6))[_0x193a8b(0x23f)](_0x30d1fb), $('#submit')[_0x193a8b(0x253)](_0x193a8b(0x209), 'modal'), $(_0x193a8b(0x27e))[_0x193a8b(0x253)]('data-target', _0x193a8b(0x1f2));
                        }
                    }
                } else isStoreApplication = ![];
                data = {}, data[_0x193a8b(0x205)] = $(_0x193a8b(0x1f4))[_0x193a8b(0x20d)](), data[_0x193a8b(0x230)] = $(_0x193a8b(0x282))[_0x193a8b(0x20d)](), data[_0x193a8b(0x1ec)] = $(_0x193a8b(0x23d))[_0x193a8b(0x20d)](), data[_0x193a8b(0x1eb)] = $('#password1')['val'](), data['role'] = $(_0x193a8b(0x25c))['val'](), data[_0x193a8b(0x1e3)] = _0x193a8b(0x21c), data[_0x193a8b(0x203)] = isStoreApplication, data['applications'] = applicationList, jsonObj[_0x193a8b(0x242)] = data, permissionsOfGroup[_0x193a8b(0x1f1)](_0x193a8b(0x208)) == -0x1 && requestDataFromServer(_0x193a8b(0x1f7), {
                    'alldata': JSON[_0x193a8b(0x264)](jsonObj),
                    'csrfmiddlewaretoken': csfr_token
                }, 'POST')[_0x193a8b(0x256)](useronboardResponse);
            }
        }
    } else $(this)[_0x193a8b(0x232)](_0x193a8b(0x229), _0x193a8b(0x267)), $(this)[_0x193a8b(0x247)]()[_0x193a8b(0x261)](_0x193a8b(0x239))[_0x193a8b(0x232)]('color', '#ff9eac'), $(this)['parent']()[_0x193a8b(0x247)]()[_0x193a8b(0x261)](_0x193a8b(0x1ff))[_0x193a8b(0x22b)]('Field\x20cannot\x20be\x20empty'), ($('#role')[_0x193a8b(0x20d)]() == '' || $(_0x193a8b(0x25c))[_0x193a8b(0x20d)]() == null) && (document[_0x193a8b(0x1e5)](_0x193a8b(0x1fb))[0x0][_0x193a8b(0x251)][_0x193a8b(0x1e9)] = _0x193a8b(0x212), document['getElementById']('role-error-msg')[_0x193a8b(0x24a)] = _0x193a8b(0x27f), $(this)[_0x193a8b(0x23e)]('redborder'));
}

function useronboardResponse(_0x26ce57) {
    var _0x272413 = _0x1cc56d;
    data = jsonObj[_0x272413(0x242)];
    if (_0x26ce57 && _0x26ce57[_0x272413(0x260)] == 0x190) {
        swal(_0x26ce57['msg'], '\x20', 'error');
        return;
    } else {
        if (_0x26ce57 && _0x26ce57[_0x272413(0x260)] != 0x1f4) {
            $('#' + _0x26ce57[_0x272413(0x226)])['remove']();
            var _0x3e15b5 = document[_0x272413(0x27a)](_0x272413(0x24f));
            for (var _0x4786fd = 0x0; _0x4786fd < _0x3e15b5['length']; _0x4786fd++) {
                _0x3e15b5[_0x4786fd]['id'] && (document[_0x272413(0x20f)](_0x3e15b5[_0x4786fd]['id'])[_0x272413(0x277)] = '');
            }
            document[_0x272413(0x20f)](_0x272413(0x22f))[_0x272413(0x277)] = '', document[_0x272413(0x20f)](_0x272413(0x237))[_0x272413(0x251)]['display'] = _0x272413(0x24c), swal(_0x26ce57['msg'], '\x20', _0x272413(0x258));
        }
        if (_0x26ce57 && _0x26ce57[_0x272413(0x260)] != 0x1f4 && data['operation'] == _0x272413(0x21c)) {
            var _0x14eb6b = '';
            rowid = _0x26ce57[_0x272413(0x226)], _0x14eb6b += '<tr\x20id=' + rowid + '>', _0x14eb6b += '<td>' + data[_0x272413(0x205)] + _0x272413(0x1dd), _0x14eb6b += _0x272413(0x26b) + data[_0x272413(0x230)] + '</td>', _0x14eb6b += _0x272413(0x26b) + data[_0x272413(0x1ec)] + _0x272413(0x1dd), _0x14eb6b += _0x272413(0x26b), _0x14eb6b += _0x272413(0x23c), _0x14eb6b += '<input\x20type=\x22checkbox\x22\x20id\x20=\x22' + rowid + _0x272413(0x21f) + rowid + _0x272413(0x259), _0x14eb6b += _0x272413(0x210), _0x14eb6b += _0x272413(0x284) + rowid + _0x272413(0x263), _0x14eb6b += '</span>', _0x14eb6b += _0x272413(0x21d), _0x14eb6b += _0x272413(0x273), _0x14eb6b += _0x272413(0x1dd), _0x14eb6b += _0x272413(0x26b), _0x14eb6b += '<button\x20type=\x22button\x22\x20class=\x22btn-ripple\x20position-absolute\x22\x20style=\x22top:5px\x22\x20onclick=\x22onDelete(\x27' + rowid + _0x272413(0x222), _0x14eb6b += _0x272413(0x1dd), _0x14eb6b += _0x272413(0x1f8), html = $(_0x272413(0x21b))['append'](_0x14eb6b);
        }
        _0x26ce57['status'] == 0x1f4 && swal(_0x26ce57['msg'], '\x20', 'error');
    }
}

function onDelete(_0x538e43) {
    var _0x489a14 = _0x1cc56d;
    data = {}, data['operation'] = _0x489a14(0x269), data['rowid'] = _0x538e43, jsonObj[_0x489a14(0x242)] = data, swal({
        'title': _0x489a14(0x231),
        'text': _0x489a14(0x249),
        'type': _0x489a14(0x23b),
        'showCancelButton': !![],
        'confirmButtonClass': _0x489a14(0x1e4),
        'confirmButtonText': _0x489a14(0x262),
        'closeOnConfirm': ![]
    }, function () {
        var _0x245339 = _0x489a14;
        requestDataFromServer(_0x245339(0x1f7), {
            'alldata': JSON['stringify'](jsonObj),
            'csrfmiddlewaretoken': csfr_token
        }, 'POST')[_0x245339(0x256)](useronboardResponse);
    });
}

function deleteEntry() {
    var _0x334ec1 = _0x1cc56d;
    requestDataFromServer(_0x334ec1(0x1f7), {
        'alldata': JSON[_0x334ec1(0x264)](jsonObj),
        'csrfmiddlewaretoken': csfr_token
    }, _0x334ec1(0x224))['done'](useronboardResponse);
}

function validation(_0x470f7a) {
    var _0x5ddd9a = _0x1cc56d,
        _0x3b9820 = !![];
    $('.' + _0x470f7a)[_0x5ddd9a(0x254)](function (_0x497cde) {
        var _0x5401d4 = _0x5ddd9a;
        $(this)['val']() == '' || $(this)[_0x5401d4(0x20d)]() == null ? ($(this)[_0x5401d4(0x232)](_0x5401d4(0x229), '#FF7588'), $(this)[_0x5401d4(0x247)]()['find']('label')['css'](_0x5401d4(0x1e9), _0x5401d4(0x212)), $(this)[_0x5401d4(0x247)]()[_0x5401d4(0x247)]()[_0x5401d4(0x261)]('.error-msg')['text']('Field\x20cannot\x20be\x20empty'), _0x3b9820 = ![]) : ($(this)[_0x5401d4(0x232)](_0x5401d4(0x229), _0x5401d4(0x206)), $(this)[_0x5401d4(0x247)]()['find'](_0x5401d4(0x239))[_0x5401d4(0x232)](_0x5401d4(0x1e9), _0x5401d4(0x204)), $(this)[_0x5401d4(0x247)]()['parent']()[_0x5401d4(0x261)]('.error-msg')[_0x5401d4(0x22b)]('\x20'));
    }), $(_0x5ddd9a(0x27d))[_0x5ddd9a(0x254)](function (_0x15d22c) {
        var _0x35eb0e = _0x5ddd9a;
        $(this)[_0x35eb0e(0x20d)]() == '' || $(this)['val']() == null ? ($(this)['addClass'](_0x35eb0e(0x238)), document[_0x35eb0e(0x1e5)](_0x35eb0e(0x1fb))[0x0][_0x35eb0e(0x251)][_0x35eb0e(0x1e9)] = _0x35eb0e(0x212), $(this)[_0x35eb0e(0x247)]()[_0x35eb0e(0x261)](_0x35eb0e(0x1f9))[_0x35eb0e(0x22b)](_0x35eb0e(0x27f)), _0x3b9820 = ![]) : ($(this)['removeClass']('redborder'), document[_0x35eb0e(0x1e5)]('select-input')[0x0][_0x35eb0e(0x251)][_0x35eb0e(0x1e9)] = _0x35eb0e(0x204), $(this)[_0x35eb0e(0x247)]()['find'](_0x35eb0e(0x1f9))[_0x35eb0e(0x22b)](''));
    });
    if (document[_0x5ddd9a(0x20f)](_0x5ddd9a(0x237))[_0x5ddd9a(0x251)][_0x5ddd9a(0x223)] == _0x5ddd9a(0x25e)) {
        var _0x52828d = $(_0x5ddd9a(0x245))[_0x5ddd9a(0x23a)]('getSelects');
        _0x52828d[_0x5ddd9a(0x21a)] == 0x0 ? (document['getElementById'](_0x5ddd9a(0x216))[_0x5ddd9a(0x251)][_0x5ddd9a(0x1e9)] = _0x5ddd9a(0x212), document[_0x5ddd9a(0x20f)](_0x5ddd9a(0x1e0))['innerHTML'] = _0x5ddd9a(0x27f)) : (document[_0x5ddd9a(0x20f)](_0x5ddd9a(0x216))[_0x5ddd9a(0x251)]['color'] = _0x5ddd9a(0x204), document[_0x5ddd9a(0x20f)]('multi-select-application-error-msg')[_0x5ddd9a(0x24a)] = '\x20');
    }
    return _0x3b9820;
}

function closeDiv(_0x3776b5) {
    var _0xf10db7 = _0x1cc56d;
    $('.' + _0xf10db7(0x275) + _0x3776b5)['remove'](), delete allData[_0xf10db7(0x275) + _0x3776b5];
}
$(_0x1cc56d(0x217))['click'](function () {
    var _0x5b2456 = _0x1cc56d;
    $(this)[_0x5b2456(0x201)](_0x5b2456(0x20c)), $('#password1')[_0x5b2456(0x253)](_0x5b2456(0x24d)) == _0x5b2456(0x228) ? $('#password1')[_0x5b2456(0x253)](_0x5b2456(0x24d), _0x5b2456(0x22b)) : $('#password1')[_0x5b2456(0x253)](_0x5b2456(0x24d), _0x5b2456(0x228));
});

function clickOnStatus(_0x3e77da, _0x32c857) {
    var _0x3dc0d1 = _0x1cc56d;
    data = {}, jsonObj = {}, data['operation'] = _0x3dc0d1(0x257), data[_0x3dc0d1(0x226)] = _0x32c857, rowid = _0x32c857, _0x3e77da[_0x3dc0d1(0x20a)] == !![] ? data['status'] = _0x3dc0d1(0x1ea) : (data['status'] = _0x3dc0d1(0x26f), _0x3e77da['checked'] == ![]), jsonObj[_0x3dc0d1(0x242)] = data, requestDataFromServer(_0x3dc0d1(0x1f7), {
        'alldata': JSON[_0x3dc0d1(0x264)](jsonObj),
        'csrfmiddlewaretoken': csfr_token
    }, 'POST')['done'](function (_0x5a6412) {
        var _0x2a800b = _0x3dc0d1;
        if (_0x5a6412 && _0x5a6412[_0x2a800b(0x260)] == 0x190) {
            swal(_0x5a6412['msg'], '\x20', _0x2a800b(0x21e));
            return;
        } else $(_0x2a800b(0x266) + _0x32c857)[_0x2a800b(0x22b)](_0x5a6412[_0x2a800b(0x268)]), _0x5a6412[_0x2a800b(0x268)] == _0x2a800b(0x25b) ? document[_0x2a800b(0x20f)](rowid + _0x2a800b(0x278))['checked'] = ![] : document[_0x2a800b(0x20f)](rowid + '_status')[_0x2a800b(0x20a)] = !![], _0x5a6412[_0x2a800b(0x279)] == 0x1f4 && swal(_0x5a6412['errorMsg'], '\x20', 'error');
    });
}

function _0x2541() {
    var _0x1bffa0 = ['icon-show', 'val', 'forEach', 'getElementById', '<span>', '685304WrqxrZ', '#ff9eac', 'data-dismiss', '/useronboard/addRoles', '/useronboard/get_all_groups', 'multi-select-application', '.toggle-password', '.add_input_effect', 'GET', 'length', '#data\x20tbody', 'register', '<a></a>', 'error', '_status\x22\x20onchange=\x22clickOnStatus(this,\x20\x27', '<option\x20value=\x22', '431105CdALbf', '\x27)\x22><i\x20class=\x22icon-delete\x22></i></button>', 'display', 'POST', '</option>', 'rowid', 'getSelects', 'password', 'border-color', 'disabled', 'text', '9FwFLzh', 'password1-error-msg', 'filter', 'role', 'lastname', 'Delete\x20User', 'css', 'rolename', 'log', '-error-msg', '10iFqigl', 'application-select-div', 'redborder', 'label', 'multipleSelect', 'warning', '<label\x20class=\x22toggleSwitch\x20large\x20position-absolute\x22\x20onclick=\x22\x22>', '#email', 'addClass', 'append', 'toString', '5238930rvuBBc', 'data', '.input_effect', '7kuDfAE', '#multi-select-application', '#yesbtn', 'parent', '5234560DHPquO', 'Want\x20to\x20permanently\x20delete\x20this\x20user?', 'innerHTML', 'removeClass', 'none', 'type', 'Select\x20Application', 'input', 'push', 'style', 'trim', 'attr', 'each', 'Password\x20too\x20short\x20(Minimum\x208\x20characters)', 'done', 'changestatus', 'success', '\x27)\x22>', '6924QvPzaY', 'Enable', '#role', '#password1', 'block', 'applicationname', 'status', 'find', 'Yes,\x20delete', '>Enable</span>', 'stringify', 'email_label', '#switch_label_', '#FF7588', 'msg', 'delete', 'modal', '<td>', 'empty', '5324yaOOVl', 'focusout', 'disable', 'parse', '30ESZBKE', 'weightage', '</label>', '#rolename', 'Service_', 'rolename-error-msg', 'value', '_status', 'code', 'getElementsByTagName', '<div\x20class=\x22custom-control\x20custom-checkbox\x22>', '#applybtn', '.select-input', '#submit', 'Field\x20cannot\x20be\x20empty', '116596phyDlI', 'ready', '#lastname', '\x22\x20onchange=\x22clickedOnApplication(this)\x22\x20checked>', '<span\x20class=\x22switch_label\x22\x20id=switch_label_', '</td>', 'res.data.rolename', 'test', 'multi-select-application-error-msg', 'bg_input', 'move_label', 'operation', 'btn-danger', 'getElementsByClassName', '/useronboard/getallPermissions', '\x22\x20onchange=\x22clickedOnPermission(this)\x22>', 'VSA', 'color', 'enable', 'password1', 'email', 'Enter\x20a\x20valid\x20Email', '<input\x20type=\x22checkbox\x22\x20name=\x22type\x22\x20class=\x22custom-control-input\x22\x20id=\x22', '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', 'splice', 'indexOf', '#dialog-for-application', 'Failure\x20in\x20geting\x20application\x20names', '#firstname', 'codename', '#applications', '/onboard/useronboard/', '</tr>', 'span', 'name', 'select-input', 'Failure\x20in\x20getting\x20permissions\x20', 'borderBottomColor', 'focus', '.error-msg', '7093848bpfZsC', 'toggleClass', '</div>', 'isStoreApplication', '#404E67', 'firstname', '#BABFC7', 'uncheckAll', 'ESA', 'data-toggle', 'checked', 'error_msg'];
    _0x2541 = function () {
        return _0x1bffa0;
    };
    return _0x2541();
}