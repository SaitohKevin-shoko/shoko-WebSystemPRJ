function fileLinkClick(fileId) {
    document.forms[0].CMD.value='fileDownload';
    document.forms[0].wml250knFileId.value=fileId;
    document.forms[0].submit();
    return false;
}
