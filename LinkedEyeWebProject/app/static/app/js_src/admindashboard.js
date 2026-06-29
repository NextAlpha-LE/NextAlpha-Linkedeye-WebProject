var params = new URLSearchParams(document.location.search);
//console.log('params--->'+JSON.stringify(params))
var device = '';
var servicetype = '';
var servertypes = '';
var servertypesrow = '';
var serveros = '';
var serverosrow = '';
var serversoftware = '';
var servernic = '';
var serversoftwarerow = '';
var switcheslayers = '';
var switcheslayersrow = '';
var switchesmodel = '';
var switchesmodelrow = '';
var firewallstypes = '';
var firewallstypesrow = '';
var firewallsmodel = '';
var firewallsmodelrow = '';
var editdata = ''
var deldata = ''
var rowid = ''
var selectedFileType = "";
var portHtml = '';
var allPortResponse = [];
var prev_src_ip = '';
var prev_src_port = '';
var prev_dest_ip = '';
var prev_dest_port = '';
var domain_name = domain_name
$(document).ready(function () {
    getalldropdowndata()
    getportConn()
    //getSiteallNames()
    /*document.getElementById("selectedservertype").addEventListener("change", onchangefunc("selectedservertype"));
    document.getElementById("selectedserversoftware").addEventListener("change", onchangefunc("selectedserversoftware"));
    document.getElementById("selectedlayertype").addEventListener("change", onchangefunc("selectedlayertype"));
    document.getElementById("selectedmodel").addEventListener("change", onchangefunc("selectedmodel"));
    document.getElementById("selectedfirewalltype").addEventListener("change", onchangefunc("selectedfirewalltype"));*/
   // console.log("domain_name--->" + domain_name)
});
/*function getSiteallNames() {
    showLoader("sitetemplate")
    requestDataFromServer('/lesites/getallsitenames', { type: 'all' }, "GET").done(function (response) {
        console.log("getSiteallNames--->" + (response))
    })
}*/

function clearipInput() {
    // console.log("clearipInput--->")
    document.getElementById("ipinput").value = "";
    document.getElementById("ipinputtext").textContent = "";
}
function clearintInput() {
    //  console.log("clearintInput--->")
    document.getElementById("intinput").value = "";
    document.getElementById("intinputtext").textContent = "";
}

function ipToLong() {
    var dataip = $('#createip #ipinput').val();
    // console.log("dataip-->" + dataip)
    let ipToInt32 = (dataip) => {
        return dataip.split(".").reduce((int, v) => int * 256 + +v);
    }
    document.getElementById('ipinputtext').textContent = ipToInt32(dataip)
    // console.log(ipToInt32(dataip));
}
function LongToip() {
    var dataint = $('#createint #intinput').val();
    // console.log("dataip-->" + dataint)
    let IntToip32 = (dataint) => {
        return ((dataint >>> 24) + '.' + (dataint >> 16 & 255) + '.' + (dataint >> 8 & 255) + '.' + (dataint & 255));
    }
    document.getElementById('intinputtext').textContent = IntToip32(dataint)
    // console.log(IntToip32(dataint));
}

function openAddoptionsModal(types) {
    device = types.split("-")[0]
    servicetype = types.split("-")[1]
    document.getElementById("servicetype").textContent = device + ' ' + servicetype
    document.getElementById("servicename").value = ''
    document.getElementById('selectedservice-error-msg').innerHTML = "";
    // document.getElementById('selectedservice-label').style.color = '#404E67';
}
function onAddOptions() {
    var isInputFilled = validation('options_input_effect');
    if (isInputFilled == true) {
        $('#dialog-for-servertypes #addbtn').attr('data-dismiss', "modal");
        addservicedb();
    }
    else {
        $('#dialog-for-servertypes #addbtn').attr('data-dismiss', " ");
    }
}

