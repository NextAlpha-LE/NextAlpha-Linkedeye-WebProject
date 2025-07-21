var elem = document.getElementById("node-view");
function toggleFullScreen() 
{
    var screen = "full";
    if (!elem.fullscreenElement) 
    {
        elem.requestFullscreen();

    } 
    else 
    {
        if (elem.exitFullscreen) 
        {
            screen = "half";
            elem.exitFullscreen();
        }
    }
    reloadgraph(screen);
}

var mini = "true";
function toggleSidebar() 
{
    if (mini) 
    {
        document.getElementById("sidenav").style.width = "210px";
        this.mini = false;
    }
    else 
    {
        document.getElementById("sidenav").style.width = "60px";
        this.mini = true;
    }
}

$(document).ready(function()
{
    $('.container-fluid').click(function () 
    {
        if (mini == false) 
        {
            $("#sidenav").css('width', '60px');
        }
    });
    $("#admin-dropdown").click(function () 
    {
        document.getElementById("sidenav").style.width = "210px";
    });
    $('.btn-triger').click(function () 
    {
        $(this).closest('.float-btn-group').toggleClass('open');
    });
    $(".submenu").click(function () 
    {
        $('.collapse').removeClass('show');
    });
    $("#notification").click(function()
    {
        $('.notification-cont').animate(
        {
            opacity: '1',
            top:'55px'
        },300);
    });
  
});