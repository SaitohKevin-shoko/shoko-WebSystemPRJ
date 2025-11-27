

function clickMenuGs(menuUrl) {
    document.forms.cmn002Form.url.value = menuUrl;
    document.forms.cmn002Form.submit();
    return false;
}
// ヘルプ
function help(){

    if (!parent.body.document.getElementById("help_url")) {
        alert(msglist_cmn003['cmn.cmn003.5']);
        return;
    }
    var urlStr = parent.body.document.getElementById("help_url").value;

    helpPrm = parent.body.document.getElementsByName("helpPrm");
    if (helpPrm.length > 0) {
      for (i = 0; i < helpPrm.length; i++) {
        urlStr = urlStr + helpPrm[i].value;
      }
    }
    window.open(urlStr, 'help', '');
    return false;
}

//ターゲットはフレーム内（開かない）
function clickMenuTarFrame(pluginId, paramKbn, sendKbn) {

    //URL、パラメータ情報を取得する
    $.ajax({
        async: true,
        url:"../common/cmn003.do",
        type: "post",
        data: {
            CMD: "getClickUrl",
            pid: pluginId}
    }).done(function( data ) {
        if (data != null || data != "") {

            //POST形式の場合かつパラメータ設定するの場合
            if (sendKbn == 0 && paramKbn != 0) {

                var formName = 'fname' + pluginId;

                var form = $('<form/>', {action: data.url, method: 'post', target:'body', name:formName});

                if (data.paramList != null && data.paramList.length > 0) {
                    for (row=0; row<data.paramList.length; row++) {
                        var paramName = data.paramList[row].cppName;
                        var paramValue = data.paramList[row].cppValue;
                        form.append($('<input/>',{type:'hidden',name:paramName ,value:paramValue}));
                    }
                }


                //body内にformを追加(IE対応)
                $('body').append(form);
                //サブミット
                form.submit();
                //formの削除（jsp内の既存のformは削除されない）
                form.remove();


            } else {
                //パラメータセットしない場合、又は、パラメータセットする且つGET形式の場合
                //パラメータセットしない場合は現仕様通りGETで行う
                document.forms.cmn002Form.url.value = data.url;
                document.forms.cmn002Form.submit();
                return false;
            }
        }
    }).fail(function(data){
        //JSONデータ失敗時の処理
    });

    return false;
}

//ターゲットはウィンドウ （開く）
function clickMenuTarWindow(pluginId, paramKbn, sendKbn) {

    //URL、パラメータ情報を取得する
    $.ajax({
        async: true,
        url:"../common/cmn003.do",
        type: "post",
        data: {
            CMD: "getClickUrl",
            pid: pluginId}
    }).done(function( data ) {
        if (data != null || data != "") {

            //POST形式の場合かつパラメータ設定するの場合
            if (sendKbn == 0 && paramKbn != 0) {

                var formName = 'fname' + pluginId;

                var form = $('<form/>', {action: data.url, method: 'post', target:pluginId, name:formName});

                if (data.paramList != null && data.paramList.length > 0) {
                    for (row=0; row<data.paramList.length; row++) {
                        var paramName = data.paramList[row].cppName;
                        var paramValue = data.paramList[row].cppValue;
                        form.append($('<input/>',{type:'hidden',name:paramName ,value:paramValue}));
                    }
                }


                //body内にformを追加(IE対応)
                $('body').append(form);

                //サブミット
                form.submit();
                //formの削除（jsp内の既存のformは削除されない）
                form.remove();

            } else {
                //パラメータセットしない場合、又は、パラメータセットする且つGET形式の場合
                //パラメータセットしない場合は現仕様通りGETで行う
                window.open(data.url);
            }
        }
    }).fail(function(data){
        //JSONデータ失敗時の処理
    });
}

function clickMenu(menuUrl) {
  document.forms.cmn002Form.url.value = menuUrl;
  document.forms.cmn002Form.submit();
  return false;
}

function changePage(page) {
  parent.menu.location.href='../common/cmn003.do?menuPage=' + page;
}

