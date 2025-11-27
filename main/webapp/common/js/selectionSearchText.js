$(function(){
  $('#selectionSearchArea').mouseup(function(e){
    var str = $('#selectionSearchArea').getSelection();
    showTooltip(str, e.pageX, e.pageY, 'tooltip_search');
  });
  return null;
});

$(function(){
  $('#inputstr').mouseup(function(e){
    var str = $('#inputstr').getSelection();
    showTooltip(str, e.pageX, e.pageY, 'tooltip_search');
  });
  return null;
});

$(function(){
  $('#inputstr2').mouseup(function(e){
    var str = $('#inputstr2').getSelection();
    showTooltip(str, e.pageX, e.pageY, 'tooltip_search');
  });
  return null;
});

function showTooltip(str, pageX, pageY, tooltip) {
    var offsetX = +10;
    var offsetY = +30;
    var tmp = str;
    var tsr = $('#' + tooltip);
    if (str.length < 1) {

        tsr.hide();
    } else if (tmp.length > 15) {
        tsr.hide();
    } else {

        var linkstr = '<span style=\"font-weight:bold;\">' + tmp + '</span>を<br>' + '<a href=\"http://www.google.com/search?q=' + encodeURIComponent(tmp) + '\" target=\"_blank\">WEB検索</a>';
        tsr.html(linkstr);
        tsr.css('top', pageY + offsetY + "px");
        tsr.css('left', pageX + offsetX +"px");
        tsr.show();
    }
}

$(function hideTooltip() {
    $('#tooltip_search').hide();
});