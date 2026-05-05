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
    var container = document.getElementById(containername);
    if (!container) {
        console.warn("Pie chart container not found: " + containername);
        return;
    }

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
    container.innerHTML = "";
    var chart = new google.visualization.PieChart(container);

    chart.draw(data,pieoption);
    
};
//packages: ['corechart']

//});

var overviewgauges = function (name, keysdata, data, containername) {
  
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
        $("#incident_modern_chart").remove();
        if ($("#series_chart_div canvas").length === 0 && $("#series_chart_div").length > 0) {
            // Ensure we have a clean div for Google Charts
        }

        if (data1.length > 1) {
            $("#series_chart_div #loader").hide();
            
            var data = google.visualization.arrayToDataTable(data1);

            // Generate ticks for the X-axis to ensure dates don't repeat
            var ticks = [];
            if (data1.length > 1) {
                for (var i = 1; i < data1.length; i++) {
                    ticks.push(data1[i][0]);
                }
            }

            var options = {
                title: title,
                titleTextStyle: {
                    color: '#e99123',
                    fontName: 'Outfit',
                    fontSize: 18,
                    bold: true
                },
                hAxis: {
                    title: 'Timeline (Last 7 Days)',
                    titleTextStyle: { color: '#888', fontName: 'Outfit', italic: 0, fontSize: 12 },
                    gridlines: { color: '#222', count: -1 },
                    minorGridlines: { color: 'transparent' },
                    textStyle: { color: '#aaa', fontSize: 11 },
                    format: 'MMM dd',
                    ticks: ticks // Force one tick per data point (day)
                },
                vAxis: {
                    title: 'Incidents Trend',
                    titleTextStyle: { color: '#888', fontName: 'Outfit', italic: 0, fontSize: 12 },
                    gridlines: { color: '#222' },
                    textStyle: { color: '#aaa', fontSize: 11 },
                    viewWindowMode: 'explicit',
                    viewWindow: {
                        min: 0
                    },
                    baseline: 0,
                    baselineColor: '#444',
                    format: '0' // Integer counts
                },
                backgroundColor: 'transparent',
                chartArea: { width: '85%', height: '70%', left: '8%', top: '15%' },
                legend: { 
                    textStyle: { color: '#eee', fontSize: 12, fontName: 'Outfit' }, 
                    position: 'top',
                    alignment: 'center'
                },
                colors: [
                    '#ff6b6b', // P1
                    '#ff9f43', // P2
                    '#feca57', // P3
                    '#48dbfb'  // P4
                ],
                areaOpacity: 0.12,
                lineWidth: 3,
                pointSize: 7,
                pointShape: 'circle',
                explorer: {
                    actions: ['dragToZoom', 'rightClickToReset'],
                    axis: 'horizontal',
                    keepInBounds: true,
                    maxZoomIn: 8.0
                },
                animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true
                },
                tooltip: {
                    textStyle: { fontName: 'Outfit', fontSize: 13 },
                    showColorCode: true,
                    trigger: 'both',
                    isHtml: false
                },
                curveType: 'function',
                selectionMode: 'multiple',
                aggregationTarget: 'category',
                focusTarget: 'category' // Show all 4 priorities on one hover
            };

            var chart = new google.visualization.AreaChart(document.getElementById('series_chart_div'));
            chart.draw(data, options);

        } else {
            var html = '';
            html += '<h3 style="background-color:#a33219;color:white;border-radius:10px;font-size:14px;padding:15px;text-align:center;width:100%;">NO INCIDENT DATA AVAILABLE</h3>';
            $("#IncidentsOverview #print-error").empty().append(html);
            $("#series_chart_div #loader").hide();
        }
    }

/**
 * Modern Incident Analytics Chart using Chart.js
 * Redesigned for a premium, visually appealing look with gradients and animations.
 */
function drawModernIncidentChart(data, title) {
    const ctx = document.getElementById('incident_modern_chart');
    if (!ctx) return;

    // Clear previous instance if it exists
    if (window.incidentChartInstance) {
        window.incidentChartInstance.destroy();
    }

    // Process data from [Date, P1, P2, P3, P4] format
    // data[0] is header
    const labels = [];
    const p1Data = [];
    const p2Data = [];
    const p3Data = [];
    const p4Data = [];

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        // Format date for label
        let dateLabel = row[0];
        if (dateLabel instanceof Date) {
            dateLabel = dateLabel.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
        labels.push(dateLabel);
        p1Data.push(row[1]);
        p2Data.push(row[2]);
        p3Data.push(row[3]);
        p4Data.push(row[4]);
    }

    const createGradient = (color) => {
        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color.replace('1)', '0.4)'));
        gradient.addColorStop(1, color.replace('1)', '0.0)'));
        return gradient;
    };

    const colors = {
        p1: 'rgba(255, 107, 107, 1)',
        p2: 'rgba(255, 159, 67, 1)',
        p3: 'rgba(254, 202, 87, 1)',
        p4: 'rgba(72, 219, 251, 1)'
    };

    window.incidentChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'P1',
                    data: p1Data,
                    borderColor: colors.p1,
                    backgroundColor: createGradient(colors.p1),
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 3
                },
                {
                    label: 'P2',
                    data: p2Data,
                    borderColor: colors.p2,
                    backgroundColor: createGradient(colors.p2),
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 3
                },
                {
                    label: 'P3',
                    data: p3Data,
                    borderColor: colors.p3,
                    backgroundColor: createGradient(colors.p3),
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 3
                },
                {
                    label: 'P4',
                    data: p4Data,
                    borderColor: colors.p4,
                    backgroundColor: createGradient(colors.p4),
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'center',
                    labels: {
                        color: '#eee',
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Outfit, sans-serif',
                            size: 13
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(20, 20, 20, 0.9)',
                    titleColor: '#e99123',
                    bodyColor: '#fff',
                    borderColor: '#444',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    usePointStyle: true,
                    bodyFont: {
                        family: 'Outfit, sans-serif'
                    },
                    titleFont: {
                        family: 'Outfit, sans-serif',
                        size: 14,
                        weight: 'bold'
                    },
                    callbacks: {
                        label: function(context) {
                            return ` ${context.dataset.label}: ${context.parsed.y} incidents`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#888',
                        font: {
                            family: 'Outfit, sans-serif',
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#888',
                        precision: 0,
                        font: {
                            family: 'Outfit, sans-serif',
                            size: 11
                        }
                    }
                }
            },
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                }
            }
        }
    });
    
    // Hide loader
    $("#series_chart_parent #loader").fadeOut();
}

//};
