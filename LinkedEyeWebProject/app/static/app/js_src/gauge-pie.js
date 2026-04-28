/*let AnyChartPie = function (name, dataset, containername, is_draw = false) {

    
    anychart.onDocumentReady(function () {

        document.getElementById(containername).innerHTML = "";

        var data = [];
        Object.entries(dataset).forEach(function (v) {
            data.push(v)
        });


        // create pie chart with passed data
        var chart = anychart.pie3d(data);
      //  chart.contextMenu(false);

        var palette = anychart.palettes
            .distinctColors()
            .items([
                '#d72631'
            ]);

        // set chart title text settings
        chart.title(name)

        chart.fill(palette.items[0]);

        // set chart radius
        chart.radius('70%')
        // create empty area in pie chart
        chart.innerRadius('30%');

        // set container id for the chart
        chart.container(containername);
        // initiate chart drawing
        chart.draw();

    });

}

*/
//google.charts.load('current', {
    //callback: function () {


function drawpiechart(data, pietitle, containername) {

       // console.log(data)
       // console.log(pietitle)

    var pieoption = {
        title: pietitle,
        titleTextStyle: {
            color: '#ffffff',
        },

        width: '100%',
        height: '100%',


        is3D: true,

        chartArea: {
            'backgroundColor': '#1f1f1f', left: "3%",
            top: "3%",
            height: "94%",
            width: "94%"
        },
        slices: {
            //0: { offset: 0.2 },

        },
       
        pieStartAngle: 20,
        backgroundColor: { fill: '#1f1f1f', stroke: '#' }, legend: { textStyle: { color: '#fff' }}, sliceVisibilityThreshold: 1 / 10000,
        colors: ['#d72631',//red
                '#099631',//green
                '#e99123',//amber
               // '#5c3c92',//purple
                '#ffffff',
                //'#077b8a',
        ],

    };
    var data = new google.visualization.arrayToDataTable(data);
    document.getElementById(containername).innerHTML = "";
    var container = document.getElementById(containername);
    var chart = new google.visualization.PieChart(container);

    chart.draw(data,pieoption);
    
};
//packages: ['corechart']

//});






let overviewgauges = function (name, keysdata, data, containername) {

   
    var dataSet = anychart.data.set(data);
    var palette = anychart.palettes
        .distinctColors()
        .items([
            '#d72631',
            '#099631',
            '#5c3c92',
            '#ffffff',
            '#077b8a',
            '#96a6a6',
            '#dd2c00',
            '#00838f',
            '#00bfa5',
            '#ffa000'
        ]);

    var makeBarWithBar = function (gauge, radius, i, width) {
        var stroke = null;
        gauge
            .label(i)
            .text('<span style="color:White">' + keysdata[i] + ', ' + data[i] + '</span>') // color: #7c868e
            .useHtml(true);
        gauge
            .label(i)
            .hAlign('center')
            .vAlign('middle')
            .anchor('right-center')
            .padding(0, 10)
            .height(width / 2 + '%')
            .offsetY(radius + '%')
            .offsetX(0);

        gauge
            .bar(i)
            .dataIndex(i)
            .radius(radius)
            .width(width)
            .fill(palette.itemAt(i))
            .stroke(null)
            .zIndex(5);
        gauge
            .bar(i + 100)
            .dataIndex(5)
            .radius(radius)
            .width(width)
            .fill('none')
            .stroke(stroke)
            .zIndex(4);

        return gauge.bar(i);
    };

    anychart.onDocumentReady(function () {
        document.getElementById(containername).innerHTML = "";

        var gauge = anychart.gauges.circular();
        gauge.data(dataSet);
        gauge
            .fill('#none')
            .stroke(null)
            .padding(0)
            .margin(100)
            .startAngle(0)
            .sweepAngle(270);

        var axis = gauge.axis().radius(100).width(1).fill(null);
        axis
            .scale()
            .minimum(0)
            .maximum(100)
            .ticks({ interval: 1 })
            .minorTicks({ interval: 1 });
        axis.labels().enabled(false);
        axis.ticks().enabled(false);
        axis.minorTicks().enabled(false);
        makeBarWithBar(gauge, 120, 0, 17);
        makeBarWithBar(gauge, 100, 1, 17);
        makeBarWithBar(gauge, 80, 2, 17);
        makeBarWithBar(gauge, 60, 3, 17);
        makeBarWithBar(gauge, 40, 4, 17);
        makeBarWithBar(gauge, 20, 5, 17);

        gauge.margin(15);
        gauge
            .title()
            .text(
                '<span style="color:Ghostwhite">' + name + '</span>'
            )
            .useHtml(true);
        gauge
            .title()
            .enabled(true)
            .hAlign('center')
            .padding(0)
            .margin([0, 0, 20, 0]);

        gauge.container(containername);
        gauge.tooltip().title("Tickets");
        gauge.
            fill('none');
        gauge.draw();
    });
};



