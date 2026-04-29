sitename = "";
isEdit = false;
rowid = 1;
requestData = {};
message = $("#sitetemplate #message")
allSiteResponse = [];
var users;
//var latitude;
//var longitute;
var totalSites = 0;   //Rajkumar added Sites count in admin page
var siteHtml = '';   //Rajkumar added Sites count in admin page
var env_list = '';
$(document).ready(function () {
    $("#sitetemplate #table-view").hide();
    $('.site_input').focusout(function (e) {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).parent().find("label").css('color', '#ff9eac');
            $(this).parent().find(".error-msg").text('Field cannot be empty');
        }
        else {
            //  $(this).parent().find("label").css('color', '#404E67');
            $(this).parent().find(".error-msg").text('');
        }
    });
    $('.location_input').focusout(function (e) {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).parent().find("label").css('color', '#ff9eac');
            $(this).parent().find(".error-msg").text('Field cannot be empty');
        }
        else {
            //$(this).parent().find("label").css('color', '#404E67');
            $(this).parent().find(".error-msg").text('');
        }
    });
    getSiteNames()
    getSiteLocation();
    getsitecountry();
    getEnvironmentName();
    //getsitestate(id);
    getusers();
});
function getSiteNames() {
    showLoader("sitetemplate")
    requestDataFromServer('/lesites/getallsitenames', { type: 'all' }, "GET").done(siteNamesResponse);
}
function siteNamesResponse(response) {
    stopLoader("sitetemplate")
    res = JSON.parse(response);
    if (res.status == 200) {
        $("#sitetemplate #table-view").show();
        $("#sitetemplate-nodata").hide()
        allSiteResponse = res.data
        siteHtml = ' '
        $("#sitetemplate #data tbody").empty()
        res.data.forEach(function (obj) {
            totalSites++;     //Rajkumar added Sites count in admin page
            addSite(obj)
        });
        $('#totalSites').text(totalSites)   //Rajkumar added Sites count in admin page
        $("#sitetemplate #data tbody").append(siteHtml);
    }
    else {
        res.msg ? msg = res.msg : msg = 'No site available'
        $("#sitetemplate #table-view").hide();
        $("#sitetemplate-nodata").show()
        $("#sitetemplate-nodata #tryagainbtn").prop('disabled', false);
        $("#sitetemplate-nodata #nodatamessage").text(msg);
    }
}
function getSiteLocation() {
    requestDataFromServer('/lesites/getsitelocations', {}, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            var html = ' ';
            if (res.data !== undefined && res.data.length > 0) {
                res.data.forEach(function (obj) {
                    html += '<a class="select-link dropdown-item position-relative" onclick="onlocationSelect(\'' + obj.locationname + '\',\' \',\' \')" id="' + obj.id + '">' + obj.locationname + '<button type="button" class="close dismiss-btn" onclick="onlocationSelect(\' \',\'delete\',\'' + obj.id + '\')">&times;</button></a>'
                });
                $("#locationlist").append(html);
            }
        }
        else {
            swal('Issue in getting services', ' ', ' error')
        }
    });
}

// sort function on country and state names

function sortOn(arr, prop) {
    arr.sort(
        function (a, b) {
            if (a[prop] < b[prop]) {
                return -1;
            } else if (a[prop] > b[prop]) {
                return 1;
            } else {
                return 0;
            }
        }
    );
}

// sort function on country and state names

function getsitecountry() {
    requestDataFromServer('/lesites/getsitecountry', {}, "GET").done(function (response) {
        res = JSON.parse(response);
        var newobj;
        if (res.status == 200) {
            var html = ' ';
            if (res.data !== undefined && res.data.length > 0) {
                country_sorted = res.data
                sortOn(country_sorted, "countryname"); // sort the countryname in alphabetical
                country_sorted.forEach(function (obj) {
                    html += '<a class="select-link dropdown-item position-relative" onclick="oncountrySelect(\'' + obj.countryname + '\',\' \',\' ' + obj.countryid + '\')" id="' + obj.countryid + '">' + obj.countryname + '</a>'
                    newobj = obj.countryid;
                });
                $("#countrylist").append(html);
            }
        }
        else {
            swal('Issue in getting getsitecountry', ' ', ' error')
        }

    });
}

function getsitestate(id) {
    requestDataFromServer('/lesites/getsitestate', { countryid: id }, "GET").done(function (response) {
        res = JSON.parse(response);
        $("#statelist").empty();
        if (res.status == 200) {
            var html = '<input type="text" placeholder="Search.." id="myState" onkeyup="statefilter()">';
            if (res.data !== undefined && res.data.length > 0) {
                state_sorted = res.data
                sortOn(state_sorted, "statename"); // sort the statename in alphabetical
                res.data.forEach(function (obj) {
                    html += '<a class="select-link dropdown-item position-relative" onclick="onstateSelect(\'' + obj.stateshortname + '\',\'' + obj.lat + '\',\'' + obj.lng + '\',\' \',\' \')" id="' + obj.id + '">' + obj.statename + '</a>'
                });

                $("#statelist").append(html);
            }
        }
        else {
            swal('Issue in getting getsitestate', ' ', ' error')
        }
    });
}

function oncountrySelect(name, action, id = 0) {
    if (action == 'delete') {
        data = {};
        requestData = {};
        data["operation"] = 'delete'
        data["rowid"] = id;
        requestData['data'] = data;
        swal({
            title: "Delete Location",
            text: "Want to permanently delete this country?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete",
            closeOnConfirm: false
        },
            function () {
                requestDataFromServer('/lesites/countryactions', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
                    if (response && response.status == 200) {
                        rowid = response.rowid;
                        $("#countrylist #" + rowid).remove();
                        swal(response.msg, ' ', "success");
                        document.getElementById("selectedcountry").textContent = 'Select country'
                    }
                    else {
                        swal(response.msg, ' ', "error");
                    }
                });
            });
    }
    else {
        document.getElementById("selectedcountry").textContent = name
        document.getElementById("selectedstate").textContent = 'Select state'
        document.getElementById('selectedcountry-error-msg').innerHTML = "";
        //  document.getElementById('selectedcountry-label').style.color = '#404E67'

        getsitestate(id);

    }
}

