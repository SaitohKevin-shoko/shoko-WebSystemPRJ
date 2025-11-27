function changePage1() {
    document.forms[0].CMD.value='init';
    for (i = 0; i < document.forms[0].fil240Slt_page1.length; i++) {
        if (document.forms[0].fil240Slt_page1[i].selected) {
            document.forms[0].fil240Slt_page2.value=document.forms[0].fil240Slt_page1[i].value;
            document.forms[0].fil240PageNum.value=document.forms[0].fil240Slt_page1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function changePage2() {
    document.forms[0].CMD.value='init';
    for (i = 0; i < document.forms[0].fil240Slt_page2.length; i++) {
        if (document.forms[0].fil240Slt_page2[i].selected) {
            document.forms[0].fil240Slt_page1.value=document.forms[0].fil240Slt_page2[i].value;
            document.forms[0].fil240PageNum.value=document.forms[0].fil240Slt_page2[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function MoveToFileDetail(dirSid) {
    document.forms[0].CMD.value='fil240fileDetail';
    document.forms[0].backDspLow.value='fil240';
    document.forms[0].fil070DirSid.value=dirSid;
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
    $(".js_listClick").live("click", function(e){
        //プレビューアイコン押下時、ダウンロードを実行しない
        if (e.target.className == 'btn_classicImg-display' || e.target.className == 'btn_originalImg-display') {
            return;
        }
        
        var kbn = $(this).parent().data("sid");
        if (kbn != 0) {
        var sid = $(this).parent().data("sid");
            fileDl('fileDownload', $(this).parent().data("binsid"));
        } else {
            MoveToFileDetail($(this).parent().data("sid"));
        }
    });
});