function MoveToFolderList(cabSid,rootDirSid) {
    document.forms[0].filptl050selectFcbSid.value=cabSid;
    document.forms[0].filptl050selectDirSid.value=rootDirSid;
    document.forms[0].CMD.value='selectCabinet';
    document.forms[0].submit();
    return false;
}

function closeWindow() {

    var closeFlg = document.forms[0].filptl050selectFlg.value;

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
        var fcbSid = $(this).parent().data("fcbsid");
        var dirSid = $(this).parent().data("dirsid");
        MoveToFolderList(fcbSid, dirSid);
    });
});

