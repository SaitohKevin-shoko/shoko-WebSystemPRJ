var beforeSelectMinute = "";

function addTempFile(tempSaveName, tempName) {
	var detail = "<div>"
		+   "<input type=\"hidden\" class='js_tempValue' value=\"" + tempSaveName + "\">"
		+   "<a href=\"#\" class='js_tempDownLoad'>"
		+     "<span class=\"textLink ml5\">" + tempName + "</span>"
		+   "</a>"
		+   "<img class=\"ml5 cursor_p js_deleteTemp btn_originalImg-display\" src=\"../common/images/original/icon_delete.png\">"
		+   "<img class=\"ml5 cursor_p js_deleteTemp btn_classicImg-display\" src=\"../common/images/classic/icon_delete.png\">"
		+ "</div>";
	$(".js_tenpu").append(detail);
}

function buttonPush(cmd, mod){
	document.forms[0].CMD.value=cmd;
	document.forms[0].cmd.value=mod;
	document.forms[0].submit();
	return false;
}
function changeGroupCombo(cmd){
	document.forms[0].CMD.value=cmd;
	document.forms[0].submit();
	return false;
}

function moveUser(cmd){
	document.forms[0].CMD.value=cmd;
	document.forms[0].submit();
	return false;
}

function setMonthly() {
	if (document.forms[0].sch041WeekOrDay[0].checked == true) {
		$(".js_dayArea").addClass("display_none");
		$(".js_weekArea").removeClass("display_none");
		$("#selTranKbnArea").removeClass("display_none");
		$(".js_adv-weekday").show();
	} else if (document.forms[0].sch041WeekOrDay[1].checked == true) {
		$(".js_weekArea").addClass("display_none");
		$(".js_adv-weekday").hide();
		$(".js_dayArea").removeClass("display_none");
		if (document.forms[0].sch041ConfKbn.value != 0) {
			$("#selTranKbnArea").addClass("display_none");
			if (document.forms[0].sch041TranKbn[2].checked == true || document.forms[0].sch041TranKbn[3].checked) {
				document.forms[0].sch041TranKbn[1].checked=true;
			}
		}
	}
}

