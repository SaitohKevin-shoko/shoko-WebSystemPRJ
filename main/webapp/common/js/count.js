
function showLengthId(id, maxLength, dspId) {
   var str = $(id).val();
   if (str != null) {
       showLengthStr(str, maxLength, dspId);
   }
   return null;
}


function showLengthStr(str, maxLength, dspId) {

  if (str != null) {
      var repStr = str.replace(/(\r\n)/g, "12");
      repStr = repStr.replace(/(\n|\r)/g, "34");
      var obj = document.getElementById(dspId);
      obj.innerHTML = repStr.length;

      if (repStr.length > maxLength) {
          obj.setAttribute('class', 'formCounter_over');
      } else {
          obj.setAttribute('class', 'formCounter');
      }
  }

  return null;
}

function showCountStr(str, dspId) {

  if (str != null) {
      var repStr = str.replace(/(\r\n)/g, "12");
      repStr = repStr.replace(/(\n|\r)/g, "34");
      document.getElementById(dspId).innerHTML = repStr.length;

      var str2 = $(dspId);
      str2.setAttribute('class', 'formCounter');
  }
}
