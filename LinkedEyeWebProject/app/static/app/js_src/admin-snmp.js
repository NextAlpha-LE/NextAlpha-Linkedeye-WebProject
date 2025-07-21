var totalTickets = 0
var device = '';
var servicetype = '';
var servertypes = '';
var servertypesrow = '';
var serveros = '';
var serverosrow = '';
var serversoftware = '';
var servernic = '';
var serversoftwarerow = '';
var switcheslayers = '';
var switcheslayersrow = '';
var switchesmodel = '';
var switchesmodelrow = '';
var firewallstypes = '';
var firewallstypesrow = '';
var firewallsmodel = '';
var firewallsmodelrow = '';
var editdata=''
var deldata=''
var rowid = ''
var selectedFileType = "";
var hostPath = "DIRECT";
var nametype = ''
var snmp_xml_2c = "";
var snmp_xml_3c = "";
$(document).ready(function()
{
    $('.snmp_input').focusout(function (e) {
       // console.log("error-msg--->")
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).parent().find("label").css('color', '#ff9eac');
            $(this).parent().find(".error-msg").text('Field cannot be empty');
        }
        else {
            //  $(this).parent().find("label").css('color', '#404E67');
            $(this).parent().find(".error-msg").text('');
        }
    });
    getSnmpXML()
    getsnmpdata()
});

function getSnmpXML(){
    requestDataFromServer('/getsnmpfilecontent', { filename: "v2c.j2" }, "GET").done(function (response) {
        snmp_xml_2c = response;
       // console.log("getSnmpXML-v2-->" + snmp_xml_2c)
    });
    requestDataFromServer('/getsnmpfilecontent', { filename: "v3c.j2" }, "GET").done(function (response) {
        snmp_xml_3c = response;
       // console.log("getSnmpXML-v3-->" + snmp_xml_3c)
    });
}


let sendSnmp2DataToServer = () => {
    // Get the data from each element on the form.
    var isInputsFilled = validateInputs('snmp_input');
   // console.log("isInputsFilled----->" + isInputsFilled)
    if (isInputsFilled == true) {
        sendSnmpDataToServers()
        const snmpversion = document.getElementById("snmp_version");
        const ipaddress = document.getElementById("snmp-select-ip");
        const snmpmodel = document.getElementById("snmp_models");
        const commstring = document.getElementById("comm_string");

        var v2file_data = snmp_xml_2c
        v2file_data = v2file_data.replaceAll('__IP__', ipaddress.value)
        v2file_data = v2file_data.replaceAll('__MODEL__', snmpmodel.value)
        v2file_data = v2file_data.replaceAll('__COMMUNITYSTRING__', commstring.value)
        v2file_data = v2file_data.replaceAll('__PROTO__', snmpversion.value)
       // console.log('SNMP FILE--->' + v2file_data)
    }
   // console.log("snmp_xml_2c---->" + snmp_xml_2c)
   /* var ipval = snmp_xml_2c.replaceAll('__IP__', ipaddress.value)
    var modelval = snmp_xml_2c.replaceAll('__MODEL__', snmpmodel.value)
    var commval = snmp_xml_2c.replaceAll('__COMMUNITYSTRING__', commstring.value)
    var verval = snmp_xml_2c.replaceAll('__PROTO__', snmpversion.value)
    console.log("ipval---->" + ipval)
    console.log("modelval---->" + modelval)
    console.log("commval---->" + commval)
    console.log("verval---->" + verval)
    */
};

let sendSnmp3DataToServer = () => {
    // Get the data from each element on the form.
    var isInputsFilled = validateingInput('snmp_input');
    if (isInputsFilled == true) {
        sendSnmpDataToServers()
        const snmpversion = document.getElementById("snmp_version");
        const ipaddress = document.getElementById("snmp-select-ip");
        const snmpmodel = document.getElementById("snmp_models");
        const securitylevel = document.getElementById("security_level");
        const Authenticationmtd = document.getElementById("Authentication_mtd");
        const Privacymtd = document.getElementById("Privacy_mtd");
        const authpassword = document.getElementById("auth_password");
        const privacypassword = document.getElementById("privacy_password");
        const username = document.getElementById("user_name");
        var v3file_data = snmp_xml_3c
        v3file_data = v3file_data.replaceAll('__IP__', ipaddress.value)
        v3file_data = v3file_data.replaceAll('__MODEL__', snmpmodel.value)
        v3file_data = v3file_data.replaceAll('__PROTO__', snmpversion.value)
        v3file_data = v3file_data.replaceAll('__SECLEV__', securitylevel.value)
        v3file_data = v3file_data.replaceAll('__USER__', username.value)
        v3file_data = v3file_data.replaceAll('__AUTHMTD__', Authenticationmtd.value)
        v3file_data = v3file_data.replaceAll('__AUTHPASS__', authpassword.value)
        v3file_data = v3file_data.replaceAll('__PRIVMTD__', Privacymtd.value)
        v3file_data = v3file_data.replaceAll('__PRIVPASS__', privacypassword.value)

       // console.log('SNMP snmp_xml_3c--->' + v3file_data)
    }
    
};
var new_snmpip = ''

