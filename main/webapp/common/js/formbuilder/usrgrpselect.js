/**
 * jqueryプラグイン初期化処理
 * ここに書いた処理はDOM読み込みと並行処理になる
 */
;(function($) {
    //jqueryプラグイン読み込み
    if ($.fn.usrgrpselect) {
        //読み込み済みの場合何もしない
        return;
    }

    /** コマンド要素定義 標準*/
    var CMD_ENUM = {
    //初期化
    INIT:"init",
    //スクロール設定
    SETSCROL:"setScroll",
    //スクロール実行
    DOSCROL:"doScroll",
    //選択済みリスト一括設定
    DSPSELECTED:"dspSelected",
    //指定選択済みリスト表示
    SHOWSELECTED:"showSelected",
    //指定選択済みリスト非表示
    HIDESELECTED:"hideSelected",
    //選択除外ユーザ設定
    SETBANUSR:"setBanUsr",
    //表示文字変更
    CHANGEDSP:"changeDsp",
    //選択ダイアログオープン
    OPENDIALOG:"openDialog",
    OPENSEARCHDIALOG:"openSearchDialog",
    //選択ダイアログ選択完了
    COMPLETESEARCHDIALOG:"completeSearchDialog",
    //選択ダイアログ選択完了
    DELETESELECT:"deleteSelect",
    }
    /**
     * スクロール設定
     */
    var setScrollPosition = function(id){
        var scrollPosition = $(window).scrollTop();
        $("<input>", {
            type: 'hidden',
            name: id +'.scrollY',
            value: scrollPosition
            }).appendTo($(this).find('td:first'));
    };

    /**
     * スクロール実行
     */
    var doScroll = function(id, scrollPosition) {
        if (scrollPosition > 0) {
            $(window).scrollTop(scrollPosition);
        }
    };
    /**
     * 選択済みリスト非表示
     */
    var hideSelected = function(id, key) {
        $(this).find('tr[name=\"' + id + '\\.selected\\(' + key + '\\)\\.head\"]').hide();
        $(this).find('tr[name=\"' + id + '\\.selected\\(' + key + '\\)\"]').hide();
    };
    /**
     * 選択済みリスト表示
     */
    var showSelected = function(id, key) {
        $(this).find('tr[name=\"' + id + '\\.selected\\(' + key + '\\)\\.head\"]').show();
        $(this).find('tr[name=\"' + id + '\\.selected\\(' + key + '\\)\"]').show();
    };
    /**
     * 選択済みリスト表示一括設定
     */
    var dspSelected = function(id, keys) {
        var usrgrpselect = $(this);
        usrgrpselect.find('tr[name^=\"' + id + '\\.selected\\(\"]').hide();
        var arrkeys;
        if ($.isArray(keys)) {
            arrKeys = keys;
        } else {
            arrKeys = [keys];
        }
        var selectedHeight = 0;
        switch (arrKeys.length) {
        case 1:
            selectedHeight = 10;
            break;
        case 2:
            selectedHeight = 3;
            break;
        }
        $.each(arrKeys, function() {
            usrgrpselect.find('tr[name^=\"' + id + '\\.selected\\(' + this + '\"]').show();
            usrgrpselect.find('tr[name^=\"' + id + '\\.selected\\(' + this + '\"]').find('td select').attr('size', selectedHeight);
        });

    };
    /**選択不可ユーザ設定*/
    var setBanUsr = function(id, usrSid) {
        var selectTd = $(this).find('td:first');
        selectTd.find('[name=\"' + id +'\\.banUsrSid\"]').remove();
        if (usrSid) {
            $.each(usrSid, function() {
                $("<input>", {
                    type: 'hidden',
                    name: id +'.banUsrSid',
                    value: this
                    }).appendTo(selectTd);

            });
        }
    };
    /**
     * 初期化
     */
    var init = function(id, keys, titles, scrollY, banUsrSid, setChange) {
        var usrgrpselect = $(this);

        //onChangeイベント未指定については旧仕様（CMD=initで再読み込み）を実行
        if (typeof setChange != 'function') {
            setChange = function() {
                buttonPush('init');
            }
        }
        var onChange = function() {
            setScrollPosition.call(this, id);
            setChange.call(this);
        }
        usrgrpselect.change(onChange);
        //選択ボックスチェンジイベントを停止
        usrgrpselect.find('select[multiple]').change(function (event) {
            // selectboxの選択によるチェンジイベントの親への伝播を止める)
            event.stopPropagation();
        });
        if (scrollY > 0) {
            doScroll.call(this, id, scrollY);
        }
        //全グループから選択用ボタンを設置
        var hideBtn =                $('<input></input>',
              {  'id': id + '.submitBtn',
                 'type':'button',
                 'style':'display:none'
              }
           );
        usrgrpselect.parents('form:first').append(
            hideBtn
        );
        hideBtn.click(function() {
            onChange.call(usrgrpselect)
        });

        //グループコンボのイベント
        usrgrpselect.find('[name=\"' + id +'\\.group\\.selectedSingle\"]').change(
                function() {
                   $(this).parents('table:first').usrgrpselect({cmd:'setScroll'});
                   $(this).parents('table:first').change();
                });
        //グループボタンのイベント
        usrgrpselect.find('[name=\"' + id +'\\.group\\.select\"]').click(
                function() {
                   $(this).parents('table:first').usrgrpselect({cmd:'setScroll'});
                   openGroupWindow_Disabled($('select[name=\"'+ id + '.group.selectedSingle\"]').get(0),
                           'elements.namedItem(\'' + id + '.group.selectedSingle\')', '0',  id + '.changeGrp', '1', id + '.submitBtn', null, '0');
                });

        setBanUsr.call(this, id, banUsrSid);

    };
    /**
     * ダイアログ表示
     */
    var openDialog = function(button) {
        var type = button.attr('type');
        var name = button.attr('name');
        if (type == 'button') {
            name = name.slice(0, (name.length - '.dialogBtn'.length));
            name = name + '.selectDialog';
        }
        var dlg = $('div[name="' + name + '"]');

        if (type == 'button') {
            //ボタンから実行時ダイアログのクローンを生成
            dlg.remove();
            var clone = $('div[name="' + name + '_tmp' + '"]').clone();
            clone.attr("name", name);
            button.after(clone);
            dlg = clone;
        }
        var param = Array();
        var paramMap = {};
        function  setParam(name, val) {
            if (!name) {
                return;
            }
            if (!paramMap[name]) {
                paramMap[name] = Array();
            }
            if (paramMap[name].indexOf(val) < 0) {
                param.push({
                name:name,
                value:val
                });
                paramMap[name].push(val);
            }
        }
        $.each(dlg.find('input'),
                    function() {
                var name = $(this).attr('name');
                var val = $(this).val();
                setParam(name, val);
            });
        $.each(dlg.find('select > option:selected'),
                    function() {
                var name = $(this).parent().attr('name');
                var val = $(this).val();
                setParam(name, val);
            });
        $.each(dlg.find('div.requestParam > option'),
                   function() {
                var name = $(this).attr('name');
                var val = $(this).val();
                setParam(name, val);
            });
        function commitButton(dlg) {
            var name = dlg.attr('name');
                name = name.slice(0, (name.length - '.selectDialog'.length));

            //削除
            $('fieldset[name="' + name + '"]').empty();
            //追加
            $.each(dlg.find('input'),
                    function() {
                var paramName = $(this).attr('name');
                if (!paramName) {
                   return;
                }
//                paramName = paramName.slice('usrgrpsel'.length);
//                paramName = name + paramName;
                var val = $(this).val();
                $('fieldset[name="' + name + '"]').append(
                    $('<input type=\"hidden\" name=\"' + paramName +'\" value=\"' + val +'\"></input>')
                );
            });
            $.each(dlg.find('select > option:selected'),
                    function() {
                var paramName = $(this).parent().attr('name');
                if (!paramName) {
                   return;
                }
//                paramName = paramName.slice('usrgrpsel'.length);
//                paramName = name + paramName;
                var val = $(this).val();
                $('fieldset[name="' + name + '"]').append(
                    $('<input type=\"hidden\" name=\"' + paramName +'\" value=\"' + val +'\"></input>')
                );
            });
            completeSearchDialog($('fieldset[name="' + name + '"]'));
        }
        dlg.load('../common/usrgrpseldialog.do',
                param,
                function () {
                  var buttons = {
                                OK: function() {
                                //確定時
                                    commitButton(dlg);
                                    $(this).dialog('close');
                                }
                            }
                    buttons[msglist_usrgrpsel['cmn.cancel']] = function() {
                        //キャンセル時
                        $(this).dialog('close');
                    };
                            //ユーザ選択要素の全グループ選択、グループ選択ボタンはdialog内で動作しないため非表示
                            dlg.find('table .js_userSelect_btn').hide();
                            dlg.find('table .js_groupSelect_btn').hide();

                dlg.dialog({
                            autoOpen: true,  // hide dialog
                            bgiframe: true,   // for IE6
                            resizable: false,
                            modal: true,
                            //height: '580',
                            width: 'auto',
                            height: 'auto',
                            overflow: 'auto',
                            overlay: {
                                backgroundColor: '#000000',
                                opacity: 0.5
                            },
                            buttons: buttons,
                            open: function() {
                                // キャンセルボタンにフォーカスをあてる
                                $( this ).siblings('.ui-dialog-buttonpane').find('button:eq(1)').focus();
                            },
                            close: function() {
                            },

                        });
                        // 単体選択はOKを隠す
                        if (dlg.is('.single')) {
                            dlg.siblings('.ui-dialog-buttonpane').find('button:eq(0)').hide();
                        }

            });


    };
    function openSearchDialog(button) {
      var selectBody = $(button).closest('.js_usrgrpsel_body');

      selectBody.find('.js_multiselector_searchBtn').eq(0).trigger('click');

    }

    function completeSearchDialog(select) {


      var selectBody = $(select).closest('.js_usrgrpsel_body');
      var resArea = selectBody.find('.js_usrgrpsel_dsp');

      var name = resArea.attr('name');

      var addParam = new Array();

      var button = selectBody.find('.js_usrgrpsel_selectBtn')
      $(button).prop('disabled', true);

      select
        .find('input')
        .each(function() {
           var paramName = $(this).attr('name');

           if (!paramName) {
             return;
           }

           if (!paramName.startsWith(name)) {
             return;
           }
           paramName = paramName.slice(name.length);
           paramName = 'usrgrpsel' + paramName;
           var inp = $(this).clone(true);
           inp.attr('name', paramName);
           resArea.append(inp);
        });
      var isMulti = (resArea.prop('disabled') == true);
      if (isMulti) {
        resArea.prop('disabled', false);
      }
      resArea.subform({
        cmd:'submit',
        param: addParam,
        onloaded: function () {
            $(this).trigger('change');
            $.each($(this).find('input'),
                    function() {
                var paramName = $(this).attr('name');
                if (!paramName) {
                   return;
                }
                paramName = paramName.slice('usrgrpsel'.length);
                paramName = name + paramName;
                $(this).attr('name', paramName);


            });
            $(button).prop('disabled', false);
            if (isMulti) {
              resArea.prop('disabled', true);
            }


          },
        });
    }

    function deleteSelect(button) {
      var selectBody = $(button).closest('.js_usrgrpsel_body');
      var input = $('input[name="' + button.parent().find('input').attr('name') +  '"]')
                    .filter('[value="' + button.parent().find('input').attr('value') +  '"]');
      input.remove();
      button.parent().remove();
      selectBody.trigger('change');
    }
    $.fn.usrgrpselect = function(option) {

        if (option.cmd == CMD_ENUM.SETSCROL) {
            setScrollPosition.call(this, this.attr("name"));
        } else if (option.cmd == CMD_ENUM.DOSCROL) {
            doScroll.call(this, this.attr("name"), option.scroll);
        } else if (option.cmd == CMD_ENUM.DSPSELECTED) {
            dspSelected.call(this, this.attr("name"), option.key);
        } else if (option.cmd == CMD_ENUM.SHOWSELECTED) {
            showSelected.call(this, this.attr("name"), option.key);
        } else if (option.cmd == CMD_ENUM.HIDESELECTED) {
            hideSelected.call(this, this.attr("name"), option.key);
        } else if (option.cmd == CMD_ENUM.INIT) {
            init.call(this, this.attr("name"), option.key, option.titles, option.scroll, option.banUsrSid, option.onChange);
        } else if (option.cmd ==CMD_ENUM.SETBANUSR) {
            setBanUsr.call(this, this.attr("name"), option.banUsrSid)
        } else if (option.cmd == CMD_ENUM.CHANGEDSP) {
            changeHead(option.id, option.msg);
        } else if (option.cmd == CMD_ENUM.OPENDIALOG) {
            openDialog($(this));
        } else if (option.cmd == CMD_ENUM.OPENSEARCHDIALOG) {
            openSearchDialog($(this));
        } else if (option.cmd == CMD_ENUM.COMPLETESEARCHDIALOG) {
            completeSearchDialog($(this));
        } else if (option.cmd == CMD_ENUM.DELETESELECT) {
            deleteSelect($(this));
        }
    };
    /**
     * ヘッダーネーム変更
     */
    var changeHead = function(id, msg) {
        $(id).html(msg);
    };

})(jQuery);
