redisKeys = [];
var bodeodFinalStatus = '';
var connectionTries = 6;
var isWSConnected = false;
sites = []
var siteHtml = ' '
selectedsite = ' '
var bodSiteResponse
var sitesResponse;
var bodSitesData = [];
var bodeodResponse;

$(document).ready(function () {
    getSiteListMainPage()
    profilename()
})
function profilename() {
    requestDataFromServer('/notificationsettings/getallservices', {}, "GET").done(getprofilenameResponse);
}

function getSiteListMainPage() {
    requestDataFromServer('/lesites/getallsitenames', { type: 'userbased', isOnlyEnabled: true }, "GET").done(ListInMainPage)
}

// sort function on dropdown sitenames
function getprofilenameResponse(response) {
    res = JSON.parse(response);
    if (res.status == 200) {
        $("#notificationpreferences #servicelist").empty();
        //  var html = '';
        serviceList = res.data;
        userobject = res.userobj
        // console.log("getAllserviceResponse-->" + JSON.stringify(userobject.first_name))
        document.getElementById('profile_name').textContent = userobject.first_name
        document.getElementById('profile_text').textContent = userobject.first_name
    }
    else {
        swal(response.msg, ' ', 'error')
    }
}

function sortOn(arr, prop) {
    arr.sort(
        function (a, b) {
            if (a[prop] < b[prop]) {
                return -1;
            } else if (a[prop] > b[prop]) {
                return 1;
            } else {
                return 0;
            }
        }
    );
}

// sort function on dropdown sitenames

function ListInMainPage(response) {
    if (response == undefined)
        return;
    sitesResponse = JSON.parse(response);
    sitesData = sitesResponse['data']
    sortOn(sitesData, "sitename"); // sort the dropdown sitenames in alphabetical
    var Sitehtml = '<a class="dropdown-item preview-item"> \
                    <div class="preview-item-content"  style="text-align: right;"> \
                        <p class="preview-subject card-title">SELECT SITES</p> \
                    </div> \
                    </a> \
                <div class="dropdown-divider"></div>'
    if (sitesData.length > 0) {
        sitesData.forEach(function (obj) {
            //Sitehtml += '<li class="nav-item" id="' + obj.sitename + '_li" style="position: relative;">' + obj.sitename +'</li>'
            Sitehtml += '<a class="dropdown-item preview-item " href="/lesites?site=' + obj.sitename + '"> \
                <label class="container"> '
            if (selectedsite != null && selectedsite == obj.sitename) {
                Sitehtml += '<input type = "radio" checked name = "radio" >'
            } else {
                Sitehtml += '<input type = "radio" name = "radio"  onclick="location.href=\'/lesites?site=' + obj.sitename + '\'" '
            }
            Sitehtml += '<span class="checkmark"></span> \
                                    </label> \
                    <div class="preview-item-content"  style="text-align: right;"> \
                        <p class="preview-subject">'+ obj.sitename + '</p> \
                    </div> \
                    </a> \
                <div class="dropdown-divider"></div>'

        });


    }
    $("#get-sites-main-page #site-list").append(Sitehtml);
}



