const _0x1cd448 = _0x138f;
(function (_0x4e308b, _0x5db174) {
    const _0x1f9958 = _0x138f,
        _0x507514 = _0x4e308b();
    while (!![]) {
        try {
            const _0x3e0aa0 = -parseInt(_0x1f9958(0x1c0)) / 0x1 + parseInt(_0x1f9958(0x1de)) / 0x2 * (-parseInt(_0x1f9958(0x212)) / 0x3) + parseInt(_0x1f9958(0x1b9)) / 0x4 + parseInt(_0x1f9958(0x1ec)) / 0x5 + parseInt(_0x1f9958(0x1f9)) / 0x6 * (-parseInt(_0x1f9958(0x21c)) / 0x7) + -parseInt(_0x1f9958(0x1f0)) / 0x8 * (parseInt(_0x1f9958(0x195)) / 0x9) + parseInt(_0x1f9958(0x19a)) / 0xa * (parseInt(_0x1f9958(0x187)) / 0xb);
            if (_0x3e0aa0 === _0x5db174) break;
            else _0x507514['push'](_0x507514['shift']());
        } catch (_0x27526e) {
            _0x507514['push'](_0x507514['shift']());
        }
    }
}(_0x1caa, 0xecf52));
var serviceList = [],
    serverObjects = [],
    userobject = {},
    jsonObj = {};
redirectUrl = '', $(document)['ready'](function () {
    const _0x3f30d1 = _0x138f;
    getAllservice(), profiledata(), profileimages();
    const _0x2b7c46 = new URLSearchParams(window[_0x3f30d1(0x1f7)][_0x3f30d1(0x22e)]);
    _0x2b7c46[_0x3f30d1(0x181)](_0x3f30d1(0x1e6)) && (redirectUrl = _0x2b7c46[_0x3f30d1(0x181)](_0x3f30d1(0x1e6)));
}), $(document)['on'](_0x1cd448(0x199), _0x1cd448(0x1c6), function () {
    const _0x127eb7 = _0x1cd448;
    $(this)[_0x127eb7(0x1a9)]() == '' ? ($(this)[_0x127eb7(0x188)]()[_0x127eb7(0x1a5)](_0x127eb7(0x184))[_0x127eb7(0x19e)](_0x127eb7(0x1a7), '#ff9eac'), $(this)[_0x127eb7(0x188)]()[_0x127eb7(0x1a5)](_0x127eb7(0x1fd))['text'](_0x127eb7(0x1e0))) : ($(this)[_0x127eb7(0x188)]()[_0x127eb7(0x1a5)](_0x127eb7(0x184))[_0x127eb7(0x19e)](_0x127eb7(0x1a7), _0x127eb7(0x1b1)), $(this)[_0x127eb7(0x188)]()[_0x127eb7(0x188)]()['find'](_0x127eb7(0x1fd))[_0x127eb7(0x20a)](''));
}), $(document)[_0x1cd448(0x1a3)](function () {
    const _0x33a694 = _0x1cd448;
    var _0x40df78 = function (_0x567766) {
        const _0x11c7e9 = _0x138f;
        if (_0x567766['files'] && _0x567766['files'][0x0]) {
            var _0x37cbd7 = new FileReader();
            _0x37cbd7[_0x11c7e9(0x1db)] = function (_0x2923f0) {
                const _0x6a458a = _0x11c7e9;
                $(_0x6a458a(0x1d5))[_0x6a458a(0x198)]('src', _0x2923f0[_0x6a458a(0x1c1)][_0x6a458a(0x1be)]);
            }, _0x37cbd7[_0x11c7e9(0x1d1)](_0x567766['files'][0x0]);
        }
    };
    $(_0x33a694(0x20c))['on'](_0x33a694(0x21f), function () {
        _0x40df78(this);
    }), $(_0x33a694(0x18c))['on'](_0x33a694(0x191), function () {
        const _0x9e764c = _0x33a694;
        $(_0x9e764c(0x20c))['click']();
    });
});
var usernames = '';

