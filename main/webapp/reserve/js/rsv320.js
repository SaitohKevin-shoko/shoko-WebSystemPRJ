$(function() {
    /* 管理者が設定する選択 */
    $(document).on("click", "#js_rsvSmailSendKbn_01", function(){
        $("#js_rsvSmlNoticeKbnArea").show();
    });

    /* 各ユーザが設定する選択 */
    $(document).on("click", "#js_rsvSmailSendKbn_02", function(){
        $("#js_rsvSmlNoticeKbnArea").hide();
    });

    //初期表示  ショートメール通知設定
    if ($("#js_rsvSmailSendKbn_01").is(':checked')) {
        //管理者が設定する
        $("#js_rsvSmlNoticeKbnArea").show();
    } else {
        //各ユーザが設定する
        $("#js_rsvSmlNoticeKbnArea").hide();
    }
});