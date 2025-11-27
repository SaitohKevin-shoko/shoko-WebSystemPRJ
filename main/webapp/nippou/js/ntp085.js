$(function() {

    /* 管理者が設定する選択 */
    $(document).on("click", "#js_ntp085NoticeKbn_00", function(){
        $("#js_ntpSmlNoticeKbnArea").show();
        //通知する場合は表示
        if ($("#js_ntp085SmlNoticeKbn_01").is(':checked')) {
            $("#js_ntpSmlNoticeKbnPlace").show();
        }
    });

    /* 各ユーザが設定する選択 */
    $(document).on("click", "#js_ntp085NoticeKbn_01", function(){
        $("#js_ntpSmlNoticeKbnArea").hide();
        $("#js_ntpSmlNoticeKbnPlace").hide();
    });

    /* 通知しない選択 */
    $(document).on("click", "#js_ntp085SmlNoticeKbn_00", function(){
        $("#js_ntpSmlNoticeKbnPlace").hide();
    });

    /* 通知する選択 */
    $(document).on("click", "#js_ntp085SmlNoticeKbn_01", function(){
        $("#js_ntpSmlNoticeKbnPlace").show();
    });

    /* 管理者が設定する選択 */
    $(document).on("click", "#js_ntp085CmtNoticeKbn_00", function(){
        $("#js_cmtSmlNoticeKbnArea").show();
    });

    /* 各ユーザが設定する選択 */
    $(document).on("click", "#js_ntp085CmtNoticeKbn_01", function(){
        $("#js_cmtSmlNoticeKbnArea").hide();
    });

    /* 管理者が設定する選択 */
    $(document).on("click", "#js_ntp085GoodNoticeKbn_00", function(){
        $("#js_goodSmlNoticeKbnArea").show();
    });

    /* 各ユーザが設定する選択 */
    $(document).on("click", "#js_ntp085GoodNoticeKbn_01", function(){
        $("#js_goodSmlNoticeKbnArea").hide();
    });

    //初期表示  日報通知
    if ($("#js_ntp085NoticeKbn_00").is(':checked')) {
        //管理者が設定する
        $("#js_ntpSmlNoticeKbnArea").show();

        if ($("#js_ntp085SmlNoticeKbn_01").is(':checked')) {
            //通知する
            $("#js_ntpSmlNoticeKbnPlace").show();
        } else {
          //通知しない
            $("#js_ntpSmlNoticeKbnPlace").hide();
        }
    } else {
        //各ユーザが設定する
        $("#js_ntpSmlNoticeKbnArea").hide();
        $("#js_ntpSmlNoticeKbnPlace").hide();
    }

    //初期表示  コメント通知
    if ($("#js_ntp085CmtNoticeKbn_00").is(':checked')) {
        //管理者が設定する
        $("#js_cmtSmlNoticeKbnArea").show();
    } else {
        //各ユーザが設定する
        $("#js_cmtSmlNoticeKbnArea").hide();
    }

    //初期表示  コメント通知
    if ($("#js_ntp085GoodNoticeKbn_00").is(':checked')) {
        //管理者が設定する
        $("#js_goodSmlNoticeKbnArea").show();
    } else {
        //各ユーザが設定する
        $("#js_goodSmlNoticeKbnArea").hide();
    }

});