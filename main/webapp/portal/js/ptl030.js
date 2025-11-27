function addPortal() {
    document.forms[0].ptlPortalSid.value=-1;
    document.forms[0].CMD.value='ptl030add';
    document.forms[0].submit();
    return false;
}

function editPortal(ptlSid) {
    document.forms[0].ptlPortalSid.value=ptlSid;
    document.forms[0].CMD.value='ptl030editPortal';
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
        editPortal(sid);
    });
    /* radio:click */
    $(".js_sord_radio").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});