function addservicedb() {
    data = [];
    clientData = {}
    //clientData["servicename"] = $("#dialog-for-servertypes #servicename").val(),
    clientData["servicename"] = $("#dialog-for-servertypes #servernameval").val(),
        clientData["device"] = device,
        clientData["servicetype"] = servicetype,
        clientData["operation"] = 'add'
    data.push(clientData)
    requestData['data'] = data;
    //console.log('DATA--->' + JSON.stringify(data))
    requestDataFromServer('/addservice/serviceOperation', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(Responsefunc);
}

function Responsefunc(response) {
    if (response['status'] == 200) {
        getalldropdowndata()
        swal({
            title: 'SUCCESS!',
            text: response['msg'],
            type: "success",
            confirmButtonClass: "btn-success",
            closeOnConfirm: true,
        });
    } else {
        swal({
            title: 'FAILURE!',
            text: response['msg'],
            type: "warning",
            confirmButtonClass: "btn-danger",
            closeOnConfirm: true
        })
    }
    // console.log('RESPONSEFUNC response--->' + JSON.stringify(response))
}

function deleteservicedb(devicename) {
    // console.log('DEVICENAME--->' + devicename)
    device = devicename.split('-')[0];
    servicetype = devicename.split('-')[1]
    if (devicename == 'server-types') {
        deldata = (document.getElementById("selectedservertype").value).split('-')[0];
        rowid = (document.getElementById("selectedservertype").value).split('-')[1];
        // console.log('SELECTED VALUE:' + servertypes)
    } else if (devicename == 'server-os') {
        deldata = (document.getElementById("selectedserveros").value).split('-')[0];
        rowid = (document.getElementById("selectedserveros").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + serversoftware)
    } else if (devicename == 'server-software') {
        deldata = (document.getElementById("selectedserversoftware").value).split('-')[0];
        rowid = (document.getElementById("selectedserversoftware").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + serversoftware)
    } else if (devicename == 'server-nic') {
        deldata = (document.getElementById("selectedservernic").value).split('-')[0];
        rowid = (document.getElementById("selectedservernic").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + serversoftware)
    } else if (devicename == 'switch-layer') {
        deldata = (document.getElementById("selectedlayertype").value).split('-')[0];
        rowid = (document.getElementById("selectedlayertype").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + switcheslayers)
    } else if (devicename == 'switch-model') {
        deldata = (document.getElementById("selectedmodel").value).split('-')[0];
        rowid = (document.getElementById("selectedmodel").value).split('-')[1];
        // console.log('SELECTED VALUE:' + switchesmodel)
    } else if (devicename == 'firewall-types') {
        deldata = (document.getElementById("selectedfirewalltype").value).split('-')[0];
        rowid = (document.getElementById("selectedfirewalltype").value).split('-')[1];
        // console.log('SELECTED VALUE:' + firewallstypes)
    } else if (devicename == 'firewall-model') {
        deldata = (document.getElementById("selectedfirewallmodel").value).split('-')[0];
        rowid = (document.getElementById("selectedfirewallmodel").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + firewallstypes)
    } else if (devicename == 'router-types') {
        deldata = (document.getElementById("selectedroutertype").value).split('-')[0];
        rowid = (document.getElementById("selectedroutertype").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + firewallstypes)
    } else if (devicename == 'router-model') {
        deldata = (document.getElementById("selectedroutermodel").value).split('-')[0];
        rowid = (document.getElementById("selectedroutermodel").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + firewallstypes)
    }

    swal({
        title: "Delete service",
        text: "Want to permanently delete this " + deldata + " from " + devicename + "?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete",
        closeOnConfirm: false
    },
        function () {
            submitdatadb('delete')
        });
}

function editservicedb(devicename) {
    // console.log('EDIT:\nDevice:' + devicename.split('-')[0] + '\nType:' + devicename.split('-')[1])
    device = devicename.split('-')[0];
    servicetype = devicename.split('-')[1]
    if (devicename == 'server-types') {
        editdata = (document.getElementById("selectedservertype").value).split('-')[0];
        rowid = (document.getElementById("selectedservertype").value).split('-')[1];
        // console.log('SELECTED VALUE:' + editdata + '\nrowir--->' + rowid)
    } else if (devicename == 'server-os') {
        editdata = (document.getElementById("selectedserveros").value).split('-')[0];
        rowid = (document.getElementById("selectedserveros").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + editdata + '\nrowir--->' + rowid)
    } else if (devicename == 'server-software') {
        editdata = (document.getElementById("selectedserversoftware").value).split('-')[0];
        rowid = (document.getElementById("selectedserversoftware").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + editdata + '\nrowir--->' + rowid)
    } else if (devicename == 'server-nic') {
        editdata = (document.getElementById("selectedservernic").value).split('-')[0];
        rowid = (document.getElementById("selectedservernic").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + editdata + '\nrowir--->' + rowid)
    } else if (devicename == 'switch-layer') {
        editdata = (document.getElementById("selectedlayertype").value).split('-')[0];
        rowid = (document.getElementById("selectedlayertype").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + editdata + '\nrowir--->' + rowid)
    } else if (devicename == 'switch-model') {
        editdata = (document.getElementById("selectedmodel").value).split('-')[0];
        rowid = (document.getElementById("selectedmodel").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + editdata + '\nrowir--->' + rowid)
    } else if (devicename == 'firewall-types') {
        editdata = (document.getElementById("selectedfirewalltype").value).split('-')[0];
        rowid = (document.getElementById("selectedfirewalltype").value).split('-')[1];
        // console.log('SELECTED VALUE:' + editdata + '\nrowir--->' + rowid)
    } else if (devicename == 'firewall-model') {
        editdata = (document.getElementById("selectedfirewallmodel").value).split('-')[0];
        rowid = (document.getElementById("selectedfirewallmodel").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + editdata + '\nrowir--->' + rowid)
    } else if (devicename == 'router-types') {
        editdata = (document.getElementById("selectedroutertype").value).split('-')[0];
        rowid = (document.getElementById("selectedroutertype").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + firewallstypes)
    } else if (devicename == 'router-model') {
        editdata = (document.getElementById("selectedroutermodel").value).split('-')[0];
        rowid = (document.getElementById("selectedroutermodel").value).split('-')[1];
        //  console.log('SELECTED VALUE:' + firewallstypes)
    }
    document.getElementById("editservice-modal").textContent = device + ' ' + servicetype
    document.getElementById("edit_service").value = editdata

}
function submitdatadb(oper_type) {
    data = [];
    clientData = {}
    if (oper_type == 'update') {
        clientData["servicename"] = document.getElementById("edit_service").value;
    } else if (oper_type == 'delete') {
        clientData["servicename"] = deldata;
    }
    clientData["rowid"] = rowid;
    clientData["device"] = device,
        clientData["servicetype"] = servicetype,
        clientData["operation"] = oper_type
    data.push(clientData)
    requestData['data'] = data;
    // console.log('SUBMIT DATA--->' + JSON.stringify(data))
    requestDataFromServer('/addservice/serviceOperation', { 'clientData': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token }, "POST").done(Responsefunc);
}


function onchangefunc(types) {

    //  console.log('if (document.getElementById("selectedserversoftware").value != undefined--->' + (document.getElementById("selectedserversoftware").value != undefined) + '\ndocument.getElementById("selectedserversoftware").value--->' + document.getElementById("selectedserversoftware").value)
    if (document.getElementById("selectedserversoftware").value != undefined && types == 'selectedservertype') {
        servertypesrow = (document.getElementById("selectedservertype").value).split('-')[1]
        servertypes = (document.getElementById("selectedservertype").value).split('-')[0]
    } else if (document.getElementById("selectedserversoftware").value != undefined && types == 'selectedserversoftware') {
        serversoftwarerow = (document.getElementById("selectedserversoftware").value).split('-')[1]
        serversoftware = (document.getElementById("selectedserversoftware").value).split('-')[0]
    } else if (document.getElementById("selectedlayertype").value != undefined && types == "selectedlayertype") {
        switcheslayersrow = (document.getElementById("selectedlayertype").value).split('-')[1]
        switcheslayers = (document.getElementById("selectedlayertype").value).split('-')[0]
    } else if (document.getElementById("selectedmodel").value != undefined && types == "selectedmodel") {
        switchesmodelrow = (document.getElementById("selectedmodel").value).split('-')[1]
        switchesmodel = (document.getElementById("selectedmodel").value).split('-')[0]
    } else if (document.getElementById("selectedfirewalltype").value != undefined && types == "selectedfirewalltype") {
        firewallstypesrow = (document.getElementById("selectedfirewalltype").value).split('-')[1]
        firewallstypes = (document.getElementById("selectedfirewalltype").value).split('-')[0]
    }
}

function getalldropdowndata() {

    $('#selectedservertype').empty();
    $('#selectedserveros').empty();
    $('#selectedserversoftware').empty();
    $('#selectedservernic').empty();
    $('#selectedswitcheslayers').empty();
    $('#selectedswitchesmodel').empty();
    $('#selectedfirewalltype').empty();
    $('#selectedfirewallmodel').empty();
    $('#selectedroutertype').empty();
    $('#selectedroutermodel').empty();
    $('#selectedapplication').empty();
    requestDataFromServer('/addservice/getalldropdowndata', {}, "GET").done(function (response) {
        //console.log("this is response " + response)
        res = JSON.parse(response);
        if (res.status == 200) {
            dropdownResponse = res.data;
        }
        // console.log('DROPDOWNRESPONSE---->' + dropdownResponse)
        dropdownResponse.forEach(function (drop) {
            //  console.log('DROP--->' + drop + '\n type--->' + typeof (drop))
            drop = JSON.parse(drop)
            var servicetyp = ''
            var anchorid = ''
            if (drop['dbservice'] == 'serverstypes') {
                servicetyp = 'types'
                anchorid = 'selectedservertype'
            } else if (drop['dbservice'] == 'serversos') {
                servicetyp = 'os'
                anchorid = 'selectedserveros'
            } else if (drop['dbservice'] == 'serverssoftware') {
                servicetyp = 'software'
                anchorid = 'selectedserversoftware'
            } else if (drop['dbservice'] == 'serversnic') {
                servicetyp = 'nic'
                anchorid = 'selectedservernic'
            } else if (drop['dbservice'] == 'switcheslayers') {
                servicetyp = 'layers'
                anchorid = 'selectedlayertype'
            } else if (drop['dbservice'] == 'switchesmodel') {
                servicetyp = 'model'
                anchorid = 'selectedmodel'
            } else if (drop['dbservice'] == 'firewalltypes') {
                servicetyp = 'types'
                anchorid = 'selectedfirewalltype'
            } else if (drop['dbservice'] == 'firewallmodel') {
                servicetyp = 'model'
                anchorid = 'selectedfirewallmodel'
            } else if (drop['dbservice'] == 'routertypes') {
                servicetyp = 'types'
                anchorid = 'selectedroutertype'
            } else if (drop['dbservice'] == 'routermodel') {
                servicetyp = 'model'
                anchorid = 'selectedroutermodel'
            }
            var optionshtml = '';
            //console.log(drop['data'])
            (drop['data']).forEach(function (row) {
                let newOption = new Option(row[servicetyp], row[servicetyp] + '-' + row['rowid']);
                const select = document.getElementById(anchorid);
                // select.add(newOption, undefined);

                optionshtml += '<option value="' + row[servicetyp] + '-' + row['rowid'] + '">' + row[servicetyp] + '</option>'
            })
            $("#" + anchorid).append(optionshtml)
            // document.getElementById(anchorid).append(optionshtml)

        });
    });
}

function addConnection() {
    $('.port_input').each(function (e) {
        id = $(this).attr('id')
        //console.log("id----->"+id)
        $("#dialog-for-addconn #" + id).val('')
        //$(this).parent().find("label").css('color', '#404E67');
        $(this).parent().find(".error-msg").text(' ');
    });
}

function lineportconn() {
    //console.log("lineportconn()-1---->");
    var isInputsFilled = validateInputs('port_input');
    if (isInputsFilled) {
        //console.log("lineportconn()-2---->");
        var requestData = {
            source_modal: $('#dialog-for-addconn #sorcemodal').val(),
            source_ip: $('#dialog-for-addconn #sorceip').val(),
            source_port: $('#dialog-for-addconn #sorceport').val(),
            source_name: $('#dialog-for-addconn #sorcename').val(),
            destination_modal: $('#dialog-for-addconn #destmodal').val(),
            destination_ip: $('#dialog-for-addconn #destip').val(),
            destination_port: $('#dialog-for-addconn #destport').val(),
            destination_name: $('#dialog-for-addconn #destname').val()
        };
        //console.log("lineportconn---->" + JSON.stringify(requestData));
        //console.log('DOMAIN_NAME- - -> ' + domain_name)
        $('#dialog-for-addconn #addconnbtn').attr('data-dismiss', "modal");
        requestDataFromServer('/entity/portconnection', { 'conndata': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token, 'domain_name': domain_name}, "POST").done(portconnResponse);
    } else {
        $('#dialog-for-addconn #addconnbtn').attr('data-dismiss', " ");
    }
}

function portconnResponse(response) {
    //console.log("testing ----->" + JSON.stringify(response))
    //res = JSON.parse(response)
    if (response.status == 200) {
        swal({
            title: response.msg,
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
        swal(response.message, ' ', "error");
}

function validateInputs() {
    // console.log("validateInputs---->");
    var sorceip = $('#dialog-for-addconn #sorceip').val();
    var destip = $('#dialog-for-addconn #destip').val();

    if (!sorceip || !destip) {
        alert("Please fill in source IP and destination IP.");
        return false;
    }

    // Set other empty fields to "None"
    $('#dialog-for-addconn input').each(function () {
        if ($(this).val().trim() === "") {
            $(this).val("None");
        }
    });

    return true;
}

function getportConn() {
    requestDataFromServer('/entity/connporttable', {}, "GET").done(function (response) {
       // console.log("portNamesResponse------>", response);
        if (response.status === 200) {
            $("#portconndata #table-view").show();
            $("#portconndata-nodata").hide();
            $("#portconndata #data tbody").empty();
            allPortResponse = response.data;
            response.data.forEach(function (obj) {
              //  console.log("res.data--obj--->" + JSON.stringify(obj));
                addport(obj);
            });

            $("#portconndata #data tbody").append(portHtml);
        } else {
            const msg = response.msg || 'No Port connection available';
            $("#portconndata #table-view").hide();
            $("#portconndata-nodata").show();
            $("#portconndata-nodata #tryagainbtn").prop('disabled', false);
            $("#portconndata-nodata #nodatamessage").text(msg);
        }
    });
}
function selectAllportCheckboxes(source) {
   // console.log("selectAllportCheckboxes--->")
    var checkboxes = document.querySelectorAll('#portdataconn input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = source.checked;
    });
}
function addport(obj) {
    var allportdata = JSON.stringify(obj);
    var portalldata = allportdata.replace(/\{|\}/g, '');
    var encodedPortData = encodeURIComponent(portalldata);
    portHtml += '<tr class="collapse-tr" style="text-align: center;" id =' + obj.id + '>'
    portHtml += '<td class=""><input type="checkbox" name="ports" onclick="onCheckboxClick(' + obj.id + ',\'' + obj.source_modal + '\',\'' + encodedPortData + '\')" value="' + obj.source_modal + '" data-value="' + encodedPortData + '"></td>';
    portHtml += '<td class="pl-3">' + obj.source_modal + '</td>'
    portHtml += '<td class="pl-3">' + obj.source_ip + '</td>'
    portHtml += '<td class="pl-3">' + obj.source_port + '</td>'
    portHtml += '<td class="pl-3">' + obj.source_name + '</td>'
    portHtml += '<td class="pl-3">' + obj.destination_modal + '</td>'
    portHtml += '<td class="pl-3">' + obj.destination_ip + '</td>'
    portHtml += '<td class="pl-3">' + obj.destination_port + '</td>'
    portHtml += '<td class="pl-3">' + obj.destination_name + '</td>'
    portHtml += '<td class="p-lg-0 px-4 py-1 action-btn">'

    portHtml += '<div class="dropdown custom-dropdown mr-3">'
    portHtml += '<button class="btn btn-default btn-ripple btn-dropdown-link dropdown-toggle icon-dropdown" type="button" id="moreoption" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
    portHtml += '<i class="icon-more_option" style="color: #6c757d"></i>'
    portHtml += '</button>'
    portHtml += '<div class="dropdown-menu" aria-labelledby="moreoption">'
    portHtml += '<a class="dropdown-item" onclick="onDeletePort(\'' + obj.id + '\',\'' + obj.source_ip + '\',\'' + obj.source_port + '\',\'' + obj.destination_ip + '\',\'' + obj.destination_port + '\',\'' + obj.source_name+ '\',\'' + obj.destination_name + '\')"><i class="icon-delete"></i>Delete</a>'
    portHtml += '<a class="dropdown-item" onclick="onEditPort(' + obj.id + ')" data-toggle="modal" data-target="#dialog-for-addconn"><i class="icon-edit2"></i>Edit</a>'
    portHtml += '</div>'
    portHtml += '</div>'
    portHtml += '</td>'
    portHtml += '</tr>'
}
function onDeletePort(id,src_ip,src_port,dest_ip,dest_port,src_name,dest_name) {
    data = {};
    requestData = {};
    data["id"] = id;
    requestData['data'] = data;
    swal({
        title: "Delete Port Connection",
        text: "Want to permanently delete this port?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete",
        closeOnConfirm: false
    },
        function () {
            //console.log("requestData---->" + JSON.stringify(requestData))
            var src_data = {}
            src_data['source_ip'] = src_ip
            src_data['source_port'] = src_port
            src_data['destination_ip'] = dest_ip
            src_data['destination_port'] = dest_port
            src_data['source_name'] = src_name
            src_data['destination_name'] = dest_name
            requestDataFromServer('/entity/deleteconnection', { 'delconndata': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token, src_data: JSON.stringify(src_data) , 'domain_name': domain_name }, "POST").done(function (response) {
                $('#dialog-for-addconn #cancelbtn').trigger('click');
                if (response.status === 200) {
                    rowid = response.rowid;
                    $("#portconndata #" + rowid).remove();
                    swal({
                        title: response.msg,
                        type: "success",
                        confirmButtonClass: "btn-success",
                        confirmButtonText: "OK"
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                location.reload();
                            }
                        });
                } else {
                    swal(response.message, ' ', "error");
                }
            });
        });
}

function deleteclkport() {
    const checkboxes = document.querySelectorAll('#portdataconn input[type="checkbox"]:checked');
    let dataToDelete = [];

    checkboxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        const rowId = row.id;
        const encodedData = checkbox.dataset.value;
        let decodedData = decodeURIComponent(encodedData);

        if (!decodedData.startsWith('{')) {
            decodedData = `{${decodedData}}`;
        }

        let src_data = JSON.parse(decodedData);
        //console.log("src_data--->" + JSON.stringify(src_data))
        dataToDelete.push({ id: rowId });
        swal({
            title: "Delete Port Connection",
            text: "Want to permanently delete this selected port?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete",
            closeOnConfirm: false
        },
            function () {
                requestDataFromServer('/entity/deleteconnection', { 'delconndata': JSON.stringify(dataToDelete), 'csrfmiddlewaretoken': csfr_token, 'src_data': JSON.stringify(src_data), 'domain_name': domain_name }, "POST").done(function (response) {
                    if (response.status === 200) {
                        $("#portconndata #" + rowId).remove();
                        swal({
                            title: response.msg,
                            type: "success",
                            confirmButtonClass: "btn-success",
                            confirmButtonText: "OK"
                        },
                            function (isConfirm) {
                                if (isConfirm) {
                                    location.reload();
                                }
                            });
                    } else {
                        swal(response.message, ' ', "error");
                    }
                }).fail(function (error) {
                    console.error('Error:', error);
                });
            }
        );
    });
}

