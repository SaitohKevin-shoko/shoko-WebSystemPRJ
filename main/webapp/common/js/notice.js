

// プッシュ通知の表示
function noticePush(
  dspTitle,
  dspBody,
  url,
  dspTime,
  usrImg,
  cmn400Flg
  ) {
if ("Notification" in window) {
  var userAgent = window.navigator.userAgent.toLowerCase();
  //safariかつ通知許可がされていない場合、手動で通知時以外はブラウザ通知をしない
  if (!cmn400Flg && !Push.Permission.has() && userAgent.indexOf('safari') != -1 && userAgent.indexOf('chrome') == -1) {
    return false;
  }
  
  //同一ユーザの同時ログイン時のエラー回避
  if (dspTitle == null) {
    return false;
  }

  Push.Permission.request(function() {
    //通知の送信
    var title =  dspTitle;
    var body = dspBody;
    var toMove = location.href.split("?")[0] + url;
    if (body.length > 1000) {
      body = body.substring(0, 1000);
    }
    Push.create(title, {
      body: body,
      timeout: dspTime * 1000, // 通知が消えるタイミング
      vibrate: [100, 100, 100], // モバイル端末でのバイブレーション秒数
      icon : usrImg,
      onClick: function() {
        // 通知がクリックされた場合の動作
        // ↓その他実装すべきこと↓
        // ・通知に表示されたメッセージの送信者とのトーク画面へ遷移
        //   →どうやって汎用的にするか
        // ・DBから取得したデータを正しく表示
        if (url != null) {
          var formData;
          formData = document.createElement('form');
          formData.action = toMove;
          formData.method = "post";
          if (document.body.innerHTML != undefined) {
            document.body.appendChild(formData);
          } else {
            document.documentElement.appendChild(formData);
          }
          formData.submit();
          this.close();
        }
      }
    });
  }, function() {
    //ブラウザ通知拒否時
    return false;
  });
}
}