function newonbipadd(ipvalue) {
    new_snmpip = ipvalue
    //console.log("newonbipadd--->" + new_snmpip)
}
var snmplabelNames = ["uptime_w", "uptime_c", "uptime_t", "temp_w", "temp_c", "temp_t", "mem_w", "mem_c", "mem_t", "cpu_w", "cpu_c", "cpu_t"];
var snmpdefaultValues = [90, 120, 72000, 70, 80, 10, 70, 80, 10, 70, 80, 10];

function generateThresholdHTML() {
   // console.log("generateThresholdHTML")
    var thresholdHTML = '';
    thresholdHTML += '<div class="row">';
    thresholdHTML += '<div class="col-4">';
    thresholdHTML += '<input type="checkbox" id="thresholds" name="threshold" value="threshold" onchange="toggleTextsnmp(this)">';
    thresholdHTML += '<label for="threshold"> Threshold</label>';
    thresholdHTML += '</div>';
    thresholdHTML += '<div class="col-1">';
    thresholdHTML += '<i class="mdi mdi-reload io-con" id="threshold-snmpicon" onclick="resetsnmpValues()" style="color:#e99123;display:none;"></i>';
    thresholdHTML += '</div>';
    thresholdHTML += '<div class="col-6">';
    thresholdHTML += '<table class="table" id="table-snmp" style="display:none;">';
    thresholdHTML += '<tr class="small-row">';
    thresholdHTML += '<th></th>';
    thresholdHTML += '<th>Abbreviation</th>';
    thresholdHTML += '<th>Units</th>';
    thresholdHTML += '</tr>';
    thresholdHTML += '<tr class="small-row">';
    thresholdHTML += '<td>w</td>';
    thresholdHTML += '<td>Warning</td>';
    thresholdHTML += '<td>num</td>';
    thresholdHTML += '</tr>';
    thresholdHTML += '<tr class="small-row">';
    thresholdHTML += '<td>c</td>';
    thresholdHTML += '<td>Critical</td>';
    thresholdHTML += '<td>num</td>';
    thresholdHTML += '</tr>';
    thresholdHTML += '<tr class="small-row">';
    thresholdHTML += '<td>t</td>';
    thresholdHTML += '<td>Time</td>';
    thresholdHTML += '<td>sec</td>';
    thresholdHTML += '</tr>';
    thresholdHTML += '</table>';
    thresholdHTML += '</div>';
    thresholdHTML += '</div>';

    thresholdHTML += '<div id="threshold-snmp" style="display:none;">';
    for (var i = 0; i < snmplabelNames.length; i++) {
        thresholdHTML += '<div class="row">';
        thresholdHTML += '<div class="col-1"></div>';
        thresholdHTML += '<div class="col-4">';
        thresholdHTML += '<label for="' + snmplabelNames[i] + '">' + snmplabelNames[i] + '</label>';
        thresholdHTML += '</div>';
        thresholdHTML += '<div class="col-5">';
        thresholdHTML += '<input type="number" step="any" class="form-control" id="' + snmplabelNames[i] + '" value="' + snmpdefaultValues[i] + '">';
        thresholdHTML += '</div>';
        thresholdHTML += '<div class="col-2"></div>';
        thresholdHTML += '</div>';
    }
    thresholdHTML += '</div>';

    return thresholdHTML;
}

