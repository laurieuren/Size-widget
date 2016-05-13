/**
 * Created by laurieuren on 8.5.2016.
 */

/**
 * Read json size chart with async false to enable passing the size chart data in order
 * to compare the size chart data to the user data.
 */

function get_size_chart()
{
    var size_guidelines = JSON.parse("size_")
}

/**
 *  Function goes through the types (chest, waist and sleeve) and then run the function
 * @param size_chart
 * @param sizes
 */
function determine_size(size_chart, sizes) {
    var response_text = "";
    for (measurement_type in sizes) {
        go_through_customer_input_sizes(measurement_type,
                                        sizes[measurement_type],
                                        size_chart[measurement_type])
    }
};

/**
 *
 * @param type
 * @param customer_measurement
 * @param size_chart
 */
function go_through_customer_input_sizes(type, customer_measurement, size_chart) {
    last_size = "";
    current_size = "";
    recommended_size = "";
    //TODO, what to do when the size is spot on?
    for (size in size_chart) {
        current_size = size
        if (customer_measurement < size_chart[size]) {
            //recommend_size(customer_measurement, size_chart[size]);
            break;
        } else if (customer_measurement > size_chart[size] && size == "XXL") {
            //TODO: how to deal XXL ?
            recommended_size = "XXL"
        } else {

        }
        last_size = current_size
    }

    // Determines, which size the customer should choose
    if (last_size == "") {
        // No last size, meaning that the size is S

    } else if (recommended_size != "") {
        // The recommended size has been set at size XXL
    } else {
        //TODO The most usual scenario -> customer between sizes
    }
}
/**
 *
 * @param customer_size
 * @param chart_size
 */
function compare_customer_sizes_to_chart(customer_size, chart_size) {

}

$(function() {



    $(".modal-wide").on("show.bs.modal", function() {
          var height = $(window).height() - 200;
          $(this).find(".modal-body").css("max-height", height);
        });


    /*
     * This is the Jquery function, that fires, when customer submits his given input as
     * measurements
     */
    $('#find-size-button').click(function() {
        var chest = $('#height-input').val();
        var waist = $('#weight-input').val();
        var sleeve = $('#chest-input').val();
        var measurements = {"chest": chest, "waist": waist, "sleeve": sleeve};
        determine_size(size_guidelines, measurements);

    });
});

