$(function() {
    var num;
    for (num = 1; num <= 3; num++) {
        rngChangeDelKbn(num);
    }
});

function rngChangeDelKbn(num) {
    if ($('#rngManuDelOk' + num).prop('checked') == true) {
        $("#rngDelYear"+num).prop("disabled", false);
        $("#rngDelMonth"+num).prop("disabled", false);
        $("#rngDelDay"+num).prop("disabled", false);
    } else {
        $("#rngDelYear"+num).prop("disabled", true);
        $("#rngDelMonth"+num).prop("disabled", true);
        $("#rngDelDay"+num).prop("disabled", true);
    }
}

function setRngMessage(pluginId, btn) {
  var msg =  "";

  if ($("#rngManuDelOk1").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.rng.apply'] + "</span>"
           + "<span class=\"ml10\">" + $("#rngDelYear1").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $("#rngDelMonth1").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + $("#rngDelDay1").val() + msglist_cmn['cmn.day'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if ($("#rngManuDelOk2").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.comp'] + "</span>"
           + "<span class=\"ml10\">" + $("#rngDelYear2").val() + msglist_cmn['cmn.year']  + "</span>"
           + "<span class=\"ml10\">" + $("#rngDelMonth2").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + $("#rngDelDay2").val() + msglist_cmn['cmn.day'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if ($("#rngManuDelOk3").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.draft'] + "</span>"
           + "<span class=\"ml10\">" + $("#rngDelYear3").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $("#rngDelMonth3").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + $("#rngDelDay3").val() + msglist_cmn['cmn.day'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  msg += "<div class=\"mt5\">"
         + "<img class='original-display'src='../ringi/images/original/menu_icon_single.png'>"
         + "<img class='classic-display'src='../ringi/images/classic/menu_icon_single.gif'>"
         + "<span class=\"ml10\">" + msglist_cmn['cmn.rng'] + msglist_cmn['cmn.del.check'] + "</span>"
         + "</div>";

  deletePop(pluginId, btn, msg);
}