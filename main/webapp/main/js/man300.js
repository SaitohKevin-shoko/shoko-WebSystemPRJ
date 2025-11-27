function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function buttonPush2(cmd, mod){
    document.forms[0].CMD.value=cmd;
    document.forms[0].cmd.value=mod;
    document.forms[0].submit();
    return false;
}

function selectGroup(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}