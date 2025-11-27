function showOrHide(){
  if (document.forms[0].fil030AccessKbn.length) {
      if (document.forms[0].fil030AccessKbn[0].checked == true) {
          hideText(0);
      } else {
          showText(0);
      }
  }
  if (document.forms[0].fil030CapaKbn.length) {
    if (document.forms[0].fil030CapaKbn[0].checked == true) {
        hideText(1);
    } else {
        showText(1);
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

function setVersionComboStatus() {

  if (document.forms[0].fil030PersonalFlg.value == 1) {
    document.forms[0].fil030VerKbn.disabled=false;
  } else if ($("input[name='fil030VerAllKbn'").length && document.forms[0].fil030VerAllKbn.checked) {
    document.forms[0].fil030VerKbn.disabled=false;
  } else if ($("input[name='fil030VerAllKbn'").length) {
    document.forms[0].fil030VerKbn.disabled=true;
  }
}

function cmn110Updated(cmn110, tempName, tempSaveName) {
  document.forms[0].fil030ImageName.value=tempName;
  document.forms[0].fil030ImageSaveName.value=tempSaveName;
  document.forms[0].fil030InitFlg.value='1';
  document.forms[0].submit();
}

function changeErrlAutoDsp() {
  var selected = $('input:radio[name="file030ErrlAutoKbn"]:checked').val();
  if (selected == 0) {
    $('.js_autoFolder').addClass("display_n");
  } else if (selected == 1) {
    $('.js_autoFolder').removeClass("display_n");
  }
}

function changeErrlAutoList() {

  let autoFolder1 = $('select[name="file030ErrlAutoFolder1"]').val();
  let autoFolder2 = $('select[name="file030ErrlAutoFolder2"]').val();
  if (autoFolder1 == autoFolder2) {
    autoFolder2 = 0;
    $('select[name="file030ErrlAutoFolder2"]').val(0);
  }

  let autoFolder3 = $('select[name="file030ErrlAutoFolder3"]').val();
  if (autoFolder2 == 0) {
    $('select[name="file030ErrlAutoFolder3"]').val(0);
    $('select[name="file030ErrlAutoFolder3"]').attr('disabled', 'disabled');
    autoFolder3 = 0;
  } else {
    $('select[name="file030ErrlAutoFolder3"]').removeAttr('disabled');

    if (autoFolder1 == autoFolder3 || autoFolder2 == autoFolder3) {
      $('select[name="file030ErrlAutoFolder3"]').val(0);
      autoFolder3 = 0;
    }
  }

  //上位階層で選択済みの項目を選択不可とする
  $('select[name="file030ErrlAutoFolder2"] option:not(:selected)').removeClass('display_none');
  $('select[name="file030ErrlAutoFolder3"] option:not(:selected)').removeClass('display_none');
  $('select[name="file030ErrlAutoFolder2"] option[value="' + autoFolder1 + '"]').addClass('display_none');
  $('select[name="file030ErrlAutoFolder3"] option[value="' + autoFolder1 + '"]').addClass('display_none');
  if (autoFolder2 > 0) {
    $('select[name="file030ErrlAutoFolder3"] option[value="' + autoFolder2 + '"]').addClass('display_none');
  }

  var dspText = "例：キャビネット/";
  dspText += createErrlAutoText(autoFolder1);
  dspText += createErrlAutoText(autoFolder2);
  dspText += createErrlAutoText(autoFolder3);
  dspText += "請求書.pdf";

  $('.js_autoFolderText').empty();
  $('.js_autoFolderText').append(dspText);
}

function createErrlAutoText(listValue) {
  var dspText = '';
  if (listValue == 1) {
    dspText += "2020年1月";
  } else if (listValue == 2) {
    dspText += "2020年3月";
  } else if (listValue == 3) {
    dspText += "株式会社○○○○";
  } else if (listValue == 4) {
    dspText += "開発部";
  }

  if (dspText.length > 0) {
    dspText = "<span class='cl_fontWarn'>" + dspText + "</span>/";
  }
  return dspText;
}

$(function() {
  changeErrlAutoDsp();
  changeErrlAutoList();
});