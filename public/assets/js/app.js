const availablePlayers = ["Vilks","Foss","Swords","Knutson","Jaunty","Gui","Sui","Barry","Tony","Sheila","Shawnski","Dane","Becca","Grant","Shalanah","Stan"]

var picksTeam1 = ["Vilks","Foss","Swords","Knutson","Jaunty","Gui","Sui","Barry","Tony","Sheila","Shawnski","Dane","Becca","Grant","Shalanah","Stan"]
var picksTeam2 = ["Vilks","Foss","Swords","Knutson","Jaunty","Gui","Sui","Barry","Tony","Sheila","Stan","Grant","Shalanah","Shawnski","Dane","Becca"]
var mixedRosters = [];

var rosterTeam1 = [];
var rosterTeam2 = [];

const pick = (index,inputArray, outputArray) => {
    // takes the first pick, pushes it to the output array
    outputArray.push(inputArray[index]);    
    // removes the first pick from the initial array
    inputArray.splice(index,1);
    console.log("inputArray after pick has been drafted:\n", inputArray);
}   
// pick(0,picksTeam1,mixedRosters)

const testPick = (index,inputArray,outputArray) => {
    console.log(`\nindex = ${index}\n(this shows on which element of the picksArray the function is called). The player is: ${inputArray[index]}\n\ninputArray = ${inputArray}\n\nExisting roster = ${outputArray}\n`);    
    // the element must not exist in the array of other team's players
    if (outputArray.indexOf(inputArray[index]) !== -1 ) {
        // the player has already been drafted, you got to move on to the next one
        index ++;
        testPick(index,inputArray,outputArray);
    }
    else {
        // it the player has not been drafted yet, we call the "pick" function
        pick(index,inputArray,outputArray);
        console.log("rostersArray: ",outputArray);
        
    }
}

// testPick(0,picksTeam2,mixedRosters)

while (mixedRosters.length < availablePlayers.length) {
    testPick(0,picksTeam1,mixedRosters);
    testPick(0,picksTeam2,mixedRosters)
    // console.log("mixedRosters: ", mixedRosters);
}

for (let i = 0; i < mixedRosters.length; i++) {
    if (i %2 === 0) {
        console.log("even number (?): ", i)
        rosterTeam1.push(mixedRosters[i])
    }
    else {
        console.log("odd number (?): ", i)
        rosterTeam2.push(mixedRosters[i])
    }
}

console.log("rosterTeam1: ", rosterTeam1)
console.log("rosterTeam2: ", rosterTeam2)
// module.exports = {firstPick}