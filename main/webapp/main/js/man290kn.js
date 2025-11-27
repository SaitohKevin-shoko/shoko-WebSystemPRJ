function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function buttonPush2(cmd, mod){
    document.forms[0].CMD.value=cmd;
    document.forms[0].cmd.value=mod;
    document.forms[0].submit();
    return false;
}
function fileLinkClick2(fileId) {
    document.forms[0].CMD.value='fileDownload';
    document.forms[0].man290knTmpFileId.value=fileId;
    document.forms[0].submit();
    return false;
}

function fileLinkClick(fileId){
    url = "../main/man290kn.do?CMD=fileDownload&man290knTmpFileId=" + fileId;
    navframe.location=url;
}
