/**
 * jqueryプラグイン初期化処理
 * ここに書いた処理はDOM読み込みと並行処理になる
 */
;(function($) {
    //jqueryプラグイン読み込み
    if ($.fn.grpselect) {
        //読み込み済みの場合何もしない
        return;
    }
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
                paramName = paramName.slice('grpsel'.length);
                paramName = name + paramName;
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
                paramName = paramName.slice('grpsel'.length);
                paramName = name + paramName;
                var val = $(this).val();
                $('fieldset[name="' + name + '"]').append(
                    $('<input type=\"hidden\" name=\"' + paramName +'\" value=\"' + val +'\"></input>')
                );
            });
            completeSearchDialog($('fieldset[name="' + name + '"]'));
        }
        dlg.load('../common/grpseldialog.do',
                param,
                function () {
                  var buttons = {
                                OK: function() {
                                //確定時
                                    commitButton(dlg);
                                    $(this).dialog('close');
                                }
                            }
                    buttons[msglist_grpsel['cmn.cancel']] = function() {
                        //キャンセル時
                        $(this).dialog('close');
                    };
                            //ユーザ選択要素の全グループ選択、グループ選択ボタンはdialog内で動作しないため非表示
                            dlg.find('table .js_btn_group_n1').hide();
                            dlg.find('table .group_btn2').hide();

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
                                // 単体選択はOKを隠す
                                if (dlg.is('.single')) {
                                    $( this ).siblings('.ui-dialog-buttonpane').find('button:eq(0)').hide();
                                }
                            },
                            close: function() {
                            },

                        });

            });


    };
    function openSearchDialog(button) {
      var selectBody = $(button).closest('.js_grpsel_body');

      selectBody.find('.js_multiselector_searchBtn').eq(0).trigger('click');

    }

    function completeSearchDialog(select) {


      var selectBody = $(select).closest('.js_grpsel_body');
      var resArea = selectBody.find('.js_grpsel_dsp');

      var name = resArea.attr('name');

      var addParam = new Array();

      var button = selectBody.find('.js_grpsel_selectBtn')
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
           paramName = 'grpsel' + paramName;
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
                paramName = paramName.slice('grpsel'.length);
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
      var selectBody = $(button).closest('.js_grpsel_body');
      var input = $('input[name="' + button.parent().find('input').attr('name') +  '"]')
                    .filter('[value="' + button.parent().find('input').attr('value') +  '"]');
      input.remove();
      button.parent().remove();
      selectBody.trigger('change');
    }

    $.fn.grpselect = function(option) {
        if (option.cmd == "openDialog") {
            openDialog($(this));
        } else if (option.cmd == "openSearchDialog") {
            openSearchDialog($(this));
        } else if (option.cmd == "completeSearchDialog") {
            completeSearchDialog($(this));
        } else if (option.cmd == "deleteSelect") {
            deleteSelect($(this));
        }
    };

})(jQuery);

