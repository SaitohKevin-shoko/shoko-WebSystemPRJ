function showOrHide(){
  if (document.forms[0].sch097RepeatKbn.length) {
      if (document.forms[0].sch097RepeatKbn[1].checked == true) {
          showText();
      } else {
          hideText();
      }
  }
}
function showText(){
    var item1 = $('#show');
    var item2 = $('#hide');
    item1.show();
    item2.hide();
}

function hideText(){
    var item1 = $('#show');
    var item2 = $('#hide');
    item1.hide();
    item2.show();
}
