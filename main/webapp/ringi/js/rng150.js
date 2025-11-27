function sortUp(templateMode) {
    document.forms[0].rngTemplateMode.value = templateMode;
    return buttonPush('sortUp');
}
function sortDown(templateMode) {
    document.forms[0].rngTemplateMode.value = templateMode;
    return buttonPush('sortDown');
}

function addEditCategoryWithFlg(catSid, kbn, cmd){
    document.forms[0].rng140ProcMode.value=kbn;
    document.forms[0].rng140CatSid.value=catSid;
    document.forms[0].rng140SeniFlg.value=1;
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
        var sid = $(this).parent().attr("id");
        var cmd = "addeditcategory";
        addEditCategoryWithFlg(sid, 1, cmd);
    });
    /* radio:click */
    $(".js_sord_radio").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});