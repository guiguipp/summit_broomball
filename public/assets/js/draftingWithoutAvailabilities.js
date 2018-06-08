const players = require("./players_db")
let team1Name = "Dark Team";
let team2Name = "Light Team";
// retrieve data: file required + . + var name + . + element of the object
// These examples are easy, because their name is a number (shows how the draft works)
let easyEx =        [players.player1, players.player2, players.player3, players.player4, players.player5, players.player6, players.player7, players.player8, players.player9, players.player10, players.player11, players.player12, players.player13, players.player14, players.player15, players.player16, players.player17, players.player18, players.player19, players.player20, players.player21, players.player22, players.player23, players.player24, players.player25, players.player26, players.player27, players.player28, players.player29, players.player30]
let easyExRandom =  [players.player1, players.player12, players.player29, players.player3, players.player5, players.player14, players.player8, players.player9, players.player10, players.player23, players.player11, players.player13, players.player15, players.player16, players.player17, players.player18, players.player19, players.player20, players.player22, players.player21, players.player4, players.player7, players.player6, players.player24, players.player25, players.player26, players.player28, players.player30, players.player27, players.player2]
// Examples:
// console.log("Player1", players.player1);
// console.log("Player1", players.player1.shortname);
let availablePlayers = [players.barry, players.becca, players.ben, players.carity, players.chad, players.dane, players.foss, players.graham, players.grant, players.gui, players.jamie, players.jason, players.jen, players.joe, players.karissa, players.kiemo, players.kim, players.matt, players.moore, players.paul, players.schawnski, players.shalanah, players.sheila, players.stan, players.steve, players.sui, players.todd, players.tony, players.vilks, players.weddie];

// Bear in mind that this is how we will need to create our arrays: the team name, and then their picks (in order)
let easyExPicksTeam1 = {name: team1Name, entered: "time", picks: [players.player1, players.player2, players.player3, players.player4, players.player5, players.player6, players.player7, players.player8, players.player9, players.player10, players.player11, players.player12, players.player13, players.player14, players.player15, players.player16, players.player17, players.player18, players.player19, players.player20, players.player21, players.player22, players.player23, players.player24, players.player25, players.player26, players.player27, players.player28,players.player29,players.player30]}
let easyExPicksTeam2 = {name : team2Name, entered: "time", picks: [players.player1, players.player2, players.player3, players.player4, players.player5, players.player6, players.player7, players.player8, players.player9, players.player10, players.player11, players.player12, players.player13, players.player14, players.player15, players.player16, players.player17, players.player18, players.player19, players.player20, players.player21, players.player22, players.player23, players.player24, players.player25, players.player26, players.player27, players.player28,players.player29,players.player30]}
let easyExPicksTeam3 = {name : team2Name, picks: [players.player30, players.player29, players.player28, players.player27, players.player26, players.player25, players.player24, players.player23, players.player22, players.player21, players.player20, players.player19, players.player18, players.player17, players.player16, players.player15, players.player14, players.player13, players.player12, players.player11, players.player10, players.player9, players.player8, players.player7, players.player6, players.player5, players.player4, players.player3,players.player2,players.player1]}
// * real life * examples
let exPicksTeam1 = {name: team1Name, entered: "time", picks: [players.matt, players.vilks, players.carity, players.foss, players.grant, players.karissa, players.kiemo, players.weddie, players.barry, players.gui, players.joe, players.paul, players.shalanah, players.steve, players.becca, players.chad, players.dane, players.graham, players.schawnski, players.sheila, players.todd, players.tony, players.ben, players.moore, players.jason, players.sui, players.jamie, players.jen, players.kim, players.stan]};
let exPicksTeam2 = {name: team2Name, entered: "time", picks: [players.matt, players.vilks, players.carity, players.foss, players.grant, players.karissa, players.kiemo, players.weddie, players.barry, players.gui, players.joe, players.paul, players.shalanah, players.steve, players.becca, players.chad, players.dane, players.graham, players.schawnski, players.sheila, players.todd, players.tony, players.ben, players.moore, players.jason, players.sui, players.jamie, players.jen, players.kim, players.stan]};
let exPicksTeam3 = {name: team2Name, entered: "time", picks: [players.barry, players.becca, players.ben, players.carity, players.chad, players.dane, players.foss, players.graham, players.grant, players.gui, players.jamie, players.jason, players.jen, players.joe, players.karissa, players.kiemo, players.kim, players.matt, players.moore, players.paul, players.schawnski, players.shalanah, players.sheila, players.stan, players.steve, players.sui, players.todd, players.tony, players.vilks, players.weddie]};

let n = 0;

// utility function to get a player from a "pick" array, and push it to the roster array
const pick = (index,inputArray, outputArray) => {
    let name = inputArray.name;
    let picks = inputArray.picks;
    
    // assigns the name of the team to the drafted player (to filter later on)
    picks[index].team = name;
    // console.log("picks[index].team", picks[index].team)
    // takes the pick, pushes it to the output array
    outputArray.push(picks[index]);

    // console.log("should be an object at this point: ", picks[index])
    // removes the pick from the array of picks
    picks.splice(index,1);
    }   



