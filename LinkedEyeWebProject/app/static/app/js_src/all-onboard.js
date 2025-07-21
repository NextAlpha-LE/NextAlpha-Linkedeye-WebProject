var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
var global_all_services;
var global_ip_addresses;
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
var emailLists = [];
var onboardselectValue;
var selectkeyValue;
var gatewayswitch = 0
var routerswitch = 0
var publicswitch = 0
var exchangeswitch = 0
var fortigate50E = 0
var fortigate60E = 0
var fortigate60F = 0
var fortigate70F = 0
var fortigate80F = 0
var fortigate100E = 0
var fortigate100F = 0
var fortigate120G = 0
var fortigate200F = 0
var router4321 = 0
var physicalser = 0
var virtualser = 0
var gcount = 0, ecount = 0, scount = 0, pcount = 0, fcount = 0, rcount = 0;
var ilomgmt_list = [];
var idrac_list = [];
var nodemgmt_list = [];
var winmgmt_list = [];
var ngnixmgmt_list = [];
var validationip = ''
var leurl = ''
/* Onload function start */
$(document).ready(function () {
    $(".loader").hide();
    //  getServices();
    initializeModal();
    //tablenewonb();
    //displaynewonb();
    getclickSiteNames();
    if (window.location.href.split('?').pop() === 'redirectToAddhostPage') {
        isFillHostDetails = false;
        $(".add").trigger("click",
            // getFileNames(),
            // getServices(),
            // getVaultInformation(),
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
        // fillHostDetails();
        $("#nodata").hide();
        $(".maincontent").hide();
    }
    $(".add").click(function () {
        // getFileNames();
        // getServices();
        // getVaultInformation()
        $("#nodata").hide();
        $("#hostcontent").hide();
        $(".maincontent").show();
    });
    $("#save").click(function () {
        sendFormDataToServer();
    });
    $("#service-selected").hide();
    // $("#services-select-div").hide();
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

function getclickSiteNames() {

    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
       // console.log("getSiteNames--->" + JSON.stringify(res))
        if (res.status == 200) {
            siteResponse = res.data;
            leurl = siteResponse[0]['le_url']
           // console.log("getSiteNames--->" + JSON.stringify(siteResponse))
           // console.log("getSiteNames-3-->" + leurl)
        }
        tablenewonb()
        displaynewonb();
        // getHardwareData();
       // getServerHostData();
    });

}

/* Onload function end */
/* ------------- ALL MODAL FUNCTION START ------------------ */
function initializeModal() {
    var currentStep = 1;
    var formData = {};
    function showModalStep(step) {
        $('#modalBodyStep' + currentStep).hide();
        currentStep = step;
        $('#modalBodyStep' + currentStep).show();
        nexticon();
        updateBreadcrumb();
        updateButtons();
        if (currentStep === 3) {
            nextdata();
        }
        if (currentStep === 4) {
            toggleServiceId(); // Show/hide service-id based on onboardselectValue
        }
        if (currentStep === 5) {
            saveFormData();
        }
    }
    function showNextStep() {
        if (!validateStepForm(currentStep)) {
            showError();
            return;
        }
        storeFormData();
        showModalStep(currentStep + 1);
    }
    function handleSelectChange(selector, step) {
        $(document).on('change', selector, function () {
            var selectedValue = $(this).val();
            if (selectedValue) {
                if (currentStep === step) {
                    storeFormData();
                }
                showModalStep(currentStep + 1);
            }
        });
    }
    handleSelectChange('#onboardSelect', 1);
    handleSelectChange('#selectdevice', 2);
    function showPreviousStep() {
        showModalStep(currentStep - 1);
        showFormData(); // Call showFormData() after showing the previous step
    }
    function updateBreadcrumb() {
        var breadcrumb = '';
        for (var step = 1; step <= currentStep; step++) {
            var stepTitle = $('#modalBodyStep' + step + ' h5').text();
            if (step === currentStep) {
                breadcrumb += '<span style="color: #e99123;">' + stepTitle + '</span>';
            } else {
                breadcrumb += '<a href="#" class="breadcrumb-step" data-step="' + step + '">' + stepTitle + '</a>';
            }
            if (step < currentStep) {
                breadcrumb += ' > ';
            }
        }
        $('#showlist').html(breadcrumb);
    }
    function updateButtons() {
        $('#backButton').toggle(currentStep > 1);
        $('#nextButton').html(currentStep === 5 ? 'Submit' : 'Next &raquo;');
    }
    function validateStepForm(step) {
        var isValid = true;
        var inputsToValidate = [];
        var errorBorderClass = 'error-border';

        if (step === 1) {
            inputsToValidate = ['#onboardSelect'];
            var onboardSelect = $('#onboardSelect');
            var value = onboardSelect.val();
            if (value === null || value === '') {
                onboardSelect.css('border-color', '#ff3d57');
                isValid = false;
            } else {
                onboardSelect.css('border-color', '');
                onboardselectValue = value; // Save the value in the global variable
            }
        } else if (step === 2) {
            inputsToValidate = ['#selectdevice'];
        } else if (step === 3) {
            var validIds = ['#path-dropdown', '#hosts-dropdown', '#multi-select-ip', '#sub-multi-select-ip', '#REUSABLE_EMAIL', '#GLOBAL_APPLICATION', '#FRNDLY_NAME'];
            if (step === 3 && $('#path-dropdown').val() === 'VM') {
                validIds.push('#PHYSICAL_IP');
            }
            inputsToValidate = validIds;
            if (validIds.includes('#PHYSICAL_IP')) {
                var physicalIpInput = $('#PHYSICAL_IP');
                var ipAddressPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
                var value = physicalIpInput.val();

                if (!ipAddressPattern.test(value)) {
                    physicalIpInput.css('border-color', '#ff3d57');
                    isValid = false;
                    swal("Fill 'IPADDRESS' in correct format on 'PHYSICAL IP' field", ' ', 'warning');
                } else {
                    physicalIpInput.css('border-color', '');
                }
            }
        }
        //inputsToValidate = validIds;
        // Additional validation for PHYSICAL_IP input
        
        inputsToValidate.forEach(function (input) {
            var value = $(input).val();
            if (value === null || value === '') {
                $(input).css('border-color', '#ff3d57');
                isValid = false;
            } else {
                $(input).css('border-color', '');
            }
        });

        return isValid;
    }
    function showError() {
        $('#showerror').html('<span style="color: #ff3d57;margin-left:4%;">Please fill in all the required fields.</span>');
        setTimeout(function () {
            $('#showerror').empty();
            $('#onboardSelect, #selectdevice, #hosts-dropdown, #multi-select-ip, #sub-multi-select-ip, #REUSABLE_EMAIL, #GLOBAL_APPLICATION, #FRNDLY_NAME, #PHYSICAL_IP').removeClass('error-border');
        }, 2000);
    }
    function showFormData() {
        var stepData = formData[currentStep]; // Get the stored data for the current step
        if (typeof stepData === 'object') {
            Object.keys(stepData).forEach(function (inputID) {
                var selector = inputID.startsWith('#') ? inputID : '#' + inputID; // Add the '#' symbol if missing
                var value = stepData[inputID];
                if ($(selector).is('select')) {
                    // For select dropdowns
                    //$(selector).val(value);
                    setTimeout(function () {
                        $(selector).val(value); // Trigger the change event after a delay
                    }, 1500);
                } else {
                    // For other input fields
                    $(selector).val(value);
                }
            });
        }
    }
    function storeFormData() {
        // Store the form data of the current step
        var inputsToStore = [];
        if (currentStep === 1) {
            inputsToStore = ['#onboardSelect'];
        } else if (currentStep === 2) {
            inputsToStore = ['#selectdevice'];
        } else if (currentStep === 3) {
            var validIds = ['#path-dropdown', '#hosts-dropdown', '#multi-select-ip', '#sub-multi-select-ip', '#REUSABLE_EMAIL', '#GLOBAL_APPLICATION', '#FRNDLY_NAME'];
            if ($('#path-dropdown').val() === 'VM') {
                validIds.push('#PHYSICAL_IP');
            }
            inputsToStore = validIds;
        }
        if (inputsToStore.length > 0) {
            var stepData = {};
            inputsToStore.forEach(function (input) {
                var value = $(input).val();
                stepData[input] = value; // Store the value in the stepData object
            });
            formData[currentStep] = stepData; // Store the step data in the formData object
        } else {
            delete formData[currentStep]; // Remove the step data from the formData object if inputsToStore is empty
        }
    }
    $('#nextButton').click(function () {
        if (currentStep === 5) {
            if (!validateStepForm(currentStep)) {
                showError();
                return;
            }
            // Handle form submission
            // ...

            saveModaldata();
        } else {
            showNextStep();
        }
    });

    $('#backButton').click(function () {
        showPreviousStep();
    });

    $(document).on('click', '.breadcrumb-step', function (e) {
        e.preventDefault();
        var step = $(this).data('step');
        if (step < currentStep) {
            showPreviousStep();
        } else if (step > currentStep) {
            showNextStep();
        }
    });

    $('#onboardModal').on('hidden.bs.modal', function () {
        resetModal();
    });
}
function toggleServiceId() {
    var serviceContainer = $('#service-id');
    var onboardsel = $('#onboardSelect').val()
    if (onboardsel === 'Server') {
        serviceContainer.show();
    } else {
        serviceContainer.hide();
    }
}
function resetModal() {
    currentStep = 1;
    $('#modalBodyStep2, #modalBodyStep3, #modalBodyStep4, #modalBodyStep5').hide();
    $('#modalBodyStep1').show();
    $('#backButton').hide();
    $('#nextButton').html('Next &raquo;');
    location.reload();
}
/* ------------- ALL MODAL FUNCTION END ------------------ */
/*-------------- MAIN PAGE CARD DROPDOWN ----------------*/
function Switchlayer() {
    requestDataFromServer('Switcheslayer', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        var swires = JSON.parse(response);
        var switypehtml = '<table class="table">';
        switypehtml += '<thead><tr><th>Types</th><th>Count</th></tr></thead>';
        switypehtml += '<tbody>';
        if (swires.data !== '') {
            swires.data.forEach(function (obj) {
                var layers = obj.layers;
                var layering = layers.replace(/\s/g, '');
                switypehtml += '<tr>';
                switypehtml += '<td>' + layers + '</td>';
                switypehtml += '<td>' + '<p class="primary-text bold-text size18 mb-1" id="' + layering + '">0</p>' + '</td>';
                switypehtml += '</tr>';
            });
            switypehtml += '</tbody></table>';
            $("#swithtypelist").html(switypehtml);
        } else {
            swal("Switch's type not added, please check Administrator", ' ', 'warning');
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
function firewalltype() {
    requestDataFromServer('Firewalltype', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        fireres = JSON.parse(response)
        var firetypehtml = '<table class="table">';
        firetypehtml += '<thead><tr><th>Types</th><th>Count</th></tr></thead>';
        firetypehtml += '<tbody>';
        if (fireres.data != '') {
            fireres.data.forEach(function (obj) {
                var flayers = obj.types
                flayering = flayers.replace(/\s/g, '')
                firetypehtml += '<tr>';
                firetypehtml += '<td>' + flayers + '</td>';
                firetypehtml += '<td>' + '<p class="primary-text bold-text size18 mb-1" id="' + flayering + '">0</p>' + '</td>';
                firetypehtml += '</tr>';
            });
            firetypehtml += '</tbody></table>';
            $("#firewalltypelist").html(firetypehtml);
        } else {
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
        if (document.getElementById('Fortigate70F') != null) {
            document.getElementById('Fortigate70F').textContent = fortigate70F
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
        if (document.getElementById('Fortigate120G') != null) {
            document.getElementById('Fortigate120G').textContent = fortigate120G
        }
        if (document.getElementById('Fortigate200F') != null) {
            document.getElementById('Fortigate200F').textContent = fortigate200F
        }
    });
}
function serverstype() {
    requestDataFromServer('getserverstype', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        res = JSON.parse(response)
        var sertypehtml = '<table class="table">';
        sertypehtml += '<thead><tr><th>Types</th><th>Count</th></tr></thead>';
        sertypehtml += '<tbody>';
        if (res.data != '') {
            res.data.forEach(function (obj) {
                sertypehtml += '<tr>';
                sertypehtml += '<td>' + obj.types + '</td>';
                sertypehtml += '<td>' + '<p class="primary-text bold-text size18 mb-1" id="' + obj.types + '">0</p>' + '</td>';
                sertypehtml += '</tr>';
            });
            sertypehtml += '</tbody></table>';
            $("#servertypelist").html(sertypehtml);
        } else {
            swal("Server's type not Added, Please check Administrator", ' ', 'warning')
        }
        if (document.getElementById('Physical') != null) {
            document.getElementById('Physical').textContent = physicalser
        }
        if (document.getElementById('VM') != null) {
            document.getElementById('VM').textContent = virtualser
        }
    });
}
function routertype() {
    requestDataFromServer('Routermodel', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        res = JSON.parse(response)
        var routypehtml = '<table class="table">';
        routypehtml += '<thead><tr><th>Types</th><th>Count</th></tr></thead>';
        routypehtml += '<tbody>';
        if (res.data != '') {
            res.data.forEach(function (obj) {
                routypehtml += '<tr>';
                routypehtml += '<td>' + obj.model + '</td>';
                routypehtml += '<td>' + '<p class="primary-text bold-text size18 mb-1" id="' + obj.model + '">0</p>' + '</td>';
                routypehtml += '</tr>';
            });
            routypehtml += '</tbody></table>';
            $("#routertypelist").html(routypehtml);
        } else {
            swal("Routers's type not Added, Please check Administrator", ' ', 'warning')
        }
        if (document.getElementById('router 4321') != null) {
            document.getElementById('router 4321').textContent = router4321
        }
    });
}
/*-------------- MAIN PAGE CARD DROPDOWN END ----------------*/
/* ------------- ADD ON MODAL CONTENT  -------------------*/
function toggleAddon() {
    var addonSwitch = document.getElementById("addonSwitch");
    var addonContent = document.getElementById("addon-content");
    if (addonSwitch.checked) {
        addonmodal();
        addonContent.style.display = "block";
        toggleAddonCheckboxes();
        var selectedIP = $("#multi-select-ip").val();
        validationip = selectedIP
        newonbipadd(selectedIP)
       // iloipaddr()
    } else {
        // Code to execute when the switch is toggled off
        addonContent.style.display = "none";
    }
}
function toggleAddonCheckboxes() {
    var checkboxes = $('#addon-content input[type="checkbox"]');
    checkboxes.each(function () {
        var checkbox = $(this);
        var label = checkbox.next('label');
        var labelText = label.text().trim();
        //console.log("labelText---->" + labelText)
       // console.log("selectkeyValue---->" + selectkeyValue)
        if (
            (['Fortigate', 'Switch', 'router'].some(value => selectkeyValue.includes(value)) && labelText === 'SNMP') ||
            (selectkeyValue === 'Physical' && ['ILO', 'IDRAC', 'Node Expo', 'Window Expo', 'Nginx Expo'].includes(labelText)) ||
            (selectkeyValue === 'VM' && ['Node Expo', 'Nginx Expo', 'Window Expo'].includes(labelText))
           // (selectkeyValue === 'VM' && labelText === 'Node Expo', 'Nginx Expo')
        ) {
            checkbox.parent().show();
        } else {
            checkbox.parent().hide();
        }
    });
}
function addonmodal() {
    var checkboxData = [
        { label: "ILO", modalId: "mgmtModal" },
        { label: "IDRAC", modalId: "idracModal" },
        { label: "Node Expo", modalId: "nodeModal" },
        { label: "Window Expo", modalId: "windowModal" },
        { label: "Nginx Expo", modalId: "nginxModal" },
        { label: "SNMP", modalId: "snmpModal" }
    ];
    var modalBodyContent = $("#addon-content");
    modalBodyContent.empty(); // Clear existing content before adding new checkboxes

    checkboxData.forEach(function (data) {
        var checkboxId = "checkbox-" + data.label.replace(/\s/g, "-").toLowerCase();
        var checkbox = $("<input>", {
            class: "form-check-input",
            type: "checkbox",
            value: "",
            id: checkboxId
        });
        var label = $("<label>", {
            class: "form-check-label",
            for: checkboxId,
            text: data.label
        });
        var formCheck = $("<div>", {
            class: "form-check"
        }).append(checkbox, label);
        modalBodyContent.append(formCheck);

        if (data.modalId) {
            checkbox.on("change", function () {
                var modalId = "#" + data.modalId;
                if ($(this).is(":checked")) {
                    $(modalId).modal("show");
                } else {
                    $(modalId).modal("hide");
                }
            });
        }
    });
}
function toggleautomation() {
    var selectedsubIps = [].concat($('#sub-multi-select-ip').val()); // Convert to array
    var selectedmainIps = [].concat($('#multi-select-ip').val()); // Convert to array
    var selectedIps = selectedmainIps.concat(selectedsubIps); // Combine arrays
    var automationContent = $('#automation-content');
    automationContent.empty(); // Clear previous content
    selectedIps.forEach(function (ip) {
        var checkbox = $('<input type="checkbox">').val(ip).on('change', function () {
            // Handle checkbox change event here if needed
            var select = $(this).closest('.row').find('select');
            if ($(this).is(':checked')) {
                select.show();
            } else {
                select.hide();
            }
        });
        var option1 = ''
        var label = $('<label>').append(checkbox).append(ip);
        var select = $('<select class="custom-select btn-dropdown dropdown-toggle px-2" style="width:140% !important;margin-left:-40px !important;height: 25px !important;">');
         option1 += '<option style="color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;" value="" selected disabled>Select Secret</option>';
         option1 += '<option style="color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;" value="">secret1</option>';
         option1 += '<option style="color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;" value="">secret2</option>';
        select.append(option1);
        select.hide(); // Initially hide the select element
        var row = $('<div>').addClass('row').append($('<div>').addClass('col-md-6').append(label)).append($('<div>').addClass('col-md-6').append(select));
        automationContent.append(row);
    });
    var automationSwitch = $('#automationSwitch');
    if (automationSwitch.prop('checked')) {
        automationContent.show(); // Show the automation content
    } else {
        automationContent.hide(); // Hide the automation content
    }
}

/* ------------- ADD ON MODAL CONTENT END -------------------*/
var selectedonbValue = ''
function nexticon() {
    var selectElement = document.getElementById("onboardSelect");
    selectedonbValue = selectElement.value;
    document.getElementById('selectonb').textContent = "Select " + selectedonbValue + " Type"
    onboarddevice(selectedonbValue)
}
/* ------ SELECT DEVICES FUNCTION START ---------- */
function onboarddevice(selectedValue) {
    var device = selectedValue;
    function updateSelectDeviceOptions(data, valueKey, textKey) {
        var devicehtml = '';
        $("#selectdevice").empty();
        devicehtml += '<option style="color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;" value="" selected disabled>Select Type</option>';
        if (data != '') {
            data.forEach(function (obj) {
                devicehtml += '<option style="color:#ffffff;background-color:#1f1f1f;font-size:0.875rem;" value="' + obj[valueKey] + '">' + obj[textKey] + '</option>';
            });
            $("#selectdevice").append(devicehtml);
        }
    }
    if (device == 'Server') {
        requestDataFromServer('getserverstype', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
            var res = JSON.parse(response);
            updateSelectDeviceOptions(res.data, 'types', 'types');
        });
    } else if (device == 'Firewall') {
        requestDataFromServer('Firewalltype', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
            var res = JSON.parse(response);
            updateSelectDeviceOptions(res.data, 'types', 'types');
        });
    } else if (device == 'Switch') {
        requestDataFromServer('Switcheslayer', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
            var res = JSON.parse(response);
            updateSelectDeviceOptions(res.data, 'layers', 'layers');
        });
    } else if (device == 'Router') {
        requestDataFromServer('Routermodel', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
            var res = JSON.parse(response);
            updateSelectDeviceOptions(res.data, 'model', 'model');
        });
    }
}
/* ------ SELECT DEVICES FUNCTION END ------- */
function nextdata() {
    var selectElements = document.getElementById("selectdevice");
    var selectedValues = selectElements.value;
    // document.getElementById('selectonbdata').textContent = "Enter " + selectedValues + " to Onboard"
    gethostfile(selectedValues)
    getIpAddress()
}
/* ------ SELECT FILES FUNCTION START ---------- */
function gethostfile(nameswi) {
    //console.log("gethostfile---->"+nameswi)
    var pathname = nameswi; // Declare the variable with "var"
     selectkeyValue = pathname; // Declare the variable with "var"
    var html = '<option selected value="' + pathname + '">' + pathname + '</option>';
    $("#path-dropdown").append(html);
    requestDataFromServer('getfilenames', { "fileName": hostPath }, "GET").done(function (response) {
        var res = JSON.parse(response); // Declare the variable with "var"
        if (res.status == 200) {
            var hostHtml = generateHostOptions(res.data, pathname);
            $("#hosts-dropdown").empty().append(hostHtml);
        }
    });
}
function generateHostOptions(hostNames, pathname) {
  //  console.log("generateHostOptions---->" + hostNames + "-------" + pathname)
  //  console.log("generateHostOptions---->" + hostNames + "-------" + pathname)
    var hostHtml = '<option selected disabled>Select host</option>';
    var selecthosts = '';
    var mappings = {
        svrhostname: pathname,
        hahostname: pathname.split("-")[0],
        publtypename: pathname.replace(" switch", ""),
        firetypename: pathname.split(" ")[1],
        routertypename: pathname.split(" ")[1],
        gatetypename: pathname.replace(" Switch", "")
    };
    var subDataIpStyle = pathname.includes("Switch") || pathname.includes("Fortigate") || pathname.includes("router") ? 'display:none !important' : 'display:block !important';
    $("#sub-data-ip").attr('style', subDataIpStyle);

    var physicalIpStyle = pathname === 'VM' ? 'display:block !important' : 'display:none !important';
    $("#PHYSICAL_IP").attr('style', physicalIpStyle);

    // Array to hold hostName and selecthosts pairs
    var hostArray = [];

    hostNames.forEach(function (hostName) {
        if (pathname === "Physical" || pathname === "VM") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Gateway Switch") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Public Switch") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Exchange Switch") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Fortigate 50E") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Fortigate 60E") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Fortigate 60F") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Fortigate 70F") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Fortigate 80F") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Fortigate 100E") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Fortigate 100F") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Fortigate 120G") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "Fortigate 200F") {
            selecthosts = hostName.split('-')[0];
        } else if (pathname === "router 4321") {
            selecthosts = hostName.split('-')[0];
        }

        if (isHostMatching(hostName, mappings)) {
            // Add matching hostName and selecthosts to array
            hostArray.push({ hostName: hostName, selecthosts: selecthosts });
        }
    });

    // Sort hostArray by selecthosts alphabetically
    hostArray.sort((a, b) => a.selecthosts.localeCompare(b.selecthosts));
    // Build the hostHtml using sorted hostArray
    hostArray.forEach(function (item) {
        //console.log("hostName-1-->" + JSON.stringify(item.hostName));
        //console.log("selecthosts-1-->" + JSON.stringify(item.selecthosts));
        hostHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + item.hostName + '" >' + item.selecthosts + '</option>';
    });
    // Display or hide #service-data-ip based on the sorted results
    if (hostArray.length > 0) {
        $("#service-data-ip").attr('style', 'display:block !important');
    } else {
        $("#service-data-ip").attr('style', 'display:none !important');
    }
    return hostHtml;
}

