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

});