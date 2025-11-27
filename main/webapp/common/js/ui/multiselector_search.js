var filterNum = 0;

$(function() {
  $(document).on("click", ".js_changeTarget1", function(){
    $('.js_arrow1').removeClass('cl_fontWeek');
    $('.js_arrow2').removeClass('cl_fontArrow');
    $('.js_arrow1').addClass('cl_fontArrow');
    $('.js_arrow2').addClass('cl_fontWeek');
    $('.js_changeTarget1').addClass('display_n');
    $('.js_changeTarget2').removeClass('display_n');
    $(this).closest('.js_target-2column').parent().find(".js_multiselector_select").eq(0).addClass('selectoutline');
    $(this).closest('.js_target-2column').parent().find(".js_multiselector_select").eq(1).removeClass('selectoutline');
    $(this).closest('.js_target-2column').parent().find(".js_multiselector_select").eq(0).find('.js_selectedArea-2column').addClass('selectoutline');
    $(this).closest('.js_target-2column').parent().find(".js_multiselector_select").eq(1).find('.js_selectedArea-2column').removeClass('selectoutline');
    $(this).closest('.js_target-2column').parent().find(".js_multiselector_select").eq(0).trigger("click");
  });
  $(document).on("click", ".js_changeTarget2", function(){
    $('.js_arrow1').removeClass('cl_fontArrow');
    $('.js_arrow2').removeClass('cl_fontWeek');
    $('.js_arrow1').addClass('cl_fontWeek');
    $('.js_arrow2').addClass('cl_fontArrow');
    $('.js_changeTarget1').removeClass('display_n');
    $('.js_changeTarget2').addClass('display_n');
    $(this).closest('.js_target-2column').parent().find(".js_multiselector_select").eq(0).removeClass('selectoutline');
    $(this).closest('.js_target-2column').parent().find(".js_multiselector_select").eq(1).addClass('selectoutline');
    $(this).closest('.js_target-2column').parent().find(".js_multiselector_select").eq(0).find('.js_selectedArea-2column').removeClass('selectoutline');
    $(this).closest('.js_target-2column').parent().find(".js_multiselector_select").eq(1).find('.js_selectedArea-2column').addClass('selectoutline');
    $(this).closest('.js_target-2column').parent().find(".js_multiselector_select").eq(1).trigger("click");
  });

  $(document).on('click', '.multiselector_userTooltip-closeArea', function(){
    $('.js_userTooltip').addClass('display_n');
    $('.multiselector_userTooltip-closeArea').remove();
  });

  $(document).on('click', '.js_userInfo', function(e){
    e.stopPropagation();
    sid = $(this).attr('data-sid');
    openUserInfoWindow(sid);
  });

  $(document).on('keyup', '.js_postFilter-keyword', function() {
    for (var i = 1; (i - 1) < $('.js_multiSelectorDialog').find('.js_multiselector_filterPost').children().length; i++) {
      var target = $('.js_multiSelectorDialog').find('.js_multiselector_filterPost').children("div:nth-child(" + i + ")");
      if (target.text().includes($('.js_multiSelectorDialog').find('.js_postFilter-keyword').val())) {
        target.removeClass("display_n");
      } else {
        target.addClass("display_n");
      }
    }
  });

  $(document).on('keyup', '.js_labelFilter-keyword', function() {
    for (var i = 1; (i - 1) < $('.js_multiSelectorDialog').find('.js_multiselector_filterLabel').children().length; i++) {
      var target = $('.js_multiSelectorDialog').find('.js_multiselector_filterLabel').children("div:nth-child(" + i + ")");
      if (target.text().includes($('.js_multiSelectorDialog').find('.js_labelFilter-keyword').val())) {
        target.removeClass("display_n");
      } else {
        target.addClass("display_n");
      }
    }
  });
});

/**
 * 描画時の初回スクロール調整
 */
function searchInitScroll() {
  if ($('.js_multiSelectorDialog').find('.js_multiselector_grpSelect.bgC_tableCell').length > 0) {
    var checked = $('.js_multiSelectorDialog').find('.js_multiselector_grpSelect.bgC_tableCell:visible');
    var pos = checked.position().top;
    checked.closest('.ofy_a').animate({scrollTop: pos}, 0)
  }
}

