function trim(str) {
   return str.replace(/^[ ]+|[ ]+$/g, '');
}

function isNullZeroString(str) {
   if (str == null) {
       return true;
   }

   return trim(str).length == 0;
}

function getWmlForm() {
//  return document.forms['wml010Form'];
  return document.forms[0];
}

function getParamValue(name) {
    return document.getElementsByName(name)[0].value;
}

function getRadioValue(name) {
    var value = 0;
    var paramArray = document.getElementsByName(name);
    if (paramArray != null) {
        for (index = 0; index < paramArray.length; index++) {
            if (paramArray[index].checked) {
                value = paramArray[index].value;
            }
        }
    }

    return value;
}

function getSelectBoxValue(name) {
    var value = 0;
    var paramList = document.getElementsByName(name)[0];
    if (paramList != null) {
        for (index = 0; index < paramList.length; index++) {
            if (paramList[index].selected) {
                value = paramList[index].value;
                break;
            }
        }
    }

    return value;
}

function wml010Submit() {
    getWmlForm().submit();
}

function setParamValue(name, value) {
    document.getElementsByName(name)[0].value = value;
}

function setCMD(cmd) {
    setParamValue('CMD', cmd);
}

function moveAccountConf() {
    setParamValue('CMD', 'accountConf');
    setParamValue('wmlAccountMode', 0);
    getWmlForm().submit();
    return false;
}

function getSelectPage(searchFlg) {
    var selectPage;
    if (searchFlg) {
        selectPage = getSelectBoxValue('wml010searchPageTop');
    } else {
        selectPage = getSelectBoxValue('wml010pageTop');
    }

    if (selectPage <= 0) {
        selectPage = 1;
    }

    return selectPage;
}

function setTempDirId(tempDirId) {
    if (tempDirId) {
        setParamValue('wml010tempDirId', tempDirId);
    }
}

function getTempDirId() {
    return getParamValue('wml010tempDirId');
}

function getShareFlg() {
    return getParamValue('wml010smlShareFlg');
}

function getShareCloseFlg() {
    return getParamValue('wml010smlShareCloseFlg');
}

function getTempShareId() {
    return getParamValue('wml010smlShareTemp');
}

function isEditorHtml() {
    return getParamValue('wml010sendMailHtml') == 1;
}

function setEditorTypeHtml(type) {
    setParamValue('wml010sendMailHtml', type);
}

function changeMailBody(sendBody) {
    var sendEditor = document.getElementById('text_input');
    if (isEditorHtml()) {
        sendEditor.value = wmlFormatHtml(sendBody);

        if (tinyMCE.get(sendEditor.id)) {
            tinyMCE.get(sendEditor.id).setContent(sendEditor.value);
        }
    } else {
        sendEditor.value = sendBody;
        if (!window.getSelection) {
            sendEditor.select();
            var selection = document.selection.createRange();
            selection.setEndPoint("EndToStart", selection);
            selection.select();
        }
    }
}

function wmlFormatHtml(targetText) {
    if (!targetText) {
        return targetText;
    }

    //IE
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("msie") > -1 && navigator.userAgent.indexOf('Trident/7') !== -1) {
        targetText = targetText.replace(/\r/g, '');
    }
    targetText = targetText.replace(/\n/g, '<br>');
    return targetText;
}

function setSendBody() {
//    if (isEditorHtml()) {
//        YAHOO.example.app.editor.value = tinyMCE.get('wml010sendContent').getContent();
//    }
}

function textBr(txtVal) {
  txtVal = txtVal.replace(/\r?\n/g, "<br />");
  return txtVal;
}

function htmlEncode(txtVal) {
    return formatBodyText(txtVal, true);
}

function htmlDecode(txtVal) {
    return formatBodyText(txtVal, false);
}

function formatBodyText(txtVal, type) {
  var lines;
  if (txtVal.indexOf('\n') < 0) {
      lines = [txtVal];
  } else {
      lines = txtVal.split('\n');
  }

  var formatTxt = '';
  for (idx = 0; idx < lines.length; idx++) {
    if (idx >= 1) {
        if (type) {
            formatTxt += '<br />';
        } else {
            formatTxt += '\n';
        }
    }
    if (type) {
        formatTxt += $('<div/>').text(lines[idx]).html();
    } else {
        formatTxt += $('<div/>').html(lines[idx]).text();
    }
  }

  return formatTxt;
}


function getAccount() {
    return getSelectBoxValue('wmlViewAccount');
}

function getDirectory() {
    return getParamValue('wml010viewDirectory');
}

function setDirectory(dirId) {
    document.getElementsByName('wml010viewDirectory')[0].value = dirId;
}

function setDirectoryType(dirType) {
    document.getElementsByName('wml010viewDirectoryType')[0].value = dirType;
}

function getLabel() {
    return getParamValue('wml010viewLabel');
}

function setLabel(labelId) {
    document.getElementsByName('wml010viewLabel')[0].value = labelId;
}

function setViewDelMail(delMailFlg) {
    document.getElementsByName('wml010viewDelMail')[0].value = delMailFlg;
}

function setInboxSelectPage(page) {
    setParamValue('wml010selectPage', page);
}

function setInboxSort(sortKey, order) {
    setParamValue('wml010sortKey', sortKey);
    setParamValue('wml010order', order);
}

function tempDownload(url) {
    var isEdit = wmlEditorBeforeUnloadManager.isOpenEditor;
    if (isEdit) {
        wmlEditorBeforeUnloadManager.onTemporary();
    }
    window.location.href=url;
}

function getWml010Form() {
  return document.forms[0];
}

//メール詳細表示時、表示しているメールのメッセージ番号を取得
function getDetailMailNum() {
  return getParamValue('selectMailNumEsc');
}

