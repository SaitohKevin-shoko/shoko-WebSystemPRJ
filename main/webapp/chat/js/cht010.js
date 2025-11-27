
// モード 0:インサート 1:アップデート
var mode = 0;
// 対象メッセージSID(編集、リプライ、リアクション)
let messageSid = "";

//チャットエリア縦幅
var chat_area_height = 0;
// リサイズフラグ
var resize_first = true;
// チャットエリア最小縦幅
var chat_area_min_height = 180;
// テキストエリア最大縦幅
var chat_textarea_max_height = 200;
// テキストエリア最小縦幅
var chat_textarea_min_height = 25;
var errorMsg = "編集中はファイルを送信できません。";

var allDispTopFlg = 1;
var allDispBottomFlg = 1;
//スクロール時自動読み込みフラグ 0:読み込む 1:読み込まない
var scrollAutoReadFlg = 0;

//ピンどめ投稿 追加読み込み中フラグ
var doAddPinMessageFlg = false;

const disableEmoji = new RegExp("🫠|🥲|🫢|🫣|🫡|🫥|😶‍🌫️|😮‍💨|🫨|🙂‍↔️|🙂‍↕️|"
  + "😵‍💫|🥸|🫤|🥹|❤️‍🔥|❤️‍🩹|🩷|🩵|🩶|🫱🏻|🫱🏼|🫱🏽|🫱🏾|🫱🏿|🫲🏻|🫲🏼|🫲🏽|🫲🏾|🫲🏿|🫳🏻|🫳🏼|🫳🏽|"
  + "🫳🏾|🫳🏿|🫴🏻|🫴🏼|🫴🏽|🫴🏾|🫴🏿|🫷🏻|🫷🏼|🫷🏽|🫷🏾|🫷🏿|🫸🏻|🫸🏼|🫸🏽|🫸🏾|🫸🏿|🤌🏻|🤌🏼|🤌🏽|🤌🏾|🤌🏿|🫰🏻|"
  + "🫰🏼|🫰🏽|🫰🏾|🫰🏿|🫵🏻|🫵🏼|🫵🏽|🫵🏾|🫵🏿|🫶🏻|🫶🏼|🫶🏽|🫶🏾|🫶🏿|🫀|🫁|🫦|🧔🏻‍♂️|🧔🏼‍♂️|🧔🏽‍♂️|🧔🏾‍♂️|"
  + "🧔🏿‍♂️|🧔🏻‍♀️|🧔🏼‍♀️|🧔🏽‍♀️|🧔🏾‍♀️|🧔🏿‍♀️|🥷🏻|🥷🏼|🥷🏽|🥷🏾|🥷🏿|🫅🏻|🫅🏼|🫅🏽|🫅🏾|🫅🏿|🤵🏻‍♂️|🤵🏼‍♂️|"
  + "🤵🏽‍♂️|🤵🏾‍♂️|🤵🏿‍♂️|🤵🏻‍♀️|🤵🏼‍♀️|🤵🏽‍♀️|🤵🏾‍♀️|🤵🏿‍♀️|👰🏻‍♂️|👰🏼‍♂️|👰🏽‍♂️|👰🏾‍♂️|👰🏿‍♂️|👰🏻‍♀️|"
  + "👰🏼‍♀️|👰🏽‍♀️|👰🏾‍♀️|👰🏿‍♀️|🫃🏻|🫃🏼|🫃🏽|🫃🏾|🫃🏿|🫄🏻|🫄🏼|🫄🏽|🫄🏾|🫄🏿|👩🏻‍🍼|👩🏼‍🍼|👩🏽‍🍼|👩🏾‍🍼|"
  + "👩🏿‍🍼|👨🏻‍🍼|👨🏼‍🍼|👨🏽‍🍼|👨🏾‍🍼|👨🏿‍🍼|🧑🏻‍🍼|🧑🏼‍🍼|🧑🏽‍🍼|🧑🏾‍🍼|🧑🏿‍🍼|🧑🏻‍🎄|🧑🏼‍🎄|🧑🏽‍🎄|"
  + "🧑🏾‍🎄|🧑🏿‍🎄|🧌|🚶🏻‍➡️|🚶🏼‍➡️|🚶🏽‍➡️|🚶🏾‍➡️|🚶🏿‍➡️|🚶🏻‍♀️‍➡️|🚶🏼‍♀️‍➡️|🚶🏽‍♀️‍➡️|🚶🏾‍♀️‍➡️|🚶🏿‍♀️‍➡️|🚶🏻‍♂️‍➡️|"
  + "🚶🏼‍♂️‍➡️|🚶🏽‍♂️‍➡️|🚶🏾‍♂️‍➡️|🚶🏿‍♂️‍➡️|🧎🏻‍➡️|🧎🏼‍➡️|🧎🏽‍➡️|🧎🏾‍➡️|🧎🏿‍➡️|🧎🏻‍♀️‍➡️|🧎🏼‍♀️‍➡️|🧎🏽‍♀️‍➡️|🧎🏾‍♀️‍➡️|🧎🏿‍♀️‍➡️|"
  + "🧎🏻‍♂️‍➡️|🧎🏼‍♂️‍➡️|🧎🏽‍♂️‍➡️|🧎🏾‍♂️‍➡️|🧎🏿‍♂️‍➡️|🧑🏻‍🦯‍➡️|🧑🏼‍🦯‍➡️|🧑🏽‍🦯‍➡️|🧑🏾‍🦯‍➡️|🧑🏿‍🦯‍➡️|👨🏻‍🦯‍➡️|"
  + "👨🏼‍🦯‍➡️|👨🏽‍🦯‍➡️|👨🏾‍🦯‍➡️|👨🏿‍🦯‍➡️|👩🏻‍🦯‍➡️|👩🏼‍🦯‍➡️|👩🏽‍🦯‍➡️|👩🏾‍🦯‍➡️|👩🏿‍🦯‍➡️|🧑🏻‍🦼‍➡️|🧑🏼‍🦼‍➡️|"
  + "🧑🏽‍🦼‍➡️|🧑🏾‍🦼‍➡️|🧑🏿‍🦼‍➡️|👨🏻‍🦼‍➡️|👨🏼‍🦼‍➡️|👨🏽‍🦼‍➡️|👨🏾‍🦼‍➡️|👨🏿‍🦼‍➡️|👩🏻‍🦼‍➡️|👩🏼‍🦼‍➡️|👩🏽‍🦼‍➡️|"
  + "👩🏾‍🦼‍➡️|👩🏿‍🦼‍➡️|🧑🏻‍🦽‍➡️|🧑🏼‍🦽‍➡️|🧑🏽‍🦽‍➡️|🧑🏾‍🦽‍➡️|🧑🏿‍🦽‍➡️|👨🏻‍🦽‍➡️|👨🏼‍🦽‍➡️|👨🏽‍🦽‍➡️|"
  + "👨🏾‍🦽‍➡️|👨🏿‍🦽‍➡️|👩🏻‍🦽‍➡️|👩🏼‍🦽‍➡️|👩🏽‍🦽‍➡️|👩🏾‍🦽‍➡️|👩🏿‍🦽‍➡️|🏃🏻‍➡️|🏃🏼‍➡️|🏃🏽‍➡️|🏃🏾‍➡️|🏃🏿‍➡️|🏃🏻‍♀️‍➡️|"
  + "🏃🏼‍♀️‍➡️|🏃🏽‍♀️‍➡️|🏃🏾‍♀️‍➡️|🏃🏿‍♀️‍➡️|🏃🏻‍♂️‍➡️|🏃🏼‍♂️‍➡️|🏃🏽‍♂️‍➡️|🏃🏾‍♂️‍➡️|🏃🏿‍♂️‍➡️|🫂|🧑‍🧑‍🧒‍🧒|🧑‍🧒‍🧒|"
  + "🧑‍🧑‍🧒|🧑‍🧒|🐈‍⬛|🫎|🫏|🦬|🦣|🦫|🐻‍❄️|🦤|🪶|🪽|🐦‍⬛|🪿|🐦‍🔥|🦭|🪸|🪼|🪲|🪳|🪰|🪱|🪷|🪻|"
  + "🪴|🪹|🪺|🍋‍🟩|🫐|🫒|🫑|🫘|🫚|🫛|🍄‍🟫|🫓|🫔|🫕|🫖|🫗|🧋|🫙|🪨|🪵|🛖|🛝|🛻|🛼|🛞|🛟|🪄|🪅|🪩|🪆|🪡|🪢|🪭|"
  + "🩴|🪮|🪖|🪗|🪘|🪇|🪈|🪫|🪙|🪃|🪚|🪛|⛓️‍💥|🪝|🪜|🩼|🩻|🛗|🪞|🪟|🪠|🪤|🪣|🫧|🪥|🪦|🪬|🪧|🪪|🪯|🛜|⚧️|🟰|🏳️‍⚧️"
  + "|🫶|🫱|🫴|🫲|🫳|🫷|🫸|🤌|🫰|🫵|🧔‍♂️|🧔‍♀️|🫅|🤵‍♂️|🤵‍♀️|🥷|👰‍♂️|👰‍♀️|🫃|🫄|👩‍🍼|👨‍🍼|🧑‍🍼|"
  + "🧑‍🎄|🏃‍➡️|🏃‍♀️‍➡️|🏃‍♂️‍➡️|🚶‍➡️|🚶‍♀️‍➡️|🚶‍♂️‍➡️|🧎‍➡️|🧎‍♀️‍➡️|🧎‍♂️‍➡️|🧑‍🦯‍➡️|👨‍🦯‍➡️|👩‍🦯‍➡️"
  + "|🧑‍🦼‍➡️|👨‍🦼‍➡️|👩‍🦼‍➡️|🧑‍🦽‍➡️|👨‍🦽‍➡️|👩‍🦽‍➡️", "g");

//スクロールバー判定
jQuery.fn.hasScrollBar = function() {
  return this.get(0) ? this.get(0).scrollHeight > this.innerHeight() : false;
}

// 一定時間待機する関数
var kidokuUpdateFunc = null;

// 自身のメッセージ受信タイムアウト管理
let mineMessageAppendTimeout = null;

//リアクションユーザ情報JSONオブジェクト
var reactionUserObj = [];

function buttonPush(cmd){

    document.forms[1].CMD.value=cmd;
    document.forms[1].submit();
    return false;
}

function group_info() {

  var sid = document.forms[1].cht010SelectPartner.value;
  var kbn = document.forms[1].cht010SelectKbn.value;
  if (kbn == 1) {
    openUserInfoWindow(sid);
  } else {
    var h = window.innerHeight / 2;
    $('#groupInfoPop').dialog({
      position: {
          of : 'body',
          at: 'top+' + h,
          my: 'center'
      },
      modal: true,
        title:$(".js_chtGroupTitle").text(),
        dialogClass:'dialog_button',
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        width: 800,
        maxHeight: 400,
        overlay: {
          backgroundColor: '#000000',
            opacity: 0.5
        },
          buttons: {
            閉じる: function() {
              $(this).dialog('close');
            }
          }
      });
  }
}

function createUserLink(usrName, usrJkbn, usrUkoFlg, usrSid, canSendFlg) {

  if (typeof canSendFlg === 'boolean') {
    canSendFlg = canSendFlg.toString();
  }
  if (usrJkbn == 9) {
    usrName = `<del>${usrName}</del>`;
  }

  let ret = "";
  if (usrJkbn == 9
    || !belongUser.includes(usrSid)
    || canSendFlg === "false") {

    let mukoUserClass = "";
    if (usrUkoFlg == 1 && usrJkbn == 0) {
      mukoUserClass = "mukoUser";
    }
    //ユーザ削除済み
    ret = `
      <span class="fw_b word_b-all ${mukoUserClass}">${usrName}</span>
    `;
  } else {
    let nameClass;
    if (usrUkoFlg == 1) {
      //ログイン停止中
      nameClass = "fw_b word_b-all mukoUser linkHover_line cursor_p js_mentionLink";
    } else {
      nameClass = "fw_b word_b-all cl_linkDef linkHover_line cursor_p js_mentionLink";
    }
    ret = `
      <span class="${nameClass}" onclick="addMention(${usrSid});">${usrName}</span>
    `;
  }

  return ret;
}

function changeTab(tabname) {
    var oldTabCode = chkTabCode();
     // タブメニュー実装
    $("#tabAll").addClass("display_n");
    $("#tabTimeline").addClass("display_n");
     // タブメニュー実装
    $("#" + tabname).removeClass("display_n");

    var tabCode = chkTabCode();

    if (oldTabCode != tabCode) {
        var param = createParamCht010();
        param['CMD'] = 'changeTab';
        param['cht010SelectTab'] = tabCode;
        paramStr = $.param(param, true);
        paramStr = setToken(paramStr);
        $.ajax({
              async: true,
              url:  "../chat/cht010.do",
              type: "post",
              data: paramStr
        }).done(function( data ) {
          if (data["tokenError"]){
            tokenError(data);
          }
        });
    }
}

function chkTabCode() {
    if ($('#tabAll').is(':visible')) {
        return 0;
    }
    if ($('#tabTimeline').is(':visible')) {
        return 1;
    }
    return 0;
}

// 待機する関数
$.extend({
    wait: function(duration){
        var dfd = $.Deferred();
        setTimeout(dfd.resolve, duration);
        return dfd;
    }
});

function initDisp(area) {
  //日付ヘッダーのサイズを確保
  if ($("#hiduke_header").text() == '') {
    $("#hiduke_header").html("&nbsp;");
  }

  const chatList = document.querySelector('cht010-chat-list');
  const waitRet = chatList.waitMessageDrawFinishedPromise();
  waitRet.then(
    (resolveRet) => {

      if(!($(".js_chatList_midokuLine").length)){
        $(area).scrollTop($(area).get(0).scrollHeight);
      } else {
        var aoH = $(area)[0].offsetTop;
        $(area).scrollTop(aoH);
        var loH = document.getElementsByClassName("js_chatList_midokuLine")[0].offsetTop - aoH;
        $(area).stop().animate({scrollTop: loH},'fast');
      }
      // スクロールできない画面の場合、未読のメッセージを既読にする
      if ($("#js_chatMessageArea").get(0).scrollHeight - $("#js_chatMessageArea").get(0).clientHeight <= 0) {
        allDispBottomFlg = 1;
        allDispTopFlg = 1;
        changeToKidoku(document.forms[1].cht010SelectKbn.value, document.forms[1].cht010SelectPartner.value);
      } else {
        allDispTopFlg = 0;
      }
      //midokujumpボタン初期化
      $('.js_cht010JumpMidokuButton_hukidashi').addClass('display_none');
      $('.js_cht010JumpMidokuButton').removeAttr('data-newmessage');
      $('.js_cht010JumpMidokuButton').removeAttr('data-jumpmessage');

    }
  )
}

function updateKidokuAll(data) {
  var minusCnt = 0;
  const kidokuUpdateSelectSid = data["selectSid"];
  const kidokuUpdateSelectKbn = data["selectKbn"];

  if (kidokuUpdateSelectKbn == 2) {
    $(".js_chtGroup").each(function(i) {
      if ($(this).attr('value') == kidokuUpdateSelectSid) {
        minusCnt = $(this).find('.js_midokuCount').text();
        $(this).find('.js_midokuCount').text('');
      }
    });
  } else {
    $(".js_chtUser").each(function(i) {
      if ($(this).attr('value') == kidokuUpdateSelectSid) {
        minusCnt = $(this).find('.js_midokuCount').text();
        $(this).find('.js_midokuCount').text('');
      }
    });
  }
  updateTimeline();

  if ($('input[name="cht010SelectPartner"]').val() == data["selectSid"]) {
    $('.js_mediaArea').each(function() {
      if ($(this).find(".js_kidoku").text() == '0') {
        $(this).find(".js_kidoku").text("1");
      }
    });
  }

  // 未読タブ
  var allMidoku = Number($(".js_allMidoku").text());

  allMidoku = allMidoku - (minusCnt);
  updateAllMidokuCnt(allMidoku);
}

// スクロールしない画面における既読処理
function changeToKidoku(selectKbn, selectSid) {
  var dspMesSid = 0;
  var dspMesCnt = 0;
    //未読→既読処理
    var windowH = $(".js_content_area").offset().top;
    var footerH = $(".js_sendMessageArea").offset().top;


    $('.js_mediaArea').each(function(idx) {
      // 未読メッセージに対する処理
      if($(this).find(".js_kidoku").text() == "0") {
        $(this).find(".js_kidoku").text("1");
        var tes = $(this).offset().top;
        // 画面内に表示されている場合
        if (tes > windowH && tes < footerH) {
          if (dspMesSid < $(this).attr("value")) {
            dspMesSid = $(this).attr("value");
            dspMesCnt = dspMesCnt + 1;
          }
          // 未読数書き換えのキャンセル
          if (kidokuUpdateFunc != null) {
            clearTimeout(kidokuUpdateFunc);
          }

          const kidokuUpdateSelectSid = selectSid
          const kidokuUpdateSelectKbn = selectKbn

          // 未読数書き換え
          kidokuUpdateFunc = setTimeout(function(){

              paramStr = 'CMD=updateKidoku';
              paramStr = paramStr + '&cht010MessageSid=' + dspMesSid;
              paramStr = paramStr + '&cht010SelectPartner=' + kidokuUpdateSelectSid;
              paramStr = paramStr + '&cht010SelectKbn= ' + kidokuUpdateSelectKbn;
              paramStr = setToken(paramStr);
              $.ajax({
                    async: true,
                    url:  "../chat/cht010.do",
                    type: "post",
                    data: paramStr
              }).done(function( data ) {
                if (data["success"]) {

                  var cnt = data["count"];
                  var minusCnt = 0;
                  if (kidokuUpdateSelectKbn == 2) {
                    $(".js_chtGroup").each(function(i) {
                      if ($(this).attr('value') == kidokuUpdateSelectSid) {
                        minusCnt = $(this).find('.js_midokuCount').text();
                        if (cnt != 0) {
                              $(this).find('.js_midokuCount').text(cnt);
                        } else {
                            $(this).find('.js_midokuCount').text('');
                        }
                      }
                    });
                  } else {
                    $(".js_chtUser").each(function(i) {
                      if ($(this).attr('value') == kidokuUpdateSelectSid) {
                        minusCnt = $(this).find('.js_midokuCount').text();
                        if (cnt != 0) {
                          $(this).find('.js_midokuCount').text(cnt);
                        } else {
                              $(this).find('.js_midokuCount').text('');
                        }
                      }
                    });
                  }

                  updateTimeline();

                  // 未読タブ
                  var allMidoku = Number($(".js_allMidoku").text());
                  allMidoku = allMidoku - (minusCnt - cnt);
                  updateAllMidokuCnt(allMidoku);

                  dspMesCnt = 0;
                } else if (data["tokenError"]){
                  tokenError(data);
                } else {
                  alert(msglist_cht010['cht.cht010.23']);
                }
              }).fail(function(data){
                alert(msglist_cht010['cht.cht010.24']);
              });
          }, 2000);
        }
      }
    });
}

function changePartnerInit() {
  $("html,body").scrollTop( 0 );
  initDisp("#js_chatMessageArea");
  $(".js_listMake").attr("data-type", "");
  $(".js_listMake").attr("data-command", "");
  loadPinList(true, 0);
  drag();
  dateHeader();
}


function group_combo_change() {
    paramStr = 'CMD=changeGrp';
    paramStr = paramStr + '&cht010GroupSid=' + $("#cht010ChangeGrp").val();
      $.ajax({
          async: true,
          url:  "../chat/cht010.do",
          type: "post",
          data: paramStr
      }).done(function( data ) {
          if (data["success"]) {
            var detail = "";
            if (data["size"] > 0) {
              for (var i = 0; i < data["size"]; i++) {

                detail += "<div class=\"m5 cl_linkDef cl_linkHoverChange \">";

                if (data["usiPictKf_"+i] != 0) {
                  detail += "  <div class=\"js_chtUser js_user_name display_b cursor_p display_inline w100 verAlignMid\" value=\""+data["usrSid_"+i]+"\">";
                  detail += "<div class=\"mr5\">";
                  detail += "<span class=\"hikokai_photo-s hikokai_text cl_fontWarn\">"+msglist_cht010['cmn.private.photo']+"</span>";
                } else {
                  detail += "  <div class=\"js_chtUser js_user_name display_b cursor_p display_inline w100 verAlignMid\" value=\""+data["usrSid_"+i]+"\">";
                  detail += "<div class=\"mr5\">";
                  if (data["binSid_"+i] == 0) {
                    detail += "    <img src=\"../common/images/classic/icon_photo.gif\" name=\"userImage\" onload=\"initImageView50('userImage"+data["usrSid_"+i]+"')\" alt=\""+msglist_cht010['cmn.photo']+" />\"  class=\"wp25 btn_classicImg-display\"/>";
                    detail += "    <img src=\"../common/images/original/photo.png\" name=\"userImage\" onload=\"initImageView50('userImage"+data["usrSid_"+i]+"')\" alt=\""+msglist_cht010['cmn.photo']+" />\"  class=\"wp25 btn_originalImg-display\"/>";
                  } else {
                    if (data["usrJkbn_"+i] == 9) {
                      detail += "    <img src=\"../common/images/classic/icon_photo.gif\" name=\"userImage\" onload=\"initImageView50('userImage"+data["usrSid_"+i]+"')\" alt=\""+msglist_cht010['cmn.photo']+" />\"  class=\"wp25 btn_classicImg-display\"/>";
                      detail += "    <img src=\"../common/images/original/photo.png\" name=\"userImage\" onload=\"initImageView50('userImage"+data["usrSid_"+i]+"')\" alt=\""+msglist_cht010['cmn.photo']+" />\"  class=\"wp25 btn_originalImg-display\"/>";
                    } else {
                      detail += "<img src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid="+data["binSid_"+i]+"\" name=\"userImage\" onload=\"initImageView50('userImage"+data["usrSid_"+i]+"')\" alt=\""+msglist_cht010['cmn.photo']+"\" class=\"wp25\"/>";
                    }
                  }
                }
                detail += "</div>";
                detail += "<div class=\"verAlignMid word_b-all\">";
                if (data["usrJkbn_"+i] != 0) {
                  detail += "    <del class=\"fontoffset\">"+data["usiSei_"+i]+"&nbsp;"+data["usiMei_"+i];
                  detail += "</del>"
                  detail += "    <span class=\"midokuCount js_midokuCount \">";
                  if (data["chtUserCount_"+i] != 0) {
                    detail += data["chtUserCount_"+i];
                  }
                  detail += "</span>";
                } else {
                  var ukoFlg = "";
                  var hideFlg = "";
                  if (data["usrUkoFlg_"+i] != 0) {
                    ukoFlg = "mukoUser"
                  }
                  detail += "    <span class=\"" + ukoFlg + hideFlg + " fontoffset\">"+data["usiSei_"+i]+"&nbsp;"+data["usiMei_"+i]+"</span>";
                  detail += "    <span class=\"midokuCount js_midokuCount " + ukoFlg + " \">";
                  if (data["chtUserCount_"+i] != 0) {
                    detail += data["chtUserCount_"+i];
                  }
                  detail += "</span>";
                }
                detail += "</div></div>"
                   + "</div>";
              }
            }
            $("#selGrpUsrArea").children().remove();
            $("#selGrpUsrArea").append(detail);
          } else {
            alert(msglist_cht010['cht.cht010.23']);
          }
      }).fail(function(data){
        alert(msglist_cht010['cht.cht010.24']);
      });
}

function chat_textarea_resize() {
  var textarea = document.getElementById("inText");
  if( textarea.scrollHeight > textarea.offsetHeight
      && textarea.offsetHeight < chat_textarea_max_height ){
    if (textarea.scrollHeight > chat_textarea_max_height) {
      textarea.style.height = chat_textarea_max_height + 'px';
      textarea.style.overflow = 'auto';
    } else {
      textarea.style.height = "auto"; // スクロール高さを再計算
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflow = 'hidden';
    }
  } else if ( textarea.scrollHeight < textarea.offsetHeight
    && textarea.offsetHeight > chat_textarea_min_height ){
    textarea.style.height = "auto"; // スクロール高さを再計算
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.overflow = 'hidden';
  }
}

function resetReactionUser(data) {
  reactionUserObj = [];
  if (data["reactionUserList"] != null && data["reactionUserList"].length > 0) {
    reactionUserObj = JSON.parse(JSON.stringify(data["reactionUserList"]));
  }
}


function addReactionUser(data) {
  const reactionList = data["reactionUserList"];
  if (reactionList == null || reactionList.length == 0) {
    return;
  }
  reactionList.forEach(function (rcMdl){
    if (rcMdl == null) {
      return;
    }

    let index = reactionUserObj.findIndex(function(elm) {
      return elm.usrSid === rcMdl.usrSid;
    });
    if (index !== -1) {
      reactionUserObj[index] = rcMdl;
    } else {
      reactionUserObj.push(rcMdl);
    }
  });
}
/**
 * チャット変更時のdataからチャットグループの表示情報を変更する
 *
 * @param {*} data
 */
function changePartnerGroupInfo(data) {
  $(".js_chatName").empty();
  //グループ名が"null"の時に文字列として表示されるようにする
  let chatName = "";
  chatName += data["chatName"];
  $(".js_chatName").append(chatName);

  $(".js_chtGroupTitle").empty();
  $(".js_chtGroupTitle").append(chatName);

  $(".js_chtGroupId").empty();
  $(".js_chtGroupId").append(data["chatId"]);

  $(".js_bikoArea").empty();
  var biko = "";
  if (data["chatBiko"].length != 0) {
    biko += "<div class=\"fw_b mt15 fs_14\">"
          + msglist_cht010["cmn.memo"]
          + "</div>"
          + "<div class=\"js_chtGroupBiko ml10 word_b-all\">"
          + data["chatBiko"]
          + "</div>";
  }
  $(".js_bikoArea").append(biko);

  $(".js_chtAdminMemList").remove();
  var adminMember = "";
  adminMember += "<div class=\"js_chtAdminMemList\">"
               + "<div>";
  for (var idx = 0; idx < data["adminGroupSize"]; idx++) {
    adminMember += "<span class=\"ml10 display_inline-block\">"
                 + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_group.png\" alt=\"" + msglist_cht010["cmn.group"] + "\">"
                 + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_group.png\" alt=\"" + msglist_cht010["cmn.group"] + "\">"
                 + data["adminGroup_"+idx]
                 + "</span>";
  }
  adminMember += "</div>"
               + "<div class=\"mt5\">";
  for (var idx = 0; idx < data["adminMemberSize"]; idx++) {
    adminMember += "<span class=\"ml10 display_inline-block\">"
                 + "<img class=\"btn_classicImg-display btnIcon-size\" src=\"../common/images/classic/icon_user.png\" alt=\"" + msglist_cht010["cmn.user"] + "\">"
                 + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_user.png\" alt=\"" + msglist_cht010["cmn.user"] + "\">"
                 + data["adminMemberName_"+idx]
                 + "</span>";
  }
  adminMember += "</div>"
               + "</div>";
  $(".js_chtAdminList").append(adminMember);

  $(".js_chtGeneralMemList").remove();
  var generalMember = "";
  generalMember += "<div class=\"js_chtGeneralMemList\">"
                 + "<div>";
  if (data["generalGroupSize"] == 0 && data["generalMemberSize"] == 0) {
    generalMember += "<span class=\"ml10\">" + msglist_cht010["cmn.no"] + "</span>";
  }
  for (var idx = 0; idx < data["generalGroupSize"]; idx++) {
    generalMember += "<span class=\"ml10 display_inline-block\">"
                   + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_group.png\" alt=\"" + msglist_cht010["cmn.group"] + "\">"
                   + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_group.png\" alt=\"" + msglist_cht010["cmn.group"] + "\">"
                   +  data["generalGroup_"+idx]
                   + "</span>";
  }
  generalMember += "</div>"
                 + "<div class=\"mt5\">";
  for (var idx = 0; idx < data["generalMemberSize"]; idx++) {
    generalMember += "<span class=\"ml10 display_inline-block\">"
                   + "<img class=\"btn_classicImg-display btnIcon-size\" src=\"../common/images/classic/icon_user.png\" alt=\"" + msglist_cht010["cmn.user"] + "\">"
                   + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_user.png\" alt=\"" + msglist_cht010["cmn.user"] + "\">"
                   +  data["generalMemberName_"+idx]
                   + "</span>";
  }
  generalMember += "</div>"
                 + "</div>";
  $(".js_chtGeneralList").append(generalMember);

}

