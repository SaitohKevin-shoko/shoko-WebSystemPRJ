$(function() {
    $('fieldset[name="prj140hdnMemberUI"]').on('change', function() {
      $('fieldset[name="prj140adminSelectUI"]').ui_multiselector({cmd:'init'});
    });
});


function clearDate(date){
    date.val('');
}

function memberEdit(cmd, dspId) {
    memberParamCreate();
    document.forms[0].CMD.value = cmd;
    document.forms[0].movedDspId.value = dspId;
    setDateParam();
    document.forms[0].submit();
    return false;
}

function moveDay(elmDate, kbn) {

    systemDate = new Date();
    var year = convYear(systemDate.getFullYear());
    var month = ("0" + (systemDate.getMonth() + 1)).slice(-2);
    var day = ("0" + systemDate.getDate()).slice(-2);

    if (kbn == 2) {
        $(elmDate).val(year + "/" + month + "/" + day);
        return;
    }

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

function setDateParam() {
    setYmdParam($("#selDatefr"),
                $("input[name='prj140startYear']"),
                $("input[name='prj140startMonth']"),
                $("input[name='prj140startDay']"));
    setYmdParam($("#selDateto"),
                $("input[name='prj140endYear']"),
                $("input[name='prj140endMonth']"),
                $("input[name='prj140endDay']"));
}

function prjButtonPush(cmd){
    memberParamCreate();
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function memberParamCreate() {
  var memberParam = $('input[name="prj140hdnMember"]');
  var memberSid = $('input[name="prj140hdnMemberSid"]');
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
        $('form').append("<input type='hidden' name='prj140hdnMember' value='" + memberSid[i].value + "d41d8cd98f00b204e9800998ecf8427e'>");
      }
    }
  } else {
    memberParam.remove();
  }
}