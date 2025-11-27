function parentReload(closeFlg){
    if (closeFlg == true) {
        var CMD = parent.document.getElementsByName('CMD');
        CMD[0].value = 'posisionSet';

        parentEnable();
        parent.document.forms[0].submit();
    }
}
function posclose(innerflg){

    window.parent.jQuery('#subPanel').dialog('close');
    window.parent.jQuery(".baseBtn").prop("disabled", false);
    parentEnable();
}
function parentReadOnly(){

    setAllReadOnly(parent.document, true);

    var childframe = parent.document.getElementsByName('childframe');
    if (childframe != null && childframe.length > 0) {

        for (i = 0; i < childframe.length; i++) {
            var childdoc = parent.document.getElementsByName(childframe[i].value);
            setAllReadOnly(parent[childframe[i].value].document, true);
        }
    }
}
function parentEnable(){
    setAllReadOnly(parent.document, false);

    var childframe = parent.document.getElementsByName('childframe');
    if (childframe != null && childframe.length > 0) {

        for (i = 0; i < childframe.length; i++) {
            var childdoc = parent.document.getElementsByName(childframe[i].value);
            setAllReadOnly(parent[childframe[i].value].document, false);
        }
    }
}

