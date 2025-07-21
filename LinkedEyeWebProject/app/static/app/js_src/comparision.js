var arr = ['fs-dev-asp-rtl-actv1', 'fs-dev-asp-rtl-htspr1', 'fs-uat-p1', 'fs-uat-asp-ifsc1'];

var siteInput = document.getElementById('siteInput');
var siteOptions = document.getElementById('siteOptions');
var filter_json = {};
var div_name=''
// Create dropdown options
/*arr.forEach(function (site) {
    var option = document.createElement('option');
    option.value = site;
    siteOptions.appendChild(option);
});*/

// Submit selection
function submitSelection() {
    var selectedSite = siteInput.value;
    console.log('Selected Site:', selectedSite);
}

function mytimeout() {
   /* $('table').DataTable({
        bPaginate: false,
        bFilter: false,
        rowReorder: true,
        dom: 'Bfrtip',
    });*/
    clearTimeout(mytimeout);
}

function selectGitMaster() {

    $("#option-selection").removeClass("display-block")
    $("#versiongit-selection").addClass("display-block")

    requestDataFromServer('/lesites/getallsitenames', { type: 'userbased', isOnlyEnabled: true }, "GET").done(
        function (response) {
            if (response == undefined)
                return;
            sitesResponse = JSON.parse(response);
            sitesData = sitesResponse['data']
            sortOn(sitesData, "sitename"); // sort the dropdown sitenames in alphabetical
            
            var apphtml = ''
            if (sitesData.length > 0) {
                sitesData.forEach(function (obj) {
                    
                        apphtml += '<option value="' + obj.sitename + '">' + obj.sitename + '</option>'
                    
                });


            }
            $("#selectedgitmastertype").append(apphtml);
        }
    )
    //switchAllDiv('versions')
}

function versioncompareDiv() {
    divname ='versions'
    div_name = divname
    $("#versiongit-selection").removeClass("display-block")
    $("#configmap").addClass("display-block")
    //if (divname == 'config-map') {
        showLoader('configmapdiv')
    var filter_json = {}
    var mastersite = document.getElementById("selectedgitmastertype").value
    //console.log('GIT MASTER SITE is <' + mastersite + '>')
    requestDataFromServer('/comparision/versionCompare', { site: '', filter_json: JSON.stringify(filter_json), type: divname, master: mastersite }, "GET").done(function (response) {
            //console.log('RESPONSE--->' + (response))
            stopLoader('configmapdiv')
            $("#config-map").removeClass("full-height")
            $("#configmapdiv").removeClass("full-height")
            $('#configmapdiv').html(response)
            setTimeout($(".mul-select").select2({
                placeholder: "select sites",
                tags: true,
            }), 3000);
            var table = document.querySelector('table');
            table.id = 'emp-table';
    })
   
}
function switchAllDiv(divname) {
    div_name = divname
    $("#option-selection").removeClass("display-block")
    $("#" + divname).addClass("display-block")
    //if (divname == 'config-map') {
        showLoader('configmapdiv')
        var filter_json = {}
        requestDataFromServer('/comparision/configmapCompare', { site: '', filter_json: JSON.stringify(filter_json) ,type:divname}, "GET").done(function (response) {
            //console.log('RESPONSE--->' + (response))
            stopLoader('configmapdiv')
            $("#config-map").removeClass("full-height")
            $("#configmapdiv").removeClass("full-height")
            $('#configmapdiv').html(response)
            setTimeout($(".mul-select").select2({
                placeholder: "select sites",
                tags: true,
            }), 3000);
            var table = document.querySelector('table');
            table.id = 'emp-table';
        })
   // }
}


//////////////////////////////////////////////////////////////COLUMNS SELECT CODE///////////////////////////////////////////////////////////////////////

// Get unique values for the desired columns

// {2 : ["M", "F"], 3 : ["RnD", "Engineering", "Design"], 4 : [], 5 : []}

function getUniqueValuesFromColumn() {

    var unique_col_values_dict = {}

    allFilters = document.querySelectorAll(".table-filter")
    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute("col-index");
        // alert(col_index)
        const rows = document.querySelectorAll("#emp-table > tbody > tr")

        rows.forEach((row) => {
            cell_value = row.querySelector("td:nth-child(" + col_index + ")").innerHTML;
            // if the col index is already present in the dict
            if (col_index in unique_col_values_dict) {
                // if the cell value is already present in the array
                if (unique_col_values_dict[col_index].includes(cell_value)) {
                    // alert(cell_value + " is already present in the array : " + unique_col_values_dict[col_index])
                } else {
                    unique_col_values_dict[col_index].push(cell_value)
                    // alert("Array after adding the cell value : " + unique_col_values_dict[col_index])

                }

            } else {
                unique_col_values_dict[col_index] = new Array(cell_value)
            }
        });

    });

    for (i in unique_col_values_dict) {
        //alert("Column index : " + i + " has Unique values : \n" + unique_col_values_dict[i]);
    }

    updateSelectOptions(unique_col_values_dict)

};

// Add <option> tags to the desired columns based on the unique values

function updateSelectOptions(unique_col_values_dict) {
    allFilters = document.querySelectorAll(".table-filter")

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        unique_col_values_dict[col_index].forEach((i) => {
            filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
        });

    });
    $(".mul-select").select2({
        placeholder: "select sites",
        tags: true,
    });
};


// Create filter_rows() function

// filter_value_dict {2 : Value selected, 4:value, 5: value}

function filter_rows() {
    const table = document.getElementById('emp-table');
    const dropdowns = table.querySelectorAll('.table-filter');
    filter_json = {}
    showLoader('configmapdiv')
    dropdowns.forEach(function (dropdown) {
        const dropdownName = dropdown.closest('th').querySelector('select').parentElement.childNodes[0].textContent.trim();
        const selectedOptions = Array.from(dropdown.selectedOptions).map(function (option) {
            console.log('OPTION VLUE-->',option.value)
            return option.value;
        }).filter(function (option) {
            return option !== 'all' && option !== '';
        });
        if (selectedOptions != "")
            filter_json[dropdownName] = selectedOptions
       // console.log(dropdownName + ": " + selectedOptions.join(", "));
    }); //console.log('FILTER_JSON--->' + JSON.stringify(filter_json))
    requestDataFromServer('/comparision/configmapCompare', { site: '', filter_json: JSON.stringify(filter_json), type: div_name }, "GET").done(function (response) {
        //console.log('RESPONSE--->' + (response))
        //requestDataFromServer('/comparision/configmapCompare', { leurl: sitesdata["le_url"], isOnlyEnabled: true }, "GET").done(function (response) {
        $('#configmapdiv').empty();
        $('#configmapdiv').html(response)
        setTimeout($(".mul-select").select2({
            placeholder: "select sites",
            tags: true,
        }), 3000);
        var table = document.querySelector('table');
        table.id = 'emp-table';
        stopLoader('configmapdiv')
        //setTimeout(getUniqueValuesFromColumn, 3000);
    })
    //console.log('FILTER_JSON--->' + JSON.stringify(filter_json))
}











//////////////////////////////////////////////////////////////COLUMNS SELECT CODE///////////////////////////////////////////////////////////////////////