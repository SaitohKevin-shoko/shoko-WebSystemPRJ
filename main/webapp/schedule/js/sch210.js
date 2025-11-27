function fileLinkClick(bin) {
    document.forms[0].CMD.value='210_fileDownload';
    document.forms[0].sch040knBinSid.value=bin;
    document.forms[0].submit();
    return false;
}