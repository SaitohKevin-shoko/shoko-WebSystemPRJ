function changePage(pageCombo) {
    if (pageCombo == 1) {
        document.forms[0].rss090page2.value=document.forms[0].rss090page1.value;
    } else {
        document.forms[0].rss090page1.value=document.forms[0].rss090page2.value; 
    }
    document.forms[0].CMD.value='changePage';
    document.forms[0].submit();
    return false;
}
