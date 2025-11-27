function changeGroupCombo(){
    document.forms[0].submit();
    return false;
}

function changeGroupCombo2(){
    document.forms[0].CMD.value='changeGroup';
    document.forms[0].submit();
    return false;
}

function fileLinkClick(binSid) {
    document.forms[0].CMD.value='fileDownload';
    document.forms[0].rng020BinSid.value=binSid;
    document.forms[0].submit();
    return false;
}

function scroll() {
    if (document.forms[0].rng020ScrollFlg.value=='1') {
        window.location.hash='add_user';
    }
}

function templateFileLinkClick(fileId) {
    document.forms[0].CMD.value='templateFileDownload';
    document.forms[0].rng020TemplateFileId.value=fileId;
    document.forms[0].submit();
    return false;
}
/**
 * 経路選択処理
 */
function selectChannelTemplate(rctSid, kbn, usrSid) {
    $('#keirotemplateselect').dialog('close');
    document.forms[0].loadRctSid.value= rctSid;
    document.forms[0].scrollY.value=$(window).scrollTop();
    buttonPush('reload');
    return false;
}
/**
 * 入力変更による経路変更メッセージの表示
 */
function dspUpdateKeiro() {
    $('#keiroupdatebox').show();
}


$(function() {

    /* 行 hover */
    $(document).on({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    },'.js_listHover');

  //タイトル項目でのエンターを禁止
  $('input[name="rng020Title"]').keypress(function(e){
      if((e.which == 13) || (e.keyCode == 13)){ return false; }
  });

  //-------内部関数定義部---------------------------
  //-------内部関数定義部 終了 ----------------------
  //-------onload処理-----------------------------
      //経路テンプレート選択ボタンイベントを設定
      $('.js_load_rct').click(function() {
          $('#keirotemplateselect').load(
                  '../ringi/rng020.do',
                  [{
                      name:"CMD",
                      value:"rctSelectDialog"
                      }],
                  function() {
                      var buttons = {};
                      buttons[msglist_rng020['cmn.cancel']] = function() {
                          $('#keirotemplateselect').dialog('close'); };
                      $('#keirotemplateselect').dialog({
                          autoOpen: true,  // hide dialog
                          bgiframe: true,   // for IE6
                          resizable: false,
                          modal: true,
                          height:'420' ,
                          width: '512',
                          overflow: "auto",
                          overlay: {
                              backgroundColor: '#000000',
                              opacity: 0.5
                          },
                          buttons: buttons,
                          open: function() {      // キャンセルボタンにフォーカスをあてる
                              $( this ).siblings('.ui-dialog-buttonpane').find('button:eq(0)').focus();
                          }
                  }
                  );
              //経路テンプレートダイアログ切り替えボタンイベントを設定
              $('#keirotemplateselect > div.tab > div.share').click(function () {
                  $('#keirotemplateselect').removeClass("person");
                  $('#keirotemplateselect').addClass("share");
              });
              $('#keirotemplateselect > div.tab > div.person').click(function () {
                  $('#keirotemplateselect').removeClass("share");
                  $('#keirotemplateselect').addClass("person");
              });
          });
          var keiroBlockName = $(this).parents('div.keiroTable.row').attr('name');

          $('#keirotemplateselect').data('selectRctSid', $('form[name="rng020Form"] input[name="loadRctSid"]'));
          $('#keirotemplateselect').data('scrollY', $('form[name="rng020Form"] input[name="scrollY"]'));

      });

      if ($('#warning_keiro_autochange').length > 0) {
          $('#warning_keiro_autochange').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: '200',
            width: '350',
            modal: true,
            overlay: {
                backgroundColor: '#000000',
                opacity: 0.5
            },
            buttons: {
                OK: function() {
                    $(this).dialog('close');
                }
            }
        });
      }


  //-------onload処理 終了---------------------------

  });