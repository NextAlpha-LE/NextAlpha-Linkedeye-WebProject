$(document).ready(function () 
{
    getIpAddress();

    $("#submit_scan").click(function()
    {
        var ipaddress = $("#ip-dropdown").val();
        var path = $("#configpath").val();
        requestDataFromServer('gethsconfig', {'ipaddress': ipaddress, 'path': path, csrfmiddlewaretoken: csfr_token }, "POST").done(parseconfigdata);
    });
});
function parseconfigdata(response)
{
    $("#message-view").hide();
    $(".show-div").hide();
    var parsedData = JSON.parse(response);
    if(parsedData.length == 0)
    {
        $("#message-view").show();
        $("#message").html("No Data");
        return false;
    }
    else
    {
        var html = "";
        var headingHtml = "";
        $.each(parsedData, function(i, json)
        {
            if(i == 0)
            {
                headingHtml += '<tr class="table-head">';
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
        $("#table").empty();
        $("#table").append(headingHtml);
        $("#table").append(html);
        $(".show-div").show();
    }
}

function getIpAddress()
{
    requestDataFromServer('../onboard/getiplist', {}, "GET").done(fillIPValues);
}

function fillIPValues(response)
{
    json = JSON.parse(response);
    var html = "<option disabled>Choose IP</option>";
    json.forEach(function(obj)
    {
        var ip = obj["ip"];
        html += '<option value="'+ip+'">'+ip+'</option>';
    });
    $("#ip-dropdown").append(html);
}