var portconnid = ''
function onEditPort(portObjId) {
    portconnid = portObjId
    var obj = allPortResponse.filter(x => x.id == portObjId)[0]
    //console.log('Edit site response--->' + JSON.stringify(obj))
    $('#dialog-for-addconn #addconnbtn').html('Save')
    $('#dialog-for-addconn #addconnbtn').attr('onclick', 'savePortUpdate()')
    $('#dialog-for-addconn #sorcemodal').val(obj.source_modal);
    $('#dialog-for-addconn #sorceip').val(obj.source_ip);
    $('#dialog-for-addconn #sorceport').val(obj.source_port);
    $('#dialog-for-addconn #sorcename').val(obj.source_name);
    $('#dialog-for-addconn #destmodal').val(obj.destination_modal);
    $('#dialog-for-addconn #destip').val(obj.destination_ip);
    $('#dialog-for-addconn #destport').val(obj.destination_port);
    $('#dialog-for-addconn #destname').val(obj.destination_name);
    prev_src_ip = obj.source_ip
    prev_src_port = obj.source_port
    prev_dest_port = obj.destination_port
    prev_dest_ip = obj.destination_ip
}

function savePortUpdate() {
    //console.log("lineportconn()-1---->");
    var isInputsFilled = validateInputs('port_input');
    if (isInputsFilled) {
        //console.log("lineportconn()-2---->");
        var requestData = {
            id: portconnid,
            source_modal: $('#dialog-for-addconn #sorcemodal').val(),
            source_ip: $('#dialog-for-addconn #sorceip').val(),
            source_port: $('#dialog-for-addconn #sorceport').val(),
            source_name: $('#dialog-for-addconn #sorcename').val(),
            destination_modal: $('#dialog-for-addconn #destmodal').val(),
            destination_ip: $('#dialog-for-addconn #destip').val(),
            destination_port: $('#dialog-for-addconn #destport').val(),
            destination_name: $('#dialog-for-addconn #destname').val()
        };
        var src_data = {}
        src_data['source_name'] = $('#dialog-for-addconn #sorcename').val()
        src_data['dest_name'] = $('#dialog-for-addconn #destname').val()
        //console.log("editportconn---->" + JSON.stringify(requestData));
        $('#dialog-for-addconn #addconnbtn').attr('data-dismiss', "modal");
        requestDataFromServer('/entity/editportconnection', { 'conneditdata': JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token, 'domain_name': domain_name, 'prev_src_ip': prev_src_ip ,'prev_src_port': prev_src_port , 'prev_dest_port': prev_dest_port , 'prev_dest_ip': prev_dest_ip , 'src_data': src_data }, "POST").done(portconnResponse);
    } else {
        $('#dialog-for-addconn #addconnbtn').attr('data-dismiss', " ");
    }
}
function downloadporttemp() {
   // console.log("file temp");
    var filename = 'Port_Connection-v1';
    var url = '/allonboard/download_file?testname=' + encodeURIComponent(filename) + '&csrfmiddlewaretoken=' + encodeURIComponent(csfr_token);
    window.location.href = url;
}
// Make sure you include the exceljs library in your project
// import * as ExcelJS from 'exceljs';
let downloadfileData = () => {
    requestDataFromServer('/entity/connporttable', {}, "GET").done(function (response) {
        const exportport = response.data;
       // console.log("exportport--->" + JSON.stringify(exportport))
        let dataToExport = [];

        // Check if any checkboxes are selected
        const checkboxes = document.querySelectorAll('#portdataconn input[type="checkbox"]');
        const checkedIds = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => parseInt(checkbox.parentNode.parentNode.id));

        if (checkedIds.length > 0) {
            // Export data only for selected checkboxes
            dataToExport = exportport.filter(item => checkedIds.includes(item.id));
        } else {
            // Export all data if no checkboxes are selected
            dataToExport = exportport;
        }

        const workbook = new ExcelJS.Workbook();

        // Add worksheet for "Port_Conn" data
        const worksheet1 = workbook.addWorksheet('Port_Conn');
        const headers1 = Object.keys(dataToExport[0]).filter(header => header !== 'id');
        //console.log("headers1---->" + headers1)
        headers1.forEach((header, index) => {
            worksheet1.getCell(1, index + 1).value = header;
        });
        dataToExport.forEach((item, rowIndex) => {
            const values = headers1.map(header => {
                if (header === "source_modal") {
                    const parts = item[header].split('-');
                    if (parts.length > 0) {
                        return parts[0]; // Set the cell value to "CentOS8"
                    }
                }
                return item[header];
            });
            values.forEach((value, columnIndex) => {
                worksheet1.getCell(rowIndex + 2, columnIndex + 1).value = value;
            });
        });

        // Create a buffer and save the workbook to it
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const filename = 'Port Connections.xlsx';

            const newLink = document.createElement("a");
            newLink.href = window.URL.createObjectURL(blob);
            newLink.download = filename;
            newLink.style.display = "none";
            document.body.appendChild(newLink);

            newLink.click();
        });
    });
};

