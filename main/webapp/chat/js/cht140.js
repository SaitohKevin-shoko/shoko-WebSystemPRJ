function addEditCategory(cmd, sid, mode) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].cht140CategoryLink.value=sid;
    document.forms[0].cht140ProcMode.value=mode;
    document.forms[0].submit();
    return false;
}


//イベントを登録
$(function(){
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

    $(".js_list_Click").live("click", function(){
        var sid = $(this).parent().attr("id");
        return addEditCategory('addEdit', sid, 1);
    });
});
