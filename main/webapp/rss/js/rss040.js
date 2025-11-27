function rssAdd(rssSid, rssTitle) {
    document.forms[0].CMD.value='rssAdd';
    document.forms[0].rssSid.value=rssSid;
    document.forms[0].rss040feedTitle.value=rssTitle;
    document.forms[0].submit();
    return false;
}

function changePage(pageCombo) {
    if (pageCombo == 0) {
        document.forms[0].rss040page2.value=document.forms[0].rss040page1.value;
    } else {
        document.forms[0].rss040page1.value=document.forms[0].rss040page2.value; 
    }
    document.forms[0].CMD.value='changePage';
    document.forms[0].submit();
    return false;
}
