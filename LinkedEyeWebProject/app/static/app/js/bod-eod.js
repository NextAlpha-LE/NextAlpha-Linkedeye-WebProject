var _0x3774cd = _0x38a6;
(function (_0x2da160, _0x499b9f) {
    var _0xf7bf22 = _0x38a6,
        _0x66d16e = _0x2da160();
    while (!![]) {
        try {
            var _0x2a026c = -parseInt(_0xf7bf22(0x269)) / 0x1 + parseInt(_0xf7bf22(0x252)) / 0x2 * (parseInt(_0xf7bf22(0x1b9)) / 0x3) + parseInt(_0xf7bf22(0x19b)) / 0x4 + parseInt(_0xf7bf22(0x275)) / 0x5 * (-parseInt(_0xf7bf22(0x224)) / 0x6) + -parseInt(_0xf7bf22(0x1e9)) / 0x7 + -parseInt(_0xf7bf22(0x1a3)) / 0x8 * (parseInt(_0xf7bf22(0x24c)) / 0x9) + parseInt(_0xf7bf22(0x1de)) / 0xa;
            if (_0x2a026c === _0x499b9f) break;
            else _0x66d16e['push'](_0x66d16e['shift']());
        } catch (_0x3a3ef4) {
            _0x66d16e['push'](_0x66d16e['shift']());
        }
    }
}(_0x3e4f, 0xddfd8));
var params = new URLSearchParams(document['location'][_0x3774cd(0x228)]);
sites = [], selectedsite = '\x20', sites[_0x3774cd(0x1c4)](params['get'](_0x3774cd(0x1f1)));
var selectedsite = params['get'](_0x3774cd(0x1f1));
redisKeys = [];
var bodeodFinalStatus = '',
    connectionTries = 0x6,
    isWSConnected = ![],
    siteHtml = '\x20',
    bodSiteResponse, bodSitesData = [],
    bodeodResponse, colorClass = 'white',
    tables = [],
    sheetname = '',
    excelname = '',
    tablename = '',
    firsttableid = '',
    totalbodlen = 0x0,
    operationsCompletedbod = 0x0,
    export_bodExcel = ![],
    checkbx = '',
    open_rows = !![],
    user_name = '',
    changed_key = '',
    isEdit_dict = {};
$(document)[_0x3774cd(0x26e)](function () {
    var _0x2fd79c = _0x3774cd;
    if (pageName === _0x2fd79c(0x216)) $(_0x2fd79c(0x27a))[_0x2fd79c(0x295)](_0x2fd79c(0x23b), localStorage[_0x2fd79c(0x27d)](_0x2fd79c(0x254)));
    else localStorage[_0x2fd79c(0x22d)](_0x2fd79c(0x254), 'none');
    $(_0x2fd79c(0x1d1))['hide'](), getSiteList(), profilename();
    var _0x498b30 = $(_0x2fd79c(0x1fc));
    _0x498b30[_0x2fd79c(0x182)](function () {
        var _0x129d75 = _0x2fd79c;
        _0x498b30[_0x129d75(0x250)](_0x129d75(0x231));
        var _0x31435e = $(_0x129d75(0x282));
        return _0x498b30[_0x129d75(0x272)](_0x129d75(0x231)) ? (_0x31435e[_0x129d75(0x1c5)]('Update\x20Paused'), open_rows = ![], $(_0x129d75(0x24a))[_0x129d75(0x295)](_0x129d75(0x292), _0x129d75(0x236))) : (refreshBODEOD(), _0x31435e[_0x129d75(0x1c5)]('Live\x20Update'), open_rows = !![], $(_0x129d75(0x24a))[_0x129d75(0x295)](_0x129d75(0x292), _0x129d75(0x1ae))), ![];
    });
});

function refreshBODEOD() {
    var _0x4a7399 = _0x3774cd;
    requestDataFromServer(_0x4a7399(0x25c), {
        'sitename': params[_0x4a7399(0x27b)]('site'),
        'mode': _0x4a7399(0x1e4)
    }, _0x4a7399(0x191))['done'](function (_0x2d688d) {
        var _0x58a7c9 = _0x4a7399;
        if (typeof ledColors === _0x58a7c9(0x1da)) ledColors(selected_sitename, selected_leurl, selected_websocurl);
        if (typeof displayKeys === _0x58a7c9(0x1da)) displayKeys(_0x2d688d[_0x58a7c9(0x213)][0x0], _0x2d688d[_0x58a7c9(0x18d)]);
    });
}

function profilename() {
    var _0x524faf = _0x3774cd;
    requestDataFromServer(_0x524faf(0x1c9), {}, 'GET')[_0x524faf(0x1a5)](getprofilenameResponse);
}

