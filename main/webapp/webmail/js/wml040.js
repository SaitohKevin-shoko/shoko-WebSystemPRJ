function change(usrKbn, accountMode) {
    if (accountMode == 2) {
        if(usrKbn == 0){
            $('#permissionGroup').removeClass('display_none');
            $('#permissionUser').addClass('display_none');
        }else if(usrKbn == 1){
            $('#permissionGroup').addClass('display_none');
            $('#permissionUser').removeClass('display_none');
        }
    }
}

function changeInputDiskSize(diskHnt) {
  if (diskHnt == 1) {
      $('#inputDiskSize').removeClass('display_none');
  } else if(diskHnt == 0) {
      $('#inputDiskSize').addClass('display_none');
  }
}

function changeAutoRsvTime(autoTimeKbn) {
  if (document.getElementById("autoRsvTime")) {
    if(autoTimeKbn == 1){
        $('#autoRsvTime').removeClass('display_none');
    } else if(autoTimeKbn == 0) {
        $('#autoRsvTime').addClass('display_none');
    }
  }
}

function changeSendServerAuth(auth) {
  $('#wml040sendServerUser')[0].disabled = (auth != 1);
  $('#wml040sendServerPassword')[0].disabled = (auth != 1);
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

function initDiskArea(adminUserFlg) {
    var permitKbn = document.getElementsByName('wml040PermitKbn')[0].value;
    var diskSizeComp = document.getElementsByName('wml040diskSizeComp')[0].value;
    if (permitKbn == 0 || diskSizeComp == 1) {
        if (adminUserFlg) {
            changeDiskSps();
        } else {
            setDiskLimitArea(0);
        }
    } else {
        setDiskLimitArea(1);
    }
}

function changeDiskSps() {
    if (document.getElementsByName('wml040diskSps')[0].checked) {
        setDiskLimitArea(1);
    } else {
        setDiskLimitArea(0);
    }
}

function setDiskLimitArea(diskKbn) {
    if (diskKbn == 1) {
        $('#diskSizeInputArea').show();
        $('#diskSizeViewArea').hide();
    } else {
        $('#diskSizeInputArea').hide();
        $('#diskSizeViewArea').show();
    }
}

function initTabClass() {

    var tabIdx;
    for (tabIdx = 1; tabIdx <= 4; tabIdx++) {
        $('#tab' + tabIdx + '_table').addClass('display_none');
        $('#tab' + tabIdx).addClass('tabHeader_tab-off');
        $('#tab' + tabIdx).removeClass('tabHeader_tab-on');
        $('#tab' + tabIdx).removeClass('bgI_none');
    }
}


function changeAuthMethod() {
    if ($('input:radio[name=wml040authMethod]:checked').val() == 1) {
        $('.js_BaseAuth').addClass('display_none');
        $('.js_OAuth').removeClass('display_none');
    } else {
        $('.js_BaseAuth').removeClass('display_none');
        $('.js_OAuth').addClass('display_none');
    }
}

$(function () {
    /* タブ変更 */
    $(document).on('click', '.js_tab', function() {
        initTabClass();

        var showId = $(this).attr('id');
        $('#' + showId + '_table').removeClass('display_none');
        $('#' + showId).removeClass('tabHeader_tab-off');
        $('#' + showId).addClass('tabHeader_tab-on');
        $('#' + showId).addClass('bgI_none');

        if (showId == 'tab2') {
            document.forms[0].wml040elementKbn.value = 1;
        } else if (showId == 'tab3') {
            document.forms[0].wml040elementKbn.value = 2;
        } else if (showId == 'tab4') {
            document.forms[0].wml040elementKbn.value = 3;
        } else {
            document.forms[0].wml040elementKbn.value = 0;
        }
    });

    var tabId = '';
    var checkValue = document.forms[0].wml040elementKbn.value;
    if (checkValue == 0) {
        tabId = 'tab1'; //基本情報
    } else if (checkValue == 1) {
        tabId = 'tab2'; //署名情報
    } else if (checkValue == 2) {
        tabId = 'tab3'; //送受信設定
    } else {
        tabId = 'tab4'; //その他
    }

    initTabClass();
    $('#' + tabId).removeClass('tabHeader_tab-off');
    $('#' + tabId).addClass('tabHeader_tab-on');
    $('#' + tabId).addClass('bgI_none');
    $('#' + tabId + '_table').removeClass('display_none');

});
