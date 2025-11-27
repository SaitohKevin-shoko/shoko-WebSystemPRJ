function buttonPush(cmd) {

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}
function onSubmitLog(cmd, fileName){
    document.forms[0].CMD.value=cmd;
    document.forms[0].logName.value = fileName;
    document.forms[0].submit();
    return false;
}

$(function() {
    /*hover */
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
        onSubmitLog('logdownload', $(this).parent().data('name'));
    });
});