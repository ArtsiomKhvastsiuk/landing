$(document).ready(function () {

    const burgerLinks = $(".burger-content > ul > li > a");
    for (let i = 0; i < burgerLinks.length; i++) {
        $(burgerLinks[i]).on('click', function () {
            $(".burger-content ").fadeOut();
            $.fn.fullpage.setMouseWheelScrolling(true);
            $(".burger").toggleClass("change");
        });
    }

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

    let card = "";
    $(".options-button").on("click", (event) => {
        card = event.currentTarget.parentElement.id;
        $(".overlay").fadeIn();
        $(".form-container").fadeIn();
        $.fn.fullpage.setMouseWheelScrolling(false);
    });

    $(".overlay").on("click", () => {
        $(".overlay").fadeOut();
        $(".form-container").fadeOut();
        $.fn.fullpage.setMouseWheelScrolling(true);
    });


    // sending data of form to server
    $(".form-button").on('click', () => {

        let email = $("#email").val();
        let name = $("#name").val();
        let phone = $("#phone").val();

        // validation
        if (email.length === 0 || name.length === 0 || phone.length === 0) {
            alert('Заполните все поля');
        } else {
            if (checkInputEmail(email) && checkInputName(name) && checkInputPhone(phone)) {
                $.post("http://localhost:3000", {
                    card: card,
                    email: email,
                    name: name,
                    phone: phone
                })
                    .done(() => {
                        $('#form')[0].reset();
                    })
                    .fail((err) => {
                        alert("Ошибка соединения с сервером.")
                    })
            }

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

function toggleIcon(burger) {
    burger.classList.toggle("change");
    if ($(".burger-content").css("display") === "none") {
        $(".burger-content ").css("display", "flex");
        $.fn.fullpage.setMouseWheelScrolling(false);
    } else {
        $(".burger-content ").fadeOut();
        $.fn.fullpage.setMouseWheelScrolling(true);
    }
}

function checkEmail(email) {
    if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return 'Проверьте адрес электронной почты';
    }
    return true;
}

function checkInputEmail(email) {
    const result = checkEmail(email);
    if (result === true) {
        return true;
    } else {
        alert(result);
    }
}

function checkName(name) {
    if (!name.match(/^[- А-Яа-яЁёA-Za-z\s]*$/)) {
        return 'Вы можете использовать кирилицу, латиницу, а также пробел и дефис'
    }

    if (name.length > 32) {
        return 'Слишком длинное имя';
    }

    return true;
}

function checkInputName(name) {
    const result = checkName(name);
    if (result === true) {
        return true;
    } else {
        alert(result);
    }
}

function checkPhone(phone) {
    if (!phone.match(/^(\+375|80)\s?(29|25|44|33)\s?(\d{3})\s?(\d{2})\s?(\d{2})$/)) {
        return 'Неправильный номер или формат записи. ' +
            '\nВозможные форматы:\n +375xxxxxxxxx\n+375 xx xxx xx xx';
    }
    return true;
}

function checkInputPhone(phone) {
    const result = checkPhone(phone);
    if (result === true) {
        return true;
    } else {
        alert(result);
    }
}
