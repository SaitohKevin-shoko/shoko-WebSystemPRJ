function checkedGroup() {

    if (parent.document.forms[0].selectgroup == null || parent.document.forms[0].selectgroup.value.length == 0) {

    } else {
        list = parent.document.forms[0].selectgroup.value.split(',');
        for(i=0; i<list.length; i++) {
            groupAry = document.getElementsByName('c1');
            for(j=0; j < groupAry.length; j++) {
                if (groupAry[j].value == list[i]) {
                    groupAry[j].checked = true;
                }
            }
        }
    }

    if (parent.document.forms[0].elements["disabledGroups"] != undefined) {

        dgroupValue = parent.document.forms[0].elements["disabledGroups"].value;
        var cnt = 0;
        var dgrpArray = new Array(dgroupValue.length);
        var dbufNumStr = "";
        for (i = 0; i < dgroupValue.length; i++) {
            if (',' == dgroupValue.charAt(i)) {
                dgrpArray[cnt] = dbufNumStr;
                cnt = cnt + 1;
                dbufNumStr = "";
                continue;
            }
            dbufNumStr = dbufNumStr + dgroupValue.charAt(i);
        }
        dgrpArray[cnt] = dbufNumStr;
        cnt = cnt + 1;
        dgrpArray[cnt] = "EOF";

        dsizeAry = document.getElementsByName("c1");
        for(i=0; i<dsizeAry.length; i++) {
            for (j=0; j < dgrpArray.length && dgrpArray[j] != "EOF"; j++) {
                if(dsizeAry[i].value == dgrpArray[j]){
                    dsizeAry[i].disabled = true;
                    break;
                }
            }
        }
    }

    if (parent.document.forms[0].scrollPosition) {
        window.scroll(0, parent.document.forms[0].scrollPosition.value);
    }

    return false;
}

function checkedGroupSub(sid){
    groupAry = document.getElementsByName('c1');
    for(i=0; i < groupAry.length; i++) {
        if (groupAry[i].value == sid) {
            groupAry[i].checked = true;
        }
    }
    return false;
}

function onParentSubmit(gsid){
    parent.document.forms[0].scrollPosition.value = document.body.scrollTop;
    parent.document.forms[0].selectgsid.value = gsid;
    parent.document.forms[0].CMD.value = 'selectgroup';
    parent.document.forms[0].submit();
    return false;
}