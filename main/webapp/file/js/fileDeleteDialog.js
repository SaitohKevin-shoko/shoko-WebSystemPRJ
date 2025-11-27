function showFileDeleteDialog(formName, deleteCmd, fileNameList, errlKbn, commentFlg) {

    $('#deleteFileDialogMsgArea').html("");

    let delConfirmMsg = "よろしいですか。" + "<br>";
    if (errlKbn == 1) {
        delConfirmMsg = "<div class=\"mt5 mb5\">"
                        + "ただし、このファイルは電子帳簿保存法によって一時的に保存されます。<br>"
                        + "※保存されたデータは詳細検索より確認可能。<br>"
                        + "</div>"
                        + "よろしいですか。";
    }

    if (fileNameList.length == 1) {
        delConfirmMsg = "[" + htmlEscape(fileNameList[0]) + "]を削除します。" + "<br>"
                        + delConfirmMsg;
    } else {
        delConfirmMsg = "以下を削除します。" + "<br>"
                        + delConfirmMsg;

        delConfirmMsg += "<div class=\"mt20\">";
        delConfirmMsg += "削除対象";
        delConfirmMsg += "<div class=\"ml10\">";

        let fileCount = fileNameList.length; 
        for (idx = 0; idx < fileCount && idx < 5; idx++) {
            delConfirmMsg += "・" + htmlEscape(fileNameList[idx]) + "<br>";
        }

        if (fileCount > 5) {
            delConfirmMsg += "...他" + (fileCount - 5) + "件";
        }

        delConfirmMsg += "</div>";
        delConfirmMsg += "</div>";

    }
    $('#deleteFileDialogMsgArea').append(delConfirmMsg);

    if (commentFlg) {
        $('#fileDeleteDialogCommentArea').removeClass('display_none');
    } else {
        $('#fileDeleteDialogCommentArea').addClass('display_none');
    }
    $('textarea[name="deleteFileDialogComment"]').val('');
    showLengthStr('', 1000, 'deleteFileDialogInputLength');
    openFileDeleteDialog(formName, deleteCmd);
}

function openFileDeleteDialog(formName, deleteCmd) {
    var widthStr = 550;
    var heightStr = 'auto';

    $('#deleteFileDialog').dialog({
        dialogClass:"fs_14",
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        height: heightStr,
        width: widthStr,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [
            {
                text: 'OK',
                click:  function() {
                    let opeComment = $('textarea[name="deleteFileDialogComment"]').val();
                    let opeCommentParamName = $('input:hidden[name="deleteFileDialogCommentParamName"]').val();
                    $('input:hidden[name="' + opeCommentParamName + '"]').val(opeComment);
                    document.getElementsByName(formName)[0].CMD.value = deleteCmd;
                    document.getElementsByName(formName)[0].submit();

                }
            },
            {
                text: 'キャンセル',
                click:  function() {
                    $(this).dialog('close');
                }
            }
        ]
    });
}

function htmlEscape(s) {

    return $('<span></span>').text(s).html()

}
