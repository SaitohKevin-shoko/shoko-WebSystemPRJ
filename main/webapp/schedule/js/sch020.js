var easyRegisterDisp = false;
$(function() {
    //スケジュールヘッダ位置調節
    function topFrameResize() {
        var paddingHeight = $('.js_sch_help_frame').height()
        +  $('.js_sch_top_frame').height();
        $('.js_top_frame_space').height(paddingHeight);
    }
    topFrameResize();

});
function buttonPush(cmd, autoFlg){
    if (cmd == "reload") {
        if (easyRegisterDisp && autoFlg) {
            clearTimeout(reloadEvt);
            var reloadinterval = document.forms[0].sch020Reload.value;
            reloadEvt = setTimeout("buttonPush('reload')", reloadinterval);
            return false;
        }
    }
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function moveDailySchedule(cmd, ymd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].sch010SelectUsrSid.value=uid;
    document.forms[0].sch010SelectUsrKbn.value=ukbn;
    document.forms[0].sch010SelectDate.value=ymd;
    document.forms[0].sch010DspDate.value=ymd;
    document.forms[0].submit();
    return false;
}

function addSchedule(cmd, ymd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].sch010SelectDate.value=ymd;
    document.forms[0].sch010SelectUsrSid.value=uid;
    document.forms[0].sch010SelectUsrKbn.value=ukbn;
    document.forms[0].sch010SchSid.value='';
    document.forms[0].submit();
    return false;
}

function editSchedule(cmd, ymd, sid, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].sch010SelectDate.value=ymd;
    document.forms[0].sch010SelectUsrSid.value=uid;
    document.forms[0].sch010SelectUsrKbn.value=ukbn;
    document.forms[0].sch010SchSid.value=sid;
    document.forms[0].submit();
    return false;
}
function moveListSchedule(cmd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].sch010SelectUsrSid.value=uid;
    document.forms[0].sch010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}
function moveKojinSchedule(){
    document.forms[0].cmd.value='kojin';
    document.forms[0].CMD.value='kojin';
    if (document.forms[0].sch010SelectUsrSid.value == -1) {
        document.forms[0].sch010SelectUsrSid.disabled = true;
        document.forms[0].sch010SelectUsrKbn.disabled = true;
    }
    document.forms[0].submit();
    return false;
}
function changeGroupCombo(){
    document.forms[0].cmd.value='';
    document.forms[0].CMD.value='';
    document.forms[0].sch020SelectUsrSid.disabled = true;
    document.forms[0].sch010SelectUsrSid.disabled = true;
    document.forms[0].submit();
    return false;
}

function changeUserCombo(){
    document.forms[0].cmd.value='';
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}
function keyPress(keycode) {
    if ($('.js_schSearch').is(':focus') && keycode == 13) {
        document.forms[0].CMD.value='search';
        document.forms[0].submit();
        return false;
    }
}

function resetCmd() {
    document.forms[0].CMD.value='';
}

function window_create() {
  var top_flame = $('.js_sch_top_frame');
  var topWidth = $('.js_sch_under_frame').width() + 2;
  $('.js_sch_under_frame').css({
      'margin-top':top_flame.height() - parseInt($('.calendar_weekHeader td').css('border-bottom-width'))
  });

  $('.js_sch_ikkatshHid_frame').css({
      'margin-top': top_flame.height() - $('.calendar_weekHeader').height()
  });
}

$(function() {
  $(window).resize(function() {
    window_create();
  });

  //一括登録表示
  if (document.getElementsByName('schIkkatsuViewMode')[0].value == 1) {
    sch020IkkatuSelect();
    sch020IkkatsuCellSetting();
  }

  //一括登録表示
  if (document.getElementsByName('schIkkatsuKakuninViewMode')[0].value == 1) {
    sch020IkkatuDsp();
  }
});

function sch020IkkatuSelect() {
    $('#sch020IkkatuSelectBtn').addClass('display_none');
    $('#sch020IkkatuButtonArea').removeClass('display_none');
    $('.js_schAddBtn').addClass('display_none');
    $('.js_schSearch').addClass('display_none');
    $('.js_schIkkatsuCheck').removeClass('display_none');
    document.getElementsByName('schIkkatsuViewMode')[0].value=1;
}

