var easyRegisterDisp = false;
function updateSchedulePtl(cmd, formId) {
    var frm = document.getElementById(formId);
    var url = '../schedule/schptl010.do';
    var itemId = frm.schPtl010ItemId.value
    frm.CMD.value=cmd;
    var pars = '';//getHidden();
    pars= '?CMD=' + cmd;
    pars= pars  + '&schWeekDate=' + frm.schWeekDate.value;
    pars= pars  + '&schDspGrpSid=' + frm.schDspGrpSid.value;
    pars= pars  + '&schPtl010ItemId=' + itemId;
    url = url + pars;
    $('#schedule_' + itemId).load(url);
}

function addSchedulePtl(cmd, ymd, formId){
    var frm = document.getElementById(formId);
    frm.CMD.value=cmd;
    frm.schSelectDate.value=ymd;
    frm.submit();
    return false;
}

function editSchedulePtl(cmd, ymd, sid, formId){
    var frm = document.getElementById(formId);
    frm.CMD.value=cmd;
    frm.schSelectDate.value=ymd;
    frm.schSelectSchSid.value=sid;
    frm.submit();

    return false;
}
function moveMonthScheduleFromPtl(cmd, formId){
    var frm = document.getElementById(formId);
    frm.CMD.value=cmd;
    frm.submit();
    return false;
}

function moveWeekScheduleFromPtl(cmd, formId){
    var frm = document.getElementById(formId);
    frm.CMD.value=cmd;
    frm.submit();
    return false;
}

function moveDailyScheduleFromPtl(cmd, ymd, formId){
    var frm = document.getElementById(formId);
    frm.CMD.value=cmd;
    frm.schSelectDate.value=ymd;
    frm.submit();
    return false;
}