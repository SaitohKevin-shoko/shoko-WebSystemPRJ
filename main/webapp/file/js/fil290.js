function showOrHide(){
  if (document.forms[0].fil290CabinetUseKbn.length) {
      if (document.forms[0].fil290CabinetUseKbn[0].checked == true) {
          $('#rowCabinetAuth').removeClass('display_none');
          $('#rowCapaKbn').removeClass('display_none');
          $('#rowVerKbn').removeClass('display_none');
          hideText(0);
      } else {
          $('#rowCabinetAuth').addClass('display_none');
          $('#rowCapaKbn').addClass('display_none');
          $('#rowVerKbn').addClass('display_none');
          showText(0);
      }
  }
  if (document.forms[0].fil290CabinetAuthKbn.length) {
      if (document.forms[0].fil290CabinetAuthKbn[0].checked == true) {
          hideText(1);
      } else {
          showText(1);
      }
  }
  if (document.forms[0].fil290CapaKbn.length) {
    if (document.forms[0].fil290CapaKbn[0].checked == true) {
        hideText(2);
    } else {
        showText(2);
    }
  }
}
function showText(index){
    var item1 = $('#show' + index);
    var item2 = $('#hide' + index);
    item1.removeClass('display_none');
    item2.addClass('display_none');
}

function hideText(index){
    var item1 = $('#show' + index);
    var item2 = $('#hide' + index);
    item1.addClass('display_none');
    item2.removeClass('display_none');
}