function onstateSelect(name, lat, lng, action, id = 0) {
    // latitude = lat;
    // longitute = lng;
    if (action == 'delete') {
        data = {};
        requestData = {};
        data["operation"] = 'delete'
        data["rowid"] = id;
        requestData['data'] = data;
        swal({
            title: "Delete state",
            text: "Want to permanently delete this state?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete",
            closeOnConfirm: false
        },
            function () {
                requestDataFromServer('/lesites/stateactions', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
                    if (response && response.status == 200) {
                        rowid = response.rowid;
                        $("#statelist #" + rowid).remove();
                        swal(response.msg, ' ', "success");
                        document.getElementById("selectedstate").textContent = 'Select state'
                    }
                    else {
                        swal(response.msg, ' ', "error");
                    }
                });
            });
    }
    else {
        document.getElementById("selectedstate").textContent = name
        document.getElementById('selectedstate-error-msg').innerHTML = "";
        //   document.getElementById('selectedstate-label').style.color = '#404E67'
    }
}


function onlocationSelect(locationname, action, id = 0) {
    if (action == 'delete') {
        data = {};
        requestData = {};
        data["operation"] = 'delete'
        data["rowid"] = id;
        requestData['data'] = data;
        swal({
            title: "Delete Location",
            text: "Want to permanently delete this location?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete",
            closeOnConfirm: false
        },
            function () {
                requestDataFromServer('/lesites/locationactions', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
                    if (response && response.status == 200) {
                        rowid = response.rowid;
                        $("#locationlist #" + rowid).remove();
                        swal(response.msg, ' ', "success");
                        document.getElementById("selectedlocation").textContent = 'Select Location'
                    }
                    else {
                        swal(response.msg, ' ', "error");
                    }
                });
            });
    }
    else {
        document.getElementById("selectedlocation").textContent = locationname
        document.getElementById('selectedlocation-error-msg').innerHTML = "";
        //document.getElementById('selectedlocation-label').style.color = '#404E67'
    }
}
function reloadSites() {
    getSiteNames()
}

//DOWNLOAD ALL SITES DATA

