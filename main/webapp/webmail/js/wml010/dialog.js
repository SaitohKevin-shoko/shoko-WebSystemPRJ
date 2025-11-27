function labelAddPop(listType, searchFlg) {

    //ダイアログ呼び出し前に入力項目を初期化
    $('input[name=wml010addLabelType]').val(['0']);
    $('[name=wml010addLabel]').prop("selectedIndex", 0);
    $('input[name=wml010addLabelName]').val('');
    changeAddLabelType();

    $('#labelAddPop').dialog({
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height:160,
        width: 400,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
            text:msglist_wml010["cmn.add"],
            click: function() {
                doLabel(0, listType, searchFlg);
            }
        },{
                text:msglist_wml010["wml.js.84"],
                click: function() {

                $(this).dialog('close');

            }
        }],
        //ダイアログ表示時、非表示領域までスクロールが伸びる問題対応
        open: function() {
            $('.ui-widget-overlay').css('position', 'fixed');
        },
        close: function() {
            $('.ui-widget-overlay').css('position', 'absolute');
        }
    });
}


function labelDeletePop(listType, searchFlg) {

    $('#labelDelPop').dialog({
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height:180,
        width: 400,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
            text:msglist_wml010["cmn.delete"],
            click: function() {
                doLabel(1, listType, searchFlg);
            }
        },{
                text:msglist_wml010["wml.js.84"],
                click: function() {

                $(this).dialog('close');

            }
        }],
        //ダイアログ表示時、非表示領域までスクロールが伸びる問題対応
        open: function() {
            $('.ui-widget-overlay').css('position', 'fixed');
        },
        close: function() {
            $('.ui-widget-overlay').css('position', 'absolute');
        }
    });
}

/**
 *
 * @param kbn 0:ラベル追加 1:ラベル除去
 * @param searchFlg true: 検索結果一覧 false:メール一覧
 * @returns
 */
function doLabel(kbn, listType, searchFlg) {
    var selectSidList;
    if (listType == 1) {
        //一覧から指定
        selectSidList = getListCheckSid(searchFlg);
    } else {
        //メール詳細から指定
        selectSidList = new Array(getDetailMailNum());
    }

    if (selectSidList == null || selectSidList.length == 0) {
        alert(msglist.mailSelect);
        return;
    }

    var url = '../webmail/wml010.do';
    var paramStr, labelErrorMessage;
    if (kbn == 1) {
        //ラベル削除
        labelErrorMessage = msglist.faildedRmvLabel;

        url += '?CMD=delMessageLabel';
        url += '&wmlViewAccount=' + getAccount();
        url += '&wml010delLabel=' + document.forms['delLabelForm'].wml010delLabel.value;
        for (i = 0; i < selectSidList.length; i++) {
            url += '&wml010selectMessageNum=' + selectSidList[i];
        }

    } else {
        //ラベル追加
        labelErrorMessage = msglist.faildedAddLabel;

        var labelType = getRadioValue('wml010addLabelType');
        var labelName = getParamValue('wml010addLabelName');

        if (labelType == 1) {
            if (labelName == null || labelName.length <= 0) {
                alert(msglist.enterLabel);
                return;
            } else if (labelName.length > 100) {
                alert(msglist.enterLabelPlease);
                return;
            }
        }

        document.getElementById('addLabelParam').innerHTML = '<input type="hidden" name="CMD" value="addMessageLabel">';
        document.getElementById('addLabelParam').innerHTML += '<input type="hidden" name="wmlViewAccount" value="' + getAccount() + '">';

        for (i = 0; i < selectSidList.length; i++) {
            document.getElementById('addLabelParam').innerHTML += '<input type="hidden" name="wml010selectMessageNum" value="' + selectSidList[i] + '">';
        }

        paramStr = getFormData($('#addLabelForm'));
    }

    $.ajax({
        async: true,
        url:  url,
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data.message == null) {
            alert(labelErrorMessage);
        } else if (data.message == 'success') {
            if (kbn == 0) {
                $('#labelAddPop').dialog('close');
            } else if (kbn == 1) {
                $('#labelDelPop').dialog('close');
            }

            //追加したラベルをラベル選択セレクトボックスへ追加
            if (data.addLabelValue) {
                var addLabelName = unescapeHtml(data.addLabelValue.name);

                //「ラベル追加」ダイアログ
                document.getElementById('label_dialog_sel').options[document.getElementById('label_dialog_sel').options.length]
                    = new Option(addLabelName, data.addLabelValue.id);
                //「ラベル削除」ダイアログ
                document.getElementById('label_dialog_del').options[document.getElementById('label_dialog_del').options.length]
                    = new Option(addLabelName, data.addLabelValue.id);
                $(".js_delLabelArea").append("<span id=\"delLabel_" + data.addLabelValue.id + "\">" + addLabelName + "</span>");
            }

            //メール詳細から呼び出された場合、メール詳細を閉じる
            if (listType == 0) {
                closeMailDetail(1);
            }

            reloadData(false);

        } else {
            alert(data.message);
        }
    }).fail(function(data){
        alert(labelErrorMessage);
    });
}


