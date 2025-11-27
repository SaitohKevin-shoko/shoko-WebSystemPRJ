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
 * 日付クリック時に実行する親画面の関数を設定する
 */
var calDateClickFnc;
function setCalDateClickFnc(fncStr) {
    calDateClickFnc = fncStr;
}

/**
 * カレンダー設定モデル
 */
function GSCalendarConfig() {
    this.oj = null;
    this.ojmm = null;
    this.oyyyy = null;
    this.ojymd = null;
    this.calDateClickFnc = null;
    this.reloadFlg = false;

    //日付エレメントが３つに分かれる場合（スケジュール詳細検索画面など）
    //日付確定でサブミットしない
    if ((arguments[0] instanceof HTMLElement)
            && (arguments[1] instanceof HTMLElement)
            && (arguments[2] instanceof HTMLElement)) {
        this.oj = arguments[0];
        this.ojmm = arguments[1];
        this.oyyyy = arguments[2];
        //日付確定でサブミットしない
        this.reloadFlg = false;


    }
    //日付エレメントが３つに分かれる場合（スケジュール詳細検索画面など）
    if ((arguments[0] instanceof HTMLElement)
            && !(arguments[1] instanceof HTMLElement)) {
        this.ojymd = arguments[0];
        //日付確定でサブミットする
        this.reloadFlg = true;
    }
    this.calDateClickFnc = calDateClickFnc;

    calDateClickFnc = null;

    if (this.ojymd) {
        var wkymd=this.ojymd.value;
        this.wkyyyy=wkymd.substring(0, 4);
        this.wkmm=wkymd.substring(4, 6);
        this.wkdd=wkymd.substring(6, 8);
    } else {
        this.wkyyyy=this.oyyyy.value;
        this.wkmm=this.ojmm.value;
        this.wkdd=this.oj.value;
    }

}


/**
 * カレンダーを表示する。
 *
 */
function wrtCalendarByBtn() {

    /**
     * カレンダー設定モデル
     */
    function CalendarConfig() {
        this.packageName = "jp.groupsession.v2.cmn.calendar";
    }

    /**
     * @param oj 日
     * @param ojmm 月
     * @param oyyyyy 年
     * @param arg1 当日の日付をセットする場合「today」の文字列をセットする。
     * @param arg2 0=次の年・月へ移動クリック 1=年のコンボボックス変更 2=月のコンボボックス変更
     * @param btnId カレンダーボタンのid
     */

    if ((arguments[0] instanceof HTMLElement)
            && (arguments[1] instanceof HTMLElement)
            && (arguments[2] instanceof HTMLElement)) {

        wrtCalendar(new GSCalendarConfig(arguments[0], arguments[1], arguments[2]), '', false, arguments[3]);

    }
    /**
     * @param ojymd
     * @param btnId カレンダーボタンのid
     *
     */

    if ((arguments[0] instanceof HTMLElement)
            && !(arguments[1] instanceof HTMLElement)) {
        wrtCalendar(new GSCalendarConfig(arguments[0]) ,'', false, arguments[1]);

    }
}

/**
 * カレンダーを表示する。
 *
 * @param oj 日
 * @param ojmm 月
 * @param oyyyyy 年
 * @param arg1 当日の日付をセットする場合「today」の文字列をセットする。
 * @param arg2 0=次の年・月へ移動クリック 1=年のコンボボックス変更 2=月のコンボボックス変更
 * @param btnId カレンダーボタンのid
 */
function wrtCalendarWithReload(oj, objmm, objyyyy, arg1, arg2, btnId ) {
    var conf = new GSCalendarConfig(oj, objmm, objyyyy);
    conf.reloadFlg = true;
    wrtCalendar(conf, arg1, arg2, btnId );
}


/**
 * カレンダーを表示する。
 *
 * @param oj 日
 * @param ojmm 月
 * @param oyyyyy 年
 * @param arg1 当日の日付をセットする場合「today」の文字列をセットする。
 * @param arg2 未使用
 * @param btnId カレンダーボタンのid
 */
