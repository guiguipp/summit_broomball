$(document).ready(function () {

    var globalData = []

    function renderGameRecapButtons(dataArray) {

        // for (i = 0; i < dataArray.length; i++) {

        //     let dates = dataArray[i].game_date;
            // console.log(dates)
            // let dark = dataArray[i].goals_dark
            // let white = dataArray[i].goals_white

            let buttons = $("<button>");
            buttons.attr("type", "button");
            buttons.addClass("btn btn-primary");
            buttons.attr("data-toggle", "modal");
            buttons.attr("data-target", "#exampleModalCenter");
            buttons.attr("id", `recap-button`)
            buttons.attr("data-stats", "dates")
            // buttons.attr("data-dark", dark)
            // buttons.attr("data-white", white)
            buttons.text("Yearly Stats");
            //console.log(dates)
            $("#buttons-div").append(buttons);
            buttons.append("<br>")

        }
    // }
  
    // $.getJSON("/api/games/past", function (data) {
    //     globalData = (data)
    //     renderGameRecapButtons(globalData)
    //     // console.log(globalData)

    // })

    renderGameRecapButtons()

})


// $(document).ready(function () {
//     console.log("Ready to display awesome graphs!")
//     var globalData = []

//     function renderGameRecapButtons(dataArray) {

//         for (i = 0; i < dataArray.length; i++) {

//             let dates = dataArray[i].game_date;
//             // console.log(dates)
//             // let dark = dataArray[i].goals_dark
//             // let white = dataArray[i].goals_white

//             let buttons = $("<button>");
//             buttons.attr("type", "button");
//             buttons.addClass("btn btn-primary");
//             buttons.attr("data-toggle", "modal");
//             buttons.attr("data-target", "#exampleModalCenter");
//             buttons.attr("id", `recap-button-${i}`)
//             buttons.attr("data-stats", dates)
//             // buttons.attr("data-dark", dark)
//             // buttons.attr("data-white", white)
//             buttons.text(dates);
//             console.log(dates)
//             $("#buttons-div").append(buttons);
//             buttons.append("<br>")

//         }
//     }
  
//     $.getJSON("/api/games/past", function (data) {
//         globalData = (data)
//         renderGameRecapButtons(globalData)
//         // console.log(globalData)

//     })

//     renderGameRecapButtons(globalData)

// })