function _0x3e4f() {
    var _0x4a4f6f = ['<h4\x20class=\x22card-titles\x20', '<t>', 'toUpperCase', 'keys', '\x22\x20style=\x22visibility:hidden;height:1px;display:block\x22\x20>', '<td\x20style=\x22color:#e99123\x22>', '</h5>', '_tooltip', 'unshift', 'getSeconds', '</td></tr>', 'BOD:BOD_UPDATED_DATA', 'shift', '<row\x20r=\x22', 'every', '#bod-eodstatus\x20#site-list\x20li\x20a.active', 'remove', '#bod-eodstatus\x20#site-list\x20li\x20a', 'responseData', '.buttons-excel', '<td\x20style=\x22color:#ff3d57\x22>', 'Dashboard', '<c\x20t=\x22inlineStr\x22\x20r=\x22', '<div\x20class=\x22page-header\x22>\x20', 'visible', '<td\x20class=\x22px-5\x20py-1\x20profile-td\x22><a\x20id=\x22', '#file_content', 'collapse', 'split', '\x20</td>', 'addEventListener', 'green', '\x20<a\x20data-toggle=\x22collapse\x22\x20class=\x22accordion-toggle\x20row\x22\x20href=\x22#', 'Failure', '<table>', '71478uTBUUW', '<cols>', '<h5\x20class=\x22size14\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22>Executed\x20On\x20:\x20', 'replace', 'search', '</tbody>', 'red', 'clicksite', '[Content_Types].xml', 'setItem', '</t>', '</th>', '<tbody\x20class=\x22col-12\x22\x20id=\x22mob-width\x22>', 'paused', '<td\x20style=\x22color:#C0C0C0\x22>', '</is>', '\x22\x20\x20>', 'white-bg', '2px\x20solid\x20#ff3d57', 'Successfully\x20commented\x20on\x20\x22', '_li\x20a', 'excel', 'dialog-for-content', 'display', 'forEach', 'data', 'checked', '#bodeodstatus', '1\x22/>', 'child-', 'style', 'key_data', 'includes', '</sheetData>', 'PartName', 'worksheets/sheet', 'userobj', 'workbook.xml.rels', '.playpause-div', 'file_path', '32481iJdqaj', 'DataTable', '</table>', '#syntax', 'toggleClass', 'log', '2tRlGNZ', '/xl/worksheets/sheet', 'newlabeldisplay', '<sheetData>', 'getMonth', 'white', 'isSuccess', '<i\x20data-feather=\x22message-square\x22\x20onclick=\x22openShowcommentModal(this,\x27', '#data', 'parseXML', '/bod-eodstatus/getbodeodkeys', 'rId', '\x20@\x20', '<td\x20style=\x22color:#0000cd\x20\x22>', '</thead>', '</h4>', '-data', 'tooltip', '#16d39a', 'id\x22\x20style=\x22color:#C0C0C0\x22>', 'getMinutes', 'error', '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-addcomment\x22></i>', '414381gPyyUW', '\x20mt-4\x20text-justify\x20float-left\x22>', '</div>', 'sheetId', '<tr\x20class=\x22text-uppercase\x22\x20style=\x22border:\x201px;\x20background-color:\x20#056aa1;\x22>', 'ready', 'active', '#e99123', 'type', 'hasClass', 'append', 'stringify', '50pZCWKk', '<div\x20class=\x22row\x20card-body\x20py-lg-4\x20py-2\x20\x22>', '<table\x20id=\x22data\x22\x20style=\x22border:\x201px;\x20background-color:\x20#191818\x22>', 'empty', 'cloneNode', '#new-label', 'get', '\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22>', 'getItem', 'blue-bg', '\x22\x20style=\x22border:\x201px\x20solid\x20#303234;\x20white-space:nowrap;\x22>', 'block', 'success', '#plps-text', 'isWSConnected', '\x22\x20>', '<tr\x20class=\x22tr-rowclr\x20', 'object', 'addClass', 'html', 'toArray', 'color', 'removeClass', '.dismiss-btn', '<td\x20class=\x22white-text\x20has-details\x20', '</p>', '<h4>', '<th></th>', 'Comment\x20Status', 'border', 'btn-success', 'hidden', 'css', 'Success', 'getElementById', 'key', 'each', 'scrollLeft', '<td>', 'appendChild', '</cols>', '<thead\x20class=\x22table-head\x22\x20style=\x22border:\x201px\x20solid\x20#303234;\x22>', 'edit', 'click', 'filter', '_rels', 'executedOn', '<div\x20class=\x22row\x22>', '\x20</a>', 'username', 'from', 'sheet', '<col\x20min=\x22', '#site-data', 'refreshedsite', 'matrix', '</td>', '#dialog-for-content\x20#nodata', 'GET', 'sheets', 'commented_time', 'name', 'ADDSHEET\x20BOD--->', '#bod-eodstatus\x20#site-list\x20#', 'Bfrtip', 'getHours', '<div\x20class=\x22row\x20py-2\x20site-keys\x22\x20id=\x22', 'visibility', '6752464DwFdyU', '<span\x20class=\x22details\x22>', 'No\x20Keys', '.xml', 'wheel', 'keyName', '\x22\x20data-exclude=\x22true\x22\x20onclick=\x22onFileinfo(\x27', '\x22\x20max=\x22', '1336wDSnSq', '_li\x20', 'done', '<tr\x20class=\x22\x22\x20id=\x22', 'find', '</mergeCells>', 'bodLED', '#dialog-for-content\x20#nodata\x20#nodatamessage', 'getDate', '<div\x20class=\x22accordian-body\x20collapse\x20col-12\x20border-b\x22\x20id=\x22', 'Types', '2px\x20solid\x20#16d39a', '#dialog-for-addcomment', '/bod-eodstatus/updatekeys', '#element_to_load_content_into', 'No\x20Data', '<div\x20class=\x22col-12\x22>', '<i\x20data-feather=\x22edit\x22\x20onclick=\x22openAddcommentModal(this,\x27', 'comment', '.switch_label', 'workbook.xml', 'websocket_url', '1941771wEurwm', 'length', '</tr>', 'file_content', 'Target', '\x20&ensp;>&ensp;\x20<h3\x20class=\x22page-title\x22\x20>\x20BOD\x20Status\x20</h3></div>', 'orange', 'none', '#bod-eodstatus-nodata\x20#nodatamessage', 'deltaY', 'blue', 'push', 'text', 'val', 'Bod\x20enable\x20with\x20live\x20updates', '</worksheet>', '/notificationsettings/getallservices', 'toString', '<table\x20class=\x22row\x22\x20id=\x22display\x22>', 'preventDefault', 'add', 'Relationships', 'children', 'setAttribute', '#bod-eodstatus\x20#table-view', '<mergeCells\x20count=\x221\x22>', 'worksheets', 'failure', '<h5\x20class=\x22col-4\x22\x20style=\x22padding-right:0\x22>Add\x20comment\x20to\x20-\x20</h5><div\x20class=\x22col-8\x22style=\x22color:#e99123;padding-left:0;\x22>', 'code', 'orange-bg', 'bod-eodstatus', 'classList', 'function', 'darker', 'BOD\x20UPDATE\x20PAUSED', '#dialog-for-content\x20#file_content', '3625530hSliBn', '<span>-', 'Override', '<worksheet\x20xmlns=\x22http://schemas.openxmlformats.org/spreadsheetml/2006/main\x22\x20xmlns:r=\x22http://schemas.openxmlformats.org/officeDocument/2006/relationships\x22\x20xmlns:mc=\x22http://schemas.openxmlformats.org/markup-compatibility/2006\x22\x20xmlns:x14ac=\x22http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac\x22\x20mc:Ignorable=\x22x14ac\x22>', 'BOD-', '#bod-eodstatus\x20#site-data', 'BOD', 'table', '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-showcomments\x22></i>', '<td\x20colspan=\x2212\x22\x20class=\x22hiddenRow\x20border-0\x20p-0\x20col-12\x22>', '#bod-eodstatus\x20#bod-eodstatus-expand', '4567080zNksqS', '<tr\x20class=\x22collapse-tr\x20parent\x20row\x22\x20style=\x22background-color:#1f1f1f;visibility:hidden;height:0px\x22\x20id=\x22', '#bod-eodstatus\x20#site-list', 'red-bg', 'site_data', 'getFullYear', 'value', 'getElementsByTagName', 'site', 'emsg', '</td\x20class=\x22details_td\x22>\x20<td>:</td><td\x20class=\x22details_td\x22>', '_li', 'parse', 'querySelector', 'status', '<tr\x20class=\x22border-0\x20collapse-content\x20row\x22\x20id=\x22child-', '<td\x20class=\x22\x22\x20style=\x22color:#808080\x22>', 'replaceAll', '#bod-eodstatus\x20#bod-eodstatus-nodata', '.playpause', 'rows', 'header', '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-content\x22\x20class=\x22profile\x22>OUTPUT</a></td>', 'Redis\x20not\x20reachable.'];
    _0x3e4f = function () {
        return _0x4a4f6f;
    };
    return _0x3e4f();
}

function getprofilenameResponse(_0x6f2099) {
    var _0x24b206 = _0x3774cd;
    res = JSON[_0x24b206(0x1f5)](_0x6f2099), res[_0x24b206(0x1f7)] == 0xc8 ? (userobject = res[_0x24b206(0x248)], user_name = userobject['username']) : swal(_0x6f2099['msg'], '\x20', _0x24b206(0x267));
}

function exportbodtable() {
    var _0x25fc23 = _0x3774cd;
    $('#' + firsttableid)[_0x25fc23(0x1a7)](_0x25fc23(0x214))[_0x25fc23(0x182)](), refreshBODEOD();
};

function getHeaderNames(_0x4ef94e) {
    var _0x58d0a6 = _0x3774cd,
        _0x753933 = $(_0x4ef94e)['find'](_0x58d0a6(0x25a))['DataTable']()['columns']()[_0x58d0a6(0x1fe)]()[_0x58d0a6(0x289)](),
        _0x4ab1f8 = [];
    return _0x753933['forEach'](function (_0x41d1c1) {
        var _0x58dc19 = _0x58d0a6;
        _0x4ab1f8[_0x58dc19(0x1c4)]($(_0x41d1c1)[_0x58dc19(0x288)]());
    }), _0x4ab1f8;
}

function buildCols(_0x4c095f) {
    var _0x4bdf62 = _0x3774cd,
        _0x1f80e0 = _0x4bdf62(0x225);
    for (i = 0x0; i < _0x4c095f[_0x4bdf62(0x1ba)]; i++) {
        colNum = i + 0x1, _0x1f80e0 += _0x4bdf62(0x18b) + colNum + _0x4bdf62(0x1a2) + colNum + '\x22\x20width=\x2220\x22\x20customWidth=\x221\x22/>';
    }
    return _0x1f80e0 += _0x4bdf62(0x29d), _0x1f80e0;
}

function _0x38a6(_0x60e218, _0x23eee8) {
    var _0x3e4fda = _0x3e4f();
    return _0x38a6 = function (_0x38a66b, _0x43e978) {
        _0x38a66b = _0x38a66b - 0x181;
        var _0x376165 = _0x3e4fda[_0x38a66b];
        return _0x376165;
    }, _0x38a6(_0x60e218, _0x23eee8);
}

