/* 宛先 表示区分 0:スクロール表示 1:全て表示*/
var dsp_to_kbn = 0;
/* 宛先TO 表示区分 0:スクロール表示 1:全て表示*/
var dsp_cc_kbn = 0;
/* 宛先BCC 表示区分 0:スクロール表示 1:全て表示*/
var dsp_bcc_kbn = 0;

$(function() {

    //自動削除
    if ($('input:hidden[name=sml250autoDelKbn]').val() == 1
         && $('#sml250kn').attr('id') == null) {
          changeEnableDisable();
    }

    //転送設定
    if ($('input:hidden[name=smlAccountMode]').val() == 2
         && $('input:hidden[name=sml250tensoKbn]').val() == 1
         && $('#sml250kn').attr('id') == null) {

        changeEnableDisableTenso();

        if ($('input:radio[name=sml250tensoSetKbn]:checked').val() == 1) {
            changeTensoArea();
        }

    } else if ($('input:hidden[name=smlAccountMode]').val() == 2
            && $('input:hidden[name=sml250tensoKbn]').val() == 1
            && $('#sml250kn').attr('id') != null) {

        if ($('input:hidden[name=sml250tensoSetKbn]').val() == 1) {
            changeTensoArea2();
        }
    }



    /* タブ変更 */
    $(document).on("click", '.js_accTabHeader_tab', function(){

        var showId = $(this).attr('id');

        $('#normal_table').addClass('display_none');
        $('#auto_del_table').addClass('display_none');
        $('#tenso_table').addClass('display_none');
        $('#other_table').addClass('display_none');

        $('#normal').addClass('tabHeader_tab-off');
        $('#auto_del').addClass('tabHeader_tab-off');
        $('#tenso').addClass('tabHeader_tab-off');
        $('#other').addClass('tabHeader_tab-off');
        $('#normal').removeClass('tabHeader_tab-on');
        $('#auto_del').removeClass('tabHeader_tab-on');
        $('#tenso').removeClass('tabHeader_tab-on');
        $('#other').removeClass('tabHeader_tab-on');

        $('#' + showId + '_table').removeClass('display_none');

        $('#' + showId).removeClass('tabHeader_tab-off');
        $('#' + showId).addClass('tabHeader_tab-on');

        if (showId == 'normal') {
            $('input:hidden[name=sml250SelTab]').val(0)
        } else if (showId == 'auto_del') {
            $('input:hidden[name=sml250SelTab]').val(1)
        } else if (showId == 'tenso') {
            $('input:hidden[name=sml250SelTab]').val(2)
        } else if (showId == 'other') {
            $('input:hidden[name=sml250SelTab]').val(3)
        }
        changeHelpPrm();

    });

    //転送選択時  タブ変更
    if ($('input:hidden[name=smlAccountMode]').val() == 2
            && $('input:hidden[name=sml250tensoKbn]').val() == 1
            && $('input:hidden[name=sml250SelTab]').val() == 2) {
        $('#tenso').click();
    }

    //宛先,CC,BCC選択ボタン
    //宛先,CC,BCC選択ボタン
    $(document).on("click",'.js_mailSendSelBtn', function() {

        $(this).smlatesaki('open');
    });
    //使用者選択による転送先の選択の更新
    $(document).on("change",'fieldset[name="sml250userKbnUserUI"]', function() {
        $('fieldset[name="sml250tensoTargetUI"]').ui_multiselector({cmd:'init'});
    });



    //使用者ユーザ選択でアカウントの対象ユーザを削除不能にする
    if ($.fn.ui_multiselector) {
      var protoMultiSelect = $.fn.ui_multiselector;
      var dspSelectedForUser;
      $.fn.ui_multiselector = function(option, e) {
        if (option.cmd == 'delete') {


          var clicked = $(this);
          var multiselector = $(this).closest('.js_multiselector');
          var targetselector = $(this).closest('.js_multiselector_select');
          var selection = multiselector.find('.js_multiselector_noselectbody');

          if (multiselector.parent().attr('name') != 'sml250userKbnUserUI') {
            return protoMultiSelect.call($(this), option, e);
          }
          var selSid = clicked.find('input[name="sml250userKbnUser"]').val();
          var defSid = $('input[name="sml250DefActUsrSid"]').val();
          if (selSid == defSid) {
            return false;
          }
          return protoMultiSelect.call($(this), option, e);

        }
        //全削除
        if (option.cmd == 'alldelete') {
            var multiselector = $(this).closest('.js_multiselector');
            var targetselector = multiselector.find('.js_multiselector_select[name="'+ multiselector.data('multiselector_target') +'"]');
            var selection = multiselector.find('.js_multiselector_noselectbody');

            if (targetselector.children().length == 0) {
              return protoMultiSelect.call($(this), option, e);
            }
            if ($(multiselector).is('.js_multiselector_exec')) {
              return protoSortingSelect.call($(this), option, e);
            }

            var defSid = $('input[name="sml250DefActUsrSid"]').val();
            var selected = targetselector.find('.js_multiselector_selected');
            selected.children().each(function() {
              if ($(this).children('input[name="sml250userKbnUser"]').val() != defSid) {
                $(this).remove();
              }
            });
            protoMultiSelect.call(selection, {cmd:'selectionReload', onload:function() {multiselector.trigger('change');}}, e);

        }
        //追加
        if (option.cmd == 'select') {
            var multiselector = $(this).closest('.js_multiselector');
            return protoMultiSelect.call(
              this,
              {
                cmd:'select',
                 onload: function() {
                    if (multiselector.parent().attr('name') == 'sml250userKbnUserUI') {
                      dspSelectedForUser.call(this);
                    }
                 }
              },
              e);
        }
        //全て選択
        if (option.cmd == 'allselect') {
            var multiselector = $(this).closest('.js_multiselector');


            return protoMultiSelect.call(
              this,
              {
                cmd:'allselect',
                 onload: function() {
                    if (multiselector.parent().attr('name') == 'sml250userKbnUserUI') {
                      dspSelectedForUser.call(this);
                    }
                 }
              },
              e);

        }
        if (option.cmd == 'init') {
          var multiselector = $(this).closest('.js_multiselector');

          if (multiselector.parent().attr('name') != 'sml250userKbnUserUI') {
            return protoMultiSelect.call($(this), option, e);
          }
          option.onloaded = function() {
                              dspSelectedForUser.call($(this).find('table.js_multiselector'));
                            };
          return protoMultiSelect.call($(this), option, e);
        }
        return protoMultiSelect.call($(this), option, e);
      }

      dspSelectedForUser = function() {
        var multiselector = $(this).closest('.js_multiselector');
        var defSid = $('input[name="sml250DefActUsrSid"]').val();

        multiselector.find('.js_multiselector_selectchild').each(function() {
          if ($(this).children('input[name="sml250userKbnUser"]').val() == defSid) {
            $(this).removeClass("content-hoverChange");
            $(this).addClass("cursor_d");
          }
        });

      }
    }



});