$(function(){

  //ダークテーマの場合、絵文字ピッカーの背景色を変更
  if ($("emoji-picker").length > 0) {
    const emojiPickerElm = $("emoji-picker")[0];
    const emojiPickerTheme = String(getComputedStyle(emojiPickerElm).getPropertyValue('--themeBase')).trim();
    if (emojiPickerTheme == "dark") {
      $("emoji-picker").addClass("dark");
    }
  }
  if ($(".js_reactionUserList").text() != null && $(".js_reactionUserList").text().length > 0) {
    reactionUserObj = JSON.parse($(".js_reactionUserList").text());
  }

  //絵文字選択パレットボタン押下時にテキストエリアからフォーカスが外れないようにする
  $(document).on("mousedown", ".js_chtEmoji", function(event) {
    if (!$(".js_emojiPicker").hasClass("display_none")) {
      event.preventDefault();
    }
  });

  $(document).on("emoji-click", "emoji-picker", function(event) {

    const message = $(".js_chtTextArea").val();
    $(".js_chtTextArea").focus();
    let caretPos = $(".js_chtTextArea")[0].selectionStart;

    if (caretPos > 0) {
      $(".js_chtTextArea").val(message.substring(0, caretPos) + event.detail.unicode + message.substring(caretPos));
    } else {
      $(".js_chtTextArea").val(event.detail.unicode + message);
    }

    caretPos += event.detail.unicode.length;
    $(".js_chtTextArea")[0].setSelectionRange(caretPos, caretPos);

    chat_textarea_resize();
  });

  //エリア外クリックによる入力インタフェースの解除イベント
  $(document).on("click", "body", function(evnet) {
      //リアクション選択外
      if ($(evnet.target).closest(".js_message_reaction").length == 0
        && $(".js_reactionPanel").length != 0
        && !$(".js_reactionPanel").hasClass("display_none")) {
        $('cht010-chat-list').attr('data-button-lock', false);
        $(".js_reactionPanel").addClass("display_none");
        $(".js_mediaArea").removeClass("cht_button-lock");
        messageSid = '';
        $(".js_reactionPanel").closest(".js_mediaArea").removeClass("media_selected");
        $(".js_reactionPanel").closest(".js_mediaArea").removeClass("cht_reaction-selectd");
      }
      //絵文字ピッカー外
      if ($(evnet.target).closest("emoji-picker").length ==  0
        && !evnet.target.className.includes("js_chtEmoji")) {
        $(".js_emojiPicker").addClass("display_none");
      }
      //スタンプ選択外
      if ($(evnet.target).closest(".js_stampPicker").length ==  0) {
        $(".js_stampPicker").addClass("display_none");
      }
      //メンション選択外
      if ($(evnet.target).closest(".js_mentionPalette").length ==  0) {
        $(".js_mentionPalette").addClass("display_none");
      }
  });


  $(document).on("input", "#inText",function(){
      chat_textarea_resize();
  });

  // 選択SID
  var selectSid = document.forms[1].cht010SelectPartner.value;
  // 選択区分
  var selectKbn = document.forms[1].cht010SelectKbn.value;
  // 送信元SID
  var senderSid = $("#js_senderSid").text();
  // お気に入りフラグ
  var cntCheck  =  $(".js_favorite_flg").text();
  //ミュートフラグ
  var muteCheck = $(".js_chtMute").data("mute");
  // 編集時用メッセージテキスト要素
  var editParent = "";

  drag();



    //アーカイブの表示
    $(document).on("change", ".js_archive",function() {
      const archiveDispCheck = $("[name=archive]:checked").val();
      if (archiveDispCheck == 1) {

        $(".js_archiveGroup").parent("#groupBodyArea div").removeClass('display_n');
      } else {
        $(".js_archiveGroup").parent("#groupBodyArea div").addClass('display_n');
      }
    });

  //メッセージ削除
  $(document).on("click", ".js_message_delete",function(){
    let delMessageSid = $(this).attr("value");
    var h = window.innerHeight / 2;
      $('#delKakuninChtPop').dialog({
           position: {
             of : 'body',
             at: 'top+' + h,
             my: 'center'
            },
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            dialogClass:'dialog_button',
            resizable: false,
            height:160,
            width: 400,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: {
              はい: function() {
                $(this).dialog('close');
                confirmDeleteMessage(selectSid, selectKbn, delMessageSid);
                if (mode == 1) {
                    $('.js_chtTextArea').val("");
                    var textarea = document.getElementById("inText");
                    textarea.style.height = chat_textarea_min_height + 'px';
                    mode = 0;
                  }
              },
              いいえ: function() {
                $(this).dialog('close');
              }
            }
      });
  });

  //メッセージ編集
  $(document).on("click", ".js_message_edit",function(){
    messageSid = $(this).attr("value");
    var messageText = $(this).closest(".js_media_mine").find(".js_message").html();
    message_edit(messageText);
  });

  //メッセージに返信
  $(document).on("click", ".js_message_reply",function(){
    messageSid = $(this).attr("value");
    message_reply();
  });

  //リアクションパネルの表示切り替え
  $(document).on("click", ".js_message_reaction",function(){
    messageSid = $(this).attr("value");
    let reactionPanel = $(".js_reactionPanel")
    if (reactionPanel.length == 0) {
      reactionPanel = $(".js_reactionList").clone();
      reactionPanel.removeClass("js_reactionList");
      reactionPanel.addClass("js_reactionPanel");
      $("body").append(reactionPanel);
    }



    if ($(".js_reactionPanel").hasClass("display_none")) {
      $(".js_reactionPanel").removeClass("display_none");
      $('cht010-chat-list').attr('data-button-lock', true);
      $(".js_mediaArea").addClass("cht_button-lock");
      $(this).closest(".js_mediaArea").removeClass("cht_button-lock");
      $(this).closest(".js_mediaArea").addClass("media_selected");
      $(this).closest(".js_mediaArea").addClass("cht_reaction-selectd");
    } else {
      $(".js_reactionPanel").addClass("display_none");
      $('cht010-chat-list').attr('data-button-lock', false);
      $(".js_mediaArea").removeClass("cht_button-lock");
      messageSid = '';
      $(this).closest(".js_mediaArea").removeClass("media_selected");
      $(this).closest(".js_mediaArea").removeClass("cht_reaction-selectd");

    }

    //リアクションパネルを上に表示する場合の表示位置
    const reactionButtonRect = $(this)[0].getBoundingClientRect();
    let panelDispTop = reactionButtonRect.top - 70;

    //チャット一覧の描画要素の一番上の高さが、リアクションパネルを表示できる高さの上限
    const listRect = $(".js_content_area")[0].getBoundingClientRect();
    let minTop = listRect.top + listRect.height;

    const panel = $(".js_reactionPanel")[0];
    if (minTop > panelDispTop) {
      //表示領域が足りない場合、リアクションパネルを下に表示する
      panel.style.top = 30 + "px";
    } else {
      panel.style.top = -70 + "px";
    }
    panel.style.left = 0 + "px";
    $(panel).appendTo(this);
  });

  $(document).on("click", ".js_reaction", function(e) {
    let canSendFlg = $("#inText").attr('readonly') != 'readonly';
    if (!canSendFlg) {
      return;
    }
    let reacMsgSid = $(this).closest(".js_mediaArea").attr("value");
    let reactionSid = $(this).attr("value");
    //リアクションしたユーザを押下した場合は、登録/削除処理を走らせない
    if ($(e.target).closest(".js_toolTip").length != 0) {
      return true;
    }

    //リアクション選択パレットから既に選択済みのリアクションを押した場合は、何も行わない
    if ($(this).closest(".js_reactionPanel").length != 0
      && $(`.js_media_${reacMsgSid}`).find(`.js_reaction[value="${reactionSid}"][data-reacted="true"]`).length != 0) {
      return true;
    }
    paramStr = 'CMD=changeReaction';
    paramStr = paramStr + '&cht010Reaction=' + reactionSid;
    paramStr = paramStr + '&cht010MessageSid=' + reacMsgSid;
    paramStr = paramStr + '&cht010SelectPartner=' + $("input[name='cht010SelectPartner']").val();
    paramStr = paramStr + '&cht010SelectKbn=' + $("input[name='cht010SelectKbn']").val();
    paramStr = setToken(paramStr);

    $.ajax({
      async: true,
      url:  "../chat/cht010.do",
      type: "post",
      data: paramStr
    }).done(function( data ) {
      if (data["success"]) {
        //登録成功時は何もしない
      } else if (data["tokenError"]){
        tokenError(data);
      } else if (data["errorAlert"]) {
        sendErrorAlert(data);
      } else {
        if (typeof dspError == 'function') {
          var errorMsg = msglist_cht010['cht.cht010.64'];
          dspError(errorMsg);
        }
      }
    }).fail(function(data){
      alert(msglist_cht010['cht.cht010.64']);
    });

  });

  $(document).on("mouseenter", ".js_reaction", function() {
    let canSendFlg = $("#inText").attr('readonly') != 'readonly';
    if (!canSendFlg) {
      $(this).removeClass("cursor_p");
    }

    if ($(this).find(".js_reactionUser").length == 0) {
      return;
    }
    $(this).find(".js_toolTip").remove();

    //このリアクションをしたユーザSID一覧の作成
    let reactionUser = [];
    $(this).find(".js_reactionUser").each(function(){
      reactionUser.push(Number($(this).attr("value")));
    });

    const sessionSid = document.forms[1].cht010EditUsrSid.value;

    let reactionUserSidArray = [];
    reactionUserObj.forEach(function(usrMdl) {
      reactionUserSidArray.push(usrMdl.usrSid);
    });

    //メッセージの描画時に設定されるユーザ情報の描画
    let userToolTip = `
      <div class="js_toolTip pos_abs z_idx100 cursor_d">
      <div class="mt5"></div>
      <div class="bgC_body cht_reactionUser drop_shadow">
    `;

    reactionUser.forEach(function(usrSid) {
      //リアクションしたユーザの情報のみを追加
      let usrIndex = reactionUserSidArray.indexOf(usrSid);
      if (usrIndex == -1) {
        return;
      }

      let usrMdl = reactionUserObj[usrIndex];

      if (sessionSid == usrMdl.usrSid) {
        selectedClass = "cht_reaction-selected";
        reactedFlg = true;
      }
      userToolTip += `
        <div class="mt5 ml10">
          <div class="verAlignMid">
      `;
      if (usrMdl["usrJkbn"] == 9) {
        userToolTip += `
            <span class="hp28">
              <img src="../common/images/classic/icon_photo.gif" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w25 btn_classicImg-display">
              <img src="../common/images/original/photo.png" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w25 btn_originalImg-display">
            </span>
        `;
      } else if (usrMdl["usiPictKf"] == 1) {
        userToolTip += `
            <span class="hp28">
              <span class="hikokai_photo-s hikokai_text cl_fontWarn cursor_d userIcon_size-w25">${msglist_cht010['cmn.private.photo']}</span>
            </span>
        `;
      } else if (usrMdl["usrBinSid"] > 0) {
        userToolTip += `
            <span class="hp28">
              <img src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=${usrMdl["usrBinSid"]}" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w25">
            </span>
        `;
      } else {
        userToolTip += `
            <span class="hp28">
              <img src="../common/images/classic/icon_photo.gif" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w25 btn_classicImg-display">
              <img src="../common/images/original/photo.png" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w25 btn_originalImg-display">
            </span>
        `;
      }
      userToolTip += `
            <span class="ml5">${createUserLink(usrMdl.usiName, usrMdl.usrJkbn, usrMdl.usrUkoFlg, usrMdl.usrSid, canSendFlg)}</span>
          </div>
        </div>
      `
    });
    userToolTip += `
        </div>
      </div>
    `;
    $(this).parent().append(userToolTip);

    const toolTip = $(".js_toolTip");
    const reactionRect = $(this)[0].getBoundingClientRect();
    const centerPaneRect = $(".js_cht010CenterPane")[0].getBoundingClientRect();
    const toolTipRect = toolTip[0].getBoundingClientRect();
    const messageAreaRect = $(this).closest(".js_messageArea ")[0].getBoundingClientRect();

    let startLeft = $(this).closest(".js_messageArea")[0].getBoundingClientRect().left;
    if (reactionRect.left + toolTipRect.width < centerPaneRect.left + centerPaneRect.width) {
      //絵文字ピッカーが画面の横幅に収まる場合
      toolTip[0].style.left = (reactionRect.left - startLeft) + "px";
    } else {
      //通常の位置に配置すると絵文字ピッカーが画面の横幅に収まらない場合
      toolTip[0].style.left = (messageAreaRect.width - toolTipRect.width) + "px";
    }

    $(".js_toolTip").remove();
    $(this).append($(toolTip));
  });

  $(document).on("mouseleave", ".js_reaction", function() {
    $(this).addClass("cursor_p");
    $(".js_toolTip").remove();
  });

  //メッセージ確定押下
  $(document).on("click", ".js_chtConfirm",function(){
    var msgContent = $(".js_chtTextArea").val();
    if (msgContent.length > 3000) {
      $("#js_errorMsg").text(msglist_cht010['cht.cht010.34']);
    } else {
      $("#js_errorMsg").text("");
      confirmEditChatMessage(msgContent, selectSid, selectKbn, messageSid);
    }
  });

  //メッセージキャンセル押下
  $(document).on("click", ".js_chtCansel",function(){
    messageSid = '';
    $(".js_mediaArea").removeClass("media_selected");
    $('cht010-chat-list').attr('data-button-lock', false);
    $(".js_mediaArea").removeClass("cht_button-lock");
    $(".js_chtInputArea").removeClass("media_selectedColor");
    $(".js_chtInputArea").find(".js_chtTextArea").removeClass("media_selectedColor");
    $(".js_chtConfirm").addClass("display_n");
    $(".js_chtCansel").addClass("display_n");
    $(".js_chtSend").removeClass("display_n");
    $(".js_chtAttach").removeClass("display_n");
    $(".js_chtStamp").removeClass("display_n");
    $(".js_chtMentionButton").removeClass("display_n");
    $('.js_chtTextArea').val("");

    var textarea = document.getElementById("inText");
    textarea.style.height = chat_textarea_min_height + 'px';
    if ($("#js_errorMsg").text() == errorMsg) {
      $("#js_errorMsg").text("");
    }
    mode = 0;
  });

  //もっとみるボタン
  $(document).on("click", ".js_moreView ",function(){
      loadTimeline(false);
  });

  //未読のみチェック
  $(document).on("change", ".js_checkOnlyNoRead", function() {
      loadTimeline(true);
  });


  //お気に入り
  $(document).on("click", ".js_chtStar",function(){
    if (cntCheck==1) {
        cntCheck = 0;
    } else {
        cntCheck = 1;
    }
    paramStr = 'CMD=favoriteChage';
    paramStr = paramStr + '&cht010FavoriteFlg=' + cntCheck;
    paramStr = paramStr + '&cht010SelectPartner=' + document.forms[1].cht010SelectPartner.value;
    paramStr = paramStr + '&cht010SelectKbn=' + document.forms[1].cht010SelectKbn.value;
    paramStr = setToken(paramStr);
    $.ajax({
          async: true,
          url:  "../chat/cht010.do",
          type: "post",
          data: paramStr
      }).done(function( data ) {
          if (data["success"]) {
            var detail = "";
            if (selectKbn == 1) {
              if (data["size"] != 0) {
                detail += "<div class=\"fw_b lh130 mt5 ml5\">"+msglist_cht010['cmn.user']+"</div>";
              }
              for (var idx = 0; idx < data["size"]; idx++) {
                detail += "<div class=\"pl20 w100 mt5 lh130\">";
                if (data["favUsrUko"+idx] == 0 || data["favUsrJkbn"+idx] != 0) {
                  detail += "<a href=\"#\" class=\"js_chtUser cl_linkHoverChange display_b word_b-all\" value=\""+ data["favUsrSid"+idx] + "\">";
                } else {
                  detail += "<a href=\"#\" class=\"js_chtUser  cl_linkHoverChange display_b mukoUser word_b-all\" value=\""+ data["favUsrSid"+idx] + "\">";
                }
                if (data["favUsrJkbn"+idx] != 0) {
                  detail += "<del>"
                       + data["favUsrName"+idx]
                         +  "</del>" ;
                } else {
                  detail += data["favUsrName"+idx];
                }
                detail += " <span class=\"midokuCount js_midokuCount\">";
                if (data["favUsrCnt"+idx] != 0) {
                    detail += data["favUsrCnt"+idx];
                }
                detail += "</span>";
                detail += "</a>"
                     + "</div>";
              }
              $(".js_favUser").children().remove();
              $(".js_favUser").append(detail);
            } else if (selectKbn == 2) {
              if (data["size"] != 0) {
                detail += "<div class=\"fw_b lh130 mt5 ml5\">"+msglist_cht010['cmn.group']+"</div>";
              }
              for (var idx = 0; idx < data["size"]; idx++) {
                let groupCompCls = '';
                if (data[`favGrpCompFlg${idx}`] == 1) {
                  groupCompCls = 'opacity6 js_archiveGroup';
                }
                let midokuCnt = '';
                if (data["favGrpCnt"+idx] != 0) {
                  midokuCnt += data["favGrpCnt"+idx];
                }

                detail += `
                  <div class="pl20 w100 mt5 lh130">
                    <a href="#" class=" cl_linkHoverChange ${groupCompCls} js_chtGroup display_b word_b-all" value="${data["favGrpSid"+idx]}">
                      ${data["favGrpName"+idx]}
                      <span class="midokuCount js_midokuCount">${midokuCnt}</span>
                    </a>
                  </div>
                `;
              }
              $(".js_favGroup").children().remove();
                $(".js_favGroup").append(detail);
            }
            if (cntCheck==0) {
                $(".js_chtStar").removeClass("icon-star cht_icon-star");
                $(".js_chtStar").addClass("icon-star_line");
            } else {
                $(".js_chtStar").removeClass("icon-star_line");
                $(".js_chtStar").addClass("icon-star cht_icon-star");
            }
          } else if (data["tokenError"]){
            tokenError(data);
          } else {
            sendErrorAlert(data);
          }
      }).fail(function(data){
        alert(msglist_cht010['cht.cht010.26']);
      });

  });

  /** 絞り込みユーザ選択テンプレート切り替え */
  function changeMemberTemplate(data) {
    const membersArea = $('.js_cht010MemberTemplate');
    membersArea.empty();
    belongUser = [];
    data['cht010MemberList'].forEach(member => {
      const temp = $('<cht010-member-small></cht010-member-small>');
      temp.attr(
        {
          'data-usr_sid' : member.usrSid,
          'data-usi_name' : member.usiName,
          'data-usr_jkbn' : member.usrJkbn,
          'data-usr_uko_flg' : member.usrUkoFlg,
          'data-img_disp_type' : member.imgDispType,
          'data-usi_pict_kf' : member.usiPictKf,
          'data-bin_sid' : member.binSid,
        }
      );
      membersArea.append(temp);
      belongUser.push(member.usrSid);
    })

  }

  //グループ切り替え時
  $(document).on("click", ".js_chtGroup",function(){
    // 未読数書き換えのキャンセル
    if (kidokuUpdateFunc != null) {
      clearTimeout(kidokuUpdateFunc);
    }
    // 送信時最下部jumpタイムアウトのキャンセル
    if (mineMessageAppendTimeout != null) {
      clearTimeout(mineMessageAppendTimeout);
    }
    mode = 0;
    messageSid = ""
    selectSid = $(this).attr("value");
    selectKbn = 2;
    document.forms[1].cht010SelectPartner.value = selectSid;
    document.forms[1].cht010SelectKbn.value = selectKbn;
    paramStr = 'CMD=changePartner';
    paramStr = paramStr + '&cht010SelectPartner=' + selectSid;
    paramStr = paramStr + '&cht010SelectKbn=' + selectKbn;
    //検索ペインのリセット
    document.querySelector('cht010-filterinput').reset();
    //最新ボタンのリセット
    $('.js_cht010JumpMidokuButton').addClass('display_none');

      $.ajax({
          async: true,
          url:  "../chat/cht010.do",
          type: "post",
          data: paramStr
      }).done(async function( data ) {
          if (data["success"]) {
              document.forms[1].cht010FirstEntryDay.value = data["firstDate"];
              scrollAutoReadFlg = 1;

              allDispTopFlg = 1;
              allDispBottomFlg = data["allDispFlg"];

              changeMemberTemplate(data);

              const chatList = document.querySelector('cht010-chat-list');
              chatList.resetMessages();
              await chatList.waitMessageDrawFinishedPromise();

              chatList.setAttribute("data-sendable", data["messageAreaDisp"]);
              chatList.setAttribute("data-button-lock", false);
              chatList.appendMessages(data["messageList"], true);
              await chatList.waitMessageDrawFinishedPromise();

              //リアクションしたユーザ情報のリセット
              resetReactionUser(data);

              if ($('#js_chatMessageArea').hasScrollBar()) {
                  var margin_width = getScrollbarWidth();
                  $("#hiduke_header").css({"margin-right":margin_width + 5 + "px"});
              } else {
                  $("#hiduke_header").css({"margin-right":"5px"});
              }
              messageSendArea(data);
              cntCheck = data["favoriteFlg"];
              if (cntCheck==1) {
                  $(".js_chtStar").removeClass("icon-star_line");
                  $(".js_chtStar").addClass("icon-star cht_icon-star");
              } else {
                  $(".js_chtStar").removeClass("icon-star cht_icon-star");
                  $(".js_chtStar").addClass("icon-star_line");
              }

              muteCheck = data["muteFlg"];
              if (data["muteFlg"] == 1) {
                $(".js_chtMute").addClass("icon-mute");
                $(".js_chtMute").removeClass("icon-mute_off cht_icon-mute_off");
              } else {
                $(".js_chtMute").removeClass("icon-mute");
                $(".js_chtMute").addClass("icon-mute_off cht_icon-mute_off");
              }
              //グループ情報の変更
              changePartnerGroupInfo(data);

              changePartnerInit();

              //メンション選択用パレットのリセット
              $(".js_mentionPalette").addClass("display_none");
              $(".js_mentionPalette").find("cht010-senderselect").remove();
              $(".js_mentionPalette").append(`<cht010-senderselect placeholder="メンション:" mode="mention">`);
              scrollAutoReadFlg = 0;
          } else if(data["error"]){
            alert(msglist_cht010['cht.cht010.37']);
          } else {
            alert(msglist_cht010['cht.cht010.25']);
          }
      }).fail(function(data){
        alert(msglist_cht010['cht.cht010.26']);
      });
  });

  //ポップアップによりグループ切り替え時
  $(document).on("click", "#fakeSearchGrpButton",function(){
    group_combo_change();
  });


  //グループコンボ切り替え
  $(document).on("change", "#cht010ChangeGrp",function(){
    group_combo_change();
  });

  //ユーザ切り替え時
  $(document).on("click", ".js_chtUser",function(){
    // 未読数書き換えのキャンセル
    if (kidokuUpdateFunc != null) {
      clearTimeout(kidokuUpdateFunc);
    }
    // 送信時最下部jumpタイムアウトのキャンセル
    if (mineMessageAppendTimeout != null) {
      clearTimeout(mineMessageAppendTimeout);
    }

    mode = 0;
    messageSid = ""
    selectSid = $(this).attr("value");
    selectKbn = 1;
    document.forms[1].cht010SelectPartner.value = selectSid;
    document.forms[1].cht010SelectKbn.value = selectKbn;
    paramStr = 'CMD=changePartner';
    paramStr = paramStr + '&cht010SelectPartner=' + selectSid;
    paramStr = paramStr + '&cht010SelectKbn= ' + selectKbn;

    //検索ペインのリセット
    document.querySelector('cht010-filterinput').reset();
    //最新ボタンのリセット
    $('.js_cht010JumpMidokuButton').addClass('display_none');

      $.ajax({
          async: true,
          url:  "../chat/cht010.do",
          type: "post",
          data: paramStr
      }).done(async function( data ) {
          if (data["success"]) {
              document.forms[1].cht010FirstEntryDay.value = data["firstDate"];
              scrollAutoReadFlg = 1;

              allDispTopFlg = 1;
              allDispBottomFlg = data["allDispFlg"];

              changeMemberTemplate(data);

              const chatList = document.querySelector('cht010-chat-list');
              chatList.resetMessages();
              await chatList.waitMessageDrawFinishedPromise();

              chatList.setAttribute("data-sendable", data["messageAreaDisp"]);
              chatList.setAttribute("data-button-lock", false);

              chatList.appendMessages(data["messageList"], true);
              await chatList.waitMessageDrawFinishedPromise();

              //リアクションしたユーザ情報のリセット
              resetReactionUser(data);


              if ($('#js_chatMessageArea').hasScrollBar()) {
                  var margin_width = getScrollbarWidth();
                  $("#hiduke_header").css({"margin-right":margin_width + 5 + "px"});
                } else {
                    $("#hiduke_header").css({"margin-right":"5px"});
                }
              messageSendArea(data);
              cntCheck = data["favoriteFlg"];
              if (cntCheck==1) {
                  $(".js_chtStar").removeClass("icon-star_line");
                  $(".js_chtStar").addClass("icon-star cht_icon-star");
              } else {
                  $(".js_chtStar").removeClass("icon-star cht_icon-star");
                  $(".js_chtStar").addClass("icon-star_line");
              }

              muteCheck = data["muteFlg"];
              if (data["muteFlg"] == 1) {
                $(".js_chtMute").addClass("icon-mute");
                $(".js_chtMute").removeClass("icon-mute_off cht_icon-mute_off");
              } else {
                $(".js_chtMute").removeClass("icon-mute");
                $(".js_chtMute").addClass("icon-mute_off cht_icon-mute_off");
              }

              $(".js_chatName").empty();
              $(".js_chatName").append(data["chatName"]);

              changePartnerInit();

              //メンション選択用パレットのリセット
              $(".js_mentionPalette").addClass("display_none");
              $(".js_mentionPalette").find("cht010-senderselect").remove();
              $(".js_mentionPalette").append(`<cht010-senderselect placeholder="メンション:" mode="mention">`);

              scrollAutoReadFlg = 0;
          } else {
            alert(msglist_cht010['cht.cht010.27']);
          }
      }).fail(function(data){
        alert(msglist_cht010['cht.cht010.27']);
      });
  });

  //Enter送信切り替え
  $(document).on("click", ".js_enterSend",function(){
    var val = $(this).prop("checked");
    var flg = 0;
    if (val) {
      flg = 1;
    }
    paramStr = 'CMD=enterSend';
    paramStr = paramStr + '&cht010EnterSendFlg=' + flg;
    paramStr = setToken(paramStr);
      $.ajax({
          async: true,
          url:  "../chat/cht010.do",
          type: "post",
          data: paramStr
      }).done(function( data ) {
          if (data["success"]) {
            if (val) {
              $(".js_chtTextArea").attr("placeholder","Shift+Enterで改行");
            }  else {
              $(".js_chtTextArea").attr("placeholder","Shift+Enterで送信");
            }
          } else if (data["tokenError"]){
            tokenError(data);
          } else {
            alert(msglist_cht010['cht.cht010.23']);
          }
      }).fail(function(data){
        alert(msglist_cht010['cht.cht010.24']);
      });
  });

  //メッセージエリア キー押下
  $(document).on("keydown", ".js_chtTextArea", function(e){
    if(e.shiftKey) {
      if (e.which == 13) {
        if (!$(".js_enterSend").prop("checked")) {
          var message = $('.js_chtTextArea').val();
          var fileList = $(".js_inputFileArea").find(".js_temp");
          if (message.replace(/\s+/g,'').length != 0 || fileList.length != 0) {
            if (mode == 0) {
              sendMessage(selectSid, selectKbn);
              return false;
            } else {
              $('cht010-chat-list').attr('data-button-lock', false);
              $(".js_mediaArea").removeClass("media_selected");
              $(".js_mediaArea").removeClass("cht_button-lock");
              $(".js_chtInputArea").removeClass("media_selectedColor");
              var msgContent = $('.js_chtTextArea').val();
              confirmEditChatMessage(msgContent, selectSid, selectKbn, messageSid);
              messageSid = '';
              mode = 0;
              return false;
            }
          }
        }
      } else if (e.which == 38 && mode == 0) {
        if ($("#inText").val().length == 0
          && $(".js_inputFileArea").find(".js_temp").length == 0
          && $(".js_chtMention").length == 0
          && $("input[name='cht010ReplyMessage']").length == 0) {
          let message = $("#js_chatMessageArea").find(".js_media_mine").find('.js_message');
          if (message.length > 0) {
            let messageText = "";
            let myMessage;
            for (var i = (message.length - 1); i > -1; i--) {
              myMessage = message.eq(i).closest('.js_media_mine');
              messageSid = myMessage.find(".js_message_edit").attr("value");
              messageText = myMessage.find(".js_message").html();
              $("#js_chatMessageArea").scrollTop(($("#js_chatMessageArea").scrollTop() + myMessage.offset().top) - 140);
              break;
            }
            message_edit(messageText);
          }
        }
      }
    } else {
      if (e.which == 13) {
        if ($(".js_enterSend").prop("checked")) {
          var message = $('.js_chtTextArea').val();
          var fileList = $(".js_inputFileArea").find(".js_temp");
          if (message.replace(/\s+/g,'').length != 0 || fileList.length != 0) {
            if (mode == 0) {
              sendMessage(selectSid, selectKbn);
              return false;
            } else {
              $('cht010-chat-list').attr('data-button-lock', false);
              $(".js_mediaArea").removeClass("media_selected");
              $(".js_mediaArea").removeClass("cht_button-lock");
              $(".js_chtInputArea").removeClass("media_selectedColor");
              var msgContent = $('.js_chtTextArea').val();
              confirmEditChatMessage(msgContent, selectSid, selectKbn, messageSid);
              messageSid = '';
              mode = 0;
              return false;
            }
          }
        }
      } else if (e.which == 38 && mode == 0) {
        if ($("#inText").val().length == 0
          && $(".js_inputFileArea").find(".js_temp").length == 0
          && $(".js_chtMention").length == 0
          && $("input[name='cht010ReplyMessage']").length == 0) {
          let message = $("#js_chatMessageArea").find(".js_media_mine").find('.js_message');
          if (message.length > 0) {
            let messageText = "";
            let myMessage;
            for (var i = (message.length - 1); i > -1; i--) {
              myMessage = message.eq(i).closest('.js_media_mine');
              messageSid = myMessage.find(".js_message_edit").attr("value");
              messageText = myMessage.find(".js_message").html();
              $("#js_chatMessageArea").scrollTop(($("#js_chatMessageArea").scrollTop() + myMessage.offset().top) - 140);
              break;
            }
            message_edit(messageText);
          }
        }
      }
    }
  });

  //送信押下時
  $(document).on("click", ".js_chtSend", function(){
    var message = $('.js_chtTextArea').val();
    sendMessage(selectSid, selectKbn);
    $("#attachmentFileErrorArea").html("");
  });

  //返信押下時
  $(document).on("click", ".js_chtReply", function(){
    mode = 0;
    sendMessage(selectSid, selectKbn);
    $("#attachmentFileErrorArea").html("");
  });

  //スタンプ送信ボタン押下時
  $(document).on("click", ".js_stampSendButton", function(){
    sendStamp($(this).data('sid'), selectSid, selectKbn);
    $("#attachmentFileErrorArea").html("");
  });

  //添付ダウンロード
  $(document).on("click", ".js_tempFileArea .js_chtTempFile", function(event){
    if (event.target.tagName.toLowerCase() == 'img'
      && !event.target.classList.contains("js_fileImage")) {
      return false;
    }

    document.forms[1].CMD.value="fileDownload";
    tempSid = $(this).find(".js_tempDownload").attr("value");
    document.forms[1].cht010MessageSid.value=$(this).find(".js_tempDownload").data("messagesid");
    document.forms[1].cht010BinSid.value=tempSid;
    document.forms[1].cht010SelectPartner.value=selectSid;
    document.forms[1].cht010SelectKbn.value=selectKbn;
    document.forms[1].submit();
  });

  //入力欄クリック時にテキストエリアにカーソルを当てる
  $(document).on("mousedown", ".js_chtInputArea", function(event){
    if (event.target.tagName.toLowerCase() == "emoji-picker") {
      return true;
    }

    if ($(event.target).closest(".js_chtTextArea").length == 0) {
      event.preventDefault();
    }
    if ($(event.target).closest(".js_chtTempFile").length == 0
      && $(".js_chtTextArea:focus").length == 0
      && $(event.target).closest(".js_chtTextArea").length == 0) {
      $(".js_chtTextArea").focus();
    }
  });

  //未読表示ボタン
  $('.js_cht010JumpMidokuButton').on('click', function() {
    const chatList = document.querySelector('cht010-chat-list');
    let lastReadSid = $(this).attr('data-jumpmessage');
    chatList.jumpArround(lastReadSid);
  });

  //メッセージエリアスクロール処理
  $("#js_chatMessageArea").on("scroll", function() {
    if (wordOverFlg) {
        return;
    }
    //未読→既読処理(即時関数としてreturn時にスクロール処理の終了にならないようにする)
    (function () {
      var windowH = $(".js_content_area").offset().top;
      var footerH = $(".js_sendMessageArea").offset().top;

      //下から探索する
      $($('.js_mediaArea').get().reverse()).each(function(idx) {
          // 未読メッセージに対する処理
        let kidokuFlgTag = $(this).find(".js_kidoku");
        if(kidokuFlgTag.text() == "1") {
          //既読があればeachのループを終了
          return false;
        }
        if(kidokuFlgTag.text() == "0") {
          var tes = $(this).offset().top;
          // 未読メッセージが画面内に表示されている場合
          if (tes > windowH && tes < footerH) {
            let dispMidokuMessage = $(this);

            // 未読数書き換えのキャンセル
            if (kidokuUpdateFunc != null) {
              clearTimeout(kidokuUpdateFunc);
            }
            const kidokuUpdateSelectSid = selectSid
            const kidokuUpdateSelectKbn = selectKbn
            // 未読数書き換え(2秒間待機)
            kidokuUpdateFunc = setTimeout(function() {
              paramStr = 'CMD=updateKidoku';
              paramStr = paramStr + '&cht010MessageSid=' + dispMidokuMessage.attr('value');
              paramStr = paramStr + '&cht010SelectPartner=' + kidokuUpdateSelectSid;
              paramStr = paramStr + '&cht010SelectKbn= ' + kidokuUpdateSelectKbn;
              paramStr = setToken(paramStr);
                $.ajax({
                      async: true,
                      url:  "../chat/cht010.do",
                      type: "post",
                      data: paramStr
                }).done(function( data ) {
                  if (data["success"]) {

                    var cnt = data["count"];
                    var minusCnt = 0;
                    if (kidokuUpdateSelectKbn == 2) {
                      $(".js_chtGroup").each(function(i) {
                        if ($(this).attr('value') == kidokuUpdateSelectSid) {
                          minusCnt = $(this).find('.js_midokuCount').text();
                          if (cnt != 0) {
                                $(this).find('.js_midokuCount').text(cnt);
                          } else {
                              $(this).find('.js_midokuCount').text('');
                          }
                        }
                      });
                    } else {
                      $(".js_chtUser").each(function(i) {
                        if ($(this).attr('value') == kidokuUpdateSelectSid) {
                          minusCnt = $(this).find('.js_midokuCount').text();
                          if (cnt != 0) {
                            $(this).find('.js_midokuCount').text(cnt);
                          } else {
                                $(this).find('.js_midokuCount').text('');
                          }
                        }
                      });
                    }
                    updateTimeline();
                    $('.js_mediaArea').each(function(idx) {
                      if ($(this).find(".js_kidoku").text() == '0') {
                        $(this).find(".js_kidoku").text("1");
                      }
                      if ($(this).is(dispMidokuMessage)) {
                        return false;
                      }
                    });


                    // 未読タブ
                    var allMidoku = Number($(".js_allMidoku").text());

                    allMidoku = allMidoku - (minusCnt - cnt);
                    updateAllMidokuCnt(allMidoku);

                  } else if (data["tokenError"]){
                    scrollAutoReadFlg = 0;
                    tokenError(data);
                  } else {
                    scrollAutoReadFlg = 0;
                    sendErrorAlert(data)
                  }
                }).fail(function(data){
                  alert(msglist_cht010['cht.cht010.24']);
                });
            }, 2000);
            //未読メッセージの走査終了
            return false;
          }
        }
      });


    })();

      //自動読み込み処理
    if (scrollAutoReadFlg == 0) {
      var nowTop = $(this).scrollTop();
      var sH = $(this).get(0).scrollHeight;
      var oH = $(this).get(0).offsetHeight;
        if (sH != oH) {
          var scrollHeight = sH - oH;
          var readMode = 0;
          var messageSid = 0;
          var addBackH;
          const chatList = document.querySelector('cht010-chat-list');
          let ankArr = chatList.querySelectorAll('a[name^="js_jumpMessageSid"]');
          let absBottomLength = nowTop - scrollHeight;
          if (absBottomLength < 0) {
            absBottomLength = -1 * absBottomLength;
          }
          if (nowTop <= 5) {
            readMode = 1;
            messageSid = ankArr[0].getAttribute('data-sid');

          } else if (absBottomLength <= 5) {
            readMode = 2;
            messageSid = ankArr[ankArr.length - 1].getAttribute('data-sid');
          }

          if ((readMode == 1 && allDispTopFlg == 0 ) || (readMode == 2 && allDispBottomFlg == 0)) {
            scrollAutoReadFlg = 1;

            paramStr = 'CMD=scrollRead';
            paramStr = paramStr + '&cht010MessageMaxMinSid=' + messageSid;
            paramStr = paramStr + '&cht010ReadFlg=' + readMode;
            paramStr = paramStr + '&cht010SelectPartner=' + selectSid;
            paramStr = paramStr + '&cht010SelectKbn= ' + selectKbn;
              $.ajax({
                  async: true,
                  url:  "../chat/cht010.do",
                  type: "post",
                  data: paramStr
              }).done(async function( data ) {
                  if (data["success"]) {
                    if (data["size"] > 0) {
                      if (readMode == 1) {
                        var size = data["size"] - 1;
                        var messageInfo = data["messageList"][size];
                        var date = escapeSelectorString(messageInfo["entryDay"]);
                        if($('#'+date+'').length){
                          var parent = $('#'+date+'').parent();
                          $('#'+date+'').remove();
                          parent.append("<div class=\"chat_boder\"></div>");
                        }
                      }

                      //上部読み込み
                      if (readMode == 1) {
                        chatList.prependMessages(data["messageList"]);
                        await chatList.waitMessageDrawFinishedPromise();
                        //リアクションしたユーザ情報の追加(sidが重複している場合は上書き)
                        addReactionUser(data);
                        chatList.jumpNoConnect(messageSid);

                        allDispTopFlg = data["allDispFlg"];
                      //下部読み込み
                      } else if (readMode == 2) {
                        chatList.appendMessages(data["messageList"], false);
                        await chatList.waitMessageDrawFinishedPromise();
                        addReactionUser(data);
                        allDispBottomFlg = data["allDispFlg"];
                      }
                      if ($('#js_chatMessageArea').hasScrollBar()) {
                        var margin_width = getScrollbarWidth();
                        $("#hiduke_header").css({"margin-right":margin_width + 5 + "px"});
                      } else {
                        $("#hiduke_header").css({"margin-right":"5px"});
                      }
                    } else {
                      //取得結果が0件だった時、同じ方向へスクロールした際の追加読み込みを停止する。
                      //トークルーム切り替えまたは投稿ジャンプを行った際にリセットされる。
                      if (readMode == 1) {
                        allDispTopFlg = 1;
                      } else if (readMode == 2) {
                        allDispBottomFlg = 1;
                      }
                    }
                  } else {
                    alert(msglist_cht010['cht.cht010.28']);
                    if (readMode == 1) {
                      allDispTopFlg = 1;
                    } else if (readMode == 2) {
                      allDispBottomFlg = 1;
                    }
                  }
                  scrollAutoReadFlg = 0;

              }).fail(function(data){
                alert(msglist_cht010['cht.cht010.24']);
                scrollAutoReadFlg = 0;
              });
          }
        }
    }

    var hidukefixTop = $("#js_chatMessageArea").offset().top;
    var hidukeTop;
    let downValue = -1;
    var dateValue;
    //スクロール日付保持処理
    if($('.js_hiduke').length){
      $("#hiduke_header").show();
    }
    $(".js_hiduke").each(function(i) {
      if (downValue == -1) {
        $("#hiduke_header").text($(this).attr('value'));
        downValue = 0;
      } else {
          hidukeTop = $(this).offset().top;
          if (hidukeTop <= hidukefixTop && $(this).is('.display_none') == false) {
              $("#hiduke_header").text($(this).attr('value'));
              downValue = hidukeTop;
          }
      }
    });

    let lastReadSid = Number($('.js_cht010JumpMidokuButton').attr('data-jumpmessage'));
    const messagesBottom =  parseInt(
      $("#js_chatMessageArea").offset().top
      +  $("#js_chatMessageArea").outerHeight());

    const chatList = document.querySelector('cht010-chat-list');
    let ankArr = Array.from(chatList.querySelectorAll('a[name^="js_jumpMessageSid"]'));
    if (!isNaN(lastReadSid)) {
      ankArr = ankArr.filter((anker) => { return anker.getAttribute('data-sid') > lastReadSid});
    }
    ankArr.forEach((anker) => {
      let message = $(`#js_jumpMessageSid${anker.getAttribute('data-sid')} + chat-block`);
      var objH = message.outerHeight();
      var objTop = message.offset().top;
      var objBottom = parseInt(objTop + objH - 10);
      let sid = Number(anker.getAttribute('data-sid'));
      if (objBottom <= messagesBottom) {
        if (isNaN(lastReadSid) || lastReadSid < sid) {
          lastReadSid = sid;
        }
      }
    });

    $('.js_cht010JumpMidokuButton').attr('data-jumpmessage', lastReadSid);

    //jumpボタン表示判定
    if (!isNaN(lastReadSid)) {
      let disp = true;
      let message = $(`#js_jumpMessageSid${lastReadSid} + chat-block`);
      if (message.length > 0) {
        var objH = message.outerHeight();
        var objTop = message.offset().top;
        var objBottom = parseInt(objTop + objH - 10);
        if (objBottom <= messagesBottom) {
          disp = false;
        }
      }
      if (disp) {
        $('.js_cht010JumpMidokuButton').removeClass('display_none');
      } else {
        $('.js_cht010JumpMidokuButton').addClass('display_none');
      }
    }
    //新着メッセージをスクロールにより表示したかを判定し、吹き出しを消去
    let newmessageSid = $('.js_cht010JumpMidokuButton').attr('data-newmessage');
    let newmessage = $(`#js_jumpMessageSid${newmessageSid} + chat-block`);
    if (newmessage.length > 0) {
      var objH = newmessage.outerHeight();
      var objTop = newmessage.offset().top;
      var objBottom = parseInt(objTop + objH);
      if (objBottom <= messagesBottom) {
        $('.js_cht010JumpMidokuButton_hukidashi').addClass('display_none');
        $('.js_cht010JumpMidokuButton').removeAttr('data-newmessage');
      }
    }
  });
  if ($('#js_chatMessageArea').hasScrollBar()) {
      var margin_width = getScrollbarWidth();
      $("#hiduke_header").css({"margin-right":margin_width + 6 + "px"});
  } else {
      $("#hiduke_header").css({"margin-right":"6px"});
  }
  dateHeader();

  function centerArea_height_resize() {
    var windowHeight = 0;
    var os, ua = navigator.userAgent;
    if (ua.match(/iPhone|iPad/)) {
      windowHeight = document.documentElement.clientWidth;
    } else {
      var windowHeight = window.innerHeight;
    }

    //ウインドウ幅から領域幅を計算
    var centerArea_height = windowHeight - 141;
    var centerArea_height
    const sendArea = $(".js_sendMessageArea");
    const centerArea_minHeight = sendArea.outerHeight() + 195;


    //送信入力欄の拡大をメッセージ一覧の縮小でクッションできない場合に領域幅を拡張
    if (centerArea_minHeight > centerArea_height) {
      centerArea_height = centerArea_minHeight;
    }

    $('.js_cht010CenterPane').height(centerArea_height);

  }

  window.addEventListener('resize', () => {
    chat_textarea_resize();
  });

  window.addEventListener('resize', () => {
    centerArea_height_resize();
  });

  //メッセージ入力領域リサイズイベント
  const inputResizeObserver = new ResizeObserver((chatInput) => {
    setTimeout(()=> {
      centerArea_height_resize();
    }, 1);
  });

  inputResizeObserver.observe(document.querySelector('.js_sendMessageArea'));

  initDisp("#js_chatMessageArea");


  $(document).on('mouseenter', '.js_chtTempFile', function() {
    $(this).find(".js_temp").addClass("cl_linkSelected");
  });

  $(document).on('mouseleave', '.js_chtTempFile', function() {
    $(this).find(".js_temp").removeClass("cl_linkSelected");
  });

  $(document).on('mouseenter', '.js_chtTempFile img:not(.js_fileImage)', function() {
    $(this).parents(".js_chtTempFile").find(".js_temp").removeClass("cl_linkSelected");
  });

  $(document).on('mouseleave', '.js_chtTempFile img:not(.js_fileImage)', function() {
    $(this).parents(".js_chtTempFile").find(".js_temp").addClass("cl_linkSelected");
  });

  $(document).on('click', '.js_chtReplyArea', function(event) {
    if (event.target.getAttribute("onclick") != null) {
      return true;
    }
    const messageList = document.querySelector('cht010-chat-list');
    messageList.jumpArround($(this).data("messagesid"));
  });
  $(document).on('click', '.js_cht010SearchHeader', (event) => {
      //検索開閉イベント
      toggleSearchAreaVisible();
  });

  $(document).on("click", ".js_chtMute", function() {
    if (muteCheck==1) {
      muteCheck = 0;
    } else {
      muteCheck = 1;
    }

    let paramStr = "CMD=changeMute";
    paramStr = paramStr + '&cht010MuteFlg=' + muteCheck;
    paramStr = paramStr + '&cht010SelectPartner=' + document.forms[1].cht010SelectPartner.value;
    paramStr = paramStr + '&cht010SelectKbn=' + document.forms[1].cht010SelectKbn.value;
    paramStr = setToken(paramStr);

    $.ajax({
      async: true,
      url:  "../chat/cht010.do",
      type: "post",
      data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
          var detail = "";
          if (data["cht010MuteFlg"] == 0) {
            //結果として、ミュートが無効になった場合
            detail += `
              <i class="icon-mute_off cht_icon-mute_off cursor_p js_chtMute fs_18 ml5"></i>
              <span class="icon-mute_off cht_icon-mute_off cursor_p js_chtMute btn_classicImg-display fs_20 ml5"></span>
            `;
            if (data["cht010SelectKbn"] == 2) {
              //タイムラインのグループから、ミュートアイコンを削除
              $(`.js_chtGroup[value="${data["cht010SelectPartner"]}"]`).find(".js_muteIcon").remove();
            } else {
              //タイムラインのユーザから、ミュートアイコンを削除
              $(`.js_chtUser[value="${data["cht010SelectPartner"]}"]`).find(".js_muteIcon").remove();
            }
          } else {
            //結果として、ミュートが有効になった場合
            detail += `
              <i class="icon-mute cursor_p js_chtMute fs_18 ml5"></i>
              <span class="icon-mute cursor_p js_chtMute btn_classicImg-display fs_20 ml5"></span>
            `;

            if (data["cht010SelectKbn"] == 2) {
              //タイムラインのグループにミュートアイコンを追加
              if ($(`.js_chtGroup[value="${data["cht010SelectPartner"]}"]`).find(".js_muteIcon").length == 0) {
                //連続でクリックした場合に、2つ以上表示されないようにする
                const target = $(`.js_chtGroup[value="${data["cht010SelectPartner"]}"]`).find(".js_dspName");
                $(`<span class="icon-mute fs_15 txt_m ml5 js_muteIcon cl_fontMiddle"></span>`).insertAfter(target);
              }
            } else {
              //タイムラインのユーザにミュートアイコンを追加
              if ($(`.js_chtUser[value="${data["cht010SelectPartner"]}"]`).find(".js_muteIcon").length == 0) {
                const target = $(`.js_chtUser[value="${data["cht010SelectPartner"]}"]`).find(".js_dspName");
                $(`<span class="icon-mute fs_15 txt_m ml5 js_muteIcon cl_fontMiddle"></span>`).insertAfter(target);
              }
            }
          }
          $(".js_chtMute").eq(1).remove();
          $(".js_chtMute").replaceWith(detail);

        } else if (data["tokenError"]){
          tokenError(data);
        } else {
          sendErrorAlert(data);
        }
    }).fail(function(data){
      alert(msglist_cht010['cht.cht010.83']);
    });
  });


  //ピンどめ一覧取得
  loadPinList(true, 0);

  //ピンどめ一覧 スクロールによる追加読み込み
  $(".js_pinMessageList").on("scroll", function() {
    if (scrollAutoReadFlg == 0) {
      var nowTop = $(this).scrollTop();
      var sH = $(this).get(0).scrollHeight;
      var oH = $(this).get(0).offsetHeight;
      if (sH != oH) {
        var scrollHeight = sH - oH;
        var readMode = 0;
        let absBottomLength = nowTop - scrollHeight;
        if (absBottomLength < 0) {
          absBottomLength = -1 * absBottomLength;
        }
        if (absBottomLength <= 5) {
          if (!doAddPinMessageFlg) {
            doAddPinMessageFlg = true;
            loadPinList(false, $('.js_pinMessage').length);
          }
        }
      }
    }
  });

  function paneToggle(flg) {
    var formData = new FormData($('#js_chtForm').get(0));
    formData.delete('CMD');
    formData.append('CMD', 'toggleRightpane');
    formData.append('cht010RightpaneFlg', flg);

    const ajaxParam = Array.from(formData.entries())
                            .map(entry => {
                              return $.param(Object.fromEntries(new Map([entry])));
                              })
                              .join('&');
    $.ajax({
          async: true,
          url:  "../chat/cht010.do",
          type: "post",
          data: ajaxParam,
          processData: false, // dataをクエリ文字列にしない
      }).done(( data ) => {
        this.seachFlg = false;
        if (data['success']) {
        } else {
          alert(msglist_cht010['cht.cht010.23']);
          return;
        }
      });

  }
  //右ペインを開く
  $('.js_cht010RightPane-closable').on('pane-open', () => {
    paneToggle(0);

  });
  //右ペインを閉じる
  $('.js_cht010RightPane-closable').on('pane-close', () => {
    paneToggle(1);
  });

  $(document).on("mouseenter", ".js_mentionLink", function() {
    if (mode == 1) {
      $(this).addClass("cursor_n");
      $(this).removeClass("cursor_p");
    }
  });

  $(document).on("mouseleave", ".js_mentionLink", function() {
    $(this).addClass("cursor_p");
    $(this).removeClass("cursor_n");
  });
});

