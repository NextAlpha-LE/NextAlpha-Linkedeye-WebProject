var _0x45be5d = _0x559d;
(function (_0x1fa918, _0x3d5575) {
    var _0x2309e3 = _0x559d,
        _0x34c10a = _0x1fa918();
    while (!![]) {
        try {
            var _0x27345b = parseInt(_0x2309e3(0xbf)) / 0x1 * (parseInt(_0x2309e3(0xb1)) / 0x2) + -parseInt(_0x2309e3(0xf1)) / 0x3 * (parseInt(_0x2309e3(0x99)) / 0x4) + -parseInt(_0x2309e3(0xcc)) / 0x5 * (parseInt(_0x2309e3(0xa1)) / 0x6) + -parseInt(_0x2309e3(0xc8)) / 0x7 * (parseInt(_0x2309e3(0xd6)) / 0x8) + parseInt(_0x2309e3(0xa8)) / 0x9 + -parseInt(_0x2309e3(0xaf)) / 0xa + parseInt(_0x2309e3(0xd8)) / 0xb * (parseInt(_0x2309e3(0xa9)) / 0xc);
            if (_0x27345b === _0x3d5575) break;
            else _0x34c10a['push'](_0x34c10a['shift']());
        } catch (_0x490846) {
            _0x34c10a['push'](_0x34c10a['shift']());
        }
    }
}(_0x1e1d, 0xc17c0), applicationname = '', isEdit = ![], rowid = 0x1, requestData = {}, message = $(_0x45be5d(0xa4)), $(document)[_0x45be5d(0xe9)](function () {
    var _0x557d6a = _0x45be5d;
    $(_0x557d6a(0xa0))['hide'](), $(_0x557d6a(0xcb))[_0x557d6a(0xca)](function (_0x3123f4) {
        var _0x1d8667 = _0x557d6a;
        $(this)[_0x1d8667(0xea)]() == '' || $(this)[_0x1d8667(0xea)]() == null ? ($(this)[_0x1d8667(0x9c)]()[_0x1d8667(0xdf)](_0x1d8667(0xb4))[_0x1d8667(0xf5)]('color', '#ff9eac'), $(this)[_0x1d8667(0x9c)]()[_0x1d8667(0xdf)](_0x1d8667(0x9f))[_0x1d8667(0x97)]('Field\x20cannot\x20be\x20empty')) : $(this)['parent']()[_0x1d8667(0xdf)](_0x1d8667(0x9f))[_0x1d8667(0x97)]('');
    }), getApplicationName();
}));

function getApplicationName() {
    var _0x544ead = _0x45be5d;
    requestDataFromServer('/applications/getallapplicationnames', {}, _0x544ead(0xd4))[_0x544ead(0xb6)](applicationNamesResponse);
}

function applicationNamesResponse(_0x4fc72e) {
    var _0x180bc5 = _0x45be5d;
    res = JSON[_0x180bc5(0xae)](_0x4fc72e);
    if (res[_0x180bc5(0xb3)] == 0xc8) {
        $('#applicationtemplate\x20#table-view')['show'](), $('#applicationtemplate-nodata')[_0x180bc5(0xb0)](), $(_0x180bc5(0xc3))[_0x180bc5(0x9b)]();
        var _0xbe1193 = '';
        res[_0x180bc5(0xd5)][_0x180bc5(0xe3)](function (_0x4c43ad) {
            var _0x15dc93 = _0x180bc5;
            _0xbe1193 += '<option\x20value=\x22' + _0x4c43ad['applicationname'] + '-' + _0x4c43ad['id'] + '\x22>' + _0x4c43ad[_0x15dc93(0xab)] + _0x15dc93(0xcd);
        }), $(_0x180bc5(0xc3))['append'](_0xbe1193);
    } else $(_0x180bc5(0xa0))['hide'](), $(_0x180bc5(0xe7))[_0x180bc5(0xa7)](), $(_0x180bc5(0xc1))[_0x180bc5(0xd0)](_0x180bc5(0xd3), ![]), $('#applicationtemplate-nodata\x20#nodatamessage')[_0x180bc5(0x97)](res['msg']);
}

function reloadApplications() {
    getApplicationNames();
}

function addApplication(_0x155539) {
    var _0x37968b = _0x45be5d;
    serviceHtml = '\x20', serviceHtml += _0x37968b(0xf4) + _0x155539['id'] + '>', serviceHtml += _0x37968b(0x9a), serviceHtml += _0x37968b(0xa2), serviceHtml += '<td\x20class=\x22pl-0\x22>' + _0x155539[_0x37968b(0xab)] + _0x37968b(0xa2), serviceHtml += _0x37968b(0xed), serviceHtml += '<div\x20class=\x22dropdown\x20custom-dropdown\x20mr-3\x22>', serviceHtml += _0x37968b(0xc7), serviceHtml += '<div\x20class=\x22dropdown-menu\x22\x20aria-labelledby=\x22moreoption\x22>', serviceHtml += '<a\x20class=\x22dropdown-item\x22\x20onclick=\x22onDeleteApplication(\x27' + _0x155539['id'] + _0x37968b(0xda), serviceHtml += '</div>', serviceHtml += _0x37968b(0xa2), serviceHtml += _0x37968b(0xbd), $('#applicationtemplate\x20#data\x20tbody')[_0x37968b(0xb8)](serviceHtml);
}

