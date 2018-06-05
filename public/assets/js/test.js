let id = "This will be the id"
let gameDate = "This will be the gameDate"
let locked = "This will be the lock status"
let arrayOfelements = ["#autodraft","#reset","#unavailable","#ten_buckers","#unlock_allInfo","#lock_all_info"]
let infoToUpdate = [id, gameDate, locked]
$("#autodraft").attr("game_id",id)
$("#autodraft").attr("game_date",gameDate)
$("#autodraft").attr("locked",locked)
$("#reset").attr("game_id",id)
$("#reset").attr("game_date",gameDate)
$("#reset").attr("locked",locked)
$("#unavailable").attr("game_id",id)
$("#unavailable").attr("game_date",gameDate)
$("#unavailable").attr("locked",locked)
$("#ten_buckers").attr("game_id",id)
$("#ten_buckers").attr("game_date",gameDate)
$("#ten_buckers").attr("locked",locked)
$("#unlock_all_info").attr("game_id",id)
$("#unlock_all_info").attr("game_date",gameDate)
$("#unlock_all_info").attr("locked",locked)
$("#lock_all_info").attr("game_id",id)
$("#lock_all_info").attr("game_date",gameDate)
$("#lock_all_info").attr("locked",locked)

// helper function to create attributes dynamically
const addAttr = (elements, updates) => {
elements.forEach((e) => {
console.log(e)
updates.forEach((f) => {
console.log(`$(${e}).attr`)
})
$(e).attr("game_id",updates[0])
$(e).attr("game_date",updates[1])
$(e).attr("locked",updates[2])
})
}