var jsonObj = {}
var selectedService = ' ';
let currentEditPolicyId = null;  // Global variable to store the policy being edited

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
    loadEscalationData()
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

function onAddPolicy() {
    currentEditPolicyId = null;
    document.getElementById("addescalbtn").textContent = "Add";

    // Clear basic fields
    document.getElementById("categories").value = "";
    document.getElementById("apptimemodal").value = "";
    document.getElementById("resotime").value = "";

    // Clear toggle
    //document.getElementById("escalation_required").checked = true;
    document.getElementById("escalation_required").checked = true;
    document.getElementById("escalation_label").textContent = "Escalation Enabled";

    // Reset escalation and info email fields
    currentLevel = 1;
    renderEmailFields("escalation", currentLevel, "escalationFields", "levelBox", "escalationMail", "Escalation");

    currentInfoLevel = 1;
    renderEmailFields("info", currentInfoLevel, "infoFields", "infoLevelBox", "infoMail", "Info");

    // Clear the first inputs manually
    const escMail = document.getElementById("escalationMail1");
    const infoMail = document.getElementById("infoMail1");
    if (escMail) escMail.value = "";
    if (infoMail) infoMail.value = "";

    // Modal already opens via data-toggle
}

let currentLevel = 1;
let currentInfoLevel = 1;

function renderEmailFields(type, level, containerId, levelBoxId, inputPrefix, labelPrefix) {
    const fieldsContainer = document.getElementById(containerId);
    const levelBox = document.getElementById(levelBoxId);

    // Save existing values
    const existingValues = {};
    for (let i = 1; i <= level; i++) {
        const input = document.getElementById(`${inputPrefix}${i}`);
        if (input) existingValues[i] = input.value;
    }

    levelBox.textContent = level;
    fieldsContainer.innerHTML = "";

    if (level === 0) return;

    for (let i = 1; i <= level; i++) {
        const wrapper = document.createElement("div");
        wrapper.className = "mb-3";

        const label = document.createElement("label");
        label.setAttribute("for", `${inputPrefix}${i}`);
        label.innerText = `${labelPrefix} Level ${i} Email`;
        label.className = "form-label text-white";

        const input = document.createElement("input");
        input.type = "email";
        input.className = "form-control full-input escala_input";
        input.id = `${inputPrefix}${i}`;
        input.placeholder = `Enter email for ${labelPrefix.toLowerCase()} level ${i}`;
        input.name = `${inputPrefix}${i}`;
        input.required = true;

        const errorSpan = document.createElement("span");
        errorSpan.className = "error-msg";
        errorSpan.id = `${inputPrefix}${i}_error`;

        if (existingValues[i]) {
            input.value = existingValues[i];
        }

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(errorSpan);
        fieldsContainer.appendChild(wrapper);
    }
}

// Initial render functions
function renderFields() {
    renderEmailFields("escalation", currentLevel, "escalationFields", "levelBox", "escalationMail", "Escalation");
}
function renderInfoFields() {
    renderEmailFields("info", currentInfoLevel, "infoFields", "infoLevelBox", "infoMail", "Info");
}

// Increase/decrease level functions
function increaseLevel() {
    currentLevel++;
    renderFields();
}
function decreaseLevel() {
    if (currentLevel > 0) currentLevel--;
    renderFields();
}
function increaseInfoLevel() {
    currentInfoLevel++;
    renderInfoFields();
}
function decreaseInfoLevel() {
    if (currentInfoLevel > 0) currentInfoLevel--;
    renderInfoFields();
}

// Clear all previous error messages
function clearErrors() {
    document.querySelectorAll('.escala_input').forEach(input => {
        input.classList.remove('is-invalid');
    });
    document.querySelectorAll('.error-msg').forEach(span => {
        span.textContent = '';
    });
}

// Extract emails from inputs
function getEmails(level, prefix) {
    const emails = [];
    for (let i = 1; i <= level; i++) {
        const input = document.getElementById(`${prefix}${i}`);
        if (input && input.value) {
            emails.push(input.value.trim());
        }
    }
    return emails;
}

