function changeGroupCombo(){
    document.forms[0].CMD.value='research';
    document.forms[0].sch100SltUser.value='-1';
    document.forms[0].submit();
    return false;
}
function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}
function buttonPush(cmd, mod){
    document.forms[0].CMD.value=cmd;
    document.forms[0].cmd.value=mod;
    document.forms[0].submit();
    return false;
}
function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='research';
    document.forms[0].sch100SortKey1.value = fid;
    document.forms[0].sch100OrderKey1.value = order;
    document.forms[0].submit();
    return false;
}

function clickTitle(sortKey, orderKey) {
    document.forms[0].CMD.value='research';
    document.forms[0].sch100SortKey1.value=sortKey;
    document.forms[0].sch100OrderKey1.value=orderKey;
    document.forms[0].submit();
    return false;
}

function clickSortTitle(sortValue) {
    
    if (document.forms[0].sch100SortKey2.value == sortValue) {
        if (sortValue == 2) {
            //開始日時を選択した時は第二ソートキーに終了日時の昇順を設定
            document.forms[0].sch100SvSortKey2.value = 3;
            document.forms[0].sch100SortKey2.value = 3;
        } else {
            //開始日時以外を選択した時は第二ソートキーに開始日時の昇順を設定
            document.forms[0].sch100SortKey2.value = 2;
            document.forms[0].sch100SvSortKey2.value = 2;
        }
        document.forms[0].sch100OrderKey2[0].checked = true;
        document.forms[0].sch100OrderKey2[1].checked = false;
        document.forms[0].sch100SvOrderKey2.value = 0;
    }
    
    if (document.forms[0].sch100SortKey1.value == sortValue) {
        //現在設定されている第一ソートキーと同じ場合、昇順降順を入れ替える
        if (document.forms[0].sch100OrderKey1[0].checked == true) {
            document.forms[0].sch100OrderKey1[0].checked = false;
            document.forms[0].sch100OrderKey1[1].checked = true;
            document.forms[0].sch100SvOrderKey1.value=1;
        } else {
            document.forms[0].sch100OrderKey1[1].checked = false;
            document.forms[0].sch100OrderKey1[0].checked = true;
            document.forms[0].sch100SvOrderKey1.value = 0;
        }
    } else {
        //現在設定されている第一ソートキーと異なる場合、第一ソートキーを変更する
        document.forms[0].sch100SortKey1.value = sortValue;
        document.forms[0].sch100SvSortKey1.value = sortValue;
        document.forms[0].sch100OrderKey1[0].checked = true;
        document.forms[0].sch100OrderKey1[1].checked = false;
        document.forms[0].sch100SvOrderKey1.value = 0;
    }
    document.forms[0].submit();
    return false;
}

function editSchedule(cmd, ymd, sid, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].sch010SelectDate.value=ymd;
    document.forms[0].sch010SelectUsrSid.value=uid;
    document.forms[0].sch010SelectUsrKbn.value=ukbn;
    document.forms[0].sch010SchSid.value=sid;
    document.forms[0].listMod.value='5';
    setDateParam();
    document.forms[0].submit();
    return false;
}

