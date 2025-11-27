function init() {
  if (document.forms[0].rsv010LearnMoreFlg.value == 1) {
    window_create();
  }
  var keyList = document.getElementsByName('rsvIkkatuTorokuKey');
  if (keyList != null && keyList.length > 0) {
    for (i = 0; i < keyList.length; i++) {
      if (keyList[i].checked) {
				var key = keyList[i].value;
				document.getElementById(key).className='bgC_cal_select';
      }
    }
  }
}

function backGroundSetting(key, typeNo) {
	if (key.checked) {
		document.getElementById(key.value).className='bgC_cal_select';
	} else {
		var cssName = 'txt_l txt_t bgC_tableCell';
		document.getElementById(key.value).className=cssName;
	}
}

function clearSisetu(sisetuSid) {
	document.forms[0].CMD.value='clearHidSisetu';
	document.forms[0].rsv020ClearTargetKey.value = sisetuSid;
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
		'margin-top':top_flame.height() - 2
	});
	top_flame.css({
		'width':$('.js_rsv_under_frame').width()
	});
	$('.js_top_space_flame').css({
		'width':$(window).width(),
		'height':top_flame.height()
	});
	setTimeout(function() {
		$('body').removeClass('hyde');
	});
}

$(function() {
    $(window).resize(function() {
      window_create();
	});
});