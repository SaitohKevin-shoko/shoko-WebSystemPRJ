function enq320viewAnswer(userSid) {
    document.forms[0].enq110answer.value = userSid;
    return buttonPush('enq320detail');
}

function enqClickTitle(sortKey, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].enq320sortKey.value=sortKey;
    document.forms[0].enq320order.value=order;
    document.forms[0].enq320scrollQuestonFlg.value = '1';
    document.forms[0].submit();
    return false;
}

function enq320changePage(id){
    if (id == 0) {
        document.forms[0].enq320pageBottom.value=document.forms[0].enq320pageTop.value;
    } else {
        document.forms[0].enq320pageTop.value=document.forms[0].enq320pageBottom.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

jQuery( function() {

    if (document.forms[0].enq320scrollQuestonFlg.value == '1') {
        window.location.hash='enq320ansListArea';
        document.forms[0].enq320scrollQuestonFlg.value = '';
    }
});

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
       enq320viewAnswer(sid);
   });
});