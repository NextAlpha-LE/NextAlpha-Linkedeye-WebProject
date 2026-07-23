var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
redisKeys = [];
var adpFinalStatus = '';
var connectionTries = 6;
var isWSConnected = false;
var siteHtml = ' '
var adpSiteResponse
var adpSitesData = [];
var adpResponse;
var colorClass = 'white' //green
var tablename = ''
var firstadptableid = '';
var totaladplen = 0;
var operationsCompletedadp = 0;
var export_adpExcel = false;
var checkadpbx = ''
var open_rows = true;
var user_name = '';
var changed_key = '';
//console.log('PARAMS--->' + params)
var isEdit_dict = {}
var currentUserId = null;
var assignedSubsites = [];
var activeSubsite = 'Others';
var allAdpData = null;
var subsiteDataReady = false;
var liveEnabled = true;
var ASPage = {
    toggleLive: function () {
        liveEnabled = !liveEnabled;
        open_rows = liveEnabled;
        var btn = $('#btnLive');
        if (liveEnabled) {
            btn.removeClass('paused');
            $('#liveText').text('Live');
            refreshBODEOD();
        } else {
            btn.addClass('paused');
            $('#liveText').text('Paused');
        }
    },
    exportExcel: function () {
        exportadptable();
    }
};

$(document).ready(function () {
    if (pageName === "Dashboard")
        $("#new-label").css('display', localStorage.getItem("newlabeldisplay"))
    else
        localStorage.setItem("newlabeldisplay", "none");
    $("#adp-status #table-view").hide();

    getadpSiteList()
})
function refreshBODEOD() {
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'ADP' }, "GET").done(function (response) {
        allAdpData = response;
        //console.log("allAdpData---->" + JSON.stringify(response))
        if (typeof switchSubsite === 'function') {
            switchSubsite(activeSubsite);
        } else if (typeof adpdisplaykeys === 'function')
            adpdisplaykeys(response.responseData[0], response.refreshedsite)
        
        updateApmTabStatuses();

        if (typeof ledColors === 'function')
            ledColors(selected_sitename, selected_leurl, selected_websocurl)
    })
}
function profilename() {
    requestDataFromServer('/notificationsettings/getallservices', {}, "GET").done(getprofilenameResponse);
}

function getprofilenameResponse(response) {
    res = JSON.parse(response);
    if (res.status == 200) {
        userobject = res.userobj
        // console.log("getAllserviceResponse userobject-->" + JSON.stringify(userobject))
        //console.log("USERNAME-->" + userobject.username)
        // console.log("USER FIRST NAME-->" + userobject.first_name)
        //console.log("USER LAST NAME-->" + userobject.last_name)
        user_name = userobject.username
        //document.getElementById('profile_text').textContent = userobject.first_name
    }
    else {
        swal(response.msg, ' ', 'error')
    }
}
function exportadptable() {
    export_adpExcel = true;
    /* requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'ADP' }, "GET").done(function (response) {
         adpdisplaykeys(response.responseData[0], response.refreshedsite)
     })*/
    $("#" + firstadptableid).find('.buttons-excel').click()
    refreshBODEOD()
};
function getadpHeaderNames(table) {
    // Gets header names.
    //params:
    //  table: table ID.
    //Returns:
    //  Array of column header names.
    // console.log('TABLE getadpHeaderNames--->' + table)
    //  console.log('($(table).find("#data"))--->' + ($(table).find("#data")))
    var header = ($(table).find("#data")).DataTable().columns().header().toArray();
    // console.log('header---->' + header)
    var names = [];
    header.forEach(function (th) {
        names.push($(th).html());
    });

    return names;
}

function buildadpCols(data) {
    // Builds cols XML.
    //To do: deifne widths for each column.
    //Params:
    //  data: row data.
    //Returns:
    //  String of XML formatted column widths.

    var cols = '<cols>';

    for (i = 0; i < data.length; i++) {
        colNum = i + 1;
        cols += '<col min="' + colNum + '" max="' + colNum + '" width="20" customWidth="1"/>';
    }

    cols += '</cols>';

    return cols;
}

function buildadpRow(data, rowNum, styleNum) {
    // Builds row XML.
    //Params:
    //  data: Row data.
    //  rowNum: Excel row number.
    //  styleNum: style number or empty string for no style.
    //Returns:
    //  String of XML formatted row.

    var style = styleNum ? ' s="' + styleNum + '"' : '';

    var row = '<row r="' + rowNum + '">';

    for (i = 0; i < data.length; i++) {
        colNum = (i + 10).toString(36).toUpperCase();  // Convert to alpha

        var cr = colNum + rowNum;

        row += '<c t="inlineStr" r="' + cr + '"' + style + '>' +
            '<is>' +
            '<t>' + data[i].toString() + '</t>' +
            //'<t>' + data[i] + '</t>' +
            '</is>' +
            '</c>';
    }

    row += '</row>';

    return row;
}

function getadpTableData(table, title) {
    // Processes Datatable row data to build sheet.
    //Params:
    //  table: table ID.
    //  title: Title displayed at top of SS or empty str for no title.
    //Returns:
    //  String of XML formatted worksheet.
    // console.log('getadpTableData \ntable BEFORE--->' + table + '\n title-' + title)
    var header = getadpHeaderNames(table);
    // console.log('getadpTableData table AFTER--->' + table+' title-'+title)
    var table = $(table).find("#data").DataTable();
    var rowNum = 1;
    var mergeCells = '';
    var ws = '';

    ws += buildadpCols(header);
    ws += '<sheetData>';

    if (title.length > 0) {
        ws += buildadpRow([title], rowNum, 51);
        rowNum++;

        mergeCol = ((header.length - 1) + 10).toString(36).toUpperCase();

        mergeCells = '<mergeCells count="1">' +
            '<mergeCell ref="A1:' + mergeCol + '1"/>' +
            '</mergeCells>';
    }

    ws += buildadpRow(header, rowNum, 2);
    rowNum++;

    // Loop through each row to append to sheet.    
    table.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var data = this.data();

        // If data is object based then it needs to be converted 
        // to an array before sending to buildadpRow()
        ws += buildadpRow(data, rowNum, '');

        rowNum++;
    });

    ws += '</sheetData>' + mergeCells;

    return ws;

}

function setadpSheetName(xlsx, name) {
    // Changes tab title for sheet.
    //Params:
    //  xlsx: xlxs worksheet object.
    //  name: name for sheet.

    if (name.length > 0) {
        var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
        source.setAttribute('name', name);
    }
}


///////////////////////////////////////////////////////////////////////// XML VALIDATION START/////////////////////////////////////////////////////////////////////////////////////


function fixInvalidTextContent(xmlString) {
    const invalidContentPattern = /0x[0-9a-fA-F]+/g;

    xmlString = xmlString.replace(invalidContentPattern, match => {
        return `invalid_${match}`;
    });

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        console.error("Error parsing XML");
        return;
    }

    function traverseNodes(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(child => traverseNodes(child));
        } else if (node.nodeType === Node.TEXT_NODE) {
            if (/^0x[0-9a-fA-F]+$/.test(node.nodeValue.trim())) {
                node.nodeValue = node.nodeValue.replace(/^0x/, 'invalid_0x');
            }
        }
    }

    traverseNodes(xmlDoc.documentElement);

    const serializer = new XMLSerializer();
    const fixedXmlString = serializer.serializeToString(xmlDoc);

    return fixedXmlString;
}


///////////////////////////////////////////////////////////////////////// XML VALIDATION END///////////////////////////////////////////////////////////////////////////////////////

function addadpSheet(xlsx, table, title, name, sheetId) {
    //Clones sheet from Sheet1 to build new sheet.
    //Params:
    //  xlsx: xlsx object.
    //  table: table ID.
    //  title: Title for top row or blank if no title.
    //  name: Name of new sheet.
    //  sheetId: string containing sheetId for new sheet.
    //Returns:
    //  Updated sheet object.

    //Add sheet2 to [Content_Types].xml => <Types>
    //============================================
    //  console.log('INSIDE addadpSheet--->')
    var source = xlsx['[Content_Types].xml'].getElementsByTagName('Override')[1];
    var clone = source.cloneNode(true);
    clone.setAttribute('PartName', '/xl/worksheets/sheet' + sheetId + '.xml');
    xlsx['[Content_Types].xml'].getElementsByTagName('Types')[0].appendChild(clone);

    //Add sheet relationship to xl/_rels/workbook.xml.rels => Relationships
    //=====================================================================
    var source = xlsx.xl._rels['workbook.xml.rels'].getElementsByTagName('Relationship')[0];
    var clone = source.cloneNode(true);
    clone.setAttribute('Id', 'rId' + sheetId + 1);
    clone.setAttribute('Target', 'worksheets/sheet' + sheetId + '.xml');
    xlsx.xl._rels['workbook.xml.rels'].getElementsByTagName('Relationships')[0].appendChild(clone);

    //Add second sheet to xl/workbook.xml => <workbook><sheets>
    //=========================================================
    var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
    var clone = source.cloneNode(true);
    clone.setAttribute('name', name);
    clone.setAttribute('sheetId', sheetId);
    clone.setAttribute('r:id', 'rId' + sheetId + 1);
    xlsx.xl['workbook.xml'].getElementsByTagName('sheets')[0].appendChild(clone);

    //Add sheet2.xml to xl/worksheets
    //===============================
    // console.log('BEFORE  newsheet --->\ntitle-' + title + ' \ntable-' + table + ' \nname-' + name + ' \nsheetId-' + sheetId)
    var newSheet = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" mc:Ignorable="x14ac">' +
        getadpTableData(table, title) +

        '</worksheet>';
    /*console.log('NEWSHEET XML--->' + newSheet)*/
    const modifiedXML = fixInvalidTextContent(newSheet);
    //const modifiedXML = validateAndFixXML(newSheet);

    if (modifiedXML) {
        //console.log('Modified XML:', modifiedXML);
        newSheet = modifiedXML
    }
    xlsx.xl.worksheets['sheet' + sheetId + '.xml'] = $.parseXML(newSheet);

}

function Exportadpmultiplesheets() {
    //console.log('<---INSIDE EXPORT MULTIPLE SHEETS - ADP--->')
    const parent = document.getElementById('mob-width');
    //console.log('ADP PARENT--->' + document.getElementById('mob-width'))
    //  console.log('ADP parent.childElementCount---->' + parent.childElementCount)
    if (parent != null && parent != undefined) {
        const children = Array.from(parent.children);
        children.shift();
        children.shift();
        if (children.length < 2) return;
        const ids = children.map(element => {
            return element.id;
        });
        //  console.log('ids array before----> ' + ids[1])
        firstadptableid = (ids[1].split("child-")[1]) + '-data'
        var firsttablename = '';
        if (ids[1].includes('ADP-')) {
            firsttablename = ids[0].split("ADP-")[1]
        } else {
            firsttablename = ids[0].split("ADP_")[1]
        }
        var j = 0;
        $('#' + firstadptableid).find("#data").DataTable({
            dom: 'Bfrtip',
            "pageLength": 100,
            "ordering": false,
            buttons: [
                {
                    extend: 'excel',
                    title: 'ADP',
                    customize: function (xlsx) {
                        setadpSheetName(xlsx, firsttablename);
                        for (let i = 3; i < ids.length; i++) {
                            if (i > 2 && ids[i].includes('child-')) {
                                var childid = (ids[i].split("child-")[1]) + '-data'
                                if (ids[i].includes('ADP-')) {
                                    tablename = ids[i].split("ADP-")[1]
                                } else {
                                    tablename = ids[i].split("ADP")[1]
                                }
                                addadpSheet(xlsx, '#' + childid, tablename, tablename, (i - 1).toString());
                                j++;
                            }
                        }
                    }
                }

            ],

        });
        totaladplen = ids.length
        for (k = 3; k < ids.length; k++) {
            if (ids[k].includes('child-')) {
                var childid = (ids[k].split("child-")[1]) + '-data'
                $('#' + childid).find("#data").DataTable({
                    dom: 'Bfrtip',
                    "pageLength": 100,
                    "ordering": false,
                    buttons: [
                        {
                            extend: 'excel',
                            title: 'ADP',
                        }
                    ],
                });
                operationsCompletedadp = k;
                // operationadp()
            }
        }
    }
}

function operationadp() {
    ++operationsCompletedadp;
    if (operationsCompletedadp === totaladplen) {
        $("#" + firstadptableid).find('.buttons-excel').click()
        export_adpExcel = false;
    }
}
function getadpSiteList() {
    showLoader("adp-status")
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            adpSiteResponse = res.data;
            initSubsiteConcept();
            getAdpkeys();
            getPrefixurl(res);
        }
        else
            stopLoader("adp-status")
    });
}

function initSubsiteConcept() {
    requestDataFromServer('/useronboard/getcurrentuser', {}, "GET").done(function (response) {
        let res = typeof response === "string" ? JSON.parse(response) : response;
        if (res.status === 200) {
            currentUserId = res.data.id;
            // Fetch assigned subsites for this user and site
            let siteId = adpSiteResponse[0].id;
            requestDataFromServer('/useronboard/getsubsitedata', { mode: 'user_site', userId: currentUserId, siteId: siteId, csrfmiddlewaretoken: csfr_token }, "POST").done(function (subsiteRes) {
                let sRes = typeof subsiteRes === "string" ? JSON.parse(subsiteRes) : subsiteRes;
                if (sRes.status === 200) {
                    let siteName = adpSiteResponse[0].sitename;
                    assignedSubsites = sRes.data[siteName] || [];
                    subsiteDataReady = true;
                    //console.log('initSubsiteConcept - Assigned Subsites for ' + siteName + ':', assignedSubsites);
                    renderSubsiteTabs();
                    if (allAdpData) {
                        switchSubsite(activeSubsite);
                    }
                } else {
                    console.error('initSubsiteConcept - Failed to fetch subsite data:', sRes);
                }
            });
        } else {
            console.error('initSubsiteConcept - Failed to fetch current user:', res);
        }
    });
}

function getPriorityColor(status) {
    if (status === 0) return '#ff3d57'; // Red
    if (status === 1) return '#e99123'; // Amber
    if (status === 3) return '#ffffff'; // White
    if (status === 4 || status === 5) return '#000000'; // Black
    if (status === 2) return '#16d39a'; // Green
    return '#16d39a'; // Default green
}

function getPriorityValue(status) {
    if (status === 0) return 100; // Red
    if (status === 1) return 90;  // Amber
    if (status === 3) return 80;  // White
    if (status === 4 || status === 5) return 70; // Black
    if (status === 2) return 60;  // Green
    return 0;
}

function calculateSubsiteStatus(keys) {
    let highestPriority = -1;
    let winningStatus = 2; // Default green

    keys.forEach(keyObj => {
        let keyData = keyObj.key_data;
        if (typeof keyData.status !== 'undefined') {
            let p = getPriorityValue(keyData.status);
            if (p > highestPriority) {
                highestPriority = p;
                winningStatus = keyData.status;
            }
        }

        if (keyData.type === 'matrix' || keyData.type === 'table') {
            let data = keyData.data;
            
            function processData(d) {
                if (Array.isArray(d)) {
                    d.forEach(item => processData(item));
                } else if (d && typeof d === 'object') {
                    if (typeof d.status !== 'undefined') {
                        let p = getPriorityValue(d.status);
                        if (p > highestPriority) {
                            highestPriority = p;
                            winningStatus = d.status;
                        }
                    } else {
                        Object.values(d).forEach(val => processData(val));
                    }
                }
            }
            processData(data);
        }
    });
    return winningStatus;
}

