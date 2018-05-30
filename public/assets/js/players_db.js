var players = []
var fakeplayers = []
function Player(shortname,fullname,position,email,level) {
    this.shortname = shortname,
    this.fullname = fullname,
    this.position = position,
    this.email = email,
    this.level = level,
    players.push(this)
} 

function FakePlayer(shortname,fullname,position,email,level) {
    this.shortname = shortname,
    this.fullname = fullname,
    this.position = position,
    this.email = email,
    this.level = level,
    fakeplayers.push(this)
} 

const carity = new Player (
    `Carity`,
    `Aaron Carity`,
    `Forward`,
    `aaron@sdksoft.com`,
    `A`
    )
    const weddie = new Player (
    `Weddie`,
    `Adam Wedwick`,
    `Forward`,
    `wedwick@gmail.com`,
    `A`
    )
    const barry = new Player (
    `Barry`,
    `Barry Valentine`,
    `Defense`,
    `barryjvalentine@gmail.com`,
    `B`
    )
    const becca = new Player (
    `Becca`,
    `Becca Reutell`,
    `Forward`,
    `reutel.rebecca@gmail.com`,
    `B`
    )
    const ben = new Player (
    `Ben`,
    `Ben MacLean`,
    `Goalie`,
    `benjamin.maclean23@gmail.com`,
    `Goalie`
    )
    const moore = new Player (
    `Moore`,
    `Bill Moore`,
    `Goalie`,
    `samlexi33@gmail.com`,
    `Goalie`
    )
    const stan = new Player (
    `Stan`,
    `Bobby Ebertz`,
    `Forward`,
    `robertebertz@gmail.com`,
    `C`
    )
    const chad = new Player (
    `Chad`,
    `Chad Edenborg`,
    `Forward`,
    `chad.edenborg@gmail.com`,
    `B`
    )
    const dane = new Player (
    `Dane`,
    `Dane Bremer`,
    `Forward`,
    `ddbremer86@gmail.com`,
    `B`
    )
    const graham = new Player (
    `Graham`,
    `Graham Brayshaw`,
    `Forward`,
    `gbrays@gmail.com`,
    `B`
    )
    const grant = new Player (
    `Grant`,
    `Grant Dawson`,
    `Forward`,
    `gwilliamdawson@gmail.com`,
    `A`
    )
    const gui = new Player (
    `Gui`,
    `Guillaume Paugam`,
    `Defense`,
    `artdelapetanque@gmail.com`,
    `B`
    )
    const jamie = new Player (
    `Jamie`,
    `Jamie McBride`,
    `Forward`,
    `jamiemcbride71@gmail.com`,
    `C`
    )
    const jason = new Player (
    `Jason`,
    `Jason Forde`,
    `Defense`,
    `birdisthewordmn@gmail.com`,
    `C`
    )
    const jen = new Player (
    `Jen`,
    `Jen Legro`,
    `Forward`,
    `jenlegro@gmail.com`,
    `C`
    )
    const joe = new Player (
    `Joe`,
    `Joe McArdle`,
    `Defense`,
    `josephmcardlemn@gmail.com`,
    `B`
    )
    const foss = new Player (
    `Foss`,
    `Justus Foss`,
    `Forward`,
    `justfoss@gmail.com`,
    `A`
    )
    const karissa = new Player (
    `Karissa`,
    `Karissa Vilks`,
    `Forward`,
    `karivilks@yahoo.com`,
    `A`
    )
    const kiemo = new Player (
    `Kiemo`,
    `Kiemo`,
    `Forward`,
    `kiemo22@yahoo.com`,
    `A`
    )
    const kim = new Player (
    `Kim`,
    `Kim Kotila`,
    `Forward`,
    `kkotila@hotmail.com`,
    `C`
    )
    const matt = new Player (
    `Matt`,
    `Matt Swords`,
    `Defense`,
    `mswords@bellbanks.com`,
    `A`
    )
    const sui = new Player (
    `Sui`,
    `Matthew Johnson`,
    `Defense`,
    `mattsui.gk@gmail.com`,
    `C`
    )
    const paul = new Player (
    `Paul`,
    `Paul Gorman`,
    `Defense`,
    `gman9999@aol.com`,
    `B`
    )
    const shalanah = new Player (
    `Shalanah`,
    `Shalanah Dawson`,
    `Defense`,
    `shalanahfaith@gmail.com`,
    `B`
    )
    const sheila = new Player (
    `Sheila`,
    `Sheila Cheng`,
    `Forward`,
    `sheilacheng6@gmail.com`,
    `B`
    )
    const steve = new Player (
    `Steve`,
    `Steve Gorman`,
    `Defense`,
    `stephen.gorman1313@gmail.com`,
    `B`
    )
    const vilks = new Player (
    `Vilks`,
    `Tim Vilks`,
    `Defense`,
    `vilks_family_08@q.com`,
    `A`
    )
    const todd = new Player (
    `Todd`,
    `Todd Swanson`,
    `Forward`,
    `toddswanson88@gmail.com`,
    `B`
    )
    const tony = new Player (
    `Tony`,
    `Tony Ryan`,
    `Forward`,
    `tpdpt@aol.com`,
    `B`
    )
    const schawnski = new Player (
    `Schawnski`,
    `Tonny Shoenecker`,
    `Forward`,
    `ashoenecker@burnsmcd.com`,
    `B`
    )