function selectAllCheckboxes(checkbox) {
    var checkboxes = document.getElementsByName('site');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = checkbox.checked;
        onCheckboxClick(checkboxes[i].parentNode.parentNode.id, checkboxes[i].value, checkboxes[i].getAttribute('data-value'));
    }
}
var siteHtml = "";
var selectedSiteData = []; // Array to store parsed JSON objects
function onCheckboxClick(id, name, val) {
    var decodedVal = decodeURIComponent(val);
    decodedVal = '{' + decodedVal + '}';
    var addSiteObj = JSON.parse(decodedVal);
    var index = selectedSiteData.findIndex(function (obj) {
        return obj.id === addSiteObj.id;
    });
    if (index > -1) {
        selectedSiteData.splice(index, 1);
    } else {
        selectedSiteData.push(addSiteObj);
    }
    var multsitedata = "Parsed JSON: " + JSON.stringify(selectedSiteData);
    // console.log("------>" + multsitedata);
}
function downloadSelectedData() {
    //console.log("downloadSelectedData----->" + selectedSiteData)
    //console.log("downloadSelectedData---1-->" + JSON.stringify(selectedSiteData))
    for (var i = 0; i < selectedSiteData.length; i++) {
        var txtContent = '';
        txtContent += 'sitename: ' + selectedSiteData[i].sitename + '\n';
        txtContent += 'multiselectuser: ' + selectedSiteData[i].multiselectuser + '\n';
        txtContent += 'websocketurl: ' + selectedSiteData[i].websocket_url + '\n';
        txtContent += 'isurlsecure: ' + (selectedSiteData[i].is_URLSecured ? 'on' : 'off') + '\n';
        txtContent += 'Environment: ' + selectedSiteData[i].environment + '\n';
        txtContent += 'entityhost: ' + selectedSiteData[i].entity_host + '\n';
        txtContent += 'entityport: ' + selectedSiteData[i].entity_port + '\n';
        txtContent += 'prefixurl: ' + selectedSiteData[i].analytics_Prefix_URL + '\n';
        // Split location by '-' and assign to selectedcountry and selectedstate
        var locationParts = selectedSiteData[i].location.split('-');
        var selectedcountry = locationParts[0];
        //var selectedstate = locationParts[1];
        var selectedstate = selectedSiteData[i].location;
        txtContent += 'selectedcountry: ' + selectedcountry + '\n'; // Use selectedcountry instead of location
        txtContent += 'selectedstate: ' + selectedstate + '\n'; // Use selectedstate instead of location
        txtContent += 'redishost: ' + selectedSiteData[i].redis_host + '\n';
        txtContent += 'redisport: ' + selectedSiteData[i].redis_port + '\n';
        txtContent += 'redmineurl: ' + selectedSiteData[i].redmine_url + '\n';
        txtContent += 'prometheusurl: ' + selectedSiteData[i].prometheus_url + '\n';
        txtContent += 'elastichost: ' + selectedSiteData[i].elastic_host + '\n';
        txtContent += 'elasticport: ' + selectedSiteData[i].elastic_port + '\n';
        txtContent += 'grafanaapi: ' + selectedSiteData[i].grafana_api + '\n';
        txtContent += 'leurl: ' + selectedSiteData[i].le_url + '\n';
        txtContent += 'latitudess: ' + selectedSiteData[i].lat + '\n';
        txtContent += 'longitutess: ' + selectedSiteData[i].lng + '\n';
        txtContent += 'incidenturl: ' + selectedSiteData[i].incident_url + '\n';
        txtContent += 'incidentapi: ' + selectedSiteData[i].incident_api + '\n';
        txtContent += '\n';

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtContent));
        element.setAttribute('download', selectedSiteData[i].sitename + '.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}
//downloadTxtFile();
//DOWNLOAD ALL SITES DATA

function addSite(obj) {
    var allsitedata = JSON.stringify(obj);
    var sitealldata = allsitedata.replace(/\{|\}/g, '');
    var encodedSiteData = encodeURIComponent(sitealldata);
    siteHtml += '<tr class="collapse-tr" id =' + obj.id + '>'
    siteHtml += '<td class=""><input type="checkbox" name="site" onclick="onCheckboxClick(' + obj.id + ',\'' + obj.sitename + '\',\'' + encodedSiteData + '\')" value="' + obj.sitename + '" data-value="' + encodedSiteData + '"></td>';
    //siteHtml += '<td class="pl-3"><input type="checkbox" name="site" onclick="onCheckboxClick(' + obj.id + ',\'' + obj.sitename + '\',\'' + encodedSiteData + '\')" value="' + obj.sitename + '"></td>';
    siteHtml += '<td class="pl-3">' + obj.sitename + '</td>'
    siteHtml += '<td class="pl-0">'
    siteHtml += '<label class="toggleSwitch large position-absolute ml-4" onclick="">'
    var html = ''
    html = '<input type="checkbox" id =' + obj.id + '_status onchange="clickOnSiteStatus(this, \'' + obj.id + '\')"'
    if (obj.is_enable == 0 || obj.is_enable == false) {
        html += 'checked'
    }
    siteHtml += html + '/>'
    siteHtml += '<span>'
    if (obj.is_enable == 1 || obj.is_enable == true) {
        siteHtml += '<span class="switch_label" id="switch_label_' + obj.id + '"></span>'
    }
    else
        siteHtml += '<span class="switch_label" id="switch_label_' + obj.id + '"></span>'
    siteHtml += '</span>'
    siteHtml += '<a></a>'
    siteHtml += '</label>'
    siteHtml += '</td>'

    siteHtml += '<td class="p-lg-0 px-4 py-1 action-btn">'
    siteHtml += '<div class="d-flex align-items-center justify-content-end" style="gap: 15px;">'

    siteHtml += '<button class="btn btn-default btn-ripple accordion-toggle" data-toggle="collapse" data-target="#site-detail-' + obj.id + '" onclick="userInfo(' + obj.id + ')" title="Details">'
    siteHtml += '<i class="icon-select" style="color: #6c757d"></i>'
    siteHtml += '</button>'

    siteHtml += '<button class="btn btn-default btn-ripple" onclick="onUpdateSite(\'' + obj.id + '\')" data-toggle="modal" data-target="#dialog-for-addsite" title="Edit">'
    siteHtml += '<i class="icon-edit2" style="color: #e99123"></i>'
    siteHtml += '</button>'

    siteHtml += '<button class="btn btn-default btn-ripple" onclick="onDeleteSite(' + obj.id + ')" title="Delete">'
    siteHtml += '<i class="icon-delete" style="color: #ff5252"></i>'
    siteHtml += '</button>'

    siteHtml += '</div>'
    siteHtml += '</td>'
    siteHtml += '<tr class="border-0 collapse-content">'
    siteHtml += '<td colspan="12" class="hiddenRow border-0">'
    siteHtml += '<div class="accordian-body collapse col-12 border-b" id="site-detail-' + obj.id + '">'

    siteHtml += '<table id="">'
    siteHtml += '<thead class="table-head">'
    siteHtml += '<tr class="text-uppercase size12 bold-text">'
    siteHtml += '<td class="pl-0">Websocket URL</td>'
    siteHtml += '<td class="pl-0">Environment</td>'
    siteHtml += '<td class="pl-0">Entity Host</td>'
    siteHtml += '<td class="pl-0">Entity Port</td>'
    siteHtml += '<td class="pl-0">Analytics Prefix URL</td>'
    siteHtml += '<td class="pl-0">Site Location</td>'
    siteHtml += '<td class="pl-0">Redis Host</td>'
    siteHtml += '<td class="pl-0">Redis Port</td>'
    siteHtml += '<td class="pl-0">Redmine URL</td>'
    siteHtml += '<td class="pl-0">Prometheus URL</td>'
    siteHtml += '<td class="pl-0">grafana api</td>'
    siteHtml += '<td class="pl-0">LE URL</td>'
    siteHtml += '<td class="pl-0">Incident URL</td>'
    siteHtml += '<td class="pl-0">Incident API</td>'
    siteHtml += '</tr>'
    siteHtml += '</thead>'
    siteHtml += '<tbody class="accordion" id="">'
    siteHtml += '<tr data-toggle="collapse" data-target="#user-detail" class="accordion-toggle cursor-pointer" id="1">'
    siteHtml += '<td class="pl-0">' + obj.websocket_url + '</td>'
    siteHtml += '<td class="pl-0">' + obj.environment + '</td>'
    siteHtml += '<td class="pl-0">' + obj.entity_host + '</td>'
    siteHtml += '<td class="pl-0">' + obj.entity_port + '</td>'
    siteHtml += '<td class="pl-0">' + obj.analytics_Prefix_URL + '</td>'
    siteHtml += '<td class="pl-0">' + obj.location + '</td>'
    siteHtml += '<td class="pl-0">' + obj.redis_host + '</td>'
    siteHtml += '<td class="pl-0">' + obj.redis_port + '</td>'
    siteHtml += '<td class="pl-0">' + obj.redmine_url + '</td>'
    siteHtml += '<td class="pl-0">' + obj.prometheus_url + '</td>'
    siteHtml += '<td class="pl-0">' + obj.grafana_api + '</td>'
    siteHtml += '<td class="pl-0">' + obj.le_url + '</td>'
    siteHtml += '<td class="pl-0">' + obj.incident_url + '</td>'
    siteHtml += '<td class="pl-0">' + obj.incident_api + '</td>'
    siteHtml += '</tr>'
    siteHtml += '</tbody>'
    siteHtml += '</table>'

    siteHtml += '</div>'
    siteHtml += '</td>'
    siteHtml += '<tr></tr>' //this is for alternative color(dummy tr)
    siteHtml += '</tr>'
    siteHtml += '</tr>'
    siteHtml += '</tr>'
}
function onDeleteSite(id) {
    data = {};
    requestData = {};
    data["operation"] = 'delete'
    data["rowid"] = id;
    requestData['data'] = data;
    swal({
        title: "Delete Site",
        text: "Want to permanently delete this site?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete",
        closeOnConfirm: false
    },
        function () {
            requestDataFromServer('/lesites/siteactions', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
                $('#dialog-for-addsite #cancelbtn').trigger('click');
                if (response && response.status == 200) {
                    rowid = response.rowid;
                    $("#sitetemplate #" + rowid).remove();
                    totalSites--;     //Rajkumar added Sites count in admin page
                    $('#totalSites').text(totalSites);     //Rajkumar added Sites count in admin page
                    swal(response.msg, ' ', "success");
                }
                else {
                    swal(response.msg, ' ', "error");
                }
            });
        });
}
function onAddSite() {
    //  console.log("onAddSite()----->")
    var isInputsFilled = validateInput('site_input');
    if (isInputsFilled == true) {
        requestData = {};
        data = {};
        var websocurl = $('#dialog-for-addsite #websocketurl').val();
        var analyticurl = $('#dialog-for-addsite #prefixurl').val()
        var redurl = $('#dialog-for-addsite #redmineurl').val();
        var promurl = $('#dialog-for-addsite #prometheusurl').val()
        var leurl = $('#dialog-for-addsite #leurl').val();
        if ((websocurl).slice(-2) == '//') {
            websocurl = websocurl.substring(0, websocurl.length - 1)
        } else if ((websocurl).slice(-1) == '/') {
            websocurl = websocurl;
        }
        else {
            websocurl += '/';
        }

        if ((analyticurl).slice(-2) == '//') {
            analyticurl = analyticurl.substring(0, analyticurl.length - 1)
        } else if ((analyticurl).slice(-1) == '/') {
            analyticurl = analyticurl;
        }
        else {
            analyticurl += '/';
        }
        if ((redurl).slice(-2) == '//') {
            redurl = redurl.substring(0, redurl.length - 1)
        } else if ((redurl).slice(-1) == '/') {
            redurl = redurl;
        }
        else {
            redurl += '/';
        }
        if ((promurl).slice(-2) == '//') {
            promurl = promurl.substring(0, promurl.length - 1)
        } else if ((promurl).slice(-1) == '/') {
            promurl = promurl;
        }
        else {

            promurl = promurl + '/';
        }

        if ((leurl).slice(-2) == '//') {
            leurl = leurl.substring(0, leurl.length - 1)
        } else if ((leurl).slice(-1) == '/') {
            leurl = leurl;
        }
        else {
            leurl = leurl + '/';
        }

        data['sitename'] = $('#dialog-for-addsite #sitename').val();
        data['websocketurl'] = websocurl;
        // data['websocketurl'] = $('#dialog-for-addsite #websocketurl').val();
        data['entityhost'] = $('#dialog-for-addsite #entityhost').val();
        data['entityport'] = $('#dialog-for-addsite #entityport').val() == '' ? '443' : $('#dialog-for-addsite #entityport').val();
        data['prefixurl'] = analyticurl;
        // data['prefixurl'] = $('#dialog-for-addsite #prefixurl').val();
        data['location'] = document.getElementById("selectedstate").textContent
        data['isURLSecured'] = document.getElementById("isurlsecure").checked ? true : false
        data['redishost'] = $('#dialog-for-addsite #redishost').val();
        data['environment'] = $('#dialog-for-addsite #selectedenv').val();
        data['redisport'] = $('#dialog-for-addsite #redisport').val();
        data['redmineurl'] = redurl
        //data['redmineurl'] = $('#dialog-for-addsite #redmineurl').val();
        data['prometheusurl'] = promurl
        // data['prometheusurl'] = $('#dialog-for-addsite #prometheusurl').val();
        data['elastichost'] = $('#dialog-for-addsite #elastichost').val();
        data['elasticport'] = $('#dialog-for-addsite #elasticport').val();
        let grafapiValue = $('#dialog-for-addsite #grafanaapi').val();
        data['grafapi'] = (grafapiValue && grafapiValue.trim() !== '') ? grafapiValue.trim() : 'None';
        data['leurl'] = leurl
        //data['leurl'] = $('#dialog-for-addsite #leurl').val();
        //data["lat"] = latitude;
        //data["lng"] = longitute;
        data["lat"] = $('#dialog-for-addsite #latitude').val();
        data["lng"] = $('#dialog-for-addsite #longitude').val();
        let incidenturlAddValue = $('#dialog-for-addsite #incidenturl').val();
        data['incidenturl'] = (incidenturlAddValue && incidenturlAddValue.trim() !== '') ? incidenturlAddValue.trim() : 'None';
        let incidentapiAddValue = $('#dialog-for-addsite #incidentapi').val();
        data['incidentapi'] = (incidentapiAddValue && incidentapiAddValue.trim() !== '') ? incidentapiAddValue.trim() : 'None';
        data["operation"] = 'add'
        data["rowid"] = rowid
        var userList = [];
        id = 'multi-select-user'
        var selectedUsers = $('#' + id).multipleSelect('getSelects');
        selectedUsers.forEach(function (obj) {
            user = {}
            user['user_id'] = obj
            user['isEnabled'] = true
            userList.push(user)
        });
        data['users'] = userList;
        requestData["data"] = data;
        $('#dialog-for-addsite #addbtn').attr('data-dismiss', "modal");
       // console.log("addOnsite---->" + JSON.stringify(requestData))
        requestDataFromServer('/lesites/siteactions', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(siteactionsResponse);
    }
    else {
        $('#dialog-for-addsite #addbtn').attr('data-dismiss', " ");
    }
}
function siteactionsResponse(response) {
    // console.log("siteactionsResponse--->" + response)
    // console.log("siteactionsResponse-1-->" + JSON.stringify(response))
    data = requestData["data"]
    if (response && response.status == 200) {
        data["id"] = response.rowid;
        var html = "";
        html += '<option value="' + data.id + '-' + data.sitename + '">' + data.sitename + '</option>';
        $("#multi-select-site").append(html);        //site list in register user on useronboard
        $("#edit-multi-select-site").append(html);
        $("#multi-select-site").multipleSelect('refresh')
        $("#edit-multi-select-site").multipleSelect('refresh')
        var userList = data['users']
        var isFound = userList.some(el => el.user_id == loginuserId);
        if (isFound) {
            siteHtml = ' '
            addSite(data)
            $("#sitetemplate #data tbody").append(siteHtml);
        }
        swal(response.msg, ' ', "success");
    }
    else {
        swal(response.msg, ' ', "error");
    }
}
function onAddLocation() {
    if ($('#dialog-for-addlocation #locationname').val() == '') {
        $('#dialog-for-addlocation #locationname-label').css('color', '#ff9eac');
        $('#dialog-for-addlocation #locationname-error-msg').text('Field cannot be empty');
        return false;
    }
    else {
        $('#dialog-for-addlocation #locationname-error-msg').text('');
        // $('#dialog-for-addlocation #locationname-label').css('color', '#404E67');
        requestData = {};
        data = {};
        data['locationname'] = $('#dialog-for-addlocation #locationname').val();
        data["operation"] = 'add'
        requestData["data"] = data;
        $('#dialog-for-addlocation #addlocationbtn').attr('data-dismiss', "modal");
        requestDataFromServer('/lesites/locationactions', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
            if (response && response.status == 200) {
                swal(response.msg, ' ', "success");
                var html = '<a class="select-link dropdown-item position-relative" onclick="onlocationSelect(\'' + requestData["data"]["locationname"] + '\')">' + requestData["data"]["locationname"] + '</a>'
                $("#locationlist").append(html);
            }
            else {
                swal(response.msg, ' ', "error");
            }
        });
    }
}
/*function validateInput(className)
{
    var isInputFilled = checkAllfeildsfilled(className)
    if(document.getElementById("selectedlocation").textContent == 'Select Location')
    {
        isInputFilled = false;
        document.getElementById('selectedlocation-error-msg').innerHTML = "Field cannot be empty";
        document.getElementById('selectedlocation-label').style.color =  "#ff9eac"
    }
    else
    {
        document.getElementById('selectedlocation-error-msg').innerHTML = "";
        document.getElementById('selectedlocation-label').style.color = '#404E67'
    }
    var users = $('#multi-select-user').multipleSelect('getSelects');
    if(users.length == 0)
    {
        isInputFilled = false;
        $('#multi-select-user-error-msg').text('Field cannot be empty');
        $('#multi-select-user-label').css('color', '#ff9eac');	
    }
    else
    {
        $('#multi-select-user-error-msg').text(' ');
        $('#multi-select-user-label').css('color', "#404E67");
    }
    return isInputFilled;
}*/
function validateInput(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    if (document.getElementById("selectedcountry").textContent == 'Select country') {
        isInputFilled = false;
        document.getElementById('selectedcountry-error-msg').innerHTML = "Field cannot be empty";
        document.getElementById('selectedcountry-label').style.color = "#ff9eac"
    }
    else {
        document.getElementById('selectedcountry-error-msg').innerHTML = "";
        //document.getElementById('selectedcountry-label').style.color = '#404E67'
    }
    var users = $('#multi-select-user').multipleSelect('getSelects');
    if (users.length == 0) {
        isInputFilled = false;
        $('#multi-select-user-error-msg').text('Field cannot be empty');
        $('#multi-select-user-label').css('color', '#ff9eac');
    }
    else {
        $('#multi-select-user-error-msg').text(' ');
        //$('#multi-select-user-label').css('color', "#404E67");
    }
    // Check if Grafana API field is empty
    var grafanaApiInput = document.getElementById('grafanaapi');
    if (grafanaApiInput.value.trim() === "") {
        isInputFilled = true;
        /*document.getElementById('grafana-error-msg').innerHTML = "Grafana API cannot be empty";
        document.getElementById('grafana-label').style.color = "#ff9eac";*/
    } else {
        document.getElementById('grafana-error-msg').innerHTML = "";
        document.getElementById('grafana-label').style.color = "#404E67";
    }
    // var urlarray = ["redmine", "le", "prometheus", "prefix"]
    var urlarray = ["websocket", "redmine", "le", "prometheus", "prefix"]
    for (var url in urlarray) {
        // console.log('URL + URL-->' + urlarray[url] + 'url')
        var urlattr = document.getElementById(urlarray[url] + 'url')
        // console.log('THIS IS URLATTR---->' + urlattr)
        var expression = /(https?:\\(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9._-]+\.[^\s]{2,}|www\.[a-zA-Z0-9._-]+\.[^\s]{2,})|(wss?:\\(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|wss?:\/\/(?:www\.|(?!www))[a-zA-Z0-9._-]+\.[^\s]{2,}|www\.[a-zA-Z0-9._-]+\.[^\s]{2,}|http:\/\/localhost:[0-9]+)/gi;
        var regex = new RegExp(expression);
        if ((urlattr.value).match(regex)) {
            console.log("true")
        } else {
            isInputFilled = false;
            $('#' + urlarray[url] + '-error-msg').text('required pattern ex:http or https://example.in');
            $('#' + urlarray[url] + '-label').css('color', '#ff9eac');
        }
    }
    return isInputFilled;
}
function getEnvironmentName() {
   // console.log('inside getenvironmentnames')
    requestDataFromServer('/applications/getallapplicationnames', {}, "GET").done(handleEnvironmentNameResponse);

    // else
    //     getVaultInformation();
}

function handleEnvironmentNameResponse(response) {
    //console.log('inside handleEnvironmentNamesResponse response-->' + response)
    res = JSON.parse(response);
    $("#selectedenv").empty();
    var innerHtml = " ";
    if ($('#selectedenv').children('option').length == 0) {
        innerHtml = "<option disabled selected>Select ENVIRONMENT</option>"
    }
    if (res.status == 200) {
        // getVaultInformation();
        res.data.forEach(function (obj) {
            innerHtml += '<option  value="' + obj.applicationname + '" id="' + obj.applicationname + '">' + obj.applicationname + '</option>';
        });
    }
    else {
        swal('Failure in getallenvironmentnames ', ' ', 'error')
    }
    env_list = innerHtml
    $("#selectedenv").append(innerHtml);
}

function openAddSiteModal() {

   // console.log('INSIDE OPENADDSITEMODAL')
    $('#dialog-for-addsite .modal-title').html('Add Site')
    $('#dialog-for-addsite #addbtn').html('Add')
    $('#dialog-for-addsite #addbtn').attr('onclick', 'onAddSite()')
    $("#dialog-for-addsite #sitename").prop('disabled', false);

    $('.site_input').each(function (e) {
        id = $(this).attr('id')
        $("#dialog-for-addsite #" + id).val('')
        //$(this).parent().find("label").css('color', '#404E67');
        $(this).parent().find(".error-msg").text(' ');
    });
    //document.getElementById("selectedlocation").textContent = 'Select Location'
    //document.getElementById('selectedlocation-error-msg').innerHTML = "";
    // document.getElementById('selectedlocation-label').style.color = '#404E67';
    $('#dialog-for-addsite #addbtn').attr('data-dismiss', " ");
    $('#isurlsecure').prop('checked', true);
    $('#dialog-for-addsite #entityport').val('443');
    $('#multi-select-user').multipleSelect('uncheckAll')
    $('#multi-select-user-error-msg').text(' ');
    //$('#multi-select-user-label').css('color', "#404E67");
    var obj = users.filter(x => x.email === 'admin')[0]
    $("#multi-select-user").multipleSelect('setSelects', '[' + obj.id + ']')
    $('#user-select-div input:checkbox[value="' + obj.id + '"]').attr('disabled', true);
    getEnvironmentName()
}
function openAddLocationModal() {
    $('.location_input').each(function (e) {
        id = $(this).attr('id')
        $("#dialog-for-addlocation #" + id).val('')
        //$(this).parent().find("label").css('color', '#404E67');
        $(this).parent().find(".error-msg").text(' ');
    });
    $('#dialog-for-addlocation #addlocationbtn').attr('data-dismiss', " ");
}
function onUpdateSite(siteObjId) {
    $("#selectedenv").empty();
    $("#selectedenv").append(env_list);
    $('#dialog-for-addsite .modal-title').html('Update Site')
    $('#dialog-for-addsite #addbtn').html('Save')
    $('#dialog-for-addsite #addbtn').attr('onclick', 'saveSiteUpdate()')
    $("#dialog-for-addsite #sitename").prop('disabled', true);
    $('.site_input').each(function (e) {
        id = $(this).attr('id')
        //$(this).parent().find("label").css('color', '#404E67');
        $(this).parent().find(".error-msg").text(' ');
    });
    document.getElementById('selectedcountry-error-msg').innerHTML = "";
    //  document.getElementById('selectedcountry-label').style.color = '#404E67';
    $('#dialog-for-addsite #addbtn').attr('data-dismiss', " ");


    var obj = allSiteResponse.filter(x => x.id == siteObjId)[0]
    //console.log('Edit site response--->' + JSON.stringify(obj))

    //latitude = obj.lat
    //longitute = obj.lng
    $('#dialog-for-addsite #latitude').val(obj.lat);
    $('#dialog-for-addsite #longitude').val(obj.lng);
    $('#dialog-for-addsite #entityhost').val(obj.entity_host);
    $('#dialog-for-addsite #entityport').val(obj.entity_port)
    $('#dialog-for-addsite #prefixurl').val(obj.analytics_Prefix_URL);
    document.getElementById("selectedstate").textContent = obj.location
    document.getElementById("selectedcountry").textContent = obj.location.split("-")[0]
    //document.getElementById("selectedcountry").textContent = obj.country
    //document.getElementById("selectedstate").textContent = obj.state
    obj.is_URLSecured == '1' ? urlSecured = true : urlSecured = false
    $('#dialog-for-addsite #isurlsecure').attr('checked', urlSecured)
    $('#dialog-for-addsite #redishost').val(obj.redis_host);
    $('#dialog-for-addsite #redisport').val(obj.redis_port)
    $('#dialog-for-addsite #redmineurl').val(obj.redmine_url)
    $('#dialog-for-addsite #prometheusurl').val(obj.prometheus_url)
    $('#dialog-for-addsite #elastichost').val(obj.elastic_host)
    $('#dialog-for-addsite #elasticport').val(obj.elastic_port)
    $('#dialog-for-addsite #grafanaapi').val(obj.grafana_api)
    $('#dialog-for-addsite #leurl').val(obj.le_url)
    $('#dialog-for-addsite #incidenturl').val(obj.incident_url)
    $('#dialog-for-addsite #incidentapi').val(obj.incident_api)
    rowid = obj.id
    $('#multi-select-user-error-msg').text(' ');
    // $('#multi-select-user-label').css('color', "#404E67");

    requestDataFromServer('/useronboard/getuserlist', { 'siteId': JSON.stringify(rowid), csrfmiddlewaretoken: csfr_token }, type = "post").done(function (response) {
        var selectedUsers = []
        res = JSON.parse(response);
        if (res.status == 200) {
            selectedUsers = res.data
            $('#multi-select-user').multipleSelect('setSelects', selectedUsers)
        }
    });
   // console.log('Environment val before update--->' + $(' #selectedenv').val())
    $('#dialog-for-addsite #sitename').val(obj.sitename);
    $('#dialog-for-addsite #websocketurl').val(obj.websocket_url);
    document.querySelector('#selectedenv > option[id="' + obj.environment + '"]').selected = true;
    //$('#selectedenv option[value="' + obj.environment + '"]').attr('selected', 'selected');
    //$('#selectedenv').val(obj.environment);
   // console.log('Environment val After update--->' + $(' #selectedenv').val())
}
function saveSiteUpdate() {
    var isInputsFilled = validateInput('site_input');
    if (isInputsFilled == true) {
        requestData = {};
        data = {};


        var websocurl = $('#dialog-for-addsite #websocketurl').val();
        var analyticurl = $('#dialog-for-addsite #prefixurl').val()
        var redurl = $('#dialog-for-addsite #redmineurl').val();
        var promurl = $('#dialog-for-addsite #prometheusurl').val()
        var leurl = $('#dialog-for-addsite #leurl').val()
        if ((websocurl).slice(-2) == '//') {
            websocurl = websocurl.substring(0, websocurl.length - 1)
        } else if ((websocurl).slice(-1) == '/') {
            websocurl = websocurl;
        }
        else {
            websocurl += '/';
        }

        if ((analyticurl).slice(-2) == '//') {
            analyticurl = analyticurl.substring(0, analyticurl.length - 1)
        } else if ((analyticurl).slice(-1) == '/') {
            analyticurl = analyticurl;
        }
        else {
            analyticurl += '/';
        }
        if ((redurl).slice(-2) == '//') {
            redurl = redurl.substring(0, redurl.length - 1)
        } else if ((redurl).slice(-1) == '/') {
            redurl = redurl;
        }
        else {
            redurl += '/';
        }
        if ((promurl).slice(-2) == '//') {
            promurl = promurl.substring(0, promurl.length - 1)
        } else if ((promurl).slice(-1) == '/') {
            promurl = promurl;
        }
        else {

            promurl = promurl + '/';
            //  console.log("INSIDE ELSE-->" + promurl)
        }

        if ((leurl).slice(-2) == '//') {
            leurl = leurl.substring(0, leurl.length - 1)
        } else if ((leurl).slice(-1) == '/') {
            leurl = leurl;
        }
        else {
            leurl = leurl + '/';
        }


        data['sitename'] = $('#dialog-for-addsite #sitename').val();
        data['websocketurl'] = websocurl
        // data['websocketurl'] = $('#dialog-for-addsite #websocketurl').val();
        data['entityhost'] = $('#dialog-for-addsite #entityhost').val();
        data['entityport'] = $('#dialog-for-addsite #entityport').val() == '' ? '443' : $('#dialog-for-addsite #entityport').val();
        data['prefixurl'] = analyticurl
        //data['prefixurl'] = $('#dialog-for-addsite #prefixurl').val();
        data['location'] = document.getElementById("selectedstate").textContent
        //data['country'] = document.getElementById("selectedcountry").textContent
        //data['state'] = document.getElementById("selectedstate").textContent
        data['isURLSecured'] = document.getElementById("isurlsecure").checked ? true : false
        data['environment'] = $('#selectedenv').val();
        data['redishost'] = $('#dialog-for-addsite #redishost').val();
        data['redisport'] = $('#dialog-for-addsite #redisport').val()
        data['redmineurl'] = redurl
        // data['redmineurl'] = $('#dialog-for-addsite #redmineurl').val()
        data['prometheusurl'] = promurl
        //data['prometheusurl'] = $('#dialog-for-addsite #prometheusurl').val()
        data['elastichost'] = $('#dialog-for-addsite #elastichost').val();
        data['elasticport'] = $('#dialog-for-addsite #elasticport').val()
        let grafapiValue = $('#dialog-for-addsite #grafanaapi').val();
        data['grafapi'] = grafapiValue.trim() === '' ? null : grafapiValue.trim();
        data['leurl'] = leurl
        // data['leurl'] = $('#dialog-for-addsite #leurl').val()
        //data['lat'] = latitude
        //data['lng'] = longitute
        data['lat'] = $('#dialog-for-addsite #latitude').val();
        data['lng'] = $('#dialog-for-addsite #longitude').val();
        let incidenturlUpdValue = $('#dialog-for-addsite #incidenturl').val();
        data['incidenturl'] = incidenturlUpdValue.trim() === '' ? null : incidenturlUpdValue.trim();
        let incidentapiUpdValue = $('#dialog-for-addsite #incidentapi').val();
        data['incidentapi'] = incidentapiUpdValue.trim() === '' ? null : incidentapiUpdValue.trim();
        data["operation"] = 'update'
        data["rowid"] = rowid
        var selectedUsers = $('#multi-select-user').multipleSelect('getSelects');
        var userList = [];
        selectedUsers.forEach(function (obj) {
            user = {}
            user['user_id'] = obj
            user['isEnabled'] = true
            userList.push(user)
        });
        data['users'] = userList;
        requestData["data"] = data;
        $('#dialog-for-addsite #addbtn').attr('data-dismiss', "modal");
       // console.log('update REQUESTDATA--->' + JSON.stringify(requestData))
        requestDataFromServer('/lesites/siteactions', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
              //console.log("addbtn---->" + response)
              //console.log("addbtn-1--->" + JSON.stringify(response))
            var data = requestData["data"]
            //console.log("addbtn-data--->" + data)
            //console.log("addbtn-1--data->" + JSON.stringify(data.grafapi))
            if (response && response.status == 200) {
                var obj = allSiteResponse.filter(x => x.id === response.rowid)[0]
                obj.websocket_url = data.websocketurl
                obj.location = data.location
                obj.entity_host = data.entityhost
                obj.entity_port = data.entityport
                obj.is_URLSecured = data.isURLSecured
                obj.environment = data.environment
                obj.prefixurl = data.prefixurl
                obj.redis_host = data.redishost
                obj.redis_port = data.redisport
                obj.redmine_url = data.redmineurl
                obj.prometheus_url = data.prometheusurl
                obj.elastic_host = data.elastichost
                obj.elastic_port = data.elasticport
                obj.grafana_api = data.grafapi
                obj.le_url = data.leurl
                obj.lat = data.lat
                obj.lng = data.lng
                obj.incident_url = data.incidenturl
                obj.incident_api = data.incidentapi
                var userList = data['users']
                var isFound = userList.some(el => el.user_id == loginuserId);
                if (isFound) {
                    var html = ' '
                    $("#sitetemplate #site-detail-" + rowid + ' tbody tr').empty();
                    html += '<td class="pl-0">' + data.websocketurl + '</td>'
                    html += '<td class="pl-0">' + data.entityhost + '</td>'
                    html += '<td class="pl-0">' + data.entityport + '</td>'
                    html += '<td class="pl-0">' + data.prefixurl + '</td>'
                    html += '<td class="pl-0">' + data.location + '</td>'
                    html += '<td class="pl-0">' + data.redishost + '</td>'
                    html += '<td class="pl-0">' + data.redisport + '</td>'
                    html += '<td class="pl-0">' + data.redmineurl + '</td>'
                    html += '<td class="pl-0">' + data.prometheusurl + '</td>'
                    html += '<td class="pl-0">' + data.elastichost + '</td>'
                    html += '<td class="pl-0">' + data.elasticport + '</td>'
                    html += '<td class="pl-0">' + data.grafapi + '</td>'
                    html += '<td class="pl-0">' + data.leurl + '</td>'
                    html += '<td class="pl-0">' + data.incidenturl + '</td>'
                    html += '<td class="pl-0">' + data.incidentapi + '</td>'
                    $("#sitetemplate #site-detail-" + rowid + ' tbody tr').append(html);
                }
                else {
                    $("#sitetemplate #" + rowid).remove();
                }
                swal(response.msg, ' ', "success");
            }
            else {
                swal(response.msg, ' ', "error");
            }
        });
    }
    else {
        $('#dialog-for-addsite #addbtn').attr('data-dismiss', " ");
    }
}
function clickOnSiteStatus(checkbox, id) {
    data = {};
    jsonObj = {};
    data["operation"] = 'changestatus';
    data["rowid"] = id;
    rowid = id;
    if (checkbox.checked == true) {
        data["status"] = 'Enable';
    }
    else {
        data["status"] = 'Disable';
        checkbox.checked == false
    }
    jsonObj["data"] = data;
    requestDataFromServer('/lesites/siteactions', { 'clientData': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
        var siteStatus = 'Enable';
        if (response && response.status != 200) {
            swal('Not able to change status', ' ', "error");
        }
        siteStatus = response.msg ? response.msg : data["status"]
        // $('#sitetemplate #switch_label_' + id).text(siteStatus)
        siteStatus == 'Enable' ? $('#sitetemplate #' + rowid + '_status').prop('checked', false) : $('#sitetemplate #' + rowid + '_status').prop('checked', true)
    });
}
function getusers() {
    requestDataFromServer('/useronboard/getuserlist', {}, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            var html = "";
            $("#multi-select-user").empty();
            // $("#edit-multi-select-application").empty();
            users = res.data;
            res.data.forEach(function (obj) {
                html += '<option value="' + obj.id + '">' + obj.email + '</option>';
            });
            $("#multi-select-user").append(html);
            // $("#edit-multi-select-application").append(html);
            registerMultiSelectUser()
        }
        else {
            swal('Failure in geting User List', ' ', 'error')
        }
    })
}
function registerMultiSelectUser() {
    $('#multi-select-user').multipleSelect(
        {
            placeholder: 'Select User',
            showClear: true,
            selectAll: true
        });
}

