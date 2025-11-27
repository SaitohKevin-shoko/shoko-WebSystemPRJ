function changePage(id){
    if (id == 1) {
        document.forms[0].bbs020page1.value=document.forms[0].bbs020page2.value;
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

function buttonPushWithId(cmd, sid){

    document.forms[0].CMD.value=cmd;
    document.forms[0].bbs020forumSid.value=sid;
    document.forms[0].submit();
    return false;
}
