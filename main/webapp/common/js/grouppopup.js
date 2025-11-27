/********************************************************************
 * グループツリーポップアップ
 */

/**
 * formOj フォームオブジェクト
 * selBoxName 親画面セレクトボックス名
 * myGpFlg マイグループフラグ 0：表示しない 1:表示する
 */
function openGroupWindow(formOj, selBoxName, myGpFlg) {
    openGroup(formOj, selBoxName, myGpFlg, 0, "");
    return;
}

/**
 * 親画面に戻る際にアクションにコマンドを渡す場合
 * cmd コマンド
 */
function openGroupWindow(formOj, selBoxName, myGpFlg, cmd) {
    if (cmd != "") {
        document.forms[0].CMD.value=cmd;
    }
    openGroup(formOj, selBoxName, myGpFlg, 0, "");
    return;
}

/**
 * 親画面へ値設定後、親画面の再読み込みを設定
 * submitFlg  0：再読み込みする 1:しない
 */
function openGroupWindow(formOj, selBoxName, myGpFlg, cmd, submitFlg) {
    if (cmd != "") {
        document.forms[0].CMD.value=cmd;
    }
    openGroup(formOj, selBoxName, myGpFlg, submitFlg, "");
    return;
}

/**
 * 部分更新画面の場合に更新を実行するボタンの名前を渡す
 * prtPrm  更新を実行するボタンの名前
 */
function openGroupWindow(formOj, selBoxName, myGpFlg, cmd, submitFlg, prtPrm) {
    if (cmd != "") {
        document.forms[0].CMD.value=cmd;
    }
    openGroup(formOj, selBoxName, myGpFlg, submitFlg, prtPrm);
    return;
}
/**
 * 選択不可のグループがある場合にSIDを格納しているhiddenパラメータ名を渡す
 * disableGpInp  選択不可のグループSIDを格納しているhiddenパラメータ名
 */
function openGroupWindow(formOj, selBoxName, myGpFlg, cmd, submitFlg, prtPrm, disableGpInp) {
    openGroupWindow_Disabled(formOj, selBoxName, myGpFlg, cmd, submitFlg, prtPrm, disableGpInp, 0);
    return;
}

/**
 * 選択不可のグループがある場合にSIDを格納しているhiddenパラメータ名を渡す
 * disableGpInp 選択不可のグループSIDを格納しているhiddenパラメータ名
 * disableGpFlg 選択不可のグループ設定の有効/無効 0:無効 1:有効
 */
function openGroupWindow_Disabled(formOj, selBoxName, myGpFlg, cmd, submitFlg, prtPrm, disableGpInp, disableGpFlg) {
    if (cmd != "") {
        document.forms[0].CMD.value=cmd;
    }
    openGroup(formOj, selBoxName, myGpFlg, submitFlg, prtPrm, disableGpInp, disableGpFlg);
    return;
}

function openGroup(formOj, selBoxName, myGpFlg, submitFlg, prtPrm) {
    openGroup(formOj, selBoxName, myGpFlg, submitFlg, prtPrm, null, 0);
    return;
}
function openGroup(formOj, selBoxName, myGpFlg, submitFlg, prtPrm, disableGpInp, disableGpFlg) {
    var winWidth=590;
    var winHeight=480;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var smtFlg = "";

    if (submitFlg != "") {
        smtFlg = submitFlg;
    }

    if (prtPrm == undefined) {
        prtPrm = "";
    }


    formOj.blur()
    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;
    var url = '';

    if (!flagSubWindow || !subWindow || (flagSubWindow && (subWindow.closed || subWindow.top != subWindow.self))) {

        subWindow = window.open(url, 'thissite', newWinOpt);
        flagSubWindow = true;

        //form作成
        var form = document.createElement("form");
        form.target = "thissite";
        form.method = 'post';
        form.action = '../common/cmn210.do';

        //hiddenの設定
        var qs = [
                  {type:'hidden', name:'parentDspID', value:formOj.form.name}
                  ,{type:'hidden', name:'selBoxName', value:selBoxName}
                  ,{type:'hidden', name:'myGroupFlg', value:myGpFlg}
                  ,{type:'hidden', name:'submitFlg', value:smtFlg}
                  ,{type:'hidden', name:'prtPrm', value:prtPrm}
                  ,{type:'hidden', name:'cmn210disableGroupFlg', value:disableGpFlg}
                  ];
        if (disableGpInp) {
            $("[name='" + disableGpInp + "']").each(function(){
                qs.push({type:'hidden', name:'cmn210disableGroupSid', value:this.value});
            });
        }

        for(var i = 0; i < qs.length; i++) {
            var ol = qs[i];
            var input = document.createElement("input");
            for(var p in ol) {
                input.setAttribute(p, ol[p]);
            }
            form.appendChild(input);
        }

        var body = document.getElementsByTagName("body")[0];
        // 作成したformをbodyに追加
        body.appendChild(form);
        //サブミット
        form.submit();
        //追加したformを削除
        body.removeChild(form);

    } else {
        subWindow.focus();
    }

}


var subWindow;
var flagSubWindow = false;

function windowClose(){

    if (document.forms[0].CMD.value != 'subwindow_close_ok') {
      if(subWindow) {
        try {
            subWindow.close();
        } catch (e) {}
      }
    }
}

function getCenterX(winWidth) {
    var x = (screen.width - winWidth) / 2;
    return x;
}

function getCenterY(winHeight) {
    var y = (screen.height - winHeight) / 2;
    return y;
}
