
function MoveToFolderList(cabSid, dirSid) {
    document.forms['filMainForm'].backDsp.value='main';
    document.forms['filMainForm'].fil010SelectCabinet.value=cabSid;
    document.forms['filMainForm'].fil010SelectDirSid.value=dirSid;
    document.forms['filMainForm'].CMD.value='filMainFolderList';
    document.forms['filMainForm'].submit();
    return false;
}

function MoveToFolderDetail(dirSid) {
    document.forms['filMainForm'].CMD.value='filMainFolderDetail';
    document.forms['filMainForm'].backDspLow.value='main';
    document.forms['filMainForm'].fil050DirSid.value=dirSid;
    document.forms['filMainForm'].submit();
    return false;
}

function MoveToFileDetail(cabSid, dirSid) {
    document.forms['filMainForm'].CMD.value='filMainFileDetail';
    document.forms['filMainForm'].backDspLow.value='main';
    document.forms['filMainForm'].fil070DirSid.value=dirSid;
    document.forms['filMainForm'].fil010SelectCabinet.value=cabSid;
    document.forms['filMainForm'].fil010SelectDirSid.value=dirSid;
    document.forms['filMainForm'].submit();
    return false;
}

function fileDow(cmd, binSid){
    document.forms['filMainForm'].CMD.value=cmd;
    document.forms['filMainForm'].fileSid.value=binSid
    document.forms['filMainForm'].submit();
    return false;
}

function MoveToCallList() {
    document.forms['filMainForm'].CMD.value='filMainCallList';
    document.forms['filMainForm'].backDspCall.value='main';
    document.forms['filMainForm'].submit();
    return false;
}
function MoveToPconf() {
    document.forms['filMainForm'].CMD.value='filMainPconf';
    document.forms['filMainForm'].backMainFlg.value='1';
    document.forms['filMainForm'].submit();
    return false;
}

function stopDownload(e) {
    e.stopPropagation();
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
    $(document).on("click", ".js_listFileScClick", function(){
        var cabSid = $(this).parent().data('cabsid');
        var dirSid = $(this).parent().data('dirsid');
        MoveToFolderList(cabSid, dirSid);
    });
    /* hover:click */
    $(document).on("click", ".js_listFileDlClick", function(e){
        //プレビューアイコン押下時、ダウンロードを実行しない
        if (e.target.className == 'btn_classicImg-display' || e.target.className == 'btn_originalImg-display') {
            return;
        }
        var binSid = $(this).parent().data('binsid');
        fileDow("fileKanriFileDownload", binSid);
    });
    /* hover:click */
    $(document).on("click", ".js_listFileUpdFolderClick", function(){
        var cabSid = $(this).parent().data('cabsid');
        var dirSid = $(this).parent().data('dirsid');
        MoveToFolderDetail(cabSid, dirSid);
    });
    /* hover:click */
    $(document).on("click", ".js_listFileUpdFileClick", function(e){
        //プレビューアイコン押下時、ダウンロードを実行しない
        if (e.target.className == 'btn_classicImg-display' || e.target.className == 'btn_originalImg-display') {
            return;
        }
        var cabSid = $(this).parent().data('cabsid');
        var dirSid = $(this).parent().data('dirsid');
        MoveToFileDetail(cabSid, dirSid);
    });
    /* hover:click */
    $(document).on("click", ".js_listFileListClick", function(){
        MoveToCallList();
    });
});
