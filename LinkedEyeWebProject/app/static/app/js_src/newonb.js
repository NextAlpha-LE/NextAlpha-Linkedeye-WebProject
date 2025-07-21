var global_all_services;
var global_ip_addresses;
var service_list = [];
var ilomgmt_list = [];
var nodemgmt_list = [];
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
var nicdatas = ''
var nicdatasip = ''
var nicid = ''
var mgmtilo = ''
var v2cipaddr = ''
var v2cid = ''
var v3cipaddr = ''
var v2cpro = ''
var v3cpro = ''
var v3cid = ''
var mgmtidrac = ''
var mgmtnodeexp = ''
var mgmtiloipaddr = ''
var mgmtidracipaddr = ''
var mgmtnodeipaddr = ''
var gatewayswitch = 0
var publicswitch = 0
var exchangeswitch = 0
var fortigate50E = 0
var fortigate60E = 0
var fortigate60F = 0
var fortigate80F = 0
var fortigate100E = 0
var fortigate100F = 0
var fortigate200F = 0
var physicalser = 0
var virtualser = 0
var nametype = ''
var gcount = 0, ecount = 0, scount = 0, pcount = 0, fcount = 0;
$(document).ready(function () {
    $(".loader").hide();
    emailListResponse();
    getServices();
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
            });
            $("#ip-dropdown").append(html);
        }
    });
});


function serverFunction(name) {
    var svrname = name;
    if (name == "VM") {
        $("#PHYSICAL_IP").css('display', 'block');
        $("#Mgmnt_val").css('display', 'none');
        $("#snmp_val").css('display', 'none');
    }
    else {
        $("#Mgmnt_val").css('display', 'none');
        $("#PHYSICAL_IP").css('display', 'none');
        $("#snmp_val").css('display', 'none');
    }
    html = '';
    html += '<option selected value="' + name + '">' + name + '</option>';
    $("#path-dropdown").append(html);
    document.getElementById('hoststitle').textContent = "create " + name + " Server"
    getFileNames(svrname);
}

function niccard() {
    requestDataFromServer('Serversnic', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
        nicres = JSON.parse(response)
        var nichtml = ''
        $("#niccardhtml").empty();
        nicres.data.forEach(function (obj) {
            nichtml += '<div class="row" id="">'
            nichtml += '<div class="col-2" type=""  id="' + obj.nic + '" onclick="" style="display:block;" />' + obj.nic + ' : '
            nichtml += '</div>'
            nichtml += '<div class="col-6 multiip">'
            nichtml += '<input class="form-check-input" type="checkbox" id="' + obj.nic + '" onclick="Niccards(this, \'' + obj.nic + '\')">'
            nichtml += '<input class="aliasname" type="text" name="' + obj.nic + '" placeholder="Enter Alias" value="" id="' + obj.nic + 'vtxt" style="background-color: #1f1f1f;color: #878787; border: 1px solid #e58e22" disabled />'
            nichtml += '<input class="ipadd" type="text" name="' + obj.nic + '" placeholder="Enter IP" value="" id="' + obj.nic + 'txt" style="background-color: #1f1f1f;color: #878787; border: 1px solid #e58e22" disabled />'
            nichtml += '</div>'
            nichtml += '<div class="col-4"></div>'
            nichtml += '</div>'
            nichtml += '<br />'
        });
        $("#niccardhtml").append(nichtml);
    });
}

function savenicdata() {
    var items = {}
    $('.multiip').each(function () {
        var key = $(this).find('.aliasname').val()
        var value = $(this).find('.ipadd').val()
        var typename = ($(this).find('.ipadd').attr('id')).split('txt')[0]
        if (key != '') {
            if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)) {
                items[typename] = {};
                items[typename]['alias'] = key;
                items[typename]['ip'] = value;
                $("#morenicModal").hide();
            }
            else {
                swal("You have entered an invalid IP address!", ' ', 'error')
                $("#morenicModal").show();
            }
        }

    })
    document.getElementById("NICS_LIST").value = JSON.stringify(items)
}

function Niccards(chkNic, id) {
    var txtboxedit = document.getElementById(id + "txt");
    var vtxtboxedit = document.getElementById(id + "vtxt");
    txtboxedit.disabled = chkNic.checked ? false : true;
    vtxtboxedit.disabled = chkNic.checked ? false : true;
    if (!txtboxedit.disabled) {
        txtboxedit.focus();
    }
    if (!vtxtboxedit.disabled) {
        vtxtboxedit.focus();
    }
}

function firewallFunction(name) {
    var firename = name;
    $("#Mgmnt_btn").css('display', 'none');
    $("#PHYSICAL_IP").css('display', 'none');
    $("#Mgmnt_val").css('display', 'none');
    $("#Node_val").css('display', 'none');
    html = '';
    html += '<option selected value="' + name + '">' + name + '</option>';
    $("#path-dropdown").append(html);
    document.getElementById('hoststitle').textContent = "Create " + name
    getFileNames(firename);
}

function firewalltype() {
    requestDataFromServer('Firewalltype', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
        fireres = JSON.parse(response)
        var firetypehtml = ''
        var flayering;
        $("#firewalltypelist").empty();
        if (fireres.data != '') {
            fireres.data.forEach(function (obj) {
                var flayers = obj.types
                flayering = flayers.replace(/\s/g, '')
                firetypehtml += '<div class="col-3">'
                firetypehtml += '<div class="card addcard" style="border: 1px solid aliceblue">'
                firetypehtml += '<div class="row" style="display:flex">'
                firetypehtml += '<div class="col-lg-3 col-4 my-auto">'
                firetypehtml += '<div class="mdi mdi-security display-4 text-success icon-size-increase"></div>'
                firetypehtml += '</div>'
                firetypehtml += '<div class="col-lg-6 col-8 my-auto">'
                firetypehtml += '<h6 class="mb-1" style="font-size:13px;">' + obj.types + '</h6>'
                firetypehtml += '<p class="primary-text bold-text size18 mb-1" id="' + flayering + '">0</p>'
                firetypehtml += '<p class="size12 d-md-block d-none mb-md-0" style="font-size:10px;">Firewalls Available</p>'
                firetypehtml += '</div >'
                firetypehtml += '<div class="col-lg-3 col-12 position-relativemt-auto px-lg-0 px-2 text-md-right text-lg-center" style = "padding-bottom: 3%;">'
                firetypehtml += '<i class="mdi mdi-plus mobile" onclick="firewallFunction(\'' + obj.types + '\')" data-toggle="modal" data-target="#CreateServer"></i><br /><br />'
                firetypehtml += '<a href="#hard servers" class="detail-link warning size10 view">View</a>'
                firetypehtml += '</div >'
                firetypehtml += '</div>'
                firetypehtml += '</div>'
                firetypehtml += '</div>&emsp;&emsp;&ensp;'
            });
            $("#firewalltypelist").append(firetypehtml);
        }
        else {
            swal("Firewall's type not Added, Please check Administrator", ' ', 'warning')
        }
        if (document.getElementById('Fortigate50E') != null) {
            document.getElementById('Fortigate50E').textContent = fortigate50E
        }
        if (document.getElementById('Fortigate60E') != null) {
            document.getElementById('Fortigate60E').textContent = fortigate60E
        }
        if (document.getElementById('Fortigate60F') != null) {
            document.getElementById('Fortigate60F').textContent = fortigate60F
        }
        if (document.getElementById('Fortigate80F') != null) {
            document.getElementById('Fortigate80F').textContent = fortigate80F
        }
        if (document.getElementById('Fortigate100E') != null) {
            document.getElementById('Fortigate100E').textContent = fortigate100E
        }
        if (document.getElementById('Fortigate100F') != null) {
            document.getElementById('Fortigate100F').textContent = fortigate100F
        }
        if (document.getElementById('Fortigate200F') != null) {
            document.getElementById('Fortigate200F').textContent = fortigate200F
        }
    });
}

function serverstype() {
    requestDataFromServer('getserverstype', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
        res = JSON.parse(response)
        var sertypehtml = ''
        $("#servertypelist").empty();
        if (res.data != '') {
            res.data.forEach(function (obj) {
                sertypehtml += '<div class="col-3">'
                sertypehtml += '<div class="card addcard" style="border: 1px solid aliceblue">'
                sertypehtml += '<div class="row" style="display:flex">'
                sertypehtml += '<div class="col-lg-3 col-4 my-auto">'
                sertypehtml += '<div class="mdi mdi-server-network display-4 text-success icon-size-increase"></div>'
                sertypehtml += '</div>'
                sertypehtml += '<div class="col-lg-6 col-8 my-auto">'
                sertypehtml += '<h6 class="mb-1" style="font-size:13px;">' + obj.types + '</h6>'
                sertypehtml += '<p class="primary-text bold-text size18 mb-1" id="' + obj.types + '">0</p>'
                sertypehtml += '<p class="size12 d-md-block d-none mb-md-0" style="font-size:10px;">Servers Available</p>'
                sertypehtml += '</div >'
                sertypehtml += '<div class="col-lg-3 col-12 position-relativemt-auto px-lg-0 px-2 text-md-right text-lg-center" style = "padding-bottom: 3%;">'
                sertypehtml += '<i class="mdi mdi-plus mobile" onclick="serverFunction(\'' + obj.types + '\')" data-toggle="modal" data-target="#CreateServer"></i><br /><br />'
                sertypehtml += '<a href="#hard servers" class="detail-link warning size10 view">View</a>'
                sertypehtml += '</div >'
                sertypehtml += '</div>'
                sertypehtml += '</div>'
                sertypehtml += '</div>&emsp;&emsp;&ensp;'
            });
            $("#servertypelist").append(sertypehtml);
        }
        else {
            swal("Server's type not Added, Please check Administrator", ' ', 'warning')
        }
        if (document.getElementById('Physical') != null) {
            document.getElementById('Physical').textContent = physicalser
        }
        if (document.getElementById('VM') != null) {
            document.getElementById('VM').textContent = virtualser
        }
    });
    Serveros()
    Serversoftware()
}
function Serveros() {
    requestDataFromServer('Serversos', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
        osres = JSON.parse(response)
        var ostypehtml = ''
        osres.data.forEach(function (obj) {
            ostypehtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + obj.os + '">' + obj.os + '</option>';
        });
        $("#oshost-dropdown").append(ostypehtml);
    });
}
function Serversoftware() {
    requestDataFromServer('Serverssoftware', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
        softres = JSON.parse(response)
        var softtypehtml = ''
        softres.data.forEach(function (obj) {
            softtypehtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + obj.software + '">' + obj.software + '</option>';
        });
        $("#servicessoft-dropdown").append(softtypehtml);
    });
}

function switchFunction(name) {
    var swiname = name
    $("#PHYSICAL_IP").css('display', 'none');
    $("#Mgmnt_btn").css('display', 'none');
    $("#Mgmnt_val").css('display', 'none');
    $("#Node_val").css('display', 'none');
    html = '';
    html += '<option selected value="' + name + '">' + name + '</option>';
    $("#path-dropdown").append(html);
    document.getElementById('hoststitle').textContent = "Create " + name
    getFileNames(swiname);
}

