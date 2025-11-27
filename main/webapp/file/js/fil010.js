function CreateCabinet() {
    document.forms[0].cmnMode.value='0';
    document.forms[0].backDsp.value='fil010';
    document.forms[0].CMD.value='fil010addCabinet';
    document.forms[0].submit();
    return false;
}

function CreateMyCabinet() {
    document.forms[0].cmnMode.value='0';
    document.forms[0].fil010DspCabinetKbn.value='1';
    document.forms[0].backDsp.value='fil010';
    document.forms[0].CMD.value='fil010addCabinet';
    document.forms[0].submit();
    return false;
}

function CabinetDetail(cabSid) {
    document.forms[0].cmnMode.value='1';
    document.forms[0].backDsp.value='fil010';
    document.forms[0].fil010SelectCabinet.value=cabSid;
    document.forms[0].CMD.value='fil010cabinetDetail';
    document.forms[0].submit();
    return false;
}

function personalCabinetDetail(cabSid) {
    document.forms[0].cmnMode.value='1';
    document.forms[0].backDsp.value='fil010';
    document.forms[0].detailCabinet.value='1';
    document.forms[0].fil010SelectCabinet.value=cabSid;
    document.forms[0].CMD.value='fil010cabinetDetail';
    document.forms[0].submit();
    return false;
}

function ChangeCabinet(kbn) {
    document.forms[0].backDsp.value='fil010';
    document.forms[0].CMD.value='fil010chnageCabinet';
    document.forms[0].fil010DspCabinetKbn.value=kbn;
    document.forms[0].submit();
    return false;
}

function MoveToRootFolderList(cabSid, dirSid) {
    document.forms[0].backDsp.value='fil010';
    document.forms[0].fil010SelectCabinet.value=cabSid;
    document.forms[0].fil010SelectDirSid.value=dirSid;
    document.forms[0].CMD.value='fil010folderList';
    document.forms[0].submit();
    return false;
}
function MoveToFolderList(cabSid, dirSid) {
    document.forms[0].backDsp.value='fil010';
    document.forms[0].fil010SelectCabinet.value=cabSid;
    document.forms[0].fil010SelectDirSid.value=dirSid;
    document.forms[0].CMD.value='fil010folderList';
    document.forms[0].submit();
    return false;
}

function DeleteToShortCut() {
    document.forms[0].CMD.value='fil010scDelete';
    document.forms[0].submit();
    return false;
}

function MoveToSearch() {
    document.forms[0].CMD.value='fil010search';
    document.forms[0].backDsp.value='fil010';
    document.forms[0].submit();
    return false;
}

function MoveToFolderDetail(dirSid) {
    document.forms[0].CMD.value='fil010folderDetail';
    document.forms[0].backDspLow.value='fil010';
    document.forms[0].fil050DirSid.value=dirSid;
    document.forms[0].submit();
    return false;
}

function MoveToFileDetail(cabSid, dirSid) {
    document.forms[0].CMD.value='fil010fileDetail';
    document.forms[0].backDspLow.value='fil010';
    document.forms[0].fil070DirSid.value=dirSid;
    document.forms[0].fil010SelectCabinet.value=cabSid;
    document.forms[0].fil010SelectDirSid.value=dirSid;
    document.forms[0].submit();
    return false;
}

function MoveToCallList() {
    document.forms[0].CMD.value='fil010callList';
    document.forms[0].backDspCall.value='fil010';
    document.forms[0].submit();
    return false;
}

function selectCabinet() {
    var dspCabinet = $('input[name="fil010DspCabinetKbn"]').val();
    $("#" + dspCabinet).removeClass("searchMenu_title");
    $("#" + dspCabinet).addClass("searchMenu_title-select");
}

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

   $(document).on("click", ".js_listClick", function(){
       var fcbSid = $(this).parent().data("fcbsid");
       var rootDirSid = $(this).parent().data("rootsid");
       MoveToRootFolderList(fcbSid, rootDirSid);
   });

    $(document).on("click", ".js_search_menu_title", function() {
        var cabnetKbn = $(this).attr("id");
        ChangeCabinet(cabnetKbn);
    });
});