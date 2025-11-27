var filterNum = 0;

$(function() {
  $(".js_changeTarget1").on("click", function(){
    $('.js_arrow1').removeClass('cl_fontWeek');
    $('.js_arrow2').removeClass('cl_fontArrow');
    $('.js_arrow1').addClass('cl_fontArrow');
    $('.js_arrow2').addClass('cl_fontWeek');
    $('.js_changeTarget1').addClass('display_n');
    $('.js_changeTarget2').removeClass('display_n');
    $('.js_selectedArea-2column').eq(0).parent().addClass('selectoutline');
    $('.js_selectedArea-2column').eq(1).parent().removeClass('selectoutline');
  });
  $(".js_changeTarget2").on("click", function(){
    $('.js_arrow1').removeClass('cl_fontArrow');
    $('.js_arrow2').removeClass('cl_fontWeek');
    $('.js_arrow1').addClass('cl_fontWeek');
    $('.js_arrow2').addClass('cl_fontArrow');
    $('.js_changeTarget1').removeClass('display_n');
    $('.js_changeTarget2').addClass('display_n');
    $('.js_selectedArea-2column').eq(0).parent().removeClass('selectoutline');
    $('.js_selectedArea-2column').eq(1).parent().addClass('selectoutline');
  });

  $(document).on('click', '.multiselector_userTooltip-closeArea', function(){
    $('.js_userTooltip').addClass('display_n');
    $('.multiselector_userTooltip-closeArea').remove();
  });

  $(document).on('click', '.js_userInfo', function(){
    sid = $(this).parent().attr('data-sid');
    openUserInfoWindow(sid);
  });

  //ユーザ選択
  $(document).on('click', '.js_selectUserContent',  function() {
    sid = $(this).parent().attr('data-sid');

    //一覧から指定した要素を削除
    $('#target' + sid).remove();

    //画面調整
    scrollCheck(0);

    //部分再描画処理 -> 選択済み一覧
  });



  //選択済みから削除
  $(document).on('click', '.js_deleteContent',  function() {
    sid = $(this).parent().attr('data-sid');

    //選択済み一覧から指定した要素を削除
    $('#selected' + sid).remove();

    //画面調整
    scrollCheck(1);

    //ユーザだった場合、部分再描画処理 -> ユーザ一覧
  });
});

//一覧のスクロール判定
//ホバー時にスクロールを内側に出す為の調整
function scrollCheck(check) {
  //ユーザ,グループ選択
  if (check == 0 || check == -1) {
    if ($('.js_selectArea-user').height() < ($('.js_selectArea-user').get(0).scrollHeight - 15)) {
      $('.js_selectArea-user').children().addClass('scrollInList1_content');
    } else {
      $('.js_selectArea-user').children().removeClass('scrollInList1_content');
    }
    if ($('.js_selectArea-groupOnly').height() < ($('.js_selectArea-groupOnly').get(0).scrollHeight - 15)) {
      $('.js_selectArea-groupOnly').children().addClass('scrollInList1_content');
    } else {
      $('.js_selectArea-groupOnly').children().removeClass('scrollInList1_content');
    }
  }
  //選択済み
  if (check == 1 || check == -1) {
    if ($('.js_selectedArea-1column').height() < ($('.js_selectedArea-1column').get(0).scrollHeight - 15)) {
      $('.js_selectedArea-1column').children().addClass('scrollInList1_content');
    } else {
      $('.js_selectedArea-1column').children().removeClass('scrollInList1_content');
    }
    if ($('.js_selectedArea-2column').eq(0).height() < ($('.js_selectedArea-2column').eq(0).get(0).scrollHeight - 15)) {
      $('.js_selectedArea-2column').eq(0).children().addClass('scrollInList1_content');
    } else {
      $('.js_selectedArea-2column').eq(0).children().removeClass('scrollInList1_content');
    }
    if ($('.js_selectedArea-2column').eq(1).height() < ($('.js_selectedArea-2column').eq(1).get(0).scrollHeight - 15)) {
      $('.js_selectedArea-2column').eq(1).children().addClass('scrollInList1_content');
    } else {
      $('.js_selectedArea-2column').eq(1).children().removeClass('scrollInList1_content');
    }
  }
}

