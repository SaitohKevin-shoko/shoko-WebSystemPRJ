
function logLevelCheck(rowName, detailCheckName, rowNum){

    if (document.getElementsByName(rowName + '[' + rowNum + '].' + detailCheckName)[0].checked) {
        document.getElementsByName(rowName + '[' + rowNum + '].' + detailCheckName)[0].checked = false;
    } else {
        document.getElementsByName(rowName + '[' + rowNum + '].' + detailCheckName)[0].checked = true;
    }

    return false;
}
