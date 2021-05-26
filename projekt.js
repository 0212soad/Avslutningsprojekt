//Publika variabler som används "mellan" olika funktioner
var chart = 0;
//'f' och 'r' är endast kontrollvariabler och saknar därför namn
var f = 0;
var r = 0;
//Värdena som visas då graferna öppnas för första gången
let xCoordBar = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let yCoordBar = [1, 4, 3, 7, 5, 10, 3];
let xCoordLine = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let yCoordLine = [1, 4, 3, 7, 5, 10, 3];

//Animerar alla "lösa" images ur bild
function moveImages() {
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
        //Stänger sidpanel 1 ifall den är öppen
    if (document.getElementById("mySidepanel1").style.width == "26%") {
        $(".sidepanel1").css("width", "0%");
    }
    //Gömmer 'Get Started'-knappen
    $(".getStarted").hide();
}

//Öppnar sidpanel 1
function openNav1() {
    $(".sidepanel1").css("width", "26%");
}

//Stänger sidpanel 1
function closeNav1() {
    $(".sidepanel1").css("width", "0%");
}
var nav = false;

//Öppnar sidpanel 2, visar dess innehåll och byter håll på '>'
function openNav2() {
    $(".sidepanel2").css("width", "37%");
    $(".openbtn2").css("right", "37%");
    $(".btn-group").show();
    $("h2").show();
    document.getElementById("openbtn2").innerHTML = "&gt;";
    nav = true;
}

//Stänger sidpanel 2, gömmer dess innehåll och byter håll på '<'
function closeNav2() {
    $(".sidepanel2").css("width", "0%");
    $(".openbtn2").css("right", "0%");
    $(".btn-group").hide();
    $("h2").hide();
    document.getElementById("openbtn2").innerHTML = "&lt;";
    nav = false;
}

//Skapar toggleeffekten mellan navfunktionerna ovan
function toggleNav2() {
    nav ? closeNav2() : openNav2();
}

//Visar (enbart) graf-griden då graftypen ännu inte har valts
function showGrid() {
    openNav2();
    $(".ct-chart").fadeIn();
    $(".openbtn2").fadeIn();
    var data = {
        series: [10],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
    var options = {
        axisX: {
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

//Gömmer och visar olika element då 'Bar' klickas
function pressBar() {
    $(".xCoordBar").show();
    $(".yCoordBar").show();
    $(".doneBar").show();
    $(".nextBar").show();
    $(".bar").hide();
    $(".line").hide();
    $(".rubrikB").show();
    $(".rubrikC").show();
    //Ändrar rubrik A beroende på om användaren skriver första eller nästkommande värden
    if (r == 0) {
        document.getElementById("rubrikA").innerHTML = "Enter data for the first bar";
        r = 1;
    } else {
        document.getElementById("rubrikA").innerHTML = "Enter data for the next bar";
    }
}

//Samma fast för 'Line'
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

//Sätter in namnet och värdet på stapeln i var sin array och raderar värdet i inputen
function nextBar() {
    xCoordBar[f] = $(".xCoordBar").val();
    document.getElementById("xCoordBar").value = "";
    yCoordBar[f] = $(".yCoordBar").val();
    document.getElementById("yCoordBar").value = "";
    f++;
}

//Samma fast för en punkt i linjediagrammet
function nextPoint() {
    xCoordLine[f] = $(".xCoordLine").val();
    document.getElementById('xCoordLine').value = "";
    yCoordLine[f] = $(".yCoordLine").val();
    document.getElementById("yCoordLine").value = "";
    f++;
}

//Skapar stapeldiagrammet
function makeChartBar() {
    //Använder de publika variablerna som fick sina värden i funktionen 'nextBar()'
    var data = {
            labels: xCoordBar,
            series: [yCoordBar]
        }
        //Visuella inställningar
    var options = {
            //Ökat avstånd mellan grid-linjer för att minska animationstiden
            axisX: {
                scaleMinSpace: 50,
            },
            axisY: {
                scaleMinSpace: 50,
            },
            low: 0,
            width: "55%",
            height: "65%",
            //Visar allt som inte visades i funktionen 'showGrid()'
            showLine: true,
            showLabel: true,
            showPoint: true,
        }
        //Skapar själva stapeldiagrammet och byter ut grafen i funktionen 'showGrid()'
    chart = new Chartist.Bar('.ct-chart', data, options);
    animate();
    //Rensar värdena
    xCoordBar = [];
    yCoordBar = [];
    f = 0;
}

//Samma fast för linjediagrammet
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

//Skapar animationseffekten på grafen så fort den uppdateras
function animate() {
    var seq = 0,
        delays = 80,
        durations = 500;
    chart.on('created', function() {
        seq = 0;
    });
    chart.on('draw', function(data) {
        seq++;
        //Går igenom varje enskilt element i diagrammet och skapar liknande animationseffekter
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

//Gömmer alla element i sidpanel 2 då 'Done' klickas
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

//Startar om grafverktyget och byter rubrik
function startAgain() {
    $(".bar").show();
    $(".line").show();
    document.getElementById("rubrikA").innerHTML = "Create another chart";
}

//Skapar zoomeffekten ('transform:scale()' skapade problem med chartist)
function zoomit() {
    document.querySelector('.front').style.backgroundSize = "4000%";
    document.querySelector('.front').style.backgroundPosition = "center -2000vh";
}

//Gömmer alla element på skärmen då användaren navigerar till en annan plats på sidan
function hideAllElements() {
    closeNav2();
    $(".openbtn2").fadeOut();
    $(".ct-chart").fadeOut();
    $('.about').hide();
    $('.contact').hide();
    xCoordBar = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    yCoordBar = [1, 4, 3, 7, 5, 10, 3];
    xCoordLine = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    yCoordLine = [1, 4, 3, 7, 5, 10, 3];
}

//Visar innehållet i contact
function contact() {
    $('.contact').show();
}

//Visar innehållet i about
function about() {
    $('.about').show();
}

//Öppna log-in-menyn när 'Log In' klickas
function logIn() {
    document.getElementById('container').style.display = 'block'
}
var container = document.getElementById('container');
//Stäng menyn när man klickar utanför boxen
window.onclick = function(event) {
    if (event.target == container) {
        container.style.display = "none";
    }
}