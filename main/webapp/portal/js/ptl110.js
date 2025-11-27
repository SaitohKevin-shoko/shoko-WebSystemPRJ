function addEditCategoryWithFlg(catSid, kbn, cmd){
    document.forms[0].ptlCmdMode.value=kbn;
    document.forms[0].ptlPtlCategorytSid.value=catSid;
    document.forms[0].ptlPlcBack.value=1;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

$(function(){
    /* hover */
    $('.js_listHover').live({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });
    /* hover:click */
    $(".js_listClick").live("click", function(){
        var sid = $(this).parent().data("sid");
        var edit = $(this).parent().data("edit");
        addEditCategoryWithFlg(sid, edit, "ptl110edit");
    });
    /* radio:click */
    $(".js_sord_radio").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});