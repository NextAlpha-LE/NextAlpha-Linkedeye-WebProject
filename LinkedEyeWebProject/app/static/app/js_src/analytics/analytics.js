// JavaScript source code
var params = new URLSearchParams(document.location.search);
sites = []
selectedsite = ' '
sites.push(params.get("site"));
var selectedsite = params.get("site");
var iframeIntervalValues = [];
isSave = false;
isEdit = false;
var prefix_url = "";
var access_key = ''
var analytics_Prefix_URL = ''
var grid = '';
var start_time = moment().startOf('day');
var end_time = moment()
var not_first_time = 0
var elastic_host=''
var elastic_port = ''
var current_start_page = 0;

//var requestInProgress = false;
$(document).ready(function () {
    //grid.movable('.grid-stack-item', false);
    //grid.resizable('.grid-stack-item', false);
    //showLoader("gridstackdiv")
    //if (status == 200) {
    getSiteName();
    //elastic_search();
    // Initialize default start and end times
    start_time = moment().startOf('day');
    end_time = moment();
    let defaultLabel = 'Today';
    function cb(start_time, end_time, label = defaultLabel) {
        // Update the label and value in the HTML
        if (label === 'Custom Range') {
            // Show actual time range only for custom ranges
            $('#reportrange .value').html(
                start_time.format('D MMMM, YYYY, hh:mm A') +
                ' - ' +
                end_time.format('D MMMM, YYYY, hh:mm A')
            );
        } else {
            // Show predefined label for preset ranges
            $('#reportrange .value').html(label);
        }
        // Handle logic for specific ranges
        switch (label) {
            case 'Last hour':
                start_time = moment().subtract(1, 'hour');
                end_time = moment();
                break;
            case 'Today':
                start_time = moment().startOf('day');
                end_time = moment();
                break;
            case 'Yesterday':
                start_time = moment().startOf('day').subtract(1, 'days');
                end_time = moment().startOf('day');
                break;
            case 'Last 7 Days':
                start_time = moment().startOf('day').subtract(6, 'days');
                end_time = moment();
                break;
            case 'Last 30 Days':
                start_time = moment().startOf('day').subtract(29, 'days');
                end_time = moment();
                break;
            case 'This Month':
                start_time = moment().startOf('month');
                end_time = moment();
                break;
            case 'Last Month':
                start_time = moment().subtract(1, 'month').startOf('month');
                end_time = moment().subtract(1, 'month').endOf('month');
                break;
            default:
                // Custom range
                break;
        }

        // Update logic based on the selected range
        const activeGridStackId = getActiveTabChildIdWithGridStack();
        if (activeGridStackId === 'Dealergridstackdiv') {
            not_first_time = 1;
            report_type = 'login_report';

            if ($.fn.DataTable.isDataTable('#esTable')) {
                showLoader("gridstackdiv");
                showLoader("esTable_wrapper");
                const table = $('#esTable').DataTable();
                const params = table.ajax.params();
                params.start_time = moment(start_time).toISOString();
                params.end_time = moment(end_time).toISOString();
                table.ajax.reload(null, false); 
            } else {
                showLoader("gridstackdiv");
                if (report_type!='')
                    elastic_search(report_type);
            }
        } else //if (activeGridStackId === 'OMSgridstackdiv') 
        {
            const child_count = document.getElementById(activeGridStackId).getElementsByClassName('stack-item');
            Array.from(child_count).forEach((child) => {
                const iframe_elem_url = child.getElementsByClassName('iframe-elem')[0].src;
                const updatedUrl = updateUrlTimings(iframe_elem_url, start_time, end_time);
                child.getElementsByClassName('iframe-elem')[0].src = updatedUrl;
            });
        } 
    }
    // Initialize Date Range Picker
    $('#reportrange').daterangepicker(
        {
            startDate: start_time,
            endDate: end_time,
            autoApply: true,
            linkedCalendars: false,
            timePicker: true,
            ranges: {
                'Last hour': [moment().subtract(1, 'hour'), moment()],
                'Today': [moment().startOf('day'), moment()],
                'Yesterday': [moment().startOf('day').subtract(1, 'days'), moment().startOf('day')],
                'Last 7 Days': [moment().startOf('day').subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().startOf('day').subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment()],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            locale: {
                format: 'D MMMM, YYYY hh:mm A'
            }
        },
        cb
    );
    // Trigger the callback to set the default value
    cb(start_time, end_time);

    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
        const label = ev.target.textContent.trim();
        if (!Object.keys(picker.ranges).includes(label)) {
            cb(picker.startDate, picker.endDate, 'Custom Range');
        } else {
            cb(picker.startDate, picker.endDate, label);
        }
    });
    // 🔥 Main tab handler - OUTSIDE getPrefixurl
    $('#nav-tab a').on('click', function (e) {
        e.preventDefault();

        const activeTab = $(this).attr('id');
        const targetId = $(this).attr('href');
        // 🔥 Remove active from all tabs
        $('#nav-tab a').removeClass('active');
        $(this).addClass('active');
        // 🔥 Hide ALL tab panes first
        $('.tab-content > .tab-pane').removeClass('show active');
        // 🔥 Show only the clicked tab's content
        $(targetId).addClass('show active');
        // Show/Hide date range picker based on tab
        if (activeTab === 'dealer-tab') {
            $('#reportrange').show();
            $('.dropdown-container').show();
        } else if ((activeTab === 'oms-tab') || (activeTab === 'latency-tab')) {
            $('#reportrange').hide();
            $('.dropdown-container').hide();
        }
    });
    // Trigger click on default active tab to initialize UI
    $('#nav-tab a.active').trigger('click');
    //}
    //else {
    //    swal(msg, ' ', 'error')
    //}
});
function updateUrlTimings(url, start, end) {
    // Regex to match 'from' and 'to' query parameters
    const fromRegex = /from=[^&]*/; // Matches 'from=' and everything after it until the next '&'
    const toRegex = /to=[^&]*/;     // Matches 'to=' and everything after it until the next '&'
    start = (new Date(start.toString())).getTime();
    end = (new Date(end.toString())).getTime();
    //console.log('TYPEOF START---> ' + typeof(start))
    //console.log('TYPEOF END---> ' + typeof(end))
    // Replace the 'from' and 'to' parameters in the URL
    const updatedUrl = url
        .replace(fromRegex, `from=${start}`)
        .replace(toRegex, `to=${end}`);
    //console.log('START --->', start);
    //console.log('END --->', end);
    //console.log('UPDATED URL --->', updatedUrl);
    return updatedUrl;
}
function getActiveTabChildIdWithGridStack() {
    // Find the active tab element
    const activeTab = document.querySelector('.tab-pane.active.show');

    if (activeTab) {
        // Find the child element with the class 'grid-stack'
        const gridStackChild = activeTab.querySelector('.grid-stack');

        // Return the 'id' of the child element if found
        if (gridStackChild) {
            return gridStackChild.id;
        } else {
            console.warn('No child with class "grid-stack" found in the active tab.');
            return null;
        }
    } else {
        console.warn('No active tab found.');
        return null;
    }
}
function getSiteName() {
    //   console.log('<----getSiteName---->')
    // requestDataFromServer('/sites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(getaccesstoken);
    requestDataFromServer('/lesites/getallsitenames', { type: 'clicksite', site: params.get("site") }, "GET").done(getPrefixurl);
}
function elastic_search(report) {
    //console.log('INSIDE ELASTIC SEARCH --->' + report)
    $('#esTable').DataTable().destroy();
    $('#esTable').empty();
    $('#esTable').append(`
        <thead>
            <tr>
                <th>Client Id</th>
                <th>UserName</th>
                <th>Brk Id</th>
                <th>Login time</th>
                <th>Login attempt</th>
                <th>Platform</th>
                <th>IP Address</th>
                <th>MAC Address</th>
            </tr>
        </thead>
        <tbody></tbody>
    `);

    current_start_page=0
    if (report == 'login_report') {
        const table = $('#esTable').DataTable({
            serverSide: true, // Enable server-side processing
            processing: true, // Show loading indicator
            pageLength: 50, // Set the number of records per page to 50
            ajax: function (data, callback, settings) {
                //console.log('START--->' + data.start)
                if (!isNaN(data.start) && data.start !== null) {
                    current_start_page = data.start; // Update current_start_page only if data.start is valid
                } else {
                    console.error('Invalid data.start value: ' + data.start);
                    stopLoader("gridstackdiv");
                    return; // If data.start is invalid, prevent the AJAX call
                }

                if (!Number.isInteger(Number(start_time)) || !Number.isInteger(Number(end_time))) {
                    console.error("Invalid start_time or end_time:", start_time, end_time);
                    stopLoader("gridstackdiv");
                    return; // Prevent the AJAX call if invalid
                }

                requestData = {};
                
                //console.log('START--->' + data.start)
                requestData = {
                    start: current_start_page,
                    length: 50, // Match the page length
                    draw: data.draw,
                    columns: data.columns.map(column => ({
                        data: column.data,
                        search: column.search.value // Column-specific filter values
                    })),
                    order: data.order.map(order => ({
                        column: data.columns[order.column].data, // Column to sort
                        dir: order.dir // Sorting direction
                    })),
                    elastic_host: elastic_host,
                    elastic_port: elastic_port,
                    start_time: moment(start_time).toISOString(), // Convert to ISO 8601
                    end_time: moment(end_time).toISOString()
                };

                //console.log('requestDATA--->' + JSON.stringify(requestData))
                
                $.ajax({
                    url: '/analytics/search_elasticsearch', // Update with your endpoint
                    type: 'GET',
                    data: requestData,
                    success: function (response) {
                        //console.log('TABLE RESPONSE--->' + response.results)
                        callback({
                            draw: response.draw,
                            recordsTotal: response.recordsTotal,
                            recordsFiltered: response.recordsFiltered,
                            data: response.results
                        });
                        stopLoader("gridstackdiv");
                    },
                    error: function (xhr, status, error) {
                        swal(error + ' ' + (JSON.parse(xhr.responseText)).results, '', "error");
                        console.error('Error fetching data:', error);
                        stopLoader("esTable_wrapper");
                        stopLoader("gridstackdiv");
                    }
                });
            },
            columns: [
                { data: 'UserId' },
                { data: 'UserName' },
                { data: 'BrokerId' },
                { data: '@timestamp' },
                { data: 'ReqStatus' },
                { data: 'AccessType' },
                { data: 'LastLoginIp' },
                { data: 'LastLoginMac' }
            ],
            dom: 'Bfrtip',
            buttons: [
                {
                    text: 'PDF',
                    action: function () {
                        const filters = {};
                        table.columns().every(function () {
                            const column = this;
                            const colData = column.dataSrc();
                            const filter = column.search();
                            if (filter) {
                                filters[colData] = filter;
                            }
                        });

                        const sorting = table.order().map(order => ({
                            column: table.column(order[0]).dataSrc(),
                            dir: order[1]
                        }));

                        const requestData = {
                            filters: filters,
                            sorting: sorting,
                            elastic_host: elastic_host,
                            elastic_port: elastic_port,
                            start_time: moment(start_time).toISOString(), // Convert to ISO 8601
                            end_time: moment(end_time).toISOString()
                        };
                        //console.log('CSRF TOKEN--->' + csfr_token)
                        $.ajax({
                            url: '/analytics/export_to_pdf', // Endpoint for exporting PDF
                            type: 'POST',
                            headers: {
                                'X-CSRFToken': csfr_token // Add the CSRF token to headers
                            },
                            data: { req: JSON.stringify(requestData), csrfmiddlewaretoken: csfr_token },
                            success: function (response) {
                                const blob = new Blob([response], { type: 'application/pdf' });
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'user_data.pdf';
                                document.body.appendChild(a);
                                a.click();
                                a.remove();
                            },
                            error: function (xhr, status, error) {
                                console.error('Error downloading PDF:', error);
                            }
                        });

                    }
                },
            ],
            initComplete: function () {
                const clonedRow = $('#esTable thead tr')
                    .clone(true)
                    .addClass('filters')
                    .appendTo('#esTable thead');

                clonedRow.find('th').off('click.DT');
                clonedRow.find('th').removeClass('sorting sorting_asc sorting_desc').removeAttr('aria-sort').removeAttr('aria-label');
                $('#esTable thead tr.filters th').each(function (index) {
                    const column = table.column(index);
                    const headerText = $(this).text();
                    if (headerText === '@timestamp') {
                        $(this).html('');
                    } else {
                        $(this).html(`<input type="text" class="form-control filter-input" />`);
                        $('input', this).on('keyup change', function () {
                            column.search(this.value).draw();
                        });
                    }
                });

                const btnsBox = $('.exp-btns');
                const dtButtons = $('.dt-buttons');
                const esTableFilter = $('#esTable_filter');
                btnsBox.append(dtButtons).append(esTableFilter);
            },
            drawCallback: function () {
                const info = $('#esTable_info');
                const pagination = $('#esTable_paginate');
                const footer = $('.footer');
                footer.empty();
                footer.append(info).append(pagination);
                footer.find('.previous, .next').remove();
                footer.find('.paginate_button').on('click', function () {
                    table.page(parseInt($(this).data('dt-idx'), 10)).draw(false);
                });
            }
        });

        $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
            start_time = picker.startDate;
            end_time = picker.endDate;
            table.ajax.reload(null, false);
        });
    }
}
function changePageHeader(title, titles) {
    $("#page-title").text(title);
    $("#page-titles").text(titles);
}

