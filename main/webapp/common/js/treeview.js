/**
 * jqueryプラグイン初期化処理
 * ここに書いた処理はDOM読み込みと並行処理になる
 */
;(function($) {
    if ($.fn.treeview) {
        //読み込み済みの場合何もしない
        return;
    }


    /**
     * プラグインコントローラ
     *
     *
     * */
    function Plugin() {

    }
    /**
     * ツリービュープラグイン
     * 引数option指定でツリービューの初期化
     * optionなしでプラグインコントローラの取得
     *
     * @param option.name ツリービュー要素識別名
     * @param option.allOpen 全て開く要素への参照
     * @param option.allClose 全て閉じる要素への参照
     * @param option.duration アニメーション速度
     */
    $.fn.treeview = function (option) {
        var ret =   new Plugin();
        ret.caller = this;
        if (option) {
            ret.init(option);
        }
        return ret;
    };

    /**全て開く イベント処理
     * 全て開くのクリックイベントとして動作
     * this:全て開く要素
     * */
    function allOpen(e) {
        //動作対象のツリー取得
        var tree = $(this).data('tree');
        option = $(tree).data('option');
        if (!option) {
            option = {duration: 0};
        }

        $.each($(tree).find('li.js_expandable, li.js_collapsable').get().reverse(), function() {
            var duration = 0;
            if (option && option.duration) {
                duration = option.duration;
            }
            if ($(this).parents('.js_expandable').length > 0) {
                duration = 0;
            }
            open.call($(this), e, duration);
        });
    };
    /**全て閉じる イベント処理
     * 全て閉じるのクリックイベントとして動作
     * this:全て閉じる要素
     * */
    function allClose(e) {
        //動作対象のツリー取得
        var tree = $(this).data('tree');
        option = $(tree).data('option');
        if (!option) {
            option = {duration: 0};
        }

        $.each($(tree).find('li.js_expandable, li.js_collapsable'), function() {
            var duration = 0;
            if (option && option.duration) {
                duration = option.duration;
            }
            if ($(this).parents('.js_expandable').length > 0) {
                duration = 0;
            }
            close.call($(this), e, duration);
        });
    };
    /**開閉ボタン イベント処理
     * 開閉ボタンのクリックイベントとして動作
     * this:開閉ボタン要素
     * */
    function toggle(e) {
        var root = $(this).parents('.js_treeview').eq(0);
        option = $(root).data('option');
        if (!option) {
            option = {duration: 0};
        }
        if ($(this).parent().is('.js_expandable')) {
            open.call($(this).parent(), e, option.duration);
            return this;
        }
        if ($(this).parent().is('.js_collapsable')) {
            close.call($(this).parent(), e, option.duration);
            return this;
        }
    };
    /** 開 イベント処理
     *  this:ツリーパス要素
     * */
    function open(e, duration) {

        $(this).removeClass('expandable');
        $(this).addClass('collapsable');
        $(this).removeClass('js_expandable');
        $(this).addClass('js_collapsable');
        if (duration == 0) {
            $(this).children('ul').show();
        } else {
            $(this).children('ul').slideDown(duration, function() {
                $(this).css('overflow', '');
            });
        }

        //開閉状態保管
        var root = $(this).parents('.js_treeview').eq(0);
        var option = $(root).data('option');
        if (option && option.name) {
            var param = $('input[name=\''+option.name+'\']');
            if (param.length > 0) {
                var opnInf;
                try {
                    opnInf = JSON.parse(param[0].value);
                } catch (e) {
                }
                if (!opnInf) {
                    opnInf = {};
                }
                opnInf[$(this).attr('name')]='block';
                param[0].value=JSON.stringify(opnInf);
            }
        }

    };
    /** 閉 イベント処理
     *  this:ツリーパス要素
     * */
    function close(e, duration) {
        $(this).removeClass('collapsable');
        $(this).addClass('expandable');
        $(this).removeClass('js_collapsable');
        $(this).addClass('js_expandable');
        if (duration == 0) {
            $(this).children('ul').hide();
        } else {
            $(this).children('ul').slideUp(duration);
        }
        //開閉状態保管
        var root = $(this).parents('.js_treeview').eq(0);
        var option = $(root).data('option');
        if (option && option.name) {
            var param = $('input[name=\''+option.name+'\']');
            if (param.length > 0) {
                var opnInf;
                try {
                    opnInf = JSON.parse(param[0].value);
                } catch (e) {
                }
                if (!opnInf) {
                    opnInf = {};
                }
                opnInf[$(this).attr('name')]='none';
                param[0].value=JSON.stringify(opnInf);
            }
        }

    };

    /**プラグインメソッド 初期化処理
     *  this:Pluginクラス
     *  */
    Plugin.prototype.init = function(option) {

        //開閉状態保管用パラメータ追加
        if (option.name) {
            var param = $('input[name=\''+option.name+'\']');
            if (param.length == 0) {
                param = $('input[name=\''+option.name+'\']');
                this.caller.appendTo(param)
            }
        }

        if (option.allOpen) {
            //全て開く要素初期化
            $(option.allOpen).unbind();
            $(option.allOpen).click(allOpen);
            //イベント要素に動作対象ツリーへの参照を保管
            $(option.allOpen).data('tree', this.caller)
        }
        if (option.allClose) {
            //全て閉じる要素初期化
            $(option.allClose).unbind();
            $(option.allClose).click(allClose);
            //イベント要素に動作対象ツリーへの参照を保管
            $(option.allClose).data('tree', this.caller)
        }
        //既存要素をtree要素として初期化
        $(this.caller).addClass('treeview');
        $(this.caller).addClass('js_treeview');
        $(this.caller).data('option', option);

        var idx = 1;
        //子階層のリスト要素をツリー要素化
        $.each($(this.caller).find('li'), function() {
            $(this).treeview().initPath(idx);
            idx++;
        });
    }
    /**プラグインメソッド ツリーパス要素初期化処理
     *  this:Pluginクラス
     *  @param name ツリーパス識別名
     *  */
    Plugin.prototype.initPath = function (name) {
        if ($($(this.caller).children('ul')[0]).children().length > 0) {
            if ($(this.caller).children('.js_hitarea').length == 0) {
                //子要素をもつ場合は開閉ボタンを設置
                $($(this.caller).children()[0]).before(
                    $('<div></div>').addClass('hitarea').addClass('js_hitarea')
                );
            }
            $(this.caller).children('.js_hitarea').unbind();
            $(this.caller).addClass('collapsable');
            $(this.caller).addClass('js_collapsable');
            close.call($(this.caller), null, 0);

            if (name) {
                $(this.caller).attr('name', name);
            }
            //パラメータ上の開閉状態反映
            var root;
            if ($(this.caller).is('.js_treeview')) {
                root = $(this.caller);
            } else {
                root = $(this.caller).parents('.js_treeview').eq(0);
            }

            var option = $(root).data('option');
            if (option && option.name) {
                var param = $('input[name=\''+option.name+'\']');
                if (param.length > 0) {
                    var opnInf;
                    try {
                        opnInf = JSON.parse(param[0].value);
                    } catch (e) {
                    }
                    if (!opnInf) {
                        opnInf = {};
                    }
                    if (opnInf[name] && opnInf[name] == 'block') {
                        open.call($(this.caller), null, 0);
                    }
                    if (opnInf[name] && opnInf[name] == 'none') {
                        close.call($(this.caller), null, 0);
                    }

                }
            }

        }
    };
    /**プラグインメソッド 子要素挿入
     *  this:Pluginクラス
     *  */
    Plugin.prototype.add = function (name, child) {

        var ul;
        if ($(this.caller).is('ul')){
            ul = $(this.caller);
        } else {
            ul = $(this.caller).children('ul');
            if (ul.length == 0) {
                ul = $('<ul></ul>');
                $(this.caller).append(ul);
            }
        }

        var li = $('<li></li>');
        li.append($(child));
        li.appendTo(ul);

        li.attr('name', name);

        var defOpen = false;
        if ($(this).parent().is('.js_collapsable')) {
            defOpen = 2;
        }
        $(this.caller).treeview().initPath();
        if (defOpen == 2) {
            open.call($(this.caller), null, 0);
        }

        return li;
    };
    /**プラグインメソッド ツリー要素挿入バックグラウンドで実行される
     *  trees: Array {
           TreeObj {
               name:name属性,
               paths: 子要素Array,
               open：開閉状態,
               label：表示要素,
               class：class属性
           }...
        },
        callback:終了時実行関数
     **/
    Plugin.prototype.addTree = function (trees, callback) {
        var caller= this.caller;
        var worker = new Worker('../common/js/treeview_backgroundworker.js');
        caller.data('worker', worker);
        worker.addEventListener('message', function(e) {
            caller.data('worker', null);
            var data = e.data;
            caller.append($(data.html));
            if (data.finish) {
                this.terminate();
                callback(e);
            }

        });
        //パラメータ上の開閉状態反映
        var root;
        if ($(this.caller).is('.js_treeview')) {
            root = $(this.caller);
        } else {
            root = $(this.caller).parents('.js_treeview').eq(0);
        }
        var option = $(root).data('option');
        var opnInf = undefined;
        if (option && option.name) {
            var param = $('input[name=\''+option.name+'\']');
            if (param.length > 0) {
                opnInf = param[0].value;
            }
        }


        worker.postMessage({'trees':trees, 'opnInf':opnInf});
    };


    /**プラグインメソッド 子要素開く
     *  this:Pluginクラス
     *  */
    Plugin.prototype.open = function (duration) {
        if ($(this.caller).is('.js_expandable')) {
            open.call($(this.caller), null, duration);
        }

    };
    /**プラグインメソッド 子要素閉じる
     *  this:Pluginクラス
     *  */
    Plugin.prototype.close = function (duration) {
        if ($(this.caller).is('.js_collapsable')) {
            close.call($(this.caller), null, duration);
        }
    };
    $(function() {
        if ($('body').attr('data-treeview_init') != 'true') {
//            console.log('init toggle :' + $('body').attr('data-treeview_init'));
            if ($(window).on) {
                $(document).on('click', '.js_hitarea', toggle);
            } else if ($(window).live) {
                $('.js_hitarea').live("click", toggle);
            }
            $('body').attr('data-treeview_init', 'true');
//            console.log('init toggle end:' + $('body').attr('data-treeview_init'));
        }
    });

})(jQuery);

