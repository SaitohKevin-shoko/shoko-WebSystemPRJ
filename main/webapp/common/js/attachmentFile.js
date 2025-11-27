var uploadFiles;
$(function () {

  //ファイルプレビュー用Webコンポーネントの初期化
  $.ajax({
    url: '../common/components/file-preview/index.js?<%=GSConst.VERSION_PARAM%>',
    dataType:"script",
    async:false
  });

  uploadFiles = function (files, attachType, objId) {
    if (!objId) {
      objId = '';
    }
    if (!document.getElementById('attachmentUploadArea' + objId) && !judgMobile()) {
      attachmentOverlayRemove();
      return;
    }

    // FormData オブジェクトを用意
    var fd = createFormData(objId);
    fd.append('CMD', 'fileUpload');
    fd.append('cmn110uploadType', '1');

    // ファイル情報を追加する
    for (var i = 0; i < files.length; i++) {
      fd.append("cmn110file[" + i + "]", files[i]);
    }
    var formUrl = '../common/cmn110.do';

    //「アップロード中」表示
    attachmentOverlayRemove();
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
            var mode = getAttachmentMode(objId);
            if (data.errors != '0') {
              var errorMsg = attachmentFileCreateErrorMsg(data.errorMsg, objId);
              attachmentFileErrorMessage(errorMsg, objId);
            } else {
              attachmentFileErrorMessage('', objId);
              //単一ファイル選択の場合、添付ファイルリストを初期化する
              if (mode == 1 || mode == 2 || mode == 4 || mode == 5 || mode == 9) {
                if ($('#attachmentFileListArea' + objId)) {
                  $('#attachmentFileListArea' + objId).html('');
                }
              }
            }

            let tempListFlg = 'false';
            if (document.getElementsByName('attachmentFileListFlg' + objId)) {
              tempListFlg = document.getElementsByName('attachmentFileListFlg' + objId)[0].value;
            }

            if (data.tempName && data.tempName.length > 0) {
              let fileObjId = '';
              if (objId) {
                fileObjId = "\', \'" + objId;
              }

              if (tempListFlg == 'true') {

                var fileAltText = $('input[name="fileAltText"]').val();
                var deleteAltText = $('input[name="deleteAltText"]').val();

                for (fileIdx = 0; fileIdx < data.tempName.length; fileIdx++) {
                  var tempExtension = "";
                  if (data.tempName[fileIdx].indexOf(".") > 0) {
                    tempExtension = data.tempName[fileIdx].substring(data.tempName[fileIdx].lastIndexOf('.') + 1);
                    tempExtension =  tempExtension.toLowerCase();
                  }
                  if (mode == 8) {
                    $('#attachmentFileListArea' + objId).append(
                    '<file-preview url="'+ createDownloadUrl(data.tempSaveName[fileIdx], objId, 1) + '" filename="' + data.tempName[fileIdx] + '">'
                    + '<div id="attachmentFileDetail' + objId + '_' + data.tempSaveName[fileIdx] + '">'
                    + '<span class="verAlignMid">'
                    + '<a href="#!" onClick="attachmentFileDownload(\'' + data.tempSaveName[fileIdx] + '\');">'
                    + '<span class="textLink">' + data.tempName[fileIdx] + '</span>'
                    + '</a>'
                    + '<img class="ml5 cursor_p btn_originalImg-display" src="../common/images/original/icon_delete.png" onClick="attachmentDeleteFile(\'' + data.tempSaveName[fileIdx] + '\',\'' + objId + '\');" draggable="false" alt=\"' + deleteAltText + '\">'
                    + '<img class="ml5 cursor_p btn_classicImg-display" src="../common/images/classic/icon_delete.png" onClick="attachmentDeleteFile(\'' + data.tempSaveName[fileIdx] + '\',\'' + objId + '\');" draggable="false" alt=\"' + deleteAltText + '\">'
                    + '</span>'
                    + '</div>'
                    + '</file-preview>'
                    );
                  } else {
                    $('#attachmentFileListArea' + objId).append(
                    '<file-preview url="'+ createDownloadUrl(data.tempSaveName[fileIdx], objId, 1) + '" filename="' + data.tempName[fileIdx] + '">'
                    + '<div id="attachmentFileDetail' + objId + '_' + data.tempSaveName[fileIdx] + '" class="mt5 display_flex">'
                    + '<div class="verAlignMid">'
                    + '<img class="classic-display" src="../common/images/classic/icon_temp_file_2.png" draggable="false" alt=\"' + fileAltText + '\">'
                    + '<img class="original-display" src="../common/images/original/icon_attach.png" draggable="false" alt=\"' + fileAltText + '\">'
                    + '<a href="#!" onClick="attachmentFileDownload(\'' + data.tempSaveName[fileIdx] + fileObjId + '\');">'
                    + '<span class="textLink ml5">' + data.tempName[fileIdx] + '</span>'
                    + '</a>'
                    + '<img class="ml5 cursor_p btn_originalImg-display" src="../common/images/original/icon_delete.png" onClick="attachmentDeleteFile(\'' + data.tempSaveName[fileIdx] + '\',\'' + objId + '\');" draggable="false" alt=\"' + deleteAltText + '\">'
                    + '<img class="ml5 cursor_p btn_classicImg-display" src="../common/images/classic/icon_delete.png" onClick="attachmentDeleteFile(\'' + data.tempSaveName[fileIdx] + '\',\'' + objId + '\');" draggable="false" alt=\"' + deleteAltText + '\">'
                    + '</div>'
                    + '</div>'
                    + '</file-preview>'
                    );
                  }
                }
              }
              attachmentCheckStatus(data.tempName, data.tempSaveName, objId);
            }
          } else if (data.indexOf('[ファイル]の容量が100MBを超えているため、送信できません。') >= 0) {
            attachmentFileErrorMessage(attachmentFileCreateErrorMsg(['[ファイル]の容量が100MBを超えているため、送信できません。'], objId), objId);
          }
          hideFileUpload();
        } catch (ae) {
          hideFileUpload();
        }
      },
      error: function() {
        attachmentFileErrorMessage(attachmentFileCreateErrorMsg(['アップロード時にエラー発生'], objId), objId);
        hideFileUpload();
      },
      complate: function() {
      }
    });
  };

  attachmentBodyInit();

});

