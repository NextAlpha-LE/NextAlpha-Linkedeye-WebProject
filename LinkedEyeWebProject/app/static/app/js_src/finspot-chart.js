


$(document).ready(function () {
});

function displayChart() {

}
var pieServiceChart;
var pieHostChart;
var hostStatus = { "CRITICAL": 0, "WARNING": 0, "PENDING": 0, "UNKNOWN": 0, "OK": 0 };
var serviceStatus = { "CRITICAL": 0, "WARNING": 0, "PENDING": 0, "UNKNOWN": 0, "OK": 0 };


function fillHostServiceCount(response) {
    console.log("before response");
    console.log(response);
    var hostkey = Object.keys(response['host']);
    var hostvalue = Object.values(response['host']);
    var servicekey = Object.keys(response['service']);
    var servicevalue = Object.values(response['service']);
    overviewgauges('Hosts', hostkey, hostvalue, 'container-hosts');

    overviewgauges('Services', servicekey, servicevalue, 'container-services');
   // finspotchart(Object.keys(response['host']), Object.values(response['host']), Object.keys(response['service']), Object.values(response['service']))
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
        if (state === "PENDING") {
            tempArray["PENDING"] = tempArray["PENDING"] + row[1];
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
    console.log("inside updateHostServiceValues")
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

function updateValues(json) {
    var criticalCount = 0;
    var okCount = 0;
    var pendingCount = 0;
    var warningCount = 0;
    var unknownCount = 0;
    var hostStatus = json.host;
    var serviceStatus = json.service;

    var totalNode = 0;

    criticalCount = hostStatus['criticalCount'] + serviceStatus['criticalCount']
    totalNode = totalNode + criticalCount;
    if (criticalCount == 0) {
        $('#pills-critical-tab').attr('onclick', ' ');
        $("#pills-critical-tab").html("Critical (" + criticalCount + ")");
    }
    else
        $("#pills-critical-tab").html('<span class="bold-text red">Critical(' + criticalCount + ')</span>');
    okCount = hostStatus['okCount'] + serviceStatus['okCount']
    totalNode = totalNode + okCount;
    if (okCount == 0) {
        $('#pills-ok-tab').attr('onclick', ' ');
        $("#pills-ok-tab").html("Ok (" + okCount + ")");
    }
    else
        $("#pills-ok-tab").html('<span class="bold-text green">Ok(' + okCount + ')</span>');
    pendingCount = hostStatus['pendingCount'] + serviceStatus['pendingCount']
    totalNode = totalNode + pendingCount;
    if (pendingCount == 0) {
        $('#pills-pending-tab').attr('onclick', ' ');
        $("#pills-pending-tab").html("Pending (" + pendingCount + ")");
    }
    else
        $("#pills-pending-tab").html('<span class="bold-text pending-text">Pending(' + pendingStatusCount + ')</span>');
    warningCount = hostStatus['warningCount'] + serviceStatus['warningCount']
    totalNode = totalNode + warningCount;
    if (warningCount == 0) {
        $('#pills-warning-tab').attr('onclick', ' ');
        $("#pills-warning-tab").html("Warning (" + warningCount + ")");
    }
    else
        $("#pills-warning-tab").html('<span class="bold-text warning">Warning(' + warningCount + ')</span>');
    unknownCount = hostStatus['unknownCount'] + serviceStatus['unknownCount']
    totalNode = totalNode + unknownCount;
    if (unknownCount == 0) {
        $('#pills-unknown-tab').attr('onclick', ' ');
        $("#pills-unknown-tab").html("Unknown (" + unknownCount + ")");
    }
    else
        $("#pills-unknown-tab").html('<span class="bold-text unknown">Unknown(' + unknownCount + ')</span>');
    $("#total-nodes").html("Nodes (" + totalNode + ")");
}