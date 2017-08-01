

$(document).ready(function () {

    // I have needed do it because of fullpage library set incorrect height
    const heigth = $(window).height();
    $(".contacts-container").css("height", heigth);
    $(".news-container img").css("height", heigth);



    $('#myCarousel1').bind('slide.bs.carousel', function (e) {
        $(".active img").css("opacity", 0);
        $('.active img').fadeTo(700, 1);
    });

    $("#navigation a[href='#home']").on('click', () => {
        $(".scroll-bar").fadeOut();
    });


    /* arrow movement  */
    setInterval(function () {
        $(arrow).animate({bottom: '-=20', opacity: '1'}, 1200)
            .animate({bottom: '+=20', opacity: '.1'}, 1100);
    }, 0);

    window.addEventListener('wheel', scrolling);
    function scrolling(event) {
        const currentPage = $(".active");
        toggleCircle(currentPage[0]);
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


});



function toggleCircle(currentPage) {
    const scrollBarLinks = $(".scroll-bar > ul > li > a");
    const id = $(currentPage).attr("id");
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