function buildRow(_0x5e840c, _0x16d757, _0x4eb378) {
    var _0x16ca6c = _0x3774cd,
        _0x46b54e = _0x4eb378 ? '\x20s=\x22' + _0x4eb378 + '\x22' : '',
        _0x167888 = _0x16ca6c(0x20e) + _0x16d757 + '\x22>';
    for (i = 0x0; i < _0x5e840c[_0x16ca6c(0x1ba)]; i++) {
        colNum = (i + 0xa)[_0x16ca6c(0x1ca)](0x24)[_0x16ca6c(0x203)]();
        var _0x12b821 = colNum + _0x16d757;
        _0x167888 += _0x16ca6c(0x217) + _0x12b821 + '\x22' + _0x46b54e + '>' + '<is>' + _0x16ca6c(0x202) + _0x5e840c[i] + _0x16ca6c(0x22e) + _0x16ca6c(0x233) + '</c>';
    }
    return _0x167888 += '</row>', _0x167888;
}

function getTableData(_0x1b1d9e, _0x22a966) {
    var _0xcf51cd = _0x3774cd,
        _0x8e81a6 = getHeaderNames(_0x1b1d9e),
        _0x1b1d9e = $(_0x1b1d9e)[_0xcf51cd(0x1a7)](_0xcf51cd(0x25a))[_0xcf51cd(0x24d)](),
        _0x2ec49d = 0x1,
        _0x406ff = '',
        _0x3f35af = '';
    return _0x3f35af += buildCols(_0x8e81a6), _0x3f35af += _0xcf51cd(0x255), _0x22a966['length'] > 0x0 && (_0x3f35af += buildRow([_0x22a966], _0x2ec49d, 0x33), _0x2ec49d++, mergeCol = (_0x8e81a6[_0xcf51cd(0x1ba)] - 0x1 + 0xa)['toString'](0x24)[_0xcf51cd(0x203)](), _0x406ff = _0xcf51cd(0x1d2) + '<mergeCell\x20ref=\x22A1:' + mergeCol + _0xcf51cd(0x240) + _0xcf51cd(0x1a8)), _0x3f35af += buildRow(_0x8e81a6, _0x2ec49d, 0x2), _0x2ec49d++, _0x1b1d9e[_0xcf51cd(0x1fd)]()[_0xcf51cd(0x20f)](function (_0x43f2ce, _0x35bd3f, _0x429051) {
        var _0x71452c = this['data']();
        _0x3f35af += buildRow(_0x71452c, _0x2ec49d, ''), _0x2ec49d++;
    }), _0x3f35af += _0xcf51cd(0x245) + _0x406ff, _0x3f35af;
}

function setSheetName(_0x45b22b, _0x248a8e) {
    var _0x51c907 = _0x3774cd;
    if (_0x248a8e['length'] > 0x0) {
        var _0x5a08f6 = _0x45b22b['xl']['workbook.xml'][_0x51c907(0x1f0)](_0x51c907(0x18a))[0x0];
        _0x5a08f6[_0x51c907(0x1d0)]('name', _0x248a8e);
    }
}

function addSheet(_0x291d48, _0x26e2fb, _0x39210d, _0x11c7fd, _0xe7df4f) {
    var _0x2ba89f = _0x3774cd;
    console['log'](_0x2ba89f(0x195));
    var _0x1ddb5e = _0x291d48[_0x2ba89f(0x22c)][_0x2ba89f(0x1f0)](_0x2ba89f(0x1e0))[0x1],
        _0x28a5e8 = _0x1ddb5e['cloneNode'](!![]);
    _0x28a5e8[_0x2ba89f(0x1d0)](_0x2ba89f(0x246), _0x2ba89f(0x253) + _0xe7df4f + '.xml'), _0x291d48['[Content_Types].xml'][_0x2ba89f(0x1f0)](_0x2ba89f(0x1ad))[0x0][_0x2ba89f(0x29c)](_0x28a5e8);
    var _0x1ddb5e = _0x291d48['xl'][_0x2ba89f(0x184)]['workbook.xml.rels'][_0x2ba89f(0x1f0)]('Relationship')[0x0],
        _0x28a5e8 = _0x1ddb5e[_0x2ba89f(0x279)](!![]);
    _0x28a5e8['setAttribute']('Id', 'rId' + _0xe7df4f + 0x1), _0x28a5e8[_0x2ba89f(0x1d0)](_0x2ba89f(0x1bd), _0x2ba89f(0x247) + _0xe7df4f + _0x2ba89f(0x19e)), _0x291d48['xl'][_0x2ba89f(0x184)][_0x2ba89f(0x249)][_0x2ba89f(0x1f0)](_0x2ba89f(0x1ce))[0x0]['appendChild'](_0x28a5e8);
    var _0x1ddb5e = _0x291d48['xl'][_0x2ba89f(0x1b7)]['getElementsByTagName'](_0x2ba89f(0x18a))[0x0],
        _0x28a5e8 = _0x1ddb5e[_0x2ba89f(0x279)](!![]);
    _0x28a5e8[_0x2ba89f(0x1d0)](_0x2ba89f(0x194), _0x11c7fd), _0x28a5e8[_0x2ba89f(0x1d0)](_0x2ba89f(0x26c), _0xe7df4f), _0x28a5e8[_0x2ba89f(0x1d0)]('r:id', _0x2ba89f(0x25d) + _0xe7df4f + 0x1), _0x291d48['xl']['workbook.xml']['getElementsByTagName'](_0x2ba89f(0x192))[0x0][_0x2ba89f(0x29c)](_0x28a5e8);
    var _0x3357c1 = '<?xml\x20version=\x221.0\x22\x20encoding=\x22UTF-8\x22\x20standalone=\x22yes\x22?>' + _0x2ba89f(0x1e1) + getTableData(_0x26e2fb, _0x39210d) + _0x2ba89f(0x1c8);
    _0x291d48['xl'][_0x2ba89f(0x1d3)][_0x2ba89f(0x18a) + _0xe7df4f + _0x2ba89f(0x19e)] = $[_0x2ba89f(0x25b)](_0x3357c1);
}

function Exportmultiplesheets() {
    var _0xa5c61 = _0x3774cd;
    const _0x3daa01 = document['getElementById']('mob-width');
    if (_0x3daa01 != null && _0x3daa01 != undefined) {
        const _0x39168a = Array[_0xa5c61(0x189)](_0x3daa01[_0xa5c61(0x1cf)]);
        _0x39168a[_0xa5c61(0x20d)](), _0x39168a[_0xa5c61(0x20d)]();
        const _0x129f6c = _0x39168a['map'](_0x3ece02 => {
            return _0x3ece02['id'];
        });
        firsttableid = _0x129f6c[0x1][_0xa5c61(0x21d)](_0xa5c61(0x241))[0x1] + _0xa5c61(0x262);
        var _0x195f98 = '';
        _0x129f6c[0x1]['includes']('BOD-') ? _0x195f98 = _0x129f6c[0x0][_0xa5c61(0x21d)](_0xa5c61(0x1e2))[0x1] : _0x195f98 = _0x129f6c[0x0]['split']('BOD_')[0x1];
        var _0x1d5184 = 0x0;
        $('#' + firsttableid)[_0xa5c61(0x1a7)](_0xa5c61(0x25a))[_0xa5c61(0x24d)]({
            'dom': _0xa5c61(0x197),
            'pageLength': 0x64,
            'ordering': ![],
            'buttons': [{
                'extend': _0xa5c61(0x239),
                'title': _0xa5c61(0x1e4),
                'customize': function (_0x4d0c6c) {
                    var _0x21008c = _0xa5c61;
                    setSheetName(_0x4d0c6c, _0x195f98);
                    for (let _0x3c761c = 0x3; _0x3c761c < _0x129f6c[_0x21008c(0x1ba)]; _0x3c761c++) {
                        if (_0x3c761c > 0x2 && _0x129f6c[_0x3c761c][_0x21008c(0x244)](_0x21008c(0x241))) {
                            var _0x79b90f = _0x129f6c[_0x3c761c][_0x21008c(0x21d)]('child-')[0x1] + _0x21008c(0x262);
                            _0x129f6c[_0x3c761c][_0x21008c(0x244)]('BOD-') ? tablename = _0x129f6c[_0x3c761c]['split'](_0x21008c(0x1e2))[0x1] : tablename = _0x129f6c[_0x3c761c][_0x21008c(0x21d)]('BOD_')[0x1], addSheet(_0x4d0c6c, '#' + _0x79b90f, tablename, tablename, (_0x3c761c - 0x1)[_0x21008c(0x1ca)]()), _0x1d5184++;
                        }
                    }
                }
            }]
        }), totalbodlen = _0x129f6c[_0xa5c61(0x1ba)];
        for (k = 0x3; k < _0x129f6c[_0xa5c61(0x1ba)]; k++) {
            if (_0x129f6c[k][_0xa5c61(0x244)](_0xa5c61(0x241))) {
                var _0x5d2115 = _0x129f6c[k][_0xa5c61(0x21d)](_0xa5c61(0x241))[0x1] + _0xa5c61(0x262);
                $('#' + _0x5d2115)['find'](_0xa5c61(0x25a))[_0xa5c61(0x24d)]({
                    'dom': 'Bfrtip',
                    'pageLength': 0x64,
                    'ordering': ![],
                    'buttons': [{
                        'extend': _0xa5c61(0x239),
                        'title': _0xa5c61(0x1e4)
                    }]
                }), operationsCompletedbod = k;
            }
        }
    }
}

