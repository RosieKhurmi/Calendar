function selectMonth() {
    const month = document.getElementById('monthSelect').value;
    const year = document.getElementById('yearInput').value;

    if (month && year) {
        alert(`Selected Month: ${getMonthName(month)} ${year}`);
        // Example: You can add functionality here to use the selected month and year
    } else {
        alert("Please select both month and year");
    }
}

// Function to select a year
function selectYear() {
    const year = document.getElementById('yearIn').value;

    // Check if a valid year is entered
    if (year) {
        alert(`Selected Year: ${year}`);

    } else {
        alert("Please select a year");
    }
}

// Function to create the calendar of a month
function monthCalendar() {
    // Show the month container
    document.getElementById('monthContainer').style.display = 'block';

    // Move the main container down
    document.getElementById('mainContainer').style.marginTop = '20px';
}

// Function to create the calendar of a year
function yearCalendar() {

    // Show the year container
    document.getElementById('yearContainer').style.display = 'block';

    // Move the main container down
    document.getElementById('mainContainer').style.marginTop = '20px';

}

// Function to make a month calendar
function makeMonth() {

    document.getElementById('monthCalendar').style.display = 'block';

}

function makeYear() {

    document.getElementById('yearCalendar').style.display = 'block';

}

// Function to exit and return to selection screen
function exit() {
    // Hide the other containers
    document.getElementById('monthContainer').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'none';

    document.getElementById('yearContainer').style.display = 'none';
    document.getElementById('yearCalendar').style.display = 'none';
    // Reset the main container margin
    document.getElementById('mainContainer').style.marginTop = '0';
}



