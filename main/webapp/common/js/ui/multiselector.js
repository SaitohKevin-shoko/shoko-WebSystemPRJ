/**
 *  ■使用方法
 *  利用画面でインクルードする
 *  以下のいずれかの初期化方法が使える
 *  ・画面のhtmlに静的にサブフォームにする場合
 *    ボタンに「data-multiselector_init」属性に初期化OPTIONを設定する
 *
 *  ■初期化OPTION
 *   {
 *       url: 描画更新URL
 *       param : 更新時追加パラメータ配列 以下の構造とする
 *               [{name: パラメータ名, value: パラメータ値}]
 *       onloaded:初期表示完了後イベント
 *
 *
 *   }
 *
 */

/**
 * jqueryプラグイン初期化処理
 * ここに書いた処理はDOM読み込みと並行処理になる
 */
;(function($) {
    //jqueryプラグイン読み込み
    if ($.fn.ui_multiselector) {
        //読み込み済みの場合何もしない
        return;
    }

    var labelTooltip = $();
    var initTtpPositionTop = 15;
    var initTtpPositionLeft = 15;
    var ttpMinWidth = 70;
    var ttpOpacity = 85;

    //関数宣言
    function setTooltipMouseOver(e) {
        setTooltipPosition(e)
        $("#ttp")
        .css("display","none")
        .css("filter","alpha(opacity=" + ttpOpacity + ")")
        .fadeIn("fast")
    }

    function setTooltipPosition(e) {
        setTooltipSize(e);
        var tooltipW = labelTooltip.outerWidth() + (e.pageX) + initTtpPositionLeft;
        if (tooltipW > document.documentElement.clientWidth) {
            var tooltipPosW = (e.pageX) - ttpMinWidth - initTtpPositionLeft;
            labelTooltip
            .css("top",(e.pageY) + initTtpPositionTop + "px")
            .css("left",tooltipPosW + "px")
        } else {
            var tooltipPosW = (e.pageX) + initTtpPositionLeft
            labelTooltip
            .css("top",(e.pageY) + initTtpPositionTop + "px")
            .css("left",tooltipPosW + "px")
        }
    }

    function setTooltipSize(e) {
        var maxHeigth = document.documentElement.offsetHeight - (e.pageY) - initTtpPositionTop;
        var maxWidth = document.documentElement.clientWidth - (e.pageX);
        if (maxWidth < ttpMinWidth) {
            maxWidth = ttpMinWidth;
        }
        labelTooltip
        .css("max-height", maxHeigth + "px")
        .css("max-width", maxWidth + "px")
        .css("min-width", ttpMinWidth + "px")
        .css("overflow", "hidden");
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


    /**
     * 描画時の初回スクロール調整＆前回スクロールの引き継ぎ
     */
    function initScroll(multiselector) {
      if (multiselector.is(':visible')
          && multiselector.data('scrInfoList')) {
        var scrInfoList = multiselector.data('scrInfoList');
        //初回描画時
        if (scrInfoList.length == 0) {
          if (multiselector.find('.js_multiselector_grpSelect.bgC_tableCell').length > 0) {
            var checked = multiselector.find('.js_multiselector_grpSelect.bgC_tableCell:visible');
            var pos = checked.position().top;
            checked.closest('.ofy_a').animate({scrollTop: pos}, 0)
          }
        }
        $.each(scrInfoList, function() {
          var scrInfo = this;
          var scrBody = multiselector.find(scrInfo.target).eq(scrInfo.index);
          if (scrBody) {
            scrBody.scrollTop(scrInfo.scrollTop);
          }
        });
        multiselector.removeData('scrInfoList');
      }
    }

    function saveScrollInfo(multiselector) {
       if (multiselector.data('scrInfoList')) {
         return false;
       }
       //変更前スクロール位置保管
       var scrInfoList = [];
       if (multiselector.find('.js_multiselector_groupSelection').length > 0) {
         scrInfoList.push({
           scrollTop:multiselector.find('.js_multiselector_groupSelection').scrollTop(),
           target:'.js_multiselector_groupSelection',
           index:0
         });
       }
       if (multiselector.find('.js_multiselector_childSelection').length > 0) {
         scrInfoList.push({
           scrollTop:multiselector.find('.js_multiselector_childSelection').scrollTop(),
           target:'.js_multiselector_childSelection',
           index:0
         });
       }
       multiselector.find('.js_multiselector_select .js_multiselector_selected').each(
         function(idx) {
           scrInfoList.push({
             scrollTop: $(this).scrollTop(),
             target:'.js_multiselector_select .js_multiselector_selected',
             index: idx
           });
         }
       );
       //スクロール状態を設定
       multiselector.data('scrInfoList', scrInfoList);

    }

    /** マルチセレクタのに非表示からの表示時にスクロール位置の初回調整を行う */
    const firstDisplayObserver = new ResizeObserver(function (entries) {
      $.each(entries, function() {
        var multiselector = $(this.target);
        var visible = multiselector.is(':visible');
        if (visible) {
          initScroll(multiselector);
          firstDisplayObserver.unobserve(this.target);
        }
      });
    });


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
        //選択先切り替え
        if (option.cmd == 'selectorChange') {
            var multiselector = $(this).closest('.js_multiselector');
            var targetselector = $(this).closest('.js_multiselector_select');

            if (multiselector.data('multiselector_target') == targetselector.attr('name')) {
              return  $(this);
            }
            multiselector.data('multiselector_target', targetselector.attr('name'));
            multiselector.find('.js_multiselector_select').each(function() {
              $(this).removeClass('multiselector_select-active')
              $(this).find('input[name$="selectTargetKey"]').removeAttr('checked');
              $(this).find('.js_multiselector_selectArrow').removeClass('cl_fontArrow');
              $(this).find('.js_multiselector_selectTbl').removeClass('selectoutline');
            })

            targetselector.addClass('multiselector_select-active');
            targetselector.find('input[name$="selectTargetKey"]').attr('checked', 'checked');
            targetselector.find('.js_multiselector_selectArrow').addClass('cl_fontArrow');
            $(this).find('.js_multiselector_selectTbl').addClass('selectoutline');
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
        if (option.cmd == 'delete'
            || option.cmd == 'delete_search') {
            var clicked = $(this);
            var multiselector = $(this).closest('.js_multiselector');
            var targetselector = $(this).closest('.js_multiselector_select');
            var selection = multiselector.find('.js_multiselector_noselectbody');

            if (multiselector.data('multiselector_target') != targetselector.attr('name')) {
              return  $(this);
            }
            if ($(multiselector).is('.js_multiselector_exec')) {
              return $(this);
            }

            if (option.cmd == 'delete_search') {
              $(this).parent().remove();
            } else {
              $(this).remove();
            }
            if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                //詳細検索ダイアログ ロード状態
                multiselectorLoadingStart();
            }

            selection.ui_multiselector({cmd:'selectionReload', onload:function() {if ($('.js_multiSelectorDialog').dialog('isOpen')) {multiselectorLoadingFinish();}multiselector.trigger('change');}}, e);
        }
        //全削除
        if (option.cmd == 'alldelete'
            || option.cmd == 'alldelete_search') {
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
              if (option.cmd == 'delete_search') {
                selected.parent().empty();
              } else {
                selected.empty();
              }

            } else {
              if (targetselector.find(this).length == 0) {
                return  $(this);
              }
              var selected = targetselector.find('.js_multiselector_selected');

              if (option.cmd == 'delete_search') {
                selected.parent().empty();
              } else {
                selected.empty();
              }

            }
            if ($('.js_multiSelectorDialog').dialog('isOpen')) {
                //詳細検索ダイアログ ロード状態
                multiselectorLoadingStart();
            }

            selection.ui_multiselector({cmd:'selectionReload', onload:function() {if ($('.js_multiSelectorDialog').dialog('isOpen')) {multiselectorLoadingFinish();}multiselector.trigger('change');}}, e);

        }
        //追加
        if (option.cmd == 'select'
            || option.cmd == 'select_search') {
            var clicked = $(this);
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
            if (option.cmd == 'select_search') {
              label.parent().remove();
            } else {
              label.remove();
            }
            return subform;

        }
        //全て選択
        if (option.cmd == 'allselect'
            || option.cmd == 'allselect_search') {
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
              if (option.cmd == 'allselect_search') {
                $(this).parent().remove();
              } else {
                $(this).remove();
              }
            });

            $(multiselector).addClass('js_multiselector_exec');
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

            multiselector.ui_multiselector({
              cmd:'init',
               onloaded: function() {
                 if (option.onloaded) {
                   option.onloaded.call(this);
                 }
                 $(this).trigger('change');
                }
            });

        }

        //選択要素初期化
        if (option && option.cmd == 'init') {
            var subform = $();
            var loadedEvt = option.onloaded
            function init() {
               var option = $(this).data('multiselector_init');
               if (!(option instanceof Object)) {
                    option =  (new Function("return " + option))();
               }
               if (loadedEvt) {
                 option.onloaded = loadedEvt
               }

               var multiselector = $(this);

               if ($(multiselector).is('.js_multiselector_exec')) {
                 return $(this);
               }

               //スクロール状態を設定
               saveScrollInfo(multiselector);

               //読み込み中表示
               delayLoadingDisp(
                 multiselector.find('.js_multiselector_selectLoading')
               );


               $(this).subform(
                 {
                   url: option.url,
                   param: option.param,
                   inputsrc: 'form',
                   reset: true,
                 }
               ).subform({
                    cmd: 'submit', onloaded: function() {
                    initTooltip(this);
                    var multiselector = $(this);

                    if (multiselector.is(':visible')) {
                      initScroll(multiselector);
                    } else {
                      firstDisplayObserver.observe(multiselector.get(0));
                    }

                    if (option.onloaded) {
                        option.onloaded.call(this);
                    }

                  }
              });
            };

            $(this).each(function() {
                if ($(this).closest('[data-multiselector_init]').length > 0) {
                  init.call($(this).closest('[data-multiselector_init]'));
                } else {
                  $(this).find('[data-multiselector_init]').each(function() {
                    init.call(this);
                  });
                }
            });
            return subform;
        }
        return $(this);
    };
    $(function() {
        $('body').ui_multiselector({cmd:'init'});
    });

})(jQuery);
