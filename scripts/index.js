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
    var measurements_outcome = {};
    var response_text = "";

    for (measurement_type in customer_sizes) {
        if (measurement_type != "chest") {
             var compared_measures = go_through_customer_input_sizes(measurement_type,
                                                                     customer_sizes[measurement_type],
                                                                     size_chart[measurement_type])
             measurements_outcome[measurement_type] = compared_measures
        } else {
            var compared_measures = go_through_customer_input_sizes(measurement_type,
                                                                    customer_sizes[measurement_type],
                                                                    size_chart[measurement_type])
        }
    }
    /*
     * Checks if both measures are within limits. In this case, size is recommended. Otherwise
     * Gets more accurate body measurements
     */

    var are_within_limits = false;
    for (measurement in measurements_outcome) {
        if (!measurements_outcome[measurement]["outcome"]) {
            are_within_limits = false
        }
    }

    if (are_within_limits) {
        return (measurements_outcome, true);
    }   else {
        return (measurements_outcome, false);
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
    var compared_params = {};
    for (size in size_chart) {
        var minimum_measurement = size_chart[size]["min"];
        var maximum_measurement = size_chart[size]["max"];
        if (customer_measurement < minimum_measurement) {

            compared_params["type"] = type;
            compared_params["size_label"] = size;
            compared_params["outcome"] = "under_s";
            compared_params["customer_measurement"] = customer_measurement;
            compared_params["size_boundary_min"] = minimum_measurement;
            compared_params["size_boundary_max"] = maximum_measurement;
            break
        } else if (customer_measurement < maximum_measurement) {
            compared_params["type"] = type;
            compared_params["size_label"] = size;
            compared_params["outcome"] = "within_limits";
            compared_params["customer_measurement"] = customer_measurement;
            compared_params["size_boundary_min"] = minimum_measurement;
            compared_params["size_boundary_max"] = maximum_measurement;
            break;
        } else if (customer_measurement > maximum_measurement && maximum_measurement == "XXL") {
            compared_params["type"] = type;
            compared_params["size_label"] = size;
            compared_params["outcome"] = "over_xxl";
            compared_params["customer_measurement"] = customer_measurement;
            compared_params["size_boundary_min"] = minimum_measurement;
            compared_params["size_boundary_max"] = maximum_measurement;
            break;
        }
    }
    return compared_params;
}

function get_body_type(body_parameters) {
    $('#user-parameters').removeClass('fadeIn');
    $('#user-parameters').addClass('fadeOut');
    $('#user-parameters').hide();
    $('#size-popup-accurate').show();
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
        // Check if user gave his chest input

        customer_measurements = { "weight": weight, "height": height};
        if (customer_measurements["chest"] != undefined &&
            customer_measurements["chest"] != "") {
            customer_measurements["chest"] = chest;
            chest_included = true;
        }

        var size_outcome = determine_size(size_guidelines, customer_measurements, chest_included);

        var can_determine_size = size_outcome[1];

        if (!can_determine_size) {
            var accurate_size_outcome = get_body_type(size_outcome)
        }

        get_body_type(size_outcome);

    });
});

