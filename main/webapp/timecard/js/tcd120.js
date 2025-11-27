function tcd120Data() {
    document.forms[0].CMD.value='add';
    document.forms[0].timezoneCmdMode.value=0;
    document.forms[0].timezoneSid.value=-1;
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

       var sid = $(this).parent().attr("id");
       document.forms[0].CMD.value='edit';
       document.forms[0].timezoneCmdMode.value=1;
       document.forms[0].timezoneSid.value=sid;
       document.forms[0].submit();
       return false;
   });
   /* radio:click */
   $(".js_sort_radio").live("click", function(){
       var check = $(this).children();
       check.attr("checked", true);
   });

});