function setDisabled(value) {

	if (document.forms[0].sch040ScrollFlg.value=='1') {
		window.location.hash='add_user';
	}
	$('.js_adv-monthly').hide();
	$('.js_adv-weekday').hide();
	$('.js_adv-date').hide();

	if (document.forms[0].sch041ExtKbn[1].checked == true || document.forms[0].sch041ExtKbn[2].checked == true) {
		$('.js_adv-weekday').show();
		document.forms[0].sch041Dweek[0].disabled=false;
		document.forms[0].sch041Dweek[1].disabled=false;
		document.forms[0].sch041Dweek[2].disabled=false;
		document.forms[0].sch041Dweek[3].disabled=false;
		document.forms[0].sch041Dweek[4].disabled=false;
		document.forms[0].sch041Dweek[5].disabled=false;
		document.forms[0].sch041Dweek[6].disabled=false;
		document.forms[0].sch041TranKbn[0].disabled=false;
		document.forms[0].sch041TranKbn[1].disabled=false;
		$("#selTranKbnArea").removeClass("display_none");
		document.forms[0].sch041Week.disabled=true;
		document.forms[0].sch041Day.disabled=true;
		document.forms[0].sch041MonthOfYearly.disabled=true;
		document.forms[0].sch041DayOfYearly.disabled=true;

	} else if (document.forms[0].sch041ExtKbn[3].checked == true) {
		if (document.forms[0].sch041WeekOrDay[0].checked == true) {
			$('.js_adv-weekday').show();
			$("#selTranKbnArea").removeClass("display_none");
		} else {
			if (document.forms[0].sch041ConfKbn.value == 0){
				$("#selTranKbnArea").removeClass("display_none");
			} else {
				$("#selTranKbnArea").addClass("display_none");
			}
		}
		$('.js_adv-monthly').show();
		document.forms[0].sch041Dweek[0].disabled=false;
		document.forms[0].sch041Dweek[1].disabled=false;
		document.forms[0].sch041Dweek[2].disabled=false;
		document.forms[0].sch041Dweek[3].disabled=false;
		document.forms[0].sch041Dweek[4].disabled=false;
		document.forms[0].sch041Dweek[5].disabled=false;
		document.forms[0].sch041Dweek[6].disabled=false;
		document.forms[0].sch041TranKbn[0].disabled=false;
		document.forms[0].sch041TranKbn[1].disabled=false;
		document.forms[0].sch041Week.disabled=false;
		document.forms[0].sch041Day.disabled=false;
		document.forms[0].sch041MonthOfYearly.disabled=true;
		document.forms[0].sch041DayOfYearly.disabled=true;
		document.forms[0].sch041Dweek[0].disabled=false;
		document.forms[0].sch041Dweek[1].disabled=false;
		document.forms[0].sch041Dweek[2].disabled=false;
		document.forms[0].sch041Dweek[3].disabled=false;
		document.forms[0].sch041Dweek[4].disabled=false;
		document.forms[0].sch041Dweek[5].disabled=false;
		document.forms[0].sch041Dweek[6].disabled=false;

	} else if (document.forms[0].sch041ExtKbn[4].checked == true) {
		$('.js_adv-date').show();
		document.forms[0].sch041TranKbn[0].disabled=false;
		document.forms[0].sch041TranKbn[1].disabled=false;
		$("#selTranKbnArea").removeClass("display_none");
		document.forms[0].sch041Week.disabled=true;
		document.forms[0].sch041Day.disabled=true;
		document.forms[0].sch041MonthOfYearly.disabled=false;
		document.forms[0].sch041DayOfYearly.disabled=false;

		document.forms[0].sch041Dweek[0].disabled=true;
		document.forms[0].sch041Dweek[1].disabled=true;
		document.forms[0].sch041Dweek[2].disabled=true;
		document.forms[0].sch041Dweek[3].disabled=true;
		document.forms[0].sch041Dweek[4].disabled=true;
		document.forms[0].sch041Dweek[5].disabled=true;
		document.forms[0].sch041Dweek[6].disabled=true;
		document.forms[0].sch041Dweek[0].checked=false;
		document.forms[0].sch041Dweek[1].checked=false;
		document.forms[0].sch041Dweek[2].checked=false;
		document.forms[0].sch041Dweek[3].checked=false;
		document.forms[0].sch041Dweek[4].checked=false;
		document.forms[0].sch041Dweek[5].checked=false;
		document.forms[0].sch041Dweek[6].checked=false;

	} else {
		document.forms[0].sch041Dweek[0].disabled=true;
		document.forms[0].sch041Dweek[1].disabled=true;
		document.forms[0].sch041Dweek[2].disabled=true;
		document.forms[0].sch041Dweek[3].disabled=true;
		document.forms[0].sch041Dweek[4].disabled=true;
		document.forms[0].sch041Dweek[5].disabled=true;
		document.forms[0].sch041Dweek[6].disabled=true;
		document.forms[0].sch041TranKbn[0].disabled=false;
		document.forms[0].sch041TranKbn[1].disabled=false;
		$("#selTranKbnArea").addClass("display_none");
		document.forms[0].sch041Week.disabled=true;
		document.forms[0].sch041Day.disabled=true;
		document.forms[0].sch041TranKbn.disabled=true;
		document.forms[0].sch041Dweek[0].checked=false;
		document.forms[0].sch041Dweek[1].checked=false;
		document.forms[0].sch041Dweek[2].checked=false;
		document.forms[0].sch041Dweek[3].checked=false;
		document.forms[0].sch041Dweek[4].checked=false;
		document.forms[0].sch041Dweek[5].checked=false;
		document.forms[0].sch041Dweek[6].checked=false;
		document.forms[0].sch041Week.value=1;
		document.forms[0].sch041Day.value=1;
		document.forms[0].sch041MonthOfYearly.disabled=true;
		document.forms[0].sch041DayOfYearly.disabled=true;
		if (document.forms[0].sch041TranKbn[2].checked == true || document.forms[0].sch041TranKbn[3].checked) {
			document.forms[0].sch041TranKbn[1].checked=true;
		}
	}
}

function changeconfKbnCombo() {
	if (document.forms[0].sch041ConfKbn.value==0) {
		$(".js_periodArea").addClass("display_none");
		$("#selTranKbnArea").removeClass("display_none");
	} else {
		$(".js_periodArea").removeClass("display_none");
		$("#selTranKbnArea").addClass("display_none");
		if (document.forms[0].sch041TranKbn[2].checked == true || document.forms[0].sch041TranKbn[3].checked) {
			document.forms[0].sch041TranKbn[1].checked=true;
		}
	}
}

