var _0x14f739 = _0x5d24;
(function (_0x4b0b51, _0x42461a) {
    var _0x29faac = _0x5d24,
        _0x476a2d = _0x4b0b51();
    while (!![]) {
        try {
            var _0x34f3f3 = parseInt(_0x29faac(0xe6)) / 0x1 * (parseInt(_0x29faac(0xec)) / 0x2) + parseInt(_0x29faac(0xee)) / 0x3 * (parseInt(_0x29faac(0x10d)) / 0x4) + -parseInt(_0x29faac(0x117)) / 0x5 + parseInt(_0x29faac(0xf4)) / 0x6 + -parseInt(_0x29faac(0xf7)) / 0x7 * (-parseInt(_0x29faac(0xe1)) / 0x8) + parseInt(_0x29faac(0xf8)) / 0x9 * (-parseInt(_0x29faac(0xe5)) / 0xa) + -parseInt(_0x29faac(0x10f)) / 0xb;
            if (_0x34f3f3 === _0x42461a) break;
            else _0x476a2d['push'](_0x476a2d['shift']());
        } catch (_0x1f58f0) {
            _0x476a2d['push'](_0x476a2d['shift']());
        }
    }
}(_0x41b8, 0x580ab));
var arr = [_0x14f739(0xf5), 'fs-dev-asp-rtl-htspr1', 'fs-uat-p1', _0x14f739(0xff)],
    siteInput = document[_0x14f739(0x10b)](_0x14f739(0xd5)),
    siteOptions = document[_0x14f739(0x10b)](_0x14f739(0xdb)),
    filter_json = {},
    div_name = '';

function submitSelection() {
    var _0x3db504 = _0x14f739,
        _0x297d4f = siteInput['value'];
    console[_0x3db504(0x116)](_0x3db504(0xe8), _0x297d4f);
}

function mytimeout() {
    clearTimeout(mytimeout);
}

function selectGitMaster() {
    var _0x3a4f7d = _0x14f739;
    $(_0x3a4f7d(0xef))[_0x3a4f7d(0xf6)](_0x3a4f7d(0x102)), $('#versiongit-selection')[_0x3a4f7d(0x10a)](_0x3a4f7d(0x102)), requestDataFromServer('/lesites/getallsitenames', {
        'type': _0x3a4f7d(0xd7),
        'isOnlyEnabled': !![]
    }, _0x3a4f7d(0xd3))['done'](function (_0x2bdd36) {
        var _0x4a6b81 = _0x3a4f7d;
        if (_0x2bdd36 == undefined) return;
        sitesResponse = JSON[_0x4a6b81(0x113)](_0x2bdd36), sitesData = sitesResponse[_0x4a6b81(0xeb)], sortOn(sitesData, 'sitename');
        var _0x368a0e = '';
        sitesData[_0x4a6b81(0x110)] > 0x0 && sitesData[_0x4a6b81(0xfe)](function (_0x63d9b7) {
            var _0x3a16c0 = _0x4a6b81;
            _0x368a0e += _0x3a16c0(0x105) + _0x63d9b7[_0x3a16c0(0x109)] + '\x22>' + _0x63d9b7['sitename'] + _0x3a16c0(0xe3);
        }), $(_0x4a6b81(0x100))['append'](_0x368a0e);
    });
}

function _0x5d24(_0xe7d111, _0x2304ad) {
    var _0x41b80d = _0x41b8();
    return _0x5d24 = function (_0x5d2429, _0x454126) {
        _0x5d2429 = _0x5d2429 - 0xd3;
        var _0x29b15f = _0x41b80d[_0x5d2429];
        return _0x29b15f;
    }, _0x5d24(_0xe7d111, _0x2304ad);
}

