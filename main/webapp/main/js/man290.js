function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function buttonPush2(cmd, mod){
    document.forms[0].CMD.value=cmd;
    document.forms[0].cmd.value=mod;
    document.forms[0].submit();
    return false;
}

function selectGroup(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function setDisabled(value) {

    if (document.forms[0].man290ExtKbn[1].checked == true) {
        $(".js_weekSelector").addClass("display_none");
        $(".js_dayMulti").removeClass("display_none");
        $(".js_holKbn").removeClass("display_none");
        $("select[name='man290Week']").attr("disabled", true);
        $("select[name='man290Day']").attr("disabled", true);
    } else if (document.forms[0].man290ExtKbn[2].checked == true) {
        $(".js_weekSelector").removeClass("display_none");
        //日付指定が選択されているときは曜日選択を表示しない
        if ($("#man320MonKbn1").prop("checked")) {
            setMonthly(1);
        } else {
            setMonthly(0);
        }
        $(".js_holKbn").removeClass("display_none");
    } else {
        $(".js_weekSelector").addClass("display_none");
        $(".js_dayMulti").addClass("display_none");
        $(".js_holKbn").addClass("display_none");
        if (document.forms[0].man290HolidayKbn2.checked == true || document.forms[0].man290HolidayKbn3.checked == true) {
            document.forms[0].man290HolidayKbn0.checked=true;
        }
        $("select[name='man290Week']").attr("disabled", true);
        $("select[name='man290Day']").attr("disabled", true);
    }

}

function moveDay(elmDate, kbn) {

    systemDate = new Date();
    var year = convYear(systemDate.getFullYear());
    var month = ("0" + (systemDate.getMonth() + 1)).slice(-2);
    var day = ("0" + systemDate.getDate()).slice(-2);

    if (kbn == 2) {
        $(elmDate).val(year + "/" + month + "/" + day);
        return;
    }

    if (kbn == 1 || kbn == 3) {

        var ymdf = escape($(elmDate).val());
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {
            newDate = new Date($(elmDate).val());

            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getFullYear());
            var systemYear = convYear(systemDate.getFullYear());
            if (newYear < systemYear - 1 || newYear > systemYear + 3) {
                return;
            } else {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(elmDate).val(year + "/" + month + "/" + day);
            }

        } else {
            if ($(elmDate).val() == '') {
                $(elmDate).val(year + "/" + month + "/" + day);
            }
        }
    }
}

function convYear(yyyy) {
  if(yyyy<1900) {
    yyyy=1900+yyyy;
  }
  return yyyy;
}

function setParams() {

    setYmdParam($("input[name='man290FrDate']"),
        $("input[name='man290FrYear']"), 
        $("input[name='man290FrMonth']"),
        $("input[name='man290FrDay']"));

    setYmdParam($("input[name='man290ToDate']"),
        $("input[name='man290ToYear']"), 
        $("input[name='man290ToMonth']"),
        $("input[name='man290ToDay']"));

    setHmParam($("input[name='man290FrTime']"), $("input[name='man290FrHour']"), $("input[name='man290FrMin']"));
    
    setHmParam($("input[name='man290ToTime']"), $("input[name='man290ToHour']"), $("input[name='man290ToMin']"));

}

function setMonthly(val) {
    if (val == 0) {
        $("#man320MonKbn0").prop("checked", true);
        $("#man320MonKbn1").prop("checked", false);
        $("select[name='man290Week']").parent().removeClass("display_none");
        $("select[name='man290Week']").attr("disabled", false);
        $("select[name='man290Day']").parent().addClass("display_none");
        $("select[name='man290Day']").attr("disabled", true);
        $(".js_dayMulti").removeClass("display_none");
    } else {
        $("#man320MonKbn0").prop("checked", false);
        $("#man320MonKbn1").prop("checked", true);
        $("select[name='man290Week']").parent().addClass("display_none");
        $("select[name='man290Week']").attr("disabled", true);
        $("select[name='man290Day']").parent().removeClass("display_none");
        $("select[name='man290Day']").attr("disabled", false);
        $(".js_dayMulti").addClass("display_none");
    }
}

