function changeGroupCombo(){
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function changePage(id){
    if (id == 1) {
      document.forms[0].tcd130pageTop.value=document.forms[0].tcd130pageBottom.value;
    }
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function changeChk(){

    var chkFlg;
    if (document.forms[0].allChk.checked) {
      checkAll('tcdSelectUserlist');
    } else {
        nocheckAll('tcdSelectUserlist');
    }
}

$(function(){
    $('.js_tableTopCheck-header').live("change",function() {
        changeChk();
    });

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
       nocheckAll('tcdSelectUserlist');
       var sid = $(this).parent().attr("id");
       document.forms[0].tcdSelectedUser.value = sid;
       document.forms[0].CMD.value='edits';
       document.forms[0].submit();
   });

});


function multiEditTimeZone() {
    document.forms[0].CMD.value='edits';
    document.forms[0].submit();
    return false;
}