function escalmailcon() {
    clearErrors();
    const inputs = document.querySelectorAll('.escala_input');
    let valid = true;

    inputs.forEach(input => {
        const value = input.value.trim();
        const errorSpan = document.getElementById(`${input.id}_error`);
        if (!value) {
            input.classList.add('is-invalid');
            if (errorSpan) {
                errorSpan.textContent = "This field cannot be empty.";
            }
            valid = false;
        } else if (input.type === "email" && !validateEmail(value)) {
            input.classList.add('is-invalid');
            if (errorSpan) {
                errorSpan.textContent = "Invalid email address.";
            }
            valid = false;
        }
    });

    if (!valid) return;
   // EditPolicyId = currentEditPolicyId
    const escalation_mails = getEmails(currentLevel, "escalationMail");
    const info_mails = getEmails(currentInfoLevel, "infoMail");

    const escalation_required = document.getElementById("escalation_required").checked ? 1 : 0;
    const categories = document.getElementById("categories").value.trim();
    const approval_time = document.getElementById("apptimemodal").value.trim();
    const resolution_time = document.getElementById("resotime").value.trim();

    const formData = {
        policyid: currentEditPolicyId || null,
        escalation_required,
        escalation_mails,
        info_mails,
        categories,
        approval_time,
        resolution_time
    };
   // console.log("Submitting Policy Data:", formData);
    fetch('/notification/escalapolicy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csfr_token
        },
        body: JSON.stringify({ escalamailData: formData })
    })
        .then(response => response.json())
        .then(Responseescala)
        .catch(error => {
            console.error("Error sending request:", error);
        });
}

// Response handler
function Responseescala(response) {
    if (response.status === 200) {
        swal({
            title: 'SUCCESS!',
            text: response.msg,
            type: "success",
            confirmButtonClass: "btn-success",
            confirmButtonText: "OK"
        },
            function (isConfirm) {
                if (isConfirm) {
                    location.reload();
                }
            });
    } else {
        swal({
            title: 'FAILURE!',
            text: response.msg,
            type: "warning",
            confirmButtonClass: "btn-danger",
            closeOnConfirm: true
        });
    }
}

// Email validation regex
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Initial rendering
renderFields();
renderInfoFields();

/* --- =================== Escalation Mail Get function ================== ---- */

