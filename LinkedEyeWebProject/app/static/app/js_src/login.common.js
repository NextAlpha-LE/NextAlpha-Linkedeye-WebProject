var okColor = "#00D2A1";
var unkownColor = "#D2D2D2";
var warningColor = "#FDB278";
var criticalColor = "#FF6060";
var pendingColor = "#4CB5DB";
var relationshipColor = "#7B7B7B";
var networkStatus = ''

function requestDataFromServer(url, data, type = "POST") {
	return $.ajax({
		url: url,
		type: type,
		data: data
	});
}

function registerInputFieldEvents() {
	$(".input_effect").focus(function () {
		$(this).parent().find("label").addClass("move_label");
		$(this).parent().addClass("bg_input");
	});
	$('.input_effect').focusout(function (e) {
		if ($(this).val().trim() == '') {
			$(this).css('border-color', '#FF6060');
			$(this).parent().find("label").css('color', '#FF6060');
			$(this).parent().find("label").removeClass("move_label");
			$(this).parent().removeClass("bg_input");
		}
		else {
			$(this).parent().find("label").css('color', '#404E67');
			$(this).css('border-color', '#BABFC7');
		}
	});
}

function fieldValidation() {
	$('.inputvalidation').keypress(function (event) {
		var text_attribute = $(this).data('attribute');
		if (text_attribute === "alphanumeric") {
			var ch = String.fromCharCode(event.which);
			if (!(/^[a-zA-Z0-9-_\s]*$/.test(ch))) {
				event.preventDefault();
			}
		}
		else if (text_attribute === "IPADDRESS" || text_attribute === "IP") {
			var ch = String.fromCharCode(event.which);
			if (!(/[0-9.]/.test(ch))) {
				event.preventDefault();
			}
		}
		else if (text_attribute === "PORT") {
			var ch = String.fromCharCode(event.which);
			if (!(/[0-9]/.test(ch))) {
				event.preventDefault();
			}
		}
		else if (text_attribute === "URL") {
			var specials = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
			var ch = String.fromCharCode(!event.charCode ? event.which : event.charCode);
			if (specials.test(ch)) {
				event.preventDefault();
				return false;
			}
		}
		else if (text_attribute === "EMAIL") {
			var specials = /[~`!#$%^&()={}[\]:;,<>+\/?'"*]/;
			var ch = String.fromCharCode(!event.charCode ? event.which : event.charCode);
			if (specials.test(ch)) {
				event.preventDefault();
				return false;
			}
		}
	});
}

function chunkArray(myArray, chunk_size) {
	var index = 0;
	var arrayLength = myArray.length;
	var tempArray = [];
	for (index = 0; index < arrayLength; index += chunk_size) {
		myChunk = myArray.slice(index, index + chunk_size);
		tempArray.push(myChunk);
	}
	return tempArray;
}

$(document).ready(function () {

	//	button-ripple-effect
	$.ripple(".btn, .menu-link", {
		debug: false,
		on: 'mousedown',

		opacity: 0.4,
		color: "auto",
		multi: false,

		duration: 1,

		rate: function (pxPerSecond) {
			return pxPerSecond;
		},

		easing: 'linear'
	});

	//------

	//custom-select
	$(".boot-select").selectpicker();

	//-----
	$('.info-float-btn').click(
		function () {
			$('.infonav').toggleClass('info-expand');
		},

	)
});

function getColorForNodeState(nodeState) {
	if (nodeState)
		var state = nodeState.toUpperCase()
	else
		var state = nodeState
	var color = okColor;
	if (state === "WARNING") {
		color = warningColor;
	}
	else if (state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED") {
		color = unkownColor;
	}
	else if (state === "PENDING") {
		color = pendingColor;
	}
	else if (state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING") {
		color = criticalColor;
	}
	return color;
}


var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

function getFormatedDate(epoch) {
	if (epoch > 0) {
		var date = new Date(epoch * 1000);
		var year = date.getFullYear();
		var monthnum = date.getMonth();
		var day = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		return day + " " + month[monthnum] + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
	}
	else {
		return "--";
	}
}

// $(document).ready(function(){
// 	if(Cookies.get('theme')) {
// 		$('body').removeClass().addClass( $.cookie('theme') );

// 	};


// 	$("#theme-toggler").click(function(){
// 		currentClass = $('body').attr("class");

// 		if (currentClass == 'light-mode')
// 			newClass = 'dark-mode';
// 		else newClass = 'light-mode';

// 		$('body').removeClass().addClass(newClass);

// 	   Cookies.set('theme', newClass);

// 	});
// });


$(document).ready(function () {
	$('#snackbar').text('Online..');
	snackbar.className = "sucess_show";
	$("#snackbar").fadeOut();
	window.addEventListener('online', initNetworkEvents)
	window.addEventListener('offline', initNetworkEvents)
	let darkMode = localStorage.getItem("darkMode");
	const darkModeToggle = $("#dark-mode-toggle");

	const enableDarkMode = () => {
		$('body').addClass('darkmode');
		localStorage.setItem('darkMode', 'enabled');

	};
	const disableDarkMode = () => {
		$('body').removeClass('darkmode');
		localStorage.setItem('darkMode', null);

	};

	if (darkMode == 'enabled') {
		enableDarkMode();
		$('#dark-mode-toggle').find('.text').text("Light Mode");
	}

	$("#dark-mode-toggle").click(function () {
		darkMode = localStorage.getItem("darkMode");

		if (darkMode !== 'enabled') {
			enableDarkMode();
			$('#dark-mode-toggle').find('.text').text("Light Mode");
		}
		else {
			disableDarkMode();
			$('#dark-mode-toggle').find('.text').text("Dark Mode");
		}
	});
	$('.chpassword_input').focusout(function (e) {
		if ($(this).val() == '' || $(this).val() == null) {
			$(this).parent().find("label").css('color', '#ff9eac');
			$(this).parent().find(".error-msg").text('Field cannot be empty');
		}
		else {
			$(this).parent().find("label").css('color', '#404E67');
			$(this).parent().find(".error-msg").text('');
		}
	});
});

function initNetworkEvents() {
	if (navigator.onLine) {
		networkStatus = 'online'
		$("#snackbar").fadeIn("slow");
		$('#snackbar').text('Online:Please Refresh Your Page..');
		snackbar.className = "sucess_show";
	}
	else {
		networkStatus = 'offline'
		$("#snackbar").fadeIn("slow");
		$('#snackbar').text('Offline:Please Check your Network Connections..');
		snackbar.className = "error_show";
	}
}

initNetworkEvents()

$('.select-link').click(function () {
	$('.select-input-link').html($(this).text());
});

function inputFocusOut(element) {
	// $('.'+className).focusout(function (e) {
	if (element.val() == '') {
		element.parent().find("label").css('color', '#ff9eac');
		element.parent().find(".error-msg").text('Field cannot be empty');
	}
	else {
		element.parent().find("label").css('color', '#404E67');
		element.parent().find(".error-msg").text('');
	}
	// });
}
function inputFocusIn(element) {
	element.parent().find("label").css('color', '#404E67');
	element.parent().find(".error-msg").text('');
}
function checkAllfeildsfilled(className) {
	var allFeildValid = true;
	$('.' + className).each(function (e) {
		if ($(this).val() == '' || $(this).val() == null) {
			$(this).css('border-color', '#FF7588');
			$(this).parent().find("label").css('color', '#ff9eac');
			$(this).parent().find(".error-msg").text('Field cannot be empty');
			allFeildValid = false;
		}
		else {
			$(this).css('border-color', '#BABFC7');
			$(this).parent().find("label").css('color', '#404E67');
			$(this).parent().find(".error-msg").text(' ');
		}
	});
	return allFeildValid;
}
$(".toggle-password").click(function (event) {
	id = event.target.id;
	values = id.split('_')
	console.log("this is the values --> " + values)
	$(this).toggleClass("icon-show");
	if ($(' #' + values[1]).attr("type") == "password") {
		console.log("inside the if")
		$(' #' + values[1]).attr("type", "text");
		
	}
	else {
		console.log("inside the else")
		$( ' #' + values[1]).attr("type", "password");
	}
});


function getSizeForNode(type) {
	var size = 25
	if (type == "Host" || type.startsWith('Node')) {
		size = 50;
	}
	return size;
}
function showLoader(divId) {
	$("#" + divId + " #loader").fadeIn()
	$("#" + divId).addClass('showloader')
}
function stopLoader(divId) {
	$("#" + divId + " #loader").fadeOut(200)
	$("#" + divId).removeClass('showloader')
}
function onchangePassword() {
	$('.chpassword_input').each(function (e) {
		id = $(this).attr('id')
		$("#dialog-for-changepassword #" + id).val('')
		$(this).parent().find("label").css('color', '#404E67');
		$(this).parent().find(".error-msg").text(' ');
	});
	$('#dialog-for-changepassword #addbtn').attr('data-dismiss', " ");
}
function savePassword() {
	requestData = {};
	data = {};
	data['username'] = $('#dialog-for-changepassword #ch-username').val();
	data['currentpsw'] = $('#dialog-for-changepassword #ch-password').val();
	data['newpsw'] = $('#dialog-for-changepassword #ch-nwpassword').val();
	data['confirmpsw'] = $('#dialog-for-changepassword #ch-cpassword').val();
	var isAllInputsFilled = checkAllfeildsfilled('chpassword_input')
	var regpassword = new RegExp("^[a-zA-Z0-9@#$%^&*]{8,}$");
	if (isAllInputsFilled == false)
		$('#dialog-for-changepassword #addbtn').attr('data-dismiss', " ");
	else if (!regpassword.test($('#ch-nwpassword').val())) {
		$('#dialog-for-changepassword #addbtn').attr('data-dismiss', " ");
		$('#ch-nwpassword-error-msg').text("Password too short (Minimum 8 characters)");
		$('#ch-nwpassword-label').css('color', '#ff9eac');
	}
	else if (data['newpsw'] !== data['confirmpsw']) {
		$('#dialog-for-changepassword #addbtn').attr('data-dismiss', " ");
		$('#ch-cpassword-error-msg').text('New Password and Confirm Password are not same');
		$('#ch-cpassword-label').css('color', '#ff9eac');
	}
	else {
		requestData["data"] = data;
		$('#dialog-for-changepassword #addbtn').attr('data-dismiss', "modal");
		requestDataFromServer('/useronboard/changePassword', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
			if (response.status == 200) {
				swal(response.msg, ' ', "success");
			}
			else
				swal(response.msg, ' ', "error");
		});
	}
}
