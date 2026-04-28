var adplastreconnect = "";
var aClient = {}
var adpobj = {}
//var isToBeConnect = {}[true];
// var astompClient = '';
function displaytooltips(wsname, sname) {
    if (document.getElementById(sname).classList.contains('showns')) {
        document.getElementById(wsname).classList.remove('border-clrs')
        document.getElementById(sname).classList.remove('showns')
    } else {
        document.getElementById(wsname).classList.add('border-clrs')
        document.getElementById(sname).classList.add('showns')
    }
}

var sitesname = 'asitesname'
var wsocname = 'adp-pipe'
var adphtml = '<div class="indicator" id="adp-pipe"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats" onclick="displaytooltips(\''+ wsocname + '\',\'' + sitesname + '\')"> \
                        <span class="tooltiptext" id="asitesname" style="overflow-y:scroll">\
                        <p><b>Queue Name :</b> adp_update</p> \
                        </span> \
                    </i> \
                 </div>'
$('#adp-html').empty()
$("#adp-html").append(adphtml);

function iconclose(ip) {
    isToBeConnect = !{}[true];
    if (adpobj[ip]) {
        adpobj[ip].disconnect();
    }
}

function iconconnect(ip) {
    isToBeConnect = {}[true];
    connectAdpWebSocket(adpobj[ip].ws.url, adpobj[ip].id, 0)
}