function multiselectorOpenSearchDialog(button) {

   //ダイアログ用の要素を作成する。（既存の場合は作成しない）
   if ($('.js_multiSelectorDialog').length == 0) {
     $('body').append('<div class="js_multiSelectorDialog"></div>');
   }
   $('.js_multiSelectorDialog').empty();

   //押下した詳細検索ボタンから対象のユーザ選択UIを取得する。
   var parentContent = $(button).closest('.js_multiselector').parent();
   //親画面内にあるユーザ選択UIから表示に必要な要素が送られないように、親画面内の対象フォームを無効化する。
   parentContent.prop('disabled', true);

   //ダイアログ用の要素に対して、ユーザ選択UI内にある詳細検索ダイアログ要素をコピーする。
   parentContent.children('.js_multiSelector-Search').clone(true).removeClass('display_n').appendTo('.js_multiSelectorDialog');

   var multiselector = $('.js_multiSelectorDialog').find('.js_multiselector');
   var subform =  multiselector.find('.js_multiselector_selected');
   var parentSubform = parentContent.find('.js_multiselector_selected')

   //親画面内にあるユーザ選択UIから選択済み要素をコピーする
   if (subform.length >= 1) {
     subform.eq(0).append(parentSubform.eq(0).find('input[type="hidden"]').clone(true));
   }
   if (subform.length >= 2) {
     subform.eq(1).append(parentSubform.eq(1).find('input[type="hidden"]').clone(true));
   }

   //ダイアログを閉じる時に親画面内の対象フォームを有効化する為に要素をdata属性に設定しておく。
   $('.js_multiSelectorDialog').data('baseContent', "");
   $('.js_multiSelectorDialog').data('baseContent', parentContent);

   //ダイアログを表示する。
   $('.js_multiSelectorDialog').dialog({
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
                    $('.js_multiSelectorDialog').data('baseContent').prop('disabled', false);
                    $('.js_multiSelectorDialog').remove();
                }
            }
   });

   //各fieldsetを再描画する
   $('.js_multiSelectorDialog').find('.js_multiselector_noselectbody').ui_multiselector({cmd:'selectionReload', onload:function() {multiselectorLoadingFinish();multiselector.trigger('change');searchInitScroll();}});
   multiselector.find(".js_multiselector_filterPost").ui_multiselector({cmd:"searchFilterPost", onload:function() {multiselector.trigger('change');}});
   multiselector.find(".js_multiselector_filterLabel").ui_multiselector({cmd:"searchFilterLabel", onload:function() {multiselector.trigger('change');}});

   subform.subform({
     cmd:'submit',
     onloaded: function() {
       $(subform).removeClass('js_multiselector_exec');
       multiselector.find('.js_multiselector_selectLoading').addClass('display_none');
       multiselector.trigger('change');
     }
   });

   multiselectorLoadingStart();
   $('.js_multiselector_targetInput').prop('disabled', false);
};

//フィルタ切り替え
function multiselectorChangeFilter(target) {
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
  var multiselector = $('.js_multiSelectorDialog').find('.js_multiselector');
  if (target == "post") {
    multiselectorLoadingStart();
    multiselector.find(".js_multiselector_filterPost").ui_multiselector({cmd:"searchFilterPost", onload:function() {multiselectorLoadingFinish();multiselector.trigger('change');}});
  }
  if (target == "label") {
    multiselectorLoadingStart();
    multiselector.find(".js_multiselector_filterLabel").ui_multiselector({cmd:"searchFilterLabel", onload:function() {multiselectorLoadingFinish();multiselector.trigger('change');}});
  }
}

