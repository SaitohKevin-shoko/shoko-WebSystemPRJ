var webSocket;

$(function() {
  // ページを離れる前にWebScoketを切断
  window.onbeforeunload = function(){
    if (webSocket) {
      webSocket.close();
    }
  }
});

// WebSocket起動
function websocket(pluginUrl) {
    webSocketCommunicate(pluginUrl, false, false);

    // 3分毎にポーリング処理を行い、WebSocket接続が切れていた場合再接続する
    var POLLLING_INVERVAL_TIME_IN_MILLIS = 180000;
    (function polling() {
      if (!webSocket) {
      webSocketCommunicate(pluginUrl, true, false);
    }
      window.setTimeout(polling, POLLLING_INVERVAL_TIME_IN_MILLIS);
    }());
}

// WebSocket通信
function webSocketCommunicate(pluginUrl, reConnect, force) {
    // ハンドシェイク
    var forRtoA = document.createElement('a');
    var pluginId = pluginUrl.split("/")[1];
    var url = window.location.href;
    if (url.indexOf('?') > 0) {
      url = url.substring(0, url.indexOf('?'));
    }
    url = url.substring(0, url.lastIndexOf('/'));
    url = url.substring(0, url.lastIndexOf('/'));
    if (force) {
      forRtoA.href = url + "/common/connection?" + pluginId + "&forciblyClose";
    } else {
      forRtoA.href = url + "/common/connection?" + pluginId + "&notClose";
    }
    webSocket = new WebSocket(forRtoA.href.replace("http://", "ws://").replace("https://", "wss://"));
    // ハンドシェイク成功後に実行
    webSocket.onopen = function(data) {
      // 再接続の後は、チャット一覧画面に表示されているエラーメッセージを除去
      if (reConnect) {
        if (typeof window.frames['body'].dspError == 'function') {
          window.frames['body'].dspError("");
        }
      }
    }
    // 通信終了後に実行
    webSocket.onclose = function(event) {
      webSocket = null;
      if (event.code == 1009) {
        var errorMsg = "";
          errorMsg = "メッセージの送信に失敗しました。<br>"
          + "自身とチャット相手それぞれが再接続を行うと表示されます。";
          window.frames['body'].dspError(errorMsg);
          window.frames['body'].dspError(errorMsg);
      }
      if (typeof window.frames['body'].dspError == 'function') {
        // メイン画面からチャット一覧画面へ遷移した場合は再接続
        if (event.code == 4000 && event.reason.substr(0,8) == "fromMain") {
          window.frames['body'].dspError("");
          var clietnSid = event.reason.split("&")[1];
          var pluginUrl = event.reason.split("&")[2];
          webSocketCommunicate(pluginUrl, false, false);
        }
      }
    }
    // メッセージ受信後に実行
    webSocket.onmessage = function(message) {
      var data = JSON.parse(message.data);

      // 別タブまたは別ブラウザでチャット画面を開いた時、接続が拒否された旨のメッセージを表示
      if (data["type"] == "openedOtherWindow") {
        if (typeof window.frames['body'].dspError == 'function') {
          window.frames['body'].dspError(data["msgContent"]);
          return;
        }
      }

      pushMessageFromWSMessage(data);

      if (data['plugin'] == 'chat') {

          // チャットメッセージ受信時
          if (data["type"] == "message") {
            receivedMessage(data);
            // Cht010を開いている時のみチャットグループ情報を画面に追加
          }  else if (data["type"] == "chatGroup") {
            receivedChatGroup(data);
          }
      }

    }
    // エラー処理後に実行
    webSocket.onerror = function(event) {
      if (typeof window.frames['body'].dspError == 'function') {
        var errorMsg = "エラーが発生しました。リアルタイム通信を行うことができません。";
        setTimeout(window.frames['body'].dspError, 1000, errorMsg);
      }
    }
}


