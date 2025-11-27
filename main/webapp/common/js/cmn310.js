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
  $(".js_tab_tr").removeClass("cmnSetting_sideMenu borC_light cmnSetting_sideMenu-select bgC_Body borC_body borC_body borBottomC_light borTopC_light border_top_none border_bottom_none");
  $(".js_tab_tr").addClass("cmnSetting_sideMenu borC_light");
  $(".js_tab_img").removeClass("cmnSetting_menuIcon cmnSetting_menuIcon-select");
  $(".js_tab_img").addClass("cmnSetting_menuIcon");
}

function deletePop(pluginId, btn, msg) {
    /* validateCheck */
    var paramStr = "";
    paramStr += getFormData($(btn.form));
    paramStr = paramStr + '&CMD=validateCheck';
    paramStr = paramStr + '&pluginId=' + pluginId;
    $.ajax({
      async: true,
      url:  "../common/cmn310.do",
      type: "post",
      data: paramStr
    }).done(function( data ) {
      if (data["errors"]){
        errorMsg(data, pluginId);
      } else if ( data["success"]) {
        var widthStr = 400;
        var heightStr = 'auto';
        $("#delMsgArea").html(msg);

        $('#manualDelPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: heightStr,
            width: widthStr,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: [{
              text:"O K",
              click:  function() {
                ManualDelete(pluginId, btn);
                $(this).dialog('close');
              }
            },{
              text:msglist_cmn['cmn.cancel'],
              click:  function() {
                $(this).dialog('close');
              }
            }]
        });
      }
    });
}

function deletePopWml(pluginId, btn, msg, gamenId) {
    /* validateCheck */
    var paramStr = "";
    paramStr += getFormData($(btn.form));
    paramStr = paramStr + '&CMD=validateCheck';
    paramStr = paramStr + '&pluginId=' + pluginId;
    paramStr = paramStr + '&gamenId=' + gamenId;
    $.ajax({
      async: true,
      url:  "../common/cmn310.do",
      type: "post",
      data: paramStr
    }).done(function( data ) {
      if (data["errors"]){
        errorMsg(data, pluginId, gamenId);
      } else if ( data["success"]) {
        var widthStr = 400;
        var heightStr = 'auto';
        $("#delMsgArea").html(msg);

        $('#manualDelPop').dialog({
          autoOpen: true,  // hide dialog
          bgiframe: true,   // for IE6
          resizable: false,
          height: heightStr,
          width: widthStr,
          modal: true,
          overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
          },
          buttons: [{
            text:"O K",
            click:  function() {
                ManualDeleteWml(pluginId, btn, gamenId);
                $(this).dialog('close');
            }
          },{
            text:msglist_cmn['cmn.cancel'],
            click:  function() {
              $(this).dialog('close');
            }
          }]
        });
      }
    });
}

function ManualDelete(pluginId, btn) {
  var paramStr = "";
  paramStr += getFormData($(btn.form));
  paramStr = paramStr + '&CMD=update';
  paramStr = paramStr + '&pluginId=' + pluginId;
  deleteData(pluginId, paramStr);
}

function ManualDeleteWml(pluginId, btn, gamenId) {
  var paramStr = "";
  paramStr += getFormData($(btn.form));
  paramStr = paramStr + '&CMD=update';
  paramStr = paramStr + '&pluginId=' + pluginId;
  paramStr = paramStr + '&gamenId=' + gamenId;
  deleteData(pluginId, paramStr, gamenId);
}

commitFlg = false;
function deleteData(pluginId, paramStr, gamenId) {
  if (commitFlg) {
    return;
  }
  commitFlg = true;
  $.ajax({
    async: true,
    url:  "../common/cmn310.do",
    type: "post",
    data: paramStr
  }).done(function( data ) {
    if (data["success"]){
      delErrMsg(pluginId, gamenId);
      toastMsgChange(pluginId, true);
      displayToast("cmn310");
      } else if (data["errors"]) {
      errorMsg(data, pluginId, gamenId);
    } else {
      delErrMsg(pluginId, gamenId);
      toastMsgChange(pluginId, false);
      displayToast("cmn310");
    }
    commitFlg = false;
  });

}

