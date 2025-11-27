var otherData = {};
otherData.holMap = new Object();
otherData.holYearMap = new Object();

function onSelectFromEvent() {
    //Datepickerのonselect実行時に動作させるメソッド(上書き用)
}
function onSelectToEvent() {
    //Datepickerのonselect実行時に動作させるメソッド(上書き用)
}

function setYmdParam(elmDate, elmYear, elmMonth, elmDay) {

    if (elmDate.val() == null) {
        return false;
    }
    var ymdf = escape($(elmDate).val());
    re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (ymdf.match(re)) {
        var date = new Date($(elmDate).val());
        $(elmYear).val(date.getFullYear());
        $(elmMonth).val(("0" + (date.getMonth() + 1)).slice(-2));
        $(elmDay).val(("0" + date.getDate()).slice(-2));
    }
}

/**
  mode = 0：開始側datepicker
  mode = 1：終了側datepicker
 */
function startDatePicker(target, mode) {
    var yearRange = "";
    var rangeMin;
    var rangeMax;
    if (mode == 0) {
        rangeMin = $('input[name="yearRangeMinFr"]').val();
        rangeMax = $('input[name="yearRangeMaxFr"]').val();
    } else {
        rangeMin = $('input[name="yearRangeMinTo"]').val();
        rangeMax = $('input[name="yearRangeMaxTo"]').val();
    }
      
    if (rangeMin == null) {
        yearRange = "-10:";
    } else {
        if (rangeMin > 0) {
            yearRange = "-" + rangeMin + ":";
        } else  {
            yearRange = "+" + (-rangeMin) + ":";
        }
    }
      
    if (rangeMax == null) {
        yearRange += "+10";
    } else {
        if (rangeMax >= 0) {
            yearRange += "+" + rangeMax;
        } else {
            yearRange += rangeMax;
        }
    }
    
    var targetInput = $(target);
    targetInput.datepicker({
        changeYear: true,
        showAnim: 'blind',
        changeMonth: true,
        numberOfMonths: 1,
        showCurrentAtPos: 0,
        showButtonPanel: true,
        dateFormat:'yy/mm/dd',
        yearRange: yearRange,
        onSelect: function() {
           onSelectFromEvent();
        }
    });
}

$(function(){
  /* 開始 カレンダーアイコンクリック */
  $(document).on('click', '.iconKikanStart', function(e) {
    $(this).prev().focus();
  });

  /* 終了 カレンダーアイコンクリック */
  $(document).on('click', '.iconKikanFinish', function(e) {
    $(this).prev().focus();
  });
  
  $('.js_frDatePicker').on('input', function() {
    if ($(this).val().length == 10
        && ($(this).val().match( /\//g ) || []).length == 2
        && $(this).val().split("/")[0].length == 4
        && $(this).val().split("/")[1].length == 2
        && $(this).val().split("/")[2].length == 2
        && $(this).val().split("/")[0].match(/^[0-9]+$/)
        && $(this).val().split("/")[1].match(/^[0-9]+$/)
        && $(this).val().split("/")[2].match(/^[0-9]+$/)) {
    }
  });

  $.each($('.js_frDatePicker'), function() {
      startDatePicker($(this), 0);
  });
  
  $('.js_toDatePicker').on('input', function() {
    if ($(this).val().length == 10
        && ($(this).val().match( /\//g ) || []).length == 2
        && $(this).val().split("/")[0].length == 4
        && $(this).val().split("/")[1].length == 2
        && $(this).val().split("/")[2].length == 2
        && $(this).val().split("/")[0].match(/^[0-9]+$/)
        && $(this).val().split("/")[1].match(/^[0-9]+$/)
        && $(this).val().split("/")[2].match(/^[0-9]+$/)) {
    }
  });
  $.each($('.js_toDatePicker'), function() {
      startDatePicker($(this), 1);
  });
  
  $.datepicker._gotoToday = function(id) {
    var target = $(id);
    var inst = this._getInst(target[0]);
    var date = new Date();
    this._setDate(inst,date);
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
        success: function(data) {
          try {
            var ret = JSON.parse(data);
            if (ret != null && ret.kyuujitu != null) {
              var jsonArray = ret.kyuujitu;
              let holYear = '';
              for (n=0; n < jsonArray.length; n++) {
                //休日を格納したMAPを作成
                otherData.holMap[jsonArray[n].date] = jsonArray[n].holidayName;
                holYear = jsonArray[n].date.substr(0, 4);

                if (!otherData.holYearMap[holYear] || otherData.holYearMap[holYear] == null) {
                  otherData.holYearMap[holYear] = holYear;
                }
              }
            }
            setHolDateColorForPicker();

          } catch (ae) {
          }
        },
        error: function() {
        },
        complate: function() {
        }
      });
    }

  }
});


function setHolDateColorForPicker() {

  let ymStr = $('.ui-datepicker-year').val();
  ymStr = ymStr +  zeroFill(String(Number($('.ui-datepicker-month').val()) + 1));

  $(".ui-datepicker-calendar .ui-state-default").each(function(i) {
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
