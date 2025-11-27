function fil080ShowOrHide(){
  if (document.forms[0].fil080AccessKbn.length) {
      if (document.forms[0].fil080AccessKbn[0].checked == true) {
          fil080HideText(0);
      } else {
          fil080ShowText(0);
      }
  }
}
function fil080ShowText(index){
    var item1 = $('#show' + index);
    var item2 = $('#hide' + index);
    item1.removeClass('display_none');
    item2.addClass('display_none');
}

function fil080HideText(index){
    var item1 = $('#show' + index);
    var item2 = $('#hide' + index);
    item1.addClass('display_none');
    item2.removeClass('display_none');
}

function parentAccessShowOrHide(flg){
    if (flg == 1) {
        showClassText(0);
    } else {
        hideClassText(0);
    }
    document.forms[0].fil080ParentAccessAll.value = flg;
}

function showClassText(index){
    var item1 = $('.show' + index);
    var item2 = $('.hide' + index);
    item1.removeClass('display_none');
    item2.addClass('display_none');
}

function hideClassText(index){
    var item1 = $('.show' + index);
    var item2 = $('.hide' + index);
    item1.addClass('display_none');
    item2.removeClass('display_none');
}

function changeTradeMoneyKbn() {
  const moneyDisabled = $('.js_tradeMoneyKbn').prop('checked');
  $('.js_tradeMoney').prop('disabled', moneyDisabled);
  $('.js_tradeMoneyMaster').prop('disabled', moneyDisabled);
}

function changeSelectCabinet(cmd) {
  $('input[name="fil010SelectDirSid"]').val('');
  $('input[name="fil010SelectCabinet"]').val('');
  $('input[name="fil070ParentDirSid"]').val('');
  $('.js_selectCabinetCombo').val(0);
  $('input[name="selectDir"]').val('');
  buttonPush(cmd);
}

function fil080Delete(fileName, errlKbn) {
    let fileNameList = new Array();
    fileNameList.push(fileName);
    showFileDeleteDialog('fil080Form', 'fil080delete', fileNameList, errlKbn, true);
}

$(function() {
  changeTradeMoneyKbn();
});
