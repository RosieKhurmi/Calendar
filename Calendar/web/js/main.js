function fetchCalendar(url, displayFunction) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            displayFunction(data)
        })
        .catch(error => {
            console.error("There was an error: ", error);
        });
}

let monthValue;
let yearValue;

function monthCalendar() {
    // Show the month container
    document.getElementById('monthContainer').style.display = 'block';
    // Move the main container down
    document.getElementById('mainContainer').style.marginTop = '20px';
}

function selectMonth() {

    monthValue = document.getElementById('monthSelect').value;

}

function selectYear() {

    yearValue = document.getElementById('yearSelect').value;

}

function makeMonth() {

    selectMonth();
    selectYear();
    const url = `http://localhost:8080/Calendar-1.0-SNAPSHOT/api/month/calendar?month=${monthValue}&year=${yearValue}`;

    document.getElementById('monthCalendar').style.display = 'block';

    fetchCalendar(url, displayCalendar);

}

function displayCalendar(data) {
    const calendarContainer = document.getElementById('calendar');
    calendarContainer.innerHTML = ''; // Clear any previous content

    const table = document.createElement('table');

    data.forEach(week => {
        const row = document.createElement('tr');
        week.forEach(day => {
            const cell = document.createElement('td');
            cell.textContent = day;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    calendarContainer.appendChild(table);
}

function exit() {
    // Hide the other containers
    document.getElementById('monthContainer').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'none';

    // Reset the main container margin
    document.getElementById('mainContainer').style.marginTop = '0';
}