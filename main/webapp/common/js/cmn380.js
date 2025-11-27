//画像ビューワーを設定する
function setImgViewer() {
  const cmn380ImageArea = document.getElementById('imgPreview');
  const viewer = new Viewer(cmn380ImageArea, {
    navbar: false,
    inline: true,
    title: false,
    toolbar: {
      zoomIn: 1,
      zoomOut: 1,
      reset: 1,
      rotateLeft: 1,
      rotateRight: 1,
      flipHorizontal: 1,
      flipVertical: 1
    },
    button: false,
    ready() {
      viewer.full();
    }
  });
}

//ファイルを読み込む（PDF, テキスト）
function loadFile() {
  //ダウンロードURLを実行し、ファイルの中身を取得
  let extension = $('input[name="extension"]').val();
  let url = $('input[name="url"]').val();
  fetch(url)
    .then((response) => {
      //ダウンロード成功/失敗を判定
      let okFlg = false;
      for (const pair of response.headers.entries()) {
        if (pair[0] == 'content-disposition') {
          okFlg = true;
          return response;
        }
      }
      //ファイルのダウンロードに失敗
      if (!okFlg) {
        throw new Error();
      }
    })
    .then((response) => response.blob())
    .then((blob) => {
      if (blob) {
        let file = new File([blob], "previewFile");
        if (extension == 'txt'
          || extension == 'js'
          || extension == 'css'
          || extension == 'html') {
          //テキスト
          convertFile(file, url, extension);
        } else if (extension == 'pdf') {
          //PDF
          dspPdf(file);
        }
      }
    })
    .catch(() => {
      dspError();
    });
}

//PDFを表示する
function dspPdf(file) {
  let createUrl = URL.createObjectURL(file);
  let src = '../common/js/pdfjs-4.2.67/web/viewer.html?file=' + createUrl;
  $('.js_pdfPreview').attr('src', src);
}

//テキスト系ファイルの文字コード変換、無害化を行う
function convertFile(file, url, extension) {
  let fd = new FormData();
  fd.append("CMD", "convertFile");
  fd.append("cmn380PreviewFileExtension", extension);
  fd.append("cmn380PreviewURL", url);
  fd.append("cmn380File", file);
  fd.append("cmn380SelectEncording", document.forms[0].cmn380SelectEncording.value);

  //ファイルの内容を無害化、ハイパーリンク化
  $.ajax({
    url: "../common/cmn380.do",
    type: "POST",
    processData: false,
    contentType: false,
    data: fd
  })
  .done(function(convertData){
    if (convertData["success"]) {
      if (extension == "html") {
        if ($('.htmlPreviewArea')) {
          $('.htmlPreviewArea').remove();
        }
        $('#textPreviewArea').closest('div').attr('class', 'm0');
        const iframe = document.createElement('iframe');
        iframe.setAttribute('class', 'htmlPreviewArea w100 pos_abs border_none');
        iframe.srcdoc = convertData["cmn380FileContent"];
        $('#textPreviewArea').closest('div').append(iframe);
        //プレビュー対象HTML内の内部リンクを無効化
        $('.htmlPreviewArea').on('load', function(){
          $('.htmlPreviewArea').contents().find('a').each(function(index, element){
            if ($(element).attr('href') != null
              && ($(element).attr('href') == "" || $(element).attr('href').startsWith('#'))) {
              $(element).css('pointer-events', 'none');
            }
          })
        });
      } else {
        $('#textPreviewArea').closest('div').attr('class', 'p10 mt0 mr10 mb40 ml10');
        $('#textPreviewArea').text("");
        $('#textPreviewArea').append(convertData["cmn380FileContent"]);
      }
    }
  })
  .fail(function(){
    dspError();
  });
}

//ファイルプレビュー失敗時、警告画面を表示する
function dspError() {
  document.forms[0].CMD.value='previewError';
  document.forms[0].submit();
}
