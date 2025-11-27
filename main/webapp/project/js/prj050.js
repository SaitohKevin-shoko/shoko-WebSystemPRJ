$(function() {
    /* 画面切り替え  hover*/
    $('.td_todo_add_not_sel').hover(
        function () {
            $(this).addClass("td_todo_add_not_sel_on");
        },
        function () {
            $(this).removeClass("td_todo_add_not_sel_on");
        }
    );
});


function clearDate(date){
    date.val('');
}

function moveDay(elmDate, kbn, itemKbn) {

    systemDate = new Date();
    var year = convYear(systemDate.getYear());
    var month = ("0" + (systemDate.getMonth() + 1)).slice(-2);
    var day = ("0" + systemDate.getDate()).slice(-2);

    if (kbn == 2) {
        $(elmDate).val(year + "/" + month + "/" + day);

        if (itemKbn == 0) {
            setToDayYotei();
        } else if (itemKbn == 1) {
            setToDayJisseki();
        }

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

            var newYear = convYear(newDate.getYear());
            var systemYear = convYear(systemDate.getYear());

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

    if (itemKbn == 0) {
        setToDayYotei();
    } else if (itemKbn == 1) {
        setToDayJisseki();
    }
}

function convYear(yyyy) {

  if(yyyy < 1900) {
    yyyy = 1900 + yyyy;
  }
  return yyyy;
}

function setToDayYotei() {

    var frDate = document.forms[0].prj050strPlanDate.value;
    var toDate = document.forms[0].prj050endPlanDate.value;
    var dateFr = new Date(frDate);
    var dateTo = new Date(toDate);

    if (dateFr > dateTo) {
        document.forms[0].prj050endPlanDate.value = frDate;
    }
}

function setToDayJisseki() {

    var frDate = document.forms[0].prj050strResultDate.value;
    var toDate = document.forms[0].prj050endResultDate.value;
    var dateFr = new Date(frDate);
    var dateTo = new Date(toDate);

    if (dateFr > dateTo) {
        document.forms[0].prj050endResultDate.value = frDate;
    }
}

function setDateParam() {
    setYmdParam($("#selDatesp"),
                $("input[name='prj050kaisiYoteiYear']"),
                $("input[name='prj050kaisiYoteiMonth']"),
                $("input[name='prj050kaisiYoteiDay']"));
    setYmdParam($("#selDateep"),
                $("input[name='prj050kigenYear']"),
                $("input[name='prj050kigenMonth']"),
                $("input[name='prj050kigenDay']"));
    setYmdParam($("#selDatesr"),
                $("input[name='prj050kaisiJissekiYear']"),
                $("input[name='prj050kaisiJissekiMonth']"),
                $("input[name='prj050kaisiJissekiDay']"));
    setYmdParam($("#selDateer"),
                $("input[name='prj050syuryoJissekiYear']"),
                $("input[name='prj050syuryoJissekiMonth']"),
                $("input[name='prj050syuryoJissekiDay']"));
}

function clickLabel(label) {
    var lab = document.getElementById(label.htmlFor);
    if (lab != null) {
        if (lab.tagName == "INPUT") {
            lab.checked = true;
        }
    }
    return false;
}
