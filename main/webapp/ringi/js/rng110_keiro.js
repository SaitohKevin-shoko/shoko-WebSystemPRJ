/**
 *  経路設定用のscriptファイル。
 * gs_dandd_selectプラグインを利用してドラッグアンドドロップによる設定を実現している。
 * - ドラッグアンドドロップ機能の初期化
 * - 稟議フォーム設定ダイアログの初期化、設定完了イベントの制御
 * - フォーム構造内contentデータからjson生成処理の提供
 *
 */
$(function() {

//-------内部関数定義部---------------------------
        /** ダイアログ読み込み直後の初期化*/
        function dialogInit() {
            //経路使用条件区分選択
            $('#keiro_dialog .keiro_incondition > .content > div.inCond > select').change(
                function () {
                    $(this).prev().attr("value", $(this).val());
                }
                );
            //経路使用条件削除ボタン
            $('.keiro_incondition .content .delButton').click(
                    function () {
                        $(this).parent().remove();
                    }
                );
            //経路使用条件追加ボタン
            $('.keiro_incondition .content .js_addLink').click(
                    function () {
                        var inConds = $(this).parent().children();
                        var idx = -1;
                        $.each(inConds, function() {
                           var id = Number($(this).attr('name'));
                           if (isFinite(id) && id > idx) {
                             idx = id;
                           }
                        });
                        idx ++;
                        var addIncond = $(this).parent().children('div[name=template]').clone(true);
                        addIncond.insertBefore($(this).parent().children('div[name=template]'));
                        $.each(addIncond.find('[name]'), function() {
                            //input要素
                            //select要素
                            var replaceTo = 'inCond(' + idx + ')';
                            var nameTxt = $(this).attr('name');
                            nameTxt = nameTxt.replace(/inCond\(template\)/g , replaceTo);
                            $(this).attr('name', nameTxt);
                        });
                        addIncond.attr('name', idx);
                        dialogReload();
                    }
                );

            function resetTargetPosRemoveButton() {
               var targetPos = $('.target_pos .content .delButton');
               if (targetPos.length > 2) {
                  targetPos.css("display", "inline-block");
               } else {
                  targetPos.css("display", "none");
               }
            }
            resetTargetPosRemoveButton();
            //経路対象 役職削除ボタン
            $('.target_pos .content .delButton').click(
                    function () {
                        $(this).parent().remove();
                        resetTargetPosRemoveButton();
                    }
                );
            //経路対象 役職追加ボタン
            $('.target_pos .content .js_addLink').click(
                    function () {
                        var targetPos = $(this).parent().children();
                        var idx = -1;

                        $.each(targetPos, function() {
                           var id = Number($(this).attr('name'));
                           if (isFinite(id) && id > idx) {
                             idx = id;
                           }
                        });
                        idx ++;
                        var addTargetPos = $(this).parent().children('div[name=template]').clone(true);
                        addTargetPos.insertBefore($(this).parent().children('div[name=template]'));
                        $.each(addTargetPos.find('[name]'), function() {
                            //グループ要素
                            //役職要素
                            var replaceTo = 'targetpos(' + idx + ')';
                            var nameTxt = $(this).attr('name');
                            nameTxt = nameTxt.replace(/targetpos\(template\)/g , replaceTo);
                            $(this).attr('name', nameTxt);
                        });
                        addTargetPos.attr('name', idx);
                        resetTargetPosRemoveButton();
                    }
                );
          $('#keiro_dialog').ui_multiselector({cmd:'init'});

        }
        function reloadDsp(dsp) {
            //設定内容で表示情報を再読み込み
            var content = dsp.data('content');
            var param = new Array();
            param.push({
            name:"CMD",
            value:"dsp",
            });
            $.merge(param, content.param);
            dsp.load("../ringi/rng110keiroDialog.do",
                    param,
                    function() {
                            $( '#keiro_maker' ).gs_dandd_select({cmd:'init',
                                  dragArea:'.dragArea',
                                  dropArea:$('.dropArea'),
                                  dropH:false
                                });

                    });
        }
        /**ダイアログ描画処理*/
        function dialogOpen() {
            var content = $('#keiro_pref_dialog').data('content');
            var param = new Array();
            param.push({
            name:"CMD",
            value:"dialog",
            });
            $.merge(param, content.param);
            var scrollTop = $('#keiro_dialog').scrollTop(); // スクロール位置取得

            $('#keiro_pref_dialog').load("../ringi/rng110keiroDialog.do",
                    param,
                    function () {
                var buttons = {
                                OK: function() {
                                    stockDialogInput();
                                    dialogSubmit();
                                }
                            }
                    buttons[msglist_rng110_keiro['cmn.cancel']] = function() {
                        $('#keiro_pref_dialog').dialog('close');
                    };
                    $('#keiro_dialog').scrollTop(scrollTop); // 再描画時にスクロール位置復帰

                    //ユーザ選択要素の全グループ選択、グループ選択ボタンはdialog内で動作しないため非表示
                    $('#keiro_pref_dialog').find('table .js_userSelect_btn').hide();
                    $('#keiro_pref_dialog').find('table .js_groupSelect_btn').hide();
                closeloading();
                $('#keiro_pref_dialog').dialog({
                            autoOpen: true,  // hide dialog
                            bgiframe: true,   // for IE6
                            resizable: false,
                            modal: true,
                            height: 'auto',
                            width: '710',
                            overflow: "auto",
                            overlay: {
                                backgroundColor: '#000000',
                                opacity: 0.5
                            },
                            buttons: buttons,
                            close: function() {
                                var isContentDelete = $('#keiro_pref_dialog').data('newDrop');
                                if (isContentDelete) {
                                    var content = $('#keiro_pref_dialog').data('content');
                                    var sid = content.sid;
                                    $('#keiro_maker .dropArea div.contents.cell[name=' + sid +'] > .delButton').click();
                                }
                                $('#keiro_pref_dialog').data('newDrop', false);
                            },
                            open: function() {      // キャンセルボタンにフォーカスをあてる
                                $( this ).siblings('.ui-dialog-buttonpane').find('button:eq(0)').focus();
                            }

                        });
                dialogInit();
            });
        };
        /**ダイアログ描画処理*/
        function dialogSubmit() {
            var content = $('#keiro_pref_dialog').data('content');
            var param = new Array();
            param.push({
            name:"CMD",
            value:"dialogSubmit",
            });
            //入力エラーがない場合に実行されるスクリプトから呼ぶための関数を設定
            $('#keiro_pref_dialog').data("submitClose", function() {
                $('#keiro_pref_dialog').data('newDrop', false);
                var content = $('#keiro_pref_dialog').data('content');
                var dsp = $('#keiro_pref_dialog').data('dsp');
                dsp.data('content', content);
                reloadDsp(dsp);
                $('#keiro_pref_dialog').dialog('close');
            });

            $.merge(param, content.param);
            //サーバのアクション上で入力チェックを行う
            //入力エラーがなければ読み込んだHTML内に記載されたスクリプトタグで上記タグを実行しダイアログを閉じる
            $('#keiro_pref_dialog').load("../ringi/rng110keiroDialog.do",
                    param,
                    function () {
                dialogInit();
            });

        }


        /** ダイアログの入力要素の一時保管*/
        function stockDialogInput() {
            var content = $('#keiro_pref_dialog').data('content');
            content.param = new Array();
            //input要素
            $.each($('#keiro_dialog input'), function() {
                if ($(this).attr('type') == 'checkbox' && $(this).prop('checked') === false) {
                    return;
                }
                if ($(this).attr('type') == 'radio' && $(this).prop('checked') === false) {
                    return;
                }
                content.param.push({
                    name:$(this).attr('name'),
                    value:$(this).val(),
                });
            });
            //select要素
            $.each($('#keiro_dialog select'), function() {
                content.param.push({
                    name:$(this).attr('name'),
                    value:$(this).val(),
                });
            });

        }
        /** ダイアログ再読み込み*/
        function dialogReload() {
           stockDialogInput();
           dialogOpen();
        }
        /** 読み込み中ダイアログ */
        function loadingPop() {

            // 既存の読み込み中ダイアログは削除
            $('#keiro_maker_loading').parent().remove();

            // ダイアログ作成元となる要素をフォームに追加
            var formName = $('form').attr('name');
            if ($('#keiro_maker_loading').length < 1) {
                $('form[name=' + formName + ']').append("<div id=\"keiro_maker_loading\" style=\"display:none\">読み込み中</div>");
            }

            $('#keiro_maker_loading').dialog({
                autoOpen: true,  // hide dialog
                bgiframe: true,   // for IE6
                resizable: false,
                width: 250,
                modal: true,
                overlay: {
                    backgroundColor: '#000000',
                    opacity: 0.5
                }
            });

        }


        function closeloading() {
            if ($('#keiro_maker_loading') != null) {
                $('#keiro_maker_loading').dialog('close');
            }
        }


        /**デフォルトコンテント作成*/
        function createContent() {
            var contentDefault = $( '#keiro_maker' ).gs_dandd_select({cmd:'createContent', kbn:0});
            //ドロップ時のコンテンツ作成処理を設定
            contentDefault.createDropAreaContentJquery = function() {
                var ret = this.createDefaultContentJquery();
                return ret;
            };
            contentDefault.isDrop = function (dropArea, drag) {
                if ($(drag) && $(drag).parents('.dandd_droptable').length > 0) {
                    if ($(drag).parents('.dandd_droptable').get(0) != $(dropArea).parents('.dandd_droptable').get(0)) {
                       return false;
                    }
                }
                return true;
            };
            contentDefault.dropped = function (dropArea, isFirst, dsp) {
                var dropRoot = $(dropArea).parents('.dropArea');

                //ドロップ先が最終確認かどうか
                var keiroRootType = 0;
                if (dropRoot.is('.saisyukakunin')) {
                    keiroRootType = 1;
                }
                var keiroShareRange = 1;
                //個人設定経路テンプレート、個人設定テンプレートの場合
                if ($( '#keiro_pref_dialog' ).is('.personal')) {
                    keiroShareRange = 2;
                }
                var param = new Array();
                $.merge(param, this.param);
                var dlgOpen = false;

                if (isFirst) {
                    dlgOpen = true;
                    param.push({
                    name:"keiroShareRange",
                    value:keiroShareRange,
                    });
                    param.push({
                    name:"keiroRootType",
                    value:keiroRootType,
                    });
                    //新規ドロップ時のフラグを格納
                    $('#keiro_pref_dialog').data('newDrop', true);

                }
                var oldKeiroRootTypeParam = param.filter(function(obj) {
                        return (obj.name == 'keiroRootType')
                    });


                if (oldKeiroRootTypeParam.length > 0 && oldKeiroRootTypeParam[0].value != keiroRootType) {
                    dlgOpen = true;
                    //要素ドロップルートが変更された場合再設定ダイアログを開く
                    param = param.filter(function(obj) {
                        return (obj.name != 'keiroRootType')
                    });
                    param.push({
                    name:"keiroRootType",
                    value:keiroRootType,
                    });
                }
                this.param = param;

                if (dlgOpen) {

                    this.click(dsp);
                }
            }
            //ドロップ後のコンテンツをクリック時のイベントを設定
            contentDefault.click = function(dsp) {
                loadingPop();
                var content = this;
                content = $.extend(true, createContent(), content);
                $('#keiro_pref_dialog').data('content', content);
                $('#keiro_pref_dialog').data('dsp', dsp);
                dialogOpen();
            };
            contentDefault.danddParent = "keiroMaker";

            return contentDefault
        }
        function dragAreaReset() {
        //配置したドラッグ要素のContent設定を初期化
            $.each($('#keiro_maker .dragArea div'), function () {
               var content = $( '#keiro_maker' ).gs_dandd_select({cmd:'createContent'});
               content = $.extend(true, content, $(this).data('content'));
               $(this).data('content', content);
            });
        }
        //ドラッグ要素のコンボ選択でドラッグ要素を再読み込み
        function changeDragGroup() {
            var draglist = $(this).parents('div[name="draglist"]:first');
            var param = new Array();
            param.push({
            name:"CMD",
            value:"reloadDrag",
            });
            param.push({
            name:"rng110keiro.group.selected",
            value:$(this).val(),
            });
            draglist.load("../ringi/rng110.do",
                param, function() {
                    $( 'select[name="rng110keiro.group.selected"]' ).change(changeDragGroup);
                    dragAreaReset();
                    $( '#keiro_maker' ).gs_dandd_select({cmd:'resetDragContent',
                      dragArea:'.dragArea',
                    });

                }) ;
        }

//-------内部関数定義部 終了---------------------------

//-------onload処理---------------------------

        if ($( '#keiro_maker' ).is('.kakunin')) {
        //確認画面ではドラッグ停止
        } else {
            $( '#keiro_maker' ).gs_dandd_select({cmd:'init',
              dragArea:'.dragArea',
              dropArea:'.dropArea',
              defaultContent:createContent()
            });
            //配置済みのドロップ要素のContent設定を初期化
            $.each($('.dropArea .contents.cell'), function () {
               var content = $( '#keiro_maker' ).gs_dandd_select({cmd:'createContent'});
               content = $.extend(true, content, $(this).data('content'));
               $(this).data('content', content);
            });
            //配置済みのドラッグ要素のContent設定を初期化
            dragAreaReset();
        }

        $( 'select[name="rng110keiro.group.selected"]' ).change(changeDragGroup);
        //ダイアログ用divが未定義の場合はdivを追加
        if ($('#keiro_pref_dialog').length <= 0 ) {
            var dlgClass = '';
            if ($( '#keiro_maker' ).is('.personal')) {
                dlgClass = 'personal';
            }
            var dlg = $('<div></div>',
             {'id':'keiro_pref_dialog',
              'class':dlgClass,
              'style':'display:none;'
             }
            );
            $('body').append(dlg);
        }

        $('#keiro_pref_dialog').data('newDrop', false);


//-------onload処理 終了---------------------------

});
