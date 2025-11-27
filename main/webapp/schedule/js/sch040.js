var otherData = {};
otherData.holMap = new Object();
otherData.holYearMap = new Object();

var beforeSelectMinute = "";

function addTempFile(tempSaveName, tempName) {
  var detail = "<div>"
    + "<input type=\"hidden\" class='js_tempValue' value=\"" + tempSaveName + "\">"
    + "<a href=\"#\" class='js_tempDownLoad'>"
    + "<span class=\"textLink ml5\">" + tempName + "</span>"
    + "</a>"
    + "<img class=\"ml5 cursor_p js_deleteTemp btn_originalImg-display\" src=\"../common/images/original/icon_delete.png\">"
    + "<img class=\"ml5 cursor_p js_deleteTemp btn_classicImg-display\" src=\"../common/images/classic/icon_delete.png\">"
    + "</div>";
  $(".js_tenpu").append(detail);
}

function buttonPush(cmd, mod) {
  document.forms[0].CMD.value = cmd;
  document.forms[0].cmd.value = mod;
  document.forms[0].submit();
  return false;
}
function changeGroupCombo(cmd) {
  document.forms[0].CMD.value = cmd;
  document.forms[0].submit();
  return false;
}

function moveUser(cmd) {
  document.forms[0].CMD.value = cmd;
  document.forms[0].submit();
  return false;
}
function setDisabled(value) {

  elm = document.getElementsByName("sch040BatchRef");
  if (elm.length >= 2) {
    if (document.forms[0].sch040BatchRef[1].checked == true) {
      $('#addedUsrArea').next().hide();
    } else {
      $('#addedUsrArea').next().show();
    }
  }


  var resBatchRef = document.forms[0].sch040ResBatchRef;
  if (resBatchRef != null) {
    if (resBatchRef[1].checked == true) {

      $('fieldset[name="sch040SameReserveUI"]')
        .hide();
      $('.js_rsvEditBatchRef').removeClass('pos_abs');
    } else {
      $('fieldset[name="sch040SameReserveUI"]')
        .show();
      $('.js_rsvEditBatchRef').addClass('pos_abs');

    }
  }

}

function setFromDay() {
  if (document.forms[0].sch040ScrollFlg.value == '1') {
    window.location.hash = 'add_user';
  }
  var ymdFr = $("input[name='sch040FrDate']").val();
  var ymdTo = $("input[name='sch040ToDate']").val();
  re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
  if (ymdFr == null || ymdTo == null) {
    return false;
  } else if ($("input[name='schIkkatsuFlg']").val() == 1) {
    return false;
  } else if (!ymdFr.match(re) || !ymdTo.match(re)) {
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
    document.forms[0].sch040FrDate.value = getDateStr(toYear, toMonth, toDay);
    document.getElementById("betWeenDays").innerHTML = msglist.period + '1' + msglist.days;
  }

  if (parseInt(frYear) == parseInt(toYear)) {
    if (parseInt(frMonth) > parseInt(toMonth)) {
      frMonth = toMonth;
      frDay = toDay;
      document.forms[0].sch040FrMonth.value = toMonth;
      document.forms[0].sch040FrDate.value = getDateStr(frYear, toMonth, toDay);
      document.getElementById("betWeenDays").innerHTML = msglist.period + '1' + msglist.days;
    }
  }

  if (parseInt(frYear) == parseInt(toYear)) {
    if (parseInt(frMonth) == parseInt(toMonth)) {
      if (parseInt(frDay) > parseInt(toDay)) {
        frDay = toDay;
        document.forms[0].sch040FrDate.value = getDateStr(frYear, frMonth, toDay);
        document.getElementById("betWeenDays").innerHTML = msglist.period + '1' + msglist.days;
      }
    }
  }
}

