function selectPlugin(pluginId, dspId) {
    document.forms[0].plt080pluginId.value=pluginId;
    document.forms[0].ptl080dspId.value=dspId;
    document.forms[0].CMD.value='selectPlugin';
    document.forms[0].submit();
    return false;
}

function closeWindow() {

    var closeFlg = document.forms[0].ptl080selectFlg.value;

    if (closeFlg == 'true') {
        var parentDocument = window.opener.document;
        parentDocument.forms[0].CMD.value = 'init';
        parentDocument.forms[0].submit();
        window.close();
    }

    return false;
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
        var pluginId = $(this).parent().data("pluginid");
        var infoId = $(this).parent().data("infoid");
        selectPlugin(pluginId, infoId);
    });
});
