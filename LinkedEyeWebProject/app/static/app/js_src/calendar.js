var dataResponse;
var bodeodFinalStatus = '';
var connectionTries = 6;
var isWSConnected = false;
sites = []
var siteHtml = ' '
selectedsite = ' '
var bodSiteResponse
var bodSitesData = [];
var bodeodResponse;

$(document).ready(function () {
    getCalendarData()
    
})

/*function makeWebSocConnection() {
    //var ws = new WebSocket('wss://le-fs-dev-asp-rtl-actv1.finspot.in/websocket/ws/');
    //var wss = new WebSocket('wss://le-fs-dev-asp-rtl-htspr1.finspot.in/websocket/ws/');
    var client1 = Stomp.client('wss://le-fs-dev-asp-rtl-actv1.finspot.in/websocket/ws/');
    var client2 = Stomp.client('wss://le-fs-dev-asp-rtl-htspr1.finspot.in/websocket/ws/');
   // var client1 = Stomp.over(ws);
   // var client2 = Stomp.over(wss);

    var on_connect = function () {
        console.log('connected--->');
    };
    var on_error = function () {
        console.log('error---->');
    };
    client1.connect('linkedeye', 'linkedeye', on_connect, on_error, '/');
    client2.connect('linkedeye', 'linkedeye', on_connect, on_error, '/');
}*/

function getCalendarData() {
    showLoader("calendar")
    requestDataFromServer('/calendar/getCalendarData', {}, "GET").done(calendarDataResponse)
  //  makeWebSocConnection()
}

function myFunction(select) {
    var icon = select.querySelector("i");
    icon.classList.toggle('mdi-menu-right');
    icon.classList.toggle('mdi-menu-down');
}

function calendarDataResponse(response) {
    //console.log("displayKeys(obj)---->" + JSON.stringify(response))
    stopLoader("calendar")
    if (response == undefined)
        return;
    if (response.status == 200) {
        dataResponse = response.responseData;
        if (response.responseData.length > 0) {
            finalHtml = ' '
            mfinalHtml = ' '
            $("#calendar #data tbody").empty()
            response.responseData.forEach(function (obj) {
               // console.log("display-------->" + JSON.stringify(obj.key))
                if (obj.key === "Holiday") {
                   // console.log("display--holi------>")
                    html = displayKeys(obj)
                    finalHtml = finalHtml + html
                    $("#calendar #data #holiday").append(finalHtml)
                } else if (obj.key === "Mock") {
                   // console.log("display----mock---->")
                    html = displaymockKeys(obj)
                    mfinalHtml = mfinalHtml + html
                    $("#mockcalendar #mockdata #mock").append(mfinalHtml)
                }
            });
           // $("#calendar #data tbody").append(finalHtml)
        }
        else {
            $("#calendar #data").css('display', 'none');
            $("#calendar #calendar-nodata").css('display', 'block');
            $("#calendar #nodatamessage").text('No Data');
        }
    }
    else {
        $("#calendar #data").css('display', 'none');
        $("#calendar #calendar-nodata").css('display', 'block');
        $("#calendar #nodatamessage").text(response.msg);
    }
}

