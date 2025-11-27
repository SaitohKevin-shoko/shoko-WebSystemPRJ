var memoWindow;
var agent = window.navigator.userAgent.toLowerCase();
var detailWidth = 356;
var detailHeight = 580;
//ブラウザにSafariを使用しているかを示すフラグ
var safariFlg = false;
//ブラウザにInternet Explorerを使用しているかを示すフラグ
var ieFlg = (agent.indexOf('msie') != -1 || agent.indexOf('trident') != -1);

//ブラウザの種類によるイベントの設定
if (agent.indexOf("safari") != -1 && agent.indexOf("chrome") == -1 && agent.indexOf("edge") == -1 && agent.indexOf("crios") == -1){
    safariFlg = true;
    if (agent.indexOf("mobile") != -1) {
        window.addEventListener("pagehide", function() {
            closeMemoWindow();
        });
    } else {
        window.addEventListener("beforeunload", function() {
            closeMemoWindow();
        });
    }
} else {
    if (agent.indexOf("mobile") != -1) {
        window.addEventListener("pagehide", function() {
            closeMemoWindow();
        });
    } else {
        window.addEventListener("unload", function() {
            closeMemoWindow();
        });
    }
}

//メールヘッダ情報をポップアップで表示
function openMemoWindow() {
    if (safariFlg) {
        openMemoSafari();
    } else if(ieFlg) {
        openMemoIe();
    } else {
        openMemo();
    }
}

//Safariにてメモウィンドウを開く処理
function openMemoSafari() {
    deleteOpenFlag();
    if (memoWindow == null) {
        if (localStorage.getItem("openMemoFlag") != 1) {
            var url = '../memo/mem010.do';
            memoWindow = window.open(url, 'memoWindow',
                             'width=' + detailWidth //縦幅
                             + ',height=' + detailHeight //横幅
                             + ',titlebar=no,toolbar=no,scrollbars=yes' //タイトル部分なし、スクロール有
                             + ', left=100' //別ウィンドウの表示位置(左からの位置)
                             + ', top=150' //別ウィンドウの表示位置(上からの位置)
                         );
        }
    } else {
        memoWindow.focus();
    }
}

//ieにてメモウィンドウを開く処理
function openMemoIe() {

    var url = '../memo/mem010.do';
    if (memoWindow == null || memoWindow == undefined || localStorage.getItem("openMemoFlag") == null) {
        try {
            var url = '../memo/mem010.do';
            memoWindow = window.open(url, 'memoWindow',
                                 'width=' + detailWidth //縦幅
                               + ',height=' + detailHeight //横幅
                               + ',titlebar=no,toolbar=no,scrollbars=yes' //タイトル部分なし、スクロール有
                               + ', left=100' //別ウィンドウの表示位置(左からの位置)
                               + ', top=150' //別ウィンドウの表示位置(上からの位置)
                               + ', resizable=yes'//IEでウィンドウサイズ変更可
                             );
        } catch (e) {}
    }
    memoWindow.focus();
}

//Safari・IE以外でメモウィンドウを開く処理
function openMemo() {
    if (memoWindow == null) {
        try {
            var url = '../memo/mem010.do';
            memoWindow = window.open(url, 'memoWindow',
                                 'width=' + detailWidth //縦幅
                               + ',height=' + detailHeight //横幅
                               + ',titlebar=no,toolbar=no,scrollbars=yes' //タイトル部分なし、スクロール有
                               + ', left=100' //別ウィンドウの表示位置(左からの位置)
                               + ', top=150' //別ウィンドウの表示位置(上からの位置)
                               + ', resizable=yes'//IEでウィンドウサイズ変更可
                             );
        } catch (e) {}
    }
    memoWindow.focus();
}

//memoWindowの削除
function deleteMemoWindow() {
    memoWindow = null;
}

//memoWindowを閉じる
function closeMemoWindow() {
    var doCloseFlg = true;
    if (ieFlg) {
        doCloseFlg = localStorage.getItem("openMemoFlag") != null;
    }

    if ($("#windowCloseFlag").val() != 1 && doCloseFlg) {
        memoWindow = window.open('', 'memoWindow');//メモwindowを空画面で上書き
        if (memoWindow != null) {
            memoWindow.close();
        }
        if (safariFlg || ieFlg) {
            localStorage.removeItem("openMemoFlag");
        }
    }
}

//時間経過により、メモを開いていることを示すフラグを削除する
function deleteOpenFlag() {
    if (localStorage.getItem("openTime") == null) {
        var openTime = new Date().getTime() / 1000;
        localStorage.setItem("openTime", openTime);
        localStorage.removeItem("openMemoFlag");
    } else {
        var lastTime = localStorage.getItem("openTime");
        var openTime = new Date().getTime() / 1000;
        var difference = (openTime - lastTime);
        if (difference >= 3600) {
            localStorage.setItem("openTime", openTime);
            localStorage.removeItem("openMemoFlag");
        }
    }
}

//プラグインアイコンクリックでメモウィンドウが閉じるのを回避する
$(function() {
    $(".js_menu_btn").on("click", function(){
        $("#windowCloseFlag").val(1);
    });
});
