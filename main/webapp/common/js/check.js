function chgCheckAll(allChkName, chkName) {
  if (document.getElementsByName(allChkName)[0].checked) {
      checkAll(chkName);
  } else {
      nocheckAll(chkName);
  }
}

function checkAll(chkName){

   chkAry = document.getElementsByName(chkName);
   for(i = 0; i < chkAry.length; i++) {
       chkAry[i].checked = true;
   }
}

function nocheckAll(chkName){

   chkAry = document.getElementsByName(chkName);
   for(i = 0; i < chkAry.length; i++) {
       chkAry[i].checked = false;
   }
}
