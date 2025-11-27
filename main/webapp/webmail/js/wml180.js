function wml180ChangeDelKbn() {

    var delKbn = 0;
    for (i = 0; i < document.getElementsByName('wml180delKbn').length; i++) {
        if (document.getElementsByName('wml180delKbn')[i].checked) {
            delKbn = document.getElementsByName('wml180delKbn')[i].value;
        }
    }

    if (delKbn == 1) {
        $('#dateElement').hide();
        $('#dateAreaElement').show();
    } else if (delKbn == 2) {
        $('#dateElement').hide();
        $('#dateAreaElement').hide();
    } else {
        $('#dateElement').show();
        $('#dateAreaElement').hide();
    }
}

function setWmlLogMessage(pluginId, btn) {
  var msg = "";

  if ($("#wml180_delKbn0").is(":checked")) {
    msg += "<div>"
           + "<span class=\"ml10\">" + $("#delYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $("#delMonth").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + $("#delDay").val() + msglist_cmn['cmn.day'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
    msg += "<div class=\"mt5\">"
         + "<img class='original-display'src='../webmail/images/original/menu_icon_single.png'>"
         + "<img class='classic-display'src='../webmail/images/classic/menu_icon_single.gif'>"
         + "<span class=\"ml10\">" + msglist_cmn['cmn.send.receive.log'] + msglist_cmn['cmn.del.check'] + "</span>"
         + "</div>";
  } else if ($("#wml180_delKbn1").is(":checked")) {
    msg += "<div>"
           + "<span class=\"ml10\">" + $("#wmlYearFr").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $("#wmlMonthFr").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + $("#wmlDayFr").val() + msglist_cmn['cmn.day'] + "</span>"
           + "&nbsp;～&nbsp;"
           + "<span class=\"ml10\">" + $("#wmlYearTo").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $("#wmlMonthTo").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + $("#wmlDayTo").val() + msglist_cmn['cmn.day'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
    msg += "<div class=\"mt5\">"
         + "<img class='original-display'src='../webmail/images/original/menu_icon_single.png'>"
         + "<img class='classic-display'src='../webmail/images/classic/menu_icon_single.gif'>"
         + "<span class=\"ml10\">" + msglist_cmn['cmn.send.receive.log'] + msglist_cmn['cmn.del.check'] + "</span>"
         + "</div>";
  } else if ($("#wml180_delKbn2").is(":checked")) {
    msg += "<div>"
           + "<img class='original-display'src='../webmail/images/original/menu_icon_single.png'>"
           + "<img class='classic-display'src='../webmail/images/classic/menu_icon_single.gif'>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.send.receive.all'] + msglist_cmn['cmn.del.check'] + "</span>"
           + "</div>";
  }
  

  deletePopWml(pluginId, btn, msg, 'wml180');


}
