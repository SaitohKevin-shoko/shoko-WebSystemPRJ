function buttonPush(cmd) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function changeGroupCombo(){
    document.forms[0].CMD.value='rsv260_redsp';
    document.forms[0].submit();
    return false;
}

function changeShisetsuCombo(){
    document.forms[0].CMD.value='rsv260_redsp';
    document.forms[0].submit();
    return false;
}

function bodyLoad() {

    var admIdx = 0;
    for (i = 0; i < document.forms[0].rsv260GrpAdmKbn.length; i++) {
        if (document.forms[0].rsv260GrpAdmKbn[i].checked == true) {
            admIdx = i;
        }
    }
    var admVal = document.forms[0].rsv260GrpAdmKbn[admIdx].value;

    admChange(admVal);
}

function admChange(admKbn) {
    $('fieldset[name="saveUserUI"]').prop('disabled', (admKbn != '0'));
}