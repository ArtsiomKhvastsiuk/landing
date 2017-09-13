$(document).ready(function () {

    const burgerLinks = $(".burger-content > ul > li > a");
    $(burgerLinks).each(function() {
       this.on('click', function() {
           $(".burger-content ").fadeOut();
       });
    });

    /* arrow movement  */
    setInterval(function () {
        $(arrow).animate({bottom: '-=20', opacity: '1'}, 1200)
            .animate({bottom: '+=20', opacity: '.1'}, 1100);
    }, 0);

    $(arrow).on('click', () => {
        $.fn.fullpage.moveSectionDown();
        $(".scroll-bar").fadeIn();
        toggleCircle($(".active"));
    });

    // I have needed to do it because fullpage library set incorrect height
    const heigth = $(window).height();
    $(".contacts-container").css("height", heigth);
    $(".news-container img").css("height", heigth);


    /* slide show animation in carousel "partnersCarousel". */
    $('#partnersCarousel').bind('slide.bs.carousel', function (e) {
        $(".active img").css("opacity", 0);
        $('.active img').fadeTo(700, 1);
    });

    /*
     * pressing the home button in the side slider.
     * by pressing the slider disappears
     * */
    $("#navigation a[href='#home']").on('click', () => {
        $(".scroll-bar").fadeOut();
    });


    window.addEventListener('wheel', scrolling);
    function scrolling(event) {
        const currentPage = $(".active");
        if ($(currentPage[0]).attr("data-anchor")) {
            toggleCircle(currentPage[0]);
        } else {
            toggleCircle(currentPage[1]);
        }

        if (event.deltaY > 0) {
            $(".scroll-bar").delay(200).fadeIn();

        }

        if (event.deltaY < 0) {
            // do refactor!
            if (currentPage[0].attributes[1].value === 'home')
                $(".scroll-bar").fadeOut();
        }
    }

    $(".circle").click(function (event) {
        const circles = $(".circle");
        for (let i = 0; i < circles.length; i++) {
            if (event.target === circles[i])
                $(circles[i]).addClass("scroll-bar-active");
            else $(circles[i]).removeClass("scroll-bar-active");
        }
    });

    $(".options-button").on("click", () => {
        $(".overlay").fadeIn();
        $.fn.fullpage.setMouseWheelScrolling(false);
    });

    $(".overlay").on("click", () => {
        $(".overlay").fadeOut();
        $.fn.fullpage.setMouseWheelScrolling(true);
    });
});


function toggleCircle(currentPage) {
    const scrollBarLinks = $(".scroll-bar > ul > li > a");
    const id = $(currentPage).attr("data-anchor");
    for (let i = 0; i < scrollBarLinks.length; i++) {
        if ($(scrollBarLinks[i]).attr('href') === "#" + id) {
            const circle = $('a[href="#' + id + '"] > div[class="circle"]');
            circle.addClass('scroll-bar-active');
        } else {
            const kids = $(scrollBarLinks[i]).children();
            $(kids[1]).removeClass('scroll-bar-active');
        }
    }
}

