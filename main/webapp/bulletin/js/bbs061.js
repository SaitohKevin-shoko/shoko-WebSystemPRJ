function buttonPush(cmd){
  document.forms[0].CMD.value=cmd;
  document.forms[0].submit();
  return false;
}

$(function(){
  //確認ダイアログ
  $(document).on("click", ".js_move_thread",function(e){
    var h = window.innerHeight / 2;
    $('#moveThreadCheck').dialog({
      position: {
        of : 'body',
        at: 'top+' + h,
        my: 'center'
      },
      autoOpen: true,
      bgiframe: true,
      resizable: false,
      dialogClass:'dialog_button',
      height:160,
      width: 400,
      modal: true,
      overlay: {
        backgroundColor: '#000000',
        opacity: 0.5
      },
      buttons: {
        はい: function() {
          var cmd = 'moveForumComp';
            var motoForum = $(':hidden[name="bbs010forumSid"]').val();
            var sakiForum = $('input[name="checkForum"]:checked').val();
            paramStr = 'CMD=' + cmd;
            $('input[name="bbs060ChkInfSid"]').each(function(i) {
              paramStr = paramStr + '&bbs060ChkInfSid=' + $(':hidden[name="bbs060ChkInfSid"]').eq(i).val();
            });
            paramStr = paramStr + '&bbs010forumSid=' + motoForum;
            paramStr = paramStr + '&checkForum=' + sakiForum;
            $(this).dialog('close');
            $.ajax({
              async: true,
              url:  "../bulletin/bbs061.do",
              type: "post",
              data: paramStr
            }).done(function( data ) {
              if (data["success"]) {
                $(':hidden[name="bbs061Kanryo"]').val("1");
                if (window.parent.closeMovePopup) {
                  window.parent.closeMovePopup();
                }
              } else if(data["validate_error"]) {
                var closeFlg = false;
                if (data["close_flg"]) {
                  closeFlg = true;
                }
                errorDialog(data["error_text"], closeFlg);
              } else {
                errorDialog("エラーが発生しました。", true);
              }
            }).fail(function(data){
              //エラーダイアログ表示
              errorDialog("エラーが発生しました。", true);
            });
          },
          いいえ: function() {
            $(this).dialog('close');
          }
      }
    });
  });
});

//エラーダイアログ
function errorDialog(msg, closeFlg) {
  $(".js_error_message").children().remove();
  var appendMsg = "<div>" + msg + "</div>";
  $(".js_error_message").append(appendMsg);
  var popHeight =  200;
  var h = window.innerHeight / 2;
  $('#errorDialog').dialog({
    position: {
        of : 'body',
        at: 'top+' + h,
        my: 'center'
    },
    autoOpen: true,
    bgiframe: true,
    resizable: false,
    dialogClass:'dialog_button',
    height:popHeight,
    width: 450,
    modal: true,
    overlay: {
      backgroundColor: '#000000',
      opacity: 0.5
    },
    buttons: {
      ＯＫ: function() {
        $(this).dialog('close');
        if (closeFlg) {
          $(':hidden[name="bbs061Kanryo"]').val("1");
          if (window.parent.closeMovePopup) {
            window.parent.closeMovePopup();
          }
        }
      },
    }
  });
}