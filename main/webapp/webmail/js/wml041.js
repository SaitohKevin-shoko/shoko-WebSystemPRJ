function wml041Init() {
    if (document.forms[0].wml041endFlg.value == 1) {
        window.opener.document.forms[0].CMD.value = 'init';
        window.opener.document.forms[0].submit();
        wml041thisClose();
    }
}

function wml041Entry() {
    document.forms[0].wml041CMD.value='saveSign';
    document.forms[0].submit();
}

function wml041Close() {
    if(wml041SubWindow != null){
        wml041SubWindow.close();
    }
}

function wml041thisClose() {
    window.close();
}

var wml041SubWindow;
var wml041FlagSubWindow = false;

function openSignWindow(signNo, mode, parentId) {
    var winWidth=738;
    var winHeight=390;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ",left=" + winx + ",top=" + winy + ",toolbar=no,scrollbars=yes";
    var url = '../webmail/wml041.do';
    url += '?wml041mode=' + mode;
    url += '&wml041No=' + signNo;
    url += '&wml041parentId=' + parentId;

    if (!wml041FlagSubWindow || (wml041FlagSubWindow && wml041SubWindow.closed)) {
        wml041SubWindow = window.open(url, 'thissite', newWinOpt);
        wml041FlagSubWindow = true;
        wml041SubWindow.focus();
    } else {
        wml041SubWindow.location.href=url;
        wml041SubWindow.focus();
        return;
    }
}


function openSignWindowEdit(signNo, parentId) {
  if (signNo <= 0) {
    document.getElementById('errorArea').innerHTML
      = '<div class="textError"><b>'
      + '署名を選択してください。'
      + '</b><br></div>';
  } else {
    openSignWindow(signNo, 1, parentId);
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