async function drawChart() {
    //console.log('INSIDE DRAWCHART')
    showLoader("gridstackdiv")
    document.getElementById('gridstackdiv').innerHTML = ""
    //$("#gridstackdiv").innerHTML=''
    if (jsonObject == undefined) {
        return;
    }

    var iframecount = jsonObject['graphs'].length;
    //var dashboard = ' ' + selectedsite + ' ' + ' > ' + jsonObject['dashboard']  ;
    var dashboard = ' ' + selectedsite + '  ';
    var dash = ' ' + jsonObject['dashboard'];
    changePageHeader(dashboard, dash)
    //var graphs = jsonObject['graphs'];
    var html = "";
    var has_error = 0
    //var has_errors = 0
    var error_mes = ''
    iframeIntervalValues = [];
    var graphs = changeMetadata(jsonObject)
    var graphsSettings = [];
    if (Object.keys(settingJsonObject).length > 0) {
        settingsObject = JSON.parse(settingJsonObject)
        var graphsSettings = settingsObject['graphs']
    }
    for (i in graphs) {
        IframeData = {};
        IframeData["id"] = "iframe_url_" + i;
        graphs[i].refresh ? IframeData["refreshtime"] = graphs[i].refresh : IframeData["refreshtime"] = 120;
        iframeIntervalValues.push(IframeData)
        //console.log(JSON.stringify(graphs[i].metadata))
        var form_data = JSON.stringify(graphs[i].metadata)
        var iframe_url = ''
        const apiKey = "eyJrIjoiQUxEeks1V1oxVTYzbzNLUkVUV2wwRnh4UUxBOFJYbXUiLCJuIjoidWF0IiwiaWQiOjF9"; // Replace with your Grafana API key
        //console.log('ACCESS KEY GRAPHS--->' + access_key)

        await $.ajax({
            type: "POST",
            url: '/analytics/getpermalink',
            data: { url: analytics_Prefix_URL, accesstoken: access_key, formdata: form_data, urlparams: [], csrfmiddlewaretoken: csfr_token },   /* Passing the text data */
            success: function (response) {
                //console.log(response)
                has_error = 0
                //console.log(response.error + 'type->' + typeof (response.error) + ' -edited string->' + response.error.slice(2, -2).replace(/\\/g, ""))
                if (response.hasOwnProperty('error') || response.status == 400) {
                    has_error++;
                    //has_errors++;
                    error_mes = response.error.slice(2, -2).replace(/\\/g, "")
                    //console.log('error_mes--->' + error_mes);
                    iframe_url = ''
                    msg = response.msg
                    access_key = ''
                    swal({
                        title: 'FAILURE!',
                        text: response['msg'],
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: true
                    })
                    //swal(msg, ' ', 'error')
                } else {
                    //console.log(response['url'])
                    //console.log((response['url'].split('None/'))[1])
                    iframe_url = analytics_Prefix_URL + (response['url'].split('None/'))[1] + "?standalone=true"
                }

                //testfunction(response);
                // var permlink=response['permalink']
            }
        });
        //console.log('IFRAME_URL--->' + iframe_url)
        //getpermalink(JSON.stringify(graphs[i].metadata))
        //iframe_url = (prefix_url+JSON.stringify(graphs[i].metadata) + '&standalone=true');
        var iframe_height = graphsSettings.length ? graphsSettings[i].height : graphs[i].height;
        var iframe_width = graphsSettings.length ? graphsSettings[i].width : graphs[i].width;
        var iframe_x = graphsSettings.length ? graphsSettings[i].x : graphs[i].x;
        var iframe_y = graphsSettings.length ? graphsSettings[i].y : graphs[i].y;
        var id = graphs[i].id;
        html += '<div class="grid-stack-item" gs-x="' + iframe_x + '"gs-y="' + iframe_y + '" gs-w="' + iframe_width + '" gs-h="' + iframe_height + '"id="' + id + '" >';
        html += '<div class="card grid-stack-item-content">';
        html += '<div class="card-header heading">';
        html += '<h6 class="card-title d-inline-block">' + graphs[i].name + '</h6>';
        html += '</div>';
        html += '<div class="card-body iframe-parent" data-count="' + i + '" id="graphdiv_' + i + '">';
        if (has_error) {
            // Create a Swal
            var err_text = "Error in getting Frames \"" + (JSON.parse(error_mes))['message'] + "\" Please check once!."
            var swalHTML = "<script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>" +
                "<script>" +
                "Swal.fire({" +
                "  title: 'ERROR!'," +
                "  text:" + err_text + "," +
                "  icon: 'failure'" +
                "  showCancelButton: false," +
                "  closeOnConfirm: true," +
                "  confirmButtonClass: 'red-bg'," +
                "  confirmButtonText: 'OK'," +
                "});" +
                "</script>";
            html += "<iframe id='iframe_url_" + i + "' src='' frameBorder='0' style='width:100%;background-color:#ffffff' allow='websocket' ><div class='row col-12' style='text-align:center'><div class='col-2'></div><div class='col-8 ' id='print-error'><h3 style='background-color:#a33219;color:white;border-radius:3px;font-size:14px;width:100%'>" + error_mes + "</h3></div><div class='col-2'></div></div>" + swalHTML + "</div></iframe>"
        } else {
            html += "<iframe id='iframe_url_" + i + "' src='" + iframe_url + "' frameBorder='0' style='width:100%;background-color:#ffffff' allow='websocket'></iframe>"
        }
        //html += "<iframe id='iframe_url_" + i + "' src='" + iframe_url + "' frameBorder='0' style='width:100%;background-color:#ffffff'></iframe>"
        // html += "<iframe id='iframe_url_" + i + "' src='" + iframe_url + "' frameBorder='0' style='height:100%; width:100%;background-color:#ffffff'></iframe>"
        html += '</div>';
        html += '</div>';
        html += '</div>';
    };
    /*if (has_errors) {
        swal({
            title: 'ERROR',
            text: "Error in getting Frames \"" + (JSON.parse(error_mes))['message'] + "\" Please check once!.",
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "red-bg",
            confirmButtonText: "OK",
            closeOnConfirm: true,
        })
    }*/
    $("#gridstackdiv").append(html);
    stopLoader("gridstackdiv")
    //resizeIframe();
    setIframeinterval()
    grid = GridStack.init(
        {
            alwaysShowResizeHandle: true
        });
    resizeIframe();
}
function resizeIframe() {
    var frame_dict = {}
    $('.iframe-parent').each(function (e) {
        var count = $(this).data("count");
        //  console.log('<---RESIZE--->')
        frame_dict['iframe_element' + count] = $(this)
        /* console.log('$(this).height()--->' + (parseInt($(this).height()) - 20).toString())
         console.log('$(this).width()--->' + $(this).width())*/
        var iframe_height = (parseInt($(this).height()) - 20).toString();
        // var iframe_height = $(this).height() + 250;
        // var iframe_width = $(this).width() + 600;
        var iframe_width = $(this).width();
        var gridelem = document.getElementById(count)
        // console.log('countELEM--->' + document.getElementById(count)+' count--->' + count)
        grid.on('resizestop', function (event, gridelem) {
            var count_num = gridelem.id;
            //    console.log('gridelem.id--->' + gridelem.id+' count--->' + count)
            let width = parseInt(gridelem.getAttribute('gs-w')) || 0;
            let height = parseInt(gridelem.getAttribute('gs-h')) || 0;
            //   console.log('GRID WIDTH--->' + width + ', GRID HEIGHT--->' + height)
            var new_frame_height = parseInt((($("#" + count_num).css("height"))).split('px')[0]) - 100
            var new_frame_width = parseInt((($("#" + count_num).css("width"))).split('px')[0]) - 100
            //new_frame_height = (new_frame_height).toString() + 'px'
            // new_frame_width = (new_frame_width).toString() + 'px'
            //    console.log('JQUERY--->GRID HEIGHT--->' + $("#" + gridelem.id).css("height") + ', GRID WIDTH--->' + $("#" + gridelem.id).css("width"))
            // or all values...
            var iframe_elements = frame_dict['iframe_element' + count]
            /* console.log('$(this).height()--->' + iframe_elements.height())
             console.log('$(this).width()--->' + iframe_elements.width())
             $("#iframe_url_" + count).attr("height", iframe_elements.height());
             $("#iframe_url_" + count).attr("width", iframe_elements.width);*/
            /* console.log('GRID WIDTH--->'+width)
             let GridStackNode = gridelem.gridstackNode; // {x, y, width, height, id, ....}
             console.log('GridStackNode--->' + (GridStackNode.width))
             console.log('el.width--->' + (gridelem.width))
             console.log('GridStackNode--->' + (GridStackNode.width))*/
            /*  console.log('new_frame_height--->' + new_frame_height)
              console.log('new_frame_width--->' + new_frame_width)
              console.log('$("#iframe_url_'+count_num+'").height()--->' + $("#iframe_url_" + count_num).height())
              console.log('$("#iframe_url_' + count_num + '").width()--->' + $("#iframe_url_" + count_num).width())*/

            $("#iframe_url_" + count_num).attr("height", new_frame_height);
            $("#iframe_url_" + count_num).attr("width", new_frame_width)
        });
        /* grid.on('resizestop', function (event, el) {
             let width = parseInt(el.getAttribute('gs-w')) || 0;
             // or all values...
             let GridStackNode = el.gridstackNode; // {x, y, width, height, id, ....}
             console.log('GridStackNode--->' + JSON.stringify(GridStackNode))
         });*/
        ///////////////////////////////TESTING STARTS/////////////////////////////////////////

        var frame_css = '<style>.superset-legacy-chart-big-number {background: #121212!important;color: #ffffff!important;}</style>';

        /* $("#iframe_url_" + count).on("load", function () {
             console.log('HEAD ELEM Superet-legacy-chart-big-number--->' + JSON.stringify($("#iframe_url_" + count).contents().find(".superset-legacy-chart-big-number")))
             console.log('HEAD ELEM Superet-legacy-chart-big-number--->' + ($("#iframe_url_" + count).contents().find(".superset-legacy-chart-big-number")))
             console.log('HEAD ELEM HTML--->' + document.getElementById("iframe_url_" + count).contentWindow.document.body.innerHTML)
             document.getElementById("iframe_url_" + count).contentWindow.document.body.style.backgroundColor = '#1f1f1f';
             document.getElementById("iframe_url_" + count).contentWindow.document.body.style.color = 'white';
           
         });*/
        ////////////////////////////////TESTING ENDS///////////////////////////////////////////
        $("#iframe_url_" + count).attr("height", iframe_height);
        $("#iframe_url_" + count).attr("width", iframe_width);
    });

}
function setIframeinterval() {
    iframeIntervalValues.forEach(function (value) {
        window.setInterval(function () {
            var iframe = document.getElementById(value.id);
            iframe.src = iframe.src;
        }, value.refreshtime * 1000);
    });
}
function changeMetadata(jsonObject) {
    //console.log('JSONOBJECT----->' + JSON.stringify(jsonObject))
    var graphs = jsonObject["graphs"]
    var table = jsonObject["table"]
    //console.log('TABLE--->' + JSON.stringify(table))
    isSave ? dataSource = table['history'] : dataSource = table['intraday']
    var dateRange = document.getElementsByClassName("value").item(0)
    stime_etime = (dateRange.innerHTML).split('-')
    starttime = moment(stime_etime[0]).format('yyyy-MM-DD') + 'T' + '00:00:00';
    endtime = moment(stime_etime[1]).format('yyyy-MM-DD') + 'T' + '23:59:59';
    var time_range = starttime + " : " + endtime;
    for (i in graphs) {
        isSave ? dataSource = graphs[i].table['history'] : dataSource = graphs[i].table['intraday']

        graphs[i].metadata.datasource = dataSource;
        graphs[i].metadata.time_range = time_range
        //console.log('GRAPHS[i]---->' + JSON.stringify(graphs[i]))
    }
    return graphs;
}

