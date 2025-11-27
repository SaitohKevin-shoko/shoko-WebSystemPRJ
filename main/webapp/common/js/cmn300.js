function dispChange() {
  $(".js_sch").addClass("display_n");
  $(".js_bbs").addClass("display_n");
  $(".js_sml").addClass("display_n");
  $(".js_rsv").addClass("display_n");
  $(".js_ntp").addClass("display_n");
  $(".js_cir").addClass("display_n");
  $(".js_wml").addClass("display_n")
  $(".js_fil").addClass("display_n");
  $(".js_rng").addClass("display_n");
  $(".js_enq").addClass("display_n")
  $(".js_cht").addClass("display_n");
  $(".js_mem").addClass("display_n");
  $(".js_tab_tr").removeClass("cmnSetting_sideMenu borC_light cmnSetting_sideMenu-select bgC_Body borC_body borC_body borBottomC_light borTopC_light border_top_none border_bottom_none");
  $(".js_tab_tr").addClass("cmnSetting_sideMenu borC_light");
  $(".js_tab_img").removeClass("cmnSetting_menuIcon cmnSetting_menuIcon-select");
  $(".js_tab_img").addClass("cmnSetting_menuIcon");
}

function settingDelete() {
  var paramStr = "";
  var cnt = 0;
  $(".js_delForm").each(function(){
    if (cnt != 0) {
      paramStr += '&';
    } 
    paramStr += getFormData($(this));
    cnt++;
  });
  paramStr = paramStr + '&CMD=update';
  updateConf(paramStr);
}

var commitFlg = false;
function updateConf(paramStr) {
  if (commitFlg) {
    return;
  }
  commitFlg = true;
  $.ajax({
    async: true,
    url:  "../common/cmn300.do",
    type: "post",
    data: paramStr
  }).done(function( data ) {
    $(".js_errorMsg").html("");
    if (data["success"]){
      toastMsgChange(true);
      displayToast("cmn300");
    } else if (data["errors"]) {
      errorMsg(data);
    } else {
      toastMsgChange(false);
      displayToast("cmn300");
    }
    commitFlg = false;
  });
}

function toastMsgChange(success) {

  if (!success) {
    $(".js_toastMessage").text(msglist_cmn['cmn.error']);
  } else {
      $(".js_toastMessage").text(msglist_cmn['cmn.auto.del.ok']);
  }
}

function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();
    return formData;
}

function errorMsg(data) {
    for (var i = 0; i < data["size"]; i++) {
        $(".js_errorMsg").append("<div>" + data["errorMsg_" + i] + "</div>");
    }
}

//要素のリサイズイベント
$(document).ready(function() {
  var observer = new MutationObserver(function() {
    //リサイズ時の処理
    $('.js_listTable').outerHeight($('.js_dispArea').outerHeight());
  });
  //監視対象の要素
  var target = $(".js_dispArea").get(0);
  //監視時のオプション
  var config = {
    attributes: true,
    subtree: true
  };
  //監視の開始
  observer.observe(target, config);
});

$(function(){
  var pldId = $(".js_panel:first").find("input[name='plgId']").val();
  $("input[name='helpPrm']").val(pldId);
  $(".js_panel:first").removeClass("display_n");
  $('.js_dispArea').outerHeight();
  $('.js_tab_tr:first').addClass("cmnSetting_sideMenu-select border_top_none bgC_Body borC_body borC_body borBottomC_light borTopC_light");
  $('.js_tab_tr:first').removeClass("cmnSetting_sideMenu borC_light");
  $('.js_tab_tr:first').find(".js_tab_img").addClass("cmnSetting_menuIcon-select");
  $('.js_tab_tr:first').find(".js_tab_img").removeClass("cmnSetting_menuIcon");

  $(document).on("click", ".js_tab_tr",function(){
    dispChange();
    commitFlg = false;
    $(this).addClass("cmnSetting_sideMenu-select bgC_Body borC_body borC_body borBottomC_light borTopC_light");
    $(this).removeClass("cmnSetting_sideMenu borC_light");
    $(this).find(".js_tab_img").addClass("cmnSetting_menuIcon-select");
    $(this).find(".js_tab_img").removeClass("cmnSetting_menuIcon");
    var plugin = $(this).attr('id');
    if (plugin == "statsSch") {
      $(".js_sch").removeClass("display_n");
      pldId = $(".js_sch").find("input[name='plgId']").val();
    } else if (plugin == "statsBbs") {
      $(".js_bbs").removeClass("display_n");
      pldId = $(".js_bbs").find("input[name='plgId']").val();
    } else if (plugin == "statsSml") {
      $(".js_sml").removeClass("display_n");
      pldId = $(".js_sml").find("input[name='plgId']").val();
    } else if (plugin == "statsRsv") {
      $(".js_rsv").removeClass("display_n");
      pldId = $(".js_rsv").find("input[name='plgId']").val();
    } else if (plugin == "statsNtp") {
      $(".js_ntp").removeClass("display_n");
      pldId = $(".js_ntp").find("input[name='plgId']").val();
    } else if (plugin == "statsCir") {
      $(".js_cir").removeClass("display_n");
      pldId = $(".js_cir").find("input[name='plgId']").val();
    } else if (plugin == "statsWml") {
      $(".js_wml").removeClass("display_n");
      pldId = $(".js_wml").find("input[name='plgId']:first").val();
    } else if (plugin == "statsRng") {
      $(".js_rng").removeClass("display_n");
      pldId = $(".js_rng").find("input[name='plgId']").val();
   } else if (plugin == "statsEnq") {
      $(".js_enq").removeClass("display_n");
      pldId = $(".js_enq").find("input[name='plgId']").val();
    } else if (plugin == "statsCht") {
      $(".js_cht").removeClass("display_n");
      pldId = $(".js_cht").find("input[name='plgId']").val();
    } else if (plugin == "statsMem") {
      $(".js_mem").removeClass("display_n");
      pldId = $(".js_mem").find("input[name='plgId']").val();
    }
    $("input[name='helpPrm']").val(pldId);

    if ($(".js_tab_tr:first").attr('id') == $(this).attr('id')) {
      $(this).addClass("border_top_none");
    }
  });

});


function changeWmlTab(tabNo) {
  /* WMLタブ変更 */
  var taisyo1;
  var taisyo2;
  var tab1;
  var tab2;
  if (tabNo == 1) {
    taisyo1 = $('.js_wmlContent1');
    taisyo2 = $('.js_wmlContent2');
    tab1 = $('.js_wmlTab1');
    tab2 = $('.js_wmlTab2');
  } else {
    taisyo1 = $('.js_wmlContent2');
    taisyo2 = $('.js_wmlContent1');
    tab1 = $('.js_wmlTab2');
    tab2 = $('.js_wmlTab1');
  }
  var pldId = taisyo1.find("input[name='plgId']").val();
  $("input[name='helpPrm']").val(pldId);
  taisyo1.removeClass('display_none');
  taisyo2.addClass('display_none');
  tab1.removeClass('tabHeader_tab-off');
  tab1.addClass('tabHeader_tab-on');
  tab1.addClass('bgI_none');
  tab1.addClass('border_bottom_none');

  tab2.removeClass('tabHeader_tab-on');
  tab2.removeClass('bgI_none');
  tab2.removeClass('border_bottom_none');
  tab2.addClass('tabHeader_tab-off');
}