function changeWeekCombo(cmd){
	if (document.forms[0].sch041ExtKbn[3].checked == true) {
		if (document.forms[0].sch041Week.value==0) {
			document.forms[0].sch041Dweek[0].disabled=true;
			document.forms[0].sch041Dweek[1].disabled=true;
			document.forms[0].sch041Dweek[2].disabled=true;
			document.forms[0].sch041Dweek[3].disabled=true;
			document.forms[0].sch041Dweek[4].disabled=true;
			document.forms[0].sch041Dweek[5].disabled=true;
			document.forms[0].sch041Dweek[6].disabled=true;
			document.forms[0].sch041Dweek[0].checked=false;
			document.forms[0].sch041Dweek[1].checked=false;
			document.forms[0].sch041Dweek[2].checked=false;
			document.forms[0].sch041Dweek[3].checked=false;
			document.forms[0].sch041Dweek[4].checked=false;
			document.forms[0].sch041Dweek[5].checked=false;
			document.forms[0].sch041Dweek[6].checked=false;
		} else {
			document.forms[0].sch041Dweek[0].disabled=false;
			document.forms[0].sch041Dweek[1].disabled=false;
			document.forms[0].sch041Dweek[2].disabled=false;
			document.forms[0].sch041Dweek[3].disabled=false;
			document.forms[0].sch041Dweek[4].disabled=false;
			document.forms[0].sch041Dweek[5].disabled=false;
			document.forms[0].sch041Dweek[6].disabled=false;
		}
	}
}

function moveFromDay(elmYear, elmMonth, elmDay, kbn) {

	document.forms[0].sch040ScrollFlg.value = '0';

	systemDate = new Date();

	//「今日」ボタン押下
	if (kbn == 2) {
		var todayStr = getDateStr(convYear(systemDate.getYear()),(systemDate.getMonth() + 1), systemDate.getDate());
		$("input[name='sch041FrDate']").val(todayStr);
		setToDay();
		return;
}

	//「前日」or 「翌日」ボタン押下
	if (kbn == 1 || kbn == 3) {

		var ymdf = escape($("input[name='sch041FrDate']").val());
		re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
		if (ymdf.match(re)) {

			newDate = new Date($("input[name='sch041FrDate']").val());

			if (kbn == 1) {
				newDate.setDate(newDate.getDate() - 1);
			} else if (kbn == 3) {
				newDate.setDate(newDate.getDate() + 1);
			}

			var newYear = convYear(newDate.getYear());
			var systemYear = convYear(systemDate.getYear());

			if (newYear < systemYear - 5 || newYear > systemYear + 5) {
				return;
			} else {
				$(elmYear).val(newYear);
			}
			var todayStr = getDateStr(newYear, (newDate.getMonth() + 1), newDate.getDate());
			$("input[name='sch041FrDate']").val(todayStr);

		} else {

			if (ymdf == '') {
				var todayStr = getDateStr(convYear(systemDate.getYear()), (systemDate.getMonth() + 1), systemDate.getDate());
				$("input[name='sch041FrDate']").val(todayStr);
			}
		}
	}

	setToDay();
}

function moveToDay(elmYear, elmMonth, elmDay, kbn) {

	document.forms[0].sch040ScrollFlg.value = '0';

	systemDate = new Date();

	//「今日」ボタン押下
	if (kbn == 2) {
		var todayStr = getDateStr(convYear(systemDate.getYear()),(systemDate.getMonth() + 1), systemDate.getDate());
		$("input[name='sch041ToDate']").val(todayStr);
		setFromDay();
		return;
	}

	//「前日」or 「翌日」ボタン押下
	if (kbn == 1 || kbn == 3) {

		var ymdf = escape($("input[name='sch041ToDate']").val());
		re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
		if (ymdf.match(re)) {

			newDate = new Date($("input[name='sch041ToDate']").val());

			if (kbn == 1) {
				newDate.setDate(newDate.getDate() - 1);
			} else if (kbn == 3) {
				newDate.setDate(newDate.getDate() + 1);
			}

			var newYear = convYear(newDate.getYear());
			var systemYear = convYear(systemDate.getYear());

			if (newYear < systemYear - 5 || newYear > systemYear + 5) {
				return;
			} else {
				$(elmYear).val(newYear);
			}
			$(elmMonth).val(newDate.getMonth() + 1);
			$(elmDay).val(newDate.getDate());
			var todayStr = getDateStr(newYear, (newDate.getMonth() + 1), newDate.getDate());
			$("input[name='sch041ToDate']").val(todayStr);

		} else {

			if (ymdf == '') {
				var todayStr = getDateStr(convYear(systemDate.getYear()), (systemDate.getMonth() + 1), systemDate.getDate());
				$("input[name='sch041ToDate']").val(todayStr);
			}
		}
	}

	setFromDay();
}

