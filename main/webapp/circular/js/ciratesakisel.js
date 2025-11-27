/**
 * jqueryプラグイン初期化処理
 * ここに書いた処理はDOM読み込みと並行処理になる
 */
;(function($) {
    //jqueryプラグイン読み込み
    if ($.fn.ciratesaki) {
        //読み込み済みの場合何もしない
        return;
    }
    /* スクロール時宛先表示件数  値変更字circular.css atesaki_scroll_area_heightのheightも調整*/
    var DSP_SCROLL_NUM = 10;
    /* 宛先 表示区分 0:スクロール表示 1:全て表示*/
    var dsp_to_kbn = 0;
    /** ダイアログ参照変数 */
    var dialog;
    function openAtesakiSel(btn) {
        var option = btn.find('.js_mailSendSelBtn_data').data();
        if (!option
           || !option.inputname
           || !option.addarea
           || !option.displayname
           ) {
             return false;
        }

        dialog = $('#atesakiSelPop').clone(true).removeAttr('id');
        dialog.appendTo($('#atesakiSelPop').parent().next());

        var multiselector = dialog.find('fieldset[name="'+ dialog.data('selectorname') +'"]');
        multiselector.find('input[name="'+option.inputname+'"]').remove();

        //選択済みパラメータのコピー
        btn.closest('form').find('input[name="'+ option.inputname +'"]')
          .each(function() {
            $(this).clone()
              .attr('name', dialog.data('paramname'))
              .appendTo(multiselector);
          });

        //ダイアログデータ関連保存
        $(dialog).data('option' , option);
        var carten =
            $('<div></div>')
            .addClass('w100 h100 pos_abs bgC_tableCell top0')
            .appendTo(dialog);


        /* テンプレートポップアップ */
        $(dialog).dialog({
            dialogClass:"fs_13",
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 570,
            width: 700,
            modal: true,
            title: option.displayname,
            open: function() {
                  //宛先選択再描画
                multiselector.ui_multiselector({cmd:'init', onloaded:function() {carten.remove();}});
            },
            close: function(event) {
              $(this).dialog('destroy');
              $(event.target).remove();
              dialog = $('#atesakiSelPop').clone(true);
            },
            overlay: {
                backgroundColor: '#000000',
                opacity: 0.5
            },
            buttons: [{
                    text:msglist_ciratesakisel["cmn.close"],
                    click: function() {
                    $(this).dialog('close');
                }
            }]
        });

    }
    /**
    *
    * @param addUsr
    * @param aappendTo
    * @returns
    */
    function addAtesakiUsr(addUsr, appendTo, inputName) {
       if (addUsr.sid == null) {
           return;
       }
       if (addUsr.sid == "-1") {
           return;
       }
       if ($(appendTo).find('input[name="'+inputName+'"][value="' + addUsr.sid + '"]').length > 0) {
           return;
       }
       appendTo.show();

       var child = $('#hinaSelectedAtesaki').children(0).clone().appendTo($(appendTo));

       var name = child.find('.js_namespace');
       if (addUsr.mukoUser) {
           name.addClass("mukoUser")
       }
       name.text(addUsr.name);
       child.append('<input type="hidden" name=' + inputName + ' value="' + addUsr.sid + '"  />');
    }

    /**
     * 追加した宛先エリアのスクロール
     * @param atesakiArea JQueryオブジェクト
     * @returns
     */
    function resetAtesakiScr(atesakiArea) {

        var atesakiScr = $(atesakiArea);
        atesakiScr.removeClass('sendAtesakiList-scr');

        var allDisp = atesakiScr.parent().children('.js_atesakiAllDisp');
        if (allDisp.length == 0) {
            return;
        }
        if (DSP_SCROLL_NUM < atesakiArea.find('div').length) {
            allDisp.removeClass('display_none');
            if (allDisp.text() != msglist_ciratesakisel['cmn.close']) {
                atesakiScr.addClass('sendAtesakiList-scr');
                if (allDisp.text().length == 0) {
                    allDisp.text(msglist_ciratesakisel['sml.218']);
                }
            }

        } else {
            allDisp.addClass('display_none');
        }
    }
    /**
    *
    * @param toList [{int sid, String name, boolean mukoUser }]
    * @param option {int btnkbn}
    *
    */
    function resetAtesakiUsr(toList, option) {
       var appendTo, appendParent;

       //配置先リセット
       appendTo = $(option.addarea);
       appendParent = appendTo.parent();
       appendTo.hide();
       appendTo.removeClass('sendAtesakiList-scr');
       appendTo.children().remove();

       //配置
       $.each(toList, function() {
           addAtesakiUsr(this, appendTo, option.inputname);

       });

       //配置後処理
       resetAtesakiScr(appendTo);

    }
    /**
     * ユーザ選択  選択ボタンクリックイベント関数
     */
    function doCommit() {
        var option = $(dialog).data('option');
        var toList = Array();
        dialog.find('input[name="'+ $(dialog).data('paramname') + '"]').each(function() {
            var label = $(this).next();
            var usr = {
                sid : $(this).val(),
                name : label.text(),
                mukoUser : label.hasClass("mukoUser")
            };
            toList.push(usr);
        });
        var option = $(dialog).data('option');

        resetAtesakiUsr(toList, option);

        dialog.dialog('close');


    }

    $(function() {
        //選択済み表示用共通
        //選択ユーザ  削除
        $(document).on("click", ".js_atesakiDel" , function(){
            var atesakiArea = $(this).parent().parent();
            $(this).parent().remove();
            resetAtesakiScr(atesakiArea);

        });

        //宛先 全て表示・スクロール表示をクリック
        $(document).on("click", ".js_atesakiAllDisp", function(){

            //スクロール表示だった場合
            if ($(this).text() == msglist_ciratesakisel['cmn.close']) {
                $(this).text(msglist_ciratesakisel['sml.218']);
            } else {
                $(this).text(msglist_ciratesakisel['cmn.close']);
            }
            resetAtesakiScr($(this).parent().find('.js_selectAtesakiArea'));
        });


        //ユーザ選択  選択ボタンクリック
        $(document).on("click", ".js_commitAtesaki", function(){
            doCommit();
        });

        /* ユーザ選択   グループ区分  hover*/
        $(document).on({
            mouseenter:function(){
              $(this).addClass("sml_dialogTab-hover");
            },
            mouseleave:function(){
              $(this).removeClass("sml_dialogTab-hover");
            }
        }, '.sml_dialogTab');

        /* ユーザ選択  グループ区分  変更*/
        $(document).on("change", '.js_atesakiSel_tab.tabHeader_tab-off input', function(){

            var onTab = $(this).parents('.tabHeader').find('.tabHeader_tab-on');
            onTab.removeClass('tabHeader_tab-on');
            onTab.addClass('tabHeader_tab-off');
            $(this).parents('.tabHeader_tab-off').addClass('tabHeader_tab-on');
            $(this).parents('.tabHeader_tab-off').removeClass('tabHeader_tab-off');

            var multiselector = dialog.find('fieldset[name="'+ dialog.data('selectorname') +'"]');

            //宛先選択再描画
            multiselector.ui_multiselector({
              cmd:'init',
              onloaded: function() {
                  //選択中のグループ選択でスクロール位置を調整
                  if (multiselector.find('.js_multiselector_grpSelect.bgC_tableCell').length > 0) {
                    var checked = multiselector.find('.js_multiselector_grpSelect.bgC_tableCell');
                    var pos = checked.position().top;
                    checked.closest('.ofy_a').animate({scrollTop: pos}, 0)

                  }
                }
            });

        });

    });

    var funcObj = {
          "addAtesakiUsr" : addAtesakiUsr,
          "resetAtesakiScr": resetAtesakiScr
        };

    $.fn.ciratesaki = function(cmd) {
      if (cmd == 'open') {
        openAtesakiSel(this);
        return this;
      }
      if (cmd == 'close') {
        dialog.dialog('close');
        return this;
      }
      if (!cmd) {
        return funcObj;
      }

    }



})(jQuery);



