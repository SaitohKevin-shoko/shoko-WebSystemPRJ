function sort(sortKey, orderKey){
    document.forms[0].CMD.value='init';
    document.forms[0].rsv100OrderKey.value=orderKey;
    document.forms[0].rsv100SortKey.value=sortKey;
    document.forms[0].submit();
    return false;
}
function changePage(id){
    if (id == 1) {
        document.forms[0].rsv100PageTop.value=document.forms[0].rsv100PageBottom.value;
    }
    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
    return false;
}

function selectChange(kbn) {
    if (document.forms[0].rsv100SelectedKey1.value == kbn) {
        if (document.forms[0].rsv100SelectedKey1Sort[0].checked) {
            document.forms[0].rsv100SelectedKey1Sort[0].checked = false;
            document.forms[0].rsv100SelectedKey1Sort[1].checked = true;
        } else {
            document.forms[0].rsv100SelectedKey1Sort[0].checked = true;
            document.forms[0].rsv100SelectedKey1Sort[1].checked = false;
        }
    } else {
        document.forms[0].rsv100SelectedKey1.value = kbn;
    }
    return false;
}

function keyPress(keycode) {
    if (keycode == 13) {
        document.forms[0].CMD.value='kensaku';
        document.forms[0].submit();
        return false;
    }
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
  if(yyyy<1900) {
    yyyy=1900+yyyy;
  }
  return yyyy;
}

function rsv100ChgDateKbn() {
    var dateElName = [
      'rsv100selectedFromDate', 'rsv100selectedToDate'
    ];

    var dateDisabled = document.forms[0].rsv100dateKbn.checked;

    for (idx = 0; idx < dateElName.length; idx++) {
      var delName = dateElName[idx];
      document.getElementsByName(dateElName[idx])[0].disabled=dateDisabled;
    }

    if (dateDisabled) {
      $("#rsv100DateFromBtnAreaOn").hide();
      $("#rsv100DateToBtnAreaOn").hide();
      $("#rsv100DateFromBtnAreaOff").show();
      $("#rsv100DateToBtnAreaOff").show();
    } else {
      $("#rsv100DateFromBtnAreaOn").show();
      $("#rsv100DateToBtnAreaOn").show();
      $("#rsv100DateFromBtnAreaOff").hide();
      $("#rsv100DateToBtnAreaOff").hide();
    }
}

function setDateParam() {
    setYmdParam($("#selDatefr"),
                $("input[name='rsv100selectedFromYear']"),
                $("input[name='rsv100selectedFromMonth']"),
                $("input[name='rsv100selectedFromDay']"));
    setYmdParam($("#selDateto"),
                $("input[name='rsv100selectedToYear']"),
                $("input[name='rsv100selectedToMonth']"),
                $("input[name='rsv100selectedToDay']"));
}

$(function() {

    /* hover */
    $('.js_listHover')
        .mouseenter(function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        })
        .mouseleave(function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        });

    $(document).on("click", ".js_usrPop", function(e){
       e.stopPropagation();
       var usrSid = $(this).prev('input[name="usrSid"]').val();
       openUserInfoWindow(usrSid);
    });

    $(document).on("click", ".js_rsvLinkClick", function(){

        $('#rsvCreateArea').children().remove();
        $('#rsvCreateArea').append('<iframe src=\"../reserve/rsv110.do?rsv110ProcMode=2&rsv110RsySid='
                                   + $(this).attr('id')
                                   + '\" name=\"sample\" class="w100 h100 border_none"></iframe>');

        /* 施設予約ポップ */
        $('#reservePop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height:500,
            width: 800,
            modal: true,
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
    });

    //施設区分よりCSVの表示を切り替える
    var sisKbn = $("input:hidden[name='rsv100svSelectSisKbn']").val();
    dispChangeCsvField(sisKbn)
});

function callYokyakuWindowClose() {
    $('#reservePop').dialog('close');
}

function dispChangeCsvField(sisKbn) {
    //部屋
    if (sisKbn == 1) {
        $(".csvOutFieldHeya").show();
        $(".csvOutFieldCar").hide();
        $(".csvOutFieldHeyaCar").show();
    //車
    } else if (sisKbn == 3) {
        $(".csvOutFieldHeya").hide();
        $(".csvOutFieldCar").show();
        $(".csvOutFieldHeyaCar").show();
    } else {
        $(".csvOutFieldHeya").hide();
        $(".csvOutFieldCar").hide();
        $(".csvOutFieldHeyaCar").hide();
    }
}