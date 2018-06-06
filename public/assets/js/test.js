let dataFromAPI= [
{id: 63, player: "Carity", captain1Pick: 0, gameId: 3},
{id: 64, player: "Foss", captain1Pick: 0, gameId: 3},
{id: 65, player: "Grant", captain1Pick: 0, gameId: 3},
{id: 67, player: "Kiemo", captain1Pick: 0, gameId: 3},
{id: 69, player: "Vilks", captain1Pick: 0, gameId: 3},
{id: 70, player: "Paul", captain1Pick: 0, gameId: 3},
{id: 72, player: "Joe", captain1Pick: 0, gameId: 3},
{id: 73, player: "Gui", captain1Pick: 0, gameId: 3},
{id: 75, player: "Steve", captain1Pick: 0, gameId: 3},
{id: 77, player: "Dane", captain1Pick: 0, gameId: 3},
{id: 79, player: "Graham", captain1Pick: 0, gameId: 3},
{id: 80, player: "Shawnski", captain1Pick: 0, gameId: 3},
{id: 82, player: "Todd", captain1Pick: 0, gameId: 3},
{id: 83, player: "Tony", captain1Pick: 0, gameId: 3},
{id: 84, player: "Ben (G)", captain1Pick: 0, gameId: 3},
{id: 85, player: "Moore (G)", captain1Pick: 0, gameId: 3},
{id: 86, player: "Jason", captain1Pick: 0, gameId: 3},
{id: 88, player: "Jamie", captain1Pick: 0, gameId: 3},
{id: 91, player: "Stan", captain1Pick: 0, gameId: 3},
{id: 68, player: "Weddie", captain1Pick: 1, gameId: 3},
{id: 81, player: "Sheila", captain1Pick: 2, gameId: 3},
{id: 74, player: "Shalanah", captain1Pick: 3, gameId: 3},
{id: 76, player: "Becca", captain1Pick: 4, gameId: 3}]

let alreadyRankedPlayers = []
    dataFromAPI.forEach((e,i) => {
        if(e.captain1Pick > 0) {
            arrayOfRankedPlayers.push(e)
        }
    });
    let numOfRankedPlayers = arrayOfRankedPlayers.length
    dataFromAPI.splice(dataFromAPI.length-arrayOfRankedPlayers.length, arrayOfRankedPlayers.length)
    let rankedArray = arrayOfRankedPlayers.concat(dataFromAPI); 

    
    console.log("dataFromAPI: ", "dataFromAPI", "(length is third: ",dataFromAPI.length,")")
    console.log("finally... if didn't push at last: ", betterArray)