var fileDragFlg = false;
var fileDragCount = 0;
function attachmentFilePreventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function attachmentOverlayShow(e) {
  if (e.dataTransfer.types.indexOf("Files") < 0) {
    return;
  }

  if ('cmn110DropBan' in window) {
    if (cmn110DropBan()) {
      return;
    }
  }
  attachmentFilePreventDefaults(e);

  if (window == window.parent) {
    $(".fileDrop-Overlay").height(document.documentElement.clientHeight);
  } else {
    $(".fileDrop-Overlay").height($('html').outerHeight());

    let overlayHeight = $(".fileDrop-Overlay").height();
    if (!overlayHeight || overlayHeight < document.body.clientHeight) {
      overlayHeight = document.body.clientHeight;
    }
    if (overlayHeight < document.documentElement.clientHeight) {
      overlayHeight = document.documentElement.clientHeight;
    }

    $(".fileDrop-Overlay").height(overlayHeight);
  }

  $(".fileDrop-Overlay").width($('html').outerWidth());
  if ($(".fileDrop-Overlay").width() <= document.documentElement.clientWidth) {
    $(".fileDrop-Overlay").width(document.documentElement.clientWidth);
  }


  var attachmentIdList = getAttachmentFileIdList();
  for (idx = 0; idx < attachmentIdList.length; idx++) {
    if (document.getElementById('attachmentUploadArea' + attachmentIdList[idx])) {
        document.getElementById('attachmentUploadArea' + attachmentIdList[idx]).style
          = getDropAreaStyle(attachmentIdList[idx]);
    }
    if ($('input[name="attachmentTempDirId' + attachmentIdList[idx] + '"]').val() == 'ntp040'
    && getComputedStyle(document.getElementById('attachmentUploadArea' + attachmentIdList[idx])).left == "0px") {
      document.getElementById('attachmentUploadArea' + attachmentIdList[idx]).style.display = 'none';
    }
  }

  if (attachmentIdList.length == 1 && document.getElementById('attachmentUploadArea_label_single')) {
    document.getElementById('attachmentUploadArea_label_single').style
      = getDropLabelStyle('');
  }

  const multiAreaFlg = isMuiltiDropArea();
  for (idx = 0; idx < attachmentIdList.length; idx++) {
    const fileFormId = 'attachment_FormArea' + attachmentIdList[idx];

    if (document.getElementById(fileFormId) == null) {
      return;
    }
    let labelHeight = document.getElementById(fileFormId).clientHeight;
    if (labelHeight > 60) {
      labelHeight = 60;
    }
    labelHeight -= 10;
    if (attachmentIdList[idx].length > 0 && multiAreaFlg) {
      $('#attachmentUploadArea_label_' + attachmentIdList[idx]).css(
        {
          'height': labelHeight + 'px',
          'border-radius':(labelHeight / 1.5) + 'px'
        }
      );
    }
  }

  document.getElementById('fileDrop_Overlay').style.filter = 'opacity(1)';
  document.getElementById('fileDrop_Overlay').style.visibility = 'visible';

  fileDragCount++;
}