function openSearchDialog(mode) {
  if (mode == 0) {
    $('.js_target-2column').addClass('display_n');
    $('.js_selectArea-only').addClass('display_n');
  } else if (mode == 1) {
    $('.js_target-2column').addClass('display_n');
    $('.js_selectArea').addClass('display_n');
    $('.js_selectedArea').addClass('w65');
    $('.js_selectedArea').removeClass('w35');
    $('.js_filterSelect').addClass('display_n');
    $('.js_filterAreaClose').removeClass('verAlignMid');
    $('.js_filterAreaClose').addClass('display_n');
    $('.js_selectedContent').removeClass('mb5');
    $('.js_selectedContent').addClass('multiselector_selectedContent-2column');
    $('.js_selectedContent').addClass('scrollInList1_content-2column');
    $('.js_selectedArea-1column').children().append('<div class="js_spacer multiselector_2columnSpacer"></div>');
    $('.js_selectedContent').removeClass('scrollInList1_content');
  } else if (mode == 2) {
    $('.js_target-1column').addClass('display_n');
    $('.js_selectArea-only').addClass('display_n');
  }
  $('#multiSelectorSearch_demo').dialog({
            autoOpen: true,
            bgiframe: true,
            resizable: false,
            width:1000,
            height: 600,
            modal: true,
            closeOnEscape: false,
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
  scrollCheck(-1);
};

//フィルタ切り替え
function changeFilter(target) {
  var filterList = ['group', 'user', 'post', 'label'];
  var focusClass = "multiselector_filter-focus cl_fontOutline";
  var nofocusClass = "cl_multiselector cursor_p";
  var addAreaClass = "display_n";
  for (var filter of filterList) {
    if (target == filter) {
      $(".js_" + filter + "Filter").addClass(focusClass);
      $(".js_" + filter + "Filter").removeClass(nofocusClass);
      $(".js_" + filter + "Filter-addArea").removeClass(addAreaClass);
      if (filter == "pos" || filter == "label") {
        //ajaxで一覧取得
      }
    } else {
      $(".js_" + filter + "Filter").removeClass(focusClass);
      $(".js_" + filter + "Filter").addClass(nofocusClass);
      $(".js_" + filter + "Filter-addArea").addClass(addAreaClass);
    }
  }
}

//フィルタ追加
function addFilter(target, name, sid) {
  var filterText = "";
  var filterId = target + filterNum;
  var filterValue = "";
  var removeParam = "";

  if (target == "group") {
    filterText = "グループ : " + $('.js_groupFilter-keyword').val();
    filterValue = "group." + $('.js_groupFilter-keyword').val();
  } else if (target == "user") {
    filterText = "ユーザ情報 : " + $('.js_userFilter-keyword').val();
    filterValue = "user." + $('.js_userFilter-keyword').val();
  } else if (target == "post") {
    filterText = "役職 : " + name;
    filterValue = "post." + sid;
    removeParam = "param_post" + sid;
  } else if (target == "label") {
    filterText = "ラベル : " + name;
    filterValue = "label." + sid;
    removeParam = "param_label" + sid;
  }

  //重複する場合はフィルター追加を無効化
  var filterValues = $("input[name='multiselectorFilter']").map(function(){return $(this).val();}).get();
  for (var value of filterValues) {
    if (value == filterValue) {
      return;
    }
  }

  filterNum++;
  $('.js_filterArea').append('<span id="' + filterId + '" class="mr5 multiselector_filterContent cl_fontOutline pl5 pr5">'
     + filterText
     + '<span class="ml5 cursor_p" onclick="deleteFilter(\'' + filterId + '\');">×</span>'
     + '<input type="hidden" name="multiselectorFilter" value="' + filterValue + '">'
     + '</span>');

  //部分再描画処理 -> グループ一覧/ユーザ一覧

  //役職orラベル時、フィルタ一覧から削除
  if (removeParam.length > 0) {
    $('#' + removeParam).remove();
  }
}

//フィルタ削除
function deleteFilter(filterId) {
  $("#" + filterId).remove();

  //部分再描画処理 -> グループ一覧/ユーザ一覧

  //部分再描画処理 -> フィルタ選択エリア ※選択中フィルタが役職orラベル、かつ削除したフィルタと一致する時
}

//フィルタ領域の開閉
function filterDspChange() {
  if($('.js_filterCloseArea').hasClass('display_n')) {
    $('.js_filterOpenArea').addClass('display_n');
    $('.js_filterCloseArea').removeClass('display_n');
    $('.js_selectArea').addClass('w50');
    $('.js_selectedArea').addClass('w50');
    $('.js_selectArea').removeClass('w65');
    $('.js_selectedArea').removeClass('w35');
    $('.js_selectedContent').removeClass('mb5');
    $('.js_selectedContent').addClass('multiselector_selectedContent-2column');
    $('.js_selectedContent').addClass('scrollInList1_content-2column');
    $('.js_selectedArea-1column').children().append('<div class="js_spacer multiselector_2columnSpacer"></div>');
    $('.js_selectedContent').removeClass('scrollInList1_content');
    $('.js_selectedContent-2column').removeClass('mb5');
    $('.js_selectedContent-2column').addClass('multiselector_selectedContent-2column');
    $('.js_selectedContent-2column').addClass('scrollInList1_content-2column');
    $('.js_selectedContent-2column').removeClass('scrollInList1_content');
    $('.js_selectedArea-2column').eq(0).children().append('<div class="js_spacer multiselector_2columnSpacer"></div>');
    $('.js_selectedArea-2column').eq(1).children().append('<div class="js_spacer multiselector_2columnSpacer"></div>');
    $('.multiselector_arrowArea-event').addClass('multiselector_arrowArea-event2Column');
    $('.multiselector_arrowArea-event').removeClass('multiselector_arrowArea-event');
  } else {
    $('.js_filterCloseArea').addClass('display_n');
    $('.js_filterOpenArea').removeClass('display_n');
    $('.js_selectArea').removeClass('w50');
    $('.js_selectedArea').removeClass('w50');
    $('.js_selectArea').addClass('w65');
    $('.js_selectedArea').addClass('w35');
    $('.js_selectedContent').addClass('mb5');
    $('.js_selectedContent').removeClass('multiselector_selectedContent-2column');
    $('.js_selectedContent').addClass('scrollInList1_content');
    $('.js_spacer').remove();
    $('.js_selectedContent').removeClass('scrollInList1_content-2column');
    $('.js_selectedContent-2column').addClass('mb5');
    $('.js_selectedContent-2column').removeClass('multiselector_selectedContent-2column');
    $('.js_selectedContent-2column').addClass('scrollInList1_content');
    $('.js_selectedContent-2column').removeClass('scrollInList1_content-2column');
    $('.js_selectedArea-2column').removeClass('js_spacer');
    $('.multiselector_arrowArea-event2Column').addClass('multiselector_arrowArea-event');
    $('.multiselector_arrowArea-event2Column').removeClass('multiselector_arrowArea-event2Column');
  }
  scrollCheck(1);
}

//グループ指定
function selectGroup(target) {
  //現在の選択状態を解除
  $('.js_selectGroup').removeClass('bgC_body');
  $('.js_selectGroup').addClass('content-hoverChange');

  //引数を元にbgC_bodyを当てる
  $('#select' + target).addClass('bgC_body');
  $('#select' + target).removeClass('content-hoverChange');

  //部分再描画処理 -> ユーザ一覧
}

function allSelect() {
  //ユーザ一覧から全ての要素を削除
  $('.js_selectUser').remove();

  //画面調整
  scrollCheck(0);

  //部分再描画処理 -> 選択済み一覧
}

function allDelete(target) {
  //選択済み一覧から全ての要素を削除
  if (target == 0) {
    $('.js_selectedContent').remove();
  } else if (target == 1) {
    $('.js_selectedContent-2column').remove();
  }

  //画面調整
  scrollCheck(1);

  //部分再描画処理 -> ユーザ一覧
}

function complete() {
  //親画面に反映する

  //ダイアログを閉じる
  $('#multiSelectorSearch_demo').dialog('close');
}













//k_hashimoto 動作確認用のデータ投入処理
function testDataCreate(kbn) {
  //ユーザ,グループ選択 グループ一覧
  if (kbn == 0) {
    for (var i = 0; i < 20; i++) {
      $('.js_selectArea-group').append(
                '<div id="selectG00' + i + '" class="js_selectGroup pl5 pr5 lh200 w100 verAlignMid content-hoverChange" onclick="selectGroup(\'G00' + i + '\')">'
              + '  <img class="btn_classicImg-display borC_light" src="../common/images/classic/icon_group.png" alt="グループ">'
              + '  <img class="btn_originalImg-display borC_light" src="../common/images/original/icon_group.png" alt="グループ">'
              + '  <span class="ml5">テストグループ' + i + '</span>'
              + '</div>');
    }
  }
  //ユーザ,グループ選択 ユーザ一覧
  if (kbn == 1) {
    for (var i = 0; i < 7; i++) {
      $('.js_selectArea-user').append(
                '<div id="target100' + i + '" class="js_selectUser bor1 display_flex content-hoverChange mb5 scrollInList1_content" data-sid="100' + i + '">'
              + '  <div class="w25 txt_c js_selectUserContent">'
              + '    <div class="verAlignMid h100">'
              + '      <img class="multiselector_iconTrim borC_light" src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=3" alt="ユーザ">'
              + '    </div>'
              + '  </div>'
              + '  <div class="w65 txt_m js_selectUserContent">'
              + '    <div class="display_tbl h100 pt5 pb5">'
              + '      <div class="display_tbl_c txt_m">'
              + '        <div class="fw_bold fs_16 lh100">Donald John Trump' + i + '</div>'
              + '        <div class="fs_10 lh110">テストグループ' + i + '</div>'
              + '      </div>'
              + '    </div>'
              + '  </div>'
              + '  <div class="w10 txt_r pr5 pt5">'
              + '    <span class="icon-infomation fs_15 cl_multiselector"></span>'
              + '  </div>'
              + '</div>');
    }
  }
  //グループ選択 グループ一覧
  if (kbn == 2) {
    for (var i = 0; i < 10; i++) {
      $('.js_selectArea-groupOnly').append(
                '<div id="targetG100' + i + '" class="js_selectUser bor1 display_flex content-hoverChange mb5 scrollInList1_content" data-sid="G100' + i + '">'
              + '  <div class="w25 txt_c js_selectUserContent">'
              + '    <div class="verAlignMid h100">'
              + '      <img class="btn_classicImg-display multiselector_iconTrim borC_light" src="../common/images/classic/header_group.png" alt="グループ">'
              + '      <img class="btn_originalImg-display multiselector_iconTrim borC_light" src="../common/images/original/icon_group_32.png" alt="グループ">'
              + '    </div>'
              + '  </div>'
              + '  <div class="w75 txt_m js_selectUserContent">'
              + '    <div class="display_tbl h100 pt5 pb5">'
              + '      <div class="display_tbl_c txt_m">'
              + '        <div class="fw_bold fs_16 lh100">テストグループ' + i + '</div>'
              + '      </div>'
              + '    </div>'
              + '  </div>'
              + '</div>');
    }
  }
  //ユーザ,グループ 選択済み一覧
  if (kbn == 3) {
    for (var i = 0; i < 14; i++) {
      $('.js_selectedArea-1column').children().append(
                '<div id="selected100' + i + '" class="js_selectedContent bor1 display_flex content-hoverChange mb5" data-sid="100' + i + '">'
              + '  <div class="w25 txt_c js_deleteContent">'
              + '    <div class="verAlignMid h100">'
              + '      <img class="multiselector_iconTrim borC_light" src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=6" alt="ユーザ">'
              + '    </div>'
              + '  </div>'
              + '  <div class="w65 js_deleteContent">'
              + '    <div class="display_tbl h100 pt5 pb5">'
              + '      <div class="display_tbl_c txt_m">'
              + '        <div class="fw_bold fs_15 lh100">Milla Jovovich' + i + '</div>'
              + '        <div class="fs_10 lh110">テストグループ' + i + '</div>'
              + '      </div>'
              + '    </div>'
              + '  </div>'
              + '  <div class="w10 txt_r pr5 pt5">'
              + '    <span class="icon-infomation fs_15 cl_multiselector"></span>'
              + '  </div>'
              + '</div>');
    }
  }
  //グループ 選択済み一覧
  if (kbn == 4) {
    for (var i = 0; i < 14; i++) {
      $('.js_selectedArea-1column').children().append(
                '<div id="selectedG100' + i + '" class="js_selectedContent bor1 display_flex content-hoverChange mb5" data-sid="G100' + i + '">'
              + '  <div class="w25 txt_c js_deleteContent">'
              + '    <div class="verAlignMid h100">'
              + '      <img class="btn_classicImg-display multiselector_iconTrim borC_light" src="../common/images/classic/header_group.png" alt="グループ">'
              + '      <img class="btn_originalImg-display multiselector_iconTrim borC_light" src="../common/images/original/icon_group_32.png" alt="グループ">'
              + '    </div>'
              + '  </div>'
              + '  <div class="w75 js_deleteContent">'
              + '    <div class="display_tbl h100 pt5 pb5">'
              + '      <div class="display_tbl_c txt_m">'
              + '        <div class="fw_bold fs_15 lh100">テストグループ' + i + '</div>'
              + '      </div>'
              + '    </div>'
              + '  </div>'
              + '</div>');
    }
  }
  //編集権限 選択済み一覧
  if (kbn == 5) {
    for (var i = 0; i < 14; i++) {
      $('.js_selectedArea-2column').eq(0).children().append(
                '<div id="selected200' + i + '" class="js_selectedContent scrollInList1_content bor1 display_flex content-hoverChange mb5" data-sid="200' + i + '">'
              + '  <div class="w25 txt_c js_deleteContent">'
              + '    <div class="verAlignMid h100">'
              + '      <img class="multiselector_iconTrim borC_light" src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=6" alt="ユーザ">'
              + '    </div>'
              + '  </div>'
              + '  <div class="w65 js_deleteContent">'
              + '    <div class="display_tbl h100 pt5 pb5">'
              + '      <div class="display_tbl_c txt_m">'
              + '        <div class="fw_bold fs_15 lh100">Milla Jovovich</div>'
              + '        <div class="fs_10 lh110">テストグループB</div>'
              + '      </div>'
              + '    </div>'
              + '  </div>'
              + '  <div class="w10 txt_r pr5 pt5">'
              + '    <span class="icon-infomation fs_15 cl_multiselector"></span>'
              + '  </div>'
              + '</div>');
    }
  }
  //閲覧権限 選択済み一覧
  if (kbn == 6) {
    for (var i = 0; i < 14; i++) {
      $('.js_selectedArea-2column').eq(1).children().append(
                '<div id="selected300' + i + '" class="js_selectedContent-2column scrollInList1_content bor1 display_flex content-hoverChange mb5" data-sid="300' + i + '">'
              + '  <div class="w25 txt_c js_deleteContent">'
              + '    <div class="verAlignMid h100">'
              + '      <img class="multiselector_iconTrim borC_light" src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=6" alt="ユーザ">'
              + '    </div>'
              + '  </div>'
              + '  <div class="w65 js_deleteContent">'
              + '    <div class="display_tbl h100 pt5 pb5">'
              + '      <div class="display_tbl_c txt_m">'
              + '        <div class="fw_bold fs_15 lh100">Milla Jovovich</div>'
              + '        <div class="fs_10 lh110">テストグループB</div>'
              + '      </div>'
              + '    </div>'
              + '  </div>'
              + '  <div class="w10 txt_r pr5 pt5">'
              + '    <span class="icon-infomation fs_15 cl_multiselector"></span>'
              + '  </div>'
              + '</div>');
    }
  }
}