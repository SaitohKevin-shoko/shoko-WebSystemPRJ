$(function() {
    $('fieldset[name="prj020hdnMemberUI"]').on('change', function() {
      $('fieldset[name="prj020adminSelectUI"]').ui_multiselector({cmd:'init'});
    });
});

function clearDate(date){
    date.val('');
}

function cmn110Updated(cmn110, tempName, tempSaveName) {
    memberParamCreate();
    document.forms[0].prj020IcoName.value = tempName;
    document.forms[0].prj020IcoSaveName.value = tempSaveName;
    setDateParam();
    document.forms[0].submit();
    return true;
}

function memberEdit(cmd, dspId) {
    memberParamCreate();
    document.forms[0].CMD.value = cmd;
    document.forms[0].movedDspId.value = dspId;
    setDateParam();
    document.forms[0].submit();
    return false;
}

function useTemplate(cmd, mode) {
    memberParamCreate();
    document.forms[0].CMD.value = cmd;
    document.forms[0].prjTmpMode.value = mode;
    document.forms[0].submit();
    return false;
}

function openpos(){

      var labLoc = '../project/prj120.do';
      $('iframe[name=pos]').attr({'src':labLoc});
      $('#subPanel').dialog({
          dialogClass:'fw_b',
          modal: true,
          title:'コピーするプロジェクトを選択してください',
          autoOpen: true,  // hide dialog
          resizable: false,
          height: '390',
          width: '450',
          open: function() {
              $(".ui-dialog-titlebar-close", $(this).closest(".ui-dialog")).hide();
          }
      });
      return false;
    }

function moveDay(elmDate, kbn) {

    systemDate = new Date();
    var year = convYear(systemDate.getFullYear());
    var month = ("0" + (systemDate.getMonth() + 1)).slice(-2);
    var day = ("0" + systemDate.getDate()).slice(-2);

    //「今日」ボタン押下
    if (kbn == 2) {
        $(elmDate).val(year + "/" + month + "/" + day);
        return;
    }

    //「前日」or 「翌日」ボタン押下
    if (kbn == 1 || kbn == 3) {

        var ymdf = escape($(elmDate).val());
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

            newDate = new Date($(elmDate).val())

            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getFullYear());
            var systemYear = convYear(systemDate.getFullYear());

            if (newYear < systemYear - 10 || newYear > systemYear + 10) {
                return;
            } else {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(elmDate).val(year + "/" + month + "/" + day);
            }

        } else {

            if ($(elmDate).val() == '') {
                $(elmDate).val(year + "/" + month + "/" + day);
            }
        }
    }
}

function convYear(yyyy) {

  if(yyyy < 1900) {
    yyyy = 1900 + yyyy;
  }
  return yyyy;
}

function deleteCompany(usrDel) {
    memberParamCreate();
    document.forms['prj020Form'].CMD.value = 'deleteCompany';
    document.forms['prj020Form'].prj020UsrDel.value = usrDel;
    document.forms['prj020Form'].submit();
    return false;
}

function scroll() {
    if (document.forms[0].prj020ScrollFlg.value=='1') {
        window.location.hash='add_user';
    }
}

function setDateParam() {
    setYmdParam($("#selDatefr"),
                $("input[name='prj020startYear']"),
                $("input[name='prj020startMonth']"),
                $("input[name='prj020startDay']"));
    setYmdParam($("#selDateto"),
                $("input[name='prj020endYear']"),
                $("input[name='prj020endMonth']"),
                $("input[name='prj020endDay']"));
}

function cmn110DropBan() {
    return $('body').find('div').hasClass('ui-widget-overlay');
}

function prjButtonPush(cmd){
    memberParamCreate();
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function memberParamCreate() {
  if ($("input[name='prj020prjMyKbn'").val() == 1) {
    return;
  }
  var memberParam = $('input[name="prj020hdnMember"]');
  var memberSid = $('input[name="prj020hdnMemberSid"]');
  if (memberSid.length > 0) {
    for (var j = 0; j < memberParam.length; j++) {
      var removeFlg = true;
      for (var i = 0; i < memberSid.length; i++) {
        if (memberSid[i].value == memberParam[j].value.substr(0, memberParam[j].value.indexOf('d'))) {
          removeFlg = false;
          break;
        }
      }
      if (removeFlg) {
        memberParam[j].remove();
      }
    }

    for (var i = 0; i < memberSid.length; i++) {
      var createFlg = true;
      for (var j = 0; j < memberParam.length; j++) {
        var sid = memberParam[j].value.substr(0, memberParam[j].value.indexOf('d'));
        if (memberSid[i].value == sid) {
          createFlg = false;
          break;
        }
      }
      if (createFlg) {
        $('form').append("<input type='hidden' name='prj020hdnMember' value='" + memberSid[i].value + "d41d8cd98f00b204e9800998ecf8427e'>");
      }
    }
  } else {
    memberParam.remove();
  }
}