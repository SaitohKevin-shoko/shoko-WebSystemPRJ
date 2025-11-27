function accountConf(mode, accountSid) {
    var thisForm = document.forms['sml270Form'];
    thisForm.CMD.value = 'confAccount';
    thisForm.smlCmdMode.value = mode;
    thisForm.smlAccountSid.value = accountSid;
    thisForm.submit();
    return false;
}

function accountEdit(mode, accountSid) {
    var thisForm = document.forms['sml270Form'];
    thisForm.CMD.value = 'editAccount';
    thisForm.smlCmdMode.value = mode;
    thisForm.smlAccountSid.value = accountSid;
    thisForm.submit();
    return false;
}

function confLabel(accountId) {
    var thisForm = document.forms['sml270Form'];
    thisForm.CMD.value = 'confLabel';
    thisForm.smlAccountSid.value = accountId;
    thisForm.submit();
    return false;
}

function confFilter(accountId) {
    var thisForm = document.forms['sml270Form'];
    thisForm.CMD.value = 'confFilter';
    thisForm.smlAccountSid.value = accountId;
    thisForm.submit();
    return false;
}
