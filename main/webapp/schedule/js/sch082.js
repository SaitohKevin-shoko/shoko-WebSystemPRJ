function schChangeDisable() {
  $(".sch082AtdelYear").prop("disabled", true);
  $(".sch082AtdelMonth").prop("disabled", true);
  return false;
}

function schChangeEnable() {
  $(".sch082AtdelYear").prop("disabled", false);
  $(".sch082AtdelMonth").prop("disabled", false);
  return false;
}

$(function() {
  if ($("#sch082AtdelFlg1").is(":checked")) {
    schChangeEnable();
  } else {
    schChangeDisable();
  }
  return false;
});
