function buttonSubmit(cmd, sid, mode) {
    document.forms[0].bmk050LblSid.value=sid;
    document.forms[0].bmk050ProcMode.value=mode;
    buttonPush(cmd);
}

$(function() {

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
    buttonSubmit('bmk050edit',sid,'1');
});

});