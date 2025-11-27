function buttonSubmit(cmd, mode, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].man100ProcMode.value=mode;
    document.forms[0].man100EditPosSid.value=sid;
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
    	buttonSubmit('posname', $(this).parent().data('edit'), $(this).parent().data('sid'));
    });
    /* radio:click */
    $(".js_sord_radio").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});