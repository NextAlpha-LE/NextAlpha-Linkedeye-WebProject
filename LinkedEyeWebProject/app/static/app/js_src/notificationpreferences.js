var serviceList = [];
var serverObjects = [];
var userobject = {};
var jsonObj = {};
redirectUrl = '';
$(document).ready(function()
{ 
    getAllservice()
    profiledata()
    profileimages()
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('next'))
    {
        redirectUrl = urlParams.get('next');
    }
});
$(document).on('focusout','.notification_input_effect', function () {
    if ($(this).val() == '') {
        $(this).parent().find("label").css('color','#ff9eac');
        $(this).parent().find(".error-msg").text('Field cannot be empty');
    }
    else {
        $(this).parent().find("label").css('color','#404E67');
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
        userobject = res.userobj
        //console.log("getprofiledataResponse---->" + JSON.stringify(userobject))
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
       // console.log("istTime--->" + istTime);
        prohtml += '<p class="userdata" id="' + userobject.first_name + '" > User Name :' + userobject.first_name+'</p>'
        prohtml += '<p class="userdata" id="' + userobject.email + '" > E-Mail :' + userobject.email+'</p>'
        prohtml += '<p class="userdata" id="" > Date-joined :' + istTime + '</p>'
        usernames = userobject.first_name
        //document.getElementById('profile_data').textContent = userobject.first_name
        //document.getElementById('profile_text').textContent = userobject.first_name
    }
    else {
        swal(response.msg, ' ', 'error')
    }
    $("#profile_data").append(prohtml);
}


function getAllservice()
{
    requestDataFromServer('/notificationsettings/getallservices', {}, "GET").done(getAllserviceResponse);
}
function getAllserviceResponse(response)
{
    res = JSON.parse(response);
    if(res.status == 200)
    {
        $("#notificationpreferences #servicelist").empty();
        var html = '';
        serviceList = res.data;
        userobject = res.userobj
        if(serviceList.length)
        {
            $("#notificationpreferences-data").show();
            $("#notificationpreferences-nodata").hide()
            $("#notificationpreferences #save").prop('disabled', false);
            res.data.forEach(function(obj)
            {
                //console.log("notificationpreferences-data-->" + JSON.stringify(obj))
                var matches = obj.syntax.match(/\{(.*?)\}/g);
                html += '<div class="pt-1">'
                html +=     '<label class="checkbox-container">'
                html +=         '<span>'+obj.name+'</span>'
                if(obj.is_defaultservice)
                {
                    $('#errormessage').html('*Default service')
                    html +=         '<span class="red">*</span>'
                    html +=             '<input type="checkbox" id="checkbox-'+obj.name+'" onchange="checkedOnService(this,'+obj.id+')" checked disabled/>'
                }
                else
                    html +=             '<input type="checkbox" id="checkbox-'+obj.name+'" onchange="checkedOnService(this,'+obj.id+')"/>'
                html +=         '<span class="checkmark"></span>'
                html +=     '</label>'
                html += '</div>'
                if(obj.is_defaultservice && matches)
                    html += '<div class="col-12 px-1" style="" id="'+obj.name+'_inputs">'
                else
                    html += '<div class="col-12 px-1" style="display: none;" id="'+obj.name+'_inputs">'
                if(matches)
                {
                    matches.forEach(function(tmp){
                        var inputField = tmp.replace(/{|}/g, '');
                        if(userobject.hasOwnProperty(inputField))
                            inputvalue = userobject[inputField]
                        else
                            inputvalue = ''
                        html +=     '<div class="col-12 my-2">'
                        var id = obj.name+'-'+inputField;
                        if(obj.delimiter != "")
                            html += '<label id="'+id+'-label">'+inputField+'(Use " '+obj.delimiter+' " for multiple '+inputField+')</label>'
                        else
                            html += '<label id="'+id+'-label">'+inputField+'</label>'
                        html +=     '<input type="text" class="form-control notification_input_effect full-input" placeholder="Enter '+inputField+'" id="'+id+'" value="'+inputvalue+'" required=""  autocomplete="off">'
                        html +=         '<span class="error-msg" id="'+id+'-error-msg'+'"></span>'
                        html +=     '</div>'
                    })
                }
                html += '</div>'
            });
            $("#notificationpreferences #serviceList").append(html);
        }
        else
        {
            $("notificationpreferences-data").hide();
            $("notificationpreferences-nodata").show()
            $("#notificationpreferences #save").prop('disabled', true);
        }
    }
    else
    {
        swal(response.msg,' ', 'error')
    }
}
function checkedOnService(checkbox, serviceid)
{
    id = $(checkbox).attr("id")
    var tmp = id.split('-')
    divid = tmp[1]+'_inputs'
	if(checkbox.checked  == true)
	{
        document.getElementById(divid).style.display = "block";
        var i =  document.getElementById(divid).getElementsByTagName('input')
        i.forEach(function(obj){
            document.getElementById(obj.id+'-label').style.color = '#404E67'
            document.getElementById(obj.id+'-error-msg').innerHTML = " ";
        })
	}
	else
	{
        index = serverObjects.findIndex(x => x.serviceid == serviceid);
        if(index != -1)
        {
            serverObjects.splice(index, 1);
        }
        document.getElementById(divid).style.display = "none";
	}
}
function saveSettings()
{
    serviceList.forEach(function (obj) {
       // console.log("saveSettings()--->" + obj)
       // console.log("saveSettings()-1-->" + JSON.stringify(obj))
        checkboxid = 'checkbox-'+obj.name
        if(document.getElementById(checkboxid).checked)
        {
            clickOnFinish(obj.id) 
        }
        
    })
    if(serverObjects.length)
    {
        jsonObj["data"] = serverObjects
       // console.log("JSON.stringify(jsonObj)--->" + JSON.stringify(jsonObj))
        requestDataFromServer('/notificationsettings/savesettings', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST").done(function(res){
            serverObjects = [];
            jsonObj = {};
            response = JSON.parse(res);
            if(response && response.status == 200)
            {
                swal(response.msg, ' ', "success");
                serviceList.forEach(function(obj){
                    checkboxid = 'checkbox-'+obj.name
                    if(!obj.is_defaultservice)
                    {
                        document.getElementById(checkboxid).checked = false;
                        inputdiv = obj.name+'_inputs'
                        document.getElementById(inputdiv).style.display = 'none';
                    }
                })
               // console.log("redirectUrl--->" + redirectUrl)
                if(redirectUrl)
                    window.location.href = window.location.origin+redirectUrl 
            }
            else
            {
                swal(response.msg, ' ', "error");
                return;	
            }
        });
    }
}
function sendNotification(serviceid)
{
    data = {};
    jsonObj = {};
    data["servicename"] = 'discord'
    data["title"] = "test title"
    data["body"] = "test body"
    jsonObj["data"] = data;    
    requestDataFromServer('/notificationsettings/sendnotification', {'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token}, "POST");
}
function clickOnFinish(serviceid)
{
    data = {};
    serviceObj = serviceList.filter(x => x.id == serviceid)[0]
    var matches = serviceObj.syntax.match(/\{(.*?)\}/g);
    var url = serviceObj.syntax
    var tmpObj = {}
    if(matches)
    {
        matches.forEach(function(obj){
            var inputField = obj.replace(/{|}/g, '');
            var inputid = serviceObj.name+'-'+inputField
            inputValue = document.getElementById(inputid).value
            if(inputValue == '')
            {
                document.getElementById(inputid+'-label').style.color = '#ff9eac'
                document.getElementById(inputid+'-error-msg').innerHTML = "Field cannot be empty";
            }
            else
            {
                tmpObj[inputField] = inputValue
            }
        })
        if(Object.keys(tmpObj).length > 0)
        {
            data['serviceid'] = serviceid;
            data['inputs'] = tmpObj
            serverObjects.push(data)
        }
    }
    else
    {
        data['serviceid'] = serviceid;
        data['inputs'] = tmpObj
        serverObjects.push(data)
    }

}
function enableNotification(checkbox)
{
    if(checkbox.checked  == true)
	{
        document.getElementById('notificationservices').style.display = "block"
        document.getElementsByClassName('card-footer')[0].style.display = "block"
	}
	else
	{
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
       // console.log("username---->" + username)
        // Construct the URL of the profile image for the user
        const extensions = ['jpg', 'jpeg', 'png', 'gif'];
        const url = extensions.map(extension => '/static/app/usericons/' + username + '.' + extension).find(url => {
            return fetch(url)
                .then(response => response.ok)
                .catch(error => {
                    console.error(`Error fetching profile image URL: ${error}`);
                    return false;
                });
        });
        //console.log("url-->" + url)
        // Get a reference to the image element
        const profileImg = document.getElementById("img_uploading");

        // Fetch the URL of the profile image
        fetch(url)
            .then(response => {
                if (response.ok) {
                    // The user's profile image exists, so display it
                    document.getElementById('img_uploading').style.display = "block"
                    document.getElementById('img_upload').style.display = "none"
                    return response.blob();
                } else {
                    // The user's profile image doesn't exist, so display the default image
                    document.getElementById('img_upload').style.display = "block"
                    document.getElementById('img_uploading').style.display = "none"
                    return fetch(document.getElementById('img_upload').getAttribute('src')).then(response => response.blob());
                }
            })
            .then(imageBlob => {
                // Create an object URL for the image blob
                const imageUrl = URL.createObjectURL(imageBlob);
                // Set the src attribute of the image element to the URL of the profile image
                profileImg.src = imageUrl;
            })
            .catch(error => {
                console.error(`Error fetching profile image URL: ${error}`);
            });
    }
}

function delimg() {
    const username = usernames.replace(/\s+/g, '');
    const extensions = ['jpg', 'jpeg', 'png', 'gif'];
    const url = extensions.map(extension => `/static/app/usericons/${username}.${extension}`).find(url => {
        return fetch(url)
            .then(response => response.ok)
            .catch(error => {
                console.error(`Error fetching profile image URL: ${error}`);
                return false;
            });
    });

    if (url) {
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
                    console.log('Profile image deleted successfully');
                    // Add your code here to handle success
                } else {
                    console.error('Error deleting profile image');
                    // Add your code here to handle error
                }
            })
            .catch(error => {
                console.error(`Error deleting profile image: ${error}`);
                // Add your code here to handle error
            });
    } else {
        console.error('Error: Could not find profile image URL');
        // Add your code here to handle error
    }
}