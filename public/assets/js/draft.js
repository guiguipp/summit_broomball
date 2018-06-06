$(document).ready(function() {
    console.log("Executing code 402: kill all humans")
    const currentURL = window.location.origin;
    
    // clicking on "Set White Picks" should trigger the pick setting page
    $("#picks_dark").click(function (){
        $("#setting_the_picks").remove();
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date")
        let locked = $(this).attr("locked");
        generatePlayerColumn(gameId,gameDate,1)
        generateRanksColumn(gameId,gameDate,1)
        });
    // clicking on "Set White Picks" should trigger the pick setting page
    $("#picks_white").click(function (){
        $("#setting_the_picks").remove();
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date")
        let locked = $(this).attr("locked");
        generatePlayerColumn(gameId,gameDate,2)
        generateRanksColumn(gameId,gameDate,2)
        });
        // getting available player to generate a list to draft from
        const generatePlayerColumn = (idOfGame, dateOfGame, turn) => {
            $("#available_draft_col").text("")
            $("#dark_draft_col").text("")
            $("#white_draft_col").text("")
            $("#col1_title").text("Players")
            $("#col2_title").text("Ranks")
            // $("#js_content").text("")
            /*
            let gameDay = `<div class="game_day"><br> <h2>${dateOfGame}</h2>`
            $("#js_content").append(gameDay)
            */
           console.log("idOfGame in generatePlayerColumn", idOfGame)
            $.ajax({ url: currentURL + "/api/rosters/game/" + idOfGame + "/availability/1/player/ASC", method: "GET" }).then(function(dataFromAPI) {
                // $("#list_with_players").hide()
                dataFromAPI.forEach((e,i) => {
                    if (turn == 1) {
                        if(e.captain1Pick < 1) {
                            let divPick = `<div class="pick_check" id="${e.id}" availability="${e.availability}">`
                            let playerButton = `<button class="btn btn-info navbar-btn player_button regular_grey" id="${e.id}" player="${e.player}">${e.player}</button>`
                            let rightArrowButton = `<i class="fa fa-arrow-circle-o-right pick_dark arrows" id="${e.id}" player="${e.player}" game_date="${dateOfGame}" game_id="${e.GameId}"></i>`
                            let defaultSet = `${divPick} ${playerButton}${rightArrowButton}`
                            $("#dark_draft_col").append(defaultSet)
                            }
                        }
                    else {        
                        if(e.captain2Pick < 1) {
                            let divPick = `<div class="pick_check" id="${e.id}" availability="${e.availability}">`
                            let playerButton = `<button class="btn btn-info navbar-btn player_button regular_grey" id="${e.id}" player="${e.player}">${e.player}</button>`
                            let rightArrowButton = `<i class="fa fa-arrow-circle-right pick_white arrows" id="${e.id}" player="${e.player}" game_date="${dateOfGame}" game_id="${e.GameId}"></i>`
                            let defaultSet = `${divPick} ${playerButton}${rightArrowButton}`
                            $("#dark_draft_col").append(defaultSet)
                            }
                        }
                    })  
                
            });
            
        }
        const generateRanksColumn = (idOfGame, dateOfGame,turn) => {
            let picks;
            if (turn == 1) {
                console.log("in the if")
                picks = "captain1picks"
                }
            else {
                console.log("in the else")
                picks = "captain2picks"
            }
            $("#available_draft_col").text("")
            $("#dark_draft_col").text("")
            $("#white_draft_col").text("")
            console.log("picks: ", picks)
            // $("#js_content").text("")
            console.log("idOfGame in generate ranks column: ", idOfGame)
            $.ajax({ url: currentURL + "/api/rosters/" + idOfGame + "/players/"+ picks, method: "GET" }).then(function(dataFromAPI) {
                console.log("result from Query: ", dataFromAPI)
                // since non ranked players have a 0 value by default, they show before everyone in the sorted list, which we do not want 
                // therefore, we have to show the players who have a rank before the ones who have a rank of 0
                let alreadyRankedPlayers = []
                // determine which players already have a rank, and push them to a dedicated array
                if (turn == 1) {
                    console.log("Another if")
                    dataFromAPI.forEach((e,i) => {
                        if(e.captain1Pick > 0) {
                            alreadyRankedPlayers.push(e)
                        }
                        });
                    }
                else {
                    console.log("Another else (should be in else for white")
                    dataFromAPI.forEach((e,i) => {
                        if(e.captain2Pick > 0) {
                            alreadyRankedPlayers.push(e)
                        }
                        });
                    }
                let numOfRankedPlayers = alreadyRankedPlayers.length
                // splice the players from the original array
                dataFromAPI.splice(dataFromAPI.length-alreadyRankedPlayers.length, alreadyRankedPlayers.length)
                // combine the array by "pushing" the numbered ones, before the 0 (unranked) players
                let rankedArray = alreadyRankedPlayers.concat(dataFromAPI); 

                rankedArray.forEach((e,i) => {
                    let buttonInfo = `<button class="btn btn-info navbar-btn player_button empty_button"><span class="rank_num">${i+1}</span></button>`
                    if (turn == 1) {
                        if(e.captain1Pick > 0) {
                            buttonInfo = `<span class="rank_num_picked">${i+1}</span>. <button class="btn btn-info navbar-btn player_button empty_button not_that_empty" id="${e.id}" player="${e.player}">${e.player}</button>`
                        }
                    }
                    else {
                        if(e.captain2Pick > 0) {
                            buttonInfo = `<span class="rank_num_picked">${i+1}</span>. <button class="btn btn-info navbar-btn player_button empty_button not_that_empty" id="${e.id}" player="${e.player}">${e.player}</button>`
                        }
                    }
                    let pickDiv = `<div class="pick_check">`
                    let divSet = `${pickDiv}${buttonInfo}`
                    $("#white_draft_col").append(divSet)
                    });
                })
            }
        


    $(document).on("click", ".pick_dark", function (){
        let playerId = $(this).attr("id");
        let playerName = $(this).attr("player");
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        console.log("playerId: ",playerId,"playerName: ",playerName,"gameId: ",gameId,"locked: ", locked)
        getCaptainPicks(gameId,playerId,gameId,1)
        })

    $(document).on("click", ".pick_white", function (){
        let playerId = $(this).attr("id");
        let playerName = $(this).attr("player");
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        console.log("playerId: ",playerId,"playerName: ",playerName,"gameId: ",gameId,"locked: ", locked)
        getCaptainPicks(gameId,playerId,gameId,2)
        })

        function getCaptainPicks(idOfGame,idOfPlayer,dateOfGame,turn){
            let picks;
            if (turn == 1) {
                picks = "captain1picks"
            }
            else {
                picks = "captain2picks"
            }
            $.ajax({ url: currentURL + "/api/rosters/" + idOfGame + "/players/" + picks, method: "GET" }).then(function(dataFromAPI) {
            let lastRank 
            if (turn == 1) {
                lastRank = dataFromAPI[dataFromAPI.length-1].captain1Pick
                }
            else {
                lastRank = dataFromAPI[dataFromAPI.length-1].captain2Pick
            }
            
            let nextRank = lastRank + 1;
            console.log("NextRank: ",nextRank)
            $.ajax({ url: currentURL + "/api/rosters/" + idOfPlayer + "/" + nextRank + "/" + picks, method: "PUT"}).then(function(dataFromAPI) {
                console.log("response from API", dataFromAPI)
                generatePlayerColumn(idOfGame,dateOfGame,turn)
                generateRanksColumn(idOfGame,dateOfGame,turn)
                })
            })
        }















});