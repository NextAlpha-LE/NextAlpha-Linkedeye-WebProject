var clientData = {};
operation = 'add';
rowid = 1;
data = [];
requestData = {};
global_all_services = [];
var snackbar = document.getElementById("snackbar");
var totalSecrets = 0

$(document).ready(function()
{
    $("#vaulttemplate #table-view").hide();
    $('.vault_select_input').focus(function () {
		//document.getElementsByClassName('select-input')[0].style.color = "";
    });
    $('.vault_select_input').focusout(function (e) {
        if ($(this).val() == '') {
            $(this).parent().find("label").css('color','#ff9eac');
            $(this).parent().find(".error-msg").text('Field cannot be empty');
        }
        else {
          //  $(this).parent().find("label").css('color','#404E67');
            $(this).parent().find(".error-msg").text('');
        }
    });
    $(".vault_input_effect").focus(function () {
		inputFocusIn($(this))
	});
	$('.vault_input_effect').focusout(function (e) {
        inputFocusOut($(this))
	});
    $("#edit-password").focus(function () {
        $(this).parent().addClass("bg_input");
    });
    $('#edit-password').focusout(function (e) {
        if ($(this).val() == '') {
			$(this).parent().find("label").css('color','#ff9eac');
			$(this).parent().find(".error-msg").text('Field cannot be empty');
        }
        else { 
		//$(this).parent().find("label").css('color','#404E67');
            $(this).parent().find(".error-msg").text(''); 
        }
    });
    getFileName();
    getAllSecrets();
});
function getAllSecrets()
{
    requestDataFromServer('/vault/getallsecrets',{}, "GET").done(secretsResponse);  
}

function secretsResponse(response)
{
    res = JSON.parse(response);
    if(res.status == 200)
        statusChanged(res.secretstatus)
    if(res.status == 200 && res.data.length)
    {
        $("#vaulttemplate #table-view").show();
        $("#vaulttemplate-nodata").hide()
        if(res.role != 'Admin')
            $('#vaulttemplate #status').attr('disabled', true)
        res.data.forEach(function(obj)
        {
            totalSecrets++
            addRow(obj)
        });
        $('#totalSecrets').text(totalSecrets);   
    }
    else
    {
        $("#vaulttemplate #table-view").hide();
        $("#vaulttemplate-nodata").show()
        $("#vaulttemplate-nodata #tryagainbtn").prop('disabled', false);
        $("#vaulttemplate-nodata #nodatamessage").text(res.msg);
    } 
}
function reloadSecrets()
{
    getAllSecrets()
}
function addRow(obj, isSplitURL=false, data={})
{
    if(isSplitURL == true)
    {
        url = data.url
        values = url.split('/')
        service = values[2]
        ip =  values[3];
        username = values[4]
        id = data.id
    }
    else
    {
        id = obj.id
        username = obj.username
        service = obj.service
        ip = obj.ip
        url = obj.url
    }
    if($("#vaulttemplate #table-view").css('display') == 'none')
    {
        $("#vaulttemplate #table-view").show();
        $("#vaulttemplate-nodata").hide()
    }
    serviceHtml  = ' '
    serviceHtml += '<tr data-toggle="collapse" data-target="#user-detail" class="accordion-toggle cursor-pointer" id ='+id+'>'
    serviceHtml += '<td class="px-3 py-1 profile-td">'
    serviceHtml += '<div class="profile warning-bg text-white"> <span class="size12 bold-text">TS</span> </div>'
    serviceHtml += '</td>'
    serviceHtml += '<td class="pl-0">'+username+'</td>'
    serviceHtml += '<td>'+service+'</td>'
    serviceHtml += '<td>'+ip+'</td>'
    serviceHtml += '<td>'+url+'</td>'
    serviceHtml += '<td class="p-0 action-btn">'
    serviceHtml += '<div class="dropdown custom-dropdown mr-3">'
    serviceHtml += '<button class="btn btn-default btn-ripple btn-dropdown-link dropdown-toggle icon-dropdown" type="button" id="moreoption" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > <i class="icon-more_option" style="color:#6c757d"></i> </button>'
    serviceHtml +=  '<div class="dropdown-menu" aria-labelledby="moreoption">'
    serviceHtml +=         '<a class="dropdown-item" onclick="onDeleteSecret(\''+url+'\')"><i class="icon-delete2"></i>Delete</a>'
    serviceHtml +=         '<a class="dropdown-item" onclick="onUpdateSecret({\'user\':\''+url+'\''+',\'id\':\''+id+'\''+'})\" data-toggle="modal" data-target="#dialog-for-editsecret"><i class="icon-edit2"></i>Edit</a> </div>'
    serviceHtml +=     '</div>'
    serviceHtml += '</td>'
    serviceHtml += '</tr>'
    $("#vaulttemplate #data tbody").append(serviceHtml);
}
function statusChanged(status)
{
    document.getElementById('secretstatus').innerHTML = '' //this for available secrets sealed text in button
    if(status == 'Sealed')
    {
        $("#vaulttemplate #addsecret").attr("disabled","disabled");
        document.getElementById('status').checked = true;
        document.getElementById('errormessage').innerHTML = '*Vault is Sealed. Contact the administrator'
    }
    else
    {
        $("#message-error-view").hide();
        $("#vaulttemplate #addsecret").removeAttr('disabled');
        document.getElementById('status').checked = false;
        document.getElementById('errormessage').innerHTML = ' '  
    }
}

