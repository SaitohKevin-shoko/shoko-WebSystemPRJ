
$(function() {
    /* 一覧行  hover */
    $('.js_listHover').live({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

    //テンプレート名セット
    initTemplateName();

    //テンプレート選択ボタン
    $("#templatePopBtn").live("click", function(){

        /* テンプレートポップアップ */
        $('#templatePop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 400,
            width: 600,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: {
              選択: function() {

                  //選択値取得
                  var templateList   = $("input:checkbox[name='poptemplate']:checked");
                  $('#templateArea').children().remove();
                  $('#templateArea').html("<div></div>");

                  //画面表示
                  for (var j = 0; j < templateList.length; j++) {
                      var templateName = $('#td_name_' + templateList[j].value).html();
                      if (templateName != null) {
                          $('#templateArea').children().append("<div id=\"templateArea_" + templateList[j].value + "\">"
                                +  "<span class=\"text_template mr5\">"
                                +  "<a id=\""  + templateList[j].value +  "\" class=\"cl_linkDef template_click\">"
                                +  $('#td_name_' + templateList[j].value).html()
                                +  "</a>"
                                +  "</span>"
                                +  "<input type=\"hidden\" name=\"ntp231DspTemplate\" value=\"" + templateList[j].value + "\">"
                                +  "<img class=\"btn_classicImg-display cursor_p js_templateDel\" src=\"../common/images/classic/icon_delete_2.gif\" id=\"" + templateList[j].value + "\">"
                                +  "<img class=\"btn_originalImg-display cursor_p js_templateDel\" src=\"../common/images/original/icon_delete.png\" id=\"" + templateList[j].value + "\">"
                                +  "</div>");
                      }

                  }
                  $(this).dialog('close');
              },
              ｷｬﾝｾﾙ: function() {
                  //表示項目をリセット
                  resetTemplateObj();
                  $(this).dialog('close');
              }
            }
        });
    });


    /* テンプレート削除リンク */
    $(".js_templateDel").live("click", function(){
        var tmplateId = $(this).attr("id");
        $('#templateArea_' + tmplateId).remove();
        clickTemplateName(1, tmplateId);
    });

    //テンプレート名クリック
    $(".template_click").live("click", function(){
        var tmplateSid = $(this).attr("id");
        openSubWindow("../nippou/ntp260.do?ntp260NttSid=" + tmplateSid);
    });

});

var checkBoxClickFlg = 0;

function clickMulti() {
    checkBoxClickFlg = 1;
    return false;
}

function clickTemplateName(typeNo, itmSid) {

    if (checkBoxClickFlg == 0) {
        //tr押下時
        if (!$('#tr_' + itmSid).children().children().attr('checked')) {
            $('#tr_' + itmSid).children().children().attr('checked','checked');
        } else {
            $('#tr_' + itmSid).children().children().attr('checked','');
        }
    } else {
        //checkBox押下時
        if ($('#tr_' + itmSid).children().children().attr('checked')) {
            $('#tr_' + itmSid).children().children().attr('checked','checked');
        } else {
            $('#tr_' + itmSid).children().children().attr('checked','');
        }
        checkBoxClickFlg = 0;
    }
    return false;
}

function resetTemplateObj() {
    //チェックをすべてはずす
    var tmplateList   = $("input:checkbox[name='poptemplate']");
    tmplateList.attr('checked', false);
    for (var n = 0; n < tmplateList.length; n++) {
        //画面表示
        resetTemplateName(tmplateList[n].value);
    }

    //現在画面で選択されている値を取得
    var dspTemplateList   = $("input:hidden[name='ntp231DspTemplate']");

    for (var i = 0; i < dspTemplateList.length; i++) {
      //一致する値にチェック,色変更する
      clickTemplateName(1, dspTemplateList[i].value);
    }
    return false;
}

function resetTemplateName(itmSid) {

    $('#tr_' + itmSid).children().children().attr('checked','');
    return false;
}


function initTemplateName() {
    //選択値取得
    var templateList   = $("input:hidden[name='ntp231DspTemplate']");
    $('#templateArea').children().remove();
    $('#templateArea').html("<div></div>");

    //画面表示
    if (document.forms[0].ntp231initDspFlg.value == 0) {
        for (var j = templateList.length - 1; j >= 0; j--) {

            var templateName = $('#td_name_' + templateList[j].value).html();
            if (templateName != null) {
                $('#templateArea').children().append("<div id=\"templateArea_" + templateList[j].value + "\">"
                        +  "<span class=\"text_template mr5\">"
                        +  "<a id=\""  + templateList[j].value +  "\" class=\"cl_linkDef template_click\">"
                        +  $('#td_name_' + templateList[j].value).html()
                        +  "</a>"
                        +  "</span>"
                        +  "<img class=\"btn_classicImg-display cursor_p js_templateDel\" src=\"../common/images/classic/icon_delete_2.gif\" id=\"" + templateList[j].value + "\">"
                        +  "<img class=\"btn_originalImg-display cursor_p js_templateDel\" src=\"../common/images/original/icon_delete.png\" id=\"" + templateList[j].value + "\">"
                        +  "<input type=\"hidden\" name=\"ntp231DspTemplate\" value=\"" + templateList[j].value + "\">"
                        +  "</div>");
            }
        }
    } else {
        for (var k = 0; k < templateList.length; k++) {

            var templateName = $('#td_name_' + templateList[k].value).html();
            if (templateName != null) {
                $('#templateArea').children().append("<div id=\"templateArea_" + templateList[k].value + "\">"
                        +  "<span class=\"text_template mr5\">"
                        +  "<a id=\""  + templateList[k].value +  "\" class=\"cl_linkDef template_click\">"
                        +  $('#td_name_' + templateList[k].value).html()
                        +  "</a>"
                        +  "</span>"
                        +  "<img class=\"btn_classicImg-display cursor_p js_templateDel\" src=\"../common/images/classic/icon_delete_2.gif\" id=\"" + templateList[k].value + "\">"
                        +  "<img class=\"btn_originalImg-display cursor_p js_templateDel\" src=\"../common/images/original/icon_delete.png\" id=\"" + templateList[k].value + "\">"
                        +  "<input type=\"hidden\" name=\"ntp231DspTemplate\" value=\"" + templateList[k].value + "\">"
                        +  "</div>");
            }
        }
    }

    for (var m = 0; m < templateList.length; m++) {
        //一致する値にチェック,色変更する
        clickTemplateName(1, templateList[m].value);
    }

    document.forms[0].ntp231initDspFlg.value = 1;
}