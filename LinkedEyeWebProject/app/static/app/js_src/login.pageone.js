var jsonObj = {};
allFeildValid = true;
var snackbar = document.getElementById("snackbar");
var selectedUsername = ' ';
let redirectUrl = '';
let currentUserEmail = '';
$(document).ready(function () {
    $(".input_effect").focus(function () {
        $(this).parent().find("label").addClass("move_label");
        $(this).parent().addClass("bg_input");
    });
    $('.input_effect').focusout(function (e) {
        if ($(this).val() == '') {
            $(this).css('border-color', '#FF7588');
            // $(this).parent().find("label").css('color','#ff9eac');
            $(this).parent().find("label").removeClass("move_label");
            $(this).parent().removeClass("bg_input");
        }
        else {
            $(this).css('border-color', '#BABFC7');
            // $(this).parent().find("label").css('color','#404E67');
        }
    });
    $('.input_effect').keyup(function (e) {
        if (e.keyCode == 13) {
            onSubmit()
        }
    });
    $('.fpassword_input').focusout(function (e) {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).parent().find("label").css('color', '#ff9eac');
            $(this).parent().find(".error-msg").text('Field cannot be empty');
        }
        else {
            $(this).parent().find("label").css('color', '#404E67');
            $(this).parent().find(".error-msg").text('');
        }
    });
    getcookiedata();
});
function removeSnackbar() {
    $("#snackbar").fadeOut("slow")
    $("#snackbar").removeClass("error_show")
}
function onSubmit() {
    validation()
    if (allFeildValid) {
        jsonObj["username"] = $('#username').val()
        jsonObj["password"] = $('#password').val()
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('next'))
            requestDataFromServer('/login/verify?next=' + urlParams.get('next'), { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(loginResponse)
        else
            requestDataFromServer('/login/verify', { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(loginResponse)


    }
    else {
        $("#snackbar").fadeIn("slow");
        $('#snackbar').text("The fields cannot be empty");
        snackbar.className = "error_show";
    }
}
/*function loginResponse(response) {
    console.log("loginresponse--->" + JSON.stringify(response))
    if (response) {
        if (response.status == 200) {
            window.location.href = window.location.origin + response["redirectUrl"]

        }
        else if (response.status == 201) {
            // OTP sent - show OTP modal
            redirectUrl = response["redirectUrl"];
            document.getElementById('otpMessage').textContent = response.msg;
            document.getElementById('otpModal').style.display = 'flex';
            document.getElementById('otpInput').focus();
        }
        else {
            $("#snackbar").fadeIn("slow");
            $('#snackbar').text(response.msg)
            snackbar.className = "error_show";
            setTimeout(removeSnackbar, 3000);
        }
    }
}*/

function loginResponse(response) {
    console.log("loginresponse--->" + JSON.stringify(response))
    if (response) {
        if (response.status == 200) {
            window.location.href = window.location.origin + response["redirectUrl"]
        }
        else if (response.status == 201) {
            // OTP sent - show OTP modal
            redirectUrl = response["redirectUrl"];
            currentUserEmail = response["email"] || document.getElementById('username').value;
            document.getElementById('otpMessage').textContent = response.msg;
            document.getElementById('otpModal').style.display = 'flex';
            document.getElementById('otpInput').value = ''; // Clear previous OTP
            document.getElementById('otpError').style.display = 'none';
            document.getElementById('otpInput').focus();
        }
        else if (response.status == 202) {
            // Show choice modal for verification method
            redirectUrl = response["redirectUrl"];
            currentUserEmail = document.getElementById('username').value;

            // Show/hide Google Authenticator option based on availability
            const googleAuthBtn = document.querySelector('.google-auth-btn');
            const verificationMessage = document.getElementById('verificationChoiceMessage');

            // Clear any stale error messages
            const errorDiv = document.getElementById('googleAuthError');
            if (errorDiv) {
                errorDiv.style.display = 'none';
                errorDiv.textContent = '';
            }

            if (response.has_google_auth === true) {
                // Show Google Authenticator option
                if (googleAuthBtn) {
                    googleAuthBtn.style.display = 'block';
                }
                if (verificationMessage) {
                    verificationMessage.textContent = 'Choose your preferred verification method:';
                }
            } else {
                // Hide Google Authenticator option - only Email OTP available
                if (googleAuthBtn) {
                    googleAuthBtn.style.display = 'none';
                }
                if (verificationMessage) {
                    verificationMessage.textContent = 'Please verify using Email OTP:';
                }
            }

            document.getElementById('verificationChoiceModal').style.display = 'flex';
        }
        else {
            $("#snackbar").fadeIn("slow");
            $('#snackbar').text(response.msg)
            snackbar.className = "error_show";
            setTimeout(removeSnackbar, 3000);
        }
    }
}

// Helper function to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function verifyOtp() {
    const otpInput = document.getElementById('otpInput').value.trim();
    const otpError = document.getElementById('otpError');

    // Validate OTP input
    if (!otpInput) {
        otpError.textContent = 'Please enter OTP';
        otpError.style.display = 'block';
        return;
    }

    if (otpInput.length !== 6 || !/^\d+$/.test(otpInput)) {
        otpError.textContent = 'OTP must be 6 digits';
        otpError.style.display = 'block';
        return;
    }

    // Prepare data
    const data = {
        username: currentUserEmail,
        otp: otpInput
    };

    // Disable verify button to prevent multiple clicks
    const verifyBtn = document.querySelector('.verify-btn');
    const originalText = verifyBtn.textContent;
    verifyBtn.disabled = true;
    verifyBtn.textContent = 'Verifying...';

    // Get CSRF token
    const csrftoken = getCookie('csrftoken');
    //console.log("verify-otp--->" + JSON.stringify(data))
    // Send AJAX request to verify OTP
    $.ajax({
        type: "POST",
        url: "/verify-otps/" + (redirectUrl ? ('?next=' + encodeURIComponent(redirectUrl)) : ''),
        data: { alldata: JSON.stringify(data) },
        headers: {
            'X-CSRFToken': csrftoken
        },
        success: function (response) {
            //  console.log("OTP verification response:", response);

            if (response.status == 200) {
                // OTP verified successfully
                otpError.style.display = 'none';
                closeOtpModal();

                // Update redirectUrl in case it changed
                if (response.redirectUrl) {
                    redirectUrl = response.redirectUrl;
                }

                if (response.needs_google_auth_setup) {
                    const setupModal = document.getElementById('googleAuthSetupModal');
                    if (setupModal) {
                        setupModal.style.display = 'flex';
                    }
                } else {
                    // Show success message
                    $("#snackbar").fadeIn("slow");
                    $('#snackbar').text(response.msg || 'Login successful!');
                    snackbar.className = "success_show";

                    // Redirect after a short delay
                    setTimeout(function () {
                        window.location.href = window.location.origin + (response.redirectUrl || redirectUrl);
                    }, 1000);
                }
            } else {
                // OTP verification failed
                otpError.textContent = response.msg || 'Invalid OTP';
                otpError.style.display = 'block';
                verifyBtn.disabled = false;
                verifyBtn.textContent = originalText;
                document.getElementById('otpInput').value = '';
                document.getElementById('otpInput').focus();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error verifying OTP:", error);
            otpError.textContent = 'Error verifying OTP. Please try again.';
            otpError.style.display = 'block';
            verifyBtn.disabled = false;
            verifyBtn.textContent = originalText;
        }
    });
}

function resendOtp() {
    const otpError = document.getElementById('otpError');
    const resendBtn = document.querySelector('.resend-btn');
    const originalText = "Resend OTP";  // ✅ Hardcode original text

    // Disable resend button
    resendBtn.disabled = true;
    resendBtn.textContent = 'Sending...';

    const data = {
        username: currentUserEmail
    };

    const csrftoken = getCookie('csrftoken');

    $.ajax({
        type: "POST",
        url: "/resend-otps/",
        data: { alldata: JSON.stringify(data) },
        headers: {
            'X-CSRFToken': csrftoken
        },
        success: function (response) {

            if (response.status == 200) {

                otpError.style.display = 'none';
                document.getElementById('otpMessage').textContent = response.msg;
                document.getElementById('otpInput').value = '';
                document.getElementById('otpInput').focus();

                $("#snackbar").fadeIn("slow");
                $('#snackbar').text(response.msg || 'OTP resent successfully!');
                snackbar.className = "success_show";
                setTimeout(removeSnackbar, 3000);

                // Re-enable button after 5 seconds
                setTimeout(function () {
                    resendBtn.disabled = false;
                    resendBtn.textContent = originalText;
                }, 5000);

            } else {
                otpError.textContent = response.msg || 'Failed to resend OTP';
                otpError.style.display = 'block';
                resendBtn.disabled = false;
                resendBtn.textContent = originalText;
            }
        },
        error: function () {
            otpError.textContent = 'Error resending OTP. Please try again.';
            otpError.style.display = 'block';
            resendBtn.disabled = false;
            resendBtn.textContent = originalText;
        }
    });
}
function closeOtpModal() {
    document.getElementById('otpModal').style.display = 'none';
    document.getElementById('otpInput').value = '';
    document.getElementById('otpError').style.display = 'none';
}

function chooseEmailOtp() {
    // Close choice modal and request Email OTP
    document.getElementById('verificationChoiceModal').style.display = 'none';

    const data = {
        username: currentUserEmail
    };

    const csrftoken = getCookie('csrftoken');

    $.ajax({
        type: "POST",
        url: "/resend-otps/",
        data: { alldata: JSON.stringify(data) },
        headers: {
            'X-CSRFToken': csrftoken
        },
        success: function (response) {
            if (response.status == 200) {
                document.getElementById('otpMessage').textContent = response.msg;
                document.getElementById('otpModal').style.display = 'flex';
                document.getElementById('otpInput').value = '';
                document.getElementById('otpError').style.display = 'none';
                document.getElementById('otpInput').focus();
            } else {
                $("#snackbar").fadeIn("slow");
                $('#snackbar').text(response.msg || 'Failed to send OTP');
                snackbar.className = "error_show";
                setTimeout(removeSnackbar, 3000);
            }
        },
        error: function () {
            $("#snackbar").fadeIn("slow");
            $('#snackbar').text('Error requesting OTP. Please try again.');
            snackbar.className = "error_show";
            setTimeout(removeSnackbar, 3000);
        }
    });
}

function chooseGoogleAuthenticator() {
    // Close choice modal and show Google Authenticator input
    document.getElementById('verificationChoiceModal').style.display = 'none';
    document.getElementById('googleAuthModal').style.display = 'flex';
    document.getElementById('googleAuthCode').value = '';
    document.getElementById('googleAuthError').style.display = 'none';
    document.getElementById('googleAuthCode').focus();
}

function verifyGoogleAuthenticator() {
    const code = document.getElementById('googleAuthCode').value.trim();
    const errorDiv = document.getElementById('googleAuthError');
    const verifyBtn = document.querySelector('.verify-google-auth-btn');

    // Validate code input
    if (!code) {
        errorDiv.textContent = 'Please enter Google Authenticator code';
        errorDiv.style.display = 'block';
        return;
    }

    if (code.length !== 6 || !/^\d+$/.test(code)) {
        errorDiv.textContent = 'Code must be 6 digits';
        errorDiv.style.display = 'block';
        return;
    }

    // Disable verify button
    const originalText = verifyBtn.textContent;
    verifyBtn.disabled = true;
    verifyBtn.textContent = 'Verifying...';

    const data = {
        username: currentUserEmail,
        code: code
    };

    const csrftoken = getCookie('csrftoken');

    $.ajax({
        type: "POST",
        url: "/verify-google-authenticator-login/",
        data: { alldata: JSON.stringify(data) },
        headers: {
            'X-CSRFToken': csrftoken
        },
        success: function (response) {
            if (response.status == 200) {
                errorDiv.style.display = 'none';
                closeGoogleAuthModal();

                // Show success message
                $("#snackbar").fadeIn("slow");
                $('#snackbar').text(response.msg || 'Login successful!');
                snackbar.className = "success_show";

                // Redirect after a short delay
                setTimeout(function () {
                    window.location.href = window.location.origin + (response.redirectUrl || redirectUrl);
                }, 1000);
            } else {
                errorDiv.textContent = response.msg || 'Invalid code';
                errorDiv.style.display = 'block';
                verifyBtn.disabled = false;
                verifyBtn.textContent = originalText;
                document.getElementById('googleAuthCode').value = '';
                document.getElementById('googleAuthCode').focus();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error verifying Google Authenticator:", error);
            errorDiv.textContent = 'Error verifying code. Please try again.';
            errorDiv.style.display = 'block';
            verifyBtn.disabled = false;
            verifyBtn.textContent = originalText;
        }
    });
}

function closeGoogleAuthModal() {
    document.getElementById('googleAuthModal').style.display = 'none';
    document.getElementById('googleAuthCode').value = '';
    document.getElementById('googleAuthError').style.display = 'none';
}

function closeVerificationChoiceModal() {
    document.getElementById('verificationChoiceModal').style.display = 'none';
}

// Allow Enter key to submit OTP
document.addEventListener('DOMContentLoaded', function () {
    const otpInput = document.getElementById('otpInput');
    if (otpInput) {
        otpInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                verifyOtp();
            }
        });
    }

    // Close modal when clicking outside
    const otpModal = document.getElementById('otpModal');
    if (otpModal) {
        otpModal.addEventListener('click', function (e) {
            if (e.target === otpModal) {
                closeOtpModal();
            }
        });
    }

    // Google Authenticator code input - Enter key
    const googleAuthCode = document.getElementById('googleAuthCode');
    if (googleAuthCode) {
        googleAuthCode.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                verifyGoogleAuthenticator();
            }
        });
    }

    // Close Google Auth modal when clicking outside
    const googleAuthModal = document.getElementById('googleAuthModal');
    if (googleAuthModal) {
        googleAuthModal.addEventListener('click', function (e) {
            if (e.target === googleAuthModal) {
                closeGoogleAuthModal();
            }
        });
    }

    // Close verification choice modal when clicking outside
    const verificationChoiceModal = document.getElementById('verificationChoiceModal');
    if (verificationChoiceModal) {
        verificationChoiceModal.addEventListener('click', function (e) {
            if (e.target === verificationChoiceModal) {
                closeVerificationChoiceModal();
            }
        });
    }

    // Setup Auth code input - Enter key
    const setupAuthCode = document.getElementById('setupAuthCode');
    if (setupAuthCode) {
        setupAuthCode.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                completeGoogleAuthSetup();
            }
        });
    }
});