function profiledata() {
    const _0x524b96 = _0x1cd448;
    requestDataFromServer(_0x524b96(0x22c), {}, _0x524b96(0x1a6))['done'](getprofiledataResponse);
}

function getprofiledataResponse(_0x41ea92) {
    const _0xf0fd42 = _0x1cd448;
    res = JSON['parse'](_0x41ea92);
    var _0x4353d2 = '';
    if (res[_0xf0fd42(0x18a)] == 0xc8) {
        $(_0xf0fd42(0x1a0))['empty'](), serviceList = res[_0xf0fd42(0x20f)], userobject = res[_0xf0fd42(0x1d8)];
        const _0x3887c0 = userobject[_0xf0fd42(0x22d)],
            _0x2e466c = new Date(_0x3887c0 * 0x3e8),
            _0x334f97 = {
                'timeZone': _0xf0fd42(0x1d0),
                'day': _0xf0fd42(0x1eb),
                'month': _0xf0fd42(0x1eb),
                'year': _0xf0fd42(0x1df),
                'hour': 'numeric',
                'minute': _0xf0fd42(0x1df),
                'second': _0xf0fd42(0x1df),
                'hour12': !![]
            },
            _0x18ee8a = _0x2e466c['toLocaleString'](_0xf0fd42(0x205), _0x334f97);
        _0x4353d2 += _0xf0fd42(0x200) + userobject[_0xf0fd42(0x1d7)] + _0xf0fd42(0x1f3) + userobject[_0xf0fd42(0x1d7)] + _0xf0fd42(0x1a1), _0x4353d2 += '<p\x20class=\x22userdata\x22\x20id=\x22' + userobject[_0xf0fd42(0x224)] + _0xf0fd42(0x227) + userobject[_0xf0fd42(0x224)] + _0xf0fd42(0x1a1), _0x4353d2 += _0xf0fd42(0x215) + _0x18ee8a + _0xf0fd42(0x1a1), usernames = userobject[_0xf0fd42(0x1d7)];
    } else swal(_0x41ea92[_0xf0fd42(0x193)], '\x20', 'error');
    $(_0xf0fd42(0x1c3))['append'](_0x4353d2);
}

function getAllservice() {
    const _0x5ce578 = _0x1cd448;
    requestDataFromServer(_0x5ce578(0x22c), {}, 'GET')[_0x5ce578(0x204)](getAllserviceResponse);
}

