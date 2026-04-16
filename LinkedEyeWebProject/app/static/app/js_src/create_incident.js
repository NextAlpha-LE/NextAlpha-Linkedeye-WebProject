$(document).ready(function() {
    let currentStep = 1;
    const totalSteps = 4;

    // Priority Matrix Mapping
    const priorityMatrix = {
        'Enterprise': { 'Critical': 'P1', 'High': 'P2', 'Medium': 'P3', 'Low': 'P4' },
        'Department': { 'Critical': 'P1', 'High': 'P2', 'Medium': 'P3', 'Low': 'P4' },
        'Team': { 'Critical': 'P2', 'High': 'P3', 'Medium': 'P3', 'Low': 'P4' },
        'Individual': { 'Critical': 'P3', 'High': 'P4', 'Medium': 'P4', 'Low': 'P4' }
    };

    let selectedImpact = 'Enterprise';
    let selectedUrgency = 'Medium';
    let selectedCategory = '';
    let selectedSource = 'Manual';

    function updatePriority() {
        const priority = priorityMatrix[selectedImpact][selectedUrgency];
        const statusMap = { 'P1': 'Critical', 'P2': 'High', 'P3': 'Medium', 'P4': 'Low' };
        const priorityText = statusMap[priority];
        const responseTimes = { 'P1': '15 mins', 'P2': '30 mins', 'P3': '1 hr', 'P4': '4 hrs' }[priority];
        const resolutionTimes = { 'P1': '4 hrs', 'P2': '8 hrs', 'P3': '24 hrs', 'P4': '48 hrs' }[priority];

        // Update Calculated Priority Card
        $('.calculated-priority-val').text(priority);
        $('.calculated-priority-label').text(priorityText);
        $('.calculated-priority-card .response-time').text(responseTimes);
        $('.calculated-priority-card .resolution-time').text(resolutionTimes);
        
        // Update Card Circle background color based on priority
        const priorityColors = { 'P1': '#ef4444', 'P2': '#f59e0b', 'P3': '#3b82f6', 'P4': '#10b981' };
        $('.result-circle').css('background', `linear-gradient(135deg, ${priorityColors[priority]} 0%, ${priorityColors[priority]}dd 100%)`);
        $('.result-circle').css('box-shadow', `0 0 30px ${priorityColors[priority]}80`);

        // Update Header Badge
        $('.priority-preview-card').attr('class', `priority-preview-card ${priority.toLowerCase()}-border`);
        $('.priority-preview-card .preview-code').text(priority);
        $('.priority-preview-card .preview-text').text(priorityText);
        $('.priority-preview-card .preview-dot').attr('class', `preview-dot ${priority.toLowerCase()}`);
        $('.priority-preview-card .response-time').text(responseTimes);
        $('.priority-preview-card .resolution-time').text(resolutionTimes);
        $('.priority-preview-card .preview-code').attr('class', `preview-code ${priority.toLowerCase()} ${priority.toLowerCase()}-text`);

        // Update Footer Badge
        $('.footer-priority-badge').attr('class', `footer-priority-badge ${priority.toLowerCase()}-border`);
        $('.footer-priority-badge .priority-code').text(priority);
        $('.footer-priority-badge .priority-text').text(priorityText);
        $('.footer-priority-badge .priority-dot').attr('class', `priority-dot ${priority.toLowerCase()}`);
        $('.footer-priority-badge .response-time').text(responseTimes);
        $('.footer-priority-badge .resolution-time').text(resolutionTimes);

        // Highlight in matrix
        $('.matrix-cell').removeClass('highlight active');
        $(`.matrix-cell[data-impact="${selectedImpact}"][data-urgency="${selectedUrgency}"]`).addClass('highlight active');
    }

    window.selectImpact = function(impact) {
        selectedImpact = impact;
        $('.severity-selectors [data-impact]').removeClass('active');
        $(`.severity-selectors [data-impact="${impact}"]`).addClass('active');
        updatePriority();
    };

    window.selectUrgency = function(urgency) {
        selectedUrgency = urgency;
        $('.severity-selectors [data-urgency]').removeClass('active');
        $(`.severity-selectors [data-urgency="${urgency}"]`).addClass('active');
        updatePriority();
    };

    // Initialize UI
    updatePriority();

    window.selectCategory = function(category) {
        selectedCategory = category;
        $('.category-btn').removeClass('active');
        $(`.category-btn[data-category="${category}"]`).addClass('active');
    };

    window.selectSource = function(source) {
        selectedSource = source;
        $('.source-btn').removeClass('active');
        $(`.source-btn[data-source="${source}"]`).addClass('active');
    };

    // Scroll Tracking for Progress Bar
    const stepContents = document.querySelectorAll('.step-content');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const stepLines = document.querySelectorAll('.step-line');

    const observerOptions = {
        root: null,
        rootMargin: '-150px 0px -40% 0px', // Trigger when section is near top
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepId = entry.target.id; // e.g., 'step1'
                const stepNum = parseInt(stepId.replace('step', ''));
                
                updateProgress(stepNum);
            }
        });
    }, observerOptions);

    stepContents.forEach(content => observer.observe(content));

    function updateProgress(currentStep) {
        stepIndicators.forEach((indicator, index) => {
            const stepIndex = index + 1;
            if (stepIndex <= currentStep) {
                indicator.classList.add('reached');
                if (stepIndex === currentStep) {
                    indicator.classList.add('active');
                    $('.step-content').removeClass('active-section');
                    $(`#step${stepIndex}`).addClass('active-section');
                } else {
                    indicator.classList.remove('active');
                }
            } else {
                indicator.classList.remove('reached', 'active');
            }
        });

        stepLines.forEach((line, index) => {
            if (index + 1 < currentStep) {
                line.classList.add('reached');
            } else {
                line.classList.remove('reached');
            }
        });
    }

    // Initialize first step as reached
    updateProgress(1);

    // Form Submission
    window.createIncident = function() {
        const data = {
            short_description: $('#shortDescription').val(),
            description: $('#description').val(),
            impact: selectedImpact,
            urgency: selectedUrgency,
            category: selectedCategory,
            source: selectedSource,
            assignment_group: $('#assignmentGroup').val(),
            assigned_to: $('#assignedTo').val(),
            configuration_item: $('#configurationItem').val()
        };

        if (!data.short_description) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please provide a short description.',
                background: '#111',
                color: '#fff',
                confirmButtonColor: '#f59e0b'
            });
            return;
        }

        // Show loading
        Swal.fire({
            title: 'Creating Incident...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            background: '#111',
            color: '#fff'
        });

        // CSRF Token
        const csrftoken = getCookie('csrftoken');

        // Get site from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const pageData = window.INCIDENT_CREATE_PAGE_DATA || {};
        const siteName = (pageData.siteName || urlParams.get('site') || '').toString().trim();

        $.ajax({
            url: '/incidents/?site=' + encodeURIComponent(siteName),
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: { 'X-CSRFToken': csrftoken },
            success: function(response) {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Incident Created',
                        text: 'Incident ' + response.number + ' has been created successfully.',
                        background: '#111',
                        color: '#fff',
                        confirmButtonColor: '#f59e0b'
                    }).then(() => {
                        window.location.href = '/incidents/?site=' + encodeURIComponent(siteName) + '&modal_view_right=true&v=20260411-fix1';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message || 'Something went wrong while creating the incident.',
                        background: '#111',
                        color: '#fff',
                        confirmButtonColor: '#f59e0b'
                    });
                }
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: xhr.responseJSON ? xhr.responseJSON.message : 'Something went wrong while creating the incident.',
                    background: '#111',
                    color: '#fff',
                    confirmButtonColor: '#f59e0b'
                });
            }
        });
    };

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
});