function isHostMatching(hostName, mappings) {
    for (var key in mappings) {
        if (hostName.includes(mappings[key])) {
            return true;
        }
    }
    return false;
}
// Add click event to dynamically generated dropdown options
function hostselected(select) {
    $("#ipaddress-details").attr('style', 'display:block !important;padding-right:4% !important;');
}
function ipaddrselected(select) {
    $("#email-details").attr('style', 'display:block !important;padding-right:4% !important;');
}
function appselected(select) {
    $("#friendly-details").attr('style', 'display:block !important;padding-right:4% !important;');
}
/* ------ SELECT FILES FUNCTION END ---------- */
/* ------ SELECT IPADDRESS FUNCTION START ---------- */
function getIpAddress() {
    if (global_ip_addresses === undefined)
        requestDataFromServer('getiplist', {}, "GET").done(fillIPValues);
}
function fillIPValues(response) {
    res = JSON.parse(response);
    if (res.status == 200) {
        global_ip_addresses = res.data;
        // getApplicationNames();
    }
    else {
        swal('Issue in gettin Iplist', ' ', 'error')
    }
    drawMultiplIPAddresses()
}
function drawIPAddresses(targetId, title) {
    if (global_ip_addresses !== undefined) {
        $(targetId).empty();
        var html = ''
        if (title == 'IP Address') {
            html += '<option value="" selected disabled>' + title + '</option>';
        } else {
            html += '<option value="" disabled>' + title + '</option>';
        }
        //var html = '<option value="" selected disabled>' + title + '</option>';
        global_ip_addresses.forEach(function (obj) {
            var ip = obj["ip"];
            var checkIp = registeredIPAddress.includes(ip);
            var prop = checkIp ? 'disabled' : '';
            var textColor = checkIp ? 'gray' : '#ffffff';
            html += '<option style="color:' + textColor + ';font-size:0.875rem;" value="' + ip + '" ' + prop + '>' + ip + '</option>';
        });
        $(targetId).append(html);
    }
}

function drawMultiplIPAddresses() {
    drawIPAddresses("#multi-select-ip", "IP Address");
    $("#multipleIPAddressSelect").show();
    drawsubMultiplIPAddresses();
}

function drawsubMultiplIPAddresses() {
    drawIPAddresses("#sub-multi-select-ip", "Sub IP Address");
    registerMultiSelect();
    getemailNames();
    getApplicationNames();
}

function registerMultiSelect() {
    if (!registeredMultiSelect) {
        registeredMultiSelect = true;
        $('#sub-multi-select-ip').multipleSelect({
            placeholder: 'Sub IP Address',
            filter: true,
            filterPlaceholder: 'Search IP',
            filterAcceptOnEnter: true,
            showClear: true,
            filterByDataLength: 10
        });
    }
}

/* ------ SELECT IPADDRESS FUNCTION END ---------- */
function populateMultiSelect(selectId, placeholder, prefix) {
    var selectedsubIps = [].concat($('#sub-multi-select-ip').val()); // Convert to array
    var selectedmainIps = [].concat($('#multi-select-ip').val()); // Convert to array
    var selectedIps = selectedmainIps.concat(selectedsubIps); // Combine arrays
    var mgmtSelect = $('#' + selectId);
    // Clear previous options
    mgmtSelect.empty();
    // Add selected IPs as options
    var html = '<option value="" disabled>' + placeholder + '</option>';
    selectedIps.forEach(function (ip) {
        html += '<option style="color:#ffffff;font-size:0.875rem;" value="' + ip + '">' + ip + '</option>';
    });
    mgmtSelect.append(html);
    registermgmtMultiSelect(selectId, placeholder);
}

function registermgmtMultiSelect(selectId, placeholder) {
    var selectElement = $('#' + selectId);
    if (!selectElement.hasClass('ms-parent')) {
        selectElement.multipleSelect({
            placeholder: placeholder,
            filter: true,
            filterPlaceholder: 'Search IP',
            filterAcceptOnEnter: true,
            showClear: true,
            filterByDataLength: 10
        });
    }
}

function iloipaddr() {
    populateMultiSelect('multi-select-ilo', 'Server IP Address', 'iloipaddr');
}
function idracipaddr() {
    populateMultiSelect('multi-select-idrac', 'Server IP Address', 'idracipaddr');
}
function nodeipaddr() {
    populateMultiSelect('multi-select-node', 'Server IP Address', 'nodeipaddr');
}
function nginxipaddr() {
    populateMultiSelect('multi-select-nginx', 'Server IP Address', 'nginxipaddr');
}
function winipaddr() {
    populateMultiSelect('multi-select-win', 'Server IP Address', 'winipaddr');
}
/* ------ SELECT Email & Application FUNCTION START ---------- */
function getemailNames() {
    // Create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Set up the request
    xhr.open("GET", leurl +'/useronboard/getuserlist', true);

    // Set up a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Call the handleEmailNamesResponse function with the responseText
                handleEmailNamesResponse(xhr.responseText);
            } else {
                // Handle the error case here (e.g., display an error message)
                swal('Failure in getallemails ', ' ', 'error');
            }
        }
    };

    // Send the request
    xhr.send();
}

function handleEmailNamesResponse(response) {
    var res = JSON.parse(response);
    emailHtml = '';
    $("#REUSABLE_EMAIL").empty();

    if (res.status == 200) {
        emailHtml += '<option value="">Select Email</option>';
        res.data.forEach(function (obj) {
            if (obj.email !== "admin") {
                // Assuming emailLists is a global variable
                emailLists.push(obj.email);
                emailHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + obj.email + '">' + obj.email + '</option>';
            }
        });
        $("#REUSABLE_EMAIL").append(emailHtml);
    } else {
        swal('Failure in getallemails ', ' ', 'error');
    }
}

function getApplicationNames() {
    if (applicationNames.length === 0) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', leurl +'/applications/getallapplicationnames', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    handleApplicationNamesResponse(xhr.responseText);
                } else {
                    // Handle error as needed
                    console.error('Error in getallapplicationnames:', xhr.statusText);
                }
            }
        };

        xhr.send();
    }
}
function handleApplicationNamesResponse(response) {
    res = JSON.parse(response);
    var innerHtml = " ";
    if ($('#GLOBAL_APPLICATION').children('option').length == 0) {
        innerHtml = "<option disabled selected>Select Application</option>";
    }
    if (res.status == 200) {
        res.data.forEach(function (obj) {
            applicationNames.push(obj.applicationname);
            if (!$("#GLOBAL_APPLICATION option[value=" + obj.applicationname + ']').length > 0) {
                innerHtml += '<option style="color:#ffffff;font-size:0.875rem;" value="' + obj.applicationname + '">' + obj.applicationname + '</option>';
            }
        });
    } else {
        swal('Failure in getallapplicationnames ', ' ', 'error');
    }
    $("#GLOBAL_APPLICATION").append(innerHtml);
}

function saveapplication() {
    if ($('#applicationname').val() == '') {
        return false;
    } else {
        var data = {};
        data['applicationname'] = $('#applicationname').val();
        data["operation"] = 'add';
        data["rowid"] = 1;
        requestData["data"] = data;
        // Create a new XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // Set up the request
        xhr.open("POST", leurl +'/applications/applicationactions', true);
        // Set up the request headers
        xhr.setRequestHeader('Content-Type', 'application/json');
        // Set up a callback function to handle the response
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // Call the applicationResponse function with the responseText
                    applicationResponse(JSON.parse(xhr.responseText));
                } else {
                    // Handle the error case here (e.g., display an error message)
                    $("#error-application").html('Error in saving application');
                }
            }
        };

        // Convert requestData to JSON and send the request
        xhr.send(JSON.stringify({ 'clientData': requestData, csrfmiddlewaretoken: csrf_token }));
    }
}

function applicationResponse(response) {
    if (response && response.status == 500) {
        $("#error-application").html(response.msg);
    } else {
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

/* ------ SELECT Email & Application FUNCTION END ---------- */
/* ------ SELECT SERVICES FUNCTION START ---------- */
function toggleservice() {
    var serviceSwitch = document.getElementById("serviceSwitch");
    var servicesdropdown = document.getElementById("services-dropdown");
    if (serviceSwitch.checked) {
        getservicefile()
        servicesdropdown.style.display = "block";
    } else {
        // Code to execute when the switch is toggled off
        servicesdropdown.style.display = "none";
    }
}
function getservicefile() {
    requestDataFromServer('getfilenames', { "fileName": hostPath }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            var checkboxesHtml = generateCheckboxes(res.data, "Ser", "services-dropdown");
            $("#services-dropdown").empty().append(checkboxesHtml);
        }
    });
}

function generateCheckboxes(names, prefix, checkboxesId) {
    var checkboxesHtml = '';
    names.forEach(function (name) {
        if (name.includes(prefix)) {
            var checkboxValue = name.replace(prefix, "").replace(".yaml", "");
            var checkboxId = "checkbox-" + checkboxValue.replace(/\s/g, "-").toLowerCase();
            var checkboxHtml = '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="' + checkboxId + '"><label class="form-check-label" for="' + checkboxId + '">' + checkboxValue + '</label></div>';
            checkboxesHtml += checkboxHtml;
        }
    });
    return checkboxesHtml;
}
/* ------ SELECT SERVICES FUNCTION END ---------- */
function toggleUploadForm() {
    var uploadContainer = document.getElementById("uploadContainer");
    var iconContainer = document.getElementById("icons-more");
    if (uploadContainer.style.display === "none") {
        uploadContainer.style.display = "block";
        iconContainer.style.display = "block";
    } else {
        uploadContainer.style.display = "none";
    }
    importonbdata()
}
/* ------ DISPLAY ALL DETAILS FUNCTION START ---------- */
function saveFormData() {
    // Create an object to store the form values
    var formData = {};
    // Get the values from the third modal
    formData.selectModaldetails = {
        pathhost: $('#path-dropdown').val(),
        hostname: $('#hosts-dropdown').val().replace(".j2", "")
    };
    // Get the values from the fourth modal
    formData.selectModalipaddress = {
        ipAddress: $('#multi-select-ip').val(),
        subIpAddress: String($('#sub-multi-select-ip').val()).split(',')
    };
    // Get the values from the fifth modal
    formData.selectModalemail = {
        Email: $('#REUSABLE_EMAIL').val(),
        ApplicationName: $('#GLOBAL_APPLICATION').val()
    };
    // Get the values from the sixth modal
    formData.selectModaltext = {
        FriendlyName: $('#FRNDLY_NAME').val(),
        physicalIP: $('#PHYSICAL_IP').val()
    };
    // Get the values from the seventh modal
    formData.selectModalService = {
        service: $('#services-dropdown').val()
    };
    var output = '';
    for (var modal in formData) {
        for (var key in formData[modal]) {
            output += '<tr><td>' + key + '</td><td>&nbsp;&nbsp;&nbsp;&nbsp;' + formData[modal][key] + '</td></tr>';
        }
    }
    
    $('#displaydata').html('<table style="width:100%">' + output + '</table>');
}
/* ------ DISPLAY ALL DETAILS FUNCTION END ---------- */
function saveModaldata() {
    var formData = $("#devicedata").serializeArray();
    var json = {};
    var csrf_token = null;
    // Check for the presence of HOST_TEMPLATE and IP_ADDRESS properties in formData
    var hasHostTemplate = false;
    var hasIpAddress = false;
    formData.forEach(function (obj) {
        //console.log("formData--obj--->" + JSON.stringify(obj));
        if (obj.name === "HOST_TEMPLATE") {
            //json["HOST_TEMPLATE"] = obj.value;
            hasHostTemplate = true;
        } else if (obj.name === "IP_ADDRESS") {
            //json["IP_ADDRESS"] = obj.value;
            hasIpAddress = true;
        } else if (obj.name === "csrfmiddlewaretoken") {
            csrf_token = obj.value; // Capture CSRF token
        }
        if (json[obj.name]) {
            if (Array.isArray(json[obj.name])) {
                json[obj.name].push(obj.value);
            } else {
                json[obj.name] = [json[obj.name], obj.value];
            }
        } else {
            json[obj.name] = obj.value;
        }
    });
    // Add HOST_TEMPLATE and IP_ADDRESS if they are missing in formData
    if (!hasHostTemplate) {
        json["HOST_TEMPLATE"] = $('#hosts-dropdown').val(); // Replace this with the appropriate default value if needed
    }
    if (!hasIpAddress) {
        json["IP_ADDRESS"] = ($('#multi-select-ip').val()).concat($('#sub-multi-select-ip').val()); // Replace this with the appropriate default value if needed
    }
    // Set the COMMON_HOSTNAME property explicitly to an empty string
    json["COMMON_HOSTNAME"] = "";
    //console.log("json--json--->" + JSON.stringify(json))
    //console.log("selectedsite--->" + selectedsite)
    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    jsonObj['host'] = json;
    jsonObj['hostname'] = $('#hosts-dropdown').val();
    jsonObj['pathhost'] = $('#path-dropdown').val();
    jsonObj['ipAddress'] = $('#multi-select-ip').val();
    jsonObj['subIpAddress'] = $('#sub-multi-select-ip').val();
    jsonObj['iplist'] = [jsonObj['ipAddress']].concat(jsonObj['subIpAddress']);
    jsonObj['Email'] = $('#REUSABLE_EMAIL').val();
    jsonObj['ApplicationName'] = $('#GLOBAL_APPLICATION').val();
    jsonObj['FriendlyName'] = $('#FRNDLY_NAME').val();
    if (jsonObj['pathhost'] == "VM") {
        jsonObj['physicalIP'] = $('#PHYSICAL_IP').val();
    } else {
        jsonObj['physicalIP'] = "";
    }
    jsonObj['service'] = $('#services-dropdown').val();
    jsonObj["ilomgnt"] = ilomgmt_list;
    jsonObj["idracmgnt"] = idrac_list;
    jsonObj["nodemgmt"] = nodemgmt_list;
    jsonObj["winmgmt"] = winmgmt_list;
    jsonObj["ngnixmgmt"] = ngnixmgmt_list;
    jsonObj["sitename"] = selectedsite;
    
    //console.log("JSON----->" + JSON.stringify(jsonObj))
    //console.log("CSRF token----->", csrf_token);
    // Check if CSRF token is available
    if (!csrf_token) {
        console.error("CSRF token not found, cannot proceed.");
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", leurl + 'allonboard/Saveonboard', true);
    //xhr.open("POST", 'http://localhost:8080/allonboard/Saveonboard', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-CSRFToken', csrf_token);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //console.log("xhr.responseText---->" + xhr.responseText)
                handleFileCreationResponse(xhr.responseText);
            } else {
                console.error("Failed to save data: " + xhr.statusText);
            }
        }
    };

    var data = 'data=' + encodeURIComponent(JSON.stringify(jsonObj)) + '&csrfmiddlewaretoken=' + encodeURIComponent(csrf_token);
    xhr.send(data);

}


