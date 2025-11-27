$(function() {
    //自動削除
    if ($('input:hidden[name=cir160autoDelKbn]').val() == 1
         && $('#cir160kn').attr('id') == null) {
          changeEnableDisable();
    }

    /* タブ変更 */
    $(document).on("click", '#tab1', function(){
       $('input:hidden[name=cir160SelTab]').val(0)
    });
    $(document).on("click", '#tab2', function(){
       $('input:hidden[name=cir160SelTab]').val(1)
    });
    $(document).on("click", '#tab3', function(){
       $('input:hidden[name=cir160SelTab]').val(2)
    });
    $(document).on("click", '#tab4', function(){
       $('input:hidden[name=cir160SelTab]').val(3)
    });
    $(document).on("click", '#tab5', function(){
       $('input:hidden[name=cir160SelTab]').val(4)
    });

    /* タブ変更 */
    $(document).on("click", '.cir_account_tab', function(){
        $(this).parent().addClass('display_none');

        var showId = $(this).attr('id');

        $('#' + showId + '_tab').removeClass('display_none');
        $('#' + showId + '_table').removeClass('display_none');

        if (showId == 'normal') {
            $('input:hidden[name=cir160SelTab]').val(0)
        } else if (showId == 'auto_del') {
            $('input:hidden[name=cir160SelTab]').val(1)
        } else if (showId == 'cirinit') {
            $('input:hidden[name=cir160SelTab]').val(2)
        } else if (showId == 'notify') {
            $('input:hidden[name=cir160SelTab]').val(3)
        } else if (showId == 'other') {
            $('input:hidden[name=cir160SelTab]').val(4)
        }
        changeHelpPrm();

    });

    /* タブ変更 */
    $(document).on("click", '.js_tab', function(){
        var showId = $(this).attr('id');
        $('#tab1_table').addClass('display_none');
        $('#tab2_table').addClass('display_none');
        $('#tab3_table').addClass('display_none');
        $('#tab4_table').addClass('display_none');
        $('#tab5_table').addClass('display_none');
        $('#tab1').addClass('tabHeader_tab-off');
        $('#tab2').addClass('tabHeader_tab-off');
        $('#tab3').addClass('tabHeader_tab-off');
        $('#tab4').addClass('tabHeader_tab-off');
        $('#tab5').addClass('tabHeader_tab-off');
        $('#tab1').removeClass('tabHeader_tab-on bgI_none');
        $('#tab2').removeClass('tabHeader_tab-on bgI_none');
        $('#tab3').removeClass('tabHeader_tab-on bgI_none');
        $('#tab4').removeClass('tabHeader_tab-on bgI_none');
        $('#tab5').removeClass('tabHeader_tab-on bgI_none');
        $('#' + showId + '_table').removeClass('display_none');
        $('#' + showId).removeClass('tabHeader_tab-off');
        $('#' + showId).addClass('tabHeader_tab-on bgI_none');
        changeHelpPrm();
    });

    //回覧板初期値設定  タブ変更
    if ($('input:hidden[name=cir160SelTab]').val() == 1) {
        $('#tab2').click();
    }
    if ($('input:hidden[name=cir160SelTab]').val() == 2) {
        $('#tab3').click();
    }
    if ($('input:hidden[name=cir160SelTab]').val() == 3) {
        $('#tab4').click();
    }
    if ($('input:hidden[name=cir160SelTab]').val() == 4) {
        $('#tab5').click();
    }

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

          if (multiselector.parent().attr('name') != 'userKbnUserSelector') {
            return protoMultiSelect.call($(this), option, e);
          }
          var selSid = clicked.find('input[name="cir160userKbnUser"]').val();
          var defSid = $('input[name="cir160DefActUsrSid"]').val();
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

            var defSid = $('input[name="cir160DefActUsrSid"]').val();
            var selected = targetselector.find('.js_multiselector_selected');
            selected.children().each(function() {
              if ($(this).children('input[name="cir160userKbnUser"]').val() != defSid) {
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
                    if (multiselector.parent().attr('name') == 'cir160userKbnUserUI') {
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
                    if (multiselector.parent().attr('name') == 'userKbnUserSelector') {
                      dspSelectedForUser.call(this);
                    }
                 }
              },
              e);

        }
        if (option.cmd == 'init') {
          var multiselector = $(this).closest('.js_multiselector');

          option.onloaded = function() {
                              dspSelectedForUser.call($(this).find('table.js_multiselector'));
                            };
          return protoMultiSelect.call($(this), option, e);
        }
        return protoMultiSelect.call($(this), option, e);
      }

      dspSelectedForUser = function() {
        var multiselector = $(this).closest('.js_multiselector');
        var defSid = $('input[name="cir160DefActUsrSid"]').val();

        multiselector.find('.js_multiselector_selectchild').each(function() {
          if ($(this).children('input[name="cir160userKbnUser"]').val() == defSid) {
            $(this).removeClass("content-hoverChange");
            $(this).addClass("cursor_d");
          }
        });

      }
    }


});

