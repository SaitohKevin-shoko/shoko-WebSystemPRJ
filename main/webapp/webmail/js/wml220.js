function addFilter() {
  return configFilter(0, 0);
}

function editFilter(filterSid) {
  return configFilter(1, filterSid);
}

function configFilter(mode, filterSid) {
  var thisForm = document.forms['wml220Form'];

  thisForm.CMD.value = 'configFilter';
  thisForm.wmlFilterCmdMode.value = mode;
  thisForm.wmlEditFilterId.value = filterSid;
  thisForm.submit();

  return false;
}

function deleteFilter(filterSid) {
  var thisForm = document.forms['wml220Form'];

  thisForm.CMD.value = 'deleteFilter';
  thisForm.wmlEditFilterId.value = filterSid;
  thisForm.submit();

  return false;
}

function changeAccountCombo(){
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}

function wml220CheckFilter(filterId) {
   var filterRadio = document.forms[0].wml220SortRadio;
   for (i = 0; i < filterRadio.length; i++) {
       filterRadio[i].checked = (filterRadio[i].id == filterId);
   }
}

$(function(){
    /* radio:click */
    $(".js_tableTopCheck").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});