function buttonPush(cmd){

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function fileLinkClick2(fileId) {
    document.forms[0].CMD.value='fileDownload';
    document.forms[0].bbs070knTmpFileId.value=fileId;
    document.forms[0].submit();
    return false;
}

function fileLinkClick(fileId){
    url = "../bulletin/bbs070kn.do?CMD=fileDownload&bbs070knTmpFileId=" + fileId;
    navframe.location=url;
}