function operationbod() {
    var _0x4d18ee = _0x3774cd;
    ++operationsCompletedbod, operationsCompletedbod === totalbodlen && ($('#' + firsttableid)[_0x4d18ee(0x1a7)](_0x4d18ee(0x214))[_0x4d18ee(0x182)](), export_bodExcel = ![]);
}

function getSiteList() {
    var _0x3bf98e = _0x3774cd;
    showLoader(_0x3bf98e(0x1d8)), requestDataFromServer('/lesites/getallsitenames', {
        'type': _0x3bf98e(0x22b),
        'site': params[_0x3bf98e(0x27b)](_0x3bf98e(0x1f1))
    }, 'GET')[_0x3bf98e(0x1a5)](function (_0x3c3d0b) {
        var _0x3e23bc = _0x3bf98e;
        res = JSON['parse'](_0x3c3d0b);
        if (res[_0x3e23bc(0x1f7)] == 0xc8) bodSiteResponse = res[_0x3e23bc(0x23d)], getBodEodkeys();
        else stopLoader(_0x3e23bc(0x1d8));
    });
}

function getBodEodkeys() {
    var _0x3f279e = _0x3774cd;
    requestDataFromServer(_0x3f279e(0x25c), {
        'sitename': params[_0x3f279e(0x27b)](_0x3f279e(0x1f1)),
        'mode': _0x3f279e(0x1e4)
    }, 'GET')[_0x3f279e(0x1a5)](bodEodkeysResponse);
}

function openShowcommentModal(_0x43edb4, _0x275ed6) {
    var _0x3a6a60 = _0x3774cd;
    changed_key = _0x275ed6;
    var _0x2131fa = '';
    _0x2131fa += _0x3a6a60(0x186), _0x275ed6 = isEdit_dict[_0x275ed6], _0x275ed6 = JSON['parse'](_0x275ed6);
    for (var _0x196a2e = 0x0; _0x196a2e < _0x275ed6[_0x3a6a60(0x1ba)]; _0x196a2e++) {
        var _0x365d2a = _0x275ed6[_0x196a2e];
        _0x2131fa += '<div\x20class=\x22' + (_0x196a2e % 0x2 === 0x0 ? 'comment' : _0x3a6a60(0x1db)) + _0x3a6a60(0x26a), _0x2131fa += _0x3a6a60(0x28f) + _0x365d2a[_0x3a6a60(0x188)] + _0x3a6a60(0x261), _0x2131fa += _0x3a6a60(0x1df) + _0x365d2a[_0x3a6a60(0x193)] + '</span><br>', _0x2131fa += '<p\x20class=\x22tab-indent\x22>-' + _0x365d2a[_0x3a6a60(0x1b5)] + _0x3a6a60(0x28e), _0x2131fa += '</div>';
    }
    _0x2131fa += '</div>', $('#dialog-for-showcomments\x20.modal-body')[_0x3a6a60(0x288)](_0x2131fa);
}

function openAddcommentModal(_0x24af83, _0x528d80) {
    var _0x1e3436 = _0x3774cd;
    changed_key = _0x528d80, $('#dialog-for-addcomment\x20.modal-title')['html'](_0x1e3436(0x1d5) + changed_key + '</div>');
}

function addComment() {
    var _0x4e5ebe = _0x3774cd;
    data = {};
    var _0x321b9b = new Date();
    data[_0x4e5ebe(0x188)] = user_name, data[_0x4e5ebe(0x193)] = _0x321b9b[_0x4e5ebe(0x1ab)]() + '/' + (_0x321b9b[_0x4e5ebe(0x256)]() + 0x1) + '/' + _0x321b9b[_0x4e5ebe(0x1ee)]() + _0x4e5ebe(0x25e) + _0x321b9b[_0x4e5ebe(0x198)]() + ':' + _0x321b9b[_0x4e5ebe(0x266)]() + ':' + _0x321b9b[_0x4e5ebe(0x20a)](), data['comment'] = $(_0x4e5ebe(0x24f))[_0x4e5ebe(0x1c6)](), requestDataFromServer(_0x4e5ebe(0x1b0), {
        'sitename': params['get'](_0x4e5ebe(0x1f1)),
        'existing_key': changed_key,
        'value': JSON[_0x4e5ebe(0x274)](data)
    }, _0x4e5ebe(0x191))['done'](function (_0x5ea166) {
        var _0x3aa9bd = _0x4e5ebe;
        _0x5ea166[_0x3aa9bd(0x213)][_0x3aa9bd(0x1d6)] == 0xc8 ? swal({
            'title': _0x3aa9bd(0x291),
            'text': _0x3aa9bd(0x237) + _0x5ea166[_0x3aa9bd(0x213)][_0x3aa9bd(0x1ed)] + '\x22.',
            'type': _0x3aa9bd(0x281),
            'confirmButtonClass': _0x3aa9bd(0x293),
            'confirmButtonText': 'OK',
            'closeOnConfirm': !![],
            'closeOnCancel': !![]
        }, function (_0x4a6f51) {
            var _0x3e2581 = _0x3aa9bd;
            _0x4a6f51 && ($('#syntax')[_0x3e2581(0x1c6)](''), requestDataFromServer(_0x3e2581(0x25c), {
                'sitename': params[_0x3e2581(0x27b)](_0x3e2581(0x1f1)),
                'mode': _0x3e2581(0x1e4)
            }, _0x3e2581(0x191))[_0x3e2581(0x1a5)](function (_0x177783) {
                var _0x3e1f12 = _0x3e2581;
                if (typeof ledColors === 'function') ledColors(selected_sitename, selected_leurl, selected_websocurl);
                if (typeof displayKeys === 'function') displayKeys(_0x177783[_0x3e1f12(0x213)][0x0], _0x177783[_0x3e1f12(0x18d)]);
            }));
        }) : swal(_0x5ea166[_0x3aa9bd(0x213)][_0x3aa9bd(0x1ed)], '\x20', _0x3aa9bd(0x267)), $(_0x3aa9bd(0x1af))[_0x3aa9bd(0x1a7)](_0x3aa9bd(0x28c))[_0x3aa9bd(0x182)]();
    });
}

