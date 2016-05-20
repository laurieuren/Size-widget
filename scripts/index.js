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
function determine_size(size_chart, customer_sizes, chest_included= false) {
    var response_text = "";
    for (measurement_type in customer_sizes) {
        if (measurement_type != "chest") {
             var compared_measures = go_through_customer_input_sizes(measurement_type,
                                                                     customer_sizes[measurement_type],
                                                                     size_chart[measurement_type])
            alert(compared_measures)
        } else if (measurement_type == "chest" && chest_included) {
            var compared_measures = go_through_customer_input_sizes(measurement_type,
                                                                    customer_sizes[measurement_type],
                                                                    size_chart[measurement_type])
            alert(compared_measures)
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
    var compared_params = [];
    for (size in size_chart) {
        current_size = size;
        if (customer_measurement < size_chart[size]["min"]) {
            compared_params.push(customer_measurement, size_chart[size]["min"], type, size, "min");
            break
        } else if (customer_measurement < size_chart[size]["max"]) {
            compared_params.push(customer_measurement, true, type, size);
            break;
        } else if (customer_measurement > size_chart[size]["max"] && size_chart[size] == "XXL") {
            compared_params.push(customer_measurement, size_chart[size]["max"], type, size, "max");
            break;
        }
        last_size = current_size
    }
    return compared_params;
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
        var customer_measurements = { "weight": weight, "height": height, "chest": chest };
        var chest_included = false;
        if (customer_measurements["chest"] != "") chest_included = true;

        determine_size(size_guidelines, customer_measurements, chest_included);

    });
});

