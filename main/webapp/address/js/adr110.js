function editCompanyBase(index) {
    document.forms[0].adr111editCompanyBaseIndex.value = index;

    buttonPush('editCompanyBase');
}

function deleteCompanyBase(index) {
    document.forms[0].adr110deleteCompanyBaseIndex.value = index;

    buttonPush('deleteCompanyBase');
}

function okPush(cmd) {
    if (document.forms[0].adr100backFlg.value == '2') {
        document.forms[0].adr100backFlg.value = '3';
    }
    buttonPush(cmd);
}