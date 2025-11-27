function dspChangeSelect() {
    if ($('input[name=cht120Push]:checked').val() == 1) {
     $(js_dspTime).show();
    } else {
     $(js_dspTime).hide();
    }
}

$(function(){
	dspChangeSelect();
});