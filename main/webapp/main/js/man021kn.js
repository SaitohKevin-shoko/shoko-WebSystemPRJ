function buttonPush(cmd){
    if (cmd == 1) {
        document.forms[0].CMD.value='decision';
    } else if (cmd == 2) {
        document.forms[0].CMD.value='backToInput';
    }

    document.forms[0].submit();
    return false;
}
