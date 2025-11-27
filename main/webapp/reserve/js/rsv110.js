function moveFromDay(elmDate, kbn) {

  systemDate = new Date();
  var year = convYear(systemDate.getFullYear());
  var month = ("0" + (systemDate.getMonth() + 1)).slice(-2);
  var day = ("0" + systemDate.getDate()).slice(-2);

  if (kbn == 2) {
    $(elmDate).val(year + "/" + month + "/" + day);
    setToDay();
    return;
  }

  if (kbn == 1 || kbn == 3) {

    var ymdf = escape($(elmDate).val());
    re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (ymdf.match(re)) {

      newDate = new Date($(elmDate).val())

      if (kbn == 1) {
        newDate.setDate(newDate.getDate() - 1);
      } else if (kbn == 3) {
        newDate.setDate(newDate.getDate() + 1);
      }

      var newYear = convYear(newDate.getFullYear());
      var systemYear = convYear(systemDate.getFullYear());

      if (newYear < systemYear - 5 || newYear > systemYear + 5) {
        return;
      } else {
        year = newYear;
        month = ("0" + (newDate.getMonth() + 1)).slice(-2);
        day = ("0" + newDate.getDate()).slice(-2);
        $(elmDate).val(year + "/" + month + "/" + day);
      }

    } else {

      if ($(elmDate).val() == '') {
        $(elmDate).val(year + "/" + month + "/" + day);
      }
    }
  }

  setToDay();
}

function moveToDay(elmDate, kbn) {

  systemDate = new Date();
  var year = convYear(systemDate.getFullYear());
  var month = ("0" + (systemDate.getMonth() + 1)).slice(-2);
  var day = ("0" + systemDate.getDate()).slice(-2);

  if (kbn == 2) {
    $(elmDate).val(year + "/" + month + "/" + day);
    setFromDay();
    return;
  }

  if (kbn == 1 || kbn == 3) {

    var ymdf = escape($(elmDate).val());
    re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (ymdf.match(re)) {

      newDate = new Date($(elmDate).val())

      if (kbn == 1) {
        newDate.setDate(newDate.getDate() - 1);
      } else if (kbn == 3) {
        newDate.setDate(newDate.getDate() + 1);
      }

      var newYear = convYear(newDate.getFullYear());
      var systemYear = convYear(systemDate.getFullYear());

      if (newYear < systemYear - 5 || newYear > systemYear + 5) {
        return;
      } else {
        year = newYear;
        month = ("0" + (newDate.getMonth() + 1)).slice(-2);
        day = ("0" + newDate.getDate()).slice(-2);
        $(elmDate).val(year + "/" + month + "/" + day);
      }

    } else {

      if ($(elmDate).val() == '') {
        $(elmDate).val(year + "/" + month + "/" + day);
      }
    }
  }

  setFromDay();
}

function convYear(yyyy) {
  if(yyyy<1900) {
    yyyy=1900+yyyy;
  }
  return yyyy;
}

function showOrHide(){
var rsv110HeaderDspFlg = document.forms[0].rsv110HeaderDspFlg.value;
  if (rsv110HeaderDspFlg == '0') {
    showText();
  } else {
    hideText();
  }
}

function showText(){
  $('.js_longHeader').show();
  $('.js_shortHeader').hide();
  document.forms[0].rsv110HeaderDspFlg.value='0';
}

function hideText(){
  $('.js_longHeader').hide();
  $('.js_shortHeader').show();
  document.forms[0].rsv110HeaderDspFlg.value='1';
}

function selectUsersList() {

  var flg = true;
  if (document.forms[0].rsv110SelectUsersKbn.checked) {
    flg = true;
  } else {
    flg = false;
  }
  oElements = document.getElementsByName("users_l");
  var defUserAry = document.forms[0].users_l.options;
  var defLength = defUserAry.length;
  for (i = defLength - 1; i >= 0; i--) {
    if (defUserAry[i].value != -1) {
      defUserAry[i].selected = flg;
    }
  }
}

