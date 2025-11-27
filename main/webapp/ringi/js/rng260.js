function change(cmd) {
    document.forms[0].CMD.value = cmd;
    document.forms[0].submit();
    return false;
}

$(function() {
    // 画面描画時に実行される処理
    $('.group_btn2').hide();

    if ($('#dairiKikanArea').length > 0) {
        //datepickerの初期化
        var dateStart  = setDatepicker($('#dairiKikanStart'));
        var dateFinish = setDatepicker($('#dairiKikanFinish'));

        $('#ui-datepicker-div').hide(); // 初期状態でDatePickerダイアログを非表示

        // 終了期間日付の使用設定判定(使用しないにチェックが入っているかで判別)
        if ($('#dairiKikan_02').is(':checked') == true) {
            radiocheck("off");  // 使用しない
        } else {
            radiocheck("on");   // 使用する
        }
    }
})

function changeGroup(cmd) {
    document.forms[0].CMD.value = cmd;
    document.forms[0].submit();
    return false;
}

function changeUser(cmd) {
    document.forms[0].CMD.value = cmd;
    document.forms[0].submit();
    return false;
}

function radiocheck(cmd) {
    var disp = document.getElementById("finish").style;
    if(cmd == "on") {
        disp.display='';
    } else {
        disp.display='none';
    }
}

function setDatepicker(elm) {
    var dates = null;
    if (elm != null) {
        dates = elm.datepicker({
            showAnim: 'blind',
            changeMonth: true,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            showButtonPanel: true,
            dateFormat:'yy/mm/dd',
            onSelect: function( selectedDate ) {
            }
        });
    }
    return dates;
}
