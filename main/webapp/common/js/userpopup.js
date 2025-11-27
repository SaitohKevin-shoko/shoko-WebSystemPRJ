function openUserInfoWindow(userSid) {

    var winWidth=580;
    var winHeight=600;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../common/cmn100.do?userSid=' + userSid;

    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'thissite', newWinOpt);
        flagSubWindow = true;
        //afterNewWinOpenUser(subWindow);
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

function openUserIoWindow(uid, status){
    var winWidth=410;
    var winHeight=260;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);
    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../zaiseki/zsk011.do?uioUpdateUsrSid=' + uid + '&zsk011Status=' + status;

    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'zskwin', newWinOpt);
        flagSubWindow = true;
        //afterNewWinOpenUser2(subWindow);
        //win.moveTo(1024,768);
        //subWindow.focus();
    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
}

function getCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}