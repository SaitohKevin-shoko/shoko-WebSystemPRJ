function fileDl(cmd, fileId){
    $('#CMD')[0].value = cmd;
    document.forms[0].fileId.value=fileId;
    document.forms[0].submit();
    return false;
}
