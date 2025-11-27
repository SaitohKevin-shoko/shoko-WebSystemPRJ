function changePage(cmbObj) {
    document.forms[0].anp170NowPage.value=cmbObj.options[cmbObj.selectedIndex].value;
    document.forms[0].CMD.value='anp170pageChange';
    document.forms[0].submit();
}

function setfocus(){
    if (document.forms[0].anp170ScrollFlg.value == '1') {
        window.location.hash='js_label_sender';
    }
}

function sortList(colIndex, order) {
    if (document.forms[0].anp170SortKeyIndex.value != colIndex) {
        document.forms[0].anp170OrderKey.value=1;
    }
    document.forms[0].anp170SortKeyIndex.value=colIndex;
    document.forms[0].CMD.value='anp170sortList';
    document.forms[0].submit();
}