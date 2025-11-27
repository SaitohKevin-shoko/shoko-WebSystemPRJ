function addLabel() {
  return configLabel(0, 0);
}

function editLabel(labelSid) {
  return configLabel(1, labelSid);
}

function configLabel(mode, labelSid) {
  var thisForm = document.forms['mem050Form'];

  thisForm.CMD.value = 'mem050Next';
  thisForm.memLabelCmdMode.value = mode;
  thisForm.memEditLabelId.value = labelSid;
  thisForm.submit();

  return false;
}

function deleteLabel(labelSid) {
  var thisForm = document.forms['mem050Form'];

  thisForm.CMD.value = 'mem050Delete';
  thisForm.memEditLabelId.value = labelSid;
  thisForm.submit();

  return false;
}

$(function(){
    /* radio:click */
    $(document).on("click", ".js_tableTopClick", function(){
        var check = $(this).children();
        check.prop("checked", true);
    });
});