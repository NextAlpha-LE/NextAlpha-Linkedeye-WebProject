(function (_0x258f25, _0x5d461a) {
    var _0x25273e = _0x5d77,
        _0x7063c8 = _0x258f25();
    while (!![]) {
        try {
            var _0x1c9bcb = parseInt(_0x25273e(0x20b)) / 0x1 * (-parseInt(_0x25273e(0x1f2)) / 0x2) + -parseInt(_0x25273e(0x1ef)) / 0x3 + parseInt(_0x25273e(0x208)) / 0x4 * (-parseInt(_0x25273e(0x1ab)) / 0x5) + -parseInt(_0x25273e(0x1f7)) / 0x6 * (parseInt(_0x25273e(0x20d)) / 0x7) + parseInt(_0x25273e(0x1e2)) / 0x8 * (parseInt(_0x25273e(0x1d5)) / 0x9) + -parseInt(_0x25273e(0x20a)) / 0xa + parseInt(_0x25273e(0x20e)) / 0xb * (parseInt(_0x25273e(0x1b6)) / 0xc);
            if (_0x1c9bcb === _0x5d461a) break;
            else _0x7063c8['push'](_0x7063c8['shift']());
        } catch (_0x35ecbc) {
            _0x7063c8['push'](_0x7063c8['shift']());
        }
    }
}(_0x4a84, 0xb5473));
var jsonObj = {},
    selectedService = '\x20';
$(document)['ready'](function () {
    var _0x77db55 = _0x5d77;
    $(_0x77db55(0x1ee))[_0x77db55(0x1ae)](function (_0x5ca3c4) {
        var _0x1c8885 = _0x77db55;
        $(this)[_0x1c8885(0x200)]() == '' ? ($(this)[_0x1c8885(0x1f4)]()['find'](_0x1c8885(0x1cb))[_0x1c8885(0x219)](_0x1c8885(0x1f5), _0x1c8885(0x1ed)), $(this)[_0x1c8885(0x1f4)]()[_0x1c8885(0x1f1)](_0x1c8885(0x1f8))[_0x1c8885(0x1e5)]('Field\x20cannot\x20be\x20empty')) : $(this)[_0x1c8885(0x1f4)]()[_0x1c8885(0x1f1)](_0x1c8885(0x1f8))['text']('');
    }), $(_0x77db55(0x1db))['focus'](function () {
        var _0x76863f = _0x77db55;
        $(_0x76863f(0x1db))['val']($(_0x76863f(0x1e7))[_0x76863f(0x200)]());
    }), $(_0x77db55(0x1e7))[_0x77db55(0x1ae)](function () {
        var _0x6a032b = _0x77db55;
        $(_0x6a032b(0x1db))[_0x6a032b(0x200)]($(_0x6a032b(0x1e7))['val']()), $(this)['val']()['startsWith']('https') && ($(this)[_0x6a032b(0x1f4)]()[_0x6a032b(0x1f1)](_0x6a032b(0x1cb))[_0x6a032b(0x219)]('color', _0x6a032b(0x1ed)), $(this)[_0x6a032b(0x1f4)]()[_0x6a032b(0x1f1)]('.error-msg')[_0x6a032b(0x1e5)](_0x6a032b(0x1ba)));
    }), $(_0x77db55(0x1db))[_0x77db55(0x1ae)](function () {
        var _0x2196d4 = _0x77db55;
        $(this)['val']()[_0x2196d4(0x1dd)](_0x2196d4(0x1c0)) && ($(this)['parent']()['find']('label')[_0x2196d4(0x219)](_0x2196d4(0x1f5), _0x2196d4(0x1ed)), $(this)[_0x2196d4(0x1f4)]()['find'](_0x2196d4(0x1f8))[_0x2196d4(0x1e5)]('\x27https\x27\x20Protocol\x20not\x20supported'));
    }), getAllservice();
});

function getAllservice() {
    var _0x19f627 = _0x5d77;
    requestDataFromServer(_0x19f627(0x1d7), {}, 'GET')[_0x19f627(0x1c4)](getAllserviceResponse);
}

