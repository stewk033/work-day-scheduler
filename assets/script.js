   $(document).ready(function() {
    // Display current date at top of page
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

    var container = $(".container");
    var descriptions = new Array (9);

    // function to assign hourly time slots
    var timeSlot = function(hour) {
        var unit;
        var displayHour;
        hour < 12 ? (unit = "AM") : (unit = "PM");
        hour > 12 ? (displayHour = hour - 12) : (displayHour = hour);

        var hourColumn = $("<div>")
            .addClass("col-1 hour")
            .text(displayHour + unit);

        return hourColumn;
    };
    // function to create text fields and assign colors
    var textSlot = function(hour) {
        descriptions = JSON.parse(localStorage.getItem("descriptions")) || new Array(9);
    
        var textArea = $("<textarea>")
            .attr("data-hour", hour)
            .text(descriptions[hour - 9]);
        
        var textColumn = $("<div>").addClass("col-10 description").append(textArea);
    
        var currentHour = +moment().format("H");

        if(hour < currentHour) {
            textColumn.addClass("past");
        }
        else if (hour === currentHour) {
            textColumn.addClass("present");
        }
        else if (hour > currentHour) {
            textColumn.addClass("future");
        }

        return textColumn;
    }
    // creates save column and places save button
    var saveSlot = function(hour) {
        var saveColumn = $("<div>").addClass("col-1 saveBtn").html(`<i class='fas fa-save' data-hour = ${hour}></i>`);
        
        return saveColumn;
    }

    // creates rows and attaches time slot
    var createRow = function(hour) {
        var div = $('<div>').addClass('row');
        var hourColumn = timeSlot(hour);
        var textColumn = textSlot(hour);
        var saveColumn = saveSlot(hour);
    
        div.append(hourColumn).append(textColumn).append(saveColumn);

        return div;
    };

    // displays hours in column
    var timeView = function() {
        for (var hour = 9; hour <= 17; hour++) {
            container.append(createRow(hour));
        }
    };

    timeView();
});

