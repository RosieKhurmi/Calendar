// Fetch from backend
/**
 *
 * @param url
 * @param displayFunction
 * @param period
 * @param month
 * @param year
 */
function fetchCalendar(url, displayFunction, period, month, year) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            displayFunction(data, period, month, year)
        })
        .catch(error => {
            console.error("There was an error: ", error);
        });
}

// Month and Year
let monthValue;
let yearValue;

// monthCalendar() displays month container
function monthCalendar() {
    document.getElementById('monthContainer').style.display = 'block';
    document.getElementById('yearContainer').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'none';
    document.getElementById('yearCalendar').style.display = 'none';
    document.getElementById('mainContainer').style.marginTop = '20px';
}

// selectMonth() gets information for a month
function selectMonth() {

    // Get values from HTML
    monthValue = document.getElementById('monthSelect').value;
    yearValue = document.getElementById('yearSelect').value;
    console.log(monthValue, " ", yearValue)

}

// selectYear() gets information for a year
function selectYear() {

    // Get value from HTML
    yearValue = document.getElementById('yearIn').value;

}

// makeMonth() outputs the monthly calendar
function makeMonth() {

    selectMonth();

    if (!monthValue || !yearValue || yearValue < 1000 || yearValue > 9999) {
        alert('Please select a valid month and year.');
        return;
    }

    const url = `http://localhost:8080/Calendar-1.0-SNAPSHOT/api/month/calendar?month=${monthValue}&year=${yearValue}`;

    // Show month and calendar
    document.getElementById('monthCalendar').style.display = 'block';
    fetchCalendar(url, displayCalendar, 'month', monthValue, yearValue);

}

// yearCalendar() displays year container
function yearCalendar() {
    document.getElementById('yearContainer').style.display = 'block';
    document.getElementById('monthContainer').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'none';
    document.getElementById('yearCalendar').style.display = 'none';
    document.getElementById('mainContainer').style.marginTop = '20px';
}

// makeYear() outputs the yearly calendar
async function makeYear() {
    selectYear();

    if (!yearValue || yearValue < 1000 || yearValue > 9999) {
        alert('Please enter a valid year.');
        return;
    }

    // Months
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Show year and calendar by repeating the function for each month
    document.getElementById('yearCalendar').style.display = 'block';
    const calendarContainer = document.getElementById('yCalendar');
    calendarContainer.innerHTML = ''; // Clear any previous content

    // fetchMonthCalendar fetches the month calendar from the backend
    const fetchMonthCalendar = (month) => {
        const url = `http://localhost:8080/Calendar-1.0-SNAPSHOT/api/month/calendar?month=${month}&year=${yearValue}`;
        return new Promise((resolve) => {
            fetchCalendar(url, (data) => {
                displayCalendar(data, 'year', month, yearValue);
                resolve(); // Resolve the promise when displayCalendar completes
            }, 'year', month, yearValue);
        });
    };

    // Display each month
    for (const month of months) {
        await fetchMonthCalendar(month);
    }
}

// displayCalendar() makes a monthly or yearly calendar
/**
 *
 * @param data
 * @param period
 * @param month
 * @param year
 */
function displayCalendar(data, period, month, year) {

    // Find if it is a yearly or monthly calendar
    const calendarContainer = document.getElementById(period === 'month' ? 'calendar' : 'yCalendar');

    // Days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // If the calendar is for a month
    if (period === 'month') {
        calendarContainer.innerHTML = ''; // Clear any previous content

        // Title
        const header = document.createElement('h2');
        header.textContent = `${month} ${year}`;
        calendarContainer.appendChild(header);

        // Create table
        const table = document.createElement('table');

        // Add days of the week
        const headerRow = document.createElement('tr');
        daysOfWeek.forEach(day => {
            const cell = document.createElement('th');
            cell.textContent = day;
            headerRow.appendChild(cell);
        });
        table.appendChild(headerRow);

        // Add days of the month
        data.forEach(week => {
            const row = document.createElement('tr');
            week.forEach(day => {
                const cell = document.createElement('td');
                // Only add if the day is not 0
                if (day !== 0) {
                    cell.textContent = day;
                }
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        // Add calendar
        calendarContainer.appendChild(table);

    } else if (period === 'year') {

        // Title
        const monthHeader = document.createElement('h3');
        monthHeader.textContent = `${month} ${year}`;
        calendarContainer.appendChild(monthHeader);

        // Create table
        const table = document.createElement('table');

        // Add days of the week to the header
        const headerRow = document.createElement('tr');
        daysOfWeek.forEach(day => {
            const cell = document.createElement('th');
            cell.textContent = day;
            headerRow.appendChild(cell);
        });
        table.appendChild(headerRow);

        // Add days of the month
        data.forEach(week => {
            const row = document.createElement('tr');
            week.forEach(day => {
                const cell = document.createElement('td');
                if (day !== 0) {
                    cell.textContent = day;
                }
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        calendarContainer.appendChild(table);
    }

}

// exit() returns to main menu
function exit() {
    document.getElementById('monthContainer').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'none';
    document.getElementById('yearContainer').style.display = 'none';
    document.getElementById('yearCalendar').style.display = 'none';
    document.getElementById('mainContainer').style.marginTop = '0';
}