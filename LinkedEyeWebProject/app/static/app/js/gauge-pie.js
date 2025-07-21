/*let AnyChartPie = function (name, dataset, containername, is_draw = false) {

    
    anychart.onDocumentReady(function () {

        document.getElementById(containername).innerHTML = "";

        var data = [];
        Object.entries(dataset).forEach(function (v) {
            data.push(v)
        });


        // create pie chart with passed data
        var chart = anychart.pie3d(data);
      //  chart.contextMenu(false);

        var palette = anychart.palettes
            .distinctColors()
            .items([
                '#d72631'
            ]);

        // set chart title text settings
        chart.title(name)

        chart.fill(palette.items[0]);

        // set chart radius
        chart.radius('70%')
        // create empty area in pie chart
        chart.innerRadius('30%');

        // set container id for the chart
        chart.container(containername);
        // initiate chart drawing
        chart.draw();

    });

}

*/
//google.charts.load('current', {
    //callback: function () {


function _0x5b0c(_0x3f4d2a, _0x519e44) {
    var _0x128b7d = _0x128b();
    return _0x5b0c = function (_0x5b0c66, _0x462933) {
        _0x5b0c66 = _0x5b0c66 - 0xef;
        var _0x396304 = _0x128b7d[_0x5b0c66];
        return _0x396304;
    }, _0x5b0c(_0x3f4d2a, _0x519e44);
} (function (_0x36941e, _0x353e05) {
    var _0x15f17f = _0x5b0c,
        _0x3ecd41 = _0x36941e();
    while (!![]) {
        try {
            var _0x1493dc = parseInt(_0x15f17f(0xf8)) / 0x1 + parseInt(_0x15f17f(0x11f)) / 0x2 + parseInt(_0x15f17f(0x118)) / 0x3 * (-parseInt(_0x15f17f(0x13c)) / 0x4) + -parseInt(_0x15f17f(0x12d)) / 0x5 + parseInt(_0x15f17f(0x140)) / 0x6 * (parseInt(_0x15f17f(0x11d)) / 0x7) + -parseInt(_0x15f17f(0xef)) / 0x8 * (-parseInt(_0x15f17f(0x10f)) / 0x9) + parseInt(_0x15f17f(0x101)) / 0xa;
            if (_0x1493dc === _0x353e05) break;
            else _0x3ecd41['push'](_0x3ecd41['shift']());
        } catch (_0x1cc2bb) {
            _0x3ecd41['push'](_0x3ecd41['shift']());
        }
    }
}(_0x128b, 0xa537e));

function drawpiechart(_0x22227d, _0xae4b03, _0x4d4cb4) {
    var _0x1723f5 = _0x5b0c,
        _0x2c5f66 = {
            'title': _0xae4b03,
            'titleTextStyle': {
                'color': _0x1723f5(0xfd)
            },
            'width': _0x1723f5(0x141),
            'height': '100%',
            'is3D': !![],
            'chartArea': {
                'backgroundColor': _0x1723f5(0x10a),
                'left': '3%',
                'top': '3%',
                'height': _0x1723f5(0x11a),
                'width': _0x1723f5(0x11a)
            },
            'slices': {},
            'pieStartAngle': 0x14,
            'backgroundColor': {
                'fill': _0x1723f5(0x10a),
                'stroke': '#'
            },
            'legend': {
                'textStyle': {
                    'color': _0x1723f5(0x124)
                }
            },
            'sliceVisibilityThreshold': 0x1 / 0x2710,
            'colors': [_0x1723f5(0x116), '#099631', _0x1723f5(0xf5), _0x1723f5(0xfd)]
        },
        _0x22227d = new google[(_0x1723f5(0x11e))]['arrayToDataTable'](_0x22227d);
    document[_0x1723f5(0x104)](_0x4d4cb4)['innerHTML'] = '';
    var _0x122bc1 = document[_0x1723f5(0x104)](_0x4d4cb4),
        _0x1e47b4 = new google['visualization']['PieChart'](_0x122bc1);
    _0x1e47b4['draw'](_0x22227d, _0x2c5f66);
};

