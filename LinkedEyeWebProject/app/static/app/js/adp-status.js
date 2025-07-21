var _0xeaae58 = _0x19b6;
(function (_0x46d0df, _0x2517be) {
    var _0x35fe0e = _0x19b6,
        _0x7ae241 = _0x46d0df();
    while (!![]) {
        try {
            var _0x35d259 = -parseInt(_0x35fe0e(0x279)) / 0x1 * (parseInt(_0x35fe0e(0x1fd)) / 0x2) + parseInt(_0x35fe0e(0x26b)) / 0x3 + parseInt(_0x35fe0e(0x271)) / 0x4 + parseInt(_0x35fe0e(0x1ec)) / 0x5 + parseInt(_0x35fe0e(0x229)) / 0x6 * (-parseInt(_0x35fe0e(0x1d6)) / 0x7) + -parseInt(_0x35fe0e(0x1b6)) / 0x8 + -parseInt(_0x35fe0e(0x186)) / 0x9;
            if (_0x35d259 === _0x2517be) break;
            else _0x7ae241['push'](_0x7ae241['shift']());
        } catch (_0xaeb4f4) {
            _0x7ae241['push'](_0x7ae241['shift']());
        }
    }
}(_0x356c, 0x3e746));
var params = new URLSearchParams(document[_0xeaae58(0x20f)][_0xeaae58(0x1dd)]);
sites = [], selectedsite = '\x20', sites['push'](params[_0xeaae58(0x266)](_0xeaae58(0x27c)));
var selectedsite = params[_0xeaae58(0x266)]('site');
redisKeys = [];
var adpFinalStatus = '',
    connectionTries = 0x6,
    isWSConnected = ![],
    siteHtml = '\x20',
    adpSiteResponse, adpSitesData = [],
    adpResponse, colorClass = _0xeaae58(0x287),
    tablename = '',
    firstadptableid = '',
    totaladplen = 0x0,
    operationsCompletedadp = 0x0,
    export_adpExcel = ![],
    checkadpbx = '',
    open_rows = !![],
    user_name = '',
    changed_key = '',
    isEdit_dict = {};
$(document)['ready'](function () {
    var _0x4c489a = _0xeaae58;
    if (pageName === _0x4c489a(0x213)) $(_0x4c489a(0x259))[_0x4c489a(0x1b4)]('display', localStorage['getItem']('newlabeldisplay'));
    else localStorage[_0x4c489a(0x291)](_0x4c489a(0x1a9), _0x4c489a(0x24c));
    $('#adp-status\x20#table-view')[_0x4c489a(0x1bb)](), getadpSiteList();
    var _0xd93757 = $(_0x4c489a(0x200));
    _0xd93757['click'](function () {
        var _0x4ccd5e = _0x4c489a;
        _0xd93757[_0x4ccd5e(0x18e)](_0x4ccd5e(0x1dc));
        var _0x4e45ce = $(_0x4ccd5e(0x27e));
        return profilename(), _0xd93757[_0x4ccd5e(0x285)](_0x4ccd5e(0x1dc)) ? (_0x4e45ce['text']('Update\x20Paused'), open_rows = ![], $(_0x4ccd5e(0x281))[_0x4ccd5e(0x1b4)](_0x4ccd5e(0x225), _0x4ccd5e(0x207))) : (refreshBODEOD(), _0x4e45ce['text'](_0x4ccd5e(0x1d9)), open_rows = !![], $(_0x4ccd5e(0x281))[_0x4ccd5e(0x1b4)](_0x4ccd5e(0x225), _0x4ccd5e(0x289))), ![];
    });
});

function refreshBODEOD() {
    var _0x255910 = _0xeaae58;
    requestDataFromServer(_0x255910(0x189), {
        'sitename': params[_0x255910(0x266)](_0x255910(0x27c)),
        'mode': _0x255910(0x20d)
    }, _0x255910(0x27b))[_0x255910(0x1f4)](function (_0x2b88db) {
        var _0x549f03 = _0x255910;
        if (typeof adpdisplaykeys === _0x549f03(0x1b7)) adpdisplaykeys(_0x2b88db[_0x549f03(0x1c4)][0x0], _0x2b88db[_0x549f03(0x1ab)]);
        if (typeof ledColors === _0x549f03(0x1b7)) ledColors(selected_sitename, selected_leurl, selected_websocurl);
    });
}

function profilename() {
    var _0x131065 = _0xeaae58;
    requestDataFromServer('/notificationsettings/getallservices', {}, _0x131065(0x27b))[_0x131065(0x1f4)](getprofilenameResponse);
}

function getprofilenameResponse(_0x5bf5e8) {
    var _0x1f86a5 = _0xeaae58;
    res = JSON[_0x1f86a5(0x1a7)](_0x5bf5e8), res[_0x1f86a5(0x1bd)] == 0xc8 ? (userobject = res[_0x1f86a5(0x1ad)], user_name = userobject[_0x1f86a5(0x214)]) : swal(_0x5bf5e8['msg'], '\x20', _0x1f86a5(0x222));
}

function exportadptable() {
    var _0x218f14 = _0xeaae58;
    export_adpExcel = !![], $('#' + firstadptableid)['find'](_0x218f14(0x20a))['click'](), refreshBODEOD();
};

function getadpHeaderNames(_0x2e2b66) {
    var _0x10a81e = _0xeaae58,
        _0x10e43b = $(_0x2e2b66)[_0x10a81e(0x25b)]('#data')[_0x10a81e(0x1fc)]()[_0x10a81e(0x1ea)]()['header']()[_0x10a81e(0x198)](),
        _0x2b1d3b = [];
    return _0x10e43b[_0x10a81e(0x247)](function (_0x5d65fd) {
        var _0x21415e = _0x10a81e;
        _0x2b1d3b[_0x21415e(0x18b)]($(_0x5d65fd)['html']());
    }), _0x2b1d3b;
}

function buildadpCols(_0x1152ed) {
    var _0x2e8100 = _0xeaae58,
        _0x92eb40 = _0x2e8100(0x1e2);
    for (i = 0x0; i < _0x1152ed[_0x2e8100(0x28d)]; i++) {
        colNum = i + 0x1, _0x92eb40 += _0x2e8100(0x234) + colNum + _0x2e8100(0x1ee) + colNum + '\x22\x20width=\x2220\x22\x20customWidth=\x221\x22/>';
    }
    return _0x92eb40 += _0x2e8100(0x29b), _0x92eb40;
}

function buildadpRow(_0x4778b3, _0x5c3bbf, _0x3a1e6b) {
    var _0x11030b = _0xeaae58,
        _0x56caaa = _0x3a1e6b ? _0x11030b(0x249) + _0x3a1e6b + '\x22' : '',
        _0x5c117b = _0x11030b(0x1d8) + _0x5c3bbf + '\x22>';
    for (i = 0x0; i < _0x4778b3['length']; i++) {
        colNum = (i + 0xa)[_0x11030b(0x1d4)](0x24)[_0x11030b(0x258)]();
        var _0x2eb0d1 = colNum + _0x5c3bbf;
        _0x5c117b += _0x11030b(0x1de) + _0x2eb0d1 + '\x22' + _0x56caaa + '>' + '<is>' + '<t>' + _0x4778b3[i] + _0x11030b(0x26d) + '</is>' + _0x11030b(0x295);
    }
    return _0x5c117b += _0x11030b(0x242), _0x5c117b;
}

function getadpTableData(_0x17110d, _0x1df117) {
    var _0x1b479 = _0xeaae58,
        _0x17dc8c = getadpHeaderNames(_0x17110d),
        _0x17110d = $(_0x17110d)[_0x1b479(0x25b)](_0x1b479(0x238))[_0x1b479(0x1fc)](),
        _0x5c5777 = 0x1,
        _0x4d6ed1 = '',
        _0x1ffa5e = '';
    return _0x1ffa5e += buildadpCols(_0x17dc8c), _0x1ffa5e += _0x1b479(0x282), _0x1df117[_0x1b479(0x28d)] > 0x0 && (_0x1ffa5e += buildadpRow([_0x1df117], _0x5c5777, 0x33), _0x5c5777++, mergeCol = (_0x17dc8c[_0x1b479(0x28d)] - 0x1 + 0xa)[_0x1b479(0x1d4)](0x24)['toUpperCase'](), _0x4d6ed1 = _0x1b479(0x273) + _0x1b479(0x192) + mergeCol + _0x1b479(0x224) + _0x1b479(0x277)), _0x1ffa5e += buildadpRow(_0x17dc8c, _0x5c5777, 0x2), _0x5c5777++, _0x17110d[_0x1b479(0x29c)]()['every'](function (_0x3931e6, _0x34d69c, _0x3af3b5) {
        var _0x1ca03e = _0x1b479,
            _0x536af7 = this[_0x1ca03e(0x1a1)]();
        _0x1ffa5e += buildadpRow(_0x536af7, _0x5c5777, ''), _0x5c5777++;
    }), _0x1ffa5e += _0x1b479(0x29a) + _0x4d6ed1, _0x1ffa5e;
}

