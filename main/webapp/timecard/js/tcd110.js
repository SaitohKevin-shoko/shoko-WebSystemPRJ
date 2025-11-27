function changeOutputType() {
    if ($('input[name=tcd110OutputFileType]:checked').val() == 1) {
        $('.js_outputBtnExcel').hide();
        $('.js_outputBtnPdf').show();
    } else {
        $('.js_outputBtnExcel').show();
        $('.js_outputBtnPdf').hide();
    }
}

$(function() {
    changeOutputType();
});
