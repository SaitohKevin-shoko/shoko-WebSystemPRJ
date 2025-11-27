function cmn120ButtonPush(cmd){

    if (cmd == 1) {
        document.forms[0].CMD.value = 'setuser';
    } else if (cmd == 2) {
        document.forms[0].CMD.value = 'batoTo';
    } else if (cmd == 3) {
        document.forms[0].CMD.value = 'addMyGrpUser';
    } else if (cmd == 4) {
        document.forms[0].CMD.value = 'removeUser';
    } else if (cmd == 5) {
        document.forms[0].CMD.value = 'addUser';
    }

    document.forms[0].submit();
    return false;
}

function cmn120ChangeGrp() {
    document.forms[0].CMD.value = 'changeGrp';
    document.forms[0].submit();
    return false;
}

function cmn120Load() {
    var mp = document.forms[0].cmn120MovePage.value;
    if (mp == 1) {
        document.forms[0].CMD.value = 'movePage';
        document.forms[0].submit();
        return false;
    }
}