function setadpSheetName(_0x40a330, _0x2fb4ae) {
    var _0x422413 = _0xeaae58;
    if (_0x2fb4ae[_0x422413(0x28d)] > 0x0) {
        var _0x3e520d = _0x40a330['xl']['workbook.xml'][_0x422413(0x18c)](_0x422413(0x240))[0x0];
        _0x3e520d[_0x422413(0x20c)]('name', _0x2fb4ae);
    }
}

function addadpSheet(_0x5659cf, _0x597eed, _0x3af049, _0x3376a0, _0x2e78c1) {
    var _0x2f01e2 = _0xeaae58,
        _0x237eda = _0x5659cf[_0x2f01e2(0x1c3)][_0x2f01e2(0x18c)]('Override')[0x1],
        _0x239446 = _0x237eda[_0x2f01e2(0x215)](!![]);
    _0x239446['setAttribute'](_0x2f01e2(0x18a), _0x2f01e2(0x184) + _0x2e78c1 + _0x2f01e2(0x1e5)), _0x5659cf[_0x2f01e2(0x1c3)]['getElementsByTagName']('Types')[0x0][_0x2f01e2(0x276)](_0x239446);
    var _0x237eda = _0x5659cf['xl'][_0x2f01e2(0x298)][_0x2f01e2(0x292)][_0x2f01e2(0x18c)](_0x2f01e2(0x1ca))[0x0],
        _0x239446 = _0x237eda[_0x2f01e2(0x215)](!![]);
    _0x239446[_0x2f01e2(0x20c)]('Id', _0x2f01e2(0x20e) + _0x2e78c1 + 0x1), _0x239446['setAttribute'](_0x2f01e2(0x261), _0x2f01e2(0x226) + _0x2e78c1 + _0x2f01e2(0x1e5)), _0x5659cf['xl']['_rels']['workbook.xml.rels'][_0x2f01e2(0x18c)]('Relationships')[0x0][_0x2f01e2(0x276)](_0x239446);
    var _0x237eda = _0x5659cf['xl']['workbook.xml'][_0x2f01e2(0x18c)](_0x2f01e2(0x240))[0x0],
        _0x239446 = _0x237eda[_0x2f01e2(0x215)](!![]);
    _0x239446[_0x2f01e2(0x20c)](_0x2f01e2(0x18d), _0x3376a0), _0x239446[_0x2f01e2(0x20c)](_0x2f01e2(0x257), _0x2e78c1), _0x239446[_0x2f01e2(0x20c)](_0x2f01e2(0x1c2), _0x2f01e2(0x20e) + _0x2e78c1 + 0x1), _0x5659cf['xl'][_0x2f01e2(0x1db)]['getElementsByTagName'](_0x2f01e2(0x1ce))[0x0][_0x2f01e2(0x276)](_0x239446);
    var _0x5ec052 = '<?xml\x20version=\x221.0\x22\x20encoding=\x22UTF-8\x22\x20standalone=\x22yes\x22?>' + _0x2f01e2(0x22a) + getadpTableData(_0x597eed, _0x3af049) + _0x2f01e2(0x245);
    _0x5659cf['xl']['worksheets']['sheet' + _0x2e78c1 + _0x2f01e2(0x1e5)] = $['parseXML'](_0x5ec052);
}

function Exportadpmultiplesheets() {
    var _0x547319 = _0xeaae58;
    const _0x478432 = document[_0x547319(0x1b1)]('mob-width');
    if (_0x478432 != null && _0x478432 != undefined) {
        const _0x32fa6a = Array[_0x547319(0x1f7)](_0x478432[_0x547319(0x28e)]);
        _0x32fa6a[_0x547319(0x19f)](), _0x32fa6a[_0x547319(0x19f)]();
        const _0x305b20 = _0x32fa6a[_0x547319(0x28b)](_0x57ad3c => {
            return _0x57ad3c['id'];
        });
        firstadptableid = _0x305b20[0x1][_0x547319(0x237)](_0x547319(0x22b))[0x1] + _0x547319(0x19c);
        var _0x7c1df0 = '';
        _0x305b20[0x1][_0x547319(0x24e)]('ADP-') ? _0x7c1df0 = _0x305b20[0x0][_0x547319(0x237)](_0x547319(0x21b))[0x1] : _0x7c1df0 = _0x305b20[0x0][_0x547319(0x237)]('ADP_')[0x1];
        var _0x576e9f = 0x0;
        $('#' + firstadptableid)[_0x547319(0x25b)](_0x547319(0x238))[_0x547319(0x1fc)]({
            'dom': _0x547319(0x1e8),
            'pageLength': 0x64,
            'ordering': ![],
            'buttons': [{
                'extend': 'excel',
                'title': _0x547319(0x20d),
                'customize': function (_0x1657ec) {
                    var _0x324c27 = _0x547319;
                    setadpSheetName(_0x1657ec, _0x7c1df0);
                    for (let _0x23156b = 0x3; _0x23156b < _0x305b20['length']; _0x23156b++) {
                        if (_0x23156b > 0x2 && _0x305b20[_0x23156b][_0x324c27(0x24e)](_0x324c27(0x22b))) {
                            var _0x3ce778 = _0x305b20[_0x23156b][_0x324c27(0x237)](_0x324c27(0x22b))[0x1] + _0x324c27(0x19c);
                            _0x305b20[_0x23156b][_0x324c27(0x24e)](_0x324c27(0x21b)) ? tablename = _0x305b20[_0x23156b]['split'](_0x324c27(0x21b))[0x1] : tablename = _0x305b20[_0x23156b][_0x324c27(0x237)]('ADP')[0x1], addadpSheet(_0x1657ec, '#' + _0x3ce778, tablename, tablename, (_0x23156b - 0x1)['toString']()), _0x576e9f++;
                        }
                    }
                }
            }]
        }), totaladplen = _0x305b20['length'];
        for (k = 0x3; k < _0x305b20[_0x547319(0x28d)]; k++) {
            if (_0x305b20[k]['includes'](_0x547319(0x22b))) {
                var _0x4a7c88 = _0x305b20[k][_0x547319(0x237)](_0x547319(0x22b))[0x1] + _0x547319(0x19c);
                $('#' + _0x4a7c88)[_0x547319(0x25b)](_0x547319(0x238))[_0x547319(0x1fc)]({
                    'dom': _0x547319(0x1e8),
                    'pageLength': 0x64,
                    'ordering': ![],
                    'buttons': [{
                        'extend': _0x547319(0x19a),
                        'title': _0x547319(0x20d)
                    }]
                }), operationsCompletedadp = k;
            }
        }
    }
}

