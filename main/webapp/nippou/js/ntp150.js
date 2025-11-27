function buttonSubmit(mode, ngpsid, ngysid) {
    document.forms[0].ntp150NgpSid.value=ngpsid;
    document.forms[0].ntp150NgySid.value=ngysid;
    document.forms[0].ntp150ProcMode.value=mode;
    buttonPush(mode);
}

function changeCmbo(cmd){
    document.forms[0].CMD.value=cmd;
    $("input[name=ntp150SortProcess]").val("");
    document.forms[0].submit();
    return false;
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
        var ngpSid = $(this).parent().data("ngpsid");
        var ngySid = $(this).parent().data("ngysid");
        buttonSubmit('edit', ngpSid, ngySid);
    });

    /* radio:click */
    $(".js_sord_radio").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});