// リアルタイム通信 メッセージ受信時の処理
function receivedMessage(data) {
    // 新規にメッセージを受信
    if (data["success"] && data["command"] == "add") {
      // Cht010を開いている場合のみ受信したメッセージを画面に表示
      if (typeof window.frames['body'].appendMessage == 'function') {
          window.frames['body'].appendMessage(data);
      }
  // 編集されたメッセージを受信
  } else if (data["success"] && data["command"] == "edit") {
    // Cht010を開いている場合のみ編集されたメッセージを書き換え
    if (typeof window.frames['body'].editMessage == 'function') {
      window.frames['body'].editMessage(data);
    }
  // 編集されたメッセージを受信
  } else if (data["success"] && data["command"] == "reaction") {
    // Cht010を開いている場合のみ編集されたメッセージを書き換え
    if (typeof window.frames['body'].editReaction == 'function') {
      window.frames['body'].editReaction(data);
    }
  // 削除されたメッセージの除去
  } else if (data["success"] && data["command"] == "delete") {
    // Cht010を開いている場合のみ削除されたメッセージを画面から除去
    if (typeof window.frames['body'].deleteMessage == 'function') {
      window.frames['body'].deleteMessage(data);
    }
  // 「既読」の表示
  } else if (data["success"] && data["command"] == "kidoku") {
    if (typeof window.frames['body'].dspKidoku == 'function') {
        window.frames['body'].dspKidoku(data);
      }
  } else {
      if (typeof window.frames['body'].dspError == 'function') {
        var errorMsg = "";
          errorMsg="メッセージの受信に失敗しました。";
          window.frames['body'].dspError(errorMsg);
        }
    }
}

// リアルタイム通信 チャットグループ表示更新処理
function receivedChatGroup(data) {
    if (typeof window.frames['body'].appendMessage == 'function') {
        // 新規登録
        if (data["chatGroupProcMode"] == 0) {
            window.frames['body'].addNewGroup(
                    data["chatGroupSid"],
                    data["chatGroupName"]);
            // 編集
        } else if (data["chatGroupProcMode"] == 1) {
            // メンバーユーザ
            if (!data["remove"]) {
                window.frames['body'].updateGroup(
                        data["chatGroupSid"],
                        data["chatGroupName"],
                        data["chatGroupArchiveFlg"],
                        data["messageCount"],
                        data["messageLastDate"]);
                // メンバーから外されたユーザ、またはグループ削除時
            } else {
                window.frames['body'].removeGroup(data["chatGroupSid"]);
            }
        }
    }
}



 // 添付ファイルの送信
function sendTempMessage(senderSid, selectSid, selectKbn, messageSid) {
    if (!webSocket) {
        if (typeof window.frames['body'].dspError == 'function') {
            var errorMsg = "";
            errorMsg = "メッセージの表示に失敗しました。<br>"
                + "再接続を行うと送信したメッセージが表示されます。";
            window.frames['body'].dspError(errorMsg);
        }
    }
}

 // プッシュ通知使用可能か判定
 function isCanUsePush() {
   var useFlg = true;
   var scheme = document.location.protocol;
   if (scheme == "http:") {
     useFlg = false;
   }

   var userAgent = window.navigator.userAgent.toLowerCase();
   if (userAgent.indexOf('edge') == -1
       && userAgent.indexOf('chrome') == -1
       && userAgent.indexOf('firefox') == -1
       && userAgent.indexOf('safari') == -1) {
     useFlg = false;
   }

   return useFlg;
 }

 // 別ウィンドウで同一ユーザがWebSocket接続している場合のエラーメッセージを表示
 function reConnect(clientSid, pluginUrl) {
   if (webSocket) {
     webSocket.close(4000,"fromMain&" + clientSid + "&" + pluginUrl);
   } else if (typeof window.frames['body'].dspError == 'function') {
       webSocketCommunicate(pluginUrl, false, false);
   }
 }

 // WebSocket接続確認
 function checkConnection() {
   if (webSocket) {
     return true;
   } else {
     return false;
   }
 }

 // WebSocket接続確認
 function closeConnect() {
   webSocket.close();
 }

function replaceForJSON(str) {
  if (str != null) {
    str = str.replace(/\\/g,'\\\\');
    str = str.replace(/"/g,'\\"');
    str = str.replace(/\r/g, '\\r');
    str = str.replace(/\n/g, '\\n');
  }

  return str;
}

function replaceForDsp(str) {
  if (str != null) {
    str = str.replace(/\r?\n/g, '<br>');
  }
  return str;
}

function replaceHtmlTag(s) {
  if (s != null) {
    s = s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/</g,"&lt;").replace(/>/g,"&gt;") ;
  }
    return s;
}

function makeToastNotice(title, body, url, image) {
  var toast = $("#bodyFrame").contents().find("#toastNotice");
  //不要な画像の削除
  toast.find(".js_toastBody > img").remove();
  //画像，タイトル，本文の設定
  toast.find(".js_toastImage img").attr("src", image);
  toast.find(".js_toastTitle").text(title);
  body = replaceHtmlTag(body);
  body = replaceForDsp(body);
  toast.find(".js_toastContent").html(body);
  
  //トースト通知押下時の遷移先を設定
  if (url != null) {
    var toMove = location.href.split("?")[0] + url;
    toast.find(".js_toastForm").prop("action", toMove);
    toast.attr("onclick", "window.top.location.href='" + toMove + "'");
  }
}