function countryfilter() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myCountry");
    filter = input.value.toUpperCase();
    div = document.getElementById("countrylist");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
function statefilter() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myState");
    filter = input.value.toUpperCase();
    div = document.getElementById("statelist");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

//SITE EXPORT FUNCTION

let exportfile = () => {
    // Get the data from each element on the form.
    const sitename = document.getElementById("sitename");
    // const multiselectuser = document.getElementById("multi-select-user");
    const multiselectuser = "";
    const websocketurl = document.getElementById("websocketurl");
    const isurlsecure = document.getElementById("isurlsecure");
    const environment = document.getElementById("selectedenv");
    const entityhost = document.getElementById("entityhost");
    const entityport = document.getElementById("entityport");
    const prefixurl = document.getElementById("prefixurl");
    const selectedcountry = document.getElementById("selectedcountry");
    const selectedstate = document.getElementById("selectedstate");
    const redishost = document.getElementById("redishost");
    const redisport = document.getElementById("redisport");
    const redmineurl = document.getElementById("redmineurl");
    const prometheusurl = document.getElementById("prometheusurl");
    const elastichost = document.getElementById("elastichost");
    const elasticport = document.getElementById("elasticport");
    const grafanaapi = document.getElementById("grafanaapi");
    const leurl = document.getElementById("leurl");
    const latitudes = document.getElementById("latitude");
    const longitutes = document.getElementById("longitude");
    const incidenturl = document.getElementById("incidenturl");
    const incidentapi = document.getElementById("incidentapi");

    //console.log("export---->" + latitudes.value + "====" + longitutes.value)
    // This variable stores all the data.
    let data = "sitename: " + sitename.value + "\r\n" + "multiselectuser: " + multiselectuser.innerText + "\r\n" + "websocketurl: " + websocketurl.value + "\r\n" + "isurlsecure: " + isurlsecure.value + "\r\n" + "environment: " + environment.value + "\r\n" + "entityhost: " + entityhost.value + "\r\n" + "entityport: " + entityport.value + "\r\n" + "prefixurl: " + prefixurl.value + "\r\n" + "selectedcountry: " + selectedcountry.innerText + "\r\n" + "selectedstate: " + selectedstate.innerText + "\r\n" + "redishost: " + redishost.value + "\r\n" + "redisport: " + redisport.value + "\r\n" + "redmineurl: " + redmineurl.value + "\r\n" + "prometheusurl: " + prometheusurl.value + "\r\n" + "elastichost: " + elastichost.value + "\r\n" + "elasticport: " + elasticport.value + "\r\n" + "grafanaapi: " + grafanaapi.value + "\r\n" + "leurl: " + leurl.value + "\r\n" + "latitudess: " + latitudes.value + "\r\n" + "longitutess: " + longitutes.value + "\r\n" + "incidenturl: " + incidenturl.value + "\r\n" + "incidentapi: " + incidentapi.value;
    // console.log(data); //printing form data into the console
    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: "text/plain" });
    var filename = sitename.value;
    /* var month = new Date(); //months from 1-12
     month = month.getMonth();

     var day = new Date();
     var day = day.getUTCDate();

     var year = new Date();
     var year = year.getUTCFullYear();

     newdate = year + "/" + month + "/" + day; */
    const sFileName = filename; // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sitename.value;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
};