function _0x356c() {
    var _0x275ca5 = ['filter', '#site-data', 'type', '\x22\x20style=\x22visibility:hidden;height:1px;display:block\x22\x20>', 'success', '.dismiss-btn', 'tltp-pin', 'sheet', '#adpstatus', '</row>', 'log', 'collapse', '</worksheet>', 'Success', 'forEach', '#e99123', '\x20s=\x22', 'absolute', '\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22>', 'none', '#adp-status\x20#adp-status-nodata', 'includes', 'replace', 'green-bg', 'orange-bg', 'site_data', '</span></td>', '<tr\x20class=\x22text-uppercase\x22\x20style=\x22border:\x201px;\x20background-color:\x20#056aa1;\x20font-size:12px\x22>', '<td\x20class=\x22white-text\x20has-details\x20', 'classList', 'sheetId', 'toUpperCase', '#new-label', 'checked', 'find', 'isWSConnected', '</thead>', 'html', '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-content\x22\x20class=\x22profile\x22>OUTPUT</a></td>', '\x22\x20style=\x22border:\x201px\x20solid\x20#303234;\x20white-space:nowrap;font-size:12px;\x22>', 'Target', '_li\x20a', 'block', '<td\x20colspan=\x2212\x22\x20class=\x22hiddenRow\x20border-0\x20p-0\x20col-12\x22>', 'getBoundingClientRect', 'get', 'hidden', 'innerWidth', 'failure', 'dialog-for-content', '312540MvGYNQ', 'substring', '</t>', 'ADP\x20UPDATE\x20PAUSED', 'matrix', 'Redis\x20not\x20reachable.', '1811252zOcrvq', '\x20mt-4\x20text-justify\x20float-left\x22>', '<mergeCells\x20count=\x221\x22>', 'display', 'each', 'appendChild', '</mergeCells>', 'comment', '845xTsYOn', 'value', 'GET', 'site', 'object', '#plps-text', 'key_data', '<div\x20class=\x22', '.playpause-div', '<sheetData>', '/lesites/getallsitenames', 'adpLED', 'hasClass', 'show', 'white', '</td\x20class=\x22details_td\x22>\x20<td>:</td><td\x20class=\x22details_td\x22>', '2px\x20solid\x20#16d39a', '#fff', 'map', '<td\x20class=\x22px-5\x20py-1\x20profile-td\x22><a\x20id=\x22', 'length', 'children', '<i\x20data-feather=\x22message-square\x22\x20onclick=\x22openShowcommentModal(this,\x27', '<div\x20class=\x22page-header\x22>\x20', 'setItem', 'workbook.xml.rels', '</h4>', '-60%', '</c>', 'adp-status', '</th>', '_rels', '<tr\x20class=\x22collapse-tr\x20parent\x20row\x22\x20style=\x22background-color:#1f1f1f\x22\x20id=\x22', '</sheetData>', '</cols>', 'rows', '_li', '#adp-status\x20#site-list\x20#', '<span>-', '/xl/worksheets/sheet', 'file_content', '1831338IWpsqV', '<th>', 'getSeconds', '/bod-eodstatus/getbodeodkeys', 'PartName', 'push', 'getElementsByTagName', 'name', 'toggleClass', 'append', '<td>', '#dialog-for-content\x20#nodata\x20#nodatamessage', '<mergeCell\x20ref=\x22A1:', 'No\x20Keys', '#file_content', 'code', '<td\x20class=\x22\x22\x20style=\x22color:#808080\x22>', 'active', 'toArray', 'white-bg', 'excel', '</div>\x20', '-data', '<p\x20class=\x22tab-indent\x22>-', '.switch_label', 'shift', 'file-info', 'data', 'visibility', '<tr\x20class=\x22', 'random', 'green', '<td\x20style=\x22color:#0000cd\x20\x22>', 'parse', '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-showcomments\x22></i>', 'newlabeldisplay', '_li\x20', 'refreshedsite', '</tr>', 'userobj', '<div\x20class=\x22col-12\x22>', 'ADP:ADP_UPDATED_DATA', '<th></th>', 'getElementById', 'click', 'commented_time', 'css', '<td\x20class=\x22white-text\x20', '273392vqWqnD', 'function', '\x22\x20style=\x22border:\x201px;\x22>', '<h5\x20class=\x22size14\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22>Executed\x20On\x20:\x20', 'flex', 'hide', '#adp-status-nodata\x20#nodatamessage', 'status', '\x20commented\x20on\x20', '#dialog-for-content\x20#nodata', '#16d39a', '<tr\x20class=\x22border-0\x20collapse-content\x20row\x22\x20id=\x22child-', 'r:id', '[Content_Types].xml', 'responseData', 'target', 'table', 'unshift', '</table>', 'blue', 'Relationship', 'val', 'position', 'edit', 'sheets', 'id\x22\x20style=\x22color:#C0C0C0\x22>', '\x20&ensp;>&ensp;\x20<h3\x20class=\x22page-title\x22\x20>\x20ADP\x20Status\x20</h3></div>', '#adp-status\x20#site-data', 'btn-success', 'text', 'toString', 'Comment\x20Status', '29981IuBlcE', 'removeClass', '<row\x20r=\x22', 'Live\x20Update', '</td>', 'workbook.xml', 'paused', 'search', '<c\x20t=\x22inlineStr\x22\x20r=\x22', 'isSuccess', '#syntax', 'No\x20Data', '<cols>', 'add', 'POST', '.xml', 'color', '<tr\x20class=\x22\x22\x20id=\x22', 'Bfrtip', '#adp-status\x20#site-list', 'columns', '<div\x20id=\x22table-view\x22\x20class=\x22col-12\x22\x20style=\x22overflow-x:\x20auto;\x22>', '510775ZTSVMl', 'clicksite', '\x22\x20max=\x22', '#dialog-for-showcomments\x20.modal-body', 'entries', '<tr\x20class=\x22collapse-tr\x20parent\x20row\x22\x20style=\x22background-color:#1f1f1f;visibility:hidden;height:0px\x22\x20id=\x22', '<tbody\x20class=\x22col-12\x22\x20id=\x22mob-width\x22>', '#adp-status\x20#site-list\x20li\x20a', 'done', 'visible-tltp', 'Successfully\x20commented\x20on\x20\x22', 'from', '\x22\x20>', 'keyName', '<table\x20class=\x22row\x22>', '#adp-status\x20#site-list\x20li\x20a.active', 'DataTable', '382sTXXya', '<td\x20class=\x22col-10\x22>', '</div>', '.playpause', 'stringify', 'Failure', 'hasOwnProperty', '\x22\x20\x20>', 'orange', '<td\x20style=\x22color:#C0C0C0\x22>', '2px\x20solid\x20#ff3d57', '</h5>', '#ff3d57', '.buttons-excel', '<td\x20style=\x22color:#e99123\x22>', 'setAttribute', 'ADP', 'rId', 'location', 'key', 'emsg', 'red', 'Dashboard', 'username', 'cloneNode', 'getHours', '<h5\x20class=\x22col-4\x22\x20style=\x22padding-right:0\x22>Add\x20comment\x20to\x20-\x20</h5><div\x20class=\x22col-8\x22style=\x22color:#e99123;padding-left:0;\x22>', 'style', 'empty', 'remove', 'ADP-', '\x20</a>', '</td></tr>', 'left', '<span\x20class=\x22details\x22>', '</tbody>', 'darker', 'error', 'tooltip', '1\x22/>', 'border', 'worksheets/sheet', '_tooltip', '<td\x20style=\x22color:#16d39a\x22>', '6HVWfCR', '<worksheet\x20xmlns=\x22http://schemas.openxmlformats.org/spreadsheetml/2006/main\x22\x20xmlns:r=\x22http://schemas.openxmlformats.org/officeDocument/2006/relationships\x22\x20xmlns:mc=\x22http://schemas.openxmlformats.org/markup-compatibility/2006\x22\x20xmlns:x14ac=\x22http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac\x22\x20mc:Ignorable=\x22x14ac\x22>', 'child-', '\x20@\x20', '<div\x20class=\x22accordian-body\x20col-12\x20border-b\x20collapse\x22\x20id=\x22', 'info', 'visible', 'websocket_url', '#dialog-for-content\x20#file_content', '#adp-status\x20#adp-status-expand', 'replaceAll', '<col\x20min=\x22', 'addClass', 'red-bg', 'split', '#data'];
    _0x356c = function () {
        return _0x275ca5;
    };
    return _0x356c();
}

function operationadp() {
    var _0x135a77 = _0xeaae58;
    ++operationsCompletedadp, operationsCompletedadp === totaladplen && ($('#' + firstadptableid)['find'](_0x135a77(0x20a))[_0x135a77(0x1b2)](), export_adpExcel = ![]);
}

function _0x19b6(_0x313542, _0x2686d4) {
    var _0x356ca4 = _0x356c();
    return _0x19b6 = function (_0x19b6e8, _0x5585c1) {
        _0x19b6e8 = _0x19b6e8 - 0x184;
        var _0x50b125 = _0x356ca4[_0x19b6e8];
        return _0x50b125;
    }, _0x19b6(_0x313542, _0x2686d4);
}

