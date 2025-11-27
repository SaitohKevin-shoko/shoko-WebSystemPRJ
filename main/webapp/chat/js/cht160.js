$(function(){

  //スタンプ追加
  $(document).on("click", ".js_addStamp", function() {
    addDialogOpen();
  });

  // スタンプ削除
  $(document).on("click", ".js_deleteStamp", function() {
    deleteStamp($(this).data('stampsid'));
  });

  // 未使用スタンプ 選択
  $(document).on("click", ".js_useStampSelect", function() {
    if ($(this).hasClass('selectoutline')) {
      $(this).removeClass('selectoutline js_useStampSelected');
    } else {
      $(this).addClass('selectoutline js_useStampSelected');
    }
  });

  //スタンプ未使用
  $(document).on("click", ".js_unusedStamp", function() {
    unusedStamp($(this).data('stampsid'));
  });

  //スタンプホバーイベント
  $(document).on('mouseenter','.js_stampImage',function(){
    $(this).addClass("cursor_p");
    $(this).children('img:nth-child(2)').removeClass("display_n");
    $(this).children('img:nth-child(3)').removeClass("display_n");
  });
  $(document).on('mouseleave','.js_stampImage',function(){
    $(this).removeClass("cursor_p");
    $(this).children('img:nth-child(2)').addClass("display_n");
    $(this).children('img:nth-child(3)').addClass("display_n");
  });

  //スタンプソートイベント設定
  sortSetting();

  //未使用スタンプ一覧取得
  loadUnusedStampList();
});

//スタンプ追加
function addDialogOpen() {
  $('#attachmentFileErrorArea').empty();
  $('#addStampDialog').dialog({
    modal: true,
    dialogClass:'dialog_button',
    autoOpen: true,
    bgiframe: true,
    resizable: false,
    width: 500,
    height: 430,
    overlay: {
    backgroundColor: '#000000',
      opacity: 0.5
    },
    buttons: {
      追加: function() {
        if (!$('.js_stampAddImage').length) {
          //エラー
          $('#attachmentFileErrorArea').empty();
          var appendHtml = `
            <div class='textError mt5 mb5'>${msglist_cht160['cht.cht160.06']}</div>
          `;
          $('#attachmentFileErrorArea').append($(appendHtml));
        } else {
          var paramStr = 'CMD=addStamp';
          $.ajax({
            async: true,
            url:"../chat/cht160.do",
            type: "post",
            data:paramStr
          }).done(function( data ) {
              $('#addStampDialog').dialog('close');
              $('.js_stampNoImage').removeClass("display_n");
              $('.js_stampAddImage').parent().remove();
              $('#attachmentFileErrorArea').empty();
              // スタンプ一覧更新
              loadStampList();
              // トースト表示
              $("#toastMessageBody").html("").append(msglist_cht160['cht.cht160.10']);
              displayToast("sml010MessageToast");
          }).fail(function(data){
              $('#attachmentFileErrorArea').empty();
              var appendHtml = `
                <div class='textError mt5 mb5'>${msglist_cht160['cht.cht160.07']}</div>
              `;
              $('#attachmentFileErrorArea').append($(appendHtml));
          });
        }
      },
      キャンセル: function() {
        $(this).dialog('close');
        uploadFileDelete();
      }
    }
  });
}

//スタンプ削除
function deleteStamp(stampSid) {
  $('#delStampDialog').dialog({
    modal: true,
    dialogClass:'dialog_button',
    autoOpen: true,
    bgiframe: true,
    resizable: false,
    width: 330,
    height: 180,
    overlay: {
    backgroundColor: '#000000',
      opacity: 0.5
    },
    buttons: {
      OK: function() {
        var paramStr = 'CMD=deleteStamp'
                        + '&cht160DeleteSid='
                        + stampSid;
        $.ajax({
          async: true,
          url:"../chat/cht160.do",
          type: "post",
          data:paramStr
        }).done(function( data ) {
          $('#delStampDialog').dialog('close');
          if (data.success) {
            // スタンプ一覧更新
            loadStampList();
            // トースト表示
            $("#toastMessageBody").html("").append(msglist_cht160['cht.cht160.11']);
            displayToast("sml010MessageToast");
          } else {
            alert(data.errors);
          }
        }).fail(function(data){
        });
      },
      キャンセル: function() {
        $(this).dialog('close');
      }
    }
  });
}

