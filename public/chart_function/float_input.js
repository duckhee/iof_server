            //날짜에서 시간과분만 추출
            function getDateFromJSON(str) {
                var date = new Date(str);
                return (date.getHours() + 9) + ':' + date.getMinutes();
            }

            function ec_data(ec_datainfo) {

                var ec_data = [];
                // var array;
                // var array = ec_datainfo[i].sd_data.split(',');
                for (var i = 0; i < 8; i++) {
                    ec_data.push(getDateFromJSON[ec_datainfo[i].createdAt], ec_datainfo[i].sd_data);

                }
                var ec_data_obj = {
                    data: ec_data.reverse(),
                    color: "#3c8dbc",
                }

                $.plot("#ec-chart", [ec_data_obj], {
                    grid: {
                        hoverable: true,
                        borderColor: "#f3f3f3",
                        bordoerWidth: 1,
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
                $('<div class="tooltip-inner" id="ec-chart-tooltip"></div>').css({
                    position: "absolute",
                    display: "none",
                    opacity: 0.8
                }).appendTo("body");
                $("#ec-chart").bind("plothover", function(event, pos, item) {

                    if (item) {
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        $("#ec-chart-tooltip").html('test' + " of " + x + " = " + y)
                            .css({
                                top: item.pageY + 5,
                                left: item.pageX + 5
                            })
                            .fadeIn(200);
                    } else {
                        $("#ec-chart-tooltip").hide();
                    }

                });
            }

            function temperature_data(temperature_datainfo) {
                var temperature = [];

                for (var i = 8; i < 16; i++) {
                    temperature.push(getDateFromJSON[temperature_datainfo[i].createdAt], temperature_datainfo[i].sd_data);
                }
                var temperature_obj = {
                    data: temperature.reverse(),
                    color: "#3c8dbc",
                }
                $.plot("#temperature-chart", [temperature_obj], {
                    grid: {
                        hoverable: true,
                        borderColor: "#f3f3f3",
                        bordoerWidth: 1,
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
                $('<div class="tooltip-inner" id="temperature-chart-tooltip"></div>').css({
                    position: "absolute",
                    display: "none",
                    opacity: 0.8
                }).appendTo("body");
                $("#temperature-chart").bind("plothover", function(event, pos, item) {

                    if (item) {
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        $("#temperature-chart-tooltip").html('test' + " of " + x + " = " + y)
                            .css({
                                top: item.pageY + 5,
                                left: item.pageX + 5
                            })
                            .fadeIn(200);
                    } else {
                        $("#temperature-chart-tooltip").hide();
                    }

                });
            }

            function moisture_data(moisture_datainfo) {
                var moisture = [];

                for (var i = 16; i < 24; i++) {
                    moisture.push(getDateFromJSON[moisture_datainfo[i].createdAt], moisture_datainfo[i].sd_data);
                }
                var moisture_obj = {
                    data: moisture.reverse(),
                    color: "#3c8dbc",
                }

                $.plot("#moisture-chart", [moisture_obj], {
                    grid: {
                        hoverable: true,
                        borderColor: "#f3f3f3",
                        bordoerWidth: 1,
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
                $('<div class="tooltip-inner" id="moisture-chart-tooltip"></div>').css({
                    position: "absolute",
                    display: "none",
                    opacity: 0.8
                }).appendTo("body");
                $("#moisture-chart").bind("plothover", function(event, pos, item) {

                    if (item) {
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        $("#moisture-chart-tooltip").html('test' + " of " + x + " = " + y)
                            .css({
                                top: item.pageY + 5,
                                left: item.pageX + 5
                            })
                            .fadeIn(200);
                    } else {
                        $("#moisture-chart-tooltip").hide();
                    }

                });
            }