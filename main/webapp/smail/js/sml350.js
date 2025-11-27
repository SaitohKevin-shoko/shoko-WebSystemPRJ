function addFilter() {
  return configFilter(0, 0);
}

function editFilter(filterSid) {
  return configFilter(1, filterSid);
}

function configFilter(mode, filterSid) {
  var thisForm = document.forms['sml350Form'];

  thisForm.CMD.value = 'configFilter';
  thisForm.smlFilterCmdMode.value = mode;
  thisForm.smlEditFilterId.value = filterSid;
  thisForm.submit();

  return false;
}

function deleteFilter(filterSid) {
  var thisForm = document.forms['sml350Form'];

  thisForm.CMD.value = 'deleteFilter';
  thisForm.smlEditFilterId.value = filterSid;
  thisForm.submit();

  return false;
}

function changeAccountCombo(){
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}

function sml350CheckFilter(filterId) {
   var filterRadio = document.forms[0].sml350SortRadio;
   for (i = 0; i < filterRadio.length; i++) {
       filterRadio[i].checked = (filterRadio[i].id == filterId);
   }
}
