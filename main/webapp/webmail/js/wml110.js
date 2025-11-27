function addLabel() {
  return configLabel(0, 0);
}

function editLabel(labelSid) {
  return configLabel(1, labelSid);
}

function configLabel(mode, labelSid) {
  var thisForm = document.forms['wml110Form'];

  thisForm.CMD.value = 'configLabel';
  thisForm.wmlLabelCmdMode.value = mode;
  thisForm.wmlEditLabelId.value = labelSid;
  thisForm.submit();

  return false;
}

function deleteLabel(labelSid) {
  var thisForm = document.forms['wml110Form'];

  thisForm.CMD.value = 'deleteLabel';
  thisForm.wmlEditLabelId.value = labelSid;
  thisForm.submit();

  return false;
}

function changeAccountCombo(){
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}

function wml110CheckLabel(labelId) {
   var labelRadio = document.forms[0].wml110SortRadio;
   for (i = 0; i < labelRadio.length; i++) {
       labelRadio[i].checked = (labelRadio[i].id == labelId);
   }
}

$(function(){
    /* radio:click */
    $(".js_tableTopCheck").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});