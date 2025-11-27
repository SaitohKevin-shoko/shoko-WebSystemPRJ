function smlButtonPush(cmd) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function fileLinkClick(binSid) {
    document.forms[0].CMD.value='fileDownload';
    document.forms[0].sml020knBinSid.value=binSid;
    document.forms[0].submit();
    return false;
}

function smlAtesakiSelectPush(cmd, kbn) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].sml020SendKbn.value=kbn;
    document.forms[0].submit();
    return false;
}

function sml020ChangeGrp() {
    document.forms[0].CMD.value = 'changeGrp';
    document.forms[0].submit();
    return false;
}

function changeChkAdd(){
   var chkFlg;
   if (document.forms[0].usrAllCheck.checked) {
       chkFlg = true;
   } else {
       chkFlg = false;
   }
   delAry = document.getElementsByName("sml010usrSids");
   for(i = 0; i < delAry.length; i++) {
       delAry[i].checked = chkFlg;
   }
}

function usrNameClick(usrsid) {
    document.forms[0].CMD.value='sml020addUsr';
    document.forms[0].sml010usrSid.value = usrsid;
    document.forms[0].submit();
    return false;
}

function hinaNameClick(hinaSid) {
    document.forms[0].CMD.value='hinagataSet';
    document.forms[0].sml020SelectHinaId.value = hinaSid;
    document.forms[0].submit();
    return false;
}

function deleteAtesaki(usrSid, kbn) {
    document.forms[0].CMD.value='deleteAtesaki';
    document.forms[0].sml020DelUsrSid.value=usrSid;
    document.forms[0].sml020DelSendKbn.value=kbn;
    document.forms[0].submit();
    return false;
}

var submitFlg = false;
function onControlSmlSend(){
    document.forms[0].CMD.value='send';
    if (!submitFlg) {
        submitFlg = true;
        return true;
    } else {
        alert(msglist.waitForWhile);
    }
    return false;
}
