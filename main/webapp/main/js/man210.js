function initEnableDisable() {

  if (document.forms[0].man210UseKbn[1].checked) {
    document.forms[0].man210NumCont.disabled = true;
    document.forms[0].man210NumAutAdd.disabled = true;
  } else {
        if (document.forms[0].man210NumCont.checked) {
            document.forms[0].man210NumAutAdd.disabled = false;
          } else {
            document.forms[0].man210NumAutAdd.disabled = true;
          }
  }
  return;
}

function buttonPush(cmd){
  document.forms[0].CMD.value = cmd;
  document.forms[0].submit();
  return false;
}

function changeObjKbn() {
  if (document.forms[0].man210ObjKbn[0].checked) {
    document.forms[0].man210ObjKbn[0].value = 1;
  } else {
    document.forms[0].man210ObjKbn[0].value = 0;
  }
  return;
}

function changeUseKbn() {
  if (document.forms[0].man210UseKbn[0].checked) {
    document.forms[0].man210NumCont.disabled = false;

    changeNumCont();

  } else {
    document.forms[0].man210NumCont.disabled = true;
    document.forms[0].man210NumAutAdd.disabled = true;
  }
  return;
}

function changeNumCont() {
  if (document.forms[0].man210NumCont.checked) {
      document.forms[0].man210NumAutAdd.disabled = false;
  } else {
      document.forms[0].man210NumAutAdd.disabled = true;
  }
  return;
}