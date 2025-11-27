function enableDisable() {

  if (document.forms[0].zsk110UpdateKbn[1].checked) {
    document.forms[0].zsk110StartTime.disabled = true;
    document.forms[0].zsk110StartTime.value = -1;
    document.forms[0].zsk110Status[0].disabled = true;
    document.forms[0].zsk110Status[1].disabled = true;
    document.forms[0].zsk110Status[2].disabled = true;
    document.forms[0].zsk110Status[1].checked = true;
    document.forms[0].zsk110Msg.disabled = true;
    document.forms[0].zsk110Msg.value = '';
  } else {
    document.forms[0].zsk110StartTime.disabled = false;
    document.forms[0].zsk110Status[0].disabled = false;
    document.forms[0].zsk110Status[1].disabled = false;
    document.forms[0].zsk110Status[2].disabled = false;
    document.forms[0].zsk110Msg.disabled = false;
  }
  return;
}
