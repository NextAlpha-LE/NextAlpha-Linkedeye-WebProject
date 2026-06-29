var global_all_services;
var global_ip_addresses;
var service_list = [];
var serviceIdCount = 0;
var selectedFileType = "";
var isEdit = false;
var editRespone;
var registeredIPAddress = [];
var isServiceEdit = false;
var hostPath = "DIRECT";
var applicationNames = [];
var vaults = [];
var deleteBtn;
var toBeDeletedHost = true;
var requestData = {};
var registeredMultiSelect = false;
var isFillHostDetails = true;
//var total = 0;   //Rajkumar added Gateway count in onboarding page
var emailLists = [];
$(document).ready(function () {
    $(".loader").hide();
    emailListResponse();
    if (window.location.href.split('?').pop() === 'redirectToAddhostPage') {
        isFillHostDetails = false;
        $(".add").trigger("click",
            getFileNames(),
            getServices(),
            getVaultInformation(),
            $("#nodata").hide(),
            $("#hostcontent").hide(),
            $(".maincontent").show(),
        );
    }
    if (window.location.href.split('!').pop() === 'redirectToEditRegisteredHostsPage') {
        isFillHostDetails = true;
        var ipaddressAndEditHostStr = window.location.href.split('?').pop()
        var ipaddress = ipaddressAndEditHostStr.split("!")[0];
        getVaultInformation()
        editRegisteredHosts(ipaddress);
    }
    if (isFillHostDetails) {
        fillHostDetails();
        $("#nodata").hide();
        $(".maincontent").hide();
    }
    $(".add").click(function () {
        getFileNames();
        getServices();
        getVaultInformation()
        $("#nodata").hide();
        $("#hostcontent").hide();
        $(".maincontent").show();
    });
    $("#save").click(function () {
      //  console.log("onboarding save")
        sendFormDataToServer();
    });
    $("#service-selected").hide();
    $("#services-select-div").hide();
    $("#multipleIPAddressSelect").hide();

    $("#dialog-for-iframe").on('hide.bs.modal', function () {
        $('#applicationname').val("");
        $("#error-application").empty();
    });

    $("#dialog-for-hsdiscover").on('show.bs.modal', function () {
        if (global_ip_addresses !== undefined) {
            var html = "<option disabled>Choose IP</option>";
            global_ip_addresses.forEach(function (obj) {
                var ip = obj["ip"];
                html += '<option value="' + ip + '">' + ip + '</option>';
            });
            $("#ip-dropdown").append(html);
        }
    });
});
function editRegisteredHosts(ipaddress) {
    isEdit = true;
    requestDataFromServer('edithostdetails', { "ipaddress": ipaddress }, "GET").done(editResponse);
}

function scanHS() {
    var ipaddress = $("#ip-dropdown").val();
    var path = $("#configpath").val();
    requestDataFromServer('../hsonboard/gethsconfig', { 'ipaddress': ipaddress, 'path': path, csrfmiddlewaretoken: csfr_token }, "POST").done(parseconfigdata);
}

function parseconfigdata(response) {
    res = JSON.parse(response);
    if (res.status == 200) {
        $("#ip-dropdown").val("");
        $("#configpath").val("");
        $('#dialog-for-hsdiscover').modal('toggle');
        requestDataFromServer('getfilenames', { "fileName": hostPath + "/SERVICES" }, "GET").done(fillServicesValuesafterHSDiscover);
    }
    else {
        swal('Not able to scan', '', "error");
    }
}

function fillServicesValuesafterHSDiscover(response) {
    global_all_services = JSON.parse(response);
    if ($("#services-dropdown").is(":visible")) {
        var serviceHtml = "<option selected disabled>Select service</option>";
        var hostTechType = $("#hosts-dropdown").val().split("_")[0];
        if (global_all_services !== undefined && global_all_services.length > 0) {
            $("#services-dropdown").empty();
            global_all_services.forEach(function (sevices_text) {
                if (sevices_text.split("_")[0] === hostTechType) {
                    serviceHtml += '<option value="' + sevices_text + '">' + sevices_text.split("_")[2].replace(".j2", "") + '</option>';
                }
            });
            $("#services-dropdown").append(serviceHtml);
        }
    }
}