function snmpv2c(select) {
   // console.log("newonbtable--sn-->")
   // console.log("newonbtable-val-->" + select)
    $("#snmpver2c").empty();
    var snmp2html = '';
    if (select == "v2c") {
        snmp2html += '<div class="col-12 my-2">'
        snmp2html += '<label for="snmp-select-ip" id="snmpip-label">IP Address</label>';
        snmp2html += '<input type="text" class="form-control snmp_input full-input" placeholder="Enter IPAddress" value="' + new_snmpip +'" required="" id="snmp-select-ip" style="background-color:transparent;" autocomplete="off" readonly>'
        snmp2html += '<span class="error-msg" id=""> </span>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-12 my-4 password-group">'
        snmp2html += '<label for="comm_string" id="commstring-label">Community String</label>'
        snmp2html += '<input type="password" class="form-control snmp_input full-input" placeholder="Enter Community String" required="" id="comm_string" autocomplete="new-password">'
        snmp2html += '<span class="error-msg" id=""></span>';
        snmp2html += '<div class="d-inline-block icon"><i class="mdi mdi-eye-off-outline toggle-password" id="icon_change" onclick="mypasscommFunction()"></i></div>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-12 mt-3">';
        snmp2html += '<label for="snmp_models" id="snmpmod-label">Model</label>';
        snmp2html += '<div class="dropdown select-btn-dropdown full-select-dropdown">';
        snmp2html += '<select class="form-btn btn-dropdown-link dropdown-toggle snmp_input w-100" style="height:33px !important;" type="button" id="snmp_models" aria-haspopup="true" aria-expanded="false">';
        snmp2html += '</select>';
        snmp2html += '<span class="error-msg" id="snmpmod-error-msg"> </span>';
        snmp2html += '</div>';
        snmp2html += '</div>';
        snmp2html += generateThresholdHTML();
        snmp2html += '<br>';
        snmp2html += '<div class="modal-footer mx-auto col-md-11 col-12">';
        snmp2html += '<div class="col-5 px-1">';
        snmp2html += '<button type="button" class="btn btn-outline-secondary cancel-btn w-100" data-dismiss="modal">Cancel</button>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-5 px-1">'; 
        snmp2html += '<button type="button" class="btn btn-outline-secondary w-100" id="snmbv2cs" onclick="verifiedv2ctoserver()">Verify</button>';
        //snmp2html += '<button type="button" class="btn btn-outline-secondary w-100" id="snmbv2cs" onclick="sendSnmp2DataToServer()">Add</button>';
        snmp2html += '</div>';
        snmp2html += '<div class="" id="valid_row"></div>';
        snmp2html += '</div>';
    }
    else {
        snmp2html += '<div class="col-12 my-2">'
        snmp2html += '<label for="snmp-select-ip" id="snmpip-label">IP Address</label>';
        snmp2html += '<input type="text" class="form-control snmp_input full-input" placeholder="Enter IPAddress" value="' + new_snmpip + '" required="" id="snmp-select-ip" style="background-color:transparent;" autocomplete="off" readonly>'
        snmp2html += '<span class="error-msg" id=""> </span>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-12 my-2">'
        snmp2html += '<label for="user_name" id="user-label">User Name</label>'
        snmp2html += '<input type="text" class="form-control snmp_input full-input" placeholder="Enter User Name" required="" id="user_name" autocomplete="off">'
        snmp2html += '<span class="error-msg" id=""> </span>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-12 mt-3">';
        snmp2html += '<label for="security_level" id="securitylevel-label">Security Level</label>';
        snmp2html += '<div class="dropdown select-btn-dropdown full-select-dropdown">';
        snmp2html += '<select class="form-btn btn-dropdown-link dropdown-toggle snmp_input w-100" style="height:33px !important;" type="button" onchange="securitylevel()" id="security_level" aria-haspopup="true" aria-expanded="false">';
        snmp2html += '<option selected disabled> Select Security level</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;"  value="noAuthNoPriv">noAuthNoPriv</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;"  value="AuthNoPriv">AuthNoPriv</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;" value="authPriv">authPriv</option>';
        snmp2html += '</select>';
        snmp2html += '<span class="error-msg" id="securitylevel-error-msg"> </span>';
        snmp2html += '</div>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-12 mt-3">';
        snmp2html += '<label for="snmp_models" id="snmpmod-label">Model</label>';
        snmp2html += '<div class="dropdown select-btn-dropdown full-select-dropdown">';
        snmp2html += '<select class="form-btn btn-dropdown-link dropdown-toggle snmp_input w-100" style="height:33px !important;" type="button" id="snmp_models" aria-haspopup="true" aria-expanded="false">';
        snmp2html += '</select>';
        snmp2html += '<span class="error-msg" id="snmpmod-error-msg"> </span>';
        snmp2html += '</div>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-12 mt-3">';
        snmp2html += '<label for="Authentication_mtd" id="authmtd-label">Authentication Method</label>';
        snmp2html += '<div class="dropdown select-btn-dropdown full-select-dropdown">';
        snmp2html += '<select class="form-btn btn-dropdown-link dropdown-toggle snmp_input w-100" style="height:33px !important;" type="button" id="Authentication_mtd" aria-haspopup="true" aria-expanded="false">';
        snmp2html += '<option selected disabled>Select Authentication Method</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;display:none;" value="None">None</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;" value="MD5">MD5</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;" value="SHA">SHA</option>';
        snmp2html += '</select>';
        snmp2html += '<span class="error-msg" id="authmtd-error-msg"> </span>';
        snmp2html += '</div>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-12 my-4 password-group">'
        snmp2html += '<label for="CommunityString"> Authentication Password</label><br>'
        snmp2html += '<input type="password" class="form-control snmp_input full-input" placeholder="Enter Authentication Password" required="" id="auth_password" autocomplete="new-password">'
        snmp2html += '<span class="error-msg" id=""></span>';
        snmp2html += '<div class="d-inline-block icon"><i class="mdi mdi-eye-off-outline toggle-password" id="icon_change" onclick="mypassFunction()"></i></div>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-12 mt-3">';
        snmp2html += '<label for="Privacy_mtd" id="privmtd-label">Privacy Method</label>';
        snmp2html += '<div class="dropdown select-btn-dropdown full-select-dropdown">';
        snmp2html += '<select class="form-btn btn-dropdown-link dropdown-toggle snmp_input w-100" style="height:33px !important;" type="button" id="Privacy_mtd" aria-haspopup="true" aria-expanded="false">';
        snmp2html += '<option selected disabled>Select Privacy Method</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem; display:none;" value="None">None</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;" value="AES128">AES128</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;" value="AES192">AES192</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;" value="AES256">AES256</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;" value="AES">AES</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;" value="3DES">3DES</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;" value="DES56">DES56</option>';
        snmp2html += '<option style="color:#ffffff;font-size:0.875rem;" value="DES">DES</option>';
        snmp2html += '</select>';
        snmp2html += '<span class="error-msg" id="privmtd-error-msg"> </span>';
        snmp2html += '</div>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-12 my-4 password-group">'
        snmp2html += '<label for="CommunityString"> Privacy Password</label><br>'
        snmp2html += '<input type="password" class="form-control snmp_input full-input" placeholder="Enter Privacy Password" required="" id="privacy_password" autocomplete="new-password">'
        snmp2html += '<span class="error-msg" id=""></span>';
        snmp2html += '<div class="d-inline-block icon"><i class="mdi mdi-eye-off-outline toggle-password" id="icons_change" onclick="myprivFunction()"></i></div>';
        snmp2html += '</div>';
        snmp2html += generateThresholdHTML();
        snmp2html += '<br>';
        snmp2html += '<div class="modal-footer mx-auto col-md-11 col-12">';
        snmp2html += '<div class="col-5 px-1">';
        snmp2html += '<button type="button" class="btn btn-outline-secondary cancel-btn w-100" data-dismiss="modal">Cancel</button>';
        snmp2html += '</div>';
        snmp2html += '<div class="col-5 px-1">';
        snmp2html += '<button type="button" class="btn btn-outline-secondary w-100" id="snmbv3cs" onclick="verifiedv3toserver()">Verify</button>';
        //snmp2html += '<button type="button" class="btn btn-outline-secondary w-100" id="snmbv3cs" onclick="sendSnmp3DataToServer()">Add</button>';
        snmp2html += '</div>';
        snmp2html += '<div class="" id="valids_row"></div>';
        snmp2html += '</div>';
    }
    $("#snmpver2c").append(snmp2html);
    //onbtable()
    snmpmodel()
    //snmpselected(select)
}
function resetsnmpValues() {
    var thresholdCheckbox = document.getElementById("thresholds");
    var thresholdFields = document.getElementById("threshold-snmp");
    var thresholdInputs = thresholdFields.getElementsByClassName("form-control");
    if (thresholdCheckbox.checked) {
        for (var i = 0; i < thresholdInputs.length; i++) {
            thresholdInputs[i].value = snmpdefaultValues[i];
        }
    } else {
        for (var i = 0; i < thresholdInputs.length; i++) {
            thresholdInputs[i].value = "";
        }
    }
}
function toggleTextsnmp(checkbox) {
  //  console.log("snmp----->")
    var thresholdFields = document.getElementById("threshold-snmp");
    var table = document.getElementById("table-snmp");
    var tr_icon = document.getElementById("threshold-snmpicon");

    if (checkbox.checked) {
        thresholdFields.style.display = "block";
        table.style.display = "table";
        tr_icon.style.display = "block";
    } else {
        thresholdFields.style.display = "none";
        table.style.display = "none";
        tr_icon.style.display = "none";
    }
}
function securitylevel() {
    var selectedOption = $("#security_level").val();
   // console.log("securitylevel--->" + selectedOption)
    if (selectedOption === "noAuthNoPriv") {
        noAuthNoPriv();
    } else if (selectedOption === "AuthNoPriv") {
        AuthNoPriv();
    }
    else if (selectedOption === "authPriv") {
        authPriv();
    }
}
function noAuthNoPriv() {
  //  console.log("noAuthNoPriv function called");
    $('#Authentication_mtd').val('None');
    $('#Privacy_mtd').val('None');
    $('#auth_password').val('NOVALUE');
    $('#privacy_password').val('NOVALUE');
    $('#Authentication_mtd').prop('disabled', true);
    $('#auth_password').prop('disabled', true);
    $('#Privacy_mtd').prop('disabled', true);
    $('#privacy_password').prop('disabled', true);
}
function AuthNoPriv() {
   // console.log("AuthNoPriv function called");
    $('#Privacy_mtd').val('None');
    $('#privacy_password').val('NOVALUE');
    $('#Authentication_mtd').prop('disabled', false);
    $('#auth_password').prop('disabled', false);
    $('#Privacy_mtd').prop('disabled', true);
    $('#privacy_password').prop('disabled', true);
}
function authPriv() {
   // console.log("authPriv function called");
    $('#Authentication_mtd').prop('disabled', false);
    $('#auth_password').prop('disabled', false);
    $('#Privacy_mtd').prop('disabled', false);
    $('#privacy_password').prop('disabled', false);
}

