var responseFromServer;
var params = new URLSearchParams(document.location.search);
//console.log("SITENAME PARAMS---->" + document.location)
var cyGraph;
var zoom = 1;
var titleToId = {};
var wsConnected = false;
var connectionTries = 6;
var mdeltalastreconnect = "";
var dclient = {}
// var deltaclient = '';
var graphLayout = {
    name: 'cose',
    directed: true,
    padding: 10,
    animate: false,
    fit: true,
    nodeOverlap: 5000,
}
var sitesData = [];
var chartsData = [];
var abc = { "hosts": { "ok": 1 } }
entitySelectedsite = ' '
var siteResponse;
var entityResponse;
var sortedJson = {};
var delobj = {}
var nodeList;
var site_list = []
var chartdata_list = {}
console.log("delta-dasboard-js-->")
$(document).ready(function () {
    getSiteNamesChart()
    getEntityDataChart()
    // searchNodesChart()
    //firsttime_get()

    /*  if (pageName === "Dashboard") {
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
      $('.icon-tableview').on('click', function (event) {
          $(".icon-tableview ,.icon-node").toggle(100);
          displayTableChart()
          $('#vis, #table-view').fadeToggle(300);
          $("#exort-to").show();
      });
      $('.icon-node').on('click', function (event) {
          $('#table-view, #vis').fadeToggle(300);
          $(".icon-node, .icon-tableview ").toggle(100);
      });
      $("#entity-next").click(function () {
          window.location.href = "../entity/";
      });
  
      $("#export-to-select").change(function () {
          $('#table-data').tableExport({
              filename: 'table_%DD%-%MM%-%YY%',
              format: $("#export-to-select").val(),
          });
      });*/
});
function getSiteNamesChart() {
    requestDataFromServer('/lesites/getallsitenames', { type: 'userbased', isOnlyEnabled: true }, "GET").done(function (response) {
        res = JSON.parse(response);
        //console.log('RES--->' + response);
        const deltaCharacterings = Math.random().toString(36).substring(2, 5);
        site_list = res["data"].map(({ sitename }) => sitename);
        //site_list = [site["sitename"] for site in a["data"]]
        //site_list = list(map(lambda x:x["sitename"], res["data"]))
        /*  res['data'].forEach(function (item) {
              site_list.push(item['sitename'])
          })*/
        // console.log('TYPE OF SITE_LIST-->' + typeof(site_list))
        //  console.log('SITE_LIST-->' +(site_list))
        if (res.status == 200) {
            siteResponse = res.data;
            siteResponse.forEach(function (obj) {
              //  console.log("RES--->" + JSON.stringify(obj))
                var tempObjs = {}
                tempObjs['site'] = obj.sitename
                tempObjs['isSuccess'] = true
                tempObjs['isWSConnected'] = false
                tempObjs['criticalNodeCount'] = 0
                sitesData.push(tempObjs)
                makeWebSocConnectionChart(obj.websocket_url, tempObjs['site'], 0, tempObjs['criticalNodeCount'], deltaCharacterings)
            });
        }
    });

}
function searchNodesChart() {

    var input = document.getElementById('tag');
    input.addEventListener("keyup", function (event) {
        if (document.getElementById("vis").style.display == 'block') {
            if (event.keyCode === 13) {
                event.preventDefault();
                var inputValue = $("#tag").val()
                valueLength = inputValue.trim().length;
                if (valueLength < 3)
                    swal("Please enter at least 3 characters", ' ', 'error')
                else {
                    showLoader('node-view')
                    requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": inputValue, "mode": 'name', csrfmiddlewaretoken: csfr_token, selectedSite: entitySelectedsite }, type = "POST").done(searchNodeResponseChart);
                }
            }
        }
    })
}
/*function searchNodeResponseChart(response) {
    stopLoader('node-view')
    var res = response["nodedetails"];
    if (res.status == 200) {
        var len = res.data.length;
        if (len > 0) {
            var data = {};
            data["nodes"] = response["nodedetails"];
            data["relationships"] = "";
            specificNodeDetailsChart(data);
        }
        else {
            swal("Node Doesn't Exists", ' ', 'error')
        }
    }
    else {
        swal("Node Doesn't Exists", 'Search like hostIp(172.16.0.2) or hostIp:serviceName(172.16.0.2:Info)', 'error')
    }
}
function specificNodeDetailsChart(response) {
    if (response == undefined)
        return;
    var responseFromServer = response;
    var nodeResponse = responseFromServer["nodes"]
    if (nodeResponse.status == 200) {
        cyGraph.elements().addClass('semitransp');
        nodeResponse.data.forEach(function (row) {
            var selNode = cyGraph.nodes("[id='" + row[0] + "']")
            selNode.removeClass('semitransp');
            selNode.addClass('highlight')
        })
    }
}*/
/*function onExport(format) {
    var params = {
        type: format,
        tableName: 'Table name'
    };
    $.extend(true, options, params);

    $('#table-data').tableExport(options);
}*/

