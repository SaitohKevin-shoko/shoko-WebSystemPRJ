function addAuth() {
  return configAuth(0, 0);
}

function editAuth(authSid) {
  return configAuth(1, authSid);
}

function configAuth(mode, authSid) {
  var thisForm = document.forms['cmn250Form'];

  thisForm.CMD.value = 'cmn250Next';
  thisForm.cmn250CmdMode.value = mode;
  thisForm.cmnAuthSid.value = authSid;
  thisForm.submit();

  return false;
}

function deleteAuth(authSid) {
  var thisForm = document.forms['cmn250Form'];

  thisForm.CMD.value = 'cmn250Delete';
  thisForm.cmnAuthSid.value = authSid;
  thisForm.submit();

  return false;
}