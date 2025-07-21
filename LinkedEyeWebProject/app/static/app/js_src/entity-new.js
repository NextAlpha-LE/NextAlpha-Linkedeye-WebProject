//const { isEmptyObject } = require("jquery");

var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
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
var swi_xml_C9200L_48T = "";
var swi_xml_C9200L_48T_stc = "";
var swi_xml_Aruba_2930F_24G = "";
var swi_xml_Aruba_2930F_24G_stc = "";
var swi_xml_arista_7124sx = "";
var swi_xml_arista_7124sx_stc = "";
var swi_xml_dell_s5248F = "";
var swi_xml_dell_s5248F_stc = "";



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
$(document).ready(function () {
    var ssitehtml = ''
    ssitehtml += '<li class="nav-item" id="' + params.get("site") + '_li" style="position: relative;"><span class="" style="z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + params.get("site") + '"></span> <a class="bold-text" style="color:#c8c8c8;" data-id="' + params.get("site") + '" id="' + params.get("site") + '" data-toggle="tab" >' + params.get("site") + '&ensp;>&ensp;</a></li><h2 style="font-size:15px;">Domain Status<h2>'
    $("#node-view #site-list").append(ssitehtml)
    requestDataFromServer("../dashboard/getSwitches", { sitename: params.get("site") }, type = "GET").done(switch_onload);
    requestDataFromServer("../dashboard/getstatusAll", { sitename: params.get("site") }, type = "GET").done(setstatusdata);


    //getSwitchXML();
    getSiteNames();
    //  getEntityData();
    //  searchNodes();

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
        //console.log('evt target TAGNAME-->' + e.target.tagName)
        const $dropdownMenu = $('#portinfo');
        if (!$dropdownMenu.is(e.target) && !(e.target.tagName === 'g') && !(e.target.tagName === 'path') && !(e.target.classList.contains('imgsize')) && !(e.target.classList.contains('mdi-information-outline')) && ($dropdownMenu.css('display') === 'block') && $dropdownMenu.has(e.target).length === 0) {
            $dropdownMenu.css('display', 'none');
        }
    });


    //toggle testing 16-11-2023
    // Add event listener to toggle button
    document.getElementById('toggleButton').addEventListener('change', function () {
        // Perform actions when the toggle button is clicked/changed
        if (this.checked) {
            //console.log('TOG_NICCONNECT--->' + JSON.stringify(tog_nicconnect))
            //console.log('TOG_ARROWDATA--->' + JSON.stringify(tog_arrowdata))

            //console.log('NICCONNECT_LINKS--->' + JSON.stringify(niccon_links))
            //console.log('ARROWDATA_LINKS--->' + JSON.stringify(arrow_links))
            // Actions when toggle is ON
            document.getElementById("toggleButton").textContent = 'VM'
            all_Vms = false;
            //console.log('<------------------------------TOGGLED----------------------------------->')

            //observers.forEach(observer => observer.disconnect());// remove mutation observer listeners
            //console.log('All MutationObservers have been disconnected.');

            Object.keys(niccon_links).forEach(outerKey => {
                //nicconnect.forEach(function (obj) {//SERVER NIC LEADERLINE
                //console.log('OBJ IN TOGGGLE ON--->' + obj)
                var link = niccon_links[outerKey];
                (document.getElementById('s_hw')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);

                (document.getElementById('server-div')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);
                (document.getElementById('ps_hw')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);
                (document.getElementById('vms_hw')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);

                Array.from(document.getElementsByClassName('icon-evts')).forEach(function (elemt) {
                    elemt.removeEventListener('click', AnimEvent.add(function () {
                        link.position();
                    }), false);
                });
                Array.from(document.getElementsByClassName('fancy')).forEach(function (elemt) {
                    elemt.removeEventListener('click', AnimEvent.add(function () {
                        setTimeout(function () { link.position(); }, 2000);
                    }), false);
                });

                (document.getElementById('g-switch')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);
                (document.getElementById('p-switch')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);
                (document.getElementById('e-switch')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);
                (document.getElementById('g-div')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);
                (document.getElementById('s_hw')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);
                (document.getElementById('server-div')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);
                (document.getElementById('ps_hw')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);
                (document.getElementById('vms_hw')).removeEventListener('scroll', AnimEvent.add(function () {
                    link.position();
                }), false);
                Array.from(document.getElementsByClassName('icon-evts')).forEach(function (elemt) {
                    elemt.removeEventListener('click', AnimEvent.add(function () {
                        link.position();
                    }), false);
                });
                AnimEvent.remove(function () {
                    link.position();
                })
                Array.from(document.getElementsByClassName('fancy')).forEach(function (elemt) {
                    elemt.removeEventListener('click', AnimEvent.add(function () {
                        setTimeout(function () { link.position(); }, 2000);
                    }), false);
                });
                AnimEvent.remove(function () {
                    setTimeout(function () { link.position(); }, 2000);
                })

                var obj = tog_nicconnect[outerKey]
                //console.log('OBJ IN TOGGLE ON NICCON_LINKS for - ' + outerKey + '--->' + obj)
                niccon_links[outerKey].remove()
                var element = '';
                var elem_name = '';
                if (obj['start'].includes('SW_NIC')) {
                    elem_name = obj['start'].replaceAll('SW_NIC', 'NIC')
                    element = document.getElementById('ip_' + elem_name.replaceAll('.', '_'));
                } else {
                    element = document.getElementById(obj['start'].replaceAll('.', '_') + ':SW_NIC');
                }
                //var element = document.getElementById(obj[1].replaceAll('.','_')+':SW_NIC');
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

            //console.log('ARROW LINKS---->' + JSON.stringify(arrow_links))
            //console.log('tog_arrowdata---->' + JSON.stringify(tog_arrowdata))

            Object.keys(arrow_links).forEach(outerKey => { //REMOVING (PORT TO NIC) OR (PORT TO PORT) LEADERLINE
                var obj = tog_arrowdata[outerKey];


                //console.log('OBJ IN TOGGLE ON ARROW_LINKS for - ' + outerKey + '--->' + obj)
                //console.log('')

                var link = arrow_links[outerKey];
                // Remove scroll event listeners from elements by IDs
                $('#g-switch, #p-switch, #e-switch, #g-div, #s_hw, #server-div, #ps_hw, #vms_hw').off();

                // Remove click event listeners from elements by class names
                $('.icon-evts, .fancy').off();
                AnimEvent.remove(function () {
                    link.position();
                })
                AnimEvent.remove(function () {
                    setTimeout(function () { link.position(); }, 2000);
                })

                //console.log('ARROWLINKS--->' + JSON.stringify(arrow_links))
                // console.log('ARROWLINKS[OUTERKEY]--->' + JSON.stringify(link))
                //console.log('OUTERKEY--->' + outerKey)
                //console.log('BEFORE TOGGLE (arrow_links[outerKey]).start ---> ' + (link).start + ' (arrow_links[outerKey]).end ---> ' + (link).end);



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
                /*element = document.getElementById(start_prefix + start).getElementById(start_port)*/
                clone = start_element.cloneNode(true);
                start_element.parentNode.replaceChild(clone, start_element);


                clone = end_element.cloneNode(true);
                end_element.parentNode.replaceChild(clone, end_element);

            })
            const lineElements = document.querySelectorAll('.leader-line, .leader-line-color, .leader-line-cap');
            lineElements.forEach(el => el.remove());
            observers.forEach(observer => observer.disconnect());// remove mutation observer listeners
            observers = []
            // console.log('All MutationObservers have been disconnected.');
            //console.log('Toggle is ON');
            // You can add more actions here for when the toggle is switched on
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
            //console.log('<------------------------------TOGGLED BACK----------------------------------->')
            //console.log('NICCONNECT--->' + JSON.stringify(nicconnect))
            //console.log('TOG_NICCONNECT--->' + JSON.stringify(tog_nicconnect))
            //console.log('TOG_ARROWDATA--->' + JSON.stringify(tog_arrowdata))
            //console.log('NICCONNECT_LINKS--->' + JSON.stringify(niccon_links))
            //console.log('ARROWDATA_LINKS--->' + JSON.stringify(arrow_links))
            //console.log('ARROWDATA--->' + arrowdata)
            Object.keys(tog_nicconnect).forEach(outerKey => {//SERVER NIC LEADERLINE
                //nicconnect.forEach(function (obj) {//SERVER NIC LEADERLINE
                //console.log('NICCONNECT DATA---->' + JSON.stringify(tog_nicconnect[outerKey]))
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

                        (start).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                        (start).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                        (end).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                        (end).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);


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
                                        // console.log('top mutation linknicconnect else--->' + link);
                                        link.position();
                                    } else {
                                        link.position();
                                    }
                                }
                            });
                            observer.observe(element, observerOptions);
                            observers.push(observer);
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
                                        // console.log('top mutation linknicconnect else--->' + link);
                                        link.position();
                                    } else {
                                        link.position();
                                    }
                                }
                            });
                            observer.observe(element, observerOptions);
                            observers.push(observer);
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
            //console.log('Toggle is OFF');
            // You can add more actions here for when the toggle is switched off



            Object.keys(tog_arrowdata).forEach(outerKey => {//ID(n), n.title, n.monitor_status, n.monitor_message, n.type, n.image, n.epoch, n.hostIp,n.overlayIP, n.dashboard, n.link, n.status, n.Friendly_name, n.Nics_list, n.Phy_Physicalip, n.DiskVolumes_list, n.Phy_Physicalniclink

                var obj = tog_arrowdata[outerKey];
                var portid = obj['start'].split(":")[1];
                var start_id = ''
                var start_ip = (obj['start'].split(":")[0]).replaceAll(".", "_")
                var start_port = (obj['start'].split(':'))[1].replace(/\//g, '_')
                var end_ip = ''
                //console.log('ARROW DATA--->' + JSON.stringify(obj))

                //console.log("start_port + '-' + start_ip ---> " + start_port + '-' + start_ip)
                start_id = obj['start'].replaceAll(".", "_")
                if (obj['end'] != 'null' && jQuery.isEmptyObject(obj['end']) != true && obj['end'] != 'none') {
                    var start = (document.getElementsByClassName((start_port + '-' + start_ip)))[0]
                    /*var start = document.getElementById(start_id).getElementById(obj['start'].split("__")[1])*/
                    end_ip = (obj['end'].split(":")[0]).replaceAll(".", "_")

                    var end = '';
                    var end_id = ''
                    /*if (obj['end'].includes(':p')) {
                        end_id = 'p_' + (obj['end'].split(":")[0]).replaceAll(".", "_")
                        end_ip = end_id.split("p_")[1];
                    } else if (obj['end'].includes(':s')) {
                        end_id = 's_' + (obj['end'].split(":")[0]).replaceAll(".", "_")
                        end_ip = end_id.split("s_")[1];
                    }*/

                    if (obj['end'].includes(':') && (document.getElementById((obj['end'].split(":")[0]).replaceAll(".", "_"))) != null) {
                        end_port = (obj['end'].split(":")[1]).replace(/\//g, '_')
                        // console.log("end_port + '-' + end_ip ---> " + end_port + '-' + end_ip)
                        //if (obj['end'].includes('__')) {
                        //    end = document.getElementById(end_id).getElementById(obj['end'].split("__")[1])
                        //} else {
                        //    end = document.getElementById(end_id).getElementById(obj['end'].split(":")[1])
                        //}
                        end = (document.getElementsByClassName((end_port + '-' + end_ip)))[0]
                    } else {
                        var nameelements = document.getElementsByName((obj['end'].split(":")[0]).replaceAll(".", "_") + ':NIC')
                        var classelements = document.getElementsByClassName((obj['end'].split(":")[0]).replaceAll(".", "_") + ':NIC')
                        end = classelements[0];
                    }
                    // console.log('START ---> ' + start)
                    // console.log('END ---> ' + end)
                    if (portid != undefined && portid != null && start != null && end != null && end != undefined) {
                        var clr
                        if (obj['status'].toString() == '2') {
                            var scrolldiv = document.getElementById('g-switch')
                            var link = new LeaderLine(start,
                                end,
                                { color: '#16d39a', hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                            );
                            (start).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                            (start).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                            (end).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                            (end).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);


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
                                            // console.log('top mutation linkport else--->' + link);
                                            link.position();
                                        } else {
                                            link.position();
                                        }
                                    }
                                });
                                observer.observe(element, observerOptions);
                                observers.push(observer);
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
                                            // console.log('top mutation linkport else--->' + link);
                                            link.position();
                                        } else {
                                            link.position();
                                        }
                                    }
                                });
                                observer.observe(element, observerOptions);
                                observers.push(observer);
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
                            /*(document.getElementById('g-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                link.position();
                            }), false);
                            (document.getElementById('p-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                link.position();
                            }), false);
                            (document.getElementById('e-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                link.position();
                            }), false);
                            (document.getElementById('g-div')).addEventListener('scroll', AnimEvent.add(function () {
                                link.position();
                            }), false);
                            (document.getElementById('s_hw')).addEventListener('scroll', AnimEvent.add(function () {
                                link.position();
                            }), false);
                            (document.getElementById('server-div')).addEventListener('scroll', AnimEvent.add(function () {
                                link.position();
                            }), false);
                            (document.getElementById('ps_hw')).addEventListener('scroll', AnimEvent.add(function () {
                                link.position();
                            }), false);
                            (document.getElementById('vms_hw')).addEventListener('scroll', AnimEvent.add(function () {
                                link.position();
                            }), false);
                            //console.log('START_IP BEFORE SETTING ARROWLINK--->' + start_ip)
                            arrow_links[start_ip + ':' + portid] = link
                            getarrowdata(('l' + start_ip + portid), link)
                            Array.from(document.getElementsByClassName('icon-evts')).forEach(function (elemt) {
                                elemt.addEventListener('click', AnimEvent.add(function () {
                                    setTimeout(function () { link.position(); }, 2000);
                                }), false);
                            });
                            Array.from(document.getElementsByClassName('fancy')).forEach(function (elemt) {
                                elemt.addEventListener('click', AnimEvent.add(function () {
                                    setTimeout(function () { link.position(); }, 2000);
                                }), false);
                            });*/
                        }

                    }
                    //}
                }
            });

        }
    });


});


function switch_onload(response) {
    const loaded_switches = {};

    // Process the response to load switches
    const data = response.responseData.response.data;

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


                    default: console.log(`Unknown item: ${item}`);
                }
            });
            //console.log('All switches and templates loaded successfully.');
        }
    });

    // Proceed only after all switches are loaded
    //console.log('LOADED SWITCHES--->' + JSON.stringify(loaded_switches));
    window.switchesLoaded = true; // Set a flag indicating switches are loaded
}

function anim_evtHandler(link) {
    //console.log('INSIDE ANIMEVT')
    link.position();
    AnimEvent.add(function () {
        link.position();
    })
}
function anim_eventHandler(link) {
    //setTimeout(function () { link.position(); }, 2000);
    AnimEvent.add(function () {
        setTimeout(function () { link.position(); }, 2000);
    })
}
function getniccondata(start, end, status, data) {
    // console.log('GETNICCONDATA start---->' + start + ' end' + end + ' status' + status)
    tog_nicconnect[start.replaceAll('.', '_')] = { 'start': start, 'end': end, 'status': status }
    niccon_links[(start.replaceAll(".", "_"))] = data
}
function updatedarrowdata(start, port, end, status, data) {
    //console.log('UPDATEDARROWDATA start---->' + start + ':' + port + ' end' + end + ' status' + status)
    tog_arrowdata[start.replaceAll('.', '_') + ':' + port] = { 'start': start + ':' + port, 'end': end, 'status': status }
    arrow_links[(start.replaceAll(".", "_")) + ':' + port] = data
}
///////////////////////////////////////////////////////////////////////////////////FUNCTION TEST///////////////////////////////////////////////////////////////////////////////////////////
function categorizeColor(color) {
    // Remove spaces from the input color string
    color = color.replace(/\s/g, '');

    // Define a list of known color names and their corresponding RGB values
    const colorMap = {
        'green': 'rgb(22, 211, 154)',
        'red': 'rgb(255, 61, 87)',
        'white': 'rgb(255, 255, 255)',
        'orange': 'rgb(233, 145, 35)',
        'black': 'rgb(0, 0, 0)'
    };

    // If the provided color is a known color name, return it as is
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


/*
function categorizeColor(color) {
    // Remove spaces from the input color string
    color = color.replace(/\s/g, '');

    // Define a list of known color names and their corresponding RGB values
    const colorMap = {
        'green': 'rgb(22, 211, 154)',
        'red': 'rgb(255, 61, 87)',
        'white': 'rgb(255, 255, 255)',
        'orange': 'rgb(233, 145, 35)',
        'black': 'rgb(0, 0, 0)'
    };

    // If the provided color is a known color name, return it as is
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
    // Your custom sorting logic here

    // Example sorting by badge color and count
    const badgeColorA = getNormalizedColor(a.querySelector('.badge').style.backgroundColor);
    const badgeColorB = getNormalizedColor(b.querySelector('.badge').style.backgroundColor);
    const badgeCountA = parseInt(a.querySelector('.num-data').textContent);
    const badgeCountB = parseInt(b.querySelector('.num-data').textContent);

    if (badgeColorA === badgeColorB) {
        // Sort by badge count within the same badge color group
        return badgeCountB - badgeCountA;
    } else {
        // Sort by badge color within the same border color group
        return badgeColorSort(badgeColorA, badgeColorB);
    }
}

// Custom sorting function for badge colors
function badgeColorSort(colorA, colorB) {
    const badgeColorOrder = ["red", "orange", "white", 'green', 'black'];
    return badgeColorOrder.indexOf(colorA) - badgeColorOrder.indexOf(colorB);
}

// Function to sort and group elements
function sortAndGroupElements(container) {
    const elementsToSort = Array.from(container.querySelectorAll('a'));

    // Step 1: Sort elements based on custom criteria
    elementsToSort.sort(customSort);

    // Step 2: Group elements by border color
    const groups = {};
    elementsToSort.forEach((element) => {
        const borderColor = categorizeColor(element.style.borderColor);
        if (borderColor) {
            element.classList.add(`${borderColor}_class`);
        }
        if (!groups[borderColor]) {
            groups[borderColor] = [];
        }
        groups[borderColor].push(element);
    });

    // Step 3: Sort groups by border color priority
    const borderColorPriority = ["red", "orange", "white", "green", "black"];
    const sortedGroups = [];
    borderColorPriority.forEach((borderColor) => {
        if (groups[borderColor]) {
            sortedGroups.push(groups[borderColor]);
        }
    });

    // Clear the container
    container.innerHTML = '';

    // Step 4: Sort elements within each group by badge color and badge count
    sortedGroups.forEach((group) => {
        group.sort(customSort);
        group.forEach((element) => container.appendChild(element));
    });
}

// Simulate a change in the color of a .fancy element
// const changedElement = document.querySelector('.fancy');
// ip_172_16_0_24:NIC
//const changedElement = document.getElementById('ip_' + tab_id + ':NIC');
const psHw = document.getElementById('ps_hw');
const vmsHw = document.getElementById('vms_hw');

*/


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

}

function getSiteNames() {

    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(function (response) {
        res = JSON.parse(response);
        if (res.status == 200) {
            siteResponse = res.data;
            leurl = siteResponse[0]['le_url']
        }
        // getHardwareData();
        getServerHostData();
       // refreshentpro();
    });

}

function statusFunction(select) {
    // console.log("statusFunction-->" + select)
    //  console.log("statusFunction id-->" + $(select).attr("id"))
    isCalledStompCon = false;
    var statusType = $(select).attr("aria-controls");
    var ipid = ($(select).attr("id").split("tab")[1])
    if (statusType === "pills-all") {
        //  console.log('if--statusFunction--->')
        //  cyGraph.elements().removeClass('semitransp');
        //  cyGraph.nodes().addClass('highlight');


        /*     // startEntityLoader()
             // requestDataFromServer("../dashboard/getneo4jnodes", { layer:'s_sw',ip: 'ip_'+ip,sitename: entitySelectedsite }, type = "GET").done(function (response) {
              requestDataFromServer("../dashboard/getneo4jnodes", { sitename: entitySelectedsite, layer: "s_sw", ip: reqip }, type = "GET").done(function (response) {
                  //     stopEntityLoader()
                  console.log('RESPONSE--->' + JSON.stringify(response))
                  //  dispalyNodes(response.responseData[0].site_data, response.responseData[0].code,ip)
                  fillNodeDetails(response,ip)
                 // displayNodes(response.responseData[0].site_data, response.responseData[0].code)
              });*/
        cyGraph['s_sw' + ipid].elements().removeClass('semitransp');
        cyGraph['s_sw' + ipid].elements().removeClass('highlight');
        cyGraph['s_sw' + ipid].elements().style({ 'line-color': '#aeaeae', 'target-arrow-color': '#aeaeae' });
    }
    else {
        //  console.log('else--statusFunction--->')
        showLoader('node-view')
        requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": statusType, "mode": '', csrfmiddlewaretoken: csfr_token, selectedSite: entitySelectedsite, ip: ipid }, type = "POST").done(searchNodeResponse);
    }
}