/*function uploadbutton() {
    $("#upload_button").empty();
    var uploadhtml = ''
     uploadhtml = '<input type="file" id="fileinput" accept=".txt">';
   // document.getElementById('upload_button').append(uploadhtml)
    $("#upload_button").append(uploadhtml)
}*/
// ================ upload file ===========

(function () {
    var input = document.getElementById("fileinput");
    input.addEventListener("change", loadFile, false);

    function loadFile() {
        var file, fr;

        if (typeof window.FileReader !== 'function') {
            alert("The file API isn't supported on this browser yet.");
            return;
        }

        if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        } else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");
        } else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
        }

        function receivedText() {
            var data = fr.result.split('\n');
              //console.log("saveFormAsTextFile-->"+data)
              //console.log("saveFormAsTextFile-->"+data[4])
            document.getElementById("sitename").value = (data[0]).split(": ")[1];
            document.getElementById("multi-select-user").innerText = (data[1]).split(": ")[1];
            document.getElementById("websocketurl").value = (data[2]).split(": ")[1];
            document.getElementById("isurlsecure").value = (data[3]).split(": ")[1];
            //document.getElementById("selectedenv").value = (data[4]).split(": ")[1];
            // For selectedenv dropdown
            const selectedEnvValue = (data[4].split(": ")[1]).trim(); // Extract and trim the environment value
            const selectedEnvDropdown = document.getElementById("selectedenv");
            let optionFound = false;

            for (let i = 0; i < selectedEnvDropdown.options.length; i++) {
                if (selectedEnvDropdown.options[i].value === selectedEnvValue) {
                    selectedEnvDropdown.selectedIndex = i;
                    optionFound = true;
                    break;
                }
            }

            if (!optionFound) {
                console.warn("Environment value not found in dropdown options:", selectedEnvValue);
            }
            document.getElementById("entityhost").value = (data[5]).split(": ")[1];
            document.getElementById("entityport").value = parseInt((data[6]).split(": ")[1]);
            document.getElementById("prefixurl").value = (data[7]).split(": ")[1];
            document.getElementById("selectedcountry").innerText = (data[8]).split(": ")[1];
            document.getElementById("selectedstate").innerText = (data[9]).split(": ")[1];
            document.getElementById("redishost").value = (data[10]).split(": ")[1];
            document.getElementById("redisport").value = parseInt((data[11]).split(": ")[1]);
            document.getElementById("redmineurl").value = (data[12]).split(": ")[1];
            document.getElementById("prometheusurl").value = (data[13]).split(": ")[1];
            document.getElementById("elastichost").value = (data[14]).split(": ")[1];
            document.getElementById("elasticport").value = parseInt((data[15]).split(": ")[1]);
            document.getElementById("grafanaapi").value = (data[16]).split(": ")[1];
            document.getElementById("leurl").value = (data[17]).split(": ")[1];
            document.getElementById("latitude").value = (data[18]).split(": ")[1];
            document.getElementById("longitude").value = (data[19]).split(": ")[1];
            document.getElementById("incidenturl").value = (data[20]).split(": ")[1];
            document.getElementById("incidentapi").value = (data[21]).split(": ")[1];

            //  console.log("upload--1-->" + latitude + "====" + longitute)

        }
    }
})();

