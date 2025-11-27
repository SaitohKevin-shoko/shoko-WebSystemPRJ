function parentReload(closeFlg) {
    if (closeFlg == true) {
        var CMD = parent.document.getElementsByName('CMD');
        CMD[0].value = 'init';

        document.forms[0].CMD.value='init';
        parent.document.forms[0].adrPosition.value=document.forms[0].adr180position.value;
        posclose(false);
        parent.document.forms[0].submit();
    }
}

function posclose(innerflg) {
    clearScreenParent(innerflg);
    parentEnable();
    window.parent.jQuery('#subPanel').dialog('close');
}

function parentReadOnly() {
    setAllReadOnly(parent.document, true);
}

function parentEnable() {
    setAllReadOnly(parent.document, false);
}