function bodEodkeysResponse(_0x3b94ad) {
    var _0x37b72c = _0x3774cd;
    const _0x19d152 = Math['random']()[_0x37b72c(0x1ca)](0x24)['substring'](0x2, 0x5);
    if (_0x3b94ad == undefined) return;
    bodeodResponse = _0x3b94ad[_0x37b72c(0x213)], stopLoader(_0x37b72c(0x1d8));
    if (_0x3b94ad['responseData'][_0x37b72c(0x1ba)] > 0x0) {
        _0x3b94ad['responseData'][_0x37b72c(0x23c)](function (_0x2c38d5) {
            var _0x320e39 = _0x37b72c,
                _0x32739f = {};
            _0x32739f[_0x320e39(0x1f1)] = _0x2c38d5[_0x320e39(0x1f1)], _0x32739f['isSuccess'] = !![], _0x32739f[_0x320e39(0x283)] = ![];
            var _0x4a8440 = 0x0;
            if (_0x2c38d5['site_data'][_0x320e39(0x1ba)] > 0x0) {
                _0x2c38d5[_0x320e39(0x1ed)][_0x320e39(0x23c)](function (_0x5afcf4) {
                    var _0x51c388 = _0x320e39,
                        _0x2a5afe = _0x5afcf4['key_data'],
                        _0x57f821 = _0x2a5afe[_0x51c388(0x23d)];
                    if (_0x2a5afe[_0x51c388(0x271)] == _0x51c388(0x18e)) $[_0x51c388(0x299)](_0x57f821, function (_0x119c89) {
                        var _0x35e248 = _0x51c388,
                            _0x52af08 = _0x57f821[_0x119c89];
                        $[_0x35e248(0x299)](_0x52af08, function (_0x3d088a, _0x29bae5) {
                            var _0x5db48e = _0x35e248,
                                _0x1a1b80 = _0x52af08[_0x3d088a];
                            _0x1a1b80[_0x5db48e(0x258)] == ![] && _0x4a8440++;
                        });
                    });
                    else
                        for (var _0x307114 = 0x0; _0x307114 < _0x57f821['length']; _0x307114++) {
                            _0x57f821[_0x307114][_0x51c388(0x258)] == ![] && _0x4a8440++;
                        }
                });
                if (_0x4a8440 != 0x0) {
                    _0x32739f[_0x320e39(0x258)] = ![];
                    if (selectedsite == '\x20') selectedsite = _0x2c38d5[_0x320e39(0x1f1)];
                }
            } else {
                _0x32739f[_0x320e39(0x258)] = ![];
                if (selectedsite == '\x20') selectedsite = _0x2c38d5['site'];
            }
            bodSitesData['push'](_0x32739f);
            var _0x175048 = bodSiteResponse[0x0];
            connectWebSocket(_0x175048[_0x320e39(0x1b8)], _0x32739f[_0x320e39(0x1f1)], 0x0, _0x19d152);
        });
        var _0x5e36e2 = '',
            _0x194bee = '';
        $(_0x37b72c(0x1eb))[_0x37b72c(0x278)](), siteFailCount = 0x0, bodSitesData[_0x37b72c(0x23c)](function (_0x584cab) {
            var _0x3859a0 = _0x37b72c;
            _0x584cab['isSuccess'] ? _0x5e36e2 += _0x3859a0(0x218) + _0x584cab[_0x3859a0(0x1f1)] + '\x20&ensp;>&ensp;\x20<h3\x20class=\x22page-title\x22>\x20BOD\x20Status\x20</h3></div>' : (siteFailCount++, _0x194bee += _0x3859a0(0x218) + _0x584cab[_0x3859a0(0x1f1)] + _0x3859a0(0x1be));
        });
        if (siteFailCount != 0x0) bodeodFinalStatus = _0x37b72c(0x222);
        else bodeodFinalStatus = 'Success';
        $(_0x37b72c(0x23f))[_0x37b72c(0x288)](bodeodFinalStatus), bodeodFinalStatus == 'Failure' ? $(_0x37b72c(0x23f))[_0x37b72c(0x28b)](_0x37b72c(0x220))[_0x37b72c(0x287)]('red') : $(_0x37b72c(0x23f))['removeClass']('red')[_0x37b72c(0x287)]('green'), $(_0x37b72c(0x1eb))[_0x37b72c(0x273)](_0x194bee), $('#bod-eodstatus\x20#site-list')[_0x37b72c(0x273)](_0x5e36e2), $(_0x37b72c(0x212))['eq'](0x0)[_0x37b72c(0x287)](_0x37b72c(0x26f));
        if ($(_0x37b72c(0x212))['eq'](0x0)['data']()) selectedsite = $(_0x37b72c(0x212))['eq'](0x0)[_0x37b72c(0x23d)]()['id'];
        else {
            if (selectedsite && bodSitesData['length'] > 0x0) selectedsite = bodSitesData[0x0][_0x37b72c(0x1f1)];
        }
        var _0x4a04e0 = bodeodResponse[0x0];
        displayKeys(_0x4a04e0, selectedsite);
    } else $(_0x37b72c(0x1e3))[_0x37b72c(0x295)](_0x37b72c(0x23b), _0x37b72c(0x1c0)), $(_0x37b72c(0x1fb))[_0x37b72c(0x295)](_0x37b72c(0x23b), _0x37b72c(0x280)), $(_0x37b72c(0x1c1))['text'](_0x37b72c(0x1b2)), $(_0x37b72c(0x1e8))[_0x37b72c(0x295)](_0x37b72c(0x23b), 'none');
}