function selectPubUsersList() {
  var flg = true;
  if (document.forms[0].rsv110SelectPubUsersKbn.checked) {
    flg = true;
  } else {
    flg = false;
  }
  oElements = document.getElementById("users_r");
  var defUserAry = document.forms[0].rsv110RightUsrGrpSid.options;
  var defLength = defUserAry.length;
  for (i = defLength - 1; i >= 0; i--) {
    if (defUserAry[i].value != -1) {
      defUserAry[i].selected = flg;
    }
  }
}

function setDateParam() {
  setYmdParam($("#selDatefr"),
              $("input[name='rsv110SelectedYearFr']"),
              $("input[name='rsv110SelectedMonthFr']"),
              $("input[name='rsv110SelectedDayFr']"));
  setYmdParam($("#selDateto"),
              $("input[name='rsv110SelectedYearTo']"),
              $("input[name='rsv110SelectedMonthTo']"),
              $("input[name='rsv110SelectedDayTo']"));
  setHmParam($("#fr_clock"),
              $("input[name='rsv110SelectedHourFr']"),
              $("input[name='rsv110SelectedMinuteFr']"));
  setHmParam($("#to_clock"),
              $("input[name='rsv110SelectedHourTo']"),
              $("input[name='rsv110SelectedMinuteTo']"));
}

$(function() {
    $('textarea').each(function() {
      setTextareaAutoResize($(this).get(0));
    });
    $(document).on("click", "#syoninbtn", function(){
      $('#rsvApproval').dialog({
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        width:380,
        modal: true,
        closeOnEscape: false,
        overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
        },
        buttons: {
          はい: function() {
            document.forms[0].CMD.value = "rsvApprovalOk";
            document.forms[0].submit();

            $(this).dialog('close');
          },
          キャンセル: function() {
            $(this).dialog('close');
          }
        }
      });
    });
    $(document).on("click", "#kyakkabtn", function(){
      $('#rsvcheck').dialog({
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        width:380,
        modal: true,
        closeOnEscape: false,
        overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
        },
        buttons: {
          はい: function() {
            document.forms[0].CMD.value = "rsvRejectionOk";

            if ($('#kyakkaCheck').attr("checked")){
              document.forms[0].rsv110rejectDel.value = 1;
            }
            document.forms[0].submit();

            $(this).dialog('close');
          },
          キャンセル: function() {
            //キャンセル時チェックボックスを外す
            $('#rejectDel').attr("checked",false);
            $(this).dialog('close');
          }
        }
      });
    });
    $(document).on("click", "#waitbtn", function(){
      $('#rsvWait').dialog({
        dialogClass:"fs_13",
        autoOpen: true,
          bgiframe: true,
          resizable: false,
          width:350,
          modal: true,
          closeOnEscape: false,
          overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
          },
          buttons: {
            はい: function() {
              document.forms[0].CMD.value = "rsvWaitOk";
              document.forms[0].submit();

              $(this).dialog('close');
            },
            キャンセル: function() {
              $(this).dialog('close');
            }
          }
      });
    });

    //DatePiker, TimePiker
    initRsvDateTimePiker('rsv110SelectedDateFr', 'rsv110SelectedDateTo', true);
});

//午前
function setAmTime() {
  var frHour = $(':hidden[name="rsv110AmFrHour"]').val();
  var frMinute = $(':hidden[name="rsv110AmFrMin"]').val();
  var toHour = $(':hidden[name="rsv110AmToHour"]').val();
  var toMinute = $(':hidden[name="rsv110AmToMin"]').val();
  var frTime = String(frHour).padStart(2, '0') + ":" + String(frMinute).padStart(2, '0');
  var toTime = String(toHour).padStart(2, '0') + ":" + String(toMinute).padStart(2, '0');

  $("input[name='rsv110SelectedTimeFr']").val(frTime);
  $("input[name='rsv110SelectedTimeTo']").val(toTime);
}

