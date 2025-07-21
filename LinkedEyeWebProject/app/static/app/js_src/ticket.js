

var assignee_list = '';
var user_list = '';
var status_list = '';
var user_name = ''
var checkbx = ''


google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(displayStatusChart);


$(document).ready(function () {
    // data has to come from static database
    var hostPie = { "NEW": 0, "IN PROGRESS": 0, "RESOLVED": 0, "FEEDBACK": 0, "CLOSED": 0, "REJECTED": 0 }
    var hostkey = Object.keys(hostPie);
    var hostvalue = Object.values(hostPie);
    overviewgauges('Overview', hostkey, hostvalue, 'container-hosts');
    $('#create_ticket').hide();
    $('#update_ticket').show();
    $('#secretstatus').text('EDIT');

   // $('#visualization').css("display", "block")
    //timeline = new links.Timeline(document.getElementById('visualization'), options);
    //onRangeChanged(timeline);
});


function fillHostServiceCount(response) {
    var ticketSatus = Object.keys(response);
    var ticketCount = Object.values(response);


    overviewgauges('Overview', ticketSatus, ticketCount, 'container-hosts');
    //overviewgauges('Hosts', hostkey, hostvalue, 'container-hosts');

}


colors = {
    'New': "#FF6060",
    'Closed': "#00D2A1",
    'Resolved': "#00D2A1",
    'Rejected': "#00D2A1",
    'Progress': "#FDB278",
    'Feedback': "#7B7B7B"
}
var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
requestData = {};
var startdate;
var enddate;
statuses = [];
users = [];
var dataType = 'user';
user = '';
ticketId = 1;
var loginuser = '';
selecteduser = '';
timeline = '';
isInfopage = false;
isClickonticket = false;
selectedRow = 0;
ticketOverviewData = [];
isChartloaded = false;
isUpdateTicket = false;
isClickedOnCluster = false;
totalOverviewData = [];
var connectionTries = 6;
var ticketSiteResponse;
var allTicketResponse;
var ticketSitesData = [];


