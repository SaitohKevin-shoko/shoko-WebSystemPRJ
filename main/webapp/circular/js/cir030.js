function fileLinkClick(binSid) {

    document.forms[0].CMD.value='download';
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

function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].cir030sortKey.value = fid;
    document.forms[0].cir030orderKey.value = order;
    document.forms[0].submit();
    return false;
}

function cirCopy() {
    document.forms['cir030Form'].cirEntryMode.value = 1;
    return buttonPush('copy');
}

function cirEdit() {
    document.forms['cir030Form'].cirEntryMode.value = 2;
    return buttonPush('edit');
}