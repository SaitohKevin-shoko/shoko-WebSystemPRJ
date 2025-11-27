/**
 * ページロード時の初期処理
 * @param kbn 回覧板送信対象区分
 */
function cir220Init(kbn) {
    changeTaisyoKbn(kbn);
}

/**
 * 回覧板送信対象者区分変更時のイベント
 * @param kbn 回覧板送信対象者区分
 */
function changeTaisyoKbn(kbn) {

    if (kbn == 1) {
        document.getElementById('taisyoArea').style.display = '';
    } else {
        document.getElementById('taisyoArea').style.display = 'none';
    }

}