function getadpSiteList() {
    var _0x47b42f = _0xeaae58;
    showLoader(_0x47b42f(0x296)), requestDataFromServer(_0x47b42f(0x283), {
        'type': _0x47b42f(0x1ed),
        'site': params['get'](_0x47b42f(0x27c))
    }, _0x47b42f(0x27b))[_0x47b42f(0x1f4)](function (_0x587d86) {
        var _0x3ba9e5 = _0x47b42f;
        res = JSON[_0x3ba9e5(0x1a7)](_0x587d86);
        if (res[_0x3ba9e5(0x1bd)] == 0xc8) adpSiteResponse = res['data'], getAdpkeys();
        else stopLoader(_0x3ba9e5(0x296));
    });
}

function getAdpkeys() {
    var _0x458a4b = _0xeaae58;
    requestDataFromServer(_0x458a4b(0x189), {
        'sitename': params[_0x458a4b(0x266)](_0x458a4b(0x27c)),
        'mode': _0x458a4b(0x20d)
    }, _0x458a4b(0x27b))['done'](adpkeysResponse);
}

function openShowcommentModal(_0xd19b99, _0x39aa0e) {
    var _0x51c3b3 = _0xeaae58;
    console[_0x51c3b3(0x243)](user_name + _0x51c3b3(0x1be) + JSON[_0x51c3b3(0x201)](_0x39aa0e)), changed_key = _0x39aa0e;
    var _0xc0f0d5 = '';
    _0xc0f0d5 += '<div\x20class=\x22row\x22>', _0x39aa0e = isEdit_dict[_0x39aa0e], _0x39aa0e = JSON['parse'](_0x39aa0e);
    for (var _0x288fb6 = 0x0; _0x288fb6 < _0x39aa0e[_0x51c3b3(0x28d)]; _0x288fb6++) {
        var _0x430fea = _0x39aa0e[_0x288fb6];
        _0xc0f0d5 += _0x51c3b3(0x280) + (_0x288fb6 % 0x2 === 0x0 ? _0x51c3b3(0x278) : _0x51c3b3(0x221)) + _0x51c3b3(0x272), _0xc0f0d5 += '<h4>' + _0x430fea[_0x51c3b3(0x214)] + _0x51c3b3(0x293), _0xc0f0d5 += _0x51c3b3(0x29f) + _0x430fea[_0x51c3b3(0x1b3)] + '</span><br>', _0xc0f0d5 += _0x51c3b3(0x19d) + _0x430fea[_0x51c3b3(0x278)] + '</p>', _0xc0f0d5 += _0x51c3b3(0x1ff);
    }
    _0xc0f0d5 += _0x51c3b3(0x1ff), $(_0x51c3b3(0x1ef))[_0x51c3b3(0x25e)](_0xc0f0d5);
}

function openAddcommentModal(_0x5c21dc, _0x2d623f) {
    var _0x447336 = _0xeaae58;
    changed_key = _0x2d623f, $('#dialog-for-addcomment\x20.modal-title')[_0x447336(0x25e)](_0x447336(0x217) + changed_key + _0x447336(0x1ff));
}

function addComment() {
    var _0x1ae1e6 = _0xeaae58;
    data = {};
    var _0x122004 = new Date();
    data['username'] = user_name, data['commented_time'] = _0x122004['getDate']() + '/' + (_0x122004['getMonth']() + 0x1) + '/' + _0x122004['getFullYear']() + _0x1ae1e6(0x22c) + _0x122004[_0x1ae1e6(0x216)]() + ':' + _0x122004['getMinutes']() + ':' + _0x122004[_0x1ae1e6(0x188)](), data[_0x1ae1e6(0x278)] = $(_0x1ae1e6(0x1e0))[_0x1ae1e6(0x1cb)](), requestDataFromServer('/bod-eodstatus/updatekeys', {
        'sitename': params[_0x1ae1e6(0x266)](_0x1ae1e6(0x27c)),
        'existing_key': changed_key,
        'value': JSON[_0x1ae1e6(0x201)](data)
    }, _0x1ae1e6(0x27b))['done'](function (_0x143681) {
        var _0x5b1553 = _0x1ae1e6;
        _0x143681['responseData'][_0x5b1553(0x195)] == 0xc8 ? swal({
            'title': _0x5b1553(0x1d5),
            'text': _0x5b1553(0x1f6) + _0x143681[_0x5b1553(0x1c4)][_0x5b1553(0x252)] + '\x22.',
            'type': _0x5b1553(0x22e),
            'confirmButtonClass': _0x5b1553(0x1d2),
            'confirmButtonText': 'OK',
            'closeOnConfirm': !![],
            'closeOnCancel': !![]
        }, function (_0x23aa77) {
            var _0xbcd04d = _0x5b1553;
            _0x23aa77 && ($(_0xbcd04d(0x1e0))[_0xbcd04d(0x1cb)](''), requestDataFromServer(_0xbcd04d(0x189), {
                'sitename': params[_0xbcd04d(0x266)](_0xbcd04d(0x27c)),
                'mode': _0xbcd04d(0x20d)
            }, _0xbcd04d(0x27b))[_0xbcd04d(0x1f4)](function (_0x250940) {
                var _0x2cf2d5 = _0xbcd04d;
                if (typeof adpdisplaykeys === _0x2cf2d5(0x1b7)) adpdisplaykeys(_0x250940[_0x2cf2d5(0x1c4)][0x0], _0x250940[_0x2cf2d5(0x1ab)]);
                if (typeof ledColors === _0x2cf2d5(0x1b7)) ledColors(selected_sitename, selected_leurl, selected_websocurl);
            }));
        }) : swal(_0x143681[_0x5b1553(0x1c4)]['site_data'], '\x20', 'error'), $('#dialog-for-addcomment')[_0x5b1553(0x25b)](_0x5b1553(0x23e))[_0x5b1553(0x1b2)]();
    });
}