//フィルタ追加
function multiselectorAddFilter(target, name, obj) {
  //フィルタの追加は4件まで
  if ($('.js_multiSelectorDialog').find('.js_filterArea').children().length >= 4) {
    return;
  }
  var filterType = "";
  var filterText = "";
  var filterId = target + filterNum;
  var filterValue = "";
  var removeParam = "";
  var subform = "";
  var cmd = "";

  if (target == "group") {
    if ($('.js_multiSelectorDialog').find('.js_groupFilter-keyword').val().length == 0) {
      return;
    }
    filterType = "グループ";
    filterText = $('.js_multiSelectorDialog').find('.js_groupFilter-keyword').val();
    filterValue = "group." + $('.js_multiSelectorDialog').find('.js_groupFilter-keyword').val();
    $('.js_multiSelectorDialog').find('.js_groupFilter-keyword').val("");
  } else if (target == "user") {
    if ($('.js_multiSelectorDialog').find('.js_userFilter-keyword').val().length == 0) {
      return;
    }
    filterType = "ユーザ";
    filterText = $('.js_multiSelectorDialog').find('.js_userFilter-keyword').val();
    filterValue = "user." + $('.js_multiSelectorDialog').find('.js_userFilter-keyword').val();
    $('.js_multiSelectorDialog').find('.js_userFilter-keyword').val("");
  } else if (target == "post") {
    filterType = "役職";
    filterText = $(obj).data("name");
    filterValue = "post." + $(obj).data("sid");
    subform = ".js_multiselector_filterPost";
    cmd = "searchFilterPost";
    removeParam = "param_post" + $(obj).data("sid");
  } else if (target == "label") {
    filterType = "ラベル";
    filterText = $(obj).data("name");
    filterValue = "label." + $(obj).data("sid");
    removeParam = "param_label" + $(obj).data("sid");
    subform = ".js_multiselector_filterLabel";
    cmd = "searchFilterLabel";
  }

  //重複する場合はフィルター追加を無効化
  var filterValues = $('.js_multiSelectorDialog').find("input[name='multiselectorFilter']").map(function(){return $(this).val();}).get();
  for (var value of filterValues) {
    if (value == filterValue) {
      return;
    }
  }

  //表示文字列をエスケープ
  if (filterText.length > 6) {
    filterText = filterText.substring(0, 5) + "…";
  }
  filterText = filterText.replace("<", "&lt;");
  filterText = filterText.replace(">", "&gt;");
  filterText = filterType + " : " + filterText;

  filterNum++;
  $('.js_multiSelectorDialog').find('.js_filterArea').append('<span id="' + filterId + '" class="mr5 multiselector_filterContent cl_fontOutline pl5 pr5">'
     + filterText
     + '<span class="ml5 cursor_p" onclick="multiselectorDeleteFilter(\'' + filterId + '\');">×</span>'
     + '<input type="hidden" name="multiselectorFilter" value="' + filterValue + '">'
     + '</span>');

  //部分再描画処理 -> グループ一覧/ユーザ一覧
   var multiselector = $('.js_multiSelectorDialog').find('.js_multiselector');
   multiselector.find('.js_multiselector_noselectbody').ui_multiselector({cmd:'searchFilterBody', onload:function() {multiselector.trigger('change');}});
   multiselector.find('.js_multiselector_noselectgroup').ui_multiselector({cmd:'searchFilterGroup', onload:function() {multiselector.trigger('change');}});

   if (subform != "") {
     multiselectorLoadingStart();
     multiselector.find(subform).ui_multiselector({cmd:cmd, onload:function() {multiselectorLoadingFinish();multiselector.trigger('change');}});
   }

  //役職orラベル時、フィルタ一覧から削除
  if (removeParam.length > 0) {
    $('#' + removeParam).remove();
  }

  //フィルタ設定数が4件の時、これ以上追加できないように操作をロックする
  if ($('.js_multiSelectorDialog').find('.js_filterArea').children().length == 4) {
    $('.js_multiSelectorDialog').find('.js_groupFilter-keyword').prop('disabled', true);
    $('.js_multiSelectorDialog').find('.js_userFilter-keyword').prop('disabled', true);
    $('.js_multiSelectorDialog').find('.js_postFilter-keyword').prop('disabled', true);
    $('.js_multiSelectorDialog').find('.js_labelFilter-keyword').prop('disabled', true);
    $('.js_multiSelectorDialog').find('.js_filterSelectArea').prepend(
      '<div class="js_filterLock w100 h100 pos_abs z_idx100 bgC_lightGray opacity6"></div>'
    );
  }
}

