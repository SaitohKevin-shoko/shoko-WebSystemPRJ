function sort(sortKey, orderKey) {
    getForm().CMD.value = 'init';
    getForm().wml260sortKey.value = sortKey;
    getForm().wml260order.value = orderKey;
    getForm().submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        document.forms[0].wml260pageBottom.value = document.forms[0].wml260pageTop.value;
    } else {
        document.forms[0].wml260pageTop.value = document.forms[0].wml260pageBottom.value;
    }

    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
    return false;
}

function sort(sortKey, orderKey) {
    document.forms[0].CMD.value = 'init';
    document.forms[0].wml260sortKey.value = sortKey;
    document.forms[0].wml260order.value = orderKey;
    document.forms[0].submit();
    return false;
}

function openDetail(mailNum) {
    var detailWidth = 700;
    var detailHeight = 500

    window.open('../webmail/wml080.do?wml080mailNum=' + mailNum + '&wml080mailType=1', '_blank', 'width=' + detailWidth
              + ',height=' + detailHeight + ',titlebar=no,toolbar=no,scrollbars=yes'
              + ', left=' + getWml260CenterX(detailWidth) + ', top=' + getWml260CenterY(detailHeight));
    return false;
}

function getWml260CenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getWml260CenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}

function setSearchDateView(type) {
    if (type == 4) {
        $('#wml260FromDate').show();
        $('#wml260ToDate').show();
    } else {
        $('#wml260FromDate').hide();
        $('#wml260ToDate').hide();
    }
}

function computeDate(year, month, day, addDays) {
    var screenDate = new Date(year, month - 1, day);
    screenDate.setTime(screenDate.getTime() + (addDays * 86400000));
    return screenDate;
}

function wml260prevDate(type) {
    var year = getComboValue(getSearchYearCombo(type));
    var month = getComboValue(getSearchMonthCombo(type));
    var day = getComboValue(getSearchDayCombo(type));

    var screenDate = computeDate(year, month, day, -1);
    setDateCombo(type, screenDate);
}

function wml260today(type) {
    setDateCombo(type, new Date());
}

function wml260nextDate(type) {
    var year = getComboValue(getSearchYearCombo(type));
    var month = getComboValue(getSearchMonthCombo(type));
    var day = getComboValue(getSearchDayCombo(type));

    var screenDate = computeDate(year, month, day, 1);
    setDateCombo(type, screenDate);
}

function getComboValue(combo) {
    for (i = 0; i < combo.options.length; i++) {
        if (combo.options[i].selected) {
            return combo.options[i].value;
        }
    }
}

function setComboSelected(combo, selectValue) {
    for (i = 0; i < combo.options.length; i++) {
        combo.options[i].selected = (combo.options[i].value == selectValue);
    }
}

function getSearchYearCombo(type) {
   if (type == 1) {
       return document.getElementsByName('wml260SendDateYearTo')[0];
   }

   return document.getElementsByName('wml260SendDateYear')[0];
}

function getSearchMonthCombo(type) {
   if (type == 1) {
       return document.getElementsByName('wml260SendDateMonthTo')[0];
   }

   return document.getElementsByName('wml260SendDateMonth')[0];
}

function getSearchDayCombo(type) {
   if (type == 1) {
       return document.getElementsByName('wml260SendDateDayTo')[0];
   }

   return document.getElementsByName('wml260SendDateDay')[0];
}

function setYearCombo(type, year) {
    setComboSelected(getSearchYearCombo(type), year);
}

function setMonthCombo(type, month) {
    setComboSelected(getSearchMonthCombo(type), month);
}

function setDayCombo(type, day) {
    setComboSelected(getSearchDayCombo(type), day);
}

function setDateCombo(type, date) {
    setYearCombo(type, date.getFullYear());
    setMonthCombo(type, date.getMonth() + 1);
    setDayCombo(type, date.getDate());
}

$(function(){
    /* hover */
    $('.js_listHover').live({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

    /* hover:click */
    $(".js_listClick").live("click", function(){
        var sid = $(this).parent().data("sid");
        openDetail(sid);
    });
});