function sch020IkkatuEntry() {
    document.getElementsByName('CMD')[0].value='sch020IkkatuTouroku';
    document.getElementsByName('cmd')[0].value='add';
    document.getElementsByName('schIkkatsuFlg')[0].value=1;
    document.forms[0].submit();
}

function sch020IkkatsuCheck(key) {
    sch020CellStyleSetting(key.value, key.checked, true);
}

function sch020IkkatsuCellSetting() {
    $('.js_schIkkatsuCheck').each(function() {
      sch020CellStyleSetting($(this).val(), $(this).prop('checked'), false);
    });
    ikkatsuKakuninReload();
}

function sch020CellStyleSetting(checkId, checkSts, reloadFlg) {
    if (checkSts) {
        if(!($('#sch020IkkatsuSaveKey_' + checkId).length)){
            $("form").append("<input type='hidden' name='schIkkatuTorokuKey' value='" + checkId + "' id='sch020IkkatsuSaveKey_" + checkId + "' class='js_saveIkkatsuKey'>");
        }
        $('#sch020Cell_' + checkId).addClass('bgC_cal_select');
        $('#sch020Cell_' + checkId).removeClass('bgC_tableCell');
    } else {
        $('#sch020IkkatsuSaveKey_' + checkId).remove();
        $('#sch020Cell_' + checkId).addClass('bgC_tableCell');
        $('#sch020Cell_' + checkId).removeClass('bgC_cal_select');
    }
    if (reloadFlg) {
        ikkatsuKakuninReload();
    }
}

function ikkatsuKakuninReload() {
        document.forms[0].CMD.value='sch020IkkatuList';
        var paramStr = getFormData($('.js_schForm'));
        $.ajax({
            async: true,
            url:  "../schedule/sch020.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                var htmlParam = "";
                if (data.schIkkatuTorokuHideList.length > 0) {
                    for (var i = 0; i < data.schIkkatuTorokuHideList.length; i++) {
                        for (var j = 0; j < data.schIkkatuTorokuHideList[i].length; j++) {
                            if (j == 0) {
                                htmlParam += "<div class='mb5 w100'>";
                                htmlParam += "<div class='pl5 bgC_header2'>";
                                htmlParam += data.schIkkatuTorokuHideList[i][j].dateStr;
                                htmlParam += "</div>";
                                htmlParam += "</div>";
                            } else {
                                htmlParam += "<br>";
                            }
                            htmlParam += "<div class='pl10 pb5 verAlignMid'>";
                            if (data.schIkkatuTorokuHideList[i][j].usrKbn == 1) {
                                htmlParam += "<img class='btn_classicImg-display wp25 mr5' src='../common/images/classic/header_group.png' alt='" + msglist_sch010['cmn.group'] + "'>";
                                htmlParam += "<img class='btn_originalImg-display wp25 mr5' src='../common/images/original/icon_group_25.png' alt='" + msglist_sch010['cmn.group'] + "'>";
                                htmlParam += data.schIkkatuTorokuHideList[i][j].name;
                            } else {
                                var mukoClass = "";
                                if (data.schIkkatuTorokuHideList[i][j].usrUkoFlg == 1) {
                                    mukoClass = "mukoUser";
                                }
                                htmlParam += "<a href='#!' class='" + mukoClass + "' onClick='return openUserInfoWindow(" + data.schIkkatuTorokuHideList[i][j].sid + ");'>";
                                if (data.schIkkatuTorokuHideList[i][j].photoKbn == 1) {
                                    htmlParam += "<div class='hikokai_photo-s wp25 mr5 verAlignMid js_syain_sel_check_img'>";
                                    htmlParam += "<span class='hikokai_text mrl_auto'>";
                                    htmlParam += msglist_sch010['cmn.private.photo'];
                                    htmlParam += "</span>";
                                    htmlParam += "</div>";
                                } else if (data.schIkkatuTorokuHideList[i][j].photoKbn == 0) {
                                    if (data.schIkkatuTorokuHideList[i][j].photoSid == 0) {
                                        htmlParam += "<img src='../common/images/original/photo.png' name='userImage' class='original-display wp25 mr5' alt='" + msglist_sch010['cmn.photo'] + "'>";
                                        htmlParam += "<img src='../common/images/classic/icon_photo.gif' name='userImage' class='btn_classicImg-display wp25 mr5' alt='" + msglist_sch010['cmn.photo'] + "'>";
                                    } else {
                                        htmlParam += "<img src='../common/cmn100.do?CMD=getImageFile&cmn100binSid=" + data.schIkkatuTorokuHideList[i][j].photoSid + "' name='userImage' class='wp25 mr5' alt='" + msglist_sch010['cmn.photo'] + "'>";
                                    }
                                }
                                htmlParam += data.schIkkatuTorokuHideList[i][j].name;
                                htmlParam += "</a>";
                            }
                            htmlParam += "<div class='ml10'>";
                            htmlParam += "<button type='button' value='" + msglist_sch010['reserve.22'] + "' class='ml_auto classic-display mailMenu_button no_w' onclick='sch020IkkatsuRemove(\"" + data.schIkkatuTorokuHideList[i][j].id + "\");'>";
                            htmlParam += msglist_sch010['reserve.22'];
                            htmlParam += "</button>";
                            htmlParam += "<button type='button' value='" + msglist_sch010['reserve.22'] + "' class='original-display iconBtn-noBorder no_w' onclick='sch020IkkatsuRemove(\"" + data.schIkkatuTorokuHideList[i][j].id + "\");'>";
                            htmlParam += "<img src='../common/images/classic/icon_delete.png'>";
                            htmlParam += "</button>";
                            htmlParam += "</div>";
                            htmlParam += "</div>";
                        }
                    }
                } else {
                    htmlParam += "<div class='txt_c pb5'>" + msglist_sch010['schedule.ikkatsu.1'] + "</div>";
                }
                $('.js_ikkatsuArea').empty();
                $('.js_ikkatsuArea').append(htmlParam);
            };
        });
}

