
function moveDay(elm, kbn) {

    systemDate = new Date();

    //「今日ボタン押下」
    if (kbn == 2) {
        $(elm).val(systemDate.toISOString().split("T")[0].replaceAll("-", "/"));
        return;
    }

    //「前日」or 「翌日」ボタン押下
    if (kbn == 1 || kbn == 3) {

        var ymdf = $(elm).val();
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

            newDate = new Date(ymdf)
            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = newDate.getFullYear();
            var systemYear = systemDate.getFullYear();

            if (newYear >= systemYear && newYear <= systemYear + 1) {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(elm).val(year + "/" + month + "/" + day);
            }
        } else {
            if ($(elm).val() == null) {
                $(elm).val(newDate.toISOString().split("T")[0].replaceAll("-", "/"));
            }
        }
    }
}
function clickPeriod(cmd, pValue) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].cir040memoPeriod.value=pValue;
    document.forms[0].submit();
    return false;
}

$(function() {

    //宛先選択ボタン
    $(".js_cirSendUser").on("click", function(){
        $(this).ciratesaki('open');

    });

});


function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

function htmlEscape(s){
    s=s.replace(/&/g,'&amp;');
    s=s.replace(/>/g,'&gt;');
    s=s.replace(/</g,'&lt;');
    return s;
}

function cmn110DropBan() {
    return $('body').find('div').hasClass('ui-widget-overlay');
}