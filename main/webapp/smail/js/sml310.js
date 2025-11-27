function addLabel() {
  return configLabel(0, 0);
}

function editLabel(labelSid) {
  return configLabel(1, labelSid);
}

function configLabel(mode, labelSid) {
  var thisForm = document.forms['sml310Form'];

  thisForm.CMD.value = 'configLabel';
  thisForm.smlLabelCmdMode.value = mode;
  thisForm.smlEditLabelId.value = labelSid;
  thisForm.submit();

  return false;
}

function deleteLabel(labelSid) {
  var thisForm = document.forms['sml310Form'];

  thisForm.CMD.value = 'deleteLabel';
  thisForm.smlEditLabelId.value = labelSid;
  thisForm.submit();

  return false;
}

function changeAccountCombo(){
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}

function sml310CheckLabel(labelId) {
   var labelRadio = document.forms[0].sml310SortRadio;
   for (i = 0; i < labelRadio.length; i++) {
       labelRadio[i].checked = (labelRadio[i].id == labelId);
   }
}
