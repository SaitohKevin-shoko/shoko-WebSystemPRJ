function openPortletImagePopup(ptlCmdMode, imgId) {
    return openPtlImagePopup(ptlCmdMode,
                            document.forms[0].ptlPortletSid.value,
                            imgId);
}

function closePortletImagePopup() {
    return windowClose();
}

function deleteImage(imgId) {
    if (confirm('画像を削除します。よろしいですか?')) {
        document.forms[0].pltPortletImageSid.value=imgId;
        document.forms[0].CMD.value='deleteImage';
        document.forms[0].submit();
    }
    return false;
}

function selectPortletImage(imgId) {
    var content =
     '<img src="../pltimage/ptl990.do'
    + '?ptlPortletSid=' + '$PORTLET_SID'
    + '&imgId=' + imgId
    + '" />'

    document.forms['ptl100Form'].ptl100contentPlusImage.value = content;
    document.forms['ptl100Form'].submit();
    return false;
}

function addElementBody(type, src){
  tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), type, {src : src});
}

function getTinymceContentsSrc(tempSaveName) {
  return 'ptl100.do?CMD=getBodyFile&ptl100TempSaveId=' + tempSaveName;
}


function ptl100UploadImgFile(inputElement) {
    var fd = new FormData();
    fd.append('CMD', 'fileUpload');
    fd.append('cmn110uploadType', '1');
    fd.append('cmn110Mode', '7');
    fd.append('cmn110pluginId', 'portal');
    fd.append('tempDirId', 'ptl100');
    fd.append('cmn110TempDirPlus', 'imgFile');
    // ファイル情報を追加する
    for (var i = 0; i < inputElement.files.length; i++) {
        fd.append("cmn110file[" + i + "]", inputElement.files[i]);
    }
    var formUrl = '../common/cmn110.do';

    //「アップロード中」表示
    showFileUpload();
    $.ajax({
        url: formUrl,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(data) {
          try {
            if (data.errors) {
              if (data.errors != '0') {
                  var errorMsg = attachmentFileCreateErrorMsg(data.errorMsg, '2');
                  attachmentFileErrorMessage(errorMsg, '2');
              } else {

                  if (data.tempName && data.tempName.length > 0) {
                      let pltImgHtml = '';
                      for (fileIdx = 0; fileIdx < data.tempName.length; fileIdx++) {
                        pltImgHtml +=
                          '<img src="../pltimage/ptl990.do'
                          + '?ptlPortletSid=$PORTLET_SID'
                          + '&imgId=' + data.tempSaveName[fileIdx]
                          + '" />';
                      }
                      document.forms['ptl100Form'].ptl100contentPlusImage.value = pltImgHtml;
                  }
                  return buttonPush('init');
              }
            }

            hideFileUpload();
          } catch (ae) {
            hideFileUpload();
          }
        },
        error: function() {
            attachmentFileErrorMessage(attachmentFileCreateErrorMsg(['アップロード時にエラー発生'], '2'), '2');
            hideFileUpload();
        },
        complate: function() {
        }
    });
}

$(function(){
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
        selectPortletImage(sid);
    });

    if ($("#attachmentUploadArea1")) {
        $("#attachmentUploadArea1").addClass('display_none');
    }
});
