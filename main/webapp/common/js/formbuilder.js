var escFormId = "";
$(function() {

//-------内部関数定義部---------------------------
        /** ダイアログ読み込み直後の初期化*/
        function dialogInit() {
            $('#comments').focus();
            var content = content = $('#form_dialog').data('content');
                                // ダイアログ表示サイズ変更
                                var dialogsize = 0;
                                var height = 350;

                                if ($('#form_dialog').width() > 450) {
                                    width = 674;
                                }
                                if ($('#form_dialog').height() > 350) {
                                    height = 500;
                                }
                                $('#form_dialog').height(height);

            //行削除ボタン
            $('#form_dialog').find('.delButton').click(function () {
                 $(this).parent().remove();
                 dialogReload();
            })
            switch (content.type) {
            /** コメント  */
            case 'label':
                if(!formFlg()) {
                    $('#notitle').hide();
                    $('#dispalign').hide();
                    $('#aligntitle').hide();
                    $('#comments').removeAttr("disabled");

                } else {
                    if (content.body.notitle == 1) {
                        $('#notitle_0').prop('checked',true)
                        $('#dispalign').show();
                        $('#aligntitle').show();
                        $('#comments').attr('disabled', true);
                    } else {
                        $('#notitle_0').prop('checked',false)
                        $('#dispalign').hide();
                        $('#aligntitle').hide();
                        $('#comments').removeAttr("disabled");                    }
                }
                 break;
            /** テキスト入力　 */
            case 'textbox':
            /** テキスト入力(複数行)　 */
            case 'textarea':
            break;
            /** 日付入力  */
            case 'date':
            break;
            /** 数値入力  */
            case 'number':
            /**初期値 未入力で当日*/
            break;
            /** ラジオボタン  */
            case 'radio':
            /** コンボボックス  */
            case 'combo':
            /** チェックボックス */
            case 'check':
                $('#form_dialog a.js_addLink'
                ).click(function () {
                     $('#form_dialog').append($('<input />',
                        {type:'hidden',
                            'class':'jsonParam',
                            name:'list',
                            'value':''}));
                     dialogReload();
                     return false;
                });
            break;
            /**  自動計算（合計） */
            case 'sum':
                if(tableFlg()) {
                    $('#tableDisp').show();
                } else {
                    $('#tableDisp').hide();
                }
                $('#form_dialog a.js_addLink'
                ).click(function () {
                    $('#form_dialog').append($('<input />',
                            {type:'hidden',
                                'class':'jsonParam',
                                name:'addFormat',
                                'value':''}));
                     dialogReload();
                     return false;
                });
                $('#form_dialog select[name="type"]'
                ).change(function () {
                    if ($(this).val() == "0") {
                        $(this).next().css({visibility: ''});
                    } else {
                        $(this).next().css({visibility: 'hidden'});
                    }
                    return false;
                });
                $('#form_dialog select[name="type"]'
                ).change();
                if (content.body.table == 1) {
                    $('#table_0').prop('checked',true)
                } else {
                    $('#table_0').prop('checked',false)
                }
            break;
            /** 自動計算（その他） */
            case 'calc':
                if(tableFlg()) {
                    $('#tableDisp').show();
                } else {
                    $('#tableDisp').hide();
                }
                $('#form_dialog a.js_addLink'
                ).click(function () {
                     $('#form_dialog').append($('<input />',
                        {type:'hidden',
                            'class':'jsonParam',
                            name:'addFormat',
                            'value':''}));
                     dialogReload();
                     return false;
                });
                $('#form_dialog select[name="type"]'
                ).change(function () {
                    if ($(this).val() == "0") {
                        $(this).next().css({visibility: ''});
                    } else {
                        $(this).next().css({visibility: 'hidden'});
                    }
                    return false;
                });
                $('#form_dialog select[name="type"]'
                ).change();

                if (content.body.table == 1) {
                    $('#table_0').prop('checked',true)
                } else {
                    $('#table_0').prop('checked',false)
                }

                //式追加ボタンイベント
                $('#form_dialog button.js_siki_inputButton')
                    .click(function() {
                        var cmd = $(this).data('cmd');
                        var textDisp = $('#textSiki').val();
                        if(cmd == 1) {
                            textDisp = textDisp + "+";
                        } else if (cmd == 2) {
                            textDisp = textDisp + "-";
                        } else if (cmd == 3) {
                            textDisp = textDisp + "*";
                        } else if (cmd == 4) {
                            textDisp = textDisp + "/";
                        } else if (cmd == 5) {
                            textDisp = textDisp + "(";
                        } else if (cmd == 6) {
                            textDisp = textDisp + ")";
                        }
                        $('#textSiki').val(textDisp);
                        $('#textSiki').focus();

                    });

                //対象フォーム要素追加ボタンイベント
                $('#form_dialog button.js_siki_formatAddButton')
                    .click(function() {
                        if( $('#formatSelect').val() != 0) {
                            var textDisp = $('#textSiki').val();
                            var textDisp = textDisp +"["+$('#formatSelect option:selected').text() + "]";
                            $('#textSiki').val(textDisp);
                            $('#textSiki').focus();
                        }
                    });

            break;
            /** ユーザ選択 */
            /** グループ選択 */
            case 'user':
            case 'group':
                //ユーザ選択対象選択初期表示
                $('#form_dialog').ui_multiselector({cmd:'init'});
            break;
            /** 添付*/
            case 'temp':
            break;


        }





        }
        function initDspContent(dsp) {
            if (dsp.children('json').length != 0) {

            }
            var contentJson = dsp.children('json').text();
            if (contentJson) {
                contentJson = $.parseJSON(contentJson);
            }
            dsp.children('json').remove();
            var content = dsp.data('content');
            var root = dsp.parents('.dandd_root:first');
            var config = root.data('config');
            content = $.extend(true, root.gs_dandd_select({cmd:'createContent'}) , contentJson);
            dsp.data('content', content);

            if (config && config.maxSid < content.sid) {
              config.maxSid = content.sid;
            }


        }
        function reloadDsp(dsp) {
            //設定内容で表示情報を再読み込み
            var param = new Array();
            var body = {};
            var content = dsp.data('content');
            var testBody = new Array();
            createJSONArrayFormTable(testBody, dsp, 0);
            param.push({
            name:"CMD",
            value:"dsp"
            });
            param.push({
                name:"pluginId",
                value:$('#form_builder' ).data('pluginId')
                });
            param.push({
                name:"directoryId",
                value:$('#form_builder' ).data('directoryId')
                });
            param.push({
                name:"json",
                value:JSON.stringify(testBody[0])
                });
            dsp.load($( '#form_builder' ).data('action'),
                    param,
                    function() {
                        initDspContent(dsp);
                        $( '#form_builder' ).gs_dandd_select({cmd:'init',
                              dragArea:'.dragArea',
                              dropArea:$('.dropArea')
                            });

                    });
        }
        /**ダイアログ描画処理*/
        function dialogOpen() {
           var content = $( '#form_builder' ).gs_dandd_select({cmd:'createContent'});
           content = $.extend(true, content, $('#form_dialog').data('content'));
           var dsp = $('#form_dialog').data('dsp');
           var titleRequireFlg = 1;
           if (dsp.parents('.contents.cell').length > 0) {
                titleRequireFlg = 0;
           }

            var param = new Array();
            param.push({
            name:"CMD",
            value:"dialog"
            });
            param.push({
                name:"json",
                value:JSON.stringify(content)
                });
            param.push({
                name:"titleRequireFlg",
                value:$('#form_builder' ).data('action')
                });
            param.push({
                name:"pluginId",
                value:$('#form_builder' ).data('pluginId')
                });
            param.push({
                name:"directoryId",
                value:$('#form_builder' ).data('directoryId')
                });
            $('#form_dialog').load($( '#form_builder' ).data('action'),
                    param,
                    function () {
                var buttons = {
                                OK: function() {
                                    stockDialogInput();
                                    dialogSubmit();
                                }
                            }
                buttons[msglist_formbuilder['cmn.cancel']] = function() {

                    $(this).dialog('close');
                };

                var dialogHeight = 360;
                var dialogWidth = 450;

                switch (content.type) {
                  /** コメント  */
                  case 'label':
                      dialogWidth = 684;
                    break;

                  /** テキスト入力(複数行) */
                  case 'textarea':
                      dialogHeight = 520;
                      dialogWidth = 684;
                  break;

                  /** 自動計算（その他） */
                  case 'calc':
                      dialogHeight = 520;
                      dialogWidth = 684;
                  break;

                  /** ユーザ選択 */
                  case 'user':
                      dialogWidth = 690;
                  break;

                  /** グループ選択 */
                  case 'group':
                      dialogWidth = 690;
                  break;
                }
                closeloading();

                $('#form_dialog').dialog({
                            autoOpen: true,  // hide dialog
                            bgiframe: true,   // for IE6
                            resizable: false,
                            modal: true,
                            dialogClass:'dialog_button',
                            height: dialogHeight,
                            width: dialogWidth,
                            overflow: 'auto',
                            overlay: {
                                backgroundColor: '#FF0000',
                                opacity: 0.5
                            },
                            buttons: buttons,
                            close: function() {
                                var isContentDelete = $('#form_dialog').data('newDrop');
                                if (isContentDelete) {
                                    var content = $('#form_dialog').data('content');
                                    var sid = content.sid;
                                    $('#form_builder .dropArea div.contents.cell[name=' + sid +'] > .delButton').click();
                                }
                                $('#form_dialog').data('newDrop', false);
                            },
                            open: function() {
                                // キャンセルボタンにフォーカスをあてる
                                $( this ).siblings('.ui-dialog-buttonpane').find('button:eq(0)').focus();
                            }

                        });

                dialogInit();
            });
        };

        /**フォーム直下フラグ*/
        function formFlg() {
            var dsp = $('#form_dialog').data('dsp');
            if (dsp.parents('.contents.cell').length > 0) {
                return false;
            } else {
                return true;
            }
        }

        /**表ボディ下フラグ*/
        function tableFlg() {
            var dsp = $('#form_dialog').data('dsp');
            return  $(dsp).closest(".bodyDispContent").is(".bodyDispContent");
        }

        /**ダイアログ描画処理*/
        function dialogSubmit() {
            var content = $( '#form_builder' ).gs_dandd_select({cmd:'createContent'});
            content = $.extend(true, content, $('#form_dialog').data('content'));
            var param = new Array();
            param.push({
            name:'CMD',
            value:'dialogSubmit'
            });
            param.push({
                name:"json",
                value:JSON.stringify(content)
                });
            if (formFlg()) {
                titleRequireFlg = 1;
            } else {
                titleRequireFlg = 0;
            }
            param.push({
                name:"titleRequireFlg",
                value:titleRequireFlg
                });
            param.push({
                name:"pluginId",
                value:$('#form_builder' ).data('pluginId')
                });
            param.push({
                name:"directoryId",
                value:$('#form_builder' ).data('directoryId')
                });

            //入力エラーがない場合に実行されるスクリプトから呼ぶための関数を設定
            $('#form_dialog').data('submitClose', function() {
                $('#form_dialog').data('newDrop', false);
                var content = $('#form_dialog').data('content');
                var dsp = $('#form_dialog').data('dsp');
                dsp.data('content', content);
                reloadDsp(dsp);

                //フォームID変更後イベント ※必要に応じて呼び出し元画面で function fbEditAfter() を作成する
                if (typeof fbEditAfter == 'function') {
                    fbEditAfter(content, escFormId);
                }
                escFormId = "";
                $('#form_dialog').dialog('close');
            });
            //サーバのアクション上で入力チェックを行う
            //入力エラーがなければ読み込んだHTML内に記載されたスクリプトタグで上記タグを実行しダイアログを閉じる
            $('#form_dialog').load($( '#form_builder' ).data('action'),
                    param,
                    function () {
                dialogInit();
            });

        }
        function saibanFormID(content) {
            if (content.type == 'block' ) {
                return '';
            }
            var type = content.type;
            if (content.type == 'label') {
                type = 'comment';
            }
            var otherContentMap = content.otherContents;
            var ret = '';
            var formIDList = Array();
            var no = 1;
            $.each(otherContentMap, function () {
                if (this.type == content.type
                 && this.formID && this.formID.indexOf(type + '_') === 0) {
                    formIDList.push(this.formID);
                    var suuti = parseInt(this.formID.slice(type.length + 1, this.formID.length));
                    if (!isNaN(suuti) && no < suuti) {
                        no = suuti + 1;
                    }
                }
            });
            for (var i = 0; i <= formIDList.length; i++) {
                ret = type + '_' + no;
                if (formIDList.indexOf(ret) < 0) {
                   break;
                }
                no++;
            }
            return ret;
        }

        /** ダイアログの入力要素の一時保管*/
        function stockDialogInput() {
            var content = content = $('#form_dialog').data('content');
            content.title = $('#form_dialog').find('.jsonParam[name="title"]').val();
            content.sid = $('#form_dialog').find('.jsonParam[name="sid"]').val();
            content.formID = $('#form_dialog').find('.jsonParam[name="formID"]').val();
            content.type = $('#form_dialog').find('.jsonParam[name="type"]').val();
            content.require = $('#form_dialog').find('.jsonParam[name="require"]:checked').val();

            if (!content.body) {
                content.body = {};
            }
            switch (content.type) {
                /** コメント  */
                case 'label':
                     content.body.value = $('#form_dialog').find('.jsonParam[name="value"]').val();
                     if ($('#notitle_0').prop('checked') == 1) {
                         content.body.notitle = 1;
                     } else {
                         content.body.notitle = 0;
                     }
                     if ($('#valign_0').prop('checked') == 1) {
                         content.body.valign = 0;
                     } else {
                         content.body.valign = 1;
                     }
                     break;
                /** テキスト入力　 */
                case 'textbox':
                /** テキスト入力(複数行)　 */
                case 'textarea':
                    /**初期値*/
                    content.body.defaultValue = $('#form_dialog').find('.jsonParam[name="defaultValue"]').val();
                    /**文字数制限*/
                    content.body.maxlength = $('#form_dialog').find('.jsonParam[name="maxlength"]').val();
                break;
                /** 日付入力  */
                case 'date':
                    content.body.defaultDateKbn = $('#form_dialog').find('.jsonParam[name="defaultDateKbn"]').val();
                    content.body.defaultIndent = $('#form_dialog').find('.jsonParam[name="defaultIndentStr"]').val();
                break;
                case 'time':
                    /**初期値*/
                    content.body.defaultValue = $('#form_dialog').find('.jsonParam[name="defaultValue"]').val();
                break;

                /** 数値入力  */
                case 'number':
                /**初期値 未入力で当日*/
                content.body.defaultValue = $('#form_dialog').find('.jsonParam[name="defaultValue"]').val();
                /** 文字数制限*/
                content.body.maxlength = $('#form_dialog').find('.jsonParam[name="maxlength"]').val();
                /** 単位*/
                content.body.tanni = $('#form_dialog').find('.jsonParam[name="tanni"]').val();
                break;
                /** ラジオボタン  */
                case 'radio':
                /** コンボボックス  */
                case 'combo':
                    (function (content) {
                       content.body.list = Array();
                       $.each($('#form_dialog').find('.jsonParam[name="list"]'), function () {
                           var val = $(this).val();
                           content.body.list.push(val);
                           if ($(this).prev().prop('checked')) {
                               content.body.defaultValue = val;
                           }
                       });
                    })(content);
                break;
                /** チェックボックス */
                case 'check':
                    (function (content) {
                       content.body.list = Array();
                       content.body.defaultValue = Array();
                       $.each($('#form_dialog').find('.jsonParam[name="list"]'), function () {
                           var val = $(this).val();
                           content.body.list.push(val);
                           if ($(this).prev().prop('checked')) {
                               content.body.defaultValue.push(val);
                           }
                       });
                    })(content);
                break;
                /**  自動計算（合計） */
                case 'sum':
                    /** 計算対象フォームID[*/
                    content.body.target = Array();
                    $.each($('#form_dialog').find('.jsonParam.sums.row'), function () {
                        var format = {};
                        format.siki = '';
                        format.type = $(this).children('select[name="type"]').val();
                        if (format.type == '0') {
                            format.value = $(this).children('[name="value"][type="text"]').val();
                        } else {
                            format.value = $(this).find('select[name="type"] option:selected').text();
                        }
                        content.body.target.push(format);
                  });
                  if ($('#form_dialog').find('.jsonParam[name="addFormat"]').length > 0) {
                      content.body.target.push({siki:'', type:0, value:''});
                  }
                    /** 単位*/
                    content.body.tanni = $('#form_dialog').find('.jsonParam[name="tanni"]').val();

                    /** 桁*/
                    content.body.keta = $('#form_dialog').find('.jsonParam[name="keta"]').val()

                    /** 同行計算*/
                    if ($('#table_0').prop('checked') == 1) {
                        content.body.table = 1;
                    } else {
                        content.body.table = 0;
                    }

                    /** 丸め*/
                    if ($('#round_0').prop('checked') == 1) {
                        content.body.round = 0;
                    } else if ($('#round_1').prop('checked') == 1){
                        content.body.round = 1;
                    } else {
                        content.body.round = 2;
                    }

                break;
                /** 自動計算（その他） */
                case 'calc':
                    /** 計算式 書式  */
                    content.body.format = Array();
                    $.each($('#form_dialog').find('.jsonParam.calc.row'), function () {
                          var format = {};
                          format.siki = '';
                          if ($(this).children('[name="siki"]').length > 0) {
                               format.siki = $(this).children('[name="siki"]').val();
                          }
                          format.type = $(this).children('select[name="type"]').val();
                          if (format.type == '0') {
                              format.value = $(this).children('[name="value"][type="text"]').val();
                          } else {
                              format.value = $(this).find('select[name="type"] option:selected').text();
                          }
                          content.body.format.push(format);
                    });
                    if ($('#form_dialog').find('.jsonParam[name="addFormat"]').length > 0) {
                        content.body.format.push({siki:'', type:0, value:''});
                    }
                    /** 単位*/
                    content.body.tanni = $('#form_dialog').find('.jsonParam[name="tanni"]').val();

                    /** 桁*/
                    content.body.keta = $('#form_dialog').find('.jsonParam[name="keta"]').val()

                    /** 丸め*/
                    if ($('#round_0').prop('checked') == 1) {
                        content.body.round = 0;
                    } else if ($('#round_1').prop('checked') == 1){
                        content.body.round = 1;
                    } else {
                        content.body.round = 2;
                    }

                    /** 同行計算*/
                    if ($('#table_0').prop('checked') == 1) {
                        content.body.table = 1;
                    } else {
                        content.body.table = 0;
                    }

                    /** 計算式文字列*/
                    content.body.siki =  $('#form_dialog').find('.jsonParam[name="siki"]').val()

                break;
                /** ユーザ選択 */
                case 'user':
                    /** 複数選択フラグ*/
                    content.body.multiFlg = $('#form_dialog').find('.jsonParam[name="multiFlg"]:checked').val();
                    /** 制限使用フラグ　[*/
                    content.body.useSeigen = $('#form_dialog').find('.jsonParam[name="useSeigen"]:checked').val();
                    /** 選択可能ユーザ　[*/
                    content.body.select = {group:{selected:new Array()} };
                    content.body.selectable = new Array();
                    (function (content) {
                       $.each($('#form_dialog').find('.jsonParam input[name="select.selected(target)"]'), function () {
                           var val = $(this).val();
                           content.body.selectable.push(val);
                       });
                       $.each($('#form_dialog').find('.jsonParam select[name="select.group.selectedSingle"]'), function () {
                           var val = $(this).val();
                           content.body.select.group.selected.push(val);
                       });
                    })(content);
                    break;
                /** グループ選択 */
                case 'group':
                    /** 複数選択フラグ*/
                    content.body.multiFlg = $('#form_dialog').find('.jsonParam[name="multiFlg"]:checked').val();
                    /** 制限使用フラグ　[*/
                    content.body.useSeigen = $('#form_dialog').find('.jsonParam[name="useSeigen"]:checked').val();
                    /** 選択可能ユーザ　[*/
                    content.body.select = {group:{selected:new Array()} };
                    content.body.selectable = new Array();
                    (function (content) {
                       $.each($('#form_dialog').find('.jsonParam input[name="select.selected"]'), function () {
                           var val = $(this).val();
                           content.body.selectable.push(val);
                       });
                    })(content);
//                    /** 初期値[]  -1は申請者*/
//                    (function (content) {
//                       content.body.defaultValue = Array();
//                       $.each($('#form_dialog').find('.jsonParam[name="defaultValue.selected"]'), function () {
//                           var val = $(this).val();
//                           content.body.defaultValue.push(val);
//                       });
//                    })(content);
                    //以下は保管対象外の表示用選択値

                break;
                /** ブロック */
                case 'block':
                break;
                /** 表 */
                case 'blocklist':
                    /** デフォルトボディ行数*/
                    content.body.defLength = $('#form_dialog').find('.jsonParam[name="defLength"]').val();
                break;
                /** 添付ファイル*/
                case 'temp':
                break;
            }


        }
        /** ダイアログ再読み込み*/
        function dialogReload() {
           stockDialogInput();
           dialogOpen();
        }
        /**デフォルトコンテント作成*/
        function createContent() {
            var contentDefault = $( '#form_builder' ).gs_dandd_select({cmd:'createContent'});
            //ドロップ時のコンテンツ作成処理を設定
            contentDefault.createDropAreaContentJquery = function() {
                var ret = this.createDefaultContentJquery();
                return ret;
            };
            contentDefault.isDrop = function (dropArea, drag) {
                //ブロック要素はブロック要素に配置できない
                //以下をブロック要素内と判定
                //親に.contents.cellが二つ以上の場合
                //ドロップ先がdefaulｔかつ親に.contents.cellがある場合
                if (this.type=="block" || this.type=="blocklist") {
                    if ($(dropArea).parents('.contents.cell').length > 1
                      || ($(dropArea).parents('.contents.cell').length > 0 && $(dropArea).is('.default'))) {
                            return false;
                    }
                }
                //ブロック要素は横方向に配置できない
                if ((this.type=="block" || this.type=="blocklist") &&
                    ($(dropArea).is('.left') || $(dropArea).is('.right'))) {
                    return false;
                }
                var dsp = $(drag);
                //すでに配置済み要素
                //フォームテーブル直下 かつ ドロップ先がフォームテーブル直下ではない
                if (dsp.parents('.dandd_droptable').length == 1 && $(dropArea).parents('.dandd_droptable').length > 1) {
                   return false;
                }
                //配置済み要素が表要素内 かつ ドロップ先がブロック要素外
                if (dsp.parents('.body.blocklist').length > 0
                    && dsp.parents('.body.blocklist').get(0) != $(dropArea).parents('.body.blocklist').get(0)) {
                   return false;
                }
                //配置済み要素がブロック要素内 かつ ドロップ先がブロック要素外
                if (dsp.parents('.body.block').length > 0
                   && dsp.parents('.body.block').get(0) != $(dropArea).parents('.body.block').get(0)) {
                   return false;
                }
                return true;
            }
            contentDefault.dropped = function (dropArea, isFirst, dsp) {

                if (isFirst) {
                    //新規ドロップ時のフラグを格納
                    $('#form_dialog').data('newDrop', true);
                    this.title='';
                    this.click(dsp);
                }


            }
            //ドロップ後のコンテンツをクリック時のイベントを設定
            contentDefault.click = function(dsp) {
                loadingPop();

                //現在配置しているフォーム情報を保管（設定ダイアログ送信用）
                var srcObj = new Array();
                var contentMap = {};
                createJSONArrayFormTable(srcObj, $('#form_builder .dropArea:first'), 0, contentMap);
                var content = this;
                content = $.extend(true, createContent(), content);
                content.otherContents = contentMap;
                //新規配置時にフォームIDを自動採番
                if ($('#form_dialog').data('newDrop')) {
                    content.formID = saibanFormID(content);
                };

                $('#form_dialog').data('content', content);
                $('#form_dialog').data('dsp', dsp);

                //変更前のフォームIDを退避
                escFormId = content.formID;

                dialogOpen();
            };
            contentDefault.danddParent = "formbuilderContent";
            return contentDefault
        }
        function dragAreaReset() {
        //配置したドラッグ要素のContent設定を初期化
            $.each($('#form_builder .dragArea div'), function () {
               var content = $( '#form_builder' ).gs_dandd_select({cmd:'createContent'});
               content = $.extend(true, content, $(this).data('content'));
               $(this).data('content', content);
            });
        }
        /**
         * 再帰的にObjectを探索しフォームテーブルデータ構造を設定する
         *
         */
        function createJSONArrayFormTable(rootObj, root, step, map) {
            var next = rootObj
            var name = root.attr('name');
            var isParam = false;
            if (root.is('.contents.cell')) {
                isParam = true;
                var content = $( '#form_builder' ).gs_dandd_select({cmd:'createContent'});
                content = $.extend(true, content, root.data('content'));
                next = content;
                if (map) {
                    map[content.sid] = content;
                }
            } else if (root.is('.jsonArray')
             || root.is('.contents.row')) {
                isParam = true;
                var arr = new Array();
                next = arr;
            } else if (root.is('.jsonObject')) {
                isParam = true;
                next = {};
            }
            if (isParam) {
                if (rootObj instanceof Array) {
                    rootObj.push(next);
                } else if (rootObj[name] == undefined) {
                    rootObj[name] = next;
                } else {
                    if (next instanceof Array ) {
                        rootObj[name] = next;
                    }
                    next = rootObj[name];
                }
            }
            $.each(root.children(), function () {
                createJSONArrayFormTable(next, $(this), step + 1, map);
            });
        }
        function loadingPop() {

            $('#form_builder_loading').dialog({
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
            $('#form_builder_loading').dialog('close');
        }
//-------内部関数定義部 終了---------------------------

//-------onload処理---------------------------

        if ($( '#form_builder' ).is('.kakunin')) {
        //確認画面ではドラッグ停止
        } else {
            $( '#form_builder' ).gs_dandd_select({cmd:'init',
              dragArea:'.dragArea',
              dropArea:'.dropArea',
              defaultContent:createContent()
            });
            //配置済みのドロップ要素のContent設定を初期化
            $.each($('#form_builder .dropArea .contents.cell'), function () {

               initDspContent($(this));

            });
            //配置済みのドラッグ要素のContent設定を初期化
            dragAreaReset();
        }
        //'#form_builder'にjson取り出し用の関数を設定
        $('#form_builder').data('outputJSON', function() {
            var srcObj = new Array();
            createJSONArrayFormTable(srcObj, $('#form_builder .dropArea:first'), 0);
            var jsonStr = JSON.stringify(srcObj);
            //if (jsonStr != null) {
            //    var nbsp = String.fromCharCode(0xA0); // 半角スペースの文字コード値取得
            //    var re   = new RegExp(nbsp, "g");     // 全ての指定文字を指定するよう正規表現を取得
            //    jsonStr = jsonStr.replace(re, " ");   // 半角スペースを置換
            //}
            return jsonStr;
        });

        $('#form_dialog').data('newDrop', false);

        //掲示期間設定区分 変更時
        $(document).on('change','#notitle_0', function () {
            if ($(this).prop('checked') == 1) {
                $('#dispalign').show();
                $('#aligntitle').show();
                $('#comments').attr('disabled', true);
            } else {
                $('#dispalign').hide();
                $('#aligntitle').hide();
                $('#comments').removeAttr("disabled");
            }
        });

//-------onload処理 終了---------------------------

});

