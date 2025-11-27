function initLoad() {
    if (document.forms[0].rngTemplateMode.value == "1") {
        if ($('input[name=rng140UserLimit]:checked').val() == 0) {
            document.forms[0].noUseLimit.checked = true;
            document.forms[0].useLimit.checked = false;
        } else {
            document.forms[0].noUseLimit.checked = false;
            document.forms[0].useLimit.checked = true;
        }
    hideOrDsp();
    initLimitType();
    }
}

function pushAddDel(){
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function hideOrDsp() {

    if ($('input[name=rng140UserLimit]:checked').val() == 1) {
        $(limitType).show();
    } else {
        $(limitType).hide();
    }
}

function initLimitType() {


}

function changeDsp(id, messageKey) {


}