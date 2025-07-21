var siteinfo
//var markerarray = [];
//var totalstatus = 0;
//var sitecount = 0;
//var worldstatus = '#ff0000';
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

$(document).ready(function () {
    if (sessionStorage.getItem('tempobj')) {
        let data_for_chart = sessionStorage.getItem('tempobj');
        let heat_map_html = sessionStorage.getItem('heatmapHtml');
        //console.log('data-for-chart-->' + (data_for_chart))
        fillHostServiceCount(JSON.parse(data_for_chart));
        //$('#heat-map').append(heat_map_html)
        $('#incorrect_data').append('<h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%;text-align: center;top: 13%;position: absolute;"> REFRESHING.... </h3>')

        sessionStorage.removeItem('tempobj');
        sessionStorage.removeItem('heatmapHtml');
    }
}
)

function maprefresh() {
    //document.getElementById('left-arrow').style.opacity = 0.3
    //document.getElementById('right-arrow').style.opacity = 1
    $('#left-arrow').hide();
    $('#right-arrow').hide();
    $('#refresh-btn').hide();
    mapsitedata = {}
    sitecount = 0;
    mapload();
    // console.log('document.getElementById("audience - map - div")--->' + document.getElementById('audience-map-div'))
    if (document.getElementById('audience-map-div').classList.contains('map-height')) {
        document.getElementById('audience-map-div').classList.remove('map-height')
    }
    count++
}
function createHeatmap() {
    // Define the function to calculate shades of colors
    // const chroma = require('chroma-js');
    var totalHtml = ''
    var dataHtml = ''
    // Define the function to calculate shades of colors
    document.getElementById("arrow_icons").innerHTML ='';
    // Iterate through each "Host" and "Service" object in the chartdata_list dictionary
    //console.log('TYPEOF CHARTDATA_LIST--->' + typeof (chartdata_list))
    //console.log('ENVTYPES--->' + JSON.stringify(env_types))
    for (const [key, value] of Object.entries(chartdata_list)) {
        var chart_env = value['environment']
        //console.log('SITENAME-->' + key + ' Value-->' + JSON.stringify(value))
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
        //console.log('env_types[' + chart_env + ']--->' + (env_types[chart_env]))
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
        //      console.log('TYPEOF sitesdata[sitename]---> ' + typeof(sitesdata['sitename']))
        html_txt += "<td class='td-min-width'  id='" + key + "datatime' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'>" + timing['hour'] + ':' + timing['minute'] + ':' + timing['second'] + "  </td>";
        html_txt += "</tr>";
        //console.log('BEFORE ASSIGNING--->' + html_txt)
        env_types[chart_env] += html_txt
        // console.log('LOOP finished')
    }
    var if_one = 1;
    //console.log('ENV_TYPES---->' + JSON.stringify(env_types))
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
            //totalHtml += '<th colspan="2"style="border-right:3px solid #fff;border-top:3px solid #fff;">Time</th>';
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

    /*for (const [key, value] of Object.entries(env_types)) {

        totalHtml += '<div id="'+key+'-entity" class="disp_none  entity-view">';
        totalHtml += '<table class="tables " >';
        totalHtml += '<thead class="table-head border-t" style="text-align:center">';
        totalHtml += '<tr>';
        totalHtml += '<th class="fixed-column" rowspan="2">SITENAME</th>';
        totalHtml += '<th colspan="4"style="border-right:3px solid #030303;border-left:3px solid #030303;border-top:3px solid #030303;">Hardwares</th>';
        totalHtml += '<th colspan="4"style="border-right:3px solid #030303;border-top:3px solid #030303;">Softwares</th>';
        totalHtml += '<th colspan="4"style="border-right:3px solid #030303;border-top:3px solid #030303;">Applications</th>';
        totalHtml += '<th colspan="2"style="border-right:3px solid #030303;border-top:3px solid #030303;">Time</th>';
        totalHtml += '</tr>';
        totalHtml += '<tr>';
        totalHtml += '<th class="has-details"style="border-left:3px solid #030303;"><i class="mdi mdi-alpha-c-box" style="font-size:1.5rem"></i><span class=" details">CRITICAL</span></th>';
        totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-w-box" style="font-size:1.5rem"></i><span class=" details">WARNING</span></th>';
        totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-o-box" style="font-size:1.5rem"></i><span class=" details">OK</span></th>';
        totalHtml += '<th class="has-details"style="border-right:3px solid #030303;"><i class="mdi mdi-alpha-u-box" style="font-size:1.5rem"></i><span class=" details">UNKNOWN</span></th>';
        totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-c-box" style="font-size:1.5rem"></i><span class=" details">CRITICAL</span></th>';
        totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-w-box" style="font-size:1.5rem"></i><span class=" details">WARNING</span></th>';
        totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-o-box" style="font-size:1.5rem"></i><span class=" details">OK</span></th>';
        totalHtml += '<th class="has-details" style="border-right:3px solid #030303;"><i class="mdi mdi-alpha-u-box" style="font-size:1.5rem"></i><span class=" details">UNKNOWN</span></th>';
        totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-c-box" style="font-size:1.5rem"></i><span class=" details">CRITICAL</span></th>';
        totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-w-box" style="font-size:1.5rem"></i><span class=" details">WARNING</span></th>';
        totalHtml += '<th class="has-details"><i class="mdi mdi-alpha-o-box" style="font-size:1.5rem"></i><span class=" details">OK</span></th>';
        totalHtml += '<th class="has-details" style="border-right:3px solid #030303;"><i class="mdi mdi-alpha-u-box" style="font-size:1.5rem"></i><span class=" details">UNKNOWN</span></th>';
        totalHtml += '<th class="has-details"><i class="fas fa-exchange-alt" style="display:contents !important;font-size:20px"></i><span class=" details">CONNECTIONS</span></th>';
        totalHtml += '<th class="has-details"><i class="mdi mdi-alarm-check" style="font-size:1.5rem"></i><span class=" details">LAST UPDATE</span></th>';
        totalHtml += '</tr>';
        totalHtml += '</thead>';
        totalHtml += '<tbody class="accordion list" id="accordionExample" >';
        totalHtml += value
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
        if_one++
        //document.getElementById('arrow-icons').append();
    }*/

    //console.log('TOTALHTML--->' + totalHtml)
    //console.log('REACHED createHEATMAP')
    $('#empty-div').append(totalHtml)

    //$('#heat-map').append(totalHtml)
    /*$('.tables').DataTable({
        bPaginate: false,
        bFilter: false,
        rowReorder: true,
        dom: 'Bfrtip',
    });*/
    sessionStorage.setItem('heatmapHtml', $('#heat-map').html())
    //$('#left-arrow').show();
    //$('#right-arrow').show();
    //console.log('CHARTDATALIST' + JSON.stringify(chartdata_list))
}

