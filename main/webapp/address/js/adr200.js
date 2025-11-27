function parentReload(closeFlg) {
    if (closeFlg == true) {
        var CMD = parent.document.getElementsByName('CMD');
        CMD[0].value = 'init';

        document.forms[0].CMD.value='init';
        labelAddClose(false);
        parent.document.forms[0].submit();
    }
}

function labelAddClose(innerflg) {
	clearScreenParent(innerflg);
    parentEnable();
    window.parent.jQuery('#labelAddPanel').dialog('close');
}

function parentReadOnly() {
    setAllReadOnly(parent.document, true);
}

function parentEnable() {
    setAllReadOnly(parent.document, false);
}