//メール詳細画面(タブ)を閉じる
function closeMailDetail() {
//    $('.js_mailCloseBtnMini').click();
    closeMailDetail();
}

//メール作成画面(タブ)を閉じる
function closeMailCreate() {
    deleteNewCreateMail($('.js_mailDelBtnMini'));
}

//メール確認画面の縦幅を設定
function setConfirmHeight() {
    var confirmHeight = $(window).height() - 100;
    if (confirmHeight < 100) {
        confirmHeight = 100;
    }
    window.document.getElementById("wml010SendConfirmArea").style.height = confirmHeight + "px";
}

//エラーメッセージを設定する
function setErrorMessage(message) {
    if (message == null) {
        document.getElementById('webmailErrMsg').innerHTML = '';
    } else {
        var errMessage = '<div class="w100 mb10" style="padding-left: 205px!important;">'
          + '<div style="text-align:left!important">'
          + '<div class="textError"><b>';

        for (i = 0; i < message.length; i++) {
            errMessage += '<br>' + message[i] ;
        }

        errMessage += '</b></div>'
                   + '</div></div>';
        document.getElementById('webmailErrMsg').innerHTML = errMessage;
        errMessage = null;
   }
}


//エラーメッセージをクリアする
function clearErrorMessage(message) {
    setErrorMessage(null);
}


function changeSearchDateType() {
   var searchDate = document.getElementsByName('wml010searchDateType');

   var checkValue = 0;
   for (index = 0; index < searchDate.length; index++) {
       if (searchDate[index].checked) {
           checkValue = searchDate[index].value;
           break;
       }
   }

   if (checkValue == 0) {
       $('#searchDateArea').hide();
   } else {
       $('#searchDateArea').show();
   }
}

function viewSearchDetail() {
    var detailSearchFlg = document.forms[0].detailSearchFlg;
    if (detailSearchFlg.value == 1) {
        $('#top_detailSearch').removeClass('display_none');
        $('#wmlSearchKeywordKbn').hide();
        $('#wmlSearchKeywordKbn').show();
        detailSearchFlg.value = 2;
    } else {
        $('#top_detailSearch').addClass('display_none');
        detailSearchFlg.value = 1;
    }

    return false;
}

function changeAccount(accountId) {

    var taihi = {
       CMD : getWml010Form().CMD.value,
       wml010viewDirectory : getWml010Form().wml010viewDirectory.value,
       wml010viewDirectoryType : getWml010Form().wml010viewDirectoryType.value,
       wml010viewLabel : getWml010Form().wml010viewLabel.value,
       wml010selectPage : getWml010Form().wml010selectPage.value,
       wml010sortKey : getWml010Form().wml010sortKey.value,
       wml010order : getWml010Form().wml010order.value
    }

    shareTabClose();
    getWml010Form().CMD.value='changeAccount';
    getWml010Form().wml010viewDirectory.value=0;
    getWml010Form().wml010viewDirectoryType.value=0;
    getWml010Form().wml010viewLabel.value=0;
    getWml010Form().wml010selectPage.value=0;
    getWml010Form().wml010sortKey.value=0;
    getWml010Form().wml010order.value=0;

    //onbeforeunload実行後に元に戻す（キャンセルにより画面遷移を行わなかった場合）
    if (wmlEditorBeforeUnloadManager
     && wmlEditorBeforeUnloadManager.isOpenEditor) {
        window.setTimeout(function() {
            getWml010Form().CMD.value = taihi.CMD;
            $('select[name=wmlViewAccount]').val($('#wmlViewAccountSv').val());
            getWml010Form().wml010viewDirectory.value = taihi.wml010viewDirectory;
            getWml010Form().wml010viewDirectoryType.value = taihi.wml010viewDirectoryType;
            getWml010Form().wml010viewLabel.value = taihi.wml010viewLabel;
            getWml010Form().wml010selectPage.value = taihi.wml010selectPage;
            getWml010Form().wml010sortKey.value = taihi.wml010sortKey;
            getWml010Form().wml010order.value = taihi.wml010order;
        }, 0);
    }

    resetParam();

    if (accountId) {
        $('select[name=wmlViewAccount]').val(accountId);
    }

    getWml010Form().submit();
    return false;
}

function isNullZeroString(str) {
   if (str == null) {
       return true;
   }

   return trim(str).length == 0;
}

function isSpaceStart(str) {
    var target = str.substring(0, 1);
    if ('　' == target || ' ' == target) {
        return true;
    }
   return false;
}

function isSpaceOnly(str) {
   if (str == ' ' || str == '　') {
       return true;
   }
   return false;
}

function windowParentCloseEvent() {
//    if (!shareCheck()) {
        window.parent.jQuery('#shareDialog').dialog('close');
//    } else {
//        YAHOO.example.container.dialog12.show();
//    }
}

function shareCheck() {
    var flg = getParamValue('wml010smlShareFlg');
    var closeFlg = getParamValue('wml010smlShareCloseFlg');
    var ret = false;
    if (flg == 1 && closeFlg == 0) {
        ret = true;
    }
    return ret;
}

function createTooltipAddressList(address) {
    if (!address) {
        return '';
    }

    var addressArray = address.split(',');
    address = checkMineAddress(addressArray[0]);
    for (var idx = 1; idx < addressArray.length && idx < 5; idx++) {
        address += '<br>' + checkMineAddress(addressArray[idx]);
    }

    return address;
}

function checkMineAddress(address) {
    if (address.indexOf(getParamValue('wml010viewAccountAddress')) >= 0) {
        address = '<span class="fw_bold">' + address + '</span>';
    }
    return address;
}