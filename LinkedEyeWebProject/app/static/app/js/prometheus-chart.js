var _0x5ced2e = _0x4803;
(function (_0x3304f0, _0x495c61) {
    var _0x2e1237 = _0x4803,
        _0x320a98 = _0x3304f0();
    while (!![]) {
        try {
            var _0x4ca957 = -parseInt(_0x2e1237(0x1b1)) / 0x1 * (parseInt(_0x2e1237(0x1f8)) / 0x2) + parseInt(_0x2e1237(0x1e8)) / 0x3 + parseInt(_0x2e1237(0x211)) / 0x4 + parseInt(_0x2e1237(0x1ba)) / 0x5 * (parseInt(_0x2e1237(0x210)) / 0x6) + parseInt(_0x2e1237(0x215)) / 0x7 * (parseInt(_0x2e1237(0x1d5)) / 0x8) + -parseInt(_0x2e1237(0x1c4)) / 0x9 + -parseInt(_0x2e1237(0x202)) / 0xa * (parseInt(_0x2e1237(0x1de)) / 0xb);
            if (_0x4ca957 === _0x495c61) break;
            else _0x320a98['push'](_0x320a98['shift']());
        } catch (_0x272314) {
            _0x320a98['push'](_0x320a98['shift']());
        }
    }
}(_0x4bc9, 0xd69a1));
var querylist = [],
    titlelist = [],
    urldata = [],
    params = new URLSearchParams(document['location'][_0x5ced2e(0x1b0)]),
    PODNAME, divid;
sites = [], selectedsite = '\x20', sites[_0x5ced2e(0x1e7)](params['get'](_0x5ced2e(0x198)));

function _0x4803(_0x37b1e2, _0x180ed5) {
    var _0x4bc93a = _0x4bc9();
    return _0x4803 = function (_0x4803c6, _0x36c261) {
        _0x4803c6 = _0x4803c6 - 0x189;
        var _0x15307a = _0x4bc93a[_0x4803c6];
        return _0x15307a;
    }, _0x4803(_0x37b1e2, _0x180ed5);
}
var selectedsite = params[_0x5ced2e(0x193)](_0x5ced2e(0x198)),
    siteselected, promdata, respdata, checkbx, abs_start = new Date(new Date(moment()[_0x5ced2e(0x1f6)](0x1, _0x5ced2e(0x1dd))[_0x5ced2e(0x1d8)]())[_0x5ced2e(0x199)]()),
    abs_end = new Date(new Date(moment()['toString']())[_0x5ced2e(0x199)]()),
    begin = moment(),
    ending = moment();

function geturl() {
    var _0x503744 = _0x5ced2e;
    urldata = requestDataFromServer(_0x503744(0x1ea), {
        'type': 'clicksite',
        'site': params[_0x503744(0x193)](_0x503744(0x198))
    }, _0x503744(0x1f3));
}

function chartrefresh() {
    var _0x1df733 = _0x5ced2e;
    $(_0x1df733(0x191))['data'](_0x1df733(0x1b3))[_0x1df733(0x1f2)](moment()['subtract'](0x1, 'days')), $(_0x1df733(0x191))[_0x1df733(0x1d1)](_0x1df733(0x1b3))[_0x1df733(0x1c1)](moment()), printresult(moment()[_0x1df733(0x1f6)](0x1, _0x1df733(0x1dd)), moment());
}

