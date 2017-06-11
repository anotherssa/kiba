$(function() {
    var $btnOrderFreeCall = $('.btn_order-free-call');
    setInterval(function() {
        $btnOrderFreeCall.toggleClass('shake');
    }, 10000);

    var $toggleMenuPrimary = $('.toggle-menu_primary');
    var $navbarSecondPart = $('.navbar__second-part');
    $toggleMenuPrimary.click(function(e) {
        $navbarSecondPart.toggleClass('show');
        e.preventDefault();
    });

    $('.carousel_main').slick({
        autoplay: true,
        arrows: false,
        dots: true,
        dotsClass: 'carousel__dots'
    });

    $('.btn_scroll-down').click(function(e) {
        var scrollTo = document.querySelector('#under-the-fold').getBoundingClientRect().top;
        $('html, body').animate({ scrollTop: scrollTo }, "slow");

        return false;
    });

    $('.portfolio-tabs').tabs();

    $('.to-top-btn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, "slow");
        return false;
    });
});