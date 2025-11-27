function fil070TitleClick(sortKey, orderKey) {

    document.forms[0].fil070OrderKey.value=orderKey;
    document.forms[0].fil070SortKey.value=sortKey;
    document.forms[0].CMD.value='titleClick';
    document.forms[0].submit();
    return false;
}

function fil070RepairClick(dirSid, version) {
    document.forms[0].fil070SltDirSid.value=dirSid;
    document.forms[0].fil070SltDirVer.value=version;
    document.forms[0].CMD.value='repairClick';
    document.forms[0].submit();
    return false;
}

function fil070TabChange(cmd, mode) {

    document.forms[0].CMD.value=cmd;
    document.forms[0].fil070DspMode.value=mode
    if (mode == '0') {
        document.forms[0].fil070OrderKey.value='1';
        document.forms[0].fil070SortKey.value='0';
    } else {
        document.forms[0].fil070OrderKey.value='0';
        document.forms[0].fil070SortKey.value='1';
    }
    document.forms[0].submit();
    return false;
}
function fil070changePage(id){
    if (id == 1) {
        document.forms[0].fil070PageNum2.value = document.forms[0].fil070PageNum1.value;
    } else {
        document.forms[0].fil070PageNum1.value = document.forms[0].fil070PageNum2.value;
    }

    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
    return false;
}

function MoveToFileEdit(dirSid) {
    document.forms[0].CMD.value='fil070edit';
    document.forms[0].fil070DirSid.value=dirSid;
    document.forms[0].submit();
    return false;
}
function MoveToFolderDsp() {
    document.forms[0].CMD.value='fil070dsp';
    document.forms[0].fil010SelectDirSid.value=document.forms[0].fil070ParentDirSid.value;
    document.forms[0].submit();
    return false;
}

$(function(){
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
        var sid = $(this).closest(".js_listHover").data("sid");
        fileDl('fileDownload', sid);
    });
});
