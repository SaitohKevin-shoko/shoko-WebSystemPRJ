function editTimecard(cmd){
    //frm.CMD.value=cmd;
    document.forms['tcdmainForm'].CMD.value=cmd;
    document.forms['tcdmainForm'].submit();
    return false;
}
