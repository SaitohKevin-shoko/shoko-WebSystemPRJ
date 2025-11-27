function selectUseKbn() {

    if ($('#useKbn1')[0].checked) {
        $('#pluginUseMember').show();
        $('#pluginUseMember2').show();
    } else {
        $('#pluginUseMember').hide();
        $('#pluginUseMember2').hide();
    }
}

function selectLimitType() {

    if ($('#limitType1')[0].checked) {
        $('#limit').hide();
        $('#permit').show();
        $('#limit2').hide();
        $('#permit2').show();

    } else {
        $('#limit').show();
        $('#permit').hide();
        $('#limit2').show();
        $('#permit2').hide();
    }
}

function defaultImg(imgName) {
    document.getElementById(imgName).src="../common/images/spacer.gif";
}


$(function() {
    /* 通知しない選択 */
    $(document).on("click", "#js_ntp095Smail_02", function(){
        $(".js_ntpNoticeUsrArea").addClass("display_n");
    });

    /* 通知する選択 */
    $(document).on("click", "#js_ntp095Smail_01", function(){
        $(".js_ntpNoticeUsrArea").removeClass("display_n");
    });

    //初期表示
    if ($("#js_ntp095Smail_01").is(':checked')) {
        //通知する
        $(".js_ntpNoticeUsrArea").removeClass("display_n");
    } else {
        //通知しない
        $(".js_ntpNoticeUsrArea").addClass("display_n");
    }
});
