function changeDisable() {
  $(".mem030Year").prop("disabled", true);
  $(".mem030Month").prop("disabled", true);
  return false;
}

function changeEnable() {
  $(".mem030Year").prop("disabled", false);
  $(".mem030Month").prop("disabled", false);

  return false;
}

$(function() {
  if ($("#mem030Kbn0").is(":checked")) {
    changeDisable();
  } else {
    changeEnable();
  }
  return false;
});
