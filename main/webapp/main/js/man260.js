function changeEnableDisable() {

    var jbatchKbn = 0;
    var jbatchKbnVal = '';

    for (i = 0; i < document.forms[0].man260BatchKbn.length; i++) {
        if (document.forms[0].man260BatchKbn[i].checked == true) {
            jbatchKbn = i;
        }
    }
    jbatchKbnVal = document.forms[0].man260BatchKbn[jbatchKbn].value;

    if (jbatchKbnVal == 0) {
        document.forms[0].man260Year.disabled = true;
        document.forms[0].man260Year.style.backgroundColor = '#e0e0e0';
        document.forms[0].man260Month.disabled = true;
        document.forms[0].man260Month.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].man260Year.disabled = false;
        document.forms[0].man260Year.style.backgroundColor = '#ffffff';
        document.forms[0].man260Month.disabled = false;
        document.forms[0].man260Month.style.backgroundColor = '#ffffff';
    }
}

function setDispState(kbnElem, yearElem, monthElem) {

    for (i = 0; i < kbnElem.length; i++) {
        if (kbnElem[i].checked == true) {
            batchKbn = i;
        }
    }
    batchKbnVal = kbnElem[batchKbn].value;

    if (batchKbnVal == 0) {
        yearElem.disabled = true;
        yearElem.style.backgroundColor = '#e0e0e0';
        monthElem.disabled = true;
        monthElem.style.backgroundColor = '#e0e0e0';
    } else {
        yearElem.disabled = false;
        yearElem.style.backgroundColor = '#ffffff';
        monthElem.disabled = false;
        monthElem.style.backgroundColor = '#ffffff';
    }
}