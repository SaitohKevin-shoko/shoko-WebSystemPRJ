function sendChangeDisable() {
  $(".enq950SelectSendYear").prop("disabled", true);
  $(".enq950SelectSendMonth").prop("disabled", true);
  return false;
}

function sendChangeEnable() {
  $(".enq950SelectSendYear").prop("disabled", false);
  $(".enq950SelectSendMonth").prop("disabled", false);
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
  $(".enq950SelectDraftYear").prop("disabled", true);
  $(".enq950SelectDraftMonth").prop("disabled", true);
  return false;
}

function draftChangeEnable() {
  $(".enq950SelectDraftYear").prop("disabled", false);
  $(".enq950SelectDraftMonth").prop("disabled", false);
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

function setEnqMessage(pluginId, btn) {
  var msg =  "";

  if (!$("#sendDelKbn0").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.enq.send'] + "</span>"
           + "<span class=\"ml10\">" + $(".enq950SelectSendYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".enq950SelectSendMonth").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if (!$("#draftDelKbn0").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.draft'] + "</span>"
           + "<span class=\"ml10\">" + $(".enq950SelectDraftYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".enq950SelectDraftMonth").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  msg += "<div class=\"mt5\">"
         + "<img class='original-display'src='../enquete/images/original/menu_icon_single.png'>"
         + "<img class='classic-display'src='../enquete/images/classic/menu_icon_single.gif'>"
         + "<span class=\"ml10\">" + msglist_cmn['cmn.enq'] + msglist_cmn['cmn.del.check'] + "</span>"
         + "</div>";

  deletePop(pluginId, btn, msg);
}