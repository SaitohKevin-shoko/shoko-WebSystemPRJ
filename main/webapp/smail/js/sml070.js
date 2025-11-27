function smlLinkClick(cmd, sid){
    parent.document.forms[0].CMD.value=cmd;
    parent.document.forms[0].sml010SelectedSid.value=sid;
    parent.document.forms[0].submit();
    return false;
}