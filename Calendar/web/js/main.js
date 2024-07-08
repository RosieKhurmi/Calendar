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

// Function to display the month calendar
function displayMonthCalendar(monthData) {
    const calendarElement = document.getElementById('calendar');
    calendarElement.innerHTML = ''; // Clear any previous content

    monthData.forEach(week => {
        const weekRow = document.createElement('tr');
        week.forEach(day => {
            const dayCell = document.createElement('td');
            dayCell.textContent = day;
            weekRow.appendChild(dayCell);
        });
        calendarElement.appendChild(weekRow);
    });
}

function selectMonth() {
    const month = document.getElementById('monthSelect').value;
    const year = document.getElementById('yearInput').value;

    if (month && year) {
        const url = `/api/month?month=${month}&year=${year}`;
        fetchCalendar(url, displayMonthCalendar);
    } else {
        alert("Please select both month and year");
    }
}

// Function to create the calendar of a month
function monthCalendar() {
    // Show the month container
    document.getElementById('monthContainer').style.display = 'block';
    // Move the main container down
    document.getElementById('mainContainer').style.marginTop = '20px';
}

// Function to make a month calendar
function makeMonth() {

    document.getElementById('monthCalendar').style.display = 'block';

}

// Function to exit and return to selection screen
function exit() {
    // Hide the other containers
    document.getElementById('monthContainer').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'none';

    // Reset the main container margin
    document.getElementById('mainContainer').style.marginTop = '0';
}