function wrtCalendar( ) {

  if(Opera)return

  var conf, arg1, arg2, btnId
  //日付エレメントが３つに分かれる場合（スケジュール詳細検索画面など）
  if ((arguments[0] instanceof HTMLElement)
          && (arguments[1] instanceof HTMLElement)
          && (arguments[2] instanceof HTMLElement)) {
      conf = new GSCalendarConfig(arguments[0], arguments[1], arguments[2]);
      arg1 = arguments[3];
      arg2 = arguments[4];
      btnId = arguments[5];
      //winflg=0
      if(arguments[6] || arguments[6] == 0) {
        winflg=0
      }

  //日付エレメントが３つに分かれる場合（スケジュール詳細検索画面など）
  } else if ((arguments[0] instanceof HTMLElement)
          && !(arguments[1] instanceof HTMLElement)) {
      conf = new GSCalendarConfig(arguments[0]);
      arg1 = arguments[1];
      arg2 = arguments[2];
      btnId = arguments[3];
      //winflg=0
      if(arguments[4] || arguments[4] == 0) {
        winflg=0
      }

  } else if (!(arguments[0] instanceof GSCalendarConfig)) {
      return;
  } else {
      conf = arguments[0];
      arg1 = arguments[1];
      arg2 = arguments[2];
      btnId = arguments[3];
      //winflg=0
      if(arguments[4] || arguments[4] == 0) {
        winflg=0
      }
  }




  if (conf.oj) {
      conf.oj.blur();
  }
  if (conf.ojymd) {
      conf.ojymd.blur()
  }

  if(!arg1) arg1=0
  if(!Moz)



  var today=false;

  if(arg1=='today'){
    today=true;
    arg1=0;
  }

  wkyyyy=conf.wkyyyy;
  wkmm=conf.wkmm;
  wkdd=conf.wkdd;


    // 現在初期化
    if (arg1==0) {
       var paramvalue = wkdd;
       var parseDate = new Array(3);
       var ngval = false;
       if(today || paramvalue==""){
          now = new Date();
       } else {

           //yyyy/mm/dd文字列を作成
           var ymdf = escape(wkyyyy + '/' + wkmm + "/" + wkdd);
           //RegExpオブジェクトの作成
           re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
           if (ymdf.match(re)) {
               now   = new Date(wkyyyy ,wkmm -1,wkdd)
           } else {
               now   = new Date()
           }
       }
    } else {
        argdate = arg1.toString();
        arg1year = argdate.substring(0, 4);
        arg1month = argdate.substring(4, 6);
        arg1day = '01';
        now   = new Date(arg1year ,arg1month -1,arg1day)
    }

  //-年月日取得
  nowdate  = now.getDate();
  nowmonth = now.getMonth();
  nowyear  = now.getYear();



  //-2000年問題対応
  nowyear = convYear(nowyear);

  //-現在月を確定
  now   = new Date(nowyear,nowmonth,1)

  //-YYYYMM作成
  nowyyyymm=nowyear*100+nowmonth

  // YYYY/MM作成
  nowmonth = nowmonth +1
  if(nowmonth<10) nowmonth = '0' + nowmonth
  nowtitleyyyymm=nowyear + msglist.year + nowmonth + msglist.month

  // YYYY MM コンボボックス作成
  var startyear = nowyear - 3;   //前後3年表示なので最初は現在年-3年
  var startmonth = 1;
  combyear = new Array(7);
  combmonth = new Array(12);
  for (var i = 0; i < 7; i++){
      combyear[i] = startyear + i;
  }
  combmonth[0] = '01';
  combmonth[1] = '02';
  combmonth[2] = '03';
  combmonth[3] = '04';
  combmonth[4] = '05';
  combmonth[5] = '06';
  combmonth[6] = '07';
  combmonth[7] = '08';
  combmonth[8] = '09';
  combmonth[9] = '10';
  combmonth[10] = '11';
  combmonth[11] = '12';

  //-週設定
  week = new Array(msglist.sunday,msglist.monday,msglist.tuesday,msglist.wednesday,msglist.thursday,msglist.friday,msglist.saturday);

  //-カレンダー表示用サブウインドウオープン
  if(winflg){

    var w=450
    var h=430

    //-calendar用OS別サイズ微調整
    if(Moz)     { w+=15 ; h+=40 }
    else if(Win){ w+=0  ; h+=0  }
    else if(Mac){ w+=8  ; h+=22 }
    else if(X11){ w+=5  ; h+=46 }

//    var x=100
//    var y=20
//
//    var btnPosition = "#" + btnId;
//    if (btnId && document.getElementById(btnId)) {
//      x = $(btnPosition).offset().left  - w;
//      if (x < 0) { x = 0; }
//      y = $(btnPosition).offset().top;
//    }

    var x = getCenterX(w);
    var y = getCenterY(h);


    mkSubWin('','calendar',x,y,w,h)

  }

  //-カレンダー構築用基準日の取得
  fstday   = now;                                           //今月の1日
  startday = fstday - ( fstday.getDay() * 1000*60*60*24 );  //最初の日曜日
  startday = new Date(startday);

  paramDay  = new Date(startday);

  paramDate = paramDay.getDate();
  paramMonth= paramDay.getMonth();
  paramYear = paramDay.getYear();
  paramYear = convYear(paramYear);
  paramyyyymm = paramYear * 100 + paramMonth;
  paramClmonth= paramMonth+1;
  if(paramClmonth<10) paramClmonth = '0' + paramClmonth;
  if(paramDate<10) paramDate = '0' + paramDate;
  paramyymd= paramYear.toString() + (paramClmonth.toString()) + paramDate.toString();



  // カレンダー表示情報取得
  var otherData = {};
  otherData.holMap = new Object();
  $.ajaxSetup({async:false});
  $.post('../common/cmn200.do', {"cmn200dateStr":paramyymd},
      function respCmn200(data) {
          try {
              var ret = JSON.parse(data);

              var jsonArray = ret.kyuujitu;
              if (jsonArray != null) {
                for (n=0;n<jsonArray.length;n++) {
                  //休日を格納したMAPを作成
                  otherData.holMap[jsonArray[n].date] = jsonArray[n].holidayName;
                }
              }

              //themeCssをセット
              otherData.themeCss = ret.themeCss

          } catch (e) {
          }

      });

  var holMap = otherData.holMap;

  //バージョン取得
  var version = '';
  if ($('script[src]').length > 0) {
      var versionSrc = $('script[src]').eq(0).attr('src');
      if (versionSrc.indexOf('?')) {
          version = versionSrc.substr(versionSrc.indexOf('?'));
      }
  }
  //-カレンダー構築用HTML
  ddata = ''
  ddata += '<html>\n'
  ddata += '<head>'
  if(!Moz)
  ddata += '<meta http-equiv="Content-Type" content="text/html;charset=SHIFT_JIS">\n';
  ddata += '<title>日付を選択してください</title>\n';
  ddata += '<link rel=stylesheet href=\'../common/css/bootstrap-reboot.css?' + version + '\' type=\'text/css\'>\n';
  ddata += '<link rel=stylesheet href=\'../common/css/layout.css?' + version + '\' type=\'text/css\'>\n';
  ddata += '<link rel=stylesheet href=\'../common/css/all.css?' + version + '\' type=\'text/css\'>\n';
  if (otherData.themeCss) {
      $.each(otherData.themeCss, function() {
          ddata += '<link rel=stylesheet href=\'../' + this + '?' + version + '\' type=\'text/css\'>\n';
      });
  }
  ddata += '<link rel=stylesheet href=\'../common/css/common.css?' + version + '\' type=\'text/css\'>\n';

  ddata += '</head>\n'
  ddata += '<body>\n'

  ddata += '<form name="calendar2">\n'
  ddata += '<table class="p5 b1 w100 table-top cal_table mb5">\n'

  //-MONTH
    ddata += '   <TR id="trmonth" class=\" \" >\n';
    ddata += '     <TH COLSPAN="7" class="days2 ">\n';
    ddata += '       <div class="verAlignMid table_header-multiEvt">\n';
    ddata += '         <a  class="table_headerSort-top" href="javascript:self.opener.wrtCalendar(self.calendarConf ,'
                         + (nowyear-1) + nowmonth +',0);">';
    ddata +=  '          <span class="small classic-display">&lt;</span><i class="original-display icon-tree_arrow_left" ></i>' + msglist.prevYear +'</a>\n'
    ddata += '         </a>\n';

    ddata += '         <select class="ml20 mr5" name="selectyear" onchange="self.opener.wrtCalendar(self.calendarConf, document.forms[0].selectyear.value , 0)">\n>\n'
    for (var y = 0; y < combyear.length; y++ ) {
        var dspyear = startyear + y;
        ddata += '   <option value="' + dspyear + nowmonth + '"';
            if (dspyear == nowyear) {
                ddata += ' selected="selected">';
            } else {
                ddata += '>';
            }
        ddata += dspyear + msglist.year + '</option>\n';
    }
    ddata += '         </select>\n';

    ddata += '         <select class="mr20" name="selectmonth" onchange="self.opener.wrtCalendar(self.calendarConf, document.forms[0].selectmonth.value , 0)">\n';
    for (var m = 0; m < combmonth.length; m++ ) {
        ddata += '   <option value="' + nowyear + combmonth[m] + '"';
            if (combmonth[m] == nowmonth) {
                ddata += ' selected="selected">';
            } else {
                ddata += '>';
            }
        ddata += combmonth[m] + msglist.month + '</option>\n';
    }
    ddata += '         </select>\n';
    ddata += '         <a class="table_headerSort-top" href="javascript:self.opener.wrtCalendar(self.calendarConf,'
                          + (nowyear+1) + nowmonth + ',0);">' + msglist.nextYear + '\n';
    ddata +=  '          <span class="small classic-display">&gt;</span><i class="original-display icon-tree_arrow_right" ></i>\n'
    ddata += '         </a>\n'
    ddata += '       </div><br>\n';
    ddata += '       <div class="verAlignMid mt5">\n';

    nummonth = new Number(nowmonth);

    var beforemonth = nummonth - 1;
    var beforemonthStr =  '' +  nowyear + beforemonth;

    if (beforemonth < 10) {
        beforemonth = '0' + beforemonth;
        beforemonthStr =  '' +  nowyear + beforemonth;
    } else if (beforemonth < 1) {
        beforemonth = 12;
        beforemonthStr =  '' +  (nowyear - 1) + beforemonth;
    }


    var nextmonth = nummonth + 1;
    var nextmonthStr = '' + nowyear + nextmonth;
    if (nextmonth < 10) {
        nextmonth = '0' + nextmonth;
        nextmonthStr =  '' +  nowyear + nextmonth;
    } else if (nextmonth > 12) {
        nextmonth = 01;
        nextmonthStr =  '' +  (nowyear + 1) + nextmonth;
    }

    ddata += '        <button type="button" class="webIconBtn" \n';
    ddata += '          onClick="self.opener.wrtCalendar(self.calendarConf ,' + beforemonthStr + ',0)">\n'
    ddata += '          <img class="btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png">\n';
    ddata += '          <a href="#!" class="cl_fontOutlineLink" ><i class="icon-paging_left "></i></a>\n';
    ddata += '        </button>\n';
    ddata += '        <button type="button" class="baseBtn classic-display" value="' + msglist.thisMonth + '"\n';
    ddata += '          onClick="self.opener.wrtCalendar(self.calendarConf,\'today\',0)">\n'
    ddata += '          ' + msglist.thisMonth + '\n';
    ddata += '        </button>\n';
    ddata += '        <span>\n';
    ddata += '          <a href="#" class="fw_b todayBtn original-display cl_fontOutlineLink" \n';
    ddata += '            onClick="self.opener.wrtCalendar(self.calendarConf,\'today\',0)">\n'
    ddata += '            ' + msglist.thisMonth + '\n';
    ddata += '          </a>\n';
    ddata += '        </span>\n';
    ddata += '        <button type="button" class="webIconBtn" \n';
    ddata += '          onClick="self.opener.wrtCalendar(self.calendarConf,' + nextmonthStr + ',0)">\n'
    ddata += '          <img class="btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png">\n';
    ddata += '          <a href="#!" class="cl_fontOutlineLink" ><i class="icon-paging_right "></i></a>\n';
    ddata += '        </button>\n';
    ddata += '       </div><br>\n';





    ddata += '       </div>\n';
    ddata += '</TH>\n'
    ddata += '   </TR>\n'

  //-WEEK
  ddata += '   <TR >\n'

  for (i=0;i<7;i++){


    if (i == 0) {
        ddata += '   <td class="cal_header bgC_calSunday cl_fontSunday p0 fw_b" >\n'
    } else if (i == 6) {
        ddata += '   <td class="cal_header bgC_calSaturday cl_fontSaturday p0 fw_b" >\n'
    } else {
        ddata += '   <td class="cal_header p0 fw_b">\n'
    }
    ddata +=       week[i]


    ddata += '   </td>\n'
  }
  ddata += '   </TR>\n'

  function makeOnclickDay(conf, wrtdate, wrtmonth, wrtyear, wrtyymd) {
    var onClickEv  = 'function v(){'

        if (conf.ojymd) {
            onClickEv += '   self.opener.document.'+conf.ojymd.form.name
            onClickEv += '.'+conf.ojymd.name+'.value=(\''+wrtyymd+'\');'

        } else if (conf.oj) {
            //日
            onClickEv += '   self.opener.document.'+conf.oj.form.name
            onClickEv += '.'+conf.oj.name+'.value=(\''+wrtdate+'\');'
            //月
            onClickEv += '   self.opener.document.'+conf.oj.form.name
            onClickEv += '.'+conf.ojmm.name+'.value=(\''+ (wrtmonth + 1)+'\');'
            //年
            onClickEv += '   self.opener.document.'+conf.oj.form.name
            onClickEv += '.'+conf.oyyyy.name+'.value=(\''+wrtyear+'\');'

        }

        if (conf.calDateClickFnc) {
            onClickEv += '   window.opener.' + conf.calDateClickFnc + ';';
        }

        if (!conf.reloadFlg) {
            onClickEv += 'self.close()};v()" '
        } else {
            onClickEv += 'window.opener.document.forms[0].submit();self.close()};v()" '
        }
     return onClickEv;

  }


  //-DATE
  for(j=0;j<6;j++){

    //祝日TR
    ddata += '   <TR class="hp15 cursor_p">\n'
    for(i=0;i<7;i++){
      nextday = startday.getTime() + (i * 1000*60*60*24)
      wrtday  = new Date(nextday)

      wrtdate = wrtday.getDate();
      wrtdate2 = wrtday.getDate();
      wrtmonth= wrtday.getMonth();
      wrtyear = wrtday.getYear();
      wrtyear = convYear(wrtyear);
      wrtyyyymm = wrtyear * 100 + wrtmonth
      wrtclmonth= wrtmonth+1;



      if(wrtclmonth<10) wrtclmonth = '0' + wrtclmonth
      if(wrtdate<10) wrtdate = '0' + wrtdate
      wrtyymd= ''+wrtyear + (wrtclmonth) + wrtdate

      var onClickEv  = makeOnclickDay(conf, wrtdate2, wrtmonth, wrtyear, wrtyymd);


      var clsOutmm = '';
      if (holMap[wrtyymd] != null && wrtyyyymm != nowyyyymm) {
          clsOutmm = ' opacity6';
      }
      if (i == 0) {
        ddata += ' <TD class="border_bottom_none txt_c bgC_tableCell p0" onClick="' + onClickEv + '" >\n'
        if(holMap[wrtyymd] != null){
          ddata += '<span class="cl_fontSunday fs_10'+ clsOutmm +'">\n' + holMap[wrtyymd] + '</span>\n'
        }
      } else if (i == 6) {
        ddata += ' <TD class="border_bottom_none txt_c bgC_tableCell p0" onClick="' + onClickEv + '" >\n'
        if(holMap[wrtyymd] != null){
          ddata += '<span class="cl_fontSunday fs_10'+ clsOutmm +'">\n' + holMap[wrtyymd] + '</span>\n'
        }
      } else if(wrtyyyymm != nowyyyymm){
        ddata += ' <TD class="border_bottom_none txt_c bgC_tableCell p0" onClick="' + onClickEv + '" >\n'
        if(holMap[wrtyymd] != null){
          ddata += '<span class="cl_fontSunday fs_10'+ clsOutmm +'">\n' + holMap[wrtyymd] + '</span>\n'
        }
      } else if( wrtdate  == absnow.getDate()  &&
                 wrtmonth == absnow.getMonth() &&
                 wrtday.getYear() == absnow.getYear()){
        ddata += ' <TD class="border_bottom_none txt_c bgC_select p0" onClick="' + onClickEv + '" >\n'
        if(holMap[wrtyymd] != null){
          ddata += '<span class="cl_fontSunday fs_10'+ clsOutmm +'">\n' + holMap[wrtyymd] + '</span>\n'
        }
      } else {
        ddata += ' <TD class="border_bottom_none txt_c bgC_tableCell p0" onClick="' + onClickEv + '" >\n'
        if(holMap[wrtyymd] != null){
          ddata += '<span class="cl_fontSunday fs_10'+ clsOutmm +'">\n' + holMap[wrtyymd] + '</span>\n'
        }
      }
      ddata += '   </TD>\n'
    }
    ddata += '   </TR>\n'

      //日TR
    ddata += '   <TR class="cursor_p">\n'
    for(i=0;i<7;i++){
      nextday = startday.getTime() + (i * 1000*60*60*24)
      wrtday  = new Date(nextday)

      wrtdate = wrtday.getDate();
      wrtdate2 = wrtday.getDate();
      wrtmonth= wrtday.getMonth()
      wrtyear = wrtday.getYear()
      wrtyear = convYear(wrtyear);
      wrtyyyymm = wrtyear * 100 + wrtmonth
      wrtclmonth= wrtmonth+1;
      if(wrtclmonth<10) wrtclmonth = '0' + wrtclmonth
      if(wrtdate<10) wrtdate = '0' + wrtdate
      wrtyymd= ''+wrtyear + (wrtclmonth) + wrtdate

      var clsDay = '';
      if(wrtyyyymm != nowyyyymm){
          clsDay = 'cl_fontBody opacity6';
      } else if(holMap[wrtyymd] != null){
          clsDay = 'cl_fontSunday fw_b';
      } else {
          clsDay = 'cl_fontBody fw_b';
      }


      var wrtdateA = '<span class="fs_16 schedule_headerDay ' + clsDay + '">\n'
      wrtdateA += wrtdate
      wrtdateA += '</span>\n'

      var onClickEv  = makeOnclickDay(conf, wrtdate2, wrtmonth, wrtyear, wrtyymd);


      if (i == 0) {
        ddata += ' <TD class="p0 pb10 txt_c txt_t bgC_tableCell " onClick="' + onClickEv +'">\n';
        ddata += wrtdateA;

      } else if (i == 6) {
          ddata += ' <TD class="p0 pb10 txt_c txt_t bgC_tableCell "  onClick="' + onClickEv +'">\n';
        ddata += wrtdateA;

      } else if(wrtyyyymm != nowyyyymm){
        ddata += ' <TD class="p0 pb10 txt_c txt_t bgC_tableCell "  onClick="' + onClickEv +'">\n';
        ddata += wrtdateA;

      } else if( wrtdate  == absnow.getDate()  &&
                 wrtmonth == absnow.getMonth() &&
                 wrtday.getYear() == absnow.getYear()){
        ddata += ' <TD class="p0 pb10 txt_c txt_t bgC_select "  onClick="' + onClickEv +'">\n';
        ddata += wrtdateA;
      } else {
        ddata += ' <TD class="p0 pb10 txt_c txt_t bgC_tableCell "  onClick="' + onClickEv +'">\n';
        ddata += wrtdateA
      }
      ddata += '   </TD>\n'
    }
    ddata += '   </TR>\n'

    startday = new Date(nextday)
    startday = startday.getTime() + (1000*60*60*24)
    startday = new Date(startday)
  }


  ddata += '</table>\n'

  ddata += '<div class="footerBtn_block verAlignMid w100">\n';

  ddata += ' <span class="mrl_auto"></span>';
  ddata += ' <button type="button" class="baseBtn" value="' + msglist.close + '" onclick="window.close();">\n';
  ddata += '   <img class="btn_classicImg-display" src="../common/images/classic/icon_close.png" alt="' + msglist.close + '">\n';
  ddata += '   <img class="btn_originalImg-display" src="../common/images/original/icon_close.png" alt="' + msglist.close + '">\n';
  ddata += '     ' + msglist.close + '\n';
  ddata += ' </button>';
  ddata += '</div>\n';

  ddata += '</form>\n'

  ddata += '</body>\n'
  ddata += '</html>\n'


  calendarwin.document.write(ddata)
  calendarwin.document.close()
  calendarwin.focus()

  calendarwin.calendarConf = conf;

  winflg=1
}