function Switchlayer() {
    requestDataFromServer('Switcheslayer', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
        swires = JSON.parse(response)
        var switypehtml = ''
        $("#swithtypelist").empty();
        if (swires.data != '') {
            swires.data.forEach(function (obj) {
                var layers = obj.layers
                var layering = layers.replace(/\s/g, '')
                switypehtml += '<div class="col-3">'
                switypehtml += '<div class="card addcard" style="border: 1px solid aliceblue">'
                switypehtml += '<div class="row" style="display:flex">'
                switypehtml += '<div class="col-lg-3 col-4 my-auto">'
                switypehtml += '<div class="mdi mdi-server-network display-4 text-success icon-size-increase"></div>'
                switypehtml += '</div>'
                switypehtml += '<div class="col-lg-6 col-8 my-auto">'
                switypehtml += '<h6 class="mb-1" style="font-size:13px;">' + obj.layers + '</h6>'
                switypehtml += '<p class="primary-text bold-text size18 mb-1" id="' + layering + '">0</p>'
                switypehtml += '<p class="size12 d-md-block d-none mb-md-0" style="font-size:10px;">Switchs Available</p>'
                switypehtml += '</div >'
                switypehtml += '<div class="col-lg-3 col-12 position-relativemt-auto px-lg-0 px-2 text-md-right text-lg-center" style = "padding-bottom: 3%;">'
                switypehtml += '<i class="mdi mdi-plus mobile" onclick="switchFunction(\'' + obj.layers + '\')" data-toggle="modal" data-target="#CreateServer"></i><br /><br />'
                switypehtml += '<a href="#hard servers" class="detail-link warning size10 view">View</a>'
                switypehtml += '</div >'
                switypehtml += '</div>'
                switypehtml += '</div>'
                switypehtml += '</div>&emsp;&emsp;&ensp;'
            });
            $("#swithtypelist").append(switypehtml);
        }
        else {
            swal("Switch's type not Added, Please check Administrator", ' ', 'warning')
        }
        if (document.getElementById('GatewaySwitch') != null) {
            document.getElementById('GatewaySwitch').textContent = gatewayswitch
        }
        if (document.getElementById('PublicSwitch') != null) {
            document.getElementById('PublicSwitch').textContent = publicswitch
        }
        if (document.getElementById('ExchangeSwitch') != null) {
            document.getElementById('ExchangeSwitch').textContent = exchangeswitch
        }
    });
}

function tablenewonb() {
    requestDataFromServer('newonbtable', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
        newonbs = JSON.parse(response)
        // console.log("tablenewonb-obj-->" + JSON.stringify(newonbs))
        var ph = 0, vm = 0, ps = 0, gs = 0, es = 0, f60e = 0, f60f = 0, f50e = 0, f80f = 0, f100e = 0, f100f = 0, f200f = 0;
        newonbs.data.forEach(function (obj) {
            registeredIPAddress.push(obj.ipaddress);
            // console.log("tablenewonb-obj-->" + JSON.stringify(obj.pathhost))
            if (obj.pathhost == 'Physical') {
                ph++;
                phy = ph
                physicalser = phy
            }
            if (obj.pathhost == 'VM') {
                vm++;
                vir = vm
                virtualser = vir
            }
            if (obj.pathhost == 'Public Switch') {
                ps++;
                psw = ps
                publicswitch = psw
            }
            if (obj.pathhost == 'Gateway Switch') {
                gs++;
                gsw = gs
                gatewayswitch = gsw
            }
            if (obj.pathhost == 'Exchange Switch') {
                es++;
                esw = es
                exchangeswitch = esw
            }
            if (obj.pathhost == 'Fortigate 50E') {
                f50e++;
                fw50e = f50e
                fortigate50E = fw50e
            }
            if (obj.pathhost == 'Fortigate 60E') {
                f60e++;
                fw60e = f60e
                fortigate60E = fw60e
            }
            if (obj.pathhost == 'Fortigate 60F') {
                f60f++;
                fw60f = f60f
                fortigate60F = fw60f
            }
            if (obj.pathhost == 'Fortigate 80F') {
                f80f++;
                fw80f = f80f
                fortigate80F = fw80f
            }
            if (obj.pathhost == 'Fortigate 100E') {
                f100e++;
                fw100e = f100e
                fortigate100E = fw100e
            }
            if (obj.pathhost == 'Fortigate 100F') {
                f100f++;
                fw100f = f100f
                fortigate100F = fw100f
            }
            if (obj.pathhost == 'Fortigate 200F') {
                f200f++;
                fw200f = f200f
                fortigate200F = fw200f
            }
        });
        var datasin = gatewayswitch + publicswitch + exchangeswitch
        var dataserver = physicalser + virtualser
        var datafirewall = fortigate50E + fortigate60E + fortigate60F + fortigate80F + fortigate100E + fortigate100F + fortigate200F
        // console.log("datasin--->" + JSON.stringify((datasin)))
        // console.log("dataserver--->" + JSON.stringify((dataserver)))
        // console.log("datafirewall--->" + JSON.stringify((datafirewall)))
        if (datasin != "") {
            document.getElementById('totalswitch').textContent = datasin
        } else {
            document.getElementById('totalswitch').textContent = 0
        }
        if (dataserver != "") {
            document.getElementById('totalServers').textContent = dataserver
        } else {
            document.getElementById('totalServers').textContent = 0
        }
        if (datafirewall != "") {
            document.getElementById('totalFirewall').textContent = datafirewall
        } else {
            document.getElementById('totalFirewall').textContent = 0
        }

    });
}

function savedata() {
    requestData = {};
    data = {};

    var formData = $("#hostdata").serializeArray();
    var json = {};
    var jss = ''
    formData.forEach(function (obj) {
        json[obj.name] = obj.value;
        jss = json[obj.name];
    });
    data["selecthost"] = $('#CreateServer #hosts-dropdown').val();
    data["ipaddress"] = $('#CreateServer #multi-select-ip').val();
    data["servertype"] = $('#CreateServer #GLOBAL_APPLICATION').val();
    data["emailid"] = $('#CreateServer #REUSABLE_EMAIL').val();
    data["servicename"] = $('#CreateServer #servicessoft-dropdown').val();
    data["textname"] = $('#CreateServer #FRNDLY_NAME').val();
    data["json"] = json;
    data["pathhost"] = $('#CreateServer #path-dropdown').val();
    data["phyipaddress"] = $('#CreateServer #PHYSICAL_IP').val();

    data["operation"] = 'add'
    requestData["data"] = data;
    $('#CreateServer #save').attr('data-dismiss', "modal");
    requestDataFromServer('Saveonboard', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(onboardResponse);
}
function onboardResponse(response) {
    data = requestData["data"]
    if (response && response.status == 200) {
        data["id"] = response.rowid;
        var html = "";
        html += '<option value="' + data.id + '-' + data.sitename + '">' + data.sitename + '</option>';
        $("#multi-select-site").append(html);        //site list in register user on useronboard
        $("#edit-multi-select-site").append(html);
        $("#multi-select-site").multipleSelect('refresh')
        $("#edit-multi-select-site").multipleSelect('refresh')
        var userList = data['users']
        var isFound = userList.some(el => el.user_id == loginuserId);
        if (isFound) {
            siteHtml = ' '
            addSite(data)
            $("#sitetemplate #data tbody").append(siteHtml);
        }
        swal(response.msg, ' ', "success");
    }
    else {
        swal(response.msg, ' ', "error");
    }
}

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
        // requestDataFromServer('getfilenames', { "fileName": hostPath + "/SERVICES" }, "GET").done(fillServicesValuesafterHSDiscover);
        requestDataFromServer('getfilenames', { "fileName": hostPath }, "GET").done(fillServicesValuesafterHSDiscover);
    }
    else {
        swal('Not able to scan', '', "error");
    }
}

