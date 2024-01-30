
let selectedStartDate = null;
let selectedEndDate = null;
let selectedSoupRating = 'all';
let selectedSaladRating = 'all';
let selectedMainCourseRating = 'all';
let selectedCompoteRating = 'all';
let selectedGarnishRating = 'all';


function showResultsByDateAndRating() {
    const tableBody = document.getElementById('resultsBody');
    tableBody.innerHTML = '';

    const allFeedbacks = JSON.parse(localStorage.getItem('lunchFeedbacks')) || [];

    
    if (!selectedStartDate || !selectedEndDate || selectedStartDate > selectedEndDate) {
        return;
    }

    const filteredFeedbacks = allFeedbacks.filter(feedback => {
     
        const feedbackDate = new Date(feedback.date);
        const feedbackDateWithoutTime = new Date(feedbackDate.getFullYear(), feedbackDate.getMonth(), feedbackDate.getDate());
        const startDateWithoutTime = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), selectedStartDate.getDate());
        const endDateWithoutTime = new Date(selectedEndDate.getFullYear(), selectedEndDate.getMonth(), selectedEndDate.getDate() + 1); // Добавляем 1 день для корректного сравнения

        
        const dateInRange = feedbackDateWithoutTime >= startDateWithoutTime && feedbackDateWithoutTime < endDateWithoutTime;

        const soupMatch = selectedSoupRating === 'all' || feedback.soup === selectedSoupRating;
        const saladMatch = selectedSaladRating === 'all' || feedback.salad === selectedSaladRating;
        const mainCourseMatch = selectedMainCourseRating === 'all' || feedback.mainCourse === selectedMainCourseRating;
        const compoteMatch = selectedCompoteRating === 'all' || feedback.compote === selectedCompoteRating;
        const garnishMatch = selectedGarnishRating === 'all' || feedback.garnish === selectedGarnishRating;

        return dateInRange && soupMatch && saladMatch && mainCourseMatch && compoteMatch && garnishMatch;
    });

    if (filteredFeedbacks.length > 0) {
        filteredFeedbacks.forEach((feedback, index) => {
            addResultRow(
                index + 1,
                feedback.soup,
                feedback.salad,
                feedback.mainCourse,
                feedback.compote,
                feedback.garnish,
                feedback.date
            );
        });
    } else {
        const newRow = tableBody.insertRow();
        const messageCell = newRow.insertCell(0);
        messageCell.colSpan = 7;
        messageCell.textContent = 'No results found for selected date range and ratings';
    }
}

document.getElementById('applyFilter').addEventListener('click', function() {
    selectedStartDate = new Date(document.getElementById('startDate').value);
    selectedEndDate = new Date(document.getElementById('endDate').value);
    showResultsByDateAndRating();
});

document.getElementById('showAllResults').addEventListener('click', function() {
    showAllResults();
});

document.getElementById('soupFilter').addEventListener('change', function() {
    selectedSoupRating = document.getElementById('soupFilter').value;
    updateResults(); 
});

document.getElementById('saladFilter').addEventListener('change', function() {
    selectedSaladRating = document.getElementById('saladFilter').value;
    updateResults(); 
});

document.getElementById('mainCourseFilter').addEventListener('change', function() {
    selectedMainCourseRating = document.getElementById('mainCourseFilter').value;
    updateResults();
});

document.getElementById('compoteFilter').addEventListener('change', function() {
    selectedCompoteRating = document.getElementById('compoteFilter').value;
    updateResults();
});

document.getElementById('garnishFilter').addEventListener('change', function() {
    selectedGarnishRating = document.getElementById('garnishFilter').value;
    updateResults();
});

function showResultsByDate(startDate, endDate) {
    const tableBody = document.getElementById('resultsBody');
    tableBody.innerHTML = '';

    const allFeedbacks = JSON.parse(localStorage.getItem('lunchFeedbacks')) || [];

    if (!startDate || !endDate || startDate > endDate) {
        return;
    }

    const filteredFeedbacks = allFeedbacks.filter(feedback => {
        const feedbackDate = new Date(feedback.date);
        const feedbackDateWithoutTime = new Date(feedbackDate.getFullYear(), feedbackDate.getMonth(), feedbackDate.getDate());
        const startDateWithoutTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const endDateWithoutTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1); // Добавляем 1 день для корректного сравнения

        return feedbackDateWithoutTime >= startDateWithoutTime && feedbackDateWithoutTime < endDateWithoutTime;
    });

    if (filteredFeedbacks.length > 0) {
        filteredFeedbacks.forEach((feedback, index) => {
            addResultRow(
                index + 1,
                feedback.soup,
                feedback.salad,
                feedback.mainCourse,
                feedback.compote,
                feedback.garnish,
                feedback.date
            );
        });
    } else {
        const newRow = tableBody.insertRow();
        const messageCell = newRow.insertCell(0);
        messageCell.colSpan = 7;
        messageCell.textContent = 'No results found for selected date range';
    }

    filterResults();
}

function addResultRow(index, soup, salad, mainCourse, compote, garnish, date) {
    const tableBody = document.getElementById('resultsBody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${index}</td>
        <td>${soup}</td>
        <td>${salad}</td>
        <td>${mainCourse}</td>
        <td>${compote}</td>
        <td>${garnish}</td>
        <td>${date}</td>
    `;
}

document.getElementById('applyFilter').addEventListener('click', function() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    showResultsByDate(startDate, endDate);
});

function showAllResults() {
    const tableBody = document.getElementById('resultsBody');
    tableBody.innerHTML = '';

    const allFeedbacks = JSON.parse(localStorage.getItem('lunchFeedbacks')) || [];

    if (allFeedbacks.length > 0) {
        allFeedbacks.forEach((feedback, index) => {
            addResultRow(
                index + 1,
                feedback.soup,
                feedback.salad,
                feedback.mainCourse,
                feedback.compote,
                feedback.garnish,
                feedback.date
            );
        });
    } else {
        const newRow = tableBody.insertRow();
        const messageCell = newRow.insertCell(0);
        messageCell.colSpan = 7;
        messageCell.textContent = 'No results found';
    }

    selectedStartDate = null;
    selectedEndDate = null;
}

document.getElementById('showAllResultsButton').addEventListener('click', function() {
    showAllResults();
});

function filterResults() {
    const tableBody = document.getElementById('resultsBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');

        const soupRatingMatch = selectedSoupRating === 'all' || cells[1].textContent === selectedSoupRating;
        const saladRatingMatch = selectedSaladRating === 'all' || cells[2].textContent === selectedSaladRating;
        const mainCourseRatingMatch = selectedMainCourseRating === 'all' || cells[3].textContent === selectedMainCourseRating;
        const compoteRatingMatch = selectedCompoteRating === 'all' || cells[4].textContent === selectedCompoteRating;
        const garnishRatingMatch = selectedGarnishRating === 'all' || cells[5].textContent === selectedGarnishRating;

        if (!soupRatingMatch || !saladRatingMatch || !mainCourseRatingMatch || !compoteRatingMatch || !garnishRatingMatch) {
            row.style.display = 'none';
        } else {
            row.style.display = '';
        }
    }
}



function updateResults() {
    const tableBody = document.getElementById('resultsBody');
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        rows[i].style.display = '';
    }

    filterResults();
}


