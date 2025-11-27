function accountConf(mode, accountSid) {
  return wml100Conf('confAccount', mode, accountSid);
}


function accountEdit(mode, accountSid) {
  return wml100Conf('editAccount', mode, accountSid);
}


function mailTemplate(accountSid) {
  return wml100Conf('confMailTemplate', 0, accountSid);
}

function wml100Conf(cmd, mode, accountSid) {
  var thisForm = document.forms['wml100Form'];
  thisForm.CMD.value = cmd;
  thisForm.wmlCmdMode.value = mode;
  thisForm.wmlAccountSid.value = accountSid;
  thisForm.submit();

  return false;
}

$(function(){
    /* radio:click */
    $(".js_tableTopCheck").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});