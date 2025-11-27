function changePage(id){
    if (id == 1) {
        document.forms[0].bbs041page1.value=document.forms[0].bbs041page2.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function buttonPush(cmd){

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function clickResult(bfiSid, btiSid) {
    document.forms[0].CMD.value='moveResult';
    document.forms[0].bbs010forumSid.value=bfiSid;
    document.forms[0].threadSid.value=btiSid;
    document.forms[0].submit();
    return false;
}
