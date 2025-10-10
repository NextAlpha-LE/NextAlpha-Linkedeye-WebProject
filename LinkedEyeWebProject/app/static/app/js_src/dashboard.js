var prometheusdata;
var firstrow = [{ "label": "type", "type": "string" }, { "label": "count", "type": "number" }]
var hardwaretitle = 'Hardware';
var softwaretitle = 'Software';
var applicationtitle = 'Application';
var eodSitesData = [];
var adpSitesData = [];
var bodSitesData = [];
var selected_sitename = ''
var selected_leurl = ''
var selected_websocketurl = ''
var colors_called = 1;

$(document).ready(function () { //rohinth added start
    getallTicketSiteNames()

    let buttonToBeClicked = sessionStorage.getItem('click-this-button-after-page-loads');
    if (buttonToBeClicked != null) {
        // Click the button here
        document.getElementById(buttonToBeClicked).click();

        // Remove the key from session storage
        sessionStorage.removeItem('click-this-button-after-page-loads');
    }

    google.charts.load('current', { 'packages': ['corechart'] });

});

var timeline;
var data;
var nodeid;
statuses = [];

var getLEDCOLOR = async function (url, nameofsite) {
    return await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.timeout = 5000; // time in milliseconds
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                (reject(status));
            }
        };
        xhr.ontimeout = () => {
            reject({
                site: nameofsite,
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.onerror = function () {
            reject({
                site: nameofsite,
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};
function colorSwitch(status) {
    var color = ''
    switch (status) {
        case 0:
            color = '#ff3d57'
            break;
        case 1:
            color = '#e59105'
            break;
        case 2:
            color = '#16d39a'
            break;
        default:
            color = '#ffffff'
    }
    return color
}
function ledColors(sitename, le_url, websoc_url) {
    const target = new URL('sitehealth/overall', le_url);
    const params = new URLSearchParams();
    params.set('sitename', sitename);
    target.search = params.toString();
    var hdw = 0
    var stw = 0
    var app = 0
    var a = getLEDCOLOR(target, sitename).then(function (data) {
        document.getElementById('bodLED').style.color = colorSwitch(data['data']['bod'])
        document.getElementById('eodLED').style.color = colorSwitch(data['data']['eod'])
        document.getElementById('adpLED').style.color = colorSwitch(data['data']['adp'])
        document.getElementById('entityLED').style.color = colorSwitch(data['data']['entity'])
        var chart_data = data['data']['chart']['data']
        var chartresponse = { "hardware": { "CRITICAL": chart_data['hardware'][0], "OK": chart_data['hardware'][2], "WARNING": chart_data['hardware'][1], "UNKNOWN": chart_data['hardware'][3] }, "software": { "CRITICAL": chart_data['software'][0], "OK": chart_data['software'][2], "WARNING": chart_data['software'][1], "UNKNOWN": chart_data['software'][3] }, "application": { "CRITICAL": chart_data['application'][0], "OK": chart_data['application'][2], "WARNING": chart_data['application'][1], "UNKNOWN": chart_data['application'][3] } };
        var hardwarearray = Object.values(chartresponse['hardware'])
        var hardwares = hardwarearray.reduce(function (a, b) { return a + b; })
        var softwarearray = Object.values(chartresponse['software'])
        var softwares = softwarearray.reduce(function (a, b) { return a + b; })
        var applicationarray = Object.values(chartresponse['application'])
        var applications = applicationarray.reduce(function (a, b) { return a + b; })
        hdw = hardwares;
        stw = softwares;
        app = applications;
        if (hardwares == 0) {
            document.getElementById('hardware-heading').style.display = 'block'
        } else {
            document.getElementById('hardware-heading').style.display = 'none'
        }
        if (softwares == 0) {
            document.getElementById('software-heading').style.display = 'block'
        } else {
            document.getElementById('software-heading').style.display = 'none'
        }
        if (applications == 0) {
            document.getElementById('application-heading').style.display = 'block'
        } else {
            document.getElementById('application-heading').style.display = 'none'
        }
        fillHostServiceCount(chartresponse)
        var siteTempObj = {}
        siteTempObj['site'] = sitename
        if (data['data']['eod'])
            siteTempObj['isSuccess'] = false
        else
            siteTempObj['isSuccess'] = true
        siteTempObj['isWSConnected'] = false
        eodSitesData.push(siteTempObj)
        if (data['data']['adp'])
            siteTempObj['isSuccess'] = false
        else
            siteTempObj['isSuccess'] = true
        adpSitesData.push(siteTempObj)
        if (data['data']['bod'])
            siteTempObj['isSuccess'] = false
        else
            siteTempObj['isSuccess'] = true
        bodSitesData.push(siteTempObj)
        if (colors_called) {
            colors_called = 0
            connectEodWebSocket(websoc_url, sitename, 0, Math.random().toString(36).substring(2, 5))
            connectAdpWebSocket(websoc_url, sitename, 0, Math.random().toString(36).substring(2, 5))
            connectWebSocket(websoc_url, sitename, 0, Math.random().toString(36).substring(2, 5))
        }
    }).catch(function (err) {
        if (hdw == 0) {
            document.getElementById('hardware-heading').style.display = 'flex'
        } else {
            document.getElementById('hardware-heading').style.display = 'none'
        }
        if (stw == 0) {
            document.getElementById('software-heading').style.display = 'flex'
        } else {
            document.getElementById('software-heading').style.display = 'none'
        }
        if (app == 0) {
            document.getElementById('application-heading').style.display = 'flex'
        } else {
            document.getElementById('application-heading').style.display = 'none'
        }
        stopLoader('containerpie-hardwares')
        stopLoader('containerpie-softwares')
        stopLoader('containerpie-applications')
    });
}
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
    var hardwarepies = ([]);
    hardwarepies.push(firstrow)
    var hardwaresecondrow = [["Critical(" + hardwarePie.CRITICAL + ")", hardwarePie.CRITICAL],
    ["OK(" + hardwarePie.OK + ")", hardwarePie.OK],
    ["WARNING(" + hardwarePie.WARNING + ")", hardwarePie.WARNING],
    ["UNKNOWN(" + hardwarePie.UNKNOWN + ")", hardwarePie.UNKNOWN]]
    var hardware_tot = hardwarePie.CRITICAL + hardwarePie.OK + hardwarePie.WARNING + hardwarePie.UNKNOWN;

    if (hardware_tot) {
        document.getElementById('hardware-heading').style.display = 'none'
        for (var i in hardwaresecondrow) {
            hardwarepies.push(hardwaresecondrow[i])
        }
        google.charts.setOnLoadCallback(function () {
            drawpiechart(hardwarepies, hardwaretitle, 'containerpie-hardwares');
        }
        );
    } else {
        document.getElementById('containerpie-hardwares').innerHTML = "";
        document.getElementById('hardware-heading').style.display = 'flex'
        stopLoader('containerpie-hardwares')
    }
    var softwarePie = Object(response['software']);
    var softwarepies = ([]);
    softwarepies.push(firstrow)
    var softwaresecondrow = [["Critical(" + softwarePie.CRITICAL + ")", softwarePie.CRITICAL],
    ["OK(" + softwarePie.OK + ")", softwarePie.OK],
    ["WARNING(" + softwarePie.WARNING + ")", softwarePie.WARNING],
    ["UNKNOWN(" + softwarePie.UNKNOWN + ")", softwarePie.UNKNOWN]]
    var software_tot = softwarePie.CRITICAL + softwarePie.OK + softwarePie.WARNING + softwarePie.UNKNOWN;

    if (software_tot) {
        document.getElementById('software-heading').style.display = 'none'
        for (var i in softwaresecondrow) {
            softwarepies.push(softwaresecondrow[i])
        }
        google.charts.setOnLoadCallback(function () {
            drawpiechart(softwarepies, softwaretitle, 'containerpie-softwares');
        }
        );
    } else {
        document.getElementById('containerpie-softwares').innerHTML = "";
        document.getElementById('software-heading').style.display = 'flex'
        stopLoader('containerpie-softwares')
    }
    var applicationPie = Object(response['application']);
    var applicationpies = ([]);
    applicationpies.push(firstrow)
    var applicationsecondrow = [["Critical(" + applicationPie.CRITICAL + ")", applicationPie.CRITICAL],
    ["OK(" + applicationPie.OK + ")", applicationPie.OK],
    ["WARNING(" + applicationPie.WARNING + ")", applicationPie.WARNING],
    ["UNKNOWN(" + applicationPie.UNKNOWN + ")", applicationPie.UNKNOWN]]
    var application_tot = applicationPie.CRITICAL + applicationPie.OK + applicationPie.WARNING + applicationPie.UNKNOWN;
    updatetime()
    if (application_tot) {
        document.getElementById('application-heading').style.display = 'none'
        for (var i in applicationsecondrow) {
            applicationpies.push(applicationsecondrow[i])
        }
        google.charts.setOnLoadCallback(function () {
            drawpiechart(applicationpies, applicationtitle, 'containerpie-applications');
        }
        );
    } else {
        document.getElementById('containerpie-applications').innerHTML = "";
        document.getElementById('application-heading').style.display = 'flex'
        stopLoader('containerpie-applications')
    }
}
function updatetime() {

    var timing = {}
    var d = new Date();
    timing['hour'] = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        timing['minute'] = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    timing['second'] = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    document.getElementById('last-update').innerHTML = "Last update:- [ " + timing['hour'] + ':' + timing['minute'] + ':' + timing['second'] + ' ]';
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
function getjsondata(response) {
    var jsondata = JSON.parse(response)
    prometheusarray(prometheusdata, jsondata)
}
function nodespecificdetialsresponse(response) {
    prometheusdata = response;
    var query_ip = (response.nodedetails.data[0].ip).replaceAll('.', '_')
    if (!((response.nodedetails.data[0]).hasOwnProperty('product_model'))) {
        response.nodedetails.data[0].product_model = 'Server'
    }
    $('#nagiosgraph').empty()
    try {

        if (!(response.nodedetails.data[0].product_model).includes('fortigate') && (response.nodedetails.data[0].image == 'port')) {
            requestDataFromServer('/getfilecontent', { filename: 'switch-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].layer).includes('s_sw')) {
            requestDataFromServer('/getfilecontent', { filename: 'prometheus-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':CPU') && (response.nodedetails.data[0].product_model).includes('fortigate')) {
            requestDataFromServer('/getfilecontent', { filename: 'firewall-cpu-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':Memory') && (response.nodedetails.data[0].product_model).includes('fortigate')) {
            requestDataFromServer('/getfilecontent', { filename: 'firewall-memory-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':temperature') && (response.nodedetails.data[0].product_model).includes('fortigate')) {
            requestDataFromServer('/getfilecontent', { filename: 'firewall-temperature-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':Uptime') && (response.nodedetails.data[0].product_model).includes('fortigate')) {
            requestDataFromServer('/getfilecontent', { filename: 'firewall-uptime-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':Info') && (response.nodedetails.data[0].product_model).includes('fortigate')) {
            requestDataFromServer('/getfilecontent', { filename: 'firewall-info-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].layer).includes('swi') && (response.nodedetails.data[0].name).includes(':CPU')) {
            requestDataFromServer('/getfilecontent', { filename: 'switch-cpu-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':CPU')) {
            requestDataFromServer('/getfilecontent', { filename: 'cpu-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].layer).includes('swi') && (response.nodedetails.data[0].name).includes(':Info')) {
            requestDataFromServer('/getfilecontent', { filename: 'switch-info-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].layer).includes('swi') && (response.nodedetails.data[0].name).includes(':Memory')) {
            requestDataFromServer('/getfilecontent', { filename: 'switch-memory-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':Info')) {
            requestDataFromServer('/getfilecontent', { filename: 'info-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':Memory')) {
            requestDataFromServer('/getfilecontent', { filename: 'memory-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':Disk')) {
            requestDataFromServer('/getfilecontent', { filename: 'disk-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':NIC')) {
            requestDataFromServer('/getfilecontent', { filename: 'nic-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].layer).includes('swi') && (response.nodedetails.data[0].name).includes(':fan')) {
            requestDataFromServer('/getfilecontent', { filename: 'switch-fan-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':fan')) {
            requestDataFromServer('/getfilecontent', { filename: 'fan-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':battery')) {
            requestDataFromServer('/getfilecontent', { filename: 'battery-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':Power-Supply')) {
            requestDataFromServer('/getfilecontent', { filename: 'power-supply-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].layer).includes('swi') && (response.nodedetails.data[0].name).includes(':temperature')) {
            requestDataFromServer('/getfilecontent', { filename: 'switch-temperature-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':temperature')) {
            requestDataFromServer('/getfilecontent', { filename: 'temperature-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].layer).includes('swi') && (response.nodedetails.data[0].product_model).includes('fortigate')) {
            requestDataFromServer('/getfilecontent', { filename: 'firewall-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].layer).includes('swi') && (response.nodedetails.data[0].name).includes(':Uptime')) {
            requestDataFromServer('/getfilecontent', { filename: 'switch-uptime-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':SW_Uptime')) {
            requestDataFromServer('/getfilecontent', { filename: 'uptime-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':SW_LoadAvg')) {
            requestDataFromServer('/getfilecontent', { filename: 'server-load-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':SW_Login')) {
            requestDataFromServer('/getfilecontent', { filename: 'login-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':SW_NIC')) {
            requestDataFromServer('/getfilecontent', { filename: 'sw_nic-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':SW_Disk')) {
            requestDataFromServer('/getfilecontent', { filename: 'sw_disk-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':SW_Memory')) {
            requestDataFromServer('/getfilecontent', { filename: 'sw_memory-query.json' }, "GET").done(getjsondata);
        } else if ((response.nodedetails.data[0].name).includes(':SW_CPU')) {
            requestDataFromServer('/getfilecontent', { filename: 'sw_cpu-query.json' }, "GET").done(getjsondata);
        }
    }
    catch (err) {
        swal(err + ' error occurred while getting queries!', ' ', "error");
    }
    //---------------------------------------------------
    stopLoader("node-detail")
    $("#node-keys").empty();
    $("#node-values").empty();
    $("#node-name").empty();
    if (response == undefined)
        return;
    if (response["nodedetails"].status == 200) {
        var nodedetails = response["nodedetails"].data;
        var json = nodedetails[0];
        var html = "";
        var name = json["name"];
        $("#node-name").append(name);
        $("#node-name").attr('title', name)
        $("#nodeimage").attr("src", image_path + json["icon"]);
        $("#nodename").html("<span>" + json["title"] + "</span>");

        if (json["title"] !== json["hostIp"])
            $("#nodeipaddress").html("<span>" + json["hostIp"] + "</span>");
        if (json["monitor_status"] !== undefined) {
            var nodecolor = getColorForNodeState(json["monitor_status"]);
            var indicatorCircle = '<span class="indicator-circle ml-2"  style="background:' + nodecolor + '"></span>';
            $("#node-name").append(indicatorCircle);
            $("#nodestatus").html("<span class='white-text py-1 px-2 size12 radius-8' style='background:" + nodecolor + "'>" + 'yhyhyy' + "</span>");
        }
        var datetime = json["epoch"] / 1000;
        if (datetime !== 0) {
            var dayString = getFormatedDate(datetime);
            $("#nodelastupdated").html("<span>" + dayString + "</span>");
        }

        if (json["monitor_message"] !== undefined)
            $("#nodemonmessage").html("<span>" + json["monitor_message"] + "</span>");

        if (json["contact_email"] !== undefined)
            $("#nodecontactemail").html("<span>" + json["contact_email"] + "</span>");

        if (json["automation_isEnabled"] === undefined)
            $("#nodehasautomation").html("<span>" + json["automation_isEnabled"] + "</span>");

        var url = new URL("cgi-bin/showgraph.cgi?period=day&amp;rrdopts=-w+200+-j&amp;", monitorurl);
        if (json["type"] === "Host")
            url += "host=" + json["title"] + ";";
        else {
            url += "host=" + json["title"].split(":")[0] + "&amp;";
            url += "service=" + json["title"] + ";"
        }

        document.getElementById("node-detail");
        var nodeNameHtml = "";
        var nodeDataHtml = "";
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                var value = json[key];

                if (value !== "") {
                    if (value.length !== 0) {
                        if (key !== "Nics_list") {

                            // ✅ Convert epoch to IST formatted date/time
                            if (key.toLowerCase().includes("epoch")) {
                                let epochValue = Number(value);
                                if (epochValue < 10000000000) {
                                    epochValue *= 1000; // convert seconds → ms
                                }

                                // Convert to IST
                                let dateIST = new Date(epochValue).toLocaleString("en-US", {
                                    timeZone: "Asia/Kolkata"
                                });

                                let date = new Date(dateIST);

                                // Format manually to DD-MM-YYYY HH:mm:ss
                                let day = String(date.getDate()).padStart(2, '0');
                                let month = String(date.getMonth() + 1).padStart(2, '0');
                                let year = date.getFullYear();
                                let hours = String(date.getHours()).padStart(2, '0');
                                let minutes = String(date.getMinutes()).padStart(2, '0');
                                let seconds = String(date.getSeconds()).padStart(2, '0');

                                value = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                            }

                            nodeNameHtml += "<p style='margin-left:5%'>" + key + "</p>";
                            nodeDataHtml += "<p>" + value + "</p>";
                        }
                    } else {
                        nodeNameHtml += "<p>" + key + "</p>";
                        nodeDataHtml += "<p>''</p>";
                    }
                }
            }
        }
        /*for (var key in json) {
            if (json.hasOwnProperty(key)) {
                var value = json[key];
                if (value !== "") {
                    if (value.length !== 0) {
                        if (key !== "Nics_list") {
                            nodeNameHtml += "<p style='margin-left:5%'>" + key + "</p>";
                            nodeDataHtml += "<p>" + value + "</p>";
                            console.log("nodeNameHtml---->"+key)
                            console.log("nodeDataHtml---->" + value)
                        }
                    }
                    else {
                        nodeNameHtml += "<p>" + key + "</p>";
                        nodeDataHtml += "<p>''</p>";
                    }
                }
            }
        }*/
        $("#node-keys").append(nodeNameHtml);
        $("#node-values").append(nodeDataHtml);
    }
    else {
        swal('Not able to show node details', ' ', 'error')
    }
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'VER', ip: query_ip }, "GET").done(function (response) {
        if (response.responseData[0].site_data.length) {
            document.getElementById('scripts_heading').style.display = 'flex'
            document.getElementById('no-versions').style.display = 'none'
            var key_data = response.responseData[0].site_data[0].key_data.data;
            var scriptnameHtml = '<p class="size14 mb-3 header" style="margin-left:5%">Scripts</p>';
            var scriptversionHtml = '<p class="size14 mb-3 header">Version</p>';
            // Iterate over the array of objects
            key_data.forEach(function (item) {
                // Extract 'name' and 'version' directly from each item
                if (item.hasOwnProperty("name") && item.hasOwnProperty("version")) {
                    var name = item["name"];
                    var version = item["version"];
                    // Apply styling to 'name' and 'version' as in your example
                    scriptnameHtml += "<p style='margin-left:5%'>" + name + "</p>";
                    scriptversionHtml += "<p>" + version + "</p>";
                }
            });
            // Append the generated HTML to the respective divs
            $("#ver-keys").html('');
            $("#ver-values").html('');
            $("#ver-keys").append(scriptnameHtml);
            $("#ver-values").append(scriptversionHtml);

        } else {
            document.getElementById('scripts_heading').style.display = 'none'
            document.getElementById('no-versions').style.display = 'flex'
        }
        
    })
}
function opendashboarsuperset(nodeid, dashboardurl) {
    if (dashboardurl !== null) {
        $("#analuticsurl").attr("href", ("../analytics/dashboard?jsonname=") + dashboardurl);
        $("#analuticsurl")[0].click();
    }
    else {
        alert("No Dashboard!!");
    }
}
function openNagiosGraph(nodeid, servicename) {
    $("#servicedata").val(servicename);
    $("#nagiosform").submit();
}
function monitorresponse(res) {

}
function openNav(nodeid, site, ip = "") {
    $('.nav-tabs a[href="#' + 'nav-info' + '"]').tab('show');  //this is for directly opening the info tab 
    $("#node-detail").show();
    requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": nodeid, "mode": '', csrfmiddlewaretoken: csfr_token, selectedSite: site, ip: ip }, type = "POST").done(nodespecificdetialsresponse);

}
function openNavs(nodeid, site, ip = "") {
    $('#nagiosgraph').empty()
    $('.nav-tabs a[href="#' + 'nav-health' + '"]').tab('show'); //this is for directly opening the HEALTH tab
    $("#node-detail").show();
    document.getElementById("expand").checked = false
    document.getElementById("bod-eodstatus-expand").scrollIntoView({ block: "center", behavior: "smooth" })
    requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": nodeid, "mode": '', csrfmiddlewaretoken: csfr_token, selectedSite: site, ip: ip }, type = "POST").done(nodespecificdetialsresponse);
}
function openhelp(nodeid, site, ip = "") {
    $('.nav-tabs a[href="#' + 'nav-help' + '"]').tab('show'); //this is for directly opening the HEALTH tab
    $("#node-detail").show();
    requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": nodeid, "mode": '', csrfmiddlewaretoken: csfr_token, selectedSite: site, ip: ip }, type = "POST").done(nodespecificdetialsresponse);
}
function closeNav() {
    $("#node-detail").hide();
    hideGraphPopup();
}
function ticketInfo() {
    window.location.href = window.location.origin + '/ticket/?isInfopage=true'
}
function getallTicketSiteNames() {

    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', isOnlyEnabled: 'true', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            ticketSiteResponse = res.data;
        }
        getChartData(ticketSiteResponse);
        selected_sitename = res['data'][0]['sitename'];
        selected_leurl = res['data'][0]['le_url'];
        selected_websocurl = res['data'][0]['websocket_url'];
        ledColors(res['data'][0]['sitename'], res['data'][0]['le_url'], res['data'][0]['websocket_url'])
    });
}
function getChartData(siteresponse) {
    showLoader("dashboard-tickets")
    showLoader("tickets-card")
    requestDataFromServer("/ticket/sitebasedData", { 'sites': JSON.stringify(siteresponse[0]), 'view': 'siteview', 'periods': 7 }, type = "GET").done(function (response) {
        chart_res = response['chartData']
        if (response['code'] == '200') {
            var title = 'All Tickets'
            var data = []
            var headData = ['ID', { type: 'datetime', label: 'Date' }, 'Count', 'Status', 'total_count']
            data.push(headData)

            chart_res.forEach(function (row) {
                row[1] = new Date(row[1].replaceAll('-', ','))
                data.push(row)

            });

            var title = 'Tickets of the Current month'

            if (typeof drawSeriesChart === "function") {
                google.charts.setOnLoadCallback(function () {//this is for bubble chart
                    drawSeriesChart(data, title);
                });
            }
        } else {
            var html = ''
            html += '<h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%">' + response['message'] + '</h3>'
            $("#TicketsOverview #print-error").append(html)
            $("#series_chart_div #loader img").hide();
        }
    });
}