function setToDay() {
  if (document.forms[0].sch040ScrollFlg.value == '1') {
    window.location.hash = 'add_user';
  }
  var ymdFr = $("input[name='sch040FrDate']").val();
  var ymdTo = $("input[name='sch040ToDate']").val();
  re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
  if (ymdFr == null || ymdTo == null) {
    return false;
  } else if ($("input[name='schIkkatsuFlg']").val() == 1) {
    return false;
  } else if (!ymdFr.match(re) || !ymdTo.match(re)) {
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
    document.forms[0].sch040ToDate.value = getDateStr(frYear, frMonth, frDay);
    document.getElementById("betWeenDays").innerHTML = msglist.period + '1' + msglist.days;
  }

  if (parseInt(frYear) == parseInt(toYear)) {
    if (parseInt(frMonth) > parseInt(toMonth)) {
      toMonth = frMonth;
      toDay = frDay;
      document.forms[0].sch040ToDate.value = getDateStr(toYear, frMonth, frDay);
      document.getElementById("betWeenDays").innerHTML = msglist.period + '1' + msglist.days;
    }
  }

  if (parseInt(frYear) == parseInt(toYear)) {
    if (parseInt(frMonth) == parseInt(toMonth)) {
      if (parseInt(frDay) > parseInt(toDay)) {
        toDay = frDay;
        document.forms[0].sch040ToDate.value = getDateStr(toYear, toMonth, frDay);
        document.getElementById("betWeenDays").innerHTML = msglist.period + '1' + msglist.days;
      }
    }
  }
}

function setBetweenFromToDayCount() {
  var ymdFr = $("input[name='sch040FrDate']").val();
  var ymdTo = $("input[name='sch040ToDate']").val();
  if ($("input[name='schIkkatsuFlg']").val() != 1 && ymdFr != null && ymdTo != null) {
    frDate = new Date(ymdFr);
    toDate = new Date(ymdTo);
    times = parseInt((toDate.getTime() - frDate.getTime()));
    if (parseInt(times) > 0) {
      days = Math.floor(times / (1000 * 60 * 60 * 24));
      document.getElementById("betWeenDays").innerHTML = msglist.period + (days + 1) + msglist.days;
    } else if (parseInt(times) == 0) {
      document.getElementById("betWeenDays").innerHTML = msglist.period + '1' + msglist.days;
    } else {
      document.getElementById("betWeenDays").innerHTML = '';
    }
  }
}

function moveFromDay(elmYear, elmMonth, elmDay, kbn) {

  document.forms[0].sch040ScrollFlg.value = '0';

  systemDate = new Date();

  //「今日」ボタン押下
  if (kbn == 2) {
    var todayStr = getDateStr(convYear(systemDate.getYear()), (systemDate.getMonth() + 1), systemDate.getDate());
    $("input[name='sch040FrDate']").val(todayStr);
    setToDay();
    setBetweenFromToDayCount();
    return;
  }

  //「前日」or 「翌日」ボタン押下
  if (kbn == 1 || kbn == 3) {

    var ymdf = escape($("input[name='sch040FrDate']").val());
    re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (ymdf.match(re)) {

      newDate = new Date($("input[name='sch040FrDate']").val());

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
      $("input[name='sch040FrDate']").val(todayStr);
    } else {

      if (ymdf == '') {
        var todayStr = getDateStr(convYear(systemDate.getYear()), (systemDate.getMonth() + 1), systemDate.getDate());
        $("input[name='sch040FrDate']").val(todayStr);
      }
    }
  }

  setToDay();
  setBetweenFromToDayCount();
}

function moveToDay(elmYear, elmMonth, elmDay, kbn) {

  document.forms[0].sch040ScrollFlg.value = '0';

  systemDate = new Date();

  //「今日」ボタン押下
  if (kbn == 2) {
    var todayStr = getDateStr(convYear(systemDate.getYear()), (systemDate.getMonth() + 1), systemDate.getDate());
    $("input[name='sch040ToDate']").val(todayStr);
    setFromDay();
    setBetweenFromToDayCount();
    return;
  }

  //「前日」or 「翌日」ボタン押下
  if (kbn == 1 || kbn == 3) {

    var ymdf = escape($("input[name='sch040ToDate']").val());
    re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (ymdf.match(re)) {

      newDate = new Date($("input[name='sch040ToDate']").val());
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
      $("input[name='sch040ToDate']").val(todayStr);

    } else {

      if (ymdf == '') {
        var todayStr = getDateStr(convYear(systemDate.getYear()), (systemDate.getMonth() + 1), systemDate.getDate());
        $("input[name='sch040ToDate']").val(todayStr);
      }
    }
  }

  setFromDay();
  setBetweenFromToDayCount();
}