function getAllserviceResponse(_0xfc4e0f) {
    const _0x787c2d = _0x1cd448;
    res = JSON[_0x787c2d(0x1ef)](_0xfc4e0f);
    if (res[_0x787c2d(0x18a)] == 0xc8) {
        $(_0x787c2d(0x1a0))[_0x787c2d(0x1f1)]();
        var _0x5078b3 = '';
        serviceList = res[_0x787c2d(0x20f)], userobject = res[_0x787c2d(0x1d8)], serviceList[_0x787c2d(0x194)] ? ($('#notificationpreferences-data')['show'](), $(_0x787c2d(0x1f4))[_0x787c2d(0x1a4)](), $('#notificationpreferences\x20#save')[_0x787c2d(0x1ba)](_0x787c2d(0x1ed), ![]), res['data']['forEach'](function (_0x5d5a98) {
            const _0x1ce348 = _0x787c2d;
            var _0x3c2f48 = _0x5d5a98[_0x1ce348(0x1b6)][_0x1ce348(0x18d)](/\{(.*?)\}/g);
            _0x5078b3 += _0x1ce348(0x1a2), _0x5078b3 += _0x1ce348(0x180), _0x5078b3 += _0x1ce348(0x1f5) + _0x5d5a98[_0x1ce348(0x19f)] + '</span>';
            if (_0x5d5a98[_0x1ce348(0x20b)]) $(_0x1ce348(0x223))['html'](_0x1ce348(0x1cb)), _0x5078b3 += '<span\x20class=\x22red\x22>*</span>', _0x5078b3 += '<input\x20type=\x22checkbox\x22\x20id=\x22checkbox-' + _0x5d5a98[_0x1ce348(0x19f)] + _0x1ce348(0x1e5) + _0x5d5a98['id'] + ')\x22\x20checked\x20disabled/>';
            else _0x5078b3 += _0x1ce348(0x210) + _0x5d5a98[_0x1ce348(0x19f)] + '\x22\x20onchange=\x22checkedOnService(this,' + _0x5d5a98['id'] + ')\x22/>';
            _0x5078b3 += _0x1ce348(0x1bb), _0x5078b3 += _0x1ce348(0x1c8), _0x5078b3 += '</div>';
            if (_0x5d5a98[_0x1ce348(0x20b)] && _0x3c2f48) _0x5078b3 += '<div\x20class=\x22col-12\x20px-1\x22\x20style=\x22\x22\x20id=\x22' + _0x5d5a98[_0x1ce348(0x19f)] + _0x1ce348(0x229);
            else _0x5078b3 += '<div\x20class=\x22col-12\x20px-1\x22\x20style=\x22display:\x20none;\x22\x20id=\x22' + _0x5d5a98[_0x1ce348(0x19f)] + _0x1ce348(0x229);
            _0x3c2f48 && _0x3c2f48[_0x1ce348(0x18b)](function (_0x4137e6) {
                const _0x57a721 = _0x1ce348;
                var _0x1eebf8 = _0x4137e6[_0x57a721(0x1bd)](/{|}/g, '');
                if (userobject['hasOwnProperty'](_0x1eebf8)) inputvalue = userobject[_0x1eebf8];
                else inputvalue = '';
                _0x5078b3 += _0x57a721(0x1bf);
                var _0xd35c84 = _0x5d5a98[_0x57a721(0x19f)] + '-' + _0x1eebf8;
                if (_0x5d5a98[_0x57a721(0x217)] != '') _0x5078b3 += _0x57a721(0x1cf) + _0xd35c84 + _0x57a721(0x211) + _0x1eebf8 + _0x57a721(0x1dd) + _0x5d5a98[_0x57a721(0x217)] + _0x57a721(0x1c5) + _0x1eebf8 + ')</label>';
                else _0x5078b3 += _0x57a721(0x1cf) + _0xd35c84 + _0x57a721(0x211) + _0x1eebf8 + _0x57a721(0x1c8);
                _0x5078b3 += '<input\x20type=\x22text\x22\x20class=\x22form-control\x20notification_input_effect\x20full-input\x22\x20placeholder=\x22Enter\x20' + _0x1eebf8 + '\x22\x20id=\x22' + _0xd35c84 + _0x57a721(0x1e8) + inputvalue + _0x57a721(0x19d), _0x5078b3 += _0x57a721(0x1aa) + _0xd35c84 + _0x57a721(0x21a) + '\x22></span>', _0x5078b3 += '</div>';
            }), _0x5078b3 += '</div>';
        }), $(_0x787c2d(0x1e7))[_0x787c2d(0x1fb)](_0x5078b3)) : ($(_0x787c2d(0x1f6))['hide'](), $(_0x787c2d(0x1c4))[_0x787c2d(0x1e9)](), $(_0x787c2d(0x1c7))[_0x787c2d(0x1ba)](_0x787c2d(0x1ed), !![]));
    } else swal(_0xfc4e0f[_0x787c2d(0x193)], '\x20', _0x787c2d(0x1d9));
}

function checkedOnService(_0x1ed96a, _0x171377) {
    const _0x6ad068 = _0x1cd448;
    id = $(_0x1ed96a)[_0x6ad068(0x198)]('id');
    var _0x3f5910 = id[_0x6ad068(0x20e)]('-');
    divid = _0x3f5910[0x1] + '_inputs';
    if (_0x1ed96a[_0x6ad068(0x1b3)] == !![]) {
        document[_0x6ad068(0x1f2)](divid)['style']['display'] = 'block';
        var _0x22e22c = document['getElementById'](divid)[_0x6ad068(0x1ee)](_0x6ad068(0x1a8));
        _0x22e22c[_0x6ad068(0x18b)](function (_0x1ec7ec) {
            const _0x11ef44 = _0x6ad068;
            document[_0x11ef44(0x1f2)](_0x1ec7ec['id'] + _0x11ef44(0x22a))[_0x11ef44(0x1d6)][_0x11ef44(0x1a7)] = _0x11ef44(0x1b1), document[_0x11ef44(0x1f2)](_0x1ec7ec['id'] + _0x11ef44(0x21a))[_0x11ef44(0x1e4)] = '\x20';
        });
    } else index = serverObjects[_0x6ad068(0x202)](_0x48a115 => _0x48a115[_0x6ad068(0x18f)] == _0x171377), index != -0x1 && serverObjects[_0x6ad068(0x1dc)](index, 0x1), document[_0x6ad068(0x1f2)](divid)[_0x6ad068(0x1d6)][_0x6ad068(0x197)] = _0x6ad068(0x183);
}

