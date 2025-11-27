/**
 * 自動保存するJavaScript
 */
var autoSaveTimer;
var autoSaveFlg = false;

function startAutoSave(limit) {
    if (limit != 0) {
        var millisecond = limit * 60000;
        autoSaveTimer = window.setInterval(function(){
            eventStart()}, millisecond);
    }
}

function stopAutoSave() {
    clearInterval(autoSaveTimer);
}

function eventStart() {
    //グローバル変数を現在のformを比較する
    var result = compareForm();
    if (result) {
        autoSaveFlg = true;
        //草稿へ保存する
        motionMethod(eventFinish);
    }
}

function eventFinish() {
    autoSaveFlg = false;
}