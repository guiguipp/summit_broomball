/*
$("#serpentine_draft").click(function() {
let gameId = $(this).attr("game_id");
let gameDate = $(this).attr("game_date");
let locked = $(this).attr("locked");
let team1Array = [];
let team2Array = [];
let arrayOfAvailablePlayers = [];
console.log("gameId: ", gameId,"gameDate: ", gameDate,"locked: ",locked)
// we get the available players because their availability might have changed since the teams were picked
console.log(gettingAllArrays(getAvailablePlayers(gameId))(getCapt1Ranked(team1Array,gameId))(getCapt2Ranked(team2Array,gameId)))
})
*/
function getAvailablePlayers(idOfGame) {
    $.ajax({ url: currentURL + "/api/rosters/game/" + idOfGame + "/availability/1/player/ASC", method: "GET" }).then(function(dataFromAPI) {
        dataFromAPI.forEach((e) => {
            arrayOfAvailablePlayers.push(e.player)
            })
        })

    }

function getCapt1Ranked(array, idOfGame) {
    $.ajax({ url: currentURL + "/api/rosters/" + idOfGame + "/ranked/captain1", method: "GET" }).then(function(dataFromAPI) {
        dataFromAPI.forEach((e) => {
            team1Array.push(e.player)
            console.log("team1Array: ", array)
            })
        })
    }

function getCapt2Ranked(array, idOfGame) {
    $.ajax({ url: currentURL + "/api/rosters/" + idOfGame + "/ranked/captain2", method: "GET" }).then(function(dataFromAPI) {
        dataFromAPI.forEach((e) => {
            array.push(e.player)
            console.log("team2Array: ", array)
            })
        })
    }
// serpentineDraft(team1Array, team2Array, arrayOfAvailablePlayers))

    // console.log(arrayOfAvailablePlayers)

/*
let gettingAllArrays = 
    avail =>
        capt1 =>
            capt2 =>
            avail
            capt1
            capt2
            */

/*
let curriedFunction = 
    avail =>
        capt1=>
            capt2=>
                avail + "trying"
                capt1 + "to understand"
                capt2 + "this thing"
*/
/*
function sum3(x) {
    return (y) => {
      return (z) => {
        console.log
        return x + y + z;
      };
    };
  }
  sum3(1)(2)(3) // 6
*/

generatePlayerColumn(gameId,gameDate,1)
    // execute function 2 after function1
    generateRanksColumn(gameId,gameDate,1)

let ranksAfterColumn = 
  playerCol =>
    ranksCol

ranksAfterColumn(generatePlayerColumn(gameId,gameDate,2))(generateRanksColumn(gameId,gameDate,1))


  function curryiedFunction(availabilies) {
    return (capt1) => {
      return (capt2) => {
        console.log(availabilies, capt1, capt2)
        return capt2 , "is different than" , "I got lost" + availabilities + " (no maths here...)";
      };
    };
  }
  console.log(curryiedFunction(availabilities("People"))(capt1("Here it is!"))(capt2("Everyone!!")))

function availabilities (availPlayers) {
    console.log("availabilies: ", availPlayers)
    return availPlayers
    }
function capt1 (capt1Picks) {
    console.log("Capt 1 picks: ", capt1Picks)
    }
function capt2 (capt2Picks) {
    console.log("Capt 2 Picks: ", capt2Picks)
    }