function saveapplication() {
    if ($('#applicationname').val() == '') {
        return false;
    }
    else {
        var data = {};
        data['applicationname'] = $('#applicationname').val();
        data["operation"] = 'add'
        data["rowid"] = 1
        requestData["data"] = data;
        requestDataFromServer('/applications/applicationactions', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(applicationResponse);
    }
}

function applicationResponse(response) {
    if (response && response.status == 500) {
        $("#error-application").html(response.msg);
    }
    else {
        data = requestData["data"];
        data.applicationname;

        applicationNames.push(data.applicationname);
        if ($("#GLOBAL_APPLICATION").is(":visible")) {
            var selectedVal = $("#GLOBAL_APPLICATION").val();
            var innerHtml = " ";
            innerHtml += '<option value="' + data.applicationname + '">' + data.applicationname + '</option>';
            $("#GLOBAL_APPLICATION").append(innerHtml);
            if (selectedVal !== null && selectedVal !== "")
                $("#GLOBAL_APPLICATION").val(selectedVal);
            else
                $("#GLOBAL_APPLICATION").val(data.applicationname);
        }

        swal(response.msg, ' ', "success");
        $('#dialog-for-iframe').modal('toggle');
    }
}

function pathselected(select) {
    $("#host-form-div").empty();
    $("#service-form-div").empty();
    $("#registered-service-div").empty();
    $("#registered-service-no-data").css('display', 'block')
    $("#multi-select-ip").empty();
    $("#services-dropdown").empty();
    $("#hosts-dropdown").empty();
    $("#service-selected").hide();
    $("#services-select-div").hide();
    $("#multipleIPAddressSelect").hide();
    hostPath = $(select).val();
    getFileNames();
}

function fillHostDetails() {
    requestDataFromServer('/allonboard/gethostservicedata', {}, "GET").done(fillHostResponse);

}

function fillHostResponse(response) {
    res = JSON.parse(response);
    var objid = '';
    if (res.status == 200) {
        $(".maincontent").hide();
        // $("#hostcontent").hide();
        $("#nodata").hide();
        host_details = res.data
        if (host_details.length > 0) {
            //var total = 0;
            var g = 0, f = 0, s = 0, p = 0, e = 0;
            host_details.forEach(function (obj) {
                var html = "";
                // total++;
                registeredIPAddress.push(obj.address);
                html += '<div class="col-3 mt-3" style="max-width:28% !important">';
                html += '<div class="card onboards">';
                html += '<div class="row">';
                html += '<div class="col-10"></div>';
                //html += '<button class="btn float-right" type="button" onclick="hostCloseClick(this)" data-host-ip="' + obj.address + '" data-host-name="' + obj.host_name + '" style="padding:0px;"><i class="mdi mdi-close" style="color:white"></i></button>';
                html += '<i class="mdi mdi-close col-2" onclick="hostCloseClick(this)" data-host-ip="' + obj.address + '" data-host-name="' + obj.host_name + '" style="color:white; float:right"></i>';
                html += '</div>';
                html += '<a class="onboard" style="cursor: pointer; line-height:180%;" onclick="editHost(this)" data-toggle="modal" data-target="#CreateHostModal" data-ipaddress="' + obj.address + '"style="color:white; float:right">';
                html += '<p class="bold-text mb-0 text-color ">IP : ' + obj.host_name + '</p>';
                html += '<p class="bold-text mb-0 text-color ">E-Mail : ' + obj.contact_email + '</p>';
                html += '<p class="bold-text mb-0 text-color ">Application : ' + obj.application + '</p>';
                html += '<p class="bold-text mb-0 text-color ">Automation : ' + obj.automation + '</p>';
                html += '<p class="bold-text mb-0 text-color ">layer : ' + obj.layer + '</p>';
                html += '</a>';
                html += '</div>';
                html += '</div>';
                objid = obj.layer;

                var anchorid = ''
                if (objid == 'g_swi') {
                    $("#nohost").hide();
                    $("#gswi").show();
                    anchorid = '#totalGateway'
                    g++;
                    $(anchorid).text(g)
                } else if (objid == 'fw') {
                    $("#nohost").hide();
                    $("#fswi").show();
                    anchorid = '#totalFirewall'
                    f++
                    $(anchorid).text(f)
                } else if (objid == 's_hw') {
                    $("#nohost").hide();
                    $("#sswi").show();
                    anchorid = '#totalServers'
                    s++
                    $(anchorid).text(s)
                } else if (objid == 'p_swi') {
                    $("#nohost").hide();
                    $("#pswi").show();
                    anchorid = '#totalPublic'
                    p++
                    $(anchorid).text(p)
                }
                else {
                    $("#nohost").hide();
                    $("#eswi").show();
                    anchorid = '#totalExchange'
                    e++
                    $(anchorid).text(e)
                }

                //$(anchorid).text(total)  //Rajkumar added Sites count in admin page
                $("#" + objid).append(html);
                $("#hostcontent").show();
                $("#nodata").show();
            });

        }
        else {
            $("#nodata").show();
        }
    }
    else {
        swal('Not able to get host details', ' ', "error")
    }
}

function getIpAddress() {
    if (global_ip_addresses === undefined)
        requestDataFromServer('getiplist', {}, "GET").done(fillIPValues);
}

function fillIPValues(response) {
    res = JSON.parse(response);
    if (res.status == 200) {
        global_ip_addresses = res.data;
        getApplicationNames();
    }
    else {
        swal('Issue in gettin Iplist', ' ', 'error')
    }
}

function getFileNames() {
    requestDataFromServer('getfilenames', { "fileName": hostPath + "/HOSTS" }, "GET").done(fillHostValues);
}

function fillHostValues(response) {
   // console.log("fillHostValues-->" + (response))
    res = JSON.parse(response);
    if (res.status == 200) {
        requestDataFromServer('getfilenames', { "fileName": hostPath + "/SERVICES" }, "GET").done(fillServicesValues);
        var hostHtml = '<option selected disabled>Select host</option>';
        var hostNames = res.data;
        hostNames.forEach(function (hostName) {
            hostHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + hostName + '">' + hostName.replace(".j2", "") + '</option>';
        });
        $("#hosts-dropdown").append(hostHtml);

        if (isEdit)
            autoSelectHost();
    }
    else {
        swal('Issue in getting filename', ' ', 'error')
    }
}

function fillServicesValues(response) {
    res = JSON.parse(response);
    if (res.status == 200) {
        getIpAddress();
        global_all_services = res.data;
    }
    else {
        swal('Issue in getting serviceses', ' ', 'error')
    }
}

function serviceselected(select) {
    selectedFileType = "Service";
    $("#service-selected").hide();
    $("#service-form-div").empty();
    if ($(select).val() != null) {
        $("#service-header").text($(select).val().split("_")[2].replace(".j2", ""));
        requestDataFromServer('getfilecontentdata', { 'filename': hostPath + "_SERVICES_" + $(select).val(), csrfmiddlewaretoken: csfr_token }, "POST").done(handleFileContentResponse);
    }
}

function hostselected(select) {
    selectedFileType = "Host";
    $("#host-form-div").empty();
    $("#service-form-div").empty();
    $("#registered-service-div").empty();
    $("#registered-service-no-data").css('display', 'block')
    requestDataFromServer('getfilecontentdata', { 'filename': hostPath + "_HOSTS_" + $(select).val(), csrfmiddlewaretoken: csfr_token }, "POST").done(handleFileContentResponse);
}

function handleFileContentResponse(response) {
  //  console.log("handleFileContentResponse---->" + JSON.stringify(response))
    res = JSON.parse(response);
    if (res.status == 200) {
        data = res.data;
        if (data.length != 0) {
            var html = "";
            var indexPos = -1;
            var parsed_data = data;
            var sequenceParsedData = parsed_data;
            parsed_data.forEach(function (input_text) {
                indexPos++;
                if (input_text.indexOf('__') >= 0) {
                    var tempArray = input_text.split('__');
                    if (tempArray[0] == "BOOL") {
                        var tempString = tempArray[1];
                        var innerIndexPos = -1;
                        parsed_data.forEach(function (inner_input_text) {
                            innerIndexPos++;
                            var innerTempArray = inner_input_text.split('__');
                            if (innerTempArray[0] == tempString) {
                                var tempKeyValue1 = parsed_data[indexPos];
                                var tempKeyValue2 = parsed_data[innerIndexPos];
                                delete sequenceParsedData[indexPos];
                                delete sequenceParsedData[innerIndexPos];
                                sequenceParsedData.push(tempKeyValue1);
                                sequenceParsedData.push(tempKeyValue2);
                            }
                        });
                    }
                }
            });

            var elementReusableClassArray = [];
            sequenceParsedData.forEach(function (input_text) {
                if (selectedFileType === "Host" && input_text === "COMMON_IPADDRESS") {
                    if (!isEdit)
                        drawMultiplIPAddresses();
                    return;
                }

                var tempArray = input_text.split('_');
                if (input_text.indexOf('__') >= 0) {
                    tempArray = input_text.split('__')[1].split('_');
                }
                if (selectedFileType === "Service" && (tempArray[0] === "COMMON" || tempArray[0] === "GLOBAL")) {
                    if ($("#" + input_text).val() !== undefined) {
                        html += '<input type="hidden" name="' + input_text + '"  value="' + $("#" + input_text).val() + '">';
                    }
                    return;
                }
                var isBoolean = false;
                var elementId = "";
                var elementClass = "";
                var elementToHide = "";
                var elementAttribute = "";
                var elementPlaceHolder = "";
                var divElementClass = "";
                var divElementAttribute = "";
                var checkBocElementAttribute = "";

                if (input_text.indexOf('__') >= 0) {
                    var checkBoolArray = input_text.split('__');
                    if (checkBoolArray[0] === "BOOL") {
                        isBoolean = true;
                        if (selectedFileType === "Service") {
                            elementToHide = checkBoolArray[1] + "_" + serviceIdCount;
                            var isChecked = $("." + checkBoolArray[1]).first().is(":visible");
                            if (isChecked) {
                                checkBocElementAttribute = "checked";
                            }
                            if (isServiceEdit)
                                checkBocElementAttribute = "";
                        }
                        else {
                            elementToHide = checkBoolArray[1];
                        }
                    }
                    else {
                        if (selectedFileType === "Service") {
                            divElementClass = checkBoolArray[0] + "_" + serviceIdCount;
                            var isChecked = $("." + checkBoolArray[0]).first().is(":visible");
                            if (isChecked) {
                                divElementAttribute = "style=display:block;";
                            }
                            else {
                                divElementAttribute = "style=display:none;";
                            }

                            if (isServiceEdit) {
                                isServiceEdit = false;
                                divElementAttribute = "style=display:none;";
                            }
                        }
                        else {
                            divElementClass = checkBoolArray[0];
                            divElementAttribute = "style=display:none;";
                        }
                    }
                }

                if (selectedFileType === "Host" && input_text === "COMMON_HOSTNAME") {
                    divElementAttribute = "style=display:none;";
                }

                var inputAttribute = "";
                if (tempArray.length > 2) {
                    var index = 0;
                    tempArray.forEach(function (text) {
                        if (index > 0)
                            elementPlaceHolder += text + " ";
                        index++;
                        inputAttribute = text;
                    });
                    elementPlaceHolder.trim();
                }
                else {
                    elementPlaceHolder = tempArray[1];
                    inputAttribute = tempArray[1];
                }


                if (selectedFileType === "Service") {
                    elementId = input_text + "_" + serviceIdCount;
                    if ($("#" + input_text).val() !== undefined) {
                        elementClass = "service-input ";
                        elementAttribute = "value=" + $("#" + input_text).val();
                    }
                }
                else {
                    elementId = input_text;
                }

                if (tempArray[0] === "REUSABLE") {
                    var cls = "reusable-class-" + input_text;
                    elementClass += cls;
                    if (selectedFileType === "Host") {
                        elementReusableClassArray.push(cls);
                    }
                }

                if (isBoolean) {
                    html += '<div class="form-group m-0 w-50 px-md-4 px-1 mt-3">';
                    html += '<label class="text-lowercase" style="left:80px" id="label_' + elementId + '">' + elementPlaceHolder + ' REQUIRED?</label>';
                    html += '<span class="" style="display: list-item !important; padding-bottom: 45px; overflow: hidden;">';
                    html += '<label class="switch position-relative">';
                    html += '<input type="checkbox" id="' + elementId + '" name="' + input_text + '" data-to-hide="' + elementToHide + '" onchange="boolValueChanged(this)" ' + checkBocElementAttribute + '>';
                    html += '<span class="slider round"></span>';
                    html += '</label>';
                    html += '</span>';
                    html += '</div>';
                }
                else if (input_text === "REUSABLE_AUTOMATION__REUSABLE_VAULT" || input_text === "GLOBAL_APPLICATION") {
                    var innerHtml = "";
                    if (input_text === "GLOBAL_APPLICATION") {
                        innerHtml = "<option disabled selected>Select Application</option>";
                        applicationNames.forEach(function (app_name) {
                            innerHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + app_name + '">' + app_name + '</option>';
                        });
                    }
                    else {
                        innerHtml = "<option disabled selected>Select Secret</option>";
                        var hasSecretVal = "";
                        if (selectedFileType === "Service") {
                            if ($("#" + input_text).val() !== undefined) {
                                hasSecretVal = $("#" + input_text).val();
                            }
                        }
                        vaults.forEach(function (vault) {
                            if (hasSecretVal !== "" && hasSecretVal === vault)
                                innerHtml += '<option value="' + vault + '" selected>' + vault + '</option>';
                            else
                                innerHtml += '<option value="' + vault.url + '">' + vault.url + '</option>';
                        });
                    }
                    html += '<div class="w-50 my-3 px-md-4 px-2 pt-3 ' + divElementClass + '" id="' + elementId + '-div" ' + divElementAttribute + '>';
                    html += '<div class="select-service">';
                    html += '<select class="custom-select select-input px-2" id="' + elementId + '" name="' + input_text + '">';
                    html += innerHtml;
                    html += '</select>';
                    html += '</div>';
                    html += '</div>';
                }
                else if (input_text === "REUSABLE_EMAIL") {
                    var innerHtml = "<option disabled selected>Select E-Mail</option>";
                    emailLists.forEach(function (emails) {
                        //innerHtml += "<option value=" + emails + ">" + emails + "</option>";
                        innerHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + emails + '">' + emails + '</option>';
                    })
                    html += '<div class="w-50 my-3 px-md-4 px-2 pt-3 ' + divElementClass + '" id="' + elementId + '-div" ' + divElementAttribute + '>';
                    html += '<div class="select-service">';
                    html += '<select class="custom-select select-input px-2 ' + elementClass + '" id="' + elementId + '" name="' + input_text + '" data-attribute="' + inputAttribute + '" data-template="' + selectedFileType + '">';
                    html += innerHtml;
                    html += '</select>';
                    html += '</div>';
                    html += '</div>';
                }
                else {
                    html += '<div class="form-group m-0 w-50 password-group px-md-4 px-1 mt-3 ' + divElementClass + '" id="' + elementId + '-div" ' + divElementAttribute + '>';
                    html += '<span class="input_box">';
                    html += '<label for="' + elementId + '" class="lightgray-text text-lowercase">' + elementPlaceHolder + '</label>';
                    html += '<input type="text" id="' + elementId + '" name="' + input_text + '" class="form-control input_effect inputvalidation ' + elementClass + '" data-attribute="' + inputAttribute + '" autocomplete="off" data-template="' + selectedFileType + '" ' + elementAttribute + '>';
                    html += '</span>';
                    html += '</div>';
                }
            });

            if (selectedFileType === "Host") {
                $("#host-form-div").append(html);
                var serviceHtml = "<option selected disabled>Select service</option>";
                var hostTechType = $("#hosts-dropdown").val().split("_")[0];
                if (global_all_services !== undefined && global_all_services.length > 0) {
                    $("#services-dropdown").empty(); // dropdown on host service
                    global_all_services.forEach(function (sevices_text) {
                        if (sevices_text.split("_")[0] === hostTechType) {
                            serviceHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + sevices_text + '">' + sevices_text.split("_")[2].replace(".j2", "") + '</option>';
                        }
                    });
                    $("#services-dropdown").append(serviceHtml);
                    $("#services-select-div").show();
                }
                if (isEdit)
                    editCallback();
            }
            else {
                $("#service-form-div").append(html);
                $("#service-selected").show();
                $("#nodata-hide").hide();
            }
            fieldValidation();
            registerInputFieldEvents();
            registerLocalInputFieldEvents(elementReusableClassArray);
        }
    }
    else {
        swal('Failure in getting all content', ' ', "error");
    }
}

function getApplicationNames() {
    if (applicationNames.length === 0)
        requestDataFromServer('/applications/getallapplicationnames', {}, "GET").done(handleApplicationNamesResponse);
    // else
    //     getVaultInformation();
}

function getVaultInformation() {
    if (vaults.length === 0) {
        requestDataFromServer('../vault/getallsecrets', {}, "GET").done(handlevaultresponse);
    }
}

function handlevaultresponse(response) {
    var innerHtml = " ";
    res = JSON.parse(response);
    if ($('#REUSABLE_AUTOMATION__REUSABLE_VAULT').children('option').length == 0) {
        innerHtml = "<option disabled selected>Select Secret</option>"
    }
    if (res.status == 200) {
        res.data.forEach(function (obj) {
            vaults.push(obj)
            if (!$("#REUSABLE_AUTOMATION__REUSABLE_VAULT option[value='" + obj.url + "']").length > 0) {
                innerHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + obj.url + '">' + obj.url + '</option>';
            }
        });
    }
    else {
        swal('Failure in get all secrets', ' ', 'error')
    }
    $("#REUSABLE_AUTOMATION__REUSABLE_VAULT").append(innerHtml);
}

function handleApplicationNamesResponse(response) {
    res = JSON.parse(response);
    var innerHtml = " ";
    if ($('#GLOBAL_APPLICATION').children('option').length == 0) {
        innerHtml = "<option disabled selected>Select Application</option>"
    }
    if (res.status == 200) {
        // getVaultInformation();
        res.data.forEach(function (obj) {
            applicationNames.push(obj.applicationname)
            if (!$("#GLOBAL_APPLICATION option[value=" + obj.applicationname + ']').length > 0) {
                innerHtml += '<option value="' + obj.applicationname + '">' + obj.applicationname + '</option>';
            }
        });
    }
    else {
        swal('Failure in getallapplicationnames ', ' ', 'error')
    }
    $("#GLOBAL_APPLICATION").append(innerHtml);
}

function drawMultiplIPAddresses() {
    if (global_ip_addresses !== undefined) {
        var html = "";
        global_ip_addresses.forEach(function (obj) {
            var ip = obj["ip"];
            var checkIp = registeredIPAddress.includes(ip);
            var prop = "";
            if (checkIp)
                prop = "disabled";
            html += '<option value="' + ip + '" ' + prop + '>' + ip + '</option>';
        });
        $("#multi-select-ip").append(html);
    }
    $("#multipleIPAddressSelect").show();
    registerMultiSelect();
}

function drawSingleIpAddress(ipaddress) {
    var html = '<option value="' + ipaddress + '">' + ipaddress + '</option>';
    $("#multi-select-ip").append(html);
    $("#multipleIPAddressSelect").show();
    registerMultiSelect();
}

function registerMultiSelect() {
    if (registeredMultiSelect === true) {
        return;
    }
    registeredMultiSelect = true;
    $('#multi-select-ip').multipleSelect(
        {
            placeholder: 'IP Address',
            filter: true,
            filterPlaceholder: 'Search IP',
            filterAcceptOnEnter: true,
            showClear: true,
            filterByDataLength: 10
        });
}

function boolValueChanged(checkbox) {
    if (checkbox.checked == true) {
        $("." + $(checkbox).attr("data-to-hide")).show();
    }
    else {
        $("." + $(checkbox).attr("data-to-hide")).hide();
    }
}

function registerLocalInputFieldEvents(reusableClassArray) {
    if (selectedFileType === "Service") {
        $('.service-input').each(function () {
            if ($(this).attr("data-attribute") === "EMAIL") {
                var selectedOptions = $('#REUSABLE_EMAIL').val();
                var options = document.getElementsByClassName("service-input")[0].options;
                for (i = 0; i < options.length; i++) {
                    if (options[i].text.indexOf(selectedOptions) > -1) {
                        options[i].selected = true;
                        break;
                    }
                }
            }
            if (document.getElementById('BOOL__REUSABLE_AUTOMATION').checked === true) {
                var text = $('#REUSABLE_AUTOMATION__REUSABLE_VAULT').val();
                var options = $("#REUSABLE_AUTOMATION__REUSABLE_VAULT_0")[0].options;
                for (i = 0; i < options.length; i++) {
                    if (options[i].text.indexOf(text) > -1) {
                        options[i].selected = true;
                        break;
                    }
                }
            }
            if ($(this).val() !== "") {
                $(this).parent().find("label").addClass("move_label");
                $(this).parent().addClass("bg_input");
            }
        });
    }

    reusableClassArray.forEach(function (cls) {
        $('.' + cls).focusout(function (e) {
            if ($(this).attr("data-template") === "Host") {
                var localClass = "reusable-class-" + $(this).attr("name");
                var text = $(this).val();
                $('.' + localClass).each(function () {
                    if ($(this).attr("data-template") === "Service" && $(this).val() === "") {
                        $(this).val(text);
                        $(this).parent().find("label").addClass("move_label");
                        $(this).parent().addClass("bg_input");
                    }
                });
            }
        });
    });

    /*$("#COMMON_HOSTNAME").keyup(function()
    {
        var hostname = $(this).val().trim();
        $("#errormessage-username").remove();
        if(jQuery.inArray(hostname, registeredHostname) > -1)
        {
            var html = '<div class="errormessage-username" id="errormessage-username" text-danger"="">Hostname already exists.</div>';
            $(this).parent().after(html);
        }
    });*/
}

function serviceSubmit() {
    if (checkIfFieldIsEmpty("Host")) {
        return;
    }
    if (checkIfFieldIsEmpty("Service")) {
        return;
    }
    if ($("#REUSABLE_EMAIL_" + serviceIdCount).val() === null) {
        alert("Choose Email Address.")
        return;
    }
    if (document.getElementById('BOOL__REUSABLE_AUTOMATION_' + serviceIdCount).checked) {
        if ($("#REUSABLE_AUTOMATION__REUSABLE_VAULT_" + serviceIdCount).val() === null) {
            alert("Choose Secret.");
            return;
        }
    }
    var json = {};
    json["id"] = serviceIdCount;
    var formData = $("#servicedata").serializeArray();
    formData.forEach(function (obj) {
        json["SERVICE_TEMPLATE"] = $("#services-dropdown").val();
        json[obj.name] = obj.value;
    });
    service_list.push(json);
    var tempserviceName = json["CUSTOM_SERVICENAME"];
    if (tempserviceName === undefined) {
        tempserviceName = "--";
    }

    var html = "";
    html += '<div class="col-lg-2 col-md-3 col-6 each-card each-card-service mr-2 primary-low" id="reg-service-' + serviceIdCount + '">';
    html += '<div class="row eachrow">';
    html += '<div class="col-10 p-0">';
    html += '<a style="cursor: pointer;" onclick="editService(this)" data-id="' + serviceIdCount + '" data-template="' + $("#services-dropdown").val() + '">';
    html += '<h6>' + tempserviceName + '</h6>';
    html += '<span class="d-block" style="font-size:10px;"> ' + $("#services-dropdown").val().split("_")[2].replace(".j2", "") + '</span>';
    html += '</a>';
    html += '</div>';
    html += '<div class="col-2 p-0 mt-1 text-right">';
    html += '<button class="btn float-right" type="button" onclick="closeClick(this)" data-id="' + serviceIdCount + '" style="padding:0px; background:transparent;"><i class="mdi mdi-close" style="color:white;"></i></button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    $("#registered-service-no-data").css('display', 'none')
    $("#registered-service-div").append(html);
    $("#service-selected").hide();
    $("#service-form-div").empty();
    $("#services-dropdown").val("Select service");
    serviceIdCount++;
}

function editHost(aObj) {
    isEdit = true;
    var ipaddress = $(aObj).attr("data-ipaddress");
   // console.log("editHost -->" + ipaddress)
    requestDataFromServer('edithostdetails', { "ipaddress": ipaddress }, "GET").done(editResponse);
}

function editResponse(response) {
    res = JSON.parse(response);
   // console.log("response-->" + response)
    if (res.status == 200 & res.data != "") {
        getApplicationNames();
        getVaultInformation();
        var list = res.data;
        if (list.length > 0) {
            var hostObj;
            list.forEach(function (obj) {
                if (obj["servicename"] === "") {
                    hostObj = obj;
                    return;
                }
            });
            var hostTemplateObj = JSON.parse(hostObj["json"]);
          //  console.log("editRespon--list--->" + JSON.stringify(hostTemplateObj))
            $('#path-dropdown').val(hostTemplateObj["PATH_TEMPLATE"]).change();
            $("#nodata").hide();
            $("#hostcontent").hide();
            $(".maincontent").show();
            editRespone = list;

            $('#path-dropdown').attr('disabled', 'disabled');
            var html = '<input type="hidden" name="PATH_TEMPLATE"  value="' + hostTemplateObj["PATH_TEMPLATE"] + '">';
            $("#hostdata").append(html);
        }
    }
    else if (res.status == 200 & res.data == "") {
      //  console.log('else if --->')
        swal('Not able to fetch data', ' ', "warning")
    }
    else {
        swal('Not able to edit host', ' ', "error")
    }
}

function hostCloseClick(btn) {
    toBeDeletedHost = true;
    deleteBtn = btn;

    swal({
        title: "Delete Host",
        text: "Want to permanently delete this host?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete",
        closeOnConfirm: false
    },
        function () {
            deleteEntry()
        });
}

function editService(aObj) {
    if ($("#service-selected").is(":visible")) {
        $("#serviceBtn").trigger('click');
    }

    isServiceEdit = true;
    $('#services-dropdown').val($(aObj).attr("data-template")).change();
    setTimeout(function () {
        var id = parseInt($(aObj).attr("data-id"));
        var index = 0;
        service_list.forEach(function (obj) {
            if (parseInt(obj.id) === id) {
                $.each(obj, function (key, val) {
                    var isBoolean = false;
                    if (key.indexOf('__') >= 0) {
                        var tempArray = key.split('__');
                        if (tempArray[0] == "BOOL" && val == "on") {
                            isBoolean = true;
                            $("#" + key + "_" + serviceIdCount).prop('checked', true);
                            $("." + $("#" + key + "_" + serviceIdCount).attr("data-to-hide")).show();
                        }
                    }
                    if (!isBoolean) {
                        $("#" + key + "_" + serviceIdCount).val(val);
                        $("#" + key + "_" + serviceIdCount).parent().find("label").addClass("move_label");
                        $("#" + key + "_" + serviceIdCount).parent().addClass("bg_input");
                    }
                });
                service_list.splice(index, 1);
                return;
            }
            index++;
        });
        $("#reg-service-" + id).remove();
    }, 500);
}

function closeClick(btn) {
    toBeDeletedHost = false;
    deleteBtn = btn;
    swal({
        title: "Delete Service",
        text: "Want to permanently delete this service?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete",
        closeOnConfirm: true
    },
        function () {
            deleteEntry()
        });
}

function handledeleteresponse(response) {
    res = JSON.parse(response)
    if (res.status == 200) {
        swal(res.data, ' ', "success");
        location.reload();
    }
    else
        swal(res.data, ' ', "error");
}

function deleteEntry() {
    if (toBeDeletedHost) {
        var hostname = $(deleteBtn).attr("data-host-name");
        var ipaddress = $(deleteBtn).attr("data-host-ip");
        $(".loader").show();
        requestDataFromServer('deletehost', { 'hostname': hostname, 'ipaddress': ipaddress, csrfmiddlewaretoken: csfr_token }, "POST").done(handledeleteresponse);
    }
    else {
        var id = parseInt($(deleteBtn).attr("data-id"));
        var index = 0;
        service_list.forEach(function (obj) {
            if (parseInt(obj.id) === id) {
                service_list.splice(index, 1);
            }
            index++;
        });
        $("#reg-service-" + id).remove();
        if (service_list.length == 0)
            $("#registered-service-no-data").css('display', 'block')
    }
}

function sendFormDataToServer() {
   // console.log("sendFormDataToServer---->")
    if (checkIfFieldIsEmpty("Host")) {
        return;
    }

    var ipList = $('#multi-select-ip').multipleSelect('getSelects');
    if (ipList.length == 0) {
        alert("Choose atleast one ip address to create host.");
        return;
    }

    if ($("#GLOBAL_APPLICATION").val() === null) {
        alert("Choose Application.");
        return;
    }

    if ($("#REUSABLE_EMAIL").val() === null) {
        alert("Choose Email Address.")
        return;
    }

    if (document.getElementById('BOOL__REUSABLE_AUTOMATION').checked) {
        if ($("#REUSABLE_AUTOMATION__REUSABLE_VAULT").val() === null) {
            alert("Choose Secret.");
            return;
        }
    }

    if ($("#service-selected").is(":visible")) {
        alert("Submit services before saving.");
        return;
    }
    $("#save").hide();
    $(".loader").show();
    var formData = $("#hostdata").serializeArray();
    var json = {};
    formData.forEach(function (obj) {
       // console.log("sendFormDataToServer----data-->" + JSON.stringify(obj))
        json[obj.name] = obj.value;
    });

    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    jsonObj["host"] = json;
    jsonObj["service"] = service_list;
    jsonObj["iplist"] = ipList;
   // console.log("sendFormDataToServer====//====>" + JSON.stringify(jsonObj))
    requestDataFromServer('createcfg', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(handleFileCreationResponse);
}

function handleFileCreationResponse(response) {
   // console.log("handleFileCreationResponse--->" + response)
    res = JSON.parse(response)
    $(".loader").hide();
    if (res.status == 200) {
        swal(res.data, ' ', "success");
        location.reload();
    }
    else
        swal(res.data, ' ', "error");
}

function checkIfFieldIsEmpty(checker) {
    var hasEmptyField = false;
    $('.input_effect').each(function () {
        var id = $(this).attr("id");
        var data_template = $(this).attr("data-template");
        if (data_template == checker) {
            if ($("#" + id + "-div").is(':visible') && $(this).val().trim() === "") {
                $(this).focusout();
                hasEmptyField = true;
            }
        }
    });

    if (checker === "Host") {
        if ($("#errormessage-username").is(':visible')) {
            hasEmptyField = true;
        }
    }

    return hasEmptyField;
}

function autoSelectHost() {
    var hostObj;
    editRespone.forEach(function (obj) {
        if (obj["servicename"] === "") {
            hostObj = obj;
            return;
        }
    });
    var hostTemplateObj = JSON.parse(hostObj["json"]);
    $('#hosts-dropdown').val(hostTemplateObj["HOST_TEMPLATE"]).change();
    $('#hosts-dropdown').attr('disabled', 'disabled');
    drawSingleIpAddress(hostObj["ipaddress"]);
    $('#multi-select-ip').multipleSelect('checkAll');
    $('#multi-select-ip').multipleSelect('disable');

    var html = '<input type="hidden" name="HOST_TEMPLATE"  value="' + hostTemplateObj["HOST_TEMPLATE"] + '">';
    $("#hostdata").append(html);
}

function editCallback() {
    var hostObj;
    editRespone.forEach(function (obj) {
        if (obj["servicename"] === "") {
            hostObj = obj;
            return;
        }
    });
    var hostTemplateObj = JSON.parse(hostObj["json"]);
    $.each(hostTemplateObj, function (key, val) {
        if (key !== "HOST_TEMPLATE") {
            var isBoolean = false;
            if (key.indexOf('__') >= 0) {
                var tempArray = key.split('__');
                if (tempArray[0] == "BOOL" && val == "on") {
                    isBoolean = true;
                    $("#" + key).prop('checked', true);
                    $("." + $("#" + key).attr("data-to-hide")).show();
                }
            }
            if (!isBoolean) {
                $("#" + key).val(val);
                $("#" + key).parent().find("label").addClass("move_label");
                $("#" + key).parent().addClass("bg_input");
            }
        }
    });

    fillserviceList();
}

function fillserviceList() {
    var html = "";
    var localServiceId = 0;
    editRespone.forEach(function (obj) {
        if (obj["servicename"] !== "") {
            var serviceTemplateObj = JSON.parse(obj["json"]);
            var tempserviceIdCount = parseInt(serviceTemplateObj["id"]);
            if (localServiceId < tempserviceIdCount) {
                localServiceId = tempserviceIdCount;
            }
            var json = {};
            json["id"] = tempserviceIdCount;
            $.each(serviceTemplateObj, function (key, val) {
                json[key] = val;
            });

            var serviceTemplate = serviceTemplateObj["SERVICE_TEMPLATE"];
            var tempserviceName = serviceTemplateObj["CUSTOM_SERVICENAME"];
            if (tempserviceName === undefined) {
                tempserviceName = "--"
            }
            html += '<div class="col-lg-2 col-md-3 col-6 each-card each-card-service mr-2 primary-low" id="reg-service-' + tempserviceIdCount + '">';
            html += '<div class="row eachrow">';
            html += '<div class="col-10 p-0">';
            html += '<a style="cursor: pointer;" onclick="editService(this)" data-id="' + tempserviceIdCount + '" data-template="' + serviceTemplate + '">';
            html += '<h6>' + tempserviceName + '</h6>';
            html += '<span class="d-block" style="font-size:10px;"> ' + serviceTemplate.split("_")[2].replace(".j2", "") + '</span>';
            html += '</a>';
            html += '</div>';
            html += '<div class="col-2 p-0 mt-1 text-right">';
            html += '<button class="btn float-right" type="button" onclick="closeClick(this)" data-id="' + tempserviceIdCount + '" style="padding:0px; background:transparent;"><i class="icon-close"></i></button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            service_list.push(json);
            serviceIdCount++;
        }
    });
    serviceIdCount = serviceIdCount + localServiceId;

    $("#registered-service-no-data").css('display', 'none')
    $("#registered-service-div").append(html);
    $("#service-selected").hide();
    $("#service-form-div").empty();
}
function getServices() {
    $(".loader").show();
    requestDataFromServer('/vault/getfilenames', { "fileName": "SERVICES" }, "GET").done(fillServices);
}
function fillServices(response) {
    $(".loader").hide();
    var serviceHtml = ' '
    res = JSON.parse(response);
    var serviceHtml = '<option value=" "' + 'selected disabled>Select service</option>';
    if (res.status == 200) {
        global_all_services = res.data;
        if (global_all_services !== undefined && global_all_services.length > 0) {
            global_all_services.forEach(function (sevices_text) {
                option_value = sevices_text;
                serviceHtml += '<option value="' + option_value + '">' + option_value + '</option>';
            });
        }
    }
    $("#serviceList").append(serviceHtml);
}
function onAddSecrets() {//name changed from secret to secrets
    var isInputFilled = validation('input_feild');
    if (!isInputFilled) {
        $("#error-message-view").show();
        $("#error-message").html("Please fill all feilds")
    }
    else {
        $("#error-message-view").hide();
        $('#addbtn').attr('data-dismiss', "modal");
        data = [];
        requestData = {};
        ip_array = [];

        ipValue = $("#ip").val()
        if (ipValue.includes(",")) {
            ip_list = ipValue.split(',')
            ip_array = ip_list.filter((value, index) => ip_list.indexOf(value) === index)
        }
        else {
            ip_array[0] = ipValue
        }
        for (var i = 0; i < ip_array.length; i++) {
            clientData = {}
            clientData["username"] = $("#dialog-for-addsecret #username").val(),
                clientData["password"] = $("#dialog-for-addsecret #password").val(),
                clientData["service"] = $("#dialog-for-addsecret #serviceList").val(),
                clientData["ip"] = ip_array[i],
                clientData["operation"] = 'add'
            data.push(clientData)
        }
        requestData['data'] = data;
        requestDataFromServer('/vault/vaultOperation', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(addSecretResponse);
    }
}
function addSecretResponse(response) {
    if (response.length > 0) {
        response.forEach(function (res) {
            if (res && res.status == 204) {
                swal("Secret added sucessfully", ' ', 'success')
                var tempArray = (res.url).split('/')         // /secret/Linux/178.99.00.00/user3
                var obj = {};
                obj["id"] = res.rowid;
                obj["username"] = tempArray[4];
                obj["service"] = tempArray[2]
                obj["ip"] = tempArray[3];
                obj["url"] = res.url;
                vaults.push(obj)
                if ($("#REUSABLE_AUTOMATION__REUSABLE_VAULT").is(":visible")) {
                    var selectedVal = $("#REUSABLE_AUTOMATION__REUSABLE_VAULT").val();
                    var innerHtml = " ";
                    innerHtml += '<option value="' + res.url + '">' + res.url + '</option>';
                    $("#REUSABLE_AUTOMATION__REUSABLE_VAULT").append(innerHtml);
                    if (selectedVal !== null && selectedVal !== "")
                        $("#REUSABLE_AUTOMATION__REUSABLE_VAULT").val(selectedVal);
                    else
                        $("#REUSABLE_AUTOMATION__REUSABLE_VAULT").val(res.url);
                }
            }
            else {
                swal("Not able to add secret", ' ', 'error')
                return false;
            }
        })
    }
    else {
        swal("Not able to add secret", ' ', 'error')
        return false;
    }
}
function validation(className) {
    var isAllInputFilled = true;
    $('.' + className).each(function (e) {
        if ($(this).val() == '' || $(this).val() == null) {
            isAllInputFilled = false;
        }
    });
    return isAllInputFilled;
}
function addSecret() {
    document.getElementById('ip').value = '';
    document.getElementById('username').value = '';
    $("#serviceList").val(' ')
}

function emailListResponse() {
    requestDataFromServer('/useronboard/getuserlist', {}, "GET").done(function (response) {
        var res = JSON.parse(response);
        if (res.status == 200) {
            res.data.forEach(function (obj) {
                if (obj.email !== "admin") {
                    emailLists.push(obj.email)
                }
            });
        }
        else {
            //console.log("Error in Getting User List :" + JSON.stringify(res));
        }
    });
}