/*function saveModaldata() {
    var formData = $("#devicedata").serializeArray();
    var json = {};
    var hasHostTemplate = false;
    var hasIpAddress = false;
    var csrf_token = null;

    // Loop through formData to capture CSRF token and other fields
    formData.forEach(function (obj) {
        if (obj.name === "HOST_TEMPLATE") {
            hasHostTemplate = true;
        } else if (obj.name === "IP_ADDRESS") {
            hasIpAddress = true;
        } else if (obj.name === "csrfmiddlewaretoken") {
            csrf_token = obj.value; // Capture CSRF token
        }

        // Populate the JSON object
        if (json[obj.name]) {
            if (Array.isArray(json[obj.name])) {
                json[obj.name].push(obj.value);
            } else {
                json[obj.name] = [json[obj.name], obj.value];
            }
        } else {
            json[obj.name] = obj.value;
        }
    });

    // Add HOST_TEMPLATE and IP_ADDRESS if missing
    if (!hasHostTemplate) {
        json["HOST_TEMPLATE"] = $('#hosts-dropdown').val();
    }
    if (!hasIpAddress) {
        json["IP_ADDRESS"] = ($('#multi-select-ip').val()).concat($('#sub-multi-select-ip').val());
    }
    json["COMMON_HOSTNAME"] = "";

    // Create final JSON object to send
    var jsonObj = {
        isedit: isEdit,
        host: json,
        hostname: $('#hosts-dropdown').val(),
        pathhost: $('#path-dropdown').val(),
        ipAddress: $('#multi-select-ip').val(),
        subIpAddress: $('#sub-multi-select-ip').val(),
        iplist: [$('#multi-select-ip').val()].concat($('#sub-multi-select-ip').val()),
        Email: $('#REUSABLE_EMAIL').val(),
        ApplicationName: $('#GLOBAL_APPLICATION').val(),
        FriendlyName: $('#FRNDLY_NAME').val(),
        physicalIP: $('#path-dropdown').val() === "VM" ? $('#PHYSICAL_IP').val() : "",
        service: $('#services-dropdown').val(),
        ilomgnt: ilomgmt_list,
        idracmgnt: idrac_list,
        nodemgmt: nodemgmt_list,
        winmgmt: winmgmt_list,
        ngnixmgmt: ngnixmgmt_list,
    };

    console.log("CSRF token----->", csrf_token);
    console.log("JSON----->", JSON.stringify(jsonObj));

    // Check if CSRF token is available
    if (!csrf_token) {
        console.error("CSRF token not found, cannot proceed.");
        return;
    }

    // Use jQuery's ajax method to make the POST request
    $.ajax({
        url: leurl + "allonboard/Saveonboard",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(jsonObj),
        beforeSend: function (xhr) {
            // Set CSRF token header
            xhr.setRequestHeader("X-CSRFToken", csrf_token);
        },
        success: function (response) {
            console.log("Success:", response);
            handleFileCreationResponse(response);
        },
        error: function (xhr, status, error) {
            console.error("Request failed:", xhr.status, xhr.statusText);

            // Handle specific CSRF-related errors
            if (xhr.status === 403) {
                alert("CSRF validation failed. Please refresh the page and try again.");
            }
        }
    });
}*/

/*function saveModaldata() {
    var formData = $("#devicedata").serializeArray();
    var json = {};
    var hasHostTemplate = false;
    var hasIpAddress = false;

    formData.forEach(function (obj) {
        if (obj.name === "HOST_TEMPLATE") {
            hasHostTemplate = true;
        } else if (obj.name === "IP_ADDRESS") {
            hasIpAddress = true;
        }

        if (json[obj.name]) {
            if (Array.isArray(json[obj.name])) {
                json[obj.name].push(obj.value);
            } else {
                json[obj.name] = [json[obj.name], obj.value];
            }
        } else {
            json[obj.name] = obj.value;
        }
    });

    if (!hasHostTemplate) {
        json["HOST_TEMPLATE"] = $('#hosts-dropdown').val();
    }

    if (!hasIpAddress) {
        json["IP_ADDRESS"] = ($('#multi-select-ip').val()).concat($('#sub-multi-select-ip').val());
    }

    json["COMMON_HOSTNAME"] = "";

    var jsonObj = {
        "isedit": isEdit,
        'host': json,
        'hostname': $('#hosts-dropdown').val(),
        'pathhost': $('#path-dropdown').val(),
        'ipAddress': $('#multi-select-ip').val(),
        'subIpAddress': $('#sub-multi-select-ip').val(),
        'iplist': [],
        'Email': $('#REUSABLE_EMAIL').val(),
        'ApplicationName': $('#GLOBAL_APPLICATION').val(),
        'FriendlyName': $('#FRNDLY_NAME').val()
    };

    if (jsonObj['pathhost'] === "VM") {
        jsonObj['physicalIP'] = $('#PHYSICAL_IP').val();
    } else {
        jsonObj['physicalIP'] = "";
    }

    jsonObj['service'] = $('#services-dropdown').val();
    jsonObj["ilomgnt"] = ilomgmt_list;
    jsonObj["idracmgnt"] = idrac_list;
    jsonObj["nodemgmt"] = nodemgmt_list;
    jsonObj["ngnixmgmt"] = ngnixmgmt_list;

    if (jsonObj['ipAddress']) {
        jsonObj['iplist'].push(jsonObj['ipAddress']);
    }

    if (jsonObj['subIpAddress']) {
        jsonObj['iplist'] = jsonObj['iplist'].concat(jsonObj['subIpAddress']);
    }
    console.log("JSON----->" + JSON.stringify(jsonObj))
    $.ajax({
        type: "POST",
       // url: leurl + 'allonboard/Saveonboard',
        url: 'http://localhost:8080/allonboard/Saveonboard',
        data: JSON.stringify(jsonObj),
        contentType: "application/json",
        headers: {
            "X-CSRFToken": csrf_token
        },
        success: handleFileCreationResponse,
        error: function (xhr, status, error) {
            console.error("Failed to save data: " + xhr.statusText);
        }
    });
}*/

function handleFileCreationResponse(response) {
    res = JSON.parse(response);
    if (res.status == 200) {
        swal({
            title: res.data,
            type: "success",
            confirmButtonClass: "btn-success",
            confirmButtonText: "OK"
        },
            function (isConfirm) {
                if (isConfirm) {
                    parent.window.location.reload(true);
                }
            });
    } else {
        swal({
            title: res.data,
            text: ' ',
            type: "error",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK"
        },
            function (isConfirm) {
                if (isConfirm) {
                    location.reload();
                }
            });
    }
}
/*function handleFileCreationResponse(response) {
    // No need to parse the response, as it is already an object
    if (response.status === 200) {
        swal({
            title: response.data,
            type: "success",
            confirmButtonClass: "btn-success",
            confirmButtonText: "OK"
        },
            function (isConfirm) {
                if (isConfirm) {
                    parent.window.location.reload(true); // Reload the page if the user confirms
                }
            });
    } else {
        swal({
            title: response.data,
            text: ' ',
            type: "error",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK"
        },
            function (isConfirm) {
                if (isConfirm) {
                    location.reload(); // Reload the page if the user confirms
                }
            });
    }
}*/
/*function sendiloDataToServer() {
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
        jsonObj['selectilo'] = $('#CreateMgmt #multi-select-ilo').val();
        jsonObj['threshold'] = "";
        ilomgmt_list.push(jsonObj)
        swal("ilo added sucessfully", ' ', 'success')
        $('#mgmtModal #ilo_save').attr('data-dismiss', "modal");
    }
    else {
        swal("ilo Not able added", ' ', 'error')
    }
}
function sendidracDataToServer() {
    var isInputsFilled = validateingInputs('mgnt_input');
    idrac_list = [];
    if (isInputsFilled == true) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateIdrac #idrac_version').val();
        jsonObj['username'] = "";
        jsonObj['password'] = "";
        jsonObj['iloip'] = "";
        jsonObj['port'] = $('#CreateIdrac #port_ips').val();
        jsonObj['selectilo'] = $('#CreateIdrac #multi-select-idrac').val();
        jsonObj['threshold'] = "";
        idrac_list.push(jsonObj)
        swal("idrac added sucessfully", ' ', 'success')
        $('#idracModal #idrac_save').attr('data-dismiss', "modal");
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
        jsonObj['selectilo'] = $('#CreateNode #multi-select-node').val();
        jsonObj['threshold'] = values;
        nodemgmt_list.push(jsonObj)
        swal("NodeExpo added sucessfully", ' ', 'success')
        $('#nodeModal #node_save').attr('data-dismiss', "modal");
    }
    else {
        swal("NodeExpo Not able added", ' ', 'error')
    }
}*/

