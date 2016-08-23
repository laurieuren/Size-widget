/**
 * Created by laurieuren on 11.5.2016.
 */


$(function() {
    $('#size-button').click(function () {
        $('#size-popup-wrap').show()
    });

    $(document).keyup(function(e) {
       if (e.which == 27) $("#size-popup-wrap").hide();
    });
    if ($("#size-popup-wrap").css("display") !== "none") {
        alert("HEHEH")
        $(document).click(function(e) {
            if (e.target.id != "size-popup-content") $("#size-popup-wrap").hide();
        })
    }

});

