function changeTab(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

$(function() {
    /* タブ変更 */
    $('.js_accTabHeader_tab').live("click", function(){
        var showId = $(this).attr('id');
        changeTab(showId);
    });
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
        var id = $(this).parent().data("sid");
        openUserInfoWindow(id);
    });
});