function attachmentOverlayHide(e) {
  attachmentFilePreventDefaults(e);

  if (isMuiltiDropArea()) {
    if (fileDragFlg) {
      fileDragFlg = false;
    } else {
      attachmentOverlayRemove();
    }
  } else {
    attachmentOverlayRemove();
  }
}

function attachmentOverlayRemove() {

  if (!document.getElementById('fileDrop_Overlay')) {
    return;
  }

  document.getElementById('fileDrop_Overlay').style.filter = 'opacity(0)';
  document.getElementById('fileDrop_Overlay').style.visibility = 'hidden';

  $(".fileDrop-Overlay").height(0);
  $(".fileDrop-Overlay").width(0);

  var attachmentIdList = getAttachmentFileIdList();

  for (idx = 0; idx < attachmentIdList.length; idx++) {
    if (attachmentIdList[idx].length > 0) {
      document.getElementById('attachmentUploadArea' + attachmentIdList[idx]).style.width = '0px';
      document.getElementById('attachmentUploadArea' + attachmentIdList[idx]).style.height = '0px';
    }
  }
  fileDragFlg = false;

}

var fileLabelCounter = 0;
var fileLabelId;
function attachmentFileDragenter(e) {

  if (isMuiltiDropArea()) {
    $('#attachmentUploadArea' + e.target.dataset.id).addClass('fileDropArea-drag');
    fileLabelCounter++;
    if (!fileLabelId) {
      fileLabelId = e.target.dataset.id;
    } else if (fileLabelId != e.target.dataset.id) {
      $('#attachmentUploadArea' + fileLabelId).removeClass('fileDropArea-drag');
      fileLabelId = e.target.dataset.id;
      fileLabelCounter = 1;
    }
  }

  attachmentFilePreventDefaults(e);
  fileDragFlg = true;

}

function attachmentFileDragover(e) {

  attachmentFilePreventDefaults(e);
}

function attachmentFileDragleave(e) {

  if (isMuiltiDropArea()) {

    if (fileLabelId != e.target.dataset.id) {
      $('#attachmentUploadArea' + fileLabelId).removeClass('fileDropArea-drag');
      return;
    }

    fileLabelCounter--;
    if (fileLabelCounter == 0) {
      if (fileLabelId != e.target.dataset.id) {
        $('#attachmentUploadArea' + fileLabelId).removeClass('fileDropArea-drag');
        fileLabelId = e.target.dataset.id;
      }
      $('#attachmentUploadArea' + e.target.dataset.id).removeClass('fileDropArea-drag');
    }

    if (e.clientY <= 0 || e.clientY >= window.innerHeight) {
      fileDragFlg = false;
      attachmentOverlayHide(e);
    }
  }

  attachmentFilePreventDefaults(e);
  fileDragFlg = false;
}

function attachmentFileDrop(e) {
  attachmentFilePreventDefaults(e);

  if (document.getElementById('attachmentUploadArea' + e.target.dataset.id)) {
    $('#attachmentUploadArea' + e.target.dataset.id).removeClass('fileDropArea-drag');
  }

  var files = e.dataTransfer.files;
  uploadFiles(files, 1, e.target.dataset.id);
}

function attachmentInitSetting(id) {
  var dropbox = document.getElementById("attachmentUploadArea" + id);
  dropbox.addEventListener("dragenter", attachmentFileDragenter, false);
  dropbox.addEventListener("dragover", attachmentFileDragover, false);
  dropbox.addEventListener("dragleave", attachmentFileDragleave, false);
  dropbox.addEventListener("drop", attachmentFileDrop, false);
}