function adpkeysResponse(_0x324300) {
    var _0x5c5d91 = _0xeaae58;
    const _0x1d2668 = Math[_0x5c5d91(0x1a4)]()['toString'](0x24)[_0x5c5d91(0x26c)](0x2, 0x5);
    if (_0x324300 == undefined) return;
    adpResponse = _0x324300[_0x5c5d91(0x1c4)], stopLoader(_0x5c5d91(0x296));
    if (_0x324300['responseData'][_0x5c5d91(0x28d)] > 0x0) {
        _0x324300['responseData'][_0x5c5d91(0x247)](function (_0x2c59eb) {
            var _0x445fb6 = _0x5c5d91,
                _0x545da4 = {};
            _0x545da4[_0x445fb6(0x27c)] = _0x2c59eb[_0x445fb6(0x27c)], _0x545da4[_0x445fb6(0x1df)] = !![], _0x545da4[_0x445fb6(0x25c)] = ![];
            var _0x4e58fd = 0x0;
            if (_0x2c59eb['site_data'][_0x445fb6(0x28d)] > 0x0) {
                _0x2c59eb[_0x445fb6(0x252)][_0x445fb6(0x247)](function (_0x4b0c54) {
                    var _0x58b8b3 = _0x445fb6,
                        _0x2606d4 = _0x4b0c54[_0x58b8b3(0x27f)],
                        _0x346b63 = _0x2606d4[_0x58b8b3(0x1a1)];
                    if (_0x2606d4[_0x58b8b3(0x23b)] == _0x58b8b3(0x26f)) $[_0x58b8b3(0x275)](_0x346b63, function (_0x28a445) {
                        var _0x55874f = _0x58b8b3,
                            _0x5cace2 = _0x346b63[_0x28a445];
                        $[_0x55874f(0x275)](_0x5cace2, function (_0x4eb93b, _0x5e531e) {
                            var _0x4ac97f = _0x55874f,
                                _0x34ba5f = _0x5cace2[_0x4eb93b];
                            _0x34ba5f[_0x4ac97f(0x1df)] == ![] && _0x4e58fd++;
                        });
                    });
                    else
                        for (var _0x4102ba = 0x0; _0x4102ba < _0x346b63[_0x58b8b3(0x28d)]; _0x4102ba++) {
                            _0x346b63[_0x4102ba][_0x58b8b3(0x1df)] == ![] && _0x4e58fd++;
                        }
                });
                if (_0x4e58fd != 0x0) {
                    _0x545da4['isSuccess'] = ![];
                    if (selectedsite == '\x20') selectedsite = _0x2c59eb['site'];
                }
            } else {
                _0x545da4[_0x445fb6(0x1df)] = ![];
                if (selectedsite == '\x20') selectedsite = _0x2c59eb[_0x445fb6(0x27c)];
            }
            adpSitesData[_0x445fb6(0x18b)](_0x545da4);
            var _0x4b820a = adpSiteResponse[0x0];
            connectAdpWebSocket(_0x4b820a['websocket_url'], _0x545da4[_0x445fb6(0x27c)], 0x0, _0x1d2668);
        });
        var _0x4d964a = '',
            _0x1a9de8 = '';
        $(_0x5c5d91(0x1e9))[_0x5c5d91(0x219)](), siteFailCount = 0x0, adpSitesData[_0x5c5d91(0x247)](function (_0x5be63a) {
            var _0x2b0fe0 = _0x5c5d91;
            _0x5be63a[_0x2b0fe0(0x1df)] ? _0x4d964a += _0x2b0fe0(0x290) + _0x5be63a[_0x2b0fe0(0x27c)] + '\x20&ensp;>&ensp;\x20<h3\x20class=\x22page-title\x22>\x20ADP\x20Status\x20</h3></div>' : (siteFailCount++, _0x1a9de8 += _0x2b0fe0(0x290) + _0x5be63a[_0x2b0fe0(0x27c)] + _0x2b0fe0(0x1d0));
        });
        if (siteFailCount != 0x0) adpFinalStatus = _0x5c5d91(0x202);
        else adpFinalStatus = _0x5c5d91(0x246);
        $('#adpstatus')['html'](adpFinalStatus), adpFinalStatus == _0x5c5d91(0x202) ? $(_0x5c5d91(0x241))[_0x5c5d91(0x1d7)](_0x5c5d91(0x1a5))[_0x5c5d91(0x235)]('red') : $(_0x5c5d91(0x241))[_0x5c5d91(0x1d7)](_0x5c5d91(0x212))['addClass'](_0x5c5d91(0x1a5)), $('#adp-status\x20#site-list')[_0x5c5d91(0x18f)](_0x1a9de8), $(_0x5c5d91(0x1e9))[_0x5c5d91(0x18f)](_0x4d964a), $(_0x5c5d91(0x1f3))['eq'](0x0)[_0x5c5d91(0x235)](_0x5c5d91(0x197));
        if ($(_0x5c5d91(0x1f3))['eq'](0x0)['data']()) selectedsite = $('#adp-status\x20#site-list\x20li\x20a')['eq'](0x0)[_0x5c5d91(0x1a1)]()['id'];
        else {
            if (selectedsite && adpSitesData[_0x5c5d91(0x28d)] > 0x0) selectedsite = adpSitesData[0x0][_0x5c5d91(0x27c)];
        }
        var _0x555500 = adpResponse[0x0];
        adpdisplaykeys(_0x555500, selectedsite);
    } else $(_0x5c5d91(0x1d1))[_0x5c5d91(0x1b4)]('display', 'none'), $(_0x5c5d91(0x24d))['css']('display', _0x5c5d91(0x263)), $(_0x5c5d91(0x1bc))['text'](_0x5c5d91(0x1e1)), $('#adp-status\x20#adp-status-expand')[_0x5c5d91(0x1b4)](_0x5c5d91(0x274), _0x5c5d91(0x24c));
}

function adphovered(_0x1ec166, _0x19bb98) {
    var _0x211450 = _0xeaae58,
        _0x325a98 = _0x19bb98[_0x211450(0x1c5)],
        _0x5d7b6f = _0x325a98[_0x211450(0x265)](),
        _0x27a21b = $(window),
        _0x191738 = document['getElementById'](_0x1ec166);
    _0x191738[_0x211450(0x218)][_0x211450(0x274)] = _0x211450(0x1ba), _0x191738['style'][_0x211450(0x1cc)] = _0x211450(0x24a);
    var _0x518132 = _0x5d7b6f[_0x211450(0x21e)] / window[_0x211450(0x268)] * 0x64;
    if (_0x518132 < 0x55) _0x191738[_0x211450(0x218)]['right'] = _0x211450(0x294);
    else {
        if (_0x518132 > 0x55) { }
    }
}

function pintool(_0x65d9eb) {
    var _0x3f8b3b = _0xeaae58,
        _0x30e703 = document[_0x3f8b3b(0x1b1)](_0x65d9eb),
        _0x84d0df = document['getElementById'](_0x65d9eb + _0x3f8b3b(0x23f));
    _0x30e703[_0x3f8b3b(0x256)]['contains'](_0x3f8b3b(0x1f5)) ? (_0x30e703[_0x3f8b3b(0x256)][_0x3f8b3b(0x21a)](_0x3f8b3b(0x1f5)), _0x84d0df[_0x3f8b3b(0x218)][_0x3f8b3b(0x1e6)] = _0x3f8b3b(0x28a)) : (_0x30e703[_0x3f8b3b(0x256)][_0x3f8b3b(0x1e3)](_0x3f8b3b(0x1f5)), _0x84d0df[_0x3f8b3b(0x218)][_0x3f8b3b(0x1e6)] = _0x3f8b3b(0x248));
}

