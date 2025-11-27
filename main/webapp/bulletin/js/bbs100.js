function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].bbs100sortKey.value = fid;
    document.forms[0].bbs100orderKey.value = order;
    document.forms[0].submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        document.forms[0].bbs100pageNum2.value=document.forms[0].bbs100pageNum1.value;
    } else {
        document.forms[0].bbs100pageNum1.value=document.forms[0].bbs100pageNum2.value;
    }
    document.forms[0].CMD.value='changepage';
    document.forms[0].submit();
    return false;
}