function getAllserviceResponse(_0x56709b) {
    var _0x598d7f = _0x5d77;
    res = JSON[_0x598d7f(0x202)](_0x56709b), res[_0x598d7f(0x213)] == 0xc8 && res['data'][_0x598d7f(0x1e4)] ? ($(_0x598d7f(0x1af))[_0x598d7f(0x1fe)](), $(_0x598d7f(0x1c1))[_0x598d7f(0x1de)](), res[_0x598d7f(0x1fc)][_0x598d7f(0x1c8)](function (_0x5c8f66) {
        addNotificationService(_0x5c8f66);
    })) : ($('#notificationtemplate\x20#table-view')['hide'](), $('#notificationtemplate-nodata')[_0x598d7f(0x1fe)](), $(_0x598d7f(0x1c9))[_0x598d7f(0x1b1)]('disabled', ![]), $('#notificationtemplate-nodata\x20#nodatamessage')[_0x598d7f(0x1e5)](res[_0x598d7f(0x203)]));
}

function addNotificationService(_0x712b46) {
    var _0x8a68c4 = _0x5d77;
    $(_0x8a68c4(0x1af))['css']('display') == 'none' && ($(_0x8a68c4(0x1af))[_0x8a68c4(0x1fe)](), $(_0x8a68c4(0x1c1))[_0x8a68c4(0x1de)]());
    serviceHtml = '\x20', serviceHtml += _0x8a68c4(0x201) + _0x712b46['id'] + '>', serviceHtml += _0x8a68c4(0x1e3);
    if (_0x712b46[_0x8a68c4(0x1fd)]) serviceHtml += _0x8a68c4(0x1be);
    serviceHtml += _0x8a68c4(0x1e0), serviceHtml += '<td\x20class=\x22pl-0\x22>' + _0x712b46[_0x8a68c4(0x1bb)] + _0x8a68c4(0x1e0), serviceHtml += _0x8a68c4(0x214) + _0x712b46[_0x8a68c4(0x1dc)] + _0x8a68c4(0x1e0), serviceHtml += _0x8a68c4(0x1b8) + _0x712b46['id'] + _0x8a68c4(0x1d1) + _0x712b46[_0x8a68c4(0x1e9)] + _0x8a68c4(0x1e0), serviceHtml += _0x8a68c4(0x1b8) + _0x712b46['id'] + '-delimiter\x22\x20>' + _0x712b46[_0x8a68c4(0x205)] + _0x8a68c4(0x1e0), serviceHtml += '<td\x20class=\x22p-0\x20action-btn\x22\x20>', serviceHtml += _0x8a68c4(0x218), serviceHtml += _0x8a68c4(0x1bc), serviceHtml += '<div\x20class=\x22dropdown-menu\x22\x20aria-labelledby=\x22moreoption\x22>', serviceHtml += '<a\x20class=\x22dropdown-item\x22\x20onclick=\x22onDelete(\x27' + _0x712b46['id'] + _0x8a68c4(0x1c5), serviceHtml += '<a\x20class=\x22dropdown-item\x22\x20onclick=\x22onUpdate({\x27syntax\x27:\x27' + _0x712b46['syntax'] + _0x8a68c4(0x1ce) + _0x712b46['id'] + _0x8a68c4(0x1b5) + _0x712b46[_0x8a68c4(0x205)] + _0x8a68c4(0x211), serviceHtml += _0x8a68c4(0x1ca), serviceHtml += _0x8a68c4(0x1e0), serviceHtml += _0x8a68c4(0x1f9), $(_0x8a68c4(0x212))[_0x8a68c4(0x216)](serviceHtml);
}