//メールの移動ダイアログ
function moveMailPop(listType, searchFlg) {
    //移動先フォルダダイアログの初期値を設定
    var defaultFolderId = getParamValue('moveFolderDefaultId');
    $("#" + defaultFolderId).attr("checked", true);

    $('#moveMailPop').dialog({
        title: msglist_wml010['wml.wml010.20'],
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height:210,
        width: 300,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
            text:msglist_wml010["cmn.move"],
            click: function() {
                moveMailSubmit(listType, searchFlg);
            }
        },{
                text: msglist_wml010["wml.js.84"],
                click: function() {

                $(this).dialog('close');

            }
        }],
        //ダイアログ表示時、非表示領域までスクロールが伸びる問題対応
        open: function() {
            $('.ui-widget-overlay').css('position', 'fixed');
        },
        close: function() {
            $('.ui-widget-overlay').css('position', 'absolute');
        }
    });
}

function moveMailSubmit(listType, searchFlg) {
    var selectSidList;
    if (listType == 1) {
        //一覧から指定
        selectSidList = getListCheckSid(searchFlg);
    } else {
        //メール詳細から指定
        selectSidList = new Array(getDetailMailNum());
    }

    if (selectSidList == null || selectSidList.length == 0) {
        alert(msglist.mailSelect);
    } else {
        var reqUrl = '../webmail/wml010.do';
        reqUrl += '?CMD=moveMessage';
        reqUrl += '&wmlViewAccount=' + getAccount();
        reqUrl += '&wml010moveFolder=' + getRadioValue('wml010moveFolder');
        for (i = 0; i < selectSidList.length; i++) {
            reqUrl += '&wml010selectMessageNum=' + selectSidList[i];
        }

        $.ajax({
            async: true,
            url: reqUrl,
            type: "post"
        }).done(function( data ) {
            try {
                if (data.message == 'success') {
                    $('#moveMailPop').dialog('close');

                    //メール一覧再表示
                    loadingPop(msglist_wml010['cmn.loading']);
                    setCMD('getMailList');

                    if (searchFlg) {
                        reloadData();
                    } else {
                        getMailData();
                    }
                } else {
                    closeloading();
                    alert(data.message);
                }

            } catch (ae) {
                closeloading();
                alert(ae);
            }
        }).fail(function(data){
            closeloading();
            alert(msglist.faildedMoveMail);
        });
    }
}


//共有ポップアップ
function shareMailPop() {
    setParamValue('wml010shareMailNum', getDetailMailNum());

    if (getParamValue('wml010pluginCircularUse') == 0) {
        $('#entryCircularArea').show();
    } else {
        $('#entryCircularArea').hide();
    }

    if (getParamValue('wml010pluginSmailUse') == 0) {
        $('#entrySmailArea').show();
    } else {
        $('#entrySmailArea').hide();
    }
    if (getParamValue('wml010pluginFilekanriUse') == 0
    && $('#wmlMailDetailTempArea').html().indexOf('downloadFile') > 0) {
        $('#entryFilekanriArea').show();
    } else {
        $('#entryFilekanriArea').hide();
    }

    $('#shareMailPop').dialog({
        title: msglist_wml010['cmn.share'],
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        width: 330,
        height: 'auto',
        maxHeight: 500,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
            text: msglist_wml010["wml.js.84"],
            click: function() {
              $(this).dialog('close');
            }
        }],
        //ダイアログ表示時、非表示領域までスクロールが伸びる問題対応
        open: function() {
            $('.ui-widget-overlay').css('position', 'fixed');
        },
        close: function() {
            $('.ui-widget-overlay').css('position', 'absolute');
        }
    });
}


