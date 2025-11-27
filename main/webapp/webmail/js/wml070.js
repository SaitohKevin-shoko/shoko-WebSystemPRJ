function sort(sortKey, orderKey) {
    getForm().CMD.value = 'init';
    getForm().wml070sortKey.value = sortKey;
    getForm().wml070order.value = orderKey;
    getForm().submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        document.forms[0].wml070pageBottom.value = document.forms[0].wml070pageTop.value;
    } else {
        document.forms[0].wml070pageTop.value = document.forms[0].wml070pageBottom.value;
    }

    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
    return false;
}

function sort(sortKey, orderKey) {
    document.forms[0].CMD.value = 'init';
    document.forms[0].wml070sortKey.value = sortKey;
    document.forms[0].wml070order.value = orderKey;
    document.forms[0].submit();
    return false;
}

function openDetail(mailNum) {
    var detailWidth = 700;
    var detailHeight = 500

    window.open('../webmail/wml080.do?wml080mailNum=' + mailNum, '_blank', 'width=' + detailWidth
              + ',height=' + detailHeight + ',titlebar=no,toolbar=no,scrollbars=yes'
              + ', left=' + getWml070CenterX(detailWidth) + ', top=' + getWml070CenterY(detailHeight));
    return false;
}

function getWml070CenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getWml070CenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}

function setSearchDateView(type) {
    if (type == 4) {
        $('#wml070FromDate').show();
        $('#wml070ToDate').show();
    } else {
        $('#wml070FromDate').hide();
        $('#wml070ToDate').hide();
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
            newDate = new Date($(elmDate).val());

            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getFullYear());
            var systemYear = convYear(systemDate.getFullYear());
            if (newYear < systemYear - 3 || newYear > systemYear) {
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

$(function(){
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

    /* hover:click */
    $(document).on("click", ".js_listClick", function(){
        var sid = $(this).parent().data("sid");
        openDetail(sid);
    });
});
