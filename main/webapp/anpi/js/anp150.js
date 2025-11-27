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

function changeUrlKbn() {
    var kbn = Number($("input:radio[name=anp150TargetKbn]:checked").val());
    if (kbn == 1) {
        $('#js_selectTarget').show();
    } else {
        $('#js_selectTarget').hide();
    }
}

function changeEnableDisable() {
    val = $("select[name='anp150SelectMail']").val();

    if (val == 0) {
        $("input[name=anp150OtherMail]").removeAttr("disabled");
    } else {
        $("input[name=anp150OtherMail]").attr("disabled", "disabled");
    }

}

$(function() {
    //URL
    changeUrlKbn();
    changeEnableDisable();
});