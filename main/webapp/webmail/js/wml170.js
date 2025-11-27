function changeEnableDisable() {

    if ($("#walDelKbnNo").is(":checked")) {
      $(".js_wml170Year").prop("disabled", true);
      $(".js_wml170Month").prop("disabled", true);
      $(".js_wml170Day").prop("disabled", true);
    } else {
      $(".js_wml170Year").prop("disabled", false);
      $(".js_wml170Month").prop("disabled", false);
      $(".js_wml170Day").prop("disabled", false);
    }
}