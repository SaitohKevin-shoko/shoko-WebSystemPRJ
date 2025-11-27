function changePage(id){
    if (id == 1) {
        document.forms[0].man170PageTop.value=document.forms[0].man170PageBottom.value;
    }
    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].man170SortKey.value = fid;
    document.forms[0].man170OrderKey.value = order;
    document.forms[0].submit();
    return false;
}

function tarminalChange(kbn) {

    var terminalKbn = 0;
    for (i = 0; i < document.forms[0].man170Terminal.length; i++) {
        if (document.forms[0].man170Terminal[i].checked == true) {
            terminalKbn = i;
        }
    }
    var terminalKbnVal = document.forms[0].man170Terminal[terminalKbn].value;

    if (terminalKbnVal == 0 || terminalKbnVal == 2) {
        for (i = 0; i < document.forms[0].man170Car.length; i++) {
            document.forms[0].man170Car[i].disabled=false;
        }
    } else {
        document.forms[0].man170Car.value=0;
        for (i = 0; i < document.forms[0].man170Car.length; i++) {
            document.forms[0].man170Car[i].disabled=true;
        }
    }

    if (kbn == 1) {
        document.forms[0].CMD.value='research';
        document.forms[0].submit();
        return false;
    }
}