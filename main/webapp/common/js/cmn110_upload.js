var uploadFiles;
$(function () {
  if (window.File) {
//    $('#cmn110NormalArea').hide();
    document.forms['cmn110Form'].cmn110uploadType.value=1;

    uploadFiles = function (files) {
        document.getElementById('cmn110fileDataArea').innerHTML = '';
        // FormData オブジェクトを用意
        var fd = new FormData();

        // ファイル情報を追加する
        for (var i = 0; i < files.length; i++) {
            fd.append("cmn110file[" + i + "]", files[i]);
        }

        var formUrl = '../common/cmn110.do';
        document.forms['cmn110Form'].CMD.value='fileUpload';
        document.forms['cmn110Form'].cmn110uploadType.value=1;
        var formParams = $('form').serialize();
        formUrl += "?" + formParams;
        document.forms['cmn110Form'].CMD.value='';

        var formParams = $('form').serialize();
        formUrl += "?" + formParams;

        freezeScreenThis(document.forms['cmn110Form'].cmn110freezeText.value);
        $.ajax({
            url: formUrl,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function(data) {
              try {
                document.getElementById('cmn110fileDataArea').innerHTML = '';
                if (data.errors != '0') {
                  var cmn110ErrMsg = '<div class="textError">';
                  for (errIdx = 0; errIdx < data.errorMsg.length; errIdx++) {
                    if (errIdx > 0) { cmn110ErrMsg += '<br>'; }
                    cmn110ErrMsg += '<b>' + data.errorMsg[errIdx] + '</b>';
                  }
                  cmn110ErrMsg += '</div>';
                  document.getElementById('cmn110fileDataArea').innerHTML = cmn110ErrMsg;
                } else {
                  var fileDataHtml;
                  for (fileIdx = 0; fileIdx < data.tempName.length; fileIdx++) {
                      fileDataHtml
                      = fileDataHtml
                      + '<input type="hidden" name="cmn110tempName" value="' + data.tempName[fileIdx] + '">'
                      + '<input type="hidden" name="cmn110tempSaveName" value="' + data.tempSaveName[fileIdx] + '">';
                  }
                  document.getElementById('cmn110fileDataArea').innerHTML = fileDataHtml
                  document.forms['cmn110Form'].cmn110Decision.value = 1;
                  checkStatus(true);
                }
              } catch (ae) {}
              clearScreenParent(true);
            },
            error: function() {
              clearScreenParent(true);
            }
        });
    };

    var dropbox;
    dropbox = document.getElementById("uploadArea");
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);
  } else {
    $('#cmn110DragArea').hide();
  }
});

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var files = e.dataTransfer.files;
  uploadFiles(files);
}
