function buttonPush(cmd) {

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function setTemplateNo(sid) {
    document.forms[0].editHltSid.value = sid;
}

function changeChk(){

   var chkFlg;
   if (document.forms[0].man023CheckAll.checked) {
       checkAll('man023hltSid');

   } else {
       nocheckAll('man023hltSid');
   }
}

$(function() {
  $('.js_tableTopCheck-header').live("change",function() {
    changeChk();
  });
});
