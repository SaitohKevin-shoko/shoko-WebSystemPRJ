$(function() {
    /* 管理者が設定する選択 */
    $(document).on('click', '#js_bbsSmlNtf_01', function(){
        $("#js_bbsSmlNoticeKbnArea").show();
    });

    /* 各ユーザが設定する選択 */
    $(document).on('click', '#js_bbsSmlNtf_02', function(){
        $("#js_bbsSmlNoticeKbnArea").hide();
    });

    //初期表示  ショートメール通知設定
    if ($("#js_bbsSmlNtf_01").is(':checked')) {
        //管理者が設定する
        $("#js_bbsSmlNoticeKbnArea").show();
    } else {
        //各ユーザが設定する
        $("#js_bbsSmlNoticeKbnArea").hide();
    }
});