/********************************************************************
 * 簡易サブウインドウ開き
 *  Syntax : mkSubWin(URL,winName,x,y,w,h)
 *  例     : mkSubWin(winIndex,'test.htm','win0',100,200,150,300)
 * ------------------------------------------------------------------
 */

var calendarwin;

function mkSubWin(URL,winName,x,y,w,h){

    var para =""
//             +" left="        +350
             +" left="        + x
             +",screenX="     +x
             +",top="         +y
             +",screenY="     +y
             +",toolbar="     +0
             +",location="    +0
             +",directories=" +0
             +",status="      +0
             +",menubar="     +0
             +",scrollbars="  +0
             +",resizable="   +1
             +",innerWidth="  +w
             +",innerHeight=" +h
             +",width="       +w
             +",height="      +h

        calendarwin=window.open(URL,winName,para);
        calendarwin.focus();
}
function calWindowClose(){
    if(calendarwin && calendarwin != null){
        calendarwin.close();
    }
}

function afterNewWinOpen(win){
    win.moveTo(0,0);
    calendarwin.focus();
    return;
}


function getCenterX(winWidth) {
    var x = (screen.width - winWidth) / 2;
    return x;
}

function getCenterY(winHeight) {
    var y = (screen.height - winHeight) / 2;
    return y;
}


  /*--/////////////ここまで///////////////////////////////////////--*/
