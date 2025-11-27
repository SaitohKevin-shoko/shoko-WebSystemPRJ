function ajaxInjection(contentsId, url) {
    $('#' + contentsId).load(url+ '?cache=' + (new Date()).getTime());
}

function fileTreeClick(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].moveToDir.value=sid;
    document.forms[0].submit();
    return false;
}

function fileMoveClick() {
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(sortKey, order) {
    document.forms[0].submit();
    return false;
}

function buttonPushDir(cmd, mode, sid){
    document.forms[0].submit();
    return false;
}

function buttonPushCabinet(cmd, sid){

    document.forms[0].CMD.value=cmd;
    document.forms[0].fil010SelectCabinet.value=sid;
    document.forms[0].submit();
    return false;

}


function fileDl(cmd, binSid){

    document.forms[0].CMD.value=cmd;
    document.forms[0].fileSid.value=binSid
    document.forms[0].submit();
    return false;
}

function fileLinkClick(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].moveToDir.value=sid;
    document.forms[0].submit();
    return false;
}
function fileSelectUsersList() {

    var flg = true;
   if (document.forms[0].fileSelectUsersKbn.checked) {
       flg = true;
   } else {
       flg = false;
   }
   oElements = document.getElementsByName("users_l");
   var defUserAry = document.forms[0].file_users_l.options;
   var defLength = defUserAry.length;
   for (i = defLength - 1; i >= 0; i--) {
       if (defUserAry[i].value != -1) {
           defUserAry[i].selected = flg;
       }
   }
}

function filedateNoKbn() {
    if (document.forms[0].fileSearchdateNoKbn.checked == true) {
        document.forms[0].fileSearchfromYear.disabled=true;
        document.forms[0].fileSearchfromMonth.disabled=true;
        document.forms[0].fileSearchfromDay.disabled=true;
        document.forms[0].fromCalendarBtn.disabled=true;
        document.forms[0].fileSearchtoYear.disabled=true;
        document.forms[0].fileSearchtoMonth.disabled=true;
        document.forms[0].fileSearchtoDay.disabled=true;
        document.forms[0].toCalendarBtn.disabled=true;
    } else {
        document.forms[0].fileSearchfromYear.disabled=false;
        document.forms[0].fileSearchfromMonth.disabled=false;
        document.forms[0].fileSearchfromDay.disabled=false;
        document.forms[0].fromCalendarBtn.disabled=false;
        document.forms[0].fileSearchtoYear.disabled=false;
        document.forms[0].fileSearchtoMonth.disabled=false;
        document.forms[0].fileSearchtoDay.disabled=false;
        document.forms[0].toCalendarBtn.disabled=false;
    }
}


function showOrHide(){
  if (document.forms[0].okini.length) {
      if (document.forms[0].okini[0].checked == true) {
          hideText(0);
      } else {
          showText(0);
      }
  }
  if (document.forms[0].disksize.length) {
    if (document.forms[0].disksize[0].checked == true) {
        hideText(1);
    } else {
        showText(1);
    }
  }
}

function showText(index){
    var item1 = $('#show' + index);
    var item2 = $('#hide' + index);
    item1.show();
    item2.hide();
}

function hideText(index){
    var item1 = $('#show' + index);
    var item2 = $('#hide' + index);
    item1.hide();
    item2.show();
}
