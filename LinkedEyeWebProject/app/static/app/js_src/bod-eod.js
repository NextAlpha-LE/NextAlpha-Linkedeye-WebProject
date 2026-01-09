var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
redisKeys = [];
var bodeodFinalStatus = '';
var connectionTries = 6;
var isWSConnected = false;
var siteHtml = ' '
var bodSiteResponse;
var currentUserId = null;
var assignedSubsites = [];
var activeSubsite = 'Others';
var allBodData = null; // To store original data for filtering
var bodSitesData = [];
var bodeodResponse;
var colorClass = 'white' //green
var tables = []
var sheetname = ''
var excelname = ''
var tablename = ''
var firsttableid = '';
var totalbodlen = 0;
var operationsCompletedbod = 0;
var export_bodExcel = false;
var checkbx = '';
var open_rows = true;
var user_name = '';
var changed_key = '';
//console.log('PARAMS--->' + params)
var isEdit_dict = {}
//console.log('bod-eod-js document.getElementById(bodLED)' + document.getElementById('bodLED'))


$(document).ready(function () {
    if (pageName === "Dashboard")
        $("#new-label").css('display', localStorage.getItem("newlabeldisplay"))
    else
        localStorage.setItem("newlabeldisplay", "none");
    $("#bod-eodstatus #table-view").hide();

    getSiteList()
    profilename()
    var btn = $(".playpause");
    btn.click(function () {
        btn.toggleClass("paused");
        var plpsText = $("#plps-text");
        /*console.log('INSIDE click')
        console.log('classes--->'+$('.playpause').attr('class').split(/\s+/))
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
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'BOD' }, "GET").done(function (response) {
        if (typeof ledColors === 'function')
            ledColors(selected_sitename, selected_leurl, selected_websocurl)
        allBodData = response;
        if (typeof switchSubsite === 'function')
            switchSubsite(activeSubsite)
        else if (typeof displayKeys === 'function')
            displayKeys(response.responseData[0], response.refreshedsite)
    })
}
function profilename() {
    requestDataFromServer('/notificationsettings/getallservices', {}, "GET").done(getprofilenameResponse);
}

function getprofilenameResponse(response) {
    res = JSON.parse(response);
    if (res.status == 200) {
        userobject = res.userobj
        //console.log("getAllserviceResponse userobject-->" + JSON.stringify(userobject))
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
///////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////



/*let options = {
    ignoreRows: null,                   // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
    ignoreCols: null,                   // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
    trimWhitespace: true,
    headers: true,                      // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
    footers: true,
    bootstrap: true,
};*/
function exportbodtable() {
    /* export_bodExcel = true;
     requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'BOD' }, "GET").done(function (response) {
         console.log('exportbodtable request data from server--->')
         displayKeys(response.responseData[0], response.refreshedsite)
     })*/
    $("#" + firsttableid).find('.buttons-excel').click()
    refreshBODEOD()
};
function getHeaderNames(table) {
    // Gets header names.
    //params:
    //  table: table ID.
    //Returns:
    //  Array of column header names.
    // console.log('TABLE GETHEADERNAMES--->' + table)
    //  console.log('($(table).find("#data"))--->' + ($(table).find("#data")))
    var header = ($(table).find("#data")).DataTable().columns().header().toArray();
    // console.log('header---->' + header)
    var names = [];
    header.forEach(function (th) {
        names.push($(th).html());
    });

    return names;
}

function buildCols(data) {
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

function buildRow(data, rowNum, styleNum) {
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
        //console.log('DATA[i]----> ' + data[i])
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

function getTableData(table, title) {
    // Processes Datatable row data to build sheet.
    //Params:
    //  table: table ID.
    //  title: Title displayed at top of SS or empty str for no title.
    //Returns:
    //  String of XML formatted worksheet.
    // console.log('getTABLEDATA \ntable BEFORE--->' + table + '\n title-' + title)
    var header = getHeaderNames(table);
    // console.log('getTABLEDATA table AFTER--->' + table+' title-'+title)
    var table = $(table).find("#data").DataTable();
    var rowNum = 1;
    var mergeCells = '';
    var ws = '';

    ws += buildCols(header);
    ws += '<sheetData>';

    if (title.length > 0) {
        //console.log('BUILD TITLE ROW ---> ' + buildRow([title], rowNum, 51))
        ws += buildRow([title], rowNum, 51);
        rowNum++;

        mergeCol = ((header.length - 1) + 10).toString(36).toUpperCase();

        mergeCells = '<mergeCells count="1">' +
            '<mergeCell ref="A1:' + mergeCol + '1"/>' +
            '</mergeCells>';
    }

    ws += buildRow(header, rowNum, 2);
    rowNum++;

    // Loop through each row to append to sheet.    
    table.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var data = this.data();

        // If data is object based then it needs to be converted
        // to an array before sending to buildRow()
        //console.log('BUILD TABLE ROW ---> ' + buildRow(data, rowNum, ''))
        ws += buildRow(data, rowNum, '');

        rowNum++;
    });

    ws += '</sheetData>' + mergeCells;

    //console.log('XML TITLE--->'+title)
    //console.log('XML DATA--->'+ws)
    return ws;

}

function setSheetName(xlsx, name) {
    // Changes tab title for sheet.
    //Params:
    //  xlsx: xlxs worksheet object.
    //  name: name for sheet.
    // console.log('SETSHEETNAME')
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

function addSheet(xlsx, table, title, name, sheetId) {
    //console.log('ADDSHEET BOD--->')
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
    //  console.log('INSIDE ADDSHEET--->')
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
        getTableData(table, title) +

        '</worksheet>';
    /*console.log('NEWSHEET XML--->' + newSheet)*/
    const modifiedXML = fixInvalidTextContent(newSheet);
    //const modifiedXML = validateAndFixXML(newSheet);

    if (modifiedXML) {
        //console.log('Modified XML:', modifiedXML);
        newSheet = modifiedXML
    }
    xlsx.xl.worksheets['sheet' + sheetId + '.xml'] = $.parseXML(newSheet);
    //xlsx.xl.worksheets['sheet' + sheetId + '.xml'] = (newSheet);

}

function Exportmultiplesheets() {
    // console.log('<---INSIDE EXPORT MULTIPLE SHEETS - BOD--->')
    // $('#btnExport').click()
    const parent = document.getElementById('mob-width');
    if (parent != null && parent != undefined) {
        const children = Array.from(parent.children);
        children.shift();
        children.shift();
        const ids = children.map(element => {
            return element.id;
        });
        //console.log('ids array before----> ' + ids)
        //console.log('ids[1] array before----> ' + ids[1])
        firsttableid = (ids[1].split("child-")[1]) + '-data'
        //console.log('IDS[1]--->' + ids[1])
        var firsttablename = '';
        if (ids[1].includes('BOD-')) {
            //console.log('firsttablename--->' + ids[0].split("BOD-")[1])
            firsttablename = ids[0].split("BOD-")[1]
        } else {
            //console.log('firsttablename--->' + ids[0].split("BOD_")[1])
            firsttablename = ids[0].split("BOD_")[1]
        }
        //console.log('first table name--->' + firsttablename)
        var j = 0;
        // console.log('IDS ARRAY----> ' + ids[1])
        //console.log('FIRSTABLEid after----> ' + firsttableid)
        $('#' + firsttableid).find("#data").DataTable({
            dom: 'Bfrtip',
            //lengthMenu: [10, 25, 50,100,200,1000,'All'],
            "pageLength": 100,
            "ordering": false,
            buttons: [
                {
                    extend: 'excel',
                    title: 'BOD',
                    customize: function (xlsx) {
                        setSheetName(xlsx, firsttablename);
                        /*ids.forEach(function (item, index) {
                            console.log('ITEM--->'+item+' index--->'+index)
                            if (index > 2 && item.includes('child-')) {
                                console.log('INSIDE IF--->')
                                //   console.log('ids[i]--->' + ids[i])
                                var childid = (item.split("child-")[1]) + '-data'
                                if (item.includes('BOD-')) {
                                    //       console.log('ids[i].split("BOD-")[1]--->' + ids[i].split("BOD-")[1])
                                    tablename = item.split("BOD-")[1]
                                } else {
                                    //       console.log('ids[i].split("BOD_")[1]--->' + ids[i].split("BOD_")[1])
                                    tablename = item.split("BOD_")[1]
                                }
                                console.log('before addsheet called')
    
                                addSheet(xlsx, '#' + childid, tablename, item, (index - 1).toString());
                                j++;
                            }
                        });*/
                        for (let i = 3; i < ids.length; i++) {
                            //  console.log('INSIDE CUSTOMIZE FOR--->' + i)

                            if (i > 2 && ids[i].includes('child-')) {
                                // console.log('INSIDE IF--->')
                                //   console.log('ids[i]--->' + ids[i])
                                var childid = (ids[i].split("child-")[1]) + '-data'
                                if (ids[i].includes('BOD-')) {
                                    tablename = ids[i].split("BOD-")[1]
                                } else {
                                    tablename = ids[i].split("BOD_")[1]
                                }
                                // sheetname = tablename
                                // excelname = ids[i]
                                addSheet(xlsx, '#' + childid, tablename, tablename, (i - 1).toString());
                                j++;
                            }
                        }
                    }
                }

            ],

        });
        totalbodlen = ids.length;
        for (k = 3; k < ids.length; k++) {

            if (ids[k].includes('child-')) {
                //  console.log('SECOND LOOP k-->' + k)
                var childid = (ids[k].split("child-")[1]) + '-data'
                $('#' + childid).find("#data").DataTable({
                    dom: 'Bfrtip',
                    "pageLength": 100,
                    "ordering": false,
                    buttons: [
                        {
                            extend: 'excel',
                            title: 'BOD',
                        }
                    ],
                });
                operationsCompletedbod = k;
                // operationbod()
            }

        }
        //console.log('before func call tables---->' + tables)
        //  tables_To_Excel(tables, sheetname, 'BOD.xls', 'Excel')
    }
    //  console.log('parent.childElementCount---->' + parent.childElementCount)

}
function operationbod() {
    ++operationsCompletedbod;
    // console.log('operationsCompletebod--->' + operationsCompletedbod + ' totalbodlen--->' + totalbodlen)
    if (operationsCompletedbod === totalbodlen) {
        $("#" + firsttableid).find('.buttons-excel').click()
        export_bodExcel = false;
    }
}


/*function exportfiles() {
   
    console.log('INSIDE EXPORTFILES')
    $('table#data').DataTable({
       dom: 'Bfrtip',
        //lengthMenu: [10, 25, 50,100,200,1000,'All'],
        "pageLength": 50,
        buttons: [
            {
                extend: 'csv',
                title: 'Csv export',
                messageTop: 'The information in this table is copyright to Sirius Cybernetics Corp.'
            },
            {
                extend: 'excel',
                title: excelname,
                messageTop: sheetname,
                sheetName: sheetname
            },
            {
                extend: 'pdf',
                title: 'Pdf export',
                messageTop: 'The information in this table is copyright to Sirius Cybernetics Corp.'
            }
            
        ]
    });
}*/

/*function onExport(format) {
        const parent = document.getElementById('mob-width');

    const children = Array.from(parent.children);

    const ids = children.map(element => {
        return element.id;
    });
   // console.log('CHILDELEMENTCOUNT--->' + children)
   // console.log('CHILDELEMENTCOUNT--->' + parent.childElementCount)
   // console.log('IDS--->' + ids)
    for (i = 0; i < parent.childElementCount; i++) {
        if (ids[i].includes('child-')) {
            console.log('children[i]--->' + ids[i])
            var childid = (ids[i].split("child-")[1]) + '-data'
            var tablename=''
            if (ids[i].includes('BOD-')) {
                console.log('ids[i].split("BOD-")[1]--->' + ids[i].split("BOD-")[1])
                tablename = ids[i].split("BOD-")[1]
            } else {
                console.log('ids[i].split("BOD_")[1]--->' + ids[i].split("BOD_")[1])
                tablename = ids[i].split("BOD_")[1]
            }
            console.log('')
         //   console.log('document.getElementById(childid)--->' + document.getElementById(childid).children[0].children[1].children[0])
           // var table = document.getElementById(childid).children[0].children[1].children[0];
            var table = $("#" + childid).find("#table-view")
          
        }
    }

}*/

function getSiteList() {
    showLoader("bod-eodstatus")
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            bodSiteResponse = res.data;
            initSubsiteConcept();
        }
        else
            stopLoader("bod-eodstatus")
    });
}

function initSubsiteConcept() {
    requestDataFromServer('/useronboard/getcurrentuser', {}, "GET").done(function (userResponse) {
        let userRes = JSON.parse(userResponse);
        if (userRes.status === 200) {
            currentUserId = userRes.data.id;
            let siteId = bodSiteResponse[0].id;
            requestDataFromServer('/useronboard/getsubsitedata', { mode: "user_site", userId: currentUserId, siteId: siteId, csrfmiddlewaretoken: csfr_token }, "POST").done(function (subsiteRes) {
                if (subsiteRes.status === 200 && subsiteRes.data) {
                    assignedSubsites = [];
                    Object.values(subsiteRes.data).forEach(arr => {
                        arr.forEach(s => {
                            if (!assignedSubsites.includes(s)) assignedSubsites.push(s);
                        });
                    });
                }
                getBodEodkeys();
            }).fail(function () { getBodEodkeys(); });
        } else {
            getBodEodkeys();
        }
    }).fail(function () { getBodEodkeys(); });
}
function getBodEodkeys() {
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'BOD' }, "GET").done(bodEodkeysResponse)

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
                type: "success",
                confirmButtonClass: "btn-success",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                closeOnCancel: true
            },
                function (isConfirm) {
                    //console.log('ISCONFIRM--->' + isConfirm)
                    if (isConfirm) {
                        $('#syntax').val('')
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site"), mode: 'BOD' }, "GET").done(function (response) {
                            if (typeof ledColors === 'function')
                                ledColors(selected_sitename, selected_leurl, selected_websocurl)
                            allBodData = response;
                            if (typeof switchSubsite === 'function')
                                switchSubsite(activeSubsite)
                            else if (typeof displayKeys === 'function')
                                displayKeys(response.responseData[0], response.refreshedsite)
                        })
                    }
                });
        } else {
            swal(response.responseData.site_data, ' ', "error");
        }
        $("#dialog-for-addcomment").find('.dismiss-btn').click()
    })
}
function bodEodkeysResponse(response) {
    allBodData = response;
    renderSubsiteTabs();
    const bodEod = Math.random().toString(36).substring(2, 5);
    // console.log('document.getElementById(bodLED)' + document.getElementById('bodLED'))
    //console.log('bodeodkeys response--->' + JSON.stringify(response))
    if (response == undefined)
        return;
    bodeodResponse = response.responseData;
    stopLoader("bod-eodstatus")
    if (response.responseData.length > 0) {
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
            bodSitesData.push(siteTempObj)
            var tempSiteObj = bodSiteResponse[0] //.filter(x => x.sitename === siteTempObj['site'])[0]
            connectWebSocket(tempSiteObj.websocket_url, siteTempObj['site'], 0, bodEod)
        });
        var sSitehtml = ''
        var fSitehtml = ''
        $("#bod-eodstatus #site-list").empty()
        siteFailCount = 0;
        bodSitesData.forEach(function (obj) {
            if (obj.isSuccess) {
                //sSitehtml += '<div class="page-header"><li class="page-title" id="' + obj.site + '_li" style="position: relative;">' + obj.site +'<h3 class="page-title"> > BOD EOD Status </h3></li></div>'
                sSitehtml += '<div class="page-header"> ' + obj.site + ' &ensp;>&ensp; <h3 class="page-title"> BOD Status </h3></div>'
            }
            else {
                siteFailCount++;
                //fSitehtml += '<div class="page-header"><li class="page-title" id="' + obj.site + '_li" style="position: relative;"> ' + obj.site +'<h3 class="page-title" > >  BOD EOD Status </h3></li> </div>'
                fSitehtml += '<div class="page-header"> ' + obj.site + ' &ensp;>&ensp; <h3 class="page-title" > BOD Status </h3></div>'
            }
        });
        if (siteFailCount != 0)
            bodeodFinalStatus = 'Failure'
        else
            bodeodFinalStatus = 'Success'
        $("#bodeodstatus").html(bodeodFinalStatus)
        bodeodFinalStatus == 'Failure' ? $("#bodeodstatus").removeClass("green").addClass('red') : $("#bodeodstatus").removeClass("red").addClass('green')
        //bodeodFinalStatus == 'Failure' ? $("#bodLED").removeClass("green").addClass('red') : $("#bodLED").removeClass("red").addClass('green')
        $("#bod-eodstatus #site-list").append(fSitehtml);
        $("#bod-eodstatus #site-list").append(sSitehtml);
        $("#bod-eodstatus #site-list li a").eq(0).addClass('active');
        if ($("#bod-eodstatus #site-list li a").eq(0).data()) {
            selectedsite = $("#bod-eodstatus #site-list li a").eq(0).data().id
        }
        else {
            if (selectedsite && bodSitesData.length > 0)
                selectedsite = bodSitesData[0].site
        }
        var obj = bodeodResponse[0] //.filter(x => x.site === selectedsite)[0]
        if (typeof switchSubsite === 'function')
            switchSubsite(activeSubsite)
        else
            displayKeys(obj, selectedsite)

    }
    else {
        $("#bod-eodstatus #site-data").css('display', 'none');
        $("#bod-eodstatus #bod-eodstatus-nodata").css('display', 'block');
        $("#bod-eodstatus-nodata #nodatamessage").text('No Data');
        $("#bod-eodstatus #bod-eodstatus-expand").css('display', 'none');
    }
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
        // Check top level status first
        if (typeof keyData.status !== 'undefined') {
            let p = getPriorityValue(keyData.status);
            if (p > highestPriority) {
                highestPriority = p;
                winningStatus = keyData.status;
            }
        }

        // Check inner data if it's a collection
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

    if (!allBodData || !allBodData.responseData || allBodData.responseData.length === 0) return;

    $('#subsite-tabs-row').show();
    let tabList = $('#subsite-tabs');
    tabList.empty();

    let originalKeys = allBodData.responseData[0].site_data;

    // Calculate status for "Others"
    let otherKeys = originalKeys.filter(keyObj => {
        let key = keyObj.key;
        let parts = key.split(':');
        if (parts.length > 1) {
            let secondPart = parts[1].toLowerCase();
            let isAssigned = assignedSubsites.some(s => {
                let sLower = s.toLowerCase();
                return secondPart.split('-').some(part => part === sLower) || secondPart.includes("-" + sLower + "-") || secondPart.includes("-" + sLower) || secondPart.startsWith(sLower + "-");
            });
            return !isAssigned;
        }
        return true;
    });
    let otherStatus = calculateSubsiteStatus(otherKeys);
    let otherColor = getPriorityColor(otherStatus);

    // Add "OTHERS" tab
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
                return secondPart.split('-').some(part => part === subsiteLower);
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

    var originalObj = allBodData.responseData[0];
    let filteredObj = JSON.parse(JSON.stringify(originalObj));

    if (subsite === 'Others') {
        filteredObj.site_data = filteredObj.site_data.filter(keyObj => {
            // Key format: Prefix:Type-Subsite-Env
            let key = keyObj.key;
            let parts = key.split(':');
            if (parts.length > 1) {
                let secondPart = parts[1].toLowerCase();
                // Check if this key belongs to ANY of the assigned subsites
                let isAssigned = assignedSubsites.some(s => {
                    let sLower = s.toLowerCase();
                    // Match between hyphens or full string check
                    return secondPart.split('-').some(part => part === sLower) || secondPart.includes("-" + sLower + "-") || secondPart.includes("-" + sLower) || secondPart.startsWith(sLower + "-");
                });
                return !isAssigned; // Show only if NOT assigned to any specific subsite
            }
            return true;
        });
    } else {
        // Filter for specific subsite
        filteredObj.site_data = filteredObj.site_data.filter(keyObj => {
            let key = keyObj.key;
            let parts = key.split(':');
            if (parts.length > 1) {
                let secondPart = parts[1].toLowerCase();
                let subsiteLower = subsite.toLowerCase();
                return secondPart.split('-').some(part => part === subsiteLower) || secondPart.includes("-" + subsiteLower + "-") || secondPart.includes("-" + subsiteLower) || secondPart.startsWith(subsiteLower + "-");
            }
            return false;
        });
    }
    displayKeys(filteredObj, selectedsite);
}
function displayKeys(siteData, refreshedsite) {
    //console.log('displayKeys - siteData--->' + siteData + ' resfreshedsite--->' + refreshedsite)
    isEdit_dict = {}
    if (open_rows) {
        //console.log('BOD UPDATE IN LIVE')
        // console.log("siteData-->" + JSON.stringify(siteData))
        keyFailCount = 0
        keyGreenCount = 0
        keyBlueCount = 0
        keyOrangeCount = 0
        keyWhiteCount = 0
        if (siteData.site_data.length > 0) {
            //  $('.bod_LED').css('display', 'block ')  //to display the icon
            redisKeys = []
            keyHtml = ''
            var failurehtml = ''
            var warninghtml = ''
            var edithtml = ''
            var okhtml = ''
            var successhtml = ''
            outkeyHtml = ''
            outkeyHtml += '<div class="row py-2 site-keys" id="' + siteData.site + '">'
            outkeyHtml += '<div class="col-12">'
            outkeyHtml += '<table class="row" id="display">'
            outkeyHtml += '<tbody class="col-12" id="mob-width">'
            // outkeyHtml += '<tr class="collapse-tr parent row" >BOD test</tr>'
            //
            //console.log('type of data--->' + (siteData.site_data))
            const first_data = {
                key: 'BOD:BOD_UPDATED_DATA',
                key_data: {
                    overallStatus: true,
                    status: 0,
                    type: 'table',
                    data: [
                        {
                            segment: 'Bod enable with live updates',
                            isSuccess: true,
                            status: 2,
                        },
                    ],
                },
            };
            (siteData.site_data).unshift(first_data)
            var isfirst = 1
            siteData.site_data.forEach(function (obj) {
                //console.log("siteData.site  --->" + JSON.stringify(obj))
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
                divId = divId.replace(/[:.]/g, '_');
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
                                if (obj.hasOwnProperty('tooltip')) {
                                    var tooltp_txt = '<table>';
                                    var tooltp_default = ''
                                    //console.log('obj[tooltip]--->' + JSON.stringify(obj['tooltip']))
                                    for (const [key, value] of Object.entries(obj['tooltip'])) {
                                        // console.log('niclist KEY--->' + key + ' VALUE--->' + JSON.stringify(value));

                                        tooltp_default += '<tr><td class="details_td">' + key + '</td class="details_td"> <td>:</td><td class="details_td">' + value + '</td></tr>'

                                    }

                                    tooltp_txt += tooltp_default
                                    tooltp_txt += '</table>'
                                    tempHtml += '<td class="white-text has-details ' + bgcolor + '"  >' + obj['value'] + '<span class="details">' + tooltp_txt + '</span></td>'
                                } else {
                                    //console.log(' VALUE--->' + obj['ctcl_id']);
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
                    rowHtml = ftemp + otemp + stemp + wtemp
                }
                else {
                    /*if (isEdit != undefined)
                        console.log('ISEDIT--->' + JSON.stringify(isEdit))*/

                    var temp = ''
                    for (var i = 0; i < data.length; i++) {
                        var isSuccess = true
                        tempHtml = ''
                        //console.log('DATA['+i+']--->' + JSON.stringify(data[i]))
                        $.each(data[i], function (key, val) {
                            if (key == 'isSuccess' && val == false) {
                                isSuccess = false
                            }
                            if (typeof (val) == 'object')
                                val = JSON.stringify(val)
                            if (key.includes('file_path')) {
                                // tempHtml += '<td>LOG PIC</td>' //uncomment below line for log image
                                tempHtml += '<td class="px-5 py-1 profile-td"><a id="' + i + '-' + 'file-info' + '" data-exclude="true" onclick="onFileinfo(\'' + val + '\',' + i + ',\'' + obj.key.replace(/[/:.]/g, '_') + '\')" data-toggle="modal" data-target="#dialog-for-content" class="profile">OUTPUT</a></td>'
                                //tempHtml += '<td class="px-5 py-1 profile-td"><a id="' + i + '-' + 'file-info' +'" data-exclude="true" onclick="onFileinfo(\''+val+'\','+i+',\''+obj.key.replace(/[:.]/g, '_')+'\')" data-toggle="modal" data-target="#dialog-for-content" class="profile"><img src="../static/app/images/view_file.png"/></a></td>'
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
                            rowHtmlred += '<tr class="tr-rowclr ' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;">' + tempHtml + '</tr>'

                        } else if (data[i].status == 1) {
                            rowColor = 'orange'
                            // keyOrangeCount++;
                            orangeCount++;
                            //console.log('ORANGE DATA BOD--->' + JSON.stringify(data[i]))
                            rowHtmlorange += '<tr class="tr-rowclr ' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;">' + tempHtml + '</tr>'
                        } else if (data[i].status == 2) {
                            rowColor = 'green'
                            // keyGreenCount++;
                            greenCount++;
                            rowHtmlgreen += '<tr class="tr-rowclr ' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;">' + tempHtml + '</tr>'
                        } else {
                            rowColor = 'white'
                            // keyWhiteCount++;
                            whiteCount++;
                            rowHtmlwhite += '<tr class="tr-rowclr ' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;">' + tempHtml + '</tr>'
                        }


                        // temp += '<tr class="' + rowColor + '" style="border: 1px solid #303234; white-space:nowrap;font-size:12px;">' + tempHtml + '</tr>'
                    }
                    // rowHtml = temp
                }
                var value = obj.key
                tempObj['keyName'] = value
                tempObj['site'] = siteData.site
                keyName = (value.split(':')[1]).replace("_", "-")
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
                // console.log('BOD \nfailCount->' + failCount + '\norangeCount->' + orangeCount + '\ngreenCount->' + greenCount + '\nwhiteCount->' + whiteCount)
                /* if (failCount != 0) {
                     var text = 'Failure'
                     var colorClass = 'red'
                     tempObj['isSuccess'] = false
                 }else if (orangeCount != 0) {
                     var colorClass = 'orange'
                     tempObj['isSuccess'] = false
                 }else if (greenCount != 0) {
                     var colorClass = 'green'
                     tempObj['isSuccess'] = true
                 }else
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
                keyHtml += '<h4 class="card-titles ' + colorClass + '" style="margin-left: 10px; margin-top: 3px;">' + (keyName.split("BOD-")[1]) + '</h4>'//<span class="size12 '+colorClass+'"style="margin-left: 10px; font-weight: bold;"></span>
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
                if (obj.key == "BOD:BOD_UPDATED_DATA") {
                    keyHtml += '<tr class="border-0 collapse-content row" id="child-' + obj.key.replace(/[:.]/g, '_') + '" style="visibility:hidden;height:1px;display:block" >'
                } else {
                    keyHtml += '<tr class="border-0 collapse-content row" id="child-' + obj.key.replace(/[:.]/g, '_') + '" >'
                }

                keyHtml += '<td colspan="12" class="hiddenRow border-0 p-0 col-12">'
                keyHtml += '<div class="accordian-body collapse col-12 border-b" id="' + divId + '-data' + '" style="border: 1px;">'
                keyHtml += '<div class="row card-body py-lg-4 py-2 ">' //removed bg
                keyHtml += '<div class="col-12">'
                keyHtml += '<h5 class="size14" style="margin-left: 10px; margin-top: 3px;">Executed On : ' + keyData['executedOn'] + '</h5>'
                keyHtml += '</div>'
                keyHtml += '<div id="table-view" class="col-12" style="overflow-x: auto;">'
                keyHtml += '<table id="data" style="border: 1px; background-color: #191818">'
                keyHtml += '<thead class="table-head" style="border: 1px solid #303234;">'
                keyHtml += '<tr class="text-uppercase" style="border: 1px; background-color: #056aa1;">'
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
                keyHtml += rowHtml + rowHtmlred + rowHtmlorange + rowHtmlgreen + rowHtmlwhite
                //keyHtml +=  rowHtmlgreen
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
                //console.log('INSIDE REF IF')
                $("#bod-eodstatus #site-data").css('display', 'block')
                $("#bod-eodstatus #bod-eodstatus-nodata").css('display', 'none')
                $("#bod-eodstatus #bod-eodstatus-expand").css('display', 'block');
                $('#bod-eodstatus #site-data').empty()
                $('#bod-eodstatus #site-data').append(outkeyHtml)

            }
        }
        else {
            //   console.log('BOD ELSE FAILCOUNT')
            // $('.bod_LED').css('display', 'none ') // to hide the icon

            keyFailCount++;
            $("#bod-eodstatus #site-data").css('display', 'none')
            $("#bod-eodstatus #bod-eodstatus-nodata").css('display', 'block')
            $("#bod-eodstatus #bod-eodstatus-expand").css('display', 'none');
            if (siteData.code == 200) {
                $("#bod-eodstatus-nodata #nodatamessage").text('No Keys');
            }
            else {
                $("#bod-eodstatus-nodata #nodatamessage").text('Redis not reachable.');
            }
        }
        //if (export_bodExcel == true) {
        //  console.log(' IFEXPORT_BODEXCEL == TRUE--->')

        feather.replace();
        Exportmultiplesheets()
        // }
        if (checkbx.checked == true) {
            checkbx.click();
        }
        //console.log('BOD \nKEYFAILCOUNT->' + keyFailCount + '\nkeyOrangeCount->' + keyOrangeCount + '\nkeyGreenCount->' + keyGreenCount + '\nkeyWhiteCount->' + keyWhiteCount)
        if (document.getElementById('bodLED')) {
            if (keyFailCount != 0) {
                document.getElementById('bodLED').style.color = "#ff3d57";
            } else if (keyOrangeCount != 0) {
                document.getElementById('bodLED').style.color = "#e99123";
            } else if (keyGreenCount != 0) {
                document.getElementById('bodLED').style.color = "#16d39a";
            } else
                document.getElementById('bodLED').style.color = "white";
        }
        const scrollContainer = document.querySelector('#table-view');

        scrollContainer.addEventListener('wheel', (event) => {
            event.preventDefault();
            scrollContainer.scrollLeft += event.deltaY;
        });
        // changeStatus(refreshedsite, keyFailCount)
    } else {
        console.log('BOD UPDATE PAUSED')
    }

}
function changeStatus(site, failCount) {
    // console.log('changestatus - SITE--->' + site + ' failcount--->' + failCount)
    var obj = bodSitesData[0] //.filter(x => x.site === site)[0]
    if (failCount == 0) {
        obj.isSuccess = true
        $("#bod-eodstatus #site-list #" + site + '_li').removeClass("failure").addClass('success')
        $("#bod-eodstatus #site-list #" + site + '_li a').removeClass("red").addClass('green')
    }
    else {
        obj.isSuccess = false
        $("#bod-eodstatus #site-list #" + site + '_li').removeClass("success").addClass('failure')
        $("#bod-eodstatus #site-list #" + site + '_li a').removeClass("green").addClass('red')
    }
    var isFound = bodSitesData.some(el => el.isSuccess == false);
    //  console.log('ISFOUND---->' + isFound)
    jQuery('#element_to_load_content_into').load('a.html#name');
    if (isFound) {
        //  console.log('INSIDE ISFOUND True' + document.getElementById('bodLED'))
        /* if (document.getElementById('bodLED') != null) {
             document.getElementById('bodLED').classList.add('red')
         }*/
        bodeodFinalStatus = 'Failure'
    }
    else {
        // console.log('INSIDE ISFOUND False' + document.getElementById('bodLED'))
        /* if (document.getElementById('bodLED') != null) {
             document.getElementById('bodLED').classList.add('green')
         }*/
        bodeodFinalStatus = 'Success'
    }
    $("#bodeodstatus").html(bodeodFinalStatus)
    //  bodeodFinalStatus == 'Failure' ? $("#bodeodstatus").removeClass("green").addClass('red') : $("#bodeodstatus").removeClass("red").addClass('green')
    if (document.getElementById('bodLED') != null) {
        // console.log('BODLED!=NULL bodfinalstatus---->' + bodeodFinalStatus)
        // bodeodFinalStatus == 'Failure' ? document.getElementById('bodLED').classList.replace('green', 'red') : document.getElementById('bodLED').classList.replace('red', 'green')
        bodeodFinalStatus == 'Failure' ? document.getElementById('bodLED').classList.remove('green') : document.getElementById('bodLED').classList.remove('red')
        bodeodFinalStatus == 'Failure' ? document.getElementById('bodLED').classList.add('red') : document.getElementById('bodLED').classList.add('green')
    }
    const scrollContainer = document.querySelector('#table-view');

    scrollContainer.addEventListener('wheel', (event) => {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
    });
}
function clickOnAll(checkbox) {
    checkbx = checkbox
    var keys = redisKeys.filter(x => x.site === selectedsite)
    if (checkbox.checked == true) {
        $('.switch_label').text('')
        keys.forEach(function (obj) {
            var divId = obj.keyName
            divId = divId.replace(/[:.]/g, '_');
            $('#' + selectedsite + ' #' + divId + '-data').collapse('show');
        })
    }
    else {
        $('.switch_label').text('')
        checkbox.checked == false
        keys.forEach(function (obj) {
            var divId = obj.keyName
            divId = divId.replace(/[:.]/g, '_');
            $('#' + selectedsite + ' #' + divId + '-data').collapse('hide');
        })
    }
}

/*function collapserows(id) {
    
    var togbtn = document.getElementById('expand')
    if (togbtn.checked == true) {
        console.log('TRUE CHECKED  ,checked--->' + togbtn.checked)
        togbtn.click()
        //togbtn.checked =false
    } else {
        console.log('FALSE CHECKED  ,checked--->' + togbtn.checked)

        togbtn.click()
        togbtn.click()
        togbtn.checked =false
    }
    window.parent.document.getElementById('cls-btn').click();
}*/

//web socket connection code changed to seperate js file Rajkumar (bod-eod-ws.js) 

/*function connectWebSocket(wsUrl, wsiteName, tries)
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
                var obj = bodSitesData[0] //.filter(x => x.site === stompClient.id)[0]
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
                    var isSiteFound = bodSitesData.some(el => el.site == tempJson.site);
                    if(tempJson.refresh == 1 && isSiteFound)
                    {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site") }, "GET").done(function (response) {
                            displayKeys(response.responseData[0], response.refreshedsite)
                        })
                        if(pageName != "BOD-EODStatus")
                        {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline") 
                        }
                    }
                });

                $("#bod-eodstatus #"+stompClient.id+"-indicator").css('background', '#16d39a')
                this.connectionTries = 6
            }
            var on_err = function(error) 
            { 
                $("#bod-eodstatus #"+stompClient.id+"-indicator").css('background', '#ff3d57')
                var obj = bodSitesData[0] //.filter(x => x.site === stompClient.id)[0]
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
                                connectWebSocket(stompClient.ws.url, stompClient.id, 0)
                            } else {
                                $("#bod-eodstatus #"+stompClient.id+"-indicator").css('background', '#ff3d57')
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
                        connectWebSocket(stompClient.ws.url, stompClient.id, stompClient.connectionTries)
                        //console.log("connectWebSocket1 --> " + connectionTries++)
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
function onBodSiteTabchange(sitename) {
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
    $('#bod-eodstatus #site-list li a.active').removeClass('active');
    $('#bod-eodstatus #site-list #' + sitename + '_li ' + 'a').addClass('active');
    $("#site-data").empty();
    var tempSiteObj = bodSitesData[0] //.filter(x => x.site === selectedsite)[0]
    if (tempSiteObj.isWSConnected == false) {
        tempSiteObj = bodSiteResponse[0] //.filter(x => x.sitename === selectedsite)[0]

        connectWebSocket(tempSiteObj.websocket_url, selectedsite, 0)
    }
    startBodLoader()
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: params.get("site") }, "GET").done(function (response) {
        selectedsite = response.refreshedsite
        stopBodLoader()
        displayKeys(response.responseData[0], response.refreshedsite)
    });

}
function onFileinfo(filepath, index, key) {
    // $('#child-'+key+' #'+index+'-file-info').attr('data-target',"#dialog-for-content");
    $("#file_content").empty();
    showLoader('dialog-for-content')
    requestDataFromServer('/bod-eodstatus/readfile', { 'filepath': filepath, csrfmiddlewaretoken: csfr_token }, "POST").done(function (res) {
        stopLoader('dialog-for-content')
        $("#file_content").empty();
        if (res.status == 200) {
            $("#dialog-for-content #file_content").css('visibility', 'visible');
            $("#dialog-for-content #nodata").css('visibility', 'hidden');
            // console.log('FILE CONTENT--->' + res.file_content)
            $("#file_content").append(res.file_content)
        } else {
            $("#dialog-for-content #file_content").css('visibility', 'hidden');
            $("#dialog-for-content #nodata").css('visibility', 'visible');
            $("#dialog-for-content #nodata #nodatamessage").text(res.emsg);
        }
    })
}

function startBodLoader() {
    $('#bod-eodstatus #bod-eodstatus-expand').css("display", "none")
    $('#bod-eodstatus #bod-eodstatus-nodata').css("display", "none")
    $('#bod-eodstatus #site-data').css("display", "none")
    showLoader("bod-eodstatus")

}
function stopBodLoader() {

    $('#bod-eodstatus #bod-eodstatus-expand').css("display", "block")
    $('#bod-eodstatus #bod-eodstatus-nodata').css("display", "block")
    $('#bod-eodstatus #site-data').css("display", "block")
    stopLoader("bod-eodstatus")

}