function printresult(_0xb7bec5, _0x2c983b, _0x387eec) {
    var _0x14c298 = _0x5ced2e,
        _0x290355 = _0xb7bec5[_0x14c298(0x1d8)](),
        _0x5f00b8 = _0x2c983b['toString']();
    switch (_0x387eec) {
        case _0x14c298(0x1b9):
            _0xb7bec5 = moment()[_0x14c298(0x1f6)](0x1, 'hour'), _0x2c983b = moment(), _0x290355 = moment()[_0x14c298(0x1f6)](0x1, _0x14c298(0x1d7))['toString'](), _0x5f00b8 = moment()['toString']();
            break;
        case _0x14c298(0x1cd):
            _0xb7bec5 = moment()[_0x14c298(0x1fe)](_0x14c298(0x20c)), _0x2c983b = moment(), _0x290355 = moment()[_0x14c298(0x1fe)](_0x14c298(0x20c))['toString'](), _0x5f00b8 = moment()['toString']();
            break;
        case _0x14c298(0x1d0):
            _0xb7bec5 = moment()[_0x14c298(0x1f6)](0x1, _0x14c298(0x1dd)), _0x2c983b = moment(), _0x290355 = moment()[_0x14c298(0x1f6)](0x1, _0x14c298(0x1dd))[_0x14c298(0x1d8)](), _0x5f00b8 = moment()[_0x14c298(0x1d8)]();
            break;
        case _0x14c298(0x1d4):
            _0xb7bec5 = moment()[_0x14c298(0x1f6)](0x6, _0x14c298(0x1dd)), _0x2c983b = moment(), _0x290355 = moment()[_0x14c298(0x1f6)](0x6, _0x14c298(0x1dd))[_0x14c298(0x1d8)](), _0x5f00b8 = moment()[_0x14c298(0x1d8)]();
            break;
        case _0x14c298(0x1df):
            _0xb7bec5 = moment()[_0x14c298(0x1f6)](0x1d, _0x14c298(0x1dd)), _0x2c983b = moment(), _0x290355 = moment()[_0x14c298(0x1f6)](0x1d, _0x14c298(0x1dd))['toString'](), _0x5f00b8 = moment()[_0x14c298(0x1d8)]();
            break;
        case _0x14c298(0x1cf):
            _0xb7bec5 = moment()[_0x14c298(0x1fe)]('month'), _0x2c983b = moment(), _0x290355 = moment()[_0x14c298(0x1fe)](_0x14c298(0x196))[_0x14c298(0x1d8)](), _0x5f00b8 = moment()[_0x14c298(0x1d8)]();
            break;
        case _0x14c298(0x1bb):
            _0xb7bec5 = moment()[_0x14c298(0x1f6)](0x1, _0x14c298(0x196))[_0x14c298(0x1fe)](_0x14c298(0x196)), _0x2c983b = moment()[_0x14c298(0x1f6)](0x1, 'month')['endOf'](_0x14c298(0x196)), _0x290355 = moment()[_0x14c298(0x1f6)](0x1, _0x14c298(0x196))['startOf'](_0x14c298(0x196))[_0x14c298(0x1d8)](), _0x5f00b8 = moment()[_0x14c298(0x1f6)](0x1, 'month')[_0x14c298(0x214)](_0x14c298(0x196))[_0x14c298(0x1d8)]();
    }
    abs_start = new Date(new Date(_0x290355)[_0x14c298(0x199)]()), abs_end = new Date(new Date(_0x5f00b8)[_0x14c298(0x199)]()), $(_0x14c298(0x191))[_0x14c298(0x1d1)]('daterangepicker')[_0x14c298(0x1f2)](_0xb7bec5), $(_0x14c298(0x191))['data'](_0x14c298(0x1b3))[_0x14c298(0x1c1)](_0x2c983b), datechange();
}
$(function () {
    var _0x16c4cf = _0x5ced2e;
    $(_0x16c4cf(0x191))[_0x16c4cf(0x1b3)]({
        'startDate': abs_start,
        'endDate': abs_end,
        'autoApply': !![],
        'linkedCalendars': ![],
        'timePicker': !![],
        'ranges': {
            'Last\x20hour': [moment()['subtract'](0x1, 'hour'), moment()],
            'Today': [moment()['startOf']('day'), moment()],
            'Yesterday': [moment()[_0x16c4cf(0x1f6)](0x1, _0x16c4cf(0x1dd)), moment()],
            'Last\x207\x20Days': [moment()['subtract'](0x6, 'days'), moment()],
            'Last\x2030\x20Days': [moment()['subtract'](0x1d, _0x16c4cf(0x1dd)), moment()],
            'This\x20Month': [moment()[_0x16c4cf(0x1fe)](_0x16c4cf(0x196)), moment()],
            'Last\x20Month': [moment()[_0x16c4cf(0x1f6)](0x1, _0x16c4cf(0x196))['startOf'](_0x16c4cf(0x196)), moment()['subtract'](0x1, _0x16c4cf(0x196))[_0x16c4cf(0x214)](_0x16c4cf(0x196))]
        },
        'locale': {
            'format': _0x16c4cf(0x1a4)
        }
    }, printresult);
});

