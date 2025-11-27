function buttonPushSetting() {
    document.forms['bmkmain010Form'].returnPage.value = 'main';
    document.forms['bmkmain010Form'].CMD.value='bmkSetting';
    document.forms['bmkmain010Form'].submit();
    return false;
}

function selPerCount(bmuSid) {
    document.forms['bmkmain010Form'].editBmuSid.value = bmuSid;
    document.forms['bmkmain010Form'].returnPage.value = 'main';
    document.forms['bmkmain010Form'].CMD.value='commentList';
    document.forms['bmkmain010Form'].submit();
    return false;
}