function onUpdate(_0x67d3f2) {
    var _0xc3047e = _0x5d77;
    jsonObj = {}, data = {}, data[_0xc3047e(0x1b7)] = _0xc3047e(0x1ad), data[_0xc3047e(0x1e9)] = _0x67d3f2[_0xc3047e(0x1e9)], data[_0xc3047e(0x205)] = _0x67d3f2['delimiter'], data['id'] = _0x67d3f2['id'];
    var _0x5f2bfa = '';
    _0x5f2bfa = _0x67d3f2['id'] + _0xc3047e(0x1ea), document['getElementById'](_0xc3047e(0x1cd))[_0xc3047e(0x1c6)] = $(_0xc3047e(0x1fb) + _0x5f2bfa)[_0xc3047e(0x1e5)]()[_0xc3047e(0x1c3)](), _0x5f2bfa = _0x67d3f2['id'] + _0xc3047e(0x1b3), document[_0xc3047e(0x20f)](_0xc3047e(0x1d0))[_0xc3047e(0x1c6)] = $(_0xc3047e(0x1fb) + _0x5f2bfa)[_0xc3047e(0x1e5)]()['trim'](), $('#dialog-for-editservice\x20#updatebtn')[_0xc3047e(0x210)](_0xc3047e(0x209), '\x20'), $('.edit-input')['each'](function (_0xf7234f) {
        var _0x2d005f = _0xc3047e;
        $(this)[_0x2d005f(0x1f4)]()[_0x2d005f(0x1f1)](_0x2d005f(0x1f8))[_0x2d005f(0x1e5)]('\x20');
    });
}

function updateService() {
    var _0x411ede = _0x5d77;
    if ($(_0x411ede(0x1b0))[_0x411ede(0x200)]() == '' && $(_0x411ede(0x1bd))['val']() == '') return ![];
    else $(_0x411ede(0x1b0))[_0x411ede(0x200)]()[_0x411ede(0x1dd)](_0x411ede(0x1c0)) ? (document[_0x411ede(0x20f)](_0x411ede(0x206))[_0x411ede(0x1cc)] = _0x411ede(0x1ba), document[_0x411ede(0x20f)](_0x411ede(0x1e8))['style'][_0x411ede(0x1f5)] = '#ff9eac') : (data['delimiter'] = $(_0x411ede(0x1bd))[_0x411ede(0x200)](), data['syntax'] = $(_0x411ede(0x1b0))['val']()['trim'](), jsonObj['data'] = data, $(_0x411ede(0x1b4))[_0x411ede(0x210)](_0x411ede(0x209), _0x411ede(0x1ec)), requestDataFromServer(_0x411ede(0x1ff), {
        'alldata': JSON['stringify'](jsonObj),
        'csrfmiddlewaretoken': csfr_token
    }, _0x411ede(0x1cf))[_0x411ede(0x1c4)](serviceResponse));
}

function onDelete(_0x3053d7) {
    var _0xd3d8fb = _0x5d77;
    data = {}, data[_0xd3d8fb(0x1b7)] = _0xd3d8fb(0x1eb), data['id'] = _0x3053d7, jsonObj['data'] = data, swal({
        'title': 'Delete\x20Service',
        'text': _0xd3d8fb(0x1b9),
        'type': _0xd3d8fb(0x1c7),
        'showCancelButton': !![],
        'confirmButtonClass': 'btn-danger',
        'confirmButtonText': _0xd3d8fb(0x1bf),
        'closeOnConfirm': ![]
    }, function () {
        var _0xd804bc = _0xd3d8fb;
        requestDataFromServer(_0xd804bc(0x1ff), {
            'alldata': JSON[_0xd804bc(0x1d4)](jsonObj),
            'csrfmiddlewaretoken': csfr_token
        }, _0xd804bc(0x1cf))[_0xd804bc(0x1c4)](serviceResponse);
    });
}

