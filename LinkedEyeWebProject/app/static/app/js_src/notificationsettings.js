var jsonObj = {}
var serviceList = [];
var selectedService = ' ';

$(document).ready(function()
{
    $(".input_effect").focus(function () {
        $(this).parent().find("label").addClass("move_label");
        $(this).parent().addClass("bg_input");
    });
    $('.input_effect').focusout(function (e) {
        if ($(this).val() == '') {
            $(this).css('border-color', '#FF7588');
            $(this).parent().find("label").css('color','#ff9eac');
            $(this).parent().parent().find(".error-msg").text('Field cannot be empty');
            $(this).parent().find("label").removeClass("move_label");
            $(this).parent().removeClass("bg_input");
        }
        else {
            $(this).css('border-color', '#BABFC7'); 
            $(this).parent().find("label").css('color','#404E67');
            $(this).parent().parent().find(".error-msg").text('');
        }
    });
});
function addService()
{
    data = {};
    jsonObj = {};
	data["operation"] = 'add';
    data["servicename"] = $('#servicename').val()
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
	jsonObj["data"] = data;
	requestDataFromServer('/notificationsettings/serviceoperation', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(serviceResponse);
}
function serviceResponse(response)
{
    console.log(response)
    data = jsonObj["data"]
	
	if(response && response.status == 200)
	{
        var inputfields = document.getElementsByTagName("input");
        for (var i = 0; i < inputfields.length; i++) {
            if(inputfields[i].id)
            {
                document.getElementById(inputfields[i].id).value = '';
            }
        }
        document.getElementById('extrainputfield').style.display = "none";
        swal(response.msg, ' ', "success");
        html = ''
        html += '<a class="select-link dropdown-item" onclick="onSelectService(\''+data.servicename+'\')">'+data.servicename+'</a>'
        $("#servicelist").append(html);
    }
    else
    {
        swal(response.msg, ' ', "error");
		return;	
    }
}
function isInputRequired(checkbox)
{
	if(checkbox.checked  == true)
	{
        document.getElementById('extrainputfield').style.display = "block";
        document.getElementById("urlsyntax_label").classList.add("move_label");
        document.getElementById('fullsyntax').value = $('#syntax').val()
	}
	else
	{
        document.getElementById('extrainputfield').style.display = "none";
        document.getElementById("urlsyntax_label").classList.remove("move_label");
        document.getElementById('fullsyntax').value = ' ';
	}
}