function getErrAreaSelector(objId) {
  let errAreaSelector = '#attachmentFileErrorArea' + objId;
  if (document.getElementsByName('attachmentFileErrorAreaSelector' + objId).length > 0) {
    errAreaSelector = document.getElementsByName('attachmentFileErrorAreaSelector' + objId)[0].value;
  }

  return errAreaSelector;
}

function attachmentFileErrorMessage(errorMsg, objId) {
  $(getErrAreaSelector(objId)).html(errorMsg);
}

function attachmentFileCreateErrorMsg(errorMsgList, objId) {
  let errAreaSelector = getErrAreaSelector(objId);

  var errorMsg = '';
  if (errAreaSelector.indexOf('attachmentFileErrorArea') >= 0) {
    if ($("#attachment_FormArea").find('input[name="attachmentMode"]').val() == 8
      || ($("#attachment_FormArea").find('input[name="attachmentTempDirId"]').val() == 'rng090'
      && $("#attachment_FormArea").find('input[name="attachmentTempDirPlus"]').val() != null)) {
      errorMsg = '<div class="fs_13 textError mt5 mb5">';
    } else {
      errorMsg = '<div class="textError mt5 mb5">';
    }
  }

  for (errIdx = 0; errIdx < errorMsgList.length; errIdx++) {
    if (errIdx > 0) { errorMsg += '<br>'; }
    errorMsg += errorMsgList[errIdx];
  }

  if (errAreaSelector.indexOf('attachmentFileErrorArea') >= 0) {
    errorMsg += '</div>';
  }

  return errorMsg;
}

function attachmentFileDownload(fileId, id) {
  location.href = createDownloadUrl(fileId, id, 0);
}

function createDownloadUrl(fileId, id, type) {
  var formUrl = '../common/cmn110.do';

  var fd = createFormData(id);

  if (type == 1) {
    formUrl += '?CMD=fileInlineDownload';
  } else {
    formUrl += '?CMD=fileDownload';
  }
  formUrl += '&cmn110DlFileId=' +  fileId;

  for (var item of fd) {
    formUrl += '&' + item[0] + "=" + item[1];
  }

  return formUrl;
}


function createFormData(id) {
  var objId = '';
  if (id) {
    objId = id;
  }

  var fd = new FormData();
  var mode = getAttachmentMode(objId);
  var pluginId = document.getElementsByName('attachmentPluginId' + objId)[0].value;
  var tempDirId = document.getElementsByName('attachmentTempDirId' + objId)[0].value;
  fd.append('cmn110Mode', mode);
  fd.append('cmn110pluginId', pluginId);
  fd.append('tempDirId', tempDirId);

  if (document.getElementsByName('attachmentTempDirPlus' + objId)) {
    fd.append('cmn110TempDirPlus',
      document.getElementsByName('attachmentTempDirPlus' + objId)[0].value
    );
  }

  return fd;
}

function getAttachmentPluginId(objId) {
  return document.getElementsByName('attachmentPluginId' + objId)[0].value;
}

function getAttachmentMode(objId) {
  return document.getElementsByName('attachmentMode' + objId)[0].value;
}

//添付ボタン押下
function attachmentLoadFile(id) {
  var attachFileObjId = '#attachmentAreaBtn';
  if (id) {
    attachFileObjId += id;
  }
  $(attachFileObjId).val('');
  $(attachFileObjId).click();
}

function attachFileSelect(inputElement, id) {
  if (inputElement.files && inputElement.files.length > 0) {
    uploadFiles(inputElement.files, 0, id);
  }
}

//添付ファイル削除
function attachmentDeleteFile(fileId, id) {
  // FormData オブジェクトを用意
  var fd = createFormData(id);
  fd.append('CMD', 'fileDelete');
  fd.append('cmn110DlFileId', fileId);
  var formUrl = '../common/cmn110.do';

  $.ajax({
    url: formUrl,
    type: "POST",
    data: fd,
    processData: false,
    contentType: false,
    success: function(data) {
      try {
        if (data.errors != '0') {
          for (errIdx = 0; errIdx < data.errorMsg.length; errIdx++) {
            var errorMsg = attachmentFileCreateErrorMsg(data.errorMsg);
            attachmentFileErrorMessage(errorMsg, objId);
          }
        } else {
          var objId = '';
          if (id) {
            objId = id;
          }
          attachmentFileErrorMessage('', objId);
          $('#attachmentFileDetail' + objId + '_' + fileId).remove();
        }
      } catch (ae) { console.log(ae); }
    },
    error: function() {
    },
    complate: function() {
    }
  });
}

