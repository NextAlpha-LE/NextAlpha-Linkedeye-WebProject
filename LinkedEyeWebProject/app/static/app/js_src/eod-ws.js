var eodlastreconnect = "";
var eodclient = {}
var eodobj = {}
//var isToBeConnect = {}[true];
// var estompClient = '';
function displayeodtooltips(wsname, sname) {
    if (document.getElementById(sname).classList.contains('eodshown')) {
        document.getElementById(wsname).classList.remove('eodborder-clr')
        document.getElementById(sname).classList.remove('eodshown')
    } else {
        document.getElementById(wsname).classList.add('eodborder-clr')
        document.getElementById(sname).classList.add('eodshown')
    }
}

var sitesname = 'esitesname'
var wsocname = 'eod-pipe'
var eodhtml = '<div class="indicator" id="eod-pipe" onclick="displayeodtooltips(\''+ wsocname + '\',\'' + sitesname + '\')" style="cursor:pointer;"> \
                    <i class="mdi mdi-check-network-outline" id="icon-chats"> \
                        <span class="tooltiptext" id="esitesname">\
                        <p><b>Queue Name :</b> eod_update</p> \
                        </span> \
                    </i> \
                 </div>'
$('#eod-html').empty()
$("#eod-html").append(eodhtml);

function iconclose(ip) {
    isToBeConnect = !{}[true];
    if (eodobj[ip]) {
        eodobj[ip].disconnect();
    }
}

function iconconnect(ip) {
    isToBeConnect = {}[true];
    connectEodWebSocket(eodobj[ip].ws.url, eodobj[ip].id, 0)
}