function prometheuschart(_0x56c6eb, _0x967926) {
    var _0x18fcfe = _0x5ced2e,
        _0x33a76b = new Date(),
        _0xe7b47e = querylist[_0x56c6eb];
    console[_0x18fcfe(0x1e0)](_0x18fcfe(0x1c7) + _0xe7b47e);
    const _0x34bd20 = document[_0x18fcfe(0x20e)](_0x18fcfe(0x1ad) + _0x967926),
        _0x124a1e = _0x34bd20[_0x18fcfe(0x1e4)]('2d');
    urlresponsedata = JSON[_0x18fcfe(0x18d)](urldata['responseText']);
    var _0x1b6d6e = urlresponsedata[_0x18fcfe(0x1d1)][0x0][_0x18fcfe(0x200)];
    const _0x259fcd = (_0x33a76b[_0x18fcfe(0x199)]() - 0x30 * 0x3c * 0x3c * 0x3e8) / 0x3e8,
        _0x156b1e = _0x33a76b[_0x18fcfe(0x199)]() / 0x3e8;
    console[_0x18fcfe(0x1e0)](_0x18fcfe(0x1ee) + abs_start + _0x18fcfe(0x1c5) + abs_end);
    const _0x564017 = new Chart(_0x124a1e, {
        'type': _0x18fcfe(0x1fc),
        'plugins': [ChartDatasourcePrometheusPlugin],
        'options': {
            'animation': {
                'duration': 0x0
            },
            'responsive': !![],
            'scaleBeginAtZero': !![],
            'scales': {
                'xAxes': [{
                    'type': _0x18fcfe(0x1fd),
                    'time': {
                        'unit': 'hour',
                        'displayFormats': {
                            'hour': _0x18fcfe(0x208)
                        }
                    }
                }]
            },
            'plugins': {
                'datasource-prometheus': {
                    'prometheus': {
                        'endpoint': _0x1b6d6e,
                        'baseURL': _0x18fcfe(0x1ac)
                    },
                    'query': _0xe7b47e,
                    'noDataMsg': {
                        'message': _0x18fcfe(0x1d2),
                        'font': _0x18fcfe(0x1c6)
                    },
                    'timeRange': {
                        'type': _0x18fcfe(0x206),
                        'start': abs_start,
                        'end': abs_end,
                        'msUpdateInterval': 0xea60
                    }
                },
                'legend': {
                    'position': _0x18fcfe(0x190)
                }
            }
        }
    });

    function _0x34100c(_0x43df5b, _0x114018, _0x465a84) {
        var _0x1bb137 = _0x18fcfe;
        const _0x1d2f66 = _0x1bb137(0x1ce) + encodeURIComponent(queryInput[_0x1bb137(0x1f4)]) + _0x1bb137(0x201) + _0x43df5b[_0x1bb137(0x199)]() / 0x3e8 + _0x1bb137(0x1eb) + _0x114018[_0x1bb137(0x199)]() / 0x3e8 + _0x1bb137(0x1c3) + _0x465a84,
            _0x2318fc = _0x1bb137(0x20b) + _0x1d2f66;
        return fetch(_0x2318fc)[_0x1bb137(0x19c)](_0x38dcb3 => _0x38dcb3[_0x1bb137(0x189)]())[_0x1bb137(0x19c)](_0xb94c94 => _0xb94c94[_0x1bb137(0x1d1)]);
    }
    _0x34bd20['addEventListener'](_0x18fcfe(0x19a), _0x3b9aa0 => {
        var _0x52a794 = _0x18fcfe;
        _0x3b9aa0[_0x52a794(0x1ef)](), _0x564017['options'][_0x52a794(0x1c9)][_0x52a794(0x18e)]['prometheus'][_0x52a794(0x1ed)] = _0x1b6d6e, _0x564017[_0x52a794(0x1bc)]['plugins'][_0x52a794(0x18e)]['query'] = _0xe7b47e, _0x564017[_0x52a794(0x1aa)]();
    });
}

