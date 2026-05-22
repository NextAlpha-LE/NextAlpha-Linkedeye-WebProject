
google.charts.load("current", { packages: ["corechart"] });

var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
requestData = {};
var startdate;
var enddate;
statuses = [];
users = [];
var dataType = 'user';
user = '';
ticketId = 1;
var loginuser = '';
selecteduser = '';
timeline = '';
isInfopage = true;
isClickonticket = false;
selectedRow = 0;
ticketOverviewData = [];
isChartloaded = false;
isUpdateTicket = false;
isClickedOnCluster = false;
totalOverviewData = [];
var connectionTries = 6;
var ticketSiteResponse;
var allTicketResponse;
var ticketSitesData = [];
var firstrow = [{ "label": "type", "type": "string" }, { "label": "count", "type": "number" }]
var hardwaretitle = 'Hardwares';
var softwaretitle = 'Soft limits';
var applicationtitle = 'Applications';


$(document).ready(function () {
    getallTicketSiteNames()
});


function sortObjectByKeys(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function displayChart() {

}
var pieServiceChart;
var pieHostChart;
var hostStatus = { "CRITICAL": 0, "WARNING": 0, "PENDING": 0, "UNKNOWN": 0, "OK": 0 };
var serviceStatus = { "CRITICAL": 0, "WARNING": 0, "PENDING": 0, "UNKNOWN": 0, "OK": 0 };


function fillHostServiceCount(response) {
    var hardwarePie = Object(response['hardware']);
    // NOTE: google.charts.load is called once at page load (line 2 above).
    // Do NOT call it here — repeated calls accumulate internal callbacks and waste memory.

    var hardwarePies = ([]);
    hardwarePies.push(firstrow)
    var hardwaresecondrow = [["Critical(" + hardwarePie.CRITICAL + ")", hardwarePie.CRITICAL],
    ["OK(" + hardwarePie.OK + ")", hardwarePie.OK],
    ["WARNING(" + hardwarePie.WARNING + ")", hardwarePie.WARNING],
        ["UNKNOWN(" + hardwarePie.UNKNOWN + ")", hardwarePie.UNKNOWN]]
    var hardware_tot = hardwarePie.CRITICAL + hardwarePie.OK + hardwarePie.WARNING + hardwarePie.UNKNOWN;
    for (var i in hardwaresecondrow) {
        hardwarePies.push(hardwaresecondrow[i])
    }
    if (hardware_tot) {
        $('#hardware-title-clr').html('Hardwares')
        // Call directly — Google Charts is already loaded. Wrapping in
        // setOnLoadCallback on every poll queues unbounded callbacks in memory.
        drawpiechart(hardwarePies, hardwaretitle, 'containerpie-hardwares');
    } else {
        document.getElementById('containerpie-hardwares').innerHTML = "";
        var html = 'Hardware<div class="row col-12" style="text-align:center"><div class="col-2"></div><div class="col-8 " id="print-error"><h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%"> NO HARDWARE AVAILABLE </h3></div><div class="col-2"></div></div></div>'
        $('#hardware-title-clr').html(html)
        stopLoader('containerpie-hardwares')
    }
    var softwarePie = Object(response['software']);
    var softwarePies = ([]);
    softwarePies.push(firstrow)
    var softwaresecondrow = [["Critical(" + softwarePie.CRITICAL + ")", softwarePie.CRITICAL],
    ["OK(" + softwarePie.OK + ")", softwarePie.OK],
    ["WARNING(" + softwarePie.WARNING + ")", softwarePie.WARNING],
        ["UNKNOWN(" + softwarePie.UNKNOWN + ")", softwarePie.UNKNOWN]]
    var software_tot = softwarePie.CRITICAL + softwarePie.OK + softwarePie.WARNING + softwarePie.UNKNOWN;
    for (var i in softwaresecondrow) {
        softwarePies.push(softwaresecondrow[i])
    }
    if (software_tot) {
        $('#software-title-clr').html('Soft limits')
        drawpiechart(softwarePies, softwaretitle, 'containerpie-softwares');
    } else {
        document.getElementById('containerpie-softwares').innerHTML = "";
        var html = 'Software<div class="row col-12" style="text-align:center"><div class="col-2"></div><div class="col-8 " id="print-error"><h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%"> NO SOFTWARE AVAILABLE </h3></div><div class="col-2"></div></div></div>'
        $('#software-title-clr').html(html)
        stopLoader('containerpie-softwares')
    }

    var applicationPie = Object(response['application']);
    var applicationPies = ([]);
    applicationPies.push(firstrow)
    var applicationsecondrow = [["Critical(" + applicationPie.CRITICAL + ")", applicationPie.CRITICAL],
        ["OK(" + applicationPie.OK + ")", applicationPie.OK],
        ["WARNING(" + applicationPie.WARNING + ")", applicationPie.WARNING],
        ["UNKNOWN(" + applicationPie.UNKNOWN + ")", applicationPie.UNKNOWN]]
    var application_tot = applicationPie.CRITICAL + applicationPie.OK + applicationPie.WARNING + applicationPie.UNKNOWN;
    for (var i in applicationsecondrow) {
        applicationPies.push(applicationsecondrow[i])
    }
    if (application_tot) {
        $('#application-title-clr').html('Applications')
        drawpiechart(applicationPies, applicationtitle, 'containerpie-applications');
    } else {
        document.getElementById('containerpie-applications').innerHTML = "";
        var html = 'Application<div class="row col-12" style="text-align:center"><div class="col-2"></div><div class="col-8 " id="print-error"><h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%"> NO APPLICATION AVAILABLE </h3></div><div class="col-2"></div></div></div>'
        $('#application-title-clr').html(html)
        stopLoader('containerpie-applications')
    }
    updatetime()
}
function updatetime() {

    var timing = {}
    var d = new Date();
    timing['hour'] = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        timing['minute'] = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    timing['second'] = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    document.getElementById('last-update').innerHTML = "Last update:- [ " + timing['hour'] + ':' + timing['minute'] + ':' + timing['second'] + ' ]';
}
function fillallticketCount(response) {
    google.charts.setOnLoadCallback(function () {//this is for bubble chart
        drawSeriesChart(data, title);
    });
}

function statusCount(res, tempArray) {
    totalCount = 0;
    res.forEach(function (row) {
        if (row[0])
            var state = row[0].toUpperCase()
        else
            var state = row[0]
        if (state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING") {
            tempArray["CRITICAL"] = tempArray["CRITICAL"] + row[1];
        }
        if (state == "" || state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP") {
            tempArray["OK"] = tempArray["OK"] + row[1];
        }
        if (state === "WARNING") {
            tempArray["WARNING"] = tempArray["WARNING"] + row[1];
        }
        if (state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED") {
            tempArray["UNKNOWN"] = tempArray["UNKNOWN"] + row[1];
        }
        totalCount = totalCount + row[1]
    });
    return totalCount;
}

function readyHandler() {
}

function updateHostServiceValues(json) {
    var tempHostArray = [];
    var hostCount = 0;
    if (Object.keys(json.host).length > 0) {
        objToArray = Object.keys(json.host).map((key) => [key, Number(json.host[key])]);
        hostStatus = { "CRITICAL": 0, "WARNING": 0, "PENDING": 0, "UNKNOWN": 0, "OK": 0 };
        hostCount = statusCount(objToArray, hostStatus)
        $("#total-host").html(hostCount);
        tempHostArray.push(['Totoal Server', 'Server Health']);
        $.each(hostStatus, function (key, val) {
            tempHostArray.push([key, val]);
            if (key === "CRITICAL" && val > 0) {
                $("#H-" + key).html("<span class='beat p-0'>" + val + "</span>");
            }
            else {
                $("#H-" + key).html(val);
            }
        });
    }
    if (pieHostChart !== undefined) {
        var hostdata = google.visualization.arrayToDataTable(tempHostArray);
        options.colors = [criticalColor, warningColor, pendingColor, unkownColor, okColor];
        pieHostChart.clearChart();
        pieHostChart.draw(hostdata, options);
    }

    var tempServiceArray = [];
    var serviceCount = 0;
    if (Object.keys(json.service).length > 0) {
        tempServiceArray.push(['Total Service', 'Service Health']);
        objToArray = Object.keys(json.service).map((key) => [key, Number(json.service[key])]);
        serviceStatus = { "CRITICAL": 0, "WARNING": 0, "PENDING": 0, "UNKNOWN": 0, "OK": 0 };
        serviceCount = statusCount(objToArray, serviceStatus)
        $("#total-service").html(serviceCount);
        $.each(serviceStatus, function (key, val) {
            tempServiceArray.push([key, val]);
            if (key === "CRITICAL" && val > 0) {
                $("#S-" + key).html("<span class='beat p-0'>" + val + "</span>");
            }
            else {
                $("#S-" + key).html(val);
            }
        });
    }
    if (pieServiceChart !== undefined) {
        var servicedata = google.visualization.arrayToDataTable(tempServiceArray);
        options.colors = [criticalColor, warningColor, pendingColor, unkownColor, okColor];
        pieServiceChart.clearChart();
        pieServiceChart.draw(servicedata, options);
    }
    var totalNode = serviceCount + hostCount;
    $("#total-nodes").html("Nodes (" + totalNode + ")");
    criticalStatusCount = hostStatus['CRITICAL'] + serviceStatus['CRITICAL']
    if (criticalStatusCount == 0) {
        $('#pills-critical-tab').attr('onclick', ' ');
        $("#pills-critical-tab").html("Critical (" + criticalStatusCount + ")");
    }
    else
        $("#pills-critical-tab").html('<span class="bold-text red">Critical(' + criticalStatusCount + ')</span>');
    okStatusCount = hostStatus['OK'] + serviceStatus['OK']
    if (okStatusCount == 0) {
        $('#pills-ok-tab').attr('onclick', ' ');
        $("#pills-ok-tab").html("Ok (" + okStatusCount + ")");
    }
    else
        $("#pills-ok-tab").html('<span class="bold-text green">Ok(' + okStatusCount + ')</span>');
    pendingStatusCount = hostStatus['PENDING'] + serviceStatus['PENDING']
    if (pendingStatusCount == 0) {
        $('#pills-pending-tab').attr('onclick', ' ');
        $("#pills-pending-tab").html("Pending (" + pendingStatusCount + ")");
    }
    else
        $("#pills-pending-tab").html('<span class="bold-text pending-text">Pending(' + pendingStatusCount + ')</span>');
    warningStatusCount = hostStatus['WARNING'] + serviceStatus['WARNING']
    if (warningStatusCount == 0) {
        $('#pills-warning-tab').attr('onclick', ' ');
        $("#pills-warning-tab").html("Warning (" + warningStatusCount + ")");
    }
    else
        $("#pills-warning-tab").html('<span class="bold-text warning">Warning(' + warningStatusCount + ')</span>');
    unknownStatusCount = hostStatus['UNKNOWN'] + serviceStatus['UNKNOWN']
    if (unknownStatusCount == 0) {
        $('#pills-unknown-tab').attr('onclick', ' ');
        $("#pills-unknown-tab").html("Unknown (" + unknownStatusCount + ")");
    }
    else
        $("#pills-unknown-tab").html('<span class="bold-text unknown">Unknown(' + unknownStatusCount + ')</span>');
}
function getallTicketSiteNames() {
    requestDataFromServer('/lesites/getallsitenames', { type: 'userbased', isOnlyEnabled: 'true', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            ticketSiteResponse = res.data;
        }
        getChartData(ticketSiteResponse);
    });
}

