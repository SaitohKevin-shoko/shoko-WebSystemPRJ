function rngCsvExportButton(screenId, cmd) {
    loadingCsvPop('出力中');

    document.forms[0].CMD.value = cmd;
    var paramStr = $('*[name=' + screenId + 'Form]').serialize();
    var url = '../ringi/' + screenId + '.do';

    $.ajax({
        async: true,
        url: url,
        type: 'post',
        data: paramStr
    }).done(function( data ) {
        try {
            if (data.result == "true") {
                document.forms[0].CMD.value = 'csvDownload';
                document.forms[0].submit();
            } else {
                var errorCode = data.errorCode;
                if (errorCode == 1) {
                    alert('検索条件が不正です。');
                } else if (errorCode == 2) {
                    alert('該当する[稟議]は存在しません。');
                }
            }
        } catch (ae) {
            alert('エクスポートに失敗しました。');
        } finally {
            $('#loading_csv_pop').dialog('close');
        }
    }).fail(function(data){
        alert('エクスポートに失敗しました。');
        $('#loading_csv_pop').dialog('close');
    });
}

/*読み込み中ダイアログ*/
function loadingCsvPop(popTxt) {

    $('#loading_csv_pop').dialog({
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 130,
        width: 250,
        modal: true,
        title: popTxt,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
        }
    });

    $('.ui-button-text').each(function() {
        if ($(this).text() == 'hideBtn') {
            $(this).parent().parent().parent().addClass('border_top_none');
            $(this).parent().parent().parent().addClass('border_bottom_none');
            $(this).parent().remove();
        }
    })
}
