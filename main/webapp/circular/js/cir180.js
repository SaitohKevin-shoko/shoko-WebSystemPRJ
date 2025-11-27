function getForm() {
    return document.forms['cir180Form'];
}

function accountConf(mode, accountSid) {
    getForm().CMD.value = 'confAccount';
    getForm().cirCmdMode.value = mode;
    getForm().cirAccountSid.value = accountSid;
    getForm().submit();
    return false;
}

function accountEdit(mode, accountSid) {
    getForm().CMD.value = 'editAccount';
    getForm().cirCmdMode.value = mode;
    getForm().cirAccountSid.value = accountSid;
    getForm().submit();
    return false;
}

function confLabel(accountSid) {
    getForm().CMD.value = 'confLabel';
    getForm().cirAccountSid.value = accountSid;
    getForm().submit();
    return false;
}

$(function(){
    /* radio:click */
    $(".js_tableTopCheck").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});