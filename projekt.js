var chart = 0;
var f = 0;
var r = 0;
let xCoordBar = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let yCoordBar = [1, 4, 3, 7, 5, 10, 3];
let xCoordLine = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let yCoordLine = [1, 4, 3, 7, 5, 10, 3];
$(document).ready(function() {
    $(".zoom").on("click", function() {
        $(".a").each(function() {
            var left = $(this).position().left;
            var top = $(this).position().top;
            if (left <= 550) {
                $(this).animate({
                    left: left - 1050 + 'px'
                }, 1000)
            } else if (left >= 1200) {
                $(this).animate({
                    left: left + 700 + 'px'
                }, 1000)
            } else if (top <= 50) {
                $(this).animate({
                    top: top - 850 + 'px'
                }, 1000)
            } else {
                $(this).animate({
                    top: top + 800 + 'px'
                }, 1000)
            }
        })
        if (document.getElementById("mySidepanel1").style.width == "26%") {
            $(".sidepanel1").css("width", "0%");
        }
        $(".getStarted").hide();
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
    $(".ct-chart").fadeIn();
    $(".openbtn2").fadeIn();
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
            scaleMinSpace: 60,
        },
        axisY: {
            scaleMinSpace: 60,
        },
        low: 0,
        width: "55%",
        height: "65%",
        showLine: false,
        showLabel: false,
        showPoint: false,
    }
    chart = new Chartist.Line('.ct-chart', data, options);
    animate();
}

function pressBar() {
    $(".xCoordBar").show();
    $(".yCoordBar").show();
    $(".doneBar").show();
    $(".nextBar").show();
    $(".bar").hide();
    $(".line").hide();
    $(".rubrikB").show();
    $(".rubrikC").show();
    if (r == 0) {
        document.getElementById("rubrikA").innerHTML = "Enter data for the first bar";
        r = 1;
    } else {
        document.getElementById("rubrikA").innerHTML = "Enter data for the next bar";
    }
}

function pressLine() {
    $(".xCoordLine").show();
    $(".yCoordLine").show();
    $(".doneLine").show();
    $(".nextPoint").show();
    $(".bar").hide();
    $(".line").hide();
    $(".rubrikB").show();
    $(".rubrikC").show();
    if (r == 0) {
        document.getElementById("rubrikA").innerHTML = "Enter data for the first point";
        r = 1;
    } else {
        document.getElementById("rubrikA").innerHTML = "Enter data for the next point";
    }
}

function nextBar() {
    xCoordBar[f] = $(".xCoordBar").val();
    document.getElementById("xCoordBar").value = "";
    yCoordBar[f] = $(".yCoordBar").val();
    document.getElementById("yCoordBar").value = "";
    f++;
}

function nextPoint() {
    xCoordLine[f] = $(".xCoordLine").val();
    document.getElementById('xCoordLine').value = "";
    yCoordLine[f] = $(".yCoordLine").val();
    document.getElementById("yCoordLine").value = "";
    f++;
}

function makeChartBar() {
    var data = {
        labels: xCoordBar,
        series: [yCoordBar]
    }
    var options = {
        axisX: {
            scaleMinSpace: 40,
        },
        axisY: {
            scaleMinSpace: 40,
        },
        low: 0,
        width: "55%",
        height: "65%",
        showLine: true,
        showLabel: true,
        showPoint: true,
    }
    chart = new Chartist.Bar('.ct-chart', data, options);
    animate();
    xCoordBar = [];
    yCoordBar = [];
    f = 0;
}

function makeChartLine() {
    var data = {
        labels: xCoordLine,
        series: [yCoordLine]
    }
    var options = {
        axisX: {
            scaleMinSpace: 50,
        },
        axisY: {
            scaleMinSpace: 50,
        },
        low: 0,
        width: "55%",
        height: "65%",
        showLine: true,
        showLabel: true,
        showPoint: true,
        lineSmooth: Chartist.Interpolation.cardinal({
            fillHoles: true,
        })
    }
    chart = new Chartist.Line('.ct-chart', data, options);
    animate();
    xCoordLine = [];
    yCoordLine = [];
    f = 0;
}

function animate() {
    var seq = 0,
        delays = 80,
        durations = 500;
    chart.on('created', function() {
        seq = 0;
    });
    chart.on('draw', function(data) {
        seq++;

        if (data.type === 'line') {
            data.element.animate({
                opacity: {
                    begin: seq * delays + 1000,
                    dur: durations,
                    from: 0,
                    to: 1
                }
            });
        } else if (data.type === 'label' && data.axis === 'x') {
            data.element.animate({
                y: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.y + 100,
                    to: data.y,
                    easing: 'easeOutQuart'
                }
            });
        } else if (data.type === 'label' && data.axis === 'y') {
            data.element.animate({
                x: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 100,
                    to: data.x,
                    easing: 'easeOutQuart'
                }
            });
        } else if (data.type === 'point') {
            data.element.animate({
                x1: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                x2: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                }
            });
        } else if (data.type === 'grid') {
            var pos1Animation = {
                begin: seq * delays,
                dur: durations,
                from: data[data.axis.units.pos + '1'] - 30,
                to: data[data.axis.units.pos + '1'],
                easing: 'easeOutQuart'
            };

            var pos2Animation = {
                begin: seq * delays,
                dur: durations,
                from: data[data.axis.units.pos + '2'] - 100,
                to: data[data.axis.units.pos + '2'],
                easing: 'easeOutQuart'
            };

            var animations = {};
            animations[data.axis.units.pos + '1'] = pos1Animation;
            animations[data.axis.units.pos + '2'] = pos2Animation;
            animations['opacity'] = {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'easeOutQuart'
            };

            data.element.animate(animations);
        } else if (data.type === 'bar') {
            data.element.animate({
                opacity: {
                    begin: seq * delays + 1000,
                    dur: durations,
                    from: 0,
                    to: 1
                }
            });
        }
    });
}

function pressDone() {
    $(".xCoordLine").hide();
    $(".yCoordLine").hide();
    $(".doneLine").hide();
    $(".nextPoint").hide();
    $(".rubrikB").hide();
    $(".rubrikC").hide();
    $(".xCoordBar").hide();
    $(".yCoordBar").hide();
    $(".doneBar").hide();
    $(".nextBar").hide();
}

function startAgain() {
    $(".bar").show();
    $(".line").show();
    document.getElementById("rubrikA").innerHTML = "Create another chart";
}

function zoomit() {
    document.querySelector('.front').style.backgroundSize = "4000%";
    document.querySelector('.front').style.backgroundPosition = "center -2000vh";
}