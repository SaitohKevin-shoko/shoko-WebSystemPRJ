    function initLoad() {
        hideUsrTimeSelect();
    }

    function hideUsrTimeSelect() {
        if ($('input[name=man420UsrImpFlg]:checked').val() == 0) {
            $("#usrStartTimeSelect").addClass("display_n");
        } else {
            $("#usrStartTimeSelect").removeClass("display_n");
        }
        hideUsrStartTime();
    }

    function hideUsrStartTime() {
        if ($('input[name=man420UsrImpTimeSelect]:checked').val() == 2
                && $('input[name=man420UsrImpFlg]:checked').val() == 1) {
            $("#usrStartTime").removeClass("display_n");
        } else {
            $("#usrStartTime").addClass("display_n");
        }
     }
