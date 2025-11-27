function onTitleLinkSubmit(fid, order) {
    document.forms[0].usr012SortKey.value = fid;
    document.forms[0].usr012OrderKey.value = order;
    document.forms[0].submit();
    return false;
}
