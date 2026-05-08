var serviceList = [];
var serverObjects = [];
var userobject = {};
var jsonObj = {};
redirectUrl = '';
$(document).ready(function () {
    getAllservice()
    profiledata()
    profileimages()
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('next')) {
        redirectUrl = urlParams.get('next');
    }
});
$(document).on('focusout', '.notification_input_effect', function () {
    if ($(this).val() == '') {
        $(this).parent().find("label").css('color', '#ff9eac');
        $(this).parent().find(".error-msg").text('Field cannot be empty');
    }
    else {
        $(this).parent().find("label").css('color', '#404E67');
        $(this).parent().parent().find(".error-msg").text('');
    }
});

$(document).ready(function () {
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $(".file-upload").on('change', function () {
        readURL(this);
    });

    $(".upload-button").on('click', function () {
        $(".file-upload").click();
    });
});
var usernames = ''
function profiledata() {
    requestDataFromServer('/notificationsettings/getallservices', {}, "GET").done(getprofiledataResponse);
}
function getprofiledataResponse(response) {
    res = JSON.parse(response);
    var prohtml = '';
    if (res.status == 200) {
        $("#notificationpreferences #servicelist").empty();
        serviceList = res.data;
        userobject = res.userobj;

        const unixTimestamp = userobject.date_joined;
        const date = new Date(unixTimestamp * 1000);
        const options = {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        };
        const istTime = date.toLocaleString('en-IN', options);

        // Format Last Login
        var lastLoginStr = 'Never';
        if (userobject.last_login) {
            const loginDate = new Date(userobject.last_login * 1000);
            lastLoginStr = loginDate.toLocaleString('en-IN', options);
        }

        // Update Modern Header
        var displayName = userobject.first_name || userobject.email.split('@')[0];
        $("#display_username").text(displayName);
        $("#display_email span").removeClass('skeleton skeleton-text short').text(userobject.email);

        // Populate Modern Details Grid
        prohtml += '<div class="modern-field"><span class="field-label"><i class="mdi mdi-account-outline mr-2"></i>User Name</span><div class="field-value">' + (userobject.first_name || 'Not provided') + '</div></div>';
        prohtml += '<div class="modern-field"><span class="field-label"><i class="mdi mdi-email-outline mr-2"></i>Email Address</span><div class="field-value">' + userobject.email + '</div></div>';
        prohtml += '<div class="modern-field"><span class="field-label"><i class="mdi mdi-calendar-clock mr-2"></i>Joined On</span><div class="field-value">' + istTime + '</div></div>';
        prohtml += '<div class="modern-field"><span class="field-label"><i class="mdi mdi-shield-check-outline mr-2"></i>Last Login</span><div class="field-value">' + lastLoginStr + '</div></div>';

        usernames = userobject.first_name;
    }
    else {
        swal(response.msg, ' ', 'error');
    }
    $("#profile_data").empty().append(prohtml);
}