function getChartData(siteresponse) {
    $('#incidents-site-loader').show();
    $('#incidents-site-chart-wrapper').hide();
    $('#incidents-site-error').hide();

    // Distinct colour palette for up to 20 sites
    var palette = [
        '#ff6b6b','#ff9f43','#feca57','#1dd1a1','#48dbfb',
        '#54a0ff','#a29bfe','#fd79a8','#e17055','#00d2d3',
        '#55efc4','#fdcb6e','#6c5ce7','#74b9ff','#ff9ff3',
        '#00b894','#e84393','#d63031','#0984e3','#b2bec3'
    ];

    try {
        requestDataFromServer(
            "/incidents/api/per-site",
            { view: 'timeseries', periods: 7 },
            "GET"
        ).done(function (response) {
            $('#incidents-site-loader').hide();

            if (response.code == 200) {
                var dates     = response.dates  || [];
                var sites     = response.sites  || [];

                if (!sites.length || !dates.length) {
                    $('#incidents-site-error').show().html(
                        '<h3 style="background:rgba(18,18,18,0.85);color:#888;border-radius:10px;' +
                        'font-size:14px;padding:20px;text-align:center;border:1px solid #333;">' +
                        'NO INCIDENT DATA FOUND</h3>'
                    );
                    return;
                }

                // Format dates as "May 04" for display
                var displayDates = dates.map(function(d) {
                    var dt = new Date(d);
                    return dt.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
                });

                // Build datasets — one per site
                var datasets = sites.map(function(s, idx) {
                    var color = palette[idx % palette.length];
                    return {
                        label:           s.site,
                        data:            s.data,
                        borderColor:     color,
                        backgroundColor: color.replace(')', ',0.08)').replace('rgb', 'rgba').replace('#', 'rgba(').split('').join(''), // fallback
                        pointBackgroundColor: color,
                        pointBorderColor:     '#121212',
                        pointBorderWidth:     2,
                        pointRadius:          5,
                        pointHoverRadius:     7,
                        borderWidth:          2.5,
                        tension:              0.35,
                        fill:                 false,
                    };
                });

                // Fix backgroundColor to proper rgba using a helper
                datasets.forEach(function(ds, i) {
                    var hex = palette[i % palette.length];
                    var r = parseInt(hex.slice(1,3),16);
                    var g = parseInt(hex.slice(3,5),16);
                    var b = parseInt(hex.slice(5,7),16);
                    ds.backgroundColor = 'rgba('+r+','+g+','+b+',0.08)';
                });

                // Destroy previous instance if any
                if (window.incidentSiteChartInst) {
                    window.incidentSiteChartInst.destroy();
                }

                var canvas = document.getElementById('incidents-site-chart');
                var ctx    = canvas.getContext('2d');

                window.incidentSiteChartInst = new Chart(ctx, {
                    type: 'line',
                    data: { labels: displayDates, datasets: datasets },
                    options: {
                        responsive:          true,
                        maintainAspectRatio: false,
                        animation: { duration: 900, easing: 'easeOutQuart' },
                        interaction: { mode: 'index', intersect: false },
                        plugins: {
                            legend: {
                                display:  true,
                                position: 'bottom',
                                align:    'start',
                                labels: {
                                    color:          '#bbb',
                                    usePointStyle:  true,
                                    pointStyle:     'circle',
                                    padding:        16,
                                    boxWidth:       10,
                                    font: { family: 'Outfit, sans-serif', size: 11 }
                                },
                                onClick: function(evt, legendItem, legend) {
                                    // Default toggle + navigate on double-click
                                    Chart.defaults.plugins.legend.onClick.call(this, evt, legendItem, legend);
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(10,10,10,0.95)',
                                titleColor:      '#e99123',
                                bodyColor:       '#ccc',
                                borderColor:     'rgba(233,145,35,0.2)',
                                borderWidth:     1,
                                padding:         14,
                                cornerRadius:    10,
                                usePointStyle:   true,
                                titleFont:  { family: 'Outfit, sans-serif', size: 13, weight: '700' },
                                bodyFont:   { family: 'Outfit, sans-serif', size: 12 },
                                callbacks: {
                                    title: function(items) {
                                        return '📅 ' + dates[items[0].dataIndex];
                                    },
                                    label: function(ctx) {
                                        if (ctx.parsed.y === 0) return null;
                                        return '  ' + ctx.dataset.label + ': ' + ctx.parsed.y + ' incident' + (ctx.parsed.y !== 1 ? 's' : '');
                                    },
                                    filter: function(item) { return item.parsed.y > 0; }
                                }
                            }
                        },
                        onClick: function(evt, elements) {
                            if (elements && elements.length > 0) {
                                var siteIdx = elements[0].datasetIndex;
                                window.location.href = '/incidents/?site=' + encodeURIComponent(sites[siteIdx].site);
                            }
                        },
                        scales: {
                            x: {
                                grid:  { color: 'rgba(255,255,255,0.04)', drawBorder: false },
                                ticks: { color: '#888', font: { family: 'Outfit, sans-serif', size: 11 } },
                                title: {
                                    display: false
                                }
                            },
                            y: {
                                beginAtZero: true,
                                min:         0,
                                grid:  { color: 'rgba(255,255,255,0.05)', drawBorder: false },
                                ticks: {
                                    color:     '#888',
                                    precision: 0,
                                    stepSize:  1,
                                    font: { family: 'Outfit, sans-serif', size: 11 }
                                },
                                title: {
                                    display: true,
                                    text:    'Incident Count',
                                    color:   '#555',
                                    font:    { family: 'Outfit, sans-serif', size: 11 }
                                }
                            }
                        }
                    }
                });

                $('#incidents-site-chart-wrapper').show();

            } else {
                $('#incidents-site-error').show().html(
                    '<h3 style="background:#a33219;color:#fff;border-radius:10px;font-size:14px;padding:15px;text-align:center;">' +
                    (response.message || 'ERROR LOADING DATA').toUpperCase() + '</h3>'
                );
            }

        }).fail(function () {
            $('#incidents-site-loader').hide();
            $('#incidents-site-error').show().html(
                '<h3 style="background:#a33219;color:#fff;border-radius:10px;font-size:14px;padding:15px;text-align:center;">FAILED TO LOAD INCIDENT DATA</h3>'
            );
        });

    } catch (error) {
        $('#incidents-site-loader').hide();
        $('#incidents-site-error').show().html(
            '<h3 style="background:#a33219;color:#fff;border-radius:10px;font-size:14px;padding:15px;text-align:center;">' +
            error.toString().toUpperCase() + '</h3>'
        );
    }
}