function verifiedv2ctoserver() {
    var ipLists = $('#snmp-select-ip').val();
    var formsData = $("#snmpformdata").serializeArray();
    var json = {};
    formsData.forEach(function (obj) {
        json[obj.name] = obj.value;
    });
    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    jsonObj["iplists"] = ipLists;
    jsonObj['version'] = $('#CreateSnmp #snmp_version').val();
    jsonObj['models'] = $('#CreateSnmp #snmp_models').val();
    jsonObj['securitylevel'] = $('#CreateSnmp #security_level').val();
    jsonObj['Authentication'] = $('#CreateSnmp #Authentication_mtd').val();
    jsonObj['Privacy'] = $('#CreateSnmp #Privacy_mtd').val();
    jsonObj['auth_password'] = $('#CreateSnmp #auth_password').val();
    jsonObj['privacy_password'] = $('#CreateSnmp #privacy_password').val();
    jsonObj['comm_string'] = $('#CreateSnmp #comm_string').val();
    jsonObj['user_name'] = $('#CreateSnmp #user_name').val();
    requestDataFromServer('/dashboard/snmpvalidation', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csrf_token }, "POST").done(snmpvalid2CreationResponse);
}
function verifiedv3toserver() {
    var ipLists = $('#snmp-select-ip').val();
    var formsData = $("#snmpformdata").serializeArray();
    var json = {};
    formsData.forEach(function (obj) {
        json[obj.name] = obj.value;
    });
    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    jsonObj["iplists"] = ipLists;
    jsonObj['version'] = $('#CreateSnmp #snmp_version').val();
    jsonObj['models'] = $('#CreateSnmp #snmp_models').val();
    jsonObj['securitylevel'] = $('#CreateSnmp #security_level').val();
    jsonObj['Authentication'] = $('#CreateSnmp #Authentication_mtd').val();
    jsonObj['Privacy'] = $('#CreateSnmp #Privacy_mtd').val();
    jsonObj['auth_password'] = $('#CreateSnmp #auth_password').val();
    jsonObj['privacy_password'] = $('#CreateSnmp #privacy_password').val();
    jsonObj['comm_string'] = $('#CreateSnmp #comm_string').val();
    jsonObj['user_name'] = $('#CreateSnmp #user_name').val();
  //  console.log("snmpvalidCreationResponse--->" + JSON.stringify(jsonObj))
    requestDataFromServer('/dashboard/snmpvalidation', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csrf_token }, "POST").done(snmpvalid3CreationResponse);
}
function snmpvalid2CreationResponse(response) {
   // console.log("snmpvalid2CreationResponse--->" + response)
    res = JSON.parse(response)
    $("#valid_row").empty();
    $(".loader").hide();
    if (res.result == true) {
        // Get the button element by its ID
        const btn = document.getElementById('snmbv2cs');
        // Set the new onclick function
        btn.setAttribute('onclick', 'sendSnmp2DataToServer()');
        // Update the button text
        btn.innerText = 'Add';
        var validHtml = '<p class="text-center size12" style="color:#00ff00;">Success in Validation...</p>';
        $("#valid_row").append(validHtml);
        $('#snmp_version').prop('disabled', true);
        $('#snmp_models').prop('disabled', true);
        $('#comm_string').prop('disabled', true);

    }
    else {
        // swal(res.data, ' ', "error");
          $("#snmbv2cs").prop("disabled", true);
       // console.log("snmpvalid2CreationResponse-else-->" + new Date().toLocaleTimeString())
        var validHtml = '<p class="text-center size12" style="color:#ff0000;">Failure in Validation...</p>';
        $("#valid_row").append(validHtml);
        // Hide the validHtml after 3 seconds
        setTimeout(function () {
            $("#valid_row").empty();
            $("#snmbv2cs").prop("disabled", false); // Re-enable the button
        }, 3000);
    }
}

