function buttonPush(cmd, mod){
    document.forms[0].CMD.value=cmd;
    document.forms[0].cmd.value=mod;
    document.forms[0].submit();
    return false;
}

function changeGroupCombo(){
    document.forms[0].submit();
    return false;
}

function addUser(){
    document.forms[0].submit();
    return false;
}

function removeUser(){
    document.forms[0].submit();
    return false;
}

$(function () {

    $('#all_disp').live('click', function(){
        var winWidth=580;
        var winHeight=600;
        var winx = getCenterX(winWidth);
        var winy = getCenterY(winHeight);
        var schSid = $('input:hidden[name=sch010SchSid]').val();

        var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
        var url = '../schedule/sch220.do?schSid=' + schSid;

        if (!flagSubWindow || (flagSubWindow && subWindow.closed)) {
            subWindow = window.open(url, 'thissite', newWinOpt);
            flagSubWindow = true;

        } else {
            subWindow.location.href=url;
            subWindow.focus();
            return;
        }
    });
})

function getCenterX(winWidth) {
    var x = (screen.width - winWidth) / 2;
    return x;
  }

  function getCenterY(winHeight) {
    var y = (screen.height - winHeight) / 2;
    return y;
  }

function fileLinkClick(bin) {
    document.forms[0].CMD.value='040kn_fileDownload';
    document.forms[0].sch040knBinSid.value=bin;
    document.forms[0].submit();
    return false;
}