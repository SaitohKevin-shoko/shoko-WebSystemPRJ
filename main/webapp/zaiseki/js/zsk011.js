function parentReload(closeFlg){
    if (closeFlg == true) {
        var CMD = parent.document.getElementsByName('CMD');
        CMD[0].value = 'posisionSet';

        parentEnable();
        parent.document.forms[0].submit();
    }
}
function posclose(innerflg){

    clearScreenParent(innerflg);

    parent.YAHOO.subbox.subPanel.hide();
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

// �o�^�{�^���C�x���g
function checkStatus() {
    var paramStr = "";
    for(var i = 0; i < document.forms[0].elements.length; i++) {
        var key = document.forms[0].elements[i].name;  // �p�����[�^�L�[
        var val = document.forms[0].elements[i].value; // �p�����[�^�l

        // �v�f�����W�I�{�b�N�X�̏ꍇ���`�F�b�N���ڂ̂ݒ��o
        if (document.forms[0].elements[i].type == "radio") {
            if (!document.forms[0].elements[i].checked) {
                continue;
            }
        }

        // form �ɂ���p�����[�^�𕶎���Ƃ��ĘA�����擾
        if (key.length > 0 && val.length > 0) {
            if (paramStr.length > 0) paramStr += "&";
            paramStr += (key + "=" + val);
        }
    }

    if (paramStr.length > 0) {
        // �f�[�^�X�V�ʐM
        $.ajax({
            async: false,
            url:"../zaiseki/zsk011.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
           // �f�[�^�X�V�����������ׁA�E�B���h�E�����
            window.opener.document.forms[0].CMD.value='reload';
            window.opener.document.forms[0].submit();
            window.close();
        }).fail(function(data){
            alert('error');
        });
    }
    return false;
}