function prometheusarray(_0x1bf1cb, _0x4139ff) {
    geturl(), query = _0x4139ff, displayKeys(query, _0x1bf1cb);
}

function datechange() {
    var _0x278f4c = _0x5ced2e;
    displayKeys(promdata, respdata), checkbx != undefined && checkbx[_0x278f4c(0x18f)](), checkbx = undefined;
}

function _0x4bc9() {
    var _0x1fcc6f = ['datasource-prometheus', 'click', 'left', '#prometheus-range', 'error', 'get', '<div\x20class=\x22accordian-body\x20collapse\x20col-12\x20border-b\x22\x20id=\x22', 'collapse', 'month', '-data', 'site', 'getTime', 'load', '\x22,pod=\x22', 'then', ':Memory', 'ifDescr\x20fetch\x20error!Chart\x20not\x20available.', ':Power-Supply', '\x27,\x27', 'f_swi', ':temperature', '<div\x20class=\x22row\x20card-body\x20py-lg-4\x20py-2\x20\x22\x20\x20>', 'DD/MM/YYYY\x20hh:mm\x20A', 'includes', '</tbody>', ':Disk', 'replaceAll', 'port', 'update', ':NIC', '/api/v1', 'canvas#', ':fan', '\x22\x20\x20style=\x22height:auto\x22>', 'search', '1501250gbxnuA', 'checked', 'daterangepicker', 'hide', 'show', 'title', '\x22\x20style=\x22border:\x201px;\x22>', ':SW_Memory', 'Last\x20hour', '134785okZkzC', 'Last\x20Month', 'options', '</div>', 'length', 'nodedetails', 'replace', 'setEndDate', ':SW_Uptime', '&step=', '2083167VDcqRP', '\x0aabs_end---->', '20px', 'QUERY--->', '\x20error\x20occurred!', 'plugins', 'split', ':SW_LoadAvg', '<span\x20class=\x22size12\x20\x22style=\x22margin-left:\x2010px;\x20font-weight:\x20bold;\x22></span></h4>', 'Today', 'https://prometheus.demo.do.prometheus.io/api/v1/query_range?query=', 'This\x20Month', 'Yesterday', 'data', 'No\x20data\x20Available', 'mycanvas', 'Last\x207\x20Days', '750416MUFXTO', 'product_model', 'hour', 'toString', '<canvas\x20class=\x22mycanvas', 'name', 'layer', '__PORT__', 'days', '11yitwRK', 'Last\x2030\x20Days', 'log', '</table>', '\x20namespace=\x22', ':SW_Login', 'getContext', '\x22\x20onclick=\x22prometheuschart(\x27', '\x22\x20style=\x22background:#313131\x22>', 'push', '3130338RuLmXd', '#nagiosgraph', '/lesites/getallsitenames', '&end=', 'swi', 'endpoint', 'abs_start---->', 'preventDefault', '</tr>', '<td>', 'setStartDate', 'GET', 'value', '<td\x20colspan=\x2212\x22\x20class=\x22hiddenRow\x20border-0\x20p-0\x20col-12\x22>', 'subtract', '\x20&\x20QUERY\x20=\x20', '2hrnukn', 'text', '\x20</td>', '\x22></canvas>', 'line', 'time', 'startOf', '<div\x20class=\x22row\x20py-2\x20site-keys\x22\x20id=\x22', 'prometheus_url', '&start=', '17314140JRiQHO', 'ifName', '.switch_label', 'empty', 'absolute', '<tbody\x20class=\x22accordion\x20list\x22\x20id=\x22accordionExample\x22>', 'DD\x20MMM\x20HH:MM', '<div\x20class=\x22col-12\x22>', '</td>', 'https://cors-anywhere-chartjs-demo.herokuapp.com/', 'day', 'TITLE\x20=\x20', 'querySelector', '</div>\x20', '84etrkzT', '5310632EJJOvl', 'namespace', '\x22\x20id=\x22mycanvas', 'endOf', '119HTGvSP', ':SW_CPU', 'json', '<td\x20class=\x22col-10\x22>', 'append', '__FILTER__', 'parse'];
    _0x4bc9 = function () {
        return _0x1fcc6f;
    };
    return _0x4bc9();
}