function tinyMceInit() {
    var font  = "Andale Mono=Andale Mono, andale mono, monospace;Arial=Arial, arial, helvetica, sans-serif;Arial Black=Arial Black, arial black, sans-serif;";
    font += "Book Antiqua=Book Antiqua, book antiqua, palatino, serif;Comic Sans MS=Comic Sans MS, comic sans ms, sans-serif;";
    font += "Courier New=Courier New, courier new, courier, monospace;Georgia=Georgia, georgia, palatino, serif;Helvetica=Helvetica, helvetica, arial, sans-serif;";
    font += "Impact=Impact, impact, sans-serif;Σψµβολ=Σψµβολ, symbol;Tahoma=Tahoma, tahoma, arial, helvetica, sans-serif;Terminal=terminal, monaco, monospace;";
    font += "Times New Roman=Times New Roman, times new roman, times, serif;Trebuchet MS=Trebuchet MS, trebuchet ms, geneva, sans-serif;";
    font += "Verdana=Verdana, verdana, geneva, sans-serif;Webdings=Webdings, webdings;Wingdings=Wingdings,wingdings, zapf dingbats;";
    font += "メイリオ=メイリオ, Meiryo;明朝=ＭＳ Ｐ明朝,MS PMincho,ヒラギノ明朝 Pro W3,Hiragino Mincho Pro,serif;";
    font += "ゴシック=ＭＳ Ｐゴシック,MS PGothic,ヒラギノ角ゴ Pro W3,Hiragino Kaku Gothic Pro,sans-serif";
    var fontSize = "8pt 10pt デフォルト=11pt 12pt 14pt 18pt 24pt 36pt";
    tinyMCE.init({
        selector: '.js_tinymce',
        plugins: [
            'advlist autolink link image lists charmap hr anchor pagebreak spellchecker',
            'searchreplace visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
            'save table contextmenu directionality template paste textcolor preview colorpicker'
        ],
        menubar: false,
        toolbar1: 'undo redo | visualblocks | styleselect fontsizeselect fontselect bold italic strikethrough forecolor backcolor',
        toolbar2: 'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent table | link image media preview code addbodyfile',
        content_style: 'p {font-size: 11pt; font-family: "メイリオ";}',
        language: 'ja',
        font_formats: font,
        fontsize_formats: fontSize,
        width:"100%",
        resize: 'both',
        height : 500,
        deprecation_warnings: false,
        dragDropUpload: false,
        paste_filter_drop: false,
        setup: function (editor) {
            setupTinymce(editor);
        },
        init_instance_callback: (editor) => {
            editor.contentDocument.addEventListener("dragover", function(e) {
                if ('attachmentOverlayShow' in window) {
                    if (!isDisplayAttachmentOverlay()) {
                    attachmentOverlayShow(e);
                    }
                }
            })
        }
    });
    html_input_flg = true;
}
  
function setupTinymce(editor) {
    editor.ui.registry.addButton('addbodyfile', {
        text: msglist["cmn.insert.content"],
        onAction: function () {
        attachmentLoadFile('2');
        }
    });
}

function addElementBody(type, src){
    tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), type, {src : src});
}

function getTinymceContentsSrc(tempSaveName) {
    return 'man290.do?CMD=getBodyFile&man290TempSaveId=' + tempSaveName;
}

$(function() {
    //チェックボックス枠外押下判定
    if ($(window).live) {
        $('.js_tableTopCheck').live("click", function(e){
            if (e.target.type != 'checkbox') {
                var check = $(this).children().children('input[type=checkbox]');
                if (check.attr('checked')) {
                    check.attr('checked',false);
                } else {
                    check.attr('checked',true);
                }
            }
        });
    }

    //tinyMce起動
    tinyMceInit();
});