async function saveGrid() {
    if (isEdit) {
        settings = {}
        settings["id"] = jsonObject["uid"]
        newGrapData = []
        $(".grid-stack-item").each(function (e) {
            data = {};
            element = $(this)[0]
            elementId = element.id
            dataset = element.dataset
            // grapvalue = graphs.filter(x => x.id == elementId);
            data["id"] = elementId;
            data["x"] = dataset.gsX;
            data["y"] = dataset.gsY;
            data["height"] = dataset.gsHeight;
            data["width"] = dataset.gsWidth;
            data["refresh"] = iframeIntervalValues.filter(x => x.id == 'iframe_url_' + elementId)[0].refreshtime;
            newGrapData.push(data);
        });
        settings["graphs"] = newGrapData;
        requestDataFromServer('saveSettings', { 'settingsData': JSON.stringify(settings), csrfmiddlewaretoken: csfr_token }, "POST");
    }
    else {

        isSave = true;
        // drawChart()
        graphs = changeMetadata(jsonObject)
        for (i in graphs) {
            var form_data = JSON.stringify(graphs[i].metadata)
            var iframe_url = ''
            await $.ajax({
                type: "POST",
                url: '/analytics/getpermalink',
                data: { url: analytics_Prefix_URL, accesstoken: access_key, formdata: form_data, urlparams: [], csrfmiddlewaretoken: csfr_token },   /* Passing the text data */
                success: function (response) {
                    //console.log(response)
                    //console.log(response['url'])
                    //console.log((response['url'].split('None/'))[1])
                    iframe_url = analytics_Prefix_URL + (response['url'].split('None/'))[1] + "?standalone=true"
                    //testfunction(response);
                    // var permlink=response['permalink']
                }
            });
            //  var iframe_url = prefix_url + JSON.stringify(graphs[i].metadata) + '&standalone=true'
            iframe = document.getElementById("iframe_url_" + i)
            iframe.setAttribute("src", iframe_url)
            iframe.src = iframe.src;
        }
    }
}
function onEdit() {
    isEdit = true;
}
function onRefresh() {
    location.reload();
}

