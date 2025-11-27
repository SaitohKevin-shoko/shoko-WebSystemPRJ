function init() {
  var keyList = document.getElementsByName('rsvIkkatuTorokuKey');
  if (keyList != null && keyList.length > 0) {
      for (i = 0; i < keyList.length; i++) {
          if (keyList[i].checked) {
              var key = keyList[i].value;
              document.getElementById(key).className='bgC_cal_select txt_l txt_t';
          }
      }
  }
}

function backGroundSetting(key, typeNo) {
  if (key.checked) {
      document.getElementById(key.value).className='bgC_cal_select txt_t hp100';
  } else {

    var cssName;

    if(typeNo == 8) {
      cssName =  'txt_l txt_t bgC_tableCell_Saturday';
    } else if (typeNo == 9){
      cssName = 'txt_l txt_t bgC_tableCell_Sunday ';
    } else if (typeNo == 10){
      cssName = 'txt_l txt_t bgC_select ';
    }else {
      cssName = 'txt_l txt_t bgC_tableCell ';
    }
      document.getElementById(key.value).className=cssName;
  }
}

function clearSisetu(sisetuSid) {
  document.forms[0].CMD.value='clearHidSisetu';
  document.forms[0].rsv030ClearTargetKey.value = sisetuSid;
  document.forms[0].submit();
  return false;
}

function keyPress(keycode) {
  if (keycode == 13) {
      document.forms[0].CMD.value='gotosearch';
      document.forms[0].submit();
      return false;
  }
}

function resetCmd() {
  document.forms[0].CMD.value='';
}

function window_create() {
  var top_flame = $('.js_rsv_top_frame');
  $('.js_rsv_under_frame').css({
      'margin-top':top_flame.height() + $('.calendar_weekHeader').height()
  });
  top_flame.css({
    'width':$(window).width(),
  });
  $('.js_top_space_flame').css({
        'width':$(window).width(),
        'height':top_flame.height()
  });
  setTimeout(function() {
    $('#brank_flash').hide();
  });
  setTimeout(function() {
    $('body').removeClass('hyde');
  });
  $('.calendar_weekHeader-fixed').css({
    'top': top_flame.height()
  });
  $('.calendar_weekHeader').css({
    'cssText': 'width: calc(100% - '+ $('.rsv_ikkatutoroku_area').innerWidth() +'px);'
  });
  $('.calendar_body').css({
    'cssText': 'width: calc(100% - '+ $('.rsv_ikkatutoroku_area').innerWidth() +'px);'
  });
  $('.rsv_ikkatutoroku_area').addClass('rsv_ikkatutoroku_area-fixed');
  $('.rsv_ikkatutoroku_area-fixed div').addClass('border_top_none');
  $('.rsv_ikkatutoroku_area-fixed').css({
    'top': top_flame.height()
  });
}

$(function() {
  $(window).resize(function() {
    window_create();
  });
});