function displayKeys(_0x506f41, _0x2f8ea7) {
    var _0x3dd635 = _0x3774cd;
    isEdit_dict = {};
    if (open_rows) {
        keyFailCount = 0x0, keyGreenCount = 0x0, keyBlueCount = 0x0, keyOrangeCount = 0x0, keyWhiteCount = 0x0;
        if (_0x506f41[_0x3dd635(0x1ed)][_0x3dd635(0x1ba)] > 0x0) {
            redisKeys = [], keyHtml = '';
            var _0x4c2f5b = '',
                _0x311825 = '',
                _0x17008a = '',
                _0x3dce8a = '',
                _0x102c02 = '';
            outkeyHtml = '', outkeyHtml += _0x3dd635(0x199) + _0x506f41[_0x3dd635(0x1f1)] + '\x22>', outkeyHtml += _0x3dd635(0x1b3), outkeyHtml += _0x3dd635(0x1cb), outkeyHtml += _0x3dd635(0x230);
            const _0xf86361 = {
                'key': 'BOD:BOD_UPDATED_DATA',
                'key_data': {
                    'overallStatus': !![],
                    'status': 0x0,
                    'type': _0x3dd635(0x1e5),
                    'data': [{
                        'segment': _0x3dd635(0x1c7),
                        'isSuccess': !![],
                        'status': 0x2
                    }]
                }
            };
            _0x506f41[_0x3dd635(0x1ed)][_0x3dd635(0x209)](_0xf86361);
            var _0x276dda = 0x1;
            _0x506f41[_0x3dd635(0x1ed)][_0x3dd635(0x23c)](function (_0x21af40) {
                var _0x571e31 = _0x3dd635,
                    _0x55f1ce = {},
                    _0x3a4176 = _0x21af40[_0x571e31(0x243)],
                    _0x401f1c = _0x3a4176[_0x571e31(0x23d)],
                    _0x3f602a = _0x3a4176[_0x571e31(0x181)];
                failCount = 0x0, greenCount = 0x0, orangeCount = 0x0, whiteCount = 0x0, rowHtmlgreen = '', rowHtmlblue = '', rowHtmlred = '', rowHtmlorange = '', rowHtmlwhite = '', rowHtml = '';
                var _0xc79f34 = '',
                    _0x26dd1d = '',
                    _0x3c4ba5 = '',
                    _0x3d7d03 = '',
                    _0xbf1759 = '',
                    _0x120648 = _0x21af40[_0x571e31(0x298)];
                _0x120648 = _0x120648[_0x571e31(0x227)](/[:.]/g, '_');
                if (_0x3a4176[_0x571e31(0x271)] == _0x571e31(0x18e)) {
                    var _0x2fff29 = '';
                    _0xc79f34 = '', _0x3c4ba5 = '', _0x26dd1d = '', _0x3d7d03 = '', _0xbf1759 = '', $[_0x571e31(0x299)](_0x401f1c, function (_0x27b5d4) {
                        var _0x4e6e7b = _0x571e31;
                        isRowContainsRed = 0x0, isRowContainsGreen = 0x0, isRowContainsBlue = 0x0, isRowContainsOrange = 0x0, isRowContainsWhite = 0x0;
                        var _0x3ff976 = _0x27b5d4 + _0x4e6e7b(0x208),
                            _0xc71eff = '',
                            _0x5e9d4d = _0x401f1c[_0x27b5d4],
                            _0xf577fe = '';
                        $['each'](_0x5e9d4d, function (_0x313a41, _0x48d3c5) {
                            var _0x1cf3ad = _0x4e6e7b,
                                _0x5ccb25 = _0x5e9d4d[_0x313a41];
                            if (typeof _0x5ccb25 == _0x1cf3ad(0x286)) {
                                if (_0x5ccb25['status'] == 0x0) _0xf577fe = _0x1cf3ad(0x1ec), failCount++, isRowContainsRed++;
                                else {
                                    if (_0x5ccb25[_0x1cf3ad(0x1f7)] == 0x1) _0xf577fe = _0x1cf3ad(0x1d7), orangeCount++, isRowContainsOrange++;
                                    else {
                                        if (_0x5ccb25[_0x1cf3ad(0x1f7)] == 0x2) _0xf577fe = 'green-bg', greenCount++, isRowContainsGreen++;
                                        else _0x5ccb25[_0x1cf3ad(0x1f7)] == 0x5 ? (_0xf577fe = _0x1cf3ad(0x27e), blueCount++, isRowContainsBlue++) : (_0xf577fe = _0x1cf3ad(0x235), whiteCount++, isRowContainsWhite++);
                                    }
                                }
                                if (_0x5ccb25['hasOwnProperty'](_0x1cf3ad(0x263))) {
                                    var _0x5d92cf = _0x1cf3ad(0x223),
                                        _0x9f9a23 = '';
                                    for (const [_0x5988ed, _0x3477ed] of Object['entries'](_0x5ccb25[_0x1cf3ad(0x263)])) {
                                        _0x9f9a23 += '<tr><td\x20class=\x22details_td\x22>' + _0x5988ed + _0x1cf3ad(0x1f3) + _0x3477ed + _0x1cf3ad(0x20b);
                                    }
                                    _0x5d92cf += _0x9f9a23, _0x5d92cf += _0x1cf3ad(0x24e), _0xc71eff += _0x1cf3ad(0x28d) + _0xf577fe + _0x1cf3ad(0x234) + _0x5ccb25['value'] + _0x1cf3ad(0x19c) + _0x5d92cf + '</span></td>';
                                } else _0xc71eff += '<td\x20class=\x22white-text\x20' + _0xf577fe + '\x22>' + _0x5ccb25[_0x1cf3ad(0x1ef)] + _0x1cf3ad(0x18f);
                            } else _0xc71eff += _0x1cf3ad(0x1f9) + _0x5ccb25 + _0x1cf3ad(0x18f);
                        });
                        if (isRowContainsRed) html = _0x4e6e7b(0x215) + _0x27b5d4 + '</td>', html = html + _0xc71eff, _0xc79f34 += _0x4e6e7b(0x1a6) + _0x27b5d4[_0x4e6e7b(0x1fa)]('/', '_') + 'id\x22\x20style=\x22color:#C0C0C0\x22>' + html + '</tr>';
                        else {
                            if (isRowContainsOrange) html = _0x4e6e7b(0x206) + _0x27b5d4 + _0x4e6e7b(0x18f), html = html + _0xc71eff, _0x3d7d03 += '<tr\x20class=\x22\x22\x20id=\x22' + _0x27b5d4[_0x4e6e7b(0x1fa)]('/', '_') + _0x4e6e7b(0x265) + html + _0x4e6e7b(0x1bb);
                            else {
                                if (isRowContainsBlue) html = _0x4e6e7b(0x25f) + _0x27b5d4 + _0x4e6e7b(0x18f), html = html + _0xc71eff, _0x26dd1d += '<tr\x20class=\x22\x22\x20id=\x22' + _0x27b5d4['replaceAll']('/', '_') + _0x4e6e7b(0x265) + html + _0x4e6e7b(0x1bb);
                                else isRowContainsGreen ? (html = '<td\x20style=\x22color:#16d39a\x22>' + _0x27b5d4 + '</td>', html = html + _0xc71eff, _0x3c4ba5 += _0x4e6e7b(0x1a6) + _0x27b5d4[_0x4e6e7b(0x1fa)]('/', '_') + _0x4e6e7b(0x265) + html + '</tr>') : (html = _0x4e6e7b(0x232) + _0x27b5d4 + _0x4e6e7b(0x18f), html = html + _0xc71eff, _0xbf1759 += _0x4e6e7b(0x1a6) + _0x27b5d4[_0x4e6e7b(0x1fa)]('/', '_') + _0x4e6e7b(0x265) + html + '</tr>');
                            }
                        }
                    }), rowHtml = _0xc79f34 + _0x3d7d03 + _0x3c4ba5 + _0xbf1759;
                } else {
                    var _0x2fff29 = '';
                    for (var _0x50ad36 = 0x0; _0x50ad36 < _0x401f1c[_0x571e31(0x1ba)]; _0x50ad36++) {
                        var _0x113fed = !![];
                        tempHtml = '', $[_0x571e31(0x299)](_0x401f1c[_0x50ad36], function (_0x4c76d9, _0x48e873) {
                            var _0x305f5d = _0x571e31;
                            _0x4c76d9 == _0x305f5d(0x258) && _0x48e873 == ![] && (_0x113fed = ![]);
                            if (typeof _0x48e873 == _0x305f5d(0x286)) _0x48e873 = JSON[_0x305f5d(0x274)](_0x48e873);
                            if (_0x4c76d9[_0x305f5d(0x244)](_0x305f5d(0x24b))) tempHtml += _0x305f5d(0x21a) + _0x50ad36 + '-' + 'file-info' + _0x305f5d(0x1a1) + _0x48e873 + '\x27,' + _0x50ad36 + ',\x27' + _0x21af40[_0x305f5d(0x298)][_0x305f5d(0x227)](/[/:.]/g, '_') + _0x305f5d(0x1ff);
                            else {
                                if (_0x4c76d9 != 'isSuccess') tempHtml += '<td>' + _0x48e873 + '</td>';
                            }
                        });
                        if (_0x401f1c[_0x50ad36][_0x571e31(0x1f7)] == 0x0) rowColor = 'red', failCount++, rowHtmlred += _0x571e31(0x285) + rowColor + _0x571e31(0x27f) + tempHtml + '</tr>';
                        else {
                            if (_0x401f1c[_0x50ad36][_0x571e31(0x1f7)] == 0x1) rowColor = 'orange', orangeCount++, rowHtmlorange += '<tr\x20class=\x22tr-rowclr\x20' + rowColor + _0x571e31(0x27f) + tempHtml + _0x571e31(0x1bb);
                            else _0x401f1c[_0x50ad36][_0x571e31(0x1f7)] == 0x2 ? (rowColor = _0x571e31(0x220), greenCount++, rowHtmlgreen += _0x571e31(0x285) + rowColor + _0x571e31(0x27f) + tempHtml + '</tr>') : (rowColor = _0x571e31(0x257), whiteCount++, rowHtmlwhite += '<tr\x20class=\x22tr-rowclr\x20' + rowColor + _0x571e31(0x27f) + tempHtml + _0x571e31(0x1bb));
                        }
                    }
                }
                var _0x282cf3 = _0x21af40[_0x571e31(0x298)];
                _0x55f1ce['keyName'] = _0x282cf3, _0x55f1ce[_0x571e31(0x1f1)] = _0x506f41['site'], keyName = _0x282cf3['split'](':')[0x1]['replace']('_', '-');
                _0x276dda ? (keyHtml += _0x571e31(0x1ea) + _0x21af40['key'] + '\x22>', --_0x276dda) : keyHtml += '<tr\x20class=\x22collapse-tr\x20parent\x20row\x22\x20style=\x22background-color:#1f1f1f\x22\x20id=\x22' + _0x21af40[_0x571e31(0x298)] + '\x22>';
                keyHtml += '<td\x20class=\x22col-10\x22>', keyHtml += _0x571e31(0x221) + _0x120648[_0x571e31(0x1fa)]('/', '_') + _0x571e31(0x262) + '\x22>';
                var _0x44c44f = _0x571e31(0x296);
                if (_0x21af40[_0x571e31(0x243)]['hasOwnProperty']('status')) {
                    if (_0x21af40['key_data']['status'] == 0x0) {
                        var _0x44c44f = 'Failure',
                            _0x3cc4dc = _0x571e31(0x22a);
                        keyFailCount++, _0x55f1ce['isSuccess'] = ![];
                    } else {
                        if (_0x21af40[_0x571e31(0x243)][_0x571e31(0x1f7)] == 0x1) {
                            var _0x3cc4dc = 'orange';
                            keyOrangeCount++, _0x55f1ce[_0x571e31(0x258)] = ![];
                        } else {
                            if (_0x21af40[_0x571e31(0x243)][_0x571e31(0x1f7)] == 0x5) {
                                var _0x3cc4dc = _0x571e31(0x1c3);
                                keyBlueCount++, _0x55f1ce[_0x571e31(0x258)] = ![];
                            } else {
                                if (_0x21af40['key_data']['status'] == 0x2) {
                                    var _0x3cc4dc = 'green';
                                    keyGreenCount++, _0x55f1ce['isSuccess'] = !![];
                                } else _0x55f1ce['isSuccess'] = !![];
                            }
                        }
                    }
                } else var _0x3cc4dc = _0x571e31(0x257);
                redisKeys[_0x571e31(0x1c4)](_0x55f1ce), keyHtml += _0x571e31(0x201) + _0x3cc4dc + _0x571e31(0x27c) + keyName + _0x571e31(0x261);
                (_0x3cc4dc == 'red' || _0x3cc4dc == _0x571e31(0x1bf) || _0x3cc4dc == _0x571e31(0x1c3)) && (_0x3f602a != undefined && (_0x3f602a[_0x571e31(0x1ba)] != 0x0 && (isEdit_dict[_0x282cf3] = JSON[_0x571e31(0x274)](_0x3f602a), keyHtml += _0x571e31(0x259) + _0x282cf3 + _0x571e31(0x1e6))), keyHtml += _0x571e31(0x1b4) + _0x282cf3 + _0x571e31(0x268));
                keyHtml += _0x571e31(0x29b), keyHtml += _0x571e31(0x187), keyHtml += _0x571e31(0x21e), keyHtml += _0x571e31(0x1bb);
                _0x21af40[_0x571e31(0x298)] == _0x571e31(0x20c) ? keyHtml += '<tr\x20class=\x22border-0\x20collapse-content\x20row\x22\x20id=\x22child-' + _0x21af40[_0x571e31(0x298)][_0x571e31(0x227)](/[:.]/g, '_') + _0x571e31(0x205) : keyHtml += _0x571e31(0x1f8) + _0x21af40['key'][_0x571e31(0x227)](/[:.]/g, '_') + _0x571e31(0x284);
                keyHtml += _0x571e31(0x1e7), keyHtml += _0x571e31(0x1ac) + _0x120648 + _0x571e31(0x262) + '\x22\x20style=\x22border:\x201px;\x22>', keyHtml += _0x571e31(0x276), keyHtml += _0x571e31(0x1b3), keyHtml += _0x571e31(0x226) + _0x3a4176[_0x571e31(0x185)] + _0x571e31(0x207), keyHtml += '</div>', keyHtml += '<div\x20id=\x22table-view\x22\x20class=\x22col-12\x22\x20style=\x22overflow-x:\x20auto;\x22>', keyHtml += _0x571e31(0x277), keyHtml += _0x571e31(0x29e), keyHtml += _0x571e31(0x26d);
                var _0x3a4176 = _0x21af40[_0x571e31(0x243)],
                    _0x401f1c = _0x3a4176['data'];
                theadHtml = '';
                _0x3a4176['type'] == _0x571e31(0x18e) ? (theadHtml += _0x571e31(0x290), $[_0x571e31(0x299)](_0x401f1c[Object[_0x571e31(0x204)](_0x401f1c)[0x0]], function (_0x2413a7) {
                    theadHtml += '<th>' + _0x2413a7 + '</th>';
                })) : $['each'](_0x401f1c[0x0], function (_0x131c6) {
                    var _0x5df24d = _0x571e31;
                    if (_0x131c6 != _0x5df24d(0x258)) theadHtml += '<th\x20style=\x22border:\x201px\x20solid\x20#303234;\x22>' + _0x131c6 + _0x5df24d(0x22f);
                });
                keyHtml = keyHtml + theadHtml, keyHtml += _0x571e31(0x1bb), keyHtml += _0x571e31(0x260), keyHtml += '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22>', keyHtml += rowHtml + rowHtmlred + rowHtmlorange + rowHtmlgreen + rowHtmlwhite, keyHtml += _0x571e31(0x229), keyHtml += '</table>', keyHtml += '</div>', keyHtml += _0x571e31(0x26b), keyHtml += '</div>\x20', keyHtml += _0x571e31(0x18f), keyHtml += _0x571e31(0x1bb);
                if (_0x3cc4dc == _0x571e31(0x22a)) _0x4c2f5b += keyHtml;
                else {
                    if (_0x3cc4dc == _0x571e31(0x1bf)) _0x311825 += keyHtml;
                    else {
                        if (_0x3cc4dc == _0x571e31(0x1c3)) _0x17008a += keyHtml;
                        else _0x3cc4dc == 'green' ? _0x3dce8a += keyHtml : _0x102c02 += keyHtml;
                    }
                }
                keyHtml = '', rowHtmlgreen = '', rowHtmlorange = '', rowHtmlblue = '', rowHtmlwhite = '', rowHtmlred = '';
            }), outkeyHtml += _0x4c2f5b, outkeyHtml += _0x311825, outkeyHtml += _0x17008a, outkeyHtml += _0x3dce8a, outkeyHtml += _0x102c02, outkeyHtml += _0x3dd635(0x229), outkeyHtml += _0x3dd635(0x24e), outkeyHtml += '</div>', outkeyHtml += _0x3dd635(0x26b), _0x2f8ea7 === selectedsite && ($(_0x3dd635(0x1e3))[_0x3dd635(0x295)](_0x3dd635(0x23b), _0x3dd635(0x280)), $(_0x3dd635(0x1fb))['css']('display', _0x3dd635(0x1c0)), $('#bod-eodstatus\x20#bod-eodstatus-expand')[_0x3dd635(0x295)]('display', _0x3dd635(0x280)), $(_0x3dd635(0x1e3))[_0x3dd635(0x278)](), $('#bod-eodstatus\x20#site-data')[_0x3dd635(0x273)](outkeyHtml));
        } else keyFailCount++, $(_0x3dd635(0x1e3))[_0x3dd635(0x295)]('display', _0x3dd635(0x1c0)), $(_0x3dd635(0x1fb))[_0x3dd635(0x295)](_0x3dd635(0x23b), _0x3dd635(0x280)), $(_0x3dd635(0x1e8))[_0x3dd635(0x295)](_0x3dd635(0x23b), _0x3dd635(0x1c0)), _0x506f41[_0x3dd635(0x1d6)] == 0xc8 ? $('#bod-eodstatus-nodata\x20#nodatamessage')['text'](_0x3dd635(0x19d)) : $(_0x3dd635(0x1c1))['text'](_0x3dd635(0x200));
        feather['replace'](), Exportmultiplesheets();
        checkbx[_0x3dd635(0x23e)] == !![] && checkbx[_0x3dd635(0x182)]();
        if (document['getElementById']('bodLED')) {
            if (keyFailCount != 0x0) document[_0x3dd635(0x297)](_0x3dd635(0x1a9))[_0x3dd635(0x242)][_0x3dd635(0x28a)] = '#ff3d57';
            else {
                if (keyOrangeCount != 0x0) document[_0x3dd635(0x297)]('bodLED')[_0x3dd635(0x242)]['color'] = _0x3dd635(0x270);
                else {
                    if (keyGreenCount != 0x0) document[_0x3dd635(0x297)](_0x3dd635(0x1a9))[_0x3dd635(0x242)][_0x3dd635(0x28a)] = _0x3dd635(0x264);
                    else document[_0x3dd635(0x297)](_0x3dd635(0x1a9))['style'][_0x3dd635(0x28a)] = _0x3dd635(0x257);
                }
            }
        }
        const _0x471f01 = document[_0x3dd635(0x1f6)]('#table-view');
        _0x471f01[_0x3dd635(0x21f)](_0x3dd635(0x19f), _0x1c5d95 => {
            var _0x2b4b19 = _0x3dd635;
            _0x1c5d95[_0x2b4b19(0x1cc)](), _0x471f01[_0x2b4b19(0x29a)] += _0x1c5d95[_0x2b4b19(0x1c2)];
        });
    } else console[_0x3dd635(0x251)](_0x3dd635(0x1dc));
}

