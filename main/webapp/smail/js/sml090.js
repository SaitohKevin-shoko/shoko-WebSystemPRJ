function buttonPush(cmd) {
    $('#CMD')[0].value = cmd;
    document.forms[0].submit();
    return false;
}

function changePage(id, cmd){
    if (id == 1) {
        $('#sml090page1')[0].value = $('#sml090page2')[0].value;
    }

    $('#CMD')[0].value = cmd;
    document.forms[0].submit();
    return false;
}

function moveDetail(sid, kbn, cmd) {
    $('#CMD')[0].value = cmd;
    $('#sml010SelectedSid')[0].value = sid;
    $('#sml010SelectedMailKbn')[0].value = kbn;
    document.forms[0].submit();
    return false;
}

function moveMessage(sid, cmd) {
    $('#CMD')[0].value = cmd;
    $('#sml010SelectedSid')[0].value = sid;
    document.forms[0].submit();
    return false;

}

function dispStyle() {

    $('#btnAtesakiSelect')[0].disabled = $('#radio_jushin')[0].checked;
    $('#btnAtesakiClear')[0].disabled = $('#radio_jushin')[0].checked;
    if ($('#radio_jushin')[0].checked) {
        $('#btnAtesakiSelect')[0].className = 'btn_base_disabled';
        $('#btnAtesakiClear')[0].className = 'btn_base_disabled';
    }

    $('#sml090SltGroup')[0].disabled = false;
    $('#sml090SltUser')[0].disabled = false;
if ($('#radio_soukou')[0].checked || $('#radio_soushin')[0].checked) {
    $('#sml090SltGroup')[0].disabled = true;
    $('#sml090SltUser')[0].disabled = true;

    $('#sml090SltGroup')[0].selectedIndex = 0;
    $('#sml090SltUser')[0].selectedIndex = 0;
}

//    $('#radio_gomi')[0].checked;
}

function clickSortTitle(sortValue) {

    if (document.forms[0].sml090SearchSortKey1.value == sortValue) {

        if (document.forms[0].sml090SearchOrderKey1[0].checked == true) {
            document.forms[0].sml090SearchOrderKey1[0].checked = false;
            document.forms[0].sml090SearchOrderKey1[1].checked = true;
        } else {
            document.forms[0].sml090SearchOrderKey1[1].checked = false;
            document.forms[0].sml090SearchOrderKey1[0].checked = true;
        }
    } else {
        document.forms[0].sml090SearchSortKey1.value = sortValue;
    }

//    document.forms[0].CMD.value='init';
//    document.forms[0].submit();
    return false;
}


function clearUserList(){
    $('#atesaki-part')[0].innerHTML = '&nbsp;';
}

function clearSaveUserList(){
    $('#save-atesaki-part')[0].innerHTML = '';
}

function changeChk(){

   var chkFlg;
   if (document.forms[0].allCheck.checked) {
       chkFlg = true;
   } else {
       chkFlg = false;
   }
   delAry = document.getElementsByName("sml090DelSid");
   for(i = 0; i < delAry.length; i++) {
       delAry[i].checked = chkFlg;
   }
}