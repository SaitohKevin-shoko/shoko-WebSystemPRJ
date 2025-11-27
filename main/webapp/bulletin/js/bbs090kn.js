function buttonPush(cmd){

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function fileLinkClick2(fileId) {
    document.forms[0].CMD.value='fileDownload';
    document.forms[0].bbs090knTmpFileId.value=fileId;
    document.forms[0].submit();
    return false;
}

function fileLinkClick(fileId){

    document.forms[0].CMD.value='fileDownload';
    document.forms[0].bbs010forumSid.value=document.forms['bbs090knForm'].bbs010forumSid.value;
    document.forms[0].bbs090knTmpFileId.value=fileId;
    document.forms[0].submit();
    return false;

}