function _0x41b8() {
    var _0x5ee70d = ['from', 'forEach', 'fs-uat-asp-ifsc1', '#selectedgitmastertype', '\x0a<option\x20value=\x22', 'display-block', 'push', '#config-map', '<option\x20value=\x22', 'innerHTML', 'stringify', 'full-height', 'sitename', 'addClass', 'getElementById', '#emp-table\x20>\x20tbody\x20>\x20tr', '1668YBwQuI', 'td:nth-child(', '6508854xAqRGT', 'length', 'OPTION\x20VLUE-->', 'getAttribute', 'parse', 'col-index', 'all', 'log', '2445865PKwmvE', 'select2', 'value', 'GET', '.mul-select', 'siteInput', '#versiongit-selection', 'userbased', 'selectedgitmastertype', 'querySelectorAll', 'parentElement', 'siteOptions', 'childNodes', '#configmap', 'html', 'done', '/comparision/configmapCompare', '64JyzmRk', '.table-filter', '</option>', 'select\x20sites', '960460OzELOs', '367XUlPnu', '#configmapdiv', 'Selected\x20Site:', 'filter', 'empty', 'data', '988AmOQsS', 'querySelector', '3951lCeNpw', '#option-selection', 'map', 'trim', 'versions', 'closest', '3850326voKdTw', 'fs-dev-asp-rtl-actv1', 'removeClass', '144676wGDfUm', '9CJlHiF', 'table', 'select', 'emp-table', 'configmapdiv'];
    _0x41b8 = function () {
        return _0x5ee70d;
    };
    return _0x41b8();
}

function versioncompareDiv() {
    var _0x23e559 = _0x14f739;
    divname = _0x23e559(0xf2), div_name = divname, $(_0x23e559(0xd6))[_0x23e559(0xf6)](_0x23e559(0x102)), $(_0x23e559(0xdd))[_0x23e559(0x10a)](_0x23e559(0x102)), showLoader(_0x23e559(0xfc));
    var _0x5dc1e0 = {},
        _0x387988 = document[_0x23e559(0x10b)](_0x23e559(0xd8))['value'];
    requestDataFromServer('/comparision/versionCompare', {
        'site': '',
        'filter_json': JSON[_0x23e559(0x107)](_0x5dc1e0),
        'type': divname,
        'master': _0x387988
    }, _0x23e559(0xd3))['done'](function (_0x4dcdf3) {
        var _0x1c89c7 = _0x23e559;
        stopLoader(_0x1c89c7(0xfc)), $(_0x1c89c7(0x104))['removeClass'](_0x1c89c7(0x108)), $(_0x1c89c7(0xe7))[_0x1c89c7(0xf6)](_0x1c89c7(0x108)), $('#configmapdiv')['html'](_0x4dcdf3), setTimeout($(_0x1c89c7(0xd4))['select2']({
            'placeholder': 'select\x20sites',
            'tags': !![]
        }), 0xbb8);
        var _0x847515 = document['querySelector'](_0x1c89c7(0xf9));
        _0x847515['id'] = _0x1c89c7(0xfb);
    });
}

function switchAllDiv(_0x4e616f) {
    var _0x748df4 = _0x14f739;
    div_name = _0x4e616f, $(_0x748df4(0xef))[_0x748df4(0xf6)](_0x748df4(0x102)), $('#' + _0x4e616f)[_0x748df4(0x10a)](_0x748df4(0x102)), showLoader('configmapdiv');
    var _0x4a91c1 = {};
    requestDataFromServer(_0x748df4(0xe0), {
        'site': '',
        'filter_json': JSON[_0x748df4(0x107)](_0x4a91c1),
        'type': _0x4e616f
    }, _0x748df4(0xd3))[_0x748df4(0xdf)](function (_0x32d5af) {
        var _0x37301d = _0x748df4;
        stopLoader(_0x37301d(0xfc)), $(_0x37301d(0x104))[_0x37301d(0xf6)](_0x37301d(0x108)), $(_0x37301d(0xe7))[_0x37301d(0xf6)](_0x37301d(0x108)), $(_0x37301d(0xe7))[_0x37301d(0xde)](_0x32d5af), setTimeout($('.mul-select')['select2']({
            'placeholder': _0x37301d(0xe4),
            'tags': !![]
        }), 0xbb8);
        var _0x237120 = document['querySelector'](_0x37301d(0xf9));
        _0x237120['id'] = _0x37301d(0xfb);
    });
}

