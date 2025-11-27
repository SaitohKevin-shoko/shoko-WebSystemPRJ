function rsvChangeDisable() {
  $(".rsv120year").prop("disabled", true);
  $(".rsv120month").prop("disabled", true);
  return false;
}

function rsvChangeEnable() {
  $(".rsv120year").prop("disabled", false);
  $(".rsv120month").prop("disabled", false);

  return false;
}

$(function() {
  if ($("#rsv120batchKbn0").is(":checked")) {
    rsvChangeDisable();
  } else {
    rsvChangeEnable();
  }
  return false;
});