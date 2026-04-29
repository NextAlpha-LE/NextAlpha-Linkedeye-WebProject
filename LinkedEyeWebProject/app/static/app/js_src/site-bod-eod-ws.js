var bodlastreconnect = "";
var bclient = {}
var bodobj = {}
var hasBeenAppends = false;
//var isToBeConnect = {}[true];
// var bstompClient = '';

function displaytooltip(wsname, sname) {
    const tooltip = document.getElementById(sname);
    const wrapper = document.getElementById(wsname);

    if (tooltip.classList.contains('shown')) {
        // If the tooltip is already shown, close it
        tooltip.classList.remove('shown');
        wrapper.classList.remove('border-clr');
    } else {
        // Close all other tooltips
        closeAllsiteTooltips(tooltip);

        // Open the clicked tooltip
        tooltip.classList.add('shown');
        wrapper.classList.add('border-clr');
    }
}
/*function displaytooltip(wsname, sname) {
    if (document.getElementById(sname).classList.contains('shown')) {
        document.getElementById(wsname).classList.remove('border-clr')
        document.getElementById(sname).classList.remove('shown')
    } else {
        document.getElementById(wsname).classList.add('border-clr')
        document.getElementById(sname).classList.add('shown')
    }
}*/

var sitesname = 'bsitesname'
var wsocname = 'bodeod-pipe'
var bodhtml = '<div class="indicator" id="bodeod-pipe"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats" onclick="displaytooltip(\''+ wsocname + '\',\'' + sitesname + '\')"> \
                        <span class="tooltiptext" id="bsitesname" style="overflow-y:scroll">\
                        <p><b>Queue Name :</b> bod_update</p> \
                        </span> \
                    </i> \
                 </div>'
$('#bodeod-html').empty()
$("#bodeod-html").append(bodhtml);

function iconclose(ip) {
    isToBeConnect = !{}[true];
    if (bodobj[ip]) {
        bodobj[ip].disconnect();
    }
}

function iconconnect(ip) {
    isToBeConnect = {}[true];
    connectbodWebSocket(bodobj[ip].ws.url, bodobj[ip].id, 0)
}

