function buttonPush(cmd){
  document.forms[0].CMD.value=cmd;
  document.forms[0].submit();
  return false;
}

function clickFormLabel(label) {
  var e = document.getElementById(label.htmlFor);
  if (e != null) {
    e.checked = true;
    document.forms[0].CMD.value="cmn170change";
    document.forms[0].submit();
    return false;
  }
}

function backButton() {
  window.parent.windowReload();
}

//描画時にメニュー(cmn003.jsp)更新
$(function() {
  try {
    parent.menu.document.forms[0].windowCloseFlag.value = 1;
  } catch (e) {
  }
  window.parent.menuReload();
});