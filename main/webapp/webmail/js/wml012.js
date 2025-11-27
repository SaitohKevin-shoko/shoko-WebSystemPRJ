function wml012checkAll(checkName) {
    var checkList = document.getElementsByName(checkName);
    for (idx = 0; idx < checkList.length; idx++) {
        checkList[idx].checked = true;
    }
    return false;
}