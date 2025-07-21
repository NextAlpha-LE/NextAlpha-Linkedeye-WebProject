
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
////console.log("switch-update.Js called")
var sitesData = [];
entitySelectedsite = ' '
var siteResponse;
var entityResponse;
var sortedJson = {};
var nodeList;
var switchlastreconnect = "";
var map = {}
var sclient = {}
//var swiclient = '';
var portcount = [];
var switchips = [];
var switchportscount = {};
//var link;
var swiobj = {}

function displayswitooltips(wsname, sname) {
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
/*function displayswitooltips(wsname, sname) {
    if (document.getElementById(sname).classList.contains('swishown')) {
        document.getElementById(wsname).classList.remove('swiborder-clr')
        document.getElementById(sname).classList.remove('swishown')
    } else {
        document.getElementById(wsname).classList.add('swiborder-clr')
        document.getElementById(sname).classList.add('swishown')
    }
}*/

var sitesname = 'swisitesname'
var wsocname = 'swi-pipe'
var switchhtml = '<div class="indicator" id="swi-pipe"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats" onclick="displayswitooltips(\''+ wsocname + '\',\'' + sitesname + '\')"> \
                        <span class="tooltiptext" id="swisitesname" style="overflow-y:scroll">\
                        <p><b>Queue Name :</b> switch_update</p> \
                        </span> \
                    </i> \
                 </div>'
$('#switch-html').empty()
$("#switch-html").append(switchhtml);

function iconclose(ip) {
    isToBeConnect = !{}[true];
    if (swiobj[ip]) {
        swiobj[ip].disconnect();
    }
}

function iconconnect(ip) {
    isToBeConnect = {}[true];
    makeWebsiteSwitchConnection(swiobj[ip].ws.url, swiobj[ip].id, 0)
}
function makeWebsiteSwitchConnection(websocketurl, wsitename, tries, nodeCount, random) {
    // console.log('CONSOLE- switch websocket called---webscoketurl- ' + websocketurl + ' wsitename- ' + wsitename+' tries- '+tries +' nodeCount- ' + nodeCount)
    // console.log('')
    var swiclient = 'client' + (random)
    // console.log("swiclient---->"+swiclient)
    try {
        //     //console.log(" CONSOLE- INSIDE TRY")
        if (window.WebSocket) {
            //      //console.log('CONSOLE- INSIDE IF WINDOW')
            var destination = "/exchange/switch_update";
            swiclient = Stomp.client(websocketurl);
            //  console.log("client--swit-->" + JSON.stringify(sclient))
            // var wsobjname = new WebSocket(websocketurl);
            // var client = Stomp.over(wsobjname);
            swiclient.id = wsitename
            swiclient.connectionTries = tries;
            swiclient.criticalNodeCount = nodeCount;
            swiobj[wsitename] = swiclient
            var iconhtml = ''
            iconhtml += '<div class="row tooltiping">'
            iconhtml += '<table>';
            iconhtml += '<thead></thead>';
            iconhtml += '<tbody class="row">';
            iconhtml += '<tr class="col-12">';
            iconhtml += '<td class="col-8 details_td" style="width: 100px;">isConnected</td>';
            iconhtml += '<td class="col-4 details_ts" id="' + wsitename + 'swstatus-conn" ></td>';
            iconhtml += '</tr>';
            iconhtml += '</tbody>';
            iconhtml += '</table>';
            iconhtml += ' <p class="tooltiptexting" id="' + wsitename + 'swlast-conn"></p>'
            //iconhtml += '<p class="col-9" style="color:#ffffff" id="' + wsitename + '"></p>'
            iconhtml += '<p class="col-3" id="swdisplay-icon' + wsitename + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
            iconhtml += '</div>'
            $('#swisitesname').append(iconhtml)
            var on_conn = function () {
                //         //console.log("CONSOLE- on_conn-->")
                wsConnected = true;
                //  console.log("sitesData--->" + sitesData[0])
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = true;
                isToBeConnect = {}[true];
                // swiclient.connectionTries = 0;
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsitename + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> switch_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> True(0)</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + switchlastreconnect + '</p>'
                iconhtml += '</div>'
                $('#swisitesname').empty()
                $('#swisitesname').append(iconhtml)*/
                document.getElementById(wsitename + 'swstatus-conn').innerText = 'True(0)'
                document.getElementById(wsitename + 'swstatus-conn').style.color = "#16d39a";
                document.getElementById('swi-pipe').style.color = '#16d39a'
                $("#swdisplay-icon" + wsitename).css('display', 'none');
                document.getElementById(wsitename + 'swlast-conn').innerText = "Lastconnect : " + switchlastreconnect

                //callback function
                swiclient.subscribe(destination, function (message) {
                    // console.log('SITE-SWITCH SWITCH UPDATE--->' + message)

                    ////////////////////////////////////////ENTITY ELEMENTS COUNT CHANGE////////////////////////////////////////////////
                    var update = JSON.parse(message.body);
                    var overview_data = update.overviewstats['data']['overview'][update['ip']]
                    var overall_data = update.overviewstats['data']['overall']
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

                    if (typeof getnewchart === 'function') {
                        // console.log('getChartData called')
                        fillHostServiceCount(chartresponse)
                    }
                    var critic_val = hardware_critical + software_critical + application_critical
                    var warn_val = hardware_warning + software_warning + application_warning
                    if (critic_val > 0) {
                        $("#entityLED").removeClass("green").removeClass("amber").addClass('red')
                    } else if (warn_val > 0) {
                        $("#entityLED").removeClass("red").removeClass("green").addClass('amber')
                    } else {
                        $("#entityLED").removeClass("red").removeClass("amber").addClass('green')
                    }

                    ////////////////////////////////////////ENTITY ELEMENTS COUNT CHANGE////////////////////////////////////////////////



                    //getnewchart();
                    //    console.log('MESSAGE type--->' + typeof(message.body))
                    //console.log('MESSAGE--->' + message.body)
                    //  update = JSON.stringify(message.body);
                    // //console.log('MAPDATA---->'+map)
                    update = JSON.parse(message.body);
                    //console.log("updates-->" + JSON.stringify(update))
                });

                $("#node-view #" + swiclient.id + "-indicator").css('fill', '#16d39a')
            }
            var on_err = function (error) {
                //console.log('CONSOLE- IN ERROR')
                $("#node-view #" + swiclient.id + "-indicator").css('fill', '#ff3d57')
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = false;
                isToBeConnect = !{}[true];
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip" style="line-height: 5px; display:flex !important">'
                iconhtml += ' <p class="tooltiptext" id="' + wsitename + '"></p>'
                iconhtml += ' <p><b>Queue Name :</b> switch_update</p>'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> False(' + swiclient.connectionTries + ')</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '<p><b>Lastconnect:</b>' + switchlastreconnect + '</p>'
                iconhtml += '</div>'
                $('#swisitesname').empty()
                $('#swisitesname').append(iconhtml)*/
                document.getElementById(wsitename + 'swstatus-conn').innerText = 'False(' + swiclient.connectionTries + ')'
                document.getElementById(wsitename + 'swstatus-conn').style.color = "#ff3d57";
                document.getElementById('swi-pipe').style.color = '#ff3d57'
                $("#swdisplay-icon" + wsitename).css('display', 'block');
                document.getElementById(wsitename + 'swlast-conn').innerText = "Lastconnect : " + switchlastreconnect
                // $("#snackbars").fadeIn("slow");
                // $('#snackbars').text('Please Refresh Your Page..');
                // snackbars.className = "error_show";
                swiclient.connectionTries++;
                const timestamp = new Date;
                const date = new Date(timestamp);
                var month = date.getMonth() + 1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();
                var hour = date.getHours();
                var mins = date.getMinutes();
                var sec = date.getSeconds();
                var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                switchlastreconnect = formattedDate.toLocaleString();

                if (networkStatus === 'online') {
                    if (swiclient.connectionTries >= 10) {
                        isToBeConnect = !{}[true];
                        // location.reload();
                        //console.log('CONSOLE- IN ERROR IF')
                        /* swal({
                             title: "Want to get switch updates?",
                             text: "Not able to connect web socket of \"" + swiclient.id + "\".Please Refresh Your Page!.",
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
                                     makeWebsiteSwitchConnection(swiclient.ws.url, swiclient.id, 0, swiclient.criticalNodeCount)
                                     //  location.reload();
                                 } else {
                                     isToBeConnect = !{}[true];
                                     swiclient.disconnect();
                                     //  $("#node-view #" + swiclient.id + "-indicator").css('fill', '#ff3d57')
                                 }
                             });*/
                    }
                    else {
                        //console.log('CONSOLE- IN ERROR ELSE')
                        // swiclient.connectionTries++;
                        const timestamp = new Date;
                        const date = new Date(timestamp);
                        var month = date.getMonth() + 1;//months (0-11)
                        var day = date.getDate();//day (1-31)
                        var year = date.getFullYear();
                        var hour = date.getHours();
                        var mins = date.getMinutes();
                        var sec = date.getSeconds();
                        var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                        switchlastreconnect = formattedDate.toLocaleString();
                        /*var iconhtml = ''
                        iconhtml += '<div class="row tooltip" style="line-height:5px; display:flex !important">'
                        iconhtml += ' <p class="tooltiptext" id="' + wsitename + '"></p>'
                        iconhtml += ' <p><b>Queue Name :</b> switch_update</p>'
                        iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: -10px;"><b>isConnected :</b> Trying(' + swiclient.connectionTries + ')</p>'
                        iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                        iconhtml += '<p><b>Lastconnect:</b>' + switchlastreconnect + '</p>'
                        iconhtml += '</div>'
                        $('#swisitesname').empty()
                        $('#swisitesname').append(iconhtml)*/
                        document.getElementById(wsitename + 'swstatus-conn').innerText = 'Trying(' + swiclient.connectionTries + ')'
                        document.getElementById(wsitename + 'swstatus-conn').style.color = "#e99123";
                        document.getElementById('swi-pipe').style.color = '#e99123'
                        $("#swdisplay-icon" + wsitename).css('display', 'block');
                        document.getElementById(wsitename + 'swlast-conn').innerText = "Lastconnect : " + switchlastreconnect
                        if (isToBeConnect = {}[true]) {
                            makeWebsiteSwitchConnection(swiclient.ws.url, swiclient.id, swiclient.connectionTries, swiclient.criticalNodeCount)
                        }
                    }
                }
            };
            //console.log('CONSOLE- BEFORE CLIENT.CONNECT')
            swiclient.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}
