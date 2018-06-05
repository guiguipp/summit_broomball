$(document).ready(function() {

var exampleDates = ["01/01/2019", "02/01/2019", "03/01/2019"]

function renderGameRecapButtons() {

    for (i = 0; i < exampleDates.length; i++) {

        let dates = exampleDates[i];

    let buttons = $("<button>");
    buttons.attr("type", "button");
    buttons.addClass("btn btn-primary");
    buttons.attr("data-toggle", "modal");
    buttons.attr("data-target", "#exampleModalCenter");
    buttons.attr("id", "recap-button")
    buttons.text(dates);
    $("#inner-main").append(buttons);
    buttons.append("<br>")

    }
}

renderGameRecapButtons()

});