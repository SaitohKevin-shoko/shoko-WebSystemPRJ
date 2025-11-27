function editReserve(yoyakuSid) {
    document.forms['rsvmainForm'].CMD.value='sisetu_edit';
    document.forms['rsvmainForm'].rsvmainSselectedYoyakuSid.value=yoyakuSid;
    document.forms['rsvmainForm'].submit();
    return false;
}
function js_test(usrSid) {
    openUserInfoWindow(usrSid);
}

$(function() {
    /* hover */
   $('.js_listHover')
       .mouseenter(function (e) {
           $(this).children().addClass("list_content-on");
           $(this).prev().children().addClass("list_content-topBorder");
       })
       .mouseleave(function (e) {
           $(this).children().removeClass("list_content-on");
           $(this).prev().children().removeClass("list_content-topBorder");
       });

   $(document).on("click", ".js_usrPop", function(e){
       e.stopPropagation();
       var usrSid = $(this).prev('input[name="usrSid"]').val();
       openUserInfoWindow(usrSid);
   });
   /* hover:click */
   $(document).on("click", ".js_listRsvClick", function(){
       if ($(this).children("a").attr("href") == "#!") {
           return;
       }
       var id = $(this).parent().attr("id");
       editReserve(id);

   });
});