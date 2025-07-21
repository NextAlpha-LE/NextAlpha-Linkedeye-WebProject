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
var graphLayout = {
    name: 'cose',
    directed: true,
    padding: 10,
    animate: false,
    fit: true,
    nodeOverlap: 5000,
}
var sitesData = [];
entitySelectedsite = ' '
var siteResponse;
var entityResponse;
var sortedJson = {};
var nodeList;
$(document).ready(function()
{
    getEntityDatasites();
    getSiteNamessites();
    searchNodessites();

    if(pageName === "Dashboard")
    {
        $(".table-node").hide();
        $("#entity-heading").html("Entities");
    }
    else
    {
        $("#entity-next").hide();
        $("#change-col3-size").removeClass("col-lg-3");
        $("#change-col3-size").addClass("col-lg-4");
        $("#change-col7-size").removeClass("col-lg-7");
        $("#change-col7-size").addClass("col-lg-8");
    }

    $('#table-view').hide();
    $(".icon-node").hide();
    $('.icon-tableview').on('click', function (event)
    {
        $(".icon-tableview ,.icon-node").toggle(100 );
        displayTablesites()
        $('#vis, #table-view').fadeToggle(300);
        $("#exort-to").show();
    });
    $('.icon-node').on('click', function (event)
    {
        $('#table-view, #vis').fadeToggle(300);
        $(".icon-node, .icon-tableview ").toggle(100);
    });
    $("#entity-next").click(function()
    {
        window.location.href = "../entity/";
    });

    $("#export-to-select").change(function () {
        $('#table-data').tableExport({
            filename: 'table_%DD%-%MM%-%YY%',
            format: $("#export-to-select").val(),
        });
    });

});
function getSiteNamessites()
{
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if(res.status == 200)
        {
            siteResponse = res.data;
        }
    });
    
}
function searchNodessites()
{
    
    var input = document.getElementById('tag');
    input.addEventListener("keyup", function(event)
    {
        if(document.getElementById("vis").style.display == 'block')
        {
            if(event.keyCode === 13) {
                event.preventDefault();
                var inputValue = $("#tag").val()
                valueLength = inputValue.trim().length;
                if(valueLength < 3)
                    swal("Please enter at least 3 characters", ' ', 'error')
                else
                {
                    showLoader('node-view')
                    requestDataFromServer("../dashboard/getnodespecificdetails", {"nodeid":inputValue, "mode":'name', csrfmiddlewaretoken: csfr_token,selectedSite: entitySelectedsite}, type="POST").done(searchNodeResponsesites);
                }
            }
        }
    })
}
function searchNodeResponsesites(response)
{
    stopLoader('node-view')
    var res = response["nodedetails"];
    if(res.status == 200)
    {
        var len = res.data.length;
        if(len > 0)
        {
            var data = {};
            data["nodes"] = response["nodedetails"];
            data["relationships"] = "";
            specificNodeDetailssites(data);
        }
        else
        {
            swal("Node Doesn't Exists", ' ', 'error')
        }
    }
    else
    {
        swal("Node Doesn't Exists", 'Search like hostIp(172.16.0.2) or hostIp:serviceName(172.16.0.2:Info)', 'error')
    }
}
function specificNodeDetailssites(response)
{
    if(response == undefined)
        return;
    var responseFromServer = response;
    var nodeResponse = responseFromServer["nodes"]
    if(nodeResponse.status == 200)
    {
        cyGraph.elements().addClass('semitransp');
        nodeResponse.data.forEach(function(row) 
        {
            var selNode = cyGraph.nodes("[id='"+row[0]+"']")
            selNode.removeClass('semitransp');
            selNode.addClass('highlight')
        })
    }
}
function onExport(format)
{
    var params = {
        type: format,
        tableName: 'Table name'
      };
      $.extend(true,options, params);

      $('#table-data').tableExport(options);
}

function getEntityDatasites()
{
    showLoader("node-view")
    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site")}, type="GET").done(fillNodeDetailssites);
}

