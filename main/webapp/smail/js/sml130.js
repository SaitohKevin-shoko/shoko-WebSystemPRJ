function changeEnableDisable() {

    var jbatchKbn = 0;
    var jbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml130JdelKbn.length; i++) {
        if (document.forms[0].sml130JdelKbn[i].checked == true) {
            jbatchKbn = i;
        }
    }
    jbatchKbnVal = document.forms[0].sml130JdelKbn[jbatchKbn].value;

    if (jbatchKbnVal == 0) {
        document.forms[0].sml130JYear.disabled = true;
        document.forms[0].sml130JYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml130JMonth.disabled = true;
        document.forms[0].sml130JMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml130JYear.disabled = false;
        document.forms[0].sml130JYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml130JMonth.disabled = false;
        document.forms[0].sml130JMonth.style.backgroundColor = '#ffffff';
    }

    var sbatchKbn = 0;
    var sbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml130SdelKbn.length; i++) {
        if (document.forms[0].sml130SdelKbn[i].checked == true) {
            sbatchKbn = i;
        }
    }
    sbatchKbnVal = document.forms[0].sml130SdelKbn[sbatchKbn].value;

    if (sbatchKbnVal == 0) {
        document.forms[0].sml130SYear.disabled = true;
        document.forms[0].sml130SYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml130SMonth.disabled = true;
        document.forms[0].sml130SMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml130SYear.disabled = false;
        document.forms[0].sml130SYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml130SMonth.disabled = false;
        document.forms[0].sml130SMonth.style.backgroundColor = '#ffffff';
    }

    var wbatchKbn = 0;
    var wbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml130WdelKbn.length; i++) {
        if (document.forms[0].sml130WdelKbn[i].checked == true) {
            wbatchKbn = i;
        }
    }
    wbatchKbnVal = document.forms[0].sml130WdelKbn[wbatchKbn].value;

    if (wbatchKbnVal == 0) {
        document.forms[0].sml130WYear.disabled = true;
        document.forms[0].sml130WYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml130WMonth.disabled = true;
        document.forms[0].sml130WMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml130WYear.disabled = false;
        document.forms[0].sml130WYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml130WMonth.disabled = false;
        document.forms[0].sml130WMonth.style.backgroundColor = '#ffffff';
    }

    var dbatchKbn = 0;
    var dbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml130DdelKbn.length; i++) {
        if (document.forms[0].sml130DdelKbn[i].checked == true) {
            dbatchKbn = i;
        }
    }
    dbatchKbnVal = document.forms[0].sml130DdelKbn[dbatchKbn].value;

    if (dbatchKbnVal == 0) {
        document.forms[0].sml130DYear.disabled = true;
        document.forms[0].sml130DYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml130DMonth.disabled = true;
        document.forms[0].sml130DMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml130DYear.disabled = false;
        document.forms[0].sml130DYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml130DMonth.disabled = false;
        document.forms[0].sml130DMonth.style.backgroundColor = '#ffffff';
    }
}

function submitStyleChange() {
    document.forms[0].sml130JYear.disabled=false;
    document.forms[0].sml130JMonth.disabled=false;
    document.forms[0].sml130SYear.disabled=false;
    document.forms[0].sml130SMonth.disabled=false;
    document.forms[0].sml130WYear.disabled=false;
    document.forms[0].sml130WMonth.disabled=false;
    document.forms[0].sml130DYear.disabled=false;
    document.forms[0].sml130DMonth.disabled=false;
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