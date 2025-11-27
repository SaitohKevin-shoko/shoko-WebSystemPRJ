function addTemplate() {
	return configTemplate(0, 0);
}

function editTemplate(templateSid) {
  return configTemplate(1, templateSid);
}

function configTemplate(mode, templateSid) {
  var thisForm = document.forms['wml240Form'];

  thisForm.CMD.value = 'configTemplate';
  thisForm.wmlTemplateCmdMode.value = mode;
  thisForm.wmlEditTemplateId.value = templateSid;
  thisForm.submit();

  return false;
}

function deleteTemplate(templateSid) {
  var thisForm = document.forms['wml240Form'];

  thisForm.CMD.value = 'deleteTemplate';
  thisForm.wmlEditTemplateId.value = templateSid;
  thisForm.submit();

  return false;
}

function wml240CheckTemplate(templateId) {
   var templateRadio = document.forms[0].wml240SortRadio;
   for (i = 0; i < templateRadio.length; i++) {
       templateRadio[i].checked = (templateRadio[i].id == templateId);
   }
}

$(function(){
    /* radio:click */
    $(".js_tableTopCheck").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});