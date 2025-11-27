;(function($) {
    if ($.fn.gsform_multiselect) {
        //読み込み済みの場合何もしない
        return;
    }
    $.fn.gsform_multiselect = function() {
        //複数選択コンポーネント初期化処理
        //選択ボックスチェンジイベントを停止
        $(this).find('select').change(function (event) {
            // selectboxの選択によるチェンジイベントの親への伝播を止める)
            event.stopPropagation();
        });
        /**
         * スクロール設定
         */
        var setScrollPosition = function(parent, multiselect){
            var scrollPosition = $(window).scrollTop();
            $("<input>", {
                type: 'hidden',
                name: multiselect.attr('name') + '.scrollY',
                value: scrollPosition
                }).appendTo(parent);
        };

        $(this).find('.js_btn_base1add').click(function() {
           var multiselect = $(this).parents('table:first');
           var hiddens = multiselect.find('td:first');
           var name = multiselect.attr('name') + '.selected';
           $.each(multiselect.find('.noSelected option:selected'),
                   function() {
               var sid = $(this).attr('value');
               hiddens.append($('<input type=\"hidden\" name=\"' + name +'\" value=\"' + sid +'\"></input>'));
               multiselect.find('.selected').append($(this));
           });
           setScrollPosition($(this).parent(), multiselect)
           multiselect.change();
        });
        $(this).find('.js_btn_base1del').click(function() {
            var multiselect = $(this).parents('table:first');
            var hiddens = multiselect.find('td:first');
            var name = multiselect.attr('name') + '.selected';
            $.each(multiselect.find('.selected option:selected'),
                    function() {
                var sid = $(this).attr('value');
                hiddens.find('input[type=\"hidden\"][name=\"' + name +'\"][value=\"' + sid +'\"]').remove();
                multiselect.find('.noSelected').append($(this));
            });
            setScrollPosition($(this).parent(), multiselect)
            multiselect.change();
         });
    };

})(jQuery);