
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
    var currItem = $('input:hidden[name=bbs180GraphItem]').val();
    $('#' + currItem).addClass('toukei_option-select');

    /*統計情報画面選択メニュー*/
    var adminFlg = $('input:hidden[name=bbs180GsAdminFlg]').val();
    var wmlCtrlFlg = $('input:hidden[name=bbs180CtrlFlgWml]').val();
    var smlCtrlFlg = $('input:hidden[name=bbs180CtrlFlgSml]').val();
    var cirCtrlFlg = $('input:hidden[name=bbs180CtrlFlgCir]').val();
    var filCtrlFlg = $('input:hidden[name=bbs180CtrlFlgFil]').val();
    if (adminFlg == 'false' && wmlCtrlFlg == 'false'
        && smlCtrlFlg == 'false' && cirCtrlFlg == 'false'
          && filCtrlFlg == 'false') {
      $('.menu_select_text').addClass('menu_select_text_no_top');
      $('.menu_select_text').removeClass('menu_select_text');
      $('.toukei_pluginIcon-select').addClass('menu_select_icon_no_top');
      $('.toukei_pluginIcon-select').removeClass('toukei_pluginIcon-select');
    }

    /*月週日切り替え*/
    $('input[name=bbs180DateUnit]:checked').attr('onclick','').unbind('click');

/*
      メニュー格納
     $('#sel_menu_wrapper').addClass('display_none');
     $('#menu_length_area').addClass("menu_length_border_none");*/
});

//年月コンボ変更
function changeYearMonthCombo(flg) {

  var frYear = Number(getDateComboValue('bbs180DateMonthlyFrYear'));
  var frMonth = Number(getDateComboValue('bbs180DateMonthlyFrMonth'));
  var toYear = Number(getDateComboValue('bbs180DateMonthlyToYear'));
  var toMonth = Number(getDateComboValue('bbs180DateMonthlyToMonth'));

  if (frYear > toYear || ((frYear == toYear && frMonth > toMonth))) {
    if (flg == 'from') {
      $('select[name=bbs180DateMonthlyToYear]').val(getDateComboValue('bbs180DateMonthlyFrYear'));
      $('select[name=bbs180DateMonthlyToMonth]').val(getDateComboValue('bbs180DateMonthlyFrMonth'));
    } else {
      $('select[name=bbs180DateMonthlyFrYear]').val(getDateComboValue('bbs180DateMonthlyToYear'));
      $('select[name=bbs180DateMonthlyFrMonth]').val(getDateComboValue('bbs180DateMonthlyToMonth'));
    }
  }

  document.forms[0].CMD.value='pageDate';
  document.forms[0].submit();
  return false;
}

function getDateComboValue(paramName) {
  return $("select[name='" + paramName + "']").val();
}

//表示件数変更
function changeDspNumCombo() {
    document.forms[0].CMD.value='dspNumChange';
    document.forms[0].submit();
    return false;
}

function changePage(cmbObj) {
    document.forms[0].bbs180NowPage.value=cmbObj.options[cmbObj.selectedIndex].value;
    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
}

//表示項目変更
function changeDspItem(nextItem) {
    var currItem = $('input:hidden[name=bbs180GraphItem]').val();
    if (currItem != nextItem) {
        $('#' + currItem).removeClass('toukei_option-select');
        $('#' + nextItem).addClass('toukei_option-select');
        document.forms[0].bbs180GraphItem.value=nextItem;
        drawTotalizationGraph();
    }
}

//集計グラフ
function drawTotalizationGraph() {

    var tmp = document.getElementById('bbsCntGraph');
    for (var i=tmp.childNodes.length-1; i>=0; i--) {
      tmp.removeChild(tmp.childNodes[i]);
    }

    var cntData = null;

    var animateFlg = true;

    var sumKadouTime = 0;

    var jsonDateData = $('input:hidden[name=jsonDateData]').val();
    var jsonVbbsData = $('input:hidden[name=jsonVbbsData]').val();
    var jsonWbbsData = $('input:hidden[name=jsonWbbsData]').val();

    var vbbsObject = eval(jsonVbbsData);
    var wbbsObject = eval(jsonWbbsData);
    var tick = eval(jsonDateData);

    var dayAddFlg = 0;
    var ticksOpsAngle = 0;
    if (tick.length > 8) {
      ticksOpsAngle = -30;
    }
    var ticksOpsSize = '7pt';

    var graphItem = $('input:hidden[name=bbs180GraphItem]').val();
    var bbsObject = null;
    var graphLabel = null;
    var graphColor = null;
    if (graphItem == 'bbs_graph_write') {
      bbsObject = [wbbsObject];
      graphLabel = msglist["numPost"];
      graphColor = ['#eaa228'];
    } else {
      bbsObject = [vbbsObject];
      graphLabel = msglist["numView"];
      graphColor = ['#4bb2c5'];
    }

    var bbsSeries = [];
    for (var i=0; i<bbsObject.length; i++) {
      var srsElm = {label:graphLabel, yaxis:'yaxis', rendererOptions: {animation: {speed:1000}}};
      bbsSeries.push(srsElm);
    }

    var ankenPlot = $.jqplot('bbsCntGraph', bbsObject, {
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
         formatString: '%s'
       },

       series:bbsSeries,
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