/* ============ COUNT ON SWITCH, SERVER, FIREWALL ============== */
/*function tablenewonb() {
    requestDataFromServer('newonbtable', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        newonbs = JSON.parse(response);
        var hostCounts = calculateHostCounts(newonbs.data);
        updateElementText('totalswitch', hostCounts.switches);
        updateElementText('totalServers', hostCounts.servers);
        updateElementText('totalFirewall', hostCounts.firewalls);
        updateElementText('totalRoters', hostCounts.routers);
    });
}*/
function tablenewonb() {
   // console.log("tablenewonb--->"+leurl)
    var xhr = new XMLHttpRequest();
    var url = leurl + 'allonboard/newonbtable';
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var newonbs = JSON.parse(xhr.responseText);
            var hostCounts = calculateHostCounts(newonbs.data);
            updateElementText('totalswitch', hostCounts.switches);
            updateElementText('totalServers', hostCounts.servers);
            updateElementText('totalFirewall', hostCounts.firewalls);
            updateElementText('totalRoters', hostCounts.routers);
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Request failed');
    };

    xhr.send();
}
function calculateHostCounts(hostData) {
   // console.log("calculateHostCounts--->" + JSON.stringify(hostData))
    var hostCounts = {switches: 0,servers: 0,firewalls: 0, routers: 0};
    hostData.forEach(function (obj) {
        registeredIPAddress.push(obj.ipaddress);
        switch (obj.pathhost) {
            case 'Physical':
                physicalser++;
                hostCounts.servers++;
                break;
            case 'VM':
                virtualser++;
                hostCounts.servers++;
                break;
            case 'Public Switch':
                publicswitch++;
                hostCounts.switches++;
                break;
            case 'Gateway Switch':
                gatewayswitch++;
                hostCounts.switches++;
                break;
            case 'Exchange Switch':
                exchangeswitch++;
                hostCounts.switches++;
                break;
            case 'Fortigate 50E':
                fortigate50E++;
                hostCounts.firewalls++;
                break;
            case 'Fortigate 60E':
                fortigate60E++;
                hostCounts.firewalls++;
                break;
            case 'Fortigate 60F':
                fortigate60F++;
                hostCounts.firewalls++;
                break;
            case 'Fortigate 70F':
                fortigate70F++;
                hostCounts.firewalls++;
                break;
            case 'Fortigate 80F':
                fortigate80F++;
                hostCounts.firewalls++;
                break;
            case 'Fortigate 100E':
                fortigate100E++;
                hostCounts.firewalls++;
                break;
            case 'Fortigate 100F':
                fortigate100F++;
                hostCounts.firewalls++;
                break;
            case 'Fortigate 120G':
                fortigate120G++;
                hostCounts.firewalls++;
                break;
            case 'Fortigate 200F':
                fortigate200F++;
                hostCounts.firewalls++;
                break;
            case 'router 4321':
                router4321++;
                hostCounts.routers++;
                break;
        }
    });
    return hostCounts;
}
function updateElementText(elementId, value) {
    var element = document.getElementById(elementId);
    if (value !== "") {
        element.textContent = value;
    } else {
        element.textContent = 0;
    }
}
/* ============ COUNT ON SWITCH, SERVER, FIREWALL ============== */
/*---------------- ADD ON DATA HTML FUNCTION ----------------*/
function mgmttype(select) {
    $("#mgmnttype").empty();
    var mgmthtml = '';
    if (select == "ilo") {
        mgmthtml += '<div class="col-12 mt-3">';
        mgmthtml += '<label for="multi-select-ilo" id="multiselect-label">Select IP Address</label>';
        mgmthtml += '<div class="select-service" id="ilo-multipleIPAddressSelect">';
        mgmthtml += '<select class="input-select multiple-select custom-select select-input multi-select-input w-100" name="ILO_IPADDRESS" multiple="multiple" id="multi-select-ilo">';
        mgmthtml += '</select>';
        mgmthtml += '</div>';
        mgmthtml += '<span class="error-msg" id="server-ip-error-msg" style="color:#ff9eac"> </span>';
        mgmthtml += '</div>';
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
        //mgmthtml += '<button type="button" class="btn btn-outline-secondary w-100" id="ilo_save" onclick="sendiloDataToServer()">Add</button>';
        mgmthtml += '</div>';
        mgmthtml += '<div class="" id="valid_row"></div>';
        mgmthtml += '</div>';
    }
    $("#mgmnttype").append(mgmthtml);
    iloipaddr();
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
/* Verify the ILO data */
function validatesInputs(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    const fields = [
        { id: 'user_name', label: 'username-label', errorMsg: 'username-error-msg', value: 'Enter User Name' },
        { id: 'pass_word', label: 'password-label', errorMsg: 'password-error-msg', value: 'Enter PassWord' },
        { id: 'ilo_ip', label: 'ilo-label', errorMsg: 'ilo-error-msg', value: 'Enter ILO IP' },
        { id: 'multi-select-ilo', label: 'multiselect-label', errorMsg: 'server-ip-error-msg', value: '' },
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
function sendiloDataToServer() {
   // var isInputsFilled = validatesInputs('mgnt_input');
    ilomgmt_list = [];
    //if (isInputsFilled == true) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateMgmt #mgmts_version').val();
        jsonObj['username'] = $('#CreateMgmt #user_name').val();
        jsonObj['password'] = $('#CreateMgmt #pass_word').val();
        jsonObj['iloip'] = $('#CreateMgmt #ilo_ip').val();
        jsonObj['port'] = "";
        jsonObj['selectilo'] = $('#CreateMgmt #multi-select-ilo').val();
        jsonObj['threshold'] = "";
        ilomgmt_list.push(jsonObj)
        swal("ilo added sucessfully", ' ', 'success')
        $('#mgmtModal #ilo_save').attr('data-dismiss', "modal");
   // }
   // else {
   //     swal("ilo Not able added", ' ', 'error')
   // }
}
function verifyiloServer() {
     //console.log("validationip-ilo-->" + validationip)
    var isInputsFilled = validatesInputs('mgnt_input');
    var selectedIloValues = $('#CreateMgmt #multi-select-ilo').val(); // Get selected values from the multi-select dropdown

    if (isInputsFilled == true && selectedIloValues && selectedIloValues.length > 0) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateMgmt #mgmts_version').val();
        jsonObj['username'] = $('#CreateMgmt #user_name').val();
        jsonObj['password'] = $('#CreateMgmt #pass_word').val();
        jsonObj['iloip'] = $('#CreateMgmt #ilo_ip').val();
        jsonObj['ip'] = validationip;
        jsonObj['selectilo'] = selectedIloValues; // Use selected values
        ilomgmt_list.push(jsonObj);

        requestDataFromServer('/allonboard/ilovalidation', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csrf_token }, "POST").done(ilovalidResponse);
    }
    else {
        swal("Please fill all required fields and select at least one IP address.", ' ', 'error')
    }
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
/* END Verify the ILO data */
function idractype(select) {
    $("#idractype").empty();
    var mgmthtml = '';
    if (select == "idrac") {
        mgmthtml += '<div class="col-12 mt-3">';
        mgmthtml += '<label for="multi-select-idrac" id="multiselect-label">Select IP Address</label>';
        mgmthtml += '<div class="select-service" id="idrac-multipleIPAddressSelect">';
        mgmthtml += '<select class="input-select multiple-select custom-select select-input multi-select-input w-100" name="IDRAC_IPADDRESS" multiple="multiple" id="multi-select-idrac">';
        mgmthtml += '</select>';
        mgmthtml += '</div>';
        mgmthtml += '<span class="error-msg" id="server-ip-error-msg" style="color:#ff9eac"> </span>';
        mgmthtml += '</div>';
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
    $("#idractype").append(mgmthtml);
    idracipaddr()
}
/* Verify the IDRAC data */
function validateingInputs(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    const fields = [
        { id: 'port_ips', label: 'port-label', errorMsg: 'idrac-error-msg', value: 'Enter IDRAC Port' },
        { id: 'multi-select-idrac', label: 'multiselect-label', errorMsg: 'server-ip-error-msg', value: '' },
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
function sendidracDataToServer() {
   // var isInputsFilled = validateingInputs('mgnt_input');
    idrac_list = [];
  //  if (isInputsFilled == true) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateIdrac #idrac_version').val();
        jsonObj['username'] = "";
        jsonObj['password'] = "";
        jsonObj['iloip'] = "";
        jsonObj['port'] = $('#CreateIdrac #port_ips').val();
        jsonObj['selectilo'] = $('#CreateIdrac #multi-select-idrac').val();
        jsonObj['threshold'] = "";
        idrac_list.push(jsonObj)
        swal("idrac added sucessfully", ' ', 'success')
        $('#idracModal #idrac_save').attr('data-dismiss', "modal");
    /*}
    else {
        swal("idrac Not able added", ' ', 'error')
    }*/
}
function verifiedidracServer() {
    // console.log("validationip-idrac-->" + validationip)
    var isInputsFilled = validateingInputs('mgnt_input');
    var selectedIdracValues = $('#CreateIdrac #multi-select-idrac').val(); // Get selected values from the multi-select dropdown
    if (isInputsFilled == true && selectedIdracValues && selectedIdracValues.length > 0) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateIdrac #idrac_version').val();
        jsonObj['ip'] = validationip;
        jsonObj['port'] = $('#CreateIdrac #port_ips').val();
        jsonObj['selectilo'] = selectedIdracValues; // Use selected values
        //console.log("verifiedidracServer---------->" + JSON.stringify(jsonObj))
        idrac_list.push(jsonObj)
        requestDataFromServer('/allonboard/idracvalidation', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csrf_token }, "POST").done(idracvalidResponse);
    } else {
        swal("Please fill all required fields and select at least one IP address.", ' ', 'error')
    }
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
/* END Verify the IDRAC data */
var labelNames = ["disk_w", "disk_c", "disk_t", "cpu_w", "cpu_c", "cpu_t", "mem_w", "mem_c", "mem_t", "load_w", "load_c", "load_t", "uptime_w", "uptime_c", "uptime_t", "login_w", "login_c", "login_t"];
var defaultValues = [65, 70, 600, 65, 70, 10, 65, 70, 10, 0.6, 0.8, 10, 120, 150, 72000, 2, 5, 10];
function nodetype(select) {
    $("#nodetype").empty();
    var nodehtml = '';
    if (select == "Node Expo") {
        nodehtml += '<div class="col-12 mt-3">';
        nodehtml += '<label for="multi-select-node" id="multiselect-label">Select IP Address</label>';
        nodehtml += '<div class="select-service" id="node-multipleIPAddressSelect">';
        nodehtml += '<select class="input-select multiple-select custom-select select-input multi-select-input w-100" name="NODE_IPADDRESS" multiple="multiple" id="multi-select-node">';
        nodehtml += '</select>';
        nodehtml += '</div>';
        nodehtml += '<span class="error-msg" id="server-ip-error-msg" style="color:#ff9eac"> </span>';
        nodehtml += '</div>';
        nodehtml += '<div class="col-12 my-2">'
        nodehtml += '<label for="port_node" id="port-node-label">Node Port</label>'
        nodehtml += '<input type="number" class="form-control node_input full-input" style="background-color:transparent;" placeholder="Enter Node Port" value="9100" required="" id="port_nodes" autocomplete="off">'
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
    nodeipaddr()
}
/* Verify the Node Expo data */
function verifynodeServer() {
    var isInputsFilled = validateInputing('node_input');
    var selectedNodeValues = $('#CreateNode #multi-select-node').val(); // Get selected values from the multi-select dropdown
    // console.log("validationip-node-->" + validationip)
    if (isInputsFilled == true && selectedNodeValues && selectedNodeValues.length > 0) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateNode #node_version').val();
        jsonObj['ip'] = validationip;
        jsonObj['port'] = $('#CreateNode #port_nodes').val();
        jsonObj['selectilo'] = selectedNodeValues;
        nodemgmt_list.push(jsonObj)
        // console.log("------------->" + JSON.stringify(jsonObj))
        requestDataFromServer('/allonboard/nodeexpvalidation', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csrf_token }, "POST").done(nodevalidResponse);
    } else {
        swal("Please fill all required fields and select at least one IP address.", ' ', 'error')
    }
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
function sendnodeDataToServer() {
   // var isInputsFilled = validateInputing('node_input');
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
  //  if (isInputsFilled == true) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateNode #node_version').val();
        jsonObj['username'] = "";
        jsonObj['password'] = "";
        jsonObj['iloip'] = "";
        jsonObj['port'] = $('#CreateNode #port_nodes').val();
        jsonObj['selectilo'] = $('#CreateNode #multi-select-node').val();
        jsonObj['threshold'] = values;
        nodemgmt_list.push(jsonObj)
      //  console.log("node mgmt-->" + JSON.stringify(jsonObj))
        swal("NodeExpo added sucessfully", ' ', 'success')
        $('#nodeModal #node_save').attr('data-dismiss', "modal");
   /* }
    else {
        swal("NodeExpo Not able added", ' ', 'error')
    }*/
}
/* END Verify the Node Expo data */
/*--------------- Nginx data start ------------------ */

function nginxtype(select) {
    $("#nginxtype").empty();
    var nginxhtml = '';
    if (select == "Nginx Expo") {
        nginxhtml += '<div class="col-12 mt-3">';
        nginxhtml += '<label for="multi-select-nginx" id="multiselect-label">Select IP Address</label>';
        nginxhtml += '<div class="select-service" id="ngnix-multipleIPAddressSelect">';
        nginxhtml += '<select class="input-select multiple-select custom-select select-input multi-select-input w-100" name="NGINX_IPADDRESS" multiple="multiple" id="multi-select-nginx">';
        nginxhtml += '</select>';
        nginxhtml += '</div>';
        nginxhtml += '<span class="error-msg" id="server-ip-error-msg" style="color:#ff9eac"> </span>';
        nginxhtml += '</div>';
        nginxhtml += '<div class="col-12 my-2">'
        nginxhtml += '<label for="port_ip" id="port_nginx-label">NGINX Port</label>'
        nginxhtml += '<input type="number" class="form-control nginx_input full-input" style="background-color:transparent;" placeholder="Enter NGINX Port" value="30164" required="" id="port_nginx" autocomplete="off">'
        nginxhtml += '<span class="error-msg" id="nginx-error-msg"> </span>';
        nginxhtml += '</div>';
        nginxhtml += '<br>';
        nginxhtml += '<div class="modal-footer mx-auto col-md-11 col-12">';
        nginxhtml += '<div class="col-5 px-1">';
        nginxhtml += '<button type="button" class="btn btn-outline-secondary cancel-btn w-100" data-dismiss="modal">Cancel</button>';
        nginxhtml += '</div>';
        nginxhtml += '<div class="col-5 px-1">';
        nginxhtml += '<button type="button" class="btn btn-outline-secondary w-100" id="ngnix_save" onclick="verifiednginxServer()">Verify</button>';
        //nginxhtml += '<button type="button" class="btn btn-outline-secondary w-100" id="ngnix_save" onclick="sendnginxDataToServer()">Add</button>';
        nginxhtml += '</div>';
        nginxhtml += '<div class="" id="validate_row"></div>';
        nginxhtml += '</div>';
    }
    $("#nginxtype").append(nginxhtml);
    nginxipaddr()
}

function verifiednginxServer() {
    var isInputsFilled = validatedInput('nginx_input');
    var selectedNodeValues = $('#CreateNginx #multi-select-nginx').val(); // Get selected values from the multi-select dropdown
    if (isInputsFilled == true && selectedNodeValues && selectedNodeValues.length > 0) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateNginx #nginx_version').val();
        jsonObj['ip'] = validationip;
        jsonObj['port'] = $('#CreateNginx #port_nginx').val();
        jsonObj['selectilo'] = selectedNodeValues;
        ngnixmgmt_list.push(jsonObj)
        requestDataFromServer('/allonboard/ngnixexpvalidation', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csrf_token }, "POST").done(ngnixvalidResponse);
    } else {
        swal("Please fill all required fields and select at least one IP address.", ' ', 'error')
    }
}
function ngnixvalidResponse(response) {
    res = JSON.parse(response)
    $("#validate_row").empty();
    $(".loader").hide();
    if (res.result == true) {
        const btn = document.getElementById('ngnix_save');
        btn.setAttribute('onclick', 'sendnginxDataToServer()');
        btn.innerText = 'Add';
        var validHtml = '<p class="text-center size12" style="color:#00ff00;">Success in Validation...</p>';
        $("#validate_row").append(validHtml);
        setTimeout(function () {
            $("#validate_row").empty();
        }, 3000);
        $('#nginx_version').prop('disabled', true);
        $('#port_nginx').prop('disabled', true);
    }
    else if (res.result == false) {
        var validHtml = '<p class="text-center size12" style="color:#ff0000;">Failure in Validation...</p>';
        $("#validate_row").append(validHtml);
        // Hide the validHtml after 3 seconds
        setTimeout(function () {
            $("#validate_row").empty();
        }, 3000);
    }
}
function validatedInput(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    const fields = [
        { id: 'port_nginx', label: 'port_nginx-label', errorMsg: 'nginx-error-msg', value: 'Enter NGINX Port' },
        { id: 'multi-select-nginx', label: 'multiselect-label', errorMsg: 'server-ip-error-msg', value: '' },
    ];
    let hasErrors = false;
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const el = document.getElementById(field.id);
        const errorMsgEl = document.getElementById(field.errorMsg);
        if (!el) {
            console.error(`Element with ID ${field.id} not found.`);
            continue;
        }
        if (!errorMsgEl) {
            console.error(`Error message element with ID ${field.errorMsg} not found.`);
            continue;
        }
        if (el.value === field.value) {
            errorMsgEl.textContent = 'Field cannot be empty';
            hasErrors = true;
        } else {
            errorMsgEl.textContent = '';
        }
    }

    return isInputFilled && !hasErrors;
}

/*function validatedInput(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    const fields = [
        { id: 'port_nginx', label: 'port_nginx-label', errorMsg: 'nginx-error-msg', value: 'Enter NGINX Port' },
        { id: 'multi-select-nginx', label: 'multiselect-label', errorMsg: 'server-ip-error-msg', value: '' },
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
}*/
function sendnginxDataToServer() {
    ngnixmgmt_list = [];
    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    jsonObj['prototype'] = $('#CreateNginx #nginx_version').val();
    jsonObj['username'] = "";
    jsonObj['password'] = "";
    jsonObj['iloip'] = "";
    jsonObj['port'] = $('#CreateNginx #port_nginx').val();
    jsonObj['selectilo'] = $('#CreateNginx #multi-select-nginx').val();
    jsonObj['threshold'] = "";
    ngnixmgmt_list.push(jsonObj)
    swal("NgnixExpo added sucessfully", ' ', 'success')
    $('#nginxModal #ngnix_save').attr('data-dismiss', "modal");
}
/*--------------- Nginx data End ------------------ */
/*--------------- Window Expo START --------------- */
var wlabelNames = ["disk_w", "disk_c", "disk_t", "cpu_w", "cpu_c", "cpu_t", "mem_w", "mem_c", "mem_t", "load_w", "load_c", "load_t", "uptime_w", "uptime_c", "uptime_t", "login_w", "login_c", "login_t"];
var wdefaultValues = [70, 75, 600, 70, 80, 10, 70, 80, 10, 0.6, 0.8, 10, 90, 120, 72000, 2, 5, 10];
function windowtype(select) {
  //  console.log("windowtype------->")
    $("#windowtype").empty();
    var winhtml = '';
    if (select == "Window Expo") {
        winhtml += '<div class="col-12 mt-3">';
        winhtml += '<label for="multi-select-win" id="multiselect-label">Select IP Address</label>';
        winhtml += '<div class="select-service" id="win-multipleIPAddressSelect">';
        winhtml += '<select class="input-select multiple-select custom-select select-input multi-select-input w-100" name="WINDOWS_IPADDRESS" multiple="multiple" id="multi-select-win">';
        winhtml += '</select>';
        winhtml += '</div>';
        winhtml += '<span class="error-msg" id="server-ip-error-msg" style="color:#ff9eac"> </span>';
        winhtml += '</div>';
        winhtml += '<div class="col-12 my-2">'
        winhtml += '<label for="win_node" id="port-win-label">Windows Port</label>'
        winhtml += '<input type="number" class="form-control win_input full-input" style="background-color:transparent;" placeholder="Enter windows Port" value="9182" required="" id="port_windows" autocomplete="off">'
        winhtml += '<span class="error-msg" id="win-error-msg"> </span>';
        winhtml += '</div>';
        winhtml += '<div class="row">';
        winhtml += '<div class="col-4">';
        winhtml += '<input type="checkbox" id="wthreshold" name="wthreshold' + select + '" value="wthreshold" onchange="wtoggleTextFields(this)">';
        winhtml += '<label for="wthreshold"> Threshold</label>';
        winhtml += '</div>';
        winhtml += '<div class="col-1">';
        winhtml += '<i class="mdi mdi-reload io-con" id="wthreshold-icon" onclick="wresetInputValues()" style="color:#e99123;display:none;"></i>';
        winhtml += '</div>';
        winhtml += '<div class="col-6">';
        winhtml += '<table class="table" id="wtable-fields" style="display:none;">';
        winhtml += '<tr class="small-row">';
        winhtml += '<th></th>';
        winhtml += '<th>Abbreviation</th>';
        winhtml += '<th>Units</th>';
        winhtml += '</tr>';
        winhtml += '<tr class="small-row">';
        winhtml += '<td>w</td>';
        winhtml += '<td>Warning</td>';
        winhtml += '<td>num</td>';
        winhtml += '</tr>';
        winhtml += '<tr class="small-row">';
        winhtml += '<td>c</td>';
        winhtml += '<td>Critical</td>';
        winhtml += '<td>num</td>';
        winhtml += '</tr>';
        winhtml += '<tr class="small-row">';
        winhtml += '<td>t</td>';
        winhtml += '<td>Time</td>';
        winhtml += '<td>sec</td>';
        winhtml += '</tr>';
        winhtml += '</table>';
        winhtml += '</div>';
        winhtml += '</div>';
        winhtml += '<div id="wthreshold-fields" style="display:none;">';
        for (var i = 0; i < wlabelNames.length; i++) {
            winhtml += '<div class="row">';
            winhtml += '<div class="col-1"></div>';
            winhtml += '<div class="col-4">';
            winhtml += '<label for="' + wlabelNames[i] + '">' + wlabelNames[i] + '</label>';
            winhtml += '</div>';
            winhtml += '<div class="col-5">';
            winhtml += '<input type="number" step="any" class="form-control" id="' + wlabelNames[i] + '" value="' + wdefaultValues[i] + '">';
            winhtml += '</div>';
            winhtml += '<div class="col-2"></div>';
            winhtml += '</div>';
        }
        winhtml += '</div>';
        winhtml += '<br>';
        winhtml += '<div class="modal-footer mx-auto col-md-11 col-12">';
        winhtml += '<div class="col-5 px-1">';
        winhtml += '<button type="button" class="btn btn-outline-secondary cancel-btn w-100" data-dismiss="modal">Cancel</button>';
        winhtml += '</div>';
        winhtml += '<div class="col-5 px-1">';
        winhtml += '<button type="button" class="btn btn-outline-secondary w-100" id="win_save" onclick="verifywinServer()">Verify</button>';
        //winhtml += '<button type="button" class="btn btn-outline-secondary w-100" id="win_save" onclick="sendwinDataToServer()">Add</button>';
        winhtml += '</div>';
        winhtml += '<div class="" id="valided_rows"></div>';
        winhtml += '</div>';
    }
    $("#windowtype").append(winhtml);
    winipaddr()
}

function wresetInputValues() {
    var wthresholdCheckbox = document.getElementById("wthreshold");
    var wthresholdFields = document.getElementById("wthreshold-fields");
    var wthresholdInputs = wthresholdFields.getElementsByClassName("form-control");
    if (wthresholdCheckbox.checked) {
        for (var i = 0; i < wthresholdInputs.length; i++) {
            wthresholdInputs[i].value = defaultValues[i];
        }
    } else {
        for (var i = 0; i < wthresholdInputs.length; i++) {
            wthresholdInputs[i].value = "";
        }
    }
}
function wtoggleTextFields(checkbox) {
    //console.log("wtoggleTextFields---->")
    var wthresholdFields = document.getElementById("wthreshold-fields");
    var wtable = document.getElementById("wtable-fields");
    var wtr_icon = document.getElementById("wthreshold-icon");

    if (checkbox.checked) {
        wthresholdFields.style.display = "block";
        wtable.style.display = "table";
        wtr_icon.style.display = "block";
    } else {
        wthresholdFields.style.display = "none";
        wtable.style.display = "none";
        wtr_icon.style.display = "none";
    }
}
function verifywinServer() {
    var isInputsFilled = validatewinInputing('win_input');
    var selectedWinValues = $('#CreateWindow #multi-select-win').val(); // Get selected values from the multi-select dropdown
    // console.log("validationip-node-->" + validationip)
    if (isInputsFilled == true && selectedWinValues && selectedWinValues.length > 0) {
        var jsonObj = {};
        jsonObj["isedit"] = isEdit;
        jsonObj['prototype'] = $('#CreateWindow #window_version').val();
        jsonObj['ip'] = validationip;
        jsonObj['port'] = $('#CreateWindow #port_windows').val();
        jsonObj['selectilo'] = selectedWinValues;
        winmgmt_list.push(jsonObj)
        // console.log("------------->" + JSON.stringify(jsonObj))
        requestDataFromServer('/allonboard/winexpvalidation', { 'data': JSON.stringify(jsonObj), csrfmiddlewaretoken: csrf_token }, "POST").done(winvalidResponse);
    } else {
        swal("Please fill all required fields and select at least one IP address.", ' ', 'error')
    }
}
function winvalidResponse(response) {
    // console.log("idracvalidResponse--->" + response)
    res = JSON.parse(response)
    $("#valided_rows").empty();
    // console.log("idracvalidResponse--->" + res.result)
    $(".loader").hide();
    if (res.result == true) {
        const btn = document.getElementById('win_save');
        btn.setAttribute('onclick', 'sendwinDataToServer()');
        btn.innerText = 'Add';
        var validHtml = '<p class="text-center size12" style="color:#00ff00;">Success in Validation...</p>';
        $("#valided_rows").append(validHtml);
        setTimeout(function () {
            $("#valided_rows").empty();
        }, 3000);
        $('#window_version').prop('disabled', true);
        $('#port_windows').prop('disabled', true);
    }
    else if (res.result == false) {
        // swal(res.data, ' ', "error");
        // $("#win_save").prop("disabled", true);
        var validHtml = '<p class="text-center size12" style="color:#ff0000;">Failure in Validation...</p>';
        $("#valided_rows").append(validHtml);
        // Hide the validHtml after 3 seconds
        setTimeout(function () {
            $("#valided_rows").empty();
        }, 3000);
    }
}
function sendwinDataToServer() {
    // var isInputsFilled = validateInputing('node_input');
    winmgmt_list = [];
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
    //  if (isInputsFilled == true) {
    var jsonObj = {};
    jsonObj["isedit"] = isEdit;
    jsonObj['prototype'] = $('#CreateWindow #window_version').val();
    jsonObj['username'] = "";
    jsonObj['password'] = "";
    jsonObj['iloip'] = "";
    jsonObj['port'] = $('#CreateWindow #port_windows').val();
    jsonObj['selectilo'] = $('#CreateWindow #multi-select-win').val();
    jsonObj['threshold'] = values;
    winmgmt_list.push(jsonObj)
    //  console.log("node mgmt-->" + JSON.stringify(jsonObj))
    swal("WindowsExpo added sucessfully", ' ', 'success')
    $('#windowModal #win_save').attr('data-dismiss', "modal");
    /* }
     else {
         swal("NodeExpo Not able added", ' ', 'error')
     }*/
}
function validatewinInputing(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    const fields = [
        { id: 'port_windows', label: 'port-win-label', errorMsg: 'win-error-msg', value: 'Enter windows Port' },
        { id: 'multi-select-win', label: 'multiselect-label', errorMsg: 'server-ip-error-msg', value: '' },
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
/*--------------- Window Expo END --------------- */

/* Verify the validation data */
function validateInputing(className) {
    var isInputFilled = checkAllfeildsfilled(className)
    const fields = [
        { id: 'port_nodes', label: 'port-node-label', errorMsg: 'Node-error-msg', value: 'Enter Node Port' },
        { id: 'multi-select-node', label: 'multiselect-label', errorMsg: 'server-ip-error-msg', value: '' },
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
/* END Verify the validation data */
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
    //console.log("mgmnt---->")
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
/*---------------- ADD ON DATA HTML FUNCTION END ------------*/
// Assuming you have a button with ID "myButton"
$("#checkButton").on("click", function () {
    // Toggle the checkbox status
    $(".card-checkbox").prop("checked", function (index, currentStatus) {
        return !currentStatus;
    });
    // Close the dropdown
    $("#icons-mores").dropdown("toggle");
});

function displaynewonb() {
    var xhr = new XMLHttpRequest();
    var url = leurl + 'allonboard/newonbtable';
    var method = "GET";
    var data = { csrfmiddlewaretoken: csrf_token };

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var displayonb = JSON.parse(xhr.responseText);

            if (displayonb) {
                // Show the element with ID "#nohost"
                $("#nohost").hide();
            } else {
                // Hide the element with ID "#nohost"
                $("#nohost").show();
            }

            var objid = '';
            var selecthost = '';

            displayonb.data.forEach(function (obj) {
                var html = '';
                //console.log("displayonb---->" + JSON.stringify(displayonb))
                var snmpXhr = new XMLHttpRequest();
                snmpXhr.open("GET", leurl + '/dashboard/snmpnewtable', true);
                snmpXhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

                snmpXhr.onload = function () {
                    if (snmpXhr.status >= 200 && snmpXhr.status < 300) {
                        var snmpResponse = JSON.parse(snmpXhr.responseText);
                        const snmptable = snmpResponse.data || [];
                        const v2cipaddrArr = [], v3cipaddrArr = [];
                        const vcid = [], v3cid = [];

                        for (const snmpObj of snmptable) {
                            if (snmpObj.version === 'v2c') {
                                vcid.push(snmpObj.id);
                                v2cpro = snmpObj.version;
                                v2cipaddrArr.push(snmpObj.ipaddress);
                            }
                            if (snmpObj.version === 'v3') {
                                v3cid.push(snmpObj.id);
                                v3cpro = snmpObj.version;
                                v3cipaddrArr.push(snmpObj.ipaddress);
                            }
                        }

                        var mgmtXhr = new XMLHttpRequest();
                        mgmtXhr.open("GET", leurl + 'allonboard/getmgmntdata?ipaddress=' + obj.ipaddress, true);
                        mgmtXhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

                        mgmtXhr.onload = function () {
                            if (mgmtXhr.status >= 200 && mgmtXhr.status < 300) {
                                var mgmtResponse = JSON.parse(mgmtXhr.responseText);
                                const mgmtres = mgmtResponse.data || [];
                                const iloipaddrArr = [], idracipaddrArr = [], nodeipaddrArr = [], nginxipaddrArr = [], windowipaddrArr = [];

                                for (const mgmtObj of mgmtres) {
                                    if (mgmtObj.prototype === 'ilo') {
                                        mgmtilo = mgmtObj.prototype;
                                        iloipaddrArr.push(mgmtObj.ipaddress);
                                    }
                                    if (mgmtObj.prototype === 'idrac') {
                                        mgmtidrac = mgmtObj.prototype;
                                        idracipaddrArr.push(mgmtObj.ipaddress);
                                    }
                                    if (mgmtObj.prototype === 'Node Expo') {
                                        mgmtnodeexp = mgmtObj.prototype;
                                        nodeipaddrArr.push(mgmtObj.ipaddress);
                                    }
                                    if (mgmtObj.prototype === 'Nginx Expo') {
                                        mgmtnginxexp = mgmtObj.prototype;
                                        nginxipaddrArr.push(mgmtObj.ipaddress);
                                    }
                                    if (mgmtObj.prototype === 'Window Expo') {
                                        mgmtwindowexp = mgmtObj.prototype;
                                        windowipaddrArr.push(mgmtObj.ipaddress);
                                    }
                                }

                                if (obj.pathhost === "Physical" || obj.pathhost === "VM") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-0-->" + selecthost);
                                } else if (obj.pathhost === "Gateway Switch") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-11-->" + selecthost);
                                } else if (obj.pathhost === "Public Switch") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-21-->" + selecthost);
                                } else if (obj.pathhost === "Exchange Switch") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-31-->" + selecthost);
                                } else if (obj.pathhost === "Fortigate 50E") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-41-->" + selecthost);
                                } else if (obj.pathhost === "Fortigate 60E") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-51-->" + selecthost);
                                } else if (obj.pathhost === "Fortigate 60F") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-61-->" + selecthost);
                                } else if (obj.pathhost === "Fortigate 70F") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-71-->" + selecthost);
                                } else if (obj.pathhost === "Fortigate 80F") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-81-->" + selecthost);
                                } else if (obj.pathhost === "Fortigate 100E") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-91-->" + selecthost);
                                } else if (obj.pathhost === "Fortigate 100F") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-01-->" + selecthost);
                                } else if (obj.pathhost === "Fortigate 120G") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-01-->" + selecthost);
                                } else if (obj.pathhost === "Fortigate 200F") {
                                    selecthost = obj.selecthost.split('-')[0];
                                    // console.log("if-01-->" + selecthost);
                                } else if (obj.pathhost === "router 4321") {
                                    selecthost = obj.selecthost.split('.')[0];
                                    // console.log("if-01-->" + selecthost);
                                }

                                html += '<fieldset class="card onboards border-changeable" id="s' + ((obj.ipaddress).replaceAll('.', '_')) + '" data-name="s' + ((obj.mainipaddress).replaceAll('.', '_')) + '" style="margin-bottom:0;border: 1px solid #fff; width:330px !important;margin-left:0%">'
                                html += '<legend>'
                                html += '<div class="row">'
                                html += '<div class="col-7" style="margin-top:2%;margin-left:2%;">'
                                html += '<p class="bold-text mb-0 text-color" style="font-size: 12px;"> ' + obj.ipaddress + '(' + obj.pathhost + ')</p>'
                                html += '</div>'
                                html += '<div class="col-4" style="margin-left:2%;">'
                                html += '<input type="checkbox" class="card-checkbox" data-ipaddress="' + obj.ipaddress + '" data-subipaddress="' + obj.subipaddress + '" data-hostname="' + obj.hostname + '">';
                                html += '<i class="mdi mdi-download io-con" id="download-exe" onclick="exportone(this)" data-ipaddress-name="' + obj.ipaddress + '" data-hosts-name="' + obj.pathhost + '" style="color:white;font-size: 20px; padding-left:5% !important;"></i>';
                                html += '<i class="mdi mdi-pen io-con" id="edit-onb" onclick="editHost(this)" data-ipaddress="' + obj.ipaddress + '"style="color:white;font-size: 20px; padding-left:7% !important;"></i>';
                                html += '<i class="mdi mdi-close io-con" id="del-onb" onclick="hostCloseClick(this)" data-host-ip="' + obj.ipaddress + '" data-host-name="' + obj.hostname + '" data-sub-name="' + obj.subipaddress + '" style="color:white;font-size: 20px; padding-left: 7% !important;"></i>';
                                html += '</div>'
                                html += '</div>'
                                html += '</legend>'
                                html += '<div class="row">'
                                html += '<div class="col-12" style="display:flex;margin-top:-3% !important;margin-left:3% !important;">'
                                html += '<div class="col-10">'
                                html += '<p class="mb-0 text-color" style="font-size:12px;"><b>Name :</b> ' + obj.textname + '</p>';
                                html += '<p class="mb-0 text-color" style="font-size:12px;"><b>Device Type :</b> ' + selecthost + '</p>';
                                html += '<p class="mb-0 text-color" style="font-size:12px;"><b>E-Mail :</b> ' + obj.emailid + '</p>';
                                html += '<p class="mb-0 text-color" style="font-size:12px;"><b>Application :</b> ' + obj.servertype + '</p>';
                                //html += '<p class="mb-0 text-color" style="font-size:12px;"><b>Server Type :</b> ' + ((obj.selecthost).replaceAll('.yaml', '')) + '</p>';
                                /*if (obj.pathhost === "Physical" || obj.pathhost === "VM") {
                                    html += '<p class="mb-0 text-color" style="font-size:12px;"><b>Main-IP :</b><span style="color:#e99123"> ' + obj.mainipaddress + '</span></p>';
                                }*/
                                html += '</div>'
                                html += '<div class="col-2">'
                                /*if (obj.automation == 'No') {
                                    html += '<p class="bold-text tooltip mb-0 text-color "><img class="imageing" src="/static/images/robot-icon-1.png" style="width: 22px !important; float:left;margin-left: 7px;"/><span class="tooltiptext">Automation Not Enabled</span></p>';
                                }
                                else {
                                    html += '<p class="bold-text tooltip mb-0 text-color "><img class="imaged" src="/static/images/robot-icon-1.png" style="width: 22px !important; float:left;margin-left: 7px;"/><span class="tooltiptext">Automation Enabled</span></p>';
                                }*/
                                var v2cpro = 'v2c';
                                var v3cpro = 'v3';
                                [v2cipaddrArr, v3cipaddrArr].forEach(function (ipaddrArr) {
                                    ipaddrArr.forEach(function (ipaddr, index) {
                                        var vpro = (ipaddrArr === v2cipaddrArr) ? v2cpro : v3cpro;
                                        var vcidVal = (ipaddrArr === v2cipaddrArr) ? vcid[index] : v3cid[index];
                                        // console.log("ipaddr---->" + ipaddr)
                                        if (ipaddr === obj.ipaddress) {
                                            v3cipaddr = ipaddr
                                            v2cipaddr = ipaddr
                                            html += '<div class="icon-let">';
                                            html += '<i class="mdi mdi-alpha-s-box-outline icon-val" onclick="" id="addsnmp" data-toggle="modal" data-target="#dialog-for-addsnmp" style="color:#55a8fd;"></i>';
                                            html += '<span class="text">';
                                            html += '<div class="">';
                                            html += '<div class="col-12" style="display:flex;margin-left: 0px">'
                                            html += '<p class="bold-text mb-0 text-color"> ' + vpro + ' Added</p>&ensp;&ensp;';
                                            //html += '<i class="mdi mdi-lead-pencil" onclick="editmgmnt(this)" data-toggle="modal" name="' + vpro + '" data-val="' + obj.pathhost +'" data-ipaddress="' + obj.ipaddress + '" style="color:white;"></i>&ensp;';
                                            html += '<i class="mdi mdi-close-octagon-outline" onclick="onDeleteSnmp(this)" data-id="' + vcidVal + '" data-host-ip="' + ipaddr + '" data-host-name="' + vpro + '" style="color:red; float:right"></i>';
                                            html += '</div>';
                                            html += '</div>';
                                            html += '</span>';
                                            html += '</div>';
                                        }
                                    });
                                });
                                var mgmtArr = [{ type: 'ilo', addrArr: iloipaddrArr }, { type: 'idrac', addrArr: idracipaddrArr }, { type: 'Node Expo', addrArr: nodeipaddrArr }, { type: 'Nginx Expo', addrArr: nginxipaddrArr }, { type: 'Window Expo', addrArr: windowipaddrArr }];
                                mgmtArr.forEach(function (mgmt) {
                                    // console.log("mgmtArr--->" + JSON.stringify(mgmt))
                                    if (mgmt.addrArr.includes(obj.ipaddress)) {
                                        var icon = '';
                                        if (mgmt.type === 'ilo') {
                                            icon = '<i class="mdi mdi-alpha-m-box-outline icon-val" style="color:#55a8fd;"></i>';
                                        } else if (mgmt.type === 'idrac') {
                                            icon = '<i class="mdi mdi-alpha-m-box-outline icon-val" style="color:#55a8fd;"></i>';
                                        } else if (mgmt.type === 'Node Expo') {
                                            icon = '<i class="mdi mdi-alpha-n-box-outline icon-val" style="color:#55a8fd;"></i>';
                                        } else if (mgmt.type === 'Window Expo') {
                                            icon = '<i class="mdi mdi-alpha-w-box-outline icon-val" style="color:#55a8fd;"></i>';
                                        } else if (mgmt.type === 'Nginx Expo') {
                                            icon = '<i class="mdi mdi-alpha-n-box-outline icon-val" style="color:#55a8fd;"></i>';
                                            //icon = '<img class="" src="/static/images/Nginx-icon.png" style="width: 22px !important; float:left;background-color:#55a8fd;"/>';mdi-hexagon-outline
                                        }
                                        html += '<div class="icon-let">';
                                        html += icon;
                                        html += '<span class="text">';
                                        html += '<div class="">';
                                        html += '<div class="col-12" style="display:flex;margin-left: 0px">'
                                        html += '<p class="bold-text mb-0 text-color"> ' + mgmt.type + ' Added</p>&ensp;&ensp;';
                                        //html += '<i class="mdi mdi-lead-pencil" onclick="editmgmnt(this)" data-toggle="modal" name="' + mgmt.type + '" data-val="' + obj.pathhost+'" data-ipaddress="' + obj.ipaddress + '" style="color:white;"></i>&ensp;';
                                        html += '<i class="mdi mdi-close-octagon-outline" onclick="mgmntCloseClick(this)" data-host-ip="' + mgmt.addrArr.join(',') + '" data-host-name="' + mgmt.type + '" style="color:red; float:right"></i>';
                                        html += '</div>';
                                        html += '</div>';
                                        html += '</span>';
                                        html += '</div>';
                                    }
                                });
                                html += '</div>'
                                html += '</div>'
                                html += '</div>'
                                html += '</div>'
                                html += '</fieldset>&ensp;&ensp;'
                                objid = obj.pathhost;
                                //console.log("objid---->" + objid)
                                var tothtml = ''
                                var divid = "ip_" + (obj.mainipaddress).replaceAll('.', '_')
                                if (objid == 'Physical' || objid == 'VM') {
                                    scount++;
                                    $("#nohost").hide();
                                    $("#sswi").show();
                                    var isDivPresent = document.getElementById(divid)
                                    if (!isDivPresent) {
                                        tothtml += '<div class="row " id="' + divid + '">'
                                        tothtml += html
                                        tothtml += '</div>'
                                        $("#s_hw").append(tothtml);
                                    } else {
                                        if (!(isDivPresent.classList.contains('mainip-group'))) {
                                            isDivPresent.classList.add("mainip-group");
                                        }
                                        $("#s_hw #" + divid).append(html);
                                        $("#s_hw #" + divid + ' fieldset').css('background', 'transparent')
                                    }
                                    changeBorderColorByDataName('s' + obj.mainipaddress.replace(/\./g, '_'));
                                    var srch_row = 'server-row'
                                    var layer = 's_hw'
                                    document.getElementById('server-heading').innerHTML = '<div class="row row-width" style="margin:unset">SERVERS<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + scount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.ipaddress + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                                    $('#server-heading').append('<div class="row" id="server-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + layer + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + layer + '\',\'' + obj.ipaddress + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');
                                } else if (objid == 'Gateway Switch') {
                                    gcount++;
                                    $("#nohost").hide();
                                    $("#gswi").show();
                                    $("#g_swi").append(html);
                                    var srch_row = 'gatewaysearch-row'
                                    var layer = 'g_swi'
                                    document.getElementById('gswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">GATEWAY - SWITCH<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + gcount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.ipaddress + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                                    $('#gswitch-heading').append('<div class="row" id="gatewaysearch-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + layer + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + layer + '\',\'' + obj.ipaddress + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');
                                } else if (objid == 'Public Switch') {
                                    pcount++;
                                    $("#nohost").hide();
                                    $("#pswi").show();
                                    $("#p_swi").append(html);
                                    var srch_row = 'publicsearch-row'
                                    var layer = 'p_swi'
                                    document.getElementById('pswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">PUBLIC - SWITCH<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + pcount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.ipaddress + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                                    $('#pswitch-heading').append('<div class="row" id="publicsearch-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + layer + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + layer + '\',\'' + obj.ipaddress + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');
                                } else if (objid.includes("Fortigate")) {
                                    fcount++;
                                    $("#nohost").hide();
                                    $("#fswi").show();
                                    $("#f_swi").append(html);
                                    var srch_row = 'firwallsearch-row'
                                    var layer = 'f_swi'
                                    document.getElementById('fswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">FIREWALL<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + fcount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.ipaddress + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                                    $('#fswitch-heading').append('<div class="row" id="firwallsearch-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + layer + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + layer + '\',\'' + obj.ipaddress + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');
                                } else if (objid.includes("router")) {
                                    rcount++;
                                    $("#nohost").hide();
                                    $("#rswi").show();
                                    $("#r_swi").append(html);
                                    var srch_row = 'routersearch-row'
                                    var layer = 'r_swi'
                                    document.getElementById('rswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">ROUTER<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + rcount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.ipaddress + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                                    $('#rswitch-heading').append('<div class="row" id="routersearch-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + layer + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + layer + '\',\'' + obj.ipaddress + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');
                                } else if (objid == 'Exchange Switch') {
                                    ecount++;
                                    $("#nohost").hide();
                                    $("#eswi").show();
                                    $("#e_swi").append(html);
                                    var srch_row = 'exchangesearch-row'
                                    var layer = 'e_swi'
                                    document.getElementById('eswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">EXCHANGE - SWITCH<div style="background-color:#c5bf13;border-radius:11px;width:23px;height:20px;color:#575757;text-align:center">' + ecount + '</div><i class="mdi mdi-magnify hide-val' + srch_row + '" id="no-lens' + obj.ipaddress + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 19px;color:#e99123"></i></div>'
                                    $('#eswitch-heading').append('<div class="row" id="exchangesearch-row" style="margin-left:0%;display:none"><div class="" id="onb-search"><div class="input-group md-form form-sm form-2 pl-0" style="color:white"><input type="search" class="form-control search" placeholder="Search" name="tags" id="switag' + layer + '" aria-label="Search"><div class="input-group-append"><button class="btn btn-outline-secondary button-clr size12" type="button"><i class="mdi mdi-magnify icon-btnclr" id="icon-search" style="position: inherit;font-size:18px;" id="i_" onclick="swapDivgonb(this,\'' + layer + '\',\'' + obj.ipaddress + '\')"></i><i class="mdi mdi-close icon-clsbtn" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit;font-size:18px;"></i></button></div></div></div><div class="col-2" text-right></div></div>');
                                } else {
                                    swal(`Unknown pathhost name '${obj.pathhost}' for ${obj.ipaddress}`, ' ', "warning");
                                    $("#nohost").hide();
                                    $("#unswi").show();
                                    $("#un_swi").append(html);
                                }
                                $("#hostcontent").show();
                                $("#nodata").show();
                            }else {
                                    console.error('Error:', mgmtXhr.statusText);
                                }
                            };

                            mgmtXhr.onerror = function () {
                                console.error('Error:', mgmtXhr.statusText);
                            };

                            mgmtXhr.send();
                        } else {
                            console.error('Error:', snmpXhr.statusText);
                        }
                    };

                    snmpXhr.onerror = function () {
                        console.error('Error:', snmpXhr.statusText);
                    };

                    snmpXhr.send();
                });
        } else {
            console.error('Error:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error:', xhr.statusText);
    };

    xhr.send(JSON.stringify(data));
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function changeBorderColorByDataName(dataName) {
    const elements = document.querySelectorAll('.border-changeable[data-name="' + dataName + '"]');
    const newColor = getRandomColor();
    elements.forEach(element => {
        //element.style.border = '1px solid ' + newColor;
        element.style.border = '1px solid #ffffff'
    });
}
$(document).on('click', '.icon-circle', function () {
    $(this).toggleClass('mdi-chevron-left mdi-chevron-down');
    $(this).siblings('.circle-menu').toggleClass('show');
});
$(document).on('click', '.circle-menu div', function () {
    console.log('Menu option clicked:', $(this).attr('class'));
});
function displaysearchbar(searchrow_name) {
    if ($('#' + searchrow_name).css('display') != 'none') {
        $('.hide-val' + searchrow_name).show();
        $('#' + searchrow_name).css('display', 'none')
    } else {
        $('.hide-val' + searchrow_name).hide();
        $('#' + searchrow_name).css('display', 'flex')
    }
}
function closesearchbar(closebar) {
    $('#' + closebar).css('display', 'none')
    $('.hide-val' + closebar).show();
}
function swapDivgonb(ele, layer, ip) {
     //console.log("elem-->" + layer)
    //  var ipadd = ip.replaceAll('.', '_')
    var inputValue = $("#switag" + layer).val()
     //console.log('inputvalue--->' + inputValue)
    var swapgid = 's' + inputValue.replaceAll('.', '_')
    // console.log('swapid--->' + swapgid)
    ele = document.getElementById(swapgid)
    // console.log('ELEM--->' + ele)
    // ele.parentNode(ele, document.getElementById(+ ipadd));
    ele.parentNode.insertBefore(ele, document.getElementById(layer).children[0]);
    ele.insertAdjacentHTML('afterend', '&ensp;&ensp;');
}
// Function to handle the deletion of selected cards

