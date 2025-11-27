var winWidth=1000,
    winHeight=900,
    wmlSubWindow,
    wmlFlagSubWindow = false;

var wmlEditorFocusParamName;

function openAddress(paramName) {
    var url = '../address/adr010.do?adr010webmail=1&adr010webmailAddress=' + paramName;
    return openEditorSubWindow(url);
}

function openSyain(paramName) {
    var url = '../user/usr040.do?usr040webmail=1&usr040webmailAddress=' + paramName;
    return openEditorSubWindow(url);
}

function openSyainPlus(paramName) {
    var url = '../user/usr040.do?usr040webmail=1&usr040webmailAddress=' + paramName;
    url += '&usr040webmailType=1';
    return openEditorSubWindow(url);
}

function openDestlist(destlistId) {
    if (!isOpenEditor()) {
        //メール作成ボタンクリック
        $('.js_headMenuAddBtn').click();
        wmlEditorFocusParamName = 'wml010sendAddressTo';
    }

    openDestlistSubWindow(destlistId, wmlEditorFocusParamName);
}

function openDestlistSubWindow(destlistId, paramName) {
    var url = '../webmail/wml290.do?wmlEditDestList=' + destlistId + ' &wml290webmailAddress=' + paramName;
    return openEditorSubWindow(url);
}

function openEditorSubWindow(url) {
    if ($(window).height() - 20 < 900) {
        winHeight = $(window).height() - 20;
        if (winHeight < 100) {
            winHeight = 100;
        }
    }

    var winx = getWmlCenterX(winWidth);
    var winy = getWmlCenterY(winHeight);
    var newWinOpt = "width=" + winWidth + ", height=" + winHeight + ", toolbar=no ,scrollbars=yes, resizable=yes, left=" + winx + ", top=" + winy;

    if (!wmlFlagSubWindow || (wmlFlagSubWindow && wmlSubWindow.closed)) {
        wmlSubWindow = window.open(url, 'thissite', newWinOpt);
        smlFlagSubWindow = true;
    } else {
        wmlSubWindow.location.href=url;
        wmlSubWindow.focus();
        return;
    }

    return false;
}

function wmlEditorWindowClose(){
    if(wmlSubWindow != null){
        wmlSubWindow.close();
    }
}

function wmlAfterNewWinOpenUser(win){
    win.moveTo(0,0);
    wmlSubWindow.focus();
    return;
}

function getWmlCenterX(winWidth) {
    var x = (screen.width - winWidth) / 2;
    return x;
}

function getWmlCenterY(winHeight) {
    var y = (screen.height - winHeight) / 2;
    return y;
}

function openEntryAddress(mailNum) {
    var url = '../address/adr020.do?adr020webmail=1&adr020webmailId=' + mailNum;
    openEntrySubWindow(url);
}

function openEntrySmail() {
    var url = '../smail/sml010.do?CMD=calledWebmail&sml020webmail=1&sml020webmailId=' + getParamValue('wml010shareMailNum');
    $('#shareMailPop').dialog('close');
    openEntrySubWindow(url);
}

function openEntryCircular() {
    var url = '../circular/cir040.do?CMD=calledWebmail&cir040webmailId=' + getParamValue('wml010shareMailNum');
    $('#shareMailPop').dialog('close');
    openEntrySubWindow(url);
}

function openEntryFilekanri() {
    var url = '../file/fil080.do?CMD=calledWebmail&fil080webmailId=' + getParamValue('wml010shareMailNum');
    $('#shareMailPop').dialog('close');
    openEntrySubWindow(url);
}

function openDestlistDialog(txtName) {
    setEditorFocus(txtName);
    openDestlist(0);
}

function openEntrySubWindow(url) {
    wmlSubWindowPop(url);
}

function webmailEntrySubWindowClose() {
    $('#wmlSubWindowPop').dialog('close');
}

function getEditorFocus() {
    return wmlEditorFocusParamName;
}

function setEditorFocus(paramName) {
    wmlEditorFocusParamName = paramName;
}


