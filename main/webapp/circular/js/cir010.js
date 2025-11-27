function getForm() {
    return document.forms['cir010Form'];
}

function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

function changeMode(cmd){
    getForm().CMD.value=cmd;
    getForm().submit();
    return false;
}

function changeFolder(cmd, sid){
    getForm().CMD.value=cmd;
    getForm().cir010SelectLabelSid.value=sid;
    getForm().submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        getForm().cir010pageNum2.value=getForm().cir010pageNum1.value;
    } else {
        getForm().cir010pageNum1.value=getForm().cir010pageNum2.value;
    }

    getForm().CMD.value='init';
    getForm().submit();
    return false;
}

function buttonPush(cmd, id){

    getForm().CMD.value=cmd;
    getForm().cir010selectInfSid.value=id;
    getForm().submit();
    return false;
}

function gomiView(cmd, id, kbn){
    getForm().CMD.value=cmd;
    getForm().cir010selectInfSid.value=id;
    getForm().cir010sojuKbn.value=kbn;
    getForm().submit();
    return false;
}

function folderView(cmd, id, kbn){
    getForm().CMD.value=cmd;
    getForm().cir010selectInfSid.value=id;
    getForm().cir010sojuKbn.value=kbn;
    getForm().submit();
    return false;
}


function changeChk(){
   if (document.getElementsByName('allChk')[0].checked) {
       checkAll('cir010delInfSid');

   } else {
       nocheckAll('cir010delInfSid');
   }
}

function clickTitle(fid, order) {
    getForm().CMD.value='init';
    getForm().cir010sortKey.value = fid;
    getForm().cir010orderKey.value = order;
    getForm().submit();
    return false;
}

