function changeChk() {
   var chkFlg;
   if (document.forms[0].fil220allCheck.checked) {
       checkAll('fil220sltCheck');

   } else {
       nocheckAll('fil220sltCheck');
   }
}

function CabinetDetail(cabSid) {
    document.forms[0].cmnMode.value='1';
    document.forms[0].fil010SelectCabinet.value=cabSid;
    document.forms[0].fil030SelectCabinet.value=cabSid;
    document.forms[0].backDsp.value='fil220';
    document.forms[0].CMD.value='fil220editCabinet';
    document.forms[0].submit();
    return false;
}

function CabinetDetailMulti() {
    document.forms[0].cmnMode.value='2';
    document.forms[0].backDsp.value='fil220';
    document.forms[0].CMD.value='fil220togetherEdit';
    document.forms[0].submit();
    return false;
}

$(function(){
    $('.js_tableTopCheck-header').live("change",function() {
      changeChk();
    });

    /* radio:click */
    $(".js_tableTopCheckRadio").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });

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
        CabinetDetail(sid);
    });
    
    $(".js_tabHeader").live("click", function(){
		var showId = $(this).attr('id');
        if (showId == "kyoyu") {
			document.forms[0].fil220cabinetKbn.value='0';
		} else {
			document.forms[0].fil220cabinetKbn.value='2';
		}
        document.forms[0].CMD.value='init';
        document.forms[0].submit();
    });

});