function htmlEscape(s){
    s=s.replace(/&/g,'&amp;');
    s=s.replace(/>/g,'&gt;');
    s=s.replace(/</g,'&lt;');
    return s;
}


function changeHelpPrm() {
    var selTab = $('input:hidden[name=sml250SelTab]').val();

    if ($('input:hidden[name=smlAccountMode]').val() != 0) {
        if (selTab == 0) {
            $('input:hidden[name=helpPrm]').val("");
        } else if  (selTab == 1) {
            $('input:hidden[name=helpPrm]').val(0);
        } else if  (selTab == 2) {
            $('input:hidden[name=helpPrm]').val(1);
        } else if  (selTab == 3) {
            $('input:hidden[name=helpPrm]').val(2);
        }
    } else {
        if (selTab == 0) {
            $('input:hidden[name=helpPrm]').val(3);
        } else if  (selTab == 1) {
            $('input:hidden[name=helpPrm]').val(4);
        } else if  (selTab == 3) {
            $('input:hidden[name=helpPrm]').val(5);
        }
    }
}

function change(usrKbn, accountMode) {
//    if (accountMode == 2) {
//        if(usrKbn == 0){
//            $('#permissionGroup')[0].style.display="block";
//            $('#permissionUser')[0].style.display="none";
//        }else if(usrKbn == 1){
//            $('#permissionGroup')[0].style.display="none";
//            $('#permissionUser')[0].style.display="block";
//        }
//    }
}

