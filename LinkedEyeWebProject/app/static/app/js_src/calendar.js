var dataResponse;
var currentView = 'daily';
var currentDate = new Date();
var eventsMap = {}; // Maps date string (YYYY-MM-DD) to array of events

$(document).ready(function () {
    // Set default view to Daily View on initial load
    switchView('daily');
    getCalendarData();
});

function switchView(view) {
    currentView = view;
    $('.view-btn').removeClass('active');
    $('#btn-' + view + '-view').addClass('active');

    if (view === 'list') {
        $('#daily-view-content').hide();
        $('#calendar-content').fadeIn();
    } else {
        $('#calendar-content').hide();
        $('#daily-view-content').fadeIn();
        renderCalendar(); // Re-render to ensure size is correct
    }
}

function getCalendarData() {
    $("#calendar-content").hide();
    $("#calendar-nodata").hide();
    $("#calendar-skeleton").show();

    requestDataFromServer('/calendar/getCalendarData', {}, "GET")
        .done(handleCalendarResponse)
        .fail(function () {
            $("#calendar-skeleton").hide();
            $("#calendar-nodata").fadeIn();
            $("#nodatamessage").text("Failed to load calendar data.");
        });
}

function handleCalendarResponse(response) {
    setTimeout(function () {
        $("#calendar-skeleton").fadeOut(300, function () {
            processCalendarData(response);
        });
    }, 800);
}

function processCalendarData(response) {
    if (!response || response.status !== 200 || !response.responseData || response.responseData.length === 0) {
        $("#calendar-nodata").fadeIn();
        return;
    }

    // Show content based on the currently selected view
    if (currentView === 'list') {
        $("#calendar-content").fadeIn();
        $("#daily-view-content").hide();
    } else {
        $("#daily-view-content").fadeIn();
        $("#calendar-content").hide();
    }
    $("#holiday-data").empty();
    $("#mock-data").empty();
    eventsMap = {}; // Clear events

    response.responseData.forEach(function (obj) {
        // Render List View
       // console.log("calender---->" + JSON.stringify(obj))
        if (obj.key === "Holiday") {
            renderSection(obj, "#holiday-data");
        } else if (obj.key === "Mock") {
            renderSection(obj, "#mock-data");
        }

        // Map data to events for Daily View
        mapToEvent(obj);
    });

    // Add Indian Public Holidays (not stock exchange holidays)
    addPublicHolidays();

    // Refresh calendar to show indicators
    renderCalendar();
}

// ------ List View Rendering (Existing) ------
function renderSection(objData, containerId) {
    const keyData = objData.key_data;
    const executedOn = keyData.executedOn || '';

    // Extract event highlights from data (e.g., Holiday names and dates)
    let eventHighlights = extractEventHighlights(keyData);

    const html = `
        <div class="execution-item">
            <div class="execution-header" onclick="toggleDetails('${objData.key}')">
                <h5 class="execution-title">
                    <i class="mdi mdi-buffer"></i> ${objData.key} Data
                </h5>
                <div class="d-flex align-items-center">
                    <span class="execution-date mr-3">
                        ${executedOn ? '<i class="mdi mdi-clock-outline"></i> ' + executedOn : ''}
                    </span>
                    <i class="mdi mdi-chevron-down execution-toggle-icon" id="icon-${objData.key}"></i>
                </div>
            </div>
            ${eventHighlights ? `<div class="event-highlights">${eventHighlights}</div>` : ''}
            <div class="execution-body collapse show" id="details-${objData.key}">
                <div class="glass-table-wrapper">
                     ${renderGlassTable(keyData)}
                </div>
            </div>
        </div>
    `;
    $(containerId).append(html);
}

function extractEventHighlights(keyData) {
    // Extract event names and dates from the data
    // For Holiday data, look for DATE and holiday name columns
    const data = keyData.data;
    const type = keyData.type;

    if (!data) return '';

    let highlights = [];

    if (type === 'matrix') {
        // Matrix format: { "26-Jan-26": { "NSE": "Republic Day", ... } }
        Object.keys(data).forEach(dateKey => {
            const rowData = data[dateKey];
            // Get first non-empty value as the event name
            const eventName = Object.values(rowData).find(v => v && v !== '-');
            if (eventName) {
                // Check if all values are the same (indicating a holiday)
                const uniqueValues = new Set(Object.values(rowData).filter(v => v && v !== '-'));
                if (uniqueValues.size === 1) {
                    highlights.push(`<span class="event-badge badge-holiday"><i class="mdi mdi-calendar-star"></i> ${dateKey}: ${eventName}</span>`);
                }
            }
        });
    } else if (Array.isArray(data)) {
        // Array format: look for DATE column
        data.forEach(item => {
            if (item.DATE && item.NSE) {
                highlights.push(`<span class="event-badge badge-holiday"><i class="mdi mdi-calendar-star"></i> ${item.DATE}: ${item.NSE}</span>`);
            }
        });
    }

    return highlights.length > 0 ? highlights.join('') : '';
}

