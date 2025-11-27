$(function() {
    /* 管理者が設定する選択 */
    $(document).on("click", "#js_filSmailSendKbn_01", function(){
        $("#js_filSmlNoticeKbnArea").show();
    });

    /* 各ユーザが設定する選択 */
    $(document).on("click", "#js_filSmailSendKbn_02", function(){
        $("#js_filSmlNoticeKbnArea").hide();
    });

    //初期表示  ショートメール通知設定
    if ($("#js_filSmailSendKbn_01").is(':checked')) {
        //管理者が設定する
        $("#js_filSmlNoticeKbnArea").show();
    } else {
        //各ユーザが設定する
        $("#js_filSmlNoticeKbnArea").hide();
    }
});