var _0x3049e4 = _0x2b43;
(function (_0xbb75a3, _0x30b7c6) {
    var _0x1d4a70 = _0x2b43,
        _0xd875bd = _0xbb75a3();
    while (!![]) {
        try {
            var _0x455882 = parseInt(_0x1d4a70(0x207)) / 0x1 * (-parseInt(_0x1d4a70(0x200)) / 0x2) + parseInt(_0x1d4a70(0x20c)) / 0x3 * (-parseInt(_0x1d4a70(0x1f3)) / 0x4) + -parseInt(_0x1d4a70(0x211)) / 0x5 * (parseInt(_0x1d4a70(0x1fb)) / 0x6) + parseInt(_0x1d4a70(0x1d2)) / 0x7 * (parseInt(_0x1d4a70(0x201)) / 0x8) + -parseInt(_0x1d4a70(0x1f2)) / 0x9 + parseInt(_0x1d4a70(0x206)) / 0xa + parseInt(_0x1d4a70(0x216)) / 0xb * (parseInt(_0x1d4a70(0x1e9)) / 0xc);
            if (_0x455882 === _0x30b7c6) break;
            else _0xd875bd['push'](_0xd875bd['shift']());
        } catch (_0x91c8d8) {
            _0xd875bd['push'](_0xd875bd['shift']());
        }
    }
}(_0x456e, 0xf197a));
var clientData = [],
    parsedData;

function _0x2b43(_0x2b92ec, _0x37facf) {
    var _0x456e86 = _0x456e();
    return _0x2b43 = function (_0x2b43e6, _0x171b70) {
        _0x2b43e6 = _0x2b43e6 - 0x1d1;
        var _0xb6df3d = _0x456e86[_0x2b43e6];
        return _0xb6df3d;
    }, _0x2b43(_0x2b92ec, _0x37facf);
}
$(document)[_0x3049e4(0x1fd)](function () {
    var _0x21d037 = _0x3049e4;
    $(_0x21d037(0x1f9))[_0x21d037(0x1f1)](), $(_0x21d037(0x1db))[_0x21d037(0x1ee)](function () {
        inputFocusIn($(this));
    }), $(_0x21d037(0x1db))[_0x21d037(0x1ef)](function (_0x4bd2e0) {
        var _0x3f3ec2 = _0x21d037;
        id = $(this)[_0x3f3ec2(0x1d9)]('id'), $(this)['val']() == '' ? ($('#' + id + _0x3f3ec2(0x1ed))[_0x3f3ec2(0x1e5)]('Field\x20cannot\x20be\x20empty'), $('#' + id + '-label')[_0x3f3ec2(0x205)](_0x3f3ec2(0x1f7), _0x3f3ec2(0x1f0))) : (value = $('#' + id)[_0x3f3ec2(0x1d4)](), value['indexOf']('.') > -0x1 ? $('#' + id + _0x3f3ec2(0x1ed))['text']('') : ($('#' + id + '-error-msg')['text'](_0x3f3ec2(0x20f)), $('#' + id + _0x3f3ec2(0x1e8))[_0x3f3ec2(0x205)]('color', _0x3f3ec2(0x1f0))));
    });
});

function clickOnScanIP() {
    var _0x8f7260 = _0x3049e4;
    $('#dialog-for-autodiscovery\x20#table-view')[_0x8f7260(0x1f1)](), $(_0x8f7260(0x218))['hide'](), $('#total-data')[_0x8f7260(0x202)](0x0), $(_0x8f7260(0x1e0))[_0x8f7260(0x21b)]('disabled', !![]);
    var _0x10a245 = checkAllfeildsfilled(_0x8f7260(0x1fc));
    if (!_0x10a245) return ![];
    var _0xdd08 = $(_0x8f7260(0x1f5))[_0x8f7260(0x1d4)](),
        _0x247ca7 = $(_0x8f7260(0x1ff))[_0x8f7260(0x1d4)]();
    if (_0xdd08[_0x8f7260(0x1f6)]('.') > -0x1 && _0x247ca7[_0x8f7260(0x1f6)]('.') > -0x1) {
        var _0x5eca0e = _0xdd08['split']('.'),
            _0x4942a4 = _0x247ca7[_0x8f7260(0x1f8)]('.');
        if (_0x5eca0e[_0x8f7260(0x20a)] === _0x4942a4[_0x8f7260(0x20a)]) {
            var _0x4c7d51 = _0x5eca0e[_0x8f7260(0x20a)],
                _0x290a45 = parseInt(_0x5eca0e[_0x4c7d51 - 0x1]),
                _0x2b904b = parseInt(_0x4942a4[_0x4c7d51 - 0x1]);
            for (var _0x14e67b = 0x0; _0x14e67b < _0x4c7d51 - 0x1; _0x14e67b++) {
                if (_0x5eca0e[_0x14e67b] !== _0x4942a4[_0x14e67b]) return swal(_0x8f7260(0x1da), '', _0x8f7260(0x1d1)), ![];
            }
            if (_0x2b904b <= _0x290a45) return swal({
                'title': _0x8f7260(0x204),
                'text': _0x8f7260(0x1fe),
                'type': _0x8f7260(0x1d1),
                'showCancelButton': ![],
                'confirmButtonClass': _0x8f7260(0x20d),
                'confirmButtonText': _0x8f7260(0x1d6)
            }), ![];
        } else return swal({
            'title': _0x8f7260(0x204),
            'text': _0x8f7260(0x1d5),
            'type': 'error',
            'showCancelButton': ![],
            'confirmButtonClass': _0x8f7260(0x20d),
            'confirmButtonText': 'Try\x20again'
        }), ![];
    } else return swal({
        'title': _0x8f7260(0x204),
        'text': _0x8f7260(0x217),
        'type': 'error',
        'showCancelButton': ![],
        'confirmButtonClass': _0x8f7260(0x20d),
        'confirmButtonText': _0x8f7260(0x1d6)
    }), ![];
    $(_0x8f7260(0x1de))[_0x8f7260(0x1d9)](_0x8f7260(0x20e), '#dialog-for-autodiscovery'), requestDataFromServer(_0x8f7260(0x209), {
        'from': _0xdd08,
        'to': _0x247ca7
    }, 'GET')[_0x8f7260(0x1dc)](getAutoDiscoverData);
}

