function setShowHide() {
  changeStypeMaxDsp();
  changeStypeReloadTime();
  changeStypePhotoDsp();
  changeStypeAttachImgDsp();
}

function changeStypeMaxDsp() {
  var stype = $("input[name='sml400MaxDspStype']").val();
  if (stype == 1) {
    $('#smlMaxDspArea').show();
  } else {
    $('#smlMaxDspArea').hide();
  }
}

function changeStypeReloadTime() {
  var stype = $("input[name='sml400ReloadTimeStype']").val();
  if (stype == 1) {
    $('#smlReloadTimeArea').show();
  } else {
    $('#smlReloadTimeArea').hide();
  }
}

function changeStypePhotoDsp() {
  var stype = $("input[name='sml400PhotoDspStype']").val();
  if (stype == 1) {
    $('#smlPhotoDspArea').show();
  } else {
    $('#smlPhotoDspArea').hide();
  }
}

function changeStypeAttachImgDsp() {
  var stype = $("input[name='sml400AttachImgDspStype']").val();
  if (stype == 1) {
    $('#smlAttachImgDspArea').show();
  } else {
    $('#smlAttachImgDspArea').hide();
  }
}
