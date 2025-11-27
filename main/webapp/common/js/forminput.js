$(function() {
    //textareaの初期化
    $('div.formContent.textarea > textarea').keyup();
    //datepickerの初期化

  $('div.formContent.date > input').datepicker({
            showAnim: 'blind',
            changeMonth: true,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            showButtonPanel: true,
            dateFormat:'yy/mm/dd',
            onSelect: function( selectedDate ) {
                if (typeof $(this).data('onselect') === 'function') {
                    $(this).data('onselect').call(this);
                }
            }
        });



    $('#ui-datepicker-div').hide(); // 初期状態のDatePickerダイアログを非表示

    //画面サイズ変更時の幅修正機能
    $('div.formRoot').css('maxWidth', $(window).width() -20 );
    var timer = false;
    $(window).resize(function() {
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            $('div.formRoot').css('maxWidth', $(window).width() -20 );
        }, 200);
    });
    //時間ピッカー初期化
    $.each($('.js_clockpicker'), function() {
        startClockPicker($(this));
    });

    //添付ファイル一覧からの削除
    $('div.formContent.file > .js_btn_delete').click(function () {
        var plugin   = $(this).data("plugin");
        var dirId    = $(this).data("dirid");
        var subDir    = $(this).data('subdir');
        var selElm   = $(this).siblings('select');
        var selfiles = selElm.find("option:checked");
        var fileList = new Array();

        selfiles.each(function() {
            fileList.push($(this).val());
        });

        $.ajax({
            type: "post",
            url: "../common/tempfiledelete.do",
            traditional: true,
            dataType: "json",
            data: {
                plugin: plugin,
                tempDirId: dirId,
                subDir: subDir,
                files: fileList
            },
            success: function (data) {
                if (data != null) {
                    // 取得した情報(ファイル名一覧)に含まれないファイルを一覧から除外する
                    var optList = selElm.find("option");
                    for (var i = optList.length - 1; i >= 0; i--) {
                        var optElm = $(optList[i]);
                        if (!(optElm.val() in data)) {
                            optElm.remove();
                        }
                    }
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                //console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                //console.log("textStatus     : " + textStatus);
                //console.log("errorThrown    : " + errorThrown.message);
            }
        });
    });
});