function deleteSelectedHosts() {
    const ipaddress = [];
    const subipaddress = [];
    const hostname = [];
    $(".card-checkbox:checked").each(function () {
        ipaddress.push($(this).data("ipaddress"));

        // Check if subipaddress is [ [], [] ] and send an empty string if true
        const subip = $(this).data("subipaddress");
        if (Array.isArray(subip) && subip.length === 2 && subip[0].length === 0 && subip[1].length === 0) {
            subipaddress.push("");
        } else {
            subipaddress.push(subip);
        }

        hostname.push($(this).data("hostname"));
    });

    // Replace subipaddress with empty string if it's [ [], [] ]
    if (JSON.stringify(subipaddress) === '[[],[]]') {
        subipaddress.length = 0; // Clear the array
        subipaddress.push(""); // Push an empty string
    }
    // console.log("ipaddress---->" + JSON.stringify(ipaddress))
    // console.log("subipaddress---->" + JSON.stringify(subipaddress))
    // console.log("hostname---->" + JSON.stringify(hostname))

    if (ipaddress.length === 0) {
        alert("Select at least one card to delete.");
        return;
    }

    swal({
        title: "Delete Hosts",
        text: "Want to permanently delete the selected hosts?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete",
        closeOnConfirm: false,
        showLoaderOnConfirm: true // Show loader while waiting for the response
    },
        function () {
            $(".loader").show();
            requestDataFromServer('deletehost', { 'ipaddress': JSON.stringify(ipaddress), 'subipaddress': JSON.stringify(subipaddress), 'hostname': JSON.stringify(hostname), csrfmiddlewaretoken: csrf_token }, "POST").done(handledeleteresponse);
        });
}
/*function deleteSelectedHosts() {
    const ipaddress = [];
    const subipaddress = [];
    const hostname = [];
    $(".card-checkbox:checked").each(function () {
        ipaddress.push($(this).data("ipaddress"));

        // Check if subipaddress is [ [], [] ] and send an empty string if true
        const subip = $(this).data("subipaddress");
        if (Array.isArray(subip) && subip.length === 2 && subip[0].length === 0 && subip[1].length === 0) {
            subipaddress.push("");
        } else {
            subipaddress.push(subip);
        }

        hostname.push($(this).data("hostname"));
    });

    // Replace subipaddress with empty string if it's [ [], [] ]
    if (JSON.stringify(subipaddress) === '[[],[]]') {
        subipaddress.length = 0; // Clear the array
        subipaddress.push(""); // Push an empty string
    }
    // console.log("ipaddress---->" + JSON.stringify(ipaddress))
    // console.log("subipaddress---->" + JSON.stringify(subipaddress))
    // console.log("hostname---->" + JSON.stringify(hostname))

    if (ipaddress.length === 0) {
        alert("Select at least one card to delete.");
        return;
    }

    swal({
        title: "Delete Hosts",
        text: "Want to permanently delete the selected hosts?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete",
        closeOnConfirm: false,
        showLoaderOnConfirm: true // Show loader while waiting for the response
    },
        function () {
            $(".loader").show();
            // Use the xhr method directly
            var request = new XMLHttpRequest();
            request.open("POST", 'deletehost', true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.onload = function () {
                if (request.status >= 200 && request.status < 300) {
                    handledeleteresponse(request.responseText);
                } else {
                    // Handle error
                    console.error('Error:', request.statusText);
                }
            };
            request.onerror = function () {
                // Handle connection error
                console.error('Request failed');
            };
            request.send(JSON.stringify({
                'ipaddress': JSON.stringify(ipaddress),
                'subipaddress': JSON.stringify(subipaddress),
                'hostname': JSON.stringify(hostname),
                csrfmiddlewaretoken: csrf_token
            }));
        });
}*/

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
            if (toBeDeletedHost) {
                const ipaddress = $(deleteBtn).attr("data-host-ip");
                let subipaddress = $(deleteBtn).attr("data-sub-name");
                const hostname = $(deleteBtn).attr("data-host-name");

                // Check if subipaddress is [ [], [] ] and send an empty string if true
                subipaddress = JSON.parse(subipaddress);
                if (Array.isArray(subipaddress) && subipaddress.length === 2 && subipaddress[0].length === 0 && subipaddress[1].length === 0) {
                    subipaddress = "";
                } else {
                    // Convert subipaddress back to a string if it's not empty
                    subipaddress = JSON.stringify(subipaddress);
                }

                const selectedHosts = {
                    ipaddress: [ipaddress],
                    subipaddress: [subipaddress === '[]' ? '' : subipaddress], // Check for '[ ]' and convert to an empty string
                    hostname: [hostname]
                };
                // console.log("ipaddress--1-->" + JSON.stringify(selectedHosts.ipaddress))
                // console.log("subipaddress--1-->" + JSON.stringify(selectedHosts.subipaddress))
                // console.log("hostname--1-->" + JSON.stringify(selectedHosts.hostname))
                $(".loader").show();
                requestDataFromServer('deletehost', { 'ipaddress': JSON.stringify(selectedHosts.ipaddress), 'subipaddress': JSON.stringify(selectedHosts.subipaddress), 'hostname': JSON.stringify(selectedHosts.hostname), csrfmiddlewaretoken: csrf_token }, "POST").done(handledeleteresponse);
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
        });
}

