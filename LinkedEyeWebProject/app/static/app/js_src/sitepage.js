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
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            sitePageResponse = res.data;
            //getBodEodkeys();
            console.log("sitePageResponse----->" + JSON.stringify(sitePageResponse))
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

// ===== ROLE → PAGE ACCESS MATRIX =====
const ROLE_ACCESS = {
    BOD: ["Admin", "ViewOnly", "Management", "Onboard", "UserView", "TradeSupport", "Risk"],
    APM: ["Admin", "ViewOnly", "Management", "Onboard", "UserView", "TradeSupport", "Risk"],
    LEADP: ["Admin", "ViewOnly", "Management", "Onboard", "UserView", "TradeSupport", "Risk"],
    EOD: ["Admin", "ViewOnly", "Management", "Onboard", "UserView", "TradeSupport", "Risk"],
    OMS: ["Admin", "ViewOnly", "Management", "Onboard", "Risk"],
    DOMAIN: ["Admin", "ViewOnly", "Management", "Onboard", "UserView", "TechInfra"],
    TICKET: ["Admin", "ViewOnly", "Management", "Onboard", "UserView", "TechInfra", "TradeSupport", "Risk"],
    ONBOARD: ["Admin", "ViewOnly", "Onboard"]
};
// ===== PAGE → DOM SELECTOR MAPPING =====
const MENU_MAP = {
    BOD: ".bod_LED",
    APM: ".adp_LED",
    LEADP: ".le_adp_LED",
    EOD: ".eod_LED",
    OMS: ".oms_LED",
    DOMAIN: "#entityLED",
    TICKET: "#ticket-iconn",
    ONBOARD: ".sob_LED"
};
function getrolelist(currentEmail) {
    requestDataFromServer('/useronboard/getuserlist', {}, "GET").done(function (response) {
        //console.log("getrolelist---->"+(response))
        const parsed = typeof response === "string"
            ? JSON.parse(response)
            : response;

        const users = parsed.data || [];
        const currentUser = users.find(u => u.email === currentEmail);
        console.log("currentUser---->" + JSON.stringify(currentUser))
        if (!currentUser) return;

        const role = currentUser.role;
        //console.log("Active role:", role);

        Object.keys(MENU_MAP).forEach(pageKey => {
            const selector = MENU_MAP[pageKey];
            const allowedRoles = ROLE_ACCESS[pageKey];

            document.querySelectorAll(selector).forEach(el => {
                const menuAnchor = el.closest('a');
                if (!menuAnchor) return;

                if (allowedRoles.includes(role)) {
                    menuAnchor.classList.remove("menu-hidden");
                } else {
                    menuAnchor.classList.add("menu-hidden");
                }
            });
        });
    });
}

function openIncidentPage() {
    // Open internal incidents page in current tab
    var siteName = GetURLParameter('site');
    var incidentsUrl = '/incidents/';
    if (siteName) {
        incidentsUrl += '?site=' + siteName;
    }
    window.location.href = incidentsUrl;
}
