$(document).ready(function() {
    console.log("Concern: the draft page")
 
    ////////////////////////////////////////
    /////////// Global Variables ///////////
    ////////////////////////////////////////
    const currentURL = window.location.origin;
    
    let team1Array = [];
    let team2Array = [];
    let arrayOfAvailablePlayers = [];
    
    const team1Name = "dark";
    const team2Name = "white";
    
    ////////////////////////////////////////
    /////// JQuery element handling ////////
    ////////////////////////////////////////
        
    $(".content_hidden").hide();
    
    // creating the game on "Submit" event
    $("#schedule_game").submit(function(e) {
        let date = $('#date').val()
        // sending the date of the form to the API via an iife
            $.ajax({ 
                url: currentURL + "/api/games", 
                method: "POST",
                data: jQuery.param({game_date: date}) 
            })
            .then(function(result) {
                // need validation of the API (if true, or something...)
                // this is the id of the newly created game 
                addPlayersToDraft(result.id,"member")
                seeUpcomingGames()
            })
        // preventing the page to refresh
        e.preventDefault();
        // emptying the form
        $('#date').val("")
        });

    // alternating between show future and past games
    $("#games_to_show").click(function (){
        let gamesDate = $(this).attr("which-list");
        if (gamesDate === "past") {
            $("#games_to_show").attr("which-list","future")
            $("#games_to_show").html('Upcoming Games');
            $("#existing_game").html("<p id='game_text'><br>Past games</p><div id='game_list'></div>")
            seePastGames()
            }
        else {
            $("#games_to_show").attr("which-list","past")
            $("#games_to_show").html('Past Games');
            $("#existing_game").html("<p id='game_text'><br>Upcoming games</p><div id='game_list'></div>")
            seeUpcomingGames()
            }
        });
    
    // lock game
    $("#unlock_all_info").click(function(){
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = false;
        
        console.log(`Data from the lock.\ngameId: ${gameId}\ngameDate:${gameDate}\nCurrently locked?: ${locked}`)
        $.ajax({    
            url: currentURL + "/api/game/" + gameId + "/lock", 
            data: jQuery.param({lock_info: locked}), 
            method: "PUT" }).then(function(dataFromAPI) {
                setDataAttr(gameId,gameDate,locked)
                getAvailablePlayers(gameId,gameDate,locked)
                // updateScoreDisplayed(gameId)   
            })
        })
    // unlock game
    $("#lock_all_info").click(function(){
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = true;
        
        console.log(`Data from the lock.\ngameId: ${gameId}\ngameDate:${gameDate}\nCurrently locked?: ${locked}`)
        $.ajax({    
            url: currentURL + "/api/game/" + gameId + "/lock", 
            data: jQuery.param({lock_info: locked}), 
            method: "PUT" }).then(function(dataFromAPI) {
                setDataAttr(gameId,gameDate,locked)
                getAvailablePlayers(gameId,gameDate,locked)
                // updateScoreDisplayed(gameId)   
                })
            })

    // sets the player as unavailable after a click on the "remove" icon 
    $(document).on("click", ".remove_player", function (){
        let playerId = $(this).attr("id");
        let gameId = $(this).attr("game_id");
        let playerName = $(this).attr("player");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        $.ajax({ 
            url: currentURL + "/api/rosters/" + playerId, 
            method: "PUT",
            data: jQuery.param({availability: false, player: playerName}) 
            }).then(function(dataFromAPI) {
                getAvailablePlayers(gameId,gameDate,locked)   
                });
            });
    // deletes a game after a click on the "remove" icon
    $(document).on("click", ".remove_game", function (){
        let gameId = $(this).attr("id");
        let gameDate = $(this).attr("game_date")
        let result = confirm("Are you sure you want to delete this game? \nAll associated information will be lost");
        if (result) {
            $.ajax({ 
                url: currentURL + "/api/games/" + gameId, 
                method: "DELETE"
                }).then(function(dataFromAPI) {
                    console.log("Game Deleted")
                    // reloads the game list
                    seeUpcomingGames()
                    // re-hides the section to not show roster for suppressed game
                    $(".content_hidden").hide();            
                    });
            }
        });

    // drafts the player to the "dark" team after a click on the left arrow
    $(document).on("click", ".left", function (){
        let playerId = $(this).attr("id");
        let gameId = $(this).attr("game_id");
        let playerName = $(this).attr("player");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        $.ajax({ 
            url: currentURL + "/api/rosters/" + playerId, 
            method: "PUT",
            data: jQuery.param({team: "dark", player: playerName}) 
            }).then(function(dataFromAPI) {
                getAvailablePlayers(gameId,gameDate,locked)   
                });
            });

    // drafts the player to the "white" team after a click on the right arrow
    $(document).on("click", ".right", function (){
        let playerId = $(this).attr("id");
        let gameId = $(this).attr("game_id");
        let playerName = $(this).attr("player");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        $.ajax({ 
            url: currentURL + "/api/rosters/" + playerId, 
            method: "PUT",
            data: jQuery.param({team: "white", player: playerName}) 
            }).then(function(dataFromAPI) {
                getAvailablePlayers(gameId,gameDate,locked)   
                });
            });


    // toggling computer and manual draft modes so that they don't keep appending
    $("#manual_draft").click(function(){
        $("#dark_draft_col").text("")
        $("#white_draft_col").text("")
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date")
        let locked = $(this).attr("locked");
        getAvailablePlayers(gameId,gameDate,locked);
        // $("#list_with_players").show()
        // $("#setting_the_picks").hide()
        })
    $("#computer_draft").click(function(){
        $("#dark_draft_col").text("")
        $("#white_draft_col").text("")
        // $("#list_with_player").hide()
        // $("#setting_the_picks").show()
        })

    // Helper function to reset the data attr for each game  
    const setDataAttr = (idOfGame,dateOfGame,lockStatus,cb) => {
        console.log(`Setting lock status: ${lockStatus}`)
        $("#autodraft")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#reset")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#unavailable")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#ten_buckers")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#unlock_all_info")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#lock_all_info")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#picks_dark")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#picks_white")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#manual_draft")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#serpentine_draft")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#alternate_draft")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        $("#draftingFeature")
            .attr("game_id",idOfGame)
            .attr("game_date",dateOfGame)
            .attr("locked",lockStatus)
        }
    // there has to be a way to automate this... ?
    /*
    let elToUpdate = ["autodraft","reset","unavailable","ten_buckers","unlock_all_info","lock_all_info","picks_dark","picks_white","manual_draft"]
    const setDataAttr = (array,idOfGame,dateOfGame,lockStatus) => {
        array.forEach((e) => {
            let dynamicAttr = `$("#${e}").attr("game_id",${idOfGame}).attr("game_date",${dateOfGame}).attr("locked",${lockStatus})`
                    console.log("Good try?: ", dynamicAttr)
        })
        }
        */
    

    ////////////////////////////////////////
    //////// draft submenu options /////////
    ////////////////////////////////////////    
    
    
    // Assign each available player for that game to "Dark" or "White" team after click 
    $("#autodraft").click(function (){
        let availablePlayers = [];
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        if (locked === "false") {
            $.ajax({ url: currentURL + "/api/rosters/game/"+ gameId+ "/players", method: "GET" }).then(function(dataFromAPI) {
                // apply the autodraft feature to players available for that game
                $.when($.ajax(autoDraft(dataFromAPI))).then(function() {
                    //this function is executed after function1
                    getAvailablePlayers(gameId,gameDate,locked)
                    });
                });
            } 
        });

    // Assign each available player for that game to "unavailable" team after click     
    $("#reset").click(function() {
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        if (locked === "false") {
            $.ajax({ url: currentURL + "/api/rosters/game/"+ gameId +"/availability/1/player/asc", method: "GET" }).then(function(dataFromAPI) {
                function PlayerObj (id) {
                    this.id = id,
                    // this.name = name,
                    // this.team = team,
                    // this.captain1Pick = captain1Pick,
                    // this.captain2Pick = captain2Pick 
                    hardReset(this)
                    }
                    dataFromAPI.forEach((e) => {
                        // resetting the team (using "unavailable" as the team, not the status...)
                        let newPlayerObj = new PlayerObj(e.id,e.player,0,0,"unavailable")
                    })
                    getAvailablePlayers(gameId,gameDate,locked)
                })
            }
        })
    // show unavailable players
    $("#unavailable").click(function() {
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date")
        $.ajax({ url: currentURL + "/api/rosters/game/"+ gameId + "/" + "availability/0/player/ASC", method: "GET" }).then(function(dataFromAPI) {
            dataFromAPI.forEach((e) => {
                let divRosterCheck = `<div class="roster_check" id="${e.id}" availability="${e.availability}">`
                let playerButton = `<button class="btn btn-info navbar-btn unavailable player_button" id="${e.id}" player="${e.player}" game_id="${e.GameId}" game_date=${gameDate}>${e.player}</button>`
                let availablePlayerDiv = `${divRosterCheck} ${playerButton}`
                $("#available_draft_col").append(availablePlayerDiv)
                });
            })
        })
    // make unavailable member available again
    $(document).on("click", ".unavailable", function (){
        let playerId = $(this).attr("id");
        let playerName = $(this).attr("player");
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        $.ajax({ 
            url: currentURL + "/api/rosters/" + playerId, 
            method: "PUT",
            data: jQuery.param({availability: true, player: playerName}) 
            }).then(function(dataFromAPI) {
                getAvailablePlayers(gameId,gameDate,locked)   
                });
            });
    // add non-members to the list of draftable players
    $("#ten_buckers").click(function() {
        $("#available_draft_col").empty()
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        console.log("Click recorded\ngameId: ",gameId,"\ngameDate: ",gameDate)
        $.ajax({ url: currentURL + "/api/players/ten_bucker", method: "GET" })
        .then(function(dataFromAPI) {
            dataFromAPI.forEach((e) => {
                let divRosterCheck = `<div class="roster_check" id="${e.id}" availability="${e.availability}">`
                let playerButton = `<button class="btn btn-info navbar-btn not_a_member player_button" id="${e.id}" player="${e.shortname}" game_id="${gameId}" game_date=${gameDate}>${e.shortname}</button>`
                let availablePlayerDiv = `${divRosterCheck} ${playerButton}`
                $("#available_draft_col").append(availablePlayerDiv)
                });
            })
        })

    // clicking on a ten bucker adds them to the list of available players
    $(document).on("click",".not_a_member", function (){
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let playerName = $(this).attr("player");
        let locked = $(this).attr("locked");
        let newPlayerforDraft = {
            game: gameId,
            name: playerName
            }
        console.log("Player obj without constructor: ", newPlayerforDraft)
        $.ajax({ 
            url: currentURL + "/api/rosters", 
            method: "POST",
            data: jQuery.param({GameId: newPlayerforDraft.game, player: newPlayerforDraft.name, editable: false, availability: true}) 
            }).then(function(){
            getAvailablePlayers(gameId,gameDate,locked)
            })    
        });
////////////////////////////////////////
///////// Team Picking JQuery //////////
////////////////////////////////////////

    // clicking on "Set White Picks" should trigger the pick setting page
    $("#picks_dark").click(function (){
        $("#setting_the_picks").remove();
        // resetting the array as we reset the column
        team1Array = [];
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date")
        let locked = $(this).attr("locked");
        // will need to curry this
        /*
        $.when($.ajax(generatePlayerColumn(gameId,gameDate,1))).then(function() {
            // execute function 2 after function1
            generateRanksColumn(gameId,gameDate,1)
            });
        */
        generatePlayerColumn(gameId,gameDate,1)
        generateRanksColumn(gameId,gameDate,1)
        // ranksAfterColumn(generatePlayerColumn(gameId,gameDate,2))(generateRanksColumn(gameId,gameDate,1))
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

    $("#reset").click(function() {
        let team1Array = [];
        let team2Array = [];
        console.log("team1Array: ", team1Array)
        console.log("team2Array: ", team2Array)
        })

    $("#draftingFeature").click(function(){
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        let team1Name = "dark";
        let team2Name = "white";
        let darkObject = {
            name: team1Name,
            picks: team1Array
            }
        let whiteObject = {
            name: team2Name,
            picks: team2Array
            }
        // launch only if teams have not been reset
        if (team1Array.length === 0 || team2Array.length === 0) {
            console.log("Either array is empty, send error message")
        }
        else {
            /*
            console.log("will push the availabilities")
            quickAvailabilities(gameId) */
            // console.log("Checking format of objects in availabilities ", arrayOfAvailablePlayers[0])
            $("#serpentine_draft").click(function() {
                console.log("click recorded")
                let gameId = $(this).attr("game_id");
                let gameDate = $(this).attr("game_date");
                let locked = $(this).attr("locked");
                let team1Name = "dark";
                let team2Name = "white";
                if (locked === "false") {
                    $.when($.ajax(serpentineDraft(darkObject,whiteObject,arrayOfAvailablePlayers))).then(function() {
                        //this function is executed after function1
                        getAvailablePlayers(gameId,gameDate,locked)
                        })
                    }
                });
            $("#alternate_draft").click(function() {
                console.log("click recorded")
                let gameId = $(this).attr("game_id");
                let gameDate = $(this).attr("game_date");
                let locked = $(this).attr("locked");
                let team1Name = "dark";
                let team2Name = "white";
                console.log("locked needs to be false: ", locked)
                if (locked === "false") {
                    $.when($.ajax(alternateDraft(darkObject,whiteObject,arrayOfAvailablePlayers))).then(function() {
                        //this function is executed after function1
                        getAvailablePlayers(gameId,gameDate,locked)
                        })
                    }
                })


            }
        });   


////////////////////////////////////////
//////////// Page Functions ////////////
////////////////////////////////////////


    // adding all members to game created  
    const addPlayersToDraft = (gameId,status) => {
        $.ajax({ url: currentURL + "/api/players/" + status, method: "GET" })
        .then(function(dataFromAPI) {
            function PlayerObj (game,name,membershipStatus) {
                this.game = game,
                this.name = name,
                this.membershipStatus = membershipStatus,
                fromPlayerToRoster(this)
                }
                dataFromAPI.forEach((e) => {                
                    let newPlayerObj = new PlayerObj (gameId,e.shortname,status)
                    });
                })
            }
    // helper function to push players to the roster table when a game is created (set availability to true)   
    const fromPlayerToRoster = (player) => {
        $.ajax({ 
                url: currentURL + "/api/rosters", 
                method: "POST",
                data: jQuery.param({GameId: player.game,player:player.name, editable: false, availability: true}) 
                })
            }
    // shows the list of future games
    function seeUpcomingGames() {
        // emptying the div so that it does not keep appending when the data is refreshed
        $("#game_list").text("");
        $.ajax({ url: currentURL + "/api/games/upcoming", method: "GET" }).then(function(dataFromAPI) {
            dataFromAPI.forEach((e) => {
                let gameButton = `<div id=${e.id} class="future_game" locked="${e.lock_info}" game_date="${e.game_date}"> <button class="btn btn-info navbar-btn regular_grey game_button">${e.game_date}</button>\n`
                let removeButton = `<i class="fa fa-times-circle remove remove_game" id="${e.id}" game_date="${e.game_date}"></i>`
                let gameDiv = `${gameButton} ${removeButton}`
                $("#game_list").append(gameDiv);
                });
            })
        }
    // shows the list of past games
    function seePastGames() {
        // emptying the div so that it does not keep appending when the data is refreshed
        $("#game_list").text("");
        $.ajax({ url: currentURL + "/api/games/past", method: "GET" }).then(function(dataFromAPI) {
            dataFromAPI.forEach((e) => {
                let gameButton = `<div id=${e.id} class="future_game" locked="${e.lock_info}" game_date="${e.game_date}"> <button class="btn btn-info navbar-btn regular_grey game_button">${e.game_date}</button>\n`
                // let removeButton = `<i class="fa fa-times-circle remove remove_game" id="${e.id}" game_date="${e.game_date}"></i>`
                let gameDiv = `${gameButton}`//`${gameButton} ${removeButton}` // not sure we want a remove button for past games
                $("#game_list").append(gameDiv);
                });
            })
        }
    // this shows the players available for a given game after a click on one of the games  
    function showTeams(){
        $(document).on("click", ".future_game", function (){
            $(".content_hidden").show();
            let id = $(this).attr("id");
            let gameDate = $(this).attr("game_date")
            let locked = $(this).attr("locked");
            console.log("Locked? ",locked);
            setDataAttr(id,gameDate,locked); 
            getAvailablePlayers(id,gameDate,locked);
        })
    };

    // shows players in their respective columns, according to the team they have been drafted to
    function getAvailablePlayers(idOfGame,dateOfGame,lockStatus) {
        $.ajax({ url: currentURL + "/api/rosters/game/" + idOfGame + "/availability/1/player/ASC", method: "GET" }).then(function(dataFromAPI) {
            $("#available_draft_col").text("")
            $("#dark_draft_col").text("")
            $("#white_draft_col").text("")
            $("#js_content").text("")
            $("#col1_title").text("Dark Team")
            $("#col2_title").text("White Team")
            if (lockStatus === "true") {
                lockStatus = true;
                }
            else if (lockStatus === "false") {
                lockStatus = false;
                }
            dataFromAPI.forEach((e) => {
                let divRosterCheck = `<div class="roster_check" id="${e.id}" availability="${e.availability}">`
                let playerButton = `<button class="btn btn-info navbar-btn player_button regular_grey" id="${e.id}" player="${e.player}">${e.player}</button>`
                let removeButton = `<i class="fa fa-times-circle remove remove_player" id="${e.id}" player="${e.player}" game_date="${dateOfGame}" game_id="${e.GameId}"></i>`
                let rightArrowButton = `<i class="fa fa-arrow-circle-o-right right arrows" id="${e.id}" player="${e.player}" game_date="${dateOfGame}" game_id="${e.GameId}"></i>`
                let leftArrowButton = `<i class="fa fa-arrow-circle-left left arrows" id="${e.id}" player="${e.player}" game_date="${dateOfGame}" game_id="${e.GameId}"></i>`    
                let defaultSet;
                let darkPlayersDiv;
                let whitePlayersDiv;
                if (lockStatus !== true) {
                    defaultSet = `${divRosterCheck} ${leftArrowButton}${playerButton}${removeButton}${rightArrowButton}`
                    darkPlayersDiv = `${divRosterCheck}${playerButton}${removeButton}${rightArrowButton}`
                    whitePlayersDiv = `${divRosterCheck}${leftArrowButton} ${playerButton}${removeButton}`
                    }
                else {
                    defaultSet = `${divRosterCheck} ${playerButton}`
                    darkPlayersDiv = defaultSet
                    whitePlayersDiv = defaultSet
                    }
                if (e.team) {
                    if (e.team.toLowerCase() === "dark") {
                        $("#dark_draft_col").append(darkPlayersDiv)
                        }
                    else if (e.team.toLowerCase() === "white") {
                        $("#white_draft_col").append(whitePlayersDiv)
                        }
                    else {
                        $("#available_draft_col").append(defaultSet)
                        }
                }
                else {
                    $("#available_draft_col").append(defaultSet)
                    }
                })
            let gameDay = `<div class="game_day"><br> <h2>${dateOfGame}</h2>`
            $("#js_content").append(gameDay)
            })
        }

////////////////////////////////////////
//////// Team Picking Functions ////////
////////////////////////////////////////


    // getting available player to generate a list to draft from
    const generatePlayerColumn = (idOfGame, dateOfGame, turn) => {
        $("#available_draft_col").text("")
        $("#dark_draft_col").text("")
        $("#white_draft_col").text("")
        $("#col1_title").text("Players")
        $("#col2_title").text("Ranks")
        
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
        $("#available_draft_col").empty()
        $("#dark_draft_col").empty()
        $("#white_draft_col").empty()
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
            
            let numOfRankedPlayers = alreadyRankedPlayers.length
            let rankedArray = [];
            
            // if any player has a rank over 0 at all
            if (numOfRankedPlayers > 0) {
                // splice the players from the original array
                dataFromAPI.splice(dataFromAPI.length-alreadyRankedPlayers.length, alreadyRankedPlayers.length)
                // combine the array by "pushing" the numbered ones, before the 0 (unranked) players
                rankedArray = alreadyRankedPlayers.concat(dataFromAPI);
                }
                function Player(id,shortname,captain1Pick,captain2Pick) {
                    this.id = id,
                    this.shortname = shortname,
                    this.captain1Pick = captain1Pick,
                    this.captain2Pick = captain2Pick
                    }


            // when all players are ranked, push them to the global variables to enable the computer drafts
            if (turn == 1) {
                if (numOfRankedPlayers === ultimateLength) {
                    console.log("Should create object and push to team1Array")
                    for (let i = 0; i < alreadyRankedPlayers.length; i++ ) {
                        let d = alreadyRankedPlayers[i]
                        let playerForArray = new Player (
                            d.id,
                            d.player,
                            d.captain1Pick,
                            d.captain2Pick
                            )
                            team1Array.push(playerForArray)
                        }   
                    }
                }                    
            else {
                if (numOfRankedPlayers === ultimateLength) {
                    console.log("Should create the object")
                    for (let i = 0; i < alreadyRankedPlayers.length; i++ ) {
                        let d = alreadyRankedPlayers[i]
                        let playerForArray = new Player (
                            d.id,
                            d.player,
                            d.captain1Pick,
                            d.captain2Pick
                            )
                            team2Array.push(playerForArray)
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
            
            if (team1Array.length === team2Array.length && team1Array.length === ultimateLength) {
                console.log("Computer ready, enable button") 
                }
            })
        }
    /*
    const quickAvailabilities = (idOfGame) => {
        console.log("getAvailablePlayers running for game: ",idOfGame)

        $.ajax({ url: currentURL + "/api/rosters/game/" + idOfGame + "/availability/1/player/ASC", method: "GET" })
            .then(function(dataFromAPI) {
                dataFromAPI.forEach((e) => {
                    arrayOfAvailablePlayers.push(e.id)
                    })
                })
            }
    */

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

showTeams()
seeUpcomingGames()

    
            
/////////////////////////////////
/// Machine Drafting functions //
/////////////////////////////////
    

    // Autodraft feature: separates all players by level, randomly assigns them to dark or white team
    const autoDraft = (arrayOfAvailablePlayers) => {
        let mixedRosters = [];
        // recreating our array by assigning each player to its level
        let output = arrayOfAvailablePlayers.reduce((levels,player) => {
            levels[player.level] = levels[player.level] || [];
            levels[player.level].push({
                shortname: player.shortname,
                id: player.id,
                level: player.level,
                captain1Pick: player.captain1Pick,
                captain2Pick: player.captain2Pick
            });
            return levels;
        },[])
        // getting the number of levels
        let numOutput = Object.keys(output).length;
        for (let i = 0; i < numOutput; i++) {
            // running the randomize function for each level
            let playersByLevel = Object.entries(output)[i]
            // the "level" is the first argument in the array, the next one is the players: that's how we access them
            let playersArray = playersByLevel[1]
            // console.log("players array non randomized: ", playersArray)
            randomize(playersArray, mixedRosters)
            }
        for (i = 0; i < mixedRosters.length; i++) {
            // assigning different team to every other player
            if (i%2 === 0) {mixedRosters[i].team = team1Name;}
            else {mixedRosters[i].team = team2Name}
            }
            function PlayerObj (name,id,team) {
                this.name = name,
                this.id = id,
                this.team = team
                updateTeam(this)
                }
            mixedRosters.forEach((e) => {
                let newPlayerObj = new PlayerObj (e.shortname,e.id,e.team)
                })
        // the only purpose of calling this function is to verify that teams are balanced (level wise)
        filterTeams(mixedRosters);
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
            if (e.level) {
                console.log(`${e.shortname} (${e.level})`);
                }
            else {
                console.log(`${e.shortname} (picked in position ${e.captain1Pick})`);
                }
            })
        // filter player objects according to name of the team #2
        rosterTeam2 = arrayOfPlayerObjects.filter((e) => e.team === team2Name)
        console.log(`\n************\n${team2Name}:\n************\n`);
        // display the shortname of the player objects for the whole team
        rosterTeam2.forEach((e) => {
            if (e.level) {
                console.log(`${e.shortname} (${e.level})`);
                }
            else {
                console.log(`${e.shortname} (picked in position ${e.captain2Pick})`);
                }
            })
        }
    // helper function to randomize an array (pushes/deletes to another array recursively, until it's empty) 
    const randomize = (inputArray, outputArray) => {
        if(inputArray.length > 0) {
            let randomPlayer = inputArray[Math.floor(Math.random()*inputArray.length)];
            let index = inputArray.indexOf(randomPlayer);
            outputArray.push(randomPlayer);
            inputArray.splice(index,1)
            randomize(inputArray, outputArray);
            }
        }

    // helper function to update a player's team in the db with parameters stored in player object
    // We will pass it the player's information in the constructor 
    const updateTeam = (participant) => {
        $.ajax({ 
            url: currentURL + "/api/rosters/" + participant.id, 
            method: "PUT",
            data: jQuery.param({team: participant.team, player: participant.name, captain1Pick: participant.captain1Pick, captain2Pick: participant.captain2Pick}) 
            }).then(function(dataFromAPI) {
                });
        }
    // helper function to update a player's pick in the db
    // We pass it the player's information in the constructor 
    const hardReset = (player) => {
        $.ajax({ 
            url: currentURL + "/api/rosters/" + player.id + "/reset", 
            method: "PUT",
            }).then(function(dataFromAPI) {
                });
        }

// helper function to test if a pick is eligble to be pushed to the roster array. If not, moves on to the next pick. 
const testPick = (inputArray,outputIds,outputNames) => {
    let index = 0;
    let picks = inputArray.picks;
    if (outputIds.indexOf(picks[index].id) != -1) {
        picks.splice(index,1);
        testPick(inputArray,outputIds,outputNames);
        }
    else {
        let nameOfTeam = inputArray.name;
        // assigns the name of the team to the drafted player (to filter later on)
        picks[index].team = nameOfTeam;
        // takes the pick, pushes it to the output array
        outputIds.push(picks[index].id);
        outputNames.push(picks[index]);
        // removes the pick from the array of picks
        picks.splice(index,1);
        }
    }

// function to create a "serpentine" type draft 
// Aka: captain #1 drafts first pick, then captain #2 has the next 2 picks, etc. until everyone is drafted
const serpentineDraft = (team1, team2) => {
    let arrayOfIds = []
    let mixedRosters = [];  
    let num;
    let num1 = team1.picks.length;
    let num2 = team2.picks.length;
    // the function will error if we try to run it more times than players have been picked
    if (num1 > num2) {
        num = num2
        }
    else {
        num = num1
        }
    // there are 4 turns to complete a round
    let turns = 4;
    let modulo = num % turns;
    let completeRounds = (num - modulo)/turns
    
    if (modulo === 0) {
        // if the num of players allows for complete rounds of serpentine draft
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,arrayOfIds,mixedRosters);
            testPick(team2,arrayOfIds,mixedRosters);
            testPick(team2,arrayOfIds,mixedRosters);
            testPick(team1,arrayOfIds,mixedRosters);
            }
        }
    else {
        // if not, we have to run as many complete rounds as possible
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,arrayOfIds,mixedRosters);
            testPick(team2,arrayOfIds,mixedRosters)
            testPick(team2,arrayOfIds,mixedRosters)
            testPick(team1,arrayOfIds,mixedRosters);
            }
        // and complete the rosters one player at a time
        switch (modulo !== 0) {
            case modulo === 1:
            testPick(team1,arrayOfIds,mixedRosters);
            break;
            case modulo === 2:
            testPick(team1,arrayOfIds,mixedRosters);
            testPick(team2,arrayOfIds,mixedRosters);
            break;
            case modulo === 3:
            testPick(team1,arrayOfIds,mixedRosters);
            testPick(team2,arrayOfIds,mixedRosters);
            testPick(team1,arrayOfIds,mixedRosters);
            break;
            }
        }
        function PlayerObj (name,id,team, captain1Pick,captain2Pick) {
            this.name = name,
            this.id = id,
            this.team = team,
            this.captain1Pick = captain1Pick,
            this.captain2Pick = captain2Pick,
            updateTeam(this)
            }
        // Resend info to db via an object constructor (which solves asynchronicity pb)
        // we have to send the picks as well, otherwise it's overwritten by the default value (0)
        // and it gets reset
        mixedRosters.forEach((e) => {
            let newPlayerObj = new PlayerObj (e.shortname,e.id,e.team,e.captain1Pick,e.captain2Pick)
            })
    filterTeams(mixedRosters)
    }
