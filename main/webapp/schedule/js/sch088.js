$(function() {
    
    $(document).on("click", "#js_schSmailSendKbn_01",function(){
        $(".schSmlNoticeKbnArea").show();
    
    });
    
    $(document).on("click", "#js_schSmailSendKbn_02",function(){
        $(".schSmlNoticeKbnArea").hide();
    
    });

    //初期表示  ショートメール通知設定
    if ($("#js_schSmailSendKbn_01").is(':checked')) {
        //管理者が設定する
        $(".schSmlNoticeKbnArea").show();
    } else {
        //各ユーザが設定する
        $(".schSmlNoticeKbnArea").hide();
    }
});