/**
 * ファイル添付送信完了時に呼ばれる
 * 対象画面の関数cmn110Updatedを呼びます
 * 各画面はcmn110Updated(window, tempName, tempSaveName, formId)関数でファイル送信完了後の動作を定義してください
 * @returns
 */
function attachmentCheckStatus(tempNameList, tempSaveNameList, objId) {
  var tempCloseFlg = false;
  if (tempNameList) {
    const pluginId = getAttachmentPluginId(objId);
    for (tempIdx = 0; tempIdx < tempNameList.length; tempIdx++) {
        var tempName = tempNameList[tempIdx];
        var tempSaveName = tempSaveNameList[tempIdx];

        if (window.opener && ('cmn110Updated' in window.opener)) {
          tempCloseFlg = window.opener.cmn110Updated(window, tempName, tempSaveName, objId);
        } else if ('cmn110Updated' in window) {
          tempCloseFlg = true;
          tempCloseFlg = cmn110Updated(window, tempName, tempSaveName, objId);
        } else {
          var attachmentMode = getAttachmentMode(objId);
          if (attachmentMode == 7) {
            setParentParamTinymceMode(tempNameList, tempSaveNameList, tempIdx);
          } else if (attachmentMode == 8) {
            window.opener.addTempFile(tempSaveName, tempName);
          }
        }
    }
  }
}

function setParentParamTinymceMode(tempNameList, tempSaveNameList, tempIdx) {

  var tempName = tempNameList[tempIdx];
  var tempSaveName = tempSaveNameList[tempIdx];
  var src = '';
  var lowerName = tempName.toLowerCase();

  if (attachmentEndsWith(lowerName, '.gif')
    || attachmentEndsWith(lowerName, '.jpeg')
    || attachmentEndsWith(lowerName, '.jpg')
    || attachmentEndsWith(lowerName, '.png')) {

    //対象画面の関数getTinymceContentsSrcを呼び出し、画像ファイルのパスを取得する
    if ('getTinymceContentsSrc' in window) {
      src = getTinymceContentsSrc(tempSaveName);
      window.addElementBody('img', src);
    }
  }
}

function attachmentEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function attachmentBodyInit() {
  var agent = navigator.userAgent;

  if (!judgMobile()) {

    //スマートフォン以外の場合、ファイルドロップ領域を表示する
    var droparea = document.createElement("div")
    droparea.id = 'fileDrop_Overlay';
    droparea.className = 'fileDrop-Overlay';

    droparea.innerHTML = createUploadHtml();
    document.body.appendChild(droparea)

    if (isMuiltiDropArea()) {
      droparea.style.position = 'absolute';
    } else {
      droparea.style.position = 'fixed';
    }

    const overlay = document.querySelector('#fileDrop_Overlay');
    overlay.addEventListener("dragenter", attachmentFilePreventDefaults, false);
    overlay.addEventListener("dragover", attachmentFilePreventDefaults, false);

    window.addEventListener('dragenter', { handleEvent: attachmentOverlayShow, target: overlay });

    if (isMuiltiDropArea()) {
      overlay.addEventListener('dragleave', { handleEvent: attachmentOverlayHide, target: overlay });

    } else {
      const singleId = getAttachmentSingleId();
      document.getElementById('attachmentUploadArea' + singleId).addEventListener('dragleave', { handleEvent: attachmentOverlayHide, target: overlay });
    }
    overlay.addEventListener('drop', { handleEvent: attachmentFileDrop, target: overlay });

    const attachmentIdList = getAttachmentFileIdList();
    for (idx = 0; idx < attachmentIdList.length; idx++) {
      attachmentInitSetting(attachmentIdList[idx]);
    }
  }

  //アップロード中に表示する領域を設定する

  var fileLoadingArea = document.createElement("div")
  fileLoadingArea.id = 'fileUpload_Overlay';
  fileLoadingArea.className = 'fileUpload-Overlay';
  fileLoadingArea.style.filter = 'opacity(0)';
  fileLoadingArea.style.visibility = 'hidden';
  fileLoadingArea.style.width = '0px;';
  fileLoadingArea.style.height = '0px;';

  document.body.appendChild(fileLoadingArea)
}

