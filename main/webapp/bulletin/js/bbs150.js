function setBbsMessage(pluginId, btn) {
  var msg =  "<div>"
           + "<span>" + $(".bbs150Year").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".bbs150Month").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>"
           + "<div class=\"mt5\">"
           + "<img class='original-display'src='../bulletin/images/original/menu_icon_single.png'>"
           + "<img class='classic-display'src='../bulletin/images/classic/menu_icon_single.gif'>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.bbs'] + msglist_cmn['cmn.del.check'] + "</span>"
           + "</div>";

  deletePop(pluginId, btn, msg);
}