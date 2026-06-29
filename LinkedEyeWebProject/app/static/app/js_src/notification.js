var jsonObj = {}
var selectedService = ' ';
let currentEditPolicyId = null;  // Global variable to store the policy being edited
let currentLevel = 1;
let currentInfoLevel = 1;

$(document).ready(function()
{
    $('.notification_input_effect').focusout(function (e) {
        if ($(this).val() == '') {
            $(this).parent().find("label").css('color','#ff9eac');
            $(this).parent().find(".error-msg").text('Field cannot be empty');
        }
        else {
           // $(this).parent().find("label").css('color','#404E67');
            $(this).parent().find(".error-msg").text('');
        }
    });
    $("#fullsyntax").focus(function () {
        $('#fullsyntax').val($('#syntax').val())
	});
    $("#syntax").focusout(function () {
        $('#fullsyntax').val($('#syntax').val())
        if ($(this).val().startsWith("https")) {
            $(this).parent().find("label").css('color','#ff9eac');
            $(this).parent().find(".error-msg").text('\'https\' Protocol not supported');
        }
	});
    $("#fullsyntax").focusout(function () {
        if ($(this).val().startsWith("https")) {
            $(this).parent().find("label").css('color','#ff9eac');
            $(this).parent().find(".error-msg").text('\'https\' Protocol not supported');
        }
	});
    getAllservice()
    // Escalation data is loaded directly into the table
    loadEscalationData();
});
function getAllservice()
{
    requestDataFromServer('/notification/getallservices', {}, "GET").done(getAllserviceResponse);
}
function getAllserviceResponse(response)
{
    res = JSON.parse(response);
    if(res.status == 200  && res.data.length)
    {
        $("#notificationtemplate #table-view").show();
        $("#notificationtemplate-nodata").hide()
        res.data.forEach(function(obj)
        {
            addNotificationService(obj)
        }); 
    }
    else
    {
        $("#notificationtemplate #table-view").hide();
        $("#notificationtemplate-nodata").show()
        $("#notificationtemplate-nodata #tryagainbtn").prop('disabled', false);
        $("#notificationtemplate-nodata #nodatamessage").text(res.msg);
    }
}
function addNotificationService(obj)
{
    //console.log("notificationtemplate-nodata---->" + JSON.stringify(obj))
    if($("#notificationtemplate #table-view").css('display') == 'none')
    {
        $("#notificationtemplate #table-view").show();
        $("#notificationtemplate-nodata").hide()
    }
    serviceHtml  = ' ';
    serviceHtml += '<tr data-toggle="collapse" data-target="#user-detail" class="accordion-toggle cursor-pointer" id ='+obj.id+'>'
    serviceHtml += '<td class="px-3 py-1 profile-td">'
    if(obj.is_defaultservice)
        serviceHtml += '<div class="profile green-bg text-white"> <span class="size12 bold-text">D</span> </div>'
    serviceHtml += '</td>'
    serviceHtml += '<td class="pl-0">'+obj.name+'</td>'
    serviceHtml += '<td>'+obj.messageformat+'</td>'
    serviceHtml += '<td id="'+obj.id+'-syntax">'+obj.syntax+'</td>'
    serviceHtml += '<td id="'+obj.id+'-delimiter" >'+obj.delimiter+'</td>'
    serviceHtml += '<td class="p-0 action-btn" >'
    serviceHtml += '<div class="dropdown custom-dropdown mr-3" >'
    serviceHtml += '<button class="btn btn-default btn-ripple btn-dropdown-link dropdown-toggle icon-dropdown" type="button" id="moreoption" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > <i class="icon-more_option" style="color:#6c757d"></i> </button>'
    serviceHtml +=  '<div class="dropdown-menu" aria-labelledby="moreoption">'
    serviceHtml +=         '<a class="dropdown-item" onclick="onDelete(\''+obj.id+'\')"><i class="icon-delete2"></i>Delete</a>' 
    serviceHtml +=         '<a class="dropdown-item" onclick="onUpdate({\'syntax\':\''+obj.syntax+'\',\'id\':\''+obj.id+'\',\'delimiter\':\''+obj.delimiter+'\'})\" data-toggle="modal" data-target="#dialog-for-editservice" ><i class="icon-edit2"></i>Edit</a> </div>'
    serviceHtml +=     '</div>'
    serviceHtml += '</td>'
    serviceHtml += '</tr>'
    $("#notificationtemplate #data tbody").append(serviceHtml);
}
function onUpdate(obj)
{
    jsonObj = {};
    data = {};
    data["operation"] = 'update'
    data['syntax'] = obj['syntax']
    data['delimiter'] = obj['delimiter']
    data['id'] = obj['id']
    var id = ''
    id = obj['id']+'-syntax'
    document.getElementById('edit_syntax').value = $('#notificationtemplate #'+id).text().trim()
    id = obj['id']+'-delimiter'
    document.getElementById('edit_delimiter').value = $('#notificationtemplate #'+id).text().trim()
    $('#dialog-for-editservice #updatebtn').attr('data-dismiss'," ");
    $('.edit-input').each(function (e)
    {
		//$(this).parent().find("label").css('color','#404E67');
		$(this).parent().find(".error-msg").text(' ');
    });
}
function updateService()
{
    if($("#edit_syntax").val() == '' && $("#edit_delimiter").val() == '' )
    {
        return false;
    }
    else
    {
        if($("#edit_syntax").val().startsWith("https"))
        {
            document.getElementById('edit_syntax-error-msg').innerHTML = "\'https\' Protocol not supported";
            document.getElementById('edit_syntax-label').style.color =  "#ff9eac"
        }
        else
        {
            data['delimiter'] = $("#edit_delimiter").val();
            data['syntax'] = $("#edit_syntax").val().trim()
            jsonObj['data'] = data;
            $('#dialog-for-editservice #updatebtn').attr('data-dismiss',"modal");  
            requestDataFromServer('/notificationsettings/serviceoperation', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(serviceResponse);
        }  
    }
}
function onDelete(id)
{
	data = {};
	data["operation"] = 'delete'
	data["id"] = id;
	jsonObj["data"] = data;
	swal({
		title: "Delete Service",
		text: "Want to permanently delete this service?",
		type: "warning",
		showCancelButton: true,
		confirmButtonClass: "btn-danger",
		confirmButtonText: "Yes, delete",
		closeOnConfirm: false
	},
	function(){
		requestDataFromServer('/notificationsettings/serviceoperation', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(serviceResponse);
	});
}
function addService()
{
    data = {};
    jsonObj = {};
    var isInputFilled = checkInputs('notification_input_effect');
    if(isInputFilled)
    {
        data["operation"] = 'add';
	data["name"] = $('#dialog-for-addservice #servicename').val()
	//data["name"] = $('#servicename').val()
        data["syntax"] = $('#syntax').val()
        data["delimiter"] = ($('#delimiter') && $('#delimiter').val()== '') ? '' : $('#delimiter').val() 
        if(document.getElementById("isinputrequired").checked)
        {
            data["syntax"] = document.getElementById('fullsyntax').value
            data["is_inputRequired"] = true
        }
        else
        {
            data["syntax"] = $('#syntax').val()
            data["is_inputRequired"] = false
        }
        if(document.getElementById("isdefaultservice").checked)
            data["is_defaultservice"] = true
        else
            data["is_defaultservice"] = false 
        data["messageformat"] = document.getElementById("selectedformat").textContent
        jsonObj["data"] = data;
        $('#dialog-for-addservice #addbtn').attr('data-dismiss',"modal");
        requestDataFromServer('/notificationsettings/serviceoperation', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(serviceResponse);
    }
}
function serviceResponse(response)
{
    data = jsonObj["data"]
    if(response && response.status == 200)
    {
        swal(response.msg, ' ', "success");
        if(data["operation"]=='delete')
        {
            var id = response.id;
            $("#notificationtemplate #"+id).remove();
        }
        else if(data["operation"]=='add')
        {
            data['id'] = response.id;
            addNotificationService(data)
        }
        else if(data["operation"]=='update')
        {
            id = response.id+'-syntax'
            $('#notificationtemplate #'+id).text(data["syntax"])
            id = response.id+'-delimiter'
            $('#notificationtemplate #'+id).text(data["delimiter"]) 
        }
    }
    else
    {
        swal(response.msg, ' ', "error");
		return;	
    }
}
function checkInputs(className)
{
    var isInputFilled = true;
    $('.'+className).each(function (e)
    {
        var id = $(this).attr('id') 
        if(id != 'fullsyntax')
        {
            if ($(this).val().trim() == '' || $(this).val().trim() == null)
            {
                $(this).parent().find("label").css('color','#ff9eac');
                $(this).parent().find(".error-msg").text('Field cannot be empty');
                isInputFilled = false;
            }
            else
            {
                //$(this).parent().find("label").css('color','#404E67');
                $(this).parent().find(".error-msg").text(' ');
                if(id == 'syntax' && $('#syntax').val().startsWith("https"))
                {
                    isInputFilled = false;
                    $(this).parent().find("label").css('color','#ff9eac')
                    $(this).parent().find(".error-msg").text('\'https\' Protocol not supported');
                }
            }
        }
    });
    var extraelement = document.getElementById('extrainputfield').style.display
    if(extraelement == 'block')
    {
        if($('#fullsyntax').val() == '')
            isInputFilled = false;
        else if($('#fullsyntax').val().startsWith("https"))
        {
            isInputFilled = false;
            document.getElementById('fullsyntax-error-msg').innerHTML = "\'https\' Protocol not supported";
            document.getElementById('fullsyntax_label').style.color =  "#ff9eac"
        }
    }
    if(document.getElementById("selectedformat").textContent == 'Select Message Format')
    {
        isInputFilled = false;
        document.getElementById('selectedformat-error-msg').innerHTML = "Field cannot be empty";
        document.getElementById('selectedformat-label').style.color =  "#ff9eac"
    }
    else
    {
        document.getElementById('selectedformat-error-msg').innerHTML = "";
        //document.getElementById('selectedformat-label').style.color = '#404E67'
    }
    return isInputFilled;
}
function isInputRequired(checkbox)
{
	if(checkbox.checked  == true)
	{
        document.getElementById('extrainputfield').style.display = "block";
        document.getElementById('fullsyntax').value = $('#syntax').val()
	}
	else
	{
        document.getElementById('extrainputfield').style.display = "none";
        document.getElementById('fullsyntax').value = ' ';
	}
}
function openAddserviceModal()
{
    $('.notification_input_effect').each(function (e)
    {
        id = $(this).attr('id')
        document.getElementById(id).value = '' 
		//$(this).parent().find("label").css('color','#404E67');
		$(this).parent().find(".error-msg").text(' ');
    }); 
    document.getElementById('delimiter').value = ''
    document.getElementById("isinputrequired").checked = false;
    document.getElementById('extrainputfield').style.display = "none";
    $('#dialog-for-addservice #addbtn').attr('data-dismiss'," ");
}
function reloadServices()
{
    getAllservice()  
}
function onFormatSelect(servicename)
{
    document.getElementById("selectedformat").textContent = servicename
    document.getElementById('selectedformat-error-msg').innerHTML = "";
    //document.getElementById('selectedformat-label').style.color = '#404E67'
}

/* -------- =========== Escalation Mails ============= ------------ */

/* ================================================================
   STATE
   ================================================================ */
var escalState = {
    category: null,       // 'BOD' | 'APM' | 'EOD' | 'Device'
    deviceType: null,     // 'Server' | 'Switch' | 'Firewall' | 'Router'
    selectedIp: null,
    selectedFname: null,
    alertCategory: null,
    isDeviceMode: false,
};

/* ================================================================
   STEP NAVIGATION
   ================================================================ */
/* ================================================================
   SINGLE-PAGE DYNAMIC ESCALATION MODAL LOGIC
   ================================================================ */

function onCategoryChange(val) {
    const isGlobal = ['BOD', 'APM', 'EOD'].includes(val);
    const isDevice = (val === 'Device');

    document.getElementById('escal-modal-category-val').value = isDevice ? '' : val;
    document.getElementById('escal-category-error').textContent = '';

    // If Device is selected, show dynamic sections
    if (isDevice) {
        document.getElementById('dynamic-device-sections').style.display = 'block';
        document.getElementById('dynamic-dtype-section').style.display = 'flex';
        // Reset device selections
        document.querySelectorAll('.dynamic-dtype-cb').forEach(cb => cb.checked = false);
        document.getElementById('dynamic-ip-section').style.display = 'none';
        document.getElementById('dynamic-alert-section').style.display = 'none';
        document.getElementById('dynamic-ip-list').innerHTML = '';
        document.getElementById('dynamic-alert-list').innerHTML = '';
    } else {
        document.getElementById('dynamic-device-sections').style.display = 'none';
    }
}

function onDynamicDtypeChange() {
    const checkedDtypes = [];
    document.querySelectorAll('.dynamic-dtype-cb:checked').forEach(cb => {
        checkedDtypes.push(cb.value);
    });

    const ipSection = document.getElementById('dynamic-ip-section');
    const ipList = document.getElementById('dynamic-ip-list');
    
    // Clear downstream selections
    document.getElementById('dynamic-alert-section').style.display = 'none';
    document.getElementById('dynamic-alert-list').innerHTML = '';
    document.getElementById('escal-modal-device-type').value = '';
    document.getElementById('escal-modal-device-ip').value = '';

    if (checkedDtypes.length === 0) {
        ipSection.style.display = 'none';
        return;
    }

    ipSection.style.display = 'flex';
    ipList.innerHTML = '<span class="grey-text">Loading IPs...</span>';

    // Fetch IPs for all selected types
    const promises = checkedDtypes.map(dtype => 
        fetch('/notification/get_devices_by_type?device_type=' + encodeURIComponent(dtype))
            .then(r => r.json())
            .then(resp => (resp.status === 200 && resp.data) ? resp.data.map(d => ({...d, _dtype: dtype})) : [])
    );

    Promise.all(promises).then(results => {
        const allDevs = [].concat.apply([], results);
        // Deduplicate
        const seen = {};
        const uniqueDevs = allDevs.filter(d => {
            if (seen[d.ip]) return false;
            seen[d.ip] = true; return true;
        });

        ipList.innerHTML = '';
        if (uniqueDevs.length === 0) {
            ipList.innerHTML = '<span class="text-warning size12 ml-2 mt-1"><i class="mdi mdi-alert-circle-outline"></i> No devices found.</span>';
            return;
        }
        
        ipList.innerHTML = '<div class="row w-100 mx-0"></div>';
        const row = ipList.querySelector('.row');
        uniqueDevs.forEach(dev => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-lg-3 mb-2 px-1';
            const lbl = document.createElement('label');
            lbl.className = 'form-check-label d-flex align-items-center w-100 m-0';
            lbl.style.cursor = 'pointer';
            const safeFname = (dev.friendly_name || dev.ip || '').replace(/'/g, "\\'");
            lbl.innerHTML = `
                <input type="checkbox" class="mr-2 dynamic-ip-cb flex-shrink-0" value="${dev.ip}" data-fname="${safeFname}" data-dtype="${dev._dtype}" onchange="onDynamicIpChange()" style="margin-top: 2px;">
                <span class="text-truncate" title="${dev.friendly_name || dev.ip}">${dev.friendly_name || dev.ip} <span class="text-white-50" style="font-size:10px;">(${dev.ip})</span></span>
            `;
            col.appendChild(lbl);
            row.appendChild(col);
        });
    }).catch(() => {
        ipList.innerHTML = '<span class="grey-text text-danger"><i class="mdi mdi-alert"></i> Failed to load IPs.</span>';
    });
}

function onDynamicIpChange() {
    const checkedIps = [];
    let primaryDtype = '';
    document.querySelectorAll('.dynamic-ip-cb:checked').forEach((cb, idx) => {
        if (idx === 0) primaryDtype = cb.getAttribute('data-dtype');
        checkedIps.push({ ip: cb.value, fname: cb.getAttribute('data-fname') });
    });

    const alertSection = document.getElementById('dynamic-alert-section');
    const alertList = document.getElementById('dynamic-alert-list');

    if (checkedIps.length === 0) {
        alertSection.style.display = 'none';
        document.getElementById('escal-modal-device-type').value = '';
        document.getElementById('escal-modal-device-ip').value = '';
        document.getElementById('escal-modal-device-fname').value = '';
        return;
    }

    // Set hidden fields
    document.getElementById('escal-modal-device-type').value = primaryDtype;
    document.getElementById('escal-modal-device-ip').value = checkedIps.map(d => d.ip).join(',');
    document.getElementById('escal-modal-device-fname').value = checkedIps[0].fname;

    alertSection.style.display = 'flex';
    alertList.innerHTML = '<span class="grey-text">Loading alerts...</span>';

    fetch('/notification/get_device_alert_categories?device_type=' + encodeURIComponent(primaryDtype))
        .then(r => r.json())
        .then(resp => {
            alertList.innerHTML = '';
            const cats = resp.categories || [];
            if (cats.length === 0) {
                alertList.innerHTML = '<span class="grey-text">No alert categories available.</span>';
                return;
            }
            cats.forEach(cat => {
                const lbl = document.createElement('label');
                lbl.className = 'form-check-label mr-4 mb-1';
                lbl.style.cursor = 'pointer';
                lbl.innerHTML = `
                    <input type="checkbox" class="mr-1 dynamic-alert-cb" value="${cat}" onchange="onDynamicAlertChange()">
                    ${cat}
                `;
                alertList.appendChild(lbl);
            });
        }).catch(() => {
            alertList.innerHTML = '<span class="grey-text text-danger"><i class="mdi mdi-alert"></i> Failed to load alerts.</span>';
        });
}

function onDynamicAlertChange() {
    const checkedAlerts = [];
    document.querySelectorAll('.dynamic-alert-cb:checked').forEach(cb => {
        checkedAlerts.push(cb.value);
    });
    document.getElementById('escal-modal-category-val').value = checkedAlerts.join(',');
}

/* ================================================================
   GLOBAL POLICY TABLE (BOD / APM / EOD)
   ================================================================ */
function _showGlobalPolicyTable(cat) {
    document.getElementById('escal-global-table-wrap').style.display = '';
    document.getElementById('escal-device-table-wrap').style.display = 'none';
    loadEscalationData(cat);
}


function loadEscalationData(filterCat) {
    fetch('/notification/get_escalation_policies')
        .then(r => r.json())
        .then(function(data) {
            const tbody = document.getElementById('escaladataval');
            const noDataRow = document.getElementById('escal-no-data-row');
            tbody.innerHTML = '';
            let rows = data.data || [];
            if (filterCat) {
                rows = rows.filter(function(p) {
                    return p.categories && p.categories.toLowerCase() === filterCat.toLowerCase();
                });
            }
            if (!rows.length) {
                // Keep headers visible, just show a no-data row
                tbody.innerHTML = `<tr id="escal-no-data-row">
                    <td colspan="10" class="text-center grey-text size12 py-4">
                        <i class="icon-error mr-2"></i>No escalation policy data available.
                        <button class="btn text-btn add ml-3" onclick="loadEscalationData()"><i class="icon-refresh"></i> Try again</button>
                    </td>
                </tr>`;
                return;
            }

            const fmt = function(emails) {
                try {
                    if (!emails) return '';
                    const parsed = Array.isArray(emails) ? emails : JSON.parse(emails);
                    return parsed.join('<br>');
                } catch(e) { return emails || ''; }
            };

            rows.forEach(function(policy) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="pl-3" style="width: 40px;">
                        <input type="checkbox" class="global-escal-cb" value="${policy.policy_id}" onchange="checkGlobalEscalSelection()" style="cursor: pointer;">
                    </td>
                    <td>
                        ${policy.device_friendly_name ? `<div>${policy.device_friendly_name}</div><div style="font-size:10px;color:#aaa;">${policy.device_ip || ''}</div>` : '--'}
                    </td>
                    <td>${policy.subject_category || '--'}</td>
                    <td>${policy.categories}</td>
                    <td>${fmt(policy.escalation_mails)}</td>
                    <td>${fmt(policy.info_mails)}</td>
                    <td>${policy.escalation_required}</td>
                    <td>${policy.approval_time}</td>
                    <td>${policy.resolution_time}</td>
                    <td class="p-lg-0 px-4 py-1 action-btn">
                        <div class="dropdown custom-dropdown mr-3">
                            <button class="btn btn-default btn-ripple btn-dropdown-link dropdown-toggle icon-dropdown" type="button" data-toggle="dropdown">
                                <i class="icon-more_option" style="color:#6c757d"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" onclick="onEditpolicy(${policy.policy_id})" data-toggle="modal" data-target="#dialog-for-addescl"><i class="icon-edit2"></i>Edit</a>
                                <a class="dropdown-item" onclick="onDeletepolicy(${policy.policy_id})"><i class="icon-delete"></i>Delete</a>
                            </div>
                        </div>
                    </td>`;
                tbody.appendChild(tr);
            });
        })
        .catch(function(err) {
            console.error('loadEscalationData error', err);
            const tbody = document.getElementById('escaladataval');
            if (tbody) {
                tbody.innerHTML = `<tr id="escal-no-data-row">
                    <td colspan="10" class="text-center grey-text size12 py-4">
                        <i class="icon-error mr-2"></i>Could not load data. Please try again.
                        <button class="btn text-btn add ml-3" onclick="loadEscalationData()"><i class="icon-refresh"></i> Try again</button>
                    </td>
                </tr>`;
            }
        });
}

/* ================================================================
   DEVICE-WISE POLICY TABLE
   ================================================================ */
function _showDevicePolicyTable(ip, cat) {
    document.getElementById('escal-device-table-wrap').style.display = '';
    document.getElementById('escal-global-table-wrap').style.display = 'none';
    document.getElementById('escaladata-nodata').style.display = 'none';
    _loadDevicePolicies(ip, cat);
}

function _loadDevicePolicies(ip, cat) {
    const tbody = document.getElementById('escal-device-dataval');
    const noData = document.getElementById('escaladata-nodata');
    tbody.innerHTML = '<tr><td colspan="10" class="text-center grey-text size12 py-3">Loading…</td></tr>';

    fetch('/notification/get_device_alert_policies?device_ip=' + encodeURIComponent(ip))
        .then(r => r.json())
        .then(function(resp) {
            tbody.innerHTML = '';
            let rows = (resp.data || []).filter(function(p) {
                return p.alert_category === cat;
            });

            if (!rows.length) {
                noData.style.display = 'flex';
                document.getElementById('noescdatamessage').innerHTML =
                    '<div class="text-center w-100 py-4"><div class="h5">No device policy configured yet.</div><div class="text-muted">Click "Add Policy" to set one up.</div></div>';
                document.getElementById('escal-device-table-wrap').style.display = 'none';
                return;
            }

            noData.style.display = 'none';
            document.getElementById('escal-device-table-wrap').style.display = '';

            const fmt = function(emails) {
                try {
                    const parsed = Array.isArray(emails) ? emails : JSON.parse(emails);
                    return parsed.join('<br>');
                } catch (e) { return emails; }
            };

            rows.forEach(function(p) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="pl-3">${p.device_type || '--'}</td>
                    <td>${p.device_ip || '--'}</td>
                    <td>${p.device_friendly_name || '--'}</td>
                    <td>${p.subject_category || '--'}</td>
                    <td>${p.alert_category || '--'}</td>
                    <td>${fmt(p.escalation_mails)}</td>
                    <td>${fmt(p.info_mails)}</td>
                    <td>${p.escalation_required}</td>
                    <td>${p.approval_time}</td>
                    <td>${p.resolution_time}</td>
                    <td class="p-lg-0 px-4 py-1 action-btn">
                        <div class="dropdown custom-dropdown mr-3">
                            <button class="btn btn-default btn-ripple btn-dropdown-link dropdown-toggle icon-dropdown" type="button" data-toggle="dropdown">
                                <i class="icon-more_option" style="color:#6c757d"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" onclick="dpOpenEditModal(${p.id})" data-toggle="modal" data-target="#dialog-for-device-policy"><i class="icon-edit2"></i>Edit</a>
                                <a class="dropdown-item" onclick="dpDeletePolicy(${p.id})"><i class="icon-delete"></i>Delete</a>
                            </div>
                        </div>
                    </td>`;
                tbody.appendChild(tr);
            });
        })
        .catch(function(err) {
            console.error('_loadDevicePolicies error', err);
            tbody.innerHTML = '<tr><td colspan="9" class="text-center text-danger size12 py-3">Failed to load policies.</td></tr>';
        });
}

/* ================================================================
   GLOBAL POLICY MODAL (BOD / APM / EOD) — existing logic preserved
   ================================================================ */
/* ================================================================
   ESCALATION MODAL WIZARD LOGIC
   ================================================================ */
// Reset modal on open
$(document).ready(function() {
    $('#dialog-for-addescl').on('show.bs.modal', function () {
        if (!currentEditPolicyId) {
            _resetSinglePageModal();
        }
    });
});

function onAddPolicy() {
    currentEditPolicyId = null;
    document.getElementById('escal-modal-title').textContent = 'Add Escalation Notification Setup';
    document.getElementById('addescalbtn').textContent = 'Add';
    _resetSinglePageModal();
}

function _resetSinglePageModal() {
    // Hidden fields
    document.getElementById('escal-modal-device-type').value = '';
    document.getElementById('escal-modal-device-ip').value = '';
    document.getElementById('escal-modal-device-fname').value = '';
    document.getElementById('escal-modal-category-val').value = '';
    
    // Category Select
    const catSel = document.getElementById('escal-category-select');
    if (catSel) catSel.value = '';
    document.getElementById('escal-category-error').textContent = '';
    
    // Hide dynamic sections
    const dynSec = document.getElementById('dynamic-device-sections');
    if (dynSec) dynSec.style.display = 'none';
    
    // Uncheck device type checkboxes
    document.querySelectorAll('.dynamic-dtype-cb').forEach(cb => cb.checked = false);
    
    // Form fields
    document.getElementById('apptimemodal').value = '';
    document.getElementById('resotime').value = '';
    document.getElementById('escalation_required').checked = true;
    document.getElementById('escalation_label').textContent = 'Escalation Enabled';
    
    // Email fields
    currentLevel = 1;
    currentInfoLevel = 1;
    renderFields();
    renderInfoFields();
}


function renderEmailFields(type, level, containerId, levelBoxId, inputPrefix, labelPrefix) {
    const fieldsContainer = document.getElementById(containerId);
    const levelBox = document.getElementById(levelBoxId);
    const existingValues = {};
    for (let i = 1; i <= level; i++) {
        const input = document.getElementById(`${inputPrefix}${i}`);
        if (input) existingValues[i] = input.value;
    }
    levelBox.textContent = level;
    fieldsContainer.innerHTML = '';
    if (level === 0) return;
    for (let i = 1; i <= level; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mb-3';
        const label = document.createElement('label');
        label.setAttribute('for', `${inputPrefix}${i}`);
        label.innerText = `${labelPrefix} Level ${i} Email`;
        label.className = 'form-label text-white';
        const input = document.createElement('input');
        input.type = 'email';
        input.className = 'form-control full-input escala_input';
        input.id = `${inputPrefix}${i}`;
        input.placeholder = `Enter email for ${labelPrefix.toLowerCase()} level ${i}`;
        input.name = `${inputPrefix}${i}`;
        input.required = true;
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-msg';
        errorSpan.id = `${inputPrefix}${i}_error`;
        if (existingValues[i]) input.value = existingValues[i];
        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(errorSpan);
        fieldsContainer.appendChild(wrapper);
    }
}

function renderFields() { renderEmailFields('escalation', currentLevel, 'escalationFields', 'levelBox', 'escalationMail', 'Escalation'); }
function renderInfoFields() { renderEmailFields('info', currentInfoLevel, 'infoFields', 'infoLevelBox', 'infoMail', 'Info'); }
function increaseLevel() { currentLevel++; renderFields(); }
function decreaseLevel() { if (currentLevel > 0) currentLevel--; renderFields(); }
function increaseInfoLevel() { currentInfoLevel++; renderInfoFields(); }
function decreaseInfoLevel() { if (currentInfoLevel > 0) currentInfoLevel--; renderInfoFields(); }

function clearErrors() {
    document.querySelectorAll('.escala_input').forEach(function(input) { input.classList.remove('is-invalid'); });
    document.querySelectorAll('.error-msg').forEach(function(span) { span.textContent = ''; });
}

function getEmails(level, prefix) {
    const emails = [];
    for (let i = 1; i <= level; i++) {
        const input = document.getElementById(`${prefix}${i}`);
        if (input && input.value) emails.push(input.value.trim());
    }
    return emails;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escalmailcon() {
    clearErrors();
    // Validate category
    const catSel = document.getElementById('escal-category-select');
    const category = catSel ? catSel.value.trim() : document.getElementById('escal-modal-category-val').value.trim();
    if (!category) {
        var catErr = document.getElementById('escal-category-error');
        if (catErr) catErr.textContent = 'Please select a category.';
        if (catSel) catSel.classList.add('is-invalid');
        return;
    }
    if (category.toLowerCase() !== 'device') {
        document.getElementById('escal-modal-category-val').value = category;
    }

    const inputs = document.querySelectorAll('#dialog-for-addescl .escala_input');
    let valid = true;
    inputs.forEach(function(input) {
        if (input.tagName === 'SELECT') return; // already validated above
        const value = input.value.trim();
        const errorSpan = document.getElementById(`${input.id}_error`);
        if (!value) {
            input.classList.add('is-invalid');
            if (errorSpan) errorSpan.textContent = 'This field cannot be empty.';
            valid = false;
        } else if (input.type === 'email' && !validateEmail(value)) {
            input.classList.add('is-invalid');
            if (errorSpan) errorSpan.textContent = 'Invalid email address.';
            valid = false;
        }
    });
    if (!valid) return;
    const escalation_mails = getEmails(currentLevel, 'escalationMail');
    const info_mails = getEmails(currentInfoLevel, 'infoMail');
    
    if (category.toLowerCase() === 'device') {
        const formData = {
            id: currentEditPolicyId || null,
            subject_category: category,
            escalation_required: document.getElementById('escalation_required').checked ? 1 : 0,
            escalation_mails: escalation_mails,
            info_mails: info_mails,
            alert_category: document.getElementById('escal-modal-category-val').value.trim() || category,
            approval_time: document.getElementById('apptimemodal').value.trim(),
            resolution_time: document.getElementById('resotime').value.trim(),
            device_type: document.getElementById('escal-modal-device-type').value.trim(),
            device_ip: document.getElementById('escal-modal-device-ip').value.trim(),
            device_friendly_name: document.getElementById('escal-modal-device-fname').value.trim()
        };
        fetch('/notification/save_device_alert_policy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csfr_token },
            body: JSON.stringify(formData)
        }).then(r => r.json()).then(Responseescala).catch(function(err) { console.error('escalmailcon error', err); });
    } else {
        const formData = {
            policyid: currentEditPolicyId || null,
            subject_category: category,
            categories: category,
            escalation_mails: escalation_mails,
            info_mails: info_mails,
            escalation_required: document.getElementById('escalation_required').checked ? 1 : 0,
            approval_time: document.getElementById('apptimemodal').value.trim(),
            resolution_time: document.getElementById('resotime').value.trim()
        };
        fetch('/notification/escalapolicy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csfr_token },
            body: JSON.stringify({ escalamailData: formData })
        }).then(r => r.json()).then(Responseescala).catch(function(err) { console.error('escalmailcon error', err); });
    }
}

function Responseescala(response) {
    if (response.status === 200) {
        swal({ title: 'SUCCESS!', text: response.msg, type: 'success', confirmButtonClass: 'btn-success', confirmButtonText: 'OK' },
            function(isConfirm) { if (isConfirm) location.reload(); });
    } else {
        swal({ title: 'FAILURE!', text: response.msg || response.error, type: 'warning', confirmButtonClass: 'btn-danger', closeOnConfirm: true });
    }
}

function onEditpolicy(policyid) {
    currentEditPolicyId = policyid;
    document.getElementById('escal-modal-title').textContent = 'Edit Escalation Notification Setup';
    document.getElementById('addescalbtn').textContent = 'Update';
    requestDataFromServer('/notification/edit_escalation_policy', { policyid }, 'GET').done(function(response) {
        if (response.status === 200) {
            const policy = response.data;
            // Populate hidden fields
            document.getElementById('escal-modal-category-val').value = policy.categories || '';
            document.getElementById('escal-modal-device-type').value = policy.device_type || '';
            document.getElementById('escal-modal-device-ip').value = policy.device_ip || '';
            document.getElementById('escal-modal-device-fname').value = policy.device_friendly_name || '';
            // Populate dropdown
            var catSel = document.getElementById('escal-category-select');
            const catValue = policy.subject_category || policy.categories || '';
            if (catSel) catSel.value = catValue;

            if (catValue === 'Device') {
                document.getElementById('dynamic-device-sections').style.display = 'block';
                document.getElementById('dynamic-dtype-section').style.display = 'flex';
                
                // Tick the correct device_type
                if (policy.device_type) {
                    const savedTypes = policy.device_type.split(',').map(s => s.trim());
                    document.querySelectorAll('.dynamic-dtype-cb').forEach(cb => {
                        cb.checked = savedTypes.includes(cb.value);
                    });
                }
                
                // Load IPs and Alerts sequentially
                const dtypes = Array.from(document.querySelectorAll('.dynamic-dtype-cb:checked')).map(cb => cb.value);
                if (dtypes.length > 0) {
                    const promises = dtypes.map(dtype => 
                        fetch('/notification/get_devices_by_type?device_type=' + encodeURIComponent(dtype))
                            .then(r => r.json())
                            .then(resp => (resp.status === 200 && resp.data) ? resp.data.map(d => ({...d, _dtype: dtype})) : [])
                    );
                    
                    Promise.all(promises).then(results => {
                        const allDevs = [].concat.apply([], results);
                        const ipList = document.getElementById('dynamic-ip-list');
                        ipList.innerHTML = '<div class="row w-100 mx-0"></div>';
                        const row = ipList.querySelector('.row');
                        
                        const savedIps = (policy.device_ip || '').split(',').map(s => s.trim());
                        
                        allDevs.forEach(dev => {
                            const col = document.createElement('div');
                            col.className = 'col-md-4 col-lg-3 mb-2 px-1';
                            const isChecked = savedIps.includes(dev.ip) ? 'checked' : '';
                            const safeFname = (dev.friendly_name || dev.ip || '').replace(/'/g, "\\'");
                            const lbl = document.createElement('label');
                            lbl.className = 'form-check-label d-flex align-items-center w-100 m-0';
                            lbl.style.cursor = 'pointer';
                            lbl.innerHTML = `
                                <input type="checkbox" class="mr-2 dynamic-ip-cb flex-shrink-0" value="${dev.ip}" data-fname="${safeFname}" data-dtype="${dev._dtype}" onchange="onDynamicIpChange()" style="margin-top: 2px;" ${isChecked}>
                                <span class="text-truncate" title="${dev.friendly_name || dev.ip}">${dev.friendly_name || dev.ip} <span class="text-white-50" style="font-size:10px;">(${dev.ip})</span></span>
                            `;
                            col.appendChild(lbl);
                            row.appendChild(col);
                        });
                        document.getElementById('dynamic-ip-section').style.display = 'flex';
                        
                        // Now load Alerts
                        if (savedIps.length > 0 && dtypes[0]) {
                            fetch('/notification/get_device_alert_categories?device_type=' + encodeURIComponent(dtypes[0]))
                                .then(r => r.json())
                                .then(resp => {
                                    const alertList = document.getElementById('dynamic-alert-list');
                                    alertList.innerHTML = '';
                                    const cats = resp.categories || [];
                                    const savedAlerts = (policy.categories || '').split(',').map(s => s.trim());
                                    
                                    cats.forEach(cat => {
                                        const isChecked = savedAlerts.includes(cat) ? 'checked' : '';
                                        const lbl = document.createElement('label');
                                        lbl.className = 'form-check-label mr-4 mb-1';
                                        lbl.style.cursor = 'pointer';
                                        lbl.innerHTML = `<input type="checkbox" class="mr-1 dynamic-alert-cb" value="${cat}" onchange="onDynamicAlertChange()" ${isChecked}> ${cat}`;
                                        alertList.appendChild(lbl);
                                    });
                                    document.getElementById('dynamic-alert-section').style.display = 'flex';
                                });
                        }
                    });
                }
            } else {
                document.getElementById('dynamic-device-sections').style.display = 'none';
            }
            // Populate timers
            document.getElementById('apptimemodal').value = policy.approval_time || '';
            document.getElementById('resotime').value = policy.resolution_time || '';
            // Toggle
            const toggle = document.getElementById('escalation_required');
            const value = String(policy.escalation_required).toLowerCase();
            toggle.checked = ['true', 'yes', 'enable', '1', 'enabled'].includes(value);
            document.getElementById('escalation_label').textContent = toggle.checked ? 'Escalation Enabled' : 'Escalation Disabled';
            // Escalation mails
            try {
                const escMails = JSON.parse(policy.escalation_mails || '[]');
                currentLevel = escMails.length || 1;
                renderEmailFields('escalation', currentLevel, 'escalationFields', 'levelBox', 'escalationMail', 'Escalation');
                escMails.forEach(function(email, idx) {
                    const input = document.getElementById(`escalationMail${idx + 1}`);
                    if (input) input.value = email;
                });
            } catch (e) { console.error('Error parsing escalation mails:', e); }
            // Info mails
            try {
                const infoMails = JSON.parse(policy.info_mails || '[]');
                currentInfoLevel = infoMails.length || 1;
                renderEmailFields('info', currentInfoLevel, 'infoFields', 'infoLevelBox', 'infoMail', 'Info');
                infoMails.forEach(function(email, idx) {
                    const input = document.getElementById(`infoMail${idx + 1}`);
                    if (input) input.value = email;
                });
            } catch (e) { console.error('Error parsing info mails:', e); }
            $('#dialog-for-addescl').modal('show');
        } else {
            alert('Failed to fetch policy details: ' + response.msg);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching policy:', textStatus, errorThrown);
    });
}

function toggleEscalation(toggle) {
    document.getElementById('escalation_label').textContent = toggle.checked ? 'Escalation Enabled' : 'Escalation Disabled';
}

function onDeletepolicy(policyid) {
    swal({ title: 'Are you sure?', text: 'Do you really want to delete this policy?', type: 'warning',
           showCancelButton: true, confirmButtonText: 'Yes, delete it!', closeOnConfirm: false },
        function() {
            fetch('/notification/delete_escalation_policy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csfr_token },
                body: JSON.stringify({ policyid })
            }).then(r => r.json()).then(function(data) {
                if (data.status === 200) {
                    swal('Deleted!', data.msg, 'success');
                    loadEscalationData(escalState.alertCategory);
                } else {
                    swal('Error!', data.msg, 'error');
                }
            }).catch(function(err) {
                console.error('Error deleting policy:', err);
                swal('Error!', 'Something went wrong', 'error');
            });
        });
}

/* ================================================================
   DEVICE-WISE POLICY MODAL
   ================================================================ */
let dpCurrentLevel = 1;
let dpCurrentInfoLevel = 1;

function _dpRenderEmailFields(level, containerId, levelBoxId, inputPrefix, labelPrefix) {
    const container = document.getElementById(containerId);
    const levelBox = document.getElementById(levelBoxId);
    const existing = {};
    for (let i = 1; i <= level; i++) {
        const inp = document.getElementById(`${inputPrefix}${i}`);
        if (inp) existing[i] = inp.value;
    }
    levelBox.textContent = level;
    container.innerHTML = '';
    if (level === 0) return;
    for (let i = 1; i <= level; i++) {
        const wrap = document.createElement('div');
        wrap.className = 'mb-3';
        const lbl = document.createElement('label');
        lbl.setAttribute('for', `${inputPrefix}${i}`);
        lbl.innerText = `${labelPrefix} Level ${i} Email`;
        lbl.className = 'form-label text-white';
        const inp = document.createElement('input');
        inp.type = 'email';
        inp.className = 'form-control full-input dp-input';
        inp.id = `${inputPrefix}${i}`;
        inp.placeholder = `Enter email for ${labelPrefix.toLowerCase()} level ${i}`;
        inp.required = true;
        const err = document.createElement('span');
        err.className = 'error-msg';
        err.id = `${inputPrefix}${i}_error`;
        if (existing[i]) inp.value = existing[i];
        wrap.appendChild(lbl);
        wrap.appendChild(inp);
        wrap.appendChild(err);
        container.appendChild(wrap);
    }
}

function dpIncreaseLevel() { dpCurrentLevel++; _dpRenderEmailFields(dpCurrentLevel, 'dp-escalationFields', 'dp-levelBox', 'dpEscMail', 'Escalation'); }
function dpDecreaseLevel() { if (dpCurrentLevel > 0) dpCurrentLevel--; _dpRenderEmailFields(dpCurrentLevel, 'dp-escalationFields', 'dp-levelBox', 'dpEscMail', 'Escalation'); }
function dpIncreaseInfoLevel() { dpCurrentInfoLevel++; _dpRenderEmailFields(dpCurrentInfoLevel, 'dp-infoFields', 'dp-infoLevelBox', 'dpInfoMail', 'Info'); }
function dpDecreaseInfoLevel() { if (dpCurrentInfoLevel > 0) dpCurrentInfoLevel--; _dpRenderEmailFields(dpCurrentInfoLevel, 'dp-infoFields', 'dp-infoLevelBox', 'dpInfoMail', 'Info'); }

function dpToggleEscalation(toggle) {
    document.getElementById('dp-escalation-label').textContent = toggle.checked ? 'Escalation Enabled' : 'Escalation Disabled';
}

function dpOpenAddModal() {
    document.getElementById('dp-record-id').value = '';
    document.getElementById('dp-device-type').value = escalState.deviceType || '';
    document.getElementById('dp-device-ip').value = escalState.selectedIp || '';
    document.getElementById('dp-device-fname').value = escalState.selectedFname || '';
    document.getElementById('dp-alert-category').value = escalState.alertCategory || '';
    document.getElementById('dp-info-ip').textContent = (escalState.selectedFname || '') + ' (' + (escalState.selectedIp || '') + ')';
    document.getElementById('dp-info-cat').textContent = escalState.alertCategory || '';
    document.getElementById('dp-save-btn').textContent = 'Save';
    document.getElementById('device-policy-modal-title').textContent = 'Add Device Alert Policy';
    document.getElementById('dp-apptime').value = '';
    document.getElementById('dp-resotime').value = '';
    document.getElementById('dp-escalation-required').checked = true;
    document.getElementById('dp-is-enabled').checked = true;
    dpCurrentLevel = 1;
    dpCurrentInfoLevel = 1;
    _dpRenderEmailFields(dpCurrentLevel, 'dp-escalationFields', 'dp-levelBox', 'dpEscMail', 'Escalation');
    _dpRenderEmailFields(dpCurrentInfoLevel, 'dp-infoFields', 'dp-infoLevelBox', 'dpInfoMail', 'Info');
    const e1 = document.getElementById('dpEscMail1');
    const i1 = document.getElementById('dpInfoMail1');
    if (e1) e1.value = '';
    if (i1) i1.value = '';
    $('#dialog-for-device-policy').modal('show');
}

function dpOpenEditModal(recordId) {
    // We will use the main 2-column modal for editing device policies too.
    currentEditPolicyId = recordId;
    fetch('/notification/edit_device_alert_policy?id=' + recordId)
        .then(r => r.json())
        .then(function(resp) {
            if (resp.status !== 200) { alert('Failed to load policy: ' + resp.msg); return; }
            const p = resp.data;
            
            document.getElementById('escal-modal-title').textContent = 'Edit Device Alert Policy';
            document.getElementById('addescalbtn').textContent = 'Update';
            
            // Set category to Device and trigger UI change first so it doesn't overwrite our values
            const catSel = document.getElementById('escal-category-select');
            if (catSel) {
                catSel.value = 'Device';
                onCategoryChange('Device');
            }

            // Set hidden fields
            document.getElementById('escal-modal-device-type').value = p.device_type;
            document.getElementById('escal-modal-device-ip').value = p.device_ip;
            document.getElementById('escal-modal-device-fname').value = p.device_friendly_name;
            document.getElementById('escal-modal-category-val').value = p.alert_category;

            // Check the correct device type
            document.querySelectorAll('.dynamic-dtype-cb').forEach(cb => {
                cb.checked = (cb.value === p.device_type);
            });
            
            // Trigger device type change to load IPs
            onDynamicDtypeChange();

            // Note: onDynamicDtypeChange makes an async fetch for IPs, so we must wait for it 
            // before we can check the IP and load the Alert Categories.
            // A simple timeout or interval to check the IP will work for this UI initialization.
            let checkInterval = setInterval(() => {
                let ipCb = document.querySelector(`.dynamic-ip-cb[value="${p.device_ip}"]`);
                if (ipCb) {
                    ipCb.checked = true;
                    onDynamicIpChange();
                    clearInterval(checkInterval);
                    
                    // Wait for alert categories to load, then check the correct one
                    let alertInterval = setInterval(() => {
                        let alertCb = document.querySelector(`.dynamic-alert-cb[value="${p.alert_category}"]`);
                        if (alertCb) {
                            alertCb.checked = true;
                            onDynamicAlertChange();
                            clearInterval(alertInterval);
                        }
                    }, 100);
                }
            }, 100);

            // Populate timers
            document.getElementById('apptimemodal').value = p.approval_time || '';
            document.getElementById('resotime').value = p.resolution_time || '';
            
            // Toggle
            const toggle = document.getElementById('escalation_required');
            const val = String(p.escalation_required).toLowerCase();
            toggle.checked = ['true', 'yes', '1', 'enabled'].includes(val);
            toggleEscalation(toggle);

            // Emails
            try {
                const escMails = JSON.parse(p.escalation_mails || '[]');
                currentLevel = escMails.length || 1;
                renderEmailFields('escalation', currentLevel, 'escalationFields', 'levelBox', 'escalationMail', 'Escalation');
                escMails.forEach(function(email, idx) {
                    const inp = document.getElementById(`escalationMail${idx + 1}`);
                    if (inp) inp.value = email;
                });
            } catch (e) { console.error('dp parse escMails', e); }
            
            try {
                const infoMails = JSON.parse(p.info_mails || '[]');
                currentInfoLevel = infoMails.length || 1;
                renderEmailFields('info', currentInfoLevel, 'infoFields', 'infoLevelBox', 'infoMail', 'Info');
                infoMails.forEach(function(email, idx) {
                    const inp = document.getElementById(`infoMail${idx + 1}`);
                    if (inp) inp.value = email;
                });
            } catch (e) { console.error('dp parse infoMails', e); }

            $('#dialog-for-addescl').modal('show');
        })
        .catch(function(err) { console.error('dpOpenEditModal error', err); });
}

function _dpGetEmails(level, prefix) {
    const emails = [];
    for (let i = 1; i <= level; i++) {
        const inp = document.getElementById(`${prefix}${i}`);
        if (inp && inp.value.trim()) emails.push(inp.value.trim());
    }
    return emails;
}

// Bulk delete logic
function toggleAllGlobalEscal(source) {
    const checkboxes = document.querySelectorAll('.global-escal-cb');
    checkboxes.forEach(cb => cb.checked = source.checked);
    checkGlobalEscalSelection();
}

function checkGlobalEscalSelection() {
    const checkboxes = document.querySelectorAll('.global-escal-cb:checked');
    const deleteBtn = document.getElementById('bulk-delete-escal');
    if (deleteBtn) {
        deleteBtn.style.display = checkboxes.length > 0 ? 'inline-block' : 'none';
    }
    
    const selectAll = document.getElementById('selectAllGlobalEscal');
    const allCheckboxes = document.querySelectorAll('.global-escal-cb');
    if (selectAll && allCheckboxes.length > 0) {
        selectAll.checked = checkboxes.length === allCheckboxes.length;
    }
}

function bulkDeleteEscalation() {
    const checked = document.querySelectorAll('.global-escal-cb:checked');
    if (checked.length === 0) return;
    
    const policyIds = Array.from(checked).map(cb => parseInt(cb.value));
    
    swal({
        title: 'Are you sure?',
        text: `Do you really want to delete ${policyIds.length} selected polic${policyIds.length > 1 ? 'ies' : 'y'}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete!',
        closeOnConfirm: false
    }, function() {
        fetch('/notification/delete_escalation_policy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csfr_token },
            body: JSON.stringify({ policy_ids: policyIds }) // We'll modify the backend to accept an array
        }).then(r => r.json()).then(function(data) {
            if (data.status === 200) {
                swal('Deleted!', data.msg, 'success');
                const selectAll = document.getElementById('selectAllGlobalEscal');
                if (selectAll) selectAll.checked = false;
                checkGlobalEscalSelection();
                loadEscalationData(escalState.alertCategory);
            } else {
                swal('Error!', data.msg, 'error');
            }
        }).catch(function(err) {
            console.error('Error deleting policies:', err);
            swal('Error!', 'Something went wrong', 'error');
        });
    });
}

function dpSavePolicy() {
    // Basic validation
    let valid = true;
    document.querySelectorAll('.dp-input').forEach(function(input) {
        input.classList.remove('is-invalid');
        const err = document.getElementById(input.id + '_error');
        if (err) err.textContent = '';
        if (input.type === 'number' && !input.value.trim()) {
            input.classList.add('is-invalid');
            valid = false;
        } else if (input.type === 'email' && (!input.value.trim() || !validateEmail(input.value.trim()))) {
            input.classList.add('is-invalid');
            if (document.getElementById(input.id + '_error'))
                document.getElementById(input.id + '_error').textContent = 'Invalid email';
            valid = false;
        }
    });
    if (!valid) return;

    const payload = {
        id: document.getElementById('dp-record-id').value || null,
        device_type: document.getElementById('dp-device-type').value,
        device_ip: document.getElementById('dp-device-ip').value,
        device_friendly_name: document.getElementById('dp-device-fname').value,
        alert_category: document.getElementById('dp-alert-category').value,
        escalation_mails: _dpGetEmails(dpCurrentLevel, 'dpEscMail'),
        info_mails: _dpGetEmails(dpCurrentInfoLevel, 'dpInfoMail'),
        escalation_required: document.getElementById('dp-escalation-required').checked ? 1 : 0,
        approval_time: document.getElementById('dp-apptime').value.trim(),
        resolution_time: document.getElementById('dp-resotime').value.trim(),
        is_enabled: document.getElementById('dp-is-enabled').checked ? 1 : 0,
    };

    fetch('/notification/save_device_alert_policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csfr_token },
        body: JSON.stringify(payload)
    }).then(r => r.json()).then(function(resp) {
        if (resp.status === 200) {
            $('#dialog-for-device-policy').modal('hide');
            swal({ title: 'SUCCESS!', text: resp.msg, type: 'success', confirmButtonText: 'OK' },
                function() {
                    _loadDevicePolicies(escalState.selectedIp, escalState.alertCategory);
                });
        } else {
            swal({ title: 'FAILURE!', text: resp.msg, type: 'warning', confirmButtonClass: 'btn-danger', closeOnConfirm: true });
        }
    }).catch(function(err) {
        console.error('dpSavePolicy error', err);
        swal('Error', 'Something went wrong', 'error');
    });
}

function dpDeletePolicy(recordId) {
    swal({ title: 'Are you sure?', text: 'Delete this device alert policy?', type: 'warning',
           showCancelButton: true, confirmButtonText: 'Yes, delete it!', closeOnConfirm: false },
        function() {
            fetch('/notification/delete_device_alert_policy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csfr_token },
                body: JSON.stringify({ id: recordId })
            }).then(r => r.json()).then(function(data) {
                if (data.status === 200) {
                    swal('Deleted!', data.msg, 'success');
                    _loadDevicePolicies(escalState.selectedIp, escalState.alertCategory);
                } else {
                    swal('Error!', data.msg, 'error');
                }
            }).catch(function() { swal('Error!', 'Something went wrong', 'error'); });
        });
}

// Initial render
renderFields();
renderInfoFields();
