$(function() {
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
      selector: '#enqDescArea',
      plugins: [
        'advlist autolink link image lists charmap hr anchor pagebreak spellchecker',
        'searchreplace visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'save table contextmenu directionality template paste textcolor preview colorpicker fullpage'
      ],
      menubar: false,
      toolbar1: 'undo redo | visualblocks | styleselect fontsizeselect fontselect bold italic strikethrough forecolor backcolor',
      toolbar2: 'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent table | link image media preview code addbodyfile',
      language: lang,
      content_style: 'p {font-size: 11pt; font-family: "メイリオ";}',
      font_formats: font,
      fontsize_formats: fontSize,
      width:"100%",
      resize: 'both',
      deprecation_warnings: false,
      dragDropUpload: false,
      paste_filter_drop: false,
      height:document.getElementsByName('enqEditorSize')[0].value + "px",
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
});



function setFormatDesc(descParam, formatParam) {
   document.getElementsByName(formatParam)[0].value
     = formatDesc(document.getElementsByName(descParam)[0].value, false);
}

function formatDesc(txtVal, type) {
  var lines;
  if (txtVal.indexOf('\n') < 0) {
      lines = [txtVal];
  } else {
      lines = txtVal.split('\n');
  }

  var formatTxt = '';
  for (idx = 0; idx < lines.length; idx++) {
    if (idx >= 1) {
        if (type) {
            formatTxt += '<br />';
        } else {
            formatTxt += '\n';
        }
    }
    if (type) {
        formatTxt += $('<div/>').text(lines[idx]).html();
    } else {
        formatTxt += $('<div/>').html(lines[idx]).text();
    }
  }

  return formatTxt;
}

function setupTinymce(editor) {

  editor.ui.registry.addButton('addbodyfile', {
    text: msglist["cmn.insert.content"],
    onAction: function () {
      attachmentLoadFile('2');
    }
  });
}

function addElementBody(type, src){
  tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), type, {src : src});
}

function getTinymceContentsSrc(tempSaveName) {
  return 'enq210.do?CMD=getBodyFile&enq210TempSaveId=' + tempSaveName;
}