function isMuiltiDropArea() {
  if ($('#attachmentFileMultiMode') && $('#attachmentFileMultiMode').val() == 'multi') {
    return true;
  }

  if (!document.getElementsByName('attachment_ID_list')) {
    return false
  }
  return document.getElementsByName('attachment_ID_list').length > 1;
}

function createUploadHtml() {
  //添付ファイル項目が複数存在する場合、項目別にファイルドロップ領域を設定
  var attachmentIdList = getAttachmentFileIdList();
  var uploadAreaHtml = '';

  uploadAreaHtml +=
    '<img src="../common/images/original/icon_close.png"'
    + ' class="fileDrop-Overlay-closeIcon cursor_p" onclick="attachmentOverlayRemove();" />';

  let attachmentId;
  for (idx = 0; idx < attachmentIdList.length; idx++) {
    attachmentId = attachmentIdList[idx];
    uploadAreaHtml +=
      '<div id="attachmentUploadArea' + attachmentId + '"';
    if (attachmentIdList.length == 1) {
      uploadAreaHtml +=
        ' class="fileDropArea-outline-single"';
    } else {
      uploadAreaHtml +=
        ' class="fileDropArea-outline-multi"'
        + ' style="' + getDropAreaStyle(attachmentId) + '"';
    }
    uploadAreaHtml += ' data-id="'  + attachmentId + '">';

    uploadAreaHtml +=
      '<div class="fs_14 txt_c txt_m fileDropArea-label"';

    if (attachmentIdList.length == 1) {
      uploadAreaHtml += ' id="attachmentUploadArea_label_single"';
      uploadAreaHtml +=
        ' style="' + getDropLabelStyle('');
    } else {
      uploadAreaHtml += ' id="attachmentUploadArea_label_' + attachmentId + '"';
      uploadAreaHtml +=
        ' style="' + getDropLabelStyle(attachmentId);
    }
    uploadAreaHtml += ' data-id="'  + attachmentId + '"';

    uploadAreaHtml += '>'
      + 'ここにファイルをドロップ'
      + '</div>';

    uploadAreaHtml += '</div>'
  }

  return uploadAreaHtml;
}

function getDropAreaStyle(areaId) {
  let styleStr = '';
  if (areaId.length > 0 && isMuiltiDropArea()) {
    const fileFormId = 'attachment_FormArea' + areaId;
    let client_w = document.getElementById(fileFormId).clientWidth;
    let client_h = document.getElementById(fileFormId).clientHeight;
    var off = $('#' + fileFormId).offset();
    let client_top = off.top;
    let client_left = off.left;

    if ($('input[name="attachmentTempDirId' + areaId + '"]').val() == 'ntp040') {
      client_h = $('#nippou_data_' + areaId).height();
      client_top = $('#nippou_data_' + areaId).offset().top;
    }
    styleStr =
      'width:' + client_w + 'px; '
      + 'height:' + client_h + 'px; '
      + 'top:' + client_top + 'px; '
      + 'left:' + client_left + 'px; '
      + 'text-valign: middle; '
      + 'display: flex; '
      + 'align-items: center; '
      + 'justify-content: center; '
      + 'position: absolute; ';

    let radius = (client_h / 4);
    if (radius > 20) {
      radius = 20;
    }

    styleStr += 'border-radius: ' + radius + 'px;';

  } else {
    let dropWidth = $('.fileDrop-Overlay').width();
    let dropHeight = (window.innerHeight);
    if (dropHeight > $('.fileDrop-Overlay').height()) {
      dropHeight = $('.fileDrop-Overlay').height();
    }
    styleStr =
      'width:' + dropWidth + 'px; '
      + 'height:' + dropHeight + 'px; '
      + 'display: flex; ';

  }
  return styleStr;
}