function _0x138f(_0xc65bc7, _0x5ebd24) {
    const _0x1caa2f = _0x1caa();
    return _0x138f = function (_0x138f8e, _0x3c1a8e) {
        _0x138f8e = _0x138f8e - 0x17e;
        let _0x3896ad = _0x1caa2f[_0x138f8e];
        return _0x3896ad;
    }, _0x138f(_0xc65bc7, _0x5ebd24);
}

function saveSettings() {
    const _0x3510e2 = _0x1cd448;
    serviceList[_0x3510e2(0x18b)](function (_0x412d14) {
        const _0x2edb7b = _0x3510e2;
        checkboxid = _0x2edb7b(0x192) + _0x412d14[_0x2edb7b(0x19f)], document[_0x2edb7b(0x1f2)](checkboxid)[_0x2edb7b(0x1b3)] && clickOnFinish(_0x412d14['id']);
    }), serverObjects[_0x3510e2(0x194)] && (jsonObj['data'] = serverObjects, requestDataFromServer(_0x3510e2(0x225), {
        'alldata': JSON['stringify'](jsonObj),
        'csrfmiddlewaretoken': csfr_token
    }, _0x3510e2(0x1e3))['done'](function (_0x5ed047) {
        const _0x343411 = _0x3510e2;
        serverObjects = [], jsonObj = {}, response = JSON[_0x343411(0x1ef)](_0x5ed047);
        if (response && response[_0x343411(0x18a)] == 0xc8) {
            swal(response['msg'], '\x20', 'success'), serviceList[_0x343411(0x18b)](function (_0x492115) {
                const _0x33d14c = _0x343411;
                checkboxid = 'checkbox-' + _0x492115['name'], !_0x492115[_0x33d14c(0x20b)] && (document[_0x33d14c(0x1f2)](checkboxid)['checked'] = ![], inputdiv = _0x492115[_0x33d14c(0x19f)] + _0x33d14c(0x182), document[_0x33d14c(0x1f2)](inputdiv)[_0x33d14c(0x1d6)]['display'] = _0x33d14c(0x183));
            });
            if (redirectUrl) window[_0x343411(0x1f7)][_0x343411(0x226)] = window['location'][_0x343411(0x1d4)] + redirectUrl;
        } else {
            swal(response['msg'], '\x20', _0x343411(0x1d9));
            return;
        }
    }));
}

function sendNotification(_0x528d4f) {
    const _0x208174 = _0x1cd448;
    data = {}, jsonObj = {}, data[_0x208174(0x1ad)] = _0x208174(0x1da), data['title'] = _0x208174(0x1af), data['body'] = _0x208174(0x18e), jsonObj[_0x208174(0x20f)] = data, requestDataFromServer('/notificationsettings/sendnotification', {
        'alldata': JSON['stringify'](jsonObj),
        'csrfmiddlewaretoken': csfr_token
    }, _0x208174(0x1e3));
}

