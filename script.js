document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');

        // Save theme preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    });

    // --- Tabs Navigation ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- Dynamic Test Card Generation & Filtering ---
    const testsCardContainer = document.getElementById('tests-card-container');
    const testsFilter = document.getElementById('tests-filter');

    // Dummy data for the tests, now with an "Easy" option
    const testsData = [
        { title: "GATE CSE - Full Mock #1", subject: "All Subjects", questions: 65, difficulty: "Hard" },
        { title: "Data Structures - Topic Test (Trees)", subject: "Programming & Data Structures", questions: 20, difficulty: "Medium" },
        { title: "Algorithms - Subject Test", subject: "Algorithms", questions: 25, difficulty: "Medium" },
        { title: "Digital Logic - Foundational", subject: "Digital Logic", questions: 15, difficulty: "Easy" }
    ];

    function createTestCard(test) {
        return `
            <div class="test-card">
                <h4>${test.title}</h4>
                <p>${test.subject}</p>
                <div class="details">
                    <span>${test.questions} Questions</span>
                    <span class="difficulty">${test.difficulty}</span>
                </div>
            </div>
        `;
    }

    function renderTests(filterValue) {
        let filteredTests = testsData;
        
        if (filterValue !== 'all') {
            filteredTests = testsData.filter(test => test.difficulty === filterValue);
        }

        if (filteredTests.length === 0) {
            testsCardContainer.innerHTML = `<p>No tests found for the selected difficulty.</p>`;
        } else {
            testsCardContainer.innerHTML = filteredTests.map(createTestCard).join('');
        }
    }

    // Event listener for the filter
    testsFilter.addEventListener('change', (event) => {
        renderTests(event.target.value);
    });

    // Initial render of all tests
    renderTests('all');

});

