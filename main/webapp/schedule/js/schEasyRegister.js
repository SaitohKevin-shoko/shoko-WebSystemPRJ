var errMsgFlg = false;

/* 簡易ダイアログ 午前/午後リンク */
function clockChange(frHr, frMn, toHr, toMn, name, classId) {
  var frTime = frHr.toString().padStart(2, '0') + ":" + frMn.toString().padStart(2, '0');
  var toTime = toHr.toString().padStart(2, '0') + ":" + toMn.toString().padStart(2, '0');
  $("#fr_clock" + classId).val(frTime);
  $("#to_clock" + classId).val(toTime);
  dupCheck(name, classId);
}

/* 簡易ダイアログ 時間指定無しリンク */
function clockNoTime(name, classId) {
  if ($("#num_seigyo" + classId).prop("checked")) {
    $("#fr_clock" + classId).prop("disabled", true);
    $("#to_clock" + classId).prop("disabled", true);
  } else {
    $("#fr_clock" + classId).prop("disabled", false);
    $("#to_clock" + classId).prop("disabled", false);
  }
  dupCheck(name, classId);
}

function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

/* 簡易ダイアログ 登録ボタン */
function dialogOk(gamenId, classId, obj) {
    if (obj.attr('data-clicked') == "true") {
        return;
    }
    obj.attr({'data-clicked':'true'});
    errMsgFlg = false;
    $('.js_errorArea').remove();
    $(".js_schForm input[name='CMD']").val("registerChk");
    var paramStr = getFormData($("#kaniPopup" + classId).parents(".js_schForm"));

    var url = "";
    if (gamenId.indexOf("main") > 0) {
        url = "../schedule/schmain.do";
    } else if (gamenId.indexOf("ptl") > 0) {
        url = "../schedule/schptl010.do";
    } else {
        url = "../schedule/"+gamenId.substr(0, 6)+".do";
    }
    $.ajax({
        async: true,
        url:  url,
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["validateError"]) {
            obj.attr({'data-clicked':'false'});
            $('.js_easyErr').append("<span class=\"js_errorArea cl_fontWarn\">"+data["errors"]+"</span>");
            return;
        }
        if (data["success"]) {
            $('.addScheduleDialog').addClass('display_n');
            if (gamenId.indexOf("main") > 0) {
                $(".js_schForm input[name='ptlSid']").val($('input:hidden[name=ptlMainSid]').val());
            } else if (gamenId.indexOf("ptl") > 0) {
                $(".js_schForm input[name='ptlPortalSid']").val($('input:hidden[name=ptlMainSid]').val());
            }
            if (!$("#kaniPopup" + classId).parents('.js_schForm input[name="org.apache.struts.taglib.html.TOKEN"]')[0]) {
                $('<input>', {
                    type: 'hidden',
                    name: 'org.apache.struts.taglib.html.TOKEN'
                }).appendTo('.js_schForm');
            }
            $('input[name="org.apache.struts.taglib.html.TOKEN"]').val(data["token"]);
            $(".js_schForm input[name='CMD']").val('easyRegister');
            $("#kaniPopup" + classId).parents(".js_schForm").submit();
        }
    });
}

/* 重複チェック */
function dupCheck(gamenId, classId) {
    if (!$("#num_seigyo" + classId).prop("checked")) {
      $(".js_schForm input[name='CMD']").val("registerDupChk");
      var paramStr = getFormData($("#kaniPopup" + classId).parents(".js_schForm"));

      var url = "";
      if (gamenId.indexOf("main") > 0) {
          url = "../schedule/schmain.do";
      } else if (gamenId.indexOf("ptl") > 0) {
          /* 重複警告は発生しない */
      } else {
          url = "../schedule/"+gamenId.substr(0, 6)+".do";
      }
      if (url != "") {
          $.ajax({
              async: true,
              url:  url,
              type: "post",
              data: paramStr
          }).done(function( data ) {
              if (data["warning"]){
                  if (!errMsgFlg) {
                      $('.js_errorArea').remove();
                      $('.js_easyErr').append("<span class=\"js_errorArea\">この時間に登録を行った場合、スケジュールが重複します。</span>");
                      errMsgFlg = true;
                  }
                  return;
              } else {
                  errMsgFlg = false;
                  $('.js_errorArea').remove();
              }
          });
      }
    } else {
      errMsgFlg = false;
      $('.js_errorArea').remove();
    }
}