function addService() {
    var _0xe1c238 = _0x5d77;
    data = {}, jsonObj = {};
    var _0x113b9c = checkInputs(_0xe1c238(0x1fa));
    if (_0x113b9c) {
        data[_0xe1c238(0x1b7)] = _0xe1c238(0x1f6), data['name'] = $(_0xe1c238(0x1e1))['val'](), data[_0xe1c238(0x1e9)] = $('#syntax')[_0xe1c238(0x200)](), data[_0xe1c238(0x205)] = $('#delimiter') && $(_0xe1c238(0x1d2))[_0xe1c238(0x200)]() == '' ? '' : $(_0xe1c238(0x1d2))[_0xe1c238(0x200)]();
        document['getElementById'](_0xe1c238(0x1df))['checked'] ? (data[_0xe1c238(0x1e9)] = document[_0xe1c238(0x20f)](_0xe1c238(0x21a))[_0xe1c238(0x1c6)], data[_0xe1c238(0x217)] = !![]) : (data[_0xe1c238(0x1e9)] = $('#syntax')[_0xe1c238(0x200)](), data['is_inputRequired'] = ![]);
        if (document[_0xe1c238(0x20f)]('isdefaultservice')['checked']) data['is_defaultservice'] = !![];
        else data[_0xe1c238(0x1fd)] = ![];
        data['messageformat'] = document[_0xe1c238(0x20f)]('selectedformat')[_0xe1c238(0x1c2)], jsonObj['data'] = data, $('#dialog-for-addservice\x20#addbtn')['attr']('data-dismiss', _0xe1c238(0x1ec)), requestDataFromServer(_0xe1c238(0x1ff), {
            'alldata': JSON[_0xe1c238(0x1d4)](jsonObj),
            'csrfmiddlewaretoken': csfr_token
        }, 'POST')[_0xe1c238(0x1c4)](serviceResponse);
    }
}

function serviceResponse(_0x5e9c65) {
    var _0x992622 = _0x5d77;
    data = jsonObj[_0x992622(0x1fc)];
    if (_0x5e9c65 && _0x5e9c65['status'] == 0xc8) {
        swal(_0x5e9c65['msg'], '\x20', _0x992622(0x1d6));
        if (data['operation'] == _0x992622(0x1eb)) {
            var _0x59f92a = _0x5e9c65['id'];
            $(_0x992622(0x1fb) + _0x59f92a)['remove']();
        } else {
            if (data[_0x992622(0x1b7)] == _0x992622(0x1f6)) data['id'] = _0x5e9c65['id'], addNotificationService(data);
            else data[_0x992622(0x1b7)] == _0x992622(0x1ad) && (_0x59f92a = _0x5e9c65['id'] + '-syntax', $(_0x992622(0x1fb) + _0x59f92a)[_0x992622(0x1e5)](data[_0x992622(0x1e9)]), _0x59f92a = _0x5e9c65['id'] + _0x992622(0x1b3), $(_0x992622(0x1fb) + _0x59f92a)['text'](data[_0x992622(0x205)]));
        }
    } else {
        swal(_0x5e9c65[_0x992622(0x203)], '\x20', _0x992622(0x1d9));
        return;
    }
}