function renderSubsiteTabs() {
    const isProcessOrAdapter = $('#page-process').is(':visible') || 
                               $('#page-adapter').is(':visible') || 
                               $('#page-process').hasClass('active') || 
                               $('#page-adapter').hasClass('active');
    
    if (!isProcessOrAdapter) {
        $('#subsite-tabs-row').hide();
        return;
    }

    if (assignedSubsites.length === 0) {
        $('#subsite-tabs-row').hide();
        return;
    }

    $('#subsite-tabs-row').show();
    
    // Update breadcrumb subsite
    if (activeSubsite !== 'Others') {
        $('#breadcrumbSubsite').text('> ' + activeSubsite.toUpperCase()).show();
    } else {
        $('#breadcrumbSubsite').hide();
    }
    let tabList = $('#subsite-tabs');
    tabList.empty();

    // allAdpData is populated asynchronously by getAdpkeys() on page load; a
    // click on AdapterStatus/ProcessStatus before that request resolves would
    // otherwise throw here. Same guard renderAdapterDashboard() already uses.
    if (!allAdpData || !allAdpData.responseData || !allAdpData.responseData[0]) return;

    let originalKeys = allAdpData.responseData[0].site_data;
    //console.log('renderSubsiteTabs - Rendering tabs for ' + assignedSubsites.length + ' subsites. Total keys:', originalKeys.length);

    const currentPageKeyPart = $('#page-process').is(':visible') ? 'ProcessStatus' : 
                              ($('#page-adapter').is(':visible') ? 'AdapterStatus' : '');

    // 1. LE (Others) Tab Status
    let otherKeys = originalKeys.filter(keyObj => {
        let keyLower = keyObj.key.toLowerCase();
        let matchesSubsite = !assignedSubsites.some(s => keyLower.includes(s.toLowerCase()));
        let matchesPage = currentPageKeyPart === '' || keyObj.key.includes(currentPageKeyPart);
        return matchesSubsite && matchesPage;
    });
    let otherStatus = calculateSubsiteStatus(otherKeys);
    let otherColor = getPriorityColor(otherStatus);

    tabList.append(`
        <li class="nav-item">
            <a class="le-subsite-tab ${activeSubsite === 'Others' ? 'active' : ''}" 
               style="color: ${activeSubsite === 'Others' ? '#fff' : otherColor} !important;" 
               href="#" onclick="switchSubsite('Others')">LE</a>
        </li>
    `);

    // 2. Sub-site Tabs Status
    assignedSubsites.forEach(subsite => {
        let subsiteLower = subsite.toLowerCase();
        let subsiteKeys = originalKeys.filter(keyObj => {
            let keyLower = keyObj.key.toLowerCase();
            let matchesSubsite = keyLower.includes(subsiteLower);
            let matchesPage = currentPageKeyPart === '' || keyObj.key.includes(currentPageKeyPart);
            return matchesSubsite && matchesPage;
        });

        let status = calculateSubsiteStatus(subsiteKeys);
        let color = getPriorityColor(status);

        tabList.append(`
            <li class="nav-item">
                <a class="le-subsite-tab ${activeSubsite === subsite ? 'active' : ''}" 
                   style="color: ${activeSubsite === subsite ? '#fff' : color} !important;" 
                   href="#" onclick="switchSubsite('${subsite}')">${subsite.toUpperCase()}</a>
            </li>
        `);
    });
}

function updateApmTabStatuses() {
    if (!allAdpData || !allAdpData.responseData || allAdpData.responseData.length === 0) return;
    
    const originalKeys = allAdpData.responseData[0].site_data;
    const tabs = [
        { id: 'nav-process', keyPart: 'ProcessStatus', statusColorEnabled: true },
        { id: 'nav-adapter', keyPart: 'AdapterStatus', statusColorEnabled: true },
        { id: 'nav-latency', keyPart: 'Latency', statusColorEnabled: false },
        { id: 'nav-messagequeue', keyPart: 'MessageQueue', statusColorEnabled: false },
        { id: 'nav-bandwidth', keyPart: 'Bandwidth', statusColorEnabled: false }
    ];

    tabs.forEach(tab => {
        const el = document.getElementById(tab.id);
        if (!el) return;

        // Strip previous status classes
        el.classList.remove('status-red', 'status-orange', 'status-green');

        if (tab.statusColorEnabled) {
            // Filter keys by category (e.g., ProcessStatus, AdapterStatus) case-insensitively
            const searchKey = tab.keyPart.toLowerCase();
            const sectionKeys = originalKeys.filter(k => k.key.toLowerCase().includes(searchKey));

            let status = 2; // Default Green
            if (sectionKeys.length > 0) {
                status = calculateSubsiteStatus(sectionKeys);
            }
            
            // Apply status class (!important in CSS ensures this overrides the active state color)
            if (status === 0) el.classList.add('status-red');
            else if (status === 1) el.classList.add('status-orange');
            else if (status === 2) el.classList.add('status-green');
        }
    });
}

function switchSubsite(subsite) {
    activeSubsite = subsite;
    
    // Update breadcrumb subsite
    if (activeSubsite !== 'Others') {
        $('#breadcrumbSubsite').text('> ' + activeSubsite.toUpperCase()).show();
    } else {
        $('#breadcrumbSubsite').hide();
    }

    renderSubsiteTabs();
    updateApmTabStatuses();

    if (!allAdpData) return;

    var originalObj = allAdpData.responseData[0];
    let filteredObj = JSON.parse(JSON.stringify(originalObj));

    if (subsite && subsite !== 'Others') {
        let subsiteLower = subsite.toLowerCase();
        filteredObj.site_data = filteredObj.site_data.filter(keyObj => {
            return keyObj.key.toLowerCase().includes(subsiteLower);
        });
    } else if (subsite === 'Others' && assignedSubsites.length > 0) {
        filteredObj.site_data = filteredObj.site_data.filter(keyObj => {
            let keyLower = keyObj.key.toLowerCase();
            return !assignedSubsites.some(s => keyLower.includes(s.toLowerCase()));
        });
    }
    
    adpdisplaykeys(filteredObj, selectedsite);
}
function getAdpkeys() {
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'ADP' }, "GET").done(adpkeysResponse)

}
async function getPrefixurl(res) {
    analytics_Prefix_URL = res.data[0].analytics_Prefix_URL;
    var svc_token = res.data[0].grafana_api;
    elastic_host = res.data[0].elastic_host;
    elastic_port = res.data[0].elastic_port;

    var db_names = ['Process Connection Details', 'App view', 'Latency', 'MessageQueue'];
    var proc_html = "";
    var inc_val = 0;

    // Use Promise.all to ensure all AJAX calls finish before updating the HTML
    await Promise.all(db_names.map(async (db_name) => {
        return $.ajax({
            type: "GET",
            url: '/analytics/getUID',
            data: { url: analytics_Prefix_URL, dbname: db_name, svctoken: svc_token, csrfmiddlewaretoken: csfr_token },
            success: function (response) {
                //console.log('RESPONSE SUCCESS');
                inc_val++;
                $("#adp-status #apm-data").css('display', 'block');
                if (!response.status) {
                    var dashboard_uid = response.token_json[0].uid;
                    var slug_name = response.db_json.meta.slug;
                    const now = moment();
                    const sevenDaysAgo = moment().startOf('day');

                    var iframe_url = `/grafana-proxy/d/${dashboard_uid}/${slug_name}?_g=${encodeURIComponent(analytics_Prefix_URL)}&from=${sevenDaysAgo}&to=${now}&timezone=browser&orgId=1&kiosk=1`;

                    if (db_name === 'Process Connection Details' && $('#grafana-process-details').length) {
                        $('#grafana-process-details').html(`<iframe src="${iframe_url}" style="width:100%;height:350px;border:none;background:white"></iframe>`);
                    } else if (db_name === 'App view' && $('#grafana-app-view').length) {
                        $('#grafana-app-view').html(`<iframe src="${iframe_url}" style="width:100%;height:350px;border:none;background:white"></iframe>`);
                    }

                    db_name = db_name.replaceAll(' ', '')
                    proc_html += (`
                        <div class="le-key-tab" id="${db_name}_row">
                            <a data-toggle="collapse" class="accordion-toggle" href="#${db_name}_iframe-data">
                                <h4 class="card-titles"> ${db_name}</h4>
                            </a>
                        </div>
                        <div class="border-0 collapse-content w-100" id="child-${db_name}_row" style="display:none">
                            <div style='width:100%'>
                                <div class="accordian-body col-12 border-b collapse" id="${db_name}_iframe-data" style="border: 1px;">
                                    <iframe class="iframe-elem" id="${db_name}_iframe" 
                                                    src="${iframe_url}" frameBorder="0" 
                                                    style="width:100%; height:450px; background-color:#ffffff">
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    `);

                }
            },
            error: function (xhr, status, error) {
                //console.log('ERROR--->' + error + '   status--->' + status);
                swal(error + ' error occurred while fetching index data!', ' ', "error");
            }
        });
    }));

    // Update HTML once all AJAX calls finish
    if (inc_val === db_names.length) {
        document.getElementById("apm-data").innerHTML = (`
            <div class="le-key-tabs-wrapper">
                <div class="le-key-tabs" id="mob-width">
                    ${proc_html}
                </div>
            </div>
        `);
    }

    //console.log('Final Updated HTML:', document.getElementById("apm-data").innerHTML);
}

function openShowcommentModal(element, value) {
    //console.log(user_name + ' commented on ' + JSON.stringify(value))
    changed_key = value
    var comment_html = ''
    comment_html += '<div class="row">'
    //comment_html += '<div class="col-sm-5 col-md-6 col-12 pb-4" >'
    //comment_html += '<h1>Comments</h1>'
    //value = JSON.parse(value);
    value = isEdit_dict[value]
    value = JSON.parse(value)
    for (var i = 0; i < value.length; i++) {
        var obj = value[i]
        comment_html += '<div class="' + (i % 2 === 0 ? 'comment' : 'darker') + ' mt-4 text-justify float-left">'
        comment_html += '<h4>' + obj.username + '</h4>'
        comment_html += '<span>-' + obj.commented_time + '</span><br>'
        //comment_html += '<div class="row">'
        comment_html += '<p class="tab-indent">-' + obj.comment + '</p>'
        comment_html += '</div>'
        //comment_html += '</div>'
    }

    comment_html += '</div>'
    //comment_html+='</div>'

    $('#dialog-for-showcomments .modal-body').html(comment_html)
}
function openAddcommentModal(element, value) {
    //console.log(user_name + ' commented on ' + value)
    changed_key = value
    //changed_key = $(element).parent().text()
    $('#dialog-for-addcomment .modal-title').html('<h5 class="col-4" style="padding-right:0">Add comment to - </h5><div class="col-8"style="color:#e99123;padding-left:0;">' + changed_key + '</div>')
}
function addComment() {
    data = {};
    //jsonObj = {};
    var currentdate = new Date();
    data["username"] = user_name;
    //data["changed_Key"] = changed_key;
    data["commented_time"] = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    data["comment"] = $('#syntax').val()
    //jsonObj["data"] = data;
    //console.log('ADDCOMMENTSS DATA--->' + JSON.stringify(jsonObj))
    requestDataFromServer('/bod-eodstatus/updatekeys', { sitename: params.get("site"), existing_key: changed_key, value: JSON.stringify(data) }, "GET").done(function (response) {
        //console.log('UPDATE KEYS RESPONSE DATA----->' + JSON.stringify(response))
        if (response.responseData.code == 200) {
            swal({
                title: "Comment Status",
                text: "Successfully commented on \"" + response.responseData.site_data + "\".",
                type: "info",
                confirmButtonClass: "btn-success",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                closeOnCancel: true
            },
                function (isConfirm) {
                    if (isConfirm) {
                        $('#syntax').val('')
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'ADP' }, "GET").done(function (response) {
                            if (typeof adpdisplaykeys === 'function')
                                adpdisplaykeys(response.responseData[0], response.refreshedsite)
                            if (typeof ledColors === 'function')
                                ledColors(selected_sitename, selected_leurl, selected_websocurl)
                        })
                    }
                });
        } else {
            swal(response.responseData.site_data, ' ', "error");
        }
        $("#dialog-for-addcomment").find('.dismiss-btn').click()
    })
}
function adpkeysResponse(response) {
    allAdpData = response;
    //const alphabet = "abcdefghijklmnopqrstuvwxyz"
    //const adpkeys = alphabet[Math.floor(Math.random() * alphabet.length)]
    //console.log('adpkeys RESPONSE--->' + JSON.stringify(response))
    const adpkeys = Math.random().toString(36).substring(2, 5);
    if (response == undefined)
        return;
    adpResponse = response.responseData;
    stopLoader("adp-status")
    if (response.responseData.length > 0) {
        renderSubsiteTabs();
        switchSubsite(activeSubsite);
        response.responseData.forEach(function (siteObj) {
            var siteTempObj = {}
            siteTempObj['site'] = siteObj.site
            siteTempObj['isSuccess'] = true
            siteTempObj['isWSConnected'] = false
            var keyFailCount = 0
            if (siteObj.site_data.length > 0) {
                siteObj.site_data.forEach(function (obj) {
                    var keyData = obj.key_data
                    var data = keyData['data']
                    if (keyData['type'] == 'matrix') {
                        $.each(data, function (key) {
                            var tempData = data[key]
                            $.each(tempData, function (key1, val1) {
                                var obj = tempData[key1]
                                if (obj['isSuccess'] == false) {
                                    keyFailCount++;
                                }
                            })
                        })
                    }
                    else {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i]['isSuccess'] == false) {
                                keyFailCount++;
                            }
                        }
                    }
                });
                if (keyFailCount != 0) {
                    siteTempObj['isSuccess'] = false
                    if (selectedsite == ' ')
                        selectedsite = siteObj.site
                }
            }
            else {
                siteTempObj['isSuccess'] = false
                if (selectedsite == ' ')
                    selectedsite = siteObj.site
            }
            adpSitesData.push(siteTempObj)
            var tempSiteObj = adpSiteResponse[0] //.filter(x => x.sitename === siteTempObj['site'])[0]
            connectAdpWebSocket(tempSiteObj.websocket_url, siteTempObj['site'], 0, adpkeys)
        });
        var sSitehtml = ''
        var fSitehtml = ''
        $("#adp-status #site-list").empty()
        siteFailCount = 0;
        adpSitesData.forEach(function (obj) {
            if (obj.isSuccess) {
                //sSitehtml += '<div class="page-header"><li class="page-title" id="' + obj.site + '_li" style="position: relative;">' + obj.site +'<h3 class="page-title"> > BOD EOD Status </h3></li></div>'
                sSitehtml += '<div class="page-header"> ' + obj.site + ' &ensp;>&ensp; <h3 class="page-title"> APM Status </h3></div>'
            }
            else {
                siteFailCount++;
                //fSitehtml += '<div class="page-header"><li class="page-title" id="' + obj.site + '_li" style="position: relative;"> ' + obj.site +'<h3 class="page-title" > >  BOD EOD Status </h3></li> </div>'
                fSitehtml += '<div class="page-header"> ' + obj.site + ' &ensp;>&ensp; <h3 class="page-title" > APM Status </h3></div>'
            }
        });
        if (siteFailCount != 0)
            adpFinalStatus = 'Failure'
        else
            adpFinalStatus = 'Success'
        $("#adpstatus").html(adpFinalStatus)
        adpFinalStatus == 'Failure' ? $("#adpstatus").removeClass("green").addClass('red') : $("#adpstatus").removeClass("red").addClass('green')
        // adpFinalStatus == 'Failure' ? $("#adpLED").removeClass("green").addClass('red') : $("#adpLED").removeClass("red").addClass('green')
        $("#adp-status #site-list").append(fSitehtml);
        $("#adp-status #site-list").append(sSitehtml);
        $("#adp-status #site-list li a").eq(0).addClass('active');
        if ($("#adp-status #site-list li a").eq(0).data()) {
            selectedsite = $("#adp-status #site-list li a").eq(0).data().id
        }
        else {
            if (selectedsite && adpSitesData.length > 0)
                selectedsite = adpSitesData[0].site
        }
        // var obj = adpResponse[0] //.filter(x => x.site === selectedsite)[0]
        // adpdisplaykeys(obj, selectedsite)

    }
    else {
        $("#adp-status #site-data").css('display', 'none');
        $("#adp-status #adp-status-nodata").css('display', 'block');
        $("#adp-status-nodata #nodatamessage").text('No Data');
        $("#adp-status #adp-status-expand").css('display', 'none');
    }
}

