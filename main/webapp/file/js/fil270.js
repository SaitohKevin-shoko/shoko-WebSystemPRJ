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

    /* メニュー  hover*/
    $('.js_toukei_optionText').hover(
        function () {
            $(this).addClass("toukei_optionText-hover");
        },
        function () {
            $(this).removeClass("toukei_optionText-hover");
        }
    );



    /* メニュー 格納用縦線 click*/
    $(".toukei_optionClose").on("click", function(){
        if ($("#sel_menu_wrapper").css('display') == "none") {
            $('#sel_menu_wrapper').removeClass('display_none');
            $('#menu_length_area').removeClass("menu_length_border_none");
        } else {
            $('#sel_menu_wrapper').addClass('display_none');
            $('#menu_length_area').addClass("menu_length_border_none");
        }
        drawTotalizationGraph();
    });

    /* 選択中グラフ名の強調 */
    var currItem = $('input:hidden[name=fil270GraphItem]').val();
    $('#' + currItem).addClass('toukei_option-select');

    /*統計情報画面選択メニュー*/
    var adminFlg = $('input:hidden[name=fil270GsAdminFlg]').val();
    var wmlCtrlFlg = $('input:hidden[name=fil270CtrlFlgWml]').val();
    var smlCtrlFlg = $('input:hidden[name=fil270CtrlFlgSml]').val();
    var cirCtrlFlg = $('input:hidden[name=fil270CtrlFlgCir]').val();
    if (adminFlg == 'false' && wmlCtrlFlg == 'false'
        && smlCtrlFlg == 'false' && cirCtrlFlg == 'false') {
      $('.menu_select_text').addClass('menu_select_text_no_top');
      $('.menu_select_text').removeClass('menu_select_text');
      $('.toukei_pluginIcon-select').addClass('menu_select_icon_no_top');
      $('.toukei_pluginIcon-select').removeClass('toukei_pluginIcon-select');
    }

    /*月週日切り替え*/
    $('input[name=fil270DateUnit]:checked').attr('onclick','').unbind('click');

    /*
      メニュー格納
     $('#sel_menu_wrapper').addClass('display_none');
     $('#menu_length_area').addClass("menu_length_border_none");*/
});


//日付変更
function changeGraphDate(frdate, todate) {
  var dateUnit = $('input[name=fil270DateUnit]:checked').val();
  if (dateUnit == 1) {
    $("input[name=fil270DateWeeklyFrStr]").val(frdate);
    $("input[name=fil270DateWeeklyToStr]").val(todate);
  } else if (dateUnit == 0) {
    $("input[name=fil270DateDailyFrStr]").val(frdate);
    $("input[name=fil270DateDailyToStr]").val(todate);
  }
    document.forms[0].CMD.value='pageDate';
    document.forms[0].submit();
    return false;
}

