function dspChangeUsrUko() {
    //ログイン停止フラグは非表示の場合がある
    if ($(':hidden[name="usr031UsrUkoFlg"]').val() == 1) {
        $("#usr031FormTable").find("td.ukoCheck").addClass("bgC_lightGray");
    }
}

$(function(){
 // ページ読み込み時に実行したい処理
    dspChangeUsrUko();
 });