//メッセージ編集
function message_edit(messageText) {
    var messageList = messageText.split(/(<br>)/);
    var message = messageText.replace(/(<br>)/g, '\n');
    message = $('<a>' + message + '</a>').text();

  $(".js_inputFileArea").find(".js_temp").each(function() {
    var sid = $(this).attr('value');
    attachmentDeleteFile(sid, '');
  });

  $("#js_errorMsg").text("");
  $("#cmn110fileDataArea").children().remove();
  mode = 1;
  $('cht010-chat-list').attr('data-button-lock', true);
  $(".js_mediaArea").addClass("cht_button-lock");
  $(".js_media_" + messageSid).addClass("media_selected");
  $(".js_chtInputArea").addClass("media_selectedColor");
  $(".js_chtInputArea").find(".js_chtTextArea").addClass("media_selectedColor");
  $(".js_chtTextArea").val(message);
  $(".js_chtConfirm").removeClass("display_n");
  $(".js_chtCansel").removeClass("display_n");
  $(".js_chtSend").addClass("display_n");
  $(".js_chtAttach").addClass("display_n");
  $(".js_chtStamp").addClass("display_n");
  $(".js_chtMentionButton").addClass("display_n");
  removeAllMention();
  $(".js_emojiPicker").addClass("display_none");
  $(".js_stampPicker").addClass("display_none");
  $(".js_chtTextArea").focus();
  chat_textarea_resize();
}

function message_reply() {

  const selectSid = document.forms[1].cht010SelectPartner.value;
  const selectKbn = document.forms[1].cht010SelectKbn.value;
  paramStr = 'CMD=getReplyTarget';
  paramStr = paramStr + '&cht010MessageSid=' + messageSid;
  paramStr = paramStr + '&cht010SelectPartner=' + selectSid;
  paramStr = paramStr + '&cht010SelectKbn= ' + selectKbn;
  paramStr = setToken(paramStr);
  $.ajax({
    async: true,
    url:  "../chat/cht010.do",
    type: "post",
    data: paramStr
  }).done(function( data ) {
    if (data["success"]) {
      //データの取得に成功した場合は画面に表示
      const chatBlock = new Cht010ChatBlock("");
      if (data["messageList"] == null || data["messageList"].length == 0) {
        return false;
      }

      $('cht010-chat-list').attr('data-button-lock', true);
      $(".js_mediaArea").addClass("cht_button-lock");
      $(".js_media_" + messageSid).addClass("media_selected");
      $(".js_chtInputArea").addClass("media_selectedColor");
      $(".js_chtInputArea").find(".js_chtTextArea").addClass("media_selectedColor");
      $(".js_chtReply").removeClass("display_n");
      $(".js_chtConfirm").addClass("display_n");
      $(".js_chtCansel").addClass("display_n");
      $(".js_chtSend").addClass("display_n");
      $(".js_emojiPicker").addClass("display_none");
      $("#js_errorMsg").text("");

      const messageMdl = data["messageList"][0];
      const canSendFlg = $("#inText").attr('readonly') != 'readonly';
      const insertHtml = chatBlock.createReplyDisp(messageMdl, true, canSendFlg);

      $(".js_chtInputArea").prepend(insertHtml);
      $(".js_chtTextArea").focus();
      chat_textarea_resize();
    } else if (data["errorAlert"]) {
      sendErrorAlert(data);
    } else {
      if (typeof dspError == 'function') {
        var errorMsg = msglist_cht010['cht.cht010.67'];
        dspError(errorMsg);
      }
    }
  }).fail(function(){
    alert(msglist_cht010['cht.cht010.67']);
  });
}

function resetReply() {
  $('cht010-chat-list').attr('data-button-lock', false);
  messageSid = '';
  $(".js_mediaArea").removeClass("media_selected");
  $(".js_mediaArea").removeClass("cht_button-lock");
  $(".js_chtInputArea").removeClass("media_selectedColor");
  $(".js_chtInputArea").find(".js_chtReplyArea").remove();
  $(".js_chtInputArea").find(".js_chtTextArea").removeClass("media_selectedColor");
  $(".js_chtReply").addClass("display_n");
  $(".js_chtConfirm").addClass("display_n");
  $(".js_chtCansel").addClass("display_n");
  $(".js_chtSend").removeClass("display_n");
  $("#js_errorMsg").text("");
}

function addMention(selectUsrSid) {
  //編集状態の時、画面上に表示しない
  if (mode == 1) {
    return;
  }
  //選択済みのユーザの場合、画面上に追加しない
  if ($(`input[name="cht010MentionUserSids"][value="-1"]`).length > 0
    || $(`input[name="cht010MentionUserSids"][value="${selectUsrSid}"]`).length > 0) {
      return;
  }
  //ユーザ情報が取れない場合、画面上に追加しない
  let memberList = $(".js_cht010MemberTemplate").find("cht010-member-small");
  if (memberList == null || memberList.length == 0) {
    return;
  }
  let insertHtml = "";
  let usrImage;
  let usrName;
  let isExist = false;

  if (selectUsrSid == -1) {
    usrImage = `
      <img src="../common/images/classic/icon_photo.gif" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w18 btn_classicImg-display">
      <img src="../common/images/original/photo.png" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w18 btn_originalImg-display"></img>
    `;
    usrName = `<span class="fw_b ml5 mt3">${msglist_cht010["cht.cht010.80"]}</span>`;
    isExist = true;
  } else {
    memberList.each(function(){
      if (selectUsrSid != $(this).data("usr_sid")
        || $(this).data("usr_jkbn") == 9) {
        return;
      }
      isExist = true;
      if ($(this).data("usi_pict_kf") == 1) {
        usrImage= `
          <span class="hikokai_photo-s hikokai_text hikokai_font-ss cl_fontWarn cursor_d userIcon_size-w18">${msglist_cht010['cmn.private.photo']}</span>
        `;
      } else if ($(this).data("bin_sid") > 0) {
        usrImage = `
          <img src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=${$(this).data("bin_sid")}" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w18">
        `;
      } else {
        usrImage = `
          <img src="../common/images/classic/icon_photo.gif" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w18 btn_classicImg-display">
          <img src="../common/images/original/photo.png" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w18 btn_originalImg-display">
        `;
      }

      let linkClass = "cl_linkDef";
      if ($(this).data("usr_uko_flg") == 1) {
        linkClass = "mukoUser"
      }

      usrName = `
        <span class="${linkClass} linkHover_line cursor_p fw_b ml5" onclick="openUserInfoWindow(${$(this).data("usr_sid")});">
          ${$(this).data("usi_name").replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;')}
        </span>
      `;
    });
  }
  if (!isExist) {
    return;
  }

  let bgcClass = "bgC_chtMention"
  if (selectUsrSid == -1 || selectUsrSid == document.forms[1].cht010EditUsrSid.value) {
    bgcClass = "bgC_chtMention-select"
  }

  insertHtml += `
    <div class="js_chtMention cht_mention pos_rel mb5 mr5 verAlignMid p3 pr20 pl10 lh130 ${bgcClass}">
      <input type="hidden" name="cht010MentionUserSids" value="${selectUsrSid}">
      <span class="verAlignMid">
        ${usrImage}
      </span>
      <span class="fontoffset">${usrName}</span>
      <div class="pos_abs cht_deleteIcon">
        <img src="../common/images/original/icon_delete.png" alt="削除アイコン" class="btn_originalImg-display hp18 cursor_p" onclick="deleteMention(event);">
        <img src="../common/images/classic/icon_delete.png" alt="削除アイコン" class="btn_classicImg-display hp18 cursor_p" onclick="deleteMention(event);">
      </div>
    </div>
  `;

  if ($(".js_chtInputArea").find(".js_chtMentionArea").length == 0) {
    if ($(".js_chtInputArea").find(".js_chtReplyArea").length != 0) {
      //返信がある場合は、その下にメンション描画領域を追加
      $(`<div class="js_chtMentionArea cht_mentionArea"></div>`).insertAfter($(".js_chtInputArea").find(".js_chtReplyArea"));
    } else {
      //返信がない場合は、一番上にメンション描画領域を追加
      $(".js_chtInputArea").prepend(`<div class="js_chtMentionArea cht_mentionArea"></div>`);
    }
  }

  $(".js_chtMentionArea").append(insertHtml);

  const mention = $(".js_mentionPalette").find("cht010-senderselect")[0];
  mention.paneDraw();

  var textarea = document.getElementById("inText");
  textarea.style.height = 60 + "px";
  chat_textarea_resize();
}

function deleteMention(event) {
  $(event.target).closest(".js_chtMention").remove();
  const mention = $(".js_mentionPalette").find("cht010-senderselect")[0];
  mention.paneDraw();
}

function dateHeader() {
  var sH = $("#js_chatMessageArea").get(0).scrollHeight;
  var oH = $("#js_chatMessageArea").get(0).offsetHeight;
    if (sH == oH) {
      if(!$('.js_hiduke').length){
        $("#hiduke_header").hide();
      } else {
         $("#hiduke_header").show();
      }

      var firstDate = document.forms[1].cht010FirstEntryDay.value;
      var date = escapeSelectorString(firstDate);
      $("#"+date).hide();
      $("#hiduke_header").text(firstDate);
    }
}

function dragEnterCht(e) {
  if (mode == 0) {
      $(".js_chtInputArea").addClass("media_selectedColor");
      e.stopPropagation();
      e.preventDefault();
  }
}

function dragLeaveCht(e) {
  if (mode == 0) {
    $(".js_chtInputArea").removeClass("media_selectedColor");
      e.stopPropagation();
      e.preventDefault();
  }
}


function drag() {
  dropbox = document.getElementById("inText");
  dropbox.addEventListener("dragenter", dragEnterCht, false);
  dropbox.addEventListener("dragleave", dragLeaveCht, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", dropCht, false);
}

function dropCht(e) {
  e.stopPropagation();
  e.preventDefault();
  if ($("#inText").attr('readonly') != 'readonly') {
    if (mode == 0) {
        $("#js_errorMsg").text("");
        var files = e.dataTransfer.files;
        uploadFiles(files);
        $(".js_chtInputArea").removeClass("media_selectedColor");
      } else {
        $("#js_errorMsg").text(errorMsg);
      }
  }
}

function escapeSelectorString(val){
  var word;
    word = val.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, "\\$&")
  return word;
}