function changeTimeStatus() {

	//時間指定無し
	if (document.forms[0].sch041TimeKbn.checked) {

		//施設予約チェック
		oElements = document.getElementsByName("sch041SvReserve");
		if (oElements.length > 0) {
			if (window.confirm(msglist.cantRsv + "\r\n" + msglist.delRsv)) {
				//施設予約を解除にする
				$('input[name="sch041SvReserve"]').remove();
				moveUser('041_res_leftarrow');

			} else {
				document.forms[0].sch041TimeKbn.checked = false;
			}
		} else {
			//施設予約を無効
			setReserveInactive();
		}

	} else {
		//施設予約を有効
		setReserveActive();
	}
	setTimeStatus();
}

function setTimeStatus() {

	//時間指定無し
	if (document.forms[0].sch041TimeKbn.checked) {
		document.forms[0].sch041FrTime.disabled=true;
		document.forms[0].sch041ToTime.disabled=true;

		//disabledの場合はリクエストされない為、hiddenパラメータを用意する。
		$(document.forms[0]).append($('<input/>',{type:'hidden',name:'sch041FrTime' ,value:$('input[name="sch041FrTime"]').val()}));
		$(document.forms[0]).append($('<input/>',{type:'hidden',name:'sch041ToTime' ,value:$('input[name="sch041ToTime"]').val()}));

		//時間マスタ
		$('.js_time_master').addClass('time_maste_none');

		//施設予約を無効
		setReserveInactive();

	} else {
		$('input[name="sch041FrTime"][type="hidden"]').remove();
		$('input[name="sch041ToTime"][type="hidden"]').remove();

		document.forms[0].sch041FrTime.disabled=false;
		document.forms[0].sch041ToTime.disabled=false;

		//時間マスタ
		$('.js_time_master').removeClass('time_maste_none');

		//施設予約を有効
		setReserveActive();
	}
}

function setReserveActive() {
	var cmd = document.forms[0].cmd.value;
	var timeKbn = document.forms[0].sch041TimeKbn.value;
	if (document.forms[0].reservePluginKbn.value == 0) {
		if (cmd != 'add') {
//            document.forms[0].sch041ResBatchRef[0].disabled=false;
//            document.forms[0].sch041ResBatchRef[1].disabled=false;
		}
		//施設予約を有効
		$('fieldset[name="sch041SameReserveUI"]').prop('disabled', false);
	}
}

function setReserveInactive() {
	var cmd = document.forms[0].cmd.value;
	var timeKbn = document.forms[0].sch041TimeKbn.value;

	if (document.forms[0].reservePluginKbn.value == 0) {
		if (cmd != 'add') {
//            document.forms[0].sch041ResBatchRef[0].disabled=true;
//            document.forms[0].sch041ResBatchRef[1].disabled=true;
		}
		//施設予約を無効
		$('fieldset[name="sch041SameReserveUI"]').prop('disabled', true);

	}
}



function deleteCompany(companyId, companyBaseId) {
	document.forms['sch041Form'].CMD.value = 'deleteCompany';
	document.forms['sch041Form'].sch041delCompanyId.value = companyId;
	document.forms['sch041Form'].sch041delCompanyBaseId.value = companyBaseId;
	document.forms['sch041Form'].submit();
	return false;
}

//午前
function setAmTime() {
  $("input[name='sch041FrHour']").val($(':hidden[name="sch040AmFrHour"]').val());
  $("input[name='sch041FrMin']").val($(':hidden[name="sch040AmFrMin"]').val());
  $("input[name='sch041ToHour']").val($(':hidden[name="sch040AmToHour"]').val());
  $("input[name='sch041ToMin']").val($(':hidden[name="sch040AmToMin"]').val());
  setFromTime();
  setToTime();
}

