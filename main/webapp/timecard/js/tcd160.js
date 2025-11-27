function tcd160Data() {
    document.forms[0].CMD.value='tcd160add';
    document.forms[0].tcd170EditSid.value=-1;
    document.forms[0].tcd170Mode.value=0;
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
           document.forms[0].tcd170EditSid.value=sid;
           document.forms[0].tcd170Mode.value=1;
           buttonPush('tcd160edit');
       });

       /* radio:click */
       $(".js_sord_radio").live("click", function(){
           var check = $(this).children();
           check.attr("checked", true);
       });

});