function changeStatus(_0x5206a1, _0x2741e3) {
    var _0x7219d9 = _0x3774cd,
        _0x3cd3fa = bodSitesData[0x0];
    _0x2741e3 == 0x0 ? (_0x3cd3fa['isSuccess'] = !![], $('#bod-eodstatus\x20#site-list\x20#' + _0x5206a1 + _0x7219d9(0x1f4))[_0x7219d9(0x28b)](_0x7219d9(0x1d4))[_0x7219d9(0x287)](_0x7219d9(0x281)), $(_0x7219d9(0x196) + _0x5206a1 + '_li\x20a')[_0x7219d9(0x28b)]('red')[_0x7219d9(0x287)]('green')) : (_0x3cd3fa[_0x7219d9(0x258)] = ![], $(_0x7219d9(0x196) + _0x5206a1 + _0x7219d9(0x1f4))[_0x7219d9(0x28b)]('success')[_0x7219d9(0x287)](_0x7219d9(0x1d4)), $(_0x7219d9(0x196) + _0x5206a1 + _0x7219d9(0x238))[_0x7219d9(0x28b)](_0x7219d9(0x220))[_0x7219d9(0x287)](_0x7219d9(0x22a)));
    var _0x114196 = bodSitesData['some'](_0x32c279 => _0x32c279['isSuccess'] == ![]);
    jQuery(_0x7219d9(0x1b1))['load']('a.html#name');
    _0x114196 ? bodeodFinalStatus = _0x7219d9(0x222) : bodeodFinalStatus = _0x7219d9(0x296);
    $(_0x7219d9(0x23f))[_0x7219d9(0x288)](bodeodFinalStatus);
    document['getElementById'](_0x7219d9(0x1a9)) != null && (bodeodFinalStatus == _0x7219d9(0x222) ? document[_0x7219d9(0x297)](_0x7219d9(0x1a9))['classList']['remove'](_0x7219d9(0x220)) : document[_0x7219d9(0x297)]('bodLED')['classList'][_0x7219d9(0x211)](_0x7219d9(0x22a)), bodeodFinalStatus == _0x7219d9(0x222) ? document[_0x7219d9(0x297)]('bodLED')[_0x7219d9(0x1d9)][_0x7219d9(0x1cd)]('red') : document[_0x7219d9(0x297)]('bodLED')[_0x7219d9(0x1d9)]['add'](_0x7219d9(0x220)));
    const _0x13175d = document[_0x7219d9(0x1f6)]('#table-view');
    _0x13175d[_0x7219d9(0x21f)](_0x7219d9(0x19f), _0x2bc181 => {
        var _0x188672 = _0x7219d9;
        _0x2bc181['preventDefault'](), _0x13175d[_0x188672(0x29a)] += _0x2bc181[_0x188672(0x1c2)];
    });
}