function adpdisplaykeys(_0xb98654, _0x48d62b) {
    var _0x39a896 = _0xeaae58;
    isEdit_dict = {};
    if (open_rows) {
        var _0x231e52 = !![];
        _0xb98654['site_data'][_0x39a896(0x28d)] == 0x1 ? _0x231e52 = !![] : _0x231e52 = ![];
        keyFailCount = 0x0, keyGreenCount = 0x0, keyBlueCount = 0x0, keyOrangeCount = 0x0, keyWhiteCount = 0x0;
        if (_0xb98654[_0x39a896(0x252)][_0x39a896(0x28d)] > 0x0) {
            redisKeys = [], keyHtml = '';
            var _0x30d13d = '',
                _0x3c7efe = '',
                _0x464811 = '',
                _0x330959 = '',
                _0x1ddf40 = '';
            outkeyHtml = '', outkeyHtml += '<div\x20class=\x22row\x20py-2\x20site-keys\x22\x20id=\x22' + _0xb98654[_0x39a896(0x27c)] + '\x22>', outkeyHtml += _0x39a896(0x1ae), outkeyHtml += _0x39a896(0x1fa), outkeyHtml += _0x39a896(0x1f2);
            const _0x1b9731 = {
                'key': _0x39a896(0x1af),
                'key_data': {
                    'overallStatus': !![],
                    'status': 0x0,
                    'type': _0x39a896(0x1c6),
                    'data': [{
                        'segment': 'Adp\x20enable\x20with\x20live\x20updates',
                        'isSuccess': !![],
                        'status': 0x2
                    }]
                }
            };
            _0xb98654[_0x39a896(0x252)][_0x39a896(0x1c7)](_0x1b9731);
            var _0x253daa = 0x1;
            _0xb98654[_0x39a896(0x252)][_0x39a896(0x247)](function (_0x34b6c0) {
                var _0x54b5c8 = _0x39a896,
                    _0x12345c = {},
                    _0x28daeb = _0x34b6c0[_0x54b5c8(0x27f)],
                    _0x455ab1 = _0x28daeb[_0x54b5c8(0x1a1)],
                    _0x4aeed4 = _0x28daeb[_0x54b5c8(0x1cd)];
                failCount = 0x0, greenCount = 0x0, orangeCount = 0x0, whiteCount = 0x0, rowHtmlgreen = '', rowHtmlblue = '', rowHtmlred = '', rowHtmlorange = '', rowHtmlwhite = '', rowHtml = '';
                var _0x29a720 = '',
                    _0x16c11e = '',
                    _0x8a4fd4 = '',
                    _0x3abaac = '',
                    _0x1fe4c6 = '',
                    _0x1aa387 = _0x34b6c0[_0x54b5c8(0x210)];
                _0x1aa387 = _0x1aa387[_0x54b5c8(0x233)](/[:.]/g, '_');
                if (_0x28daeb[_0x54b5c8(0x23b)] == _0x54b5c8(0x26f)) {
                    var _0x1139a9 = '';
                    _0x29a720 = '', _0x8a4fd4 = '', _0x16c11e = '', _0x3abaac = '', _0x1fe4c6 = '', $[_0x54b5c8(0x275)](_0x455ab1, function (_0xd116d) {
                        var _0x2ce752 = _0x54b5c8;
                        isRowContainsRed = 0x0, isRowContainsGreen = 0x0, isRowContainsBlue = 0x0, isRowContainsOrange = 0x0, isRowContainsWhite = 0x0;
                        var _0x406396 = _0xd116d + _0x2ce752(0x227),
                            _0x44e1df = '',
                            _0x75a08e = _0x455ab1[_0xd116d],
                            _0x5ba541 = '';
                        $[_0x2ce752(0x275)](_0x75a08e, function (_0x133e28, _0x282956) {
                            var _0x398730 = _0x2ce752,
                                _0x3bd034 = _0x75a08e[_0x133e28];
                            if (typeof _0x3bd034 == _0x398730(0x27d)) {
                                if (_0x3bd034[_0x398730(0x1bd)] == 0x0) _0x5ba541 = _0x398730(0x236), failCount++, isRowContainsRed++;
                                else {
                                    if (_0x3bd034['status'] == 0x1) _0x5ba541 = _0x398730(0x251), orangeCount++, isRowContainsOrange++;
                                    else {
                                        if (_0x3bd034['status'] == 0x2) _0x5ba541 = _0x398730(0x250), greenCount++, isRowContainsGreen++;
                                        else _0x3bd034[_0x398730(0x1bd)] == 0x5 ? (_0x5ba541 = 'blue-bg', blueCount++, isRowContainsBlue++) : (_0x5ba541 = _0x398730(0x199), whiteCount++, isRowContainsWhite++);
                                    }
                                }
                                if (_0x3bd034[_0x398730(0x203)](_0x398730(0x223))) {
                                    var _0xb9b210 = '<table>',
                                        _0x41d3d0 = '';
                                    for (const [_0x148e56, _0x17d5d2] of Object[_0x398730(0x1f0)](_0x3bd034['tooltip'])) {
                                        _0x41d3d0 += '<tr><td\x20class=\x22details_td\x22>' + _0x148e56 + _0x398730(0x288) + _0x17d5d2 + _0x398730(0x21d);
                                    }
                                    _0xb9b210 += _0x41d3d0, _0xb9b210 += _0x398730(0x1c8), _0x44e1df += _0x398730(0x255) + _0x5ba541 + _0x398730(0x204) + _0x3bd034[_0x398730(0x27a)] + _0x398730(0x21f) + _0xb9b210 + _0x398730(0x253);
                                } else _0x44e1df += _0x398730(0x1b5) + _0x5ba541 + '\x22>' + _0x3bd034[_0x398730(0x27a)] + '</td>';
                            } else _0x44e1df += _0x398730(0x196) + _0x3bd034 + _0x398730(0x1da);
                        });
                        if (isRowContainsRed) html = '<td\x20style=\x22color:#ff3d57\x22>' + _0xd116d + _0x2ce752(0x1da), html = html + _0x44e1df, _0x29a720 += _0x2ce752(0x1e7) + _0xd116d[_0x2ce752(0x233)]('/', '_') + _0x2ce752(0x1cf) + html + _0x2ce752(0x1ac);
                        else {
                            if (isRowContainsOrange) html = _0x2ce752(0x20b) + _0xd116d + _0x2ce752(0x1da), html = html + _0x44e1df, _0x3abaac += _0x2ce752(0x1e7) + _0xd116d[_0x2ce752(0x233)]('/', '_') + _0x2ce752(0x1cf) + html + _0x2ce752(0x1ac);
                            else {
                                if (isRowContainsBlue) html = _0x2ce752(0x1a6) + _0xd116d + _0x2ce752(0x1da), html = html + _0x44e1df, _0x16c11e += _0x2ce752(0x1e7) + _0xd116d[_0x2ce752(0x233)]('/', '_') + _0x2ce752(0x1cf) + html + _0x2ce752(0x1ac);
                                else isRowContainsGreen ? (html = _0x2ce752(0x228) + _0xd116d + '</td>', html = html + _0x44e1df, _0x8a4fd4 += _0x2ce752(0x1e7) + _0xd116d[_0x2ce752(0x233)]('/', '_') + _0x2ce752(0x1cf) + html + '</tr>') : (html = _0x2ce752(0x206) + _0xd116d + _0x2ce752(0x1da), html = html + _0x44e1df, _0x1fe4c6 += _0x2ce752(0x1e7) + _0xd116d[_0x2ce752(0x233)]('/', '_') + _0x2ce752(0x1cf) + html + '</tr>');
                            }
                        }
                    }), rowHtml = _0x29a720 + _0x3abaac + _0x8a4fd4 + _0x1fe4c6;
                } else {
                    var _0x1139a9 = '';
                    for (var _0x1fc80a = 0x0; _0x1fc80a < _0x455ab1[_0x54b5c8(0x28d)]; _0x1fc80a++) {
                        var _0x2a1be0 = !![];
                        tempHtml = '', $[_0x54b5c8(0x275)](_0x455ab1[_0x1fc80a], function (_0xd6ca60, _0x114a14) {
                            var _0xea1a10 = _0x54b5c8;
                            _0xd6ca60 == _0xea1a10(0x1df) && _0x114a14 == ![] && (_0x2a1be0 = ![]);
                            if (typeof _0x114a14 == _0xea1a10(0x27d)) _0x114a14 = JSON[_0xea1a10(0x201)](_0x114a14);
                            if (_0xd6ca60[_0xea1a10(0x24e)]('file_path')) tempHtml += _0xea1a10(0x28c) + _0x1fc80a + '-' + _0xea1a10(0x1a0) + '\x22\x20onclick=\x22onFileinfo(\x27' + _0x114a14 + '\x27,' + _0x1fc80a + ',\x27' + _0x34b6c0[_0xea1a10(0x210)][_0xea1a10(0x233)](/[/:.]/g, '_') + _0xea1a10(0x25f);
                            else {
                                if (_0xd6ca60 != _0xea1a10(0x1df)) tempHtml += _0xea1a10(0x190) + _0x114a14 + _0xea1a10(0x1da);
                            }
                        });
                        if (_0x455ab1[_0x1fc80a][_0x54b5c8(0x1bd)] == 0x0) rowColor = _0x54b5c8(0x212), failCount++, rowHtmlred += _0x54b5c8(0x1a3) + rowColor + '\x22\x20style=\x22border:\x201px\x20solid\x20#303234;\x20white-space:nowrap;font-size:12px;\x22>' + tempHtml + _0x54b5c8(0x1ac);
                        else {
                            if (_0x455ab1[_0x1fc80a][_0x54b5c8(0x1bd)] == 0x1) rowColor = 'orange', orangeCount++, rowHtmlorange += _0x54b5c8(0x1a3) + rowColor + _0x54b5c8(0x260) + tempHtml + '</tr>';
                            else _0x455ab1[_0x1fc80a][_0x54b5c8(0x1bd)] == 0x2 ? (rowColor = 'green', greenCount++, rowHtmlgreen += _0x54b5c8(0x1a3) + rowColor + _0x54b5c8(0x260) + tempHtml + _0x54b5c8(0x1ac)) : (rowColor = _0x54b5c8(0x287), whiteCount++, rowHtmlwhite += _0x54b5c8(0x1a3) + rowColor + _0x54b5c8(0x260) + tempHtml + _0x54b5c8(0x1ac));
                        }
                    }
                }
                var _0x44e2c5 = _0x34b6c0[_0x54b5c8(0x210)];
                _0x12345c['keyName'] = _0x44e2c5, _0x12345c[_0x54b5c8(0x27c)] = _0xb98654[_0x54b5c8(0x27c)], keyName = _0x44e2c5['split'](':')[0x1][_0x54b5c8(0x233)]('_', '-');
                _0x253daa ? (keyHtml += _0x54b5c8(0x1f1) + _0x34b6c0[_0x54b5c8(0x210)] + '\x22>', --_0x253daa) : keyHtml += _0x54b5c8(0x299) + _0x34b6c0['key'] + '\x22>';
                keyHtml += _0x54b5c8(0x1fe), keyHtml += '\x20<a\x20data-toggle=\x22collapse\x22\x20class=\x22accordion-toggle\x20row\x22\x20href=\x22#' + _0x1aa387[_0x54b5c8(0x233)]('/', '_') + _0x54b5c8(0x19c) + '\x22>';
                var _0xf05a82 = _0x54b5c8(0x246);
                if (_0x34b6c0[_0x54b5c8(0x27f)]['hasOwnProperty'](_0x54b5c8(0x1bd))) {
                    if (_0x34b6c0[_0x54b5c8(0x27f)][_0x54b5c8(0x1bd)] == 0x0) {
                        var _0xf05a82 = _0x54b5c8(0x202),
                            _0x20e7b1 = _0x54b5c8(0x212);
                        keyFailCount++, _0x12345c[_0x54b5c8(0x1df)] = ![];
                    } else {
                        if (_0x34b6c0['key_data'][_0x54b5c8(0x1bd)] == 0x1) {
                            var _0x20e7b1 = _0x54b5c8(0x205);
                            keyOrangeCount++, _0x12345c[_0x54b5c8(0x1df)] = ![];
                        } else {
                            if (_0x34b6c0['key_data'][_0x54b5c8(0x1bd)] == 0x5) {
                                var _0x20e7b1 = _0x54b5c8(0x1c9);
                                keyBlueCount++, _0x12345c[_0x54b5c8(0x1df)] = ![];
                            } else {
                                if (_0x34b6c0['key_data']['status'] == 0x2) {
                                    var _0x20e7b1 = _0x54b5c8(0x1a5);
                                    keyGreenCount++, _0x12345c['isSuccess'] = !![];
                                } else _0x12345c['isSuccess'] = !![];
                            }
                        }
                    }
                } else var _0x20e7b1 = _0x54b5c8(0x287);
                redisKeys[_0x54b5c8(0x18b)](_0x12345c), keyHtml += '<h4\x20class=\x22card-titles\x20' + _0x20e7b1 + _0x54b5c8(0x24b) + keyName + _0x54b5c8(0x293);
                (_0x20e7b1 == _0x54b5c8(0x212) || _0x20e7b1 == _0x54b5c8(0x205) || _0x20e7b1 == 'blue') && (_0x4aeed4 != undefined && (_0x4aeed4[_0x54b5c8(0x28d)] != 0x0 && (isEdit_dict[_0x44e2c5] = JSON[_0x54b5c8(0x201)](_0x4aeed4), keyHtml += _0x54b5c8(0x28f) + _0x44e2c5 + _0x54b5c8(0x1a8))), keyHtml += '<i\x20data-feather=\x22edit\x22\x20onclick=\x22openAddcommentModal(this,\x27' + _0x44e2c5 + '\x27)\x22\x20data-toggle=\x22modal\x22\x20data-target=\x22#dialog-for-addcomment\x22></i>');
                keyHtml += _0x54b5c8(0x190), keyHtml += _0x54b5c8(0x21c), keyHtml += '\x20</td>', keyHtml += _0x54b5c8(0x1ac);
                _0x34b6c0[_0x54b5c8(0x210)] == 'ADP:ADP_UPDATED_DATA' ? keyHtml += _0x54b5c8(0x1c1) + _0x34b6c0[_0x54b5c8(0x210)][_0x54b5c8(0x24f)](/[/:.]/g, '_') + _0x54b5c8(0x23c) : keyHtml += _0x54b5c8(0x1c1) + _0x34b6c0['key']['replace'](/[/:.]/g, '_') + _0x54b5c8(0x1f8);
                keyHtml += _0x54b5c8(0x264), keyHtml += _0x54b5c8(0x22d) + _0x1aa387[_0x54b5c8(0x233)]('/', '_') + _0x54b5c8(0x19c) + _0x54b5c8(0x1b8), keyHtml += '<div\x20class=\x22row\x20card-body\x20py-lg-4\x20py-2\x20\x22>', keyHtml += _0x54b5c8(0x1ae), keyHtml += _0x54b5c8(0x1b9) + _0x28daeb['executedOn'] + _0x54b5c8(0x208), keyHtml += '</div>', keyHtml += _0x54b5c8(0x1eb), keyHtml += '<table\x20id=\x22data\x22\x20style=\x22border:\x201px;\x20background-color:\x20##191818\x22>', keyHtml += '<thead\x20class=\x22table-head\x22\x20style=\x22border:\x201px\x20solid\x20#303234;\x22>', keyHtml += _0x54b5c8(0x254);
                var _0x28daeb = _0x34b6c0['key_data'],
                    _0x455ab1 = _0x28daeb['data'];
                theadHtml = '';
                _0x28daeb[_0x54b5c8(0x23b)] == _0x54b5c8(0x26f) ? (theadHtml += _0x54b5c8(0x1b0), $['each'](_0x455ab1[Object['keys'](_0x455ab1)[0x0]], function (_0x31aa0b) {
                    var _0x4ef87f = _0x54b5c8;
                    theadHtml += _0x4ef87f(0x187) + _0x31aa0b + _0x4ef87f(0x297);
                })) : $[_0x54b5c8(0x275)](_0x455ab1[0x0], function (_0x173089) {
                    var _0x47f0c3 = _0x54b5c8;
                    if (_0x173089 != _0x47f0c3(0x1df)) theadHtml += '<th\x20style=\x22border:\x201px\x20solid\x20#303234;\x22>' + _0x173089 + _0x47f0c3(0x297);
                });
                keyHtml = keyHtml + theadHtml, keyHtml += _0x54b5c8(0x1ac), keyHtml += _0x54b5c8(0x25d), keyHtml += '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22>', keyHtml = keyHtml + rowHtml + rowHtmlred + rowHtmlorange + rowHtmlgreen + rowHtmlwhite, keyHtml += '</tbody>', keyHtml += _0x54b5c8(0x1c8), keyHtml += _0x54b5c8(0x1ff), keyHtml += _0x54b5c8(0x1ff), keyHtml += _0x54b5c8(0x19b), keyHtml += _0x54b5c8(0x1da), keyHtml += '</tr>';
                if (_0x20e7b1 == _0x54b5c8(0x212)) _0x30d13d += keyHtml;
                else {
                    if (_0x20e7b1 == 'orange') _0x3c7efe += keyHtml;
                    else {
                        if (_0x20e7b1 == _0x54b5c8(0x1c9)) _0x464811 += keyHtml;
                        else _0x20e7b1 == _0x54b5c8(0x1a5) ? _0x330959 += keyHtml : _0x1ddf40 += keyHtml;
                    }
                }
                keyHtml = '', rowHtmlgreen = '', rowHtmlorange = '', rowHtmlblue = '', rowHtmlwhite = '', rowHtmlred = '';
            }), outkeyHtml += _0x30d13d, outkeyHtml += _0x3c7efe, outkeyHtml += _0x464811, outkeyHtml += _0x330959, outkeyHtml += _0x1ddf40, outkeyHtml += _0x39a896(0x220), outkeyHtml += '</table>', outkeyHtml += '</div>', outkeyHtml += _0x39a896(0x1ff), _0x48d62b === selectedsite && ($(_0x39a896(0x1d1))[_0x39a896(0x1b4)](_0x39a896(0x274), _0x39a896(0x263)), $(_0x39a896(0x24d))['css'](_0x39a896(0x274), 'none'), $('#adp-status\x20#adp-status-expand')[_0x39a896(0x1b4)](_0x39a896(0x274), 'block'), $(_0x39a896(0x1d1))[_0x39a896(0x219)](), $(_0x39a896(0x1d1))[_0x39a896(0x18f)](outkeyHtml)), _0x231e52 && (document['getElementsByClassName']('toggleSwitch')[0x0][_0x39a896(0x1b2)](), checkadpbx = document[_0x39a896(0x1b1)]('expand'), checkadpbx[_0x39a896(0x25a)] = !![]);
        } else keyFailCount++, $(_0x39a896(0x1d1))[_0x39a896(0x1b4)](_0x39a896(0x274), _0x39a896(0x24c)), $(_0x39a896(0x24d))[_0x39a896(0x1b4)]('display', _0x39a896(0x263)), $(_0x39a896(0x232))[_0x39a896(0x1b4)](_0x39a896(0x274), _0x39a896(0x24c)), _0xb98654[_0x39a896(0x195)] == 0xc8 ? $(_0x39a896(0x1bc))['text'](_0x39a896(0x193)) : $(_0x39a896(0x1bc))[_0x39a896(0x1d3)](_0x39a896(0x270));
        feather[_0x39a896(0x24f)](), Exportadpmultiplesheets();
        checkadpbx['checked'] == !![] && checkadpbx[_0x39a896(0x1b2)]();
        if (document[_0x39a896(0x1b1)](_0x39a896(0x284))) {
            if (keyFailCount != 0x0) document[_0x39a896(0x1b1)](_0x39a896(0x284))[_0x39a896(0x218)][_0x39a896(0x1e6)] = _0x39a896(0x209);
            else {
                if (keyOrangeCount != 0x0) document['getElementById'](_0x39a896(0x284))[_0x39a896(0x218)]['color'] = '#e99123';
                else {
                    if (keyGreenCount != 0x0) document[_0x39a896(0x1b1)]('adpLED')[_0x39a896(0x218)][_0x39a896(0x1e6)] = _0x39a896(0x1c0);
                    else document[_0x39a896(0x1b1)](_0x39a896(0x284))['style'][_0x39a896(0x1e6)] = 'white';
                }
            }
        }
    } else console[_0x39a896(0x243)](_0x39a896(0x26e));
}