function setEasyRegisterDay(fr, to, target) {
    
    /* 選択した日付がもう片方の日付を上回った場合、同じ値で更新する。 */
    if (fr.val().length != 10 || to.val().length != 10) {
        return;
    }
    var frYear = fr.val().split("/")[0];
    var frMonth = fr.val().split("/")[1];
    var frDay = fr.val().split("/")[2];
    var toYear = to.val().split("/")[0];
    var toMonth = to.val().split("/")[1];
    var toDay = to.val().split("/")[2];
    if (frYear > toYear
           || (frYear == toYear && frMonth > toMonth)
           || (frYear == toYear && frMonth == toMonth && frDay > toDay)) {
        if (target == "fr") {
            to.val(fr.val());
        } else if (target == "to") {
            fr.val(to.val());
        }
    }
}

$(function(){
  /* 開始 カレンダーアイコンクリック */
  $('.iconKikanStart').on('click', function(e) {
    $(".easyFrDate").focus();
  });

  /* 終了 カレンダーアイコンクリック */
  $('.iconKikanFinish').on('click', function(e) {
    $(".easyToDate").focus();
  });

  $('.easyFrDate').on('input', function() {
    if ($(this).val().length == 10
        && ($(this).val().match( /\//g ) || []).length == 2
        && $(this).val().split("/")[0].length == 4
        && $(this).val().split("/")[1].length == 2
        && $(this).val().split("/")[2].length == 2
        && $(this).val().split("/")[0].match(/^[0-9]+$/)
        && $(this).val().split("/")[1].match(/^[0-9]+$/)
        && $(this).val().split("/")[2].match(/^[0-9]+$/)) {
      /* 入力値が半角英数4文字 + "/" + 半角英数2文字 + "/" + 半角英数2文字 の時、重複チェックを行う。 */
      dupCheck($(this).parent().parent().data('name'), $(this).parent().parent().data('class'));
    }
  });

  $.each($('.easyFrDate'), function() {
      var targetInput = $(this);
      targetInput.datepicker({
          changeYear: true,
          showAnim: 'blind',
          changeMonth: true,
          numberOfMonths: 1,
          showCurrentAtPos: 0,
          showButtonPanel: true,
          dateFormat:'yy/mm/dd',
          yearRange: "-5:+5",
          onSelect: function() {
              setEasyRegisterDay(targetInput, $('#to_date' + targetInput.parent().attr("id").substring(7) + ' input:first'), "fr");
              dupCheck(targetInput.parent().parent().data('name'), targetInput.parent().parent().data('class'));
          }
      });
  });
  $('.easyToDate').on('input', function() {
    if ($(this).val().length == 10
        && ($(this).val().match( /\//g ) || []).length == 2
        && $(this).val().split("/")[0].length == 4
        && $(this).val().split("/")[1].length == 2
        && $(this).val().split("/")[2].length == 2
        && $(this).val().split("/")[0].match(/^[0-9]+$/)
        && $(this).val().split("/")[1].match(/^[0-9]+$/)
        && $(this).val().split("/")[2].match(/^[0-9]+$/)) {
      /* 入力値が半角英数4文字 + "/" + 半角英数2文字 + "/" + 半角英数2文字 の時、重複チェックを行う。 */
      dupCheck($(this).parent().parent().data('name'), $(this).parent().parent().data('class'));
    }
  });
  $.each($('.easyToDate'), function() {
      var targetInput = $(this);
      targetInput.datepicker({
          changeYear: true,
          showAnim: 'blind',
          changeMonth: true,
          numberOfMonths: 1,
          showCurrentAtPos: 0,
          showButtonPanel: true,
          dateFormat:'yy/mm/dd',
          onSelect: function() {
              setEasyRegisterDay($('#fr_date' + targetInput.parent().attr("id").substring(7) + ' input:first'), targetInput, "to")
              dupCheck(targetInput.parent().parent().data('name'), targetInput.parent().parent().data('class'));;
          }
      });
  });
  $.datepicker._gotoToday = function(id) {
    var target = $(id);
    var inst = this._getInst(target[0]);
    var date = new Date();
    this._setDate(inst,date);
    this._hideDatepicker();
    setEasyRegisterDay($('#fr_date' + target.parent().attr("id").substring(7) + ' input:first'), target, "to")
    dupCheck(target.parent().parent().data('name'), target.parent().parent().data('class'));;
  }
  var old_fn = $.datepicker._updateDatepicker;
  $.datepicker._updateDatepicker = function(inst) {
    old_fn.call(this, inst);
    var buttonPane = $(this).datepicker("widget").find(".ui-datepicker-buttonpane");
    var buttonHtml = "<button type='button' class='ui-datepicker-clean ui-state-default ui-priority-primary ui-corner-all'>クリア</button>";
    $(buttonHtml).appendTo(buttonPane).click(
      function(e) {
        $.datepicker._clearDate(inst.input);
    });
  }
  $('#ui-datepicker-div').hide();

    $(".js_easyRegister").off("click");
    $('.js_easyRegister').on('click', function(e) {
    var classId = $(this).parents('.js_schForm').find(".js_classId").text();
    $('.addScheduleDialog').addClass('display_n');
    easyRegisterDisp = true;

    //通常は表示位置を右下向き
    var thisDialog = $(this).parents('.js_schForm').find(".addScheduleDialog");
    //吹き出しの角部分調整
    var topPos = ($(this).offset().top + 40);
    var leftPos = ($(this).offset().left - 23);

    var wCheck = false;
    //吹き出しが画面右側にはみ出ていないかどうか
    if (leftPos + 500 > $('.pageTitle').width()) {
      //はみ出てたら表示位置を左向きにする
      leftPos = leftPos - 425;
      wCheck = true;
    }
    var hCheck = false;
    //吹き出しが画面下側にはみ出ていないかどうか
    if ((window.innerHeight - topPos) < 350) {
      //吹き出しがcmn003にはみ出ていないかどうか（はみ出ていた場合は下向きに出す）
      if (((topPos - $('.pageTitle').offset().top)) > 380) {
        //cmn003にはみ出ていなかったら上向きにする
        hCheck = true;
        topPos = topPos - 410;
      }
    }

    $('#kaniPopup' + classId).removeClass("bubble-leftTop");
    $('#kaniPopup' + classId).removeClass("bubble-rightTop");
    $('#kaniPopup' + classId).removeClass("bubble-rightBottom");
    $('#kaniPopup' + classId).removeClass("bubble-leftBottom");
    if (wCheck && hCheck) {
      $('#kaniPopup' + classId).addClass("bubble-rightBottom");
    } else if (wCheck && !hCheck) {
      $('#kaniPopup' + classId).addClass("bubble-rightTop");
    } else if (!wCheck && hCheck) {
      $('#kaniPopup' + classId).addClass("bubble-leftBottom");
    } else {
      $('#kaniPopup' + classId).addClass("bubble-leftTop");
    }
    thisDialog.css('top', topPos);
    thisDialog.css('left', leftPos);
    popupDisp = true;

    /* タイトルカラー選択値設定 */
    for (var i = 1; i <= 10; i++) {
      var initColor = $("input[name='easyRegister.initTitleColor']").val();
      if (initColor == i) {
        var colorLength = $('#kaniPopup' + classId).find("input[name='easyRegister.titleColor']").length;
        if (colorLength == 5 && initColor >= 6){
            $("#bg_color" + 1 + classId).prop("checked", true);
        } else {
            $("#bg_color" + i + classId).prop("checked", true);
        }
        break;
      }
    }
    /* ラジオ選択値設定 */
    var pubUsrKbn = [0, 1, 2, 5];
    var pubGrpKbn = [0, 1];
    if ($(this).children('.js_schUsrKbn').text() == 0) {
      /* ユーザ */
      if ($("input[name='easyRegister.initPubKbn']").val() == 3
             || $("input[name='easyRegister.initPubKbn']").val() == 4) {
        $("#public" + pubUsrKbn[0] + classId).prop("checked", true);
      } else {
        for (var i = 0; i < pubUsrKbn.length; i++) {
          if ($("input[name='easyRegister.initPubKbn']").val() == pubUsrKbn[i]) {
            $("#public" + pubUsrKbn[i] + classId).prop("checked", true);
            break;
          }
        }
      }
    } else {
      /* グループ */
      if ($("input[name='easyRegister.initPubKbn']").val() == 2
             || $("input[name='easyRegister.initPubKbn']").val() == 3
             || $("input[name='easyRegister.initPubKbn']").val() == 4
             || $("input[name='easyRegister.initPubKbn']").val() == 5) {
        $("#public" + pubGrpKbn[0] + classId).prop("checked", true);
      } else {
        for (var i = 0; i < pubGrpKbn.length; i++) {
          if ($("input[name='easyRegister.initPubKbn']").val() == pubGrpKbn[i]) {
            $("#public" + pubGrpKbn[i] + classId).prop("checked", true);
            break;
          }
        }
      }
    }
    /* 初期化 */
    $('.js_errorArea').remove();
    $('.easyRegister-textarea').val("");
    $('#selectionSearchArea').val("");
    $("input[name='easyRegister.frTime']").val($("input[name='easyRegister.initFrTime']").val());
    $("input[name='easyRegister.toTime']").val($("input[name='easyRegister.initToTime']").val());
    $("input[name='easyRegister.frTime']").prop("disabled", false);
    $("input[name='easyRegister.toTime']").prop("disabled", false);
    $(".js_easyTimeFree").prop("checked", false);
    $('#public0' + classId).removeClass("display_n");
    $('#public0_label' + classId).removeClass("display_n");
    $('#public1' + classId).removeClass("display_n");
    $('#public1_label' + classId).removeClass("display_n");
    $('#public2' + classId).removeClass("display_n");
    $('#public2_label' + classId).removeClass("display_n");
    $('#public5' + classId).removeClass("display_n");
    $('#public5_label' + classId).removeClass("display_n");
    if ($(this).children('.js_schUsrKbn').text() == 1) {
      $('#public2' + classId).addClass("display_n");
      $('#public2_label' + classId).addClass("display_n");
      $('#public5' + classId).addClass("display_n");
      $('#public5_label' + classId).addClass("display_n");
    }

    var selectDate = $(this).children('.js_schDate').text();
    var selectDateDisp = selectDate.substr(0, 4) + "/" + selectDate.substr(4, 2) + "/" + selectDate.substr(6, 2);
    $('.easyFrDate').val(selectDateDisp);
    $('.easyToDate').val(selectDateDisp);
    $('input[name="selectDate"]').val(selectDate);
    $('input[name="selectUser"]').val($(this).children('.js_schUsrSid').text());
    $('input[name="selectKbn"]').val($(this).children('.js_schUsrKbn').text());
    thisDialog.removeClass('display_n');
  });

  var popupDisp = false;
  // クリックイベント全てに対しての処理
  $(document).on('mousedown touchstart', function(event) {
    // 表示したポップアップ以外の部分をクリックしたとき
    if (!($(event.target).closest('.addScheduleDialog').length
      || $(event.target).closest('.ui-datepicker').length
      || $(event.target).closest('.clockpicker-popover').length
      || $(event.target).closest('.ui-datepicker-header').length)
      && popupDisp) {
        $('.addScheduleDialog').addClass('display_n');
        popupDisp = false;
        easyRegisterDisp = false;
    }
  });
});