function clickOnAll(_0x2574a9) {
    var _0x2d963c = _0x3774cd;
    checkbx = _0x2574a9;
    var _0x55e0be = redisKeys[_0x2d963c(0x183)](_0x109a46 => _0x109a46[_0x2d963c(0x1f1)] === selectedsite);
    _0x2574a9[_0x2d963c(0x23e)] == !![] ? ($(_0x2d963c(0x1b6))['text'](''), _0x55e0be[_0x2d963c(0x23c)](function (_0x4a1457) {
        var _0xeed32d = _0x2d963c,
            _0x35db9c = _0x4a1457[_0xeed32d(0x1a0)];
        _0x35db9c = _0x35db9c[_0xeed32d(0x227)](/[:.]/g, '_'), $('#' + selectedsite + '\x20#' + _0x35db9c + _0xeed32d(0x262))[_0xeed32d(0x21c)]('show');
    })) : ($('.switch_label')['text'](''), _0x2574a9[_0x2d963c(0x23e)] == ![], _0x55e0be['forEach'](function (_0x59063f) {
        var _0x41a723 = _0x2d963c,
            _0x2cb519 = _0x59063f['keyName'];
        _0x2cb519 = _0x2cb519['replace'](/[:.]/g, '_'), $('#' + selectedsite + '\x20#' + _0x2cb519 + _0x41a723(0x262))[_0x41a723(0x21c)]('hide');
    }));
}

function onBodSiteTabchange(_0x2d016f) {
    var _0x1a1742 = _0x3774cd;
    selectedsite = _0x2d016f, $(_0x1a1742(0x210))[_0x1a1742(0x28b)]('active'), $(_0x1a1742(0x196) + _0x2d016f + _0x1a1742(0x1a4) + 'a')[_0x1a1742(0x287)](_0x1a1742(0x26f)), $(_0x1a1742(0x18c))[_0x1a1742(0x278)]();
    var _0x2accf2 = bodSitesData[0x0];
    _0x2accf2[_0x1a1742(0x283)] == ![] && (_0x2accf2 = bodSiteResponse[0x0], connectWebSocket(_0x2accf2['websocket_url'], selectedsite, 0x0)), startBodLoader(), requestDataFromServer(_0x1a1742(0x25c), {
        'sitename': params['get']('site')
    }, _0x1a1742(0x191))[_0x1a1742(0x1a5)](function (_0x56109d) {
        var _0x305831 = _0x1a1742;
        selectedsite = _0x56109d[_0x305831(0x18d)], stopBodLoader(), displayKeys(_0x56109d[_0x305831(0x213)][0x0], _0x56109d[_0x305831(0x18d)]);
    });
}

function onFileinfo(_0x4c994b, _0x4dc356, _0x1d7500) {
    var _0x14f94a = _0x3774cd;
    $(_0x14f94a(0x21b))[_0x14f94a(0x278)](), showLoader(_0x14f94a(0x23a)), requestDataFromServer('/bod-eodstatus/readfile', {
        'filepath': _0x4c994b,
        'csrfmiddlewaretoken': csfr_token
    }, 'POST')['done'](function (_0x3f5e5d) {
        var _0x1e7740 = _0x14f94a;
        stopLoader(_0x1e7740(0x23a)), $('#file_content')[_0x1e7740(0x278)](), _0x3f5e5d['status'] == 0xc8 ? ($(_0x1e7740(0x1dd))[_0x1e7740(0x295)](_0x1e7740(0x19a), 'visible'), $(_0x1e7740(0x190))[_0x1e7740(0x295)](_0x1e7740(0x19a), _0x1e7740(0x294)), $(_0x1e7740(0x21b))['append'](_0x3f5e5d[_0x1e7740(0x1bc)])) : ($(_0x1e7740(0x1dd))[_0x1e7740(0x295)](_0x1e7740(0x19a), _0x1e7740(0x294)), $(_0x1e7740(0x190))[_0x1e7740(0x295)]('visibility', _0x1e7740(0x219)), $(_0x1e7740(0x1aa))[_0x1e7740(0x1c5)](_0x3f5e5d[_0x1e7740(0x1f2)]));
    });
}

function startBodLoader() {
    var _0x4a8d85 = _0x3774cd;
    $(_0x4a8d85(0x1e8))[_0x4a8d85(0x295)](_0x4a8d85(0x23b), _0x4a8d85(0x1c0)), $(_0x4a8d85(0x1fb))['css'](_0x4a8d85(0x23b), _0x4a8d85(0x1c0)), $(_0x4a8d85(0x1e3))['css'](_0x4a8d85(0x23b), _0x4a8d85(0x1c0)), showLoader(_0x4a8d85(0x1d8));
}

function stopBodLoader() {
    var _0x3fbefd = _0x3774cd;
    $('#bod-eodstatus\x20#bod-eodstatus-expand')[_0x3fbefd(0x295)](_0x3fbefd(0x23b), 'block'), $(_0x3fbefd(0x1fb))[_0x3fbefd(0x295)](_0x3fbefd(0x23b), _0x3fbefd(0x280)), $(_0x3fbefd(0x1e3))['css']('display', _0x3fbefd(0x280)), stopLoader(_0x3fbefd(0x1d8));
}