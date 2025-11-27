function getForm() {
    return document.forms['cir230Form'];
}

function addLabel() {
  return configLabel(0, 0);
}

function editLabel(labelSid) {
  return configLabel(1, labelSid);
}

function configLabel(mode, labelSid) {
  getForm().CMD.value = 'configLabel';
  getForm().cir230LabelCmdMode.value = mode;
  getForm().cir230EditLabelId.value = labelSid;
  getForm().submit();
  return false;
}

function deleteLabel(labelSid) {
  getForm().CMD.value = 'deleteLabel';
  getForm().cir230EditLabelId.value = labelSid;
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