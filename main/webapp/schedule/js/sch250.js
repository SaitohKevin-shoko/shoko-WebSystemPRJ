function getForm() {
    return document.forms['sch250Form'];
}

function editList(smySid) {
    getForm().CMD.value = 'listDetail';
    getForm().sch250editMode.value = 1;
    getForm().sch250editData.value = smySid;
    getForm().submit();
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
     return editList(sid);
  });
});