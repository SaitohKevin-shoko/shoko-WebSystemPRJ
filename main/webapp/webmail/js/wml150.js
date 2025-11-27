function changeAcntMakeKbn(acntMakeKbn) {
  if(acntMakeKbn == 1){
    $('#settingServerArea').removeClass('display_none');
  } else {
    $('#settingServerArea').addClass('display_none');
  }
}

function changeInputDiskSize(diskHnt) {
  var ctext = $('#lmtinput1');

  if(diskHnt == 1){
    $('#inputDiskSize').removeClass('display_none');

    if (!document.forms[0].wml150permitKbn[1].checked) {
      $('#inputDiskSize2').addClass('display_none');
      ctext.addClass('display_none');
    } else {
      $('#inputDiskSize2').removeClass('display_none');
      ctext.removeClass('display_none');
      changeDefLabel();
    }
  } else if(diskHnt == 0) {
    $('#inputDiskSize').addClass('display_none');
    $('#inputDiskSize2').addClass('display_none');

    if (document.forms[0].wml150permitKbn[1].checked) {
        ctext.removeClass('display_none');
    }
  }
}

function changeAutoRsvTime(autoTimeKbn) {
  if(autoTimeKbn == 1){
    $('#autoRsvTime').removeClass('display_none');
  } else if(autoTimeKbn == 0) {
    $('#autoRsvTime').addClass('display_none');
  }
}

function lmtEnableDisable() {
    var impInputSize = 10;

    if (document.forms[0].wml150permitKbn[1].checked) {
        for (cnt = 1; cnt <= impInputSize; cnt++) {
          $('#lmtinput' + cnt).removeClass('display_none');
        }

        if ($('#disk2').is(':checked')) {
          $('#inputDiskSize2').removeClass('display_none');
          changeDefLabel();
        }
    } else {
        for (cnt = 1; cnt <= impInputSize; cnt++) {
            $('#lmtinput' + cnt).addClass('display_none');
        }

        $('#inputDiskSize2').addClass('display_none');
    }
}

function changeDefLabel() {
    var ctext = $('#lmtinput1');

    if (!document.forms[0].wml150permitKbn[1].checked) {
        ctext.addClass('display_none');

    } else {
        if ($('#sizeComp').is(':checked')) {
            ctext.addClass('display_none');
        } else {
            ctext.removeClass('display_none');
        }
    }
}

function changeSendMaxSize(hnt) {
    if (hnt == 1){
    $('#sendMaxSize').show();
    $('#sendMaxSizeCmt').show();
  } else {
    $('#sendMaxSize').hide();
    $('#sendMaxSizeCmt').hide();
  }
}

function changeFwLimit(fwLimitKbn) {
  if (fwLimitKbn == 1){
    $('#fwLimitArea').show();
    $('#fwLimitDeleteArea').hide();
  } else if (fwLimitKbn == 2){
    $('#fwLimitArea').hide();
    $('#fwLimitDeleteArea').show();
  } else {
    $('#fwLimitArea').hide();
    $('#fwLimitDeleteArea').hide();
  }
}

function changeTldLimit(tldLimitKbn) {
  if (tldLimitKbn == 1){
    $('#tldLimitArea').show();
  } else {
    $('#tldLimitArea').hide();
  }
}

function changeCompressFile(value) {
  if (value == 2) {
    $('#compressDefArea').show();
  } else {
    $('#compressDefArea').hide();
  }
}

function changeTimesent(value) {
  if (value == 2) {
    $('#timeSentDefArea').show();
  } else {
    $('#timeSentDefArea').hide();
  }
}

function wml150changeBcc(bcc) {
  if (bcc == 1){
    $('#bccThresholdArea').show();
    $('#bccThresholdCmtArea').show();
  } else {
    $('#bccThresholdArea').hide();
    $('#bccThresholdCmtArea').hide();
  }
}

function wml150changeWarnDisk(warnDisk) {
  if (warnDisk == 1){
    $('#warnDiskThresholdArea').show();
    $('#warnDiskThresholdCmtArea').show();
  } else {
    $('#warnDiskThresholdArea').hide();
    $('#warnDiskThresholdCmtArea').hide();
  }
}

function wml150Init(acntMakeKbn, moreKbn, inputDiskKbn, rsvTimeKbn, maxSizeSendKbn, fwLimitKbn, fwLimitCheck, bcc, warnDisk, tldLimitKbn) {
  lmtEnableDisable();
  changeAcntMakeKbn(acntMakeKbn);
  changeInputDiskSize(inputDiskKbn);
  changeAutoRsvTime(rsvTimeKbn);
  changeDefLabel();
  changeSendMaxSize(maxSizeSendKbn);
  wml150changeBcc(bcc);
  wml150changeWarnDisk(warnDisk);
  changeFwLimit(fwLimitKbn);
  if (fwLimitCheck == 1) {
    var targetOffset = $('#fwLimitLine').offset().top;
    $('html,body').animate({scrollTop: targetOffset},50);
  }
  changeTldLimit(tldLimitKbn);
}

function initTabClass() {
    var tabIdx;
    for (tabIdx = 1; tabIdx <= 2; tabIdx++) {
        $('#tab' + tabIdx + '_table').addClass('display_none');
        $('#tab' + tabIdx ).addClass('tabHeader_tab-off');
        $('#tab' + tabIdx ).removeClass('tabHeader_tab-on');
        $('#tab' + tabIdx ).removeClass('tabHeader_tab-on');
        $('#tab' + tabIdx ).removeClass('bgI_none');
    }
}

$(function(){
  /* タブ変更 */
  $('.js_tab').live("click", function(){
      initTabClass();

      var showId = $(this).attr('id');
      $('#' + showId + '_table').removeClass('display_none');
      $('#' + showId).removeClass('tabHeader_tab-off');
      $('#' + showId).addClass('tabHeader_tab-on');
      $('#' + showId).addClass('bgI_none');

      if (showId == 'tab2') {
          document.forms[0].wml150elementKbn.value = 1;
      } else {
          document.forms[0].wml150elementKbn.value = 0;
      }
  });


  initTabClass();

  var tabId = '';
  var checkValue = document.forms[0].wml150elementKbn.value;
  if (checkValue == 0) {
      tabId = 'tab1'; //基本情報
  } else {
      tabId = 'tab2'; //詳細設定
  }

  initTabClass();
  $('#' + tabId).removeClass('tabHeader_tab-off');
  $('#' + tabId).addClass('tabHeader_tab-on');
  $('#' + tabId).addClass('bgI_none');
  $('#' + tabId + '_table').removeClass('display_none');
});
