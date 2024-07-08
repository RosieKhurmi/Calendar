package com.example.calendar;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/month")
public class MonthResource {

    // monthAsInt() returns the string int as a month
    public int monthAsInt(String month) {

        month = month.toLowerCase();

        switch (month) {
            case "january":
                return 1;
            case "february":
                return 2;
            case "march":
                return 3;
            case "april":
                return 4;
            case "may":
                return 5;
            case "june":
                return 6;
            case "july":
                return 7;
            case "august":
                return 8;
            case "september":
                return 9;
            case "october":
                return 10;
            case "november":
                return 11;
            case "december":
                return 12;
            default:
                throw new IllegalArgumentException("Invalid month: " + month);

        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response returnMonth(@QueryParam("month") String month, @QueryParam("year") int year) {

        int m = monthAsInt(month);

        Month monthCalendar = new Month(m, year);
        monthCalendar.setMonth();

        return Response.status(200)
                .header("Content-Type", "application/json")
                .header("Access-Control-Allow-Origin", "http://localhost:63342")
                .entity(monthCalendar.getDays())
                .build();

    }

    // @QueryParam("month") String monthName, @QueryParam("year") int year
}