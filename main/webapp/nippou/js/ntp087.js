$(function() {

    //目標名セット
    initTargetName();

    //目標選択ボタン
    $(document).on("click", ".js_targetPopBtn", function(){

        /* 目標ポップアップ */
        $('#targetPop').dialog({
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
                  var targetList   = $("input:checkbox[name='poptarget']:checked");
                  $('#targetArea').children().remove();
                  $('#targetArea').html("<div></div>");

                  //画面表示
                  for (var j = 0; j < targetList.length; j++) {
                      var targetName = $('.js_tdName_' + targetList[j].value).html();
                      if (targetName != null) {
                          $('#targetArea').children().append("<div id=\"targetArea_" + targetList[j].value + "\">"
                                +  "<div class=\"verAlignMid\">"
                                +  "<a id=\""  + targetList[j].value +  "\" class=\"cl_linkDef js_targetClick\">"
                                +  $('.js_tdName_' + targetList[j].value).html()
                                +  "</a>"
                                +  "<input type=\"hidden\" name=\"ntp087DspTarget\" value=\"" + targetList[j].value + "\">"
                                +  "<span class=\"ml5 js_targetDel\" id=\"" + targetList[j].value + "\">"
                                +  "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\" alt=\"削除\">"
                                +  "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\" alt=\"削除\">"
                                +  "</span>"
                                +  "</div>"
                                +  "</div>");
                      }

                  }
                  $(this).dialog('close');
              },
              ｷｬﾝｾﾙ: function() {
                  //表示項目をリセット
                  resetTargetObj();
                  $(this).dialog('close');
              }
            }
        });
    });


    /* 目標削除リンク */
    $(document).on('click', '.js_targetDel', function(){
        var targetId = $(this).attr("id");
        $('#targetArea_' + targetId).remove();
        clickTargetName(1, targetId);
    });

    //目標名クリック
    $(document).on('click', ".js_targetClick", function(){
        var targetSid = $(this).attr("id");
        openSubWindow("../nippou/ntp250.do?ntp250NtgSid=" + targetSid);
    });

    /* hover */
    $('.js_listHover')
        .mouseenter(function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        })
        .mouseleave(function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        });

});


function selectGroup() {
    document.forms[0].CMD.value = 'changeGrp';
    document.forms[0].submit();
    return false;
}


var checkBoxClickFlg = 0;

function clickMulti() {
    checkBoxClickFlg = 1;
    return false;
}

function clickTargetName(typeNo, itmSid) {
    let dialogCheckbox = $('#poptarget_' + itmSid);
    let dialogCheckFlg = (dialogCheckbox.attr('checked') != 'checked');

    if (checkBoxClickFlg != 0) {
        //checkBox押下時
        dialogCheckFlg = !dialogCheckFlg;
        checkBoxClickFlg = 0;
    }

    dialogCheckbox.attr('checked', dialogCheckFlg);

    return false;
}

function resetTargetObj() {
    //チェックをすべてはずす
    var targetList   = $("input:checkbox[name='poptarget']");
    targetList.attr('checked', false);
    for (var n = 0; n < targetList.length; n++) {
        //画面表示
        resetTargetName(targetList[n].value);
    }

    //現在画面で選択されている値を取得
    var dspTargetList   = $("input:hidden[name='ntp087DspTarget']");

    for (var i = 0; i < dspTargetList.length; i++) {
      //一致する値にチェック,色変更する
      clickTargetName(1, dspTargetList[i].value);
    }
    return false;
}

function resetTargetName(itmSid) {

    $('#tr_' + itmSid).children().children().children().attr('checked','');

    return false;
}


function initTargetName() {
    //選択値取得
    var targetList   = $("input:hidden[name='ntp087DspTarget']");
    $('#targetArea').children().remove();
    $('#targetArea').html("<div></div>");


    //画面表示
    if (document.forms[0].ntp087initDspFlg.value == 0) {
        for (var j = targetList.length - 1; j >= 0; j--) {

            var targetName = $('.js_tdName_' + targetList[j].value).html();
            if (targetName != null) {
                $('#targetArea').children().append("<div id=\"targetArea_" + targetList[j].value + "\">"
                        +  "<div class=\"verAlignMid\">"
                        +  "<a id=\""  + targetList[j].value +  "\" class=\"cl_linkDef js_targetClick\">"
                        +  $('.js_tdName_' + targetList[j].value).html()
                        +  "</a>"
                        +  "<input type=\"hidden\" name=\"ntp087DspTarget\" value=\"" + targetList[j].value + "\">"
                        +  "<span class=\"ml5 js_targetDel\" id=\"" + targetList[j].value + "\">"
                        +  "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\" alt=\"削除\">"
                        +  "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\" alt=\"削除\">"
                        +  "</span>"
                        +  "</div>"
                        +  "</div>");
            }

        }
    } else {
        for (var k = 0; k < targetList.length; k++) {

            var targetName = $('.js_tdName_' + targetList[k].value).html();
            if (targetName != null) {
                $('#targetArea').children().append("<div id=\"targetArea_" + targetList[k].value + "\">"
                        +  "<div class=\"verAlignMid\">"
                        +  "<a id=\""  + targetList[k].value +  "\" class=\"cl_linkDef js_targetClick\">"
                        +  $('.js_tdName_' + targetList[k].value).html()
                        +  "</a>"
                        +  "<input type=\"hidden\" name=\"ntp087DspTarget\" value=\"" + targetList[k].value + "\">"
                        +  "<span class=\"ml5 js_targetDel\" id=\"" + targetList[k].value + "\">"
                        +  "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\" alt=\"削除\">"
                        +  "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\" alt=\"削除\">"
                        +  "</span>"
                        +  "</div>"
                        +  "</div>");
            }

        }
    }
    for (var m = 0; m < targetList.length; m++) {
        //一致する値にチェック,色変更する
        clickTargetName(1, targetList[m].value);
    }

    document.forms[0].ntp087initDspFlg.value = 1;
}