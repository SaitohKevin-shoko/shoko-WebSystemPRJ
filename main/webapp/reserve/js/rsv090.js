function buttonPush(cmd) {
  document.forms[0].CMD.value=cmd;
  document.forms[0].submit();
  return false;
}
function changeGroupCombo(cmd) {
  document.forms[0].CMD.value=cmd;
  document.forms[0].submit();
  return false;
}

function cmn110Updated(cmn110, tempName, tempSaveName, formId) {
  if (formId == 1) {
    document.forms[0].CMD.value='sisetu_img_toroku';
    document.forms[0].submit();
  } else if (formId == 2) {
    document.forms[0].CMD.value='place_img_toroku';
    document.forms[0].submit();
  } 
  return false;
}

function basyoImageDelete(binSid) {
	document.forms[0].rsv090BinSid.value = binSid;
	buttonPush("place_img_delete");
}

function initDisplay() {
	$(".js_sisetuImage").appendTo("#attachment_FormArea1");
	
	$(".js_basyoImage").appendTo("#attachment_FormArea2");
	
	$("body").removeClass("display_n");
}