function adpchangestatus(_0xc71eaf, _0x3660c4) {
    var _0x347d3a = _0xeaae58,
        _0x5cfd40 = adpSitesData[0x0];
    _0x3660c4 == 0x0 ? (_0x5cfd40[_0x347d3a(0x1df)] = !![], $(_0x347d3a(0x29e) + _0xc71eaf + _0x347d3a(0x29d))[_0x347d3a(0x1d7)](_0x347d3a(0x269))['addClass']('success'), $(_0x347d3a(0x29e) + _0xc71eaf + _0x347d3a(0x262))[_0x347d3a(0x1d7)](_0x347d3a(0x212))[_0x347d3a(0x235)](_0x347d3a(0x1a5))) : (_0x5cfd40[_0x347d3a(0x1df)] = ![], $(_0x347d3a(0x29e) + _0xc71eaf + _0x347d3a(0x29d))[_0x347d3a(0x1d7)](_0x347d3a(0x23d))['addClass']('failure'), $('#adp-status\x20#site-list\x20#' + _0xc71eaf + _0x347d3a(0x262))[_0x347d3a(0x1d7)](_0x347d3a(0x1a5))[_0x347d3a(0x235)](_0x347d3a(0x212)));
    var _0x12893e = adpSitesData['some'](_0xcd4a7e => _0xcd4a7e['isSuccess'] == ![]);
    _0x12893e ? adpFinalStatus = _0x347d3a(0x202) : adpFinalStatus = _0x347d3a(0x246), $(_0x347d3a(0x241))[_0x347d3a(0x25e)](adpFinalStatus), document[_0x347d3a(0x1b1)](_0x347d3a(0x284)) != null && (adpFinalStatus == _0x347d3a(0x202) ? document[_0x347d3a(0x1b1)](_0x347d3a(0x284))[_0x347d3a(0x256)]['remove'](_0x347d3a(0x1a5)) : document[_0x347d3a(0x1b1)](_0x347d3a(0x284))[_0x347d3a(0x256)][_0x347d3a(0x21a)]('red'), adpFinalStatus == _0x347d3a(0x202) ? document['getElementById']('adpLED')['classList'][_0x347d3a(0x1e3)](_0x347d3a(0x212)) : document[_0x347d3a(0x1b1)]('adpLED')[_0x347d3a(0x256)]['add']('green'));
}