function togglexlsxForm() {
    var uploadContainer = document.getElementById("uploadsContainer");
    if (uploadContainer.style.display === "none") {
        uploadContainer.style.display = "block";
    } else {
        uploadContainer.style.display = "none";
    }
    uploadfileData()
}

function uploadfileData() {
    const fileInput = document.getElementById('portfileinput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            // CSRF token
            const csrf_token = getCookie('csrftoken');
            //const domain_name = domain_name; // replace with your actual domain name if needed
            console.log('domain_name-upload--->' + domain_name)
            const xhr = new XMLHttpRequest();
            xhr.open("POST", '/entity/uploadportconn', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("X-CSRFToken", csrf_token);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    portconnResponses(response);
                }
            };

            const requestData = {
                conndata: jsonData,
                csrfmiddlewaretoken: csrf_token,
                domain_name: domain_name
            };
           // console.log("uploaddata--->" + JSON.stringify(requestData))
            xhr.send(JSON.stringify(requestData));
        };

        reader.readAsArrayBuffer(file);
    }
}

function portconnResponses(response) {
    if (response.status === 200) {
        let message = response.msg;

        if (response.details && response.details.length > 0) {
            message += "\n\nDetails:\n" + response.details.join("\n");
        }

        swal({
            title: "Port Connection Process Completed",
            text: message,
            type: "success",
            confirmButtonClass: "btn-success",
            confirmButtonText: "OK"
        }, function (isConfirm) {
            if (isConfirm) {
                location.reload();
            }
        });
    } else {
        swal(response.message, ' ', "error");
    }
}

/*function portconnResponses(response) {
    if (response.status === 200) {
        swal({
            title: response.msg,
            type: "success",
            confirmButtonClass: "btn-success",
            confirmButtonText: "OK"
        },
            function (isConfirm) {
                if (isConfirm) {
                    location.reload();
                }
            });
    } else {
        swal(response.message, ' ', "error");
    }
}*/

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//==========================================================================================