function _0x128b() {
    var _0x1f342b = ['width', 'maximum', 'palettes', 'top', '8cJCcnK', '#BEBEBE', 'offsetY', 'arrayToDataTable', 'series_chart_div', 'radius', '#e99123', 'length', 'itemAt', '17301iTirNC', 'useHtml', 'hAlign', 'anchor', 'center', '#ffffff', '<h3\x20style=\x22background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:80%\x22>NO\x20TICKET\x20TO\x20FETCH</h3>', 'gauges', 'data', '855070DVrpgO', 'padding', 'none', 'getElementById', 'minorTicks', 'BubbleChart', 'onDocumentReady', 'dataIndex', 'stroke', '#1f1f1f', 'margin', '#00bfa5', '</span>', '#077b8a', '7053219ztzajG', 'axis', 'vAlign', 'draw', 'innerHTML', 'items', 'append', '#d72631', 'set', '22521rlxRVL', '#14a76c', '94%', '#ffe400', 'labels', '57946NkTYMQ', 'visualization', '2118690GPGmAp', 'zIndex', 'sans-serif', 'purple', 'Tickets', '#fff', 'bar', 'label', '85%', 'minimum', 'Date', 'fill', '#66fcf1', '#00838f', '6232545HkafbK', '#099631', '#96a6a6', '#747474', 'ticks', '#dd2c00', '<span\x20style=\x22color:Ghostwhite\x22>', 'container', 'circular', '#none', '<span\x20style=\x22color:White\x22>', 'distinctColors', '#series_chart_div\x20#loader\x20img', 'title', 'enabled', '484Wbxbsr', '#ffa000', 'startAngle', 'text', '642qPhTmf', '100%'];
    _0x128b = function () {
        return _0x1f342b;
    };
    return _0x128b();
}
let overviewgauges = function (_0x519fa8, _0x42c2ce, _0x2e62f7, _0x49cec7) {
    var _0x7c06a0 = _0x5b0c,
        _0x1894c6 = anychart[_0x7c06a0(0x100)][_0x7c06a0(0x117)](_0x2e62f7),
        _0x39f533 = anychart[_0x7c06a0(0x144)][_0x7c06a0(0x138)]()[_0x7c06a0(0x114)]([_0x7c06a0(0x116), _0x7c06a0(0x12e), '#5c3c92', _0x7c06a0(0xfd), _0x7c06a0(0x10e), _0x7c06a0(0x12f), _0x7c06a0(0x132), _0x7c06a0(0x12c), _0x7c06a0(0x10c), _0x7c06a0(0x13d)]),
        _0x37d73e = function (_0x197fda, _0x3b2a31, _0x228f1b, _0x23bb40) {
            var _0x4c7a9d = _0x7c06a0,
                _0x2c3f0d = null;
            return _0x197fda[_0x4c7a9d(0x126)](_0x228f1b)[_0x4c7a9d(0x13f)](_0x4c7a9d(0x137) + _0x42c2ce[_0x228f1b] + ',\x20' + _0x2e62f7[_0x228f1b] + _0x4c7a9d(0x10d))[_0x4c7a9d(0xf9)](!![]), _0x197fda[_0x4c7a9d(0x126)](_0x228f1b)[_0x4c7a9d(0xfa)]('center')[_0x4c7a9d(0x111)]('middle')[_0x4c7a9d(0xfb)]('right-center')[_0x4c7a9d(0x102)](0x0, 0xa)['height'](_0x23bb40 / 0x2 + '%')[_0x4c7a9d(0xf1)](_0x3b2a31 + '%')['offsetX'](0x0), _0x197fda[_0x4c7a9d(0x125)](_0x228f1b)[_0x4c7a9d(0x108)](_0x228f1b)[_0x4c7a9d(0xf4)](_0x3b2a31)[_0x4c7a9d(0x142)](_0x23bb40)[_0x4c7a9d(0x12a)](_0x39f533[_0x4c7a9d(0xf7)](_0x228f1b))[_0x4c7a9d(0x109)](null)[_0x4c7a9d(0x120)](0x5), _0x197fda['bar'](_0x228f1b + 0x64)[_0x4c7a9d(0x108)](0x5)[_0x4c7a9d(0xf4)](_0x3b2a31)[_0x4c7a9d(0x142)](_0x23bb40)['fill'](_0x4c7a9d(0x103))[_0x4c7a9d(0x109)](_0x2c3f0d)['zIndex'](0x4), _0x197fda[_0x4c7a9d(0x125)](_0x228f1b);
        };
    anychart[_0x7c06a0(0x107)](function () {
        var _0x291c9c = _0x7c06a0;
        document[_0x291c9c(0x104)](_0x49cec7)[_0x291c9c(0x113)] = '';
        var _0x346cde = anychart[_0x291c9c(0xff)][_0x291c9c(0x135)]();
        _0x346cde['data'](_0x1894c6), _0x346cde[_0x291c9c(0x12a)](_0x291c9c(0x136))[_0x291c9c(0x109)](null)[_0x291c9c(0x102)](0x0)['margin'](0x64)[_0x291c9c(0x13e)](0x0)['sweepAngle'](0x10e);
        var _0x46c841 = _0x346cde[_0x291c9c(0x110)]()[_0x291c9c(0xf4)](0x64)[_0x291c9c(0x142)](0x1)[_0x291c9c(0x12a)](null);
        _0x46c841['scale']()[_0x291c9c(0x128)](0x0)[_0x291c9c(0x143)](0x64)['ticks']({
            'interval': 0x1
        })[_0x291c9c(0x105)]({
            'interval': 0x1
        }), _0x46c841[_0x291c9c(0x11c)]()[_0x291c9c(0x13b)](![]), _0x46c841[_0x291c9c(0x131)]()[_0x291c9c(0x13b)](![]), _0x46c841[_0x291c9c(0x105)]()[_0x291c9c(0x13b)](![]), _0x37d73e(_0x346cde, 0x78, 0x0, 0x11), _0x37d73e(_0x346cde, 0x64, 0x1, 0x11), _0x37d73e(_0x346cde, 0x50, 0x2, 0x11), _0x37d73e(_0x346cde, 0x3c, 0x3, 0x11), _0x37d73e(_0x346cde, 0x28, 0x4, 0x11), _0x37d73e(_0x346cde, 0x14, 0x5, 0x11), _0x346cde[_0x291c9c(0x10b)](0xf), _0x346cde[_0x291c9c(0x13a)]()['text'](_0x291c9c(0x133) + _0x519fa8 + '</span>')['useHtml'](!![]), _0x346cde[_0x291c9c(0x13a)]()[_0x291c9c(0x13b)](!![])['hAlign'](_0x291c9c(0xfc))[_0x291c9c(0x102)](0x0)[_0x291c9c(0x10b)]([0x0, 0x0, 0x14, 0x0]), _0x346cde[_0x291c9c(0x134)](_0x49cec7), _0x346cde['tooltip']()[_0x291c9c(0x13a)](_0x291c9c(0x123)), _0x346cde['fill']('none'), _0x346cde[_0x291c9c(0x112)]();
    });
};

