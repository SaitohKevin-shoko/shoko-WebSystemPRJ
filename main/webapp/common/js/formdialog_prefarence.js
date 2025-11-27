$(function() {    //添付ファイル一覧からの削除
    $('#form_dialog .js_prefarenceDeleteFile').click(function () {
        var plugin = $(this).data('plugin');
        var dirId    = $(this).data('dirid');
        var subDir    = $(this).data('subdir');
        var selElm   = $(this).siblings('select');
        var selfiles = selElm.find("option:checked");
        var fileList = new Array();

        selfiles.each(function() {
            fileList.push($(this).val());
        });

        var param = {
                plugin: plugin,
                tempDirId: dirId,
                subDir: subDir,
                files: fileList
            };

        $.ajax({
            type: "post",
            url: "../common/tempfiledelete.do",
            traditional: true,
            dataType: "json",
            data: param,
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

            }
        });
    });

    $.each($('.js_clockpicker'), function() {
        startClockPicker($(this));
    });
});