var chunkedArray;
var pageNumber = -1;
var clientData = [];
var parsedData;
var uncheckedCount;
var unselectedList;
$(document).ready(function()
{
    $(".show-div").hide();
    fieldValidation();
    $('.input_effect_ad').focusout(function (e) {
        id = $(this).attr('id');
		if ($(this).val() == '') {
            $(this).css('border-color', '#FF7588');
            document.getElementById(id+'-error-msg').innerHTML = 'IP required'
//            document.getElementById(id+'-label').style.color = "#ff9eac";
		}
		else {
            value = $('#'+id).val();
            if(value.indexOf('.') > -1)
            {
                $(this).css('border-color', '#BABFC7');
                document.getElementById(id+'-error-msg').innerHTML = ' ';
//                document.getElementById(id+'-label').style.color = "#404E67";
            }
            else
            {
                $(this).css('border-color', '#FF7588');
                document.getElementById(id+'-error-msg').innerHTML = 'Invalid IP Format'
//                document.getElementById(id+'-label').style.color = "#ff9eac";  
            }
		}
	});
    $("#submit_scan").click(function()
    {
        pageNumber = -1;
        uncheckedCount = 0;
        unselectedList = [];
        var isInputFilled = true;
        $('.input_effect_ad').each(function (e)
	    {
            id = $(this).attr('id');
            if ($(this).val() == '')
            {
                $(this).css('border-color', '#FF7588');
                document.getElementById(id+'-error-msg').innerHTML = 'Field cannot be empty'
                document.getElementById(id+'-label').style.color = "#ff9eac";
                isInputFilled = false;
            }
            else
            {
                $(this).css('border-color', '#BABFC7');
                document.getElementById(id+'-error-msg').innerHTML = ' ';
                document.getElementById(id+'-label').style.color = "#404E67";
            }
        });
        
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

        requestDataFromServer('/autodiscover/getdiscoverydetails', {from:fromIp, to:toIp}, "GET").done(getAutoDiscoverData);
    });
});

function getAutoDiscoverData(res)
{
    response = JSON.parse(res);
    if(response && response.status == 200)
    {
        $("#message-view").hide();
        $(".show-div").hide();
        parsedData = response.data;
        clientData = parsedData;
        if(parsedData.length == 0)
        {
            $("#message-view").show();
            $("#message").html("No Data");
            return false;
        }
        $("#total-div").show();
        $("#total-data").html(parsedData.length);
        if(parsedData.length > 10)
        {
            $("#pagination-div").show();
            $("#pagination").html("1-10 of "+parsedData.length);
        }
        chunkedArray = chunkArray(parsedData, 10);
        pageNumber++;
        pagination();
    }
    else
    {
		 swal({
						title:'Error',
						text:"Something went wrong. Please try again", 
						type:'error',
						showCancelButton: false,
						confirmButtonClass: "btn-danger",
						confirmButtonText: "Try again",
					
					});
    }
}

