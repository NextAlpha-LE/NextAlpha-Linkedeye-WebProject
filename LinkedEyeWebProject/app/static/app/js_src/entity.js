var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
var responseFromServer;
var cyGraph;
var zoom = 1;
var titleToId = {};
var wsConnected = false;
var connectionTries = 6;
var Datanodes = "";
var swi_xml_24 = "";
var swi_xml_48 = "";
var sdeltalastreconnect = "";
var clientdata;
var newip = [];
var declient = {}
// var delclient = '';
var criticalNodeCount = 0;
hCriticalStatusCount = 0;
hOkStatusCount = 0
hPendingStatusCount = 0
hWarningStatusCount = 0
hUnknownStatusCount = 0
sCriticalStatusCount = 0;
sOkStatusCount = 0
sPendingStatusCount = 0
sWarningStatusCount = 0
sUnknownStatusCount = 0

let options = {
    valueNames: [
        'service',
        'ip',
        'status'
    ]
};
var graphLayout = {
    name: 'cose',
    directed: true,
    padding: 10,
    animate: false,
    fit: true,
    nodeOverlap: 5000,
}
var hwsitesData = [];
var chartsitesData = [];
entitySelectedsite = ' '
var siteResponse;
var entityResponse;
var sortedJson = {};
var sumsortedJson = {};
var nodeList;
$(document).ready(function () {
    //  getSwitchXML();
    getSiteNames();
    //getnewchart();
    //  searchNodes();

    if (pageName === "Dashboard") {
        $(".table-node").hide();
        $("#entity-heading").html("Entities");
    }
    else {
        $("#entity-next").hide();
        $("#change-col3-size").removeClass("col-lg-3");
        $("#change-col3-size").addClass("col-lg-4");
        $("#change-col7-size").removeClass("col-lg-7");
        $("#change-col7-size").addClass("col-lg-8");
    }

    $('#table-view').hide();
    $(".icon-node").hide();
    $("#entity-next").click(function () {
        window.location.href = "../entity/";
    });

    $("#export-to-select").change(function () {
        $('.modal-body').tableExport({
            filename: 'table_%DD%-%MM%-%YY%',
            format: $("#export-to-select").val(),
        });
    });

});


function getSiteNames() {
    //console.log('params.get("site")' + params.get("site"))
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        // console.log('res Response---->' + JSON.stringify(res))
        if (res.status == 200) {
            siteResponse = res.data;
            //     console.log('siteResponse---->' + JSON.stringify(siteResponse))
        }
        getHardwareData();
    });

}