function toggleDetails(key) {
    $(`#details-${key}`).collapse('toggle');
    $(`#icon-${key}`).toggleClass('rotate-180');
}

function renderGlassTable(keyData) {
    const data = keyData.data;
    const type = keyData.type;

    if (!data || data.length === 0) {
        return '<p class="text-center p-3 text-secondary">No records found.</p>';
    }

    let headers = [];
    let rows = '';

    if (type === 'matrix') {
        const firstRowKey = Object.keys(data)[0];
        const firstRowData = data[firstRowKey];
        // Get all column keys except 'date' (which we'll use as the DATE column)
        const visibleColumns = Object.keys(firstRowData).filter(k => k.toLowerCase() !== 'date');

        headers.push('#'); // Row number
        headers.push('DATE'); // Date column (from 'date' field in row data)
        visibleColumns.forEach(k => headers.push(k));

        let rowNum = 1;
        Object.keys(data).forEach(rowKey => {
            const rowData = data[rowKey];
            const dateValue = rowData.date || rowData.DATE || rowKey; // Get date from row data

            let rowCells = `<td class="text-center">${rowNum}</td>`; // Row number
            rowCells += `<td class="font-weight-bold text-white">${dateValue}</td>`; // Date from data
            visibleColumns.forEach(colKey => {
                rowCells += `<td>${rowData[colKey]}</td>`;
            });
            rows += `<tr>${rowCells}</tr>`;
            rowNum++;
        });

    } else {
        if (Array.isArray(data) && data.length > 0) {
            Object.keys(data[0]).forEach(k => {
                if (k !== 'isSuccess') headers.push(k);
            });

            data.forEach(item => {
                let rowCells = '';
                headers.forEach(h => {
                    let val = item[h];
                    if (typeof val === 'object') val = JSON.stringify(val);
                    rowCells += `<td>${val}</td>`;
                });
                rows += `<tr>${rowCells}</tr>`;
            });
        }
    }

    const theadInfo = headers.map(h => `<th>${h}</th>`).join('');
    return `<table class="glass-table"><thead><tr>${theadInfo}</tr></thead><tbody>${rows}</tbody></table>`;
}

// ------ Daily View Logic (New) ------

// Add Indian Public Holidays (2026)
function addPublicHolidays() {
    const publicHolidays = [
        { date: "14-Jan-26", name: "Makar Sankranti / Pongal" },
        { date: "15-Jan-26", name: "Pongal (Day 2)" },
        { date: "19-Apr-26", name: "Rama Navami" },
        { date: "10-May-26", name: "Buddha Purnima" },
        { date: "15-Aug-26", name: "Independence Day" },
        { date: "16-Aug-26", name: "Janmashtami" },
        { date: "05-Sep-26", name: "Ganesh Chaturthi" },
        { date: "19-Oct-26", name: "Dussehra" },
        { date: "08-Nov-26", name: "Diwali" },
        { date: "09-Nov-26", name: "Govardhan Puja" }
    ];

    publicHolidays.forEach(holiday => {
        const dateStr = parseDateString(holiday.date);
        if (!dateStr) return;

        if (!eventsMap[dateStr]) {
            eventsMap[dateStr] = [];
        }

        eventsMap[dateStr].push({
            title: holiday.name,
            time: holiday.date,
            type: 'public-holiday',
            details: { key: "Public Holiday", name: holiday.name }
        });
    });
}

function mapToEvent(objData) {
    const keyData = objData.key_data;
    const data = keyData ? keyData.data : null;
    const type = keyData ? keyData.type : null;

    if (!data) return;

    // Determine event type
    let eventType = 'mock';
    if (objData.key && objData.key.toLowerCase().includes('holiday')) {
        eventType = 'holiday';
    }

    // Handle matrix format: { "1": { "date": "26-Jan-26", "NSE": "Republic Day", ... } }
    if (type === 'matrix') {
        Object.keys(data).forEach(rowKey => {
            const rowData = data[rowKey];
            const dateKey = rowData.date || rowData.DATE; // Get date from row data

            if (!dateKey) return;

            // Parse the date
            const dateStr = parseDateString(dateKey);
            if (!dateStr) return;

            // Get event name (first non-empty, non-dash value, excluding 'date' field)
            const eventName = Object.entries(rowData)
                .filter(([k, v]) => k.toLowerCase() !== 'date' && v && v !== '-')
                .map(([k, v]) => v)[0];

            if (!eventsMap[dateStr]) {
                eventsMap[dateStr] = [];
            }

            eventsMap[dateStr].push({
                title: eventName || (objData.key + " Data"),
                time: dateKey,
                type: eventType,
                details: objData
            });
        });
    }
    // Handle array format: [ { "DATE": "26-Jan-26", "NSE": "Republic Day", ... } ]
    else if (Array.isArray(data)) {
        data.forEach(item => {
            const dateKey = item.DATE || item.date;
            if (!dateKey) return;

            const dateStr = parseDateString(dateKey);
            if (!dateStr) return;

            const eventName = item.NSE || item.name || item.event;

            if (!eventsMap[dateStr]) {
                eventsMap[dateStr] = [];
            }

            eventsMap[dateStr].push({
                title: eventName || (objData.key + " Data"),
                time: dateKey,
                type: eventType,
                details: objData
            });
        });
    }
}

