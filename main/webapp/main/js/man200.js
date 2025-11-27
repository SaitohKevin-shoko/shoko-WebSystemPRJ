function initEnableDisable() {
  if (document.forms[0].man200LimitKbn[0].checked) {
    document.forms[0].man200LimitDay.disabled = true;
    $('#passLimitDay').hide();
  } else {
    document.forms[0].man200LimitDay.disabled = false;
    $('#passLimitDay').show();
  }
  return;
}

function changeLimitKbn(kbn) {
  if (kbn == '0') {
    document.forms[0].man200LimitDay.disabled = true;
    $('#passLimitDay').hide();
  } else if (kbn == '1') {
    document.forms[0].man200LimitDay.disabled = false;
    $('#passLimitDay').show();
  }
  return;
}