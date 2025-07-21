var allFileNames = [];
var selectedFileName = "";
var selectedFileType = "";
var serviceIdCount = 0;
var allData = {};
var serviceNames = [];
var jsonObj = {};
var rowid = '1'
var permissions = {  // used to enable/disable permissions based on selected permission
	'VA': ['VSA'],
	'VSA':['VA','EA'],
	'EA':['ESA','VSA'],
	'ESA':['EA'],
}
var permisionOrder = ['VSA','VA','ESA','EA','DSA','DA']
var selectedPermisions = []
var roleList = [];
var permissionsOfGroup = [];
var isStoreApplication = false;
var applicationList = [];

$(document).ready(function()
{
	//--select input
	$('.select-input').focus(function () {
		document.getElementsByClassName('select-input')[0].style.color = "";
	});
	$('.select-input').focusout(function (e) {
		if($(this).val() == '' || $(this).val() == null ) {
			$(this).addClass('redborder');
			document.getElementsByClassName('select-input')[0].style.color = "#ff9eac";
			$(this).parent().find("span").text('Field cannot be empty');
		}
		else{
			$(this).removeClass('redborder');
			$(this).parent().find("span").text('');
		}
	});
	
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
	$(".add_input_effect").focus(function () {
        $(this).parent().addClass("bg_input");
    });
    $('.add_input_effect').focusout(function (e) {
		id = $(this).attr('id');
        if ($(this).val() == '') {
            $(this).css('border-color', '#FF7588');
            document.getElementById(id+'-error-msg').innerHTML = 'Field cannot be empty'
        }
        else { 
			$(this).css('border-color', '#BABFC7');
			document.getElementById(id+'-error-msg').innerHTML = ' ';
        }
    });
	$('#email').focusout(function (e) {
		isEmailValid = validateEmail()
		if(isEmailValid == false)
		{
			$(this).css('border-color', '#FF7588');
			$(this).parent().find("label").css('color','#ff9eac');
			$(this).parent().parent().find(".error-msg").text('Enter a valid Email');
		}
		else
		{
			if($('#email').val() != '')
			{
				$(this).css('border-color', '#BABFC7');
				$(this).parent().find("label").css('color','#404E67');
				$(this).parent().parent().find(".error-msg").text('');
			}
		}
	});
	$('#password1').focusout(function (e) {
		ispasswordValid = validatePassword()
		if(ispasswordValid == false)
		{
			$(this).css('border-color', '#FF7588');
			$(this).parent().find("label").css('color','#ff9eac');
			$(this).parent().parent().find(".error-msg").text('Password too short (Minimum 8 characters)');
		}
		else
		{
			if($('#email').val() != '')
			{
				$(this).css('border-color', '#BABFC7');
				$(this).parent().find("label").css('color','#404E67');
				$(this).parent().parent().find(".error-msg").text('');
			}
		}
	});
	getallGroups();
	getallPermissions();
});
function getallGroups()
{
	requestDataFromServer('/useronboard/get_all_groups', {}, "GET").done(function(response){
		res = JSON.parse(response);
		$("#role").empty();
		roleList = [];
		if(res.status == 200)
		{
			var html = "";
			html = '<option disabled=true value = "" selected>Select Role</option>'
			res.data.forEach(function(obj)
			{
				html += '<option value = "'+obj.name+'">'+obj.name+'</option>'
			});
			$("#role").append(html);
			roleList = res.data;
		}
		else
		{
			swal(res.error_msg,' ', 'error')
		}

	})
}
function getallPermissions()
{
	requestDataFromServer('/useronboard/getallPermissions', {}, "GET").done(handlePermissionsResponse);
}
function getGroupPermissions(weightage)
{
	var userPermissions = [];
	var binaryValue = parseInt(weightage, 10).toString(2)	
	while(binaryValue.length < permisionOrder.length)
	{
		binaryValue = '0'+binaryValue;
	}
	for (let i = permisionOrder.length-1; i >=0 ; i--) 
	{
		if(binaryValue[i] == 1)
		{
			userPermissions.push(permisionOrder[i])
		}
	}
	return userPermissions;
}
function onRoleSelect(select)
{
	permissionsOfGroup = [];
	var role = $(select).val();
	var weightage = roleList.filter(x => x.name == role)[0].weightage;
	permissionsOfGroup = getGroupPermissions(weightage)
	if(permissionsOfGroup.indexOf('ESA') > -1 || permissionsOfGroup.indexOf('VSA') > -1)
	{
		document.getElementById('application-select-div').style.display = "block";	
		$('#multi-select-application').multipleSelect('uncheckAll') 
	}
	else
	{
		document.getElementById('application-select-div').style.display = "none";
	}
}
function handlePermissionsResponse(response)
{
    res = JSON.parse(response);
    if(res.status == 200)
    {
		var html = "";
		// $("#permission").empty();
        res.data.forEach(function(obj)
        {
			html += '<div class="custom-control custom-checkbox">'
            html +=      '<input type="checkbox" name="type" class="custom-control-input" id="'+obj.codename+'" onchange="clickedOnPermission(this)">'
            html +=       '<label class="custom-control-label" for="'+obj.codename+'">'+obj.name+'</label>'
            html += '</div>'
        });
		$("#permission").append(html);
		getApplicationNames();
    }
    else
    {
		swal('Failure in getting permissions ',' ', 'error')
    }
}
function openAddrolesDialog()
{
	document.getElementById('rolename').value = '';
	selectedPermisions = [];
	$("input:checkbox[name=type]").each(function(){
		document.getElementById($(this).attr('id')).checked = false;
		document.getElementById($(this).attr('id')).disabled = false;
	});
}
function clickedOnPermission(checkbox)
{
	id = $(checkbox).attr("id")
	temp = permissions[id]
	if(checkbox.checked)
	{
		if (selectedPermisions.indexOf(id) == -1)
			selectedPermisions.push(id)
		temp.forEach(function(value)
		{
			var element = document.getElementById(value)
			element.disabled = true;
			if(element.checked)
				element.checked = false;
		});
	}
	else
	{
		selectedPermisions.splice(selectedPermisions.indexOf(id), 1);
		temp.forEach(function(value)
		{
			var element = document.getElementById(value)
			element.disabled = false;
		});	
	}
}
function clickedOnApplication(checkbox)
{
	id = $(checkbox).attr("id")
	var obj = applicationList.filter(x => x.id == id)
	if(checkbox.checked)
	{
		obj[0].weightage = parseInt('11', 2).toString(10); // 11 = VSA ESA
	}
	else
	{
		obj[0].weightage = parseInt('10', 2).toString(10); // 10 = VSA ESA
	}
}
function saveEditapplications()
{
	jsonObj["data"]['isStoreApplication'] = true;
	jsonObj["data"]['applications'] = applicationList;
	$('#yesbtn').attr('data-dismiss',"modal");
	requestDataFromServer('/onboard/useronboard/', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(useronboardResponse);
}
function addRole()
{
	var perminssionbinaryValue = ''
	for (let i = permisionOrder.length - 1; i >=0 ; i--) {
		if (selectedPermisions.indexOf(permisionOrder[i]) != -1)
		{
			perminssionbinaryValue = '1'+perminssionbinaryValue;
		}
		else
		perminssionbinaryValue = '0'+perminssionbinaryValue;
	}
	jsonObj = {};
	data = {};
	if($("#rolename").val() != '')
    {
        $('#applybtn').attr('data-dismiss',"modal");
		data["rolename"] = $("#rolename").val()
		data["weightage"] = parseInt(perminssionbinaryValue, 2).toString(10);
		jsonObj["data"] = data;
		requestDataFromServer('/useronboard/addRoles', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(addRoleResponse);
    }
    else
    {
        document.getElementById('rolename-error-msg').innerHTML = "Field cannot be empty";
        document.getElementById('rolename').style.borderBottomColor = '#FF7588'
    }
}
function addRoleResponse(response)
{
	res = JSON.parse(response);
    if(res.status == 400)
    {
		swal(res.error_msg, ' ', "error");	
	}
	else
	{
		if(roleList.indexOf('res.data.rolename') == -1)
		{
			var data = {}
			data['name'] = res.data.rolename
			data['weightage'] = res.data.weightage;
			roleList.push(data)
		}
		var html = '';
		html += '<option value="'+res.data.rolename+'">'+res.data.rolename+'</option>';
		$("#role").append(html);	
		swal('Role added successfully', ' ', "success");
	}
}
function getApplicationNames()
{
    requestDataFromServer('/applications/getallapplicationnames', {}, "GET").done(handleApplicationNamesResponse);
}
function handleApplicationNamesResponse(response)
{
    res = JSON.parse(response);
    if(res.status == 200)
    {
		var html = "";
		$("#multi-select-application").empty();
        res.data.forEach(function(obj)
        {
			html += '<option value="'+obj.id+'-'+obj.applicationname+'">'+obj.applicationname+'</option>';
        });
		$("#multi-select-application").append(html);
		registerMultiSelect()
    }
    else
    {
        swal('Failure in geting application names',' ', 'error')
    }
}
function registerMultiSelect()
{
	$('#multi-select-application').multipleSelect(
	{
		placeholder: 'Select Application',
		showClear: true,
		selectAll: false
	});
}
function validateEmail()
{
	isEmailValid = true;
	var regemail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
	email = $('#email').val().trim()
	if(email != '' && (!regemail.test(email)))
	{
		isEmailValid = false;
	}
	else
	{
		isEmailValid = true;	
	}
	return isEmailValid;
}
function validatePassword()
{
	ispasswordValid = true;
	var regpassword = new RegExp("^[a-z0-9@#$%^&*]{8,}$");
	if($('#password1').val() != '' && (!regpassword.test($('#password1').val())))
	{
		ispasswordValid = false;
	}
	else
	{
		ispasswordValid = true;	
	}
	return ispasswordValid;
}
function submitdetails()
{
	var allFeildValid = validation('input_effect');
	if(allFeildValid)
	{
		console.log("submitdetails feildvalid");
		isEmailValid = validateEmail();
		ispasswordValid = validatePassword()
		if(isEmailValid == false)
		{
			document.getElementById("email_label").style.color = '#ff9eac';
			document.getElementById('email-error-msg').innerHTML = "Enter a valid Email";
			document.getElementById('email').style.borderBottomColor = '#FF7588'
		}
		
		else if(ispasswordValid == false)
		{
			document.getElementById("password1_label").style.color = '#ff9eac';
			document.getElementById('password1-error-msg').innerHTML = "Password too short (Minimum 8 characters)";
			document.getElementById('password1').style.borderBottomColor = '#FF7588'
		}
		else
		{
			if(permissionsOfGroup.indexOf('ESA') > -1 || permissionsOfGroup.indexOf('VSA') > -1)
			{
				applicationList = [];
				var selectedApplication = $('#multi-select-application').multipleSelect('getSelects');
				selectedApplication.forEach(function(obj)
				{
					tempObj = obj.split('-')
					application = {}
					application['id'] = tempObj[0]
					application['applicationname'] = tempObj[1] 
					application['weightage'] = parseInt('10', 2).toString(10);    //10 = VSA ESA
					applicationList.push(application)
				});
				if(permissionsOfGroup.indexOf('ESA') > -1)
				{
					if(applicationList.length > 0)
					{
						var html = "";
						$("#applications").empty();
						applicationList.forEach(function(obj)
						{
							html += '<div class="custom-control custom-checkbox">'
							html +=      '<input type="checkbox" name="type" class="custom-control-input application-checkbox" id="'+obj.id+'" onchange="clickedOnApplication(this)" checked>'
							html +=       '<label class="custom-control-label" for="'+obj.id+'">'+obj.applicationname+'</label>'
							html += '</div>'
							obj.weightage = parseInt('11', 2).toString(10); // 11= VSA ESA
						});
						$("#applications").append(html);
						$('#submit').attr('data-toggle',"modal");
						$('#submit').attr('data-target',"#dialog-for-application");
					}
				}
			}
			else
				isStoreApplication = false;
			data = {};
			data['firstname'] = $('#firstname').val()
			data['lastname'] = $('#lastname').val()
			data['email'] = $('#email').val()
			data['password1'] = $('#password1').val()
			data['role'] = $('#role').val()
			data["operation"] = 'register'
			data['isStoreApplication'] = isStoreApplication;
			data['applications'] = applicationList;
			jsonObj["data"] = data;
			if(permissionsOfGroup.indexOf('ESA') == -1)
			{
				requestDataFromServer('/onboard/useronboard/', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(useronboardResponse);
			}
		}
	}
	else
	{	
		$(this).css('border-color', '#FF7588');
		$(this).parent().find("label").css('color','#ff9eac');
		$(this).parent().parent().find(".error-msg").text('Field cannot be empty');
		if($('#role').val() == '' || $('#role').val() == null)
		{
			document.getElementsByClassName('select-input')[0].style.color = "#ff9eac";
			document.getElementById('role-error-msg').innerHTML = 'Field cannot be empty'
			$(this).addClass('redborder');
		}
	}
	
}

function useronboardResponse(response)
{
	data = jsonObj["data"]
	
	if(response && response.status == 400)
	{
		swal(response.msg, ' ', "error");
		return;	
	}
	else
	{
		if(response && response.status != 500)
		{
			$("#"+response.rowid).remove();	
			var inputfields = document.getElementsByTagName("input");
			for (var i = 0; i < inputfields.length; i++) {
				if(inputfields[i].id)
				{
					// document.getElementById(inputfields[i].id+'_label').classList.add("move_label");
					document.getElementById(inputfields[i].id).value = '';
				}
			}
			document.getElementById('role').value = '';
			document.getElementById('application-select-div').style.display = "none";
			swal(response.msg, ' ', "success");
		}

		if(response && response.status != 500 && data["operation"] == 'register')
		{
			var serviceHtml = '';
			rowid = response.rowid;
			serviceHtml +=      '<tr id='+rowid+'>'
			serviceHtml +=          '<td>'+data.firstname+'</td>'
			serviceHtml +=          '<td>'+data.lastname+'</td>'
			serviceHtml +=          '<td>'+data.email+'</td>'  
			serviceHtml +=          '<td>'
			serviceHtml += 				'<label class="toggleSwitch large position-absolute" onclick="">'
			serviceHtml += 					'<input type="checkbox" id ="'+rowid+'_status" onchange="clickOnStatus(this, \''+rowid+'\')">'
			serviceHtml +=                  '<span>'
			serviceHtml += 					    '<span class="switch_label" id=switch_label_'+rowid+'>Enable</span>'
			serviceHtml +=                 '</span>'
			serviceHtml += 			       '<a></a>'
			serviceHtml +=				'</label>'
			serviceHtml +=          '</td>'
			serviceHtml +=           '<td>'
			serviceHtml +=               '<button type="button" class="btn-ripple position-absolute" style="top:5px" onclick="onDelete(\''+rowid+'\')"><i class="icon-delete"></i></button>'  
			serviceHtml +=           '</td>'
			serviceHtml +=      '</tr>'
			html = $("#data tbody").append(serviceHtml);
		}
		if(response.status == 500)
		{
			swal(response.msg, ' ', "error");
		}
	}
}

function onDelete(id)
{
	data = {};
	data["operation"] = 'delete'
	data["rowid"] = id;
	jsonObj["data"] = data;
	swal({
		title: "Delete User",
		text: "Want to permanently delete this user?",
		type: "warning",
		showCancelButton: true,
		confirmButtonClass: "btn-danger",
		confirmButtonText: "Yes, delete",
		closeOnConfirm: false
	},
	function(){
		requestDataFromServer('/onboard/useronboard/', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(useronboardResponse);
	});
}

function deleteEntry()
{
	requestDataFromServer('/onboard/useronboard/', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(useronboardResponse);
}

function validation(className)
{
	var allFeildValid = true;
	$('.'+className).each(function (e)
    {
        if ($(this).val() == '' || $(this).val() == null)
        {
            $(this).css('border-color', '#FF7588');
			$(this).parent().find("label").css('color','#ff9eac');
			$(this).parent().parent().find(".error-msg").text('Field cannot be empty');
            allFeildValid = false;
        }
        else
        {
			$(this).css('border-color', '#BABFC7');
			$(this).parent().find("label").css('color','#404E67');
			$(this).parent().parent().find(".error-msg").text(' ');
		}
	});
	$('.select-input').each(function (e) {
		if($(this).val() == '' || $(this).val() == null ) {
			$(this).addClass('redborder');
			document.getElementsByClassName('select-input')[0].style.color = "#ff9eac";
			$(this).parent().find("span").text('Field cannot be empty');
			allFeildValid = false;
		}
		else{
			$(this).removeClass('redborder');
			document.getElementsByClassName('select-input')[0].style.color = '#404E67';
			$(this).parent().find("span").text('');
			
		}
	});
	if(document.getElementById("application-select-div").style.display == 'block')
	{
		var applications = $('#multi-select-application').multipleSelect('getSelects');
		if(applications.length ==0)
		{
			document.getElementById('multi-select-application').style.color = "#ff9eac";
			document.getElementById('multi-select-application-error-msg').innerHTML = 'Field cannot be empty'		
		}
		else
		{
			document.getElementById('multi-select-application').style.color = "#404E67";
			document.getElementById('multi-select-application-error-msg').innerHTML = ' '
		}
	}
    return allFeildValid;
}
function closeDiv(divId)
{
	$('.'+'Service_'+divId).remove();
	delete allData["Service_"+divId];
}
$(".toggle-password").click(function () 
{
    $(this).toggleClass("icon-show");
    if ($('#password1').attr("type") == "password") 
    {
        $('#password1').attr("type", "text");
    } 
    else 
    {
        $('#password1').attr("type", "password");
    }
});
function clickOnStatus(checkbox, id)
{
	data = {};
	jsonObj = {};
	data["operation"] = 'changestatus';
	data["rowid"] = id;
	rowid = id;
    if(checkbox.checked  == true)
	{
        data["status"] = 'enable'; 
	}
	else
	{
		data["status"] = 'disable';
        checkbox.checked  == false
	}
	jsonObj["data"] = data;
	requestDataFromServer('/onboard/useronboard/', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(function(response){
		if(response && response.status == 400)
		{
			swal(response.msg, ' ', "error");
			return;	
		}
		else
		{
			$('#switch_label_'+id).text(response.msg)
			response.msg == 'Enable' ? document.getElementById(rowid+'_status').checked = false:document.getElementById(rowid+'_status').checked = true;
			if(response.code == 500)
			{
				swal(response.errorMsg, ' ', "error");
			}
		}
	});
}