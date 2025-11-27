function setNtpMessage(pluginId, btn) {
  var msg =  "<div>"
           + "<span>" + $(".ntp083DelYear").val()  + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".ntp083DelMonth").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>"
           + "<div class=\"mt5\">"
           + "<img class='original-display'src='../nippou/images/original/menu_icon_single.png'>"
           + "<img class='classic-display'src='../nippou/images/classic/menu_icon_single.gif'>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.ntp'] + msglist_cmn['cmn.del.check'] + "</span>"
           + "</div>";

  deletePop(pluginId, btn, msg);
}