//午後
function setPmTime() {
  var frHour = $(':hidden[name="rsv110PmFrHour"]').val();
  var frMinute = $(':hidden[name="rsv110PmFrMin"]').val();
  var toHour = $(':hidden[name="rsv110PmToHour"]').val();
  var toMinute = $(':hidden[name="rsv110PmToMin"]').val();
  var frTime = String(frHour).padStart(2, '0') + ":" + String(frMinute).padStart(2, '0');
  var toTime = String(toHour).padStart(2, '0') + ":" + String(toMinute).padStart(2, '0');

  $("input[name='rsv110SelectedTimeFr']").val(frTime);
  $("input[name='rsv110SelectedTimeTo']").val(toTime);
}

//終日
function setAllTime() {
  var frHour = $(':hidden[name="rsv110AllDayFrHour"]').val();
  var frMinute = $(':hidden[name="rsv110AllDayFrMin"]').val();
  var toHour = $(':hidden[name="rsv110AllDayToHour"]').val();
  var toMinute = $(':hidden[name="rsv110AllDayToMin"]').val();
  var frTime = String(frHour).padStart(2, '0') + ":" + String(frMinute).padStart(2, '0');
  var toTime = String(toHour).padStart(2, '0') + ":" + String(toMinute).padStart(2, '0');

  $("input[name='rsv110SelectedTimeFr']").val(frTime);
  $("input[name='rsv110SelectedTimeTo']").val(toTime);
}

function isDateFormat(text) {
  if (text == null) {
    return false;
  }
  let date = new Date(text);
  return !isNaN(date.getTime());
}

function isTimeFormat(text) {
  let time = text.match(/^(\d{1,2}):(\d{1,2})$/);
  if (!time) {
    return false
  }
  let hour = Number(time[1]);
  let minute = Number(time[2]);

  return hour >= 0 && hour < 24 && minute >= 0 && minute < 60;
}

function setFromDay() {

  let frDate = document.forms[0].rsv110SelectedDateFr.value;
  let toDate = document.forms[0].rsv110SelectedDateTo.value;
  let frTime = document.forms[0].rsv110SelectedTimeFr.value;
  let toTime = document.forms[0].rsv110SelectedTimeTo.value;
  let daySameFlg = false;

  if (!isDateFormat(frDate) || !isDateFormat(toDate)) {
    return;
  }

  if (frDate > toDate) {
    document.forms[0].rsv110SelectedDateFr.value = toDate;
  }

  if (!isTimeFormat(frTime) || !isTimeFormat(toTime)) {
    return;
  }
  if (frDate == toDate) {
    daySameFlg = true;
  }

  if (daySameFlg) {
    if (frTime > toTime) {
      document.forms[0].rsv110SelectedTimeFr.value = toTime;
    }
  }
}

function setToDay() {

  let frDate = document.forms[0].rsv110SelectedDateFr.value;
  let toDate = document.forms[0].rsv110SelectedDateTo.value;
  let frTime = document.forms[0].rsv110SelectedTimeFr.value;
  let toTime = document.forms[0].rsv110SelectedTimeTo.value;
  let daySameFlg = false;

  if (!isDateFormat(frDate) || !isDateFormat(toDate)) {
    return;
  }

  if (frDate > toDate) {
    document.forms[0].rsv110SelectedDateTo.value = frDate;
  }

  if (!isTimeFormat(frTime) || !isTimeFormat(toTime)) {
    return;
  }
  if (frDate == toDate) {
    daySameFlg = true;
  }

  if (daySameFlg) {
    if (frTime > toTime) {
      document.forms[0].rsv110SelectedTimeTo.value = frTime;
    }
  }
}

$(function() {
  $(document).on("click", ".js_public", function(){
    var val = $(this).val();
    if (val == 3) {
      $(".js_selectUsrArea").show();
    } else {
      $(".js_selectUsrArea").hide();
    }
  });

  //初期表示
  if ($('input[name="rsv110Public"]:checked').val()) {
    var value = $('input[name="rsv110Public"]:checked').val();
    if (value == 3) {
      $(".js_selectUsrArea").show();
    } else {
      $(".js_selectUsrArea").hide();
    }
  }
});