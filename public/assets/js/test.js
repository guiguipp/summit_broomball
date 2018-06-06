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
let gettingAllArrays = 
    avail =>
        capt1=>
            capt2=>
                avail + "trying"
                capt1 + "to understand"
                capt2 + "this thing"


console.log(gettingAllArrays("name")("size")("anything"))