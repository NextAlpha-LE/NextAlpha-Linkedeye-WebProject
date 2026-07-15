var siteinfo
var wsConnected = false;
var connectionTries = 6;
var sitesData = [];
var count = 1;
var counts = 1;
var SiteObj;
var arr = {};
var statearr = {};
var dataarr = [];
var a;
var websitename = '';
var maplastreconnect = "";
var worldobject;
var isappended = true
var istableappended = true
var mclient = {}
var mapobj = {}
var mapsdata = ''
var allSiteNames = ''
var mapsitedata = {}
var mapintervaldata = {}
var worldstatusdata = {}
var targetdata = {}
var worldstatus = ''
var totalstatus = 0;
var sitecount = 0;
var env_types = {} ;
var env_sites = {} ;
var e_type = '' ;
var active_tab = '' ;
var tempObj = {
    'hardware': { "CRITICAL": 0, "OK": 0, "WARNING": 0, "UNKNOWN": 0 },
    'software': { "CRITICAL": 0, "OK": 0, "WARNING": 0, "UNKNOWN": 0 },
    'application': { "CRITICAL": 0, "OK": 0, "WARNING": 0, "UNKNOWN": 0 }
}
var chartdata_list = {}
var env_chart_list = {}
var sitenull_list = {}
var ind_map='';
var world_map_instance = null;

function destroyVectorMapIfPresent(selector) {
    try {
        var mapObj = $(selector).vectorMap('get', 'mapObject');
        if (mapObj && typeof mapObj.remove === 'function') {
            mapObj.remove();
        }
    } catch (e) {
        // Map instance may not exist yet for this selector.
    }
}

$(document).ready(function () {
    if (sessionStorage.getItem('tempobj')) {
        let data_for_chart = sessionStorage.getItem('tempobj');
        let heat_map_html = sessionStorage.getItem('heatmapHtml');
        fillHostServiceCount(JSON.parse(data_for_chart));
        $('#incorrect_data').append('<h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%;text-align: center;top: 13%;position: absolute;"> REFRESHING.... </h3>')
        sessionStorage.removeItem('tempobj');
        sessionStorage.removeItem('heatmapHtml');
    }
})
function maprefresh() {
    $('#left-arrow').hide();
    $('#right-arrow').hide();
    $('#refresh-btn').hide();
    mapsitedata = {}
    sitecount = 0;
    mapload();
    if (document.getElementById('audience-map-div').classList.contains('map-height')) {
        document.getElementById('audience-map-div').classList.remove('map-height')
    }
    count++
}
function createHeatmap() {
    var totalHtml = ''
    var dataHtml = ''
    document.getElementById("arrow_icons").innerHTML ='';
    for (const [key, value] of Object.entries(chartdata_list)) {
        var chart_env = value['environment']
        var clr_state = 'red'
        if (value.hardware["0"] > 0 || value.software["0"] > 0 || value.application["0"] > 0) {
            clr_state = 'red'
        } else if (value.hardware["1"] > 0 || value.software["1"] > 0 || value.application["1"] > 0) {
            clr_state = 'orange'
        } else if (value.hardware["2"] > 0 || value.software["2"] > 0 || value.application["2"] > 0) {
            clr_state = 'green'
        } else {
            clr_state = 'white'
        }
        var timing = gettime()
        var html_txt = '';
        html_txt += "<tr id='" + key + "datarow'>";
        html_txt += "<td class = 'site fixed-column' id='" + key + "datasitename' >\
                            <a class='dropdown-item preview-item dropdown-item-height' href = '/lesites?site=" + key + "' target = '_blank' > \
                            <div class='preview-item- content'  style='text-align: center; '> \
                            <p class='preview-subject' id='" + key + "datafont' style='color: " + clr_state + ";font-size:medium'>" + key + "</p> \
                            </div> \
                            </a>\
                            </td>";
        ////////////////TABLE DATA PART////////////////////////
        html_txt += "<td class='td-min-width' id='" + key + "hardware_critical' style='border-left: 3px solid #fff;border-bottom: 1px solid #000;text-align:center;background-color:red;color:white'> <a  href = '/lesites?site=" + key + "' target = '_blank' > " + parseInt(chartdata_list[key]['hardware']['0']) + " </a>  </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "hardware_warning' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:orange;color:white'>  <a  href = '/lesites?site=" + key + "' target = '_blank' >  " + parseInt(chartdata_list[key]['hardware']['1']) + " </a>  </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "hardware_ok' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:green;color:white'> <a  href = '/lesites?site=" + key + "' target = '_blank' >  " + parseInt(chartdata_list[key]['hardware']['2']) + " </a> </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "hardware_unknown' style='border-right:3px solid #fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:grey;color:white'><a  href = '/lesites?site=" + key + "' target = '_blank' style='color:white' > " + parseInt(chartdata_list[key]['hardware']['3']) + "</a> </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "software_critical' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:red;color:white'> <a  href = '/lesites?site=" + key + "' target = '_blank' >  " + parseInt(chartdata_list[key]['software']['0']) + " </a> </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "software_warning' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:orange;color:white'>  <a href = '/lesites?site=" + key + "' target = '_blank' >" + parseInt(chartdata_list[key]['software']['1']) + " </a>  </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "software_ok' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:green;color:white'>  <a  href = '/lesites?site=" + key + "' target = '_blank' > " + parseInt(chartdata_list[key]['software']['2']) + "</a>  </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "software_unknown' style='border-right:3px solid #fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:grey;color:white'>   <a  href = '/lesites?site=" + key + "' target = '_blank' style='color:white'>" + parseInt(chartdata_list[key]['software']['3']) + " </a> </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "application_critical' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:red;color:white'>  <a  href = '/lesites?site=" + key + "' target = '_blank' > " + parseInt(chartdata_list[key]['application']['0']) + " </a> </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "application_warning' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:orange;color:white'> <a  href = '/lesites?site=" + key + "' target = '_blank' > " + parseInt(chartdata_list[key]['application']['1']) + "</a></td>";
        html_txt += "<td class='td-min-width'  id='" + key + "application_ok' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:green;color:white'> <a  href = '/lesites?site=" + key + "' target = '_blank' >  " + parseInt(chartdata_list[key]['application']['2']) + " </a> </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "application_unknown' style='border-right:3px solid #fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:grey;color:white'>  <a  href = '/lesites?site=" + key + "' target = '_blank'style='color:white' > " + parseInt(chartdata_list[key]['application']['3']) + " </a> </td>";
        //////////////////TABLE DATA PART///////////////////////////
        html_txt += "<td class='td-min-width'  id='" + key + "datarefresh' onclick='seperateRef(\"" + targetdata[key + 'site'] + "\",\"" + key + "\")' class='has-details' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:green'>&emsp; &emsp;&emsp;  <i class='  mdi mdi-sync' ></i><span class='alignr details'>" + targetdata[key + 'site'] + "</span>  &emsp;&emsp; &emsp;  </td>";
        html_txt += "<td class='td-min-width'  id='" + key + "datatime' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'>" + timing['hour'] + ':' + timing['minute'] + ':' + timing['second'] + "  </td>";
        html_txt += "</tr>";
        env_types[chart_env] += html_txt
    }
    var if_one = 1;
    var env_priority = ['PROD', 'UAT', 'DEV'];
    env_priority.forEach(function (key) {
        if (env_types.hasOwnProperty(key)) {
            totalHtml += '<div id="' + key + '-entity" class="disp_none  entity-view">';
            totalHtml += '<table class="tables " >';
            totalHtml += '<thead class="table-head border-t" style="text-align:center">';
            totalHtml += '<tr>';
            totalHtml += '<th class="fixed-column" rowspan="2">DOMAINNAME</th>';
            totalHtml += '<th colspan="4" style="border-right:2px solid #fff;border-left:2px solid #fff;border-top:3px solid #fff;">Hardwares</th>';
            totalHtml += '<th colspan="4" style="border-right:2px solid #fff;border-top:2px solid #fff;">Soft limits</th>';
            totalHtml += '<th colspan="4" style="border-right:2px solid #fff;border-top:2px solid #fff;">Applications</th>';
            totalHtml += '<th colspan="2">Time</th>';
            totalHtml += '</tr>';
            totalHtml += '<tr>';
            totalHtml += '<th class="has-details"style="border-left:2px solid #fff;"><i class="mdi mdi-alpha-c-box" style="font-size:1.5rem"></i><span class=" details">CRITICAL</span></th>';
            totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-w-box" style="font-size:1.5rem"></i><span class=" details">WARNING</span></th>';
            totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-o-box" style="font-size:1.5rem"></i><span class=" details">OK</span></th>';
            totalHtml += '<th class="has-details"style="border-right:2px solid #fff;"><i class="mdi mdi-alpha-u-box" style="font-size:1.5rem"></i><span class=" details">UNKNOWN</span></th>';
            totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-c-box" style="font-size:1.5rem"></i><span class=" details">CRITICAL</span></th>';
            totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-w-box" style="font-size:1.5rem"></i><span class=" details">WARNING</span></th>';
            totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-o-box" style="font-size:1.5rem"></i><span class=" details">OK</span></th>';
            totalHtml += '<th class="has-details" style="border-right:2px solid #fff;"><i class="mdi mdi-alpha-u-box" style="font-size:1.5rem"></i><span class=" details">UNKNOWN</span></th>';
            totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-c-box" style="font-size:1.5rem"></i><span class=" details">CRITICAL</span></th>';
            totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-w-box" style="font-size:1.5rem"></i><span class=" details">WARNING</span></th>';
            totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-o-box" style="font-size:1.5rem"></i><span class=" details">OK</span></th>';
            totalHtml += '<th class="has-details" style="border-right:2px solid #fff;"><i class="mdi mdi-alpha-u-box" style="font-size:1.5rem"></i><span class=" details">UNKNOWN</span></th>';
            totalHtml += '<th class="has-details"><i class="fas fa-exchange-alt" style="display:contents !important;font-size:20px"></i><span class=" details">CONNECTIONS</span></th>';
            totalHtml += '<th class="has-details"><i class="mdi mdi-alarm-check" style="font-size:1.5rem"></i><span class=" details">LAST UPDATE</span></th>';
            totalHtml += '</tr>';
            totalHtml += '</thead>';
            totalHtml += '<tbody class="accordion list" id="accordionExample" >';
            totalHtml += env_types[key]
            totalHtml += "</tbody>";
            totalHtml += "</table>";
            totalHtml += "</div>";
            var heat_id = key + '-table';
            var entity_id = key + '-entity';
            var arrowhtml = '';
            if (if_one == 1) {
                arrowhtml += '<i class="arrow_icons  mdi mdi-chevron-left-box" id="' + key + '-left-arrow" style=" z-index:1000;opacity:0.3" onclick="switchview(\'' + heat_id + '\')"></i>';
                arrowhtml += '<i class="arrow_icons  mdi mdi-chevron-right-box" id = "' + key + '-right-arrow" style = " z-index:1000" onclick = "switchview(\'' + entity_id + '\')" ></i> '
            } else {
                arrowhtml += '<i class="arrow_icons  mdi mdi-chevron-left-box disp_none" id="' + key + '-left-arrow" style=" z-index:1000;opacity:0.3" onclick="switchview(\'' + heat_id + '\')"></i>';
                arrowhtml += '<i class="arrow_icons  mdi mdi-chevron-right-box disp_none" id = "' + key + '-right-arrow" style = " z-index:1000" onclick = "switchview(\'' + entity_id + '\')"></i> '
            }
            document.getElementById("arrow_icons").innerHTML += arrowhtml;
            if_one++;
        }
    });
    $('#empty-div').append(totalHtml)
    // Do NOT store the full heatmap HTML in sessionStorage on every refresh cycle.
    // That serialises megabytes of markup into storage RAM unnecessarily.
    // It is only read once at page load (in document.ready) and cleared immediately.
}
function appendheatmap(heatmaphtml) {
    isappended = false
    var if_one = 1;
    var env_priority = ['PROD', 'UAT', 'DEV'];
    env_priority.forEach(function (key) {
        if (env_chart_list.hasOwnProperty(key)) {
            if (if_one == 1) {
               fillHostServiceCount(env_chart_list[key])
            } 
            if_one++;
        }
    });
    sessionStorage.setItem('tempobj', JSON.stringify(tempObj))
    // Use jQuery .empty() instead of innerHTML = "" so that any jQuery event
    // handlers attached to child elements are properly unbound before removal.
    $('#heat-map').empty();
    $('#incorrect_data').empty();
    $('#heat-map').append(heatmaphtml)
    $('#refresh-btn').show();
    $('#heat-map-div').css({ 'max-height': window.innerHeight });
    createHeatmap()
}
function siteredirect(link, button) {
    sessionStorage.setItem('tempobj', JSON.stringify(tempObj))
    sessionStorage.setItem('heatmapHtml', $('#heat-map').html())
    sessionStorage.setItem('click-this-button-after-page-loads', button)
    window.open(link, "_self")
}
function switchmap() {
    if (document.getElementById('audience-map-div').classList.contains('show-map')) {
        document.getElementById('audience-map-div').classList.remove("show-map");
        document.getElementById('heat-map-div').classList.add('show-map')
        document.getElementById('heat-map-div').style.animation = 'leftmove 2s'
        document.getElementById('left-arrow').style.opacity = 1
        document.getElementById('right-arrow').style.opacity = 0.3

    } else {
        document.getElementById('heat-map-div').classList.remove("show-map");
        document.getElementById('audience-map-div').classList.add('show-map')
        document.getElementById('audience-map-div').style.animation = 'rightmove 2.5s'
        document.getElementById('left-arrow').style.opacity = 0.3
        document.getElementById('right-arrow').style.opacity = 1
    }
}
function handleTabClick(tabName) {
    active_tab = tabName
    document.getElementById('active-env').innerText = tabName + ' ENV'
    createChart('','')
    if (e_type != '') {
        document.getElementById(e_type + '-left-arrow').style.opacity = 0.3
        document.getElementById(e_type + '-right-arrow').style.opacity = 1
        document.getElementById(tabName + '-left-arrow').style.opacity = 0.3
        document.getElementById(tabName + '-right-arrow').style.opacity = 1
    }
    // Hide all tables
    var tables = document.getElementsByClassName("table");
    for (var i = 0; i < tables.length; i++) {
        if (!(tables[i].classList.contains("disp_none"))) {
            tables[i].classList.add('disp_none');
        }
    }
    var arrow_icons = document.getElementsByClassName("arrow_icons");
    for (var i = 0; i < arrow_icons.length; i++) {
        if (!(arrow_icons[i].classList.contains("disp_none"))) {
            arrow_icons[i].classList.add('disp_none');
            
        }
    }
    var entity_view = document.getElementsByClassName("entity-view");
    for (var i = 0; i < entity_view.length; i++) {
        if (!(entity_view[i].classList.contains("disp_none"))) {
            entity_view[i].classList.add('disp_none');
        }
    }
    // Remove active class from all tabs
    var tabs = document.getElementsByClassName("tabs")[0].getElementsByTagName("button");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    // Show the clicked tab and table
    document.getElementById(tabName + "-table").classList.remove('disp_none');
    document.getElementById(tabName + "-left-arrow").classList.remove('disp_none');
    document.getElementById(tabName + "-right-arrow").classList.remove('disp_none');
    document.getElementById(tabName + "-tab").classList.add("active");
}
function switchview(etype) {
    e_type = etype.split('-')[0]
    var env_type = etype.split('-')
    if (env_type[1] == 'table') {
        if (document.getElementById(etype).classList.contains('disp_none')) {
            document.getElementById(etype).classList.remove("disp_none");
        }
        if (!(document.getElementById(env_type[0]+'-entity').classList.contains('disp_none'))) {
            document.getElementById(env_type[0] + '-entity').classList.add('disp_none')
        }
        document.getElementById(env_type[0]+'-left-arrow').style.opacity = 0.3
        document.getElementById(env_type[0] +'-right-arrow').style.opacity = 1
    } else {
        if (document.getElementById(etype).classList.contains('disp_none')) {
            document.getElementById(etype).classList.remove("disp_none");
        }
        if (!(document.getElementById(env_type[0] + '-table').classList.contains('disp_none'))) {
            document.getElementById(env_type[0] + '-table').classList.add('disp_none')
        }
        document.getElementById(env_type[0] +'-left-arrow').style.opacity = 1
        document.getElementById(env_type[0] +'-right-arrow').style.opacity = 0.3
    }
}
function pinfunc(select, id) {
    if (select.classList.contains('selected-btn')) {
        select.classList.remove("selected-btn");
        document.getElementById(id).classList.remove('list-hover')
    } else {
        select.classList.add("selected-btn");
        document.getElementById(id).classList.add('list-hover')
    }

}
function pinheatmap(heatmapid) {
    var rowelem = document.getElementById(heatmapid)
    var heatpin = document.getElementById('heat-pin')
    if (rowelem.classList.contains('sticky-div')) {//unpin
        rowelem.classList.remove("sticky-div");
        heatpin.classList.remove("mdi-pin");
        heatpin.classList.add("mdi-pin-outline");
        heatpin.style.color = '#fff'
        maprefresh();
    } else {                                 //pin
        rowelem.classList.add("sticky-div");
        heatpin.classList.remove("mdi-pin-outline");
        heatpin.classList.add("mdi-pin");
        heatpin.style.color = '#e99123'
    }

}
function opensitesmodal(select) {
    if (select.classList.contains('show-modal')) {
        select.classList.remove("show-modal");
    } else {
        select.classList.add("show-modal");
    }

}

