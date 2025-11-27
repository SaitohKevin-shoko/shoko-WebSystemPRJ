function initTinymce() {
  //言語対応
  // var lang = 'en_US';
  var lang = 'ja';

  var font  = "Andale Mono=Andale Mono, andale mono, monospace;Arial=Arial, arial, helvetica, sans-serif;Arial Black=Arial Black, arial black, sans-serif;";
  font += "Book Antiqua=Book Antiqua, book antiqua, palatino, serif;Comic Sans MS=Comic Sans MS, comic sans ms, sans-serif;";
  font += "Courier New=Courier New, courier new, courier, monospace;Georgia=Georgia, georgia, palatino, serif;Helvetica=Helvetica, helvetica, arial, sans-serif;";
  font += "Impact=Impact, impact, sans-serif;Σψµβολ=Σψµβολ, symbol;Tahoma=Tahoma, tahoma, arial, helvetica, sans-serif;Terminal=terminal, monaco, monospace;";
  font += "Times New Roman=Times New Roman, times new roman, times, serif;Trebuchet MS=Trebuchet MS, trebuchet ms, geneva, sans-serif;";
  font += "Verdana=Verdana, verdana, geneva, sans-serif;Webdings=Webdings, webdings;Wingdings=Wingdings,wingdings, zapf dingbats;";
  font += "メイリオ=メイリオ, Meiryo;明朝=ＭＳ Ｐ明朝,MS PMincho,ヒラギノ明朝 Pro W3,Hiragino Mincho Pro,serif;";
  font += "ゴシック=ＭＳ Ｐゴシック,MS PGothic,ヒラギノ角ゴ Pro W3,Hiragino Kaku Gothic Pro,sans-serif";
  var fontSize = "8pt 10pt デフォルト=11pt 12pt 14pt 18pt 24pt 36pt";

  tinymce.init({
    selector: '#inputstr_tinymce',
    plugins: [
      'advlist autolink link image lists charmap hr anchor pagebreak spellchecker',
      'searchreplace visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      'save table contextmenu directionality template paste textcolor preview colorpicker'
    ],
    menubar: false,
    toolbar1: 'undo redo | visualblocks | styleselect fontsizeselect fontselect bold italic strikethrough forecolor backcolor',
    toolbar2: 'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent table | link image media preview code fullpage addbodyfile',
    language: lang,
    content_style: 'p {font-size: 11pt; font-family: "メイリオ";}',
    font_formats: font,
    fontsize_formats: fontSize,
    height : 400,
    resize: 'both',
    entity_encoding : "raw",
    deprecation_warnings: false,
    dragDropUpload: false,
    paste_filter_drop: false,
    setup: function (editor) {
      setupTinymce(editor);
    },
    init_instance_callback: (editor) => {
      editor.contentDocument.addEventListener("dragover", function(e) {
        if ('attachmentOverlayShow' in window) {
          if (!isDisplayAttachmentOverlay()) {
            attachmentOverlayShow(e);
          }
        }
      })
    }
  });
}

function addElementBody(type, src){
  tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), type, {src : src});
}

function formatBodyText(txtVal) {
  var lines;
  if (txtVal.indexOf('\n') < 0) {
      lines = [txtVal];
  } else {
      lines = txtVal.split('\n');
  }

  var formatTxt = '';
  for (idx = 0; idx < lines.length; idx++) {
    if (idx >= 1) {
        formatTxt += '\n';
    }
    formatTxt += $('<div/>').html(lines[idx]).text();
  }
  return formatTxt;
}