function getAutoDiscoverData(_0x1545bb) {
    var _0x29b328 = _0x3049e4;
    response = JSON[_0x29b328(0x215)](_0x1545bb), response && response[_0x29b328(0x1ea)] == 0xc8 ? (parsedData = response[_0x29b328(0x1e1)], clientData = parsedData, parsedData[_0x29b328(0x20a)] == 0x0 ? ($(_0x29b328(0x1f9))[_0x29b328(0x1f1)](), $(_0x29b328(0x218))[_0x29b328(0x1fa)](), $(_0x29b328(0x21a))[_0x29b328(0x21b)](_0x29b328(0x1dd), ![]), $(_0x29b328(0x1ec))[_0x29b328(0x1e5)](_0x29b328(0x203)), $('#total-data')[_0x29b328(0x202)](0x0), $('#dialog-for-autodiscovery\x20#addbtn')[_0x29b328(0x21b)](_0x29b328(0x1dd), !![])) : ($(_0x29b328(0x1f9))[_0x29b328(0x1fa)](), $(_0x29b328(0x218))['hide'](), $(_0x29b328(0x213))[_0x29b328(0x202)](parsedData[_0x29b328(0x20a)]), $(_0x29b328(0x1e0))['prop'](_0x29b328(0x1dd), ![]), addDiscoverRows())) : ($(_0x29b328(0x1f9))[_0x29b328(0x1f1)](), $(_0x29b328(0x218))[_0x29b328(0x1fa)](), $('#autodiscovery-nodata\x20#tryagainbtn')['prop'](_0x29b328(0x1dd), ![]), $(_0x29b328(0x1ec))[_0x29b328(0x1e5)](_0x29b328(0x1e6)), $(_0x29b328(0x213))[_0x29b328(0x202)](0x0), $(_0x29b328(0x1e0))['prop'](_0x29b328(0x1dd), !![]));
}

function addDiscoverRows() {
    var _0x330a2d = _0x3049e4,
        _0x136f13 = '',
        _0x44fdc7 = '';
    $[_0x330a2d(0x208)](parsedData, function (_0x257ed8, _0x1bc5a9) {
        var _0x596938 = _0x330a2d;
        _0x257ed8 == 0x0 && (_0x44fdc7 += _0x596938(0x20b)), _0x136f13 += _0x596938(0x1e7), $['each'](_0x1bc5a9, function (_0x269f3e, _0x74c4bb) {
            var _0x103d92 = _0x596938;
            _0x257ed8 == 0x0 && (_0x44fdc7 += _0x103d92(0x1e3) + _0x269f3e + _0x103d92(0x1d8)), _0x136f13 += _0x103d92(0x1e3) + _0x74c4bb + _0x103d92(0x1d8);
        }), _0x257ed8 == 0x0 && (_0x44fdc7 += _0x596938(0x1d3)), _0x136f13 += _0x596938(0x1d3);
    }), $(_0x330a2d(0x1e2))[_0x330a2d(0x1e4)](), $(_0x330a2d(0x1e2))[_0x330a2d(0x212)](_0x44fdc7), $('#dialog-for-autodiscovery\x20tbody')[_0x330a2d(0x1e4)](), $(_0x330a2d(0x210))[_0x330a2d(0x212)](_0x136f13);
}

