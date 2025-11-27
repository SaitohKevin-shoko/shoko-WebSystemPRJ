function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function checkValue(id) {
    var sort1 = document.forms[0].usr041SortKey1.value;
    var sort2 = document.forms[0].usr041SortKey2.value;
    //第1キーが変更された場合
    if (id == 1) {
        //重複した場合第2キーの値を変更
        if (sort1 == sort2) {
            if (sort1 == 1) {
                document.forms[0].usr041SortKey2.value = "2";
            } else {
                document.forms[0].usr041SortKey2.value = "1";
            }
        }
    //第2キーが変更された場合
    } else {
        //重複した場合第1キーの値を変更
        if (sort1 == sort2) {
            if (sort1 == 1) {
                document.forms[0].usr041SortKey1.value = "2";
            } else {
                document.forms[0].usr041SortKey1.value = "1";
            }
        }
    }
}