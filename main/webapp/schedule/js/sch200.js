function buttonPush(cmd){
  document.forms[0].cmd.value=cmd;
  document.forms[0].CMD.value=cmd;
  document.forms[0].submit();
  return false;
}

function moveDailySchedule(cmd, ymd, uid, ukbn){
  document.forms[0].cmd.value=cmd;
  document.forms[0].CMD.value=cmd;
  document.forms[0].sch010SelectUsrSid.value=uid;
  document.forms[0].sch010SelectUsrKbn.value=ukbn;
  document.forms[0].sch010SelectDate.value=ymd;
  document.forms[0].sch010DspDate.value=ymd;
  document.forms[0].submit();
  return false;
}

function addSchedule(cmd, ymd, uid, ukbn){
  document.forms[0].cmd.value=cmd;
  document.forms[0].CMD.value=cmd;
  document.forms[0].sch010SelectDate.value=ymd;
  document.forms[0].sch010SelectUsrSid.value=uid;
  document.forms[0].sch010SelectUsrKbn.value=ukbn;
  document.forms[0].sch010SchSid.value='';
  document.forms[0].submit();
  return false;
}

function editSchedule(cmd, ymd, sid, uid, ukbn){
  document.forms[0].cmd.value=cmd;
  document.forms[0].CMD.value=cmd;
  document.forms[0].sch010SelectDate.value=ymd;
  document.forms[0].sch010SelectUsrSid.value=uid;
  document.forms[0].sch010SelectUsrKbn.value=ukbn;
  document.forms[0].sch010SchSid.value=sid;
  document.forms[0].submit();
  return false;
}
function moveListSchedule(cmd, uid, ukbn){
  document.forms[0].cmd.value=cmd;
  document.forms[0].CMD.value=cmd;
  document.forms[0].sch010SelectUsrSid.value=uid;
  document.forms[0].sch010SelectUsrKbn.value=ukbn;
  document.forms[0].submit();
  return false;
}

function moveMonthSchedule(cmd, uid, ukbn){
  document.forms[0].cmd.value=cmd;
  document.forms[0].CMD.value=cmd;
  document.forms[0].sch010SelectUsrSid.value=uid;
  document.forms[0].sch010SelectUsrKbn.value=ukbn;
  document.forms[0].submit();
  return false;
}

function changeGroupCombo(cmd){
  document.forms[0].cmd.value=cmd;
  document.forms[0].CMD.value=cmd;
  document.forms[0].sch010SelectUsrSid.value=-1;
  document.forms[0].sch100SelectUsrSid.value=-1;
  document.forms[0].sch010SelectUsrKbn.value=0;
  document.forms[0].submit();
  return false;
}

function changeUserCombo(){
  document.forms[0].cmd.value='chuser';
  document.forms[0].CMD.value='chuser';
  document.forms[0].submit();
  return false;
}
function keyPress(keycode) {
  if ($('.js_schSearch').is(':focus') && keycode == 13) {
    document.forms[0].CMD.value='search';
    document.forms[0].submit();
    return false;
  }
}

function window_create() {
  var top_flame = $('.js_sch_top_frame');
  $('.js_sch_under_frame').css({
    'margin-top':top_flame.height() - 1
  });
  top_flame.css({
    'width':$('.js_sch_under_frame').width()
  });
}

function setWeekHeader() {
  let dammy = $('#calendar .fc-agenda-days thead th');
  $('.dsp_weekHeader th').each(function(i) {
    let text = dammy.eq(i).text();
    let className = dammy.eq(i).attr('class');
    let fontSize = dammy.eq(i).css('font-size');
    $('.dsp_weekHeader th').eq(i).text(text);
    $('.dsp_weekHeader th').eq(i).removeClass();
    $('.dsp_weekHeader th').eq(i).addClass(className + ' p0');
    $('.dsp_weekHeader th').eq(i).css({
      'font-size': fontSize
    })
  })
  $('#calendar .fc-agenda-days thead th').addClass('visibility-hidden');
}

function fixWeekHeader() {

  $('.dsp_weekHeader').css({
    'width':$('#calendar').width()
  });

  let dammy = $('#calendar .fc-agenda-days thead th');
  $('.dsp_weekHeader th').each(function(i) {
      let width = dammy.eq(i).outerWidth();
      $('.dsp_weekHeader th').eq(i).width(width);
      if (i == 8) {
        let display = dammy.eq(i).css('display');
        $('.dsp_weekHeader th').eq(i).css({
          'display': display
        })
      }
  })
}

/********************************************************************
* カレンダーによる日付入力スクリプト
*
* ( 下記スクリプトは改造も可能ですがまったくいじらずにそのままペース
*   トするだけでもご利用いただけるように書いてあります )
*
*  Syntax : wrtCalendar( formElementObject[,moveMonthFlg][,winOpenFlg] )
*  例     : wrtCalendar( this )
*
*  使いたいINPUT入力タグにonFocus="wrtCalendar(this)"を ペーストし
*  ます。それぞれのタグに違う名前(NAME属性)を忘れずに付けておいてく
*  ださい。
*
*  Example :受付日:<INPUT NAME=e1 TYPE=text
*                         onFocus="wrtCalendar(this)">
*
* ------------------------------------------------------------------
* calendar.js Copyright(c)1999 Toshirou Takahashi tato@fureai.or.jp
* Support http://www.fureai.or.jp/~tato/JS/BOOK/INDEX.HTM
* ------------------------------------------------------------------
*
*■更新履歴
* GroupSession向けカスタマイズ
*
* ---- TODO 未実装 ----
* 2007/02/20 CSS対応(60%対応済)
* 2007/02/20 祝祭日対応(外部データを取得)
*
* ---- 実装済み ----
* 2007/02/20 Windowのサイズを変更
* 2007/02/20 入力エラーチェックを追加
*            エラーの場合現在日をセット(警告ダイアログも表示する)
* 2007/02/20 Mac用のCloseボタンは削除
* 2007/02/20 現在日時をセットするメソッドを追加
* 2007/02/20 年取得ロジックの関数化
* 2007/02/20 コメント追記
* ----
*/

