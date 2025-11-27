function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function buttonPush2(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function clickFormLabel(label) {
  var e = null;
  try {
    e = document.getElementById(label.htmlFor);
  } catch (exception) {}
  if (e != null) {
    if (e.tagName == "INPUT") {
      switch (e.type) {
      case "checkbox":
        e.checked = !e.checked;
        break;
      case "radio":
        e.checked = true;
        break;
      default:
        e.focus();
        break;
      }
    } else {
      e.focus();
    }
  }
  return false;
}

function stopCloseWindow() {
    try {
        parent.menu.document.forms[0].windowCloseFlag.value = 1;	
    } catch (e) {
    }
}
