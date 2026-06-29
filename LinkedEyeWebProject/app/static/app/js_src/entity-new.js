
var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
var siteName = params.get("site");
var responseFromServer;
var cyGraph = {};
var zoom = 1;
var titleToId = {};
var wsConnected = false;
var all_Vms = true
var connectionTries = 6;
var Datanodes = "";
var swi_xml_24 = "";
var swi_xml_32 = "";
var swi_xml_24stack = "";
var swi_xml_32stack = "";
var swi_xml_L24T4X_A1 = "";
var swi_xml_S5720_52X = "";
var swi_xml_S6720S_24S = "";
var swi_xml_S6720S_24S_stc = "";
var swi_xml_C2960_48TT = "";
var swi_xml_C2960_48TT_stc = "";
var swi_xml_Cisco_2960 = "";
var swi_xml_L24T4X_A1_stc = "";
var swi_xml_S5720_52X_stc = "";
var swi_xml_Cisco_2960_stc = "";
var swi_xml_48 = "";
var swi_xml_48stack = "";
var swi_xml_SG350X_24 = "";
var swi_xml_SG350X_24_stc = "";
var swi_xml_barracuda = "";
var swi_xml_barracuda_stc = "";
var swi_xml_big_ip = "";
var swi_xml_big_ip_stc = "";
var swi_xml_cisco_2911 = "";
var swi_xml_cisco_2911_stc = "";
var swi_xml_cisco_2921 = "";
var swi_xml_cisco_2921_stc = "";
var swi_xml_cisco_2960 = "";
var swi_xml_cisco_2960_stc = "";
var swi_xml_cisco_3945 = "";
var swi_xml_cisco_3945_stc = "";
var swi_xml_cisco_ftd = "";
var swi_xml_cisco_ftd_stc = "";
var swi_xml_cisco_isr = "";
var swi_xml_cisco_isr_stc = "";
var swi_xml_cisco_nexus = "";
var swi_xml_cisco_nexus_stc = "";
var swi_xml_hpe_sn3600b = "";
var swi_xml_hpe_sn3600b_stc = "";
var swi_xml_netapp_aff = "";
var swi_xml_netapp_aff_stc = "";
var swi_xml_radware_brox10 = "";
var swi_xml_radware_brox10_stc = "";
var swi_xml_C9300X_24HX = "";
var swi_xml_C9300X_24HX_stc = "";
var swi_xml_C9200L_24T = "";
var swi_xml_C9200L_24T_stc = "";
var swi_xml_C9300X_48TX = "";
var swi_xml_C9300X_48TX_stc = "";
var swi_xml_fortigate = "";
var swi_xml_fortigatestack = "";
var swi_xml_fortigate50E = "";
var swi_xml_fortigatestack50E = "";
var swi_xml_fortigate60E = "";
var swi_xml_fortigatestack60E = "";
var swi_xml_fortigate60F = "";
var swi_xml_fortigatestack60F = "";
var swi_xml_fortigate70F = "";
var swi_xml_fortigatestack70F = "";
var swi_xml_fortigatestack80F = "";
var swi_xml_fortigatestack80F = "";
var swi_xml_fortigate100E = "";
var swi_xml_fortigatestack100E = "";
var swi_xml_fortigate100F = "";
var swi_xml_fortigatestack100F = "";
var swi_xml_fortigate200F = "";
var swi_xml_fortigatestack200F = "";
var swi_xml_fortigate120G = "";
var swi_xml_fortigatestack120G = "";
var swi_xml_C9200L_48T = "";
var swi_xml_C9200L_48T_stc = "";
var swi_xml_Aruba_2930F_24G = "";
var swi_xml_Aruba_2930F_24G_stc = "";
var swi_xml_arista_7124sx = "";
var swi_xml_arista_7124sx_stc = "";
var swi_xml_arista_7050x3 = "";
var swi_xml_arista_7050x3_stc = "";
var swi_xml_dell_s5248F = "";
var swi_xml_dell_s5248F_stc = "";
var swi_xml_Cata_1300_48GE = "";
var swi_xml_Cata_1300_48GE_stc = "";

var clientdata;
var switch_ips = [];
var newip = [];
var nicconnect = [];
var arrowdata = [];
var InitialPortStatus = [];
var IndividualPortStatus = [];
var InitialSwitchIcons = [];
var InitialswihardStatus = [];
var InitialSwitchStatus = [];
var InitialhwdivStatus = [];
var criticalStatusCount = {};
var okStatusCount = {};
var pendingStatusCount = {};
var warningStatusCount = {};
var unknownStatusCount = {};
var hardwarebg = '';
var hardwarebgcolorstatus = [];
var adata = [];
var layers = ['g_swi', 'e_swi', 'p_swi', 'f_swi', 'r_swi']
var port_swi = [];
var gcount = 0, ecount = 0, pcount = 0, fcount = 0, rcount = 0;
var map = {};
var xcoor;
var ycoor;
var swiportcounts = {};
var swiips = [];
var observers = [];
var leurl = '';
let options = {
    valueNames: [
        'service',
        'ip',
        'status'
    ]
};
var graphLayout = {
    name: 'cose',
    directed: true,
    padding: 10,
    animate: false,
    fit: true,
    nodeOverlap: 5000,
}
var sitesData = [];
var loaded_switches = {};
entitySelectedsite = ' '
var siteResponse;
var entityResponse;
var sortedJson = {};
var sumsortedJson = {};
var nodeList;
var server_hosts = {};
var server_report;
var niccon_links = {};
var arrow_links = {};
var tog_nicconnect = {};
var tog_arrowdata = {};
var pause_supdate = [];
var entityResourceScope = window.LinkedEyeLifecycle ? window.LinkedEyeLifecycle.scope('entity-new') : null;

function trackEntityListener(target, type, handler, options) {
    if (entityResourceScope && entityResourceScope.trackListener) {
        return entityResourceScope.trackListener(target, type, handler, options);
    }
    if (target && target.addEventListener) {
        target.addEventListener(type, handler, options || false);
    }
    return handler;
}

