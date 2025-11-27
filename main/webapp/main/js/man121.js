/* ホバーの処理 */
$(function() {
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
    $(".js_listMenuClick").live("click", function(){
        var cmd = $(this).parent().data('cmd');
        buttonPush(cmd);
    });
});

function editClick(pluginid) {
    document.forms['man121Form'].man120pluginId.value = pluginid;
    document.forms['man121Form'].CMD.value = 'man121edit';
    document.forms['man121Form'].man280backId.value = 'man121';
    document.forms['man121Form'].submit();
    return false;
}

function defaultImg(imgName) {
    document.getElementById(imgName).src="../common/images/spacer.gif";
}