function deleteGaika() {
  var thisForm = document.forms['fil310Form'];

  thisForm.CMD.value = 'fil310del';
  var forcusNum = $('input[name="fil310SortRadio"]').index($(':checked'));
  var targetSid = $('input[name="fmmSid"]').eq(forcusNum).val();
  thisForm.filDelGaikaId.value = targetSid;
  thisForm.submit();

  return false;
}

$(function(){
    
    $(document).on("click", ".js_gaika", function(){
        $("input[name='fil310SortRadio']").prop("checked", false);
        $(this).find("input[name='fil310SortRadio']").prop("checked", true);
    })
})