//ロード状態
var multiselectorLoadingTimer;
function multiselectorLoadingStart() {
  clearTimeout(multiselectorLoadingTimer);
  $('.js_multiSelectorDialog').find('.js_multiselector_searchLoading').eq(0).removeClass('opacity6');
  $('.js_multiSelectorDialog').find('.js_multiselector_searchLoading').addClass('opacity0');
  $('.js_multiSelectorDialog').find('.js_multiselector_searchLoading').removeClass('display_n');
  multiselectorLoadingTimer = setTimeout(function() {
    $('.js_multiSelectorDialog').find('.js_multiselector_searchLoading').removeClass('opacity0');
    $('.js_multiSelectorDialog').find('.js_multiselector_searchLoading').eq(0).addClass('opacity6');
  }, 500)
}

//ロード状態解除
function multiselectorLoadingFinish() {
  $('.js_multiSelectorDialog').find('.js_multiselector_searchLoading').addClass('display_n');
}

//フィルタ削除
function multiselectorDeleteFilter(filterId) {
  $('.js_multiSelectorDialog').find("#" + filterId).remove();

  //フィルタ数が3件以下になった時、ロック解除
  if ($('.js_multiSelectorDialog').find('.js_filterArea').children().length < 4) {
    $('.js_multiSelectorDialog').find('.js_groupFilter-keyword').prop('disabled', false);
    $('.js_multiSelectorDialog').find('.js_userFilter-keyword').prop('disabled', false);
    $('.js_multiSelectorDialog').find('.js_postFilter-keyword').prop('disabled', false);
    $('.js_multiSelectorDialog').find('.js_labelFilter-keyword').prop('disabled', false);
    $('.js_multiSelectorDialog').find('.js_filterLock').remove();
  }

   var multiselector = $('.js_multiSelectorDialog').find('.js_multiselector');

  //ロード状態　フィルタ選択エリア
  multiselectorLoadingStart();

  //部分再描画処理 -> グループ一覧/ユーザ一覧
   multiselector.find('.js_multiselector_noselectbody').ui_multiselector({cmd:'searchFilterBody', onload:function() {multiselector.trigger('change');}});
   multiselector.find('.js_multiselector_noselectgroup').ui_multiselector({cmd:'searchFilterGroup', onload:function() {multiselector.trigger('change');}});

  //部分再描画処理 -> フィルタ選択エリア
  multiselector.find(".js_multiselector_filterPost").ui_multiselector({cmd:"searchFilterPost", onload:function() {multiselector.trigger('change');}});
  multiselector.find(".js_multiselector_filterLabel").ui_multiselector({cmd:"searchFilterLabel", onload:function() {multiselectorLoadingFinish();multiselector.trigger('change');}});

}

