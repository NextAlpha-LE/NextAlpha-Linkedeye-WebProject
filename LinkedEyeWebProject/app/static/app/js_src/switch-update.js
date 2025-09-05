
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
var sitesData = [];
entitySelectedsite = ' '
var siteResponse;
var entityResponse;
var sortedJson = {};
var nodeList;
var switchlastreconnect = "";
var map = {}
var sclient = {}
var portcount = [];
var switchips = [];
var switchportscount = {};
var pause_supdate = [];

$(document).ready(function () {
    FirstTimeDataLoad()

});
function getarrowdata(id, data) {
    map[id] = data
}
function getEntityDatas() {
    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site") }, type = "GET").done(FirstTimeDataLoad);
}
function FirstTimeDataLoad() {
    var sitename = params.get("site")
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        var websocurl = res['data'][0]['websocket_url']
    });
}

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
    var swiclient = 'client' + (random)
    try {
        if (window.WebSocket) {
            var destination = "/exchange/switch_update";
            swiclient = Stomp.client(websocketurl);
            swiclient.id = wsitename
            swiclient.connectionTries = tries;
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
            iconhtml += '<p class="col-3" id="swidisplay-icon' + wsitename + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
            iconhtml += '</div>'
            $('#switsitesname').empty()
            $('#switsitesname').append(iconhtml)
            var on_conn = function () {
                wsConnected = true;
                var obj = sitesData[0]
                obj.isWSConnected = true;
                isToBeConnect = {}[true];
                document.getElementById(wsitename + 'swistatus-conn').innerText = 'True(0)'
                document.getElementById(wsitename + 'swistatus-conn').style.color = "#16d39a";
                document.getElementById('swit-pipe').style.color = '#16d39a'
                $("#swidisplay-icon" + wsitename).css('display', 'none');
                document.getElementById(wsitename + 'swilast-conn').innerText = "Lastconnect : " + switchlastreconnect
                swiclient.subscribe(destination, function (message) {
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
                        if (document.getElementById('ip_' + update['ip'].replaceAll(".", "_") + ':NIC'))
                            document.getElementById('ip_' + update['ip'].replaceAll(".", "_") + ':NIC').style.border = '2px solid ' + color;
                        InitialswitchUpdate(update);
                        swapServers()
                    }
                    if (update['title'] == update['ip'] + ':' + update['mode']) {
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
                                    item = item.toString();
                                    if (item in stats_list) {
                                        for (const [key, value] of Object.entries(stats_list[item])) {
                                            tooltp_default += '<tr style="color:' + stats_clr[item] + '"><td id="' + key.replaceAll('.', '_') + ':' + imagetype + '" >' + key + ' - </td> <td>' + value + '</td></tr>'
                                        }
                                    }
                                });
                                tooltp_txt += tooltp_default
                                tooltp_txt += '</table>'
                                if (document.getElementById((update['title']).replaceAll('.', '_') + "_tooltip") != null) {
                                    document.getElementById((update['title']).replaceAll('.', '_') + "_tooltip").innerHTML = tooltp_txt;
                                }
                            }
                        }
                        InitialhardwareUpdates(update);
                    }

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
                            break;
                        case 5:
                            color = '#1f1f1f'
                            break;
                        default:
                            color = '#ffffff'
                    }

                    var portid = update['port']
                    /*if (update['port'] != undefined && update['port'] != null && update['port'] != "") {
                        console.log("switch update----->" + update['ip'] + "----->" + update['port'] + "------->"+color)
                        portprevclr = $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port'].replaceAll('/', '_').replaceAll(':', '~')).css('fill')
                        $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port'].replaceAll('/', '_').replaceAll(':', '~')).css('fill', color)
                        portid = update['port'].replaceAll('/', '_').replaceAll(':', '~')
                    }*/
                    if (update['port'] != undefined && update['port'] != null && update['port'] != "") {
                        let ipId = update['ip'].replaceAll(".", "_");
                        let portId;

                        // if port has ":", replace with "~", else only replace "/"
                        if (update['port'].includes(":")) {
                            //console.log("switch update (if) -----> " + update['ip'] + " -----> " + update['port'] + " -------> " + color);
                            portId = update['port'].replaceAll('/', '_').replaceAll(':', '~');
                        } else {
                           // console.log("switch update (else) -----> " + update['ip'] + " -----> " + update['port'] + " -------> " + color);
                            portId = update['port'].replaceAll('/', '_');
                        }

                        const cssEscape = (str) =>
                            (window.CSS && CSS.escape) ? CSS.escape(str) :
                                str.replace(/([ !"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, '\\$1');

                        // 1. Try inside IP wrapper
                        let $el = $(`#${cssEscape(ipId)} #${cssEscape(portId)}`);

                        // 2. Fallback: direct ID
                        if ($el.length === 0) $el = $(`#${cssEscape(portId)}`);

                        // 3. Fallback: class "portId-ipId"
                        if ($el.length === 0) $el = $(`.${cssEscape(portId)}-${cssEscape(ipId)}`);

                        if ($el.length === 0) {
                            console.warn("Port element not found for", update);
                        } else {
                            // store previous fill
                            portprevclr = $el.css('fill');

                            // update fill
                            $el.attr('fill', color).css('fill', color);

                            // store the cleaned portId for reference
                            portid = portId;
                        }
                    }
                    /////////////////////////////////////////////////////////
                    var link = '';
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
                    if (overview_data.hasOwnProperty('2')) {
                        oktext = overview_data['2'][0]
                        tot_ok = Number(overview_data['2'][0])
                    } else {
                        oktext = 0
                    }
                    if (overview_data.hasOwnProperty('0')) {
                        intext = overview_data['0'][0]
                        tot_critical = Number(overview_data['0'][0])
                    } else {
                        intext = 0
                    }
                    if (overview_data.hasOwnProperty('1')) {
                        disconntext = overview_data['1'][0]
                        tot_warning = Number(overview_data['1'][0])
                    } else {
                        disconntext = 0
                    }
                    if (overview_data.hasOwnProperty('3')) {
                        unknowntext = overview_data['3'][0]
                        tot_unknown = Number(overview_data['3'][0])
                    } else {
                        unknowntext = 0
                    }
                    if (((document.getElementById('pills-ok-tab' + tab_id))) || ((document.getElementById('pills-ok-tabip_' + tab_id)))) {

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
                        badgeHtml += '<i class="mdi icon-data mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + tot_critical + '</div>'
                        $('#badgeip_' + tab_id).css('background-color', 'red')
                    } else if ((tot_warning > 0)) {
                        badgeHtml += '<i class="mdi icon-data  mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + tot_warning + '</div>'
                        $('#badgeip_' + tab_id).css('background-color', 'orange')
                    } else if ((tot_unknown > 0)) {
                        badgeHtml += '<i class="mdi icon-data  mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + tot_unknown + '</div>'
                        $('#badgeip_' + tab_id).css('background-color', 'white')
                        $('#badgeip_' + tab_id).css('color', 'grey')
                    } else if ((tot_ok > 0)) {
                        badgeHtml += '<i class="mdi icon-data  mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + tot_ok + '</div>'
                        $('#badgeip_' + tab_id).css('background-color', 'green')
                    }

                    $('#badgeip_' + tab_id).html(badgeHtml)

                    ////////////////////////////////////////////////////////////BADGE HTML UPDATE BLOCK/////////////////////////////////////////////////////////////////////

                    var chartresponse = { "hardware": { "CRITICAL": hardware_critical, "OK": hardware_ok, "WARNING": hardware_warning, "UNKNOWN": hardware_unknown }, "software": { "CRITICAL": software_critical, "OK": software_ok, "WARNING": software_warning, "UNKNOWN": software_unknown }, "application": { "CRITICAL": application_critical, "OK": application_ok, "WARNING": application_warning, "UNKNOWN": application_unknown } };

                    if (typeof getnewchart === 'function') {
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

                    ////////////////////////////////////////ENTITY ELEMENTS COUNT CHANGE////////////////////////////////////////////////

                    //SERVER LEADERLINE
                    if (update.hasOwnProperty('mode')) {
                        if (update['mode'].includes('NIC') && update['mode'] != undefined) {
                            requestDataFromServer('/entity/getneo4jspecificelement', { title: update['ip'], required: 'link', sitename: selectedsite }, "GET").done(function (response) {
                                var res = JSON.parse(response);
                                messagedata = res['data']['data']
                                var start = document.getElementById(update['ip'] + ':NIC')
                                var end = document.getElementById(messagedata + ':NIC')
                                if (start != null && end != null && end != undefined) {
                                    if (update['status'].toString() == '0') {
                                        if (map['s' + update['ip'].replaceAll(".", "_")]) {
                                            (map['s' + update['ip'].replaceAll(".", "_")]).remove();
                                            map['s' + update['ip'].replaceAll(".", "_")] = new LeaderLine(start,
                                                end,
                                                { color: '#ff3d57', positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'red', outlineColor: 'red', endPlugColor: 'red', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                            );

                                            const createObserver = (element) => {
                                                const observer = new MutationObserver((mutationsList) => {
                                                    for (const mutation of mutationsList) {
                                                        if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                                            map['s' + update['ip'].replaceAll(".", "_")].position();
                                                        } else {
                                                            map['s' + update['ip'].replaceAll(".", "_")].position();
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
                                            map['s' + update['ip'].replaceAll(".", "_")] = new LeaderLine(start,
                                                end,
                                                { color: '#ff3d57', positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'red', outlineColor: 'red', endPlugColor: 'red', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                            );
                                            const createObserver = (element) => {
                                                const observer = new MutationObserver((mutationsList) => {
                                                    for (const mutation of mutationsList) {
                                                        if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                                            map['s' + update['ip'].replaceAll(".", "_")].position();
                                                        } else {
                                                            map['s' + update['ip'].replaceAll(".", "_")].position();
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
                                        if (map['s' + update['ip'].replaceAll(".", "_")]) {
                                            (map['s' + update['ip'].replaceAll(".", "_")]).remove();

                                            map['s' + update['ip'].replaceAll(".", "_")] = new LeaderLine(start,
                                                end,
                                                { color: clr, hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                            );
                                        } else {
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
                                                    } else {
                                                        map['s' + update['ip'].replaceAll(".", "_")].position();
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
                                        $('#g-switch, #g-div, #s_hw, #server-div').on('scroll',
                                            AnimEvent.add(function () {
                                                (map['s' + update['ip'].replaceAll(".", "_")]).position();
                                            })
                                        );
                                        getniccondata(update['ip'], map['s' + update['ip'].replaceAll(".", "_")])
                                    }
                                }
                            });
                        }
                }
                    if (update['link'] != 'null' && jQuery.isEmptyObject(update['link']) != true && jQuery.isEmptyObject(update['mode']) == true && update['status'] != 4) {
                        var start_id = update['ip'].replaceAll(".", "_")
                        var start = (document.getElementsByClassName((portid + '-' + start_id))[0])
                        var end = '';
                        update['link'] = update['link'].replaceAll(/\s/g, "")
                        if (update['link'].includes(':') && (document.getElementById((update['link'].split(":")[0]).replaceAll(".", "_"))) != null) {
                            var end_id = (update['link'].split(":")[0]).replaceAll(".", "_")
                            var end_portid = (update['link'].split(":")[1]).replaceAll(".", "_")
                            end = (document.getElementsByClassName((end_portid + '-' + end_id))[0])
                        } else {
                            var classelements = document.getElementsByClassName((update['link'].split(":")[0]).replaceAll(".", "_") + ':NIC')
                            end = classelements[0];
                        }
                        var switchid = update['ip'].replaceAll(".", "_");
                        if (portid != undefined && portid != null && start != null && end != null && end != undefined) {
                            $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port'].replaceAll('/', '_').replaceAll(':', '~')).css('fill', color)
                            var clr
                            if (update['status'].toString() == '2') {
                                if (map['l' + switchid + portid]) {
                                    (map['l' + switchid + portid]).remove();
                                    map['l' + switchid + portid] = new LeaderLine(start,
                                        end,
                                        { color: '#16d39a', hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                    );

                                    const createObserver = (element) => {
                                        const observer = new MutationObserver((mutationsList) => {
                                            for (const mutation of mutationsList) {
                                                if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                                    map['l' + switchid + portid].position();
                                                } else {
                                                    map['l' + switchid + portid].position();
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

                                } else {
                                    map['l' + switchid + portid] = new LeaderLine(start,
                                        end,
                                        { color: '#ff3d57', hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'red', outlineColor: 'red', endPlugColor: 'red', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                    );

                                    const createObserver = (element) => {
                                        const observer = new MutationObserver((mutationsList) => {
                                            for (const mutation of mutationsList) {
                                                if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                                    map['l' + switchid + portid].position();
                                                } else {
                                                    map['l' + switchid + portid].position();
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
                                }
                                var disconntext = ''
                                var oktext = ''
                                var unknowntext = ''

                                if (map['l' + switchid + portid]) {
                                    (map['l' + switchid + portid]).remove();

                                    map['l' + switchid + portid] = new LeaderLine(start,
                                        end,
                                        { color: clr, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                    );
                                } else {
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
                                            } else {
                                                map['l' + switchid + portid].position();
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
                                $('#g-switch, #p-switch, #p_swi, #f-switch, #f_swi, #e_swi, #e-switch, #g-div, #s_hw, #server-div').on('scroll', AnimEvent.add(function () {
                                    (map['l' + switchid + portid]).position();
                                })
                                );
                                updatedarrowdata(update['ip'], portid, update['link'], update['status'], (map['l' + switchid + portid]))
                            }

                        }
                    }
                });

                $("#node-view #" + swiclient.id + "-indicator").css('fill', '#16d39a')
            }
            var on_err = function (error) {
                $("#node-view #" + swiclient.id + "-indicator").css('fill', '#ff3d57')
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = false;
                isToBeConnect = !{}[true];
                document.getElementById(wsitename + 'swistatus-conn').innerText = 'False(' + swiclient.connectionTries + ')'
                document.getElementById(wsitename + 'swistatus-conn').style.color = "#ff3d57";
                document.getElementById('swit-pipe').style.color = '#ff3d57'
                $("#swidisplay-icon" + wsitename).css('display', 'block');
                document.getElementById(wsitename + 'swilast-conn').innerText = "Lastconnect : " + switchlastreconnect
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
                    }
                    else {
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
                        document.getElementById(wsitename + 'swistatus-conn').innerText = 'Trying(' + swiclient.connectionTries + ')'
                        document.getElementById(wsitename + 'swistatus-conn').style.color = "#e99123";
                        document.getElementById('swit-pipe').style.color = '#e99123'
                        $("#swidisplay-icon" + wsitename).css('display', 'block');
                        document.getElementById(wsitename + 'swilast-conn').innerText = "Lastconnect : " + switchlastreconnect

                        if (isToBeConnect = {}[true]) {
                            makeWebSwitchConnection(swiclient.ws.url, swiclient.id, swiclient.connectionTries)
                        }
                    }
                }
            };
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
