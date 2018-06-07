$(document).ready(function() {
    console.log("Executing code 402: kill all humans")
    const currentURL = window.location.origin;
    
    let team1Array = [];
    let team2Array = [];
    let arrayOfAvailablePlayers = [];

    let ultimateLength;
    let darkObject = {}
    let whiteObject = {}

    let team1Name = "Dark"
    let team2Name = "White"

    // clicking on "Set White Picks" should trigger the pick setting page
    $("#picks_dark").click(function (){
        $("#setting_the_picks").remove();
        // resetting the array as we reset the column
        team1Array = [];
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date")
        let locked = $(this).attr("locked");
        // will need to curry this
        $.when($.ajax(generatePlayerColumn(gameId,gameDate,1))).then(function() {
            // execute function 2 after function1
            generateRanksColumn(gameId,gameDate,1)
            });
        });
    // clicking on "Set White Picks" should trigger the pick setting page
    $("#picks_white").click(function (){
        $("#setting_the_picks").remove();
        // resetting the array as we reset the column
        team2Array = [];
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
            
            console.log("idOfGame in generatePlayerColumn", idOfGame)
            $.ajax({ url: currentURL + "/api/rosters/game/" + idOfGame + "/availability/1/player/ASC", method: "GET" }).then(function(dataFromAPI) {        
                // console.log("dataFromAPI in generatePlayerColumn: ", dataFromAPI)
                dataFromAPI.forEach((e,i) => {
                    if (turn == 1) {
                        if(e.captain1Pick < 1) {
                            let divPick = `<div class="pick_check" id="${e.id}" availability="${e.availability}">`
                            let playerButton = `<button class="btn btn-info navbar-btn player_button regular_grey" id="${e.id}" player="${e.player}">${e.player}</button>`
                            let rightArrowButton = `<i class="fa fa-arrow-circle-o-right pick_dark pick_arrows arrows" id="${e.id}" player="${e.player}" game_date="${dateOfGame}" game_id="${e.GameId}"></i>`
                            let defaultSet = `${divPick} ${playerButton}${rightArrowButton}`
                            $("#dark_draft_col").append(defaultSet)
                            }
                        }
                    else {        
                        if(e.captain2Pick < 1) {
                            let divPick = `<div class="pick_check" id="${e.id}" availability="${e.availability}">`
                            let playerButton = `<button class="btn btn-info navbar-btn player_button regular_grey" id="${e.id}" player="${e.player}">${e.player}</button>`
                            let rightArrowButton = `<i class="fa fa-arrow-circle-right pick_white pick_arrows arrows" id="${e.id}" player="${e.player}" game_date="${dateOfGame}" game_id="${e.GameId}"></i>`
                            let defaultSet = `${divPick} ${playerButton}${rightArrowButton}`
                            $("#dark_draft_col").append(defaultSet)
                            }
                        }
                    })  
                
            });
            
        }
        const generateRanksColumn = (idOfGame, dateOfGame, turn) => {
            let picks;
            if (turn == 1) {
                picks = "captain1picks"
                }
            else {
                picks = "captain2picks"
            }
            $("#available_draft_col").text("")
            $("#dark_draft_col").text("")
            $("#white_draft_col").text("")
            // getting sorted picks for capt1 and capt2 in their respective turns
            // $.ajax({ url: currentURL + "/api/rosters/4/players/captain1picks", method: "GET" }).then(function(dataFromAPI) {
            $.ajax({ url: currentURL + "/api/rosters/" + idOfGame + "/players/" + picks, method: "GET" }).then(function(dataFromAPI) {
                ultimateLength = dataFromAPI.length;
                // since non ranked players have a 0 value by default, they show before everyone in the sorted list, which we do not want 
                // therefore, we have to show the players who have a rank before the ones who have a rank of 0
                let alreadyRankedPlayers = []
                // determine which players already have a rank, and push them to a dedicated array
                // we do this for the first captain
                if (turn == 1) {
                    dataFromAPI.forEach((e,i) => {
                        if(e.captain1Pick > 0) {
                            alreadyRankedPlayers.push(e)
                        }
                    });
                }
                // we do this as well (separately) for the second captain (not looking at same value in db)
                else {
                    dataFromAPI.forEach((e,i) => {
                        if(e.captain2Pick > 0) {
                            alreadyRankedPlayers.push(e)
                        }
                    });
                }
                
                console.log("alreadyRankedPlayers after pushed to be separated from 0 rank: ", alreadyRankedPlayers)
                let numOfRankedPlayers = alreadyRankedPlayers.length
                let rankedArray = [];
                
                // if any player has a rank over 0 at all
                if (numOfRankedPlayers > 0) {
                    // splice the players from the original array
                    dataFromAPI.splice(dataFromAPI.length-alreadyRankedPlayers.length, alreadyRankedPlayers.length)
                    // combine the array by "pushing" the numbered ones, before the 0 (unranked) players
                    rankedArray = alreadyRankedPlayers.concat(dataFromAPI);
                    }
                console.log("rankedArray after the splice: ", rankedArray)
                // everything correct up to this point

                // when all players are ranked, push them to the global variable to enable the computer draft
                if (turn == 1) {
                    if (numOfRankedPlayers === ultimateLength) {
                        for (let i = 0; i < alreadyRankedPlayers.length; i++) {
                            team1Array.push(alreadyRankedPlayers[i].player)
                            console.log("team1Array: ", team1Array)
                            }
                        }
                    }
                else {
                    if (numOfRankedPlayers === ultimateLength) {
                        for (let i = 0; i < alreadyRankedPlayers.length; i++) {
                            team2Array.push(alreadyRankedPlayers[i].player)
                            console.log("team2Array: ", team2Array)
                            }
                        }
                    }
                    
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
                    
                
                    
                        

                        let TeamObject = function (name,picks) {
                            this.name = name,
                            this.picks = picks
                        }

                        if (team1Array.length === team2Array.length && team1Array.length === ultimateLength) {
                            let darkObject = new TeamObject ("dark", team1Array)
                            let whiteObject = new TeamObject ("white", team2Array)
                            
                            console.log("darkObject: ", darkObject)
                            console.log("whiteObject: ", darkObject)
                        }
                })
            }
        

    // getting attributes when clicking on the pick arrow of respective teams
    $(document).on("click", ".pick_dark", function (){
        let playerId = $(this).attr("id");
        let playerName = $(this).attr("player");
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        getCaptainPicks(gameId,playerId,gameId,1)
        })

    $(document).on("click", ".pick_white", function (){
        let playerId = $(this).attr("id");
        let playerName = $(this).attr("player");
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        getCaptainPicks(gameId,playerId,gameId,2)
        })

    // function that gives a rank to the player
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
            $.ajax({ url: currentURL + "/api/rosters/" + idOfPlayer + "/" + nextRank + "/" + picks, method: "PUT"}).then(function(dataFromAPI) {
                // we re-render our columns
                generatePlayerColumn(idOfGame,dateOfGame,turn)
                generateRanksColumn(idOfGame,dateOfGame,turn)
                })
            })
        }
    $("#reset").click(function() {
        let team1Array = [];
        let team2Array = [];
        console.log("team1Array: ", team1Array)
        console.log("team2Array: ", team2Array)
    })

    
    $("#serpentine_draft").click(function() {
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        let team1Name = "dark";
        let team2Name = "white";
        // launch only if teams have not been reset
        if (team1Array.length !== 0 && team2Array.length !== 0) {
            getAvailablePlayers(gameId,serpentineDraft,darkObject,whiteObject,arrayOfAvailablePlayers)
            }
        else {
            console.log("Arrays are empty, send error message")
        }
        })
        
        function getAvailablePlayers(idOfGame,cb,darkObj,whiteObj,availabilities) {
            $.ajax({ url: currentURL + "/api/rosters/game/" + idOfGame + "/availability/1/player/ASC", method: "GET" })
                .then(function(dataFromAPI) {
                    dataFromAPI.forEach((e) => {
                        availabilities.push(e.player)
                        if (availabilities.length === dataFromAPI.length) {
                            console.log("darkObj (in getAvail function): ", darkObj)
                            console.log("whiteObj (in getAvail function): ", whiteObj)
                            console.log("arrayOfAvailablePlayers (in getAvail function): ", availabilities)

                            cb(darkObj,whiteObj,availabilities)
                            }
                        })
                    })
                }