function getBodEodkeys() {
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: ' ' }, "GET").done(bodEodkeysResponse)
}
function bodEodkeysResponse(response) {
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
            var tempSiteObj = bodSiteResponse.filter(x => x.sitename === siteTempObj['site'])[0]
            connectWebSocket(tempSiteObj.websocket_url, siteTempObj['site'], 0)
        });
        var sSitehtml = ''
        var fSitehtml = ''
        siteFailCount = 0;
        bodSitesData.forEach(function (obj) {
            if (obj.isSuccess) {
                sSitehtml += '<li class="nav-item" id="' + obj.site + '_li" style="position: relative;"><span class="indicator-circle" style="background: #ff3d57; z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="nav-link green bold-text" data-id="' + obj.site + '" id="' + obj.site + '" data-toggle="tab" onclick="onBodSiteTabchange(\'' + obj.site + '\')">' + obj.site + '</a></li>'
            }
            else {
                siteFailCount++;
                fSitehtml += '<li class="nav-item" id="' + obj.site + '_li" style="position: relative;"><span class="indicator-circle" style="background: #ff3d57; z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="nav-link red bold-text" data-id="' + obj.site + '"  id="' + obj.site + '" data-toggle="tab" onclick="onBodSiteTabchange(\'' + obj.site + '\')">' + obj.site + '</a></li>'
            }
        });
        if (siteFailCount != 0)
            bodeodFinalStatus = 'Failure'
        else
            bodeodFinalStatus = 'Success'
        $("#bodeodstatus").html(bodeodFinalStatus)
        bodeodFinalStatus == 'Failure' ? $("#bodeodstatus").removeClass("green").addClass('red') : $("#bodeodstatus").removeClass("red").addClass('green')
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
        var obj = bodeodResponse.filter(x => x.site === selectedsite)[0]
        displayKeys(obj, selectedsite)

    }
    else {
        $("#bod-eodstatus #site-data").css('display', 'none');
        $("#bod-eodstatus #bod-eodstatus-nodata").css('display', 'block');
        $("#bod-eodstatus-nodata #nodatamessage").text('No Data');
        $("#bod-eodstatus #bod-eodstatus-expand").css('display', 'none');
    }
}
function displayKeys(siteData, refreshedsite) {
    keyFailCount = 0
    if (siteData.site_data.length > 0) {
        redisKeys = []
        keyHtml = ''
        keyHtml += '<div class="row py-2 site-keys" id="' + siteData.site + '">'
        keyHtml += '<div class="col-12">'
        keyHtml += '<table class="row">'
        keyHtml += '<tbody class="col-12">'
        siteData.site_data.forEach(function (obj) {
            var tempObj = {}
            var keyData = obj.key_data
            var data = keyData['data']
            failCount = 0
            rowHtml = ''
            var divId = obj.key
            divId = divId.replace(/[:.]/g, '_');
            if (keyData['type'] == 'matrix') {
                var temp = ''
                $.each(data, function (key) {
                    html = '<td>' + key + '</td>'
                    var tempHtml = ''
                    var tempData = data[key]
                    $.each(tempData, function (key1, val1) {
                        var obj = tempData[key1]
                        if (typeof (obj) == 'object') {
                            if (obj['isSuccess'] == false) {
                                bgcolor = 'red-bg'
                                failCount++;
                                keyFailCount++;
                            }
                            else
                                bgcolor = 'green-bg'
                            tempHtml += '<td class="white-text ' + bgcolor + '">' + obj['ctcl_id'] + '</td>'
                        }
                        else {
                            tempHtml += '<td>' + obj + '</td>'
                        }
                    })
                    html = html + tempHtml
                    temp += '<tr class="">' + html + '</tr>'
                })
                rowHtml = temp;
            }
            else {
                var temp = ''
                for (var i = 0; i < data.length; i++) {
                    var isSuccess = true
                    tempHtml = ''
                    $.each(data[i], function (key, val) {
                        if (key == 'isSuccess' && val == false) {
                            isSuccess = false
                        }
                        if (typeof (val) == 'object')
                            val = JSON.stringify(val)
                        if (key.includes('file_path')) {
                            tempHtml += '<td class="px-5 py-1 profile-td"><a id="' + i + '-' + 'file-info' + '" onclick="onFileinfo(\'' + val + '\',' + i + ',\'' + obj.key.replace(/[:.]/g, '_') + '\')" data-toggle="modal" data-target="#dialog-for-content" class="profile"><img src="../static/app/icons/view file.png"/></a></td>'
                        }
                        else {
                            if (key != 'isSuccess')
                                tempHtml += '<td>' + val + '</td>'
                        }
                    })
                    if (isSuccess == false) {
                        rowColor = 'red'
                        failCount++;
                        keyFailCount++;
                    }
                    else
                        rowColor = 'green'

                    temp += '<tr class="' + rowColor + '">' + tempHtml + '</tr>'
                }
                rowHtml = temp
            }
            var value = obj.key
            tempObj['keyName'] = value
            tempObj['site'] = siteData.site
            keyName = (value.split(':')[1]).replace("_", "-")
            keyHtml += '<tr class="collapse-tr parent row" id="' + obj.key + '">'
            keyHtml += '<td class="col-10">'
            keyHtml += ' <a data-toggle="collapse" class="accordion-toggle" href="#' + divId + '-data' + '">'
            var text = 'Success'
            var colorClass = 'green'
            if (failCount != 0) {
                var text = 'Failure'
                var colorClass = 'red'
                tempObj['isSuccess'] = false
            }
            else
                tempObj['isSuccess'] = true
            redisKeys.push(tempObj)
            keyHtml += '<h4 class="card-title" style="margin-left: 10px; margin-top: 3px;"><i class=" icon-play"></i>' + keyName + '<span class="size12 ' + colorClass + '"style="margin-left: 10px; font-weight: bold;">' + text + '</span></h4>'
            keyHtml += '<td>'
            keyHtml += '<td class="col-2 action-btn float-right text-right">'
            keyHtml += '<button class="btn btn-default btn-ripple accordion-toggle ml-2" data-toggle="collapse" data-target="#' + divId + '-data' + '">'
            keyHtml += '<i class="icon-select"></i>'
            keyHtml += '</button>'
            keyHtml += ' </a>'
            keyHtml += ' </td>'
            keyHtml += '</tr>'
            keyHtml += '<tr class="border-0 collapse-content row" id="child-' + obj.key.replace(/[:.]/g, '_') + '">'
            keyHtml += '<td colspan="12" class="hiddenRow border-0 p-0 col-12">'
            keyHtml += '<div class="accordian-body collapse col-12 border-b" id="' + divId + '-data' + '">'
            keyHtml += '<div class="row card-body py-lg-4 py-2 bg">'
            keyHtml += '<div class="col-12">'
            keyHtml += '<h5 class="size14" style="margin-left: 10px; margin-top: 3px;">Executed On : ' + keyData['executedOn'] + '</h5>'
            keyHtml += '</div>'
            keyHtml += '<div id="table-view" class="col-12" style="overflow-x: auto;">'
            keyHtml += '<table id="data">'
            keyHtml += '<thead class="table-head">'
            keyHtml += '<tr class="text-uppercase size12 bold-text">'
            var keyData = obj.key_data
            var data = keyData['data']
            theadHtml = ''
            if (keyData['type'] == 'matrix') {
                theadHtml += '<td></td>'
                $.each(data[Object.keys(data)[0]], function (key) {
                    theadHtml += '<td>' + key + '</td>'
                })
            }
            else {
                $.each(data[0], function (key) {
                    if (key != 'isSuccess')
                        theadHtml += '<td>' + key + '</td>'
                })
            }
            keyHtml = keyHtml + theadHtml
            keyHtml += '</tr>'
            keyHtml += '</thead>'
            keyHtml += '<tbody class="accordion list" id="accordionExample">'
            keyHtml = keyHtml + rowHtml
            keyHtml += '</tbody>'
            keyHtml += '</table>'
            keyHtml += '</div>'
            keyHtml += '</div>'
            keyHtml += '</div> '
            keyHtml += '</td>'
            keyHtml += '</tr>'
        });
        keyHtml += '</tbody>'
        keyHtml += '</table>'
        keyHtml += '</div>'
        keyHtml += '</div>'
        // siteHtml = siteHtml+keyHtml
        if (refreshedsite === selectedsite) {
            $("#bod-eodstatus #site-data").css('display', 'block')
            $("#bod-eodstatus #bod-eodstatus-nodata").css('display', 'none')
            $("#bod-eodstatus #bod-eodstatus-expand").css('display', 'block');
            $('#site-data').empty()
            $('#site-data').append(keyHtml)
        }
    }
    else {
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
    changeStatus(refreshedsite, keyFailCount)
}
function changeStatus(site, failCount) {
    var obj = bodSitesData.filter(x => x.site === site)[0]
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
    if (isFound) {
        bodeodFinalStatus = 'Failure'
    }
    else {
        bodeodFinalStatus = 'Success'
    }
    $("#bodeodstatus").html(bodeodFinalStatus)
    bodeodFinalStatus == 'Failure' ? $("#bodeodstatus").removeClass("green").addClass('red') : $("#bodeodstatus").removeClass("red").addClass('green')
}
function clickOnAll(checkbox) {
    var keys = redisKeys.filter(x => x.site === selectedsite)
    if (checkbox.checked == true) {
        $('.switch_label').text('Collapse')
        keys.forEach(function (obj) {
            var divId = obj.keyName
            divId = divId.replace(/[:.]/g, '_');
            $('#' + selectedsite + ' #' + divId + '-data').collapse('show');
        })
    }
    else {
        $('.switch_label').text('Expand')
        checkbox.checked == false
        keys.forEach(function (obj) {
            var divId = obj.keyName
            divId = divId.replace(/[:.]/g, '_');
            $('#' + selectedsite + ' #' + divId + '-data').collapse('hide');
        })
    }
}
function connectWebSocket(wsUrl, wsiteName, tries) {
    try {
        if (window.WebSocket) {
            var destination = "/exchange/bodeod_update";
            var WSObject = new WebSocket(wsUrl);
            var stompClient = Stomp.over(WSObject);
            stompClient.id = wsiteName
            stompClient.connectionTries = tries;
            var on_conn = function () {
                var obj = bodSitesData.filter(x => x.site === stompClient.id)[0]
                obj.isWSConnected = true;
                isWSConnected = true;
                stompClient.subscribe(destination, function (message) {
                    var tempJson = JSON.parse(message.body);
                    var isSiteFound = bodSitesData.some(el => el.site == tempJson.site);
                    if (tempJson.refresh == 1 && isSiteFound) {
                        requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: tempJson.site }, "GET").done(function (response) {
                            displayKeys(response.responseData[0], response.refreshedsite)
                        })
                        if (pageName != "BOD-EODStatus") {
                            localStorage.setItem("newlabeldisplay", "inline");
                            $("#new-label").css('display', "inline")
                        }
                    }
                });

                $("#bod-eodstatus #" + stompClient.id + "-indicator").css('background', '#16d39a')
                this.connectionTries = 6
            }
            var on_err = function (error) {
                $("#bod-eodstatus #" + stompClient.id + "-indicator").css('background', '#ff3d57')
                var obj = bodSitesData.filter(x => x.site === stompClient.id)[0]
                obj.isWSConnected = false;
                if (networkStatus === 'online') {
                    if (stompClient.connectionTries == 10) {
                        swal({
                            title: "Want to get bod-eod updates?",
                            text: "Not able to connect web socket of \"" + stompClient.id + "\". Please check once!.",
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
                                    connectWebSocket(stompClient.ws.url, stompClient.id, 0)
                                } else {
                                    $("#bod-eodstatus #" + stompClient.id + "-indicator").css('background', '#ff3d57')
                                }
                            });
                    }
                    else {
                        stompClient.connectionTries++;
                        connectWebSocket(stompClient.ws.url, stompClient.id, stompClient.connectionTries)
                    }
                }
            };
            stompClient.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}
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
    var tempSiteObj = bodSitesData.filter(x => x.site === selectedsite)[0]
    if (tempSiteObj.isWSConnected == false) {
        tempSiteObj = bodSiteResponse.filter(x => x.sitename === selectedsite)[0]
        connectWebSocket(tempSiteObj.websocket_url, selectedsite, 0)
    }
    startBodLoader()
    requestDataFromServer('/bod-eodstatus/getbodeodkeys', { sitename: selectedsite }, "GET").done(function (response) {
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