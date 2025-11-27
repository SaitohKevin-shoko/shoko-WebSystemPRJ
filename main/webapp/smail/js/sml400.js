function setShowHide() {
  changeStypeMaxDsp();
  changeStypeReloadTime();
  changeStypePhotoDsp();
  changeStypeAttachImgDsp();
}

function changeStypeMaxDsp() {
  var check = $("input[name='sml400MaxDspStype']:checked").val();
  if (check == 1) {
    $('#smlMaxDspArea').show();
  } else {
    $('#smlMaxDspArea').hide();
  }
}

function changeStypeReloadTime() {
  var check = $("input[name='sml400ReloadTimeStype']:checked").val();
  if (check == 1) {
    $('#smlReloadTimeArea').show();
  } else {
    $('#smlReloadTimeArea').hide();
  }
}

function changeStypePhotoDsp() {
  var check = $("input[name='sml400PhotoDspStype']:checked").val();
  if (check == 1) {
    $('#smlPhotoDspArea').show();
  } else {
    $('#smlPhotoDspArea').hide();
  }
}

function changeStypeAttachImgDsp() {
  var check = $("input[name='sml400AttachImgDspStype']:checked").val();
  if (check == 1) {
    $('#smlAttachImgDspArea').show();
  } else {
    $('#smlAttachImgDspArea').hide();
  }
}