function searchNodes(select) {
    //console.log("searchNodes---->" + $(select).attr("id"))
    var tags = ($(select).attr("id").split("i_")[1])
    if (($(select).attr("id")).includes('tag')) {
        tags = ($(select).attr("id").split("tag")[1])
    }
    //var input = document.getElementById('tag' + tags);
    //console.log("searchNodes--t-->" + ($(select).attr("id").split("i_")[1]))
    //console.log("searchNodes--tags-->" + tags)
    // input.addEventListener("keyup", function (event) {
    if (document.getElementById("s_sw" + tags).style.display == 'block') {
        // if (event.keyCode === 13) {
        //    event.preventDefault();
        var inputValue = $("#tag" + tags).val()
        valueLength = inputValue.trim().length;
        if (valueLength < 2)
            swal("Please enter at least 2 characters", ' ', 'error')
        else {
            showLoader('node-view')
            // console.log('INPUTVALUE--->' + inputValue)
            //console.log('entitySelectedsite ---> ' + entitySelectedsite)
            requestDataFromServer("../dashboard/getnodespecificdetails", { "nodeid": inputValue, "mode": 'name', csrfmiddlewaretoken: csfr_token, selectedSite: entitySelectedsite, ip: tags }, type = "POST").done(searchNodeResponse);
        }
        // }
    }
    // })
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
    //  console.log('RESPONSE---->' + JSON.stringify(response['nodes'].data[0][7]).replaceAll('.', '_'))
    //console.log('cyGraph.container---->' + cyGraph.container())
    //console.log('cyGraph.container.id---->' + cyGraph.container().id)
    var testid = 's_swip_' + ((response['nodes'].data[0][7]).replaceAll('.', '_'))
    if (response == undefined) {
        return;
    }
    var responseFromServer = response;
    var nodeResponse = responseFromServer["nodes"]
    if (nodeResponse.status == 200) {
        cyGraph[testid].elements().addClass('semitransp');
        nodeResponse.data.forEach(function (row) {
            // console.log('ROW DATA-->' + row)
            var p_name = row[1].split(":")[1]
            //console.log('PODNAME--->' + p_name)
            //var selNode = cyGraph[testid].nodes("[id='" + row[0] + "']")
            var selNode = cyGraph[testid].nodes("[fullname='" + row[1] + "']")
            // console.log('NODE AATTRIBUTES--->' + JSON.stringify(selNode.data()))
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
        // console.log(this.rows);
        // console.log(this._longestRow());
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
        //console.log(lines);
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

//const btnExport = document.querySelector("#btnExport");


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
    // console.log("elem-->" + layer)
    //  var ipadd = ip.replaceAll('.', '_')
    var inputValue = $("#switag" + layer).val()
    //  console.log('inputvalue--->' + inputValue)
    var swapgid = 's' + inputValue.replaceAll('.', '_')
    // console.log('swapid--->' + swapgid)
    ele = document.getElementById(swapgid)
    // console.log('ELEM--->' + ele)
    // ele.parentNode(ele, document.getElementById(+ ipadd));
    ele.parentNode.insertBefore(ele, document.getElementById(layer).children[0]);

}

//function swapDiv(elm, layer = '') {
//    var inputValue = $("#overalltag").val()
//    if (layer == 'ps_hw') {
//        inputValue = $("#ps_overalltag").val()
//        swapid = "ip_" + inputValue.replaceAll('.', '_') + ':NIC'
//        console.log('inputValue--->' + inputValue)
//        elm = document.getElementById(swapid)
//        elm.parentNode.insertBefore(elm, document.getElementById('ps_hw').children[0]);
//    } else if (layer == 'vms_hw') {
//        inputValue = $("#vms_overalltag").val()
//        swapid = "ip_" + inputValue.replaceAll('.', '_') + ':NIC'
//        elm = document.getElementById(swapid)
//        elm.parentNode.insertBefore(elm, document.getElementById('vms_hw').children[0]);
//    }
//}
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
    //console.log("tableNodes() called");
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
    //showLoader("node-view")
    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site"), layer: "s_sw", ip: "ip_" + ip }, type = "GET").done(function (response) {
        //console.log(ip + ' RESPONSE FROM GETENTITYDATA--->' + JSON.stringify(response))
        fillNodeDetails(response, "ip_" + ip)
    });
    //requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site"), layer:"s_sw"}, type = "GET").done(fillNodeDetails);
}

// HARDWARE FUNCTION ON SWITCH PAGE

function getHardwareData() {

    showLoader("node-view")
    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site"), layer: "s_hw" }, type = "GET").done(fillHWNodeDetails);

}


