//function clickPeriod(cmd, pValue) {
//    document.forms[0].CMD.value=cmd;
//    document.forms[0].cir130memoPeriod.value=pValue;
//    document.forms[0].submit();
//    return false;
//}
//
//function moveDay(elmYear, elmMonth, elmDay, kbn) {
//
//    systemDate = new Date();
//
//    //「今日ボタン押下」
//    if (kbn == 2) {
//        $(elmYear).val(convYear(systemDate.getYear()));
//        $(elmMonth).val(systemDate.getMonth() + 1);
//        $(elmDay).val(systemDate.getDate());
//        return;
//    }
//
//    //「前日」or 「翌日」ボタン押下
//    if (kbn == 1 || kbn == 3) {
//
//        var ymdf = escape(elmYear.value + '/' + elmMonth.value + "/" + elmDay.value);
//        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
//        if (ymdf.match(re)) {
//
//            newDate = new Date(elmYear.value, elmMonth.value - 1, elmDay.value)
//
//            if (kbn == 1) {
//                newDate.setDate(newDate.getDate() - 1);
//            } else if (kbn == 3) {
//                newDate.setDate(newDate.getDate() + 1);
//            }
//
//            var newYear = convYear(newDate.getYear());
//            var systemYear = convYear(systemDate.getYear());
//
//            if (newYear < systemYear - 5 || newYear > systemYear + 5) {
//                $(elmYear).val('');
//            } else {
//                $(elmYear).val(newYear);
//            }
//
//            $(elmMonth).val(newDate.getMonth() + 1);
//            $(elmDay).val(newDate.getDate());
//
//        } else {
//
//            if (elmYear.value == '' && elmMonth.value == '' && elmDay.value == '') {
//                $(elmYear).val(convYear(systemDate.getYear()));
//                $(elmMonth).val(systemDate.getMonth() + 1);
//                $(elmDay).val(systemDate.getDate());
//            }
//        }
//    }
//}

$(function() {

    //アカウント選択ボタン
    $("#accountSelBtn").live("click", function(){

        /* アカウント選択ポップアップ */
        $('#accountSelPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 600,
            width: 800,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: {
              閉じる: function() {
                  $(this).dialog('close');
              }
            }
        });
    });

    //削除区分ラジオボタン
    $(".accountSelKbn").live("click", function(){
        $('#accountSelArea').toggle();
    });


    if ($('input[name=cir130SelKbn]:checked').val() == 0) {
        $('#accountSelArea').removeClass('display_none');
    } else {
        $('#accountSelArea').addClass('display_none');
    }

});