$(function() {
    /* アカウント変更 */
    $('#account_comb_box').live("change", function(){
        getForm().CMD.value='';
        getForm().cir010cmdMode.value='0';
        getForm().submit();
    });

    /* アカウントエリア クリック */
    $("#js_account_area").live("click", function(){
     $("#js_account_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
     changeSelImg($(this).children());
    });

    /* フォルダエリア クリック */
    $("#js_folder_area").live("click", function(){
        $("#js_folder_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
        changeSelImg($(this).children());
    });

    /* ラベル クリック */
    $(document).delegate(".js_label","click", function(){
        $(".js_label_area").toggle();
        if ($(this).hasClass("cir_left_line_plus")) {
            $(this).removeClass("cir_left_line_plus");
            $(this).addClass("cir_left_line_minus");
        } else if ($(this).hasClass("cir_left_line_plus_top")) {
            $(this).removeClass("cir_left_line_plus_top");
            $(this).addClass("cir_left_line_minus_top");
        } else if ($(this).hasClass("cir_left_line_plus_bottom")) {
            $(this).removeClass("cir_left_line_plus_bottom");
            $(this).addClass("cir_left_line_minus_bottom");
        } else if ($(this).hasClass("cir_left_line_minus")) {
            $(this).removeClass("cir_left_line_minus");
            $(this).addClass("cir_left_line_plus");
        } else if ($(this).hasClass("cir_left_line_minus_top")) {
            $(this).removeClass("cir_left_line_minus_top");
            $(this).addClass("cir_left_line_plus_top");
        } else if ($(this).hasClass("cir_left_line_minus_bottom")) {
            $(this).removeClass("cir_left_line_minus_bottom");
            $(this).addClass("cir_left_line_plus_bottom");
        }
    });

    /* プラス、マイナス要素クリック */
    $(document).delegate(".js_line_plus_minus","click", function(){
        $(".js_label_area").toggle();
        if ($(this).hasClass("cir_left_line_plus")) {
            $(this).removeClass("cir_left_line_plus");
            $(this).addClass("cir_left_line_minus");
        } else if ($(this).hasClass("cir_left_line_plus_top")) {
            $(this).removeClass("cir_left_line_plus_top");
            $(this).addClass("cir_left_line_minus_top");
        } else if ($(this).hasClass("cir_left_line_plus_bottom")) {
            $(this).removeClass("cir_left_line_plus_bottom");
            $(this).addClass("cir_left_line_minus_bottom");
        } else if ($(this).hasClass("cir_left_line_minus")) {
            $(this).removeClass("cir_left_line_minus");
            $(this).addClass("cir_left_line_plus");
        } else if ($(this).hasClass("cir_left_line_minus_top")) {
            $(this).removeClass("cir_left_line_minus_top");
            $(this).addClass("cir_left_line_plus_top");
        } else if ($(this).hasClass("cir_left_line_minus_bottom")) {
            $(this).removeClass("cir_left_line_minus_bottom");
            $(this).addClass("cir_left_line_plus_bottom");
        }
    });

    /* ラベル追加ボタン */
     $(document).delegate(".js_add_label","click", function(){
        addLabelListDialog();
    });

     /* ラベル追加ポップアップ ラジオボタン変更 */
     $(document).delegate("input:radio[name=cir010addLabelT]","change", function(){
       changeAddLabelType();
     });

     /* ラベル削除ボタン */
     $(document).delegate(".js_del_label","click", function(){
       deleteLabelListMail();
     });

     /* 空にするボタン クリック */
     $('#head_menu_empty_trash_btn').click(function(){
         emptyTrash();
         return false;
     });

     /* アカウントエリア クリック */
     $("#label_oya").live("click", function(){
      $("#label_ko").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );

      if ($('#label_oyaIcon').hasClass("side_folderImg-linePlusBottom")) {
          $('#label_oyaIcon').removeClass("side_folderImg-linePlusBottom");
          $('#label_oyaIcon').addClass("side_folderImg-lineMinusBottom");
      } else if ($('#label_oyaIcon').hasClass("side_folderImg-lineMinusBottom")) {
          $('#label_oyaIcon').removeClass("side_folderImg-lineMinusBottom");
          $('#label_oyaIcon').addClass("side_folderImg-linePlusBottom");
      }

      changeSelImg($('#label_oyaIcon').children());
     });

     $('.js_tableTopCheck-header').live("change",function() {
       changeChk();
        });

          /* hover */
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

         /* hover:click */
         $(".js_listClick").live("click", function(){
             var sid = $(this).parent().attr("id");
             buttonPush('view',sid);
         });

         /* hover:click */
         $(".js_trashlistClick").live("click", function(){
             var id = $(this).parent().attr("id");
             var result = id.split(',');
             var sid = result[0];
             var flg = result[1];
             gomiView('view', sid, flg);
         });

         /* hover:click */
         $(".js_folderlistClick").live("click", function(){
             var id = $(this).parent().attr("id");
             var result = id.split(',');
             var sid = result[0];
             var flg = result[1];
             folderView('view', sid, flg);
         });
});

function changeSelImg(id) {
    if (id.hasClass("side_header-close")) {
        id.removeClass("side_header-close");
        id.addClass("side_header-open");
    } else {
        id.removeClass("side_header-open");
        id.addClass("side_header-close");
    }
}

/* アカウントクリック */
$('.js_account_sel').live("click", function(){
    getForm().CMD.value='init';
    nocheckAll('cir010delInfSid');
    var accountId = $(this).attr('id');
    $('select[name=cirViewAccount]').val(accountId);
    getForm().submit();
    return false;
});

/* アカウンエリア hover */
$(".js_account_sel").live({
    mouseenter:function (e) {
        $(this).addClass("side_accountName-hover");
    },
    mouseleave:function (e) {
        $(this).removeClass("side_accountName-hover");
    }
});

/** ラベル */

//ラベルダイアログ画面初期化
function addLabelDialogClear(){
  $('#labelAddContentArea').children().remove();
}

/* ラベル追加 */
function addLabelListDialog() {
    document.forms[0].CMD.value='addLabel';
    var paramStr = "";
    paramStr += getFormData($('#cir010Form'));
    $.ajax({
        async: true,
        url:  "../circular/cir010.do",
        type: "post",
        data: paramStr
    }).done(function(data) {
        if (data["success"]) {
          labelAddPop(data);
        } else if(data["error"]) {
            var errorMsgStr = "";
            for (e = 0; e < data.errorsList.length; e++) {
                if (e != 0) {
                    errorMsgStr += "<br>";
                }
                errorMsgStr += data.errorsList[e];
            }
            messagePop(errorMsgStr, 400, 150);
        } else {
            alert(msglist_cir010['sml.208']);
        }
    }).fail(function(data){
      alert(msglist_cir010['sml.208']);
    });
}

/* ラベル削除 */
function deleteLabelListMail() {

    document.forms[0].CMD.value='delLabel';
    var paramStr = "";
    paramStr += getFormData($('#cir010Form'));
    $.ajax({
        async: true,
        url:  "../circular/cir010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
          labelDeletePop(data);
        } else if(data["error"]) {
            var errorMsgStr = "";
            for (e = 0; e < data.errorsList.length; e++) {
                if (e != 0) {
                    errorMsgStr += "<br>";
                }
                errorMsgStr += data.errorsList[e];
            }
            messagePop(errorMsgStr, 400, 150);
        } else {
          alert(msglist_cir010['sml.209']);
        }
    }).fail(function(data){
      alert(msglist_cir010['sml.209']);
    })
}

