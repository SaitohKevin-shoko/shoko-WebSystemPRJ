function onChildAllChecked(gsid, dirlevel){
    var start = 0;
    var num1 = parseInt(dirlevel);
    var num2 = 0;
    sizeAry = document.getElementsByName("c1");
    for(i=0; i<sizeAry.length; i++) {
        num2 = parseInt(sizeAry[i].className);
        if (num1 >= num2) {
            start = 0;
        }
        if (sizeAry[i].value == gsid && sizeAry[i].checked == true) {
            start = 1;
        }
        if (start == 1 && sizeAry[i].disabled == false) {
          sizeAry[i].checked = true;
        }
    }

    if (document.forms[0].parentName.value == 'usr031'
    || document.forms[0].parentName.value == 'usr032') {
        defaultGroup();
    }
}

function defaultGroup() {

    var beforeDefGrpLen = parent.document.forms[0].usr031defgroup.options.length;

    //チェックされたグループを取得する
    var groupAry = document.getElementsByName('c1');
    var checkGroup = new Object;
    var checkGroupIndex = 0;

    for(i = 0; i < groupAry.length; i++) {
        if ((groupAry[i].checked == true) && (groupAry[i].value != '0')) {
            checkGroup[checkGroupIndex] = groupAry[i].value;
            checkGroupIndex++;
        }
    }

    //チェックされたグループ以外�のデフォルトグループを非表示にする
    var defValue = parent.document.forms[0].usr031defgroup.value;

    var defGroupAry = parent.document.forms[0].usr031defgroup.options;
    var defLength = defGroupAry.length;
    for (i = defLength - 1; i >= 0; i--) {
        if (defGroupAry[i].value != -1) {
            defGroupAry[i] = null;
        }
    }

    var defId = parent.document.forms[0].defGrpId;
    var defName = parent.document.forms[0].defGrpNm;
    if (defId.length == null) {
        defGroupAry[defGroupAry.length] = new Option(defName.value, defId.value);
    } else {
        for (i = 0; i < defId.length; i++) {
            defGroupAry[defGroupAry.length] = new Option(defName[i].value, defId[i].value);
        }
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
                parent.document.forms[0].usr031defgroup.value = defValue;
                defGroupAry[defIdx].selected = true;
            }
        }
    }

    if (beforeDefGrpLen == 1 && parent.document.forms[0].usr031defgroup.options.length > 1) {
        parent.document.forms[0].usr031defgroup.options[0].selected = false;
        parent.document.forms[0].usr031defgroup.options[1].selected = true;
    }
}