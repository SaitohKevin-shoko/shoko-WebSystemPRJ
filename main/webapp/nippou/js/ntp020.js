function buttonPush(cmd){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function moveDailyNippou(cmd, ymd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].ntp010SelectDate.value=ymd;
    document.forms[0].ntp010DspDate.value=ymd;
    document.forms[0].submit();
    return false;
}

function addNippou(cmd, ymd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectDate.value=ymd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}

function editNippou(cmd, ymd, sid, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectDate.value=ymd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].ntp010NipSid.value=sid;
    document.forms[0].submit();
    return false;
}
function moveListNippou(cmd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}

function changeGroupCombo(){
    document.forms[0].cmd.value='';
    document.forms[0].CMD.value='';
    document.forms[0].ntp020SelectUsrSid.value='-1';
    document.forms[0].submit();
    return false;
}

function changeUserCombo(){
    document.forms[0].cmd.value='';
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}
function keyPress(keycode) {
    if (keycode == 13) {
        document.forms[0].CMD.value='search';
        document.forms[0].submit();
        return false;
    }
}
$(function() {
    /* 案件履歴選択 */
    $(".js_ankenListClick").live("click", function(){
        var ankenSid = $(this).attr('id');
        document.forms[0].cmd.value='add';
        document.forms[0].CMD.value='add';
        document.forms[0].ntp010HistoryAnkenSid.value=ankenSid;
        document.forms[0].ntp010SelectUsrSid.value=$('input:hidden[name=ntp010SessionUsrId]').val();
        document.forms[0].ntp010SelectDate.value=$('input:hidden[name=ntp010DspDate]').val();
        document.forms[0].submit();
        return false;
    });

    /* 企業・顧客履歴選択 */
    $(".js_companyListClick").live("click", function(){
        var companySid = $(this).attr('id');
        var companyBaseSid = $(this).children().attr('id');
        document.forms[0].cmd.value='add';
        document.forms[0].CMD.value='add';
        document.forms[0].ntp010HistoryCompSid.value=companySid;
        document.forms[0].ntp010HistoryCompBaseSid.value=companyBaseSid;
        document.forms[0].ntp010SelectUsrSid.value=$('input:hidden[name=ntp010SessionUsrId]').val();
        document.forms[0].ntp010SelectDate.value=$('input:hidden[name=ntp010DspDate]').val();
        document.forms[0].submit();
        return false;
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

});