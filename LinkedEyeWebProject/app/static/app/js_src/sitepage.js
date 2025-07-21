// JavaScript source code
//redisKeys = [];
var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
var connectionTries = 6;
var isWSConnected = false;
//sites = []
var siteHtml = ' '
//selectedsite = ' '
var sitePageResponse

$(document).ready(function () {
    getsiteinfo()
    rolename()
})

function getsiteinfo() {
    //requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite' }, "GET").done(function (response) {
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site")}, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            sitePageResponse = res.data;
            //getBodEodkeys();
        }
    });
}

function getSiteList() {
    showLoader("bod-eodstatus")
    requestDataFromServer('/lesites/getallsitenames', { type: 'userbased', isOnlyEnabled: true }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            sitePageResponse = res.data;
            getBodEodkeys();
        }
        else
            stopLoader("bod-eodstatus")
    });
}

function rolename() {
    requestDataFromServer('/notificationsettings/getallservices', {}, "GET").done(function (response) {
        //console.log("rolename--->", response);

        let parsedResponse = typeof response === "string" ? JSON.parse(response) : response;

        const currentEmail = parsedResponse.userobj.email; // use email instead of username
        getrolelist(currentEmail);
    });
}

function getrolelist(currentEmail) {
    requestDataFromServer('/useronboard/getuserlist', {}, "GET").done(function (response) {
       // console.log("getrolelist--->", response);

        let parsedResponse = typeof response === "string" ? JSON.parse(response) : response;

        const userList = parsedResponse.data;
        const currentUser = userList.find(user => user.email === currentEmail);

        if (!currentUser) {
            console.warn("User not found in list.");
            return;
        }

        const role = currentUser.role;
        //console.log("User role:", role);

        // If UserView — hide both sob_LED and oms_LED
        if (role === "UserView") {
            //console.log("UserView detected — hiding both sob_LED and oms_LED");
            document.querySelectorAll('.sob_LED, .oms_LED').forEach(elem => elem.style.display = 'none');
            return; // Exit early to avoid any other logic
        }

        // Show sob_LED only if Admin, Onboard, or ViewOnly — but NOT Management
        if (["Admin", "Onboard", "ViewOnly"].includes(role)) {
            //console.log("Showing sob_LED");
            document.querySelectorAll('.sob_LED').forEach(elem => elem.style.display = 'block');
        } else {
            //console.log("Hiding sob_LED");
            document.querySelectorAll('.sob_LED').forEach(elem => elem.style.display = 'none');
        }

        // Show oms_LED if role is Admin, ViewOnly, or Management
        if (["Admin", "ViewOnly", "Management", "Onboard"].includes(role)) {
           // console.log("Showing oms_LED");
            document.querySelectorAll('.oms_LED').forEach(elem => elem.style.display = 'block');
        } else {
           // console.log("Hiding oms_LED");
            document.querySelectorAll('.oms_LED').forEach(elem => elem.style.display = 'none');
        }
    });
}