//午後
function setPmTime() {
  $("input[name='sch041FrHour']").val($(':hidden[name="sch040PmFrHour"]').val());
  $("input[name='sch041FrMin']").val($(':hidden[name="sch040PmFrMin"]').val());
  $("input[name='sch041ToHour']").val($(':hidden[name="sch040PmToHour"]').val());
  $("input[name='sch041ToMin']").val($(':hidden[name="sch040PmToMin"]').val());
  setFromTime();
  setToTime();
}

//終日
function setAllTime() {
  $("input[name='sch041FrHour']").val($(':hidden[name="sch040AllDayFrHour"]').val());
  $("input[name='sch041FrMin']").val($(':hidden[name="sch040AllDayFrMin"]').val());
  $("input[name='sch041ToHour']").val($(':hidden[name="sch040AllDayToHour"]').val());
  $("input[name='sch041ToMin']").val($(':hidden[name="sch040AllDayToMin"]').val());
  setFromTime();
  setToTime();
}

function setFromDay() {
	if (document.forms[0].sch040ScrollFlg.value=='1') {
		window.location.hash='add_user';
	}
	var ymdFr = $("input[name='sch041FrDate']").val();
	var ymdTo = $("input[name='sch041ToDate']").val();
	re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
	if (!ymdFr.match(re) || !ymdTo.match(re)) {
		return false;
	}
	var frYear = ymdFr.split("/")[0];
	var frMonth = ymdFr.split("/")[1];
	var frDay = ymdFr.split("/")[2];
	var toYear = ymdTo.split("/")[0];
	var toMonth = ymdTo.split("/")[1];
	var toDay = ymdTo.split("/")[2];

	if (parseInt(frYear) > parseInt(toYear)) {
		frYear = toYear;
		frMonth = toMonth;
		frDay = toDay;
		document.forms[0].sch041FrDate.value = getDateStr(toYear, toMonth, toDay);
	}

	if (parseInt(frYear) == parseInt(toYear)) {
		if (parseInt(frMonth) > parseInt(toMonth)) {
			frMonth = toMonth;
			frDay = toDay;
			document.forms[0].sch041FrDate.value = getDateStr(frYear, toMonth, toDay);
		}
	}

	if (parseInt(frYear) == parseInt(toYear)) {
		if (parseInt(frMonth) == parseInt(toMonth)) {
			if (parseInt(frDay) > parseInt(toDay)) {
				frDay = toDay;
				document.forms[0].sch041FrDate.value = getDateStr(frYear, frMonth, toDay);
			}
		}
	}
}

function setToDay() {
	if (document.forms[0].sch040ScrollFlg.value=='1') {
		window.location.hash='add_user';
	}
	var ymdFr = $("input[name='sch041FrDate']").val();
	var ymdTo = $("input[name='sch041ToDate']").val();
	re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
	if (!ymdFr.match(re) || !ymdTo.match(re)) {
		return false;
	}
	var frYear = ymdFr.split("/")[0];
	var frMonth = ymdFr.split("/")[1];
	var frDay = ymdFr.split("/")[2];
	var toYear = ymdTo.split("/")[0];
	var toMonth = ymdTo.split("/")[1];
	var toDay = ymdTo.split("/")[2];

	if (parseInt(frYear) > parseInt(toYear)) {
		toYear = frYear;
		toMonth = frMonth;
		toDay = frDay;
		document.forms[0].sch041ToDate.value = getDateStr(frYear, frMonth, frDay);
	}

	if (parseInt(frYear) == parseInt(toYear)) {
		if (parseInt(frMonth) > parseInt(toMonth)) {
			toMonth = frMonth;
			toDay = frDay;
			document.forms[0].sch041ToDate.value = getDateStr(toYear, frMonth, frDay);
		}
	}

	if (parseInt(frYear) == parseInt(toYear)) {
		if (parseInt(frMonth) == parseInt(toMonth)) {
			if (parseInt(frDay) > parseInt(toDay)) {
				toDay = frDay;
				document.forms[0].sch041ToDate.value = getDateStr(toYear, toMonth, frDay);
			}
		}
	}
}

function setFromTime() {
	var frHour = document.forms[0].sch041FrHour.value;
	var frMin = document.forms[0].sch041FrMin.value;
	var frTime = String(frHour).padStart(2, '0') + ":" + String(frMin).padStart(2, '0')
	document.forms[0].sch041FrTime.value = frTime;
}

