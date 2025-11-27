function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='tcd040_search';
    document.forms[0].tcd040SortKey.value = fid;
    document.forms[0].tcd040OrderKey.value = order;
    document.forms[0].submit();
    return false;
}

function onHolidayLinkSubmit(fid, order, sid) {
    document.forms[0].CMD.value='tcd040_search';
    document.forms[0].tcd040SortKey.value = fid;
    document.forms[0].tcd040OrderKey.value = order;
    document.forms[0].tcd040SortKeyHoliday.value = sid;
    document.forms[0].submit();
    return false;
}