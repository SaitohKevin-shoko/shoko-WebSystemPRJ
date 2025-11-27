/**
 * ページロード時の初期処理
 * @param kbn アンケート対象者区分
 */
function enq910Init(kbn) {
    changeTaisyoKbn(kbn);
}

/**
 * アンケート対象者区分変更時のイベント
 * @param kbn アンケート対象者区分
 */
function changeTaisyoKbn(kbn) {

    if (kbn == 0) {
        document.getElementById('taisyoArea').style.display = '';
    } else {
        document.getElementById('taisyoArea').style.display = 'none';
    }

}
