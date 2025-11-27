function openUidHisWindow(uSid, uidNum) {

    var winWidth = 600;
    var winHeight = 450;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../user/usr090.do?targetUsrSid=' + uSid + "&targetUidNumber=" + uidNum;

    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'thissite', newWinOpt);
        flagSubWindow = true;
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