$(function() {
    if ($("#cir110JdelKbn_0").is(":checked")) {
        $(".cir110JYear").prop("disabled", true);
        $(".cir110JMonth").prop("disabled", true);
    } else {
        $(".cir110JYear").prop("disabled", false);
        $(".cir110JMonth").prop("disabled", false);
    }

    if ($("#cir110SdelKbn_0").is(":checked")) {
        $(".cir110SYear").prop("disabled", true);
        $(".cir110SMonth").prop("disabled", true);
    } else {
        $(".cir110SYear").prop("disabled", false);
        $(".cir110SMonth").prop("disabled", false);
    }

    if ($("#cir110DdelKbn_0").is(":checked")) {
        $(".cir110DYear").prop("disabled", true);
        $(".cir110DMonth").prop("disabled", true);
    } else {
        $(".cir110DYear").prop("disabled", false);
        $(".cir110DMonth").prop("disabled", false);
    }
});

function cirDispState(kbnElem, yearElem, monthElem) {

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