function messageSendArea(data) {

  var detail = "";
  var kbn =  data["messageAreaDisp"];

  if (kbn == 0) {
    detail += `
    <div class="w100">
      <span class="verAlignMid mt5">
    `;
    if (data["enterFlg"] == 1) {
      detail +=`<input type="checkbox" name="enter" value="1" id="enter" class="js_enterSend cursor_p" checked><label for="enter" class="pl5">${msglist_cht010['cht.cht010.09']}</label>`;
    } else {
      detail +=`<input type="checkbox" name="enter" value="0" id="enter" class="js_enterSend cursor_p"><label for="enter" class="pl5">${msglist_cht010['cht.cht010.09']}</label>`;
    }

    let stampButton = "";
    if (data["stampButtonFlg"]) {
      stampButton = `
        <span class="js_chtStamp cursor_p mr5" onclick="showStampPalette(event);">
          <img class="btn_classicImg-display" src="../chat/images/classic/icon_stamp.png" alt="stamp">
          <img class="btn_originalImg-display" src="../chat/images/original/icon_stamp.png" alt="stamp">
        </span>
      `;
    }

    detail += `
        <span id="cmn110fileDataArea" class="ml10"></span>
        <span class="js_chtAttach cursor_p mr5" onClick="attachmentLoadFile('');">
          <img class="btn_classicImg-display" src="../common/images/classic/icon_temp_file_2.png">
          <img class="btn_originalImg-display" src="../common/images/original/icon_attach.png">
        </span>
        <span class="js_chtEmoji cursor_p mr5" onclick="showEmojiPalette(event);">
          <img class="btn_classicImg-display" src="../common/images/classic/icon_emoji.png" alt="emoji">
          <img class="btn_originalImg-display" src="../common/images/original/icon_emoji.png" alt="emoji">
        </span>
        ${stampButton}
        <span class="js_chtMentionButton cursor_p mr5" onclick="showMentionPalette(event);">
          <img class="btn_classicImg-display" src="../chat/images/classic/icon_mention.png" alt="mention">
          <img class="btn_originalImg-display" src="../chat/images/original/icon_mention.png" alt="mention">
        </span>
        <span id="js_errorMsg" class="ml5 cl_fontWarn"></span>
      </span>
      <span class="flo_r">
        <input type="file" id="attachmentAreaBtn" class="display_none" onchange="attachFileSelect(this, '');" multiple="">
        <button type="button" class="baseBtn display_n js_chtCansel">
          <img class="btn_classicImg-display" src="../common/images/classic/icon_close.png">
          <img class="btn_originalImg-display" src="../common/images/original/icon_close.png">
          ${msglist_cht010['cmn.cancel']}
        </button>
        <button type="button" class="baseBtn js_chtSend">
          <img class="btn_classicImg-display" src="../common/images/classic/icon_edit_1.png">
          <img class="btn_originalImg-display" src="../common/images/original/icon_edit.png">
          ${msglist_cht010['cmn.sent']}
        </button>
        <button type="button" class="baseBtn display_n js_chtConfirm">
          <img class="btn_classicImg-display" src="../common/images/classic/icon_kakutei.png">
          <img class="btn_originalImg-display" src="../common/images/original/icon_kakutei.png">
          ${msglist_cht010['cmn.final']}
        </button>
        <button type="button" class="baseBtn display_n js_chtReply">
          <img src="../chat/images/original/icon_reply.png">
          ${msglist_cht010['cmn.reply']}
        </button>
      </span>
      <span class="clear_b display_tbl"></span>
    </div>
    <div class="cht_inputArea js_chtInputArea mt3">
    `;

    if (data["enterFlg"] == 1) {
      detail += `<textarea class="chattextArea js_chtTextArea" id="inText" placeholder="${msglist_cht010['cht.cht010.10']}"></textarea>`;
    } else {
      detail += `<textarea class="chattextArea js_chtTextArea" id="inText" placeholder="${msglist_cht010['cht.cht010.16']}"></textarea>`;
    }
    detail += `
    </div>
    `;
  } else {
    detail += "  <div class=\"w100\">"
            +"     <span class=\"verAlignMid mt5\">"
            +"       <input type=\"checkbox\" name=\"enter\" class=\"mr5\" value=\"0\" disabled checked>"+msglist_cht010['cht.cht010.09']
            +"     </span>"
            + "  </div>";
    if (data["messageAreaDisp"] == 1) {
        $(".js_message_reaction").remove();
        $(".js_message_reply").remove();
        detail += "  <textarea class=\"cursor_d chattextArea\" id=\"inText\" placeholder=\""+msglist_cht010['cht.cht010.05']+"\" readonly ></textarea>";
    } else if (data["messageAreaDisp"] == 2) {
        $(".js_message_reaction").remove();
        $(".js_message_reply").remove();
      detail += "  <textarea class=\"cursor_d chattextArea\" id=\"inText\" placeholder=\""+msglist_cht010['cht.cht010.06']+"\" readonly ></textarea>";
    } else if (data["messageAreaDisp"] == 3) {
        $(".js_message_reaction").remove();
        $(".js_message_reply").remove();
      detail += "  <textarea class=\"cursor_d chattextArea\" id=\"inText\" placeholder=\""+msglist_cht010['cht.cht010.07']+"\" readonly ></textarea>";
    } else if (data["messageAreaDisp"] == 4) {
        $(".js_message_reaction").remove();
        $(".js_message_reply").remove();
      detail += "  <textarea class=\"cursor_d chattextArea\" id=\"inText\" placeholder=\""+msglist_cht010['cht.cht010.08']+"\" readonly ></textarea>";
    } else if (data["messageAreaDisp"] == 5) {
        $(".js_message_reaction").remove();
        $(".js_message_reply").remove();
      detail += "  <textarea class=\"cursor_d chattextArea\" id=\"inText\" placeholder=\""+msglist_cht010['cht.cht010.39']+"\" readonly ></textarea>";
    }
  }
  $(".js_sendMessageArea").children().remove();
  $(".js_sendMessageArea").append(detail);
}

var wordOverFlg = false;
// メッセージを送信
function sendMessage(selectSid, selectKbn) {
  // 送信するメッセージ
  $("#js_errorMsg").text("");
  var message = $('.js_chtTextArea').val();
  $("#cmn110fileDataArea").children().remove();
  wordOverFlg = true;

    var param = createParamCht010();
    param['CMD'] = 'sendMessage';
    param['cht010Message'] = message.replace(/\r/g, '').replace(/\n/g, '\r\n');
    param['cht010SelectPartner'] = selectSid;
    param['cht010SelectKbn'] = selectKbn;
    //ファイルダウンロードにより残った選択情報を除去
    delete param.cht010MessageSid;
    var paramStr = $.param(param, true);
    paramStr = setToken(paramStr);
    $.ajax({
        async: false,
        url:  "../chat/cht010.do",
        type: "post",
        data: paramStr
    }).done(function(data) {
        if (data["success"]) {
            resetReply();
            textClear();
            $(".js_emojiPicker").addClass("display_none");
            $(".js_stampPicker").addClass("display_none");
            if (!parent.webSocket) {
                if (typeof dspError == 'function') {
                    var errorMsg = "";
                    errorMsg = "メッセージの表示に失敗しました。<br>"
                        + "再接続を行うと送信したメッセージが表示されます。";
                    dspError(errorMsg);

                }
            }
            midokuData = $.extend(true, {}, data);
            if (data["selectKbn"] == 1) {
                midokuData['senderSid'] = data['selectSid'];
                midokuData["usrName_0"] = data['chatName'];
                midokuData["usrJkbn_0"] = data['usrJkbn'];
                midokuData["usrUkoFlg_0"] = data['usrUkoFlg'];
            }
            midokuData["entryTime_0"] = '';
            midokuData["insertDate_0"] = '';

            $(".js_mentionPalette").find(".js_cht010SearchInputSender_input").val("");
            const mention = $(".js_mentionPalette").find("cht010-senderselect")[0];
            mention.paneDraw();
        } else if (data["error"]) {
            sendError(data);
        } else if (data["errorAlert"]) {
            sendErrorAlert(data);
        } else if (data["tokenError"]){
            tokenError(data);
        } else {
            if (typeof dspError == 'function') {
                var errorMsg = msglist_cht010['cht.cht010.50'];

                dspError(errorMsg);
            }
        }

    }).fail(function(data){
        if (typeof dspError == 'function') {
            var errorMsg = msglist_cht010['cht.cht010.50'];

            dspError(errorMsg);
        }
    });


  wordOverFlg = false;
}

// メッセージの削除処理
function confirmDeleteMessage(selectSid, selectKbn, messageSid) {
    var param = createParamCht010();
    param['CMD'] = 'messageDelete';
    param['cht010MessageSid'] = messageSid
    param['cht010SelectPartner'] = selectSid;
    param['cht010SelectKbn'] = selectKbn;
    var paramStr = $.param(param, true);
    paramStr = setToken(paramStr);
    $.ajax({
        async: true,
        url:  "../chat/cht010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (!parent.webSocket) {
                if (typeof dspError == 'function') {
                    var errorMsg = "";
                    errorMsg = "メッセージ削除結果の表示に失敗しました。<br>"
                        + "再接続を行うと削除結果が画面に反映されます。";
                    dspError(errorMsg);
                }
            }
        } else if (data["errorAlert"]) {
            sendErrorAlert(data);
        } else if (data["tokenError"]){
            tokenError(data);
        } else {
            if (typeof dspError == 'function') {
                var errorMsg = msglist_cht010['cht.cht010.50'];

                dspError(errorMsg);
            }
        }
    }).fail(function(data){
        if (typeof dspError == 'function') {
            var errorMsg = msglist_cht010['cht.cht010.50'];

            dspError(errorMsg);
        }
    });
}

// メッセージの更新処理
function confirmEditChatMessage(msgContent, selectSid, selectKbn, messageSid) {
    var message = msgContent;

    $("#cmn110fileDataArea").children().remove();


    var param = createParamCht010();
    param['CMD'] = 'messageEdit';
    param['cht010MessageSid'] = messageSid
    param['cht010SelectPartner'] = selectSid;
    param['cht010SelectKbn'] = selectKbn;
    param['cht010Message'] = message.replace(/\r/g, '').replace(/\n/g, '\r\n');

    var paramStr = $.param(param, true);
    paramStr = setToken(paramStr);
    $.ajax({
        async: true,
        url:  "../chat/cht010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            textClear();
            $(".js_emojiPicker").addClass("display_none");
            $(".js_stampPicker").addClass("display_none");
            if (!parent.webSocket) {
                if (typeof dspError == 'function') {
                    var errorMsg = "";
                    errorMsg = "メッセージの表示に失敗しました。<br>"
                        + "再接続を行うと送信したメッセージが表示されます。";
                    dspError(errorMsg);
                }
            }
        } else if (data["error"]) {
            sendError(data);
        } else if (data["errorAlert"]) {
            sendErrorAlert(data);
        } else if (data["tokenError"]){
            tokenError(data);
        } else {
            if (typeof dspError == 'function') {
                var errorMsg = msglist_cht010['cht.cht010.50'];

                dspError(errorMsg);
            }
        }
    }).fail(function(data){
        if (typeof dspError == 'function') {
            var errorMsg = msglist_cht010['cht.cht010.50'];

            dspError(errorMsg);
        }
    });
}

// トークンエラー
function tokenError(data) {
  var detail = data["errorMessage_0"];
  $("#js_error").text(detail);
}

// メッセージ送信エラー
function sendError(data) {
  var detail = "";
  for (var i = 0; i < data["errorSize"]; i++) {
    var denger = "<br>";
    var word = data["errorMessage_"+i].replace(denger,"");
    detail += word;
  }
    $("#js_errorMsg").text(detail);
}
// メッセージ送信エラーalert
function sendErrorAlert(data) {
    alert(data["errorMsg"]);
}

// メッセージを編集
function editMessage(data) {
  let messageText = "";
  messageText += data["msgContent"];
  let div = document.createElement('div');
  div.innerHTML = messageText.replaceAll(/<BR>/g, " ").replaceAll(/<wbr>/g, "");
  let textContent = div.textContent;
  div.innerText = textContent;
  let replyText = div.innerHTML;

  if (data["success"]) {
    if (data["selectKbn"] == document.forms[1].cht010SelectKbn.value) {
      var detail = "";

        detail += "       <span class=\"js_message\">"+messageText+"</span>"
                + "       <span class=\"cl_fontWeek edit_chat fs_12\">"
                + "         <span class=\"edit_time ml5 bgC_body bor1 cl_fontBody\">"
                +             data["updateDay"] + "&nbsp;"
                +             data["updateTime"]
                + "         </span>"
                + msglist_cht010['cht.cht010.02']
                + "       </span>"
        editParent = $(".js_media_text_" + data["messageSid"]);
        var tempFiles = editParent.find(".js_tempFileArea").prop("outerHTML");
        editParent.empty();
        editParent.append(detail);
        editParent.append(tempFiles);

        let fileMsg = "";
        if ($(`.js_chtReplyArea[data-messagesid="${data["messageSid"]}"]`).find(".js_replyFile").length > 0) {
          fileMsg = $(`.js_chtReplyArea[data-messagesid="${data["messageSid"]}"]`).find(".js_replyFile").prop("outerHTML");
        }

        var area = `
          <span class="display_inline-block mxwp200 of_h txt_overflow-ellipsis no_w ml5 word_b-all cl_fontWeek js_replyText">
            ${replyText}
            ${fileMsg}
          </span>
        `;
        $(`.js_chtReplyArea[data-messagesid="${data["messageSid"]}"]`).find(".js_replyText").remove();
        $(`.js_chtReplyArea[data-messagesid="${data["messageSid"]}"]`).append(area);

        if (data["senderSid"] == document.forms[1].cht010EditUsrSid.value) {
          $('.js_chtTextArea').val("");
          var textarea = document.getElementById("inText");
          textarea.style.height = chat_textarea_min_height + 'px';
          $('cht010-chat-list').attr('data-button-lock', false);
          $(".js_mediaArea").removeClass("media_selected");
          $(".js_mediaArea").removeClass("cht_button-lock");
          $(".js_chtInputArea").removeClass("media_selectedColor");
          $(".js_chtConfirm").addClass("display_n");
          $(".js_chtCansel").addClass("display_n");
          $(".js_chtSend").removeClass("display_n");
          $(".js_chtAttach").removeClass("display_n");
          $(".js_chtStamp").removeClass("display_n");
          $(".js_chtMentionButton").removeClass("display_n");
          removeAllMention();
          messageSid = '';
          mode = 0;
        }

        //ピンどめ済み投稿の場合、更新する
        var pinMessage = $('#messagePin_' + data["messageSid"]).length;
        if (pinMessage == 1) {

          var appendMessageText = "";
          if (messageText != null || messageText.length != 0) {
            //タグを除去
            let div = document.createElement('div');
            div.innerHTML = messageText;
            var messageTextData = div.textContent;
            if (messageTextData.length > 35) {
              messageTextData = substringText(messageTextData, 0, 35) + "...";
            } else {
              messageTextData = messageTextData;
            }
            appendMessageText = messageTextData;
          }
          $('#messagePin_' + data["messageSid"]).find(".js_messageBody").text(appendMessageText);
        }
        //ユーザ名部分の押下禁止ポインタを元に戻す(編集実行時にカーソルが当たっているユーザ名のみが対象)
        $(".js_mentionLink").addClass("cursor_p");
        $(".js_mentionLink").removeClass("cursor_n");
    }
  } else {
    alert(msglist_cht010['cht.cht010.29']);
    $(this).dialog('close');
  }
}

//リアクションを登録/削除
function editReaction(data) {
  //リアクションの登録/削除処理に失敗
  if (!data["success"]) {
    alert(msglist_cht010['cht.cht010.64']);
  }
  //該当のチャットが開かれていない場合
  if (data["selectKbn"] != document.forms[1].cht010SelectKbn.value
    || $(".js_media_" + data["messageSid"]).length == 0) {
      return false;
  }
  addReactionUser(data);
  const chatBlock = new Cht010ChatBlock("");
  if (data["messageList"] != null && data["messageList"].length > 0) {
    var insertHtml = chatBlock.createReactionArea(data["messageList"][0]);
    $(".js_media_text_" + data["messageSid"]).parent().find(".js_reaction").remove();
    $(".js_media_text_" + data["messageSid"]).parent().append(insertHtml);
  }
}

// メッセージ削除の実行
function deleteMessage(data) {
    if (data["success"]) {
      if (data["selectKbn"] == document.forms[1].cht010SelectKbn.value) {
        var detail = "";
        detail +=`
        <div>
          <div class="js_mediaArea mediaArea display_flex chat_lrSpace pt5 pb5" value="${data["messageSid"]}">
            <div class="flo_l mr10 wp50">
              <img src="../common/images/classic/icon_photo.gif" name="userImage" onload="initImageView50('userImage101')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_classicImg-display"><img src="../common/images/original/photo.png" name="userImage" onload="initImageView50('userImage101');" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_originalImg-display">
            </div>
            <div class="of_h pb5 verAlignMid">
            <div>
              <span class="js_message word_b-all">
                <img src="../common/images/classic/icon_trash.png" class="btn_classicImg-display">
                <img src="../common/images/original/icon_trash.png" class="btn_originalImg-display">&nbsp;${msglist_cht010['cht.cht010.03']}
              </span>
            </div>
          </div>
        </div>`;

        var message = $(".js_media_" + data["messageSid"]);
        message.replaceWith(detail);


        //メッセージ一覧の返信元投稿の修正
        let delMessage = `
          <div class="verAlignMid">
            <span class="display_inline-block mxwp200 of_h txt_overflow-ellipsis no_w word_b-all cl_fontWeek js_replyText">${msglist_cht010['cht.cht010.03']}</span>
          </div>
        `;
        $(".js_messageArea").find(`.js_chtReplyArea[data-messagesid="${data["messageSid"]}"]`).html(delMessage);

        //入力欄の返信元投稿の修正
        let delMessageButton = "";
        delMessageButton += `
          ${delMessage}
          <div class="pos_abs cht_deleteIcon">
            <img src="../common/images/original/icon_delete.png" alt="削除アイコン" class="btn_originalImg-display hp18 cursor_p" onclick="resetReply();">
            <img src="../common/images/classic/icon_delete.png" alt="削除アイコン" class="btn_classicImg-display hp18 cursor_p" onclick="resetReply();">
          </div>
        `;
        $(".js_chtInputArea").find(`.js_chtReplyArea[data-messagesid="${data["messageSid"]}"]`).html(delMessageButton);

        //ピンどめ一覧から削除
        $('#messagePin_' + data["messageSid"]).remove();
        if ($('.js_pinMessageList ').children().length == 0) {
          $('.js_pinMessageList').append("<div class='mb5 fs_13'>" + msglist_cht010['cht.cht010.74'] + "</div>");
        }
      }
      } else {
        alert(msglist_cht010['cht.cht010.29']);
        $(this).dialog('close');
      }
}



async function appendMessage(data) {

  var senderFlg = data["senderSid"] == document.forms[1].cht010EditUsrSid.value;

  if (senderFlg ) {
    var selectUserFlg = data["selectSid"] == document.forms[1].cht010SelectPartner.value && data["selectKbn"] == 1;
    var selectGroupFlg = data["selectSid"] == document.forms[1].cht010SelectPartner.value && data["selectKbn"] == 2;

    if (!selectUserFlg && !selectGroupFlg) {
      return;
    }

    const chatList = document.querySelector('cht010-chat-list');
      //最下部のメッセージを取得済み
    if (allDispBottomFlg == 1) {
      chatList.appendMessages(data["messageList"], false);
      scrollAutoReadFlg = 1;
      $("#js_chatMessageArea").animate({scrollTop: $("#js_chatMessageArea").get(0).scrollHeight},'fast',function(){
        scrollAutoReadFlg = 0;
      });
      updateKidokuAll(data);
      updateMidokuTab(data, 0, true);
      return;
    }

    if (mineMessageAppendTimeout != null) {
      clearTimeout(mineMessageAppendTimeout);
    }
    // 送信者かつ送信先グループの画面を表示している場合最新へjump
    // 複数のメッセージを連続受信が考えられるため、0.2秒の待機を行う
    mineMessageAppendTimeout = setTimeout(function() {
      chatList.jumpArround(data["messageList"].pop()["messageSid"]);
    }, 200);

    //メッセージを送信した際はそのチャットルーム内のメッセージを全て既読状態にする
    updateKidokuAll(data);

    updateMidokuTab(data, 0, true);
    return;

  }
  if (senderFlg == false) {
    var selectUserFlg = data["senderSid"] == document.forms[1].cht010SelectPartner.value && data["selectKbn"] == 1;
    var selectGroupFlg = data["selectSid"] == document.forms[1].cht010SelectPartner.value && data["selectKbn"] == 2;

    if (selectUserFlg || selectGroupFlg) {
      // 送信者ではなく送信先グループの画面を表示している場合のみ画面に描画
      $(".js_listMake").attr("data-type", data["type"] || "");
      $(".js_listMake").attr("data-command", data["command"] || "");
      let fukidashiFlg = true;
      if (allDispBottomFlg == 1) {
        var area = document.getElementById("js_chatMessageArea");
        var scrollFromBottom = parseInt(area.scrollHeight - area.clientHeight - area.scrollTop);

        const chatList = document.querySelector('cht010-chat-list');
        chatList.appendMessages(data["messageList"], false);
        await chatList.waitMessageDrawFinishedPromise();


        // 最下部表示時に受信は自動スクロール
        if (scrollFromBottom == 0) {
          fukidashiFlg = false;
          scrollAutoReadFlg = 1;
          $("#js_chatMessageArea").animate({scrollTop: $("#js_chatMessageArea").get(0).scrollHeight},'fast',function(){
            scrollAutoReadFlg = 0;
          });
        }
        // スクロールできない画面の場合、受信したメッセージを既読にする
        if ($("#js_chatMessageArea").get(0).scrollHeight - $("#js_chatMessageArea").get(0).clientHeight <= 0) {
          fukidashiFlg = false;
          changeToKidoku(document.forms[1].cht010SelectKbn.value, document.forms[1].cht010SelectPartner.value);
        }
      }
      //メッセージ追加後に、パラメータを元に戻す
      $(".js_listMake").attr("data-command", "");

      // 受信したユーザが送信者と同じ場合、未読件数は増やさない
      if (data["senderSid"] == document.forms[1].cht010EditUsrSid.value) {
        updateMidokuTab(data, 0, true);
        return;
      }
      if (!$('.js_cht010JumpMidokuButton').attr('data-jumpmessage')) {
        $('.js_cht010JumpMidokuButton').attr('data-jumpmessage', data["messageList"][0]['messageSid']);
      }
      $('.js_cht010JumpMidokuButton').attr('data-newmessage', data["messageList"][0]['messageSid']);
      if (fukidashiFlg) {
        //新着吹き出し表示を設定
        $('.js_cht010JumpMidokuButton_hukidashi').removeClass('display_none');
      }
    }
  }
  // 未読数更新
  var jsCht;
  var jsName;
  var jsDspName;
  var targetSid;
  if (data["selectKbn"] == 1) {
    jsCht = "js_chtUser";
    targetSid = data["senderSid"];
  } else if (data["selectKbn"] == 2) {
    jsCht = "js_chtGroup";
    targetSid = data["selectSid"];
  }
  // 未読件数
  var midokuCnt;

  // ユーザ情報・グループ情報に表示されている未読件数
  if ($("." + jsCht + "[value=" + targetSid + "] .js_midokuCount").length > 0) {
      midokuCnt = Number($($("." + jsCht + "[value=" + targetSid + "] .js_midokuCount")[0]).text());
      midokuCnt++;
  // 画面に表示されないユーザの未読件数を取得
  } else if (data["selectKbn"] == 1) {
    paramStr = "CMD=getMidokuCnt";
    paramStr += "&cht010SelectPartner=" + data["senderSid"];
    paramStr += "&cht010EditUsrSid=" + data["selectSid"];
    paramStr += "&cht010SelectKbn=" + data["selectKbn"];

      $.ajax({
        async:false,
        url: "../chat/cht010.do",
        type: "post",
        data: paramStr
      }).done(function(data) {
        midokuCnt = data["midokuCnt"];
      });
  } else if (data["selectKbn"] == 2) {
    paramStr = "CMD=getMidokuCnt";
      paramStr += "&cht010SelectPartner=" + data["selectSid"];
      paramStr += "&cht010EditUsrSid=" + document.forms[1].cht010EditUsrSid.value;
      paramStr += "&cht010SelectKbn=" + data["selectKbn"];
      $.ajax({
          async:false,
          url: "../chat/cht010.do",
          type: "post",
          data: paramStr
      }).done(function(data) {
          if (data['success']) {
          } else {
            alert(msglist_cht010['cht.cht010.23']);
            return;
          }
          midokuCnt = data["midokuCnt"];
      });
  }
  var midokuAddCnt = midokuCnt;

  // 未読が既にある
  if (midokuCnt > 0) {
      if ($("." + jsCht + "[value=" + targetSid + "] .js_midokuCount").length > 0) {
          midokuAddCnt -= Number($($("." + jsCht + "[value=" + targetSid + "] .js_midokuCount")[0]).text());
      }
      $("." + jsCht + "[value=" + targetSid + "] .js_midokuCount").text(midokuCnt);
  }
  // 未読タブ
  updateMidokuTab(data, midokuCnt, false, midokuAddCnt);
}

function dspError(msg) {
  $("#js_error").empty();
  $("#js_error").append(msg);
}

function appendGroup(group) {
    $(".js_archive").before(group);
}

//チャットグループの表示を追加
function addNewGroup(groupSid, groupName) {
  if ($("a[class*=js_chtGroup][value=" + groupSid +"]").length == 0) {

    //チャットグループ表示用HTML取得
    const group = getChatGroupDisp(groupSid, groupName, 0);
    $(".js_archive").before(group);
  }
}


// チャットグループの表示を更新
function updateGroup(groupSid, groupName, archiveFlg, messageCount, messageLastDate) {

  var midokuCnt = 0;
  var midokuCntStr = '';
  // グループ情報
  if ($("a[class*=js_chtGroup][value=" + groupSid +"]").length > 0) {
    // 未読件数
    if ($("a[class*=js_group_name][value=" + groupSid +"]").children(".js_midokuCount").length > 0) {
      midokuCnt = Number($("a[class*=js_group_name][value=" + groupSid +"]").children(".js_midokuCount").text());
    }
    if (midokuCnt > 0) {
        midokuCntStr = midokuCnt;
    }
    $("a[class*=js_chtGroup][value=" + groupSid +"]").empty();
    var groupDiv = "<span class=\"js_dsp_group_name\">" + groupName + "</span>";
    $("a[class*=js_chtGroup][value=" + groupSid +"]").append(groupDiv);
    $("a[class*=js_chtGroup][value=" + groupSid +"]").append("<span class=\"midokuCount js_midokuCount\">" + midokuCntStr + "</span>");

    // アーカイブグループか判定して非表示を行う
    if (archiveFlg == 1) {

      //「アーカイブの表示」ONの時は表示するため、OFFの時のみ非表示
      const check = $("[name=archive]:checked").val();
      if (check != 1) {
        $("#groupBodyArea a[class*=js_chtGroup][value=" + groupSid +"]").parent().addClass("display_n");
      }
      $("a[class*=js_chtGroup][value=" + groupSid +"]").addClass("opacity6");
      $("a[class*=js_chtGroup][value=" + groupSid +"]").addClass("js_archiveGroup");
    } else {
      $("#groupBodyArea a[class*=js_chtGroup][value=" + groupSid +"]").parent().removeClass("display_n");
      $("a[class*=js_chtGroup][value=" + groupSid +"]").removeClass("js_archiveGroup");
      $("a[class*=js_chtGroup][value=" + groupSid +"]").removeClass("opacity6");
    }

    //タイムラインタブ
    var groupNameTag = "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_group.png\">"
    + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_group.png\"> "
    + groupName
    + "<span class=\"midokuCount js_midokuCount\">" + midokuCntStr + "</span>";
    $("div.timeline_div.js_chtGroup[value=" + groupSid +"]").find(".js_dspName").empty();
    $("div.timeline_div.js_chtGroup[value=" + groupSid +"]").find(".js_dspName").append(groupNameTag);
    if (archiveFlg == 1) {
        $("div.timeline_div.js_chtGroup[value=" + groupSid +"]").addClass("js_archiveGroup");
    } else {
      $("div.timeline_div.js_chtGroup[value=" + groupSid +"]").removeClass("js_archiveGroup");
    }
    updateTimeline();

    //更新したグループを開いている場合
    if (document.forms[1].cht010SelectPartner.value == groupSid && document.forms[1].cht010SelectKbn.value == 2) {

      let paramStr = 'CMD=changePartner';
      paramStr = paramStr + '&cht010SelectPartner=' + document.forms[1].cht010SelectPartner.value;
      paramStr = paramStr + '&cht010SelectKbn=' + document.forms[1].cht010SelectKbn.value;
      //最新ボタンのリセット
      $('.js_cht010JumpMidokuButton').addClass('display_none');

        $.ajax({
            async: true,
            url:  "../chat/cht010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
              //グループ情報の変更
              changePartnerGroupInfo(data);

            }
        }).fail(function(data){
        });

      return;
    }
  // 元々ない場合は新たに追加
  } else {

    //チャットグループ表示用HTML取得
    const group = getChatGroupDisp(groupSid, groupName, archiveFlg);

    for (i = 0; i <= $(".js_group_name").length; i++ ) {
      var biggerSid = Number(groupSid) + i;
      if ($("a[class*=js_group_name][value=" + biggerSid +"]").length > 0) {
        $("a[class*=js_group_name][value=" + biggerSid +"]").parent().parent().before(group);
        break;
    } else {
        $(".js_archive").before(group);
        break;
      }
    }
    // 未読件数を取得
    if (messageCount > 0) {
        midokuCnt = messageCount
      }
    if (midokuCnt > 0) {
        midokuCntStr = midokuCnt;
    }
    $("a[class*=js_chtGroup][value=" + groupSid +"]").find(".js_midokuCount").text(midokuCntStr);

    // 未読タブ
    messageLastDate = messageLastDate ?? "";
    if (messageLastDate.length > 0 && midokuCnt > 0) {
      var month = messageLastDate.substring(4, 6);
      var day = messageLastDate.substring(6, 8);
      var hour = messageLastDate.substring(8, 10);
      var min = messageLastDate.substring(10, 12);
      var now = new Date();
      var archiveCls = '';
      if (archiveFlg == 1) {
          archiveCls = 'js_archiveGroup';
      }

      var midokuDiv = "<div class=\"bor_t1 p5 cursor_p timeline_div js_chtGroup bgC_selectable"+ archiveCls +"\" value=\"" + groupSid + "\">"
      + "<div>"
      + "<span class=\"js_dsp_group_name js_dspName \">"
      + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_group.png\">"
      + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_group.png\">"
      + groupName
      + "<span class=\"midokuCount js_midokuCount\">" + midokuCntStr + "</span>"
      + "</div>"
      + "<div class=\"lh_normal fs_12 js_lastTime txt_r\">";
      if (month != now.getMonth() + 1 || day != now.getDate()) {
        midokuDiv += month + "/" + day + " ";
      }
      midokuDiv += hour + ":" + min;
      + "</div>"
      + "</div>";
      // 最新の最終投稿日時を取得
      var dateArrayUser = $("div[class*=js_midoku_div_usr]");
      var dateArrayGroup = $("div[class*=js_midoku_div_group]");
      // 最終投稿日時
      var lastDateArray = dateArrayUser;
      for (i = 0; i < dateArrayGroup.length; i++) {
        lastDateArray.push(dateArrayGroup[i]);
      }
      lastDateArray.sort(function(a,b){
              if( a > b ) return -1;
              if( a < b ) return 1;
              return 0;
      });

      var prevDate = Number(messageLastDate);
      var prevTagClass;
      for (i = 0; i < lastDateArray.length; i++) {
        var date = Number(lastDateArray[i].lastElementChild.innerHTML);
        // 表示されている未読メッセージのどれよりも最終投稿日時が古い場合は追加しない
        if (i + 1  == lastDateArray.length && prevDate == Number(messageLastDate)) {
          prevTagClass = "";
          break;
        } else if (Number(messageLastDate) <= date) {
          prevDate = date;
          prevTagClass = lastDateArray[i].className.split(" ")[2];
        }
      }
      if (prevDate == Number(messageLastDate)) {
        $("#timeline_body_area").children(".js_timelineListArea").prepend(midokuDiv);
      } else if (prevTagClass.length > 0) {
        $("div[class*=" + prevTagClass + "]").after(midokuDiv);
      }
      updateTimeline();
      // 未読タブの件数更新
      var allMidoku = Number($(".js_allMidoku").text());
      allMidoku += Number(messageCount);
      updateAllMidokuCnt(allMidoku);

      // 未読がない時に表示されているメッセージを除去
      if ($(".js_no_new_message").length > 0) {
        $(".js_no_new_message").remove();
      }
    }
  }
}