function getAllservice() {
    requestDataFromServer('/notificationsettings/getallservices', {}, "GET").done(getAllserviceResponse);
}
function getAllserviceResponse(response) {
    res = JSON.parse(response);
    if (res.status == 200) {
        $("#notificationpreferences #serviceList").empty();
        var html = '';
        serviceList = res.data;
        userobject = res.userobj
        if (serviceList.length) {
            $("#notificationpreferences-data").show();
            $("#notificationpreferences-nodata").hide()
            $("#notificationpreferences #save").prop('disabled', false);
            res.data.forEach(function (obj) {
                var matches = obj.syntax.match(/\{(.*?)\}/g);
                html += '<div class="col-md-6 mb-4">';
                html += '<div class="modern-field p-3">';
                html += '<div class="checkbox-container d-flex align-items-center mb-2">'
                html += '<span class="text-white mr-2">' + obj.name + '</span>'
                if (obj.is_defaultservice) {
                    $('#errormessage').html('*Default service')
                    html += '<span class="red mr-2">*</span>'
                    html += '<input type="checkbox" id="checkbox-' + obj.name + '" onchange="checkedOnService(this,' + obj.id + ')" checked disabled/>'
                }
                else
                    html += '<input type="checkbox" id="checkbox-' + obj.name + '" onchange="checkedOnService(this,' + obj.id + ')"/>'
                html += '<span class="checkmark"></span>'
                html += '</div>'

                if (obj.is_defaultservice && matches)
                    html += '<div class="px-1" id="' + obj.name + '_inputs">'
                else
                    html += '<div class="px-1" style="display: none;" id="' + obj.name + '_inputs">'

                if (matches) {
                    matches.forEach(function (tmp) {
                        var inputField = tmp.replace(/{|}/g, '');
                        if (userobject.hasOwnProperty(inputField))
                            inputvalue = userobject[inputField]
                        else
                            inputvalue = ''
                        html += '<div class="my-2">'
                        var id = obj.name + '-' + inputField;
                        if (obj.delimiter != "")
                            html += '<label class="field-label" id="' + id + '-label">' + inputField + ' (Use: " ' + obj.delimiter + ' " for multiple email)</label>'
                        else
                            html += '<label class="field-label" id="' + id + '-label">' + inputField + '</label>'
                        html += '<input type="text" class="form-control notification_input_effect full-input bg-dark border-0 text-white" placeholder="Enter ' + inputField + '" id="' + id + '" value="' + inputvalue + '" required=""  autocomplete="off">'
                        html += '<span class="error-msg" id="' + id + '-error-msg' + '"></span>'
                        html += '</div>'
                    })
                }
                html += '</div>'
                html += '</div>'
                html += '</div>';
            });
            $("#notificationpreferences #serviceList").append(html);
        }
        else {
            $("#notificationpreferences-data").hide();
            $("#notificationpreferences-nodata").show()
            $("#notificationpreferences #save").prop('disabled', true);
        }
    }
    else {
        swal(response.msg, ' ', 'error')
    }
}
function checkedOnService(checkbox, serviceid) {
    id = $(checkbox).attr("id")
    var tmp = id.split('-')
    divid = tmp[1] + '_inputs'
    if (checkbox.checked == true) {
        document.getElementById(divid).style.display = "block";
        var i = document.getElementById(divid).getElementsByTagName('input')
        i.forEach(function (obj) {
            document.getElementById(obj.id + '-label').style.color = '#404E67'
            document.getElementById(obj.id + '-error-msg').innerHTML = " ";
        })
    }
    else {
        index = serverObjects.findIndex(x => x.serviceid == serviceid);
        if (index != -1) {
            serverObjects.splice(index, 1);
        }
        document.getElementById(divid).style.display = "none";
    }
}
function saveSettings() {
    serviceList.forEach(function (obj) {
        // console.log("saveSettings()--->" + obj)
        // console.log("saveSettings()-1-->" + JSON.stringify(obj))
        checkboxid = 'checkbox-' + obj.name
        if (document.getElementById(checkboxid).checked) {
            clickOnFinish(obj.id)
        }

    })
    if (serverObjects.length) {
        jsonObj["data"] = serverObjects
        // console.log("JSON.stringify(jsonObj)--->" + JSON.stringify(jsonObj))
        requestDataFromServer('/notificationsettings/savesettings', { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(function (res) {
            serverObjects = [];
            jsonObj = {};
            response = JSON.parse(res);
            if (response && response.status == 200) {
                swal(response.msg, ' ', "success");
                serviceList.forEach(function (obj) {
                    checkboxid = 'checkbox-' + obj.name
                    if (!obj.is_defaultservice) {
                        document.getElementById(checkboxid).checked = false;
                        inputdiv = obj.name + '_inputs'
                        document.getElementById(inputdiv).style.display = 'none';
                    }
                })
                // console.log("redirectUrl--->" + redirectUrl)
                if (redirectUrl)
                    window.location.href = window.location.origin + redirectUrl
            }
            else {
                swal(response.msg, ' ', "error");
                return;
            }
        });
    }
}
function sendNotification(serviceid) {
    data = {};
    jsonObj = {};
    data["servicename"] = 'discord'
    data["title"] = "test title"
    data["body"] = "test body"
    jsonObj["data"] = data;
    requestDataFromServer('/notificationsettings/sendnotification', { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST");
}
function clickOnFinish(serviceid) {
    data = {};
    serviceObj = serviceList.filter(x => x.id == serviceid)[0]
    var matches = serviceObj.syntax.match(/\{(.*?)\}/g);
    var url = serviceObj.syntax
    var tmpObj = {}
    if (matches) {
        matches.forEach(function (obj) {
            var inputField = obj.replace(/{|}/g, '');
            var inputid = serviceObj.name + '-' + inputField
            inputValue = document.getElementById(inputid).value
            if (inputValue == '') {
                document.getElementById(inputid + '-label').style.color = '#ff9eac'
                document.getElementById(inputid + '-error-msg').innerHTML = "Field cannot be empty";
            }
            else {
                tmpObj[inputField] = inputValue
            }
        })
        if (Object.keys(tmpObj).length > 0) {
            data['serviceid'] = serviceid;
            data['inputs'] = tmpObj
            serverObjects.push(data)
        }
    }
    else {
        data['serviceid'] = serviceid;
        data['inputs'] = tmpObj
        serverObjects.push(data)
    }

}
function enableNotification(checkbox) {
    if (checkbox.checked == true) {
        document.getElementById('notificationservices').style.display = "block"
        document.getElementsByClassName('card-footer')[0].style.display = "block"
    }
    else {
        document.getElementById('notificationservices').style.display = "none"
        document.getElementsByClassName('card-footer')[0].style.display = "none"
    }
}

function uploadImage() {
    const input = document.getElementById("saveimg");
    const formData = new FormData();
    formData.append("image", input.files[0]);
    formData.append("csrfmiddlewaretoken", getCookie("csrftoken"));
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const imageUrl = response.image_url + "?t=" + Date.now();
            const profileImage = document.getElementById("profile-image");
            if (profileImage) {
                profileImage.src = imageUrl;
            }
            input.value = "";
            // Display the uploaded image using SweetAlert2
            swal({
                title: 'Image uploaded successfully!',
                imageUrl: imageUrl,
                imageAlt: 'Uploaded Image'
            });
        } else if (this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
            console.error("Image upload failed.");
        }
    };
    xhr.open("POST", "/notificationsettings/save_image/", true);
    // Handle the image conversion before sending the request
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            // Convert the canvas data to JPEG format
            const dataUrl = canvas.toDataURL("image/jpeg");
            // Add the converted image to the form data
            formData.append("image", dataUrl.split(",")[1]);
            formData.append("filename", ((usernames).replace(/\s+/g, "")) + ".jpg");
            // Send the request
            xhr.send(formData);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(input.files[0]);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.getElementById("saveimg").addEventListener("change", uploadImage);

function profileimages() {
    requestDataFromServer('/notificationsettings/getallservices', {}, "GET").done(profileupload);
}

function profileupload(response) {
    res = JSON.parse(response);
    // Get the username of the currently logged-in user
    if (res.status == 200) {
        serviceLists = res.data;
        userobject = res.userobj
        const username = (userobject.first_name).replace(/\s+/g, "");
        // Get a reference to the image element
        const profileImg = document.getElementById("img_uploading");

        // Sequentially check each extension and display the first one found.
        const extensions = ['jpg', 'jpeg', 'png', 'gif'];
        const candidates = extensions.map(ext => '/static/app/usericons/' + username + '.' + ext);

        function tryNextExtension(index) {
            if (index >= candidates.length) {
                // No profile image found — show default upload placeholder
                document.getElementById('img_upload').style.display = "block";
                document.getElementById('img_uploading').style.display = "none";
                return;
            }
            const url = candidates[index];
            fetch(url, { method: 'HEAD' })
                .then(function(response) {
                    if (response.ok) {
                        document.getElementById('img_uploading').style.display = "block";
                        document.getElementById('img_upload').style.display = "none";
                        profileImg.src = url;
                    } else {
                        tryNextExtension(index + 1);
                    }
                })
                .catch(function() {
                    tryNextExtension(index + 1);
                });
        }

        tryNextExtension(0);
    }
}

function delimg() {
    const username = usernames.replace(/\s+/g, '');
    if (!username) {
        swal("Error", "User data not loaded yet.", "error");
        return;
    }

    swal({
        title: "Delete Profile Image?",
        text: "This will revert your avatar to the default placeholder.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                fetch('/delete-profile-image/', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    },
                    body: JSON.stringify({ 'username': username })
                })
                    .then(response => {
                        if (response.ok) {
                            swal("Deleted!", "Your profile image has been removed.", "success");
                            // Revert to default image
                            const defaultImg = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
                            $("#img_upload").attr("src", defaultImg).show();
                            $("#img_uploading").hide().attr("src", "");
                        } else {
                            swal("Error", "Failed to delete image.", "error");
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        swal("Error", "Something went wrong.", "error");
                    });
            }
        });
}
