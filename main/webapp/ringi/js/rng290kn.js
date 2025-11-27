$(function() {
    /* hover */
    $('.js_listHover').on({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });
    /* hover:click */
    $(".js_listClick").on("click", function(e){
        var sid = $(this).parent().attr("data-id");
        rng290knApiTest(sid);
    });

    //接続テスト実行
    $(document).on('click', '.js_rng290knApiTest_doBtn', function() {
          $('input[name="CMD"]').val('rng290knApiTest');
          const apiId = $(this).data('apiid');
          const dataIndex = $(this).data('index');
          const dialogScroll = $("#apitest_dialog").scrollTop();

          $('input[name="rng290knTestApiId"]').val(apiId);
          $('input[name="rng290knTestApiIndex"]').val(dataIndex);

          //エラーメッセージの削除
          $(".js_errorMsg").remove();

          var param = new Array();
          param = param.concat($(document.forms[0]).serializeArray());
          param = param.concat($(document.forms[1]).serializeArray());
          param = param.concat($(document.forms[2]).serializeArray());
          $('#apitest_dialog').dialog('close');
          loadingPop(msglist["nowLoading"]);

          $.ajax({
              async: true,
              url:  "../ringi/rng290kn.do",
              type: "post",
              data: param
          }).done(function( data ) {

              if (data["success"]) {
                 $('.js_testRequest' + dataIndex).val(data["request"]);
                 $('.js_testResponce' + dataIndex).val(data["responce"]);
              } else if ($(data).length > 0) {
                 //画面内のHTMLをエラー画面のHTMLで置き換え
                 $('html').html('');
                 $('body').append($(data));
              }

              if ($('#loading_pop').hasClass('ui-dialog-content')) {
                $('#loading_pop').dialog('close');
              }
              apiTestDialog();

              //API実行成功時、スクロール位置を元に戻す
              if (data["success"]) {
                  $("#apitest_dialog").scrollTop(dialogScroll);
              }
          });
     });

});

function rng290knApiTest(apiId) {
    $('input[name="CMD"]').val('rng290knApiDialog');
    $('input[name="rng290knTestApiId"]').val(apiId);

    var param = new Array();
    param = param.concat($(document.forms[0]).serializeArray());
    param = param.concat($(document.forms[1]).serializeArray());
    param = param.concat($(document.forms[2]).serializeArray());
    loadingPop(msglist["nowLoading"]);

    $.ajax({
        async: true,
        url:  "../ringi/rng290kn.do",
        type: "post",
        data: param
    }).done(function( data ) {
        if ($('#loading_pop').hasClass('ui-dialog-content')) {
          $('#loading_pop').dialog('close');
        }

        if (data["success"]) {

           let apiHtml = '';
           const multiLine = (data["request"].length > 1);
           for (idx = 0; idx < data["request"].length; idx++) {
              if (multiLine) {
                apiHtml += (idx + 1) + msglist["lines"] + '<div class="mt0 mb10 p5 bor1">';
              }

              apiHtml +=
                '<div id="rng290knApiRequest' + idx + '">'
                + '  ' + msglist["request"] + '<br>'
                + '  <textarea class="w100 js_testRequest' + idx + '" rows="5" readonly></textarea>'
                + '</div>'
                + '<div class="txt_c mt20">'
                + '  <button type="button" class="baseBtn js_rng290knApiTest_doBtn w100 mt20"'
                + ' data-apiid="' + apiId + '"'
                + ' data-index="' + idx + '">'
                + '    <img class="btn_classicImg-display" src="../common/images/classic/icon_ok.png" alt="' + msglist["execution"] + '">'
                + '    <img class="btn_originalImg-display" src="../common/images/original/icon_check.png" alt="' + msglist["execution"] + '">'
                + '    ' + msglist["execution"]
                + '  </button>'
                + '</div>'
                + '<div class="mt20">'
                + '  ' + msglist["responce"] + '<br>'
                + '  <textarea class="w100 js_testResponce' + idx + '" rows="5" readonly ></textarea>'
                + '</div>';

              if (multiLine) {
                apiHtml += '</div>';
              }
           }
           $('#rng290knApiResult').html(apiHtml);

           for (idx = 0; idx < data["request"].length; idx++) {
             $('.js_testRequest' + idx).val(data["request"][idx]);
           }

        } else if ($(data).length > 0) {
           //画面内のHTMLをエラー画面のHTMLで置き換え
           $('html').html('');
           $('body').append($(data));
           return;
        }

        apiTestDialog();
    });

}

/* API確認ダイアログ */
function apiTestDialog() {
    $('#apitest_dialog').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        modal: true,
        dialogClass:'dialog_button',
        height: 500,
        width: '80%',
        overflow: 'auto',
        overlay: {
            backgroundColor: '#FF0000',
            opacity: 0.5
        },
        buttons:[{
                text: msglist['close'],
                click:  function() {
                    $('#apitest_dialog').dialog('close');
                }
            }]
        ,close: function() {
        }
    });
}

/*読み込み中ダイアログ*/
function loadingPop(popTxt) {

    $('#loading_pop').dialog({
        autoOpen: true,  // hide dialog
        dialogClass:"fs_13",
        resizable: false,
        height: 130,
        width: 250,
        modal: true,
        title: popTxt,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        closeOnEscape:false,
        close: function() {
        },
        open: function() {
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

function rng290knDownload(fileId, dirId) {
	
    var formUrl = '../common/cmn110.do';
    formUrl += '?CMD=fileDownload';
    formUrl += '&cmn110DlFileId=' +  fileId;
    formUrl += '&cmn110Mode=1';
    formUrl += '&cmn110pluginId=ringi';
    formUrl += '&tempDirId=rng020';
    if (dirId) {
      formUrl += '&cmn110TempDirPlus=' + dirId;
    }

    location.href = formUrl;
}
