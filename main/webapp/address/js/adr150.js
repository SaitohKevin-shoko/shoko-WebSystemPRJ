function selectCompany(acoSid, abaSid) {
    document.forms[0].adr020selectCompany.value = acoSid;
    document.forms[0].adr020selectCompanyBase.value = abaSid;
    buttonPush('backInputAddress');
}

function changePage(pageCmbName) {
    setPageParam('adr150page', pageCmbName);

    buttonPush('init');
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].adr150SortKey.value = fid;
    document.forms[0].adr150OrderKey.value = order;
    document.forms[0].submit();
    return false;
}