function fillServicesValuesafterHSDiscover(response) {
    // console.log("fillServicesValuesafterHSDiscover--->"+response)
    global_all_services = JSON.parse(response);
    if ($("#services-dropdown").is(":visible")) {
        var serviceHtml = "<option selected disabled>Select service</option>";
        var hostTechType = $("#hosts-dropdown").val().split("_")[0];
        if (global_all_services !== undefined && global_all_services.length > 0) {
            $("#services-dropdown").empty();
            global_all_services.forEach(function (sevices_text) {
                // if (sevices_text.split("_")[0] === hostTechType) {
                // serviceHtml += '<option value="' + sevices_text + '">' + sevices_text.split("_")[2].replace(".j2", "") + '</option>';
                serviceHtml += '<option value="' + sevices_text + '">' + sevices_text.replace(".j2", "") + '</option>';
                // }
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
    // getFileNames();
}

function fillHostDetails() {
    requestDataFromServer('gethostservicedata', {}, "GET").done(fillHostResponse);
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
                //registeredIPAddress.push(obj.address);
                
                requestDataFromServer('/dashboard/snmpnewtable', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
                    const snmptable = JSON.parse(response).data || [];
                    const v2cipaddrArr = [], v3cipaddrArr = [];
                    const vcid = [], v3cid = [];
                   // console.log("snmpnewtable---->" + JSON.stringify(snmptable))
                    for (const obj of snmptable) {
                        if (obj.version === 'v2c') {
                            vcid.push(obj.id);
                            v2cpro = obj.version;
                            v2cipaddrArr.push(obj.ipaddress);
                        }
                        if (obj.version === 'v3') {
                            v3cid.push(obj.id);
                            v3cpro = obj.version;
                            v3cipaddrArr.push(obj.ipaddress);
                        }
                    }
                
                    requestDataFromServer('getmgmntdata', { ipaddress: obj.address }, "GET").done(function (response) {
                        const mgmtres = JSON.parse(response).data || [];
                        const iloipaddrArr = [], idracipaddrArr = [], nodeipaddrArr = [];
                        for (const obj of mgmtres) {
                            if (obj.prototype === 'ilo') {
                                mgmtilo = obj.prototype
                                iloipaddrArr.push(obj.ipaddress);
                            }
                            if (obj.prototype === 'idrac') {
                                mgmtidrac = obj.prototype
                                idracipaddrArr.push(obj.ipaddress);
                            }
                            if (obj.prototype === 'Node Expo') {
                                mgmtnodeexp = obj.prototype
                                nodeipaddrArr.push(obj.ipaddress);
                            }
                        }
                        /*if (mgmtres.status == 200 && mgmtres.data != '') {
                            mgmt_details = mgmtres.data
                            mgmt_details.forEach(function (obj) {
                                if (obj.prototype == 'ilo') {
                                    mgmtilo = obj.prototype
                                    mgmtiloipaddr = obj.ipaddress
                                }
                                if (obj.prototype == 'idrac') {
                                    mgmtidrac = obj.prototype
                                    mgmtidracipaddr = obj.ipaddress
                                }
                                if (obj.prototype == 'Node Expo') {
                                    mgmtnodeexp = obj.prototype
                                    mgmtnodeipaddr = obj.ipaddress
                                }
                            });
                        }*/
                        // add the card valuse here 

                        html += '<fieldset class="card onboards" id="s' + ((obj.address).replaceAll('.', '_'))+'" style="margin-bottom:0;border: 1px solid #fff; width:330px !important">'
                        html += '<legend>'
                        html += '<div class="row">'
                        html += '<div class="col-8" style="margin-top:2%;margin-left:2%;">'
                        html += '<p class="bold-text mb-0 text-color" style="font-size: 12px;"> ' + obj.host_name + '(' + obj.server_type + ')</p>'
                        html += '</div>'
                        html += '<div class="col-4" style="margin-left:-4%;">'
                        html += '<i class="mdi mdi-download" onclick="exportone(this)" data-ipaddress-name="' + obj.address + '" style="color:white;font-size: 20px; padding-left:18% !important;"></i>';
                        html += '<i class="mdi mdi-pen" onclick="editHost(this)" data-toggle="modal" data-target="#CreateServer" data-ipaddress="' + obj.address + '"style="color:white;font-size: 20px; padding-left:7% !important;"></i>';
                        html += '<i class="mdi mdi-close" onclick="hostCloseClick(this)" data-host-ip="' + obj.address + '" data-host-name="' + obj.host_name + '" style="color:white;font-size: 20px; padding-left: 7% !important;"></i>';
                        html += '</div>'
                        html += '</div>'
                        html += '</legend>'
                        html += '<div class="row">'
                        html += '<div class="col-12" style="display:flex;">'
                        html += '<div class="col-10">'
                        html += '<p class="mb-0 text-color" style="font-size:12px;"><b>Name :</b> ' + obj.friend + '</p>';
                        html += '<p class="mb-0 text-color" style="font-size:12px;"><b>E-Mail :</b> ' + obj.contact_email + '</p>';
                        html += '<p class="mb-0 text-color" style="font-size:12px;"><b>Application :</b> ' + obj.application + '</p>';
                        /*if (obj.automation == 'No') {
                            // html += '<p class="bold-text mb-0 text-color ">Automation : ' + obj.automation + '</p>';
                            html += '<p class="bold-text mb-0 text-color "><img class="imageing" src="/static/images/robot-icon-1.png" style="width: 22px !important; float:left"/>&ensp;Automation Not Enabled</p>';
                        }
                        else {
                            html += '<p class="bold-text mb-0 text-color ">Automation Enabled :<i class="mdi mdi-robot" style="color:green; float:right"></i></p>';
                        }*/
                        html += '<div class="row">';
                        html += '<p class="bold-text mb-0 text-color col-10" style="font-size:12px;">Enabled Monitor plugins</p>';
                        html += '<i class="mdi mdi-plus-circle-outline col-2" onclick="editHost(this)" data-toggle="modal" data-target="#CreateServer" data-ipaddress="' + obj.address + '" style="color:green; float:right;margin-left: -25%;"></i>';
                        html += '</div>';
                        html += '</div>'
                        html += '<div class="col-2">'
                        if (obj.automation == 'No') {
                            html += '<p class="bold-text tooltip mb-0 text-color "><img class="imageing" src="/static/images/robot-icon-1.png" style="width: 22px !important; float:left;margin-left: 7px;"/><span class="tooltiptext">Automation Not Enabled</span></p>';
                        }
                        else {
                            html += '<p class="bold-text tooltip mb-0 text-color "><img class="imaged" src="/static/images/robot-icon-1.png" style="width: 22px !important; float:left;margin-left: 7px;"/><span class="tooltiptext">Automation Enabled</span></p>';
                            }
                        var v2cpro = 'v2c';
                        var v3cpro = 'v3';
                        [v2cipaddrArr, v3cipaddrArr].forEach(function (ipaddrArr) {
                            ipaddrArr.forEach(function (ipaddr, index) {
                                var vpro = (ipaddrArr === v2cipaddrArr) ? v2cpro : v3cpro;
                                var vcidVal = (ipaddrArr === v2cipaddrArr) ? vcid[index] : v3cid[index];
                               // console.log("ipaddr---->" + ipaddr)
                                if (ipaddr === obj.address) {
                                    v3cipaddr = ipaddr
                                    v2cipaddr = ipaddr
                                    html += '<div class="icon-let">';
                                    html += '<i class="mdi mdi-alpha-s-box-outline icon-val" onclick="" id="addsnmp" data-toggle="modal" data-target="#dialog-for-addsnmp" style="color:#55a8fd;"></i>';
                                    html += '<span class="text">';
                                    html += '<div class="">';
                                    html += '<div class="col-12" style="display:flex;margin-left: 0px">'
                                    html += '<p class="bold-text mb-0 text-color"> ' + vpro + ' Added</p>&ensp;&ensp;';
                                    html += '<i class="mdi mdi-lead-pencil" onclick="editmgmnt(this)" data-toggle="modal" name="' + vpro + '" data-target="#CreateServer" data-ipaddress="' + obj.address + '" style="color:white;"></i>&ensp;';
                                    html += '<i class="mdi mdi-close-octagon-outline" onclick="onDeleteSnmp(this)" data-id="' + vcidVal + '" data-host-ip="' + ipaddr + '" data-host-name="' + vpro + '" style="color:red; float:right"></i>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                }
                            });
                        });
                            var mgmtArr = [{ type: 'ilo', addrArr: iloipaddrArr }, { type: 'idrac', addrArr: idracipaddrArr }, { type: 'Node Expo', addrArr: nodeipaddrArr }];
                            mgmtArr.forEach(function (mgmt) {
                               // console.log("mgmtArr--->" + JSON.stringify(mgmt))
                                if (mgmt.addrArr.includes(obj.address)) {
                                    var icon = '';
                                    if (mgmt.type === 'ilo') {
                                        icon = '<i class="mdi mdi-alpha-m-box-outline icon-val" style="color:#55a8fd;"></i>';
                                    } else if (mgmt.type === 'idrac') {
                                        icon = '<i class="mdi mdi-alpha-m-box-outline icon-val" style="color:#55a8fd;"></i>';
                                    } else if (mgmt.type === 'Node Expo') {
                                        icon = '<i class="mdi mdi-alpha-n-box-outline icon-val" style="color:#55a8fd;"></i>';
                                    }
                                    html += '<div class="icon-let">';
                                    html += icon;
                                    html += '<span class="text">';
                                    html += '<div class="">';
                                    html += '<div class="col-12" style="display:flex;margin-left: 0px">'
                                    html += '<p class="bold-text mb-0 text-color"> ' + mgmt.type + ' Added</p>&ensp;&ensp;';
                                    html += '<i class="mdi mdi-lead-pencil" onclick="editmgmnt(this)" data-toggle="modal" name="' + mgmt.type + '" data-target="#CreateServer" data-ipaddress="' + obj.address + '" style="color:white;"></i>&ensp;';
                                    html += '<i class="mdi mdi-close-octagon-outline" onclick="mgmntCloseClick(this)" data-host-ip="' + mgmt.addrArr.join(',') + '" data-host-name="' + mgmt.type + '" style="color:red; float:right"></i>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                }
                            });
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'
                        html += '</div>'
                        html += '</fieldset>&ensp;&ensp;'

                        objid = obj.layer;


                        // var anchorid = ''
                        if (objid == 'g_swi') {
                            gcount++;
                            $("#nohost").hide();
                            $("#gswi").show();
                            var srch_row = 'gatewaysearch-row'
                            document.getElementById('gswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">GATEWAY - SWITCH<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + gcount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.address + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                            $('#gswitch-heading').append('<div class="row" id="gatewaysearch-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + objid + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + objid + '\',\'' + obj.address + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');

                        } else if (objid == 'f_swi') {
                            fcount++;
                            $("#nohost").hide();
                            $("#fswi").show();
                            var srch_row = 'firwallsearch-row'
                            document.getElementById('fswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">FIREWALL<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + fcount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.address + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                            $('#fswitch-heading').append('<div class="row" id="firwallsearch-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + objid + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + objid + '\',\'' + obj.address + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');
                        } else if (objid == 's_hw') {
                            scount++;
                            $("#nohost").hide();
                            $("#sswi").show();
                            var srch_row = 'server-row'
                            document.getElementById('server-heading').innerHTML = '<div class="row row-width" style="margin:unset">SERVERS<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + scount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.address + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                            $('#server-heading').append('<div class="row" id="server-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + objid + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + objid + '\',\'' + obj.address + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');
                        } else if (objid == 'p_swi') {
                            pcount++;
                            $("#nohost").hide();
                            $("#pswi").show();
                            var srch_row = 'publicsearch-row'
                            document.getElementById('pswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">PUBLIC - SWITCH<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + pcount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.address + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                            $('#pswitch-heading').append('<div class="row" id="publicsearch-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + objid + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + objid + '\',\'' + obj.address + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');
                        }
                        else {
                            ecount++;
                            $("#nohost").hide();
                            $("#eswi").show();
                            var srch_row = 'exchangesearch-row'
                            document.getElementById('eswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">EXCHANGE - SWITCH<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + ecount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.address + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                            $('#eswitch-heading').append('<div class="row" id="exchangesearch-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + objid + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + objid + '\',\'' + obj.address + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');
                        }
                       // console.log("objid-->" + objid)
                        //$(anchorid).text(total)  //Rajkumar added Sites count in admin page
                        $("#" + objid).append(html);
                        $("#hostcontent").show();
                        $("#nodata").show();
                    });
                });
            });
        }
        else {
            $("#nodata").show();
        }
    }
    else {
        swal('Not able to get host details', ' ', "error")
    }
    tablenewonb()
}

// export the indiviual onboard file code
let exportone = (element) => {
    const ipAddressName = element.getAttribute('data-ipaddress-name');
    requestDataFromServer('newonbtable', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
        const exportonbs = JSON.parse(response).data;

        const item = exportonbs.find(item => item.ipaddress === ipAddressName);
        if (item) {
            const { id, ...dataWithoutIp } = item; // Exclude "id" from data
            const output = Object.entries(dataWithoutIp)
                .map(([key, value]) => `${key}:${value || ''}`)
                .join("\n");

            const filename = `${item.ipaddress}.txt`;
            const textToBLOB = new Blob([output], { type: "text/plain" });
            const newLink = document.createElement("a");
            newLink.download = filename;
            if (window.webkitURL != null) {
                newLink.href = window.webkitURL.createObjectURL(textToBLOB);
            } else {
                newLink.href = window.URL.createObjectURL(textToBLOB);
                newLink.style.display = "none";
                document.body.appendChild(newLink);
            }

            newLink.click();
        } else {
            console.log(`Data not found for IP address: ${ipAddressName}`);
        }
    });
};

function displaysearchbar(searchrow_name) {
   // console.log("displaysearchbar----->" + searchrow_name)
    if ($('#' + searchrow_name).css('display') != 'none') {
       // console.log("displaysearchbar-if---->" + searchrow_name)
        $('.hide-val' + searchrow_name).show();
        $('#' + searchrow_name).css('display', 'none')
    } else {
       // console.log("displaysearchbar-else---->" + searchrow_name)
        $('.hide-val' + searchrow_name).hide();
        $('#' + searchrow_name).css('display', 'flex')
    }
}
function closesearchbar(closebar) {
    // console.log("closesearchbar----->" + closebar)
    $('#' + closebar).css('display', 'none')
    $('.hide-val' + closebar).show();
}
function swapDivgonb(ele, layer, ip) {
    // console.log("elem-->" + layer)
    //  var ipadd = ip.replaceAll('.', '_')
    var inputValue = $("#switag" + layer).val()
     // console.log('inputvalue--->' + inputValue)
    var swapgid = 's' + inputValue.replaceAll('.', '_')
    // console.log('swapid--->' + swapgid)
    ele = document.getElementById(swapgid)
    // console.log('ELEM--->' + ele)
    // ele.parentNode(ele, document.getElementById(+ ipadd));
    ele.parentNode.insertBefore(ele, document.getElementById(layer).children[0]);
    ele.insertAdjacentHTML('afterend', '&ensp;&ensp;');
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

function getFileNames(nameswi) {
    nametype = nameswi
   // console.log("nametype--->" + nametype)
    requestDataFromServer('getfilenames', { "fileName": hostPath }, "GET").done(fillHostValues);
}

function fillHostValues(response) {
    res = JSON.parse(response);
    if (res.status == 200) {
        // requestDataFromServer('getfilenames', { "fileName": hostPath + "/SERVICES" }, "GET").done(fillServicesValues);
        requestDataFromServer('getfilenames', { "fileName": hostPath }, "GET").done(fillServicesValues);
        var hostHtml = '<option selected disabled>Select host</option>';
        // var hostHtml = ' ';
        var hostNames = res.data;
        $("#hosts-dropdown").empty();
        hostNames.forEach(function (hostName) {
            var gatetypename = nametype.replace(" Switch", "")
            var publtypename = nametype.replace(" switch", "")
            var firetypename = nametype.split(" ")[1]
            var svrhostname = nametype
            if ((hostName.includes(svrhostname))) {
                hostHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + hostName + '" >' + hostName.replace(".j2", "") + '</option>';
                // $("#service-data-ip").hide();
                $("#service-data-ip").attr('style', 'display:block !important');
            }
            else if ((hostName.includes(publtypename))) {
                hostHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + hostName + '" >' + hostName.replace(".j2", "") + '</option>';
                $("#service-data-ip").attr('style', 'display:none !important');
            }
            else if ((hostName.includes(firetypename))) {
                hostHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + hostName + '" >' + hostName.replace(".j2", "") + '</option>';
                $("#service-data-ip").attr('style', 'display:none !important');
            }
            else if ((hostName.includes(gatetypename))) {
                hostHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + hostName + '" >' + hostName.replace(".j2", "") + '</option>';
                $("#service-data-ip").attr('style', 'display:none !important');
            }
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
        // $("#service-header").text($(select).val().split("_")[2].replace(".j2", ""));
        // requestDataFromServer('getfilecontentdata', { 'filename': hostPath + "_SERVICES_" + $(select).val(), csrfmiddlewaretoken: csfr_token }, "POST").done(handleFileContentResponse);
        $("#service-header").text($(select).val().replace(".j2", ""));
        requestDataFromServer('/allonboard/getfilecontentdata', { 'filename': hostPath + "_" + $(select).val(), csrfmiddlewaretoken: csfr_token }, "POST").done(handleFileContentResponse);
    }
}

function hostselected(select) {
    selectedFileType = "Host";
    $("#host-form-div").empty();
    $("#service-form-div").empty();
    $("#registered-service-div").empty();
    $("#registered-service-no-data").css('display', 'block')
    requestDataFromServer('/allonboard/getfilecontentdata', { 'filename': hostPath + "_" + $(select).val(), csrfmiddlewaretoken: csfr_token }, "POST").done(handleFileContentResponse);
    //requestDataFromServer('getfilecontentdata', {}, "GET").done(handleFileContentResponse);
}


function handleFileContentResponse(response) {
    $("#nic_style").css('display', 'block');
    $("#host-form-div").empty();
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
                    tempArray = input_text.split('_');
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
                    html += '<div class="col-12">';
                    html += '<div class="row">';
                    html += '<div class="col-6">';
                    //html += '<div class="form-group m-0 w-50 px-md-4 px-1 mt-3">';
                    html += '<div class="form-group m-0 px-md-4 px-1">';
                    html += '<label class="text-lowercase" style="left:80px" id="label_' + elementId + '">' + elementPlaceHolder + ' REQUIRED?</label>';
                    html += '<span class="" style="display: list-item !important; padding-bottom: 62px; overflow: hidden;">';
                    html += '<label class="switch position-relative">';
                    html += '<input type="checkbox" id="' + elementId + '" name="' + input_text + '" data-to-hide="' + elementToHide + '" onchange="boolValueChanged(this)" ' + checkBocElementAttribute + '>';
                    html += '<span class="slider round"></span>';
                    html += '</label>';
                    html += '</span>';
                    html += '</div>';
                    html += '</div>';
                    html += '<div class="col-6">';
                    html += '<div class="form-group password-group pan w-60 d-inline-block my-3 px-md-4 px-2" style="margin-left:1%;">'
                    html += '<span class="input_box pass-box">'
                    html += '<textarea class="form-control input_feild" type="text" placeholder="text" required="" id="FRNDLY_NAMES" autocomplete="off" style="width: fit-content; padding-bottom: 0%; padding-top: 2%; padding-right: 200px; display:none; "></textarea>'
                    html += '</span>';
                    html += '</div>';
                    html += '</div>';
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
                    if (elementId == "FRNDLY_NAME") {
                        html += '<label for="' + elementId + '" class="lightgray-text text-lowercase">' + elementId + '</label>';
                        html += '<input type="text" id="' + elementId + '" name="' + input_text + '" class="form-control input_effect inputvalidation ' + elementClass + '" data-attribute="' + inputAttribute + '" autocomplete="off" data-template="' + selectedFileType + '" ' + elementAttribute + '>';
                    }
                    else if (elementId == "PHYSICAL_IP") {
                        html += '<label for="' + elementId + '" class="lightgray-text text-lowercase">' + elementId + '</label>';
                        html += '<input type="text" id="' + elementId + '" name="' + input_text + '" class="form-control input_effect inputvalidation ' + elementClass + '" data-attribute="' + inputAttribute + '" autocomplete="off" data-template="' + selectedFileType + '" ' + elementAttribute + '>';
                    }
                    else {
                        html += '<label for="' + elementId + '" class="lightgray-text text-lowercase">' + elementPlaceHolder + '</label>';
                        html += '<input type="text" id="' + elementId + '" name="' + input_text + '" class="form-control input_effect inputvalidation ' + elementClass + '" data-attribute="' + inputAttribute + '" autocomplete="off" data-template="' + selectedFileType + '" ' + elementAttribute + '>';
                    }
                    //html += '<label for="' + elementId + '" class="lightgray-text text-lowercase">' + elementPlaceHolder + '</label>';
                    //html += '<input type="text" id="' + elementId + '" name="' + input_text + '" class="form-control input_effect inputvalidation ' + elementClass + '" data-attribute="' + inputAttribute + '" autocomplete="off" data-template="' + selectedFileType + '" ' + elementAttribute + '>';
                    html += '</span>';
                    html += '</div>';
                }
            });

            if (selectedFileType === "Host") {
                $("#host-form-div").append(html);
                var serviceHtml = "<option selected disabled>Select service</option>";
                // var hostTechType = $("#hosts-dropdown").val().split("_")[0];
                var hostTechType = $("#hosts-dropdown").val();
                if (global_all_services !== undefined && global_all_services.length > 0) {
                    $("#services-dropdown").empty(); // dropdown on host service
                    global_all_services.forEach(function (sevices_text) {
                        //  if (sevices_text.split("_")[0] === hostTechType) {
                        if (sevices_text.includes("Ser")) {
                            sevices_txt = sevices_text.replace("Ser", "");
                            // serviceHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + sevices_text + '">' + sevices_text.split("_")[2].replace(".j2", "") + '</option>';
                            serviceHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + sevices_text + '">' + sevices_txt.replace(".j2", "") + '</option>';
                            //   }
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
                var servcol = document.getElementById('scrolls')
                if (servcol.classList.contains('col-12')) {//unpin
                    servcol.classList.remove("col-12");
                    servcol.classList.add("col-lg-6");
                }
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
        //swal('Failure in get all secrets', ' ', 'error')
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
                innerHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + obj.applicationname + '">' + obj.applicationname + '</option>';
            }
        });
    }
    else {
        swal('Failure in getallapplicationnames ', ' ', 'error')
    }
    $("#GLOBAL_APPLICATION").append(innerHtml);
    $("#GLOBAL_APPLICATIONS").append(innerHtml);
}

function drawMultiplIPAddresses() {
    if (global_ip_addresses !== undefined) {
        $("#multi-select-ip").empty();
    var html = '<option value="" selected disabled>IP Address</option>';
    global_ip_addresses.forEach(function (obj) {
      var ip = obj["ip"];
      var checkIp = registeredIPAddress.includes(ip);
      var prop = "";
      if (checkIp) {
          html += '<option style="color: gray !important; font-size: 0.875rem;" value="' + ip + '" ' + prop + ' disabled">&nbsp;' + ip + '</option>';
      } else {
          html += '<option style="color: #ffffff !important; font-size: 0.875rem;" value="' + ip + '">&nbsp;' + ip + '</option>';
      }
      html += '<option disabled style="color: transparent; font-size: 0;"></option>'; // Add line space
    });
    $("#multi-select-ip").append(html);
  }
  $("#multipleIPAddressSelect").show();
  registerMultiSelect();
}
/*function drawMultiplIPAddresses() {
    if (global_ip_addresses !== undefined) {
        var html = "";
        global_ip_addresses.forEach(function (obj) {
            var ip = obj["ip"];
            var checkIp = registeredIPAddress.includes(ip);
            var prop = "";
            if (checkIp)
                prop = "disabled";
            html += '<option style="color:#ffffff;font-size:0.875rem;" value="' + ip + '" ' + prop + '>' + ip + '</option>';
        });
        $("#multi-select-ip").append(html);
        $("#multi-select-ips").append(html);
    }
    $("#multipleIPAddressSelect").show();
    registerMultiSelect();
}*/

function drawSingleIpAddress(ipaddress) {
    var html = '<option style="color:#ffffff;font-size:0.875rem;" value="' + ipaddress + '">' + ipaddress + '</option>';
    $("#multi-select-ip").append(html);
    $("#multipleIPAddressSelect").show();
    registerMultiSelect();
}
function registerMultiSelect() {
    if (registeredMultiSelect === true) {
        return;
    }
    registeredMultiSelect = true;
    $('#single-select-ip').select2({
        placeholder: 'IP Address',
        allowClear: true,
        theme: 'bootstrap'
    });
}
/*function registerMultiSelect() {
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
    $('#multi-select-ips').multipleSelect(
        {
            placeholder: 'IP Address',
            filter: true,
            filterPlaceholder: 'Search IP',
            filterAcceptOnEnter: true,
            showClear: true,
            filterByDataLength: 10
        });
}*/

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
    // html += '<span class="d-block" style="font-size:10px;"> ' + $("#services-dropdown").val().split("_")[2].replace(".j2", "") + '</span>';
    html += '<span class="d-block" style="font-size:10px;"> ' + $("#services-dropdown").val().replace(".j2", "") + '</span>';
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
    requestDataFromServer('edithostdetails', { "ipaddress": ipaddress }, "GET").done(editResponse);
}
var prototypes = ''
function editmgmnt(select) {
    isEdit = true;
    var ipaddress = $(select).attr("data-ipaddress");
    prototypes = $(select).attr("name");
    requestDataFromServer('edithostdetails', { "ipaddress": ipaddress }, "GET").done(editmgmtResponse);
}
var validationip = ''
function editmgmtResponse(response) {
    res = JSON.parse(response);
   // console.log("mg_ipaddress---->" + JSON.stringify(res))
    if (res.data[0]['pathhost'] == 'Physical' || res.data[0]['pathhost'] == 'VM') {
        document.getElementById('hoststitle').textContent = "Edit " + res.data[0]['pathhost'] + " Server"
    }
    else {
        document.getElementById('hoststitle').textContent = "Edit " + res.data[0]['pathhost']
    }
    var mg_ipaddress = res.data[0]['ipaddress']
   // console.log("mg_ipaddress---->" + mg_ipaddress)
    var mg_pathhost = (res.data[0]['pathhost']).split(" ")[1]
    var fwg_pathhost = (res.data[0]['pathhost']).split(" ")[0]
    var somehost = JSON.stringify((res.data[0]['selecthost']).split('.')[0])
    var data7hostsome = somehost.split('7')[1]
    var data8hostsome = somehost.split('8')[1]
    var someStr = JSON.stringify(res.data[0]['pathhost'])
    validationip = mg_ipaddress
    if (((data7hostsome) == 'VM"') || ((data8hostsome) == 'VM"')) {
        $("#Mgmnt_val").css('display', 'none');
    }
    else {
        $("#Mgmnt_val").css('display', 'block');
    }
    jsval = someStr.replace(/['"]+/g, '')
    getFileNames(jsval);
    var pathtml = '<option type="" name="PATH_TEMPLATE" value="' + jsval + '"> ' + jsval + '</option >';
    $("#path-dropdown").append(pathtml);
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
            $('#hosts-dropdown').val(hostTemplateObj["HOST_TEMPLATE"]).change();
            $('#multi-ip-ip').val(hostTemplateObj["COMMON_HOSTNAME"]).change();
            $("#nodata").hide();
            $("#hostcontent").show();
            $(".maincontent").show();
            $("#multi-ip-ip").empty();
            $("#multi-ip-ip").show();
            $("#ip-data-ip").attr('style', 'display:none !important');
            editRespone = list;

            $('#hosts-dropdown').attr('disabled', 'disabled');
            var html = '<input type="hidden" name="HOST_TEMPLATE"  value="' + hostTemplateObj["HOST_TEMPLATE"] + '">';
            var htmls = '<input type="hidden" value="' + hostTemplateObj["COMMON_HOSTNAME"] + '"> ' + hostTemplateObj["COMMON_HOSTNAME"] + '</input >';
            $("#spabid").hide();
            $("#hostdata").append(html);
            $("#multi-ip-ip").append(htmls);

        }
    }
    else if (res.status == 200 & res.data == "") {
        swal('Not able to fetch data', ' ', "warning")
    }
    else {
        swal('Not able to edit host', ' ', "error")
    }
    // document.getElementById("moreoption").click();
    if (mg_pathhost == 'Switch' || fwg_pathhost == 'Fortigate') {
       // console.log("prototypes---->" + prototypes)
        $("#snmp_val").css('display', 'block');
        $("#Mgmnt_val").css('display', 'none');
        $("#Node_val").css('display', 'none');
        document.getElementById("snmp_val").click();
       // console.log("v2cipaddr-1->" + validationip)
       // console.log("v2cipaddr-1->" + (prototypes == 'v2c' && validationip == mg_ipaddress))
        if (prototypes == 'v2c' && validationip == mg_ipaddress) {
           // console.log("v2cipaddr-->" + validationip)
            $('#snmp_val').css("color", '#55a8fd');
            const selectElement = document.getElementById('snmp_version');
            selectElement.selectedIndex = 1;
            selectElement.dispatchEvent(new Event('change'));
            requestDataFromServer('/dashboard/snmpnewtable', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
                snmp_res = JSON.parse(response);
                if (snmp_res.status == 200 && snmp_res.data != '') {
                    snmpres_details = snmp_res.data
                    snmpres_details.forEach(function (obj) {
                        if (obj.ipaddress == mg_ipaddress) {
                           // console.log("hbhwdbcxhe0--->" + JSON.stringify(obj))
                           // console.log("hbhwdbcxhe0--->" + obj.ipaddress + " " + mg_ipaddress)
                            $('#CreateSnmp #snmp-select-ip').val(obj.ipaddress);
                            $('#CreateSnmp #comm_string').val(obj.comm_string);
                            $('#CreateSnmp #snmp_models').val(obj.model);
                           // console.log($("#snmp_models option")); // check if the options are present in the select element
                           // console.log($("#snmp_models option").length); // check the length of the options
                           // console.log("obj.model: " + obj.model);
                           // console.log("option values: " + $("#CreateSnmp #snmp_models").val());
                        }
                    });
                }
            });
        }
        else if (prototypes == 'v3' && validationip == mg_ipaddress) {
           // console.log("v3cipaddr-->" + v3cipaddr)
            $('#snmp_val').css("color", '#55a8fd');
            const selectElement = document.getElementById('snmp_version');
            selectElement.selectedIndex = 2;
            selectElement.dispatchEvent(new Event('change'));
            requestDataFromServer('/dashboard/snmpnewtable', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
                snmp_res = JSON.parse(response);
                if (snmp_res.status == 200 && snmp_res.data != '') {
                    snmpres_details = snmp_res.data
                    snmpres_details.forEach(function (obj) {
                        if (obj.ipaddress == mg_ipaddress) {
                          //  console.log("hbhwdbcxhe0--->" + JSON.stringify(obj))
                            $('#CreateSnmp #snmp-select-ip').val(obj.ipaddress);
                            $('#CreateSnmp #user_name').val(obj.username);
                            $('#CreateSnmp #security_level').val(obj.sec_level);
                            $('#CreateSnmp #snmp_models').val(obj.model);
                            $('#CreateSnmp #Authentication_mtd').val(obj.auth_method);
                            $('#CreateSnmp #auth_password').val(obj.auth_password);
                            $('#CreateSnmp #Privacy_mtd').val(obj.priv_method);
                            $('#CreateSnmp #privacy_password').val(obj.priv_password);
                        }
                    });
                }
            });
        }
    }
    else {
        $("#snmp_val").css('display', 'none');
        if (prototypes == 'idrac' || prototypes == 'ilo') {
            document.getElementById("Mgmnt_val").click();
            if (prototypes == 'idrac') {
                const selectElement = document.getElementById('mgmts_version');
                selectElement.selectedIndex = 2;
                selectElement.dispatchEvent(new Event('change'));
                requestDataFromServer('getmgmntdata', { ipaddress: mg_ipaddress }, "GET").done(function (response) {
                    mgmt_res = JSON.parse(response);
                    var thresholdValues = JSON.parse(mgmt_res.data[0].threshold.replace(/'/g, '"'));
                    if (mgmt_res.status == 200 && mgmt_res.data != '') {
                        mgmtres_details = mgmt_res.data
                        mgmtres_details.forEach(function (obj) {
                            if (obj.prototype == 'idrac') {
                                //  console.log("idrac---->" + JSON.stringify(obj.port))
                                $('#CreateMgmt #port_ips').val(obj.port);
                                var jsonObj = {};
                                jsonObj["isedit"] = isEdit;
                                jsonObj['prototype'] = obj.prototype
                                jsonObj['username'] = "";
                                jsonObj['password'] = "";
                                jsonObj['iloip'] = "";
                                jsonObj['port'] = obj.port
                                jsonObj['threshold'] = "";
                                ilomgmt_list.push(jsonObj)
                            }
                            if (obj.prototype == 'ilo') {
                                var jsonObj = {};
                                jsonObj["isedit"] = isEdit;
                                jsonObj['prototype'] = obj.prototype;
                                jsonObj['username'] = obj.username;
                                jsonObj['password'] = obj.password;
                                jsonObj['iloip'] = obj.iloip;
                                jsonObj['port'] = "";
                                jsonObj['threshold'] = "";
                                ilomgmt_list.push(jsonObj)
                            }
                            if (obj.prototype == 'Node Expo') {
                                var jsonObj = {};
                                jsonObj["isedit"] = isEdit;
                                jsonObj['prototype'] = obj.prototype;
                                jsonObj['username'] = "";
                                jsonObj['password'] = "";
                                jsonObj['iloip'] = "";
                                jsonObj['port'] = obj.port
                                jsonObj['threshold'] = thresholdValues;
                                for (var key in thresholdValues) {
                                    if (thresholdValues.hasOwnProperty(key)) {
                                        var inputElement = document.getElementById(key);
                                        if (inputElement) {
                                            inputElement.value = thresholdValues[key];
                                        }
                                    }
                                }
                                nodemgmt_list.push(jsonObj)
                            }
                        });
                    }
                });
            } else {
                const selectElement = document.getElementById('mgmts_version');
                selectElement.selectedIndex = 1;
                selectElement.dispatchEvent(new Event('change'));
                requestDataFromServer('getmgmntdata', { ipaddress: mg_ipaddress }, "GET").done(function (response) {
                    mgmt_res = JSON.parse(response);
                    var thresholdValues = JSON.parse(mgmt_res.data[0].threshold.replace(/'/g, '"'));
                    if (mgmt_res.status == 200 && mgmt_res.data != '') {
                        mgmtres_details = mgmt_res.data
                        mgmtres_details.forEach(function (obj) {
                            if (obj.prototype == 'ilo') {
                                $('#CreateMgmt #user_name').val(obj.username);
                                $('#CreateMgmt #pass_word').val(obj.password);
                                $('#CreateMgmt #ilo_ip').val(obj.iloip);
                                var jsonObj = {};
                                jsonObj["isedit"] = isEdit;
                                jsonObj['prototype'] = obj.prototype;
                                jsonObj['username'] = obj.username;
                                jsonObj['password'] = obj.password;
                                jsonObj['iloip'] = obj.iloip;
                                jsonObj['port'] = "";
                                jsonObj['threshold'] = "";
                                ilomgmt_list.push(jsonObj)
                            }
                            if (obj.prototype == 'idrac') {
                                var jsonObj = {};
                                jsonObj["isedit"] = isEdit;
                                jsonObj['prototype'] = obj.prototype
                                jsonObj['username'] = "";
                                jsonObj['password'] = "";
                                jsonObj['iloip'] = "";
                                jsonObj['port'] = obj.port
                                jsonObj['threshold'] = "";
                                ilomgmt_list.push(jsonObj)
                            }
                            if (obj.prototype == 'Node Expo') {
                                var jsonObj = {};
                                jsonObj["isedit"] = isEdit;
                                jsonObj['prototype'] = obj.prototype;
                                jsonObj['username'] = "";
                                jsonObj['password'] = "";
                                jsonObj['iloip'] = "";
                                jsonObj['port'] = obj.port
                                jsonObj['threshold'] = thresholdValues;
                                for (var key in thresholdValues) {
                                    if (thresholdValues.hasOwnProperty(key)) {
                                        var inputElement = document.getElementById(key);
                                        if (inputElement) {
                                            inputElement.value = thresholdValues[key];
                                        }
                                    }
                                }
                                nodemgmt_list.push(jsonObj)
                            }
                        });
                    }
                });
            }
        }
        if (prototypes == 'Node Expo') {
            document.getElementById("Node_val").click();
            if (prototypes == 'Node Expo') {
                const selectElement = document.getElementById('node_version');
                selectElement.selectedIndex = 1;
                selectElement.dispatchEvent(new Event('change'));
                requestDataFromServer('getmgmntdata', { ipaddress: mg_ipaddress }, "GET").done(function (response) {
                   // console.log("getmgmntdata---->" + JSON.stringify(response))
                    mgmt_res = JSON.parse(response);
                    var thresholdValues = JSON.parse(mgmt_res.data[0].threshold.replace(/'/g, '"'));
                   // console.log("thresholdValues-->" + JSON.stringify(thresholdValues))
                    if (mgmt_res.status == 200 && mgmt_res.data != '') {
                        mgmtres_details = mgmt_res.data
                        mgmtres_details.forEach(function (obj) {
                            if (obj.prototype == 'Node Expo') {
                                $('#CreateNode #port_nodes').val(obj.port);
                                var jsonObj = {};
                                jsonObj["isedit"] = isEdit;
                                jsonObj['prototype'] = obj.prototype;
                                jsonObj['username'] = "";
                                jsonObj['password'] = "";
                                jsonObj['iloip'] = "";
                                jsonObj['port'] = obj.port
                                jsonObj['threshold'] = thresholdValues;
                                for (var key in thresholdValues) {
                                    if (thresholdValues.hasOwnProperty(key)) {
                                        var inputElement = document.getElementById(key);
                                        if (inputElement) {
                                            inputElement.value = thresholdValues[key];
                                        }
                                    }
                                }
                                nodemgmt_list.push(jsonObj)
                            }
                            if (obj.prototype == 'ilo') {
                                var jsonObj = {};
                                jsonObj["isedit"] = isEdit;
                                jsonObj['prototype'] = obj.prototype;
                                jsonObj['username'] = obj.username;
                                jsonObj['password'] = obj.password;
                                jsonObj['iloip'] = obj.iloip;
                                jsonObj['port'] = "";
                                jsonObj['threshold'] = "";
                                ilomgmt_list.push(jsonObj)
                            }
                            if (obj.prototype == 'idrac') {
                                var jsonObj = {};
                                jsonObj["isedit"] = isEdit;
                                jsonObj['prototype'] = obj.prototype
                                jsonObj['username'] = "";
                                jsonObj['password'] = "";
                                jsonObj['iloip'] = "";
                                jsonObj['port'] = obj.port
                                jsonObj['threshold'] = "";
                                ilomgmt_list.push(jsonObj)
                            }
                        });
                    }
                });
            }
        }
    }
}

function editResponse(response) {
   //  console.log("editResponse-->" + response)
    res = JSON.parse(response);
    if (res.data[0]['pathhost'] == 'Physical' || res.data[0]['pathhost'] == 'VM') {
        document.getElementById('hoststitle').textContent = "Edit " + res.data[0]['pathhost'] + " Server"
    }
    else {
        document.getElementById('hoststitle').textContent = "Edit " + res.data[0]['pathhost']
    }
    var ed_ipaddress = res.data[0]['ipaddress']
    var ed_pathhost = (res.data[0]['pathhost']).split(" ")[1]
    var fw_pathhost = (res.data[0]['pathhost']).split(" ")[0]
    var somehost = JSON.stringify((res.data[0]['selecthost']).split('.')[0])
    var data7hostsome = somehost.split('7')[1]
    var data8hostsome = somehost.split('8')[1]
    var someStr = JSON.stringify(res.data[0]['pathhost'])
    validationip = ed_ipaddress
    newonbipadd(ed_ipaddress)
    if (ed_pathhost == 'Switch' || fw_pathhost == 'Fortigate') {
        $("#snmp_val").css('display', 'block');
        $("#Mgmnt_val").css('display', 'none');
        $("#Node_val").css('display', 'none');
        var snmpModelsUpdated = false; // set a flag to determine if snmp_models has been updated
        requestDataFromServer('/dashboard/snmpnewtable', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
            snmp_res = JSON.parse(response);
            if (snmp_res.status == 200 && snmp_res.data != '') {
                snmpres_details = snmp_res.data
                snmpres_details.forEach(function (obj) {
                    if (obj.ipaddress == ed_ipaddress && obj.version == 'v2c') {
                        $('#snmp_val').css("color", '#55a8fd');
                        const selectElement = document.getElementById('snmp_version');
                        selectElement.selectedIndex = 1;
                        selectElement.dispatchEvent(new Event('change'));
                        $('#CreateSnmp #snmp-select-ip').val(obj.ipaddress);
                        $('#CreateSnmp #comm_string').val(obj.comm_string);
                        if (!snmpModelsUpdated) { // check if snmp_models has been updated
                            setTimeout(function () {
                                $('#CreateSnmp #snmp_models').val(obj.model).trigger('change');
                            }, 1000); // 1000 milliseconds = 1 second
                            snmpModelsUpdated = true;
                        }
                    }
                    else if (obj.ipaddress == ed_ipaddress && obj.version == 'v3') {
                        $('#snmp_val').css("color", '#55a8fd');
                        const selectElement = document.getElementById('snmp_version');
                        selectElement.selectedIndex = 2;
                        selectElement.dispatchEvent(new Event('change'));
                        $('#CreateSnmp #snmp-select-ip').val(obj.ipaddress);
                        $('#CreateSnmp #user_name').val(obj.username);
                        $('#CreateSnmp #security_level').val(obj.sec_level);
                        if (!snmpModelsUpdated) { // check if snmp_models has been updated
                            setTimeout(function () {
                                $('#CreateSnmp #snmp_models').val(obj.model).trigger('change');
                            }, 1000); // 1000 milliseconds = 1 second
                            snmpModelsUpdated = true;
                        }
                        $('#CreateSnmp #Authentication_mtd').val(obj.auth_method);
                        $('#CreateSnmp #auth_password').val(obj.auth_password);
                        $('#CreateSnmp #Privacy_mtd').val(obj.priv_method);
                        $('#CreateSnmp #privacy_password').val(obj.priv_password);
                    }
                });
            }
        });
    }

   /* if (ed_pathhost == 'Switch' || fw_pathhost == 'Fortigate') {
       // console.log("ed_pathhost--->" + ed_pathhost)
        $("#snmp_val").css('display', 'block');
        $("#Mgmnt_val").css('display', 'none');
        $("#Node_val").css('display', 'none');
        requestDataFromServer('/dashboard/snmpnewtable', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
            snmp_res = JSON.parse(response);
            if (snmp_res.status == 200 && snmp_res.data != '') {
                snmpres_details = snmp_res.data
                snmpres_details.forEach(function (obj) {
                   // console.log("getmgmntdata--1->" + JSON.stringify(obj))
                    if (obj.ipaddress == ed_ipaddress && obj.version == 'v2c') {
                        $('#snmp_val').css("color", '#55a8fd');
                        const selectElement = document.getElementById('snmp_version');
                        selectElement.selectedIndex = 1;
                        selectElement.dispatchEvent(new Event('change'));
                        $('#CreateSnmp #snmp-select-ip').val(obj.ipaddress);
                        $('#CreateSnmp #comm_string').val(obj.comm_string);
                        $('#CreateSnmp #snmp_models').val(obj.model);
                        console.log($("#snmp_models option")); // check if the options are present in the select element
                        console.log($("#snmp_models option").length); // check the length of the options
                        console.log("obj.model: " + obj.model);
                        console.log("option values: " + $("#CreateSnmp #snmp_models").val());
                    }
                    else if (obj.ipaddress == ed_ipaddress && obj.version == 'v3') {
                        $('#snmp_val').css("color", '#55a8fd');
                        const selectElement = document.getElementById('snmp_version');
                        selectElement.selectedIndex = 2;
                        selectElement.dispatchEvent(new Event('change'));
                        $('#CreateSnmp #snmp-select-ip').val(obj.ipaddress);
                        $('#CreateSnmp #user_name').val(obj.username);
                        $('#CreateSnmp #security_level').val(obj.sec_level);
                        $('#CreateSnmp #snmp_models').val(obj.model);
                        $('#CreateSnmp #Authentication_mtd').val(obj.auth_method);
                        $('#CreateSnmp #auth_password').val(obj.auth_password);
                        $('#CreateSnmp #Privacy_mtd').val(obj.priv_method);
                        $('#CreateSnmp #privacy_password').val(obj.priv_password);
                    }
                });
            }
        });
    }*/
    else {
        if (((data7hostsome) == 'VM"') || ((data8hostsome) == 'VM"')) {
            $("#Mgmnt_val").css('display', 'none');
            $("#Node_val").css('display', 'block');
        }
        else {
            $("#Mgmnt_val").css('display', 'block');
            $("#Node_val").css('display', 'block');
        }
       // console.log("ed_pathhost--->else")
        $("#snmp_val").css('display', 'none');
        requestDataFromServer('getmgmntdata', { ipaddress: ed_ipaddress }, "GET").done(function (response) {
            edmgmt_res = JSON.parse(response);
            //console.log("edmgmt_res-->" + JSON.stringify(edmgmt_res))
            var thresholdValue = JSON.parse(edmgmt_res.data[0].threshold.replace(/'/g, '"'));
            //console.log("thresholdValue-->" + thresholdValue)
            if (edmgmt_res.status == 200 && edmgmt_res.data != '') {
                edmgmtres_details = edmgmt_res.data
                edmgmtres_details.forEach(function (obj) {
                   // console.log("getmgmntdata--1->" + JSON.stringify(obj))
                    if (obj.prototype == 'idrac') {
                        $('#Mgmnt_val').css("color", '#55a8fd');
                        const selectElement = document.getElementById('mgmts_version');
                        selectElement.selectedIndex = 2;
                        selectElement.dispatchEvent(new Event('change'));
                        $('#CreateMgmt #port_ips').val(obj.port);
                        var jsonObj = {};
                        jsonObj["isedit"] = isEdit;
                        jsonObj['prototype'] = obj.prototype
                        jsonObj['username'] = "";
                        jsonObj['password'] = "";
                        jsonObj['iloip'] = "";
                        jsonObj['port'] = obj.port
                        jsonObj['threshold'] = "";
                        ilomgmt_list.push(jsonObj)
                    }
                    if (obj.prototype == 'ilo') {
                        $('#Mgmnt_val').css("color", '#55a8fd');
                        const selectElement = document.getElementById('mgmts_version');
                        selectElement.selectedIndex = 1;
                        selectElement.dispatchEvent(new Event('change'));
                        $('#CreateMgmt #user_name').val(obj.username);
                        $('#CreateMgmt #pass_word').val(obj.password);
                        $('#CreateMgmt #ilo_ip').val(obj.iloip);
                        var jsonObj = {};
                        jsonObj["isedit"] = isEdit;
                        jsonObj['prototype'] = obj.prototype;
                        jsonObj['username'] = obj.username;
                        jsonObj['password'] = obj.password;
                        jsonObj['iloip'] = obj.iloip;
                        jsonObj['port'] = "";
                        jsonObj['threshold'] = "";
                        ilomgmt_list.push(jsonObj)
                    }
                    if (obj.prototype == 'Node Expo') {
                        $('#Node_val').css("color", '#55a8fd');
                        const selectElement = document.getElementById('node_version');
                        selectElement.selectedIndex = 1;
                        selectElement.dispatchEvent(new Event('change'));
                        $('#CreateNode #port_nodes').val(obj.port);
                        var jsonObj = {};
                        jsonObj["isedit"] = isEdit;
                        jsonObj['prototype'] = obj.prototype;
                        jsonObj['username'] = "";
                        jsonObj['password'] = "";
                        jsonObj['iloip'] = "";
                        jsonObj['port'] = obj.port
                        jsonObj['threshold'] = thresholdValue;
                        for (var key in thresholdValue) {
                            if (thresholdValue.hasOwnProperty(key)) {
                                var inputElement = document.getElementById(key);
                                if (inputElement) {
                                    inputElement.value = thresholdValue[key];
                                }
                            }
                        }
                        nodemgmt_list.push(jsonObj)
                    }
                });
            }
        });
    }
    
    jsval = someStr.replace(/['"]+/g, '')
    getFileNames(jsval);
    var pathtml = '<option type="" name="PATH_TEMPLATE" value="' + jsval + '"> ' + jsval + '</option >';
    $("#path-dropdown").append(pathtml);
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
            $('#hosts-dropdown').val(hostTemplateObj["HOST_TEMPLATE"]).change();
            $('#multi-ip-ip').val(hostTemplateObj["COMMON_HOSTNAME"]).change();
            $("#nodata").hide();
            $("#hostcontent").show();
            $(".maincontent").show();
            $("#multi-ip-ip").empty();
            $("#multi-ip-ip").show();
            $("#ip-data-ip").attr('style', 'display:none !important');
            editRespone = list;

            $('#hosts-dropdown').attr('disabled', 'disabled');
            var html = '<input type="hidden" name="HOST_TEMPLATE"  value="' + hostTemplateObj["HOST_TEMPLATE"] + '">';
            var htmls = '<input type="hidden" value="' + hostTemplateObj["COMMON_HOSTNAME"] + '"> ' + hostTemplateObj["COMMON_HOSTNAME"] + '</input >';
            $("#spabid").hide();
            $("#hostdata").append(html);
            $("#multi-ip-ip").append(htmls);

        }
    }
    else if (res.status == 200 & res.data == "") {
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
function mgmntCloseClick(btn) {
    toBeDeletedHost = true;
    deleteBtn = btn;

    swal({
        title: "Delete Management",
        text: "Want to permanently delete this management?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete",
        closeOnConfirm: false
    },
        function () {
            mgmtdeleteEntry()
        });
}
function mgmtdeleteEntry() {
    if (toBeDeletedHost) {
        var hostname = $(deleteBtn).attr("data-host-name");
        var ipaddress = $(deleteBtn).attr("data-host-ip");
        // console.log("memtdeleteEntry---->" + hostname + "====" + ipaddress)
        $(".loader").show();
        requestDataFromServer('mgmtdeletehost', { 'prototype': hostname, 'ipaddress': ipaddress, csrfmiddlewaretoken: csfr_token }, "POST").done(handledeleteresponse);
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
    /*if (res.status == 200) {
        swal(res.data, ' ', "success");
        location.reload();
    }*/
    if (res.status == 200) {
        swal({
            title: res.data,
            type: "success",
            confirmButtonClass: "btn-success",
            confirmButtonText: "OK"
        },
            function (isConfirm) {
                if (isConfirm) {
                    location.reload();
                }
            });
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

function sendiloDataToServer() {
    var isInputsFilled = validatesInputs('mgnt_input');
    ilomgmt_list = [];
    if (isInputsFilled == true) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateMgmt #mgmts_version').val();
        jsonObj['username'] = $('#CreateMgmt #user_name').val();
        jsonObj['password'] = $('#CreateMgmt #pass_word').val();
        jsonObj['iloip'] = $('#CreateMgmt #ilo_ip').val();
        jsonObj['port'] = "";
        jsonObj['threshold'] = "";
        ilomgmt_list.push(jsonObj)
       // swal("ilo added sucessfully", ' ', 'success')
        //  console.log("sendiloDataToServer--->" + JSON.stringify(ilomgmt_list))
        $('#mgmtModal #ilo_save').attr('data-dismiss', "modal");
    }
    else {
        swal("ilo Not able added", ' ', 'error')
    }
}
function sendidracDataToServer() {
    var isInputsFilled = validateingInputs('mgnt_input');
    ilomgmt_list = [];
    if (isInputsFilled == true) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateMgmt #mgmts_version').val();
        jsonObj['username'] = "";
        jsonObj['password'] = "";
        jsonObj['iloip'] = "";
        jsonObj['port'] = $('#CreateMgmt #port_ips').val();
        jsonObj['threshold'] = "";
        ilomgmt_list.push(jsonObj)
       // swal("idrac added sucessfully", ' ', 'success')
        //  console.log("sendidracDataToServer--->" + JSON.stringify(ilomgmt_list))
        $('#mgmtModal #idrac_save').attr('data-dismiss', "modal");
    }
    else {
        swal("idrac Not able added", ' ', 'error')
    }
}
function sendnodeDataToServer() {
    var isInputsFilled = validateInputing('node_input');
    nodemgmt_list = [];
    var values = {
        disk_w: parseFloat($("#disk_w").val()),
        disk_c: parseFloat($("#disk_c").val()),
        disk_t: parseInt($("#disk_t").val()),
        cpu_w: parseFloat($("#cpu_w").val()),
        cpu_c: parseFloat($("#cpu_c").val()),
        cpu_t: parseInt($("#cpu_t").val()),
        mem_w: parseFloat($("#mem_w").val()),
        mem_c: parseFloat($("#mem_c").val()),
        mem_t: parseInt($("#mem_t").val()),
        load_w: parseFloat($("#load_w").val()),
        load_c: parseFloat($("#load_c").val()),
        load_t: parseInt($("#load_t").val()),
        uptime_w: parseFloat($("#uptime_w").val()),
        uptime_c: parseFloat($("#uptime_c").val()),
        uptime_t: parseInt($("#uptime_t").val()),
        login_w: parseFloat($("#login_w").val()),
        login_c: parseFloat($("#login_c").val()),
        login_t: parseInt($("#login_t").val())
    };
    if (isInputsFilled == true) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateNode #node_version').val();
        jsonObj['username'] = "";
        jsonObj['password'] = "";
        jsonObj['iloip'] = "";
        jsonObj['port'] = $('#CreateNode #port_nodes').val();
        jsonObj['threshold'] = values;
        nodemgmt_list.push(jsonObj)
        //swal("To Save this Form Click Save Button", ' ', 'success')
        $('#nodeModal #node_save').attr('data-dismiss', "modal");
        // console.log("sendnodeDataToServer--->" + JSON.stringify(nodemgmt_list))
    }
    else {
        swal("NodeExpo Not able added", ' ', 'error')
    }
}

function sendFormDataToServer() {
    if (checkIfFieldIsEmpty("Host")) {
        return;
    }

   // var ipList = $('#multi-select-ip').multipleSelect('getSelects');
    var ipList = $('#CreateServer #multi-select-ip').val();
    //console.log("ipList---->" + ipList)
    //console.log("ipList-s--->" + JSON.stringify(ipList))
    /*if (ipList.length == 0) {
        alert("Choose atleast one ip address to create host.");
        return;
    }*/
    if ($("#multi-select-ip").val() === null) {
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
        json[obj.name] = obj.value;
    });
    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    jsonObj["host"] = json;
    jsonObj["service"] = service_list;
    jsonObj["mgmnt"] = ilomgmt_list;
    jsonObj["nodemgmt"] = nodemgmt_list;
    jsonObj["iplist"] = ipList;
    jsonObj['selecthost'] = $('#CreateServer #hosts-dropdown').val();
    jsonObj['servertype'] = $('#CreateServer #GLOBAL_APPLICATION').val();
    jsonObj['emailid'] = $('#CreateServer #REUSABLE_EMAIL').val();
    jsonObj['textname'] = $('#CreateServer #FRNDLY_NAME').val();
    //jsonObj['phyipaddress'] = $('#CreateServer #PHYSICAL_IP').val();
    jsonObj['pathhost'] = $('#CreateServer #path-dropdown').val()
    //console.log("jsonObj['pathhost']====//====>" + JSON.stringify(jsonObj['pathhost']))
    if (jsonObj['pathhost'] == "VM") {
        jsonObj['phyipaddress'] = $('#CreateServer #PHYSICAL_IP').val();
    }
    else {
        jsonObj['phyipaddress'] = ""
    }
     console.log("sendFormDataToServer====//====>" + JSON.stringify(jsonObj))
    $('#CreateServer #save').attr('data-dismiss', "modal");
    requestDataFromServer('createcfg', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(handleFileCreationResponse);
}

// export the all onboard file code
let exportonbdata = () => {
    requestDataFromServer('newonbtable', { csrfmiddlewaretoken: csfr_token }, "GET").done(function (response) {
        const exportonb = JSON.parse(response).data;

        exportonb.forEach(item => {
            const { id, ...dataWithoutId } = item;
            const output = Object.entries(dataWithoutId)
                .map(([key, value]) => `${key}:${value || ''}`)
                .join("\n");

            const filename = `${item.ipaddress}.txt`;
            const textToBLOB = new Blob([output], { type: "text/plain" });
            const newLink = document.createElement("a");
            newLink.download = filename;
            if (window.webkitURL != null) {
                newLink.href = window.webkitURL.createObjectURL(textToBLOB);
            } else {
                newLink.href = window.URL.createObjectURL(textToBLOB);
                newLink.style.display = "none";
                document.body.appendChild(newLink);
            }

            newLink.click();
        });
    });
};

function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const fileContent = e.target.result;
        const data = parseFileContent(fileContent);
        populateFormFields(data);
    };
    reader.readAsText(file);
}

function parseFileContent(fileContent) {
    const lines = fileContent.split('\n');
    const data = {};
    lines.forEach(line => {
        const [key, value] = line.split(':');
        data[key] = value.trim();
    });
    return data;
}

function populateFormFields(data) {
    console.log('Form data:------->' + JSON.stringify(data));
    // Set the value of the hosts-dropdown
    var hostsDropdown = document.getElementById("hosts-dropdown");
    hostsDropdown.value = data.selecthost || '';
    // Trigger the change event on the hosts-dropdown
    var event = new Event('change', { bubbles: true });
    hostsDropdown.dispatchEvent(event);
    // Update other dropdown values
    setTimeout(function () {
        $('#CreateServer #GLOBAL_APPLICATION').val(data.servertype || '');
        $('#CreateServer #REUSABLE_EMAIL').val(data.emailid || '');
        document.getElementById("services-dropdown").value = data.servicename || 'Select service';
        $('#CreateServer #FRNDLY_NAME').val(data.textname || '');
        document.getElementById("path-dropdown").value = data.pathhost || '';
        $('#CreateServer #PHYSICAL_IP').val(data.physical_ip || '');
        $('#CreateServer #multi-select-ip').val(data.ipaddress || '');
    }, 500);
}

// Add change event listener to the hosts-dropdown
/*var hostsDropdown = document.getElementById("hosts-dropdown");
hostsDropdown.addEventListener('change', function () {
    // Perform actions when hosts-dropdown value changes
    var selectedValue = this.value;
    // Update other dropdowns based on the selected value
    // Example: Update the services-dropdown based on the selected host
    if (selectedValue === 'HostA') {
        document.getElementById("services-dropdown").value = 'ServiceA';
    } else if (selectedValue === 'HostB') {
        document.getElementById("services-dropdown").value = 'ServiceB';
    }
});*/

/*function sendFormDataToServer() {
    //  console.log("sendFormDataToServer---->")
    if (checkIfFieldIsEmpty("Host")) {
        return;
    }

    var ipList = $('#multi-select-ip').multipleSelect('getSelects');
    if (ipList.length == 0) {
        // if (ipList.length == '') {
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

    // if (document.getElementById('BOOL__REUSABLE_AUTOMATION').checked) {
    if (document.getElementById('BOOL__REUSABLE_AUTOMATION')) {
        //  if ($("#REUSABLE_AUTOMATION__REUSABLE_VAULT").val() === null) {
        if ($("#REUSABLE_AUTOMATION__REUSABLE_VAULT").val() === '') {
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
   // console.log("formData=========>" + JSON.stringify(formData))
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
    console.log("sendFormDataToServer====//====>" + JSON.stringify(jsonObj))
    requestDataFromServer('createcfg', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(handleFileCreationResponse);
}*/

function handleFileCreationResponse(response) {
    res = JSON.parse(response)
    $(".loader").hide();
    if (res.status == 200) {
        swal({
            title: res.data,
            type: "success",
            confirmButtonClass: "btn-success",
            confirmButtonText: "OK"
        },
            function (isConfirm) {
                if (isConfirm) {
                    //  location.reload();
                    parent.window.location.reload(true);
                }
            });

        // swal(res.data, ' ', "success");
        // location.reload();
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
            // html += '<span class="d-block" style="font-size:10px;"> ' + serviceTemplate.split("_")[2].replace(".j2", "") + '</span>';
            html += '<span class="d-block" style="font-size:10px;"> ' + serviceTemplate.replace(".j2", "") + '</span>';
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
    //  requestDataFromServer('/vault/getfilenames', { "fileName": "SERVICES" }, "GET").done(fillServices);
    requestDataFromServer('/vault/getfilenames', { "fileName": "SERVICES" }, "GET").done(fillServices);
}
function fillServices(response) {
    $(".loader").hide();
    var serviceHtml = ' '
    res = JSON.parse(response);
    // var serviceHtml = '<option value=" "' + 'selected disabled>Select service</option>';
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
        emailHtml = ''
        if (res.status == 200) {
            res.data.forEach(function (obj) {
                if (obj.email !== "admin") {
                    emailLists.push(obj.email)
                    emailHtml += '<option value="' + obj.email + '">' + obj.email + '</option>';
                }
            });
            $("#EmailList").append(emailHtml);
            $("#EmailLists").append(emailHtml);
        }
        else {
            //console.log("Error in Getting User List :" + JSON.stringify(res));
        }
    });
}

function myFunctionpass() {
    var x = document.getElementById("pass_word");
    if (x.type === "password") {
        $('#icons_change').toggleClass("mdi-eye-outline");
        x.type = "text";
    } else {
        $('#icons_change').toggleClass("mdi-eye-outline");
        x.type = "password";
    }
}

function mgmttype(select) {
    $("#mgmnttype").empty();
    var mgmthtml = '';
    if (select == "ilo") {
        mgmthtml += '<div class="col-12 my-2">'
        mgmthtml += '<label for="user_name" id="username-label">User Name</label>'
        mgmthtml += '<input type="text" class="form-control mgnt_input full-input" style="background-color:transparent;" placeholder="Enter User Name" required="" id="user_name" autocomplete="off">'
        mgmthtml += '<span class="error-msg" id="username-error-msg"> </span>';
        mgmthtml += '</div>';
        mgmthtml += '<div class="col-12 my-4 password-group">'
        mgmthtml += '<label for="pass_word" id="password-label">Password</label><br>'
        mgmthtml += '<input type="password" class="form-control mgnt_input full-input" style="background-color:transparent;" placeholder="Enter PassWord" required="" id="pass_word" autocomplete="new-password">'
        mgmthtml += '<div class="d-inline-block icon"><i class="mdi mdi-eye-off-outline toggle-password" id="icons_change" onclick="myFunctionpass()"></i></div>';
        mgmthtml += '<span class="error-msg" id="password-error-msg"> </span>';
        mgmthtml += '</div>';
        mgmthtml += '<div class="col-12 my-2">'
        mgmthtml += '<label for="ilo_ip" id="ilo-label">ILO IP</label>'
        mgmthtml += '<input type="text" class="form-control mgnt_input full-input" style="background-color:transparent;" placeholder="Enter ILO IP" required="" id="ilo_ip" autocomplete="off">'
        mgmthtml += '<span class="error-msg" id="ilo-error-msg"> </span>';
        mgmthtml += '</div>';
        mgmthtml += '<br>';
        mgmthtml += '<div class="modal-footer mx-auto col-md-11 col-12">';
        mgmthtml += '<div class="col-5 px-1">';
        mgmthtml += '<button type="button" class="btn btn-outline-secondary cancel-btn w-100" data-dismiss="modal">Cancel</button>';
        mgmthtml += '</div>';
        mgmthtml += '<div class="col-5 px-1">';
        mgmthtml += '<button type="button" class="btn btn-outline-secondary w-100" id="ilo_save" onclick="verifyiloServer()">Verify</button>';
       // mgmthtml += '<button type="button" class="btn btn-outline-secondary w-100" id="ilo_save" onclick="sendiloDataToServer()">Add</button>';
        mgmthtml += '</div>';
        mgmthtml += '<div class="" id="valid_row"></div>';
        mgmthtml += '</div>';
    }
    else {
        mgmthtml += '<div class="col-12 my-2">'
        mgmthtml += '<label for="port_ip" id="port-label">IDRAC Port</label>'
        mgmthtml += '<input type="number" class="form-control mgnt_input full-input" style="background-color:transparent;" placeholder="Enter IDRAC Port" value="9137" required="" id="port_ips" autocomplete="off">'
        mgmthtml += '<span class="error-msg" id="idrac-error-msg"> </span>';
        mgmthtml += '</div>';
        mgmthtml += '<br>';
        mgmthtml += '<div class="modal-footer mx-auto col-md-11 col-12">';
        mgmthtml += '<div class="col-5 px-1">';
        mgmthtml += '<button type="button" class="btn btn-outline-secondary cancel-btn w-100" data-dismiss="modal">Cancel</button>';
        mgmthtml += '</div>';
        mgmthtml += '<div class="col-5 px-1">';
        mgmthtml += '<button type="button" class="btn btn-outline-secondary w-100" id="idrac_save" onclick="verifiedidracServer()">Verify</button>';
        //mgmthtml += '<button type="button" class="btn btn-outline-secondary w-100" id="idrac_save" onclick="sendidracDataToServer()">Add</button>';
        mgmthtml += '</div>';
        mgmthtml += '<div class="" id="valids_row"></div>';
        mgmthtml += '</div>';
    }
    $("#mgmnttype").append(mgmthtml);
}
var labelNames = ["disk_w", "disk_c", "disk_t", "cpu_w", "cpu_c", "cpu_t", "mem_w", "mem_c", "mem_t", "load_w", "load_c", "load_t", "uptime_w", "uptime_c", "uptime_t", "login_w", "login_c", "login_t"];
var defaultValues = [70, 75, 600, 70, 80, 10, 70, 80, 10, 0.6, 0.8, 10, 90, 120, 72000, 2, 5, 10];
function nodetype(select) {
    $("#nodetype").empty();
    var nodehtml = '';
    if (select == "Node Expo") {
        nodehtml += '<div class="col-12 my-2">';
        nodehtml += '<label for="port_node" id="port-node-label">Node Port</label>';
        nodehtml += '<input type="number" class="form-control node_input full-input" style="background-color:transparent;" placeholder="Enter Node Port" value="9100" required="" id="port_nodes" autocomplete="off">';
        nodehtml += '<span class="error-msg" id="Node-error-msg"> </span>';
        nodehtml += '</div>';
        nodehtml += '<div class="row">';
        nodehtml += '<div class="col-4">';
        nodehtml += '<input type="checkbox" id="threshold" name="threshold' + select + '" value="threshold" onchange="toggleTextFields(this)">';
        nodehtml += '<label for="threshold"> Threshold</label>';
        nodehtml += '</div>';
        nodehtml += '<div class="col-1">';
        nodehtml += '<i class="mdi mdi-reload io-con" id="threshold-icon" onclick="resetInputValues()" style="color:#e99123;display:none;"></i>';
        nodehtml += '</div>';
        nodehtml += '<div class="col-6">';
        nodehtml += '<table class="table" id="table-fields" style="display:none;">';
        nodehtml += '<tr class="small-row">';
        nodehtml += '<th></th>';
        nodehtml += '<th>Abbreviation</th>';
        nodehtml += '<th>Units</th>';
        nodehtml += '</tr>';
        nodehtml += '<tr class="small-row">';
        nodehtml += '<td>w</td>';
        nodehtml += '<td>Warning</td>';
        nodehtml += '<td>num</td>';
        nodehtml += '</tr>';
        nodehtml += '<tr class="small-row">';
        nodehtml += '<td>c</td>';
        nodehtml += '<td>Critical</td>';
        nodehtml += '<td>num</td>';
        nodehtml += '</tr>';
        nodehtml += '<tr class="small-row">';
        nodehtml += '<td>t</td>';
        nodehtml += '<td>Time</td>';
        nodehtml += '<td>sec</td>';
        nodehtml += '</tr>';
        nodehtml += '</table>';
        nodehtml += '</div>';
        nodehtml += '</div>';
        nodehtml += '<div id="threshold-fields" style="display:none;">';
        for (var i = 0; i < labelNames.length; i++) {
            nodehtml += '<div class="row">';
            nodehtml += '<div class="col-1"></div>';
            nodehtml += '<div class="col-4">';
            nodehtml += '<label for="' + labelNames[i] + '">' + labelNames[i] + '</label>';
            nodehtml += '</div>';
            nodehtml += '<div class="col-5">';
            nodehtml += '<input type="number" step="any" class="form-control" id="' + labelNames[i] + '" value="' + defaultValues[i] + '">';
            nodehtml += '</div>';
            nodehtml += '<div class="col-2"></div>';
            nodehtml += '</div>';
        }
        nodehtml += '</div>';
        nodehtml += '<br>';
        nodehtml += '<div class="modal-footer mx-auto col-md-11 col-12">';
        nodehtml += '<div class="col-5 px-1">';
        nodehtml += '<button type="button" class="btn btn-outline-secondary cancel-btn w-100" data-dismiss="modal">Cancel</button>';
        nodehtml += '</div>';
        nodehtml += '<div class="col-5 px-1">';
        nodehtml += '<button type="button" class="btn btn-outline-secondary w-100" id="node_save" onclick="verifynodeServer()">Verify</button>';
        //nodehtml += '<button type="button" class="btn btn-outline-secondary w-100" id="node_save" onclick="sendnodeDataToServer()">Add</button>';
        nodehtml += '</div>';
        nodehtml += '<div class="" id="valid_rows"></div>';
        nodehtml += '</div>';
    }
    $("#nodetype").append(nodehtml);
}
function resetInputValues() {
    var thresholdCheckbox = document.getElementById("threshold");
    var thresholdFields = document.getElementById("threshold-fields");
    var thresholdInputs = thresholdFields.getElementsByClassName("form-control");
    if (thresholdCheckbox.checked) {
        for (var i = 0; i < thresholdInputs.length; i++) {
            thresholdInputs[i].value = defaultValues[i];
        }
    } else {
        for (var i = 0; i < thresholdInputs.length; i++) {
            thresholdInputs[i].value = "";
        }
    }
}
function toggleTextFields(checkbox) {
    var thresholdFields = document.getElementById("threshold-fields");
    var table = document.getElementById("table-fields");
    var tr_icon = document.getElementById("threshold-icon");

    if (checkbox.checked) {
        thresholdFields.style.display = "block";
        table.style.display = "table";
        tr_icon.style.display = "block";
    } else {
        thresholdFields.style.display = "none";
        table.style.display = "none";
        tr_icon.style.display = "none";
    }
}

function verifiedidracServer() {
   // console.log("validationip--->" + validationip)
    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    jsonObj['prototype'] = $('#CreateMgmt #mgmts_version').val();
    jsonObj['ip'] = validationip;
    jsonObj['port'] = $('#CreateMgmt #port_ips').val();
    ilomgmt_list.push(jsonObj)
    requestDataFromServer('/allonboard/idracvalidation', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(idracvalidResponse);
}
function idracvalidResponse(response) {
    //console.log("idracvalidResponse--->" + response)
    res = JSON.parse(response)
    $("#valids_row").empty();
   // console.log("idracvalidResponse--->" + res.result)
    $(".loader").hide();
    if (res.result == true) {
        const btn = document.getElementById('idrac_save');
        btn.setAttribute('onclick', 'sendidracDataToServer()');
        btn.innerText = 'Add';
        var validHtml = '<p class="text-center size12" style="color:#00ff00;">Success in Validation...</p>';
        $("#valids_row").append(validHtml);
        setTimeout(function () {
            $("#valids_row").empty();
        }, 3000);
        $('#mgmts_version').prop('disabled', true);
        $('#port_ips').prop('disabled', true);
    }
    else if (res.result == false) {
       // console.log("idracvalidResponse--->")
        // swal(res.data, ' ', "error");
       // $("#idrac_save").prop("disabled", true);
        var validHtml = '<p class="text-center size12" style="color:#ff0000;">Failure in Validation...</p>';
        $("#valids_row").append(validHtml);
        // Hide the validHtml after 3 seconds
        setTimeout(function () {
            $("#valids_row").empty();
        }, 3000);
    }
}
function verifyiloServer() {
   // console.log("validationip--->" + validationip)
    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    jsonObj['prototype'] = $('#CreateMgmt #mgmts_version').val();
    jsonObj['username'] = $('#CreateMgmt #user_name').val();
    jsonObj['password'] = $('#CreateMgmt #pass_word').val();
    jsonObj['iloip'] = $('#CreateMgmt #ilo_ip').val();
    jsonObj['ip'] = validationip;
    //console.log("------------->" + JSON.stringify(jsonObj))
    ilomgmt_list.push(jsonObj)
    requestDataFromServer('/allonboard/ilovalidation', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(ilovalidResponse);
}
function ilovalidResponse(response) {
    //console.log("ilovalidation--->" + response)
    res = JSON.parse(response)
    $("#valid_row").empty();
    //console.log("ilovalidation--->" + res.result)
    $(".loader").hide();
    if (res.result == true) {
        const btn = document.getElementById('ilo_save');
        btn.setAttribute('onclick', 'sendiloDataToServer()');
        btn.innerText = 'Add';
        var validHtml = '<p class="text-center size12" style="color:#00ff00;">Success in Validation...</p>';
        $("#valid_row").append(validHtml);
        setTimeout(function () {
            $("#valid_row").empty();
        }, 3000);
        $('#mgmts_version').prop('disabled', true);
        $('#user_name').prop('disabled', true);
        $('#pass_word').prop('disabled', true);
        $('#ilo_ip').prop('disabled', true);
    }
    else if (res.result == false) {
        // swal(res.data, ' ', "error");
        //$("#ilo_save").prop("disabled", true);
        var validHtml = '<p class="text-center size12" style="color:#ff0000;">Failure in Validation...</p>';
        $("#valid_row").append(validHtml);
        // Hide the validHtml after 3 seconds
        setTimeout(function () {
            $("#valid_row").empty();
        }, 3000);
    }
}
function verifynodeServer() {
    // console.log("validationip--->" + validationip)
    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    jsonObj['prototype'] = $('#CreateNode #node_version').val();
    jsonObj['ip'] = validationip;
    jsonObj['port'] = $('#CreateNode #port_nodes').val();
    nodemgmt_list.push(jsonObj)
   // console.log("------------->" + JSON.stringify(jsonObj))
    requestDataFromServer('/allonboard/nodeexpvalidation', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csfr_token }, "POST").done(nodevalidResponse);
}
function nodevalidResponse(response) {
   // console.log("idracvalidResponse--->" + response)
    res = JSON.parse(response)
    $("#valid_rows").empty();
    // console.log("idracvalidResponse--->" + res.result)
    $(".loader").hide();
    if (res.result == true) {
        const btn = document.getElementById('node_save');
        btn.setAttribute('onclick', 'sendnodeDataToServer()');
        btn.innerText = 'Add';
        var validHtml = '<p class="text-center size12" style="color:#00ff00;">Success in Validation...</p>';
        $("#valid_rows").append(validHtml);
        setTimeout(function () {
            $("#valid_rows").empty();
        }, 3000);
        $('#node_version').prop('disabled', true);
        $('#port_nodes').prop('disabled', true);
    }
    else if (res.result == false) {
        // swal(res.data, ' ', "error");
       // $("#node_save").prop("disabled", true);
        var validHtml = '<p class="text-center size12" style="color:#ff0000;">Failure in Validation...</p>';
        $("#valid_rows").append(validHtml);
        // Hide the validHtml after 3 seconds
        setTimeout(function () {
            $("#valid_rows").empty();
        }, 3000);
    }
}

function validatesInputs(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    const fields = [
        { id: 'user_name', label: 'username-label', errorMsg: 'username-error-msg', value: 'Enter User Name' },
        { id: 'pass_word', label: 'password-label', errorMsg: 'password-error-msg', value: 'Enter PassWord' },
        { id: 'ilo_ip', label: 'ilo-label', errorMsg: 'ilo-error-msg', value: 'Enter ILO IP' },
    ];
    let hasErrors = false;
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const el = document.getElementById(field.id);
        if (el.value === field.value) {
            document.getElementById(field.errorMsg).textContent = 'Field cannot be empty';
            document.getElementById(field.label).style.color = '#ff9eac';
            hasErrors = true;
        } else {
            document.getElementById(field.errorMsg).textContent = '';
            // document.getElementById(field.label).style.color = '#404E67';
        }
    }
    return isInputFilled;
    return !hasErrors;
}
function validateingInputs(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    const fields = [
        { id: 'port_ips', label: 'port-label', errorMsg: 'idrac-error-msg', value: 'Enter IDRAC Port' },
    ];
    let hasErrors = false;
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const el = document.getElementById(field.id);
        if (el.value === field.value) {
            document.getElementById(field.errorMsg).textContent = 'Field cannot be empty';
            document.getElementById(field.label).style.color = '#ff9eac';
            hasErrors = true;
        } else {
            document.getElementById(field.errorMsg).textContent = '';
            // document.getElementById(field.label).style.color = '#404E67';
        }
    }
    return isInputFilled;
    return !hasErrors;
}
function validateInputing(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    const fields = [
        { id: 'port_nodes', label: 'port-node-label', errorMsg: 'Node-error-msg', value: 'Enter Node Port' },
    ];
    let hasErrors = false;
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const el = document.getElementById(field.id);
        if (el.value === field.value) {
            document.getElementById(field.errorMsg).textContent = 'Field cannot be empty';
            document.getElementById(field.label).style.color = '#ff9eac';
            hasErrors = true;
        } else {
            document.getElementById(field.errorMsg).textContent = '';
            // document.getElementById(field.label).style.color = '#404E67';
        }
    }
    return isInputFilled;
    return !hasErrors;
}
