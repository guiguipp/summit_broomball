$(document).ready(function() {
    console.log("Concern: the stats page")
    $(".statscontent_hidden").hide();

    ///////////////////////////////////////
    ////// Stats specific javascript //////
    ///////////////////////////////////////
    const currentURL = window.location.origin;

    // shows the list of past games (had to be specific to that page because of the toggle on the draft page)
    function seeOnlyPastGames() {
        // emptying the div so that it does not keep appending when the data is refreshed
        $("#list_of_games").text("");
        $.ajax({ url: currentURL + "/api/games/past", method: "GET" }).then(function(dataFromAPI) {
            dataFromAPI.forEach((e) => {
                let gameButton = `<div game_id=${e.id} class="game_results" locked="${e.lock_info}" game_date="${e.game_date}"> <button class="btn btn-info navbar-btn regular-grey game_button">${e.game_date}</button>\n`
                let gameDiv = `${gameButton}`
                $("#list_of_games").append(gameDiv);
                });
            })
        }
    
    // showing the players for the selected/played game
    $(document).on("click",".game_results", function (){
        let gameId = $(this).attr("game_id");
        let locked = $(this).attr("locked");
        console.log("checking for game: ",gameId)
        // updateScoreDisplayed(gameId)
        $.when($.ajax(updateScoreDisplayed(gameId))).then(function(){
            showGameStats(gameId,locked)
            lockStats(gameId,locked)
            })
        // lockStats(gameId,locked,updateScoreDisplayed)
        // showGameStats(gameId,locked)
        })
    // sending the attr to the lock and unlock buttons 
    const lockStats = (idOfGame,lockStatus) => {
        $("#unlock_all_info_stats").attr("game_id",idOfGame)
        $("#unlock_all_info_stats").attr("locked",lockStatus)
        $("#lock_all_info_stats").attr("game_id",idOfGame)
        $("#lock_all_info_stats").attr("locked",lockStatus)
        }

    function showGameStats(idOfGame,lockStatus,cb){
        $(".statscontent_hidden").show();
        $("#results_dark").text("");
        $("#results_white").text("");
        
        if (lockStatus === "true") {
            lockStatus = true;
            }
        else if (lockStatus === "false") {
            lockStatus = false;
            }

        $.ajax({ url: currentURL + "/api/rosters/game/" + idOfGame + "/availability/1/player/ASC", method: "GET" }).then(function(dataFromAPI) {
            console.log(dataFromAPI)
            let darkHeader = `
            <table>
                <div id='team_dark_content'> 
                    <thead class="team_name"> 
                        <h2 id="white_score_place">Dark Team></h2>
                    </thead>
                    <thead> 
                        <tr id="table_header"> 
                            <th class="table_col_name">Player</th> 
                            <th class="table_col_name">Goals</th>
                            <th class="table_col_name">Assists</th>
                        </tr> 
                    </thead>
                </div>
            
                <tbody id="table_body_dark"> 
                </tbody> 
            </table>`
            $("#results_dark").append(darkHeader)
            
            let whiteHeader = `
            <table>
                <div id='team_white_content'> 
                    <thead id="team_name"> 
                        <h2 id="white_score_place">White Team></h2>
                    </thead>
                    <thead> 
                        <tr id="table_header"> 
                            <th class="table_col_name">Player</th> 
                            <th class="table_col_name">Goals</th>
                            <th class="table_col_name">Assists</th>
                        </tr> 
                    </thead>
                </div>
                <tbody id="table_body_white"> 
                    
                </tbody>
            </table>`
            $("#results_white").append(whiteHeader)
            
            for(i=0; i < dataFromAPI.length; i++){
                let d = dataFromAPI[i];
                
                let plusGoalButton = `<i class="fa fa-plus-circle stat_button add_goal" locked="${lockStatus}" player_id="${d.id}" player="${d.player}" game_id="${idOfGame}" team="${d.team}" current_tot="${d.goals}"></i>`
                let plusAssistButton = `<i class="fa fa-plus-circle stat_button add_assist" locked="${lockStatus}" player_id="${d.id}" player="${d.player}" game_id="${idOfGame}" team="${d.team}" current_tot="${d.assists}" ></i>`
                let minusGoalButton = `<i class="fa fa-minus-circle stat_button substract_goal" locked="${lockStatus}" player_id="${d.id}" player="${d.player}" game_id="${idOfGame}" team="${d.team}" current_tot="${d.goals}"></i>`
                let minusAssistButton = `<i class="fa fa-minus-circle stat_button substract_assist" locked="${lockStatus}" player_id="${d.id}" player="${d.player}" game_id="${idOfGame}" team="${d.team}" current_tot="${d.assists}"></i>`
                
                if (lockStatus === true) {
                    plusGoalButton = "";
                    plusAssistButton = "";
                    minusGoalButton = "";
                    minusAssistButton = "";
                }

                if (d.team === "dark") {
                    let rowDark = `
                        <tr> 
                            <td class="table_data name_in_table">${d.player}</td> 
                            <td class="table_data stats"> <div class="insecable"> <h4> ${plusGoalButton} <span class="raw_data">${d.goals}</span> ${minusGoalButton}</h4> </div> </td> 
                            <td class="table_data stats"> <div class="insecable"> <h4> ${plusAssistButton} <span class="raw_data"> ${d.assists} </span> ${minusAssistButton} </h4> </div> </td>
                        </tr>`
                    $("#table_body_dark").append(rowDark)
                    }
                else if (d.team === "white") {
                    let rowWhite = `
                        <tr> 
                            <td class="table_data name_in_table">${d.player}</td> 
                            <td class="table_data stats"> <div class="insecable"> <h4> ${plusGoalButton} <span class="raw_data">${d.goals}</span> ${minusGoalButton} </h4> </div> </td> 
                            <td class="table_data stats"> <div class="insecable"> <h4> ${plusAssistButton} <span class="raw_data"> ${d.assists} </span> ${minusAssistButton} </h4> </div> </td>
                        </tr>`
                    $("#table_body_white").append(rowWhite)
                    }
                }
            });
            // cb(idOfGame)            
        };
    function updateScoreDisplayed(idOfGame){
        $.ajax({ url: currentURL + "/api/rosters/" + idOfGame + "/score/white", method: "GET" }).then(function(dataFromAPI) {
            $("#results_white").empty()
            let whiteScore = `<h2>${dataFromAPI[0].goals}</h2>`
            $("#results_white").prepend(whiteScore)
            console.log("whiteScore: ", whiteScore)
            })
        $.ajax({ url: currentURL + "/api/rosters/" + idOfGame + "/score/dark", method: "GET" }).then(function(dataFromAPI) {
            $("#results_dark").empty()
            let darkScore = `<h2>${dataFromAPI[0].goals}</h2>`
            console.log("darkScore: ", darkScore)
            $("#results_dark").prepend(darkScore)
            })
        }

        $(document).on("click",".stat_button",function(){
            let lockStatus = $(this).attr("locked");
            if (lockStatus === "true") {
                lockStatus = true;
                }
            else if (lockStatus === "false") {
                lockStatus = false;
                }

            if (lockStatus != true) {
                let gameId = $(this).attr("game_id");
                let playerId = $(this).attr("player_id");
                let playerName  = $(this).attr("player");
                let playerTeam = $(this).attr("team");
                let buttonClass = $(this).attr("class");
                let currentValue = parseInt($(this).attr("current_tot"))
                
                buttonClass = buttonClass.replace("fa fa-minus-circle stat_button","").replace("fa fa-plus-circle stat_button","");
                let newValue;
                
                switch(buttonClass) {
                    case buttonClass = " add_goal":
                        console.log("Case add_goal")
                        newValue = currentValue + 1;
                        // need to updateScore
                            updateGoal(playerId,newValue,showGameStats,gameId,lockStatus,updateScoreDisplayed)
                        break;
                        
                    case buttonClass = " add_assist":
                        console.log("Case add_assist")
                        newValue = currentValue + 1;
                        // updateScoreDisplayed(gameId)
                        updateAssist(playerId,playerName,newValue,showGameStats,gameId,lockStatus,updateScoreDisplayed);
                        break;

                    case buttonClass = " substract_goal":    
                        console.log("Case substract_goal")
                        newValue = currentValue - 1;
                        if(newValue >= 0) {
                            // need to updateScore
                            updateGoal(playerId,newValue,showGameStats,gameId,lockStatus,updateScoreDisplayed)
                        
                            }
                        break;

                    case buttonClass = " substract_assist":
                        console.log("Case substract_assist")
                        newValue = currentValue - 1;
                        if(newValue >= 0) {
                            // updateScoreDisplayed(gameId)
                            updateAssist(playerId,playerName,newValue,showGameStats,gameId,lockStatus,updateScoreDisplayed);
                            }
                        break;
                    }
                }
                else {
                    console.log("Could display an error message... ?")
                }
            });
        // }

    // update # of goals
    function updateGoal(idOfPlayer, newGoalTotal, cb,gameId,lockStatus,cb2) {
        $.ajax({ 
            url: currentURL + "/api/rosters/" + idOfPlayer + "/goals", 
            method: "PUT",
            data: jQuery.param({goals: newGoalTotal}) 
            }).then(function(dataFromAPI) {
                if (dataFromAPI[1] === 1) {
                    cb(gameId,lockStatus,cb2(gameId))
                    }
                })
            }
    // update # of assists
    function updateAssist(idOfPlayer, playerName, newAssistTotal,cb,gameId,lockStatus,cb2) {
        $.ajax({ 
            url: currentURL + "/api/rosters/" + idOfPlayer + "/assists", 
            method: "PUT",
            data: jQuery.param({assists: newAssistTotal}) 
            }).then(function(dataFromAPI) {
                if (dataFromAPI[1] === 1) {
                    cb(gameId,lockStatus,cb2(gameId))
                    }
                })
            }
    /*
    function oneAfterTheOther(func, idOfGame,lockStatus,cb) {
        func(idOfGame,lockStatus,cb)
            cb(idOfGame)
        }
    */
    $("#unlock_all_info_stats").click(function(){
        let gameId = $(this).attr("game_id");
        let locked = false;
        console.log(`Data from the lock.\ngameId: ${gameId}\nCurrently locked?: ${locked}`)
        
        $.ajax({    
            url: currentURL + "/api/game/" + gameId + "/lock", 
            data: jQuery.param({lock_info: locked}), 
            method: "PUT" }).then(function(dataFromAPI) {
                $.when($.ajax(updateScoreDisplayed(gameId))).then(function(){
                    showGameStats(gameId,locked)
                    lockStats(gameId,locked)
                })
                // showGameStats(gameId,locked)//,updateScoreDisplayed)
                // showGameStats(gameId,locked)
            })
        })
    // unlock game
    $("#lock_all_info_stats").click(function(){
        let gameId = $(this).attr("game_id");
        let locked = true;
        console.log(`Data from the lock.\ngameId: ${gameId}\nCurrently locked?: ${locked}`)
        $.ajax({    
            url: currentURL + "/api/game/" + gameId + "/lock", 
            data: jQuery.param({lock_info: locked}), 
            method: "PUT" }).then(function(dataFromAPI) {
                $.when($.ajax(updateScoreDisplayed(gameId))).then(function(){
                    showGameStats(gameId,locked)
                    lockStats(gameId,locked)
                })
            })
        })

    seeOnlyPastGames()
    });