/*function hostCloseClick(btn) {
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
            if (toBeDeletedHost) {
                const ipaddress = $(deleteBtn).attr("data-host-ip");
                let subipaddress = $(deleteBtn).attr("data-sub-name");
                const hostname = $(deleteBtn).attr("data-host-name");

                // Check if subipaddress is [ [], [] ] and send an empty string if true
                subipaddress = JSON.parse(subipaddress);
                if (Array.isArray(subipaddress) && subipaddress.length === 2 && subipaddress[0].length === 0 && subipaddress[1].length === 0) {
                    subipaddress = "";
                } else {
                    // Convert subipaddress back to a string if it's not empty
                    subipaddress = JSON.stringify(subipaddress);
                }

                const selectedHosts = {
                    ipaddress: [ipaddress],
                    subipaddress: [subipaddress === '[]' ? '' : subipaddress], // Check for '[ ]' and convert to an empty string
                    hostname: [hostname]
                };

                // console.log("ipaddress--1-->" + JSON.stringify(selectedHosts.ipaddress))
                // console.log("subipaddress--1-->" + JSON.stringify(selectedHosts.subipaddress))
                // console.log("hostname--1-->" + JSON.stringify(selectedHosts.hostname))
                $(".loader").show();

                // Use the xhr method directly
                var xhr = new XMLHttpRequest();
                //request.open("POST", leurl + 'allonboard/deletehost', true);
                xhr.open("POST", 'http://localhost:8080/allonboard/deletehost', true);
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        handledeleteresponse(xhr.responseText);
                    } else {
                        // Handle error
                        console.error('Error:', xhr.statusText);
                    }
                };
                xhr.onerror = function () {
                    // Handle connection error
                    console.error('Request failed');
                };
                xhr.send(JSON.stringify({
                    'ipaddress': JSON.stringify(selectedHosts.ipaddress),
                    'subipaddress': JSON.stringify(selectedHosts.subipaddress),
                    'hostname': JSON.stringify(selectedHosts.hostname),
                    csrfmiddlewaretoken: csrf_token
                }));
            } else {
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
                    $("#registered-service-no-data").css('display', 'block');
            }
        });
}*/

function handledeleteresponse(response) {
    res = JSON.parse(response)
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
        // Use the xhr method directly
        var request = new XMLHttpRequest();
        request.open("POST", leurl + 'allonboard/mgmtdeletehost', true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
                handledeleteresponse(request.responseText);
            } else {
                // Handle error
                console.error('Error:', request.statusText);
            }
        };
        request.onerror = function () {
            // Handle connection error
            console.error('Request failed');
        };
        request.send(JSON.stringify({
            'prototype': hostname,
            'ipaddress': ipaddress,
            csrfmiddlewaretoken: csrf_token
        }));
    } else {
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
            $("#registered-service-no-data").css('display', 'block');
    }
}
/* -------------- EXPORT ONE FILE in TABLE ------------------- */
// import * as ExcelJS from 'exceljs';
let exportone = (element) => {
    const ipAddressName = element.getAttribute('data-ipaddress-name');
    const hostsName = element.getAttribute('data-hosts-name');
   // console.log("hostsName--->" + hostsName)
    requestDataFromServer('newonbtable', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        const exportonbs = JSON.parse(response).data;

        const item = exportonbs.find(item => item.ipaddress === ipAddressName);
        if (item) {
            const workbook = new ExcelJS.Workbook();

            // Add sheet for "newonbtable" data
            const worksheet1 = workbook.addWorksheet('Device');
            const { id, json, hostname, mainipaddress, ...dataWithoutIp } = item; // Exclude "id" from data
            const data = Object.entries(dataWithoutIp);
            data.forEach(([key, value], index) => {
                worksheet1.getCell(1, index + 1).value = key;
                if (key === "selecthost") {
                    const parts = value.split('-');
                    if (parts.length > 0) {
                        const firstPart = parts[0];
                       // console.log("device sheet--cleaned value--->" + firstPart);
                        worksheet1.getCell(2, index + 1).value = firstPart; // Set the cell value to "CentOS8"
                    }
                } else {
                    worksheet1.getCell(2, index + 1).value = value;
                }
               // console.log("device sheet--key--->" + key);
               // console.log("device sheet--value--->" + value);
            });

            let dataRequestPromise;
            let sheetName;

            if (hostsName === "Physical" || hostsName === "VM") {
                dataRequestPromise = requestDataFromServer('getmgmntdata', { ipaddress: ipAddressName }, "GET");
                sheetName = 'mgmt-Addon';
            } else {
                dataRequestPromise = requestDataFromServer('snmpdatatable', { ipaddress: ipAddressName }, "GET");
                sheetName = 'snmp';
            }

            dataRequestPromise.done(function (tableResponse) {
                const tableData = JSON.parse(tableResponse).data || [];

                // Add sheet for data
                const dataWorksheet = workbook.addWorksheet(sheetName);
                const columnHeaders = Object.keys(tableData.length > 0 ? tableData[0] : {}).filter(header => header !== 'id' && header !== 'ip_id');
                columnHeaders.forEach((header, columnIndex) => {
                    dataWorksheet.getCell(1, columnIndex + 1).value = header;
                });
                if (tableData.length > 0) {
                    tableData.forEach((entry, rowIndex) => {
                        columnHeaders.forEach((header, columnIndex) => {
                            const cellValue = entry[header] === "NOVALUE" ? '' : entry[header];
                            dataWorksheet.getCell(rowIndex + 2, columnIndex + 1).value = cellValue;
                        });
                    });
                } else {
                    // If tableData is empty, add only the header row
                    const headerRow = columnHeaders.reduce((acc, header) => ({ ...acc, [header]: header }), {});
                    dataWorksheet.addRow(headerRow);
                }
                // Create a buffer and save the workbook to it
                workbook.xlsx.writeBuffer().then(buffer => {
                    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const filename = `${item.ipaddress}.xlsx`;

                    const newLink = document.createElement("a");
                    newLink.href = window.URL.createObjectURL(blob);
                    newLink.download = filename;
                    newLink.style.display = "none";
                    document.body.appendChild(newLink);

                    newLink.click();
                });
            });

        } else {
            console.log(`Data not found for IP address: ${ipAddressName}`);
        }
    });
};
/* -------------- EXPORT ONE FILE in TABLE ------------------- */
/* --------------EXPORT MULTIPLE FILE in TABLE------------------- */
// Make sure you include the exceljs library in your project
// import * as ExcelJS from 'exceljs';

let exportonbdata = () => {
    requestDataFromServer('newonbtable', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (response) {
        const exportonb = JSON.parse(response).data;

        // Request data from "getallmgmntdata" table
        requestDataFromServer('getallmgmntdata', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (mgmntResponse) {
            const getmgmntdata = JSON.parse(mgmntResponse).data;

            // Request data from "/dashboard/snmpnewtable" table
            requestDataFromServer('/dashboard/snmpnewtable', { csrfmiddlewaretoken: csrf_token }, "GET").done(function (snmpResponse) {
                const snmpData = JSON.parse(snmpResponse).data;

                const workbook = new ExcelJS.Workbook();

                // Add worksheet for "newonbtable" data
                const worksheet1 = workbook.addWorksheet('Devices');
                const headers1 = Object.keys(exportonb[0]).filter(header => header !== 'id' && header !== 'json' && header !== 'hostname' && header !== 'mainipaddress');
                headers1.forEach((header, index) => {
                    worksheet1.getCell(1, index + 1).value = header;
                });
                exportonb.forEach((item, rowIndex) => {
                    const values = headers1.map(header => {
                        if (header === "selecthost") {
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

                // Add worksheet for "getallmgmntdata" data if not empty
                if (getmgmntdata.length > 0) {
                    const worksheet2 = workbook.addWorksheet('mgmt-Addon');
                    const headers2 = Object.keys(getmgmntdata[0]).filter(header => header !== 'id' && header !== 'ip_id');
                    headers2.forEach((header, index) => {
                        worksheet2.getCell(1, index + 1).value = header;
                    });
                    getmgmntdata.forEach((item, rowIndex) => {
                        const values = headers2.map(header => item[header] === '{}' ? '' : item[header]);
                        values.forEach((value, columnIndex) => {
                            worksheet2.getCell(rowIndex + 2, columnIndex + 1).value = value;
                        });
                    });
                } else {
                    // Add empty worksheet for "getallmgmntdata"
                    workbook.addWorksheet('mgmt-Addon');
                }

                // Add worksheet for "snmpnewtable" data if not empty
                if (snmpData.length > 0) {
                    const snmpWorksheet = workbook.addWorksheet('snmp');
                    const snmpHeaders = Object.keys(snmpData[0]).filter(header => header !== 'id' && header !== 'ip_id');
                    snmpHeaders.forEach((header, index) => {
                        snmpWorksheet.getCell(1, index + 1).value = header;
                    });
                    snmpData.forEach((item, rowIndex) => {
                        const values = snmpHeaders.map(header => item[header] === 'NOVALUE' ? '' : item[header]); // Replace 'NOVALUE' with an empty string
                        values.forEach((value, columnIndex) => {
                            snmpWorksheet.getCell(rowIndex + 2, columnIndex + 1).value = value;
                        });
                    });
                } else {
                    // Add empty worksheet for "snmpnewtable"
                    workbook.addWorksheet('snmp');
                }

                // Create a buffer and save the workbook to it
                workbook.xlsx.writeBuffer().then(buffer => {
                    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const filename = 'Restore Devices.xlsx';

                    const newLink = document.createElement("a");
                    newLink.href = window.URL.createObjectURL(blob);
                    newLink.download = filename;
                    newLink.style.display = "none";
                    document.body.appendChild(newLink);

                    newLink.click();
                });
            });
        });
    });
};
/* -------------- EXPORT MULTIPLE FILE in TABLE ------------------- */
/* -------------- IMPORT FILE in TABLE ------------------- */
let completedSheets = 0;
let totalSheets = 0;
let allMessages = [];

async function importonbdata() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    let fileIndex = 0; // Initialize the file index

    // Step 1: Count total sheets from all files
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const contents = await new Promise(resolve => {
            reader.onload = e => resolve(e.target.result);
            reader.readAsBinaryString(files[i]);
        });
        const workbook = XLSX.read(contents, { type: 'binary' });
        totalSheets += workbook.SheetNames.length;
    }

    // Step 2: Reset index and start processing files
    fileIndex = 0;

    function processWorksheet(fileIndex) {
        return new Promise((resolve, reject) => {
            if (fileIndex >= files.length) {
                resolve();
                return;
            }

            const file = files[fileIndex];
            const reader = new FileReader();

            reader.onload = function (e) {
                const contents = e.target.result;
                const workbook = XLSX.read(contents, { type: 'binary' });
                const sheetNames = workbook.SheetNames;

                async function processSheet(sheetIndex) {
                    if (sheetIndex < sheetNames.length) {
                        const sheetName = sheetNames[sheetIndex];
                        const worksheet = workbook.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet);

                        async function processItem(itemIndex) {
                            if (itemIndex < jsonData.length) {
                                const currentItem = jsonData[itemIndex];
                                const currentIP = currentItem.ipaddress;

                                swal({
                                    title: "Please wait",
                                    text: `Processing IP address: ${currentIP} on ${sheetName} worksheet...`,
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    allowEnterKey: false,
                                    showLoaderOnConfirm: true
                                });

                                await new Promise(resolve => setTimeout(resolve, 1000));
                                await processItem(itemIndex + 1);
                            } else {
                                await saveToDatabase(JSON.stringify(jsonData), sheetName, totalSheets);
                                processSheet(sheetIndex + 1);
                            }
                        }

                        await processItem(0);
                    } else {
                        resolve(processWorksheet(fileIndex + 1));
                    }
                }

                processSheet(0);
            };

            reader.readAsBinaryString(file);
        });
    }

    await processWorksheet(fileIndex);
}

const allInvalidIpAddresses = [];
const mgmtInvalidIpAddresses = [];
const non_validated_snmp_ipaddresses = [];
const alreadyOnboardedIPs = [];
const finalDeviceData = []; // Accumulates device data across sheets
let finalEmailId = ''; // Stores emailid from any valid row (assumes same across all rows per user/session)

async function saveToDatabase(contents, sheetName, totalSheetCount) {
    totalSheets = totalSheetCount;

    if (contents === null) {
        console.error('Contents are null');
        return;
    }

    const xhr = new XMLHttpRequest();
    const url = 'save-data-to-database';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));

    try {
        const response = await sendRequest(xhr, contents, sheetName);

        if (response.status === 'warning' || response.status === 'success') {
            allMessages.push(`Sheet '${sheetName}': ${response.message}`);

            allInvalidIpAddresses.push(...(response.invalid_ip_addresses || []));
            mgmtInvalidIpAddresses.push(
                ...(response.non_validated || []).map(item => `${item.ip} (${item.prototype})`)
            );
            non_validated_snmp_ipaddresses.push(
                ...(response.non_validated_snmp_ipaddresses || []).map(item => `${item.ip} (Version: ${item.version})`)
            );
            alreadyOnboardedIPs.push(...(response.already_onboarded_ip_addresses || []));

            // Collect device data for email
            if (response.device_data) {
                finalDeviceData.push(...response.device_data);
            }

            if (response.device_data?.length > 0 && !finalEmailId) {
                finalEmailId = response.device_data[0].emailid;
            }
        }

    } catch (error) {
        allMessages.push(`Sheet '${sheetName}': Server Error`);
        console.error(`Error in sheet '${sheetName}':`, error);
    }

    completedSheets++;

    // Trigger email only after all sheets are processed
    if (completedSheets === totalSheets) {
        // Prepare summary swal
        let title = "Device Onboard";
        let text = allMessages.join('\n');

        if (allInvalidIpAddresses.length > 0)
            text += `\n⚠️ Invalid IPs: ${allInvalidIpAddresses.join(', ')}`;

        if (mgmtInvalidIpAddresses.length > 0)
            text += `\n🚫 Non-Validated MGMT IPs: ${mgmtInvalidIpAddresses.join(', ')}`;

        if (non_validated_snmp_ipaddresses.length > 0)
            text += `\n🔐 Non-Validated SNMP IPs: ${non_validated_snmp_ipaddresses.join(', ')}`;

        if (alreadyOnboardedIPs.length > 0)
            text += `\n⚠️ Already Onboarded IPs: ${alreadyOnboardedIPs.join(', ')}`;

        // Send final email
        sendEmailSummary(finalEmailId, finalDeviceData);

        let swalType = 'success';
        if (allMessages.some(msg => msg.toLowerCase().includes('server error'))) {
            swalType = 'error';
        } else if (allInvalidIpAddresses.length > 0 || mgmtInvalidIpAddresses.length > 0 || non_validated_snmp_ipaddresses.length > 0) {
            swalType = 'warning';
        } else if (alreadyOnboardedIPs.length > 0) {
            swalType = 'info';
        }

        swal({
            title: title,
            text: text,
            type: swalType,
            confirmButtonClass: "btn-success",
            confirmButtonText: "OK"
        }, isConfirm => {
            if (isConfirm) {
                parent.window.location.reload(true);
            }
        });
    }
}

