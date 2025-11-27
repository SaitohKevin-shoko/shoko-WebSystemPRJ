function changePage(cmbObj) {
    document.forms[0].anp160NowPage.value=cmbObj.options[cmbObj.selectedIndex].value;
    document.forms[0].CMD.value='anp160pageChange';
    document.forms[0].submit();
}