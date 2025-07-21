var ticketlastreconnect = "";
var tclient = {}
//var isToBeConnect = {}[true];
// var ticketclient = '';
var ticketobj = {}

function displaytickettooltips(wsname, sname) {
    if (document.getElementById(sname).classList.contains('ticketshown')) {
        document.getElementById(wsname).classList.remove('ticketborder-clr')
        document.getElementById(sname).classList.remove('ticketshown')
    } else {
        document.getElementById(wsname).classList.add('ticketborder-clr')
        document.getElementById(sname).classList.add('ticketshown')
    }
}

var sitesname = 'ticketsitesname'
var wsocname = 'ticket-pipe'
var tickethtml = '<div class="" id="ticket-pipe"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats" onclick="displaytickettooltips(\''+ wsocname + '\',\'' + sitesname + '\')"> \
                        <span class="tooltiptext" id="ticketsitesname" style="overflow-y:scroll">\
                        </span> \
                    </i> \
                 </div>'
$('#ticketupdate-indicator').empty()
$("#ticketupdate-indicator").append(tickethtml);

function iconclose(ip) {
    isToBeConnect = !{}[true];
    if (ticketobj[ip]) {
        ticketobj[ip].disconnect();
    }
}

function iconconnect(ip) {
    isToBeConnect = {}[true];
    makeWsConnection(ticketobj[ip].ws.url, ticketobj[ip].id, 0)
}

