function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function editSchedule(cmd, ymd, sid, uid, ukbn){
    parent.document.forms[0].CMD.value=cmd;
    parent.document.forms[0].schSelectDate.value=ymd;
    parent.document.forms[0].schSelectUsrSid.value=uid;
    parent.document.forms[0].schSelectUsrKbn.value=ukbn;
    parent.document.forms[0].schSelectSchSid.value=sid;
    parent.document.forms[0].submit();
    return false;
}

function pointerMove(id_name){
   obj = window.document.getElementById(id_name);
   y = obj.offsetTop;
   h = obj.offsetHeight;
   scrollTo(0,y-h);
   return false;
} 