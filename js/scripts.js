function fixBodyTopPadding () {

    var navbar = $('.navbar');

    var topBodyPadding = navbar.height();
     // topBodyPadding = (($('.navbar').height()) + ($('#em-height-hack').height() || 0) * 3);

    if ( ! navbar.hasClass('collapse in')) {
        $('body').css('padding-top', topBodyPadding + 'px');
        $('.banner').css('margin-top', topBodyPadding * -1 + 'px');
        $('.banner__content').css('padding-top', navbar.height() + 'px');
    }

    $('.navbar').removeClass('disabled-transition');
}

window.onscroll = function() {

    // Do przycisku powrotu do góry strony
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        $('.js-scroll-top').fadeIn();
    } else {
        $('.js-scroll-top').fadeOut();
    }


    // Affix dla nagłówka
    var navbar = $('.navbar');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.addClass('scrolled');
        navbar.removeClass('scrolled-top');
    } else {
        navbar.removeClass('scrolled');
        navbar.addClass('scrolled-top');
    }

    fixBodyTopPadding();
};


$('.js-scroll-top').on('click', function() { // Do przycisku powrotu do góry strony 2
    var body = $('html, body');
    body.animate({scrollTop: 0}, 500);
});


// Przycisk przewijania o jedną wysokokość ekranu - do używania z bannerem

$('.js-scroll-down').on('click', function() {
    var body = $('html, body');
    body.animate({ scrollTop: (parseInt($('.banner').height() || 0) - parseInt($('.navbar-fixed-top').height() || 0)) + 'px' }, 500 );
});


// Przyklejanie stopki w przypadku zbyt niskiej strony

function stickyFooter () {

    var bannerSliderHeight = $('.js-page-slider').find('.banner__content').height() || 0; // na tym etapie slider nie ma wysokości
    var bodyHeight         = $('body')[0].offsetHeight || 0;
    var footer             = $('.footer');
    var footerHeight       = footer.height() || 0;

    if ((window.innerHeight - footerHeight) > (bodyHeight + bannerSliderHeight - (( ! footer.hasClass('footer--sticky')) ? footerHeight : 0)))
        footer.addClass('footer--sticky');

    else
        footer.removeClass('footer--sticky');

}


$(document).ready(function() {
    fixBodyTopPadding();
});

var isMenuFixed = false;

function fixMenu () {

    var menuTopOffset = null;
    var logoElement   = $('.navbar-brand');
    var navbar = $('.navbar');

    $('.navbar').addClass('disabled-transition');

    // Gdy menu zachodzi na logo

    if (logoElement.length > 0 && logoElement.offset().left + logoElement.width() > $('.navbar-nav').offset().left) {
        navbar.addClass('navbar-menu-widthfix-collapsed');
        navbar.removeClass('navbar-menu-widthfix');
        isMenuFixed = true;
        fixBodyTopPadding();
        return true;
    }


    // Gdy złamie się menu

    $('.navbar-nav > li').each(function() {
        var $this = $(this);

        if (menuTopOffset == null)
            menuTopOffset = $this.parent().parent().offset().top;

        if ($this.is(':visible')
            && ((logoElement.length > 0 && $this.offset().top > logoElement.offset().top)
            || ($this.offset().top !== menuTopOffset
                &&  ! navbar.hasClass('navbar-menu-widthfix-collapsed')
                && ($this.css('top') == 'auto' && $this.css('bottom') == 'auto')))) {
            navbar.addClass('navbar-menu-widthfix-collapsed');
            navbar.removeClass('navbar-menu-widthfix');

            isMenuFixed = true;
            fixBodyTopPadding();
            return true;
        }

    });

}

$(window).resize(function() {
    stickyFooter();

    if (isMenuFixed !== true)
        fixMenu();

});


$(document).ready(function() {

    stickyFooter();
    fixMenu();

    var panel = $('.panel');
    panel.on('shown.bs.collapse',  function () { stickyFooter(); });
    panel.on('hidden.bs.collapse', function () { stickyFooter(); });

    var navTabs = $('.nav-tabs');
    navTabs.on('shown.bs.tab',  function () { stickyFooter(); });
    navTabs.on('hidden.bs.tab', function () { stickyFooter(); });


    // Obsługa animacji

    $('.js-animated-scroll').each(function() {
        var $this = $(this);
        var animation = $this.data('animation') || 'fadeIn';
        var offset = $this.data('offset') || '85%';
        var delay = $this.data('delay') || 0;

        $this.css('opacity', 0);

        $this.waypoint(function() {
            setTimeout(function() {
                $this.css('opacity', 1).addClass(animation).addClass('animated');
            }, delay);
        }, { offset: offset });
    });





// Galeria zdjęć

// $('.gallery__img, .thumb').colorbox({
//     opacity: 0.5,
//     rel: 'gallery',
//     previous: '<i class="fa fa-chevron-left"></i>',
//     next: '<i class="fa fa-chevron-right"></i>',
//     close: '<i class="fa fa-close"></i>',
//     current: ''
// });




// Obsługa skalowania okna galerii zdjęć

var resizeTimer;

// $.colorbox.settings.maxWidth  = '95%';
// $.colorbox.settings.maxHeight = '95%';

$(window).resize(function() {
    resizeColorBox();
    window.addEventListener('orientationchange', resizeColorBox, false);
});

function resizeColorBox() {
    if (resizeTimer)
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function() {
        if (jQuery('#cboxOverlay').is(':visible')) {
            jQuery.colorbox.reload();
        }
    }, 300);
}

});


// Obsługa preloadera

var entryTime = Date.now();

$(document).ready(function() {

    var delay = 2000 - (Date.now() - entryTime);

    delay = 0;

    setTimeout(function() {
        $('.js-page-loader').fadeOut(200);
    }, ((delay > 0) ? delay : 0));

});