function snmpvalid3CreationResponse(response) {
   // console.log("snmpvalid3CreationResponse--->" + response)
    res = JSON.parse(response)
    $("#valids_row").empty();
    $(".loader").hide();
    if (res.result == true) {
        // Get the button element by its ID
        const btn = document.getElementById('snmbv3cs');
        // Set the new onclick function
        btn.setAttribute('onclick', 'sendSnmp3DataToServer()');
        // Update the button text
        btn.innerText = 'Add';
        var validHtml = '<p class="text-center size12" style="color:#00ff00;">Success in Validation...</p>';
        $("#valids_row").append(validHtml);
        $('#snmp_version').prop('disabled', true);
        $('#user_name').prop('disabled', true);
        $('#security_level').prop('disabled', true);
        $('#snmp_models').prop('disabled', true);
        $('#Authentication_mtd').prop('disabled', true);
        $('#auth_password').prop('disabled', true);
        $('#Privacy_mtd').prop('disabled', true);
        $('#privacy_password').prop('disabled', true);
    }
    else {
        // swal(res.data, ' ', "error");
          $("#snmbv3cs").prop("disabled", true);
        var validHtml = '<p class="text-center size12" style="color:#ff0000;">Failure in Validation...</p>';
        $("#valids_row").append(validHtml);
        // Hide the validHtml after 3 seconds
        setTimeout(function () {
            $("#valids_row").empty();
            $("#snmbv3cs").prop("disabled", false); // Re-enable the button
        }, 3000);
    }
}

