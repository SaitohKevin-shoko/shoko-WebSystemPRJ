
function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}


function sort(orderKey, sortKbn){
    document.forms[0].CMD.value='init';
    document.forms[0].orderKey.value=orderKey;
    document.forms[0].sortKbn.value=sortKbn;
    document.forms[0].submit();
    return false;
}


function mode(mode){
    document.forms[0].CMD.value='init';
    document.forms[0].rngProcMode.value=mode;
    document.forms[0].submit();
    return false;
}


function changePage(id){
    if (id == 0) {
        document.forms[0].dspPage.value=document.forms[0].pageTop.value;
    } else if (id == 1) {
        document.forms[0].dspPage.value=document.forms[0].pageBottom.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}


function template(mode, move){
    document.forms[0].CMD.value=move;
    document.forms[0].rngTemplateMode.value=mode;
    document.forms[0].submit();
    return false;
}

function addEditCategory(catSid, kbn, cmd) {
    document.forms[0].rng140ProcMode.value=kbn;
    document.forms[0].rng140CatSid.value=catSid;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}
