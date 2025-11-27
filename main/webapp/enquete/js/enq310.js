// 対象人数クリック
function enq310Taisyo(cmd, mode) {
    document.forms[0].CMD.value = cmd;
    document.forms[0].enq320viewMode.value = mode;
    document.forms[0].submit();
    return false;
}

function enq310Detail(seq) {
    document.forms[0].enq310selectQue.value = seq;
    return buttonPush('enq310detail');
}

function enq310DetailSelect(seq, ans) {
    document.forms[0].enq310selectQue.value = seq;
    document.forms[0].enq330ans.value = ans;
    document.forms[0].enq330svAns.value = ans;
    return buttonPush('enq310detail');
}