function addDataToServer() {
    var _0x1b9c26 = _0x3049e4;
    if (clientData[_0x1b9c26(0x20a)] > 0x0) {
        var _0x5070c2 = $(_0x1b9c26(0x1f5))[_0x1b9c26(0x1d4)](),
            _0x34608f = '';
        if (_0x5070c2[_0x1b9c26(0x1f6)]('.') > -0x1) {
            var _0x39b222 = _0x5070c2[_0x1b9c26(0x1f8)]('.');
            for (var _0x1a2008 = 0x0; _0x1a2008 < _0x39b222[_0x1b9c26(0x20a)] - 0x1; _0x1a2008++) {
                if (_0x34608f !== '') _0x34608f += '.';
                _0x34608f += _0x39b222[_0x1a2008];
            }
        }
        $(_0x1b9c26(0x1e0))[_0x1b9c26(0x1d9)]('data-dismiss', 'modal'), requestDataFromServer(_0x1b9c26(0x219), {
            'subnet': _0x34608f,
            'clientData': JSON['stringify'](clientData),
            'csrfmiddlewaretoken': csfr_token
        }, _0x1b9c26(0x1d7))['done'](handleDiscoverResponse);
    } else swal(_0x1b9c26(0x1f4), '', _0x1b9c26(0x1d1));
}

function _0x456e() {
    var _0x205152 = ['#autodiscoverytemplate\x20.auto_input_effect', 'done', 'disabled', '#autodiscoverytemplate\x20#submit_scan', 'btn-success', '#dialog-for-autodiscovery\x20#addbtn', 'data', '#dialog-for-autodiscovery\x20.table-head', '<td>', 'empty', 'text', 'Something\x20went\x20wrong.\x20Please\x20try\x20again', '<tr>', '-label', '108YQGCKO', 'status', 'Not\x20able\x20to\x20save\x20data', '#autodiscovery-nodata\x20#nodatamessage', '-error-msg', 'focus', 'focusout', '#ff9eac', 'hide', '8086923HPIukc', '66524sZAvws', 'Select\x20servers\x20to\x20be\x20added', '#frominput', 'indexOf', 'color', 'split', '#dialog-for-autodiscovery\x20#table-view', 'show', '1519374cdhDWg', 'auto_input_effect', 'ready', 'Increase\x20the\x20To\x20range\x20and\x20try\x20again', '#toinput', '2nmQVrD', '4571336LOzejQ', 'html', 'No\x20data\x20available', 'Error', 'css', '16791040wWuWgl', '743089uLZJjP', 'each', '/autodiscover/getdiscoverydetails', 'length', '<tr\x20class=\x22text-uppercase\x20size12\x20bold-text\x22>', '144fkskKf', 'btn-danger', 'data-target', 'Invalid\x20IP\x20Format', '#dialog-for-autodiscovery\x20tbody', '15IvhwGU', 'append', '#total-data', 'Successfully\x20saved\x20data.\x20You\x20can\x20start\x20onboarding\x20the\x20saved\x20servers.', 'parse', '1671065wKyppd', 'Invalid\x20IP\x20format', '#autodiscovery-nodata', '/autodiscover/savedata', '#autodiscovery-nodata\x20#tryagainbtn', 'prop', 'hasOwnProperty', 'error', '14zAurzS', '</tr>', 'val', 'Invalid\x20IP\x20range', 'Try\x20again', 'POST', '</td>', 'attr', 'Invalid\x20IP\x20Range\x20Entered.\x20IP\x27s\x20Entered\x20have\x20to\x20be\x20in\x20same\x20segment'];
    _0x456e = function () {
        return _0x205152;
    };
    return _0x456e();
}

function handleDiscoverResponse(_0xb132d0) {
    var _0x5f3146 = _0x3049e4;
    res = JSON[_0x5f3146(0x215)](_0xb132d0), res[_0x5f3146(0x1ea)] == 0xc8 ? (data = res[_0x5f3146(0x1e1)], data[_0x5f3146(0x21c)]('stats') ? swal({
        'title': 'Success',
        'text': _0x5f3146(0x214),
        'type': 'success',
        'confirmButtonClass': _0x5f3146(0x1df),
        'confirmButtonText': 'OK'
    }, function (_0x5d961e) {
        _0x5d961e && location['reload']();
    }) : swal({
        'title': 'Error',
        'text': _0x5f3146(0x1eb),
        'type': 'error',
        'showCancelButton': ![],
        'confirmButtonClass': _0x5f3146(0x20d),
        'confirmButtonText': _0x5f3146(0x1d6)
    })) : swal({
        'title': _0x5f3146(0x204),
        'text': _0x5f3146(0x1e6),
        'type': _0x5f3146(0x1d1),
        'showCancelButton': ![],
        'confirmButtonClass': _0x5f3146(0x20d),
        'confirmButtonText': _0x5f3146(0x1d6)
    });
}

function reScan() {
    clickOnScanIP();
}