var getJSON = async function (url, nameofsite) {
    return await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.timeout = 5000; // time in milliseconds
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                (reject(status));
            }
        };
        xhr.ontimeout = () => {
            reject({
                site: nameofsite,
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.onerror = function () {
            reject({
                site: nameofsite,
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};
function dismissfunc(select) {
    select.parentElement.style.display = 'none'
}

async function triggerThis(response) {
    var markerarray = [];
    var res = JSON.parse(response);
    siteinfo = res.data;
    var statename = '';
    var state_color = '';
    var counting1 = 0;
    var counting2 = 0;
    var statusdata;
    var c = 0;
    var hostHtml = "";
    for (let index = 0; index < siteinfo.length; index++) {
        var sitesdata = siteinfo[index]
        const target = new URL('sitehealth/overall', sitesdata["le_url"]);
        //  const target = new URL('sitehealth/overall', 'http://localhost:8080');
        const params = new URLSearchParams();
        params.set('sitename', sitesdata["sitename"]);
        target.search = params.toString();
        await getJSON(new URL(target, sitesdata["le_url"]), sitesdata["sitename"]).then(function (data) {
            if ((data) == null) {
                var errorhtml = ''
                arr[sitesdata["location"]] = 'red';
                if (c < 1) {
                    //  var element = document.getElementById('map')
                } else {
                    //  errorhtml = '<h2 style="font-size:16px;white-space:nowrap;text-align:left">' + sitesdata["sitename"] + '</h2>'
                }
                c++
            } else {
                statusdata = data.data
                var y = 0
                var texthtml = '<h2 style="font-size:16px;white-space:nowrap;text-align:left">' + sitesdata["sitename"] + ' - ' + statusdata + '</h2>'
                var bod = statusdata["bod"]
                var eod = statusdata["eod"]
                var adp = statusdata["adp"]
                var entity = statusdata["entity"]
                status = (bod === 0 || eod === 0 || adp === 0 || entity === 0) ? 0 :
                    (bod === 1 || eod === 1 || adp === 1 || entity === 1) ? 1 :
                        (bod === 2 && eod === 2 && adp === 2 && entity === 2) ? 2 : 3;
                statearr[sitesdata["sitename"]] = (status == 1 ? 'orange' : status == 2 ? 'green' : status == 3 ? 'white' : 'red')
                markerarray.push({ "latLng": [parseFloat(sitesdata.lat) + parseFloat(y), parseFloat(sitesdata.lng) + parseFloat(y)], "name": sitesdata.sitename, 'bod': bod, 'eod': eod, 'adp': adp, 'entity': entity, "status": status, "weburl": '/lesites?site=' + sitesdata.sitename, "statename": sitesdata.location, "colorarray": '' })
                statename = markerarray[counting2].statename;
                state_color = (markerarray[counting2].status == 1 ? 'orange' : markerarray[counting2].status == 2 ? 'green' : markerarray[counting2].status == 3 ? 'white' : 'red')
                if (((markerarray[counting2].statename in arr)) && ((arr[markerarray[counting2].statename] == state_color))) {
                    arr[statename] = state_color;
                } else if (((markerarray[counting2].statename in arr)) && ((arr[markerarray[counting2].statename] == 'red'))) {
                    arr[statename] = 'red';
                } else if (((markerarray[counting2].statename in arr)) && ((arr[markerarray[counting2].statename] == 'orange'))) {
                    if (state_color == 'red') {
                        state_color = 'red';
                    } else {
                        state_color = 'orange';
                    }
                    arr[statename] = (state_color);
                } else if (((markerarray[counting2].statename in arr)) && ((arr[markerarray[counting2].statename] == 'green'))) {
                    state_color = 'green';
                    if (state_color == 'red') {
                        state_color = 'red';
                    } else if (state_color == 'orange') {
                        state_color = 'orange';
                    }
                    arr[statename] = (state_color);
                } else {
                    arr[statename] = (state_color);
                }
                counting2++;
            }
        }).catch(function (err) {
            var errorhtml = ''
            if (c < 1) {
                // var element = document.getElementById('map')
            } else {
                //  errorhtml = '<h2 style="font-size:16px;white-space:nowrap;text-align:left">' + sitesdata["sitename"]  + '</h2>'
            }
            arr[sitesdata["location"]] = 'red';
            c++
        });
    };
    hostHtml += "</tbody>";
    if (markerarray.length == 0) {
        markerarray.push({ "latLng": '', "name": '', "status": '', "weburl": '', "statename": '', "colorarray": '' })
    }
    if (counting2 >= 1) {
        markerarray[((counting2) - 1)].colorarray = arr;
    }
    a = markerarray;
    return markerarray
}
function gettime() {
    var timing = {}
    var d = new Date();
    timing['hour'] = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        timing['minute'] = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    timing['second'] = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    return timing
}
function createChart(data, site_name) {
    if (env_sites.hasOwnProperty(active_tab)) {
        var toSum_sites = {}
        if (data != '' && site_name != '') {
            if (data['data'].hasOwnProperty('chart') && data['data']['chart']['data']) {
                var val = data['data']['chart']['data']
                var data_hardware = val['hardware']
                var data_software = val['software']
                var data_application = val['application']
                chartdata_list[site_name] = { "hardware": { "0": data_hardware['0'], "1": data_hardware['1'], "2": data_hardware['2'], "3": data_hardware['3'] }, "software": { "0": data_software['0'], "1": data_software['1'], "2": data_software['2'], "3": data_software['3'] }, "application": { "0": data_application['0'], "1": data_application['1'], "2": data_application['2'], "3": data_application['3'] } }
            }
        }
        env_sites[active_tab].forEach((item, index) => {
            if (chartdata_list[item] != undefined )
                toSum_sites[item]=chartdata_list[item]
        });
        const sumhardware0 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.hardware['0'], 0);
        const sumhardware1 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.hardware['1'], 0);
        const sumhardware2 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.hardware['2'], 0);
        const sumhardware3 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.hardware['3'], 0);
        const sumsoftware0 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.software['0'], 0);
        const sumsoftware1 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.software['1'], 0);
        const sumsoftware2 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.software['2'], 0);
        const sumsoftware3 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.software['3'], 0);
        const sumapplication0 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.application['0'], 0);
        const sumapplication1 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.application['1'], 0);
        const sumapplication2 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.application['2'], 0);
        const sumapplication3 = Object.values(toSum_sites).reduce((acc, obj) => acc + obj.application['3'], 0);
        tempObj['hardware'] = { "CRITICAL": sumhardware0, "OK": sumhardware2, "WARNING": sumhardware1, "UNKNOWN": sumhardware3 }
        tempObj['software'] = { "CRITICAL": sumsoftware0, "OK": sumsoftware2, "WARNING": sumsoftware1, "UNKNOWN": sumsoftware3 }
        tempObj['application'] = { "CRITICAL": sumapplication0, "OK": sumapplication2, "WARNING": sumapplication1, "UNKNOWN": sumapplication3 }
        sessionStorage.setItem('tempobj', JSON.stringify(tempObj))
        fillHostServiceCount(tempObj);
    }
}
function old_createChart(data, site_name) {
    if (data['data'].hasOwnProperty('chart')) {
        var val = data['data']['chart']['data']
        var data_hardware = val['hardware']
        var data_software = val['software']
        var data_application = val['application']
        chartdata_list[site_name] = { "hardware": { "0": data_hardware['0'], "1": data_hardware['1'], "2": data_hardware['2'], "3": data_hardware['3'] }, "software": { "0": data_software['0'], "1": data_software['1'], "2": data_software['2'], "3": data_software['3'] }, "application": { "0": data_application['0'], "1": data_application['1'], "2": data_application['2'], "3": data_application['3'] } }
        const sumhardware0 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.hardware['0'], 0);
        const sumhardware1 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.hardware['1'], 0);
        const sumhardware2 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.hardware['2'], 0);
        const sumhardware3 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.hardware['3'], 0);
        const sumsoftware0 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.software['0'], 0);
        const sumsoftware1 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.software['1'], 0);
        const sumsoftware2 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.software['2'], 0);
        const sumsoftware3 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.software['3'], 0);
        const sumapplication0 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.application['0'], 0);
        const sumapplication1 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.application['1'], 0);
        const sumapplication2 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.application['2'], 0);
        const sumapplication3 = Object.values(chartdata_list).reduce((acc, obj) => acc + obj.application['3'], 0);
        tempObj['hardware'] = { "CRITICAL": sumhardware0, "OK": sumhardware2, "WARNING": sumhardware1, "UNKNOWN": sumhardware3 }
        tempObj['software'] = { "CRITICAL": sumsoftware0, "OK": sumsoftware2, "WARNING": sumsoftware1, "UNKNOWN": sumsoftware3 }
        tempObj['application'] = { "CRITICAL": sumapplication0, "OK": sumapplication2, "WARNING": sumapplication1, "UNKNOWN": sumapplication3 }
        sessionStorage.setItem('tempobj', JSON.stringify(tempObj))
        fillHostServiceCount(tempObj);
    }
}
function seperateRef(target, refsite) {
    if (targetdata[refsite + 'isprocess'] == 0) {
        targetdata[refsite + 'isprocess'] = 1
        getJSON(target, refsite).then(function (data) {
            createChart(data, refsite)
            statusdata = data.data
            var chartsdata = statusdata['chart'] && statusdata['chart']['data'] ? statusdata['chart']['data'] : null;
            mapsitedata[refsite] = statusdata
            var bod = statusdata["bod"]
            var eod = statusdata["eod"]
            var adp = statusdata["adp"]
            var entity = statusdata["entity"]
            status = (bod === 0 || eod === 0 || adp === 0 || entity === 0) ? 0 :
                (bod === 1 || eod === 1 || adp === 1 || entity === 1) ? 1 :
                    (bod === 2 && eod === 2 && adp === 2 && entity === 2) ? 2 : 3;
            var clr_states
            if (chartsdata && (chartsdata.hardware["0"] > 0 || chartsdata.software["0"] > 0 || chartsdata.application["0"] > 0)) {
                clr_states = 0
            } else if (chartsdata && (chartsdata.hardware["1"] > 0 || chartsdata.software["1"] > 0 || chartsdata.application["1"] > 0)) {
                clr_states = 1
            } else if (chartsdata && (chartsdata.hardware["2"] > 0 || chartsdata.software["2"] > 0 || chartsdata.application["2"] > 0)) {
                clr_states = 2
            } else {
                clr_states = 3
            }
            worldstatusdata[refsite] = status
            totalstatus += parseInt(status)
            sitecount++;
            var timing = gettime()
            $("#" + refsite + 'font').css({ "color": (status == 1 ? 'orange' : status == 2 ? 'green' : status == 3 ? 'white' : 'red') });
            $("#" + refsite + 'datafont').css({ "color": (clr_states == 1 ? 'orange' : clr_states == 2 ? 'green' : clr_states == 3 ? 'white' : 'red') });
            $("#" + refsite + 'bod').css({ "background": (statusdata['bod'] == 1 ? 'orange' : statusdata['bod'] == 2 ? 'green' : statusdata['bod'] == 3 ? 'white' : 'red'), "color": (statusdata['bod'] == 1 ? 'orange' : statusdata['bod'] == 2 ? 'green' : statusdata['bod'] == 3 ? 'white' : 'red') });
            $("#" + refsite + 'eod').css({ "background": (statusdata['eod'] == 1 ? 'orange' : statusdata['eod'] == 2 ? 'green' : statusdata['eod'] == 3 ? 'white' : 'red'), "color": (statusdata['eod'] == 1 ? 'orange' : statusdata['eod'] == 2 ? 'green' : statusdata['eod'] == 3 ? 'white' : 'red') });
            $("#" + refsite + 'adp').css({ "background": (statusdata['adp'] == 1 ? 'orange' : statusdata['adp'] == 2 ? 'green' : statusdata['adp'] == 3 ? 'white' : 'red'), "color": (statusdata['adp'] == 1 ? 'orange' : statusdata['adp'] == 2 ? 'green' : statusdata['adp'] == 3 ? 'white' : 'red') });
            $("#" + refsite + 'entity').css({ "background": (statusdata['entity'] == 1 ? 'orange' : statusdata['entity'] == 2 ? 'green' : statusdata['entity'] == 3 ? 'white' : 'red'), "color": (statusdata['entity'] == 1 ? 'orange' : statusdata['entity'] == 2 ? 'green' : statusdata['entity'] == 3 ? 'white' : 'red') });
            $("#" + refsite + 'refresh').css({ "background": "green" });
            $("#" + refsite + 'time').css({ "color": "white" });
            document.getElementById(refsite + 'time').innerText = timing['hour'] + ':' + timing['minute'] + ':' + timing['second']
            document.getElementById(refsite + 'hardware_critical').querySelector('a').innerText = chartsdata['hardware']['0']
            document.getElementById(refsite + 'hardware_warning').querySelector('a').innerText = chartsdata['hardware']['1']
            document.getElementById(refsite + 'hardware_ok').querySelector('a').innerText = chartsdata['hardware']['2']
            document.getElementById(refsite + 'hardware_unknown').querySelector('a').innerText = chartsdata['hardware']['3']
            document.getElementById(refsite + 'software_critical').querySelector('a').innerText = chartsdata['software']['0']
            document.getElementById(refsite + 'software_warning').querySelector('a').innerText = chartsdata['software']['1']
            document.getElementById(refsite + 'software_ok').querySelector('a').innerText = chartsdata['software']['2']
            document.getElementById(refsite + 'software_unknown').querySelector('a').innerText = chartsdata['software']['3']
            document.getElementById(refsite + 'application_critical').querySelector('a').innerText = chartsdata['application']['0']
            document.getElementById(refsite + 'application_warning').querySelector('a').innerText = chartsdata['application']['1']
            document.getElementById(refsite + 'application_ok').querySelector('a').innerText = chartsdata['application']['2']
            document.getElementById(refsite + 'application_unknown').querySelector('a').innerText = chartsdata['application']['3']
            document.getElementById(refsite + 'datatime').innerText = timing['hour'] + ':' + timing['minute'] + ':' + timing['second']
            mapsitedata[refsite]['time'] = timing['hour'] + ':' + timing['minute'] + ':' + timing['second']
            sitenull_list[refsite] = 'OK'
            if ((JSON.stringify(sitenull_list)).includes('null')) {
                $("#hardware-title-clr").css("color", "orange");
                $("#software-title-clr").css("color", "orange");
                $("#application-title-clr").css("color", "orange");
            } else {
                $("#hardware-title-clr").css("color", "White");
                $("#software-title-clr").css("color", "White");
                $("#application-title-clr").css("color", "White");
            }
            if (Object.values(worldstatusdata).includes(0)) {
                worldstatus = '#ff0000';//red
            } else if (Object.values(worldstatusdata).includes(1)) {
                worldstatus = '#e99123';//red
            } else if (Object.values(worldstatusdata).includes(2)) {
                worldstatus = '#228B22';//green
            } else {
                worldstatus = '#ffffff';//white
            }
            loadmap()
            targetdata[refsite + 'isprocess'] = 0
            clearTimeout(mapintervaldata[refsite])
            mapintervaldata[refsite] = setTimeout(function () {
                seperateRef(target, refsite);
            }, 60000)
        }).catch(function (err) {
            if (!mapsitedata[refsite] || (mapsitedata[refsite]['bod']) == null) {
                $("#" + refsite + 'font').css("color", "red");
                $("#" + refsite + 'sitename').css({ "background": "transparent", "color": "red" });
                $("#" + refsite + 'bod').css({ "background": "white", "color": "white" });
                $("#" + refsite + 'eod').css({ "background": "white", "color": "white" });
                $("#" + refsite + 'adp').css({ "background": "white", "color": "white" });
                $("#" + refsite + 'entity').css({ "background": "white", "color": "white" });
                $("#" + refsite + 'refresh').css({ "background": "red", "color": "white" });
                $("#" + refsite + 'time').css({ "background": "transparent", "color": "white" });
                document.getElementById(refsite + 'bod').innerText = "white"
                document.getElementById(refsite + 'eod').innerText = "white"
                document.getElementById(refsite + 'adp').innerText = "white"
                document.getElementById(refsite + 'entity').innerText = "white"
                document.getElementById(refsite + 'time').innerText = "- : - : -"
            } else {
                var timing = gettime()
                document.getElementById(refsite + 'bod').innerText = (mapsitedata[refsite]['bod'] == 1 ? 'orange' : mapsitedata[refsite]['bod'] == 2 ? 'green' : mapsitedata[refsite]['bod'] == 3 ? 'white' : 'red')
                document.getElementById(refsite + 'eod').innerText = (mapsitedata[refsite]['eod'] == 1 ? 'orange' : mapsitedata[refsite]['eod'] == 2 ? 'green' : mapsitedata[refsite]['eod'] == 3 ? 'white' : 'red')
                document.getElementById(refsite + 'adp').innerText = (mapsitedata[refsite]['adp'] == 1 ? 'orange' : mapsitedata[refsite]['adp'] == 2 ? 'green' : mapsitedata[refsite]['adp'] == 3 ? 'white' : 'red')
                document.getElementById(refsite + 'entity').innerText = (mapsitedata[refsite]['entity'] == 1 ? 'orange' : mapsitedata[refsite]['entity'] == 2 ? 'green' : mapsitedata[refsite]['entity'] == 3 ? 'white' : 'red')
                document.getElementById(refsite + 'time').innerText = timing['hour'] + ':' + timing['minute'] + ':' + timing['second']
                $("#" + refsite + 'font').css("color", "orange");
                $("#" + refsite + 'bod').css({ "background": (mapsitedata[refsite]['bod'] == 1 ? 'orange' : mapsitedata[refsite]['bod'] == 2 ? 'green' : mapsitedata[refsite]['bod'] == 3 ? 'white' : 'red'), "color": (mapsitedata[refsite]['bod'] == 1 ? 'orange' : mapsitedata[refsite]['bod'] == 2 ? 'green' : mapsitedata[refsite]['bod'] == 3 ? 'white' : 'red') });
                $("#" + refsite + 'eod').css({ "background": (mapsitedata[refsite]['eod'] == 1 ? 'orange' : mapsitedata[refsite]['eod'] == 2 ? 'green' : mapsitedata[refsite]['eod'] == 3 ? 'white' : 'red'), "color": (mapsitedata[refsite]['eod'] == 1 ? 'orange' : mapsitedata[refsite]['eod'] == 2 ? 'green' : mapsitedata[refsite]['eod'] == 3 ? 'white' : 'red') });
                $("#" + refsite + 'adp').css({ "background": (mapsitedata[refsite]['adp'] == 1 ? 'orange' : mapsitedata[refsite]['adp'] == 2 ? 'green' : mapsitedata[refsite]['adp'] == 3 ? 'white' : 'red'), "color": (mapsitedata[refsite]['adp'] == 1 ? 'orange' : mapsitedata[refsite]['adp'] == 2 ? 'green' : mapsitedata[refsite]['adp'] == 3 ? 'white' : 'red') });
                $("#" + refsite + 'entity').css({ "background": (mapsitedata[refsite]['entity'] == 1 ? 'orange' : mapsitedata[refsite]['entity'] == 2 ? 'green' : mapsitedata[refsite]['entity'] == 3 ? 'white' : 'red'), "color": (mapsitedata[refsite]['entity'] == 1 ? 'orange' : mapsitedata[refsite]['entity'] == 2 ? 'green' : mapsitedata[refsite]['entity'] == 3 ? 'white' : 'red') });
                $("#" + refsite + 'entity').css({ "background": (mapsitedata[refsite]['entity'] == 1 ? 'orange' : mapsitedata[refsite]['entity'] == 2 ? 'green' : mapsitedata[refsite]['entity'] == 3 ? 'white' : 'red'), "color": (mapsitedata[refsite]['entity'] == 1 ? 'orange' : mapsitedata[refsite]['entity'] == 2 ? 'green' : mapsitedata[refsite]['entity'] == 3 ? 'white' : 'red') });
                $("#" + refsite + 'time').css({ "color": "orange" });
            }
            mapsitedata[refsite]['bod'] = null
            mapsitedata[refsite]['eod'] = null
            mapsitedata[refsite]['adp'] = null
            mapsitedata[refsite]['entity'] = null
            sitenull_list[refsite] = null
            $("#hardware-title-clr").css("color", "orange");
            $("#software-title-clr").css("color", "orange");
            $("#application-title-clr").css("color", "orange");
            worldstatusdata[refsite] = 0
            worldstatus = '#ff0000';
            loadmap()
            targetdata[refsite + 'isprocess'] = 0
            clearTimeout(mapintervaldata[refsite])
            mapintervaldata[refsite] = setTimeout(function () {
                seperateRef(target, refsite);

            }, 60000)
        });
    }
}
function loadmap() {
    if ($('#india_iframe').length) {
        if (allSiteNames == "") {
            requestDataFromServer('/lesites/getallsitenames', { type: 'userbased', isOnlyEnabled: true }, "GET").done(function (response) {
                allSiteNames = response
                var markerarray_ret = triggerThis(response).then(function () {
                    let combinedData = {};
                    a.forEach(data => {
                        let key = JSON.stringify(data.latLng);
                        if (!(key in combinedData)) {
                            combinedData[key] = { ...data };
                            combinedData[key].status = [];
                        }
                        combinedData[key].status.push(data.status);
                    });
                    let new_arr = Object.values(combinedData).map(data => {
                        let statuses = data.status.map(Number);
                        if (statuses.includes(0)) {
                            data.status = '0';
                        } else if (statuses.includes(1)) {
                            data.status = '1';
                        } else if (statuses.includes(2)) {
                            data.status = '2';
                        } else {
                            data.status = '3';
                        }
                        return data;
                    });
                    combinedData = {};
                    a.forEach(data => {
                        let key = JSON.stringify(data.latLng);
                        if (!(key in combinedData)) {
                            combinedData[key] = { ...data };
                            combinedData[key].status = [];
                            combinedData[key].name = [];
                            combinedData[key].bod = [];
                            combinedData[key].eod = [];
                            combinedData[key].adp = [];
                            combinedData[key].entity = [];
                            combinedData[key].weburl = [];
                        }
                        combinedData[key].name.push(data.name);
                        combinedData[key].bod.push(data.bod);
                        combinedData[key].eod.push(data.eod);
                        combinedData[key].adp.push(data.adp);
                        combinedData[key].entity.push(data.entity);
                        combinedData[key].status.push(data.status);
                        combinedData[key].weburl.push(data.weburl);
                    });
                    let tip_arr = Object.values(combinedData).map(data => {
                        return {
                            latLng: data.latLng,
                            name: data.name,
                            bod: data.bod,
                            eod: data.eod,
                            adp: data.adp,
                            entity: data.entity,
                            status: data.status,
                            weburl: data.weburl,
                            statename: data.statename,
                            colorarray: data.colorarray
                        };
                    });
                    ind_map = $('#india-map').vectorMap({
                        map: 'in_mill',
                        normalizeFunction: 'polynomial',
                        hoverOpacity: 0.7,
                        hoverColor: false,
                        backgroundColor: '#383f47',
                        markers: new_arr.map(function (h) { return { name: h.name, latLng: h.latLng, array: h.colorarray, statename: h.statename, status: h.status, bod: h.bod, entity: h.entity, eod: h.eod, adp: h.adp } }),
                        markerStyle: {
                            initial: {
                                width: 1, height: 1
                            }
                        },
                        backgroundColor: 'transparent',
                        panOnDrag: true,
                        focusOn: {
                            x: 1.5,
                            y: 1.5,
                            scale: 1,
                            animate: true
                        },
                        onMarkerTipShow: function (event, label, index) {
                            var tip = tip_arr[index];
                            var html = '';
                            for (var i = 0; i < tip.name.length; i++) {
                                html += '<b>DOMAINNAME:</b> ' + tip.name[i] + '<br/>' +
                                    '<b>BOD:</b> ' + tip.bod[i] + '<br/>' +
                                    '<b>DOMAIN:</b> ' + tip.entity[i] + '<br/>' +
                                    '<b>SERVERS:</b> ' + (tip.servers ? tip.servers[i] : '') + '<br/><br/>';
                            }
                            label.html(html);
                        },
                        onRegionClick: function (event, code) {
                            requestDataFromServer('/lesites/getallsitenames', { type: 'locationbased', location: code }, "GET").done(function (response) {
                                var res = JSON.parse(response);
                                if (res.status == 200) {
                                    if (res.data.length == 100) {
                                        siteinfo = res.data[0]
                                        window.open('/lesites?site=' + siteinfo.sitename, '_blank');   //sites open next page in INDIA
                                    }
                                    else if (res.data.length >= 1) {
                                        siteinfo = res.data;
                                        var sitehtml = ""
                                    }
                                    else {
                                        document.getElementById("asite-list").innerHTML = "";
                                    }
                                }
                            });
                        },
                        series: {
                            markers: [{
                                attribute: 'image',
                                scale: {
                                    '3': '/static/app/images/white-navigator.png',
                                    '2': '/static/app/images/green-navigator.png',
                                    '1': '/static/app/images/orange-navigator.png',
                                    '0': '/static/app/images/red-navigator.png',
                                },
                                values: new_arr.reduce(function (p, c, i) { p[i] = c.status; return p }, {}),
                            }],
                        },
                        onMarkerClick: function (event, index) {
                            var clk_tip = tip_arr[index]
                            var html = ''
                            if ((clk_tip.name.length) > 1) {
                                $('#multi-sites').modal('show');
                                for (var i = 0; i < clk_tip.name.length; i++) {
                                    html += '<div class="flex_disp"><a class="blue_font" href="' + clk_tip.weburl[i] + '" target="_blank">' + clk_tip.name[i] + '</a> - bod [' + clk_tip.bod[i] + '] eod [' + clk_tip.eod[i] + '] adp [' + clk_tip.adp[i] + '] dom [' + clk_tip.entity[i] + ']</div><br>';
                                }
                                $('#multi-sites .modal-body').html(html);
                            } else {
                                window.open(clk_tip.weburl)
                            }
                        }
                    });
                })
            });
        } else if (allSiteNames != '' && ind_map=='') {
            triggerThis(allSiteNames).then(function () {
                let combinedData = {};
                a.forEach(data => {
                    let key = JSON.stringify(data.latLng);
                    if (!(key in combinedData)) {
                        combinedData[key] = { ...data };
                        combinedData[key].status = [];
                    }
                    combinedData[key].status.push(data.status);
                });
                let new_arr = Object.values(combinedData).map(data => {
                    let statuses = data.status.map(Number);
                    if (statuses.includes(0)) {
                        data.status = '0';
                    } else if (statuses.includes(1)) {
                        data.status = '1';
                    } else if (statuses.includes(2)) {
                        data.status = '2';
                    } else {
                        data.status = '3';
                    }
                    return data;
                });
                combinedData = {};
                a.forEach(data => {
                    let key = JSON.stringify(data.latLng);
                    if (!(key in combinedData)) {
                        combinedData[key] = { ...data };
                        combinedData[key].status = [];
                        combinedData[key].name = [];
                        combinedData[key].bod = [];
                        combinedData[key].eod = [];
                        combinedData[key].adp = [];
                        combinedData[key].entity = [];
                        combinedData[key].weburl = [];
                    }
                    combinedData[key].name.push(data.name);
                    combinedData[key].bod.push(data.bod);
                    combinedData[key].eod.push(data.eod);
                    combinedData[key].adp.push(data.adp);
                    combinedData[key].entity.push(data.entity);
                    combinedData[key].status.push(data.status);
                    combinedData[key].weburl.push(data.weburl);
                });
                let tip_arr = Object.values(combinedData).map(data => {
                    return {
                        latLng: data.latLng,
                        name: data.name,
                        bod: data.bod,
                        eod: data.eod,
                        adp: data.adp,
                        entity: data.entity,
                        status: data.status,
                        weburl: data.weburl,
                        statename: data.statename,
                        colorarray: data.colorarray
                    };
                });
                ind_map = $('#india-map').vectorMap({
                    map: 'in_mill',
                    normalizeFunction: 'polynomial',
                    hoverOpacity: 0.7,
                    hoverColor: false,
                    backgroundColor: '#383f47',
                    markers: new_arr.map(function (h) { return { name: h.name, latLng: h.latLng, array: h.colorarray, statename: h.statename, status: h.status, bod: h.bod, entity: h.entity, eod: h.eod, adp: h.adp } }),
                    markerStyle: {
                        initial: {
                            width: 1, height: 1
                        }
                    },
                    backgroundColor: 'transparent',
                    panOnDrag: true,
                    focusOn: {
                        x: 1.5,
                        y: 1.5,
                        scale: 1,
                        animate: true
                    },
                    onMarkerTipShow: function (event, label, index) {
                        var tip = tip_arr[index];
                        var html = '';
                        for (var i = 0; i < tip.name.length; i++) {
                            html += '<b>DOMAINNAME:</b> ' + tip.name[i] + '<br/>' +
                                '<b>BOD:</b> ' + tip.bod[i] + '<br/>' +
                                '<b>DOMAIN:</b> ' + tip.entity[i] + '<br/>' +
                                '<b>SERVERS:</b> ' + (tip.servers ? tip.servers[i] : '') + '<br/><br/>';
                        }
                        label.html(html);
                    },
                    onRegionClick: function (event, code) {
                        requestDataFromServer('/lesites/getallsitenames', { type: 'locationbased', location: code }, "GET").done(function (response) {
                            var res = JSON.parse(response);
                            if (res.status == 200) {
                                if (res.data.length == 100) {
                                    siteinfo = res.data[0]
                                    window.open('/lesites?site=' + siteinfo.sitename, '_blank');   //sites open next page in INDIA
                                }
                                else if (res.data.length >= 1) {
                                    siteinfo = res.data;
                                    var sitehtml = ""
                                }
                                else {
                                    document.getElementById("asite-list").innerHTML = "";
                                }
                            }
                        });
                    },
                    series: {
                        markers: [{
                            attribute: 'image',
                            scale: {
                                '3': '/static/app/images/white-navigator.png',
                                '2': '/static/app/images/green-navigator.png',
                                '1': '/static/app/images/orange-navigator.png',
                                '0': '/static/app/images/red-navigator.png',
                            },
                            values: new_arr.reduce(function (p, c, i) { p[i] = c.status; return p }, {}),
                        }],
                    },
                    onMarkerClick: function (event, index) {  
                        var clk_tip = tip_arr[index]
                        var html=''
                        if ((clk_tip.name.length) > 1) {
                            $('#multi-sites').modal('show');
                            for (var i = 0; i < clk_tip.name.length; i++) {
                                html += '<div class="flex_disp"><a class="blue_font" href="' + clk_tip.weburl[i] + '" target="_blank">' + clk_tip.name[i] + '</a> - bod [' + clk_tip.bod[i] + '] eod [' + clk_tip.eod[i] + '] adp [' + clk_tip.adp[i] + '] dom [' + clk_tip.entity[i] + ']</div><br>';
                            }
                            $('#multi-sites .modal-body').html(html);
                        } else {
                            window.open(clk_tip.weburl);
                        }
                    }
                });

                ind_map = $('#india-map').vectorMap('get', 'mapObject')
            })
        } else if (ind_map != '' && ind_map != undefined && allSiteNames != '') {
            ind_map = $("#india-map").vectorMap("get", "mapObject");
            triggerThis(allSiteNames).then(function () {
                ind_map.removeAllMarkers();
                var markerStyle = {
                    initial: {
                        width: 1,
                        height: 1
                    }
                };
                let combinedData = {};
                a.forEach(data => {
                    let key = JSON.stringify(data.latLng);
                    if (!(key in combinedData)) {
                        combinedData[key] = { ...data };
                        combinedData[key].status = [];
                    }
                    combinedData[key].status.push(data.status);
                });
                let new_arr = Object.values(combinedData).map(data => {
                    let statuses = data.status.map(Number);
                    if (statuses.includes(0)) {
                        data.status = '0';
                    } else if (statuses.includes(1)) {
                        data.status = '1';
                    } else if (statuses.includes(2)) {
                        data.status = '2';
                    } else {
                        data.status = '3';
                    }
                    return data;
                });
                combinedData = {};
                a.forEach(data => {
                    let key = JSON.stringify(data.latLng);
                    if (!(key in combinedData)) {
                        combinedData[key] = { ...data };
                        combinedData[key].status = [];
                        combinedData[key].name = [];
                        combinedData[key].bod = [];
                        combinedData[key].eod = [];
                        combinedData[key].adp = [];
                        combinedData[key].entity = [];
                        combinedData[key].weburl = [];
                    }
                    combinedData[key].name.push(data.name);
                    combinedData[key].bod.push(data.bod);
                    combinedData[key].eod.push(data.eod);
                    combinedData[key].adp.push(data.adp);
                    combinedData[key].entity.push(data.entity);
                    combinedData[key].status.push(data.status);
                    combinedData[key].weburl.push(data.weburl);
                });
                let tip_arr = Object.values(combinedData).map(data => {
                    return {
                        latLng: data.latLng,
                        name: data.name,
                        bod: data.bod,
                        eod: data.eod,
                        adp: data.adp,
                        entity: data.entity,
                        status: data.status,
                        weburl: data.weburl,
                        statename: data.statename,
                        colorarray: data.colorarray
                    };
                });
                const newMarkers = new_arr.map(function (h, index) {
                    var tooltipContent = '';
                    tip_arr[index].name.forEach(function (name, i) {
                        tooltipContent += '<b>DOMAINNAME:</b> ' + name + '<br/>' +
                            '<b>BOD:</b> ' + tip_arr[index].bod[i] + '<br/>' +
                            '<b>DOMAIN:</b> ' + tip_arr[index].entity[i] + '<br/>' +
                            '<b>SERVERS:</b> ' + (tip_arr[index].servers ? tip_arr[index].servers[i] : '') + '<br/><br/>';
                    });
                    return {
                        latLng: h.latLng,
                        array: h.colorarray,
                        statename: h.statename,
                        name: h.name,
                        status: h.status,
                        bod: h.bod,
                        entity: h.entity,
                        eod: h.eod,
                        adp: h.adp,
                        style: markerStyle, // Assign the marker style
                        tooltip: tooltipContent // Assign tooltip content
                    };
                });
                ind_map.addMarkers(newMarkers);
                var newValues = new_arr.reduce(function (p, c, i) { p[i] = c.status; return p }, {})
                ind_map.series.markers[0].setValues(newValues);
            })
        }
    } else {
        destroyVectorMapIfPresent('#audience-map');
        document.getElementById("audience-map").innerHTML = "";
        if (document.getElementById('audience-map-div') != null && document.getElementById('audience-map-div').classList.contains('map-height')) {
            document.getElementById('audience-map-div').classList.remove('map-height')
        }
        world_map_instance = $('#audience-map').vectorMap({
            map: 'world_mill_en',
            backgroundColor: 'transparent',
            panOnDrag: true,
            focusOn: {
                x: 0.5,
                y: 0.5,
                scale: 1,
                animate: true
            },
            onRegionClick: function (event, code) {
                requestDataFromServer('/lesites/getallsitenames', { type: 'locationbased', location: code }, "GET").done(function (response) {
                    if (code == 'IN') {
                        document.getElementById("sites-list").innerHTML = "";
                        var html = '';
                        html += '<div class="col-6" id="dropdown">'
                        html += '<div id="sitess-list" style="white-space:nowrap;width:100%;display:flex;overflow:scroll"></div>'
                        html += '</div>'
                        html += '</div>'
                        html += '<div class="row">'
                        html += '<div class="col-12" >'
                        html += '<div id="information_modal" class="z-depth-1-half india-map-container-9">'
////////////////////////////////////////////////////////////////////////////INDIA MAP DIRECT ADD HTML start///////////////////////////////////////////////////////////////////////////////////////////
                        html += '<div class="m-panel" id="india_iframe" style="z-index:998">'
                        html +=     '<div class="content-wrapper" style="background-color:transparent">'
                        html +=         '<div class="snackbar" id="snackbar" style="text-align:center"></div>'
                        html +=         '<div class="row col-12 " id="dropdown" style=" display: flex; justify-content: flex-end;column-gap:5rem">'
                        html +=         '<div id="india-map" class="vector-map"></div>'
                        html +=    '</div>'
                        html += '</div>'
////////////////////////////////////////////////////////////////////////////INDIA MAP DIRECT ADD HTML end ///////////////////////////////////////////////////////////////////////////////////////////
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'
                        html += '<div class="modal fade" id="multi-sites" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="multisitesLabel" aria-hidden="true">'
                        html += '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">'
                        html += '<div class="modal-content">'
                        html += '<div class="modal-header">'
                        html += '<h5 class="modal-title" id="staticBackdropLabel">Domains</h5>'
                        html += '<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">x</button>'
                        html += '</div>'
                        html += '<div class="modal-body">'
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'
                        document.getElementById("audience-map").innerHTML = "";
                        $("#audience-map").append(html);
                        loadmap()
                        document.getElementById('audience-map-div').classList.add('map-height')
                    }
                    else {
                        document.getElementById("siteslist").innerHTML = "";
                        var nosite = '<h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:16px;width:30%;text-align: center;">No sites activated</h3>'
                        $("#siteslist").append(nosite);
                        var timeDelay = 2500;       // DELAY IN MILLISECONDS (OR SIMPLY, 5 SECONDS DELAY).
                        setTimeout(clearContents, timeDelay);
                        function clearContents() {
                            $('#siteslist').empty();
                        }
                    }
                });
                setTimeout(cleartooltp, 2500)
                function cleartooltp() {
                    for (let item of (document.getElementsByClassName('jvectormap-tip'))) {
                        item.style.display = "none";
                    }
                }
            },
            series: {
                regions: [{
                    scale: ['#000000', worldstatus],
                    normalizeFunction: 'polynomial',
                    values: {

                        "IN": 15.45
                    }
                }]
            }
        });
        worldobject = world_map_instance;
    }
}
function mapload() {
    $('#refresh-btn').hide();
    'use strict';
    worldstatus = ''
    totalstatus = 0;
    sitecount = 0;
    $.fn.andSelf = function () {
        return this.addBack.apply(this, arguments);
    }
    $(function () {
        if ($("#currentBalanceCircle").length) {
            var bar = new ProgressBar.Circle(currentBalanceCircle, {
                color: '#000',
                strokeWidth: 12,
                trailWidth: 12,
                trailColor: '#0d0d0d',
                easing: 'easeInOut',
                duration: 1400,
                text: {
                    autoStyleContainer: false
                },
                from: { color: '#d53f3a', width: 12 },
                to: { color: '#d53f3a', width: 12 },
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);
                    var value = Math.round(circle.value() * 100);
                    circle.setText('');
                }
            });
            bar.text.style.fontSize = '1.5rem';
            bar.animate(0.4);  // Number from 0.0 to 1.0
        }
        function worldtrigger(response) {
            $('#left-arrow').hide();
            $('#right-arrow').hide();
            $('#refresh-btn').hide();
            var res = JSON.parse(response);
            siteinfo = res.data;
            var statusdata;
            var c = 0;
            sitecount = 0;

            env_types = {};
            env_sites = {};
            chartdata_list = {};
            env_chart_list = {};
            sitenull_list = {};
            worldstatusdata = {};
            
            destroyVectorMapIfPresent('#audience-map');
            document.getElementById("audience-map").innerHTML = "";
            var hostHtml = "";
            tempObj = {
                'hardware': { "CRITICAL": 0, "OK": 0, "WARNING": 0, "UNKNOWN": 0 },
                'software': { "CRITICAL": 0, "OK": 0, "WARNING": 0, "UNKNOWN": 0 },
                'application': { "CRITICAL": 0, "OK": 0, "WARNING": 0, "UNKNOWN": 0 }
            }
            loadmap()
            var hostsHtml = {}
            var dataHtml = ''
            siteinfo.forEach(function (sitesdata) {
                var site_env = sitesdata['environment']
                const target = new URL('sitehealth/overall', sitesdata["le_url"]);
                targetdata[sitesdata['sitename'] + 'site'] = target
                targetdata[sitesdata['sitename'] + 'isprocess'] = 0
                //  const target = new URL('sitehealth/overall', 'http://localhost:8080');
                const params = new URLSearchParams();
                params.set('sitename', sitesdata["sitename"]);
                target.search = params.toString();
                env_types[site_env] = ''
                if (!(hostsHtml.hasOwnProperty(site_env))) {
                    hostsHtml[site_env] = ' '
                    env_sites[site_env]=[]
                }
                env_sites[site_env].push(sitesdata['sitename'])
                if (mapintervaldata.hasOwnProperty(sitesdata['sitename'])) {
                    clearTimeout(mapintervaldata[sitesdata['sitename']])
                }
                var a = getJSON(target, sitesdata["sitename"]).then(function (data) {
                    if (data['data'].hasOwnProperty('chart') && data['data']['chart']['data']) {
                        var data_hardware = data['data']['chart']['data']['hardware']
                        var data_software = data['data']['chart']['data']['software']
                        var data_application = data['data']['chart']['data']['application']
                        tempObj['hardware'] = { "CRITICAL": tempObj['hardware']['CRITICAL'] + data_hardware['0'], "OK": tempObj['hardware']['OK'] + data_hardware['2'], "WARNING": tempObj['hardware']['WARNING'] + data_hardware['1'], "UNKNOWN": tempObj['hardware']['UNKNOWN'] + data_hardware['3'] }
                        tempObj['software'] = { "CRITICAL": tempObj['software']['CRITICAL'] + data_software['0'], "OK": tempObj['software']['OK'] + data_software['2'], "WARNING": tempObj['software']['WARNING'] + data_software['1'], "UNKNOWN": tempObj['software']['UNKNOWN'] + data_software['3'] }
                        tempObj['application'] = { "CRITICAL": tempObj['application']['CRITICAL'] + data_application['0'], "OK": tempObj['application']['OK'] + data_application['2'], "WARNING": tempObj['application']['WARNING'] + data_application['1'], "UNKNOWN": tempObj['application']['UNKNOWN'] + data_application['3'] }
                        if (!(env_chart_list.hasOwnProperty(site_env))) {
                            env_chart_list[site_env] = {}
                            env_chart_list[site_env]['hardware'] = {}
                            env_chart_list[site_env]['software'] = {}
                            env_chart_list[site_env]['application'] = {}
                            env_chart_list[site_env]['hardware']['CRITICAL'] = 0;env_chart_list[site_env]['hardware']['OK'] = 0;env_chart_list[site_env]['hardware']['WARNING'] = 0;env_chart_list[site_env]['hardware']['UNKNOWN'] = 0;
                            env_chart_list[site_env]['software']['CRITICAL'] = 0; env_chart_list[site_env]['software']['OK'] = 0; env_chart_list[site_env]['software']['WARNING'] = 0; env_chart_list[site_env]['software']['UNKNOWN'] = 0;
                            env_chart_list[site_env]['application']['CRITICAL'] = 0; env_chart_list[site_env]['application']['OK'] = 0; env_chart_list[site_env]['application']['WARNING'] = 0; env_chart_list[site_env]['application']['UNKNOWN'] = 0;   
                        }
                        env_chart_list[site_env]['hardware'] = { "CRITICAL": env_chart_list[site_env]['hardware']['CRITICAL'] + data_hardware['0'], "OK": env_chart_list[site_env]['hardware']['OK'] + data_hardware['2'], "WARNING": env_chart_list[site_env]['hardware']['WARNING'] + data_hardware['1'], "UNKNOWN": env_chart_list[site_env]['hardware']['UNKNOWN'] + data_hardware['3'] }
                        env_chart_list[site_env]['software'] = { "CRITICAL": env_chart_list[site_env]['software']['CRITICAL'] + data_software['0'], "OK": env_chart_list[site_env]['software']['OK'] + data_software['2'], "WARNING": env_chart_list[site_env]['software']['WARNING'] + data_software['1'], "UNKNOWN": env_chart_list[site_env]['software']['UNKNOWN'] + data_software['3'] }
                        env_chart_list[site_env]['application'] = { "CRITICAL": env_chart_list[site_env]['application']['CRITICAL'] + data_application['0'], "OK": env_chart_list[site_env]['application']['OK'] + data_application['2'], "WARNING": env_chart_list[site_env]['application']['WARNING'] + data_application['1'], "UNKNOWN": env_chart_list[site_env]['application']['UNKNOWN'] + data_application['3'] }
                        chartdata_list[sitesdata['sitename']] = data['data']['chart']['data']
                        chartdata_list[sitesdata['sitename']]['environment'] = site_env
                    }
                    if ((data) == null) {
                        //  console.log('INSIDE IF NULL')
                    }
                    statusdata = data.data
                    mapsitedata[sitesdata["sitename"]] = statusdata
                    var bod = statusdata["bod"]
                    var eod = statusdata["eod"]
                    var adp = statusdata["adp"]
                    var entity = statusdata["entity"]
                    status = (bod === 0 || eod === 0 || adp === 0 || entity === 0) ? 0 :
                        (bod === 1 || eod === 1 || adp === 1 || entity === 1) ? 1 :
                            (bod === 2 && eod === 2 && adp === 2 && entity === 2) ? 2 : 3;
                    worldstatusdata[sitesdata["sitename"]] = status
                    totalstatus += parseInt(status)
                    sitecount++;
                    var timing = gettime()
                    var html_txt = hostsHtml[site_env] || '';
                    html_txt += "<tr id='" + sitesdata['sitename'] + "row'>";
                    html_txt += "<td class = 'site fixed-column' id='" + sitesdata['sitename'] + "sitename' >\
                            <a class='dropdown-item preview-item' href = '/lesites?site=" + sitesdata['sitename'] + "' target = '_blank' > \
                            <div class='preview-item- content'  style='text-align: center; '> \
                            <p class='preview-subject' id='" + sitesdata['sitename'] + "font' style='color: " + (status == 1 ? 'orange' : status == 2 ? 'green' : status == 3 ? 'white' : 'red') + ";font-size:medium'>" + sitesdata['sitename'] + "</p> \
                            </div> \
                            </a>\
                            </td>";
                    html_txt += "<td id='" + sitesdata['sitename'] + "bod' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"bodLED\")'  style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:" + (statusdata['bod'] == 1 ? 'orange' : statusdata['bod'] == 2 ? 'green' : statusdata['bod'] == 3 ? 'white' : 'red') + ";color:" + (statusdata['bod'] == 1 ? 'orange' : statusdata['bod'] == 2 ? 'green' : statusdata['bod'] == 3 ? 'white' : 'red') + "'></td>";
                    html_txt += "<td id='" + sitesdata['sitename'] + "eod' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"eodLED\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:" + (statusdata['eod'] == 1 ? 'orange' : statusdata['eod'] == 2 ? 'green' : statusdata['eod'] == 3 ? 'white' : 'red') + ";color:" + (statusdata['eod'] == 1 ? 'orange' : statusdata['eod'] == 2 ? 'green' : statusdata['eod'] == 3 ? 'white' : 'red') + "'></td>";
                    html_txt += "<td id='" + sitesdata['sitename'] + "adp' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"adpLED\")'  style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:" + (statusdata['adp'] == 1 ? 'orange' : statusdata['adp'] == 2 ? 'green' : statusdata['adp'] == 3 ? 'white' : 'red') + ";color:" + (statusdata['adp'] == 1 ? 'orange' : statusdata['adp'] == 2 ? 'green' : statusdata['adp'] == 3 ? 'white' : 'red') + "'></td>";
                    html_txt += "<td id='" + sitesdata['sitename'] + "entity' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"entityLED\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:" + (statusdata['entity'] == 1 ? 'orange' : statusdata['entity'] == 2 ? 'green' : statusdata['entity'] == 3 ? 'white' : 'red') + ";color:" + (statusdata['entity'] == 1 ? 'orange' : statusdata['entity'] == 2 ? 'green' : statusdata['entity'] == 3 ? 'white' : 'red') + "'></td>";
                    html_txt += "<td id='" + sitesdata['sitename'] + "refresh' onclick='seperateRef(\"" + target + "\",\"" + sitesdata['sitename'] + "\")' class='has-details' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:green'><i class='  mdi mdi-sync' ></i><span class='alignr details'>" + target + "</span></td>";
                    html_txt += "<td id='" + sitesdata['sitename'] + "time' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'>" + timing['hour'] + ':' + timing['minute'] + ':' + timing['second'] + "</td>";
                    mapsitedata[sitesdata["sitename"]]['time'] = timing['hour'] + ':' + timing['minute'] + ':' + timing['second']
                    html_txt += "</tr>";
                    hostsHtml[site_env] = html_txt 
                    if (Object.values(worldstatusdata).includes(0)) {
                        worldstatus = '#ff0000';//red
                    } else if (Object.values(worldstatusdata).includes(1)) {
                        worldstatus = '#e99123';//red
                    } else if (Object.values(worldstatusdata).includes(2)) {
                        worldstatus = '#228B22';//green
                    } else {
                        worldstatus = '#ffffff';//white
                    }
                    loadmap()
                    if (sitecount == siteinfo.length) {
                        sitecount = 0;
                        ///////////////////heat map view///////////////////
                        hostHtml += '<div class="show-map" id="heatmap-view" style="display:none">';
                        hostHtml += '<div id="empty-div">';
                        var tabsHtml = '<div class="tabs">';
                        var if_one=1
                        var env_priority = ['PROD', 'UAT', 'DEV'];
                        env_priority.forEach(function (env) {
                            if (hostsHtml.hasOwnProperty(env)) {
                                if (if_one === 1) {
                                    active_tab = env
                                    document.getElementById('active-env').innerText = env + ' ENV'
                                    tabsHtml += '<button onclick="handleTabClick(\'' + env + '\')" id="' + env + '-tab" class="active">' + env + '</button>';
                                } else {
                                    tabsHtml += '<button onclick="handleTabClick(\'' + env + '\')" id="' + env + '-tab">' + env + '</button>';
                                }
                                if_one++;
                            }
                        });
                        tabsHtml += '</div>';
                        document.getElementById('updated-time').innerHTML = tabsHtml
                        if_one = 1
                        env_priority.forEach(function (env) {
                            if (hostsHtml.hasOwnProperty(env)) {
                                if (if_one === 1) {
                                    hostHtml += '<table class="table" id="' + env + '-table">';
                                } else {
                                    hostHtml += '<table class="table disp_none" id="' + env + '-table">';
                                }
                                if_one++;
                                hostHtml += '<thead class="table-head border-t" style="text-align:center">';
                                hostHtml += '<tr>';
                                hostHtml += '<th class="fixed-column" >DOMAINNAME</th>';
                                hostHtml += '<th class="has-details"><i class="mdi mdi-alpha-b-box" style="font-size:1.5rem"></i><span class=" details">BOD</span></th>';
                                hostHtml += '<th class="has-details"><i class="mdi mdi-alpha-e-box" style="font-size:1.5rem"></i><span class=" details">EOD</span></th>';
                                hostHtml += '<th class="has-details"><i class="mdi mdi-alpha-a-box" style="font-size:1.5rem"></i><span class=" details">ADP</span></th>';
                                hostHtml += '<th class="has-details"><i class="icon-node" style="font-size:1.5rem"></i><span class=" details">DOMAIN</span></th>';
                                hostHtml += '<th class="has-details"><i class="fas fa-exchange-alt" style="display:contents !important;font-size:20px"></i><span class=" details">CONNECTIONS</span></th>';
                                hostHtml += '<th class="has-details"><i class="mdi mdi-alarm-check" style="font-size:1.5rem"></i><span class=" details">LAST UPDATE</span></th>';
                                hostHtml += '</tr>';
                                hostHtml += '</thead>';
                                hostHtml += '<tbody class="accordion list" id="accordionExample" >';
                                hostHtml += hostsHtml[env]
                                hostHtml += "</tbody>";
                                hostHtml += "</table>";
                            }
                        });
                        hostHtml += "</div>";
                        hostHtml += "</div>";
                        appendheatmap(hostHtml)
                    }
                    clearTimeout(mapintervaldata[sitesdata['sitename']])
                    mapintervaldata[sitesdata['sitename']] = setTimeout(function () {
                        seperateRef(target, sitesdata['sitename']);
                    }, 60000)
                }).catch(function (err) {
                    mapsitedata[sitesdata["sitename"]] = {}
                    mapsitedata[sitesdata["sitename"]]['bod'] = null
                    mapsitedata[sitesdata["sitename"]]['eod'] = null
                    mapsitedata[sitesdata["sitename"]]['adp'] = null
                    mapsitedata[sitesdata["sitename"]]['entity'] = null
                    sitenull_list[sitesdata["sitename"]] = null
                    worldstatusdata[sitesdata["sitename"]] = 0
                    $("#hardware-title-clr").css("color", "orange");
                    $("#software-title-clr").css("color", "orange");
                    $("#application-title-clr").css("color", "orange");
                    var errorhtml = ''
                    if (c < 1) {
                        hostsHtml[site_env] += "<tr id='" + sitesdata['sitename'] + "row'>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "sitename' class = 'site fixed-column' >\
                            <a class='dropdown-item preview-item' href = '/lesites?site=" + sitesdata['sitename'] + "' target = '_blank' > \
                            <div class='preview-item- content'  style='text-align: center; '> \
                            <p class='preview-subject' id='" + sitesdata['sitename'] + "font' style='color:red;font-size:medium'>" + sitesdata['sitename'] + "</p> \
                            </div> \
                            </a>\
                            </td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "bod' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"bodLED\")'  style='background-color:#fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "eod' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"eodLED\")' style='background-color:#fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "adp' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"adpLED\")'  style='background-color:#fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "entity' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"entityLED\")' style='background-color:#fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "refresh' onclick='seperateRef(\"" + target + "\",\"" + sitesdata['sitename'] + "\")' class='has-details' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:red'><i class='  mdi mdi-sync' ></i><span class='alignr details'>" + target + "</span></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "time' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center'>" + ' - : - : -' + "</td>";
                    } else {
                        hostsHtml[site_env] += "<tr id='" + sitesdata['sitename'] + "row'>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "sitename' class = 'site fixed-column' >\
                            <a class='dropdown-item preview-item' href = '/lesites?site=" + sitesdata['sitename'] + "' target = '_blank' > \
                            <div class='preview-item- content'  style='text-align: center; '> \
                            <p class='preview-subject' id='" + sitesdata['sitename'] + "font' style='color:red;font-size:medium'>" + sitesdata['sitename'] + "</p> \
                            </div> \
                            </a>\
                            </td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "bod' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"bodLED\")'  style='background-color:#fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "eod' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"eodLED\")' style='background-color:#fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "adp' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"adpLED\")'  style='background-color:#fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "entity' onclick='siteredirect(\"/lesites?site=" + sitesdata['sitename'] + "\",\"entityLED\")' style='background-color:#fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "refresh' onclick='seperateRef(\"" + target + "\",\"" + sitesdata['sitename'] + "\")' class='has-details' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:red'><i class='  mdi mdi-sync' ></i><span class='alignr details'>" + target + "</span></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "time' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center'>" + ' - : - : -' + "</td>";
                    }
                    c++;
                    sitecount++;
                    if (Object.values(worldstatusdata).includes(0)) {
                        worldstatus = '#ff0000';//red
                    } else if (Object.values(worldstatusdata).includes(1)) {
                        worldstatus = '#e99123';//red
                    } else if (Object.values(worldstatusdata).includes(2)) {
                        worldstatus = '#228B22';//green
                    } else {
                        worldstatus = '#ffffff';//white
                    }
                    loadmap()
                    hostHtml += '<div class="show-map" id="heatmap-view" style="display:none">';
                    hostHtml += '<div id="empty-div">';
                    if (sitecount == siteinfo.length) {
                        var tabsHtml = '<div class="tabs">';
                        var if_one = 1
                        var env_priority = ['PROD', 'UAT', 'DEV'];
                        env_priority.forEach(function (env) {
                            if (hostsHtml.hasOwnProperty(env)) {
                                if (if_one === 1) {
                                    tabsHtml += '<button onclick="handleTabClick(\'' + env + '\')" id="' + env + '-tab" class="active">' + env + '</button>';
                                } else {
                                    tabsHtml += '<button onclick="handleTabClick(\'' + env + '\')" id="' + env + '-tab">' + env + '</button>';
                                }
                                if_one++;
                            }
                        });
                        tabsHtml += '</div>';
                        document.getElementById('updated-time').innerHTML = tabsHtml
                        if_one = 1
                        env_priority.forEach(function (env) {
                            if (hostsHtml.hasOwnProperty(env)) {
                                if (if_one === 1) {
                                    hostHtml += '<table class="table" id="' + env + '-table">';
                                } else {
                                    hostHtml += '<table class="table disp_none" id="' + env + '-table">';
                                }
                                if_one++;
                                hostHtml += '<thead class="table-head border-t" style="text-align:center">';
                                hostHtml += '<tr>';
                                hostHtml += '<th class="fixed-column" >DOMAINNAME</th>';
                                hostHtml += '<th class="has-details"><i class="mdi mdi-alpha-b-box" style="font-size:1.5rem"></i><span class=" details">BOD</span></th>';
                                hostHtml += '<th class="has-details"><i class="mdi mdi-alpha-e-box" style="font-size:1.5rem"></i><span class=" details">EOD</span></th>';
                                hostHtml += '<th class="has-details"><i class="mdi mdi-alpha-a-box" style="font-size:1.5rem"></i><span class=" details">ADP</span></th>';
                                hostHtml += '<th class="has-details"><i class="icon-node" style="font-size:1.5rem"></i><span class=" details">DOMAIN</span></th>';
                                hostHtml += '<th class="has-details"><i class="fas fa-exchange-alt" style="display:contents !important;font-size:20px"></i><span class=" details">CONNECTIONS</span></th>';
                                hostHtml += '<th class="has-details"><i class="mdi mdi-alarm-check" style="font-size:1.5rem"></i><span class=" details">LAST UPDATE</span></th>';
                                hostHtml += '</tr>';
                                hostHtml += '</thead>';
                                hostHtml += '<tbody class="accordion list" id="accordionExample" >';
                                hostHtml += hostsHtml[env]
                                hostHtml += "</tbody>";
                                hostHtml += "</table>";
                            }
                        });
                        hostHtml += "</div>";
                        hostHtml += "</div>";
                        appendheatmap(hostHtml)
                    }
                    clearTimeout(mapintervaldata[sitesdata['sitename']])
                    mapintervaldata[sitesdata['sitename']] = setTimeout(function () {
                        seperateRef(target, sitesdata['sitename']);
                    }, 60000)
                });
            });
        }
        //=======================================================
        if ($('#audience-map').length) {
            if (allSiteNames == "") {
                requestDataFromServer('/lesites/getallsitenames', { type: 'userbased', isOnlyEnabled: true }, "GET").done(function (response) {
                    allSiteNames = response;
                    SiteObj = JSON.parse(response)
                    if (counts <= 1) {
                        SiteObj["data"].forEach(function (obj) {
                            makeWebSocConnection(obj["websocket_url"], obj["sitename"], 0, 0, obj["sitename"])
                        });
                        counts++;
                    }
                    worldtrigger(response)
                });
            } else {
                SiteObj = JSON.parse(allSiteNames)
                if (counts <= 1) {
                    SiteObj["data"].forEach(function (obj) {
                        makeWebSocConnection(obj["websocket_url"], obj["sitename"], 0, 0, obj["sitename"])
                    });
                    counts++;
                }
                worldtrigger(allSiteNames)
            }
        }
        if ($('#india-map').length) {
            // Destroy any existing India map instance before re-creating to free
            // SVG nodes and event listeners that jVectorMap attaches to the element.
            destroyVectorMapIfPresent('#india-map');
            document.getElementById('india-map').innerHTML = '';
            ind_map = '';
            if (allSiteNames == "") {
                requestDataFromServer('/lesites/getallsitenames', { type: 'userbased', isOnlyEnabled: true }, "GET").done(function (response) {
                    allSiteNames = response
                    var markerarray_ret = triggerThis(response).then(function () {
                        ind_map=$('#india-map').vectorMap({
                            container: $('#india-map'),
                            map: 'in_mill',
                            normalizeFunction: 'polynomial',
                            hoverOpacity: 0.7,
                            hoverColor: false,
                            backgroundColor: '#383f47',
                            markers: a.map(function (h) { return { name: h.name, latLng: h.latLng, array: h.colorarray, statename: h.statename, status: h.status, bod: h.bod, entity: h.entity, eod: h.eod, adp: h.adp } }),
                            markerStyle: {
                                initial: {
                                    width: 1, height: 1
                                }
                            },
                            backgroundColor: 'transparent',
                            panOnDrag: true,
                            focusOn: {
                                x: 1.5,
                                y: 1.5,
                                scale: 1,
                                animate: true
                            },
                            onMarkerTipShow: function (event, label, index) {
                                var b = [], ent = [], eo = [], ad = [];
                                var x = a.reduce(function (p, c, i) { p[i] = c.name; b[i] = (c.bod); ent[i] = c.entity; eo[i] = c.eod; ad[i] = c.adp; return p }, {})
                                label.html(
                                    '<b>DOMAINNAME : ' + x[parseInt(index)] + '</b><br/>' + '<b>BOD:</b>' + b[parseInt(index)] + '</br>' + '<b>DOMAIN:</b>' + ent[parseInt(index)] + '</br>' + '<b>EOD:</b>' + eo[parseInt(index)] + '</br>' + '<b>ADP:</b>' + ad[parseInt(index)] + '</br>'
                                );
                            },
                            onRegionClick: function (event, code) {
                                requestDataFromServer('/lesites/getallsitenames', { type: 'locationbased', location: code }, "GET").done(function (response) {
                                    var res = JSON.parse(response);
                                    if (res.status == 200) {
                                        if (res.data.length == 100) {
                                            siteinfo = res.data[0]
                                            window.open('/lesites?site=' + siteinfo.sitename, '_blank');   //sites open next page in INDIA
                                        }
                                        else if (res.data.length >= 1) {
                                            siteinfo = res.data;
                                            var sitehtml = ""
                                        }
                                        else {
                                            document.getElementById("asite-list").innerHTML = "";
                                        }
                                    }
                                });

                            },
                            series: {
                                markers: [{
                                    attribute: 'image',
                                    scale: {
                                        '3': '/static/app/images/white-navigator.png',
                                        '2': '/static/app/images/green-navigator.png',
                                        '1': '/static/app/images/orange-navigator.png',
                                        '0': '/static/app/images/red-navigator.png',
                                    },
                                    values: a.reduce(function (p, c, i) { p[i] = c.status; return p }, {}),
                                }],
                            },
                            onMarkerClick: function (event, index) {
                                window.open(a[index].weburl);
                            }
                        });
                    })
                });
            } else {
                triggerThis(allSiteNames).then(function () {
                    ind_map=$('#india-map').vectorMap({
                        container: $('#india-map'),
                        map: 'in_mill',
                        normalizeFunction: 'polynomial',
                        hoverOpacity: 0.7,
                        hoverColor: false,
                        backgroundColor: '#383f47',
                        markers: a.map(function (h) { return { name: h.name, latLng: h.latLng, array: h.colorarray, statename: h.statename, status: h.status, bod: h.bod, entity: h.entity, servers: h.servers } }),
                        markerStyle: {
                            initial: {
                                width: 1, height: 1
                            }
                        },
                        backgroundColor: 'transparent',
                        panOnDrag: true,
                        focusOn: {
                            x: 1.5,
                            y: 1.5,
                            scale: 1,
                            animate: true
                        },
                        onMarkerTipShow: function (event, label, index) {
                            var b = [], e = [], s = [];
                            var x = a.reduce(function (p, c, i) { p[i] = c.name; b[i] = (c.bod); e[i] = c.entity; s[i] = c.servers; return p }, {})
                            label.html(
                                '<b>DOMAINNAME : ' + x[parseInt(index)] + '</b><br/>' + '<b>BOD:</b>' + b[parseInt(index)] + '</br>' + '<b>DOMAIN:</b>' + e[parseInt(index)] + '</br>' + '<b>SERVERS:</b>' + s[parseInt(index)] + '</br>'
                            );
                        },
                        onRegionClick: function (event, code) {
                            requestDataFromServer('/lesites/getallsitenames', { type: 'locationbased', location: code }, "GET").done(function (response) {
                                var res = JSON.parse(response);
                                if (res.status == 200) {
                                    if (res.data.length == 100) {
                                        siteinfo = res.data[0]
                                        window.open('/lesites?site=' + siteinfo.sitename, '_blank');   //sites open next page in INDIA
                                    }
                                    else if (res.data.length >= 1) {
                                        siteinfo = res.data;
                                        var sitehtml = ""
                                    }
                                    else {
                                        document.getElementById("asite-list").innerHTML = "";
                                    }
                                }
                            });

                        },
                        series: {
                            markers: [{
                                attribute: 'image',
                                scale: {
                                    '1': '/static/app/images/green-navigator.png',
                                    '0': '/static/app/images/red-navigator.png',
                                },
                                values: a.reduce(function (p, c, i) { p[i] = c.status; return p }, {}),
                            }],
                        },
                        onMarkerClick: function (event, index) {
                            window.open(a[index].weburl);
                        }
                    });
                })
            }
        }
        if ($('#owl-carousel-basic').length && !$('#owl-carousel-basic').hasClass('owl-loaded')) {
            $('#owl-carousel-basic').owlCarousel({
                loop: true,
                margin: 10,
                dots: false,
                nav: true,
                autoplay: true,
                autoplayTimeout: 4500,
                navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            });
        }
        var isrtl = $("body").hasClass("rtl");
        if ($('#owl-carousel-rtl').length && !$('#owl-carousel-rtl').hasClass('owl-loaded')) {
            $('#owl-carousel-rtl').owlCarousel({
                loop: true,
                margin: 10,
                dots: false,
                nav: true,
                rtl: isrtl,
                autoplay: true,
                autoplayTimeout: 4500,
                navText: ["<i class='mdi mdi-chevron-right'></i>", "<i class='mdi mdi-chevron-left'></i>"],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            });
        }
    }
    )
}