function displayKeys(_0x1b0e96, _0x3e5200) {
    var _0x5494f3 = _0x5ced2e;
    titlelist = [], promdata = _0x1b0e96, respdata = _0x3e5200;
    try {
        if (Object['keys'](_0x1b0e96)[_0x5494f3(0x1be)] > 0x0) {
            redisKeys = [];
            _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x1da)][_0x5494f3(0x1a5)](':') ? PODNAME = _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0]['name']['split'](':')[0x0] : PODNAME = _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x1da)];
            siteselected = _0x3e5200[_0x5494f3(0x1bf)]['data'][0x0][_0x5494f3(0x1b6)];
            if (_0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x1db)] == _0x5494f3(0x1a1)) portselected = _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x203)];
            else portselected = _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0]['ifDescr'];
            product_model = _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x1d6)], prod_modelPresent = 'product_model' in _0x3e5200['nodedetails']['data'][0x0], layerselected = _0x3e5200['nodedetails'][_0x5494f3(0x1d1)][0x0]['layer'][_0x5494f3(0x1ca)]('_')[0x1];
            portselected == undefined && layerselected == _0x5494f3(0x1ec) && _0x3e5200[_0x5494f3(0x1bf)]['data'][0x0][_0x5494f3(0x1a9)] != 'HW' && swal(_0x5494f3(0x19e), '\x20', _0x5494f3(0x192));
            var _0x5bdfd3 = _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x1da)];
            if (_0x3e5200['nodedetails'][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x212)]) var _0x5e5ab0 = _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x212)],
                _0x4e7d24 = _0x5494f3(0x1e2) + _0x5e5ab0 + _0x5494f3(0x19b) + PODNAME + '\x22';
            else {
                if (_0x5bdfd3[_0x5494f3(0x1a5)](':Info') || _0x5bdfd3[_0x5494f3(0x1a5)](_0x5494f3(0x19d)) || _0x5bdfd3[_0x5494f3(0x1a5)](_0x5494f3(0x1a7)) || _0x5bdfd3[_0x5494f3(0x1a5)](_0x5494f3(0x1ab)) || _0x5bdfd3[_0x5494f3(0x1a5)](':CPU') || _0x5bdfd3[_0x5494f3(0x1a5)](_0x5494f3(0x1ae)) || _0x5bdfd3['includes'](':battery') || _0x5bdfd3[_0x5494f3(0x1a5)](_0x5494f3(0x19f)) || _0x5bdfd3[_0x5494f3(0x1a5)](':Uptime') || _0x5bdfd3['includes'](_0x5494f3(0x1a2)) || _0x5bdfd3[_0x5494f3(0x1a5)](':Firewall') || _0x5bdfd3['includes'](_0x5494f3(0x1c2)) || _0x5bdfd3['includes'](_0x5494f3(0x1e3)) || _0x5bdfd3['includes'](_0x5494f3(0x1cb)) || _0x5bdfd3[_0x5494f3(0x1a5)](':SW_NIC') || _0x5bdfd3[_0x5494f3(0x1a5)](_0x5494f3(0x1b8)) || _0x5bdfd3['includes'](':SW_Disk') || _0x5bdfd3['includes'](_0x5494f3(0x216)) && _0x3e5200[_0x5494f3(0x1bf)]['data'][0x0][_0x5494f3(0x1db)] == 's_hw') var _0x4e7d24 = _0x5bdfd3['split'](':')[0x0];
                else var _0x4e7d24 = '';
            }
            PODNAME = PODNAME[_0x5494f3(0x1c0)](/\./g, '-'), keyHtml = '', keyHtml += _0x5494f3(0x1ff) + PODNAME + '\x22>', keyHtml += '<div\x20class=\x22col-12\x22>', keyHtml += '<table\x20class=\x22row\x22>', keyHtml += '<tbody\x20class=\x22col-12\x22>';
            var _0x2fa96e = 0x0;
            for (const [_0x1c73bf, _0x1f978a] of Object['entries'](_0x1b0e96)) {
                if (!prod_modelPresent || _0x1c73bf['includes'](product_model)) {
                    var _0x57c19c = _0x3e5200[_0x5494f3(0x1bf)]['data'][0x0][_0x5494f3(0x1a9)] != 'HW',
                        _0x4aaaee = _0x3e5200['nodedetails'][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x1a9)] != undefined,
                        _0x445fba = _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x1a9)] != null;
                    if (_0x57c19c && _0x4aaaee && _0x445fba && _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x1da)] != '') {
                        var _0x7e3ef3 = _0x1f978a[_0x5494f3(0x1a8)](_0x5494f3(0x18c), _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x1da)][_0x5494f3(0x1ca)](':')[0x0]);
                        _0x7e3ef3 = _0x7e3ef3[_0x5494f3(0x1a8)](_0x5494f3(0x1dc), portselected);
                    } else var _0x7e3ef3 = _0x1f978a['replaceAll'](_0x5494f3(0x18c), _0x4e7d24);
                    var _0xd68845 = _0x1c73bf['split']('--')[0x1];
                    titlelist[_0x2fa96e] = _0xd68845, querylist[_0x2fa96e] = _0x7e3ef3, console['log'](_0x5494f3(0x20d) + _0xd68845 + _0x5494f3(0x1f7) + _0x7e3ef3);
                    var _0x31582c = {};
                    console[_0x5494f3(0x1e0)]('query_tobe_executed----->' + _0x7e3ef3), rowHtml = '';
                    var _0x3d24a7 = _0xd68845,
                        _0x4f3451 = 'mycanvas' + _0x2fa96e[_0x5494f3(0x1d8)]();
                    _0x31582c[_0x5494f3(0x198)] = _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0]['name']['split'](':')[0x0], keyName = _0x3d24a7[_0x5494f3(0x1c0)]('_', '-'), keyHtml += '<tr\x20class=\x22collapse-tr\x20parent\x20row\x22\x20style=\x22background-color:#313131\x22\x20id=\x22' + _0x3e5200[_0x5494f3(0x1bf)][_0x5494f3(0x1d1)][0x0]['title'][_0x5494f3(0x1c0)](/[:.]/g, '-') + '\x22>', keyHtml += _0x5494f3(0x18a), keyHtml += '\x20<a\x20data-toggle=\x22collapse\x22\x20class=\x22accordion-toggle\x22\x20id=\x22\x20' + _0x3d24a7 + _0x2fa96e + '-data' + _0x5494f3(0x1e5) + _0x2fa96e + _0x5494f3(0x1a0) + _0x4f3451 + '\x27)\x22\x20href=\x22#' + _0xd68845 + _0x2fa96e + _0x5494f3(0x197) + _0x5494f3(0x1e6), keyHtml += '<h4\x20class=\x22card-titles\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22\x20><i\x20class=\x22\x20icon-play\x22></i>' + keyName + _0x5494f3(0x1cc), keyHtml += _0x5494f3(0x1f1), keyHtml += '\x20</a>', keyHtml += _0x5494f3(0x1fa), keyHtml += _0x5494f3(0x1f0), keyHtml += '<tr\x20class=\x22border-0\x20collapse-content\x20row\x22\x20id=\x22child-' + _0x3e5200['nodedetails'][_0x5494f3(0x1d1)][0x0][_0x5494f3(0x1b6)]['replace'](/[:.]/g, '_') + _0x5494f3(0x1af), keyHtml += _0x5494f3(0x1f5), keyHtml += _0x5494f3(0x194) + _0x3d24a7 + _0x2fa96e + '-data' + _0x5494f3(0x1b7), keyHtml += _0x5494f3(0x1a3), keyHtml += _0x5494f3(0x209), keyHtml += '<h5\x20class=\x22size14\x22\x20style=\x22margin-left:\x2010px;\x20margin-top:\x203px;\x22></h5>', keyHtml += _0x5494f3(0x1bd), keyHtml += '<div\x20id=\x22table-view\x22\x20class=\x22col-12\x22\x20style=\x22overflow-x:\x20auto;\x22>', keyHtml += '<table\x20id=\x22data\x22\x20style=\x22border:\x201px;\x20background-color:\x20##191818\x22>', keyHtml += _0x5494f3(0x207), keyHtml += _0x5494f3(0x1d9) + _0x2fa96e + _0x5494f3(0x213) + _0x2fa96e + _0x5494f3(0x1fb), keyHtml += _0x5494f3(0x1a6), keyHtml += _0x5494f3(0x1e1), keyHtml += _0x5494f3(0x1bd), keyHtml += _0x5494f3(0x1bd), keyHtml += _0x5494f3(0x20f), keyHtml += _0x5494f3(0x20a), keyHtml += _0x5494f3(0x1f0), _0x2fa96e++;
                }
            };
            keyHtml += _0x5494f3(0x1a6), keyHtml += _0x5494f3(0x1e1), keyHtml += _0x5494f3(0x1bd), keyHtml += _0x5494f3(0x1bd), $(_0x5494f3(0x1e9))[_0x5494f3(0x205)](), $(_0x5494f3(0x1e9))[_0x5494f3(0x18b)](keyHtml);
        }
    } catch (_0x2416e3) {
        swal(_0x2416e3 + _0x5494f3(0x1c8), '\x20', 'error');
    }
}

