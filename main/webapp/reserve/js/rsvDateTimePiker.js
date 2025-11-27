
function initRsvDateTimePiker(frDateName, toDateName, checkWithDate) {

  //----- DatePiker -----
  //DatePiker TodayButton
  $.datepicker._gotoToday = function(id) {
    var target = $(id);
    var inst = this._getInst(target[0]);
    systemDate = new Date();
    if (inst.id == "selDateto") {
      var todayStr = getDateStrRsv(convYear(systemDate.getYear()),(systemDate.getMonth() + 1), systemDate.getDate());
      $("input[name='" + toDateName + "']").val(todayStr);
      setFromDay();
    } else {
      var todayStr = getDateStrRsv(convYear(systemDate.getYear()),(systemDate.getMonth() + 1), systemDate.getDate());
      $("input[name='" + frDateName + "']").val(todayStr);
      setToDay();
    }
    this._hideDatepicker();
  }

  //開始日付用DatePicker設定
  $('#selDatefr').datepicker({
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

  //終了日付用DatePicker設定
  $('#selDateto').datepicker({
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
  //----- DatePiker -----

  //----- TimePiker -----
  var timeU = $('input[name="hourDivision"]').val();

  ///分ラベル
  var choices = ["00","10","20","30","40","50"];
  if (timeU == 5) {
    choices = ["00","05","10","15","20","25","30","35","40","45","50","55"];
  } else if (timeU == 15) {
    choices = ["00","15","30","45"];
  }

  $.each($('.js_clockpicker_rsv'), function() {
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
        var times = 0;
        if (checkWithDate) {
          //開始日付 < 終了日付の場合、時刻の再設定を行わない
          times = 1;
          var ymdFr = $("input[name='" + frDateName + "']").val();
          var ymdTo = $("input[name='" + toDateName + "']").val();
          if (ymdFr != null && ymdTo != null) {
            frDate = new Date(ymdFr);
            toDate = new Date(ymdTo);
            var times = parseInt((toDate.getTime() - frDate.getTime()));
          }
        }
        if (times <= 0 && $.inArray(targetInput.data('clockpicker').spanMinutes.text(), choices) != -1){
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
  //----- TimePiker -----

}

function getDateStrRsv (year, month, day) {
  var yearStr = year.toString().padStart(4, "0");
  var monthStr = month.toString().padStart(2, "0");
  var dayStr = day.toString().padStart(2, "0");
  return yearStr + "/" + monthStr + "/" + dayStr;
}
