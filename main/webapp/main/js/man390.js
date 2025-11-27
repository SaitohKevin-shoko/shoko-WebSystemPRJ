function onSelectFromEvent() {
	document.forms[0].CMD.value='pageDate';
    document.forms[0].submit();
    return false;
}

function onSelectToEvent() {
	document.forms[0].CMD.value='pageDate';
    document.forms[0].submit();
    return false;
}

$(function() {

  //グラフの描画
  drawTotalizationGraph();

  /* datepicker */
  var dates = jQuery( '#jquery-ui-datepicker-from, #jquery-ui-datepicker-to' ) . datepicker( {
    showAnim: 'blind',
    changeMonth: true,
    numberOfMonths: 2,
    showCurrentAtPos: 1,
    showButtonPanel: true,
    onSelect: function( selectedDate ) {
      var option = this . id == 'jquery-ui-datepicker-from' ? 'minDate' : 'maxDate',
          instance = jQuery( this ) . data( 'datepicker' ),
          date = jQuery . datepicker . parseDate(
              instance . settings . dateFormat ||
              jQuery . datepicker . _defaults . dateFormat,
              selectedDate, instance . settings );
      dates . not( this ) . datepicker( 'option', option, date );

      /* 日付変更  */
      changeGraphDate($("#jquery-ui-datepicker-from").val(), $("#jquery-ui-datepicker-to").val());
    }
  });

  /*月週日切り替え*/
  $('input[name=man390DateUnit]:checked').attr('onclick','').unbind('click');

  /*


    //メニュー 格納用縦線 click
    $(".toukei_optionClose").live("click", function(){
        if ($("#sel_menu_wrapper").css('display') == "none") {
            $('#sel_menu_wrapper').removeClass('display_none');
            $('#menu_length_area').removeClass("menu_length_border_none");
        } else {
            $('#sel_menu_wrapper').addClass('display_none');
            $('#menu_length_area').addClass("menu_length_border_none");
        }
        drawTotalizationGraph();
    });


     //メニュー格納
     $('#sel_menu_wrapper').addClass('display_none');
     $('#menu_length_area').addClass("menu_length_border_none");*/
});


//日付変更
function changeGraphDate(frdate, todate) {
  var dateUnit = $('input[name=man390DateUnit]:checked').val();
  if (dateUnit == 1) {
    $("input[name=man390DateWeeklyFrStr]").val(frdate);
    $("input[name=man390DateWeeklyToStr]").val(todate);
  } else if (dateUnit == 0) {
    $("input[name=man390DateDailyFrStr]").val(frdate);
    $("input[name=man390DateDailyToStr]").val(todate);
  }
  document.forms[0].CMD.value='pageDate';
  document.forms[0].submit();
  return false;
}

//年月コンボ変更
function changeYearMonthCombo(flg) {

  var frYear = Number(getDateComboValue('man390DateMonthlyFrYear'));
  var frMonth = Number(getDateComboValue('man390DateMonthlyFrMonth'));
  var toYear = Number(getDateComboValue('man390DateMonthlyToYear'));
  var toMonth = Number(getDateComboValue('man390DateMonthlyToMonth'));

  if (frYear > toYear || ((frYear == toYear && frMonth > toMonth))) {
    if (flg == 'from') {
      $('select[name=man390DateMonthlyToYear]').val(getDateComboValue('man390DateMonthlyFrYear'));
      $('select[name=man390DateMonthlyToMonth]').val(getDateComboValue('man390DateMonthlyFrMonth'));
    } else {
      $('select[name=man390DateMonthlyFrYear]').val(getDateComboValue('man390DateMonthlyToYear'));
      $('select[name=man390DateMonthlyFrMonth]').val(getDateComboValue('man390DateMonthlyToMonth'));
    }
  }

  document.forms[0].CMD.value='pageDate';
  document.forms[0].submit();
  return false;
}

function getDateComboValue(paramName) {
  return $("select[name='" + paramName + "']").val();
}