function sendEmailSummary(email, deviceData) {
   // console.log("sendEmailSummary---->" + email + "<------>" + JSON.stringify(deviceData));
    if (!deviceData || deviceData.length === 0) {
        console.warn("No device data provided.");
        return;
    }

    const statusPriority = { "Failure": 4, "Warning": 3, "Info": 2, "Success": 1 };
    const groupedMap = {};

    // Deduplicate based on IP + fill missing fields
    deviceData.forEach(entry => {
        const ip = entry.ipaddress;
        if (!ip) return;

        if (!groupedMap[ip]) {
            groupedMap[ip] = entry;
        } else {
            const current = groupedMap[ip];
            // Replace if higher priority
            if (statusPriority[entry.status] > statusPriority[current.status]) {
                // Merge fields from previous entry if missing
                Object.keys(current).forEach(key => {
                    if (!entry[key]) entry[key] = current[key];
                });
                groupedMap[ip] = entry;
            }
        }
    });

    // Group by emailid
    const groupedByEmail = {};
    Object.values(groupedMap).forEach(entry => {
        const email = entry.emailid;
        if (!email) return;

        if (!groupedByEmail[email]) groupedByEmail[email] = [];
        groupedByEmail[email].push(entry);
    });

    // Send separate request per email
    Object.entries(groupedByEmail).forEach(([email, entries]) => {
        //console.log("Sending to:", email, "Data:", entries);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/allonboard/send-onboard-summary', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));

        xhr.send(JSON.stringify({
            emailid: email,
            sitename: selectedsite,
            device_data: entries
        }));

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(`Summary email sent to ${email}`);
            } else {
                console.error(`Failed to send summary email to ${email}`);
            }
        };
    });
}

// Helper function to send XMLHttpRequest and handle it as a promise
/*function sendRequest(xhr, contents, sheetName) {
    return new Promise((resolve, reject) => {
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            } else {
                reject(xhr.status);
            }
        };
        xhr.send(contents);
    });
}*/
function sendRequest(xhr, contents, sheetName) {
    return new Promise((resolve, reject) => {
        /*console.log("sendRequest called");
        console.log("typeof contents:", typeof contents); */// should be "string"
        //console.log("selectedsite:", selectedsite);

        // Step 1: Parse string to array
        let parsedContents;
        try {
            parsedContents = JSON.parse(contents); // from string → array
        } catch (err) {
            console.error("Invalid JSON string in contents:", err);
            reject("Invalid JSON string");
            return;
        }

        // Step 2: Inject sitename into each entry
        if (Array.isArray(parsedContents)) {
            parsedContents.forEach(entry => {
                entry.sitename = selectedsite;
            });
        } else {
            console.warn("Parsed contents is not an array");
            reject("Expected array of entries");
            return;
        }

        // Step 3: Convert back to string
        const finalContents = JSON.stringify(parsedContents);

        // Step 4: Send it
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            } else {
                reject(xhr.status);
            }
        };

        xhr.send(finalContents);
    });
}

// Function to get the CSRF token from the cookie
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

/* -------------- IMPORT FILE in TABLE ------------------- */
/* -------------- Download onboard template file ------------ */
// Define the function to be called on button click
function downloadtemp() {
   // console.log("file temp");
    var filename = 'finspot_onboard-v1';
    var url = '/allonboard/download_file?testname=' + encodeURIComponent(filename) + '&csrfmiddlewaretoken=' + encodeURIComponent(csrf_token);
    window.location.href = url;
}
/* -------------- END Download onboard template file ------------ */
/*--------------------  EDIT HOST --------------------*/
var editipaddr =''
function editHost(element) {
    isEdit = true;
    // Get the IP address from the clicked element's data attribute
    var ipAddress = $(element).data('ipaddress');
   // console.log("editHost---->" + ipAddress)
    // Update the modal with the IP address
    editipaddr = ipAddress;
    validationip = editipaddr;
    $('#modalBodyStep5').find('.ip-address').text(ipAddress);
    // Show the modal and navigate to step 5
    $('#onboardModal').modal('show');
    showModalSteps(1);
}
// Function to show the specified step in the modal
/*function editmgmnt(iconElement) {
    function handleSelectChange(elementId, selectedIndex) {
        const selectElement = document.getElementById(elementId);
        selectElement.selectedIndex = selectedIndex;
        selectElement.dispatchEvent(new Event('change'));
    }
    // Extract IP address and other data from the iconElement
    var ipaddress = iconElement.getAttribute("data-ipaddress");
    var selectedonbVal = iconElement.getAttribute("data-val");
    const selectElement = document.getElementById('onboardSelect');
    if (selectedonbVal === "Physical" || selectedonbVal === "VM") {
        selectedonbValue = "Server"
        handleSelectChange('onboardSelect', 2);
    } else if (selectedonbVal.includes(" Switch")) {
        selectedonbValue = "Switch"
        handleSelectChange('onboardSelect', 3);
    } else {
        selectedonbValue = "Firewall"
        handleSelectChange('onboardSelect', 1);
    }
    $('#onboardModal').modal('show');
    console.log("selectedonbValue-->" + selectedonbValue)
    showModalSteps(1);
    setTimeout(function () {
        const selectElement = document.getElementById('selectonb');
        showModalSteps(2);
        if (selectedonbValue === "Server") {
            if (selectedonbVal === "Physical") {
                handleSelectChange('selectdevice', 1);
            } else if (selectedonbVal === "VM") {
                handleSelectChange('selectdevice', 2);
            }
        } else if (selectedonbValue === "Switch") {
            if (selectedonbVal.includes("Gateway ")) {
                handleSelectChange('selectdevice', 1);
            } else if (selectedonbVal.includes("Public ")) {
                handleSelectChange('selectdevice', 2);
            } else if (selectedonbVal.includes("Exchange ")) {
                handleSelectChange('selectdevice', 3);
            }
        }
        else if (selectedonbValue === "Firewall") {
            if (selectedonbVal.includes(" 50E")) {
                handleSelectChange('selectdevice', 1);
            } else if (selectedonbVal.includes(" 60E")) {
                handleSelectChange('selectdevice', 2);
            } else if (selectedonbVal.includes(" 60F")) {
                handleSelectChange('selectdevice', 3);
            } else if (selectedonbVal.includes(" 80F")) {
                handleSelectChange('selectdevice', 4);
            } else if (selectedonbVal.includes(" 100E")) {
                handleSelectChange('selectdevice', 5);
            } else if (selectedonbVal.includes(" 100F")) {
                handleSelectChange('selectdevice', 6);
            } else if (selectedonbVal.includes(" 200F")) {
                handleSelectChange('selectdevice', 7);
            }
        }
    }, 3000);
    setTimeout(function () {
        showModalSteps(3);
    }, 3000);
    setTimeout(function () {
        showModalSteps(4);
    }, 3000);
}*/
function showModalSteps(step) {
    var formData = {};
    var currentSteps = step;

    $('.modal-body .modal-step').hide();
    updateingButtons();

    $('#modalBodyStep' + step).show();

    var xhr = new XMLHttpRequest();
    xhr.open("GET", leurl + 'allonboard/newonbtable', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var editonbs = JSON.parse(xhr.responseText);
            var data = editonbs.data;
            data.forEach(function (obj) {
                if (editipaddr == obj.ipaddress) {
                    processEditonbs(obj, currentSteps, selectedonbValue);
                }
            });
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Request failed');
    };

    xhr.send();

    function handleSelectChange(elementId, selectedIndex, disable) {
        const selectElement = document.getElementById(elementId);
        selectElement.selectedIndex = selectedIndex;
        selectElement.dispatchEvent(new Event('change'));
        if (disable) {
            $(`#${elementId}`).prop('disabled', true);
        }
    }

    function processEditonbs(obj, currentSteps, selectedonbValue) {
        if (currentSteps === 1) {
            const selectElement = document.getElementById('onboardSelect');
            if (obj.pathhost.includes("Fortigate")) {
                handleSelectChange('onboardSelect', 1, true);
            } else if (obj.pathhost.includes("Physical") || obj.pathhost.includes("VM")) {
                handleSelectChange('onboardSelect', 2, true);
            } else if (obj.pathhost.includes("Switch")) {
                handleSelectChange('onboardSelect', 3, true);
            } else if (obj.pathhost.includes("router")) {
                handleSelectChange('onboardSelect', 4, true);
            }
            $('#onboardSelect').prop('disabled', true);
        }
        if (currentSteps === 2) {
           // console.log("selectedonbValue: ", selectedonbValue);
           // console.log("obj.pathhost: ", obj.pathhost);
            setTimeout(function () {
            if (selectedonbValue === "Server") {
                if (obj.pathhost === "Physical") {
                    handleSelectChange('selectdevice', 1, true);
                } else if (obj.pathhost === "VM") {
                    handleSelectChange('selectdevice', 2, true);
                }
            } else if (selectedonbValue === "Switch") {
                if (obj.pathhost.includes("Gateway ")) {
                    handleSelectChange('selectdevice', 1, true);
                } else if (obj.pathhost.includes("Public ")) {
                    handleSelectChange('selectdevice', 2, true);
                } else if (obj.pathhost.includes("Exchange ")) {
                    handleSelectChange('selectdevice', 3, true);
                }
            } else if (selectedonbValue === "Firewall") {
                if (obj.pathhost.includes(" 50E")) {
                    handleSelectChange('selectdevice', 1, true);
                } else if (obj.pathhost.includes(" 60E")) {
                    handleSelectChange('selectdevice', 2, true);
                } else if (obj.pathhost.includes(" 60F")) {
                    handleSelectChange('selectdevice', 3, true);
                } else if (obj.pathhost.includes(" 70F")) {
                    handleSelectChange('selectdevice', 4, true);
                } else if (obj.pathhost.includes(" 80F")) {
                    handleSelectChange('selectdevice', 5, true);
                } else if (obj.pathhost.includes(" 100E")) {
                    handleSelectChange('selectdevice', 6, true);
                } else if (obj.pathhost.includes(" 100F")) {
                    handleSelectChange('selectdevice', 7, true);
                } else if (obj.pathhost.includes(" 120G")) {
                    handleSelectChange('selectdevice', 8, true);
                } else if (obj.pathhost.includes(" 200F")) {
                    handleSelectChange('selectdevice', 9, true);
                }
            } else if (selectedonbValue === "Router") {
              //  console.log("selectedonbValue---->" + selectedonbValue)
                if (obj.pathhost.includes("router")) {
                    handleSelectChange('selectdevice', 1, true);
                }
            }
                $('#selectdevice').prop('disabled', true);
            }, 100); // Adjust the delay duration as needed
        }
    }

    if (currentSteps === 3) {
       // console.log("step-3---->")
        editDatas();
    }
    if (currentSteps === 4) {
        //console.log("step-4---->")
        //toggleServiceId(); // Show/hide service-id based on onboardselectValue
        toggleServicesId();
    }
    if (currentSteps === 5) {
        editFormData();
    }
    function updateingButtons() {
        $('#backButton').toggle(currentSteps > 1);
        $('#nextButton').html(currentSteps === 5 ? 'Submit' : 'Next &raquo;');
    }
    $('#backButton').click(function () {
        currentSteps--;
        showModalSteps(currentSteps);
    });
    function showPreviousSteps() {
        showModalSteps(currentSteps - 1);
        showFormDatas(); // Call showFormData() after showing the previous step
    }
    $('#nextButton').click(function () {
        if (currentSteps === 5) {
            //console.log("if-next-#nextButton")
            if (!validateStepForms(currentSteps)) {
                //console.log("if-if-next-#nextButton")
                showError();
                return;
            }
            // Handle form submission
            // ...

        } else {
            //console.log("else-next-#nextButton")
            showNextSteps();
        }
    });
    function showNextSteps() {
        //console.log("showNextSteps---qq-->")
        if (!validateStepForms(currentSteps)) {
            //console.log("showNextSteps---if-->")
            showError();
            return;
        }
        storeFormDatas();
        currentSteps++;
        showModalSteps(currentSteps);
    }
    function validateStepForms(step) {
        //console.log("validateStepForms----->")
        var isValid = true;
        var inputsToValidate = [];
        var errorBorderClass = 'error-border';

        if (step === 1) {
            inputsToValidate = ['#onboardSelect'];
            var onboardSelect = $('#onboardSelect');
            var value = onboardSelect.val();
            if (value === null || value === '') {
                onboardSelect.css('border-color', '#ff3d57');
                isValid = false;
            } else {
                onboardSelect.css('border-color', '');
                onboardselectValue = value; // Save the value in the global variable
            }
        } else if (step === 2) {
            inputsToValidate = ['#selectdevice'];
        } else if (step === 3) {
          //  console.log("step 3 valid---->")
            var validIds = ['#path-dropdown', '#hosts-dropdown', '#multi-select-ip', '#sub-multi-select-ip', '#REUSABLE_EMAIL', '#GLOBAL_APPLICATION', '#FRNDLY_NAME'];
            if (step === 3 && $('#path-dropdown').val() === 'VM') {
                validIds.push('#PHYSICAL_IP');
            }
            inputsToValidate = validIds;
        }

        inputsToValidate.forEach(function (input) {
            var value = $(input).val();
            if (value === null || value === '') {
                $(input).css('border-color', '#ff3d57');
                isValid = false;
            } else {
                $(input).css('border-color', '');
            }
        });

        return isValid;
    }
    function showError() {
        $('#showerror').html('<span style="color: #ff3d57;margin-left:4%;">Please fill in all the required fields.</span>');
        setTimeout(function () {
            $('#showerror').empty();
            $('#onboardSelect, #selectdevice, #hosts-dropdown, #multi-select-ip, #sub-multi-select-ip, #REUSABLE_EMAIL, #GLOBAL_APPLICATION, #FRNDLY_NAME, #PHYSICAL_IP').removeClass('error-border');
        }, 2000);
    }
    function showFormDatas() {
        var stepData = currentSteps; // Get the stored data for the current step
        if (typeof stepData === 'object') {
            Object.keys(stepData).forEach(function (inputID) {
                var selector = inputID.startsWith('#') ? inputID : '#' + inputID; // Add the '#' symbol if missing
                var value = stepData[inputID];
                if ($(selector).is('select')) {
                    // For select dropdowns
                    //$(selector).val(value);
                    setTimeout(function () {
                        $(selector).val(value); // Trigger the change event after a delay
                    }, 1500);
                } else {
                    // For other input fields
                    $(selector).val(value);
                }
            });
        }
    }
    function storeFormDatas() {
        // Store the form data of the current step
        var inputsToStore = [];
        if (currentSteps === 1) {
            inputsToStore = ['#onboardSelect'];
        } else if (currentSteps === 2) {
            inputsToStore = ['#selectdevice'];
        } else if (currentSteps === 3) {
            var validIds = ['#path-dropdown', '#hosts-dropdown', '#multi-select-ip', '#sub-multi-select-ip', '#REUSABLE_EMAIL', '#GLOBAL_APPLICATION', '#FRNDLY_NAME'];
            if ($('#path-dropdown').val() === 'VM') {
                validIds.push('#PHYSICAL_IP');
            }
            inputsToStore = validIds;
        }
        if (inputsToStore.length > 0) {
            var stepData = {};
            inputsToStore.forEach(function (input) {
                var value = $(input).val();
                stepData[input] = value; // Store the value in the stepData object
            });
            formData[currentSteps] = stepData; // Store the step data in the formData object
        } else {
            delete formData[currentSteps]; // Remove the step data from the formData object if inputsToStore is empty
        }
    }
}
function editDatas() {
    var xhr = new XMLHttpRequest(); // Replace "requestDataFromServer" with "xhr"
    xhr.open("GET", leurl + 'allonboard/newonbtable', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrf_token);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var editonbs = response;
            //console.log("editDatas---->" + JSON.stringify(editonbs))
            var data = editonbs.data;
            data.forEach(function (obj) {
                if (editipaddr == obj.ipaddress) {
                    setTimeout(function () {
                        populateFormFields(obj);
                    }, 1000);
                }
            });
            $('#path-dropdown').prop('disabled', true);
            $('#hosts-dropdown').prop('disabled', true);
            $('#multi-select-ip').prop('disabled', true);
        }
    };

    xhr.send();
}

