function unload(){
    document.forms[0].CMD.value = 'formUnload';
    document.forms[0].formUnload.value='true';
    document.forms[0].submit();
    return false;
}

$(function(){
    //ツリー表示初期化
    $("#tree").treeview({
        name:'cmn210tree',
        allOpen:$('#sidetreecontrol a').eq(1),
        allClose:$('#sidetreecontrol a').eq(0),
        duration:'fast'
    });
});