function _0x1e1d() {
    var _0xd2d9f2 = ['#applicationtemplate\x20#message', 'map', '#ff9eac', 'show', '12553965SdyBGj', '24TVYAjk', 'modal', 'applicationname', 'download', '/applications/exportsnmp', 'parse', '86280XZYQYi', 'hide', '2286732kqhcir', '#applicationtemplate\x20#', 'status', 'label', '/applications/exportmgmntdata', 'done', 'msg', 'append', 'warning', 'remove', '\x0d\x0a\x0d\x0a', 'join', '</tr>', 'rowid', '1qRGQed', 'delete', '#applicationtemplate-nodata\x20#tryagainbtn', 'text/plain', '#selectedapplication', 'split', 'stringify', 'add', '<button\x20class=\x22btn\x20btn-default\x20btn-ripple\x20btn-dropdown-link\x20dropdown-toggle\x20icon-dropdown\x22\x20type=\x22button\x22\x20id=\x22moreoption\x22\x20data-toggle=\x22dropdown\x22\x20aria-haspopup=\x22true\x22\x20aria-expanded=\x22false\x22\x20>\x20<i\x20class=\x22icon-more_option\x22\x20style=\x22color:#6c757d\x22></i>\x20</button>', '500843bMIVyQ', 'Want\x20to\x20permanently\x20delete\x20this\x20application?', 'focusout', '.application_input_effect', '453165SgStrS', '</option>', 'getElementById', 'appendChild', 'prop', 'selectedapplication', 'Management', 'disabled', 'GET', 'data', '120urkgNJ', '#dialog-for-addapplication\x20#addbtn', '11335335rwxafR', 'href', '\x27)\x22><i\x20class=\x22icon-delete2\x22></i>Delete</a>', 'attr', '#dialog-for-addapplication\x20#applicationname', 'createObjectURL', 'Yes,\x20delete', 'find', '#dialog-for-addapplication\x20#applicationname-label', '#dialog-for-addapplication\x20#applicationname-error-msg', 'createElement', 'forEach', '#cancelbtn', 'innerHTML', 'value', '#applicationtemplate-nodata', 'URL', 'ready', 'val', 'POST', 'data-dismiss', '<td\x20class=\x22p-0\x20action-btn\x22>', 'SNMP', 'click', 'keys', '3824154hpZKWa', 'body', '/applications/applicationactions', '<tr\x20id\x20=', 'css', 'error', 'text', 'operation', '4EafaJJ', '<td\x20class=\x22px-3\x20py-1\x22>', 'empty', 'parent', 'webkitURL', '/applications/exportnewonb', '.error-msg', '#applicationtemplate\x20#table-view', '96VMySQE', '</td>', 'success'];
    _0x1e1d = function () {
        return _0xd2d9f2;
    };
    return _0x1e1d();
}

function onDeleteApplication() {
    var _0x50a86d = _0x45be5d;
    rowid = document[_0x50a86d(0xce)](_0x50a86d(0xd1))['value'][_0x50a86d(0xc4)]('-')[0x1], data = {}, requestData = {}, data['operation'] = _0x50a86d(0xc0), data[_0x50a86d(0xbe)] = rowid, requestData[_0x50a86d(0xd5)] = data, swal({
        'title': 'Delete\x20Application',
        'text': _0x50a86d(0xc9),
        'type': _0x50a86d(0xb9),
        'showCancelButton': !![],
        'confirmButtonClass': 'btn-danger',
        'confirmButtonText': _0x50a86d(0xde),
        'closeOnConfirm': ![]
    }, function () {
        var _0x392a95 = _0x50a86d;
        requestDataFromServer(_0x392a95(0xf3), {
            'clientData': JSON[_0x392a95(0xc5)](requestData),
            'csrfmiddlewaretoken': csfr_token
        }, _0x392a95(0xeb))[_0x392a95(0xb6)](function (_0x903eca) {
            var _0x18eb69 = _0x392a95;
            $(_0x18eb69(0xe4))['trigger']('click'), _0x903eca && _0x903eca[_0x18eb69(0xb3)] == 0xc8 ? (rowid = _0x903eca[_0x18eb69(0xbe)], getApplicationName(), $(_0x18eb69(0xb2) + rowid)[_0x18eb69(0xba)](), message[_0x18eb69(0x97)](_0x903eca[_0x18eb69(0xb7)]), swal(_0x903eca[_0x18eb69(0xb7)], '\x20', _0x18eb69(0xa3))) : swal(_0x903eca[_0x18eb69(0xb7)], '\x20', 'error');
        });
    });
}

