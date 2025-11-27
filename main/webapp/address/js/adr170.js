var projectSubWindow;

function openProjectWindow(parentPageId) {
    var winWidth=900;
    var winHeight=700;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var url = '../project/prj210.do';
    url += '?prj210parentPageId=' + parentPageId;
    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    projectSubWindow = window.open(url, 'thissite', opt);
    return false;
}

function projectWindowClose() {
    if(projectSubWindow != null){
        projectSubWindow.close();
    }
}

function moveDay(elmYear, elmMonth, elmDay, kbn) {

    systemDate = new Date();

    if (kbn == 2) {
        $(elmYear).val(convYear(systemDate.getYear()));
        $(elmMonth).val(systemDate.getMonth() + 1);
        $(elmDay).val(systemDate.getDate());
        return;
    }

    if (kbn == 1 || kbn == 3) {

        var ymdf = escape(elmYear.value + '/' + elmMonth.value + "/" + elmDay.value);
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

            newDate = new Date(elmYear.value, elmMonth.value - 1, elmDay.value)

            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getYear());
            var systemYear = convYear(systemDate.getYear());

            if (newYear < systemYear - 5 || newYear > systemYear + 5) {
                $(elmYear).val('');
            } else {
                $(elmYear).val(newYear);
            }

            $(elmMonth).val(newDate.getMonth() + 1);
            $(elmDay).val(newDate.getDate());

        } else {

            if (elmYear.value == '' && elmMonth.value == '' && elmDay.value == '') {
                $(elmYear).val(convYear(systemDate.getYear()));
                $(elmMonth).val(systemDate.getMonth() + 1);
                $(elmDay).val(systemDate.getDate());
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

function changeGroupCombo(cmd) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function deleteProject(projectSid) {
    document.forms['adr170Form'].CMD.value = 'deleteProject';
    document.forms['adr170Form'].adr170delProjectSid.value = projectSid;
    document.forms['adr170Form'].submit();
    return false;
}