async function getPrefixurl(response) {
    res = JSON.parse(response);
    let prefixSiteName = res.data[0].sitename;
    let prefixSiteId = res.data[0].id;
    //console.log("SiteName from Prefix API:", prefixSiteName);
    //console.log("SiteId from Prefix API:", prefixSiteId);
    analytics_Prefix_URL = res.data[0].analytics_Prefix_URL;
    var svc_token = res.data[0].grafana_api;
    elastic_host = res.data[0].elastic_host;
    elastic_port = res.data[0].elastic_port;
    requestDataFromServer('/useronboard/getsubsitedata', { mode: "site", siteId: prefixSiteId, csrfmiddlewaretoken: csfr_token }, "POST").done(function (subsiteRes) {
        if (subsiteRes.status !== 200 || !subsiteRes.data || Object.keys(subsiteRes.data).length === 0) {
            //console.log("No subsite data - showing OMS");
            loadDashboard('oms');
            return;
        }
        let data = subsiteRes.data;
        let allSubsites = [];
        Object.keys(data).forEach(function (siteName) {
            data[siteName].forEach(function (subSite) {
                allSubsites.push(subSite);
            });
        });
        //console.log("Subsites found:", allSubsites);
        createSubsiteTabs(allSubsites);
    });
    function createSubsiteTabs(subsites) {
        let tabList = $('#analyticsTabs');
        let tabContent = $('#analyticsTabContent');
        tabList.empty();
        tabContent.empty();
        subsites.forEach(function (subsite, index) {
            let isActive = index === 0 ? 'active' : '';
            let isShow = index === 0 ? 'show active' : '';
            let subsiteUpper = subsite.toUpperCase();
            let subsiteId = subsite.toLowerCase().replace(/\s+/g, '-');
            // 🔥 Using <a> tag instead of <button> - more reliable
            tabList.append(`
                <li class="nav-item" role="presentation">
                    <a class="nav-link ${isActive}" 
                       id="${subsiteId}-tab" 
                       data-bs-toggle="tab"
                       data-toggle="tab"
                       href="#${subsiteId}" 
                       role="tab" 
                       aria-controls="${subsiteId}" 
                       aria-selected="${index === 0}">
                        ${subsiteUpper}
                    </a>
                </li>
            `);

            tabContent.append(`
                <div class="tab-pane fade ${isShow}" 
                     id="${subsiteId}" 
                     role="tabpanel" 
                     aria-labelledby="${subsiteId}-tab">
                    <div class="snackbar" id="snackbar-${subsiteId}"></div>
                    <div class="grid-stack" data-gs-animate="yes" id="${subsiteUpper}gridstackdiv">
                        <div class="loader" id="loader-${subsiteId}" style="display:none">
                            <img src="../../static/app/images/loading-gif.gif" />
                        </div>
                    </div>
                </div>
            `);
        });
        // 🔥 Load first subsite dashboard
        if (subsites.length > 0) {
            loadDashboard(subsites[0]);
        }
        // 🔥 Tab click handler - works with Bootstrap 4 & 5
        $('#analyticsTabs a.nav-link').off('click').on('click', function (e) {
            e.preventDefault();
            let targetId = $(this).attr('href').replace('#', '');
            //console.log("Tab clicked:", targetId);
            // Remove active from all tabs and panes
            $('#analyticsTabs a.nav-link').removeClass('active');
            $('#analyticsTabContent .tab-pane').removeClass('show active');
            // Add active to clicked tab and target pane
            $(this).addClass('active');
            $('#' + targetId).addClass('show active');
            // Load dashboard if not loaded
            let gridDiv = $('#' + targetId.toUpperCase() + 'gridstackdiv');
            if (gridDiv.find('iframe').length === 0) {
                loadDashboard(targetId);
            }
        });
    }
    function loadDashboard(db_name) {
        //console.log("Loading dashboard for:", db_name);
        $.ajax({
            type: "GET",
            url: '/analytics/getUID',
            data: {
                url: analytics_Prefix_URL,
                dbname: db_name,
                svctoken: svc_token,
                csrfmiddlewaretoken: csfr_token
            },
            success: function (response) {
                if (!response.token_json || !response.token_json[0]) {
                    //console.log("No dashboard found for:", db_name);
                    return;
                }
                var dashboard_uid = response.token_json[0].uid;
                var slug_name = response.db_json.meta.slug;
                const now = end_time;
                const sevenDaysAgo = start_time;
                var iframe_url = analytics_Prefix_URL + 'd/' + dashboard_uid + '/' + slug_name +
                    '?from=' + sevenDaysAgo + '&to=' + now + '&timezone=browser&orgId=1&kiosk=1';
                var gridstack_div_id = db_name.toUpperCase() + "gridstackdiv";
                $("#" + gridstack_div_id).append(`
                    <div class="stack-item">
                        <div class="card grid-stack-item-content">
                            <div class="card-body iframe-parent">
                                <iframe class='iframe-elem' id='${db_name}_iframe' 
                                    src='${iframe_url}' frameBorder='0' 
                                    style='width:100%; height:100%; background-color:#ffffff'></iframe>
                            </div>
                        </div>
                    </div>
                `);
            },
            error: function (xhr, status, error) {
                stopLoader("Dealergridstackdiv");
                stopLoader("gridstackdiv");
                swal(error + ' error occurred while fetching index data!', ' ', "error");
            }
        });
    }
}

