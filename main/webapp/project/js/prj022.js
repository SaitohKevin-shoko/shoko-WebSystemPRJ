function prj022BtnPush(cmd) {
    document.getElementsByName('prj022selectCategory')[0].value='';
    return buttonPush(cmd);
}

function prj022Sort(cmd, sortKbn) {
    var selectCategory = document.getElementsByName('prj022selectCategory')[0];
    selectCategory.value = '';

    var paramList = document.getElementsByName('prj022cateSlc')[0];
    if (paramList != null) {
        for (index = 0; index < paramList.length; index++) {
            if (paramList[index].selected) {
                selectCategory.value = paramList[index].value;
                break;
            }
        }

        if (sortKbn == 1) {
            selectCategory.value = parseInt(selectCategory.value) + 1;
        } else {
            selectCategory.value = parseInt(selectCategory.value) - 1;
        }
    }

    return buttonPush(cmd);
}

function prj022select() {

    document.forms[0].CMD.value = "selectList";
    document.forms[0].submit();

    return false;
}
