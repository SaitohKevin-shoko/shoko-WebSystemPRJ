function sendChangeDisable() {
  $(".enq960SelectSendYear").prop("disabled", true);
  $(".enq960SelectSendMonth").prop("disabled", true);
  return false;
}

function sendChangeEnable() {
  $(".enq960SelectSendYear").prop("disabled", false);
  $(".enq960SelectSendMonth").prop("disabled", false);
  return false;
}

$(function() {
  if ($("#sendDelKbn0").is(":checked")) {
    sendChangeDisable();
  } else {
    sendChangeEnable();
  }
  return false;
});

function draftChangeDisable() {
  $(".enq960SelectDraftYear").prop("disabled", true);
  $(".enq960SelectDraftMonth").prop("disabled", true);
  return false;
}

function draftChangeEnable() {
  $(".enq960SelectDraftYear").prop("disabled", false);
  $(".enq960SelectDraftMonth").prop("disabled", false);
  return false;
}

$(function() {
  if ($("#draftDelKbn0").is(":checked")) {
    draftChangeDisable();
  } else {
    draftChangeEnable();
  }
  return false;
});
