// Rosie Khurmi
// July 19, 2023

import java.util.Scanner;

public class Calendar {

    // printMonth() takes in a Month object and prints out a calander month
    public static void printMonth(Month month) {
        
        System.out.println("  " + month.monthName() + "\n");
        month.printDays(); // Call the printDays class method

    }

    // printYear() takes in a year and prints out the calendar year
    public static void printYear(int year) {

        System.out.println("----------- YEAR OF " + year + "-----------\n");

        // For each of the 12 months, create a month object 
        // Call printMonth for each month object created
        for (int i = 1; i <= 12; i++) {
            Month month = new Month(i, year);
            printMonth(month);
        }

    }

    // Main method
    public static void main(String[] args) {
        
        Scanner scan = new Scanner(System.in);

        // Ask the user if they want a year or month calendar
        System.out.print("\nEnter \"Y\" for a year calendar and \"M\" for a month calendar: ");
        String option = scan.nextLine();

        // Ask for a year
        System.out.print("\nEnter a year: ");
        int year = scan.nextInt();

        // If the user wants a year calendar, call printYear
        if (option.equals("Y")) {

            System.out.println();
            printYear(year);

        // If the user wants a month calendar
        } if (option.equals("M")) {

            // Ask for the month
            System.out.print("\nEnter a month (1 - 12): ");
            int month = scan.nextInt();

            // Create a Month object
            Month one_month = new Month(month, year);

            // Call printMonth
            System.out.println();
            printMonth(one_month);

        }

        scan.close();

    }

}