function clickOnFinish(_0x391446) {
    const _0x45c9dc = _0x1cd448;
    data = {}, serviceObj = serviceList[_0x45c9dc(0x20d)](_0x34e25b => _0x34e25b['id'] == _0x391446)[0x0];
    var _0x4eec98 = serviceObj[_0x45c9dc(0x1b6)][_0x45c9dc(0x18d)](/\{(.*?)\}/g),
        _0x217005 = serviceObj[_0x45c9dc(0x1b6)],
        _0x3fa191 = {};
    _0x4eec98 ? (_0x4eec98[_0x45c9dc(0x18b)](function (_0x2a2b75) {
        const _0x1020f9 = _0x45c9dc;
        var _0x1ec1cf = _0x2a2b75[_0x1020f9(0x1bd)](/{|}/g, ''),
            _0x3362c6 = serviceObj['name'] + '-' + _0x1ec1cf;
        inputValue = document[_0x1020f9(0x1f2)](_0x3362c6)[_0x1020f9(0x1c2)], inputValue == '' ? (document[_0x1020f9(0x1f2)](_0x3362c6 + _0x1020f9(0x22a))['style'][_0x1020f9(0x1a7)] = _0x1020f9(0x1fe), document[_0x1020f9(0x1f2)](_0x3362c6 + '-error-msg')[_0x1020f9(0x1e4)] = 'Field\x20cannot\x20be\x20empty') : _0x3fa191[_0x1ec1cf] = inputValue;
    }), Object[_0x45c9dc(0x1b8)](_0x3fa191)[_0x45c9dc(0x194)] > 0x0 && (data[_0x45c9dc(0x18f)] = _0x391446, data[_0x45c9dc(0x209)] = _0x3fa191, serverObjects['push'](data))) : (data[_0x45c9dc(0x18f)] = _0x391446, data[_0x45c9dc(0x209)] = _0x3fa191, serverObjects[_0x45c9dc(0x213)](data));
}

function enableNotification(_0x48ebaa) {
    const _0x326ec6 = _0x1cd448;
    _0x48ebaa[_0x326ec6(0x1b3)] == !![] ? (document[_0x326ec6(0x1f2)]('notificationservices')[_0x326ec6(0x1d6)][_0x326ec6(0x197)] = _0x326ec6(0x1ca), document[_0x326ec6(0x222)]('card-footer')[0x0][_0x326ec6(0x1d6)][_0x326ec6(0x197)] = _0x326ec6(0x1ca)) : (document['getElementById'](_0x326ec6(0x1ac))[_0x326ec6(0x1d6)][_0x326ec6(0x197)] = _0x326ec6(0x183), document['getElementsByClassName']('card-footer')[0x0][_0x326ec6(0x1d6)][_0x326ec6(0x197)] = _0x326ec6(0x183));
}

function uploadImage() {
    const _0x147779 = _0x1cd448,
        _0x12d411 = document[_0x147779(0x1f2)](_0x147779(0x201)),
        _0x435043 = new FormData();
    _0x435043[_0x147779(0x1fb)]('image', _0x12d411['files'][0x0]), _0x435043[_0x147779(0x1fb)](_0x147779(0x219), getCookie('csrftoken'));
    const _0x4874d6 = new XMLHttpRequest();
    _0x4874d6['onreadystatechange'] = function () {
        const _0x50ac5d = _0x147779;
        if (this['readyState'] === XMLHttpRequest[_0x50ac5d(0x218)] && this[_0x50ac5d(0x18a)] === 0xc8) {
            const _0x5e4b3f = JSON[_0x50ac5d(0x1ef)](_0x4874d6[_0x50ac5d(0x1ea)]),
                _0x5b0bb1 = _0x5e4b3f[_0x50ac5d(0x1fc)] + _0x50ac5d(0x1b7) + Date[_0x50ac5d(0x189)](),
                _0x5a62bc = document[_0x50ac5d(0x1f2)](_0x50ac5d(0x1bc));
            _0x5a62bc && (_0x5a62bc['src'] = _0x5b0bb1), _0x12d411[_0x50ac5d(0x1c2)] = '', swal({
                'title': _0x50ac5d(0x1cd),
                'imageUrl': _0x5b0bb1,
                'imageAlt': _0x50ac5d(0x22b)
            });
        } else this['readyState'] === XMLHttpRequest[_0x50ac5d(0x218)] && this['status'] !== 0xc8 && console['error']('Image\x20upload\x20failed.');
    }, _0x4874d6[_0x147779(0x220)](_0x147779(0x1e3), _0x147779(0x1d2), !![]);
    const _0x12cba9 = new FileReader();
    _0x12cba9['onload'] = function (_0x3c71bc) {
        const _0x503879 = _0x147779,
            _0x33ad6b = new Image();
        _0x33ad6b['onload'] = function () {
            const _0x5911c9 = _0x138f,
                _0x4f744a = document[_0x5911c9(0x1f8)](_0x5911c9(0x17f));
            _0x4f744a['width'] = _0x33ad6b['width'], _0x4f744a['height'] = _0x33ad6b[_0x5911c9(0x21e)];
            const _0x25556b = _0x4f744a[_0x5911c9(0x1e1)]('2d');
            _0x25556b[_0x5911c9(0x1b5)](_0x33ad6b, 0x0, 0x0);
            const _0x3041a5 = _0x4f744a[_0x5911c9(0x1ae)](_0x5911c9(0x196));
            _0x435043[_0x5911c9(0x1fb)]('image', _0x3041a5[_0x5911c9(0x20e)](',')[0x1]), _0x435043['append']('filename', usernames[_0x5911c9(0x1bd)](/\s+/g, '') + _0x5911c9(0x186)), _0x4874d6['send'](_0x435043);
        }, _0x33ad6b[_0x503879(0x228)] = _0x3c71bc[_0x503879(0x1c1)][_0x503879(0x1be)];
    }, _0x12cba9[_0x147779(0x1d1)](_0x12d411[_0x147779(0x1b2)][0x0]);
}