//チャットグループ表示用HTML生成
//archiveFlg チャットグループのアーカイブ状態
// 0: 通常
// 1: アーカイブ
function getChatGroupDisp(groupSid, groupName, archiveFlg) {

  let class1 = '';
  //通常表示クラス
  let class2 = '';

  //チャットグループのアーカイブ状態
  if (archiveFlg == 1) {

    //アーカイブの表示チェックボックス
    const archiveDispCheck = $("[name=archive]:checked").val();

    if (archiveDispCheck != 1) {
      class1 = ' display_n';
    }
    class2 = ' opacity6 js_archiveGroup ';
  }

  const groupStr =
              '<div class="pl5 w100 mt5 ' + class1 +'">'
            + '   <a class="' + class2 + 'cl_linkHoverChange js_chtGroup js_group_name display_b lh130 word_b-all" href="#!" value="' + groupSid + '">'
            + '     <span class="js_dsp_group_name">' + groupName + '</span>'
            + '     <span class="midokuCount js_midokuCount"></span>'
            + '   </a>'
            + '</div>';
  return groupStr;
}


// 未読タブの表示更新
function updateMidokuTab(data, midokuCnt, own, midokuAddCnt) {
  var jsCht;
  var jsName;
  var jsDspName;
  var jsMidokuCol;
  var icon;
  var targetSid;
  var name = "";
  var usrMukoCls = '';
  const messageInfo = data["messageList"][0];
  if (data["selectKbn"] == 1) {
    jsCht = "js_chtUser";
        jsName = "js_user_name";
        jsDspName = "js_dsp_user_name js_dspName";
    jsMidokuCol = "cl_linkDef";
    icon = "user_icon_s.gif";
    targetSid = data["senderSid"];

    name = data["chatName"];
    if (messageInfo['usrUkoFlg'] != 0) {
      usrMukoCls = 'mukoUser';
    }
    if (own) {
      targetSid = data["selectSid"];
  }
  } else if (data["selectKbn"] == 2) {
    jsCht = "js_chtGroup";
    jsName = "js_group_name";
    jsDspName = "js_dsp_group_name js_dspName";
    jsMidokuCol = "cl_linkDef";
    icon = "groupicon.gif";
    targetSid = data["selectSid"];
    name = data["chatName"];
  }
    // 新着
    var timeLineRow = $('.timeline_div.' + jsCht + '[value=' + targetSid + ']');

    if (timeLineRow.length == 0) {
        var midokuCntStr ='';
        if (midokuCnt > 0) {
            jsMidokuCol = 'cl_linkDef';
            midokuCntStr =midokuCnt;
        } else {
            jsMidokuCol = 'cl_fontBody';
        }

        var midokuDiv = "<div class=\"bor_t1 p5 cursor_p timeline_div " + jsCht + " bgC_selectable \" value=\"" + targetSid + "\">"
                    + "<div>"
                    + "<span class=\"" + jsDspName + " " + jsMidokuCol + " word_b-all " + usrMukoCls + "\">";
        if (data["selectKbn"] == 1) {
          midokuDiv += "<img class=\"btn_classicImg-display wp18hp20\" src=\"../common/images/classic/icon_user.png\">"
                    + "<img class=\"btn_originalImg-display wp18hp20\" src=\"../common/images/original/icon_user.png\"> "

        } else if (data["selectKbn"] == 2) {
          midokuDiv += "<img class=\"btn_classicImg-display wp18hp20\" src=\"../common/images/classic/icon_group.png\">"
                    + "<img class=\"btn_originalImg-display wp18hp20\" src=\"../common/images/original/icon_group.png\"> "
        }

        let muteIcon = "";
        if (data["muteKbn"] == 1) {
          muteIcon = `<span class="icon-mute fs_15 txt_m ml5 js_muteIcon cl_fontMiddle"></span>`;
        }
        midokuDiv += name
                    + "<span class=\"midokuCount js_midokuCount\">" + midokuCntStr + "</span>"
                    + "</span>"
                    + muteIcon
                    + "</div>"
                    + "<div class=\"lh_normal fs_12 js_lastTime txt_r\">"
                    + messageInfo["entryTime"]
                    + "</div>"
                    + "</div>"
        var midoku = $(midokuDiv);
        $("#timelineBodyArea").find(".js_timelineListArea").prepend(midoku);
    // 更新
    } else if (timeLineRow.length > 0) {
        timeLineRow.find(".js_lastTime").empty();
        timeLineRow.find(".js_lastTime").text(messageInfo["entryTime"]);
        timeLineRow.remove();
        $("#timelineBodyArea").find(".js_timelineListArea").prepend(timeLineRow);
    }
    // 未読がない時に表示されているメッセージを除去
    if ($(".js_no_new_message").length > 0) {
        $(".js_no_new_message").remove();
    }

    updateTimeline();
    // 未読タブの件数更新
    var allMidoku = Number($(".js_allMidoku").text());
    if (midokuAddCnt != null) {
      allMidoku += midokuAddCnt;
    }
    updateAllMidokuCnt(allMidoku);

}

function removeGroup(groupSid) {
  var midokuCnt = 0;
    if ($("a[class*=js_group_name][value=" + groupSid +"]").children(".js_midokuCount").length > 0) {
      midokuCnt = Number($("a[class*=js_group_name][value=" + groupSid +"]").children(".js_midokuCount").text());
    }
    $("a[class*=js_chtGroup][value=" + groupSid +"]").parent().remove();
    $("div[class*=js_midoku_div_group_" + groupSid).remove();
    $("div.timeline_div.js_chtGroup[value=" + groupSid +"]").remove();
    // 未読タブ件数
    var allMidoku = Number($(".js_allMidoku").text());
    allMidoku -= midokuCnt;
    updateAllMidokuCnt(allMidoku);

    if ($(".js_favGroup").find(".js_chtGroup").length == 0) {
      $(".js_favGroup").html("");
    }
}

/**
 * websocket受信イベント
 * 指定したメッセージに「既読」を表示
 *
 * @param {*} data websocketからの受信データ
 */
function dspKidoku(data) {
  let sessionSid = document.forms[1].cht010EditUsrSid.value
  // 選択SID
  let selectSid = document.forms[1].cht010SelectPartner.value;
  // 選択区分
  let selectKbn = document.forms[1].cht010SelectKbn.value;

  let kidokuMessageSid = data["readMsgSid"];
  //表示チャットが一致した場合のみ実行
  if (selectKbn != data['selectKbn']
       || selectSid != data['senderSid']) {
    return;
  }
  //下側から走査
  $($('chat-block').get().reverse()).each(function(idx) {
    let msg = JSON.parse($(this).attr('message'));

    if (msg.usrSid != sessionSid) {
      //相手の投稿のためcontinue
      return true;
    }
    if (msg.messageSid > kidokuMessageSid) {
      //指定SIDより大きいためcontinue
      return true;
    }

      // 未読メッセージに対する処理
    let partnerKidoku = $(this).find(".js_partnerKidoku");
    if(partnerKidoku.length > 0) {
      //既読があればeachのループを終了
      return false;
    }
    let kidokuHtml = `
      <span class="cl_fontWeek ml5 js_partnerKidoku">${msglist_cht010['cht.cht010.04']}</span>
    `;
    $(this).find('.js_media_heading').append(kidokuHtml);
  });

}


//スクロールバーサイズ取得
function getScrollbarWidth() {
  var scrollbarWidth;
  var userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('chrome') != -1 || userAgent.indexOf('safari') != -1) {
    scrollbarWidth = 10;
  } else {
    const scrollbarElem = document.createElement('div');
    scrollbarElem.setAttribute('style', 'visibility: hidden; position: absolute; top: 0; left: 0; width: 100vw;');
    document.body.appendChild(scrollbarElem);
    const vw = parseInt(window.getComputedStyle(scrollbarElem).width);
    scrollbarElem.style.width = '100%';
    const pc = parseInt(window.getComputedStyle(scrollbarElem).width);
    document.body.removeChild(scrollbarElem);
    scrollbarWidth = vw - pc;
  }
  return scrollbarWidth;
}

// メイン画面から遷移してきた場合はWebSocket再接続
function fromMain(clientSid, pluginUrl) {
    if (document.forms[1].cht010FromMain.value == 1) {
        parent.reConnect(clientSid, pluginUrl);
    }
}

// 再読み込みボタン
function pushReload() {
  $(".js_reload").addClass("pointer_none");
    var connection = parent.checkConnection();
    if (connection) {
      parent.closeConnect();
    }
    document.forms[1].CMD.value="reload";
    document.forms[1].submit();
    return false;
}

// WebSocket再接続 onloadで使用すること
function wsReload() {
  if (document.forms[1].cht010InitFlg.value== 2) {
    parent.webSocketCommunicate("../chat", true, true);
  }
  else if (document.forms[1].cht010InitFlg.value== 1) {
    var connection = parent.checkConnection();
      if (!connection) {
        dspError(msglist_cht010['cht.cht010.40']);
      }
  }
}

function textClear() {
  $('.js_chtTextArea').val("");
  $('.js_inputFileArea').remove();
  removeAllMention();

  $(".js_chtInputArea").find(".js_chtTextArea").removeClass("media_selectedColor");
  var textarea = document.getElementById("inText");
    textarea.style.height = chat_textarea_min_height + 'px';
    mode = 0;
}

function removeAllMention() {
  $(".js_chtMention").remove();
  const mention = $(".js_mentionPalette").find("cht010-senderselect")[0];
  mention.paneDraw();
}

function createParamCht010() {
    var serialArr = $('#js_chtForm').serializeArray();
    var ret = {};
    $.each(serialArr, function () {
        if (this.name == "cht010MentionUserSids") {
          if (!Array.isArray(ret[this.name])) {
            ret[this.name] = [];
          }
          ret[this.name].push(this.value);
        } else {
          ret[this.name]= this.value;
        }
    });
    return ret;
}

/**
 * タイムライン全件の表示を切り替える
 * 既読未読の色変更、既読による非表示（未読のみ時）
 * 0件時のメッセージ表示
 *
 * @param timeline 変更対象タイムラインjqueryオブジェクト（.timeline_div [value={ターゲットSID}]）
 * @param midokuCnt 未読件数
 *
 */
function updateTimeline() {

    var onlyNoRead = ($('.js_checkOnlyNoRead:checked').val() == 1);
    var noBrank = false;
    //各行の表示更新
    $.each(
            $('.js_timelineListArea .js_chtGroup ,' +
                '.js_timelineListArea .js_chtUser'),
            function () {
                noBrank = true;

                var timeline = $(this).find('.js_dspName');
                var midokuCnt = Number(timeline.find(".js_midokuCount").text());

                if (onlyNoRead && midokuCnt == 0) {
                    //未読のみ表示時は行を削除
                    $(this).remove();
                    return;
                }

                timeline = timeline.removeClass('cl_linkDef');
                timeline = timeline.removeClass('cl_fontBody');
                timeline = timeline.removeClass('opacity6');

                if ($(this).hasClass("js_archiveGroup")) {
                  timeline.addClass('opacity6');
                }
                if (midokuCnt > 0) {
                    timeline.addClass('cl_linkDef');
                    return;
                }
                timeline.addClass('cl_fontBody');
            });
    //タイムラインがない場合
    if ($('.js_timelineListArea .js_chtGroup ,' +
                '.js_timelineListArea .js_chtUser').length <= 0
            && $('.js_moreView ').is(':hidden')) {
          var noNewMessage = "";
          noNewMessage = "<div class=\"p5 bor_t1 js_no_new_message\">"+msglist_cht010['cht.cht010.13']+"</div>";
          $(".js_timelineListArea").empty();
          $(".js_timelineListArea").prepend(noNewMessage);

    }

}
/**
 * タイムライン再読み込み/追加読み込み
 * @param reset 再読み込みならtrue 追加読み込みならfalse
 * @returns
 */
function loadTimeline(reset) {
    var param = createParamCht010();
    param['CMD'] = 'moreView';
    if (!reset) {
        var lastDate = $("#js_lastdate").text();
        param['cht010MidokuLastDate'] = lastDate
    }
    paramStr = $.param(param, true);
    $.ajax({
          async: true,
          url:  "../chat/cht010.do",
          type: "post",
          data: paramStr
      }).done(function( data ) {
          if (data["success"]) {
              if (reset) {
                  $(".js_timelineListArea").empty();
              }
              var last ="";
              const timeLine = JSON.parse(JSON.stringify(data["timeLine"]));
              if (timeLine == null || timeLine.length == 0) {
                return;
              }
              timeLine.forEach(function(model){
                let detail = "";
                let archiveCls = '';
                if (model["archiveFlg"] == 1) {
                    archiveCls = 'js_archiveGroup';
                }
                let usrUkoFlg = '';
                if (model["usrUkoFlg"] != 0 && model["midokuJkbn"] == 0) {
                    usrUkoFlg = 'mukoUser';
                }

                let usrName = `${model["midokuName"]}`;
                if (model["midokuJkbn"] != 0) {
                  usrName = `<del>${model["midokuName"]}</del>`
                }

                let midokuCount = "";
                if (model["midokuCount"] > 0) {
                  midokuCount = model["midokuCount"];
                }

                let muteIcon = "";
                if (model["muteFlg"] == 1) {
                  muteIcon = `<span class="icon-mute fs_15 txt_m ml5 js_muteIcon cl_fontMiddle"></span>`;
                }

                if (model["midokuKbn"] == 1) {
                  detail += ` <div class="bor_t1 p5 cursor_p js_chtUser timeline_div bgC_selectable " value="${model["midokuSid"]}">
                                <div>
                                  <span class="js_dspName word_b-all ${usrUkoFlg}">
                                    <img class="btn_classicImg-display wp18hp20" src="../common/images/classic/icon_user.png">
                                    <img class="btn_originalImg-display wp18hp20" src="../common/images/original/icon_user.png">
                                    ${usrName}
                                    <span class="midokuCount js_midokuCount">${midokuCount}</span>
                                  </span>
                                  ${muteIcon}
                                </div>
                                <div class="lh_normal fs_12 js_lastTime txt_r">
                                  ${model["midokuDispDate"]}
                                </div>
                              </div>
                  `;
                } else if (model["midokuKbn"] == 2) {
                    detail += ` <div class="bor_t1 p5 cursor_p js_chtGroup ${archiveCls} timeline_div bgC_selectable" value="${model["midokuSid"]}">
                                  <div class="chat_forum_link chat_favorite_margin">
                                    <div>
                                      <span class="js_dspName word_b-all">
                                        <img class="btn_classicImg-display" src="../common/images/classic/icon_group.png">
                                        <img class="btn_originalImg-display" src="../common/images/original/icon_group.png">
                                        ${usrName}
                                        <span class="midokuCount js_midokuCount">${midokuCount}</span>
                                      </span>
                                      ${muteIcon}
                                    </div>
                                    <div class="lh_normal fs_12 js_lastTime txt_r">
                                      ${model["midokuDispDate"]}
                                    </div>
                                  </div>
                                </div>
                    `;
                }

                var obj = $(detail);
                last = model["midokuDate"]
                $(".js_timelineListArea").append(obj);
              });
              $("#js_lastdate").text(last);
              if (data["buttonDisp"] == 0) {
                  $(".js_moreView ").addClass("display_n");
              } else if (data["buttonDisp"] == 1) {
                  $(".js_moreView ").removeClass("display_n");
              }
              updateTimeline();
          } else {
                alert(msglist_cht010['cht.cht010.25']);
          }
      }).fail(function(data){
            alert(msglist_cht010['man.error']);
      });
}

function updateAllMidokuCnt(cnt) {
    $("#timelineHeadArea").removeClass('menuHead-midoku');
    $('.js_timelineBach').removeClass('midokuBach-on');

    if (cnt > 0) {
        $(".js_allMidoku").text(cnt);
        $("#timelineHeadArea").addClass('menuHead-midoku');
        $('.js_timelineBach').addClass('midokuBach-on');
    } else {
        $(".js_allMidoku").text('');
    }

}

function cmn110Updated(window, tempName, tempSaveName, objId) {

    if (!$(".js_inputFileArea").length) {
        $(".js_chtTextArea").after("<div class=\"js_inputFileArea cht_tempFileArea mrl_auto\"></div>")
    }

    var detail = "";
    detail += "<div class=\"cht_tempFile js_chtTempFile cursor_p pos_rel ml5 mr5\" id=\"attachmentFileDetail_" + tempSaveName + "\" onclick=\"fileDownload('" + tempSaveName + "', event)\">"
    detail += "<img src=\"../chat/images/temp_file.png\" alt=\"添付ファイル\" class=\"hp30 js_fileImage\" >"
    detail += "<a href=\"#!\" class=\"js_temp ml5\" value=\"" + tempSaveName + "\">"
    detail += "<span class=\"word_b-all\">"
    detail += tempName
    detail += "</span>"
    detail += "</a>"
    detail += "<div class=\"pos_abs cht_deleteIcon\">"
    detail += "<img src=\"../common/images/original/icon_delete.png\" alt=\"削除アイコン\" class=\"btn_originalImg-display hp18 cursor_p\" onclick=\"attachmentDeleteFile('" + tempSaveName + "', '');\">"
    detail += "<img src=\"../common/images/classic/icon_delete.png\" alt=\"削除アイコン\" class=\"btn_classicImg-display hp18 cursor_p\" onclick=\"attachmentDeleteFile('" + tempSaveName + "', '');\">"
    detail += "</div>"
    detail += "</div>"

    let preview = document.createElement('file-preview');
    preview.setAttribute('url', createDownloadUrl(tempSaveName, objId, 1));
    preview.setAttribute('filename', tempName);

    preview.innerHTML = `
      ${detail}
    `;

    $(".js_inputFileArea").append(preview);
}

function setToken(paramStr) {
    paramStr += '&org.apache.struts.taglib.html.TOKEN='
              + $('input:hidden[name="org.apache.struts.taglib.html.TOKEN"]').val();

    return paramStr;
}

function cmn110DropBan() {
    if ($('body').find('div').hasClass('ui-widget-overlay')) {
      //ダイアログが表示されている場合、ドロップを許可しない
      return true;
    }

    if (!$(".js_chtAttach").is(":visible")) {
      //添付ファイルの入力ができない場合、ドロップを許可しない
      return true;
    }

    return false;
}

function fileDownload(tempSaveName, event) {

  if (event.target.tagName.toLowerCase() == 'img'
    && !event.target.classList.contains("js_fileImage")) {
      return false;
  }
  attachmentFileDownload(tempSaveName, '');
}

function showEmojiPalette(event) {
  if (!$(".js_stampPicker").hasClass("display_none")) {
    $(".js_stampPicker").addClass("display_none");
  }
  if (!$(".js_mentionPalette").hasClass("display_none")) {
    $(".js_mentionPalette").addClass("display_none");
  }
  if (!$(".js_emojiPicker").hasClass("display_none")) {
    $(".js_emojiPicker").addClass("display_none");
    return;
  }

  $(".js_emojiPicker").removeClass("display_none");
  $(".js_chtTextArea")[0].focus();

  const emojiButtonRect = $(".js_chtEmoji")[0].getBoundingClientRect();
  const emojiPicker = $(".js_emojiPicker")[0];
  const emojiPickerRect = emojiPicker.getBoundingClientRect();

  emojiPicker.style.top = (emojiButtonRect.top + window.scrollY - 250) + "px";
  if (emojiButtonRect.left + emojiButtonRect.width + emojiPickerRect.width < window.innerWidth) {
    //絵文字ピッカーが画面の横幅に収まる場合
    emojiPicker.style.left = (emojiButtonRect.left + emojiButtonRect.width) + "px";
  } else {
    //通常の位置に配置すると絵文字ピッカーが画面の横幅に収まらない場合
    emojiPicker.style.left = (window.innerWidth - emojiPickerRect.width - 40) + "px";
  }
  event.stopPropagation();
}

function showStampPalette(event) {
  if (!$(".js_emojiPicker").hasClass("display_none")) {
    $(".js_emojiPicker").addClass("display_none");
  }
  if (!$(".js_mentionPalette").hasClass("display_none")) {
    $(".js_mentionPalette").addClass("display_none");
  }
  if (!$(".js_stampPicker").hasClass("display_none")) {
    $(".js_stampPicker").addClass("display_none");
    return;
  }
  $('.js_selectStamp').removeClass("out3 outC_deep");
  $('.js_stampSendButton').addClass('display_none');

  $(".js_stampPicker").removeClass("display_none");

  const stampButtonRect = $(".js_chtStamp")[0].getBoundingClientRect();
  const stampPicker = $(".js_stampPicker")[0];
  const stampPickerRect = stampPicker.getBoundingClientRect();

  stampPicker.style.top = (stampButtonRect.top + window.scrollY - 250) + "px";
  if (stampButtonRect.left + stampButtonRect.width + stampPickerRect.width < window.innerWidth) {
    //絵文字ピッカーが画面の横幅に収まる場合
    stampPicker.style.left = (stampButtonRect.left + stampButtonRect.width) + "px";
  } else {
    //通常の位置に配置すると絵文字ピッカーが画面の横幅に収まらない場合
    stampPicker.style.left = (window.innerWidth - stampPickerRect.width - 40) + "px";
  }
  event.stopPropagation();
}

function showMentionPalette(event) {
  if (!$(".js_emojiPicker").hasClass("display_none")) {
    $(".js_emojiPicker").addClass("display_none");
  }
  if (!$(".js_stampPicker").hasClass("display_none")) {
    $(".js_stampPicker").addClass("display_none");
  }
  if (!$(".js_mentionPalette").hasClass("display_none")) {
    $(".js_mentionPalette").addClass("display_none");
    return;
  }

  $(".js_mentionPalette").removeClass("display_none");

  const mentionButtonRect = $(".js_chtMentionButton")[0].getBoundingClientRect();
  const mentionPalette = $(".js_mentionPalette")[0];
  const mentionPaletteRect = mentionPalette.getBoundingClientRect();

  mentionPalette.style.top = (mentionButtonRect.top + window.scrollY - mentionPaletteRect.height) + "px";
  mentionPalette.style.left = (mentionButtonRect.left + mentionButtonRect.width) + "px";

  event.stopPropagation();
}

function selectStamp(sid) {
  $('.js_selectStamp').removeClass("out3 outC_deep");
  $('.js_stampSendButton').addClass('display_none');
  $('#stamp_' + sid).addClass("out3 outC_deep");
  $('#stampButton_' + sid).removeClass("display_none");
}

// スタンプメッセージを送信
function sendStamp(stampSid, selectSid, selectKbn) {
  $('.js_selectStamp').removeClass("out3 outC_deep");
  $('.js_stampSendButton').addClass('display_none');
  $('.js_stampPicker ').addClass('display_none');
  // 送信するメッセージ
  $("#js_errorMsg").text("");
  var param = createParamCht010();
  param['CMD'] = 'sendMessage';
  param['cht010StampSid'] = stampSid;
  param['cht010SelectPartner'] = selectSid;
  param['cht010SelectKbn'] = selectKbn;
  //ファイルダウンロードにより残った選択情報を除去
  delete param.cht010MessageSid;
  var paramStr = $.param(param, true);
  paramStr = setToken(paramStr);
  $.ajax({
      async: false,
      url:  "../chat/cht010.do",
      type: "post",
      data: paramStr
  }).done(function(data) {
      if (data["success"]) {
        $(".js_emojiPicker").addClass("display_none");
        $(".js_stampPicker").addClass("display_none");
        resetReply()
        removeAllMention();
        if (!parent.webSocket) {
            if (typeof dspError == 'function') {
                var errorMsg = "";
                errorMsg = "メッセージの表示に失敗しました。<br>"
                    + "再接続を行うと送信したメッセージが表示されます。";
                dspError(errorMsg);

            }
        }
        midokuData = $.extend(true, {}, data);
        if (data["selectKbn"] == 1) {
            midokuData['senderSid'] = data['selectSid'];
            midokuData["usrName_0"] = data['chatName'];
            midokuData["usrJkbn_0"] = data['usrJkbn'];
            midokuData["usrUkoFlg_0"] = data['usrUkoFlg'];
        }
        midokuData["entryTime_0"] = '';
        midokuData["insertDate_0"] = '';
        $(".js_mentionPalette").find(".js_cht010SearchInputSender_input").val("");
        const mention = $(".js_mentionPalette").find("cht010-senderselect")[0];
        mention.paneDraw();

      } else if (data["error"]) {
          sendError(data);
      } else if (data["errorAlert"]) {
          sendErrorAlert(data);
      } else if (data["tokenError"]){
          tokenError(data);
      } else {
          if (typeof dspError == 'function') {
              var errorMsg = msglist_cht010['cht.cht010.50'];

              dspError(errorMsg);
          }
      }

  }).fail(function(data){
      if (typeof dspError == 'function') {
          var errorMsg = msglist_cht010['cht.cht010.50'];

          dspError(errorMsg);
      }
  });
}

function hideEmojiPalette() {
  $(".js_emojiPicker").addClass("display_none");
}
/**
 * チャットメッセージ表示WEBコンポーネント
 * attribute[message] の jsonをもとにメッセージ内容を表示する
 * attribute[data-button-lock]で編集時のホバーのキャンセルに対応する
 *
 * その他機能
 *   リプライ用メッセージ生成 createReplyDisp
 *   検索結果、ピン止め用メッセージ生成 createSimpleElement
 *   検索時ハイライト表示設定 drawSearchHighlight
 * @class Cht010ChatBlock
 * @extends {HTMLElement}
 */
class Cht010ChatBlock extends HTMLElement{
  constructor() {
    super();
    this.message = null;
    this[ 'data-button-lock' ] = false;
  }

  // コンポーネントの属性を宣言
  static get observedAttributes() {
    return ['message', 'cansend', 'data-button-lock'];
  }
  // コンポーネントの属性の値変更時のイベント処理
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[ property ] = newValue;