//共有ポップアップ
function wmlSubWindowPop(url) {
    scrollBodyTop();
    var subWindowWidth = $(window).width() * 0.9;
    var subWindowHeight = $(window).height() * 0.9;

    document.getElementById('wml010EntryMailArea').style.height = subWindowHeight + 'px';

    $('#wmlSubWindowPop').dialog({
      title: msglist_wml010['cmn.share'],
      dialogClass:"fs_13",
      autoOpen: true,  // hide dialog
      bgiframe: true,   // for IE6
      resizable: false,
      width: subWindowWidth,
      height: 'auto',
      minWidth: subWindowWidth,
      maxWidth: subWindowWidth,
      modal: true,
      overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
      },
      buttons: [],
      open:function() {
        window.document.getElementById("wml010EntryMailArea").src = url + '&reload=' + (+new Date());
      }
  });
}


//メール送信確認ポップアップ
function showSendmailConfirmDialog() {
    if (trim(getParamValue('wml010sendSubject')).length <= 0) {
        if (confirm(msglist.subjectEntered) == false) {
            return;
        }
    } else if (trim(getParamValue('wml010sendSubject')) == msglist["cmn.autoSave"]) {
        if (confirm(msglist.subjectAutoSaveEntered) == false) {
            return;
        }
    }

    loadingPop("処理中");

    var url = '../webmail/wml012.do?wml012CMD=saveMail&wml012tempDirId=' + getTempDirId();
    var paramStr = getFormData($('#webmailForm'));

    $.ajax({
        async: true,
        url: url,
        type: "post",
        data: paramStr
    }).done(function( data ) {
        try {
            if (data.error == 1) {
                closeloading();
//                sendConfirmErrorPop(data.errorMessage);
                setErrorMessage(data.errorMessage);
                return;
            }

            clearErrorMessage();
            setConfirmHeight();
            window.document.getElementById("wml010SendConfirmArea").src = '../webmail/wml012.do?reload=' + (+new Date()) + '&wml012tempDirId=' + getTempDirId();
            window.document.getElementById("wml010SendConfirmArea").src
                  = window.document.getElementById("wml010SendConfirmArea").src;
            closeloading();

            $('#sendMailConfirmPop').dialog({
                title: msglist_wml010['cmn.check'],
                dialogClass:"fs_13",
                autoOpen: true,  // hide dialog
                bgiframe: true,   // for IE6
                resizable: false,
                height: 'auto',
                width: 900,
                minHeight: 200,
                modal: true,
                overlay: {
                    backgroundColor: '#000000',
                    opacity: 0.5
                }
            });
        } catch (ae) {
            closeloading();
            clearErrorMessge();
            setErrorMessage([msglist.failedSend]);
        } finally {
            $('#loading_pop').dialog('close');
        }
    }).fail(function(data){
        $('#loading_pop').dialog('close');
    });

}

//メール送信確認のエラーメッセージ表示ポップアップ
function sendConfirmErrorPop(errMessageList) {
    var dialogWidth = 350;
    var dialogHeight = 160;
    var errorMsg = "";

    for (e = 0; e < errMessageList.length; e++) {
        errorMsg += "<div class=\"js_errorMsgStr cl_fontWarn errorMsgStr\">" + errMessageList[e] + "</div>";
        if (e != 0) {
            dialogHeight += 18;
        }
        if (errMessageList.length > 30) {
            dialogWidth = 630;
            dialogHeight += 25;
        }
    }
    if (dialogHeight > 260) {
        dialogWidth = 630;
        dialogHeight = 340;
        errorMsg = "<div class=\"txt_m of_a wp500 hp200 fw_b fs_13\">" + errorMsg + "</div>";

    }
    messagePop(errorMsg, dialogWidth, dialogHeight);
}


