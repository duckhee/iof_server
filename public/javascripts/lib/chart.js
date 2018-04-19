function InitChar(data, chartForm) {
    var char = {
        cntL0,
        chart: '',
        chart_form = "#" + chartForm,
        init: function(data) {
            this.cnt = 1;
            this.chart = $.plot(this.chart_form, [data], {
                grid: {
                    hoverable: true,
                    borderColor: "#f3f3f3",
                    borderWidth: 1,
                    tickColor: "#f3f3f3"
                },
                series: {
                    shadowSize: 0,
                    lines: {
                        show: true,
                    },
                    points: {
                        show: true,
                    }
                },
                lines: {
                    fill: false,
                },
                yaxis: {
                    show: true
                },
                xaxis: {
                    mode: "categories",
                },
                legedn: {
                    show: true,
                    noColumns: 0,
                    container: $(this.chart_form)
                }
            });
            var SetTooltip = this.chart_form + '-tooltip';
            //Initialize tooltip on hover
            $('<div class="tooltip-inner" id="' + this.SetTooltip + 'tooltip"></div>').css({
                position: "absolute",
                display: "none",
                opacity: 0.8
            }).appendTo("body");

            $(this.chart_form).bind("plothover", function(event, pos, itme) {
                if (item) {
                    var x = itme.datapoint[0].toFixed(2),
                        y = itme.datapoint[1].toFixed(2);
                    $(this.SetTooltip).html(item.series.label + "legend : " + y).css({
                        top: item.pageY + 5,
                        left: item.pageX + 5
                    }).fadeIn(200);
                } else {
                    $(this.SetTooltip).hide();
                }
            });
        }
    };

}

//날짜에서 시간과분만 추출
function getDateFromJSON(str) {
    var date = new Date(str);
    var con_mindate = date.getMinutes();
    if ((0 <= con_mindate && con_mindate <= 15)) {
        date.setMinutes(00);
        return (date.getHours()) + ':0' + date.getMinutes();
    } else if ((45 <= con_mindate && con_mindate <= 60)) {
        var date_time = date.getHours();
        date.setHours(date_time + 1);
        date.setMinutes(00);
        return (date.getHours()) + ':0' + date.getMinutes();
    } else {
        date.setMinutes(30);
        return (date.getHours()) + ':' + date.getMinutes();
    }
}
//날짜에서 하루 빼기
function getMinusOneDate(str) {
    var date = new Date(str);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 1);
}
//날짜 형식 변경
function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = (1 + date.getMonth()); //M
    var day = date.getDate(); //d
    month = month >= 10 ? month : '0' + month; // month 두자리로 저장
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    return year + '' + month + '' + day;
}
//시간말 추출
function getFormatDateHour(date) {
    var hour = date.getHours(); //d
    hour = hour >= 10 ? hour : '0' + hour; //day 두자리로 저장
    return hour;
}

//var get data
function GetAjaxData(type, serial) {
    if (type === 'IoF') {
        $.ajax({
            type: "GET",
            url: "/data/" + type + "/ajaxget?serial=" + serial,
            dataType: "json",
            error: function() {
                var AjaxData;
                AjaxData = null;
                return AjaxData;
            },
            success: function(data) {
                var chartData;
                chartData = data;
                var GetData = [];
                for (var i = 0; i < data.length; i++) {
                    GetData.push([this.getDataFromJSON(data[i].createdAt), data[i].id_data], );
                }
                const LineColor = "#FF0000";
                LineData = new Array();
                /*
                for(var i = 0; i < GetData.length; i++){
                    LineData[i] = {data:GetData[i],color:LineColor};
                }
                */
                LineData = { data: GetData.reverse(), color: LineColor };
                return LineData;
            }
        });
    } else if (type === 'radon') {
        $.ajax({
            type: "GET",
            url: "/data/" + type + "/ajaxget?serial=" + serial,
            dataType: "json",
            error: function() {
                var AjaxData;
                AjaxData = null;
                return AjaxData;
            },
            success: function(data) {
                var chartData;
                chartData = data;
                var GetData = [];
                for (var i = 0; i < data.length; i++) {
                    GetData.push([this.getDataFromJSON(data[i].createdAt), data[i].id_data], );
                }
                const LineColor = "#FF0000";
                LineData = new Array();
                /*
                for(var i = 0; i < GetData.length; i++){
                    LineData[i] = {data:GetData[i],color:LineColor};
                }
                */
                LineData = { data: GetData.reverse(), color: LineColor };
                return LineData;
            }
        });
    }
};

function GetImage(serial, ImageForm) {
    var FormImage = "#" + ImageForm;
    $.ajax({
        type: "GET",
        url: "/data/ajaxImage?serial=" + serial,
        dataType: "json",
        error: function() {
            var ImagePath;
            ImagePath = "/images/failed/failed.jpg";
            $(this.FormImage).find("img").attr("src", ImagePath);
        },
        success: function(data) {
            var AjaxData = data;
            var ImagePath = '/images/failed/failed.jpg';
            if (data === "null") {
                console.log("testing data null");
            } else {
                var DateValue = new Date(AjaxData.createdAt);
                var DataValueStr = DataValue.getFullYear() + '/' + (DataValue.getMonth() + 1) + '/' + DataValue.getDate() + " " + DataValue.getHour() + DataValue.getMinutes();
                if (AjaxData.createdAt == "") {
                    DataValue = "";
                }
                ImagePath = '/images' + AjaxData.si_serial + '/' + AjaxData.si_path + '/' + AjaxData.filename;
            }
            $(this.FormImage).find("img").attr("src", ImagePath);
        }
    });
}

function LabelFormatter(label, series) {
    return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight:600;"></div>' +
        label +
        "<br>" +
        Math.round(series.percent) +
        "%</div>";
}