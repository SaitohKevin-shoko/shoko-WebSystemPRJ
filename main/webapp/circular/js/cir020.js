function readOnly(){

    if (document.forms[0].cir020cvwConf.value != 0
    || document.forms[0].cmdMode.value == 3) {
        if (document.forms[0].cir020memoEdit.value == 1) {
            document.forms[0].cir020memo.readOnly=true;
        }
    }
    return false;
}

function fileLinkClick(binSid){

    document.forms[0].CMD.value='conf';
    document.forms[0].cir020downLoadFlg.value='1';
    document.forms[0].cir020binSid.value=binSid;
    document.forms[0].submit();

    return false;
}

function usrFileLinkClick(cacSid, binSid) {

    document.forms[0].CMD.value='downloadUsrTmp';
    document.forms[0].cir020cacSid.value=cacSid;
    document.forms[0].cir020binSid.value=binSid;
    document.forms[0].submit();

    return false;
}

function confClick(){
    document.forms[0].CMD.value='conf';
    document.forms[0].cir020downLoadFlg.value = '';
    return false;
}

function memoEdit(){

    document.forms[0].CMD.value = 'memoEdit';
    return false;
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].cir030sortKey.value = fid;
    document.forms[0].cir030orderKey.value = order;
    document.forms[0].cirDelFlg.value = false;
    document.forms[0].submit();
    return false;
}