// function to create an "alternate" type draft 
// Aka: captain #1 drafts first pick, then captain #2 drafts, etc. until everyone is drafted
const alternateDraft = (team1, team2) => {
    let arrayOfIds = []
    let mixedRosters = [];  
    let num;
    let num1 = team1.picks.length;
    let num2 = team2.picks.length;
    // the function will error if we try to run it more times than players have been picked
    if (num1 > num2) {
        num = num2
        }
    else {
        num = num1
        }
    // there are 2 turns to complete a round
    let turns = 2;
    let modulo = num % turns;
    let completeRounds = (num - modulo)/turns
    
    if (modulo === 0) {
        // if the num of players allows for complete rounds of serpentine draft
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,arrayOfIds,mixedRosters);
            testPick(team2,arrayOfIds,mixedRosters);
            }
        }
    else {
        // if not, we have to run as many complete rounds as possible
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,arrayOfIds,mixedRosters);
            testPick(team2,arrayOfIds,mixedRosters);
            }
        // and complete the rosters with one more pick
        testPick(team1,arrayOfIds,mixedRosters);
        }
        function PlayerObj (name,id,team, captain1Pick,captain2Pick) {
            this.name = name,
            this.id = id,
            this.team = team,
            this.captain1Pick = captain1Pick,
            this.captain2Pick = captain2Pick,
            updateTeam(this)
            }
        // Resend info to db via an object constructor (which solves asynchronicity pb)
        // we have to send the picks as well, otherwise it's overwritten by the default value (0)
        // and it gets reset
        mixedRosters.forEach((e) => {
            let newPlayerObj = new PlayerObj (e.shortname,e.id,e.team,e.captain1Pick,e.captain2Pick)
            })
    filterTeams(mixedRosters)
    }
});