//年月週コンボ変更
function changeWeeklyDateCombo(flg) {

  var frYear = Number(getDateComboValue('man390DateWeeklyFrYear'));
  var frMonth = Number(getDateComboValue('man390DateWeeklyFrMonth'));
  var frWeek = Number(getDateComboValue('man390DateWeeklyFrWeek'));
  var toYear = Number(getDateComboValue('man390DateWeeklyToYear'));
  var toMonth = Number(getDateComboValue('man390DateWeeklyToMonth'));
  var toWeek = Number(getDateComboValue('man390DateWeeklyToWeek'));

  if (frYear > toYear
      || (frYear == toYear && frMonth > toMonth)
      || (frMonth == toMonth && frWeek > toWeek)) {
    if (flg == 'from') {
      $('select[name=man390DateWeeklyToYear]').val(getDateComboValue('man390DateWeeklyFrYear'));
      $('select[name=man390DateWeeklyToMonth]').val(getDateComboValue('man390DateWeeklyFrMonth'));
      $('select[name=man390DateWeeklyToWeek]').val(getDateComboValue('man390DateWeeklyFrWeek'));
    } else {
      $('select[name=man390DateWeeklyFrYear]').val(getDateComboValue('man390DateWeeklyToYear'));
      $('select[name=man390DateWeeklyFrMonth]').val(getDateComboValue('man390DateWeeklyToMonth'));
      $('select[name=man390DateWeeklyFrWeek]').val(getDateComboValue('man390DateWeeklyToWeek'));
    }
  }

  document.forms[0].CMD.value='pageDate';
  document.forms[0].submit();
  return false;
}

//表示件数変更
function changeDspNumCombo() {
  document.forms[0].CMD.value='dspNumChange';
  document.forms[0].submit();
  return false;
}

function changePage(cmbObj) {
  document.forms[0].man390NowPage.value=cmbObj.options[cmbObj.selectedIndex].value;
  document.forms[0].CMD.value='pageChange';
  document.forms[0].submit();
}

/*
//表示項目変更
function changeDspItem(nextItem) {
  var currItem = $('input:hidden[name=man390GraphItem]').val();
  if (currItem != nextItem) {
      $('#' + currItem).removeClass('sel_menu_content_text_sel');
      $('#' + nextItem).addClass('sel_menu_content_text_sel');
      document.forms[0].man390GraphItem.value=nextItem;
      drawTotalizationGraph();
  }
}*/

//集計グラフ
function drawTotalizationGraph() {
  /*
    //グラフリセット
    var tmp = document.getElementById('manCntGraph');
    for (var i=tmp.childNodes.length-1; i>=0; i--) {
        tmp.removeChild(tmp.childNodes[i]);
    }
   */
  var cntData = null;

  var animateFlg = true;

  var sumKadouTime = 0;

  var jsonDateData = $('input:hidden[name=jsonDateData]').val();
  var jsonLogRate = $('input:hidden[name=jsonLoginRate]').val();
  var tick = eval(jsonDateData);
  var logRateObject = eval(jsonLogRate);

  var dayAddFlg = 0;
  var ticksOpsSize = '7pt';
  var ticksOpsAngle = 0;
  if (tick.length > 8) {
    ticksOpsAngle = -30;
  }

  var graphItem = $('input:hidden[name=man390GraphItem]').val();
  var manObject = [logRateObject];
  var graphLabel = [msglist["loginRate"]];
  var graphColor = ['#4bb2c5'];

  var manSeries = [];
  for (var i=0; i<manObject.length; i++) {
    var srsElm = {label:graphLabel[i], yaxis:'yaxis', rendererOptions: {animation: {speed:1000}}};
    manSeries.push(srsElm);
  }

  var ankenPlot = $.jqplot('manCntGraph', manObject, {
    animate: animateFlg,
    animateReplot: animateFlg,
    seriesColors:graphColor,
    legend: {
      show: true,
      location: 'nw',
      renderer: jQuery . jqplot . EnhancedLegendRenderer,
      rendererOptions:{ numberColumns: 3}
    },

    highlighter: {
      show: true,
      showMarker: false,
      sizeAdjust: 0,
      tooltipLocation: 'n',
      tooltipAxes: 'y',
      formatString:'%#.1f'
    },

    series:manSeries,
    axes: {
      xaxis: {
        renderer: $.jqplot.CategoryAxisRenderer,
        ticks: tick,
        label: '',
        tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
        tickOptions: {
          angle:ticksOpsAngle,
          fontSize:ticksOpsSize
        }
      },
      yaxis: {
        label: '',
        min:0,
        tickOptions: {
          formatString:'%#.1f'
        }
      }
    }
  });
}