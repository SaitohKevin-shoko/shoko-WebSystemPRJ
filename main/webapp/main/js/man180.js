    function setDispState() {

        var batchKbn = 0;
        for (i = 0; i < document.forms[0].man180BatchKbn.length; i++) {
            if (document.forms[0].man180BatchKbn[i].checked == true) {
                batchKbn = i;
            }
        }
        var batchKbnVal = document.forms[0].man180BatchKbn[batchKbn].value;

        //自動削除 = 設定しない
        if (batchKbnVal == 0) {

            document.forms[0].man180Year.disabled = true;
            document.forms[0].man180Year.style.backgroundColor = '#e0e0e0';
            document.forms[0].man180Month.disabled = true;
            document.forms[0].man180Month.style.backgroundColor = '#e0e0e0';

        //自動削除 = 設定する
        } else {

            document.forms[0].man180Year.disabled = false;
            document.forms[0].man180Year.style.backgroundColor = '#ffffff';
            document.forms[0].man180Month.disabled = false;
            document.forms[0].man180Month.style.backgroundColor = '#ffffff';

        }
    }