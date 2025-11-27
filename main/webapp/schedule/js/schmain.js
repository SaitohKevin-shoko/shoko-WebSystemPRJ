var easyRegisterDisp = false;
function updateSchedule2(cmd) {
  //�X�P�W���[��
  var url = '../schedule/schmain.do';
  document.forms[0].CMD.value=cmd;
  var pars = '';//getHidden();
  pars= '?CMD=' + cmd;
  pars= pars  + '&schWeekDate=' + document.forms['schmainForm'].schWeekDate.value;
  url = url + pars;
 $('#schedule_schmain').load(url);




}
function addSchedule(cmd, ymd){
    document.forms['schmainForm'].CMD.value=cmd;
    document.forms['schmainForm'].schSelectDate.value=ymd;
    document.forms['schmainForm'].submit();
    return false;
}
function editSchedule(cmd, ymd, sid, uid, ukbn){
    document.forms['schmainForm'].CMD.value=cmd;
    document.forms['schmainForm'].schSelectDate.value=ymd;
    document.forms['schmainForm'].schSelectUsrSid.value=uid;
    document.forms['schmainForm'].schSelectUsrKbn.value=ukbn;
    document.forms['schmainForm'].schSelectSchSid.value=sid;
    document.forms['schmainForm'].submit();
    return false;
}

function moveScheduleFromMain(cmd, ymd){
    document.forms['schmainForm'].CMD.value=cmd;
    if (ymd) {
        document.forms['schmainForm'].schSelectDate.value=ymd;
    }
    document.forms['schmainForm'].submit();
    return false;
}