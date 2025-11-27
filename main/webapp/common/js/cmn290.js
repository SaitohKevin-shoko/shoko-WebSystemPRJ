function dispChange() {
  $(".js_sch").addClass("display_n");
  $(".js_bbs").addClass("display_n");
  $(".js_rsv").addClass("display_n");
  $(".js_ntp").addClass("display_n");
  $(".js_cir").addClass("display_n");
  $(".js_fil").addClass("display_n");
  $(".js_rng").addClass("display_n");
  $(".js_tab_tr").removeClass("cmnSetting_sideMenu borC_light cmnSetting_sideMenu-select bgC_Body borC_body borC_body borBottomC_light borTopC_light border_top_none border_bottom_none");
  $(".js_tab_tr").addClass("cmnSetting_sideMenu borC_light");
  $(".js_tab_img").removeClass("cmnSetting_menuIcon cmnSetting_menuIcon-select");
  $(".js_tab_img").addClass("cmnSetting_menuIcon");
}

var commitFlg = false;
function settingSml() {
  if (commitFlg) {
    return;
  }
  commitFlg = true;
  var paramStr = "";
  for (var i = 0; i < $(".js_smailSetting").length; i++) {
	if (i != 0) {
      paramStr += "&";
	}
	paramStr += getFormData($(".js_smailSetting").eq(i));
  }
  paramStr = paramStr + '&CMD=update';
  $.ajax({
    async: true,
    url:  "../common/cmn290.do",
    type: "post",
    data: paramStr
  }).done(function( data ) {
    if (data["success"]){
      delErrMsg();
      toastMsgChange(true);
      displayToast("cmn290");
    } else if (data["errors"]) {
      errorMsg(data);
    } else {
      delErrMsg();
      toastMsgChange(false);
      displayToast("cmn290");
    }
    commitFlg = false;
  });
}

function accountChange(pluginId, combo) {

  var paramStr = "";
  paramStr += getFormData($(combo.form));
  paramStr = paramStr + '&CMD=accountChange';
  paramStr = paramStr + '&pluginId='+pluginId;
  $.ajax({
    async: true,
    url:  "../common/cmn290.do",
    type: "post",
    data: paramStr,
    datatype: 'html'
  }).done(function( data ) {
    if (pluginId == 'circular') {
        $('.js_cir').children().remove();
        $('.js_cir').append(data);
    } else if (pluginId == 'nippou') {
        $('.js_ntp').children().remove();
        $('.js_ntp').append(data);
    }
  });
}

function userGrpComponent(cmd, pluginId, component) {

  var paramStr = "";
  paramStr += getFormData($(component.form));
  paramStr = paramStr + '&CMD='+cmd;
  paramStr = paramStr + '&pluginId='+pluginId;
  $.ajax({
    async: true,
    url:  "../common/cmn290.do",
    type: "post",
    data: paramStr,
    datatype: 'html'
  }).done(function( data ) {

    if (pluginId == 'nippou') {
        $('.js_ntp').children().remove();
        $('.js_ntp').append(data);
    }
  });
}

function toastMsgChange(success) {

  if (!success) {
      $(".js_toastMessage").text(msglist_cmn['cmn.error']);
  } else {
      $(".js_toastMessage").text(msglist_cmn['cmn.sml.ok']);
  }
}

function errorMsg(data) {
    delErrMsg();
    for (var i = 0; i < data["size"]; i++) {
        $(".js_errorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
    }
}

function delErrMsg() {
    $(".js_errorArea").html("");
}

function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
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
    } else if (plugin == "statsRsv") {
      $(".js_rsv").removeClass("display_n");
      pldId = $(".js_rsv").find("input[name='plgId']").val();
    } else if (plugin == "statsNtp") {
      $(".js_ntp").removeClass("display_n");
      pldId = $(".js_ntp").find("input[name='plgId']").val();
    } else if (plugin == "statsCir") {
      $(".js_cir").removeClass("display_n");
      pldId = $(".js_cir").find("input[name='plgId']").val();
    } else if (plugin == "statsFil") {
      $(".js_fil").removeClass("display_n");
      pldId = $(".js_fil").find("input[name='plgId']").val();
    } else if (plugin == "statsRng") {
      $(".js_rng").removeClass("display_n");
      pldId = $(".js_rng").find("input[name='plgId']").val();
    }
    $("input[name='helpPrm']").val(pldId);

    if ($(".js_tab_tr:first").attr('id') == $(this).attr('id')) {
      $(this).addClass("border_top_none");
    }
  });
});
