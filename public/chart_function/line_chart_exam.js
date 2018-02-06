/*
 * LINE CHART
 * ----------
 */
//LINE randomly generated data

var sin = [],
    cos = [];
for (var i = 0; i < 14; i += 0.5) {
    sin.push([i, Math.sin(i)]);
    cos.push([i, Math.cos(i)]);
}
var line_data1 = {
    data: sin,
    color: "#3c8dbc"
};
var line_data2 = {
    data: cos,
    color: "#00c0ef"
};
$.plot("#senser-chart", [line_data1, line_data2], {
    grid: {
        hoverable: true,
        borderColor: "#f3f3f3",
        borderWidth: 1,
        tickColor: "#f3f3f3"
    },
    series: {
        shadowSize: 0,
        lines: {
            show: true
        },
        points: {
            show: true
        }
    },
    lines: {
        fill: false,
        color: ["#3c8dbc", "#f56954"]
    },
    yaxis: {
        min: 0,
        max: 1200,
        show: true,
    },
    xaxis: {
        mode: "categories",
        show: true
    }
});
//Initialize tooltip on hover
$('<div class="tooltip-inner" id="sensor-chart-tooltip"></div>').css({
    position: "absolute",
    display: "none",
    opacity: 0.8
}).appendTo("body");
$("#sensor-chart").bind("plothover", function(event, pos, item) {

    if (item) {
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);

        $("#sensor-chart-tooltip").html('test' + " of " + x + " = " + y)
            .css({
                top: item.pageY + 5,
                left: item.pageX + 5
            })
            .fadeIn(200);
    } else {
        $("#sensor-chart-tooltip").hide();
    }

});