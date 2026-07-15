var eclient = {}
// var entclient = '';
//var isToBeConnect = {}[true];
var entitylastreconnect = "";
var entityobj = {}

function displayentitytooltips(wsname, sname) {
    const tooltip = document.getElementById(sname);
    const wrapper = document.getElementById(wsname);

    if (tooltip.classList.contains('entityshown')) {
        // If the tooltip is already shown, close it
        tooltip.classList.remove('entityshown');
        wrapper.classList.remove('entityborder-clr');
    } else {
        // Close all other tooltips
        closeAllTooltipsdom(tooltip);

        // Open the clicked tooltip
        tooltip.classList.add('entityshown');
        wrapper.classList.add('entityborder-clr');
    }
}
/*function displayentitytooltips(wsname, sname) {
    if (document.getElementById(sname).classList.contains('entityshown')) {
        document.getElementById(wsname).classList.remove('entityborder-clr')
        document.getElementById(sname).classList.remove('entityshown')
    } else {
        document.getElementById(wsname).classList.add('entityborder-clr')
        document.getElementById(sname).classList.add('entityshown')
    }
}*/

var sitesname = 'entsitesname'
var wsocname = 'entity-pipe'
var entityhtml = '<div class="indicator" id="entity-pipe"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats" onclick="displayentitytooltips(\''+ wsocname + '\',\'' + sitesname + '\')"> \
                        <span class="tooltiptext" id="entsitesname" style="">\
                        </span> \
                    </i> \
                 </div>'
$('#entity-html').empty()
$("#entity-html").append(entityhtml);

function iconentclose(ip) {
    // console.log("------>" + ip);
    isToBeConnect = !{}[true];
    if (entityobj[ip]) {
        entityobj[ip].disconnect();
    }
}

