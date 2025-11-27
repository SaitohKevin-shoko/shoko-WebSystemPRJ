function editCompany(acoSid, procMode) {
    document.forms[0].adr110ProcMode.value = procMode;
    document.forms[0].adr110editAcoSid.value = acoSid;
    document.forms[0].adr110BackId.value = 'adr110kn';
    buttonPush('editCompany');
}

function backInput(cmd) {

    if (document.forms[0].adr100backFlg.value == '3') {
        document.forms[0].adr100backFlg.value = '2';
    }
    buttonPush(cmd);
}

function editAddress(adrSid) {
    document.forms[0].adr010EditAdrSid.value = adrSid;
    buttonPush('editAdrData');
}