function getDropLabelStyle(labelId) {
  var styleStr = '';
  if (labelId.length > 0) {
    styleStr =
      'display: flex; '
    + 'align-items: center; '
    + 'justify-content: center; '
    + 'padding-left: 30px; padding-right: 30px; '
    + 'height: 0px; '
    + 'border-radius: 0px; '
    + 'pointer-events: none; '
    + '"';
  } else {
    styleStr =
      'height: ' + 50 + 'px; '
    + 'border-radius: ' + 30 + 'px; '
    + 'position: absolute; '
    + 'display: flex; '
    + 'align-items: center; '
    + 'justify-content: center; '
    + 'padding-left: 30px; padding-right: 30px; '
    + 'top: ' + (($('#attachmentUploadArea' + getAttachmentSingleId()).height() / 2) - 25) + 'px; '
    + 'pointer-events: none; '
    + '"';
  }

  return styleStr;
}


function getAttachmentFileIdList() {
  var idList = [];

  var attachmentIdList = document.getElementsByName('attachment_ID_list');
  if (attachmentIdList && attachmentIdList.length > 0) {
    let fileIdx;
    for (fileIdx = 0; fileIdx < attachmentIdList.length; fileIdx++) {
      idList.push(attachmentIdList[fileIdx].value);
    }
  } else {
    idList.push('');
  }
  return idList;
}

function showFileUpload() {
  if (window == window.parent) {
    $("#fileUpload_Overlay").height(document.documentElement.clientHeight);
  } else {
    $("#fileUpload_Overlay").height($('html').outerHeight());

    let overlayHeight = $(".fileDrop-Overlay").height();
    if (!overlayHeight || overlayHeight < document.body.clientHeight) {
      overlayHeight = document.body.clientHeight;
    }
    if (overlayHeight < document.documentElement.clientHeight) {
      overlayHeight = document.documentElement.clientHeight;
    }

    $("#fileUpload_Overlay").height(overlayHeight);
  }

  $("#fileUpload_Overlay").width($('html').outerWidth());
  if ($("#fileUpload_Overlay").width() <= document.documentElement.clientWidth) {
    $("#fileUpload_Overlay").width(document.documentElement.clientWidth);
  }


  let loadingHeight = (window.innerHeight - 20);

  styleStr =
    'position: absolute; '
    + 'display: flex; '
    + 'align-items: center; '
    + 'justify-content: center; '
    + 'margin: 10px;'
    + 'width: 150px;'
    + 'height: 70px;'
    + 'top: ' + ((loadingHeight / 2) - 35) + 'px; '
    ;

  $("#fileUpload_Overlay").html(
    '<div style="' + styleStr + '" class="fileUpload-loading" style="">'
    + '<table class="w100">'
    + '<tr><td class="">アップロード中</td></tr>'
    + '<tr class="w99"><td class="txt_c fileUpload-loading-content">'
    + '<img class="btn_classicImg-display" src="../common/images/classic/icon_loader.gif">'
    + '<div class="loader-ball"><span class=""></span><span class=""></span><span class=""></span></div>'
    + '</td></tr>'
    + '</table>'
    + '</div>'
  );

  document.getElementById('fileUpload_Overlay').style.filter = 'opacity(1)';
  document.getElementById('fileUpload_Overlay').style.visibility = 'visible';
}

function hideFileUpload() {
  $("#fileUpload_Overlay").html('');

  document.getElementById('fileUpload_Overlay').style.filter = 'opacity(0)';
  document.getElementById('fileUpload_Overlay').style.visibility = 'hidden';
}

function judgMobile() {
  var agent = navigator.userAgent;
  if (agent.indexOf('iPhone') <= 0
    && agent.indexOf('Android') <= 0
    && agent.indexOf('Mobile') <= 0) {
    return false;
  }
  return true;
}

function getAttachmentSingleId() {
  const attachmentIdList = getAttachmentFileIdList();
  if (!attachmentIdList || attachmentIdList.length < 1) {
    return '';
  }
  return attachmentIdList[0];
}

function resetAttachmentDropArea() {
  if ($('#fileDrop_Overlay')) {
    $('#fileDrop_Overlay').remove();
  }
  if ($('#fileUpload_Overlay')) {
    $('#fileUpload_Overlay').remove();
  }

  attachmentBodyInit();
}

function isDisplayAttachmentOverlay() {
  return document.getElementById('fileDrop_Overlay').style.visibility == 'visible';
}