function getEntityDataChart() {
    showLoader("node-view")
    console.log("getEntityDataChart()--1--->")
    requestDataFromServer("/dashboard/getneo4jnodes", { sitename: ' ' }, type = "GET").done(function (response) {
        console.log("getEntityDataChart()--2--->")
         //console.time("getEntityDataChart");
     //getnewchart();
        //  getnewchart(response);
        // getnewchart().then(function () { fillHostServiceCount(chartdata_list) });
         //getnewchart(response).then(function () { findCountChart(response) });
        // console.timeEnd("getEntityDataChart");

        const deltaCharacter = Math.random().toString(36).substring(2, 5);

        if (response == undefined)
            return;
        entityResponse = response.responseData;

        if (response.responseData.length > 0) {
            response.responseData.forEach(function (obj, index) {
               // console.log("inside-if-getEntityDataChart---->" + JSON.stringify(obj))
                var tempObj = {}
                tempObj['site'] = obj.site
                tempObj['isSuccess'] = true
                tempObj['isWSConnected'] = false
                tempObj['criticalNodeCount'] = 0
                tempObj['nodeCount'] = { "host": { "criticalCount": 0, "okCount": 0, "warningCount": 0, "unknownCount": 0 }, "service": { "criticalCount": 0, "okCount": 0, "warningCount": 0, "unknownCount": 0 } };
                responseFromServer = obj.site_data
                sitesData.push(tempObj)
                var tempSiteObj = siteResponse.filter(x => x.sitename === obj.site)[0]
                makeWebSocConnectionChart(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'], deltaCharacter)
            });

        }
        else {
            stopLoader("node-view")
            $("#node-view #entity-search").css('visibility', 'hidden');
            $("#node-view #vis").css('display', 'none');
            $("#node-view #entity-nodata").css('display', 'block');
            $("#node-view #nodatamessage").text('No Data');
        }
    });
}


var getoverallJSON = async function (url, nameofsite) {

    return await new Promise(function (resolve, reject) {
        var target = url;
        //var target = "../dashboard/getoverallchartdetails";
        //var site_name = params.get("site");
        var site_name = params.get("site");

        var layers = ''
        const data = { sitename: site_name, layer: layers };
        console.time("3-getoverallJSON for --->" + nameofsite + ' ');
        fetch(target + '?' + new URLSearchParams(data), {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                var response = (data['data'])
                //   console.log('DATA--->' + JSON.stringify(response))
                var host_critical = 0;
                var host_warning = 0;
                var host_ok = 0;
                var host_unknown = 0;
                var service_critical = 0;
                var service_warning = 0;
                var service_ok = 0;
                var service_unknown = 0;
                // for (const key in response) {
                for (const [key, value] of Object.entries(response)) {
                    host_critical += value['Host']['0'];
                    host_warning += value['Host']['1'];
                    host_ok += value['Host']['2'];
                    host_unknown += value['Host']['3'];
                    service_critical += value['Service']['0'];
                    service_warning += value['Service']['1'];
                    service_ok += value['Service']['2'];
                    service_unknown += value['Service']['3'];
                }
                chartresponse = { "host": { "CRITICAL": host_critical, "OK": host_ok, "WARNING": host_warning, "UNKNOWN": host_unknown }, "service": { "CRITICAL": service_critical, "OK": service_ok, "WARNING": service_warning, "UNKNOWN": service_unknown } };
                // chartresponse = { "host": { "CRITICAL": 0, "OK": response['Host-count'][0][0] + response['SwitchHost-count'][0][0], "WARNING": 0, "UNKNOWN": 0 }, "service": { "CRITICAL": response['SwCritical-count'][0][0] + response['HostMsdown-count'][0][0] + response['SwitchPort-disconn'][0][0], "OK": response['SwOk-count'][0][0] + response['SwitchPort-conn'][0][0] + response['HostMs-count'][0][0], "WARNING": response['SwWarning-count'][0][0], "UNKNOWN": response['SwUnknown-count'][0][0] + response['HostMsunknown-count'][0][0] + response['SwitchPort-unknown'][0][0] } };
                //   console.log('CHART RESPONSE--->' + JSON.stringify(chartresponse))
                resolve(chartresponse)
                chartresponse.send()

                //  console.log('Success:', data);
            })
            .catch((error) => {
                stopLoader('containerpie-hosts')
                stopLoader('containerpie-services')
                /*document.getElementById('host-heading').style.display = 'block'
                document.getElementById('host-heading').style.width = '30%'
                document.getElementById('host-heading').innerText = 'URL ERROR'
                document.getElementById('service-heading').style.display = 'block'
                document.getElementById('service-heading').style.width = '30%'
                document.getElementById('service-heading').innerText = 'URL ERROR'*/
                //  console.log('Error:', error);
            });
        console.timeEnd("3-getoverallJSON for --->" + nameofsite + ' ');
    });

}

var getchartJSON = async function (url, nameofsite) {
    // console.log(nameofsite + ' URL--->' + url)
    return await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.timeout = 2000; // time in milliseconds
        xhr.onload = function () {
           // console.log('INSIDE LOAD')
            var status = xhr.status;
            if (status == 200) {
               // console.log('INSIDE 200-->' + xhr.response)
                resolve(xhr.response);
            } else {
                (reject(status));
            }
        };
        xhr.onerror = function () {
           // console.log('INSIDE ERROR')
            reject({
                site: nameofsite,
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        //console.log('XHR response-->' + xhr.response)
        xhr.send();
    });
};

async function requestdata(obj) {
    //  console.log('SITENAME===>' + JSON.stringify(obj))
    // var i=0, j = 0;

    return await new Promise(function (resolve, reject) {
        // resolve(requestDataFromServer("../dashboard/getchartspecificdetails", { sitename: obj['site'], layer: "s_sw" }, type = "GET").done(function (data) {
        const target = new URL('getoverallchartdetails', document.location);
        //        const target = new URL('/dashboard/getchartspecificdetails','https://linkedeye-uatifsc.finspot.in');
        const params = new URLSearchParams();
        params.set('sitename', obj['site']);
        params.set('layer', "");
        // params.set('layer', "s_sw");
        target.search = params.toString();
        //  console.log('TARGET FROM REQUEST DATA--->' + target)
        console.time("2-requestdata for --->" + obj['site'] + ' ');
        resolve(getoverallJSON(target, obj['site']).then(function (data) {
            // console.log('returned data--->' + JSON.stringify(data))
            // var response = (data['data'])
            // chartresponse = { "host": { "CRITICAL": 0, "OK": response['Host-count'][0][0] + response['SwitchHost-count'][0][0], "WARNING": 0, "UNKNOWN": 0 }, "service": { "CRITICAL": response['SwCritical-count'][0][0] + response['HostMsdown-count'][0][0] + response['SwitchPort-disconn'][0][0], "OK": response['SwOk-count'][0][0] + response['SwitchPort-conn'][0][0] + response['HostMs-count'][0][0], "WARNING": response['SwWarning-count'][0][0], "UNKNOWN": response['SwUnknown-count'][0][0] + response['HostMsunknown-count'][0][0] + response['SwitchPort-unknown'][0][0] } };

            //  console.log('CHARTRESPONSE--->' + JSON.stringify(chartresponse))
            chartsData.push(data)
            // console.log('CHARTSDATA--->' + JSON.stringify(chartsData))
        }).catch(function (err) {
            //  console.log('CHART ERROR site--->' + err.site + '\nERROR STATUS--->' + err.statusText)
        })
        )
        console.timeEnd("2-requestdata for --->" + obj['site'] + ' ');
    })


}

async function getnewchart() {
    //async function getnewchart(response) {
    //  console.log('getChartData called')
    var p;
    //console.log('GETNEWCHART RESPONSE--->' + JSON.stringify(response))
    // response.responseData.forEach(function (obj) {
    console.time("1-getnewchart ");
    /* var site_list=[]
     for (let index = 0; index < response.responseData.length; index++) {
         site_list[index] = response.responseData[index]['site']
        // p = await requestdata(response.responseData[index])
         //console.log('-- loop-' + (index + 1)+' over --')
         console.log("response.responseData[index]['site']-->"+response.responseData[index]['site'])
     }*/

    var tempObj = {
        'host': { "CRITICAL": 0, "OK": 0, "WARNING": 0, "UNKNOWN": 0 },
        'service': { "CRITICAL": 0, "OK": 0, "WARNING": 0, "UNKNOWN": 0 }
    }
    const target = new URL('getoverallchartdetails', document.location);
   /* await site_list.forEach(site => {
        const data = { sitename: site, layer: '', allsite: 'True' };
        fetch(target + '?' + new URLSearchParams(data), {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {

                console.log('DATA--->' + JSON.stringify(data))
                var data_host = data['data']['host']
                var data_service = data['data']['service']
                tempObj['host'] = { "CRITICAL": tempObj['host']['CRITICAL'] + data_host['CRITICAL'], "OK": tempObj['host']['OK'] + data_host['OK'], "WARNING": tempObj['host']['WARNING'] + data_host['WARNING'], "UNKNOWN": tempObj['host']['UNKNOWN'] + data_host['UNKNOWN'] }
                tempObj['service'] = { "CRITICAL": tempObj['service']['CRITICAL'] + data_service['CRITICAL'], "OK": tempObj['service']['OK'] + data_service['OK'], "WARNING": tempObj['service']['WARNING'] + data_service['WARNING'], "UNKNOWN": tempObj['service']['UNKNOWN'] + data_service['UNKNOWN'] }
                //console.timeEnd(" 4-findCountChart");
                fillHostServiceCount(tempObj)
                console.log('TEMPOBJ--->' + JSON.stringify(tempObj))
                chartdata_list= tempObj
            })
    })*/
    await Promise.all(site_list.map(site => {
        const data = { sitename: site, layer: '', allsite: 'True' };
        return Promise.race([
            fetch(target + '?' + new URLSearchParams(data), {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
           // new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
        ])
            .then((response) => response.json())
            .then((data) => {
                console.log('DATA--->' + JSON.stringify(data))
                var data_host = data['data']['host']
                var data_service = data['data']['service']
                tempObj['host'] = { "CRITICAL": tempObj['host']['CRITICAL'] + data_host['CRITICAL'], "OK": tempObj['host']['OK'] + data_host['OK'], "WARNING": tempObj['host']['WARNING'] + data_host['WARNING'], "UNKNOWN": tempObj['host']['UNKNOWN'] + data_host['UNKNOWN'] }
                tempObj['service'] = { "CRITICAL": tempObj['service']['CRITICAL'] + data_service['CRITICAL'], "OK": tempObj['service']['OK'] + data_service['OK'], "WARNING": tempObj['service']['WARNING'] + data_service['WARNING'], "UNKNOWN": tempObj['service']['UNKNOWN'] + data_service['UNKNOWN'] }
               // console.log('TEMPOBJ--->' + JSON.stringify(tempObj))
                chartdata_list[data.site] =data.data 
            }).catch(error => {
                // Handle any error that occurred during fetch
                console.error('Error during fetch:', error);
            });
    }));

    fillHostServiceCount(tempObj);

    //  console.timeEnd("1-getnewchart ");
}


function fillNodeDetailsChart(response) {
    const deltaCharacter = Math.random().toString(36).substring(2, 5);

    if (response == undefined)
        return;
    entityResponse = response.responseData;

    if (response.responseData.length > 0) {
        response.responseData.forEach(function (obj, index) {
            var tempObj = {}
            //  var deltaCharacter = obj.site
            // console.log("fillNodeDetailsChart-->" + deltaCharacter)
            tempObj['site'] = obj.site
            tempObj['isSuccess'] = true
            tempObj['isWSConnected'] = false
            tempObj['criticalNodeCount'] = 0
            tempObj['nodeCount'] = { "host": { "criticalCount": 0, "okCount": 0, "warningCount": 0, "unknownCount": 0 }, "service": { "criticalCount": 0, "okCount": 0, "warningCount": 0, "unknownCount": 0 } };
            responseFromServer = obj.site_data
            /*if (Object.keys(responseFromServer).length > 0) {
                var nodeResponse = responseFromServer["nodes"]
                if (nodeResponse.status == 200 && nodeResponse.data.length > 0) {
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
                    nodeResponse.data.forEach(function (row) {
                        if (typeof (row[2]) == String && row[2])
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
            }*/
            sitesData.push(tempObj)
            var tempSiteObj = siteResponse.filter(x => x.sitename === obj.site)[0]
            makeWebSocConnectionChart(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'], deltaCharacter)
        });
        sSitehtml = ''
        fSitehtml = ''
        $("#node-view #site-list").empty()
        sitesData.forEach(function (obj, index) {
            if (obj.isSuccess) {
                sSitehtml += '<li class="nav-item success" id="' + obj.site + '_li" style="position: relative;"><span class="indicator-circle" style="background: #ff3d57; z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="nav-link green bold-text" data-id="' + obj.site + '" id="' + obj.site + '" data-toggle="tab" onclick="onEntitySiteTabchange(\'' + obj.site + '\')">' + obj.site + '</a></li>'
            }
            else
                fSitehtml += '<li class="nav-item failure" id="' + obj.site + '_li" style="position: relative;"><span class="indicator-circle" style="background: #ff3d57; z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="nav-link red bold-text" data-id="' + obj.site + '"  id="' + obj.site + '" data-toggle="tab" onclick="onEntitySiteTabchange(\'' + obj.site + '\')">' + obj.site + '</a></li>'

        });
        $("#node-view #site-list").append(fSitehtml);
        $("#node-view #site-list").append(sSitehtml);
        if ($("#node-view #site-list li a").eq(0).data()) {
            entitySelectedsite = $("#node-view #site-list li a").eq(0).data().id
        }
        // $("#node-view #site-list #" + entitySelectedsite).addClass('active');
        var obj = entityResponse.filter(x => x.site === entitySelectedsite)[0]
        stopLoader("node-view")
        //  displayNodesChart(obj.site_data, obj.code)
    }
    else {
        stopLoader("node-view")
        $("#node-view #entity-search").css('visibility', 'hidden');
        $("#node-view #vis").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        $("#node-view #nodatamessage").text('No Data');
    }
    if (pageName === "Dashboard") {
        var tempSiteObj = siteResponse.filter(x => x.sitename === entitySelectedsite)[0]
        // onTicketSiteTabchange(entitySelectedsite, tempSiteObj)
        //  findCountChart()
    }
}
function displayNodesChart(data, responseCode) {
    if (Object.keys(data).length > 0 && data["nodes"] && data["nodes"].data.length > 0) {
        $("#node-view #entity-search").css('visibility', 'visible');
        $("#node-view #vis").css('display', 'block');
        $("#node-view #entity-nodata").css('display', 'none');
        var obj = sitesData.filter(x => x.site === entitySelectedsite)[0]
        responseFromServer = data;
        var nodesData = [];
        var edgesData = [];
        var tempLabel = "";
        var nodeSize = 0;
        sortedJson = {};
        var nodeResponse = responseFromServer["nodes"]
        var criticalStatusCount = 0;
        var okStatusCount = 0;
        var pendingStatusCount = 0;
        var warningStatusCount = 0;
        var unknownStatusCount = 0;
        if (nodeResponse.status == 200) {
            $("#total-nodes").html("Nodes (" + nodeResponse.data.length + ")");
            nodeResponse.data.forEach(function (row) {
                if (row[2])
                    var state = row[2].toUpperCase()
                else
                    var state = row[2]
                if (state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING") {
                    criticalStatusCount += 1;
                }
                if (state == "" || state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP") {
                    okStatusCount += 1;
                }
                if (state === "PENDING") {
                    pendingStatusCount += 1;
                }
                if (state === "WARNING") {
                    warningStatusCount += 1;
                }
                if (state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED") {
                    unknownStatusCount += 1;
                }
                var color = getColorForNodeState(row[2]);
                nodeSize = getSizeForNode(row[4])
                var label = row[1];
                if (row[4] == "Host" || row[4].startsWith('Node')) {
                    tempLabel = label;

                    if (sortedJson[label] === undefined) {
                        sortedJson[label] = { "host": "", "services": [], "hostms": [] };
                    }
                    sortedJson[label]["host"] = row;
                }
                else {
                    var tempIdArray = label.split(":");
                    if (sortedJson[tempIdArray[0]] === undefined) {
                        sortedJson[tempIdArray[0]] = { "host": "", "services": [], "hostms": [] };
                    }
                    if (row[4] == "HostMS" || row[4] == "ServiceMS") {
                        if (row[4] == "ServiceMS") {
                            tempLabel = tempIdArray[2];

                            if (sortedJson[tempIdArray[0]][tempIdArray[1]] === undefined) {
                                sortedJson[tempIdArray[0]][tempIdArray[1]] = [];
                            }
                            sortedJson[tempIdArray[0]][tempIdArray[1]].push(row);
                        }
                        else {
                            tempLabel = tempIdArray[1];
                            sortedJson[tempIdArray[0]]["hostms"].push(row);
                        }
                    }
                    if (row[4] == "Service" || row[4].startsWith('Pod')) {
                        tempLabel = tempIdArray[1];
                        sortedJson[tempIdArray[0]]["services"].push(row);
                    }
                    if (row[4] != "Host" && row[4] != "HostMS" && row[4] != "Service" && row[4] != "ServiceMS") {
                        tempLabel = tempIdArray[1] ? tempIdArray[1] : tempIdArray[0];
                    }
                }

                var dashboardenabled = "true";
                if (row[8] === null) {
                    dashboardenabled = "true";
                }
                var node = { data: { id: row[0], fullname: label, dashboardenabled: dashboardenabled, dashboard_url: row[8], text: tempLabel, image: image_path + row[5], color: color, size: nodeSize } };
                nodesData.push(node);

                titleToId[label] = row[0];
            });
        }


        if (criticalStatusCount == 0) {
            obj.isSuccess = true
            $('#pills-critical-tab').attr('onclick', ' ');
            $("#pills-critical-tab").html("Critical (" + criticalStatusCount + ")");
        }
        else {
            obj.isSuccess = false
            var classList = $("#" + entitySelectedsite + "_li").attr('class')
            if (classList.includes("failure") == false) {
                $("#node-view #" + client.id + "_li").removeClass("success");
                $("#node-view #" + client.id + "_li").addClass("failure");
                $("#node-view #" + client.id + "_li .nav-link").removeClass("green");
                $("#node-view #" + client.id + "_li .nav-link").addClass("red");
            }
            $("#pills-critical-tab").html('<span class="bold-text red">Critical(' + criticalStatusCount + ')</span>');
        }
        if (okStatusCount == 0) {
            $('#pills-ok-tab').attr('onclick', ' ');
            $("#pills-ok-tab").html("Ok (" + okStatusCount + ")");
        }
        else
            $("#pills-ok-tab").html('<span class="bold-text green">Ok(' + okStatusCount + ')</span>');

        if (pendingStatusCount == 0) {
            $('#pills-pending-tab').attr('onclick', ' ');
            $("#pills-pending-tab").html("Pending (" + pendingStatusCount + ")");
        }
        else
            $("#pills-pending-tab").html('<span class="bold-text pending-text">Pending(' + pendingStatusCount + ')</span>');

        if (warningStatusCount == 0) {
            $('#pills-warning-tab').attr('onclick', ' ');
            $("#pills-warning-tab").html("Warning (" + warningStatusCount + ")");
        }
        else
            $("#pills-warning-tab").html('<span class="bold-text warning">Warning(' + warningStatusCount + ')</span>');
        if (unknownStatusCount == 0) {
            $('#pills-unknown-tab').attr('onclick', ' ');
            $("#pills-unknown-tab").html("Unknown (" + unknownStatusCount + ")");
        }
        else
            $("#pills-unknown-tab").html('<span class="bold-text unknown">Unknown(' + unknownStatusCount + ')</span>');
        var relationResponse = responseFromServer["relationships"]
        if (relationResponse.status == 200) {
            relationResponse.data.forEach(function (row) {
                var edge = { data: { source: row[0], target: row[1], id: "id_" + row[0] + row[1], label: row[2] } };
                edgesData.push(edge);
            });
        }
        createGraphChart(nodesData, edgesData);
    }
    else {
        $("#node-view #entity-search").css('visibility', 'hidden');
        $("#node-view #vis").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        if (responseCode == 200)
            $("#entity-nodata #nodatamessage").text('No Data');
        else
            $("#entity-nodata #nodatamessage").text('Entity server not reachable.');
    }
}

function displayTableChart() {
    $("#table-data").empty();
    var html = "";
    html += '<thead class="table-head border-t">';
    html += '<tr>';
    html += '<th>IP Address</th>';
    html += '<th>Service</th>';
    html += '<th>Last Update</th>';
    html += '<th>Status</th>';
    html += '<th>Message</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody class="accordion list" id="accordionExample">';
    $.each(sortedJson, function (key, val) {
        var finalHtml = "";
        var hostRowSpan = val.hostms.length + val.services.length;
        var serviceRowSpan = 0;

        var hostHtml = "";
        hostHtml += "<tr>";
        hostHtml += "<td class = 'ip' rowspan='" + rowSpan + "'>" + val.host[7] + "</td>";
        hostHtml += "<td style='border-left: 1px solid #eee;'>Server</td>";
        hostHtml += "<td >" + getFormatedDate(val.host[6]) + "</td>";
        var status = getColorForNodeState(val.host[2]);
        var statusText = val.host[2] == "" ? 'OK' : val.host[2]
        hostHtml += "<td ><span class='white-text py-1 px-2 size12 radius-8 status' style='background:" + status + "'>" + statusText + "</span></td>";
        hostHtml += "<td >" + val.host[3] + "</td>";
        hostHtml += "</tr>";
        var serviceHtml = "";
        if (val.services.length > 0) {
            $.each(val.services, function (index, row) {
                serviceHtml += "<tr>";

                serviceHtml += "<td class = 'ip'> </td>";

                serviceHtml += "<td style='border-left: 1px solid #eee;' class='service'>" + row[1].split(":")[1] + "</td>";
                serviceHtml += "<td >" + row[6] + "</td>";
                var status = getColorForNodeState(row[2]);
                var statusText = row[2] == "" ? 'OK' : row[2]
                serviceHtml += "<td ><span class='white-text py-1 px-2 size12 radius-8 status' style='background:" + status + "'>" + statusText + "</span></td>";
                serviceHtml += "<td >" + row[3] + "</td>";
                serviceHtml += "</tr>";
            });
        }

        var rowSpan = hostRowSpan + serviceRowSpan + 1;
        // html += "<tr>";
        // html +=     "<td class = 'ip' rowspan='"+rowSpan+"'>"+val.host[7]+"</td>";
        // html +=     "<td style='border-left: 1px solid #eee;'>Server</td>";
        // html +=     "<td >"+getFormatedDate(val.host[6])+"</td>";
        // var status = getColorForNodeState(val.host[2]);
        // var statusText = val.host[2] ==  "" ? 'OK' : val.host[2]
        // html +=     "<td ><span class='white-text py-1 px-2 size12 radius-8 status' style='background:"+status+"'>"+statusText+"</span></td>";
        // html +=     "<td >"+val.host[3]+"</td>";
        // html += "</tr>";
        var hostmsHtml = "";
        $.each(val.hostms, function (index, row) {
            hostmsHtml += "<tr>";
            hostmsHtml += "<td class = 'ip'> </td>";
            hostmsHtml += "<td style='border-left: 1px solid #eee;' class='service'>" + row[1].split(":")[1] + "</td>";
            hostmsHtml += "<td >" + getFormatedDate(row[6]) + "</td>";
            var status = getColorForNodeState(row[2]);
            var statusText = row[2] == "" ? 'OK' : row[2]
            hostmsHtml += "<td ><span class='white-text py-1 px-2 size12 radius-8 status' style='background:" + status + "'>" + statusText + "</span></td>";
            hostmsHtml += "<td >" + row[3] + "</td>";
            hostmsHtml += "</tr>";
        });
        finalHtml = hostHtml + serviceHtml + hostmsHtml
        html += finalHtml;
    });
    html = html + '</tbody>';
    $("#table-data").append(html);
    let options = {
        valueNames: [
            'service',
            'ip',
            'status'
        ]
    };
    nodeList = new List('node-view', options);
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
function findCountChart(response) {
    var hCriticalStatusCount = 0;
    var hOkStatusCount = 0
    //  var hPendingStatusCount = 0
    var hWarningStatusCount = 0
    var hUnknownStatusCount = 0
    var sCriticalStatusCount = 0;
    var sOkStatusCount = 0
    // var sPendingStatusCount = 0
    var sWarningStatusCount = 0
    var sUnknownStatusCount = 0
    //  console.log('chartsData---->' + JSON.stringify(chartsData))
    console.time(" 4-findCountChart");
    chartsData.forEach(function (data) {
        /* if (row['nodeCount'] == undefined) {
             return
         }
         var data = row['nodeCount']*/
        hCriticalStatusCount = hCriticalStatusCount + data['host']['CRITICAL']
        hOkStatusCount = hOkStatusCount + data['host']['OK']
        //  hPendingStatusCount = hPendingStatusCount + data['host']['PENDING']
        hWarningStatusCount = hWarningStatusCount + data['host']['WARNING']
        hUnknownStatusCount = hUnknownStatusCount + data['host']['UNKNOWN']

        sCriticalStatusCount = sCriticalStatusCount + data['service']['CRITICAL']
        sOkStatusCount = sOkStatusCount + data['service']['OK']
        // sPendingStatusCount = sPendingStatusCount + data['service']['PENDING']
        sWarningStatusCount = sWarningStatusCount + data['service']['WARNING']
        sUnknownStatusCount = sUnknownStatusCount + data['service']['UNKNOWN']
    })
    var tempObj = {}
    tempObj['host'] = { "CRITICAL": hCriticalStatusCount, "OK": hOkStatusCount, "WARNING": hWarningStatusCount, "UNKNOWN": hUnknownStatusCount }
    tempObj['service'] = { "CRITICAL": sCriticalStatusCount, "OK": sOkStatusCount, "WARNING": sWarningStatusCount, "UNKNOWN": sUnknownStatusCount }
    //  console.log('TEMP OBJ====>' + JSON.stringify(tempObj))
    console.timeEnd(" 4-findCountChart");
    fillHostServiceCount(tempObj)
    fillNodeDetailsChart(response);

}

function createGraphChart(nodes, edges) {
    $("#vis").empty();
    cyGraph = cytoscape(
        {
            container: document.getElementById('vis'),
            boxSelectionEnabled: false,
            autounselectify: false,
            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'font-size': '8',
                    'width': 'data(size)',
                    'height': 'data(size)',
                    'background-fit': 'cover',
                    'background-color': 'data(color)',
                    'border-width': 1,
                    'border-opacity': 0.5,
                    'border-color': 'data(color)',
                    'background-image': 'data(image)',
                    'color': 'data(color)'
                })

                .selector('edge')
                .css({
                    'curve-style': 'bezier',
                    'width': 0.5,
                    'target-arrow-shape': 'vee',
                    'line-color': '#aeaeae',
                    'target-arrow-color': '#aeaeae'
                })
                .selector('node.highlight').css({ 'border-width': '3', 'font-size': '20' })
                .selector('node.semitransp').css({ 'opacity': '0.5', 'border-width': '1', 'font-size': '8' })
                .selector('edge.highlight').css({ 'width': '1.5', "label": "data(label)", "text-rotation": "autorotate", 'text-margin-y': '-10px', 'font-size': '10' })
                .selector('edge.semitransp').css({ 'opacity': '0.2', 'width': '0.5' })
                .selector('node.hasLabel').css({ 'label': "data(text)" }),

            elements:
            {
                nodes: nodes,
                edges: edges
            },

            layout: graphLayout,

        });
    cyGraph.on('tap', 'node', function (e) {
        var neigh = e.target;
        cyGraph.elements().difference(neigh.outgoers().union(neigh.incomers())).not(neigh).addClass('semitransp');
        neigh.addClass('highlight').outgoers().addClass('highlight');
        neigh.addClass('highlight').incomers().addClass('highlight');
        var color = neigh[0]["_private"]["data"]["color"]
        neigh.connectedEdges().style({ 'line-color': color, 'target-arrow-color': color, 'color': color });
    });
    cyGraph.on('click', function (e) {
        cyGraph.elements().removeClass('semitransp');
        cyGraph.elements().removeClass('highlight');
        cyGraph.elements().style({ 'line-color': '#aeaeae', 'target-arrow-color': '#aeaeae' });
    });
    cyGraph.on('zoom', function (event) {
        if (cyGraph.zoom() > 1)
            cyGraph.elements().nodes().addClass('hasLabel')
        else if (cyGraph.zoom() < 1)
            cyGraph.elements().nodes().removeClass('hasLabel')
    });
    cyGraph.cxtmenu(
        {
            menuRadius: 75,
            indicatorSize: 0,
            selector: 'node[dashboardenabled="true"]',
            commands:
                [
                    {
                        content: '<span class="fa fa-2x"><i class="icon-analysis text-white"></i></span>',
                        select: function (ele) {
                            opendashboarsuperset(ele.id(), ele.data('dashboard_url'));
                        },
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-downtime text-white"></i></span>',
                        select: function (ele) {
                        }
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-health text-white"></i></span>',
                        select: function (ele) {
                            openNagiosGraph(ele.id(), ele.data('fullname'));
                        },
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-help text-white"></i></span>',
                        select: function (ele) {
                            openNav(ele.id(), entitySelectedsite);
                        }
                    }
                ]
        });

    cyGraph.cxtmenu(
        {
            selector: 'node[dashboardenabled="false"]',
            commands:
                [
                    {
                        content: '<span class="fa fa-2x"><i class="icon-analysis text-white"></i></span>',
                        enabled: false
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-downtime text-white"></i></span>',
                        select: function (ele) {
                        }
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-health text-white"></i></span>',
                        select: function (ele) {
                            openNagiosGraph(ele.id(), ele.data('fullname'));
                        },
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-help text-white"></i></span>',
                        select: function (ele) {
                            openNav(ele.id(), entitySelectedsite);
                        }
                    }
                ]
        });

    // makeStompConnection();
    // if(wsConnected == false)
    // makeWebSocConnection(websocketurl)
}

function setAnimChart(nodeid) {
    if (nodeid != undefined) {
        var delay = 250;
        var duration = 600;
        cyGraph.nodes("[id*=" + nodeid + "]")
            .animate({ 'style': { 'opacity': 0.8 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 0.2 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 0.2 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 0.2 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 0.2 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 0.2 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 1 } }, { 'duration': duration });
    }
}

function delclose(ip) {
    //console.log('mapobj--->' + ip)
    // console.log("map-websocketurl-->" + typeof (mapobj))
    // console.log('mapobj--->' + mapobj["id"])
    //  console.log('mapobj--->' + JSON.stringify(mapobj))
    // console.log('mapobj--->' + JSON.stringify(mapobj.toString()))
    isToBeConnect = !{}[true];
    delobj[ip].disconnect();
}

function delconnect(ip) {
    //  console.log('mapobj--->' + mapobj)
    // console.log('mapobj-id-->' + mapobj["id"])
    // console.log('mapobj--->' + JSON.stringify(mapobj))
    isToBeConnect = {}[true];
    //  makeWebSocConnection(delobj[ip].ws.url, delobj[ip].id, 0)
    makeWebSocConnectionChart(delobj[ip].ws.url, delobj[ip].id, 0, delobj[ip].criticalNodeCount)
}

function displaytooldetip(wsname, sname) {
    console.log("close-map-delta--->")
    const tooltip = document.getElementById(sname);
    const wrapper = document.getElementById(wsname);

    if (tooltip.classList.contains('shown')) {
        // If the tooltip is already shown, close it
        tooltip.classList.remove('shown');
        wrapper.classList.remove('border-clr');
    } else {
        // Close all other tooltips
        closeAllTooltips(tooltip);

        // Open the clicked tooltip
        tooltip.classList.add('shown');
        wrapper.classList.add('border-clr');
    }
}
/*function displaytooldetip(wsname, sname) {
    console.log("dash-delta---->")
    if (document.getElementById(sname).classList.contains('shown')) {
        document.getElementById(wsname).classList.remove('border-clr')
        document.getElementById(sname).classList.remove('shown')
    } else {
        document.getElementById(wsname).classList.add('border-clr')
        document.getElementById(sname).classList.add('shown')
    }
}*/

var esitesname = 'sitesname'
var ewsocname = 'entity-pipe'
var deltahtml = '<div class="indicator" id="entity-pipe"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="delta-icon-chats" style="font-size:27px" onclick="displaytooldetip(\''+ ewsocname + '\',\'' + esitesname + '\')"> \
                        <span class="tooltiptext" id="sitesname" style="overflow-y:scroll">\
                        <p><b>Queue Name :</b> delta_update</p> \
                        <p id="last-conn"></p></span> \
                    </i> \
                    </div>'
$('#delta-html').empty()
$("#delta-html").append(deltahtml);
var alldeltatrue = {};
var sitenumber = 0;
function makeWebSocConnectionChart(websocketurl, wsitename, tries, nodeCount, deltavalue) {
    var deltaclient = 'dclient' + (deltavalue)
    // console.log("makeWebSocConnectionChart---->" + wsitename)
    // console.log("deltaclient---->" + deltaclient)


    try {
        if (window.WebSocket) {
            var destination = "/exchange/delta_update";
            deltaclient = Stomp.client(websocketurl);
            // var wsobjname = new WebSocket(websocketurl);
            // var dclient = Stomp.over(wsobjname);
            deltaclient.id = wsitename
            deltaclient.connectionTries = tries;
            deltaclient.criticalNodeCount = nodeCount;
            delobj[wsitename] = deltaclient
            var existingElement = document.getElementById(wsitename);
            if (existingElement == null) {
                var diconhtml = '';
                diconhtml += '<div class="row tooltiping">';
                diconhtml += '<table>';
                diconhtml += '<thead></thead>';
                diconhtml += '<tbody class="row">';
                diconhtml += '<tr class="col-12" id=' + wsitename + '>';
                diconhtml += '<td class="col-8 details_td" >' + wsitename + '</td>';
                diconhtml += '<td class="col-4 details_ts" id="e_' + wsitename + 'status-conn"></td>';
                diconhtml += '</tr>';
                diconhtml += '</tbody>';
                diconhtml += '</table>';
                diconhtml += ' <p class="tooltiptexting" id="' + wsitename + 'last-conn"></p>';
                diconhtml += '<p class="col-3 ok-close-btn" id="displays-icon' + wsitename + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')"></i><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')"></i></p>';
                diconhtml += '</div>';

                $('#sitesname').append(diconhtml);
                alldeltatrue[wsitename] = 0;
                sitenumber++;
               // console.log("sitesname--sitesname--->" + diconhtml);
            }

            /*if (document.getElementById('e_' + wsitename) == null) {
                var diconhtml = ''
                diconhtml += '<div class="row tooltiping">'
                diconhtml += '<table>';
                diconhtml += '<thead></thead>';
                diconhtml += '<tbody class="row">';
                diconhtml += '<tr class="col-12" id='+wsitename+'>';
                diconhtml += '<td class="col-8 details_td" >' + wsitename + '</td>';
                diconhtml += '<td class="col-4 details_ts" id="e_'  + wsitename + 'status-conn" ></td>';
                diconhtml += '</tr>';
                diconhtml += '</tbody>';
                diconhtml += '</table>';
                diconhtml += ' <p class="tooltiptexting" id="' + wsitename + 'last-conn"></p>'
                //iconhtml += '<p class="col-9" style="color:#ffffff" id="' + wsitename + '"></p>'
                diconhtml += '<p class="col-3 ok-close-btn" id="displays-icon' + wsitename + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                diconhtml += '</div>'

                $('#sitesname').append(diconhtml)
                alldeltatrue[wsitename] = 0
                sitenumber++;
                console.log("sitesname--sitesname--->" + diconhtml)
            }*/

            var on_conn = function () {
                wsConnected = true;
                isToBeConnect = {}[true];
                var obj = sitesData.filter(x => x.site === deltaclient.id)[0]
                //console.log("sitesData-obj--->" + JSON.stringify(obj))
                obj.isWSConnected = true;
                // deltaclient.connectionTries = 0;
                document.getElementById('e_' +wsitename + 'status-conn').innerText = 'True(0)'
               // document.getElementById('e_' + wsitename).innerText = wsitename + ': True(0)'

                document.getElementById('e_' + wsitename + 'status-conn').style.color = "#16d39a";

                document.getElementById('delta-icon-chats').className = 'mdi mdi-check-network-outline tooltip'
                //   document.getElementById('map-pipe').style.color = '#16d39a'
                $("#displays-icon" + wsitename).css('display', 'none');
                alldeltatrue[wsitename] = 1
                // document.getElementById('conn-tries').innerText = "Reconnect :  0 "
                document.getElementById(wsitename + 'last-conn').innerText = "Lastconnect : " + mdeltalastreconnect
                var getnum = Object.values(alldeltatrue)
                var getSum = getnum.reduce(function (a, b) { return a + b; })
                // console.log('GETSUM--->>' + getSum)
                if (sitenum == getSum) {
                    document.getElementById('entity-pipe').style.color = '#16d39a'
                } else {
                    document.getElementById('entity-pipe').style.color = '#ff3d57'
                }

                //mde callback function
                deltaclient.subscribe(destination, function (message) {
                   // console.log("delta websocket called")
                    var tempJson = JSON.parse(message.body);
                //getnewchart();
                    var monitorStatus = tempJson.monitor_status;
                    if (monitorStatus === "CRITICAL" || monitorStatus === "DOWN" || monitorStatus === "UNREACHABLE" || monitorStatus === "FALSE" || monitorStatus === "WAITING") {
                        // console.log("if delta")
                        deltaclient.criticalNodeCount++;
                    }
                    else {
                        deltaclient.criticalNodeCount--;
                    }
                    if (deltaclient.id == entitySelectedsite) {
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
                        nodeSpecificDetailsChart(id, tempJson.title)
                    }
                    if (tempJson.host !== undefined) {
                        var tempObj = {}
                        tempObj['host'] = nodeStatus(Object.keys(tempJson.host).map((key) => [key, Number(tempJson.host[key])]));
                        tempObj['service'] = nodeStatus(Object.keys(tempJson.service).map((key) => [key, Number(tempJson.service[key])]));
                        obj.nodeCount = tempObj;
                        // if (pageName === "Dashboard")
                        //  findCountChart()

                    }
                    changeSiteStatusChart(deltaclient.id, deltaclient.criticalNodeCount)
                });

                $("#node-view #" + deltaclient.id + "-indicator").css('background', '#16d39a')
            }
            var on_err = function (error) {
                //  console.log("else delta")
                $("#node-view #" + deltaclient.id + "-indicator").css('background', '#ff3d57')
                isToBeConnect = !{}[true];
                var obj = sitesData.filter(x => x.site === deltaclient.id)[0]
                /*$("#snackbars").fadeIn("slow");
                $('#snackbars').text('Please Refresh Your Page..');
                snackbars.className = "error_show";*/

                deltaclient.connectionTries++;
                const timestamp = new Date;
                const date = new Date(timestamp);
                var month = date.getMonth() + 1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();
                var hour = date.getHours();
                var mins = date.getMinutes();
                var sec = date.getSeconds();
                var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                mdeltalastreconnect = formattedDate.toLocaleString();

                document.getElementById('e_' + wsitename + 'status-conn').innerText = 'False(' + deltaclient.connectionTries + ')'
                //document.getElementById('e_' + wsitename).innerText = wsitename + ': False(' + deltaclient.connectionTries + ')'
                document.getElementById('e_' + wsitename + 'status-conn').style.color = "#ff3d57";

                document.getElementById('delta-icon-chats').className = 'mdi mdi-close-network-outline tooltip'
                $("#displays-icon" + wsitename).css('display', 'block');
                //   document.getElementById('map-pipe').style.color = '#16d39a'
                alldeltatrue[wsitename] = 0
                // document.getElementById('conn-tries').innerText = "Reconnect : " + deltaclient.connectionTries
                document.getElementById(wsitename + 'last-conn').innerText = "Lastconnect : " + mdeltalastreconnect
                var getnum = Object.values(alldeltatrue)
                var getSum = getnum.reduce(function (a, b) { return a + b; })
                //console.log('GETSUM--->>' + getSum)
                if (sitenum == getSum) {
                    document.getElementById('entity-pipe').style.color = '#16d39a'
                } else {
                    document.getElementById('entity-pipe').style.color = '#ff3d57'
                }
                obj.isWSConnected = false;
                if (networkStatus === 'online') {
                    if (deltaclient.connectionTries >= 10) {
                        isToBeConnect = !{}[true];
                        // location.reload();
                        /* swal({
                             title: "Want to get chart updates?",
                             text: "Not able to connect web socket of \"" + deltaclient.id + "\". Please Refresh Your Page!.",
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
                                     makeWebSocConnectionChart(deltaclient.ws.url, deltaclient.id, 0, deltaclient.criticalNodeCount)
                                     //  location.reload();
                                 } else {
                                     isToBeConnect = !{}[true];
                                     deltaclient.disconnect();
                                   //  $("#node-view #" + deltaclient.id + "-indicator").css('background', '#ff3d57')
                                 }
                             });*/
                    }
                    else {
                        // deltaclient.connectionTries++;
                        const timestamp = new Date;
                        const date = new Date(timestamp);
                        var month = date.getMonth() + 1;//months (0-11)
                        var day = date.getDate();//day (1-31)
                        var year = date.getFullYear();
                        var hour = date.getHours();
                        var mins = date.getMinutes();
                        var sec = date.getSeconds();
                        var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                        mdeltalastreconnect = formattedDate.toLocaleString();
                        // console.log("tries delta")
                        //$("#snackbars").fadeOut();

                        document.getElementById('e_' + wsitename + 'status-conn').innerText = 'Trying(' + deltaclient.connectionTries + ')'
                        //document.getElementById('e_' + wsitename).innerText = wsitename + ': Trying(' + deltaclient.connectionTries + ')'

                        document.getElementById('e_' + wsitename + 'status-conn').style.color = "#e99123";

                        document.getElementById('delta-icon-chats').className = 'mdi mdi-help-network-outline tooltip'
                        //   document.getElementById('map-pipe').style.color = '#16d39a'
                        alldeltatrue[wsitename] = 0
                        // document.getElementById('conn-tries').innerText = "Reconnect : " + deltaclient.connectionTries
                        document.getElementById(wsitename + 'last-conn').innerText = "Lastconnect : " + mdeltalastreconnect
                        $("#displays-icon" + wsitename).css('display', 'block');
                        var getnum = Object.values(alldeltatrue)
                        var getSum = getnum.reduce(function (a, b) { return a + b; })
                        //   console.log('GETSUM--->>' + getSum)
                        if (sitenum == getSum) {
                            document.getElementById('entity-pipe').style.color = '#16d39a'
                        } else {
                            document.getElementById('entity-pipe').style.color = '#e99123'
                        }
                        if (isToBeConnect = {}[true]) {
                            makeWebSocConnectionChart(deltaclient.ws.url, deltaclient.id, deltaclient.connectionTries, deltaclient.criticalNodeCount)
                        }
                    }
                }
            };
            deltaclient.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}

function nodeSpecificDetailsChart(nodeId, title) {
    if ($("#node-detail").css('display') != 'none') {
        nodeTitle = $("#node-name").text();
        if (nodeId != undefined && nodeTitle == title) {
            showLoader('node-detail')
            requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": nodeId, "mode": '', csrfmiddlewaretoken: csfr_token, selectedSite: entitySelectedsite }, type = "POST").done(nodespecificdetialsresponse);
        }
    }
}
function changeSiteStatusChart(site, count) {
    var obj = sitesData.filter(x => x.site === site)[0]
    if (obj) {
        obj.criticalNodeCount = count;
        if (count == 0) {
            obj.isSuccess = true
            $("#node-view #site-list #" + site + '_li').removeClass("failure").addClass('success')
            $("#node-view #site-list #" + site + '_li a').removeClass("red").addClass('green')
        }
        else {
            obj.isSuccess = false
            $("#node-view #site-list #" + site + '_li').removeClass("success").addClass('failure')
            $("#node-view #site-list #" + site + '_li a').removeClass("green").addClass('red')
        }
    }
}
function reloadgraph(screen) {
    /*if(screen == "full")
    {
        cyGraph.viewport(
        {
            zoom: 2,
            pan: { x: 0, y: 0 }
        });
    }
    else
    {
        cyGraph.viewport(
        {
            zoom: 0.5,
            pan: { x: 0, y: 0 }
        });
    }*/
}

function increasedecreasezoom(increase) {
    if (increase == 1)
        zoom++;
    else
        zoom--;
    cyGraph.viewport(
        {
            zoom: zoom
        });
}

function entity() {
    window.location.href = window.location.origin + '/entity/'
}
/*function statusFunction(select) {
    isCalledStompCon = false;
    var statusType = $(select).attr("aria-controls");
    if (statusType === "pills-all") {
        startEntityLoader()
        requestDataFromServer("../dashboard/getneo4jnodes", { sitename: entitySelectedsite }, type ="GET").done(function (response) {
            stopEntityLoader()
            displayNodesChart(response.responseData[0].site_data, response.responseData[0].code)
        });
    }
    else {
        showLoader('node-view')
        requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": statusType, "mode": '', csrfmiddlewaretoken: csfr_token, selectedSite: entitySelectedsite }, type = "POST").done(searchNodeResponseChart);
    }
}*/
function onEntitySiteTabchange(sitename) {
    const deltaCharacters = Math.random().toString(36).substring(2, 5);
    startEntityLoader()
    entitySelectedsite = sitename;
    $('#node-view #site-list li a.active').removeClass('active');
    $('#node-view #site-list #' + sitename + '_li ' + 'a').addClass('active');
    var tempSiteObj = sitesData.filter(x => x.site === sitename)[0]
    var criticalNodeCount = tempSiteObj.criticalNodeCount;
    if (tempSiteObj.isWSConnected == false) {
        tempSiteObj = siteResponse.filter(x => x.sitename === sitename)[0]
        makeWebSocConnectionChart(tempSiteObj.websocket_url, sitename, 0, criticalNodeCount, deltaCharacters)
    }
    $("#vis").empty();
    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: sitename }, type = "GET").done(function (response) {
        stopEntityLoader()
        displayNodesChart(response.responseData[0].site_data, response.responseData[0].code)
    });
    onTicketSiteTabchange(sitename, tempSiteObj) //Ticket site tab change
}
function startEntityLoader() {
    $('#node-view #entity-nodata').css("display", "none")
    $('#node-view #vis').css("display", "none")
    showLoader("node-view")
}
function stopEntityLoader() {
    $('#node-view #entity-nodata').css("display", "block")
    $('#node-view #vis').css("display", "block")
    stopLoader("node-view")
}