function tensoCheck(usrKbn, mode, delmode) {

    if ($('input:hidden[name=smlAccountMode]').val() == 2
        && $('input:hidden[name=sml250tensoKbn]').val() == 1
        && $('input:radio[name=sml250tensoSetKbn]:checked').val() == 1
        && $('input:radio[name=sml250ObjKbn]:checked').val() == 1
        && $('input:hidden[name=sml250userSid]').length > 0) {

        clearTensoPop(usrKbn, mode, delmode);

    } else {

        if (usrKbn != -1) {
            change(usrKbn, mode);
            buttonPush();
        } else if (delmode == 0) {
            buttonPush('deleteUser');
        } else {
            buttonPush('deleteGroup');
        }

    }
}

function deleteSelUser() {

    document.forms[0].CMD.value='delUser';
    var paramStr = "";
    paramStr += getFormData($('#sml250Form'));

    $.ajax({
        async: true,
        url:  "../smail/sml250.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.errorsList.length > 0) {
                messagePop(data.errorsList[0]);
            } else {
                tensoCheck(-1, -1, 0);
            }
        } else {
            alert(msglist_sml010["sml.213"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.213"]);
    });
　  return false;
}

function deleteSelGroup() {
    $('select[name=sml250groupSid]').children().remove();
    tensoCheck(-1, -1, 1);

}

function messagePop(msg) {

    $('#messageArea').html("");
    $('#messageArea').append(msg);

    $('#messagePop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 160,
        width: 350,
        modal: true,
        overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
        },
        buttons: {
          OK: function() {
              $(this).dialog('close');
          }
        }
    });
}


function clearTensoPop(usrKbn, mode, delmode) {

    $('#clearTensoPop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 160,
        width: 400,
        modal: true,
        overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
        },
        buttons: {
          はい: function() {

              $('input:hidden[name=sml250userSid]').remove();

              if (usrKbn != -1) {
                  change(usrKbn, mode);
                  buttonPush();
              } else if (delmode == 0) {
                  buttonPush('deleteUser');
              } else {
                  buttonPush('deleteGroup');
              }

              $(this).dialog('close');
          },
          いいえ: function() {

//              if (usrKbn != -1) {
//
//                  if ($('input:radio[name=sml250userKbn]:checked').val() == 0) {
//                      $('input:radio[name=sml250userKbn]').val(['1']);
//                  } else {
//                      $('input:radio[name=sml250userKbn]').val(['0']);
//                  }
//              }

              $(this).dialog('close');
          }
        }
    });
}


function getNowSelUsr(functinBtnKbn) {

    var paramStr = "";

    if (functinBtnKbn == 0) {

        $('input:hidden[name=sml250AutoDestToUsrSid]').each(function(){
            paramStr += "&cmn120userSid=" + $(this).val();
        });

    } else if (functinBtnKbn == 1) {

        $('input:hidden[name=sml250AutoDestCcUsrSid]').each(function(){
            paramStr += "&cmn120userSid=" + $(this).val();
        });

    } else if (functinBtnKbn == 2) {

        $('input:hidden[name=sml250AutoDestBccUsrSid]').each(function(){
            paramStr += "&cmn120userSid=" + $(this).val();
        });

    }
    return paramStr;

}
function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