function dataToserver()
{
    data = [];
    requestData = {};
    ip_array = [];
   // console.log(data + requestData + ip_array);
    ipValue = $("#ip").val()
    if(ipValue.includes(","))
    {
        ip_list = ipValue.split(',')
        ip_array = ip_list.filter((value, index) => ip_list.indexOf(value) === index)
    }
    else
    {
        ip_array[0] = ipValue 
    }
    for(var i = 0; i < ip_array.length; i++)
    {
        clientData = {}
        clientData["username"] = $("#dialog-for-addsecret #username").val(),
        clientData["password"] = $("#dialog-for-addsecret #password").val(),
        clientData["service"] = document.getElementById("selectedservice").textContent,
        clientData["ip"] = ip_array[i],
        clientData["rowid"] = rowid,
        clientData["operation"] = 'add'
        data.push(clientData)
    }
    requestData['data'] = data;
    requestDataFromServer('/vault/vaultOperation', {'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(handleResponse);
}

function handleResponse(response)
{
    ip_array = [];
    if(response.status == 400)
    {
        swal(response.msg, ' ', "error");	
        return false;
	}
	else
	{
        if(clientData["operation"]=='add')
        {
            if(response.length > 0)
            {
                response.forEach(function(res)
                {
                    if(res && res.status == 204)
                    {
                        data = {}
                        data['url'] = res.url;
                        data['id'] = res.rowid ? res.rowid : rowid;
                        addRow({},isSplitURL=true,data)
                        swal('Secret added sucessfully', ' ', "success");
                        totalSecrets++
                        $('#totalSecrets').text(totalSecrets);  
                    }
                    else
                    {
                        if(response.status == 400)
                            swal(response.msg, ' ', "error");
                        else
                            swal("Not able to "+clientData["operation"]+" secret", ' ', "error");
                        return false;
                    }
                })
            }
            else
            {
                swal("Not able to add secret", ' ', "error");
            }
        }
        if(clientData["operation"]=='delete')
        {
            if(response && response.status == 204)
            {
                rowid = response.rowid;
                $("#vaulttemplate #"+rowid).remove();
                swal("Secret "+clientData["operation"]+"d"+" successfully", ' ', "success");
                totalSecrets--;
                $('#totalSecrets').text(totalSecrets);  
            }
            else
            {
                if(response.status == 400)
                    swal(response.msg, ' ', "error");
                else
                    swal("Not able to "+clientData["operation"]+" secret", ' ', "error");
                return false;
            }
        }
        if(clientData["operation"]=='update')
        {
            if(response && response.status == 204)
            {
                swal("Secret "+clientData["operation"]+"d"+" successfully", ' ', "success");
                rowid = response.rowid ? response.rowid : rowid;
                $("#vaulttemplate #"+rowid).remove();
                data = {}
                data['url'] = response.url;
                data['id'] = response.rowid ? response.rowid : rowid;
                addRow({},isSplitURL=true,data)
            }
            else
            {
                swal("Not able to "+clientData["operation"]+" secret", ' ', "error");
                return false;
            }
        }
    }
}

function onUpdateSecret(data)
{
    clientData = {};
    clientData["rowid"] = data['id']
    values = (data['user']).split('/');
    document.getElementById("edit_ip").value = values[3];
    clientData["service"] = values[2]
    clientData["username"] = values[4]
    clientData["operation"] = 'update'
    clientData["ip"] = values[3];
    document.getElementById("edit-password").value = '';
    document.getElementById('edit-password-error-msg').innerHTML = " ";
   // document.getElementById('edit-password-label').style.color = '#404E67'
}
function updateSecret()
{
    data = [];
    requestData = {};
    if($("#dialog-for-editsecret #edit_ip").val() != '' && $("#dialog-for-editsecret #edit_ip").val() != clientData["ip"])
        clientData["ip"] =  $("#dialog-for-editsecret #edit_ip").val()
    if($("#dialog-for-editsecret #edit-password").val() != '')
    {
        $('#dialog-for-editsecret #updatebtn').attr('data-dismiss',"modal");
        clientData["password"] = $("#dialog-for-editsecret #edit-password").val()
        data.push(clientData)
        requestData['data'] = data;
        requestDataFromServer('/vault/vaultOperation', {'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(handleResponse);
    }
    else
    {
        $('#dialog-for-editsecret #updatebtn').attr('data-dismiss'," ");
        document.getElementById('edit-password-error-msg').innerHTML = "Field cannot be empty";
        document.getElementById('edit-password-label').style.color = '#ff9eac'
    }
}

function onDeleteSecret(user)
{
    data = [];
    requestData = {};
    clientData = {};
    values = user.split('/');
    clientData["service"] = values[2]
    clientData["ip"] = values[3];
    clientData["username"] =  values[4];
    clientData["operation"] = 'delete';
    data.push(clientData)
    requestData['data'] = data;
    swal({
		title: "Delete Secret",
		text: "Want to permanently delete this secret?",
		type: "warning",
		showCancelButton: true,
		confirmButtonClass: "btn-danger",
		confirmButtonText: "Yes, delete",
		closeOnConfirm: false
	},
	function(){
        requestDataFromServer('/vault/vaultOperation', {'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(handleResponse);
	});

}
function validation(className)
{
    var isInputFilled = checkAllfeildsfilled(className)
    if(document.getElementById("selectedservice").textContent == 'Select Service')
    {
        isInputFilled = false;
        document.getElementById('selectedservice-error-msg').innerHTML = "Field cannot be empty";
        document.getElementById('selectedservice-label').style.color =  "#ff9eac"
    }
    else
    {
        document.getElementById('selectedservice-error-msg').innerHTML = "";
       // document.getElementById('selectedservice-label').style.color = '#404E67'
    }
    return isInputFilled;
}
function getFileName()
{
    requestDataFromServer('/vault/getfilenames', {"fileName": "SERVICES"}, "GET").done(fillServicesValue);
}
function fillServicesValue(response)
{
    res = JSON.parse(response);
    if(res.status == 200)
    {
        global_all_services = res.data;
        var serviceHtml = ' ';
        if(res.data !== undefined && res.data.length > 0)
        {
            res.data.forEach(function(servicename)
            {
               // console.log("servicename-->" + servicename.replace(".j2", ""))
                serviceHtml += '<a class="select-link dropdown-item position-relative" onclick="onServiceSelect(\'' + servicename + '\')">' + servicename.replace(".j2", "")+'</a>'
            });
            $("#servicelist").append(serviceHtml);
        }
    }
    else
    {
        swal('Issue in getting services', ' ', ' error')
    }
}
function onServiceSelect(servicename)
{
    document.getElementById("selectedservice").textContent = servicename
    document.getElementById('selectedservice-error-msg').innerHTML = "";
   // document.getElementById('selectedservice-label').style.color = '#404E67'
}
function changeStatus(checkbox)
{
    if(checkbox.checked  == true)
	{
        status = 'Unsealed'; 
	}
	else
	{
        status = 'Sealed';
        checkbox.checked  == false
	}
    requestDataFromServer('/vault/changeStatus', {'status': status }, "GET").done(function(response){
        $('#vaulttemplate .switch_label').text(response.status)
        statusChanged(response.status)
        if(response.code != 200)
        {
            swal(response.msg, '', "error");
        }
    });
}
function onAddSecret()
{
    var isInputFilled = validation('vault_input_effect');
    if(isInputFilled == true)
    {
        $('#dialog-for-addsecret #addbtn').attr('data-dismiss',"modal");
        dataToserver();
    }
    else
    {
        $('#dialog-for-addsecret #addbtn').attr('data-dismiss'," ");
    }
}
function openAddsecretModal()
{
    $('.vault_input_effect').each(function (e)
    {
        id = $(this).attr('id')
        $("#dialog-for-addsecret #" + id).val('')
		//$(this).parent().find("label").css('color','#404E67');
		$(this).parent().find(".error-msg").text(' ');
    }); 
    document.getElementById("selectedservice").textContent = 'Select Service'
    document.getElementById('selectedservice-error-msg').innerHTML = "";
   // document.getElementById('selectedservice-label').style.color = '#404E67';
}