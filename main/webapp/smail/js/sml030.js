function buttonPush(cmd) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function fileLinkClick(cmd, binSid) {

    document.forms[0].CMD.value=cmd;
    document.forms[0].sml030binSid.value=binSid;
    document.forms[0].submit();
    return false;

}

$(function() {

    if ($('input:hidden[name=sml030PrevNextFlg]').val() == 1) {

        $('#noMailData').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 160,
            modal: true,
            overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
            },
            buttons: {
              OK: function() {
                $(this).dialog('close');
              }
            }
        });

    }

});