// HARDWARE FUNCTION ON SWITCH PAGE END
/*function categorizeColor(color) {
    // Remove spaces from the input color string
    color = color.replace(/\s/g, '');

    // Define a list of known color names and their corresponding RGB values
    const colorMap = {
        'green': 'rgb(22, 211, 154)',
        'red': 'rgb(255, 61, 87)',
        'white': 'rgb(255, 255, 255)',
        'orange': 'rgb(233, 145, 35)',
        'black': 'rgb(0, 0, 0)'
    };

    // If the provided color is a known color name, return it as is
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
}*/
function thresholdfun(thresip) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    //console.log("leurl--->" + leurl);

    // Configure it to make a GET request to the specified URL
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
                        //console.log("item.prototype--->" + JSON.stringify(nodeExpoThreshold))
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
    //console.log('ID-->' + id) //cardip_172_16_0_101
    //console.log('type-->' + type)
    //console.log('CARD HIDDEN')
    if (type == 'multiple') {
        $(".div" + id).hide();
    } else {
        document.getElementById('card' + id).remove()
        /* console.log('staticBackdrop class-->' + 'staticBackdrop' + id)
         console.log('card id-->' + 'card' + id)
         console.log('thresholdmodal id-->' + 'thresholdModal' + id.replaceAll('ip_', '_'))
         console.log('(document.getElementsByClassName( + id))--->' + (document.getElementsByClassName('staticBackdrop' + id))[0].classList)
         console.log('(document.getElementsByClassName( + id))--->' + (document.getElementsByClassName('staticBackdrop' + id))[0])*/
        var staticBackdrop_elem = ((document.getElementsByClassName('staticBackdrop' + id))[0])
        document.getElementById('thresholdModal' + id.replaceAll('ip_', '_')).remove()
        staticBackdrop_elem.remove()
        // $("#card" + id).hide();
    }

    // $("#ip_" + id.replaceAll('.', '_') + ':NIC').show();
}
function openServerModal(server_ip) {
    var parentElement = document.getElementById('vms_hw');
    var vmsChildElements = document.getElementsByClassName(server_ip.replaceAll('.', '_') + ':NIC');
    //const vmsChildElement = parentElement.querySelector('.' + server_ip.replaceAll('.', '_') +':NIC');
    if (all_Vms || (parentElement.contains(vmsChildElements[0]))) {
        if (all_Vms) {
            document.getElementById("no_vm_div").style.display = "none";
            document.querySelectorAll('#vms_hw *').forEach(element => {
                element.classList.remove('display_no_vms');
                element.classList.remove('display_vms');
            });
        }
        //console.log('ALL VMS Server_ip to create div--->' + server_ip)
        //console.log('HIDE BUTTON--->' + "#ip_" + server_ip.replaceAll('.', '_') + ':NIC')
        var hide_ip = "ip_" + server_ip.replaceAll('.', '_') + ':NIC'
        //$("#" + hide_ip).css("display", "none !important")
        //$("#" + hide_ip).hide();

        var icons_res;

        var modal_data = server_hosts[server_ip.replaceAll('_', '.')]
        //console.log('MODAL DATA--->' + modal_data)
        var divid = "ip_" + modal_data[1].replaceAll('.', '_')
        var thresip = modal_data[1]
        var s_create_html = ''
        var isDivPresent = document.getElementById('card' + divid)
        var ips_list = modal_data[19]
        var reqip_list = []
        if (!isDivPresent) {
            //console.log(modal_data[1]+' CARD NEWLY CREATED')
            var card_clslist = [];
            if (jQuery.isEmptyObject(ips_list) != true && (ips_list) != null) {

                //ips_list.unshift(modal_data[1])
                //console.log('IPS_LIST--->' + ips_list)
                s_create_html += '<div class="' + "div" + divid + ' mul-fullscreen closable" style="width:88% !important;">'
                s_create_html += '<legend style="display:flex;justify-content:end;"><button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + divid + '" onclick="openm_func(this, \'' + "multiple" + '\')">'
                s_create_html += '<i class="fa fa-times-circle" style="color: #ffffff;font-size: 20px;margin-left: -70%;opacity:0.8"></i>'
                s_create_html += '</button></legend>'
                s_create_html += '<div class="mul-ip-div" style="display: flex;overflow: auto;">'
                Array.from(ips_list).forEach(function (elemt) {
                    //console.log('BEFORE criticalStatusCount[' + array_ip+']--->' + criticalStatusCount[array_ip])
                    array_ip = "ip_" + elemt.replaceAll('.', '_')
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
                    s_create_html += '<button type="button" class="btn btn-default btn-ripple sm-hide" id="button' + array_ip + '" style="margin-left:1%">'
                    //  console.log("datdaaa------>"+'i-info'+array_ip)
                    s_create_html += '<i class="mdi mdi-information-outline" id="' + elemt.replaceAll('.', '_') + ':Info"  title="" style="color:white;font-size: 16px;"  ></i>'
                    s_create_html += '</button>'
                    s_create_html += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="button' + array_ip + '" style="margin-left:-1%">'
                    s_create_html += '<i class="icon-tableview" id="tableview' + array_ip + '"  title="Table view" style="color:white;font-size: 16px;" onclick="displayTable(this)" data-toggle="modal" data-target="#staticBackdrop" friendly-name="' + modal_data[12] + '"></i>'
                    s_create_html += '<i class="icon-node" data-toggle="tooltip" id="nodeview' + array_ip + '" data-placement="top" title="Node view" style="display: none; color:white;font-size: 16px;" onclick="displayTable(this)" data-dismiss="modal" friendly-name="' + modal_data[12] + '"></i>'
                    s_create_html += '</button>'
                    s_create_html += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + array_ip + '" onclick="openm_func(this)" style="display:none" >'
                    /* s_create_html += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + array_ip + '" onclick="openm_func(this)">'
                     s_create_html += '<i class="fa fa-window-restore" style="color: #ffffff;font-size: 16px;margin-left: -70%;"></i>'
                     s_create_html += '</button>'*/
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
                    /*s_create_html += '<div class="row">'
                    s_create_html += '<div class="col-10">'
                    s_create_html += '<table class="table" style="width: 90% !important; font-size: 15px;">'
                    //  < !--Table content will be added here-- >
                    s_create_html += '</table>'
                    s_create_html += '</div>'
                    s_create_html += '</div>'*/
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
                    //s_create_html += '<a class="select-link dropdown-item" onclick="onExport("sql")">SQL</a>'
                    //s_create_html += '<a class="select-link dropdown-item" onclick="onExport("json")">JSON</a>'
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
                //console.log('BEFORE criticalStatusCount[' + divid+']--->' + criticalStatusCount[divid])
                criticalStatusCount[divid] = 0
                okStatusCount[divid] = 0
                warningStatusCount[divid] = 0
                unknownStatusCount[divid] = 0
                var btn_elem = document.getElementById(divid + ':NIC')
                var border_clr = categorizeColor((btn_elem.style.borderColor));
                border_clr = getIcons_clr(border_clr)
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
                s_create_html += '<button type="button" class="btn btn-default btn-ripple sm-hide" id="button' + divid + '" style="margin-left:1%">'
                //  console.log("datdaaa------>"+'i-info'+divid)
                s_create_html += '<i class="mdi mdi-information-outline" id="' + modal_data[1].replaceAll('.', '_') + ':Info"  title="" style="color:white;font-size: 16px;"  ></i>'
                s_create_html += '</button>'
                s_create_html += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="button' + divid + '" style="margin-left:-1%">'
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
                /* s_create_html += '<div class="row">'
                 s_create_html += '<div class="col-10">'
                 s_create_html += '<table class="table" style="width: 90% !important; font-size: 15px;">'
                 //  < !--Table content will be added here-- >
                 s_create_html += '</table>'
                 s_create_html += '</div>'
                 s_create_html += '</div>'*/
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
                //s_create_html += '<a class="select-link dropdown-item" onclick="onExport(\'' + "sql" + '\')">SQL</a>'
                //s_create_html += '<a class="select-link dropdown-item" onclick="onExport(\'' + "json" + '\')">JSON</a>'
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
            /*if (modal_data[17] == 'physical') {
                $('#ps_hw').append(s_create_html);
            }
            else if (modal_data[17] == 'virtualmachine') {
                $('#vms_hw').append(s_create_html);
            }*/

            $('#node-view-card').append(s_create_html);
            if (modal_data[12]) {
                // console.log("friendlyname----->" + datas['data']['fullname'].split(":")[0] + ':' + datas['data']['friendlyname'])
                friendlyname = modal_data[1] + ' ( ' + modal_data[12] + ' )'
                document.getElementById('nicname' + divid).textContent = friendlyname
                document.getElementById('nicname' + divid).style.backgroundColor = '#1f1f1f'
                document.getElementById('nicname' + divid).style.borderRadius = '7px'
                document.getElementById('nicname' + divid).style.width = 'fit-content'

            }
            ((document.getElementsByClassName("div" + divid))[0]).classList.add(...card_clslist);

            showLoader('s_swip_' + modal_data[1].replace('.', '_'))
            //console.log('IPLIST--->' + ips_list)
            if (jQuery.isEmptyObject(ips_list) != true && (ips_list) != null) {
                Array.from(ips_list).forEach(function (elemt) {

                    getEntityData(elemt.replaceAll('.', '_'))
                })
            } else {
                getEntityData(modal_data[1].replaceAll('.', '_'))
                reqip_list.push("'" + server_ip.toString() + "'")
                // reqip_list.push( "ip_" + server_ip.replaceAll('.', '_'))
            }

            $(".search-input").on("keyup", function (event) {
                //console.log("Key pressed: " + event.key);
                if (event.key === "Enter") {
                    event.preventDefault();
                    searchNodes(event.target);
                }
            });
            requestDataFromServer("../dashboard/getIconspecificnodes", { sitename: params.get("site"), ip: '[' + (reqip_list) + ']' }, type = "GET").done(function (response) {
                icons_res = response;
                //console.log('ICONS RESPONSE--->' + JSON.stringify(response))

                //old data check function
                //olddataent(response)

                var icons_resp = response.responseData[0].nodes_data.icons.data

                icons_resp.forEach(function (row) {

                    //console.log('ICONS ROW--->' + row)

                    var ip = ''
                    var state = ''
                    if (row[1].includes(':')) {
                        ip = 'ip_' + (row[1].split(":")[0]).replaceAll('.', '_')
                    } else {
                        ip = 'ip_' + row[1].replaceAll('.', '_')
                    }
                    state = row[11]
                    //console.log('STATE--->' + state + ' IP-->' + ip.replaceAll('_', '.') + ' row data' + row)
                    //console.log('STATE--->' + state + ' IP-->' + ip + ' okStatusCount[ip]' + okStatusCount[ip])
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
                        //console.log('HW OK-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                    } else if (state == 0) {
                        //console.log('HW critical-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                        criticalStatusCount[ip] += 1;
                    } else if (state == 3) {
                        //console.log('HW UNKNOWN-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                        unknownStatusCount[ip] += 1;
                    } else if (state == 1) {
                        //console.log('HW warning-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                        warningStatusCount[ip] += 1;
                    }


                    if (criticalStatusCount[ip] == 0) {
                        // $('#pills-critical-tab' + ip).attr('onclick', ' ');
                        $("#pills-critical-tab" + ip).html("Critical (" + criticalStatusCount[ip] + ")");
                    }
                    else {

                        var swapid = "card" + ip
                        elm = document.getElementById(swapid)
                        elm.parentNode.insertBefore(elm, document.getElementById('s_hw').children[0]); $('#pills-critical-tab' + ip).attr('onclick', 'statusFunction(this)');
                        $("#pills-critical-tab" + ip).html('<span class="bold-text red">Critical(' + criticalStatusCount[ip] + ')</span>');
                    }
                    if (okStatusCount[ip] == 0) {
                        // $('#pills-ok-tab' + ip).attr('onclick', ' ');
                        $("#pills-ok-tab" + ip).html("Ok (" + okStatusCount[ip] + ")");
                    }
                    else {
                        $('#pills-ok-tab' + ip).attr('onclick', 'statusFunction(this)');
                        $("#pills-ok-tab" + ip).html('<span class="bold-text green">Ok(' + okStatusCount[ip] + ')</span>');
                    }


                    if (pendingStatusCount[ip] == 0) {
                        //$('#pills-pending-tab' + ip).attr('onclick', ' ');
                        $("#pills-pending-tab" + ip).html("Pending (" + pendingStatusCount[ip] + ")");
                    }
                    else {
                        $('#pills-pending-tab' + ip).attr('onclick', 'statusFunction(this)');
                        $("#pills-pending-tab" + ip).html('<span class="bold-text pending-text">Pending(' + pendingStatusCount[ip] + ')</span>');
                    }


                    if (warningStatusCount[ip] == 0) {
                        //console.log('warningstatuscount[' + ip + ']-->' + warningStatusCount[ip])
                        //$('#pills-warning-tab' + ip).attr('onclick', '');
                        $("#pills-warning-tab" + ip).html("Warning (" + warningStatusCount[ip] + ")");
                    }
                    else {
                        $('#pills-warning-tab' + ip).attr('onclick', 'statusFunction(this)');
                        $("#pills-warning-tab" + ip).html('<span class="bold-text warning">Warning(' + warningStatusCount[ip] + ')</span>');
                    }

                    if (unknownStatusCount[ip] == 0) {
                        //$('#pills-unknown-tab' + ip).attr('onclick', ' ');
                        $("#pills-unknown-tab" + ip).html("Unknown (" + unknownStatusCount[ip] + ")");
                    }
                    else {
                        $('#pills-unknown-tab' + ip).attr('onclick', 'statusFunction(this)');
                        $("#pills-unknown-tab" + ip).html('<span class="bold-text " style="color:white">Unknown(' + unknownStatusCount[ip] + ')</span>');
                    }


                    //  console.log('DATAs[data]--->' + JSON.stringify(datas['data']))
                    var nodesid = row[0]//datas['data']["id"]
                    var nodesip = (row[1].split(":")[0]).replaceAll('.', '_')//(row[1].split(":")[0]).replaceAll('.', '_')
                    var imagetype = (row[1].split(":")[1])//(row[1].split(":")[1])
                    var pinid = (row[1]).replaceAll('.', '_') + '_tooltip'//(row[1]).replaceAll('.', '_') + '_tooltip'
                    // console.log('NODESNAME--->' + (row[1]) + ' ---->' + (row[1].split(":")[1]))
                    //console.log('icon_clr--->' + row)
                    var icon_clr = getIcons_clr(row[11], row[18])
                    //console.log('icon_clr-11-->' + row[11])
                    //console.log('icon_clr-18-->' + row[18])
                    
                    var _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + (row[1]).replaceAll('.', '_') + '" id="' + (row[1]).replaceAll('.', '_') + '" name="' + (row[1]).replaceAll('.', '_') + '" src="/static/images/' + row[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid ' + icon_clr + ';background-color: ' + icon_clr + '"/><span class="tooltiptexts" id="' + (row[1]).replaceAll('.', '_') + '_tooltip"  style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll"><p>' + ((row[5]).split(".")[0]) + '</p></span></div>'

                    //  console.log("JSON.stringify(datas['data'])--->" + JSON.stringify(datas['data']))
                    if ((imagetype != 'Processes') && (imagetype != 'Info') && (imagetype)) {
                        /* if (imagetype.includes('NIC')) {
                             var cls_list = (row[1]).replaceAll('.', '_')
                             var niclistobj = {}
                             try {
                                 //var stats_list = JSON.parse(row[17])
                                 var niclistobj = JSON.parse(row[13])
                             }
                             catch (err) {
                                 console.log('<----GETTING ERROR---->');
                             }
                         	


                             if ((niclistobj) != null && Object.keys(niclistobj).length && jQuery.isEmptyObject(niclistobj) != true) {
                                 console.log('ROW--->' + JSON.stringify(row))
                                 //   console.log('--niclist INSIDE IF ISEMPTY--' + JSON.stringify(datas['data']))
                                 var tooltp_txt = '<table>';
                                 var tooltp_green = ''
                                 var tooltp_red = ''
                                 var tooltp_default = ''
                                 for (const [key, value] of Object.entries(JSON.parse(row[13]))) {
                                     //  console.log('niclist KEY--->' + key + ' VALUE--->' + JSON.stringify(value));
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
                                 // console.log('niclist CLASS LIST--->' + cls_list)

                                 _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (row[1]).replaceAll('.', '_') + '" name="' + (row[1]).replaceAll('.', '_') + '" src="/static/images/' + row[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid ' + icon_clr + ';background-color: ' + icon_clr + '"/><span class="tooltiptexts row" id="' + (row[1]).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;"><div class="col-10" style="padding-left:0" >' + ((row[5]).split(".")[0]) + '</div><i class=" col-2 mdi mdi-pin-outline" id="' + pinid + 'tltp-pin" style=" z-index:1000;" onclick="pintool(\'' + pinid + '\')"></i>' + tooltp_txt + '</span></div>'

                             } else {

                                 _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (row[1]).replaceAll('.', '_') + '" name="' + (row[1]).replaceAll('.', '_') + '" src="/static/images/' + row[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid ' + icon_clr + ';background-color:' + icon_clr + '"/><span class="tooltiptexts" id="' + (row[1]).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;">' + ((row[5]).split(".")[0]) + '<br>No nic summary</span></div>'

                             }

                         }

                         if (imagetype.includes('SW_Disk')) {
                             var disklistobj = JSON.parse(row[15])
                             if (jQuery.isEmptyObject(disklistobj) != true && (disklistobj) != null) {
                                 console.log('ROW--->' + JSON.stringify(row))
                                 //  console.log('--niclist INSIDE IF ISEMPTY--')
                                 var cls_list = (row[1]).replaceAll('.', '_')
                                 var tooltp_txt = '<table>';
                                 var tooltp_green = ''
                                 var tooltp_amber = ''
                                 var tooltp_red = ''
                                 //var clr_status = ''
                                 var pinid = (row[1]).replaceAll('.', '_') + '_tooltip'
                                 for (const [key, value] of Object.entries(JSON.parse(row[15]))) {
                                     //    console.log('niclist KEY--->' + key + ' VALUE--->' + JSON.stringify(value));
                                     cls_list = cls_list + ' ' + nodesip + ':' + key + ':' + imagetype
                                     // clr_status = value['status'] == 2 ? "green" : "red"
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
                                 //  console.log('niclist CLASS LIST--->' + cls_list)
                                 _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (row[1]).replaceAll('.', '_') + '" name="' + (row[1]).replaceAll('.', '_') + '" src="/static/images/' + row[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid ' + icon_clr + ';background-color:' + icon_clr + '"/><span class="tooltiptexts row" id="' + (row[1]).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;"><div class="col-8" style="padding-left:0" >' + ((row[5]).split(".")[0]) + '</div><i class=" col-4 mdi mdi-pin-outline" id="' + pinid + 'tltp-pin" style=" z-index:1000;" onclick="pintool(\'' + pinid + '\')"></i>' + tooltp_txt + '</span></div>'

                                 //  _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (row[1]).replaceAll('.', '_') + '" name="' + (row[1]).replaceAll('.', '_') + '" src="' + row[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts" style="right: 0px !important;width:200% !important;">' + (((row[5]).split("/")[3]).split(".")[0]) + tooltp_txt + '</span></div>'
                             } else {

                                 _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize " id="' + (row[1]).replaceAll('.', '_') + '" name="' + (row[1]).replaceAll('.', '_') + '" src="/static/images/' + row[5] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid' + icon_clr + ';background-color:' + icon_clr + '"/><span class="tooltiptexts" id="' + (row[1]).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;">' + ((row[5]).split(".")[0]) + '<br>No disk summary</span></div>'

                             }

                         }*/

                        //////////////--------------------------------NEW TOOLTIP CREATION-------------------------------------//////////////
                        //console.log('ROW--->' + JSON.stringify(row))
                        //console.log('STATS FROM ROW intially--->' + JSON.stringify(row[17]))
                        var cls_list = (row[1]).replaceAll('.', '_')
                        var stats_list = {}
                        try {
                            var stats_list = JSON.parse(row[17])
                            //var niclistobj = JSON.parse(row[13])
                        }
                        catch (err) {
                            console.log('<----GETTING ERROR----> ' + err);
                        }
                        //console.log('STATS FROM ROW After--->' + JSON.stringify(stats_list))
                        if ((stats_list) != null && (row[17]) != null && (stats_list) != '' && Object.keys(stats_list).length && jQuery.isEmptyObject(stats_list) != true) {

                            var tooltp_txt = '<table>';
                            var tooltp_default = ''
                            var stats_arr = [0, 1, 2, 3]
                            var stats_clr = ['red', 'orange', 'green', 'white']
                            stats_arr.forEach(function (item, index) {
                                //console.log(item, index);
                                item = item.toString();
                                if (item in stats_list) {
                                    //console.log('stats_list[item]--->' + JSON.stringify(stats_list[item]))
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
                            // console.log("jQuery.isEmptyObject(row[13])--->" + jQuery.isEmptyObject(row[13]))

                            //  console.log((row[1]) + ' - niclist - ' + (row[13]))

                            $('#swicons' + ip).append(_nodehtml);
                        } else {

                            $('#' + ip).append(_nodehtml);
                        }
                    }

                    if (row[1] == ((row[1].split(":")[0])) + ":Info") {
                        var infoid = row[0]
                        var infoip = (row[1].split(":")[0]).replaceAll('.', '_')
                        // console.log('infoid--------->' + infoid)
                        //console.log('infoip--------->' + infoip + ':Info')
                        // console.log('siteName--------->' + siteName)
                        // console.log('divid' + divid + "::")
                        // console.log('DATAS--------->' + JSON.stringify(datas))

                        //console.log("document.getElementById(infoip + ':Info')--->" + document.getElementById(infoip + ':Info'))
                        document.getElementById(infoip + ':Info').addEventListener("click", function () {
                            // console.log('infoid--------->' + divid, + infoid)
                            openNav(infoid, siteName, divid)
                        })
                        /* $(iconid).click(function () {
                              console.log('infoid--------->' + divid, + infoid)
                             openNav(infoid, siteName, divid)
                         });*/


                        /* 
                         document.getElementById('i-info' + divid).addEventListener('click', openNav(infoid, siteName, divid));
                         // onclick="openNav(\'' + infoid + '\',\'' + siteName + '\',\'' + divid + '\')"*/
                    }
                })
                //old data check function
               // olddataent(response)
            });
            //console.log('CARD DIV APPENDED')
            showLoader("ps_hw")
        } else {
            //console.log(divid+' CARD ALREADY PRESENT')
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
        //console.log('Number of display_no_vms in ELse before hide--->' + no_vm_count)
        //console.log('Number of VMS in ELse before hide--->' + actual_vm_count)
        //console.log('ONLY PHYSICAL VMS Server_ip to create div--->' + server_ip)
        document.querySelectorAll('#vms_hw .fancy').forEach(element => {
            if (element.classList.contains('phy_' + server_ip.replaceAll('.', '_'))) {
                //console.log('INSIDE IF')
                element.classList.remove('display_no_vms');
                if (!(element.classList.contains('display_vms'))) {
                    // console.log('INSIDE IF IF')
                    element.classList.add('display_vms');
                }
            } else {
                //console.log('INSIDE ELSE')
                element.classList.remove('display_vms');
                if (!(element.classList.contains('display_no_vms'))) {
                    //console.log('INSIDE ELSE IF')
                    element.classList.add('display_no_vms');
                }
            }
        });
        no_vm_count = document.querySelectorAll('#vms_hw .display_no_vms').length;
        actual_vm_count = (document.getElementById('vms_hw').childElementCount)
        //console.log('Number of display_no_vms in ELse after hide--->' + no_vm_count)
        //console.log('Number of VMS in ELse after hide--->' + (actual_vm_count))
        if (no_vm_count == actual_vm_count) {
            //console.log('DISPLAY NO VM AVAILABLE')
            document.getElementById("no_vm_div").style.display = "block";
        } else {
            document.getElementById("no_vm_div").style.display = "none";
        }
    }
}

//check the old data function
/*function olddataent(response) {
    //console.log("Old Data Update--------" + JSON.stringify(response));

    const today = new Date().toISOString().split('T')[0];  // Today's date in "YYYY-MM-DD" format

    // Access the data array from the response
    const olddata_resp = response.responseData[0].nodes_data.icons.data;

    olddata_resp.forEach(function (obj) {
        console.log("Old Data Update----obj---->" + JSON.stringify(obj));
        const oldhwip = (obj[1].split(":")[0]).replaceAll(".", "_");
        const oldhwstr = obj[1].split(":")[1];
       // const oldhardid = '#' + oldhwip + '\\:' + oldhwstr;
        const oldhardid = `#${oldhwip}:${oldhwstr}`;  // No escaping colon

        // Skip "Info" elements
        if (oldhwstr === "Info") {
            return;  // Skip this iteration
        }

        let dataDate = obj[18] ? obj[18].split(' ')[0].split('-').reverse().join('-') : null; // Extract and reverse date

        let color;
        switch (parseInt(obj[11])) {  // Use obj[11] instead of 'status'
            case 0: color = '#ff3d57'; break;
            case 1: color = '#e59105'; break;
            case 2: color = '#16d39a'; break;
            case 3: color = '#ffffff'; break;
            case 5: color = '#1f1f1f'; break;
            default: color = '#000000';
        }

        // Apply styles based on date check
        if (dataDate !== today) {
            console.log("datetoday--if--->" + dataDate)
            console.log("today---if-->" + today)
            console.log("oldhardid--if--->" + oldhardid)
            $(oldhardid).css({
                "background-color": "#ff00ff",
                "opacity": "0.5"  // 50% opacity if not today's date
            });
        } else {
            console.log("datetoday--else--->" + dataDate)
            console.log("today---else-->" + today)
            console.log("oldhardid--else--->" + oldhardid)
            $(oldhardid).css({
                "background-color": color,
                "opacity": "0.3"  // Full opacity for today's date
            });
        }

        // Default border for non-Info elements
        $(oldhardid).css("border", "1px solid #ffffff");
    });
}*/

function reloadmodal() {
    var modal = document.querySelector("#staticBackdrop");
    if (!modal) {
        //console.error("Modal element not found");
        return;
    }
    var modalBody = modal.querySelector(".modal-body");
    if (!modalBody) {
        //console.error("Modal body element not found");
        return;
    }
    var fragment = document.createDocumentFragment();
    // Clone the current content and append it to the fragment
    Array.from(modalBody.childNodes).forEach(function (node) {
        // console.log("----------2----------")
        fragment.appendChild(node.cloneNode(true));
    });
    modalBody.innerHTML = "<div>Please wait, content is refreshing...</div>";
    setTimeout(function () {
        modalBody.innerHTML = "";
        modalBody.appendChild(fragment);
    }, 500); // Adjust the delay as needed
}

function setstatusdata(response) {
    //console.log('getstatusAll response--->' + JSON.stringify(response))
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
    server_report = response['responseData'][0]['status_data']['Status_data']['data']
    //console.log('SERVER REPORT--->' + JSON.stringify(server_report))
}
function getServerHostData() {

    showLoader("node-view")
    /*requestDataFromServer("../dashboard/getwebsocupdate", { sitename: params.get("site"), layer: '',allsite:true }, type = "GET").done(function (response) {
        console.log('getwebsocupdate resp--->' + JSON.stringify(response))
    });*/
    requestDataFromServer("../dashboard/getNicConnectnodes", { sitename: params.get("site") }, type = "GET").done(nicconnectFetch);
    //requestDataFromServer("../dashboard/getstatusAll", { sitename: params.get("site") }, type = "GET").done(setstatusdata);
    requestDataFromServer("../dashboard/getHostnodes", { sitename: params.get("site") }, type = "GET").done(createServerButtons);

}

function nicconnectFetch(response) {
    //console.log('NICCONNECT RESPONSE--->' + JSON.stringify(response))
    if (response.responseData.length > 0) {
        response.responseData.forEach(function (obj, index) {
            responseFromServer = obj.nicconnect_data
            if (Object.keys(responseFromServer).length > 0) {
                var nodeResponse = responseFromServer["Nicconnect"]
                if (nodeResponse.status == 200 && nodeResponse.data.length > 0) {
                    nodeResponse.data.forEach(function (row) {
                        //console.log('NICCONNECT RIW DATA--->' + JSON.stringify(row))
                        tog_nicconnect[row[1].replaceAll('.', '_')] = { 'start': row[1], 'end': row[16], 'status': row[11] }
                        nicconnect.push(row)
                    });
                }
            }
        });
    }
}


function createServerButtons(response) {
    // console.log('RESPONSE DATA---->' + JSON.stringify(response))
    const randomCharacters = Math.random().toString(36).substring(2, 5);
    if (response == undefined)
        return;
    entityResponse = response.responseData;
    if (response.responseData.length > 0) {
        var tempObj = {}
        var pservercount = 0;
        var vmservercount = 0;
        response.responseData.forEach(function (obj, index) {

            //console.log('OBJ DATA--->' + JSON.stringify(obj))
            responseFromServer = obj.nodes_data
            if (Object.keys(responseFromServer).length > 0) {
                var nodeResponse = responseFromServer["hosts"]
                if (nodeResponse.status == 200 && nodeResponse.data.length > 0) {
                    nodeResponse.data.forEach(function (row) {
                        //console.log('ROW DATA SEPERATE--->' + JSON.stringify(row))
                        server_hosts[row[1]] = row
                        /*if (row[16] != "" && row[16] != null) {
                            //if (row[10] != "" && row[10] != null) {
                            nicconnect.push(row)
                        }*/

                        var ip = ''
                        var state = ''
                        if (row[1].includes(':')) {
                            ip = 'ip_' + (row[1].split(":")[0]).replaceAll('.', '_')
                        } else {
                            ip = 'ip_' + row[1].replaceAll('.', '_')
                        }
                        state = row[11]
                        var stat_server = server_report[row[1].toString()]
                        //console.log('============== SERVER STATUS OF ' + [row[1]].toString() + '---> ' + JSON.stringify(stat_server) + ', 0 - ' + stat_server['0'] + ' , 1 - ' + stat_server['1'] + ' , 2 - ' + stat_server['2'] + ' , 3 - ' + stat_server['3'] + ' , 4 - ' + stat_server['4'] + ' ==============')

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
                        /*if (!(stat_server['0'] == undefined) && (stat_server['0'] > 0)) {
                            tooltpHtml += '<div class="badgetltp-elem" style="background-color:red">' + stat_server['0'] +'</div>'
                        }  if (!(stat_server['1'] == undefined) && (stat_server['1'] > 0)) {
                            tooltpHtml += '<div class="badgetltp-elem" style="background-color:orange">' + stat_server['1'] + '</div>'
                        }  if (!(stat_server['3'] == undefined) && (stat_server['3'] > 0)) {
                            tooltpHtml += '<div class="badgetltp-elem" style="background-color:white;color:grey">' + stat_server['3'] + '</div>'
                        }  if (!(stat_server['2'] == undefined) && (stat_server['2'] > 0)) {
                            tooltpHtml += '<div class="badgetltp-elem" style="background-color:green">' + stat_server['2'] + '</div>'
                        }  if (!(stat_server['4'] == undefined) && (stat_server['4'] > 0)) {
                            tooltpHtml += '<div class="badgetltp-elem" style="background-color:#1f1f1f;color:white;border:0.5px solid grey">' + stat_server['4'] + '</div>'
                        }*/
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
                            //console.log('HW OK-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                        } else if (state == 0) {
                            // console.log('HW critical-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                            criticalStatusCount[ip] += 1;
                        } else if (state == 3) {
                            //console.log('HW UNKNOWN-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                            unknownStatusCount[ip] += 1;
                        } else if (state == 1) {
                            //console.log('HW warning-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
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
                            // console.log('STATUS IS 0')
                            tempObj['isSuccess'] = false
                            if (entitySelectedsite == ' ') {
                                entitySelectedsite = obj.site
                            }
                            b_color = '#ff3d57'//'red'
                        }
                        if (state === 2) {
                            b_color = '#16d39a'//'green'
                            // console.log('STATUS IS 2')
                        }
                        if (state === 1) {
                            b_color = '#e99123'//orange
                            // console.log('STATUS IS 1')
                        }
                        if (state === 3) {
                            b_color = '#ffffff'//'white'
                            //  console.log('STATUS IS 3')
                        }
                        if (state === 4) {
                            b_color = '#000000'//'black'
                            //  console.log('STATUS IS 3')
                        }


                        var server_html = ''
                        var btn_divid = 'ip_' + row[1].replaceAll('.', '_')
                        var phy_serv_ip = 'phy_' + row['14'].replaceAll('.', '_')
                        server_html += '<a class=" fancy ' + row[1].replaceAll('.', '_') + ':SW_NIC ' + row[1].replaceAll('.', '_') + ':NIC ' + phy_serv_ip + '" data-text="' + row[12] + '" onclick="openServerModal(\'' + row[1] + '\')" id="' + btn_divid + ':NIC" style="border:2px solid ' + b_color + '">  ' + badgeHtml + '  <span class="top-key" ></span><div class="">' + row[1] + '</br>' + (row[12] != '' ? '(' + row[12] + ')' : row[12]) + '</div><span class="bottom-key-1"></span><span class="bottom-key-2"></span>  </a >'//fancy button test
                        //server_html += '<a class=" friendly-tip fancy ' + row[1].replaceAll('.', '_') + ':SW_NIC ' + row[1].replaceAll('.', '_') + ':NIC" data-text="'+row[12]+'" onclick="openServerModal(\'' + row[1] + '\')" id="' + btn_divid + ':NIC" style="border:2px solid ' + b_color + '">  ' + badgeHtml + '  <span class="top-key" ></span><div  class="">' + row[1] + '</div><span class="bottom-key-1"></span><span class="bottom-key-2"></span>  </a >'//fancy button test
                        if (row[17] == 'physical') {
                            pservercount++
                            $('#ps_hw').append(server_html)
                            $("#node-view #entity-search").css('visibility', 'visible');
                            $("#node-view #ps_hw").css('display', 'flex');
                            $("#pslayer-heading").show();
                            // $("#pslayer-heading").css('display', 'block');
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
            //var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === obj.site)[0]  //error while loading first time
            // makeWebSwitchConnection(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'], randomCharacters)
        });
        makeWebSocConnectionk8(siteResponse[0].websocket_url, tempObj['site'], 0, 0, randomCharacters)

        makeWebSwitchConnection(siteResponse[0].websocket_url, tempObj['site'], 0, randomCharacters)

        var obj = entityResponse[0] //.filter(x => x.site === entitySelectedsite)[0]

        if (obj && obj.code === 200 && obj.nodes_data.hosts.data.length > 0) {
            if (pservercount) {
                var srch_row = 'pserversearch-row'
                $('#physical-servers-heading').html('<div class="row row-width" style="margin:unset">PHYSICAL SERVERS<div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + pservercount + '</div><i class="icon-search icon-evts hide-val' + srch_row + '" id="no-lens" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>');
                // $('#servers-heading').append('(' + servercount + ')');
                $('#physical-servers-heading').append('<div class="row" id="pserversearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="ps_overalltag" placeholder="Search" /><i class="icon-search icon-evts" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDiv(this, \'' + "ps_hw" + '\')"></i><i class="icon-close icon-evts" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></div></div><div class="col-2" text-right></div></div>');

            }
            if (vmservercount) {
                var srch_row = 'vmserversearch-row'
                $('#virtual-servers-heading').html('<div class="row row-width" style="margin:unset">VIRTUAL MACHINES <div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + vmservercount + '</div><i class="icon-search icon-evts hide-val' + srch_row + '" id="no-lens" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>');
                // $('#servers-heading').append('(' + servercount + ')');
                $('#virtual-servers-heading').append('<div class="row" id="vmserversearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="vms_overalltag" placeholder="Search" /><i class="icon-search icon-evts" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDiv(this, \'' + "vms_hw" + '\')"></i><i class="icon-close icon-evts" id="icon-close " onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></div></div><div class="col-2" text-right></div></div>');

            }



            ///////////////////////////////////////////////////////////////////////SORTING SERVER DIVS ////////////////////////////////////////////////////////////////////////////////////

            // Determine the container based on the element's parent
            //if (psHw.contains(changedElement)) {
            sortAndGroupElements(psHw);
            // } else if (vmsHw.contains(changedElement)) {
            sortAndGroupElements(vmsHw);
            // }

            ///////////////////////////////////////////////////////////////////////SORTING SERVER DIVS ////////////////////////////////////////////////////////////////////////////////////
            waitForSwitchesToLoad().then(function () {
                //console.log('Switches have been loaded successfully.');

                // Call the switchs() function and wait for it to complete
                return switchs(); // Ensure switchs() returns a promise
            }).then(function () { //_visspecificnodedata from node py
                //console.log('-------------INSIDE SWITCHES.THEN()---------------')
                nicconnect.forEach(function (obj) {//SERVER NIC LEADERLINE
                    //console.log('NICCONNECT DATA---->' + JSON.stringify(obj))
                    //console.log('<======================ENTERING NICCONNECT LOOP====================>')
                    // var start = document.getElementById(obj[1].replaceAll(".", "_"))
                    var start = ';'
                    // console.log('START present?--->' + (!start))
                    if (document.getElementById(obj[1].replaceAll(".", "_"))) {
                        start = document.getElementById(obj[1].replaceAll(".", "_"))
                    } else {
                        //  console.log('START VALUE--->' + (obj[1]).replaceAll(".", "_"))
                        var start_str = document.getElementsByClassName((obj[1]).replaceAll(".", "_"))
                        start = start_str[0]
                    }
                    //var start = document.getElementById(obj[1] + ':NIC')
                    var end = '';
                    //var end = document.getElementById(obj[16].replaceAll(".", "_"))
                    if (document.getElementById(obj[16].replaceAll(".", "_"))) {
                        end = document.getElementById(obj[16].replaceAll(".", "_"))
                    } else {
                        //  console.log('END VALUE--->' + (obj[16]).replaceAll(".", "_") )
                        var end_str = document.getElementsByClassName((obj[16]).replaceAll(".", "_"))
                        end = end_str[0]
                    }

                    // var start = document.getElementById(obj[1].replaceAll(".", "_"))
                    // var end = document.getElementById(obj[16].replaceAll(".", "_"))

                    //console.log('obj[11] data---->' + obj[11])
                    if (start != null && end != null && end != undefined) {
                        var clr
                        if (obj[11].toString() == '2') {
                            var link = new LeaderLine(start,
                                end,
                                { hide: true, color: '#16d39a', positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                            );

                            (start).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                            (start).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                            (end).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                            (end).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);

                            //console.log('link in nicconnect if--->' + link)

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


                            ////////////////////////////////////MUTATION OBSERVER START/////////////////////////////////////////////////////

                            //const nodeViewCard = document.getElementById('node-view-card');
                            //const nodeView = document.getElementById('node-view');

                            //const observerOptions = {
                            //    childList: true, // Observe addition/removal of child elements
                            //    subtree: true, // Observe the entire subtree
                            //    tree: true,
                            //};

                            //const createObserver = (element) => {
                            //    const observer = new MutationObserver((mutationsList) => {
                            //        for (const mutation of mutationsList) {
                            //            if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                            //                //console.log('mutation link in nicconnect if if--->' + link);
                            //                link.position();
                            //            } else {
                            //                //console.log('mutation link in nicconnect if else--->' + link);
                            //                link.position();
                            //            }
                            //        }
                            //    });
                            //    observer.observe(element, observerOptions);
                            //    observers.push(observer);
                            //};

                            //createObserver(nodeViewCard);
                            //createObserver(nodeView);

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


                            //     console.log('LINK IN ENTITY IF type--->' + typeof (link))
                            //     console.log('LINK IN ENTITY IF--->' + Object.keys(link).length)
                            getarrowdata(('s' + (obj[1].replaceAll(".", "_"))), link)
                            niccon_links[(obj[1].replaceAll(".", "_"))] = link
                        } else {
                            //      console.log('---ELSE---')
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
                            /*(start).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                            (start).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                            (end).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                            (end).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);*/
                            //console.log('link in nicconnect else--->' + link)



                            $('#s_hw, #server-div, #ps_hw, #vms_hw').on('scroll', AnimEvent.add(function () {
                                //console.log('INSIDE STATUS OTHEN THAN 2 ANIMEVENT')
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

                            ////////////////////////////////////MUTATION OBSERVER START/////////////////////////////////////////////////////

                            //const nodeViewCard = document.getElementById('node-view-card');
                            //const nodeView = document.getElementById('node-view');

                            //const observerOptions = {
                            //    childList: true, // Observe addition/removal of child elements
                            //    subtree: true, // Observe the entire subtree
                            //    tree: true,
                            //};

                            //const createObserver = (element) => {
                            //    const observer = new MutationObserver((mutationsList) => {
                            //        for (const mutation of mutationsList) {
                            //            if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                            //                //console.log('mutation link in nicconnect else if--->' + link);
                            //                link.position();
                            //            } else {
                            //                // console.log('mutation link in nicconnect else else--->' + link);
                            //                link.position();
                            //            }
                            //        }
                            //    });
                            //    observer.observe(element, observerOptions);
                            //    observers.push(observer);
                            //};

                            //createObserver(nodeViewCard);
                            //createObserver(nodeView);

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


                            //     console.log('LINK IN ENTITY ELSE type--->' + typeof (link))
                            //     console.log('LINK IN ENTITY ELSE--->' + Object.keys(link).length)
                            getarrowdata(('s' + (obj[1].replaceAll(".", "_"))), link)
                            niccon_links[(obj[1].replaceAll(".", "_"))] = link
                        }
                    }
                });



                //setTimeout(() => {
                //console.log('<======================BEFORE ENTERING SWITCHES() LOOP====================>')
                for (let index = 0; index < layers.length; index++) {//SWITCH PORT LEADERLINE _visspecificnodedata node py
                    //console.log('ARROWDATA--->' + arrowdata)
                    //console.log('ARROWDATA['+index+']')
                    arrowdata[index].forEach(function (obj) {//ID(n), n.title, n.monitor_status, n.monitor_message, n.type, n.image, n.epoch, n.hostIp,n.overlayIP, n.dashboard, n.link, n.status, n.Friendly_name, n.Nics_list, n.Phy_Physicalip, n.DiskVolumes_list, n.Phy_Physicalniclink , n.source_port  | n.source_port is obj[17]
                        //console.log('ARROW DATA--->' + (obj))
                        //console.log('obj[1].split(":")[1])--->' + obj[1].split(":")[1])
                        var portid = ""
                        if (obj[1].includes(':')) {
                            portid = (obj[1].split(":")[1]).replace(/\//g, '_');
                        }

                        //console.log('<======================ENTERING ARROWDATA LOOP====================>')
                        var l = layers[index].split("_")[0]
                        //console.log('LAYER--->' + l)
                        //console.log('<---////////////////////START/////////////////////--->')
                        //console.log('OBJ[17] before--->' + obj[17])
                        //console.log('isEmptyObject(obj[10])--->' + jQuery.isEmptyObject(obj[10]))
                        /*var start_id = ''
                        if (obj[1].includes(':p')) {
                            start_id = 'p_' + obj[7].replaceAll(".", "_")
                        } else if (obj[1].includes(':s')) {
                            start_id = 's_' + obj[7].replaceAll(".", "_")
                        } else if ((obj[17])!=null && (obj[17]).includes('p__')) {
                            start_id = 'p_' + obj[7].replaceAll(".", "_")
                        } else if ((obj[17]) != null && (obj[17]).includes('s__')) {
                            start_id = 's_' + obj[7].replaceAll(".", "_")
                        }*/
                        var start_id = obj[7].replaceAll(".", "_") //ADDED FOR TESTING

                        // console.log('obj[7].replaceAll(".", "_")--->' + obj[7].replaceAll(".", "_") + ' portid--->' + portid + ' document.getElementById('+obj[7].replaceAll(".", "_")+')----> ' +document.getElementById(obj[7].replaceAll(".", "_")) )
                        // console.log('$(# ' + obj[7].replaceAll(".", "_") +' #'+portid+' )' + $("#" + obj[7].replaceAll(".", "_") + " #" + portid))
                        //  console.log('document.getElementById(obj[7].replaceAll(".", "_")).getElementById(obj[1].split(":")[1])--->' + document.getElementById(obj[7].replaceAll(".", "_")).getElementById(obj[1].split(":")[1]))


                        if ((obj[10] != 'null' && jQuery.isEmptyObject(obj[10]) != true && obj[10] != 'none')) {
                            //console.log('ACTUAL ARROW DATA--->' + (obj))
                            //tog_arrowdata[obj[1].replaceAll('.', '_')] = { 'start': obj[1], 'end': obj[10], 'status': obj[11] }
                            //  if ((obj[10].includes('wan')) != true) {
                            //iconsole.log('TOG_ARROWDATA[' + obj[1].replaceAll('.', '_') + '] FIRST---> ' + JSON.stringify(tog_arrowdata[obj[1].replaceAll('.', '_')]))

                            //console.log('START obj[1]--->' + obj[1])
                            //console.log('START obj[7]--->' + obj[7])
                            //console.log('START obj[10] before--->' + obj[10])
                            //console.log('START_ID--->' + start_id)

                            //var start = document.getElementById(start_id).getElementById((obj[17].split("__"))[1])
                            var start = (document.getElementsByClassName((portid + '-' + start_id))[0])
                            var end = '';

                            //console.log('OBJ[10](' + obj[10] + ') if true--->' + document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_")))
                            /*var end_id = ''
                            if (obj[10].includes(':p')) {
                                end_id = 'p_' + (obj[10].split(":")[0]).replaceAll(".", "_")
                            } else if (obj[10].includes(':s')) {
                                end_id = 's_' + (obj[10].split(":")[0]).replaceAll(".", "_")
                            }*/
                            var end_id = (obj[10].split(":")[0]).replaceAll(".", "_") //ADDED FOR TESTING
                            var end_port = ''
                            if (obj[10].includes(':')) {
                                end_port = (obj[10].split(":")[1]).replace(/\//g, '_')
                            }


                            //console.log('END_id--->' + end_id)
                            tog_arrowdata[obj[7].replaceAll('.', '_') + ':' + (obj[1].split(":")[1])] = { 'start': obj[1], 'end': obj[10], 'status': obj[11] }

                            //console.log('TOG_ARROWDATA[' + obj[1].replaceAll('.', '_') + '] SECOND---> ' + JSON.stringify(tog_arrowdata[obj[1].replaceAll('.', '_')]))
                            if (obj[10].includes(':') && (document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_"))) != null) {
                                // if (obj[10].includes(':') && (document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_")).contains(document.getElementById(obj[10].split(":")[1]))) && (document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_"))) != null) {
                                //console.log('obj[10]-------------->' + obj[10])
                                var end = (document.getElementsByClassName((end_port + '-' + end_id))[0])
                                /*if (obj[10].includes('__')) {
                                    //end = document.getElementById(end_id).getElementById((obj[10].split("__")[1]).replace(/\//g, '_'))
                                    var end = (document.getElementsByClassName(((obj[10].split("__")[1]).replace(/\//g, '_') + '-' + end_id))[0])
                                    
                                } else {
                                    end = document.getElementById(end_id).getElementById((obj[10].split(":")[1]).replace(/\//g, '_'))
                                }*/


                                //console.log('END elem first half ---->' + document.getElementById(end_id))
                                //console.log('END elem first full ---->' + end)
                                //console.log('END VALUE in if ---->' + end)
                            } else {
                                var nameelements = document.getElementsByName((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC')
                                var classelements = document.getElementsByClassName((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC')
                                end = classelements[0];

                            }
                            //var end = document.getElementById('s_swip_' + obj[10].replaceAll(".", "_"))
                            //console.log('(1) before onElementsPresent START VALUE---->' + start)
                            //console.log('(2) before onElementsPresent END VALUE---->' + end)
                            //console.log('<---////////////////////////END/////////////////////--->')

                            //console.log('BEFORE OBSERVEELEMENTS obj[5]---> ' + obj[5] + ' portid---> ' + portid + ' start ---> ' + start + ' end---> ' + end)
                            observeElements(portid, start_id, end_port, end_id, function (start, end) {

                                //console.log('Elements are present:', start_elem, end_elem);
                                //console.log('IN OBSERVEELEMENTS obj[5]---> ' + obj[5] + ' portid---> ' + portid + ' start ---> ' + start + ' end---> ' + end)
                                //console.log("(8) obj[5] == 'port' ---> " + (obj[5] == 'port') + "| portid != undefined ---> " + (portid != undefined) + "| portid != null ---> " + (portid != null) + "| start != null ---> " + (start != null) + "| end != null ---> " + (end != null) + "| end != undefined ---> " + (end != undefined))


                                if (obj[5] == 'port' && portid != undefined && portid != null && start != null && end != null && end != undefined) {
                                    var clr
                                    //console.log('(9) INSIDE IF successfully OBJ[2]------->' + obj[2])

                                    // console.log('OBJ[2]------->' + obj[2])
                                    if (obj[11].toString() == '2') {
                                        //console.log('(10) INSIDE IF IF successfully')

                                        //if (obj[11].toString() == '0') {
                                        //console.log((obj[1] + ' is Red'))
                                        //             console.log('---IF---')
                                        var scrolldiv = document.getElementById('g-switch')
                                        // console.log('SCROLLDIV--->' + scrolldiv)
                                        var link = new LeaderLine(start,
                                            end,
                                            { color: '#16d39a', hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                        );
                                        //      console.log('document.getElementById(g -switch)====>' + document.getElementById('g-switch'))
                                        (start).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                        (start).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                        (end).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                        (end).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                        //console.log('(10) ' + start_id + ' LINK in port if if--->' + link)

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

                                        ////////////////////////////////////MUTATION OBSERVER START/////////////////////////////////////////////////////

                                        //const nodeViewCard = document.getElementById('node-view-card');
                                        //const nodeView = document.getElementById('node-view');

                                        //const observerOptions = {
                                        //    childList: true, // Observe addition/removal of child elements
                                        //    subtree: true, // Observe the entire subtree
                                        //    tree: true,
                                        //};
                                        ////console.log('GREEN called for start portid ---> ' + portid + ' start_id ---> ' + start_id)
                                        ////console.log('GREEN called for end portid ---> ' + end_port + ' end_id ---> ' + end_id)


                                        //const createObserver = (element) => {
                                        //    const observer = new MutationObserver((mutationsList) => {
                                        //        for (const mutation of mutationsList) {
                                        //            if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                        //                //console.log('(11) mutation link in port if if if link.start ---> ' + link.start +' link.end ---> ' +link.end);
                                        //                var link_start = document.getElementsByClassName(`${portid}-${start_id}`)[0];
                                        //                var link_end = document.getElementsByClassName(`${end_port}-${end_id}`)[0];
                                        //                if (end_port == '') {
                                        //                    link_end = document.getElementsByClassName(`${end_id}:NIC`)[0];
                                        //                }
                                        //                link.start = link_start;
                                        //                link.end = link_end;
                                        //                link.position();
                                        //                getarrowdata(('l' + (obj[7].replaceAll(".", "_")) + portid), link)
                                        //                arrow_links[(obj[7].replaceAll(".", "_")) + ':' + (obj[1].split(':'))[1]] = link
                                        //            } else {
                                        //                //console.log('mutation link in port if if else --->' + link);
                                        //                link.position();
                                        //            }
                                        //        }
                                        //    });
                                        //    observer.observe(element, observerOptions);
                                        //    observers.push(observer);
                                        //};

                                        //createObserver(nodeViewCard);
                                        //createObserver(nodeView);

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

                                        //console.log('LINK IN ENTITY IF type--->' + typeof (link))
                                        //               console.log('LINK IN ENTITY IF--->' + Object.keys(link).length)
                                        getarrowdata(('l' + (obj[7].replaceAll(".", "_")) + portid), link)
                                        arrow_links[(obj[7].replaceAll(".", "_")) + ':' + (obj[1].split(':'))[1]] = link
                                        //   map['l' + (obj[7].replaceAll(".", "_"))+portid]=link
                                    } else {
                                        //console.log('(10) INSIDE IF ELSE successfully')

                                        //console.log('RED called for start portid ---> ' + portid + ' start_id ---> ' + start_id)
                                        //console.log('RED called for end portid ---> ' + end_port + ' end_id ---> ' + end_id)
                                        var b_clr = ''
                                        switch (obj[11]) {
                                            case 0:
                                                //console.log((obj[1] + ' is Red'))
                                                clr = '#ff3d57'
                                                b_clr = 'red'
                                                break;
                                            case 1:
                                                // console.log((obj[1] + ' is Orange'))
                                                clr = '#e59105'
                                                b_clr = 'orange'
                                                break;
                                            case 3:
                                                // console.log((obj[1] + ' is Orange'))
                                                clr = '#ffffff'
                                                b_clr = 'white'
                                                break;

                                            default:
                                                //console.log((obj[1] + ' is Grey'))
                                                b_clr = 'grey'
                                                clr = '#000000'
                                        }
                                        /*case 2:
                                                console.log((obj[1]+ ' is Green'))
                                                clr = '#16d39a'
                                                b_clr = 'green'
                                                break; */
                                        var link = new LeaderLine(start,
                                            end,
                                            { color: clr, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                        );
                                        /* (start).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                         (start).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                         (end).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                         (end).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);*/

                                        //console.log('LINK in port if else---->' + link)



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

                                        ////////////////////////////////////MUTATION OBSERVER START/////////////////////////////////////////////////////

                                        //const nodeViewCard = document.getElementById('node-view-card');
                                        //const nodeView = document.getElementById('node-view');

                                        //const observerOptions = {
                                        //    childList: true, // Observe addition/removal of child elements
                                        //    subtree: true, // Observe the entire subtree
                                        //    tree: true,
                                        //};



                                        //const createObserver = (element) => {
                                        //    const observer = new MutationObserver((mutationsList) => {
                                        //        for (const mutation of mutationsList) {
                                        //            if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                                        //                //console.log('(11) mutation link in port if else if link.start ---> ' + link.start + ' link.end ---> ' + link.end);
                                        //                var link_start = document.getElementsByClassName(`${portid}-${start_id}`)[0];
                                        //                var link_end = document.getElementsByClassName(`${end_port}-${end_id}`)[0];
                                        //                if (end_port == '') {
                                        //                    link_end = document.getElementsByClassName(`${end_id}:NIC`)[0];
                                        //                }
                                        //                link.start = link_start;
                                        //                link.end = link_end;
                                        //                link.position();
                                        //                getarrowdata(('l' + (obj[7].replaceAll(".", "_")) + portid), link)
                                        //                arrow_links[(obj[7].replaceAll(".", "_")) + ':' + (obj[1].split(':'))[1]] = link
                                        //            } else {
                                        //                //console.log('mutation LINK in port if else else--->' + link);
                                        //                link.position();
                                        //            }
                                        //        }
                                        //    });
                                        //    observer.observe(element, observerOptions);
                                        //    observers.push(observer);
                                        //};

                                        //createObserver(nodeViewCard);
                                        //createObserver(nodeView);

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
                                        //               console.log('LINK IN ENTITY ELSE type--->' + typeof (link))
                                        //                console.log('LINK IN ENTITY ELSE--->' + Object.keys(link).length)
                                        getarrowdata(('l' + (obj[7].replaceAll(".", "_")) + portid), link)
                                        arrow_links[(obj[7].replaceAll(".", "_")) + ':' + (obj[1].split(':'))[1]] = link
                                        // map['l' + (obj[7].replaceAll(".", "_")) + portid] = link
                                    }

                                } else {
                                    //console.log('(9) ELSE - condition failed ---> ' + start_id)
                                }


                            });
                            //}
                        }



                    });
                }


                //}, 2000);
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

            // console.log("entity-new---> if")
            //stopLoader("node-view")
            //displayNodes(obj.site_data, obj.code)
        } else if (obj && obj.code === 200 && obj.nodes_data.hosts.data.length === 0) {
            //  console.log("entity-new---> else")
            //swal("Hardware information missing ! \n Please Onboard server or contact administrator", ' ', 'warning')

            var warnhtml = ''
            warnhtml += '<div id="warningmes" style="padding: 2%;height:25px;margin-top:25%;background: #f44336;border-radius: 12px;z-index: 999;">'
            warnhtml += '<span class="closebuttn" type="button" onclick="dismissfunc(this)" style="margin-left: 15px;color: white;font-weight: bold;float: right;font-size: 40px;line-height: 20px;margin-top:-10px;cursor: pointer;transition: 0.3s;">&times;</span>'
            warnhtml += '<h3 style="text-align:center;margin-top:-10px; font-size:15px;"> Hardware and Software information missing! Please Onboard server or contact administrator</h3>'
            warnhtml += '</div>'
            $('#warningdata').append(warnhtml)

        } else if (obj && obj.code === 500) {
            // console.log("---500----->" + JSON.stringify(obj));

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
        //  $("#node-view #entity-search").css('visibility', 'hidden');
        $("#node-view #s_hw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        $("#node-view #nodatamessage").text('No Data');
    }
    if (pageName === "Dashboard") {
        var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === entitySelectedsite)[0]
        onTicketSiteTabchange(entitySelectedsite, tempSiteObj)
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
            //console.log('INSIDE START AND END NOT UNDEFINED')
            // Elements are present and callback hasn't been invoked yet
            callbackInvoked = true; // Set the flag to true
            callback(start, end);
            return true;
        }
        //else {
        //    console.log('ELSE UNDEFINED')
        //}
        return false;
    }

    // Perform the initial check
    if (!checkElements()) {
        //console.log('<--MUTATION OBSERVER INITIALIZED-->')
        // If elements are not found, observe the document for changes
        const observer = new MutationObserver((mutationsList, observer) => {
            if (checkElements()) {
                // Disconnect the observer once the elements are found
                observer.disconnect();
            }
        });

        // Start observing the document for changes in the child elements
        observer.observe(document.body, { childList: true, subtree: true });
        observers.push(observer);
    }
}


function fillNodeDetails(response, ip) {
    const randomCharacter = Math.random().toString(36).substring(2, 5);
    if (response == undefined)
        return;
    entityResponse = response.responseData;
    //console.log('RESPONSE FROM FILLNODEDETAILS --->' + JSON.stringify(entityResponse))
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
                        /*if (row[2])
                            var state = row[2].toUpperCase()
                        else
                            var state = row[2]*/
                        if (typeof (row[11] == 'string'))
                            var state = parseInt(row[11])
                        else
                            var state = row[11]
                        if (state === 0) {
                            //  if (state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING") {
                            criticalNodeCount++;
                            tempObj['isSuccess'] = false
                            if (entitySelectedsite == ' ') {
                                entitySelectedsite = obj.site
                            }
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hCriticalStatusCount++ : sCriticalStatusCount++
                        }
                        if (state === 2) {
                            // if (state == "" || state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hOkStatusCount++ : sOkStatusCount++
                        }
                        /* if (state === "PENDING") {
                             (row[4] == "Host" || row[4].startsWith('Node')) ? hPendingStatusCount++ : sPendingStatusCount++;
                         }*/
                        if (state === 1) {
                            // if (state === "WARNING") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hWarningStatusCount++ : sWarningStatusCount++;
                        }
                        if (state === 3) {
                            //if (state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED") {
                            (row[4] == "Host" || row[4].startsWith('Node')) ? hUnknownStatusCount++ : sUnknownStatusCount++;
                        }
                    });
                    tempObj['criticalNodeCount'] = criticalNodeCount;
                    tempObj['nodeCount']['host']['criticalCount'] = hCriticalStatusCount;
                    tempObj['nodeCount']['host']['okCount'] = hOkStatusCount;
                    //  tempObj['nodeCount']['host']['pendingCount'] = hPendingStatusCount;
                    tempObj['nodeCount']['host']['warningCount'] = hWarningStatusCount;
                    tempObj['nodeCount']['host']['unknownCount'] = hUnknownStatusCount;
                    tempObj['nodeCount']['service']['criticalCount'] = sCriticalStatusCount;
                    tempObj['nodeCount']['service']['okCount'] = sOkStatusCount;
                    //   tempObj['nodeCount']['service']['pendingCount'] = sPendingStatusCount;
                    tempObj['nodeCount']['service']['warningCount'] = sWarningStatusCount;
                    tempObj['nodeCount']['service']['unknownCount'] = sUnknownStatusCount;
                }
                else {
                    //console.log('IP BEFORE STOPLOADER--->' + ip)
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
                //  console.log("makeWebSocConnectionk8--->")
                makeWebSocConnectionk8(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'], randomCharacter)
            }
        });
        sSitehtml = ''
        //fSitehtml = ''

        /*
        $("#node-view #site-list").empty()
        sitesData.forEach(function (obj, index) {
            //if (obj.isSuccess) {  (<!--  SITE NAME COMES THIS PLACE IN 2 TIMES -->)
            sSitehtml = ''
            sSitehtml += '<li class="nav-item" id="' + obj.site + '_li" style="position: relative;"><span class="" style="z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '"></span> <a class="bold-text" style="color:#c8c8c8;" data-id="' + obj.site + '" id="' + obj.site + '" data-toggle="tab" onclick="onEntitySiteTabchange(\'' + obj.site + '\')">' + obj.site + '&ensp;>&ensp;</a></li><h2 style="font-size:15px;">Entity Status<h2>'
            //  sSitehtml += '<li class="nav-item success" id="' + obj.site + '_li" style="position: relative;"><span class="" style="z-index: 100;position: absolute;top: -4px;right: 6px;" id="' + obj.site + '-indicator"></span> <a class="bold-text" style="color:#c8c8c8;" data-id="' + obj.site + '" id="' + obj.site + '" data-toggle="tab" onclick="onEntitySiteTabchange(\'' + obj.site + '\')">' + obj.site + '&ensp;>&ensp;</a></li><h2 style="font-size:15px;">Entity Status<h2>'
            //  $("#entityLED").removeClass("red").addClass('green');
            
        });
        //$("#node-view #site-list").append(fSitehtml);
        $("#node-view #site-list").append(sSitehtml);
        if ($("#node-view #site-list li a").eq(0).data()) {
            entitySelectedsite = $("#node-view #site-list li a").eq(0).data().id
        }
        $("#node-view #site-list #" + entitySelectedsite).addClass('active');
        */


        var obj = entityResponse[0] //.filter(x => x.site === entitySelectedsite)[0]
        //  var obj = entityResponse
        // stopLoader("node-view")
        dispalyNodes(obj.site_data, obj.code, ip)
    }
    else {
        //console.log('NO NODES TO DISPLAY FOR - ' + ip)
        stopLoader("node-view")
        //  $("#node-view #entity-search").css('visibility', 'hidden');
        $("#node-view #s_sw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        $("#node-view #nodatamessage").text('No Data');
    }
    if (pageName === "Dashboard") {
        var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === entitySelectedsite)[0]
        onTicketSiteTabchange(entitySelectedsite, tempSiteObj)
        findCount()
    }

}

// HARDWARE FUNCTION ON SWITCH PAGE

function fillHWNodeDetails(response) {
    // console.log('RESPONSE DATA---->' + JSON.stringify(response))
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
                        //   console.log('ROW DATA SEPERATE--->' + JSON.stringify(row))

                        if (row[16] != "" && row[16] != null) {
                            //if (row[10] != "" && row[10] != null) {
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
                    //  tempObj['nodeCount']['host']['pendingCount'] = hPendingStatusCount;
                    tempObj['nodeCount']['host']['warningCount'] = hWarningStatusCount;
                    tempObj['nodeCount']['host']['unknownCount'] = hUnknownStatusCount;
                    tempObj['nodeCount']['service']['criticalCount'] = sCriticalStatusCount;
                    tempObj['nodeCount']['service']['okCount'] = sOkStatusCount;
                    //  tempObj['nodeCount']['service']['pendingCount'] = sPendingStatusCount;
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
            var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === obj.site)[0]  //error while loading first time
            makeWebSwitchConnection(tempSiteObj.websocket_url, tempObj['site'], 0, tempObj['criticalNodeCount'], randomCharacters)
        });




        var obj = entityResponse[0] //.filter(x => x.site === entitySelectedsite)[0]
        //  var obj = entityResponse
        // stopLoader("node-view")

        if (obj && obj.code === 200 && obj.site_data.nodes.data.length > 0) {
            //  console.log("entity-new---> if")
            displayNodes(obj.site_data, obj.code)
        } else if (obj && obj.code === 200 && obj.site_data.nodes.data.length === 0) {
            //  console.log("entity-new---> else")
            //swal("Hardware information missing ! \n Please Onboard server or contact administrator", ' ', 'warning')

            var warnhtml = ''
            warnhtml += '<div id="warningmes" style="padding: 2%;height:25px;margin-top:25%;background: #f44336;border-radius: 12px;z-index: 999;">'
            warnhtml += '<span class="closebuttn" type="button" onclick="dismissfunc(this)" style="margin-left: 15px;color: white;font-weight: bold;float: right;font-size: 40px;line-height: 20px;margin-top:-10px;cursor: pointer;transition: 0.3s;">&times;</span>'
            warnhtml += '<h3 style="text-align:center;margin-top:-10px; font-size:15px;"> Hardware & Software information missing! Please Onboard server or contact administrator</h3>'
            warnhtml += '</div>'
            $('#warningdata').append(warnhtml)

        } else if (obj && obj.code === 500) {
            // console.log("---500----->" + JSON.stringify(obj));
            // console.log("entity-new---> else")
            //swal("Hardware information missing ! \n Please Onboard server or contact administrator", ' ', 'warning')

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
        //  $("#node-view #entity-search").css('visibility', 'hidden');
        $("#node-view #s_hw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'block');
        $("#node-view #nodatamessage").text('No Data');
    }
    if (pageName === "Dashboard") {
        var tempSiteObj = siteResponse[0] //.filter(x => x.sitename === entitySelectedsite)[0]
        onTicketSiteTabchange(entitySelectedsite, tempSiteObj)
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
        //$("#no-lens" + id).css('margin-left', '55%')

    } else {
        $("#card" + id).addClass("fullscreen")
        $("#s_sw" + id).addClass("cyto-fullscreen")
        //$("#no-lens" + id).css('margin-left', '58%')

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
        //document.getElementById("s_sw" + id).style.height = '61% !important'
        //$("#s_sw"+id).css('height', '61% !important');
        $("#s_sw" + id).addClass("cyto-height")
    }
    else {
        document.getElementById("show-lens" + id).setAttribute("id", "no-lens" + id);
        document.getElementById("search-row" + id).style.display = 'none';
        $("#s_sw" + id).removeClass("cyto-height")
    }
}

function pintool(tooltpid) {
    // console.log('TOOLTIP ID--->' + tooltpid)
    var rowelem = document.getElementById(tooltpid)
    var tltppin = document.getElementById(tooltpid + 'tltp-pin')
    if (rowelem.classList.contains('visible-tltp')) {//unpin
        rowelem.classList.remove("visible-tltp");
        tltppin.style.color = '#fff'
        /* heatpin.classList.remove("mdi-pin");
         heatpin.classList.add("mdi-pin-outline");
         heatpin.style.color = '#fff'*/
        // maprefresh();
    } else {                                 //pin
        rowelem.classList.add("visible-tltp");
        tltppin.style.color = '#e99123'
        /* heatpin.classList.remove("mdi-pin-outline");
         heatpin.classList.add("mdi-pin");
         heatpin.style.color = '#e99123'*/
    }

}

function hovered(spanid, evt) {
    //console.log('SPANID--->' + spanid)
    var e = evt.target;
    var dim = e.getBoundingClientRect();
    var w = $(window);
    var el = document.getElementById(spanid);
    // el.style.display = "block";
    el.style.display = "flex";
    el.style.position = "absolute";
    var totwidth = (dim.left / window.innerWidth) * 100
    // console.log('TOTWIDTH--->' + totwidth + ' window.innerWidth--->' + window.innerWidth)
    if (totwidth < 85 && (spanid.includes('NIC') || spanid.includes('disk'))) {
        //  console.log('TOTWIDTH < 85')
        el.style.right = '-520%';
        el.style.left = '70%';
        //console.log('TOTWIDTH IF--->' + 0.85 * window.innerWidth)
        //console.log('TOTWIDTH el.style.left = dim.left + w.scrollLeft() + px--->' + dim.left + w.scrollLeft() + 'px')
    } else if (totwidth < 85) {
        el.style.right = '-60%';
        //console.log('TOTWIDTH else--->' + 0.85 * window.innerWidth)
    } else if (totwidth > 85) {
        // console.log('TOTWIDTH > 85')
        //console.log('TOTWIDTH else--->' + 0.85 * window.innerWidth)
    }
}

async function displayNodes(data, responseCode) {
   // console.log("displayNodes-->" + JSON.stringify(data))
    if (Object.keys(data).length > 0 && data["nodes"] && data["nodes"].data.length > 0) {
        $("#node-view #entity-search").css('visibility', 'visible');
        $("#node-view #s_hw").css('display', 'flex');
        $("#slayer-heading").show();
        // $("#node-view #break1").css('display', 'block');
        $("#node-view #entity-nodata").css('display', 'none');
        var obj = sitesData[0] //.filter(x => x.site === entitySelectedsite)[0]
        responseFromServer = data;
        var nodesData = [];
        // var OverviewData = []
        var edgesData = [];
        var tempLabel = "";
        var nodeSize = 0;
        sortedJson = {};
        var nodeResponse = responseFromServer["nodes"]
        /* var criticalStatusCount = 0;
         var okStatusCount = 0;
         var pendingStatusCount = 0;
         var warningStatusCount = 0;
         var unknownStatusCount = 0;*/
        if (nodeResponse.status == 200) {
            $("#total-nodes").html("Nodes (" + nodeResponse.data.length + ")");
            nodeResponse.data.forEach(function (row) {
                //console.log('DISPLAY NODES ROW DATA--->' + JSON.stringify(row))
                var ip = ''
                var state = ''
                if (row[1].includes(':')) {
                    ip = 'ip_' + (row[1].split(":")[0]).replaceAll('.', '_')
                } else {
                    ip = 'ip_' + row[1].replaceAll('.', '_')
                }
                state = row[11]
                //console.log('STATE--->' + state + ' IP-->' + ip.replaceAll('_', '.') + ' row data' + row)
                //console.log('STATE--->' + state + ' IP-->' + ip + ' okStatusCount[ip]' + okStatusCount[ip])
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
                    //console.log('HW OK-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                } else if (state == 0) {
                    // console.log('HW critical-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                    criticalStatusCount[ip] += 1;
                } else if (state == 3) {
                    //console.log('HW UNKNOWN-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                    unknownStatusCount[ip] += 1;
                } else if (state == 1) {
                    //console.log('HW warning-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                    warningStatusCount[ip] += 1;
                }

                // var color = getColorForNodeState(row[2]);
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
                // var node = { data: { id: row[0], fullname: label, dashboardenabled: dashboardenabled, dashboard_url: row[8], text: tempLabel, image: image_path + row[5], color: color, size: nodeSize } };
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
        //

        /*console.log('DISPlAY IP--->')
        console.log('criticalStatusCount--->' + JSON.stringify(criticalStatusCount))
        console.log('okStatusCount--->' + JSON.stringify(okStatusCount))
        console.log('pendingStatusCount--->' + JSON.stringify(pendingStatusCount))
        console.log('warningStatusCount--->' + JSON.stringify(warningStatusCount))
        console.log('unknownStatusCount--->' + JSON.stringify(unknownStatusCount))*/

        //
        var servercount = 0;
        await Datanodes.forEach(function (datas) {
            // console.log('INSIDE DATANODES LOOP')
            //console.log('DATAS--------->' + JSON.stringify(datas))



            var nodehtml = ''
            var friendlyname = ''
            var divid = "ip_" + (datas['data']['fullname'].split(":")[0]).replaceAll('.', '_')
            var isDivPresent = document.getElementById(divid)
            if (!isDivPresent) {


                //  nodehtml += '<div class="card sswcard" id="card' + divid + '" style="margin-bottom:0;border: 1px solid #1f1f1f;">'
                nodehtml += '<fieldset class="card sswcard" id="card' + divid + '" style="margin-bottom:0;border: 1px solid #1f1f1f; background-color:#1f1f1f">'

                nodehtml += '<legend>'
                // nodehtml += '<p style="margin-left:2%"><b>' + datas['data']['fullname'].split(":")[0] + ':' + datas['data']['friendlyname'] + '</b>'
                nodehtml += '<p style="margin-left:2%">'
                nodehtml += '<div class="row">'
                // nodehtml += '<div class="col-7" style="margin-top:2%"><b>&nbsp;&nbsp;' + datas['data']['fullname'].split(":")[0] + ':' + friendlyname+ '</b>'
                nodehtml += '<div class="col-7" style="margin-top:2%">'
                nodehtml += '<p id="nicname' + divid + '"></p>'
                nodehtml += '</div>'
                nodehtml += '<div class="col-5 option-icons">'
                nodehtml += '<i class="icon-search" id="no-lens' + divid + '" onclick="displayrow(this)" style="margin-left:4%;font-size: 16px;"></i>'
                nodehtml += '<button type="button" class="btn btn-default btn-ripple sm-hide" id="button' + divid + '" style="margin-left:1%">'
                //  console.log("datdaaa------>"+'i-info'+divid)
                nodehtml += '<i class="mdi mdi-information-outline" id="' + (datas['data']['fullname'].split(":")[0]).replaceAll('.', '_') + ':Info"  title="" style="color:white;font-size: 16px;"  ></i>'
                nodehtml += '</button>'
                nodehtml += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="button' + divid + '" style="margin-left:-1%">'
                nodehtml += '<i class="icon-tableview" id="tableview' + divid + '"  title="Table view" style="color:white;font-size: 16px;" onclick="displayTable(this)" data-toggle="modal" data-target="#staticBackdrop"></i>'
                nodehtml += '<i class="icon-node" data-toggle="tooltip" id="nodeview' + divid + '" data-placement="top" title="Node view" style="display: none; color:white;font-size: 16px;" onclick="displayTable(this)" data-dismiss="modal"></i>'
                nodehtml += '</button>'
                nodehtml += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + divid + '" onclick="openmodal(this)" style="display:none" >'
                nodehtml += '<button type="button" class="btn btn-default table-node btn-ripple sm-hide" id="modal_view_right' + divid + '" onclick="openmodal(this)">'
                //nodehtml += '<i class="fa fa-window-restore" style="color: #ffffff;font-size: 16px;margin-left: -70%;"></i>'
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

                // search bar

                nodehtml += '<div class="row" id="search-row' + divid + '" style="margin-left:0%;display:none">'
                nodehtml += '<div class="" id="entity-search">'
                nodehtml += '<div class="input-with-icon position-relative" style="color:white">'
                nodehtml += '<input class="search-input w-100 search" type="search" name="tags"  id="tag' + divid + '" placeholder="Search" />'
                nodehtml += '<i class="icon-search" style="position: inherit; color: white;font-size:18px;" id="i_' + divid + '" onclick="searchNodes(this)"></i>'
                nodehtml += '</div>'
                nodehtml += '</div>'
                //nodehtml += '</div>'
                nodehtml += '<div class="col-2" text-right>'
                nodehtml += '</div>'
                nodehtml += '</div>'
                //nodehtml += '</div>'

                //search bar

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


                // nodehtml += '</div >'
                nodehtml += '</fieldset>'



                //////////////////////////////////
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
                //nodehtml += '<a class="select-link dropdown-item" onclick="onExport(\'' + "sql" + '\')">SQL</a>'
                //nodehtml += '<a class="select-link dropdown-item" onclick="onExport(\'' + "json" + '\')">JSON</a>'
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



                /*   $('.icon-tableview'+divid).on('click', function (event,) {
                       console.log('ICONTABLEVIEW---->' + $(event).attr(id))
                       $(".icon-tableview"+divid ,".icon-node"+divid).toggle(100);
                       displayTable()
                       $("#s_sw"+divid, "#table-view").fadeToggle(300);
                       // $('#s_hw, #table-view').fadeToggle(300);
                       $("#exort-to").show();
                   });
                   $('.icon-node'+divid).on('click', function (event) {
                       $('#table-view', '#s_sw'+divid).fadeToggle(300);
                       // $('#table-view, #s_hw').fadeToggle(300);
                       $(".icon-node"+divid, ".icon-tableview "+divid).toggle(100);
                   });*/
                servercount++;
                $('#s_hw').append(nodehtml);
                getEntityData((datas['data']['fullname'].split(":")[0]).replaceAll('.', '_'))

                //////////////////////////////////COUNT///////////////////////////////////////
                if (criticalStatusCount[divid] == 0) {
                    //console.log('#pills-critical-tab' + divid + ' criticalStatusCount[divid]--->' + criticalStatusCount[divid] + ' (INSIDE IF)')
                    obj.isSuccess = true
                    $('#pills-critical-tab' + divid).attr('onclick', ' ');
                    $("#pills-critical-tab" + divid).html("Critical (" + criticalStatusCount[divid] + ")");
                }
                else {
                    //  console.log('#pills-critical-tab' + divid + ' criticalStatusCount[divid]--->' + criticalStatusCount[divid] + ' (INSIDE ELSE)html elem--->' + $("#pills-critical-tab" + divid).html())
                    obj.isSuccess = false
                    /* var classList = $("#" + entitySelectedsite + "_li").attr('class')
                     if (classList.includes("failure") == false) {
                         $("#node-view #" + client.id + "_li").removeClass("success");
                         $("#node-view #" + client.id + "_li").addClass("failure");
                         $("#node-view #" + client.id + "_li .nav-link").removeClass("green");
                         $("#node-view #" + client.id + "_li .nav-link").addClass("red");
                     }*/
                    //console.log('<----   #pills-critical-tab' + divid + ' criticalStatusCount[ip]--->' + criticalStatusCount[divid] + ' (INSIDE ELSE---->)')
                    $('#pills-critical-tab' + divid).attr('onclick', 'statusFunction(this)');
                    $("#pills-critical-tab" + divid).html('<span class="bold-text red">Critical(' + criticalStatusCount[divid] + ')</span>');
                    // $("#pills-critical-tab" + divid).html('<a class="nav-link" id="pills-critical-tab' + divid + '" data-toggle="pill" href="#pills-critical' + divid + '" role="tab" aria-controls="pills-critical" aria-selected="true" onclick="statusFunction(this);">' + criticalStatusCount[divid] + '</span></a>');
                }
                if (okStatusCount[divid] == 0) {
                    $('#pills-ok-tab' + divid).attr('onclick', ' ');
                    $("#pills-ok-tab" + divid).html("Ok (" + okStatusCount[divid] + ")");
                }
                else {
                    $('#pills-ok-tab' + divid).attr('onclick', 'statusFunction(this)');
                    $("#pills-ok-tab" + divid).html('<span class="bold-text green">Ok(' + okStatusCount[divid] + ')</span>');
                }


                /*  if (pendingStatusCount == 0) {
                      $('#pills-pending-tab').attr('onclick', ' ');
                      $("#pills-pending-tab").html("Pending (" + pendingStatusCount + ")");
                  }
                  else
                      $("#pills-pending-tab").html('<span class="bold-text pending-text">Pending(' + pendingStatusCount + ')</span>');*/

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


                //////////////////////////////////COUNT///////////////////////////////////////

            }

            if (datas['data']['text'] == datas['data']['fullname'].split(":")[0]) {
                // console.log("friendlyname----->" + datas['data']['fullname'].split(":")[0] + ':' + datas['data']['friendlyname'])
                friendlyname = datas['data']['fullname'].split(":")[0] + ' ( ' + datas['data']['friendlyname'] + ' )'
                document.getElementById('nicname' + divid).textContent = friendlyname
                if (document.getElementById('nicname' + divid + '_second'))
                    document.getElementById('nicname' + divid + '_second').textContent = 'SECONDARY-IP'
            }

            //var _nodehtml = '<p> adad</p>'
            //  console.log('DATAs[data]--->' + JSON.stringify(datas['data']))
            var nodesid = datas['data']["id"]
            var nodesip = (datas['data']['fullname'].split(":")[0]).replaceAll('.', '_')
            var imagetype = (datas['data']['fullname'].split(":")[1])
            var pinid = (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip'
            // console.log('NODESNAME--->' + (datas['data']['fullname']) + ' ---->' + (datas['data']['fullname'].split(":")[1]))

            var _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + (datas['data']['fullname']).replaceAll('.', '_') + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip"  style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll"><p>' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '</p></span></div>'

            //var _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + (datas['data']['fullname']).replaceAll('.', '_') + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts" style="right: 0px !important;width:200% !important;"><p>' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '</p></span></div>'

            //  console.log("JSON.stringify(datas['data'])--->" + JSON.stringify(datas['data']))
            if ((imagetype != 'Processes') && (imagetype != 'Info') && (imagetype)) {
                if (imagetype.includes('NIC')) {
                    // console.log((datas['data']['fullname']).replaceAll('.', '_') +' NICLIST VALUE--->' + JSON.stringify(datas['data']['niclist']))
                    // console.log('NICLIST VALUE--->' + (datas['data']['niclist']) + ' ISNULL--->' + ((datas['data']['niclist']) != null))
                    //  console.log('NICLIST IF COND--->' + ((datas['data']['niclist']) != null && Object.keys(datas['data']['niclist']).length && jQuery.isEmptyObject(JSON.parse(datas['data']['niclist'])) != true))
                    // console.log('NICLIST IF ISEMPTY OBJ--->' +jQuery.isEmptyObject(datas['data']['niclist']) )
                    var cls_list = (datas['data']['fullname']).replaceAll('.', '_')
                    var niclistobj = {}
                    try {
                        var niclistobj = JSON.parse(datas['data']['niclist'])
                    }
                    catch (err) {
                        console.log('<----GETTING ERROR---->');
                    }
                    //var niclistobj = JSON.parse(datas['data']['niclist'])
                    if ((niclistobj) != null && Object.keys(niclistobj).length && jQuery.isEmptyObject(niclistobj) != true) {
                        // if ((datas['data']['niclist']) != null && Object.keys(datas['data']['niclist']).length && jQuery.isEmptyObject(datas['data']['niclist']) != true ) {
                        // if (jQuery.isEmptyObject(datas['data']['niclist']) != true && jQuery.isEmptyObject(datas['data']['nicsummary']) != true) {

                        //   console.log('jQuery.isEmptyObject(datas[data][niclist])--->' + jQuery.isEmptyObject(JSON.parse(datas['data']['niclist'])))
                        //   console.log('--niclist INSIDE IF ISEMPTY--' + JSON.stringify(datas['data']))
                        //var cls_list = (datas['data']['fullname']).replaceAll('.', '_')
                        var tooltp_txt = '<table>';
                        var tooltp_green = ''
                        var tooltp_red = ''
                        var tooltp_default = ''
                        for (const [key, value] of Object.entries(JSON.parse(datas['data']['niclist']))) {
                            //  console.log('niclist KEY--->' + key + ' VALUE--->' + JSON.stringify(value));
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
                                //cls_list = cls_list + ' ' + value['ip'].replaceAll('.', '_') + ':' + imagetype
                                //tooltp_txt += '<tr><td id="' + value['ip'].replaceAll('.', '_') + ':' + imagetype + '" style="color:'+nicclr+'">' + key + '(' + value['alias'] + ')-</td> <td>' + value['ip'] + '</td></tr>'
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
                                // cls_list = cls_list + ' ' + value['mac'].replaceAll('.', '_') + ':' + imagetype
                                // tooltp_txt += '<tr><td id="' + value['mac'].replaceAll('.', '_') + ':' + imagetype + '" style="color:' + nicclr +'">' + key + '(' + value['alias'] + ')-</td> <td>' + value['mac'] + '</td></tr>'
                            }


                            // do something with `key` and `value`
                        }
                        tooltp_txt += tooltp_red + tooltp_green + tooltp_default
                        tooltp_txt += '</table>'
                        // console.log('niclist CLASS LIST--->' + cls_list)

                        _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts row" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;"><div class="col-10" style="padding-left:0" >' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '</div><i class=" col-2 mdi mdi-pin-outline" id="' + pinid + 'tltp-pin" style=" z-index:1000;" onclick="pintool(\'' + pinid + '\')"></i>' + tooltp_txt + '</span></div>'

                        //  _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts" style="right: 0px !important;width:200% !important;">' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + tooltp_txt + '</span></div>'
                    } else {


                        _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;">' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '<br>No nic summary</span></div>'

                    }

                }

                if (imagetype.includes('SW_Disk')) {
                    var disklistobj = JSON.parse(datas['data']['volumelist'])
                    if (jQuery.isEmptyObject(disklistobj) != true && (disklistobj) != null) {
                        // if (jQuery.isEmptyObject(datas['data']['volumelist']) != true && (datas['data']['volumelist']) != null ) {
                        //  console.log('--niclist INSIDE IF ISEMPTY--')
                        var cls_list = (datas['data']['fullname']).replaceAll('.', '_')
                        var tooltp_txt = '<table>';
                        var tooltp_green = ''
                        var tooltp_amber = ''
                        var tooltp_red = ''
                        //var clr_status = ''
                        var pinid = (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip'
                        for (const [key, value] of Object.entries(JSON.parse(datas['data']['volumelist']))) {
                            //    console.log('niclist KEY--->' + key + ' VALUE--->' + JSON.stringify(value));
                            cls_list = cls_list + ' ' + nodesip + ':' + key + ':' + imagetype
                            // clr_status = value['status'] == 2 ? "green" : "red"
                            if (value['status'] == 2) {
                                tooltp_green += '<tr style="color:green"><td id="' + nodesip + ':' + key + ':' + imagetype + '">' + key + '-</td> <td>' + value['percentage'] + '</td></tr>'
                            } else if (value['status'] == 1) {
                                tooltp_amber += '<tr style="color:orange"><td id="' + nodesip + ':' + key + ':' + imagetype + '">' + key + '-</td> <td>' + value['percentage'] + '</td></tr>'
                            } else {
                                tooltp_red += '<tr style="color:red"><td id="' + nodesip + ':' + key + ':' + imagetype + '">' + key + '-</td> <td>' + value['percentage'] + '</td></tr>'
                            }
                            // tooltp_txt += '<tr style="color:'+clr_status+'"><td id="' + nodesip + ':' + key + ':' + imagetype + '">' + key + '-</td> <td>' + value['percentage'] + '</td></tr>'
                            // do something with `key` and `value`
                        }
                        tooltp_txt += tooltp_red + tooltp_amber + tooltp_green
                        tooltp_txt += '</table>'
                        //  console.log('niclist CLASS LIST--->' + cls_list)

                        _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts row" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;"><div class="col-8" style="padding-left:0" >' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '</div><i class=" col-4 mdi mdi-pin-outline" id="' + pinid + 'tltp-pin" style=" z-index:1000;" onclick="pintool(\'' + pinid + '\')"></i>' + tooltp_txt + '</span></div>'

                        //  _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize ' + cls_list + '" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts" style="right: 0px !important;width:200% !important;">' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + tooltp_txt + '</span></div>'
                    } else {

                        _nodehtml = '<div class="col-1 tooltips" style="max-width: 2.6rem;"><img class="imgsize " id="' + (datas['data']['fullname']).replaceAll('.', '_') + '" name="' + (datas['data']['fullname']).replaceAll('.', '_') + '" src="' + datas['data']['image'] + '" alt="" onclick="openOnImageClick(this, \'' + nodesid + '\',\'' + nodesip + '\',event)"  onmouseover="hovered(\'' + pinid + '\',event)" style="width:205%;height:55%;margin-left:10%; border:1px solid #ffffff;background-color: #ffffff"/><span class="tooltiptexts" id="' + (datas['data']['fullname']).replaceAll('.', '_') + '_tooltip" style="right: 20px !important;width:auto !important;max-height:300%;overflow-y:scroll;min-width: 200% !important;">' + (((datas['data']['image']).split("/")[3]).split(".")[0]) + '<br>No disk summary</span></div>'

                    }

                }

                if (imagetype.includes('SW_')) {
                    // console.log("jQuery.isEmptyObject(datas['data']['niclist'])--->" + jQuery.isEmptyObject(datas['data']['niclist']))

                    //  console.log((datas['data']['fullname']) + ' - niclist - ' + (datas['data']['niclist']))

                    $('#swicons' + divid).append(_nodehtml);
                } else {

                    $('#' + divid).append(_nodehtml);
                }
            }/* else {
                    $('#' + divid).append(_nodehtml);
                }*/

            //if (datas['data']['text'] == "Info") {
            if (datas['data']['fullname'] == ((datas['data']['fullname'].split(":")[0])) + ":Info") {
                var infoid = datas['data']["id"]
                var infoip = (datas['data']['fullname'].split(":")[0]).replaceAll('.', '_')
                // console.log('infoid--------->' + infoid)
                //console.log('infoip--------->' + infoip + ':Info')
                // console.log('siteName--------->' + siteName)
                // console.log('divid' + divid + "::")
                // console.log('DATAS--------->' + JSON.stringify(datas))

                //console.log("document.getElementById(infoip + ':Info')--->" + document.getElementById(infoip + ':Info'))
                document.getElementById(infoip + ':Info').addEventListener("click", function () {
                    // console.log('infoid--------->' + divid, + infoid)
                    openNav(infoid, siteName, divid)
                })
                /* $(iconid).click(function () {
                      console.log('infoid--------->' + divid, + infoid)
                     openNav(infoid, siteName, divid)
                 });*/


                /* 
                 document.getElementById('i-info' + divid).addEventListener('click', openNav(infoid, siteName, divid));
                 // onclick="openNav(\'' + infoid + '\',\'' + siteName + '\',\'' + divid + '\')"*/
            }


            //  console.log("datas--->" + JSON.stringify(datas['data']))
            // console.log("datas['data']['fullname']--->" + JSON.stringify(((datas['data']['image']).split("/")[3]).split(".")[0]))

            // console.log("id--->" + nodesid)
            // console.log("fullname--->" + JSON.stringify(datas['data']["fullname"]))
            //console.log("color--->" + JSON.stringify(datas['data']['color']))
            // console.log("ip--->" + nodesip)



            // hardware data color change 
            // hardwarebgcolorstatus.push({ "fullname": (datas['data']['fullname']).replaceAll('.', '_'), "status": 2 },)
            //  InitialhardwareUpdate(hardwarebgcolorstatus)

        });
        var srch_row = 'serversearch-row'
        $('#servers-heading').html('<div class="row row-width" style="margin:unset">SERVERS<div style="background-color:#c5bf13;border-radius:10px;width:21px;color:#575757;text-align:center">' + servercount + '</div><i class="icon-search hide-val' + srch_row + '" id="no-lens' + divid + '" onclick="displaysearchbar(\'' + srch_row + '\')" style="font-size: 16px;"></i></div>');
        // $('#servers-heading').append('(' + servercount + ')');
        $('#servers-heading').append('<div class="row" id="serversearch-row" style="margin-left:0%;display:none"><div class="" id="entity-search"><div class="input-with-icon position-relative" style="color:white"><input class="search-input w-100 search" type="search" name="tags"  id="overalltag" placeholder="Search" /><i class="icon-search" id="icon-search" style="position: inherit; color: white;font-size:12px;" id="i_" onclick="swapDiv(this)"></i><i class="icon-close" id="icon-close" onclick="closesearchbar(\'' + srch_row + '\')" style="position: inherit; color: white;font-size:12px;"></i></div></div><div class="col-2" text-right></div></div>');

        // server nodes display code //
        switchs().then(function () {
            nicconnect.forEach(function (obj) {//SERVER NIC LEADERLINE
                // console.log('NICCONNECT DATA---->' + JSON.stringify(obj))
                var start = document.getElementById(obj[1].replaceAll(".", "_"))
                //var start = document.getElementById(obj[1] + ':NIC')
                var end = document.getElementById(obj[16].replaceAll(".", "_"))
                //var end = document.getElementById(obj[10] + ':NIC')
                //  console.log('obj data---->' + obj)
                if (start != null && end != null && end != undefined) {
                    var clr
                    if (obj[11].toString() == '0') {
                        var link = new LeaderLine(start,
                            end,
                            { color: '#ff3d57', positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'red', outlineColor: 'red', endPlugColor: 'red', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                        );

                        (document.getElementById('s_hw')).addEventListener('scroll', AnimEvent.add(function () {
                            link.position();
                        }), false);
                        (document.getElementById('server-div')).addEventListener('scroll', AnimEvent.add(function () {
                            link.position();
                        }), false);
                        //     console.log('LINK IN ENTITY IF type--->' + typeof (link))
                        //     console.log('LINK IN ENTITY IF--->' + Object.keys(link).length)
                        getarrowdata(('s' + (obj[1].replaceAll(".", "_"))), link)
                    } else {
                        //      console.log('---ELSE---')
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
                        (start).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                        (start).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                        (end).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                        (end).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);

                        (document.getElementById('s_hw')).addEventListener('scroll', AnimEvent.add(function () {
                            link.position();
                        }), false);
                        (document.getElementById('server-div')).addEventListener('scroll', AnimEvent.add(function () {
                            link.position();
                        }), false);
                        //     console.log('LINK IN ENTITY ELSE type--->' + typeof (link))
                        //     console.log('LINK IN ENTITY ELSE--->' + Object.keys(link).length)
                        getarrowdata(('s' + (obj[1].replaceAll(".", "_"))), link)
                    }
                }
            });





            for (let index = 0; index < layers.length; index++) {//SWITCH PORT LEADERLINE
                arrowdata[index].forEach(function (obj) {
                    //console.log('ARROW DATA--->' + (obj))
                    var portid = obj[1].split(":")[1];
                    var l = layers[index].split("_")[0]
                    //console.log('LAYER--->' + l)
                    //console.log('isEmptyObject(obj[10])--->' + jQuery.isEmptyObject(obj[10]))
                    var start_id = ''
                    if (obj[1].includes(':p')) {
                        start_id = 'p_' + obj[7].replaceAll(".", "_")
                    } else if (obj[1].includes(':s')) {
                        start_id = 's_' + obj[7].replaceAll(".", "_")
                    }
                    // console.log('obj[7].replaceAll(".", "_")--->' + obj[7].replaceAll(".", "_") + ' portid--->' + portid + ' document.getElementById('+obj[7].replaceAll(".", "_")+')----> ' +document.getElementById(obj[7].replaceAll(".", "_")) )
                    // console.log('$(# ' + obj[7].replaceAll(".", "_") +' #'+portid+' )' + $("#" + obj[7].replaceAll(".", "_") + " #" + portid))
                    //  console.log('document.getElementById(obj[7].replaceAll(".", "_")).getElementById(obj[1].split(":")[1])--->' + document.getElementById(obj[7].replaceAll(".", "_")).getElementById(obj[1].split(":")[1]))
                    if (obj[10] != 'null' && jQuery.isEmptyObject(obj[10]) != true && obj[10] != 'none') {
                        //  if ((obj[10].includes('wan')) != true) {
                        //  console.log('START_ID--->' + start_id)
                        var start = document.getElementById(start_id).getElementById(obj[1].split(":")[1])
                        var end = '';
                        // console.log('OBJ[10](' + obj[10] + ') if true--->' + document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_")))
                        var end_id = ''
                        if (obj[10].includes(':p')) {
                            end_id = 'p_' + (obj[10].split(":")[0]).replaceAll(".", "_")
                        } else if (obj[10].includes(':s')) {
                            end_id = 's_' + (obj[10].split(":")[0]).replaceAll(".", "_")
                        }
                        //  console.log('END_id--->' + end_id)
                        if (obj[10].includes(':') && (document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_"))) != null) {
                            // if (obj[10].includes(':') && (document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_")).contains(document.getElementById(obj[10].split(":")[1]))) && (document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_"))) != null) {
                            // console.log('obj[10]-------------->' + obj[10])
                            end = document.getElementById(end_id).getElementById(obj[10].split(":")[1])
                            //      console.log('END VALUE in if ---->' + end)
                        } else {
                            var nameelements = document.getElementsByName((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC')
                            var classelements = document.getElementsByClassName((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC')
                            // console.log('NAMEELEM--->' + nameelements)
                            // console.log((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC-by name--->' + nameelements[0])
                            // console.log((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC-by class--->' + classelements[0])
                            // console.log((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC-by id--->' + document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC'))
                            // console.log("NAME--->" + nameelements[0] == document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC'))
                            // console.log("CLASS--->" + classelements[0] == document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC'))
                            end = classelements[0];
                            //end = nameelements[0];
                            // end = document.getElementById((obj[10].split(":")[0]).replaceAll(".", "_") + ':NIC')
                            //     console.log('END VALUE in else---->' + end)
                        }
                        //var end = document.getElementById('s_swip_' + obj[10].replaceAll(".", "_"))
                        //   console.log('START VALUE---->' + start)
                        //    console.log('END VALUE---->' + end)
                        if (obj[5] == 'port' && portid != undefined && portid != null && start != null && end != null && end != undefined) {
                            var clr
                            // console.log('OBJ[2]------->' + obj[2])
                            if (obj[11].toString() == '2') {
                                //if (obj[11].toString() == '0') {
                                console.log((obj[1] + ' is Red'))
                                //             console.log('---IF---')
                                var scrolldiv = document.getElementById('g-switch')
                                // console.log('SCROLLDIV--->' + scrolldiv)
                                var link = new LeaderLine(start,
                                    end,
                                    { color: '#16d39a', hide: true, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: 'green', outlineColor: 'green', endPlugColor: 'green', outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                );
                                //      console.log('document.getElementById(g -switch)====>' + document.getElementById('g-switch'))
                                (start).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                (start).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                (end).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                (end).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                (document.getElementById('g-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                (document.getElementById('p-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                (document.getElementById('e-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                (document.getElementById('g-div')).addEventListener('scroll', AnimEvent.add(function () {
                                    //  console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                (document.getElementById('s_hw')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                (document.getElementById('server-div')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                //               console.log('LINK IN ENTITY IF type--->' + typeof (link))
                                //               console.log('LINK IN ENTITY IF--->' + Object.keys(link).length)
                                getarrowdata(('l' + (obj[7].replaceAll(".", "_")) + portid), link)
                                //   map['l' + (obj[7].replaceAll(".", "_"))+portid]=link
                            } else {
                                //               console.log('---ELSE---')
                                var b_clr = ''
                                switch (obj[11]) {
                                    case 0:
                                        //console.log((obj[1] + ' is Red'))
                                        clr = '#ff3d57'
                                        b_clr = 'red'
                                        break;
                                    case 1:
                                        // console.log((obj[1] + ' is Orange'))
                                        clr = '#e59105'
                                        b_clr = 'orange'
                                        break;
                                    case 3:
                                        // console.log((obj[1] + ' is Orange'))
                                        clr = '#ffffff'
                                        b_clr = 'white'
                                        break;

                                    default:
                                        //console.log((obj[1] + ' is Grey'))
                                        b_clr = 'grey'
                                        clr = '#000000'
                                }
                                /*case 2:
                                        console.log((obj[1]+ ' is Green'))
                                        clr = '#16d39a'
                                        b_clr = 'green'
                                        break; */
                                var link = new LeaderLine(start,
                                    end,
                                    { color: clr, positionByWindowResize: false, size: 2, endPlug: 'square', startPlug: 'disc', startPlugColor: b_clr, outlineColor: b_clr, endPlugColor: b_clr, outline: true, startPlugOutline: true, endPlugOutline: true, startPlugOutlineColor: '#000000', endPlugOutlineColor: '#000000' }
                                );
                                /* (start).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                 (start).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                 (end).addEventListener('mouseover', function () { (link).show(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);
                                 (end).addEventListener('mouseout', function () { (link).hide(['fade'[{ duration: 300, timing: 'linear' }]]); }, false);*/
                                (document.getElementById('g-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                (document.getElementById('p-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                (document.getElementById('e-switch')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                (document.getElementById('g-div')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                (document.getElementById('s_hw')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                (document.getElementById('server-div')).addEventListener('scroll', AnimEvent.add(function () {
                                    // console.log('INSIDE SCROll')
                                    link.position();
                                }), false);
                                //               console.log('LINK IN ENTITY ELSE type--->' + typeof (link))
                                //                console.log('LINK IN ENTITY ELSE--->' + Object.keys(link).length)
                                getarrowdata(('l' + (obj[7].replaceAll(".", "_")) + portid), link)
                                // map['l' + (obj[7].replaceAll(".", "_")) + portid] = link
                            }

                        }
                        //}
                    }
                });
            }
        });
        // getdivcolorDatas();
        // hardwaredivcolorDatas();
        //createGraph(nodesData, edgesData);
    }
    else {
        //  $("#node-view #entity-search").css('visibility', 'hidden');
        $("#node-view #s_hw").css('display', 'none');
        $("#node-view #entity-nodata").css('display', 'none');
        if (responseCode == 200)
            $("#entity-nodata #nodatamessage").text('No Data');  // No data print here
        else
            $("#entity-nodata #nodatamessage").text('Entity server not reachable.');
    }
}



//------------- hardware details ------------//
/*function openOnImageClick(select, nodesid, nodesip) {
    var newip = 'ip_' + nodesip
    var newid = nodesid
    document.getElementById('hardwaresdata' + newip).style.display = 'block';
    var temphtml = '';
    $("#portinfos" + newip).empty();

    temphtml += '<span class="fa fa-2x"><i class="icon-analysis" onclick="opendashboarsuperset()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-downtime" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-health" onclick="openNavs(\'' + newid + '\',\'' + siteName + '\',\'' + newip + '\')" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-help" onclick="openNav(\'' + newid + '\',\'' + siteName + '\',\'' + newip + '\')" style="color:#fff"></i></span>'

    $("#portinfos" + newip).append(temphtml);
}*/

function displaysearchbar(searchrow_name) {
    //console.log("displaysearchbar----->" + searchrow_name)
    if ($('#' + searchrow_name).css('display') != 'none') {
        //console.log("displaysearchbar-if---->" + searchrow_name)
        $('.hide-val' + searchrow_name).show();
        $('#' + searchrow_name).css('display', 'none')
    } else {
        //console.log("displaysearchbar-else---->" + searchrow_name)
        $('.hide-val' + searchrow_name).hide();
        $('#' + searchrow_name).css('display', 'flex')
    }
    if ((searchrow_name == 'pserversearch-row') || (searchrow_name == 'vmserversearch-row')) {
        pause_supdate.push(searchrow_name)
        document.getElementById("ps_overalltag").addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent form submission or default behavior
                swapDiv(this,'ps_hw'); // Call the search function
            }
        });
        document.getElementById("vms_overalltag").addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent form submission or default behavior
                swapDiv(this,'vms_hw'); // Call the search function
            }
        });

    }
    console.log('OPEN PAUSE_SUPDATE--->' + pause_supdate)
}
function closesearchbar(closebar) {
    // console.log("closesearchbar----->" + closebar)
    $('#' + closebar).css('display', 'none')
    $('.hide-val' + closebar).show();

    if ((closebar =='pserversearch-row')) {
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
    
    console.log('CLOSE PAUSE_SUPDATE--->' + pause_supdate)
}
function removeValueFromArray(arr, value) {
    const index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    return arr;
}
/*
function createGraphs(nodes, edges) {
    $("#s_hw").empty();
    cyGraph["s_hw"] = cytoscape(
        {
            container: document.getElementById('s_hw'),
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
                    'color': 'data(color)'
                })

                .selector('edge')
                .css({
                    'curve-style': 'bezier',
                    'width': 0.5,
                    'target-arrow-shape': 'vee',
                    'line-color': '#ff0000',
                    'target-arrow-color': '#0000ff'
                })
                .selector('node.highlight').css({ 'border-width': '3', 'font-size': '20' })
                .selector('node.semitransp').css({ 'opacity': '0.5', 'border-width': '1', 'font-size': '8' })
                .selector('edge.highlight').css({ 'width': '1.5', "label": "data(label)", "text-rotation": "autorotate", 'text-margin-y': '-10px', 'font-size': '10' })
                .selector('edge.semitransp').css({ 'opacity': '0.2', 'width': '0.5' })
                .selector('node.hasLabel').css({ 'label': "data(text)" }),

            elements:
            {
                nodes: nodes,
                // edges: edges
            },

            layout: graphLayout,

        });
    cyGraph["s_hw"].on('tap', 'node', function (e) {
        var neigh = e.target;
        cyGraph["s_hw"].elements().difference(neigh.outgoers().union(neigh.incomers())).not(neigh).addClass('semitransp');
        neigh.addClass('highlight').outgoers().addClass('highlight');
        neigh.addClass('highlight').incomers().addClass('highlight');
        var color = neigh[0]["_private"]["data"]["color"]
        neigh.connectedEdges().style({ 'line-color': color, 'target-arrow-color': color, 'color': color });
    });
    cyGraph["s_hw"].on('click', function (e) {
        cyGraph["s_hw"].elements().removeClass('semitransp');
        cyGraph["s_hw"].elements().removeClass('highlight');
        cyGraph["s_hw"].elements().style({ 'line-color': '#aeaeae', 'target-arrow-color': '#aeaeae' });
    });
    cyGraph["s_hw"].on('zoom', function (event) {
        if (cyGraph["s_hw"].zoom() > 1)
            cyGraph["s_hw"].elements().nodes().addClass('hasLabel')
        else if (cyGraph["s_hw"].zoom() < 1)
            cyGraph["s_hw"].elements().nodes().removeClass('hasLabel')
    });
    cyGraph["s_hw"].cxtmenu(
        {
            menuRadius: 75,
            indicatorSize: 0,
            selector: 'node[dashboardenabled="true"]',
            commands:
                [
                    {
                        content: '<span class="fa fa-2x"><i class="icon-analysis" style="color:white"></i></span>',
                        select: function (ele) {
                            openNav(ele.id(), ele.data('dashboard_url'));
                        },
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-health" style="color:white"></i></span>',
                        select: function (ele) {
                            //openNagiosGraph(ele.id(), ele.data('fullname'));
                            openNavs(ele.id(), entitySelectedsite);
                        }
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-help" style="color:white" ></i></span>',
                        select: function (ele) {
                            openhelp(ele.id(), entitySelectedsite);
                        }
                    }
                ]
        });

    cyGraph["s_hw"].cxtmenu(
        {
            selector: 'node[dashboardenabled="false"]',
            commands:
                [
                    {
                        content: '<span class="fa fa-2x"><i class="icon-analysis text-white"></i></span>',
                        //enabled: false
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
                    }
                ]
        });

    // makeStompConnection();
    // if(wsConnected == false)
    // makeWebSocConnection(websocketurl)

}
*/

// HARDWARE FUNCTION ON SWITCH PAGE END

function dispalyNodes(data, responseCode, ip) {//SOFTWARE
    //console.log("dispalyNodes---->" + JSON.stringify(data))
    if (Object.keys(data).length > 0 && data["nodes"] && data["nodes"].data.length > 0) {
        $("#node-view #entity-search").css('visibility', 'visible');
        $("#node-view #s_sw").css('display', 'block');
        // $("#node-view #break2").css('display', 'block');
        $("#node-view #entity-nodata").css('display', 'none');
        var obj = sitesData[0] //.filter(x => x.site === entitySelectedsite)[0]
        responseFromServer = data;
        var nodesData = [];
        // var OverviewData = []
        var edgesData = [];
        var tempLabel = "";
        var nodeSize = 0;
        sortedJson = {};
        var nodeResponse = responseFromServer["nodes"]
        /* var criticalStatusCount = 0;
         var okStatusCount = 0;
         var pendingStatusCount = 0;
         var warningStatusCount = 0;
         var unknownStatusCount = 0;*/
        /* console.log('DIPALYNODES IP--->' +ip)
         console.log(' DIPALYNODES IPcriticalStatusCount--->' + JSON.stringify(criticalStatusCount))
         console.log( 'DIPALYNODES IP okStatusCount--->' + JSON.stringify(okStatusCount))
         console.log('DIPALYNODES IP pendingStatusCount--->' + JSON.stringify(pendingStatusCount))
         console.log('DIPALYNODES IP warningStatusCount--->' + JSON.stringify(warningStatusCount))
         console.log('DIPALYNODES IP unknownStatusCount--->' + JSON.stringify(unknownStatusCount))*/
        if (nodeResponse.status == 200) {
            $("#total-nodes").html("Nodes (" + nodeResponse.data.length + ")");
            nodeResponse.data.forEach(function (row) {
                //console.log('DISPALY NODES ROW DATA--->' + JSON.stringify(row))
                /* if (row[2])
                     var state = row[2].toUpperCase()
                 else
                     var state = row[2]*/
                if (row[11] && typeof (row[11]) == 'string')
                    var state = parseInt(row[11])
                else
                    var state = row[11]
                if (state === 0) {
                    //if (state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING") {
                    // console.log('SW critical-->'+state+' ip--->' + row[7]+' name--->' + row[1])
                    criticalStatusCount[ip] += 1;
                }
                if (state === 2) {
                    //   console.log('SW OK-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                    // if (state == "" || state === "RUNNING" || state === "TRUE" || state === "OK" || state === "UP") {
                    okStatusCount[ip] += 1;
                }
                /* if (state === "PENDING") {
                     pendingStatusCount[ip] += 1;
                 }*/
                if (state === 1) {
                    // if (state === "WARNING") {

                    warningStatusCount[ip] += 1;
                }
                if (state === 3) {
                    // console.log('SW UNKNOWN-->' + state + ' ip--->' + row[7] + ' name--->' + row[1])
                    //if (state === "UNKNOWN" || state === "DELETED" || state === "TERMINATED") {
                    unknownStatusCount[ip] += 1;
                }
                var color = getColorForNodeState(state);
                // var color = getColorForNodeState(row[2]);
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
            // console.log('#pills-critical-tab' + ip + ' criticalStatusCount[ip]--->' + criticalStatusCount[ip] + ' (INSIDE IF)')
            obj.isSuccess = true
            $('#pills-critical-tab' + ip).attr('onclick', ' ');
            $("#pills-critical-tab" + ip).html("Critical (" + criticalStatusCount[ip] + ")");
        }
        else {
            obj.isSuccess = false
            /* var classList = $("#" + entitySelectedsite + "_li").attr('class')
             if (classList.includes("failure") == false) {
                 $("#node-view #" + clientdata + "_li").removeClass("success");
                 $("#node-view #" + clientdata + "_li").addClass("failure");
                 $("#node-view #" + clientdata + "_li .nav-link").removeClass("green");
                 $("#node-view #" + clientdata + "_li .nav-link").addClass("red");
                 // $("#entityLED").removeClass("green").addClass('red')
             }
             */

            //  console.log('IP FROM SW--->' + ip)
            var swapid = "card" + ip
            //  console.log('swapid--->' + swapid)
            elm = document.getElementById(swapid)
            //   console.log('ELM--->' + elm)
            elm.parentNode.insertBefore(elm, document.getElementById('s_hw').children[0]);
            // console.log('<----   #pills-critical-tab' + ip + ' criticalStatusCount[ip]--->' + criticalStatusCount[ip] + ' (INSIDE ELSE---->)')
            //$("#pills-critical-tab" + ip).html('<a class="nav-link" id="pills-critical-tab' + ip + '" data-toggle="pill" href="#pills-critical' + ip + '" role="tab" aria-controls="pills-critical" aria-selected="true" onclick="statusFunction(this);">' + criticalStatusCount[ip] + '</span></a>');
            $('#pills-critical-tab' + ip).attr('onclick', 'statusFunction(this)');
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

        //console.log('warningstatuscount of ' + ip + ' is ' + warningStatusCount[ip])
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
        // myjson = {}
        sumsortedJson[ip] = sortedJson
        sortedJson = []
        // sumsortedJson.push(myjson)
    }
    else {
        //  $("#node-view #entity-search").css('visibility', 'hidden');
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
   // console.log("var ipKey = key;---->"+ip)
    var ipKey = ip.replace("ip_", "").replaceAll("_", ".");
    
     //console.log("jsondata--->" + JSON.stringify(jsondata))
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
                    // Sort the services array based on the service name (assuming service name is in the 2nd column)
                    val.services.sort(function (a, b) {
                        return a[1].localeCompare(b[1]);
                    });

                    $.each(val.services, function (index, row) {
                        //console.log("row--->" + row);
                        serviceHtml += "<tr>";

                        serviceHtml += "<td class='ip'> </td>";

                        serviceHtml += "<td style='border-left: 1px solid #eee;' class='service'>" + row[1].split(":")[1] + "</td>";
                        // console.log("row[1].split()[1]--->" + row[1].split(":")[1]);
                        const timestamp = row[6];
                        const date = new Date(timestamp);
                        serviceHtml += "<td>" + date.toLocaleString() + "</td>";
                        var status = getColorForNodeState(row[2]);
                        var statusText = row[2] == "" ? 'OK' : row[2];
                        serviceHtml += "<td><span class='white-text py-1 px-2 size12 radius-8 status' style='background:" + status + "'>" + statusText + "</span></td>";
                        serviceHtml += "<td>" + row[3] + "</td>";
                        serviceHtml += "<td>" + row[19] + "</td>";
                        // console.log("row[3]--->" + row[3]);
                        //console.log("row----->" + row)
                        serviceHtml += "</tr>";
                    });
                }

                var rowSpan = hostRowSpan + serviceRowSpan + 1;
                // html += "<tr>";
                // html +=     "<td class = 'ip' rowspan='"+rowSpan+"'>"+val.host[7]+"</td>";
                // html +=     "<td style='border-left: 1px solid #eee;'>Server</td>";
                // html +=     "<td >"+getFormatedDate(val.host[6])+"</td>";
                // var status = getColorForNodeState(val.host[2]);
                // var statusText = val.host[2] ==  "" ? 'OK' : val.host[2]
                // html +=     "<td ><span class='white-text py-1 px-2 size12 radius-8 status' style='background:"+status+"'>"+statusText+"</span></td>";
                // html +=     "<td >"+val.host[3]+"</td>";
                // html += "</tr>";
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
            // $(".modal-body").children().remove();
            // $(".icon-node, .icon-tableview ").toggle(100);
            //swal("No service Available!", ' ', 'warning')
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
    // console.log('IP IN CREATEGRAPH--->' + ip)
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
    //cyGraph.fit(), // Pan and zoom fitted to the tree
    //cyGraph.reset(), // Pan and zoom fitted to the tree
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
            //openMenuEvents: 'cxttapstart tap',
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
                    /* {
                         content: '<span class="fa fa-2x"><i class="icon-downtime" style="color:white"></i></span>',
                         select: function (ele) {
                         }
                     },*/
                    {
                        content: '<span class="fa fa-2x"><i class="icon-health" style="color:white"></i></span>',
                        select: function (ele) {
                            //openNagiosGraph(ele.id(), ele.data('fullname'));
                            openNavs(ele.id(), entitySelectedsite, ip);
                        }
                    },
                    {
                        content: '<span class="fa fa-2x"><i class="icon-help" style="color:white" ></i></span>',
                        select: function (ele) {
                            openhelp(ele.id(), entitySelectedsite, ip);
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
                        //enabled: false
                        select: function (ele) {
                            openNav(ele.id(), entitySelectedsite);
                        }
                    },
                    /* {
                         content: '<span class="fa fa-2x"><i class="icon-downtime text-white"></i></span>',
                         select: function (ele) {
                         }
                     },*/
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

/*function makeWebSocConnection(websocketurl, wsitename, tries, nodeCount) {
    try {
        if (window.WebSocket) {
            var destination = "/exchange/k8s_update";
            var wsobjname = new WebSocket(websocketurl);
            var client = Stomp.over(wsobjname);
            client.id = wsitename
            client.connectionTries = tries;
            client.criticalNodeCount = nodeCount;
            var on_conn = function () {
                wsConnected = true;
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                obj.isWSConnected = true;
                //$("#entity-pipe").css('color', '#16d39a')
                var entityhtml = '<div class="indicator" id="entity-pipe" style="color:#16d39a"> \
                    <i class="mdi mdi-check-network-outline tooltip" id="icon-chats"> \
                        <span class="tooltiptext"><p><b>Queue Name :</b> entity_update</p> \
                        <p><b>isConnected :</b> True</p> \
                        <p><b>Reconnect	:</b> '+ connectionTries + '</p></span> \
                    </i> \
                    </div>'
                $('#entity-html').empty()
                $("#entity-html").append(entityhtml);
                client.subscribe(destination, function (message) {
                    var tempJson = JSON.parse(message.body);
                    var monitorStatus = tempJson.monitor_status;
                    if (monitorStatus === "CRITICAL" || monitorStatus === "DOWN" || monitorStatus === "UNREACHABLE" || monitorStatus === "FALSE" || monitorStatus === "WAITING") {
                        client.criticalNodeCount++;
                    }
                    else {
                        client.criticalNodeCount--;
                    }
                    if (client.id == entitySelectedsite) {
                        var title = tempJson.title;
                        var name = tempJson.name;
                        var node_type = tempJson.node_type;
                        var kind = tempJson.kind;
                        var image = image_path + tempJson.image;
                        if (title !== "") {
                            if (cyGraph) {
                                var id = titleToId[title];
                                if (node_type === "create" || node_type === "update") {
                                    var eles = cyGraph.nodes("[fullname='" + title + "']");
                                    var isNode = eles.isNode();
                                    var color = getColorForNodeState(monitorStatus);
                                    var size = getSizeForNode(tempJson.type)
                                    if (!isNode) {
                                        var nodes = {
                                            fullname: title, dashboardenabled: 'true',
                                            dashboard_url: "/static/app/images/images/Linux.png", text: name, image: image, color: color, size: size
                                        };
                                        cyGraph.add({ group: 'nodes', data: nodes })
                                        var layouts = cyGraph.layout(graphLayout);
                                        layouts.run();
                                        cyGraph.style().selector(eles).style(
                                            {
                                                'background-color': color,
                                                'border-color': color,
                                            }).update();
                                        setAnim(id);
                                    }
                                    else {
                                        if (cyGraph.nodes && cyGraph.nodes("[fullname='" + title + "']")) {
                                            cyGraph.nodes("[fullname='" + title + "']")[0]["_private"]["data"]["color"] = color;
                                            cyGraph.style().selector(eles).style(
                                                {
                                                    'background-color': color,
                                                    'border-color': color,
                                                }).update();
                                            setAnim(id);
                                        }
                                    }
                                }
                                else if (node_type === "delete") {
                                    var color = getColorForNodeState("CRITICAL");
                                    cyGraph.style().selector(eles).style(
                                        {
                                            'background-color': color,
                                            'border-color': color,
                                        }).update();
                                    var eles = cyGraph.nodes("[fullname='" + title + "']");
                                    cyGraph.remove(eles);
                                }
                                nodeSpecificDetails(id, title)
                            }
                        }
                    }
                    changeSiteStatus(client.id, client.criticalNodeCount)
                    // else
                    // {
                    //     var obj = sitesData.filter(x => x.site === client.id)[0]
                    //     if(monitorStatus === "CRITICAL" || monitorStatus === "DOWN" || monitorStatus === "UNREACHABLE" || monitorStatus === "FALSE" || monitorStatus === "WAITING")
                    //     { 
                    //         if(obj.isSuccess != false) 
                    //         {
                    //             $("#node-view #"+client.id+"_li").removeClass("success");
                    //             $("#node-view #"+client.id+"_li").addClass("failure");
                    //             $("#node-view #"+client.id+"_li .nav-link").removeClass("green");
                    //             $("#node-view #"+client.id+"_li .nav-link").addClass("red");
                    //         }  
                    //     }  
                    // }
                });
                client.subscribe('/exchange/delta_update', function (message) {
                    var tempJson = JSON.parse(message.body);
                    var monitorStatus = tempJson.monitor_status;
                    if (monitorStatus === "CRITICAL" || monitorStatus === "DOWN" || monitorStatus === "UNREACHABLE" || monitorStatus === "FALSE" || monitorStatus === "WAITING") {
                        client.criticalNodeCount++;
                    }
                    else {
                        client.criticalNodeCount--;
                    }
                    if (client.id == entitySelectedsite) {
                        var id = titleToId[tempJson.title];
                        if (id !== undefined) {
                            var color = getColorForNodeState(tempJson.monitor_status);
                            if (cyGraph.nodes("[fullname='" + tempJson.title + "']")[0])
                                cyGraph.nodes("[fullname='" + tempJson.title + "']")[0]["_private"]["data"]["color"] = color;
                            cyGraph.style().selector('node[id = ' + id + ']').style(
                                {
                                    'background-color': color,
                                    'border-color': color,
                                }).update();
                            setAnim(id);
                        }
                        nodeSpecificDetails(id, tempJson.title)
                    }
                    if (tempJson.host !== undefined) {
                        var tempObj = {}
                        tempObj['host'] = nodeStatus(Object.keys(tempJson.host).map((key) => [key, Number(tempJson.host[key])]));
                        tempObj['service'] = nodeStatus(Object.keys(tempJson.service).map((key) => [key, Number(tempJson.service[key])]));
                        obj.nodeCount = tempObj;
                        if (pageName === "Dashboard")
                            findCount()
                        if (entitySelectedsite == client.id) {
                            updateValues(tempObj);
                        }
                    }
                    changeSiteStatus(client.id, client.criticalNodeCount)
                    // else
                    // {
                    //     var obj = sitesData.filter(x => x.site === client.id)[0]
                    //     state = tempJson.monitor_status
                    //     if(state === "CRITICAL" || state === "DOWN" || state === "UNREACHABLE" || state === "FALSE" || state === "WAITING")
                    //     { 
                    //         if(obj.isSuccess != false) 
                    //         {
                    //             $("#node-view #"+client.id+"_li").removeClass("success");
                    //             $("#node-view #"+client.id+"_li").addClass("failure");
                    //             $("#node-view #"+client.id+"_li .nav-link").removeClass("green");
                    //             $("#node-view #"+client.id+"_li .nav-link").addClass("red");
                    //         }  
                    //     }  
                    // }
                });
                $("#node-view #" + client.id + "-indicator").css('background', '#16d39a')
                this.connectionTries = 6
            }
            var on_err = function (error) {
                $("#node-view #" + client.id + "-indicator").css('background', '#ff3d57')
                var obj = sitesData[0] //.filter(x => x.site === client.id)[0]
                //$("#entity-pipe").css('color', '#16d39a')
                var entityhtml = '<div class="indicator" id="entity-pipe" style="color:#ff3d57"> \
                    <i class="mdi mdi-close-network-outline tooltip" id="icon-chats"> \
                        <span class="tooltiptext"><p><b>Queue Name :</b> entity_update</p> \
                        <p><b>isConnected :</b> False</p> \
                        <p><b>Reconnect	:</b> '+ connectionTries + '</p></span> \
                    </i> \
                    </div>'
                $('#entity-html').empty()
                $("#entity-html").append(entityhtml);
                obj.isWSConnected = false;
                if (networkStatus === 'online') {
                    if (client.connectionTries == 10) {
                        swal({
                            title: "Want to get entity updates?",
                            text: "Not able to connect web socket of \"" + client.id + "\". Please check once!.",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonClass: "btn-success",
                            confirmButtonText: "Yes, try again",
                            cancelButtonText: "No Cancel",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                            function (isConfirm) {
                                if (isConfirm) {
                                    makeWebSocConnection(client.ws.url, client.id, 0, client.criticalNodeCount)
                                } else {
                                    $("#node-view #" + client.id + "-indicator").css('background', '#ff3d57')
                                }
                            });
                    }
                    else {
                        client.connectionTries++;
                        var entityhtml = '<div class="indicator" id="entity-pipe" style="color:#e99123"> \
                            <i class="mdi mdi-help-network-outline tooltip" id="icon-chats"> \
                            <span class="tooltiptext"><p><b>Queue Name :</b> entity_update</p> \
                        <p><b>isConnected :</b> Trying</p> \
                        <p><b>Reconnect	:</b> '+ connectionTries + '</p></span> \
                            </i> \
                            </div>'
                        $('#entity-html').empty()
                        $("#entity-html").append(entityhtml);
                        makeWebSocConnection(client.ws.url, client.id, client.connectionTries, client.criticalNodeCount)
                    }
                }
            };
            client.connect('linkedeye', 'linkedeye', on_conn, on_err, '/');
        }
        else {
            alert("Your browser does not support WebSockets. Updates will not work properly.");
        }
    }
    catch (err) {
        return;
    }
}*/

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

    var obj = sitesData[0] //.filter(x => x.site === site)[0]
    if (obj) {
        obj.criticalNodeCount = count;
        if (count == 0) {
            obj.isSuccess = true
            $("#node-view #site-list #" + site + '_li').removeClass("failure").addClass('success')
            // $("#node-view #site-list #" + site + '_li a').removeClass("red").addClass('green')
            // $("#entityLED").removeClass("red").addClass('green')
        }
        else {
            obj.isSuccess = false
            $("#node-view #site-list #" + site + '_li').removeClass("success").addClass('failure')
            // $("#node-view #site-list #" + site + '_li a').removeClass("green").addClass('red')
            // $("#entityLED").removeClass("green").addClass('red')
        }
    }
}
//function reloadgraph(screen) {
//    if(screen == "full")
//    {
//        cyGraph.viewport(
//        {
//            zoom: 2,
//            pan: { x: 0, y: 0 }
//        });
//    }
//    else
//    {
//        cyGraph.viewport(
//        {
//            zoom: 0.5,
//            pan: { x: 0, y: 0 }
//        });
//    }
//}

//function increasedecreasezoom(increase) {
//    if (increase == 1)
//        zoom++;
//    else
//        zoom--;
//    cyGraph.viewport(
//        {
//            zoom: zoom
//        });
//}

//function entity() {
//    window.location.href = window.location.origin + '/entity/'
//}


//function onEntitySiteTabchange(sitename) {
//    startEntityLoader()
//    entitySelectedsite = sitename;
//    $('#node-view #site-list li a.active').removeClass('active');
//    $('#node-view #site-list #' + sitename + '_li ' + 'a').addClass('active');
//    var tempSiteObj = sitesData[0] //.filter(x => x.site === sitename)[0]
//    var criticalNodeCount = tempSiteObj.criticalNodeCount;
//    if (tempSiteObj.isWSConnected == false) {
//        tempSiteObj = siteResponse[0] //.filter(x => x.sitename === sitename)[0]
//        makeWebSocConnection(tempSiteObj.websocket_url, sitename, 0, criticalNodeCount)
//    }
//    $("#s_sw").empty();
//    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: sitename }, type = "GET").done(function (response) {
//        stopEntityLoader()
//        dispalyNodes(response.responseData[0].site_data, response.responseData[0].code)
//    });
//    onTicketSiteTabchange(sitename, tempSiteObj) //Ticket site tab change
//}

/*function switchs() {

    // if g_swi data found add below response 
    //var data = [{ 'ip': "1.1.1.1", 'size': 24 }, { 'ip': 2.2.2.2, 'size': 24 }, { 'ip': 3.3.3.3, 'size': 48 }]

    requestDataFromServer('/getfilecontent', { filename: '24_switch.j2' }, "GET").done(function (response) {
        let ele = document.getElementById("g_swi")
        ele.innerHTML += response
    });
}*/


function InitialPortUpdate(array) {

    array.forEach(function (update) {
        // console.log('UPDATE FROM INITIAL PORT UPDATE--->' + JSON.stringify(update))
        var colorset = 0;
        if (update['status'] == 3) {
            //console.log('SWITCH port UNKNOWN-->' + update['status'] + ' ip--->' + update['ip']+':' + update['port'])
        }
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
        // $("#" + update['ip'].replaceAll(".", "_") + " #" + update['port']).css('fill', color)
        //console.log("update--------" + JSON.stringify(update))
    });
}

/*function switchportcounts(array) {
    // return await new Promise(function (resolve, reject) {
    //     resolve(
    // console.log('ARRAY VALUES--->' + array)
    //console.log('switchportcounts--->')
    array.forEach(function (update) {
        console.log('UPDATE FROM INITIAL PORT UPDATE--->' + JSON.stringify(update))
        if (swiportcounts[update['ip'] + '-conn'] == undefined) {
            swiportcounts[update['ip'] + '-disconn'] = 0
            swiportcounts[update['ip'] + '-conn'] = 0
            swiportcounts[update['ip'] + '-unknown'] = 0
        }
        //if (update['port'] == undefined) {
        
        swiips.push(update['ip'])
        // } else {
        switch (update['status']) {
            case 0:
                //console.log('SWITCH PORT DISSCONN CASE--->status--->' + update['status'] + '---->ip--->' + update['ip'])
                swiportcounts[update['ip'] + '-disconn']++
                break;
            case 2:
               // console.log('SWITCH PORT CONN CASE--->status--->' + update['status'] + '---->ip--->' + update['ip'])
                swiportcounts[update['ip'] + '-conn']++
                break;
            case 3:
                   // console.log('SWITCH PORT UNKNOWN CASE--->status--->'+update['status']+'---->ip--->' + update['ip'])
                swiportcounts[update['ip'] + '-unknown']++;
        }
        // if (update['port'] == 'Info') {
        //    swiips.push(update['ip'])
        // }
        // }
    })
    //  )
    // })
    countloop()
}*/

function switchportcounts(array) {
    const processed = new Set(); // To track processed combinations of ip and port

    array.forEach(function (update) {
        const ipPortKey = `${update['ip']}-${update['port']}`;

        // Check if this combination has already been processed
        if (processed.has(ipPortKey)) {
            return; // Skip this iteration if already processed
        }

        processed.add(ipPortKey); // Mark this combination as processed

        // console.log('UPDATE FROM INITIAL PORT UPDATE--->' + JSON.stringify(update));

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
    // console.log('SWIIPS--->' + swiips)
    swiips.forEach(function (obj) {
        /* console.log('OBJ--->' + obj)
         console.log('swiportcounts[obj+ - disconn]--->' + swiportcounts[obj + '-disconn'])
         console.log('swiportcounts[obj+ - conn]--->' + swiportcounts[obj + '-conn'])
         console.log('swiportcounts[obj +  - unknown]--->' + swiportcounts[obj + '-unknown'])*/
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
    //  console.log("InitialswitchUpdate-------->")
     //console.log("InitialswitchUpdate--------" + JSON.stringify(divsdata))
    divsdata.forEach(function (datadiv) {
        // if (typeof (datadiv['status']) != "string") {
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
        /*if (datadiv['status'] == 0) {//change 2 to 0 after testing
           // $('#s' + datadiv['ip'].replaceAll(".", "_")).css("border", '1px solid' + '#ff3d57');//comment after testing
            $('#s' + datadiv['ip'].replaceAll(".", "_")).addClass("critical_opaque");
        } else if ($('#s' + datadiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque')){
            $('#s' + datadiv['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
         }*/
        // }
        //  console.log("InitialswitchUpdates--------" + JSON.stringify(datadiv))
    });
}

function overallbgcolor(divhwdata) {//Server card border color Initial
    //console.log("overallbgcolor--------")
    // console.log("overallbgcolor--------" + JSON.stringify(divhwdata))
    divhwdata.forEach(function (datasdiv) {
        // if (typeof (datasdiv['status']) != "string") {
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
        //console.log('INITIAL datasdiv[STATUS]-ip->' + datasdiv['ip'] + '->' + datasdiv['status'] + ' type->' + typeof (datasdiv['status']))
        /* if (datasdiv['status'] == 0) {//change 2 to 0 after testing
             $('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).addClass("critical_opaque");
         } else if ($('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).hasClass('critical_opaque_bg')) {
             $('#cardip_' + datasdiv['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
         }*/
        // $('#' + datasdiv['ip'].replaceAll(".", "_")).css("background-color", color);
        // }
        //  console.log("overallbgcolor--------" + JSON.stringify(datasdiv))
    });
}

/*function InitialhardwareUpdate(hwdata) {//this is the initial hardware software icons color function
    //console.log("InitialswitchUpdate--------" + JSON.stringify(hwdata))
    hwdata.forEach(function (datahw) {
        //console.log(datahw['ip']+' data--->' + datahw['status']+' DATAHW type--->' + typeof (datahw['status']))
        var hwip = (datahw['ip'].split(":")[0]).replaceAll(".", "_")
        var inip = 'ip_' + (datahw['ip'].split(":")[0]).replaceAll(".", "_")
        var hwstr = datahw['ip'].split(":")[1]
        var hardid = '#' + hwip + '\\:' + hwstr
        // console.log('hardid--->' + hardid)
        switch (parseInt(datahw['status'])) {
            case 0:
                color = '#ff3d57'
                $(hardid).css("border", "1px solid #ffffff");
                break;
            case 1:
                color = '#e59105'
                $(hardid).css("border", "1px solid #ffffff");
                break;
            case 2:
                color = '#16d39a'
                $(hardid).css("border", "1px solid #ffffff");
                break;
            case 3:
                color = '#ffffff'
                $(hardid).css("border", "1px solid #ffffff");
                break;
            case 5:
                color = '#1f1f1f'
                $(hardid).css("border", "1px solid #1f1f1f");
                break;
            default:
                color = '#000000'
                $(hardid).css("border", "1px solid #ffffff");
        }

        // console.log("hardid--------" + JSON.stringify(inip))
        if (hwip + ':' + hwstr == hwip + ':Info') {
            // console.log("hardid--------" + ('#i-info' + inip))
            $(hardid).css("color", '#ffffff');
            $(hardid).css("border", 'none');
            // $('#i-info' + inip).css("color", color);
        }
        else {
            $(hardid).css("background-color", color);
        }
        //$(hardid).css("background-color", color);
        //  $('#' + hwip).css("background-color", color);
        // $('#' + hwip + ':' + hwstr).css("background-color", color);
        //  console.log("divsdata--------" + ('#' + hwip + ':' + hwstr))
        // console.log("divsdata--------" + JSON.stringify(datahw))
    });
}*/

//(switch hardware initial update) ONLOAD SWITCH HW COLOR CHANGE AND DATE [DATA IS NOT CURRENT DATE COLOR IS BLUR]
function InitialhardwareUpdate(hwdata) {
    //console.log("InitialhardwareUpdate--------" + JSON.stringify(hwdata));
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
            //overall div color
           /* $('#s' + hwip).css({
                //"color": color,
                "opacity": "0.7"  // 50% opacity if not today's date
            });*/
            //$('#s' + hwip).css("color", color);
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
    //console.log("overalldivcolor-[divhw]--->" + JSON.stringify(divhw))
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

    //$('#' + hwips + '\\:' + hwstrs).css("background-color", color);
    if (hwips + ':' + hwstrs == hwips + ':Info') {
        // console.log("hardid--------" + ('#i-info' + inips))
        $('#' + hwips + '\\:' + hwstrs).css("color", '#ffffff');
        $('#' + hwips + '\\:' + hwstrs).css("border", 'none');
        //$('#i-info' + inips).css("color", color);
    }
    else {
        $('#' + hwips + '\\:' + hwstrs).css("background-color", color);
    }
    // console.log("InitialhardwareUpdates--------" + ('#' + hwips + ':' + hwstrs))
    //console.log("InitialhardwareUpdates--date------" + divhw['datetime'])
    // $('#s' + divhw['ip'].replaceAll(".", "_")).css("border", '1px solid' + color);

}

function overalldivcolor(divcolor) {
    //  console.log("overalldivcolor-[1]--->" + JSON.stringify(divcolor))
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
    //console.log('DIVCOLOR[STATUS]-ip->' + divcolor['ip'] +'->' + divcolor['status'] + ' type->' + typeof (divcolor['status']))
    /*if (divcolor['status'] == 0) {//change 2 to 0 after testing
        $('#cardip_' + divcolor['ip'].replaceAll(".", "_")).addClass("critical_opaque");
    } else if ($('#cardip_' + divcolor['ip'].replaceAll(".", "_")).hasClass('critical_opaque_bg')) {
        $('#cardip_' + divcolor['ip'].replaceAll(".", "_")).removeClass("critical_opaque");
    }*/
    //  $('#' + divcolor['ip'].replaceAll(".", "_")).css("background-color", color);
    // InitialSwitchStatus.push({ "ip": divcolor['ip'], "status": divcolor['status'] },)
    //InitialswitchUpdate(InitialSwitchStatus)
}

function InitialswitchUpdate(divswi) {
    //  console.log("overalldivcolor-[divswi]--->" + JSON.stringify(divswi))
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
    //console.log('id to change border is --->' + '#s' + divswi['ip'].replaceAll(".", "_"))
    //console.log('is element present --->' + $('#s' + divswi['ip'].replaceAll(".", "_")))
    $('#s' + divswi['ip'].replaceAll(".", "_")).css("border", '1px solid' + color);

}

function waitForSwitchesToLoad() {
    return new Promise((resolve) => {
        // Check for switch loading every 100ms
        const intervalId = setInterval(() => {
            if (window.switchesLoaded) {
                clearInterval(intervalId);
                resolve(); // Resolve the promise when switches are loaded
            }
        }, 100);
    });
}

function switchs() {
    return new Promise((resolve) => {
        //console.log('Switch function started.');

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
            //console.log('All reqdata calls completed.');

            // Perform operations after all reqdata calls are done
            getdivcolorDatas();
            countloop();
            performFinalUpdates();

            //console.log('Switch function completed.');

            // Resolve the promise to indicate completion
            resolve();
        });
    });
}



/////////////////////////////////////////////////////////////CHANGES FROM SWITCH UPDATE ENDS////////////////////////////////////////////////////////////////////////////////

function reqdata(layer, indexcount) {
    //console.log('REQDATA--->')
    // Ensure reqdata returns a Promise
    return new Promise(resolve => {
        requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site"), layer: layer }, "GET").done(response => {
            adata = response['responseData'][0]['site_data']['nodes']['data'];
            //  adata = response['responseData'][0]['site_data']['nodes']['data']
             //console.log('DATA IN REQDATA---->' + adata)
            arrowdata[indexcount] = response['responseData'][0]['site_data']['nodes']['data']
            //console.log('ARROW DATA ASSIGNING for arrowdata' + [indexcount] + '---> ' + arrowdata[indexcount])
            //   console.log('INSIDE reqdata FOR')
            // var layer = layers[index]
            adata.forEach(function (obj) {
                // console.log('DATA IN REQDATA---->' + obj)

                var portid = obj[1].split(":")[1];
                if (obj[11] == 3) {
                    //       console.log('SWITCH  UNKNOWN CASE--->status--->' + obj[11] + '---->ip--->' + obj[7]+' name--->'+obj[1])
                }
                //console.log('OBJ FROM NEO------>' + JSON.stringify(obj))
                IndividualPortStatus.push({ "ip": obj[7], "layer": layer, "port": obj[1].split(":")[1], "status": obj[11] },)

                if (obj[5] == 'port') {
                    InitialPortStatus.push({ "ip": obj[7], "layer": layer, "port": obj[1].split(":")[1], "status": obj[11] },)
                    //console.log('OBJ FROM NEO------>' + JSON.stringify(InitialPortStatus))
                    //  IndividualPortStatus.push({ "ip": obj[7], "layer": layer, "port": obj[1].split(":")[1], "status": obj[11] },)
                }
                else if (obj[5].includes(".png") || obj[5].includes(".jpg")) {
                    // console.log("switch hw --->" + obj)
                    InitialSwitchIcons.push(obj)
                }
                else {
                    let ele = document.getElementById(layer)
                    IndividualPortStatus.push({ "ip": obj[7], "layer": layer, "port": obj[1].split(":")[1], "status": obj[11] },)

                    //InitialSwitchStatus.push({ "ip": obj[7], "layer": layer, "status": obj[2] },)
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
                    //  nodehtmls += '<p class="bold-text pl-3 d-md-block d-none" id="total-nodes">Nodes (0)</p>'
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
                    //  console.log("obj[5]--->" + obj[5])
                    //console.log('OBJ FIRST--->' + JSON.stringify(obj))
                    let swi_html_content;
                    switch_ips.push('s'+obj[1].replaceAll(".", "_"))
                    
                    swi_html_content = getSwiHtmlContent(obj[5]); // Initial check for content

                    // If swi_html_content is not set, start polling
                    if (!swi_html_content) {
                        const intervalId = setInterval(() => {
                            swi_html_content = getSwiHtmlContent(obj[5]); // Logic or function that updates swi_html_content
                            if (swi_html_content) {
                                clearInterval(intervalId);
                                continueExecution(swi_html_content, obj, ele, nodehtmls);
                            }
                        }, 100); // Check every 100 milliseconds
                    } else {
                        continueExecution(swi_html_content, obj, ele, nodehtmls);
                    }


                    //console.log('CREATING SWITCH - ' + obj[7].replaceAll(".", "_")  )

                }

                // switch details in prometheus
                port_swi.push({ "ip": "#" + obj[7].replaceAll(".", "_"), "portid": "#" + portid, "nodeid": obj[0] });
            });

            //console.log('reqdata processing complete for layer:', layer);
            resolve(); // Resolve the promise after processing
        });
    });
}


///////////////////////////////////////////---------------------TESTING--------------//////////////////////////////////////////////

//function checkAllSwitchesLoaded() {
//    console.log('switch_ips --->' + switch_ips)
//    const allLoaded = switch_ips.every(obj => {
//        console.log('OBJ--->' + JSON.stringify(obj));

//        // Use jQuery to select the elements
//        const ipElement = $(`#${obj.ip.replace(/\./g, '\\.')}`);
//        const portElement = $(`#${obj.ip.replace(/\./g, '\\.')} ${obj.portid.replace(/\//g, '_')}`);

//        // Check if both elements exist in the DOM
//        return ipElement.length > 0 && portElement.length > 0;
//    });

//    if (allLoaded) {
//        performFinalUpdates();
//    } else {
//        setTimeout(checkAllSwitchesLoaded, 100); // Retry every 100ms
//    }
//}


function performFinalUpdates() {
    //console.log('performFinalUpdates called')
    InitialPortUpdate(InitialPortStatus);
    switchportcounts(IndividualPortStatus);
    // switchportcounts(InitialPortStatus);
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

// Call checkAllSwitchesLoaded after initial processing
//checkAllSwitchesLoaded();


function continueExecution(swi_html_content, obj, ele, nodehtmls) {
    //console.log('CONTINUE EXECUTION--->')
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

// Function to get swi_html_content based on type
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


        default:
            return null; // Return null if content is not yet available
    }
}


///////////////////////////////////////////---------------------TESTING--------------//////////////////////////////////////////////

function switchiconsstate(icons) {
    icons.forEach(function (obj) {
        // console.log("icons---->" + JSON.stringify(obj))
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
            //  console.log("datdaaa------>"+'i-info'+divid)
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
            //icohtml += '<div class="row">'
            //icohtml += '<div class="col-12">'
            //icohtml += '<table class="table" style="width: 90% !important; font-size: 15px;">'
            //  < !--Table content will be added here-- >
            //icohtml += '</table>'
            // icohtml += '</div>'
            // icohtml += '</div>'
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
        //console.log('============== Switch icons for ip - ' + (obj[7]).replaceAll('.', '_'))
        $('#swihw' + (obj[7]).replaceAll('.', '_')).append(swihwdata);
        $('#iconip' + (obj[7]).replaceAll('.', '_')).append(icohtml);
        InitialswihardStatus.push({ "ip": obj[1], "status": obj[11], "datetime": obj[18] },)
    });
    InitialhardwareUpdate(InitialswihardStatus)
}
function thresholdsnmp(snmpip) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    //console.log("leurl--->" + leurl)
    // Configure it to make a GET request to the specified URL
    xhr.open("GET", leurl + "allonboard/snmpdatatable?ipaddress=" + encodeURIComponent(snmpip), true);

    // Define a callback function to handle the response
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
/*
function getdivcolorDatas() {
    //showLoader("node-view")
    requestDataFromServer("../dashboard/getneo4jnodes", { sitename: params.get("site") }, type = "GET").done(function (response) {
        //  console.log("getdivcolorDatas--->" + JSON.stringify(response['responseData'][0]['site_data']['nodes']['data']))
        divbgcolor = response['responseData'][0]['site_data']['nodes']['data']
        //console.log("divbgcolor-->" + divbgcolor + ' type->' + typeof (divbgcolor))
        //console.log("DIVBGCOLOR.LENGTH--->" + divbgcolor.length)
        var inc_value = 0;
        divbgcolor.forEach(function (obj) {
            inc_value++; if (obj[4] == 'Host') {
                InitialhwdivStatus.push({ "ip": obj[7], "status": obj[11] })
                overallbgcolor(InitialhwdivStatus) //Server card border color
                InitialSwitchStatus.push({ "ip": obj[7], "status": obj[11] })
                InitialswitchUpdates(InitialSwitchStatus)//Switch card border color 

            }
            else if (obj[4] == 'HostMS' || obj[4] == 'ServiceMS' && obj[5] != 'port') {
                hardwarebgcolorstatus.push({ "ip": obj[1], "status": obj[11] })
                InitialhardwareUpdate(hardwarebgcolorstatus)// ALL hardware software icon color
            }
        });
    });

}*/
function getdivcolorDatas() {
    requestDataFromServer("../dashboard/getHostOrIconnodes", { sitename: params.get("site") }, type = "GET").done(function (response) {
        host_divbgcolor = response['responseData'][0]['nodes_data']['hosts']['data']
        icons_bgcolor = response['responseData'][0]['nodes_data']['icons']['data']
        //console.log('HOSTS BG COLOR--->' + JSON.stringify(host_divbgcolor))
        //console.log('ICONS BG COLOR--->' + JSON.stringify(icons_bgcolor))
        host_divbgcolor.forEach(function (obj) {
            InitialhwdivStatus.push({ "ip": obj[7], "status": obj[11] })
            overallbgcolor(InitialhwdivStatus) //Server card border color
            InitialSwitchStatus.push({ "ip": obj[7], "status": obj[11] })
            InitialswitchUpdates(InitialSwitchStatus)//Switch card border color 
        });
        /*icons_bgcolor.forEach(function (obj) {
            hardwarebgcolorstatus.push({ "ip": obj[1], "status": obj[11] })
            InitialhardwareUpdatess(hardwarebgcolorstatus)// ALL hardware software icon color
        });*/
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
    //  console.log('window.innerWidth--->' + window.innerWidth)
    if (window.innerWidth <= 350) {
        //   console.log('MOBILE VIEW innerWidth--->' + window.innerWidth)
        if (totwidth > 70) {
            el.style.left = 0.85 * window.innerWidth - 50 + 'px'
            //  console.log('MOB TOTWIDTH IF--->' + 0.85 * window.innerWidth)
        } else {
            //  console.log('MOB TOTWIDTH ELSE---->' + dim.left + w.scrollLeft() + 'px')
            el.style.left = dim.left + w.scrollLeft() + 'px';
        }
        el.style.top = dim.top + w.scrollTop() + 'px';
    } else {
        if (totwidth > 85) {
            el.style.left = 0.85 * window.innerWidth + 'px'
            //  console.log('TOTWIDTH IF--->' + 0.85 * window.innerWidth)
        } else {
            //  console.log('TOTWIDTH ELSE---->' + dim.left + w.scrollLeft() + 'px')
            el.style.left = dim.left + w.scrollLeft() + 'px';
        }
        el.style.top = dim.top + w.scrollTop() + 'px';
    }
    /* if (totwidth > 85) {
         el.style.left = 0.85 * window.innerWidth + 'px'
           console.log('TOTWIDTH IF--->' + 0.85 * window.innerWidth)
     } else {
           console.log('TOTWIDTH ELSE---->' + dim.left + w.scrollLeft() + 'px')
         el.style.left = dim.left + w.scrollLeft() + 'px';
     }
     el.style.top = dim.top + w.scrollTop() + 'px';*/


}

function closedropdown() {
    var el = document.getElementById('portinfo');
    el.style.display = 'none';
}

function click(select, event) {

    //   console.log('select.offset--->' + select)
    var temphtml = '';
    var newip = "ip_" + ($(select).attr("class").split("-")[1]);
    var portid = ($(select).attr("id").replaceAll('_', '/'));
    var title = ($(select).attr("class").split("-")[1]).replaceAll('_', '.') + ':' + portid
    var messagedata;
    var nodeid = $(select).attr("nodeid")
    var layerdiv = ''
    // console.log('title : ' + title + ' newip : ' + newip + ' portid : ' + portid + ' nodeid : ' + nodeid)
    //  console.log('select.parentNode.id--->' + select.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id)
    requestDataFromServer('/entity/getneo4jspecificelement', { title: title, required: 'ifAlias', sitename: selectedsite }, "GET").done(function (response) {
        var res = JSON.parse(response);
        // console.log('RESPONSE--->' + response)
        var link = ''
        var src_name = ''
        var dest_name = ''
        if (Object.keys(res['data']).length != 0) {
            messagedata = res['data']['data']
            for (var i in messagedata) {
                // console.log('messagedata[i] - ' + messagedata[i] + ' , type - ' + typeof (messagedata[i]))
                if (messagedata[i] == null)
                    messagedata[i] = ''
            }
            link = messagedata[0]
            src_name = messagedata[1]
            dest_name = messagedata[2]
        }

        // console.log('MESAAGE[data]!=null---->' + messagedata != null)
        // layerdiv = (select.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id).split("_")[0]
        layerdiv = ((document.getElementById('s' + ($(select).attr("class").split("-")[1]))).parentNode.id).split("_")[0]
        //  console.log('LAYERDIV--->' + layerdiv)
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
    // temphtml += '<span class="fa fa-2x"><i class="icon-analysis" onclick="opendashboarsuperset(),closedropdown()" style="color:#fff"></i></span>'
    // temphtml += '<span class="fa fa-2x"><i class="icon-downtime" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-health" onclick="openNavs(\'' + nodeid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-help" onclick="openhelp(\'' + nodeid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<div class="fa"><i class="icon-close" onclick="closedropdown()" style="color:#fff"></i></div>'

    $("#portinfo").append(temphtml);
    var ns = ($(select).attr("class")).toString()
    // buttonClick(event)
    // setposition(select);
    clicked(event);
}


function openOnImageClick(select, nodesid, nodesip, event) {
    //  console.log("click(select)")
    var newip = 'ip_' + nodesip
    var newid = nodesid
    //    document.getElementById('hardwaresdata' + newip).style.display = 'block';
    var temphtml = '';
    $("#portinfo").empty();
    temphtml += '<span class="fa fa-2x"><i class="icon-analysis" onclick="openNav(\'' + newid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
    //temphtml += '<span class="fa fa-2x"><i class="icon-downtime" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-health" onclick="openNavs(\'' + newid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
    temphtml += '<span class="fa fa-2x"><i class="icon-help" onclick="openhelp(\'' + newid + '\',\'' + siteName + '\',\'' + newip + '\'),closedropdown()" style="color:#fff"></i></span>'
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

/*function refreshentpro() {
    requestDataFromServer('/entity/getentprocesskeys', { sitename: selectedsite, mode: 'ADP' }, "GET").done(function (response) {
       // console.log("refreshentpro()---->" + JSON.stringify(response))
        // Loop through the responseData to access the "data" field
        response.responseData.forEach(function (siteData) {
            siteData.site_data.forEach(function (dataItem) {
                // Check if the "key_data" has the "data" field
                console.log("refreshentpro()---->" + JSON.stringify(dataItem))
            });
        });
    })
}*/

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

            // Log the data in JSON format
            //console.log(JSON.stringify(jsonData, null, 2));

            // Store the parsed data in a variable for further use
            const excelData = jsonData;
            // Call the new function and pass the parsed data
            sendentdatapy(jsonData); // Send the data to the new function
            // Further processing if needed
            // processData(excelData);
        };

        reader.readAsArrayBuffer(file); // Read the file as an array buffer
    } else {
        console.error("No file selected.");
    }
}

function sendentdatapy(data) {
    //neo4j login port [http://172.20.1.80:32550/browser/], [31161]
    //console.log("Sending data to Django view:", JSON.stringify(data));
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
            // Close the "PROCESSING" swal
            //swal.close();

            console.log("Response from server:", responseData);

            // Check the status of the response
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
            //swal.close();

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