function changeEnableDisable() {

    var jbatchKbn = 0;
    var jbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml250JdelKbn.length; i++) {
        if (document.forms[0].sml250JdelKbn[i].checked == true) {
            jbatchKbn = i;
        }
    }

    jbatchKbnVal = document.forms[0].sml250JdelKbn[jbatchKbn].value;

    if (jbatchKbnVal == 0) {
        document.forms[0].sml250JYear.disabled = true;
        document.forms[0].sml250JYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml250JMonth.disabled = true;
        document.forms[0].sml250JMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml250JYear.disabled = false;
        document.forms[0].sml250JYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml250JMonth.disabled = false;
        document.forms[0].sml250JMonth.style.backgroundColor = '#ffffff';
    }

    var sbatchKbn = 0;
    var sbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml250SdelKbn.length; i++) {
        if (document.forms[0].sml250SdelKbn[i].checked == true) {
            sbatchKbn = i;
        }
    }
    sbatchKbnVal = document.forms[0].sml250SdelKbn[sbatchKbn].value;

    if (sbatchKbnVal == 0) {
        document.forms[0].sml250SYear.disabled = true;
        document.forms[0].sml250SYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml250SMonth.disabled = true;
        document.forms[0].sml250SMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml250SYear.disabled = false;
        document.forms[0].sml250SYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml250SMonth.disabled = false;
        document.forms[0].sml250SMonth.style.backgroundColor = '#ffffff';
    }

    var wbatchKbn = 0;
    var wbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml250WdelKbn.length; i++) {
        if (document.forms[0].sml250WdelKbn[i].checked == true) {
            wbatchKbn = i;
        }
    }
    wbatchKbnVal = document.forms[0].sml250WdelKbn[wbatchKbn].value;

    if (wbatchKbnVal == 0) {
        document.forms[0].sml250WYear.disabled = true;
        document.forms[0].sml250WYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml250WMonth.disabled = true;
        document.forms[0].sml250WMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml250WYear.disabled = false;
        document.forms[0].sml250WYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml250WMonth.disabled = false;
        document.forms[0].sml250WMonth.style.backgroundColor = '#ffffff';
    }

    var dbatchKbn = 0;
    var dbatchKbnVal = '';

    for (i = 0; i < document.forms[0].sml250DdelKbn.length; i++) {
        if (document.forms[0].sml250DdelKbn[i].checked == true) {
            dbatchKbn = i;
        }
    }
    dbatchKbnVal = document.forms[0].sml250DdelKbn[dbatchKbn].value;

    if (dbatchKbnVal == 0) {
        document.forms[0].sml250DYear.disabled = true;
        document.forms[0].sml250DYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].sml250DMonth.disabled = true;
        document.forms[0].sml250DMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].sml250DYear.disabled = false;
        document.forms[0].sml250DYear.style.backgroundColor = '#ffffff';
        document.forms[0].sml250DMonth.disabled = false;
        document.forms[0].sml250DMonth.style.backgroundColor = '#ffffff';
    }
}

function submitStyleChange() {
    document.forms[0].sml250JYear.disabled=false;
    document.forms[0].sml250JMonth.disabled=false;
    document.forms[0].sml250SYear.disabled=false;
    document.forms[0].sml250SMonth.disabled=false;
    document.forms[0].sml250WYear.disabled=false;
    document.forms[0].sml250WMonth.disabled=false;
    document.forms[0].sml250DYear.disabled=false;
    document.forms[0].sml250DMonth.disabled=false;
}

function setDispState(kbnElem, yearElem, monthElem) {

    for (i = 0; i < kbnElem.length; i++) {
        if (kbnElem[i].checked == true) {
            batchKbn = i;
        }
    }
    batchKbnVal = kbnElem[batchKbn].value;

    if (batchKbnVal == 0) {
        yearElem.disabled = true;
        yearElem.style.backgroundColor = '#e0e0e0';
        monthElem.disabled = true;
        monthElem.style.backgroundColor = '#e0e0e0';
    } else {
        yearElem.disabled = false;
        yearElem.style.backgroundColor = '#ffffff';
        monthElem.disabled = false;
        monthElem.style.backgroundColor = '#ffffff';
    }
}



