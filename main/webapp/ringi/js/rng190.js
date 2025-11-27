$(function() {
    /* 管理者が設定する選択 */
    $(document).on("click", "#js_rngSmlNtf_01", function(){
        $("#js_rngSmlNoticeKbnArea").show();
        $("#js_rngSmlNoticeJusKbnArea").show();
        $("#js_rngSmlNoticeDairiKbnArea").show();
    });

    /* 各ユーザが設定する選択 */
    $(document).on("click", "#js_rngSmlNtf_02", function(){
        $("#js_rngSmlNoticeKbnArea").hide();
        $("#js_rngSmlNoticeJusKbnArea").hide();
        $("#js_rngSmlNoticeDairiKbnArea").hide();
    });

    //初期表示  日報通知
    if ($("#js_rngSmlNtf_01").is(':checked')) {
        //管理者が設定する
        $("#js_rngSmlNoticeKbnArea").show();
        $("#js_rngSmlNoticeJusKbnArea").show();
        $("#js_rngSmlNoticeDairiKbnArea").show();
    } else {
        //各ユーザが設定する
        $("#js_rngSmlNoticeKbnArea").hide();
        $("#js_rngSmlNoticeJusKbnArea").hide();
        $("#js_rngSmlNoticeDairiKbnArea").hide();
    }
});