//スタンプ状態変更(未使用)
function unusedStamp(stampSid) {
  $('#unusedStampDialog').dialog({
    modal: true,
    dialogClass:'dialog_button',
    autoOpen: true,
    bgiframe: true,
    resizable: false,
    width: 360,
    height: 190,
    overlay: {
    backgroundColor: '#000000',
      opacity: 0.5
    },
    buttons: {
      OK: function() {
        var paramStr = 'CMD=unusedStamp'
                        + '&cht160UnusedSid='
                        + stampSid;
        $.ajax({
          async: true,
          url:"../chat/cht160.do",
          type: "post",
          data:paramStr
        }).done(function( data ) {
          $('#unusedStampDialog').dialog('close');
          if (data.success) {
            // スタンプ一覧更新
            loadStampList();
            // 未使用一覧ボタン表示
            $('.js_unusedListBtn').removeClass("display_n");
            // トースト表示
            $("#toastMessageBody").html("").append(msglist_cht160['cht.cht160.13']);
            displayToast("sml010MessageToast");
          } else {
            alert(data.errors);
          }
        }).fail(function(data){
        });
      },
      キャンセル: function() {
        $(this).dialog('close');
      }
    }
  });
}

//未使用スタンプ一覧表示
function openUnusedList() {
  loadUnusedStampList();
  $('#unusedListDialog').dialog({
    modal: true,
    dialogClass:'dialog_button',
    autoOpen: true,
    bgiframe: true,
    resizable: false,
    width: 500,
    height: 400,
    overlay: {
    backgroundColor: '#000000',
      opacity: 0.5
    },
    buttons: {
      使用する: function() {
        var paramStr = 'CMD=useStamp';
        for (var i = 0; i < $('.js_useStampSelected').length; i++) {
          paramStr += '&cht160UseSidList=' + $('.js_useStampSelected').eq(i).data('stampsid');
        }

        $.ajax({
          async: true,
          url:"../chat/cht160.do",
          type: "post",
          data:paramStr
        }).done(function( data ) {
            if (data.success) {
              // スタンプ一覧更新
              loadStampList();
              loadUnusedStampList();
              // トースト表示
              $("#toastMessageBody").html("").append(msglist_cht160['cht.cht160.18']);
              displayToast("sml010MessageToast");
              $('#unusedListDialog').dialog('close');
            } else {
              alert(data.errors);
            }
        }).fail(function(data){
        });
      },
      キャンセル: function() {
        $(this).dialog('close');
      }
    }
  });
}

var tempSaveName__ = "";
//スタンプアップロード後イベント
function cmn110Updated(window, tempName, tempSaveName) {
  addDialogOpen();
  $('.js_stampNoImage').addClass("display_n");
  $('.js_stampAddImage').parent().remove();
  var appendHtml = `
    <div class="mrl_auto">
      <img src="../chat/cht160.do?CMD=getImageFile&cht160ImageName=${tempName}&cht160ImageSaveName=${tempSaveName}" name="pitctImage" class="mxwp150 mxhp150 js_stampAddImage">
    </div>
  `;
  $('.js_stampUploadArea').append($(appendHtml));
  tempSaveName__ = tempSaveName;
}

//アップロードファイル削除
function uploadFileDelete() {
  $('.js_stampNoImage').removeClass("display_n");
  $('.js_stampAddImage').parent().remove();
  $('#attachmentFileErrorArea').empty();
  attachmentDeleteFile(tempSaveName__, '');
}

