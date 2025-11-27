function openReserveInfoWindow(groupSid, rsvDspFrom) {
        var newWinOpt = "width=650, height=400, toolbar=no ,scrollbars=yes, resizable=yes";
        var url = '../reserve/rsv190.do?rsvSelectedGrpSid=' + groupSid + '&rsvDspFrom=' + rsvDspFrom;
    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'thissite', newWinOpt);
        flagSubWindow = true;
        afterNewWinOpenUser(subWindow);
    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
}

function openScheduleReserveWindow(groupSid, resGroupSid, dspDate) {
    //保存
    var org_target = document.forms[0].target;
    var org_method = document.forms[0].method;
    var org_action = document.forms[0].action;

    var winWidth=920;
    var winHeight=600;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var frYear = document.forms[0].sch040FrYear.value;
    var frMonth = document.forms[0].sch040FrMonth.value;
    var frDay = document.forms[0].sch040FrDay.value;
    var frDate = _zeroPadding(frYear, 4) + _zeroPadding(frMonth, 2) + _zeroPadding(frDay, 2);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no , scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../schedule/sch120.do?sch120MoveMode=0&sch010DspGpSid=' + groupSid + '&sch120ResDspGpSid=' + resGroupSid + '&sch010DspDate=' + frDate;
    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'scheduleReserveWindow', newWinOpt);
        flagSubWindow = true;

        document.forms[0].target = "scheduleReserveWindow";
        document.forms[0].method = "post";
        document.forms[0].action = url;
        // サブミット
        document.forms[0].submit();


    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
    //戻す
    document.forms[0].target = org_target;
    document.forms[0].method = org_method;
    document.forms[0].action = org_action;

}

function openScheduleReserveWindowEx(groupSid, resGroupSid, dspDate) {
    //保存
    var org_target = document.forms[0].target;
    var org_method = document.forms[0].method;
    var org_action = document.forms[0].action;
    var winWidth=920;
    var winHeight=600;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var frYear = document.forms[0].sch041FrYear.value;
    var frMonth = document.forms[0].sch041FrMonth.value;
    var frDay = document.forms[0].sch041FrDay.value;
    var frDate = _zeroPadding(frYear, 4) + _zeroPadding(frMonth, 2) + _zeroPadding(frDay, 2);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no , scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../schedule/sch120.do?sch120MoveMode=1&sch010DspGpSid=' + groupSid + '&sch120ResDspGpSid=' + resGroupSid + '&sch010DspDate=' + frDate;
    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'scheduleReserveWindowEx', newWinOpt);
        flagSubWindow = true;

        document.forms[0].target = "scheduleReserveWindowEx";
        document.forms[0].method = "post";
        document.forms[0].action = url;
        // サブミット
        document.forms[0].submit();
    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
    //戻す
    document.forms[0].target = org_target;
    document.forms[0].method = org_method;
    document.forms[0].action = org_action;
}

function _zeroPadding(str, length) {
    if (str.length >= length) {
      return str;
    }

    return new Array(length - str.length + 1).join("0") + str;
}


var subWindow;
var flagSubWindow = false;

function windowClose(){
    if(subWindow != null){
        subWindow.close();
    }
}

function afterNewWinOpenUser(win){
    win.moveTo(0,0);
    subWindow.focus();
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

/**
 * 施設予約画面用空き状況確認画面
 * mode 1:通常登録 2:拡張登録 3:一括登録
 * */
function openScheduleReserveWindowForReserve(mode) {
    //保存
    var org_target = document.forms[0].target;
    var org_method = document.forms[0].method;
    var org_action = document.forms[0].action;

    var winWidth=920;
    var winHeight=600;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var frDate = null;
    var moveMode = 0;
    if (mode == 1) {
        frYear = document.forms[0].rsv110SelectedYearFr.value;
        frMonth = document.forms[0].rsv110SelectedMonthFr.value;
        frDay = document.forms[0].rsv110SelectedDayFr.value;
        frDate = _zeroPadding(frYear, 4) + _zeroPadding(frMonth, 2) + _zeroPadding(frDay, 2);
    } else if (mode == 2) {
        frYear = document.forms[0].rsv111RsrDateYearFr.value;
        frMonth = document.forms[0].rsv111RsrDateMonthFr.value;
        frDay = document.forms[0].rsv111RsrDateDayFr.value;
        frDate = _zeroPadding(frYear, 4) + _zeroPadding(frMonth, 2) + _zeroPadding(frDay, 2);
        moveMode = 1;
    } else if (mode == 3) {
        frDate = document.forms[0].rsv210YrkFrom.value;
    }
    re = new RegExp(/(\d{4})(\d{1,2})(\d{1,2})/);
    if (!frDate.match(re)) {
	    var nowDate = new Date();
	    frYear = nowDate.getFullYear();
	    frMonth = _zeroPadding(String(nowDate.getMonth() + 1), 2)
	    frDay = _zeroPadding(String(nowDate.getDate()), 2);
	    
	    frDate = frYear + frMonth + frDay;
    }

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no , scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../reserve/rsv310.do?rsv310MoveMode=' + moveMode + '&popDspMode=' + mode + '&rsv310DspDate=' + frDate;
    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'scheduleReserveWindowForReserve', newWinOpt);
        flagSubWindow = true;

        document.forms[0].target = "scheduleReserveWindowForReserve";
        document.forms[0].method = "post";
        document.forms[0].action = url;
        // サブミット
        document.forms[0].submit();

    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
    //戻す
    document.forms[0].target = org_target;
    document.forms[0].method = org_method;
    document.forms[0].action = org_action;

}
