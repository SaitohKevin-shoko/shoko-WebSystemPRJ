function setSchMessage(pluginId, btn) {
  var msg =  "<div>"
           + "<span>" + $(".sch083DelYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".sch083DelMonth").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">"  + msglist_cmn['cmn.after'] + "</span>"
           + "</div>"
           + "<div class=\"mt5\">"
           + "<img class='original-display'src='../schedule/images/original/menu_icon_single.png'>"
           + "<img class='classic-display'src='../schedule/images/classic/menu_icon_single.gif'>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.sch'] + msglist_cmn['cmn.del.check'] + "</span>"
           + "</div>";

  deletePop(pluginId, btn, msg);
}