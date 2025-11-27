function buttonPush(cmd){

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function initPluginUseConfirm() {
    if (document.forms['man280knForm'].man280useKbn.value == 1) {
        $('#pluginUseMember').show();
        $('#pluginUseMember2').show();
    } else {
        $('#pluginUseMember').hide();
        $('#pluginUseMember2').hide();
    }
}

function defaultImg(imgName) {
    document.getElementById(imgName).src="../common/images/spacer.gif";
}
