function selectData(anpSid) {
    document.forms[0].anp130SelectAphSid.value = anpSid;
    document.forms[0].CMD.value='anp130syokai';
    document.forms[0].submit();
}

function changePage(cmbObj) {
    document.forms[0].anp130NowPage.value=cmbObj.options[cmbObj.selectedIndex].value;
    document.forms[0].CMD.value='anp130pageChange';
    document.forms[0].submit();
}

function changeCheckList() {
    if (document.getElementsByName("anp130allCheck")[0].checked == true) {
      checkAll("anp130DelSidList");
    } else {
      nocheckAll("anp130DelSidList");
    }
}

function checkAll(chkName){
   chkAry = document.getElementsByName(chkName);
   for(i = 0; i < chkAry.length; i++) {
       chkAry[i].checked = true;
   }
}

function nocheckAll(chkName){
   chkAry = document.getElementsByName(chkName);
   for(i = 0; i < chkAry.length; i++) {
       chkAry[i].checked = false;
   }
}

$(function(){

	$('.js_tableTopCheck-header').live("change",function() {
		changeCheckList();
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
        var sid = $(this).parent().attr("id");
        selectData(sid);
    });
});
