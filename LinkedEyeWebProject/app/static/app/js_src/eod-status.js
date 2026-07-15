var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
redisKeys = [];
var eodFinalStatus = '';
var connectionTries = 6;
var isWSConnected = false;
var siteHtml = ' '
var eodSiteResponse
var eodSitesData = [];
var eodResponse;
var colorClass = 'white' //green
var firsteodtableid = ''
var totaleodlen = 0;
var operationsCompletedeod = 0;
var export_eodExcel = false;
var checkeodbx = ''
var open_rows = true;
var user_name = '';
var changed_key = '';
//console.log('PARAMS--->' + params)
var isEdit_dict = {}
var currentUserId = null;
var assignedSubsites = [];
var activeSubsite = 'Others';
var allEodData = null;
var subsiteDataReady = false;
$(document).ready(function () {
    if (pageName === "Dashboard")
        $("#new-label").css('display', localStorage.getItem("newlabeldisplay"))
    else
        localStorage.setItem("newlabeldisplay", "none");
    $("#eod-status #table-view").hide();
    profilename()
    geteodSiteList()
    var btn = $(".playpause");
    btn.click(function () {
        btn.toggleClass("paused");
        var plpsText = $("#plps-text");
        /*console.log('INSIDE click')
        console.log('classes--->' + $('.playpause').attr('class').split(/\s+/))
        console.log('Has Puased? --->' + btn.hasClass("paused"))*/
        if (btn.hasClass("paused")) {
            //console.log('Update Paused')
            plpsText.text("Update Paused");
            open_rows = false
            $(".playpause-div").css('border', '2px solid #ff3d57')
        } else {
            //console.log('Update Live')
            refreshBODEOD()

            plpsText.text("Live Update");
            open_rows = true
            $(".playpause-div").css('border', '2px solid #16d39a')
        }
        return false;
    });
})
function refreshBODEOD() {
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'EOD' }, "GET").done(function (response) {
        //  console.log('INSIDE MESSAGE REQUEST----->' + JSON.stringify(response))
        allEodData = response;
        if (typeof switchSubsite === 'function') {
            switchSubsite(activeSubsite);
        } else if (typeof eoddisplaykeys === 'function')
            eoddisplaykeys(response.responseData[0], response.refreshedsite)
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

function exporteodtable() {
    export_eodExcel = true;
    /*requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'EOD' }, "GET").done(function (response) {
        eoddisplaykeys(response.responseData[0], response.refreshedsite)
    })*/
    $("#" + firsteodtableid).find('.buttons-excel').click()
};
function geteodHeaderNames(table) {
    // Gets header names.
    //params:
    //  table: table ID.
    //Returns:
    //  Array of column header names.
    // console.log('TABLE geteodHeaderNames--->' + table)
    //  console.log('($(table).find("#data"))--->' + ($(table).find("#data")))
    var header = ($(table).find("#data")).DataTable().columns().header().toArray();
    // console.log('header---->' + header)
    var names = [];
    header.forEach(function (th) {
        names.push($(th).html());
    });

    return names;
}

function buildeodCols(data) {
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

function buildeodRow(data, rowNum, styleNum) {
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

function geteodTableData(table, title) {
    // Processes Datatable row data to build sheet.
    //Params:
    //  table: table ID.
    //  title: Title displayed at top of SS or empty str for no title.
    //Returns:
    //  String of XML formatted worksheet.
    // console.log('geteodTableData \ntable BEFORE--->' + table + '\n title-' + title)
    var header = geteodHeaderNames(table);
    // console.log('geteodTableData table AFTER--->' + table+' title-'+title)
    var table = $(table).find("#data").DataTable();
    var rowNum = 1;
    var mergeCells = '';
    var ws = '';

    ws += buildeodCols(header);
    ws += '<sheetData>';

    if (title.length > 0) {
        ws += buildeodRow([title], rowNum, 51);
        rowNum++;

        mergeCol = ((header.length - 1) + 10).toString(36).toUpperCase();

        mergeCells = '<mergeCells count="1">' +
            '<mergeCell ref="A1:' + mergeCol + '1"/>' +
            '</mergeCells>';
    }

    ws += buildeodRow(header, rowNum, 2);
    rowNum++;

    // Loop through each row to append to sheet.    
    table.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var data = this.data();

        // If data is object based then it needs to be converted 
        // to an array before sending to buildeodRow()
        ws += buildeodRow(data, rowNum, '');

        rowNum++;
    });

    ws += '</sheetData>' + mergeCells;

    return ws;

}

function seteodSheetName(xlsx, name) {
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

function addeodSheet(xlsx, table, title, name, sheetId) {
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
    //  console.log('INSIDE addeodSheet--->')
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
        geteodTableData(table, title) +

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

function Exporteodmultiplesheets() {
    //console.log('<---INSIDE EXPORT MULTIPLE SHEETS - EOD--->')
    const parent = document.getElementById('mob-width');
    //  console.log('parent.childElementCount---->' + parent.childElementCount)
    if (parent != null && parent != undefined) {
        const children = Array.from(parent.children);
        children.shift();
        children.shift();
        if (children.length < 2) return;
        const ids = children.map(element => {
            return element.id;
        });
        //  console.log('ids array before----> ' + ids[1])
        firsteodtableid = (ids[1].split("child-")[1]) + '-data'
        var firsttablename = '';
        if (ids[1].includes('EOD-')) {
            firsttablename = ids[0].split("EOD-")[1]
        } else {
            firsttablename = ids[0].split("EOD_")[1]
        }
        var j = 0;
        $('#' + firsteodtableid).find("#data").DataTable({
            dom: 'Bfrtip',
            "pageLength": 100,
            "ordering": false,
            buttons: [
                {
                    extend: 'excel',
                    title: 'EOD',
                    customize: function (xlsx) {
                        seteodSheetName(xlsx, firsttablename);
                        for (let i = 3; i < ids.length; i++) {
                            if (i > 2 && ids[i].includes('child-')) {
                                var childid = (ids[i].split("child-")[1]) + '-data'
                                if (ids[i].includes('EOD-')) {
                                    tablename = ids[i].split("EOD-")[1]
                                } else {
                                    tablename = ids[i].split("EOD_")[1]
                                }
                                addeodSheet(xlsx, '#' + childid, tablename, tablename, (i - 1).toString());
                                j++;
                            }
                        }
                    }
                }

            ],

        });
        totaleodlen = ids.length;
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
                            title: 'EOD',
                        }
                    ],
                });
                operationsCompletedeod = k;
                // operationeod()
            }
        }
    }
}


