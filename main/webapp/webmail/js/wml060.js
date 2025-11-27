$(function() {
    var num;
    for (num = 1; num <= 5; num++) {
        wmlChangeDelKbn(num);
    }
});

function wmlChangeDelKbn(num) {
    if ($('#manuDelOk' + num)[0].checked) {
        $('#delYear' + num)[0].disabled = false;
        $('#delMonth' + num)[0].disabled = false;
        $('#delDay' + num)[0].disabled = false;
    } else {
        $('#delYear' + num)[0].disabled = true;
        $('#delMonth' + num)[0].disabled = true;
        $('#delDay' + num)[0].disabled = true;
    }
}

function setWmlMessage(pluginId, btn) {
  var msg = "";

  if ($("#manuDelOk1").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.trash'] + "</span>"
           + "<span class=\"ml10\">" + $("#delYear1").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $("#delMonth1").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + $("#delDay1").val() + msglist_cmn['cmn.day'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if ($("#manuDelOk2").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.wml.send'] + "</span>"
           + "<span class=\"ml10\">" + $("#delYear2").val() + msglist_cmn['cmn.year']  + "</span>"
           + "<span class=\"ml10\">" + $("#delMonth2").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + $("#delDay2").val() + msglist_cmn['cmn.day'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if ($("#manuDelOk3").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.draft'] + "</span>"
           + "<span class=\"ml10\">" + $("#delYear3").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $("#delMonth3").val() + msglist_cmn['cmn.month']+ "</span>"
           + "<span class=\"ml10\">" + $("#delDay3").val() + msglist_cmn['cmn.day'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if ($("#manuDelOk4").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.wml.receive'] + "</span>"
           + "<span class=\"ml10\">" + $("#delYear4").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $("#delMonth4").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + $("#delDay4").val() + msglist_cmn['cmn.day'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if ($("#manuDelOk5").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.strage'] + "</span>"
           + "<span class=\"ml10\">" + $("#delYear5").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $("#delMonth5").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + $("#delDay5").val() + msglist_cmn['cmn.day'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  msg += "<div class=\"mt5\">"
         + "<img class='original-display'src='../webmail/images/original/menu_icon_single.png'>"
         + "<img class='classic-display'src='../webmail/images/classic/menu_icon_single.gif'>"
         + "<span class=\"ml10\">" + msglist_cmn['cmn.wml'] + msglist_cmn['cmn.del.check'] + "</span>"
         + "</div>";

  deletePopWml(pluginId, btn, msg, 'wml060');
}