$(function() {

    var animate = false;
    var menuLock = 'true';
    var menuOpen = true;
    var hover = false;
    var menuOpenWait = false;
    //メニュー開閉アニメーション時間
    var menuOpenDuration = 100;
    //メニューホバーイベント待ち時間
    var menuHoverEvDuration = 100;

    function __changeMenuHeight(height) {

        var innerHeight = __valueToHeight();
        if (height != undefined) {
          innerHeight = height;
        }

        var origin = location.protocol + '//' + location.host;
        var parentW = window.parent;
        var parentOrigin = parentW.location.protocol + '//' + parentW.location.host;
        if (origin != parentOrigin) {
            return false;
        }

        parentW.changeMenuHeight(innerHeight);


    }
    function __valueToHeight(open) {
        var innerHeight = 0;
        if (open == undefined) {
            open = menuOpen;
        }

        $.each($('body').children(),
                function () {
            if (!open && $(this).is('.js_menu_base')) {
                    return true;
            }

            innerHeight += $(this).outerHeight(true);
            return true;
        });
        return innerHeight;
    }
    /**
     * アニメーション中か確認処理
     *
     */
    var __animateChk = function () {
        return animate;
    }
    /**
     * メニュー切り替え処理
     */
    function __toggleMenu(duration) {

        if (duration == undefined) {
            duration = menuOpenDuration;
        }

        animate = __animateChk();
        if (animate) {
            return;
        }
        if (menuLock == 'true') {
            return;
        }
        menuOpen = !menuOpen;

        animate = true;

        var innerHeight = __valueToHeight();
        var origin = location.protocol + '//' + location.host;
        var parentW = window.parent;
        var parentOrigin = parentW.location.protocol + '//' + parentW.location.host;

        if (origin != parentOrigin) {
            return false;
        }

        if (menuOpen) {
            setTimeout(function() {
                $('.js_menu_lockBtn:not(display_none)').fadeIn(100);
            }, 100);
        }
        if (!menuOpen) {
            $('.js_menu_lockBtn:not(display_none)').fadeOut(100);
        }


        parentW.toggleMenu(innerHeight, duration, function() {
            animate = false;


            if (menuLock != 'true') {

                if((menuOpen && !hover) || ((!menuOpen && hover))) {

                    __toggleMenu(menuOpenDuration);
               }
            }

        });

    }
    //メニューボタン左右パディングを中央によせる調整
    function __menuBtnMvCenter() {
        var sideW = 26;
        var btnW = $('.js_menu_btn').width();
        var scW = $(window).width() - sideW * 2;
        var pad = (scW % btnW) / 2 + sideW;
        $(".js_menu_base").css('padding', '0px ' + pad + 'px');
    }

    function __toggleMenuLock() {
        if (menuLock == 'true') {
            $('.js_menu_lockBtn:not(display_none)').fadeOut(100, function() {
                $('.js_menu_lockBtn-pin').removeClass('display_none');
                $('.js_menu_lockBtn-arrow').addClass('display_none');

                //メニューロック解除によるメニューを閉じるアニメーションでボタンのフェードアウトとバッティングするため
                //ロック解除時はアイコン編今後のフェードインはなし
            });
            menuLock = 'false';
            $('.js_menu_header').addClass('menu_header-unlock');
        } else {
            $('.js_menu_lockBtn:not(display_none)').fadeOut(100, function() {
                $('.js_menu_lockBtn-arrow').removeClass('display_none');
                $('.js_menu_lockBtn-pin').addClass('display_none');
                $('.js_menu_lockBtn:not(display_none)').fadeIn(100);
            });
            menuLock = 'true';
            $('.js_menu_header').removeClass('menu_header-unlock');
        }

        localStorage.setItem("menuLock", menuLock);

    }

    function __menuUnlock(duration) {
        var origin = location.protocol + '//' + location.host;
        var parentW = window.parent;
        var parentOrigin = parentW.location.protocol + '//' + parentW.location.host;
        if (origin != parentOrigin) {
            return false;
        }
        var innerHeight = __valueToHeight(false);
        parentW.menuUnlock(innerHeight, duration);

    }

    function __menuLock(duration)  {
        var origin = location.protocol + '//' + location.host;
        var parentW = window.parent;
        var parentOrigin = parentW.location.protocol + '//' + parentW.location.host;
        if (origin != parentOrigin) {
            return false;
        }
        parentW.menuLock(duration);

    }

    if ($('body.origin').length > 0
          && $(window).on) {

        /* ユーザプラグイン オンマウス時 */
        $(".user_plugin_link").on("mouseenter", function(){
            //ユーザプラグイン オンマウス時href属性の更新を行う。(タイムスタンプ対策)
            var pid = $(this).attr("id");
            setHrefUrl(pid);
        });

        __menuBtnMvCenter();

        $(window).on('resize', function() {

            __menuBtnMvCenter();
            //リサイズイベントは親ウインドウ側のiframeのサイズ変更でも発生する
            if (!__animateChk()) {
                __changeMenuHeight();
            }
        });

        //メニューホバー イベント
        $('body').hover(function() {
            if ($("#menuOpenFlg").val() == 0) {
                if (menuOpen) {
                    hover = true;
                }
                return;
            }
            hover = true;
            if (menuLock == 'true') {
                return;
            }
            if (menuOpenWait) {
                return;
            }
            menuOpenWait = true;

            setTimeout(function () {
                menuOpenWait = false;
                if (!menuOpen && hover) {

                    __toggleMenu(menuOpenDuration);
                }
            }, menuHoverEvDuration);
        },function() {
            hover = false;
            if (menuLock == 'true') {
                return;
            }
            if (menuOpen && $("#menuCloseFlg").val() == 1) {
                __toggleMenu(menuOpenDuration);
            }
            $("#menuOpenFlg").val(1);
        });

        //メニューロック変更ボタン イベント
        $('.js_menu_lockBtn').click(function() {
            __toggleMenuLock();
            if (menuLock != 'true') {
                hover = false;

                __toggleMenu(menuOpenDuration);
                __menuUnlock(menuOpenDuration);
            } else {
                __menuLock(menuOpenDuration);
            }
        });

        //メニューアンロック状態でメニュー上部をクリックするとメニュー閉じる
        $(document).on('click', '.menu_header-unlock', function (e) {
            if (!$(e.target).is('.menu_header-unlock')) {
                return;
            }
            if (!__animateChk()) {
                hover=!hover;
                __toggleMenu(menuOpenDuration);
            }
        });

        //メニューロック状態判定
        if (localStorage.getItem("menuLock") === 'false') {
            __toggleMenuLock();
            __menuUnlock(0);
            __toggleMenu(0);
        } else {
            __menuLock(0);
        }

        //表示時メニュー幅設定
        __changeMenuHeight();

        $(".js_setteiArea").on("mouseenter" ,function () {
          window.parent.setteiHover();
        });

    } else if ($(window).live) {
      /* ユーザプラグイン オンマウス時 */
      $(".user_plugin_link").live("mouseenter", function(){
          //ユーザプラグイン オンマウス時href属性の更新を行う。(タイムスタンプ対策)
          var pid = $(this).attr("id");
          setHrefUrl(pid);
      });
      __changeMenuHeight(90);
      __menuLock(0);

      $(".js_setteiArea").live("mouseenter" ,function () {
        window.parent.setteiHover();
      });
    }
});

function setHrefUrl(pid) {

  $.ajax({
      async: true,
      url:"../common/cmn003.do",
      type: "post",
      data: { CMD: "getHrefUrl", pid: pid }

  }).done(function( data ) {
      if (data != null || data != "") {
          // URLにページ番号を追加(新規ウィンドウで開かない場合のみ)
          var page   = $("input[name='menuPage']").val();
          var target = $('#' + pid).attr("target");
          if (page != null && target != null && target == "_parent") {
              if (data.hrefUrl.indexOf("?") >= 0) {
                  data.hrefUrl += "&menuPage=" + page; // パラメータありの場合「&」で結合
              } else {
                  data.hrefUrl += "?menuPage=" + page; // パラメータなしの場合「?」で結合
              }
          }
          $('#' + pid).attr("href", data.hrefUrl);
      }

  }).fail(function(data){
      //JSONデータ失敗時の処理
  });
}
