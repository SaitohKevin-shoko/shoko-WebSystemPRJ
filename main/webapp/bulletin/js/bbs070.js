function buttonPush(cmd){

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

function threadDateCheck() {

    setYmdParam($("input[name='bbs070limitFrDate']"),
        $("input[name='bbs070limitFrYear']"), 
        $("input[name='bbs070limitFrMonth']"),
        $("input[name='bbs070limitFrDay']"));

    setYmdParam($("input[name='bbs070limitToDate']"),
        $("input[name='bbs070limitYear']"), 
        $("input[name='bbs070limitMonth']"),
        $("input[name='bbs070limitDay']"));

    setHmParam($("input[name='bbs070limitFrTime']"), $("input[name='bbs070limitFrHour']"), $("input[name='bbs070limitFrMinute']"));
    
    setHmParam($("input[name='bbs070limitToTime']"), $("input[name='bbs070limitHour']"), $("input[name='bbs070limitMinute']"));

    var cmdMode = $('input:hidden[name="bbs070cmdMode"]').val();
    var keijiKikan = $('input[name="bbs070limit"]:checked').val();

    // 新規作成・複写・草稿
    if (cmdMode != 1) {

      document.forms[0].CMD.value = 'moveThreadConfirm';
      document.forms[0].bbs070changeDateFlg.value = 0;
      document.forms[0].submit();
      return false;

    // 編集
    } else {

      document.forms[0].CMD.value = 'threadDateCheck';
      document.forms[0].bbs070changeDateFlg.value = 0;

      var formData = getFormData($('#bbsForm'));

      // データ取得
      $.ajax({
        async : true,
        url : "../bulletin/bbs070.do",
        type : "post",
        data : formData
      }).done(function(data) {

      if (data.rtn == 'true' && keijiKikan == 1) {

      document.forms[0].bbs070changeDateFlg.value = 1;

      $('#threadKeikoku').dialog({
        autoOpen : true,
        bgiframe : true,
        resizable : false,
        height : 200,
        width : 410,
        modal : true,
        overlay : {
          backgroundColor : '#000000',
          opacity : 0.5
        },
        buttons : {
          ＯＫ : function() {
            document.forms[0].CMD.value = 'moveThreadConfirm';
            document.forms[0].submit();
            return false;
          },
          キャンセル : function() {
            $(this).dialog('close');
            }
          }
        });
      } else {
           document.forms[0].CMD.value = 'moveThreadConfirm';
           document.forms[0].submit();
           return false;
      }
    });
  }
}

$(function() {

    var unlimitedflg = $("#unlimited").text();
    if (unlimitedflg == 1) {
        $('#limit_radio_area').hide();
        $('#limit1').attr('checked',true);
    } else {
        $('#limit_radio_area').show();
    }

    //掲示期間設定区分 変更時
    $("input:radio[name=bbs070limit]").on('change', function(){
        if ($(this).val() == 1) {
            $('#limit_date_area').show();
        } else {
            $('#limit_date_area').hide();
        }
    });

    var kbn = Number($("input:radio[name=bbs070limit]:checked").val());
    if (kbn == 1) {
        $('#limit_date_area').show();
    } else {
        $('#limit_date_area').hide();
    }

    initTinymce();

    setDisplay($("input:hidden[name=bbs070valueType]").val());

    $('#value_content_type_switch').on("click", function(){
      var valueType = 0;
      if ($("input:hidden[name=bbs070valueType]").val() == 0) {
        valueType = 1;
      }
      $("input:hidden[name=bbs070valueType]").val(valueType);
      changeValueType();
    });

    //掲載日時 クイックリンク
    $('#limit_fr_today').on("click", function(){
      limitFrSet(0);
    });
    $('#limit_fr_1week').on("click", function(){
      limitFrSet(1);
    });
    $('#limit_fr_2week').on("click", function(){
      limitFrSet(2);
    });
    $('#limit_fr_month').on("click", function(){
      limitFrSet(3);
    });
    $('#limit_to_today').on("click", function(){
      limitToSet(0);
    });
    $('#limit_to_1week').on("click", function(){
      limitToSet(1);
    });
    $('#limit_to_2week').on("click", function(){
      limitToSet(2);
    });
    $('#limit_to_month').on("click", function(){
      limitToSet(3);
    });

})

//掲載開始日時 クリックリンク
function limitFrSet(mode) {
  var year;
  var month;
  var day;
  var now = new Date();
  if (mode == 0) {
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
  } else if (mode == 1) {
    now.setDate(now.getDate() + 7);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
  } else if (mode == 2) {
    now.setDate(now.getDate() + 14);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
  } else if (mode == 3) {
    if (now.getMonth() + 2 > 12) {
        year = now.getFullYear() + 1;
        month = 1;
    } else {
        year = now.getFullYear();
        month = now.getMonth() + 2;
    }
    var lastDate = new Date(year, month, 0);
    if (lastDate.getDate() < now.getDate()) {
        day = lastDate.getDate();
    } else {
        day = now.getDate();
    }
  }
  var date = year + "/" + month.toString().padStart(2, "0") + "/" + day.toString().padStart(2, "0");
  $("input[name=bbs070limitFrDate]").val(date);
}

//掲載終了日時 クリックリンク
function limitToSet(mode) {
  var year;
  var month;
  var day;
  var now = new Date();
  if (mode == 0) {
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
  } else if (mode == 1) {
    now.setDate(now.getDate() + 7);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
  } else if (mode == 2) {
    now.setDate(now.getDate() + 14);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
  } else if (mode == 3) {
    if (now.getMonth() + 2 > 12) {
        year = now.getFullYear() + 1;
        month = 1;
    } else {
        year = now.getFullYear();
        month = now.getMonth() + 2;
    }
    var lastDate = new Date(year, month, 0);
    if (lastDate.getDate() < now.getDate()) {
        day = lastDate.getDate();
    } else {
        day = now.getDate();
    }
  }
  var date = year + "/" + month.toString().padStart(2, "0") + "/" + day.toString().padStart(2, "0");
  $("input[name=bbs070limitToDate]").val(date);
}

function setDisplay(valueType) {
    if (valueType == '0') {
      //change to plain text
      $("input:hidden[name=bbs070valueType]").val(0);
      $("#value_content_type_switch").text(msglist["change.to.html.type"]);
      $("#input_area_html").addClass("display_none");
      $("#input_area_plain").removeClass("display_none");
      $("#plain_text_count").removeClass("display_none");

      setContentInsertArea(0);
    } else {
      //change to html text
      $("input:hidden[name=bbs070valueType]").val(1);
      $("#value_content_type_switch").text(msglist["change.to.plain.type"]);
      $("#input_area_html").removeClass("display_none");
      $("#input_area_plain").addClass("display_none");
      $("#plain_text_count").addClass("display_none");

      setContentInsertArea(1);
    }
}

function setupTinymce(editor) {
  editor.ui.registry.addButton('addbodyfile', {
    text: msglist["cmn.insert.content"],
    onAction: function () {
      attachmentLoadFile('2');
    }
  });
}

function changeValueType() {
  //valueType 0:plain 1:html

  var valueType = $("input:hidden[name=bbs070valueType]").val();

  setDisplay(valueType);

  if (valueType == '0') {
    //change to plain text
    var htmlAreaStr = "";
    if (tinyMCE.get('inputstr_tinymce') != null) {
      htmlAreaStr = tinyMCE.activeEditor.getContent().replace(/<br \/>/gi, '\n').replace(/<\S[^><]*>/g, '');
    }

    if (htmlAreaStr != null && htmlAreaStr.length > 0 && htmlAreaStr != "\n") {
      htmlAreaStr = formatBodyText(htmlAreaStr);
      $("#input_area_plain").val(htmlAreaStr);
      $('#inputlength').html(htmlAreaStr.length);
    }

  } else {
    //change to html text
    setCopyTextAreaStr();
  }
}

function setCopyTextAreaStr() {
  if ($("#input_area_plain").val() == null || $("#input_area_plain").val() == "") {
    $("#input_area_plain").val("");
  }
  try {
      tinyMCE.get('inputstr_tinymce').setContent(textBr(htmlEscape($("#input_area_plain").val())));
  } catch (e) {
    initTinymce();
  }
}

function textBr(txtVal){
    txtVal = txtVal.replace(/\r?\n/g, "<br />");
    return txtVal;
}

function htmlEscape(s){
    s=s.replace(/&/g,'&amp;');
    s=s.replace(/>/g,'&gt;');
    s=s.replace(/</g,'&lt;');
    return s;
}

function cmn110DropBan() {
    return $('body').find('div').hasClass('ui-widget-overlay');
}

function setContentInsertArea(htmlMode) {
    $('#bbsComposeBodyContent').empty();
    $('#attachmentFileErrorArea2').empty();
    if (htmlMode == 1) {
        $('#bbsComposeBodyContent').append(
              '<input type=\"hidden\" name=\"attachment_ID_list\" value=\"2\">'
            + '<input type=\"hidden\" name=\"attachmentFileListFlg2\" value=\"false\" />'
            + '<input type=\"hidden\" name=\"attachmentMode2\" value=\"7\" />'
            + '<input type=\"hidden\" name=\"attachmentPluginId2\" value=\"bulletin\" />'
            + '<input type=\"hidden\" name=\"attachmentTempDirId2\" value=\"' + $("input:hidden[name=tempDirId]").val() + '\" />'
            + '<input type=\"hidden\" name=\"attachmentTempDirPlus2\" value=\"bodyFile\" />'
        );
    }

    resetAttachmentDropArea();
}

function getTinymceContentsSrc(tempSaveName) {
  return 'bbs070.do?CMD=getBodyFile&bbs070TempSaveId=' + tempSaveName
                +  '&tempDirId=' + $('input[name="tempDirId"]').val();
}
