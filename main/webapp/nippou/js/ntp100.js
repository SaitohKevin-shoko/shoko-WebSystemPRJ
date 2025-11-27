function openAnkenWindow(parentPageId, rowNumber) {
    var winWidth=900;
    var winHeight=800;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var url = '../nippou/ntp200.do';
    url += '?ntp200parentPageId=' + parentPageId + "&ntp200RowNumber=" + rowNumber;
    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    ankenSubWindow = window.open(url, 'thissite', opt);
    return false;
}

function changeGroupCombo(){
    document.forms[0].CMD.value='research';
    document.forms[0].ntp100SltUser.value='-1';
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
    document.forms[0].ntp100SortKey1.value = fid;
    document.forms[0].ntp100OrderKey1.value = order;
    document.forms[0].submit();
    return false;
}

function clickTitle(sortKey, orderKey) {
    document.forms[0].CMD.value='research';
    document.forms[0].ntp100SortKey1.value=sortKey;
    document.forms[0].ntp100OrderKey1.value=orderKey;
    document.forms[0].submit();
    return false;
}

function clickSortTitle(sortValue) {

    if (document.forms[0].ntp100SortKey1.value == sortValue) {

        if (document.forms[0].ntp100OrderKey1[0].checked == true) {
            document.forms[0].ntp100OrderKey1[0].checked = false;
            document.forms[0].ntp100OrderKey1[1].checked = true;
        } else {
            document.forms[0].ntp100OrderKey1[1].checked = false;
            document.forms[0].ntp100OrderKey1[0].checked = true;
        }
    } else {
        document.forms[0].ntp100SortKey1.value = sortValue;
    }

    document.forms[0].CMD.value='research';
    document.forms[0].submit();
    return false;
}

function editNippou(cmd, ymd, sid, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].dspMod.value=5;
    document.forms[0].ntp010SelectDate.value=ymd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=0;
    document.forms[0].ntp010NipSid.value=sid;
    
    setYmdParam($("input[name='ntp100SltDateFr']"),
        $("input[name='ntp100SltYearFr']"),
        $("input[name='ntp100SltMonthFr']"),
        $("input[name='ntp100SltDayFr']"));
        
    setYmdParam($("input[name='ntp100SltDateTo']"),
        $("input[name='ntp100SltYearTo']"),
        $("input[name='ntp100SltMonthTo']"),
        $("input[name='ntp100SltDayTo']"));
        
    document.forms[0].submit();
    return false;
}

function changePage1() {
    document.forms[0].CMD.value='research';
    for (i = 0; i < document.forms[0].ntp100Slt_page1.length; i++) {
        if (document.forms[0].ntp100Slt_page1[i].selected) {
            document.forms[0].ntp100Slt_page2.value=document.forms[0].ntp100Slt_page1[i].value;
            document.forms[0].ntp100PageNum.value=document.forms[0].ntp100Slt_page1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function changePage2() {
    document.forms[0].CMD.value='research';
    for (i = 0; i < document.forms[0].ntp100Slt_page2.length; i++) {
        if (document.forms[0].ntp100Slt_page2[i].selected) {
            document.forms[0].ntp100Slt_page1.value=document.forms[0].ntp100Slt_page2[i].value;
            document.forms[0].ntp100PageNum.value=document.forms[0].ntp100Slt_page2[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}
function moveMonthSchedule(cmd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].sch010SelectUsrSid.value=uid;
    document.forms[0].sch010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}
function moveDay(elm, kbn) {

    systemDate = new Date();

    //「今日ボタン押下」
    if (kbn == 2) {
        $(elm).val(systemDate.toISOString().split("T")[0].replaceAll("-", "/"));
        return;
    }

    //「前日」or 「翌日」ボタン押下
    if (kbn == 1 || kbn == 3) {

        var ymdf = $(elm).val();
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

            newDate = new Date(ymdf)
            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = newDate.getFullYear();
            var systemYear = systemDate.getFullYear();

            if (newYear >= systemYear - 10 && newYear <= systemYear + 10) {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(elm).val(year + "/" + month + "/" + day);
            }
        } else {
            if ($(elm).val() == '') {
                $(elm).val(systemDate.toISOString().split("T")[0].replaceAll("-", "/"));
            }
        }
    }
}

function openNtp100Group(ntp100SltGroup, sltGroup, flg){
    document.forms[0].CMD.value='research';
    document.forms[0].ntp100SltUser.value='-1';
    openGroupWindow(ntp100SltGroup, sltGroup, flg);
    return false;
}

$(function() {
    //案件名クリック
    $(document).on("click", ".js_anken_click", function(){
        var ankenSid = $(this).attr("id");
        openSubWindow("../nippou/ntp210.do?ntp210NanSid=" + ankenSid);
    });

    //企業名クリック
    $(document).on("click", ".js_compClick", function(){
        var compSid = $(this).attr("id");
        openSubWindow("../address/adr250.do?adr250AcoSid=" + compSid);
    });

//    if ($('#NTP_AREA_' + document.forms[0].ntp100SelectNtpAreaSid.value).offset() != null) {
//        $('html,body').scrollTop($('#NTP_AREA_' + document.forms[0].ntp100SelectNtpAreaSid.value).offset().top - 10);
//    }
    /* メール  hover */
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

});


function setToUser() {
    window.location.hash='ntpArea_' + document.forms[0].ntp100SelectNtpAreaSid.value;
}