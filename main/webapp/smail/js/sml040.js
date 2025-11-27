function setShowHide() {
  changeStypeMaxDsp();
  changeStypeReloadTime();
  changeStypePhotoDsp();
  changeStypeAttachImgDsp();
}

function changeStypeMaxDsp() {
  var stype = $("input[name='sml040MaxDspStype']").val();
  if (stype == 0) {
    $('#smlMaxDspArea').show();
  } else {
    $('#smlMaxDspArea').hide();
  }
}

function changeStypeReloadTime() {
  var stype = $("input[name='sml040ReloadTimeStype']").val();
  if (stype == 0) {
    $('#smlReloadTimeArea').show();
  } else {
    $('#smlReloadTimeArea').hide();
  }
}

function changeStypePhotoDsp() {
  var stype = $("input[name='sml040PhotoDspStype']").val();
  if (stype == 0) {
    $('#smlPhotoDspArea').show();
  } else {
    $('#smlPhotoDspArea').hide();
  }
}

function changeStypeAttachImgDsp() {
  var stype = $("input[name='sml040AttachImgDspStype']").val();
  if (stype == 0) {
    $('#smlAttachImgDspArea').show();
  } else {
    $('#smlAttachImgDspArea').hide();
  }
}
