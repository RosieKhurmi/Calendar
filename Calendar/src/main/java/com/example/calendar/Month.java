package com.example.calendar;

public class Month {

    private int month, year;

    private int[][] days = new int[6][7];

    public Month(int month, int year) {
        this.month = month;
        this.year = year;
    }

    // Getters
    public int getMonth() {
        return this.month;
    }
    public int getYear() {
        return this.year;
    }
    public int[][] getDays() {
        return this.days;
    }

    // dayOfWeek() returns 1 (sun) to 7(sat) to show what day of the
    // week the first of the month begins
    public int dayOfWeek() {

        int day = 1;

        int b = getYear() - ((14 - this.month) / 12);
        int c = this.month + (12 * ((14 - this.month) / 12)) - 2;

        int week = (day + b + (b / 4) - (b / 100) + (b / 400) + ((31 * c) / 12)) % 7;

        return week;
    }

    // leapYear() returns true or false depending on if the year is a leap year
    public boolean leapYear() {

        return this.year % 400 == 0 || (this.year % 4 == 0 && this.year % 100 != 0);

    }

    // daysInMonth() returns how many days are in any month of any year
    public int daysInMonth() {

        int [] total_days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

        if (this.month == 2 && leapYear()) {
            return total_days[this.month - 1] + 1;
        } else {
            return total_days[this.month - 1];
        }

    }

    // setMonth() sets the month
    public void setMonth() {

        // Set this.days
        int total = daysInMonth();
        int start = dayOfWeek(); // 4

        // Count of each day in the month
        int counter = 1;

        // Transverse through weeks
        for (int i = 0; i < 6; i++) {

            // Add start day on first row
            if (i == 0) {

                for (int j = start; j < 7; j++) {
                    this.days[i][j] = counter;
                    counter++;
                }

                // Else, add dates until the end of the month is reached
            } else {

                for (int j = 0; j < 7; j++) {

                    if (counter > total) {
                        return;
                    }

                    this.days[i][j] = counter;
                    counter ++;

                }

            }

        }

    }

}
