
function openSisetuSyosai(sisetuSid, mode) {

    var winWidth=580;
    var winHeight=500;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../reserve/rsv070.do?rsv070RsdSid=' + sisetuSid;
    if (mode != undefined) {
      url += '&rsv070RsdMode=' + mode;
    }

    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'thissite', newWinOpt);
        flagSubWindow = true;
        afterRsvNewWinOpen(subWindow);
    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
}
function openSisetuYoyaku(procmode, yoyakuSid) {

    var winWidth=700;
    var winHeight=700;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight) - 30;

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../reserve/rsv110.do?rsv110ProcMode=' + procmode + '&rsv110RsySid=' + yoyakuSid;

    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'thissite', newWinOpt);
        flagSubWindow = true;
        afterRsvNewWinOpen(subWindow);
    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
}

var subWindow;
var flagSubWindow = false;

function windowClose(){
    if(subWindow != null){
        try {
          subWindow.close();
        } catch (e) {}
    }
}

function afterRsvNewWinOpen(win){
    //win.moveTo(0,0);
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