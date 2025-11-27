function changePage(id){
    if (id == 1) {
        document.forms[0].adr160pageNum2.value=document.forms[0].adr160pageNum1.value;
    } else {
        document.forms[0].adr160pageNum1.value=document.forms[0].adr160pageNum2.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].sortKey.value = fid;
    document.forms[0].orderKey.value = order;
    document.forms[0].submit();
    return false;
}

function buttonSubmit(cmd, mode, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].adr160ProcMode.value=mode;
    document.forms[0].adr160EditSid.value=sid;
    document.forms[0].submit();
    return false;
}

function editAddress(procMode, adrSid) {
    document.forms[0].adr020ProcMode.value = procMode;
    document.forms[0].adr010EditAdrSid.value = adrSid;
    document.forms[0].adr020BackId.value = 'adr160';
    buttonPush('editAdrData');
}

$(function() {
	/* メール 行  hover */
    $('.js_listHover').on({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

    $(document).on('click', '.js_listHover', function() {
        var select = $(this).attr('id');
        /* submitするかチェックする */
        buttonSubmit('adr161', 1, select);
    });


});