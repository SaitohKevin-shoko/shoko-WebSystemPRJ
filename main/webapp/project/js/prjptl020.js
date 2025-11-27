function selectProject(prjSid) {
    document.forms[0].prjptl020selectPrjSid.value=prjSid;
    document.forms[0].CMD.value='selectProject';
    document.forms[0].submit();
    return false;
}

function closeWindow() {

    var closeFlg = document.forms[0].prjptl020selectFlg.value;

    if (closeFlg == 'true') {
        var parentDocument = window.opener.document;
        parentDocument.forms[0].CMD.value = 'init';
        parentDocument.forms[0].submit();
        window.close();
    }

    return false;
}

function changePageBottom() {
    document.forms[0].prjptl020pageTop.value=document.forms[0].prjptl020pageBottom.value;
    document.forms[0].submit();
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
        var sid = $(this).parent().data("sid");
        selectProject(sid);
    });
});