//年月コンボ変更
function changeYearMonthCombo(flg) {

  var frYear = Number(getDateComboValue('fil270DateMonthlyFrYear'));
  var frMonth = Number(getDateComboValue('fil270DateMonthlyFrMonth'));
  var toYear = Number(getDateComboValue('fil270DateMonthlyToYear'));
  var toMonth = Number(getDateComboValue('fil270DateMonthlyToMonth'));

  if (frYear > toYear || ((frYear == toYear && frMonth > toMonth))) {
    if (flg == 'from') {
      $('select[name=fil270DateMonthlyToYear]').val(getDateComboValue('fil270DateMonthlyFrYear'));
      $('select[name=fil270DateMonthlyToMonth]').val(getDateComboValue('fil270DateMonthlyFrMonth'));
    } else {
      $('select[name=fil270DateMonthlyFrYear]').val(getDateComboValue('fil270DateMonthlyToYear'));
      $('select[name=fil270DateMonthlyFrMonth]').val(getDateComboValue('fil270DateMonthlyToMonth'));
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

  var frYear = Number(getDateComboValue('fil270DateWeeklyFrYear'));
  var frMonth = Number(getDateComboValue('fil270DateWeeklyFrMonth'));
  var frWeek = Number(getDateComboValue('fil270DateWeeklyFrWeek'));
  var toYear = Number(getDateComboValue('fil270DateWeeklyToYear'));
  var toMonth = Number(getDateComboValue('fil270DateWeeklyToMonth'));
  var toWeek = Number(getDateComboValue('fil270DateWeeklyToWeek'));

  if (frYear > toYear
      || (frYear == toYear && frMonth > toMonth)
      || (frMonth == toMonth && frWeek > toWeek)) {
    if (flg == 'from') {
      $('select[name=fil270DateWeeklyToYear]').val(getDateComboValue('fil270DateWeeklyFrYear'));
      $('select[name=fil270DateWeeklyToMonth]').val(getDateComboValue('fil270DateWeeklyFrMonth'));
      $('select[name=fil270DateWeeklyToWeek]').val(getDateComboValue('fil270DateWeeklyFrWeek'));
    } else {
      $('select[name=fil270DateWeeklyFrYear]').val(getDateComboValue('fil270DateWeeklyToYear'));
      $('select[name=fil270DateWeeklyFrMonth]').val(getDateComboValue('fil270DateWeeklyToMonth'));
      $('select[name=fil270DateWeeklyFrWeek]').val(getDateComboValue('fil270DateWeeklyToWeek'));
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
    document.forms[0].fil270NowPage.value=cmbObj.options[cmbObj.selectedIndex].value;
    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
}

//表示項目変更
function changeDspItem(nextItem) {
  var currItem = $('input:hidden[name=fil270GraphItem]').val();
  if (currItem != nextItem) {
    $('#' + currItem).removeClass('toukei_option-select');
    $('#' + nextItem).addClass('toukei_option-select');
    document.forms[0].fil270GraphItem.value=nextItem;
    drawTotalizationGraph();
  }
}

//集計グラフ
function drawTotalizationGraph() {

  var tmp = document.getElementById('filCntGraph');
  for (var i=tmp.childNodes.length-1; i>=0; i--) {
    tmp.removeChild(tmp.childNodes[i]);
  }

    var cntData = null;

    var animateFlg = true;

    var sumKadouTime = 0;

    var jsonDateData = $('input:hidden[name=jsonDateData]').val();
    var jsonDownloadData = $('input:hidden[name=jsonDownloadData]').val();
    var jsonUploadData = $('input:hidden[name=jsonUploadData]').val();

    var dlfilObject = eval(jsonDownloadData);
    var ulfilObject = eval(jsonUploadData);
    var tick = eval(jsonDateData);

    var dayAddFlg = 0;
    var ticksOpsAngle = 0;
    if (tick.length > 8) {
      ticksOpsAngle = -30;
    }
    var ticksOpsSize = '7pt';

    var graphItem = $('input:hidden[name=fil270GraphItem]').val();
    var wmlObject = null;
    var graphLabel = null;
    var graphColor = null;
    if (graphItem == 'fil_graph_upload') {
      filObject = [ulfilObject];
      graphLabel = msglist["numRegistration"];
      graphColor = ['#eaa228'];
    } else {
      filObject = [dlfilObject];
      graphLabel = msglist["numDownload"];
      graphColor = ['#4bb2c5'];
    }

    var filSeries = [];
    for (var i=0; i<filObject.length; i++) {
      var srsElm = {label:graphLabel, yaxis:'yaxis', rendererOptions: {animation: {speed:1000}}};
      filSeries.push(srsElm);
    }

    var ankenPlot = $.jqplot('filCntGraph', filObject, {
       animate: animateFlg,
       animateReplot: animateFlg,
       seriesColors: graphColor,
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
         formatString: '%s'
       },

       series:filSeries,
       axes: {
         xaxis: {
           renderer: $.jqplot.CategoryAxisRenderer,
           ticks: tick,
           label: '',
           tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
           tickOptions: {angle:ticksOpsAngle,fontSize:ticksOpsSize}
         },
         yaxis: {
           label: '',
           min:0
         }
       }
    });
}