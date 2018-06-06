$(document).ready(function() {
    console.log("Executing code 402: kill all humans")
    const currentURL = window.location.origin;
    
    // clicking on "Set Dark Picks" should trigger this event
    $("#picks_dark").click(function (){
        $("#setting_the_picks").remove();
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date")
        let locked = $(this).attr("locked");
        console.log("id: ", gameId, "gameDate: ", gameDate, "locked: ", locked)
        generateTable(gameId,gameDate,"dark")
        });
        // getting available player to generate a list to draft from
        const generateTable = (idOfGame, dateOfGame,team) => {
            $.ajax({ url: currentURL + "/api/rosters/game/" + idOfGame + "/availability/1/player/ASC", method: "GET" }).then(function(dataFromAPI) {
                $("#list_with_players").hide()
                console.log("dataFromApi: ", dataFromAPI)
                let columnsDiv = `<div class="container" id="setting_the_picks"> <div class="row"> <div class="col draft_list" id="list_of_players"></div> <div class="col draft_list" id="ranks"></div>`
                $("#js_content").append(columnsDiv)
                dataFromAPI.forEach((e,i) => {
                    let divPick = `<div class="pick_check" id="${e.id}" availability="${e.availability}">`
                    let playerButton = `<button class="btn btn-info navbar-btn player_button regular_grey" id="${e.id}" player="${e.player}">${e.player}</button>`
                    let rightArrowButton = `<i class="fa fa-arrow-circle-o-right pick_dark arrows" id="${e.id}" player="${e.player}" game_date="${dateOfGame}" game_id="${e.GameId}"></i>`
                    let defaultSet = `${divPick} ${playerButton}${rightArrowButton}`
                    $("#list_of_players").append(defaultSet)

                    // console.log("i: ", i)
                    let pickDiv = `<div class="pick_check">`
                    let emptyButton = `<button class="btn btn-info navbar-btn player_button empty_button"><span class="rank_num">${i+1}</span></button>`
                    let emptySet = `${pickDiv}${emptyButton}`
                    $("#ranks").append(emptySet)
                    })
                
                
                
                
            });
        }
        
    // toggling the features so that they don't keep appending
    $("#manual_draft").click(function(){
        console.log("Hiding setting the picks")
        $("#list_with_players").show()
        $("#setting_the_picks").remove()
        })
    $("#computer_draft").click(function(){
        $("#setting_the_picks").show()
        })

    $(document).on("click", ".pick_dark", function (){
        let playerId = $(this).attr("id");
        let playerName = $(this).attr("player");
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        console.log("playerId: ",playerId,"playerName: ",playerName,"gameId: ",gameId,"locked: ", locked)
        $.ajax({ 
            url: currentURL + "/api/rosters/" + playerId, 
            method: "PUT",
            data: jQuery.param({captain1Pick: 1, player: playerName}) 
            }).then(function(dataFromAPI) {
                
                });


        })

















});