function setToTime() {
	var toHour = document.forms[0].sch041ToHour.value;
	var toMin = document.forms[0].sch041ToMin.value;
	var toTime = String(toHour).padStart(2, '0') + ":" + String(toMin).padStart(2, '0')

	document.forms[0].sch041ToTime.value = toTime;
}

function getDateStr (year, month, day) {
	var yearStr = year.toString().padStart(4, "0");
	var monthStr = month.toString().padStart(2, "0");
	var dayStr = day.toString().padStart(2, "0");
	return yearStr + "/" + monthStr + "/" + dayStr;
}

function changeEnablePublic() {
	if ($("input[name='sch041Public']:checked").val() == 4) {
		$('.js_displayTarget').show();
	} else {
		$('.js_displayTarget').hide();
	}
}

function clpClear(target) {
	$('#'+target+'').val('');
	$('#'+target+'').clockpicker('hide');
}

$(function(){

	var timeU = $('input[name="hourDivision"]').val();
	/** 分ラベル*/
	var choices = ["00","10","20","30","40","50"];
	if (timeU == 5) {
			choices = ["00","05","10","15","20","25","30","35","40","45","50","55"];
	} else if (timeU == 15) {
		choices = ["00","15","30","45"];
	}

	//clockpickerはコールバックで対象要素が手に入らないので
	//ブロック変数を使用して対象要素の参照がコールバックに渡るように
	$.each($('.js_clockpicker'), function() {
		var targetInput = $(this);
		targetInput.clockpicker({
			placement: 'bottom',
			align: 'left',
			autoclose: true,
			beforeShow: function() {
				//選択不可の値を選択して再描画された時、選択前の値で更新する。
				if (beforeSelectMinute != "" && $.inArray(targetInput.val().split(":")[1], choices) == -1){
					targetInput.val(targetInput.data('clockpicker').spanHours.text() + ":" + beforeSelectMinute);
				}
				beforeSelectMinute = targetInput.val().split(":")[1];
				$('.js_clpClear_area').remove();
			},
			afterShow: function() {
				var clock = $('.clockpicker-popover');
				var clock_id = targetInput.attr('id');
				clock.append("<div class='clpClear_area js_clpClear_area'><button type='button' class='js_clockpickerClear clpClear_button' onClick=\"clpClear(\'"+clock_id+"\')\">クリア</button></div>");
				$('.clockpicker-span-minutes').text(targetInput.val().split(":")[1]);
				if (targetInput.val().split(":")[0].length == 0) {
					$('.clockpicker-span-hours').text("00");
				} else {
					$('.clockpicker-span-hours').text(targetInput.val().split(":")[0]);
				}
				$(".clockpicker-minutes").find(".clockpicker-tick").filter(function(index, element){
					return !($.inArray($(element).text(), choices) != -1)
				}).remove();
			},
			afterHourSelect: function() {
				targetInput.val(targetInput.data('clockpicker').spanHours.text() + ":" + targetInput.data('clockpicker').spanMinutes.text());
			},
			afterDone: function(){
				//分選択後のコールバック
				//ただしautocloseで閉じた場合は呼ばれない
				var selectedMinutes = targetInput.val().split(":")[1];
				//分選択後にラベル外の分が選択された場合
				if ($.inArray(selectedMinutes, choices) == -1){
					//再描画によって時間の設定し直しを強制
					targetInput.clockpicker('show').clockpicker('toggleView', 'minutes');
				}
			},
			afterHide: function(){
				if ($.inArray(targetInput.data('clockpicker').spanMinutes.text(), choices) != -1){
					//ダイアログを閉じる際に選択した時間がもう片方の時間を上回った場合、同じ値で更新する。
					if (targetInput.attr("id") == "fr_clock") {
						var frHour = Number(targetInput.data('clockpicker').spanHours.text());
						var frMinute = Number(targetInput.data('clockpicker').spanMinutes.text());
						var toHour = Number($('#to_clock').val().substring(0, 2));
						var toMinute = Number($('#to_clock').val().substring(3, 5));
						if (frHour > toHour || (frHour == toHour && frMinute > toMinute)) {
							$('#to_clock').val(targetInput.data('clockpicker').spanHours.text() + ":" + targetInput.data('clockpicker').spanMinutes.text());
						}
					} else if (targetInput.attr("id") == "to_clock") {
						var frHour = Number($('#fr_clock').val().substring(0, 2));
						var frMinute = Number($('#fr_clock').val().substring(3, 5));
						var toHour = Number(targetInput.data('clockpicker').spanHours.text());
						var toMinute = Number(targetInput.data('clockpicker').spanMinutes.text());
						if (frHour > toHour || (frHour == toHour && frMinute > toMinute)) {
							$('#fr_clock').val(targetInput.data('clockpicker').spanHours.text() + ":" + targetInput.data('clockpicker').spanMinutes.text());
						}
					}
				}
			}
		});
  });

	if (document.forms[0].sch041ConfKbn.value == 0) {
		$(".js_periodArea").addClass("display_none");
	} else {
		$(".js_periodArea").removeClass("display_none");
	}

	/** ファイルのダウンロード */
	$(document).on("click", ".js_tempDownLoad", function() {
		var param = {};
		param["CMD"] = "041_fileDownload";
		param["sch041BinSid"] = $(this).siblings(".js_tempValue").val();
		param["sch010SchSid"] = $("input[name='sch010SchSid']").val();
		var paramStr = $.param(param, true);
		var paramStrStart = "../schedule/sch041.do?";
		paramStr = paramStrStart + paramStr;
		location.href=paramStr;
	});

	/** テンポラリディレクトリにあるファイルの削除 */
	$(document).on("click", ".js_deleteTemp", function() {
		document.forms[0].CMD.value='041_fileDelete';
		document.forms[0].sch041BinSid.value=$(this).siblings(".js_tempValue").val();
		document.forms[0].submit();
	});

	$("input[name='sch041Public']").on("change", function() {
		if ($(this).val() == 4) {
			$(".js_displayTarget").show();
		} else {
			$(".js_displayTarget").hide();
		}
	})

	/* 開始 カレンダーアイコンクリック */
	$('#iconKikanStart').on('click', function(e) {
		$("#easyFrDate").focus();
	});

	/* 終了 カレンダーアイコンクリック */
	$('#iconKikanFinish').on('click', function(e) {
		$("#easyToDate").focus();
	});

	//開始日付用DatePicker設定
	if ($('#easyFrDate')[0]) {
		$('#easyFrDate').datepicker({
				changeYear: true,
				showAnim: 'blind',
				changeMonth: true,
				numberOfMonths: 1,
				showCurrentAtPos: 0,
				showButtonPanel: true,
				dateFormat:'yy/mm/dd',
				yearRange: "-5:+5",
				onSelect: function() {
					setToDay();
				}
		});
	}

	//終了日付用DatePicker設定
	if ($('#easyToDate')[0]) {
		$('#easyToDate').datepicker({
			changeYear: true,
			showAnim: 'blind',
			changeMonth: true,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			showButtonPanel: true,
			dateFormat:'yy/mm/dd',
			yearRange: "-5:+5",
			onSelect: function() {
				setFromDay();
			}
		});
	}
	$.datepicker._gotoToday = function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		systemDate = new Date();
		if (inst.id == "easyToDate") {
			var todayStr = getDateStr(convYear(systemDate.getYear()),(systemDate.getMonth() + 1), systemDate.getDate());
			$("input[name='sch041ToDate']").val(todayStr);
			setFromDay();
		} else {
			var todayStr = getDateStr(convYear(systemDate.getYear()),(systemDate.getMonth() + 1), systemDate.getDate());
			$("input[name='sch041FrDate']").val(todayStr);
			setToDay();
		}
		this._hideDatepicker();
	}
	var old_fn = $.datepicker._updateDatepicker;
	$.datepicker._updateDatepicker = function(inst) {
		old_fn.call(this, inst);
		var buttonPane = $(this).datepicker("widget").find(".ui-datepicker-buttonpane");
		var buttonHtml = "<button type='button' class='ui-datepicker-clean ui-state-default ui-priority-primary ui-corner-all'>クリア</button>";
		$(buttonHtml).appendTo(buttonPane).click(
			function(e) {
			$.datepicker._clearDate(inst.input);
		});
	}
});

function openScheduleReserveWindowSch040(resGroupSid, dspDate) {
  var groupSid = "";
  if ($('input[name="sch010SelectUsrKbn"]').val() == 1) {
    groupSid = $('input[name="sch040GroupSid"]').val();
  } else {
    groupSid = $('fieldset[name="sch041SameUserUI"]').find(".js_multiselector_groupSelection").find(".bgC_tableCell").find('input[name="sch041GroupSid"]').val();
  }
  openScheduleReserveWindow(groupSid, resGroupSid, dspDate)
}