function populateFormFields(obj) {
    //console.log("populateFormFields---->" + JSON.stringify(obj))
    $('#path-dropdown').val(obj.pathhost);
    $('#hosts-dropdown').val(obj.selecthost);
    var ipAddresses = obj.ipaddress.split(',');
    var selectElement = document.getElementById('multi-select-ip');
    selectElement.innerHTML = '';
    ipAddresses.forEach(function (ip) {
        var option = document.createElement('option');
        option.value = ip;
        option.text = ip;
        selectElement.appendChild(option);
    });
    $('#REUSABLE_EMAIL').val(obj.emailid);
    $('#GLOBAL_APPLICATION').val(obj.servertype);
    $('#FRNDLY_NAME').val(obj.textname);
    $('#PHYSICAL_IP').val(obj.physical_ip);

    if (obj.ipaddress !== '') {
        $('#ipaddress-details').show();
    }
    if (obj.emailid !== '') {
        $('#email-details').show();
    }
    if (obj.textname !== '') {
        $('#friendly-details').show();
    }
}
// Create a flag variable to track if toggleServicesId has been called
var toggleServicesIdCalled = false;

function fetchDataFromServer(endpoint, params, method, successCallback) {
    var url = endpoint;
    if (method === "GET" && params) {
        var queryString = Object.keys(params).map(key => key + "=" + encodeURIComponent(params[key])).join("&");
        url += "?" + queryString;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrf_token);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
               // console.log("data--->" + JSON.stringify(data));
               // console.log("data-ip-->" + JSON.stringify(data.data[0].ipaddress));
                var toggleSwitch = document.getElementById('addonSwitch');
                if (data.data[0].ipaddress === editipaddr) {
                    if (data.hasOwnProperty('data') && Array.isArray(data.data) && data.data.length > 0) {
                        toggleSwitch.checked = true;
                        addoncheckmodal();
                        AddonCheckboxes(data);
                        checkboxdata(data.data); // Pass the data array to checkboxdata function
                    } else {
                        toggleSwitch.checked = false;
                    }
                }
                if (successCallback && typeof successCallback === 'function') {
                    successCallback(data);
                }
            } else {
                console.error("Failed to retrieve data: " + xhr.statusText);
            }
        }
    };

    if (method === "GET") {
        xhr.send();
    } else {
        xhr.send(JSON.stringify(params));
    }
}

function toggleServicesId() {
    if (toggleServicesIdCalled) {
        return;
    }
    toggleServicesIdCalled = true;

    if (selectkeyValue === 'Physical' || selectkeyValue === 'VM') {
        fetchDataFromServer(leurl + 'allonboard/getmgmntdata', { ipaddress: editipaddr }, "GET", function (edittoggle) {
           // console.log("edittoggle-ilo-->" + JSON.stringify(edittoggle));
            // Handle specific logic for this case if needed
            // For example, you might want to log the edittoggle data or perform additional operations.
        });
    } else {
        fetchDataFromServer(leurl + 'allonboard/snmpdatatable', { ipaddress: editipaddr }, "GET", function (edittoggles) {
           // console.log("edittoggle-snmp-->" + JSON.stringify(edittoggles));
            // Handle specific logic for this case if needed
            // For example, you might want to log the edittoggles data or perform additional operations.
        });
    }
}

function checkboxdata(dataArray) {
    var selectIloList = [];
   // console.log("check_ip-1-->" + JSON.stringify(dataArray))
    var snmpModelsUpdated = false; // set a flag to determine if snmp_models has been updated
    // Loop through the dataArray
    dataArray.forEach(function (obj) {
        if (obj.prototype === 'ilo') {
           // console.log('This is an ILO prototype:', obj);
            const selectElement = document.getElementById('mgmts_version');
            selectElement.selectedIndex = 1;
            selectElement.dispatchEvent(new Event('change'));
            $('#CreateMgmt #user_name').val(obj.username);
            $('#CreateMgmt #pass_word').val(obj.password);
            $('#CreateMgmt #ilo_ip').val(obj.iloip);
            $('#CreateMgmt #multi-select-ilo').val(obj.ipaddress);
            var jsonObj = {};
            jsonObj["isedit"] = isEdit;
            jsonObj['prototype'] = obj.prototype;
            jsonObj['username'] = obj.username;
            jsonObj['password'] = obj.password;
            jsonObj['iloip'] = obj.iloip;
            jsonObj['port'] = "";
            selectIloList.push(obj.ipaddress);
            jsonObj['selectilo'] = selectIloList;
            jsonObj['threshold'] = "";
            ilomgmt_list.push(jsonObj);
        } else if (obj.prototype === 'idrac') {
          //  console.log('This is a idrac prototype:', obj);
            const selectElement = document.getElementById('idrac_version');
            selectElement.selectedIndex = 1;
            selectElement.dispatchEvent(new Event('change'));
            $('#CreateIdrac #port_ips').val(obj.port);
            $('#CreateIdrac #multi-select-idrac').val(obj.ipaddress);
            var jsonObj = {};
            jsonObj["isedit"] = isEdit;
            jsonObj['prototype'] = obj.prototype;
            jsonObj['username'] = "";
            jsonObj['password'] = "";
            jsonObj['iloip'] = "";
            jsonObj['port'] = obj.port;
            selectIloList.push(obj.ipaddress);
            jsonObj['selectilo'] = selectIloList;
            jsonObj['threshold'] = "";
            idrac_list.push(jsonObj);
        } else if (obj.prototype === 'Node Expo') {
           // console.log('This is a Node Expo prototype:', obj);
            var thresholdValues = {}; // Initialize an empty object
            var matches = obj.threshold.matchAll(/'([^']+)':\s*([^,}]+)/g);
            for (const match of matches) {
                const key = match[1].trim();
                let value = match[2].trim();
                // Convert numerical values to numbers
                if (!isNaN(value)) {
                    value = parseFloat(value);
                }
                thresholdValues[key] = value;
            }
            // Log the extracted threshold values to verify correctness
           // console.log("Node Expo Threshold Values: " + JSON.stringify(thresholdValues));
            const selectElement = document.getElementById('node_version');
            selectElement.selectedIndex = 1;
            selectElement.dispatchEvent(new Event('change'));
            //console.log("checkboxdata-n--->" + JSON.stringify(obj.ipaddress));
            $('#CreateNode #port_nodes').val(obj.port);
            //$('#CreateNode #multi-select-node').val(obj.ipaddress);
            var multiSelectNode = $('#CreateNode #multi-select-node');
            var ipAddress = obj.ipaddress;
            // console.log("checkboxdata-n--->" + ipAddress);
            // Clear previously selected options
            multiSelectNode.val([]);

            // Loop through each option and select the desired option
            multiSelectNode.find('option').each(function () {
                if ($(this).val() === ipAddress) {
                    // console.log("checkboxdata-nn--->" + ipAddress);
                    $(this).prop('selected', true);
                }
            });

            // Trigger any necessary events to update the dropdown's appearance
            multiSelectNode.trigger('change');
            for (var key in thresholdValues) {
                if (thresholdValues.hasOwnProperty(key)) {
                    var inputElement = document.getElementById(key);
                    if (inputElement) {
                        inputElement.value = thresholdValues[key];
                    }
                }
            }
            var jsonObj = {};
            jsonObj["isedit"] = isEdit;
            jsonObj['prototype'] = obj.prototype;
            jsonObj['username'] = "";
            jsonObj['password'] = "";
            jsonObj['iloip'] = "";
            jsonObj['port'] = obj.port;
            selectIloList.push(obj.ipaddress);
            jsonObj['selectilo'] = selectIloList;
            jsonObj['threshold'] = thresholdValues;
            //console.log("node-mgmt--->" + JSON.stringify(jsonObj))
            nodemgmt_list.push(jsonObj);
        } else if (obj.prototype === 'Window Expo') {
            // console.log('This is a Window Expo prototype:', obj);
            var wthresholdValues = {}; // Initialize an empty object
            var wmatches = obj.threshold.matchAll(/'([^']+)':\s*([^,}]+)/g);
            for (const match of wmatches) {
                const key = match[1].trim();
                let value = match[2].trim();
                // Convert numerical values to numbers
                if (!isNaN(value)) {
                    value = parseFloat(value);
                }
                wthresholdValues[key] = value;
            }
            // Log the extracted threshold values to verify correctness
            // console.log("Window Expo Threshold Values: " + JSON.stringify(wthresholdValues));
            const selectElement = document.getElementById('window_version');
            selectElement.selectedIndex = 1;
            selectElement.dispatchEvent(new Event('change'));
            //console.log("checkboxdata-n--->" + JSON.stringify(obj.ipaddress));
            $('#CreateWindow #port_windows').val(obj.port);
            //$('#CreateNode #multi-select-node').val(obj.ipaddress);
            var multiSelectWin = $('#CreateWindow #multi-select-win');
            var ipAddress = obj.ipaddress;
            // console.log("checkboxdata-n--->" + ipAddress);
            // Clear previously selected options
            multiSelectWin.val([]);

            // Loop through each option and select the desired option
            multiSelectWin.find('option').each(function () {
                if ($(this).val() === ipAddress) {
                    // console.log("checkboxdata-nn--->" + ipAddress);
                    $(this).prop('selected', true);
                }
            });

            // Trigger any necessary events to update the dropdown's appearance
            multiSelectWin.trigger('change');
            for (var key in wthresholdValues) {
                if (wthresholdValues.hasOwnProperty(key)) {
                    var inputElement = document.getElementById(key);
                    if (inputElement) {
                        inputElement.value = wthresholdValues[key];
                    }
                }
            }
            var jsonObj = {};
            jsonObj["isedit"] = isEdit;
            jsonObj['prototype'] = obj.prototype;
            jsonObj['username'] = "";
            jsonObj['password'] = "";
            jsonObj['iloip'] = "";
            jsonObj['port'] = obj.port;
            selectIloList.push(obj.ipaddress);
            jsonObj['selectilo'] = selectIloList;
            jsonObj['threshold'] = wthresholdValues;
            //console.log("node-mgmt--->" + JSON.stringify(jsonObj))
            winmgmt_list.push(jsonObj);
        } else if (obj.prototype === 'Nginx Expo') {
           // console.log('This is a Nginx Expo prototype:', obj);
            const selectElement = document.getElementById('nginx_version');
            selectElement.selectedIndex = 1;
            selectElement.dispatchEvent(new Event('change'));
            $('#CreateNginx #port_nginx').val(obj.port);
            $('#CreateNginx #multi-select-nginx').val(obj.ipaddress);
            var jsonObj = {};
            jsonObj["isedit"] = isEdit;
            jsonObj['prototype'] = obj.prototype;
            jsonObj['username'] = "";
            jsonObj['password'] = "";
            jsonObj['iloip'] = "";
            jsonObj['port'] = obj.port;
            selectIloList.push(obj.ipaddress);
            jsonObj['selectilo'] = selectIloList;
            jsonObj['threshold'] = "";
            ngnixmgmt_list.push(jsonObj);
        } else if (obj.version === 'v2c') {
            //console.log('This is a v2c version:', obj);
            $('#snmp_val').css("color", '#55a8fd');
            var snmpthresholdValues = {}; // Initialize an empty object
            var matcheing = obj.snmp_threshold.matchAll(/'([^']+)':\s*([^,}]+)/g);
            for (const match of matcheing) {
                const key = match[1].trim();
                let value = match[2].trim();
                // Convert numerical values to numbers
                if (!isNaN(value)) {
                    value = parseFloat(value);
                }
                snmpthresholdValues[key] = value;
            }
            //console.log("snmpthresholdValues: " + JSON.stringify(snmpthresholdValues));
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
            for (var key in snmpthresholdValues) {
                if (snmpthresholdValues.hasOwnProperty(key)) {
                    var inputElement = document.getElementById(key);
                    if (inputElement) {
                        inputElement.value = snmpthresholdValues[key];
                    }
                }
            }
        } else if (obj.version === 'v3') {
           // console.log('This is a v3 version:', obj);
            $('#snmp_val').css("color", '#55a8fd');
            var snmpthresholdValues = {}; // Initialize an empty object
            var matcheing = obj.snmp_threshold.matchAll(/'([^']+)':\s*([^,}]+)/g);
            for (const match of matcheing) {
                const key = match[1].trim();
                let value = match[2].trim();
                // Convert numerical values to numbers
                if (!isNaN(value)) {
                    value = parseFloat(value);
                }
                snmpthresholdValues[key] = value;
            }
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
            for (var key in snmpthresholdValues) {
                if (snmpthresholdValues.hasOwnProperty(key)) {
                    var inputElement = document.getElementById(key);
                    if (inputElement) {
                        inputElement.value = snmpthresholdValues[key];
                    }
                }
            }
        } else {
            // Code for other prototypes (if needed)
            console.log('This is a different prototype:', obj);
            // Add logic for other prototypes if necessary
        }
    });
}

function AddonCheckboxes(edittoggle) {
    var checkboxes = $('#addon-content input[type="checkbox"]');
   // console.log("edittoggle--->" + JSON.stringify(edittoggle))
   // console.log("selectkeyValue--->" + selectkeyValue)
    checkboxes.each(function () {
        var checkbox = $(this);
        var label = checkbox.parent().find('label');
        var labelText = label.text().trim().toLowerCase(); // Convert label text to lowercase for comparison
       // console.log("labelText--->" + labelText);
        // Find the matching data in the "edittoggle" object based on the checkbox's ID
        var checkboxId = checkbox.attr('id');
       // console.log("checkboxId--->" + checkboxId);
        var matchedData = edittoggle.data.filter(function (data) {
            //console.log("edittoggle.data---->" + JSON.stringify(data))
            return (
                (data.prototype && data.prototype.toLowerCase() === checkboxId.replace('checkbox-', '')) ||
                (data.version && (data.version.toLowerCase() === 'v3' || data.version.toLowerCase() === 'v2c'))
            );
        });
        //console.log("matchedData--->" + JSON.stringify(matchedData))
        if (matchedData.length > 0) {
            // Change the label color to a different color for all matching checkboxes
            label.css('color', 'blue');
            checkbox.prop('checked', true);
        } else {
            // Reset the label color for non-matching checkboxes
            label.css('color', '#6c7293');
            checkbox.prop('checked', false);
        }
        if (
            (['Fortigate', 'Switch', 'router'].some(value => selectkeyValue.includes(value)) && labelText === 'snmp') ||
            (selectkeyValue === 'Physical' && ['ilo', 'idrac', 'node expo', 'window expo', 'nginx expo'].includes(labelText)) ||
            (selectkeyValue === 'VM' && ['node expo', 'nginx expo', 'window expo'].includes(labelText))
           /* (['Fortigate', 'Switch'].includes(selectkeyValue) && labelText === 'snmp') ||
            (selectkeyValue.toLowerCase() === 'physical' && ['ilo', 'idrac', 'node expo'].includes(labelText)) ||
            (selectkeyValue.toLowerCase() === 'vm' && labelText === 'node expo')*/
        ) {
            checkbox.parent().show();
        } else {
            checkbox.parent().hide();
        }
    });
}
function addoncheckmodal() {
    var checkboxData = [
        { label: "ILO", modalId: "mgmtModal" },
        { label: "IDRAC", modalId: "idracModal" },
        { label: "Node Expo", modalId: "nodeModal" },
        { label: "Window Expo", modalId: "windowModal" },
        { label: "Nginx Expo", modalId: "nginxModal" },
        { label: "SNMP", modalId: "snmpModal" }
    ];
    var modalBodyContent = $("#addon-content");
    modalBodyContent.empty(); // Clear existing content before adding new checkboxes
    checkboxData.forEach(function (data) {
        var checkboxId = "checkbox-" + data.label.replace(/\s/g, " ").toLowerCase();
       // console.log("checkboxId---1--->" + checkboxId)
        var checkbox = $("<input>", {
            class: "form-check-input",
            type: "checkbox",
            value: "",
            id: checkboxId
        });
        var label = $("<label>", {
            class: "form-check-label",
            for: checkboxId,
            id: checkboxId,
            text: data.label
        });
        var formCheck = $("<div>", {
            class: "form-check"
        }).append(checkbox, label);
        modalBodyContent.append(formCheck);

        if (data.modalId) {
            checkbox.on("change", function () {
                var modalId = "#" + data.modalId;
                if ($(this).is(":checked")) {
                    $(modalId).modal("show");
                } else {
                    $(modalId).modal("hide");
                }
            });
        }
    });
}

function editFormData() {
    var formData = {};
    $('#displaydata').empty();
    formData.selectModaldetails = {
        pathhost: $('#path-dropdown').val(),
        hostname: $('#hosts-dropdown').val().replace(".yaml", "")
    };
    formData.selectModalipaddress = {
        ipAddress: $('#multi-select-ip').val(),
        subIpAddress: String($('#sub-multi-select-ip').val()).split(','),
    };
    formData.selectModalemail = {
        Email: $('#REUSABLE_EMAIL').val(),
        ApplicationName: $('#GLOBAL_APPLICATION').val()
    };
    formData.selectModaltext = {
        FriendlyName: $('#FRNDLY_NAME').val(),
        physicalIP: $('#PHYSICAL_IP').val()
    };
    formData.selectModalService = {
        service: $('#services-dropdown').val()
    };
    var output = '';
   // console.log("formData-1-->" + JSON.stringify(formData))
    for (var modal in formData) {
        for (var key in formData[modal]) {
            output += '<tr><td>' + key + '</td><td>&nbsp;&nbsp;&nbsp;&nbsp;' + formData[modal][key] + '</td></tr>';
        }
    }

    $('#displaydata').html('<table style="width:100%">' + output + '</table>');
}
/*--------------------  EDIT HOST END --------------------*/