function toastMsgChange(pluginId, success) {

  if (!success) {
    $(".js_toastMessage").text(msglist_cmn['cmn.del.error']);
  } else {
    if (pluginId == "schedule") {
      $(".js_toastMessage").text(msglist_cmn['cmn.sch'] + msglist_cmn['cmn.manual.del.ok']);
    } else if (pluginId == "bulletin") {
      $(".js_toastMessage").text(msglist_cmn['cmn.bbs'] + msglist_cmn['cmn.manual.del.ok']);
    } else if (pluginId == "smail") {
      $(".js_toastMessage").text(msglist_cmn['cmn.sml'] + msglist_cmn['cmn.manual.del.ok']);
    } else if (pluginId == "reserve") {
      $(".js_toastMessage").text(msglist_cmn['cmn.rsv'] + msglist_cmn['cmn.manual.del.ok']);
    } else if (pluginId == "nippou") {
      $(".js_toastMessage").text(msglist_cmn['cmn.ntp'] + msglist_cmn['cmn.manual.del.ok']);
    } else if (pluginId == "circular") {
      $(".js_toastMessage").text(msglist_cmn['cmn.cir'] + msglist_cmn['cmn.manual.del.ok']);
    } else if (pluginId == "webmail") {
      $(".js_toastMessage").text(msglist_cmn['cmn.wml'] + msglist_cmn['cmn.manual.del.ok']);
    } else if (pluginId == "ringi") {
      $(".js_toastMessage").text(msglist_cmn['cmn.rng'] + msglist_cmn['cmn.manual.del.ok']);
    } else if (pluginId == "enquete") {
      $(".js_toastMessage").text(msglist_cmn['cmn.enq'] + msglist_cmn['cmn.manual.del.ok']);
    } else if (pluginId == "chat") {
      $(".js_toastMessage").text(msglist_cmn['cmn.cht'] + msglist_cmn['cmn.manual.del.ok']);
    }
  }
}

function errorMsg(data, pluginId, gamenId) {
    delErrMsg(pluginId, gamenId)
    if (pluginId == "schedule") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_schErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    } else if (pluginId == "bulletin") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_bbsErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    } else if (pluginId == "smail") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_smlErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    } else if (pluginId == "reserve") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_rsvErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    } else if (pluginId == "nippou") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_ntpErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    } else if (pluginId == "circular") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_cirErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    } else if (pluginId == "webmail" && gamenId == "wml060") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_wml060ErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    } else if (pluginId == "webmail" && gamenId == "wml180") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_wml180ErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    } else if (pluginId == "ringi") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_rngErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    } else if (pluginId == "enquete") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_enqErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    } else if (pluginId == "chat") {
        for (var i = 0; i < data["size"]; i++) {
            $(".js_chtErrorArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
        }
    }
}

function delErrMsg(pluginId, gamenId) {
    if (pluginId == "schedule") {
        $(".js_schErrorArea").html("");
    } else if (pluginId == "bulletin") {
        $(".js_bbsErrorArea").html("");
    } else if (pluginId == "smail") {
        $(".js_smlErrorArea").html("");
    } else if (pluginId == "reserve") {
        $(".js_rsvErrorArea").html("");
    } else if (pluginId == "nippou") {
        $(".js_ntpErrorArea").html("");
    } else if (pluginId == "circular") {
        $(".js_cirErrorArea").html("");
    } else if (pluginId == "webmail" && gamenId == "wml060") {
        $(".js_wml060ErrorArea").html("");
    } else if (pluginId == "webmail" && gamenId == "wml180") {
        $(".js_wml180ErrorArea").html("");
    } else if (pluginId == "ringi") {
        $(".js_rngErrorArea").html("");
    } else if (pluginId == "enquete") {
        $(".js_enqErrorArea").html("");
    } else if (pluginId == "chat") {
        $(".js_chtErrorArea").html("");
    }
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