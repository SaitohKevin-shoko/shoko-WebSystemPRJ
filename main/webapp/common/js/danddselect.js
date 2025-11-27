/**
 * ドラッグアンドドロップで縦横で要素の配置変更を実現するjqueryプラグイン
 * jqueryプラグイン名は「gs_dandd_select」
 **/

/**
 * jqueryプラグイン初期化処理
 * ここに書いた処理はDOM読み込みと並行処理になる
 */
;(function($) {

    if ($.fn.gs_dandd_select) {
        //読み込み済みの場合何もしない
        return;
    }
    //UIが読み込まれていない
    if (!$.ui) {
        $.ajax({
            url: '../common/js/jquery-ui-1.8.16/jquery-ui-1.8.16.min.js',
            dataType:"script",
            async:false
        });
        //jqueryUIをスマートフォン用ブラウザ対応させるライブラリの読み込み
        $.ajax({
            url: '../common/js/jquery.ui.touch-punch0.2.3.min.js',
            dataType:"script",
            async:false
        });
    }

    /** コマンド定数*/
    var CMD_ENUM = {
            /**
             * 初期化
             * @param option.cmd:'init'
             * @param option.dragArea: ドラッグ先セレクタ
             * @param option.dropArea: ドロップ先セレクタ
             * @param option.contents: コンテンツ配列
             */
            init:'init',
            /**
             * ドロップ先にdroppableを設定
             * @param option.cmd:'setDropArea'
             * @param option.root: ドロップ先セレクタ
             */
            setDropArea:'setDropArea',
            /**
             * ドロップ先にコンテンツを追加
             * @param option.cmd:'addDropContent'
             * @param option.content: コンテンツクラス
             */
            addDropContent:'addDropContent',
            /**
             * コンテンツクラスを生成
             * @param option.cmd:'createContent'
             * @param option.content: コンテンツクラス
             */
            createContent:'createContent',
            /**
             * ドラッグ要素を再生成
             * @param option.cmd:'createContent'
             * @param option.content: コンテンツクラス
             */
            resetDragContent:'resetDragContent',
            /**
             * ドラッグ要素のコンテンツを階層化したオブジェクトを引数に指定して
             * 関数を実行する
             *
             * @param option.cmd:'resetDragContent'
             * @param option.dragArea: ドラッグ先セレクタ
             * @param option.func: 実行する関数
             */
            getAllParam:'getAllParam'

    };
    /**
     */
    function doPlugin(option) {
        switch(option.cmd) {
        case CMD_ENUM.init:
            init(this, option);
            break;
        case CMD_ENUM.setDropArea:
            /**
             * ドロップエリア設定
             */
            if (this.is('.dandd_dropArea' )) {
              setDropArea(this, option.root);
            } else {
              setDropArea(this.find('.dandd_dropArea' ), option.root);
            }
            break;
        case CMD_ENUM.addDropContent:
            /**
             * ドロップ済みコンテンツ追加処理
             */
            addDropContent(this, option.drop);
            break;
        case CMD_ENUM.createContent:
            /**
             * コンテンツクラス生成
             */
            return createContent(this, option);
        case CMD_ENUM.resetDragContent:
            return resetDragContent(this, option);
        case CMD_ENUM.getAllParam:
            return getAllParam(this, option);
        }
        return this;
    };
    function dragHelperStartCSS(drag) {

        return {
            'border':'1px',
            'border-style':'solid',
            'border-color':'#cccccc',
            'background-color': '#FFFFFF',
            'overflow': 'hidden',
            'width': $(drag).width(),
            'height': $(drag).height(),
        }
    }

    function init(root, option) {
            $(root).addClass('dandd_root');

            var config = $.extend({}, default_init_option, option);
            $(root).data('config', config);
            if (option.defaultContent) {
                var defContent = createContent(root, option.defaultContent);
                $(root).data('defaultContent', defContent);
            }
            var rootId = $(root).attr("id");
            if (config.dropArea) {
                $(root).find(config.dropArea).addClass('dandd_droptable');
            }
            var dropBase = $(root).find('.dandd_droptable' );
            setDefaultDropArea(dropBase, root);
            $.each(dropBase,function() {
                setDropBase($(this), root);
            });
            var dropArea = $(root).find( '.dandd_dropArea' );

            $.each(config.contents, function() {
                if (!(this instanceof Content)) {
                    return false;
                }
                this.rootId = rootId;
                var jqObj = this.createDragAreaContentJquery();
                jqObj.data('content', this);
                jqObj.appendTo(config.dragArea);
            });
            if (config.dragArea) {
              var dragArea = $(root).find( config.dragArea );
              $( dragArea ).addClass('dandd_dragtable');
              $( dragArea ).children().draggable( {
                helper: 'clone',
                zIndex: 10,
                scope:root.attr('id'),
                opacity:0.7,
                cursor: 'move',
                start: function(ev, ui) {
                    ui.helper.css(dragHelperStartCSS($(this)));
                    }
                } ).data('root', root);
              $( config.dragArea ).disableSelection();

            }

            //
            dropArea.gs_dandd_select({cmd:'setDropArea', root:root});
    }
    /**
     * ドロップ先情報を消去し
     * ドロップ挿入ガイドを解除する
     */
    function endDrop(dropBase) {
       var dropInfo = $(dropBase).data('dropInfo');
       if (dropInfo && dropInfo.dropDisp ) {
           $(dropInfo.dropDisp).remove();
       }
       if (dropInfo && dropInfo.dropArea ) {
           $(dropInfo.dropArea).removeClass('over');
       }
       if (dropInfo && dropInfo.parentRow ) {
           removeRow(dropInfo.parentRow);
       }
       $(dropBase).data('dropInfo', {});

    }
    /**
     * ドロップ準備 ドロップエリアにドラッグが重なった際にドロップ時の挿入先を設定
     * 挿入ガイドの表示を行う。
     * @returns {}
     */
    function initDrop(dropArea, drag) {
       var dropBase = $(dropArea).parents('.dandd_droptable.ui-droppable:first');
       endDrop(dropBase);
       var dropInfo = {'dropArea':dropArea};
       var dropDisp = $('<div></div>', {'class':'drop_guide'});
       var dropRow = $('<div></div>', {'class':'drop_guide_row'});

       if ($(dropArea).is('.top')) {
           dropDisp = dropRow.append(dropDisp);
           dropArea.parent().parent().before(dropDisp);
       }
       if ($(dropArea).is('.left')) {
           dropArea.parent().before(dropDisp);
       }
       if ($(dropArea).is('.right')) {
            dropArea.parent().after(dropDisp);
       }
       if ($(dropArea).is('.bottom')) {
           dropDisp = dropRow.append(dropDisp);
           dropArea.parent().parent().after(dropDisp);
       }
       if ($(dropArea).is('.default')) {
           dropArea.addClass('over');
       }
       dropInfo.dropDisp = dropDisp;
       dropBase.data('dropInfo', dropInfo);
    }
    /**
    * ドロップによるコンテンツ挿入確定処理
    */
    function commitDrop(dropBase, drag) {

      var content = $(drag).data('content');
      if (!content) {
        return false;
      }
      var dropInfo = $(dropBase).data('dropInfo');
      if (!dropInfo || !dropInfo.dropArea ) {
         return false;
      }
      if (!content.isDrop(dropInfo.dropArea, $(drag))) {
        return false;
      }
       var dropArea = $(dropInfo.dropArea);
       var root = dropArea.data('root');
       var isDroped = $(drag).data('droped');
       var addContent = getDropContentJquery(root, drag);
       //ドロップ完了後に削除判定を行う要素をdropInfoに格納
       dropInfo.parentRow = addContent.parent();
       $(dropArea).gs_dandd_select({cmd:CMD_ENUM.addDropContent,
              drop:addContent});
       content = $(addContent).data('content');
       content.dropped(dropInfo.dropArea, !isDroped, addContent);
       return true;
    }
    /**
    *
    * ドロップエリア全体を覆うドロップベースにdroppableを設定し、
    * ドロップされた際の要素挿入機能を設定する
    * 機能を実装
    * @param root ドラッグアンドドロップエリアへの参照
    */
    function setDropBase(dropBase, root) {
          if (dropBase.parents('.dandd_droptable').length > 0) {
             return;
          }
          dropBase.droppable( {
              //ドロップエリア外へでた場合
              out: function(event, ui) {
                  endDrop($(this));
              },
              //ドロップ時イベント
              drop: function(event, ui) {
                  commitDrop($(this), $(ui.draggable));
                  endDrop($(this));
                  //dropエリアの重複がある場合、先に設置したドロップエリアのイベントしか発火しない。
              },
              tolerance:'pointer',
              scope:root.attr('id')
          });
    }
    /**
    *
    * ドロップエリアにdroppableを設定し、ドラッグ要素が重なった場合にドロップ準備状態を設定する
    * 機能を実装
    * @param root ドラッグアンドドロップエリアへの参照
    */
    function setDropArea(dropArea, root) {

          dropArea.droppable( {
              //ドロップ対象が重なったとき
              over: function(event, ui) {
                  initDrop($(this), $(ui.helper));
              },
              //ドロップ対象を指定コンテンツに制限
              accept: function(drag) {
                  var content = $(drag).data('content');
                  if (!content) {
                    return false;
                  }
                  return content.isDrop($(this), $(drag));
              },
              tolerance:'pointer',
              scope:root.attr('id')
          } );
          if (root) {
              //ドラッグアンドドロップエリア全体のルートへの参照をセット
              dropArea.data('root' , root);
          }
  };
  function dspInitDropContent(droped, root, content) {
        droped.data('root', root);
        droped.data('droped', true);
        droped.data('content', content);
        droped.draggable({
          revert:true,
          revertDuration:0,
          zIndex: 100,
          opacity:0.7,
          cursor: 'move',
          helper:'clone',
          start: function(ev, ui) {
              $(ui.helper).css(
                  dragHelperStartCSS($(this))
                  );

              $(this).css({
                  display:'none'
              });
          },
          stop: function(ev, ui) {
              $(this).css({
                  display:''
              });
          },
          scope:root.attr('id')
        });
        //削除ボタン
        var delButton = $('<img></img>', {
            "class": "delButton btn_classicImg-display classic",
            "src": "../common/images/classic/icon_delete_2.gif"
        });
        delButton.click(function() {
            var cell = $(this).parent();
            var row = cell.parent();
            cell.remove();
            removeRow(row);
            return false;
        });
        delButton.hide();
        droped.append(
          delButton
        );
        //削除ボタン
        var delButton = $('<img></img>', {
            "class": "delButton btn_originalImg-display original",
            "src": "../common/images/original/icon_delete.png"
        });
        delButton.click(function() {
            var cell = $(this).parent();
            var row = cell.parent();
            //削除後イベント ※必要に応じて呼び出し元画面で function danddDeleteAfter() を作成する
            if (typeof danddDeleteAfter == 'function') {
                danddDeleteAfter($('div.dandd_droptable[name="template"] div.contents.cell[name="' + cell.attr('name') + '"]'));
            }
            cell.remove();
            removeRow(row);
            return false;
        });
        delButton.hide();
        droped.append(
          delButton
        );
        droped.unbind('click');
        droped.unbind('mouseover');
        droped.unbind('mouseout');

        droped.mouseover(
            //カーソルon
            function() {
                //削除ボタンON
                $(this).children('.delButton').show();
                return false;
            }
            );
        droped.mouseout(
            //カーソルout
            function() {
                //削除ボタンOFF
                $(this).children('.delButton').hide();
                return false;

            });
        droped.click(function () {
            var content = $(this).data('content');
            content.click($(this));
            return false;

        });
        //入れ子要素の重なり数もとにz-indexを設定
        var zIndex = droped.parents('.contents.cell').length;
        droped.css({'z-index':zIndex});
  }
  /**
   * ドロップ要素から追加するjqueryオブジェクトを取得する
   *
   * @param jqObj
   */
    function getDropContentJquery(root, jqObj) {
        var isDroped = jqObj.data('droped');
        //ドロップエリアに配置済みの場合は要素の初期化を行わない
        if (isDroped) {
            return jqObj
        }
        //ドロップ時にドラッグ要素のContentを複製する
        var content = jqObj.data('content');
        content = $.extend(true, createContent(root, {}), content);
        var config = root.data('config');
        var maxSid = parseInt(config.maxSid, 10) + 1;
        config.maxSid = maxSid;
        content.sid = maxSid;
        var contentJquery =  content.createDropAreaContentJquery();
        contentJquery.attr("class", "body");
        var clone = $('<div></div>' , {
            "class": "contents cell ",
            "name": maxSid
        }).append(contentJquery);
        clone.append($('<div></div>' , {
            "class": "dandd_dropArea top "
        }));
        clone.append($('<div></div>' , {
            "class": "dandd_dropArea left "
        }));
        clone.append($('<div></div>' , {
            "class": "dandd_dropArea right "
        }));
        clone.append($('<div></div>' , {
            "class": "dandd_dropArea bottom "
        }));

        dspInitDropContent(clone, root, content);
        return clone;
    };
    /**
     * 不要になった行の除去
     */
    function removeRow(row) {
        var dropRoot = row.parents('.dandd_droptable:first');
        //ドラッグ要素以外に子要素がないばあい行を削除
        if (row.children(':visible:not(.ui-draggable-dragging)').length <= 0) {
           row.remove();
        }
        if (dropRoot.find('.contents.cell:visible').length <= 0) {
            //追加されたドロップ要素がない場合に初期ドロップ領域を再表示
            $(dropRoot).find('.dandd_dropArea.default').show();
            $(dropRoot).find('.dandd_dropArea.default').removeClass("display_none");
        }
    }
      /**
       * コンテンツ追加処理
       * @param dropArea ドロップエリアjqueryオブジェクト
       * @param コンテント 追加するコンテンツオブジェクト
       */
    function addDropContent(dropArea, clone) {
          var root = $(dropArea.data('root'));
          var config = root.data('config');
          var parent = clone.parent();
          if (dropArea.is('.top')) {
              var row = $('<div></div>', {'class':'contents row'});
              row.append(clone);
              dropArea.parent().parent().before(row);
          }
          if (dropArea.is('.left')) {
              dropArea.parent().before(clone);
          }
          if (dropArea.is('.right')) {
              dropArea.parent().after(clone);
          }
          if (dropArea.is('.bottom')) {
              var row = $('<div></div>', {'class':'contents row'});
              row.append(clone);
              dropArea.parent().parent().after(row);
          }
          if (dropArea.is('.default')) {
              var row = $('<div></div>', {'class':'contents row'});
              row.append(clone);
              dropArea.after(row);
//              dropArea.hide();
              dropArea.addClass('display_none');
          }
          //新規追加ドロップエリアにdroppableを設定
          $.each($(this).find('.dandd_dropArea'), function() {
              $(this).gs_dandd_select({cmd:'setDropArea', 'root':root});
          });
          //表要素内の移動後、追加イベント
          if (dropArea.closest('.body').hasClass('blocklist')
                && clone.data('content').formID != "") {
            //移動後イベント ※必要に応じて呼び出し元画面で function danddMoveAfter() を作成する
            if (typeof danddMoveAfter == 'function') {
                danddMoveAfter(clone.data('content').formID, parent, parent.closest('.cell').data('content').formID, dropArea);
            }
          }
    };
    /**
    * 　コンテンツ要素クラス
    **/
    var Content = function(type, title) {
          //new による初期化
          if(!(this instanceof Content)) {
              return new Content(type , title);
          }
          this.type = type;
          this.title = title;
          this.sid=-1;
          //パラメータ格納
          this.param = {};
    }
    Content.prototype.createDefaultContentJquery = function() {
        var content = $('<div>' + this.title + '</div>');
        return content;
    };
    //ドラッグ用表示生成処理
    Content.prototype.createDragAreaContentJquery = function() {
        return this.createDefaultContentJquery();
    };
    //ドロップ用表示生成処理
    Content.prototype.createDropAreaContentJquery = function() {
        return this.createDefaultContentJquery();
    };
    //ドロップ済み要素クリック処理
    Content.prototype.click = function() {
        return false;
    };
    //ドラッグ要素がドロップ要素へドロップ可能か判定
    Content.prototype.isDrop = function(dropArea) {
        return true;
    };
    Content.prototype.droped = function(dropArea, isFirst) {
    };

    /**
    * コンテンツ要素のインスタンスを生成し返す
    */
    function createContent(root, option) {
        var defContent = $(root).data('defaultContent');
        var content = new Content(option.id, option.name);
        if (defContent) {
            content = $.extend(content, defContent);
        }
        var ret = $.extend(content, option);
        return ret
    }
    /** パラメータ定義：デフォルト値 */
    var default_init_option = {
        cmd: CMD_ENUM.init,
        //ドラッグ要素セレクタ
        dragArea: '#dragArea',
        //ドラッグコンテンツオブジェクト
        contents: [],
        //採番済み要素ID最大値
        maxSid:0,
        //縦方向へのドロップ
        dropV:true,
        //横方向へのドロップ
        dropH:true,
    };
    /**
     * 初期表示用のドロップエリアを設定する
     * @param dropRoot ドロップエリア設定箇所
     */
    function setDefaultDropArea(dropRoot, root) {
          var maxSid = 0;
          $.each($(dropRoot), function() {
            var drop = $(this).find('.dandd_dropArea');
            if (drop.length == 0) {
                drop = $('<div></div>' , {
                    "class": "dandd_dropArea default"
                });
                $(this).append(drop);
            }
          $.each($(this).find('.contents.cell'), function() {
              var droped = $(this);
                  droped.data('root', root);
                  droped.data('droped', true);
                  var content = droped.data('content');

                  content = $.extend(true, createContent(root, {}), content);
                  if (content.sid > 0 && content.sid > maxSid) {
                      maxSid = content.sid;
                  }
                  dspInitDropContent(droped, root, content);
          });
        });

        var config = root.data('config');
        config.maxSid = maxSid;
        root.data('config', config);

    }
    /**
     * ドラッグ要素再設定
     *
     * @param {} option
     * @returns {}
     */
    function resetDragContent(root, option) {
            $( option.dragArea ).children().draggable( {
                helper: 'clone',
                zIndex: 10,
                scope:root.attr('id'),
                opacity:0.7,
                cursor: 'move',
                start: function(ev, ui) {
                    ui.helper.css(
                            dragHelperStartCSS($(this))
                            );

                }
            } ).data('root', root);
            $( option.dragArea ).disableSelection();
            $.each($( option.dragArea ).children().children() , function () {
                var drag = $(this);
                var content = drag.data('content');
                content = $.extend(true, createContent(root, {}), content);
                drag.data('content', content);
            });
    }
    /**
     * ドラッグ要素のコンテンツを階層化したオブジェクトを引数に指定して
     * 関数を実行する
     *
     * @param option.cmd:'resetDragContent'
     * @param option.dropArea: ドロップ先セレクタ
     * @param option.func: 実行する関数
     */
    function getAllParam(root, option) {
        var dropArea = $(root).find(option.dropArea);
        var ret = [];
        $.each(dropArea, function () {
            var dropParam = __getDropTableParam($(this));
            $.merge(ret, dropParam);
        });
        option.func(ret);
    };
    function __getDropTableParam(root) {

       var ret= [];
       var rootName = $(root).attr('name');
       var cells = $(root).find('.contents.cell');
           var index = 0;
           $.each(cells, function () {
                var content = $(this).data('content');
                var row = $(this).parents('.contents.row:first');
                var rowP = row.parent();
                var table = rowP;
                var tableName = table.attr('name');

                $.each(content.param, function () {
                    ret.push({
                       name: tableName +'('+ index +').' + this.name,
                       value: this.value
                    });

                });
                index++;
           });


       return ret;
    };

    $.fn.gs_dandd_select = doPlugin;

})(jQuery);