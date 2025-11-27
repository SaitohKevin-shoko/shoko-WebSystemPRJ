function doOk() {
  var memberSid = $('input[name="prj240userSid"]');
  var paramName = $('input[name="prj240paramName"]');
  for (var i = 0; i < memberSid.length; i++) {
    $('form').append("<input type='hidden' name='" + paramName[0].value + "' value='" + memberSid[i].value + "'>");
  }
  buttonPush('doOk');
}