function clickOnAll(_0x433f1b) {
    var _0x2e59c3 = _0xeaae58;
    checkadpbx = _0x433f1b;
    var _0x355f7a = redisKeys[_0x2e59c3(0x239)](_0xbdf7d1 => _0xbdf7d1[_0x2e59c3(0x27c)] === selectedsite);
    _0x433f1b[_0x2e59c3(0x25a)] == !![] ? ($(_0x2e59c3(0x19e))[_0x2e59c3(0x1d3)](''), _0x355f7a['forEach'](function (_0x17a939) {
        var _0x5f0173 = _0x2e59c3,
            _0x584ad4 = _0x17a939[_0x5f0173(0x1f9)];
        _0x584ad4 = _0x584ad4['replaceAll'](/[/:.]/g, '_'), $('#' + selectedsite + '\x20#' + _0x584ad4 + _0x5f0173(0x19c))[_0x5f0173(0x244)](_0x5f0173(0x286));
    })) : ($(_0x2e59c3(0x19e))[_0x2e59c3(0x1d3)](''), _0x433f1b[_0x2e59c3(0x25a)] == ![], _0x355f7a[_0x2e59c3(0x247)](function (_0x34f4a8) {
        var _0x35f2f1 = _0x2e59c3,
            _0x363949 = _0x34f4a8[_0x35f2f1(0x1f9)];
        _0x363949 = _0x363949[_0x35f2f1(0x233)](/[/:.]/g, '_'), $('#' + selectedsite + '\x20#' + _0x363949 + _0x35f2f1(0x19c))[_0x35f2f1(0x244)]('hide');
    }));
}

function onAdpSiteTabchange(_0x1124a8) {
    var _0x30fbdb = _0xeaae58;
    selectedsite = _0x1124a8, $(_0x30fbdb(0x1fb))[_0x30fbdb(0x1d7)]('active'), $('#adp-status\x20#site-list\x20#' + _0x1124a8 + _0x30fbdb(0x1aa) + 'a')[_0x30fbdb(0x235)](_0x30fbdb(0x197)), $(_0x30fbdb(0x23a))[_0x30fbdb(0x219)]();
    var _0xd86809 = adpSitesData[0x0];
    _0xd86809['isWSConnected'] == ![] && (_0xd86809 = adpSiteResponse[0x0], connectAdpWebSocket(_0xd86809[_0x30fbdb(0x230)], selectedsite, 0x0)), startAdpLoader(), requestDataFromServer('/adp-status/getAdpkeys', {
        'sitename': params[_0x30fbdb(0x266)](_0x30fbdb(0x27c))
    }, _0x30fbdb(0x27b))[_0x30fbdb(0x1f4)](function (_0x570f76) {
        var _0x3e3a10 = _0x30fbdb;
        selectedsite = _0x570f76['refreshedsite'], stopAdpLoader(), adpdisplaykeys(_0x570f76[_0x3e3a10(0x1c4)][0x0], _0x570f76['refreshedsite']);
    });
}

function onFileinfo(_0x14d75e, _0x583cbc, _0x2f4923) {
    var _0x3f8001 = _0xeaae58;
    $(_0x3f8001(0x194))[_0x3f8001(0x219)](), showLoader('dialog-for-content'), requestDataFromServer('/adp-status/readfile', {
        'filepath': _0x14d75e,
        'csrfmiddlewaretoken': csfr_token
    }, _0x3f8001(0x1e4))[_0x3f8001(0x1f4)](function (_0x40374d) {
        var _0x482e49 = _0x3f8001;
        stopLoader(_0x482e49(0x26a)), $('#file_content')[_0x482e49(0x219)](), _0x40374d[_0x482e49(0x1bd)] == 0xc8 ? ($(_0x482e49(0x231))['css'](_0x482e49(0x1a2), _0x482e49(0x22f)), $(_0x482e49(0x1bf))[_0x482e49(0x1b4)](_0x482e49(0x1a2), _0x482e49(0x267)), $(_0x482e49(0x194))[_0x482e49(0x18f)](_0x40374d[_0x482e49(0x185)])) : ($(_0x482e49(0x231))['css'](_0x482e49(0x1a2), 'hidden'), $(_0x482e49(0x1bf))[_0x482e49(0x1b4)](_0x482e49(0x1a2), _0x482e49(0x22f)), $(_0x482e49(0x191))[_0x482e49(0x1d3)](_0x40374d[_0x482e49(0x211)]));
    });
}

function startAdpLoader() {
    var _0x54dc02 = _0xeaae58;
    $(_0x54dc02(0x232))['css'](_0x54dc02(0x274), _0x54dc02(0x24c)), $(_0x54dc02(0x24d))[_0x54dc02(0x1b4)](_0x54dc02(0x274), _0x54dc02(0x24c)), $(_0x54dc02(0x1d1))[_0x54dc02(0x1b4)](_0x54dc02(0x274), _0x54dc02(0x24c)), showLoader(_0x54dc02(0x296));
}

function stopAdpLoader() {
    var _0x546b5f = _0xeaae58;
    $(_0x546b5f(0x232))[_0x546b5f(0x1b4)](_0x546b5f(0x274), _0x546b5f(0x263)), $(_0x546b5f(0x24d))['css'](_0x546b5f(0x274), _0x546b5f(0x263)), $('#adp-status\x20#site-data')['css']('display', _0x546b5f(0x263)), stopLoader('adp-status');
}