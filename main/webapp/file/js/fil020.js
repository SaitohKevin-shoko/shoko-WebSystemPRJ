function fil020TitleClick(sortKey, orderKey) {

    document.forms[0].fil020OrderKey.value=orderKey;
    document.forms[0].fil020SortKey.value=sortKey;
    document.forms[0].CMD.value='titleClick';
    document.forms[0].submit();
    return false;
}

function fil020RepairClick(dirSid, version) {
    document.forms[0].fil020SltDirSid.value=dirSid;
    document.forms[0].fil020SltDirVer.value=version;
    document.forms[0].CMD.value='fil020rest';
    document.forms[0].submit();
    return false;
}

function fil020TabChange(cmd, mode) {

    document.forms[0].CMD.value=cmd;
    document.forms[0].fil020DspMode.value=mode;
    if (mode == '0') {
      document.forms[0].fil020OrderKey.value='1';
    } else {
    document.forms[0].fil020OrderKey.value='0';
    }
    document.forms[0].fil020SortKey.value='1';
    document.forms[0].submit();
    return false;
}

function fil020CabinetEdit(cmd) {

    document.forms[0].CMD.value=cmd;
    document.forms[0].backDsp.value='fil020';
    document.forms[0].fil030SelectCabinet.value=document.forms[0].fil010SelectCabinet.value;
    document.forms[0].submit();
    return false;
}
function fil020changePage(id){
    if (id == 1) {
        document.forms[0].fil020Slt_page2.value = document.forms[0].fil020Slt_page1.value;
    } else {
        document.forms[0].fil020Slt_page1.value = document.forms[0].fil020Slt_page2.value;
    }
    document.forms[0].CMD.value='pageChange';
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