function hinaEdit(hinaKbn) {
    document.forms[0].CMD.value='hina_edit';
    document.forms[0].sml050HinaKbn.value = hinaKbn;
    document.forms[0].submit();
    return false;
}