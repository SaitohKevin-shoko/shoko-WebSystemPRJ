function buttonPush(cmd1,cmd2){
    document.forms[0].CMD.value=cmd1;
    document.forms[0].netSid.value=cmd2;
    document.forms[0].submit();
    return false;
}

function buttonPush2(cmd1){
    document.forms[0].CMD.value=cmd1;
    document.forms[0].submit();
    return false;
}

function ipk020ButtonPush(cmd1){
    if (cmd1 == 1) {
        document.forms[0].CMD.value = 'adminAdd';
    } else if (cmd1 == 2) {
        document.forms[0].CMD.value = 'adminDelete';
    }
    document.forms[0].submit();
    return false;
}

function changeGrp(){
    document.forms[0].CMD.value="changeGrp";
    document.forms[0].submit();
    return false;
}

function ipk020EditButtonPush(cmd1){
    document.forms[0].CMD.value=cmd1;
    document.forms[0].submit();
    return false;
}

function ipk010AddDelButtonPush(cmd1,cmd2,cmd3){
    document.forms[0].CMD.value=cmd1;
    document.forms[0].netSid.value=cmd2;
    document.forms[0].cmdButton.value=cmd3;
    document.forms[0].submit();
    return false;
}

function ipk010AddDelButtonPush2(cmd1,cmd2,cmd3,cmd4){
    document.forms[0].CMD.value=cmd1;
    document.forms[0].netSid.value=cmd2;
    document.forms[0].cmdButton.value=cmd3;
    document.forms[0].netad.value=cmd4;
    document.forms[0].submit();
    return false;
}

function ipk040ButtonPush(cmd, iadSid, returnCmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].iadSid.value=iadSid;
    document.forms[0].returnCmd.value=returnCmd;
    document.forms[0].submit();
    return false;
}

function ipk070ButtonPush(cmd, netSid, iadSid, returnCmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].ipk050NetSid.value=netSid;
    document.forms[0].iadSid.value=iadSid;
    document.forms[0].returnCmd.value=returnCmd;
    document.forms[0].submit();
    return false;
}

function ipk090ButtonPush(cmd, editMode, ismSid){
    document.forms[0].CMD.value=cmd;
    document.forms[0].editMode.value=editMode;
    document.forms[0].ismSid.value=ismSid;
    document.forms[0].submit();
    return false;
}

function pageSelect(){
    document.forms[0].CMD.value="pageSort";
    document.forms[0].iadPageNum.value="1";
    document.forms[0].submit();
    return false;
}

function changePage1() {
    document.forms[0].CMD.value='pageSelect';
    for (i = 0; i < document.forms[0].iadPage1.length; i++) {
        if (document.forms[0].iadPage1[i].selected) {
            document.forms[0].iadPageNum.value=document.forms[0].iadPage1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function changePage2() {
    document.forms[0].CMD.value='pageSelect';
    document.forms[0].iadPage1.value=document.forms[0].iadPage2.value;
    for (i = 0; i < document.forms[0].iadPage2.length; i++) {
        if (document.forms[0].iadPage2[i].selected) {
            document.forms[0].iadPageNum.value=document.forms[0].iadPage2[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function ipk070ChangePage1() {
    document.forms[0].CMD.value='ipk070PageSelect';
    for (i = 0; i < document.forms[0].ipk070Page1.length; i++) {
        if (document.forms[0].ipk070Page1[i].selected) {
            document.forms[0].ipk070PageNow.value=document.forms[0].ipk070Page1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function ipk070ChangePage2() {
    document.forms[0].CMD.value='ipk070PageSelect';
    document.forms[0].ipk070Page1.value=document.forms[0].ipk070Page2.value;
    for (i = 0; i < document.forms[0].ipk070Page2.length; i++) {
        if (document.forms[0].ipk070Page2[i].selected) {
            document.forms[0].ipk070PageNow.value=document.forms[0].ipk070Page2[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function sortOrderKey(sort, order) {
    document.forms[0].CMD.value="pageSort";
    document.forms[0].sortKey.value=sort;
    document.forms[0].orderKey.value=order;
    document.forms[0].submit();
    return false;
}

function clickSortTitle(sortValue) {

    if (document.forms[0].ipk070SearchSortKey1.value == sortValue) {

        if (document.forms[0].ipk070SearchOrderKey1[0].checked == true) {
            document.forms[0].ipk070SearchOrderKey1[0].checked = false;
            document.forms[0].ipk070SearchOrderKey1[1].checked = true;
        } else {
            document.forms[0].ipk070SearchOrderKey1[1].checked = false;
            document.forms[0].ipk070SearchOrderKey1[0].checked = true;
        }
    } else {
        document.forms[0].ipk070SearchSortKey1.value = sortValue;
    }
    document.forms[0].cmd.value="pageSort";
    document.forms[0].submit();
    return false;
}

function changeChk() {
   var chkFlg;
   if (document.forms[0].deleteAllCheck.checked) {
       checkAll('deleteCheck');

   } else {
       nocheckAll('deleteCheck');
   }
}

function fileLinkClick(bin) {
    document.forms[0].CMD.value='fileDownload';
    document.forms[0].binSid.value=bin;
    document.forms[0].submit();
    return false;
}

function ipAdrFileLinkClick(bin) {
    document.forms[0].CMD.value='ipAdrFileDownload';
    document.forms[0].binSid.value=bin;
    document.forms[0].submit();
    return false;
}

var dspFlg = 0;
function showOrHide(){
  if (dspFlg == 0) {
    hideText();
  } else {
    showText();
  }
}

function showText(){
    var item1 = $('#show');
    var item2 = $('#hide');
    item1.show();
    item2.hide();
    dspFlg = 0;
}

function hideText(){
    var item1 = $('#show');
    var item2 = $('#hide');
    item1.hide();
    item2.show();
    dspFlg = 1;
}

function changeMode(specKbn) {
    document.forms[0].CMD.value='changeMode';
    document.forms[0].specKbn.value = specKbn;
    document.forms[0].submit();
    return false;
}

function scr(num) {
    document.getElementById('Layer1').scrollTop = num;
    return false;
}

function ipk100ok() {
    document.forms[0].ipk100scroll.value = document.getElementById('Layer1').scrollTop;
    document.forms[0].CMD.value='ipk100Touroku';
    document.forms[0].submit();
    return false;
}

function scroll() {
    if (document.forms[0].ipk020ScrollFlg.value=='1') {
        window.location.hash='add_user';
    }
}

function scroll2() {
    if (document.forms[0].ipk050ScrollFlg.value=='1') {
        window.location.hash='add_user';
    }
}

/**
 * �e��ʂɖ߂�ۂɃA�N�V�����ɃR�}���h��n���ꍇ
 * cmd �R�}���h
 */
function openGroupWindowForIpkanri(formOj, selBoxName, myGpFlg, cmd) {
    if (cmd != "") {
        document.forms[0].CMD.value=cmd;
    }
    openGroup(formOj, selBoxName, myGpFlg, "");
    return;
}
