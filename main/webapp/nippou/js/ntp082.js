function ntpChangeDisable() {
  $(".ntp082AtdelYear").prop("disabled", true);
  $(".ntp082AtdelMonth").prop("disabled", true);
  return false;
}

function ntpChangeEnable() {
  $(".ntp082AtdelYear").prop("disabled", false);
  $(".ntp082AtdelMonth").prop("disabled", false);
  return false;
}

$(function() {
  if ($("#ntp082AtdelFlg0").is(":checked")) {
    ntpChangeDisable();
  } else {
    ntpChangeEnable();
  }
  return false;
});