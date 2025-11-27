function buttonCopy(cmd, mod){
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp130ProcMode.value=mod;
    document.forms[0].submit();
    return false;
}