// --- Google Authenticator Setup Functions ---

function initiateGoogleAuthSetup() {
    const csrftoken = getCookie('csrftoken');
    const step1 = document.getElementById('setupStep1');
    const step2 = document.getElementById('setupStep2');
    const qrImage = document.getElementById('qrCodeImage');
    const manualKey = document.getElementById('manualKey');

    // Show loading state if needed

    $.ajax({
        type: "POST",
        url: "/setup-google-authenticator/",
        data: { reset: 'true' }, // Force new secret for fresh setup
        headers: {
            'X-CSRFToken': csrftoken
        },
        success: function (response) {
            if (response.status == 200) {
                qrImage.src = response.qr_code;
                manualKey.textContent = response.manual_entry_key;

                step1.style.display = 'none';
                step2.style.display = 'block';
                document.getElementById('setupAuthCode').focus();
            } else {
                alert("Failed to initiate setup: " + response.msg);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error initiating setup:", error);
            alert("Error connecting to server.");
        }
    });
}

function completeGoogleAuthSetup() {
    const code = document.getElementById('setupAuthCode').value.trim();
    const errorDiv = document.getElementById('setupAuthError');
    const verifyBtn = document.querySelector('#setupStep2 .verify-btn');
    const originalText = verifyBtn.textContent;

    if (!code || code.length !== 6) {
        errorDiv.textContent = 'Please enter a valid 6-digit code';
        errorDiv.style.display = 'block';
        return;
    }

    verifyBtn.disabled = true;
    verifyBtn.textContent = 'Verifying...';

    const data = {
        code: code
    };

    const csrftoken = getCookie('csrftoken');

    $.ajax({
        type: "POST",
        url: "/verify-google-authenticator-setup/",
        data: { alldata: JSON.stringify(data) },
        headers: {
            'X-CSRFToken': csrftoken
        },
        success: function (response) {
            if (response.status == 200) {
                // Success!
                errorDiv.style.display = 'none';
                $("#googleAuthSetupModal").fadeOut();

                $("#snackbar").fadeIn("slow");
                $('#snackbar').text(response.msg || 'Google Authenticator Enabled!');
                snackbar.className = "success_show";

                // Redirect to dashboard
                setTimeout(function () {
                    window.location.href = window.location.origin + redirectUrl;
                }, 1500);
            } else {
                errorDiv.textContent = response.msg || 'Invalid code';
                errorDiv.style.display = 'block';
                verifyBtn.disabled = false;
                verifyBtn.textContent = originalText;
            }
        },
        error: function (xhr, status, error) {
            console.error("Error verifying setup:", error);
            errorDiv.textContent = 'Error verifying code. Please try again.';
            errorDiv.style.display = 'block';
            verifyBtn.disabled = false;
            verifyBtn.textContent = originalText;
        }
    });
}

function skipGoogleAuthSetup() {
    $("#googleAuthSetupModal").fadeOut();
    window.location.href = window.location.origin + redirectUrl;
}

function validation() {
    allFeildValid = true;
    $('.input_effect').each(function (e) {
        if ($(this).val() == '' || $(this).val() == null) {
            $(this).css('border-color', '#FF7588');
            // $(this).parent().find("label").css('color','#ff9eac');
            allFeildValid = false;
        }
        else {
            $(this).css('border-color', '#BABFC7');
            // $(this).parent().find("label").css('color','#404E67');
        }
    });
    return allFeildValid;
}
function onSave(action) {
    requestData = {};
    if (action == 'generateotp') {
        if ($('#fusername').val() == '') {
            $('#dialog-for-forgotpassword #addbtn').attr('data-dismiss', " ");
            $('#fusername-error-msg').text('Field cannot be empty');
            $('#fusername-label').css('color', '#ff9eac');
        }
        else {
            $('#fusername-error-msg').text(' ');
            $('#fpassword-label').css('color', '#404E67');
            requestData['username'] = $('#dialog-for-forgotpassword #fusername').val();
            requestDataFromServer('/login/generateOtp', { 'allData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
                //  console.log("response--->" + JSON.stringify(response))
                $('#dialog-for-forgotpassword #error-message-view').css('display', 'block');
                //  console.log("forget--->"+response.status)
                if (response.status == 200) {
                    $('#dialog-for-forgotpassword #error-message-view #error-message').text(response.msg);
                    $('#dialog-for-forgotpassword #error-message-view #error-message').removeClass().addClass('green')
                    $('#fusername').parent().find("label").parent().css("display", 'none');
                    $('#fotp').parent().find("label").parent().css("display", 'block');
                    $('#dialog-for-forgotpassword #addbtn').html('Submit')
                    $('#dialog-for-forgotpassword #addbtn').attr('onclick', 'onSave(\'submitotp\')')
                    selectedUsername = requestData['username']
                }
                else {
                    $('#dialog-for-forgotpassword #error-message-view #error-message').text(response.msg);
                    $('#dialog-for-forgotpassword #error-message-view #error-message').removeClass().addClass('red')
                }
            });
        }
    }
    if (action == 'submitotp') {
        if ($('#fotp').val() == '') {
            $('#dialog-for-forgotpassword #addbtn').attr('data-dismiss', " ");
            $('#fotp-error-msg').text('Field cannot be empty');
            $('#fotp-label').css('color', '#ff9eac');
        }
        else {
            $('#fotp-error-msg').text(' ');
            $('#fotp-label').css('color', '#404E67');
            requestData = {}
            requestData['username'] = selectedUsername
            requestData['otp'] = $('#fotp').val()
            requestDataFromServer('/login/verifyOTP', { 'allData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
                $('#dialog-for-forgotpassword #error-message-view').css('display', 'block');
                if (response.status != 200) {
                    $('#dialog-for-forgotpassword #error-message-view #error-message').text(response.msg);
                    $('#dialog-for-forgotpassword #error-message-view #error-message').removeClass().addClass('red')
                }
                else {
                    $('#dialog-for-forgotpassword #error-message-view').css('display', 'none');
                    $('#dialog-for-forgotpassword #error-message-view #error-message').text(response.msg);
                    $('#dialog-for-forgotpassword #error-message-view #error-message').removeClass().addClass('red')
                    $('#fotp').parent().find("label").parent().css("display", 'none');
                    $('#fnewpsw').parent().find("label").parent().css("display", 'block');
                    $('#fconfirmpsw').parent().find("label").parent().css("display", 'block');
                    $('#dialog-for-forgotpassword #addbtn').html('Save')
                    $('#dialog-for-forgotpassword #addbtn').attr('onclick', 'onSave(\'savepassword\')')
                }
            });
        }
    }
    if (action == 'savepassword') {
        var isAllInputsFilled = checkAllfeildsfilled('forgotpsw')
        var regpassword = new RegExp("^[a-zA-Z0-9@#$%^&*]{8,}$");
        if (isAllInputsFilled == false)
            $('#dialog-for-forgotpassword #addbtn').attr('data-dismiss', " ");
        else if (!regpassword.test($('#fnewpsw').val())) {
            $('#dialog-for-forgotpassword #addbtn').attr('data-dismiss', " ");
            $('#fnewpsw-error-msg').text("Password too short (Minimum 8 characters)");
            $('#fnewpsw-label').css('color', '#ff9eac');
        }
        else if ($('#fnewpsw').val() !== $('#fconfirmpsw').val()) {
            $('#dialog-for-forgotpassword #addbtn').attr('data-dismiss', " ");
            $('#fconfirmpsw-error-msg').text('New Password and Confirm Password are not same');
            $('#fconfirmpsw-label').css('color', '#ff9eac');
        }
        else {
            requestData = {}
            requestData['username'] = selectedUsername
            requestData['newpsw'] = $('#fnewpsw').val()
            $('#dialog-for-forgotpassword #addbtn').attr('data-dismiss', "modal");
            requestDataFromServer('/login/forgotPassword', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
                if (response.status == 200) {
                    $("#snackbar").fadeIn();
                    $('#snackbar').text(response.msg);
                    snackbar.className = "sucess_show";
                }
                else {
                    $("#snackbar").fadeIn();
                    $('#snackbar').text(response.msg);
                    snackbar.className = "error_show";
                }
            });

        }
    }
}
$('#forgotpassword-span').click(function () {
    $('.fpassword_input').each(function (e) {
        id = $(this).attr('id')
        $("#dialog-for-forgotpassword #" + id).val('')
        $(this).parent().find("label").css('color', '#404E67');
        $(this).parent().find(".error-msg").text(' ');
    });
    $('#dialog-for-forgotpassword #addbtn').html('Generate OTP')
    $('#dialog-for-forgotpassword #addbtn').attr('onclick', 'onSave(\'generateotp\')')
    $('#fusername').parent().find("label").parent().css("display", 'block');
    $('#fotp').parent().find("label").parent().css("display", 'none');
    $('#fnewpsw').parent().find("label").parent().css("display", 'none');
    $('#fconfirmpsw').parent().find("label").parent().css("display", 'none');
    $('#dialog-for-forgotpassword #addbtn').attr('data-dismiss', " ");
});
$('#rememberme').click(function () {
    if ($('#rememberme').is(':checked')) {
        document.cookie = "rememberme=yes;path" + document.location
        var u = document.getElementById('username').value;
        var p = document.getElementById('password').value;
        var r = document.getElementById('rememberme').value;
        // console.log('REMEMBERME\nUSERNAME--->' + u+'\nPASSWORD--->'+p)
        document.cookie = "username=" + u + ";path=" + document.location;
        document.cookie = "password=" + p + ";path=" + document.location;
    }
    else {
        document.cookie = "rememberme=no;path" + document.location
        document.cookie = "username=;path=http:" + document.location;
        document.cookie = "password=;path" + document.location;

    }
});
function getcookiedata() {
    var user = getCookie('username');
    var pswd = getCookie('password');
    var remember = getCookie('rememberme');
    // console.log('GETCOOKIEDATA\nUSERNAME--->' + user + '\nPASSWORD--->' + pswd)
    document.getElementById('username').value = user;
    document.getElementById('password').value = pswd;
    if (remember == 'yes') {
        document.getElementById('rememberme').checked = true;
    } else {
        document.getElementById('rememberme').checked = false;
    }
}
