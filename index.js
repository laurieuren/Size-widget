/**
 * Created by laurieuren on 8.5.2016.
 */

// READ SIZE CHART FROM JSON FILE WITH ASYNC FALSE
function get_size_chart()
{
    var size_chart= (function () {
            var size_chart = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': "size-chart.json",
                'dataType': "json",
                'success': function (data) {
                    size_chart = data;
                }
            });
            return size_chart;
        })();
    return size_chart
}

function determine_size(size_chart, sizes) {
    var response_text = "";
    for (measurement_type in sizes) {
        compare_sizes(measurement_type, sizes[measurement_type], size_chart[measurement_type])
    }
};

function recommend_size(customer_measurement, size_chart_size) {
    if ()
}

function compare_sizes(type, customer_measurement, size_chart) {
    last_size = "";
    recommended_size = "";
    if (type == "chest") {
        for (size in size_chart) {
            if (customer_measurement < size_chart[size]) {
                recommend_size(customer_measurement, size_chart[size]);
                break;
            } else if (customer_measurement > size_chart[size] && size == "XXL") {
                //TODO: how to deal XXL ?
                recommended_size = "XXL"
            }
            last_size = size
        }
    } else if (type == "waist") {
    } else {
    }
}

$(document).ready(function() {
    $(function() {

    /*
     * This is the Jquery function, that fires, when customer submits his given input as measurements
     */
    $('#size-reveal').click(function() {
        var chest = $('#chest-width').val();
        var waist = $('#waist-width').val();
        var sleeve = $('#sleeve-length').val();
        var measurements = {"chest": chest, "waist": waist, "sleeve": sleeve};
        var size_chart = get_size_chart();
        determine_size(size_chart, measurements);

    });
    // Here is the initial pop-up open and close functions with jquery.
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = $(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        e.preventDefault();
    });

    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = $(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
        });

    });
});

