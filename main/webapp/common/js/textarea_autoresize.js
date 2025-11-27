/***
 * テキストエリアに自動リサイズ機能を追加
 * 使用方法：画面初期化（readyイベント時等）にテキストエリアエレメントを引数にsetTextareaAutoResize関数を呼ぶ
 */
function textareaAutoResize(textArea) {
  var y = window.pageYOffset;
  var baseHeight = textArea.scrollHeight;
    $(textArea).css('height', '');
    if (textArea.scrollHeight + 16 > textArea.offsetHeight) {
        $(textArea).css('height', textArea.scrollHeight + 16 +'px');
    }
  var resizeHeight = textArea.scrollHeight - baseHeight;
    scrollTo(0, y + resizeHeight);
}

function setTextareaAutoResize(textArea) {
    $(textArea).css('overflow', 'hidden');
    function handler(event) {
        textareaAutoResize(event.target);
    }
    $(textArea).bind('keyup', '' ,handler);
    textareaAutoResize(textArea);
}
$(function () {
})