// utility function to test if a pick is eligble to be pushed to the roster array. If not, moves on to the next pick. 
const testPick = (inputArray,outputArray) => {
    n ++
    console.log("see how many times this is running...: ", n)
    let index = 0;
    let picks = inputArray.picks;

    // check availability of player (that might have changed since he was picked), and if he was pick already).
    if (outputArray.indexOf(picks[index]) !== -1) {
        // Either of these conditions is not met, player is removed from array
        picks.splice(index,1);
        // function is called recursively on the next element of the array
        testPick(inputArray,outputArray);
        }
    else { 
        // Player is drafted           
        pick(index,inputArray,outputArray);        
        }
    }

// utility function to randomize an array (pushes/deletes to another array recursively, until it's empty) 
const randomize = (inputArray, outputArray) => {
    if(inputArray.length > 0) {
        let randomPlayer = inputArray[Math.floor(Math.random()*inputArray.length)];
        let index = inputArray.indexOf(randomPlayer);
        outputArray.push(randomPlayer);
        inputArray.splice(index,1)
        randomize(inputArray, outputArray);
        }
    }
// function to create a "serpentine" type draft 
// Aka: captain #1 drafts first pick, then captain #2 has the next 2 picks, etc. until everyone is drafted
const serpentineDraft = (team1, team2) => {
    let mixedRosters = [];    
    let num = team1.picks.length;
    // there are 4 turns to complete a round
    let turns = 4;
    let modulo = num % turns;
    let completeRounds = (num - modulo)/turns
    
    if (modulo === 0) {
        // if the num of players allows for complete rounds of serpentine draft
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,mixedRosters);
            testPick(team2,mixedRosters);
            testPick(team2,mixedRosters);
            testPick(team1,mixedRosters);
            }
        }
    else {
        // if not, we have to run as many complete rounds as possible
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,mixedRosters);
            testPick(team2,mixedRosters)
            testPick(team2,mixedRosters)
            testPick(team1,mixedRosters);
            }
        // and complete the rosters one player at a time
        switch (modulo !== 0) {
            case modulo === 1:
            testPick(team1,mixedRosters);
            break;
            case modulo === 2:
            testPick(team1,mixedRosters);
            testPick(team2,mixedRosters);
            break;
            case modulo === 3:
            testPick(team1,mixedRosters);
            testPick(team2,mixedRosters);
            testPick(team1,mixedRosters);
            break;
            }
        }
        console.log("mixedRoster[0]: ", mixedRosters[0])
        console.log("mixedRoster[1]: ", mixedRosters[1])
        console.log("mixedRoster[2]: ", mixedRosters[2])
    filterTeams(mixedRosters)


    // console.log("Testing");
    /*
    for (let i = 0; i < rosterTeam1.length; i++){
        if (rosterTeam2.indexOf(rosterTeam1[i].fullname) !== -1) {
            console.log("warning!!")
        }
        else {
            console.log("As you would expect...");
            
        }
    } 
    */
    }
// function to create an "alternate" type draft 
// Aka: captain #1 drafts first pick, then captain #2 drafts, etc. until everyone is drafted
const alternateDraft = (team1, team2) => {
    let mixedRosters = [];
    let num = team1.picks.length;
    // there are 4 turns to complete a round
    let turns = 2;
    let modulo = num % turns;
    let completeRounds = (num - modulo)/turns
    if (modulo === 0) {
        // if the num of players allows for complete rounds of serpentine draft
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,mixedRosters);
            testPick(team2,mixedRosters);
            }
        }
    else {
        // if not, we have to run as many complete rounds as possible
        for (let i = 1; i <= completeRounds; i++) {
            testPick(team1,mixedRosters);
            testPick(team2,mixedRosters)
            }
        // and complete the rosters with one more pick
            testPick(team1,mixedRosters);
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

// function to draft teams automatically (randomize players of same level)
const autoDraft = (arrayOfAvailablePlayers) => {
    let mixedRosters = [];
    // recreating our array by assigning each player to its level
    let output = arrayOfAvailablePlayers.reduce((levels,player) => {
        levels[player.level] = levels[player.level] || [];
        levels[player.level].push({
            shortname: player.shortname,
            position: player.position,
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
        if (i%2 === 0) {
            mixedRosters[i].team = team1Name;
            }
        else {
            mixedRosters[i].team = team2Name;
            }
        }
    filterTeams(mixedRosters);
    }

// CHECK: CALL THE SERPENTINE DRAFT FUNCTION:
// ******************************************
// ******************************************
serpentineDraft(easyExPicksTeam1,easyExPicksTeam2) // worst case scenario (exact same picks)
// serpentineDraft(easyExPicksTeam1,easyExPicksTeam3, easyEx)
// serpentineDraft(exPicksTeam1,exPicksTeam2) // worst case scenario (exact same picks)
// serpentineDraft(exPicksTeam1,exPicksTeam3,availablePlayers)


// CHECK: CALL THE ALTERNATE DRAFT FUNCTION:
// ******************************************
// ******************************************
// alternateDraft(easyExPicksTeam1,easyExPicksTeam2,easyEx) // worst case scenario (exact same picks)
// alternateDraft(easyExPicksTeam1,easyExPicksTeam3,easyEx)
// alternateDraft(exPicksTeam1,exPicksTeam2,availablePlayers) // worst case scenario (exact same picks)
// alternateDraft(exPicksTeam1,exPicksTeam3,availablePlayers)

// CHECK: CALL THE AUTO DRAFT FUNCTION
// ******************************************
// ******************************************
// autoDraft(easyEx)
// autoDraft(availablePlayers)



/* 
=> double check that pick is available, before drafting
*/

module.exports = serpentineDraft;