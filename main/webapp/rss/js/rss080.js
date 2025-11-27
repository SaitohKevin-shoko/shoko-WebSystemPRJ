function sort(sortKey, orderKey) {
    document.forms[0].rss080sortKey.value = sortKey;
    document.forms[0].rss080orderKey.value = orderKey;
    buttonPush('init');
}

function changePage(pageCombo) {
    if (pageCombo == 0) {
        document.forms[0].rss080page2.value=document.forms[0].rss080page1.value;
    } else {
        document.forms[0].rss080page1.value=document.forms[0].rss080page2.value; 
    }
    document.forms[0].CMD.value='changePage';
    document.forms[0].submit();
    return false;
}

function rssDel(rssSid, rssTitle) {
    document.forms[0].CMD.value='delRss';
    document.forms[0].rssSid.value=rssSid;
    document.forms[0].rssTitle.value=rssTitle;
    document.forms[0].submit();
    return false;
}