function fillNodeDetailssites(response)
{
    if(response == undefined)
        return;
    entityResponse = response.responseData;

    if(response.responseData.length > 0)
    {
        response.responseData.forEach(function(obj, index){
            var tempObj = {} 
            tempObj['site'] = obj.site
            tempObj['isSuccess'] = true
            tempObj['isWSConnected'] = false
            tempObj['criticalNodeCount'] = 0
            tempObj['nodeCount'] = {"host":{"criticalCount":0, "okCount":0, "pendingCount":0, "warningCount":0,"unknownCount":0 }, "service":{"criticalCount":0, "okCount":0, "pendingCount":0, "warningCount":0,"unknownCount":0 }};
            responseFromServer = obj.site_data
            if(Object.keys(responseFromServer).length > 0)
            {
                var nodeResponse = responseFromServer["nodes"]
                if(nodeResponse.status == 200 && nodeResponse.data.length > 0)
                {
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
                    nodeResponse.data.forEach(function(row) 
                    {
                        if(row[2])
                            var state = row[2].toUpperCase()
                        else
                            var state = row[2]
                        if(state === "CRITICAL"  || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE"  || state === "WAITING") 
                        {
                            criticalNodeCount++;
                            tempObj['isSuccess'] = false
                            if(entitySelectedsite == ' ')
                            {
                                entitySelectedsite = obj.site
                            }
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hCriticalStatusCount++ : sCriticalStatusCount++
                        }
                        if(state == "" ||  state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP")
                        { 
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hOkStatusCount++ : sOkStatusCount++
                        }
                        if(state === "PENDING")
                        { 
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hPendingStatusCount++ : sPendingStatusCount++;
                        }
                        if(state === "WARNING")
                        {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hWarningStatusCount++ : sWarningStatusCount++;
                        }
                        if(state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED")
                        {
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
                else
                {
                    tempObj['isSuccess'] = false
                }  

            }
            else
            {
                tempObj['isSuccess'] = false
            }
            sitesData.push(tempObj)
            var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === obj.site)[0]
            makeWebSocConnectionsites(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'])
        });
        sSitehtml = ''
        fSitehtml = ''
        $("#node-view #site-list").empty()
        sitesData.forEach(function(obj,index)
        {
            if (obj.isSuccess) {
                sSitehtml += '<li class="nav-item success" id="' + obj.site + '_li" style="position: relative;"><span class="indicator-circle" style="background: #FF0000; z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="nav-link green bold-text" data-id="' + obj.site + '" id="' + obj.site + '" data-toggle="tab" onclick="onEntitySiteTabchangesites(\'' + obj.site + '\')">' + obj.site + '</a></li>'
                $("#entityLED").removeClass("red").addClass('green');
            }
            else {
                fSitehtml += '<li class="nav-item failure" id="' + obj.site + '_li" style="position: relative;"><span class="indicator-circle" style="background: #FF0000; z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="nav-link red bold-text" data-id="' + obj.site + '"  id="' + obj.site + '" data-toggle="tab" onclick="onEntitySiteTabchangesites(\'' + obj.site + '\')">' + obj.site + '</a></li>'

                $("#entityLED").removeClass("green").addClass('red');
            }
        });
        $("#node-view #site-list").append(fSitehtml);
        $("#node-view #site-list").append(sSitehtml);
        if ($("#node-view #site-list li a").eq(0).data())
        {
            entitySelectedsite = $("#node-view #site-list li a").eq(0).data().id 
        }
        $("#node-view #site-list #" + entitySelectedsite).addClass('active');
        var obj = entityResponse[0] //.filter(x => x.site === entitySelectedsite)[0]
        //  var obj = entityResponse
        stopLoader("node-view")
        dispalyNodessites(obj.site_data, obj.code)
    }
    else
    {
        stopLoader("node-view")
        $("#node-view #entity-search").css('visibility','hidden');
        $("#node-view #vis").css('display','none');
        $("#node-view #entity-nodata").css('display','block');  
        $("#node-view #nodatamessage").text('No Data');
    }
    if(pageName === "Dashboard")
    {
        var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === entitySelectedsite)[0]
        onTicketSiteTabchangesites(entitySelectedsite, tempSiteObj)
        findCountsites()
    }
}

function dispalyNodessites(data, responseCode)
{
    if(Object.keys(data).length > 0 && data["nodes"] && data["nodes"].data.length > 0)
    {
        $("#node-view #entity-search").css('visibility','visible');
        $("#node-view #vis").css('display','block');
        $("#node-view #entity-nodata").css('display','none');
        var obj = sitesData[0] //.filter(x => x.site === entitySelectedsite)[0]
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
        if(nodeResponse.status == 200)
        {
            $("#total-nodes").html("Nodes ("+nodeResponse.data.length+")");
            nodeResponse.data.forEach(function(row) 
            {
                if(row[2])
                    var state = row[2].toUpperCase()
                else
                    var state = row[2]
                if(state === "CRITICAL"  || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE"  || state === "WAITING") 
                {
                    criticalStatusCount += 1;
                }
                if(state == "" ||  state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP")
                {
                    okStatusCount += 1;
                }
                if(state === "PENDING")
                {
                    pendingStatusCount += 1;
                }
                if(state === "WARNING")
                {
                    warningStatusCount += 1;
                }
                if(state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED")
                {
                    unknownStatusCount += 1;
                }
                var color = getColorForNodeState(row[2]);
                nodeSize = getSizeForNode(row[4])
                var label = row[1];
                if(row[4] == "Host" || row[4].startsWith('Node'))
                {
                    tempLabel = label;

                    if(sortedJson[label] === undefined)
                    {
                        sortedJson[label] = {"host": "", "services": [], "hostms": []};
                    }
                    sortedJson[label]["host"] = row;
                }
                else
                {
                    var tempIdArray = label.split(":");
                    if(sortedJson[tempIdArray[0]] === undefined)
                    {
                        sortedJson[tempIdArray[0]] = {"host": "", "services": [], "hostms": []};
                    }
                    if(row[4] == "HostMS" || row[4] == "ServiceMS")
                    {
                        if(row[4] == "ServiceMS")
                        {
                            tempLabel = tempIdArray[2];

                            if(sortedJson[tempIdArray[0]][tempIdArray[1]] === undefined)
                            {
                                sortedJson[tempIdArray[0]][tempIdArray[1]] = [];
                            }
                            sortedJson[tempIdArray[0]][tempIdArray[1]].push(row);
                        }
                        else
                        {
                            tempLabel = tempIdArray[1];
                            sortedJson[tempIdArray[0]]["hostms"].push(row);
                        }
                    }
                    if(row[4] == "Service" || row[4].startsWith('Pod'))
                    {
                        tempLabel = tempIdArray[1];
                        sortedJson[tempIdArray[0]]["services"].push(row);
                    }
                    if(row[4] != "Host" && row[4] != "HostMS" && row[4] != "Service" && row[4] != "ServiceMS")
                    {
                        tempLabel = tempIdArray[1] ? tempIdArray[1] : tempIdArray[0];
                    }
                }
                
                var dashboardenabled = "true";
                if(row[8] === null)
                {
                    dashboardenabled = "true";
                }
                var node = { data: { id: row[0], fullname:label, dashboardenabled:dashboardenabled, dashboard_url:row[8], text: tempLabel, image : image_path+row[5], color: color, size: nodeSize}};
                nodesData.push(node);

                titleToId[label] = row[0];
            });
        }

        
        if(criticalStatusCount == 0)
        {
            obj.isSuccess = true
            $('#pills-critical-tab').attr('onclick', ' ');
            $("#pills-critical-tab").html("Critical ("+criticalStatusCount+")");
        }
        else
        {
            obj.isSuccess = false
            var classList = $("#"+entitySelectedsite+"_li").attr('class')
            if(classList.includes("failure") == false)
            {
                $("#node-view #"+client.id+"_li").removeClass("success");
                $("#node-view #"+client.id+"_li").addClass("failure");
                $("#node-view #"+client.id+"_li .nav-link").removeClass("green");
                $("#node-view #" + client.id + "_li .nav-link").addClass("red");
                $("#entityLED").removeClass("green").addClass('red')
            }
            $("#pills-critical-tab").html('<span class="bold-text red">Critical('+criticalStatusCount+')</span>');
        }
        if(okStatusCount == 0)
        { 
            $('#pills-ok-tab').attr('onclick', ' ');
            $("#pills-ok-tab").html("Ok ("+okStatusCount+")");
        }
        else
            $("#pills-ok-tab").html('<span class="bold-text green">Ok('+okStatusCount+')</span>');
            
        if(pendingStatusCount == 0)
        { 
            $('#pills-pending-tab').attr('onclick', ' ');
            $("#pills-pending-tab").html("Pending ("+pendingStatusCount+")");
        }
        else
            $("#pills-pending-tab").html('<span class="bold-text pending-text">Pending('+pendingStatusCount+')</span>');
        
        if(warningStatusCount == 0)
        {
            $('#pills-warning-tab').attr('onclick', ' ');
            $("#pills-warning-tab").html("Warning ("+warningStatusCount+")");
        }
        else
            $("#pills-warning-tab").html('<span class="bold-text warning">Warning('+warningStatusCount+')</span>');
        if(unknownStatusCount == 0)
        {
            $('#pills-unknown-tab').attr('onclick', ' ');   
            $("#pills-unknown-tab").html("Unknown ("+unknownStatusCount+")");
        }
        else
            $("#pills-unknown-tab").html('<span class="bold-text unknown">Unknown('+unknownStatusCount+')</span>');
        var relationResponse = responseFromServer["relationships"]
        if(relationResponse.status == 200)
        {
            relationResponse.data.forEach(function (row)
            {
                var edge = { data: { source: row[0], target: row[1], id: "id_"+row[0]+row[1], label: row[2]}};
                edgesData.push(edge);
            });
        }
        createGraphsites(nodesData, edgesData);
    }
    else
    {
        $("#node-view #entity-search").css('visibility','hidden');
        $("#node-view #vis").css('display','none');
        $("#node-view #entity-nodata").css('display','block');  
        if(responseCode == 200)
            $("#entity-nodata #nodatamessage").text('No Data');
        else
            $("#entity-nodata #nodatamessage").text('Entity server not reachable.');
    }
}

function displayTablesites()
{
    $("#table-data").empty();
    var html = "";
    html += '<thead class="table-head border-t">';
    html +=     '<tr>';
    html +=         '<th>IP Address</th>';
    html +=         '<th>Service</th>';
    html +=         '<th>Last Update</th>';
    html +=         '<th>Status</th>';
    html +=         '<th>Message</th>';
    html +=     '</tr>';
    html += '</thead>';
    html += '<tbody class="accordion list" id="accordionExample">';
    $.each(sortedJson, function(key, val)
    {
        var finalHtml = "";
        var hostRowSpan = val.hostms.length + val.services.length;
        var serviceRowSpan = 0;

        var hostHtml = "";
        hostHtml += "<tr>";
        hostHtml +=     "<td class = 'ip' rowspan='"+rowSpan+"'>"+val.host[7]+"</td>";
        hostHtml +=     "<td style='border-left: 1px solid #eee;'>Server</td>";
        hostHtml +=     "<td >"+getFormatedDate(val.host[6])+"</td>";
        var status = getColorForNodeState(val.host[2]);
        var statusText = val.host[2] ==  "" ? 'OK' : val.host[2]
        hostHtml +=     "<td ><span class='white-text py-1 px-2 size12 radius-8 status' style='background:"+status+"'>"+statusText+"</span></td>";
        hostHtml +=     "<td >"+val.host[3]+"</td>";
        hostHtml += "</tr>";
        var serviceHtml = "";
        if(val.services.length > 0)
        {
            $.each(val.services, function(index, row)
            {
                serviceHtml += "<tr>";

                serviceHtml += "<td class = 'ip'> </td>";

                serviceHtml +=     "<td style='border-left: 1px solid #eee;' class='service'>"+row[1].split(":")[1]+"</td>";
                serviceHtml +=     "<td >"+row[6]+"</td>";
                var status = getColorForNodeState(row[2]);
                var statusText = row[2] ==  "" ? 'OK' : row[2]
                serviceHtml +=     "<td ><span class='white-text py-1 px-2 size12 radius-8 status' style='background:"+status+"'>"+statusText+"</span></td>";
                serviceHtml +=     "<td >"+row[3]+"</td>";
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
        $.each(val.hostms, function(index, row)
        {
            hostmsHtml += "<tr>";
            hostmsHtml += "<td class = 'ip'> </td>";
            hostmsHtml +=     "<td style='border-left: 1px solid #eee;' class='service'>"+row[1].split(":")[1]+"</td>";
            hostmsHtml +=     "<td >"+getFormatedDate(row[6])+"</td>";
            var status = getColorForNodeState(row[2]);
            var statusText = row[2] ==  "" ? 'OK' : row[2]
            hostmsHtml +=     "<td ><span class='white-text py-1 px-2 size12 radius-8 status' style='background:"+status+"'>"+statusText+"</span></td>";
            hostmsHtml +=     "<td >"+row[3]+"</td>";
            hostmsHtml += "</tr>";
        });
        finalHtml = hostHtml + serviceHtml + hostmsHtml
        html +=finalHtml;
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
function nodeStatussites(tempObj)
{
    var criticalStatusCount = 0;
    var okStatusCount = 0;
    var pendingStatusCount = 0;
    var warningStatusCount = 0;
    var unknownStatusCount = 0;
    var obj = {"criticalCount":0, "okStatusCount":0, "pendingCount":0, "warningCount":0 };
    tempObj.forEach(function(row) 
    {
        if(row[0])
            var state = row[0].toUpperCase()
        else
            var state = row[0]
        if(state === "CRITICAL"  || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE"  || state === "WAITING") 
        {
            criticalStatusCount = criticalStatusCount + row[1]
        }
        if(state == "" ||  state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP")
        { 
            okStatusCount = okStatusCount + row[1]
        }
        if(state === "PENDING")
        { 
            pendingStatusCount = pendingStatusCount + row[1];
        }
        if(state === "WARNING")
        {
            warningStatusCount = warningStatusCount + row[1];
        }
        if(state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED")
        {
            unknownStatusCount = unknownStatusCount + row[1];
        }
    });
    obj = {"criticalCount":criticalStatusCount, "okCount":okStatusCount, "pendingCount":pendingStatusCount, "warningCount":warningStatusCount, "unknownCount":unknownStatusCount}
    return obj;
}
function findCountsites()
{
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

    sitesData.forEach(function(row) 
    {

        if (row['nodeCount'] == undefined) {
            return
        }
        var data = row['nodeCount']
        hCriticalStatusCount = + data['host']['criticalCount']
        hOkStatusCount = data['host']['okCount']
        hPendingStatusCount = data['host']['pendingCount']
        hWarningStatusCount = data['host']['warningCount']
        hUnknownStatusCount =  data['host']['unknownCount']

        sCriticalStatusCount =  data['service']['criticalCount']
        sOkStatusCount =  data['service']['okCount']
        sPendingStatusCount =  data['service']['pendingCount']
        sWarningStatusCount =  data['service']['warningCount']
        sUnknownStatusCount =  data['service']['unknownCount']

        return
    })
    var tempObj = {} 
    tempObj['host'] = {"CRITICAL":hCriticalStatusCount, "OK":hOkStatusCount, "PENDING":hPendingStatusCount, "WARNING":hWarningStatusCount, "UNKNOWN":hUnknownStatusCount}
    tempObj['service'] = { "CRITICAL": sCriticalStatusCount, "OK": sOkStatusCount, "PENDING": sPendingStatusCount, "WARNING": sWarningStatusCount, "UNKNOWN": sUnknownStatusCount }

    //fillHostServiceCount(tempObj)
}

function createGraphsites(nodes, edges)
{
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
        .selector('node.highlight').css({'border-width': '3','font-size': '20'})
        .selector('node.semitransp').css({ 'opacity': '0.5','border-width': '1','font-size': '8' })
        .selector('edge.highlight').css({ 'width': '1.5', "label": "data(label)", "text-rotation": "autorotate", 'text-margin-y': '-10px', 'font-size': '10'})
        .selector('edge.semitransp').css({ 'opacity': '0.2','width': '0.5' })
        .selector('node.hasLabel').css({ 'label': "data(text)" }),
    
        elements: 
        {
            nodes: nodes,
            edges: edges
        },
    
        layout: graphLayout,
        
    });
    cyGraph.on('tap', 'node', function(e){
        var neigh = e.target;
        cyGraph.elements().difference(neigh.outgoers().union(neigh.incomers())).not(neigh).addClass('semitransp');
        neigh.addClass('highlight').outgoers().addClass('highlight');
        neigh.addClass('highlight').incomers().addClass('highlight');
        var color = neigh[0]["_private"]["data"]["color"]
        neigh.connectedEdges().style({ 'line-color': color, 'target-arrow-color': color, 'color': color });
    });
    cyGraph.on('click', function(e){
        cyGraph.elements().removeClass('semitransp');
        cyGraph.elements().removeClass('highlight');
        cyGraph.elements().style({ 'line-color': '#aeaeae', 'target-arrow-color': '#aeaeae' });
    });
    cyGraph.on('zoom', function (event) {
        if(cyGraph.zoom() > 1)
            cyGraph.elements().nodes().addClass('hasLabel')
        else if(cyGraph.zoom() < 1)
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
                select: function(ele)
                {
                    opendashboarsuperset(ele.id(), ele.data('dashboard_url'));
                },
            },
            {
                content: '<span class="fa fa-2x"><i class="icon-downtime text-white"></i></span>',
                select: function(ele)
                {
                }
            },
            {
                content: '<span class="fa fa-2x"><i class="icon-health text-white"></i></span>',
                select: function(ele)
                {
                    openNagiosGraph(ele.id(), ele.data('fullname'));
                },
            },
            {
                content: '<span class="fa fa-2x"><i class="icon-help text-white"></i></span>',
                select: function(ele)
                {
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
                select: function(ele)
                {
                }
            },
            {
                content: '<span class="fa fa-2x"><i class="icon-health text-white"></i></span>',
                select: function(ele)
                {
                    openNagiosGraph(ele.id(), ele.data('fullname'));
                },
            },
            {
                content: '<span class="fa fa-2x"><i class="icon-help text-white"></i></span>',
                select: function(ele)
                {
                    openNav(ele.id(), entitySelectedsite);
                }
            }
        ]
    });

    // makeStompConnection();
    // if(wsConnected == false)
        // makeWebSocConnection(websocketurl)
}

function setAnimsites(nodeid)
{
    if(nodeid != undefined)
    {
        var delay = 250;
        var duration = 600;
        cyGraph.nodes("[id*="+nodeid+"]")
        .animate({'style': {'opacity': 0.8}}, {'duration': duration}).delay(delay)
        .animate({'style': {'opacity': 0.2}}, {'duration' : duration}).delay(delay)
        .animate({'style': {'opacity': 0.2}}, {'duration' : duration}).delay(delay)
        .animate({'style': {'opacity': 0.2}}, {'duration' : duration}).delay(delay)
        .animate({'style': {'opacity': 0.2}}, {'duration' : duration}).delay(delay)
        .animate({'style': {'opacity': 0.2}}, {'duration' : duration}).delay(delay)
        .animate({'style': {'opacity': 1}}, {'duration': duration});			
    }
}		

function makeWebSocConnectionsites(websocketurl, wsitename, tries, nodeCount)
{

    try{
        if(window.WebSocket)
        {
            var destination = "/exchange/k8s_update";
            var wsobjname = new WebSocket(websocketurl);
            var client = Stomp.over(wsobjname);
            client.id = wsitename
            client.connectionTries = tries;
            client.criticalNodeCount = nodeCount;
            var on_conn = function()
            {
                wsConnected = true;
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = true;
                client.subscribe(destination, function(message)
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
                });
                client.subscribe('/exchange/delta_update', function(message) 
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
                        var id = titleToId[tempJson.title];
                        if(id !== undefined)
                        {
                            var color = getColorForNodeState(tempJson.monitor_status);
                            if(cyGraph.nodes("[fullname='"+tempJson.title+"']")[0])
                                cyGraph.nodes("[fullname='"+tempJson.title+"']")[0]["_private"]["data"]["color"] = color;
                            cyGraph.style().selector('node[id = '+id+']').style(
                            {
                                'background-color': color,
                                'border-color': color,
                            }).update();
                            setAnimsites(id);
                        }
                        nodeSpecificDetailssites(id, tempJson.title)
                    } 
                    if(tempJson.host !== undefined)
                    {
                        var tempObj = {}
                        tempObj['host'] = nodeStatussites(Object.keys(tempJson.host).map((key) => [key, Number(tempJson.host[key])]));
                        tempObj['service'] = nodeStatussites(Object.keys(tempJson.service).map((key) => [key, Number(tempJson.service[key])]));
                        obj.nodeCount = tempObj;
                        if(pageName === "Dashboard")
                            findCountsites()
                        if(entitySelectedsite == client.id)
                        {
                            updateValues(tempObj);
                        }
                    }
                    changeSiteStatussites(client.id, client.criticalNodeCount)
                    // else
                    // {
                    //     var obj = sitesData.filter(x => x.site === client.id)[0]
                    //     state = tempJson.monitor_status
                    //     if(state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING")
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
                });
                $("#node-view #"+client.id+"-indicator").css('background', '#16d39a')
            }
            var on_err = function(error) 
            { 
                $("#node-view #"+client.id+"-indicator").css('background', '#ff3d57')
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = false;
                if(networkStatus === 'online')
                {
                    if(client.connectionTries == 10)
                    {
                        swal({
                            title: "Want to get entity updates?",
                            text: "Not able to connect web socket of \"" +client.id+ "\". Please check once!.",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonClass: "btn-success",
                            confirmButtonText: "Yes, try again",
                            cancelButtonText: "No Cancel",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        function(isConfirm){
                            if (isConfirm) {
                                makeWebSocConnectionsites(client.ws.url, client.id, 0, client.criticalNodeCount)
                            } else {
                                $("#node-view #"+client.id+"-indicator").css('background', '#ff3d57')
                            }
                        });
                    }
                    else
                    {
                        client.connectionTries++;
                        makeWebSocConnectionsites(client.ws.url, client.id, client.connectionTries, client.criticalNodeCount)
                    }
                }
            }; 
            client.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
            }
        else
        {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch(err) {
        return;
    }
}
function nodeSpecificDetailssites(nodeId, title)
{
    if($("#node-detail").css('display') != 'none')
    {
        nodeTitle =  $("#node-name").text();
        if(nodeId != undefined && nodeTitle == title)
        {
            showLoader('node-detail')
            requestDataFromServer("../dashboard/getnodespecificdetails", {"nodeid":nodeId, "mode":'', csrfmiddlewaretoken: csfr_token, selectedSite:entitySelectedsite}, type="POST").done(nodespecificdetialsresponse);
        }
    }
}
function changeSiteStatussites(site, count)
{
    var obj = sitesData[0] //.filter(x => x.site === site)[0]
    if(obj){
        obj.criticalNodeCount = count;
        if(count == 0){
            obj.isSuccess = true
            $("#node-view #site-list #"+site+'_li').removeClass("failure").addClass('success') 
            $("#node-view #site-list #" + site + '_li a').removeClass("red").addClass('green')
            $("#entityLED").removeClass("red").addClass('green')
        }
        else
        {
            obj.isSuccess = false
            $("#node-view #site-list #"+site+'_li').removeClass("success").addClass('failure') 
            $("#node-view #site-list #" + site + '_li a').removeClass("green").addClass('red')
            $("#entityLED").removeClass("green").addClass('red')
        }
    }
}
function reloadgraph(screen)
{
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

function increasedecreasezoom(increase)
{
    if(increase == 1)
        zoom++;
    else
        zoom--;
    cyGraph.viewport(
    {
        zoom: zoom
    });
}

function entity()
{
    window.location.href = window.location.origin+'/entity/'
}
function statusFunction(select)
{
    isCalledStompCon = false;
    var statusType = $(select).attr("aria-controls");
    if(statusType === "pills-all")
    {
        startEntityLoadersites()
        requestDataFromServer("../dashboard/getneo4jnodes", {sitename:entitySelectedsite}, type="GET").done(function (response) {
            stopEntityLoadersites()
            dispalyNodessites(response.responseData[0].site_data, response.responseData[0].code)
        });
    }
    else
    {
        showLoader('node-view')
        requestDataFromServer("../dashboard/getnodespecificdetails", {"nodeid":statusType, "mode":'', csrfmiddlewaretoken: csfr_token, selectedSite: entitySelectedsite}, type="POST").done(searchNodeResponsesites);
    }
}
function onEntitySiteTabchangesites(sitename)
{
    startEntityLoadersites()
    entitySelectedsite = sitename;
    $('#node-view #site-list li a.active').removeClass('active');
    $('#node-view #site-list #'+sitename+'_li '+'a').addClass('active');
    var tempSiteObj = sitesData[0] //.filter(x => x.site === sitename)[0]
    var criticalNodeCount = tempSiteObj.criticalNodeCount;
    if(tempSiteObj.isWSConnected == false){
        tempSiteObj = siteResponse[0] //.filter(x => x.sitename === sitename)[0]
        makeWebSocConnectionsites(tempSiteObj.websocket_url, sitename, 0, criticalNodeCount)
    }
    $("#vis").empty();
    requestDataFromServer("../dashboard/getneo4jnodes", {sitename:sitename}, type="GET").done(function(response){ 
        stopEntityLoadersites()
        dispalyNodessites(response.responseData[0].site_data, response.responseData[0].code) 
    });


    onTicketSiteTabchangesites(sitename, tempSiteObj) //Ticket site tab change
}
function startEntityLoadersites()
{
    $('#node-view #entity-nodata').css("display", "none")
    $('#node-view #vis').css("display", "none")
    showLoader("node-view")
}
function stopEntityLoadersites() {
    $('#node-view #entity-nodata').css("display", "block")
    $('#node-view #vis').css("display", "block")
    stopLoader("node-view")  
}