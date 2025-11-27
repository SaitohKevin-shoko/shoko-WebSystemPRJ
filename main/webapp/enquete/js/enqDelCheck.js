function setCheckEnq(entryCmd) {
    $("#kakuteibtn").live("click", function(){
        document.forms[0].CMD.value='checkEnq';
        var paramStr = "";
        paramStr += getFormData($('#enqForm'));
        $.ajax({
            async: true,
            url:  "../enquete/enq210kn.do",
            type: "post",
            data: paramStr

        }).done(function( data ) {
            //回答データあり 設問変更あり
            if (data.enqAnswerFlg == 1 && data.enqQchangeFlg == 1) {
              $('#enqAnswerDelete').dialog({
                  autoOpen: true,
                  bgiframe: true,
                  resizable: false,
                  width:580,
                  height: 160,
                  modal: true,
                  closeOnEscape: false,
                  overlay: {
                      backgroundColor: '#000000',
                      opacity: 0.5
                  },
                  buttons: {
                      'はい' : function() {
                          document.forms[0].CMD.value = entryCmd;
                          document.forms[0].enq210DelAnsFlg.value = "true";
                          document.forms[0].submit();

                          $(this).dialog('close');
                          loadingPop("処理中");
                      },
                      'キャンセル': function() {
                        $(this).dialog('close');
                      }
                  }
                  });
              //回答データあり 設問変更なし
              } else if (data.enqAnswerFlg == 1 && data.enqQchangeFlg == 0) {
                  $('#enqAnswerReset').dialog({
                      autoOpen: true,
                      bgiframe: true,
                      resizable: false,
                      width:420,
                      height: 160,
                      modal: true,
                      closeOnEscape: false,
                      overlay: {
                          backgroundColor: '#000000',
                          opacity: 0.5
                      },
                      buttons: {
                          '削除する': function() {
                              $("input:hidden[name='answerDataReset']").val(1);
                              document.forms[0].CMD.value = entryCmd;
                              document.forms[0].enq210DelAnsFlg.value = "true";
                              document.forms[0].submit();

                              $(this).dialog('close');
                              loadingPop("処理中");
                          },
                          '削除しない': function() {
                              $("input:hidden[name='answerDataReset']").val(0);
                              document.forms[0].CMD.value = entryCmd;
                              document.forms[0].enq210DelAnsFlg.value = "false";
                              document.forms[0].submit();

                              $(this).dialog('close');
                              loadingPop("処理中");
                          },
                          'キャンセル': function() {
                              $(this).dialog('close');
                            }
                      }
                  });
            //回答削除確認不要 （変更無し OR 回答無し）
            } else {
               document.forms[0].CMD.value = entryCmd;
               document.forms[0].submit();
            }
        }).fail(function( data ){
            //該当するデータがありません。
            alert('データなし');
        });
    });
}

function loadingPop(popTxt) {

    $('#loading_pop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 140,
        width: 250,
        modal: true,
        title: popTxt,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            hideBtn: function() {
            }
        }
    });

    $('.ui-button-text').each(function() {
        if ($(this).text() == 'hideBtn') {
            $(this).parent().parent().parent().addClass('border_top_none');
            $(this).parent().parent().parent().addClass('border_bottom_none');
            $(this).parent().after("<div style=\"border-top:0px;line-height:10px\" class=\"\">&nbsp;&nbsp;&nbsp;&nbsp;</div>");
            $(this).parent().remove();
        }
    })

}

function getFormData(formObj) {
    var formData = "";
    formData = formObj.serialize();
    return formData;
}

function setFormatDesc(descParam, formatParam) {
   document.getElementsByName(formatParam)[0].value
     = formatDesc(document.getElementsByName(descParam)[0].value, false);
}

function formatDesc(txtVal, type) {
  var lines;
  if (txtVal.indexOf('\n') < 0) {
      lines = [txtVal];
  } else {
      lines = txtVal.split('\n');
  }

  var formatTxt = '';
  for (idx = 0; idx < lines.length; idx++) {
    if (idx >= 1) {
        if (type) {
            formatTxt += '<br />';
        } else {
            formatTxt += '\n';
        }
    }
    if (type) {
        formatTxt += $('<div/>').text(lines[idx]).html();
    } else {
        formatTxt += $('<div/>').html(lines[idx]).text();
    }
  }

  return formatTxt;
}