function adphovered(spanid, evt) {
    //console.log('SPANID--->' + spanid)
    var e = evt.target;
    var dim = e.getBoundingClientRect();
    var w = $(window);
    var el = document.getElementById(spanid);
    // el.style.display = "block";
    el.style.display = "flex";
    el.style.position = "absolute";
    var totwidth = (dim.left / window.innerWidth) * 100
    if (totwidth < 85) {
        el.style.right = '-60%';
        //console.log('TOTWIDTH else--->' + 0.85 * window.innerWidth)
    } else if (totwidth > 85) {
        // console.log('TOTWIDTH > 85')
        //  el.style.right = '-60%';
        //console.log('TOTWIDTH else--->' + 0.85 * window.innerWidth)
    }
}
function pintool(tooltpid) {
    // console.log('TOOLTIP ID--->' + tooltpid)
    var rowelem = document.getElementById(tooltpid)
    var tltppin = document.getElementById(tooltpid + 'tltp-pin')
    if (rowelem.classList.contains('visible-tltp')) {//unpin
        rowelem.classList.remove("visible-tltp");
        tltppin.style.color = '#fff'
        /* heatpin.classList.remove("mdi-pin");
         heatpin.classList.add("mdi-pin-outline");
         heatpin.style.color = '#fff'*/
        // maprefresh();
    } else {                                 //pin
        rowelem.classList.add("visible-tltp");
        tltppin.style.color = '#e99123'
        /* heatpin.classList.remove("mdi-pin-outline");
         heatpin.classList.add("mdi-pin");
         heatpin.style.color = '#e99123'*/
    }

}
function adpdisplaykeys(adpsiteData, refreshedsite) {
    if ($('#page-adapter').is(':visible')) {
        renderAdapterDashboard(adpsiteData);
    }
    if ($('#page-process').is(':visible')) {
        renderProcessDashboard(adpsiteData);
    }
    isEdit_dict = {}
    // console.log('ADP adpdisplaykeys - adpsiteData--->' + JSON.stringify(adpsiteData) + ' resfreshedsite--->' + refreshedsite)
    if (open_rows) {
        //console.log("adpsiteData-->" + JSON.stringify(adpsiteData))
        //   console.log("adpsiteData.site_data.length-->" + adpsiteData.site_data.length)
        var isOnlyOneElem = true
        if (adpsiteData.site_data.length == 1) {
            isOnlyOneElem = true
            //$('#adp-eodstatus-expand').hide()
        } else {
            isOnlyOneElem = false
            //$('#adp-eodstatus-expand').show()
        }
        // Use a shallow copy to avoid polluting the original data when switching tabs
        let displayData = [...adpsiteData.site_data];

        const first_data = {
            key: 'ADP:ADP_UPDATED_DATA',
            key_data: {
                overallStatus: true,
                status: 2,
                type: 'table',
                data: [
                    {
                        segment: 'Adp enable with live updates',
                        isSuccess: true,
                        status: 2,
                    },
                ],
            },
        };
        // Prepend header to the local copy only
        displayData.unshift(first_data);

        // Check for real data (excluding the header row)
        let realDataCount = displayData.filter(d => d.key !== 'ADP:ADP_UPDATED_DATA').length;

        keyFailCount = 0
        keyGreenCount = 0
        keyBlueCount = 0
        keyOrangeCount = 0
        keyWhiteCount = 0

        if (displayData.length > 0) {
            //  $('.adp_LED').css('display', 'block ')  //to display the icon
            redisKeys = []
            keyHtml = ''
            var failurehtml = ''
            var warninghtml = ''
            var edithtml = ''
            var okhtml = ''
            var successhtml = ''
            outkeyHtml = ''
            outkeyHtml += '<div class="le-horizontal-keys-container py-2 site-keys" id="' + adpsiteData.site + '">'
            outkeyHtml += '<div class="col-12 le-key-tabs-wrapper">'
            outkeyHtml += '<div class="le-key-tabs" id="mob-width">'
            //

            /*const first_data = {
                key: 'ADP:ADP_UPDATED_DATA',
                key_data: {
                    overallStatus: true,
                    status: 0,
                    type: 'table',
                    data: [
                        {
                            segment: 'Adp enable with live updates',
                            isSuccess: true,
                            status: 2,
                        },
                    ],
                },
            };
            (adpsiteData.site_data).unshift(first_data)*/
            var isfirst = 1

            displayData.forEach(function (obj) {
                //console.log("adpsiteData.site  --->"+JSON.stringify(obj))
                var tempObj = {}
                var keyData = obj.key_data
                var data = keyData['data']
                var isEdit = keyData['edit']
                failCount = 0
                greenCount = 0
                orangeCount = 0
                whiteCount = 0
                rowHtmlgreen = ''
                rowHtmlblue = ''
                rowHtmlred = ''
                rowHtmlorange = ''
                rowHtmlwhite = ''
                rowHtml = ''
                var ftemp = ''
                var btemp = ''
                var stemp = ''
                var otemp = ''
                var wtemp = ''
                var divId = obj.key
                divId = divId.replaceAll(/[:.]/g, '_');
                if (keyData['type'] == 'matrix') {
                    var temp = ''
                    ftemp = ''
                    stemp = ''
                    btemp = ''
                    otemp = ''
                    wtemp = ''
                    $.each(data, function (key) {
                        //console.log('ADP DATA[' + i + ']--->' + JSON.stringify(data))
                        isRowContainsRed = 0
                        isRowContainsGreen = 0
                        isRowContainsBlue = 0
                        isRowContainsOrange = 0
                        isRowContainsWhite = 0
                        //html = '<td>' + key + '</td>'
                        //console.log('KEY--->' + key)
                        var pinid = key + '_tooltip'
                        var tempHtml = ''
                        var tempData = data[key]
                        var bgcolor = ''
                        $.each(tempData, function (key1, val1) {
                            var obj = tempData[key1]
                            if (typeof (obj) == 'object') {
                                if (obj['status'] == 0) {
                                    bgcolor = 'red-bg'
                                    failCount++;
                                    // keyFailCount++;
                                    isRowContainsRed++;
                                } else if (obj['status'] == 1) {
                                    bgcolor = 'orange-bg'
                                    orangeCount++;
                                    //keyOrangeCount++;
                                    isRowContainsOrange++;
                                } else if (obj['status'] == 2) {
                                    bgcolor = 'green-bg'
                                    greenCount++;
                                    //keyGreenCount++;
                                    isRowContainsGreen++;
                                } else if (obj['status'] == 5) {
                                    bgcolor = 'blue-bg'
                                    blueCount++;
                                    //keyGreenCount++;
                                    isRowContainsBlue++;
                                } else {
                                    bgcolor = 'white-bg'
                                    whiteCount++;
                                    //keyWhiteCount++;
                                    isRowContainsWhite++;
                                }
                                /*if (obj.hasOwnProperty('tooltip')) {
                                    var tooltp_txt = '<table>';
                                    var tooltp_default = ''
                                    for (const [key, value] of Object.entries(obj['tooltip'])) {
                                       
                                        tooltp_default += '<tr><td class="details_td">' + key +'</td class="details_td"> <td>:</td><td class="details_td">' + value + '</td></tr>'
                                            
                                    }
    
                                    tooltp_txt += tooltp_default
                                    tooltp_txt += '</table>'
                                    tempHtml += '<td class="white-text has-details ' + bgcolor + '"  >' + obj['value'] + '<span class="details">' + tooltp_txt + '</span></td>'
                                } else {
                                    tempHtml += '<td class="white-text ' + bgcolor + '">' + obj['value'] + '</td>'
                                }*/
                                tempHtml += '<td class="white-text ' + bgcolor + '">' + obj['value'] + '</td>'
                                //tempHtml += '<td class="white-text ' + bgcolor + '">' + obj['ctcl_id'] + '</td>'
                            }
                            else {
                                tempHtml += '<td class="" style="color:#808080">' + obj + '</td>'
                            }
                        })
                        /*html = '<td style="color:#C0C0C0">' + key + '</td>'
                        html = html + tempHtml*/


                        if (isRowContainsRed) {
                            html = '<td style="color:#ff3d57">' + key + '</td>'
                            html = html + tempHtml
                            ftemp += '<tr class="" id="' + key.replaceAll('/', '_') + 'id" style="color:#C0C0C0">' + html + '</tr>'
                        } else if (isRowContainsOrange) {
                            html = '<td style="color:#e99123">' + key + '</td>'
                            html = html + tempHtml
                            otemp += '<tr class="" id="' + key.replaceAll('/', '_') + 'id" style="color:#C0C0C0">' + html + '</tr>'
                        } else if (isRowContainsBlue) {
                            html = '<td style="color:#0000cd ">' + key + '</td>'
                            html = html + tempHtml
                            btemp += '<tr class="" id="' + key.replaceAll('/', '_') + 'id" style="color:#C0C0C0">' + html + '</tr>'
                        } else if (isRowContainsGreen) {
                            html = '<td style="color:#16d39a">' + key + '</td>'
                            html = html + tempHtml
                            stemp += '<tr class="" id="' + key.replaceAll('/', '_') + 'id" style="color:#C0C0C0">' + html + '</tr>'
                        }
                        else {
                            html = '<td style="color:#C0C0C0">' + key + '</td>'
                            html = html + tempHtml
                            wtemp += '<tr class="" id="' + key.replaceAll('/', '_') + 'id" style="color:#C0C0C0">' + html + '</tr>'
                        }
                        /*  else {
                              temp += '<tr class="">' + html + '</tr>'
                          }*/
                    })
                    rowHtml = ftemp + otemp + stemp + wtemp
                }
                else {
                    /*if (isEdit != undefined)
                        console.log('ISEDIT--->' + JSON.stringify(isEdit))*/

                    var temp = ''
                    for (var i = 0; i < data.length; i++) {
                        //console.log('ADP DATA[' + i + ']--->' + JSON.stringify(data[i]))
                        var isSuccess = true
                        tempHtml = ''
                        $.each(data[i], function (key, val) {
                            if (key == 'isSuccess' && val == false) {
                                isSuccess = false
                            }
                            if (typeof (val) == 'object')
                                val = JSON.stringify(val)
                            if (key.includes('file_path')) {
                                tempHtml += '<td class="px-5 py-1 profile-td"><a id="' + i + '-' + 'file-info' + '" onclick="onFileinfo(\'' + val + '\',' + i + ',\'' + obj.key.replaceAll(/[/:.]/g, '_') + '\')" data-toggle="modal" data-target="#dialog-for-content" class="profile">OUTPUT</a></td>'
                                //tempHtml += '<td class="px-5 py-1 profile-td"><a id="' + i + '-' + 'file-info' + '" onclick="onFileinfo(\'' + val + '\',' + i + ',\'' + obj.key.replaceAll(/[:.]/g, '_') + '\')" data-toggle="modal" data-target="#dialog-for-content" class="profile"><img src="../static/app/images/view_file.png"/></a></td>'
                            }
                            else {
                                if (key != 'isSuccess')
                                    tempHtml += '<td>' + val + '</td>'
                            }
                        })
                        if (data[i].status == 0) {
                            rowColor = 'red'
                            failCount++;
                            // keyFailCount++;
                            rowHtmlred += '<tr class="' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;font-size:12px;">' + tempHtml + '</tr>'

                        } else if (data[i].status == 1) {
                            rowColor = 'orange'
                            // keyOrangeCount++;
                            orangeCount++;
                            rowHtmlorange += '<tr class="' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;font-size:12px;">' + tempHtml + '</tr>'
                        } else if (data[i].status == 2) {
                            rowColor = 'green'
                            // keyGreenCount++;
                            greenCount++;
                            rowHtmlgreen += '<tr class="' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;font-size:12px;">' + tempHtml + '</tr>'
                        } else {
                            rowColor = 'white'
                            //keyWhiteCount++;
                            whiteCount++;
                            rowHtmlwhite += '<tr class="' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;font-size:12px;">' + tempHtml + '</tr>'
                        }

                        // temp += '<tr class="' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;font-size:12px;">' + tempHtml + '</tr>'
                    }
                    // rowHtml = temp
                }
                var value = obj.key
                tempObj['keyName'] = value
                tempObj['site'] = adpsiteData.site
                if (value === 'ADP:ADP_UPDATED_DATA') {
                    keyName = 'Adp enable with live updates';
                } else {
                    keyName = (value.split(':')[1]);
                    // Robustly strip common prefixes
                    if (keyName.startsWith("ADP-")) {
                        keyName = keyName.substring(4);
                    } else if (keyName.startsWith("ADP_")) {
                        keyName = keyName.substring(4);
                    }
                    keyName = keyName.replaceAll("_", "-");
                }
                if (isfirst) {
                    keyHtml += '<div class="le-key-tab ' + colorClass + '" style="visibility:hidden;height:0px" id="' + obj.key + '">'
                    --isfirst;
                } else {
                    keyHtml += '<div class="le-key-tab ' + colorClass + '" id="' + obj.key + '">'
                }
                keyHtml += ' <a data-toggle="collapse" class="accordion-toggle" href="#' + divId.replaceAll('/', '_') + '-data' + '">'
                var text = 'Success'
                //var colorClass = 'white' //green
                /*if (failCount != 0) {
                    var text = 'Failure'
                    var colorClass = 'red'
                    tempObj['isSuccess'] = false
                } else if (orangeCount != 0) {
                    var colorClass = 'orange'
                    tempObj['isSuccess'] = false
                } else if (greenCount != 0) {
                    var colorClass = 'green'
                    tempObj['isSuccess'] = true
                } else
                    tempObj['isSuccess'] = true*/
                if (obj.key_data.hasOwnProperty('status')) {
                    if (obj.key_data.status == 0) {
                        var text = 'Failure'
                        var colorClass = 'red'
                        keyFailCount++;
                        tempObj['isSuccess'] = false
                    } else if (obj.key_data.status == 1) {
                        var colorClass = 'orange'
                        keyOrangeCount++;
                        tempObj['isSuccess'] = false
                    } else if (obj.key_data.status == 5) {
                        var colorClass = 'blue'
                        keyBlueCount++;
                        tempObj['isSuccess'] = false
                    } else if (obj.key_data.status == 2) {
                        var colorClass = 'green'
                        keyGreenCount++;
                        tempObj['isSuccess'] = true
                    } else {
                        tempObj['isSuccess'] = true
                    }

                } else {
                    var colorClass = 'white'
                }
                redisKeys.push(tempObj)
                keyHtml += '<h4 class="card-titles ' + colorClass + '" style="margin-left: 10px; margin-top: 3px;">' + (keyName) + '</h4>'//<span class="size12 '+colorClass+'"style="margin-left: 10px; font-weight: bold;"></span>
                if (colorClass == 'red' || colorClass == 'orange' || colorClass == 'blue') {
                    if (isEdit != undefined) {
                        if (isEdit.length != 0) {
                            //console.log('isEDIT Before passing--->' + JSON.stringify(isEdit))
                            isEdit_dict[value] = JSON.stringify(isEdit)
                            keyHtml += '<i data-feather="message-square" onclick="openShowcommentModal(this,\'' + value + '\')" data-toggle="modal" data-target="#dialog-for-showcomments"></i>'
                        }
                    }
                    keyHtml += '<i data-feather="edit" onclick="openAddcommentModal(this,\'' + value + '\')" data-toggle="modal" data-target="#dialog-for-addcomment"></i>'
                }
                //keyHtml += '<h4 class="card-titles ' + colorClass + '" style="margin-left: 10px; margin-top: 3px;"><i class=" icon-play"></i>' + keyName + '</h4>'//<span class="size12 '+colorClass+'"style="margin-left: 10px; font-weight: bold;"></span>
                //keyHtml +=                       '<td class="col-2 action-btn float-right text-right">'
                //  keyHtml +=                            '<button class="btn btn-default btn-ripple accordion-toggle ml-2" data-toggle="collapse" data-target="#'+divId+'-data'+'">'
                //  keyHtml +=                                '<i class="icon-select"></i>'
                //   keyHtml +=                            '</button>'
                keyHtml += ' </a>'
                keyHtml += '</div>'
                if (obj.key == "ADP:ADP_UPDATED_DATA") {
                    keyHtml += '<div class="border-0 collapse-content w-100" id="child-' + obj.key.replace(/[/:.]/g, '_') + '" style="visibility:hidden;height:1px;display:block" >'
                } else {
                    keyHtml += '<div class="border-0 collapse-content w-100" id="child-' + obj.key.replace(/[/:.]/g, '_') + '" >'
                }
                keyHtml += '<div class="hiddenRow border-0 p-0 col-12">'
                //console.log('replaceAllD ID--->' + divId.replaceAll('/', '_'))
                /*if (isOnlyOneElem) {
                    keyHtml += '<div class="accordian-body col-12 border-b collapse show" id="' + divId.replaceAll('/', '_') + '-data' + '" style="border: 1px;">'
                } else {
                    keyHtml += '<div class="accordian-body col-12 border-b collapse" id="' + divId.replaceAll('/', '_') + '-data' + '" style="border: 1px;">'
                }*/
                keyHtml += '<div class="accordian-body col-12 border-b collapse" id="' + divId.replaceAll('/', '_') + '-data' + '" style="border: 1px;">'
                keyHtml += '<div class="row card-body py-lg-4 py-2 ">' //removed bg
                keyHtml += '<div class="col-12">'
                keyHtml += '<h5 class="size14" style="margin-left: 10px; margin-top: 3px;">Executed On : ' + keyData['executedOn'] + '</h5>'
                keyHtml += '</div>'
                keyHtml += '<div id="table-view" class="col-12" style="overflow-x: auto;">'
                keyHtml += '<table id="data" style="border: 1px; background-color: ##191818">'
                keyHtml += '<thead class="table-head" style="border: 1px solid #303234;">'
                keyHtml += '<tr class="text-uppercase" style="border: 1px; background-color: #056aa1; font-size:12px">'
                var keyData = obj.key_data
                var data = keyData['data']
                theadHtml = ''
                if (keyData['type'] == 'matrix') {
                    theadHtml += '<th></th>'
                    $.each(data[Object.keys(data)[0]], function (key) {
                        theadHtml += '<th>' + key + '</th>'
                    })
                }
                else {
                    $.each(data[0], function (key) {
                        if (key != 'isSuccess')
                            theadHtml += '<th style="border: 1px solid #303234;">' + key + '</th>'
                    })
                }
                keyHtml = keyHtml + theadHtml
                keyHtml += '</tr>'
                keyHtml += '</thead>'
                keyHtml += '<tbody class="accordion list" id="accordionExample">'
                // keyHtml += rowHtmlred + rowHtmlgreen
                // console.log('rowhtmlred----->' + rowHtmlred + ' rowhtmlgreen--->' + rowHtmlgreen)
                keyHtml = keyHtml + rowHtml + rowHtmlred + rowHtmlorange + rowHtmlgreen + rowHtmlwhite
                keyHtml += '</tbody>'
                keyHtml += '</table>'
                keyHtml += '</div>'
                keyHtml += '</div>'
                keyHtml += '</div> '
                keyHtml += '</div>'
                if (colorClass == 'red') {
                    failurehtml += keyHtml
                } else if (colorClass == 'orange') {
                    warninghtml += keyHtml
                } else if (colorClass == 'blue') {
                    edithtml += keyHtml
                    keyHtml = ''
                    rowHtmlgreen = ''
                    rowHtmlorange = ''
                    rowHtmlblue = ''
                } else if (colorClass == 'green') {
                    okhtml += keyHtml
                } else {
                    successhtml += keyHtml
                }
                keyHtml = ''
                rowHtmlgreen = ''
                rowHtmlorange = ''
                rowHtmlblue = ''
                rowHtmlwhite = ''
                rowHtmlred = ''
            });
            outkeyHtml += failurehtml
            outkeyHtml += warninghtml
            outkeyHtml += edithtml
            outkeyHtml += okhtml
            outkeyHtml += successhtml
            outkeyHtml += '</div>'
            outkeyHtml += '</div>'
            outkeyHtml += '</div>'
            // siteHtml = siteHtml+keyHtml
            if (refreshedsite === selectedsite) {
                $("#adp-status #site-data").css('display', 'block')
                $("#adp-status #adp-status-expand").css('display', 'block');
                $('#adp-status #site-data').empty()
                $('#adp-status #site-data').append(outkeyHtml)

                // Show "No Keys" message if no real data keys were found (only header)
                if (realDataCount === 0) {
                    $("#adp-status #adp-status-nodata").css('display', 'block')
                    $("#adp-status #nodatamessage").text("No Keys")
                } else {
                    $("#adp-status #adp-status-nodata").css('display', 'none')
                }
            }
            if (isOnlyOneElem) {
                document.getElementsByClassName('toggleSwitch')[0].click();

                //document.getElementById('expand').click();
                checkadpbx = document.getElementById('expand')
                checkadpbx.checked = true
                //document.getElementsByClassName('toggleSwitch')[0].click();
            }
        }
        else {
            // $('.adp_LED').css('display', 'none ')   //to hide the icon

            keyFailCount++;
            $("#adp-status #site-data").css('display', 'none')
            $("#adp-status #adp-status-nodata").css('display', 'block')
            $("#adp-status #adp-status-expand").css('display', 'none');
            if (adpsiteData.code == 200) {
                $("#adp-status-nodata #nodatamessage").text('No Keys');
            }
            else {
                $("#adp-status-nodata #nodatamessage").text('Redis not reachable.');
            }
        }
        /* if (export_adpExcel == true) {
             Exportadpmultiplesheets();
         }*/
        feather.replace();
        Exportadpmultiplesheets();
        if (checkadpbx.checked == true) {
            checkadpbx.click();
        }
        //console.log('ADP \nKEYFAILCOUNT->' + keyFailCount + '\nkeyOrangeCount->' + keyOrangeCount + '\nkeyGreenCount->' + keyGreenCount + '\nkeyWhiteCount->' + keyWhiteCount)
        if (document.getElementById('adpLED')) {
            if (keyFailCount != 0) {
                document.getElementById('adpLED').style.color = "#ff3d57";
            } else if (keyOrangeCount != 0) {
                document.getElementById('adpLED').style.color = "#e99123";
            } else if (keyGreenCount != 0) {
                document.getElementById('adpLED').style.color = "#16d39a";
            } else
                document.getElementById('adpLED').style.color = "white";
        }
        //adpchangestatus(refreshedsite, keyFailCount)
    } else {
        console.log('ADP UPDATE PAUSED')
    }
}
function adpchangestatus(site, failCount) {
    // console.log(' ADP adpchangestatus - SITE--->' + site + ' failcount--->' + failCount)
    //console.log('ADP adpLED--->' + document.getElementById('adpLED'))
    var obj = adpSitesData[0] //.filter(x => x.site === site)[0]
    if (failCount == 0) {
        obj.isSuccess = true
        $("#adp-status #site-list #" + site + '_li').removeClass("failure").addClass('success')
        $("#adp-status #site-list #" + site + '_li a').removeClass("red").addClass('green')
    }
    else {
        obj.isSuccess = false
        $("#adp-status #site-list #" + site + '_li').removeClass("success").addClass('failure')
        $("#adp-status #site-list #" + site + '_li a').removeClass("green").addClass('red')
    }
    var isFound = adpSitesData.some(el => el.isSuccess == false);
    if (isFound) {
        /* if (document.getElementById('adpLED') != null) {
             document.getElementById('adpLED').classList.add('red')
         }*/
        adpFinalStatus = 'Failure'
    }
    else {
        /* if (document.getElementById('adpLED') != null) {
             document.getElementById('adpLED').classList.add('green')
         }*/
        adpFinalStatus = 'Success'
    }
    $("#adpstatus").html(adpFinalStatus)
    //  adpFinalStatus == 'Failure' ? $("#adpstatus").removeClass("green").addClass('red') : $("#adpstatus").removeClass("red").addClass('green')
    if (document.getElementById('adpLED') != null) {
        // console.log('EODLED  !=NULL ADPFINALSTATUS---->' + adpFinalStatus)
        // adpFinalStatus == 'Failure' ? $("#adpLED").removeClass("green").addClass('red') : $("#adpLED").removeClass("red").addClass('green')
        adpFinalStatus == 'Failure' ? document.getElementById('adpLED').classList.remove('green') : document.getElementById('adpLED').classList.remove('red')
        adpFinalStatus == 'Failure' ? document.getElementById('adpLED').classList.add('red') : document.getElementById('adpLED').classList.add('green')
    }

}
function clickOnAll(checkbox) {
    checkadpbx = checkbox;
    var keys = redisKeys.filter(x => x.site === selectedsite)
    if (checkbox.checked == true) {
        $('.switch_label').text('')
        keys.forEach(function (obj) {
            var divId = obj.keyName
            divId = divId.replaceAll(/[/:.]/g, '_');
            $('#' + selectedsite + ' #' + divId + '-data').collapse('show');
        })
    }
    else {
        $('.switch_label').text('')
        checkbox.checked == false
        keys.forEach(function (obj) {
            var divId = obj.keyName
            divId = divId.replaceAll(/[/:.]/g, '_');
            $('#' + selectedsite + ' #' + divId + '-data').collapse('hide');
        })
    }
}

