/**
 *  ■使用方法
 *  利用画面でインクルードする
 *  以下のいずれかの初期化方法が使える
 *  ・画面のhtmlに静的にクローンボタンを配置する場合
 *    ボタンに「data-clonebtn_init」属性に初期化OPTIONを設定する
 *  ・画面の要素を動的にクローンボタンにする場合
 *    $('.js_button').clonebtn({初期化OPTION});
 *
 *  ■初期化OPTION
 *   {
 *       withevent: true or false 要素のイベントやdataごとクローンする デフォルト「false」
 *       name : インプット要素をクローンした場合、name属性の頭に追加される
 *              <input name="text">をcloneすると <input name="{name}{suffix}text">となる
 *       suffix : { 添え字部の設定
 *          countup: 数値 +1 した値が クローンの添え字に使用される
 *          func: countupの代わりに関数の実行結果がクローンの添え字になる 関数の呼出し元はクローンボタン
 *          head: 添え字の前に追加される
 *          tail: 添え字の後ろに追加される
 *       }
 *       template : クローンする要素指定セレクタ
 *                  無指定の場合はクローンボタンの子要素の'.js_clonebtn_template'内がクローンされる
 *       addTo：クローン挿入先  指定したセレクタに挿入される
 *              before クローンボタンの前
 *              after クローンボタンの後ろ
 *       oncloned : クローン実行後に動作するリスナ関数
 *                  function (name, clonebtn, option)
 *                     name クローンした要素を表すname
 *                     clonebtn クローンボタンJQueryオブジェクト
 *                     option クローンボタンの初期化OPTON
 *                     関数のcallerはクローンした要素
 *       reset: true ： 初期化OPTONでクローンボタンを初期化する false（デフォルト）:オプションを追加する
 *
 *   }
 *
 */

;(function($) {

    if ($.fn.clonebtn) {
        //読み込み済みの場合何もしない
        return;
    }
    function loadOption(target) {
        var option =  $(target).data('clonebtn_init');
        if (!(option instanceof Object)) {
            option =  (new Function("return " + option))();
        }
        option = $.extend(true, {} ,option);
        return option;
    }
    function saveOption(target, option) {
        option = $.extend(true, {} ,option);
        $(target).prop('data-subform_init', true);
        $(target).data('clonebtn_init', option);
    }
    function click() {
        var suffix ="";
        var option = loadOption(this);
        var cloneBtn = $(this);
        if (option.suffix) {
            var suffix
            if (Number.isInteger(option.suffix.countup)) {
                option.suffix.countup = option.suffix.countup + 1;
                suffix = option.suffix.countup;
            }
            if (option.suffix.func) {
                suffix = option.suffix.func.call(this);
            }
            if (option.suffix.head) {
                suffix = option.suffix.head + suffix;
            }
            if (option.suffix.tail) {
                suffix = suffix + option.suffix.tail;
            }

        }
        var template;
        if (option.template) {
            template = $(option.template);
        } else {
            template =
                cloneBtn
                .children('.js_clonebtn_template')
                .children()
                .not('script,style');
        }

        saveOption(cloneBtn, option);
        template.each(function () {
            var clone = $(this).clone(option.withevent, option.withevent);
            if (option.addTo == 'before') {
                clone = clone.insertBefore(cloneBtn);
            } else if (option.addTo == 'after') {
                clone = clone.insertAfter(cloneBtn);
            } else {
                clone = clone.appendTo($(option.addTo))
            }
            if (option.suffix) {
                if (!clone.attr('name')) {
                    clone.attr('name' , '');
                }
                clone.attr('name' , [option.name + suffix , clone.attr('name')].join('.'));
                clone.find('input, select, button, [data-clonebtn_init]').each(function () {
                    if ($(this).parents('[data-clonebtn_init]').length != 0) {
                        return true;
                    }
                    if ($(this).is(':not([data-clonebtn_init])')) {
                        var name = $(this).attr('name');
                        name = [option.name + suffix , name].join('.');
                        $(this).attr('name', name);
                    } else {
                        var child_option = loadOption(this);
                        if (child_option.name) {
                            child_option.name = [option.name + suffix , child_option.name].join('.');
                        }
                        saveOption(this, child_option);
                    }
                });
            }

            clone.find('input, select, button').prop("disabled", false);
            clone.find('*[data-clonebtn_init] input, [data-clonebtn_init] select, [data-clonebtn_init] button').prop("disabled", true);
            if (option.oncloned) {
                template.each(function () {
                  option.oncloned.call(clone, option.name + suffix, cloneBtn);
                });
            }
        });
    }

    $.fn.clonebtn = function (option) {
        var ret = $();
        if (!option) {
            $(this).each(function() {
                $(this).find('[data-clonebtn_init]').each(function() {
                    var option = loadOption($(this));
                    option.reset = true;
                    ret = ret.add($(this).clonebtn(option));
                });
            });
            return ret;
        }
        $(this).each(function() {
            var cloneBtn = $(this);
            var tmp = option
            if (!tmp.reset) {
                tmp = $.extend(true, {},loadOption(cloneBtn), tmp);
            }
            saveOption(cloneBtn, tmp);
            if (tmp.template) {
                template = $(tmp.template);
            } else {
                template = $(this).children('.js_clonebtn_template');
                template.find('input, select, button').prop("disabled", true);
            }
            ret = ret.add(cloneBtn);
        });
        return ret;
    };

    $(document).on('click', '[data-clonebtn_init]', click);

})($);
$(function() {
    $(window).clonebtn();
});