function changeEnableDisableTenso() {

    var bool1 = false;
    if (document.forms[0].sml250MailFw[0].checked) {
        bool1 = true;
        document.forms[0].sml250MailDf.value = '';
        document.forms[0].sml250SmailOp[0].checked = true;
        if (document.forms[0].sml250ZaisekiPlugin.value == 0) {
            document.forms[0].sml250HuriwakeKbn[0].checked = true;
            document.forms[0].sml250Zmail1.value = '';
            document.forms[0].sml250Zmail2.value = '';
            document.forms[0].sml250Zmail3.value = '';
        }
        $('.js_settingTenso_hissuMark').addClass('display_none');
        $('.js_tensoConf').addClass('display_none');
    }
    document.forms[0].sml250MailDf.disabled = bool1;
    document.forms[0].sml250MailDfSelected.disabled = bool1;

    if (!bool1) {
        $('.js_settingTenso_hissuMark').removeClass('display_none');
        if (document.forms[0].sml250MailDfSelected.value != 0) {
             document.forms[0].sml250MailDf.disabled = true;
        }
        $('.js_tensoConf').removeClass('display_none');
    }

    document.forms[0].sml250SmailOp[0].disabled = bool1;
    document.forms[0].sml250SmailOp[1].disabled = bool1;

    if (document.forms[0].sml250ZaisekiPlugin.value == 1) {
        return;
    }
    document.forms[0].sml250HuriwakeKbn[0].disabled = bool1;
    document.forms[0].sml250HuriwakeKbn[1].disabled = bool1;
    document.forms[0].sml250HuriwakeKbn[2].disabled = bool1;

    if (document.forms[0].sml250HuriwakeKbn[0].checked) {
        document.forms[0].sml250Zmail1.value = '';
        document.forms[0].sml250Zmail2.value = '';
        document.forms[0].sml250Zmail3.value = '';
        document.forms[0].sml250Zmail1Selected.disabled = true;
        document.forms[0].sml250Zmail2Selected.disabled = true;
        document.forms[0].sml250Zmail3Selected.disabled = true;
        document.forms[0].sml250Zmail1.disabled = true;
        document.forms[0].sml250Zmail2.disabled = true;
        document.forms[0].sml250Zmail3.disabled = true;

        $('.js_mailDfSelect').removeClass('display_none');
        $('.js_zaisekiMailTo').addClass('display_none');
        $('.js_fuzaiMailTo').addClass('display_none');
        $('.js_otherMailTo').addClass('display_none');


    } else if (document.forms[0].sml250HuriwakeKbn[1].checked) {
        document.forms[0].sml250Zmail1Selected.disabled = false;
        document.forms[0].sml250Zmail2Selected.disabled = false;
        document.forms[0].sml250Zmail3Selected.disabled = false;
        document.forms[0].sml250Zmail1.disabled = false;
        document.forms[0].sml250Zmail2.disabled = false;
        document.forms[0].sml250Zmail3.disabled = false;
        $('.js_mailDfSelect').addClass('display_none');
        $('.js_zaisekiMailTo').removeClass('display_none');
        $('.js_fuzaiMailTo').removeClass('display_none');
        $('.js_otherMailTo').removeClass('display_none');

    } else if (document.forms[0].sml250HuriwakeKbn[2].checked) {
        document.forms[0].sml250Zmail1.value = '';
        document.forms[0].sml250Zmail3.value = '';
        document.forms[0].sml250Zmail1Selected.disabled = true;
        document.forms[0].sml250Zmail2Selected.disabled = false;
        document.forms[0].sml250Zmail3Selected.disabled = true;
        document.forms[0].sml250Zmail1.disabled = true;
        document.forms[0].sml250Zmail2.disabled = false;
        document.forms[0].sml250Zmail3.disabled = true;
        $('.js_mailDfSelect').addClass('display_none');
        $('.js_zaisekiMailTo').addClass('display_none');
        $('.js_fuzaiMailTo').removeClass('display_none');
        $('.js_otherMailTo').addClass('display_none');
    }



    if (document.forms[0].sml250HuriwakeKbn[1].checked) {
        if (document.forms[0].sml250Zmail1Selected.value != 0) {
            document.forms[0].sml250Zmail1.disabled = true;
        }
        if (document.forms[0].sml250Zmail2Selected.value != 0) {
            document.forms[0].sml250Zmail2.disabled = true;
        }
        if (document.forms[0].sml250Zmail3Selected.value != 0) {
            document.forms[0].sml250Zmail3.disabled = true;
        }
    } else if (document.forms[0].sml250HuriwakeKbn[2].checked) {
        if (document.forms[0].sml250Zmail2Selected.value != 0) {
            document.forms[0].sml250Zmail2.disabled = true;
        }
    }
    return;
}


function changeTensoArea() {

    if ($('input:radio[name=sml250tensoSetKbn]:checked').val() == 1) {
        $('.js_sml_tenso_set').removeClass('display_none');
    } else {
        $('.js_sml_tenso_set').addClass('display_none');
    }

}

function changeTensoArea2() {

    if ($('input:hidden[name=sml250tensoSetKbn]').val() == 1) {
        $('.js_sml_tenso_set').removeClass('display_none');
    } else {
        $('.js_sml_tenso_set').addClass('display_none');
    }

}

function changeTensoUsrKbn() {
    $('input:hidden[name=sml250userSid]').remove();
    buttonPush('redraw');
}
