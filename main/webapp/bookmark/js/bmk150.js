function bmkAdd(bmuSid) {
    document.forms[0].procMode.value = 0;
    document.forms[0].editBmuSid.value = bmuSid;
    document.forms[0].bmk070ReturnPage.value = 'bmk150';

    buttonPush('bmkAdd');
}

function selPerCount(bmuSid) {
    document.forms[0].editBmuSid.value = bmuSid;
    document.forms[0].bmk070ReturnPage.value = 'bmk150';

    buttonPush('commentList');
}

function changePage1() {
    document.forms[0].CMD.value='changePage';
    for (i = 0; i < document.forms[0].bmk150Slt_page1.length; i++) {
        if (document.forms[0].bmk150Slt_page1[i].selected) {
            document.forms[0].bmk150Slt_page2.value=document.forms[0].bmk150Slt_page1[i].value;
            document.forms[0].bmk150PageNum.value=document.forms[0].bmk150Slt_page1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function changePage2() {
    document.forms[0].CMD.value='changePage';
    for (i = 0; i < document.forms[0].bmk150Slt_page2.length; i++) {
        if (document.forms[0].bmk150Slt_page2[i].selected) {
            document.forms[0].bmk150Slt_page1.value=document.forms[0].bmk150Slt_page2[i].value;
            document.forms[0].bmk150PageNum.value=document.forms[0].bmk150Slt_page2[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}