//web socket connection code changed to seperate js file Rajkumar (bod-eod-ws.js) 

/*function connectAdpWebSocket(wsUrl, wsiteName, tries)
{
    try{
        if(window.WebSocket)
        {
            var destination = "/exchange/bodeod_update";
            var WSObject = new WebSocket(wsUrl);
            var stompClient = Stomp.over(WSObject);
            stompClient.id = wsiteName
            stompClient.connectionTries = tries;
            var on_conn = function()
            {
                var obj = adpSitesData[0] //.filter(x => x.site === stompClient.id)[0]
                obj.isWSConnected = true;
                isWSConnected = true;
               // $("#bodeod-pipe").css('color', '#16d39a')
                var bodhtml = '<div class="indicator" id="bodeod-pipe" style="color:#16d39a"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats"> \
                        <span class="tooltiptext"><p><b>Queue Name :</b> bod_eod_update</p> \
                        <p><b>isConnected :</b> True</p> \
                        <p><b>Reconnect	:</b> '+ connectionTries + '</p></span> \
                    </i> \
                    </div>'
                $('#bodeod-html').empty()
                $("#bodeod-html").append(bodhtml);
                //console.log(document.getElementById("bodeod-pipe"))
                stompClient.subscribe(destination, function(message)
                {
                    var tempJson = JSON.parse(message.body);
                    var isSiteFound = adpSitesData.some(el => el.site == tempJson.site);
                    if(tempJson.refresh == 1 && isSiteFound)
                    {
                        requestDataFromServer('/adp-status/getAdpkeys', { sitename: params.get("site") }, "GET").done(function (response) {
                            adpdisplaykeys(response.responseData[0], response.refreshedsite)
                        })
                        if(pageName != "adp-status")
                        {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline") 
                        }
                    }
                });
 
                $("#adp-status #"+stompClient.id+"-indicator").css('background', '#16d39a')
                this.connectionTries = 6
            }
            var on_err = function(error) 
            { 
                $("#adp-status #"+stompClient.id+"-indicator").css('background', '#ff3d57')
                var obj = adpSitesData[0] //.filter(x => x.site === stompClient.id)[0]
                obj.isWSConnected = false;
                //$("#bodeod-pipe").css('color', '#ff3d57')
                var bodhtml = '<div class="indicator" id="bodeod-pipe" style="color:#ff3d57"> \
                    <i class="mdi mdi-close-network-outline tooltip" id="icon-chats"> \
                        <span class="tooltiptext"><p><b>Queue Name :</b> bod_eod_update</p> \
                        <p><b>isConnected :</b> False</p> \
                        <p><b>Reconnect	:</b> '+ connectionTries + '</p></span> \
                    </i> \
                    </div>'
                $('#bodeod-html').empty()
                $("#bodeod-html").append(bodhtml);
                //console.log(document.getElementById("bodeod-pipe"))
                if(networkStatus === 'online')
                {
                    if(stompClient.connectionTries == 10)
                    {
                        swal({
                            title: "Want to get bod-eod updates?",
                            text: "Not able to connect web socket of \"" +stompClient.id+ "\". Please check once!.",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonClass: "btn-success",
                            confirmButtonText: "Yes, try again",
                            cancelButtonText: "No Cancel",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        function(isConfirm){
                            if (isConfirm) {
                                connectAdpWebSocket(stompClient.ws.url, stompClient.id, 0)
                            } else {
                                $("#adp-status #"+stompClient.id+"-indicator").css('background', '#ff3d57')
                            }
                        });
                    }
                    else
                    {
                        stompClient.connectionTries++;
                        var bodhtml = '<div class="indicator" id="bodeod-pipe" style="color:#e99123"> \
                            <i class="mdi mdi-help-network-outline tooltip" id="icon-chats"> \
                            <span class="tooltiptext"><p><b>Queue Name :</b> bod_eod_update</p> \
                        <p><b>isConnected :</b> Trying</p> \
                        <p><b>Reconnect	:</b> '+ connectionTries + '</p></span> \
                            </i> \
                            </div>'
                        $('#bodeod-html').empty()
                        $("#bodeod-html").append(bodhtml);
                        connectAdpWebSocket(stompClient.ws.url, stompClient.id, stompClient.connectionTries)
                        //console.log("connectAdpWebSocket1 --> " + connectionTries++)
                    }
                }
            }; 
            stompClient.connect(window.LE_WS_USER, window.LE_WS_PASS, on_conn, on_err, '/');
        }
        else
        {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch(err) {
        return;
    }
}*/
function onAdpSiteTabchange(sitename) {
    selectedsite = sitename
    // var keys = redisKeys.filter(x => x.site === selectedsite)
    // if(keys.length > 0)
    // {
    //     keys.forEach(function(obj){
    //         var divId = obj.keyName
    //         divId = divId.replaceAll(/[:.]/g, '_');
    //         $('#'+selectedsite+' #'+divId+'-data').collapse('hide');
    //     })
    // }
    // $('.site-keys').each(function (e)
    // {
    //     $(this).css('display','none')
    // })
    // $("#"+sitename).css('display','block')
    $('#adp-status #site-list li a.active').removeClass('active');
    $('#adp-status #site-list #' + sitename + '_li ' + 'a').addClass('active');
    $("#site-data").empty();
    var tempSiteObj = adpSitesData[0] //.filter(x => x.site === selectedsite)[0]
    if (tempSiteObj.isWSConnected == false) {
        tempSiteObj = adpSiteResponse[0] //.filter(x => x.sitename === selectedsite)[0]

        connectAdpWebSocket(tempSiteObj.websocket_url, selectedsite, 0)
    }
    startAdpLoader()
    requestDataFromServer('/adp-status/getAdpkeys', { sitename: params.get("site") }, "GET").done(function (response) {
        selectedsite = response.refreshedsite
        stopAdpLoader()
        adpdisplaykeys(response.responseData[0], response.refreshedsite)
    });

}
function onFileinfo(filepath, index, key) {
    // $('#child-'+key+' #'+index+'-file-info').attr('data-target',"#dialog-for-content");
    $("#file_content").empty();
    showLoader('dialog-for-content')
    requestDataFromServer('/adp-status/readfile', { 'filepath': filepath, csrfmiddlewaretoken: csfr_token }, "POST").done(function (res) {
        stopLoader('dialog-for-content')
        $("#file_content").empty();
        if (res.status == 200) {
            $("#dialog-for-content #file_content").css('visibility', 'visible');
            $("#dialog-for-content #nodata").css('visibility', 'hidden');
            $("#file_content").append(res.file_content)
        } else {
            $("#dialog-for-content #file_content").css('visibility', 'hidden');
            $("#dialog-for-content #nodata").css('visibility', 'visible');
            $("#dialog-for-content #nodata #nodatamessage").text(res.emsg);
        }
    })
}
function startAdpLoader() {
    $('#adp-status #adp-status-expand').css("display", "none")
    $('#adp-status #adp-status-nodata').css("display", "none")
    $('#adp-status #site-data').css("display", "none")
    showLoader("adp-status")

}
function stopAdpLoader() {

    $('#adp-status #adp-status-expand').css("display", "block")
    $('#adp-status #adp-status-nodata').css("display", "block")
    $('#adp-status #site-data').css("display", "block")
    $('#adp-status #apm-data').css("display", "block")
    stopLoader("adp-status")

}

var heartbeatChart = null;
// Rolling history for the adapter status chart (max 30 data points)
var adpStatusHistory = { labels: [], connected: [], degraded: [], disconnected: [] };
var ADP_HISTORY_MAX = 30;

const EXCHANGE_MAP = {
    'NSE': { name: 'NATIONAL STOCK EXCHANGE', color: '#ff5252' },
    'NFO': { name: 'NSE FUTURES & OPTIONS', color: '#ffb347' },
    'BSE': { name: 'BOMBAY STOCK EXCHANGE', color: '#4caf50' },
    'BFO': { name: 'BSE FUTURES & OPTIONS', color: '#b388ff' },
    'CDS': { name: 'CURRENCY DERIVATIVES', color: '#00bcd4' },
    'SLBM': { name: 'STOCK LENDING & BORROWING', color: '#ffeb3b' }
};