function getCookie(_0x121ee6) {
    const _0x17624e = _0x1cd448;
    var _0x5b4f1f = null;
    if (document[_0x17624e(0x221)] && document[_0x17624e(0x221)] !== '') {
        var _0x15f6d1 = document[_0x17624e(0x221)][_0x17624e(0x20e)](';');
        for (var _0x13a6f1 = 0x0; _0x13a6f1 < _0x15f6d1[_0x17624e(0x194)]; _0x13a6f1++) {
            var _0x2866fe = _0x15f6d1[_0x13a6f1][_0x17624e(0x21b)]();
            if (_0x2866fe['substring'](0x0, _0x121ee6[_0x17624e(0x194)] + 0x1) === _0x121ee6 + '=') {
                _0x5b4f1f = decodeURIComponent(_0x2866fe['substring'](_0x121ee6['length'] + 0x1));
                break;
            }
        }
    }
    return _0x5b4f1f;
}
document[_0x1cd448(0x1f2)](_0x1cd448(0x201))[_0x1cd448(0x190)](_0x1cd448(0x21f), uploadImage);

function profileimages() {
    const _0x4e7ed9 = _0x1cd448;
    requestDataFromServer(_0x4e7ed9(0x22c), {}, _0x4e7ed9(0x1a6))[_0x4e7ed9(0x204)](profileupload);
}

