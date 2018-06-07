$(document).ready(function() {

      // Getting references to the name input and player container, as well as the table body
    var shortNameInput = $("#ShortName");
    var fullNameInput = $("#FullName");
    var playerLevelInput = $("#LevelSelect");
    var preferredPositionInput = $("#PositionSelect");
    var playerStatusInput = $("#PlayerStatus");
    var emailInput = $("#Email");

    var playerList = $("tbody");
    var playerContainer = $(".player-container");

        // Adding event listeners to the form to create a new object, and the button to delete a Player
    // $(document).on("submit", "#player-form", handlePlayerFormSubmit);
    $(document).on("submit", "#player-form", handlePlayerFormSubmit);
    $(document).on("click", ".delete-player", handleDeleteButtonPress);

    // Getting the initial list of Players
    getPlayers();

        // A function to handle what happens when the form is submitted to create a new Player
    function handlePlayerFormSubmit(event) {
        event.preventDefault();
        console.log(shortNameInput);
        // Don't do anything if the name fields hasn't been filled out
        if (
            !shortNameInput.val().trim().trim(),
            !fullNameInput.val().trim().trim(),
            !emailInput.val().trim().trim()
        ) {
        return;
        }
        // Calling the upsertPlayer function and passing in the value of the name input
        upsertPlayer({
        shortname: shortNameInput .val() .trim(),
        full_name: fullNameInput .val() .trim(),
        player_level: playerLevelInput .val() .trim(),
        preferred_position: preferredPositionInput .val() .trim(),
        player_status: playerStatusInput .val() .trim(),
        email: emailInput .val() .trim()
        });
    }

    // A function for creating an player. Calls getPlayers upon completion
    function upsertPlayer(playerData) {
        $.post("/api/players", playerData)
        .then(getPlayers);
    }

    // Function for creating a new list row for players
    function createPlayerRow(playerData) {
        var newTr = $("<tr>");
        newTr.data("player", playerData);
        newTr.append("<td>" + playerData.shortname + "</td>");
        newTr.append("<td>" + playerData.full_name + "</td>");
        newTr.append("<td>" + playerData.player_level + "</td>");
        newTr.append("<td>" + playerData.preferred_position + "</td>");
        newTr.append("<td>" + playerData.player_status + "</td>");
        newTr.append("<td>" + playerData.email + "</td>");        
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-player'>Delete player</a></td>");
        return newTr;
    }

        // Function for retrieving players and getting them ready to be rendered to the page
    function getPlayers() {
        $.get("/api/players", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createPlayerRow(data[i]));
        }
        renderPlayerList(rowsToAdd);
        nameInput.val("");
        });
    }

    // A function for rendering the list of players to the page
    function renderPlayerList(rows) {
        playerList.children().not(":last").remove();
        playerContainer.children(".alert").remove();
        if (rows.length) {
          console.log(rows);
          playerList.prepend(rows);
        }
        else {
          renderEmpty();
        }
    }

        // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("player");
        var id = listItemData.id;
        $.ajax({
        method: "DELETE",
        url: "/api/players/" + id
        })
        .then(getPlayers);
    }

}); 