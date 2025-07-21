var eclient = {}
// var entclient = '';
//var isToBeConnect = {}[true];
var entitylastreconnect = "";
var entobj = {}

function displayenttooltips(wsname, sname) {
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
/*function displayenttooltips(wsname, sname) {
    if (document.getElementById(sname).classList.contains('entshown')) {
        document.getElementById(wsname).classList.remove('entborder-clr')
        document.getElementById(sname).classList.remove('entshown')
    } else {
        document.getElementById(wsname).classList.add('entborder-clr')
        document.getElementById(sname).classList.add('entshown')
    }
}*/

var sitesname = 'entsitesname'
var wsocname = 'entity-pipe'
var entityhtml = '<div class="indicator" id="entity-pipe"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats" onclick="displayenttooltips(\''+ wsocname + '\',\'' + sitesname + '\')"> \
                        <span class="tooltiptext" id="entsitesname" style="overflow-y:scroll">\
                        <p><b>Queue Name :</b> entity_update</p> \
                        </span> \
                    </i> \
                 </div>'
$('#entity-html').empty()
$("#entity-html").append(entityhtml);

function iconclose(ip) {
    isToBeConnect = !{}[true];
    if (entobj[ip]) {
        entobj[ip].disconnect();
    }
}

function iconconnect(ip) {
    isToBeConnect = {}[true];
    makeWebSocConnectionk8entity(entobj[ip].ws.url, entobj[ip].id, 0)
}

function makeWebSocConnectionk8entity(websocketurl, wsitename, tries, nodeCount, letter) {
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
            entobj[wsitename] = entclient
            var iconhtml = ''
            iconhtml += '<div class="row tooltiping">'
            iconhtml += '<table>';
            iconhtml += '<thead></thead>';
            iconhtml += '<tbody class="row">';
            iconhtml += '<tr class="col-12">';
            iconhtml += '<td class="col-8 details_td" style="width: 100px;">isConnected</td>';
            iconhtml += '<td class="col-4 details_ts" id="' + wsitename + 'sestatus-conn" ></td>';
            iconhtml += '</tr>';
            iconhtml += '</tbody>';
            iconhtml += '</table>';
            iconhtml += ' <p class="tooltiptexting" id="' + wsitename + 'selast-conn"></p>'
            //iconhtml += '<p class="col-9" style="color:#ffffff" id="' + wsitename + '"></p>'
            iconhtml += '<p class="col-3" id="display-icone' + wsitename + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
            iconhtml += '</div>'
            $('#entsitesname').append(iconhtml)
            var on_conn = function () {
                wsConnected = true;
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = true;
                isToBeConnect = {}[true];
                //  entclient.connectionTries = 0;
                //$("#entity-pipe").css('color', '#16d39a')
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsitename + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> entity_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> True(0)</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + entitylastreconnect + '</p>'
                iconhtml += '</div>'
                $('#entsitesname').empty()
                $('#entsitesname').append(iconhtml)*/
                document.getElementById(wsitename + 'sestatus-conn').innerText = 'True(0)'
                document.getElementById(wsitename + 'sestatus-conn').style.color = "#16d39a";
                document.getElementById('entity-pipe').style.color = '#16d39a'
                $("#display-icone" + wsitename).css('display', 'none');
                document.getElementById(wsitename + 'selast-conn').innerText = "Lastconnect : " + entitylastreconnect
                entclient.subscribe(destination, function (message) {
                    // console.log('<---ENTITY NEW SITE WS MESSAGE--->')
                    var tempJson = JSON.parse(message.body);
                    //console.log('ENTITY-NEW-WS MESSAGE stringified --->' + JSON.stringify(tempJson))
                    var monitorStatus = tempJson.monitor_status;
                    var cygraphid = 's_swip_' + (tempJson['hostIp']).replaceAll('.', '_')
                    //  console.log('cyGraph[cygraphid] --->' + cyGraph[cygraphid])

                    if (monitorStatus === "CRITICAL" || monitorStatus === "DOWN" || monitorStatus === "UNREACHABLE" || monitorStatus === "FALSE" || monitorStatus === "WAITING") {
                        entclient.criticalNodeCount++;
                    }
                    else {
                        entclient.criticalNodeCount--;
                    }
                    // if (entclient.id == entitySelectedsite) {
                    var title = tempJson.title;
                    // if (title !== "") {
                    // if (cyGraph[cygraphid]) {
                    var id = titleToId[title];/////////////////////for logging the values////////////////////////
                    //var overview_data = tempJson.overviewstats['data']['overview'][tempJson['ip']]
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
                    var chartresponse = { "hardware": { "CRITICAL": hardware_critical, "OK": hardware_ok, "WARNING": hardware_warning, "UNKNOWN": hardware_unknown }, "software": { "CRITICAL": software_critical, "OK": software_ok, "WARNING": software_warning, "UNKNOWN": software_unknown }, "application": { "CRITICAL": application_critical, "OK": application_ok, "WARNING": application_warning, "UNKNOWN": application_unknown } };
                    //console.log('CHARTRESPONSE--->' + JSON.stringify(chartresponse))
                    if (typeof getnewchart === 'function') {
                        fillHostServiceCount(chartresponse)
                    }
                    var critic_val = hardware_critical + software_critical + application_critical
                    var warn_val = hardware_warning + software_warning + application_warning
                    //console.log('entity-new-site-ws CRITICAL_VAL-->' + critic_val + ' WARN_VAL-->' + warn_val)
                    if (critic_val > 0) {
                        document.getElementById('entityLED').style.color = '#ff3d57'
                       // $("#entityLED").removeClass("green").removeClass("amber").addClass('red')
                    } else if (warn_val > 0) {
                        document.getElementById('entityLED').style.color = '#e59105'
                        //$("#entityLED").removeClass("red").removeClass("green").addClass('amber')
                    } else {
                        //console.log('inside ws green')
                        document.getElementById('entityLED').style.color = '#16d39a'
                       // $("#entityLED").removeClass("red").removeClass("amber").addClass('green')
                    }
                    nodeSpecificDetails(id, title)
                    //  }
                    // }
                    //}
                   // changeSiteStatus(entclient.id, entclient.criticalNodeCount)
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
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsitename + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> entity_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> False(' + entclient.connectionTries + ')</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + entitylastreconnect + '</p>'
                iconhtml += '</div>'
                $('#entsitesname').empty()
                $('#entsitesname').append(iconhtml)*/
                document.getElementById(wsitename + 'sestatus-conn').innerText = 'False(' + entclient.connectionTries + ')'
                document.getElementById(wsitename + 'sestatus-conn').style.color = "#ff3d57";
                document.getElementById('entity-pipe').style.color = '#ff3d57'
                $("#display-icone" + wsitename).css('display', 'block');
                document.getElementById(wsitename + 'selast-conn').innerText = "Lastconnect : " + entitylastreconnect
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
                        /*swal({
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
                        iconhtml += '<div class="row tooltip" style="line-height:5px; display:flex !important">'
                        iconhtml += ' <p class="tooltiptext" id="' + wsitename + '"></p>'
                        iconhtml += ' <p><b>Queue Name :</b> entity_update</p>'
                        iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> Trying(' + entclient.connectionTries + ')</p>'
                        iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                        iconhtml += '<p><b>Lastconnect:</b>' + entitylastreconnect + '</p>'
                        iconhtml += '</div>'
                        $('#entsitesname').empty()
                        $('#entsitesname').append(iconhtml)*/
                        document.getElementById(wsitename + 'sestatus-conn').innerText = 'Trying(' + entclient.connectionTries + ')'
                        document.getElementById(wsitename + 'sestatus-conn').style.color = "#e99123";
                        document.getElementById('entity-pipe').style.color = '#e99123'
                        $("#display-icone" + wsitename).css('display', 'block');
                        document.getElementById(wsitename + 'selast-conn').innerText = "Lastconnect : " + entitylastreconnect
                        if (isToBeConnect = {}[true]) {
                            makeWebSocConnectionk8entity(entclient.ws.url, entclient.id, entclient.connectionTries, entclient.criticalNodeCount)
                        }
                    }
                }
            };
            entclient.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}