function profileupload(_0x414430) {
    const _0x3aab2b = _0x1cd448;
    res = JSON['parse'](_0x414430);
    if (res[_0x3aab2b(0x18a)] == 0xc8) {
        serviceLists = res[_0x3aab2b(0x20f)], userobject = res[_0x3aab2b(0x1d8)];
        const _0x575b58 = userobject['first_name'][_0x3aab2b(0x1bd)](/\s+/g, ''),
            _0x3bb5c7 = [_0x3aab2b(0x1e2), _0x3aab2b(0x1ff), 'png', _0x3aab2b(0x1cc)],
            _0x43eac7 = _0x3bb5c7[_0x3aab2b(0x17e)](_0x28bb7a => '/static/app/usericons/' + _0x575b58 + '.' + _0x28bb7a)[_0x3aab2b(0x1a5)](_0xf0a512 => {
                const _0x1a3a63 = _0x3aab2b;
                return fetch(_0xf0a512)[_0x1a3a63(0x207)](_0x557c7c => _0x557c7c['ok'])['catch'](_0x54bcd0 => {
                    const _0x28ebba = _0x1a3a63;
                    return console[_0x28ebba(0x1d9)](_0x28ebba(0x206) + _0x54bcd0), ![];
                });
            }),
            _0x12a219 = document[_0x3aab2b(0x1f2)](_0x3aab2b(0x1c9));
        fetch(_0x43eac7)[_0x3aab2b(0x207)](_0x2ca3ad => {
            const _0x43e9a5 = _0x3aab2b;
            return _0x2ca3ad['ok'] ? (document[_0x43e9a5(0x1f2)]('img_uploading')['style'][_0x43e9a5(0x197)] = _0x43e9a5(0x1ca), document[_0x43e9a5(0x1f2)](_0x43e9a5(0x21d))[_0x43e9a5(0x1d6)][_0x43e9a5(0x197)] = _0x43e9a5(0x183), _0x2ca3ad[_0x43e9a5(0x1fa)]()) : (document[_0x43e9a5(0x1f2)]('img_upload')[_0x43e9a5(0x1d6)][_0x43e9a5(0x197)] = _0x43e9a5(0x1ca), document[_0x43e9a5(0x1f2)](_0x43e9a5(0x1c9))['style'][_0x43e9a5(0x197)] = 'none', fetch(document['getElementById']('img_upload')['getAttribute'](_0x43e9a5(0x228)))[_0x43e9a5(0x207)](_0x564316 => _0x564316[_0x43e9a5(0x1fa)]()));
        })[_0x3aab2b(0x207)](_0x3acda1 => {
            const _0x1a3751 = _0x3aab2b,
                _0x1cb34e = URL[_0x1a3751(0x1b4)](_0x3acda1);
            _0x12a219[_0x1a3751(0x228)] = _0x1cb34e;
        })[_0x3aab2b(0x1ce)](_0x3edb9f => {
            const _0x2adbc2 = _0x3aab2b;
            console[_0x2adbc2(0x1d9)](_0x2adbc2(0x206) + _0x3edb9f);
        });
    }
}

function _0x1caa() {
    const _0x509d37 = ['target', 'value', '#profile_data', 'notificationpreferences-nodata', '\x20\x22\x20for\x20multiple\x20', '.notification_input_effect', '#notificationpreferences\x20#save', '</label>', 'img_uploading', 'block', '*Default\x20service', 'gif', 'Image\x20uploaded\x20successfully!', 'catch', '<label\x20id=\x22', 'Asia/Kolkata', 'readAsDataURL', '/notificationsettings/save_image/', 'log', 'origin', '.profile-pic', 'style', 'first_name', 'userobj', 'error', 'discord', 'onload', 'splice', '(Use\x20\x22\x20', '1724emEhZD', 'numeric', 'Field\x20cannot\x20be\x20empty', 'getContext', 'jpg', 'POST', 'innerHTML', '\x22\x20onchange=\x22checkedOnService(this,', 'next', '#notificationpreferences\x20#serviceList', '\x22\x20value=\x22', 'show', 'responseText', '2-digit', '3791050SNTvcL', 'disabled', 'getElementsByTagName', 'parse', '472qMdfPM', 'empty', 'getElementById', '\x22\x20>\x20User\x20Name\x20:', '#notificationpreferences-nodata', '<span>', 'notificationpreferences-data', 'location', 'createElement', '24cywEAh', 'blob', 'append', 'image_url', '.error-msg', '#ff9eac', 'jpeg', '<p\x20class=\x22userdata\x22\x20id=\x22', 'saveimg', 'findIndex', 'querySelector', 'done', 'en-IN', 'Error\x20fetching\x20profile\x20image\x20URL:\x20', 'then', 'png', 'inputs', 'text', 'is_defaultservice', '.file-upload', 'filter', 'split', 'data', '<input\x20type=\x22checkbox\x22\x20id=\x22checkbox-', '-label\x22>', '4593QpXrUS', 'push', 'Error\x20deleting\x20profile\x20image:\x20', '<p\x20class=\x22userdata\x22\x20id=\x22\x22\x20>\x20Date-joined\x20:', '/static/app/usericons/', 'delimiter', 'DONE', 'csrfmiddlewaretoken', '-error-msg', 'trim', '2040262tzMIIQ', 'img_upload', 'height', 'change', 'open', 'cookie', 'getElementsByClassName', '#errormessage', 'email', '/notificationsettings/savesettings', 'href', '\x22\x20>\x20E-Mail\x20:', 'src', '_inputs\x22>', '-label', 'Uploaded\x20Image', '/notificationsettings/getallservices', 'date_joined', 'search', 'map', 'canvas', '<label\x20class=\x22checkbox-container\x22>', 'get', '_inputs', 'none', 'label', 'Error\x20deleting\x20profile\x20image', '.jpg', '10912ziOMWR', 'parent', 'now', 'status', 'forEach', '.upload-button', 'match', 'test\x20body', 'serviceid', 'addEventListener', 'click', 'checkbox-', 'msg', 'length', '141822jDyRJG', 'image/jpeg', 'display', 'attr', 'focusout', '38030AVbRTz', 'stringify', '/delete-profile-image/', '\x22\x20required=\x22\x22\x20\x20autocomplete=\x22off\x22>', 'css', 'name', '#notificationpreferences\x20#servicelist', '</p>', '<div\x20class=\x22pt-1\x22>', 'ready', 'hide', 'find', 'GET', 'color', 'input', 'val', '<span\x20class=\x22error-msg\x22\x20id=\x22', 'DELETE', 'notificationservices', 'servicename', 'toDataURL', 'test\x20title', 'application/json', '#404E67', 'files', 'checked', 'createObjectURL', 'drawImage', 'syntax', '?t=', 'keys', '5092476sqbKSs', 'prop', '<span\x20class=\x22checkmark\x22></span>', 'profile-image', 'replace', 'result', '<div\x20class=\x22col-12\x20my-2\x22>', '1418019tXlITR'];
    _0x1caa = function () {
        return _0x509d37;
    };
    return _0x1caa();
}