function connectEodWebSocket(wsUrl, wsiteName, tries, eod) {
    // console.log("bod-eod websocket called")
    // console.log("bod-eod websocket called--->"+wsiteName)
    var estompClient = 'client' + (eod)
    try {
        if (window.WebSocket) {
            var destination = "/exchange/eod_update";
            estompClient = Stomp.client(wsUrl);
            // var WSObject = new WebSocket(wsUrl);
            // var estompClient = Stomp.over(WSObject);
            estompClient.id = wsiteName
            estompClient.connectionTries = tries;
            eodobj[wsiteName] = estompClient
            var iconhtml = ''
            iconhtml += '<div class="row tooltiping">'
            iconhtml += '<table>';
            iconhtml += '<thead></thead>';
            iconhtml += '<tbody class="row">';
            iconhtml += '<tr class="col-12">';
            iconhtml += '<td class="col-8 details_td" style="width: 100px;">isConnected</td>';
            iconhtml += '<td class="col-4 details_ts" id="' + wsiteName + 'estatus-conn" ></td>';
            iconhtml += '</tr>';
            iconhtml += '</tbody>';
            iconhtml += '</table>';
            iconhtml += ' <p class="tooltiptexting" id="' + wsiteName + 'elast-conn"></p>'
            //iconhtml += '<p class="col-9" style="color:#ffffff" id="' + wsitename + '"></p>'
            iconhtml += '<p class="col-3" id="edisplay-icon' + wsiteName + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
            iconhtml += '</div>'
            $('#esitesname').append(iconhtml)
            var on_conn = function () {
                var obj = eodSitesData[0] //.filter(x => x.site === stompClient.id)[0]
                obj.isWSConnected = true;
                isWSConnected = true;
                isToBeConnect = {}[true];
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsiteName + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> eod_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> True(0)</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsiteName + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + eodlastreconnect + '</p>'
                iconhtml += '</div>'
                $('#esitesname').empty()
                $('#esitesname').append(iconhtml)*/
                document.getElementById(wsiteName + 'estatus-conn').innerText = 'True(0)'
                document.getElementById(wsiteName + 'estatus-conn').style.color = "#16d39a";
                document.getElementById('eod-pipe').style.color = '#16d39a'
                $("#edisplay-icon" + wsiteName).css('display', 'none');
                document.getElementById(wsiteName + 'elast-conn').innerText = "Lastconnect : " + eodlastreconnect
                //  estompClient.connectionTries = 0;
                // $("#bodeod-pipe").css('color', '#16d39a')
                //console.log(document.getElementById("bodeod-pipe"))
                estompClient.subscribe(destination, function (message) {
                    //  console.log('EOD WS MESSAGE--->' + message)
                    var tempJson = JSON.parse(message.body);
                    var isSiteFound = eodSitesData.some(el => el.site == tempJson.site);
                    if (tempJson.mode == 'ALL' && tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site") }, "GET").done(function (response) {
                            if (typeof displayKeys === 'function')
                                displayKeys(response.responseData[0], response.refreshedsite)
                            if (typeof ledColors === 'function')
                                ledColors(selected_sitename, selected_leurl, selected_websocurl)
                        })
                        if (pageName != "EOD-Status") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }
                    }/* else if (tempJson.mode == 'BOD' && tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"),mode:'BOD' }, "GET").done(function (response) {
                            displayKeys(response.responseData[0], response.refreshedsite)
                        })
                        if (pageName != "BOD-EODStatus") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }
                    } else*/
                    //  console.log('isSiteFound---->' + isSiteFound + '\ntempJSON.mode----->' + tempJson.mode)
                    if (tempJson.mode == 'EOD' && tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'EOD' }, "GET").done(function (response) {
                            allEodData = response;
                            if (typeof switchSubsite === 'function')
                                switchSubsite(activeSubsite);
                            else if (typeof eoddisplaykeys === 'function')
                                eoddisplaykeys(response.responseData[0], response.refreshedsite)
                            if (typeof ledColors === 'function')
                                ledColors(selected_sitename, selected_leurl, selected_websocurl)
                        })
                        if (pageName != "EOD-Status") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }
                    } /*else if (tempJson.mode == 'ADP' && tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site") ,mode:'ADP'}, "GET").done(function (response) {
                            adpdisplayKeys(response.responseData[0], response.refreshedsite)
                        })
                        if (pageName != "ADP-Status") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }
                    }*/
                });

                $("#eod-status #" + estompClient.id + "-indicator").css('background', '#16d39a')
                // this.connectionTries = 6
            }
            var on_err = function (error) {
                $("#eod-status #" + estompClient.id + "-indicator").css('background', '#ff3d57')
                var obj = eodSitesData[0] //.filter(x => x.site === stompClient.id)[0]
                obj.isWSConnected = false;
                isToBeConnect = !{}[true];
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsiteName + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> eod_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> False(' + estompClient.connectionTries + ')</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsiteName + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + eodlastreconnect + '</p>'
                iconhtml += '</div>'
                $('#esitesname').empty()
                $('#esitesname').append(iconhtml)*/
                document.getElementById(wsiteName + 'estatus-conn').innerText = 'False(' + estompClient.connectionTries + ')'
                document.getElementById(wsiteName + 'estatus-conn').style.color = "#ff3d57";
                document.getElementById('eod-pipe').style.color = '#ff3d57'
                $("#edisplay-icon" + wsiteName).css('display', 'block');
                document.getElementById(wsiteName + 'elast-conn').innerText = "Lastconnect : " + eodlastreconnect
                //$("#bodeod-pipe").css('color', '#ff3d57')
                estompClient.connectionTries++;
                const timestamp = new Date;
                const date = new Date(timestamp);
                var month = date.getMonth() + 1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();
                var hour = date.getHours();
                var mins = date.getMinutes();
                var sec = date.getSeconds();
                var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                eodlastreconnect = formattedDate.toLocaleString();

                //console.log(document.getElementById("bodeod-pipe"))
                if (networkStatus === 'online') {
                    if (estompClient.connectionTries >= 10) {
                        isToBeConnect = !{}[true];
                        /* swal({
                             title: "Want to get eod updates?",
                             text: "Not able to connect web socket of \"" + estompClient.id + "\". Please check once!.",
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
                                     connectEodWebSocket(estompClient.ws.url, estompClient.id, 0)
                                    // location.reload();
                                 } else {
                                     isToBeConnect = !{}[true];
                                     estompClient.disconnect();
                                     $("#eod-status #" + estompClient.id + "-indicator").css('background', '#ff3d57')
                                 }
                             });*/
                    }
                    else {
                        // estompClient.connectionTries++;
                        const timestamp = new Date;
                        const date = new Date(timestamp);
                        var month = date.getMonth() + 1;//months (0-11)
                        var day = date.getDate();//day (1-31)
                        var year = date.getFullYear();
                        var hour = date.getHours();
                        var mins = date.getMinutes();
                        var sec = date.getSeconds();
                        var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                        eodlastreconnect = formattedDate.toLocaleString();
                        /*var iconhtml = ''
                        iconhtml += '<div class="row tooltip" style="line-height:5px; display:flex !important">'
                        iconhtml += ' <p class="tooltiptext" id="' + wsiteName + '"></p>'
                        iconhtml += ' <p><b>Queue Name :</b> eod_update</p>'
                        iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> Trying(' + estompClient.connectionTries + ')</p>'
                        iconhtml += '<p class="col-3" id="display-icon' + wsiteName + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
                        iconhtml += '<p><b>Lastconnect:</b>' + eodlastreconnect + '</p>'
                        iconhtml += '</div>'
                        $('#esitesname').empty()
                        $('#esitesname').append(iconhtml)*/
                        document.getElementById(wsiteName + 'estatus-conn').innerText = 'Trying(' + estompClient.connectionTries + ')'
                        document.getElementById(wsiteName + 'estatus-conn').style.color = "#e99123";
                        document.getElementById('eod-pipe').style.color = '#e99123'
                        $("#edisplay-icon" + wsiteName).css('display', 'block');
                        document.getElementById(wsiteName + 'elast-conn').innerText = "Lastconnect : " + eodlastreconnect
                        if (isToBeConnect = {}[true]) {
                            connectEodWebSocket(estompClient.ws.url, estompClient.id, estompClient.connectionTries)
                        }
                        //console.log("connectEodWebSocket1 --> " + connectionTries++)
                    }
                }
            };
            estompClient.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}
