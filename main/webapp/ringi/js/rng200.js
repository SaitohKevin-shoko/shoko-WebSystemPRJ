function linkclick(cmd,sid) {
	 document.forms[0].CMD.value=cmd;
	 document.forms[0].rng200Sid.value=sid;
	 document.forms[0].submit();
	 return false;
}

//イベントを登録
$(function(){

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
 /*hover:click */
 $(".js_listClick").live("click", function(){
     var sid = $(this).parent().attr("id");
     linkclick('edit', sid);
 });

});
