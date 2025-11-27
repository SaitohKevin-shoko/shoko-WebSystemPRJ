function fileLinkClick(fileId) {
    document.forms[0].CMD.value='fileDownload';
    document.forms[0].adr161TmpFileId.value=fileId;
    document.forms[0].submit();
    return false;
}