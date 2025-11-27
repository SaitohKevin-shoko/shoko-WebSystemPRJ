
/**
 *  ■使用方法
 *  利用画面でインクルードする
 *  以下のいずれかの初期化方法が使える
 *  ・画面のhtmlに静的にサブフォームにする場合
 *    ボタンに「data-subform_init」属性に初期化OPTIONを設定する
 *  ・画面の要素を動的にサブフォームにする場合
 *    $('.js_subform').subform({初期化OPTION});
 *
 *  ■初期化OPTION
 *   {
 *       url: 描画更新URL
 *       param : 更新時追加パラメータ配列 以下の構造とする
 *               [{name: パラメータ名, value: パラメータ値}]
 *       onloaded : 更新実行後に動作するリスナ関数
 *
 *   }
 *
 */



;(function($) {

    if ($.fn.subform) {
        //読み込み済みの場合何もしない
        return;
    }
    function loadOption(target) {
        var option = $(target).data('subform_init');
        if (!(option instanceof Object)) {
            option =  (new Function("return " + option))();
        }
        option = $.extend(true, {} ,option);

        return option;
    }
    function saveOption(target, option) {
        option = $.extend(true, {} ,option);
        $(target).attr('data-subform_init', true);
        $(target).data('subform_init', option);
    }

    function submit(onloaded) {
        var param = new Array();
        var option = loadOption(this);
        var subform = $(this);
        var inputsrc = new Array;
        if (option.inputsrc) {
            inputsrc = inputsrc.concat(option.inputsrc);
        }
        if (!option.inputsrc) {
            inputsrc = inputsrc.concat('parents');
        }
        $.each(inputsrc, function () {
            switch (this.toString()) {
                case 'parents': {
                    param = param.concat(
                                subform.closest('fieldset , form')
                                .add(this)
                               .serializeArray()
                            );

                    break;
                }
                default: {
                    param = param.concat(
                                $(this.toString()).find('*')
                                .filter('input, select, textarea')
                                .add(this)
                                .serializeArray()
                            );
                }
            }
        });
        if (subform.is('button, input[type="button"], input[type="submit"]')) {
            param = param.concat(
                        subform.serializeArray()
                    );

        }
        if (option.param instanceof Array) {
            param = param.concat(option.param)
        }
        var url = option.url;
        if (!url) {
            url = subform.parents()
                                .filter('form')
                                .eq(0)
                                .attr('action');
        }
        if (!url) {
            url = location.href;
        }
        $(this).load(
                url,
                param,
                function() {
                  if (option.onloaded) {
                    option.onloaded.call(this);
                  }
                  if (onloaded) {
                    onloaded.call(this);
                  }
                  $(this).subform({cmd:'init'});
                }
                );
    }

    $.fn.subform = function (option) {

        if (!option || option.cmd == 'submit') {
            var subform = $();
            var onloaded;
            if (option && option.onloaded) {
              onloaded = option.onloaded;
            }
            $(this).each(function() {
                var target = $(this).closest('[data-subform_init]');
                submit.call(target, onloaded);
                subform = subform.add(target);
            });
            return subform;

        }
        if (option && option.cmd == 'init') {
            var subform = $();
            $(this).each(function() {
                if ($(this).is('[data-subform_init]')) {
                    var option = loadOption(this);
                    option.reset = true;
                    subform = subform.add($(this).subform(option));
                }
                $(this).find('[data-subform_init]').each(function() {
                    var option = loadOption(this);
                    option.reset = true;
                    subform = subform.add($(this).subform(option));
                });
            });
            return subform;
        }

        $(this).each(function() {
            var subform = $(this);
            var tmp = option;
            if (!tmp.reset) {
                var load = loadOption(subform);
                tmp.param = load.param.concat(tmp.param);
            }
            saveOption(subform, tmp);
        });
        return $(this);
    };

    $(function() {
        $('body').subform({cmd:'init'});
    });
})($);