function connectAdpWebSocket(wsUrl, wsiteName, tries, adp) {
    console.log("WebSocket Connection Attempt:", { url: wsUrl, site: wsiteName, tries: tries });
    var astompClient = 'client' + (adp)
    try {
        if (window.WebSocket) {
            var destination = "/exchange/adp_update";
            astompClient = Stomp.client(wsUrl);
            //  var WSObject = new WebSocket(wsUrl);
            //  var astompClient = Stomp.over(WSObject);
            astompClient.id = wsiteName
            astompClient.connectionTries = tries;
            adpobj[wsiteName] = astompClient
            var iconhtml = ''
            iconhtml += '<div class="row tooltiping">'
            iconhtml += '<table>';
            iconhtml += '<thead></thead>';
            iconhtml += '<tbody class="row">';
            iconhtml += '<tr class="col-12">';
            iconhtml += '<td class="col-8 details_td" style="width: 100px;">isConnected</td>';
            iconhtml += '<td class="col-4 details_ts" id="' + wsiteName + 'astatus-conn" ></td>';
            iconhtml += '</tr>';
            iconhtml += '</tbody>';
            iconhtml += '</table>';
            iconhtml += ' <p class="tooltiptexting" id="' + wsiteName + 'alast-conn"></p>'
            //iconhtml += '<p class="col-9" style="color:#ffffff" id="' + wsitename + '"></p>'
            iconhtml += '<p class="col-3" id="adisplay-icon' + wsiteName + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
            iconhtml += '</div>'
            $('#asitesname').append(iconhtml)
            var on_conn = function () {
                var obj = adpSitesData[0] //.filter(x => x.site === stompClient.id)[0]
                //  console.log("obj ===>" + JSON.stringify(obj))
                obj.isWSConnected = true;
                isToBeConnect = {}[true];
                isWSConnected = true;
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsiteName + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> adp_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> True(0)</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsiteName + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + adplastreconnect + '</p>'
                iconhtml += '</div>'
                $('#asitesname').empty()
                $('#asitesname').append(iconhtml)*/
                document.getElementById(wsiteName + 'astatus-conn').innerText = 'True(0)'
                document.getElementById(wsiteName + 'astatus-conn').style.color = "#16d39a";
                document.getElementById('adp-pipe').style.color = '#16d39a'
                $("#adisplay-icon" + wsiteName).css('display', 'none');
                document.getElementById(wsiteName + 'alast-conn').innerText = "Lastconnect : " + adplastreconnect
                // astompClient.connectionTries = 0;
                //console.log(document.getElementById("bodeod-pipe"))
                astompClient.subscribe(destination, function (message) {
                    //  console.log('ADP WS MESSAGE--->' + message)
                    var tempJson = JSON.parse(message.body);
                    var isSiteFound = adpSitesData.some(el => el.site == tempJson.site);

                    // Skip if live updates are paused in the UI
                    if (window.ASPage && window.ASPage.liveEnabled === false) return;

                    if (tempJson.mode == 'ALL' && tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site") }, "GET").done(function (response) {
                            if (typeof displaykeys === 'function')
                                displayKeys(response.responseData[0], response.refreshedsite)
                            if (typeof ledColors === 'function')
                                ledColors(selected_sitename, selected_leurl, selected_websocurl)
                        })
                        if (pageName != "ADP-Status") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }

                        // Refresh APM charts if they are on the page
                        if (window.MQPage && typeof window.MQPage.refresh === 'function') window.MQPage.refresh();
                        if (window.LatencyPage && typeof window.LatencyPage.refresh === 'function') window.LatencyPage.refresh();

                    } else if (tempJson.mode == 'ADP' && tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'ADP' }, "GET").done(function (response) {
                            if (typeof ledColors === 'function')
                                ledColors(selected_sitename, selected_leurl, selected_websocurl)
                            allAdpData = response;
                            if (typeof switchSubsite === 'function')
                                switchSubsite(activeSubsite);
                            else if (typeof adpdisplaykeys === 'function')
                                adpdisplaykeys(response.responseData[0], response.refreshedsite)
                        })
                        if (pageName != "ADP-Status") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }

                        // Refresh APM charts if they are on the page
                        if (window.MQPage && typeof window.MQPage.refresh === 'function') window.MQPage.refresh();
                        if (window.LatencyPage && typeof window.LatencyPage.refresh === 'function') window.LatencyPage.refresh();
                    }
                });

                $("#adp-status #" + astompClient.id + "-indicator").css('background', '#16d39a')
                // this.connectionTries = 6
            }
            var on_err = function (error) {
                $("#adp-status #" + astompClient.id + "-indicator").css('background', '#ff3d57')
                var obj = adpSitesData[0] //.filter(x => x.site === stompClient.id)[0]
                obj.isWSConnected = false;
                isToBeConnect = !{}[true];
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsiteName + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> adp_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> False(' + astompClient.connectionTries + ')</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsiteName + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + adplastreconnect + '</p>'
                iconhtml += '</div>'
                $('#asitesname').empty()
                $('#asitesname').append(iconhtml)*/
                document.getElementById(wsiteName + 'astatus-conn').innerText = 'False(' + astompClient.connectionTries + ')'
                document.getElementById(wsiteName + 'astatus-conn').style.color = "#ff3d57";
                document.getElementById('adp-pipe').style.color = '#ff3d57'
                $("#adisplay-icon" + wsiteName).css('display', 'block');
                document.getElementById(wsiteName + 'alast-conn').innerText = "Lastconnect : " + adplastreconnect
                //$("#bodeod-pipe").css('color', '#ff3d57')
                astompClient.connectionTries++;
                const timestamp = new Date;
                const date = new Date(timestamp);
                var month = date.getMonth() + 1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();
                var hour = date.getHours();
                var mins = date.getMinutes();
                var sec = date.getSeconds();
                var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                adplastreconnect = formattedDate.toLocaleString();

                //console.log(document.getElementById("bodeod-pipe"))
                if (networkStatus === 'online') {
                    if (astompClient.connectionTries >= 10) {
                        isToBeConnect = !{}[true];
                        // astompClient.connectionTries--;
                        /*  swal({
                              title: "Want to get adapter updates?",
                              text: "Not able to connect web socket of \"" + astompClient.id + "\". Please check once!.",
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
                                     // console.log("if----->")
                                      connectAdpWebSocket(astompClient.ws.url, astompClient.id, 0)
                                      //location.reload();
                                  } else {
                                    //  console.log("else----->")
                                      isToBeConnect = !{}[true];
                                      astompClient.disconnect();
                                      $("#adp-status #" + astompClient.id + "-indicator").css('background', '#ff3d57')
                                  }
                              });*/
                    }
                    else {

                        // astompClient.connectionTries++;
                        const timestamp = new Date;
                        const date = new Date(timestamp);
                        var month = date.getMonth() + 1;//months (0-11)
                        var day = date.getDate();//day (1-31)
                        var year = date.getFullYear();
                        var hour = date.getHours();
                        var mins = date.getMinutes();
                        var sec = date.getSeconds();
                        var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                        adplastreconnect = formattedDate.toLocaleString();
                        /*var iconhtml = ''
                        iconhtml += '<div class="row tooltip" style="line-height:5px; display:flex !important">'
                        iconhtml += ' <p class="tooltiptext" id="' + wsiteName + '"></p>'
                        iconhtml += ' <p><b>Queue Name :</b> adp_update</p>'
                        iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> Trying(' + astompClient.connectionTries + ')</p>'
                        iconhtml += '<p class="col-3" id="display-icon' + wsiteName + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
                        iconhtml += '<p><b>Lastconnect:</b>' + adplastreconnect + '</p>'
                        iconhtml += '</div>'
                        $('#asitesname').empty()
                        $('#asitesname').append(iconhtml)*/
                        document.getElementById(wsiteName + 'astatus-conn').innerText = 'Trying(' + astompClient.connectionTries + ')'
                        document.getElementById(wsiteName + 'astatus-conn').style.color = "#e99123";
                        document.getElementById('adp-pipe').style.color = '#e99123'
                        $("#adisplay-icon" + wsiteName).css('display', 'block');
                        document.getElementById(wsiteName + 'alast-conn').innerText = "Lastconnect : " + adplastreconnect
                        //   console.log("astompClient.connectionTries --> " + astompClient.connectionTries)
                        if (isToBeConnect = {}[true]) {
                            //       console.log("isToBeConnect--if-->")
                            connectAdpWebSocket(astompClient.ws.url, astompClient.id, astompClient.connectionTries)
                        }
                        //console.log("astompClient.connectionTries --> " + astompClient.connectionTries)
                        // isToBeConnect = false;
                    }
                }
            };
            astompClient.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}
