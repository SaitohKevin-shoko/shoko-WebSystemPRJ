$(function() {
  function changeDspAddrSeigenUseFlg() {
    var selVal = $('.js_ipAddrSeigenUseFlg:checked').val();
    if (selVal == 0) {
      $('.js_seigenSubParamRow').addClass('display_none');
    } else {
      $('.js_seigenSubParamRow').removeClass('display_none');
    }

  }
  changeDspAddrSeigenUseFlg();
  //IPアドレス制限設定変更
  $('.js_ipAddrSeigenUseFlg').on('change', function() {
    changeDspAddrSeigenUseFlg();
  });

  //例外設定 GSモバイルアプリ
  function changeMobileApiFlg() {
    var selVal = $('.js_mobilePermitFlg:checked').val();
    if (selVal == 1) {
      $('.js_mobilePermissionArea').removeClass('display_none');
    } else {
      $('.js_mobilePermissionArea').addClass('display_none');
    }
  }
  changeMobileApiFlg();
  $('.js_mobilePermitFlg').on('change', function() {
    changeMobileApiFlg();
  });

  //例外設定 GSモバイルアプリ プラグイン区分
  function changeMobileApiPluginKbn() {
    if ($("input[name='cmn390mobilePermissionKbn']:checked").val() == 0) {
      $('.js_mobilePermissionPluginArea').addClass('display_none');
    } else {
      $('.js_mobilePermissionPluginArea').removeClass('display_none');
    }
  }
  changeMobileApiPluginKbn();
  $('.js_mobilePermitPluginKbn').on('change', function() {
    changeMobileApiPluginKbn();
  });
});
