/**
 * HTMLエスケープするJavaScript
 */
function htmlEscape(htmlText) {
    return $('<span></span>').text(htmlText).html().replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}