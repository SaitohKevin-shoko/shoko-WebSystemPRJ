function clickAddEdit(cmd, sid, mode) {
	setParams();
    document.forms[0].CMD.value=cmd;
    document.forms[0].cgiSid.value=sid;
    document.forms[0].cht100ProcMode.value=mode;
    document.forms[0].submit();
    return false;
}

function selectPage(id){
    if (id == 1) {
        document.forms[0].cht100PageTop.value=document.forms[0].cht100PageBottom.value;
    }
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function chatGroupSort(sortValue) {
    if (document.forms[0].cht100SortKey.value == sortValue) {
        if (document.forms[0].cht100OrderKey.value == 1) {
          document.forms[0].cht100OrderKey.value = 0;
        } else {
          document.forms[0].cht100OrderKey.value = 1;
        }
    } else {
        document.forms[0].cht100SortKey.value = sortValue;
    }
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function setParams() {
    setYmdParam($("input[name='cht100CreateDateFr']"),
        $("input[name='cht100CreateYearFr']"),
        $("input[name='cht100CreateMonthFr']"),
        $("input[name='cht100CreateDayFr']"));
    setYmdParam($("input[name='cht100CreateDateTo']"),
        $("input[name='cht100CreateYearTo']"),
        $("input[name='cht100CreateMonthTo']"),
        $("input[name='cht100CreateDayTo']"));
        
    setYmdParam($("input[name='cht100UpdateDateFr']"),
        $("input[name='cht100UpdateYearFr']"),
        $("input[name='cht100UpdateMonthFr']"),
        $("input[name='cht100UpdateDayFr']"));
    setYmdParam($("input[name='cht100UpdateDateTo']"),
        $("input[name='cht100UpdateYearTo']"),
        $("input[name='cht100UpdateMonthTo']"),
        $("input[name='cht100UpdateDayTo']"));
}

//イベントを登録
$(function(){
    $('.js_listHover').on({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

    $(".js_list_Click").on("click", function(){
	    setParams();
        var sid = $(this).parent().attr("id");
        return clickAddEdit('addEditGrp', sid, 1);
    });
});
