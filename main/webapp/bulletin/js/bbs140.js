function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].bbs140sortKey.value = fid;
    document.forms[0].bbs140orderKey.value = order;
    document.forms[0].submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        document.forms[0].bbs140pageNum2.value=document.forms[0].bbs140pageNum1.value;
    } else {
        document.forms[0].bbs140pageNum1.value=document.forms[0].bbs140pageNum2.value;
    }
    document.forms[0].CMD.value='changepage';
    document.forms[0].submit();
    return false;
}