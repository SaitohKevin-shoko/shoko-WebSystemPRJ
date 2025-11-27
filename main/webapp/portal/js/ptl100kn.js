function changeContentKn(contentKbn) {
    var checkValue = document.getElementsByName('ptl100contentType');

    if (contentKbn == 1) {
        $('#contentArea').addClass("display_n");
        $('#contentSrcArea').removeClass("display_n");

    } else {
        $('#contentArea').removeClass("display_n");
        $('#contentSrcArea').addClass("display_n");
    }
}

$(function() {

    //aタグhref属性に ${TIME} or ${HASH_UID_TM_KW} が含まれている
    $("a[href *= '${TIME}'],a[href *= '${HASH_UID_TM_KW}']").live("click", function() {

        var url = $(this).attr("href");
        var target = $(this).attr("target");

        clickUrl(url, target);
        return false;
    });
});

function clickUrl(url, target) {

    //URL、パラメータ情報を取得する
    $.ajax({
        async: true,
        url:"../portal/ptl100kn.do",
        type: "post",
        data: {
            CMD: "getClickUrl",
            url: url}
    }).done(function( data ) {
        if (data != null || data != "") {

            var clickUrl = data.url;
            if( typeof target == 'undefined') {
                window.open(clickUrl, "body");
            } else {
                window.open(clickUrl, target);
            }
        }
    }).fail(function(data){
        //JSONデータ失敗時の処理
    });
}