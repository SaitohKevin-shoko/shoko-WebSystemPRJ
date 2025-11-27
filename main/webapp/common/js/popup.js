var subWindow;
var flagSubWindow = false;

function openZaisekiInfoWindow() {
    var winWidth=550;
    var winHeight=610;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = 'width=' + winWidth + ', height=' + winHeight + ', toolbar=no ,scrollbars=yes, resizable=yes , left=' + winx + ', top=' + winy;
    var url = '../zaiseki/zsk010.do';
    if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'thissite', newWinOpt);
        flagSubWindow = true;
        afterNewWinOpen(subWindow);
    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
}


function openSubWindow(url){
    var winWidth=550;
    var winHeight=610;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    subWindow = window.open(url, 'thissite', opt);
    return false;
}

function openSubWindowLarge(url){
    var winWidth=700;
    var winHeight=700;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    subWindow = window.open(url, 'thissite', opt);
    return false;
}

function openSubWindowMiddle(url){
    var winWidth=550;
    var winHeight=350;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    subWindow = window.open(url, 'thissite', opt);
    return false;
}

function openSubWindowSet(url, wid, hei){
    var winWidth=wid;
    var winHeight=hei;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    subWindow = window.open(url, 'thissite', opt);
    return false;
}

function windowClose() {
    if(subWindow != null){
        subWindow.close();
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