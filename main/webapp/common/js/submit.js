//日本語
    var submitFlg = false;

    function onControlSubmit(){
        if (!submitFlg) {
            submitFlg = true;
            return true;
        } else {
            alert(msglist.waitForWhile);
        }
        return false;
    }