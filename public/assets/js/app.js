const players = require("./players_db")
let team1Name = "Dark Team";
let team2Name = "Light Team"
// retrieve data: file required + . + var name + . + element of the object
// Examples:
// console.log("Player1", players.player1);
// console.log("Player1", players.player1.shortname);
var availablePlayers = [players.player1, players.player2, players.player3, players.player4, players.player5, players.player6, players.player7, players.player8, players.player9, players.player10, players.player11, players.player12, players.player13, players.player14, players.player15, players.player16, players.player17, players.player18, players.player19, players.player20, players.player21, players.player22, players.player23, players.player24, players.player25, players.player26, players.player27, players.player28,players.player29,players.player30]

// Bear in mind that this is how we will need to create our arrays: the team name, and then their picks (in order)
var picksTeam1 = {name: team1Name, picks: [players.player1, players.player2, players.player3, players.player4, players.player5, players.player6, players.player7, players.player8, players.player9, players.player10, players.player11, players.player12, players.player13, players.player14, players.player15, players.player16, players.player17, players.player18, players.player19, players.player20, players.player21, players.player22, players.player23, players.player24, players.player25, players.player26, players.player27, players.player28,players.player29,players.player30]}
let picksTeam2 = {name : team2Name, picks: [players.player1, players.player2, players.player3, players.player4, players.player5, players.player6, players.player7, players.player8, players.player9, players.player10, players.player11, players.player12, players.player13, players.player14, players.player15, players.player16, players.player17, players.player18, players.player19, players.player20, players.player21, players.player22, players.player23, players.player24, players.player25, players.player26, players.player27, players.player28,players.player29,players.player30]}
let picksTeam3 = {name : team2Name, picks: [players.player30, players.player29, players.player28, players.player27, players.player26, players.player25, players.player24, players.player23, players.player22, players.player21, players.player20, players.player19, players.player18, players.player17, players.player16, players.player15, players.player14, players.player13, players.player12, players.player11, players.player10, players.player9, players.player8, players.player7, players.player6, players.player5, players.player4, players.player3,players.player2,players.player1]}

// function to get a player from a "pick" array, and push it to the roster array
const pick = (index,inputArray, outputArray) => {
    let name = inputArray.name;
    let picks = inputArray.picks;    
    // assigns the name of the team to the drafted player
    picks[index].team = name;
    
    // takes the first pick, pushes it to the output array
    outputArray.push(picks[index]);    
    
    // removes the first pick from the array of picks
    picks.splice(index,1);
    }   

// Test for first pick of first team 
// pick(0,picksTeam1,mixedRosters)

// function to test if a pick is eligble to be pushed to the roster array. If not, moves on to the next pick. 
const testPick = (index,inputArray,outputArray) => {
    let picks = inputArray.picks;    
    // the element must not exist in the array of other team's players
    if (outputArray.indexOf(picks[index]) !== -1 ) {
        // the player has already been drafted, you got to move on to the next one. Calls the function recursively.
        index ++;
        testPick(index,inputArray,outputArray);
    }
    else {
        // it the player has not been drafted yet, we call the "pick" function
        pick(index,inputArray,outputArray);        
    }
}
const serpentineDraft = function(team1, team2) {
    let mixedRosters = [];
    let rosterTeam1 = [];
    let rosterTeam2 = [];
    
    let num = availablePlayers.length;
    // there are 4 turns to complete a round
    let turns = 4;
    let modulo = num % turns;
    let completeRounds = (num - modulo)/turns

    if (modulo === 0) {
        // if the num of players allows for complete rounds of serpentine draft
        for (let i = 1; i <= completeRounds; i++) {
            testPick(0,team1,mixedRosters);
            testPick(0,team2,mixedRosters)
            testPick(0,team2,mixedRosters)
            testPick(0,team1,mixedRosters);
            }
        }
    else {
        // if not, we have to run as many complete rounds as possible
        for (let i = 1; i <= completeRounds; i++) {
            testPick(0,team1,mixedRosters);
            testPick(0,team2,mixedRosters)
            testPick(0,team2,mixedRosters)
            testPick(0,team1,mixedRosters);
            }
        // and complete the rosters one player at a time
        switch (modulo !== 0) {
            case modulo === 1:
            testPick(0,team1,mixedRosters);
            break;
            case modulo === 2:
            testPick(0,team1,mixedRosters);
            testPick(0,team2,mixedRosters);
            break;
            case modulo === 3:
            testPick(0,team1,mixedRosters);
            testPick(0,team2,mixedRosters);
            testPick(0,team1,mixedRosters);
            break;
        }
    }
    rosterTeam1 = mixedRosters.filter((e) => e.team === team1Name)
    console.log("************");
    // console.log("rosterTeam1: ", rosterTeam1);
    console.log(team1Name)
    rosterTeam1.forEach((e) => {
        console.log(e.shortname);
    })
    console.log("************");
    rosterTeam2 = mixedRosters.filter((e) => e.team === team2Name)
    // console.log("rosterTeam2: ", rosterTeam2);
    console.log(team2Name);
    rosterTeam2.forEach((e) => {
        console.log(e.shortname);
    })
    console.log("************");

    console.log("Testing");
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

serpentineDraft(picksTeam1,picksTeam2)



module.exports = serpentineDraft;