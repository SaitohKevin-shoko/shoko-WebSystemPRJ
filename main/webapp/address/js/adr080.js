function buttonSubmit(cmd, mode, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].adr080ProcMode.value=mode;
    document.forms[0].adr080EditAtiSid.value=sid;
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
        var cmd = "adr080edit";
        buttonSubmit(cmd, 1, sid);
    });
    /* radio:click */
    $(".js_tableTopCheck").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});