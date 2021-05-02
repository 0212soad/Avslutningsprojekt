$(document).ready(function() {
    /*const checkpoint = 300;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= checkpoint) {
            opacity = 1 - currentScroll / checkpoint;
        } else {
            opacity = 0;
        }
        document.querySelector(".front").style.opacity = opacity;
    });*/
    $(".button").on("click", function() {
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
        $(".button").animate({
            opacity: 0 + '%'
        }, 1000)
        $(".front").toggleClass('animate');
    })
})