function getUniqueValuesFromColumn() {
    var _0x31da4d = _0x14f739,
        _0xd955ba = {};
    allFilters = document[_0x31da4d(0xd9)]('.table-filter'), allFilters[_0x31da4d(0xfe)](_0x18a8e7 => {
        var _0x3ad10b = _0x31da4d;
        col_index = _0x18a8e7[_0x3ad10b(0xda)][_0x3ad10b(0x112)]('col-index');
        const _0x1c7d52 = document['querySelectorAll'](_0x3ad10b(0x10c));
        _0x1c7d52[_0x3ad10b(0xfe)](_0x575eeb => {
            var _0x8e9437 = _0x3ad10b;
            cell_value = _0x575eeb[_0x8e9437(0xed)](_0x8e9437(0x10e) + col_index + ')')[_0x8e9437(0x106)];
            if (col_index in _0xd955ba) {
                if (_0xd955ba[col_index]['includes'](cell_value)) { } else _0xd955ba[col_index][_0x8e9437(0x103)](cell_value);
            } else _0xd955ba[col_index] = new Array(cell_value);
        });
    });
    for (i in _0xd955ba) { }
    updateSelectOptions(_0xd955ba);
};

function updateSelectOptions(_0x2eef72) {
    var _0x4dd087 = _0x14f739;
    allFilters = document[_0x4dd087(0xd9)](_0x4dd087(0xe2)), allFilters[_0x4dd087(0xfe)](_0x972302 => {
        var _0x39e096 = _0x4dd087;
        col_index = _0x972302[_0x39e096(0xda)][_0x39e096(0x112)](_0x39e096(0x114)), _0x2eef72[col_index][_0x39e096(0xfe)](_0x315dbe => {
            var _0x262a04 = _0x39e096;
            _0x972302[_0x262a04(0x106)] = _0x972302[_0x262a04(0x106)] + (_0x262a04(0x101) + _0x315dbe + '\x22>' + _0x315dbe + _0x262a04(0xe3));
        });
    }), $(_0x4dd087(0xd4))[_0x4dd087(0x118)]({
        'placeholder': 'select\x20sites',
        'tags': !![]
    });
};

function filter_rows() {
    var _0x54c39a = _0x14f739;
    const _0x4201f6 = document[_0x54c39a(0x10b)](_0x54c39a(0xfb)),
        _0x258d5c = _0x4201f6[_0x54c39a(0xd9)](_0x54c39a(0xe2));
    filter_json = {}, showLoader(_0x54c39a(0xfc)), _0x258d5c[_0x54c39a(0xfe)](function (_0x4ca2f) {
        var _0x3b1ab2 = _0x54c39a;
        const _0x4018b0 = _0x4ca2f[_0x3b1ab2(0xf3)]('th')['querySelector'](_0x3b1ab2(0xfa))[_0x3b1ab2(0xda)][_0x3b1ab2(0xdc)][0x0]['textContent'][_0x3b1ab2(0xf1)](),
            _0x1a4354 = Array[_0x3b1ab2(0xfd)](_0x4ca2f['selectedOptions'])[_0x3b1ab2(0xf0)](function (_0x260a18) {
                var _0x1bbcb8 = _0x3b1ab2;
                return console[_0x1bbcb8(0x116)](_0x1bbcb8(0x111), _0x260a18[_0x1bbcb8(0x119)]), _0x260a18['value'];
            })[_0x3b1ab2(0xe9)](function (_0x571056) {
                var _0x33ce62 = _0x3b1ab2;
                return _0x571056 !== _0x33ce62(0x115) && _0x571056 !== '';
            });
        if (_0x1a4354 != '') filter_json[_0x4018b0] = _0x1a4354;
    }), requestDataFromServer('/comparision/configmapCompare', {
        'site': '',
        'filter_json': JSON[_0x54c39a(0x107)](filter_json),
        'type': div_name
    }, _0x54c39a(0xd3))[_0x54c39a(0xdf)](function (_0x26e27f) {
        var _0x2a29b2 = _0x54c39a;
        $(_0x2a29b2(0xe7))[_0x2a29b2(0xea)](), $('#configmapdiv')[_0x2a29b2(0xde)](_0x26e27f), setTimeout($(_0x2a29b2(0xd4))[_0x2a29b2(0x118)]({
            'placeholder': _0x2a29b2(0xe4),
            'tags': !![]
        }), 0xbb8);
        var _0x58c406 = document[_0x2a29b2(0xed)]('table');
        _0x58c406['id'] = 'emp-table', stopLoader(_0x2a29b2(0xfc));
    });
}