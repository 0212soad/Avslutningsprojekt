var chart = 0;
$(document).ready(function() {
    $(".zoom").on("click", function() {
        $(".a").each(function() {
            var left = $(this).position().left;
            var top = $(this).position().top;
            if (left <= 550) {
                $(this).animate({
                    left: left - 750 + 'px'
                }, 1000)
            } else if (left >= 1200) {
                $(this).animate({
                    left: left + 400 + 'px'
                }, 1000)
            } else if (top <= 50) {
                $(this).animate({
                    top: top - 550 + 'px'
                }, 1000)
            } else {
                $(this).animate({
                    top: top + 500 + 'px'
                }, 1000)
            }
        })
        if (document.getElementById("mySidepanel1").style.width == "26%") {
            $(".sidepanel1").css("width", "0%");
        }
        $(".getStarted").addClass('animate');
        $(".front").addClass('animate');
    })
})

//Sidepanel 1

function openNav1() {
    $(".sidepanel1").css("width", "26%");
}

function closeNav1() {
    $(".sidepanel1").css("width", "0%");
}
var nav = false;

//Sidepanel 2

function openNav2() {
    $(".sidepanel2").css("width", "37%");
    $(".openbtn2").css("right", "37%");
    $(".btn-group").show();
    $("h2").show();
    document.getElementById("openbtn2").innerHTML = "&gt;";
    nav = true;
}

function closeNav2() {
    $(".sidepanel2").css("width", "0%");
    $(".openbtn2").css("right", "0%");
    $(".btn-group").hide();
    $("h2").hide();
    document.getElementById("openbtn2").innerHTML = "&lt;";
    nav = false;
}

function toggleNav2() {
    nav ? closeNav2() : openNav2();
}

//Grafer

function ShowChart() {
    openNav2();
    $(".ct-chart").addClass('animate');
    $(".openbtn2").addClass('animate');
    var data = {
        series: [
            [
                { x: 0, y: 1 },
                { x: 2, y: 2 },
                { x: 4, y: 3 },
                { x: 6, y: 4 },
                { x: 8, y: 5 }
            ]
        ]
    }
    var options = {
        axisX: {
            type: Chartist.AutoScaleAxis,
        },
        low: 0,
        width: "22%",
        height: "25%",
        showLine: false,
        showLabel: false,
        showPoint: false,
    }
    chart = new Chartist.Line('.ct-chart', data, options);
}

function Bar() {
    var data = {
        series: [
            [
                { x: 0, y: 1 },
                { x: 2, y: 2 },
                { x: 4, y: 3 },
                { x: 6, y: 4 },
                { x: 8, y: 5 }
            ]
        ]
    }
    var options = {
        axisX: {
            type: Chartist.AutoScaleAxis,
        },
        low: 0,
        width: "22%",
        height: "25%",
        showLine: true,
        showLabel: true,
        showPoint: true,
    }
    chart.update(data, options);
}