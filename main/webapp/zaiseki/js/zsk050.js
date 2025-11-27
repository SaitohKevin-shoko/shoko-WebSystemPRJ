function changeCombo(){
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}

function createUserElement(userSid) {
      id = 'elKey-' + getElementCount(1);
      setElementNameHtml(0, userSid, id);
      return false;
}

function createRsvElement(rsvSid) {
      id = 'elKey-' + getElementCount(1);
      setElementNameHtml(1, rsvSid, id);
      return false;
}

function createTxtElement() {
      msg = document.forms[0].commentValue.value;

      if (trim(msg).length < 1) {
        alert('コメントを入力してください。');
      } else {
        id = 'elKey-' + getElementCount(1);
        htmlStr = '<div id="' +
        id +
        '" class="can_drop z_index-20">' +
        '<span class="zsk_msg">' +
        msg +
        '</span></div>';
        setElementHtml(2, 0, id, htmlStr, msg);
        document.forms[0].commentValue.value = "";
      }
      return false;
}

function getElementCount(plus) {

    var objList = $(".can_drop");
    var ret = 0;
    for (i=0; i < objList.size(); i++) {
        if (parseInt(objList[i].getAttribute("id").substring(6)) > ret) {
            ret = objList[i].getAttribute("id").substring(6);
        }
    }
    return parseInt(ret) + parseInt(plus);
}

function trim(argValue){
    return String(argValue).replace(/^[ 　]*/gim, "").replace(/[ 　]*$/gim, "");

}

function cmn110Updated(){
    document.forms[0].CMD.value = 'reload';
    document.forms[0].submit();
    return true;
}

