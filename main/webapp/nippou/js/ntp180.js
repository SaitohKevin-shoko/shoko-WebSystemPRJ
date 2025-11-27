function buttonSubmit(mode, sid) {
    document.forms[0].ntp180NkhSid.value=sid;
    document.forms[0].ntp180ProcMode.value=mode;
    buttonPush(mode);
}

$(function() {

    /* 一覧行  hover */
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

    $(".js_listClick").live("click", function(){
        var sid = $(this).parent().data("sid");
        buttonSubmit('edit', sid);
    });

    /* radio:click */
    $(".js_sord_radio").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});