function getnewchart() {
    // console.log('getChartData called')
    var target = "../dashboard/getoverallchartdetails";
    var site_name = params.get("site");
    var layers = ''
    var allsite = false
    const data = { sitename: site_name, layer: layers, allsite: allsite };
    fetch(target + '?' + new URLSearchParams(data), {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .then((response) => response.json())
        .then((data) => {
            var response = (data['data'])
            //console.log('DATA--->' + JSON.stringify(response))
            var hardware_critical = 0;
            var hardware_warning = 0;
            var hardware_ok = 0;
            var hardware_unknown = 0;
            var software_critical = 0;
            var software_warning = 0;
            var software_ok = 0;
            var software_unknown = 0;
            var application_critical = 0;
            var application_warning = 0;
            var application_ok = 0;
            var application_unknown = 0;
            // for (const key in response) {
            for (const [key, value] of Object.entries(response)) {
                hardware_critical += value['hardware']['0'];
                hardware_warning += value['hardware']['1'];
                hardware_ok += value['hardware']['2'];
                hardware_unknown += value['hardware']['3'];
                software_critical += value['software']['0'];
                software_warning += value['software']['1'];
                software_ok += value['software']['2'];
                software_unknown += value['software']['3'];
                application_critical += value['application']['0'];
                application_warning += value['application']['1'];
                application_ok += value['application']['2'];
                application_unknown += value['application']['3'];
            }
            chartresponse = { "hardware": { "CRITICAL": hardware_critical, "OK": hardware_ok, "WARNING": hardware_warning, "UNKNOWN": hardware_unknown }, "software": { "CRITICAL": software_critical, "OK": software_ok, "WARNING": software_warning, "UNKNOWN": software_unknown }, "application": { "CRITICAL": application_critical, "OK": application_ok, "WARNING": application_warning, "UNKNOWN": application_unknown } };
            // chartresponse = { "host": { "CRITICAL": 0, "OK": response['Host-count'][0][0] + response['SwitchHost-count'][0][0], "WARNING": 0, "UNKNOWN": 0 }, "service": { "CRITICAL": response['SwCritical-count'][0][0] + response['HostMsdown-count'][0][0] + response['SwitchPort-disconn'][0][0], "OK": response['SwOk-count'][0][0] + response['SwitchPort-conn'][0][0] + response['HostMs-count'][0][0], "WARNING": response['SwWarning-count'][0][0], "UNKNOWN": response['SwUnknown-count'][0][0] + response['HostMsunknown-count'][0][0] + response['SwitchPort-unknown'][0][0] } };
            //console.log('CHART RESPONSE--->' + JSON.stringify(chartresponse))

            var hardwarearray = Object.values(chartresponse['hardware'])
            var hardwares = hardwarearray.reduce(function (a, b) { return a + b; })
            var softwarearray = Object.values(chartresponse['software'])
            var softwares = softwarearray.reduce(function (a, b) { return a + b; })
            var applicationarray = Object.values(chartresponse['application'])
            var applications = applicationarray.reduce(function (a, b) { return a + b; })
            if (hardwares == 0) {
                //  console.log('HOSTS-->' + hosts)
                var nosite = '<div id="no-hosts" style="background-color:#a33219;color:white;border-radius:3px;font-size:16px;width:30%;text-align: center;">No Data</div>'
                document.getElementById('hardware-heading').style.display = 'block'
                // document.getElementById('host-heading').innerText='Hosts not available'
            } else {
                document.getElementById('hardware-heading').style.display = 'none'
            }
            if (softwares == 0) {
                //  console.log('SERVICES-->' + services)
                // var nosite = '<div id="no-services" style="background-color:#a33219;color:white;border-radius:3px;font-size:16px;width:30%;text-align: center;">No Data</div>'
                document.getElementById('software-heading').style.display = 'block'

                //  document.getElementById('service-heading').innerText = 'Services not available'
            } else {
                document.getElementById('software-heading').style.display = 'none'
            }
            if (applications == 0) {
                //  console.log('SERVICES-->' + services)
                // var nosite = '<div id="no-services" style="background-color:#a33219;color:white;border-radius:3px;font-size:16px;width:30%;text-align: center;">No Data</div>'
                document.getElementById('application-heading').style.display = 'block'

                //  document.getElementById('service-heading').innerText = 'Services not available'
            } else {
                document.getElementById('application-heading').style.display = 'none'
            }
            var critic_val = hardware_critical + software_critical + application_critical
            var warn_val = hardware_warning + software_warning + application_warning
            //console.log('CRITICAL_VAL-->' + critic_val + ' WARN_VAL-->' + warn_val)
            if (critic_val > 0) {
                $("#entityLED").addClass('red')
            } else if (warn_val > 0) {
                $("#entityLED").addClass('amber')
            } else {
                $("#entityLED").addClass('green')
            }
            fillHostServiceCount(chartresponse)
            //  console.log('Success:', data);
        })
        .catch((error) => {
            console.log("ERROR TEXT--->" + error)
            stopLoader('containerpie-hardwares')
            stopLoader('containerpie-softwares')
            stopLoader('containerpie-applications')
            document.getElementById('hardware-heading').style.display = 'block'
            document.getElementById('hardware-heading').style.width = '30%'
            document.getElementById('hardware-heading').innerText = 'URL ERROR'
            document.getElementById('software-heading').style.display = 'block'
            document.getElementById('software-heading').style.width = '30%'
            document.getElementById('software-heading').innerText = 'URL ERROR'
            document.getElementById('application-heading').style.display = 'block'
            document.getElementById('application-heading').style.width = '30%'
            document.getElementById('application-heading').innerText = 'URL ERROR'
            //  console.log('Error:', error);
        });

    /*requestDataFromServer("../dashboard/getchartspecificdetails", { sitename: params.get("site"), layer: "" }, type = "GET").done(function (data) {
        var response = (data['data'])
        console.log('DATA--->' + JSON.stringify(data))
        chartresponse = { "host": { "CRITICAL": 0, "OK": response['Host-count'][0][0] + response['SwitchHost-count'][0][0], "WARNING": 0, "UNKNOWN": 0 }, "service": { "CRITICAL": response['SwCritical-count'][0][0] + response['HostMsdown-count'][0][0] + response['SwitchPort-disconn'][0][0], "OK": response['SwOk-count'][0][0] + response['SwitchPort-conn'][0][0] + response['HostMs-count'][0][0], "WARNING": response['SwWarning-count'][0][0], "UNKNOWN": response['SwUnknown-count'][0][0] + response['HostMsunknown-count'][0][0] + response['SwitchPort-unknown'][0][0]  } };
       // chartresponse = { "host": { "CRITICAL": 0, "OK": response['Host-count'][0][0] + response['SwitchHost-count'][0][0], "WARNING": 0, "UNKNOWN": 0 }, "service": { "CRITICAL": response['SwCritical-count'][0][0] + response['HostMsdown-count'][0][0] + response['SwitchPort-disconn'][0][0], "OK": response['SwOk-count'][0][0] + response['SwitchPort-conn'][0][0] + response['HostMs-count'][0][0], "WARNING": response['SwWarning-count'][0][0], "UNKNOWN": response['SwUnknown-count'][0][0] + response['HostMsunknown-count'][0][0] + (response['SwitchPort-total'][0][0] - (response['SwitchPort-conn'][0][0] + response['SwitchPort-disconn'][0][0] + response['SwitchPort-warning'][0][0] + response['SwitchPort-five'][0][0])) } };
     //   console.log('CHART RESPONSE--->' + JSON.stringify(chartresponse))
        //chartresponse = { "host": { "CRITICAL": 0, "OK": response['Host-count'][0][0] + response['SwitchHost-count'][0][0], "PENDING": 0, "WARNING": 0, "UNKNOWN": 0 }, "service": { "CRITICAL": response['SwCritical-count'][0][0] + response['SwitchPort-disconn'][0][0], "OK": response['SwOk-count'][0][0] + response['SwitchPort-conn'][0][0] + response['HostMs-count'][0][0], "PENDING": response['SwPending-count'][0][0], "WARNING": response['SwWarning-count'][0][0], "UNKNOWN": response['SwUnknown-count'][0][0] + (response['SwitchPort-total'][0][0] - (response['SwitchPort-conn'][0][0] + response['SwitchPort-disconn'][0][0])) } };
        

        var hostsarray = Object.values(chartresponse['host'])
        var hosts = hostsarray.reduce(function (a, b) { return a + b; })
        var servicesarray = Object.values(chartresponse['service'])
        var services = servicesarray.reduce(function (a, b) { return a + b; })
        if (hosts == 0) {
          //  console.log('HOSTS-->' + hosts)
            var nosite = '<div id="no-hosts" style="background-color:#a33219;color:white;border-radius:3px;font-size:16px;width:30%;text-align: center;">No Data</div>'
            document.getElementById('host-heading').style.display = 'block'
            // document.getElementById('host-heading').innerText='Hosts not available'
        } else {
            document.getElementById('host-heading').style.display = 'none'
        }
        if (services == 0) {
          //  console.log('SERVICES-->' + services)
            // var nosite = '<div id="no-services" style="background-color:#a33219;color:white;border-radius:3px;font-size:16px;width:30%;text-align: center;">No Data</div>'
            document.getElementById('service-heading').style.display = 'block'

            //  document.getElementById('service-heading').innerText = 'Services not available'
        } else {
            document.getElementById('service-heading').style.display = 'none'
        }

        fillHostServiceCount(chartresponse)
    });*/
}

function getHardwareData() {

    // showLoader("node-view")
    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site"), layer: "s_hw" }, type = "GET").done(fillHWNodeDetails);

}


/*function fillNodeDetail(response) {
    console.log('INSIDE ENTITY fillnodedetails' + JSON.stringify(response))
    if (response == undefined)
        return;
    entityResponse = response.responseData;

    if (response.responseData.length > 0) {
        response.responseData.forEach(function (obj, index) {
            var tempObj = {}
            tempObj['site'] = obj.site
            tempObj['isSuccess'] = true
            tempObj['isWSConnected'] = false
            tempObj['criticalNodeCount'] = 0
            tempObj['nodeCount'] = { "host": { "criticalCount": 0, "okCount": 0, "pendingCount": 0, "warningCount": 0, "unknownCount": 0 }, "service": { "criticalCount": 0, "okCount": 0, "pendingCount": 0, "warningCount": 0, "unknownCount": 0 } };
            responseFromServer = obj.site_data
            if (Object.keys(responseFromServer).length > 0) {
                var nodeResponse = responseFromServer["nodes"]
                if (nodeResponse.status == 200 && nodeResponse.data.length > 0) {
                  
                    nodeResponse.data.forEach(function (row) {
                        if (row[2])
                            var state = row[2].toUpperCase()
                        else
                            var state = row[2]
                        if (state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING") {
                            criticalNodeCount++;
                            tempObj['isSuccess'] = false
                            if (entitySelectedsite == ' ') {
                                entitySelectedsite = obj.site
                            }
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hCriticalStatusCount++ : sCriticalStatusCount++
                        }
                        if (state == "" || state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hOkStatusCount++ : sOkStatusCount++
                        }
                        if (state === "PENDING") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hPendingStatusCount++ : sPendingStatusCount++;
                        }
                        if (state === "WARNING") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hWarningStatusCount++ : sWarningStatusCount++;
                        }
                        if (state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hUnknownStatusCount++ : sUnknownStatusCount++;
                        }
                    });
                    tempObj['criticalNodeCount'] = criticalNodeCount;
                     tempObj['nodeCount']['host']['criticalCount'] = hCriticalStatusCount;
                     tempObj['nodeCount']['host']['okCount'] = hOkStatusCount;
                     tempObj['nodeCount']['host']['pendingCount'] = hPendingStatusCount;
                     tempObj['nodeCount']['host']['warningCount'] = hWarningStatusCount;
                     tempObj['nodeCount']['host']['unknownCount'] = hUnknownStatusCount;
                   
                    tempObj['nodeCount']['service']['criticalCount'] = sCriticalStatusCount;
                    tempObj['nodeCount']['service']['okCount'] = sOkStatusCount;
                    tempObj['nodeCount']['service']['pendingCount'] = sPendingStatusCount;
                    tempObj['nodeCount']['service']['warningCount'] = sWarningStatusCount;
                    tempObj['nodeCount']['service']['unknownCount'] = sUnknownStatusCount;
                }
                else {
                    tempObj['isSuccess'] = false
                }

            }
            else {
                tempObj['isSuccess'] = false
            }
            console.log('TEMP OBJ--->' + JSON.stringify(tempObj))
            chartsitesData.push(tempObj)
            var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === obj.site)[0]
            clientdata = tempObj['site']
            makeWebSocConnection(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'])
        });
        sSitehtml = ''
        //fSitehtml = ''
        $("#node-view #site-list").empty()
        chartsitesData.forEach(function (obj, index) {
            //if (obj.isSuccess) {  (<!--  SITE NAME COMES THIS PLACE IN 2 TIMES -->)
            sSitehtml = ''
            sSitehtml += '<li class="nav-item success" id="' + obj.site + '_li" style="position: relative;"><span class="" style="z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="bold-text" style="color:#c8c8c8;" data-id="' + obj.site + '" id="' + obj.site + '" data-toggle="tab" onclick="onEntitySiteTabchange(\'' + obj.site + '\')">' + obj.site + '&ensp;>&ensp;</a></li><h2 style="font-size:15px;">Entity Status<h2>'
            $("#entityLED").removeClass("red").addClass('green');
            
        });
        //$("#node-view #site-list").append(fSitehtml);
        $("#node-view #site-list").append(sSitehtml);
        if ($("#node-view #site-list li a").eq(0).data()) {
            entitySelectedsite = $("#node-view #site-list li a").eq(0).data().id
        }
        // $("#node-view #site-list #" + entitySelectedsite).addClass('active');
        var obj = entityResponse[0] //.filter(x => x.site === entitySelectedsite)[0]
        //  var obj = entityResponse
        stopLoader("node-view")
        // dispalyNodes(obj.site_data, obj.code, ip)
    }
    else {
        stopLoader("node-view")
        $("#node-view #entity-search").css('visibility', 'hidden');
        $("#node-view #s_sw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        $("#node-view #nodatamessage").text('No Data');
    }
    console.log("SW BEFORE IF SITESDATA-->" + JSON.stringify(chartsitesData));
    console.log('SW PAGENAME-->' + pageName)
    if (pageName === "Dashboard" || pageName === "Entity") {
        console.log('ENTITY FILLNODEDETAILS')
        var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === entitySelectedsite)[0]
        // onTicketSiteTabchange(entitySelectedsite, tempSiteObj)
      // findCount()
    }

}*/

// HARDWARE FUNCTION ON SWITCH PAGE

function fillHWNodeDetails(response) {
    // const alphabet = "abcdefghijklmnopqrstuvwxyz"
    // const randomvalue = alphabet[Math.floor(Math.random() * alphabet.length)]
    // const randomvalues = alphabet[Math.floor(Math.random() * alphabet.length)]
    // console.log("randomCharacter-->" + randomCharacter)
    const randomvalue = Math.random().toString(36).substring(2, 5);
    const randomvalues = Math.random().toString(36).substring(2, 5);
    const randomswivalues = Math.random().toString(36).substring(2, 5);
    const randombodvalues = Math.random().toString(36).substring(2, 5);
    const randomadpvalues = Math.random().toString(36).substring(2, 5);
    const randomeodvalues = Math.random().toString(36).substring(2, 5);
    if (response == undefined)
        return;
    entityResponse = response.responseData;
    if (response.responseData.length > 0) {
        response.responseData.forEach(function (obj, index) {
            var tempObj = {}
            tempObj['site'] = obj.site
            tempObj['isSuccess'] = true
            tempObj['isWSConnected'] = false
            tempObj['criticalNodeCount'] = 0
            tempObj['nodeCount'] = { "host": { "criticalCount": 0, "okCount": 0, "warningCount": 0, "unknownCount": 0 }, "service": { "criticalCount": 0, "okCount": 0, "warningCount": 0, "unknownCount": 0 } };
            responseFromServer = obj.site_data
            if (Object.keys(responseFromServer).length > 0) {
                var nodeResponse = responseFromServer["nodes"]
                if (nodeResponse.status == 200 && nodeResponse.data.length > 0) {
                    criticalNodeCount = 0;
                    hCriticalStatusCount = 0;
                    hOkStatusCount = 0
                    hPendingStatusCount = 0
                    hWarningStatusCount = 0
                    hUnknownStatusCount = 0
                    nodeResponse.data.forEach(function (row) {
                        if (typeof (row[2]) != "number")
                            var state = row[2].toUpperCase()
                        else
                            var state = row[2]
                        if (state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING") {
                            criticalNodeCount++;
                            tempObj['isSuccess'] = false
                            if (entitySelectedsite == ' ') {
                                entitySelectedsite = obj.site
                            }
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hCriticalStatusCount++ : sCriticalStatusCount
                        }
                        if (state == "" || state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hOkStatusCount++ : sOkStatusCount
                        }
                        if (state === "PENDING") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hPendingStatusCount++ : sPendingStatusCount;
                        }
                        if (state === "WARNING") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hWarningStatusCount++ : sWarningStatusCount;
                        }
                        if (state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hUnknownStatusCount++ : sUnknownStatusCount;
                        }
                    });
                    tempObj['criticalNodeCount'] = criticalNodeCount;
                    tempObj['nodeCount']['host']['criticalCount'] = hCriticalStatusCount;
                    tempObj['nodeCount']['host']['okCount'] = hOkStatusCount;
                    tempObj['nodeCount']['host']['pendingCount'] = hPendingStatusCount;
                    tempObj['nodeCount']['host']['warningCount'] = hWarningStatusCount;
                    tempObj['nodeCount']['host']['unknownCount'] = hUnknownStatusCount;
                    tempObj['nodeCount']['service']['criticalCount'] = 0;
                    tempObj['nodeCount']['service']['okCount'] = 0;
                    tempObj['nodeCount']['service']['pendingCount'] = 0;
                    tempObj['nodeCount']['service']['warningCount'] = 0;
                    tempObj['nodeCount']['service']['unknownCount'] = 0;
                }
                else {
                    tempObj['isSuccess'] = false
                }

            }
            else {
                tempObj['isSuccess'] = false
            }
            chartsitesData.push(tempObj)
            var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === obj.site)[0]  //error while loading first time
            // console.log("changeSiteStatus() =======>" + tempObj['site'])
            // console.log("changeSiteStatudufhs() =======>" + tempObj['criticalNodeCount'])
            // console.log("siteResponse[0]--->" + JSON.stringify(siteResponse[0]))
            //console.log("entity.js------->")
            connectbodWebSocket(tempSiteObj.websocket_url, tempObj['site'], 0, randombodvalues)
            connectsiteAdpWebSocket(tempSiteObj.websocket_url, tempObj['site'], 0, randomadpvalues)
            connectsiteEodWebSocket(tempSiteObj.websocket_url, tempObj['site'], 0, randomeodvalues)
            makeWebSocConnectionk8entity(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'], randomvalue)//ENTITY WEBSOC(Entity-new-ws.js)
            makeWebSocConnectionsites(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'], randomvalues)//DELTA WEBSOC(Entity.js)
            makeWebsiteSwitchConnection(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'], randomswivalues)
            //changeSiteStatus(tempObj['site'], tempObj['criticalNodeCount'])
        });
        sSitehtml = ''
        fSitehtml = ''
        $("#node-view #site-list").empty()
        chartsitesData.forEach(function (obj, index) {
            if (obj.isSuccess) {
                sSitehtml = ''
                sSitehtml += '<li class="nav-item success" id="' + obj.site + '_li" style="position: relative;"><span class="" style="z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="bold-text" style="color:#c8c8c8;" data-id="' + obj.site + '" id="' + obj.site + '" data-toggle="tab" onclick="onEntitySiteTabchange(\'' + obj.site + '\')"></a></li>'
                // $("#entityLED").removeClass("red").addClass('green');
                // console.log("entityLED----1--->")
            }
            else {
                fSitehtml = ''
                fSitehtml += '<li class="nav-item failure" id="' + obj.site + '_li" style="position: relative;"><span class="" style="z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="bold-text" style="color:#c8c8c8;" data-id="' + obj.site + '" id="' + obj.site + '" data-toggle="tab" onclick="onEntitySiteTabchange(\'' + obj.site + '\')"></a></li>'
                // $("#entityLED").removeClass("green").addClass('red');
                // console.log("entityLED------2---->")
            }
        });
        $("#node-view #site-list").append(fSitehtml);
        $("#node-view #site-list").append(sSitehtml);
        if ($("#node-view #site-list li a").eq(0).data()) {
            entitySelectedsite = $("#node-view #site-list li a").eq(0).data().id
        }
        //  $("#node-view #site-list #" + entitySelectedsite).addClass('active');
        var obj = entityResponse[0] //.filter(x => x.site === entitySelectedsite)[0]
        //  var obj = entityResponse
        // stopLoader("node-view")

        if (obj.code == 200 && obj.site_data.nodes.data != "") {
            obj = entityResponse[0]
            // console.log("entity-new---> if")
            // displayNodes(obj.site_data, obj.code)
        } else {
            //  console.log("entity-new---> else")
            //swal("Hardware information missing ! \n Please Onboard server or contact administrator", ' ', 'warning')

            var warnhtml = ''
            warnhtml += '<div class="" style="padding: 2%;height:25px;margin-top:25%;background: #f44336;border-radius: 12px;z-index: 999;">'
            warnhtml += '<span class="closebuttn" type="button" onclick="dismissfunc(this)" style="margin-left: 15px;color: white;font-weight: bold;float: right;font-size: 40px;line-height: 20px;margin-top:-10px;cursor: pointer;transition: 0.3s;">&times;</span>'
            warnhtml += '<h3 style="text-align:center;margin-top:-10px; font-size:15px;"> Hardware information missing! Please Onboard server or contact administrator</h3>'
            warnhtml += '</div>'
            $('#warningdata').append(warnhtml)

        }


    }
    else {
        //  stopLoader("node-view")
        $("#node-view #entity-search").css('visibility', 'hidden');
        $("#node-view #s_hw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        $("#node-view #nodatamessage").text('No Data');
    }
    // console.log("hW BEOFORE IF SITESDATA-->" + JSON.stringify(chartsitesData));
    //console.log('hW PAGENAME-->' + pageName)
    if (pageName === "Dashboard" || pageName === "Entity") {
        var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === entitySelectedsite)[0]
        //onTicketSiteTabchange(entitySelectedsite, tempSiteObj)
        //  findCount()
    }
    // console.log("datetime---->" + new Date())

}
// switch hardware close


/*function findCount(response) {
    console.log('FINDCOUNT FROM ENTITY')
    var hCriticalStatusCount = 0;
    var hOkStatusCount = 0
    var hPendingStatusCount = 0
    var hWarningStatusCount = 0
    var hUnknownStatusCount = 0
    var sCriticalStatusCount = 0;
    var sOkStatusCount = 0
    var sPendingStatusCount = 0
    var sWarningStatusCount = 0
    var sUnknownStatusCount = 0

    chartsitesData.forEach(function (row) {

        if (row['nodeCount'] == undefined) {
            return
        }
        var data = row['nodeCount']
        hCriticalStatusCount = hCriticalStatusCount + data['host']['criticalCount']
        hOkStatusCount = hOkStatusCount + data['host']['okCount']
        hPendingStatusCount = hPendingStatusCount + data['host']['pendingCount']
        hWarningStatusCount = hWarningStatusCount + data['host']['warningCount']
        hUnknownStatusCount = hUnknownStatusCount + data['host']['unknownCount']

        sCriticalStatusCount = sCriticalStatusCount + data['service']['criticalCount']
        sOkStatusCount = sOkStatusCount + data['service']['okCount']
        sPendingStatusCount = sPendingStatusCount + data['service']['pendingCount']
        sWarningStatusCount = sWarningStatusCount + data['service']['warningCount']
        sUnknownStatusCount = sUnknownStatusCount + data['service']['unknownCount']

        return
    })
    var tempObj = {}
    tempObj['host'] = { "CRITICAL": hCriticalStatusCount, "OK": hOkStatusCount, "PENDING": hPendingStatusCount, "WARNING": hWarningStatusCount, "UNKNOWN": hUnknownStatusCount }
    tempObj['service'] = { "CRITICAL": sCriticalStatusCount, "OK": sOkStatusCount, "PENDING": sPendingStatusCount, "WARNING": sWarningStatusCount, "UNKNOWN": sUnknownStatusCount }

    fillHostServiceCount(response)
}*/

/*
function changeSiteStatus(site, count) {
   // console.log("changeSiteStatus---->" + site)
   // console.log("changeSiteStatus---->" + count)
    var obj = sitesData //.filter(x => x.site === site)[0]
    if (obj) {
       // console.log("sitesData=sitesData===>" + JSON.stringify(obj))
        obj.criticalNodeCount = count;
      //  console.log("obj.criticalNodeCount===>" + JSON.stringify(obj.criticalNodeCount))
        if (count == 0) {
            obj.isSuccess = true
            $("#node-view #site-list #" + site + '_li').removeClass("failure").addClass('success')
            $("#node-view #site-list #" + site + '_li a').removeClass("red").addClass('green')
           // console.log("entityLED----1-->")
            $("#entityLED").removeClass("red").addClass('green')
        }
        else {
            obj.isSuccess = false
            $("#node-view #site-list #" + site + '_li').removeClass("success").addClass('failure')
            $("#node-view #site-list #" + site + '_li a').removeClass("green").addClass('red')
           // console.log("entityLED----2-->")
            $("#entityLED").removeClass("green").addClass('red')
        }
    }
}
 */
function changeSiteStatus(site, count) {
    var critical;
     //console.log("CRITICAL--res->")
    requestDataFromServer("../dashboard/getchartspecificdetails", { sitename: params.get("site"), layer: "" }, type = "GET").done(function (datas) {
        var response = (datas['data'])
        // console.log("changeSiteStatus--res->" + JSON.stringify(response))
        // var WARNING = response['SwWarning-count'][0][0]
        critical = response['SwCritical-count'][0][0] + response['HostMsdown-count'][0][0] + response['SwitchPort-disconn'][0][0]
        //  console.log("WARNING--res->" + JSON.stringify(WARNING))

    });
    if (critical == 0) {
        // obj.isSuccess = true
        $("#node-view #site-list #" + site + '_li').removeClass("failure").addClass('success')
        $("#node-view #site-list #" + site + '_li a').removeClass("red").addClass('green')
        //   console.log("entityLED----1-->")
        $("#entityLED").removeClass("red").addClass('green')
    }
    else {
        // obj.isSuccess = false
        $("#node-view #site-list #" + site + '_li').removeClass("success").addClass('failure')
        $("#node-view #site-list #" + site + '_li a').removeClass("green").addClass('red')
        //    console.log("entityLED----2-->")
        $("#entityLED").removeClass("green").addClass('red')
    }
    // console.log("changeSiteStatus---->" + site)
    // console.log("changeSiteStatus---->" + count)
    /* var obj = sitesData //.filter(x => x.site === site)[0]
     if (obj) {
        // console.log("sitesData=sitesData===>" + JSON.stringify(obj))
         obj.criticalNodeCount = count;
       //  console.log("obj.criticalNodeCount===>" + JSON.stringify(obj.criticalNodeCount))
         if (count == 0) {
             obj.isSuccess = true
             $("#node-view #site-list #" + site + '_li').removeClass("failure").addClass('success')
             $("#node-view #site-list #" + site + '_li a').removeClass("red").addClass('green')
            // console.log("entityLED----1-->")
             $("#entityLED").removeClass("red").addClass('green')
         }
         else {
             obj.isSuccess = false
             $("#node-view #site-list #" + site + '_li').removeClass("success").addClass('failure')
             $("#node-view #site-list #" + site + '_li a').removeClass("green").addClass('red')
            // console.log("entityLED----2-->")
             $("#entityLED").removeClass("green").addClass('red')
         }
     }*/
}

function nodeStatus(tempObj) {

    var criticalStatusCount = 0;
    var okStatusCount = 0;
    var pendingStatusCount = 0;
    var warningStatusCount = 0;
    var unknownStatusCount = 0;
    var obj = { "criticalCount": 0, "okStatusCount": 0, "pendingCount": 0, "warningCount": 0 };
    tempObj.forEach(function (row) {
        if (row[0])
            var state = row[0].toUpperCase()
        else
            var state = row[0]
        if (state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING") {
            criticalStatusCount = criticalStatusCount + row[1]
        }
        if (state == "" || state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP") {
            okStatusCount = okStatusCount + row[1]
        }
        if (state === "PENDING") {
            pendingStatusCount = pendingStatusCount + row[1];
        }
        if (state === "WARNING") {
            warningStatusCount = warningStatusCount + row[1];
        }
        if (state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED") {
            unknownStatusCount = unknownStatusCount + row[1];
        }
    });
    obj = { "criticalCount": criticalStatusCount, "okCount": okStatusCount, "pendingCount": pendingStatusCount, "warningCount": warningStatusCount, "unknownCount": unknownStatusCount }
    return obj;
}
function nodeSpecificDetails(nodeId, title) {

    if ($("#node-detail").css('display') != 'none') {
        nodeTitle = $("#node-name").text();
        if (nodeId != undefined && nodeTitle == title) {
            showLoader('node-detail')
            requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": nodeId, "mode": '', csrfmiddlewaretoken: csfr_token, selectedSite: entitySelectedsite }, type = "POST").done(nodespecificdetialsresponse);
        }
    }
}

var delobj = {}

function displaydeltooltips(wsname, sname) {
    const tooltip = document.getElementById(sname);
    const wrapper = document.getElementById(wsname);

    if (tooltip.classList.contains('showns')) {
        // If the tooltip is already shown, close it
        tooltip.classList.remove('showns');
        wrapper.classList.remove('border-clrs');
    } else {
        // Close all other tooltips
        closeAllsiteTooltips(tooltip);

        // Open the clicked tooltip
        tooltip.classList.add('showns');
        wrapper.classList.add('border-clrs');
    }
}
/*function displaydeltooltips(wsname, sname) {
    if (document.getElementById(sname).classList.contains('delshown')) {
        document.getElementById(wsname).classList.remove('delborder-clr')
        document.getElementById(sname).classList.remove('delshown')
    } else {
        document.getElementById(wsname).classList.add('delborder-clr')
        document.getElementById(sname).classList.add('delshown')
    }
}*/

var sitesname = 'delsitesname'
var wsocname = 'delta-pipe'
var deltahtml = '<div class="indicator" id="delta-pipe"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats" onclick="displaydeltooltips(\''+ wsocname + '\',\'' + sitesname + '\')"> \
                        <span class="tooltiptext" id="delsitesname" style="overflow-y:scroll">\
                        <p><b>Queue Name :</b> delta_update</p> \
                        </span> \
                    </i> \
                 </div>'
$('#delta-html').empty()
$("#delta-html").append(deltahtml);
function iconclose(ip) {
    isToBeConnect = !{}[true];
    if (delobj[ip]) {
        delobj[ip].disconnect();
    }
}

function iconconnect(ip) {
    isToBeConnect = {}[true];
    makeWebSocConnectionsites(delobj[ip].ws.url, delobj[ip].id, 0)
}

function makeWebSocConnectionsites(websocketurl, wsitename, tries, nodeCount, values) {
    var delclient = 'client' + (values)
    //console.log("makeWebSocConnectionsites")
    //console.log("makeWebSocConnectionsites---->"+delclient)
    try {
        if (window.WebSocket) {
            var destination = "/exchange/delta_update";
            delclient = Stomp.client(websocketurl);
            //  var wsobjname = new WebSocket(websocketurl);
            // var client = Stomp.over(wsobjname);
            delclient.id = wsitename
            delclient.connectionTries = tries;
            delclient.criticalNodeCount = nodeCount;
            delobj[wsitename] = delclient
            var iconhtml = ''
            iconhtml += '<div class="row tooltiping">'
            iconhtml += '<table>';
            iconhtml += '<thead></thead>';
            iconhtml += '<tbody class="row">';
            iconhtml += '<tr class="col-12">';
            iconhtml += '<td class="col-8 details_td" style="width: 100px;">isConnected</td>';
            iconhtml += '<td class="col-4 details_ts" id="' + wsitename + 'destatus-conn" ></td>';
            iconhtml += '</tr>';
            iconhtml += '</tbody>';
            iconhtml += '</table>';
            iconhtml += ' <p class="tooltiptexting" id="' + wsitename + 'delast-conn"></p>'
            //iconhtml += '<p class="col-9" style="color:#ffffff" id="' + wsitename + '"></p>'
            iconhtml += '<p class="col-3" id="dedisplay-icon' + wsitename + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
            iconhtml += '</div>'
            $('#delsitesname').append(iconhtml)
            var on_conn = function () {
                wsConnected = true;
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = true;
                isToBeConnect = {}[true];
                // delclient.connectionTries = 0;
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsitename + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> delta_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> True(0)</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + sdeltalastreconnect + '</p>'
                iconhtml += '</div>'
                $('#delsitesname').empty()
                $('#delsitesname').append(iconhtml)*/
                document.getElementById(wsitename + 'destatus-conn').innerText = 'True(0)'
                document.getElementById(wsitename + 'destatus-conn').style.color = "#16d39a";
                document.getElementById('delta-pipe').style.color = '#16d39a'
                $("#dedisplay-icon" + wsitename).css('display', 'none');
                document.getElementById(wsitename + 'delast-conn').innerText = "Lastconnect : " + sdeltalastreconnect
                // $("#snackbars").fadeOut();
                /*client.subscribe('/exchange/k8s_update', function(message)
                {
                    var tempJson = JSON.parse(message.body);
                    var monitorStatus = tempJson.monitor_status;
                    if(monitorStatus === "CRITICAL" || monitorStatus === "DOWN" || monitorStatus === "UNREACHABLE" || monitorStatus === "FALSE" || monitorStatus === "WAITING")
                    {
                        client.criticalNodeCount++;
                    }
                    else
                    {
                        client.criticalNodeCount--;
                    }
                    if(client.id == entitySelectedsite)
                    {
                        var title = tempJson.title;
                        var name = tempJson.name;
                        var node_type = tempJson.node_type;
                        var kind = tempJson.kind;
                        var image = image_path+tempJson.image;
                        if(title !== "")
                        {
                            if(cyGraph)
                            {
                                var id = titleToId[title];
                                if(node_type === "create" || node_type === "update")
                                {
                                    var eles = cyGraph.nodes("[fullname='"+title+"']");
                                    var isNode = eles.isNode();
                                    var color = getColorForNodeState(monitorStatus);
                                    var size = getSizeForNode(tempJson.type)
                                    if(!isNode)
                                    {
                                        var nodes = { fullname: title,dashboardenabled: 'true',
                                        dashboard_url: "/static/app/images/images/Linux.png",text: name ,image:image, color: color, size: size};
                                        cyGraph.add({group: 'nodes', data: nodes })
                                        var layouts = cyGraph.layout(graphLayout);
                                        layouts.run();
                                        cyGraph.style().selector(eles).style(
                                        {
                                            'background-color': color,
                                            'border-color': color,
                                        }).update();
                                        setAnimsites(id);
                                    }
                                    else
                                    {
                                        if(cyGraph.nodes && cyGraph.nodes("[fullname='"+title+"']"))
                                        {
                                            cyGraph.nodes("[fullname='"+title+"']")[0]["_private"]["data"]["color"] = color;
                                            cyGraph.style().selector(eles).style(
                                            {
                                                'background-color': color,
                                                'border-color': color,
                                            }).update();
                                            setAnimsites(id);
                                        }
                                    }                         
                                }
                                else if(node_type === "delete")
                                {
                                    var color = getColorForNodeState("CRITICAL");
                                    cyGraph.style().selector(eles).style(
                                    {
                                        'background-color': color,
                                        'border-color': color,
                                    }).update();
                                    var eles = cyGraph.nodes("[fullname='"+title+"']");
                                    cyGraph.remove(eles);
                                }
                                nodeSpecificDetailssites(id, title)
                            }
                        }
                    }
                    changeSiteStatussites(client.id, client.criticalNodeCount)
                    // else
                    // {
                    //     var obj = sitesData.filter(x => x.site === client.id)[0]
                    //     if(monitorStatus === "CRITICAL" || monitorStatus === "DOWN" || monitorStatus === "UNREACHABLE" || monitorStatus === "FALSE" || monitorStatus === "WAITING")
                    //     { 
                    //         if(obj.isSuccess != false) 
                    //         {
                    //             $("#node-view #"+client.id+"_li").removeClass("success");
                    //             $("#node-view #"+client.id+"_li").addClass("failure");
                    //             $("#node-view #"+client.id+"_li .nav-link").removeClass("green");
                    //             $("#node-view #"+client.id+"_li .nav-link").addClass("red");
                    //         }  
                    //     }  
                    // }
                });*/

                delclient.subscribe(destination, function (message) {
                    // console.log("delta websocket message --->" + message)
                    //   console.log("delta websocket called")
                    var tempJson = JSON.parse(message.body);
                    var monitorStatus = tempJson.monitor_status;
                    if (monitorStatus === "CRITICAL" || monitorStatus === "DOWN" || monitorStatus === "UNREACHABLE" || monitorStatus === "FALSE" || monitorStatus === "WAITING") {
                        delclient.criticalNodeCount++;
                    }
                    else {
                        delclient.criticalNodeCount--;
                    }
                    if (delclient.id == entitySelectedsite) {
                        var id = titleToId[tempJson.title];
                        if (id !== undefined) {
                            var color = getColorForNodeState(tempJson.monitor_status);
                            if (cyGraph.nodes("[fullname='" + tempJson.title + "']")[0])
                                cyGraph.nodes("[fullname='" + tempJson.title + "']")[0]["_private"]["data"]["color"] = color;
                            cyGraph.style().selector('node[id = ' + id + ']').style(
                                {
                                    'background-color': color,
                                    'border-color': color,
                                }).update();
                            setAnimChart(id);
                        }
                        nodeSpecificDetailssites(id, tempJson.title)
                    }
                    if (tempJson.host !== undefined) {
                        var tempObj = {}
                        tempObj['host'] = nodeStatus(Object.keys(tempJson.host).map((key) => [key, Number(tempJson.host[key])]));
                        tempObj['service'] = nodeStatus(Object.keys(tempJson.service).map((key) => [key, Number(tempJson.service[key])]));
                        obj.nodeCount = tempObj;
                        if (pageName === "Dashboard")
                            getnewchart()
                        if (entitySelectedsite == delclient.id) {
                            updateValues(tempObj);
                        }
                    }
                    // changeSiteStatus(delclient.id, delclient.criticalNodeCount)
                });
                $("#node-view #" + delclient.id + "-indicator").css('background', '#16d39a')
            }
            var on_err = function (error) {
                $("#node-view #" + delclient.id + "-indicator").css('background', '#ff3d57')
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                isToBeConnect = !{}[true];
                obj.isWSConnected = false;
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsitename + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> delta_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> False(' + delclient.connectionTries + ')</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + sdeltalastreconnect + '</p>'
                iconhtml += '</div>'
                $('#delsitesname').empty()
                $('#delsitesname').append(iconhtml)*/
                document.getElementById(wsitename + 'destatus-conn').innerText = 'False(' + delclient.connectionTries + ')'
                document.getElementById(wsitename + 'destatus-conn').style.color = "#ff3d57";
                document.getElementById('delta-pipe').style.color = '#ff3d57'
                $("#dedisplay-icon" + wsitename).css('display', 'block');
                document.getElementById(wsitename + 'delast-conn').innerText = "Lastconnect : " + sdeltalastreconnect

                delclient.connectionTries++;
                const timestamp = new Date;
                const date = new Date(timestamp);
                var month = date.getMonth() + 1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();
                var hour = date.getHours();
                var mins = date.getMinutes();
                var sec = date.getSeconds();
                var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                sdeltalastreconnect = formattedDate.toLocaleString();

                if (networkStatus === 'online') {
                    if (delclient.connectionTries >= 10) {
                        isToBeConnect = !{}[true];
                        /* swal({
                             title: "Want to get chart updates?",
                             text: "Not able to connect web socket of \"" + delclient.id + "\". Please check once!.",
                             type: "info",
                             showCancelButton: true,
                             confirmButtonClass: "btn-success",
                             confirmButtonText: "Yes, try again",
                             cancelButtonText: "No Cancel",
                             closeOnConfirm: true,
                             closeOnCancel: true
                         },
                             function (isConfirm) {
                                 if (isConfirm) {
                                     isToBeConnect = {}[true];
                                     makeWebSocConnectionsites(delclient.ws.url, delclient.id, 0, delclient.criticalNodeCount)
                                   //  location.reload();
                                 } else {
                                     isToBeConnect = !{}[true];
                                     delclient.disconnect();
                                     $("#node-view #" + delclient.id + "-indicator").css('background', '#ff3d57')
                                 }
                             });*/
                    }
                    else {
                        // delclient.connectionTries++;
                        const timestamp = new Date;
                        const date = new Date(timestamp);
                        var month = date.getMonth() + 1;//months (0-11)
                        var day = date.getDate();//day (1-31)
                        var year = date.getFullYear();
                        var hour = date.getHours();
                        var mins = date.getMinutes();
                        var sec = date.getSeconds();
                        var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                        sdeltalastreconnect = formattedDate.toLocaleString();
                        /* var iconhtml = ''
                         iconhtml += '<div class="row tooltip" style="line-height:5px; display:flex !important">'
                         iconhtml += ' <p class="tooltiptext" id="' + wsitename + '"></p>'
                         iconhtml += ' <p><b>Queue Name :</b> delta_update</p>'
                         iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> Trying(' + delclient.connectionTries + ')</p>'
                         iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                         iconhtml += '<p><b>Lastconnect:</b>' + sdeltalastreconnect + '</p>'
                         iconhtml += '</div>'
                         $('#delsitesname').empty()
                         $('#delsitesname').append(iconhtml)*/
                        document.getElementById(wsitename + 'destatus-conn').innerText = 'Trying(' + delclient.connectionTries + ')'
                        document.getElementById(wsitename + 'destatus-conn').style.color = "#e99123";
                        document.getElementById('delta-pipe').style.color = '#e99123'
                        $("#dedisplay-icon" + wsitename).css('display', 'block');
                        document.getElementById(wsitename + 'delast-conn').innerText = "Lastconnect : " + sdeltalastreconnect
                        if (isToBeConnect = {}[true]) {
                            makeWebSocConnectionsites(delclient.ws.url, delclient.id, delclient.connectionTries, delclient.criticalNodeCount)
                        }
                    }
                }
            };
            delclient.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}
