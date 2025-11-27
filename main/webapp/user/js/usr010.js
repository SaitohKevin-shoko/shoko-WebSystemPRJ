//OnClickにて処理区分を変更する
function usr010ChahgeProcess(pform, exekbn) {
    pform.CMD.value = exekbn;
    pform.usr010grpmode.value = exekbn;

}

//iframeのフォーラムのラジオボタンを取得する
function getChgctg(){
    //カテゴリ階層画面の値を設定する。
    if (document.forms[0].CMD.value == 'edit' || document.forms[0].CMD.value == 'uview') {
        sizeAry = ctgFrame.document.getElementsByName('c1');
        for(i=0;i<sizeAry.length;i++) {
            if(sizeAry[i].checked){
                document.forms[0].usr010grpSid.value = sizeAry[i].value;
                document.forms[0].submit();
            }
        }
    }
    document.forms[0].submit();
}

function usr010Submit(cmd) {
    document.forms[0].CMD.value=cmd;
    for (i=1; i< document.all.c1.length(); i++) {
    confirm (document.all.c1[i].checked);
        if (document.all.c1[i].checked) {
            document.forms[0].usr010grpSid.value = document.all.c1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function exportExecute(){
    if (document.forms[0].grpCsvOut.value==1) {
        url = "../user/usr010.do?CMD=exp_ok&grpCsvOut=1";
        navframe.location=url;
    }
}