function onAddApplication() {
    var _0x20be1f = _0x45be5d;
    if ($(_0x20be1f(0xdc))['val']() == '') return $(_0x20be1f(0xe0))[_0x20be1f(0xf5)]('color', _0x20be1f(0xa6)), $(_0x20be1f(0xe1))[_0x20be1f(0x97)]('Field\x20cannot\x20be\x20empty'), ![];
    else $(_0x20be1f(0xe1))[_0x20be1f(0x97)](''), requestData = {}, data = {}, data[_0x20be1f(0xab)] = $(_0x20be1f(0xdc))[_0x20be1f(0xea)](), data[_0x20be1f(0x98)] = _0x20be1f(0xc6), data[_0x20be1f(0xbe)] = rowid, requestData[_0x20be1f(0xd5)] = data, $(_0x20be1f(0xd7))[_0x20be1f(0xdb)](_0x20be1f(0xec), _0x20be1f(0xaa)), requestDataFromServer(_0x20be1f(0xf3), {
        'clientData': JSON['stringify'](requestData),
        'csrfmiddlewaretoken': csfr_token
    }, _0x20be1f(0xeb))['done'](applicationResp);
}

function _0x559d(_0x3a77de, _0x74a71f) {
    var _0x1e1dd7 = _0x1e1d();
    return _0x559d = function (_0x559df6, _0x5dbae4) {
        _0x559df6 = _0x559df6 - 0x97;
        var _0x53eed7 = _0x1e1dd7[_0x559df6];
        return _0x53eed7;
    }, _0x559d(_0x3a77de, _0x74a71f);
}

function openAddapplicationModal() {
    var _0x108075 = _0x45be5d;
    document[_0x108075(0xce)]('applicationname-error-msg')[_0x108075(0xe5)] = '', document[_0x108075(0xce)](_0x108075(0xab))[_0x108075(0xe6)] = '';
}

function applicationResp(_0x132eea) {
    var _0x54304c = _0x45be5d;
    data = requestData[_0x54304c(0xd5)], _0x132eea && _0x132eea['status'] == 0xc8 ? (data['id'] = _0x132eea['rowid'], getApplicationName(), swal(_0x132eea[_0x54304c(0xb7)], '\x20', _0x54304c(0xa3))) : swal(_0x132eea[_0x54304c(0xb7)], '\x20', 'error');
}

function applicationResponse(_0x41ba42) {
    var _0x47973c = _0x45be5d;
    data = requestData['data'], _0x41ba42 && _0x41ba42['status'] == 0xc8 ? (data['id'] = _0x41ba42['rowid'], getApplicationName(), swal(_0x41ba42['msg'], '\x20', _0x47973c(0xa3))) : swal(_0x41ba42[_0x47973c(0xb7)], '\x20', _0x47973c(0xf6));
}

function exportalldata() {
    var _0x6a106c = _0x45be5d;
    requestDataFromServer(_0x6a106c(0x9e), {}, _0x6a106c(0xd4))[_0x6a106c(0xb6)](function (_0x34734d) {
        exportData(_0x34734d, 'Onboard');
    }), requestDataFromServer(_0x6a106c(0xb5), {}, _0x6a106c(0xd4))[_0x6a106c(0xb6)](function (_0x485636) {
        var _0x52e007 = _0x6a106c;
        exportData(_0x485636, _0x52e007(0xd2));
    }), requestDataFromServer(_0x6a106c(0xad), {}, _0x6a106c(0xd4))[_0x6a106c(0xb6)](function (_0x3e1b68) {
        var _0x511355 = _0x6a106c;
        exportData(_0x3e1b68, _0x511355(0xee));
    });
}

function exportData(_0x4045c7, _0x5dd503) {
    var _0x6f4849 = _0x45be5d,
        _0x3f29f0 = '',
        _0x4b2048 = JSON[_0x6f4849(0xae)](_0x4045c7);
    _0x4b2048['data'][_0x6f4849(0xe3)](function (_0x3ab60f) {
        var _0x141a1a = _0x6f4849;
        _0x3f29f0 += Object[_0x141a1a(0xf0)](_0x3ab60f)[_0x141a1a(0xa5)](function (_0x27fdd7) {
            return _0x27fdd7 + ':\x20' + _0x3ab60f[_0x27fdd7];
        })[_0x141a1a(0xbc)]('\x0d\x0a') + _0x141a1a(0xbb);
    });
    const _0x2913eb = new Blob([_0x3f29f0], {
        'type': _0x6f4849(0xc2)
    });
    let _0x2b9423 = document[_0x6f4849(0xe2)]('a');
    _0x2b9423[_0x6f4849(0xac)] = _0x5dd503, window[_0x6f4849(0x9d)] != null ? _0x2b9423[_0x6f4849(0xd9)] = window['webkitURL'][_0x6f4849(0xdd)](_0x2913eb) : (_0x2b9423[_0x6f4849(0xd9)] = window[_0x6f4849(0xe8)][_0x6f4849(0xdd)](_0x2913eb), _0x2b9423['style']['display'] = 'none', document[_0x6f4849(0xf2)][_0x6f4849(0xcf)](_0x2b9423)), _0x2b9423[_0x6f4849(0xef)]();
}