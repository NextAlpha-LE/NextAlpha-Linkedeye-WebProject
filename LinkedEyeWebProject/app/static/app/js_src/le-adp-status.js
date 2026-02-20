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

    // Action handlers managed via ASPage object in HTML onclick events

    // Automatically trigger WebSocket connection
    if (typeof connectAdpWebSocket === 'function') {
        connectAdpWebSocket(websocketurl, params.get("site"), 0, Math.random().toString(36).substring(2, 5));
    }
})
function refreshBODEOD() {
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'ADP' }, "GET").done(function (response) {
        allAdpData = response;
        if (typeof switchSubsite === 'function') {
            switchSubsite(activeSubsite);
        } else if (typeof adpdisplaykeys === 'function')
            adpdisplaykeys(response.responseData[0], response.refreshedsite)
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
            if (Array.isArray(data)) {
                data.forEach(item => {
                    let p = getPriorityValue(item.status);
                    if (p > highestPriority) {
                        highestPriority = p;
                        winningStatus = item.status;
                    }
                });
            } else if (typeof data === 'object') {
                Object.values(data).forEach(subData => {
                    if (Array.isArray(subData)) {
                        subData.forEach(item => {
                            let p = getPriorityValue(item.status);
                            if (p > highestPriority) {
                                highestPriority = p;
                                winningStatus = item.status;
                            }
                        });
                    } else if (subData && typeof subData.status !== 'undefined') {
                        let p = getPriorityValue(subData.status);
                        if (p > highestPriority) {
                            highestPriority = p;
                            winningStatus = subData.status;
                        }
                    }
                });
            }
        }
    });
    return winningStatus;
}

function renderSubsiteTabs() {
    if (assignedSubsites.length === 0) {
        $('#subsite-tabs-row').hide();
        return;
    }

    if (!allAdpData || !allAdpData.responseData || allAdpData.responseData.length === 0) {
        console.warn('renderSubsiteTabs - No data available for rendering tabs yet.');
        return;
    }

    $('#subsite-tabs-row').show();
    let tabList = $('#subsite-tabs');
    tabList.empty();

    let originalKeys = allAdpData.responseData[0].site_data;
    //console.log('renderSubsiteTabs - Rendering tabs for ' + assignedSubsites.length + ' subsites. Total keys:', originalKeys.length);

    // Calculate status for "Others"
    let otherKeys = originalKeys.filter(keyObj => {
        let key = keyObj.key;
        let parts = key.split(':');
        if (parts.length > 1) {
            let secondPart = parts[1].toLowerCase();
            let isAssigned = assignedSubsites.some(s => {
                let sLower = s.toLowerCase();
                return secondPart.split(/[-_]/).some(part => part === sLower);
            });
            return !isAssigned;
        }
        return true;
    });
    let otherStatus = calculateSubsiteStatus(otherKeys);
    let otherColor = getPriorityColor(otherStatus);

    tabList.append(`
        <li class="nav-item">
            <a class="nav-link ${activeSubsite === 'Others' ? 'active bold-text' : 'bold-text'}" 
               style="color: ${otherColor} !important; background-color: ${activeSubsite === 'Others' ? '#2a2a2a' : 'transparent'} !important; border-radius: 8px 8px 0 0;" 
               href="#" onclick="switchSubsite('Others')">LE</a>
        </li>
    `);

    assignedSubsites.forEach(subsite => {
        let subsiteKeys = originalKeys.filter(keyObj => {
            let key = keyObj.key;
            let parts = key.split(':');
            if (parts.length > 1) {
                let secondPart = parts[1].toLowerCase();
                let subsiteLower = subsite.toLowerCase();
                return secondPart.split(/[-_]/).some(part => part === subsiteLower);
            }
            return false;
        });
        let status = calculateSubsiteStatus(subsiteKeys);
        let color = getPriorityColor(status);

        tabList.append(`
            <li class="nav-item">
                <a class="nav-link ${activeSubsite === subsite ? 'active bold-text' : 'bold-text'}" 
                   style="color: ${color} !important; background-color: ${activeSubsite === subsite ? '#2a2a2a' : 'transparent'} !important; border-radius: 8px 8px 0 0;" 
                   href="#" onclick="switchSubsite('${subsite}')">${subsite.toUpperCase()}</a>
            </li>
        `);
    });
}

