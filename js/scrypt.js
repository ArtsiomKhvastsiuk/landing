/*
$(document).ready(function () {
    /!* arrow movement  *!/
    setInterval(function () {
        $(arrow).animate({top: '+=20', opacity: '1'}, 1200)
            .animate({top: '-=20', opacity: '.1'}, 1100);
    });

    /!* scrolling with wheel*!/
    let currentPage = $("#home");
    let wheelCount = 0;
    window.addEventListener('wheel', scrolling);
    function scrolling(event) {
        const timer = setTimeout(function() {
        if (event.deltaY > 0) {
            currentPage = $(currentPage).next();
            toggleCircle(currentPage);
            scrollTo(currentPage);
            $(".scroll-bar").delay(200).fadeIn();
        } else if (event.deltaY < 0) {
            wheelCount = 0;
            currentPage = $(currentPage).prev();
            scrollTo(currentPage);
            toggleCircle(currentPage);
            if (currentPage.attr('id') === 'home')
                $(".scroll-bar").delay(200).fadeOut();
        }
         }, 1);
    }
});


function toggleCircle(currentPage) {
    const scrollBarLinks = $(".scroll-bar > ul > li > a");
    const id = $(currentPage).attr("id");
    for (let i = 0; i < scrollBarLinks.length; i++) {
        if ($(scrollBarLinks[i]).attr('href') === "#" + id) {
            const b = $('a[href="#' + id + '"] > div[class="circle"]');
            b.addClass('scroll-bar-active');
        } else {
            const kids = $(scrollBarLinks[i]).children();
            $(kids[1]).removeClass('scroll-bar-active');
        }
    }
}

function scrollTo(currentPage) {
    $('html, body').animate({
        scrollTop: $(currentPage).offset().top
    }, 1000);
}










/!**
 * Created by inatm on 28.07.2017.
 *!/
*/

$(document).ready(function () {
    /* arrow movement  */
    setInterval(function () {
        $(arrow).animate({top: '+=20', opacity: '1'}, 1200)
            .animate({top: '-=20', opacity: '.1'}, 1100);
    });

    window.addEventListener('wheel', scrolling);
    function scrolling(event) {
        const currentPage = $(".active");
        toggleCircle(currentPage[0]);
        if (event.deltaY > 0) {
            $(".scroll-bar").delay(200).fadeIn();

        }

        if (event.deltaY < 0) {
            if (currentPage[0].attr('data-anchor') === 'home')
                $(".scroll-bar").fadeOut();
        }
    }

    $(".circle").click(function(event) {
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