function changeTimeStatus() {

  //時間指定無し
  if (document.forms[0].sch040TimeKbn.checked) {

    //施設予約チェック
    oElements = document.getElementsByName("svReserveUsers");
    if (oElements.length > 0) {
      if (window.confirm(msglist.cantRsv + "\r\n" + msglist.delRsv)) {
        $('input[name="svReserveUsers"]').remove();
        moveUser('040_res_leftarrow');

      } else {
        document.forms[0].sch040TimeKbn.checked = false;
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
  if (document.forms[0].sch040TimeKbn.checked) {
    document.forms[0].sch040FrTime.disabled = true;
    document.forms[0].sch040ToTime.disabled = true;

    //disabledの場合はリクエストされない為、hiddenパラメータを用意する。
    $(document.forms[0]).append($('<input/>', { type: 'hidden', name: 'sch040FrTime', value: $('input[name="sch040FrTime"]').val() }));
    $(document.forms[0]).append($('<input/>', { type: 'hidden', name: 'sch040ToTime', value: $('input[name="sch040ToTime"]').val() }));

    //時間マスタ
    $('.js_time_master').addClass('time_maste_none');

    //施設予約を無効
    setReserveInactive();
  } else {
    $('input[name="sch040FrTime"][type="hidden"]').remove();
    $('input[name="sch040ToTime"][type="hidden"]').remove();

    document.forms[0].sch040FrTime.disabled = false;
    document.forms[0].sch040ToTime.disabled = false;

    //時間マスタ
    $('.js_time_master').removeClass('time_maste_none');

    //施設予約を有効
    setReserveActive();
  }
}

function setReserveActive() {
  if (document.forms[0].schIkkatsuFlg.value != 1) {
    var cmd = document.forms[0].cmd.value;
    if (document.forms[0].reservePluginKbn.value == 0) {
      if (cmd != 'add') {
        document.forms[0].sch040ResBatchRef[0].disabled = false;
        document.forms[0].sch040ResBatchRef[1].disabled = false;
      }
      //施設予約を有効
      if (document.forms[0].sch040ReserveGroupSid) {
        document.forms[0].sch040ReserveGroupSid.disabled = false;
      }
      $('fieldset[name="sch040SameReserveUI"]').prop('disabled', false);
    }
  }
}

function setReserveInactive() {
  var cmd = document.forms[0].cmd.value;
  var timeKbn = document.forms[0].sch040TimeKbn.value;

  if (document.forms[0].reservePluginKbn.value == 0) {
    if (cmd != 'add') {
      $('#sch040ResBatchRef0').attr("checked", false);
      $('#sch040ResBatchRef1').attr("checked", true);
      document.forms[0].sch040ResBatchRef[0].disabled = true;
      document.forms[0].sch040ResBatchRef[1].disabled = true;
    }

    //施設予約を無効
    if (document.forms[0].sch040ReserveGroupSid) {
      document.forms[0].sch040ReserveGroupSid.disabled = true;
    }
    $('fieldset[name="sch040SameReserveUI"]').prop('disabled', true);
  }
}


function deleteCompany(companyId, companyBaseId) {
  document.forms['sch040Form'].CMD.value = 'deleteCompany';
  document.forms['sch040Form'].sch040delCompanyId.value = companyId;
  document.forms['sch040Form'].sch040delCompanyBaseId.value = companyBaseId;
  document.forms['sch040Form'].submit();
  return false;
}

function changeEditDsp(attendKbn) {
  if (attendKbn == 1) {
    $('#editRadioArea').hide();
    $('#editOnlyArea').show();
    $('#addedUsrArea').hide();
  } else {
    $('#editRadioArea').show();
    $('#editOnlyArea').hide();
    $('#addedUsrArea').show();
  }
}

function changeEnablePublic() {
  if ($("input[name='sch040Public']:checked").val() == 4
    || $("#sch040AnsPublic").val() == 4) {
    $('.js_displayTarget').show();
  } else {
    $('.js_displayTarget').hide();
  }
}

$(function () {
  //初期表示
  changeEditDsp($("input:radio[name=sch040AttendKbn]:checked").val());

  //出欠確認 変更時
  $("input:radio[name=sch040AttendKbn]").on('change', function () {
    changeEditDsp($(this).val());
  });


  var timeU = $('input[name="hourDivision"]').val();
  /** 分ラベル*/
  var choices = ["00", "10", "20", "30", "40", "50"];
  if (timeU == 5) {
    choices = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
  } else if (timeU == 15) {
    choices = ["00", "15", "30", "45"];
  }

  //clockpickerはコールバックで対象要素が手に入らないので
  //ブロック変数を使用して対象要素の参照がコールバックに渡るように
  $.each($('.js_clockpicker'), function () {
    var targetInput = $(this);
    targetInput.clockpicker({
      placement: 'bottom',
      align: 'left',
      autoclose: true,
      beforeShow: function () {
        //選択不可の値を選択して再描画された時、選択前の値で更新する。
        if (beforeSelectMinute != "" && $.inArray(targetInput.val().split(":")[1], choices) == -1) {
          targetInput.val(targetInput.data('clockpicker').spanHours.text() + ":" + beforeSelectMinute);
        }
        beforeSelectMinute = targetInput.val().split(":")[1];
        $('.js_clpClear_area').remove();
      },
      afterShow: function () {
        var clock = $('.clockpicker-popover');
        var clock_id = targetInput.attr('id');
        clock.append("<div class='clpClear_area js_clpClear_area'><button type='button' class='js_clockpickerClear clpClear_button' onClick=\"clpClear(\'" + clock_id + "\')\">クリア</button></div>");
        $('.clockpicker-span-minutes').text(targetInput.val().split(":")[1]);
        if (targetInput.val().split(":")[0].length == 0) {
          $('.clockpicker-span-hours').text("00");
        } else {
          $('.clockpicker-span-hours').text(targetInput.val().split(":")[0]);
        }
        $(".clockpicker-minutes").find(".clockpicker-tick").filter(function (index, element) {
          return !($.inArray($(element).text(), choices) != -1)
        }).remove();
      },
      afterHourSelect: function () {
        targetInput.val(targetInput.data('clockpicker').spanHours.text() + ":" + targetInput.data('clockpicker').spanMinutes.text());
      },
      afterDone: function () {
        //分選択後のコールバック
        //ただしautocloseで閉じた場合は呼ばれない
        var selectedMinutes = targetInput.val().split(":")[1];
        //分選択後にラベル外の分が選択された場合
        if ($.inArray(selectedMinutes, choices) == -1) {
          //再描画によって時間の設定し直しを強制
          targetInput.clockpicker('show').clockpicker('toggleView', 'minutes');
        }
      },
      afterHide: function () {
        var ymdFr = $("input[name='sch040FrDate']").val();
        var ymdTo = $("input[name='sch040ToDate']").val();
        var times = 1;
        if (ymdFr != null && ymdTo != null) {
          frDate = new Date(ymdFr);
          toDate = new Date(ymdTo);
          var times = parseInt((toDate.getTime() - frDate.getTime()));
        }
        if (times <= 0 && $.inArray(targetInput.data('clockpicker').spanMinutes.text(), choices) != -1) {
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

  $.datepicker._gotoToday = function (id) {
    var target = $(id);
    var inst = this._getInst(target[0]);
    systemDate = new Date();
    if (inst.id == "easyToDate") {
      var todayStr = getDateStr(convYear(systemDate.getYear()), (systemDate.getMonth() + 1), systemDate.getDate());
      $("input[name='sch040ToDate']").val(todayStr);
      setFromDay();
      setBetweenFromToDayCount();
    } else {
      var todayStr = getDateStr(convYear(systemDate.getYear()), (systemDate.getMonth() + 1), systemDate.getDate());
      $("input[name='sch040FrDate']").val(todayStr);
      setToDay();
      setBetweenFromToDayCount();
    }
    this._hideDatepicker();
  }

  var old_fn = $.datepicker._updateDatepicker;
  $.datepicker._updateDatepicker = function (inst) {

    old_fn.call(this, inst);
    var buttonPane = $(this).datepicker("widget").find(".ui-datepicker-buttonpane");
    var buttonHtml = "<button type='button' class='ui-datepicker-clean ui-state-default ui-priority-primary ui-corner-all'>クリア</button>";

    $(buttonHtml).appendTo(buttonPane).click(
      function (e) {
        $.datepicker._clearDate(inst.input);
      });

    let pickerYear = $('.ui-datepicker-year').val();
    if (otherData.holYearMap && otherData.holYearMap[pickerYear]) {
      setHolDateColorForPicker();
    } else {
      var formUrl = '../common/cmn200.do';
      formUrl += '?cmn200dateStr=' + pickerYear
        + '/' + zeroFill($('.ui-datepicker-month').val())
        + '/01';
      formUrl += '&cmn200dateRange=' + 2;
      $.ajax({
        url: formUrl,
        type: "POST",
        processData: false,
        contentType: false,
        success: function (data) {
          try {
            var ret = JSON.parse(data);
            if (ret != null && ret.kyuujitu != null) {
              var jsonArray = ret.kyuujitu;
              let holYear = '';
              for (n = 0; n < jsonArray.length; n++) {
                //休日を格納したMAPを作成
                otherData.holMap[jsonArray[n].date] = jsonArray[n].holidayName;
                holYear = jsonArray[n].date.substr(0, 4);
                if (otherData.holYearMap[holYear] == null) {
                  otherData.holYearMap[holYear] = holYear;
                }
              }
            }
            setHolDateColorForPicker();

          } catch (ae) {
            console.log(ae);
          }
        },
        error: function () {
          console.log('エラー発生');
        },
        complate: function () {
        }
      });
    }

  }

  $(".js_editBtn").on("click", function () {
    var dspMode = $('input:hidden[name=sch040EditDspMode]').val();
    var attendKbn = $("input:radio[name=sch040AttendKbn]:checked").val()
    if (dspMode == 1 && attendKbn == 1) {
      $('#schEditMail').dialog({
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        width: 400,
        height: 200,
        modal: true,
        closeOnEscape: false,
        overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
        },
        buttons: {
          OK: function () {
            document.forms[0].CMD.value = "040_ok";

            if ($('#sch040EditMailSendKbn').attr("checked")) {
              document.forms[0].sch040EditMailSendKbn.value = 1;
            }
            document.forms[0].submit();
            $(this).dialog('close');
          },
          キャンセル: function () {
            //キャンセル時チェックボックスを外す
            $('#sch040EditMailSendKbn').attr("checked", false);
            $(this).dialog('close');
          }
        }
      });
    } else {
      document.forms[0].CMD.value = "040_ok";
      document.forms[0].submit();
    }
  });

  $("#all_disp").on("click", function () {
    var winWidth = 800;
    var winHeight = 600;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);
    var schSid = $('input:hidden[name=sch010SchSid]').val();

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../schedule/sch220.do?schSid=' + schSid;

    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
      subWindow = window.open(url, 'thissite', newWinOpt);
      flagSubWindow = true;

    } else {
      subWindow.location.href = url;
      subWindow.focus();
      return;
    }
  });
  $('textarea').each(function () {
    setTextareaAutoResize($(this).get(0));
    $(window).scrollTop(0);
  });
  // 出欠確認登録者確認ラジオ
  $("#sch040AttendKbn1").on("click", function () {
    if ($('input:hidden[name="sch040DspAttendCommentFlg"]').val() == 1) {
      $(".js_attend_comment_edit").addClass("display_inline");
      $(".js_attend_comment_edit").removeClass("display_none");
      $(".js_attend_comment").addClass("display_none");
      $(".js_attend_comment").removeClass("display_inline_block");
    } else {
      $(".js_attend_comment_edit").addClass("display_none");
      $(".js_attend_comment_edit").removeClass("display_inline");
      $(".js_attend_comment").addClass("display_inline_block");
      $(".js_attend_comment").removeClass("display_none");
    }
  });

  // 出欠確認登録者確認ラジオ
  $("#sch040AttendKbn0").on("click", function () {
    $(".js_attend_comment_edit").addClass("display_none");
    $(".js_attend_comment_edit").removeClass("display_inline");
    $(".js_attend_comment").addClass("display_none");
    $(".js_attend_comment").removeClass("display_inline_block");
  });
  // 編集ボタン押下
  $("#btn_dsp_attend_comment").on("click", function () {
    $(".js_attend_comment_edit").addClass("display_inline");
    $(".js_attend_comment_edit").removeClass("display_none");
    $(".js_attend_comment").addClass("display_none");
    $(".js_attend_comment").removeClass("display_inline_block");
    $('input:hidden[name="sch040DspAttendCommentFlg"]').val(1);
  });
  // 確定ボタン押下
  $("#btn_kakutei_attend_comment").on("click", function () {
    document.forms[0].CMD.value = "edit_comment";
    document.forms[0].submit();
  });
  // キャンセルボタン押下
  $("#btn_cancel_attend_comment").on("click", function () {
    $(".js_attend_comment_edit").addClass("display_none");
    $(".js_attend_comment_edit").removeClass("display_inline");
    $(".js_attend_comment").addClass("display_inline_block");
    $(".js_attend_comment").removeClass("display_none");
    $('input:hidden[name="sch040DspAttendCommentFlg"]').val(0);
    // 編集したコメントを元に戻す
    var cmd = 'getAttendComment';
    var sid = $('input:hidden[name="sch010SchSid"]').val();
    paramStr = 'CMD=' + cmd;
    paramStr = paramStr + '&sch010SchSid=' + sid;
    $.ajax({
      async: true,
      url: "../schedule/sch040.do",
      type: "post",
      data: paramStr
    }).done(function (data) {
      if (data["success"]) {
        $("input[name=sch040AttendAnsComment]").val(data["comment"]);
        $("#sch040AttendAnsComment").text(data["comment"])
      } else {
        alert(msglist_sch040["schedule.js.sch040.5"]);
      }
    }).fail(function (data) {
      alert(msglist_sch040["schedule.js.sch040.5"]);
    });
  });
  // 初期表示出欠確認テキストボックス要素表示確認
  if ($("#sch040AttendKbn1").is(':checked')) {
    if ($('input:hidden[name="sch040DspAttendCommentFlg"]').val() == 1) {
      $(".js_attend_comment_edit").addClass("display_inline");
      $(".js_attend_comment_edit").removeClass("display_none");
      $(".js_attend_comment").addClass("display_none");
      $(".js_attend_comment").removeClass("display_inline_block");
    } else {
      $(".js_attend_comment_edit").addClass("display_none");
      $(".js_attend_comment_edit").removeClass("display_inline");
      $(".js_attend_comment").addClass("display_inline_block");
      $(".js_attend_comment").removeClass("display_none");
    }
  } else if ($("#sch040AttendKbn0").is(':checked')) {
    $(".js_attend_comment_edit").addClass("display_none");
    $(".js_attend_comment_edit").removeClass("display_inline");
    $(".js_attend_comment").addClass("display_none");
    $(".js_attend_comment").removeClass("display_inline_block");
  }
  // 再描画時出欠確認テキストボックス要素表示確認
  if ($('input:hidden[name="sch040DspAttendCommentFlg"]').val() == 1) {
    $(".js_attend_comment_edit").addClass("display_inline");
    $(".js_attend_comment_edit").removeClass("display_none");
    $(".js_attend_comment").addClass("display_none");
    $(".js_attend_comment").removeClass("display_inline_block");
  }

  $("input[name='sch040Public']").on("change", function () {
    changeEnablePublic();
  });

  /** ファイルのダウンロード */
  $(document).on("click", ".js_tempDownLoad", function () {
    var param = {};
    param["CMD"] = "040_fileDownload";
    param["sch040BinSid"] = $(this).siblings(".js_tempValue").val();
    param["sch010SchSid"] = $("input[name='sch010SchSid']").val();
    param["sch040EditDspMode"] = $("input[name='sch040EditDspMode']").val();
    var paramStr = $.param(param, true);
    var paramStrStart = "../schedule/sch040.do?";
    paramStr = paramStrStart + paramStr;
    location.href = paramStr;
  });

  /** テンポラリディレクトリにあるファイルの削除 */
  $(document).on("click", ".js_deleteTemp", function () {
    document.forms[0].CMD.value = '040_fileDelete';
    document.forms[0].sch040BinSid.value = $(this).siblings(".js_tempValue").val();
    document.forms[0].submit();
  });

  //開始日付用DatePicker設定
  $('#easyFrDate').datepicker({
    changeYear: true,
    showAnim: 'blind',
    changeMonth: true,
    numberOfMonths: 1,
    showCurrentAtPos: 0,
    showButtonPanel: true,
    dateFormat: 'yy/mm/dd',
    yearRange: "-5:+5",
    onSelect: function () {
      setToDay();
      setBetweenFromToDayCount();
    }
  });

  //終了日付用DatePicker設定
  $('#easyToDate').datepicker({
    changeYear: true,
    showAnim: 'blind',
    changeMonth: true,
    numberOfMonths: 1,
    showCurrentAtPos: 0,
    showButtonPanel: true,
    dateFormat: 'yy/mm/dd',
    yearRange: "-5:+5",
    onSelect: function () {
      setFromDay();
      setBetweenFromToDayCount();
    }
  });

  /* 開始 カレンダーアイコンクリック */
  $('#iconKikanStart').on('click', function (e) {
    $("#easyFrDate").focus();
  });

  /* 終了 カレンダーアイコンクリック */
  $('#iconKikanFinish').on('click', function (e) {
    $("#easyToDate").focus();
  });
})

function clpClear(target) {
  $('#' + target + '').val('');
  $('#' + target + '').clockpicker('hide');
}

function calDateClickFnctionFr() {
  setToDay();
}

function calDateClickFnctionTo() {
  setFromDay();
}

function getCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}


function getDateStr(year, month, day) {
  var yearStr = year.toString().padStart(4, "0");
  var monthStr = month.toString().padStart(2, "0");
  var dayStr = day.toString().padStart(2, "0");
  return yearStr + "/" + monthStr + "/" + dayStr;
}

//午前
function setAmTime() {
  var frHour = $(':hidden[name="sch040AmFrHour"]').val();
  var frMin = $(':hidden[name="sch040AmFrMin"]').val();
  var frTime = String(frHour).padStart(2, '0') + ":" + String(frMin).padStart(2, '0')
  document.forms[0].sch040FrTime.value = frTime;


  var toHour = $(':hidden[name="sch040AmToHour"]').val();
  var toMin = $(':hidden[name="sch040AmToMin"]').val();
  var toTime = String(toHour).padStart(2, '0') + ":" + String(toMin).padStart(2, '0')
  document.forms[0].sch040ToTime.value = toTime;
}

//午後
function setPmTime() {
  var frHour = $(':hidden[name="sch040PmFrHour"]').val();
  var frMin = $(':hidden[name="sch040PmFrMin"]').val();
  var frTime = String(frHour).padStart(2, '0') + ":" + String(frMin).padStart(2, '0')
  document.forms[0].sch040FrTime.value = frTime;


  var toHour = $(':hidden[name="sch040PmToHour"]').val();
  var toMin = $(':hidden[name="sch040PmToMin"]').val();
  var toTime = String(toHour).padStart(2, '0') + ":" + String(toMin).padStart(2, '0')
  document.forms[0].sch040ToTime.value = toTime;
}

//終日
function setAllTime() {
  var frHour = $(':hidden[name="sch040AllDayFrHour"]').val();
  var frMin = $(':hidden[name="sch040AllDayFrMin"]').val();
  var frTime = String(frHour).padStart(2, '0') + ":" + String(frMin).padStart(2, '0')
  document.forms[0].sch040FrTime.value = frTime;


  var toHour = $(':hidden[name="sch040AllDayToHour"]').val();
  var toMin = $(':hidden[name="sch040AllDayToMin"]').val();
  var toTime = String(toHour).padStart(2, '0') + ":" + String(toMin).padStart(2, '0')
  document.forms[0].sch040ToTime.value = toTime;
}

function setHolDateColorForPicker() {

  let ymStr = $('.ui-datepicker-year').val();
  ymStr = ymStr + zeroFill(String(Number($('.ui-datepicker-month').val()) + 1));

  $(".ui-datepicker-calendar .ui-state-default").each(function (i) {
    if (otherData.holMap[ymStr + String(zeroFill($(this).text()))] != null) {
      $(this).parent().addClass('cl_fontSunday');
    }

  });
}

function zeroFill(str) {
  if (str && str.length < 2) {
    str = "0" + str;
  }
  return str;
}

function openScheduleReserveWindowSch040(resGroupSid, dspDate) {
  var groupSid = "";
  if ($('input[name="sch010SelectUsrKbn"]').val() == 1) {
    groupSid = $('input[name="sch040GroupSid"]').val();
  } else {
    groupSid = $('fieldset[name="sch040SameUserUI"]').find(".js_multiselector_groupSelection").find(".bgC_tableCell").find('input[name="sch040GroupSid"]').val();
  }
  openScheduleReserveWindow(groupSid, resGroupSid, dspDate)
}