(function ($) {
    mapload()
})(jQuery);
function displaytooltip(wsname, sname) {
    const tooltip = document.getElementById(sname);
    const wrapper = document.getElementById(wsname);
    if (tooltip.classList.contains('shown')) {
        tooltip.classList.remove('shown');
        wrapper.classList.remove('border-clr');
    } else {
        closeAllTooltips(tooltip);
        tooltip.classList.add('shown');
        wrapper.classList.add('border-clr');
    }
}

var sitesname = 'msitesname'
var wsocname = 'map-pipe'
var maphtml = '<div class="indicator" id="map-pipe"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats" onclick="displaytooltip(\''+ wsocname + '\',\'' + sitesname + '\')"> \
                        <span class="tooltiptext" id="msitesname" style="overflow-y:scroll">\
                        <p><b>Queue Name :</b> map_update</p> \
                        </span> \
                    </i> \
                 </div>'
$('#map-html').empty()
$("#map-html").append(maphtml);
function iconclose(ip) {
    isToBeConnect = !{}[true];
    mapobj[ip].disconnect();
}
function iconconnect(ip) {
    isToBeConnect = {}[true];
    makeWebSocConnection(mapobj[ip].ws.url, mapobj[ip].id, 0)
}

var alltrue = {};
var sitenum = 0;
function makeWebSocConnection(websocketurl, wsitename, tries, mapcount, mapdata) {
    var mapclient = 'mclient' + (mapdata)
    try {
        if (window.WebSocket) {
            var destination = "/exchange/map_update";
            
            if (mapobj[wsitename]) {
                try { mapobj[wsitename].disconnect(); } catch (e) {}
            }
            
            mapclient = Stomp.client(websocketurl);
            mapclient.id = wsitename
            mapclient.connectionTries = tries;
            mapobj[wsitename] = mapclient
            if (document.getElementById('m_' + wsitename) == null) {
                var iconhtml = ''
                iconhtml += '<div class="row tooltiping">'
                iconhtml += ' <p class="tooltiptexting" id="m_' + wsitename + 'last-conn"></p>'
                iconhtml += '<table>';
                iconhtml += '<thead></thead>';
                iconhtml += '<tbody class="row">';
                iconhtml += '<tr class="col-12" id="m_' + wsitename + '">';
                iconhtml += '<td class="col-8 details_td" >' + wsitename + '</td>';
                iconhtml += '<td class="col-4 details_ts" id="m_' + wsitename + 'status-conn" ></td>';
                iconhtml += '</tr>';
                iconhtml += '</tbody>';
                iconhtml += '</table>';
                iconhtml += '<p class="col-3 ok-close-btn" id="display-iconm_' + wsitename + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '</div>'
                $('#msitesname').append(iconhtml)
                alltrue[wsitename] = 0
                sitenum++;
            }

            var on_conn = function () {
                wsConnected = true;
                var obj = sitesData[0];
                obj.isWSConnected = true;
                isToBeConnect = {}[true];
                var statusConn = document.getElementById('m_' + wsitename + 'status-conn');
                if (statusConn) {
                    statusConn.innerText = 'True(0)'
                    statusConn.style.color = "#16d39a";
                }
                document.getElementById('icon-chats').className = 'mdi mdi-check-network-outline tooltip'
                $("#display-iconm_" + wsitename).css('display', 'none');
                alltrue[wsitename] = 1
                var lastConn = document.getElementById('m_' + wsitename + 'last-conn');
                if (lastConn) {
                    lastConn.innerText = "Lastconnect : " + maplastreconnect
                }
                var getnum = Object.values(alltrue)
                var getSum = getnum.reduce(function (a, b) { return a + b; })
                if (sitenum == getSum) {
                    document.getElementById('map-pipe').style.color = '#16d39a'
                } else {
                    document.getElementById('map-pipe').style.color = '#ff3d57'
                }
                mapclient.subscribe(destination, function (message) {
                    if (typeof (message.body) == 'string') {
                        update = JSON.parse(message.body);
                    } else {
                        update = message.body;
                    }
                    if (update['refresh'] == 1) {
                        istableappended = false
                        var refreshsite = update['site']
                        if (!document.getElementById('audience-map-div').classList.contains('show-map')) {
                            document.getElementById('left-arrow').click();
                        }
                        seperateRef(targetdata[refreshsite + 'site'], refreshsite)
                        count++
                    }
                });
            }
            var on_err = function (error) {
                var obj = sitesData[0]
                isToBeConnect = !{}[true];
                mapclient.connectionTries++;
                const timestamp = new Date;
                const date = new Date(timestamp);
                var month = date.getMonth() + 1;//months (0-11)
                var day = date.getDate();//day (1-31)
                var year = date.getFullYear();
                var hour = date.getHours();
                var mins = date.getMinutes();
                var sec = date.getSeconds();
                var formattedDate = day + "/" + month + "/" + year + " " + hour + ":" + mins + ":" + sec;
                maplastreconnect = formattedDate.toLocaleString();
                var statusConn = document.getElementById('m_' + wsitename + 'status-conn');
                if (statusConn) {
                    statusConn.innerText = 'False(' + mapclient.connectionTries + ')'
                    statusConn.style.color = "#ff3d57";
                }
                document.getElementById('icon-chats').className = 'mdi mdi-close-network-outline tooltip'
                alltrue[wsitename] = 0
                var lastConn = document.getElementById('m_' + wsitename + 'last-conn');
                if (lastConn) {
                    lastConn.innerText = "Lastconnect : " + maplastreconnect
                }
                $("#display-iconm_" + wsitename).css('display', 'block');
                var getnum = Object.values(alltrue)
                var getSum = getnum.reduce(function (a, b) { return a + b; })
                if (sitenum == getSum) {
                    document.getElementById('map-pipe').style.color = '#16d39a'
                } else {
                    document.getElementById('map-pipe').style.color = '#ff3d57'
                }
                obj.isWSConnected = false;
                if (networkStatus === 'online') {
                    if (mapclient.connectionTries >= 10) {
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
                        maplastreconnect = formattedDate.toLocaleString();
                        var statusConn = document.getElementById('m_' + wsitename + 'status-conn');
                        if (statusConn) {
                            statusConn.innerText = 'Trying(' + mapclient.connectionTries + ')'
                            statusConn.style.color = "#e99123";
                        }
                        document.getElementById('icon-chats').className = 'mdi mdi-help-network-outline tooltip'
                        alltrue[wsitename] = 0
                        var lastConn = document.getElementById('m_' + wsitename + 'last-conn');
                        if (lastConn) {
                            lastConn.innerText = "Lastconnect : " + maplastreconnect
                        }
                        $("#display-iconm_" + wsitename).css('display', 'block');
                        var getnum = Object.values(alltrue)
                        var getSum = getnum.reduce(function (a, b) { return a + b; })
                        if (sitenum == getSum) {
                            document.getElementById('map-pipe').style.color = '#16d39a'
                        } else {
                            document.getElementById('map-pipe').style.color = '#e99123'
                        }
                        if (isToBeConnect = {}[true]) {
                            makeWebSocConnection(mapclient.ws.url, mapclient.id, mapclient.connectionTries)
                        }
                    }
                }
            };
            mapclient.connect(window.LE_WS_USER, window.LE_WS_PASS, on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
    if (websitename != '') {

        wsnamehtml = '<p><b>' + websitename + ':</b>' + wsConnected + '</p>'
        $("#" + websitename + "web-name").append(wsnamehtml);
    } else {
        // console.log('web-name nodate--->' + wsnamehtml)
    }
}
