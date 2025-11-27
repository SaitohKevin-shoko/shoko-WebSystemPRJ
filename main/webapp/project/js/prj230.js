$(function() {
    /* 状態変更ボタン */
    $(document).on("click", ".changeStatus", function(){

        $('#dialogChangeStatus').dialog('open');

    });

    /* 状態変更確認 */
    $('#dialogChangeStatus').dialog({
        autoOpen: false,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 160,
        width: 350,
        modal: true,
        overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
        },
        buttons: {
          はい: function() {
              document.forms[0].CMD.value = 'updateClick';
              document.forms[0].submit();
              $(this).dialog('close');
          },
          いいえ: function() {
            $(this).dialog('close');
          }
        }
    });
});