//フィルタ領域の開閉
function multiselectorFilterDspChange() {
  if($('.js_multiSelectorDialog').find('.js_filterCloseArea').hasClass('display_n')) {
    $('.js_multiSelectorDialog').find('.js_filterOpenArea').addClass('display_n');
    $('.js_multiSelectorDialog').find('.js_filterCloseArea').removeClass('display_n');
    $('.js_multiSelectorDialog').find('.js_selectArea').addClass('w50');
    $('.js_multiSelectorDialog').find('.js_selectedArea').addClass('w50');
    $('.js_multiSelectorDialog').find('.js_selectArea').removeClass('w65');
    $('.js_multiSelectorDialog').find('.js_selectedArea').removeClass('w35');
    $('.js_multiSelectorDialog').find('.js_selectedArea-1column').children().append('<div class="js_spacer multiselector_2columnSpacer"></div>');
    $('.js_multiSelectorDialog').find('.multiselector_selected-1column').addClass('multiselector_selected-2column');
    $('.js_multiSelectorDialog').find('.multiselector_selected-1column').removeClass('multiselector_selected-1column');
    $('.js_multiSelectorDialog').find('.js_selectedContent-2column').parent().removeClass('mb5');
    $('.js_multiSelectorDialog').find('.js_selectedContent-2column').parent().addClass('multiselector_selectedContent-2column');
    $('.js_multiSelectorDialog').find('.js_selectedContent-2column').parent().addClass('scrollInList1_content-2column');
    $('.js_multiSelectorDialog').find('.js_selectedContent-2column').parent().removeClass('scrollInList1_content');
    $('.js_multiSelectorDialog').find('.js_selectedArea-2column').eq(0).children().append('<div class="js_spacer multiselector_2columnSpacer"></div>');
    $('.js_multiSelectorDialog').find('.js_selectedArea-2column').eq(1).children().append('<div class="js_spacer multiselector_2columnSpacer"></div>');
    $('.js_multiSelectorDialog').find('.multiselector_arrowArea-event').addClass('multiselector_arrowArea-event2Column');
    $('.js_multiSelectorDialog').find('.multiselector_arrowArea-event').removeClass('multiselector_arrowArea-event');
  } else {
    $('.js_multiSelectorDialog').find('.js_filterCloseArea').addClass('display_n');
    $('.js_multiSelectorDialog').find('.js_filterOpenArea').removeClass('display_n');
    $('.js_multiSelectorDialog').find('.js_selectArea').removeClass('w50');
    $('.js_multiSelectorDialog').find('.js_selectedArea').removeClass('w50');
    $('.js_multiSelectorDialog').find('.js_selectArea').addClass('w65');
    $('.js_multiSelectorDialog').find('.js_selectedArea').addClass('w35');
    $('.js_multiSelectorDialog').find('.multiselector_selected-2column').addClass('multiselector_selected-1column');
    $('.js_multiSelectorDialog').find('.multiselector_selected-2column').removeClass('multiselector_selected-2column');
    $('.js_multiSelectorDialog').find('.js_spacer').remove();
    $('.js_multiSelectorDialog').find('.js_selectedContent-2column').addClass('mb5');
    $('.js_multiSelectorDialog').find('.js_selectedContent-2column').removeClass('multiselector_selectedContent-2column');
    $('.js_multiSelectorDialog').find('.js_selectedContent-2column').addClass('scrollInList1_content');
    $('.js_multiSelectorDialog').find('.js_selectedContent-2column').removeClass('scrollInList1_content-2column');
    $('.js_multiSelectorDialog').find('.js_selectedArea-2column').removeClass('js_spacer');
    $('.js_multiSelectorDialog').find('.multiselector_arrowArea-event2Column').addClass('multiselector_arrowArea-event');
    $('.js_multiSelectorDialog').find('.multiselector_arrowArea-event2Column').removeClass('multiselector_arrowArea-event2Column');
  }
}

function multiselectorSearchComplete() {
  //親画面に反映する
  $('.js_multiSelectorDialog').data('baseContent').prop('disabled', false);

  var selector = $('.js_multiSelectorDialog').data('baseContent').children('.js_multiselector');
  var multiselector = $('.js_multiSelectorDialog').find('.js_multiselector').find('.js_multiselector_select');
  var result = {result0: "", result1: ""};
  for (var i = 0; i < multiselector.length; i++) {
    var resultParam = {targetKey: "", select:[]};
    resultParam.targetKey = multiselector.eq(i).attr('name');

    var resultValue = [];
    var param = multiselector.find('input[name="' + multiselector.eq(i).data('multiselector_parametername') + '"]');
    for (var j = 0; j < param.length; j++) {
      resultValue.push(param.eq(j).val());
    }
    resultParam.select = resultValue;

    if (i == 0) {
      result.result0 = resultParam;
    } else if (i == 1) {
      result.result1 = resultParam;
    }

    if (result.result1 != "") {
      selector.ui_multiselector({cmd:'detailDialogSubmit', result:[result.result0, result.result1]});
    } else if (result.result0 != "") {
      selector.ui_multiselector({cmd:'detailDialogSubmit', result:[result.result0]});
    }
  }

  //ダイアログを閉じる
  $('.js_multiSelectorDialog').dialog('close');
  $('.js_multiSelectorDialog').remove();
}