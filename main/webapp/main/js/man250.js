
function changeGroupCombo() {
    document.forms[0].CMD.value='research';
    document.forms[0].man250SltUser.value='-1';
    document.forms[0].submit();
    return false;
}

function changePage1() {
    document.forms[0].CMD.value='research';
    for (i = 0; i < document.forms[0].man250SltPage1.length; i++) {
        if (document.forms[0].man250SltPage1[i].selected) {
            document.forms[0].man250SltPage2.value=document.forms[0].man250SltPage1[i].value;
            document.forms[0].man250PageNum.value=document.forms[0].man250SltPage1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function changePage2() {
    document.forms[0].CMD.value='research';
    for (i = 0; i < document.forms[0].man250SltPage2.length; i++) {
        if (document.forms[0].man250SltPage2[i].selected) {
            document.forms[0].man250SltPage1.value=document.forms[0].man250SltPage2[i].value;
            document.forms[0].man250PageNum.value=document.forms[0].man250SltPage2[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function clickSortTitle(sortValue) {

    if (document.forms[0].man250SortKey1.value == sortValue) {

        if (document.forms[0].man250OrderKey1[0].checked == true) {
            document.forms[0].man250OrderKey1[0].checked = false;
            document.forms[0].man250OrderKey1[1].checked = true;
        } else {
            document.forms[0].man250OrderKey1[1].checked = false;
            document.forms[0].man250OrderKey1[0].checked = true;
        }
    } else {
        document.forms[0].man250SortKey1.value = sortValue;
    }
    return false;
}
function moveDay(elm, kbn) {

    systemDate = new Date();
    var year = convYear(systemDate.getFullYear());
    var month = ("0" + (systemDate.getMonth() + 1)).slice(-2);
    var day = ("0" + systemDate.getDate()).slice(-2);

    //「今日ボタン押下」
    if (kbn == 2) {
        $(elm).val(year + "/" + month + "/" + day);
        return;
    }

    //「前日」or 「翌日」ボタン押下
    if (kbn == 1 || kbn == 3) {

        var ymdf = escape($(elm).val());
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

            newDate = new Date(ymdf)
            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getFullYear());
            var systemYear = convYear(systemDate.getFullYear());

            if (newYear < systemYear - 10 || newYear > systemYear) {
                return;
            } else {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(elm).val(year + "/" + month + "/" + day);
            }
        } else {
            if ($(elm).val() == '') {
                $(elm).val(year + "/" + month + "/" + day);
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

/**
 * �e��ʂɖ߂�ۂɃA�N�V�����ɃR�}���h��n���ꍇ
 * cmd �R�}���h
 */
function openGroupWindowForMan250(formOj, selBoxName, myGpFlg, cmd) {

    document.forms[0].man250SltUser.value='-1';
    if (cmd != "") {
        document.forms[0].CMD.value=cmd;
    }
    openGroup(formOj, selBoxName, myGpFlg, "");
    return;
}