/* ラベル追加ダイアログ */
function labelAddPop(data) {

  $('#labelAddContentArea').children().remove();
  var labelContentStr = "";

  if (data != null && data.cir010LabelList != null && data.cir010LabelList.length > 0) {
      var optionStr = "";
      for (i = 0; i < data.cir010LabelList.length; i++) {
          var labelData = data.cir010LabelList[i];
          optionStr += "<option value=\""
              +  labelData.labelSid
              +  "\">"
              +  labelData.labelName
              +  "</option>";
      }
    labelContentStr = ""
      + "<tr>"
          + " <td class=\"w30\">"
          + "<span class=\"verAlignMid\">"
          + "  <input type=\"radio\" name=\"cir010addLabelT\" value=\"0\" id=\"addLabelType0\" checked=\"\">"
          + "  <label class=\"label_dialog_font\" for=\"addLabelType0\">"+ msglist_cir010['wml.76'] +"</label>"
          + " </td>"
          + " <td class=\"w70\">"
          + "  <select id=\"label_dialog_sel\" class=\"wp100\">"
          + optionStr
          + "  </select>"
          + "</span>"
          + " </td>"
          + "</tr>"
          + "<tr>"
          + " <td class=\"w30\">"
          + "<span class=\"verAlignMid\">"
          + "  <input type=\"radio\" name=\"cir010addLabelT\" id=\"addLabelType1\" value=\"1\">"
          + " <label class=\"label_dialog_font\" for=\"addLabelType1\">"+ msglist_cir010['wml.wml010.09'] +"</label>"
          + " </td>"
          + " <td class=\"w70\">"
          + "  <input type=\"text\" id=\"label_dialog_new\" class=\"w100\" maxlength=\"100\" disabled=\"\">"
          + "  <span id=\"addLabelParam\"></span>"
          + " </span>"
          + " </td>"
          + "</tr>";

  } else {
    labelContentStr = ""
      + "<tr>"
          + " <td class=\"label_dialog_font w25\">"
          + msglist_cir010['wml.wml010.09']
          + " </td>"
          + " <td class=\"w75\">"
          + "  <input type=\"text\" id=\"label_dialog_new\" class=\"w100\"  maxlength=\"100\" />"
          + "  <span id=\"addLabelParam\"></span>"
          + "  <input type=\"hidden\" name=\"cir010addLabelType\" value=\"1\">"
          + " </td>"
          + "</tr>";
  }

  $('#labelAddContentArea').append(labelContentStr);

  $('#labelAddPop').dialog({
      autoOpen: true,
      bgiframe: true,
      resizable: false,
      height:160,
      width: 400,
      modal: true,
      overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
      },
      buttons: {
          追加: function() {
              doLabel(0);
          },
          閉じる: function() {
            addLabelDialogClear();
              $(this).dialog('close');
              }
          },
        close : function(){
          addLabelDialogClear();
        }
      });


}

/* ラベル削除ダイアログ */
function labelDeletePop(data) {

    $('#labelDelContentArea').children().remove();
    var labelContentStr = "";

    if (data != null && data.cir010LabelList != null && data.cir010LabelList.length > 0) {

        var optionStr = "";
        for (i = 0; i < data.cir010LabelList.length; i++) {
            var labelData = data.cir010LabelList[i];
            optionStr += "<option value=\""
                +  labelData.labelSid
                +  "\">"
                +  labelData.labelName
                +  "</option>";
        }

        labelContentStr = "<tr>"
            + "<td>"
            + "<select id=\"label_del_dialog_sel\" class=\"w100\">"
            + optionStr
            + "</select>"
            + "</td>"
            + "</tr>";


        $('#labelDelContentArea').append(labelContentStr);

        $('#labelDelPop').dialog({
            dialogClass:"fs_13",
            autoOpen: true,
            bgiframe: true,
            resizable: false,
            height:160,
            width: 220,
            modal: true,
            overlay: {
                backgroundColor: '#000000',
                opacity: 0.5
            },
            buttons: {
                削除: function() {
                    doLabel(1);
                },
                閉じる: function() {

                    $(this).dialog('close');

                }
            }
        });
    } else {
        messagePop('ラベルが登録されていません。', 400, 150);
    }

}

