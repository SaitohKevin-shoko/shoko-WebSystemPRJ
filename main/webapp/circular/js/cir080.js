function changeEnableDisable() {

    var jbatchKbn = 0;
    var jbatchKbnVal = '';

    for (i = 0; i < document.forms[0].cir080JdelKbn.length; i++) {
        if (document.forms[0].cir080JdelKbn[i].checked == true) {
            jbatchKbn = i;
        }
    }
    jbatchKbnVal = document.forms[0].cir080JdelKbn[jbatchKbn].value;

    if (jbatchKbnVal == 0) {
        document.forms[0].cir080JYear.disabled = true;
        document.forms[0].cir080JYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].cir080JMonth.disabled = true;
        document.forms[0].cir080JMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].cir080JYear.disabled = false;
        document.forms[0].cir080JYear.style.backgroundColor = '#ffffff';
        document.forms[0].cir080JMonth.disabled = false;
        document.forms[0].cir080JMonth.style.backgroundColor = '#ffffff';
    }

    var sbatchKbn = 0;
    var sbatchKbnVal = '';

    for (i = 0; i < document.forms[0].cir080SdelKbn.length; i++) {
        if (document.forms[0].cir080SdelKbn[i].checked == true) {
            sbatchKbn = i;
        }
    }
    sbatchKbnVal = document.forms[0].cir080SdelKbn[sbatchKbn].value;

    if (sbatchKbnVal == 0) {
        document.forms[0].cir080SYear.disabled = true;
        document.forms[0].cir080SYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].cir080SMonth.disabled = true;
        document.forms[0].cir080SMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].cir080SYear.disabled = false;
        document.forms[0].cir080SYear.style.backgroundColor = '#ffffff';
        document.forms[0].cir080SMonth.disabled = false;
        document.forms[0].cir080SMonth.style.backgroundColor = '#ffffff';
    }

    var dbatchKbn = 0;
    var dbatchKbnVal = '';

    for (i = 0; i < document.forms[0].cir080DdelKbn.length; i++) {
        if (document.forms[0].cir080DdelKbn[i].checked == true) {
            dbatchKbn = i;
        }
    }
    dbatchKbnVal = document.forms[0].cir080DdelKbn[dbatchKbn].value;

    if (dbatchKbnVal == 0) {
        document.forms[0].cir080DYear.disabled = true;
        document.forms[0].cir080DYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].cir080DMonth.disabled = true;
        document.forms[0].cir080DMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].cir080DYear.disabled = false;
        document.forms[0].cir080DYear.style.backgroundColor = '#ffffff';
        document.forms[0].cir080DMonth.disabled = false;
        document.forms[0].cir080DMonth.style.backgroundColor = '#ffffff';
    }
}

function submitStyleChange() {
    document.forms[0].cir080JYear.disabled=false;
    document.forms[0].cir080JMonth.disabled=false;
    document.forms[0].cir080SYear.disabled=false;
    document.forms[0].cir080SMonth.disabled=false;
    document.forms[0].cir080DYear.disabled=false;
    document.forms[0].cir080DMonth.disabled=false;
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