function checkSendElement(checkName) {
    var checkElList = null;
    checkElList = document.getElementById('wml010SendConfirmArea');
    if (checkElList.contentWindow != null && checkElList.contentWindow.document != null) {
        checkElList = checkElList.contentWindow.document.getElementsByName(checkName);
    } else {
        checkElList = checkElList.document.getElementsByName(checkName);
    }

    for (checkIdx = 0; checkIdx < checkElList.length; checkIdx++) {
      if (checkElList[checkIdx].checked == false) {
        return false;
      }
    }
    return true;
}

function doCheckAddressSubmit() {
    var noCheckElement = '';
    if (getParamValue("wml010checkAddress") == 1) {
        if (checkSendElement("checkTo") == false) noCheckElement += "・" + msglist.address + "\n";
        if (checkSendElement("checkCc") == false) noCheckElement += "・CC\n";
        if (checkSendElement("checkBcc") == false) noCheckElement += "・BCC\n";
    }
    if (getParamValue("wml010checkFile") == 1) {
        if (checkSendElement("checkFile") == false) noCheckElement += "・" + msglist.attachFile + "\n";
    }

    if (noCheckElement.length > 0) {
        alert("以下の項目のチェックが完了していません。\r\n" + noCheckElement);
        return;
    }

    closeCheckAddressDialog();
    sendWebmail();
};

//「宛先の確認」ダイアログを閉じる
function closeCheckAddressDialog() {
    doHandleCancel();
    document.getElementById("wml010SendConfirmArea").src = '';
}

function doHandleCancel() {
    $('#sendMailConfirmPop').dialog('close');
};


//メールテンプレートポップアップ
function mailTemplatePop() {
    $('#mailTemplatePop').dialog({
        title: msglist_wml010['anp.anp090.03'],
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 'auto',
        minHeight: 250,
        maxHeight: 500,
        width: 600,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
            text: msglist_wml010["wml.js.84"],
                click: function() {
                    $(this).dialog('close');
                }
        }],
        //ダイアログ表示時、非表示領域までスクロールが伸びる問題対応
        open: function() {
            $('.ui-widget-overlay').css('position', 'fixed');
        },
        close: function() {
            $('.ui-widget-overlay').css('position', 'absolute');
        }
    });
}

function mailTemplateSubmit() {
    var selectSidList;
    if (listType == 1) {
        //一覧から指定
        selectSidList = getListCheckSid(searchFlg);
    } else {
        //メール詳細から指定
        selectSidList = new Array(getDetailMailNum());
    }

    if (selectSidList == null || selectSidList.length == 0) {
        alert(msglist.mailSelect);
    } else {
        var reqUrl = '../webmail/wml010.do';
        reqUrl += '?CMD=moveMessage';
        reqUrl += '&wmlViewAccount=' + getAccount();
        reqUrl += '&wml010moveFolder=' + getRadioValue('wml010moveFolder');
        for (i = 0; i < selectSidList.length; i++) {
            reqUrl += '&wml010selectMessageNum=' + selectSidList[i];
        }

        $.ajax({
            async: true,
            url: reqUrl,
            type: "post"
        }).done(function( data ) {
            try {
                if (data.message == 'success') {
                    $('#moveMailPop').dialog('close');

                    //メール一覧再表示
                    loadingPop(msglist_wml010['cmn.loading']);
                    setCMD('getMailList');

                    if (searchFlg) {
                        reloadData();
                    } else {
                        getMailData();
                    }
                } else {
                    alert(data.message);
                }

            } catch (ae) {
                alert(ae);
            } finally {
                closeloading();
            }
        }).fail(function(data){
            closeloading();
            alert(msglist.faildedMoveMail);
        });
    }
}


//添付ファイル削除(メール詳細)ダイアログ
function deleteAttachForDetailPop(messageNum, fileId, fileName) {
  document.getElementById("msg_dialog11").innerHTML = decodeURIComponent(fileName);
  $('#deleteAttachForDetailPop').dialog({
      title: msglist_wml010['wml.wml010.36'],
      dialogClass:"fs_13",
      autoOpen: true,  // hide dialog
      bgiframe: true,   // for IE6
      resizable: false,
//      height:250,
      width: 400,
      modal: true,
      overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
      },
      buttons: [{
          text:msglist_wml010["cmn.delete"],
          click: function() {
              deleteAttachForDetailSubmit(messageNum, fileId);
          }
      },{
              text: msglist_wml010["wml.js.84"],
              click: function() {

              $(this).dialog('close');

          }
      }],
      //ダイアログ表示時、非表示領域までスクロールが伸びる問題対応
      open: function() {
          $('.ui-widget-overlay').css('position', 'fixed');
      },
      close: function() {
          $('.ui-widget-overlay').css('position', 'absolute');
      }
  });
}