/** websocketで受信したメッセージからプッシュ通知を生成 */
function pushMessageFromWSMessage(data) {
  //対象プラグイン毎に処理を切り替え
  var sendFlg = true;
  if (data['plugin'] =='chat') {
    //新規追加時のみ通知
    if (!data["success"] || data["command"] != "add"
      || data["pushFlg"] == false || data["muteKbn"] == 1 || data["dspFlg"] == 0
      || data["senderSid"] == data["ownUserSid"]) {
      return false;
    }

    var content = '';    
    const messageInfo = data["messageList"][0];
    content += messageInfo.messageText;
    
    if (content.length > 0) {
      //htmlエスケープを除去
      content = content.replace(/<BR>/g, '\r\n');
      content = $('<span>'+content+'</span>').text();
      content += '\r\n';
    }

    var binList = messageInfo["binMdlList"];
    if (binList != null) {
      binList.forEach(function(binMdl) {
        content += binMdl["binFileName"] + '\r\n';
      });
    }

    var mentionUsrList = messageInfo["mentionUserInfo"];
    var mentionText = "";
    if (mentionUsrList != null && mentionUsrList.length > 0) {
      mentionUsrList.forEach(function(usrMdl) {
        if (mentionText.length != 0) {
          mentionText += "、"
        }
        if (usrMdl.usrSid == -1) {
          mentionText += `@${msglist_cmn002["cht.cht010.80"]}`;
        } else {
          mentionText += `@${usrMdl.usiName}`;  
        }
      });
      //htmlエスケープを除去
      mentionText = $('<span>'+mentionText+'</span>').text();
      if (mentionText.length > 19) {
        mentionText = mentionText.substring(0, 20) + "…";
      }
      mentionText += "\r\n"
    }

    var title;
    var body;
    var image;
    var dspTime;
    var url;

    // タイトル：送信者名
    title = $('<span>'+messageInfo["usrName"]+'</span>').text();
    // 内容：送信メッセージ
    body = mentionText;
    if (messageInfo["stampBinSid"] > 0
          || messageInfo["stampDefaultId"] > 0) {
      body += "スタンプ";
    } else {
      body += content;
    }
    // 画像：ユーザ画像
    image = "../common/images/original/photo.png"
    if(messageInfo["usrPictKf"] == 0 &&  messageInfo["usrBinSid"] > 0) {
      image = "../common/cmn100.do?CMD=getImageFile&cmn100binSid=" + messageInfo["usrBinSid"];
    }
    
    // 通知表示時間：個人設定により決定
    dspTime = data["dspTime"];
    // URL：プッシュ通知クリック時の遷移先プラグイン
    //    ：パラメータを指定
    url = "?url=../chat/cht010.do";
    var selectPartner = -1;
    var selectKbn =  data["selectKbn"];
    if(selectKbn == 1) {
      selectPartner = data["senderSid"]
    } else {
      selectPartner = messageInfo["selectSid"]
    }
    var menuPage = window.frames['menu'].document.forms[0].menuPage.value;
    var paramStr ="?CMD=pushDsp" + "&cht010SelectPartner=" + selectPartner + "&cht010SelectKbn=" + selectKbn + "&menuPage=" + menuPage;
    url =  url + encodeURIComponent(paramStr);
  }

  //スケジュール
  if (data['plugin'] =='schedule') {
     // タイトル：送信者名
     title = $('<span>'+data['title']+'</span>').text();
     // 内容：送信メッセージ
     var content = data['content'];
     //htmlエスケープを除去
     if (content) {
        content = content.replace(/<BR>/g, '\r\n');
        content = $('<span>'+content+'</span>').text();
     }
     body = content;
     dspTime = 5;
     // URL：プッシュ通知クリック時の遷移先プラグイン
     //    ：パラメータを指定
     url = "?url=";
     url = url + encodeURIComponent(data['url']);
     image = data["image"];
  }

  if (!isCanUsePush()) {
    //Firefoxで画面描画時に空のトーストが表示されないよう変更
    if (title == null) {
      return false;
    }
    makeToastNotice(title, body, url, image);
    document.getElementById("bodyFrame").contentWindow.displayToast3(dspTime);
  } else {
    noticePush(title, body, url, dspTime, image, false);
  }
}

