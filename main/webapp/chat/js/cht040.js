function initLoad() {
  dspChangeSelect();
}

function dspChangeSelect() {
  if ($('input[name=cht040CreateGroup]:checked').val() == 1) {
    $(js_selectUser).show();
  } else {
    $(js_selectUser).hide();
  }
}
