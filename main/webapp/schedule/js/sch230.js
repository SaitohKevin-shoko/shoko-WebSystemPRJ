function getForm() {
    return document.forms['sch230Form'];
}

function editAccess(ssaSid) {
    getForm().CMD.value = 'spAccessDetail';
    getForm().sch230editMode.value = 1;
    getForm().sch230editData.value = ssaSid;
    getForm().submit();
    return false;
}

function sort(sortKey, orderKey) {
    getForm().CMD.value = 'init';
    getForm().sch230sortKey.value = sortKey;
    getForm().sch230order.value = orderKey;
    getForm().submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        getForm().sch230pageTop.value=document.forms[0].sch230pageBottom.value;
    }

    getForm().CMD.value='init';
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
  $(".js_list_Click").live("click", function(){
     var sid = $(this).parent().attr("id");
     return editAccess(sid);
  });

  /*header-checkbox:click */
  $(".js_tableTopCheck-header").live("change",function() {
      chgCheckAll('sch240AllCheck', 'sch230selectSpAccessList');
//      chgCheckAllChange('sch240AllCheck', 'sch230selectSpAccessList');
  });
});

