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
        /* getCaptain1Picks(gameId) */
        generatePlayerColumn(gameId,gameDate,"dark")
        generateRanksColumn(gameId,gameDate,"dark")
        });
        // getting available player to generate a list to draft from
        const generatePlayerColumn = (idOfGame, dateOfGame,team) => {
            $("#available_draft_col").text("")
            $("#dark_draft_col").text("")
            $("#white_draft_col").text("")
            $("#js_content").text("")
            $.ajax({ url: currentURL + "/api/rosters/game/" + idOfGame + "/availability/1/player/ASC", method: "GET" }).then(function(dataFromAPI) {
                // $("#list_with_players").hide()
                dataFromAPI.forEach((e,i) => {
                    let divPick = `<div class="pick_check" id="${e.id}" availability="${e.availability}">`
                    let playerButton = `<button class="btn btn-info navbar-btn player_button regular_grey" id="${e.id}" player="${e.player}">${e.player}</button>`
                    let rightArrowButton = `<i class="fa fa-arrow-circle-o-right pick_dark arrows" id="${e.id}" player="${e.player}" game_date="${dateOfGame}" game_id="${e.GameId}"></i>`
                    let defaultSet = `${divPick} ${playerButton}${rightArrowButton}`
                    $("#dark_draft_col").append(defaultSet)
                    
                    })  
                
            });
        }
        const generateRanksColumn = (idOfGame, dateOfGame,team) => {
            $.ajax({ url: currentURL + "/api/rosters/" + idOfGame + "/players/captain1picks", method: "GET" }).then(function(dataFromAPI) {
                console.log("result from Query: ", dataFromAPI)
                // since non ranked players have a 0 value by default, they show before everyone in the sorted list, which we do not want 
                // therefore, we have to show the players who have a rank before the ones who have a rank of 0
                let alreadyRankedPlayers = []
                // determine which players already have a rank, and push them to a dedicated array
                dataFromAPI.forEach((e,i) => {
                    if(e.captain1Pick > 0) {
                        alreadyRankedPlayers.push(e)
                    }
                    });
                let numOfRankedPlayers = alreadyRankedPlayers.length
                // splice the players from the original array
                dataFromAPI.splice(dataFromAPI.length-alreadyRankedPlayers.length, alreadyRankedPlayers.length)
                // combine the array by "pushing" the numbered ones, before the 0 (unranked) players
                let rankedArray = alreadyRankedPlayers.concat(dataFromAPI); 

                rankedArray.forEach((e,i) => {
                    let buttonInfo = `<button class="btn btn-info navbar-btn player_button empty_button"><span class="rank_num">${i+1}</span></button>`
                    if(e.captain1Pick > 0) {
                        buttonInfo = `<span class="rank_num_picked">${i+1}</span>. <button class="btn btn-info navbar-btn player_button empty_button not_that_empty" id="${e.id}" player="${e.player}">${e.player}</button>`
                    }
                    // console.log("i: ", i)
                    let pickDiv = `<div class="pick_check">`
                    let emptySet = `${pickDiv}${buttonInfo}`
                    $("#white_draft_col").append(emptySet)
                    });
                
                })







            }
        
    // toggling the features so that they don't keep appending
    $("#manual_draft").click(function(){
        console.log("Hiding setting the picks")
        // $("#list_with_players").show()
        // $("#setting_the_picks").remove()
        })
    $("#computer_draft").click(function(){
        $("#list_with_player").hide()
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

        function getCaptain1Picks(idOfGame){
            console.log("Getting the picks")
            $.ajax({ url: currentURL + "/api/rosters/" + idOfGame + "/players/captain1picks", method: "GET" }).then(function(dataFromAPI) {
            console.log(dataFromAPI)
            console.log("Getting the latest pick")
            let lastRank = dataFromAPI[dataFromAPI.length-1]
            console.log("lastRank: ", lastRank)
            
            })
        }















});