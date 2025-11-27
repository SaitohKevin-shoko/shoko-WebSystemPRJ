//プレビューウィンドウ表示処理
var cmn380SubWindow;

var previewWinWidth = 900,
  previewWinHeight = 900;

function openPreviewWindow(url, fileName) {
  var winx = getCenterX(previewWinWidth);
  var winy = getCenterY(previewWinHeight);

  var index = fileName.lastIndexOf('.');
  var extension = fileName.substring(index + 1);
  var encodeUrl = encodeURIComponent(url);
  var encodeExtension = encodeURIComponent(extension);
  var encodeFileName = encodeURIComponent(fileName);

  var url =
    '../common/cmn380.do'
    + '?cmn380PreviewURL=' + encodeUrl
    + '&cmn380PreviewFileExtension=' + encodeExtension
    + '&cmn380FileName=' + encodeFileName;
  var newWinOpt =
    'width=' + previewWinWidth + ','
    + 'height=' + previewWinHeight + ','
    + 'resizable=yes, toolbar=no'
    + 'left=' + winx + ','
    + 'top=' + winy + ','
    + 'scrollbars=yes';
  cmn380SubWindow = window.open(url, 'preview', newWinOpt);

}

function getCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}

function closePreviewWindow() {
  if (cmn380SubWindow != null) {
    cmn380SubWindow.close();
  }
}

function existPreviewWindow() {
  if (cmn380SubWindow != undefined) {
    return !cmn380SubWindow.closed;
  }
  return false;
}

$(function () {

  const onunload = document.getElementsByTagName('body').onunload;
  if (!onunload
    || onunload.includes('closePreviewWindow()')) {

    if ($(window).on) {
      $(window).on("beforeunload", function () {
        closePreviewWindow();
      });
    } else if ($(window).live) {
      $(window).unload(function () {
        closePreviewWindow();
      });
    }
  }
});


// ファイルプレビュー用WEBコンポーネントを定義
class FilePreview extends HTMLElement {
  constructor() {
    super();
    this.url = '';
    this.filename = '';
  }

  // コンポーネントの属性を宣言
  static get observedAttributes() {
    return ['name', 'class', 'style', 'value', 'url', 'filename'];
  }

  // コンポーネントの属性の値変更時のイベント処理
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }

  // 描画前イベント処理
  connectedCallback() {
    const element = this;
    var url = this.url;
    var fileName = this.filename.replaceAll('\'', '\\\'');
    $(function () {
      var aTag = element.getElementsByTagName('a');

      //拡張子の判定
      var index = fileName.lastIndexOf('.');
      var extension = fileName.substring(index + 1);
      var extensionList = ['png', 'jpg', 'jpeg', 'pdf', 'gif', 'txt', 'js', 'css', 'html'];

      if (extensionList.includes(extension.toLowerCase())) {

        //rsv090のように、添付領域内の拡張時に、再実行されないように
        //既にプレビューアイコンがある場合はアイコンを追加しない。
        if (!$(element).find('.js_preview_img').length) {
          var previewIcon = document.createElement('span');
          previewIcon.setAttribute('class', 'ml5 cursor_p js_preview_img');
          previewIcon.setAttribute('onclick', 'openPreviewWindow(\'' + url + '\', \'' + fileName + '\'' + ')');
          previewIcon.innerHTML =
            '<img class="btn_classicImg-display"'
            + ' src="../common/images/classic/icon_preview.png" alt="プレビュー"/>'
            + '<img class="btn_originalImg-display"'
            + ' src="../common/images/original/icon_preview.png" alt="プレビュー">';

          //shadow.after(previewIcon);  // <-- Shadow Domにする場合
          aTag[0].after(previewIcon); // <-- Shadow Domにしない場合
        }
      }
    });
  }
}

//コンポーネントタグを定義
customElements.define('file-preview', FilePreview);