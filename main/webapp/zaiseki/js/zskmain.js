function editZaiseki(cmd){
    //frm.CMD.value=cmd;
    document.forms['zskmainForm'].CMD.value=cmd;
    document.forms['zskmainForm'].submit();
    return false;
}

function updateZsk(cmd) {

  var status = "0"
  var zskUioStatus = document.getElementsByName("zskUioStatus");
  var sts_zaiseki = document.forms['zskmainForm'].ZAISEKI.value;
  var sts_huzai = document.forms['zskmainForm'].HUZAI.value;
  var sts_sonota = document.forms['zskmainForm'].SONOTA.value;
  for(var i=0;i<zskUioStatus.length;i++) {
      if (zskUioStatus[i].checked && zskUioStatus[i].value == sts_zaiseki) {
          status = sts_zaiseki;
      } else if (zskUioStatus[i].checked && zskUioStatus[i].value == sts_huzai) {
          status = sts_huzai;
      } else if (zskUioStatus[i].checked && zskUioStatus[i].value == sts_sonota){
          status = sts_sonota;
      }
  }

  $('#zaiseki_zskmain').load('../zaiseki/zskmain.do', {
    CMD: cmd,
    zskUioStatus: status,
    zskUioBiko: document.forms['zskmainForm'].zskUioBiko.value,
    mainReDspFlg: "0"
  });

  if ($('#zaiseki_zskmaingrp')) {
      updateZskGrp('init');
  }
}
