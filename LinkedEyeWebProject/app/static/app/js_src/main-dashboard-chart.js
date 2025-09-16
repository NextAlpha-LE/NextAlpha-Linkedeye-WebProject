
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
    google.charts.load('current', { 'packages': ['corechart'] });

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
        google.charts.setOnLoadCallback(function () {
            drawpiechart(hardwarePies, hardwaretitle, 'containerpie-hardwares');
        }
        );
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
        google.charts.setOnLoadCallback(function () {
            drawpiechart(softwarePies, softwaretitle, 'containerpie-softwares');
        }
        );
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
        google.charts.setOnLoadCallback(function () {
            drawpiechart(applicationPies, applicationtitle, 'containerpie-applications');
        }
        );
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
    showLoader("dashboard-tickets")
    showLoader("tickets-card")

    try {
        requestDataFromServer("/ticket/overviewData", { 'sites': siteresponse[0]["sitename"], 'view': 'overview', 'periods': 7 }, type = "GET").done(function (response) {
            var chart_res = response['chartData']
            if (response['data'] == "") {

                var html = ''
                html += '<h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%"> NO TICKETS TO FETCH </h3>'
                $("#series_chart_div #print-error").append(html)
                $("#series_chart_div #loader img").hide();
            }
            if (response['code'] == '200') {
                var title = 'All Tickets'
                var data = []
                var headData = ['ID', { type: 'date', label: 'Date' }, 'Count', 'Sites', 'total_count']
                data.push(headData)
                chart_res.forEach(function (row) {
                    row[1] = new Date(row[1].replaceAll('-', ','))
                    data.push(row)

                });
                google.charts.setOnLoadCallback(function () {//this is for bubble chart
                    drawSeriesChart(data, title);
                });
            } else {
                var html = ''
                html += '<h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%">' + response['message'] + '</h3>'
                $("#series_chart_div #print-error").append(html)
                $("#series_chart_div #loader img").hide();
            }
        });

    } catch (error) {
        var html = ''
        html += '<h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%">' + error + '</h3>'
        $("#series_chart_div #print-error").append(html)
        $("#series_chart_div #loader img").hide();
    }

}