function switchSubsite(subsite) {
    activeSubsite = subsite;
    renderSubsiteTabs();

    if (!allAdpData || !subsiteDataReady) return;

    var originalObj = allAdpData.responseData[0];
    let filteredObj = JSON.parse(JSON.stringify(originalObj));

    if (subsite === 'Others') {
        filteredObj.site_data = filteredObj.site_data.filter(keyObj => {
            let key = keyObj.key;
            //console.log("key--->" + key)
            let parts = key.split(':');
            if (parts.length > 1) {
                let secondPart = parts[1].toLowerCase();
                // Check if any subsite name appears as a substring in the key's second part
                let isAssigned = assignedSubsites.some(s => {
                    let sLower = s.toLowerCase();
                    return secondPart.includes(sLower);
                });
                return !isAssigned;
            }
            return true;
        });
    } else {
        filteredObj.site_data = filteredObj.site_data.filter(keyObj => {
            let key = keyObj.key;
            let parts = key.split(':');
            if (parts.length > 1) {
                let secondPart = parts[1].toLowerCase();
                let subsiteLower = subsite.toLowerCase();
                // Match the subsite name as a substring
                return secondPart.includes(subsiteLower);
            }
            return false;
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

                    var iframe_url = `${analytics_Prefix_URL}d/${dashboard_uid}/${slug_name}?from=${sevenDaysAgo}&to=${now}&timezone=browser&orgId=1&kiosk=1`;

                    if (db_name === 'Process Connection Details' && $('#grafana-process-details').length) {
                        $('#grafana-process-details').html(`<iframe src="${iframe_url}" style="width:100%;height:350px;border:none;background:white"></iframe>`);
                    } else if (db_name === 'App view' && $('#grafana-app-view').length) {
                        $('#grafana-app-view').html(`<iframe src="${iframe_url}" style="width:100%;height:350px;border:none;background:white"></iframe>`);
                    }

                    db_name = db_name.replaceAll(' ', '')
                    proc_html += (`
                        <tr class="collapse-tr parent row" style="background-color:#1f1f1f" id="${db_name}_row">
                            <td class="col-10">
                                <a data-toggle="collapse" class="accordion-toggle row" href="#${db_name}_iframe-data">
                                    <h4 class="card-titles" style="margin-left: 10px; margin-top: 3px;"> ${db_name}</h4>
                                </a>
                            </td>
                        </tr>
                        <tr class="border-0 collapse-content row" id="child-${db_name}_row">
                            <td colspan="12" style='width:100%'>
                                <div class="accordian-body col-12 border-b collapse" id="${db_name}_iframe-data" style="border: 1px;">
                                    <iframe class="iframe-elem" id="${db_name}_iframe" 
                                                    src="${iframe_url}" frameBorder="0" 
                                                    style="width:100%; height:450px; background-color:#ffffff">
                                    </iframe>
                                </div>
                            </td>
                        </tr>
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
            <table class="row">
                <tbody class="col-12" id="mob-width">
                    ${proc_html}
                </tbody>
            </table>
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
        renderAdapterDashboard();
    }
    if ($('#page-process').is(':visible')) {
        renderProcessDashboard();
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
            outkeyHtml += '<div class="row py-2 site-keys" id="' + adpsiteData.site + '">'
            outkeyHtml += '<div class="col-12">'
            outkeyHtml += '<table class="row">'
            outkeyHtml += '<tbody class="col-12" id="mob-width">'
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
                    keyHtml += '<tr class="collapse-tr parent row" style="background-color:#1f1f1f;visibility:hidden;height:0px" id="' + obj.key + '">'
                    --isfirst;
                } else {
                    keyHtml += '<tr class="collapse-tr parent row" style="background-color:#1f1f1f" id="' + obj.key + '">'
                }
                keyHtml += '<td class="col-10">'
                keyHtml += ' <a data-toggle="collapse" class="accordion-toggle row" href="#' + divId.replaceAll('/', '_') + '-data' + '">'
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
                keyHtml += '<td>'
                //keyHtml +=                       '<td class="col-2 action-btn float-right text-right">'
                //  keyHtml +=                            '<button class="btn btn-default btn-ripple accordion-toggle ml-2" data-toggle="collapse" data-target="#'+divId+'-data'+'">'
                //  keyHtml +=                                '<i class="icon-select"></i>'
                //   keyHtml +=                            '</button>'
                keyHtml += ' </a>'
                keyHtml += ' </td>'
                keyHtml += '</tr>'
                if (obj.key == "ADP:ADP_UPDATED_DATA") {
                    keyHtml += '<tr class="border-0 collapse-content row" id="child-' + obj.key.replace(/[/:.]/g, '_') + '" style="visibility:hidden;height:1px;display:block" >'
                } else {
                    keyHtml += '<tr class="border-0 collapse-content row" id="child-' + obj.key.replace(/[/:.]/g, '_') + '" >'
                }
                keyHtml += '<td colspan="12" class="hiddenRow border-0 p-0 col-12">'
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
                keyHtml += '</td>'
                keyHtml += '</tr>'
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
            outkeyHtml += '</tbody>'
            outkeyHtml += '</table>'
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
            stompClient.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
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

const EXCHANGE_MAP = {
    'NSE': { name: 'NATIONAL STOCK EXCHANGE', color: '#ff5252' },
    'NFO': { name: 'NSE FUTURES & OPTIONS', color: '#ffb347' },
    'BSE': { name: 'BOMBAY STOCK EXCHANGE', color: '#4caf50' },
    'BFO': { name: 'BSE FUTURES & OPTIONS', color: '#b388ff' },
    'CDS': { name: 'CURRENCY DERIVATIVES', color: '#00bcd4' },
    'SLBM': { name: 'STOCK LENDING & BORROWING', color: '#ffeb3b' }
};

function renderAdapterDashboard() {
    console.log('--- renderAdapterDashboard Refined ---');
    if (!allAdpData || !allAdpData.responseData || allAdpData.responseData.length === 0) return;

    const siteObj = allAdpData.responseData[0];
    const siteData = siteObj.site_data;

    // 1. Filtering and Data Extraction
    let totalAdapters = 0;
    let connected = 0;
    let degraded = 0;
    let disconnected = 0;
    let latencies = [];
    let msgRates = [];

    const exchangeGroups = {}; // { exchangeCode: [items] }
    let matrixRows = [];

    siteData.forEach(obj => {
        // Filter: Only process keys that contain AdapterStatus, ignore ProcessStatus etc.
        if (!obj.key.includes('AdapterStatus')) return;

        const keyData = obj.key_data;
        if (!keyData || !keyData.data) return;

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
                        label: segment.toUpperCase(),
                        status: status,
                        ctcl_id: exchItem.ctcl_id,
                        value: exchItem.value
                    });

                    // For the health matrix table collection
                    matrixRows.push({
                        label: `${segment.toUpperCase()} - ${exchCode}`,
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
                    label: (item.segment || 'Unknown').toUpperCase(),
                    status: status,
                    ctcl_id: item.ctcl_id,
                    value: item.value
                });

                // For the health matrix table collection
                matrixRows.push({
                    label: (item.segment || 'ADAPTER').toUpperCase(),
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
                <td style="color:var(--accent);font-weight:600">${row.label}</td>
                <td style="font-size:10px;opacity:0.7">${row.type}</td>
                <td><span class="th-badge" style="background:${statusColor}22;color:${statusColor}">${statusText}</span></td>
                <td>${row.ctcl_id}</td>
                <td>${row.value}</td>
                <td>${row.heartbeat}</td>
                <td>${row.last_msg}</td>
                <td>${row.msg_rate}</td>
                <td style="color:var(--cyan)">${row.latency} ms</td>
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
    let adpExecutedOn = '--';
    if (allAdpData && allAdpData.responseData && allAdpData.responseData.length > 0) {
        let adpObj = allAdpData.responseData[0].site_data.find(o => o.key.includes('AdapterStatus'));
        if (adpObj && adpObj.key_data && adpObj.key_data.executedOn) {
            adpExecutedOn = formatTimestampWithDay(adpObj.key_data.executedOn);
        }
    }
    $('#stat-adp-executed').text(adpExecutedOn);

    // Latency & Message Rate
    let avgLat = latencies.length ? (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2) : '--';
    $('#stat-avg-latency').text(avgLat + (avgLat !== '--' ? ' ms' : ''));

    let totalMsgRate = msgRates.length ? msgRates.reduce((a, b) => a + b, 0).toFixed(0) : '--';
    $('#stat-msg-rate').text(totalMsgRate);

    // 3. Populate Matrix Table
    if (matrixHtml) {
        $('#health-matrix-body').html(matrixHtml);
    } else {
        $('#health-matrix-body').html('<tr><td colspan="10" class="text-center py-4 text-muted">No adapter data found</td></tr>');
    }

    // 4. Dynamic Exchange Grid
    let gridHtml = '';
    const sortedExchanges = Object.keys(exchangeGroups).sort();

    if (sortedExchanges.length === 0) {
        gridHtml = '<div class="col-12 py-4 text-center text-muted">No exchange information found in data</div>';
    } else {
        sortedExchanges.forEach(exchCode => {
            const items = exchangeGroups[exchCode];
            // Sort segments within the exchange: Disconnected (0) -> Degraded (1) -> Connected (2)
            items.sort((a, b) => a.status - b.status);

            const meta = EXCHANGE_MAP[exchCode] || { name: exchCode + ' EXCHANGE', color: '#999' };
            const count = items.length;

            let segmentsHtml = '<div class="segment-grid">';
            items.forEach(item => {
                let color = getPriorityColor(item.status);
                segmentsHtml += `
                    <div class="seg-badge" style="border-color:${color}44">
                        <div class="seg-header">
                            <span class="dot" style="background:${color}"></span>
                            <span class="name">${item.label}</span>
                        </div>
                        <div class="details">
                            <span>ID: ${item.ctcl_id || '--'}</span>
                            <span>VAL: ${item.value || '--'}</span>
                        </div>
                    </div>`;
            });
            segmentsHtml += '</div>';

            gridHtml += `
                <div class="col-12 mb-4">
                    <div class="le-card" style="border-top: 3px solid ${meta.color}">
                        <div class="le-card-header">
                            <div class="le-card-title">${exchCode} <span class="badge" style="background:${meta.color}22;color:${meta.color}">${meta.name}</span></div>
                            <div class="text-muted small">${count} segments</div>
                        </div>
                        <div class="py-3 px-3">${segmentsHtml}</div>
                    </div>
                </div>
            `;
        });
    }
    $('#adapter-grid').html(gridHtml);

    // 5. Heartbeat Chart
    renderHeartbeatChart();
}

function renderHeartbeatChart() {
    const canvas = document.getElementById('heartbeatChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const labels = [];
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 15000);
        labels.push(d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0') + ':' + d.getSeconds().toString().padStart(2, '0'));
    }

    if (heartbeatChart) heartbeatChart.destroy();

    // Mock data for heartbeat intervals - in production this would be tracked from arrivals
    const mockData = Array.from({ length: 21 }, () => (Math.random() * 0.4 + 0.1).toFixed(2));

    heartbeatChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Heartbeat Interval (s)',
                data: mockData,
                borderColor: '#e99123',
                backgroundColor: 'rgba(233, 145, 35, 0.05)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                pointBackgroundColor: '#e99123'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(18,18,18,0.9)',
                    titleColor: '#999',
                    bodyColor: '#e99123',
                    borderColor: '#333',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    ticks: { color: '#555', font: { size: 8 }, maxRotation: 0 },
                    grid: { color: 'rgba(255,255,255,0.02)' }
                },
                y: {
                    min: 0,
                    max: 1,
                    ticks: { color: '#555', font: { size: 9 }, stepSize: 0.2 },
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

function renderProcessDashboard() {
    console.log('--- renderProcessDashboard ---');
    if (!allAdpData || !allAdpData.responseData || allAdpData.responseData.length === 0) return;

    const siteObj = allAdpData.responseData[0];
    const siteData = siteObj.site_data;

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

        const keyData = obj.key_data;
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

            // Use item.segment if available, else derive from key or use 'SYSTEM'
            let segment = (item.segment || obj.key.split(':')[1] || 'SYSTEM').toUpperCase();
            if (segment.startsWith('ADP_')) segment = segment.substring(4);
            if (segment.endsWith('STATUS')) segment = segment.substring(0, segment.length - 6);

            let pName = item.name || item.process_name || 'Process';
            let pId = item.pid || item.process_id || '--';
            let cpu = typeof item.cpu_percent !== 'undefined' ? item.cpu_percent.toFixed(2) : (item.cpu_usage || '--');
            let mem = typeof item.memory_percent !== 'undefined' ? item.memory_percent.toFixed(2) + '%' : (item.memory_usage || '--');

            if (!processGroups[segment]) processGroups[segment] = [];
            processGroups[segment].push({
                label: pName,
                status: status,
                id: pId,
                val: cpu // Using CPU as the "VAL" to match adapter format
            });

            matrixRows.push({
                label: pName,
                id: pId,
                status: status,
                cpu: cpu,
                memory: mem,
                io_read: item.io_read || '--',
                io_write: item.io_write || '--',
                uptime: item.uptime || '--',
                last_updated: item.last_updated || item.executedOn || '--'
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
    $('#stat-proc-executed').text(lastExecutedOn);

    // Update Grid HTML
    let gridHtml = '';
    Object.keys(processGroups).forEach(seg => {
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
    matrixRows.sort((a, b) => a.status - b.status);
    let matrixHtml = '';
    matrixRows.forEach(row => {
        let statusColor = getPriorityColor(row.status);
        let statusText = row.status === 2 ? 'HEALTHY' : (row.status === 1 ? 'WARNING' : (row.status === 0 ? 'CRITICAL' : 'UNKNOWN'));
        matrixHtml += `
            <tr>
                <td style="color:var(--accent);font-weight:600">${row.label}</td>
                <td>${row.id}</td>
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
    $('#process-matrix-body').html(matrixHtml || '<tr><td colspan="9" class="text-center py-4 text-muted">No data available.</td></tr>');

    // Update Annotations Dropdown
    let annoOptions = '<option value="">Select process...</option>';
    matrixRows.forEach(row => {
        annoOptions += `<option value="${row.label}">${row.label} (${row.id})</option>`;
    });
    $('#annoProcSelect').html(annoOptions);

    // Initialize/Update Timeline Chart
    renderProcessTimelineChart(matrixRows);
}

let processTimelineChartInstance = null;
function renderProcessTimelineChart(rows) {
    const ctx = document.getElementById('processTimelineChart');
    if (!ctx) return;

    // Filter to top 5 most critical or interesting processes for the timeline
    const topProcesses = rows.slice(0, 5);
    const labels = Array.from({ length: 12 }, (_, i) => `${(i * 5)}m ago`).reverse();

    const datasets = topProcesses.map((proc, idx) => {
        let color = getPriorityColor(proc.status);
        // Fake historical data based on current status
        const data = Array.from({ length: 12 }, () => (proc.status === 2 ? 100 : (proc.status === 1 ? 50 : 10)));
        return {
            label: proc.label,
            data: data,
            borderColor: color,
            borderWidth: 2,
            pointRadius: 3,
            fill: false,
            tension: 0
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
                x: { ticks: { color: '#666', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.02)' } },
                y: { min: 0, max: 110, ticks: { display: false }, grid: { display: false } }
            },
            plugins: {
                legend: { position: 'top', labels: { color: '#999', font: { size: 9 }, boxWidth: 10 } }
            }
        }
    });
}
