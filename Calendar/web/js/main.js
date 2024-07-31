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

let monthValue;
let yearValue;

function monthCalendar() {
    document.getElementById('monthContainer').style.display = 'block';
    document.getElementById('yearContainer').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'none';
    document.getElementById('yearCalendar').style.display = 'none';
    document.getElementById('mainContainer').style.marginTop = '20px';
}

function selectMonth() {

    monthValue = document.getElementById('monthSelect').value;
    yearValue = document.getElementById('yearSelect').value;

}

function selectYear() {

    yearValue = document.getElementById('yearIn').value;

}

function makeMonth() {

    selectMonth();

    if (!monthValue || !yearValue || yearValue < 1000 || yearValue > 9999) {
        alert('Please select a valid month and year.');
        return;
    }

    const url = `http://localhost:8080/Calendar-1.0-SNAPSHOT/api/month/calendar?month=${monthValue}&year=${yearValue}`;

    document.getElementById('monthCalendar').style.display = 'block';

    fetchCalendar(url, displayCalendar, 'month', monthValue, yearValue);

}

function yearCalendar() {
    document.getElementById('yearContainer').style.display = 'block';
    document.getElementById('monthContainer').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'none';
    document.getElementById('yearCalendar').style.display = 'none';
    document.getElementById('mainContainer').style.marginTop = '20px';
}

function makeYear() {
    selectYear();

    if (!yearValue || yearValue < 1000 || yearValue > 9999) {
        alert('Please enter a valid year.');
        return;
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    document.getElementById('yearCalendar').style.display = 'block';
    document.getElementById('monthContainer').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'none';
    const calendarContainer = document.getElementById('yCalendar');
    calendarContainer.innerHTML = ''; // Clear any previous content

    months.forEach(month => {
        const url = `http://localhost:8080/Calendar-1.0-SNAPSHOT/api/month/calendar?month=${month}&year=${yearValue}`;
        fetchCalendar(url, displayCalendar, 'year', month, yearValue);
    });
}

function displayCalendar(data, period, month, year) {

    const calendarContainer = document.getElementById(period === 'month' ? 'calendar' : 'yCalendar');

    if (period === 'month') {
        calendarContainer.innerHTML = ''; // Clear any previous content

        const header = document.createElement('h2');
        header.textContent = `${month} ${year}`;
        calendarContainer.appendChild(header);

        const table = document.createElement('table');

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

    } else if (period === 'year') {
        const monthHeader = document.createElement('h3');
        monthHeader.textContent = `${month} ${year}`;
        calendarContainer.appendChild(monthHeader);

        const table = document.createElement('table');

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

function exit() {
    document.getElementById('monthContainer').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'none';
    document.getElementById('yearContainer').style.display = 'none';
    document.getElementById('yearCalendar').style.display = 'none';
    document.getElementById('mainContainer').style.marginTop = '0';
}