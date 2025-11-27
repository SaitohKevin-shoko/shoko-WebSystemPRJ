$(function(){
 // ページ読み込み時に実行したい処理
    dspChangeUsrUko();
 });

function unload(){
    document.forms[0].CMD.value = 'formUnload';
    document.forms[0].formUnload.value='true';
    document.forms[0].submit();
    return false;
}

function moveMonthSchedule(cmd, uid, ukbn){
    window.opener.document.forms[0].cmd.value=cmd;
    window.opener.document.forms[0].CMD.value=cmd;
    window.opener.document.forms[0].sch010SelectUsrSid.value=uid;
    window.opener.document.forms[0].sch010SelectUsrKbn.value=ukbn;
    window.opener.document.forms[0].submit();
    return false;
}

function dspChangeUsrUko() {
    //ログイン停止フラグは非表示の場合がある
    if (!$("#js_loginStop").length) {
        return;
    }
    $("#js_userInfoList").find("td.borderBlock-white").addClass("bgC_lightGray");
}


