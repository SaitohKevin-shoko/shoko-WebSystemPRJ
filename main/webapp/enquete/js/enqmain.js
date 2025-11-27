function ansEnquete(enqSid,initFlg) {

    var ele = document.createElement('input');

    document.forms['enqmainForm'].CMD.value='enqmainAnswer';
    document.forms['enqmainForm'].ansEnqSid.value=enqSid;
    document.forms['enqmainForm'].enq010initFlg.value=initFlg;
    document.forms['enqmainForm'].submit();
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
    $(document).on("click", ".js_listEnqClick", function(){
        var id = $(this).parent().attr("id");
        ansEnquete(id , 1);
    });
});
