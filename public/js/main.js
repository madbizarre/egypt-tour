;(function (){
    var map;

    DG.then(function (){
        map = DG.map('map', {
            center: [59.941211, 30.276873],
            zoom: 16,
            scrollWheelZoom: false
        });
        DG.control.location({position: 'bottomright'}).addTo(map);
        DG.control.traffic().addTo(map);
        DG.marker([59.941211, 30.276873]).addTo(map).bindPopup('Санкт-Петербург, В.О. 9-линия 34, БЦ «Магнус», офис 201');
    });

    $(document).ready(function (){
        $('.slider').slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        var mw767 = window.matchMedia("(max-width: 767px)");
        if (mw767.matches) {
            $('iframe#sletat-search-1').bind('load', function (){
                $('#sletat-search-1').css('min-width', '100%');
            });
            $('#sletat-search-2').bind('load', function (){
                $('#sletat-frame-2').css({'min-width': '100%'});
                $('#frame-main').css({'overflow-x': 'auto'});
            });
            var $hotToursLight = $('#hotToursLight');
            $hotToursLight.prependTo('main');
            $hotToursLight.addClass('white');
        }

        var $btnSubmit = $('button[type=submit]'),
            $contact = $('#contact'),
            $contactTitle = $('.contact-title'),
            $contactModal = $('#contactModal'),
            alert = $('.alert-danger');
        var closeAlert = function (){
                var alert = $('.alert-danger');
                if (alert.length) {
                    alert.alert('close');
                }
            },
            ajaxSuccess = function (data){
                try{yaCounter34013940.reachGoal('sendData');}catch(e){}
                $btnSubmit.button('reset');
                closeAlert();
                $contactTitle.html('Спасибо, заявка отправлена');
                $contact.before('<div class="alert alert-success" role="alert"><strong>Мы свяжемся с Вами в ближайшее время.</strong></div>');
                $contact.css('display', 'none');
            },
            ajaxError = function (err){
                $btnSubmit.button('reset');
                if (alert.length) {
                    alert.close();
                }
                $btnSubmit.button('reset');
                $contact.before('<div class="alert alert-danger" role="alert"><strong>Произошла ошибка! Пожалуйста, повторите попытку.</strong></div>');
            };

        $('.btn').on('click', function (){
            closeAlert();
            $contactModal.modal('show');
        });
        $contact.on('submit', function (e){
            $btnSubmit.button('loading');
            e.preventDefault();
            closeAlert();
            if (document.all && !window.atob) {
                if ($('#inputTel').val().length == 0) {
                    $contact.before('<div class="alert alert-danger" role="alert"><strong>Поле телефон обязательно для заполнения!</strong></div>');
                    $btnSubmit.button('reset');
                    return;
                }
            }
            $.ajax({
                url: '/mail',
                method: 'post',
                data: {
                    name: $('#inputName').val(),
                    tel: $('#inputTel').val()
                },
                success: ajaxSuccess,
                error: ajaxError
            });
        });
        if (document.all && !window.atob) {
            $('label[for="inputName"]').html('Имя:');
            $('label[for="inputTel"]').html('Телефон*:');
        }
    });
})();