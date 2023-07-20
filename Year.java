// class Year creates a year object 
public class Year {

    // Data member
    private int year;

    // Parameterized constructor
    public Year(int y) {
        this.year = y;
    }

    // Getter
    public int getYear() {
        return this.year;
    }

    // leapYear() returns true or false depending on if the year is a leap year
    public boolean leapYear() {

        if (this.year % 400 == 0 || (this.year % 4 == 0 && this.year % 100 != 0) ) {
            return true;
        }

        return false;

    }

}