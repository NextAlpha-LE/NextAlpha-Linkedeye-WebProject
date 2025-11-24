var allData = {};
var jsonObj = {};
var rowid = '1'
var permissions = {  // used to enable/disable permissions based on selected permission
	'VA': ['VSA'],
	'VSA': ['VA', 'EA'],
	'EA': ['ESA', 'VSA'],
	'ESA': ['EA'],
}
var permisionOrder = ['VSA', 'VA', 'ESA', 'EA', 'DSA', 'DA']
var selectedPermisions = []
var roleList = [];
var permissionsOfGroup = [];
var isStoreApplication = false;
var applicationList = [];
var userList;
var isEdit = false;
var selectedRowid = 0;
var totalUsers = 0;

$(document).ready(function () {
	$("#usertemplate #table-view").hide();
	$("#dialog-for-adduser .input_effect").focus(function () {
		inputFocusIn($(this))
	});
	$('#dialog-for-adduser .input_effect').focusout(function (e) {
		inputFocusOut($(this))
	});
	$('#dialog-for-adduser #email').focusout(function (e) {
		isEmailValid = validateEmails()
		if (isEmailValid == false) {
			$(this).parent().find("label").css('color', '#ff9eac');
			$(this).parent().find(".error-msg").text('Enter a valid Email');
		}
		else {
			if ($('#email').val() != '') {
				//	$(this).parent().find("label").css('color','#404E67');
				$(this).parent().find(".error-msg").text('');
			}
		}
	});
	$('#dialog-for-adduser #password').focusout(function (e) {
		ispasswordValid = validatePassword()
		if (ispasswordValid == false) {
			$(this).parent().find("label").css('color', '#ff9eac');
			$(this).parent().find(".error-msg").text('Password too short (Minimum 8 characters)');
		}
		else {
			if ($('#passwords').val() != '') {
				//	$(this).parent().find("label").css('color','#404E67');
				$(this).parent().find(".error-msg").text('');
			}
		}
	});
	getuserlist();
	getallGroups();
	getallPermissions();
	getAllSite();
});
function getAllSite() {
	requestDataFromServer('/lesites/getallsitenames', { type: 'all' }, "GET").done(function (response) {
		res = JSON.parse(response);
		if (res.status == 200) {
			var html = "";
			$("#multi-select-site").empty();
			$("#edit-multi-select-site").empty();
			res.data.forEach(function (obj) {
				html += '<option value="' + obj.id + '">' + obj.sitename + '</option>';
			});
			$("#multi-select-site").append(html);
			$("#edit-multi-select-site").append(html);
			registerMultiSelectSite()
		}
		else {
			//swal('Failure in geting site names',' ', 'error')
		}
	})
}
function getuserlist() {
	requestDataFromServer('/useronboard/getuserlist', {}, "GET").done(function (response) {
		$("#usertemplate #data tbody").empty();
		res = JSON.parse(response);
		if (res.status == 200) {
			serviceHtml = ''
			$("#usertemplate #table-view").show();
			$("#usertemplate-nodata").hide()
			res.data.forEach(function (obj) {
				totalUsers++;
				addUserRow(obj)
			});
			$('#totalUsers').text(totalUsers)
			let options = {
				valueNames: [
					'firstname',
					'email',
					{ name: 'date', attr: 'data-timestamp' }
				]
			};
			userList = new List('usertemplate', options);
		}
		else {
			$("#usertemplate #table-view").hide();
			$("#usertemplate-nodata").show()
			$("#usertemplate-nodata #tryagainbtn").prop('disabled', false);
			$("#usertemplate-nodata #nodatamessage").text(res.error_msg);
		}
	})
}
function onRecentlyAdd() {
	userList.sort('date', { order: "desc" })
}
function reloadUsers() {
	getuserlist()
}
function addUserRow(obj) {
	if (obj.date_joined)
		var datejoined = new Date(obj.date_joined * 1000).toLocaleDateString("en-US")
	else
		var datejoined = new Date().toLocaleDateString("en-US")
	serviceHtml = ' '
	serviceHtml += '<tr class="collapse-tr"  id =' + obj.id + '>'
	serviceHtml += '<td class="px-3 py-1 profile-td">'
	serviceHtml += '<div class="profile">'
	serviceHtml += '<img src="../static/app/images/profile.png"/>'
	serviceHtml += '</div>'
	serviceHtml += '</td>'
	serviceHtml += '<td class="pl-0 firstname" id="' + obj.id + '-firstname">' + obj.firstname + '</td>'
	serviceHtml += '<td class="email">' + obj.email + '</td>'
	serviceHtml += '<td class="date" data-timestamp="' + obj.date_joined + '" style="display:none;">' + datejoined + '</td>'
	serviceHtml += '<td>'
	serviceHtml += '<label class="toggleSwitch large position-absolute" onclick="">'
	if (obj.is_active == undefined) {
		serviceHtml += '<input type="checkbox" id =' + obj.id + '_status onchange="clickOnStatus(this, \'' + obj.id + '\')"/>'
		serviceHtml += '<span>'
		serviceHtml += '<span class="switch_label" id="switch_label_' + obj.id + '"></span>'
	}
	else {
		html = ''
		html = '<input type="checkbox" id =' + obj.id + '_status onchange="clickOnStatus(this, \'' + obj.id + '\')"'
		if (!obj.is_active)
			html += 'checked'
		if (obj.email == 'admin')
			html += 'disabled'
		serviceHtml += html + '/>'
		serviceHtml += '<span>'
		if (obj.is_active) {
			serviceHtml += '<span class="switch_label" id="switch_label_' + obj.id + '"></span>'
		}
		else {
			serviceHtml += '<span class="switch_label" id="switch_label_' + obj.id + '"></span>'
		}
	}
	serviceHtml += '</span>'
	serviceHtml += '<a></a>'
	serviceHtml += '</label>'
	serviceHtml += '</td>'
	serviceHtml += '<td class="p-lg-0 px-4 py-1 action-btn">'
	serviceHtml += '<button class="btn btn-default btn-ripple accordion-toggle ml-2" data-toggle="collapse" data-target="#user-detail-' + obj.id + '" onclick="userInfo(' + obj.id + ')">'
	serviceHtml += '<i class="icon-select" style="color:#6c757d"></i>'
	serviceHtml += '</button>'
	serviceHtml += '<div class="dropdown custom-dropdown mr-3">'
	serviceHtml += '<button class="btn btn-default btn-ripple btn-dropdown-link dropdown-toggle icon-dropdown" type="button" id="moreoption" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
	serviceHtml += '<i class="icon-more_option" style="color:#6c757d"></i>'
	serviceHtml += '</button>'
	serviceHtml += '<div class="dropdown-menu" aria-labelledby="moreoption">'
	obj.email == 'admin' ? display = 'none' : display = 'block'
	serviceHtml += '<a class="dropdown-item" onclick="onUpdateUser({\'firstname\':\'' + obj.firstname + '\',\'id\':\'' + obj.id + '\',\'role\':\'' + obj.role + '\'})\" data-toggle="modal" data-target="#dialog-for-edituser"><i class="icon-edit2"></i>Edit</a>'
	serviceHtml += '<a class="dropdown-item" onclick="onDeleteUser(' + obj.id + ')" style="display:' + display + '"><i class="icon-delete"></i>Delete</a>'
	serviceHtml += '</div>'
	serviceHtml += '</div>'
	serviceHtml += '</td>'
	serviceHtml += '<tr></tr>'
	serviceHtml += '<tr class="border-0 collapse-content">'
	serviceHtml += '<td colspan="12" class="hiddenRow border-0">'
	serviceHtml += '<div class="accordian-body collapse col-12 border-b" id="user-detail-' + obj.id + '">'
	serviceHtml += '<div class="row  py-lg-4 py-2 bg">'
	serviceHtml += '<div class="col-5 border-r">'
	serviceHtml += '<div class="row">'
	serviceHtml += '<div class="col-6 my-auto">'
	serviceHtml += '<p class="mb-1 size12 bold-text">Role</p>'
	serviceHtml += '<p class="mb-2 size13" id="' + obj.id + '-userrole">' + obj.role + '</p>'
	serviceHtml += '</div>'
	serviceHtml += '<div class="col-6 my-auto">'
	serviceHtml += '<p class="mb-1 size12 bold-text">Added on</p>'
	serviceHtml += '<p class="mb-2 size13 date" data-timestamp="' + obj.date_joined + '">' + datejoined + '</p>'
	serviceHtml += '</div>'
	serviceHtml += '</div>'
	serviceHtml += '</div>'
	serviceHtml += '<div class="col-7 my-auto d-flex cursor-pointer" id="user-ticketinfo">'
	serviceHtml += '</div>'
	serviceHtml += '</div>'
	serviceHtml += '</div>'
	serviceHtml += '</td>'
	serviceHtml += '</tr>'
	serviceHtml += '</tr>'
	siteHtml += '<tr></tr>'

	//	console.log("obj.firstname-->" + obj.firstname)
	$("#usertemplate #data tbody").append(serviceHtml)

	/*var userhtml = ''
	userhtml = '<div class="text">'+ obj.firstname+'</div>'
	$("#userdata").append(userhtml)*/

}
function onUpdateUser(obj) {
	isEdit = true;
	selectedRowid = obj.id;
	requestDataFromServer('/lesites/getallsitenames', { 'userId': JSON.stringify(selectedRowid), csrfmiddlewaretoken: csfr_token }, type = "post").done(function (response) {
		var selectedsites = []
		res = JSON.parse(response);
		if (res.status == 200) {
			selectedsites = res.data
			//console.log("onUpdateUser--->" + selectedsites)
			//console.log("onUpdateUser--->" + JSON.stringify(selectedsites))
			$('#edit-multi-select-site').multipleSelect('setSelects', selectedsites)
		}
	});
	// Clear edit subsite data
	if (typeof window.getEditSubSiteData === 'function') {
		window.loadEditSubSiteData(selectedRowid);
	}
	id = obj['id'] + '-firstname'
	$("#dialog-for-edituser #edit_firstname").val($('#usertemplate #' + id).text().trim())
	id = obj['id'] + '-userrole'
	$('.edit-input_effect').each(function (e) {
		$(this).parent().find("label").css('color', '#ffffff');
		$(this).parent().find(".error-msg").text(' ');
	});
	$('#edit_role-error-msg').text(' ')
	//$('#edit_role-label').css('color', '#404E67')
	onRoleSelect($('#usertemplate #' + id).text().trim())
	$('#edit').css('display', 'block');
	$('#dialog-for-edituser #dialog-for-application').css('display', 'none');
}
function userInfo(id) {
	//console.log("userInfo--->" + id)
	if ($("#usertemplate #user-detail-" + id + " #user-ticketinfo").html() == '') {
		var totalTickets = 0;
		requestDataFromServer('/useronboard/gettickets', { "assigned_to_id": id }, "GET").done(function (response) {
			if (response.status == 200) {
				if (response.totalTickets != "None")
					totalTickets = response.totalTickets;
				$("#usertemplate #user-detail-" + id + " #user-ticketinfo").empty()
				serviceHtml = ' '
				serviceHtml += '<span class="size10 bold-text">Tickets <span class="secondary-text bold-text size14">(' + totalTickets + ')</span></span>'
				if (response.ticketStatusList.length) {
					serviceHtml += '<div class="ml-3 progress-overview d-flex mt-2" style="height:10px;width:100%">'
					html = ' '
					response.ticketStatusList.forEach(function (obj) {
						percenatge = Math.floor((Number(obj.issuecount) / Number(totalTickets)) * 100)
						obj.name == 'In Progress' ? status = 'Progress' : status = obj.name;
						html += '<span class="open ' + status + '-bg d-block" style="width:' + percenatge + '%;height:100%" data-toggle="tooltip" title="' + obj.name + '(' + percenatge + '%)"></span>'
					});
					serviceHtml += html
					serviceHtml += '</div>'
				}
			}
			else {
				serviceHtml = ' '
				serviceHtml += '<span class="size10 bold-text">Tickets <span class="secondary-text bold-text size14">(' + totalTickets + ')</span></span>'
			}
			$("#usertemplate #user-detail-" + id + " #user-ticketinfo").append(serviceHtml)
		});
	}
}
function clickOnaddrole() {
	document.getElementById('rolename').value = ''
	//$('#v-pills-role #rolename-label').css('color','#55a8fd	')
	$('#v-pills-role #rolename-error-msg').text(' ')
	$('.input_effect').each(function (e) {
		id = $(this).attr('id')
		document.getElementById(id).value = ''
		//	$(this).parent().find("label").css('color','#404E67');
		$(this).parent().find(".error-msg").text(' ');
	});
	permisionOrder.forEach(function (permision) {
		if (document.getElementById(permision) != null && document.getElementById(permision).checked) {
			document.getElementById(permision).checked = false;
		}
	});
}
function getallGroups() {
	requestDataFromServer('/useronboard/get_all_groups', {}, "GET").done(function (response) {
		res = JSON.parse(response);
		//console.log("role--->" + JSON.stringify(res))
		$("#rolelist").empty();
		$("#edit_rolelist").empty();
		roleList = [];
		if (res.status == 200) {
			var html = "";
			res.data.forEach(function (obj) {
				//if (obj.name != 'Admin') uncommand if no need of Admin access
					html += '<a class="select-link dropdown-item position-relative" onclick="onRoleSelect(\'' + obj.name + '\')">' + obj.name + '</a>'
			});
			$("#rolelist").append(html);
			$("#edit_rolelist").append(html);
			roleList = res.data;
		}
		else {
			swal(res.error_msg, ' ', 'error')
		}

	})
}
function getallPermissions() {
	requestDataFromServer('/useronboard/getallPermissions', {}, "GET").done(handlePermissionsResponse);
}
function getGroupPermissions(weightage) {
	var userPermissions = [];
	var binaryValue = parseInt(weightage, 10).toString(2)
	while (binaryValue.length < permisionOrder.length) {
		binaryValue = '0' + binaryValue;
	}
	for (let i = permisionOrder.length - 1; i >= 0; i--) {
		if (binaryValue[i] == 1) {
			userPermissions.push(permisionOrder[i])
		}
	}
	return userPermissions;
}
function onRoleSelect(role) {
	if (isEdit == false) {
		document.getElementById("role").textContent = role
		id = 'multi-select-application'
		applicationdivid = 'application-select-div'
		$('#role-error-msg').text('');
		//	$('#role-label').css('color', '#404E67');
	}
	else {
		document.getElementById("edit_role").textContent = role
		id = 'edit-multi-select-application'
		applicationdivid = 'edit-application-select-div'
		$('#edit_role-error-msg').text('');
		//$('#edit_role-label').css('color', '#404E67');
	}
	permissionsOfGroup = [];
	var weightage = roleList.filter(x => x.name == role)[0].weightage;
	permissionsOfGroup = getGroupPermissions(weightage)
	if (permissionsOfGroup.indexOf('ESA') > -1 || permissionsOfGroup.indexOf('VSA') > -1) {
		document.getElementById(applicationdivid).style.display = "block";
		$('#' + id).multipleSelect('uncheckAll')
		$('#multi-select-application-error-msg').text(' ');
		//$('#multi-select-application-label').css('color', "#404E67");
	}
	else {
		document.getElementById(applicationdivid).style.display = "none";
	}
}
function handlePermissionsResponse(response) {
	res = JSON.parse(response);
	if (res.status == 200) {
		var html = "";
		// $("#permission").empty();
		res.data.forEach(function (obj) {
			html += '<label class="checkbox-container" for="' + obj.codename + '">' + obj.name
			html += '<input type="checkbox" id="' + obj.codename + '" onchange="clickedOnPermission(this)"/>'
			html += '<span class="checkmark"></span>'
			html += '</label>'
		});
		$("#permission").append(html);
		getApplicationNamesforUser();
	}
	else {
		swal('Failure in getting permissions ', ' ', 'error')
	}
}
function openAddrolesDialog() {
	document.getElementById('rolename').value = '';
	selectedPermisions = [];
	$("input:checkbox[name=type]").each(function () {
		document.getElementById($(this).attr('id')).checked = false;
		document.getElementById($(this).attr('id')).disabled = false;
	});
}
function clickedOnPermission(checkbox) {
	id = $(checkbox).attr("id")
	temp = permissions[id]
	if (checkbox.checked) {
		if (selectedPermisions.indexOf(id) == -1)
			selectedPermisions.push(id)
		temp.forEach(function (value) {
			var element = document.getElementById(value)
			element.disabled = true;
			if (element.checked)
				element.checked = false;
		});
	}
	else {
		selectedPermisions.splice(selectedPermisions.indexOf(id), 1);
		temp.forEach(function (value) {
			var element = document.getElementById(value)
			element.disabled = false;
		});
	}
}
function clickedOnApplication(checkbox) {
	id = $(checkbox).attr("id")
	var obj = applicationList.filter(x => x.id == id)
	if (checkbox.checked) {
		obj[0].weightage = parseInt('11', 2).toString(10); // 11 = VSA ESA
	}
	else {
		obj[0].weightage = parseInt('10', 2).toString(10); // 10 = VSA ESA
	}
}
function saveEditapplications() {
	jsonObj["data"]['isStoreApplication'] = true;
	jsonObj["data"]['applications'] = applicationList;
	$('#savebtn').attr('data-dismiss', "modal");
	$('#dialog-for-edituser #edit-savebtn').attr('data-dismiss', "modal");
	requestDataFromServer('/useronboard/useroperations/', { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(useronboardResponse);
}
function addRole() {
	var perminssionbinaryValue = ''
	for (let i = permisionOrder.length - 1; i >= 0; i--) {
		if (selectedPermisions.indexOf(permisionOrder[i]) != -1) {
			perminssionbinaryValue = '1' + perminssionbinaryValue;
		}
		else
			perminssionbinaryValue = '0' + perminssionbinaryValue;
	}
	jsonObj = {};
	data = {};
	if ($("#v-pills-role #rolename").val() != '') {
		$('#addrole').attr('data-dismiss', "modal");
		data["rolename"] = $("#rolename").val()
		data["weightage"] = parseInt(perminssionbinaryValue, 2).toString(10);
		jsonObj["data"] = data;
		requestDataFromServer('/useronboard/addRoles', { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(addRoleResponse);
	}
	else {
		$('#v-pills-role #rolename-label').css('color', '#ff9eac')
		$('#v-pills-role #rolename-error-msg').text('Field cannot be empty')
	}
}
function addRoleResponse(response) {
	res = JSON.parse(response);
	if (res.status == 400) {
		swal(res.error_msg, ' ', "error");
	}
	else {
		if (roleList.indexOf('res.data.rolename') == -1) {
			var data = {}
			data['name'] = res.data.rolename
			data['weightage'] = res.data.weightage;
			roleList.push(data)
		}
		var html = '';
		html += '<a class="select-link dropdown-item position-relative" onclick="onRoleSelect(\'' + res.data.rolename + '\')">' + res.data.rolename + '</a>'
		$("#rolelist").append(html);
		$("#edit_rolelist").append(html);
		swal('Role added successfully', ' ', "success");
	}
}
function getApplicationNamesforUser() {
	requestDataFromServer('/applications/getallapplicationnames', {}, "GET").done(applicationNames);
}
function applicationNames(response) {
	res = JSON.parse(response);
	if (res.status == 200) {
		var html = "";
		$("#multi-select-application").empty();
		$("#edit-multi-select-application").empty();
		res.data.forEach(function (obj) {
			html += '<option value="' + obj.id + '-' + obj.applicationname + '">' + obj.applicationname + '</option>';
		});
		$("#multi-select-application").append(html);
		$("#edit-multi-select-application").append(html);
		registerMultiSelect()
	}
	else {
		swal('Failure in getting application names', ' ', 'error')
	}
}
function registerMultiSelect() {
	$('#multi-select-application').multipleSelect(
		{
			placeholder: 'Select Application',
			showClear: true,
			selectAll: false
		});
	$('#edit-multi-select-application').multipleSelect(
		{
			placeholder: 'Select Application',
			showClear: true,
			selectAll: false
		});
}
function registerMultiSelectSite() {
	$('#multi-select-site').multipleSelect(
		{
			placeholder: 'Select Site',
			showClear: true,
			selectAll: true
		});
	$('#edit-multi-select-site').multipleSelect(
		{
			placeholder: 'Select Site',
			showClear: true,
			selectAll: true
		});
}
function validateEmails() {
	try {
		//console.log("=== Entered validateEmail ===");

		isEmailValid = true;
		var regemail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");

		const emailInput = $('#email');
		if (emailInput.length === 0) {
			//console.error("Email input field not found in DOM.");
			return false;
		}

		email = emailInput.val().trim();
		//console.log("email---->" + email);

		if (email != '' && (!regemail.test(email))) {
			//console.log("email--false-->");
			isEmailValid = false;
		} else {
			//console.log("email--true-->");
			isEmailValid = true;
		}
		return isEmailValid;

	} catch (err) {
		//console.error("Error in validateEmail():", err);
		return false;
	}
}
function validatePassword() {
	ispasswordValid = true;
	var regpassword = new RegExp("^[a-zA-Z0-9@#$%^&*]{8,}$");
	if ($('#passwords').val() != '' && (!regpassword.test($('#passwords').val()))) {
		ispasswordValid = false;
	}
	else {
		ispasswordValid = true;
	}
	return ispasswordValid;
}
function submitdata() {

	if (isEdit == false) {
		var allFeildValid = inputValidation('input_effect');
	}
	if (allFeildValid || isEdit == true) {
		if (typeof validateEmail === 'function') {
			isEmailValid = validateEmails();
		} else {
			console.error("validateEmail is not a function! Check for reassignment.");
		}
		ispasswordValid = validatePassword()
		if ((isEmailValid == false || ispasswordValid == false) && isEdit == false) {
			if (isEmailValid == false) {
				$("#email_label").css('color', '#ff9eac');
				$('#email-error-msg').text("Enter a valid Email");
			}
			if (ispasswordValid == false) {
				$("#password_label").css('color', '#ff9eac');
				$('#password-error-msg').text("Password too short (Minimum 8 characters)");
			}
		}
		else {
			if (permissionsOfGroup.indexOf('ESA') > -1 || permissionsOfGroup.indexOf('VSA') > -1) {
				applicationList = [];
				isEdit == false ? id = 'multi-select-application' : id = 'edit-multi-select-application'
				var selectedApplication = $('#' + id).multipleSelect('getSelects');
				selectedApplication.forEach(function (obj) {
					tempObj = obj.split('-')
					application = {}
					application['id'] = tempObj[0]
					application['applicationname'] = tempObj[1]
					application['weightage'] = parseInt('10', 2).toString(10);    //10 = VSA ESA
					applicationList.push(application)
				});
				if (permissionsOfGroup.indexOf('ESA') > -1) {
					if (applicationList.length > 0) {
						var html = "";
						if (isEdit == false) {
							$('#register').css('display', 'none');
							$('#dialog-for-application').css('display', 'block');
							applicationdivid = 'applications'
						}
						else {
							$('#edit').css('display', 'none');
							$('#dialog-for-edituser #dialog-for-application').css('display', 'block');
							applicationdivid = 'applications'
						}
						isEdit == false ? $("#applications").empty() : $("#dialog-for-edituser #applications").empty();
						applicationList.forEach(function (obj) {
							html += '<label class="checkbox-container" for="' + obj.id + '">' + obj.applicationname
							html += '<input type="checkbox" id="' + obj.id + '" onchange="clickedOnApplication(this)" checked/>'
							html += '<span class="checkmark"></span>'
							html += '</label>'
							obj.weightage = parseInt('11', 2).toString(10); // 11= VSA ESA
						});
						isEdit == false ? $("#applications").append(html) : $("#dialog-for-edituser #applications").append(html);
					}
				}
			}
			else
				isStoreApplication = false;
			data = {};
			if (isEdit == false) {
				data['firstname'] = $('#firstname').val()
				data['lastname'] = $('#lastname').val()
				data['email'] = $('#email').val()
				data['password'] = $('#passwords').val()
				data['role'] = document.getElementById("role").textContent
				data["operation"] = 'register'
			}
			else {
				data['firstname'] = $('#edit_firstname').val()
				data['role'] = document.getElementById("edit_role").textContent
				data["operation"] = 'update';
				data["rowid"] = selectedRowid;
			}
			data['applications'] = applicationList;
			data['isStoreApplication'] = isStoreApplication;
			siteList = [];
			isEdit == false ? id = 'multi-select-site' : id = 'edit-multi-select-site'
			var selectedSite = $('#' + id).multipleSelect('getSelects');
			selectedSite.forEach(function (obj) {
				site = {}
				site['id'] = obj
				site['isEnabled'] = true
				siteList.push(site)
			});
			// Get sub-site data (already stored with site names as keys)
			//var subSiteData = window.getSubSiteData();
			// Get sub-site data based on whether we're editing or registering
			var subSiteData;
			if (isEdit) {
				subSiteData = window.getEditSubSiteData();
			} else {
				subSiteData = window.getSubSiteData();
			}

			data['sites'] = siteList;
			data['subSiteData'] = subSiteData; // Add the sub-site data

			//console.log("Sub-site data being sent:", subSiteData);
			// This will log: {fs-le-dev1: ["text1", "text2"], fs-le-dev2: ["text3", "text4"]}
			jsonObj["data"] = data;
			//console.log("userdata---->" + data)
			//console.log("userdata---->" + JSON.stringify(data))
			if (permissionsOfGroup.indexOf('ESA') == -1) {
				$('#yesbtn').attr('data-dismiss', "modal");
				$('#dialog-for-edituser #updatebtn').attr('data-dismiss', "modal");
				if (isEdit == true && $("#edit_firstname").val() == '') {
					return false;
				}
				requestDataFromServer('/useronboard/useroperations/', { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(useronboardResponse);
			}
		}
	}
}
function clickOnBack() {
	if (isEdit == false) {
		$('#register').css('display', 'block');
		$('#dialog-for-application').css('display', 'none');
	}
	else {
		$('#edit').css('display', 'block');
		$('#dialog-for-edituser #dialog-for-application').css('display', 'none');
	}
}
function useronboardResponse(response) {
	//console.log("useronboardResponse-->" + response)
	//console.log("useronboardResponse-->" + JSON.stringify(response))
	data = jsonObj["data"]
	if (response && response.status == 200) {
		if (response.msg1)
			swal(response.msg, response.msg1, "success");

		else
			swal(response.msg, ' ', "success");
		if (data["operation"] == 'delete') {
			var id = response.rowid;
			$("#usertemplate #" + id).remove();
			$("#usertemplate #user-detail-" + id).remove();
			totalUsers--;
			$('#totalUsers').text(totalUsers);	 // total user count
		}
		else if (data["operation"] == 'register') {
			var serviceHtml = '';
			data['id'] = response.rowid;
			addUserRow(data)
			totalUsers++;
			$('#totalUsers').text(totalUsers);
			var html = "";
			html += '<option value="' + data.id + '">' + data.email + '</option>';
			$("#multi-select-user").append(html);
			$("#multi-select-user").multipleSelect('refresh')	//userlist in serveronboard
		}
		else if (data["operation"] == 'update') {
			id = response.rowid + '-firstname'
			$('#usertemplate #' + id).text(data["firstname"])
			id = response.rowid + '-userrole'
			$('#usertemplate #' + id).text(data["role"])
		}
	}
	else {
		//console.log("response.msg-->" + response.msg)
		//console.log("response.msg1-->" + response.msg1)
		//swal(response.msg, ' ', "error");
		swal(response.msg, response.msg1, "error");
		return;
	}
}
function onDeleteUser(id) {
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
		function () {
			requestDataFromServer('/useronboard/useroperations/', { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(useronboardResponse);
		});
}
function inputValidation(className) {
	var allFeildValid = checkAllfeildsfilled(className)


	if (document.getElementById("application-select-div").style.display == 'block') {
		var applications = $('#multi-select-application').multipleSelect('getSelects');
		if (applications.length == 0) {
			$('#multi-select-application-error-msg').text('Field cannot be empty');
			$('#multi-select-application-label').css('color', '#ff9eac');
		}
		else {
			$('#multi-select-application-error-msg').text(' ');
			//	$('#multi-select-application-label').css('color', "#404E67");
		}
	}
	if ($("#dialog-for-adduser #role").text() == 'Select Role') {
		allFeildValid = false;
		document.getElementById('role-error-msg').innerHTML = "Field cannot be empty";
		document.getElementById('role-label').style.color = "#ff9eac"
	}
	else {
		document.getElementById('role-error-msg').innerHTML = "";
		// document.getElementById('role-label').style.color = '#404E67'
	}
	var sites = $('#multi-select-site').multipleSelect('getSelects');
	if (sites.length == 0) {
		allFeildValid = false;
		$('#multi-select-site-error-msg').text('Field cannot be empty');
		$('#multi-select-site-label').css('color', '#ff9eac');
	}
	else {
		$('#multi-select-site-error-msg').text(' ');
		//	$('#multi-select-site-label').css('color', "#404E67");
	}
	return allFeildValid;
}
function clickOnStatus(checkbox, id) {
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
	requestDataFromServer('/useronboard/useroperations/', { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
		var userstatus = 'Enable';
		if (response && response.status != 200) {
			swal(response.errorMsg, ' ', "error");
		} else {
			swal(response.errorMsg, ' ', "error");
		}
		userstatus = response.msg ? response.msg : data["status"]
		//$('#switch_label_'+id).text(userstatus)
		userstatus == 'Enable' ? document.getElementById(rowid + '_status').checked = false : document.getElementById(rowid + '_status').checked = true;
	});
}
function onAdduser() {
	$('#v-pills-register-tab').click()
	isEdit = false;
	$('.input_effect').each(function (e) {
		id = $(this).attr('id')
		document.getElementById(id).value = ''
		//$(this).parent().find("label").css('color','#55A8FD');
		$(this).parent().find(".error-msg").text(' ');
	});
	$("#dialog-for-adduser #role").text('Select Role')
	$("#dialog-for-adduser #role-error-msg").text(' ')
	//$("#dialog-for-adduser #role-label").css('color', '#55A8FD')
	$('#dialog-for-adduser #application-select-div').css('display', 'none');
	$('#savebtn').attr('data-dismiss', " ");
	$('#yesbtn').attr('data-dismiss', " ");
	$('#dialog-for-application').css('display', 'none');
	$('#register').css('display', 'block');
	$('#multi-select-site').multipleSelect('uncheckAll')
	$('#multi-select-site-error-msg').text(' ');
	//$('#multi-select-site-label').css('color', "#404E67");
}

document.addEventListener("DOMContentLoaded", function () {
	const togglePassword = document.getElementById("dialog-for-adduser_password");
	const passwordInput = document.getElementById("passwords");

	togglePassword.addEventListener("click", function () {
		if (passwordInput.type === "password") {
			passwordInput.type = "text";
			this.classList.remove("icon-hide");
			this.classList.add("icon-show"); // change icon if you have styles
		} else {
			passwordInput.type = "password";
			this.classList.remove("icon-show");
			this.classList.add("icon-hide");
		}
	});
});

/* ========== SUB-SITE CREATE ======================= */

$(document).ready(function () {
	// Existing code for register modal
	let siteTexts = {};
	let currentSiteId = null;
	let currentSiteName = null;
	let tempTags = [];

	// NEW: Separate variables for edit modal
	let editSiteTexts = {};
	let editCurrentSiteId = null;
	let editCurrentSiteName = null;
	let editTempTags = [];

	// Register modal code (existing)
	$("#multi-select-site").on("change", function () {
		let selectedSites = $(this).val();
		let selectedSiteTexts = $("#multi-select-site option:selected").map(function () {
			return { id: $(this).val(), name: $(this).text() };
		}).get();
		if (!selectedSites || selectedSites.length === 0) {
			$("#filtered-site-div").hide();
			$("#filtered-sites").empty();
			return;
		}
		$("#filtered-site-div").show();
		$("#filtered-sites").multipleSelect("destroy");
		$("#filtered-sites").empty();
		selectedSiteTexts.forEach(function (site) {
			$("#filtered-sites").append(
				`<option value="${site.id}">${site.name}</option>`
			);
		});
		$("#filtered-sites").multipleSelect({
			selectAll: false,
			onClick: function (view) {
				openModalForSite(view.value, view.text);
			}
		});
	});
	function openModalForSite(siteId, siteName) {
		currentSiteId = siteId;
		currentSiteName = siteName;
		$("#current-site-name").text(siteName);
		tempTags = siteTexts[siteName] ? [...siteTexts[siteName]] : [];
		displayModalTags();
		$("#modal-text-input").val("");
		$("#textInputModal").modal("show");
	}
	function displayModalTags() {
		$("#tags-container").find(".tag").remove();
		tempTags.forEach(function (text) {
			let tag = $(`
                <span class="tag" style="background-color: #309eb7; padding: 5px 10px; border-radius: 3px; display: inline-flex; align-items: center; gap: 5px; margin: 2px; color: white;">
                    <span>${text}</span>
                    <span class="remove-tag" data-text="${text}" style="cursor: pointer; font-weight: bold; color: white;">✕</span>
                </span>
            `);
			$("#modal-text-input").before(tag);
		});
	}
	$("#modal-text-input").on("keyup", function (e) {
		let input = $(this).val();
		if (input.includes(",")) {
			let text = input.replace(",", "").trim();
			if (text !== "" && !tempTags.includes(text)) {
				tempTags.push(text);
				displayModalTags();
			}
			$(this).val("");
		}
	});
	$(document).on("click", ".remove-tag", function () {
		let text = $(this).data("text");
		tempTags = tempTags.filter(function (t) {
			return t !== text;
		});
		displayModalTags();
	});
	$("#save-text-btn").on("click", function () {
		if (currentSiteName) {
			siteTexts[currentSiteName] = [...tempTags];
			//console.log("Saved data:", siteTexts);
		}
		$("#textInputModal").modal("hide");
	});
	$("#tags-container").on("click", function () {
		$("#modal-text-input").focus();
	});
	$("#textInputModal").on("hidden.bs.modal", function () {
		tempTags = [];
		currentSiteId = null;
		currentSiteName = null;
	});
	window.getSubSiteData = function () {
		return siteTexts;
	};

	// NEW: Edit modal code
	$("#edit-multi-select-site").on("change", function () {
		let selectedSites = $(this).val();
		let selectedSiteTexts = $("#edit-multi-select-site option:selected").map(function () {
			return { id: $(this).val(), name: $(this).text() };
		}).get();
		if (!selectedSites || selectedSites.length === 0) {
			$("#edit-filtered-site-div").hide();
			$("#edit-filtered-sites").empty();
			return;
		}
		$("#edit-filtered-site-div").show();
		try {
			$("#edit-filtered-sites").multipleSelect("destroy");
		} catch (e) { }
		$("#edit-filtered-sites").empty();
		selectedSiteTexts.forEach(function (site) {
			$("#edit-filtered-sites").append(
				`<option value="${site.id}">${site.name}</option>`
			);
		});
		$("#edit-filtered-sites").multipleSelect({
			selectAll: false,
			onClick: function (view) {
				openEditModalForSite(view.value, view.text);
			}
		});
	});
	function openEditModalForSite(siteId, siteName) {
		editCurrentSiteId = siteId;
		editCurrentSiteName = siteName;
		$("#edit-current-site-name").text(siteName);
		editTempTags = editSiteTexts[siteName] ? [...editSiteTexts[siteName]] : [];
		displayEditModalTags();
		$("#edit-modal-text-input").val("");
		$("#editTextInputModal").modal("show");
	}
	function displayEditModalTags() {
		$("#edit-tags-container").find(".tag").remove();
		editTempTags.forEach(function (text) {
			let tag = $(`
                <span class="tag" style="background-color: #309eb7; padding: 5px 10px; border-radius: 3px; display: inline-flex; align-items: center; gap: 5px; margin: 2px; color: white;">
                    <span>${text}</span>
                    <span class="edit-remove-tag" data-text="${text}" style="cursor: pointer; font-weight: bold; color: white;">✕</span>
                </span>
            `);
			$("#edit-modal-text-input").before(tag);
		});
	}
	$("#edit-modal-text-input").on("keyup", function (e) {
		let input = $(this).val();
		if (input.includes(",")) {
			let text = input.replace(",", "").trim();
			if (text !== "" && !editTempTags.includes(text)) {
				editTempTags.push(text);
				displayEditModalTags();
			}
			$(this).val("");
		}
	});
	$(document).on("click", ".edit-remove-tag", function () {
		let text = $(this).data("text");
		editTempTags = editTempTags.filter(function (t) {
			return t !== text;
		});
		displayEditModalTags();
	});
	$("#edit-save-text-btn").on("click", function () {
		if (editCurrentSiteName) {
			editSiteTexts[editCurrentSiteName] = [...editTempTags];
			//console.log("Edit Saved data:", editSiteTexts);
		}
		$("#editTextInputModal").modal("hide");
	});
	$("#edit-tags-container").on("click", function () {
		$("#edit-modal-text-input").focus();
	});
	$("#editTextInputModal").on("hidden.bs.modal", function () {
		editTempTags = [];
		editCurrentSiteId = null;
		editCurrentSiteName = null;
	});
	window.getEditSubSiteData = function () {
		return editSiteTexts;
	};
	// NEW: Function to clear edit subsite data
	window.clearEditSubSiteData = function () {
		editSiteTexts = {};
	};
	// NEW: Function to load existing subsite data and populate filtered sites
	window.loadEditSubSiteData = function (userId) {
		// Clear previous data
		editSiteTexts = {};
		// Make AJAX call to get existing subsite data
		requestDataFromServer('/useronboard/getsubsitedata', {mode: "user", 'userId': JSON.stringify(userId),csrfmiddlewaretoken: csfr_token}, "POST").done(function (response) {
			//console.log("Loaded edit subsite response:", response);
			if (response.status == 200) {
				editSiteTexts = response.data || {};
				//console.log("Loaded edit subsite data:", editSiteTexts);
				// Populate the filtered sites dropdown with sites that have data
				populateEditFilteredSites();
			}
		});
	};
	// NEW: Function to populate edit filtered sites with sites that have subsite data
	function populateEditFilteredSites() {
		let selectedSiteTexts = $("#edit-multi-select-site option:selected").map(function () {
			return { id: $(this).val(), name: $(this).text() };
		}).get();
		if (selectedSiteTexts.length === 0) {
			$("#edit-filtered-site-div").hide();
			return;
		}
		$("#edit-filtered-site-div").show();
		try {
			$("#edit-filtered-sites").multipleSelect("destroy");
		} catch (e) { }
		$("#edit-filtered-sites").empty();
		// Add all selected sites to the dropdown
		selectedSiteTexts.forEach(function (site) {
			$("#edit-filtered-sites").append(
				`<option value="${site.id}">${site.name}</option>`
			);
		});
		// Get site names that have subsite data
		let sitesWithData = Object.keys(editSiteTexts);
		//console.log("Sites with subsite data:", sitesWithData);
		// Initialize multipleSelect
		$("#edit-filtered-sites").multipleSelect({
			selectAll: false,
			onClick: function (view) {
				openEditModalForSite(view.value, view.text);
			}
		});
		// Auto-select sites that have subsite data
		if (sitesWithData.length > 0) {
			// Find the IDs of sites that have data
			let siteIdsToSelect = [];
			selectedSiteTexts.forEach(function (site) {
				if (sitesWithData.includes(site.name)) {
					siteIdsToSelect.push(site.id);
				}
			});
			//console.log("Site IDs to select:", siteIdsToSelect);
			// Select those sites in the dropdown
			if (siteIdsToSelect.length > 0) {
				$("#edit-filtered-sites").multipleSelect('setSelects', siteIdsToSelect);
			}
		}
	}
});
