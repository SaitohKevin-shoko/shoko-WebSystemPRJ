function changeGroupCombo(){
    document.forms[0].CMD.value='back_to_import_input';
    document.forms[0].tcd150SltUser.value='-1';
    document.forms[0].submit();
    return false;
}