$(document).ready(function () {

    $('.teamlist .users:first').addClass('active');
    $('.usersection-content:not(:first)').hide();
    $('.teamlist ul li a').click(function (event) {
        event.preventDefault();
        var content = $(this).attr('href');
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        $(content).show();
        $(content).siblings('.usersection-content').hide();
    });
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('isInfopage')) {
        isInfopage = urlParams.get('isInfopage');
        changePageHeader('Ticket Analysis')
    }

    if (urlParams.get('isClickonticket')) {
        isClickonticket = urlParams.get('isClickonticket');
        selectedRow = urlParams.get('selectedRow');
    }

    if (urlParams.get('site')) {
        ticketSelectedsite = urlParams.get('site');
    }

});
function getStatuses(siteData) {
    //console.log('GETSTATUSES --->' + JSON.stringify(siteData))
    requestDataFromServer("/ticket/getStatuses", { sitename: params.get("site") }, type = "GET").done(function (response) {
        statuses = response
        var html = '';
        var status_html = '';
        if (statuses) {
            if (isInfopage) {
                statuses.forEach(element => {
                    html += '<a class="select-link dropdown-item position-relative" onclick="onSelectStatus(\'' + element.name + '\')">' + element.name + '</a>'
                    status_html += '<a class="select-link dropdown-item position-relative" onclick="onSelectStatus2(\'' + element.name + '\')">' + element.name + '</a>'
                });
                $("#statuslist").append(html);
                status_list = status_html
                $("#selectStatus").html(statuses[0].name);
            }
        }
        // dispalyTickets();  
        ticketResponse(siteData)
    });
}
function getUsers() {

    var tracker_html = '' 
    tracker_html += '<a class="select-link dropdown-item position-relative" onclick = "onSelectTracker2(\'' + "Bug" + '\')">Bug</a>'
    tracker_html += '<a class="select-link dropdown-item position-relative" onclick = "onSelectTracker2(\'' + "Feature" + '\')">Feature</a>'
    tracker_html += '<a class="select-link dropdown-item position-relative" onclick = "onSelectTracker2(\'' + "Support" + '\')">Support</a>'
    //console.log('Tracker_html ---->' + tracker_html)
    $("#trackerid2").append(tracker_html);
    $("#selectTracker2").text('Bug')
    requestDataFromServer("/ticket/getUsers", { sitename: params.get("site") }, type = "GET").done(function (response) {
        //console.log('GETUSERS ---> ' + JSON.stringify(response))
        users = response.userList;
        var html = '';
        var html1 = '';
        var assignee_html = '';
        if (users) {
            (users).forEach(element => {
                html += '<a class="select-link dropdown-item position-relative" onclick="onSelectuser(\'' + element.login + '\')">' + element.login + '</a>'
                html1 += '<a class="select-link dropdown-item position-relative" onclick="onSelectAssignee(\'' + element.login + '\')">' + element.login + '</a>'
                assignee_html += '<a class="select-link dropdown-item position-relative" onclick="onSelectAssignee2(\'' + element.login + '\')">' + element.login + '</a>'
            });



            //console.log('HTML1---> ' + html1)
            $("#userList").append(html)
            $("#assigneelist").append(html1);
            assignee_list = assignee_html
            user_list= html
            
        }
        changeUserText(response.user)
    });
}
function getactions(ticketId) {
    requestDataFromServer("/ticket/getactions", { 'ticketId': JSON.stringify(ticketId), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, type = "post").done(function (response) {
        displayActions(response)
    });
}
function displayActions(response) {
    if (response) {
        var html = '';
        $('#list-timeline').empty()
        count = response.length
        for (i = (count - 1); i >= 0; i--) {
            if (response[i].notes) {
                html += '<li class="timeline my-3">'
                html += '<div class="timeline-inner">'
                html += '<div class="icon-outline"><i class="icon-calender"></i></div>'
                html += '<div class="timeline-content d-flex">'
                html += '<span class="username"> <a>' + selecteduser + '&nbsp;</a>' + response[i].notes + '<span class="size12 grey-text d-block">' + response[i].created_on + '</span></span></div>'
                html += '</div>'
                html += '</li>'
            }
        }
        if (response.length == 0 || html == '') {
            element = document.getElementById('nodata')
            element.style.display = "block";
            element.innerHTML = 'No time log available for this Ticket'
        }
        else {
            $("#list-timeline").append(html);
            document.getElementById('nodata').style.display = "none";
        }
    }
    if (dataType == 'team' && loginuser != selecteduser) {
        $('#assigneelist').css("display", "none");
        $('#statuslist').css("display", "none");
        document.getElementById('submit').disabled = true;
    }
    else {
        $('#assigneelist').css("display", '');
        $('#statuslist').css("display", '');
        document.getElementById('submit').disabled = false;
    }
}
function dispalyTickets(siteresponse) {
    //console.log('DISPLAYTICKETS --->' + siteresponse)
    showLoader("dashboard-tickets")
    showLoader("tickets-card")
    //console.log('SITERESPONSE OF DISPALYTICKETS---> ' + JSON.stringify(siteresponse))
    requestDataFromServer("/ticket/getAllTickets", { 'site': JSON.stringify(siteresponse), sitename: siteresponse.sitename }, type = "GET").done(allSiteTicketsResponse);
}

function getactions(ticketId) {
    requestDataFromServer("/ticket/getactions", { 'ticketId': JSON.stringify(ticketId), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, type = "post").done(function (response) {
        displayActions(response)
    });
}
function displayActions(response) {
    if (response) {
        var html = '';
        $('#list-timeline').empty()
        count = response.length
        for (i = (count - 1); i >= 0; i--) {
            if (response[i].notes) {
                html += '<li class="timeline my-3">'
                html += '<div class="timeline-inner">'
                html += '<div class="icon-outline"><i class="mdi mdi-calendar" style="color:#6c757d"></i></div>'
                html += '<div class="timeline-content d-flex">'
                html += '<span class="username"> <a>' + selecteduser + '&nbsp;</a>' + response[i].notes + '<span class="size12 grey-text d-block">' + response[i].created_on + '</span></span></div>'
                html += '</div>'
                html += '</li>'
            }
        }
        if (response.length == 0 || html == '') {
            element = document.getElementById('nodata')
            element.style.display = "block";
            element.innerHTML = 'No time log available for this Ticket'
        }
        else {
            $("#list-timeline").append(html);
            document.getElementById('nodata').style.display = "none";
        }
    }
    if (dataType == 'team' && loginuser != selecteduser) {
        $('#assigneelist').css("display", "none");
        $('#statuslist').css("display", "none");
        document.getElementById('submit').disabled = true;
    }
    else {
        $('#assigneelist').css("display", '');
        $('#statuslist').css("display", '');
        document.getElementById('submit').disabled = false;
    }
}

function allSiteTicketsResponse(response) {//this is for total data

    //console.log('ALLSITETICKETSRESPONSE --->' + JSON.stringify(response))
   
    const ticketCharacter = Math.random().toString(36).substring(2, 5);

    stopLoader("dashboard-tickets")
    stopLoader("tickets-card")
    if (response == undefined)
        return;

    allTicketResponse = response.responseData;
    loginuser = response['user']
    selecteduser = response['selecteduser']

    var tempObj = {}
    tempObj['site'] = response['selectedSite']
    tempObj['isSuccess'] = true
    tempObj['isWSConnected'] = false
    tempObj['criticalTicketCount']
    siteTickets = response.siteData


    if (siteTickets.overviewList.length > 0) {
        var statusObj = siteTickets.overviewList.filter(x => x.name == "New")[0]
        if (statusObj.issuecount > 0) {
            tempObj['isSuccess'] = false
            tempObj['criticalTicketCount'] = statusObj.issuecount;
        }
    }

    ticketSitesData.push(tempObj)
    var tempSiteObj = ticketSiteResponse[0] //.filter(x => x.sitename === obj.site)[0]
    makeWsConnection(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalTicketCount'], ticketCharacter)

    var sSitehtml = ''
    var fSitehtml = ''

    $("#tickettemplate #site-list").empty()
    ticketSitesData.forEach(function (obj, index) {
        if (obj.isSuccess) {
            //sSitehtml += '<span class="indicator-circle" style="background: #ff3d57; z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="nav-link green bold-text" data-id="' + obj.site + '" id="' + obj.site + '" data-toggle="tab" onclick="onTicketSiteTabchange(\'' + obj.site + '\')"> <i class="mdi mdi-circle" id="icon-chats"></i></a>'
            sSitehtml += '<div class="page-header"> ' + obj.site + '&ensp;>&ensp;Ticket Status</div>'
        }
        else {
            //fSitehtml += '<span class="indicator-circle" style="background: #ff3d57; z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="nav-link red bold-text" data-id="' + obj.site + '"  id="' + obj.site + '" data-toggle="tab" onclick="onTicketSiteTabchange(\'' + obj.site + '\')"><i class="mdi mdi-circle" id="icon-chats"></i></a>'
            fSitehtml += '<div class="page-header"> ' + obj.site + '&ensp;>&ensp;Ticket Status</div>'
        }
    });
    $("#ticketpage #ticket_title").append(fSitehtml);
    $("#ticketpage #ticket_title").append(sSitehtml);
    ticketSelectedsite = response.selectedSite
    $("#ticketpage #ticket_title #" + ticketSelectedsite).addClass('active');
    var obj = allTicketResponse//.filter(x => x.site === ticketSelectedsite)[0]
    if (isInfopage) {
        getUsers();
    }
    
    getStatuses(response.siteData);
}


function onTicketSiteTabchange(sitename, siteObj = {}) {
    const alphabetical = "abcdefghijklmnopqrstuvwxyz"
    const ticketrandom = alphabetical[Math.floor(Math.random() * alphabetical.length)]
    ticketSelectedsite = sitename;
    $('#tickettemplate #site-list li a.active').removeClass('active');
    $('#tickettemplate #site-list #' + sitename + '_li ' + 'a').addClass('active');
    if (siteObj == {}) {
        var tempSiteObj = ticketSitesData[0]  //.filter(x => x.site === sitename)[0]
        var criticalTicketCount = tempSiteObj.criticalTicketCount;
        if (tempSiteObj.isWSConnected == false) {
            tempSiteObj = ticketSiteResponse[0] //.filter(x => x.sitename === sitename)[0]
            makeWsConnection(tempSiteObj.websocket_url, sitename, 0, criticalTicketCount, ticketrandom)
        }
    }
    else {
        var tempSiteObj = siteObj
        var criticalTicketCount = 0;
        makeWsConnection(tempSiteObj.websocket_url, sitename, 0, criticalTicketCount, ticketrandom)
    }

    $('#visualization').css("display", "none")
    showLoader("dashboard-tickets")
    showLoader("tickets-card")
    requestDataFromServer("/ticket/getTicket", { sitename: params.get("site") }, type = "GET").done(function (response) {
        ticketResponse(response)
    });
}
function ticketResponse(response) {
    //console.log('TICKETRESPONSE ---> ' + JSON.stringify(response))

    ///////////////////////////////////////////////////////////////////////

    //$('#secretstatus').text('NEW');
    $('#selectAssignee2').text(user_name);
    $('#selectStatus2').text('New');
    //$("#assigneelist2").append(assignee_list);
    $("#statuslist2").append(status_list);

    ///////////////////////////////////////////////////////////////////////

    $('#visualization').css("display", "block")
    stopLoader("dashboard-tickets")
    stopLoader("tickets-card")
    tickets = [];
    ticketOverviewData = [];
    if (response == undefined)
        return;
    data = [];
    tickets = response['overviewList']
    for (i in tickets) {
        item = {}
        item["id"] = tickets[i]['id']
        item["content"] = tickets[i]['id']
        item["start"] = new Date(tickets[i]["created_on"])
        status = tickets[i]['name']
        status == 'In Progress' ? item['className'] = 'Progress' : item['className'] = status;
        data.push(item)
    }
    var options = {
        'width': '100%',
        'height': '100px',
        'clusterMaxItems': 2,
        'cluster': true,
        'zoomMin': 86400000
    };
    try {
        timeline = new links.Timeline(document.getElementById('visualization'), options);
    }
    catch (error) {
        //console.log(error)
    }
    if (isInfopage)
        //links.events.addListener(timeline, 'onload', onRangeChanged);
        //onRangeChanged(timeline)
        links.events.addListener(timeline, 'rangechanged', onRangeChanged);
    links.events.addListener(timeline, 'select', onTicketselect);
    loginuser = response['user']
    try {
        timeline.draw(data);
    }
    catch (error) {
       // swal('Not able to draw chart', ' ', "error");
    }
    if (loginuser != 'admin') {
        var mindate = moment()
        var maxdate = moment().add(1, 'days')
        if (!isInfopage) {
            options["min"] = new Date(mindate.year(), mindate.month(), mindate.date()),
                options["max"] = new Date(maxdate.year(), maxdate.month(), maxdate.date())
        }
        timeline.setVisibleChartRange(new Date(mindate.year(), mindate.month(), mindate.date()), new Date(maxdate.year(), maxdate.month(), maxdate.date()))
    }
    draw_tickets_init(timeline)
    selecteduser = response['selecteduser']
    // makeWsConnection();
    if (isInfopage) {
        if (response['overviewList'])
            ticketOverviewData = response['overviewList']
        if (response['total_overviewList'])
            totalOverviewData = response['total_overviewList']
        $('#userId').text(selecteduser);
        displayTicketOverview();
        if (isClickonticket) {
            obj = selectedRow;
            var tempObj = JSON.parse(obj)
            key = Object.keys(tempObj)[0]
            if (key == 'row') {
                isClickedOnCluster = false;
                onTicketselect(tempObj[key]);
            }
            else {
                isClickedOnCluster = true;
                document.getElementById('clusterTickets').style.visibility = 'visible';
                clickedOnCluster(tempObj[key])
            }
        }
        else {
            if (tickets.length > 0) {
               // onTicketselect(0);
            }
            else {
                clearAllvalues()
            }
        }

    }
}
function draw_tickets_init(properties) {
    var timeline = properties
    var timelineRange = properties.getVisibleChartRange();
    //console.log('Timeline Start:', timelineRange.start);
    //console.log('Timeline End:', timelineRange.end);
    data = {};
    startdate = properties.start
    data['startdate'] = moment(startdate).format("YYYY-MM-DD")
    // data['startdate'] = startdate.toISOString()
    enddate = properties.end
    //var today = new Date()
    //data['enddate'] = today.format("YYYY-MM-DD")
    data['enddate'] = moment(enddate).format("YYYY-MM-DD") //no need to fetch tickets for future days
    // data['enddate'] = enddate.toISOString()
    data['user'] = dataType;
    data['isTotalOverview'] = false;
    if (dataType == 'team') {
        data['userid'] = $('#selectUser').text()
    }
    requestData["data"] = data;
    requestDataFromServer('/ticket/getTicket', { 'clientData': JSON.stringify(requestData), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, "POST").done(function (response) {
        //console.log('draw_tickets_init RESPONSE ---> ' + JSON.stringify(response))
        var newStartDate = startdate ? new Date(startdate) : ' ';
        var newEndDate = enddate ? new Date(enddate) : ' ';
        data = [];
        tickets = response['resultsList'];
        selecteduser = response['selecteduser'];
        changeUserText(selecteduser)
        for (i in tickets) {
            item = {}
            item["id"] = tickets[i]['id']
            item["content"] = tickets[i]['id']
            item["start"] = new Date(tickets[i]["created_on"])
            status = tickets[i]['status']['name']
            status == 'In Progress' ? item['className'] = 'Progress' : item['className'] = status;
            data.push(item)
        }
        try {
            timeline.draw(data);
        }
        catch (error) {
            swal('Not able to show tickets. Please try again.', ' ', "error");
        }
        if (startdate != ' ') {
            timeline.setVisibleChartRange(newStartDate, newEndDate);
        }
        else {
            timeline.setVisibleChartRangeAuto();
        }

    });
}
function displayTicketOverview() {
    var html = '';
    var ticketCount = 0;
    $('#overview').empty()
    var tempStatusArray = [];
    var tempStatusDict = {}
    tempStatusArray.push(['Status', 'Total Tickets']);
   // console.log('ticketOverviewData----->' + ticketOverviewData)
    //console.log('statuses----->' + JSON.stringify(statuses))

    //tempStatusDict['Status'] = 'Total Tickets';
    statuses.forEach(element => {
        obj = {};
        obj['id'] = element.id;
        obj['name'] = element.name;
        obj['issuecount'] = 0

      //  console.log('typeof (ticketOverviewData) == object' + (typeof (ticketOverviewData) == 'object'))
      //  console.log('typeof (ticketOverviewData)' + (typeof (ticketOverviewData)))
        if (typeof (ticketOverviewData) == 'object') {
            if (!ticketOverviewData.some(el => el.id == element.id)) {
                ticketOverviewData.push(obj)
            }
    }
        if (typeof (totalOverviewData) == 'object') {
            if (!totalOverviewData.some(el => el.id == element.id) ) {
                totalOverviewData.push(obj)
            }
        }
    });
    var colorsArray = [];

    ticketOverviewData.forEach(element => {
        tempStatusArray.push([element.name, Number(element.issuecount)]);
        tempStatusDict[element.name] = Number(element.issuecount);
        ticketCount += Number(element.issuecount);
        element.name == 'In Progress' ? status = 'Progress' : status = element.name;
        colorsArray.push(colors[status])
        totaltickets = totalOverviewData.find(x => x.id === element.id).issuecount; // total tickets irrespective of time range
        if (element.name == 'New' && element.issuecount > 0)
            html += '<div class="opt mb-2"> <span class="indicator ' + status + '-bg"></span> <span class="mx-2">' + element.name + '(' + totaltickets + ')' + '</span><span class="float-right">' + element.issuecount + '<span class="beat"></span> </span> </div>'
        else
            html += '<div class="opt mb-2"> <span class="indicator ' + status + '-bg"></span> <span class="mx-2">' + element.name + '(' + totaltickets + ')' + '</span><span class="float-right">' + element.issuecount + '</span> </div>'
    });
    $('#overview').append(html);
    //fillHostServiceCount(tempStatusArray)
    //console.log('tempStatusDict --- > ' + JSON.stringify(tempStatusDict))
    fillHostServiceCount(tempStatusDict)

    $("#total-tickets").html(ticketCount);
}
function onTicketselect(rowId) {
    //console.log('ONTICKETSELECT CHECKBX CHECKED---> ' + (checkbx.checked == true) )
    if (checkbx.checked == true) {
        checkbx.checked = false;
        checkbx.dispatchEvent(new Event('change'));
    }
    if (isInfopage == false) {
        window.location.href = window.location.origin + '/ticket/?isInfopage=true&site=' + entitySelectedsite + '&isClickonticket=true&selectedRow=' + encodeURIComponent(JSON.stringify(getSelectedRow()))
    }
    else {
        if (rowId != null) {
            row = rowId;
            isClickedOnCluster = false;
        }
        else {
            obj = getSelectedRow()
            key = Object.keys(obj)[0]
            if (key == 'row') {
                row = obj[key]
                isClickedOnCluster = false;
            }
            else {
                isClickedOnCluster = true;
                document.getElementById('clusterTickets').style.visibility = 'visible';
                clickedOnCluster(obj[key])
            }
        }
        if (isClickedOnCluster == false) {
            $('#ticketinfo #info').empty()
            $('#ticketinfo #ticketDescription').empty()
            $('#ticketinfo #ticketSubject').empty()
            var html = ''
            if (row != undefined) {
                var ticketInfo = {}
                if (tickets[row]) {
                    ticketInfo = tickets[row]
                    if (ticketInfo.assigned_to) {
                        ticketInfo.assigned_to['id'] = ticketInfo.assigned_to['id']
                    } else {
                        
                        ticketInfo.assigned_to = {}
                        ticketInfo.assigned_to['id'] = 1
                    }
                    //console.log('IF select ticket ticketinfo ---> ' + JSON.stringify(ticketInfo))
                    var user = users.filter(x => x.id == ticketInfo.assigned_to['id'])[0]
                    //console.log('onTicketselect ---> ' + user.login)
                    $('#selectAssignee').text(user.login);
                    html += '<div class="py-1 my-1">' + ticketInfo.id + '</div>'
                    html += '<div class="py-1 my-1">' + ticketInfo.created_on + '</div>'
                    $('#ticketinfo #info').append(html)
                    document.getElementById("ticketDescription").innerHTML = ticketInfo.description;
                    document.getElementById("ticketSubject").innerHTML = ticketInfo.subject;
                    // var obj = statuses.filter(x => x.id == ticketInfo.status['id'])[0]
                    status = ticketInfo.status.name
                    $('#selectStatus').text(ticketInfo.status.name)//should add .name
                    element = document.getElementById('ticketstatus')
                    element.style.visibility = 'visible';
                    element.innerHTML = status;
                    status == 'In Progress' ? classValue = 'white-text py-1 px-2 size12 radius-8' + ' Progress-bg' : classValue = 'white-text py-1 px-2 size12 radius-8 ' + status + '-bg';
                    element.setAttribute("class", classValue);
                    ticketId = ticketInfo.id;
                    getactions(ticketId)
                }
                else {
                    var timelineData = timeline.getData();
                    if (timelineData[row]) {
                        var tempId = timelineData[row].id
                        requestDataFromServer("/ticket/getTicketInfo", { 'ticketId': JSON.stringify(tempId), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, type = "post").done(function (response) {
                            if (response['status'] == 200) {
                                //console.log('ELSE select ticket response --->' + JSON.stringify(response))
                                ticketInfo = response
                                html += '<div class="py-1 my-1">' + ticketInfo.id + '</div>'
                                html += '<div class="py-1 my-1">' + ticketInfo.created_on + '</div>'
                                $('#ticketinfo #info').append(html)
                                document.getElementById("ticketDescription").innerHTML = ticketInfo.description;
                                document.getElementById("ticketSubject").innerHTML = ticketInfo.subject;
                                // var obj = statuses.filter(x => x.id == ticketInfo.status_id)[0]
                                // status = obj.name
                                status = ticketInfo.status['name']
                                $('#selectStatus').text(status)
                                element = document.getElementById('ticketstatus')
                                element.style.visibility = 'visible';
                                element.innerHTML = status;
                                status == 'In Progress' ? classValue = 'white-text py-1 px-2 size12 radius-8' + ' Progress-bg' : classValue = 'white-text py-1 px-2 size12 radius-8 ' + status + '-bg';
                                element.setAttribute("class", classValue);
                                ticketId = ticketInfo.id;
                                displayActions(ticketInfo.journals)
                            }
                            else {
                                swal({
                                    title: "Error",
                                    text: "Cannot load tickets \"" + response['message'],
                                    type: "info",
                                    showCancelButton: true,
                                    cancelButtonText: "close",
                                    closeOnConfirm: true,
                                    closeOnCancel: true
                                })
                            }
                        });
                    }
                }
            }

        }
    }
}
function clickedOnCluster(index) {
    clusterObj = timeline.getCluster(index)
    var html = '';
    var temphtml = '';
    $("#ticketList").empty();
    var ticketbgcolor = ''
    if (clusterObj.items) {
        (clusterObj.items).forEach(element => {
            element.className == 'In Progress' ? ticketbgcolor = 'Progress' : ticketbgcolor = element.className;
            if (element.className == 'New')
                temphtml += '<a class="dropdown-item size16 border-b" onclick="onSelectTicket(' + element.id + ')">' + element.id + '<span class="white-text ' + ticketbgcolor + '-bg py-1 px-2 radius-8 size12">' + element.className + '</span></a>'
            else {
                html += '<a class="dropdown-item size16 border-b" onclick="onSelectTicket(' + element.id + ')">' + element.id + '<span class="white-text ' + ticketbgcolor + '-bg py-1 px-2 radius-8 size12">' + element.className + '</span></a>'
            }
        });
        $("#ticketList").append(temphtml);
        $("#ticketList").append(html);
    }
}
function onSelectTicket(ticketValue) {
    ticketIndex = tickets.findIndex(x => x.id == ticketValue);
    onTicketselect(ticketIndex)
}
function getSelectedRow() {
    var row = undefined;
    var sel = timeline.getSelection();
    if (sel.length) {
        if (Object.keys(sel[0]).length > 0) {
            row = sel[0]
        }
    }
    return row;
}
function onRangeChanged(properties) {
    clearAllvalues()
    data = {};
    startdate = properties.start
    data['startdate'] = moment(startdate).format("YYYY-MM-DD")
    // data['startdate'] = startdate.toISOString()
    enddate = properties.end
    //var today = new Date()
    //data['enddate'] = today.format("YYYY-MM-DD")
    data['enddate'] = moment(enddate).format("YYYY-MM-DD") //no need to fetch tickets for future days
    // data['enddate'] = enddate.toISOString()
    data['user'] = dataType;
    data['isTotalOverview'] = false;
    if (dataType == 'team') {
        data['userid'] = $('#selectUser').text()
    }
    requestData["data"] = data;
    requestDataFromServer('/ticket/getTicket', { 'clientData': JSON.stringify(requestData), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, "POST").done(rangeChangeResponse);
}
function rangeChangeResponse(response) {
    //console.log("rangeChangeResponse---->" + JSON.stringify(response))
    

    if (response.code >= 200 && response.code <300) {
        tickets = [];
       // ticketOverviewData = [];
        var newStartDate = startdate ? new Date(startdate) : ' ';
        var newEndDate = enddate ? new Date(enddate) : ' ';
        if (response == undefined)
            return;
        data = [];
        tickets = response['resultsList'];
       /* if (response['overviewList'])
            ticketOverviewData = response['overviewList'];
        if (response['total_overviewList'])
            totalOverviewData = response['total_overviewList']*/
        selecteduser = response['selecteduser'];
        changeUserText(selecteduser)
        for (i in tickets) {
            item = {}
            item["id"] = tickets[i]['id']
            item["content"] = tickets[i]['id']
            item["start"] = new Date(tickets[i]["created_on"])
            status = tickets[i]['status']['name']
            status == 'In Progress' ? item['className'] = 'Progress' : item['className'] = status;
            data.push(item)
        }
        try {
            timeline.draw(data);
        }
        catch (error) {
            swal('Not able to show tickets. Please try again.', ' ', "error");
        }
        if (startdate != ' ') {
            timeline.setVisibleChartRange(newStartDate, newEndDate);
        }
        else {
            timeline.setVisibleChartRangeAuto();
        }
      //  displayTicketOverview();
        if (tickets.length > 0) {
            if (isUpdateTicket == true) {
                var index = tickets.findIndex(x => x.id == ticketId);
                if (index > 0)
                    onTicketselect(index);
                //else
                //onTicketselect(0);
            }
            // else
            //  onTicketselect(0);
        }
        else {
            clearAllvalues()
        }
        var chart_data = { "New": 0, "In Progress": 0, "Resolved": 0, "Feedback": 0, "Closed": 0, "Rejected": 0 }
        for (i in (response.resultsList)) {
            //console.log('resultslist row tickets --- > ' + JSON.stringify((response.resultsList)[i]))
            //console.log('resultslist row tickets status --- > ' + ((response.resultsList)[i])['status']['name'])
            chart_data[((response.resultsList)[i])['status']['name']] += 1;
        }
        //console.log('CHARTDATA AFTER LOOP --- > ' + JSON.stringify(chart_data))
        fillHostServiceCount(chart_data) //{"New":3,"In Progress":0,"Resolved":1,"Feedback":0,"Closed":1,"Rejected":0}
    } else {
        swal({
            title: "Error",
            text: "Cannot load ticket\"" +response.message,
            type: "info",
            showCancelButton: true,
            cancelButtonText: "No Cancel",
            closeOnConfirm: true,
            closeOnCancel: true
        })
    }
    
}

/*function makeWsConnection(websocketurl, wsitename, tries, ticketCount) {
    try {
        if (window.WebSocket) {
            var destination = "/exchange/ticket_update";
            var wsObject = new WebSocket(websocketurl);
            var sClient = Stomp.over(wsObject);
            sClient.id = wsitename
            sClient.connectionTries = tries;
            sClient.criticalTicketCount = ticketCount;
            var on_wsconnect = function () {
                var obj = ticketSitesData[0] //.filter(x => x.site === sClient.id)[0]
                if (obj)
                    obj.isWSConnected = true;
                var tickethtml = '<div class="" id="ticket-pipe" style="color:#16d39a"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats"> \
                        <span class="tooltiptext"><p><b>Queue Name :</b> ticket_update</p> \
                        <p><b>isConnected :</b> True</p> \
                        <p><b>Reconnect	:</b> '+ connectionTries + '</p></span> \
                    </i> \
                    </div>'
                $('#ticketupdate-indicator').empty()
                $("#ticketupdate-indicator").append(tickethtml);
                sClient.subscribe(destination, function (message) {
                    var tempJson = JSON.parse(message.body);
                    item = {}
                    item["id"] = (tempJson['ticket_number']).toString()
                    item["content"] = tempJson['ticket_number'].toString()
                    item["start"] = new Date(tempJson['datetime'] * 1000)
                    tempJson['ticket_status'] == 'In Progress' ? status = 'Progress' : status = tempJson['ticket_status'];
                    if (status == "New") {
                        sClient.criticalTicketCount++;
                    }
                    else {
                        sClient.criticalTicketCount--;
                    }
                    item["className"] = status + ' newItem';
                    data = {};
                    jsonObj = {};
                    data["user"] = tempJson['ticket_assignee']
                    data["title"] = 'Linkedeye Ticket update'
                    // data["body"] = 'Ticket update received. Ticket status is'+tempJson['ticket_status']+'. Ticket assigned to '+tempJson['ticket_assignee']+'. Ticket number is '+tempJson['ticket_number']
                    url = new URL("/ticket/?isInfopage=true&site=" + sClient.id, window.location.origin)
                    var html = ''
                    html += '<p>Ticket update received. Ticket status is <b>' + tempJson['ticket_status'] + '</b>. Ticket assiged to ' + tempJson['ticket_assignee'] + '.</p>'
                    html += '<p>Ticket number is <a href="' + url + '">' + tempJson['ticket_number'] + '</a></p>'
                    data["body"] = html
                    data["textbody"] = 'Ticket update received. Ticket status is ' + tempJson['ticket_status'] + '. Ticket assigned to ' + tempJson['ticket_assignee'] + '. Ticket number is ' + tempJson['ticket_number']
                    data["template_type"] = "monitoring"
                    data["dataObj"] = { 'ticket_assignee': tempJson['ticket_assignee'], 'ticket_status': tempJson['ticket_status'], 'ticket_number': tempJson['ticket_number'], 'ticket_message': tempJson['ticket_message'], 'url': url };
                    jsonObj["data"] = data;
                    requestDataFromServer('/notificationsettings/sendnotifications', { 'alldata': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(function (res) {
                    });
                    if (sClient.id == ticketSelectedsite) {
                        var timelineData = timeline.getData();
                        var isEntryfound = timelineData.some(el => el.id == tempJson['ticket_number']);
                        if (tempJson['ticket_assignee'] == selecteduser || loginuser == 'admin') {
                            if (!isEntryfound) {
                                timeline.addItem(item)
                                timeline.redraw();
                                timeline.setVisibleChartRangeAuto();
                            }
                            else {
                                var index = timelineData.findIndex(x => x.id == tempJson['ticket_number']);
                                timeline.updateData(index, item)
                                timeline.redraw();
                                timeline.setVisibleChartRangeAuto();
                            }
                        }
                    }
                    changeTicketSiteStatus(sClient.id, sClient.criticalTicketCount)
                });
              //  $("#ticketupdate-indicator").css('color', '#16d39a')
                $("#tickettemplate #" + sClient.id + "-indicator").css('background', '#16d39a')
            };
            var on_wserror = function (error) {
               // $("#ticketupdate-indicator").css('color', '#ff3d57')
                $("#tickettemplate #" + sClient.id + "-indicator").css('background', '#ff3d57')
                var obj = ticketSitesData[0] //.filter(x => x.site === sClient.id)[0]
                if (obj)
                    obj.isWSConnected = false;
                var tickethtml = '<div class="" id="ticket-pipe" style="color:#ff3d57"> \
                    <i class="mdi mdi-close-network-outline tooltip" id="icon-chats"> \
                        <span class="tooltiptext"><p><b>Queue Name :</b> ticket_update</p> \
                        <p><b>isConnected :</b> False</p> \
                        <p><b>Reconnect	:</b> '+ connectionTries + '</p></span> \
                    </i> \
                    </div>'
                $('#ticketupdate-indicator').empty()
                $("#ticketupdate-indicator").append(tickethtml);
                if (networkStatus === 'online') {
                    if (sClient.connectionTries == 10) {
                        swal({
                            title: "Want to get ticket updates?",
                            text: "Not able to connect web socket of \"" + sClient.id + "\". Please check once!.",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonClass: "btn-success",
                            confirmButtonText: "Yes, try again",
                            cancelButtonText: "No Cancel",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                            
                            function (isConfirm) {
                                if (isConfirm) {
                                    makeWsConnection(sClient.ws.url, sClient.id, 0, sClient.criticalTicketCount)
                                    
                                } else {
                                    $("#tickettemplate #" + sClient.id + "-indicator").css('background', '#ff3d57')
                                }
                            });
                        
                    }
                    else {
                        sClient.connectionTries++;
                        var tickethtml = '<div class="" id="ticket-pipe" style="color:#e99123"> \
                            <i class="mdi mdi-help-network-outline tooltip" id="icon-chats"> \
                            <span class="tooltiptext"><p><b>Queue Name :</b> ticket_update</p> \
                        <p><b>isConnected :</b> Trying</p> \
                        <p><b>Reconnect	:</b> '+ connectionTries + '</p></span> \
                            </i> \
                            </div>'
                        $('#ticketupdate-indicator').empty()
                        $("#ticketupdate-indicator").append(tickethtml);
                        makeWsConnection(sClient.ws.url, sClient.id, sClient.connectionTries, sClient.criticalTicketCount)
                    }
                }
            };
            sClient.connect('linkedeye', 'linkedeye', on_wsconnect, on_wserror, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}*/

function changeTicketSiteStatus(site, count) {
    var obj = ticketSitesData[0] //.filter(x => x.site === site)[0]
    if (obj) {
        obj.criticalTicketCount = count;
        if (count == 0) {
            obj.isSuccess = true
            $("#tickettemplate #site-list #" + site + '_li').removeClass("failure").addClass('success')
            $("#tickettemplate #site-list #" + site + '_li a').removeClass("red").addClass('green')
        }
        else {
            obj.isSuccess = false
            $("#tickettemplate #site-list #" + site + '_li').removeClass("success").addClass('failure')
            $("#tickettemplate #site-list #" + site + '_li a').removeClass("green").addClass('red')
        }
    }
}
//function onTabchange(user) {
 //   clearAllvalues()
//    if (user == 'team') {
//        $("#selectUser").parent().css({ "visibility": "visible" });
//    }
//    else {
//        $("#selectUser").parent().css({ "visibility": "hidden" });
//    }
//    data = {};
//    dataType = user;
//    data['user'] = dataType;
//    if (loginuser != 'admin') {
//        startdate = moment().format("YYYY-MM-DD") + 'T00:00:00Z';
 //       enddate = moment().add(1, 'days').format("YYYY-MM-DD") + 'T00:00:00Z';
//    }
 //   else {
 //       startdate = ' ';
//        enddate = ' ';
//    }
//    data['startdate'] = startdate;
 //   data['enddate'] = enddate;
//    data["userid"] = ''
 //   data['isTotalOverview'] = true;
//    requestData["data"] = data;
//    requestDataFromServer('/ticket/getTicket', { 'clientData': JSON.stringify(requestData), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, "POST").done(rangeChangeResponse);
//}
function openfileDialog() {
    $("#fileLoader").click();
}
function updateticket() {
   //console.log('INSIDE UPDATE TICKET')
    comment = document.getElementById("comments").value;
    if (comment) {
        var range = timeline.getVisibleChartRange()
        startdate = range.start;
        enddate = range.end;
        data = {};
        data['ticketId'] = ticketId;
        var user = users.filter(x => x.login == $('#selectAssignee').text())[0]
        data['assigned_to_id'] = user.id;

        var status = statuses.filter(x => x.name == $('#selectStatus').text())[0] //statuses[0] 
        data['status_id'] = status.id
        data['comment'] = document.getElementById("comments").value;
        data['filecontent'] = ''
        data['filename'] = ''
        var file = document.getElementById("fileLoader").files[0];
        if (file) {
           // console.log('update ticket if response--->' + file )
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                data['filecontent'] = evt.target.result
                data['filename'] = file.name;
                requestData["data"] = data;
                requestDataFromServer('/ticket/updateticket', { 'updateData': JSON.stringify(requestData), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, "POST").done(ticketUpdateResponse)
                
            }
            reader.onerror = function (evt) {
                swal('Not able to attach file', ' ', 'error')
            }
        }
        else {
            //console.log('UPDATE TICKET data ---> ' + JSON.stringify(data))
            requestData["data"] = data;
            requestDataFromServer('/ticket/updateticket', { 'updateData': JSON.stringify(requestData), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, "POST").done(ticketUpdateResponse)
        }
    }
    else {
        swal({
            title: 'Error',
            text: "Please enter comment",
            type: 'error',
            showCancelButton: false,
            confirmButtonClass: "btn-danger"
        });
    }
}

function ticketUpdateResponse(response) {
    //console.log('ticketupdateresponse--->' + JSON.stringify(response))
    if (response.uploadecode == 500) {
        swal(response.uploadmsg, ' ', "error");
    }
    if (response.code == 500) {
        swal(response.msg, ' ', "error");
    }
    else {
        swal(response.msg, ' ', "success");

        //swal(response.msg, '', 'success', {
        //    buttons: true,
        //}).then(() => {
        //    location.reload(); // Reload the current frame
        //});

        isUpdateTicket = true;
        clearAllvalues()
        var okbutton = document.querySelector('.confirm')
        okbutton.addEventListener("click", () => {
            document.querySelector('#cancelbtn').click();

        });
        data = {};
        data['startdate'] = moment(startdate).format("YYYY-MM-DD")
        // data['startdate'] = startdate.toISOString()
        data['enddate'] = moment(enddate).format("YYYY-MM-DD")
        // data['enddate'] = enddate.toISOString()
        data['user'] = dataType;
        data['isTotalOverview'] = true;
        if (dataType == 'team') {
            data['userid'] = $('#selectUser').text();
        }
        requestData["data"] = data;
        requestDataFromServer('/ticket/getTicket', { 'clientData': JSON.stringify(requestData), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, "POST").done(rangeChangeResponse); //check this function in update ticket error
    }
}
function onSelectuser(selecteduser) {
    clearAllvalues()
    data = {};
    data['user'] = dataType;
    startdate = moment().format("YYYY-MM-DD") + 'T00:00:00Z';
    data['startdate'] = startdate;
    enddate = moment().add(1, 'days').format("YYYY-MM-DD") + 'T00:00:00Z';
    data['enddate'] = enddate;
    $("#selectAssignee").text(selecteduser)
    $("#selectUser").text(selecteduser)
    data['userid'] = selecteduser;
    data['isTotalOverview'] = true;
    requestData["data"] = data;
    requestDataFromServer('/ticket/getTicket', { 'clientData': JSON.stringify(requestData), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, "POST").done(rangeChangeResponse);
}
function clearAllvalues() {
    $('#assigneelist').css('display', 'none')
    $('#statuslist').css("display", "none");
    document.getElementById('submit').disabled = true;
    $('#ticketinfo #info').empty()
    $('#ticketinfo #ticketDescription').empty()
    $('#ticketinfo #ticketSubject').empty()
    $('#list-timeline').empty()
    $('#comments').empty()
    document.getElementById("comments").value = "";
    document.getElementById('ticketstatus').style.visibility = 'hidden';
    element = document.getElementById('nodata')
    element.style.display = "block";
    element.innerHTML = 'No time log available'
    document.getElementById('clusterTickets').style.visibility = 'hidden';

    //---------------------------create ticket-----------------------------//
    // Clear the input field values
    document.getElementById('new_subject').value = ''; // Clear the subject input
    document.getElementById('create_date').innerHTML = ''; // Clear the subject input
    document.getElementById('add_description').value = ''; // Clear the description textarea

    // Reset the status dropdown to default value (New)
    document.getElementById('selectStatus2').textContent = 'New';

    // Reset the assignee dropdown to default value (admin)
    document.getElementById('selectAssignee2').textContent = 'admin';

    // Reset the tracker dropdown to default value (Bug)
    document.getElementById('selectTracker2').textContent = 'Bug';

    // Optionally clear any error messages
    document.getElementById('role-error-msg2').textContent = ''; 

}
function changeUserText(userValue) {
    $('#selectAssignee').text(userValue)  //Time log user dropdown
    //console.log('changeUserText ---> ' + userValue)
    user_name = userValue; 
    $('#selectUser').text(userValue)  // Team user dropdown 
    $('#userId').text(userValue);  // ticket info user id
}
function displayStatusChart() {

    isChartloaded = true;

    isInfopage = 'true' //to_be_changed
    if (isInfopage == 'true') {
        getTicketSiteNames()
    }
}
function onSelectAssignee(assignee) {
    //console.log('onSelectAssignee ---> ' + assignee)
    $("#selectAssignee").text(assignee)
}
function onSelectAssignee2(assignee) {
    //console.log('onSelectAssignee ---> ' + assignee)
    $("#selectAssignee2").text(assignee)
}
function onSelectStatus(status) {
    $("#selectStatus").text(status)
}

function onSelectStatus2(status) {
    //console.log('onSelectStatus2 --->' + status)
    $("#selectStatus2").text(status)
}
function onSelectTracker2(tracker) {
    //console.log('onSelectTracker2 --->' + tracker)
    $("#selectTracker2").text(tracker)
}
function getTicketSiteNames() {

    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            ticketSiteResponse = res.data;
        }
        dispalyTickets(ticketSiteResponse[0]);
    });
}

function changeOper(checkbox) {
    checkbx = checkbox
    //console.log('CHANGEOPER CHECKBX CHECKED---> ' + (checkbox.checked == true))
    if (checkbox.checked == true) {
        /*$('#update_ticket').removeClass('show');
        $('#create_ticket').addClass('show');*/
        $('#update_ticket').hide();
        $('#create_ticket').show();
        $('#secretstatus').text('NEW');
        $('#selectAssignee2').text(user_name);
        //$('#selectStatus2').text('New');
        $("#assigneelist2").append(assignee_list);
        //$("#statuslist2").append(status_list);
        $('#ticketinfo2 #info2 #create_date').empty()
        $('#ticketinfo2 #info2 #create_date').append( moment().format('YYYY-MM-DD HH:mm:ss') )
    }
    else {
        checkbox.checked == false
        /*$('#update_ticket').addClass('show');
        $('#create_ticket').removeClass('show');*/
        $('#update_ticket').show();
        $('#create_ticket').hide();
        $('#secretstatus').text('EDIT');
    }
}


function createticket() {
    //console.log('INSIDE CREATE TICKET')
    description = document.getElementById("add_description").value;
    if (description) {
        var range = timeline.getVisibleChartRange()
        startdate = range.start;
        enddate = range.end;
        data = {};
        //data['ticketId'] = ticketId;
        var user = users.filter(x => x.login == $('#selectAssignee2').text())[0]
        data['assigned_to_id'] = user.id;
       
        var status = statuses.filter(x => x.name == $('#selectStatus2').text())[0] //statuses[0] 
        data['status_id'] = status.id
        data['priority_id'] = 4
        data['project_id'] = 1
        data['tracker_id'] = (document.getElementById("selectTracker2").textContent === 'Bug') ? 1 : ((document.getElementById("selectTracker2").textContent === 'Feature') ? 2 : 3)

        //console.log('Tracker if for ' + (document.getElementById("selectTracker2").textContent) + ' is ' + data['tracker_id'])
        data['description'] = description//document.getElementById("add_description").value;
        data['subject'] = document.getElementById("new_subject").value;
        data['filecontent'] = ''
        data['filename'] = ''
        //console.log('ONSUBMIT DATA ---> ' + JSON.stringify(data))
        var file = document.getElementById("fileLoader").files[0];
        if (file) {
            // console.log('update ticket if response--->' + file )
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                data['filecontent'] = evt.target.result
                data['filename'] = file.name;
                requestData["data"] = data;
                requestDataFromServer('/ticket/create_new_issue', { 'issueData': JSON.stringify(requestData), 'sitename': ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, "POST").done(ticketUpdateResponse)

            }
            reader.onerror = function (evt) {
                swal('Not able to attach file', ' ', 'error')
            }
        }
        else {
            requestData["data"] = data;
            //console.log('<--------REACHED CREATETICKET API CALL------->')
            requestDataFromServer('/ticket/create_new_issue', { 'issueData': JSON.stringify(requestData), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, "POST").done(ticketUpdateResponse)
            //requestDataFromServer('/ticket/updateticket', { 'updateData': JSON.stringify(requestData), sitename: ticketSelectedsite, csrfmiddlewaretoken: csfr_token }, "POST").done(ticketUpdateResponse)
        }
    }
    else {
        swal({
            title: 'Error',
            text: "Please enter Description",
            type: 'error',
            showCancelButton: false,
            confirmButtonClass: "btn-danger"
        });
    }
}