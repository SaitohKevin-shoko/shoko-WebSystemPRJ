function sortChange(sort, order) {
    document.forms[0].bmk070SortKey.value = sort;
    document.forms[0].bmk070OrderKey.value = order;

    buttonPush('init');
}
function buttonPushUser(usrSid) {
    document.forms[0].bmk010userSid.value = usrSid;
    document.forms[0].bmk010mode.value = 0;

    document.getElementById('userBookmark').innerHTML = '';
    buttonPush('bmk010back');
}
function bmkAdd(bmuSid, retScrType) {
    document.forms[0].procMode.value = 0;
    document.forms[0].editBmuSid.value = bmuSid;
    if (retScrType == 0) {
        document.forms[0].bmk070ReturnPage.value = 'bmk070';
    } else if (retScrType == 1) {
        document.forms[0].bmk070ReturnPage.value = 'bmk150';
    }

    buttonPush('bmkAdd');
}
function bmkEdit(bmkSid, retScrType) {
    document.forms[0].procMode.value = 1;
    document.forms[0].editBmkSid.value = bmkSid;
    if (retScrType == 0) {
        document.forms[0].bmk070ReturnPage.value = 'bmk070';
    } else if (retScrType == 1) {
        document.forms[0].bmk070ReturnPage.value = 'bmk150';
    }
    buttonPush('bmkEdit');
}
function changePage(pageCombo) {
    if (pageCombo == 0) {
        document.forms[0].bmk070PageBottom.value = document.forms[0].bmk070PageTop.value;
    } else {
        document.forms[0].bmk070PageTop.value = document.forms[0].bmk070PageBottom.value; 
    }
    buttonPush('changePage');
}
