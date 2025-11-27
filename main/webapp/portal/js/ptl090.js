function editPortlet(cmd, ptlSid, mode) {
    document.forms[0].ptlPortletSid.value=ptlSid;
    document.forms[0].ptlCmdMode.value=mode;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function addCategory(cmd, procMode) {
    document.forms[0].ptlCmdMode.value=procMode;
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
        editPortlet('ptl090addPortlet', sid, edit);
    });
    /* radio:click */
    $(".js_sord_radio").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});