function mypasscommFunction() {
    var x = document.getElementById("comm_string");
    if (x.type === "password") {
        $('#icon_change').toggleClass("mdi-eye-outline");
        x.type = "text";
    } else {
        $('#icon_change').toggleClass("mdi-eye-outline");
        x.type = "password";
    }
}
function mypassFunction() {
    var x = document.getElementById("auth_password");
    if (x.type === "password") {
        $('#icon_change').toggleClass("mdi-eye-outline");
        x.type = "text";
    } else {
        $('#icon_change').toggleClass("mdi-eye-outline");
        x.type = "password";
    }
}
function myprivFunction() {
    var x = document.getElementById("privacy_password");
    if (x.type === "password") {
        $('#icons_change').toggleClass("mdi-eye-outline");
        x.type = "text";
    } else {
        $('#icons_change').toggleClass("mdi-eye-outline");
        x.type = "password";
    }
}
/*function snmpmodel() {
    $("#snmp_models").empty();
    var modelhtml = '';
    modelhtml += '<option selected disabled>Select Model</option>';
    requestDataFromServer('/newonb/Switchesmodel', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        snmp_model = JSON.parse(response)
        console.log("snmp_model--->" + JSON.stringify(snmp_model))
        snmp_model.data.forEach(function (obj) {
                // console.log("newonbtable---->" + JSON.stringify(obj))
            modelhtml += '<option style="color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;" value="' + obj.model + '">' + obj.model + '</option>';
        });
        $("#snmp_models").append(modelhtml);
    });
    requestDataFromServer('/newonb/Firewallmodel', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        snmp_models = JSON.parse(response)
        console.log("snmp_models--->" + JSON.stringify(snmp_models))
        snmp_models.data.forEach(function (obj) {
            console.log("newonbtable---->" + JSON.stringify(obj))
            modelhtml += '<option style="color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;" value="' + obj.model + '">' + obj.model + '</option>';
        });
        $("#snmp_models").append(modelhtml);
    });
}*/
function snmpmodel() {
    $("#snmp_models").empty();
    var modelhtml = '<option selected disabled>Select Model</option>';

    $.when(
        requestDataFromServer('/allonboard/Switchesmodel', { csrfmiddlewaretoken: csrf_token }, "GET"),
        requestDataFromServer('/allonboard/Firewallmodel', { csrfmiddlewaretoken: csrf_token }, "GET"),
        requestDataFromServer('/allonboard/Routertypes', { csrfmiddlewaretoken: csrf_token }, "GET")
    )
        .then(function (switchModelResponse, firewallModelResponse, routerTypeResponse) {
            var switchModels = JSON.parse(switchModelResponse[0]);
            var firewallModels = JSON.parse(firewallModelResponse[0]);
            var routerType = JSON.parse(routerTypeResponse[0]);
           // console.log("Switch Models--->" + JSON.stringify(switchModels));
            //console.log("Firewall Models--->" + JSON.stringify(firewallModels));
            modelhtml += buildModelOptionsHtml(switchModels.data);
            modelhtml += buildModelOptionsHtml(firewallModels.data);
            modelhtml += buildModelOptionsHtml(routerType.data);
            $("#snmp_models").append(modelhtml);
        })
        .fail(function (error) {
            console.error(error);
        });
}

function buildModelOptionsHtml(data) {
    var optionsHtml = '';
    data.forEach(function (obj) {
        optionsHtml += '<option style="color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;" value="' + obj.model + '">' + obj.model + '</option>';
    });
    return optionsHtml;
}

/*function onbtable() {
   // console.log("newonbtable---->")
    requestDataFromServer('/newonb/newonbtable', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        newonbtable = JSON.parse(response)
        $("#snmp-select-ip").empty();
        var snmphtml = '';
       // console.log("newonbtable---->" + newonbtable)
        snmphtml += '<option selected disabled>Select IP</option>';
        newonbtable.data.forEach(function (obj) {
            if ((!obj.selecthost.includes("Physical")) && (!obj.selecthost.includes("VM"))) {
               // console.log("newonbtable---->" + JSON.stringify(obj))
                snmphtml += '<option style="color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;" value="' + obj.ipaddress + '">' + obj.ipaddress + '</option>';
            }
        });
        $("#snmp-select-ip").append(snmphtml);
    });
}*/

/*function validateInputs(className) {
    console.log("validateInput--->")
    var isInputFilled = checkAllfeildsfilled(className)
    console.log("value--->" + (document.getElementById("snmp-select-ip").value))
    if (document.getElementById("snmp-select-ip").value == 'Select IP') {
        console.log("value-if-->" + (document.getElementById("snmp-select-ip").value))
        isInputFilled = false;
        document.getElementById('snmpip-error-msg').textContent = "Field cannot be empty";
        document.getElementById('snmpip-label').style.color = "#ff9eac"
    }
    else {
        document.getElementById('snmpip-error-msg').textContent = "";
        // document.getElementById('snmpip-label').style.color = '#404E67'
    }
    if (document.getElementById("snmp_models").value == 'Select Model') {
        isInputFilled = false;
        document.getElementById('snmpmod-error-msg').textContent = "Field cannot be empty";
        document.getElementById('snmpmod-label').style.color = "#ff9eac"
    }
    else {
        document.getElementById('snmpmod-error-msg').textContent = "";
        //document.getElementById('snmpmod-label').style.color = '#404E67'
    }
    return isInputFilled;
}*/
function validateInputs(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    const fields = [
        { id: 'snmp_models', label: 'snmpmod-label', errorMsg: 'snmpmod-error-msg', value: 'Select Model' },
    ];
    let hasErrors = false;
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const el = document.getElementById(field.id);
        if (el.value === field.value) {
            document.getElementById(field.errorMsg).textContent = 'Field cannot be empty';
            document.getElementById(field.label).style.color = '#ff9eac';
            hasErrors = true;
        } else {
            document.getElementById(field.errorMsg).textContent = '';
            // document.getElementById(field.label).style.color = '#404E67';
        }
    }
    return isInputFilled;
    return !hasErrors;
}

