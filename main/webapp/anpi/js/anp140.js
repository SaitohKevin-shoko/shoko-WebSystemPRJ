function changePage(cmbObj) {
    document.forms[0].anp140NowPage.value=cmbObj.options[cmbObj.selectedIndex].value;
    document.forms[0].CMD.value='anp140pageChange';
    document.forms[0].submit();
}

function setfocus(){
    if (document.forms[0].anp140ScrollFlg.value == '1') {
        window.location.hash='js_label_sender';
    }
}

function sortList(colIndex, order) {
    if (document.forms[0].anp140SortKeyIndex.value != colIndex) {
        document.forms[0].anp140OrderKey.value=1;
    }
    document.forms[0].anp140SortKeyIndex.value=colIndex;
    document.forms[0].CMD.value='anp140sortList';
    document.forms[0].submit();
}

function openGrpUsrRirekiWindow(anpSid,grpSid) {

    var winWidth=580;
    var winHeight=600;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '../anpi/anp170.do?anpSid=' + anpSid + '&grpSid=' + grpSid;

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

  $(function() {
       /* hover */
      $('.js_listHover').live({
          mouseenter:function (e) {
              $(this).children().addClass("list_content-on");
              $(this).prev().children().addClass("list_content-topBorder");
          },
          mouseleave:function (e) {
              $(this).children().removeClass("list_content-on");
              $(this).prev().children().removeClass("list_content-topBorder");
          }
      });
  });