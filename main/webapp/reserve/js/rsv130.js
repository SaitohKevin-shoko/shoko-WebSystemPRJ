function setRsvMessage(pluginId, btn) {
  var msg =  "<div>"
           + "<span>" + $(".rsv130year").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".rsv130month").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>"
           + "<div class=\"mt5\">"
           + "<img class='original-display'src='../reserve/images/original/menu_icon_single.png'>"
           + "<img class='classic-display'src='../reserve/images/classic/menu_icon_single.gif'>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.rsv'] + msglist_cmn['cmn.del.check'] + "</span>"
           + "</div>";

  deletePop(pluginId, btn, msg);
}