const expect = require("chai").expect;
const serpentineDraft = require("../public/assets/js/app");
// console.log("serpentineDraft: ", serpentineDraft);



describe("#serpentineDraft",() => {
    it("The two output arrays should not have any element in common",() => {
        for (let i = 0; i < rosterTeam1.length; i++){
            expect(rosterTeam2.indexOf(rosterTeam1[i].fullname)).to.equal(-1);
        }
    })
});
