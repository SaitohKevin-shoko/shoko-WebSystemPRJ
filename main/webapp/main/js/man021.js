function buttonPush(cmd){
    if (cmd == 1) {
        document.forms[0].CMD.value='confirm';
    } else if (cmd == 2) {
        document.forms[0].CMD.value='backToList';
    }

    document.forms[0].submit();
    return false;
}
