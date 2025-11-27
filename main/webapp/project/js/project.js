function ajaxInjection(contentsId, url) {
  $('#' + contentsId).load(url+ '?cache=' + (new Date()).getTime());
}

function fileTreeClick(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].selectDir.value=sid;
    document.forms[0].submit();
    return false;
}