    //描画後のattr[data-button-lock]変更
    if (property == 'data-button-lock'
          && $(this).find('.js_mediaArea').length > 0
        ) {
      if (oldValue) {
        $(this).find(".js_mediaArea").removeClass("cht_button-lock");
      }
      if (newValue) {
        $(this).find(".js_mediaArea").addClass("cht_button-lock");
      }
    }
  }

  // 描画前イベント処理
  connectedCallback() {

    const element = $(this);
    const messageInfo = JSON.parse(this.message);
    const canSend = this.getAttribute("cansend");
    messageAreaCreate(messageInfo, canSend);

    function messageAreaCreate(messageMdl, canSendFlg) {

      const sessionSid = document.forms[1].cht010EditUsrSid.value;
      const selectSid = document.forms[1].cht010SelectPartner.value;
      const selectKbn = document.forms[1].cht010SelectKbn.value;
      const type = $(".js_listMake").attr("data-type");
      const command = $(".js_listMake").attr("data-command");
      const selMsgFlg = (messageMdl["messageSid"] == messageSid);

      let buttonLockCls = '';
      if (element[0]['data-button-lock'] == 'true') {
        buttonLockCls = 'cht_button-lock';
      }

      //日付ヘッダーが非表示(=投稿が0件の状態でメッセージを受信)の場合、表示する。
      if (!$("#hiduke_header").is(':visible')) {
        var firstDate = messageMdl["entryDay"];
        $("#hiduke_header").show();
        $("#hiduke_header").text(firstDate);
      }


      let insertHtml = "";
      if (messageMdl["messageKbn"] == 9) {
        insertHtml +=  `
        <div>
          <div class="js_mediaArea mediaArea display_flex chat_lrSpace pt5 pb5 ${buttonLockCls}" value="${messageMdl["messageSid"]}">
            <div class="flo_l mr10 wp50">
              <img src="../common/images/classic/icon_photo.gif" name="userImage" onload="initImageView50('userImage101')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_classicImg-display"><img src="../common/images/original/photo.png" name="userImage" onload="initImageView50('userImage101');" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_originalImg-display">
            </div>
            <div class="of_h pb5 verAlignMid">
            <span class="display_n js_kidoku">${messageMdl["ownKidoku"]}</span>
            <div>
              <span class="js_message word_b-all">
                <img src="../common/images/classic/icon_trash.png" class="btn_classicImg-display">
                <img src="../common/images/original/icon_trash.png" class="btn_originalImg-display">&nbsp;${msglist_cht010['cht.cht010.03']}
              </span>
            </div>
          </div>
        </div>
        `;
        const addElement = $(insertHtml);
        element.append(addElement);
        return false;
      }

      const usrSid = messageMdl["usrSid"];

      if (sessionSid == usrSid) {
        var divClass = "cht_onePost js_media_mine js_mediaArea mediaArea js_media_" + messageMdl["messageSid"];

        const ownKidoku = messageMdl["ownKidoku"];
        const usrSid = messageMdl["usrSid"];
        let detail = "";
        if (messageMdl["usrPictKf"] != 0) {
          detail += "<span class=\"hikokai_photo-s hikokai_text cl_fontWarn\">非公</span>";
        } else {
          if (messageMdl["usrBinSid"] == 0) {
            detail += `  <img src="../common/images/classic/icon_photo.gif" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_classicImg-display"/>`;
            detail += `  <img src="../common/images/original/photo.png" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}');" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_originalImg-display"/>`;
          } else {
            if (messageMdl["usrJkbn"] == 9) {
              detail += `  <img src="../common/images/classic/icon_photo.gif" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_classicImg-display"/>`;
              detail += `  <img src="../common/images/original/photo.png" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_originalImg-display"/>`;
            } else {
              detail += `  <div class="txt_c"><img src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=${messageMdl["usrBinSid"]}" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w50"/></div>`;
            }
          }
        }

        insertHtml += `
          <div class="${divClass} ${buttonLockCls}"  value="${messageMdl["messageSid"]}">
          <span class="display_n js_kidoku">${ownKidoku}</span>
          <div class="js_messageArea chat_lrSpace pt5 pb5 pos_rel">
            <div class="flo_l mr10 wp50">
        `;

        if (messageMdl["usrPictKf"] != 0) {
          insertHtml += "<span class=\"hikokai_photo-m hikokai_text cl_fontWarn borC_light cursor_d\">非公開</span>";
        } else {
          if (messageMdl["usrBinSid"] == 0) {
            insertHtml += `  <img src="../common/images/classic/icon_photo.gif" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_classicImg-display"/>`;
            insertHtml += `  <img src="../common/images/original/photo.png" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}');" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_originalImg-display"/>`;
          } else {
            if (messageMdl["usrJkbn"] == 9) {
              insertHtml += `  <img src="../common/images/classic/icon_photo.gif" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_classicImg-display"/>`;
              insertHtml += `  <img src="../common/images/original/photo.png" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_originalImg-display"/>`;
            } else {
              insertHtml += `  <div class="txt_c"><img src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=${messageMdl["usrBinSid"]}" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w50"/></div>`;
            }
          }
        }

        insertHtml += `
            </div>
            <div class="of_h pb5">
              <div class="js_media_heading">
                ${createUserLink(messageMdl.usrName, messageMdl.usrJkbn, messageMdl.usrUkoFlg, messageMdl.usrSid, canSendFlg)}
                <span class="cl_fontWeek ml10">${messageMdl["entryTime"]}</span>
        `;

        if (messageMdl["partnerKidoku"] == 1 && usrSid != document.forms[1].cht010SelectPartner.value) {
          insertHtml += `<span class="cl_fontWeek ml5 js_partnerKidoku">${msglist_cht010['cht.cht010.04']}</span>`;
        }
        insertHtml += `
          </div>
          ${element[0].createReplyDisp(messageMdl["replyMessageInfo"], false, canSendFlg)}
          ${element[0].createMentionDisp(messageMdl, canSendFlg)}
        `;
        let message = "";
        message += messageMdl["messageText"];
        message = message.replaceAll(disableEmoji, "□");

        /* スタンプ */
        insertHtml += element[0].#createStampDisp(messageMdl);

        let editTime = "";

        if (messageMdl["messageKbn"] == 1) {
          editTime += `
            <span class="cl_fontWeek edit_chat fs_12">
              <span class="edit_time ml5 bgC_body bor1">
                ${messageMdl["updateDay"]}&nbsp;${messageMdl["updateTime"]}
              </span>
              ${msglist_cht010['cht.cht010.02']}
            </span>
          `;
        }

        insertHtml += `
          <div class="js_media_text_${messageMdl["messageSid"]} word_b-all">
        `;
        if (messageMdl["stampBinSid"] <= 0 && messageMdl["stampDefaultId"] <= 0) {
          insertHtml += `
            <span class="js_message">${message}</span>
          `;
        }
        insertHtml += `
            ${editTime}
          </div>
        `;

        insertHtml += createTempDispArea(messageMdl);
        insertHtml += element[0].createReactionArea(messageMdl);
        insertHtml += `
            </div>
        `;

        insertHtml += `
        <div class="edit_deleteArea js_editDeleteArea txt_r">
          <div class="verAlignMid">
        `;
        if (canSendFlg === "true") {
          /* スタンプ投稿以外の時、編集を表示する。 */
          if (messageMdl["stampBinSid"] == 0 && messageMdl["stampDefaultId"] == 0) {
            insertHtml += `
            <span class="js_message_edit mr10 cl_linkDef cursor_p" value="${messageMdl["messageSid"]}"><!--
              --!><img class="btn_classicImg-display" src="../common/images/classic/icon_edit_3.png"><!--
              --!><img class="btn_originalImg-display" src="../common/images/original/icon_edit.png"><!--
              --!><span class="ml5">${msglist_cht010['cmn.edit']}</span><!--
              --!></span>
            `;
          }

          insertHtml += `
                    <span class="js_message_delete cl_linkDef cursor_p mr10" value="${messageMdl["messageSid"]}"><!--
                  --!><img class="btn_classicImg-display" src="../common/images/classic/icon_trash.png"><!--
                  --!><img class="btn_originalImg-display" src="../common/images/original/icon_delete.png"><!--
                  --!><span class="ml5">${msglist_cht010['cmn.delete']}</span><!--
                --!></span>
                    <span class="js_message_reaction pos_rel cl_linkDef cursor_p mr10" value="${messageMdl["messageSid"]}"><!--
                  --!><img class="hp18 wp18" src="../chat/images/original/icon_reaction.png"><!--
                  --!><span class="ml5">${msglist_cht010['cmn.reaction']}</span><!--
                --!></span>
                    <span class="js_message_reply pos_rel cl_linkDef cursor_p" value="${messageMdl["messageSid"]}"><!--
                  --!><img src="../chat/images/original/icon_reply.png"><!--
                  --!><span class="ml5">${msglist_cht010['cmn.reply']}</span><!--
                --!></span>
                  </div>
                </div>
          `;
        }
        let pinOnClass = "display_n";
        let pinOffClass = "";
        if (messageMdl["messagePinKbn"] == 1) {
          pinOnClass = "";
          pinOffClass = "display_n";
        }
        insertHtml += `
                <div class="messagePinArea">
                <img id="messagePinOn_${messageMdl["messageSid"]}" class="js_messagePin-on wp20 cursor_p ${pinOnClass}" onclick="changeMessagePin(${messageMdl["messageSid"]}, false);" src="../chat/images/original/icon_pin_on.png">
                <img id="messagePinOff_${messageMdl["messageSid"]}" class="js_messagePin-off wp20 cursor_p ${pinOffClass}" onclick="changeMessagePin(${messageMdl["messageSid"]}, true);" src="../chat/images/original/icon_pin_off.png">
              </div>
            </div>
          </div>
        `
      } else {
        let midokuFlg = 1;
        if (type == "message"
          && command == "add"
          && usrSid != document.forms[1].cht010EditUsrSid.value) {
          midokuFlg = 0;
        } else {
          midokuFlg = messageMdl["ownKidoku"];
        }

        insertHtml += `
          <div class="cht_onePost js_mediaArea mediaArea js_media_${messageMdl["messageSid"]} ${buttonLockCls}" value="${messageMdl["messageSid"]}">
            <span class="display_n js_kidoku">${midokuFlg}</span>
            <div class="js_messageArea chat_lrSpace pt5 pb5 pos_rel">
              <div class="flo_l mr10 wp50">
        `;

        if (messageMdl["usrPictKf"] != 0) {
          insertHtml += `<span class="hikokai_photo-m hikokai_text cl_fontWarn borC_light cursor_d">非公開</span>`;
        } else {
          if (messageMdl["usrBinSid"] == 0) {
            insertHtml += `
              <img src="../common/images/classic/icon_photo.gif" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_classicImg-display"/>
              <img src="../common/images/original/photo.png" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_originalImg-display"/>
            `;
          } else {
            if (messageMdl["usrJkbn"] == 9) {
              insertHtml += `
                <img src="../common/images/classic/icon_photo.gif" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_classicImg-display"/>
                <img src="../common/images/original/photo.png" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="wp50 btn_originalImg-display"/>
              `;
            } else {
              insertHtml += `
                <div class="txt_c">
                  <img src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=${messageMdl["usrBinSid"]}" name="userImage" onload="initImageView50('userImage${messageMdl["usrSid"]}')" alt="${msglist_cht010['cmn.photo']}" class="userIcon_size-w50"/>
                </div>
              `;
            }
          }
        }

        insertHtml += `
          </div>
          <div class="of_h pb5">
            <div class="js_media_heading">
        `;

        insertHtml += `
            ${createUserLink(messageMdl.usrName, messageMdl.usrJkbn, messageMdl.usrUkoFlg, messageMdl.usrSid, canSendFlg)}
            <span class="cl_fontWeek ml10">
              ${messageMdl["entryTime"]}
            </span>
          </div>
          ${element[0].createReplyDisp(messageMdl["replyMessageInfo"], false, canSendFlg)}
          ${element[0].createMentionDisp(messageMdl, canSendFlg)}
        `;

        let message = "";
        message += messageMdl["messageText"];
        message = message.replaceAll(disableEmoji, "□");
        let editTime = "";
        if (messageMdl["messageKbn"] == 1) {
          editTime += `
            <span class="cl_fontWeek edit_chat fs_12">
              <span class="edit_time ml5 bgC_body bor1">
                ${messageMdl["updateDay"]}&nbsp;${messageMdl["updateTime"]}
              </span>
              ${msglist_cht010['cht.cht010.02']}
            </span>
          `;
        }

        insertHtml += `
          <div class="js_media_text_${messageMdl["messageSid"]} word_b-all">
        `;
        if (messageMdl["stampBinSid"] <= 0 && messageMdl["stampDefaultId"] <= 0) {
          insertHtml += `
            <span class="js_message">${message}</span>
          `;
        }
        insertHtml += `
            ${editTime}
          </div>
        `;

        /* スタンプ */
       insertHtml += element[0].#createStampDisp(messageMdl);

        insertHtml += createTempDispArea(messageMdl);
        insertHtml += element[0].createReactionArea(messageMdl);
        insertHtml += `
          </div>
        `;
        let pinOnClass = "display_n";
        let pinOffClass = "";
        if (messageMdl["messagePinKbn"] == 1) {
          pinOnClass = "";
          pinOffClass = "display_n";
        }

        insertHtml += `
              <div class="edit_deleteArea js_editDeleteArea txt_r">
                <div class="verAlignMid">
                  <span class="js_message_reaction pos_rel cl_linkDef cursor_p mr10" value="${messageMdl["messageSid"]}"><!--
                --!><img class="hp18 wp18" src="../chat/images/original/icon_reaction.png"><!--
                --!><span class="ml5">${msglist_cht010['cmn.reaction']}</span><!--
              --!></span><!--
              --><span class="js_message_reply pos_rel cl_linkDef cursor_p" value="${messageMdl["messageSid"]}"><!--
                  --!><img src="../chat/images/original/icon_reply.png"><!--
                  --!><span class="ml5">${msglist_cht010['cmn.reply']}</span><!--
              --!></span>
                </div>
              </div>
              <div class="messagePinArea">
                <img id="messagePinOn_${messageMdl["messageSid"]}" class="js_messagePin-on wp20 cursor_p ${pinOnClass}" onclick="changeMessagePin(${messageMdl["messageSid"]}, false);" src="../chat/images/original/icon_pin_on.png">
                <img id="messagePinOff_${messageMdl["messageSid"]}" class="js_messagePin-off wp20 cursor_p ${pinOffClass}" onclick="changeMessagePin(${messageMdl["messageSid"]}, true);" src="../chat/images/original/icon_pin_off.png">
              </div>
        `;
      }
      const addElement = $(insertHtml);
      element.append(addElement);
      element[0].drawSearchHighlight();
      if (selMsgFlg) {
        element.find('.js_mediaArea').addClass('media_selected');
      }

      if (canSendFlg === "false") {
        $(".js_message_reaction").remove();
        $(".js_message_reply").remove();
      }
    }

    function createTempDispArea(messageMdl) {
      let insertHtml = "";
      let binList = messageMdl["binMdlList"];
      if (binList != null) {
        const selectSid = document.forms[1].cht010SelectPartner.value;
        const selectKbn = document.forms[1].cht010SelectKbn.value;

        insertHtml += `<div class="cht_tempFileArea js_tempFileArea">`
        binList.forEach(function(binMdl) {
          let preview = document.createElement('file-preview');
          preview.setAttribute('url',
            '../chat/cht010.do?CMD=fileDownload'
            + '&cht010MessageSid='+ messageMdl["messageSid"]
            + '&cht010BinSid='+ binMdl.binSid
            + '&cht010SelectPartner='+ selectSid
            + '&cht010SelectKbn=' + selectKbn);
          preview.setAttribute('filename', binMdl.binFileName);

          preview.innerHTML = `
            <img src="../chat/images/temp_file.png" class="hp30 js_fileImage" alt="添付アイコン">
            <a href="#!" class="js_tempDownload ml5" value="${binMdl.binSid}" data-messagesid="${messageMdl["messageSid"]}">
              <span class="word_b-all js_temp"><span class="js_temp_fileName"></span><span class="js_temp_fileSize">${binMdl.binFileSizeDsp}</span></span>
            </a>
          `;
          preview.querySelector('.js_temp_fileName').textContent = '' + binMdl.binFileName;



          insertHtml += `
            <div class="cht_tempFile js_chtTempFile ml5 mb5 mr5 cursor_p">
            ${preview.outerHTML}
            </div>
          `;
        });
        insertHtml += "</div>";
      }
      return insertHtml;
    }
  }
  createReactionArea(messageMdl) {
    let insertHtml = "";
    const sessionSid = document.forms[1].cht010EditUsrSid.value;
    const reactionList = messageMdl["reactionList"];
    if (reactionList == null) {
      return insertHtml;
    }

    let usrList;
    reactionList.forEach(function(reactionMdl){
      var selectedClass = ""
      var reactedFlg = false;
      if (reactionMdl == null) {
        return;
      }
      usrList = reactionMdl["usrSidList"];

      let users = `<span class="display_none">`;
      usrList.forEach(function(usrSid) {

        if (sessionSid == usrSid) {
          selectedClass = "cht_reaction-selected";
          reactedFlg = true;
        }
        users += `<span class="js_reactionUser" value="${usrSid}"></span>`;
      });
      users += `</span>`;

      insertHtml += `
        <div class="js_reaction cursor_p cht_reaction ${selectedClass} pr5 pl5 mr5 mb5" value="${reactionMdl["racSid"]}" data-reacted="${reactedFlg}">
          <span class="p1">
          <img src="../chat/images/original/icon_reaction_${reactionMdl["racSid"]}.png" class="wp18 hp18" alt="reaction_${reactionMdl["racSid"]}">
          ${usrList.length}
          </span>
          ${users}
      `;

      insertHtml += `
        </div>
      `;
    });
    return insertHtml;
  }

  #createStampDisp(messageMdl) {
    let insertHtml = "";
    if (messageMdl["stampBinSid"] > 0) {
      let stampBinSid = messageMdl["stampBinSid"];
      insertHtml += `
        <div class="wp150 hp150 mb5 component_bothEnd">
          <img class="mxwp150 mxhp150 mrl_auto" src="../chat/cht010.do?CMD=getStampImg&cht010StampBinSid=${stampBinSid}">
        </div>
      `;
    }
    if (messageMdl["stampDefaultId"] > 0) {
      let stampDefaultId = messageMdl["stampDefaultId"];
      insertHtml += `
        <div class="wp150 hp150 mb5">
          <img class="mxwp150 mxhp150 mrl_auto" src="../chat/images/stamp/stamp_${stampDefaultId}.png">
        </div>
      `;
    }
    return insertHtml;
  }

  #createUsrImgHtml(messageMdl, size, hikokaiCursorDefault=false) {
    if (messageMdl == null) {
      return "";
    }
    let userImage;
    let sizeClass = "userIcon_size-w25";
    let hikokaiFont = "";
    if (size == 18) {
      sizeClass = "userIcon_size-w18";
      hikokaiFont = "hikokai_font-ss";
    }

    if (messageMdl["usrJkbn"] == 9) {
      userImage = `
        <img src="../common/images/classic/icon_photo.gif" alt="${msglist_cht010['cmn.photo']}" class="${sizeClass} btn_classicImg-display">
        <img src="../common/images/original/photo.png" alt="${msglist_cht010['cmn.photo']}" class="${sizeClass} btn_originalImg-display">
      `;
    } else if (messageMdl["usiPictKf"] == 1 || messageMdl["usrPictKf"] == 1) {
      let cursorClass = "";
      if (hikokaiCursorDefault) {
        cursorClass = "cursor_d";
      }
      userImage= `
        <span class="hikokai_photo-s hikokai_text cl_fontWarn ${cursorClass} ${sizeClass} ${hikokaiFont}">${msglist_cht010['cmn.private.photo']}</span>
      `;
    } else if (messageMdl["usrBinSid"] > 0) {
      userImage = `
        <img src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=${messageMdl["usrBinSid"]}" alt="${msglist_cht010['cmn.photo']}" class="${sizeClass}">
      `;
    } else if (messageMdl["binSid"]) {
      userImage = `
        <img src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=${messageMdl["binSid"]}" alt="${msglist_cht010['cmn.photo']}" class="${sizeClass}">
      `;
    } else {
      userImage = `
        <img src="../common/images/classic/icon_photo.gif" alt="${msglist_cht010['cmn.photo']}" class="${sizeClass} btn_classicImg-display">
        <img src="../common/images/original/photo.png" alt="${msglist_cht010['cmn.photo']}" class="${sizeClass} btn_originalImg-display">
      `;
    }
    return userImage;

  }
  #createReplyMessage(messageMdl) {
    if (messageMdl == null) {
      return "";
    }
    let messageText = "";
    messageText += messageMdl["messageText"];
    messageText = messageText.replaceAll(/<BR>/g, " ").replaceAll(/<wbr>/g, "");

    let div = document.createElement('div');
    div.innerHTML = messageText.replaceAll(/<BR>/g, " ").replaceAll(/<wbr>/g, "");
    let textContent = div.textContent;
    div.innerText = textContent;
    messageText = div.innerHTML;

    if (messageMdl["messageKbn"] == 9) {
      messageText = msglist_cht010['cht.cht010.03'];
    } else if (messageMdl["binMdlList"] != null && messageMdl["binMdlList"].length > 0) {
      messageText += "<span class='js_replyFile'>";
      if (messageText.length > 0) {
        messageText += " ";
      }
      if (messageMdl["binMdlList"].length == 1) {
        messageText += messageMdl["binMdlList"][0].binFileName;
      }
      if (messageMdl["binMdlList"].length > 1) {
        messageText += messageMdl["binMdlList"].length + msglist_cht010['cht.cht010.68'];
      }
      messageText += "</span>";
    }

    return messageText;
  }

  createReplyDisp(messageMdl, isInput, canSendFlg) {
    if (messageMdl == null) {
      return "";
    }
    let userImage = this.#createUsrImgHtml(messageMdl, 25);

    let messageText = this.#createReplyMessage(messageMdl);

    /* スタンプ */
    let stampHtml = ``;
    if (messageMdl["stampBinSid"] > 0) {
      let stampBinSid = messageMdl["stampBinSid"];
      stampHtml += `
        <div class="wp50 hp50 component_bothEnd">
          <img class="mxwp50 mxhp50 mrl_auto" src="../chat/cht010.do?CMD=getStampImg&cht010StampBinSid=${stampBinSid}">
        </div>
      `;
    }
    if (messageMdl["stampDefaultId"] > 0) {
      let stampDefaultId = messageMdl["stampDefaultId"];
      stampHtml += `
        <div class="wp50 hp50">
          <img class="mxwp50 mxhp50 mrl_auto" src="../chat/images/stamp/stamp_${stampDefaultId}.png">
        </div>
      `;
    }


    let insertHtml = ``;
    let linkClass = "cl_linkDef";
    if (messageMdl["usrUkoFlg"] == 1) {
      linkClass = "mukoUser";
    }
    let usrName = messageMdl["usrName"];
    if (messageMdl["usrJkbn"] == 9) {
      usrName = `<del>${messageMdl["usrName"]}</del>`
    }

    if (messageMdl["messageKbn"] == 9) {
      insertHtml = `
        <div class="js_chtReplyArea cht_reply verAlignMid" data-messagesid="${messageMdl["messageSid"]}">
          <div class="verAlignMid">
            <span class="display_inline-block mxwp200 of_h txt_overflow-ellipsis no_w word_b-all cl_fontWeek js_replyText">${messageText}</span>
          </div>
      `;
    } else if (messageText.length != 0) {
      insertHtml = `
        <div class="js_chtReplyArea cht_reply verAlignMid pos_rel" data-messagesid="${messageMdl["messageSid"]}">
          <div class="flo_l mr5 wp25 hp28 verAlignMid txt_c">
            ${userImage}
          </div>
          <div class="verAlignMid">
            ${createUserLink(messageMdl.usrName, messageMdl.usrJkbn, messageMdl.usrUkoFlg, messageMdl.usrSid, canSendFlg)}
            <span class="display_inline-block mxwp200 of_h txt_overflow-ellipsis no_w ml5 word_b-all cl_fontWeek js_replyText">${messageText}</span>
          </div>
      `;
    } else if (stampHtml.length != 0) {
      insertHtml = `
        <div class="js_chtReplyArea cht_reply display_inline pos_rel" data-messagesid="${messageMdl["messageSid"]}">
          <div class="flo_l mr5 wp25 hp28 txt_c">
            ${userImage}
          </div>
          <div class="of_h flo_l verAlignMid hp28">
            ${createUserLink(messageMdl.usrName, messageMdl.usrJkbn, messageMdl.usrUkoFlg, messageMdl.usrSid, canSendFlg)}
          </div>
          <div class="of_h verAlignMid">
            <span class="display_inline-block mxwp200 of_h txt_overflow-ellipsis no_w ml5 word_b-all cl_fontWeek js_replyText">${stampHtml}</span>
          </div>
      `;
    }

    if (isInput) {
      insertHtml += `
        <div class="pos_abs cht_deleteIcon">
          <img src="../common/images/original/icon_delete.png" alt="削除アイコン" class="btn_originalImg-display hp18 cursor_p" onclick="resetReply();">
          <img src="../common/images/classic/icon_delete.png" alt="削除アイコン" class="btn_classicImg-display hp18 cursor_p" onclick="resetReply();">
        </div>
        <input type="hidden" name="cht010ReplyMessage" value="${messageMdl["messageSid"]}">
      `;
    }

    insertHtml += `
      </div>
    `;

    return insertHtml;
  }

  /** 検索結果、ピン止め用メッセージ表示エレメントを生成 */
  createSimpleElement(messageMdl, searchDate, textOverfllowFunc=null) {
    if (messageMdl == null) {
      return "";
    }
    let userImage = this.#createUsrImgHtml(messageMdl, 25);

    let messageText = '' + messageMdl["messageText"];

    let isStamp = false;

    /* スタンプ */
    let stampHtml = ``;
    if (messageMdl["stampBinSid"] > 0) {
      let stampBinSid = messageMdl["stampBinSid"];
      stampHtml += `
        <div class="wp100 hp100 component_bothEnd">
          <img class="mxwp100 mxhp100 mb5 mrl_auto" src="../chat/cht010.do?CMD=getStampImg&cht010StampBinSid=${stampBinSid}">
        </div>
      `;
    }
    if (messageMdl["stampDefaultId"] > 0) {
      let stampDefaultId = messageMdl["stampDefaultId"];
      stampHtml += `
        <div class="wp100 hp100">
          <img class="mxwp100 mxhp100 mb5 mrl_auto" src="../chat/images/stamp/stamp_${stampDefaultId}.png">
        </div>
      `;
    }


    let dateText = '';
    if (messageMdl['entryDay'].startsWith(searchDate.substr(0, 10))) {
    } else if (searchDate.substr(0, 4) == messageMdl['entryDay'].substr(0, 4)) {
      dateText += messageMdl['entryDay'].substr(5)
    } else {
      dateText += messageMdl['entryDay']
    }
    let usrCls = ''
    if (messageMdl["usrJkbn"] == 9) {
      usrCls += 'delete_border ';
    } else if (messageMdl["usrUkoFlg"] == 1) {
      usrCls += 'mukoUser ';
    }


    //スタンプ以外の本文からタグを除去
    let div = document.createElement('div');
    div.innerHTML = messageText;
    let msgBodyHtml = '';
    let textContent = div.textContent;
    if (textContent.length > 35) {
      if (textOverfllowFunc) {
        textContent = textOverfllowFunc(textContent);
      } else {
        textContent = `${substringText(textContent, 0, 35)}...`
      }
    }
    div.innerText = textContent;
    messageText = div.innerHTML;
    msgBodyHtml += `
      <div class="js_messageBody word_b-all">
      ${messageText}
      </div>
    `;

    if (stampHtml.length != 0) {
      msgBodyHtml = `
          <div class="js_cht010SearchResult_childBody cht010SearchResult_childBody ">
            ${stampHtml}
          </div>
      `;
    }

    //添付ファイル
    if (messageMdl["binMdlList"] != null && messageMdl["binMdlList"].length > 0) {
      let tempText = '';
      if (messageMdl["binMdlList"].length == 1) {
        tempText += messageMdl["binMdlList"][0].binFileName;
        if (tempText.length > 12) {
          tempText = `${substringText(tempText, 0, 12)}...`;
        }

      } else if (messageMdl["binMdlList"].length > 1) {
        tempText = messageMdl["binMdlList"].length + msglist_cht010['cht.cht010.68'];
      }
      msgBodyHtml += `
        <div><!--
        --><img class="classic-display mr5" src="../common/images/classic/icon_temp_file_2.png" draggable="false"><!--
        --><img class="original-display mr5" src="../common/images/original/icon_attach.png" draggable="false"></img><!--
        -->${tempText}
        </div>
      `;
    }

    const ret = document.createElement('div');
    ret.classList.add('display_tbl');
    ret.classList.add('w100');
    ret.classList.add('pt5');
    ret.classList.add('pb5');
    ret.classList.add('pl5');
    ret.classList.add('pr15');
    ret.classList.add('fs_13');
    ret.innerHTML = `
        <div class="flo_l ml5 mr5 wp25">
          ${userImage}
        </div>
        <div class="of_h">

          <div><!--
            --><span class=" ${usrCls} fw_b word_b-all" >${messageMdl["usrName"]}</span><!--
            --><span class="cl_fontWeek ml10 no_w">${dateText}</span><!--
            --><span class="cl_fontWeek  ml5 no_w">${messageMdl['entryTime']}</span><!--
            --></div>
          ${msgBodyHtml}
        </div>
    `;
    return ret;
  }


  createMentionDisp(messageMdl, canSendFlg) {
    if (messageMdl == null) {
      return "";
    }

    const mentionList = messageMdl["mentionUserInfo"];
    if (mentionList == null || mentionList.length == 0) {
      return "";
    }

    let insertHtml = `<div class="cht_mentionArea">`
    const chatBlock = this;
    mentionList.forEach(function(usrMdl) {
      let userSpan;
      if (usrMdl.usrSid == -1) {
        userSpan = `<span class="fw_b ml5">${msglist_cht010["cht.cht010.80"]}</span>`;
      } else {
        userSpan = `
          <span class="ml5 fontoffset">
            ${createUserLink(usrMdl.usiName, usrMdl.usrJkbn, usrMdl.usrUkoFlg, usrMdl.usrSid, canSendFlg)}
          </span>
        `
      }

      let bgcClass = "bgC_chtMention"
      if (usrMdl.usrSid == -1 || usrMdl.usrSid == document.forms[1].cht010EditUsrSid.value) {
        bgcClass = "bgC_chtMention-select"
      }

      insertHtml += `
        <div class="mb5 mr5">
          <div class="cht_mention mr5 verAlignMid p3 pr10 pl10 lh130 ${bgcClass}">
            <span class="verAlignMid">
              ${chatBlock.#createUsrImgHtml(usrMdl, 18, true)}
            </span>
            ${userSpan}
          </div>
        </div>
      `;
    });
    insertHtml += "</div>"

    return insertHtml;
  }

  /** 検索キーワード ハイライト表示 */
  drawSearchHighlight() {

    let highLight = true;
    //フィルター一覧取得
    const filters = Array.from(document.querySelectorAll('input[name="cht010SearchFilter"]'));

    if (filters.length <= 0) {
      highLight = false;
    }

    const keywords = filters
      .filter((input) => {
        return (input.value.startsWith('keyword:'));
      })
      .map((input) => {
        return input.value.substr(8);
      })

    const keywordsRegexpStr = keywords
      .map((keyword) => {
        return keyword.replace(/([\/\.\*\+\^\|\[\]\(\)\?\$\{\}\\])/g, '\\$1');
      })
      .map((keyword) => {
        return '(' +
          keyword
          + ')';
      })
      .join("|");

    const senders = filters.filter((input) => {
      return (input.value.startsWith('user:'));
    }).map((input) => {
      return input.value.substr(5);
    });

    const outMemberFilter = filters
    .filter((input) => {
      return (input.value.startsWith('outMember'));
    })
    .some((input) => { return true});


    const messageInfo = JSON.parse(this.message);

    if (messageInfo["messageKbn"] == 9
      || !this.querySelector('.js_media_heading')
    ) {
      return;
    }
    //キーワードハイライトは本文と添付ファイルが対象
    const bodys = Array.from(this.querySelectorAll('.js_message, .js_temp_fileName'));
    const regExp = new RegExp(`(${keywordsRegexpStr})`, "g");

    let allText = '';
    bodys.forEach((body) => {
      allText += body.textContent;
    });
    //キーワードの全件一致を確認し
    //一致しないキーワードがあるメッセージはハイライトしない
    if (keywords.some(keyword => {
      return (allText.indexOf(keyword) < 0)
    })) {
      highLight = false;
    }

    //絞り込み条件に反する検索をハイライトしない
    const someFilterUnmatch = filters
    .filter((input) => {
      return (input.value.startsWith('attachmentAll')
                || input.value.startsWith('attachmentLess')
                || input.value.startsWith('urlAll')
                || input.value.startsWith('urlLess'));
    })
    .some((input) => {
      switch(input.value) {
        case 'attachmentAll':
          return (this.querySelector('.js_temp') == null);
        case 'attachmentLess':
          return (this.querySelector('.js_temp') != null);
        case 'urlAll':
          return (this.querySelector('.js_message a') == null);
        case 'urlLess':
          return (this.querySelector('.js_message a') != null);
        default: return true
      }
    }
    );
    if (someFilterUnmatch) {
      highLight = false;
    }

    //送信者のいずれかへの一致を確認し
    //一致しないキーワードがあるメッセージはハイライトしない
    //絞り込み条件に反する検索をハイライトしない
    const usrSid = '' + messageInfo["usrSid"];
    const senderFilterMatch = (
      senders
        .some((sid) => {
          return (sid == usrSid)
        })
      || (outMemberFilter && messageInfo['inMemberKbn'] == 0)
      )

    if (senderFilterMatch == false
        && (senders.length > 0 || outMemberFilter)) {
      highLight = false;
    }


    function innerRedrowHTML(node, regExp) {
      if (keywordsRegexpStr.length <= 0) {
        return false;
      }
      if (node.nodeType != Node.TEXT_NODE) {
        const children = [];
        let replacedRet = false;
        //描画更新によってchildNodesにループ中の変更が反映されるため
        //ターゲットリストを先に作成
        node.childNodes.forEach((child) => {
          children.push(child);
        });
        children.forEach((child) => {
          let replaced = innerRedrowHTML(child, regExp);
          if (replaced) {
            replacedRet = replaced;
          }
        });
        return replacedRet;
      }
      let replaced = false;
      let text = node.textContent;
      const matches = [...text.matchAll(regExp)];
      let stIndex = 0;
      matches.forEach((match) => {
        node.before(text.substring(stIndex, match.index));
        let span = document.createElement('span');
        span.classList.add('bgC_select');
        span.classList.add('fw_bold');
        span.classList.add('display_inline');
        span.textContent = match[0];
        node.before(span);
        stIndex = match.index + match[0].length;
        replaced = true;
      });
      let parent = node.parentNode;
      node.before(text.substring(stIndex, text.length));
      node.remove();
      return replaced;
    }

    //本文部キーワードハイライト
    bodys.forEach((content) => {
      if (content.getAttribute('data-nonhighligtbackup')) {
        content.innerHTML = content.getAttribute('data-nonhighligtbackup');
        content.removeAttribute('data-nonhighligtbackup');
      }
      if (highLight == false) {
        return;
      }

      let backup = content.innerHTML;

      content.setAttribute('data-nonhighligtbackup', backup);
      const replaced = innerRedrowHTML(content, regExp);
      if (!replaced) {
        content.innerHTML = backup;
        content.removeAttribute('data-nonhighligtbackup');
      }

    });

    //送信者検索ハイライト
    const userHead = this.querySelector('.js_media_heading').firstElementChild;
    if (senderFilterMatch && highLight) {
      userHead.classList.add('bgC_select');
      userHead.classList.add('fw_bold');
    } else {
      userHead.classList.remove('bgC_select');
      userHead.classList.remove('fw_bold');

    }

  }

}