function makeWsConnection(websocketurl, wsitename, tries, ticketCount, ticketws) {
    //  console.log("ticket websocket connected")
    var ticketclient = 'client' + (ticketws)
    //  console.log("ticketclient---->"+ticketclient)
    try {
        if (window.WebSocket) {
            var destination = "/exchange/ticket_update";
            ticketclient = Stomp.client(websocketurl);
            // var wsObject = new WebSocket(websocketurl);
            // var Client = Stomp.over(wsObject);
            ticketclient.id = wsitename
            ticketclient.connectionTries = tries;
            ticketclient.criticalTicketCount = ticketCount;
            ticketobj[wsitename] = ticketclient
            var on_wsconnect = function () {
                var obj = ticketSitesData[0] //.filter(x => x.site === Client.id)[0]
                if (obj)
                    obj.isWSConnected = true;
                isToBeConnect = {}[true];
               // ticketclient.connectionTries = 0;
                var iconhtml = ''
                iconhtml += '<div class="row tooltip">'
                iconhtml += '<p class="tooltiptext" id="' + wsitename + '">'
                iconhtml += '<p style="font-size: 12px;margin-left: 0px;margin-bottom: 0px;"><b>Queue Name :</b> ticket_update</p>'
                iconhtml += '<div class="col-12" style="display:contents;">'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: 0px;font-size: 11px;display:contents;"><b>isConnected :</b> True(0)</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;font-size: 16px;margin-left: 30px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '</div>'
                iconhtml += '<p style="font-size: 12px;margin-left: 0px;"><b>Lastconnect:</b>' + ticketlastreconnect + '</p>'
                iconhtml += '</p>'
                iconhtml += '</div>'
                $('#ticketsitesname').empty()
                $('#ticketsitesname').append(iconhtml)
                document.getElementById('ticket-pipe').style.color = '#16d39a'
                $("#display-icon" + wsitename).css('display', 'none');
               /* var tickethtml = '<div class="" id="ticket-pipe" style="color:#16d39a"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats"> \
                        <span class="tooltiptext"><p><b>Queue Name :</b> ticket_update</p> \
                        <p><b>isConnected :</b> True</p> \
                        <p><b>Reconnect	:</b> 0 </p> \
                        <p><b>Lastconnect:</b>'+ ticketlastreconnect + '</p></span> \
                    </i> \
                    </div>'
                $('#ticketupdate-indicator').empty()
                $("#ticketupdate-indicator").append(tickethtml);*/
                ticketclient.subscribe(destination, function (message) {
                    var tempJson = JSON.parse(message.body);
                    item = {}
                    item["id"] = (tempJson['ticket_number']).toString()
                    item["content"] = tempJson['ticket_number'].toString()
                    item["start"] = new Date(tempJson['datetime'] * 1000)
                    tempJson['ticket_status'] == 'In Progress' ? status = 'Progress' : status = tempJson['ticket_status'];
                    if (status == "New") {
                        ticketclient.criticalTicketCount++;
                    }
                    else {
                        ticketclient.criticalTicketCount--;
                    }
                    item["className"] = status + ' newItem';
                    data = {};
                    jsonObj = {};
                    data["user"] = tempJson['ticket_assignee']
                    data["title"] = 'Linkedeye Ticket update'
                    // data["body"] = 'Ticket update received. Ticket status is'+tempJson['ticket_status']+'. Ticket assigned to '+tempJson['ticket_assignee']+'. Ticket number is '+tempJson['ticket_number']
                    url = new URL("/ticket/?isInfopage=true&site=" + ticketclient.id, window.location.origin)
                    var html = ''
                    html += '<p>Ticket update received. Ticket status is <b>' + tempJson['ticket_status'] + '</b>. Ticket assiged to ' + tempJson['ticket_assignee'] + '.</p>'
                    html += '<p>Ticket number is <a href="' + url + '">' + tempJson['ticket_number'] + '</a></p>'
                    data["body"] = html
                    data["textbody"] = 'Ticket update received. Ticket status is ' + tempJson['ticket_status'] + '. Ticket assigned to ' + tempJson['ticket_assignee'] + '. Ticket number is ' + tempJson['ticket_number']
                    data["template_type"] = "monitoring"
                    data["dataObj"] = { 'ticket_assignee': tempJson['ticket_assignee'], 'ticket_status': tempJson['ticket_status'], 'ticket_number': tempJson['ticket_number'], 'ticket_message': tempJson['ticket_message'], 'url': url };
                    jsonObj["data"] = data;
                    requestDataFromServer('/notificationsettings/sendnotifications', { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(function (res) {
                    });
                    if (ticketclient.id == ticketSelectedsite) {
                        var timelineData = timeline.getData();
                        var isEntryfound = timelineData.some(el => el.id == tempJson['ticket_number']);
                        if (tempJson['ticket_assignee'] == selecteduser || loginuser == 'admin') {
                            if (!isEntryfound) {
                                timeline.addItem(item)
                                timeline.redraw();
                                timeline.setVisibleChartRangeAuto();
                            }
                            else {
                                var index = timelineData.findIndex(x => x.id == tempJson['ticket_number']);
                                timeline.updateData(index, item)
                                timeline.redraw();
                                timeline.setVisibleChartRangeAuto();
                            }
                        }
                    }
                    changeTicketSiteStatus(ticketclient.id, ticketclient.criticalTicketCount)
                });
                //  $("#ticketupdate-indicator").css('color', '#16d39a')
                $("#tickettemplate #" + ticketclient.id + "-indicator").css('background', '#16d39a')
            };
            var on_wserror = function (error) {
                // $("#ticketupdate-indicator").css('color', '#ff3d57')
                $("#tickettemplate #" + ticketclient.id + "-indicator").css('background', '#ff3d57')
                var obj = ticketSitesData[0] //.filter(x => x.site === Client.id)[0]
                if (obj)
                    obj.isWSConnected = false;
                isToBeConnect = !{}[true];
                var iconhtml = ''
                iconhtml += '<div class="row tooltip">'
                iconhtml += '<p class="tooltiptext" id="' + wsitename + '">'
                iconhtml += '<p style="font-size: 12px;margin-left: 2px;margin-bottom: 0px;"><b>Queue Name :</b> ticket_update</p>'
                iconhtml += '<div class="col-12" style="display:flex;margin-bottom:-20px;margin-left: -22px;">'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: 0px;font-size: 11px;"><b>isConnected :</b> False(' + ticketclient.connectionTries + ')</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:flex;font-size: 16px;margin-left: 30px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '</div>'
                iconhtml += '<p style="font-size: 12px;margin-left: 0px;"><b>Lastconnect:</b>' + ticketlastreconnect + '</p>'
                iconhtml += '</p>'
                iconhtml += '</div>'
                document.getElementById('ticket-pipe').style.color = '#ff3d57'
                $("#display-icon" + wsitename).css('display', 'block');
                $('#ticketsitesname').empty()
                $('#ticketsitesname').append(iconhtml)
               /* var tickethtml = '<div class="" id="ticket-pipe" style="color:#ff3d57"> \
                    <i class="mdi mdi-close-network-outline tooltip" id="icon-chats"> \
                        <span class="tooltiptext"><p><b>Queue Name :</b> ticket_update</p> \
                        <p><b>isConnected :</b> False</p> \
                        <p><b>Reconnect	:</b> '+ ticketclient.connectionTries + '</p> \
                        <p><b>Lastconnect:</b>'+ ticketlastreconnect + '</p></span> \
                    </i> \
                    </div>'
                $('#ticketupdate-indicator').empty()
                $("#ticketupdate-indicator").append(tickethtml);*/
                ticketclient.connectionTries++;
                const timestamp = new Date;
                const date = new Date(timestamp);
                var month = date.getMonth() + 1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();
                var hour = date.getHours();
                var mins = date.getMinutes();
                var sec = date.getSeconds();
                var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                ticketlastreconnect = formattedDate.toLocaleString();

                if (networkStatus === 'online') {
                    if (ticketclient.connectionTries >= 10) {
                        isToBeConnect = !{}[true];
                       /* swal({
                            title: "Want to get ticket updates?",
                            text: "Not able to connect web socket of \"" + ticketclient.id + "\". Please check once!.",
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
                                    makeWsConnection(ticketclient.ws.url, ticketclient.id, 0, ticketclient.criticalTicketCount)
                                   // location.reload();

                                } else {
                                    isToBeConnect = !{}[true];
                                    ticketclient.disconnect();
                                    $("#tickettemplate #" + ticketclient.id + "-indicator").css('background', '#ff3d57')
                                }
                            });*/

                    }
                    else {
                      //  ticketclient.connectionTries++;
                        const timestamp = new Date;
                        const date = new Date(timestamp);
                        var month = date.getMonth() + 1;//months (0-11)
                        var day = date.getDate();//day (1-31)
                        var year = date.getFullYear();
                        var hour = date.getHours();
                        var mins = date.getMinutes();
                        var sec = date.getSeconds();
                        var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                        ticketlastreconnect = formattedDate.toLocaleString();
                        var iconhtml = ''
                        iconhtml += '<div class="row tooltip">'
                        iconhtml += '<p class="tooltiptext" id="' + wsitename + '">'
                        iconhtml += '<p style="font-size: 12px;margin-left: 2px;margin-bottom: 0px;"><b>Queue Name :</b> ticket_update</p>'
                        iconhtml += '<div class="col-12" style="display:flex;margin-bottom:-20px;margin-left: -22px;">'
                        iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: 0px;font-size: 11px;"><b>isConnected :</b> Trying(' + ticketclient.connectionTries + ')</p>'
                        iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:flex;font-size: 16px;margin-left: 30px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                        iconhtml += '</div>'
                        iconhtml += '<p style="font-size: 12px;margin-left: 0px;"><b>Lastconnect:</b>' + ticketlastreconnect + '</p>'
                        iconhtml += '</p>'
                        iconhtml += '</div>'
                        document.getElementById('ticket-pipe').style.color = '#e99123'
                        $("#display-icon" + wsitename).css('display', 'block');
                        $('#ticketsitesname').empty()
                        $('#ticketsitesname').append(iconhtml)
                       /* var tickethtml = '<div class="" id="ticket-pipe" style="color:#e99123"> \
                            <i class="mdi mdi-help-network-outline tooltip" id="icon-chats"> \
                                <span class="tooltiptext"><p><b>Queue Name :</b> ticket_update</p> \
                                <p><b>isConnected :</b> Trying</p> \
                                <p><b>Reconnect	:</b> '+ ticketclient.connectionTries + '</p> \
                                <p><b>Lastconnect:</b>'+ ticketlastreconnect + '</p></span> \
                            </i> \
                            </div>'
                        $('#ticketupdate-indicator').empty()
                        $("#ticketupdate-indicator").append(tickethtml);*/
                        if (isToBeConnect = {}[true]) {
                            makeWsConnection(ticketclient.ws.url, ticketclient.id, ticketclient.connectionTries, ticketclient.criticalTicketCount)
                        }
                    }
                }
            };
            ticketclient.connect('linkedeye', 'linkedeye', on_wsconnect, on_wserror, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}

