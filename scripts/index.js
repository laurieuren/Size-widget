/**
 * Created by laurieuren on 8.5.2016.
 */

/**
 *  Function goes through the types (height, weight and chest) and then runs the function
 *  go_through_customer_input_sizes for each of the types, and determines if something is
 *  wrong or not.
 *
 * @param size_chart
 * @param sizes
 */
function determine_size(size_chart, sizes, chest_included= false) {
    var response_text = "";
    for (measurement_type in sizes) {
        if (measurement_type != "chest") {
             go_through_customer_input_sizes(measurement_type,
                                        sizes[measurement_type],
                                        size_chart[measurement_type])
        } else if (measurement_type == "chest" && chest_included) {
            go_through_customer_input_sizes(measurement_type,
                                        sizes[measurement_type],
                                        size_chart[measurement_type])
        } else {
            "no chest measurement"
        }
    }
};

/**
 *
 * This function compares the size_guidelines object with the users parameters. For example
 * the user could've given his height, which could be 175cm. In the size_guidelines array
 * there are minimum and maximum values for certain sizes, for M size, the minimum height is
 * 175 and maximum 186. The function then determines, which size the user should take
 * regarding these measurements.
 *
 * @param type
 * @param customer_measurement
 * @param size_chart
 */
function go_through_customer_input_sizes(type, customer_measurement, size_chart) {
    last_size = "";
    current_size = "";
    recommended_size = "";
    for (size in size_chart) {
        current_size = size;
        if (customer_measurement < size_chart[size]["min"]) {

        } else if (customer_measurement < size_chart[size]["max"]) {

        } else if (customer_measurement > size_chart[size]["max"] && size_chart[size] == "XXL") {
            // Too big somehow
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


$(function() {
    /*
     * This is the Jquery function, that fires, when customer submits his given input as
     * measurements
     */
    $('#find-size-button').click(function() {
        var height = $('#height-input').val();
        var weight = $('#weight-input').val();
        var chest = $('#chest-input').val();
        var measurements = { "weight": weight, "height": height, "chest": chest };
        var size_chart = size_guidelines;
        var chest_included = false
        if (measurements["chest"] != "") chest_included = true;
        determine_size(size_chart, measurements, chest_included);

    });
});

