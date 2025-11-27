function buttonPush(cmd){

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

$(function() {
    initTinymce();

    setDisplay($("input:hidden[name=bbs090valueType]").val());

    $('#value_content_type_switch').live("click", function(){
      var valueType = 0;
      if ($("input:hidden[name=bbs090valueType]").val() == 0) {
        valueType = 1;
      }
      $("input:hidden[name=bbs090valueType]").val(valueType);
      changeValueType();
    });

})

function setDisplay(valueType) {
    if (valueType == '0') {
      //change to plain text
      $("input:hidden[name=bbs090valueType]").val(0);
      $("#value_content_type_switch").text(msglist["change.to.html.type"]);
      $("#input_area_html").addClass("display_none");
      $("#input_area_plain").removeClass("display_none");
      $("#plain_text_count").removeClass("display_none");

      setContentInsertArea(0);
    } else {
      //change to html text
      $("input:hidden[name=bbs090valueType]").val(1);
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

  var valueType = $("input:hidden[name=bbs090valueType]").val();

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