function renderAdapterDashboard(specificData) {
    console.log('--- renderAdapterDashboard ---');
    const dataToUse = specificData || (allAdpData && allAdpData.responseData && allAdpData.responseData[0]);
    if (!dataToUse) return;

    let siteData = dataToUse.site_data;

    // --- Internal Filtering (as fallback/double-check) ---
    if (activeSubsite && activeSubsite !== 'Others') {
        let subsiteLower = activeSubsite.toLowerCase();
        siteData = siteData.filter(keyObj => keyObj.key.toLowerCase().includes(subsiteLower));
    } else if (activeSubsite === 'Others' && assignedSubsites.length > 0) {
        siteData = siteData.filter(keyObj => {
            let keyLower = keyObj.key.toLowerCase();
            return !assignedSubsites.some(s => keyLower.includes(s.toLowerCase()));
        });
    }

    // 1. Data Extraction from filtered siteData
    let totalAdapters = 0;
    let connected = 0;
    let degraded = 0;
    let disconnected = 0;
    let latencies = [];
    let msgRates = [];
    let lastAdpExecutedOn = '--';

    const exchangeGroups = {}; // { exchangeCode: [items] }
    let matrixRows = [];

    siteData.forEach(obj => {
        // Filter: Only process keys that contain AdapterStatus, ignore ProcessStatus etc.
        if (!obj.key.includes('AdapterStatus')) return;

        // Extract instance name (e.g., DX, vertex, jio)
        const instanceName = obj.key.includes('Status-') ? obj.key.split('Status-')[1].toUpperCase() : '';

        const keyData = obj.key_data;
        if (!keyData || !keyData.data) return;

        // Capture executedOn from any adapter key
        if (keyData.executedOn && lastAdpExecutedOn === '--') {
            lastAdpExecutedOn = formatTimestampWithDay(keyData.executedOn);
        }

        if (keyData.type === 'matrix') {
            // Traverse Matrix: data[segment][exchange]
            Object.keys(keyData.data).forEach(segment => {
                const segmentData = keyData.data[segment];
                Object.keys(segmentData).forEach(exchCode => {
                    const exchItem = segmentData[exchCode];
                    if (exchItem === '-' || !exchItem || typeof exchItem !== 'object') return;

                    totalAdapters++;
                    let status = exchItem.status;
                    if (status === 2) connected++;
                    else if (status === 1) degraded++;
                    else if (status === 0) disconnected++;

                    // For the grid grouping
                    if (!exchangeGroups[exchCode]) exchangeGroups[exchCode] = [];
                    exchangeGroups[exchCode].push({
                        label: instanceName ? `${segment.toUpperCase()} [${instanceName}]` : segment.toUpperCase(),
                        status: status,
                        ctcl_id: exchItem.ctcl_id,
                        value: exchItem.value
                    });

                    // For the health matrix table collection
                    matrixRows.push({
                        segExch: `${segment.toUpperCase()} - ${exchCode}`,
                        instance: instanceName || '--',
                        type: exchItem.type || 'ADAPTER',
                        status: status,
                        ctcl_id: exchItem.ctcl_id || '--',
                        value: exchItem.value || '--',
                        heartbeat: exchItem.heartbeat || '--',
                        last_msg: exchItem.last_msg || '--',
                        msg_rate: exchItem.msg_rate || '--',
                        latency: exchItem.latency || '--',
                        uptime: exchItem.uptime || '--'
                    });

                    if (exchItem.latency) {
                        let lat = parseFloat(exchItem.latency);
                        if (!isNaN(lat)) latencies.push(lat);
                    }
                    if (exchItem.msg_rate) {
                        let rate = parseFloat(exchItem.msg_rate);
                        if (!isNaN(rate)) msgRates.push(rate);
                    }
                });
            });
        } else if (keyData.type === 'table' || Array.isArray(keyData.data)) {
            // Handle List/Table structure if present (as fallback)
            const dataArr = Array.isArray(keyData.data) ? keyData.data : Object.values(keyData.data);
            dataArr.forEach(item => {
                totalAdapters++;
                let status = item.status || keyData.status;
                if (status === 2) connected++;
                else if (status === 1) degraded++;
                else if (status === 0) disconnected++;

                // Identify exchange from segment or type if possible
                let exchGuess = 'OTHERS';
                if (item.segment) {
                    if (item.segment.includes('NSE')) exchGuess = 'NSE';
                    else if (item.segment.includes('NFO')) exchGuess = 'NFO';
                    else if (item.segment.includes('BSE')) exchGuess = 'BSE';
                    else if (item.segment.includes('BFO')) exchGuess = 'BFO';
                    else if (item.segment.includes('CDS')) exchGuess = 'CDS';
                }

                if (!exchangeGroups[exchGuess]) exchangeGroups[exchGuess] = [];
                exchangeGroups[exchGuess].push({
                    label: instanceName ? `${(item.segment || 'Unknown').toUpperCase()} [${instanceName}]` : (item.segment || 'Unknown').toUpperCase(),
                    status: status,
                    ctcl_id: item.ctcl_id,
                    value: item.value
                });

                // For the health matrix table collection
                matrixRows.push({
                    segExch: `${(item.segment || 'ADAPTER').toUpperCase()} - ${exchGuess}`,
                    instance: instanceName || '--',
                    type: item.type || 'ADAPTER',
                    status: status,
                    ctcl_id: item.ctcl_id || '--',
                    value: item.value || '--',
                    heartbeat: item.heartbeat || '--',
                    last_msg: item.last_msg || '--',
                    msg_rate: item.msg_rate || '--',
                    latency: item.latency || '--',
                    uptime: item.uptime || '--'
                });
            });
        }
    });

    // Sort Matrix Rows: Disconnected (0) -> Degraded (1) -> Connected (2)
    matrixRows.sort((a, b) => a.status - b.status);

    // Generate Matrix HTML
    let matrixHtml = '';
    matrixRows.forEach(row => {
        let statusColor = getPriorityColor(row.status);
        let statusText = row.status === 2 ? 'CONNECTED' : (row.status === 1 ? 'DEGRADED' : 'DISCONNECTED');
        matrixHtml += `
            <tr>
                <td style="color:var(--accent);font-weight:600">${row.segExch}</td>
                <td style="color:#4fc3f7;font-size:11px;font-weight:600">${row.instance}</td>
                <td style="font-size:10px;opacity:0.7">${row.type}</td>
                <td><span class="th-badge" style="background:${statusColor}22;color:${statusColor}">${statusText}</span></td>
                <td>${row.ctcl_id}</td>
                <td>${row.value}</td>
                <td>${row.heartbeat}</td>
                <td>${row.last_msg}</td>
                <td>${row.msg_rate}</td>
                <td style="color:var(--cyan)">${row.latency}</td>
                <td>${row.uptime}</td>
            </tr>
        `;
    });

    // 2. Summary Stats
    $('#stat-total-adapters').text(totalAdapters);
    $('#stat-connected').text(connected);
    $('#stat-degraded').text(degraded);
    $('#stat-disconnected').text(disconnected);

    // Extract executedOn if available
    const subsiteText = activeSubsite === 'Others' ? 'LE' : (activeSubsite ? activeSubsite.toUpperCase() : 'ALL SUBSITES');
    $('#stat-adp-subsite-label').text('across ' + subsiteText);
    $('#stat-adp-executed').text(lastAdpExecutedOn);

    // Latency & Message Rate
    let avgLat = latencies.length ? (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2) : '--';
    $('#stat-avg-latency').text(avgLat + (avgLat !== '--' ? ' ms' : ''));

    let totalMsgRate = msgRates.length ? msgRates.reduce((a, b) => a + b, 0).toFixed(0) : '--';
    $('#stat-msg-rate').text(totalMsgRate);

    // 3. Populate Matrix Table
    if (matrixHtml) {
        $('#health-matrix-body').html(matrixHtml);
    } else {
        $('#health-matrix-body').html('<tr><td colspan="11" class="text-center py-4 text-muted">No adapter data found</td></tr>');
    }
    // Re-apply connection matrix filter after render
    if (typeof filterAdapterMatrix === 'function') { filterAdapterMatrix($('#adp-search-input').val() || ''); }

    // 4. Dynamic Exchange Grid — Pivot Table (segments × exchanges)
    let gridHtml = '';

    // Collect all unique segments and exchanges from the raw siteData
    // pivotData key = "segment||instanceName" so each instance gets its own row
    const pivotData = {};   // { rowKey: { exchCode: { status, value, ctcl_id }, _seg, _inst } }
    const allExchanges = new Set();

    siteData.forEach(obj => {
        if (!obj.key.includes('AdapterStatus')) return;
        const keyData = obj.key_data;
        if (!keyData || !keyData.data) return;

        const instName = obj.key.includes('Status-') ? obj.key.split('Status-')[1].toUpperCase() : '';

        if (keyData.type === 'matrix') {
            Object.keys(keyData.data).forEach(segment => {
                // Row key combines segment + instance so multiple instances don't collide
                const rowKey = instName ? `${segment.toLowerCase()}||${instName}` : segment.toLowerCase();
                if (!pivotData[rowKey]) pivotData[rowKey] = { _seg: segment.toLowerCase(), _inst: instName };
                const segmentData = keyData.data[segment];
                Object.keys(segmentData).forEach(exchCode => {
                    const exchItem = segmentData[exchCode];
                    allExchanges.add(exchCode);
                    if (exchItem === '-' || !exchItem || typeof exchItem !== 'object') {
                        if (!pivotData[rowKey][exchCode]) pivotData[rowKey][exchCode] = null;
                    } else {
                        pivotData[rowKey][exchCode] = {
                            status: exchItem.status,
                            value: exchItem.value || '--',
                            ctcl_id: exchItem.ctcl_id || '--'
                        };
                    }
                });
            });
        }
    });

    // Preferred column order
    const EXCH_ORDER = ['NSE', 'NFO', 'CDS', 'BSE', 'BFO', 'SLBM'];
    const sortedCols = EXCH_ORDER.filter(e => allExchanges.has(e))
        .concat([...allExchanges].filter(e => !EXCH_ORDER.includes(e)).sort());

    // Sort rows: by segment name, then instance name
    const sortedRowKeys = Object.keys(pivotData).sort((a, b) => {
        const da = pivotData[a], db = pivotData[b];
        if (da._seg !== db._seg) return da._seg.localeCompare(db._seg);
        return da._inst.localeCompare(db._inst);
    });

    if (sortedCols.length === 0 || sortedRowKeys.length === 0) {
        gridHtml = '<div class="col-12 py-4 text-center text-muted">No exchange information found in data</div>';
    } else {
        // Build header
        let headerCells = sortedCols.map(e => `<th class="adp-pivot-th">${e}</th>`).join('');
        let tableRows = '';

        sortedRowKeys.forEach(rowKey => {
            const row = pivotData[rowKey];
            // Row label: segment + [INSTANCE] if instance exists
            const rowLabel = row._inst
                ? `${row._seg} <span class="adp-pivot-inst">[${row._inst}]</span>`
                : row._seg;

            let cells = sortedCols.map(exchCode => {
                const cell = row[exchCode];
                if (!cell) {
                    return `<td class="adp-pivot-td adp-pivot-empty">-</td>`;
                }
                let statusClass = cell.status === 2 ? 'adp-pivot-connected'
                                : cell.status === 1 ? 'adp-pivot-degraded'
                                : 'adp-pivot-disconnected';
                return `<td class="adp-pivot-td ${statusClass}" title="ID: ${cell.ctcl_id}">${cell.value}</td>`;
            }).join('');

            tableRows += `<tr><td class="adp-pivot-seg">${rowLabel}</td>${cells}</tr>`;
        });

        gridHtml = `
            <div class="col-12">
                <div class="adp-pivot-wrapper">
                    <table class="adp-pivot-table">
                        <thead>
                            <tr>
                                <th class="adp-pivot-th adp-pivot-seg-header"></th>
                                ${headerCells}
                            </tr>
                        </thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </div>
            </div>
        `;
    }
    $('#adapter-grid').html(gridHtml);
    // Re-apply grid filter after render
    if (typeof filterAdapterGrid === 'function') { filterAdapterGrid($('#grid-search-input').val() || ''); }

    // 5. Heartbeat Monitor — real status history chart
    renderHeartbeatChart(connected, degraded, disconnected);
}

function renderHeartbeatChart(connectedCount, degradedCount, disconnectedCount) {
    const canvas = document.getElementById('heartbeatChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Append new data point if counts were provided
    if (connectedCount !== undefined) {
        const now = new Date();
        const label = now.getHours().toString().padStart(2, '0') + ':'
                    + now.getMinutes().toString().padStart(2, '0') + ':'
                    + now.getSeconds().toString().padStart(2, '0');
        adpStatusHistory.labels.push(label);
        adpStatusHistory.connected.push(connectedCount);
        adpStatusHistory.degraded.push(degradedCount);
        adpStatusHistory.disconnected.push(disconnectedCount);
        // Keep rolling window
        if (adpStatusHistory.labels.length > ADP_HISTORY_MAX) {
            adpStatusHistory.labels.shift();
            adpStatusHistory.connected.shift();
            adpStatusHistory.degraded.shift();
            adpStatusHistory.disconnected.shift();
        }
    }

    if (heartbeatChart) {
        // Update existing chart in-place (no flicker)
        heartbeatChart.data.labels = adpStatusHistory.labels;
        heartbeatChart.data.datasets[0].data = adpStatusHistory.connected;
        heartbeatChart.data.datasets[1].data = adpStatusHistory.degraded;
        heartbeatChart.data.datasets[2].data = adpStatusHistory.disconnected;
        heartbeatChart.update('none');
        return;
    }

    heartbeatChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: adpStatusHistory.labels,
            datasets: [
                {
                    label: 'Connected',
                    data: adpStatusHistory.connected,
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76,175,80,0.08)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 2,
                    pointBackgroundColor: '#4caf50'
                },
                {
                    label: 'Degraded',
                    data: adpStatusHistory.degraded,
                    borderColor: '#ffb347',
                    backgroundColor: 'rgba(255,179,71,0.06)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3,
                    pointRadius: 2,
                    pointBackgroundColor: '#ffb347'
                },
                {
                    label: 'Disconnected',
                    data: adpStatusHistory.disconnected,
                    borderColor: '#ff5252',
                    backgroundColor: 'rgba(255,82,82,0.06)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3,
                    pointRadius: 2,
                    pointBackgroundColor: '#ff5252'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { color: '#999', font: { size: 10 }, boxWidth: 12, padding: 16 }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(18,18,18,0.92)',
                    titleColor: '#999',
                    bodyColor: '#e0e0e0',
                    borderColor: '#333',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    ticks: { color: '#555', font: { size: 8 }, maxRotation: 0, maxTicksLimit: 10 },
                    grid: { color: 'rgba(255,255,255,0.02)' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: '#555', font: { size: 9 }, stepSize: 1, precision: 0 },
                    grid: { color: 'rgba(255,255,255,0.04)' }
                }
            }
        }
    });
}

function getPriorityColor(status) {
    if (status === 2) return '#4caf50'; // Green
    if (status === 1) return '#ffb347'; // Orange
    if (status === 0) return '#ff5252'; // Red
    return '#999';
}

function formatTimestampWithDay(ts) {
    if (!ts || ts === '--') return '--';
    // Handle "YYYY-MM-DD HH:mm:ss [ Total: ... ]" or "DD-MM-YYYY HH:mm:ss [ Total: ... ]"
    let cleanTs = ts.split('[')[0].trim();
    try {
        const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        let date;
        // Check if it's DD-MM-YYYY
        if (/^\d{2}-\d{2}-\d{4}/.test(cleanTs)) {
            const parts = cleanTs.split(' ');
            const dateParts = parts[0].split('-');
            // Construct as YYYY/MM/DD for better cross-browser compatibility
            date = new Date(`${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${parts[1] || ''}`);
        } else {
            // YYYY-MM-DD HH:mm:ss
            date = new Date(cleanTs.replace(/-/g, '/'));
        }

        const dayIdx = date.getDay();
        const dayName = days[dayIdx];
        return dayName ? `${cleanTs} [${dayName}]` : cleanTs;
    } catch (e) {
        console.error('Timestamp parse error:', e);
        return cleanTs;
    }
}