/* ラベル追加削除実行 */
function doLabel(kbn) {

    var widthStr = 400;
    var heightStr = 300;

    if (kbn == 0) {

        if ($('#label_dialog_sel') != null) {
            $('input:hidden[name=cir010addLabel]').val($('#label_dialog_sel').val());
        }

        if ($('#label_dialog_new') != null) {
            $('input:hidden[name=cir010addLabelName]').val($('#label_dialog_new').val());
        }

        if ($('input:radio[name=cir010addLabelT]') != null
                && $('input:radio[name=cir010addLabelT]:checked').val() != null) {
            $('input:hidden[name=cir010addLabelType]').val($('input:radio[name=cir010addLabelT]:checked').val());
        } else {
            $('input:hidden[name=cir010addLabelType]').val(1);
        }

    } else {

        if ($('#label_del_dialog_sel') != null) {
            $('input:hidden[name=cir010delLabel]').val($('#label_del_dialog_sel').val());
        }

    }
    var cmd = "";
    var msg = "";
    if (kbn == 0) {
        cmd = "addCircularLabel";
    } else {
        cmd = "delCircularLabel";
    }

    document.forms[0].CMD.value = cmd;
    var paramStr = "";
    paramStr += getFormData($('#cir010Form'));

    $.ajax({
        async: true,
        url:  "../circular/cir010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        $('#labelAddPop').dialog('close');
        $('#labelDelPop').dialog('close');
        if (data["success"]) {
          nocheckAll('cir010delInfSid');
            getForm().CMD.value='init';
            getForm().submit();
            return false;
        } else if(data["error"]) {
            var errorMsgStr = "";
            for (e = 0; e < data.errorsList.length; e++) {
                if (e != 0) {
                    errorMsgStr += "<br>";
                }
                errorMsgStr += data.errorsList[e];
            }
            messagePop(errorMsgStr, 400, 150);
        } else {
            alert(msg);
        }
    }).fail(function(data){
        alert(msg);
    });

    $('#cir010LabelTabSelArea').children().remove();
}

/* ラベル追加タイプ */
function changeAddLabelType() {
    if ($('input:radio[name=cir010addLabelT]:checked').val() == 1) {
        $('#label_dialog_sel').attr("disabled", "disabled");
        $('#label_dialog_new').removeAttr("disabled");
    } else {
        $('#label_dialog_sel').removeAttr("disabled");
        $('#label_dialog_new').attr("disabled", "disabled");
    }
}

/* ゴミ箱を空にするボタンクリック */
function emptyTrash() {

    document.forms[0].CMD.value='gomibakoClear';
    var paramStr = "";
    paramStr += getFormData($('#cir010Form'));

    $.ajax({
        async: true,
        url:  "../circular/cir010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data["success"]) {
          deleteAllPop(msglist_cir010["cir.cir010.4"],400, 150);
        } else if(data["error"]) {
          messagePop(msglist_cir010["cir.cir010.5"], 400, 150);
        } else {
            alert(msglist_cir010["sml.207"]);
        }
    }).fail(function(data){
        alert(msglist_cir010["sml.207"]);
    });
}


/* ゴミ箱を空にする確認 */
function deleteAllPop(msg, width, height) {

    $('#messageArea').html("");
    $('#messageArea').append(msg);
    $('#messagePop').dialog({
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        height: height,
        width: width,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            はい: function() {
                $(this).dialog('close');
                doEmptyTrash();
            },
            いいえ: function() {
                $(this).dialog('close');
            }
        }
    });
}

/* ゴミ箱を空にする実行 */
function doEmptyTrash() {

    document.forms[0].CMD.value='gomibakoClearExe';
    var paramStr = "";
    paramStr += getFormData($('#cir010Form'));

    $.ajax({
        async: true,
        url:  "../circular/cir010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
          nocheckAll('cir010delInfSid');
            getForm().CMD.value='init';
            getForm().submit();
            return false;
        } else {
            alert(msglist_cir010["sml.207"]);
        }
    }).fail(function(data){
        alert(msglist_cir010["sml.207"]);
    });
}

/* メッセージ表示 */
function messagePop(msg, width, height) {
    $('#messageArea').html("");
    $('#messageArea').append(msg);
    $('#messagePop').dialog({
        dialogClass:"fs_13",
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        height: height,
        width: width,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            OK: function() {
                $(this).dialog('close');
                $('#errorMsgArea').html("");
            }
        }
    });
}