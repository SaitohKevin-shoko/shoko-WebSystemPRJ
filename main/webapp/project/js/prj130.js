function selectTemplate(cmd, prtSid) {
    document.forms[0].CMD.value = cmd;
    document.forms[0].prtSid.value = prtSid;
    document.forms[0].submit();
    return false;
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
      var sid = $(this).data('sid');
      var check = $(this).data('check');

      selectTemplate(check,sid);
    });

});
