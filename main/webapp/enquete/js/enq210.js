$(function(){
    var juuyou=$("input:radio[name=enq210Juuyou]:checked").val();

    document.getElementById('star_1').style.display = "none";
    document.getElementById('star_2').style.display = "none";
    document.getElementById('star_3').style.display = "none";

    if (juuyou == 1) {
        document.getElementById('star_2').style.display = "block";
    } else if (juuyou == 2) {
        document.getElementById('star_3').style.display = "block";
    } else {
        document.getElementById('star_1').style.display = "block";
    }

    enq210checkSmail();


    var editMode=$("input:hidden[name=enq210editMode]").val();

    if (editMode != 2) {
        checkEnq210AnsOpen();
    }
    
    $("#attachment_FormArea1 img[onclick]").on("click", function() {
	  $("input[name='enq210AttachKbn']").val(0);
    });

});

function onSelectFromEvent() {
    enq210checkSmail();
}

function onSelectToEvent() {
    enq210checkSmail();
}

function setParams() {
    
    setYmdParam($("#enq210FrDate"),
        $("input[name='enq210FrYear']"),
        $("input[name='enq210FrMonth']"),
        $("input[name='enq210FrDay']"));

    setYmdParam($("#enq210AnsDate"),
        $("input[name='enq210AnsYear']"),
        $("input[name='enq210AnsMonth']"),
        $("input[name='enq210AnsDay']"));
        
    setYmdParam($("#enq210AnsPubFrDate"),
        $("input[name='enq210AnsPubFrYear']"),
        $("input[name='enq210AnsPubFrMonth']"),
        $("input[name='enq210AnsPubFrDay']"));
        
    setYmdParam($("#enq210ToDate"),
        $("input[name='enq210ToYear']"),
        $("input[name='enq210ToMonth']"),
        $("input[name='enq210ToDay']"));
        
}

function cmn110Updated(window, tempName, tempSaveName, objId) {
	if (objId == "2") {
		var tempNameList = [tempName];
		var tempSaveNameList = [tempSaveName];
		setParentParamTinymceMode(tempNameList, tempSaveNameList, 0);
	}
	if (objId == "1") {
		window.close();
        document.forms[0].submit();
	}
}

function changeAttached(attachedType) {
    $('#enq210attachPosition').hide();
    $('#enq210attachFile').hide();
    $('#enq210attachUrl').hide();
    $('#enq210attachDspName').hide();

    if (attachedType == 1) {
        $('#enq210attachPosition').show();
        $('#enq210attachFile').show();
    } else if (attachedType == 2) {
        $('#enq210attachPosition').show();
        $('#enq210attachFile').show();
        $('#enq210attachDspName').show();
    } else if (attachedType == 3) {
        $('#enq210attachPosition').show();
        $('#enq210attachUrl').show();
        $('#enq210attachDspName').show();
    }
}

function changeSeqType() {
    if (!$('#enq210qnoAuto_0')) {
        return;
    }

    var seqType = $('input[name="enq210queSeqType"]:checked').val();
    var queListSize = $('input[name="ebaListSize"]').val();

    for (idx = 0; idx < queListSize; idx++) {
        if (seqType == 1) {
            $('#enq210qnoAuto_' + idx).show();
            $('#enq210qnoMan_' + idx).hide();
        } else {
            $('#enq210qnoAuto_' + idx).hide();
            $('#enq210qnoMan_' + idx).show();
        }
    }
}

function enq210Entry() {
    setParams();
    return buttonPush('enq210entry');
}

function enq210Draft() {
    setFormatDesc('enq210DescText', 'enq210DescText');
    return buttonPush('enq210draft');
}

function addQuestion(type) {
    document.forms[0].enq210queType.value = type;
    document.forms[0].enq220editMode.value = '0';
    return buttonPush('enq210addQuestion');
}

function editQuestion(queIndex) {
    document.forms[0].enq220editMode.value = '1';
    document.forms[0].enq210editQueIndex.value = queIndex;
    return buttonPush('enq210editQuestion');
}

function deleteQuestion(queIndex) {
    document.forms[0].enq210editQueIndex.value = queIndex;
    return buttonPush('enq210deleteQuestion');
}

function sortQuestion(cmd) {
    return buttonPush(cmd);
}

$(function(){
    if (document.forms[0].enq210scrollQuestonFlg.value == '1') {
        window.location.hash='enq210question';
        document.forms[0].enq210scrollQuestonFlg.value = '';
    }
});

//hiddenパラメータの表示順を再設定する
function changeDspSec() {
    var hid = document.getElementsByClassName("enqDspSec");
    for (i = 0; i < hid.length; i++) {
        hid[i].value = i + 1;
    }
}

function enq210selectTemplate(templateId) {
    document.forms[0].enq210templateId.value = templateId;
    return buttonPush('selectTemplate');
}