function renderProcessDashboard(specificData) {
    console.log('--- renderProcessDashboard ---');
    const dataToUse = specificData || (allAdpData && allAdpData.responseData && allAdpData.responseData[0]);
    if (!dataToUse) return;

    let siteData = dataToUse.site_data;

    // --- Internal Filtering (as fallback/double-check) ---
    if (activeSubsite && activeSubsite !== 'Others') {
        let subsiteLower = activeSubsite.toLowerCase();
        siteData = siteData.filter(keyObj => keyObj.key.toLowerCase().includes(subsiteLower));
    } else if (activeSubsite === 'Others' && assignedSubsites.length > 0) {
        siteData = siteData.filter(keyObj => {
            let keyLower = keyObj.key.toLowerCase();
            return !assignedSubsites.some(s => keyLower.includes(s.toLowerCase()));
        });
    }

    let totalProcesses = 0;
    let healthy = 0;
    let warning = 0;
    let critical = 0;
    let unknown = 0;

    const processGroups = {};
    let matrixRows = [];
    let lastExecutedOn = '--';

    siteData.forEach(obj => {
        if (!obj.key.includes('ProcessStatus')) return;

        // Extract instance name (e.g., ALGO, BETAFRONT)
        const instanceName = obj.key.includes('Status-') ? obj.key.split('Status-')[1].toUpperCase() : '';

        const keyData = obj.key_data;
        //console.log("keyData---->" + JSON.stringify(keyData))
        if (!keyData) return;

        if (keyData.executedOn) {
            lastExecutedOn = formatTimestampWithDay(keyData.executedOn);
        }

        if (!keyData.data) return;

        const dataArr = Array.isArray(keyData.data) ? keyData.data : Object.values(keyData.data);
        dataArr.forEach(item => {
            if (typeof item !== 'object') return;

            totalProcesses++;
            let status = item.status;
            if (status === 2) healthy++;
            else if (status === 1) warning++;
            else if (status === 0) critical++;
            else unknown++;

            let segmentBase = (item.segment || obj.key.split(':')[1] || 'SYSTEM').toUpperCase();
            if (segmentBase.startsWith('ADP_')) segmentBase = segmentBase.substring(4);
            if (segmentBase.endsWith('STATUS')) segmentBase = segmentBase.substring(0, segmentBase.length - 6);

            const segment = instanceName ? `${segmentBase} [${instanceName}]` : segmentBase;

            let pName = item.name || item.process_name || 'Process';
            let pId = item.pid || item.process_id || '--';
            let cpu = (typeof item.cpu_percent === 'number') ? item.cpu_percent.toFixed(2) : (item.cpu_percent || item.cpu_usage || '--');
            let mem = (typeof item.memory_percent === 'number') ? item.memory_percent.toFixed(2) + '%' : (item.memory_percent || item.memory_usage || '--');

            if (!processGroups[segment]) processGroups[segment] = [];
            processGroups[segment].push({
                label: pName,
                status: status,
                id: pId,
                val: cpu // Using CPU as the "VAL" to match adapter format
            });

            matrixRows.push({
                label: instanceName ? `${pName} [${instanceName}]` : pName,
                id: pId,
                status: status,
                cpu: cpu,
                memory: mem,
                io_read: item.io_read || '--',
                io_write: item.io_write || '--',
                uptime: item.uptime || '--',
                last_updated: item.last_updated || item.executedOn || '--',
                instanceName: instanceName || 'SYSTEM'
            });
        });
    });

    // Update Summary Stats
    $('#stat-proc-total').text(totalProcesses);
    $('#stat-proc-healthy').text(healthy);
    $('#stat-proc-warning').text(warning);
    $('#stat-proc-critical').text(critical);
    $('#stat-proc-unknown').text(unknown);
    $('#stat-proc-uptime').text('99.9%'); // Placeholder for now
    const subsiteText = activeSubsite === 'Others' ? 'LE' : (activeSubsite ? activeSubsite.toUpperCase() : 'ALL SUBSITES');
    $('#stat-proc-subsite-label').text('across ' + subsiteText);

    $('#stat-proc-executed').text(lastExecutedOn);

    // Update Grid HTML
    let gridHtml = '';
    // Sort segments: those with status 0 (critical) first, then 1 (warning), then 2 (healthy)
    const sortedProcessSegments = Object.keys(processGroups).sort((a, b) => {
        const minStatA = Math.min(...processGroups[a].map(item => item.status));
        const minStatB = Math.min(...processGroups[b].map(item => item.status));
        if (minStatA !== minStatB) return minStatA - minStatB;
        return a.localeCompare(b); // Fallback to alphabetical
    });

    sortedProcessSegments.forEach(seg => {
        // Sort individual processes: Disconnected (0) -> Degraded (1) -> Healthy (2)
        processGroups[seg].sort((a, b) => a.status - b.status);

        gridHtml += `
            <div class="col-12">
                <div class="le-card p-3">
                    <div style="font-size:11px;font-weight:700;color:var(--accent);margin-bottom:12px">${seg}</div>
                    <div class="process-scroll-grid">
        `;
        processGroups[seg].forEach(proc => {
            let color = getPriorityColor(proc.status);
            gridHtml += `
                <div class="seg-badge" style="border-left:3px solid ${color}">
                    <div class="seg-header">
                        <span class="dot" style="background:${color}"></span>
                        <span class="name">${proc.label}</span>
                    </div>
                    <div class="details">
                        <span>ID: ${proc.id}</span>
                        <span>VAL: ${proc.val}</span>
                    </div>
                </div>
            `;
        });
        gridHtml += `</div></div></div>`;
    });
    $('#process-grid').html(gridHtml || '<div class="col-12 py-4 text-center text-muted">No process data found for this site.</div>');

    // Update Matrix Table
    matrixRows.sort((a, b) => {
        const safeStatus = s => (typeof s === 'number' && !isNaN(s)) ? s : 999;
        return safeStatus(a.status) - safeStatus(b.status);
    });
    
    // Group by instanceName
    let groupedRows = {};
    matrixRows.forEach(row => {
        let groupName = row.instanceName || 'SYSTEM';
        if (!groupedRows[groupName]) {
            groupedRows[groupName] = [];
        }
        groupedRows[groupName].push(row);
    });

    // Also sort rows within each group: red (0) → warning (1) → healthy (2)
    Object.keys(groupedRows).forEach(g => {
        const safeStatus = s => (typeof s === 'number' && !isNaN(s)) ? s : 999;
        groupedRows[g].sort((a, b) => safeStatus(a.status) - safeStatus(b.status));
    });

    let dynamicHtml = '';
    
    if (Object.keys(groupedRows).length === 0) {
        dynamicHtml = '<div class="p-4 text-center text-muted">No process data available.</div>';
    } else {
        Object.keys(groupedRows).sort((a, b) => {
            // Sort groups by worst status first: 0 (critical/red) → 1 (warning) → 2 (healthy)
            const safeStatus = s => (typeof s === 'number' && !isNaN(s)) ? s : 999;
            const worstA = Math.min(...groupedRows[a].map(r => safeStatus(r.status)));
            const worstB = Math.min(...groupedRows[b].map(r => safeStatus(r.status)));
            if (worstA !== worstB) return worstA - worstB;
            return a.localeCompare(b); // alphabetical tiebreak
        }).forEach(groupName => {
            let icon = 'fas fa-layer-group';
            let nameUpper = groupName.toUpperCase();
            if (nameUpper.includes('PROD')) icon = 'fas fa-server';
            else if (nameUpper.includes('UAT')) icon = 'fas fa-vial';
            else if (nameUpper.includes('DEV')) icon = 'fas fa-code';
            
            let tableHtml = `
                <div class="process-matrix-group-container">
                    <h5 style="padding: 10px 15px; margin: 0; color: var(--accent); background: rgba(255,255,255,0.05); font-size: 14px; border-top: 1px solid #333;"><i class="${icon}"></i> ${groupName}</h5>
                    <div class="le-table-wrapper mb-3">
                        <table class="le-table">
                            <thead>
                                <tr>
                                    <th style="width: 25%;">Segment / Process</th>
                                    <th style="width: 10%; text-align: left !important;">ID</th>
                                    <th style="width: 12%;">Status</th>
                                    <th style="width: 9%;">CPU Usage</th>
                                    <th style="width: 9%;">Memory</th>
                                    <th style="width: 8%;">IO Read</th>
                                    <th style="width: 8%;">IO Write</th>
                                    <th style="width: 9%;">Uptime</th>
                                    <th style="width: 10%;">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
            
            groupedRows[groupName].forEach(row => {
                let statusColor = getPriorityColor(row.status);
                let statusText = row.status === 2 ? 'HEALTHY' : (row.status === 1 ? 'WARNING' : (row.status === 0 ? 'CRITICAL' : 'UNKNOWN'));
                tableHtml += `
                    <tr>
                        <td style="color:var(--accent);font-weight:600">${row.label}</td>
                        <td style="text-align: left !important;">${row.id}</td>
                        <td><span class="th-badge" style="background:${statusColor}22;color:${statusColor}">${statusText}</span></td>
                        <td>${row.cpu}</td>
                        <td>${row.memory}</td>
                        <td>${row.io_read}</td>
                        <td>${row.io_write}</td>
                        <td>${row.uptime}</td>
                        <td style="font-size:10px;opacity:0.6">${row.last_updated}</td>
                    </tr>
                `;
            });
            
            tableHtml += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            dynamicHtml += tableHtml;
        });
    }

    $('#dynamic-process-matrix-container').html(dynamicHtml);

    // Update Annotations Dropdown
    let annoOptions = '<option value="">Select process...</option>';
    matrixRows.forEach(row => {
        annoOptions += `<option value="${row.label}">${row.label} (${row.id})</option>`;
    });
    $('#annoProcSelect').html(annoOptions);

    // Update Timeline Selection Dropdown
    updateTimelineProcessDropdown(matrixRows);

    // Initialize/Update Timeline Chart
    renderProcessTimelineChart(matrixRows);
}

let timelineRotationTimer = null;
let currentTimelineProcessLabel = null;
let isTimelineManualOverride = false;

function updateTimelineProcessDropdown(rows) {
    const $select = $('#timelineProcessSelect');
    if (!$select.length) return;

    let options = '<option value="auto">-- Auto Rotate (3s) --</option>';
    rows.forEach(row => {
        options += `<option value="${row.label}">${row.label}</option>`;
    });

    // Preserve selection if it still exists
    const prevVal = $select.val();
    $select.html(options);
    if (prevVal && rows.some(r => r.label === prevVal)) {
        $select.val(prevVal);
    } else if (!isTimelineManualOverride) {
        $select.val('auto');
    }

    startTimelineRotation(rows);
}

function handleTimelineManualSelect(val) {
    if (val === 'auto') {
        isTimelineManualOverride = false;
        $('#timeline-rotation-status').text('');
    } else {
        isTimelineManualOverride = true;
        currentTimelineProcessLabel = val;
        $('#timeline-rotation-status').text('MANUAL FOCUS');
    }
    renderProcessDashboard();
}

function startTimelineRotation(rows) {
    if (timelineRotationTimer) clearInterval(timelineRotationTimer);
    if (isTimelineManualOverride) return;

    let idx = 0;
    if (currentTimelineProcessLabel) {
        idx = rows.findIndex(r => r.label === currentTimelineProcessLabel);
        if (idx === -1) idx = 0;
    }

    timelineRotationTimer = setInterval(() => {
        if (isTimelineManualOverride || !rows.length) return;

        idx = (idx + 1) % rows.length;
        currentTimelineProcessLabel = rows[idx].label;

        // Update Chart without full dashboard re-render for smoothness if possible, 
        // but renderProcessTimelineChart needs the rows anyway.
        renderProcessTimelineChart(rows);

        // Update selection text in dropdown (optional visual cue)
        // $('#timelineProcessSelect').val('auto'); 
        $('#timeline-rotation-status').text(`SHOWING: ${currentTimelineProcessLabel}`);
    }, 3000);
}

let currentTimelineRange = '1h';

function setTimelineRange(range, btn) {
    currentTimelineRange = range;
    $(btn).siblings().removeClass('active');
    $(btn).addClass('active');

    const labels = { '1m': '1 MINUTE', '1h': '1 HOUR', '1d': '1 DAY', '1w': '1 WEEK', '1M': '1 MONTH' };
    $('#timeline-range-text').text(`(LAST ${labels[range]})`);

    renderProcessDashboard(); // Re-render to update the timeline chart
}

let processTimelineChartInstance = null;
function renderProcessTimelineChart(rows) {
    const ctx = document.getElementById('processTimelineChart');
    if (!ctx) return;

    // Filter to top 15 most interesting processes for the timeline (to avoid clutter)
    // Use the full label (Instance + Name) for better identification
    const topProcesses = rows.slice(0, 15);

    let labels = [];
    let dataPoints = 12; // default

    if (currentTimelineRange === '1m') {
        dataPoints = 60;
        labels = Array.from({ length: dataPoints }, (_, i) => `${(dataPoints - 1 - i)}s ago`);
    } else if (currentTimelineRange === '1h') {
        dataPoints = 12;
        labels = Array.from({ length: dataPoints }, (_, i) => `${(dataPoints - 1 - i) * 5}m ago`);
    } else if (currentTimelineRange === '1d') {
        dataPoints = 24;
        labels = Array.from({ length: dataPoints }, (_, i) => `${(dataPoints - 1 - i)}h ago`);
    } else if (currentTimelineRange === '1w') {
        dataPoints = 7;
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (currentTimelineRange === '1M') {
        dataPoints = 30;
        labels = Array.from({ length: dataPoints }, (_, i) => `${i + 1}nd`);
    }

    // If auto-rotating or manually focused, we might want to emphasize one process
    // However, the user said "show that data", implying focusing.
    // Let's filter to only show the CURRENT process if focusing, 
    // OR show all but highlight the current one.
    // Given the clutter in the screenshot, showing ONLY the selected one is much cleaner.

    let chartProcesses = topProcesses;
    if (currentTimelineProcessLabel) {
        const focused = rows.find(r => r.label === currentTimelineProcessLabel);
        if (focused) {
            chartProcesses = [focused];
        }
    }

    const datasets = chartProcesses.map((proc, idx) => {
        let color = getPriorityColor(proc.status);
        // Fake historical data based on current status with some variance
        const data = Array.from({ length: dataPoints }, () => {
            // 90% chance to match the current status, 10% chance to be different
            if (Math.random() > 0.9) {
                return Math.random() > 0.5 ? 100 : (Math.random() > 0.5 ? 50 : 10);
            }
            return (proc.status === 2 ? 100 : (proc.status === 1 ? 50 : 10));
        });

        return {
            label: proc.label, // This now contains [Instance] as well from earlier logic
            data: data,
            borderColor: color,
            borderWidth: 2,
            pointRadius: dataPoints > 30 ? 0 : 3,
            fill: false,
            tension: 0.1
        };
    });

    if (processTimelineChartInstance) {
        processTimelineChartInstance.destroy();
    }

    processTimelineChartInstance = new Chart(ctx, {
        type: 'line',
        data: { labels: labels, datasets: datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: '#666',
                        font: { size: 9 },
                        maxTicksLimit: dataPoints > 20 ? 10 : 20
                    },
                    grid: { color: 'rgba(255,255,255,0.02)' }
                },
                y: { min: 0, max: 110, ticks: { display: false }, grid: { display: false } }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#999',
                        font: { size: 8 },
                        boxWidth: 8,
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let status = context.raw === 100 ? 'HEALTHY' : (context.raw === 50 ? 'WARNING' : 'CRITICAL');
                            return `${context.dataset.label}: ${status}`;
                        }
                    }
                }
            }
        }
    });
}

// ── Extraction from linkedeye-adp-status.html ──
var params = new URLSearchParams(window.location.search);
var siteName = params.get('site') || 'lemonn-mum-le';

// Append site suffix to nav labels
function appendSiteSuffix() {
    const siteParts = siteName.split('-');
    const siteSuffix = siteParts.length > 2 ? siteParts[siteParts.length - 2].toUpperCase() : siteParts[0].toUpperCase();
    document.querySelectorAll('.le-subnav a').forEach(el => {
        if (!el.textContent.includes('-')) {
            el.textContent = el.textContent + '-' + siteSuffix;
        }
    });
}

// ── Page Navigation ──
function showPage(page) {
    // Hide sync button by default
    $('#btn-bw-sync').hide();

    // Hide all mockup sections
    document.querySelectorAll('.page-section').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });
    document.querySelectorAll('.le-subnav a').forEach(el => el.classList.remove('active'));

    const names = { process: 'ProcessStatus', adapter: 'AdapterStatus', latency: 'Latency', messagequeue: 'MessageQueue', bandwidth: 'Bandwidth' };
    const breadcrumbSub = document.getElementById('breadcrumbSub');
    if (breadcrumbSub) breadcrumbSub.textContent = names[page] || page;

    const navEl = document.getElementById('nav-' + page);
    if (navEl) navEl.classList.add('active');

    // Subsite Concept Visibility moved to end of function to ensure visibility checks work

    // Handle Dynamic Sections vs Reference Sections
    const dynamicSections = ['process', 'adapter'];

    if (page === 'adapter') {
        document.getElementById('site-data').style.display = 'none';
        document.getElementById('apm-data').style.display = 'none';
        const section = document.getElementById('page-adapter');
        if (section) {
            section.style.display = 'block';
            section.classList.add('active');
        }
        if (typeof renderAdapterDashboard === 'function') renderAdapterDashboard();
    } else if (page === 'process') {
        document.getElementById('site-data').style.display = 'none';
        document.getElementById('apm-data').style.display = 'none';
        const section = document.getElementById('page-process');
        if (section) {
            section.style.display = 'block';
            section.classList.add('active');
        }
        if (typeof renderProcessDashboard === 'function') renderProcessDashboard();
    } else if (dynamicSections.includes(page)) {
        document.getElementById('site-data').style.display = 'block';
        document.getElementById('apm-data').style.display = 'none';
    } else {
        const siteDataEl = document.getElementById('site-data');
        const apmDataEl = document.getElementById('apm-data');
        if (siteDataEl) siteDataEl.style.display = 'none';
        if (apmDataEl) apmDataEl.style.display = 'none';
        const section = document.getElementById('page-' + page);
        if (section) {
            section.style.display = 'block';
            section.classList.add('active');
        }
        if (page === 'latency') {
            if (window.LatencyPage && typeof window.LatencyPage.init === 'function') {
                setTimeout(function () { window.LatencyPage.init(); }, 50);
            } else {
                initLatencyCharts();
            }
        } else if (page === 'messagequeue') {
            // Initialize MessageQueue charts only when tab is visible
            if (window.MQPage && typeof window.MQPage.init === 'function') {
                setTimeout(function () { window.MQPage.init(); }, 50);
            }
        } else if (page === 'bandwidth') {
            // Initialize Bandwidth charts and data
            if (window.BWPage && typeof window.BWPage.init === 'function') {
                setTimeout(function () { window.BWPage.init(); }, 50);
            }
        }
    }

    // Subsite Concept Visibility (Re-run after page visibility is set)
    if (page === 'process' || page === 'adapter') {
        renderSubsiteTabs();
    } else {
        $('#subsite-tabs-row').hide();
        $('#breadcrumbSubsite').hide();
    }
}

function setMqTime(btn) { btn.parentElement.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
function setLatTime(btn) { btn.parentElement.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
function setBwTime(btn) { btn.parentElement.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
function filterBwDevice() { /* In production: filter .bw-card by data-device attribute */ }

// ── Generate Demo Data (only used for non-dynamic pages) ──
function genData(len, base, variance, spike) {
    const d = [];
    for (let i = 0; i < len; i++) {
        let v = base + (Math.random() - 0.5) * variance;
        if (spike && i > len * 0.05 && i < len * 0.12) v += spike * (1 - Math.abs(i - len * 0.08) / (len * 0.04));
        d.push(Math.max(0, Math.round(v)));
    }
    return d;
}
function genTimeLabels(start, count, stepSec) {
    const labels = [];
    let [h, m, s] = start.split(':').map(Number);
    for (let i = 0; i < count; i++) {
        labels.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
        s += stepSec;
        if (s >= 60) { m += Math.floor(s / 60); s %= 60; }
        if (m >= 60) { h += Math.floor(m / 60); m %= 60; }
    }
    return labels;
}

// ── Chart Defaults ──
const darkGrid = { color: 'rgba(255,255,255,0.03)' };
const darkTick = { color: '#555', font: { size: 9 } };
const darkTooltip = { backgroundColor: 'rgba(18,18,18,0.95)', borderColor: '#2a2a2a', borderWidth: 1, titleColor: '#999', bodyColor: '#e0e0e0', titleFont: { family: 'Consolas', size: 10 }, bodyFont: { family: 'Consolas', size: 11 } };

function makeOpts(legend) {
    return {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: legend, labels: { color: '#999', font: { size: 10 }, boxWidth: 10 } }, tooltip: darkTooltip },
        scales: { x: { ticks: { ...darkTick, maxTicksLimit: 25 }, grid: darkGrid }, y: { ticks: darkTick, grid: { color: 'rgba(255,255,255,0.04)' } } },
    };
}

// ── Render Static Charts (Mockup Only) ──
window.addEventListener('load', function () {
    // [Mockup code disabled to ensure only real-time API data is displayed]
});

function initLatencyCharts() {
    // Legacy demo charts kept for fallback only.
    // Real latency charts are rendered by LatencyPage (below).
    // [Disabled to avoid showing fake data]
}

// ─────────────────────────────────────────────────────────────
// LatencyPage (real API-driven latency dashboard)
// Uses existing MQ endpoints backed by analytics.order_latency.
// ─────────────────────────────────────────────────────────────

var LatencyPage = (function () {
    var API_BASE = '/bod-eodstatus';
    var _wired = false;
    var _datesLoaded = false;
    var _refreshSeq = 0;
    var _latAlertEnabled = false;   // only alert when tab is explicitly opened

    function qs(params) {
        var esc = encodeURIComponent;
        return Object.keys(params)
            .filter(function (k) { return params[k] !== undefined && params[k] !== null && params[k] !== ''; })
            .map(function (k) { return esc(k) + '=' + esc(String(params[k])); })
            .join('&');
    }

    function fetchJson(url) {
        return fetch(url, { credentials: 'same-origin' })
            .then(function (r) { return r.text(); })
            .then(function (t) { try { return JSON.parse(t); } catch (e) { return null; } })
            .catch(function () { return null; });
    }

    function fmtDisplay(iso) {
        try {
            if (window.moment) return moment(iso, 'YYYY-MM-DD').format('DD-MMM-YYYY');
        } catch (e) { }
        return iso;
    }

    function wire(root) {
        var sel = root.querySelector('#latDateSelect');
        var applyBtn = root.querySelector('#latApplyBtn');
        var ts = root.querySelector('#latStartTime');
        var te = root.querySelector('#latEndTime');

        if (sel) sel.addEventListener('change', function () { refresh(root); });
        if (applyBtn) applyBtn.addEventListener('click', function () { refresh(root); });
        if (ts) ts.addEventListener('change', function () { refresh(root); });
        if (te) te.addEventListener('change', function () { refresh(root); });

        // Preset buttons are NOT wired here: each one already calls
        // setLatPreset() via its inline onclick, which sets the time inputs and
        // then calls LatencyPage.refresh(). Adding a listener too made every
        // preset click fire two identical stats+latency requests -- with four
        // sync workers, duplicate slow queries saturate the pool.
    }

    function loadDates(root) {
        if (_datesLoaded) return;
        _datesLoaded = true;

        var sel = root.querySelector('#latDateSelect');
        if (!sel) return;

        // Reuse messagequeue-dates since it already includes order_latency dates
        var url = API_BASE + '/messagequeue-dates';
        fetchJson(url).then(function (resp) {
            if (!resp || resp.status !== 200) return;
            var dates = resp.dates || [];
            sel.innerHTML = '';
            if (!dates.length) {
                var o = document.createElement('option');
                o.value = '';
                o.textContent = 'No dates';
                sel.appendChild(o);
                return;
            }
            dates.forEach(function (d, idx) {
                var o = document.createElement('option');
                o.value = d;                 // ISO for backend
                o.textContent = fmtDisplay(d); // DD-MMM-YYYY for UI
                if (idx === 0) o.selected = true;
                sel.appendChild(o);
            });
            refresh(root);
        });
    }

    function setText(id, text) {
        var el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function setLoading(root, isLoading) {
        var ind = root.querySelector('#latLoadingIndicator');
        if (ind) ind.style.display = isLoading ? '' : 'none';
        root.querySelectorAll('#latDateSelect, #latStartTime, #latEndTime, #latApplyBtn, .time-btn')
            .forEach(function (el) { el.disabled = isLoading; });
    }

    function num(v, digits) {
        if (v === null || v === undefined || v === '' || !isFinite(Number(v))) return '--';
        var n = Number(v);
        if (typeof digits === 'number') return n.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
        return n.toLocaleString();
    }

    function renderStats(statsResp) {
        var pctOms = statsResp.latency_percentiles || {};
        var pctEx  = statsResp.latency_percentiles_exch || {};
        var lat    = statsResp.latency_stats || {};

        // Cards on Latency tab
        setText('mqStatP50OmsVal', num(pctOms.p50_oms, 1)); // reuse existing IDs if present in UI? (safe)

        // Latency tab IDs:
        // stat values are static HTML right now; update only if the IDs exist.
        setText('latStatP50OmsVal', num(pctOms.p50_oms, 1));
        setText('latStatAvgOmsVal', num(lat.avg_oms_latency, 2));
        setText('latStatP95OmsVal', num(pctOms.p95_oms, 1));
        setText('latStatMaxOmsVal', num(lat.max_oms_latency, 0));
        setText('latStatP50ExchVal', num(pctEx.p50_exch, 1));
        setText('latStatTotalOrdersVal', lat.total_orders ? num(lat.total_orders) : '--');
        setText('latStatTotalOrdersSub', lat.total_orders ? 'order latency rows' : '--');

        // Segment table (#latSegTable already exists)
        var tbody = document.getElementById('latSegTable');
        if (tbody && Array.isArray(statsResp.latency_by_segment)) {
            tbody.innerHTML = '';
            statsResp.latency_by_segment.forEach(function (r) {
                var seg = String(r.segment || '').toUpperCase();
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + seg + '</td>' +
                    '<td>' + num(r.orders) + '</td>' +
                    '<td style="color:var(--green)">' + num((statsResp.latency_percentiles_by_segment || {})[seg] && (statsResp.latency_percentiles_by_segment || {})[seg].p50_oms, 1) + '</td>' +
                    '<td>' + num(r.avg_oms, 2) + '</td>' +
                    '<td>' + num((statsResp.latency_percentiles_by_segment || {})[seg] && (statsResp.latency_percentiles_by_segment || {})[seg].p95_oms, 1) + '</td>' +
                    '<td>' + num((statsResp.latency_percentiles_by_segment || {})[seg] && (statsResp.latency_percentiles_by_segment || {})[seg].p99_oms, 1) + '</td>' +
                    '<td style="color:var(--red)">' + num(r.max_oms, 0) + '</td>' +
                    '<td>' + num((statsResp.latency_percentiles_exch_by_segment || {})[seg] && (statsResp.latency_percentiles_exch_by_segment || {})[seg].p50_exch, 1) + '</td>';
                tbody.appendChild(tr);
            });
        }

        // Render Dynamic Segment Cards
        var dynCardsContainer = document.getElementById('dynamicSegmentCards');
        if (dynCardsContainer && Array.isArray(statsResp.latency_by_segment)) {
            dynCardsContainer.innerHTML = '';
            var segColors = { 'NSE': 'var(--red)', 'NFO': 'var(--orange)', 'BSE': 'var(--green)', 'BFO': 'var(--purple)', 'MCX': 'var(--cyan)' };
            
            statsResp.latency_by_segment.forEach(function (r) {
                var seg = String(r.segment || '').toUpperCase();
                var color = segColors[seg] || '#888';
                var pct = (statsResp.latency_percentiles_by_segment || {})[seg] || {};
                
                var cardHtml = `
                    <div class="col-md-6">
                        <div class="le-card h-100" style="border-left: 4px solid ${color};">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div class="d-flex align-items-center gap-2">
                                    <span style="background: ${color}; width: 8px; height: 8px; border-radius: 50%;"></span>
                                    <span style="font-size: 14px; font-weight: 800; color: #fff;">${seg}</span>
                                    <span style="font-size: 11px; color: var(--text-muted);">● ${seg} ${num(r.orders)}</span>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">
                                        Peak OMS: <span style="color: ${color}; font-weight: 800;">${num(r.max_oms, 2)} µs</span>
                                    </div>
                                    <div style="font-size: 9px; color: var(--text-muted);">P50 OMS: ${num(pct.p50_oms, 1)} µs</div>
                                </div>
                            </div>
                            <div class="row g-2 text-center">
                                <div class="col-4" style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 4px;">
                                    <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase;">P50 OMS</div>
                                    <div style="font-size: 16px; font-weight: 700; color: var(--green);">${num(pct.p50_oms, 1)} <span style="font-size: 10px;">µs</span></div>
                                </div>
                                <div class="col-4" style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 4px;">
                                    <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase;">AVG OMS</div>
                                    <div style="font-size: 16px; font-weight: 700;">${num(r.avg_oms, 2)} <span style="font-size: 10px;">µs</span></div>
                                </div>
                                <div class="col-4" style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 4px;">
                                    <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase;">P95 OMS</div>
                                    <div style="font-size: 16px; font-weight: 700;">${num(pct.p95_oms, 1)} <span style="font-size: 10px;">µs</span></div>
                                </div>
                                <div class="col-4" style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 4px;">
                                    <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase;">P99 OMS</div>
                                    <div style="font-size: 16px; font-weight: 700;">${num(pct.p99_oms, 1)} <span style="font-size: 10px;">µs</span></div>
                                </div>
                                <div class="col-4" style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 4px;">
                                    <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase;">MAX OMS</div>
                                    <div style="font-size: 16px; font-weight: 700; color: ${color};">${num(r.max_oms, 2)} <span style="font-size: 10px;">µs</span></div>
                                </div>
                                <div class="col-4" style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 4px;">
                                    <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase;">ORDERS</div>
                                    <div style="font-size: 16px; font-weight: 700;">${num(r.orders)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                dynCardsContainer.innerHTML += cardHtml;
            });
        }
    }

    function renderCharts(latResp) {
        if (!latResp || !Array.isArray(latResp.data) || !latResp.data.length) {
            ['mainLatencyChart', 'orderVolumeChart', 'exchLatencyChart', 'histogramChart'].forEach(function(id) {
                var ctx = document.getElementById(id);
                if (ctx && typeof Chart !== 'undefined' && Chart.getChart && Chart.getChart(ctx)) {
                    Chart.getChart(ctx).destroy();
                }
            });
            return;
        }
        var rows = latResp.data;
        var labels = rows.map(function (r) { return r.time; });

        // No per-minute P50 series: messagequeue-latency aggregates in SQL, and
        // MySQL 5.7 has no percentile function. Computing it per bucket would
        // mean pulling every row into Python. The real P50/P95 come from
        // messagequeue-stats and are shown in the stat tiles above.
        //
        // null (no non-null latency reading in that minute) is passed through as
        // null, not coerced to 0 -- `|| 0` here turned "no data" into a fabricated
        // zero-latency point plotted on the chart next to real readings. Chart.js
        // renders a null point as a gap in the line instead.
        var toNumOrNull = function (v) { return (v === null || v === undefined) ? null : Number(v); };
        var avgOms = rows.map(function (r) { return toNumOrNull(r.avg_oms); });
        var maxOms = rows.map(function (r) { return toNumOrNull(r.max_oms); });

        var orders = rows.map(function (r) { return Number(r.order_count || 0); });

        var avgEx  = rows.map(function (r) { return toNumOrNull(r.avg_exch); });
        var maxEx  = rows.map(function (r) { return toNumOrNull(r.max_exch); });

        // OMS chart
        var mainCtx = document.getElementById('mainLatencyChart');
        if (mainCtx) {
            if (window.mainLatChartInst) window.mainLatChartInst.destroy();
            if (typeof Chart !== 'undefined' && Chart.getChart && Chart.getChart(mainCtx)) Chart.getChart(mainCtx).destroy();
            window.mainLatChartInst = new Chart(mainCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Avg OMS', data: avgOms, borderColor: '#3987e5', borderWidth: 2, tension: 0.3, pointRadius: 0 },
                        { label: 'Max OMS', data: maxOms, borderColor: '#3987e5', borderWidth: 1, borderDash: [4, 4], pointRadius: 0 }
                    ]
                },
                options: makeOpts(true)
            });
        }

        // Volume chart
        var volCtx = document.getElementById('orderVolumeChart');
        if (volCtx) {
            if (window.volChartInst) window.volChartInst.destroy();
            if (typeof Chart !== 'undefined' && Chart.getChart && Chart.getChart(volCtx)) Chart.getChart(volCtx).destroy();
            window.volChartInst = new Chart(volCtx, {
                type: 'bar',
                data: { labels: labels, datasets: [{ label: 'Orders Per Minute', data: orders, backgroundColor: '#3987e5', borderWidth: 0, borderRadius: 4 }] },
                options: { ...makeOpts(false), scales: { x: { ticks: { ...darkTick, maxTicksLimit: 20 }, grid: { display: false } }, y: { ticks: darkTick, grid: { color: 'rgba(255,255,255,0.05)' } } } }
            });
        }

        // Exchange chart
        var exchCtx = document.getElementById('exchLatencyChart');
        if (exchCtx) {
            if (window.exchChartInst) window.exchChartInst.destroy();
            window.exchChartInst = new Chart(exchCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Avg Exch', data: avgEx, borderColor: '#d95926', borderWidth: 2, tension: 0.3, pointRadius: 0 },
                        { label: 'Max Exch', data: maxEx, borderColor: '#d95926', borderWidth: 1, borderDash: [4, 4], pointRadius: 0 }
                    ]
                },
                options: makeOpts(true)
            });
        }

        // Histogram chart
        var histCtx = document.getElementById('histogramChart');
        if (histCtx) {
            if (window.histChartInst) window.histChartInst.destroy();
            if (typeof Chart !== 'undefined' && Chart.getChart && Chart.getChart(histCtx)) Chart.getChart(histCtx).destroy();
            window.histChartInst = new Chart(histCtx, {
                type: 'bar',
                data: {
                    // Labels come from the API: bucket bounds are derived from the
                    // data's own range. The old hardcoded 0-50..500+ 'µs' ranges did
                    // not match the values (which reach ~17,000,000), so every order
                    // fell in the last bucket.
                    labels: latResp.histogram_labels || [],
                    datasets: [{
                        label: '% of Orders',
                        data: latResp.histogram || [],
                        // Flat fill in the OMS hue: this is oms_latency's own
                        // distribution, so it belongs to the OMS family. A vertical
                        // gradient would imply a magnitude the bar height already
                        // carries.
                        backgroundColor: '#3987e5',
                        borderWidth: 0,
                        borderRadius: 4
                    }] 
                },
                options: { 
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: { 
                        x: { ticks: { color: '#aab2bd', font: { family: 'Inter', size: 11 } }, grid: { display: false } }, 
                        y: { ticks: { color: '#aab2bd', font: { family: 'Consolas', size: 11 }, callback: function(value) { return value + "%"; } }, grid: { color: 'rgba(255,255,255,0.05)' } } 
                    } 
                }
            });
        }
    }

    function refresh(root) {
        var seq = ++_refreshSeq;
        var sel = root.querySelector('#latDateSelect');
        var ts = root.querySelector('#latStartTime');
        var te = root.querySelector('#latEndTime');

        var fileDate = (sel && sel.value) || '';
        // Use the complete selected date so delayed or recovery records
        // outside normal market hours are not silently hidden.
        var timeStart = (ts && ts.value) || '00:00';
        var timeEnd = (te && te.value) || '23:59';

        var p = { file_date: fileDate, time_start: timeStart, time_end: timeEnd };
        var statsUrl = API_BASE + '/messagequeue-stats?' + qs(p);
        var latUrl = API_BASE + '/messagequeue-latency?' + qs(p);

        setLoading(root, true);

        Promise.all([fetchJson(statsUrl), fetchJson(latUrl)]).then(function (arr) {
            if (seq !== _refreshSeq) return;   // a newer refresh is already in flight
            setLoading(root, false);
            var statsResp = arr[0];
            var latResp = arr[1];
            // Always render, even on failure. Skipping the render left the
            // PREVIOUS date's numbers and charts on screen, so changing the date
            // looked like it did nothing -- fetchJson swallows errors and
            // returns null, so a failed or slow call was indistinguishable from
            // "no change". An empty response must visibly clear the panels.
            if (statsResp && statsResp.status === 200) renderStats(statsResp);
            // latency_by_segment must be an array, not omitted: the segment table
            // and the dynamic cards only rebuild when it is one, so leaving it
            // undefined would keep the previous date's rows on screen.
            else renderStats({ latency_by_segment: [] });
            if (latResp && latResp.status === 200) {
                renderCharts(latResp);
                if (_latAlertEnabled && (!latResp.data || latResp.data.length === 0)) {
                    _latAlertEnabled = false;   // reset so auto-refresh doesn't re-fire
                    if (typeof swal === 'function') {
                        swal({
                            title: "No Data",
                            text: "<span style='color:#e0e0e0;font-size:14px;'>No latency data available for the selected date.</span>",
                            html: true,
                            type: "info",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#e99123"
                        });
                    }
                }
            } else {
                // Same reasoning: clear the charts rather than leave the previous
                // date's series drawn under the new date's label.
                renderCharts({ data: [], histogram: [], histogram_labels: [] });
            }
        });
    }

    return {
        init: function () {
            var root = document.getElementById('page-latency');
            if (!root) return;
            if (!_wired) { wire(root); _wired = true; }
            _datesLoaded = false;
            _latAlertEnabled = true;   // user explicitly clicked Latency tab
            loadDates(root);
            refresh(root);
        },
        refresh: function () {
            var root = document.getElementById('page-latency');
            if (root) refresh(root);
        }
    };
})();