var now = new Date();
var absnow = now;
var Win=navigator.userAgent.indexOf('Win')!=-1;
var Mac=navigator.userAgent.indexOf('Mac')!=-1;
var X11=navigator.userAgent.indexOf('X11')!=-1;
var Moz=navigator.userAgent.indexOf('Gecko')!=-1;
var Opera=!!window.opera;
var winflg=1;


/**
* 引数のオブジェクト(フォーム部品)に現在日時をセットする。
*
* @param dd 日
* @param mm 月
* @param yyyy 年
*/
function setNow(dd, mm, yyyy) {
var nowyear = now.getYear();
dd.value = now.getDate();
mm.value = now.getMonth() + 1;
yyyy.value = convYear(nowyear);
}

/**
* Date#getgetYearで取得できる値をyyyy形式に変換する
* @param yyyy 年
*/
function convYear(yyyy) {
if(yyyy<1900) {
  yyyy=1900+yyyy;
}
return yyyy;
}

/**
* カレンダーを表示する。
*
* @param ojymd
* @param btnId カレンダーボタンのid
*/
function wrtCalendarByBtn(ojymd, btnId) {
  wrtCalendar(ojymd ,'', false, btnId)
}



function doEvent(selectUsrId, usrKbn, schSid, dayDelta, minuteDelta, eventKbnNum){
$.ajaxSetup({async:false});
$.post('../schedule/sch200.do', {"cmd":"repetCheck","CMD":"repetCheck","sch010SelectUsrSid":selectUsrId,"sch010SelectUsrKbn":usrKbn,"sch010SchSid":schSid,"sch200DayDelta":dayDelta,"sch200MinuteDelta":minuteDelta,"sch200EventKbn":eventKbnNum}, function(data){
  var jsonObject = eval('(' + data + ')');
  var result = jsonObject.result;
  if (result == 1) {
    document.forms[0].sch200Cancel.value=1;
    $('#dialog5').dialog({
       autoOpen: true,
       bgiframe: true,
       resizable: false,
       height: 180,
       modal: true,
       closeOnEscape: false,
       overlay: {
          backgroundColor: '#ffffff',
          opacity: 0.5
       },
       buttons: {
         OK: function() {
           document.forms[0].submit();
           return false;
          }
       }
    });
  } else if (result == 2 || result == 3){
    $('#dialog4').dialog({
       autoOpen: true,
       bgiframe: true,
       resizable: false,
       height: 180,
       modal: true,
       closeOnEscape: false,
       overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
       },
       buttons: {
         はい: function() {
           document.forms[0].sch200Cancel.value=0;
           document.forms[0].submit();
           return false;
          },
         いいえ: function() {
           document.forms[0].sch200Cancel.value=1;
           document.forms[0].submit();
           return false;
         }
       }
    });
  } else if (result == -1) {
    $('#dialog6').dialog({
       autoOpen: true,
       bgiframe: true,
       resizable: false,
       height: 180,
       modal: true,
       closeOnEscape: false,
       overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
       },
       buttons: {
         OK: function() {
           document.forms[0].sch200Cancel.value=1;
           document.forms[0].submit();
           return false;
          }
       }
    });
  } else {
    document.forms[0].sch200Cancel.value=0;
    document.forms[0].submit();
  }
});
return false;
}

function doEventAllDay(schSid){
$.ajaxSetup({async:false});
$.post('../schedule/sch200.do', {"cmd":"existCheck","CMD":"existCheck", "sch010SchSid":schSid}, function(data){
  var jsonObject = eval('(' + data + ')');
  var result = jsonObject.result;
  if (result == -1) {
    $('#dialog6').dialog({
       autoOpen: true,
       bgiframe: true,
       resizable: false,
       height: 180,
       modal: true,
       closeOnEscape: false,
       overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
       },
       buttons: {
         OK: function() {
           document.forms[0].sch200Cancel.value=1;
           document.forms[0].submit();
           return false;
          }
       }
    });
  } else {
    document.forms[0].sch200Cancel.value=0;
    document.forms[0].submit();
  }
});
return false;
}

$(function() {
  window_create();

  var resizeTimer = null;
  $(window).resize(function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        window_create();
        fixWeekHeader();
      }, 300);
  });

  var response = false;
  $('#dialog').dialog({
    autoOpen: false,  // hide dialog
    bgiframe: true,   // for IE6
    resizable: false,
    height: 140,
    modal: true,
    overlay: {
      backgroundColor: '#000000',
      opacity: 0.5
    },
    buttons: {
      OK: function() {
        response = true;
        $(this).dialog('close');
      },
      Cancel: function() {
        $(this).dialog('close');
      }
    }
  });

  $('#open-dialog').click(function() {
    $('#dialog').dialog('open');
  })
  .hover(
      function() {
        $(this).addClass("ui-state-hover");
      },
      function() {
        $(this).removeClass("ui-state-hover");
      })
  .mousedown(function() {
    $(this).addClass("ui-state-active");
  })
  .mouseup(function() {
    $(this).removeClass("ui-state-active");
  });
});

/*--/////////////ここまで///////////////////////////////////////--*/
