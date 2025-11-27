//table-top 利用設定プラグイン
//スクリプトのロードで、画面内のtable.table-topの設定を行う
//ajaxで追加されたtableにはjqueryプラグインで後から初期化を行う

/**
 * jqueryプラグイン初期化処理
 * ここに書いた処理はDOM読み込みと並行処理になる
 */
;(function($) {

    if ($.fn.tableTop) {
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
     * table-topプラグイン
     * 引数option指定でツリービューの初期化
     * optionなしでプラグインコントローラの取得
     *
     * @param option.class
     * @param option.listHover true：js_listHoverクラスへのリストホバーを入れる
     * @param option.allClose 全て閉じる要素への参照
     * @param option.duration アニメーション速度
     */
    $.fn.tableTop = function (option) {
        var ret =   new Plugin();
        ret.caller = this;
        if (option) {
            ret.initTable(option);
            return this;
        }
        return ret;
    };

    /**プラグインメソッド 初期化処理
     *  this:Pluginクラス
     *  */
    Plugin.prototype.initTable = function(option) {
        if ($(this.caller).is('table')) {
            $(this.caller).addClass('table-top');
        }
        $(this.caller).find('th').tableTop().initHeader();
        return $(this.caller)
    }
    /**プラグインメソッド thホバー設定処理
     *  this:Pluginクラス
     *
     * */
    Plugin.prototype.initHeader = function() {
        var target = this.caller;
        if (!target.is('th')) {
            target =  this.caller.find('th');
        }
        $.each(target, function() {
            var parts = $(this).find('a, select:not([multiple])');
            var partsCnt = parts.length;
            if (partsCnt == 1) {
                $(this).addClass('table_header-evt');
                $(this).addClass('js_table_header-evt');
            } else if (partsCnt > 0) {
                $(this).addClass('js_table_header-multiEvt');
                $(this).addClass('table_header-multiEvt');
                $.each(parts, function () {
                    $(this).addClass('js_table_headerParts-evt');
                });
            }
            $.each(parts, function () {
                $(this).addClass('table_headerSort-top');
            });
        });
    }
    /**
     * プラグインメソッド thホバー設定処理
     *  this:Pluginクラス
     *  cmd 'on' ：有効化 'off'：無効化
     * */
    Plugin.prototype.initRowHover = function(cmd) {

        if ($(window).on) {
            if (cmd == 'on' || cmd == undefined) {

                $(document).on('mouseenter','.js_listHover', mouseenterEvt);

                $(document).on('mouseleave', '.js_listHover', mouseleaveEvt);
            }
            if (cmd == 'off') {
                $(document).off('mouseenter','.js_listHover', mouseenterEvt);

                $(document).off('mouseleave', '.js_listHover', mouseleaveEvt);
            }
        } else if ($(window).live || cmd == undefined) {
            if (cmd == 'on' || cmd == undefined) {

                $('.js_listHover').live({
                    mouseenter:mouseenterEvt,
                    mouseleave:mouseleaveEvt
                });
            }
            if (cmd == 'off') {
                $('.js_listHover').die({
                    mouseenter:mouseenterEvt,
                    mouseleave:mouseleaveEvt
                });
            }
        }

    }
    function mouseenterEvt(e) {
        $(this).children().addClass("list_content-on");
        $(this).prev().children().addClass("list_content-topBorder");
    }

    function mouseleaveEvt(e) {
        $(this).children().removeClass("list_content-on");
        $(this).prev().children().removeClass("list_content-topBorder");
    }

})(jQuery);
/**
 * function ready
 * DOM読み込み後に実行される
 */
$(function() {

    //チェックボックス枠外押下判定
    if ($(window).live) {
        $('.js_tableTopCheck').live("click", function(e){
            if (e.target.type != 'checkbox') {
                var check = $(this).children('input[type=checkbox]');
                if (check.attr('checked')) {
                    check.attr('checked',false);
                } else {
                    check.attr('checked',true);
                }
                if ($(this).hasClass('js_tableTopCheck-header')) {
                    $(this).change();
                }
            }
        });
    } else if ($(window).on) {
        $(document).on('click', '.js_tableTopCheck', function(e) {
            if (e.target.type != 'checkbox') {
                var check = $(this).children('input[type=checkbox]');
                if (check.prop('checked')) {
                    check.prop('checked', false);
                } else {
                    check.prop('checked', true);
                }
                if ($(this).hasClass('js_tableTopCheck-header')) {
                    $(this).change();
                }
            }
        });
    }

    if ($(window).on) {
        $(document).on('click', '.table-top .js_table_header-evt', function(e) {
            var className = e.target.className;
            var classList = className.split(" ");
            var flg = false;
            for (var idx = 0; idx < classList.length; idx++) {
                if (classList[idx] == "js_table_header-evt") {
                    flg = true;
                    break;
                }
            }
            if (flg) {
                $(this).find('a, button, select:not([multiple])').click();
            }
        });

        $(document).on('mouseenter', '.js_table_headerParts-evt', function(e) {
            $(this).parent('th').addClass('table_header-evt');
        });

        $(document).on('mouseleave', '.js_table_headerParts-evt', function(e) {
            $(this).parent('th').removeClass('table_header-evt');
        });

    } else if ($(window).live) {
        $('.table-top .js_table_header-evt').live('click', function(e) {
            if (e.target.type == undefined) {
                $(this).find('a, button, select:not([multiple])').click();
            }
        });
        $('.js_table_headerParts-evt').live('mouseenter', function(e) {
            $(this).parent('th').addClass('table_header-evt');
        });

        $('.js_table_headerParts-evt').live('mouseleave', function(e) {
            $(this).parent('th').removeClass('table_header-evt');
        });
    }

    //ヘッダーソートホバー設定
    var th = $('.table-top th');
    th.tableTop().initHeader();


});