/////////////////////////////////
/// Machine Drafting function ///
/////////////////////////////////

// function to create a "serpentine" type draft 
// Aka: captain #1 drafts first pick, then captain #2 has the next 2 picks, etc. until everyone is drafted
// utility function to get a player from a "pick" array, and push it to the roster array
const pick = (index,inputArray, outputArray) => {
    let name = inputArray.name;
    let picks = inputArray.picks;
    // assigns the name of the team to the drafted player (to filter later on)
    picks[index].team = name;
    // takes the pick, pushes it to the output array
    outputArray.push(picks[index]);
    // removes the pick from the array of picks
    picks.splice(index,1);
    }   



// utility function to test if a pick is eligble to be pushed to the roster array. If not, moves on to the next pick. 
const testPick = (inputArray,outputArray,availabilities) => {
    console.log("this is the inputArray: ", inputArray)
    let index = 0;
    let picks = inputArray.picks;
    console.log("picks: ",picks)
    // check availability of player (that might have changed since he was picked), and if he was pick already).
    if (availabilities.indexOf(picks[index]) == -1 || outputArray.indexOf(picks[index]) !== -1) {
        // Either of these conditions is not met, player is removed from array
        picks.splice(index,1);
        // function is called recursively on the next element of the array
        testPick(inputArray,outputArray,availabilities);
        }
    else { 
        // Player is drafted           
        pick(index,inputArray,outputArray);        
        }
    }


