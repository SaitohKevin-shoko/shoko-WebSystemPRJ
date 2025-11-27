$(function() {


    //ワンタイムパスワード使用
    $('input[name="man510useOtp"]').change(function() {
        var scrollPosition = $(window).scrollTop();
        document.forms[0].scrollY.value = scrollPosition;
        buttonPush('dsp');
    });
    //ワンタイムパスワード使用設定 対象
    $('input[name="man510otpUser"]').change(function() {
        var scrollPosition = $(window).scrollTop();
        document.forms[0].scrollY.value = scrollPosition;
        buttonPush('dsp');
    });
    //ワンタイムパスワード使用設定 対象
    $('input[name="man510otpUserKbn"]').change(function() {
        var scrollPosition = $(window).scrollTop();
        document.forms[0].scrollY.value = scrollPosition;
        buttonPush('dsp');
    });
    //ワンタイムパスワード使用設定 対象
    $('input[name="man510otpCond"]').change(function() {
        var scrollPosition = $(window).scrollTop();
        document.forms[0].scrollY.value = scrollPosition;
        buttonPush('dsp');
    });
    $('input[name="man510useToken"]').change(function() {
        var scrollPosition = $(window).scrollTop();
        document.forms[0].scrollY.value = scrollPosition;
        buttonPush('dsp');
    });
    $('input[name="man510useBasic"]').change(function() {
        var scrollPosition = $(window).scrollTop();
        document.forms[0].scrollY.value = scrollPosition;
        buttonPush('dsp');
    });

    changeAuthMethod();

    /**
     トークン自動削除フラグ表示判定
     トークン有効期限が無制限時のみ自動削除フラグ表示
      */
    function limitFreeCheck() {
      var free = $("select[name=\"man510tokenLimit\"]").val();
      if (free == 14) {
        $(".js_limitFree").removeClass("display_none");
      } else {
        $(".js_limitFree").addClass("display_none");
      }
    }
    $("select[name=\"man510tokenLimit\"]").change(function() {
        limitFreeCheck();
    });
    limitFreeCheck();
});

function changeAuthMethod() {
    if ($('input:radio[name=man510authType]:checked').val() == 1) {
        $('.js_BaseAuth').addClass('display_none');
        $('.js_OAuth').removeClass('display_none');
    } else {
        $('.js_BaseAuth').removeClass('display_none');
        $('.js_OAuth').addClass('display_none');
    }
}