function displayKeys(objData) {
  //  console.log("displayKeys-------->" + JSON.stringify(objData))
    keyHtml = '';
    var keyData = objData.key_data;
    var data = keyData['data'];
    rowHtml = '';
    var divId = objData.key;
    if (keyData['type'] == 'matrix') {
        var temp = ''
        $.each(data, function (key) {
            html = '<td style="border: 1px solid #303234;">' + key + '</td>'
            var tempHtml = ''
            var tempData = data[key]
            $.each(tempData, function (key1, val1) {

                var obj = tempData[key1]
                tempHtml += '<td style="text-align:center;min-width:30vh;border: 1px solid #303234;">' + obj + '</td>'
            })
            html = html + tempHtml
            temp += '<tr class="" style="border: 1px solid #303234;">' + html + '</tr>'
        })
        rowHtml = temp;
    }
    else {
        var temp = ''
        for (var i = 0; i < data.length; i++) {
            tempHtml = ''
            $.each(data[i], function (key, val) {
                if (typeof (val) == 'object')
                    val = JSON.stringify(val)
                else {
                    if (key != 'isSuccess')
                        tempHtml += '<td>' + val + '</td>'
                }
            })
            temp += '<tr>' + tempHtml + '</tr>'
        }
        rowHtml = temp
    }
   // console.log("objData---->" + objData.key)
    var value = objData.key
    keyName = value
    keyHtml += '<tr class="collapse-tr parent row" id="' + objData.key + '">'
    keyHtml += '<td class="col-10">'
    keyHtml += ' <a data-toggle="collapse" class="accordion-toggle" href="#' + divId + '-data' + '">'
    keyHtml += '<h4 class="card-title" style="margin-left: 10px; margin-top: 3px;margin-bottom:1.125rem;position:absolute">' + keyName + '</h4>'
    keyHtml += '<td>'
    keyHtml += '<td class="col-2 action-btn float-right text-right mob-cal" style="left: -10%;">'
    keyHtml += '<button class="btn btn-default btn-ripple accordion-toggle calendar" onclick="myFunction(this)" data-toggle="collapse" data-target="#' + divId + '-data' + '">'
    keyHtml += '<i class="mdi mdi-menu-down"></i>'
    keyHtml += '</button>'
    keyHtml += '</td>'
    keyHtml += '</a>'
    keyHtml += '</td>'
    keyHtml += '</tr>'
    keyHtml += '<tr class="border-0 collapse-content row" id="child-' + objData.key + '">'
    keyHtml += '<td colspan="12" class="hiddenRow  p-0 col-12">'
    keyHtml += '<div class="accordian-body collapse col-12 border-b show" id="' + divId + '-data' + '">'
    //keyHtml += '<div class="row card-body py-lg-4 py-2 card">'
    keyHtml += '<div class="row card-body py-lg-4 py-2">'
    keyHtml += '<div class="col-12">'
    keyHtml += '<h5 class="size14" style="margin-left: 10px; margin-top: 3px;">Executed On : ' + keyData['executedOn'] + '</h5>'
    keyHtml += '</div>'
    keyHtml += '<div id="table-view" class="col-12 table-fixed-header" style="overflow-x:auto;">'; // Add 'table-fixed-header' class here
    keyHtml += '<div class="col-12 table-container" style="max-height: 300px; overflow-y: scroll;">';
    keyHtml += '<table id="data">';
    keyHtml += '<thead class="table-head">';
    keyHtml += '<tr class="text-uppercase size12 bold-text" style="text-align: center;font-size: 16px;">';
    theadHtml = ''
    if (keyData['type'] == 'matrix') {
        theadHtml += '<td></td>'
        $.each(data[Object.keys(data)[0]], function (key) {
           // console.log("if----->" + JSON.stringify(key))
            theadHtml += '<td>' + key + '</td>'
        })
    }
    else {
        $.each(data[0], function (key) {
           // console.log("else----->" + JSON.stringify(key))
            if (key != 'isSuccess')
                theadHtml += '<td>' + key + '</td>'
        })
    }
    keyHtml = keyHtml + theadHtml
    keyHtml += '</tr>';
    keyHtml += '</thead>';
    keyHtml += '<tbody class="accordion list" id="accordionExample">';
    keyHtml = keyHtml + rowHtml;
    keyHtml += '</tbody>';
    keyHtml += '</table>';
    keyHtml += '</div>';
    keyHtml += '</div>';
    keyHtml += '</div>';
    keyHtml += '</div>'
    keyHtml += '</td >'
    keyHtml += '</tr>'
    return keyHtml;
}// JavaScript source code

