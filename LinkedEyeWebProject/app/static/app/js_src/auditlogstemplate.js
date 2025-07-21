var logList;
var sitenames;
$(document).ready(function()
{
    getLogs()
    getallApplicationName()
});
function getLogs() 
{
    showLoader("auditlogstemplate")
    requestDataFromServer('/auditlogs/getAuditlogs', {}, "GET").done(logsResponse);
}
function logsResponse(response) {
    stopLoader("auditlogstemplate")
    if(response.status == 200)
    {
        $("#auditlogstemplate #table-view").show();
        $("#auditlogstemplate-nodata").hide()
        response.data.forEach(function(obj)
        {
            addLogRow(obj) 
        });
        let options = {
            valueNames: [
              'status', 'username', 'action',
              { name: 'date', attr: 'data-timestamp' }
            ]
        };
        logList = new List('auditlogstemplate', options);
    }
    else
    {
        response.msg ? msg = response.msg : msg = 'No logs available' 
        $("#auditlogstemplate #table-view").hide();
        $("#auditlogstemplate-nodata").show()
        $("#auditlogstemplate-nodata #tryagainbtn").prop('disabled', false);
        $("#auditlogstemplate-nodata #nodatamessage").text(msg);
    }
    
}
function addLogRow(logObj) 
{
    var messageStyle = 'display: inline-block; width: 400px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'
    var date = new Date(logObj.created*1000)
    var year = date.getFullYear();
	var monthnum = date.getMonth();
	var day = date.getDate();
    var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
    createdDate = day+" "+month[monthnum]+", "+year+" "+hours+":"+minutes+":"+seconds;
    logHtml = ' '
    logHtml +=      '<tr id='+logObj.id+'>'
    logHtml +=          '<td class="date pl-1" data-timestamp="'+logObj.created+'" >'+createdDate+'</td>'
    logHtml +=          '<td class="username">'+logObj.username+'</td>'
    logHtml +=          '<td class="action">'+logObj.action+'</td>'
    logHtml +=          '<td class="status">'+logObj.status+'</td>'
    logHtml +=          '<td style="'+messageStyle+'" data-toggle="tooltip" title="'+logObj.message+'">'+logObj.message+'</td>'
    logHtml +=      '</tr>'
    $("#auditlogstemplate #data tbody").append(logHtml);
}
function onRecentLogs()
{
	logList.sort('date',  { order: "desc" } )
}

function getallApplicationName() {
    requestDataFromServer('/applications/getallapplicationnames', {}, "GET").done(allapplicationNamesResponse);
}
function allapplicationNamesResponse(response) {
    let res = JSON.parse(response);
    //console.log("allapplicationNamesResponse--->", res);

    if (res.status === 200 && Array.isArray(res.data)) {
        let uiLogs = document.getElementById("ui-logs");
        uiLogs.innerHTML = ""; // Clear previous content

        ["PROD", "UAT", "DEV"].forEach(env => {
            let envContainer = document.createElement("div");
            envContainer.classList.add("environment-container");

            let envLabel = document.createElement("div");
            envLabel.textContent = env;
            envLabel.classList.add("environmentaling-label");
            envLabel.addEventListener("click", () => toggleSiteList(env));

            let siteList = document.createElement("ul");
            siteList.classList.add("uisites-list");
            siteList.setAttribute("data-env", env);
            siteList.style.display = "none"; // Initially hidden

            envContainer.appendChild(envLabel);
            envContainer.appendChild(siteList);
            uiLogs.appendChild(envContainer);
        });
    }

    getallSiteNames(); // Fetch site names after applications are loaded
}

function getallSiteNames() {
    requestDataFromServer('/lesites/getallsitenames', { type: 'all' }, "GET").done(allsiteNamesResponse);
}

function allsiteNamesResponse(response) {
    let res = JSON.parse(response);

    if (res.status === 200 && Array.isArray(res.data)) {
        let environments = { DEV: [], UAT: [], PROD: [] };

        res.data.forEach(site => {
            if (environments[site.environment]) {
                environments[site.environment].push(site.sitename);
            }
        });

        ["PROD", "UAT", "DEV"].forEach(env => {
            let siteList = document.querySelector(`.uisites-list[data-env='${env}']`);
            siteList.innerHTML = ""; // Clear previous content

            environments[env].forEach(name => {
                let listItem = document.createElement("li");
                listItem.textContent = name;
                listItem.setAttribute("data-sitename", name); // ✅ Add this attribute
                listItem.addEventListener("click", function () {
                    console.log("Clicked sitename:", name);
                    getLogFiles(name, this);  // ✅ Pass `this` (clicked `li`) to `getLogFiles()`
                });

                // ✅ Create a nested list to hold logs
                let logList = document.createElement("ul");
                logList.classList.add("log-files-list");
                logList.style.display = "none"; // Hide initially
                listItem.appendChild(logList);

                siteList.appendChild(listItem);
            });
        });
    }
}

function toggleSiteList(env) {
    let siteList = document.querySelector(`.uisites-list[data-env='${env}']`);
    console.log("toggleSiteList---->" + siteList)
    if (siteList.style.display === "none" || siteList.style.display === "") {
        // Hide all other lists first
        document.querySelectorAll(".uisites-list").forEach(list => list.style.display = "none");

        // Show the clicked environment's list
        siteList.style.display = "block";
    } else {
        siteList.style.display = "none";
    }
}

function getLogFiles(sitename, listItem) {
    console.log(`Fetching logs for sitename: "${sitename}"`);

    requestDataFromServer('/auditlogs/get_logs/', { sitename: sitename }, "GET")
        .done(response => {
            console.log(`getLogFiles Response sitename ${sitename} --->`, response);

            if (response.status === 200 && response.files.length > 0) {
                let logModal = document.getElementById("logModal");
                let logContent = document.getElementById("logContent");
                logContent.innerHTML = ""; // Clear previous content

                let matchedFiles = response.files.filter(filename => filename.includes(`_${sitename}.txt`));

                if (matchedFiles.length === 0) {
                    swal("No Logs Found", `No log files found for "${sitename}".`, "warning");
                    return;
                }

                matchedFiles.forEach(filename => {
                    let logItem = document.createElement("p");
                    logItem.textContent = decodeURIComponent(filename); // ✅ Decode URL characters
                    logItem.style.cursor = "pointer";
                    logItem.style.color = "#ffffff"; // Highlight as clickable
                    logItem.addEventListener("click", () => viewLogFile(filename)); // Fetch log content on click

                    logContent.appendChild(logItem);
                });

                logModal.style.display = "block"; // Show modal
            } else {
                swal("Error Fetching Logs", response.error || "No files found", "error");
            }
        })
        .fail(error => {
            swal("AJAX Request Failed", "Could not retrieve logs. Please try again.", "error");
            console.error("AJAX request failed:", error);
        });
}

function viewLogFile(filename) {
    console.log("Clicked log:", filename); // Debugging log
    let logUrl = `/auditlogs/get_log_file/${encodeURIComponent(filename)}/`;

    fetch(logUrl)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.text();
        })
        .then(logText => {
            let logContent = document.getElementById("logContent");
            logContent.innerHTML = `<h3>${decodeURIComponent(filename)}</h3><pre>${logText}</pre>`; // ✅ Show content
        })
        .catch(error => console.error("Error fetching log file:", error));
}

// Close modal when clicking the close button
document.querySelector(".closeing").addEventListener("click", () => {
    document.getElementById("logModal").style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", event => {
    let modal = document.getElementById("logModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});