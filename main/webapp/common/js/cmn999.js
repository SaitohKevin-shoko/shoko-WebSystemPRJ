var subWindow;

function openErrReportWindow(url) {
    var winWidth = 500;
    var winHeight = 300;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;

    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'exceptionWindow', newWinOpt);
        flagSubWindow = true;
    } else {
        subWindow.location.href=url;
        subWindow.focus();
    }

    document.forms['errLogForm'].submit();
    return false;
}

function getCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}