function deleteAttachForDetailSubmit(messageNum, fileId) {
    var reqUrl = '../webmail/wml010.do';
    reqUrl += '?CMD=fileDeleteFromDetail';
    reqUrl += '&wmlViewAccount=' + getAccount();
    reqUrl += "&wml010selectMessageNum=" + messageNum
    reqUrl += "&wml010delFileId=" + fileId;
    reqUrl += "&wml010DelAttachFileId=" + fileId;

    $('#deleteAttachForDetailPop').dialog('close');
    loadingPop(msglist_wml010['cmn.loading']);

    $.ajax({
        async: true,
        url: reqUrl,
        type: "post"
    }).done(function( data ) {
        try {
            if (data.error == 0) {

//                //メール詳細から削除した添付ファイルを除去する
//                $('#mailDetailAttach_' + fileId).remove();

                //メール一覧情報から対象添付ファイルを削除
                deleteMailTempfileData(messageNum, fileId);

                $('#deleteAttachForDetailPop').dialog('close');
            } else {
                alert(data.errorMessage);
            }

        } catch (ae) {
            alert(ae);
        } finally {
            closeloading();
        }
    }).fail(function(data){
        closeloading();
        alert(msglist.faildedMoveMail);
    });
}


function sendMailTempPop() {
    //Attachment settings
    attachmentSettings();

    $('#sendMailTempPop').dialog({
        title: msglist_wml010['cmn.attach.file'],
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height:260,
        width: 558,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
            text:msglist_wml010["cmn.attached"],
            click: function() {
                fileUploadSubmit();
            }
        },{
                text:msglist_wml010["cmn.close"],
                click: function() {

                $(this).dialog('close');

            }
        }],
        //ダイアログ表示時、非表示領域までスクロールが伸びる問題対応
        open: function() {
            $('.ui-widget-overlay').css('position', 'fixed');
        },
        close: function() {
            $('.ui-widget-overlay').css('position', 'absolute');
        }
    });
}


//添付ファイルのアップロードを行う
function fileUploadSubmit() {
    var fd;
    try { fd = new FormData(); } catch (fdE) {}

    if (fd) {
      if ($('#wml010sendMailFile')[0].files.length <= 0) {
        alert(msglist["fileSelect"]);
        return;
      }
      fd.append('CMD', 'sendFileUpload');
      fd.append('wmlViewAccount', getAccount());
      fd.append('wml010tempDirId', getTempDirId());
      fd.append('wml010sendMailFile[0]',  $('#wml010sendMailFile')[0].files[0]);

      $('#sendMailTempPop').dialog('close');
      loadingPop(msglist_wml010['cmn.loading']);

      var formUrl = '../webmail/wml010.do';
      $.ajax({
          url: formUrl,
          type: "POST",
          data: fd,
          processData: false,
          contentType: false,
          success: function(data) {
            try {
                var tempFileData = data;
                if (tempFileData != null) {
                    var data = JSON.parse(tempFileData);
                    if (data[0].error == 1) {
                        alert(data[0].errorMessage);
                    } else {
                        setTempDirId(data[0].tempDirId);
                        setEditorTempFile(data[0]);
                    }
                }

                tempFileData = null;
                $('#sendMailTempPop').dialog('close');
            } catch (ae) {
                alert(ae);
            } finally {
                closeloading();
            }
          },
          error: function() {
              alert('Upload ERROR');
              closeloading();
          }
      });

    } else {
        document.getElementById('sendMailTempFormCMD').value = "sendFileUpload";
        var formObject = document.getElementById('sendMailTempForm');

        $('#sendMailTempPop').dialog('close');
        loadingPop(msglist_wml010['cmn.loading']);

        $.ajax({
            async: true,
            url: '../webmail/wml010.do?wmlViewAccount=' + getAccount(),
            type: "post",
            data: formObject
        }).done(function( data ) {
            try {
                if (data != null) {
                    if (data[0].error == 1) {
                        alert(data[0].errorMessage);
                    } else {
                        setTempDirId(data[0].tempDirId);
                        setEditorTempFile(data[0]);
                        $('#sendMailTempPop').dialog('close');
                    }
                }

            } catch (ae) {
                alert(ae);
            } finally {
                closeloading();
            }
        }).fail(function(data){
            alert(msglist.failedAttach);
            closeloading();
        });
    }

    document.getElementById('wml010sendMailFile').value = '';

}

