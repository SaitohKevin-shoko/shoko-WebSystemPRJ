function selectchage() {
    if($('#selectbox').val() <10){
        $('#canAnswer').show();
    } else {
        $('#canAnswer').hide();
    }
}

function check() {
    $("#enq810CanAnswer:checked").val()
}
/**
 * メイン表示変更時のイベント
 * @param kbn 表示区分
 */
function changeMainDspKbn(kbn) {

  var element = document.getElementsByClassName('js_dspMainDetail');

  for (var i = 0; i < element.length; i++) {
      if (kbn == 1) {
          element[i].style.display = '';
      } else {
          element[i].style.display = 'none';
      }
  }
}
$(function(){
    if($('#selectbox').val() <10){
        $('#canAnswer').show();
    } else {
        $('#canAnswer').hide();
    }

    changeMainDspKbn($('input[name="enq810MainDsp"]:checked').val());

});


