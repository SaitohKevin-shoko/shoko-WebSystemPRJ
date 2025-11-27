function buttonPush(cmd){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function changeGroupCombo(){
    document.forms[0].cmd.value='';
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}
function window_create() {
  var top_flame = $('.js_sch_top_frame');
  $('.js_sch_under_frame').css({
      'margin-top':top_flame.height() - 2
  });
  top_flame.css({
    'width':$(window).width(),
    'padding-right':8,
    'padding-left':8
  });
  $('.js_top_space_flame').css({
        'width':$(window).width(),
        'height':top_flame.height()
      });
}

$(function() {
    $(window).resize(function() {
      window_create();
    });
});