//コンポーネントタグを定義
customElements.define( 'chat-block', Cht010ChatBlock );


/**
 *
 * チャット一覧用WEBComponent
 * attribute['data-messages'] でjsonからメッセージリストを作成する
 *
 * 編集やリプライなどでホバーイベントに対応しない状態時は
 * attribute['data-button-lock'] = true を設定し、追加読み込みするメッセージリストを編集状態に対応させる。
 *
 * その他機能
 * 　リスト上部にメッセージ追加 prependMessages
 * 　リスト下部にメッセージ追加 appendMessages
 *   リストの初期化 resetMessages
 *   指定メッセージへのjump   jumpArround(messageSid) {
 *
 * @class Cht010FilterInput
 * @extends {HTMLElement}
 */
class Cht010ChatList extends HTMLElement {
  constructor() {
    super();
    this.drawingFlg = false;
    this.messageCount = 0;
    this.buttonLock = false;
  }

  static get observedAttributes() {
    return ['data-messages', 'data-sendable', 'data-button-lock'];
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (newValue == '') return
    if (property == "data-messages") {
      this.#draw();
    }

    if (property == 'data-button-lock') {
      this.buttonLock = newValue;
    }

  }

  connectedCallback() {
  }

  /**チャット一覧部描画設定*/
  #draw() {
    this.innerHTML = '';

    let data = this.getAttribute('data-messages');
    if (data.length > 0) {
      let messages = JSON.parse(data);
      this.appendMessages(messages, true);
      this.setAttribute('data-messages', '');
    }

  }
  #createMessageHtml(messageList, lastDate, newFlg) {
    var html ='';
    if (!messageList
      || messageList.length <= 0
    ) {
      return html;
    }
    let chkDate = lastDate;

    let midoku = newFlg;

    let firstDayLine = false;

    messageList.forEach((messageMdl) => {
      if (messageMdl["messageSid"] == null) {
        return;
      }

      let drawLine = false;
      //日付ラインを挿入
      if (chkDate != messageMdl['entryDay'] && messageMdl['entryDay'].length > 0) {
        var dayLine = document.createElement('p');
        dayLine.textContent = messageMdl['entryDay'];
        dayLine.classList.add(
          'js_chatList_dayLine',
          'cht_dayLine',
          'cl_fontWeek',
          'fw_b',
          'js_hiduke',
          'js_hiduke_fixed');
        if (chkDate == '') {
          dayLine.classList.add(
            'display_none'
          );

        }
        dayLine.setAttribute('value', messageMdl['entryDay']);
        html += dayLine.outerHTML;

        chkDate = messageMdl['entryDay'];
        drawLine = true;
      }

      //未読ラインを挿入
      if (messageMdl['ownKidoku'] != 1 && midoku == false) {
        midoku = true;
        var midokuLine = document.createElement('p');
        midokuLine.textContent = chkDate;
        midokuLine.classList.add(
          'js_chatList_midokuLine',
          'cht_dayLine',
          'cht_newLine',
          'cl_linkDef',
          'fw_b',
          'js_hiduke_fixed'
        );
        midokuLine.textContent = msglist_cht010['cht.cht010.11'];
        html += midokuLine.outerHTML;

        drawLine = true;
      }
      //区切り線を挿入
      if (drawLine == false) {
        var line　= this.#createSeparateLine();
        html += line.outerHTML;
      }

      var messageMdlStr = JSON.stringify(messageMdl);
      const jumpId = `js_jumpMessageSid${messageMdl['messageSid']}`;
      html += `<a id="${jumpId}" name="${jumpId}" data-sid="${messageMdl['messageSid']}"></a>`;
      const chatBlock = document.createElement('chat-block');
      chatBlock.setAttribute('message', messageMdlStr);
      chatBlock.setAttribute('data-button-lock', this.buttonLock);

      var canSendMessage;
      if (this.getAttribute("data-sendable") == null) {
        canSendMessage = ($("#inText").attr('readonly') != 'readonly');
      } else {
        canSendMessage = (this.getAttribute("data-sendable") == 0);
      }
      chatBlock.setAttribute("cansend", canSendMessage);
      html += chatBlock.outerHTML;
    });
    return html;
  }
  #createSeparateLine() {
    var line = document.createElement('div');
    line.classList.add(
      'js_chatList_borderLine',
      'chat_lrSpace',
      'mt5'
    );
    line.innerHTML = `
      <div class="ptb1 w100"></div>
      `;
    return line;
  }
  /** メッセージを下に追加 */
  appendMessages(messageList, initFlg) {
    if (!messageList || messageList.length <= 0) {
      return;
    }

    this.messageCount += messageList.length;

    let lastDay = '';
    let lastDayLine = Array.from(this.querySelectorAll('.js_hiduke')).pop();
    if (lastDayLine) {
      lastDay = lastDayLine.getAttribute('value');
    }

    //新着メッセージラインを表示済み
    let newLineDispFlg =
      (this.querySelector('.js_chatList_midokuLine') != null);

    if (!initFlg) {
      newLineDispFlg = true;
    }

    this.insertAdjacentHTML(
      'beforeend',
      this.#createMessageHtml(messageList, lastDay, newLineDispFlg)
    );
  }
  /** メッセージを上に追加 */
  prependMessages(messageList) {
    if (!messageList || messageList.length <= 0) {
      return;
    }

    this.messageCount += messageList.length;

    let lastDay = Array.from(messageList).pop()['entryDay'];
    let checkLine = this.querySelector('.js_hiduke.display_none');

    let addHtml = ''
    if (lastDay != checkLine.getAttribute('value')) {
      checkLine.classList.remove('display_none');
    } else {
      addHtml += this.#createSeparateLine().outerHTML;

    }
    addHtml += this.#createMessageHtml(messageList, '', false);

    this.insertAdjacentHTML(
      'afterbegin',
      addHtml
    )
  }
  /** チャットリストの描画中の場合、完了までスレッドを止める */
  async waitMessageDrawFinishedPromise() {
    const checkOk = () => {
      return (this.querySelectorAll('chat-block').length == this.messageCount);
    }

    if (checkOk()) {
      return true;
    }

    const wait = async () => {
      for(let i = 0; i < 10; i++) {
        const timeOutPromise = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(checkOk());
            }, 100)
          });
        }
        if (await timeOutPromise()) {
          return true;
        }
      }
      return false;
    }
    return await wait();
  }

  /** メッセージ一覧を空にする*/
  resetMessages() {
    this.messageCount = 0;
    this.innerHTML = '';
    this.#draw();
  }

  /** メッセージの存在チェック*/
  execCheckMessage(messageSid) {
    const jumpId = `js_jumpMessageSid${messageSid}`;
    const search = this.querySelector(`#${jumpId}`);
    if (search) {
      return true;
    }
    return false;
  }

  /** 指定メッセージへjump*/
  jumpArround(messageSid) {

    if (this.execCheckMessage(messageSid)) {
      this.jumpNoConnect(messageSid, 'smooth');
      return;
    }

    scrollAutoReadFlg = 1;

    var formData = new FormData($('#js_chtForm').get(0));
    formData.delete('CMD');
    formData.append('CMD', 'jumpArround');
    formData.append('cht010jumpMessageSid', messageSid);

    const ajaxParam = Array.from(formData.entries())
                            .map(entry => {
                              return $.param(Object.fromEntries(new Map([entry])));
                              })
                              .join('&');

    const lastChild =  Array.from(this.querySelectorAll('a[name^="js_jumpMessageSid"]')).reverse()[0];
    let animFinish = false;
    let ajaxResult = null;

    Promise.resolve()
    .then(function(){
        return Promise.all([
            //スクロールアニメーション
            new Promise(function(fulfilled, rejected){
                  if (Number(lastChild.getAttribute('data-sid')) < Number(messageSid)) {
                    $("#js_chatMessageArea").animate({scrollTop: $("#js_chatMessageArea")[0].scrollHeight},'fast',function(){
                      fulfilled();
                    });
                  } else {
                    $("#js_chatMessageArea").animate({scrollTop: 0},'fast',function(){
                      fulfilled();
                    });
                  }
            }),
            //Ajax
            new Promise(function(fulfilled, rejected){
              $.ajax({
                async: true,
                url:  "../chat/cht010.do",
                type: "post",
                data: ajaxParam,
                processData: false, // dataをクエリ文字列にしない
              }).done(( data ) => {
                ajaxResult = data;
                fulfilled();
              });
            })
        ])
    })
    .then(() => {
      if (ajaxResult['success']) {
      } else {
        alert(msglist_cht010['cht.cht010.23']);
        scrollAutoReadFlg = 0;
        return;
      }

      this.resetMessages();
      this.appendMessages(ajaxResult['messageList'], false);
      addReactionUser(ajaxResult);
      //メッセージ追加完了を待つ
      const waitRet = this.waitMessageDrawFinishedPromise();
      waitRet.then(
        (resolveRet) => {
          allDispTopFlg = 0;
          //最新の投稿が表示されている場合、下スクロールによる追加読み込みを停止する。
          allDispBottomFlg = ajaxResult["allDispFlg"];

          let jumpFlg = false;
          ajaxResult['messageList'].forEach((messageMdl) => {
            if (messageMdl['messageSid'] == messageSid) {
              jumpFlg = true;
            }
          });
          this.jumpNoConnect(messageSid);

        });
    });


  }

  /** 指定メッセージへjump 画面内スクロール*/
  jumpNoConnect(messageSid, behavior) {
    const jumpId = `js_jumpMessageSid${messageSid}`;
    const list = this;
    const winY = window.scrollY;
    async function timeoutRoop() {
      if (list.execCheckMessage(messageSid) == false) {
        setTimeout(timeoutRoop, 10);
        return
      }
      scrollAutoReadFlg = 0;

      const jumpId = `js_jumpMessageSid${messageSid}`;
      const search = list.querySelector(`#${jumpId}`).nextElementSibling;

      const messagesTop =  $("#js_chatMessageArea").offset().top;
      const messagesBottom =  $("#js_chatMessageArea").offset().top
      +  $("#js_chatMessageArea").outerHeight();
      const message = $(search);
      const parent = $(search).parent();

      const objH = message.outerHeight();
      const objTop = message.offset().top;
      const objBottom = objTop + objH;
      const parTop = parent.offset().top;
      const parH = parent.outerHeight();
      const parBottom = parH + parTop;
      const moveTo = objTop - parTop;

      if (!behavior) {
        $("#js_chatMessageArea").scrollTop(parseInt(moveTo));
      } else {
        $("#js_chatMessageArea").animate({'scrollTop': parseInt(moveTo)},'fast',function(){
        });
      }
    }
    setTimeout(timeoutRoop, 1);

  }

}
customElements.define( 'cht010-chat-list', Cht010ChatList );


/**
 *
 * メンバー情報 ユーザ表示（アイコン極小）テンプレート
 * @class Cht010FilterInput
 * @extends {HTMLElement}
 */
class Cht010MemberSmall extends HTMLElement {
  static EnumImgDispType = {
    default:0,
    image:1,
    hikokai:2,
  };
  static EnumImgDispTypeIndex = [
    Cht010MemberSmall.EnumImgDispType.default,
    Cht010MemberSmall.EnumImgDispType.image,
    Cht010MemberSmall.EnumImgDispType.hikokai
  ]

  init = false;
  /** ユーザSID*/
  usr_name;
  /** ユーザ名*/
  usi_name;
  /** 画像タイプ*/
  img_disp_type;
  /** 画像公開フラグ*/
  usiPictKf;
  /** 画像SID*/
  bin_sid;
  /** ユーザ名クラス指定*/
  nameClass;

  constructor() {
    super();
  }

  static get observedAttributes() {
  return ['data-usr_sid','data-usi_name','data-usr_jkbn',  'data-usr_uko_flg', 'data-usi_pict_kf', 'data-bin_sid'];
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (this.init == false) {
      return;
    }
    if (oldValue === newValue) return;
    this.#draw();

  }

  connectedCallback() {
    this.#draw();
  }

  #draw() {
    this.usr_sid = this.getAttribute('data-usr_sid');
    var div = document.createElement("DIV");
    div.appendChild(document.createTextNode(
      this.getAttribute('data-usi_name')
      )
    );
    this.usi_name = div.innerHTML;
    this.usiPictKf = this.getAttribute('data-usi_pict_kf');

    this.bin_sid = this.getAttribute('data-bin_sid');
    const classArr = ['fontoffset'];
    if (this.getAttribute('data-usr_jkbn') != 0) {
      classArr.push('delete_border');
    }
    if (this.getAttribute('data-usr_uko_flg') != 0) {
      classArr.push('mukoUser');
    }
    this.nameClass = classArr.join(' ')

    this.innerHTML = '';
    /** テンプレート デフォルト画像 */
    const templateDefault =
    `
    <template title="${this.usi_name}" >
      <span class="js_userData" data-sid="${this.usr_sid}"></span>
      <span class="verAlignMid hp18 wp18 fw_bold mr5">
      <img class="btn_classicImg-display userIcon_size-w18" src="../common/images/classic/icon_photo.gif">
      <img class="btn_originalImg-display userIcon_size-w18" src="../common/images/original/photo.png">
      </span>
      <span class="${this.nameClass}" >${this.usi_name}</span>
    </template>
    `;

    /** テンプレート ユーザ画像 */
    const templateImage =
    `
    <template title="${this.usi_name}"  >
    <span class="js_userData" data-sid="${this.usr_sid}"></span>
    <span class="verAlignMid hp18 wp18 fw_bold mr5">
      <img class="userIcon_size-w18" src="../common/cmn100.do?CMD=getImageFile&amp;cmn100binSid=${this.bin_sid}">
      </span>
      <span class="${this.nameClass}">${this.usi_name}</span>
    </template>
    `;

    /** テンプレート 画像非公開 */
    const templateHikokai =
    `
    <template title="${this.usi_name}" >
    <span class="js_userData" data-sid="${this.usr_sid}"></span>
    <span class="verAlignMid hp18 wp18 fw_bold mr5">
        <span class="hikokai_photo-s hikokai_text hikokai_font-ss cl_fontWarn userIcon_size-w18 fs_6">${msglist_cht010['cmn.private.photo']}</span>
      </span>
      <span class="${this.nameClass}">${this.usi_name}</span>
    </template>
    `;
    if (this.getAttribute('data-usr_jkbn') == 9) {
      this.innerHTML = templateDefault;
    } else if (this.usiPictKf == 1) {
      this.innerHTML = templateHikokai;
    } else if (this.bin_sid > 0) {
      this.innerHTML = templateImage;
    } else {
      this.innerHTML = templateDefault;
    }

    this.init = true;
  }

}
customElements.define( 'cht010-member-small', Cht010MemberSmall );
/**
 * チャット検索フォームWEBコンポーネント
 *
 * @class Cht010FilterInput
 * @extends {HTMLElement}
 */
class Cht010FilterInput extends HTMLElement {
  /** 検索条件確定 イベント   */
  static EvfixSearchInput = 'cht010-filterinput―commitSearchInput';


  constructor() {
      super();
      this.blankFlg = true;
      this.selectOnFlg = false;

  }

  static get observedAttributes() {
      return ['name', 'class', 'style', 'maxlength'];
  }

  //属性の値変更時のイベント処理
  attributeChangedCallback(property, oldValue, newValue) {

      if (oldValue === newValue) {
          return;
      }
      this[ property ] = newValue;


  }

  connectedCallback() {
    this.innerHTML = `
    <div  class="cht010SearchBody js_cht010SearchBody bor_l1 bor_r1 bor_b1 fs_13 bgC_body">
      <div class="w100 js_cht010SearchInputPane cht010SearchInputPane"><fieldset class=" ">
        <div class="m5 p5 bgC_lightGray">
          <div class="cht010SearchInputRow js_cht010SearchInputRow w100">
            <div class="mr5 inputcomponent border_radius3 borC_deep bor1 js_cht010SearchInputRow_main cht010SearchInputRow_main verAlignMid bgC_dropMenu pos_rel ">
              <div class="ml5 js_cht010SearchInput_loading verAlignMid display_none">
                <div class="txt_m txt_c opacity6 verAlignMid">
                    <img class="btn_classicImg-display hp15" src="../common/images/classic/icon_loader.gif">
                    <div class="loader-ball hp15 wp15 "><span class=""></span><span class=""></span><span class=""></span></div>
                </div>
              </div>
              <input class="js_cht010SearchInputRow_keyword cht010SearchInputRow_keyword border_none border_radius3" type="text" maxlength="${this.maxlength}" placeholder="${msglist_cht010['cht.cht010.59']}" autocomplete="off"/>
              <img class="wp15 hp15 mr3 cursor_p opacity6-hover js_cht010SearchInputRow_search" src="../common/images/original/icon_search.png" alt="${msglist_cht010['cmn.search']/*検索*/}">
            </div>
            <span class="js_cht010SearchInputRow_searchAreaToggleBtn cht010SearchInputRow_searchAreaToggleBtn opacity6-hover cursor_p">
              <img class="btn_classicImg-display" src="../smail/images/classic/icon_search_area_del.png">
              <img class="btn_originalImg-display" src="../smail/images/original/icon_toggle_searcharea.png">
            </span>
          </div>
          <div class="mt10 js_cht010SearchInput_optionRow">
            ${msglist_cht010['cht.cht010.70']/*絞り込み*/}
            <br>
            <select class="js_cht010SearchInput_optionselect">
              <option value="none">${msglist_cht010['cmn.no']/*なし*/}</option>
              <option value="attachmentAll">${msglist_cht010['cht.cht010.62']/*添付ファイルあり*/}</option>
              <option value="attachmentLess">${msglist_cht010['cht.cht010.71']/*添付ファイルなし*/}</option>
              <option value="urlAll">${msglist_cht010['cht.cht010.63']/*URLあり*/}</option>
              <option value="urlLess">${msglist_cht010['cht.cht010.72']/*URLなし*/}</option>
            </select>
            <div class="mt10"></div>
            ${msglist_cht010['cmn.sender']/*送信者*/}<br>
            <cht010-senderselect placeholder="${msglist_cht010['cmn.select.plz']/*選択してください。*/}"></cht010-senderselect>
          </div>
          <div class="w100 js_cht010SearchInput_result cht010SearchInput_result">
            <a href="#!" class="ml_auto mr5 pb5 pt5  verAlignMid fs_10 js_cht010SearchInput_resultClear cht010SearchInput_resultClear">${msglist_cht010['cmn.clear']/*クリア*/}</a>
          </div>
        </div>

      </fieldset></div>
      <div class="js_cht010SearchResultPane cht010SearchResultPane">
        <div class="cht010SearchResult js_cht010SearchResult " data-search="false">
          <div class="js_cht010SearchResult_count cht010SearchResult_count ml10"></div>
          <div class="js_cht010SearchResult_list customScrollBar ofy_a mxhp350 pl5 pr5 pb5"></div>
        </div>
      </div>
    </div>
    `;

    //検索オプション開閉イベント
    this.querySelector('.js_cht010SearchInputRow_searchAreaToggleBtn')
      .addEventListener('click', () => {
      let detailPane = this.querySelector('.js_cht010SearchInput_optionRow');
      $(detailPane).animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
    });
    $(this.querySelector('.js_cht010SearchInput_optionRow')).animate( { height: 'toggle', opacity: 'toggle' }, 0 );


    const keywordInput = this.querySelector('.js_cht010SearchInputRow_keyword');
    keywordInput.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        this.#commitKeyward();
        return;
      }
    });

    this.querySelector('.js_cht010SearchInputRow_search').addEventListener('mousedown', (e) => {
      e.preventDefault();
    });

    this.querySelector('.js_cht010SearchInputRow_search').addEventListener('click', (e) => {
      if (keywordInput.value == '') {
        this.#fixSearchInput();
      } else {
        this.#commitKeyward();
      }
      return;
    });

    this.querySelector('cht010-senderselect').addEventListener('select', (e) => {
      var a = e.target;
      this.#commitUser(a);
      return;
    });

    this.querySelector('.js_cht010SearchInput_resultClear').addEventListener('click', (e) => {
      this.reset();
    });


    this.querySelector('.js_cht010SearchInput_optionselect').addEventListener('change', (e) => {
      if (e.target.value == 'attachmentAll') {
        this.#commitAllFile();
      }
      if (e.target.value == 'attachmentLess') {
        this.#commitLessFile();
      }
      if (e.target.value == 'urlAll') {
        this.#commitAllURL();
      }
      if (e.target.value == 'urlLess') {
        this.#commitLessURL();
      }
      this.querySelector('.js_cht010SearchInput_optionselect').options[0].selected = true;
      return;
    });


    //スクロール時 検索結果追加読み込み
    this.querySelector('.js_cht010SearchResult_list')
      .addEventListener('scroll', (e) => {
        if (this.seachFlg) {
          return;
        }
        let nowTop = $(e.currentTarget).scrollTop();
        let sH = $(e.currentTarget).get(0).scrollHeight;
        let oH = $(e.currentTarget).get(0).offsetHeight;
        let count = this.querySelector('.js_cht010SearchResult_list').children.length;
        let max =  this.querySelector('.js_cht010SearchResult').getAttribute('data-max');
        if (sH != oH) {
          var scrollHeight = sH - oH;
          var readMode = 0;
          var messageSid = 0;
          let absBottomLength = nowTop - scrollHeight;
          if (absBottomLength < 0) {
            absBottomLength = -1 * absBottomLength;
          }


          if (absBottomLength <=5
              && max > count) {
            this.#search(true);
          }
        }
      });
  }
  /** 検索の初期化 */
  reset() {
    this.querySelector('.js_cht010SearchResult_list').innerHTML = '';
    this.querySelectorAll('.js_cht010SearchInput_resultChild').forEach(res => { res.remove(); });
    this.querySelector('.js_cht010SearchInputRow_keyword').value = '';
    this.querySelector('.js_cht010SearchResult').setAttribute('data-search', 'false');
    this.#fixSearchInput();
  }

  #commitKeyward() {

    const searchLabels = Array.from(
      this.querySelectorAll('.js_cht010SearchInput_resultChild')
    );
    const oldkeywords = [];
    searchLabels.forEach((label) => {
      let input = label.querySelector('input[value^="keyword"]');
      if (input) {
        oldkeywords.push(input.value.substring(8));
//        label.remove();
      }
    });

    const input = this.querySelector('.js_cht010SearchInputRow_keyword');
    const keywords =
    Array.from(
      new Set(//重複除去
        input.value.replaceAll("　", " ").split(' ')
      )
    )
    //以前キーワードとの重複除外
    .filter(key => {
        return oldkeywords.indexOf(key) < 0;
    });

    if (keywords.length == 0) {
      this.setAttribute('mode','default');
      input.blur();
      input.value='';
      return;
    }
    //キーワードを一時保管 入力エラー時の復元用
    $(input).data('last_keyword', input.value);

    keywords.forEach((keyword) => {
      if (keyword == '') {
        return;
      }
      var content = document.createElement('div');

      content.textContent = keyword;

      let input = document.createElement("input");
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', 'cht010SearchFilter');
      let inputValue = "keyword:" + keyword;
      input.setAttribute('value', inputValue);

      const html =
        `
        <div class="verAlignMid">
        <span class="verAlignMid hp18 wp18 fs_10 fw_bold mr5">
        <img src="../chat/images/original/icon_search_keyword.png">
        </span>
        <span class="fontoffset">
        ${content.innerHTML}
        </span>
        </div
        >${input.outerHTML}</input
        >`;


      this.#createLabel(html);

    });
    this.setAttribute('mode','default');
    input.blur();
    input.value='';
    this.#fixSearchInput();

  }

  #commitAllFile() {
    Array.from(
      this.querySelectorAll('.js_cht010SearchInput_resultChild')
    ).filter(label => {
      return label.querySelector('input[value^="attachment"]');
    }).forEach(label => {
      label.remove();
    });

    const html =
      `
      <span class="verAlignMid hp18 wp18 fw_bold mr5">
      <img class="btn_classicImg-display" src="../common/images/classic/icon_temp_file_2.png">
      <img class="btn_originalImg-display" src="../common/images/original/icon_attach.png">
      </span>
      <span class="fontoffset">
      ${msglist_cht010['cht.cht010.62']/*添付ファイルを含む投稿*/}
      </span>
      <input type="hidden" name="cht010SearchFilter" value="attachmentAll" ></input
      >`;
    this.#createLabel(html);
    this.#fixSearchInput();
  }

  #commitLessFile() {
    Array.from(
      this.querySelectorAll('.js_cht010SearchInput_resultChild')
    ).filter(label => {
      return label.querySelector('input[value^="attachment"]');
    }).forEach(label => {
      label.remove();
    });

    const html =
      `
      <span class="verAlignMid hp18 wp18 fw_bold mr5">
      <img class="btn_classicImg-display" src="../common/images/classic/icon_temp_file_2.png">
      <img class="btn_originalImg-display" src="../common/images/original/icon_attach.png">
      </span>
      <span class="fontoffset">
      ${msglist_cht010['cht.cht010.71']/*添付ファイルなし*/}
      </span>
      <input type="hidden" name="cht010SearchFilter" value="attachmentLess" ></input
      >`;
    this.#createLabel(html);
    this.#fixSearchInput();
  }

  #commitAllURL(select) {
    Array.from(
      this.querySelectorAll('.js_cht010SearchInput_resultChild')
    ).filter(label => {
      return (label.querySelector('input[value^="url"]'));
    }).forEach(label => {
      label.remove();
    });

    const html =
      `
      <span class="verAlignMid hp18 wp18 fw_bold mr5">
      <img class="" src="../common/images/original/icon_link.png">
      </span>
      <span class="fontoffset">
      ${msglist_cht010['cht.cht010.63']/*URLあり*/}
      </span>
      <input type="hidden" name="cht010SearchFilter" value="urlAll" ></input
      >`;
    this.#createLabel(html);
    this.#fixSearchInput();

  }
  #commitLessURL(select) {
    Array.from(
      this.querySelectorAll('.js_cht010SearchInput_resultChild')
    ).filter(label => {
      return label.querySelector('input[value^="url"]');
    }).forEach(label => {
      label.remove();
    });

    const html =
      `
      <span class="verAlignMid hp18 wp18 fw_bold mr5">
      <img class="" src="../common/images/original/icon_link.png">
      </span>
      <span class="fontoffset">
      ${msglist_cht010['cht.cht010.72']/*URLなし*/}
      </span>
      <input type="hidden" name="cht010SearchFilter" value="urlLess" ></input
      >`;
    this.#createLabel(html);
    this.#fixSearchInput();

  }

  #commitUser(user) {
    var sid = user.querySelector('.js_userData').getAttribute('data-sid');

    var content = user.children[0].cloneNode(true);
    content.classList.remove('mt3');
    content.classList.remove('mb3');
    let duplicate = false;

    const searchLabels = Array.from(
      this.querySelectorAll('.js_cht010SearchInput_result')
    );
    searchLabels.forEach((label) => {
      let input = label.querySelector('input[value^="user"]');
      if (input && input.value =="outMember" && sid == 'delete') {
        duplicate = true;
      }
      if (input && input.value ==`user:${sid}`) {
        duplicate = true;
      }
    });
    if (duplicate) {
      this.#fixSearchInput();
      return;
    }

    if (sid == 'delete') {

      content.insertAdjacentHTML(
        'beforeend',
        `<input type="hidden" name="cht010SearchFilter" value="outMember" ></input
         >`
      );
    } else {
      content.insertAdjacentHTML(
        'beforeend',
        `<input type="hidden" name="cht010SearchFilter" value="user:${sid}" ></input
         >`
      );

    }
    this.#createLabel(content.outerHTML);
    this.#fixSearchInput();

  }
  /** 検索フィルターラベルを作成する*/
  #createLabel(contentHtml) {

    const templateResultLabel =
      `
        <span class="baseLabel  verAlignMid cursor_p word_b-all pos_rel txt_l">
          ${contentHtml}
          <i class="ml10 js_txt_m fs_16 display_inline cl_webIcon cl_linkHoverChange icon-close cht010SearchInput_resultChildDelIcon"></i>
          </span>

      `;



    const label = document.createElement('span');
    label.classList.add('js_cht010SearchInput_resultChild')
    label.classList.add('cht010SearchInput_resultChild')
    label.insertAdjacentHTML(
      'beforeend',
      templateResultLabel
    )
    //検索フィルターラベルクリックイベント
    label.addEventListener('click', (e) => {
      e.currentTarget.remove();
      //削除して検索を更新
      this.#fixSearchInput();
    });

    this.querySelector('.js_cht010SearchInput_resultClear')
          .before(label);

  }
  //検索条件確定
  #fixSearchInput() {

    this.querySelector('.js_cht010SearchResult').setAttribute('data-search', 'false');
    this.#search();
  }
  #search(scrollFlg) {
    const chatList = document.querySelector('cht010-chat-list');
    chatList.querySelectorAll('chat-block').forEach((block) => {
      block.drawSearchHighlight();
    });

    $(this).find('.js_cht010SearchInput_error').remove();


    //  検索実行表示
    //キーワード検索をシリアライズ
    const searchLabels = Array.from(
      this.querySelectorAll('.js_cht010SearchInput_resultChild')
    );
    if (searchLabels.length == 0) {
      return;
    }
    this.seachFlg = true;

    let loading = this.querySelector('.js_cht010SearchInput_loading');
    loading.classList.remove('display_none');

    var formData = new FormData($('#js_chtForm').get(0));
    formData.delete('CMD');
    formData.append('CMD', 'search');
    if (scrollFlg) {
      formData.append('cht010MessageMaxMinSid',
        Array.from(this.querySelector('.js_cht010SearchResult_list').children)
          .pop().getAttribute('data-sid')
      );
    }

    const ajaxParam = Array.from(formData.entries())
                            .map(entry => {
                              return $.param(Object.fromEntries(new Map([entry])));
                              })
                              .join('&');
    $.ajax({
          async: true,
          url:  "../chat/cht010.do",
          type: "post",
          data: ajaxParam,
          processData: false, // dataをクエリ文字列にしない
      }).done(( data ) => {
        loading.classList.add('display_none');

        this.seachFlg = false;

        const input = this.querySelector('.js_cht010SearchInputRow_keyword');

        if (data['success']) {
          if (!scrollFlg) {
            const area = this.querySelector('.js_cht010SearchResult_list');
            area.innerHTML = '';
          }
        } else {
          this.querySelector('.js_cht010SearchResult').setAttribute('data-search', 'true');
          if (data['errorMsg']) {
            const errMsg = document.createElement('span');

            errMsg.classList.add('fw_b');
            errMsg.classList.add('cl_fontWarn');
            errMsg.classList.add('js_cht010SearchInput_error');
            errMsg.textContent = data['errorMsg'];

            this.querySelector('.js_cht010SearchInputRow').insertAdjacentElement('beforebegin', errMsg);

            if (!$(input).data('last_keyword')) {
              return;
            }
            //メッセージの入力エラーを復元
            input.value = $(input).data('last_keyword');

            const keywords =
            Array.from(
              new Set(//重複除去
                input.value.replaceAll("　", " ").split(' ')
              )
            )

            //該当キーワードのラベルを消去
            const searchLabels = Array.from(
              this.querySelectorAll('.js_cht010SearchInput_resultChild')
            );
            searchLabels.forEach((label) => {
              let input = label.querySelector('input[value^="keyword"]');
              if (input) {
                const key = input.value.substring(8);
                if (keywords.indexOf(key) >= 0) {
                  label.remove();
                }
              }
            });

            input.focus();

            return;
          }
          alert(msglist_cht010['cht.cht010.25']);
          return;
        }
        $(input).data('last_keyword', null);

        const result = this.querySelector('.js_cht010SearchResult');

        result.setAttribute('data-search', 'true');
        result.setAttribute('data-max', data['max']);

        const countRow = result.querySelector('.js_cht010SearchResult_count');

        countRow.textContent = this.#createCountMessate(data['max']);

        this.#appendSearchResult(data);
        if (!scrollFlg) {
          this.querySelector(".js_cht010SearchResult_list").scrollTop = 0;
        }

        let e = new Event(Cht010FilterInput.EvfixSearchInput);
        this.dispatchEvent(e);
      });

  }

  /** 検索件数表示の作成 */
  #createCountMessate(count) {
    if (count > 0) {
      const base = msglist_cht010['cht.cht010.65'].split('$');
      return `${base[0]}${count}${base[1]}`
    } else {
      return `${msglist_cht010['cht.cht010.82']}`
    }
  }

  #appendSearchResult (data) {
    const area = this.querySelector('.js_cht010SearchResult_list');
    const messageList = document.querySelector('cht010-chat-list');
    if (!data['messageList'] || data['messageList'].length == 0) {
      return;
    }
    data['messageList'].forEach((msg) => {
      const msgBlk = document
        .createElement('chat-block')
        .createSimpleElement(
          msg,
          data['searchDate'],
          this.#convertSearchMsg
        );

      msgBlk.classList.add('js_cht010SearchResult_child');
      msgBlk.classList.add('cht_onePost');
      msgBlk.classList.remove('pr15');
      msgBlk.classList.add('pr10');
      msgBlk.classList.add('cursor_p');
      msgBlk.setAttribute('data-sid', msg['messageSid']);
      area.appendChild(msgBlk);
      msgBlk.addEventListener('click', (event) => {
        messageList.jumpArround(event.currentTarget.getAttribute('data-sid'));
        area.querySelectorAll('.js_cht010SearchResult_child')
          .forEach((media) =>  {
            media.classList.remove('media_selected');
        });
        msgBlk.classList.add('media_selected');
      });
    });
  }
  /**
   * 検索結果メッセージに変換する
   * [内容]
   *  35文字以上の本文を検索キーワードを含む35文字と「3点リーダ」に置き換える
   */
  #convertSearchMsg(msg) {

    let text = msg;

    if (text.length <= 35) {
      return msg;
    }

    //フィルター一覧取得
    const filters = Array.from(document.querySelectorAll('input[name="cht010SearchFilter"]'));

    const keywords = filters
    .filter((input) => {
      return (input.value.startsWith('keyword:'));
    })
    .map((input) => {
      return input.value.substr(8);
    })
    .map((keyword) => {
      return keyword.replace(/([\/\.\*\+\^\|\[\]\(\)\?\$\{\}\\])/g, '\\$1');
    })
    .map((keyword) => {
      return '(' +
        keyword
        + ')';
    })
    .join("|");

    const regExp = new RegExp(`(${keywords})`, "g");

    if (keywords.length == 0) {
      return `${substringText(text, 0, 35)}...`;
    }
    const matches = [...text.matchAll(regExp)];
    if (matches.length == 0) {
      return `${substringText(text, 0, 35)}...`;
    }

    const match = matches[0];
    if (match.index + match[0].length > 35) {
      if (text.length - match.index < 35) {
        return `...${substringText(text, (text.length - 35), text.length)}`;
      } else {
        if (match.index > 5) {
          text = text.substring(getSubstringStartIndex(text, (match.index - 5)));
          if (text.length > 35) {
            return `...${substringText(text, 0, 35)}...`;
          } else {
            return `...${text}`;
          }
        } else {
          return `...${substringText(text, 0, 35)}...`;
        }
      }
    } else {
      return `${substringText(text, 0, 35)}...`;
    }
  }

}
customElements.define( 'cht010-filterinput', Cht010FilterInput );

