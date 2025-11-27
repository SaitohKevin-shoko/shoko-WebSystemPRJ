function detailCir(cmd, userSid, cirSid, cmdMode) {
    document.forms['cirmainForm'].CMD.value=cmd;
    document.forms['cirmainForm'].cirViewAccount.value=userSid;
    document.forms['cirmainForm'].cir010selectInfSid.value=cirSid;
    document.forms['cirmainForm'].cir010cmdMode.value=cmdMode;
    document.forms['cirmainForm'].submit();
    return false;
}


/* ホバーの処理 */
$(function() {
     /* hover */
    $('.js_listHover')
        .mouseenter(function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        })
        .mouseleave(function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        });

    /* hover:click */
    $(document).on("click", ".js_listCirClick", function(){
        var id = $(this).parent().attr("id");
        var cmd ='detail';
        var result = id.split(',');
        var userSid = result[0];
        var cirSid = result[1];
        detailCir(cmd, userSid, cirSid, 2);
    });
});