function iconentconnect(ip) {
    isToBeConnect = {}[true];
    makeWebSocConnectionk8(entityobj[ip].ws.url, entityobj[ip].id, 0)
}
function makeWebSocConnectionk8(websocketurl, wsitename, tries, nodeCount, letter) {
    //  console.log("entity-new websocket called")
    //  console.log("entity-new websocket called---->"+wsitename)
    var entclient = 'client' + (letter)
    //  console.log("client---->" + entclient)
    try {
        if (window.WebSocket) {
            var destination = "/exchange/k8s_update";
            entclient = Stomp.client(websocketurl);
            // console.log("client--ent-->" + JSON.stringify(eclient[entclient]))
            //  var wsobjname = new WebSocket(websocketurl);
            // var client = Stomp.over(wsobjname);
            entclient.id = wsitename
            entclient.connectionTries = tries;
            entclient.criticalNodeCount = nodeCount;
            entityobj[wsitename] = entclient
            var iconhtml = ''
            iconhtml += '<div class="row tooltiping">'
            iconhtml += '<p style="font-size: 13px;margin-left: 11px;"><b>Queue Name :</b> entity_update</p>'
            iconhtml += '<table>';
            iconhtml += '<thead></thead>';
            iconhtml += '<tbody class="row" style="margin-left:6px;>';
            iconhtml += '<tr class="col-12">';
            iconhtml += '<td class="col-8 details_td" style="width: 100px;">isConnected</td>';
            iconhtml += '<td class="col-4 details_ts" id="' + wsitename + 'entstatus-conn" ></td>';
            iconhtml += '</tr>';
            iconhtml += '</tbody>';
            iconhtml += '</table>';
            iconhtml += ' <p class="tooltiptexting" id="' + wsitename + 'entlast-conn"></p>'
            //iconhtml += '<p class="col-9" style="color:#ffffff" id="' + wsitename + '"></p>'
            iconhtml += '<p class="col-3" id="entdisplay-icon' + wsitename + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
            iconhtml += '</div>'
            $('#entsitesname').empty()
            $('#entsitesname').append(iconhtml)
            var on_conn = function () {
                wsConnected = true;
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = true;
                isToBeConnect = {}[true];
                //  entclient.connectionTries = 0;
                //$("#entity-pipe").css('color', '#16d39a')
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip">'
                iconhtml += '<p class="tooltiptext" id="' + wsitename + '">'
                iconhtml += '<p style="font-size: 12px;margin-left: 11px;"><b>Queue Name :</b> entity_update</p>'
                iconhtml += '<div class="col-12" style="display:contents;">'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: 0px;font-size: 11px;"><b>isConnected :</b> True(0)</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;font-size: 16px;margin-left: 30px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconentconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconentclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '</div>'
                iconhtml += '<p style="font-size: 12px;margin-left: 12px;"><b>Lastconnect:</b>' + entitylastreconnect + '</p>'
                iconhtml += '</p>'
                iconhtml += '</div>'
                $('#entsitesname').empty()
                $('#entsitesname').append(iconhtml)*/
                document.getElementById(wsitename + 'entstatus-conn').innerText = 'True(0)'
                document.getElementById(wsitename + 'entstatus-conn').style.color = "#16d39a";
                document.getElementById('entity-pipe').style.color = '#16d39a'
                $("#entdisplay-icon" + wsitename).css('display', 'none');
                document.getElementById(wsitename + 'entlast-conn').innerText = "Lastconnect : " + entitylastreconnect

                entclient.subscribe(destination, function (message) {

                    //   console.log('ENTITY-NEW-WS k8s MESSAGE --->' + message.body)

                    //getnewchart();
                    var tempJson = JSON.parse(message.body);
                    //   console.log('ENTITY-NEW-WS MESSAGE stringified --->' + JSON.stringify(tempJson))
                    var monitorStatus = tempJson.monitor_status;
                    var cygraphid = 's_swip_' + (tempJson['hostIp']).replaceAll('.', '_')
                    //  console.log('cyGraph[cygraphid] --->' + cyGraph[cygraphid])

                    if (monitorStatus === "CRITICAL" || monitorStatus === "DOWN" || monitorStatus === "UNREACHABLE" || monitorStatus === "FALSE" || monitorStatus === "WAITING") {
                        entclient.criticalNodeCount++;
                    }
                    else {
                        entclient.criticalNodeCount--;
                    }
                    if (entclient.id == entitySelectedsite) {
                        var title = tempJson.title;
                        var name = tempJson.name;
                        var node_type = tempJson.node_type;
                        var kind = tempJson.kind;
                        var image = image_path + tempJson.image;
                        if (title !== "") {
                            if (cyGraph[cygraphid]) {
                                var id = titleToId[title];
                                var eles = cyGraph[cygraphid].nodes("[fullname='" + title + "']");
                                var isNode = eles.isNode();
                                var podid = 'ip_' + (tempJson.hostIp).replaceAll(".", "_")
                                var prev_txt = ''
                                var node_stat = tempJson.status
                                //console.log('eles.isNode()---->' + isNode + '| NAME--->' + title + '| node_type--->' + node_type + ' | ELESISEMPTY--->' + eles.empty() +  ' | Status--->' + tempJson.status)
                                //  console.log(' NAME--->' + title + '| node_type--->' + node_type + ' | Status--->' + tempJson.status)
                                //console.log('TEMPJSON--->' + JSON.stringify(tempJson))
                                ////////////////////////////////////////ENTITY ELEMENTS COUNT CHANGE////////////////////////////////////////////////
                                var overview_data = tempJson.overviewstats['data']['overview'][tempJson['ip']]
                                var overall_data = tempJson.overviewstats['data']['overall']
                                var hardware_critical = overall_data['hardware']['0'];
                                var hardware_warning = overall_data['hardware']['1'];
                                var hardware_ok = overall_data['hardware']['2'];
                                var hardware_unknown = overall_data['hardware']['3'];
                                var software_critical = overall_data['software']['0'];
                                var software_warning = overall_data['software']['1'];
                                var software_ok = overall_data['software']['2'];
                                var software_unknown = overall_data['software']['3'];
                                var application_critical = overall_data['application']['0'];
                                var application_warning = overall_data['application']['1'];
                                var application_ok = overall_data['application']['2'];
                                var application_unknown = overall_data['application']['3'];
                                var disconntext = ''
                                var intext = ''
                                var oktext = ''
                                var unknowntext = ''
                                var tab_id = (tempJson['ip']).replaceAll(".", "_")
                                var tot_critical = 0
                                var tot_warning = 0
                                var tot_unknown = 0
                                var tot_ok = 0
                                if (overview_data.hasOwnProperty('2')) {
                                    oktext = overview_data['2'][0]
                                    tot_ok = Number(overview_data['2'][0])
                                    //console.log('INSIDE 2--->' + tot_ok)
                                } else {
                                    oktext = 0
                                }
                                if (overview_data.hasOwnProperty('0')) {
                                    intext = overview_data['0'][0]
                                    tot_critical = Number(overview_data['0'][0])
                                    //console.log('INSIDE 0--->' + tot_critical)
                                } else {
                                    intext = 0
                                }
                                if (overview_data.hasOwnProperty('1')) {
                                    disconntext = overview_data['1'][0]
                                    tot_warning = Number(overview_data['1'][0])
                                    //console.log('INSIDE 1--->' + tot_warning)
                                } else {
                                    disconntext = 0
                                }
                                if (overview_data.hasOwnProperty('3')) {
                                    unknowntext = overview_data['3'][0]
                                    tot_unknown = Number(overview_data['3'][0])
                                    //console.log('INSIDE 3--->' + tot_unknown)
                                } else {
                                    unknowntext = 0
                                }
                                if (((document.getElementById('pills-ok-tab' + tab_id))) || ((document.getElementById('pills-ok-tabip_' + tab_id)))) {
                                    //oktext = value['hardware']['2'] + value['software']['2'] + value['application']['2'];

                                    if (oktext) {
                                        $("#pills-ok-tab" + tab_id).html('<span class="bold-text green">Ok(' + oktext + ')</span>');
                                        if (((document.getElementById('pills-ok-tabip_' + tab_id))))
                                            $("#pills-ok-tabip_" + tab_id).html('<span class="bold-text green">Ok(' + oktext + ')</span>');
                                        $('#pills-ok-tab' + tab_id).attr('onclick', 'statusFunction(this)');
                                    } else {
                                        $("#pills-ok-tab" + tab_id).html('Ok(' + oktext + ')');
                                        if (((document.getElementById('pills-ok-tabip_' + tab_id))))
                                            $("#pills-ok-tabip_" + tab_id).html('Ok(' + oktext + ')');
                                    }

                                }
                                if (((document.getElementById('pills-critical-tab' + tab_id))) || ((document.getElementById('pills-critical-tabip_' + tab_id)))) {
                                    //intext = value['hardware']['0'] + value['software']['0'] + value['application']['0']

                                    if (intext) {
                                        $("#pills-critical-tab" + tab_id).html('<span class="bold-text red">Critical(' + intext + ')</span>');
                                        if (((document.getElementById('pills-critical-tabip_' + tab_id))))
                                            $("#pills-critical-tabip_" + tab_id).html('<span class="bold-text red">Critical(' + intext + ')</span>');
                                        $('#pills-critical-tab' + tab_id).attr('onclick', 'statusFunction(this)');
                                    } else {
                                        $("#pills-critical-tab" + tab_id).html('Critical(' + intext + ')');
                                        if (((document.getElementById('pills-critical-tabip_' + tab_id))))
                                            $("#pills-critical-tabip_" + tab_id).html('Critical(' + intext + ')');
                                    }
                                }
                                if (((document.getElementById('pills-warning-tab' + tab_id))) || ((document.getElementById('pills-warning-tabip_' + tab_id)))) {
                                    //disconntext = value['hardware']['1'] + value['software']['1'] + value['application']['1'];

                                    if (disconntext) {
                                        $("#pills-warning-tab" + tab_id).html('<span class="bold-text warning">Warning(' + disconntext + ')</span>');
                                        if (((document.getElementById('pills-warning-tabip_' + tab_id))))
                                            $("#pills-warning-tabip_" + tab_id).html('<span class="bold-text warning">Warning(' + disconntext + ')</span>');
                                        $('#pills-warning-tab' + tab_id).attr('onclick', 'statusFunction(this)');
                                    } else {
                                        $("#pills-warning-tab" + tab_id).html('Warning(' + disconntext + ')');
                                        if (((document.getElementById('pills-warning-tabip_' + tab_id))))
                                            $("#pills-warning-tabip_" + tab_id).html('Warning(' + disconntext + ')');
                                    }
                                }
                                if (((document.getElementById('pills-unknown-tab' + tab_id))) || ((document.getElementById('pills-unknown-tabip_' + tab_id)))) {
                                    //unknowntext = value['hardware']['3'] + value['software']['3'] + value['application']['3'];

                                    if (unknowntext) {
                                        $("#pills-unknown-tab" + tab_id).html('<span class="bold-text "style="color:white">Unknown(' + unknowntext + ')</span>');
                                        if (((document.getElementById('pills-unknown-tabip_' + tab_id))))
                                            $("#pills-unknown-tabip_" + tab_id).html('<span class="bold-text "style="color:white">Unknown(' + unknowntext + ')</span>');
                                        $('#pills-unknown-tab' + tab_id).attr('onclick', 'statusFunction(this)');
                                    } else {
                                        $("#pills-unknown-tab" + tab_id).html('Unknown(' + unknowntext + ')');
                                        if (((document.getElementById('pills-unknown-tabip_' + tab_id))))
                                            $("#pills-unknown-tabip_" + tab_id).html('Unknown(' + unknowntext + ')');
                                    }

                                }


                                ////////////////////////////////////////////////////////////BADGE HTML tempJson BLOCK/////////////////////////////////////////////////////////////////////

                                var tooltpHtml = '<div class="badgetltp-data ">'
                                if ((tot_critical > 0)) {
                                    tooltpHtml += '<div class="badgetltp-elem" style="color:red;font-weight:bold">' + tot_critical + '</div>'
                                } if ((tot_warning > 0)) {
                                    tooltpHtml += '<div class="badgetltp-elem" style="color:orange;font-weight:bold">' + tot_warning + '</div>'
                                } if ((tot_unknown > 0)) {
                                    tooltpHtml += '<div class="badgetltp-elem" style="font-weight:bold;color:grey">' + tot_unknown + '</div>'
                                } if ((tot_ok > 0)) {
                                    tooltpHtml += '<div class="badgetltp-elem" style="color:green;font-weight:bold">' + tot_ok + '</div>'
                                }
                                tooltpHtml += '</div>'
                                var badgeHtml = ''
                                if ((tot_critical > 0)) {
                                    //console.log('Critical Must be Shown ' + tot_critical)
                                    badgeHtml += '<i class="mdi icon-data mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + tot_critical + '</div>'
                                    $('#badgeip_' + tab_id).css('background-color', 'red')
                                } else if ((tot_warning > 0)) {
                                    //console.log('Warning Must be Shown ' + tot_warning)
                                    badgeHtml += '<i class="mdi icon-data  mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + tot_warning + '</div>'
                                    $('#badgeip_' + tab_id).css('background-color', 'orange')
                                } else if ((tot_unknown > 0)) {
                                    //console.log('Unknown Must be Shown ' + tot_unknown)
                                    badgeHtml += '<i class="mdi icon-data  mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + tot_unknown + '</div>'
                                    $('#badgeip_' + tab_id).css('background-color', 'white')
                                    $('#badgeip_' + tab_id).css('color', 'grey')
                                } else if ((tot_ok > 0)) {
                                    //console.log('OK Must be Shown ' + tot_ok)
                                    badgeHtml += '<i class="mdi icon-data  mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + tot_ok + '</div>'
                                    $('#badgeip_' + tab_id).css('background-color', 'green')
                                }

                                $('#badgeip_' + tab_id).html(badgeHtml)

                                ////////////////////////////////////////////////////////////BADGE HTML tempJson BLOCK/////////////////////////////////////////////////////////////////////

                                //}
                                var chartresponse = { "hardware": { "CRITICAL": hardware_critical, "OK": hardware_ok, "WARNING": hardware_warning, "UNKNOWN": hardware_unknown }, "software": { "CRITICAL": software_critical, "OK": software_ok, "WARNING": software_warning, "UNKNOWN": software_unknown }, "application": { "CRITICAL": application_critical, "OK": application_ok, "WARNING": application_warning, "UNKNOWN": application_unknown } };

                                if (typeof getnewchart === 'function') {
                                    // console.log('getChartData called')
                                    fillHostServiceCount(chartresponse)
                                }


////////////////////////////////////////ENTITY ELEMENTS COUNT CHANGE////////////////////////////////////////////////
                                ///////////////////////////////////////////////////////////////////



                                if (node_type === "create" || node_type === "update") {
                                    //var eles = cyGraph[cygraphid].nodes("[fullname='" + title + "']");
                                    //var isNode = eles.isNode();
                                    var color = getColorForNodeState(node_stat);
                                    //var color = getColorForNodeState(monitorStatus);
                                    //  console.log('ELES STYLE.JSON---->' + JSON.stringify(eles.jsons()))
                                    var prev_color = '';
                                    if (eles.nonempty()) {
                                        var prev_color = (eles)[0]["_private"]["data"]["color"];
                                    }

                                    var size = getSizeForNode(tempJson.type)

                                    if (!isNode) {
                                        var nodes = {
                                            fullname: title, dashboardenabled: 'true',
                                            dashboard_url: "/static/app/images/images/Linux.png", text: name, image: image, color: color, size: size
                                        };
                                        cyGraph[cygraphid].add({ group: 'nodes', data: nodes })
                                        var layouts = cyGraph[cygraphid].layout(graphLayout);
                                        layouts.run();
                                        cyGraph[cygraphid].style().selector(eles).style(
                                            {
                                                'background-color': color,
                                                'border-color': color,
                                            }).update();
                                        setAnim(id);
                                    }
                                    else {
                                        if (cyGraph[cygraphid].nodes && cyGraph[cygraphid].nodes("[fullname='" + title + "']")) {
                                            cyGraph[cygraphid].nodes("[fullname='" + title + "']")[0]["_private"]["data"]["color"] = color;
                                            cyGraph[cygraphid].style().selector(eles).style(
                                                {
                                                    'background-color': color,
                                                    'border-color': color,
                                                }).update();
                                            setAnim(id);
                                        }
                                    }
                                }
                                else if (node_type === "delete" && eles.nonempty()) {
                                    var color = getColorForNodeState("CRITICAL");
                                    var prev_color = (eles)[0]["_private"]["data"]["color"];
                                    //  console.log('DELETE ELES STYLE.JSON---->' + JSON.stringify(eles.jsons()))
                                    //  console.log('DELETE-->PREV COLOR--->' + JSON.stringify((eles)[0]["_private"]["data"]["color"]) + "CURRENT COLOR--->" + color)
                                    cyGraph[cygraphid].style().selector(eles).style(
                                        {
                                            'background-color': color,
                                            'border-color': color,
                                        }).update();
                                    // var eles = cyGraph[cygraphid].nodes("[fullname='" + title + "']");
                                    cyGraph[cygraphid].remove(eles);

                                }
                                nodeSpecificDetails(id, title)
                            }
                        }
                    }
                    changeSiteStatus(entclient.id, entclient.criticalNodeCount)
                });
                entclient.subscribe('/exchange/delta_update', function (message) {
                    //   console.log('ENTITY-NEW-WS DELTA UPDATE MESSAGE--->'+message)
                    var tempJson = JSON.parse(message.body);
                    var monitorStatus = tempJson.monitor_status;
                    if (monitorStatus === "CRITICAL" || monitorStatus === "DOWN" || monitorStatus === "UNREACHABLE" || monitorStatus === "FALSE" || monitorStatus === "WAITING") {
                        entclient.criticalNodeCount++;
                    }
                    else {
                        entclient.criticalNodeCount--;
                    }
                    if (entclient.id == entitySelectedsite) {
                        var id = titleToId[tempJson.title];
                        if (id !== undefined) {
                            var color = getColorForNodeState(tempJson.monitor_status);
                            if (cyGraph[cygraphid].nodes("[fullname='" + tempJson.title + "']")[0])
                                cyGraph[cygraphid].nodes("[fullname='" + tempJson.title + "']")[0]["_private"]["data"]["color"] = color;
                            cyGraph[cygraphid].style().selector('node[id = ' + id + ']').style(
                                {
                                    'background-color': color,
                                    'border-color': color,
                                }).update();
                            setAnim(id);
                        }
                        nodeSpecificDetails(id, tempJson.title)
                    }
                    if (tempJson.host !== undefined) {
                        var tempObj = {}
                        tempObj['host'] = nodeStatus(Object.keys(tempJson.host).map((key) => [key, Number(tempJson.host[key])]));
                        tempObj['service'] = nodeStatus(Object.keys(tempJson.service).map((key) => [key, Number(tempJson.service[key])]));
                        obj.nodeCount = tempObj;
                        //if (pageName === "Dashboard") --- this is only websocket
                        //findCount() --- this is only websocket
                        if (entitySelectedsite == entclient.id) {
                            updateValues(tempObj);
                        }
                    }
                    changeSiteStatus(entclient.id, entclient.criticalNodeCount)
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
                $("#node-view #" + entclient.id + "-indicator").css('background', '#16d39a')
                // this.connectionTries = 6
            }
            var on_err = function (error) {
                $("#node-view #" + entclient.id + "-indicator").css('background', '#ff3d57')
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                //$("#entity-pipe").css('color', '#16d39a')
                isToBeConnect = !{}[true];
                obj.isWSConnected = false;
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip">'
                iconhtml += '<p class="tooltiptext" id="' + wsitename + '">'
                iconhtml += '<p style="font-size: 12px;margin-left: 11px;"><b>Queue Name :</b> entity_update</p>'
                iconhtml += '<div class="col-12" style="display:flex;">'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: 0px;font-size: 11px;"><b>isConnected :</b> False(' + entclient.connectionTries + ')</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:block;font-size: 16px;margin-left: 30px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconentconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconentclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '</div>'
                iconhtml += '<p style="font-size: 12px;margin-left: 12px;"><b>Lastconnect:</b>' + entitylastreconnect + '</p>'
                iconhtml += '</p>'
                iconhtml += '</div>'
                $('#entsitesname').empty()
                $('#entsitesname').append(iconhtml)*/
                document.getElementById(wsitename + 'entstatus-conn').innerText = 'False(' + entclient.connectionTries + ')'
                document.getElementById(wsitename + 'entstatus-conn').style.color = "#ff3d57";
                document.getElementById('entity-pipe').style.color = '#ff3d57'
                $("#entdisplay-icon" + wsitename).css('display', 'block');
                document.getElementById(wsitename + 'entlast-conn').innerText = "Lastconnect : " + entitylastreconnect

                entclient.connectionTries++;
                const timestamp = new Date;
                const date = new Date(timestamp);
                var month = date.getMonth() + 1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();
                var hour = date.getHours();
                var mins = date.getMinutes();
                var sec = date.getSeconds();
                var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                entitylastreconnect = formattedDate.toLocaleString();

                if (networkStatus === 'online') {
                    if (entclient.connectionTries >= 10) {
                        isToBeConnect = !{}[true];
                        /* swal({
                             title: "Want to get entity updates?",
                             text: "Not able to connect web socket of \"" + entclient.id + "\". Please check once!.",
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
                                     makeWebSocConnectionk8(entclient.ws.url, entclient.id, 0, entclient.criticalNodeCount)
                                    // location.reload();
                                 } else {
                                     isToBeConnect = !{}[true];
                                     entclient.disconnect();
                                    // $("#node-view #" + entclient.id + "-indicator").css('background', '#ff3d57')
                                 }
                             });*/
                    }
                    else {
                        // entclient.connectionTries++;
                        const timestamp = new Date;
                        const date = new Date(timestamp);
                        var month = date.getMonth() + 1;//months (0-11)
                        var day = date.getDate();//day (1-31)
                        var year = date.getFullYear();
                        var hour = date.getHours();
                        var mins = date.getMinutes();
                        var sec = date.getSeconds();
                        var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                        entitylastreconnect = formattedDate.toLocaleString();
                        /*var iconhtml = ''
                        iconhtml += '<div class="row tooltip">'
                        iconhtml += '<p class="tooltiptext" id="' + wsitename + '">'
                        iconhtml += '<p style="font-size: 12px;margin-left: 11px;"><b>Queue Name :</b> entity_update</p>'
                        iconhtml += '<div class="col-12" style="display:flex;">'
                        iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: 0px;font-size: 11px;"><b>isConnected :</b> Trying(' + entclient.connectionTries + ')</p>'
                        iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:block;font-size: 16px;margin-left: 30px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconentconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconentclose(\'' + wsitename + '\')" ></i ></p>'
                        iconhtml += '</div>'
                        iconhtml += '<p style="font-size: 12px;margin-left: 12px;"><b>Lastconnect:</b>' + entitylastreconnect + '</p>'
                        iconhtml += '</p>'
                        iconhtml += '</div>'
                        $('#entsitesname').empty()
                        $('#entsitesname').append(iconhtml)*/
                        document.getElementById(wsitename + 'entstatus-conn').innerText = 'Trying(' + entclient.connectionTries + ')'
                        document.getElementById(wsitename + 'entstatus-conn').style.color = "#e99123";
                        document.getElementById('entity-pipe').style.color = '#e99123'
                        $("#entdisplay-icon" + wsitename).css('display', 'block');
                        document.getElementById(wsitename + 'entlast-conn').innerText = "Lastconnect : " + entitylastreconnect
                        if (isToBeConnect = {}[true]) {
                            makeWebSocConnectionk8(entclient.ws.url, entclient.id, entclient.connectionTries, entclient.criticalNodeCount)
                        }
                    }
                }
            };
            entclient.connect(window.LE_WS_USER, window.LE_WS_PASS, on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}
