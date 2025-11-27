function buttonPush(cmd){
    if (cmd == 1) {
        document.forms[0].CMD.value='set';
    } else if (cmd == 2) {
        document.forms[0].CMD.value='backToCir';
    }

    document.forms[0].submit();
    return false;
}