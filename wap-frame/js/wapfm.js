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
            .parents("[data-type='titfox']").find(".picico>em").removeClass("active")
            .end()
            .find(".mask").css("display","block")
        ;

        $(".wapfm-mask").show();
        $(".wapfm-layer").show();

    });

    /*
    *提现
    * */
    $("[data-type='withdrawals']").on("click", function () {

        $(".wapfm-maskv2").show();
        $("[data-type='withdrawals-layer']").show();

    });
    $("[data-type='closed']").on("click", function () {

        $(this).parent().hide();
        $(".wapfm-maskv2").hide();

    });
    //个人中心-二维码
    $("[data-type='qrcode']").on("click", function () {

        $(".wapfm-maskv2").show();
        $("[data-type='wapfm-qrcode']").show();

    });
    $("[data-type='qrcode-closed']").on('click', function () {
        var _this = $(this);

        _this.parents("[data-type='wapfm-qrcode']").hide();
        $(".wapfm-maskv2").hide();
    });


});