function drawSeriesChart(_0x3d99da, _0x4c8a2d) {
    var _0x3e70c5 = _0x5b0c;
    date1 = new Date(), data = google['visualization'][_0x3e70c5(0xf2)](_0x3d99da);
    if (_0x3d99da[_0x3e70c5(0xf6)] > 0x1) {
        var _0x40cdcf = {
            'title': _0x4c8a2d,
            'color': '#fff',
            'titleTextStyle': {
                'color': '#ffffff'
            },
            'hAxis': {
                'title': _0x3e70c5(0x129),
                'titleTextStyle': {
                    'color': _0x3e70c5(0xfd),
                    'fontName': _0x3e70c5(0x121),
                    'italic': 0x0
                },
                'gridlines': {
                    'color': '#696969'
                },
                'textStyle': {
                    'color': _0x3e70c5(0xf0)
                }
            },
            'vAxis': {
                'title': 'Count',
                'titleTextStyle': {
                    'color': _0x3e70c5(0xfd),
                    'fontName': _0x3e70c5(0x121),
                    'italic': 0x0
                },
                'gridlines': {
                    'color': '#696969'
                },
                'textStyle': {
                    'color': '#BEBEBE'
                }
            },
            'backgroundColor': {
                'fill': _0x3e70c5(0x10a),
                'stroke': '#'
            },
            'chartArea': {
                'backgroundColor': _0x3e70c5(0x10a),
                'width': _0x3e70c5(0x127),
                'left': '5%'
            },
            'bubble': {
                'textStyle': {
                    'color': _0x3e70c5(0x124),
                    'fontSize': 0xa
                }
            },
            'legend': {
                'textStyle': {
                    'color': _0x3e70c5(0x124),
                    'fontSize': 0xc,
                    'fontName': _0x3e70c5(0x121)
                },
                'position': _0x3e70c5(0x145)
            },
            'colors': [_0x3e70c5(0x130), '#ff652f', _0x3e70c5(0x11b), _0x3e70c5(0x119), _0x3e70c5(0x122), _0x3e70c5(0x12b)]
        },
            _0x3f1c26 = new google[(_0x3e70c5(0x11e))][(_0x3e70c5(0x106))](document[_0x3e70c5(0x104)](_0x3e70c5(0xf3)));
        _0x3f1c26[_0x3e70c5(0x112)](data, _0x40cdcf);
    } else {
        var _0x43d0b7 = '';
        _0x43d0b7 += _0x3e70c5(0xfe), $('#TicketsOverview\x20#print-error')[_0x3e70c5(0x115)](_0x43d0b7), $(_0x3e70c5(0x139))['hide']();
    }
}

//};