const player1 = new FakePlayer (
    `1`,
    `Aaron Carity`,
    `Forward`,
    `aaron@sdksoft.com`,
    `A`
    )
    const player2 = new FakePlayer (
    `2`,
    `Adam Wedwick`,
    `Forward`,
    `wedwick@gmail.com`,
    `A`
    )
    const player3 = new FakePlayer (
    `3`,
    `Grant Dawson`,
    `Forward`,
    `gwilliamdawson@gmail.com`,
    `A`
    )
    const player4 = new FakePlayer (
    `4`,
    `Justus Foss`,
    `Forward`,
    `justfoss@gmail.com`,
    `A`
    )
    const player5 = new FakePlayer (
    `5`,
    `Karissa Vilks`,
    `Forward`,
    `karivilks@yahoo.com`,
    `A`
    )
    const player6 = new FakePlayer (
    `6`,
    `Kiemo`,
    `Forward`,
    `kiemo22@yahoo.com`,
    `A`
    )
    const player7 = new FakePlayer (
    `7`,
    `Matt Swords`,
    `Defense`,
    `mswords@bellbanks.com`,
    `A`
    )
    const player8 = new FakePlayer (
    `8`,
    `Tim Vilks`,
    `Defense`,
    `vilks_family_08@q.com`,
    `A`
    )
    const player9 = new FakePlayer (
    `9`,
    `Barry Valentine`,
    `Defense`,
    `barryjvalentine@gmail.com`,
    `B`
    )
    const player10 = new FakePlayer (
    `10`,
    `Becca Reutell`,
    `Forward`,
    `reutel.rebecca@gmail.com`,
    `B`
    )
    const player11 = new FakePlayer (
    `11`,
    `Ben MacLean`,
    `Goalie`,
    `benjamin.maclean23@gmail.com`,
    `Goalie`
    )
    const player12 = new FakePlayer (
    `12`,
    `Bill Moore`,
    `Goalie`,
    `samlexi33@gmail.com`,
    `Goalie`
    )
    const player13 = new FakePlayer (
    `13`,
    `Chad Edenborg`,
    `Forward`,
    `chad.edenborg@gmail.com`,
    `B`
    )
    const player14 = new FakePlayer (
    `14`,
    `Dane Bremer`,
    `Forward`,
    `ddbremer86@gmail.com`,
    `B`
    )
    const player15 = new FakePlayer (
    `15`,
    `Graham Brayshaw`,
    `Forward`,
    `gbrays@gmail.com`,
    `B`
    )
    const player16 = new FakePlayer (
    `16`,
    `Guillaume Paugam`,
    `Defense`,
    `artdelapetanque@gmail.com`,
    `B`
    )
    const player17 = new FakePlayer (
    `17`,
    `Joe McArdle`,
    `Defense`,
    `josephmcardlemn@gmail.com`,
    `B`
    )
    const player18 = new FakePlayer (
    `18`,
    `Paul Gorman`,
    `Defense`,
    `gman9999@aol.com`,
    `B`
    )
    const player19 = new FakePlayer (
    `19`,
    `Shalanah Dawson`,
    `Defense`,
    `shalanahfaith@gmail.com`,
    `B`
    )
    const player20 = new FakePlayer (
    `20`,
    `Sheila Cheng`,
    `Forward`,
    `sheilacheng6@gmail.com`,
    `B`
    )
    const player21 = new FakePlayer (
    `21`,
    `Steve Gorman`,
    `Defense`,
    `stephen.gorman1313@gmail.com`,
    `B`
    )
    const player22 = new FakePlayer (
    `22`,
    `Todd Swanson`,
    `Forward`,
    `toddswanson88@gmail.com`,
    `B`
    )
    const player23 = new FakePlayer (
    `23`,
    `Tony Ryan`,
    `Forward`,
    `tpdpt@aol.com`,
    `B`
    )
    const player24 = new FakePlayer (
    `24`,
    `Tonny Shoenecker`,
    `Forward`,
    `ashoenecker@burnsmcd.com`,
    `B`
    )
    const player25 = new FakePlayer (
    `25`,
    `Bobby Ebertz`,
    `Forward`,
    `robertebertz@gmail.com`,
    `C`
    )
    const player26 = new FakePlayer (
    `26`,
    `Jamie McBride`,
    `Forward`,
    `jamiemcbride71@gmail.com`,
    `C`
    )
    const player27 = new FakePlayer (
    `27`,
    `Jason Forde`,
    `Defense`,
    `birdisthewordmn@gmail.com`,
    `C`
    )
    const player28 = new FakePlayer (
    `28`,
    `Jen Legro`,
    `Forward`,
    `jenlegro@gmail.com`,
    `C`
    )
    const player29 = new FakePlayer (
    `29`,
    `Kim Kotila`,
    `Forward`,
    `kkotila@hotmail.com`,
    `C`
    )
    const player30 = new FakePlayer (
    `30`,
    `Matthew Johnson`,
    `Defense`,
    `mattsui.gk@gmail.com`,
    `C`
    )

module.exports = {
    player1, player2, player3, player4, player5, player6, player7, player8, player9, player10, player11, player12, player13, player14, player15, player16, player17, player18, player19, player20, player21, player22, player23, player24, player25, player26, player27, player28, player29, player30,
    carity, weddie, grant, foss, karissa, kiemo, matt, vilks, barry, becca, ben, moore, chad, dane, graham, gui, joe, paul, shalanah, sheila, steve, todd, tony, schawnski, stan, jamie, jason, jen, kim, sui
}