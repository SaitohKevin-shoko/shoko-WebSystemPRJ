function wml290SelectDestlist(destId) {
    document.forms['wml290Form'].wmlEditDestList.value = destId;
    document.forms['wml290Form'].wml290initFlg.value = 0;
    buttonPush('init');
}

function setWml290WebmailData() {
    //ユーザ情報
    var addressAtsk = document.getElementsByName('wml290Atsk');
    var addressCc = document.getElementsByName('wml290Cc');
    var addressBcc = document.getElementsByName('wml290Bcc');
    setWebmailAddress2(addressAtsk, addressCc, addressBcc, 'wml290SetMailMsg');
}

$(function(){
    /* hover */
    $('.js_listHover').live({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });
    /* hover:click */
    $(".js_listClick").live("click", function(){
        var sid = $(this).parent().data("sid");
        wml290SelectDestlist(sid);
    });

    /* hover:click(destList) */
    $(".js_listClick_Detail").live("click", function(){
        var checkObj = $('#' + $(this).parent().data("sid"));
        checkObj.prop('checked', !checkObj.is(':checked'));
    });

    $('.js_tableTopCheck-header').live("change",function() {
        chgCheckAll('wml290AllCheck', 'wml280destUserSelect');
    });

//    $(".js_tableTopCheck").live("click", function(){
//        var checkObj = $(this).children();
//        checkObj.prop('checked', !checkObj.is(':checked'));
//    });
});
