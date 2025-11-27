var selectionId,
	selectionId2,
    tooltipId;

$(function(){
  $('#selectionSearchArea').mouseup(function(e){
    var str = $.getSelection();
    showTooltip(str, e.pageX, e.pageY);
  });
});

$(function(){
  $('#selectionSearchArea2').mouseup(function(e){
    var str = $.getSelection();
    showTooltip(str, e.pageX, e.pageY);
  });
});

function showTooltip(str, pageX, pageY) {
    var offsetX = +10;
    var offsetY = +30;
    var tmp = str;
    var tsr = $('#tooltip_search');
    if (tmp.length < 1) {
        tsr.hide();
    } else if (tmp.length > 15) {
        tsr.hide();
    } else {
        var linkstr = '<span style=\"font-weight:bold;\">' + tmp + '</span>を<br>' + '<a href=\"http://www.google.com/search?q=' + encodeURIComponent(tmp) + '\" target=\"_blank\">WEB検索</a>';
        $('#tooltip_search').html(linkstr);
        $('#tooltip_search').css('top', pageY + offsetY + "px");
        $('#tooltip_search').css('left', pageX + offsetX +"px");
        $('#tooltip_search').show();
    }
}

function hideTooltip() {
  $('#tooltip_search').hide();
}

function hideTooltip2() {
  $('#tooltip_search2').hide();
}