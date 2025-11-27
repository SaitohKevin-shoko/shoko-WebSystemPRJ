function searchKn(kana){
    document.forms[0].csvOut.value='0';
    document.forms[0].CMD.value='searchKn';
    document.forms[0].usr030SearchKana.value=kana;
    document.forms[0].submit();
    return false;
}

function buttonPush(cmd){
    document.forms[0].csvOut.value='0';
    document.forms[0].CMD.value=cmd;
    document.forms[0].processMode.value=cmd;
    document.forms[0].csvOut.value='0';
    document.forms[0].submit();
    return false;
}

function exportPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].csvOut.value='1';
    document.forms[0].submit();
    return false;
}

function exportExecute(){
    if (document.forms[0].csvOut.value==1) {
        url =       "../user/usr030.do?CMD=exp_ok&csvOut=1";
        navframe.location=url;
    }
}

function changeTab(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].csvOut.value='0';
    document.forms[0].submit();
    return false;
}

function moveDay(elmYear, elmMonth, elmDay, kbn) {

    systemDate = new Date();

    if (kbn == 2) {
        $(elmYear).val(convYear(systemDate.getYear()));
        $(elmMonth).val(systemDate.getMonth() + 1);
        $(elmDay).val(systemDate.getDate());
        return;
    }

    if (kbn == 1 || kbn == 3) {

      var ymdf = escape(elmYear.value + '/' + elmMonth.value + "/" + elmDay.value);
    re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

        newDate = new Date(elmYear.value, elmMonth.value - 1, elmDay.value)

            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getYear());
            var systemYear = convYear(systemDate.getYear());

            if (newYear < systemYear - 50 || newYear > systemYear + 0) {
                $(elmYear).val('');
            } else {
                $(elmYear).val(newYear);
            }
            $(elmMonth).val(newDate.getMonth() + 1);
            $(elmDay).val(newDate.getDate());

        } else {

            if (elmYear.value == '' && elmMonth.value == '' && elmDay.value == '') {
                $(elmYear).val(convYear(systemDate.getYear()));
                $(elmMonth).val(systemDate.getMonth() + 1);
                $(elmDay).val(systemDate.getDate());
            }
        }
    }
}


function clearDate(year, month, day){
    day.val('');
    month.val('');
    year.val('');
}

$(function(){
   /* hover:click */
    $(".js_listUsrClick").live("click", function(){
        var usrKana = $(this).data('kana');
        searchKn(usrKana)
    });
});
