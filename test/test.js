const expect = require("chai").expect;
const players = require("../public/assets/js/players_db")
let easyEx =        [players.player1, players.player2, players.player3, players.player4, players.player5, players.player6, players.player7, players.player8, players.player9, players.player10, players.player11, players.player12, players.player13, players.player14, players.player15, players.player16, players.player17, players.player18, players.player19, players.player20, players.player21, players.player22, players.player23, players.player24, players.player25, players.player26, players.player27, players.player28, players.player29, players.player30]
let easyExPicksTeam1 = {name: team1Name, entered: "time", picks: [players.player1, players.player2, players.player3, players.player4, players.player5, players.player6, players.player7, players.player8, players.player9, players.player10, players.player11, players.player12, players.player13, players.player14, players.player15, players.player16, players.player17, players.player18, players.player19, players.player20, players.player21, players.player22, players.player23, players.player24, players.player25, players.player26, players.player27, players.player28,players.player29,players.player30]}
let easyExPicksTeam2 = {name : team2Name, entered: "time", picks: [players.player1, players.player2, players.player3, players.player4, players.player5, players.player6, players.player7, players.player8, players.player9, players.player10, players.player11, players.player12, players.player13, players.player14, players.player15, players.player16, players.player17, players.player18, players.player19, players.player20, players.player21, players.player22, players.player23, players.player24, players.player25, players.player26, players.player27, players.player28,players.player29,players.player30]}

const serpentineDraft = require("../public/assets/js/app");
// console.log("serpentineDraft: ", serpentineDraft);
// var rosterTeam1 = [];
// var rosterTeam2 = [];

/*
describe("#serpentineDraft",() => {
    it("The two output arrays should not have any element in common",() => {
        team1Name = "Dark Team";
        team2Name = "Light Team";
        serpentineDraft(easyExPicksTeam1,easyExPicksTeam3, easyEx)

        for (let i = 0; i < rosterTeam1.length; i++){
            console.log("hello")
            expect(rosterTeam2.indexOf(rosterTeam1[i].fullname)).to.equal(-1);
            }
        });
    });
*/