function confirmButtonPush(){
    document.forms[0].CMD.value = 'fileUpload';
    document.forms['cmn110Form'].cmn110uploadType.value=0;
    document.forms[0].submit();
    return false;
}


/**
 * ファイル添付送信完了時に呼ばれる
 * cmn110ウインドウを開いた画面の関数cmn110Updatedを呼びます
 * 各画面はcmn110Updated(window, tempName, tempSaveName)関数でファイル送信完了後の動作を定義してください
 * cmn110Updatedは返り値にcmn110ウインドウを閉じるかどうかを返してください
 * @param cmn110CloseFlg
 * @returns
 */
function checkStatus(cmn110CloseFlg) {
    var decision = document.forms[0].cmn110Decision.value;
    if (decision == 1) {
        var tempCloseFlg = false;
        if (document.forms[0].cmn110tempName) {
            var tempNameList = $("*[name=cmn110tempName]");
            var tempSaveNameList = $("*[name=cmn110tempSaveName]");
            for (tempIdx = 0; tempIdx < tempNameList.length; tempIdx++) {
                var tempName = tempNameList[tempIdx].value;
                var tempSaveName = tempSaveNameList[tempIdx].value;
                if (window.opener && ('cmn110Updated' in window.opener)) {
                    tempCloseFlg = window.opener.cmn110Updated(window, tempName, tempSaveName);
                } else if ('cmn110Updated' in window) {
                    tempCloseFlg = true;
                    tempCloseFlg = cmn110Updated(window, tempName, tempSaveName);
                } else {
                    if (document.forms[0].cmn110Mode.value == 1) {
                        tempCloseFlg = true;
                    } else if (document.forms[0].cmn110Mode.value == 2) {
                        setParentParam(tempIdx, 1);
                        tempCloseFlg = true;
                    } else if (document.forms[0].cmn110Mode.value == 4) {
                        tempCloseFlg = true;
                    } else if (document.forms[0].cmn110Mode.value == 5) {
                        tempCloseFlg = true;
                    } else if (document.forms[0].cmn110Mode.value == 7) {
                        setParentParamTinymceMode(tempIdx);
                        document.forms[0].cmn110Decision.value = 0;
                    } else if (document.forms[0].cmn110Mode.value == 8) {
                        window.opener.addTempFile(tempSaveName, tempName);
                        document.forms[0].cmn110Decision.value = 0;
                    } else {
                        setParentParam(tempIdx);
                        document.forms[0].cmn110Decision.value = 0;
                    }
                }
            }

        }

        if (cmn110CloseFlg) {
            tempCloseFlg = true;
        }
        if (tempCloseFlg) {
            tempClose();
        }
    }
}

function setParentParamFileMode() {

    if (!window.opener.document.createElement) return;

    var fileArray;
    var keyStr;

    fileArray = document.getElementsByName("fileList");
    keyStr = document.forms[0].splitStr.value;

    var parentListName = document.forms[0].cmn110parentListName.value;
    var parentFileList = window.opener.document.getElementsByName(parentListName);

    if (parentFileList != null && parentFileList.length > 0) {
        while (parentFileList[0].options.length > 0){
            parentFileList[0].removeChild(parentFileList[0].options[0]);
        }
    }

    if (fileArray != null && fileArray.length > 0) {

        for (i = 0; i < fileArray.length; i++) {
            var sp = fileArray[i].value.split(keyStr);

            if (sp != null && sp.length == 3) {

                var tempName = sp[0];
                var updateKbn = sp[1];
                var tempSaveName = sp[2];

                var option = window.opener.document.createElement("option");
                option.value = tempSaveName;

                if (updateKbn == 3) {
                    option.style.backgroundColor = '#FFEEBB';
                }

                var optionStr = window.opener.document.createTextNode(tempName);
                option.appendChild(optionStr);

                parentFileList[0].appendChild(option);
            }
        }
    }
}

function tempClose() {
    window.close();
}

function setParentParam(tempIdx, fileLimit){

    if (!window.opener.document.createElement) return;

    var tempName = $("*[name=cmn110tempName]")[tempIdx].value;
    var tempSaveName = $("*[name=cmn110tempSaveName]")[tempIdx].value;

    var option = window.opener.document.createElement("option");
    option.value = tempSaveName;
    var optionStr = window.opener.document.createTextNode(tempName);
    option.appendChild(optionStr);

    var parentListName = document.forms[0].cmn110parentListName.value;
    var parentFileList = window.opener.document.getElementsByName(parentListName);


    if (fileLimit == 1) {
        parentFileList[0].options[0] = null;
    }

    parentFileList[0].appendChild(option);
}

function setParentParamTinymceMode(tempIdx){
    if (!window.opener.document.createElement) return;

    var tempName = $("*[name=cmn110tempName]")[tempIdx].value;
    //フォルダ連番ID
    var tempSaveName = $("*[name=cmn110tempSaveName]")[tempIdx].value;

    var src = '';
    var lowerName = tempName.toLowerCase();
    if (endsWith(lowerName, '.gif')
    || endsWith(lowerName, '.jpeg')
    || endsWith(lowerName, '.jpg')
    || endsWith(lowerName, '.png')) {
        if (document.forms[0].cmn110pluginId.value == "bulletin") {
            src += 'bbs070.do?CMD=getBodyFile&bbs070TempSaveId=' + tempSaveName
                +  '&tempDirId=' + $('input[name="tempDirId"]').val(); 
        } else if (document.forms[0].cmn110pluginId.value == "smail") {
            src += 'sml020.do?CMD=getBodyFile&sml020TempSaveId=' + tempSaveName;
        }
      window.opener.addElementBody('img', src);
    }
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

var subWindow;
var flagSubWindow = false;
/**
 *
 * @param listName 添付ファイルセレクトボックス参照name
 * @param mode CMN110モード
 * @param pluginId プラグインID
 * @param tempDirId ディレクトリID
 * @param 以降はサブディレクトリ文字列
 * @returns
 */
function opnTemp(listName, mode, pluginId, tempDirId) {
    var winWidth=558;
    var winHeight=290;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ",left=" + winx + ",top=" + winy + ",toolbar=no,scrollbars=yes";

    var url = '../common/cmn110.do';
    url = url + '?cmn110parentListName=' + listName;
    url = url + '&cmn110pluginId=' + pluginId;
    url = url + '&cmn110Mode=' + mode;
    url = url + '&tempDirId=' + tempDirId;
    url = url + '&cmn110Mode=' + mode;
    var roopFirst = true;
    for (var i = 4; i < arguments.length; i++) {
        var subDir = arguments[i];
        if (!subDir) {
            continue;
        }

        if (roopFirst) {
            url = url + '&cmn110TempDirPlus=';
            roopFirst = false;
        } else {
            url = url + '/';
        }

        url = url + subDir;

    }


    if (!flagSubWindow || subWindow == null || (flagSubWindow && subWindow.closed)) {
        subWindow = window.open(url, 'thissite', newWinOpt);
        flagSubWindow = true;
        afterNewTempFileWinOpen(subWindow);
    } else {
        subWindow.location.href=url;
        subWindow.focus();
        return;
    }
}


function windowClose(){
    if(subWindow != null){
        subWindow.close();
    }
}

function afterNewTempFileWinOpen(win){
    subWindow.focus();
    return;
}

function getCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}
