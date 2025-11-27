function changeDefault() {
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function backTimeZoneInfList() {
    $(".js_user_list").children().remove();
    document.forms[0].CMD.value='backList';
    document.forms[0].submit();
    return false;
}