function parseDateString(dateStr) {
    // Attempt DD-MMM-YY (e.g., 26-Jan-26, 03-Jan-26)
    const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
    const parts = dateStr.split(/[ -]/);

    if (parts.length >= 3) {
        let day = parseInt(parts[0]);
        let monthStr = parts[1].toLowerCase();
        let yearStr = parts[2];

        if (months.hasOwnProperty(monthStr)) {
            let month = months[monthStr];
            let year = parseInt(yearStr);
            if (year < 100) year += 2000; // Assume 20xx

            // Construct YYYY-MM-DD (use UTC to avoid timezone issues)
            return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
    }

    // Fallback: try standard parse but avoid timezone issues
    // Only use if the format doesn't match DD-MMM-YY
    return null;
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    $("#currentMonthYear").text(`${monthNames[month]} ${year}`);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayIndex = firstDay.getDay(); // 0 is Sunday
    const totalDays = lastDay.getDate();

    const grid = $("#calendarGrid");
    grid.empty();

    // Empty cells for days before the 1st
    for (let i = 0; i < startDayIndex; i++) {
        grid.append('<div class="calendar-day empty"></div>');
    }

    // Days
    for (let day = 1; day <= totalDays; day++) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const events = eventsMap[dateString];

        let extraClass = '';
        let hasEvent = '';

        if (events && events.length > 0) {
            hasEvent = 'has-event';
            // Determine dominant type (Holiday takes precedence, then public-holiday, then mock)
            if (events.some(e => e.type === 'holiday')) {
                extraClass = 'event-holiday';
            } else if (events.some(e => e.type === 'public-holiday')) {
                extraClass = 'event-public-holiday';
            } else {
                extraClass = 'event-mock';
            }
        }

        //const isActive = isSameDate(new Date(), year, month, day) ? 'active' : '';
        const isToday = isSameDate(new Date(), year, month, day) ? 'today' : '';

        const dayHtml = `
            <div class="calendar-day ${hasEvent} ${extraClass} ${isToday}" onclick="selectDate('${dateString}', this)">
                <span class="day-number">${day}</span>
                <!-- Removed dot indicator, background style logic used instead -->
            </div>
        `;
        grid.append(dayHtml);
    }
}

function changeMonth(step) {
    currentDate.setMonth(currentDate.getMonth() + step);
    renderCalendar();
}

function clickToday() {
    currentDate = new Date();
    renderCalendar();
    // Also select today logic...
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    selectDate(dateString, null);
}

function selectDate(dateStr, element) {
    if (element) {
        $(".calendar-day").removeClass("active");
        $(element).addClass("active");
    }

    const dateObj = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // Handle invalid date on details panel
    if (isNaN(dateObj.getTime())) {
        $("#selectedDateDate").text("Selected Date");
    } else {
        $("#selectedDateDate").text(dateObj.toLocaleDateString('en-US', options));
    }

    const events = eventsMap[dateStr];
    const eventsContainer = $("#selectedDateEvents");
    eventsContainer.empty();

    if (events && events.length > 0) {
        events.forEach(evt => {
            let badgeClass = 'badge-success';
            let badgeText = 'Verified';

            if (evt.type === 'holiday') {
                badgeClass = 'badge-danger';
                badgeText = 'Stock Exchange Holiday';
            } else if (evt.type === 'public-holiday') {
                badgeClass = 'badge-success';
                badgeText = 'Public Holiday';
            } else {
                badgeClass = 'badge-primary';
                badgeText = 'Mock Execution';
            }

            const html = `
                <div class="calendar-event-item">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="badge ${badgeClass}">${badgeText}</span>
                        <small class="text-secondary"><i class="mdi mdi-clock-outline"></i> ${evt.time}</small>
                    </div>
                    <h6 class="text-white mb-0">${evt.title}</h6>
                </div>
            `;
            eventsContainer.append(html);
        });
    } else {
        eventsContainer.append('<p class="text-secondary small">No activity recorded for this date.</p>');
    }
}

function isSameDate(date, year, month, day) {
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}
