$(function() {
    if ($("#sml150JdelKbn_0").is(":checked")) {
        $(".sml150JYear").prop("disabled", true);
        $(".sml150JMonth").prop("disabled", true);
    } else {
        $(".sml150JYear").prop("disabled", false);
        $(".sml150JMonth").prop("disabled", false);
    }

    if ($("#sml150SdelKbn_0").is(":checked")) {
        $(".sml150SYear").prop("disabled", true);
        $(".sml150SMonth").prop("disabled", true);
    } else {
        $(".sml150SYear").prop("disabled", false);
        $(".sml150SMonth").prop("disabled", false);
    }

    if ($("#sml150WdelKbn_0").is(":checked")) {
        $(".sml150WYear").prop("disabled", true);
        $(".sml150WMonth").prop("disabled", true);
    } else {
        $(".sml150WYear").prop("disabled", false);
        $(".sml150WMonth").prop("disabled", false);
    }

    if ($("#sml150DdelKbn_0").is(":checked")) {
        $(".sml150DYear").prop("disabled", true);
        $(".sml150DMonth").prop("disabled", true);
    } else {
        $(".sml150DYear").prop("disabled", false);
        $(".sml150DMonth").prop("disabled", false);
    }
});

function smlDispState(kbnElem, yearElem, monthElem) {

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