function changeHelpPrm() {
    var selTab = $('input:hidden[name=cir160SelTab]').val();

    if ($('input:hidden[name=cirAccountMode]').val() != 0) {
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
        } else if  (selTab == 2) {
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

function deleteSelUser() {

    document.forms[0].CMD.value='delUser';
    var paramStr = "";
    paramStr += getFormData($('#cir160Form'));

    $.ajax({
        async: true,
        url:  "../circular/cir160.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data.errorsList.length > 0) {
            messagePop(data.errorsList[0]);
        } else {
            buttonPush('deleteUser');
        }
    }).fail(function(data){
        alert('error');
    });

}

function deleteSelGroup() {
    $('select[name=cir160groupSid]').children().remove();
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


function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

function changeEnableDisable() {

    var jbatchKbn = 0;
    var jbatchKbnVal = '';

    for (i = 0; i < document.forms[0].cir160JdelKbn.length; i++) {
        if (document.forms[0].cir160JdelKbn[i].checked == true) {
            jbatchKbn = i;
        }
    }

    jbatchKbnVal = document.forms[0].cir160JdelKbn[jbatchKbn].value;

    if (jbatchKbnVal == 0) {
        document.forms[0].cir160JYear.disabled = true;
        document.forms[0].cir160JYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].cir160JMonth.disabled = true;
        document.forms[0].cir160JMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].cir160JYear.disabled = false;
        document.forms[0].cir160JYear.style.backgroundColor = '#ffffff';
        document.forms[0].cir160JMonth.disabled = false;
        document.forms[0].cir160JMonth.style.backgroundColor = '#ffffff';
    }

    var sbatchKbn = 0;
    var sbatchKbnVal = '';

    for (i = 0; i < document.forms[0].cir160SdelKbn.length; i++) {
        if (document.forms[0].cir160SdelKbn[i].checked == true) {
            sbatchKbn = i;
        }
    }
    sbatchKbnVal = document.forms[0].cir160SdelKbn[sbatchKbn].value;

    if (sbatchKbnVal == 0) {
        document.forms[0].cir160SYear.disabled = true;
        document.forms[0].cir160SYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].cir160SMonth.disabled = true;
        document.forms[0].cir160SMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].cir160SYear.disabled = false;
        document.forms[0].cir160SYear.style.backgroundColor = '#ffffff';
        document.forms[0].cir160SMonth.disabled = false;
        document.forms[0].cir160SMonth.style.backgroundColor = '#ffffff';
    }


    var dbatchKbn = 0;
    var dbatchKbnVal = '';

    for (i = 0; i < document.forms[0].cir160DdelKbn.length; i++) {
        if (document.forms[0].cir160DdelKbn[i].checked == true) {
            dbatchKbn = i;
        }
    }
    dbatchKbnVal = document.forms[0].cir160DdelKbn[dbatchKbn].value;

    if (dbatchKbnVal == 0) {
        document.forms[0].cir160DYear.disabled = true;
        document.forms[0].cir160DYear.style.backgroundColor = '#e0e0e0';
        document.forms[0].cir160DMonth.disabled = true;
        document.forms[0].cir160DMonth.style.backgroundColor = '#e0e0e0';
    } else {
        document.forms[0].cir160DYear.disabled = false;
        document.forms[0].cir160DYear.style.backgroundColor = '#ffffff';
        document.forms[0].cir160DMonth.disabled = false;
        document.forms[0].cir160DMonth.style.backgroundColor = '#ffffff';
    }
}

function submitStyleChange() {
    document.forms[0].cir160JYear.disabled=false;
    document.forms[0].cir160JMonth.disabled=false;
    document.forms[0].cir160SYear.disabled=false;
    document.forms[0].cir160SMonth.disabled=false;
    document.forms[0].cir160DYear.disabled=false;
    document.forms[0].cir160DMonth.disabled=false;
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
