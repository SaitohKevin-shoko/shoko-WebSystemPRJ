/**
 *  ■使用方法
 *  利用画面でインクルードする
 *  以下のいずれかの初期化方法が使える
 *  ・画面のhtmlに静的にサブフォームにする場合
 *    ボタンに「data-sortingselector_init」属性に初期化OPTIONを設定する
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
    if ($.fn.ui_sortingselector) {
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

    $.fn.ui_sortingselector = function(option, e) {
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
            targetselector.find('.js_multiselector_selectTbl').addClass('selectoutline');
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
                $(this).children('input[type="radio"]').prop('checked', false);
            });
            label.addClass('bgC_tableCell');
            label.addClass('cursor_d');
            label.removeClass('content-hoverChange');
            label.removeClass('eventImg');
            label.children('input[type="radio"]').prop('checked', true);

            //読み込み中表示
            delayLoadingDisp(
              multiselector.find('.js_multiselector_selectionLoading')
            );

            $(multiselector).addClass('js_multiselector_exec');
            $(selection).subform({
                cmd: 'submit', onloaded: function() {
                  multiselector.removeClass('js_multiselector_exec');
                  multiselector.find('.js_multiselector_selectionLoading').addClass('display_none');
                  initTooltip(this);
                  //グループ切り替え時にスクロール位置を初期化
                  selection.parent().scrollTop(0);
                }
            });
        }
        //並び替えモード切り替え
        if (option.cmd == 'sortingChange') {
            e.stopPropagation();
            var multiselector = $(this).closest('.js_multiselector');
            var checkbox = multiselector.find('.js_multiselector_sortingFlg');
            if (checkbox.is(':checked')) {
                //選択元
                multiselector.find('.js_multiselector_selection')
                  .append(
                    $('<div></div>')
                      .addClass('js_filter')
                      .addClass('pos_abs')
                      .addClass('top0')
                      .addClass('w100')
                      .addClass('h100')
                      .addClass('opacity6')
                      .addClass('bgC_gray')
                      );
                //選んでいない選択先
                multiselector.find('.js_multiselector_select:not([name="' + multiselector.data('multiselector_target') + '"]) .js_multiselector_selectTbl')
                  .append(
                    $('<div></div>')
                      .addClass('js_filter')
                      .addClass('pos_abs')
                      .addClass('top0')
                      .addClass('w100')
                      .addClass('h100')
                      .addClass('opacity6')
                      .addClass('bgC_gray')
                      );
                //全削除部
                multiselector.find('.js_multiselector_select[name="' + multiselector.data('multiselector_target') + '"] .js_multiselector_selectHead')
                  .append(
                    $('<div></div>')
                      .addClass('js_filter')
                      .addClass('pos_abs')
                      .addClass('top0')
                      .addClass('w100')
                      .addClass('h100')
                      .addClass('opacity6')
                      .addClass('bgC_gray')
                      );



            } else {
                //選択元
                multiselector.find('.js_multiselector_selection .js_filter').remove();
                //選んでいない選択先
                multiselector.find('.js_multiselector_select:not([name="' + multiselector.data('multiselector_target') + '"]) .js_multiselector_selectTbl .js_filter').remove();
                //全削除部
                multiselector.find('.js_multiselector_select[name="' + multiselector.data('multiselector_target') + '"] .js_multiselector_selectHead .js_filter').remove();
                //選択解除
                if (multiselector.data('sortingselector_sort1')) {
                  var sort1 = multiselector.data('sortingselector_sort1');
                  sort1.removeClass('sortingselector_sortselect');
                  sort1.find('.js_selectBg').remove();
                  multiselector.removeData('sortingselector_sort1');
                }

            }

            return $(this);

        }

        //選択先子要素クリック
        if (option.cmd == 'selectedClick') {
            var clicked = $(this);
            var multiselector = $(this).closest('.js_multiselector');
            var targetselector = $(this).closest('.js_multiselector_select');
            var selection = multiselector.find('.js_multiselector_noselectbody');

            if (multiselector.data('multiselector_target') != targetselector.attr('name')) {
              return $(this);
            }
            if ($(multiselector).is('.js_multiselector_exec')) {
              return $(this);
            }
            //並び替えモードではない
            if (multiselector.find('.js_multiselector_sortingFlg:checked').length == 0) {
              return  $(this).ui_sortingselector({cmd:'delete'}, e);
            }
            //並び替えモード（対象１を未選択）
            if (multiselector.find('.js_multiselector_sortingFlg:checked').length > 0
               && !multiselector.data('sortingselector_sort1')) {
              $(this).addClass('sortingselector_sortselect');
              multiselector.data('sortingselector_sort1', $(this));
              $(this)
                  .prepend(
                    $('<div></div>')
                      .addClass('js_selectBg')
                      .addClass('list_content-selected')
                      .addClass('pos_abs')
                      .addClass('top0')
                      .addClass('left0')
                      .addClass('w100')
                      .addClass('h100')
                      );
              return $(this);

            }
            //並び替えモード（対象１を選択済み）
            if (multiselector.find('.js_multiselector_sortingFlg:checked').length > 0
               && multiselector.data('sortingselector_sort1')) {
              var parent = $(this).parent();
              var sort1 = multiselector.data('sortingselector_sort1');
              var sort2 = $(this);
              var scrPos = parent.scrollTop();

              var sort1Idx = parent.children().index(sort1);
              var sort2Idx = parent.children().index(sort2);
              var prev1, prev2;
              if (sort1Idx > 0) {
                prev1 = sort1.prev();
              }
              if (sort2Idx > 0) {
                prev2 = sort2.prev();
              }
              if (prev1) {
                prev1.after(sort2);
              } else {
                parent.prepend(sort2);
              }
              if (prev2) {
                prev2.after(sort1);
              } else {
                parent.prepend(sort1);
              }
              $(sort1).removeClass('sortingselector_sortselect');
              $(sort1).find('.js_selectBg').remove();
              multiselector.removeData('sortingselector_sort1');
              sort2.trigger('change');
              parent.scrollTop(scrPos);
              return $(this);
            }

        }
        if (option.cmd == 'selectionReload') {
            var multiselector = $(this).closest('.js_multiselector');

            //読み込み中表示
            delayLoadingDisp(
              multiselector.find('.js_multiselector_selectionLoading')
            );
            var selection = multiselector.find('.js_multiselector_noselectbody');

            $(multiselector).addClass('js_multiselector_exec');
            return $(selection).subform({
                cmd: 'submit', onloaded: function() {
                  multiselector.removeClass('js_multiselector_exec');
                  multiselector.find('.js_multiselector_selectionLoading').addClass('display_none');
                  initTooltip(this);
                  if (option.onload) {
                    option.onload.call(this);
                  }
                }
            });

        }
        //削除
        if (option.cmd == 'delete') {
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

            $(this).remove();

            selection.ui_sortingselector({cmd:'selectionReload', onload:function() {multiselector.trigger('change');}}, e);
        }
        //全削除
        if (option.cmd == 'alldelete') {
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
              selected.empty();

            } else {
              if (targetselector.find(this).length == 0) {
                return  $(this);
              }
              var selected = targetselector.find('.js_multiselector_selected');
              selected.empty();

            }
            selection.ui_sortingselector({cmd:'selectionReload', onload:function() {multiselector.trigger('change');}}, e);

        }
        //追加
        if (option.cmd == 'select') {
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
              targetselector.find('.js_multiselector_selectLoading')
            );
            $(multiselector).addClass('js_multiselector_exec');
            var scrPos = subform.scrollTop();

            subform.subform({
              cmd:'submit',
              onloaded: function() {
                $(multiselector).removeClass('js_multiselector_exec');
                multiselector.find('.js_multiselector_selectLoading').addClass('display_none');
                multiselector.trigger('change');
                subform.scrollTop(scrPos);
                if (option.onload) {
                  option.onload.call(this);
                }
              }
            });
            //選択元の削除
            label.remove();
            return subform;

        }
        //全て選択
        if (option.cmd == 'allselect') {
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
            //選択元の削除
            multiselector.find('.js_multiselector_noselectbody  .js_multiselector_selectchild').each(function() {
              $(this).remove();
              });

            $(multiselector).addClass('js_multiselector_exec');
            var scrPos = subform.scrollTop();

            subform.subform({
              cmd:'submit',
              onloaded: function() {
                $(multiselector).removeClass('js_multiselector_exec');
                multiselector.find('.js_multiselector_selectLoading').addClass('display_none');
                $(e.target).trigger('change');
                subform.scrollTop(scrPos);
                if (option.onload) {
                  option.onload.call(this);
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

        //選択要素初期化
        if (option && option.cmd == 'init') {
            var subform = $();

            function init() {
               var option = $(this).data('sortingselector_init');
               if (!(option instanceof Object)) {
                    option =  (new Function("return " + option))();
               }
               var multiselector = $(this);
               if ($(multiselector).is('.js_multiselector_exec')) {
                 return $(this);
               }
               //変更前スクロール位置保管

               var scrInfoList = [];
               if (multiselector.find('.js_multiselector_groupSelection').length > 0) {
                 scrInfoList.push({
                   scrollTop:multiselector.find('.js_multiselector_groupSelection:visible').scrollTop(),
                   target:'.js_multiselector_groupSelection',
                   index:0
                 });
               }
               if (multiselector.find('.js_multiselector_childSelection').length > 0) {
                 scrInfoList.push({
                   scrollTop:multiselector.find('.js_multiselector_childSelection:visible').scrollTop(),
                   target:'.js_multiselector_childSelection',
                   index:0
                 });
               }
               multiselector.find('.js_multiselector_select .js_multiselector_selected:visible').each(
                 function(idx) {
                   scrInfoList.push({
                     scrollTop: $(this).scrollTop(),
                     target:'.js_multiselector_select .js_multiselector_selected',
                     index: idx
                   });
                 }
               );
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
                    //スクロール調整
                    if (scrInfoList.length == 0) {
                      if ($(this).find('.js_multiselector_grpSelect.bgC_tableCell').length > 0) {
                        var checked = $(this).find('.js_multiselector_grpSelect.bgC_tableCell');
                        var pos = checked.position().top;
                        checked.closest('.ofy_a').animate({scrollTop: pos}, 0)

                      }
                    }
                    var multiselector = $(this);
                    $.each(scrInfoList, function() {
                      var scrInfo = this;
                      var scrBody = multiselector.find(scrInfo.target).eq(scrInfo.index);
                      if (scrBody) {
                        scrBody.scrollTop(scrInfo.scrollTop);
                      }
                    });

                    if (option.onloaded) {
                        option.onloaded.call(this);
                    }
                    //並び替え初期化
                    $(this).find('.js_multiselector_sortingFlg').trigger('change');

                    //グループ選択保管
                    multiselector.data('selectGrp', $(".js_multiselector_grpSelect > input:checked").val());
                  }
              });
            };
            $(this).each(function() {
                if ($(this).closest('[data-sortingselector_init]').length > 0) {
                  init.call($(this).closest('[data-sortingselector_init]'));
                } else {
                  $(this).find('[data-sortingselector_init]').each(function() {
                    init.call(this);
                  });
                }
            });
            return subform;
        }
        return $(this);
    };



    $(function() {
        $('body').ui_sortingselector({cmd:'init'});
    });

})(jQuery);