function saveFormAsTextFile()
// Based on https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
{
    var textToSave =
        document.getElementById('sitename').value + '\n' +
        document.getElementById('multi-select-user').value + '\n' +
        document.getElementById('websocketurl').value + '\n' +
        document.getElementById('isurlsecure').value + '\n' +
        document.getElementById('selectedenv').value + '\n' +
        document.getElementById('entityhost').value + '\n' +
        document.getElementById('entityport').value + '\n' +
        document.getElementById('prefixurl').value + '\n' +
        document.getElementById('selectedcountry').innerText + '\n' +
        document.getElementById('selectedstate').innerText + '\n' +
        document.getElementById('redishost').value + '\n' +
        document.getElementById('redisport').value + '\n' +
        document.getElementById('redmineurl').value + '\n' +
        document.getElementById('prometheusurl').value + '\n' +
        document.getElementById('elastichost').value + '\n' +
        document.getElementById('elasticport').value + '\n' +
        document.getElementById('grafanaapi').value + '\n' +
        document.getElementById('leurl').value + '\n' +
        document.getElementById('incidenturl').value + '\n' +
        document.getElementById('incidentapi').value + '\n' +
        document.getElementById('latitude').value + '\n' +
        document.getElementById('longitude').value

    // console.log("upload---->" + latitude +"===="+longitute)
    // document.getElementById("selectedlocation").textContent = 'Select Location'
    var textToSaveAsBlob = new Blob([textToSave], {
        type: "text/plain"
    });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("sitename").value;

    /*var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();*/
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}
