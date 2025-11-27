function bbsChangeDisable() {
  $(".bbs120AtdelYear").prop("disabled", true);
  $(".bbs120AtdelMonth").prop("disabled", true);
  return false;
}

function bbsChangeEnable() {
  $(".bbs120AtdelYear").prop("disabled", false);
  $(".bbs120AtdelMonth").prop("disabled", false);
  return false;
}

$(function() {
  if ($("#bbs120AtdelFlg_01").is(":checked")) {
    bbsChangeDisable();
  } else {
    bbsChangeEnable();
  }
  return false;
});
