function buttonPush(cmd, mod){
    document.forms[0].CMD.value=cmd;
    document.forms[0].cmd.value=mod;
    document.forms[0].submit();
    return false;
}

function fileLinkClick(bin) {
    document.forms[0].CMD.value='041kn_fileDownload';
    document.forms[0].sch041knBinSid.value=bin;
    document.forms[0].submit();
    return false;
}