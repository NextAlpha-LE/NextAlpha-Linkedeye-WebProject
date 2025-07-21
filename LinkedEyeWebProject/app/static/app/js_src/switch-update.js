
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
var pause_supdate = [];
//var link;
$(document).ready(function () {
    // //console.log('ENTITY-NEW JS CALLED')
    //getSiteNames();
    //getEntityDatas();
    FirstTimeDataLoad()

});


function getarrowdata(id, data) {
    //  //console.log('GETARROW ID---->' + id + '----' + Object.keys(data).length)
    map[id] = data
}
//function getpausedata(arr) {//pserversearch-row,vmserversearch-row
//    console.log('getpausedata array---->' + arr )
//    pause_supdate=arr
//}

function getEntityDatas() {
    //showLoader("node-view")
    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site") }, type = "GET").done(FirstTimeDataLoad);
}

function FirstTimeDataLoad() {
    // get all switch all ports status set on ready 

    var sitename = params.get("site")
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        //  //console.log('GETALLSITENAMES--->' + response)
        res = JSON.parse(response);
        var websocurl = res['data'][0]['websocket_url']
        //  //console.log('WEBSOC URL--->' + websocurl)
        //  //console.log('WEBSOC URL--->' + websocurl)
        //  makeWebSwitchConnection(res['data'][0]['websocket_url'], res['data'][0]['sitename'], 0, 0)
        //  makeWebSwitchConnection(websocurl, sitename, 0, 0)
    });
    // makeWebSocConnection(tempSiteObj.websocket_url, tempSiteObj, 0, 0)
}

/*function countips() {
    switchips.forEach(function (obj) {
        //console.log('OBJ--->' + obj)
        //console.log('switchportscount[obj+ - disconn]--->' + switchportscount[obj + '-disconn'])
        //console.log('switchportscount[obj+ - conn]--->' + switchportscount[obj + '-conn'])
        //console.log('switchportscount[obj +  - unknown]--->' + switchportscount[obj + '-unknown'])
        if (switchportscount[obj + '-conn'] == 0) {
            $('#pills-ok-tab' + obj.replaceAll(".", "_")).attr('onclick', ' ');
            $("#pills-ok-tab" + obj.replaceAll(".", "_")).html("Connected (" + switchportscount[obj + '-conn'] + ")");
        }
        else
            $("#pills-ok-tab" + obj.replaceAll(".", "_")).html('<span class="bold-text green">Connected(' + switchportscount[obj + '-conn'] + ')</span>');


        if (switchportscount[obj + '-disconn'] == 0) {
            $('#pills-critical-tab' + obj.replaceAll(".", "_")).attr('onclick', ' ');
            $("#pills-critical-tab" + obj.replaceAll(".", "_")).html("Disconnected (" + switchportscount[obj + '-disconn'] + ")");
        }
        else
            $("#pills-critical-tab" + obj.replaceAll(".", "_")).html('<span class="bold-text red">Disconnected(' + switchportscount[obj + '-disconn'] + ')</span>');
        if (switchportscount[obj + '-unknown'] == 0) {
            $('#pills-unknown-tab' + obj.replaceAll(".", "_")).attr('onclick', ' ');
            $("#pills-unknown-tab" + obj.replaceAll(".", "_")).html("Unknown (" + switchportscount[obj + '-unknown'] + ")");
        }
        else
            $("#pills-unknown-tab" + obj.replaceAll(".", "_")).html('<span class="bold-text warning">Unknown(' + switchportscount[obj + '-unknown'] + ')</span>');
    });
}
async function switchports(array) {
     return await new Promise(function (resolve, reject) {
         resolve(array.forEach(function (update) {
        //console.log('UPDATE FROM INITIAL PORT UPDATE--->' + JSON.stringify(update))
        if (switchportscount[update['ip'] + '-conn'] == undefined) {
            switchportscount[update['ip'] + '-disconn'] = 0
            switchportscount[update['ip'] + '-conn'] = 0
            switchportscount[update['ip'] + '-unknown'] = 0
        }
        if (update['port'] == undefined || update['port'] == 'Info') {
            switchips.push(update['ip'])
        } else {
            switch (update['status']) {
                case 0:
                    switchportscount[update['ip'] + '-disconn']++
                    break;
                case 2:
                    switchportscount[update['ip'] + '-conn']++
                    break;
                default:
                    switchportscount[update['ip'] + '-unknown']++;
            }
        }
    })
      )
     })
}
async function getspecificswitchdata(ip,layer) {
     //console.log('IP FROM SPECIFIC DATA--->'+ip)
    return await new Promise(function (resolve, reject) {
        resolve(
            requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site"),layer:layer+'_swi', ip: ip }, "GET").done(function (response) {
                //console.log('RESPONSE------->' + JSON.stringify(response))
                adata = response['responseData'][0]['site_data']['nodes']['data']
                //console.log('ADATA---> ' + JSON.stringify(adata))
                adata.forEach(function (obj) {
                    //console.log('OBJ ADATA--->' + JSON.stringify(obj))
                if (obj[5] == 'port') {
                    portcount.push({ "ip": obj[7], "layer": layer, "port": obj[1].split(":")[1], "status": obj[11] },)
                }
            });
            switchports(portcount)
            
        })
       )
    });
     countloop()
    
}*/
var switobj = {}

function displayswittooltips(wsname, sname) {
    const tooltip = document.getElementById(sname);
    const wrapper = document.getElementById(wsname);

    if (tooltip.classList.contains('switshown')) {
        // If the tooltip is already shown, close it
        tooltip.classList.remove('switshown');
        wrapper.classList.remove('switborder-clr');
    } else {
        // Close all other tooltips
        closeAllTooltipsdom(tooltip);

        // Open the clicked tooltip
        tooltip.classList.add('switshown');
        wrapper.classList.add('switborder-clr');
    }
}
/*function displayswittooltips(wsname, sname) {
    if (document.getElementById(sname).classList.contains('switshown')) {
        document.getElementById(wsname).classList.remove('switborder-clr')
        document.getElementById(sname).classList.remove('switshown')
    } else {
        document.getElementById(wsname).classList.add('switborder-clr')
        document.getElementById(sname).classList.add('switshown')
    }
}*/

var sitesname = 'switsitesname'
var wsocname = 'swit-pipe'
var switchhtml = '<div class="indicator" id="swit-pipe"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats" onclick="displayswittooltips(\''+ wsocname + '\',\'' + sitesname + '\')"> \
                        <span class="tooltiptext" id="switsitesname" style="">\
                        </span> \
                    </i> \
                 </div>'
$('#switch-html').empty()
$("#switch-html").append(switchhtml);

function iconclose(ip) {
    isToBeConnect = !{}[true];
    if (switobj[ip]) {
        switobj[ip].disconnect();
    }
}

function iconconnect(ip) {
    isToBeConnect = {}[true];
    makeWebSwitchConnection(switobj[ip].ws.url, switobj[ip].id, 0)
}

