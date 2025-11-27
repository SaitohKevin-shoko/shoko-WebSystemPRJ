function buttonPush(cmd){
    if (cmd == 1) {
        document.forms[0].CMD.value='template';
    } else if (cmd == 2) {
        document.forms[0].CMD.value='backAdmTool';
    } else if (cmd == 3) {
        document.forms[0].CMD.value='add';
    } else if (cmd == 4) {
        document.forms[0].CMD.value='delHol';
    } else if (cmd == 5) {
        document.forms[0].CMD.value='beforeYear';
    } else if (cmd == 6) {
        document.forms[0].CMD.value='nextYear';
    } else if (cmd == 7) {
        document.forms[0].CMD.value='csv';
    }

    document.forms[0].submit();
    return false;
}

function editHol(holDate){
    document.forms[0].CMD.value='edit';
    document.forms[0].editHolDate.value=holDate;
    document.forms[0].submit();
    return false;
}

$(function() {
  $('.js_tableTopCheck-header').live("change",function() {
    chgCheckAll('man020CheckAll', 'holDate');
  });
});