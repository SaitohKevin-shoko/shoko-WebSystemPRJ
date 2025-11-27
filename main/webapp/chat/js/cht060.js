function setChtMessage(pluginId, btn) {
  var msg =  "<div>"
           + "<span>" + $(".cht060ReferenceYear").val()  + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".cht060ReferenceMonth").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>"
           + "<div class=\"mt5\">"
           + "<img class='original-display'src='../chat/images/original/menu_icon_single.png'>"
           + "<img class='classic-display'src='../chat/images/classic/menu_icon_single.gif'>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.cht'] + msglist_cmn['cmn.del.check'] + "</span>"
           + "</div>";

  deletePop(pluginId, btn, msg);
}