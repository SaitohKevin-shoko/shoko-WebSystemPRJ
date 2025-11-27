function ptlImageEntry() {
    document.forms[0].CMD.value = 'fileUpload';
    document.forms[0].submit();
    return false;
}

function checkStatus() {

    var decision = document.forms[0].ptl160Decision.value;
    if (decision == 1) {
        window.close();
        window.opener.document.forms[0].CMD.value='subwindow_close_ok';
        window.opener.document.forms[0].submit();
    }
}

var ptlImageSubWindow;
var flagPtlImageSubWindow = false;

function openPtlImagePopup(cmdMode, portletSid, imgId) {
    var winWidth=545;
    var winHeight=250;
    var winx = getPtlCenterX(winWidth);
    var winy = getPtlCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ",left=" + winx + ",top=" + winy + ",toolbar=no,scrollbars=yes";

    var url = '../portal/ptl160.do';
    url = url + '?ptlCmdMode=' + cmdMode;
    url = url + '&ptlPortletSid=' + portletSid;
    url = url + '&ptlPortletImageSid=' + imgId;

    if (!flagPtlImageSubWindow || (flagPtlImageSubWindow && ptlImageSubWindow.closed)) {
        ptlImageSubWindow = window.open(url, 'thissite', newWinOpt);
        flagPtlImageSubWindow = true;
        ptlAfterNewWinOpen(ptlImageSubWindow);
    } else {
        ptlImageSubWindow.location.href=url;
        ptlImageSubWindow.focus();
        return;
    }
}

function windowClose() {
  if (ptlImageSubWindow != null) {
    ptlImageSubWindow.close();
  }
}

function ptlAfterNewWinOpen(win) {
  ptlImageSubWindow.focus();
  return;
}

function getPtlCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getPtlCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}

function ptlImagePopupClose() {
  window.close();
}

