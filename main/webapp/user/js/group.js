function getSelectGroup(){
    groupAry = grpFrame.document.getElementsByName('c1');
    var ckFlg = 0;
    var parmBuf = "";
    for(i=0; i<groupAry.length; i++) {
        if (groupAry[i].checked == true) {
            parmBuf = parmBuf + groupAry[i].value + ',';
            ckFlg = 1;
        }
    }
    if (ckFlg == 1) {
        parmBuf = parmBuf.substr(0, parmBuf.length -1);
    }
    document.forms[0].selectgroup.value = parmBuf;
    return false;
}
function onAllUnCheck(){
        sizeAry = grpFrame.document.getElementsByName('c1');
        for(i=0; i<sizeAry.length; i++) {
           sizeAry[i].checked = false;
        }
    return false;
}
function onAllCheck(){
    sizeAry = grpFrame.document.getElementsByName('c1');
    for(i=0; i<sizeAry.length; i++) {
        sizeAry[i].checked = true;
    }
    return false;
}