function appendheatmap(heatmaphtml) {

    isappended = false
    var if_one = 1;
    var env_priority = ['PROD', 'UAT', 'DEV'];
    env_priority.forEach(function (key) {

        //console.log('ENV_CHART_LIST---->' + JSON.stringify(env_chart_list))
        if (env_chart_list.hasOwnProperty(key)) {
            if (if_one == 1) {
                //console.log(key + ' KEY PRESENT with data---->' + JSON.stringify(env_chart_list[key]))
               fillHostServiceCount(env_chart_list[key])
            } 
            if_one++;
        }
    });

    //fillHostServiceCount(tempObj);
    //console.log('Before tempobj in appendheatmap-->' + JSON.stringify(tempObj))
    sessionStorage.setItem('tempobj', JSON.stringify(tempObj))
    document.getElementById("heat-map").innerHTML = "";
    document.getElementById("incorrect_data").innerHTML = "";
    //console.log('REACHED APPEND HEATMAP')
    $('#heat-map').append(heatmaphtml)
    $('#refresh-btn').show();
    $('#heat-map-div').css({ 'max-height': window.innerHeight });
    //console.log('<-------------------INSIDE APPENDHEATMAP--------------->')
    createHeatmap()
    // console.log('CHARTLIST DATA--->' + JSON.stringify(chartdata_list))
    // document.getElementById('refresh-btn').classList.remove('hideicon')
    /*$('.table').DataTable({
        bPaginate: false,
        bFilter: false,
        rowReorder: true,
        dom: 'Bfrtip',
    });*/
}
function siteredirect(link, button) {
    sessionStorage.setItem('tempobj', JSON.stringify(tempObj))
    sessionStorage.setItem('heatmapHtml', $('#heat-map').html())
    sessionStorage.setItem('click-this-button-after-page-loads', button)
    window.open(link, "_self")
    //window.open(link, "_blank")
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
    //console.log('TABNAME--->' + tabName)
    active_tab = tabName
    document.getElementById('active-env').innerText = tabName + ' ENV'
    createChart('','')
    //console.log('e_type--->' + e_type)
    if (e_type != '') {
        document.getElementById(e_type + '-left-arrow').style.opacity = 0.3
        document.getElementById(e_type + '-right-arrow').style.opacity = 1
        document.getElementById(tabName + '-left-arrow').style.opacity = 0.3
        document.getElementById(tabName + '-right-arrow').style.opacity = 1
    }
    // Hide all tables
    var tables = document.getElementsByClassName("table");
    for (var i = 0; i < tables.length; i++) {
        //tables[i].style.display = "none";
        if (!(tables[i].classList.contains("disp_none"))) {
            tables[i].classList.add('disp_none');
        }

    }
    var arrow_icons = document.getElementsByClassName("arrow_icons");
    for (var i = 0; i < arrow_icons.length; i++) {
        //tables[i].style.display = "none";
        if (!(arrow_icons[i].classList.contains("disp_none"))) {
            arrow_icons[i].classList.add('disp_none');
            
        }

    }
    var entity_view = document.getElementsByClassName("entity-view");
    for (var i = 0; i < entity_view.length; i++) {
        //tables[i].style.display = "none";
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
    //console.log('ETYPE--->' + etype)
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
        //console.log('inside ELSE ETYPE')
        if (document.getElementById(etype).classList.contains('disp_none')) {
            document.getElementById(etype).classList.remove("disp_none");

        }
        if (!(document.getElementById(env_type[0] + '-table').classList.contains('disp_none'))) {
            document.getElementById(env_type[0] + '-table').classList.add('disp_none')
        }
        document.getElementById(env_type[0] +'-left-arrow').style.opacity = 1
        document.getElementById(env_type[0] +'-right-arrow').style.opacity = 0.3
    }
    /*if (document.getElementById('heatmap-view').classList.contains('show-map')) {
        document.getElementById('heatmap-view').classList.remove("show-map");
        document.getElementById('data-view').classList.add('show-map')
        // document.getElementById('heat-map-div').style.animation = 'leftmove 2s'
        document.getElementById('left-arrow').style.opacity = 1
        document.getElementById('right-arrow').style.opacity = 0.3

    } else {
        document.getElementById('heatmap-view').classList.add("show-map");
        document.getElementById('data-view').classList.remove('show-map')
        // document.getElementById('data-view').style.animation = 'rightmove 2.5s'
        document.getElementById('left-arrow').style.opacity = 0.3
        document.getElementById('right-arrow').style.opacity = 1
    }*/
}
function pinfunc(select, id) {
    if (select.classList.contains('selected-btn')) {
        select.classList.remove("selected-btn");
        document.getElementById(id).classList.remove('list-hover')
        //  document.getElementById(id).setAttribute("style", "display:none;");

    } else {
        select.classList.add("selected-btn");
        document.getElementById(id).classList.add('list-hover')
        // document.getElementById(id).setAttribute("style", "display:block;background-color:#121212");
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
//
var getJSON = async function (url, nameofsite) {
    //console.log(nameofsite + ' URL--->' + url)
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
            console.log('INSIDE TIMEOUT')
            reject({
                site: nameofsite,
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.onerror = function () {
             console.log('INSIDE ERROR')
            reject({
                site: nameofsite,
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        //console.log('XHR_--->' + JSON.stringify(xhr))
        xhr.send();
    });
};
//

function dismissfunc(select) {
    select.parentElement.style.display = 'none'
}

async function triggerThis(response) {
    var markerarray = [];
    var res = JSON.parse(response);
    siteinfo = res.data;
    //var arr = {};
    var statename = '';
    var state_color = '';
    var counting1 = 0;
    var counting2 = 0;
    var statusdata;
    var c = 0;
    // var nullcount = 0;
    //document.getElementById("site-list").innerHTML = "";
    // siteinfo.forEach(async(sitesdata)=> {
    var hostHtml = "";
    for (let index = 0; index < siteinfo.length; index++) {
        var sitesdata = siteinfo[index]
         //console.log('INDIA sitesdata-->' + JSON.stringify(sitesdata))
        // requestDataFromServer('/sitehealth/overall', { leurl: sitesdata["le_url"], isOnlyEnabled: true }, "GET").done(function (response) {
        const target = new URL('sitehealth/overall', sitesdata["le_url"]);
        //  const target = new URL('sitehealth/overall', 'http://localhost:8080');
        const params = new URLSearchParams();
        params.set('sitename', sitesdata["sitename"]);
        target.search = params.toString();
        await getJSON(new URL(target, sitesdata["le_url"]), sitesdata["sitename"]).then(function (data) {
            //await getJSON(new URL('sitehealth/overall', sitesdata["le_url"]), sitesdata["sitename"]).then(function (data) {
            //  console.log('DATA====>' + data)
            if ((data) == null) {
                var errorhtml = ''
                arr[sitesdata["location"]] = 'red';
                //   console.log('INSIDE IF NULL')
                if (c < 1) {
                    //  var element = document.getElementById('map')

                } else {
                    //  errorhtml = '<h2 style="font-size:16px;white-space:nowrap;text-align:left">' + sitesdata["sitename"] + '</h2>'
                }

                //  $("#site-list").append(errorhtml);
                c++
            } else {
                statusdata = data.data
                //statusdata = dataarr[counting]
                // console.log(sitesdata["sitename"] + ' STATUSDATA___>' + JSON.stringify(statusdata))

                var y = 0
                //var y = (Math.random() * (1.5000 - 0.0001) + 0.1).toFixed(4);
                //   console.log('SITESS-LIST--->' + document.getElementById('sitess-list'))
                var texthtml = '<h2 style="font-size:16px;white-space:nowrap;text-align:left">' + sitesdata["sitename"] + ' - ' + statusdata + '</h2>'
                //$('#sitess-list').append(texthtml)
                //status = statusdata["bod"] + statusdata["eod"] + statusdata["adp"] + statusdata["entity"];
                var bod = statusdata["bod"]
                var eod = statusdata["eod"]
                var adp = statusdata["adp"]
                var entity = statusdata["entity"]
                status = (bod === 0 || eod === 0 || adp === 0 || entity === 0) ? 0 :
                    (bod === 1 || eod === 1 || adp === 1 || entity === 1) ? 1 :
                        (bod === 2 && eod === 2 && adp === 2 && entity === 2) ? 2 : 3;
                //status = (status == 4) ? 1 : 0;
                statearr[sitesdata["sitename"]] = (status == 1 ? 'orange' : status == 2 ? 'green' : status == 3 ? 'white' : 'red')
                /*if (status == 1) {
                    statearr[sitesdata["sitename"]] = 'green'
                } else {
                    statearr[sitesdata["sitename"]] = 'red'
                }*/
                markerarray.push({ "latLng": [parseFloat(sitesdata.lat) + parseFloat(y), parseFloat(sitesdata.lng) + parseFloat(y)], "name": sitesdata.sitename, 'bod': bod, 'eod': eod, 'adp': adp, 'entity': entity, "status": status, "weburl": '/lesites?site=' + sitesdata.sitename, "statename": sitesdata.location, "colorarray": '' })

                //////////////////////////////////////////////////////

                statename = markerarray[counting2].statename;
                /*if (markerarray[counting2].status == 1) {
                    state_color = 'green';hea
                } else {
                    state_color = 'red';
                }*/
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
                /*if (((markerarray[counting2].statename in arr)) && ((arr[markerarray[counting2].statename] == state_color))) {
                    arr[statename] = (state_color);
                } else if (((markerarray[counting2].statename in arr)) && ((arr[markerarray[counting2].statename] != state_color))) {
                    state_color = 'red';
                    arr[statename] = (state_color);
                } else {
                    arr[statename] = (state_color);
                }*/
                counting2++;
                //   console.log("INSIDE MARKERARRAY LOOP")


                /*   hostHtml += "<tr>";
                   hostHtml += "<td class = 'site' >\
                               <a class='dropdown-item preview-item' href = '/lesites?site=" + sitesdata['sitename'] + "' target = '_blank' > \
                               <div class='preview-item- content'  style='text-align: left; '> \
                               <p class='preview-subject' style='color: "+ statearr[sitesdata['sitename']] + ";font-size:medium'>" + sitesdata['sitename'] + "</p> \
                               </div> \
                               </a>\
                               </td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")'  style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:" + (statusdata['bod'] == 1 ? 'green' : 'red') + "'></td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:" + (statusdata['eod'] == 1 ? 'green' : 'red') + "'></td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")'  style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:" + (statusdata['adp'] == 1 ? 'green' : 'red') + "'></td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:" + (statusdata['entity'] == 1 ? 'green' : 'red') + "'></td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:" + (statusdata['servers'] == 1 ? 'green' : 'red') + "'></td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:green'>CONNECTED</td>";
   
                   hostHtml += "</tr>";*/

            }
        }).catch(function (err) {
            console.log('Augh, there was an error!' + err.site + ' ' + err.statusText);

            var errorhtml = ''
            if (c < 1) {

                // var element = document.getElementById('map')
                //  element.setAttribute("style", "display:block;");
                /*   hostHtml += "<tr>";
                   hostHtml += "<td class = 'site' >\
                               <a class='dropdown-item preview-item' href = '/lesites?site=" + sitesdata['sitename'] + "' target = '_blank' > \
                               <div class='preview-item- content'  style='text-align: left; '> \
                               <p class='preview-subject' style='color:red'>" + sitesdata['sitename'] + "</p> \
                               </div> \
                               </a>\
                               </td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")'  style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:#fff'></td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:#fff'></td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")'  style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:#fff'></td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:#fff'></td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:#fff'></td>";
                   hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:red'>ERROR</td>";
   
                   hostHtml += "</tr>";*/
                //  errorhtml = '<h2 style="font-size:16px;white-space:nowrap;text-align:left">'+ sitesdata["sitename"]  + '</h2>'
            } else {
                /* hostHtml += "<tr>";
                 hostHtml += "<td class = 'site' >\
                             <a class='dropdown-item preview-item' href = '/lesites?site=" + sitesdata['sitename'] + "' target = '_blank' > \
                             <div class='preview-item- content'  style='text-align: left; '> \
                             <p class='preview-subject' style='color:red'>" + sitesdata['sitename'] + "</p> \
                             </div> \
                             </a>\
                             </td>";
                 hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")'  style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:#fff'></td>";
                 hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:#fff'></td>";
                 hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")'  style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:#fff'></td>";
                 hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:#fff'></td>";
                 hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:#fff'></td>";
                 hostHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:red'>ERROR</td>";
 
                 hostHtml += "</tr>";*/
                //  errorhtml = '<h2 style="font-size:16px;white-space:nowrap;text-align:left">' + sitesdata["sitename"]  + '</h2>'
            }
            arr[sitesdata["location"]] = 'red';
            // $("#site-list").append(errorhtml);
            c++
        });

    };
    hostHtml += "</tbody>";
    // $("#add-site-data").append(hostHtml);
    // console.log('markerarray.length--->' + markerarray.length + " counting2--->" + counting2)
    if (markerarray.length == 0) {
        markerarray.push({ "latLng": '', "name": '', "status": '', "weburl": '', "statename": '', "colorarray": '' })
    }
    // console.log('BEFORE MARKERARRAY ASSIGNMENT')
    if (counting2 >= 1) {
        markerarray[((counting2) - 1)].colorarray = arr;
    }
    // console.log('Markerarray---->' + JSON.stringify(markerarray))
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
    //console.log('INSIDE REDRAWCHART----- data   >' +data +'        site_name      ---->'+site_name )
    if (env_sites.hasOwnProperty(active_tab)) {
        var toSum_sites = {}
        if (data != '' && site_name != '') {
            if (data['data'].hasOwnProperty('chart')) {
                //var prev_data = chartdata_list[site_name]
                var val = data['data']['chart']['data']
                var data_hardware = val['hardware']
                var data_software = val['software']
                var data_application = val['application']
                //console.log('CHART VAL--->' + JSON.stringify(val))
                //console.log('INITIAL TEMPOBJ--->' + JSON.stringify(tempObj))
                //console.log('chartdata_list before change--->' + JSON.stringify(chartdata_list))
                chartdata_list[site_name] = { "hardware": { "0": data_hardware['0'], "1": data_hardware['1'], "2": data_hardware['2'], "3": data_hardware['3'] }, "software": { "0": data_software['0'], "1": data_software['1'], "2": data_software['2'], "3": data_software['3'] }, "application": { "0": data_application['0'], "1": data_application['1'], "2": data_application['2'], "3": data_application['3'] } }
            }
        }
        env_sites[active_tab].forEach((item, index) => {
            if (chartdata_list[item] != undefined )
                toSum_sites[item]=chartdata_list[item]
        });
        //console.log('ToSUM_SITES before change--->' + JSON.stringify(toSum_sites))
        //console.log('chartdata_list before change--->' + JSON.stringify(chartdata_list))

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
        //console.log('Before tempobj in cratechart-->' + JSON.stringify(tempObj))
        //console.log('chartdata_list after change--->' + JSON.stringify(chartdata_list))
        sessionStorage.setItem('tempobj', JSON.stringify(tempObj))
        fillHostServiceCount(tempObj);
    }
}

function old_createChart(data, site_name) {
    // console.log('INSIDE CREATECHART')
    if (data['data'].hasOwnProperty('chart')) {
        //var prev_data = chartdata_list[site_name]
        var val = data['data']['chart']['data']
        var data_hardware = val['hardware']
        var data_software = val['software']
        var data_application = val['application']
        //console.log('CHART VAL--->' + JSON.stringify(val))
        //console.log('INITIAL TEMPOBJ--->' + JSON.stringify(tempObj))
        //console.log('chartdata_list before change--->' + JSON.stringify(chartdata_list))
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
        //console.log('Before tempobj in cratechart-->' + JSON.stringify(tempObj))
        //console.log('chartdata_list after change--->' + JSON.stringify(chartdata_list))
        sessionStorage.setItem('tempobj', JSON.stringify(tempObj))
        fillHostServiceCount(tempObj);
    }
}
function seperateRef(target, refsite) {
    if (targetdata[refsite + 'isprocess'] == 0) {
        targetdata[refsite + 'isprocess'] = 1
        getJSON(target, refsite).then(function (data) {
            //console.log('------- ' + 'GETJSON - ' + refsite + ' --------' + JSON.stringify(data.data))
            createChart(data, refsite)
            statusdata = data.data
            var chartsdata = statusdata['chart']['data']
            mapsitedata[refsite] = statusdata
            //console.log('------- ' + 'GETJSON chartsdata - ' + refsite + ' --------' + JSON.stringify(chartsdata))
            /* status = statusdata["bod"] + statusdata["eod"] + statusdata["adp"] + statusdata["entity"];
             status = (status == 4) ? 1 : 0;*/
            var bod = statusdata["bod"]
            var eod = statusdata["eod"]
            var adp = statusdata["adp"]
            var entity = statusdata["entity"]
            //console.log('BOD-->' + bod+' EOD-->'+eod+' ADP-->'+adp+' DOMAIN-->' + entity)
            //status = statusdata["bod"] + statusdata["eod"] + statusdata["adp"] + statusdata["entity"];
            //var status=''
            status = (bod === 0 || eod === 0 || adp === 0 || entity === 0) ? 0 :
                (bod === 1 || eod === 1 || adp === 1 || entity === 1) ? 1 :
                    (bod === 2 && eod === 2 && adp === 2 && entity === 2) ? 2 : 3;
            var clr_states
            if (chartsdata.hardware["0"] > 0 || chartsdata.software["0"] > 0 || chartsdata.application["0"] > 0) {
                clr_states = 0
            } else if (chartsdata.hardware["1"] > 0 || chartsdata.software["1"] > 0 || chartsdata.application["1"] > 0) {
                clr_states = 1
            } else if (chartsdata.hardware["2"] > 0 || chartsdata.software["2"] > 0 || chartsdata.application["2"] > 0) {
                clr_states = 2
            } else {
                clr_states = 3
            }
            //console.log('STATUS OF -->' + refsite + ' - '+status)
            worldstatusdata[refsite] = status
            totalstatus += parseInt(status)
            sitecount++;
            // var worldstat = Object.values(worldstatusdata).reduce((a, b) => a + b, 0)
            var timing = gettime()
            $("#" + refsite + 'font').css({ "color": (status == 1 ? 'orange' : status == 2 ? 'green' : status == 3 ? 'white' : 'red') });
            $("#" + refsite + 'datafont').css({ "color": (clr_states == 1 ? 'orange' : clr_states == 2 ? 'green' : clr_states == 3 ? 'white' : 'red') });
            $("#" + refsite + 'bod').css({ "background": (statusdata['bod'] == 1 ? 'orange' : statusdata['bod'] == 2 ? 'green' : statusdata['bod'] == 3 ? 'white' : 'red'), "color": (statusdata['bod'] == 1 ? 'orange' : statusdata['bod'] == 2 ? 'green' : statusdata['bod'] == 3 ? 'white' : 'red') });
            $("#" + refsite + 'eod').css({ "background": (statusdata['eod'] == 1 ? 'orange' : statusdata['eod'] == 2 ? 'green' : statusdata['eod'] == 3 ? 'white' : 'red'), "color": (statusdata['eod'] == 1 ? 'orange' : statusdata['eod'] == 2 ? 'green' : statusdata['eod'] == 3 ? 'white' : 'red') });
            $("#" + refsite + 'adp').css({ "background": (statusdata['adp'] == 1 ? 'orange' : statusdata['adp'] == 2 ? 'green' : statusdata['adp'] == 3 ? 'white' : 'red'), "color": (statusdata['adp'] == 1 ? 'orange' : statusdata['adp'] == 2 ? 'green' : statusdata['adp'] == 3 ? 'white' : 'red') });
            $("#" + refsite + 'entity').css({ "background": (statusdata['entity'] == 1 ? 'orange' : statusdata['entity'] == 2 ? 'green' : statusdata['entity'] == 3 ? 'white' : 'red'), "color": (statusdata['entity'] == 1 ? 'orange' : statusdata['entity'] == 2 ? 'green' : statusdata['entity'] == 3 ? 'white' : 'red') });
            $("#" + refsite + 'refresh').css({ "background": "green" });
            $("#" + refsite + 'time').css({ "color": "white" });

            /*NEWLY COMMENTED 06-03-2024
            document.getElementById(refsite + 'bod').innerText = (statusdata['bod'] == 1 ? 'orange' : statusdata['bod'] == 2 ? 'green' : statusdata['bod'] == 3 ? 'white' : 'red')
            document.getElementById(refsite + 'eod').innerText = (statusdata['eod'] == 1 ? 'orange' : statusdata['eod'] == 2 ? 'green' : statusdata['eod'] == 3 ? 'white' : 'red')
            document.getElementById(refsite + 'adp').innerText = (statusdata['adp'] == 1 ? 'orange' : statusdata['adp'] == 2 ? 'green' : statusdata['adp'] == 3 ? 'white' : 'red')
            document.getElementById(refsite + 'entity').innerText = (statusdata['entity'] == 1 ? 'orange' : statusdata['entity'] == 2 ? 'green' : statusdata['entity'] == 3 ? 'white' : 'red')*/
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
            //console.log('<-- softcritic element is present After --> ' + document.getElementById(refsite + 'software_critical').innerHtml + ' ' + refsite + 'software_critical == fs-prd-asp-ifsc-actv1software_critical---> ' + ((refsite + 'software_critical') == 'fs-prd-asp-ifsc-actv1software_critical'))
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
            /*if (worldstat == Object.keys(worldstatusdata).length) {
                worldstatus = '#228B22';
            } else {
                worldstatus = '#ff0000';
            }*/
            if (Object.values(worldstatusdata).includes("0")) {
                worldstatus = '#ff0000';//red
            } else if (Object.values(worldstatusdata).includes("1")) {
                worldstatus = '#e99123';//red
            } else if (Object.values(worldstatusdata).includes("2")) {
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
            console.log('Augh, there was an error!' + err.site + ' ' + err.statusText);
            //console.log('mapsitedata[' + refsite + ']--->' + JSON.stringify(mapsitedata[refsite]))
            if ((mapsitedata[refsite]['bod']) == null) {
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
                // document.getElementById(refsite + 'time').innerText = timing['hour'] + ':' + timing['minute'] + ':' + timing['second']
            } else {
                var timing = gettime()
                document.getElementById(refsite + 'bod').innerText = (mapsitedata[refsite]['bod'] == 1 ? 'orange' : mapsitedata[refsite]['bod'] == 2 ? 'green' : mapsitedata[refsite]['bod'] == 3 ? 'white' : 'red')
                document.getElementById(refsite + 'eod').innerText = (mapsitedata[refsite]['eod'] == 1 ? 'orange' : mapsitedata[refsite]['eod'] == 2 ? 'green' : mapsitedata[refsite]['eod'] == 3 ? 'white' : 'red')
                document.getElementById(refsite + 'adp').innerText = (mapsitedata[refsite]['adp'] == 1 ? 'orange' : mapsitedata[refsite]['adp'] == 2 ? 'green' : mapsitedata[refsite]['adp'] == 3 ? 'white' : 'red')
                document.getElementById(refsite + 'entity').innerText = (mapsitedata[refsite]['entity'] == 1 ? 'orange' : mapsitedata[refsite]['entity'] == 2 ? 'green' : mapsitedata[refsite]['entity'] == 3 ? 'white' : 'red')
                //document.getElementById(refsite + 'time').innerText = mapsitedata[refsite]['time']
                document.getElementById(refsite + 'time').innerText = timing['hour'] + ':' + timing['minute'] + ':' + timing['second']
                $("#" + refsite + 'font').css("color", "orange");
                $("#" + refsite + 'bod').css({ "background": (mapsitedata[refsite]['bod'] == 1 ? 'orange' : mapsitedata[refsite]['bod'] == 2 ? 'green' : mapsitedata[refsite]['bod'] == 3 ? 'white' : 'red'), "color": (mapsitedata[refsite]['bod'] == 1 ? 'orange' : mapsitedata[refsite]['bod'] == 2 ? 'green' : mapsitedata[refsite]['bod'] == 3 ? 'white' : 'red') });
                $("#" + refsite + 'eod').css({ "background": (mapsitedata[refsite]['eod'] == 1 ? 'orange' : mapsitedata[refsite]['eod'] == 2 ? 'green' : mapsitedata[refsite]['eod'] == 3 ? 'white' : 'red'), "color": (mapsitedata[refsite]['eod'] == 1 ? 'orange' : mapsitedata[refsite]['eod'] == 2 ? 'green' : mapsitedata[refsite]['eod'] == 3 ? 'white' : 'red') });
                $("#" + refsite + 'adp').css({ "background": (mapsitedata[refsite]['adp'] == 1 ? 'orange' : mapsitedata[refsite]['adp'] == 2 ? 'green' : mapsitedata[refsite]['adp'] == 3 ? 'white' : 'red'), "color": (mapsitedata[refsite]['adp'] == 1 ? 'orange' : mapsitedata[refsite]['adp'] == 2 ? 'green' : mapsitedata[refsite]['adp'] == 3 ? 'white' : 'red') });
                $("#" + refsite + 'entity').css({ "background": (mapsitedata[refsite]['entity'] == 1 ? 'orange' : mapsitedata[refsite]['entity'] == 2 ? 'green' : mapsitedata[refsite]['entity'] == 3 ? 'white' : 'red'), "color": (mapsitedata[refsite]['entity'] == 1 ? 'orange' : mapsitedata[refsite]['entity'] == 2 ? 'green' : mapsitedata[refsite]['entity'] == 3 ? 'white' : 'red') });
                $("#" + refsite + 'entity').css({ "background": (mapsitedata[refsite]['entity'] == 1 ? 'orange' : mapsitedata[refsite]['entity'] == 2 ? 'green' : mapsitedata[refsite]['entity'] == 3 ? 'white' : 'red'), "color": (mapsitedata[refsite]['entity'] == 1 ? 'orange' : mapsitedata[refsite]['entity'] == 2 ? 'green' : mapsitedata[refsite]['entity'] == 3 ? 'white' : 'red') });
                $("#" + refsite + 'time').css({ "color": "orange" });
            }
            //mapsitedata[refsite] = {}
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
        //console.log('MAPSITEDATA--->' + JSON.stringify(mapsitedata))

    }


}


function loadmap() {

    //console.log('IF INDIA MAP OPENED--->' + ($('#india_iframe').length))
    //console.log('AUDIENCE MAP HTML--->' + document.getElementById("audience-map").innerHTML)
    if ($('#india_iframe').length) {
        //console.log('<-------------------------INDIA MAP TRIGGERED------------------>')
        //var ind_map = sessionStorage.getItem('indiamapobj')
        //console.log('IND_MAP LOADMAP-->' + ind_map)
        
        if (allSiteNames == "") {
            //console.log('INDIA FIRST LOAD')
            //console.log('IF MAP OBJ IS PRESENT--->' + mapObject)
            requestDataFromServer('/lesites/getallsitenames', { type: 'userbased', isOnlyEnabled: true }, "GET").done(function (response) {
                allSiteNames = response
                var markerarray_ret = triggerThis(response).then(function () {
                    //console.log('a-->' + a)
                    //console.log('IND_MAP IF-->' + sessionStorage.getItem('indiamapobj'))
                    //var india_map = $('#india-map').vectorMap('get', 'mapObject');
                    //console.log('india_map in top if----->' + india_map)
                    //ind_map=new jvm.Map({

                    ///////////////////////////////////////////////////////////////////////newly added start//////////////////////////////////////////////////////////////////////////////

                    // Step 1: Combine similar datasets in 'a' to create 'new_arr'
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
                    // Step 2: Create 'tip_arr'
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
                    console.log("new_arr:", new_arr);
                    console.log("tip_arr:", tip_arr);
///////////////////////////////////////////////////////////////////////newly added end//////////////////////////////////////////////////////////////////////////////



                    ind_map = $('#india-map').vectorMap({
                        //container: $('#india-map'),
                        map: 'in_mill',
                        normalizeFunction: 'polynomial',
                        hoverOpacity: 0.7,
                        hoverColor: false,
                        backgroundColor: '#383f47',
                        // markers: markerarray.map(function (h) { return { name: h.name, latLng: h.latLng, statecolor: h.statecolor, statename: h.statename, status: h.status} }),
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
                            //console.log('INDEX---->' + index)
                            //console.log('tip_arr in tipshow---->' + JSON.stringify(tip_arr))
                            var tip = tip_arr[index];
                            var html = '';
                            //console.log('TIP--------->' + JSON.stringify(tip))
                            for (var i = 0; i < tip.name.length; i++) {
                                html += '<b>DOMAINNAME:</b> ' + tip.name[i] + '<br/>' +
                                    '<b>BOD:</b> ' + tip.bod[i] + '<br/>' +
                                    '<b>DOMAIN:</b> ' + tip.entity[i] + '<br/>' +
                                    '<b>SERVERS:</b> ' + (tip.servers ? tip.servers[i] : '') + '<br/><br/>';
                            }
                            //console.log('HTML----------->' + html)
                            label.html(html);
                        },
                        /*onMarkerTipShow: function (event, label, index) {
                             console.log('INDEX VALUE type-->' +  (index))
                            var b = [], ent = [], eo = [], ad = [];
                            var x = a.reduce(function (p, c, i) { p[i] = c.name; b[i] = (c.bod); ent[i] = c.entity; eo[i] = c.eod; ad[i] = c.adp; return p }, {})
                              console.log('x[index]-->' + (x[parseInt(index)]))
                            label.html(
                                '<b>SITENAME : ' + x[parseInt(index)] + '</b><br/>' + '<b>BOD:</b>' + b[parseInt(index)] + '</br>' + '<b>DOMAIN:</b>' + ent[parseInt(index)] + '</br>' + '<b>EOD:</b>' + eo[parseInt(index)] + '</br>' + '<b>ADP:</b>' + ad[parseInt(index)] + '</br>'
                            );
                        },*/
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
                                        //  console.log("No sites available")
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
                            console.log('TIP_ARR[' + index + '] ---> ' + JSON.stringify(tip_arr[index]))
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
                            //window.open(tip_arr[index].weburl);
                        }
                    });

                })
            });
        } else if (allSiteNames != '' && ind_map=='') {
            //console.log('INDIA SECOND LOAD')
            //console.log('IND_MAP ELSE-->' + sessionStorage.getItem('indiamapobj'))
            //var mapObject = $('#india-map').vectorMap('get', 'mapObject');
            //console.log('ELSE MAP OBJ IS PRESENT--->' + mapObject)
            triggerThis(allSiteNames).then(function () {
                //var india_map = $('#india-map').vectorMap('get', 'mapObject');
                //console.log('india_map in top else----->' + india_map)
                //var markers = $('#india-map').vectorMap('getMarkers');

                //console.log('markers--->' + JSON.stringify(markers))
                //console.log('markers--->' + (markers.length))
                //console.log('ind_map--->' + (ind_map))
                //console.log('a--->' + JSON.stringify(a))
                //a = [{ "latLng": [16.8533, 77.2499], "name": "fs-dev-asp-rtl-actv1", "bod": 0, "eod": 0, "adp": 0, "entity": 0, "status": "2", "weburl": "/lesites?site=fs-dev-asp-rtl-actv1", "statename": "IN-KA", "colorarray": "" }, { "latLng": [20.5302, 76.4926], "name": "fs-uat-p1", "bod": 0, "eod": 0, "adp": 0, "entity": 0, "status": "2", "weburl": "/lesites?site=fs-uat-p1", "statename": "IN-MH", "colorarray": { "IN-KA": "green", "IN-MH": "green" } }]
                //$('#india-map').empty();
                //$('#india-map').vectorMap('setMarkers', a);

                //console.log('top else MAP OBJ before redraw---->' + $('#india-map').vectorMap('get', 'mapObject'))

    ////////////////////////////////////////////////////////////////////////Working but loading code start/////////////////////////////////////////////////////////////////////////////////

                /*document.getElementById("sites-list").innerHTML = "";
                var html = '';
                html += '<div class="col-6" id="dropdown">'
                html += '<div id="sitess-list" style="white-space:nowrap;width:100%;display:flex;overflow:scroll"></div>'
                html += '</div>'
                html += '</div>'
                html += '<div class="row">'
                html += '<div class="col-12" >'
                html += '<div id="information_modal" class="z-depth-1-half india-map-container-9">'
                html += '<iframe id="india_iframe" src="/india" frameborder="0" style="border:0" ></iframe>'
                html += '</div>'
                html += '</div>'
                html += '</div>'

                document.getElementById("audience-map").innerHTML = "";
                $("#audience-map").append(html);*/

                //console.log('top else MAP OBJ after redraw---->' + $('#india-map').vectorMap('get', 'mapObject') )
    ////////////////////////////////////////////////////////////////////////Working but loading code end/////////////////////////////////////////////////////////////////////////////////
                /*if (ind_map != '') {
                    console.log('INSIDE IF INDMAP != empty')
                    //console.log('MAPOBEJCT--->' + $('#india-map').vectorMap('get', 'mapObject'))
                    //ind_map.removeAllMarkers();
                    console.log('india map--->' + JSON.stringify(india_map))
                    console.log('MARKER ARRAY--->' + ind_map.series.markers[0].getValues([]))
                    var markers = ind_map.series.markers[0].getValues(); // Get all markers

                    // Loop through each marker and remove it
                    for (var i = 0; i < markers.length; i++) {
                        var marker = markers[i];
                        marker.element.remove();
                    }

                    // Clear the marker array after removing all markers
                    console.log('MARKER ARRAY--->' + ind_map.series.markers[0].getValues([]))
                    //$('#india-map').vectorMap('removeAllMarkers');

                }*/

///////////////////////////////////////////////////////////////////////newly added start//////////////////////////////////////////////////////////////////////////////

                // Step 1: Combine similar datasets in 'a' to create 'new_arr'
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
                // Step 2: Create 'tip_arr'
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
                //console.log("new_arr:", new_arr);
                //console.log("tip_arr:", tip_arr);
///////////////////////////////////////////////////////////////////////newly added end//////////////////////////////////////////////////////////////////////////////

                //ind_map = new jvm.Map({
                ind_map = $('#india-map').vectorMap({
                    //container: $('#india-map'),
                    map: 'in_mill',
                    normalizeFunction: 'polynomial',
                    hoverOpacity: 0.7,
                    hoverColor: false,
                    backgroundColor: '#383f47',
                    // markers: markerarray.map(function (h) { return { name: h.name, latLng: h.latLng, statecolor: h.statecolor, statename: h.statename, status: h.status} }),
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
                        //console.log('INDEX---->'+index)
                        //console.log('tip_arr in tipshow---->' + JSON.stringify(tip_arr))
                        var tip = tip_arr[index];
                        var html = '';
                        //console.log('TIP--------->' + JSON.stringify(tip))
                        for (var i = 0; i < tip.name.length; i++) {
                            html += '<b>DOMAINNAME:</b> ' + tip.name[i] + '<br/>' +
                                '<b>BOD:</b> ' + tip.bod[i] + '<br/>' +
                                '<b>DOMAIN:</b> ' + tip.entity[i] + '<br/>' +
                                '<b>SERVERS:</b> ' + (tip.servers ? tip.servers[i] : '') + '<br/><br/>';
                        }
                        //console.log('HTML----------->'+html)
                        label.html(html);
                    },
                    /*onMarkerTipShow: function (event, label, index) {
                         console.log('INDEX VALUE type-->' +  (index))
                        var b = [], ent = [], eo = [], ad = [];
                        var x = a.reduce(function (p, c, i) { p[i] = c.name; b[i] = (c.bod); ent[i] = c.entity; eo[i] = c.eod; ad[i] = c.adp; return p }, {})
                          console.log('x[index]-->' + (x[parseInt(index)]))
                        label.html(
                            '<b>SITENAME : ' + x[parseInt(index)] + '</b><br/>' + '<b>BOD:</b>' + b[parseInt(index)] + '</br>' + '<b>DOMAIN:</b>' + ent[parseInt(index)] + '</br>' + '<b>EOD:</b>' + eo[parseInt(index)] + '</br>' + '<b>ADP:</b>' + ad[parseInt(index)] + '</br>'
                        );
                    },*/
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
                                    //  console.log("No sites available")
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
                        //console.log('CLK_TIP---->'+clk_tip)
                        console.log('TIP_ARR[' + index + '] ---> ' + JSON.stringify(tip_arr[index]))
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
                        //window.open(tip_arr[index].weburl);
                    }
                });


                ind_map = $('#india-map').vectorMap('get', 'mapObject')
                //console.log('AFTER ASSIGNING---->' + $('#india-map').vectorMap('get', 'mapObject'))
                //console.log('AFTER ASSIGNING---->' + ind_map.series.markers)
                //console.log('AFTER ASSIGNING---->' + (ind_map.series.markers[0]))
                //console.log('AFTER ASSIGNING---->' + (ind_map.series.markers[1]))
                //console.log('AFTER ASSIGNING---->' + (ind_map.series.markers[1].setValues()))
            })
        } else if (ind_map != '' && ind_map != undefined && allSiteNames != '') {
            console.log('INDIA MAP THIRD LOAD')
            ind_map = $("#india-map").vectorMap("get", "mapObject");
            //console.log('MARKER DETAILS--->' + ind_map)
            triggerThis(allSiteNames).then(function () {
                
                //a_mapped = a.map(function (h) { return { name: h.name, latLng: h.latLng, array: h.colorarray, statename: h.statename, status: h.status, bod: h.bod, entity: h.entity, eod: h.eod, adp: h.adp } })
                ind_map.removeAllMarkers();

                // Update the markers array with the new data
                var markerStyle = {
                    initial: {
                        width: 1,
                        height: 1
                    }
                };
///////////////////////////////////////////////////////////////////////newly added start//////////////////////////////////////////////////////////////////////////////

                // Step 1: Combine similar datasets in 'a' to create 'new_arr'
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
                // Step 2: Create 'tip_arr'
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
                //console.log("new_arr:", new_arr);
                //console.log("tip_arr:", tip_arr);
///////////////////////////////////////////////////////////////////////newly added end//////////////////////////////////////////////////////////////////////////////
                /*function consolidateData(data) {
                    const consolidatedData = {};

                    data.forEach(entry => {
                        let foundSimilar = false;
                        Object.keys(consolidatedData).forEach(key => {
                            const latLng1 = entry.latLng;
                            const latLng2 = consolidatedData[key].latLng;
                            if (areSimilarLatLng(latLng1, latLng2)) {
                                foundSimilar = true;
                                const existingEntry = consolidatedData[key];
                                if (entry.status === "0") {
                                    existingEntry.status = "0";
                                } else if (entry.status === "1" && existingEntry.status !== "0") {
                                    existingEntry.status = "1";
                                } else if (entry.status === "2" && existingEntry.status !== "0" && existingEntry.status !== "1") {
                                    existingEntry.status = "2";
                                } else if (entry.status === "3" && existingEntry.status !== "0" && existingEntry.status !== "1" && existingEntry.status !== "2") {
                                    existingEntry.status = "3";
                                }
                                if (entry.bod === 1) {
                                    existingEntry.bod = 1;
                                }
                                if (entry.eod === 1) {
                                    existingEntry.eod = 1;
                                }
                                if (entry.adp === 1) {
                                    existingEntry.adp = 1;
                                }
                                if (entry.entity === 1) {
                                    existingEntry.entity = 1;
                                }
                                if (entry.colorarray) {
                                    existingEntry.colorarray = entry.colorarray;
                                }
                            }
                        });
                        if (!foundSimilar) {
                            const key = `${entry.latLng[0]},${entry.latLng[1]}`;
                            consolidatedData[key] = { ...entry };
                        }
                    });

                    return Object.values(consolidatedData);
                }

                function areSimilarLatLng(latLng1, latLng2) {
                    const threshold = 0.0001; // Adjust as needed
                    const latDiff = Math.abs(latLng1[0] - latLng2[0]);
                    const lngDiff = Math.abs(latLng1[1] - latLng2[1]);
                    return latDiff < threshold && lngDiff < threshold;
                }

                const dict = [
                    { "latLng": [16.3124, 76.70899999999999], "name": "fs-dev-asp-rtl-actv1", "bod": 0, "eod": 0, "adp": 2, "entity": 0, "status": "1", "weburl": "/lesites?site=fs-dev-asp-rtl-actv1", "statename": "IN-KA", "colorarray": "" },
                    { "latLng": [16.3124, 76.70899999999999], "name": "fs-dev-asp-rtl-htspr1", "bod": 0, "eod": 0, "adp": 2, "entity": 0, "status": "2", "weburl": "/lesites?site=fs-dev-asp-rtl-htspr1", "statename": "IN-KA", "colorarray": "" },
                    { "latLng": [20.5718, 76.5342], "name": "fs-uat-p1", "bod": 1, "eod": 0, "adp": 0, "entity": 1, "status": "0", "weburl": "/lesites?site=fs-uat-p1", "statename": "IN-MH", "colorarray": { "IN-KA": "red", "IN-MH": "red" } }
                ];

                const consolidatedDict = consolidateData(dict);*/
                //console.log(consolidatedDict);
                // Create newMarkers using new_arr
                const newMarkers = new_arr.map(function (h, index) {
                    // Consolidating status based on priority method used in new_arr
                    /*var consolidatedStatus = h.status.reduce(function (acc, cur) {
                        return acc === 0 || cur < acc ? cur : acc;
                    }, null);*/

                    // Create tooltip content for this marker using tip_arr data
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

                /*var newMarkers = new_arr.map(function (h) {
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
                        style: markerStyle,
                        //tooltip: '<b>SITENAME : ' + h.name + '</b><br/>' +
                        //    '<b>BOD:</b>' + h.bod + '<br/>' +
                        //    '<b>DOMAIN:</b>' + h.entity + '<br/>' +
                        //    '<b>EOD:</b>' + h.eod + '<br/>' +
                        //    '<b>ADP:</b>' + h.adp + '<br/>'
                        
                    };
                });*/

                ind_map.addMarkers(newMarkers);
                // Create tooltips separately for each marker
                // Update tooltips separately for each marker
                /*tip_arr.forEach(function (tip, index) {
                    var tooltipContent = '';
                    for (var i = 0; i < tip.name.length; i++) {
                        tooltipContent += '<b>SITENAME:</b> ' + tip.name[i] + '<br/>' +
                            '<b>BOD:</b> ' + tip.bod[i] + '<br/>' +
                            '<b>DOMAIN:</b> ' + tip.entity[i] + '<br/>' +
                            '<b>SERVERS:</b> ' + (tip.servers ? tip.servers[i] : '') + '<br/><br/>';
                    }
                    // Update the tooltip content for the corresponding marker
                    newMarkers[index].tooltip = tooltipContent;
                });*/

                

                var newValues = new_arr.reduce(function (p, c, i) { p[i] = c.status; return p }, {})
                ind_map.series.markers[0].setValues(newValues);

                // Redraw the markers on the map
                //ind_map.addMarkers(newMarkers);

               /* var series = {
                    markers: [{
                        attribute: 'image',
                        scale: {
                            '3': '/static/app/images/white-navigator.png',
                            '2': '/static/app/images/green-navigator.png',
                            '1': '/static/app/images/orange-navigator.png',
                            '0': '/static/app/images/red-navigator.png',
                        },
                        values: a.reduce(function (p, c, i) {
                            p[i] = c.status;
                            return p;
                        }, {})
                    }]
                };*/

                // Apply the series configuration to the map
                //ind_map.series = series;
                /*ind_map.onMarkerClick(function (event, index) {
                    window.open(a[index].weburl);
                });*/
                /*ind_map.markers.setValues(a_mapped);
                ind_map.markerStyle.setValues({
                    initial: {
                        width: 1, height: 1
                    }
                })*/

                /*ind_map.onMarkerTipShow.setValues( function (event, label, index) {
                    // console.log('INDEX VALUE type-->' + typeof (index))
                    var b = [], ent = [], eo = [], ad = [];
                    var x = a.reduce(function (p, c, i) { p[i] = c.name; b[i] = (c.bod); ent[i] = c.entity; eo[i] = c.eod; ad[i] = c.adp; return p }, {})
                    //  console.log('x[index]-->' + (x[parseInt(index)]))
                    label.html(
                        '<b>SITENAME : ' + x[parseInt(index)] + '</b><br/>' + '<b>BOD:</b>' + b[parseInt(index)] + '</br>' + '<b>DOMAIN:</b>' + ent[parseInt(index)] + '</br>' + '<b>EOD:</b>' + eo[parseInt(index)] + '</br>' + '<b>ADP:</b>' + ad[parseInt(index)] + '</br>'
                    );
                })*/

                /*ind_map.series.markers[0].setValues([{
                    attribute: 'image',
                    scale: {
                        '3': '/static/app/images/white-navigator.png',
                        '2': '/static/app/images/green-navigator.png',
                        '1': '/static/app/images/orange-navigator.png',
                        '0': '/static/app/images/red-navigator.png',
                    },

                    values: a.reduce(function (p, c, i) { p[i] = c.status; return p }, {}),

                }])
                ind_map.onMarkerClick.setValues(function (event, index) {
                    window.open(a[index].weburl);
                })*/



                /*var newMarkers = a.map(function (h) { return { name: h.name, latLng: h.latLng, array: h.colorarray, statename: h.statename, status: h.status, bod: h.bod, entity: h.entity, eod: h.eod, adp: h.adp } });
                ind_map.removeAllMarkers();
                ind_map.addMarkers(newMarkers);*/




                
                //ind_map.addMarkers(a) // addMarkers() does not create with the methods we have defined
                //$('#india-map').vectorMap('set', 'markers', a)
                //$('#india-map').vectorMap('resize');
                //ind_map.series.markers[0].addMarkers(a)
                //ind_map.vectorMap('set', 'markers', a);
                //ind_map.series.markers[0].setValues(a)
            })
        }


    } else {
        //console.log('AUDIENCE MAP HTML--->' + document.getElementById("audience-map").innerHTML)
        document.getElementById("audience-map").innerHTML = "";
        if (document.getElementById('audience-map-div') != null && document.getElementById('audience-map-div').classList.contains('map-height')) {
            document.getElementById('audience-map-div').classList.remove('map-height')
        }
        // console.log('AUDIENCEMAP REFRESHED')
        worldobject = $('#audience-map').vectorMap({
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
                        //html += '<iframe id="india_iframe" src="/india" frameborder="0" style="border:0" ></iframe>'

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

                        // document.getElementById("maps").innerHTML = "";
                        document.getElementById("audience-map").innerHTML = "";
                        // document.getElementsByClassName("jvectormap-tip").innerHTML = "";
                        $("#audience-map").append(html);
                        //$("#india_iframe").load("india.html");
                        // $('#information_modal').modal('show');

                        
                        loadmap()
                        document.getElementById('audience-map-div').classList.add('map-height')
                        console.log('IF india_iframe appended--->' + $('#india_iframe').length)
                        /*if ($('#india_iframe').length) {
                            loadmap()
                        } else {
                            setTimeout(loadmap, 2000)
                        }*/
                    }
                    else {
                        //swal('No sites available', ' ', 'info')
                        document.getElementById("siteslist").innerHTML = "";
                        var nosite = '<h3 style="background-color:#a33219;color:white;border-radius:3px;font-size:16px;width:30%;text-align: center;">No sites activated</h3>'
                        $("#siteslist").append(nosite);
                        var timeDelay = 2500;       // DELAY IN MILLISECONDS (OR SIMPLY, 5 SECONDS DELAY).
                        setTimeout(clearContents, timeDelay);

                        function clearContents() {
                            $('#siteslist').empty();
                        }
                        // console.log("no sites available")
                    }

                   // loadmap()

                });
                setTimeout(cleartooltp, 2500)
                function cleartooltp() {
                    //  console.log("document.getElementsByClassName('jvectormap-tip')--->" + document.getElementsByClassName('jvectormap-tip'))
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
    }

    
}

function mapload() {
    $('#refresh-btn').hide();
    /* console.log('document.getElementById("audience - map - div")--->' + document.getElementById('audience-map-div'))
     if ( document.getElementById('audience-map-div') !=null && document.getElementById('audience-map-div').classList.contains('map-height') ) {
         document.getElementById('audience-map-div').classList.remove('map-height')
     }*/

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
                // This has to be the same size as the maximum width to
                // prevent clipping
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
                // Set default step function for all animate calls
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
        //console.log('WORLDSTATUS---->' + worldstatus)


        //=======================================================

        


        function worldtrigger(response) {
            // $('#refresh-btn').hide();
            $('#left-arrow').hide();
            $('#right-arrow').hide();
            $('#refresh-btn').hide();
            var res = JSON.parse(response);
            siteinfo = res.data;
            var statusdata;
            var c = 0;
            sitecount = 0;
            // var nullcount;
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
            //clearTimeout(intervl);
            //console.log('SITEINFO--->' + JSON.stringify(siteinfo))

            siteinfo.forEach(function (sitesdata) {
                //console.log('<------------INSIDE SITEINFO LOOP--------->')
                 //console.log('SITEDATA--->' + JSON.stringify(sitesdata))
                //     console.log('SITEDATA--->' + sitesdata['sitename'])
                //console.log('SITEDATA URL--->' + (sitesdata["le_url"]) + '/sitehealth/overall')
                //requestDataFromServer((sitesdata["le_url"]) + '/sitehealth/overall', "GET").done(function (response) {
                // console.log("new URL('sitehealth/overall',sitesdata[le_url])------>" + new URL('/sitehealth/overall', sitesdata["le_url"]))
                var site_env = sitesdata['environment']
                const target = new URL('sitehealth/overall', sitesdata["le_url"]);
                targetdata[sitesdata['sitename'] + 'site'] = target
                targetdata[sitesdata['sitename'] + 'isprocess'] = 0
                //  const target = new URL('sitehealth/overall', 'http://localhost:8080');
                const params = new URLSearchParams();
                params.set('sitename', sitesdata["sitename"]);
                target.search = params.toString();
                //     console.log('MAPSITEDATA BEFORE--->' + JSON.stringify(mapsitedata))
                env_types[site_env] = ''
                if (!(hostsHtml.hasOwnProperty(site_env))) {
                    //console.log(site_env + ' not present')
                    hostsHtml[site_env] = ' '
                    env_sites[site_env]=[]
                }
                env_sites[site_env].push(sitesdata['sitename'])
                if (mapintervaldata.hasOwnProperty(sitesdata['sitename'])) {
                    clearTimeout(mapintervaldata[sitesdata['sitename']])
                }
                //console.log('HOSTSHTML--->' + JSON.stringify(hostsHtml))
                //console.log('type of HOSTSHTML--->' +typeof(hostsHtml))
                var a = getJSON(target, sitesdata["sitename"]).then(function (data) {
                    //console.log('HOSTSHTML--->' + JSON.stringify(hostsHtml))
                    //console.log('------- ' + 'GETJSON - ' + sitesdata["sitename"] + ' --------' + JSON.stringify(data))
                    if (data['data'].hasOwnProperty('chart')) {
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
                        //console.log('ENV_CHART_LIST[' + site_env + '] BEFORE---->' + JSON.stringify(env_chart_list[site_env]))
                        env_chart_list[site_env]['hardware'] = { "CRITICAL": env_chart_list[site_env]['hardware']['CRITICAL'] + data_hardware['0'], "OK": env_chart_list[site_env]['hardware']['OK'] + data_hardware['2'], "WARNING": env_chart_list[site_env]['hardware']['WARNING'] + data_hardware['1'], "UNKNOWN": env_chart_list[site_env]['hardware']['UNKNOWN'] + data_hardware['3'] }
                        env_chart_list[site_env]['software'] = { "CRITICAL": env_chart_list[site_env]['software']['CRITICAL'] + data_software['0'], "OK": env_chart_list[site_env]['software']['OK'] + data_software['2'], "WARNING": env_chart_list[site_env]['software']['WARNING'] + data_software['1'], "UNKNOWN": env_chart_list[site_env]['software']['UNKNOWN'] + data_software['3'] }
                        env_chart_list[site_env]['application'] = { "CRITICAL": env_chart_list[site_env]['application']['CRITICAL'] + data_application['0'], "OK": env_chart_list[site_env]['application']['OK'] + data_application['2'], "WARNING": env_chart_list[site_env]['application']['WARNING'] + data_application['1'], "UNKNOWN": env_chart_list[site_env]['application']['UNKNOWN'] + data_application['3'] }
                        //console.log('ENV_CHART_LIST[' + site_env + '] AFTER---->' + JSON.stringify(env_chart_list[site_env]))
                        chartdata_list[sitesdata['sitename']] = data['data']['chart']['data']
                        chartdata_list[sitesdata['sitename']]['environment'] = site_env
                        //console.log('res_data--->' + JSON.stringify(res_data))
                        //console.log(sitesdata["sitename"] + '\nJSONDATA--->' + JSON.stringify(chartdata_list[sitesdata['sitename']]))
                    }
                    //console.log(sitesdata["sitename"] + '--> \ntarget url---> ' + target + '\ngetJSONDATA--->' + JSON.stringify(data))
                    if ((data) == null) {
                        //  console.log('INSIDE IF NULL')

                    }
                    statusdata = data.data
                    mapsitedata[sitesdata["sitename"]] = statusdata
                    var bod = statusdata["bod"]
                    var eod = statusdata["eod"]
                    var adp = statusdata["adp"]
                    var entity = statusdata["entity"]
                    //status = statusdata["bod"] + statusdata["eod"] + statusdata["adp"] + statusdata["entity"];
                    status = (bod === 0 || eod === 0 || adp === 0 || entity === 0) ? 0 :
                        (bod === 1 || eod === 1 || adp === 1 || entity === 1) ? 1 :
                            (bod === 2 && eod === 2 && adp === 2 && entity === 2) ? 2 : 3;
                    worldstatusdata[sitesdata["sitename"]] = status
                    // console.log('worldstatusdata--->' + JSON.stringify(worldstatusdata))
                    //status = (status == 4) ? 1 : 0;
                    //worldstatusdata[sitesdata["sitename"]] = status
                    //  console.log('status--->' + status)
                    totalstatus += parseInt(status)
                    sitecount++;
                    //console.log('siteinfo.length  ' + siteinfo.length + " AND SITECOUNT " + sitecount)
                    var timing = gettime()
                    var html_txt = hostsHtml[site_env] || '';
                    //console.log('ENV--->' + site_env + ' sitename--->' + sitesdata["sitename"])
                   // console.log('hostsHTML--->' + JSON.stringify(hostsHtml))
                    //console.log('html_txt--->' + html_txt)
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
                    //      console.log('TYPEOF sitesdata[sitename]---> ' + typeof(sitesdata['sitename']))
                    html_txt += "<td id='" + sitesdata['sitename'] + "time' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'>" + timing['hour'] + ':' + timing['minute'] + ':' + timing['second'] + "</td>";

                    ///////////////////////////////////////////SLIDING RED GREEN ORANGE COUNT IN HEATMAP///////////////////////////////////////////////////
                    //console.log("chartdata_list["+sitesdata['sitename']+"]--->" + JSON.stringify(chartdata_list[sitesdata['sitename']]))

                    //////////////////////////////////////////SLIDING RED GREEN ORANGE COUNT IN HEATMAP////////////////////////////////////////////////////
                    mapsitedata[sitesdata["sitename"]]['time'] = timing['hour'] + ':' + timing['minute'] + ':' + timing['second']
                    html_txt += "</tr>";


                    hostsHtml[site_env] = html_txt 
                    /* if (sitecount == totalstatus) {
                         worldstatus = '#228B22';
                     } else {
                         worldstatus = '#ff0000';
                     }*/
                    if (Object.values(worldstatusdata).includes("0")) {
                        worldstatus = '#ff0000';//red
                    } else if (Object.values(worldstatusdata).includes("1")) {
                        worldstatus = '#e99123';//red
                    } else if (Object.values(worldstatusdata).includes("2")) {
                        worldstatus = '#228B22';//green
                    } else {
                        worldstatus = '#ffffff';//white
                    }
                    loadmap()
                    // console.log('siteinfo.length  ' + siteinfo.length + " AND SITECOUNT " + sitecount)
                    // console.log(sitesdata["sitename"] + '--> \ntarget url---> ' + target + '\ngetJSONDATA--->' + JSON.stringify(data))

                    if (sitecount == siteinfo.length) {
                        //console.log('HOSTSHTML--->' + hostsHtml)
                        //console.log('<---if sitecount--siteinfo.lenght--->')
                        //hostsHtml = JSON.parse(hostsHtml)
                        //console.log('HOSTSHTML["DEV"]--->' + hostsHtml['DEV'])
                        sitecount = 0;
                        ///////////////////heat map view///////////////////
                        hostHtml += '<div class="show-map" id="heatmap-view" style="display:none">';
                        hostHtml += '<div id="empty-div">';
                        var tabsHtml = '<div class="tabs">';
                        //console.log('TYPEOF hostshtml--->' + typeof (hostsHtml) + ' hostshtml--->' + JSON.stringify(hostsHtml))
                        var if_one=1
                        /*Object.keys(hostsHtml).forEach(function (key, value) {
                            //console.log('KEY--->' +key+' VALUE--->' + value)
                            if (if_one==1) {
                                tabsHtml += '<button onclick="handleTabClick(\'' + key + '\')" id="' + key + '-tab" class="active" >' + key + '</button>';
                            } else {
                                tabsHtml += '<button onclick="handleTabClick(\'' + key + '\')" id="' + key + '-tab">' + key + '</button>';
                            }
                            if_one++
                        });*/

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

                        // Appending tabs
                        //document.getElementById("empty-div").insertAdjacentHTML('beforebegin', tabsHtml);
                        //hostHtml += tabsHtml;
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
                                //hostHtml += '<th class="has-details"><span class="material-symbols-outlined" style="display:contents !important">swap_horiz</span><span class=" details">CONNECTIONS</span></th>';
                                hostHtml += '<th class="has-details"><i class="mdi mdi-alarm-check" style="font-size:1.5rem"></i><span class=" details">LAST UPDATE</span></th>';
                                hostHtml += '</tr>';
                                hostHtml += '</thead>';
                                hostHtml += '<tbody class="accordion list" id="accordionExample" >';
                                hostHtml += hostsHtml[env]
                                hostHtml += "</tbody>";
                                hostHtml += "</table>";
                            }
                        });
                       /* Object.keys(hostsHtml).forEach(function (key) {
                            //console.log('KEYS--->' + key)
                            if (if_one == 1) {
                                hostHtml += '<table class="table" id="' + key + '-table">';
                            } else {
                                hostHtml += '<table class="table disp_none" id="' + key + '-table">';
                            }
                            if_one++
                            //hostHtml += '<table class="table" id="'+key+'-table">';
                            hostHtml += '<thead class="table-head border-t" style="text-align:center">';
                            hostHtml += '<tr>';
                            hostHtml += '<th class="fixed-column" >SITENAME</th>';
                            hostHtml += '<th class="has-details"><i class="mdi mdi-alpha-b-box" style="font-size:1.5rem"></i><span class=" details">BOD</span></th>';
                            hostHtml += '<th class="has-details"><i class="mdi mdi-alpha-e-box" style="font-size:1.5rem"></i><span class=" details">EOD</span></th>';
                            hostHtml += '<th class="has-details"><i class="mdi mdi-alpha-a-box" style="font-size:1.5rem"></i><span class=" details">ADP</span></th>';
                            hostHtml += '<th class="has-details"><i class="icon-node" style="font-size:1.5rem"></i><span class=" details">DOMAIN</span></th>';
                            hostHtml += '<th class="has-details"><i class="fas fa-exchange-alt" style="display:contents !important;font-size:20px"></i><span class=" details">CONNECTIONS</span></th>';
                            //hostHtml += '<th class="has-details"><span class="material-symbols-outlined" style="display:contents !important">swap_horiz</span><span class=" details">CONNECTIONS</span></th>';
                            hostHtml += '<th class="has-details"><i class="mdi mdi-alarm-check" style="font-size:1.5rem"></i><span class=" details">LAST UPDATE</span></th>';
                            hostHtml += '</tr>';
                            hostHtml += '</thead>';
                            hostHtml += '<tbody class="accordion list" id="accordionExample" >';
                            hostHtml += hostsHtml[key]
                            hostHtml += "</tbody>";
                            hostHtml += "</table>";
                            //console.log(key + ": " + dictionary[key]);
                        });*/

                        



                        hostHtml += "</div>";
                        hostHtml += "</div>";
                        ///////////////////data view///////////////////////

                        appendheatmap(hostHtml)
                    }
                    //});
                    clearTimeout(mapintervaldata[sitesdata['sitename']])
                    mapintervaldata[sitesdata['sitename']] = setTimeout(function () {
                        //           console.log('-----------' + sitesdata['sitename'] + ' INTERVAL -------first----------')
                        //      console.log('INTERVAL MAPSITEDATA---->' + JSON.stringify(mapsitedata))
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
                    //console.log('ERR--->' + (err).keys)
                    console.log('Augh, there was an error!' + sitesdata["sitename"]  + ' ' + err.statusText);
                    var errorhtml = ''
                    // var hostsHtml = ''
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
                        // hostsHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='background-color:#fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "refresh' onclick='seperateRef(\"" + target + "\",\"" + sitesdata['sitename'] + "\")' class='has-details' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:red'><i class='  mdi mdi-sync' ></i><span class='alignr details'>" + target + "</span></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "time' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center'>" + ' - : - : -' + "</td>";
                        //var element = document.getElementById('dropbtn')
                        //  element.setAttribute("style", "display:block;");
                        //  errorhtml = '<h2 style="font-size:16px;white-space:nowrap;text-align:left;color:white">'+ sitesdata["sitename"] + '</h2>'
                        // errorhtml = '<h2 style="background:#a33219;font-size:16px;white-space:nowrap;text-align:center">' + "Connection Error:- " + sitesdata["sitename"] + '</h2>'
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
                        //  hostsHtml += "<td onclick='window.open(\"/lesites?site=" + sitesdata['sitename'] + "\",\"_blank\")' style='background-color:#fff;border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;'></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "refresh' onclick='seperateRef(\"" + target + "\",\"" + sitesdata['sitename'] + "\")' class='has-details' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center;background-color:red'><i class='  mdi mdi-sync' ></i><span class='alignr details'>" + target + "</span></td>";
                        hostsHtml[site_env] += "<td id='" + sitesdata['sitename'] + "time' style='border-left: 1px solid #000;border-bottom: 1px solid #000;text-align:center'>" + ' - : - : -' + "</td>";

                    }
                    c++;

                    //swal(err.site + " ERROR", ' ', 'error')
                    sitecount++;
                    //  console.log('TOTALSTATUS AND SITECOUNT ' + totalstatus + " " + sitecount)
                    //console.log('TOTALSTATUS AND SITECOUNT ' + totalstatus + " " + sitecount)
                    /*if (sitecount == totalstatus) {
                        // console.log('inside if')
                        worldstatus = '#228B22';
                    } else {
                        worldstatus = '#ff0000';
                    }*/
                    if (Object.values(worldstatusdata).includes("0")) {
                        worldstatus = '#ff0000';//red
                    } else if (Object.values(worldstatusdata).includes("1")) {
                        worldstatus = '#e99123';//red
                    } else if (Object.values(worldstatusdata).includes("2")) {
                        worldstatus = '#228B22';//green
                    } else {
                        worldstatus = '#ffffff';//white
                    }
                    loadmap()
                    //console.log('siteinfo.length  ' + siteinfo.length + " AND SITECOUNT " + sitecount)
                    //console.log('ENV--->' + site_env + ' sitename--->' + sitesdata["sitename"] )
                    //console.log(sitesdata["sitename"] + '--> \ntarget url---> ' + target )
                    hostHtml += '<div class="show-map" id="heatmap-view" style="display:none">';
                    hostHtml += '<div id="empty-div">';
                    if (sitecount == siteinfo.length) {
                        //console.log('<---if sitecount--siteinfo.lenght--->')
                        var tabsHtml = '<div class="tabs">';
                        //console.log('TYPEOF hostshtml--->' + typeof (hostsHtml) + ' hostshtml--->' + JSON.stringify(hostsHtml))
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
                        // Appending tabs
                        //document.getElementById("empty-div").insertAdjacentHTML('beforebegin', tabsHtml);
                        //hostHtml += tabsHtml;
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
                                //hostHtml += '<th class="has-details"><span class="material-symbols-outlined" style="display:contents !important">swap_horiz</span><span class=" details">CONNECTIONS</span></th>';
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
                        ///////////////////data view///////////////////////
                        //console.log('HOSTHTML in ERROR--->' + hostHtml)
                        appendheatmap(hostHtml)
                    }
                    //  mapintervaldata[sitesdata['sitename']] = 0
                    clearTimeout(mapintervaldata[sitesdata['sitename']])

                    mapintervaldata[sitesdata['sitename']] = setTimeout(function () {
                        seperateRef(target, sitesdata['sitename']);

                    }, 60000)
                });


                //  console.log('MAPSITEDATA--->' + JSON.stringify(mapsitedata))
            });

        }
        //=======================================================

        if ($('#audience-map').length) {
            // const mapCharacter = Math.random().toString(36).substring(2, 5);

            if (allSiteNames == "") {
                //   console.log('FIRST LOAD')
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
                //  console.log('SECOND LOAD')
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
            console.log('<-------------------------INDIA MAP TRIGGERED------------------>'+$('#india-map').length)
            if (allSiteNames == "") {
                //console.log('down INDIA FIRST LOAD')
                requestDataFromServer('/lesites/getallsitenames', { type: 'userbased', isOnlyEnabled: true }, "GET").done(function (response) {
                    allSiteNames = response
                    var markerarray_ret = triggerThis(response).then(function () {
                        //console.log('a data-->' + JSON.stringify(a))
                        console.log('down if india_map')
                        //ind_map = new jvm.Map({
                        ind_map=$('#india-map').vectorMap({
                            container: $('#india-map'),
                            map: 'in_mill',
                            normalizeFunction: 'polynomial',
                            hoverOpacity: 0.7,
                            hoverColor: false,
                            backgroundColor: '#383f47',
                            // markers: markerarray.map(function (h) { return { name: h.name, latLng: h.latLng, statecolor: h.statecolor, statename: h.statename, status: h.status} }),
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
                                // console.log('INDEX VALUE type-->' + typeof (index))
                                var b = [], ent = [], eo = [], ad = [];
                                var x = a.reduce(function (p, c, i) { p[i] = c.name; b[i] = (c.bod); ent[i] = c.entity; eo[i] = c.eod; ad[i] = c.adp; return p }, {})
                                //  console.log('x[index]-->' + (x[parseInt(index)]))
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
                                            //  console.log("No sites available")
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
                                /*  regions: [{
                                      attribute: 'fill',
                                      scale: {
                                          'green': 'green',
                                          'red': 'red',
                                      },
                                      values: a.reduce(function (p, c, i) { return c.colorarray }, {}),
      
      
                                  }],*/
                            },

                            onMarkerClick: function (event, index) {
                                window.open(a[index].weburl);
                            }
                        });
                        console.log('down if MAP OBJ---->' + $('#india-map').vectorMap('get', 'mapObject'))
                        //console.log('MARKERARRAY--->' + ind_map.series.markers)
                        sessionStorage.setItem('indiamapobj', $('#india-map').vectorMap('get', 'mapObject'))
                    })
                });
            } else {
                  console.log('down INDIA SECOND LOAD')
                triggerThis(allSiteNames).then(function () {
                    //  console.log('a-->' + a)
                    console.log('down else ind_map')
                    //ind_map = new jvm.Map({
                    ind_map=$('#india-map').vectorMap({
                        container: $('#india-map'),
                        map: 'in_mill',
                        normalizeFunction: 'polynomial',
                        hoverOpacity: 0.7,
                        hoverColor: false,
                        backgroundColor: '#383f47',
                        // markers: markerarray.map(function (h) { return { name: h.name, latLng: h.latLng, statecolor: h.statecolor, statename: h.statename, status: h.status} }),
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
                            // console.log('INDEX VALUE type-->' + typeof (index))
                            var b = [], e = [], s = [];
                            var x = a.reduce(function (p, c, i) { p[i] = c.name; b[i] = (c.bod); e[i] = c.entity; s[i] = c.servers; return p }, {})
                            //  console.log('x[index]-->' + (x[parseInt(index)]))
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
                                        /*  document.getElementById("asite-list").innerHTML = "";
                                          siteinfo.forEach(function (siteinfo) {
                                              if (statearr[siteinfo.sitename] == 'green' || statearr[siteinfo.sitename] == 'red') {
                                                  sitehtml = '<a class="dropdown-item preview-item " href="/lesites?site=' + siteinfo.sitename + '" target="_blank"> \
                                                            <div class="preview-item-content"  style="text-align: left;"> \
                                                            <p class="preview-subject" style="color:'+ statearr[siteinfo.sitename] + '">' + siteinfo.sitename + '</p> \
                                                            </div> \
                                                            </a> '
                                              console.log('SITE PRINTED--->' + siteinfo.sitename)
                                                  $("#availablesites #asite-list").append(sitehtml);
  
                                          }
                                          });*/
                                    }
                                    else {
                                        document.getElementById("asite-list").innerHTML = "";
                                        //  console.log("No sites available")
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
                            /*  regions: [{
                                  attribute: 'fill',
                                  scale: {
                                      'green': 'green',
                                      'red': 'red',
                                  },
                                  values: a.reduce(function (p, c, i) { return c.colorarray }, {}),
  
  
                              }],*/
                        },

                        onMarkerClick: function (event, index) {
                            window.open(a[index].weburl);
                        }
                    });
                    console.log('down else MAP OBJ---->' + $('#india-map').vectorMap('get', 'mapObject'))
                    sessionStorage.setItem('indiamapobj', $('#india-map').vectorMap('get', 'mapObject'))
                })
            }
            //console.log('MARKERARRAY--->' + ind_map.series.markers)
            console.log('IND_MAP--->' + ind_map)
        }

        if ($('#owl-carousel-basic').length) {
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
        if ($('#owl-carousel-rtl').length) {
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
    console.log("close-map---->")
    const tooltip = document.getElementById(sname);
    const wrapper = document.getElementById(wsname);

    if (tooltip.classList.contains('shown')) {
        // If the tooltip is already shown, close it
        tooltip.classList.remove('shown');
        wrapper.classList.remove('border-clr');
    } else {
        // Close all other tooltips
        closeAllTooltips(tooltip);

        // Open the clicked tooltip
        tooltip.classList.add('shown');
        wrapper.classList.add('border-clr');
    }
}

/*function displaytooltip(wsname, sname) {
    console.log("dash-map---->")
    if (document.getElementById(sname).classList.contains('shown')) {
        document.getElementById(wsname).classList.remove('border-clr')
        document.getElementById(sname).classList.remove('shown')
    } else {
        document.getElementById(wsname).classList.add('border-clr')
        document.getElementById(sname).classList.add('shown')
    }
}*/

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

//<p><i class="mdi mdi-close-box" ></i ></p>
//<p><i class="mdi mdi-checkbox-marked" ></i ></p>

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
    //console.log("map websocket called")
      console.log("map websocket called--->"+websocketurl)
    var mapclient = 'mclient' + (mapdata)
    // console.log("mapclient--->" + mapclient)

    /* if (document.getElementById(wsitename) == null) {
         $('#msitesname').append('<p id="' + wsitename + '"></p>')
         alltrue[wsitename] = 0
         sitenum++;
     }*/

    try {
        if (window.WebSocket) {
            var destination = "/exchange/map_update";
            mapclient = Stomp.client(websocketurl);
            //  console.log("map-websocketurl-->" + JSON.stringify(Stomp.client(websocketurl)))
            // console.log("map-websocketurl-->" + typeof (mapclient))
            // console.log("mapclient-websocketurl-->" + JSON.stringify(mapclient))
            //  var wsobjname = new WebSocket(websocketurl);
            //  var client = Stomp.over(wsobjname);
            // console.log('MAPSDATA--->' + mapsdata)
            mapclient.id = wsitename
            mapclient.connectionTries = tries;
            mapobj[wsitename] = mapclient
            // client.criticalNodeCount = nodeCount;

            if (document.getElementById(wsitename) == null) {
                var iconhtml = ''
                iconhtml += '<div class="row tooltiping">'
                iconhtml += ' <p class="tooltiptexting" id="' + wsitename + 'mlast-conn"></p>'
                iconhtml += '<table>';
                iconhtml += '<thead></thead>';
                iconhtml += '<tbody class="row">';
                iconhtml += '<tr class="col-12">';
                iconhtml += '<td class="col-8 details_td" >' + wsitename + '</td>';
                iconhtml += '<td class="col-4 details_ts" id="' + wsitename + 'status-conn" ></td>';
                iconhtml += '</tr>';
                iconhtml += '</tbody>';
                iconhtml += '</table>';


                // mapobj[mapsdata] = mapclient
                //  console.log("iconhtml-mapobj-->" + (mapobj))
                //  console.log("iconhtml-websocket-->" + JSON.stringify(mapobj))
                //        console.log("iconhtml-websocketurl-->" + JSON.stringify(mapobj[mapsdata]["id"]))
                iconhtml += '<p class="col-3 ok-close-btn" id="display-icon' + wsitename + '" style="display:none;margin-top: 13px;"><i class="mdi mdi-checkbox-marked" style="color:#16d39a;" onclick="iconconnect(\'' + wsitename + '\')" ></i ><i class="mdi mdi-close-box" style="color:#ff3d57;" onclick="iconclose(\'' + wsitename + '\')" ></i ></p>'
                iconhtml += '</div>'
                $('#msitesname').append(iconhtml)
                alltrue[wsitename] = 0
                sitenum++;
            }

            var on_conn = function () {
                wsConnected = true;
                var obj = sitesData[0];
                //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = true;
                isToBeConnect = {}[true];
                // mapclient.connectionTries = 0;
                /*  var maphtml = '<div class="indicator" id="entity-pipe" style="color:#16d39a"> \
                      <i class="mdi mdi-check-network-outline tooltip" id="icon-chats"> \
                          <span class="tooltiptext"><p><b>Queue Name :</b> map_update</p> \
                          <p><b>isConnected :</b> True</p> \
                          <p><b>Reconnect	:</b> '+ client.connectionTries + '</p> \
                          <div id="'+ websitename + 'web-name"></div> \
                          <p><b>Lastconnect:</b>'+ maplastreconnect + '</p></span> \
                      </i> \
                      </div>'
                  $('#map-html').empty()
                  $("#map-html").append(maphtml);*/

                // $("#snackbars").fadeIn("slow");
                // $('#snackbars').text('Online');
                // snackbars.className = "sucess_show";
                //$("#snackbars").fadeOut();

                ////////////////////////////////

                document.getElementById(wsitename + 'status-conn').innerText = 'True(0)'
                document.getElementById(wsitename + 'status-conn').style.color = "#16d39a";

                //  $('#wsitename').style("color", '#ff3d57');

                document.getElementById('icon-chats').className = 'mdi mdi-check-network-outline tooltip'
                $("#display-icon" + wsitename).css('display', 'none');
                //   document.getElementById('map-pipe').style.color = '#16d39a'
                alltrue[wsitename] = 1
                // document.getElementById('mconn-tries').innerText = "Reconnect : 0 "
                document.getElementById(wsitename + 'mlast-conn').innerText = "Lastconnect : " + maplastreconnect
                var getnum = Object.values(alltrue)
                var getSum = getnum.reduce(function (a, b) { return a + b; })
                //   console.log('GETSUM--->>' + getSum)
                if (sitenum == getSum) {
                    document.getElementById('map-pipe').style.color = '#16d39a'
                } else {
                    document.getElementById('map-pipe').style.color = '#ff3d57'
                }
                //  document.getElementById(display-icon).style.display == 'none'
                //map callback function
                mapclient.subscribe(destination, function (message) {
                    if (typeof (message.body) == 'string') {
                        update = JSON.parse(message.body);
                    } else {
                        update = message.body;
                    }

                    //console.log('MAP message.body--->' + message.body)


                    //   console.log('MAPSITEDATA STRNG--->' + JSON.stringify(mapsitedata))
                    // console.log('update--->' + update.refresh)
                    // console.log('update[refresh]--->' + update['refresh'])

                    if (update['refresh'] == 1) {
                        istableappended = false
                        var refreshsite = update['site']

                        if (!document.getElementById('audience-map-div').classList.contains('show-map')) {
                            document.getElementById('left-arrow').click();
                        }

                        seperateRef(targetdata[refreshsite + 'site'], refreshsite)
                        /*if (document.getElementById('audience-map-div').classList.contains('map-height')) {
                            document.getElementById('audience-map-div').classList.remove('map-height')
                        }*/
                        count++
                    }
                });

            }
            var on_err = function (error) {
                //  console.log('ERROR--->' + error)
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                /*var maphtml = '<div class="indicator" id="entity-pipe" style="color:#ff3d57"> \
                    <i class="mdi mdi-close-network-outline tooltip" id="icon-chats"> \
                        <span class="tooltiptext"><p><b>Queue Name :</b> map_update</p> \
                        <p><b>isConnected :</b> False</p> \
                        <p><b>Reconnect	:</b> '+ client.connectionTries + '</p> \
                        <div id="'+ websitename + 'web-name"></div> \
                        <p><b>Lastconnect:</b>'+ maplastreconnect + '</p></span> \
                    </i> \
                    </div>'
                $('#map-html').empty()
                $("#map-html").append(maphtml);*/
                /*$("#snackbars").fadeIn("slow");
                $('#snackbars').text('Please Refresh Your Page..');
                snackbars.className = "error_show";*/
                //////////////////////////////////
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

                document.getElementById(wsitename + 'status-conn').innerText = 'False(' + mapclient.connectionTries + ')'

                document.getElementById(wsitename + 'status-conn').style.color = "#ff3d57";

                document.getElementById('icon-chats').className = 'mdi mdi-close-network-outline tooltip'
                //  document.getElementById('map-pipe').style.color = '#ff3d57'
                alltrue[wsitename] = 0
                //  document.getElementById('mconn-tries').innerText = "Reconnect : " + mapclient.connectionTries
                document.getElementById(wsitename + 'mlast-conn').innerText = "Lastconnect : " + maplastreconnect
                // document.getElementById(display-icon).style.display == "block"
                $("#display-icon" + wsitename).css('display', 'block');

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
                        // location.reload();
                        /*  swal({
                              title: "Want to get map updates?",
                              text: "Not able to connect web socket of \"" + mapclient.id + "\". Please Refresh Your Page!.",
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
                                      makeWebSocConnection(mapclient.ws.url, mapclient.id, 0)
                                  } else {
                                      isToBeConnect = !{}[true];
                                      mapclient.disconnect();
                                      // $("#node-view #" + client.id + "-indicator").css('fill', '#ff3d57')
                                  }
                              });*/
                    }
                    else {
                        // mapclient.connectionTries++;
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
                        /* var maphtml = '<div class="indicator" id="entity-pipe" style="color:#e99123"> \
                             <i class="mdi mdi-help-network-outline tooltip" id="icon-chats"> \
                                 <span class="tooltiptext"><p><b>Queue Name :</b> map_update</p> \
                                 <p><b>isConnected :</b> Trying</p> \
                                 <p><b>Reconnect	:</b> '+ client.connectionTries + '</p> \
                                 <div id="'+ websitename + 'web-name"></div> \
                                 <p><b>Lastconnect:</b>'+ maplastreconnect + '</p ></span > \
                             </i> \
                             </div>'
                         $('#map-html').empty()
                         $("#map-html").append(maphtml);*/
                        //$("#snackbars").fadeOut();
                        ////////////////////////////////////

                        document.getElementById(wsitename + 'status-conn').innerText = 'Trying(' + mapclient.connectionTries + ')'

                        document.getElementById(wsitename + 'status-conn').style.color = "#e99123";

                        document.getElementById('icon-chats').className = 'mdi mdi-help-network-outline tooltip'
                        // document.getElementById('map-pipe').style.color = '#e99123'
                        alltrue[wsitename] = 0
                        // document.getElementById('mconn-tries').innerText = "Reconnect : " + mapclient.connectionTries
                        document.getElementById(wsitename + 'mlast-conn').innerText = "Lastconnect : " + maplastreconnect
                        // document.getElementById(display-icon).style.display == "block"
                        $("#display-icon" + wsitename).css('display', 'block');


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
            mapclient.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
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
        // console.log('web-name--->' + wsnamehtml)
    } else {
        // console.log('web-name nodate--->' + wsnamehtml)
    }
}

