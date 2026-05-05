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
    getsiteinfo();
    rolename();
    getallTicketSiteNames(); // Initialize site-based incident data
});

function getsiteinfo() {
    //requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite' }, "GET").done(function (response) {
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            sitePageResponse = res.data;
            //getBodEodkeys();
           // console.log("sitePageResponse----->" + JSON.stringify(sitePageResponse))
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
        //console.log("currentUser---->" + JSON.stringify(currentUser))
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

function getallTicketSiteNames() {
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', isOnlyEnabled: 'true', site: params.get("site") }, "GET").done(function (response) {
        let res = JSON.parse(response);
        if (res.status == 200) {
            let ticketSiteResponse = res.data;
            getChartData(ticketSiteResponse);
            
            // Initialize top bar LEDs if function exists
            if (typeof ledColors === "function") {
                ledColors(res['data'][0]['sitename'], res['data'][0]['le_url'], res['data'][0]['websocket_url']);
            }
        }
    });
}

function getChartData(siteresponse) {
    if (typeof showLoader === "function") {
        showLoader("dashboard-tickets");
        showLoader("tickets-card");
    }
    
    // Fetch time-series incident data from the PostgreSQL database using organization routing
    var siteData = siteresponse[0];
    var siteName = siteData.sitename;

    requestDataFromServer("/incidents/api/chart-data", { 
        'sites': JSON.stringify(siteData), 
        'view': 'siteview', 
        'periods': 7 
    }, "GET").done(function (response) {
        if (response.code == 200) {
            var chart_res = response.chartData;
            var data = [];
            
            // Header for Line Chart: [Date, P1, P2, P3, P4]
            var headData = ['Date', 'P1', 'P2', 'P3', 'P4'];
            data.push(headData);

            if (chart_res && chart_res.length > 0) {
                chart_res.forEach(function (row) {
                    // row format: [date_str, p1_count, p2_count, p3_count, p4_count]
                    if (typeof row[0] === 'string') {
                        row[0] = new Date(row[0].replaceAll('-', ','));
                    }
                    data.push(row);
                });
            }

            var title = 'Incident Analytics - ' + siteName;

            // Use modern Chart.js drawing function for Sites page
            if (typeof drawModernIncidentChart === "function") {
                drawModernIncidentChart(data, title);
            } else if (typeof drawSeriesChart === "function") {
                // Fallback to Google Charts if new function not found
                if (typeof google !== "undefined" && google.charts && google.charts.setOnLoadCallback) {
                    google.charts.setOnLoadCallback(function() {
                        drawSeriesChart(data, title);
                    });
                } else {
                    drawSeriesChart(data, title);
                }
            }
            
            // If No non-zero data found
            if (data.length <= 1) {
                var html = '<h3 style="background-color:rgba(18, 18, 18, 0.8);color:#888;border-radius:10px;font-size:14px;padding:15px;text-align:center;width:100%;border: 1px solid #333">NO RECENT INCIDENTS RECORDED</h3>';
                $("#IncidentsOverview #print-error").empty().append(html);
                $("#series_chart_parent #loader").hide();
            } else {
                $("#IncidentsOverview #print-error").empty();
            }

        } else {
            var errorMsg = response.message || "ERROR FETCHING INCIDENT DATA";
            var html = '<h3 style="background-color:#a33219;color:white;border-radius:10px;font-size:14px;padding:15px;text-align:center;width:100%">' + errorMsg.toUpperCase() + '</h3>';
            $("#IncidentsOverview #print-error").empty().append(html);
            $("#series_chart_parent #loader").hide();
        }
    });
}
