var querylist = [];
var titlelist = [];
var urldata = [];
var params = new URLSearchParams(document.location.search);
var PODNAME
var divid
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
var siteselected
var promdata;
var respdata;
var checkbx;
var abs_start = new Date(new Date((moment().subtract(1, 'days')).toString()).getTime());
var abs_end = new Date(new Date((moment()).toString()).getTime());
var step_time = 1 * 60 * 60;
var myChart = {};
var begin = moment();
var ending=moment();
function geturl() {
    urldata = requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET");
}
function chartrefresh() {
    $('#prometheus-range').data('daterangepicker').setStartDate(moment().subtract(1, 'days'));
    $('#prometheus-range').data('daterangepicker').setEndDate(moment());
    printresult(moment().subtract(1, 'days'), moment())
    step_time = 1 * 60 * 60;
}
function printresult(start, end,label) {

    var nstart = (start).toString()
    var nend = (end).toString()
    
    switch (label) {
        case 'Last hour':
            start = (moment().subtract(1, 'hour'));
            end = (moment());
            nstart = (moment().subtract(1, 'hour')).toString();
            nend = (moment()).toString();
            break;
        case 'Today':
            start = (moment().startOf('day'));
            end = (moment());
            nstart = (moment().startOf('day')).toString();
            nend = (moment()).toString();
            break;
        case 'Yesterday':
            start = (moment().subtract(1, 'days'));
            end = (moment());
            nstart = (moment().subtract(1, 'days')).toString();
            nend = (moment()).toString();
            break;
        case 'Last 7 Days':
            start = (moment().subtract(6, 'days'));
            end = (moment());
            nstart = (moment().subtract(6, 'days')).toString();
            nend = (moment()).toString();
            break;
        case 'Last 30 Days':
            start = (moment().subtract(29, 'days'));
            end = (moment());
            nstart = (moment().subtract(29, 'days')).toString();
            nend = (moment()).toString();
            step_time = 24 * 60 * 60;
            break;
        case 'This Month':
            start = (moment().startOf('month'));
            end = (moment());
            nstart = (moment().startOf('month')).toString();
            nend = (moment()).toString();
            break;
        case 'Last Month':
            start = (moment().subtract(1, 'month').startOf('month'));
            end = (moment().subtract(1, 'month').endOf('month'));
            nstart = (moment().subtract(1, 'month').startOf('month')).toString();
            nend = (moment().subtract(1, 'month').endOf('month')).toString();
    }
    abs_start = new Date(new Date(nstart).getTime())
    abs_end = new Date(new Date(nend).getTime())
    $('#prometheus-range').data('daterangepicker').setStartDate(start);
    $('#prometheus-range').data('daterangepicker').setEndDate(end);
    datechange()
}
$(function () {
    $('#prometheus-range').daterangepicker({
        startDate: abs_start,
        endDate: abs_end,
        autoApply: true,
        linkedCalendars: false,
        timePicker: true,
        ranges: {
            'Last hour': [moment().subtract(1, 'hour'), moment()],
            'Today': [moment().startOf('day'), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment()],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment()],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        locale: {
            format: 'DD/MM/YYYY hh:mm A'
        }
    }, printresult);
});
function prometheuschart(number, id) {
    var current = new Date();
    var query1 = querylist[number]
    const canvas = document.querySelector("canvas#" + id);
    if (myChart[id] !== undefined) {
        myChart[id].destroy();
    }
    const ctx = canvas.getContext('2d');
    urlresponsedata = JSON.parse(urldata["responseText"])
    var endpointInput = urlresponsedata["data"][0].prometheus_url;
    const start = ((current.getTime()) - 48 * 60 * 60 * 1000) / 1000;
    const end = current.getTime()/1000 ;
    // This file is shared by entityview.html (local Chart.js v2.9.3 bundle)
    // and 24-port-switch.html (Chart.js v4 from CDN). v2 reads axis config
    // from scales.xAxes[]; v3+ reads it from scales.x — passing the wrong
    // shape to v4 leaves the x scale unconfigured and throws canvas enum
    // errors ("undefined is not a valid CanvasTextAlign") during render.
    const timeAxisConfig = {
        type: 'time',
        time: {
            unit: 'hour',
            displayFormats: {
                hour: 'dd MMM hh:mm'
            }
        },
    };
    const isChartJs2 = typeof Chart.version === 'string' && Chart.version.startsWith('2.');
    const scalesConfig = isChartJs2
        ? { xAxes: [timeAxisConfig] }
        : { x: timeAxisConfig };
    myChart[id] = new Chart(ctx, {
        type: 'line',
        plugins: [ChartDatasourcePrometheusPlugin],
        options: {
            animation: {
                duration: 0,
            },
            responsive: true,
            scaleBeginAtZero: true,
            scales: scalesConfig,
            plugins: {
                'datasource-prometheus': {
                    prometheus: {
                        endpoint: '/prometheus/proxy/',
                        baseURL: '?prometheus_url=' + encodeURIComponent(endpointInput) + '&path=/api/v1',
                    },
                    query: query1,
                    noDataMsg: {
                        message: 'No data Available',
                        font: '20px'
                    },
                    timeRange: {
                        type: 'absolute',
                        start: abs_start,
                        end: abs_end,
                        step: step_time,
                        msUpdateInterval: 60000,
                    },
                },
                legend: {
                    position: 'top'
                }
            },
        },
    });
}
function prometheusarray(response, data) {
    geturl();
    query = data
    displayKeys(query, response)
}
function datechange() {
    displayKeys(promdata, respdata)
    if (checkbx != undefined) {
        checkbx.click();
    }
    checkbx = undefined;
}
function displayKeys(prometheus_json_data, response) {
    titlelist=[]
    promdata = prometheus_json_data
    respdata = response
    try {
        if (Object.keys(prometheus_json_data).length > 0) {
            redisKeys = []
            if ((response["nodedetails"]["data"][0].name).includes(':')) {
                PODNAME = (response["nodedetails"]["data"][0].name).split(':')[0];
            } else {
                PODNAME = response["nodedetails"]["data"][0].name
            }
            siteselected = response["nodedetails"]["data"][0].title
            if (('colon' in response["nodedetails"]["data"][0]) && ((response["nodedetails"]["data"][0].colon).includes('yes'))) {
                portselected = response["nodedetails"]["data"][0].ifName + ':1'
            } else {
                portselected = response["nodedetails"]["data"][0].ifName
            }
            product_model = response["nodedetails"]["data"][0].product_model
            prod_modelPresent = 'product_model' in response["nodedetails"]["data"][0]
            layerselected = (response["nodedetails"]["data"][0].layer).split("_")[1]
            if (portselected == undefined && layerselected == 'swi' && (response["nodedetails"]["data"][0].port != "HW")) {
                swal('ifName data is not found!Chart not available.', ' ', "error");
            }
            var name = response["nodedetails"]["data"][0].name
            if (response["nodedetails"]["data"][0].namespace) {
                var NAMESPACE = response["nodedetails"]["data"][0].namespace
                var FILTER = " namespace=\"" + NAMESPACE + "\",pod=\"" + PODNAME + "\""
            } else if ((name.includes(':Info') || name.includes(':Memory') || name.includes(':Disk') || name.includes(':NIC') || name.includes(':CPU') || name.includes(':fan') || name.includes(':battery') || name.includes(':Power-Supply') || name.includes(':Uptime') || name.includes(':temperature') || name.includes(':Firewall')) || name.includes(':SW_Uptime') || name.includes(':SW_Login') || name.includes(':SW_LoadAvg') || name.includes(':SW_NIC') || name.includes(':SW_Memory') || name.includes(':SW_Disk') || name.includes(':SW_CPU') && response["nodedetails"]["data"][0].layer == 's_hw') {
                var FILTER = name.split(':')[0]
            } else {
                var FILTER = ""
            }
            PODNAME = PODNAME.replace(/\./g, '-')
            keyHtml = ''
            keyHtml += '<div class="row py-2 site-keys" id="' + PODNAME + '">'
            keyHtml += '<div class="col-12">'
            keyHtml += '<table class="row">'
            keyHtml += '<tbody class="col-12">'
            var id = 0;
            for (const [title_name, query] of Object.entries(prometheus_json_data)) {
                if (!prod_modelPresent || title_name.includes(product_model)) {
                    var isPort = (response["nodedetails"]["data"][0].port != "HW");
                    var isPortUndefined = (response["nodedetails"]["data"][0].port != undefined)
                    var isPortNull = (response["nodedetails"]["data"][0].port != null)
                    if (isPort && isPortUndefined && isPortNull && response["nodedetails"]["data"][0].name != "") {
                        var query_tobe_executed = query.replaceAll('__FILTER__', (response["nodedetails"]["data"][0].name).split(':')[0])
                        query_tobe_executed = query_tobe_executed.replaceAll('__PORT__', portselected)
                    } else {
                        var query_tobe_executed = query.replaceAll('__FILTER__', FILTER)
                    }
                    var title = title_name.split('--')[1];
                    titlelist[id] = title;
                    querylist[id] = query_tobe_executed;
                    var tempObj = {}
                    rowHtml = ''
                    var divId = title
                    var canvasid = 'mycanvas' + id.toString();
                    tempObj['site'] = ((response["nodedetails"]["data"][0].name).split(':')[0])
                    keyName = (divId).replace("_", "-")
                    keyHtml += '<tr class="collapse-tr parent row" style="background-color:#313131" id="' + (response["nodedetails"]["data"][0].title).replace(/[:.]/g, '-') + '">'
                    keyHtml += '<td class="col-10">'
                    keyHtml += ' <a data-toggle="collapse" class="accordion-toggle" id=" ' + divId + id + '-data' + '" onclick="clickOnOne(\'' + id + '\',\'' + canvasid + '\')" href="#' + title + id + '-data' + '" style="background:#313131">'
                    keyHtml += '<h4 class="card-titles" style="margin-left: 10px; margin-top: 3px;" ><i class=" icon-play"></i>' + keyName + '<span class="size12 "style="margin-left: 10px; font-weight: bold;"></span></h4>'
                    keyHtml += ' </a>'
                    keyHtml += ' </td>'
                    keyHtml += '</tr>'
                    keyHtml += '<tr class="border-0 collapse-content row" id="child-' + (response["nodedetails"]["data"][0].title).replace(/[:.]/g, '_') + '"  style="height:auto">'
                    keyHtml += '<td colspan="12" class="hiddenRow border-0 p-0 col-12">'
                    keyHtml += '<div class="accordian-body collapse col-12 border-b" id="' + divId + id + '-data' + '" style="border: 1px;">'
                    keyHtml += '<div class="row card-body py-lg-4 py-2 "  >' //removed bg
                    keyHtml += '<div class="col-12">'
                    keyHtml += '<h5 class="size14" style="margin-left: 10px; margin-top: 3px;"></h5>'
                    keyHtml += '</div>'
                    keyHtml += '<div id="table-view" class="col-12" style="overflow-x: auto;">'
                    keyHtml += '<table id="data" style="border: 1px; background-color: ##191818">'
                    keyHtml += '<tbody class="accordion list" id="accordionExample">'
                    keyHtml += '<canvas class="mycanvas' + id + '" id="mycanvas' + id + '"></canvas>'
                    keyHtml += '</tbody>'
                    keyHtml += '</table>'
                    keyHtml += '</div>'
                    keyHtml += '</div>'
                    keyHtml += '</div> '
                    keyHtml += '</td>'
                    keyHtml += '</tr>'
                    id++;
                }
            };
            keyHtml += '</tbody>'
            keyHtml += '</table>'
            keyHtml += '</div>'
            keyHtml += '</div>'
            $('#nagiosgraph').empty()
            $('#nagiosgraph').append(keyHtml)
        }
    }
    catch (err) {
        swal(err+' error occurred!', ' ', "error");
    }
}
function clickOnOne(id, number) {
    var titles = titlelist;
    titles.forEach(function (obj) {
        var divId = obj
          //console.log('PODNAME--->' + PODNAME + ' and DIVID --->' + divId)
        divId = divId.replace(/[:.]/g, '_');
        PODNAME = PODNAME.replace(/[:.]/g, '-')
        //console.log('PODNAME-clickOnOne-->' + '#' + PODNAME + ' #' + divId + id + '-data')
        $('#' + PODNAME + ' #' + divId + id + '-data').collapse('show');
        prometheuschart(id, ('mycanvas' + id.toString()))
    })
}
function clickOnAll(checkbox) {
    checkbx = checkbox
    var titles = titlelist;
    if (checkbox.checked == true) {
        $('.switch_label').text('')
        var id = 0;
        titles.forEach(function (obj) {
            var divId = obj
            divId = divId.replace(/[:.]/g, '_');
            PODNAME = PODNAME.replace(/[:.]/g, '-')
            $('#' + PODNAME + ' #' + divId + id + '-data').collapse('show');
            prometheuschart(id, ('mycanvas' + id.toString()))
            id++;
        })
    }
    else {
        checkbx = undefined
        $('.switch_label').text('')
        var id = 0;
        checkbox.checked == false
        titles.forEach(function (obj) {
            var divId = obj
            divId = divId.replace(/[:.]/g, '_');
            PODNAME = PODNAME.replace(/[:.]/g, '-')
            $('#' + PODNAME + ' #' + divId + id + '-data').collapse('hide');
            id++;
        })
    }
}
