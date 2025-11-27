$(function() {


    $('.ntp_chk').hover(

            function () {
                $(this).removeClass("ntp_chk").addClass("ntp_chk_hover");
              },
            function () {
                $(this).removeClass("ntp_chk_hover").addClass("ntp_chk");
            }
     );

    $('.ntp_chk2').hover(

            function () {
                $(this).removeClass("ntp_chk2").addClass("ntp_chk2_hover");
              },
            function () {
                $(this).removeClass("ntp_chk2_hover").addClass("ntp_chk2");
            }
     );

    /* 案件履歴 hover */
    $('.ankenHistoryArea').hover(
        function () {
            $(this).removeClass("ankenHistoryArea").addClass("ankenHistoryArea_hover");
        },
        function () {
            $(this).removeClass("ankenHistoryArea_hover").addClass("ankenHistoryArea");
        }
    );

    /* 企業・顧客履歴 hover */
    $('.companyHistoryArea').hover(
        function () {
            $(this).removeClass("companyHistoryArea").addClass("companyHistoryArea_hover");
        },
        function () {
            $(this).removeClass("companyHistoryArea_hover").addClass("companyHistoryArea");
        }
    );
});
