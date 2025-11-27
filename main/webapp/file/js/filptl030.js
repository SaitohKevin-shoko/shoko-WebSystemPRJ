function MoveToRootFolderListForPtl030(cabSid, dirSid) {
    document.forms['filptl030Form'].backDsp.value='main';
    document.forms['filptl030Form'].fil010SelectCabinet.value=cabSid;
    document.forms['filptl030Form'].fil010SelectDirSid.value=dirSid;
    document.forms['filptl030Form'].CMD.value='selectCabinet';
    document.forms['filptl030Form'].submit();
    return false;
}
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
$(document).on("click", ".js_listFileClick", function(){
    var cabSid = $(this).parent().data('cabsid');
    var dirSid = $(this).parent().data('dirsid');
    MoveToRootFolderListForPtl030(cabSid, dirSid);
});