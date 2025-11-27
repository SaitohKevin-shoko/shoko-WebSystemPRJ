function fileDLfilptl(cmd, binSid, fcbSid, filFormId) {

    document.getElementById(filFormId).elements['CMD'].value = cmd;
    document.getElementById(filFormId).elements['fileSid'].value = binSid;
    document.getElementById(filFormId).elements['fil010SelectCabinet'].value = fcbSid;
    document.getElementById(filFormId).submit();

}

function MoveToDirectory(cmd, cabinetSid, directorySid, filFormId){

    document.getElementById(filFormId).elements['CMD'].value = cmd;
    document.getElementById(filFormId).elements['backDsp'].value = 'main';
    document.getElementById(filFormId).elements['fil010SelectCabinet'].value = cabinetSid;
    document.getElementById(filFormId).elements['fil010SelectDirSid'].value = directorySid;
    document.getElementById(filFormId).submit();

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
    $(document).on("click", ".js_listFil040FrdClick", function(){
        var fcbsid = $(this).parent().data("fcbsid");
        var fdrsid = $(this).parent().data("fdrsid");
        var formid = $(this).parent().data("formid");
        MoveToDirectory('filptlSelectFolder',fcbsid, fdrsid, formid);
    });
    /* hover:click */
    $(document).on("click", ".js_listFil040Click", function(e){
        //プレビューアイコン押下時、ダウンロードを実行しない
        if (e.target.className == 'btn_classicImg-display' || e.target.className == 'btn_originalImg-display') {
            return;
        }

        var sid = $(this).parent().data("sid");
        var formid = $(this).parent().data("formid");
        var fcbsid = $(this).parent().data("fcbsid");
        fileDLfilptl('fileDownload', sid, fcbsid, formid);
    });
});