function validateingInput(className) {
    var isInputFilled = checkAllfeildsfilled(className)
   // console.log("validateingInput--->" + className)
    const fields = [
        { id: 'security_level', label: 'securitylevel-label', errorMsg: 'securitylevel-error-msg', value: 'Select Security level' },
        { id: 'snmp_models', label: 'snmpmod-label', errorMsg: 'snmpmod-error-msg', value: 'Select Model' },
        { id: 'Authentication_mtd', label: 'authmtd-label', errorMsg: 'authmtd-error-msg', value: 'Select Authentication Method' },
        { id: 'Privacy_mtd', label: 'privmtd-label', errorMsg: 'privmtd-error-msg', value: 'Select Privacy Method' },
    ];
    let hasErrors = false;
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const el = document.getElementById(field.id);
        if (el.value === field.value) {
            document.getElementById(field.errorMsg).textContent = 'Field cannot be empty';
            document.getElementById(field.label).style.color = '#ff9eac';
            hasErrors = true;
        } else {
            document.getElementById(field.errorMsg).textContent = '';
            // document.getElementById(field.label).style.color = '#404E67';
        }
    }
    return isInputFilled;
    return !hasErrors;
}


function sendSnmpDataToServers() {    
    var values = {
        uptime_w: parseFloat($("#uptime_w").val()),
        uptime_c: parseFloat($("#uptime_c").val()),
        uptime_t: parseInt($("#uptime_t").val()),
        temp_w: parseFloat($("#temp_w").val()),
        temp_c: parseFloat($("#temp_c").val()),
        temp_t: parseInt($("#temp_t").val()),
        mem_w: parseFloat($("#mem_w").val()),
        mem_c: parseFloat($("#mem_c").val()),
        mem_t: parseInt($("#mem_t").val()),
        cpu_w: parseFloat($("#cpu_w").val()),
        cpu_c: parseFloat($("#cpu_c").val()),
        cpu_t: parseInt($("#cpu_t").val())
    };
    var ipLists = $('#snmp-select-ip').val();
    // $(".loader").show();
    var formsData = $("#snmpformdata").serializeArray();
  //  console.log("sendSnmpDataTo--->" + JSON.stringify($("#snmpformdata")))
  //  console.log("sendSnmpDataToServer--->" + JSON.stringify(formsData))
    var json = {};
    formsData.forEach(function (obj) {
      //  console.log("sendSnmpDataToServer-1-->" + JSON.stringify(obj))
        json[obj.name] = obj.value;
    });
  //  console.log("sendSnmpDataToServer-json-->" + JSON.stringify(json))
    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    //jsonObj["snmphost"] = json;
    jsonObj["iplists"] = ipLists;
    jsonObj['version'] = $('#CreateSnmp #snmp_version').val();
    jsonObj['models'] = $('#CreateSnmp #snmp_models').val();
    jsonObj['securitylevel'] = $('#CreateSnmp #security_level').val();
    jsonObj['Authentication'] = $('#CreateSnmp #Authentication_mtd').val();
    jsonObj['Privacy'] = $('#CreateSnmp #Privacy_mtd').val();
    jsonObj['auth_password'] = $('#CreateSnmp #auth_password').val();
    jsonObj['privacy_password'] = $('#CreateSnmp #privacy_password').val();
    jsonObj['comm_string'] = $('#CreateSnmp #comm_string').val();
    jsonObj['user_name'] = $('#CreateSnmp #user_name').val();
    jsonObj['threshold'] = values;
    // $('#CreateSnmp #addsnmp').attr('data-dismiss', "modal");
    requestDataFromServer('/dashboard/savedatabase', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csrf_token }, "POST").done(snmpFileCreationResponse);
  //  console.log("sendSnmpDataToServer--->" + JSON.stringify(jsonObj))
}

function snmpFileCreationResponse(response) {
    //  console.log("handleFileCreationResponse--->" + response)
    res = JSON.parse(response)
    $(".loader").hide();
    if (res.status == 200) {
        // console.log("handleFileCreationResponse--->")
        swal({
            title: res.data,
            type: "success",
            confirmButtonClass: "btn-success",
            confirmButtonText: "OK"
        },
            function (isConfirm) {
                if (isConfirm) {
                  //  console.log("hgdcgsdxzjwd--->"+($('#dialog-for-addsnmp #snmbv2cs')))
                    swal(res.data, ' ', "success");
                    $('#dialog-for-addsnmp').modal('hide');
                    $('#snmpModal').modal('hide'); // Hide the modal directly
                    //$('#snmpModal #snmbv2cs').attr('data-dismiss', "modal");
                    //$('#snmpModal #snmbv3cs').attr('data-dismiss', "modal");
                   // parent.window.location.reload(true);
                }
            });

        // swal(res.data, ' ', "success");
        // location.reload();
    }
    else
        swal(res.data, ' ', "error");
}