function connectbodWebSocket(wsUrl, wsiteName, tries, bdp) {
    // console.log("bod-eod websocket called")
    // console.log("bod-eod websocket called====>"+wsiteName)
    var bstompClient = 'client' + (bdp)
    try {
        if (window.WebSocket) {
            var destination = "/exchange/bod_update";
            bstompClient = Stomp.client(wsUrl);
            // var WSObject = new WebSocket(wsUrl);
            // var bstompClient = Stomp.over(WSObject);
            bstompClient.id = wsiteName
            bstompClient.connectionTries = tries;
            bodobj[wsiteName] = bstompClient
            //  if (document.getElementById(wsiteName) == null) {
            var iconhtml = ''
            if (!hasBeenAppends) {
                iconhtml += '<div class="row tooltiping">'
                iconhtml += '<table>';
                iconhtml += '<thead></thead>';
                iconhtml += '<tbody class="row">';
                iconhtml += '<tr class="col-12">';
                iconhtml += '<td class="col-8 details_td" style="width: 100px;">isConnected</td>';
                iconhtml += '<td class="col-4 details_ts" id="' + wsiteName + 'bodstatus-conn" ></td>';
                iconhtml += '</tr>';
                iconhtml += '</tbody>';
                iconhtml += '</table>';
                iconhtml += ' <p class="tooltiptexting" id="' + wsiteName + 'bodlast-conn"></p>'
                //iconhtml += '<p class="col-9" style="color:#ffffff" id="' + wsitename + '"></p>'
                iconhtml += '<p class="col-3" id="bdisplay-icon' + wsiteName + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
                iconhtml += '</div>'
                hasBeenAppends = true;
            }
            $('#bsitesname').append(iconhtml)
            //}

            var on_conn = function () {
                var obj = bodSitesData[0] //.filter(x => x.site === stompClient.id)[0]
                if (obj) obj.isWSConnected = true;
                isToBeConnect = {}[true];
                isWSConnected = true;
                //  bstompClient.connectionTries = 0;
                // $("#bodeod-pipe").css('color', '#16d39a')

                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsiteName + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> bod_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> True(0)</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsiteName + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect :</b>' + bodlastreconnect + '</p>'
                iconhtml += '</div>'
                $('#bsitesname').empty()
                $('#bsitesname').append(iconhtml)*/
                document.getElementById(wsiteName + 'bodstatus-conn').innerText = 'True(0)'
                document.getElementById(wsiteName + 'bodstatus-conn').style.color = "#16d39a";
                document.getElementById('bodeod-pipe').style.color = '#16d39a'
                $("#bdisplay-icon" + wsiteName).css('display', 'none');
                document.getElementById(wsiteName + 'bodlast-conn').innerText = "Lastconnect : " + bodlastreconnect
                //console.log(document.getElementById("bodeod-pipe"))
                bstompClient.subscribe(destination, function (message) {
                    //    console.log('BOD_EOD WS MESSAGE--->' + message)
                    var tempJson = JSON.parse(message.body);
                    var isSiteFound = bodSitesData.some(el => el.site == tempJson.site);
                    if (tempJson.mode == 'ALL' && tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site") }, "GET").done(function (response) {
                            if (typeof ledColors === 'function') {
                                var s_name = typeof selected_sitename !== 'undefined' ? selected_sitename : (typeof siteName !== 'undefined' ? siteName : '');
                                var s_url = typeof selected_leurl !== 'undefined' ? selected_leurl : (typeof mySubString !== 'undefined' ? mySubString : '');
                                var s_ws = typeof selected_websocurl !== 'undefined' ? selected_websocurl : (typeof websocketurl !== 'undefined' ? websocketurl : '');
                                ledColors(s_name, s_url, s_ws);
                            }
                            if (typeof displayKeys === 'function')
                                displayKeys(response.responseData[0], response.refreshedsite)
                        })
                        if (pageName != "BOD-EODStatus") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }
                    } else if (tempJson.mode == 'BOD' && tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'BOD' }, "GET").done(function (response) {
                            if (typeof ledColors === 'function') {
                                var s_name = typeof selected_sitename !== 'undefined' ? selected_sitename : (typeof siteName !== 'undefined' ? siteName : '');
                                var s_url = typeof selected_leurl !== 'undefined' ? selected_leurl : (typeof mySubString !== 'undefined' ? mySubString : '');
                                var s_ws = typeof selected_websocurl !== 'undefined' ? selected_websocurl : (typeof websocketurl !== 'undefined' ? websocketurl : '');
                                ledColors(s_name, s_url, s_ws);
                            }
                            if (typeof displayKeys === 'function')
                                displayKeys(response.responseData[0], response.refreshedsite)
                        })
                        if (pageName != "BOD-EODStatus") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }
                    }/* else if (tempJson.mode == 'EOD' && tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"),mode:'EOD' }, "GET").done(function (response) {
                            eoddisplayKeys(response.responseData[0], response.refreshedsite)
                        })
                        if (pageName != "EOD-Status") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }
                    } else if (tempJson.mode == 'ADP' && tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site") ,mode:'ADP'}, "GET").done(function (response) {
                            adpdisplayKeys(response.responseData[0], response.refreshedsite)
                        })
                        if (pageName != "ADP-Status") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }
                    }*/
                });

                $("#bod-eodstatus #" + bstompClient.id + "-indicator").css('background', '#16d39a')
                // this.connectionTries = 6
            }
            var on_err = function (error) {
                $("#bod-eodstatus #" + bstompClient.id + "-indicator").css('background', '#ff3d57')
                var obj = bodSitesData[0] //.filter(x => x.site === stompClient.id)[0]
                if (obj) obj.isWSConnected = false;
                isToBeConnect = !{}[true];
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsiteName + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> bod_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> False(' + bstompClient.connectionTries + ')</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsiteName + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + bodlastreconnect + '</p>'
                iconhtml += '</div>'
                $('#bsitesname').empty()
                $('#bsitesname').append(iconhtml)*/
                document.getElementById(wsiteName + 'bodstatus-conn').innerText = 'False(' + bstompClient.connectionTries + ')'
                document.getElementById(wsiteName + 'bodstatus-conn').style.color = "#ff3d57";
                document.getElementById('bodeod-pipe').style.color = '#ff3d57'
                $("#bdisplay-icon" + wsiteName).css('display', 'block');
                document.getElementById(wsiteName + 'bodlast-conn').innerText = "Lastconnect : " + bodlastreconnect
                //$("#bodeod-pipe").css('color', '#ff3d57')
                /*var bodhtml = '<div class="indicator" id="bodeod-pipe" style="color:#ff3d57"> \
                    <i class="mdi mdi-close-network-outline tooltip" id="icon-chats"> \
                        <span class="tooltiptext"><p><b>Queue Name :</b> bod_update</p> \
                        <p><b>isConnected :</b> False</p> \
                        <p><b>Reconnect	:</b> '+ bstompClient.connectionTries + '</p> \
                        <p><b>Lastconnect:</b>'+ bodlastreconnect + '</p></span> \
                    </i> \
                    </div>'
                $('#bodeod-html').empty()
                $("#bodeod-html").append(bodhtml);*/
                bstompClient.connectionTries++;
                const timestamp = new Date;
                const date = new Date(timestamp);
                var month = date.getMonth() + 1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();
                var hour = date.getHours();
                var mins = date.getMinutes();
                var sec = date.getSeconds();
                var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                bodlastreconnect = formattedDate.toLocaleString();

                //console.log(document.getElementById("bodeod-pipe"))
                if (networkStatus === 'online') {
                    if (bstompClient.connectionTries >= 10) {
                        isToBeConnect = !{}[true];
                        /* swal({
                             title: "Want to get bod-eod updates?",
                             text: "Not able to connect web socket of \"" + bstompClient.id + "\". Please check once!.",
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
                                     connectWebSocket(bstompClient.ws.url, bstompClient.id, 0)
                                    // location.reload();
                                 } else {
                                     isToBeConnect = !{}[true];
                                     bstompClient.disconnect();
                                     $("#bod-eodstatus #" + bstompClient.id + "-indicator").css('background', '#ff3d57')
                                 }
                             });*/
                    }
                    else {
                        // bstompClient.connectionTries++;
                        const timestamp = new Date;
                        const date = new Date(timestamp);
                        var month = date.getMonth() + 1;//months (0-11)
                        var day = date.getDate();//day (1-31)
                        var year = date.getFullYear();
                        var hour = date.getHours();
                        var mins = date.getMinutes();
                        var sec = date.getSeconds();
                        var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                        bodlastreconnect = formattedDate.toLocaleString();
                        /*var iconhtml = ''
                        iconhtml += '<div class="row tooltip" style="line-height:5px; display:flex !important">'
                        iconhtml += ' <p class="tooltiptext" id="' + wsiteName + '"></p>'
                        iconhtml += ' <p><b>Queue Name :</b> bod_update</p>'
                        iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> Trying(' + bstompClient.connectionTries + ')</p>'
                        iconhtml += '<p class="col-3" id="display-icon' + wsiteName + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsiteName + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsiteName + '\')" ></i ></p>'
                        iconhtml += '<p><b>Lastconnect:</b>' + bodlastreconnect + '</p>'
                        iconhtml += '</div>'
                        $('#bsitesname').empty()
                        $('#bsitesname').append(iconhtml)*/
                        document.getElementById(wsiteName + 'bodstatus-conn').innerText = 'Trying(' + bstompClient.connectionTries + ')'
                        document.getElementById(wsiteName + 'bodstatus-conn').style.color = "#e99123";
                        document.getElementById('bodeod-pipe').style.color = '#e99123'
                        $("#bdisplay-icon" + wsiteName).css('display', 'block');
                        document.getElementById(wsiteName + 'bodlast-conn').innerText = "Lastconnect : " + bodlastreconnect
                        /*var bodhtml = '<div class="indicator" id="bodeod-pipe" style="color:#e99123"> \
                            <i class="mdi mdi-help-network-outline tooltip" id="icon-chats"> \
                                <span class="tooltiptext"><p><b>Queue Name :</b> bod_update</p> \
                                <p><b>isConnected :</b> Trying</p> \
                                <p><b>Reconnect	:</b> '+ bstompClient.connectionTries + '</p> \
                                <p><b>Lastconnect:</b>'+ bodlastreconnect + '</p></span> \
                            </i> \
                            </div>'
                        $('#bodeod-html').empty()
                        $("#bodeod-html").append(bodhtml);*/
                        if (isToBeConnect = {}[true]) {
                            connectbodWebSocket(bstompClient.ws.url, bstompClient.id, bstompClient.connectionTries)
                        }
                        //console.log("connectWebSocket1 --> " + connectionTries++)
                    }
                }
            };
            bstompClient.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}
