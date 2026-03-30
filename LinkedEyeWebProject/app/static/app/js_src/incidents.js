    var siteName = (window.INCIDENTS_PAGE_DATA && window.INCIDENTS_PAGE_DATA.siteName) ? window.INCIDENTS_PAGE_DATA.siteName : '';
    var incidentUrl = '';
    var incidentApi = '';
    var allIncidents = [];
    var filteredIncidents = [];
    var currentPage = 1;
    var currentLimit = 15;
    var totalIncidents = 0;
    var selectedStates = [];
    var selectedAssignees = [];

    // Function to open incident page from sites.html
    function openIncidentPage() {
        window.location.href = '/incidents/?site=' + siteName;
    }

    var currentView = 'table';

    $(document).ready(function() {
        // If this page is rendered inside the right-side modal iframe,
        // remove extra navigation chrome so it fits cleanly.
        const urlParams = new URLSearchParams(window.location.search);
        const modalViewRight = urlParams.get('modal_view_right');
        if (modalViewRight === 'true' || modalViewRight === '1') {
            document.body.classList.add('right-modal-embedded');
        }

        loadIncidents();
        setupSearchListener();
        
        // Clear filters button
        $('#clear-filters-btn').on('click', function() {
            clearFilters();
        });
        
        // Initial view setup
        switchView('table');
    });

    function getSiteConfiguration() {
        $.ajax({
            url: '/lesites/getSiteData',
            method: 'GET',
            data: { sitename: siteName },
            success: function(response) {
                if (response.code === 200 && response.sitePageResponse && response.sitePageResponse.length > 0) {
                    var siteData = response.sitePageResponse[0];
                    incidentUrl = siteData.incident_url || '';
                    incidentApi = siteData.incident_api || '';
                    
                    if (incidentUrl && incidentApi) {
                        loadIncidents();
                    }
                }
            },
            error: function() {
                console.error('Error retrieving site configuration.');
            }
        });
    }

    function loadIncidents() {
        var searchTerm = $('#search-input').val() || '';
        var selectedPriorities = [];
        ['p1', 'p2', 'p3', 'p4'].forEach(function(p) {
            if ($('#' + p + '-filter').prop('checked')) {
                selectedPriorities.push(p.toUpperCase());
            }
        });

        $.ajax({
            url: '/incidents/api/incidents',
            method: 'GET',
            data: {
                page: currentPage,
                limit: currentLimit,
                search: searchTerm,
                priorities: selectedPriorities.join(','),
                states: selectedStates.join(','),
                assignees: selectedAssignees.join(',')
            },
            success: function(response) {
                if (response.status === 200) {
                    allIncidents = response.incidents;
                    filteredIncidents = [...allIncidents];
                    
                    if (response.pagination) {
                        totalIncidents = response.pagination.total;
                        renderPagination(response.pagination);
                    }
                    
                    if (response.stats) {
                        updateIncidentStats(response.stats);
                    }

                    if (response.filter_options) {
                        populateFilterOptions(response.filter_options);
                    }
                    
                    renderCurrentView();
                } else {
                    console.error('Error loading incidents:', response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading incidents:', error);
            }
        });
    }

    function renderPagination(pagination) {
        var total = pagination.total;
        var page = pagination.page;
        var limit = pagination.limit;
        var totalPages = pagination.pages;
        
        // Update range text
        var start = total === 0 ? 0 : (page - 1) * limit + 1;
        var end = Math.min(page * limit, total);
        $('#pagination-range').text(start + '-' + end);
        $('#pagination-total').text(total);
        
        // Render page controls
        var container = $('#pagination-controls');
        container.empty();
        
        // Prev button
        var prevDisabled = page === 1 ? 'disabled' : '';
        container.append(`<a href="javascript:void(0)" class="page-link ${prevDisabled}" onclick="changePage(${page - 1})"><i class="mdi mdi-chevron-left"></i></a>`);
        
        // Page numbers logic (simplified for now: show first, current, last and ellipses)
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                addPageLink(container, i, page);
            }
        } else {
            addPageLink(container, 1, page);
            if (page > 3) container.append('<span class="page-link disabled">...</span>');
            
            let startPage = Math.max(2, page - 1);
            let endPage = Math.min(totalPages - 1, page + 1);
            
            for (let i = startPage; i <= endPage; i++) {
                addPageLink(container, i, page);
            }
            
            if (page < totalPages - 2) container.append('<span class="page-link disabled">...</span>');
            addPageLink(container, totalPages, page);
        }
        
        // Next button
        var nextDisabled = page === totalPages ? 'disabled' : '';
        container.append(`<a href="javascript:void(0)" class="page-link ${nextDisabled}" onclick="changePage(${page + 1})"><i class="mdi mdi-chevron-right"></i></a>`);
    }

    function addPageLink(container, i, current) {
        var activeClass = i === current ? 'active' : '';
        container.append(`<a href="javascript:void(0)" class="page-link ${activeClass}" onclick="changePage(${i})">${i}</a>`);
    }

    window.changePage = function(page) {
        currentPage = page;
        loadIncidents();
    };

    window.changeLimit = function() {
        currentLimit = parseInt($('#per-page-select').val());
        currentPage = 1; // Reset to first page
        loadIncidents();
    };

    function populateFilterOptions(options) {
        // States
        var stateMenu = $('#state-filter-menu');
        if (stateMenu.children().length <= 1) { // Only populate if empty or just has a header
            stateMenu.empty();
            options.states.forEach(function(state) {
                var checked = selectedStates.includes(state) ? 'checked' : '';
                stateMenu.append(`
                    <div class="form-check mb-2">
                        <input type="checkbox" class="form-check-input state-filter-checkbox" id="state-${state}" value="${state}" ${checked} onchange="toggleFilter('state', '${state}')">
                        <label class="form-check-label" for="state-${state}">${state}</label>
                    </div>
                `);
            });
        }

        // Assignees
        var assigneeMenu = $('#assignee-filter-menu');
        if (assigneeMenu.children().length <= 1) {
            assigneeMenu.empty();
            options.assignees.forEach(function(assignee) {
                var checked = selectedAssignees.includes(assignee.id) ? 'checked' : '';
                assigneeMenu.append(`
                    <div class="form-check mb-2">
                        <input type="checkbox" class="form-check-input assignee-filter-checkbox" id="assignee-${assignee.id}" value="${assignee.id}" ${checked} onchange="toggleFilter('assignee', '${assignee.id}')">
                        <label class="form-check-label" for="assignee-${assignee.id}">${assignee.name}</label>
                    </div>
                `);
            });
        }
    }

    window.toggleFilter = function(type, value) {
        if (type === 'state') {
            var index = selectedStates.indexOf(value);
            if (index > -1) selectedStates.splice(index, 1);
            else selectedStates.push(value);
        } else if (type === 'assignee') {
            var index = selectedAssignees.indexOf(value);
            if (index > -1) selectedAssignees.splice(index, 1);
            else selectedAssignees.push(value);
        }
        currentPage = 1;
        loadIncidents();
    };

    function clearFilters() {
        selectedStates = [];
        selectedAssignees = [];
        $('#search-input').val('');
        ['p1', 'p2', 'p3', 'p4'].forEach(p => $('#' + p + '-filter').prop('checked', false).parent().removeClass('active'));
        currentPage = 1;
        loadIncidents();
    }

    function loadSampleData() {
        // Sample data for demonstration
        const now = new Date();
        allIncidents = [
            {
                id: 'INC0002650',
                priority: 'P2',
                title: '[WARNING] LoginWarningEvent-10.173.0.14 on indmoney-uat (10.173.0.14)',
                source: 'Prometheus',
                state: 'New',
                assignee: { initials: 'SK', name: 'Siva Kadirannagari', team: 'Network Team' },
                sla: 'Breached',
                time: '2h ago',
                fullDate: 'Mon, Mar 23, 09:14 AM'
            },
            {
                id: 'INC0002649',
                priority: 'P2',
                title: '[WARNING] LoginWarningEvent-192.168.150.41 on ftc-mum-nlight-ls (192.168.150.41)',
                source: 'Prometheus',
                state: 'New',
                assignee: { initials: 'SK', name: 'Siva Kadirannagari', team: 'Network Team' },
                sla: 'Breached',
                time: '3h ago',
                fullDate: 'Mon, Mar 23, 08:03 AM'
            },
            {
                id: 'INC0002648',
                priority: 'P2',
                title: '[WARNING] CPUWarning-10.10.1.55 on aionion...',
                source: 'Prometheus',
                state: 'In Progress',
                assignee: { initials: 'SK', name: 'Siva K.', team: 'Network Team' },
                sla: 'Breached',
                time: '6h ago',
                fullDate: 'Mon, Mar 23, 05:00 AM'
            },
            { id: 'INC0002647', priority: 'P2', title: '[WARNING] CPUWarning-10.10.1.166 on bullsm...', state: 'Escalated', sla: 'Breached', time: '11h ago', fullDate: 'Mon, Mar 23, 01:00 AM', assignee: { initials: 'SK', name: 'Siva K.', team: 'Network Team' }, source: 'AppManager' },
            { id: 'INC0002646', priority: 'P1', title: '[CRITICAL] NicErrors-10.41.1.32 on 10.41.1.32', state: 'New', sla: 'Warning', time: '17h ago', fullDate: 'Sun, Mar 22, 06:00 PM', assignee: { initials: 'RM', name: 'Rajkumar M.', team: 'Cloud Infra' }, source: 'LogDNA' },
        ];
        
        filteredIncidents = [...allIncidents];
        updateIncidentStats();
        renderCurrentView();
    }

    function updateIncidentStats(stats) {
        if (!stats) return;
        
        $('#active-count').text(stats.active || 0);
        $('#critical-count').text(stats.critical || 0);
        $('#high-count').text(stats.high || 0);
        $('#sla-breach-count').text(stats.sla_breached || 0);
        $('#resolved-count').text(stats.resolved || 0);
    }

    function renderCurrentView() {
        if (currentView === 'table') {
            displayIncidentsTable();
        } else if (currentView === 'board') {
            displayBoardView();
        } else if (currentView === 'timeline') {
            displayTimelineView();
        }
    }

    function displayIncidentsTable() {
        var tbody = $('#incidents-table-body');
        tbody.empty();
        
        filteredIncidents.forEach(function(incident) {
            var row = `
                <tr>
                    <td><input type="checkbox" class="incident-checkbox" data-id="${incident.id}"></td>
                    <td><div class="priority-label ${incident.priority.toLowerCase()}">${incident.priority}</div></td>
                    <td><span class="incident-number">${incident.id}</span></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <a href="#" class="incident-title-link" onclick="viewIncidentDetails('${incident.id}')">${incident.title}</a>
                            <span class="source-badge" style="font-size: 10px; color: #9ca3af; margin-left: 8px;">
                                <i class="mdi mdi-pulse" style="font-size: 12px;"></i> ${incident.source}
                            </span>
                        </div>
                    </td>
                    <td><span class="state-badge">${incident.state}</span></td>
                    <td>
                        <div class="assignee-info">
                            <div class="avatar-circle">${incident.assignee ? incident.assignee.initials : '??'}</div>
                            <div class="assignee-name-wrap">
                                <span class="primary-name">${incident.assignee ? incident.assignee.name : 'Unassigned'}</span>
                                <span class="secondary-name">${incident.assignee && incident.assignee.team ? incident.assignee.team : 'DevOps Team'}</span>
                            </div>
                        </div>
                    </td>
                    <td><span class="sla-status ${incident.sla.toLowerCase()}">${incident.sla}</span></td>
                    <td><span class="time-text" title="${incident.full_time}">${incident.time}</span></td>
                    <td class="text-center">
                        <div class="d-flex justify-content-center gap-2">
                            <i class="mdi mdi-file-document-edit-outline table-action-icon" onclick="editIncident('${incident.id}')"></i>
                            <i class="mdi mdi-eye-outline table-action-icon" onclick="viewIncidentDetails('${incident.id}')"></i>
                        </div>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    function displayBoardView() {
        const states = ['New', 'In Progress', 'On Hold', 'Escalated', 'Resolved'];
        const containerIds = {
            'New': 'cards-new',
            'In Progress': 'cards-in-progress',
            'On Hold': 'cards-on-hold',
            'Escalated': 'cards-escalated',
            'Resolved': 'cards-resolved'
        };
        const countIds = {
            'New': 'count-new',
            'In Progress': 'count-in-progress',
            'On Hold': 'count-on-hold',
            'Escalated': 'count-escalated',
            'Resolved': 'count-resolved'
        };

        // Clear columns
        states.forEach(state => {
            $(`#${containerIds[state]}`).empty();
            $(`#${countIds[state]}`).text('0');
        });

        const counts = { 'New': 0, 'In Progress': 0, 'On Hold': 0, 'Escalated': 0, 'Resolved': 0 };

        filteredIncidents.forEach(incident => {
            const state = incident.state;
            if (containerIds[state]) {
                counts[state]++;
                const card = `
                    <div class="incident-card" onclick="viewIncidentDetails('${incident.id}')">
                        <div class="card-top">
                            <span class="card-id">${incident.id}</span>
                            <span class="card-priority ${incident.priority.toLowerCase()}">${incident.priority}</span>
                        </div>
                        <div class="card-title">${incident.title}</div>
                        <div class="card-bottom">
                            <div class="card-assignee">
                                <div class="card-avatar">${incident.assignee ? incident.assignee.initials : '??'}</div>
                                <div class="assignee-name-wrap" style="display: flex; flex-direction: column;">
                                    <span class="card-name" style="font-weight: 700;">${incident.assignee ? incident.assignee.name : 'Unassigned'}</span>
                                    <span class="card-team" style="font-size: 8px; color: #9ca3af;">${incident.assignee && incident.assignee.team ? incident.assignee.team : 'DevOps Team'}</span>
                                </div>
                            </div>
                            <span class="card-time">${incident.time}</span>
                        </div>
                    </div>
                `;
                $(`#${containerIds[state]}`).append(card);
            }
        });

        // Update counts
        states.forEach(state => {
            $(`#${countIds[state]}`).text(counts[state]);
        });
    }

    function displayTimelineView() {
        var container = $('#timeline-content');
        container.empty();
        
        filteredIncidents.forEach(function(incident, index) {
            var side = index % 2 === 0 ? 'left' : 'right';
            var item = `
                <div class="timeline-item ${side}">
                    <div class="timeline-marker"></div>
                    <div class="timeline-info">
                        <div class="timeline-card" onclick="viewIncidentDetails('${incident.id}')">
                            <div class="card-top">
                                <span class="card-priority ${incident.priority.toLowerCase()}">${incident.priority}</span>
                                <span class="card-id">${incident.id}</span>
                                <span class="card-state">${incident.state}</span>
                            </div>
                            <div class="card-title">${incident.title}</div>
                            <div class="card-assignee">
                                <div class="card-avatar">${incident.assignee ? incident.assignee.initials : '??'}</div>
                                <div class="assignee-name-wrap" style="display: flex; flex-direction: column;">
                                    <span class="card-name" style="font-weight: 700;">${incident.assignee ? incident.assignee.name : 'Unassigned'}</span>
                                    <span class="card-team" style="font-size: 9px; color: #9ca3af;">${incident.assignee && incident.assignee.team ? incident.assignee.team : 'DevOps Team'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-time-display">
                        <span class="time-relative">${incident.time}</span>
                        <span class="time-full">${incident.full_time || ''}</span>
                    </div>
                </div>
            `;
            container.append(item);
        });
    }

    function setupSearchListener() {
        $('#search-input').on('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                filterIncidents();
            }
        });
        
        $('#search-input').on('input', function() {
            // Optional: real-time filtering
            filterIncidents();
        });
    }

    window.togglePriority = function(priority) {
        var checkbox = $('#' + priority.toLowerCase() + '-filter');
        checkbox.prop('checked', !checkbox.prop('checked'));
        
        // Toggle visual active state of the chip
        var chip = checkbox.closest('.priority-chip');
        if (checkbox.prop('checked')) {
            chip.addClass('active');
        } else {
            chip.removeClass('active');
        }
        
        filterIncidents();
    };

    function filterIncidents() {
        currentPage = 1; // Reset to first page when filtering
        loadIncidents();
    }

    function toggleSelectAll() {
        var selectAll = $('#select-all').prop('checked');
        $('.incident-checkbox').prop('checked', selectAll);
    }

    window.switchView = function(view) {
        currentView = view;
        $('.nav-btn').removeClass('active');
        $(`.nav-btn[onclick="switchView('${view}')"]`).addClass('active');
        
        $('#table-view').hide();
        $('#board-view').hide();
        $('#timeline-view').hide();
        
        $(`#${view}-view`).show();
        
        renderCurrentView();
    }

    function viewIncidentDetails(incidentId) {
        var url = '/incidents/' + incidentId + '/?site=' + siteName + '&modal=true&modal_view_right=true';
        if (window.self !== window.top) {
            window.location.href = url;
        } else {
            $('#test-incident').attr('src', url);
            $('#Incident_modal').modal('show');
        }
    }

    function createNewIncident() {
        var url = '/incidents/create/?site=' + siteName + '&modal=true&modal_view_right=true';
        if (window.self !== window.top) {
            window.location.href = url;
        } else {
            $('#test-incident').attr('src', url);
            $('#Incident_modal').modal('show');
        }
    }

    function editIncident(incidentId) {
        var url = '/incidents/' + incidentId + '/?site=' + siteName + '&mode=edit&modal=true&modal_view_right=true';
        if (window.self !== window.top) {
            window.location.href = url;
        } else {
            $('#test-incident').attr('src', url);
            $('#Incident_modal').modal('show');
        }
    }

    function viewIncidentDetails(incidentId) {
        var url = '/incidents/' + incidentId + '/?site=' + siteName + '&modal=true&modal_view_right=true';
        if (window.self !== window.top) {
            window.location.href = url;
        } else {
            $('#test-incident').attr('src', url);
            $('#Incident_modal').modal('show');
        }
    }

    function createNewIncident() {
        var url = '/incidents/create/?site=' + siteName + '&modal=true&modal_view_right=true';
        if (window.self !== window.top) {
            window.location.href = url;
        } else {
            $('#test-incident').attr('src', url);
            $('#Incident_modal').modal('show');
        }
    }

    function editIncident(incidentId) {
        var url = '/incidents/' + incidentId + '/?site=' + siteName + '&mode=edit&modal=true&modal_view_right=true';
        if (window.self !== window.top) {
            window.location.href = url;
        } else {
            $('#test-incident').attr('src', url);
            $('#Incident_modal').modal('show');
        }
    }