function delimg() {
    const _0x4cfb2f = _0x1cd448,
        _0xce1e9b = usernames['replace'](/\s+/g, ''),
        _0x211470 = [_0x4cfb2f(0x1e2), _0x4cfb2f(0x1ff), _0x4cfb2f(0x208), 'gif'],
        _0x4d705b = _0x211470[_0x4cfb2f(0x17e)](_0x423954 => _0x4cfb2f(0x216) + _0xce1e9b + '.' + _0x423954)['find'](_0x1086d7 => {
            const _0x26ae3a = _0x4cfb2f;
            return fetch(_0x1086d7)['then'](_0x2cb159 => _0x2cb159['ok'])[_0x26ae3a(0x1ce)](_0xd9ea67 => {
                const _0x20fc8e = _0x26ae3a;
                return console[_0x20fc8e(0x1d9)](_0x20fc8e(0x206) + _0xd9ea67), ![];
            });
        });
    if (_0x4d705b) {
        const _0x1b18ce = document[_0x4cfb2f(0x203)]('[name=csrfmiddlewaretoken]')[_0x4cfb2f(0x1c2)];
        fetch(_0x4cfb2f(0x19c), {
            'method': _0x4cfb2f(0x1ab),
            'headers': {
                'Content-Type': _0x4cfb2f(0x1b0),
                'X-CSRFToken': _0x1b18ce
            },
            'body': JSON[_0x4cfb2f(0x19b)]({
                'username': _0xce1e9b
            })
        })[_0x4cfb2f(0x207)](_0x4be7ed => {
            const _0x8b5e73 = _0x4cfb2f;
            _0x4be7ed['ok'] ? console[_0x8b5e73(0x1d3)]('Profile\x20image\x20deleted\x20successfully') : console[_0x8b5e73(0x1d9)](_0x8b5e73(0x185));
        })['catch'](_0x404871 => {
            const _0x185cc7 = _0x4cfb2f;
            console[_0x185cc7(0x1d9)](_0x185cc7(0x214) + _0x404871);
        });
    } else console[_0x4cfb2f(0x1d9)]('Error:\x20Could\x20not\x20find\x20profile\x20image\x20URL');
}