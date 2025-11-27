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
    changeDsp();
    //グラフの描画
    drawTotalizationGraph();

    /* メニュー 格納用縦線 hover*/
    $('.toukei_optionClose').hover(
            function () {
                $(this).addClass("toukei_optionOpen");
              },
              function () {
                  $(this).removeClass("toukei_optionOpen");
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
    var currItem = $('input:hidden[name=cht070GraphItem]').val();
    $('#' + currItem).addClass('text_bg_index');
    /*統計情報画面選択メニュー*/
    var adminFlg = $('input:hidden[name=cht070GsAdminFlg]').val();
    var wmlCtrlFlg = $('input:hidden[name=cht070CtrlFlgWml]').val();
    var smlCtrlFlg = $('input:hidden[name=cht070CtrlFlgSml]').val();
    var cirCtrlFlg = $('input:hidden[name=cht070CtrlFlgCir]').val();
    var filCtrlFlg = $('input:hidden[name=cht070CtrlFlgFil]').val();
    var bulCtrlFlg = $('input:hidden[name=cht070CtrlFlgBul]').val();
    if (adminFlg == 'false' && wmlCtrlFlg == 'false'
        && smlCtrlFlg == 'false' && cirCtrlFlg == 'false'
          && filCtrlFlg == 'false' &&  bulCtrlFlg == 'false') {
      $('.menu_select_text').addClass('menu_select_text_no_top');
      $('.menu_select_text').removeClass('menu_select_text');
      $('.toukei_pluginIcon-select').addClass('menu_select_icon_no_top');
      $('.toukei_pluginIcon-select').removeClass('toukei_pluginIcon-select');
    }
    /*月週日切り替え*/
    $('input[name=cht070DateUnit]:checked').attr('onclick','').unbind('click');
});

//年月コンボ変更
function changeYearMonthCombo(flg) {

  var frYear = Number(getDateComboValue('cht070DateMonthlyFrYear'));
  var frMonth = Number(getDateComboValue('cht070DateMonthlyFrMonth'));
  var toYear = Number(getDateComboValue('cht070DateMonthlyToYear'));
  var toMonth = Number(getDateComboValue('cht070DateMonthlyToMonth'));

  if (frYear > toYear || ((frYear == toYear && frMonth > toMonth))) {
    if (flg == 'from') {
      $('select[name=cht070DateMonthlyToYear]').val(getDateComboValue('cht070DateMonthlyFrYear'));
      $('select[name=cht070DateMonthlyToMonth]').val(getDateComboValue('cht070DateMonthlyFrMonth'));
    } else {
      $('select[name=cht070DateMonthlyFrYear]').val(getDateComboValue('cht070DateMonthlyToYear'));
      $('select[name=cht070DateMonthlyFrMonth]').val(getDateComboValue('cht070DateMonthlyToMonth'));
    }
  }

  document.forms[0].CMD.value='pageDate';
  document.forms[0].submit();
  return false;
}

// 表示項目チェンジ
function chkChange() {
    drawTotalizationGraph();
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
//ページコンボ
function changePage(cmbObj) {
    document.forms[0].cht070NowPage.value=cmbObj.options[cmbObj.selectedIndex].value;
    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
}
//表示項目変更
function changeDspItem(nextItem) {
    var currItem = $('input:hidden[name=cht070GraphItem]').val();
    if (currItem != nextItem) {
        $('#' + currItem ).removeClass('toukei_option-select');
        $('#' + nextItem ).addClass('toukei_option-select')
        document.forms[0].cht070GraphItem.value=nextItem;
        drawTotalizationGraph();
    }
    changeDsp();
}

//項目切替
function changeDsp() {
    if($('input:hidden[name=cht070GraphItem]').val() == 'chat_graph_message') {
        $('#dspItem')[0].style.visibility="";
    } else {
        $('#dspItem')[0].style.visibility="hidden";
    }
}


//集計グラフ
function drawTotalizationGraph() {
  var tmp = document.getElementById('chat_Graph');
  for (var i=tmp.childNodes.length-1; i>=0; i--) {
    tmp.removeChild(tmp.childNodes[i]);
  }
  var tick = eval($('input:hidden[name=jsonDateData]').val());
  var userObject = eval($('input:hidden[name=jsonUserData]').val());
  var groupObject = eval($('input:hidden[name=jsonGroupData]').val());
  var sendObject = eval($('input:hidden[name=jsonSendData]').val());
  var sumObject = eval($('input:hidden[name=jsonSumData]').val());
  var hideObject =[[-100]];

  var viewUsrFlg = false;
  var viewGrpFlg = false;
  var viewSumFlg = false;
  var viewSendFlg = false;
  var viewHideFlg = false;
  var animateSpeed = 1000;
  var ticksOpsAngle = 0;
  if (tick.length > 8) {
    ticksOpsAngle = -30;
  }
  /** 表示判定 **/
  if ($('input:hidden[name=cht070GraphItem]').val() == 'chat_graph_message') {
      if ($('input:checkbox[name=cht070DspUser]').is(':checked')) {
          viewUsrFlg　= true;
      }
      if ($('input:checkbox[name=cht070DspGroup]').is(':checked')) {
          viewGrpFlg　= true;
      }
      if ($('input:checkbox[name=cht070DspSum]').is(':checked')) {
          viewSumFlg　= true;
      }
  } else {
      viewSendFlg = true;
  }
  if(viewUsrFlg == false && viewGrpFlg == false && viewSumFlg==false && viewSendFlg==false) {
      viewHideFlg = true;
  }
  /** 表示項目 **/
   var chtSeries = [];
   var usrElm = {label:msglist_cht070["user"], rendererOptions: {animation: {speed:animateSpeed}}, show: viewUsrFlg};
   var grpElm = {label:msglist_cht070["group"], rendererOptions: {animation: {speed:animateSpeed}}, show: viewGrpFlg};
   var sumElm = {label:msglist_cht070["sum"], rendererOptions: {animation: {speed:animateSpeed}}, show: viewSumFlg};
   var sendElm = {label:msglist_cht070["send"], rendererOptions: {animation: {speed:animateSpeed}}, show: viewSendFlg};
   var hidedElm = {showLabel:false, show: viewHideFlg};
   chtSeries.push(usrElm);
   chtSeries.push(grpElm);
   chtSeries.push(sumElm);
   chtSeries.push(sendElm);
   chtSeries.push(hidedElm);
   var chatPlot = $.jqplot('chat_Graph', [userObject,groupObject,sumObject,sendObject,hideObject], {
       animate: true,
       animateReplot: true,
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
        series: chtSeries,
       axes: {
         xaxis: {
           renderer: $.jqplot.CategoryAxisRenderer,
           ticks: tick,
           label: '',
           tickRenderer: jQuery . jqplot . CanvasAxisTickRenderer ,
           tickOptions: {angle:ticksOpsAngle,fontSize:'7pt'}
         },
         yaxis: {
           label: '',
           min:0
         }
       }
    });
}
