function pushPortalTab(cmd, ptlSid) {
    document.forms[0].ptlMainSid.value=ptlSid;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}
