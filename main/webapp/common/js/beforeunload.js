var beforeUnloadManager = {
    isOpenEditor : false,
    isTemporary : false,
    /**
     * 画面遷移時に警告を行うイベントリスナー関数
     * アラートに表示するメッセージを変更する
     * ieとEdge以外はブラウザの仕様で現在はメッセージの変更はできない
     * @returns {}
     */
    unload : function (e) {
            var mes = "遷移してOK?";
            e.returnValue = mes;
    },
    /**
     * beforUnloadイベントリスナーのONにする
     * @returns {}
     */
    on : function() {
        if (!this.isOpenEditor) {
            window.addEventListener('beforeunload', this.unload, false);
            this.isOpenEditor = true;
        }
    },
    /**
     * beforUnloadイベントリスナーのOFFにする
     * 進行形操作(OKボタン/追加系ボタン/...etc)のイベント発火前に実行する
     * @returns {}
     */
    off : function() {
        if (this.isOpenEditor) {
            window.removeEventListener('beforeunload', this.unload, false);
            this.isOpenEditor = false;
        }
    }
}
$(function() {
    //初期状態 : 有効
    beforeUnloadManager.on();
});