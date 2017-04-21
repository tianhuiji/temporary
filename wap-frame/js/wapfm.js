$(function () {
    /*
    * banner
    * */
    var mySwiper = new Swiper ('.swiper-container', {
//            direction: 'vertical',
        loop: true,

        // 如果需要分页器
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction : false,

        autoplay: 3000,
        speed:500

    });

    /*
    *footer-分享
    * */
    $("[data-type='titshare']").on("click", function () {
        var _this = $(this);

        _this.css("position","relative")
            .find("em").addClass("active")
            .end()
            .find(".txt").addClass("orange")
            .parents("[data-type='titfox']").find(".a1").removeClass("active")
            .end()
            .find(".mask").css("display","block")
        ;

        $(".wapfm-mask").show();
        $(".wapfm-layer").show();

    });

});

