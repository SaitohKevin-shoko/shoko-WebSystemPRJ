function openAddressInfoWindow(adrSid) {

    var winWidth=580;
    var winHeight=600;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../address/adr270.do?adrSid=' + adrSid;

    if (!flagAddressSubWindow || (flagAddressSubWindow && addressSubWindow.closed)) {
        addressSubWindow = window.open(url, 'thissite', newWinOpt);
        flagAddressSubWindow = true;
        //afterNewWinOpenAddress(addressSubWindow);
    } else {
        addressSubWindow.location.href=url;
        addressSubWindow.focus();
        return;
    }
}

var addressSubWindow;
var flagAddressSubWindow = false;

function windowClose(){
  if(addressSubWindow != null){
    addressSubWindow.close();
  }
}

function afterNewWinOpenAddress(win){
  win.moveTo(0,0);
  addressSubWindow.focus();
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