function buttonPush(cmd) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='sortDetail';
    document.forms[0].sml050Sort_key.value = fid;
    document.forms[0].sml050Order_key.value = order;
    document.forms[0].submit();
    return false;
}

function changePage1() {
    document.forms[0].CMD.value='';
    for (i = 0; i < document.forms[0].sml050Slt_page1.length; i++) {
        if (document.forms[0].sml050Slt_page1[i].selected) {
            document.forms[0].sml050Slt_page2.value=document.forms[0].sml050Slt_page1[i].value;
            document.forms[0].sml050PageNum.value=document.forms[0].sml050Slt_page1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function changePage2() {
    document.forms[0].CMD.value='';
    for (i = 0; i < document.forms[0].sml050Slt_page2.length; i++) {
        if (document.forms[0].sml050Slt_page2[i].selected) {
            document.forms[0].sml050Slt_page1.value=document.forms[0].sml050Slt_page2[i].value;
            document.forms[0].sml050PageNum.value=document.forms[0].sml050Slt_page2[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function moveEdit(sid) {
    document.forms[0].CMD.value='edit';
    document.forms[0].selectedHinaSid.value=sid;
    document.forms[0].submit();
    return false;
}

function deleteHina(sid) {
    document.forms[0].CMD.value='delete';
    document.forms[0].selectedHinaSid.value=sid;
    document.forms[0].submit();
    return false;
}

function hinaInyo(sid) {
    if (document.forms[0].sml050ProcMode.value=='0') {
        document.forms[0].sml020ProcMode.value='7';
    }

    document.forms[0].CMD.value='hinaInyo';
    document.forms[0].selectedHinaSid.value=sid;
    document.forms[0].submit();
    return false;
}

$(function() {


    //アカウント選択ボタン
    $("#accountSelBtn").live("click", function(){

        /* アカウント選択ポップアップ */
        $('#accountSelPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 600,
            width: 800,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: {
              閉じる: function() {
                  $(this).dialog('close');
              }
            }
        });
    });
    //ヘッダー部分tableTop設定の初期化
    $('.js_table_top').tableTop().initTable();


});