function operationeod() {
    ++operationsCompletedeod;
    if (operationsCompletedeod === totaleodlen) {
        $("#" + firsteodtableid).find('.buttons-excel').click()
        export_eodExcel = false;
    }
}

function geteodSiteList() {
    showLoader("eod-status")
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            eodSiteResponse = res.data;
            initSubsiteConcept();
            geteodkeys();
        }
        else
            stopLoader("eod-status")
    });
}

function initSubsiteConcept() {
    requestDataFromServer('/useronboard/getcurrentuser', {}, "GET").done(function (response) {
        let res = typeof response === "string" ? JSON.parse(response) : response;
        if (res.status === 200) {
            currentUserId = res.data.id;
            // Fetch assigned subsites for this user and site
            let siteId = eodSiteResponse[0].id;
            requestDataFromServer('/useronboard/getsubsitedata', { mode: 'user_site', userId: currentUserId, siteId: siteId, csrfmiddlewaretoken: csfr_token }, "POST").done(function (subsiteRes) {
                let sRes = typeof subsiteRes === "string" ? JSON.parse(subsiteRes) : subsiteRes;
                if (sRes.status === 200) {
                    let siteName = eodSiteResponse[0].sitename;
                    assignedSubsites = sRes.data[siteName] || [];
                    //console.log('initSubsiteConcept - Assigned Subsites for ' + siteName + ':', assignedSubsites);
                    renderSubsiteTabs();
                    subsiteDataReady = true;
                    if (allEodData) {
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
    if (!allEodData || !allEodData.responseData || allEodData.responseData.length === 0) return;

    $('#subsite-tabs-row').show();
    let tabList = $('#subsite-tabs');
    tabList.empty();

    let originalKeys = allEodData.responseData[0].site_data;

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
    let otherStatusClass = getEodSubsiteStatusClass(otherStatus);
    let otherActiveClass = activeSubsite === 'Others' ? ' active' : '';

    tabList.append(
        '<li class="nav-item">' +
        '<a class="nav-link bold-text' + otherStatusClass + otherActiveClass + '" ' +
        'style="color: ' + (activeSubsite === 'Others' ? '#fff' : getPriorityColor(otherStatus)) + ' !important;" ' +
        'href="#" onclick="switchSubsite(\'Others\')">LE</a>' +
        '</li>'
    );

    assignedSubsites.forEach(function(subsite) {
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
        let statusClass = getEodSubsiteStatusClass(status);
        let activeClass = activeSubsite === subsite ? ' active' : '';
        let color = getPriorityColor(status);

        tabList.append(
            '<li class="nav-item">' +
            '<a class="nav-link bold-text' + statusClass + activeClass + '" ' +
            'style="color: ' + (activeSubsite === subsite ? '#fff' : color) + ' !important;" ' +
            'href="#" onclick="switchSubsite(\'' + subsite + '\')">' + subsite.toUpperCase() + '</a>' +
            '</li>'
        );
    });
}

function getEodSubsiteStatusClass(status) {
    if (status === 0) return ' status-red';
    if (status === 1) return ' status-orange';
    if (status === 2) return ' status-green';
    return '';
}

// EOD Tab Switcher — uses bod-tab-* classes (from bodeod_style.css)
function eodSwitchTab(panelId, clickedLink) {
    document.querySelectorAll('.eod-tab-panel').forEach(function(p) { p.style.display = 'none'; });
    document.querySelectorAll('#eod-tab-nav-list .bod-tab-link').forEach(function(a) { a.classList.remove('bod-tab-active'); });
    var panel = document.getElementById(panelId);
    if (panel) panel.style.display = 'block';
    if (clickedLink) {
        clickedLink.classList.add('bod-tab-active');
        var label = clickedLink.childNodes[0] ? clickedLink.childNodes[0].textContent.trim() : '';
        var sep = document.getElementById('eod-active-sep');
        var tab = document.getElementById('eod-active-tab');
        if (tab) tab.textContent = label;
        if (sep) sep.style.display = label ? '' : 'none';
    }
    if (typeof feather !== 'undefined') feather.replace();
}

function switchSubsite(subsite) {
    activeSubsite = subsite;
    renderSubsiteTabs();

    if (!allEodData) return;
    // If no subsites assigned, render directly without waiting for subsiteDataReady
    if (assignedSubsites.length === 0) {
        eoddisplaykeys(allEodData.responseData[0], selectedsite);
        return;
    }
    if (!subsiteDataReady) return;
    var originalObj = allEodData.responseData[0];
    let filteredObj = JSON.parse(JSON.stringify(originalObj));

    if (subsite === 'Others') {
        filteredObj.site_data = filteredObj.site_data.filter(keyObj => {
            let key = keyObj.key;
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
    eoddisplaykeys(filteredObj, selectedsite);
}
function geteodkeys() {
    // console.log('GETEODKEYS')
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'EOD' }, "GET").done(eodkeysResponse)

}
function eodkeysResponse(response) {
    allEodData = response;
    const eodkeys = Math.random().toString(36).substring(2, 5);
    if (response == undefined)
        return;
    eodResponse = response.responseData;
    stopLoader("eod-status")
    if (response.responseData.length > 0) {
        renderSubsiteTabs();
        // Set selectedsite before rendering
        if (selectedsite === ' ' && response.responseData.length > 0) {
            selectedsite = response.refreshedsite || response.responseData[0].site;
        }
        // Render directly — initSubsiteConcept will re-render with subsite filter if needed
        eoddisplaykeys(response.responseData[0], selectedsite);
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
            eodSitesData.push(siteTempObj)
            var tempSiteObj = eodSiteResponse[0] //.filter(x => x.sitename === siteTempObj['site'])[0]
            connectEodWebSocket(tempSiteObj.websocket_url, siteTempObj['site'], 0, eodkeys)
        });
        var sSitehtml = ''
        var fSitehtml = ''
        $("#eod-status #site-list").empty()
        siteFailCount = 0;
        eodSitesData.forEach(function (obj) {
            if (obj.isSuccess) {
                //sSitehtml += '<div class="page-header"><li class="page-title" id="' + obj.site + '_li" style="position: relative;">' + obj.site +'<h3 class="page-title"> > BOD EOD Status </h3></li></div>'
                sSitehtml += '<div class="page-header"> ' + obj.site + ' &ensp;>&ensp; <h3 class="page-title"> eod Status </h3></div>'
            }
            else {
                siteFailCount++;
                //fSitehtml += '<div class="page-header"><li class="page-title" id="' + obj.site + '_li" style="position: relative;"> ' + obj.site +'<h3 class="page-title" > >  BOD EOD Status </h3></li> </div>'
                fSitehtml += '<div class="page-header"> ' + obj.site + ' &ensp;>&ensp; <h3 class="page-title" > eod Status </h3></div>'
            }
        });
        if (siteFailCount != 0)
            eodFinalStatus = 'Failure'
        else
            eodFinalStatus = 'Success'
        $("#eodstatus").html(eodFinalStatus)
        eodFinalStatus == 'Failure' ? $("#eodstatus").removeClass("green").addClass('red') : $("#eodstatus").removeClass("red").addClass('green')
        // eodFinalStatus == 'Failure' ? $("#eodLED").removeClass("green").addClass('red') : $("#eodLED").removeClass("red").addClass('green')
        $("#eod-status #site-list").append(fSitehtml);
        $("#eod-status #site-list").append(sSitehtml);
        $("#eod-status #site-list li a").eq(0).addClass('active');
        if ($("#eod-status #site-list li a").eq(0).data()) {
            selectedsite = $("#eod-status #site-list li a").eq(0).data().id
        }
        else {
            if (selectedsite && eodSitesData.length > 0)
                selectedsite = eodSitesData[0].site
        }
        // var obj = eodResponse[0] //.filter(x => x.site === selectedsite)[0]
        // eoddisplaykeys(obj, selectedsite)

    }
    else {
        $("#eod-status #site-data").css('display', 'none');
        $("#eod-status #eod-status-nodata").css('display', 'block');
        $("#eod-status-nodata #nodatamessage").text('No Data');
        $("#eod-status #eod-status-expand").css('display', 'none');
    }
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
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'EOD' }, "GET").done(function (response) {
                            //  console.log('INSIDE MESSAGE REQUEST----->' + JSON.stringify(response))
                            if (typeof eoddisplaykeys === 'function')
                                eoddisplaykeys(response.responseData[0], response.refreshedsite)
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

function eoddisplaykeys(siteData, refreshedsite) {
    isEdit_dict = {}
    // console.log('EOD eoddisplaykeys - siteData--->' + siteData + ' resfreshedsite--->' + refreshedsite)
    if (open_rows) {
        // Use a shallow copy to avoid polluting the original data when switching tabs
        let displayData = [...siteData.site_data];

        keyFailCount = 0
        keyGreenCount = 0
        keyBlueCount = 0
        keyOrangeCount = 0
        keyWhiteCount = 0
        const first_data = {
            key: 'EOD:EOD_UPDATED_DATA',
            key_data: {
                overallStatus: true,
                status: 2,
                type: 'table',
                data: [
                    {
                        segment: 'Eod enable with live updates',
                        isSuccess: true,
                        status: 2,
                    },
                ],
            },
        };
        // Prepend header to the local copy only
        displayData.unshift(first_data);

        // Check for real data (excluding the header row)
        let realDataCount = displayData.filter(d => d.key !== 'EOD:EOD_UPDATED_DATA').length;

        if (displayData.length > 0) {
            //  $('.eod_LED').css('display', 'block ')   // to display the icon
            redisKeys = []
            keyHtml = ''
            var failurehtml = ''
            var warninghtml = ''
            var edithtml = ''
            var okhtml = ''
            var successhtml = ''
            outkeyHtml = ''
            // Priority buckets: red → orange/blue → green → white
            var tabNav_red = '', tabNav_orange = '', tabNav_green = '', tabNav_white = ''
            var tabPanel_red = '', tabPanel_orange = '', tabPanel_green = '', tabPanel_white = ''
            //

            /*const first_data = {
                key: 'EOD:EOD_UPDATED_DATA',
                key_data: {
                    overallStatus: true,
                    status: 0,
                    type: 'table',
                    data: [
                        {
                            segment: 'Eod enable with live updates',
                            isSuccess: true,
                            status: 2,
                        },
                    ],
                },
            };
            (siteData.site_data).unshift(first_data)*/
            var isfirst = 1
            displayData.forEach(function (obj) {
                //console.log("siteData.site  --->"+JSON.stringify(obj))
                var tempObj = {}
                var keyData = obj.key_data
                var data = keyData['data']
                var isEdit = keyData['edit']
                failCount = 0
                greenCount = 0
                blueCount = 0
                orangeCount = 0
                whiteCount = 0
                rowHtmlgreen = ''
                rowHtmlblue = ''
                rowHtmlred = ''
                rowHtmlorange = ''
                rowHtmlwhite = ''
                rowHtml = ''
                var ftemp = ''
                var stemp = ''
                var btemp = ''
                var otemp = ''
                var wtemp = ''
                var divId = obj.key
                divId = divId.replace(/[:.]/g, '_');
                if (keyData['type'] == 'matrix') {
                    var temp = ''
                    ftemp = ''
                    stemp = ''
                    btemp = ''
                    otemp = ''
                    wtemp = ''
                    $.each(data, function (key) {
                        //console.log('EOD MATRIX DATA--->' + JSON.stringify(key))
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
                        //console.log('EOD MATRIX DATA[KEY]--->' + JSON.stringify(data[key]))
                        var bgcolor = ''
                        $.each(tempData, function (key1, val1) {
                            var obj = tempData[key1]
                            //console.log('EOD MATRIX tempData[' + key1 + ']--->' + JSON.stringify(obj))
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
                                if (obj.hasOwnProperty('tooltip')) {
                                    var tooltp_txt = '<table>';
                                    var tooltp_default = ''
                                    //console.log('obj[tooltip]--->' + JSON.stringify(obj['tooltip']))
                                    for (const [key, value] of Object.entries(obj['tooltip'])) {
                                        //console.log('niclist KEY--->' + key + ' VALUE--->' + JSON.stringify(value));

                                        tooltp_default += '<tr><td class="details_td">' + key + '</td class="details_td"> <td>:</td><td class="details_td">' + value + '</td></tr>'

                                    }

                                    tooltp_txt += tooltp_default
                                    tooltp_txt += '</table>'
                                    tempHtml += '<td class="white-text has-details ' + bgcolor + '"  >' + obj['value'] + '<span class="details">' + tooltp_txt + '</span></td>'
                                } else {
                                    // console.log('EOD MATRIX VALUE--->' + obj['value']);
                                    tempHtml += '<td class="white-text ' + bgcolor + '">' + obj['value'] + '</td>'
                                }
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
                    rowHtml = ftemp + otemp + btemp + stemp + wtemp
                    //console.log('EOD MATRIX ROW HTML--->' + rowHtml)
                }
                else {
                    /*if (isEdit != undefined)
                        console.log('ISEDIT--->' + JSON.stringify(isEdit))*/

                    var temp = ''
                    for (var i = 0; i < data.length; i++) {
                        var isSuccess = true
                        tempHtml = ''
                        //console.log('EOD TABLE DATA[' + i + ']--->' + JSON.stringify(data[i]))
                        $.each(data[i], function (key, val) {
                            if (key == 'isSuccess' && val == false) {
                                isSuccess = false
                            }
                            if (typeof (val) == 'object')
                                val = JSON.stringify(val)
                            if (key.includes('file_path')) {
                                tempHtml += '<td class="px-5 py-1 profile-td"><a id="' + i + '-' + 'file-info' + '" onclick="onFileinfo(\'' + val + '\',' + i + ',\'' + obj.key.replace(/[/:.]/g, '_') + '\')" data-toggle="modal" data-target="#dialog-for-content" class="profile">OUTPUT</a></td>'
                                // tempHtml += '<td class="px-5 py-1 profile-td"><a id="' + i + '-' + 'file-info' + '" onclick="onFileinfo(\'' + val + '\',' + i + ',\'' + obj.key.replace(/[:.]/g, '_') + '\')" data-toggle="modal" data-target="#dialog-for-content" class="profile"><img src="../static/app/images/view_file.png"/></a></td>'
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
                        } else if (data[i].status == 5) {
                            rowColor = 'blue'
                            // keyGreenCount++;
                            blueCount++;
                            rowHtmlblue += '<tr class="' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;font-size:12px;">' + tempHtml + '</tr>'
                        } else {
                            rowColor = 'white'
                            //keyWhiteCount++;
                            whiteCount++;
                            rowHtmlwhite += '<tr class="' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;font-size:12px;">' + tempHtml + '</tr>'
                        }
                        //   temp += '<tr class="' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;font-size:12px;">' + tempHtml + '</tr>'
                    }
                    //  rowHtml = temp
                }
                var value = obj.key
                tempObj['keyName'] = value
                tempObj['site'] = siteData.site
                //console.log('value--->' + value)
                if (value === 'EOD:EOD_UPDATED_DATA') {
                    keyName = 'Eod enable with live updates';
                } else {
                    keyName = (value.split(':')[1]);
                    // Robustly strip common prefixes
                    if (keyName.startsWith("EOD-")) {
                        keyName = keyName.substring(4);
                    } else if (keyName.startsWith("EOD_")) {
                        keyName = keyName.substring(4);
                    }
                    keyName = keyName.replaceAll("_", "-");
                }
                //console.log('KEYNAME after split--->' + keyName)
                if (obj.key_data.hasOwnProperty('status')) {
                    if (obj.key_data.status == 0) {
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
                        var colorClass = 'white'
                        tempObj['isSuccess'] = true
                    }
                } else {
                    var colorClass = 'white'
                    tempObj['isSuccess'] = true
                }
                redisKeys.push(tempObj)

                // Skip the hidden header entry from the tab bar
                if (obj.key === 'EOD:EOD_UPDATED_DATA') {
                    keyHtml = ''; rowHtmlgreen = ''; rowHtmlorange = '';
                    rowHtmlblue = ''; rowHtmlwhite = ''; rowHtmlred = '';
                    return; // forEach continue
                }

                var tabId = divId.replaceAll('/', '_') + '-panel'
                var displayLabel = keyName

                // Status class for tab colour
                var statusClass = colorClass === 'red'    ? ' status-red'
                                : colorClass === 'orange' ? ' status-orange'
                                : colorClass === 'green'  ? ' status-green'
                                : colorClass === 'blue'   ? ' status-red'
                                : ''

                // Comment icons
                var commentIcons = ''
                if (colorClass === 'red' || colorClass === 'orange' || colorClass === 'blue') {
                    if (isEdit != undefined && isEdit.length != 0) {
                        isEdit_dict[value] = JSON.stringify(isEdit)
                        commentIcons += ' <i data-feather="message-square" onclick="openShowcommentModal(this,\'' + value + '\')" data-toggle="modal" data-target="#dialog-for-showcomments" style="width:12px;height:12px;cursor:pointer;"></i>'
                    }
                    commentIcons += ' <i data-feather="edit" onclick="openAddcommentModal(this,\'' + value + '\')" data-toggle="modal" data-target="#dialog-for-addcomment" style="width:12px;height:12px;cursor:pointer;"></i>'
                }

                // Build nav item
                var navItem = '<li class="bod-tab-item" id="' + obj.key.replace(/[:.]/g, '_') + '_li">'
                navItem += '<a class="bod-tab-link' + statusClass + '" href="javascript:void(0)" onclick="eodSwitchTab(\'' + tabId + '\', this)">'
                navItem += displayLabel + commentIcons + '</a></li>'

                // Build panel item
                var keyData2 = obj.key_data
                var data2 = keyData2['data']
                var theadHtml2 = ''
                if (keyData2['type'] == 'matrix') {
                    theadHtml2 += '<th></th>'
                    $.each(data2[Object.keys(data2)[0]], function (key) { theadHtml2 += '<th>' + key + '</th>' })
                } else {
                    $.each(data2[0], function (key) {
                        if (key != 'isSuccess') theadHtml2 += '<th style="border:1px solid #303234;">' + key + '</th>'
                    })
                }
                var panelItem = '<div class="eod-tab-panel" id="' + tabId + '" style="display:none;">'
                panelItem += '<div class="row card-body py-lg-4 py-2">'
                panelItem += '<div class="col-12"><h5 class="size14" style="margin-left:10px;margin-top:3px;">Executed On : ' + keyData['executedOn'] + '</h5></div>'
                panelItem += '<div id="table-view" class="col-12" style="overflow-x:auto;">'
                panelItem += '<table id="data" style="border:1px;background-color:#191818">'
                panelItem += '<thead class="table-head" style="border:1px solid #303234;">'
                panelItem += '<tr class="text-uppercase" style="border:1px;background-color:#056aa1;font-size:12px;">'
                panelItem += theadHtml2 + '</tr></thead>'
                panelItem += '<tbody class="accordion list" id="accordionExample">'
                panelItem += rowHtml + rowHtmlred + rowHtmlorange + rowHtmlgreen + rowHtmlwhite
                panelItem += '</tbody></table></div></div></div>'

                // Sort into priority buckets
                if (colorClass === 'red') {
                    tabNav_red   += navItem;  tabPanel_red   += panelItem
                } else if (colorClass === 'orange' || colorClass === 'blue') {
                    tabNav_orange += navItem; tabPanel_orange += panelItem
                } else if (colorClass === 'green') {
                    tabNav_green  += navItem; tabPanel_green  += panelItem
                } else {
                    tabNav_white  += navItem; tabPanel_white  += panelItem
                }

                keyHtml = ''; rowHtmlgreen = ''; rowHtmlorange = '';
                rowHtmlblue = ''; rowHtmlwhite = ''; rowHtmlred = ''
            });

            // Merge in priority order: red → orange → green → white
            var tabNavHtml   = tabNav_red   + tabNav_orange   + tabNav_green   + tabNav_white
            var tabPanelHtml = tabPanel_red + tabPanel_orange + tabPanel_green + tabPanel_white
            // Mark first tab active and show its panel
            tabNavHtml   = tabNavHtml.replace('class="bod-tab-link', 'class="bod-tab-link bod-tab-active')
            tabPanelHtml = tabPanelHtml.replace('style="display:none;"', 'style="display:block;"')

            // Inject nav into subnav bar
            $('#eod-tab-nav-list').empty().append(tabNavHtml)

            outkeyHtml += '<div class="eod-tabs-wrapper" id="' + siteData.site + '">'
            outkeyHtml += '<div class="eod-tab-content">' + tabPanelHtml + '</div>'
            outkeyHtml += '</div>'

            // Always render — remove site guard, single site per EOD page
            $("#eod-status #site-data").css('display', 'block')
            $("#eod-status #eod-status-nodata").css('display', 'none')
            $("#eod-status #eod-status-expand").css('display', 'block');
            $('#eod-status #site-data').empty()
            $('#eod-status #site-data').append(outkeyHtml)
            // Update breadcrumb active tab
            var firstLink = document.querySelector('#eod-tab-nav-list .bod-tab-link.bod-tab-active')
            if (firstLink) {
                var label = firstLink.childNodes[0] ? firstLink.childNodes[0].textContent.trim() : ''
                var sep = document.getElementById('eod-active-sep')
                var tab = document.getElementById('eod-active-tab')
                if (tab) tab.textContent = label
                if (sep) sep.style.display = label ? '' : 'none'
            }

            if (realDataCount === 0) {
                $("#eod-status #eod-status-nodata").css('display', 'block')
                $("#eod-status #nodatamessage").text("No Keys")
            } else {
                $("#eod-status #eod-status-nodata").css('display', 'none')
            }
        }
        else {
            // $('.eod_LED').css('display', 'none')  // to hide the icon
            keyFailCount++;
            $("#eod-status #site-data").css('display', 'none')
            $("#eod-status #eod-status-nodata").css('display', 'block')
            $("#eod-status #eod-status-expand").css('display', 'none');
            if (siteData.code == 200) {
                $("#eod-status-nodata #nodatamessage").text('No Keys');
            }
            else {
                $("#eod-status-nodata #nodatamessage").text('Redis not reachable.');
            }
        }
        /*if (export_eodExcel == true) {
    
            Exporteodmultiplesheets()
    
        }*/
        feather.replace();
        Exporteodmultiplesheets()
        if (checkeodbx.checked == true) {
            checkeodbx.click();
        }
        //console.log('EOD \nKEYFAILCOUNT->' + keyFailCount + '\nkeyOrangeCount->' + keyOrangeCount + '\nkeyGreenCount->' + keyGreenCount + '\nkeyWhiteCount->' + keyWhiteCount)
        if (document.getElementById('eodLED')) {
            if (keyFailCount != 0) {
                document.getElementById('eodLED').style.color = "#ff3d57";
            } else if (keyOrangeCount != 0) {
                document.getElementById('eodLED').style.color = "#e99123";
            } else if (keyGreenCount != 0) {
                document.getElementById('eodLED').style.color = "#16d39a";
            } else
                document.getElementById('eodLED').style.color = "white";
        }
        //eodchangestatus(refreshedsite, keyFailCount)
    } else {
        console.log('EOD UPDATE PAUSED')
    }
}
function eodchangestatus(site, failCount) {
    //  console.log('EOD eodchangestatus - SITE--->' + site + ' failcount--->' + failCount)

    var obj = eodSitesData[0] //.filter(x => x.site === site)[0]
    if (failCount == 0) {
        obj.isSuccess = true
        $("#eod-status #site-list #" + site + '_li').removeClass("failure").addClass('success')
        $("#eod-status #site-list #" + site + '_li a').removeClass("red").addClass('green')
    }
    else {
        obj.isSuccess = false
        $("#eod-status #site-list #" + site + '_li').removeClass("success").addClass('failure')
        $("#eod-status #site-list #" + site + '_li a').removeClass("green").addClass('red')
    }
    var isFound = eodSitesData.some(el => el.isSuccess == false);
    if (isFound) {
        /* if (document.getElementById('eodLED') != null) {
             document.getElementById('eodLED').classList.add('red')
         }*/
        eodFinalStatus = 'Failure'
    }
    else {
        /*  if (document.getElementById('eodLED') != null) {
              document.getElementById('eodLED').classList.add('green')
          }*/
        eodFinalStatus = 'Success'
    }
    $("#eodstatus").html(eodFinalStatus)
    // eodFinalStatus == 'Failure' ? $("#eodstatus").removeClass("green").addClass('red') : $("#eodstatus").removeClass("red").addClass('green')
    if (document.getElementById('eodLED') != null) {
        //  console.log('EODLED  !=NULL EODFINALSTATUS---->' + eodFinalStatus)
        // eodFinalStatus == 'Failure' ? $("#eodLED").removeClass("green").addClass('red') : $("#eodLED").removeClass("red").addClass('green')
        eodFinalStatus == 'Failure' ? document.getElementById('eodLED').classList.remove('green') : document.getElementById('eodLED').classList.remove('red')
        eodFinalStatus == 'Failure' ? document.getElementById('eodLED').classList.add('red') : document.getElementById('eodLED').classList.add('green')
    }

}
function clickOnAll(checkbox) {
    checkeodbx = checkbox;
    var keys = redisKeys.filter(x => x.site === selectedsite)
    if (checkbox.checked == true) {
        $('.switch_label').text('')
        keys.forEach(function (obj) {
            var divId = obj.keyName
            divId = divId.replace(/[/:.]/g, '_');
            $('#' + selectedsite + ' #' + divId + '-data').collapse('show');
        })
    }
    else {
        $('.switch_label').text('')
        checkbox.checked == false
        keys.forEach(function (obj) {
            var divId = obj.keyName
            divId = divId.replace(/[/:.]/g, '_');
            $('#' + selectedsite + ' #' + divId + '-data').collapse('hide');
        })
    }
}

//web socket connection code changed to seperate js file Rajkumar (bod-eod-ws.js) 

/*function connectEodWebSocket(wsUrl, wsiteName, tries)
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
                var obj = eodSitesData[0] //.filter(x => x.site === stompClient.id)[0]
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
                    var isSiteFound = eodSitesData.some(el => el.site == tempJson.site);
                    if(tempJson.refresh == 1 && isSiteFound)
                    {
                        requestDataFromServer('/eod-status/geteodkeys', { sitename: params.get("site") }, "GET").done(function (response) {
                            eoddisplaykeys(response.responseData[0], response.refreshedsite)
                        })
                        if(pageName != "eod-status")
                        {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline") 
                        }
                    }
                });
 
                $("#eod-status #"+stompClient.id+"-indicator").css('background', '#16d39a')
                this.connectionTries = 6
            }
            var on_err = function(error) 
            { 
                $("#eod-status #"+stompClient.id+"-indicator").css('background', '#ff3d57')
                var obj = eodSitesData[0] //.filter(x => x.site === stompClient.id)[0]
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
                                connectEodWebSocket(stompClient.ws.url, stompClient.id, 0)
                            } else {
                                $("#eod-status #"+stompClient.id+"-indicator").css('background', '#ff3d57')
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
                        connectEodWebSocket(stompClient.ws.url, stompClient.id, stompClient.connectionTries)
                        //console.log("connectEodWebSocket1 --> " + connectionTries++)
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
function oneodSiteTabchange(sitename) {
    selectedsite = sitename
    // var keys = redisKeys.filter(x => x.site === selectedsite)
    // if(keys.length > 0)
    // {
    //     keys.forEach(function(obj){
    //         var divId = obj.keyName
    //         divId = divId.replace(/[:.]/g, '_');
    //         $('#'+selectedsite+' #'+divId+'-data').collapse('hide');
    //     })
    // }
    // $('.site-keys').each(function (e)
    // {
    //     $(this).css('display','none')
    // })
    // $("#"+sitename).css('display','block')
    $('#eod-status #site-list li a.active').removeClass('active');
    $('#eod-status #site-list #' + sitename + '_li ' + 'a').addClass('active');
    $("#site-data").empty();
    var tempSiteObj = eodSitesData[0] //.filter(x => x.site === selectedsite)[0]
    if (tempSiteObj.isWSConnected == false) {
        tempSiteObj = eodSiteResponse[0] //.filter(x => x.sitename === selectedsite)[0]

        connectEodWebSocket(tempSiteObj.websocket_url, selectedsite, 0)
    }
    starteodLoader()
    requestDataFromServer('/eod-status/geteodkeys', { sitename: params.get("site") }, "GET").done(function (response) {
        selectedsite = response.refreshedsite
        stopeodLoader()
        eoddisplaykeys(response.responseData[0], response.refreshedsite)
    });

}
function onFileinfo(filepath, index, key) {
    // $('#child-'+key+' #'+index+'-file-info').attr('data-target',"#dialog-for-content");
    $("#file_content").empty();
    showLoader('dialog-for-content')
    requestDataFromServer('/eod-status/readfile', { 'filepath': filepath, csrfmiddlewaretoken: csfr_token }, "POST").done(function (res) {
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
function starteodLoader() {
    $('#eod-status #eod-status-expand').css("display", "none")
    $('#eod-status #eod-status-nodata').css("display", "none")
    $('#eod-status #site-data').css("display", "none")
    showLoader("eod-status")

}
function stopeodLoader() {

    $('#eod-status #eod-status-expand').css("display", "block")
    $('#eod-status #eod-status-nodata').css("display", "block")
    $('#eod-status #site-data').css("display", "block")
    stopLoader("eod-status")

}