function makeWebSwitchConnection(websocketurl, wsitename, tries, random) {
    //function makeWebSwitchConnection(websocketurl, wsitename, tries, nodeCount, random) {
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
            // swiclient.criticalNodeCount = nodeCount;
            switobj[wsitename] = swiclient
            var iconhtml = ''
            iconhtml += '<div class="row tooltiping">'
            iconhtml += '<p style="font-size: 13px;margin-left: 11px;"><b>Queue Name :</b> switch_update</p>'
            iconhtml += '<table>';
            iconhtml += '<thead></thead>';
            iconhtml += '<tbody class="row" style="margin-left:6px;>';
            iconhtml += '<tr class="col-12">';
            iconhtml += '<td class="col-8 details_td" style="width: 100px;">isConnected</td>';
            iconhtml += '<td class="col-4 details_ts" id="' + wsitename + 'swistatus-conn" ></td>';
            iconhtml += '</tr>';
            iconhtml += '</tbody>';
            iconhtml += '</table>';
            iconhtml += ' <p class="tooltiptexting" id="' + wsitename + 'swilast-conn"></p>'
            //iconhtml += '<p class="col-9" style="color:#ffffff" id="' + wsitename + '"></p>'
            iconhtml += '<p class="col-3" id="swidisplay-icon' + wsitename + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
            iconhtml += '</div>'
            $('#switsitesname').empty()
            $('#switsitesname').append(iconhtml)
            var on_conn = function () {
                //         //console.log("CONSOLE- on_conn-->")
                wsConnected = true;
                //  console.log("sitesData--->" + sitesData[0])
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = true;
                isToBeConnect = {}[true];
                // swiclient.connectionTries = 0;
                /*var iconhtml = ''
                iconhtml += '<div class="row tooltip">'
                iconhtml += '<p class="tooltiptext" id="' + wsitename + '">'
                iconhtml += '<p style="font-size: 12px;margin-left: 11px;"><b>Queue Name :</b> switch_update</p>'
                iconhtml += '<div class="col-12" style="display:contents;">'
                iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: 0px;font-size: 11px;"><b>isConnected :</b> True(0)</p>'
                iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:none;font-size: 16px;margin-left: 30px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '</div>'
                iconhtml += '<p style="font-size: 12px;margin-left: 12px;"><b>Lastconnect:</b>' + switchlastreconnect + '</p>'
                iconhtml += '</p>'
                iconhtml += '</div>'
                $('#switsitesname').empty()
                $('#switsitesname').append(iconhtml)*/
                document.getElementById(wsitename + 'swistatus-conn').innerText = 'True(0)'
                document.getElementById(wsitename + 'swistatus-conn').style.color = "#16d39a";
                document.getElementById('swit-pipe').style.color = '#16d39a'
                $("#swidisplay-icon" + wsitename).css('display', 'none');
                document.getElementById(wsitename + 'swilast-conn').innerText = "Lastconnect : " + switchlastreconnect

                // $("#snackbars").fadeIn("slow");
                //   $('#snackbars').text('Online');
                //   snackbars.className = "sucess_show";
                // $("#snackbars").fadeOut();
                //        //console.log('CONSOLE- IN BEFORE SUBSCRIBE')

                //callback function
                swiclient.subscribe(destination, function (message) {
                    
                    console.log('switchupdate PAUSE_SUPDATE--->' + pause_supdate)
                    //console.log('SWITCH UPDATE MESSAGE--->' + message.body)

                    //  update = JSON.stringify(message.body);
                    // //console.log('MAPDATA---->'+map)
                    var portprevclr = ''
                    update = JSON.parse(message.body);
                    if (update['title'] == update['ip']) {
                        overalldivcolor(update);
                        switch (update['status']) {
                            case 0:
                                color = '#ff3d57';
                                if (!($('#ip_' + update['ip'].replaceAll(".", "_") + ':NIC').hasClass('critical_opaque'))) {
                                    $('#ip_' + update['ip'].replaceAll(".", "_") + ':NIC').addClass("critical_opaque");
                                }
                                break;
                            case 1:
                                color = '#e99123'
                                if ($('#ip_' + update['ip'].replaceAll(".", "_") + ':NIC').hasClass('critical_opaque')) {
                                    $('#ip_' + update['ip'].replaceAll(".", "_") + ':NIC').removeClass("critical_opaque");
                                }
                                break;
                            case 2:
                                color = '#16d39a'
                                if ($('#ip_' + update['ip'].replaceAll(".", "_") + ':NIC').hasClass('critical_opaque')) {
                                    $('#ip_' + update['ip'].replaceAll(".", "_") + ':NIC').removeClass("critical_opaque");
                                }
                                break;
                            case 3:
                                color = '#ffffff'
                                if ($('#ip_' + update['ip'].replaceAll(".", "_") + ':NIC').hasClass('critical_opaque')) {
                                    $('#ip_' + update['ip'].replaceAll(".", "_") + ':NIC').removeClass("critical_opaque");
                                }
                                break;
                            default:
                                color = '#000000'
                                if ($('#ip_' + update['ip'].replaceAll(".", "_") + ':NIC').hasClass('critical_opaque')) {
                                    $('#ip_' + update['ip'].replaceAll(".", "_") + ':NIC').removeClass("critical_opaque");
                                }
                        }
                        //console.log('COLOR--->' + color)
                        //console.log('ip_172_16_0_22:NIC example------>' + '#ip_' + update['ip'].replaceAll(".", "_") + ':NIC')
                        if (document.getElementById('ip_' + update['ip'].replaceAll(".", "_") + ':NIC'))
                            document.getElementById('ip_' + update['ip'].replaceAll(".", "_") + ':NIC').style.border = '2px solid ' + color;
                        //console.log('before calling the InitialswitchUpdate function')
                        InitialswitchUpdate(update);
                        swapServers()
                    }
                    /*if (update['title'] == update['ip']) {
                        console.log('second if condition reached')
                        InitialswitchUpdate(update);
                        swapServers()
                    }*/

                    // console.log("update['title'] switch----->" + update['title'])
                    // console.log("update['ip'] switch----->" + update['ip'])
                    // console.log("update['mode'] switch----->" + update['mode'])
                    // console.log("update switch----->" + (update['title'] == update['ip'] + '\\:' + update['mode']))
                    if (update['title'] == update['ip'] + ':' + update['mode']) {
                        // console.log("entity switch----->" + update)
                        // console.log("entity switch----->" + JSON.stringify(update))
                        if ("stats" in update) {
                            var stats_list = JSON.parse(update['stats'])
                            if ((stats_list) != null && (update['stats']) != null && (stats_list) != '' && Object.keys(stats_list).length && jQuery.isEmptyObject(stats_list) != true) {
                                var nodesip = (update['ip']).replaceAll('.', '_')
                                var imagetype = update['mode']
                                var tooltp_txt = '<table>';
                                var tooltp_default = ''
                                var stats_arr = [0, 1, 2, 3]
                                var stats_clr = ['red', 'orange', 'green', 'white']
                                stats_arr.forEach(function (item, index) {
                                    //console.log(item, index);
                                    item = item.toString();
                                    if (item in stats_list) {
                                        //console.log('stats_list[item]--->' + JSON.stringify(stats_list[item]))
                                        for (const [key, value] of Object.entries(stats_list[item])) {

                                            //cls_list = cls_list + ' ' + key.replaceAll('.', '_') + ':' + imagetype
                                            tooltp_default += '<tr style="color:' + stats_clr[item] + '"><td id="' + key.replaceAll('.', '_') + ':' + imagetype + '" >' + key + ' - </td> <td>' + value + '</td></tr>'

                                        }

                                    }
                                });
                                tooltp_txt += tooltp_default
                                tooltp_txt += '</table>'
                                if (document.getElementById((update['title']).replaceAll('.', '_') + "_tooltip") != null) {
                                    document.getElementById((update['title']).replaceAll('.', '_') + "_tooltip").innerHTML = tooltp_txt;
                                }
                                //_nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (row[1]).replaceAll('.', '_') + '" name="' + (row[1]).replaceAll('.', '_') + '" src="/static/images/' + row[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid ' + icon_clr + ';background-color: ' + icon_clr + '"/><span class="tooltiptexts row" id="' + (row[1]).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:max-content !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;"><div class="col-10" style="padding-left:0" >' + ((row[5]).split(".")[0]) + '</div><i class=" col-2 mdi mdi-pin-outline" id="' + pinid + 'tltp-pin" style=" z-index:1000;padding: 0;" onclick="pintool(\'' + pinid + '\')"></i>' + tooltp_txt + '</span></div>'
                            }
                        }
                        /*if ((update['DiskVolumes_list']) != null && update['mode'] == 'SW_Disk' && jQuery.isEmptyObject(update['DiskVolumes_list']) != true) {
                            //  console.log('--niclist INSIDE IF ISEMPTY--')
                            // var cls_list = (update['title']).replaceAll('.', '_')
                            var nodesip = (update['ip']).replaceAll('.', '_')
                            var imagetype = update['mode']
                            var tooltp_txt = 'Disk<table>';
                            var tooltp_green = ''
                            var tooltp_red = ''
                            // var clr_status = ''
                            for (const [key, value] of Object.entries(JSON.parse(update['DiskVolumes_list']))) {
                                //  console.log('niclist KEY--->' + key + ' VALUE--->' + JSON.stringify(value));
                                // cls_list = cls_list + ' ' + nodesip + ':' + key + ':' + imagetype
                                // clr_status = value['status'] == 2 ? "green" : "red"
                                if (value['status'] == 2) {
                                    tooltp_green += '<tr style="color:green"><td id="' + nodesip + ':' + key + ':' + imagetype + '">' + key + '-</td> <td>' + value['percentage'] + '</td></tr>'
                                } else {
                                    tooltp_red += '<tr style="color:red"><td id="' + nodesip + ':' + key + ':' + imagetype + '">' + key + '-</td> <td>' + value['percentage'] + '</td></tr>'
                                }
                                // tooltp_txt += '<tr style="color:' + clr_status + '"><td id="' + nodesip + ':' + key + ':' + imagetype + '">' + key + '-</td> <td>' + value['percentage'] + '</td></tr>'
                                // do something with `key` and `value`
                            }
                            tooltp_txt += tooltp_red + tooltp_green
                            tooltp_txt += '</table>'
                            // console.log('niclist CLASS LIST--->' + cls_list)
                            if (document.getElementById((update['title']).replaceAll('.', '_') + "_tooltip") != null) {
                                document.getElementById((update['title']).replaceAll('.', '_') + "_tooltip").innerHTML = tooltp_txt;
                            }
                        }*/
                        InitialhardwareUpdates(update);
                    }

                


                    /* function showarrow() {
                             (link).show(['fade'[{ duration: 300, timing: 'linear' }]]);
                     }
                     function hidearrow() {
                             (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]);
                     }*/

                    //           //console.log('UPDATE--->' + JSON.stringify(update))
                    switch (update['status']) {
                        case 0:
                            color = '#ff3d57'
                            break;
                        case 1:
                            color = '#e59105'
                            break;
                        case 2:
                            color = '#16d39a'
                            break;
                        case 3:
                            color = '#ffffff'
                            break;
                        case 4:
                            color = '#1f1f1f'
                            //  console.log('STATUS 4')
                            break;
                        case 5:
                            color = '#1f1f1f'
                            break;
                        default:
                            color = '#ffffff'
                    }

                    /* if (update['status'] == "") {
                         color = '#00ff00'
                     }
                     if (update['status'] == 0) {
                         color = '#ff3d57'
                     }
                     if (update['status'] == 1) {
                         color = '#e59105'
                     }
                     if (update['status'] == 2) {
                         color = '#16d39a'
                     }
                     if (update['status'] == 3) {
                         color = '#ffffff'//default white
                     }
                     if (update['status'] == 4) {
                         console.log('STATUS 4')
                     }*/
                    //         //console.log('BEFORE PORTPREVCLR attr------>' + $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port']).css('fill'))
                    var portid = update['port']
                    if (update['port'] != undefined && update['port'] != null && update['port'] != "") {
                        //if (update['port'] != undefined && update['port'] != null && update['port'] != "" && update['status'] != 4) {
                        // portprevclr = $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port']).('fill')
                        portprevclr = $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port'].replaceAll('/', '_')).css('fill')
                        //console.log('UP PORTPREVCLR attr------>' + $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port']).css('fill'))
                        //console.log('UP PORTPREVCLR------>' + portprevclr)
                        $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port'].replaceAll('/', '_')).css('fill', color)
                        // console.log("update['port']----->" + update['port'])
                        portid = update['port'].replaceAll('/', '_')
                    }
                    //  $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port']).css('fill', color)
                    /////////////////////////////////////////////////////////
                    var link = '';
                    //console.log("update['port']----->" + update['port'])
                    //var portid = update['port'].replaceAll('/', '_')

                    ////////////////////////////////////////ENTITY ELEMENTS COUNT CHANGE////////////////////////////////////////////////
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
                    var disconntext = ''
                    var intext = ''
                    var oktext = ''
                    var unknowntext = ''
                    var tab_id = (update['ip']).replaceAll(".", "_")
                    var tot_critical = 0
                    var tot_warning = 0
                    var tot_unknown = 0
                    var tot_ok = 0
                    /*var count_response = update.overviewstats['data']
                    for (const [key, value] of Object.entries(count_response)) {
                        var tab_id = (key).replaceAll(".", "_")
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
                        //console.log('TAB_ID--->' + tab_id)
                        //console.log("document.getElementById('pills-ok-tab' + tab_id))--->" + document.getElementById('pills-ok-tab' + tab_id))*/
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


                    ////////////////////////////////////////////////////////////BADGE HTML UPDATE BLOCK/////////////////////////////////////////////////////////////////////

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

                    ////////////////////////////////////////////////////////////BADGE HTML UPDATE BLOCK/////////////////////////////////////////////////////////////////////

                    //}
                    var chartresponse = { "hardware": { "CRITICAL": hardware_critical, "OK": hardware_ok, "WARNING": hardware_warning, "UNKNOWN": hardware_unknown }, "software": { "CRITICAL": software_critical, "OK": software_ok, "WARNING": software_warning, "UNKNOWN": software_unknown }, "application": { "CRITICAL": application_critical, "OK": application_ok, "WARNING": application_warning, "UNKNOWN": application_unknown } };

                    if (typeof getnewchart === 'function') {
                        // console.log('getChartData called')
                        fillHostServiceCount(chartresponse)
                    }


                    ////////////////////////////////////////ENTITY ELEMENTS COUNT CHANGE////////////////////////////////////////////////

                    function categorizeColor(color) {
                        // Remove spaces from the input color string
                        color = color.replace(/\s/g, '');

                        // Define a list of known color names and their corresponding RGB values
                        const colorMap = {
                            'green': 'rgb(22, 211, 154)',
                            'red': 'rgb(255, 61, 87)',
                            'white': 'rgb(255, 255, 255)',
                            'orange': 'rgb(233, 145, 35)',
                            'black': 'rgb(0, 0, 0)'
                        };

                        // If the provided color is a known color name, return it as is
                        if (color in colorMap) {
                            return color;
                        }

                        // Extract the RGB values from the input string
                        const rgbMatch = color.match(/\d+/g);
                        if (!rgbMatch || rgbMatch.length !== 3) {
                            return 'Unknown';
                        }
                        const [r, g, b] = rgbMatch.map(Number);

                        // Find the closest matching color based on RGB values
                        let closestColor = 'Unknown';
                        let minColorDistance = Number.MAX_VALUE;

                        for (const colorName in colorMap) {
                            const colorRGB = colorMap[colorName];
                            const [cr, cg, cb] = colorRGB.match(/\d+/g).map(Number);
                            const distance = Math.sqrt((cr - r) ** 2 + (cg - g) ** 2 + (cb - b) ** 2);

                            if (distance < minColorDistance) {
                                minColorDistance = distance;
                                closestColor = colorName;
                            }
                        }

                        return closestColor;
                    }

                    // Function to normalize color values to lowercase format
                    function getNormalizedColor(color) {
                        if (color.startsWith("rgb")) {
                            const rgbValues = color.match(/\d+/g);
                            if (rgbValues && rgbValues.length === 3) {
                                return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
                            }
                        }
                        return color.toLowerCase().trim();
                    }

                    // Function to sort elements based on custom criteria
                    function customSort(a, b) {
                        const badgeColorA = getNormalizedColor(a.querySelector('.badge').style.backgroundColor);
                        const badgeColorB = getNormalizedColor(b.querySelector('.badge').style.backgroundColor);
                        const badgeCountA = parseInt(a.querySelector('.num-data').textContent);
                        const badgeCountB = parseInt(b.querySelector('.num-data').textContent);

                        if (badgeColorA === badgeColorB) {
                            return badgeCountB - badgeCountA; // Sort by badge count in descending order within the same badge color group
                        } else {
                            return badgeColorSort(badgeColorA, badgeColorB); // Sort by badge color in descending order
                        }
                    }

                    // Custom sorting function for badge colors
                    function badgeColorSort(colorA, colorB) {
                        const badgeColorOrder = ["red", "orange", "white", "green", "black"];
                        return badgeColorOrder.indexOf(colorA) - badgeColorOrder.indexOf(colorB); // Sort by badge color in specified order
                    }

                    // Custom sorting function for border colors
                    function borderColorSort(colorA, colorB) {
                        const borderColorOrder = ["red", "orange", "white", "green", "black"];
                        return borderColorOrder.indexOf(colorA) - borderColorOrder.indexOf(colorB); // Sort by border color in specified order
                    }

                    // Function to sort and group elements
                    function sortAndGroupElements(container) {
                        const elementsToSort = Array.from(container.querySelectorAll('a'));

                        // Step 1: Group elements by border color
                        const borderGroups = {};
                        elementsToSort.forEach((element) => {
                            const borderColor = categorizeColor(element.style.borderColor);
                            if (!borderGroups[borderColor]) {
                                borderGroups[borderColor] = [];
                            }
                            borderGroups[borderColor].push(element);
                        });

                        // Step 2: Sort border color groups in specified order
                        const sortedBorderGroups = Object.keys(borderGroups)
                            .sort(borderColorSort)
                            .map((key) => borderGroups[key]);

                        // Step 3: Sort and group elements within each border color group by badge color
                        sortedBorderGroups.forEach((group) => {
                            const badgeGroups = {};

                            group.forEach((element) => {
                                const badgeColor = getNormalizedColor(element.querySelector('.badge').style.backgroundColor);
                                if (!badgeGroups[badgeColor]) {
                                    badgeGroups[badgeColor] = [];
                                }
                                badgeGroups[badgeColor].push(element);
                            });

                            const sortedBadgeGroups = Object.keys(badgeGroups)
                                .sort(badgeColorSort)
                                .map((key) => badgeGroups[key]);

                            // Step 4: Sort and group elements within each badge color group by badge count
                            sortedBadgeGroups.forEach((badgeGroup) => {
                                const countGroups = {};

                                badgeGroup.forEach((element) => {
                                    const badgeCount = parseInt(element.querySelector('.num-data').textContent);
                                    if (!countGroups[badgeCount]) {
                                        countGroups[badgeCount] = [];
                                    }
                                    countGroups[badgeCount].push(element);
                                });

                                const sortedCountGroups = Object.keys(countGroups)
                                    .sort((a, b) => b - a) // Sort badge count groups in descending order
                                    .map((key) => countGroups[key]);

                                // Step 5: Sort elements within each badge count group by IP address
                                sortedCountGroups.forEach((countGroup) => {
                                    countGroup.sort((a, b) => {
                                        const ipA = extractIP(a.id);
                                        const ipB = extractIP(b.id);
                                        return compareIPs(ipA, ipB); // Sort IPs in ascending order
                                    });

                                    // Append the sorted elements to the container
                                    countGroup.forEach((element) => container.appendChild(element));
                                });
                            });
                        });
                    }

                    // Helper function to extract the IP address from the ID attribute
                    function extractIP(id) {
                        const ipMatch = id.match(/ip_(\d+_\d+_\d+_\d+)/);
                        if (ipMatch) {
                            return ipMatch[1].split('_').map(Number);
                        }
                        return [0, 0, 0, 0]; // Default value in case of invalid IP format
                    }

                    // Function to compare two IP addresses
                    function compareIPs(ipA, ipB) {
                        for (let i = 0; i < ipA.length; i++) {
                            if (ipA[i] !== ipB[i]) {
                                return ipA[i] - ipB[i];
                            }
                        }
                        return 0; // IPs are identical
                    }

                    // Initialize sorting for elements in containers
                    const psHw = document.getElementById('ps_hw');
                    const vmsHw = document.getElementById('vms_hw');

                    if (!(pause_supdate.includes('pserversearch-row'))) {
                        sortAndGroupElements(psHw);
                    }
                    if (!(pause_supdate.includes('vmserversearch-row'))) {
                        sortAndGroupElements(vmsHw);
                    }
                    //sortAndGroupElements(psHw);
                    //sortAndGroupElements(vmsHw);


                    ////////////////////////////////////////ENTITY ELEMENTS COUNT CHANGE////////////////////////////////////////////////


                    //SERVER LEADERLINE
                    if (update.hasOwnProperty('mode')) {
                        if (update['mode'].includes('NIC') && update['mode'] != undefined) {
                            //     //console.log('INSIDE MODESELECTOR')
                            requestDataFromServer('/entity/getneo4jspecificelement', { title: update['ip'], required: 'link', sitename: selectedsite }, "GET").done(function (response) {
                                var res = JSON.parse(response);
                                //console.log('RESPONSE--->' + response)
                                messagedata = res['data']['data']
                                var start = document.getElementById(update['ip'] + ':NIC')
                                var end = document.getElementById(messagedata + ':NIC')
                                if (start != null && end != null && end != undefined) {
                                    //console.log('NIC STARt--->' + update['ip'] + ' END--->' + messagedata)
                                    if (update['status'].toString() == '0') {
                                        if (map['s' + update['ip'].replaceAll(".", "_")]) {
                                            (map['s' + update['ip'].replaceAll(".", "_")]).remove();
                                            map['s' + update['ip'].replaceAll(".", "_")] = new LeaderLine(start,
                                                end,
                                                { color: '#ff3d57', positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'red', outlineColor: 'red', endPlugColor: 'red', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                                // { middleLabel: LeaderLine.mouseHover.pathLabel(update['title'] + '-' + update['link'], {color:'red'}),color: '#ff3d57', positionByWindowResize: false, hide: false, show: true ,size:2}
                                            );

                                            /*(document.getElementById('g-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                                (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                            }), false);
                                            (document.getElementById('g-div')).addEventListener('scroll', AnimEvent.add(function () {
                                                (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                            }), false);
                                            (document.getElementById('s_hw')).addEventListener('scroll', AnimEvent.add(function () {
                                                (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                            }), false);
                                            (document.getElementById('server-div')).addEventListener('scroll', AnimEvent.add(function () {
                                                (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                            }), false);*/
                                            const createObserver = (element) => {
                                                const observer = new MutationObserver((mutationsList) => {
                                                    for (const mutation of mutationsList) {
                                                        if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                                            map['s' + update['ip'].replaceAll(".", "_")].position();
                                                            //console.log('<=======MUTATION OBSERVER IF TRIGGERED======>')
                                                        } else {
                                                            map['s' + update['ip'].replaceAll(".", "_")].position();
                                                            //console.log('<=======MUTATION OBSERVER ELSE TRIGGERED======>')
                                                        }
                                                    }
                                                });
                                                observer.observe(element, observerOptions);
                                                observers.push(observer);
                                            };


                                            const observerOptions = {
                                                childList: true, // Observe addition/removal of child elements
                                                subtree: true, // Observe the entire subtree
                                                tree: true,
                                            };
                                            createObserver.observe(document.getElementById('node-view-card'), observerOptions);
                                            createObserver.observe(document.getElementById('node-view'), observerOptions);

                                            $('#g-switch, #g-div, #s_hw, #server-div').on('scroll', 
                                                AnimEvent.add(function () {
                                                    (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                                })
                                            );

                                        } else {
                                            // //console.log('inside if else ')
                                            // //console.log('MAP IF  ELSE--->' + Object.keys(map['l' + switchid + portid]).length)
                                            map['s' + update['ip'].replaceAll(".", "_")] = new LeaderLine(start,
                                                end,
                                                { color: '#ff3d57', positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'red', outlineColor: 'red', endPlugColor: 'red', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                            );
                                            /*(document.getElementById('g-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                                (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                            }), false);
                                            (document.getElementById('g-div')).addEventListener('scroll', AnimEvent.add(function () {
                                                (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                            }), false);
                                            (document.getElementById('s_hw')).addEventListener('scroll', AnimEvent.add(function () {
                                                (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                            }), false);
                                            (document.getElementById('server-div')).addEventListener('scroll', AnimEvent.add(function () {
                                                (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                            }), false);*/
                                            const createObserver = (element) => {
                                                const observer = new MutationObserver((mutationsList) => {
                                                    for (const mutation of mutationsList) {
                                                        if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                                            map['s' + update['ip'].replaceAll(".", "_")].position();
                                                            //console.log('<=======MUTATION OBSERVER IF TRIGGERED======>')
                                                        } else {
                                                            map['s' + update['ip'].replaceAll(".", "_")].position();
                                                            //console.log('<=======MUTATION OBSERVER ELSE TRIGGERED======>')
                                                        }
                                                    }
                                                });
                                                observer.observe(element, observerOptions);
                                                observers.push(observer);
                                            };


                                            const observerOptions = {
                                                childList: true, // Observe addition/removal of child elements
                                                subtree: true, // Observe the entire subtree
                                                tree: true,
                                            };
                                            createObserver.observe(document.getElementById('node-view-card'), observerOptions);
                                            createObserver.observe(document.getElementById('node-view'), observerOptions);

                                            $('#g-switch, #g-div, #s_hw, #server-div').on('scroll',
                                                AnimEvent.add(function () {
                                                    (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                                })
                                            );
                                        }
                                        getniccondata(update['ip'], messagedata, update['status'].toString(), map['s' + update['ip'].replaceAll(".", "_")])
                                    } else {
                                        var b_clr = ''
                                        switch (update['status']) {
                                            case 1:
                                                clr = '#e59105'
                                                b_clr = 'orange'
                                                break;
                                            case 2:
                                                clr = '#16d39a'
                                                b_clr = 'green'
                                                break;
                                            default:
                                                b_clr = 'grey'
                                                clr = '#ff3d57'
                                        }
                                        //  //console.log('INSIDE if ELSE---->')
                                        if (map['s' + update['ip'].replaceAll(".", "_")]) {
                                            (map['s' + update['ip'].replaceAll(".", "_")]).remove();

                                            map['s' + update['ip'].replaceAll(".", "_")] = new LeaderLine(start,
                                                end,
                                                { color: clr, hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                            );
                                        } else {
                                            //   //console.log('inside if else else')
                                            map['s' + update['ip'].replaceAll(".", "_")] = new LeaderLine(start,
                                                end,
                                                { color: clr, hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                            );

                                        }

                                        const createObserver = (element) => {
                                            const observer = new MutationObserver((mutationsList) => {
                                                for (const mutation of mutationsList) {
                                                    if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                                        map['s' + update['ip'].replaceAll(".", "_")].position();
                                                        //console.log('<=======MUTATION OBSERVER IF TRIGGERED======>')
                                                    } else {
                                                        map['s' + update['ip'].replaceAll(".", "_")].position();
                                                        //console.log('<=======MUTATION OBSERVER ELSE TRIGGERED======>')
                                                    }
                                                }
                                            });
                                            observer.observe(element, observerOptions);
                                            observers.push(observer);
                                        };


                                        const observerOptions = {
                                            childList: true, // Observe addition/removal of child elements
                                            subtree: true, // Observe the entire subtree
                                            tree: true,
                                        };
                                        createObserver.observe(document.getElementById('node-view-card'), observerOptions);
                                        createObserver.observe(document.getElementById('node-view'), observerOptions);
                                        (start).addEventListener('mouseover', function () {
                                            (map['s' + update['ip'].replaceAll(".", "_")]).show(['fade'[{ duration: 300, timing: 'linear' }]]);
                                        }, false);
                                        (start).addEventListener('mouseout', function () {
                                            (map['s' + update['ip'].replaceAll(".", "_")]).hide(['fade'[{ duration: 300, timing: 'linear' }]]);
                                        }, false);
                                       /* (document.getElementById('g-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                            (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                        }), false);
                                        (document.getElementById('g-div')).addEventListener('scroll', AnimEvent.add(function () {
                                            (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                        }), false);
                                        (document.getElementById('s_hw')).addEventListener('scroll', AnimEvent.add(function () {
                                            (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                        }), false);
                                        (document.getElementById('server-div')).addEventListener('scroll', AnimEvent.add(function () {
                                            (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                        }), false);*/
                                        $('#g-switch, #g-div, #s_hw, #server-div').on('scroll',
                                            AnimEvent.add(function () {
                                                (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                            })
                                        );
                                        getniccondata(update['ip'], map['s' + update['ip'].replaceAll(".", "_")])
                                    }
                                }
                                // //console.log('MESAAGE[data]!=null---->' + messagedata != null)
                                /*else if ((update['Nics_list']) != null && Object.keys((update['Nics_list'])).length && jQuery.isEmptyObject((update['Nics_list'])) != true) {
                                    // if (jQuery.isEmptyObject(datas['data']['niclist']) != true && jQuery.isEmptyObject(datas['data']['nicsummary']) != true) {
                                    // console.log('jQuery.isEmptyObject(datas[data][niclist])--->' + jQuery.isEmptyObject(update['Nics_list']))
                                    // console.log('--niclist INSIDE IF ISEMPTY--' + JSON.stringify(update))
                                    var cls_list = (update['title']).replaceAll('.', '_')
                                    var pinid = (update['title']).replaceAll('.', '_') + '_tooltip'
                                    var tooltp_txt = '<table>';
                                    var tooltp_green = ''
                                    var tooltp_red = ''
                                    var tooltp_default = ''
                                    var imagetype = update['mode']
                                    var nic_clr = ''
                                    for (const [key, value] of Object.entries(JSON.parse(update['Nics_list']))) {
                                        //  console.log('niclist KEY--->' + key + ' VALUE--->' + JSON.stringify(value));
                                        
                                        if (value['ip'] != undefined) {
                                            if (value['status'] == 0) {
                                                cls_list = cls_list + ' ' + key.replaceAll('.', '_') + ':' + imagetype
                                                tooltp_red += '<tr style="color:red"><td id="' + key.replaceAll('.', '_') + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['ip'] + '</td></tr>'
                                            } else if (value['status'] == 2) {
                                                cls_list = cls_list + ' ' + key.replaceAll('.', '_') + ':' + imagetype
                                                tooltp_green += '<tr style="color:green"><td id="' + key.replaceAll('.', '_') + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['ip'] + '</td></tr>'
                                            } else if (value['status'] == 3) {
                                                cls_list = cls_list + ' ' + key.replaceAll('.', '_') + ':' + imagetype
                                                tooltp_default += '<tr><td id="' + key.replaceAll('.', '_') + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['ip'] + '</td></tr>'
                                            }
                                        } else {
                                            var macid = key.replaceAll('.', '_')
                                            if (macid.includes('-'))
                                                macid = macid.replaceAll('-', '_')
                                            if (value['status'] == 0) {
                                                cls_list = cls_list + ' ' + value['mac'].replaceAll('.', '_') + ':' + imagetype
                                                tooltp_red += '<tr style="color:red"><td id="' + macid + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['mac'] + '</td></tr>'
                                            } else if (value['status'] == 2) {
                                                cls_list = cls_list + ' ' + value['mac'].replaceAll('.', '_') + ':' + imagetype
                                                tooltp_green += '<tr style="color:green"><td id="' + macid + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['mac'] + '</td></tr>'
                                            } else if (value['status'] == 3) {
                                                cls_list = cls_list + ' ' + value['mac'].replaceAll('.', '_') + ':' + imagetyp e
                                                tooltp_default += '<tr><td id="' + macid + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['mac'] + '</td></tr>'
                                            }
                                        }
                                        // do something with `key` and `value`
                                    }
                                    tooltp_txt += tooltp_red + tooltp_green + tooltp_default
                                    tooltp_txt += '</table>'
                                    //  console.log('niclist CLASS LIST--->' + cls_list)
                                    _nodehtml = '<div class="col-10" style="padding-left:0" >' + imagetype + '</div><i class=" col-2 mdi mdi-pin-outline" id="' + pinid + 'tltp-pin" style=" z-index:1000;" onclick="pintool(\'' + pinid + '\')"></i>' + tooltp_txt
                                    // console.log('_nodehtml--->' + _nodehtml)
                                    //   console.log('document.getElementById(pinid).innerHTML--->' + document.getElementById(pinid).innerHTML)
                                    // $("#" + pinid).html(_nodehtml);
                                    if (document.getElementById(pinid) != null)
                                        document.getElementById(pinid).innerHTML = _nodehtml
                                }*/

                            });
                            //  var start = document.getElementById(obj[1] + ':Memory')
                            // var end = document.getElementById(obj[10] + ':Memory')
                        }
                }

                    
                    



                    //  console.log(update['link'] + " update['link'] != 'null'--->" + update['link'] != 'null')
                    //  console.log("jQuery.isEmptyObject(update['link']) != true--->" + jQuery.isEmptyObject(update['link']) != true)
                    //  console.log(update['mode'] + " update['mode'] == undefined--->" + update['mode'] == undefined)
                    // if (update['link'] != 'null' && jQuery.isEmptyObject(update['link']) != true && update['mode'] == undefined) {
                    if (update['link'] != 'null' && jQuery.isEmptyObject(update['link']) != true && jQuery.isEmptyObject(update['mode']) == true && update['status'] != 4) {
                        var start_id = update['ip'].replaceAll(".", "_")
                        /*if (update['title'].includes(':p')) {
                            start_id = 'p_' + update['ip'].replaceAll(".", "_")
                        } else if (update['title'].includes(':s')) {
                            start_id = 's_' + update['ip'].replaceAll(".", "_")
                        }*/
                        // console.log('PORTID--->' + portid)
                        console.log('SWITCH UPDATE MESSAGE--->' + message.body)
                        //var start = document.getElementById(start_id).getElementById(portid)
                        var start = (document.getElementsByClassName((portid + '-' + start_id))[0])
                        var end = '';
                        update['link'] = update['link'].replaceAll(/\s/g, "")
                        if (update['link'].includes(':') && (document.getElementById((update['link'].split(":")[0]).replaceAll(".", "_"))) != null) {
                            var end_id = (update['link'].split(":")[0]).replaceAll(".", "_")
                            var end_portid = (update['link'].split(":")[1]).replaceAll(".", "_")
                            //if (update['link'].includes(':p')) {
                            //    end_id = 'p_' + (update['link'].split(":")[0]).replaceAll(".", "_")
                            //} else if (update['link'].includes(':s')) {
                            //    end_id = 's_' + (update['link'].split(":")[0]).replaceAll(".", "_")
                            //}
                            /*end = document.getElementById(end_id).getElementById(update['link'].split(":")[1])*/
                            end = (document.getElementsByClassName((end_portid + '-' + end_id))[0])
                        } else {
                            var classelements = document.getElementsByClassName((update['link'].split(":")[0]).replaceAll(".", "_") + ':NIC')
                            end = classelements[0];
                            //  end = document.getElementById((update['link'].split(":")[0]).replaceAll(".", "_") + ':NIC')
                        }
                         //console.log('START--->' + start + " END--->" + end)
                        //var end = document.getElementById('s_swip_' + update['link'].replaceAll(".", "_"))
                        var switchid = update['ip'].replaceAll(".", "_");
                        if (portid != undefined && portid != null && start != null && end != null && end != undefined) {
                            //console.log('PORT STARt--->' + start_id + ' END--->' + end_id)
                            $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port'].replaceAll('/', '_')).css('fill', color)
                            var clr
                            // getspecificswitchdata(update['ip'], ((document.getElementById('s' + ($("#" + update['ip'].replaceAll(".", "_") + " #" + update['port']).attr("class").split("-")[1]))).parentNode.id).split("_")[0])
                            //console.log('BEFORE IF pills-unknown-tab' + switchid + '.firstElementChild.text---->' + document.getElementById('pills-unknown-tab' + switchid).firstElementChild.innerText)
                            //console.log('BEFORE IF pills-critical-tab' + switchid + '.text---->' + document.getElementById('pills-unknown-tab' + switchid).innerText)
                            //console.log('BEFORE IF pills-critical-tab' + switchid + '.text---->' + document.getElementById('pills-critical-tab' + switchid).innerText)
                            //console.log('BEFORE IF pills-unknown-tab' +switchid+'.firstElementChild---->'+ document.getElementById('pills-unknown-tab' + switchid).firstElementChild)
                            //console.log('BEFORE IF pills-critical-tab' +switchid+'.firstElementChild---->'+ document.getElementById('pills-critical-tab' + switchid).firstElementChild)
                            if (update['status'].toString() == '2') {
                                //if (update['status'].toString() == '0') {
                                /*  case 2:
                                         clr = '#16d39a'
                                         b_clr = 'green'
                                         break;*/

                                if (map['l' + switchid + portid]) {
                                    (map['l' + switchid + portid]).remove();
                                    map['l' + switchid + portid] = new LeaderLine(start,
                                        end,
                                        { color: '#16d39a', hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                        // { middleLabel: LeaderLine.mouseHover.pathLabel(update['title'] + '-' + update['link'], {color:'red'}),color: '#ff3d57', positionByWindowResize: false, hide: false, show: true ,size:2}
                                    );

                                    const createObserver = (element) => {
                                        const observer = new MutationObserver((mutationsList) => {
                                            for (const mutation of mutationsList) {
                                                if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                                    map['l' + switchid + portid].position();
                                                    //console.log('<=======MUTATION OBSERVER IF TRIGGERED======>')
                                                } else {
                                                    map['l' + switchid + portid].position();
                                                    //console.log('<=======MUTATION OBSERVER ELSE TRIGGERED======>')
                                                }
                                            }
                                        });
                                        observer.observe(element, observerOptions);
                                        observers.push(observer);
                                    };


                                    const observerOptions = {
                                        childList: true, // Observe addition/removal of child elements
                                        subtree: true, // Observe the entire subtree
                                        tree: true,
                                    };
                                    createObserver.observe(document.getElementById('node-view-card'), observerOptions);
                                    createObserver.observe(document.getElementById('node-view'), observerOptions);


                                    //  //console.log('MAP IF  IF--->' + Object.keys(map['l' + switchid + portid]).length)

                                    //  link = map['l' + switchid + portid]
                                    //  //console.log('document.getElementById(g -switch)------------>' + document.getElementById('g-switch'))
                                    (start).addEventListener('mouseover', function () {
                                        (map['l' + switchid + portid]).show(['fade'[{ duration: 300, timing: 'linear' }]]);
                                    }, false);
                                    (start).addEventListener('mouseout', function () {
                                        (map['l' + switchid + portid]).hide(['fade'[{ duration: 300, timing: 'linear' }]]);
                                    }, false);
                                    (end).addEventListener('mouseover', function () {
                                        (map['l' + switchid + portid]).show(['fade'[{ duration: 300, timing: 'linear' }]]);
                                    }, false);
                                    (end).addEventListener('mouseout', function () {
                                        (map['l' + switchid + portid]).hide(['fade'[{ duration: 300, timing: 'linear' }]]);
                                    }, false);
                                    /*
                                    (document.getElementById('g-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);
                                    (document.getElementById('p-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);
                                    (document.getElementById('p_swi')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);
                                    (document.getElementById('f-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);
                                    (document.getElementById('f_swi')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);
                                    (document.getElementById('e_swi')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);
                                    (document.getElementById('e-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);
                                    (document.getElementById('g-div')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);
                                    (document.getElementById('s_hw')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);
                                    (document.getElementById('server-div')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);
                                    (document.getElementById('p-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    }), false);*/
                                    $('#g-switch, #p-switch, #p_swi, #f-switch, #f_swi, #e_swi, #e-switch, #g-div, #s_hw, #server-div').on('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    })
                                    );

                                } else {
                                    ////console.log('inside if else ')
                                    // //console.log('MAP IF  ELSE--->' + Object.keys(map['l' + switchid + portid]).length)
                                    map['l' + switchid + portid] = new LeaderLine(start,
                                        end,
                                        { color: '#ff3d57', hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'red', outlineColor: 'red', endPlugColor: 'red', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                    );

                                    const createObserver = (element) => {
                                        const observer = new MutationObserver((mutationsList) => {
                                            for (const mutation of mutationsList) {
                                                if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                                    map['l' + switchid + portid].position();
                                                    //console.log('<=======MUTATION OBSERVER IF TRIGGERED======>')
                                                } else {
                                                    map['l' + switchid + portid].position();
                                                    //console.log('<=======MUTATION OBSERVER ELSE TRIGGERED======>')
                                                }
                                            }
                                        });
                                        observer.observe(element, observerOptions);
                                        observers.push(observer);
                                    };


                                    const observerOptions = {
                                        childList: true, // Observe addition/removal of child elements
                                        subtree: true, // Observe the entire subtree
                                        tree: true,
                                    };
                                    createObserver.observe(document.getElementById('node-view-card'), observerOptions);
                                    createObserver.observe(document.getElementById('node-view'), observerOptions);


                                    
                                    // link = map['l' + switchid + portid]
                                    (start).addEventListener('mouseover', function () {
                                        (map['l' + switchid + portid]).show(['fade'[{ duration: 300, timing: 'linear' }]]);
                                    }, false);
                                    (start).addEventListener('mouseout', function () {
                                        (map['l' + switchid + portid]).hide(['fade'[{ duration: 300, timing: 'linear' }]]);
                                    }, false);
                                    (end).addEventListener('mouseover', function () {
                                        (map['l' + switchid + portid]).show(['fade'[{ duration: 300, timing: 'linear' }]]);
                                    }, false);
                                    (end).addEventListener('mouseout', function () {
                                        (map['l' + switchid + portid]).hide(['fade'[{ duration: 300, timing: 'linear' }]]);
                                    }, false);
                                    
                                    $('#g-switch, #p-switch, #p_swi, #f-switch, #f_swi, #e_swi, #e-switch, #g-div, #s_hw, #server-div').on('scroll', AnimEvent.add(function () {
                                        (map['l' + switchid + portid]).position();
                                    })
                                    );
                                }
                                updatedarrowdata(update['ip'], portid,update['link'],update['status'], (map['l' + switchid + portid]))
                            } else {
                                var b_clr = ''
                                switch (update['status']) {
                                    case 0:
                                        clr = '#ff3d57'
                                        b_clr = 'red'
                                        break;
                                    case 1:
                                        clr = '#e59105'
                                        b_clr = 'orange'
                                        break;

                                    default:
                                        b_clr = 'grey'
                                        clr = '#ffffff'
                                    //clr = '#ff3d57'
                                }
                                // //console.log('INSIDE if ELSE---->')
                                /*case 2:
                                        clr = '#16d39a'
                                        b_clr = 'green'
                                        break; */
                                var disconntext = ''
                                var oktext = ''
                                var unknowntext = ''


                                if (map['l' + switchid + portid]) {
                                    //  //console.log('INSIDE if ELSE IF---->')
                                    //  var x = eval('l' + switchid + portid)
                                    // var parentelm = document.getElementById('svg_contains');
                                    (map['l' + switchid + portid]).remove();

                                    map['l' + switchid + portid] = new LeaderLine(start,
                                        end,
                                        { color: clr, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                    );
                                } else {
                                    // //console.log('inside if else else')
                                    map['l' + switchid + portid] = new LeaderLine(start,
                                        end,
                                        { color: clr, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                    );

                                }
                                const createObserver = (element) => {
                                    const observer = new MutationObserver((mutationsList) => {
                                        for (const mutation of mutationsList) {
                                            if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                                map['l' + switchid + portid].position();
                                                //console.log('<=======MUTATION OBSERVER IF TRIGGERED======>')
                                            } else {
                                                map['l' + switchid + portid].position();
                                                //console.log('<=======MUTATION OBSERVER ELSE TRIGGERED======>')
                                            }
                                        }
                                    });
                                    observer.observe(element, observerOptions);
                                    observers.push(observer);
                                };


                                const observerOptions = {
                                    childList: true, // Observe addition/removal of child elements
                                    subtree: true, // Observe the entire subtree
                                    tree: true,
                                };
                                createObserver.observe(document.getElementById('node-view-card'), observerOptions);
                                createObserver.observe(document.getElementById('node-view'), observerOptions);


                                (start).addEventListener('mouseover', function () {
                                    (map['l' + switchid + portid]).show(['fade'[{ duration: 300, timing: 'linear' }]]);
                                }, false);
                                (start).addEventListener('mouseout', function () {
                                    (map['l' + switchid + portid]).show(['fade'[{ duration: 300, timing: 'linear' }]]);
                                }, false);
                                (end).addEventListener('mouseover', function () {
                                    (map['l' + switchid + portid]).show(['fade'[{ duration: 300, timing: 'linear' }]]);
                                }, false);
                                (end).addEventListener('mouseout', function () {
                                    (map['l' + switchid + portid]).show(['fade'[{ duration: 300, timing: 'linear' }]]);
                                }, false);
                                
                                /*(document.getElementById('g-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                }), false);
                                (document.getElementById('p-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                }), false);
                                (document.getElementById('f-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                }), false);
                                (document.getElementById('e_swi')).addEventListener('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                }), false);
                                (document.getElementById('p_swi')).addEventListener('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                }), false);
                                (document.getElementById('f_swi')).addEventListener('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                }), false);
                                (document.getElementById('e-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                }), false);
                                (document.getElementById('g-div')).addEventListener('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                }), false);
                                (document.getElementById('s_hw')).addEventListener('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                }), false);
                                (document.getElementById('server-div')).addEventListener('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                }), false);*/
                                $('#g-switch, #p-switch, #p_swi, #f-switch, #f_swi, #e_swi, #e-switch, #g-div, #s_hw, #server-div').on('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                })
                                );
                                updatedarrowdata(update['ip'], portid, update['link'], update['status'], (map['l' + switchid + portid]))
                            }

                        }
                    }

                    /////////////////////////////////////////////////////////
                    //   //console.log('UPDATE[ip]-->'+update['ip'])

                    // //console.log("updates-->" + JSON.stringify(update))
                });

                $("#node-view #" + swiclient.id + "-indicator").css('fill', '#16d39a')
            }
            var on_err = function (error) {
                //console.log('CONSOLE- IN ERROR')
                $("#node-view #" + swiclient.id + "-indicator").css('fill', '#ff3d57')
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = false;
                isToBeConnect = !{}[true];
                /* var iconhtml = ''
                 iconhtml += '<div class="row tooltip">'
                 iconhtml += '<p class="tooltiptext" id="' + wsitename + '">'
                 iconhtml += '<p style="font-size: 12px;margin-left: 11px;"><b>Queue Name :</b> switch_update</p>'
                 iconhtml += '<div class="col-12" style="display:flex;">'
                 iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: 0px;font-size: 11px;"><b>isConnected :</b> False(' + swiclient.connectionTries + ')</p>'
                 iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:block;font-size: 16px;margin-left: 30px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                 iconhtml += '</div>'
                 iconhtml += '<p style="font-size: 12px;margin-left: 12px;"><b>Lastconnect:</b>' + switchlastreconnect + '</p>'
                 iconhtml += '</p>'
                 iconhtml += '</div>'
                 $('#switsitesname').empty()
                 $('#switsitesname').append(iconhtml)*/
                document.getElementById(wsitename + 'swistatus-conn').innerText = 'False(' + swiclient.connectionTries + ')'
                document.getElementById(wsitename + 'swistatus-conn').style.color = "#ff3d57";
                document.getElementById('swit-pipe').style.color = '#ff3d57'
                $("#swidisplay-icon" + wsitename).css('display', 'block');
                document.getElementById(wsitename + 'swilast-conn').innerText = "Lastconnect : " + switchlastreconnect

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
                                     makeWebSwitchConnection(swiclient.ws.url, swiclient.id, 0, swiclient.criticalNodeCount)
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
                        iconhtml += '<div class="row tooltip">'
                        iconhtml += '<p class="tooltiptext" id="' + wsitename + '">'
                        iconhtml += '<p style="font-size: 12px;margin-left: 11px;"><b>Queue Name :</b> switch_update</p>'
                        iconhtml += '<div class="col-12" style="display:flex;">'
                        iconhtml += '<p class="col-9" style="color:#ffffff;margin-left: 0px;font-size: 11px;"><b>isConnected :</b> Trying(' + swiclient.connectionTries + ')</p>'
                        iconhtml += '<p class="col-3" id="display-icon' + wsitename + '" style="display:block;font-size: 16px;margin-left: 30px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                        iconhtml += '</div>'
                        iconhtml += '<p style="font-size: 12px;margin-left: 12px;"><b>Lastconnect:</b>' + switchlastreconnect + '</p>'
                        iconhtml += '</p>'
                        iconhtml += '</div>'
                        $('#switsitesname').empty()
                        $('#switsitesname').append(iconhtml)*/
                        document.getElementById(wsitename + 'swistatus-conn').innerText = 'Trying(' + swiclient.connectionTries + ')'
                        document.getElementById(wsitename + 'swistatus-conn').style.color = "#e99123";
                        document.getElementById('swit-pipe').style.color = '#e99123'
                        $("#swidisplay-icon" + wsitename).css('display', 'block');
                        document.getElementById(wsitename + 'swilast-conn').innerText = "Lastconnect : " + switchlastreconnect

                        if (isToBeConnect = {}[true]) {
                            makeWebSwitchConnection(swiclient.ws.url, swiclient.id, swiclient.connectionTries)
                            // makeWebSwitchConnection(swiclient.ws.url, swiclient.id, swiclient.connectionTries, swiclient.criticalNodeCount)
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
