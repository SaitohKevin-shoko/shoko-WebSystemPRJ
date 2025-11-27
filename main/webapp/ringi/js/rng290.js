function rng290download(fileId) {
    document.forms[0].CMD.value = 'templateFileDownload';
    document.forms[0].rng290downloadFileId.value = fileId;
    document.forms[0].submit();
    return false;
}