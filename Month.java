// Month is a child class of year 
public class Month extends Year{

    // Data members
    private int month;
    private int[][] days = new int[6][7]; 

    // Parameterized constructor
    public Month(int m, int y) {
        super(y);
        this.month = m;
        
        // Set this.days
        int total = daysInMonth();
        int start = dayOfWeek();

        // Count of each day in the month
        int counter = 1;
        
        // Transverse through weeks
        for (int i = 0; i < 6; i++) {

            // Add start day on first row
            if (i == 0) {
                
                for (int j = start - 1; j < 7; j++) {
                    this.days[i][j] = counter;
                    counter++;
                }

            // Else, add dates until the end of the month is reached
            } else {
                
                for (int j = 0; j < 7; j++) {
                    this.days[i][j] = counter;
                    counter ++;

                    if (counter > total) {
                        return;
                    }

                }
                
            } 

        }

    }

    // Getters
    public int getMonth() {
        return this.month;
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

        return week + 1;
    } 

    // daysInMonth() returns how many days are in any month of any year
    public int daysInMonth() {

        int [] total_days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

        if (this.month == 2 || leapYear() == true) {
            return total_days[this.month - 1] + 1;
        } else {
            return total_days[this.month - 1];
        }

    }

    // monthName() prints the name of the month
    public String monthName() {

        String [] months = {
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December" 
        };

        return months[this.month - 1];

    } 

    // printMonth prints all the days in a month
    public void printDays() {

        System.out.println("  Sun  Mon  Tue  Wed  Thu  Fri  Sat");

        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 7; j++) {

                if (days[i][j] == 0) {
                    System.out.print("     ");
                } else if (days[i][j] < 10) {
                    System.out.print("    " + days[i][j]);
                } else {
                    System.out.print("   " + days[i][j]);
                }

            }

            System.out.println();
        }

    }

}