function clickOnAll(_0x2979c5) {
    var _0x47fd1d = _0x5ced2e;
    checkbx = _0x2979c5;
    var _0x202b06 = titlelist;
    if (_0x2979c5[_0x47fd1d(0x1b2)] == !![]) {
        $(_0x47fd1d(0x204))['text']('');
        var _0x237429 = 0x0;
        _0x202b06['forEach'](function (_0x1348b7) {
            var _0x4233ab = _0x47fd1d,
                _0x33acd9 = _0x1348b7;
            _0x33acd9 = _0x33acd9[_0x4233ab(0x1c0)](/[:.]/g, '_'), PODNAME = PODNAME[_0x4233ab(0x1c0)](/[:.]/g, '-'), $('#' + PODNAME + '\x20#' + _0x33acd9 + _0x237429 + _0x4233ab(0x197))[_0x4233ab(0x195)](_0x4233ab(0x1b5)), prometheuschart(_0x237429, _0x4233ab(0x1d3) + _0x237429['toString']()), _0x237429++;
        });
    } else {
        checkbx = undefined, $(_0x47fd1d(0x204))[_0x47fd1d(0x1f9)]('');
        var _0x237429 = 0x0;
        _0x2979c5[_0x47fd1d(0x1b2)] == ![], _0x202b06['forEach'](function (_0x127d5f) {
            var _0x1e4594 = _0x47fd1d,
                _0x59c2bf = _0x127d5f;
            _0x59c2bf = _0x59c2bf[_0x1e4594(0x1c0)](/[:.]/g, '_'), PODNAME = PODNAME[_0x1e4594(0x1c0)](/[:.]/g, '-'), $('#' + PODNAME + '\x20#' + _0x59c2bf + _0x237429 + _0x1e4594(0x197))[_0x1e4594(0x195)](_0x1e4594(0x1b4)), _0x237429++;
        });
    }
}