function sch020IkkatsuRemove(key) {
    $('#sch020IkkatsuSaveKey_' + key).remove();
    document.getElementsByName('CMD')[0].value='sch020IkkatuRemove';
    document.getElementsByName('schIkkatsuRemoveKey')[0].value=key;
    document.forms[0].submit();
}

function sch020IkkatuEnd() {
    $('#sch020IkkatuSelectBtn').removeClass('display_none');
    $('#sch020IkkatuButtonArea').addClass('display_none');
    $('.js_schAddBtn').removeClass('display_none');
    $('.js_schSearch').removeClass('display_none');
    $('.js_schIkkatsuCheck').addClass('display_none');
    $('.js_schIkkatsuCheck').prop('checked', false);
    $('#sch020_saveIkkatsuKeyArea').html('');
    sch020IkkatsuCellSetting();
    document.getElementsByName('schIkkatsuViewMode')[0].value=0;
    document.getElementsByName('schIkkatsuKakuninViewMode')[0].value=0;
}

function sch020IkkatuDsp() {
  if ($('.js_sch_ikkatshHid_frame').length) {
    if ($('.js_sch_ikkatshHid_frame').hasClass('display_none')) {
      $('.js_sch_ikkatshHid_frame').addClass('display_tbl_c');
      $('.js_ikkatuDsp').addClass('display_none');
      $('.js_sch_ikkatshHid_frame').removeClass('display_none');
      $('.js_ikkatuDspEnd').removeClass('display_none');
      document.getElementsByName('schIkkatsuKakuninViewMode')[0].value=1;
    } else {
      $('.js_sch_ikkatshHid_frame').addClass('display_none');
      $('.js_ikkatuDspEnd').addClass('display_none');
      $('.js_sch_ikkatshHid_frame').removeClass('display_tbl_c');
      $('.js_ikkatuDsp').removeClass('display_none');
      document.getElementsByName('schIkkatsuKakuninViewMode')[0].value=0;
    }
  }
}

function visibleChange() {
    $('body').removeClass('visibility-hidden');
}