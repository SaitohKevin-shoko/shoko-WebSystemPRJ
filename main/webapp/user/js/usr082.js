function lmtEnableDisable() {
    var ctext = $('#js_lmtinput')[0];
    if (document.forms[0].usr082DefoDspKbn[1].checked) {
        ctext.setAttribute('class', 'textError');
    } else {
        ctext.setAttribute('class', 'display_n');
    }
}

function checkValue(id) {
    var sort1 = document.forms[0].usr082AdSortKey1.value;
    var sort2 = document.forms[0].usr082AdSortKey2.value;
    //第1キーが変更された場合
    if (id == 1) {
        //重複した場合第2キーの値を変更
        if (sort1 == sort2) {
            if (sort1 == 1) {
                document.forms[0].usr082AdSortKey2.value = "2";
            } else {
                document.forms[0].usr082AdSortKey2.value = "1";
            }
        }
    //第2キーが変更された場合
    } else {
        //重複した場合第1キーの値を変更
        if (sort1 == sort2) {
            if (sort1 == 1) {
                document.forms[0].usr082AdSortKey1.value = "2";
            } else {
                document.forms[0].usr082AdSortKey1.value = "1";
            }
        }
    }
}