/**
 * 検索開閉処理
 *
 */
function toggleSearchAreaVisible() {
  const head = $('.js_cht010SearchHeader');

  let execFlg = $(head).data('exec_ev');
  if (execFlg) {
    return;
  }
  $(head).data('exec_ev', true);

  if ($(head).children().hasClass("side_header-open")) {
      $(head).children().removeClass("side_header-open");
      $(head).children().addClass("side_header-close");

  } else {
      $(head).children().removeClass("side_header-close");
      $(head).children().addClass("side_header-open");
  }
  //検索ペイン
  let pane = $('cht010-filterinput')[0];
  if ($(pane).is('.cht010Search-flex')) {
    $(pane).animate( {height: 'toggle', opacity: 'toggle'}, 'middle', () =>{
      //閉じた後のイベント
      pane.classList.remove('cht010Search-flex');
      $(head).data('exec_ev', false);
    } );
  } else {
    pane.classList.add('cht010Search-flex');
    $(pane).animate( {height: 'toggle', opacity: 'toggle' }, 'middle', () => {
      //開いた後のイベント
      $(head).data('exec_ev', false);
    });
  }
}

/**
 * ユーザ選択入力 WEBコンポーネント
 * div.js_cht010MemberTemplate 内に設置した送信者情報を使用して
 * ユーザ選択を行う
 *
 * 選択結果はselectイベントでキャッチできる
 *
 *
 * @class Cht010SenderSelect
 * @extends {HTMLElement}
 */
class Cht010SenderSelect extends HTMLElement {
  static EnumImgDispType = {
    usersearch:'usersearch',
    mention:'mention',
  };

  constructor() {
    super();
    this.blankFlg = true;
    this.selectOnFlg = false;
    this.mode = Cht010SenderSelect.EnumImgDispType.usersearch;
  }

  static get observedAttributes() {
      return ['name', 'class', 'placeholder', 'mode'];
  }

  attributeChangedCallback(property, oldValue, newValue) {

    if (oldValue === newValue) {
        return;
    }
    this[ property ] = newValue;
  }

  connectedCallback() {
    this.innerHTML = `
    <input type="text" class="inputcomponent bor1 border_radius3 borC_deep js_cht010SearchInputSender_input w100" autocomplete="off" name="${this.getAttribute('name')}" placeholder="${this.getAttribute('placeholder')}"></input>
    <div class="js_cht010SearchInputSender_selectPane cht010SearchInput_selectPane cl_fontBody bgC_tableCell customScrollBar mt5 display_none"></div>
    </div>

    <!-- ユーザリスト子要素テンプレート -->
    <template class="js_cht010SearchInputSender_selectUser">
        <a class="js_cht010SearchInput_selectChild display_flex pl5 pr5 bgC_selectable bgC_selectable cht010SearchInput_selectChild" data-modeselect="commitUser">
            <div class="verAlignMid mt3 mb3"></div>
        </a>
    </template>
    `;
    const input = this.querySelector('.js_cht010SearchInputSender_input');
    if (this.mode == Cht010SenderSelect.EnumImgDispType.usersearch) {
      input.addEventListener('focus', () => {
        this.#paneDraw();
      });
      input.addEventListener('blur', () => {
        if (!this.selectOnFlg) {
          const pane = this.querySelector('.js_cht010SearchInputSender_selectPane');
          pane.classList.add('display_none');
        }
      });

      this.addEventListener("mousedown", () => {
        const pane = this.querySelector('.js_cht010SearchInputSender_selectPane');
        if ($(pane).children(":not(.js_noTarget):not(.display_none)").length == 0) {
          this.selectOnFlg = false;
        } else {
          this.selectOnFlg = true;
        }
      });

      this.addEventListener("click", (e) => {
        this.selectOnFlg = false;
      });
    }

    if (this.mode == Cht010SenderSelect.EnumImgDispType.mention) {
      this.#paneDraw();
    }
    input.addEventListener('input', () => {
      this.#paneDraw();
    });



  }

  paneDraw() {
    this.#paneDraw();
  }

  /** 選択欄更新処理 */
  #paneDraw(reset) {
    const pane = this.querySelector('.js_cht010SearchInputSender_selectPane');
    const input = this.querySelector('.js_cht010SearchInputSender_input');

    this.#paneQueryUser();

    var topSelDraw = false;
    Array.from(pane.children).forEach((select) => {
        select.classList.remove('border_radius-top');
        select.classList.remove('border_radius-bottom');
        select.classList.remove('pb5');
        if (topSelDraw == false
          && select.classList
                  .contains('display_none') == false) {
          topSelDraw = true;
          select.classList.add('pt5');
          select.classList.add('border_radius-top');
        }
    });
    pane.classList.remove('display_none');


    const lastChild = Array.from(pane.children).slice(-1)[0];
    if (lastChild) {
        lastChild.classList.add('pb5');
        lastChild.classList.add('border_radius-bottom');
    }
  }

  #paneQueryUser() {
      const pane = this.querySelector('.js_cht010SearchInputSender_selectPane');
      const input = this.querySelector('.js_cht010SearchInputSender_input');

      const nonDispSids = [];

      if (this.mode == Cht010SenderSelect.EnumImgDispType.mention) {
        document.querySelectorAll('input[name="cht010MentionUserSids"]').forEach((selected) => {
          nonDispSids.push(selected.value);
        });
      } else {
        document.querySelectorAll('input[name="cht010SearchFilter"][value^="user:"]').forEach((selected) => {
          nonDispSids.push(selected.value.substring(5));
        });

      }

      pane.querySelectorAll('[data-modeselect="commitUser"]')
          .forEach((user) => {
          user.parentElement.remove();
      });

      var userList = Array.from(
          document.querySelector('.js_cht010MemberTemplate').children
      ).map((user) => user.querySelector('template'));

      const userTemplate = this.querySelector('.js_cht010SearchInputSender_selectUser');


      if (input.value.length > 0) {
          userList = userList.filter((child) => {
              return (child.title.indexOf(input.value) >= 0);
          });
      }
      let mode = this.mode;
      //メンション選択かつ、選択が何もされていない場合
      if (mode == Cht010SenderSelect.EnumImgDispType.mention) {
        let dispFlg = true;
        if (input.value.length > 0 || $(`input[name="cht010MentionUserSids"]`).length > 0) {
          dispFlg = false;
        }
        let allUserElement = document.createElement("span");
        allUserElement.innerHTML = this.#createMentionAll(dispFlg);
        allUserElement = allUserElement.firstElementChild;
        allUserElement.addEventListener("click", (e) => {
          addMention(-1);
          this.#paneDraw();
        });
        $(pane).append(allUserElement);
      }

      userList
        .forEach(async (user) => {
          const child = userTemplate.content.cloneNode(true);
          const div = child.querySelector('div');
          div.appendChild(user.content.cloneNode(true));
          const span = document.createElement("span");
          span.appendChild(child);

          if (nonDispSids.indexOf(`${$(div).find(".js_userData").data("sid")}`) >= 0) {
              span.classList.add('display_none');
          } else if (this.mode == Cht010SenderSelect.EnumImgDispType.mention && nonDispSids.includes("-1")) {
            span.classList.add('display_none');
          }
          pane.appendChild(span);

          span.addEventListener("click", (e) => {
            let selectEv = new Event("select", { bubbles: true, cancelable: false });
            div.parentElement.dispatchEvent(selectEv);

            const pane = this.querySelector('.js_cht010SearchInputSender_selectPane');
            //メンションは選択で連続可能
            if (mode == Cht010SenderSelect.EnumImgDispType.usersearch) {
              pane.classList.add('display_none');
            } else if (mode == Cht010SenderSelect.EnumImgDispType.mention) {
              addMention($(span).find(".js_userData").data("sid"));
              this.#paneDraw();
            }
          });
      });
      //ユーザ検索選択で未入力時は「所属外ユーザを追加」
      if (input.value.length == 0
        && this.mode == Cht010SenderSelect.EnumImgDispType.usersearch
        && document.forms[1].cht010SelectKbn.value != 1
        ) {
          const child = userTemplate.content.cloneNode(true);
          const div = child.querySelector('div');
          div.insertAdjacentHTML(
            'beforeend',
            `
            <span class="js_userData" data-sid="delete"></span>
            <span class="verAlignMid hp18 wp18 fw_bold mr5">
              <img class="btn_classicImg-display btnIcon-size" src="../common/images/classic/icon_user.png" alt="${msglist_cht010['cmn.user']/*ユーザ */}">
              <img class="btn_originalImg-display" src="../common/images/original/icon_user.png" alt="cmn.user">
            </span>
            <span class="fontoffset">${msglist_cht010['cht.cht010.81']/*所属外ユーザ */}</span>
            `

          );
          const span = document.createElement("span");
          span.appendChild(child);

          if (document.querySelector('input[name="cht010SearchFilter"][value="outMember"]')) {
            span.classList.add('display_none');
          }
          pane.appendChild(span);

          span.addEventListener("click", (e) => {
            let selectEv = new Event("select", { bubbles: true, cancelable: false });
            div.parentElement.dispatchEvent(selectEv);

            const pane = this.querySelector('.js_cht010SearchInputSender_selectPane');
            pane.classList.add('display_none');
          });
      }

      $(pane).find(".js_noTarget").remove();
      if ($(pane).children(":not(.display_none)").length == 0) {
        let noTarget = `
          <span class="js_noTarget cl_fontMiddle pl5">
            ${msglist_cht010["cht.cht010.84"]}
          </span>
        `;
        $(pane).prepend(noTarget);
      }
  }

  #createMentionAll(dispFlg) {

    let dispClass = "";
    if (!dispFlg) {
      dispClass = "display_none";
    }
    let insertHtml = `
      <span class="${dispClass}">
        <a class="js_cht010SearchInput_selectChild display_flex pl5 pr5 bgC_selectable bgC_selectable cht010SearchInput_selectChild" data-modeselect="commitUser">
          <div class="verAlignMid mt3 mb3">
            <span class="js_userData" data-sid="-1"></span>
            <span class="verAlignMid hp18 wp18 fw_bold mr5">
              <img class="btn_classicImg-display userIcon_size-w18" src="../common/images/classic/icon_user.png">
              <img class="btn_originalImg-display userIcon_size-w18" src="../common/images/original/icon_user.png">
            </span>
            <span class="fontoffset">${msglist_cht010["cht.cht010.80"]}</span>
          </div>
        </a>
      </span>
    `;

    return insertHtml;
  }


}
customElements.define( 'cht010-senderselect', Cht010SenderSelect );

// 投稿のピンどめ状態変更
function changeMessagePin(msgSid, onFlg) {
  var paramStr = 'CMD=delMessagePin';
  if (onFlg) {
    paramStr = 'CMD=addMessagePin';
  }
  paramStr = paramStr + '&cht010MessageSid=' + msgSid;
  paramStr = paramStr + '&cht010SelectPartner=' + $("input[name='cht010SelectPartner']").val();
  paramStr = paramStr + '&cht010SelectKbn=' + $("input[name='cht010SelectKbn']").val();
  paramStr = setToken(paramStr);

  $.ajax({
    async: true,
    url:  "../chat/cht010.do",
    type: "post",
    data: paramStr
  }).done(function( data ) {
    if (data["success"]) {
      if (onFlg) {
        //アイコン切り替え
        $('#messagePinOff_' + msgSid).addClass("display_n");
        $('#messagePinOn_' + msgSid).removeClass("display_n");
        //ピンどめ一覧再読み込み
        loadPinList(true, 0, $('.js_pinMessage ').length + 1);
      } else {
        //アイコン切り替え
        $('#messagePinOn_' + msgSid).addClass("display_n");
        $('#messagePinOff_' + msgSid).removeClass("display_n");
        //ピンどめ一覧から削除
        $('#messagePin_' + msgSid).remove();
        if ($('.js_pinMessageList ').children().length == 0) {
          $('.js_pinMessageList').append("<div class='mb5 fs_13'>" + msglist_cht010['cht.cht010.74'] + "</div>");
        }
      }
    } else {
      alert(msglist_cht010['cht.cht010.75']);
    }
  }).fail(function(data){
    alert(msglist_cht010['cht.cht010.75']);
  });
}

//ピンどめ一覧取得
async function loadPinList(resetFlg, offset, limit, animate=true) {
  return new Promise((resolve) => {
    var paramStr = 'CMD=getPinList';
    paramStr = paramStr + '&cht010SelectPartner=' + $("input[name='cht010SelectPartner']").val();
    paramStr = paramStr + '&cht010SelectKbn=' + $("input[name='cht010SelectKbn']").val();
    paramStr = paramStr + '&cht010PinOffset=' + offset;
    if (limit != null) {
      paramStr = paramStr + '&cht010PinLimit=' + limit;
    }
    $.ajax({
      async: true,
      url:"../chat/cht010.do",
      type: "post",
      data:paramStr
    }).done(function(data) {
      if (data["success"]) {
        if (resetFlg) {
          $('.js_pinMessageList').empty();
          if (animate) {
            $(".js_pinMessageList").animate({'scrollTop': 0}, 'fast',function(){
            });
          } else {
            $(".js_pinMessageList").animate({'scrollTop': 0}, 0,function(){
            });
          }
          if (data.messageList == null) {
            $('.js_pinMessageList').append("<div class='mb5 fs_13'>" + msglist_cht010['cht.cht010.74'] + "</div>");
          }
        }
        if (data.messageList != null) {
          let now = new Date();
          for (var messageMdl of data.messageList) {
            //メッセージ表示簡易版を生成
            const msgBlk = document
              .createElement('chat-block')
              .createSimpleElement(
                messageMdl,
                now.toLocaleDateString(
                  "ja-JP",
                  {year: "numeric",month: "2-digit", day: "2-digit"}
                )
              );
            //メッセージ表示簡易版に並び替え用のつまみを追加
            msgBlk.insertAdjacentHTML(
              'afterbegin',
              '<div class="pinMessageSortHandle js_pinMessageSortHandle mr10 display_tbl_c"></div>'
            )
            //ピン留め親要素の作成
            let pinMessage = $(`
              <div id="messagePin_${messageMdl["messageSid"]}" data-sid="${messageMdl["messageSid"]}" class="cht_pinMessage js_pinMessage bor2 cursor_p pos_rel mb5 w100 borC_weak border_radius outC_deep">
              </div>
            `);

            //ピン留め親要素にメッセージ表示を追加し、クリックイベントを設定
            $(msgBlk).prependTo(pinMessage)
              .on('click', (event) => {
                const messageList = document.querySelector('cht010-chat-list');
                messageList.jumpArround(event.currentTarget.parentElement.getAttribute('data-sid'));
              });

            //ピン留め親要素に削除ボタンを追加し、クリックイベントを設定
            $(`
                <div class="pinMessageDeleteArea">
                  <img class="messagePinDelete js_messagePinDelete cursor_p btn_classicImg-display"  src="../common/images/classic/icon_delete_15.png">
                  <img class="messagePinDelete js_messagePinDelete cursor_p btn_originalImg-display"  src="../common/images/original/icon_delete.png">
                </div>
              `).prependTo(pinMessage)
              .on('click', (event) => {
                changeMessagePin(event.currentTarget.parentElement.getAttribute('data-sid'), false);
              });

            $('.js_pinMessageList').append(pinMessage);
          }
          sortPinSetting();
        }
        resolve(true);
      } else {
        alert(msglist_cht010['cht.cht010.76']);
        resolve(false);
      }
      doAddPinMessageFlg = false;
    }).fail(function(data){
      alert(msglist_cht010['cht.cht010.76']);
      doAddPinMessageFlg = false;
      resolve(false);
    });
  });
}

function pinMessageHeaderOpen() {
  //ピン留め一覧ペイン
  let pane = $('.js_cht010MessagePinArea')[0];

  let execFlg = $(pane).data('exec_ev');
  if (execFlg) {
    return;
  }
  $(pane).data('exec_ev', true);

  if ($('.js_cht010PinListHeader').children().hasClass("side_header-open")) {
    $('.js_cht010PinListHeader').children().removeClass("side_header-open");
    $('.js_cht010PinListHeader').children().addClass("side_header-close");
  } else {
    $('.js_cht010PinListHeader').children().removeClass("side_header-close");
    $('.js_cht010PinListHeader').children().addClass("side_header-open");
  }
  if ($(pane).is('.cht010MessagePinArea-flex')) {
    $(pane).animate( {height: 'toggle', opacity: 'toggle' }, 'middle', () => {
      pane.classList.remove('cht010MessagePinArea-flex');
      $(pane).data('exec_ev', false);
    });
  } else {
    pane.classList.add('cht010MessagePinArea-flex');
    $(pane).animate( {height: 'toggle', opacity: 'toggle' }, 'middle', () => {
      $(pane).data('exec_ev', false);
    });
  }
}



var escStampObjList__;
var beforeSid__;
//ピンどめ一覧 並び替え設定
function sortPinSetting() {
  var el = document.getElementById('pinMessageList');
  var sortable = new Sortable(el, {
    animation: 150,
    ghostClass: 'out3',
    preventOnFilter: false,
    handle: '.js_pinMessageSortHandle',
    onStart: onStartEvent,
    onEnd: onEndEvent,
    onSort: onSortEvent
  });
  function onStartEvent(e) {
    escPinObjList__ = null;
    beforeSid__ = null;
    //並び替え前の並び順を退避
    escPinObjList__ = $('.js_pinMessage');
    //並び替えを行う要素のスタンプSID取得
    beforeSid__ = e.item.dataset.sid;
    //ホバーイベントをドラッグ中だけ無効化する
    $('.js_pinMessageSortHandle').addClass("bgC_none");
    $('.js_messagePinDelete').addClass("display_n");
  }
  function onEndEvent(e) {
    //ホバーイベントを元に戻す
    $('.js_pinMessageSortHandle').removeClass("bgC_none");
    $('.js_messagePinDelete').removeClass("display_n");
  }
  function onSortEvent(e) {
    //変更後の並び順一覧
    var items = e.target.querySelectorAll(".js_pinMessage");
    for(let i=0; i<items.length; i++){
      if (beforeSid__ == items[i].dataset.sid) {
        var afterSid = escPinObjList__.eq(i).data('sid');
        doSortPin(beforeSid__, afterSid);
      }
    }
  }
}

//ピンどめ投稿 並び替え処理
function doSortPin(beforeSid, afterSid) {
  var paramStr = 'CMD=sortPinMessage'
  paramStr = paramStr + '&cht010SelectPartner=' + $("input[name='cht010SelectPartner']").val();
  paramStr = paramStr + '&cht010SelectKbn=' + $("input[name='cht010SelectKbn']").val();
  paramStr = paramStr + '&cht010SortPinBeforeSid=' + beforeSid;
  paramStr = paramStr + '&cht010SortPinAfterSid=' + afterSid;
  $.ajax({
    async: true,
    url:"../chat/cht010.do",
    type: "post",
    data:paramStr
  }).done(async function(data) {
    if (data["success"]) {
      let scP = $(".js_pinMessageList").scrollTop();

      await loadPinList(true, 0, $('.js_pinMessage ').length, false);

      $(".js_pinMessageList").scrollTop(scP);


    } else {
      alert(msglist_cht010['cht.cht010.77']);
    }
  }).fail(function(data){
    alert(msglist_cht010['cht.cht010.77']);
  });
}

//引数の文字列から開始インデックスの適切な位置を返す。
//絵文字は1文字換算する。
function getSubstringStartIndex(text, start) {
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  var segmentList = [...segmenter.segment(text)];
  var ret = start;
  for (var i = 0; i < segmentList.length; i++) {
    if (segmentList[i].index >= start) {
      start = segmentList[i].index;
      break;
    }
  }
  return start;
}

//引数の文字列から開始インデックス~終了インデックス間の文字列を抽出する。
//絵文字は1文字換算する。
function substringText(text, start, end) {
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  var segmentList = [...segmenter.segment(text)];
  var ret = "";
  var startIndex = start;
  var endIndex = end;

  //適切な開始位置を取得する。(絵文字を構成する文字列の途中から始まらないようにする)
  for (var i = 0; i < segmentList.length; i++) {
    if (segmentList[i].index >= startIndex) {
      startIndex = i;
      break;
    }
  }
  if (startIndex + 35 > endIndex) {
    endIndex = startIndex + 35;
  }

  for (var i = startIndex; i < endIndex; i++) {
    if (segmentList[i] == null || segmentList[i].index >= end) {
      break;
    }
    ret += segmentList[i].segment;
  }
  return ret;
}