function pagination()
{
    var html = "";
    var headingHtml = "";
    $.each(chunkedArray[pageNumber], function(i, json)
	{
        var id = (pageNumber * 10) + i;
        if(i == 0)
        {
            headingHtml += '<tr class="table-head">';
           // headingHtml +=     '<td>&nbsp; &nbsp; &nbsp;<i class="icon mdi mdi-checkbox-marked selectAllIClass" onclick="selectAll()" id="selectAll"></i></td>';
            headingHtml +=     '<td><i class="icon mdi mdi-checkbox-marked selectAllIClass" onclick="selectAll()" id="selectAll"></i></td>';
        }
        
        html += '<tr>';
       // html += '<td>&nbsp;&nbsp;&nbsp;<button type="button" class="btn-default checkbox-button" id="' + id +'" style="background: transparent;"><i class="icon mdi mdi-checkbox-marked selectAllIClass" id="'+id+'_i"></i></button></td>';
        html += '<td><button type="button" class="btn-default checkbox-button" id="' + id +'" style="background: transparent;"><i class="icon mdi mdi-checkbox-marked selectAllIClass" id="'+id+'_i"></i></button></td>';
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
    $("#table").empty();
    $("#table").append(headingHtml);
    $("#table").append(html);
    $(".show-div").show();
    registerEvents();
}

function registerEvents()
{
    $(".checkbox-button").click(function()
    {
        var id = $(this).attr('id');
        var needRemovalOfElement = false;
        if($("#"+id+"_i").hasClass("mdi mdi-checkbox-blank-outline"))
        {
            $("#"+id+"_i").removeClass("mdi mdi-checkbox-blank-outline");
            $("#"+id+"_i").addClass("mdi mdi-checkbox-marked");
            uncheckedCount++;
            if(uncheckedCount >=  0)
            {
                if($("#selectAll").hasClass("mdi mdi-checkbox-blank-outline"))
                {
                    $("#selectAll").removeClass("mdi mdi-checkbox-blank-outline");
                    $("#selectAll").addClass("mdi mdi-checkbox-marked")
                }
            }
        }
        else
        {
            $("#"+id+"_i").removeClass("mdi mdi-checkbox-marked");
            $("#"+id+"_i").addClass("mdi mdi-checkbox-blank-outline");
            needRemovalOfElement = true;
            uncheckedCount--;

            if($("#selectAll").hasClass("mdi mdi-checkbox-marked"))
            {
                $("#selectAll").removeClass("mdi mdi-checkbox-marked");
                $("#selectAll").addClass("mdi mdi-checkbox-blank-outline")
            }
        }

        var obj = parsedData[id];
        if(needRemovalOfElement)
        {
            clientData = clientData.filter((item) => item.ip !== obj.ip);
            unselectedList.push(id);
        }
        else
        {
            clientData.push(obj);
            $.each(unselectedList, function(index, val)
	        {
                if(id === val)
                {
                    unselectedList.splice(index, 1);
                    return;
                }
            });
        }
    });

    $.each(unselectedList, function(index, val)
    {
        $("#"+val+"_i").removeClass("mdi mdi-checkbox-marked");
        $("#"+val+"_i").addClass("mdi mdi-checkbox-blank-outline");
    });
}

function previousPagination()
{
    $("#nextPage").removeClass("disabled-link");
    $("#previousPage").removeClass("disabled-link");
    pageNumber--;
    if(pageNumber == 0)
    {
        $("#previousPage").addClass("disabled-link");
    }
    pagination();
}

function nextPagination()
{
    $("#nextPage").removeClass("disabled-link");
    $("#previousPage").removeClass("disabled-link");
    pageNumber++;
    if(pageNumber == (chunkedArray.length - 1))
    {
        $("#nextPage").addClass("disabled-link");
    }
    pagination();
}

function selectAll()
{
    if($("#selectAll").hasClass("mdi mdi-checkbox-blank-outline"))
    {
        $(".selectAllIClass").removeClass("mdi mdi-checkbox-blank-outline");
        $(".selectAllIClass").addClass("mdi mdi-checkbox-marked");
        clientData = parsedData;
        uncheckedCount = 0;
        unselectedList = [];
    }
    else
    {
        $(".selectAllIClass").removeClass("mdi mdi-checkbox-marked");
        $(".selectAllIClass").addClass("mdi mdi-checkbox-blank-outline");
        clientData = [];
        uncheckedCount = parsedData.length * -1;
        unselectedList = [];
        $.each(parsedData, function(index, val)
        {
            unselectedList.push(index+"");
        });
    }
}

function addDataToServer()
{
    // data comes this place
   // console.log("addDataToServer ---->")

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
        requestDataFromServer('/autodiscover/savedata', {'subnet':subnet, 'clientData': JSON.stringify(clientData), csrfmiddlewaretoken: csrf_token }, "POST").done(handleResponses);
    }
    else
    {
        swal("Select servers to be added", '', "error");
    }
}

function handleResponses(response)
{
  //  console.log('handleResponse --->' + response)
    res = JSON.parse(response)
    if(res.status == 200)
    {
        data = res.data;
        /*if(data.hasOwnProperty('stats'))
        {
            $(".show-div").hide();
            $("#message-view").hide();
            $("#pagination-div").hide();
            swal('Successfully saved data. You can start onboarding the saved servers.', ' ', "success");
            $("#message-view").show();
            location.reload();
        }*/
        if (data.hasOwnProperty('stats')) {
            $(".show-div").hide();
            $("#message-view").hide();
            $("#pagination-div").hide();
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
            $("#message-view").show();
        }
        else
        {
			swal({
			    title:'Error',
				text:"Something went wrong. Not able to save data", 
				type:'error',
				showCancelButton: false,
				confirmButtonClass: "btn-danger",
				confirmButtonText: "Try again",
					
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
			confirmButtonText: "Try again",

        });
    }
}