function loadEscalationData() {
    fetch("/notification/get_escalation_policies")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("escaladataval");
            const noDataBox = document.getElementById("escaladata-nodata");
            const noDataMessage = document.getElementById("noescdatamessage");

            tableBody.innerHTML = ""; // Clear existing rows

            if (data.status === 200) {
                if (data.data.length === 0) {
                    // Show custom no data UI
                    noDataBox.style.display = "flex";
                    noDataMessage.innerHTML = `
                        <div class="text-center w-100 py-4">
                            <div class="mb-2"><i class="icon-alert-triangle text-warning" style="font-size: 2rem;"></i></div>
                            <div class="h5">No escalation policy data available.</div>
                            <div class="text-muted">We cannot get the information right now. Please try again</div>
                        </div>
                    `;
                } else {
                    noDataBox.style.display = "none";

                    data.data.forEach(policy => {
                       // console.log("loadEscalationData--->" + JSON.stringify(policy));

                        // Format emails: 2 per line
                        const formatEmails = (emails) => {
                            const parsed = Array.isArray(emails) ? emails : JSON.parse(emails);
                            let formatted = "";
                            for (let i = 0; i < parsed.length; i += 2) {
                                formatted += parsed[i];
                                if (i + 1 < parsed.length) {
                                    formatted += ", " + parsed[i + 1];
                                }
                                formatted += "<br>";
                            }
                            return formatted;
                        };

                        const escalationMails = formatEmails(policy.escalation_mails);
                        const infoMails = formatEmails(policy.info_mails);

                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td class="pl-3">${policy.categories}</td>
                            <td>${escalationMails}</td>
                            <td>${infoMails}</td>
                            <td>${policy.escalation_required}</td>
                            <td>${policy.approval_time}</td>
                            <td>${policy.resolution_time}</td>
                            <td class="p-lg-0 px-4 py-1 action-btn">
                                <div class="dropdown custom-dropdown mr-3">
                                    <button class="btn btn-default btn-ripple btn-dropdown-link dropdown-toggle icon-dropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="icon-more_option" style="color: #6c757d"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" onclick="onEditpolicy(${policy.policy_id})" data-toggle="modal" data-target="#dialog-for-addescl">
                                            <i class="icon-edit2"></i>Edit
                                        </a>
                                        <a class="dropdown-item" onclick="onDeletepolicy(${policy.policy_id})">
                                            <i class="icon-delete"></i>Delete
                                        </a>
                                    </div>
                                </div>
                            </td>
                        `;
                        tableBody.appendChild(row);
                    });
                }
            } else {
                // Show error UI
                noDataBox.style.display = "flex";
                noDataMessage.innerHTML = `
                    <div class="text-center w-100 py-4">
                        <div class="mb-2"><i class="icon-alert-triangle text-danger" style="font-size: 2rem;"></i></div>
                        <div class="h5">Escalation Mail Data not reachable. Please contact administrator</div>
                        <div class="text-muted">We cannot get the information right now. Please try again</div>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error("Error loading escalation data:", error);

            // Show fallback error UI
            document.getElementById("escaladata-nodata").style.display = "flex";
            document.getElementById("noescdatamessage").innerHTML = `
                <div class="text-center w-100 py-4">
                    <div class="mb-2"><i class="icon-alert-triangle text-danger" style="font-size: 2rem;"></i></div>
                    <div class="h5">Escalation Mail Data not reachable. Please contact administrator</div>
                    <div class="text-muted">We cannot get the information right now. Please try again</div>
                </div>
            `;
        });
}

function onEditpolicy(policyid) {
    currentEditPolicyId = policyid;
    document.getElementById("addescalbtn").textContent = "Update";

    requestDataFromServer('/notification/edit_escalation_policy', { "policyid": policyid }, "GET").done(function (response) {
        if (response.status === 200) {
            const policy = response.data;
            //console.log("onEditpolicy --->", policy);

            // Fill basic modal fields
            document.getElementById("categories").value = policy.categories || "";
            document.getElementById("apptimemodal").value = policy.approval_time || "";
            document.getElementById("resotime").value = policy.resolution_time || "";

            // Escalation required toggle - check for "enabled" variants
            const toggle = document.getElementById("escalation_required");
            const value = String(policy.escalation_required).toLowerCase();
            toggle.checked = ["true", "yes", "enable", "1", "enabled"].includes(value);
            // Also update label text
            document.getElementById("escalation_label").textContent = toggle.checked? "Escalation Enabled" : "Escalation Disabled";

            // Parse and render escalation mails
            try {
                const escMails = JSON.parse(policy.escalation_mails || "[]");
                currentLevel = escMails.length;
                renderEmailFields("escalation", currentLevel, "escalationFields", "levelBox", "escalationMail", "Escalation");
                escMails.forEach((email, index) => {
                    const input = document.getElementById(`escalationMail${index + 1}`);
                    if (input) input.value = email;
                });
            } catch (e) {
                console.error("Error parsing escalation mails:", e);
            }

            // Parse and render info mails
            try {
                const infoMails = JSON.parse(policy.info_mails || "[]");
                currentInfoLevel = infoMails.length;
                renderEmailFields("info", currentInfoLevel, "infoFields", "infoLevelBox", "infoMail", "Info");
                infoMails.forEach((email, index) => {
                    const input = document.getElementById(`infoMail${index + 1}`);
                    if (input) input.value = email;
                });
            } catch (e) {
                console.error("Error parsing info mails:", e);
            }

            // Show modal
            $('#dialog-for-addescl').modal('show');

        } else {
            alert("Failed to fetch policy details: " + response.msg);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Error fetching policy:", textStatus, errorThrown);
    });
}

function toggleEscalation(toggle) {
    const label = document.getElementById("escalation_label");
    if (toggle.checked) {
        label.textContent = "Escalation Enabled";
    } else {
        label.textContent = "Escalation Disabled";
    }
}

function onDeletepolicy(policyid) {
   // console.log("nDeletepolicy--->" + policyid)
    swal({
        title: "Are you sure?",
        text: "Do you really want to delete this policy?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        fetch('/notification/delete_escalation_policy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csfr_token
            },
            body: JSON.stringify({ policyid })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    swal("Deleted!", data.msg, "success");
                    loadEscalationData(); // 🔄 Refresh table data
                } else {
                    swal("Error!", data.msg, "error");
                }
            })
            .catch(error => {
                console.error("Error deleting policy:", error);
                swal("Error!", "Something went wrong", "error");
            });
    });
}