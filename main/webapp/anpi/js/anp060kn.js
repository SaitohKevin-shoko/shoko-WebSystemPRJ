function changePage(cmbObj) {
    document.forms[0].anp060knNowPage.value=cmbObj.options[cmbObj.selectedIndex].value;
    document.forms[0].CMD.value='anp060knpageChange';
    document.forms[0].submit();
}

function setfocus(){
    if (document.forms[0].anp060knScrollFlg.value == '1') {
        window.location.hash='js_label_sender';
    }
}

function openGrpUsrMailWindow(grpSid) {

    var winWidth=580;
    var winHeight=600;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../anpi/anp160.do?grpSid=' + grpSid + '&procMode=' + $("input:hidden[name=anp060ProcMode]").val() + '&anpiSid=' + $("input:hidden[name=anpiSid]").val();

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

function afterNewWinOpen(win){
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