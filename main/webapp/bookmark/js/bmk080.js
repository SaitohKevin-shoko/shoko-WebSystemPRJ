function bmkAdd(bmuSid) {
    document.forms[0].procMode.value = 0;
    document.forms[0].editBmuSid.value = bmuSid;
    document.forms[0].returnPage.value = 'bmk080';

    buttonPush('bmkAdd');
}

function selPerCount(bmuSid) {
    document.forms[0].editBmuSid.value = bmuSid;
    document.forms[0].returnPage.value = 'bmk080';

    buttonPush('commentList');
}

function changePage(pageCombo) {
    if (pageCombo == 0) {
        document.forms[0].bmk080PageBottom.value = document.forms[0].bmk080PageTop.value;
    } else {
        document.forms[0].bmk080PageTop.value = document.forms[0].bmk080PageBottom.value; 
    }
    buttonPush('changePage');
}
