function bmkmain020buttonPush(cmd){
    document.forms['bmkmain020Form'].CMD.value=cmd;
    document.forms['bmkmain020Form'].returnPage.value = 'main';
    document.forms['bmkmain020Form'].submit();
    return false;
}

function bmkmain020buttonPushAdd(bmuSid) {
    document.forms['bmkmain020Form'].procMode.value = 0;
    document.forms['bmkmain020Form'].editBmuSid.value = bmuSid;
    document.forms['bmkmain020Form'].returnPage.value = 'main';

    document.forms['bmkmain020Form'].CMD.value='bmkmain020add';
    document.forms['bmkmain020Form'].submit();
    return false;
}

function bmkmain020selPerCount(bmuSid) {
    document.forms['bmkmain020Form'].editBmuSid.value = bmuSid;
    document.forms['bmkmain020Form'].returnPage.value = 'main';

    document.forms['bmkmain020Form'].CMD.value='bmkmain020cmt';
    document.forms['bmkmain020Form'].submit();
    return false;
}

/* ホバーの処理 */
$(function() {
     /* hover */
    $('.js_listHover')
        .mouseenter(function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        })
        .mouseleave(function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        });

    /* hover:click */
    $(document).on("click", ".js_listBmkListClick", function(){
        bmkmain020buttonPush('bmkmain020newbookmark');
    });
});