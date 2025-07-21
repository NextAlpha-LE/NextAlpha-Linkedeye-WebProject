applicationname = "";
isEdit = false;
rowid = 1;
requestData = {};
message = $("#applicationtemplate #message")
$(document).ready(function()
{
    $("#applicationtemplate #table-view").hide();
	$('.application_input_effect').focusout(function (e) {
		if($(this).val() == '' || $(this).val() == null ) {
            $(this).parent().find("label").css('color','#ff9eac');
			$(this).parent().find(".error-msg").text('Field cannot be empty');
		}
		else{
           // $(this).parent().find("label").css('color','#404E67');
			$(this).parent().find(".error-msg").text('');
		}
    });
    getApplicationName()
});
function getApplicationName()
{
    requestDataFromServer('/applications/getallapplicationnames', {}, "GET").done(applicationNamesResponse);
}
function applicationNamesResponse(response)
{
    res = JSON.parse(response);
    if(res.status == 200)
    {
        $("#applicationtemplate #table-view").show();
        $("#applicationtemplate-nodata").hide()
        $('#selectedapplication').empty();
        var apphtml=''
        res.data.forEach(function(obj)
        {
            apphtml += '<option value="' + obj.applicationname + '-' + obj.id + '">' + obj.applicationname + '</option>'
            //addApplication(obj) 
        });
        $("#selectedapplication").append(apphtml);
    }
    else
    {
        $("#applicationtemplate #table-view").hide();
        $("#applicationtemplate-nodata").show()
        $("#applicationtemplate-nodata #tryagainbtn").prop('disabled', false);
        $("#applicationtemplate-nodata #nodatamessage").text(res.msg);
    }
}
function reloadApplications()
{
    getApplicationNames()  
}
function addApplication(obj)
{
    serviceHtml  = ' '
    serviceHtml += '<tr id ='+obj.id+'>'
    serviceHtml += '<td class="px-3 py-1">'
    serviceHtml += '</td>'
    serviceHtml += '<td class="pl-0">'+obj.applicationname+'</td>'
    serviceHtml += '<td class="p-0 action-btn">'
    serviceHtml += '<div class="dropdown custom-dropdown mr-3">'
    serviceHtml += '<button class="btn btn-default btn-ripple btn-dropdown-link dropdown-toggle icon-dropdown" type="button" id="moreoption" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > <i class="icon-more_option" style="color:#6c757d"></i> </button>'
    serviceHtml +=  '<div class="dropdown-menu" aria-labelledby="moreoption">'
    serviceHtml +=         '<a class="dropdown-item" onclick="onDeleteApplication(\''+obj.id+'\')"><i class="icon-delete2"></i>Delete</a>'
    serviceHtml +=     '</div>'
    serviceHtml += '</td>'
    serviceHtml += '</tr>'
    $("#applicationtemplate #data tbody").append(serviceHtml);
}
function onDeleteApplication()
{
    rowid = (document.getElementById("selectedapplication").value).split('-')[1];
    data = {};
    requestData = {};
    data["operation"] = 'delete'
    data["rowid"] = rowid;
    requestData['data'] = data;
    swal({
		title: "Delete Application",
		text: "Want to permanently delete this application?",
		type: "warning",
		showCancelButton: true,
		confirmButtonClass: "btn-danger",
		confirmButtonText: "Yes, delete",
		closeOnConfirm: false
	},
	function(){
        requestDataFromServer('/applications/applicationactions', {'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function(response){
            $('#cancelbtn').trigger('click');
            if(response && response.status == 200)
            {
                rowid = response.rowid;
                getApplicationName()
                $("#applicationtemplate #"+rowid).remove();
                message.text(response.msg)
                swal(response.msg, ' ', "success"); 
            }
            else
            {
                swal(response.msg, ' ', "error");
            }
        });    
	});
}
function onAddApplication()
{
    
    if($('#dialog-for-addapplication #applicationname').val() == '')
    {
        $('#dialog-for-addapplication #applicationname-label').css('color','#ff9eac');
        $('#dialog-for-addapplication #applicationname-error-msg').text('Field cannot be empty');
        return false;
    }
    else
    {
        $('#dialog-for-addapplication #applicationname-error-msg').text('');
       // $('#dialog-for-addapplication #applicationname-label').css('color','#404E67');
        requestData = {};
        data = {};
        data['applicationname'] = $('#dialog-for-addapplication #applicationname').val();
        data["operation"] = 'add'
        data["rowid"] = rowid
        requestData["data"] = data;
        $('#dialog-for-addapplication #addbtn').attr('data-dismiss', "modal");
      //  console.log('INSIDE ONADDAPPLICAION')
        requestDataFromServer('/applications/applicationactions', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(applicationResp);
    }

}
function openAddapplicationModal()
{
    //document.getElementById('applicationname-label').style.color = '#404E67'   
    document.getElementById('applicationname-error-msg').innerHTML = "";
    document.getElementById('applicationname').value = "";
}
function applicationResp(response) {
   // console.log('INSIDE APPLICATIONRESP--------->')
    data = requestData["data"]
    if (response && response.status == 200) {
        data["id"] = response.rowid;
       // console.log('<---INSIDE APPRESP IF--->')
        getApplicationName()
        //  addApplication(data)
        swal(response.msg, ' ', "success");
    }
    else {
        swal(response.msg, ' ', "error");
    }
}
function applicationResponse(response)
{
   // console.log('INSIDE APPLICATIONRESP--------->')
    data = requestData["data"]
    if(response && response.status == 200)
    {
        data["id"] = response.rowid;
      //  console.log('<---INSIDE APPRESP IF--->')
        getApplicationName()
      //  addApplication(data)
        swal(response.msg, ' ', "success"); 
    }
    else
    {
        swal(response.msg, ' ', "error");
    }
}

function exportalldata() {
    requestDataFromServer('/applications/exportnewonb', {}, "GET").done(function (response) {
        exportData(response, 'Onboard');
    });
    requestDataFromServer('/applications/exportmgmntdata', {}, "GET").done(function (response) {
        exportData(response, 'Management');
    });
    requestDataFromServer('/applications/exportsnmp', {}, "GET").done(function (response) {
        exportData(response, 'SNMP');
    });
}

function exportData(data, filename) {
    var formattedData = "";
    var expData = JSON.parse(data);
    expData.data.forEach(function (obj) {
        formattedData += Object.keys(obj).map(function (key) {
            return key + ": " + obj[key];
        }).join("\r\n") + "\r\n\r\n";
    });
    const textToBLOB = new Blob([formattedData], { type: "text/plain" });

    let newLink = document.createElement("a");
    newLink.download = filename;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
}

/*function exportalldata() {
    requestDataFromServer('/applications/exportnewonb', {}, "GET").done(exportnewonbResponse);
    requestDataFromServer('/applications/exportmgmntdata', {}, "GET").done(exportmgmntResponse);
    requestDataFromServer('/applications/exportsnmp', {}, "GET").done(exportsnmpResponse);
}

function exportnewonbResponse(response) {

    var onbdata = "";
    exponb = JSON.parse(response)
    exponb.data.forEach(function (obj) {
        onbdata += "selecthost: " + obj.selecthost + "\r\n" + "ipaddress: " + obj.ipaddress + "\r\n" + "servertype: " + obj.servertype + "\r\n" + "emailid: " + obj.emailid + "\r\n" + "servicename: " + obj.servicename + "\r\n" + "textname: " + obj.textname + "\r\n" + "pathhost: " + obj.pathhost + "\r\n" + "hostname: " + obj.hostname + "\r\n\r\n";
    });
    const textToBLOB = new Blob([onbdata], { type: "text/plain" });
    var filename = 'Onboard';
    const sFileName = filename; // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = 'Onboard';

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
}
function exportmgmntResponse(response) {
    var mgmtdata = "";
    expmgmt = JSON.parse(response)
    expmgmt.data.forEach(function (obj) {
        mgmtdata += "prototype: " + obj.prototype + "\r\n" + "iloip: " + obj.iloip + "\r\n" + "username: " + obj.username + "\r\n" + "password: " + obj.password + "\r\n" + "port: " + obj.port + "\r\n" + "ipaddress: " + obj.ipaddress + "\r\n" + "ip_id: " + obj.ip_id +"\r\n\r\n";
    });
    const textToBLOB = new Blob([mgmtdata], { type: "text/plain" });
    var filename = 'Management';
    const sFileName = filename; // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = 'Management';

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
}
function exportsnmpResponse(response) {
    var snmpdata = "";
    expsnmp = JSON.parse(response)
    expsnmp.data.forEach(function (obj) {
        snmpdata += "version: " + obj.version + "\r\n" + "ipaddress: " + obj.ipaddress + "\r\n" + "username: " + obj.username + "\r\n" + "model: " + obj.model + "\r\n" + "comm_string: " + obj.comm_string + "\r\n" + "sec_level: " + obj.sec_level + "\r\n" + "auth_method: " + obj.auth_method + "\r\n" + "auth_password: " + obj.auth_password + "\r\n" + "priv_method: " + obj.priv_method + "\r\n" + "priv_password: " + obj.priv_password + "\r\n\r\n";
    });
    const textToBLOB = new Blob([snmpdata], { type: "text/plain" });
    var filename = 'SNMP';
    const sFileName = filename; // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = 'SNMP';

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
}*/