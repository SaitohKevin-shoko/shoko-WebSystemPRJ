var winWidth=1000,
    winHeight=900,
    wmlSubWindow,
    wmlFlagSubWindow = false;

function openAddress(paramName) {
    var url = '../address/adr010.do?adr010webmail=1&adr010webmailAddress=' + paramName;
    return openEditorSubWindow(url);
}

function openSyain(paramName) {
    var url = '../user/usr040.do?usr040webmail=1&usr040webmailAddress=' + paramName;
    return openEditorSubWindow(url);
}

function openSyainPlus(paramName) {
    var url = '../user/usr040.do?usr040webmail=1&usr040webmailAddress=' + paramName;
    url += '&usr040webmailType=1';
    return openEditorSubWindow(url);
}

function openDestlistSubWindow(destlistId, paramName) {
    var url = '../webmail/wml290.do?wmlEditDestList=' + destlistId + ' &wml290webmailAddress=' + paramName;
    return openEditorSubWindow(url);
}

function openEditorSubWindow(url) {
    if ($(window).height() - 20 < 900) {
        winHeight = $(window).height() - 20;
        if (winHeight < 100) {
            winHeight = 100;
        }
    }

    var winx = getWmlCenterX(winWidth);
    var winy = getWmlCenterY(winHeight);
    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;

    if (!wmlFlagSubWindow || (wmlFlagSubWindow && wmlSubWindow.closed)) {
        wmlSubWindow = window.open(url, 'thissite', newWinOpt);
        wmlFlagSubWindow = true;
    } else {
        wmlSubWindow.location.href=url;
        wmlSubWindow.focus();
        return;
    }

    return false;
}

function wmlEditorWindowClose(){
    if(wmlSubWindow != null){
        wmlSubWindow.close();
    }
}

function wmlAfterNewWinOpenUser(win){
    win.moveTo(0,0);
    wmlSubWindow.focus();
    return;
}

function getWmlCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getWmlCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}

$(function(){
    /* hover */
    $('.js_listHover').on({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

    /* hover:click */
    $(document).on('click', '.js_listClick', function() {
        var checkObj = $('#' + $(this).parent().data("sid"));
        checkObj.prop('checked', !checkObj.is(':checked'));
    });
});
