$(document).ready(function() {

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    // when opening the sidebar
    $("#sidebarCollapse").on("click", function() {
        //open sidebar
        $("#sidebar").toggleClass("active");
        //fade in the overlay
        $(".overlay").fadeIn();
        $(".collapse.in").toggleClass("in");
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
    })

    //if dismiss or overlay was clicked
    $("#dismiss, .overlay").on("click", function() {
        console.log(this)
        // hide sidebar
        $("#sidebar").addClass('active');
        // fade out overlay
        $(".overlay").fadeOut();
    })


});