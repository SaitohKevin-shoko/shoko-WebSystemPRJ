
$(function(){
    if ($(".js_mukoUser").length > 0) {
        for (var idx = 0; idx < $(".js_mukoUser").length; idx++) {
            var mukoUsrSid = $(".js_mukoUser").eq(idx).val();
            $("select[name='sch260subjectSelect']").find("option[value='" + mukoUsrSid + "']").addClass("mukoUserOption");
        }
    }


    //jqueryプラグイン読み込み
    if ($.fn.ui_multiselector) {
        //読み込み済みの場合何もしない
        return;
    }

    //jtooltipの表示処理を複数選択用にカスタマイズ
    //ツールチップの挿入先をbodyに変更 （本家はformタグに追加のため、formが複数あるとツールチップを多く作ってしまう）
    //ツールチップのソース要素に「.js_multiselector_label:has(span.tooltips)」を追加
    function initTooltip(subform) {
      $(subform).find(".js_multiselector_label:has(span.tooltips)")
      .on({ mouseenter:function(e){
          labelTooltip = $("<div id=\"ttp\">"+ ($(this).children("span.tooltips").html()) +"</div>");
          $("body").append(labelTooltip);
          setTooltipMouseOver(e);
        },
        mousemove:function(e){
          setTooltipPosition(e);
        },
        mouseleave:function(){
          labelTooltip.remove();
        },
        click:function(){
          labelTooltip.remove();
        }
      });
    }

    $.fn.ui_multiselector = function(option, e) {
        //動作にはsubformプラグインの読み込みが必要
        if (!$.fn.subform) {
            console.error('subformプラグインの読み込みが必要です')
            return $(this);
        }
        //ローディング表示遅延実行
        function delayLoadingDisp(loading) {
            $(loading)
              .css({opacity: 0})
              .removeClass('display_none')
              .delay(500)
              .animate({opacity: 1}, 0);
        }

        //選択元切り替え
        if (option.cmd == 'selectionChange') {
            var multiselector = $(this).closest('.js_multiselector');
            var selection = multiselector.find('.js_multiselector_noselectbody');
            var label = $(this);

            if ($(multiselector).is('.js_multiselector_exec')) {
              return $(this);
            }
            if ($(this).is('.cursor_d')) {
              return $(this);
            }
            //ラジオ更新
            label.parent().children().each(function() {
                $(this).removeClass('bgC_tableCell');
                $(this).removeClass('cursor_d');
                $(this).addClass('content-hoverChange');
                $(this).addClass('eventImg');
                $(this).addClass('cursor_p');
                $(this).children('input[type="radio"]').prop('checked', false);
            });
            label.addClass('bgC_tableCell');
            label.addClass('cursor_d');
            label.removeClass('content-hoverChange');
            label.removeClass('eventImg');
            label.removeClass('cursor_p');
            label.children('input[type="radio"]').prop('checked', true);

            //読み込み中表示
            delayLoadingDisp(
              multiselector.find('.js_multiselector_selectionLoading')
              );

            $(multiselector).addClass('js_multiselector_exec');
            if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                //詳細検索ダイアログ ロード状態
                multiselectorLoadingStart();
            }
            $(selection).subform({
                cmd: 'submit', onloaded: function() {
                  multiselector.removeClass('js_multiselector_exec');
                  multiselector.find('.js_multiselector_selectionLoading').addClass('display_none');
                  initTooltip(this);
                  //グループ切り替え時にスクロール位置を初期化
                  selection.parent().scrollTop(0);
                  if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                      //詳細検索ダイアログ ロード状態解除
                      multiselectorLoadingFinish();
                  }
                }
            });
        }
        if (option.cmd == 'selectionReload') {
            var multiselector = $(this).closest('.js_multiselector');
            //読み込み中表示
            delayLoadingDisp(
              multiselector.find('.js_multiselector_selectionLoading')
            );

            var selection = multiselector.find('.js_multiselector_noselectbody');
            $(multiselector).addClass('js_multiselector_exec');
            if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                //詳細検索ダイアログ ロード状態
                multiselectorLoadingStart();
            }
            return $(selection).subform({
                cmd: 'submit', onloaded: function() {
                  multiselector.removeClass('js_multiselector_exec');
                  multiselector.find('.js_multiselector_selectionLoading').addClass('display_none');
                  initTooltip(this);
                  if (option.onload) {
                    option.onload.call(this);
                  }
                  if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                    //詳細検索ダイアログ ロード状態解除
                    multiselectorLoadingFinish();
                  }
                }
            });

        }
        if (option.cmd == 'searchFilterBody' || option.cmd == 'searchFilterGroup') {
            var multiselector = $(this).closest('.js_multiselector');
            //詳細検索 ユーザ選択/グループ選択エリア更新
            delayLoadingDisp(
              multiselector.find('.js_multiselector_selectionLoading')
            );

            var selection;
            if (option.cmd == 'searchFilterBody') {
                selection = multiselector.find('.js_multiselector_noselectbody');
            } else if (option.cmd == 'searchFilterGroup'){
                selection = multiselector.find('.js_multiselector_noselectgroup');
            }
            $(selection).addClass('js_multiselector_exec');
            return $(selection).subform({
                cmd: 'submit', onloaded: function() {
                    $(selection).removeClass('js_multiselector_exec');
                    multiselector.find('.js_multiselector_selectionLoading').addClass('display_none');
                    initTooltip(this);
                    if (option.onload) {
                        option.onload.call(this);
                    }
                }
            });
        }
        if (option.cmd == 'searchFilterPost' || option.cmd == 'searchFilterLabel') {
            var multiselector = $(this).closest('.js_multiselector');
            //詳細検索 ラベルエリア更新
            delayLoadingDisp(
              multiselector.find('.js_multiselector_selectionLoading')
            );

            var selection;
            if (option.cmd == 'searchFilterPost') {
                selection = multiselector.find('.js_multiselector_filterPost');
            } else if (option.cmd == 'searchFilterLabel'){
                selection = multiselector.find('.js_multiselector_filterLabel');
            }
            $(selection).addClass('js_multiselector_exec');
            return $(selection).subform({
                cmd: 'submit', onloaded: function() {
                    $(selection).removeClass('js_multiselector_exec');
                    multiselector.find('.js_multiselector_selectionLoading').addClass('display_none');
                    initTooltip(this);
                    if (option.onload) {
                        option.onload.call(this);
                    }
                }
            });
        }

        //削除
        if (option.cmd == 'delete_search') {
            var multiselector = $(this).closest('.js_multiselector');
            var targetselector = $(this).closest('.js_multiselector_select');
            var selection = multiselector.find('.js_multiselector_noselectbody');

            if (multiselector.data('multiselector_target') != targetselector.attr('name')) {
              return  $(this);
            }
            if ($(multiselector).is('.js_multiselector_exec')) {
              return $(this);
            }

            $(this).parent().remove();
            if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                //詳細検索ダイアログ ロード状態
                multiselectorLoadingStart();
            }

            selection.ui_sortingselector({cmd:'selectionReload', onload:function() {if ($('.js_multiSelectorDialog').dialog('isOpen')) {multiselectorLoadingFinish();}multiselector.trigger('change');}}, e);
        }
        //全削除
        if (option.cmd == 'alldelete_search') {
            var multiselector = $(this).closest('.js_multiselector');
            var targetselector = multiselector.find('.js_multiselector_select[name="'+ multiselector.data('multiselector_target') +'"]');
            var selection = multiselector.find('.js_multiselector_noselectbody');

            if (targetselector.children().length == 0) {
              return this;
            }
            if ($(multiselector).is('.js_multiselector_exec')) {
              return $(this);
            }

            //選択先が単体の場合
            if ($(this).closest('.js_multiselector_select').length == 0) {
              var selected = targetselector;
              selected.parent().empty();

            } else {
              if (targetselector.find(this).length == 0) {
                return  $(this);
              }
              var selected = targetselector.find('.js_multiselector_selected');
              selected.parent().empty();

            }
            if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                //詳細検索ダイアログ ロード状態
                multiselectorLoadingStart();
            }

            selection.ui_sortingselector({cmd:'selectionReload', onload:function() {if ($('.js_multiSelectorDialog').dialog('isOpen')) {multiselectorLoadingFinish();}multiselector.trigger('change');}}, e);

        }
        //追加
        if (option.cmd == 'select_search') {
            var multiselector = $(this).closest('.js_multiselector');
            var targetselector = multiselector.find('[name="' + multiselector.data('multiselector_target') + '"]');
            var paramName = targetselector.data('multiselector_parametername');
            var subform =  targetselector.find('.js_multiselector_selected');

            if ($(multiselector).is('.js_multiselector_exec')) {
              return $(this);
            }
            $(this).attr('name', paramName);

            var label = $(this).parents('.js_multiselector_selectchild');
            //読み込み中表示
            delayLoadingDisp(
              targetselector.find('.js_multiselector_selectLoading').removeClass('display_none')
            );
            $(multiselector).addClass('js_multiselector_exec');
            if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                //詳細検索ダイアログ ロード状態
                multiselectorLoadingStart();
            }

            var scrPos = subform.scrollTop();
            subform.subform({
              cmd:'submit',
              onloaded: function() {
                multiselector.removeClass('js_multiselector_exec');
                multiselector.find('.js_multiselector_selectLoading').addClass('display_none');
                multiselector.trigger('change');
                subform.scrollTop(scrPos);
                if (option.onload) {
                  option.onload.call(this);
                }
                if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                  //詳細検索ダイアログ ロード状態解除
                  multiselectorLoadingFinish();
                }
              }
            });
            //選択元の削除
            label.parent().remove();
            return subform;

        }
        //全て選択
        if (option.cmd == 'allselect_search') {
            var multiselector = $(this).closest('.js_multiselector');
            var targetselector = multiselector.find('[name="' + multiselector.data('multiselector_target') + '"]');
            var paramName = targetselector.data('multiselector_parametername');
            var subform =  targetselector.find('.js_multiselector_selected');
            if ($(multiselector).is('.js_multiselector_exec')) {
              return $(this);
            }

            if (multiselector.find('.js_multiselector_noselectbody .js_multiselector_selectchild').length == 0) {
              return this;
            }
            multiselector.find('.js_multiselector_noselectbody .js_multiselector_selectchild').each(function() {
                subform.append(
                $('<input></input>').attr({
                    type:'hidden',
                    name: paramName,
                    value: $(this).find('input[name="nonselect"]').attr('value')
                  })
                    );
            });
            //読み込み中表示
            delayLoadingDisp(
              targetselector.find('.js_multiselector_selectLoading')
            );
            if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                //詳細検索ダイアログ ロード状態
                multiselectorLoadingStart();
            }
            //選択元の削除
            multiselector.find('.js_multiselector_noselectbody  .js_multiselector_selectchild').each(function() {
              $(this).parent().remove();
            });

            $(multiselector).addClass('js_multiselector_exec');
            var scrPos = subform.scrollTop();

            subform.subform({
              cmd:'submit',
              onloaded: function() {
                multiselector.removeClass('js_multiselector_exec');
                multiselector.find('.js_multiselector_selectLoading').addClass('display_none');
                $(e.target).trigger('change');
                subform.scrollTop(scrPos);
                if (option.onload) {
                  option.onload.call(this);
                }
                if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                  //詳細検索ダイアログ ロード状態解除
                  multiselectorLoadingFinish();
                }
              }
            });
            return subform;
        }
        //詳細設定反映
        if (option.cmd == 'detailDialogSubmit') {
            var multiselector = $(this).closest('.js_multiselector');
            if ($(multiselector).is('.js_multiselector_exec')) {
              return $(this);
            }

            multiselector.find('.js_multiselector_selected').empty();

            $.each(option.result, function() {
              var result = this;
              var targetselector = multiselector.find('[name="' + result.targetKey + '"]');
              var subform =  targetselector.find('.js_multiselector_selected');
              $.each(this.select, function() {
                $('<input></input>').attr({
                    type:'hidden',
                    name: targetselector.data('multiselector_parametername'),
                    value: this
                  }).appendTo(subform);
              });

            });

            multiselector.ui_sortingselector({cmd:'init', onload:option.onload });

        }
    }
});

function sortingselectorOpenSearchDialog(button) {

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
   $('.js_multiSelectorDialog').find('.js_multiselector_noselectbody').ui_sortingselector({cmd:'selectionReload', onload:function() {multiselectorLoadingFinish();multiselector.trigger('change');searchInitScroll();}});
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