//スタンプ一覧取得
function loadStampList() {
  var paramStr = 'CMD=getStampList';
  $.ajax({
    async: true,
    url:"../chat/cht160.do",
    type: "post",
    data:paramStr
  }).done(function(data) {
    var appendHtml;
    $('.js_stampArea').empty();
    if (data.stampList.length > 0) {
      for (var stamp of data.stampList) {
        var appendHtml;
        if (stamp.binSid == 0) {
          //デフォルトスタンプ
          appendHtml = `
            <li data-sid="${stamp.cstSid}" class="pos_rel js_stampImage m10 outC_deep hp150 wp150 component_bothEnd">
            <img class="mxwp150 mxhp150 mrl_auto" src="../chat/images/stamp/stamp_${stamp.cstDefstampId}.png">
              <img class="btn_originalImg-display cht_stampHoverIcon js_unusedStamp display_n" src="../common/images/original/icon_delete.png" data-stampsid="${stamp.cstSid}">
              <img class="btn_classicImg-display cht_stampHoverIcon js_unusedStamp display_n" src="../common/images/classic/icon_delete.png" data-stampsid="${stamp.cstSid}">  
            </li>
          `;
        } else {
          //拡張スタンプ
          appendHtml = `
            <li data-sid="${stamp.cstSid}" class="pos_rel js_stampImage m10 outC_deep hp150 wp150 component_bothEnd">
              <img class='mxwp150 mxhp150 mrl_auto' src='../chat/cht160.do?CMD=getImageFile&cht160BinSid=${stamp.binSid}'>
              <img class="btn_originalImg-display cht_stampHoverIcon js_deleteStamp display_n" src="../common/images/original/icon_delete.png" data-stampsid="${stamp.cstSid}">
              <img class="btn_classicImg-display cht_stampHoverIcon js_deleteStamp display_n" src="../common/images/classic/icon_delete.png" data-stampsid="${stamp.cstSid}">  
            </li>
          `;
        }
        $('.js_stampArea').append($(appendHtml));
      }
    }
    appendHtml = `
      <div class='js_addStamp cht_stampAddFlame cursor_p bgC_selectable hp150 wp150 m10'>
        <div class='fs_20 fw_bold'>${msglist_cht160['cmn.operand.plus']} ${msglist_cht160['cmn.add']}</div>
      </div>
    `;
    $('.js_stampArea').append($(appendHtml));
    sortSetting();
  }).fail(function(data){
  });
}

//未使用スタンプ一覧取得
function loadUnusedStampList() {
  var paramStr = 'CMD=getUnusedStampList';
  $.ajax({
    async: true,
    url:"../chat/cht160.do",
    type: "post",
    data:paramStr
  }).done(function(data) {
    var appendHtml;
    $('.js_unusedStampArea').empty();
    if (data.stampList.length > 0) {
      $('.js_unusedListBtn').removeClass("display_n");
      for (var stamp of data.stampList) {
        var appendHtml = `
          <li class="pos_rel js_useStampSelect cursor_p m10" data-stampsid="${stamp.cstSid}">
            <img class="wp100 hp100" src="../chat/images/stamp/stamp_${stamp.cstDefstampId}.png">
          </li>
        `;
        $('.js_unusedStampArea').append($(appendHtml));
      }
    } else {
      $('.js_unusedListBtn').addClass("display_n");
    }
  }).fail(function(data){
  });
}

var escStampObjList__;
var beforeSid__;
//スタンプソート設定
function sortSetting() {
  var el = document.getElementById('stampArea');
  var sortable = new Sortable(el, {
    animation: 150,
    ghostClass: 'out3',
    filter: ".js_addStamp",
    preventOnFilter: false,
    onStart: onStartEvent,
    onSort: onSortEvent
  });
  function onStartEvent(e){
    escStampObjList__ = null;
    beforeSid__ = null;
    //並び替え前の並び順を退避
    escStampObjList__ = $('.js_stampImage');
    //並び替えを行う要素のスタンプSID取得
    beforeSid__ = e.item.dataset.sid;
  }
  function onSortEvent(e){
    //変更後の並び順一覧
    var items = e.target.querySelectorAll("li");
    for(let i=0; i<items.length; i++){
      if (beforeSid__ == items[i].dataset.sid) {
        var afterSid = escStampObjList__.eq(i).data('sid');
        sortStamp(beforeSid__, afterSid);
      }
    }
  }

  function sortStamp(beforeSid, afterSid) {
    var paramStr = 'CMD=sortStamp'
                    + '&cht160SortBeforeSid=' + beforeSid
                    + '&cht160SortAfterSid=' + afterSid;
    $.ajax({
      async: true,
      url:"../chat/cht160.do",
      type: "post",
      data:paramStr
    }).done(function(data) {
      loadStampList();
    }).fail(function(data){
    });
  }
}