function enq210DspTemplate() {
    $('#enq210_template').dialog({
      dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 400,
        width: 500,
        modal: true,
        title: "テンプレート選択",
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

function enq210opnTemp(fileDir) {
    opnTemp('enq210file', fileDir, '1', '0');
}

function enq210selectAnswersList() {

  var ansCheck = document.forms['enq210Form'].enq210selectAnswersKbn.checked;
  var answerArray = document.forms['enq210Form'].enq210NoSelectAnswerList.options;
  var ansLength = answerArray.length;

  for (i = ansLength - 1; i >= 0; i--) {
    if (answerArray[i].value != -1) {
      answerArray[i].selected = ansCheck;
    }
  }
}

function enq210checkSmail() {
  if (!document.forms['enq210Form'].enq210smailInfo) {
    return;
  }

  var openFrDate = enq210createDate($("#enq210FrDate"));
  var ansLimitDate = enq210createDate($("#enq210ToDate"));
  if (openFrDate == null || ansLimitDate == null) {
      enq210changeSmail(false);
      return;
  }
  var nowDate = new Date();
  nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
  if (nowDate.getTime() < openFrDate.getTime() || nowDate.getTime() > ansLimitDate.getTime()) {
      enq210changeSmail(false);
  } else {
      enq210changeSmail(true);
  }
}

function enq210changeSmail(smlFlg) {
    if (smlFlg) {
        document.forms['enq210Form'].enq210smailInfo.disabled = false;
    } else {
        document.forms['enq210Form'].enq210smailInfo.checked = false;
        document.forms['enq210Form'].enq210smailInfo.disabled = true;
    }
}

function enq210createDate(elmDate) {
    var ymdf = $(elmDate).val();
    re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (!ymdf.match(re)) {
        return null;
    }
    
    var date = new Date(ymdf);
    return date;
}

function enq210selectValue(paramName) {
  return $("select[name='" + paramName + "']").val();
}

function enq210moveDay(date, kbn) {
    
    systemDate = new Date();

    //「今日ボタン押下」
    if (kbn == 2) {
        $(date).val(systemDate.toISOString().split("T")[0].replaceAll("-", "/"));
    }

    //「前日」or 「翌日」ボタン押下
    if (kbn == 1 || kbn == 3) {

        var ymdf = $(date).val();
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

            newDate = new Date(ymdf)
            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = newDate.getFullYear();
            var systemYear = systemDate.getFullYear();
            
            if (newYear >= systemYear - 20 && newYear <= systemYear + 20) {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(date).val(year + "/" + month + "/" + day);
            }
        } else {
            if ($(date).val() == '') {
                $(date).val(systemDate.toISOString().split("T")[0].replaceAll("-", "/"));
            }
        }
    }
    enq210checkSmail();
}

function enq210WrtCalendar(day, month, year) {
    setCalDateClickFnc('enq210checkSmail()');
    wrtCalendar(day, month, year);
}

function enq210ToDateKbn() {
    var toDateDisabled = document.forms[0].enq210ToKbn.checked;
    $('.js_frTodayBtnClick').css('pointer-events', 'none');
    $('.js_toTodayBtnClick').css('pointer-events', 'none');

    var toDateElements = ['enq210ToDate', 'enq210ToDateForward', 'enq210ToDateToday', 'enq210ToDateNext'];

    for (elIdx = 0; elIdx < toDateElements.length; elIdx++) {
        document.getElementsByName(toDateElements[elIdx])[0].disabled = toDateDisabled;
    }
    if (!toDateDisabled) {
        $('.js_frTodayBtnClick').removeAttr('style');
        $('.js_toTodayBtnClick').removeAttr('style');
    }
}
function checkEnq210AnsOpen() {
    var ansOpen = !document.forms[0].enq210AnsOpen.checked;

    var toDateElements = ['enq210AnsPubFrDate', 'enq210AnsPubFrForward',
                           'enq210AnsPubFrToday', 'enq210AnsPubFrNext',
                           'enq210ToDate', 'enq210ToDateForward', 'enq210ToDateToday',
                           'enq210ToDateNext', 'enq210ToKbn'];

    $('.js_frTodayBtnClick').css('pointer-events', 'none');
    $('.js_toTodayBtnClick').css('pointer-events', 'none');

    for (elIdx = 0; elIdx < toDateElements.length; elIdx++) {
        document.getElementsByName(toDateElements[elIdx])[0].disabled = ansOpen;
    }
    if (!ansOpen) {
        enq210ToDateKbn();
        $('.js_frTodayBtnClick').removeAttr('style');
        $('.js_toTodayBtnClick').removeAttr('style');
    }
}


function cmn110DropBan() {
    return $('body').find('div').hasClass('ui-widget-overlay');
}

$(function(){

    /* radio:click */
    $(".js_tableTopCheck").on("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });

    /* hover:click */
    $(".js_listClick").on("click", function(){
        var id = $(this).parent().attr("id");
        enq210selectTemplate(id);
    });

    /* hover */
    $('.js_listHover').on({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

});