function getsnmpdata() {
    requestDataFromServer('/dashboard/snmpnewtable', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        snmptable = JSON.parse(response)
        var siteHtml = ''
      //  console.log("getsnmpdata-1-->" + JSON.stringify(snmptable))
        if (snmptable.data != '') {
            snmptable.data.forEach(function (obj) {
              //  console.log("getsnmpdata-1-->" + JSON.stringify(obj))
                siteHtml += '<tr class="collapse-tr" id =' + obj.id + ' style="text-align:center !important;">'
                siteHtml += '<td class="pl-3">' + obj.version + '</td>'
                siteHtml += '<td class="pl-3">' + obj.ipaddress + '</td>'
                siteHtml += '<td class="pl-3">' + obj.model + '</td>'

                siteHtml += '<td class="p-lg-0 px-4 py-1 action-btn">'
                siteHtml += '<button class="btn btn-default btn-ripple accordion-toggle ml-5" data-toggle="collapse" data-target="#snmp-detail-' + obj.id + '" onclick="userInfo(' + obj.id + ')">'
                siteHtml += '<i class="icon-select" style="color: #6c757d"></i>'
                siteHtml += '</button>'

                siteHtml += '<div class="dropdown custom-dropdown mr-3">'
                siteHtml += '<button class="btn btn-default btn-ripple btn-dropdown-link dropdown-toggle icon-dropdown" type="button" id="moreoption" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                siteHtml += '<i class="mdi mdi-delete" onclick="onDeleteSnmp(' + obj.id + ')" style="color: #6c757d"></i>'
                siteHtml += '</button>'
                // siteHtml += '<div class="dropdown-menu" aria-labelledby="moreoption">'
                // siteHtml += '<a class="dropdown-item" onclick="onDeleteSnmp(' + obj.id + ')"><i class="icon-delete"></i>Delete</a>'
                // siteHtml += '<a class="dropdown-item" onclick="onUpdateSite(\'' + obj.id + '\')\" data-toggle="modal" data-target="#dialog-for-addsite"><i class="icon-edit2"></i>Edit</a>'
                // siteHtml += '</div>'
                siteHtml += '</div>'
                siteHtml += '</td>'
                siteHtml += '<tr class="border-0 collapse-content">'
                siteHtml += '<td colspan="12" class="hiddenRow border-0">'
                siteHtml += '<div class="accordian-body collapse col-12 border-b" id="snmp-detail-' + obj.id + '">'

                siteHtml += '<table id="">'
                siteHtml += '<thead class="table-head">'
                siteHtml += '<tr class="text-uppercase size12 bold-text">'
                siteHtml += '<td class="pl-0">username</td>'
                siteHtml += '<td class="pl-0">comm_string</td>'
                siteHtml += '<td class="pl-0">security level</td>'
                siteHtml += '<td class="pl-0">auth method</td>'
                siteHtml += '<td class="pl-0">auth password</td>'
                siteHtml += '<td class="pl-0">priv method</td>'
                siteHtml += '<td class="pl-0">priv password</td>'
                siteHtml += '<td></td>'
                siteHtml += '</tr>'
                siteHtml += '</thead>'
                siteHtml += '<tbody class="accordion" id="">'
                siteHtml += '<tr data-toggle="collapse" data-target="#user-detail" class="accordion-toggle cursor-pointer" style="text-align:center !important;" id="1">'
                siteHtml += '<td class="pl-0">' + ((obj.username).replaceAll("NOVALUE", " --")) + '</td>'
                siteHtml += '<td class="pl-0">' + ((obj.comm_string).replaceAll("NOVALUE", " --")) + '</td>'
                siteHtml += '<td class="pl-0">' + ((obj.sec_level).replaceAll("NOVALUE", " --")) + '</td>'
                siteHtml += '<td class="pl-0">' + ((obj.auth_method).replaceAll("NOVALUE", " --")) + '</td>'
                siteHtml += '<td class="pl-0" style="-webkit-text-security: square;">' + ((obj.auth_password).replaceAll("NOVALUE", "--")) + '</td>'
                siteHtml += '<td class="pl-0">' + ((obj.priv_method).replaceAll("NOVALUE", " --")) + '</td>'
                siteHtml += '<td class="pl-0" style="-webkit-text-security: square;">' + ((obj.priv_password).replaceAll("NOVALUE", "--")) + '</td>'
                siteHtml += '<td></td>'
                siteHtml += '</tr>'
                siteHtml += '</tbody>'
                siteHtml += '</table>'

                siteHtml += '</div>'
                siteHtml += '</td>'
                siteHtml += '<tr></tr>' //this is for alternative color(dummy tr)
                siteHtml += '</tr>'
            });
        }
        else {
            siteHtml += '<p class="text-center size12" style="margin-left:95% !important;margin-top:15% !important;">No SNMP Data Available...</p>';
        }
        $("#snmp_table #data tbody").append(siteHtml);
    });
    
}

function onDeleteSnmp(button) {
    var id = $(button).data('id');
   // console.log("hefydhcjx---->" + id)
   // console.log("hefydhcjx-edfs--->" + JSON.stringify(id))
    data = {};
    requestData = {};
    data["rowid"] = id;
    requestData['data'] = data;
    swal({
        title: "Delete SNMP",
        text: "Want to permanently delete this snmp?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete",
        closeOnConfirm: false
    },
        function () {
            requestDataFromServer('/dashboard/deleteactions', { 'data': JSON.stringify(requestData), csrfmiddlewaretoken: csrf_token }, "POST").done(function (response) {
               // console.log("ondeletesnmp-->" + (response))
                deltable = JSON.parse(response)
                $('#dialog-for-addsnmp #cancelbtn').trigger('click');
                if (deltable && deltable.status == 200) {
                    rowid = deltable.rowid;
                    $("#snmp_table #" + rowid).remove();
                    swal(deltable.msg, ' ', "success");
                    location.reload();
                }
                else {
                    swal(deltable.msg, ' ', "error");
                }
            });
        });
}


//==========================================================================================
