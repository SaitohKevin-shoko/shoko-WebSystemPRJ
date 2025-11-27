function learnMore() {
  document.forms[0].rsv010LearnMoreFlg.value = 1;
  $('#js_kaniSyukan').addClass('display_none');
  $('#js_leranMore_syu').removeClass('display_none');
  $('#js_learnBtnSyu').addClass('display_none');
  $('#js_unfilteredBtnSuu').removeClass('display_none');
  if (window_create) {
    window_create();
  }
}

function unfiltered() {
  document.forms[0].rsv010LearnMoreFlg.value = 0;
  document.forms[0].rsv010SiborikomiFlg.value = 0;
  $('#js_kaniSyukan').removeClass('display_none');
  $('#js_leranMore_syu').addClass('display_none');
  $('#js_learnBtnSyu').removeClass('display_none');
  $('#js_unfilteredBtnSuu').addClass('display_none');
  document.forms[0].CMD.value='unfiltered';
  document.forms[0].submit();
    return false;
}

function changeKbnCombo() {
  document.forms[0].CMD.value='';
  document.forms[0].submit();
	return false;
}

function siborikomi() {
  document.forms[0].CMD.value='siborikomi';
  document.forms[0].submit();
	return false;
}

function freeTime() {
	var akiKbn = document.getElementById('aki').checked;
	if (akiKbn == true) {
		$('.js_dateInputSyu').removeClass("display_none");
		$('.js_dateInputSyu').addClass("display_flex");
	} else {
		$('.js_dateInputSyu').removeClass("display_flex");
		$('.js_dateInputSyu').addClass("display_none");
	}
}

function setParams() {
	if (typeof setYmdParam == 'function') {
		setYmdParam($("input[name='rsv010sisetuFreeFromDate']"),
			$("input[name='rsv010sisetuFreeFromY']"),
			$("input[name='rsv010sisetuFreeFromMo']"),
			$("input[name='rsv010sisetuFreeFromD']"));

		setYmdParam($("input[name='rsv010sisetuFreeToDate']"),
			$("input[name='rsv010sisetuFreeToY']"),
			$("input[name='rsv010sisetuFreeToMo']"),
			$("input[name='rsv010sisetuFreeToD']"));
	}

	if (typeof setHmParam == 'function') {
		setHmParam($("input[name='rsv010sisetuFreeFromTime']"), $("input[name='rsv010sisetuFreeFromH']"), $("input[name='rsv010sisetuFreeFromMi']"));
		setHmParam($("input[name='rsv010sisetuFreeToTime']"), $("input[name='rsv010sisetuFreeToH']"), $("input[name='rsv010sisetuFreeToMi']"));
	}

}

function buttonPush(cmd) {
	setParams();
	document.forms[0].CMD.value=cmd;
	document.forms[0].submit();
	return false;
}

function changeGroupCombo(){
	document.forms[0].CMD.value='comboChange';
	document.forms[0].submit();
	return false;
}

function moveDailySchedule(ymd){
	setParams();
	document.forms[0].CMD.value='nikkan';
	document.forms[0].rsvDspFrom.value=ymd;
	document.forms[0].submit();
	return false;
}

function moveGekkanSchedule(sid){
	setParams();
	document.forms[0].CMD.value='gekkan';
	document.forms[0].rsvSelectedSisetuSid.value=sid;
	document.forms[0].submit();
	return false;
}

function moveSisetuAdd(ymd, sisetuSid) {
	setParams();
	document.forms[0].CMD.value='sisetu_add';
	document.forms[0].rsvSelectedDate.value=ymd;
	document.forms[0].rsvSelectedSisetuSid.value=sisetuSid;
	document.forms[0].submit();
	return false;
}

function moveSisetuEdit(yoyakuSid) {
	setParams();
	document.forms[0].CMD.value='sisetu_edit';
	document.forms[0].rsvSelectedYoyakuSid.value=yoyakuSid;
	document.forms[0].submit();
	return false;
}

function moveItiran(cmd){
	setParams();
	document.forms[0].CMD.value='riyo_zyokyo_syokai';
	document.forms[0].rsvSelectedSisetuSid.value=-1;
	document.forms[0].submit();
	return false;
}