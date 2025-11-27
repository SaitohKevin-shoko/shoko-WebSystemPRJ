function showOrHide() {
  if (document.getElementsByName('ptl050accessKbn').length) {

      if (document.getElementsByName('ptl050accessKbn')[0].checked) {
          $('#userCombo').addClass("display_n");
      } else {
          $('#userCombo').removeClass("display_n");
      }
  }
}


function selectAccessList(){
  var flg = document.getElementsByName('acAllSlt')[0].checked;
  oElements = document.getElementsByName('ptl050SelectRightUser');

  var defUserAry = document.forms[0].ptl050SelectRightUser.options;
  var defLength = defUserAry.length;

  for (i = defLength - 1; i >= 0; i--) {
    if (defUserAry[i].value != -1) {
      defUserAry[i].selected = flg;
    }
  }
}