function changePage1() {
    document.forms[0].CMD.value='research';
    for (i = 0; i < document.forms[0].sch100Slt_page1.length; i++) {
        if (document.forms[0].sch100Slt_page1[i].selected) {
            document.forms[0].sch100Slt_page2.value=document.forms[0].sch100Slt_page1[i].value;
            document.forms[0].sch100PageNum.value=document.forms[0].sch100Slt_page1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function changePage2() {
    document.forms[0].CMD.value='research';
    for (i = 0; i < document.forms[0].sch100Slt_page2.length; i++) {
        if (document.forms[0].sch100Slt_page2[i].selected) {
            document.forms[0].sch100Slt_page1.value=document.forms[0].sch100Slt_page2[i].value;
            document.forms[0].sch100PageNum.value=document.forms[0].sch100Slt_page2[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}
function moveSchedule(cmd){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].sch010SelectUsrSid.value=document.forms[0].sch100SltUser.value;
    document.forms[0].sch010DspGpSid.value=document.forms[0].sch100SltGroup.value;
    document.forms[0].submit();
    return false;
}
function moveKojinSchedule(){
    document.forms[0].cmd.value='kojin';
    document.forms[0].CMD.value='kojin';
    if (document.forms[0].sch010SelectUsrSid.value < 0) {
        document.forms[0].sch010SelectUsrSid.disabled=true;
    } else {
        document.forms[0].sch010SelectUsrSid.value=document.forms[0].sch100SltUser.value;
    }
    document.forms[0].sch010DspGpSid.value=document.forms[0].sch100SltGroup.value;
    document.forms[0].submit();
    return false;
}
function moveDay(elmDate, kbn) {

    systemDate = new Date();
    var year = convYear(systemDate.getFullYear());
    var month = ("0" + (systemDate.getMonth() + 1)).slice(-2);
    var day = ("0" + systemDate.getDate()).slice(-2);

    if (kbn == 2) {
        $(elmDate).val(year + "/" + month + "/" + day);
        return;
    }

    if (kbn == 1 || kbn == 3) {

        var ymdf = escape($(elmDate).val());
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {
            newDate = new Date($(elmDate).val());

            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getFullYear());
            var systemYear = convYear(systemDate.getFullYear());
            if (newYear < systemYear - 10 || newYear > systemYear + 10) {
                return;
            } else {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(elmDate).val(year + "/" + month + "/" + day);
            }

        } else {
            if ($(elmDate).val() == '') {
                $(elmDate).val(year + "/" + month + "/" + day);
            }
        }
    }
}
function openSch100Group(sch100SltGroup, sltGroup, flg){
    document.forms[0].CMD.value='research';
    document.forms[0].sch100SltUser.value='-1';
    openGroupWindow(sch100SltGroup, sltGroup, flg);
    return false;
}

function chgCheckAllChange(allChkName) {
    if (document.getElementsByName(allChkName)[0].checked) {
        $(".td_line_color1").addClass("td_type_selected");
        $(".td_line_color2").addClass("td_type_selected2");
    } else {
        $(".td_type_selected").addClass("td_line_color1");
        $(".td_type_selected2").addClass("td_line_color2");
        $(".td_line_color1").removeClass("td_type_selected");
        $(".td_line_color2").removeClass("td_type_selected2");
    }
}

function convYear(yyyy) {
  if(yyyy<1900) {
    yyyy=1900+yyyy;
  }
  return yyyy;
}

function setDateParam() {
    setYmdParam($("#selDatesf"),
                $("input[name='sch100SltStartYearFr']"),
                $("input[name='sch100SltStartMonthFr']"),
                $("input[name='sch100SltStartDayFr']"));
    setYmdParam($("#selDatest"),
                $("input[name='sch100SltStartYearTo']"),
                $("input[name='sch100SltStartMonthTo']"),
                $("input[name='sch100SltStartDayTo']"));
    setYmdParam($("#selDateef"),
                $("input[name='sch100SltEndYearFr']"),
                $("input[name='sch100SltEndMonthFr']"),
                $("input[name='sch100SltEndDayFr']"));
    setYmdParam($("#selDateet"),
                $("input[name='sch100SltEndYearTo']"),
                $("input[name='sch100SltEndMonthTo']"),
                $("input[name='sch100SltEndDayTo']"));
}

//イベントを登録
$(function(){
    // Enterキーを押下した際の処理
    $(window).keydown(function(e){
         if (e.which == 13
                 && $('input:hidden[name="CMD"]').val() != "sch100search"
                 && $('input[name="sch010searchWord"]').is(":focus")) {
             document.forms[0].CMD.value='search';
             document.forms[0].submit();
             return false;
         }
     });
    /* hover */
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
    /* hover:click */
    $(".js_click").on("click", function(e){
        var cmd = $('input[name="scrData_cmd"]').val();
        var sch010DspDate = $(':hidden[name="scrData_sch010DspDate"]').val();
        var schSid = $(this).parent().find(':hidden[name="scrData_schSid"]').val();
        var userSid = $(this).parent().find(':hidden[name="scrData_userSid"]').val();
        var userKbn= $(this).parent().find(':hidden[name="scrData_userKbn"]').val();
        editSchedule(cmd, sch010DspDate, schSid, userSid, userKbn);
    });

});