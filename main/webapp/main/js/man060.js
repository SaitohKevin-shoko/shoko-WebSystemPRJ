function setDisabled(value) {
    if (document.forms[0].man060warnType[1].checked == true) {
        document.forms[0].man060rate.disabled=true;
        document.forms[0].man060capacity.disabled=false;
    } else {
        document.forms[0].man060rate.disabled=false;
        document.forms[0].man060capacity.disabled=true;
    }
}