function checkInputs(_0x5a25ac) {
    var _0x4daef3 = _0x5d77,
        _0x17aced = !![];
    $('.' + _0x5a25ac)[_0x4daef3(0x1d8)](function (_0x15b9db) {
        var _0x2e8648 = _0x4daef3,
            _0x3f2c5a = $(this)[_0x2e8648(0x210)]('id');
        _0x3f2c5a != 'fullsyntax' && ($(this)[_0x2e8648(0x200)]()['trim']() == '' || $(this)[_0x2e8648(0x200)]()[_0x2e8648(0x1c3)]() == null ? ($(this)[_0x2e8648(0x1f4)]()[_0x2e8648(0x1f1)](_0x2e8648(0x1cb))[_0x2e8648(0x219)](_0x2e8648(0x1f5), _0x2e8648(0x1ed)), $(this)[_0x2e8648(0x1f4)]()['find'](_0x2e8648(0x1f8))['text']('Field\x20cannot\x20be\x20empty'), _0x17aced = ![]) : ($(this)[_0x2e8648(0x1f4)]()['find']('.error-msg')[_0x2e8648(0x1e5)]('\x20'), _0x3f2c5a == _0x2e8648(0x1e9) && $(_0x2e8648(0x1e7))[_0x2e8648(0x200)]()[_0x2e8648(0x1dd)](_0x2e8648(0x1c0)) && (_0x17aced = ![], $(this)['parent']()['find'](_0x2e8648(0x1cb))[_0x2e8648(0x219)]('color', _0x2e8648(0x1ed)), $(this)[_0x2e8648(0x1f4)]()['find'](_0x2e8648(0x1f8))['text'](_0x2e8648(0x1ba)))));
    });
    var _0x3d78ef = document['getElementById']('extrainputfield')[_0x4daef3(0x1da)][_0x4daef3(0x204)];
    if (_0x3d78ef == _0x4daef3(0x20c)) {
        if ($(_0x4daef3(0x1db))[_0x4daef3(0x200)]() == '') _0x17aced = ![];
        else $(_0x4daef3(0x1db))[_0x4daef3(0x200)]()[_0x4daef3(0x1dd)](_0x4daef3(0x1c0)) && (_0x17aced = ![], document[_0x4daef3(0x20f)]('fullsyntax-error-msg')[_0x4daef3(0x1cc)] = _0x4daef3(0x1ba), document[_0x4daef3(0x20f)](_0x4daef3(0x1b2))['style'][_0x4daef3(0x1f5)] = _0x4daef3(0x1ed));
    }
    return document[_0x4daef3(0x20f)](_0x4daef3(0x1f0))[_0x4daef3(0x1c2)] == _0x4daef3(0x1ac) ? (_0x17aced = ![], document[_0x4daef3(0x20f)](_0x4daef3(0x1d3))[_0x4daef3(0x1cc)] = 'Field\x20cannot\x20be\x20empty', document['getElementById'](_0x4daef3(0x1e6))[_0x4daef3(0x1da)]['color'] = _0x4daef3(0x1ed)) : document['getElementById']('selectedformat-error-msg')[_0x4daef3(0x1cc)] = '', _0x17aced;
}

function _0x4a84() {
    var _0xeebfbc = ['9471420voKQgr', '4LfoZFq', 'block', '11781TofEcL', '143hfiOdA', 'getElementById', 'attr', '\x27})\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-editservice\x22\x20><i\x20class=\x22icon-edit2\x22></i>Edit</a>\x20</div>', '#notificationtemplate\x20#data\x20tbody', 'status', '<td>', 'extrainputfield', 'append', 'is_inputRequired', '<div\x20class=\x22dropdown\x20custom-dropdown\x20mr-3\x22\x20>', 'css', 'fullsyntax', '415zkKhNG', 'Select\x20Message\x20Format', 'update', 'focusout', '#notificationtemplate\x20#table-view', '#edit_syntax', 'prop', 'fullsyntax_label', '-delimiter', '#dialog-for-editservice\x20#updatebtn', '\x27,\x27delimiter\x27:\x27', '2453328wvzoTQ', 'operation', '<td\x20id=\x22', 'Want\x20to\x20permanently\x20delete\x20this\x20service?', '\x27https\x27\x20Protocol\x20not\x20supported', 'name', '<button\x20class=\x22btn\x20btn-default\x20btn-ripple\x20btn-dropdown-link\x20dropdown-toggle\x20icon-dropdown\x22\x20type=\x22button\x22\x20id=\x22moreoption\x22\x20data-toggle=\x22dropdown\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22\x20>\x20<i\x20class=\x22icon-more_option\x22\x20style=\x22color:#6c757d\x22></i>\x20</button>', '#edit_delimiter', '<div\x20class=\x22profile\x20green-bg\x20text-white\x22>\x20<span\x20class=\x22size12\x20bold-text\x22>D</span>\x20</div>', 'Yes,\x20delete', 'https', '#notificationtemplate-nodata', 'textContent', 'trim', 'done', '\x27)\x22><i\x20class=\x22icon-delete2\x22></i>Delete</a>', 'value', 'warning', 'forEach', '#notificationtemplate-nodata\x20#tryagainbtn', '</div>', 'label', 'innerHTML', 'edit_syntax', '\x27,\x27id\x27:\x27', 'POST', 'edit_delimiter', '-syntax\x22>', '#delimiter', 'selectedformat-error-msg', 'stringify', '5610645lCTDlk', 'success', '/notification/getallservices', 'each', 'error', 'style', '#fullsyntax', 'messageformat', 'startsWith', 'hide', 'isinputrequired', '</td>', '#dialog-for-addservice\x20#servicename', '8CFMgoq', '<td\x20class=\x22px-3\x20py-1\x20profile-td\x22>', 'length', 'text', 'selectedformat-label', '#syntax', 'edit_syntax-label', 'syntax', '-syntax', 'delete', 'modal', '#ff9eac', '.notification_input_effect', '121719uAgEWB', 'selectedformat', 'find', '152216bqMhRF', 'none', 'parent', 'color', 'add', '3210LjNRvD', '.error-msg', '</tr>', 'notification_input_effect', '#notificationtemplate\x20#', 'data', 'is_defaultservice', 'show', '/notificationsettings/serviceoperation', 'val', '<tr\x20data-toggle=\x22collapse\x22\x20data-target=\x22#user-detail\x22\x20class=\x22accordion-toggle\x20cursor-pointer\x22\x20id\x20=', 'parse', 'msg', 'display', 'delimiter', 'edit_syntax-error-msg', 'checked', '16680KHBHLE', 'data-dismiss'];
    _0x4a84 = function () {
        return _0xeebfbc;
    };
    return _0x4a84();
}

