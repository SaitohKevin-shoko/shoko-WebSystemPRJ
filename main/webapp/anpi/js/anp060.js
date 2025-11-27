function selectUsersList(chkObj, chkTargetName) {

    var flg = chkObj.checked;
    var defUserAry = document.forms[0].elements[chkTargetName].options;
    var defLength = defUserAry.length;
    for (i = defLength - 1; i >= 0; i--) {
        if (defUserAry[i].value != -1) {
            defUserAry[i].selected = flg;
        }
    }
}

function setfocus(){
    if (document.forms[0].anp060ScrollFlg.value == '1') {
        window.location.hash='js_label_sender';
    }
}

function setKnrenMode() {

    var checked = $('#knrenFlg').prop('checked');
    if (checked) {
        $('#js_lmtinput').show();
        $('#js_lmtinput2').show();
        $('.js_knren_top').show();
    } else {
        $('#js_lmtinput').hide();
        $('#js_lmtinput2').hide();
        $('.js_knren_top').hide();
    }
}

$(function() {
    setKnrenMode();
});