function setEditorTempFile(fileData) {
    if ($("#composeTempFile").find("#wmlsendTempfileCompress").length == 0
        && $("#attachmentFileListArea1").find("span").length == 0) {
        if (getParamValue('compressFileType') == 1) {
            var compressCheck = '';
            if (getParamValue('compressFilePlan') != 0) {
                if (getParamValue('compressFilePlan') == 2) {
                    compressCheck = ' checked';
                }
            } else if (getParamValue('compressFileDef') == 2) {
                compressCheck = ' checked';
            }

            $('#composeTempFile').prepend(
                '<span class=\"verAlignMid\">'
                + '<input type=\"checkbox\" id=\"wmlsendTempfileCompress\" name=\"wml010sendTempfileCompress\" value=\"1\"' + compressCheck + '>'
                + '<label for=\"wmlsendTempfileCompress\">' + msglist["wmlAutoCompress"]
                + '</label></span>'
            );
        }
    }

    var tempDirId = "";
    if (getTempDirId()) {
        tempDirId = getTempDirId();
    }

    var dlUrl = '../webmail/wml010.do?CMD=sendFileDownload'
        + '&wmlViewAccount=' + getAccount()
        + '&wml010sendMailDownloadFile='
        + fileData.saveFileName
        + '&wml010tempDirId='
        + tempDirId
        + '&wml010smlShareFlg=' + getShareFlg()
        + '&wml010smlShareCloseFlg=' + getShareCloseFlg()
        + '&wml010smlShareTemp=' + getTempShareId();


    $('#attachmentFileListArea1').append(
        '<div id=\"sendFile_' + fileData.saveFileName + '\" name=\"sendMailFile\" class=\"display_flex mt5\">'
        + '<div class=\"tempfile verAlignMid\">'
        + '<file-preview url="' + dlUrl + '" filename="' + fileData.fileName + '">'
        + '<img class="classic-display" src="../common/images/classic/icon_temp_file_2.png" ' + msglist_wml010['cmn.attach.file'] + '>'
        + '<img class="original-display" src="../common/images/original/icon_attach.png" ' + msglist_wml010['cmn.attach.file'] + '>'
        + '<a href="#!" class="ml5" onclick="tempDownload(\''
        + dlUrl
        + '\');'
        + '" name="sendFile_Links">'
        + fileData.fileName + '&nbsp(' + fileData.fileSize + ')'
        + '</a>'
        + '<img class="classic-display cursor_p ml5" src="../common/images/classic/icon_delete.png"'
        + 'onClick=\"sendMailFileDelete(\'' + fileData.saveFileName + '\', \'' + tempDirId + '\');\">'
        + '<img class="original-display cursor_p ml5" src="../common/images/original/icon_delete.png"'
        + 'onClick=\"sendMailFileDelete(\'' + fileData.saveFileName + '\', \'' + tempDirId + '\');\">'
        + '</file-preview>'
        + '</div></div>'
    );

    var confirmId = 'sendFile_confirm_' + fileData.saveFileName;
    var confirmName = confirmId + '_check';
    var checkFileRow = '<span id=\"' + confirmId + '\">';
    if (getParamValue('wml010checkFile') == 1) {
        checkFileRow +=  '<input type=\"checkbox\" name=\"sendFile_confirm_check\" id=\"' + confirmName + '\">&nbsp;';
    }
    checkFileRow +=  '&nbsp;<label for=\"' + confirmName + '\" class=\"tempfile\">'
    + fileData.fileName + '&nbsp(' + fileData.fileSize + ')'
    + '</label><br></span>';

    $("#checkFileArea").append(checkFileRow);

    $('#composeTempFile').removeClass('display_none');
    document.getElementById('fileDrop_Overlay').style.filter = 'opacity(0)';
    document.getElementById('fileDrop_Overlay').style.visibility = 'hidden';
    $(".fileDrop-Overlay").height(0);
    $(".fileDrop-Overlay").width(0);
}