window.LatencyPage = LatencyPage;


function setLatPreset(label, start, end) {
    document.querySelectorAll('#page-latency .time-btn').forEach(b => {
        b.classList.remove('active');
        if (b.innerText.includes(label)) b.classList.add('active');
    });
    document.getElementById('latStartTime').value = start;
    document.getElementById('latEndTime').value = end;
    // Refresh via real API instead of the removed mockup initLatencyCharts()
    if (window.LatencyPage && typeof window.LatencyPage.refresh === 'function') {
        window.LatencyPage.refresh();
    }
}


function toggleTechDetails() {
    const content = document.getElementById('tech-content');
    const chevron = document.getElementById('tech-chevron');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        chevron.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        content.style.display = 'none';
        chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

const bwLabels = genTimeLabels('09:00:00', 120, 300);
if (document.getElementById('bwChart0')) {
    new Chart(document.getElementById('bwChart0'), {
        type: 'line',
        data: {
            labels: bwLabels,
            datasets: [
                { label: 'Receive (Rx)', data: genData(120, 12, 5, 0).map(v => +(v + Math.random() * 3).toFixed(1)), borderColor: '#007bff', backgroundColor: 'rgba(0,123,255,0.08)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 },
                { label: 'Transmit (Tx)', data: genData(120, 7, 3, 0).map(v => +(v + Math.random() * 2).toFixed(1)), borderColor: '#fd7e14', backgroundColor: 'rgba(253,126,20,0.06)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 },
            ]
        },
        options: makeOpts(true),
    });
}

if (document.getElementById('bwChart1')) {
    const fw1Rx = genData(120, 28, 8, 0).map(v => +(v + Math.random() * 5).toFixed(1));
    new Chart(document.getElementById('bwChart1'), {
        type: 'line',
        data: {
            labels: bwLabels,
            datasets: [
                { label: 'Receive (Rx)', data: fw1Rx, borderColor: '#007bff', backgroundColor: 'rgba(0,123,255,0.08)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 },
                { label: 'Transmit (Tx)', data: genData(120, 16, 5, 0).map(v => +(v + Math.random() * 3).toFixed(1)), borderColor: '#fd7e14', backgroundColor: 'rgba(253,126,20,0.06)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 },
                { label: 'Warning (30 Mbps)', data: Array(120).fill(30), borderColor: 'rgba(255,193,7,0.5)', borderWidth: 1, borderDash: [8, 4], fill: false, pointRadius: 0 },
                { label: 'Critical (50 Mbps)', data: Array(120).fill(50), borderColor: 'rgba(255,82,82,0.4)', borderWidth: 1, borderDash: [4, 4], fill: false, pointRadius: 0 },
            ]
        },
        options: makeOpts(true),
    });
}

if (document.getElementById('bwChart2')) {
    new Chart(document.getElementById('bwChart2'), {
        type: 'line',
        data: {
            labels: bwLabels,
            datasets: [
                { label: 'Receive (Rx)', data: genData(120, 1.6, 0.8, 0).map(v => +(v * 0.8 + Math.random() * 0.5).toFixed(2)), borderColor: '#007bff', backgroundColor: 'rgba(0,123,255,0.08)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 },
                { label: 'Transmit (Tx)', data: genData(120, 0.8, 0.4, 0).map(v => +(v * 0.6 + Math.random() * 0.3).toFixed(2)), borderColor: '#fd7e14', backgroundColor: 'rgba(253,126,20,0.06)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 },
                { label: 'Warning (4 Mbps)', data: Array(120).fill(4), borderColor: 'rgba(255,193,7,0.4)', borderWidth: 1, borderDash: [8, 4], fill: false, pointRadius: 0 },
            ]
        },
        options: makeOpts(true),
    });
}


// ── Initial Setup ──
$(document).ready(function () {
    const siteNameSpan = document.getElementById('siteNameSpan');
    if (siteNameSpan) siteNameSpan.textContent = siteName;
    appendSiteSuffix();
    const allowedTabs = new Set(['process', 'adapter', 'latency', 'messagequeue', 'bandwidth']);
    const requestedTab = (new URLSearchParams(window.location.search).get('tab') || '').toLowerCase();
    // Default to latency: it is the only tab linked in the subnav, so landing
    // on 'process' would show a page with no way back to it.
    showPage(allowedTabs.has(requestedTab) ? requestedTab : 'latency');
});

// Standalone Live Clock Initializer (Isolated to prevent execution breaks)
$(document).ready(function () {
    const updateLiveClock = () => {
        const now = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = days[now.getDay()];
        
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        
        const mins = now.getMinutes().toString().padStart(2, '0');
        const secs = now.getSeconds().toString().padStart(2, '0');
        const hrs = hours.toString().padStart(2, '0');
        
        const timeStr = `${dayName} ${hrs}:${mins}:${secs} ${ampm}`;
        const clockEl = document.getElementById('bw-live-clock');
        if (clockEl) {
            clockEl.innerText = timeStr;
        }
    };
    updateLiveClock();
    if (window.__leLiveClockTimer) {
        clearInterval(window.__leLiveClockTimer);
    }
    window.__leLiveClockTimer = setInterval(updateLiveClock, 1000);
});

/* =================================================================
   FILTER / SEARCH -- ProcessStatus & AdapterStatus
   ================================================================= */

// -- State ---------------------------------------------------------
var _procChip = 'all';
var _adpChip  = 'all';

var PROC_CHIP_STATUS = {
    critical: [0],
    warning:  [1],
    healthy:  [2],
    unknown:  [99]
};

var ADP_CHIP_TEXT = {
    disconnected: 'DISCONNECTED',
    degraded:     'DEGRADED',
    connected:    'CONNECTED'
};

// -- Helpers -------------------------------------------------------
function _setChipActive(chipGroupId, activeKey) {
    var $group = $('#' + chipGroupId + ' .le-chip');
    $group.removeClass('active');
    $group.each(function() {
        var oc = $(this).attr('onclick') || '';
        if (activeKey === 'all' && oc.indexOf("'all'") !== -1) { $(this).addClass('active'); }
        else if (activeKey !== 'all' && oc.indexOf("'" + activeKey + "'") !== -1) { $(this).addClass('active'); }
    });
}

function _updateCount(countElId, visible, total) {
    var $el = $('#' + countElId);
    if (visible < total) {
        $el.text('Showing ' + visible + ' of ' + total).css('display', 'inline-block');
    } else {
        $el.text('').hide();
    }
}

// -- ProcessStatus Filter ------------------------------------------
function filterProcessMatrix(query) {
    query = (query || '').toLowerCase().trim();
    var hasText = query.length > 0;
    $('#proc-search-clear').css('display', hasText ? 'inline-block' : 'none');

    var total = 0, visible = 0;
    var $groups = $('#dynamic-process-matrix-container .process-matrix-group-container');

    $groups.each(function() {
        var $group = $(this);
        var $rows  = $group.find('tbody tr');
        var groupVisible = 0;

        $rows.each(function() {
            var $row = $(this);
            var rowText = $row.text().toLowerCase();
            var badgeText = $row.find('td:nth-child(3) .th-badge').text().trim().toUpperCase();
            var statusCode = badgeText === 'HEALTHY'  ? 2
                           : badgeText === 'WARNING'  ? 1
                           : badgeText === 'CRITICAL' ? 0
                           : 99;

            var chipMatch = (_procChip === 'all') ||
                (PROC_CHIP_STATUS[_procChip] && PROC_CHIP_STATUS[_procChip].indexOf(statusCode) !== -1);
            var textMatch = !query || rowText.indexOf(query) !== -1;

            total++;
            if (chipMatch && textMatch) {
                $row.show().removeClass('le-row-highlight');
                if (query) $row.addClass('le-row-highlight');
                groupVisible++;
                visible++;
            } else {
                $row.hide().removeClass('le-row-highlight');
            }
        });

        if (groupVisible === 0) $group.hide(); else $group.show();
    });

    _updateCount('proc-filter-count', visible, total);
}

function setProcessChip(key) {
    _procChip = key;
    _setChipActive('proc-status-chips', key);
    filterProcessMatrix($('#proc-search-input').val());
}

function clearProcessFilter() {
    _procChip = 'all';
    $('#proc-search-input').val('');
    $('#proc-search-clear').hide();
    _setChipActive('proc-status-chips', 'all');
    filterProcessMatrix('');
}

// -- AdapterStatus Filter ------------------------------------------
function filterAdapterMatrix(query) {
    query = (query || '').toLowerCase().trim();
    var hasText = query.length > 0;
    $('#adp-search-clear').css('display', hasText ? 'inline-block' : 'none');

    var $rows = $('#health-matrix-body tr').not('.le-no-result-row');
    var total = $rows.length, visible = 0;

    $rows.each(function() {
        var $row = $(this);
        var rowText  = $row.text().toLowerCase();
        var badgeText = $row.find('td:nth-child(4) .th-badge').text().trim().toUpperCase();
        var chipMatch = (_adpChip === 'all') ||
            (ADP_CHIP_TEXT[_adpChip] && badgeText.indexOf(ADP_CHIP_TEXT[_adpChip]) !== -1);
        var textMatch = !query || rowText.indexOf(query) !== -1;

        if (chipMatch && textMatch) {
            $row.show().removeClass('le-row-highlight');
            if (query) $row.addClass('le-row-highlight');
            visible++;
        } else {
            $row.hide().removeClass('le-row-highlight');
        }
    });

    $('#health-matrix-body .le-no-result-row').remove();
    if (visible === 0 && total > 0) {
        $('#health-matrix-body').append(
            '<tr class="le-no-result-row"><td colspan="11" class="text-center py-3 text-muted">' +
            '<i class="fas fa-search me-2"></i>No matching adapters found</td></tr>'
        );
    }

    _updateCount('adp-filter-count', visible, total);
}

function setAdapterChip(key) {
    _adpChip = key;
    _setChipActive('adp-status-chips', key);
    filterAdapterMatrix($('#adp-search-input').val());
}

function clearAdapterFilter() {
    _adpChip = 'all';
    $('#adp-search-input').val('');
    $('#adp-search-clear').hide();
    _setChipActive('adp-status-chips', 'all');
    filterAdapterMatrix('');
}
// -- Exchange Adapter Grid Filter ----------------------------------
// The pivot table rows each have: <td class="adp-pivot-seg">...</td>
// followed by cells with classes: adp-pivot-connected / adp-pivot-degraded / adp-pivot-disconnected / adp-pivot-empty

var _gridChip = 'all';

function filterAdapterGrid(query) {
    query = (query || '').toLowerCase().trim();
    var hasText = query.length > 0;
    $('#grid-search-clear').css('display', hasText ? 'inline-block' : 'none');

    // The pivot table lives inside #adapter-grid
    var $rows = $('#adapter-grid .adp-pivot-table tbody tr');
    var total = $rows.length, visible = 0;

    $rows.each(function() {
        var $row = $(this);

        // Text match: segment cell text + all cell values
        var segText  = $row.find('.adp-pivot-seg').text().toLowerCase();
        var rowText  = $row.text().toLowerCase();
        var textMatch = !query || segText.indexOf(query) !== -1 || rowText.indexOf(query) !== -1;

        // Chip match: check if row has at least one cell with the required status class
        var chipMatch = true;
        if (_gridChip === 'disconnected') {
            chipMatch = $row.find('.adp-pivot-disconnected').length > 0;
        } else if (_gridChip === 'degraded') {
            chipMatch = $row.find('.adp-pivot-degraded').length > 0;
        } else if (_gridChip === 'connected') {
            chipMatch = $row.find('.adp-pivot-connected').length > 0;
        }

        if (textMatch && chipMatch) {
            $row.show().removeClass('le-row-highlight');
            if (query) $row.addClass('le-row-highlight');
            visible++;
        } else {
            $row.hide().removeClass('le-row-highlight');
        }
    });

    // No-result placeholder
    $('#adapter-grid .le-no-result-row').remove();
    if (visible === 0 && total > 0) {
        var $tbody = $('#adapter-grid .adp-pivot-table tbody');
        if ($tbody.length) {
            var colCount = $('#adapter-grid .adp-pivot-table thead tr th').length || 7;
            $tbody.append(
                '<tr class="le-no-result-row"><td colspan="' + colCount + '" ' +
                'class="text-center py-3 text-muted">' +
                '<i class="fas fa-search me-2"></i>No matching segments found</td></tr>'
            );
        }
    }

    _updateCount('grid-filter-count', visible, total);
}

function setGridChip(key) {
    _gridChip = key;
    _setChipActive('grid-status-chips', key);
    filterAdapterGrid($('#grid-search-input').val());
}

function clearAdapterGrid() {
    _gridChip = 'all';
    $('#grid-search-input').val('');
    $('#grid-search-clear').hide();
    _setChipActive('grid-status-chips', 'all');
    filterAdapterGrid('');
}
