function setDisp() {
    setInputStatus('man270failCount', $('#lockKbn1')[0].checked);
    setInputStatus('man270failTime', $('#lockKbn1')[0].checked);
    setInputStatus('man270lockTime', $('#lockKbn1')[0].checked);
}

function setInputStatus(paramName, disabled) {
    if (disabled) {
        document.getElementsByName(paramName)[0].disabled = true;
        document.getElementsByName(paramName)[0].style.backgroundColor = '#e0e0e0';
    } else {
        document.getElementsByName(paramName)[0].disabled = false;
        document.getElementsByName(paramName)[0].style.backgroundColor = '#ffffff';
    }
}

function setDispConfirm() {
    if (document.getElementsByName('man270lockKbn')[0].value == 0) {
        $('#confRow2').hide();
        $('#confRow3').hide();
        $('#confRow4').hide();
        $('#confRow5').hide();
    } else {
        $('#confRow2').show();
        $('#confRow3').show();
        $('#confRow4').show();
        $('#confRow5').show();
    }
}
