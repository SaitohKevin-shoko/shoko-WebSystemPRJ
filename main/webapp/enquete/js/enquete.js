// ボタンクリック
function buttonPush(cmd){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

// 添付ファイルクリック
function fileLinkClickBin(binSid){
    fileLinkClick(binSid, 0, "", 0);
}
// 添付ファイルクリック
function fileLinkClick(binSid, dspMode, dirKbn) {
    fileLinkClick(binSid, dspMode, "", dirKbn);
}

/**
 * <p>添付ファイルクリック
 * @param binSid バイナリSID
 * @param dspMode 0:回答モード、1:プレビューモード
 * @param tempDir テンポラリディレクトリ名
 * @param dirKbn 0:アンケート情報のテンポラリディレクトリ、1:設問情報のテンポラリディレクトリ
 * @returns {}
 */
function fileLinkClick(binSid, dspMode, tempDir, dirKbn){

    var wk;
    if (dspMode == 0) {
        wk = 'conf';
    } else if (dspMode == 1) {
        wk = 'getPreTempFile';
    }

    document.forms[0].CMD.value=wk;
    document.forms[0].enq110DownloadFlg.value='1';
    document.forms[0].enq110BinSid.value=binSid;
    document.forms[0].enq110TempDir.value=tempDir;
    document.forms[0].enq110PreTempDirKbn.value=dirKbn;
    document.forms[0].submit();
    return false;
}

// プレビュー時の添付ファイルクリック
function filePreLinkClick(binSid){

    document.forms[0].CMD.value='getPreTempFile';
    document.forms[0].enq110DownloadFlg.value='1';
    document.forms[0].enq110BinSid.value=binSid;
    document.forms[0].submit();
    return false;
}

// 添付画像
function initImageView() {
    var objImg = document.getElementsByName('enqImgName');
    for (i = 0; i < objImg.length; i++) {
        if (objImg[i].width > 500) {
            objImg[i].width = 500;
        }
    }
}

/* ラジオボタン（添付）のイベント 仮メソッド */
function changeTemp() {

    radio = document.getElementsByName('temp01');

    if (radio[0].checked) {
        document.getElementById('s1_temp').style.display = "none";
        document.getElementById('s1_url').style.display = "none";
    } else if (radio[1].checked || radio[2].checked) {
        document.getElementById('s1_temp').style.display = "block";
        document.getElementById('s1_url').style.display = "none";
    } else {
        document.getElementById('s1_temp').style.display = "none";
        document.getElementById('s1_url').style.display = "block";
    }
}

/* 重要度 */
function changeJuuyou(){

    juuyou = document.getElementsByName('enq210Juuyou');

    document.getElementById('star_1').style.display = "none";
    document.getElementById('star_2').style.display = "none";
    document.getElementById('star_3').style.display = "none";

    if (juuyou[0].checked) {
        document.getElementById('star_1').style.display = "block";
    } else if(juuyou[1].checked) {
        document.getElementById('star_2').style.display = "block";
    } else {
        document.getElementById('star_3').style.display = "block";
    }
}
function changeJuuyou2(juuyou) {

    document.getElementById('star_1').style.display = "none";
    document.getElementById('star_2').style.display = "none";
    document.getElementById('star_3').style.display = "none";

    if (juuyou == 1) {
        document.getElementById('star_2').style.display = "block";
    } else if (juuyou == 2) {
        document.getElementById('star_3').style.display = "block";
    } else {
        document.getElementById('star_1').style.display = "block";
    }
}

// 日付コンボの切り替え
function moveDay(elmYear, elmMonth, elmDay, kbn) {

    systemDate = new Date();

    if (kbn == 2) {
        $(elmYear).val(convYear(systemDate.getYear()));
        $(elmMonth).val(systemDate.getMonth() + 1);
        $(elmDay).val(systemDate.getDate());
        return;
    }

    if (kbn == 1 || kbn == 3) {

        var ymdf = escape(elmYear.value + '/' + elmMonth.value + "/" + elmDay.value);
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

            newDate = new Date(elmYear.value, elmMonth.value - 1, elmDay.value)

            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getYear());
            var systemYear = convYear(systemDate.getYear());

            if (newYear < systemYear - 20 || newYear > systemYear + 20) {
                $(elmYear).val('');
            } else {
                $(elmYear).val(newYear);
            }
            $(elmMonth).val(newDate.getMonth() + 1);
            $(elmDay).val(newDate.getDate());

        } else {

            if (elmYear.value == '' && elmMonth.value == '' && elmDay.value == '') {
                $(elmYear).val(convYear(systemDate.getYear()));
                $(elmMonth).val(systemDate.getMonth() + 1);
                $(elmDay).val(systemDate.getDate());
            }
        }
    }
}