$(document).ready(function(){
    $(window).on('scroll', function(){
        if(window.pageYOffset > 100) {
            $('.header').addClass('fixed')
        } else $('.header').removeClass('fixed')
    })

    var slider = $('.slider').bxSlider({
        infiniteLoop: true,
        wrapperClass: 'slider',
        pager: false,
        controls: false
    });

    $('.slider-nav__next').on('click', slider.goToNextSlide);
    $('.slider-nav__prev').on('click', slider.goToPrevSlide);

    $('.menu__item a').on('click', function(e) {
        e.preventDefault();
        var body = $("html, body");
        body.stop().animate({scrollTop: $('.' + $(this).data('target') ).offset().top - 100 }, 1000, 'swing');
    });

    function goNext(){
        $( $('.opros__tabs .nav-link.active').attr('href') ).removeClass('active show');

        $('.opros__tabs .nav-link.active')
            .removeClass('active')
            .prop('aria-selected', false)
                .parents('li')
                .next()
                .find('a')
                .addClass('active')
                .prop('aria-selected', true);

        $( $('.opros__tabs .nav-link.active').attr('href') ).addClass('active show')
    }

    $('.next-step').on('click', function(){
        var valid = true;
        $(this).parents('.main').find('input[required]').each(function(index, el){
            if(el.checkValidity() == false) {
                valid = false;
                $(el).parent().addClass('invalid')
            } 
        })
        if(valid != false) goNext()
    });

    // $('.nav-link').on('click', function(e){
    //     e.preventDefault();
    //     return false;
    // });

    var datepicker = $('.daterange').daterangepicker({
        minDate: new Date(),
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Применить",
            "cancelLabel": "Отмена",
            "fromLabel": "От",
            "toLabel": "До",
            "customRangeLabel": "Свой диапазон",
            "daysOfWeek": [
                "Вс",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб"
            ],
            "monthNames": [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            "firstDay": 1
        },
        opens: 'center'
    }, function(start, end, label) {
        $('[name=daterange]').val(start.format('DD-MM-YYYY') + '-' + end.format('DD-MM-YYYY'))
    });

    if (window.innerWidth < 768) {
        $('nav').attr('style', 'display: none')
    };

    $('.burger').on('click', function(){
        $('nav').slideToggle(1000)
    })

    $('.close').on('click', function(){
        $(this).find('.modal').trigger('close')
    });

    $('.count-people__arrow button').on('click', function(){
        $(this).parents('.count-people').find('input').val( parseInt($(this).val()) + 1 )
    });

    $('[type=tel]').inputmask("+7 (999) 999-99-99");

    var projects = (async function(){
        $('.spinner-border').show(0);
        try {
            var response = await fetch('js/projects.json')
            var data = await response.json()
    
            return data
        } catch (error) {
            throw new Error('Ошибка в асинхронной функции. ' + error)
        }
    })()
    
    projects.then(function(projects){
        $('.spinner-border').hide(0);
        
        projects.forEach(function(project, index){
            localStorage.setItem('project_'+index, JSON.stringify(project));
            $('.dropdown-menu')
            .append('<button class="dropdown-item" type="button" data-project="'+ index +'">'+ project.customer +'</button>')
        })

        $('.dropdown').find('.dropdown-item').on('click', function(){
            var project = JSON.parse(localStorage.getItem('project_' + $(this).data('project')));
            
            var section     = $('.projects'),
                image       = $(section).find('img'),
                descr       = $(section).find('.item__descr'),
                subject     = $(section).find('.item__descr__task'),
                feedback    = $(section).find('.item__descr__review');

            $(image).prop('src', project.logo).prop('alt', project.customer),
            $(descr).html(project.description),
            $(subject).html(project.objective),
            $(feedback).html(project.feedback);
        })
    })

    var value = 0;
    $('.count-people__arrow button').on('click', function(){
        if($(this).data('value') == 'up') value++;
        if($(this).data('value') == 'down' && value >= 1) value--;
        $('#peoples').val( value )
    });

    $('input:checkbox').on('change', function(){
        var checked = [[],[]];
        $('.objects input:checked').each(function(i, el){
            checked[0].push(el.value);
        });
        $('.methods input:checked').each(function(i, el){
            checked[1].push(el.value);
        });
        $('[name=objects_list]').val(checked[0].join(', '));
        $('[name=methods_list]').val(checked[1].join(', '));
    })

    $('form').on('submit', function(e){
        var form = this;
        e.preventDefault();
        $.ajax({
            url: "http://landing.lpex.ru/mail.php",
            type: "POST",
            data: $(this).serialize(),
            success: function(){
                ym(56037148, 'reachGoal', $(form).data('goal'));
                $(form).replaceWith('<div>Ваше сообщение отправлено!</div>')
            }
        });
    });

    $('.goal-handler').on('click', function(){
        ym(56037148, 'reachGoal', $(this).data('goal'));
    });
});