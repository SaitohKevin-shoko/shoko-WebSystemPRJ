$(function() {

    if ($("#wadDustNo").is(":checked")) {
        $(".wml050dustYear").prop("disabled", true);
        $(".wml050dustMonth").prop("disabled", true);
        $(".wml050dustDay").prop("disabled", true);
    } else {
        $(".wml050dustYear").prop("disabled", false);
        $(".wml050dustMonth").prop("disabled", false);
        $(".wml050dustDay").prop("disabled", false);
    }

    if ($("#wadSendNo").is(":checked")) {
        $(".wml050sendYear").prop("disabled", true);
        $(".wml050sendMonth").prop("disabled", true);
        $(".wml050sendDay").prop("disabled", true);
    } else {
        $(".wml050sendYear").prop("disabled", false);
        $(".wml050sendMonth").prop("disabled", false);
        $(".wml050sendDay").prop("disabled", false);
    }


    if ($("#wadDraftNo").is(":checked")) {
        $(".wml050draftYear").prop("disabled", true);
        $(".wml050draftMonth").prop("disabled", true);
        $(".wml050draftDay").prop("disabled", true);
    } else {
        $(".wml050draftYear").prop("disabled", false);
        $(".wml050draftMonth").prop("disabled", false);
        $(".wml050draftDay").prop("disabled", false);
    }

    if ($("#wadResvNo").is(":checked")) {
        $(".wml050resvYear").prop("disabled", true);
        $(".wml050resvMonth").prop("disabled", true);
        $(".wml050resvDay").prop("disabled", true);
    } else {
        $(".wml050resvYear").prop("disabled", false);
        $(".wml050resvMonth").prop("disabled", false);
        $(".wml050resvDay").prop("disabled", false);
    }

    if ($("#wadKeepNo").is(":checked")) {
        $(".wml050keepYear").prop("disabled", true);
        $(".wml050keepMonth").prop("disabled", true);
        $(".wml050keepDay").prop("disabled", true);
    } else {
        $(".wml050keepYear").prop("disabled", false);
        $(".wml050keepMonth").prop("disabled", false);
        $(".wml050keepDay").prop("disabled", false);
    }
});

function wmlDispState(kbnElem, yearElem, monthElem, dayElem) {

    for (i = 0; i < kbnElem.length; i++) {
        if (kbnElem[i].checked == true) {
            batchKbn = i;
        }
    }
    batchKbnVal = kbnElem[batchKbn].value;

    if (batchKbnVal == 0 || batchKbnVal == 1) {
        yearElem.disabled = true;
        yearElem.style.backgroundColor = '#e0e0e0';
        monthElem.disabled = true;
        monthElem.style.backgroundColor = '#e0e0e0';
        dayElem.disabled = true;
        dayElem.style.backgroundColor = '#e0e0e0';

    } else {
        yearElem.disabled = false;
        yearElem.style.backgroundColor = '#ffffff';
        monthElem.disabled = false;
        monthElem.style.backgroundColor = '#ffffff';
        dayElem.disabled = false;
        dayElem.style.backgroundColor = '#ffffff';
    }
}