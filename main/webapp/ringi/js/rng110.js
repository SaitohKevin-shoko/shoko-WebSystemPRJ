$(function() {
    //登録ボタン
    $('.js_btn_ok1').click(function () {
        var button = $(this);
        $( '#keiro_maker' ).gs_dandd_select({cmd:'getAllParam',
            dropArea:$('.dropArea'),
            func: function(ret) {
                $.each(ret, function() {
                    button.before($('<input type=\"hidden\" name=\"rng110keiro.' + this.name +'\" value=\"' + this.value +'\"></input>'));
                });
            }
          });
        buttonPush('entry');

    });
    //削除ボタン
    $('.js_btn_dell_n1').click(function () {
        var button = $(this);
        $( '#keiro_maker' ).gs_dandd_select({cmd:'getAllParam',
            dropArea:$('.dropArea'),
            func: function(ret) {
                $.each(ret, function() {
                    button.before($('<input type=\"hidden\" name=\"rng110keiro.' + this.name +'\" value=\"' + this.value +'\"></input>'));
                });
            }
          });
        buttonPush('delete');
    });

});