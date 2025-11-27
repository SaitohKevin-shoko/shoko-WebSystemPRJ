$(function() {
    /* 管理者が設定する選択 */
    $(document).on("click", "#js_cirSmailSendKbn_01", function(){
        $("tr[name='js_cirSmlNoticeKbnArea']").show();
    });

    /* 各ユーザが設定する選択 */
    $(document).on("click", "#js_cirSmailSendKbn_02", function(){
        $("tr[name='js_cirSmlNoticeKbnArea']").hide();
    });

    //初期表示  ショートメール通知設定
    if ($("#js_cirSmailSendKbn_01").is(':checked')) {
        //管理者が設定する
        $("tr[name='js_cirSmlNoticeKbnArea']").show();
    } else {
        //各ユーザが設定する
        $("tr[name='js_cirSmlNoticeKbnArea']").hide();
    }
});