//let bubblechart = function () {


   // google.charts.load('current', { 'packages': ['corechart'] });
    //google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart(data1, title) {
        // Clear previous canvas if it existed from Chart.js attempt
        $("#incident_status_chart").remove();
        if ($("#series_chart_div canvas").length === 0 && $("#series_chart_div").length > 0) {
            // Ensure we have a clean div for Google Charts
        }

        if (data1.length > 1) {
            $("#series_chart_div #loader").hide();
            
            var data = google.visualization.arrayToDataTable(data1);

            var options = {
                title: title,
                color: '#fff',
                titleTextStyle: {
                    color: '#e99123',
                    fontName: 'Montserrat',
                    fontSize: 16,
                    bold: true
                },
                hAxis: {
                    title: 'Date & Time',
                    titleTextStyle: {
                        color: '#ffffff', fontName: 'Montserrat', italic: 0
                    },
                    gridlines: {
                        color: '#333333',
                    },
                    textStyle: {
                        color: '#BEBEBE'
                    },
                    format: 'MMM dd, hh:mm a'
                },
                vAxis: {
                    title: 'Incident Count',
                    titleTextStyle: {
                        color: '#ffffff', fontName: 'Montserrat', italic: 0
                    },
                    gridlines: { color: '#333333' },
                    textStyle: {
                        color: '#BEBEBE'
                    },
                    viewWindow: {
                        min: 0
                    }
                },
                backgroundColor: { fill: 'transparent', stroke: '#' },
                chartArea: { 'backgroundColor': '#121212', width: '85%', height: '70%', left: '8%', top: '15%' },
                bubble: { 
                    textStyle: { color: 'transparent', fontSize: 1 },
                    stroke: '#000',
                    opacity: 0.8
                },
                legend: { 
                    textStyle: { color: '#fff', fontSize: 11, fontName: 'Montserrat' }, 
                    position: 'top',
                    alignment: 'center'
                },
                colors: [
                    '#94a3b8', // Slate (New)
                    '#f97316', // Orange (In Progress)
                    '#eab308', // Yellow (Resolved)
                    '#10b981', // Emerald (Feedback/Escalated)
                    '#8b5cf6', // Violet (Closed)
                    '#ef4444', // Red (Rejected/Critical)
                    '#06b6d4', // Cyan
                    '#ec4899'  // Pink
                ],
                explorer: {
                    actions: ['dragToZoom', 'rightClickToReset'],
                    axis: 'horizontal',
                    keepInBounds: true,
                    maxZoomIn: 4.0
                },
                animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true
                },
                tooltip: {
                    textStyle: { fontName: 'Montserrat', fontSize: 12 },
                    showColorCode: true,
                    isHtml: false
                }
            };

            var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
            chart.draw(data, options);

        } else {
            var html = '';
            html += '<h3 style="background-color:#a33219;color:white;border-radius:10px;font-size:14px;padding:15px;text-align:center;width:100%;">NO INCIDENT DATA AVAILABLE</h3>';
            $("#IncidentsOverview #print-error").empty().append(html);
            $("#series_chart_div #loader").hide();
        }
    }


//};