/*async function getPrefixurl(response) {
    //getaccesstoken(response)
    //console.log('<-----getPrefixurl response------>' + response)
    res = JSON.parse(response);
    analytics_Prefix_URL = res.data[0].analytics_Prefix_URL;
    var svc_token = res.data[0].grafana_api;
    elastic_host = res.data[0].elastic_host;
    elastic_port = res.data[0].elastic_port;
    //console.log('analytics_prefix_url---->' + analytics_Prefix_URL)
    //analytics_Prefix_URL = 'http://172.20.1.80:3000';
    var db_names = ['oms']
    //var db_names = ['oms','Latency','MessageQueue']
    //var svc_token ='glsa_YAtpakaiyN9QmwjiVUpv2O6vUs2rj6mk_7d52897f'
    //console.log('ANALYTICS URL --->' + analytics_Prefix_URL )
    //console.log('svc_token  --->' + svc_token )
    db_names.forEach(async function (db_name) {
        await $.ajax({
            type: "GET",
            url: '/analytics/getUID',
             // Passing the text data 
            data: { url: analytics_Prefix_URL, dbname: db_name, svctoken: svc_token, csrfmiddlewaretoken: csfr_token },  
            success: function (response) {
                //console.log('RESPONSE--->' + JSON.stringify(response))
                var dashboard_uid = response.token_json[0].uid
                var slug_name = response.db_json.meta.slug
                const now = end_time
                const sevenDaysAgo = start_time
                var iframe_url = analytics_Prefix_URL + 'd/' + dashboard_uid + '/' + slug_name + '?from=' + sevenDaysAgo + '&to=' + now + '&timezone=browser&orgId=1&kiosk=1'
                //var iframe_url = analytics_Prefix_URL + 'd-solo/' + dashboard_uid + '/' + slug_name + '?kiosk=1&from=' + sevenDaysAgo + '&to=' + now + '&refresh=5s&timezone=browser&orgId=1&panelId=' + id + '&__feature.dashboardSceneSolo'
                //console.log('IFRAMEURL --> ' + iframe_url)
                var gridstack_div_id = db_name.toUpperCase() + "gridstackdiv";
                //console.log('gridstack_div_id--->' + gridstack_div_id)
                // Append the iframe dynamically inside the correct gridstackdiv
                $("#" + gridstack_div_id).append(`
				    <div class="stack-item">
					    <div class="card grid-stack-item-content">
						    <div class="card-body iframe-parent">
							    <iframe class='ifram e-elem' id='${db_name}_iframe' 
								    src='${iframe_url}' frameBorder='0' 
								    style='width:100%; height:100%; background-color:#ffffff'></iframe>
						    </div>
					    </div>
				    </div>
			    `);

            },
            error: function (xhr, status, error) {
                stopLoader("Dealergridstackdiv")
                stopLoader("gridstackdiv")
                swal(error + ' error occurred while fetching index data!', ' ', "error");
            }
        });
    })
    //requestDataFromServer('/analytics/getprefixurlData', { url: analytics_Prefix_URL }, "GET").done(getPrefixurlResponse);
}*/

