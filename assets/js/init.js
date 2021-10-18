$(document).ready(function () {
    var menuLeft = $("#menu_js"),
        delayVal,
        transVal,
        i,
        item_menu = menuLeft.children(),
        booling = true,
        heightWin = $(window).height();
    $(".button_menu").click(function () {
        $(this).toggleClass("button_cross");
        menuLeft.toggleClass("menu_visible menu_hidden");
        if ($(".menu_hidden").is(menuLeft)) {
            delayVal = 0;
            transVal = 3;
            for (i = 0; i < item_menu.length; ++i) {
                delayVal++;
                transVal++;
                $(item_menu[i]).css({
                    "-webkit-animation-delay": delayVal / 25 + "s",
                    "animation-delay": delayVal / 25 + "s",
                    "-o-transition-delay": (transVal / 25) + "s",
                    "-webkit-transition-delay": (transVal / 25) + "s",
                    "transition-delay": (transVal / 25) + "s"
                });
            }
        } else {
            delayVal = 0;
            transVal = 5;
            for (i = 0; i < item_menu.length; ++i) {
                delayVal++;
                transVal += 10;
                $(".menu_visible").find(item_menu[i]).css({
                    "-webkit-animation-delay": (delayVal / 25) + "s",
                    "animation-delay": (delayVal / 25) + "s",
                    "-o-transition-delay": (transVal / 250) + "s",
                    "-webkit-transition-delay": (transVal / 250) + "s",
                    "transition-delay": (transVal / 250) + "s"
                });
            }
        }
    });

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var progress = $("#progress");
        var offsetProgress = progress.offset().top;
        $(".anchor_animation").each(function () {
            var element = this;
            var $element = $(element);
            var element_bounding = element.getBoundingClientRect();
            if (element_bounding.top <= scroll) {
                $element.removeClass("animation");
            }
        });
        if (!booling) return false;
        if (offsetProgress <= scroll + heightWin - (120)) {
            $(function () {
                $('.chart').easyPieChart({
                    scaleColor: '#FF00AE',
                    lineWidth: 15,
                    lineCap: ' but',
                    barColor: '#FFA616',
                    trackColor: "#606060",
                    size: 160,
                    scaleLength: 0,
                    animate: 1500
                });
            });
            booling = false;
        }
    });
    //////////////////// button to-top
    var toTop = $('.to-top');
    toTop.click(function () {
        $('body,html').animate({ scrollTop: 0 }, 800);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('.to-top').fadeIn();
        } else {
            $('.to-top').fadeOut();
        }
    });
    ////////////////// validation form
    $('input#name, input#email, textarea#message, input#phone').unbind().blur(function () {
        var id = $(this).attr('id');
        var val = $(this).val();
        switch (id) {
            case 'name':
                var rv_name = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я]/;
                if (val.length > 2 && val != '' && rv_name.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                    $(this).next('.help-block').text('Accepted').css('color', 'green').animate({ 'paddingLeft': '10px' }, 300).animate({ 'paddingLeft': '5px' }, 400);
                } else {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).next('.help-block').html('The "Your Name" field is required,<br> ' + 'the length of the name must be at least 2 characters long,' + '<br> field must contain only Russian or Latin letters')
                        .css('color', 'red').animate({ 'paddingLeft': '10px' }, 300).animate({ 'paddingLeft': '5px' }, 400);
                }
                break;
            case 'email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (val != '' && rv_email.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                    $(this).next('.help-block').text('Accepted').css('color', 'green').animate({ 'paddingLeft': '10px' }, 300).animate({ 'paddingLeft': '5px' }, 400);
                } else {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).next('.help-block').html('The "Email" field is mandatory,<br>' + 'field must contain a valid email address<br>').css('color', 'red').animate({ 'paddingLeft': '10px' }, 300).animate({ 'paddingLeft': '5px' }, 400);
                }
                break;
            case 'phone':
                var rv_tell = /\d[^a-zA-Zа-яА-Я]/;
                if (val != '' && rv_tell.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                    $(this).next('.help-block').text('Accepted').css('color', 'green').animate({ 'paddingLeft': '10px' }, 300).animate({ 'paddingLeft': '5px' }, 400);
                } else {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).next('.help-block').html('Field "Phone" is required,<br>' + 'field must contain only digits<br>').css('color', 'red').animate({ 'paddingLeft': '10px' }, 300).animate({ 'paddingLeft': '5px' }, 400);
                }
                break;
            case 'message':
                if (val != '' && val.length < 5000) {
                    $(this).removeClass('error').addClass('not_error');
                    $(this).next('.help-block').text('Accepted').css('color', 'green').animate({ 'paddingLeft': '10px' }, 300).animate({ 'paddingLeft': '5px' }, 400);
                } else {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).next('.help-block').html('The Text of the letter must not be empty, <br > '
                        + 'not more than 5000 symbols').css('color', 'red').animate({ 'paddingLeft': '10px' }, 300)
                        .animate({ 'paddingLeft': '5px' }, 400);
                }
                break;
        }
    });
    //////////////////////////// send mail
    $("#form").submit(function (e) {
        e.preventDefault();
        // var data = $(this).serialize();
        var form = $('#form').find('.swap-animation');
        var btnSend = $('#btn-send');
        var mailForm = $('#form')[0];
        var resErrText = 'Your message has not been sent! HTTP request status code ';

        function resultSuccess(txt) {
            btnSend.removeAttr("disabled").closest(".wrap_btn_animate").removeClass("active-animate");
            form.addClass('swap').find('.icon-swap').addClass('icon-check-circle-o').next('.submit-text').addClass('text-success').text(txt);
            btnSend.next('.send-text-error').text('');
            setTimeout(function () {
                form.removeClass('swap')
            }, 2010);
        }

        function resultError(statusErr) {
            btnSend.removeAttr("disabled").closest(".wrap_btn_animate").removeClass("active-animate");
            form.addClass('swap').find('.icon-swap').addClass('icon-ban').next('.submit-text').addClass('text-danger')
                .text('Your message has not been sent!');
            btnSend.next('.send-text-error').text(statusErr);
            setTimeout(function () {
                form.removeClass('swap')
            }, 2010);
        }
        if ($('.not_error').length == 4) {
            let dataform = new FormData(mailForm);
            var objSend = {};
            dataform.forEach((value, key) => objSend[key] = value);
            fetch('/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objSend),
            }).then((res) => {
                if (res.ok) {
                    res.text().then((resTxt) => {
                        resultSuccess(resTxt);
                        $(this)[0].reset()
                    })
                } else {
                    resultError(resErrText + res.status);
                }
            }).catch((error) => {
                console.error('Error fetch response:' + error.message);
                resultError('Error message: ' + error.message || 'error is undefined');

            });

            return false;
        }
        else {
            return false;
        }
    });

    //////////////////////// link scrolling
    $(".link-scrolling").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body, html').animate({ scrollTop: top }, 400);
    });
    $('input').placeholder();

});