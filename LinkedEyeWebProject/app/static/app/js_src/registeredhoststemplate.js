var totalHosts = 0;
$(document).ready(function () 
{
    getHostDetails();
    $('.add-host').click(function()
    {
        addHost();
    });
});
function getHostDetails()
{
    requestDataFromServer('/allonboard/gethostservicedata', {}, "GET").done(getHostResponse);
}

/*function getHostResponse(response)
{
   // console.log("getHostResponse--->" + response)
    res = JSON.parse(response);
    $('#reg-host-data').empty();
    var html = '';
    if ( res.status == 200)
    {
        var hostDetails = res.data;
        if ( hostDetails.length > 0 )
        {
            totalHosts = hostDetails.length;
            $('#totalHosts').text(totalHosts);
            hostDetails.forEach(function(obj)
            {
               // console.log("getHostResponse--->" + JSON.stringify(obj))
                html += '<div class="card col-4 item">';
              //html +=     '<div class="card-body col-12">';
                html +=     '<div class="col-12">';
                html +=         '<a style="cursor: pointer;" onclick="editHostsRegistered(this)" data-ipaddress="' + obj.address + '">';
                html +=             '<div class="row">';
                html +=                 '<p class="mb-2 col-4 pl-0">Name</p>';
                html +=                 '<p class="bold-text mb-2 col-4">'+obj.friend+'</p>';
                html +=                 '<p class= "col-4"></p>';
                html +=             '</div>';
                html +=             '<div class="row">';
                html +=                 '<p class="mb-2 col-4 pl-0">IP Address</p>';
                html +=                 '<p class="bold-text mb-2 col-4">' + obj.host_name +' ('+obj.server_type+')</p>';
                html +=                 '<p class= "col-4"></p>';
                html +=             '</div>';
                html +=             '<div class="row">';
                html +=                 '<p class="mb-2 col-4 pl-0">Application</p>';
                html +=                 '<p class="bold-text mb-2 col-4">'+obj.application+'</p>';
                html +=                 '<p class= "col-4"></p>';
                html +=             '</div>';
                html +=             '<div class="row">';
                html +=                 '<p class="mb-2 col-4 pl-0">Contact Email</p>';
                html +=                 '<p class="bold-text mb-2 col-4">'+obj.contact_email+'</p>';
                html +=                 '<p class= "col-4"></p>';
                html +=             '</div>';
                html +=         '</a>';
                html +=     '</div>';
                html += '</div>';
            }) 
        }
        else
        {
            $('#totalHosts').text(totalHosts);
            html += '<p class="text-center size12">No Registered Hosts Data...</p>';
        }
        $('#reg-host-data').append(html);
    }
}*/

function getHostResponse(response) {
    // console.log("getHostResponse--->" + response)
    res = JSON.parse(response);
    $('#reg-host-data').empty();
    var html = '';
    if (res.status == 200) {
        var hostDetails = res.data;
        if (hostDetails.length > 0) {
            totalHosts = hostDetails.length;
            $('#totalHosts').text(totalHosts);
            hostDetails.forEach(function (obj) {
                html += '<div class="card col-4 item">';
                html += '<div class="col-12">';
                html += '<a style="cursor: pointer;" onclick="editHostsRegistered(this)" data-ipaddress="' + obj.address + '">';
                html += '<div class="row">';
                html += '<p class="mb-2 col-4 pl-0">Name : <b>' + obj.friend + '</b></p>';
                html += '</div>';
                html += '<div class="row">';
                html += '<p class="mb-2 col-4 pl-0">IP Address :<b>' + obj.host_name + ' (' + obj.server_type + ')</b> </p>';
                html += '</div>';
                html += '<div class="row">';
                html += '<p class="mb-2 col-4 pl-0">Application :<b> ' + obj.application + '</b></p>';
                html += '</div>';
                html += '<div class="row">';
                html += '<p class="mb-2 col-4 pl-0">Contact Email :<b>' + obj.contact_email + '</b> </p>';
                html += '</div>';
                html += '</a>';
                html += '</div>';
                html += '</div>';
            })
        }
        else {
            $('#totalHosts').text(totalHosts);
            html += '<p class="text-center size12">No Registered Hosts Data...</p>';
        }
        $('#reg-host-data').append(html);
    }
}
function addHost()
{
    window.location.href = window.location.origin +'/allonboard/?redirectToAddhostPage';
}

function editHostsRegistered(aObj)
{
    var ipaddress = $(aObj).attr("data-ipaddress");
   // console.log("editHostsRegistered--->" + ipaddress)
    window.location.href = window.location.origin+'/allonboard/?'+ipaddress+'!redirectToEditRegisteredHostsPage';
}