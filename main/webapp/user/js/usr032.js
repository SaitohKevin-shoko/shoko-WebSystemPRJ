function buttonSubmit(cmd){
    document.forms[0].CMD.value = cmd;
    document.forms[0].submit();
    return false;
}

function changeTab(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].csvOut.value='0';
    document.forms[0].submit();
    return false;
}

function defaultGroup() {

    var groupAry = grpFrame.document.getElementsByName('c1');
    var checkGroup = new Object;
    var checkGroupIndex = 0;

    for(i = 0; i < groupAry.length; i++) {
        if (groupAry[i].checked == true) {
            if (groupAry[i].value == 0) {
                continue;
            }
            checkGroup[checkGroupIndex] = groupAry[i].value;
            checkGroupIndex++;
        }
    }

    var defValue = document.forms[0].usr031defgroup.value;

    var defGroupAry = document.forms[0].usr031defgroup.options;
    var defLength = defGroupAry.length;
    for (i = defLength - 1; i >= 0; i--) {
        if (defGroupAry[i].value != -1) {
            defGroupAry[i] = null;
        }
    }

    var defId = document.forms[0].defGrpId;
    var defName = document.forms[0].defGrpNm;
    for (i = 0; i < defId.length; i++) {
        defGroupAry[defGroupAry.length] = new Option(defName[i].value, defId[i].value);
    }

    var defLength = defGroupAry.length;
    for (defIdx = defLength - 1; defIdx >= 0; defIdx--) {
        if (defGroupAry[defIdx].value == -1) {
            continue;
        }

        var remove = true;
        for (chkIdx = 0; chkIdx < checkGroupIndex; chkIdx++) {
            if (checkGroup[chkIdx] == defGroupAry[defIdx].value) {
                remove = false;
                break;
            }
        }

        if (remove == true) {
            if (defValue == defGroupAry[defIdx].value) {
                defValue = -1;
            }
            defGroupAry[defIdx] = null;
        } else {
            if (defValue == defGroupAry[defIdx].value) {
                document.forms[0].usr031defgroup.value = defValue;
                defGroupAry[defIdx].selected = true;
            }
        }
    }
}

function lmtEnableDisable() {
    var ctext = $('#lmtinput')[0];
    var updateFlg = document.getElementsByName("usr032updateFlg");
    var updatePassFlg = document.getElementsByName("usr032updatePassFlg");

    if (updateFlg[0].checked) {
        ctext.setAttribute('class', 'usr_description_checkBox_dsp');
    } else {
        ctext.setAttribute('class', 'usr_description_checkBox_notdsp');
        updatePassFlg[0].checked = false;
    }
}

function cmn110Updated(){
    document.forms[0].CMD.value = 'reload';
    document.forms[0].submit();
    return true;
}