function isInputRequired(_0x37ed0e) {
    var _0x35a2e8 = _0x5d77;
    _0x37ed0e[_0x35a2e8(0x207)] == !![] ? (document['getElementById'](_0x35a2e8(0x215))[_0x35a2e8(0x1da)][_0x35a2e8(0x204)] = _0x35a2e8(0x20c), document[_0x35a2e8(0x20f)](_0x35a2e8(0x21a))[_0x35a2e8(0x1c6)] = $(_0x35a2e8(0x1e7))[_0x35a2e8(0x200)]()) : (document['getElementById'](_0x35a2e8(0x215))[_0x35a2e8(0x1da)][_0x35a2e8(0x204)] = _0x35a2e8(0x1f3), document[_0x35a2e8(0x20f)](_0x35a2e8(0x21a))['value'] = '\x20');
}

function _0x5d77(_0x5c1ef4, _0x5a94de) {
    var _0x4a8455 = _0x4a84();
    return _0x5d77 = function (_0x5d7789, _0x523df0) {
        _0x5d7789 = _0x5d7789 - 0x1ab;
        var _0x3ac1ba = _0x4a8455[_0x5d7789];
        return _0x3ac1ba;
    }, _0x5d77(_0x5c1ef4, _0x5a94de);
}

function openAddserviceModal() {
    var _0x5e107a = _0x5d77;
    $(_0x5e107a(0x1ee))[_0x5e107a(0x1d8)](function (_0x375831) {
        var _0x5d2a08 = _0x5e107a;
        id = $(this)[_0x5d2a08(0x210)]('id'), document[_0x5d2a08(0x20f)](id)[_0x5d2a08(0x1c6)] = '', $(this)[_0x5d2a08(0x1f4)]()[_0x5d2a08(0x1f1)]('.error-msg')[_0x5d2a08(0x1e5)]('\x20');
    }), document[_0x5e107a(0x20f)](_0x5e107a(0x205))['value'] = '', document[_0x5e107a(0x20f)]('isinputrequired')[_0x5e107a(0x207)] = ![], document[_0x5e107a(0x20f)]('extrainputfield')['style'][_0x5e107a(0x204)] = _0x5e107a(0x1f3), $('#dialog-for-addservice\x20#addbtn')[_0x5e107a(0x210)](_0x5e107a(0x209), '\x20');
}

function reloadServices() {
    getAllservice();
}

function onFormatSelect(_0x34cbb3) {
    var _0x3cd5c3 = _0x5d77;
    document[_0x3cd5c3(0x20f)](_0x3cd5c3(0x1f0))['textContent'] = _0x34cbb3, document['getElementById'](_0x3cd5c3(0x1d3))['innerHTML'] = '';
}