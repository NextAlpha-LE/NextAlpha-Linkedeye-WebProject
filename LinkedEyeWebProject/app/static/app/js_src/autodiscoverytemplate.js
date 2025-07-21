var clientData = [];
var parsedData;
$(document).ready(function()
{
    $("#dialog-for-autodiscovery #table-view").hide();
    $("#autodiscoverytemplate .auto_input_effect").focus(function () {
		inputFocusIn($(this))
	});
    $('#autodiscoverytemplate .auto_input_effect').focusout(function (e) {
        id = $(this).attr('id');
		if ($(this).val() == '') {
            $('#'+id+'-error-msg').text('Field cannot be empty')
            $('#'+id+'-label').css('color','#ff9eac');
		}
		else {
            value = $('#'+id).val();
            if(value.indexOf('.') > -1)
            {
                $('#'+id+'-error-msg').text('');
              //  $('#'+id+'-label').css('color','#404E67');
            }
            else
            {
                $('#'+id+'-error-msg').text('Invalid IP Format');
                $('#'+id+'-label').css('color','#ff9eac');  
            }
		}
    });
});
function clickOnScanIP()
{
    $("#dialog-for-autodiscovery #table-view").hide()
    $("#autodiscovery-nodata").hide()
    $("#total-data").html(0);
    $('#dialog-for-autodiscovery #addbtn').prop('disabled', true);
    var isInputFilled = checkAllfeildsfilled('auto_input_effect');
    if(!isInputFilled)
    {
        return false;
    }
    var fromIp = $("#frominput").val();
    var toIp = $("#toinput").val();
    if (fromIp.indexOf('.') > -1 && toIp.indexOf('.') > -1)
    {
        var fromTempArray = fromIp.split('.');
        var toTempArray = toIp.split('.');
        if(fromTempArray.length === toTempArray.length)
        {
            var tempLenght = fromTempArray.length;

            var fromLastSegement = parseInt(fromTempArray[tempLenght - 1])
            var toLastSegement = parseInt(toTempArray[tempLenght - 1])

            for(var i = 0; i < tempLenght - 1; i++)
            {
                if(fromTempArray[i] !== toTempArray[i])
                {
                    swal("Invalid IP Range Entered. IP's Entered have to be in same segment", '', "error");
                    return false;
                }
            }

            if(toLastSegement <= fromLastSegement)
            {
                swal({
                    title:'Error',
                    text:"Increase the To range and try again", 
                    type:'error',
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Try again",
                
                });
                return false;
            }
        }
        else
        {
            swal({
                title:'Error',
                text:"Invalid IP range", 
                type:'error',
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Try again",
            });
            return false;
        }
    }
    else
    {
        swal({
            title:'Error',
            text:"Invalid IP format", 
            type:'error',
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Try again",
        
        });
        return false;
    }
    $('#autodiscoverytemplate #submit_scan').attr('data-target',"#dialog-for-autodiscovery");
    requestDataFromServer('/autodiscover/getdiscoverydetails', {from:fromIp, to:toIp}, "GET").done(getAutoDiscoverData);
}

function getAutoDiscoverData(res)
{
    response = JSON.parse(res);
    if(response && response.status == 200)
    {
        parsedData = response.data;
        clientData = parsedData;
        if(parsedData.length == 0)
        {
            $("#dialog-for-autodiscovery #table-view").hide()
            $("#autodiscovery-nodata").show();
            $("#autodiscovery-nodata #tryagainbtn").prop('disabled', false);
            $("#autodiscovery-nodata #nodatamessage").text('No data available'); 
            $("#total-data").html(0);
            $('#dialog-for-autodiscovery #addbtn').prop('disabled', true);
        }
        else
        {
            $("#dialog-for-autodiscovery #table-view").show();
            $("#autodiscovery-nodata").hide()
            $("#total-data").html(parsedData.length);
            $('#dialog-for-autodiscovery #addbtn').prop('disabled', false);
            addDiscoverRows()
        } 
    }
    else
    {
        $("#dialog-for-autodiscovery #table-view").hide();
        $("#autodiscovery-nodata").show()
        $("#autodiscovery-nodata #tryagainbtn").prop('disabled', false);
        $("#autodiscovery-nodata #nodatamessage").text("Something went wrong. Please try again");
        $("#total-data").html(0);
        $('#dialog-for-autodiscovery #addbtn').prop('disabled', true);   
    }
}

function addDiscoverRows()
{
    var html = "";
    var headingHtml = "";
    $.each(parsedData, function(i, json)
	{
        if(i == 0)
        {
            headingHtml += '<tr class="text-uppercase size12 bold-text">';
        }
        
        html += '<tr>';
        $.each(json, function(key, val)
        {
            if(i == 0)
            {
                headingHtml +=  '<td>'+key+'</td>';
            }
            html += '<td>'+val+'</td>';
        });
        if(i == 0)
        {
            headingHtml += '</tr>';
        }
        html += '</tr>';
    });
    $("#dialog-for-autodiscovery .table-head").empty();
    $("#dialog-for-autodiscovery .table-head").append(headingHtml);
    $("#dialog-for-autodiscovery tbody").empty();
    $("#dialog-for-autodiscovery tbody").append(html);
}
function addDataToServer()
{
    if(clientData.length > 0)
    {
        var fromIp = $("#frominput").val();
        var subnet = "";
        if (fromIp.indexOf('.') > -1)
        {
            var fromTempArray = fromIp.split('.');
            for(var i = 0; i < fromTempArray.length - 1; i++)
            {
                if(subnet !== "")
                    subnet += "."
                subnet += fromTempArray[i];
            }
        }
        $('#dialog-for-autodiscovery #addbtn').attr('data-dismiss',"modal");
        requestDataFromServer('/autodiscover/savedata', {'subnet':subnet, 'clientData': JSON.stringify(clientData), csrfmiddlewaretoken: csfr_token }, "POST").done(handleDiscoverResponse);
    }
    else
    {
        swal("Select servers to be added", '', "error");
    }
}

function handleDiscoverResponse(response)
{
    res = JSON.parse(response)
    if(res.status == 200)
    {
        data = res.data;
        /*if(data.hasOwnProperty('stats'))
        {
            swal('Successfully saved data. You can start onboarding the saved servers.', ' ', "success");
            location.reload();
        }*/
        if (data.hasOwnProperty('stats')) {
            swal({
                title: 'Success',
                text: "Successfully saved data. You can start onboarding the saved servers.",
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
        {
            swal({
                title:'Error',
                text:"Not able to save data", 
                type:'error',
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Try again"
            });
        }
    }
    else
    {
        swal({
            title:'Error',
            text:"Something went wrong. Please try again", 
            type:'error',
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Try again"	
        });
    }
}
function reScan()
{
    clickOnScanIP()
}