var uploadFiles;
function attachmentSettings() {
    if (window.File) {
        uploadFiles = function (files, attachType, objId) {
            if (!objId) {
              attachmentOverlayRemove();
              return;
            }

            var fd = new FormData();

            let wmlAttachId = '1';
            const bodyFileUpload = (objId == '2');
            if (bodyFileUpload) {
                wmlAttachId = '2';
            }

            if (bodyFileUpload) {
              fd.append('CMD', 'sendBodyFileUpload');
            } else {
              fd.append('CMD', 'sendFileUpload');
            }

            fd.append('wmlViewAccount', getAccount());
            fd.append('wml010tempDirId', getTempDirId());

            for (var i = 0; i < files.length; i++) {
                fd.append('wml010sendMailFile[' + i + ']', files[i]);
            }
            loadingPop(msglist_wml010['cmn.loading']);

            var formUrl = '../webmail/wml010.do';
            $.ajax({
                url: formUrl,
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                success: function(data) {
                    try {
                        var tempFileData = data;
                        if (tempFileData != null) {
                            var data = JSON.parse(tempFileData);
                            var tempErrorCount = 0;

                            if (data.length > 0) {
                                setTempDirId(data[0].tempDirId);
                                var errorMsg = "";
                                $("#attachmentFileErrorArea" + wmlAttachId).empty();

                                for (tempIdx = 0; tempIdx < data.length; tempIdx++) {
                                    if (data[tempIdx].error == 1) {
                                        if (errorMsg.length > 0) {
                                            errorMsg += '<br>';
                                        }
                                        errorMsg += data[tempIdx].errorMessage;
                                        if (data[tempIdx].fileName != null) {
                                            errorMsg += '<br>';
                                            errorMsg += data[tempIdx].fileName;
                                        }
                                        tempErrorCount++;
                                    } else {
                                        if (bodyFileUpload) {
                                          let src = 'wml010.do?CMD=getBodyFile'
                                                  + '&wmlViewAccount=' + getAccount()
                                                  + '&wml010tempDirId=' + getTempDirId()
                                                  + '&wml010TempSaveId=' + data[tempIdx].saveFileId;
                                          window.addElementBody('img', src);

                                          attachmentOverlayRemove();
                                        } else {
                                          setEditorTempFile(data[tempIdx]);
                                        }
                                    }
                                }
                                if (tempErrorCount > 0) {
                                    $("#attachmentFileErrorArea" + wmlAttachId).append(
                                        '<div class=\"textError mt5\">' + errorMsg + '</div>'
                                    );
                                    attachmentOverlayRemove();
                                    if (!bodyFileUpload) {
                                        $('#composeTempFile').removeClass('display_none');
                                    }
                                }
                            }
                        }

                        tempFileData = null;
                    } catch (ae) {
                        alert(ae);
                        attachmentOverlayRemove();
                    } finally {
                        closeloading();
                    }
                },
                error: function() {
                    alert('Upload ERROR');
                    attachmentOverlayRemove();
                    closeloading();
                }
            });
        };

        var dropbox;
        dropbox = document.getElementById("uploadArea");
        dropbox.addEventListener("dragenter", uploadDragenter, false);
        dropbox.addEventListener("dragover", uploadDragover, false);
        dropbox.addEventListener("drop", uploadDrop, false);

    } else {
        $('#wml010DragArea').hide();
    }
}

function uploadDragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function uploadDragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function uploadDrop(e) {
  e.stopPropagation();
  e.preventDefault();

  var files = e.dataTransfer.files;
  uploadFiles(files);
}