function trackEntityLineHover(start, end, link) {
    trackEntityListener(start, 'mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
    trackEntityListener(start, 'mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
    trackEntityListener(end, 'mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
    trackEntityListener(end, 'mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
}

function trackEntityScrollPosition(elementId, link) {
    trackEntityListener(document.getElementById(elementId), 'scroll', AnimEvent.add(function () {
        link.position();
    }), false);
}

function trackEntityTimer(timerId) {
    if (entityResourceScope && entityResourceScope.trackTimer) {
        return entityResourceScope.trackTimer(timerId, clearInterval);
    }
    return timerId;
}

function trackEntityObserver(observer) {
    if (entityResourceScope && entityResourceScope.trackObserver) {
        return entityResourceScope.trackObserver(observer);
    }
    observers[observers.length] = observer;
    return observer;
}

function cleanupEntityDynamicResources() {
    if (entityResourceScope && entityResourceScope.cleanup) {
        entityResourceScope.cleanup();
    }
}

$(document).ready(function () {
    var ssitehtml = ''
    ssitehtml += '<li class="nav-item" id="' + params.get("site") + '_li" style="position: relative;"><span class="" style="z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + params.get("site") + '"></span> <a class="bold-text" style="color:#c8c8c8;" data-id="' + params.get("site") + '" id="' + params.get("site") + '" data-toggle="tab" >' + params.get("site") + '&ensp;>&ensp;</a></li><h2 style="font-size:15px;">Domain Status<h2>'
    $("#node-view #site-list").append(ssitehtml)
    requestDataFromServer("../dashboard/getSwitches", { sitename: params.get("site") }, type = "GET").done(switch_onload);
    requestDataFromServer("../dashboard/getstatusAll", { sitename: params.get("site") }, type = "GET").done(setstatusdata);

    getSiteNames();

    if (pageName === "Dashboard") {
        $(".table-node").hide();
        $("#entity-heading").html("Entities");
    }
    else {
        $("#entity-next").hide();
        $("#change-col3-size").removeClass("col-lg-3");
        $("#change-col3-size").addClass("col-lg-4");
        $("#change-col7-size").removeClass("col-lg-7");
        $("#change-col7-size").addClass("col-lg-8");
    }

    $('#table-view').hide();
    $(".icon-node").hide();
    $("#entity-next").click(function () {
        window.location.href = "../entity/";
    });

    $("#export-to-select").change(function () {
        $('.modal-body').tableExport({
            filename: 'table_%DD%-%MM%-%YY%',
            format: $("#export-to-select").val(),
        });
    });
    $(document).on('click', function (e) {
        const $dropdownMenu = $('#portinfo');
        if (!$dropdownMenu.is(e.target) && !(e.target.tagName === 'g') && !(e.target.tagName === 'path') && !(e.target.classList.contains('imgsize')) && !(e.target.classList.contains('mdi-information-outline')) && ($dropdownMenu.css('display') === 'block') && $dropdownMenu.has(e.target).length === 0) {
            $dropdownMenu.css('display', 'none');
        }
    });

    document.getElementById('toggleButton').addEventListener('change', function () {
        // Perform actions when the toggle button is clicked/changed
        if (this.checked) {
            document.getElementById("toggleButton").textContent = 'VM'
            all_Vms = false;
            cleanupEntityDynamicResources();
            Object.keys(niccon_links).forEach(outerKey => {
                var obj = tog_nicconnect[outerKey]
                niccon_links[outerKey].remove()
                var element = '';
                var elem_name = '';
                if (obj['start'].includes('SW_NIC')) {
                    elem_name = obj['start'].replaceAll('SW_NIC', 'NIC')
                    element = document.getElementById('ip_' + elem_name.replaceAll('.', '_'));
                } else {
                    element = document.getElementById(obj['start'].replaceAll('.', '_') + ':SW_NIC');
                }
                var clone = element.cloneNode(true);
                element.parentNode.replaceChild(clone, element);
                if (obj['end'].includes('SW_NIC')) {
                    elem_name = obj['end'].replaceAll('SW_NIC', 'NIC')
                    element = document.getElementById('ip_' + elem_name.replaceAll('.', '_'));

                } else {
                    element = document.getElementById(obj['end'].replaceAll('.', '_') + ':SW_NIC');
                }
                clone = element.cloneNode(true);
                element.parentNode.replaceChild(clone, element);

            })

            Object.keys(arrow_links).forEach(outerKey => { //REMOVING (PORT TO NIC) OR (PORT TO PORT) LEADERLINE
                var obj = tog_arrowdata[outerKey];

                var link = arrow_links[outerKey];
                // Remove scroll event listeners from elements by IDs
                $('#g-switch, #p-switch, #e-switch, #g-div, #s_hw, #server-div, #ps_hw, #vms_hw').off();

                // Remove click event listeners from elements by class names
                $('.icon-evts, .fancy').off();

                var start = (obj['start'].split(':')[0]).replaceAll('.', '_')
                var start_port = (obj['start'].split(':')[1]).replace(/\//g, '_')
                var start_element = (document.getElementsByClassName((start_port + '-' + start))[0])
                var end = obj['end'].replaceAll('.', '_')
                var end_port = ''
                var end_element = ''
                var clone = ''


                if (obj['end'].includes(':')) {
                    end = (obj['end'].split(':')[0]).replaceAll('.', '_')
                    end_port = (obj['end'].split(':')[1]).replace(/\//g, '_')
                    end_element = (document.getElementsByClassName((end_port + '-' + end))[0])
                } else {
                    end = (obj['end']).replaceAll('.', '_')
                    end_element = document.getElementsByClassName(end + ':NIC')[0]
                }
                link.start = start_element;
                link.end = end_element;
                link.remove()
                clone = start_element.cloneNode(true);
                start_element.parentNode.replaceChild(clone, start_element);


                clone = end_element.cloneNode(true);
                end_element.parentNode.replaceChild(clone, end_element);

            })
            const lineElements = document.querySelectorAll('.leader-line, .leader-line-color, .leader-line-cap');
            lineElements.forEach(el => el.remove());
            observers.forEach(observer => observer.disconnect());// remove mutation observer listeners
            observers = []
        } else {
            document.getElementById('vmselectedip').style.display = 'none';
            document.getElementById("toggleButton").textContent = 'ALL'
            document.querySelectorAll('#vms_hw *').forEach(element => {
                element.classList.remove('display_no_vms');
                element.classList.remove('display_vms');
            });
            sortAndGroupElements(psHw);
            sortAndGroupElements(vmsHw);

            // Actions when toggle is OFF
            all_Vms = true;
            Object.keys(tog_nicconnect).forEach(outerKey => {//SERVER NIC LEADERLINE
                var obj = tog_nicconnect[outerKey];
                var start = ';'
                if (document.getElementById(obj['start'].replaceAll(".", "_"))) {
                    start = document.getElementById(obj['start'].replaceAll(".", "_"))
                } else {
                    var start_str = document.getElementsByClassName((obj['start']).replaceAll(".", "_"))
                    start = start_str[0]
                }
                var end = '';
                if (document.getElementById(obj['end'].replaceAll(".", "_"))) {
                    end = document.getElementById(obj['end'].replaceAll(".", "_"))
                } else {
                    var end_str = document.getElementsByClassName((obj['end']).replaceAll(".", "_"))
                    end = end_str[0]
                }

                if (start != null && end != null && end != undefined) {
                    var clr
                    if (obj['status'].toString() == '2') {
                        var link = new LeaderLine(start,
                            end,
                            { hide: true, color: '#16d39a', positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                        );

                        trackEntityLineHover(start, end, link);


                        ////////////////////////////////////MUTATION OBSERVER START/////////////////////////////////////////////////////

                        const nodeViewCard = document.getElementById('node-view-card');
                        const nodeView = document.getElementById('node-view');

                        const observerOptions = {
                            childList: true, // Observe addition/removal of child elements
                            subtree: true, // Observe the entire subtree
                            tree: true,
                        };

                        const createObserver = (element) => {
                            const observer = new MutationObserver((mutationsList) => {
                                for (const mutation of mutationsList) {
                                    if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                        link.position();
                                    } else {
                                        link.position();
                                    }
                                }
                            });
                            observer.observe(element, observerOptions);
                            trackEntityObserver(observer);
                        };

                        createObserver(nodeViewCard);
                        createObserver(nodeView);

                        ////////////////////////////////////MUTATION OBSERVER END/////////////////////////////////////////////////////

                        $('#s_hw, #server-div, #ps_hw, #vms_hw').on('scroll',
                            AnimEvent.add(function () {
                                link.position();
                            })
                        );

                        $('.icon-evts').each(function () {
                            $(this).on('click',
                                AnimEvent.add(function () {
                                    setTimeout(function () {
                                        link.position();
                                    }, 2000);
                                })
                            );
                        });

                        $('.fancy').each(function () {
                            $(this).on('click',
                                AnimEvent.add(function () {
                                    setTimeout(function () {
                                        link.position();
                                    }, 2000);
                                })
                            );
                        });
                        getarrowdata(('s' + (obj['start'].replaceAll(".", "_"))), link)
                        niccon_links[(obj['start'].replaceAll(".", "_"))] = link
                    } else {
                        var b_clr = ''
                        switch (obj['status']) {
                            case 1:
                                clr = '#e59105'
                                b_clr = 'orange'
                                break;
                            case 0:
                                clr = '#ff3d57'
                                b_clr = 'red'
                                break;
                            case 0:
                                clr = '#ffffff'
                                b_clr = 'white'
                                break;
                            default:
                                b_clr = 'grey'
                                clr = '#000000'
                        }

                        var link = new LeaderLine(start,
                            end,
                            { color: clr, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                        );

                        ////////////////////////////////////MUTATION OBSERVER START/////////////////////////////////////////////////////

                        const nodeViewCard = document.getElementById('node-view-card');
                        const nodeView = document.getElementById('node-view');

                        const observerOptions = {
                            childList: true, // Observe addition/removal of child elements
                            subtree: true, // Observe the entire subtree
                            tree: true,
                        };

                        const createObserver = (element) => {
                            const observer = new MutationObserver((mutationsList) => {
                                for (const mutation of mutationsList) {
                                    if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                        link.position();
                                    } else {
                                        link.position();
                                    }
                                }
                            });
                            observer.observe(element, observerOptions);
                            trackEntityObserver(observer);
                        };

                        createObserver(nodeViewCard);
                        createObserver(nodeView);

                        ////////////////////////////////////MUTATION OBSERVER END/////////////////////////////////////////////////////


                        $('#s_hw, #server-div, #ps_hw, #vms_hw').on('scroll',
                            AnimEvent.add(function () {
                                link.position();
                            })
                        );

                        $('.icon-evts').each(function () {
                            $(this).on('click',
                                AnimEvent.add(function () {
                                    setTimeout(function () {
                                        link.position();
                                    }, 2000);
                                })
                            );
                        });

                        $('.fancy').each(function () {
                            $(this).on('click',
                                AnimEvent.add(function () {
                                    setTimeout(function () {
                                        link.position();
                                    }, 2000);
                                })
                            );
                        });
                        getarrowdata(('s' + (obj['start'].replaceAll(".", "_"))), link)
                        niccon_links[(obj['start'].replaceAll(".", "_"))] = link
                    }
                }
            });

            Object.keys(tog_arrowdata).forEach(outerKey => {//ID(n), n.title, n.monitor_status, n.monitor_message, n.type, n.image, n.epoch, n.hostIp,n.overlayIP, n.dashboard, n.link, n.status, n.Friendly_name, n.Nics_list, n.Phy_Physicalip, n.DiskVolumes_list, n.Phy_Physicalniclink

                var obj = tog_arrowdata[outerKey];
                var portid = obj['start'].split(":")[1];
                var start_id = ''
                var start_ip = (obj['start'].split(":")[0]).replaceAll(".", "_")
                var start_port = (obj['start'].split(':'))[1].replace(/\//g, '_')
                var end_ip = ''

                start_id = obj['start'].replaceAll(".", "_")
                if (obj['end'] != 'null' && jQuery.isEmptyObject(obj['end']) != true && obj['end'] != 'none') {
                    var start = (document.getElementsByClassName((start_port + '-' + start_ip)))[0]
                    end_ip = (obj['end'].split(":")[0]).replaceAll(".", "_")

                    var end = '';
                    var end_id = ''
                    if (obj['end'].includes(':') && (document.getElementById((obj['end'].split(":")[0]).replaceAll(".", "_"))) != null) {
                        end_port = (obj['end'].split(":")[1]).replace(/\//g, '_')
                        end = (document.getElementsByClassName((end_port + '-' + end_ip)))[0]
                    } else {
                        var nameelements = document.getElementsByName((obj['end'].split(":")[0]).replaceAll(".", "_") + ':NIC')
                        var classelements = document.getElementsByClassName((obj['end'].split(":")[0]).replaceAll(".", "_") + ':NIC')
                        end = classelements[0];
                    }
                    if (portid != undefined && portid != null && start != null && end != null && end != undefined) {
                        var clr
                        if (obj['status'].toString() == '2') {
                            var scrolldiv = document.getElementById('g-switch')
                            var link = new LeaderLine(start,
                                end,
                                { color: '#16d39a', hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                            );
                            trackEntityLineHover(start, end, link);


                            ////////////////////////////////////MUTATION OBSERVER START/////////////////////////////////////////////////////

                            const nodeViewCard = document.getElementById('node-view-card');
                            const nodeView = document.getElementById('node-view');

                            const observerOptions = {
                                childList: true, // Observe addition/removal of child elements
                                subtree: true, // Observe the entire subtree
                                tree: true,
                            };

                            const createObserver = (element) => {
                                const observer = new MutationObserver((mutationsList) => {
                                    for (const mutation of mutationsList) {
                                        if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                            link.position();
                                        } else {
                                            link.position();
                                        }
                                    }
                                });
                                observer.observe(element, observerOptions);
                                trackEntityObserver(observer);
                            };

                            createObserver(nodeViewCard);
                            createObserver(nodeView);

                            ////////////////////////////////////MUTATION OBSERVER END/////////////////////////////////////////////////////

                            $('#g-switch').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#p-switch').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#e-switch').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#g-div').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#s_hw').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#server-div').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#ps_hw').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#vms_hw').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );
                            $('.icon-evts').each(function () {
                                $(this).on('click',
                                    AnimEvent.add(function () {
                                        setTimeout(function () {
                                            link.position();
                                        }, 2000);
                                    })
                                );
                            });

                            $('.fancy').each(function () {
                                $(this).on('click',
                                    AnimEvent.add(function () {
                                        setTimeout(function () {
                                            link.position();
                                        }, 2000);
                                    })
                                );
                            });
                            arrow_links[start_ip + ':' + portid] = link

                        } else {
                            var b_clr = ''
                            switch (obj['status']) {
                                case 0:
                                    clr = '#ff3d57'
                                    b_clr = 'red'
                                    break;
                                case 1:
                                    clr = '#e59105'
                                    b_clr = 'orange'
                                    break;
                                case 3:
                                    clr = '#ffffff'
                                    b_clr = 'white'
                                    break;

                                default:
                                    b_clr = 'grey'
                                    clr = '#000000'
                            }


                            var link = new LeaderLine(start,
                                end,
                                { color: clr, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                            );

                            ////////////////////////////////////MUTATION OBSERVER START/////////////////////////////////////////////////////

                            const nodeViewCard = document.getElementById('node-view-card');
                            const nodeView = document.getElementById('node-view');

                            const observerOptions = {
                                childList: true, // Observe addition/removal of child elements
                                subtree: true, // Observe the entire subtree
                                tree: true,
                            };

                            const createObserver = (element) => {
                                const observer = new MutationObserver((mutationsList) => {
                                    for (const mutation of mutationsList) {
                                        if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                            link.position();
                                        } else {
                                            link.position();
                                        }
                                    }
                                });
                                observer.observe(element, observerOptions);
                                trackEntityObserver(observer);
                            };

                            createObserver(nodeViewCard);
                            createObserver(nodeView);

                            ////////////////////////////////////MUTATION OBSERVER END/////////////////////////////////////////////////////

                            $('#g-switch').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#p-switch').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#e-switch').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#g-div').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#s_hw').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#server-div').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#ps_hw').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );

                            $('#vms_hw').on('scroll',
                                AnimEvent.add(function () {
                                    link.position();
                                })
                            );
                            $('.icon-evts').each(function () {
                                $(this).on('click',
                                    AnimEvent.add(function () {
                                        setTimeout(function () {
                                            link.position();
                                        }, 2000);
                                    })
                                );
                            });

                            $('.fancy').each(function () {
                                $(this).on('click',
                                    AnimEvent.add(function () {
                                        setTimeout(function () {
                                            link.position();
                                        }, 2000);
                                    })
                                );
                            });
                            arrow_links[start_ip + ':' + portid] = link
                        }

                    }
                }
            });

        }
    });


});


function switch_onload(response) {
    const loaded_switches = {};
    // Process the response to load switches
    const data = response.responseData.response.data;
    if (!data) return;
    // Ensure all switches are loaded properly
    data.forEach(item => {
        if (loaded_switches[item]) {
            return; // Skip if already loaded
        }
        loaded_switches[item] = true;
    });

    // Make synchronous AJAX call to get file contents
    $.ajax({
        url: '/getfilecontents',
        type: 'GET',
        data: { filenames: JSON.stringify(loaded_switches) },
        async: false, // Make this request synchronous
        success: function (response) {
            // Process the response for file contents
            response.forEach(dict => {
                const item = Object.keys(dict)[0];
                const content = dict[item];
                switch (item) {
                    case '24_switch.j2': swi_xml_24 = content; break;
                    case '24_stack_switch.j2': swi_xml_24stack = content; break;
                    case '48_switch.j2': swi_xml_48 = content; break;
                    case '48_stack_switch.j2': swi_xml_48stack = content; break;
                    case 'fortigate_firewall.j2': swi_xml_fortigate = content; break;
                    case 'fortigate_firewall_stack.j2': swi_xml_fortigatestack = content; break;
                    case 'fortigate_firewall_50E.j2': swi_xml_fortigate50E = content; break;
                    case 'fortigate_firewall_stack_50E.j2': swi_xml_fortigatestack50E = content; break;
                    case 'fortigate_firewall_60E.j2': swi_xml_fortigate60E = content; break;
                    case 'fortigate_firewall_stack_60E.j2': swi_xml_fortigatestack60E = content; break;
                    case 'fortigate_firewall_60F.j2': swi_xml_fortigate60F = content; break;
                    case 'fortigate_firewall_stack_60F.j2': swi_xml_fortigatestack60F = content; break;
                    case 'fortigate_firewall_70F.j2': swi_xml_fortigate70F = content; break;
                    case 'fortigate_firewall_stack_70F.j2': swi_xml_fortigatestack70F = content; break;
                    case 'fortigate_firewall_80F.j2': swi_xml_fortigatestack80F = content; break;
                    case 'fortigate_firewall_stack_80F.j2': swi_xml_fortigatestack80F = content; break;
                    case 'fortigate_firewall_100E.j2': swi_xml_fortigate100E = content; break;
                    case 'fortigate_firewall_stack_100E.j2': swi_xml_fortigatestack100E = content; break;
                    case 'fortigate_firewall_100F.j2': swi_xml_fortigate100F = content; break;
                    case 'fortigate_firewall_stack_100F.j2': swi_xml_fortigatestack100F = content; break;
                    case 'fortigate_firewall_200F.j2': swi_xml_fortigate200F = content; break;
                    case 'fortigate_firewall_stack_200F.j2': swi_xml_fortigatestack200F = content; break;
                    case 'fortigate_firewall_120G.j2': swi_xml_fortigate120G = content; break;
                    case 'fortigate_firewall_stack_120G.j2': swi_xml_fortigatestack120G = content; break;
                    case 'router_4321.j2': swi_xml_router_4321 = content; break;
                    case 'Huawei_S5720_32X_EI_AC.j2': swi_xml_32 = content; break;
                    case 'Huawei_S5720_32X_EI_AC_stack.j2': swi_xml_32stack = content; break;
                    case 'Huawei_S5735_L24T4X_A1.j2': swi_xml_L24T4X_A1 = content; break;
                    case 'Huawei_S5735_L24T4X_A1_stack.j2': swi_xml_L24T4X_A1_stc = content; break;
                    case 'Huawei_S5720_52X_LI_AC.j2': swi_xml_S5720_52X = content; break;
                    case 'Huawei_S5720_52X_LI_AC_stack.j2': swi_xml_S5720_52X_stc = content; break;
                    case 'Huawei_S6720S_26Q_EI_24S_AC.j2': swi_xml_S6720S_24S = content; break;
                    case 'Huawei_S6720S_26Q_EI_24S_AC_stack.j2': swi_xml_S6720S_24S_stc = content; break;
                    case 'Cisco_Catalyst_2960_S.j2': swi_xml_Cisco_2960 = content; break;
                    case 'Cisco_Catalyst_2960_S_stack.j2': swi_xml_Cisco_2960_stc = content; break;
                    case 'Cisco_C2960_48TT_L.j2': swi_xml_C2960_48TT = content; break;
                    case 'Cisco_C2960_48TT_L_stack.j2': swi_xml_C2960_48TT_stc = content; break;
                    case 'cisco_SG350X_24.j2': swi_xml_SG350X_24 = content; break;
                    case 'cisco_SG350X_24_stack.j2': swi_xml_SG350X_24_stc = content; break;
                    case 'BARRACUDA_300.j2': swi_xml_barracuda = content; break;
                    case 'BARRACUDA_300_stack.j2': swi_xml_barracuda_stc = content; break;
                    case 'BIG_IP_i4600.j2': swi_xml_big_ip = content; break;
                    case 'BIG_IP_i4600_stack.j2': swi_xml_big_ip_stc = content; break;
                    case 'Cisco_2911.j2': swi_xml_cisco_2911 = content; break;
                    case 'Cisco_2911_stack.j2': swi_xml_cisco_2911_stc = content; break;
                    case 'Cisco_2921.j2': swi_xml_cisco_2921 = content; break;
                    case 'Cisco_2921_stack.j2': swi_xml_cisco_2921_stc = content; break;
                    case 'Cisco_2960_G.j2': swi_xml_cisco_2960 = content; break;
                    case 'Cisco_2960_G_stack.j2': swi_xml_cisco_2960_stc = content; break;
                    case 'Cisco_3945.j2': swi_xml_cisco_3945 = content; break;
                    case 'Cisco_3945_stack.j2': swi_xml_cisco_3945_stc = content; break;
                    case 'Cisco_FTD_2130.j2': swi_xml_cisco_ftd = content; break;
                    case 'Cisco_FTD_2130_stack.j2': swi_xml_cisco_ftd_stc = content; break;
                    case 'Cisco_ISR_1000.j2': swi_xml_cisco_isr = content; break;
                    case 'Cisco_ISR_1000_stack.j2': swi_xml_cisco_isr_stc = content; break;
                    case 'Cisco_Nexus_9000.j2': swi_xml_cisco_nexus = content; break;
                    case 'Cisco_Nexus_9000_stack.j2': swi_xml_cisco_nexus_stc = content; break;
                    case 'HPE_SN3600B_FC.j2': swi_xml_hpe_sn3600b = content; break;
                    case 'HPE_SN3600B_FC_stack.j2': swi_xml_hpe_sn3600b_stc = content; break;
                    case 'NetApp_AFF_A200.j2': swi_xml_netapp_aff = content; break;
                    case 'NetApp_AFF_A200_stack.j2': swi_xml_netapp_aff_stc = content; break;
                    case 'radware_defence_bro_x10.j2': swi_xml_radware_brox10 = content; break;
                    case 'radware_defence_bro_x10_stack.j2': swi_xml_radware_brox10_stc = content; break;
                    case 'Cisco_C9300X_24HX.j2': swi_xml_C9300X_24HX = content; break;
                    case 'Cisco_C9300X_24HX_stack.j2': swi_xml_C9300X_24HX_stc = content; break;
                    case 'Cisco_C9200L_24T_4G.j2': swi_xml_C9200L_24T = content; break;
                    case 'Cisco_C9200L_24T_4G_stack.j2': swi_xml_C9200L_24T_stc = content; break;
                    case 'Cisco_C9200L_48T_4G.j2': swi_xml_C9200L_48T = content; break;
                    case 'Cisco_C9200L_48T_4G_stack.j2': swi_xml_C9200L_48T_stc = content; break;
                    case 'Aruba_2930F_24G_4SFP.j2': swi_xml_Aruba_2930F_24G = content; break;
                    case 'Aruba_2930F_24G_4SFP_stack.j2': swi_xml_Aruba_2930F_24G_stc = content; break;
                    case 'arista_7124sx_960px.j2': swi_xml_arista_7124sx = content; break;
                    case 'arista_7124sx_960px_stack.j2': swi_xml_arista_7124sx_stc = content; break;
                    case 'Dell_s5248F.j2': swi_xml_dell_s5248F = content; break;
                    case 'Dell_s5248F_stack.j2': swi_xml_dell_s5248F_stc = content; break;
                    case 'Cisco_catalys_1300_48_GE.j2': swi_xml_Cata_1300_48GE = content; break;
                    case 'Cisco_catalys_1300_48_GE_stack.j2': swi_xml_Cata_1300_48GE_stc = content; break;
                    case 'Cisco_Catalyst_C9300X_48TX.j2': swi_xml_C9300X_48TX = content; break;
                    case 'Cisco_Catalyst_C9300X_48TX_stack.j2': swi_xml_C9300X_48TX_stc = content; break;
                    case 'Arista_7050X3.j2': swi_xml_arista_7050x3 = content; break;
                    case 'Arista_7050X3_stack.j2': swi_xml_arista_7050x3_stc = content; break;


                    default: console.log(`Unknown item: ${item}`);
                }
            });
        }
    });
    window.switchesLoaded = true; // Set a flag indicating switches are loaded
}

function anim_evtHandler(link) {
    link.position();
    AnimEvent.add(function () {
        link.position();
    })
}
function anim_eventHandler(link) {
    AnimEvent.add(function () {
        setTimeout(function () { link.position(); }, 2000);
    })
}
function getniccondata(start, end, status, data) {
    tog_nicconnect[start.replaceAll('.', '_')] = { 'start': start, 'end': end, 'status': status }
    niccon_links[(start.replaceAll(".", "_"))] = data
}
function updatedarrowdata(start, port, end, status, data) {
    tog_arrowdata[start.replaceAll('.', '_') + ':' + port] = { 'start': start + ':' + port, 'end': end, 'status': status }
    arrow_links[(start.replaceAll(".", "_")) + ':' + port] = data
}
///////////////////////////////////////////////////////////////////////////////////FUNCTION TEST///////////////////////////////////////////////////////////////////////////////////////////
function categorizeColor(color) {
    color = color.replace(/\s/g, '');

    const colorMap = {
        'green': 'rgb(22, 211, 154)',
        'red': 'rgb(255, 61, 87)',
        'white': 'rgb(255, 255, 255)',
        'orange': 'rgb(233, 145, 35)',
        'black': 'rgb(0, 0, 0)'
    };

    if (color in colorMap) {
        return color;
    }

    // Extract the RGB values from the input string
    const rgbMatch = color.match(/\d+/g);
    if (!rgbMatch || rgbMatch.length !== 3) {
        return 'Unknown';
    }
    const [r, g, b] = rgbMatch.map(Number);

    // Find the closest matching color based on RGB values
    let closestColor = 'Unknown';
    let minColorDistance = Number.MAX_VALUE;

    for (const colorName in colorMap) {
        const colorRGB = colorMap[colorName];
        const [cr, cg, cb] = colorRGB.match(/\d+/g).map(Number);
        const distance = Math.sqrt((cr - r) ** 2 + (cg - g) ** 2 + (cb - b) ** 2);

        if (distance < minColorDistance) {
            minColorDistance = distance;
            closestColor = colorName;
        }
    }

    return closestColor;
}

// Function to normalize color values to lowercase format
function getNormalizedColor(color) {
    if (color.startsWith("rgb")) {
        const rgbValues = color.match(/\d+/g);
        if (rgbValues && rgbValues.length === 3) {
            return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
        }
    }
    return color.toLowerCase().trim();
}

// Function to sort elements based on custom criteria
function customSort(a, b) {
    const badgeColorA = getNormalizedColor(a.querySelector('.badge').style.backgroundColor);
    const badgeColorB = getNormalizedColor(b.querySelector('.badge').style.backgroundColor);
    const badgeCountA = parseInt(a.querySelector('.num-data').textContent);
    const badgeCountB = parseInt(b.querySelector('.num-data').textContent);

    if (badgeColorA === badgeColorB) {
        return badgeCountB - badgeCountA; // Sort by badge count in descending order within the same badge color group
    } else {
        return badgeColorSort(badgeColorA, badgeColorB); // Sort by badge color in descending order
    }
}

// Custom sorting function for badge colors
function badgeColorSort(colorA, colorB) {
    const badgeColorOrder = ["red", "orange", "white", "green", "black"];
    return badgeColorOrder.indexOf(colorA) - badgeColorOrder.indexOf(colorB); // Sort by badge color in specified order
}

// Custom sorting function for border colors
function borderColorSort(colorA, colorB) {
    const borderColorOrder = ["red", "orange", "white", "green", "black"];
    return borderColorOrder.indexOf(colorA) - borderColorOrder.indexOf(colorB); // Sort by border color in specified order
}

// Function to sort and group elements
function sortAndGroupElements(container) {
    const elementsToSort = Array.from(container.querySelectorAll('a'));

    // Step 1: Group elements by border color
    const borderGroups = {};
    elementsToSort.forEach((element) => {
        const borderColor = categorizeColor(element.style.borderColor);
        if (!borderGroups[borderColor]) {
            borderGroups[borderColor] = [];
        }
        borderGroups[borderColor].push(element);
    });

    // Step 2: Sort border color groups in specified order
    const sortedBorderGroups = Object.keys(borderGroups)
        .sort(borderColorSort)
        .map((key) => borderGroups[key]);

    // Step 3: Sort and group elements within each border color group by badge color
    sortedBorderGroups.forEach((group) => {
        const badgeGroups = {};

        group.forEach((element) => {
            const badgeColor = getNormalizedColor(element.querySelector('.badge').style.backgroundColor);
            if (!badgeGroups[badgeColor]) {
                badgeGroups[badgeColor] = [];
            }
            badgeGroups[badgeColor].push(element);
        });

        const sortedBadgeGroups = Object.keys(badgeGroups)
            .sort(badgeColorSort)
            .map((key) => badgeGroups[key]);

        // Step 4: Sort and group elements within each badge color group by badge count
        sortedBadgeGroups.forEach((badgeGroup) => {
            const countGroups = {};

            badgeGroup.forEach((element) => {
                const badgeCount = parseInt(element.querySelector('.num-data').textContent);
                if (!countGroups[badgeCount]) {
                    countGroups[badgeCount] = [];
                }
                countGroups[badgeCount].push(element);
            });

            const sortedCountGroups = Object.keys(countGroups)
                .sort((a, b) => b - a) // Sort badge count groups in descending order
                .map((key) => countGroups[key]);

            // Step 5: Sort elements within each badge count group by IP address
            sortedCountGroups.forEach((countGroup) => {
                countGroup.sort((a, b) => {
                    const ipA = extractIP(a.id);
                    const ipB = extractIP(b.id);
                    return compareIPs(ipA, ipB); // Sort IPs in ascending order
                });

                // Append the sorted elements to the container
                countGroup.forEach((element) => container.appendChild(element));
            });
        });
    });
}

// Helper function to extract the IP address from the ID attribute
function extractIP(id) {
    const ipMatch = id.match(/ip_(\d+_\d+_\d+_\d+)/);
    if (ipMatch) {
        return ipMatch[1].split('_').map(Number);
    }
    return [0, 0, 0, 0]; // Default value in case of invalid IP format
}

// Function to compare two IP addresses
function compareIPs(ipA, ipB) {
    for (let i = 0; i < ipA.length; i++) {
        if (ipA[i] !== ipB[i]) {
            return ipA[i] - ipB[i];
        }
    }
    return 0; // IPs are identical
}

// Initialize sorting for elements in containers
const psHw = document.getElementById('ps_hw');
const vmsHw = document.getElementById('vms_hw');

///////////////////////////////////////////////////////////////////////////////////FUNCTION TEST///////////////////////////////////////////////////////////////////////////////////////////
function getSwitchXML() {

    requestDataFromServer('/getfilecontent', { filename: "24_switch.j2" }, "GET").done(function (response) {
        swi_xml_24 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "24_stack_switch.j2" }, "GET").done(function (response) {
        swi_xml_24stack = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "48_switch.j2" }, "GET").done(function (response) {
        swi_xml_48 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "48_stack_switch.j2" }, "GET").done(function (response) {
        swi_xml_48stack = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall.j2" }, "GET").done(function (response) {
        swi_xml_fortigate = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_stack.j2" }, "GET").done(function (response) {
        swi_xml_fortigatestack = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_50E.j2" }, "GET").done(function (response) {
        swi_xml_fortigate50E = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_stack_50E.j2" }, "GET").done(function (response) {
        swi_xml_fortigatestack50E = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_60E.j2" }, "GET").done(function (response) {
        swi_xml_fortigate60E = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_stack_60E.j2" }, "GET").done(function (response) {
        swi_xml_fortigatestack60E = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_60F.j2" }, "GET").done(function (response) {
        swi_xml_fortigate60F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_70F.j2" }, "GET").done(function (response) {
        swi_xml_fortigate70F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_80F.j2" }, "GET").done(function (response) {
        swi_xml_fortigate80F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_stack_80F.j2" }, "GET").done(function (response) {
        swi_xml_fortigatestack80F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_stack_60F.j2" }, "GET").done(function (response) {
        swi_xml_fortigatestack60F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_stack_70F.j2" }, "GET").done(function (response) {
        swi_xml_fortigatestack70F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_100E.j2" }, "GET").done(function (response) {
        swi_xml_fortigate100E = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_stack_100E.j2" }, "GET").done(function (response) {
        swi_xml_fortigatestack100E = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_100F.j2" }, "GET").done(function (response) {
        swi_xml_fortigate100F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_stack_100F.j2" }, "GET").done(function (response) {
        swi_xml_fortigatestack100F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_200F.j2" }, "GET").done(function (response) {
        swi_xml_fortigate200F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_stack_200F.j2" }, "GET").done(function (response) {
        swi_xml_fortigatestack200F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_120G.j2" }, "GET").done(function (response) {
        swi_xml_fortigate120G = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "fortigate_firewall_stack_120G.j2" }, "GET").done(function (response) {
        swi_xml_fortigatestack120G = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "router_4321.j2" }, "GET").done(function (response) {
        swi_xml_router_4321 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Huawei_S5720_32X_EI_AC.j2" }, "GET").done(function (response) {
        swi_xml_32 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Huawei_S5720_32X_EI_AC_stack.j2" }, "GET").done(function (response) {
        swi_xml_32stack = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Huawei_S5735_L24T4X_A1.j2" }, "GET").done(function (response) {
        swi_xml_L24T4X_A1 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Huawei_S5735_L24T4X_A1_stack.j2" }, "GET").done(function (response) {
        swi_xml_L24T4X_A1_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Huawei_S5720_52X_LI_AC.j2" }, "GET").done(function (response) {
        swi_xml_S5720_52X = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Huawei_S5720_52X_LI_AC_stack.j2" }, "GET").done(function (response) {
        swi_xml_S5720_52X_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_Catalyst_2960_S.j2" }, "GET").done(function (response) {
        swi_xml_Cisco_2960 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_Catalyst_2960_S_stack.j2" }, "GET").done(function (response) {
        swi_xml_Cisco_2960_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Huawei_S6720S_26Q_EI_24S_AC.j2" }, "GET").done(function (response) {
        swi_xml_S6720S_24S = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Huawei_S6720S_26Q_EI_24S_AC_stack.j2" }, "GET").done(function (response) {
        swi_xml_S6720S_24S_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_C2960_48TT_L.j2" }, "GET").done(function (response) {
        swi_xml_C2960_48TT = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_C2960_48TT_L_stack.j2" }, "GET").done(function (response) {
        swi_xml_C2960_48TT_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "cisco_SG350X_24.j2" }, "GET").done(function (response) {
        swi_xml_SG350X_24 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "cisco_SG350X_24_stack.j2" }, "GET").done(function (response) {
        swi_xml_SG350X_24_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "BARRACUDA_300.j2" }, "GET").done(function (response) {
        swi_xml_barracuda = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "BARRACUDA_300_stack.j2" }, "GET").done(function (response) {
        swi_xml_barracuda_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "BIG_IP_i4600.j2" }, "GET").done(function (response) {
        swi_xml_big_ip = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "BIG_IP_i4600_stack.j2" }, "GET").done(function (response) {
        swi_xml_big_ip_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_2911.j2" }, "GET").done(function (response) {
        swi_xml_cisco_2911 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_2911_stack.j2" }, "GET").done(function (response) {
        swi_xml_cisco_2911_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_2921.j2" }, "GET").done(function (response) {
        swi_xml_cisco_2921 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_2921_stack.j2" }, "GET").done(function (response) {
        swi_xml_cisco_2921_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_2960_G.j2" }, "GET").done(function (response) {
        swi_xml_cisco_2960 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_2960_G_stack.j2" }, "GET").done(function (response) {
        swi_xml_cisco_2960_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_3945.j2" }, "GET").done(function (response) {
        swi_xml_cisco_3945 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_3945_stack.j2" }, "GET").done(function (response) {
        swi_xml_cisco_3945_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_FTD_2130.j2" }, "GET").done(function (response) {
        swi_xml_cisco_ftd = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_FTD_2130_stack.j2" }, "GET").done(function (response) {
        swi_xml_cisco_ftd_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_ISR_1000.j2" }, "GET").done(function (response) {
        swi_xml_cisco_isr = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_ISR_1000_stack.j2" }, "GET").done(function (response) {
        swi_xml_cisco_isr_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_Nexus_9000.j2" }, "GET").done(function (response) {
        swi_xml_cisco_nexus = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_Nexus_9000_stack.j2" }, "GET").done(function (response) {
        swi_xml_cisco_nexus_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "HPE_SN3600B_FC.j2" }, "GET").done(function (response) {
        swi_xml_hpe_sn3600b = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "HPE_SN3600B_FC_stack.j2" }, "GET").done(function (response) {
        swi_xml_hpe_sn3600b_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "NetApp_AFF_A200.j2" }, "GET").done(function (response) {
        swi_xml_netapp_aff = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "NetApp_AFF_A200_stack.j2" }, "GET").done(function (response) {
        swi_xml_netapp_aff_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "radware_defence_bro_x10.j2" }, "GET").done(function (response) {
        swi_xml_radware_brox10 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "radware_defence_bro_x10_stack.j2" }, "GET").done(function (response) {
        swi_xml_radware_brox10_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_C9300X_24HX.j2" }, "GET").done(function (response) {
        swi_xml_C9300X_24HX = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_C9300X_24HX_stack.j2" }, "GET").done(function (response) {
        swi_xml_C9300X_24HX_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_C9200L_24T_4G.j2" }, "GET").done(function (response) {
        swi_xml_C9200L_24T = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_C9200L_24T_4G_stack.j2" }, "GET").done(function (response) {
        swi_xml_C9200L_24T_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Aruba_2930F_24G_4SFP.j2" }, "GET").done(function (response) {
        swi_xml_Aruba_2930F_24G = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Aruba_2930F_24G_4SFP_stack.j2" }, "GET").done(function (response) {
        swi_xml_Aruba_2930F_24G_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "arista_7124sx_960px.j2" }, "GET").done(function (response) {
        swi_xml_arista_7124sx = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "arista_7124sx_960px_stack.j2" }, "GET").done(function (response) {
        swi_xml_arista_7124sx_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Dell_s5248F.j2" }, "GET").done(function (response) {
        swi_xml_dell_s5248F = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Dell_s5248F_stack.j2" }, "GET").done(function (response) {
        swi_xml_dell_s5248F_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_catalys_1300_48_GE.j2" }, "GET").done(function (response) {
        swi_xml_Cata_1300_48GE = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_catalys_1300_48_GE_stack.j2" }, "GET").done(function (response) {
        swi_xml_Cata_1300_48GE_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_Catalyst_C9300X_48TX.j2" }, "GET").done(function (response) {
        swi_xml_C9300X_48TX = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Cisco_Catalyst_C9300X_48TX_stack.j2" }, "GET").done(function (response) {
        swi_xml_C9300X_48TX_stc = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Arista_7050X3.j2" }, "GET").done(function (response) {
        swi_xml_arista_7050x3 = response;
    });
    requestDataFromServer('/getfilecontent', { filename: "Arista_7050X3_stack.j2" }, "GET").done(function (response) {
        swi_xml_arista_7050x3_stc = response;
    });

}

function getSiteNames() {

    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            siteResponse = res.data;
            leurl = siteResponse[0]['le_url']
        }
        getServerHostData();
    });

}
function statusFunction(select) {
    isCalledStompCon = false;
    var statusType = $(select).attr("aria-controls");
    var ipid = ($(select).attr("id").split("tab")[1])
    if (statusType === "pills-all") {
        cyGraph['s_sw' + ipid].elements().removeClass('semitransp');
        cyGraph['s_sw' + ipid].elements().removeClass('highlight');
        cyGraph['s_sw' + ipid].elements().style({ 'line-color': '#aeaeae', 'target-arrow-color': '#aeaeae' });
    }
    else {
        showLoader('node-view')
        requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": statusType, "mode": '', csrfmiddlewaretoken: csfr_token, selectedSite: entitySelectedsite, ip: ipid }, type = "POST").done(searchNodeResponse);
    }
}
function searchNodes(select) {
    var tags = ($(select).attr("id").split("i_")[1])
    if (($(select).attr("id")).includes('tag')) {
        tags = ($(select).attr("id").split("tag")[1])
    }
    if (document.getElementById("s_sw" + tags).style.display == 'block') {
        var inputValue = $("#tag" + tags).val()
        valueLength = inputValue.trim().length;
        if (valueLength < 2)
            swal("Please enter at least 2 characters", ' ', 'error')
        else {
            showLoader('node-view')
            requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": inputValue, "mode": 'name', csrfmiddlewaretoken: csfr_token, selectedSite: entitySelectedsite, ip: tags }, type = "POST").done(searchNodeResponse);
        }
    }
}

function searchNodeResponse(response) {

    stopLoader('node-view')
    var res = response["nodedetails"];
    if (res.status == 200) {
        var len = res.data.length;
        if (len > 0) {
            var data = {};
            data["nodes"] = response["nodedetails"];
            data["relationships"] = "";
            specificNodeDetails(data);
        }
        else {
            swal("Node/Pod Doesn't Exists", ' ', 'error')
        }
    }
    else {
        swal("Node Doesn't Exists", 'Search like hostIp(172.16.0.2) or hostIp:serviceName(172.16.0.2:Info)', 'error')
    }
}
function specificNodeDetails(response) {
    var testid = 's_swip_' + ((response['nodes'].data[0][7]).replaceAll('.', '_'))
    if (response == undefined) {
        return;
    }
    var responseFromServer = response;
    var nodeResponse = responseFromServer["nodes"]
    if (nodeResponse.status == 200) {
        cyGraph[testid].elements().addClass('semitransp');
        nodeResponse.data.forEach(function (row) {
            var p_name = row[1].split(":")[1]
            var selNode = cyGraph[testid].nodes("[fullname='" + row[1] + "']")
            selNode.removeClass('semitransp');
            selNode.addClass('highlight')
        })
    }
}
class csvExport {
    constructor(table, header = true) {
        this.table = table;
        this.rows = Array.from(table.querySelectorAll("tr"));
        if (!header && this.rows[0].querySelectorAll("th").length) {
            this.rows.shift();
        }
    }

    exportCsv() {
        const lines = [];
        const ncols = this._longestRow();
        for (const row of this.rows) {
            let line = "";
            for (let i = 0; i < ncols; i++) {
                if (row.children[i] !== undefined) {
                    line += csvExport.safeData(row.children[i]);
                }
                line += i !== ncols - 1 ? "," : "";
            }
            lines.push(line);
        }
        return lines.join("\n");
    }
    _longestRow() {
        return this.rows.reduce((length, row) => (row.childElementCount > length ? row.childElementCount : length), 0);
    }
    static safeData(td) {
        let data = td.textContent;
        //Replace all double quote to two double quotes
        data = data.replace(/"/g, `""`);
        //Replace , and \n to double quotes
        data = /[",\n"]/.test(data) ? `"${data}"` : data;
        return data;
    }
}
function create_csv() {
    const tableElement = document.querySelector('.modal-body');
    const obj = new csvExport(tableElement);
    const csvData = obj.exportCsv();
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tableExport.csv";
    a.click();

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 500);
};

function onExport(format) {
    if (format == 'csv') {
        create_csv()
    } else {

        var params = {
            type: format,
            tableName: 'Table name'
        };
        $.extend(true, options, params);

        $('.modal-body').tableExport(options);
    }

}
function swapDivgswi(ele, layer, ip) {
    var inputValue = $("#switag" + layer).val()
    var swapgid = 's' + inputValue.replaceAll('.', '_')
    ele = document.getElementById(swapgid)
    ele.parentNode.insertBefore(ele, document.getElementById(layer).children[0]);

}
function swapDiv(elm, layer = '') {
    let inputValue = ''
    if (layer == 'ps_hw') {
        inputValue = $("#ps_overalltag").val().toLowerCase();
    } else if (layer == 'vms_hw') {
        inputValue = $("#vms_overalltag").val().toLowerCase();
    }

    let parentDiv = document.getElementById(layer); // Get the parent container
    if (!parentDiv) return;

    let children = Array.from(parentDiv.children); // Convert HTMLCollection to array

    let matchingElements = [];
    let nonMatchingElements = [];

    children.forEach(child => {
        let ip = child.id.replace("ip_", "").replace(/_/g, ".").split(":")[0]; // Extract IP address
        let friendlyName = child.getAttribute("data-text").toLowerCase(); // Get friendly name

        // Check if inputValue matches part of IP or friendly name
        if (ip.includes(inputValue) || friendlyName.includes(inputValue)) {
            matchingElements.push(child);
        } else {
            nonMatchingElements.push(child);
        }
    });

    // Reorder the elements in the container, placing matched ones at the beginning
    matchingElements.forEach(el => parentDiv.appendChild(el));
    nonMatchingElements.forEach(el => parentDiv.appendChild(el)); // Append non-matching at the end
}
function swapServers() {
    var nodeList = document.querySelectorAll('.sswcard.critical_opaque');
    var eswiList = document.getElementById('e_swi').getElementsByClassName('critical_opaque');
    var gswiList = document.getElementById('g_swi').getElementsByClassName('critical_opaque');
    var fswiList = document.getElementById('f_swi').getElementsByClassName('critical_opaque');
    var rswiList = document.getElementById('r_swi').getElementsByClassName('critical_opaque');
    var pswiList = document.getElementById('p_swi').getElementsByClassName('critical_opaque');
    Array.from(nodeList).forEach(function (elm) {
        elm.parentNode.insertBefore(elm, document.getElementById('s_hw').children[0]);
    }); Array.from(eswiList).forEach(function (elm) {
        elm.parentNode.insertBefore(elm, document.getElementById('e_swi').children[0]);
    }); Array.from(gswiList).forEach(function (elm) {
        elm.parentNode.insertBefore(elm, document.getElementById('g_swi').children[0]);
    }); Array.from(fswiList).forEach(function (elm) {
        elm.parentNode.insertBefore(elm, document.getElementById('f_swi').children[0]);
    }); Array.from(pswiList).forEach(function (elm) {
        elm.parentNode.insertBefore(elm, document.getElementById('p_swi').children[0]);
    }); Array.from(rswiList).forEach(function (elm) {
        elm.parentNode.insertBefore(elm, document.getElementById('r_swi').children[0]);
    });
}
// table search added
function tableNodes() {
    var filter = $('#myInput').val().toUpperCase();
    $('#accordionExample tr').each(function () {
        var td = $(this).find(".service");
        if (td.length > 0) {
            var txtValue = td.text().toUpperCase();
            if (txtValue.indexOf(filter) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        }
    });
}

function getEntityData(ip) {
    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site"), layer: "s_sw", ip: "ip_" + ip }, type = "GET").done(function (response) {
        fillNodeDetails(response, "ip_" + ip)
    });
}

// HARDWARE FUNCTION ON SWITCH PAGE
function getHardwareData() {

    showLoader("node-view")
    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site"), layer: "s_hw" }, type = "GET").done(fillHWNodeDetails);

}
function thresholdfun(thresip) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", leurl + "allonboard/getmgmntdata?ipaddress=" + encodeURIComponent(thresip), true);

    // Define a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) { // 4 means the request is complete
            if (xhr.status == 200) { // 200 means the request was successful
                var response = JSON.parse(xhr.responseText);
                const modalId = 'thresholdModal_' + thresip.replaceAll('.', '_');
                document.getElementById('thresholdModals_' + thresip.replaceAll('.', '_')).textContent = thresip + ' - Threshold Values';
                // Clear existing modal title
                $("#" + modalId + " .modal-body").empty();

                if (response.status === 200) {
                    // Data is present
                    // Extract "Node Expo" threshold values
                    if (response && response.data && Array.isArray(response.data)) {
                        const nodeExpoThreshold = response.data.find(item => item.prototype === "Node Expo" || item.prototype === "Window Expo");
                        if (nodeExpoThreshold && nodeExpoThreshold.threshold) {
                            const validJSONThreshold = nodeExpoThreshold.threshold.replace(/'/g, '"');
                            const nodeExpoThresholdValues = JSON.parse(validJSONThreshold);

                            // Rest of your code for processing the response...
                            const keyValueContainer = document.createElement('div');
                            keyValueContainer.className = "col-12";
                            for (const key in nodeExpoThresholdValues) {
                                if (nodeExpoThresholdValues.hasOwnProperty(key)) {
                                    const value = nodeExpoThresholdValues[key];
                                    // Check if value is not an empty string
                                    if (value.length !== 0) {
                                        const keyDiv = document.createElement('div');
                                        keyDiv.className = "col-7";
                                        keyDiv.innerHTML = "<p style='margin-left:5%; font-size: 15px;'>" + key + "</p>";

                                        const hiDiv = document.createElement('div');
                                        hiDiv.className = "col-1";
                                        hiDiv.innerHTML = "<p >-</p>";

                                        const valueDiv = document.createElement('div');
                                        valueDiv.className = "col-4";
                                        valueDiv.innerHTML = "<p style='font-size: 15px;'>" + value + "</p>";

                                        const rowDiv = document.createElement('div');
                                        rowDiv.className = "row";
                                        rowDiv.appendChild(keyDiv);
                                        rowDiv.appendChild(hiDiv);
                                        rowDiv.appendChild(valueDiv);

                                        keyValueContainer.appendChild(rowDiv);
                                    }
                                }
                            }

                            // Append the key-value container to the modal body
                            $("#" + modalId + " .modal-body").html(keyValueContainer);
                            $("#" + modalId + " #nodefooter").show();
                        }
                    }
                } else {
                    // Data is not present
                    $("#" + modalId + " .modal-body").html("<p style='font-size: 15px;text-align: center;'>No data in table</p>");
                    $("#" + modalId + " #nodefooter").hide();
                }

                // Show the modal
                $("#" + modalId).modal("show");
            } else {
                // Handle errors
                console.error('Error fetching data:', xhr.statusText);
            }
        }
    };

    // Send the request
    xhr.send();
}
//================================================================SERVER BUTTON TYPE TESTING START====================================================================================//

function openm_func(select, type = '') {
    var id = ($(select).attr("id").split("right")[1])
    if (type == 'multiple') {
        $(".div" + id).hide();
    } else {
        document.getElementById('card' + id).remove()
        var staticBackdrop_elem = ((document.getElementsByClassName('staticBackdrop' + id))[0])
        document.getElementById('thresholdModal' + id.replaceAll('ip_', '_')).remove()
        staticBackdrop_elem.remove()
    }
}
function openServerModal(server_ip) {
    var parentElement = document.getElementById('vms_hw');
    var vmsChildElements = document.getElementsByClassName(server_ip.replaceAll('.', '_') + ':NIC');
    if (all_Vms || (parentElement.contains(vmsChildElements[0]))) {
        if (all_Vms) {
            document.getElementById("no_vm_div").style.display = "none";
            document.querySelectorAll('#vms_hw *').forEach(element => {
                element.classList.remove('display_no_vms');
                element.classList.remove('display_vms');
            });
        }
        var hide_ip = "ip_" + server_ip.replaceAll('.', '_') + ':NIC'
        var icons_res;

        var modal_data = server_hosts[server_ip.replaceAll('_', '.')]
        var divid = "ip_" + modal_data[1].replaceAll('.', '_')
        var thresip = modal_data[1]
        var s_create_html = ''
        var isDivPresent = document.getElementById('card' + divid)
        var ips_list = modal_data[19]
        var reqip_list = []
        if (!isDivPresent) {
            var card_clslist = [];
            if (jQuery.isEmptyObject(ips_list) != true && (ips_list) != null) {

                s_create_html += '<div class="' + "div" + divid + ' mul-fullscreen closable" style="width:88% !important;">'
                s_create_html += '<legend style="display:flex;justify-content:end;"><button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + divid + '" onclick="openm_func(this, \'' + "multiple" + '\')">'
                s_create_html += '<i class="fa fa-times-circle" style="color: #ffffff;font-size: 20px;margin-left: -70%;opacity:0.8"></i>'
                s_create_html += '</button></legend>'
                s_create_html += '<div class="mul-ip-div" style="display: flex;overflow: auto;">'
                Array.from(ips_list).forEach(function (elemt) {
                    array_ip = "ip_" + elemt.replaceAll('.', '_')
                    var nodesip = elemt.replaceAll('.', '_')
                    var nodesid = server_hosts[elemt] ? server_hosts[elemt][0] : ''
                    card_clslist.push('cardip_' + elemt.replaceAll('.', '_'))
                    reqip_list.push("'" + elemt.toString() + "'")

                    criticalStatusCount[array_ip] = 0
                    okStatusCount[array_ip] = 0
                    warningStatusCount[array_ip] = 0
                    unknownStatusCount[array_ip] = 0
                    var btn_elem = document.getElementById(array_ip + ':NIC')
                    var border_clr = categorizeColor((btn_elem.style.borderColor));
                    border_clr = getIcons_clr(border_clr)

                    s_create_html += '<fieldset class="card  sswcard" id="card' + array_ip + '" style="margin-bottom:0;border:1px solid ' + border_clr + '; background-color:#1f1f1f;box-shadow:5px 5px 50px 10px #0e0e0e">'

                    s_create_html += '<legend>'
                    s_create_html += '<p style="margin-left:2%">'
                    s_create_html += '<div class="row">'
                    s_create_html += '<div class="col-7" style="margin-top:2%">'
                    s_create_html += '<p id="nicname' + array_ip + '">' + elemt + '</p>'
                    s_create_html += '</div>'
                    s_create_html += '<div class="col-5 option-icons">'
                    //threshold logic icon
                    s_create_html += '<button type="button" class="btn btn-default btn-ripple sm-hide" id="" onclick="thresholdfun(\'' + thresip + '\')" style="margin-left:1%">'
                    s_create_html += '<i class="mdi mdi-alpha-t-box-outline" id=""  title="" style="color:white;font-size: 16px;"  ></i>'
                    s_create_html += '</button>'
                    s_create_html += '<i class="icon-search" id="no-lens' + array_ip + '" onclick="displayrow(this)" style="margin-left:2%;font-size: 16px;"></i>'
                    s_create_html += '<button type="button" class="btn btn-default btn-ripple sm-hide" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" id="infobtn' + array_ip + '" style="margin-left:1%">'
                    s_create_html += '<i class="mdi mdi-information-outline" id="' + elemt.replaceAll('.', '_') + ':Info"  title="" style="color:white;font-size: 16px;"  ></i>'
                    s_create_html += '</button>'
                    s_create_html += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="tablebtn' + array_ip + '" style="margin-left:-1%">'
                    s_create_html += '<i class="icon-tableview" id="tableview' + array_ip + '"  title="Table view" style="color:white;font-size: 16px;" onclick="displayTable(this)" data-toggle="modal" data-target="#staticBackdrop" friendly-name="' + modal_data[12] + '"></i>'
                    s_create_html += '<i class="icon-node" data-toggle="tooltip" id="nodeview' + array_ip + '" data-placement="top" title="Node view" style="display: none; color:white;font-size: 16px;" onclick="displayTable(this)" data-dismiss="modal" friendly-name="' + modal_data[12] + '"></i>'
                    s_create_html += '</button>'
                    s_create_html += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + array_ip + '" onclick="openm_func(this)" style="display:none" >'
                    s_create_html += '<button id="hardwaresdata' + array_ip + '" style="display:none">'
                    s_create_html += '<div class="dropdown switch-dropdown" style="background-color: #55a8fd;">'
                    s_create_html += '<a class="btn selector dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                    s_create_html += '<span class="fa fa-2x"><i class="icon-dashboard" style="color:#ffffff"></span>'
                    s_create_html += '</a>'
                    s_create_html += '<div class="dropdown-menu dropdown-menu-hw" aria-labelledby="dropdownMenuLink" id="portinfos' + array_ip + '" style="top:-150px !important;"></div>'
                    s_create_html += '</i>'
                    s_create_html += '</button>'
                    s_create_html += '</div>'
                    s_create_html += '</div>'
                    s_create_html += '</p>'
                    s_create_html += '</legend>'

                    // search bar

                    s_create_html += '<div class="row" id="search-row' + array_ip + '" style="margin-left:0%;display:none">'
                    s_create_html += '<div class="" id="entity-search">'
                    s_create_html += '<div class="input-with-icon position-relative" style="color:white">'
                    s_create_html += '<input class="search-input w-100 search" type="search" name="tags"  id="tag' + array_ip + '" placeholder="Search" />'
                    s_create_html += '<i class="icon-search" style="position: inherit; color: white;font-size:18px;" id="i_' + array_ip + '" onclick="searchNodes(this)"></i>'
                    s_create_html += '</div>'
                    s_create_html += '</div>'
                    s_create_html += '<div class="col-2" text-right>'

                    s_create_html += '</div>'
                    s_create_html += '</div>'

                    //search bar

                    s_create_html += '<div class="row" id="' + array_ip + '" style="height: 10%; width: 100% !important">'
                    s_create_html += '</div>'
                    s_create_html += '<div class="row" style="margin-right:0rem;">'
                    s_create_html += '<div class="col-12" id="s_sw' + array_ip + '_opq" style="display:flex;">'
                    s_create_html += '<div class="col-10 cyto-fullscreen" id="s_sw' + array_ip + '" style="height: 420px; width:90%; position:relative; margin-left:5%;display:block">'
                    s_create_html += '<div class="loader" id="loader" style=""><img src="/static/app/images/loading-gif.gif"></div > '//display:none was there previously
                    s_create_html += '</div>'
                    s_create_html += '<div class="col-2 icon-bares mob_hsicon" id="swicons' + array_ip + '" >'
                    //////////////////////
                    s_create_html += '</div>'
                    s_create_html += '</div>'
                    s_create_html += '</div>'

                    // card footer
                    s_create_html += '<div class="pill-contain p-0" style = "z-index: 100;" >'
                    s_create_html += '<div class="row" style="margin-left:0;">'
                    s_create_html += '<ul class="nav nav-pills mb-2" id="pills-tab' + array_ip + '" role="tablist">'
                    s_create_html += ' <button class="nav-item mx-2 ">'
                    s_create_html += '    <a class="nav-link" id="pills-critical-tab' + array_ip + '" data-toggle="pill" href="#pills-critical' + array_ip + '" role="tab" aria-controls="pills-critical" aria-selected="true" onclick="statusFunction(this);">' + criticalStatusCount[array_ip] + '</span></a>'
                    s_create_html += '</button>'
                    s_create_html += '<button class="nav-item mx-2">'
                    s_create_html += '    <a class="nav-link" id="pills-ok-tab' + array_ip + '" data-toggle="pill" href="#pills-ok' + array_ip + '" role="tab" aria-controls="pills-ok" aria-selected="false" onclick="statusFunction(this);">' + okStatusCount[array_ip] + '</span></a>'
                    s_create_html += '</button>'
                    s_create_html += '<button class="nav-item mx-2">'
                    s_create_html += '    <a class="nav-link" id="pills-warning-tab' + array_ip + '" data-toggle="pill" href="#pills-warning' + array_ip + '" role="tab" aria-controls="pills-warning" aria-selected="false" onclick="statusFunction(this);">' + warningStatusCount[array_ip] + '</a>'
                    s_create_html += '</button>'
                    s_create_html += '<button class="nav-item mx-2">'
                    s_create_html += '    <a class="nav-link" id="pills-unknown-tab' + array_ip + '" data-toggle="pill" href="#pills-unknown' + array_ip + '" role="tab" aria-controls="pills-unknown" aria-selected="false" onclick="statusFunction(this);">' + unknownStatusCount[array_ip] + '</a>'
                    s_create_html += '</button>'
                    s_create_html += '<button class="nav-item mx-2">'
                    s_create_html += '    <a class="nav-link active" id="pills-all-tab' + array_ip + '" data-toggle="pill" href="#pills-all' + array_ip + '" role="tab" aria-controls="pills-all" aria-selected="false" onclick="statusFunction(this);">All</a>'
                    s_create_html += '</button>'
                    s_create_html += '</ul >'
                    s_create_html += '</div >'
                    s_create_html += '</div >'

                    s_create_html += '</fieldset>'

                    //////////////////////////////////

                    s_create_html += '<div class="modal fade" id="thresholdModal_' + thresip.replaceAll('.', '_') + '" tabindex="-1" role="dialog" aria-labelledby="thresholdModalLabel" aria-hidden="true" style="overflow-y:hidden !important;top: 20px !important;">'
                    s_create_html += '<div class="modal-dialog" role="document">'
                    s_create_html += '<div class="modal-content thresh-content" style="width: 60%; !important">'
                    s_create_html += '<div class="modal-header">'
                    s_create_html += '<h5 class="modal-title" id="thresholdModals_' + thresip.replaceAll('.', '_') + '"></h5>'
                    s_create_html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="background-color:#1f1f1f;color:white;border: 1px solid #ff0000">'
                    s_create_html += '<span aria-hidden="true">&times;</span>'
                    s_create_html += '</button>'
                    s_create_html += '</div>'
                    s_create_html += '<div class="modal-body">'
                    s_create_html += '</div>'
                    s_create_html += '<div class="modal-footer">'
                    s_create_html += '<p id="nodefooter"><span style="color:red; font-size:15px;">*</span> w (warning), c (Critical), t (Time)</p>'
                    s_create_html += '</div >'
                    s_create_html += '</div>'
                    s_create_html += '</div>'
                    s_create_html += '</div>'

                    //////////////////////////////////

                    s_create_html += '<div class="modal fade closable" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style="overflow-y:hidden !important">'
                    s_create_html += '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >'
                    s_create_html += '<div class="modal-content">'
                    s_create_html += '<div class="modal-header " >'
                    s_create_html += '<h5 class="modal-title col-6" id="staticBackdropLabel">' + elemt.replaceAll('.', '_') + '</h5>'

                    s_create_html += '<div class="col-4" id="entity-search">'
                    s_create_html += '<div class="input-with-icon position-relative" style="color:white">'
                    s_create_html += '<input class="search-input w-100 search" style="width:85% !important" type="search" name="tags" onkeyup="tableNodes()" id="myInput" placeholder="Search" />'
                    s_create_html += '<i class="icon-search" id="data-mobile"></i>'
                    s_create_html += '</div>'
                    s_create_html += '</div>'

                    s_create_html += '<div class="col-1 " id="change-col4-size">'
                    s_create_html += '<div class="dropdown select-btn-dropdown full-select-dropdown mob-data" id="exort-to' + array_ip + '">'
                    s_create_html += '<a class="form-btn btn-dropdown-link select-input-link text-left" \
                    type = "button" style="" id = "dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" \
                    aria-expanded="false" > \
                        <i class="mdi mdi-download" id="exporting" style="color:#ffffff"></i> \
                   </a >'
                    s_create_html += '<div class="dropdown-menu" id="export-to-select" aria-labelledby="dropdownMenuButton">'
                    s_create_html += '<a class="select-link dropdown-item " onclick="onExport("csv")">CSV</a>'
                    s_create_html += '<a class="select-link dropdown-item" onclick="onExport("pdf")">PDF</a>'
                    s_create_html += '<a class="select-link dropdown-item" onclick="onExport("excel")">XLS</a>'
                    s_create_html += '</div>'
                    s_create_html += '</div>'
                    s_create_html += '</div>'
                    s_create_html += '<div class="col-1 " id="" style="margin-left:-2%">'
                    s_create_html += '<button type="button" class="btn btn-default tab-btn" data-toggle="tooltip" data-placement="bottom" title="Refresh" onclick="reloadmodal()">'
                    s_create_html += '<i class="mdi mdi-refresh" id = "" style = "color:#ffffff"></i>'
                    s_create_html += '</button>'
                    s_create_html += '</div>'
                    s_create_html += '<button type = "button" id="nodeview' + array_ip + '" class="btn-close static-close" data-dismiss="modal" aria-label="Close" onclick="displayTable(this)" style="background-color:#1f1f1f;color:white" friendly-name="' + modal_data[12] + '">x</button >'
                    s_create_html += '</div>'
                    s_create_html += '<div class="modal-body" id="refresh-modal" style="padding:0"></div>'

                    s_create_html += '</div>'
                    s_create_html += '</div>'
                    s_create_html += '</div >'
                    /////////////////////////////////

                })
                s_create_html += '</div>'
                s_create_html += '</div>'

            } else {
                criticalStatusCount[divid] = 0
                okStatusCount[divid] = 0
                warningStatusCount[divid] = 0
                unknownStatusCount[divid] = 0
                var btn_elem = document.getElementById(divid + ':NIC')
                var border_clr = categorizeColor((btn_elem.style.borderColor));
                border_clr = getIcons_clr(border_clr)
                var nodesip = modal_data[1].replaceAll('.', '_')
                var nodesid = modal_data[0]
                s_create_html += '<fieldset class="card fullscreen closable sswcard ' + "div" + divid + '" id="card' + divid + '" style="margin-bottom:0;border: 1px solid ' + border_clr + '; background-color:#1f1f1f;box-shadow:5px 5px 50px 10px #0e0e0e">'
                s_create_html += '<legend>'
                s_create_html += '<p style="margin-left:2%">'
                s_create_html += '<div class="row">'
                s_create_html += '<div class="col-7" style="margin-top:2%">'
                s_create_html += '<p id="nicname' + divid + '">' + modal_data[1] + '</p>'
                s_create_html += '</div>'
                s_create_html += '<div class="col-5 option-icons">'
                //threshold logic icon
                s_create_html += '<button type="button" class="btn btn-default btn-ripple sm-hide" id="" onclick="thresholdfun(\'' + thresip + '\')" style="margin-left:1%">'
                s_create_html += '<i class="mdi mdi-alpha-t-box-outline" id=""  title="" style="color:white;font-size: 16px;"  ></i>'
                s_create_html += '</button>'
                s_create_html += '<i class="icon-search" id="no-lens' + divid + '" onclick="displayrow(this)" style="margin-left:2%;font-size: 16px;"></i>'
                s_create_html += '<button type="button" class="btn btn-default btn-ripple sm-hide" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" id="infobtn' + divid + '" style="margin-left:1%">'
                s_create_html += '<i class="mdi mdi-information-outline" id="' + modal_data[1].replaceAll('.', '_') + ':Info"  title="" style="color:white;font-size: 16px;"  ></i>'
                s_create_html += '</button>'
                s_create_html += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="tablebtn' + divid + '" style="margin-left:-1%">'
                s_create_html += '<i class="icon-tableview" id="tableview' + divid + '"  title="Table view" style="color:white;font-size: 16px;" onclick="displayTable(this)" data-toggle="modal" data-target="#staticBackdrop" friendly-name="' + modal_data[12] + '"></i>'
                s_create_html += '<i class="icon-node" data-toggle="tooltip" id="nodeview' + divid + '" data-placement="top" title="Node view" style="display: none; color:white;font-size: 16px;" onclick="displayTable(this)" data-dismiss="modal" friendly-name="' + modal_data[12] + '"></i>'
                s_create_html += '</button>'
                s_create_html += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + divid + '" onclick="openm_func(this)" style="display:none" >'
                s_create_html += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + divid + '" onclick="openm_func(this)">'
                s_create_html += '<i class="fa fa-window-close" style="color: #ffffff;font-size: 16px;margin-left: -70%;"></i>'
                s_create_html += '</button>'
                s_create_html += '<button id="hardwaresdata' + divid + '" style="display:none">'
                s_create_html += '<div class="dropdown switch-dropdown" style="background-color: #55a8fd;">'
                s_create_html += '<a class="btn selector dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                s_create_html += '<span class="fa fa-2x"><i class="icon-dashboard" style="color:#ffffff"></span>'
                s_create_html += '</a>'
                s_create_html += '<div class="dropdown-menu dropdown-menu-hw" aria-labelledby="dropdownMenuLink" id="portinfos' + divid + '" style="top:-150px !important;"></div>'
                s_create_html += '</i>'
                s_create_html += '</button>'
                s_create_html += '</div>'
                s_create_html += '</div>'
                s_create_html += '</p>'
                s_create_html += '</legend>'

                // search bar

                s_create_html += '<div class="row" id="search-row' + divid + '" style="margin-left:0%;display:none">'
                s_create_html += '<div class="" id="entity-search">'
                s_create_html += '<div class="input-with-icon position-relative" style="color:white">'
                s_create_html += '<input class="search-input w-100 search" type="search" name="tags"  id="tag' + divid + '" placeholder="Search" />'
                s_create_html += '<i class="icon-search" style="position: inherit; color: white;font-size:18px;" id="i_' + divid + '" onclick="searchNodes(this)"></i>'
                s_create_html += '</div>'
                s_create_html += '</div>'
                s_create_html += '<div class="col-2" text-right>'

                s_create_html += '</div>'
                s_create_html += '</div>'

                //search bar

                s_create_html += '<div class="row" id="' + divid + '" style="height: 10%; width: 100% !important">'
                s_create_html += '</div>'
                s_create_html += '<div class="row" style="margin-right:0rem;">'
                s_create_html += '<div class="col-12" id="s_sw' + divid + '_opq" style="display:flex;">'
                s_create_html += '<div class="col-10 cyto-fullscreen" id="s_sw' + divid + '" style="height: 420px; width:90%; position:relative; margin-left:5%;display:block">'
                s_create_html += '<div class="loader" id="loader" style=""><img src="/static/app/images/loading-gif.gif"></div > '//display:none was there previously
                s_create_html += '</div>'
                s_create_html += '<div class="col-2 icon-bares mob_hsicon" id="swicons' + divid + '" >'
                //////////////////////
                s_create_html += '</div>'
                s_create_html += '</div>'
                s_create_html += '</div>'

                // card footer
                s_create_html += '<div class="pill-contain p-0" style = "z-index: 100;" >'
                s_create_html += '<div class="row" style="margin-left:0;">'
                s_create_html += '<ul class="nav nav-pills mb-2" id="pills-tab' + divid + '" role="tablist">'
                s_create_html += ' <button class="nav-item mx-2 ">'
                s_create_html += '    <a class="nav-link" id="pills-critical-tab' + divid + '" data-toggle="pill" href="#pills-critical' + divid + '" role="tab" aria-controls="pills-critical" aria-selected="true" onclick="statusFunction(this);">' + criticalStatusCount[divid] + '</span></a>'
                s_create_html += '</button>'
                s_create_html += '<button class="nav-item mx-2">'
                s_create_html += '    <a class="nav-link" id="pills-ok-tab' + divid + '" data-toggle="pill" href="#pills-ok' + divid + '" role="tab" aria-controls="pills-ok" aria-selected="false" onclick="statusFunction(this);">' + okStatusCount[divid] + '</span></a>'
                s_create_html += '</button>'
                s_create_html += '<button class="nav-item mx-2">'
                s_create_html += '    <a class="nav-link" id="pills-warning-tab' + divid + '" data-toggle="pill" href="#pills-warning' + divid + '" role="tab" aria-controls="pills-warning" aria-selected="false" onclick="statusFunction(this);">' + warningStatusCount[divid] + '</a>'
                s_create_html += '</button>'
                s_create_html += '<button class="nav-item mx-2">'
                s_create_html += '    <a class="nav-link" id="pills-unknown-tab' + divid + '" data-toggle="pill" href="#pills-unknown' + divid + '" role="tab" aria-controls="pills-unknown" aria-selected="false" onclick="statusFunction(this);">' + unknownStatusCount[divid] + '</a>'
                s_create_html += '</button>'
                s_create_html += '<button class="nav-item mx-2">'
                s_create_html += '    <a class="nav-link active" id="pills-all-tab' + divid + '" data-toggle="pill" href="#pills-all' + divid + '" role="tab" aria-controls="pills-all" aria-selected="false" onclick="statusFunction(this);">All</a>'
                s_create_html += '</button>'
                s_create_html += '</ul >'
                s_create_html += '</div >'
                s_create_html += '</div >'

                s_create_html += '</fieldset>'

                //////////////////////////////////

                s_create_html += '<div class="modal fade" id="thresholdModal_' + thresip.replaceAll('.', '_') + '" tabindex="-1" role="dialog" aria-labelledby="thresholdModalLabel" aria-hidden="true" style="overflow-y:hidden !important;top: 20px !important;">'
                s_create_html += '<div class="modal-dialog" role="document">'
                s_create_html += '<div class="modal-content thresh-content" style="width: 60%; !important">'
                s_create_html += '<div class="modal-header">'
                s_create_html += '<h5 class="modal-title" id="thresholdModals_' + thresip.replaceAll('.', '_') + '"></h5>'
                s_create_html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="background-color:#1f1f1f;color:white;border: 1px solid #ff0000">'
                s_create_html += '<span aria-hidden="true">&times;</span>'
                s_create_html += '</button>'
                s_create_html += '</div>'
                s_create_html += '<div class="modal-body">'
                s_create_html += '</div>'
                s_create_html += '<div class="modal-footer">'
                s_create_html += '<p nodefooter><span style="color:red; font-size:15px;">*</span> w (warning), c (Critical), t (Time)</p>'
                s_create_html += '</div >'
                s_create_html += '</div>'
                s_create_html += '</div>'
                s_create_html += '</div>'

                //////////////////////////////////
                s_create_html += '<div class="modal fade closable staticBackdropip_' + modal_data[1].replaceAll('.', '_') + '" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style="overflow-y:hidden !important">'
                s_create_html += '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >'
                s_create_html += '<div class="modal-content">'
                s_create_html += '<div class="modal-header " >'
                s_create_html += '<h5 class="modal-title col-6" id="staticBackdropLabel">' + modal_data[1].replaceAll('.', '_') + '</h5>'

                s_create_html += '<div class="col-4" id="entity-search">'
                s_create_html += '<div class="input-with-icon position-relative" style="color:white">'
                s_create_html += '<input class="search-input w-100 search" style="width:85% !important" type="search" name="tags" onkeyup="tableNodes()" id="myInput" placeholder="Search" />'
                s_create_html += '<i class="icon-search" id="data-mobile"></i>'
                s_create_html += '</div>'
                s_create_html += '</div>'

                s_create_html += '<div class="col-1 " id="change-col4-size">'
                s_create_html += '<div class="dropdown select-btn-dropdown full-select-dropdown mob-data" id="exort-to' + divid + '">'
                s_create_html += '<a class="form-btn btn-dropdown-link select-input-link text-left" \
                                type = "button" style="" id = "dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" \
                                aria-expanded="false" > \
                                    <i class="mdi mdi-download" id="exporting" style="color:#ffffff"></i> \
                               </a >'
                s_create_html += '<div class="dropdown-menu" id="export-to-select" aria-labelledby="dropdownMenuButton">'
                s_create_html += '<a class="select-link dropdown-item " onclick="onExport(\'' + "csv" + '\')">CSV</a>'
                s_create_html += '<a class="select-link dropdown-item" onclick="onExport(\'' + "pdf" + '\')">PDF</a>'
                s_create_html += '<a class="select-link dropdown-item" onclick="onExport(\'' + "excel" + '\')">XLS</a>'
                s_create_html += '</div>'
                s_create_html += '</div>'
                s_create_html += '</div>'
                s_create_html += '<div class="col-1 " id="" style="margin-left:-2%">'
                s_create_html += '<button type="button" class="btn btn-default tab-btn" data-toggle="tooltip" data-placement="bottom" title="Refresh" onclick="reloadmodal()">'
                s_create_html += '<i class="mdi mdi-refresh" id = "" style = "color:#ffffff"></i>'
                s_create_html += '</button>'
                s_create_html += '</div>'
                s_create_html += '<button type = "button" id="nodeview' + divid + '" class="btn-close static-close" data-dismiss="modal" aria-label="Close" onclick="displayTable(this)" style="background-color:#1f1f1f;color:white" friendly-name="' + modal_data[12] + '">x</button >'
                s_create_html += '</div>'
                s_create_html += '<div class="modal-body" id="refresh-modal" style="padding:0"></div>'

                s_create_html += '</div>'
                s_create_html += '</div>'
                s_create_html += '</div >'
                /////////////////////////////////
            }

            $('#table-view' + divid).hide();
            $(".icon-node" + divid).hide();

            $('#node-view-card').append(s_create_html);
            if (modal_data[12]) {
                friendlyname = modal_data[1] + ' ( ' + modal_data[12] + ' )'
                document.getElementById('nicname' + divid).textContent = friendlyname
                document.getElementById('nicname' + divid).style.backgroundColor = '#1f1f1f'
                document.getElementById('nicname' + divid).style.borderRadius = '7px'
                document.getElementById('nicname' + divid).style.width = 'fit-content'

            }
            ((document.getElementsByClassName("div" + divid))[0]).classList.add(...card_clslist);

            showLoader('s_swip_' + modal_data[1].replace('.', '_'))
            if (jQuery.isEmptyObject(ips_list) != true && (ips_list) != null) {
                Array.from(ips_list).forEach(function (elemt) {

                    getEntityData(elemt.replaceAll('.', '_'))
                })
            } else {
                getEntityData(modal_data[1].replaceAll('.', '_'))
                reqip_list.push("'" + server_ip.toString() + "'")
            }

            $(".search-input").on("keyup", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    searchNodes(event.target);
                }
            });
            requestDataFromServer("../dashboard/getIconspecificnodes", { sitename: params.get("site"), ip: '[' + (reqip_list) + ']' }, type = "GET").done(function (response) {
                icons_res = response;
                var icons_resp = response.responseData[0].nodes_data.icons.data

                icons_resp.forEach(function (row) {

                    var ip = ''
                    var state = ''
                    if (row[1].includes(':')) {
                        ip = 'ip_' + (row[1].split(":")[0]).replaceAll('.', '_')
                    } else {
                        ip = 'ip_' + row[1].replaceAll('.', '_')
                    }
                    state = row[11]
                    if (criticalStatusCount[ip] == undefined || criticalStatusCount[ip] == null) {

                        criticalStatusCount[ip] = 0;
                    }
                    if (okStatusCount[ip] == undefined || okStatusCount[ip] == null) {
                        okStatusCount[ip] = 0
                    }
                    if (pendingStatusCount[ip] == undefined || pendingStatusCount[ip] == null) {
                        pendingStatusCount[ip] = 0
                    }
                    if (warningStatusCount[ip] == undefined || warningStatusCount[ip] == null) {
                        warningStatusCount[ip] = 0
                    }
                    if (unknownStatusCount[ip] == undefined || unknownStatusCount[ip] == null) {
                        unknownStatusCount[ip] = 0
                    }

                    if (state == 2) {
                        okStatusCount[ip] += 1;
                    } else if (state == 0) {
                        criticalStatusCount[ip] += 1;
                    } else if (state == 3) {
                        unknownStatusCount[ip] += 1;
                    } else if (state == 1) {
                        warningStatusCount[ip] += 1;
                    }

                    if (criticalStatusCount[ip] == 0) {
                        $("#pills-critical-tab" + ip).html("Critical (" + criticalStatusCount[ip] + ")");
                    }
                    else {

                        var swapid = "card" + ip
                        elm = document.getElementById(swapid)
                        elm.parentNode.insertBefore(elm, document.getElementById('s_hw').children[0]); $('#pills-critical-tab' + ip).attr('onclick', 'statusFunction(this)');
                        $("#pills-critical-tab" + ip).html('<span class="bold-text red">Critical(' + criticalStatusCount[ip] + ')</span>');
                    }
                    if (okStatusCount[ip] == 0) {
                        $("#pills-ok-tab" + ip).html("Ok (" + okStatusCount[ip] + ")");
                    }
                    else {
                        $('#pills-ok-tab' + ip).attr('onclick', 'statusFunction(this)');
                        $("#pills-ok-tab" + ip).html('<span class="bold-text green">Ok(' + okStatusCount[ip] + ')</span>');
                    }

                    if (pendingStatusCount[ip] == 0) {
                        $("#pills-pending-tab" + ip).html("Pending (" + pendingStatusCount[ip] + ")");
                    }
                    else {
                        $('#pills-pending-tab' + ip).attr('onclick', 'statusFunction(this)');
                        $("#pills-pending-tab" + ip).html('<span class="bold-text pending-text">Pending(' + pendingStatusCount[ip] + ')</span>');
                    }


                    if (warningStatusCount[ip] == 0) {
                        $("#pills-warning-tab" + ip).html("Warning (" + warningStatusCount[ip] + ")");
                    }
                    else {
                        $('#pills-warning-tab' + ip).attr('onclick', 'statusFunction(this)');
                        $("#pills-warning-tab" + ip).html('<span class="bold-text warning">Warning(' + warningStatusCount[ip] + ')</span>');
                    }

                    if (unknownStatusCount[ip] == 0) {
                        $("#pills-unknown-tab" + ip).html("Unknown (" + unknownStatusCount[ip] + ")");
                    }
                    else {
                        $('#pills-unknown-tab' + ip).attr('onclick', 'statusFunction(this)');
                        $("#pills-unknown-tab" + ip).html('<span class="bold-text " style="color:white">Unknown(' + unknownStatusCount[ip] + ')</span>');
                    }

                    var nodesid = row[0]
                    var nodesip = (row[1].split(":")[0]).replaceAll('.', '_')
                    var imagetype = (row[1].split(":")[1])
                    var pinid = (row[1]).replaceAll('.', '_') + '_tooltip'
                    //console.log("getIcons_clr---->"+row)
                    var icon_clr = getIcons_clr(row[11], row[18], row[6])
                    var _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + (row[1]).replaceAll('.', '_') + '" id="' + (row[1]).replaceAll('.', '_') + '" name="' + (row[1]).replaceAll('.', '_') + '" src="/static/images/' + row[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid ' + icon_clr + ';background-color: ' + icon_clr + '"/><span class="tooltiptexts" id="' + (row[1]).replaceAll('.', '_') + '_tooltip"  style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll"><p>' + ((row[5]).split(".")[0]) + '</p></span></div>'

                    if ((imagetype != 'Processes') && (imagetype != 'Info') && (imagetype)) {

                        //////////////--------------------------------NEW TOOLTIP CREATION-------------------------------------//////////////

                        var cls_list = (row[1]).replaceAll('.', '_')
                        var stats_list = {}
                        try {
                            var stats_list = JSON.parse(row[17])
                        }
                        catch (err) {
                            console.log('<----GETTING ERROR----> ' + err);
                        }
                        if ((stats_list) != null && (row[17]) != null && (stats_list) != '' && Object.keys(stats_list).length && jQuery.isEmptyObject(stats_list) != true) {

                            var tooltp_txt = '<table>';
                            var tooltp_default = ''
                            var stats_arr = [0, 1, 2, 3]
                            var stats_clr = ['red', 'orange', 'green', 'white']
                            stats_arr.forEach(function (item, index) {
                                item = item.toString();
                                if (item in stats_list) {
                                    for (const [key, value] of Object.entries(stats_list[item])) {

                                        cls_list = cls_list + ' ' + key.replaceAll('.', '_') + ':' + imagetype
                                        tooltp_default += '<tr style="color:' + stats_clr[item] + '"><td id="' + key.replaceAll('.', '_') + ':' + imagetype + '" >' + key + ' - </td> <td>' + value + '</td></tr>'

                                    }

                                }
                            });
                            tooltp_txt += tooltp_default
                            tooltp_txt += '</table>'

                            _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (row[1]).replaceAll('.', '_') + '" name="' + (row[1]).replaceAll('.', '_') + '" src="/static/images/' + row[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid ' + icon_clr + ';background-color: ' + icon_clr + '"/><span class="tooltiptexts row" id="' + (row[1]).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:max-content !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;"><div class="col-10" style="padding-left:0" >' + ((row[5]).split(".")[0]) + '</div><i class=" col-2 mdi mdi-pin-outline" id="' + pinid + 'tltp-pin" style=" z-index:1000;padding: 0;" onclick="pintool(\'' + pinid + '\')"></i>' + tooltp_txt + '</span></div>'

                        } else {

                            _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (row[1]).replaceAll('.', '_') + '" name="' + (row[1]).replaceAll('.', '_') + '" src="/static/images/' + row[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid ' + icon_clr + ';background-color:' + icon_clr + '"/><span class="tooltiptexts" id="' + (row[1]).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;">' + ((row[5]).split(".")[0]) + '<br></span></div>'

                        }

                        //////////////--------------------------------NEW TOOLTIP CREATION-------------------------------------//////////////

                        if (imagetype.includes('SW_')) {
                            $('#swicons' + ip).append(_nodehtml);
                        } else {

                            $('#' + ip).append(_nodehtml);
                        }
                    }

                    if (row[1] == ((row[1].split(":")[0])) + ":Info") {
                        var infoid = row[0]
                        var infoip = (row[1].split(":")[0]).replaceAll('.', '_')
                        // Updated to use unique ID and ONLY show menu (removing redundant listener)
                        var infoBtn = document.getElementById('infobtnip_' + infoip);
                        if (infoBtn) {
                            infoBtn.setAttribute('onclick', "openOnImageClick(this, '" + infoid + "','" + infoip + "',event)");
                        }
                    }
                })
            });
            showLoader("ps_hw")
        } else {
            $("#card" + divid).show();
            $(".card" + divid).show();
            $(".div" + divid).show();
        }

    } else {

        document.getElementById('vmselectedip').innerText = 'Showing VMs for Physical Server ( ' + server_ip + ' )';

        document.getElementById('vmselectedip').style.display = 'block';
        var timeDelay = 10000;       // DELAY IN MILLISECONDS (OR SIMPLY, 5 SECONDS DELAY).
        setTimeout(clearContents, timeDelay);

        function clearContents() {
            document.getElementById('vmselectedip').style.display = 'none';
        }

        var no_vm_count = document.querySelectorAll('#vms_hw .display_no_vms').length;
        var actual_vm_count = (document.getElementById('vms_hw').childElementCount)
        document.querySelectorAll('#vms_hw .fancy').forEach(element => {
            if (element.classList.contains('phy_' + server_ip.replaceAll('.', '_'))) {
                element.classList.remove('display_no_vms');
                if (!(element.classList.contains('display_vms'))) {
                    element.classList.add('display_vms');
                }
            } else {
                element.classList.remove('display_vms');
                if (!(element.classList.contains('display_no_vms'))) {
                    element.classList.add('display_no_vms');
                }
            }
        });
        no_vm_count = document.querySelectorAll('#vms_hw .display_no_vms').length;
        actual_vm_count = (document.getElementById('vms_hw').childElementCount)
        if (no_vm_count == actual_vm_count) {
            document.getElementById("no_vm_div").style.display = "block";
        } else {
            document.getElementById("no_vm_div").style.display = "none";
        }
    }
}
function reloadmodal() {
    var modal = document.querySelector("#staticBackdrop");
    if (!modal) {
        return;
    }
    var modalBody = modal.querySelector(".modal-body");
    if (!modalBody) {
        return;
    }
    var fragment = document.createDocumentFragment();
    // Clone the current content and append it to the fragment
    Array.from(modalBody.childNodes).forEach(function (node) {
        fragment.appendChild(node.cloneNode(true));
    });
    modalBody.innerHTML = "<div>Please wait, content is refreshing...</div>";
    setTimeout(function () {
        modalBody.innerHTML = "";
        modalBody.appendChild(fragment);
    }, 500); // Adjust the delay as needed
}

function setstatusdata(response) {
    if (response['responseData'][0]['code'] == 500) {
        server_report = {
        }
        swal({
            title: 'FAILURE!',
            text: 'Server Status Data 500 Error',
            type: "warning",
            confirmButtonClass: "btn-danger",
            closeOnConfirm: true
        })
    } else {
        server_report = response['responseData'][0]['status_data']['Status_data']['data']
    }
}
function getServerHostData() {

    showLoader("node-view")
    requestDataFromServer("../dashboard/getNicConnectnodes", { sitename: params.get("site") }, type = "GET").done(nicconnectFetch);
    requestDataFromServer("../dashboard/getHostnodes", { sitename: params.get("site") }, type = "GET").done(createServerButtons);
}

function nicconnectFetch(response) {
    if (response.responseData.length > 0) {
        response.responseData.forEach(function (obj, index) {
            responseFromServer = obj.nicconnect_data
            if (Object.keys(responseFromServer).length > 0) {
                var nodeResponse = responseFromServer["Nicconnect"]
                if (nodeResponse.status == 200 && nodeResponse.data.length > 0) {
                    nodeResponse.data.forEach(function (row) {
                        tog_nicconnect[row[1].replaceAll('.', '_')] = { 'start': row[1], 'end': row[16], 'status': row[11] }
                        nicconnect.push(row)
                    });
                }
            }
        });
    }
}
function createServerButtons(response) {
    const randomCharacters = Math.random().toString(36).substring(2, 5);
    if (response == undefined)
        return;
    entityResponse = response.responseData;
    if (response.responseData.length > 0) {
        var tempObj = {}
        var pservercount = 0;
        var vmservercount = 0;
        response.responseData.forEach(function (obj, index) {
            responseFromServer = obj.nodes_data
            if (Object.keys(responseFromServer).length > 0) {
                var nodeResponse = responseFromServer["hosts"]
                if (nodeResponse.status == 200 && nodeResponse.data.length > 0) {
                    nodeResponse.data.forEach(function (row) {
                        server_hosts[row[1]] = row
                        var ip = ''
                        var state = ''
                        if (row[1].includes(':')) {
                            ip = 'ip_' + (row[1].split(":")[0]).replaceAll('.', '_')
                        } else {
                            ip = 'ip_' + row[1].replaceAll('.', '_')
                        }
                        state = row[11]
                        var stat_server = server_report[row[1].toString()] || {}

                        var tooltpHtml = '<div class="badgetltp-data ">'
                        if (!(stat_server['0'] == undefined) && (stat_server['0'] > 0)) {
                            tooltpHtml += '<div class="badgetltp-elem" style="color:red;font-weight:bold">' + stat_server['0'] + '</div>'
                        } if (!(stat_server['1'] == undefined) && (stat_server['1'] > 0)) {
                            tooltpHtml += '<div class="badgetltp-elem" style="color:orange;font-weight:bold">' + stat_server['1'] + '</div>'
                        } if (!(stat_server['3'] == undefined) && (stat_server['3'] > 0)) {
                            tooltpHtml += '<div class="badgetltp-elem" style="font-weight:bold;color:grey">' + stat_server['3'] + '</div>'
                        } if (!(stat_server['2'] == undefined) && (stat_server['2'] > 0)) {
                            tooltpHtml += '<div class="badgetltp-elem" style="color:green;font-weight:bold">' + stat_server['2'] + '</div>'
                        } if (!(stat_server['4'] == undefined) && (stat_server['4'] > 0)) {
                            tooltpHtml += '<div class="badgetltp-elem" style="background-color:#1f1f1f;color:white;border:0.5px solid grey">' + stat_server['4'] + '</div>'
                        }

                        tooltpHtml += '</div>'
                        var badgeHtml = ''
                        if (!(stat_server['0'] == undefined) && (stat_server['0'] > 0)) {
                            badgeHtml += '<span  class="badgetltp badge "  style="background-color:red" id="badge' + ip + '" ><i class="mdi icon-data mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + stat_server['0'] + '</div></span>'
                        } else if (!(stat_server['1'] == undefined) && (stat_server['1'] > 0)) {
                            badgeHtml += '<span  class="badgetltp  badge "  style="background-color:orange" id="badge' + ip + '" ><i class="mdi icon-data  mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + stat_server['1'] + '</div></span>'
                        } else if (!(stat_server['3'] == undefined) && (stat_server['3'] > 0)) {
                            badgeHtml += '<span  class="badgetltp  badge "  style="background-color:white;color:grey"  id="badge' + ip + '" ><i class="mdi icon-data  mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + stat_server['3'] + '</div></span>'
                        } else if (!(stat_server['2'] == undefined) && (stat_server['2'] > 0)) {
                            badgeHtml += '<span  class="badgetltp  badge "  style="background-color:green"  id="badge' + ip + '" ><i class="mdi icon-data  mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + stat_server['2'] + '</div></span>'
                        } else if (!(stat_server['4'] == undefined) && (stat_server['4'] > 0)) {
                            badgeHtml += '<span  class="badgetltp  badge "  style="background-color:#121212;color:white" id="badge' + ip + '" ><i class="mdi icon-data  mdi-arrow-left-drop-circle">' + tooltpHtml + '</i><div class="num-data">' + stat_server['4'] + '</div></span>'
                        }

                        if (criticalStatusCount[ip] == undefined || criticalStatusCount[ip] == null) {

                            criticalStatusCount[ip] = 0;
                        }
                        if (okStatusCount[ip] == undefined || okStatusCount[ip] == null) {
                            okStatusCount[ip] = 0
                        }
                        if (pendingStatusCount[ip] == undefined || pendingStatusCount[ip] == null) {
                            pendingStatusCount[ip] = 0
                        }
                        if (warningStatusCount[ip] == undefined || warningStatusCount[ip] == null) {
                            warningStatusCount[ip] = 0
                        }
                        if (unknownStatusCount[ip] == undefined || unknownStatusCount[ip] == null) {
                            unknownStatusCount[ip] = 0
                        }

                        if (state == 2) {
                            okStatusCount[ip] += 1;
                        } else if (state == 0) {
                            criticalStatusCount[ip] += 1;
                        } else if (state == 3) {
                            unknownStatusCount[ip] += 1;
                        } else if (state == 1) {
                            warningStatusCount[ip] += 1;
                        }
                        if (entitySelectedsite == ' ') {
                            entitySelectedsite = obj.site
                        }

                        if (typeof (row[11] == 'string'))
                            var state = parseInt(row[11])
                        else
                            var state = row[11]

                        var b_color;
                        if (state === 0) {
                            tempObj['isSuccess'] = false
                            if (entitySelectedsite == ' ') {
                                entitySelectedsite = obj.site
                            }
                            b_color = '#ff3d57'//'red'
                        }
                        if (state === 2) {
                            b_color = '#16d39a'//'green'
                        }
                        if (state === 1) {
                            b_color = '#e99123'//orange
                        }
                        if (state === 3) {
                            b_color = '#ffffff'//'white'
                        }
                        if (state === 4) {
                            b_color = '#000000'//'black'
                        }

                        var server_html = ''
                        var btn_divid = 'ip_' + row[1].replaceAll('.', '_')
                        var phy_serv_ip = 'phy_' + row['14'].replaceAll('.', '_')
                        server_html += '<a class=" fancy ' + row[1].replaceAll('.', '_') + ':SW_NIC ' + row[1].replaceAll('.', '_') + ':NIC ' + phy_serv_ip + '" data-text="' + row[12] + '" onclick="openServerModal(\'' + row[1] + '\')" id="' + btn_divid + ':NIC" style="border:2px solid ' + b_color + '">  ' + badgeHtml + '  <span class="top-key" ></span><div class="">' + row[1] + '</br>' + (row[12] != '' ? '(' + row[12] + ')' : row[12]) + '</div><span class="bottom-key-1"></span><span class="bottom-key-2"></span>  </a >'//fancy button test

                        if (row[17] == 'physical') {
                            pservercount++
                            $('#ps_hw').append(server_html)
                            $("#node-view #entity-search").css('visibility', 'visible');
                            $("#node-view #ps_hw").css('display', 'flex');
                            $("#pslayer-heading").show();
                        } else if (row[17] == 'virtualmachine') {
                            vmservercount++
                            $('#vms_hw').append(server_html)
                            $("#vmslayer-heading").css('display', 'flex');
                        }
                    });
                }
                else {
                    tempObj['isSuccess'] = false
                }
            }
            else {
                tempObj['isSuccess'] = false
            }
            sitesData.push(tempObj)
        });
        makeWebSocConnectionk8(siteResponse[0].websocket_url, tempObj['site'], 0, 0, randomCharacters)

        makeWebSwitchConnection(siteResponse[0].websocket_url, tempObj['site'], 0, randomCharacters)

        var obj = entityResponse[0] //.filter(x => x.site === entitySelectedsite)[0]

        if (obj && obj.code === 200 && obj.nodes_data.hosts.data.length > 0) {
            if (pservercount) {
                var srch_row = 'pserversearch-row'
                $('#physical-servers-heading').html('<div class="row row-width" style="margin:unset">PHYSICAL SERVERS<div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + pservercount + '</div><i class="icon-search icon-evts hide-val' + srch_row + '" id="no-lens" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>');
                $('#physical-servers-heading').append('<div class="row" id="pserversearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="ps_overalltag" placeholder="Search" /><i class="icon-search icon-evts" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDiv(this, \'' + "ps_hw" + '\')"></i><i class="icon-close icon-evts" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></div></div><div class="col-2" text-right></div></div>');

            }
            if (vmservercount) {
                var srch_row = 'vmserversearch-row'
                $('#virtual-servers-heading').html('<div class="row row-width" style="margin:unset">VIRTUAL MACHINES <div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + vmservercount + '</div><i class="icon-search icon-evts hide-val' + srch_row + '" id="no-lens" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>');
                $('#virtual-servers-heading').append('<div class="row" id="vmserversearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="vms_overalltag" placeholder="Search" /><i class="icon-search icon-evts" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDiv(this, \'' + "vms_hw" + '\')"></i><i class="icon-close icon-evts" id="icon-close " onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></div></div><div class="col-2" text-right></div></div>');

            }

            sortAndGroupElements(psHw);
            sortAndGroupElements(vmsHw);

            waitForSwitchesToLoad().then(function () {
                return switchs();
            }).then(function () {
                nicconnect.forEach(function (obj) {//SERVER NIC LEADERLINE
                    var start = ';'
                    if (document.getElementById(obj[1].replaceAll(".", "_"))) {
                        start = document.getElementById(obj[1].replaceAll(".", "_"))
                    } else {
                        var start_str = document.getElementsByClassName((obj[1]).replaceAll(".", "_"))
                        start = start_str[0]
                    }
                    var end = '';
                    if (document.getElementById(obj[16].replaceAll(".", "_"))) {
                        end = document.getElementById(obj[16].replaceAll(".", "_"))
                    } else {
                        var end_str = document.getElementsByClassName((obj[16]).replaceAll(".", "_"))
                        end = end_str[0]
                    }

                    if (start != null && end != null && end != undefined) {
                        var clr
                        if (obj[11].toString() == '2') {
                            var link = new LeaderLine(start,
                                end,
                                { hide: true, color: '#16d39a', positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                            );

                            trackEntityLineHover(start, end, link);

                            $('#s_hw, #server-div, #ps_hw, #vms_hw').on('scroll', AnimEvent.add(function () {
                                link.position();
                            })
                            );

                            $('.icon-evts').each(function () {
                                $(this).on('click',
                                    AnimEvent.add(function () {
                                        setTimeout(function () {
                                            link.position();
                                        }, 2000);
                                    })
                                );
                            });
                            $('.fancy').each(function () {
                                $(this).on('click',
                                    AnimEvent.add(function () {
                                        setTimeout(function () {
                                            link.position();
                                        }, 2000);
                                    })
                                );
                            });

                            getarrowdata(('s' + (obj[1].replaceAll(".", "_"))), link)
                            niccon_links[(obj[1].replaceAll(".", "_"))] = link
                        } else {
                            var b_clr = ''
                            switch (obj[11]) {
                                case 1:
                                    clr = '#e59105'
                                    b_clr = 'orange'
                                    break;
                                case 0:
                                    clr = '#ff3d57'
                                    b_clr = 'red'
                                    break;
                                case 3:
                                    clr = '#ffffff'
                                    b_clr = 'white'
                                    break;
                                default:
                                    b_clr = 'grey'
                                    clr = '#000000'
                            }

                            var link = new LeaderLine(start,
                                end,
                                { color: clr, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                            );
                            $('#s_hw, #server-div, #ps_hw, #vms_hw').on('scroll', AnimEvent.add(function () {
                                link.position();
                            })
                            );

                            $('.icon-evts').each(function () {
                                $(this).on('click',
                                    AnimEvent.add(function () {
                                        setTimeout(function () {
                                            link.position();
                                        }, 2000);
                                    })
                                );
                            });

                            $('.fancy').each(function () {
                                $(this).on('click',
                                    AnimEvent.add(function () {
                                        setTimeout(function () {
                                            link.position();
                                        }, 2000);
                                    })
                                );
                            });

                            getarrowdata(('s' + (obj[1].replaceAll(".", "_"))), link)
                            niccon_links[(obj[1].replaceAll(".", "_"))] = link
                        }
                    }
                });

                for (let index = 0; index < layers.length; index++) {
                    arrowdata[index].forEach(function (obj) {
                        var portid = ""
                        if (obj[1].includes(':')) {
                            portid = (obj[1].split(":")[1]).replace(/\//g, '_');
                        }
                        var l = layers[index].split("_")[0]
                        var start_id = obj[7].replaceAll(".", "_") //ADDED FOR TESTING
                        if ((obj[10] != 'null' && jQuery.isEmptyObject(obj[10]) != true && obj[10] != 'none')) {
                            var start = (document.getElementsByClassName((portid + '-' + start_id))[0])
                            var end = '';
                            var end_id = (obj[10].split(":")[0]).replaceAll(".", "_") //ADDED FOR TESTING
                            var end_port = ''
                            if (obj[10].includes(':')) {
                                end_port = (obj[10].split(":")[1]).replace(/\//g, '_')
                            }
                            tog_arrowdata[obj[7].replaceAll('.', '_') + ':' + (obj[1].split(":")[1])] = { 'start': obj[1], 'end': obj[10], 'status': obj[11] }
                            if (obj[10].includes(':') && (document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_"))) != null) {
                                var end = (document.getElementsByClassName((end_port + '-' + end_id))[0])
                            } else {
                                var nameelements = document.getElementsByName((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC')
                                var classelements = document.getElementsByClassName((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC')
                                end = classelements[0];

                            }
                            observeElements(portid, start_id, end_port, end_id, function (start, end) {
                                if (obj[5] == 'port' && portid != undefined && portid != null && start != null && end != null && end != undefined) {
                                    var clr
                                    if (obj[11].toString() == '2') {
                                        var scrolldiv = document.getElementById('g-switch')
                                        var link = new LeaderLine(start,
                                            end,
                                            { color: '#16d39a', hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                        );
                                        trackEntityLineHover(start, end, link);

                                        $('#g-switch').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#p-switch').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#e-switch').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#g-div').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#s_hw').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#server-div').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#ps_hw').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#vms_hw').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );
                                        $('.icon-evts').each(function () {
                                            $(this).on('click',
                                                AnimEvent.add(function () {
                                                    setTimeout(function () {
                                                        link.position();
                                                    }, 2000);
                                                })
                                            );
                                        });

                                        $('.fancy').each(function () {
                                            $(this).on('click',
                                                AnimEvent.add(function () {
                                                    setTimeout(function () {
                                                        link.position();
                                                    }, 2000);
                                                })
                                            );
                                        });
                                        getarrowdata(('l' + (obj[7].replaceAll(".", "_")) + portid), link)
                                        arrow_links[(obj[7].replaceAll(".", "_")) + ':' + (obj[1].split(':'))[1]] = link
                                    } else {
                                        var b_clr = ''
                                        switch (obj[11]) {
                                            case 0:
                                                clr = '#ff3d57'
                                                b_clr = 'red'
                                                break;
                                            case 1:
                                                clr = '#e59105'
                                                b_clr = 'orange'
                                                break;
                                            case 3:
                                                clr = '#ffffff'
                                                b_clr = 'white'
                                                break;

                                            default:
                                                b_clr = 'grey'
                                                clr = '#000000'
                                        }
                                        var link = new LeaderLine(start,
                                            end,
                                            { color: clr, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                        );

                                        $('#g-switch').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#p-switch').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#e-switch').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#g-div').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#s_hw').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#server-div').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#ps_hw').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );

                                        $('#vms_hw').on('scroll',
                                            AnimEvent.add(function () {
                                                link.position();
                                            })
                                        );
                                        $('.icon-evts').each(function () {
                                            $(this).on('click',
                                                AnimEvent.add(function () {
                                                    setTimeout(function () {
                                                        link.position();
                                                    }, 2000);
                                                })
                                            );
                                        });
                                        ////////////////////////////////////MUTATION OBSERVER END/////////////////////////////////////////////////////
                                        $('.fancy').each(function () {
                                            $(this).on('click',
                                                AnimEvent.add(function () {
                                                    setTimeout(function () {
                                                        link.position();
                                                    }, 2000);
                                                })
                                            );
                                        });
                                        getarrowdata(('l' + (obj[7].replaceAll(".", "_")) + portid), link)
                                        arrow_links[(obj[7].replaceAll(".", "_")) + ':' + (obj[1].split(':'))[1]] = link

                                    }

                                } else {
                                    //console.log('(9) ELSE - condition failed ---> ' + start_id)
                                }
                            });
                        }
                    });
                }

                stopLoader("node-view")
            });


            $('.badge').hover(function () {
                $(this).addClass('transp-badge');
                $(this).find('.icon-data').show();
                $(this).find('.num-data').hide();
            }, function () {
                $(this).removeClass('transp-badge');
                $(this).find('.icon-data').hide();
                $(this).find('.num-data').show();
            });

        } else if (obj && obj.code === 200 && obj.nodes_data.hosts.data.length === 0) {
            var warnhtml = ''
            warnhtml += '<div id="warningmes" style="padding: 2%;height:25px;margin-top:25%;background: #f44336;border-radius: 12px;z-index: 999;">'
            warnhtml += '<span class="closebuttn" type="button" onclick="dismissfunc(this)" style="margin-left: 15px;color: white;font-weight: bold;float: right;font-size: 40px;line-height: 20px;margin-top:-10px;cursor: pointer;transition: 0.3s;">&times;</span>'
            warnhtml += '<h3 style="text-align:center;margin-top:-10px; font-size:15px;"> Hardware and Software information missing! Please Onboard server or contact administrator</h3>'
            warnhtml += '</div>'
            $('#warningdata').append(warnhtml)

        } else if (obj && obj.code === 500) {
            var errorhtml = '';
            errorhtml += '<div id="warningmes" style="padding: 2%;height:25px;margin-top:25%;background: #f44336;border-radius: 12px;z-index: 999;">';
            errorhtml += '<span class="closebuttn" type="button" onclick="dismissfunc(this)" style="margin-left: 15px;color: white;font-weight: bold;float: right;font-size: 40px;line-height: 20px;margin-top:-10px;cursor: pointer;transition: 0.3s;">&times;</span>';
            errorhtml += '<h3 style="text-align:center;margin-top:-10px; font-size:15px;"> URL Not Reachable</h3>';
            errorhtml += '</div>';
            $('#warningerror').append(errorhtml);
        }
    }
    else {
        stopLoader("node-view")
        $("#node-view #s_hw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        $("#node-view #nodatamessage").text('No Data');
    }
    if (pageName === "Dashboard") {
        var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === entitySelectedsite)[0]

        findCount()
    }

}
//================================================================SERVER BUTTON TYPE TESTING END======================================================================================//
function observeElements(portid, start_id, end_port, end_id, callback) {
    let callbackInvoked = false; // Flag to track if the callback has been invoked

    function checkElements() {
        var start = document.getElementsByClassName(`${portid}-${start_id}`)[0];
        var end = document.getElementsByClassName(`${end_port}-${end_id}`)[0];
        if (end_port == '') {
            end = document.getElementsByClassName(`${end_id}:NIC`)[0];
        }

        if (start != undefined && end != undefined && !callbackInvoked) {
            callbackInvoked = true; // Set the flag to true
            callback(start, end);
            return true;
        }
        return false;
    }

    // Perform the initial check
    if (!checkElements()) {
        // If elements are not found, observe the document for changes
        const observer = new MutationObserver((mutationsList, observer) => {
            if (checkElements()) {
                // Disconnect the observer once the elements are found
                observer.disconnect();
            }
        });

        // Start observing the document for changes in the child elements
        observer.observe(document.body, { childList: true, subtree: true });
        trackEntityObserver(observer);
    }
}
function fillNodeDetails(response, ip) {
    const randomCharacter = Math.random().toString(36).substring(2, 5);
    if (response == undefined)
        return;
    entityResponse = response.responseData;
    if (response.responseData.length > 0) {
        response.responseData.forEach(function (obj, index) {
            var tempObj = {}
            tempObj['site'] = obj.site
            tempObj['isSuccess'] = true
            tempObj['isWSConnected'] = false
            tempObj['criticalNodeCount'] = 0
            tempObj['nodeCount'] = { "host": { "criticalCount": 0, "okCount": 0, "pendingCount": 0, "warningCount": 0, "unknownCount": 0 }, "service": { "criticalCount": 0, "okCount": 0, "pendingCount": 0, "warningCount": 0, "unknownCount": 0 } };
            responseFromServer = obj.site_data
            if (Object.keys(responseFromServer).length > 0) {
                var nodeResponse = responseFromServer["nodes"]
                if (nodeResponse.status == 200 && nodeResponse.data.length > 0) {
                    var criticalNodeCount = 0;
                    hCriticalStatusCount = 0;
                    hOkStatusCount = 0
                    hPendingStatusCount = 0
                    hWarningStatusCount = 0
                    hUnknownStatusCount = 0
                    sCriticalStatusCount = 0;
                    sOkStatusCount = 0
                    sPendingStatusCount = 0
                    sWarningStatusCount = 0
                    sUnknownStatusCount = 0
                    nodeResponse.data.forEach(function (row) {
                        if (typeof (row[11] == 'string'))
                            var state = parseInt(row[11])
                        else
                            var state = row[11]
                        if (state === 0) {
                            criticalNodeCount++;
                            tempObj['isSuccess'] = false
                            if (entitySelectedsite == ' ') {
                                entitySelectedsite = obj.site
                            }
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hCriticalStatusCount++ : sCriticalStatusCount++
                        }
                        if (state === 2) {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hOkStatusCount++ : sOkStatusCount++
                        }
                        if (state === 1) {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hWarningStatusCount++ : sWarningStatusCount++;
                        }
                        if (state === 3) {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hUnknownStatusCount++ : sUnknownStatusCount++;
                        }
                    });
                    tempObj['criticalNodeCount'] = criticalNodeCount;
                    tempObj['nodeCount']['host']['criticalCount'] = hCriticalStatusCount;
                    tempObj['nodeCount']['host']['okCount'] = hOkStatusCount;
                    tempObj['nodeCount']['host']['warningCount'] = hWarningStatusCount;
                    tempObj['nodeCount']['host']['unknownCount'] = hUnknownStatusCount;
                    tempObj['nodeCount']['service']['criticalCount'] = sCriticalStatusCount;
                    tempObj['nodeCount']['service']['okCount'] = sOkStatusCount;
                    tempObj['nodeCount']['service']['warningCount'] = sWarningStatusCount;
                    tempObj['nodeCount']['service']['unknownCount'] = sUnknownStatusCount;
                }
                else {
                    stopLoader('s_sw' + ip);
                    tempObj['isSuccess'] = false
                }

            }
            else {
                tempObj['isSuccess'] = false
            }
            sitesData.push(tempObj)
            var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === obj.site)[0]
            clientdata = tempObj['site']
            //entity websoc
            if (obj['site_data']['nodes']['data'] != '') {
                makeWebSocConnectionk8(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'], randomCharacter)
            }
        });
        sSitehtml = ''
        var obj = entityResponse[0]
        dispalyNodes(obj.site_data, obj.code, ip)
    }
    else {
        stopLoader("node-view")
        $("#node-view #s_sw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        $("#node-view #nodatamessage").text('No Data');
    }
    if (pageName === "Dashboard") {
        var tempSiteObj = siteResponse[0]

        findCount()
    }

}

// HARDWARE FUNCTION ON SWITCH PAGE
function fillHWNodeDetails(response) {
    const randomCharacters = Math.random().toString(36).substring(2, 5);
    if (response == undefined)
        return;
    entityResponse = response.responseData;
    if (response.responseData.length > 0) {
        response.responseData.forEach(function (obj, index) {
            var tempObj = {}
            tempObj['site'] = obj.site
            tempObj['isSuccess'] = true
            tempObj['isWSConnected'] = false
            tempObj['criticalNodeCount'] = 0
            tempObj['nodeCount'] = { "host": { "criticalCount": 0, "okCount": 0, "pendingCount": 0, "warningCount": 0, "unknownCount": 0 }, "service": { "criticalCount": 0, "okCount": 0, "pendingCount": 0, "warningCount": 0, "unknownCount": 0 } };
            responseFromServer = obj.site_data
            if (Object.keys(responseFromServer).length > 0) {
                var nodeResponse = responseFromServer["nodes"]
                if (nodeResponse.status == 200 && nodeResponse.data.length > 0) {
                    var criticalNodeCount = 0;
                    hCriticalStatusCount = 0;
                    hOkStatusCount = 0
                    hPendingStatusCount = 0
                    hWarningStatusCount = 0
                    hUnknownStatusCount = 0
                    sCriticalStatusCount = 0;
                    sOkStatusCount = 0
                    sPendingStatusCount = 0
                    sWarningStatusCount = 0
                    sUnknownStatusCount = 0
                    nodeResponse.data.forEach(function (row) {
                        if (row[16] != "" && row[16] != null) {
                            nicconnect.push(row)
                        }
                        if (typeof (row[11] == 'string'))
                            var state = parseInt(row[11])
                        else
                            var state = row[11]
                        if (state === 0) {
                            criticalNodeCount++;
                            tempObj['isSuccess'] = false
                            if (entitySelectedsite == ' ') {
                                entitySelectedsite = obj.site
                            }
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hCriticalStatusCount++ : sCriticalStatusCount++
                        }
                        if (state === 2) {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hOkStatusCount++ : sOkStatusCount++
                        }
                        if (state === 1) {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hWarningStatusCount++ : sWarningStatusCount++;
                        }
                        if (state === 3) {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hUnknownStatusCount++ : sUnknownStatusCount++;
                        }
                    });
                    tempObj['criticalNodeCount'] = criticalNodeCount;
                    tempObj['nodeCount']['host']['criticalCount'] = hCriticalStatusCount;
                    tempObj['nodeCount']['host']['okCount'] = hOkStatusCount;
                    tempObj['nodeCount']['host']['warningCount'] = hWarningStatusCount;
                    tempObj['nodeCount']['host']['unknownCount'] = hUnknownStatusCount;
                    tempObj['nodeCount']['service']['criticalCount'] = sCriticalStatusCount;
                    tempObj['nodeCount']['service']['okCount'] = sOkStatusCount;
                    tempObj['nodeCount']['service']['warningCount'] = sWarningStatusCount;
                    tempObj['nodeCount']['service']['unknownCount'] = sUnknownStatusCount;
                }
                else {
                    tempObj['isSuccess'] = false
                }

            }
            else {
                tempObj['isSuccess'] = false
            }
            sitesData.push(tempObj)
            var tempSiteObj = siteResponse[0]
            makeWebSwitchConnection(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'], randomCharacters)
        });
        var obj = entityResponse[0]
        if (obj && obj.code === 200 && obj.site_data.nodes.data.length > 0) {
            displayNodes(obj.site_data, obj.code)
        } else if (obj && obj.code === 200 && obj.site_data.nodes.data.length === 0) {
            var warnhtml = ''
            warnhtml += '<div id="warningmes" style="padding: 2%;height:25px;margin-top:25%;background: #f44336;border-radius: 12px;z-index: 999;">'
            warnhtml += '<span class="closebuttn" type="button" onclick="dismissfunc(this)" style="margin-left: 15px;color: white;font-weight: bold;float: right;font-size: 40px;line-height: 20px;margin-top:-10px;cursor: pointer;transition: 0.3s;">&times;</span>'
            warnhtml += '<h3 style="text-align:center;margin-top:-10px; font-size:15px;"> Hardware & Software information missing! Please Onboard server or contact administrator</h3>'
            warnhtml += '</div>'
            $('#warningdata').append(warnhtml)

        } else if (obj && obj.code === 500) {
            var errorhtml = '';
            errorhtml += '<div id="warningmes" style="padding: 2%;height:25px;margin-top:25%;background: #f44336;border-radius: 12px;z-index: 999;">';
            errorhtml += '<span class="closebuttn" type="button" onclick="dismissfunc(this)" style="margin-left: 15px;color: white;font-weight: bold;float: right;font-size: 40px;line-height: 20px;margin-top:-10px;cursor: pointer;transition: 0.3s;">&times;</span>';
            errorhtml += '<h3 style="text-align:center;margin-top:-10px; font-size:15px;"> URL Not Reachable</h3>';
            errorhtml += '</div>';
            $('#warningerror').append(errorhtml);
        }
    }
    else {
        stopLoader("node-view")
        $("#node-view #s_hw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        $("#node-view #nodatamessage").text('No Data');
    }
    if (pageName === "Dashboard") {
        var tempSiteObj = siteResponse[0]

        findCount()
    }
}
// switch hardware close
function openmodal(select) {
    var id = ($(select).attr("id").split("right")[1])
    var icon = select.querySelector("i");
    icon.classList.toggle('fa-window-close');
    icon.classList.toggle('fa-window-maximize');

    if (($("#card" + id).attr("class").includes("fullscreen"))) {
        $("#card" + id).removeClass("fullscreen")
        $("#s_sw" + id).removeClass("cyto-fullscreen")

    } else {
        $("#card" + id).addClass("fullscreen")
        $("#s_sw" + id).addClass("cyto-fullscreen")

    }
}
function dismissfunc(select) {
    select.parentElement.style.display = 'none'
}
function displayrow(select) {
    var id = ($(select).attr("id").split("lens")[1])
    if (($(select).attr("id").split("lens")[0]) == 'no-') {
        document.getElementById("no-lens" + id).setAttribute("id", "show-lens" + id);
        document.getElementById("search-row" + id).style.display = 'flex';
        $("#s_sw" + id).addClass("cyto-height")
    }
    else {
        document.getElementById("show-lens" + id).setAttribute("id", "no-lens" + id);
        document.getElementById("search-row" + id).style.display = 'none';
        $("#s_sw" + id).removeClass("cyto-height")
    }
}
function pintool(tooltpid) {
    var rowelem = document.getElementById(tooltpid)
    var tltppin = document.getElementById(tooltpid + 'tltp-pin')
    if (rowelem.classList.contains('visible-tltp')) {//unpin
        rowelem.classList.remove("visible-tltp");
        tltppin.style.color = '#fff'
    } else {                                 //pin
        rowelem.classList.add("visible-tltp");
        tltppin.style.color = '#e99123'
    }
}
function hovered(spanid, evt) {
    var e = evt.target;
    var dim = e.getBoundingClientRect();
    var w = $(window);
    var el = document.getElementById(spanid);
    el.style.display = "flex";
    el.style.position = "absolute";
    var totwidth = (dim.left / window.innerWidth) * 100
    if (totwidth < 85 && (spanid.includes('NIC') || spanid.includes('disk'))) {
        el.style.right = '-520%';
        el.style.left = '70%';
    } else if (totwidth < 85) {
        el.style.right = '-60%';
    } else if (totwidth > 85) {
    }
}

async function displayNodes(data, responseCode) {
    if (Object.keys(data).length > 0 && data["nodes"] && data["nodes"].data.length > 0) {
        $("#node-view #entity-search").css('visibility', 'visible');
        $("#node-view #s_hw").css('display', 'flex');
        $("#slayer-heading").show();
        $("#node-view #entity-nodata").css('display', 'none');
        var obj = sitesData[0]
        responseFromServer = data;
        var nodesData = [];
        var edgesData = [];
        var tempLabel = "";
        var nodeSize = 0;
        sortedJson = {};
        var nodeResponse = responseFromServer["nodes"]
        if (nodeResponse.status == 200) {
            $("#total-nodes").html("Nodes (" + nodeResponse.data.length + ")");
            nodeResponse.data.forEach(function (row) {
                var ip = ''
                var state = ''
                if (row[1].includes(':')) {
                    ip = 'ip_' + (row[1].split(":")[0]).replaceAll('.', '_')
                } else {
                    ip = 'ip_' + row[1].replaceAll('.', '_')
                }
                state = row[11]
                if (criticalStatusCount[ip] == undefined || criticalStatusCount[ip] == null) {

                    criticalStatusCount[ip] = 0;
                }
                if (okStatusCount[ip] == undefined || okStatusCount[ip] == null) {
                    okStatusCount[ip] = 0
                }
                if (pendingStatusCount[ip] == undefined || pendingStatusCount[ip] == null) {
                    pendingStatusCount[ip] = 0
                }
                if (warningStatusCount[ip] == undefined || warningStatusCount[ip] == null) {
                    warningStatusCount[ip] = 0
                }
                if (unknownStatusCount[ip] == undefined || unknownStatusCount[ip] == null) {
                    unknownStatusCount[ip] = 0
                }
                if (state == 2) {
                    okStatusCount[ip] += 1;
                } else if (state == 0) {
                    criticalStatusCount[ip] += 1;
                } else if (state == 3) {
                    unknownStatusCount[ip] += 1;
                } else if (state == 1) {
                    warningStatusCount[ip] += 1;
                }

                nodeSize = getSizeForNode(row[4])
                var label = row[1];
                if ((row[4] != null) && (row[4] == "Host" || row[4].startsWith('Node'))) {   //we added (row[4]!=null)&& --> for data comes
                    tempLabel = label;
                    if (sortedJson[label] === undefined) {
                        sortedJson[label] = { "host": "", "services": [], "hostms": [] };
                    }
                    sortedJson[label]["host"] = row;
                }
                else {
                    var tempIdArray = label.split(":");
                    if (sortedJson[tempIdArray[0]] === undefined) {
                        sortedJson[tempIdArray[0]] = { "host": "", "services": [], "hostms": [] };
                    }
                    if (row[4] == "HostMS" || row[4] == "ServiceMS") {
                        if (row[4] == "ServiceMS") {
                            tempLabel = tempIdArray[2];

                            if (sortedJson[tempIdArray[0]][tempIdArray[1]] === undefined) {
                                sortedJson[tempIdArray[0]][tempIdArray[1]] = [];
                            }
                            sortedJson[tempIdArray[0]][tempIdArray[1]].push(row);
                        }
                        else {
                            tempLabel = tempIdArray[1];
                            sortedJson[tempIdArray[0]]["hostms"].push(row);
                        }
                    }
                    if ((row[4] != null) && (row[4] == "Service" || row[4].startsWith('Pod'))) {   //we added (row[4]!=null)&& --> for data comes
                        tempLabel = tempIdArray[1];
                        sortedJson[tempIdArray[0]]["services"].push(row);
                    }
                    if (row[4] != "Host" && row[4] != "HostMS" && row[4] != "Service" && row[4] != "ServiceMS") {
                        tempLabel = tempIdArray[1] ? tempIdArray[1] : tempIdArray[0];
                    }
                }

                var dashboardenabled = "true";
                if (row[8] === null) {
                    dashboardenabled = "true";
                }
                var node = { data: { id: row[0], fullname: label, dashboardenabled: dashboardenabled, dashboard_url: row[8], text: tempLabel, image: image_path + row[5], color: row[11], size: nodeSize, friendlyname: row[12], niclist: row[13], volumelist: row[15], timedate: row[18], prcthresh: row[19] } };
                nodesData.push(node);
                titleToId[label] = row[0];
            });
        }


        var relationResponse = responseFromServer["relationships"]
        if (relationResponse.status == 200) {
            relationResponse.data.forEach(function (row) {
                var edge = { data: { source: row[0], target: row[1], id: "id_" + row[0] + row[1], label: row[2] } };
                edgesData.push(edge);
            });
        }

        // server nodes display code //
        Datanodes = nodesData;
        hardwarebg = Datanodes;

        var servercount = 0;
        await Datanodes.forEach(function (datas) {

            var nodehtml = ''
            var friendlyname = ''
            var divid = "ip_" + (datas['data']['fullname'].split(":")[0]).replaceAll('.', '_')
            var isDivPresent = document.getElementById(divid)
            if (!isDivPresent) {
                nodehtml += '<fieldset class="card sswcard" id="card' + divid + '" style="margin-bottom:0;border: 1px solid #1f1f1f; background-color:#1f1f1f">'
                nodehtml += '<legend>'
                nodehtml += '<p style="margin-left:2%">'
                nodehtml += '<div class="row">'
                nodehtml += '<div class="col-7" style="margin-top:2%">'
                nodehtml += '<p id="nicname' + divid + '"></p>'
                nodehtml += '</div>'
                nodehtml += '<div class="col-5 option-icons">'
                nodehtml += '<i class="icon-search" id="no-lens' + divid + '" onclick="displayrow(this)" style="margin-left:4%;font-size: 16px;"></i>'
                nodehtml += '<button type="button" class="btn btn-default btn-ripple sm-hide" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" id="button' + divid + '" style="margin-left:1%">'
                nodehtml += '<i class="mdi mdi-information-outline" id="' + (datas['data']['fullname'].split(":")[0]).replaceAll('.', '_') + ':Info"  title="" style="color:white;font-size: 16px;"  ></i>'
                nodehtml += '</button>'
                nodehtml += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="button' + divid + '" style="margin-left:-1%">'
                nodehtml += '<i class="icon-tableview" id="tableview' + divid + '"  title="Table view" style="color:white;font-size: 16px;" onclick="displayTable(this)" data-toggle="modal" data-target="#staticBackdrop"></i>'
                nodehtml += '<i class="icon-node" data-toggle="tooltip" id="nodeview' + divid + '" data-placement="top" title="Node view" style="display: none; color:white;font-size: 16px;" onclick="displayTable(this)" data-dismiss="modal"></i>'
                nodehtml += '</button>'
                nodehtml += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + divid + '" onclick="openmodal(this)" style="display:none" >'
                nodehtml += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + divid + '" onclick="openmodal(this)">'
                nodehtml += '<i class="fa fa-window-close" style="color: #ffffff;font-size: 16px;margin-left: -70%;"></i>'
                nodehtml += '</button>'
                nodehtml += '<button id="hardwaresdata' + divid + '" style="display:none">'
                nodehtml += '<div class="dropdown switch-dropdown" style="background-color: #55a8fd;">'
                nodehtml += '<a class="btn selector dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                nodehtml += '<span class="fa fa-2x"><i class="icon-dashboard" style="color:#ffffff"></span>'
                nodehtml += '</a>'
                nodehtml += '<div class="dropdown-menu dropdown-menu-hw" aria-labelledby="dropdownMenuLink" id="portinfos' + divid + '" style="top:-150px !important;"></div>'
                nodehtml += '</i>'
                nodehtml += '</button>'
                nodehtml += '</div>'
                nodehtml += '</div>'
                nodehtml += '</p>'
                nodehtml += '</legend>'

                nodehtml += '<div class="row" id="search-row' + divid + '" style="margin-left:0%;display:none">'
                nodehtml += '<div class="" id="entity-search">'
                nodehtml += '<div class="input-with-icon position-relative" style="color:white">'
                nodehtml += '<input class="search-input w-100 search" type="search" name="tags"  id="tag' + divid + '" placeholder="Search" />'
                nodehtml += '<i class="icon-search" style="position: inherit; color: white;font-size:18px;" id="i_' + divid + '" onclick="searchNodes(this)"></i>'
                nodehtml += '</div>'
                nodehtml += '</div>'
                nodehtml += '<div class="col-2" text-right>'
                nodehtml += '</div>'
                nodehtml += '</div>'

                nodehtml += '<div class="row" id="' + divid + '" style="height: 10%; width: 100% !important">'
                nodehtml += '</div>'
                nodehtml += '<div class="row" style="margin-right:0rem;">'
                nodehtml += '<div class="col-12" id="s_sw' + divid + '_opq" style="display:flex;">'
                nodehtml += '<div class="col-10" id="s_sw' + divid + '" style="height: 346px; width:90%; position:relative; margin-left:5%;display:block">'
                nodehtml += '</div>'
                nodehtml += '<div class="col-2 icon-bares mob_hsicon" id="swicons' + divid + '" >'
                //////////////////////
                nodehtml += '</div>'
                nodehtml += '</div>'
                nodehtml += '</div>'
                // card footer
                nodehtml += '<div class="pill-contain p-0" style = "z-index: 100;" >'
                nodehtml += '<div class="row" style="margin-left:0;">'
                nodehtml += '<ul class="nav nav-pills mb-2" id="pills-tab' + divid + '" role="tablist">'
                nodehtml += ' <button class="nav-item mx-2 ">'
                nodehtml += '    <a class="nav-link" id="pills-critical-tab' + divid + '" data-toggle="pill" href="#pills-critical' + divid + '" role="tab" aria-controls="pills-critical" aria-selected="true" onclick="statusFunction(this);">' + criticalStatusCount[divid] + '</span></a>'
                nodehtml += '</button>'
                nodehtml += '<button class="nav-item mx-2">'
                nodehtml += '    <a class="nav-link" id="pills-ok-tab' + divid + '" data-toggle="pill" href="#pills-ok' + divid + '" role="tab" aria-controls="pills-ok" aria-selected="false" onclick="statusFunction(this);">' + okStatusCount[divid] + '</span></a>'
                nodehtml += '</button>'
                nodehtml += '<button class="nav-item mx-2">'
                nodehtml += '    <a class="nav-link" id="pills-warning-tab' + divid + '" data-toggle="pill" href="#pills-warning' + divid + '" role="tab" aria-controls="pills-warning" aria-selected="false" onclick="statusFunction(this);">' + warningStatusCount[divid] + '</a>'
                nodehtml += '</button>'
                nodehtml += '<button class="nav-item mx-2">'
                nodehtml += '    <a class="nav-link" id="pills-unknown-tab' + divid + '" data-toggle="pill" href="#pills-unknown' + divid + '" role="tab" aria-controls="pills-unknown" aria-selected="false" onclick="statusFunction(this);">' + unknownStatusCount[divid] + '</a>'
                nodehtml += '</button>'
                nodehtml += '<button class="nav-item mx-2">'
                nodehtml += '    <a class="nav-link active" id="pills-all-tab' + divid + '" data-toggle="pill" href="#pills-all' + divid + '" role="tab" aria-controls="pills-all" aria-selected="false" onclick="statusFunction(this);">All</a>'
                nodehtml += '</button>'
                nodehtml += '</ul >'
                nodehtml += '</div >'
                nodehtml += '</div >'
                nodehtml += '</fieldset>'

                nodehtml += '<div class="modal fade closable" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style="overflow-y:hidden !important">'
                nodehtml += '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >'
                nodehtml += '<div class="modal-content">'
                nodehtml += '<div class="modal-header " >'
                nodehtml += '<h5 class="modal-title col-3" id="staticBackdropLabel">' + (datas['data']['fullname'].split(":")[0]) + '</h5>'
                nodehtml += '<div class="col-3" id="entity-search">'
                nodehtml += '<div class="input-with-icon position-relative" style="color:white">'
                nodehtml += '<input class="search-input w-100 search" style="width:85% !important" type="search" name="tags" onkeyup="tableNodes()" id="myInput" placeholder="Search" />'
                nodehtml += '<i class="icon-search" id="data-mobile"></i>'
                nodehtml += '</div>'
                nodehtml += '</div>'
                nodehtml += '<div class="col-3 " id="change-col4-size">'
                nodehtml += '<div class="dropdown select-btn-dropdown full-select-dropdown mob-data" id="exort-to' + divid + '">'
                nodehtml += '<a class="form-btn btn-dropdown-link select-input-link text-left" type = "button" style="" id = "dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" \
                                aria-expanded="false" > <i class="mdi mdi-download" id="exporting" style="color:#ffffff"></i> </a >'
                nodehtml += '<div class="dropdown-menu" id="export-to-select" aria-labelledby="dropdownMenuButton">'
                nodehtml += '<a class="select-link dropdown-item " onclick="onExport(\'' + "csv" + '\')">CSV</a>'
                nodehtml += '<a class="select-link dropdown-item" onclick="onExport(\'' + "pdf" + '\')">PDF</a>'
                nodehtml += '<a class="select-link dropdown-item" onclick="onExport(\'' + "excel" + '\')">XLS</a>'
                nodehtml += '</div>'
                nodehtml += '</div>'
                nodehtml += '</div>'
                nodehtml += '<div class="col-3 " id="" style="margin-left:-2%">'
                nodehtml += '<button type="button" class="btn btn-default tab-btn" data-toggle="tooltip" data-placement="bottom" title="Refresh" onclick="reloadmodal()">'
                nodehtml += '<i class="mdi mdi-refresh" id = "" style = "color:#ffffff"></i>'
                nodehtml += '</button>'
                nodehtml += '</div>'
                nodehtml += '<button type = "button" id="nodeview' + divid + '" class="btn-close static-close" data-dismiss="modal" aria-label="Close" onclick="displayTable(this)" style="background-color:#1f1f1f;color:white">x</button >'
                nodehtml += '</div>'
                nodehtml += '<div class="modal-body" id="refresh-modal" style="padding:0"></div>'
                nodehtml += '</div>'
                nodehtml += '</div>'
                nodehtml += '</div >'
                /////////////////////////////////
                $('#table-view' + divid).hide();
                $(".icon-node" + divid).hide();
                servercount++;
                $('#s_hw').append(nodehtml);
                getEntityData((datas['data']['fullname'].split(":")[0]).replaceAll('.', '_'))
                //////////////////////////////////COUNT///////////////////////////////////////
                if (criticalStatusCount[divid] == 0) {
                    obj.isSuccess = true
                    $('#pills-critical-tab' + divid).attr('onclick', ' ');
                    $("#pills-critical-tab" + divid).html("Critical (" + criticalStatusCount[divid] + ")");
                }
                else {
                    obj.isSuccess = false
                    $('#pills-critical-tab' + divid).attr('onclick', 'statusFunction(this)');
                    $("#pills-critical-tab" + divid).html('<span class="bold-text red">Critical(' + criticalStatusCount[divid] + ')</span>');
                }
                if (okStatusCount[divid] == 0) {
                    $('#pills-ok-tab' + divid).attr('onclick', ' ');
                    $("#pills-ok-tab" + divid).html("Ok (" + okStatusCount[divid] + ")");
                }
                else {
                    $('#pills-ok-tab' + divid).attr('onclick', 'statusFunction(this)');
                    $("#pills-ok-tab" + divid).html('<span class="bold-text green">Ok(' + okStatusCount[divid] + ')</span>');
                }
                if (warningStatusCount == 0) {
                    $('#pills-warning-tab').attr('onclick', ' ');
                    $("#pills-warning-tab").html("Warning (" + warningStatusCount + ")");
                }
                else {
                    $('#pills-warning-tab' + divid).attr('onclick', 'statusFunction(this)');
                    $("#pills-warning-tab").html('<span class="bold-text warning">Warning(' + warningStatusCount + ')</span>');
                }

                if (unknownStatusCount[divid] == 0) {
                    $('#pills-unknown-tab' + divid).attr('onclick', ' ');
                    $("#pills-unknown-tab" + divid).html("Unknown (" + unknownStatusCount[divid] + ")");
                }
                else {
                    $('#pills-unknown-tab' + divid).attr('onclick', 'statusFunction(this)');
                    $("#pills-unknown-tab" + divid).html('<span class="bold-text unknown" style="color:white">Unknown(' + unknownStatusCount[divid] + ')</span>');
                }
            }

            if (datas['data']['text'] == datas['data']['fullname'].split(":")[0]) {
                friendlyname = datas['data']['fullname'].split(":")[0] + ' ( ' + datas['data']['friendlyname'] + ' )'
                document.getElementById('nicname' + divid).textContent = friendlyname
                if (document.getElementById('nicname' + divid + '_second'))
                    document.getElementById('nicname' + divid + '_second').textContent = 'SECONDARY-IP'
            }
            var nodesid = datas['data']["id"]
            var nodesip = (datas['data']['fullname'].split(":")[0]).replaceAll('.', '_')
            var imagetype = (datas['data']['fullname'].split(":")[1])
            var pinid = (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip'
            var _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + (datas['data']['fullname']).replaceAll('.', '_') + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip"  style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll"><p>' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '</p></span></div>'
            if ((imagetype != 'Processes') && (imagetype != 'Info') && (imagetype)) {
                if (imagetype.includes('NIC')) {
                    var cls_list = (datas['data']['fullname']).replaceAll('.', '_')
                    var niclistobj = {}
                    try {
                        var niclistobj = JSON.parse(datas['data']['niclist'])
                    }
                    catch (err) {
                        console.log('<----GETTING ERROR---->');
                    }
                    if ((niclistobj) != null && Object.keys(niclistobj).length && jQuery.isEmptyObject(niclistobj) != true) {
                        var tooltp_txt = '<table>';
                        var tooltp_green = ''
                        var tooltp_red = ''
                        var tooltp_default = ''
                        for (const [key, value] of Object.entries(JSON.parse(datas['data']['niclist']))) {
                            var nicclr = (value['status'] == 2 ? 'green' : 'red')
                            if (value['ip'] != undefined) {
                                if (value['status'] == 0) {
                                    cls_list = cls_list + ' ' + key.replaceAll('.', '_') + ':' + imagetype
                                    tooltp_red += '<tr style="color:red"><td id="' + key.replaceAll('.', '_') + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['ip'] + '</td></tr>'
                                } else if (value['status'] == 1) {
                                    cls_list = cls_list + ' ' + key.replaceAll('.', '_') + ':' + imagetype
                                    tooltp_green += '<tr style="color:orange"><td id="' + key.replaceAll('.', '_') + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['ip'] + '</td></tr>'
                                } else if (value['status'] == 2) {
                                    cls_list = cls_list + ' ' + key.replaceAll('.', '_') + ':' + imagetype
                                    tooltp_green += '<tr style="color:green"><td id="' + key.replaceAll('.', '_') + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['ip'] + '</td></tr>'
                                } else if (value['status'] == 3) {
                                    cls_list = cls_list + ' ' + key.replaceAll('.', '_') + ':' + imagetype
                                    tooltp_default += '<tr><td id="' + key.replaceAll('.', '_') + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['ip'] + '</td></tr>'
                                }
                            } else {
                                var macid = key.replaceAll('.', '_')
                                if (macid.includes('-'))
                                    macid = macid.replaceAll('-', '_')
                                if (value['status'] == 0) {
                                    cls_list = cls_list + ' ' + value['mac'].replaceAll('.', '_') + ':' + imagetype
                                    tooltp_red += '<tr style="color:red"><td id="' + macid + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['mac'] + '</td></tr>'
                                } else if (value['status'] == 1) {
                                    cls_list = cls_list + ' ' + value['mac'].replaceAll('.', '_') + ':' + imagetype
                                    tooltp_green += '<tr style="color:orange"><td id="' + macid + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['mac'] + '</td></tr>'
                                } else if (value['status'] == 2) {
                                    cls_list = cls_list + ' ' + value['mac'].replaceAll('.', '_') + ':' + imagetype
                                    tooltp_green += '<tr style="color:green"><td id="' + macid + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['mac'] + '</td></tr>'
                                } else if (value['status'] == 3) {
                                    cls_list = cls_list + ' ' + value['mac'].replaceAll('.', '_') + ':' + imagetype
                                    tooltp_default += '<tr><td id="' + macid + ':' + imagetype + '" >' + key + '(' + value['alias'] + ')-</td> <td>' + value['mac'] + '</td></tr>'
                                }
                            }
                            // do something with `key` and `value`
                        }
                        tooltp_txt += tooltp_red + tooltp_green + tooltp_default
                        tooltp_txt += '</table>'
                        _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts row" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;"><div class="col-10" style="padding-left:0" >' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '</div><i class=" col-2 mdi mdi-pin-outline" id="' + pinid + 'tltp-pin" style=" z-index:1000;" onclick="pintool(\'' + pinid + '\')"></i>' + tooltp_txt + '</span></div>'
                    } else {
                        _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;">' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '<br>No nic summary</span></div>'
                    }
                }

                if (imagetype.includes('SW_Disk')) {
                    var disklistobj = JSON.parse(datas['data']['volumelist'])
                    if (jQuery.isEmptyObject(disklistobj) != true && (disklistobj) != null) {
                        var cls_list = (datas['data']['fullname']).replaceAll('.', '_')
                        var tooltp_txt = '<table>';
                        var tooltp_green = ''
                        var tooltp_amber = ''
                        var tooltp_red = ''
                        var pinid = (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip'
                        for (const [key, value] of Object.entries(JSON.parse(datas['data']['volumelist']))) {
                            cls_list = cls_list + ' ' + nodesip + ':' + key + ':' + imagetype
                            if (value['status'] == 2) {
                                tooltp_green += '<tr style="color:green"><td id="' + nodesip + ':' + key + ':' + imagetype + '">' + key + '-</td> <td>' + value['percentage'] + '</td></tr>'
                            } else if (value['status'] == 1) {
                                tooltp_amber += '<tr style="color:orange"><td id="' + nodesip + ':' + key + ':' + imagetype + '">' + key + '-</td> <td>' + value['percentage'] + '</td></tr>'
                            } else {
                                tooltp_red += '<tr style="color:red"><td id="' + nodesip + ':' + key + ':' + imagetype + '">' + key + '-</td> <td>' + value['percentage'] + '</td></tr>'
                            }
                        }
                        tooltp_txt += tooltp_red + tooltp_amber + tooltp_green
                        tooltp_txt += '</table>'
                        _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts row" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;"><div class="col-8" style="padding-left:0" >' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '</div><i class=" col-4 mdi mdi-pin-outline" id="' + pinid + 'tltp-pin" style=" z-index:1000;" onclick="pintool(\'' + pinid + '\')"></i>' + tooltp_txt + '</span></div>'

                    } else {

                        _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize " id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;">' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '<br>No disk summary</span></div>'

                    }

                }

                if (imagetype.includes('SW_')) {
                    $('#swicons' + divid).append(_nodehtml);
                } else {

                    $('#' + divid).append(_nodehtml);
                }
            }
            if (datas['data']['fullname'] == ((datas['data']['fullname'].split(":")[0])) + ":Info") {
                var infoid = datas['data']["id"]
                var infoip = (datas['data']['fullname'].split(":")[0]).replaceAll('.', '_')
                document.getElementById(infoip + ':Info').addEventListener("click", function () {
                    openNav(infoid, siteName, divid)
                })
            }
        });
        var srch_row = 'serversearch-row'
        $('#servers-heading').html('<div class="row row-width" style="margin:unset">SERVERS<div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + servercount + '</div><i class="icon-search hide-val' + srch_row + '" id="no-lens' + divid + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>');
        $('#servers-heading').append('<div class="row" id="serversearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="overalltag" placeholder="Search" /><i class="icon-search" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDiv(this)"></i><i class="icon-close" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></div></div><div class="col-2" text-right></div></div>');

        // server nodes display code //
        switchs().then(function () {
            nicconnect.forEach(function (obj) {//SERVER NIC LEADERLINE
                var start = document.getElementById(obj[1].replaceAll(".", "_"))
                var end = document.getElementById(obj[16].replaceAll(".", "_"))
                if (start != null && end != null && end != undefined) {
                    var clr
                    if (obj[11].toString() == '0') {
                        var link = new LeaderLine(start,
                            end,
                            { color: '#ff3d57', positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'red', outlineColor: 'red', endPlugColor: 'red', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                        );

                        trackEntityScrollPosition('s_hw', link);
                        trackEntityScrollPosition('server-div', link);
                        getarrowdata(('s' + (obj[1].replaceAll(".", "_"))), link)
                    } else {
                        var b_clr = ''
                        switch (obj[11]) {
                            case 1:
                                clr = '#e59105'
                                b_clr = 'orange'
                                break;
                            case 2:
                                clr = '#16d39a'
                                b_clr = 'green'
                                break;
                            case 3:
                                clr = '#ffffff'
                                b_clr = 'white'
                                break;
                            default:
                                b_clr = 'grey'
                                clr = '#000000'
                        }

                        var link = new LeaderLine(start,
                            end,
                            { color: clr, hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                        );
                        trackEntityLineHover(start, end, link);

                        trackEntityScrollPosition('s_hw', link);
                        trackEntityScrollPosition('server-div', link);
                        getarrowdata(('s' + (obj[1].replaceAll(".", "_"))), link)
                    }
                }
            });

            for (let index = 0; index < layers.length; index++) {//SWITCH PORT LEADERLINE
                arrowdata[index].forEach(function (obj) {
                    var portid = obj[1].split(":")[1];
                    var l = layers[index].split("_")[0]
                    var start_id = ''
                    if (obj[1].includes(':p')) {
                        start_id = 'p_' + obj[7].replaceAll(".", "_")
                    } else if (obj[1].includes(':s')) {
                        start_id = 's_' + obj[7].replaceAll(".", "_")
                    }
                    if (obj[10] != 'null' && jQuery.isEmptyObject(obj[10]) != true && obj[10] != 'none') {
                        var start = document.getElementById(start_id).getElementById(obj[1].split(":")[1])
                        var end = '';
                        var end_id = ''
                        if (obj[10].includes(':p')) {
                            end_id = 'p_' + (obj[10].split(":")[0]).replaceAll(".", "_")
                        } else if (obj[10].includes(':s')) {
                            end_id = 's_' + (obj[10].split(":")[0]).replaceAll(".", "_")
                        }
                        if (obj[10].includes(':') && (document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_"))) != null) {
                            end = document.getElementById(end_id).getElementById(obj[10].split(":")[1])
                        } else {
                            var nameelements = document.getElementsByName((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC')
                            var classelements = document.getElementsByClassName((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC')
                            end = classelements[0];
                        }
                        if (obj[5] == 'port' && portid != undefined && portid != null && start != null && end != null && end != undefined) {
                            var clr
                            if (obj[11].toString() == '2') {
                                var scrolldiv = document.getElementById('g-switch')
                                var link = new LeaderLine(start,
                                    end,
                                    { color: '#16d39a', hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                );
                                trackEntityLineHover(start, end, link);
                                trackEntityScrollPosition('g-switch', link);
                                trackEntityScrollPosition('p-switch', link);
                                trackEntityScrollPosition('e-switch', link);
                                trackEntityScrollPosition('g-div', link);
                                trackEntityScrollPosition('s_hw', link);
                                trackEntityScrollPosition('server-div', link);
                                getarrowdata(('l' + (obj[7].replaceAll(".", "_")) + portid), link)
                            } else {
                                var b_clr = ''
                                switch (obj[11]) {
                                    case 0:
                                        clr = '#ff3d57'
                                        b_clr = 'red'
                                        break;
                                    case 1:
                                        clr = '#e59105'
                                        b_clr = 'orange'
                                        break;
                                    case 3:
                                        clr = '#ffffff'
                                        b_clr = 'white'
                                        break;

                                    default:
                                        b_clr = 'grey'
                                        clr = '#000000'
                                }
                                var link = new LeaderLine(start,
                                    end,
                                    { color: clr, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                );
                                trackEntityScrollPosition('g-switch', link);
                                trackEntityScrollPosition('p-switch', link);
                                trackEntityScrollPosition('e-switch', link);
                                trackEntityScrollPosition('g-div', link);
                                trackEntityScrollPosition('s_hw', link);
                                trackEntityScrollPosition('server-div', link);
                                getarrowdata(('l' + (obj[7].replaceAll(".", "_")) + portid), link)
                            }

                        }
                    }
                });
            }
        });
    }
    else {
        $("#node-view #s_hw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'none');
        if (responseCode == 200)
            $("#entity-nodata #nodatamessage").text('No Data');  // No data print here
        else
            $("#entity-nodata #nodatamessage").text('Entity server not reachable.');
    }
}
function displaysearchbar(searchrow_name) {
    if ($('#' + searchrow_name).css('display') != 'none') {
        $('.hide-val' + searchrow_name).show();
        $('#' + searchrow_name).css('display', 'none')
    } else {
        $('.hide-val' + searchrow_name).hide();
        $('#' + searchrow_name).css('display', 'flex')
    }
    if ((searchrow_name == 'pserversearch-row') || (searchrow_name == 'vmserversearch-row')) {
        pause_supdate.push(searchrow_name)
        document.getElementById("ps_overalltag").addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent form submission or default behavior
                swapDiv(this, 'ps_hw'); // Call the search function
            }
        });
        document.getElementById("vms_overalltag").addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent form submission or default behavior
                swapDiv(this, 'vms_hw'); // Call the search function
            }
        });

    }
}
function closesearchbar(closebar) {
    $('#' + closebar).css('display', 'none')
    $('.hide-val' + closebar).show();

    if ((closebar == 'pserversearch-row')) {
        sortAndGroupElements(psHw);
        pause_supdate = removeValueFromArray(pause_supdate, closebar);
        document.getElementById("ps_overalltag").addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent form submission or default behavior
                swapDiv('ps_hw'); // Call the search function
            }
        });
    }
    if ((closebar == 'vmserversearch-row')) {
        sortAndGroupElements(vmsHw);
        pause_supdate = removeValueFromArray(pause_supdate, closebar);
        document.getElementById("vms_overalltag").addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent form submission or default behavior
                swapDiv('vms_hw'); // Call the search function
            }
        });
    }
}
function removeValueFromArray(arr, value) {
    const index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    return arr;
}
// HARDWARE FUNCTION ON SWITCH PAGE END
function dispalyNodes(data, responseCode, ip) {//SOFTWARE
    if (Object.keys(data).length > 0 && data["nodes"] && data["nodes"].data.length > 0) {
        $("#node-view #entity-search").css('visibility', 'visible');
        $("#node-view #s_sw").css('display', 'block');
        $("#node-view #entity-nodata").css('display', 'none');
        var obj = sitesData[0]
        responseFromServer = data;
        var nodesData = [];
        var edgesData = [];
        var tempLabel = "";
        var nodeSize = 0;
        sortedJson = {};
        var nodeResponse = responseFromServer["nodes"]
        if (nodeResponse.status == 200) {
            $("#total-nodes").html("Nodes (" + nodeResponse.data.length + ")");
            nodeResponse.data.forEach(function (row) {
                if (row[11] && typeof (row[11]) == 'string')
                    var state = parseInt(row[11])
                else
                    var state = row[11]
                if (state === 0) {
                    criticalStatusCount[ip] += 1;
                }
                if (state === 2) {
                    okStatusCount[ip] += 1;
                }
                if (state === 1) {
                    warningStatusCount[ip] += 1;
                }
                if (state === 3) {
                    unknownStatusCount[ip] += 1;
                }
                var color = getColorForNodeState(state);
                nodeSize = getSizeForNode(row[4])
                var label = row[1];
                if ((row[4] != null) && (row[4] == "Host" || row[4].startsWith('Node'))) {   //we added (row[4]!=null)&& --> for data comes
                    tempLabel = label;
                    if (sortedJson[label] === undefined) {
                        sortedJson[label] = { "host": "", "services": [], "hostms": [] };
                    }
                    sortedJson[label]["host"] = row;
                }
                else {
                    var tempIdArray = label.split(":");
                    if (sortedJson[tempIdArray[0]] === undefined) {
                        sortedJson[tempIdArray[0]] = { "host": "", "services": [], "hostms": [] };
                    }
                    if (row[4] == "HostMS" || row[4] == "ServiceMS") {
                        if (row[4] == "ServiceMS") {
                            tempLabel = tempIdArray[2];

                            if (sortedJson[tempIdArray[0]][tempIdArray[1]] === undefined) {
                                sortedJson[tempIdArray[0]][tempIdArray[1]] = [];
                            }
                            sortedJson[tempIdArray[0]][tempIdArray[1]].push(row);
                        }
                        else {
                            tempLabel = tempIdArray[1];
                            sortedJson[tempIdArray[0]]["hostms"].push(row);
                        }
                    }
                    if ((row[4] != null) && (row[4] == "Service" || row[4].startsWith('Pod'))) {   //we added (row[4]!=null)&& --> for data comes
                        tempLabel = tempIdArray[1];
                        sortedJson[tempIdArray[0]]["services"].push(row);
                    }
                    if (row[4] != "Host" && row[4] != "HostMS" && row[4] != "Service" && row[4] != "ServiceMS") {
                        tempLabel = tempIdArray[1] ? tempIdArray[1] : tempIdArray[0];
                    }
                }

                var dashboardenabled = "true";
                if (row[8] === null) {
                    dashboardenabled = "true";
                }
                var node = { data: { id: row[0], fullname: label, dashboardenabled: dashboardenabled, dashboard_url: row[8], text: tempLabel, image: image_path + row[5], color: color, size: nodeSize } };
                nodesData.push(node);
                titleToId[label] = row[0];
            });
        }

        if (criticalStatusCount[ip] == 0) {
            obj.isSuccess = true
            $('#pills-critical-tab' + ip).attr('onclick', ' ');
            $("#pills-critical-tab" + ip).html("Critical (" + criticalStatusCount[ip] + ")");
        }
        else {
            obj.isSuccess = false
            var swapid = "card" + ip
            elm = document.getElementById(swapid)
            elm.parentNode.insertBefore(elm, document.getElementById('s_hw').children[0]); $('#pills-critical-tab' + ip).attr('onclick', 'statusFunction(this)');
            $("#pills-critical-tab" + ip).html('<span class="bold-text red">Critical(' + criticalStatusCount[ip] + ')</span>');
        }
        if (okStatusCount[ip] == 0) {
            $('#pills-ok-tab' + ip).attr('onclick', ' ');
            $("#pills-ok-tab" + ip).html("Ok (" + okStatusCount[ip] + ")");
        }
        else
            $("#pills-ok-tab" + ip).html('<span class="bold-text green">Ok(' + okStatusCount[ip] + ')</span>');

        if (pendingStatusCount[ip] == 0) {
            $('#pills-pending-tab' + ip).attr('onclick', ' ');
            $("#pills-pending-tab" + ip).html("Pending (" + pendingStatusCount[ip] + ")");
        }
        else
            $("#pills-pending-tab" + ip).html('<span class="bold-text pending-text">Pending(' + pendingStatusCount[ip] + ')</span>');

        if (warningStatusCount[ip] == 0) {
            $('#pills-warning-tab' + ip).attr('onclick', ' ');
            $("#pills-warning-tab" + ip).html("Warning (" + warningStatusCount[ip] + ")");
        }
        else
            $("#pills-warning-tab" + ip).html('<span class="bold-text warning">Warning(' + warningStatusCount[ip] + ')</span>');

        if (unknownStatusCount[ip] == 0) {
            $('#pills-unknown-tab' + ip).attr('onclick', ' ');
            $("#pills-unknown-tab" + ip).html("Unknown (" + unknownStatusCount[ip] + ")");
        }
        else
            $("#pills-unknown-tab" + ip).html('<span class="bold-text " style="color:white">Unknown(' + unknownStatusCount[ip] + ')</span>');

        var relationResponse = responseFromServer["relationships"]
        if (relationResponse.status == 200) {
            relationResponse.data.forEach(function (row) {
                var edge = { data: { source: row[0], target: row[1], id: "id_" + row[0] + row[1], label: row[2] } };
                edgesData.push(edge);
            });
        }
        createGraph(nodesData, edgesData, ip);
        sumsortedJson[ip] = sortedJson
        sortedJson = []
    }
    else {
        $("#node-view #s_sw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        if (responseCode == 200)
            $("#entity-nodata #nodatamessage").text('No Data');  // No data print here
        else
            $("#entity-nodata #nodatamessage").text('Entity server not reachable.');
    }
}
function displayTable(select) {
    var ip = ($(select).attr("id").split("view")[1])
    var frd_name = ($(select).attr("friendly-name"))

    jsondata = sumsortedJson[ip]
    var ipKey = ip.replace("ip_", "").replaceAll("_", ".");
    if (($(select).attr("class")) == "icon-tableview") {
        $("#table-data" + ip).empty();
        var html = "";
        html += '<thead class="table-head border-t">';
        html += '<tr>';
        html += '<th>IP</th>';
        html += '<th>Service</th>';
        html += '<th>Last Update (mm/dd/yyyy)</th>';
        html += '<th>Status</th>';
        html += '<th>Message</th>';
        html += '<th>Process Threshold</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody class="accordion list" id="accordionExample">';
        if (typeof jsondata !== 'undefined') {
            $.each(jsondata, function (key, val) {
                var finalHtml = "";
                var hostRowSpan = val.hostms.length + val.services.length;
                var serviceRowSpan = 0;

                var hostHtml = "";
                var hostIp = val.host[7] || ipKey;
                hostHtml += "<tr>";
                hostHtml += "<td class = 'ip' rowspan='" + rowSpan + "'>" + hostIp + "</td>";
                hostHtml += "<td style='border-left: 1px solid #eee;'>Server</td>";
                const timestamp = val.host[6];
                const date = new Date(timestamp);
                hostHtml += "<td >" + date.toLocaleString() + "</td>";

                var status = getColorForNodeState(val.host[2]);
                var statusText = val.host[2] == "" ? 'OK' : val.host[2]
                hostHtml += "<td ><span class='white-text py-1 px-2 size12 radius-8 status' style='background:" + status + "'>" + statusText + "</span></td>";
                hostHtml += "<td >" + val.host[3] + "</td>";
                hostHtml += "</tr>";

                var serviceHtml = "";
                if (val.services.length > 0) {
                    val.services.sort(function (a, b) {
                        return a[1].localeCompare(b[1]);
                    });

                    $.each(val.services, function (index, row) {
                        serviceHtml += "<tr>";

                        serviceHtml += "<td class='ip'> </td>";

                        serviceHtml += "<td style='border-left: 1px solid #eee;' class='service'>" + row[1].split(":")[1] + "</td>";
                        const timestamp = row[6];
                        const date = new Date(timestamp);
                        serviceHtml += "<td>" + date.toLocaleString() + "</td>";
                        var status = getColorForNodeState(row[2]);
                        var statusText = row[2] == "" ? 'OK' : row[2];
                        serviceHtml += "<td><span class='white-text py-1 px-2 size12 radius-8 status' style='background:" + status + "'>" + statusText + "</span></td>";
                        serviceHtml += "<td>" + row[3] + "</td>";
                        serviceHtml += "<td>" + row[19] + "</td>";
                        serviceHtml += "</tr>";
                    });
                }

                var rowSpan = hostRowSpan + serviceRowSpan + 1;
                var hostmsHtml = "";
                $.each(val.hostms, function (index, row) {
                    hostmsHtml += "<tr>";
                    hostmsHtml += "<td class = 'ip'> </td>";
                    hostmsHtml += "<td style='border-left: 1px solid #eee;' class='service'>" + row[1].split(":")[1] + "</td>";
                    hostmsHtml += "<td >" + getFormatedDate(row[6]) + "</td>";
                    var status = getColorForNodeState(row[2]);
                    var statusText = row[2] == "" ? 'OK' : row[2]
                    hostmsHtml += "<td ><span class='white-text py-1 px-2 size12 radius-8 status' style='background:" + status + "'>" + statusText + "</span></td>";
                    hostmsHtml += "<td >" + row[3] + "</td>";
                    hostmsHtml += "</tr>";
                });
                finalHtml = hostHtml + serviceHtml + hostmsHtml
                html += finalHtml;
            });
        }
        else {
            var html = '<h4 style="margin-left:40%;font-size:15px;">No (Nodes/Pods)service Available!</h4>'
        }
        html = html + '</tbody>';
        $(".modal-body").append(html);
        $(".modal-title").text(ip.split("p_")[1].replaceAll('_', '.') + " (" + frd_name + ")");
        let options = {
            valueNames: [
                'service',
                'ip',
                'status'
            ]
        };
        nodeList = new List('modal-body', options);
        $(".icon-tableview, .icon-node").toggle(100);

    } else {
        $(".modal-body").children().remove();
        $(".icon-node, .icon-tableview ").toggle(100);
    }
}
function nodeStatus(tempObj) {

    var criticalStatusCount = 0;
    var okStatusCount = 0;
    var pendingStatusCount = 0;
    var warningStatusCount = 0;
    var unknownStatusCount = 0;
    var obj = { "criticalCount": 0, "okStatusCount": 0, "pendingCount": 0, "warningCount": 0 };
    tempObj.forEach(function (row) {
        if (row[0])
            var state = row[0].toUpperCase()
        else
            var state = row[0]
        if (state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING") {
            criticalStatusCount = criticalStatusCount + row[1]
        }
        if (state == "" || state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP") {
            okStatusCount = okStatusCount + row[1]
        }
        if (state === "PENDING") {
            pendingStatusCount = pendingStatusCount + row[1];
        }
        if (state === "WARNING") {
            warningStatusCount = warningStatusCount + row[1];
        }
        if (state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED") {
            unknownStatusCount = unknownStatusCount + row[1];
        }
    });
    obj = { "criticalCount": criticalStatusCount, "okCount": okStatusCount, "pendingCount": pendingStatusCount, "warningCount": warningStatusCount, "unknownCount": unknownStatusCount }
    return obj;
}
function findCount() {
    var hCriticalStatusCount = 0;
    var hOkStatusCount = 0
    var hPendingStatusCount = 0
    var hWarningStatusCount = 0
    var hUnknownStatusCount = 0
    var sCriticalStatusCount = 0;
    var sOkStatusCount = 0
    var sPendingStatusCount = 0
    var sWarningStatusCount = 0
    var sUnknownStatusCount = 0
    sitesData.forEach(function (row) {
        if (row['nodeCount'] == undefined) {
            return
        }
        var data = row['nodeCount']
        hCriticalStatusCount = hCriticalStatusCount + data['host']['criticalCount']
        hOkStatusCount = hOkStatusCount + data['host']['okCount']
        hPendingStatusCount = hPendingStatusCount + data['host']['pendingCount']
        hWarningStatusCount = hWarningStatusCount + data['host']['warningCount']
        hUnknownStatusCount = hUnknownStatusCount + data['host']['unknownCount']

        sCriticalStatusCount = sCriticalStatusCount + data['service']['criticalCount']
        sOkStatusCount = sOkStatusCount + data['service']['okCount']
        sPendingStatusCount = sPendingStatusCount + data['service']['pendingCount']
        sWarningStatusCount = sWarningStatusCount + data['service']['warningCount']
        sUnknownStatusCount = sUnknownStatusCount + data['service']['unknownCount']

        return
    })
    var tempObj = {}
    tempObj['host'] = { "CRITICAL": hCriticalStatusCount, "OK": hOkStatusCount, "PENDING": hPendingStatusCount, "WARNING": hWarningStatusCount, "UNKNOWN": hUnknownStatusCount }
    tempObj['service'] = { "CRITICAL": sCriticalStatusCount, "OK": sOkStatusCount, "PENDING": sPendingStatusCount, "WARNING": sWarningStatusCount, "UNKNOWN": sUnknownStatusCount }

    fillHostServiceCount(tempObj)
}
function createGraph(nodes, edges, ip) {
    if (cyGraph["s_sw" + ip] && typeof cyGraph["s_sw" + ip].destroy === 'function') {
        cyGraph["s_sw" + ip].destroy();
        cyGraph["s_sw" + ip] = null;
    }
    $("#s_sw" + ip).empty();
    cyGraph["s_sw" + ip] = cytoscape(
        {
            container: document.getElementById('s_sw' + ip),
            boxSelectionEnabled: false,
            autounselectify: false,
            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'font-size': '8',
                    'width': 'data(size)',
                    'height': 'data(size)',
                    'background-fit': 'cover',
                    'background-color': 'data(color)',
                    'border-width': 1,
                    'border-opacity': 0.5,
                    'border-color': 'data(color)',
                    'background-image': 'data(image)',
                    'color': 'data(color)',
                })

                .selector('edge')
                .css({
                    'curve-style': 'bezier',
                    'width': 0.5,
                    'target-arrow-shape': 'vee',
                    'line-color': '#aeaeae',
                    'target-arrow-color': '#aeaeae'
                })
                .selector('node.highlight').css({ 'border-width': '3', 'font-size': '20' })
                .selector('node.semitransp').css({ 'opacity': '0.5', 'border-width': '1', 'font-size': '8' })
                .selector('edge.highlight').css({ 'width': '1.5', "label": "data(label)", "text-rotation": "autorotate", 'text-margin-y': '-10px', 'font-size': '10' })
                .selector('edge.semitransp').css({ 'opacity': '0.2', 'width': '0.5' })
                .selector('node.hasLabel').css({ 'label': "data(text)" }),

            elements:
            {
                nodes: nodes,
                edges: edges,
                position: { // the model position of the node (optional on init, mandatory after)
                    x: 0,
                    y: 0
                },
            },
            layout: graphLayout,

        });
    cyGraph["s_sw" + ip].center(),//this is for making the cygraph center
        cyGraph["s_sw" + ip].zoom(0.3),//this is for making the cygraph initial zoom size
        cyGraph["s_sw" + ip].pan({//this is for making the cygraph padding size
            x: 5,
            y: 5
        }); // Moves the graph to the exact center of your tree

    cyGraph["s_sw" + ip].on('tap', 'node', function (e) {
        var neigh = e.target;
        cyGraph["s_sw" + ip].elements().difference(neigh.outgoers().union(neigh.incomers())).not(neigh).addClass('semitransp');
        neigh.addClass('highlight').outgoers().addClass('highlight');
        neigh.addClass('highlight').incomers().addClass('highlight');
        var color = neigh[0]["_private"]["data"]["color"]
        neigh.connectedEdges().style({ 'line-color': color, 'target-arrow-color': color, 'color': color });
    });
    cyGraph["s_sw" + ip].on('click', function (e) {
        cyGraph["s_sw" + ip].elements().removeClass('semitransp');
        cyGraph["s_sw" + ip].elements().removeClass('highlight');
        cyGraph["s_sw" + ip].elements().style({ 'line-color': '#aeaeae', 'target-arrow-color': '#aeaeae' });
    });
    cyGraph["s_sw" + ip].on('zoom', function (event) {
        if (cyGraph["s_sw" + ip].zoom() > 1)
            cyGraph["s_sw" + ip].elements().nodes().addClass('hasLabel')
        else if (cyGraph["s_sw" + ip].zoom() < 1)
            cyGraph["s_sw" + ip].elements().nodes().removeClass('hasLabel')
    });
    cyGraph["s_sw" + ip].cxtmenu(
        {
            openMenuEvents: 'taphold ',
            menuRadius: 75,
            indicatorSize: 0,
            selector: 'node[dashboardenabled="true"]',
            commands:
                [
                    {
                        content: '<span class="fa fa-2x"><i class="icon-analysis" style="color:white"></i></span>',
                        select: function (ele) {
                            openNav(ele.id(), entitySelectedsite, ip);
                        },
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-health" style="color:white"></i></span>',
                        select: function (ele) {
                            openNavs(ele.id(), entitySelectedsite, ip);
                        }
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-help" style="color:white" ></i></span>',
                        select: function (ele) {
                            openhelp(ele.id(), entitySelectedsite, ip);
                        }
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="mdi mdi-email-outline" style="color:white"></i></span>',
                        select: function (ele) {
                            openmail(ele.id(), entitySelectedsite, ip);
                        }
                    }
                ]
        });

    cyGraph["s_sw" + ip].cxtmenu(
        {
            selector: 'node[dashboardenabled="false"]',
            commands:
                [
                    {
                        content: '<span class="fa fa-2x"><i class="icon-analysis text-white"></i></span>',
                        select: function (ele) {
                            openNav(ele.id(), entitySelectedsite);
                        }
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-health text-white"></i></span>',
                        select: function (ele) {
                            openNagiosGraph(ele.id(), ele.data('fullname'));
                        },
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-help text-white"></i></span>',
                        select: function (ele) {
                            openhelp(ele.id(), entitySelectedsite);
                        }
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="mdi mdi-email-outline" style="color:white"></i></span>',
                        select: function (ele) {
                            openmail(ele.id(), entitySelectedsite, ip);
                        }
                    }
                ]
        });
}
function setAnim(id, nodeid) {

    if (nodeid != undefined) {
        var delay = 250;
        var duration = 600;
        cyGraph[id].nodes("[id*=" + nodeid + "]")
            .animate({ 'style': { 'opacity': 0.8 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 0.2 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 0.2 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 0.2 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 0.2 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 0.2 } }, { 'duration': duration }).delay(delay)
            .animate({ 'style': { 'opacity': 1 } }, { 'duration': duration });
    }
}
function nodeSpecificDetails(nodeId, title) {

    if ($("#node-detail").css('display') != 'none') {
        nodeTitle = $("#node-name").text();
        if (nodeId != undefined && nodeTitle == title) {
            showLoader('node-detail')
            requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": nodeId, "mode": '', csrfmiddlewaretoken: csfr_token, selectedSite: entitySelectedsite }, type = "POST").done(nodespecificdetialsresponse);
        }
    }
}
function changeSiteStatus(site, count) {

    var obj = sitesData[0]
    if (obj) {
        obj.criticalNodeCount = count;
        if (count == 0) {
            obj.isSuccess = true
            $("#node-view #site-list #" + site + '_li').removeClass("failure").addClass('success')
        }
        else {
            obj.isSuccess = false
            $("#node-view #site-list #" + site + '_li').removeClass("success").addClass('failure')
        }
    }
}
function InitialPortUpdate(array) {
    array.forEach(function (update) {
        var colorset = 0;
        switch (update['status']) {
            case 0:
                color = '#ff3d57'
                colorset++;
                break;
            case 1:
                color = '#e59105'
                colorset++;
                break;
            case 2:
                color = '#16d39a'
                colorset++;
                break;
            case 3:
                color = '#ffffff'
                colorset++;
                break;
            case 4:
                // console.log('STATUS 4')
                break;
            case 5:
                // console.log('STATUS 5')
                break;
            default:
                color = '#ffffff'//default white
                colorset++;
        }
        if (colorset == 1) {
            $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port'].replaceAll("/", "_")).css('fill', color);
        }
    });
}
function switchportcounts(array) {
    const processed = new Set(); // To track processed combinations of ip and port

    array.forEach(function (update) {
        const ipPortKey = `${update['ip']}-${update['port']}`;

        if (processed.has(ipPortKey)) {
            return; // Skip this iteration if already processed
        }
        processed.add(ipPortKey); // Mark this combination as processed
        if (swiportcounts[update['ip'] + '-conn'] == undefined) {
            swiportcounts[update['ip'] + '-disconn'] = 0;
            swiportcounts[update['ip'] + '-conn'] = 0;
            swiportcounts[update['ip'] + '-unknown'] = 0;
        }

        swiips.push(update['ip']);

        switch (update['status']) {
            case 0:
                swiportcounts[update['ip'] + '-disconn']++;
                break;
            case 2:
                swiportcounts[update['ip'] + '-conn']++;
                break;
            case 3:
                swiportcounts[update['ip'] + '-unknown']++;
                break;
        }
    });

    countloop();
}
function countloop() {
    swiips.forEach(function (obj) {
        if (swiportcounts[obj + '-conn'] == 0) {
            $('#pills-ok-tab' + obj.replaceAll(".", "_")).attr('onclick', ' ');
            $("#pills-ok-tab" + obj.replaceAll(".", "_")).html("Connected (" + swiportcounts[obj + '-conn'] + ")");
        }
        else
            $("#pills-ok-tab" + obj.replaceAll(".", "_")).html('<span class="bold-text green">Connected(' + swiportcounts[obj + '-conn'] + ')</span>');

        if (swiportcounts[obj + '-disconn'] == 0) {
            $('#pills-critical-tab' + obj.replaceAll(".", "_")).attr('onclick', ' ');
            $("#pills-critical-tab" + obj.replaceAll(".", "_")).html("Disconnected (" + swiportcounts[obj + '-disconn'] + ")");
        }
        else
            $("#pills-critical-tab" + obj.replaceAll(".", "_")).html('<span class="bold-text red">Disconnected(' + swiportcounts[obj + '-disconn'] + ')</span>');
        if (swiportcounts[obj + '-unknown'] == 0) {
            $('#pills-unknown-tab' + obj.replaceAll(".", "_")).attr('onclick', ' ');
            $("#pills-unknown-tab" + obj.replaceAll(".", "_")).html("Unknown (" + swiportcounts[obj + '-unknown'] + ")");
        }
        else
            $("#pills-unknown-tab" + obj.replaceAll(".", "_")).html('<span class="bold-text" style="color:white;">Unknown(' + swiportcounts[obj + '-unknown'] + ')</span>');
    });
}

function InitialswitchUpdates(divsdata) {//Switch border color Initial
    divsdata.forEach(function (datadiv) {
        switch (datadiv['status']) {
            case 0:
                color = '#ff3d57'
                if (!($('#s' + datadiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque'))) {
                    $('#s' + datadiv['ip'].replaceAll(".", "_")).addClass("critical_opaque");
                }
                break;
            case 1:
                color = '#e59105'
                if ($('#s' + datadiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                    $('#s' + datadiv['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
                }
                break;
            case 2:
                color = '#16d39a'
                if ($('#s' + datadiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                    $('#s' + datadiv['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
                }
                break;
            case 3:
                color = '#ffffff'
                if ($('#s' + datadiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                    $('#s' + datadiv['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
                }
                break;
            default:
                color = '#000000'
                if ($('#s' + datadiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                    $('#s' + datadiv['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
                }
        }
        $('#s' + datadiv['ip'].replaceAll(".", "_")).css("border", '1px solid' + color);
    });
}

function overallbgcolor(divhwdata) {//Server card border color Initial
    divhwdata.forEach(function (datasdiv) {
        switch (datasdiv['status']) {
            case 0:
                color = '#ff3d57'
                if (!($('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque'))) {
                    $('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).addClass("critical_opaque");
                }
                var swapid = "cardip_" + datasdiv['ip'].replaceAll(".", "_")
                elm = document.getElementById(swapid)
                if (elm != null)
                    elm.parentNode.insertBefore(elm, document.getElementById('s_hw').children[0]);
                break;
            case 1:
                color = '#e59105'
                if ($('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                    $('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
                }
                break;
            case 2:
                color = '#16d39a'
                if ($('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                    $('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
                }
                break;
            case 3:
                color = '#ffffff'
                if ($('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                    $('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
                }
                break;
            default:
                color = '#000000'
                if ($('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                    $('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
                }
        }
        $('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).css("border", '1px solid' + color);
    });
}

//(switch hardware initial update) ONLOAD SWITCH HW COLOR CHANGE AND DATE [DATA IS NOT CURRENT DATE COLOR IS BLUR]
/*function InitialhardwareUpdate(hwdata) {
    console.log("InitialhardwareUpdate--->" + JSON.stringify(hwdata))
    const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
    hwdata.forEach(function (datahw) {
        const hwip = (datahw['ip'].split(":")[0]).replaceAll(".", "_");
        const hwstr = datahw['ip'].split(":")[1];
        const hardid = '#' + hwip + '\\:' + hwstr;
        // Skip "Info" elements
        if (hwstr === "Info") {
            return;  // Skip this iteration
        }
        let color;
        switch (parseInt(datahw['status'])) {
            case 0:
                color = '#ff3d57'; break;
            case 1:
                color = '#e59105'; break;
            case 2:
                color = '#16d39a'; break;
            case 3:
                color = '#ffffff'; break;
            case 5:
                color = '#1f1f1f'; break;
            default:
                color = '#000000';
        }
        // Extract date from datetime, handle null values
        let dataDate = datahw['datetime'] ? datahw['datetime'].split(' ')[0].split('-').reverse().join('-') : null;
        // Check if date matches today, adjust opacity if not
        if (dataDate !== today) {
            $(hardid).css({
                "background-color": color,
                "opacity": "0.2"  // 50% opacity if not today's date
            });
        } else {
            $(hardid).css({
                "background-color": color,
                "opacity": "1"  // Full opacity for today's date
            });
        }
        // Apply a default border for non-Info elements
        $(hardid).css("border", "1px solid #ffffff");
    });
}*/
function InitialhardwareUpdate(hwdata) {
    //console.log("InitialhardwareUpdate--->" + JSON.stringify(hwdata));
    // Get today's date in IST timezone in "YYYY-MM-DD" format
    const todayIST = new Date().toLocaleDateString('en-CA', {
        timeZone: 'Asia/Kolkata'
    });

    hwdata.forEach(function (datahw) {
        const hwip = (datahw['ip'].split(":")[0]).replaceAll(".", "_");
        const hwstr = datahw['ip'].split(":")[1];
        const hardid = '#' + hwip + '\\:' + hwstr;

        // Skip "Info" elements
        if (hwstr === "Info") {
            return;  // Skip this iteration
        }

        let color;
        switch (parseInt(datahw['status'])) {
            case 0:
                color = '#ff3d57'; break;
            case 1:
                color = '#e59105'; break;
            case 2:
                color = '#16d39a'; break;
            case 3:
                color = '#ffffff'; break;
            case 5:
                color = '#1f1f1f'; break;
            default:
                color = '#000000';
        }

        let dataDate = null;

        // Extract date from datetime or epoch
        if (datahw['datetime'] && datahw['datetime'] !== '') {
            // Parse datetime in DD-MM-YYYY format and convert to YYYY-MM-DD
            const dateParts = datahw['datetime'].split(' ')[0].split('-');
            dataDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
        } else if (datahw['epoch'] && !isNaN(datahw['epoch'])) {
            // If datetime is null/empty, use epoch timestamp and convert to IST
            const epochTimestamp = parseInt(datahw['epoch']);

            // Convert epoch (assume seconds) to IST date
            const dateFromEpoch = new Date(epochTimestamp * 1000);
            dataDate = dateFromEpoch.toLocaleDateString('en-CA', {
                timeZone: 'Asia/Kolkata'
            });
        }

        // Check if date matches today, adjust opacity if not
        if (dataDate !== todayIST) {
            $(hardid).css({
                "background-color": color,
                "opacity": "0.2"  // 20% opacity if not today's date
            });
        } else {
            $(hardid).css({
                "background-color": color,
                "opacity": "1"  // Full opacity for today's date
            });
        }

        // Apply a default border for non-Info elements
        $(hardid).css("border", "1px solid #ffffff");
    });
}

/////////////////////////////////////////////////////////////CHANGES FROM SWITCH UPDATE STARTS////////////////////////////////////////////////////////////////////////////////
function InitialhardwareUpdates(divhw) {
    var hwips = (divhw['title'].split(":")[0]).replaceAll(".", "_")
    var inips = 'ip_' + (divhw['title'].split(":")[0]).replaceAll(".", "_")
    var hwstrs = divhw['title'].split(":")[1]
    switch (parseInt(divhw['status'])) {
        case 0:
            color = '#ff3d57'
            $('#' + hwips + '\\:' + hwstrs).css("border", "1px solid #ffffff");
            break;
        case 1:
            color = '#e59105'
            $('#' + hwips + '\\:' + hwstrs).css("border", "1px solid #ffffff");
            break;
        case 2:
            color = '#16d39a'
            $('#' + hwips + '\\:' + hwstrs).css("border", "1px solid #ffffff");
            break;
        case 3:
            color = '#ffffff'
            $('#' + hwips + '\\:' + hwstrs).css("border", "1px solid #ffffff");
            break;
        case 5:
            color = '#1f1f1f'
            $('#' + hwips + '\\:' + hwstrs).css("border", "1px solid #1f1f1f");
            break;
        default:
            color = '#000000'
            $('#' + hwips + '\\:' + hwstrs).css("border", "1px solid #ffffff");
    }

    if (hwips + ':' + hwstrs == hwips + ':Info') {
        $('#' + hwips + '\\:' + hwstrs).css("color", '#ffffff');
        $('#' + hwips + '\\:' + hwstrs).css("border", 'none');
    }
    else {
        $('#' + hwips + '\\:' + hwstrs).css("background-color", color);
    }
}

function overalldivcolor(divcolor) {
    switch (divcolor['status']) {
        case 0:
            color = '#ff3d57';
            if (!($('#cardip_' + divcolor['ip'].replaceAll(".", "_")).hasClass('critical_opaque'))) {
                $('#cardip_' + divcolor['ip'].replaceAll(".", "_")).addClass("critical_opaque");
            }
            var swapid = "cardip_" + divcolor['ip'].replaceAll(".", "_")
            elm = document.getElementById(swapid)
            if (elm != null)
                elm.parentNode.insertBefore(elm, document.getElementById('s_hw').children[0]);
            break;
        case 1:
            color = '#e59105'
            if ($('#cardip_' + divcolor['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                $('#cardip_' + divcolor['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
            }
            break;
        case 2:
            color = '#16d39a'
            if ($('#cardip_' + divcolor['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                $('#cardip_' + divcolor['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
            }
            break;
        default:
            color = '#000000'
            if ($('#cardip_' + divcolor['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                $('#cardip_' + divcolor['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
            }
    }
    $('#cardip_' + divcolor['ip'].replaceAll(".", "_")).css("border", '1px solid' + color);
}

function InitialswitchUpdate(divswi) {
    switch (divswi['status']) {
        case 0:
            color = '#ff3d57'
            if (!($('#s' + divswi['ip'].replaceAll(".", "_")).hasClass('critical_opaque'))) {
                $('#s' + divswi['ip'].replaceAll(".", "_")).addClass("critical_opaque");
            }
            break;
        case 1:
            color = '#e59105'
            if ($('#s' + divswi['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                $('#s' + divswi['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
            }
            break;
        case 2:
            color = '#16d39a'
            if ($('#s' + divswi['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                $('#s' + divswi['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
            }
            break;
        default:
            color = '#000000'
            if ($('#s' + divswi['ip'].replaceAll(".", "_")).hasClass('critical_opaque')) {
                $('#s' + divswi['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
            }
    }
    $('#s' + divswi['ip'].replaceAll(".", "_")).css("border", '1px solid' + color);
}
function waitForSwitchesToLoad() {
    return new Promise((resolve) => {
        // Check for switch loading every 100ms
        const intervalId = trackEntityTimer(setInterval(() => {
            if (window.switchesLoaded) {
                clearInterval(intervalId);
                resolve(); // Resolve the promise when switches are loaded
            }
        }, 100));
    });
}
function switchs() {
    return new Promise((resolve) => {
        // Initialize variables and data structures
        let InitialPortStatus = [];
        let IndividualPortStatus = [];
        let InitialSwitchIcons = [];
        let port_swi = [];
        const layers = ['g_swi', 'e_swi', 'p_swi', 'f_swi', 'r_swi'];

        let gcount = 0, ecount = 0, pcount = 0, fcount = 0, rcount = 0;
        let indexcount = 0;

        // Function to collect all promises from reqdata calls
        const promises = layers.map((layer, index) => reqdata(layer, indexcount++));

        // Wait for all promises to complete
        Promise.all(promises).then(() => {
            // Perform operations after all reqdata calls are done
            getdivcolorDatas();
            countloop();
            performFinalUpdates();
            // Resolve the promise to indicate completion
            resolve();
        });
    });
}

/////////////////////////////////////////////////////////////CHANGES FROM SWITCH UPDATE ENDS////////////////////////////////////////////////////////////////////////////////
function reqdata(layer, indexcount) {
    return new Promise(resolve => {
        requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site"), layer: layer }, "GET").done(response => {
            adata = response['responseData'][0]['site_data']['nodes']['data'];
            arrowdata[indexcount] = response['responseData'][0]['site_data']['nodes']['data']
            adata.forEach(function (obj) {
                var portid
                if (obj[1].includes(":1")) {
                    // keep everything after first ":" (so ":1" stays)
                    portid = obj[1].substring(obj[1].indexOf(":") + 1);
                } else {
                    portid = obj[1].split(":")[1];
                }
                //var portid = obj[1].split(":")[1];
                if (obj[11] == 3) {
                }
                IndividualPortStatus.push({ "ip": obj[7], "layer": layer, "port": obj[1].split(":")[1], "status": obj[11] },)

                if (obj[5] == 'port') {
                    InitialPortStatus.push({ "ip": obj[7], "layer": layer, "port": obj[1].split(":")[1], "status": obj[11] },)
                    //InitialPortStatus.push({ "ip": obj[7], "layer": layer, "port": obj[1].substring(obj[1].indexOf(":") + 1), "status": obj[11] },)
                }
                else if (obj[5].includes(".png") || obj[5].includes(".jpg")) {
                    InitialSwitchIcons.push(obj)
                }
                else {
                    let ele = document.getElementById(layer)
                    IndividualPortStatus.push({ "ip": obj[7], "layer": layer, "port": obj[1].split(":")[1], "status": obj[11] },)
                    if (layer == "g_swi") {
                        gcount++;
                        $("#glayer-heading").show();
                        var srch_row = 'gatewaysearch-row'
                        document.getElementById('gswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">GATEWAY - SWITCH<div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + gcount + '</div><i class="icon-search hide-val' + srch_row + '" id="no-lens' + divid + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>'
                        $('#gswitch-heading').append('<div class="row" id="gatewaysearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="switag' + layer + '" placeholder="Search" /><i class="icon-search" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDivgswi(\'' + this + '\',\'' + layer + '\',\'' + obj[7] + '\')"></i><i class="icon-close" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></div></div><div class="col-2" text-right></div></div>');
                    } else if (layer == "e_swi") {
                        ecount++;
                        $("#elayer-heading").show();
                        var srch_row = 'entitysearch-row'
                        document.getElementById('eswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">EXCHANGE - SWITCH<div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + ecount + '</div><i class="icon-search hide-val' + srch_row + '" id="no-lens' + divid + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>'
                        $('#eswitch-heading').append('<div class="row" id="entitysearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="switag' + layer + '" placeholder="Search" /><i class="icon-search" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDivgswi(\'' + this + '\',\'' + layer + '\',\'' + obj[7] + '\')"></i><i class="icon-close" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></div></div><div class="col-2" text-right></div></div>');
                    } else if (layer == "f_swi") {
                        fcount++;
                        $("#flayer-heading").show();
                        var srch_row = 'firewallsearch-row'
                        document.getElementById('fswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">FIREWALL<div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + fcount + '</div><i class="icon-search hide-val' + srch_row + '" id="no-lens' + divid + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>'
                        $('#fswitch-heading').append('<div class="row" id="firewallsearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="switag' + layer + '" placeholder="Search" /><i class="icon-search" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDivgswi(\'' + this + '\',\'' + layer + '\',\'' + obj[7] + '\')"><i class="icon-close" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></i></div></div><div class="col-2" text-right></div></div>');
                    } else if (layer == "r_swi") {
                        rcount++;
                        $("#rlayer-heading").show();
                        var srch_row = 'routersearch-row'
                        document.getElementById('rswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">ROUTER<div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + rcount + '</div><i class="icon-search hide-val' + srch_row + '" id="no-lens' + divid + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>'
                        $('#rswitch-heading').append('<div class="row" id="routersearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="switag' + layer + '" placeholder="Search" /><i class="icon-search" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDivgswi(\'' + this + '\',\'' + layer + '\',\'' + obj[7] + '\')"><i class="icon-close" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></i></div></div><div class="col-2" text-right></div></div>');
                    } else {
                        pcount++;
                        $("#player-heading").show();
                        var srch_row = 'publicsearch-row'
                        document.getElementById('pswitch-heading').innerHTML = '<div class="row row-width" style="margin:unset">PUBLIC - SWITCH<div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + pcount + '</div><i class="icon-search hide-val' + srch_row + '" id="no-lens' + divid + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>'
                        $('#pswitch-heading').append('<div class="row" id="publicsearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="switag' + layer + '" placeholder="Search" /><i class="icon-search" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDivgswi(\'' + this + '\',\'' + layer + '\',\'' + obj[7] + '\')"></i><i class="icon-close" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></div></div><div class="col-2" text-right></div></div>');
                    }

                    var nodehtmls = ''
                    nodehtmls += '<div class="pill-contain p-0" style = "z-index: 100;" >'
                    nodehtmls += '<div class="row" style="margin-left:0;">'
                    nodehtmls += '<ul class="nav nav-pills mb-2" id="pills-tab" role="tablist">'
                    nodehtmls += '<button class="nav-item mx-2">'
                    nodehtmls += '    <a class="nav-link" id="pills-critical-tab' + obj[7].replaceAll(".", "_") + '" data-toggle="pill" href="#pills-critical" role="tab" aria-controls="pills-critical" aria-selected="false" >Disconnected (0)</a>'
                    nodehtmls += '</button>'
                    nodehtmls += '<button class="nav-item mx-2">'
                    nodehtmls += '    <a class="nav-link" id="pills-ok-tab' + obj[7].replaceAll(".", "_") + '" data-toggle="pill" href="#pills-ok" role="tab" aria-controls="pills-ok" aria-selected="false">Connected (0)</span></a>'
                    nodehtmls += '</button>'
                    nodehtmls += '<button class="nav-item mx-2">'
                    nodehtmls += '    <a class="nav-link" id="pills-unknown-tab' + obj[7].replaceAll(".", "_") + '" data-toggle="pill" href="#pills-unknown" role="tab" aria-controls="pills-unknown" aria-selected="false" >Unknown (0)</a>'
                    nodehtmls += '</button>'
                    nodehtmls += '</ul >'
                    nodehtmls += '</div >'
                    nodehtmls += '</div >'
                    let swi_html_content;
                    switch_ips.push('s' + obj[1].replaceAll(".", "_"))

                    swi_html_content = getSwiHtmlContent(obj[5]); // Initial check for content

                    // If swi_html_content is not set, start polling
                    if (!swi_html_content) {
                        const intervalId = trackEntityTimer(setInterval(() => {
                            swi_html_content = getSwiHtmlContent(obj[5]); // Logic or function that updates swi_html_content
                            if (swi_html_content) {
                                clearInterval(intervalId);
                                continueExecution(swi_html_content, obj, ele, nodehtmls);
                            }
                        }, 100)); // Check every 100 milliseconds
                    } else {
                        continueExecution(swi_html_content, obj, ele, nodehtmls);
                    }
                }
                // switch details in prometheus
                port_swi.push({ "ip": "#" + obj[7].replaceAll(".", "_"), "portid": "#" + portid, "nodeid": obj[0] });
            });
            resolve(); // Resolve the promise after processing
        });
    });
}

function performFinalUpdates() {
    InitialPortUpdate(InitialPortStatus);
    switchportcounts(IndividualPortStatus);
    switchiconsstate(InitialSwitchIcons);
    InitialPortStatus = [];
    IndividualPortStatus = [];
    InitialSwitchIcons = [];

    port_swi.forEach(function (obj) {
        $(obj.ip + " " + (obj.portid).replaceAll('/', '_')).attr('nodeid', obj.nodeid);
    });

    port_swi = [];
    stopLoader("node-view");
}

function continueExecution(swi_html_content, obj, ele, nodehtmls) {
    swi_html_content = swi_html_content.replaceAll('__IP__', obj[7].replaceAll(".", "_"));
    const switchElementId = 's' + obj[7].replaceAll(".", "_");
    const elementId = 'newip' + obj[7].replaceAll(".", "_");

    const swi_html = `<fieldset class="swicolor" id="${switchElementId}" style="border:1px solid #1f1f1f"></fieldset>&emsp;&emsp;`;
    ele.innerHTML += swi_html;

    const switchElement = document.getElementById(switchElementId);
    switchElement.innerHTML += swi_html_content;
    switchElement.innerHTML += nodehtmls;

    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.textContent = obj[12] ? `${obj[7]} ( ${obj[12]} )` : obj[7];
    } else {
        console.log(`Element with ID '${elementId}' not found in the DOM. Retrying...`);
    }
}
function getSwiHtmlContent(type) {
    switch (type) {
        case '24_switch.j2':
            return swi_xml_24;
        case '24_stack_switch.j2':
            return swi_xml_24stack;
        case '48_switch.j2':
            return swi_xml_48;
        case '48_stack_switch.j2':
            return swi_xml_48stack;
        case 'fortigate_firewall.j2':
            return swi_xml_fortigate;
        case 'fortigate_firewall_stack.j2':
            return swi_xml_fortigatestack;
        case 'fortigate_firewall_50E.j2':
            return swi_xml_fortigate50E;
        case 'fortigate_firewall_stack_50E.j2':
            return swi_xml_fortigatestack50E;
        case 'fortigate_firewall_60E.j2':
            return swi_xml_fortigate60E;
        case 'fortigate_firewall_stack_60E.j2':
            return swi_xml_fortigatestack60E;
        case 'fortigate_firewall_60F.j2':
            return swi_xml_fortigate60F;
        case 'fortigate_firewall_stack_60F.j2':
            return swi_xml_fortigatestack60F;
        case 'fortigate_firewall_70F.j2':
            return swi_xml_fortigate70F;
        case 'fortigate_firewall_stack_70F.j2':
            return swi_xml_fortigatestack70F;
        case 'fortigate_firewall_80F.j2':
            return swi_xml_fortigatestack80F;
        case 'fortigate_firewall_stack_80F.j2':
            return swi_xml_fortigatestack80F;
        case 'fortigate_firewall_100E.j2':
            return swi_xml_fortigate100E;
        case 'fortigate_firewall_stack_100E.j2':
            return swi_xml_fortigatestack100E;
        case 'fortigate_firewall_100F.j2':
            return swi_xml_fortigate100F;
        case 'fortigate_firewall_stack_100F.j2':
            return swi_xml_fortigatestack100F;
        case 'fortigate_firewall_200F.j2':
            return swi_xml_fortigate200F;
        case 'fortigate_firewall_stack_200F.j2':
            return swi_xml_fortigatestack200F;
        case 'fortigate_firewall_120G.j2':
            return swi_xml_fortigate120G;
        case 'fortigate_firewall_stack_120G.j2':
            return swi_xml_fortigatestack120G;
        case 'router_4321.j2':
            return swi_xml_router_4321;
        case 'Huawei_S5720_32X_EI_AC.j2':
            return swi_xml_32;
        case 'Huawei_S5720_32X_EI_AC_stack.j2':
            return swi_xml_32stack;
        case 'Huawei_S5735_L24T4X_A1.j2':
            return swi_xml_L24T4X_A1;
        case 'Huawei_S5735_L24T4X_A1_stack.j2':
            return swi_xml_L24T4X_A1_stc;
        case 'Huawei_S5720_52X_LI_AC.j2':
            return swi_xml_S5720_52X;
        case 'Huawei_S5720_52X_LI_AC_stack.j2':
            return swi_xml_S5720_52X_stc;
        case 'Huawei_S6720S_26Q_EI_24S_AC.j2':
            return swi_xml_S6720S_24S;
        case 'Huawei_S6720S_26Q_EI_24S_AC_stack.j2':
            return swi_xml_S6720S_24S_stc;
        case 'Cisco_Catalyst_2960_S.j2':
            return swi_xml_Cisco_2960;
        case 'Cisco_Catalyst_2960_S_stack.j2':
            return swi_xml_Cisco_2960_stc;
        case 'Cisco_C2960_48TT_L.j2':
            return swi_xml_C2960_48TT;
        case 'Cisco_C2960_48TT_L_stack.j2':
            return swi_xml_C2960_48TT_stc;
        case 'cisco_SG350X_24.j2':
            return swi_xml_SG350X_24;
        case 'cisco_SG350X_24_stack.j2':
            return swi_xml_SG350X_24_stc;
        case 'BARRACUDA_300.j2':
            return swi_xml_barracuda;
        case 'BARRACUDA_300_stack.j2':
            return swi_xml_barracuda_stc;
        case 'BIG_IP_i4600.j2':
            return swi_xml_big_ip;
        case 'BIG_IP_i4600_stack.j2':
            return swi_xml_big_ip_stc;
        case 'Cisco_2911.j2':
            return swi_xml_cisco_2911;
        case 'Cisco_2911_stack.j2':
            return swi_xml_cisco_2911_stc;
        case 'Cisco_2921.j2':
            return swi_xml_cisco_2921;
        case 'Cisco_2921_stack.j2':
            return swi_xml_cisco_2921_stc;
        case 'Cisco_2960_G.j2':
            return swi_xml_cisco_2960;
        case 'Cisco_2960_G_stack.j2':
            return swi_xml_cisco_2960_stc;
        case 'Cisco_3945.j2':
            return swi_xml_cisco_3945;
        case 'Cisco_3945_stack.j2':
            return swi_xml_cisco_3945_stc;
        case 'Cisco_FTD_2130.j2':
            return swi_xml_cisco_ftd;
        case 'Cisco_FTD_2130_stack.j2':
            return swi_xml_cisco_ftd_stc;
        case 'Cisco_ISR_1000.j2':
            return swi_xml_cisco_isr;
        case 'Cisco_ISR_1000_stack.j2':
            return swi_xml_cisco_isr_stc;
        case 'Cisco_Nexus_9000.j2':
            return swi_xml_cisco_nexus;
        case 'Cisco_Nexus_9000_stack.j2':
            return swi_xml_cisco_nexus_stc;
        case 'HPE_SN3600B_FC.j2':
            return swi_xml_hpe_sn3600b;
        case 'HPE_SN3600B_FC_stack.j2':
            return swi_xml_hpe_sn3600b_stc;
        case 'NetApp_AFF_A200.j2':
            return swi_xml_netapp_aff;
        case 'NetApp_AFF_A200_stack.j2':
            return swi_xml_netapp_aff_stc;
        case 'radware_defence_bro_x10.j2':
            return swi_xml_radware_brox10;
        case 'radware_defence_bro_x10_stack.j2':
            return swi_xml_radware_brox10_stc;
        case 'Cisco_C9300X_24HX.j2':
            return swi_xml_C9300X_24HX;
        case 'Cisco_C9300X_24HX_stack.j2':
            return swi_xml_C9300X_24HX_stc;
        case 'Cisco_C9200L_24T_4G.j2':
            return swi_xml_C9200L_24T;
        case 'Cisco_C9200L_24T_4G_stack.j2':
            return swi_xml_C9200L_24T_stc;
        case 'Cisco_C9200L_48T_4G.j2':
            return swi_xml_C9200L_48T;
        case 'Cisco_C9200L_48T_4G_stack.j2':
            return swi_xml_C9200L_48T_stc;
        case 'Aruba_2930F_24G_4SFP.j2':
            return swi_xml_Aruba_2930F_24G;
        case 'Aruba_2930F_24G_4SFP_stack.j2':
            return swi_xml_Aruba_2930F_24G_stc;
        case 'arista_7124sx_960px.j2':
            return swi_xml_arista_7124sx;
        case 'arista_7124sx_960px_stack.j2':
            return swi_xml_arista_7124sx_stc;
        case 'Dell_s5248F.j2':
            return swi_xml_dell_s5248F;
        case 'Dell_s5248F_stack.j2':
            return swi_xml_dell_s5248F_stc;
        case 'Cisco_catalys_1300_48_GE.j2':
            return swi_xml_Cata_1300_48GE;
        case 'Cisco_catalys_1300_48_GE_stack.j2':
            return swi_xml_Cata_1300_48GE_stc;
        case 'Cisco_Catalyst_C9300X_48TX.j2':
            return swi_xml_C9300X_48TX;
        case 'Cisco_Catalyst_C9300X_48TX_stack.j2':
            return swi_xml_C9300X_48TX_stc;
        case 'Arista_7050X3.j2':
            return swi_xml_arista_7050x3;
        case 'Arista_7050X3_stack.j2':
            return swi_xml_arista_7050x3_stc;


        default:
            return null; // Return null if content is not yet available
    }
}
///////////////////////////////////////////---------------------TESTING--------------//////////////////////////////////////////////
function switchiconsstate(icons) {
    icons.forEach(function (obj) {
        var nodesid = obj[0];
        var nodesip = (obj[7].split(":")[0]).replaceAll('.', '_');
        var snmpip = obj[7].split(":")[0];
        var swihwdata = ''
        var icohtml = ''
        if (obj[5] == "Info.png") {
            icohtml += '<button type="button" class="btn btn-default btn-ripple sm-hide" id="thresholdsnmp_' + nodesip + '" onclick="thresholdsnmp(\'' + snmpip + '\')" style="margin-left:-57px">'
            icohtml += '<i class="mdi mdi-alpha-t-box-outline" id="" style="color:white;font-size: 16px;"  ></i>'
            icohtml += '</button>'
            icohtml += '<button type="button" class="btn btn-default btn-ripple sm-hide" id="button' + nodesip + '" style="margin-left:0px" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)">'
            icohtml += '<i class="mdi mdi-information-outline" id="' + nodesip + ':Info"  title="" style="color:white;font-size: 16px;"  ></i>'
            icohtml += '</button>'
            icohtml += '<div class="modal fade" id="thresholdsnmpModal_' + snmpip.replaceAll('.', '_') + '" tabindex="-1" role="dialog" aria-labelledby="thresholdModalLabel" aria-hidden="true" style="overflow-y:hidden !important;top:25px !important;">'
            icohtml += '<div class="modal-dialog" role="document">'
            icohtml += '<div class="modal-content thresh-content" style="width: 50%; !important">'
            icohtml += '<div class="modal-header">'
            icohtml += '<h5 class="modal-title" id="thresholdsnmpModals_' + snmpip.replaceAll('.', '_') + '"></h5>'
            icohtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="background-color:#1f1f1f;color:white;border: 1px solid #ff0000">'
            icohtml += '<span aria-hidden="true">&times;</span>'
            icohtml += '</button>'
            icohtml += '</div>'
            icohtml += '<div class="modal-body">'
            icohtml += '</div>'
            icohtml += '<div class="modal-footer">'
            icohtml += '<p id="snmpfooter"><span style="color:red; font-size:15px;">*</span> w (warning), c (Critical), t (Time)</p>'
            icohtml += '</div >'
            icohtml += '</div>'
            icohtml += '</div>'
            icohtml += '</div>'
        }
        if (obj[5] != "Info.png") {
            swihwdata += '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize" id="' + (obj[1]).replaceAll('.', '_') + '" src="/static/images/' + obj[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/>'
            swihwdata += '<span class="tooltiptexts" style="right: 0px !important;left:12px !important;width:200% !important;"><p>' + (obj[1].split(":")[1]) + '</p></span>'
            swihwdata += '</div >'
        }
        $('#swihw' + (obj[7]).replaceAll('.', '_')).append(swihwdata);
        $('#iconip' + (obj[7]).replaceAll('.', '_')).append(icohtml);
        InitialswihardStatus.push({ "ip": obj[1], "status": obj[11], "datetime": obj[18], "epoch": obj[7] },)
    });
    InitialhardwareUpdate(InitialswihardStatus)
}
function thresholdsnmp(snmpip) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", leurl + "allonboard/snmpdatatable?ipaddress=" + encodeURIComponent(snmpip), true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) { // 4 means the request is complete
            if (xhr.status == 200) { // 200 means the request was successful
                var response = JSON.parse(xhr.responseText);
                const modalId = 'thresholdsnmpModal_' + snmpip.replaceAll('.', '_');
                document.getElementById('thresholdsnmpModals_' + snmpip.replaceAll('.', '_')).textContent = snmpip + ' - Threshold Values';
                // Clear existing modal title
                $("#" + modalId + " .modal-body").empty();

                if (response.status === 200) {
                    // Data is present
                    // Extract "snmp_threshold" and parse it into an object
                    if (response && response.data && Array.isArray(response.data)) {
                        const snmpThresholdData = response.data[0].snmp_threshold;
                        const snmpThresholdValues = JSON.parse(snmpThresholdData.replace(/'/g, '"'));

                        // Rest of your code for processing the response...
                        const keyValueContainer = document.createElement('div');
                        keyValueContainer.className = "col-12";
                        for (const key in snmpThresholdValues) {
                            if (snmpThresholdValues.hasOwnProperty(key)) {
                                const value = snmpThresholdValues[key];

                                // Check if value is not an empty string
                                if (value.length !== 0) {
                                    const keyDiv = document.createElement('div');
                                    keyDiv.className = "col-7";
                                    keyDiv.innerHTML = "<p style='margin-left:5%; font-size: 15px;'>" + key + "</p>";

                                    const hiDiv = document.createElement('div');
                                    hiDiv.className = "col-1";
                                    hiDiv.innerHTML = "<p >-</p>";

                                    const valueDiv = document.createElement('div');
                                    valueDiv.className = "col-4";
                                    valueDiv.innerHTML = "<p style='font-size: 15px;'>" + value + "</p>";

                                    const rowDiv = document.createElement('div');
                                    rowDiv.className = "row";
                                    rowDiv.appendChild(keyDiv);
                                    rowDiv.appendChild(hiDiv);
                                    rowDiv.appendChild(valueDiv);

                                    keyValueContainer.appendChild(rowDiv);
                                }
                            }
                        }

                        // Append the key-value container to the modal body
                        $("#" + modalId + " .modal-body").html(keyValueContainer);
                        $("#" + modalId + " #snmpfooter").show();
                    }
                } else {
                    // Data is not present
                    $("#" + modalId + " .modal-body").html("<p style='font-size: 15px;text-align: center;'>No data in table</p>");
                    $("#" + modalId + " #snmpfooter").hide();
                }

                // Show the modal
                $("#" + modalId).modal("show");
            } else {
                // Handle errors
                console.error('Error fetching data:', xhr.statusText);
            }
        }
    };

    // Send the request
    xhr.send();
}
function getdivcolorDatas() {
    requestDataFromServer("../dashboard/getHostOrIconnodes", { sitename: params.get("site") }, type = "GET").done(function (response) {
        host_divbgcolor = response['responseData'][0]['nodes_data']['hosts']['data']
        icons_bgcolor = response['responseData'][0]['nodes_data']['icons']['data']
        host_divbgcolor.forEach(function (obj) {
            InitialhwdivStatus.push({ "ip": obj[7], "status": obj[11] })
            overallbgcolor(InitialhwdivStatus) //Server card border color
            InitialSwitchStatus.push({ "ip": obj[7], "status": obj[11] })
            InitialswitchUpdates(InitialSwitchStatus)//Switch card border color 
        });
    });

}
function clicked(evt) {
    var e = evt.target;
    var dim = e.getBoundingClientRect();
    var w = $(window);
    var el = document.getElementById('portinfo');
    el.style.display = "block";
    el.style.position = "absolute";
    var totwidth = (dim.left / window.innerWidth) * 100
    if (window.innerWidth <= 350) {
        if (totwidth > 70) {
            el.style.left = 0.85 * window.innerWidth - 50 + 'px'
        } else {
            el.style.left = dim.left + w.scrollLeft() + 'px';
        }
        el.style.top = dim.top + w.scrollTop() + 'px';
    } else {
        if (totwidth > 85) {
            el.style.left = 0.85 * window.innerWidth + 'px'
        } else {
            el.style.left = dim.left + w.scrollLeft() + 'px';
        }
        el.style.top = dim.top + w.scrollTop() + 'px';
    }
}
function closedropdown() {
    var el = document.getElementById('portinfo');
    el.style.display = 'none';
}
function click(select, event) {
    var temphtml = '';
    var newip = "ip_" + ($(select).attr("class").split("-")[1]);
    var portid = ($(select).attr("id").replaceAll('_', '/'));
    var title = ($(select).attr("class").split("-")[1]).replaceAll('_', '.') + ':' + portid
    //console.log("click--->" + title)
    var messagedata;
    var nodeid = $(select).attr("nodeid")
    var layerdiv = ''
    requestDataFromServer('/entity/getneo4jspecificelement', { title: title, required: 'ifAlias', sitename: selectedsite }, "GET").done(function (response) {
        var res = JSON.parse(response);
        var link = ''
        var src_name = ''
        var dest_name = ''
        if (Object.keys(res['data']).length != 0) {
            messagedata = res['data']['data']
            for (var i in messagedata) {
                if (messagedata[i] == null)
                    messagedata[i] = ''
            }
            link = messagedata[0]
            src_name = messagedata[1]
            dest_name = messagedata[2]
        }
        layerdiv = ((document.getElementById('s' + ($(select).attr("class").split("-")[1]))).parentNode.id).split("_")[0]
        if (link != '' || src_name != '') {
            document.getElementById(layerdiv + 'selectedip').innerText = ($(select).attr("class").split("-")[1]) + " " + portid + ' port ' + ((src_name != '') ? '(' + src_name + ')' : '') + ' - ' + link + ((dest_name != '') ? '(' + dest_name + ')' : '');
        } else {
            document.getElementById(layerdiv + 'selectedip').innerText = ($(select).attr("class").split("-")[1]) + " " + portid + ' port selected';
        }

        document.getElementById(layerdiv + 'selectedip').style.display = 'block';
        var timeDelay = 10000;       // DELAY IN MILLISECONDS (OR SIMPLY, 5 SECONDS DELAY).
        setTimeout(clearContents, timeDelay);

        function clearContents() {
            document.getElementById(layerdiv + 'selectedip').style.display = 'none';
        }
    });

    $("#portinfo").empty();

    temphtml += '<span class="fa fa-2x"><i class="icon-analysis" onclick="openNav(\'' + nodeid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-health" onclick="openNavs(\'' + nodeid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-help" onclick="openhelp(\'' + nodeid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="mdi mdi-email-outline" onclick="openmail(\'' + nodeid + '\',\'' + siteName + '\',\'' + newip + '\', \'' + title + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="mdi mdi-clock" onclick="opensnooze(\'' + nodeid + '\',\'' + siteName + '\',\'' + newip + '\', \'' + title + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<div class="fa"><i class="icon-close" onclick="closedropdown()" style="color:#fff"></i></div>'

    $("#portinfo").append(temphtml);
    var ns = ($(select).attr("class")).toString()
    clicked(event);
}
function openOnImageClick(select, nodesid, nodesip, event) {
    var newip = 'ip_' + nodesip
    var newid = nodesid
    var temphtml = '';

    // Extract title from ID and format it (restore IP dots)
    var elementId = $(select).attr("id");
    var title = elementId;
    if (elementId && nodesip) {
        // Replace the nodesip part (which has underscores) with dots
        // Assumption: nodesip in ID corresponds exactly to the passed nodesip argument
        var ipWithDots = nodesip.replaceAll('_', '.');
        title = elementId.replace(nodesip, ipWithDots);
    }
    //console.log("openOnImageClick title:", title);

    $("#portinfo").empty();
    temphtml += '<span class="fa fa-2x"><i class="icon-analysis" onclick="openNav(\'' + newid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-health" onclick="openNavs(\'' + newid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-help" onclick="openhelp(\'' + newid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="mdi mdi-email-outline" onclick="openmail(\'' + newid + '\',\'' + siteName + '\',\'' + newip + '\', \'' + title + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="mdi mdi-clock" onclick="opensnooze(\'' + newid + '\',\'' + siteName + '\',\'' + newip + '\', \'' + title + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<div class="fa"><i class="icon-close" onclick="closedropdown()" style="color:#fff"></i></div>'

    $("#portinfo").append(temphtml);
    clicked(event);
}
function startEntityLoader() {

    $('#node-view #entity-nodata').css("display", "none")
    $('#node-view #s_sw').css("display", "none")
    $('#node-view #s_hw').css("display", "none")
    showLoader("node-view")
}
function stopEntityLoader() {

    $('#node-view #entity-nodata').css("display", "block")
    $('#node-view #s_sw').css("display", "block")
    $('#node-view #s_hw').css("display", "block")
    stopLoader("node-view")
}
// Function to handle upload container visibility and file input
function entUploadForm() {
    var uploadContainer = document.getElementById("entuploadContainer");
    if (uploadContainer.style.display === "none") {
        uploadContainer.style.display = "block";
    } else {
        uploadContainer.style.display = "none";
    }
    readExcelFile();
}

// Function to process the stored file (process and read the Excel file)
function readExcelFile() {
    const fileInput = document.getElementById('entfileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result); // Read the file data
            const workbook = XLSX.read(data, { type: 'array' }); // Parse the file as an Excel workbook

            const firstSheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
            const jsonData = XLSX.utils.sheet_to_json(firstSheet); // Convert sheet to JSON
            const excelData = jsonData;
            // Call the new function and pass the parsed data
            sendentdatapy(jsonData); // Send the data to the new function
            // Further processing if needed
        };

        reader.readAsArrayBuffer(file); // Read the file as an array buffer
    } else {
        console.error("No file selected.");
    }
}

function sendentdatapy(data) {
    swal({
        title: 'PROCESSING...',
        text: 'Processes and Relationships are being processed. Please wait.',
        type: 'info',
        showConfirmButton: false, // No need to confirm this interim alert
        allowOutsideClick: false // Prevent clicking outside to close
    });

    fetch('/entity/postentprocessdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') // If you're using CSRF protection
        },
        body: JSON.stringify({ data: data }) // Send the data as JSON in the request body
    })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.status === 200) {
                // Success alert
                swal({
                    title: 'SUCCESS!',
                    text: responseData.details || 'Data processed successfully',
                    type: 'success',
                    confirmButtonClass: 'btn-danger',
                    confirmButtonText: 'OK'
                });
            } else {
                // Error alert
                swal({
                    title: 'FAILURE!',
                    text: responseData.details || 'Something went wrong',
                    type: "warning",
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: 'OK'
                });
            }
        })
        .catch(error => {
            // Close the "PROCESSING" swal in case of an error
            console.error("Error sending data:", error);
            swal({
                title: 'ERROR!',
                text: 'An error occurred while sending data.',
                type: "error",
                confirmButtonClass: "btn-danger",
                confirmButtonText: 'OK'
            });
        });
}

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
