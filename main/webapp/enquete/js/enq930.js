/**
 * ページロード時の初期処理
 * @param kbn 表示区分
 */
function enq930Init(kbn, settingKbn, mainDspKbn) {
    changeDspKbn(kbn);
    changeMainDspKbn(settingKbn);
    changeMainFlg(mainDspKbn);
}

/**
 * 表示区分変更時のイベント
 * @param kbn 表示区分
 */
function changeDspKbn(kbn) {

    if (kbn == 0) {
        document.getElementsByClassName('dspArea')[0].style.display = '';
    } else {
        document.getElementsByClassName('dspArea')[0].style.display = 'none';
    }
}

function selectchage() {
	if($('#selectbox').val() <10){
        $('#canAnswer').show();
    } else {
        $('#canAnswer').hide();
    }
}

function check() {
	  $("#enq930CanAnswer:checked").val()
}

$(function(){
	if($('#selectbox').val() <10){
        $('#canAnswer').show();
    } else {
        $('#canAnswer').hide();
    }
});

/**
 * メイン表示区分変更時のイベント
 * @param kbn 表示区分
 */
function changeMainDspKbn(kbn) {

    if (kbn == 0) {
        document.getElementsByClassName('js_mainDspArea')[0].style.display = '';
    } else {
        document.getElementsByClassName('js_mainDspArea')[0].style.display = 'none';
    }

}

/**
 * メイン表示フラグ変更時のイベント
 * @param kbn 表示区分
 */
function changeMainFlg(kbn) {

  var element = document.getElementsByClassName('js_dspMainDetail');

  for (var i = 0; i < element.length; i++) {
      if (kbn == 1) {
          element[i].style.display = '';
      } else {
          element[i].style.display = 'none';
      }
  }
}