function displaymockKeys(objData) {
   // console.log("displayKeys--mock------>" + JSON.stringify(objData))
    keyHtml = '';
    var keyData = objData.key_data;
    var data = keyData['data'];
    rowHtml = '';
    var divId = objData.key;
    if (keyData['type'] == 'matrix') {
        var temp = ''
        $.each(data, function (key) {
            html = '<td style="border: 1px solid #303234;">' + key + '</td>'
            var tempHtml = ''
            var tempData = data[key]
            $.each(tempData, function (key1, val1) {

                var obj = tempData[key1]
                tempHtml += '<td style="text-align:center;min-width:30vh;border: 1px solid #303234;">' + obj + '</td>'
            })
            html = html + tempHtml
            temp += '<tr class="" style="border: 1px solid #303234;">' + html + '</tr>'
        })
        rowHtml = temp;
    }
    else {
        var temp = ''
        for (var i = 0; i < data.length; i++) {
            tempHtml = ''
            $.each(data[i], function (key, val) {
                if (typeof (val) == 'object')
                    val = JSON.stringify(val)
                else {
                    if (key != 'isSuccess')
                        tempHtml += '<td>' + val + '</td>'
                }
            })
            temp += '<tr>' + tempHtml + '</tr>'
        }
        rowHtml = temp
    }
   // console.log("objData---->" + objData.key)
    var value = objData.key
    keyName = value
    keyHtml += '<tr class="collapse-tr parent row" id="' + objData.key + '">'
    keyHtml += '<td class="col-10">'
    keyHtml += ' <a data-toggle="collapse" class="accordion-toggle" href="#' + divId + '-data' + '">'
    keyHtml += '<h4 class="card-title" style="margin-left: 10px; margin-top: 3px;margin-bottom:1.125rem;position:absolute">' + keyName + '</h4>'
    keyHtml += '<td>'
    keyHtml += '<td class="col-2 action-btn float-right text-right mob-cal" style="left: -10%;">'
    keyHtml += '<button class="btn btn-default btn-ripple accordion-toggle calendar" onclick="myFunction(this)" data-toggle="collapse" data-target="#' + divId + '-data' + '">'
    keyHtml += '<i class="mdi mdi-menu-down"></i>'
    keyHtml += '</button>'
    keyHtml += '</td>'
    keyHtml += '</a>'
    keyHtml += '</td>'
    keyHtml += '</tr>'
    keyHtml += '<tr class="border-0 collapse-content row" id="child-' + objData.key + '">'
    keyHtml += '<td colspan="12" class="hiddenRow  p-0 col-12">'
    keyHtml += '<div class="accordian-body collapse col-12 border-b show" id="' + divId + '-data' + '">'
    //keyHtml += '<div class="row card-body py-lg-4 py-2 card">'
    keyHtml += '<div class="row card-body py-lg-4 py-2">'
    keyHtml += '<div class="col-12">'
    keyHtml += '<h5 class="size14" style="margin-left: 10px; margin-top: 3px;">Executed On : ' + keyData['executedOn'] + '</h5>'
    keyHtml += '</div>'
    keyHtml += '<div id="table-view" class="col-12 table-fixed-header" style="overflow-x:auto;">'; // Add 'table-fixed-header' class here
    keyHtml += '<div class="col-12 table-container" style="max-height: 300px; overflow-y: scroll;">';
    keyHtml += '<table id="data">';
    keyHtml += '<thead class="table-head">';
    keyHtml += '<tr class="text-uppercase size12 bold-text" style="text-align: center;font-size: 16px;">';
    theadHtml = ''
    if (keyData['type'] == 'matrix') {
        theadHtml += '<td></td>'
        $.each(data[Object.keys(data)[0]], function (key) {
           // console.log("if----->" + JSON.stringify(key))
            theadHtml += '<td>' + key + '</td>'
        })
    }
    else {
        $.each(data[0], function (key) {
           // console.log("else----->" + JSON.stringify(key))
            if (key != 'isSuccess')
                theadHtml += '<td>' + key + '</td>'
        })
    }
    keyHtml = keyHtml + theadHtml
    keyHtml += '</tr>';
    keyHtml += '</thead>';
    keyHtml += '<tbody class="accordion list" id="accordionExample">';
    keyHtml = keyHtml + rowHtml;
    keyHtml += '</tbody>';
    keyHtml += '</table>';
    keyHtml += '</div>';
    keyHtml += '</div>';
    keyHtml += '</div>';
    keyHtml += '</div>'
    keyHtml += '</td >'
    keyHtml += '</tr>'
    return keyHtml;
}// JavaScript source code
