   $(document).ready(function() {
    // Display date at top of page
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

    var container = $(".container");

    // function to create time column
    var timeSlot = function(hour) {
        var unit;
        var displayHour;
        hour < 12 ? (unit = ':00AM') : (unit = ':00PM');
        hour > 12 ? (displayHour = hour - 12) : (displayHour = hour);

        var hourColumn = $('<div>')
            .addClass('col-1 hour')
            .text(displayHour + unit);

        return hourColumn;
    };

    var createRow = function(hour) {
        var div = $('<div>').addClass('row');
        var hourColumn = timeSlot(hour);
    
        div.append(hourColumn);
        return div;
    };

    var timeView = function() {
        for (var hour = 9; hour <= 17; hour++) {
            container.append(createRow(hour));
        }
    };

    timeView();
});

