$(document).ready(function() {
    ////////////////////////////////////////
    /////// Draft specific javascript //////
    ////////////////////////////////////////
    
    
    $(".content_hidden").hide();
    const currentURL = window.location.origin;
    const team1Name = "dark";
    const team2Name = "white";

    console.log("ready to grind human meat...")


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
                let gameButton = `<div id=${e.id} class="future_game" locked="${e.lock_info}" game_date="${e.game_date}"> <button class="btn btn-info navbar-btn dark_grey game_button">${e.game_date}</button>\n`
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
    // Helper function to reset the data attr for each game
    const setDataAttr = (idOfGame,dateOfGame,lockStatus,cb) => {
        console.log(`Rerunning the setDataAttr with following lockstatus: ${lockStatus}`)
        $("#autodraft").attr("game_id",idOfGame)
        $("#autodraft").attr("game_date",dateOfGame)
        $("#autodraft").attr("locked",lockStatus)
        $("#reset").attr("game_id",idOfGame)
        $("#reset").attr("game_date",dateOfGame)
        $("#reset").attr("locked",lockStatus)
        $("#unavailable").attr("game_id",idOfGame)
        $("#unavailable").attr("game_date",dateOfGame)
        $("#unavailable").attr("locked",lockStatus)
        $("#ten_buckers").attr("game_id",idOfGame)
        $("#ten_buckers").attr("game_date",dateOfGame)
        $("#ten_buckers").attr("locked",lockStatus)
        $("#unlock_all_info").attr("game_id",idOfGame)
        $("#unlock_all_info").attr("game_date",dateOfGame)
        $("#unlock_all_info").attr("locked",lockStatus)
        $("#lock_all_info").attr("game_id",idOfGame)
        $("#lock_all_info").attr("game_date",dateOfGame)
        $("#lock_all_info").attr("locked",lockStatus)
        $("#picks_dark").attr("game_id",idOfGame)
        $("#picks_dark").attr("game_date",dateOfGame)
        $("#picks_dark").attr("locked",lockStatus)
        $("#picks_white").attr("game_id",idOfGame)
        $("#picks_white").attr("game_date",dateOfGame)
        $("#picks_white").attr("locked",lockStatus)
        $("#manual_draft").attr("game_id",idOfGame)
        $("#manual_draft").attr("game_date",dateOfGame)
        $("#manual_draft").attr("locked",lockStatus)
        }
    // there has to be a way to automate this...
    let elToUpdate = ["autodraft","reset","unavailable","ten_buckers","unlock_all_info","lock_all_info","picks_dark","picks_white","manual_draft"]
    const updateMetaData = (array,idOfGame,dateOfGame,lockStatus) => {
        arrayForEach((e) => {
            return `$("#${e}.").attr("game_id",${idOfGame})
                    $("#${e}.").attr("game_date",${dateOfGame})
                    $("#${e}.").attr("locked",${lockStatus})`
        })
        }

    
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

    // helper function to create attributes dynamically
    /*
    const addAttr = (thingsToUpdate, updates) => {
        thingsToUpdate.forEach((e) => {
            console.log(e)

        })
    }
    */


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
                })
            })



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
                    console.log("Doing something else")
                    getAvailablePlayers(gameId,gameDate,locked)
                    });
                });
            }
            
        });

    // Assign each available player for that game to "" team after click     
    $("#reset").click(function() {
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date");
        let locked = $(this).attr("locked");
        if (locked === "false") {
            $.ajax({ url: currentURL + "/api/rosters/game/"+ gameId +"/availability/1/player/asc", method: "GET" }).then(function(dataFromAPI) {
                function PlayerObj (id,name,team) {
                    this.id = id,
                    this.name = name,
                    this.team = team,
                    updateTeam(this)
                    }
                    dataFromAPI.forEach((e) => {
                        // resetting the team (using "unavailable" as the team, not the status...)
                        let newPlayerObj = new PlayerObj(e.id,e.player,"unavailable")
                    })
                    getAvailablePlayers(gameId,gameDate,locked)
                })
            }
        })
    // show unavailable players
    $("#unavailable").click(function() {
        let gameId = $(this).attr("game_id");
        let gameDate = $(this).attr("game_date")
        console.log("Here it is!")
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


    showTeams()
    seeUpcomingGames()

    
    ////////////////////////////////////////
    //////// Team sorting functions  ///////
    ////////////////////////////////////////
    

    // Autodraft feature: separates all players by level, randomly assigns them to dark or white team
    const autoDraft = (arrayOfAvailablePlayers) => {
        let mixedRosters = [];
        // recreating our array by assigning each player to its level
        let output = arrayOfAvailablePlayers.reduce((levels,player) => {
            levels[player.level] = levels[player.level] || [];
            levels[player.level].push({
                shortname: player.shortname,
                id: player.id,
                level: player.level
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
            data: jQuery.param({team: participant.team, player: participant.name}) 
            }).then(function(dataFromAPI) {
                });
        }


    ////////////////////////////////////////
    ////// Stats specific javascript //////
    ////////////////////////////////////////

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
        lockStats(gameId,locked)
        showGameStats(gameId,locked)
        })
        
    const lockStats = (idOfGame,lockStatus) => {
        $("#unlock_all_info_stats").attr("game_id",idOfGame)
        $("#unlock_all_info_stats").attr("locked",lockStatus)
        $("#lock_all_info_stats").attr("game_id",idOfGame)
        $("#lock_all_info_stats").attr("locked",lockStatus)
        }
    
    function showGameStats(idOfGame,lockStatus){
        $(".content_hidden").show();
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
                        <h2>Dark Team</h2>
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
                        <h2>White Team</h2>
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
                else {
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
        };
    

    // const toggleUpdatingMode = (lockStatus) => {
        

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
                        updateGoal(playerId,newValue,showGameStats,gameId,lockStatus);
                        break;
                        
                    case buttonClass = " add_assist":
                        console.log("Case add_assist")
                        newValue = currentValue + 1;
                        updateAssist(playerId,playerName,newValue,showGameStats,gameId,lockStatus);
                        break;

                    case buttonClass = " substract_goal":    
                        console.log("Case substract_goal")
                        newValue = currentValue - 1;
                        if(newValue >= 0) {
                            updateGoal(playerId,newValue,showGameStats,gameId,lockStatus);
                            }
                        break;

                    case buttonClass = " substract_assist":
                        console.log("Case substract_assist")
                        newValue = currentValue - 1;
                        if(newValue >= 0) {
                            updateAssist(playerId,playerName,newValue,showGameStats,gameId,lockStatus);
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
    function updateGoal(idOfPlayer, newGoalTotal, cb,gameId,lockStatus) {
        $.ajax({ 
            url: currentURL + "/api/rosters/" + idOfPlayer + "/goals", 
            method: "PUT",
            data: jQuery.param({goals: newGoalTotal}) 
            }).then(function(dataFromAPI) {
                if (dataFromAPI[1] === 1) {
                    cb(gameId,lockStatus)
                    }
                })
            }
    // update # of assists
    function updateAssist(idOfPlayer, playerName, newAssistTotal,cb,gameId,lockStatus) {
        $.ajax({ 
            url: currentURL + "/api/rosters/" + idOfPlayer + "/assists", 
            method: "PUT",
            data: jQuery.param({assists: newAssistTotal}) 
            }).then(function(dataFromAPI) {
                if (dataFromAPI[1] === 1) {
                    cb(gameId,lockStatus)
                    }
                })
            }
    $("#unlock_all_info_stats").click(function(){
        let gameId = $(this).attr("game_id");
        let locked = false;
        console.log(`Data from the lock.\ngameId: ${gameId}\nCurrently locked?: ${locked}`)
        $.ajax({    
            url: currentURL + "/api/game/" + gameId + "/lock", 
            data: jQuery.param({lock_info: locked}), 
            method: "PUT" }).then(function(dataFromAPI) {
                lockStats(gameId,locked)
                showGameStats(gameId,locked)
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
                lockStats(gameId,locked)
                showGameStats(gameId,locked)
                })
            })

    seeOnlyPastGames()
}); //end of JQuery (document).ready