const serpentineDraft = (team1, team2, availabilities) => {
    console.log("availabilities: ", availabilities)
    console.log("team 1", team1)
    let mixedRosters = [];    
    let num = availabilities.length;
    // there are 4 turns to complete a round
    let turns = 4;
    let modulo = num % turns;
    let completeRounds = (num - modulo)/turns
    
    if (modulo === 0) {
        // if the num of players allows for complete rounds of serpentine draft
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,mixedRosters,availabilities);
            testPick(team2,mixedRosters,availabilities);
            testPick(team2,mixedRosters,availabilities);
            testPick(team1,mixedRosters,availabilities);
            }
        }
    else {
        // if not, we have to run as many complete rounds as possible
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,mixedRosters,availabilities);
            testPick(team2,mixedRosters,availabilities)
            testPick(team2,mixedRosters,availabilities)
            testPick(team1,mixedRosters,availabilities);
            }
        // and complete the rosters one player at a time
        switch (modulo !== 0) {
            case modulo === 1:
            testPick(team1,mixedRosters,availabilities);
            break;
            case modulo === 2:
            testPick(team1,mixedRosters,availabilities);
            testPick(team2,mixedRosters,availabilities);
            break;
            case modulo === 3:
            testPick(team1,mixedRosters,availabilities);
            testPick(team2,mixedRosters,availabilities);
            testPick(team1,mixedRosters,availabilities);
            break;
            }
        }
        console.log(mixedRosters)
    filterTeams(mixedRosters)
    }

// function to create an "alternate" type draft 
// Aka: captain #1 drafts first pick, then captain #2 drafts, etc. until everyone is drafted
const alternateDraft = (team1, team2, availabilities) => {
    console.log("availabilities: ", availabilities)
    let mixedRosters = [];
    let num = availabilities.length;
    // there are 4 turns to complete a round
    let turns = 2;
    let modulo = num % turns;
    let completeRounds = (num - modulo)/turns
    if (modulo === 0) {
        // if the num of players allows for complete rounds of serpentine draft
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,mixedRosters,availabilities);
            testPick(team2,mixedRosters,availabilities);
            }
        }
    else {
        // if not, we have to run as many complete rounds as possible
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,mixedRosters,availabilities);
            testPick(team2,mixedRosters,availabilities)
            }
        // and complete the rosters with one more pick
            testPick(team1,mixedRosters,availabilities);
        }
        filterTeams(mixedRosters)
    }
    // function to filter array of player objects into teams
    // (each player object has been assigned a team name)
    const filterTeams = (arrayOfPlayerObjects) => {
        let rosterTeam2 = [];
        let rosterTeam1 = [];

        // filter player objects according to name of the team #1
        rosterTeam1 = arrayOfPlayerObjects.filter((e) => e.team === team1Name)
        console.log(`\n************\n${team1Name}:\n************\n`);
        // display the shortname of the player objects for the whole team
        rosterTeam1.forEach((e) => {
            console.log(`${e.shortname} (${e.level})`);
            })
        // filter player objects according to name of the team #2
        rosterTeam2 = arrayOfPlayerObjects.filter((e) => e.team === team2Name)
        console.log(`\n************\n${team2Name}:\n************\n`);
        // display the shortname of the player objects for the whole team
        rosterTeam2.forEach((e) => {
            console.log(`${e.shortname} (${e.level})`);
            })
        }

});