/*function getaccesstoken(response) {
   // getPrefixurl(response)
    //console.log('<-----getACCESSTOKEN response------>' + response)
    res = JSON.parse(response);
    analytics_Prefix_URL = res.data[0].analytics_Prefix_URL;

    //return new Promise((resolve) => { }
    requestDataFromServer('/analytics/getaccesstoken', { url: analytics_Prefix_URL, csrfmiddlewaretoken: csfr_token }, "POST").done(testfunction);
}*/

function testfunction(response) {
    //console.log('ACCESS TOKEN JSON--->' + (response))
    //console.log('ACCESS TOKEN JSON--->' + JSON.stringify(response))
    var resp_json = (response)
    //  var resp_json = JSON.parse(response)
    if (response.status != 400) {

        var urlkey = resp_json['url']
        access_key = resp_json['token_json']['access_token']
    } else {
        msg = response.msg
        access_key = ''
        swal({
            title: 'FAILURE!',
            text: response['msg'],
            type: "warning",
            confirmButtonClass: "btn-danger",
            closeOnConfirm: true
        })
        //swal(msg, ' ', 'error')
    }
    //console.log('TOKEN JSON--->' + JSON.stringify(resp_json['token_json']))
    //console.log('ACCESS KEY--->' + (access_key))
    // requestDataFromServer('/analytics/getpermalink', { url: urlkey,accesstoken:access_key,formdata: }, "POST").done(getPrefixurlResponse);
}
/*function getpermalink(form_data) {
   // var resp_json = JSON.parse(response)
  //  var urlkey = analytics_Prefix_URL
   // var access_key = resp_json['token_json']['access_token']
    console.log('ACCESS KEY GETPERMALINK--->' + (access_key))
    console.log('getpermalink FORM_DATA--->' + (form_data))
   requestDataFromServer('/analytics/getpermalink', { url: analytics_Prefix_URL, accesstoken: access_key, formdata: form_data, urlparams: [], csrfmiddlewaretoken: csfr_token }, "POST").done(getPrefixurlResponse);
}*/
function getPrefixurlResponse(res) {
    //console.log('<---------INSIDE getPrefixurlResponse res----->' + res)
    response = JSON.parse(res)
    if (Object.keys(res).length > 0) {

        //     console.log('<-------INSIDE FIRST IF response--->'+response)
        if (response.analysticsDashboardurl && response.user) {
            //         console.log('<------INSIDE SECOND IF------>')
            prefix_url = new URL("superset/explore/?username=" + (response.user).toString() + "&form_data=", (response.analysticsDashboardurl).toString());
            //console.log('<-------PREFIX URL----->' + prefix_url)
        }
    }
    //console.log('BEFORE DRAWCHART CALl')
    drawChart();
    /* var grid = GridStack.init(
         {
             alwaysShowResizeHandle: true
         });*/

}
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('show');
}
function openService(serviceName) {
    alert(`${serviceName} selected.`);
}

document.addEventListener('click', function (event) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownButton = document.querySelector('.dropdown-button');
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});
