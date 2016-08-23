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
function determine_size(size_chart, customer_sizes) {
    var measurements_outcome = {};
    for (measurement_type in customer_sizes) {
        if (measurement_type != "chest") {
             var compared_measures = go_through_customer_input_sizes(measurement_type,
                                                                     customer_sizes[measurement_type],
                                                                     size_chart[measurement_type])
             measurements_outcome[measurement_type] = compared_measures
        } else if (customer_sizes[measurement_type] == "true") {
            measurements_outcome[measurement_type] = true;
        }
    }
    /*
     * Checks if both measures are within limits. In this case, size is recommended. Otherwise
     * Gets more accurate body measurements
     */

    var sizes_are_within_limits = true;
    var weight_size = "";
    var height_size = "";
    // Sets determined weight and height and checks if user is very weighty or heighty.
    for (measurement in measurements_outcome) {
        if (measurement != "chest") {
             if (measurement == "weight") weight_size = measurements_outcome[measurement]["size_label"];
             else if (measurement == "height") height_size = measurements_outcome[measurement]["size_label"];


             var size_judgement = measurements_outcome[measurement]["outcome"];
             var is_within_limits = (size_judgement == "within_limits");
             if (!is_within_limits) {
                 sizes_are_within_limits = false
             }

        }

    }
    /*
     * If sizes are "within limits meaning that the user was categroized to something and
     * not to under_s or over_xxl
     */

    if (sizes_are_within_limits) {

        var size = measurements_outcome["height"]["size_label"];
        var new_size = "";
        var height = measurements_outcome["height"]["customer_measurement"];
        var weight = measurements_outcome["weight"]["customer_measurement"];
        var has_wide_chest = measurements_outcome["chest"];
        var explanation = "";

        if (weight_size != height_size) {
            console.log(size_mappings[weight_size])
            console.log(size_mappings[height_size])
            if (size_mappings[weight_size] > size_mappings[height_size]) {
                alert(has_wide_chest)
                if (has_wide_chest) {

                } else {
                    new_size = get_bigger_size_from_mappings(size);
                    explanation = explanations["size_up"]["weight_bigger_1"] + size +
                                  explanations["size_up"]["weight_bigger_2"] + new_size;
                    size = new_size;
                }
            } else {
                if (has_wide_chest) {

                } else {
                    new_size = get_bigger_size_from_mappings(size);
                    explanation = explanations["size_up"]["height_bigger_1"] + size +
                                  explanations["size_up"]["height_bigger_2"] + new_size;
                    size = new_size;
                }
            }
        }   else {
            explanation = explanations["normal"]["sizes_same"] + size;
        }
        return {
                "measurements_array": measurements_outcome,
                "size": size,
                "height": height,
                "weight": weight,
                "explanation": explanation,
                "within_limits": true
               };
    }   else {
        return { "measurements": measurements_outcome, "within_limits": false};
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
/**
 *  Used to get the one bigger size from mappings, if for example height goes to S limit but
 *  weight is a M weight.
 */
function get_bigger_size_from_mappings(smaller_size) {
    break_size = size_mappings[smaller_size] + 1;
    var new_customer_size = "";
    for (size in size_mappings) {
        if (size_mappings[size] == break_size) {
            new_customer_size = size;
        } else if (size == "xxl" && new_customer_size == "") {
            new_customer_size = smaller_size;
        }
    }
    return new_customer_size;
}

function get_body_type(determined_sizing) {
    $('#user-parameters').addClass('fadeOut');
    $('#user-parameters').hide();
    $('#size-popup-accurate').show();
    $('#upper-div-content')
        .append("<div class='size-text'>Awesome! You're size " + determined_sizing["size"] + "!</div>")
    $('#left-div')
        .append("<div class='left-text'>Your height: " + determined_sizing["height"] +  "cm</div>" +
                "<div class='left-text'>Your weight " + determined_sizing["weight"] + "kg</div>")
    $('#right-div')
        .append("<div class='right-text'>" + determined_sizing['explanation'] + "</div> ")
}



$(function() {
    /**
     * This is the Jquery function, that fires, when customer submits his given input as
     * measurements
     */
    $('#find-size-button').click(function() {

        var height = $('#height-input').val();
        var weight = $('#weight-input').val();
        var chest = $('#chest-input').val();
        var customer_measurements = { "weight": weight, "height": height, "chest": chest };

        var size_outcome = determine_size(size_guidelines, customer_measurements);

        /*if (!can_determine_size) {
            var accurate_size_outcome = get_body_type(size_outcome)
        }*/
        get_body_type(size_outcome);

    });
});

