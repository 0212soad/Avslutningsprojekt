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

function ShowGraph() {
    $(".ct-chart").addClass('animate');
    $(".openbtn2").show();
}

var type = null;

function MakeGraph() {
    var chart = new Chartist.Line('.ct-chart', {
        series: [
            [
                { x: 1, y: 100 },
                { x: 2, y: 50 },
                { x: 3, y: 25 },
                { x: 5, y: 12.5 },
                { x: 8, y: 6.25 }
            ]
        ]
    }, {
        axisX: {
            type: Chartist.AutoScaleAxis,
        },
        low: 0,
        width: 25 + '%',
        height: 25 + '%'
    });

    // Let's put a sequence number aside so we can use it in the event callbacks
    var seq = 0,
        delays = 80,
        durations = 500;

    // Once the chart is fully created we reset the sequence
    chart.on('created', function() {
        seq = 0;
    });

    // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
    chart.on('draw', function(data) {
        seq++;
        if (data.type === 'line') {
            // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
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
                    // We can specify an easing function from Chartist.Svg.Easing
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
            // Using data.axis we get x or y which we can use to construct our animation definition objects
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
        }
    });
}

function Bar() {
    MakeGraph();
}

function Line() {
    MakeGraph();
}