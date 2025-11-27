
function addYukyu(){
    document.forms[0].CMD.value='add';
    document.forms[0].tcd200Name.value=0;
    document.forms[0].tcd200Group.value=document.forms[0].tcd190group.value;
    document.forms[0].tcd200Nendo.value=document.forms[0].tcd190nendo.value;
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='tcd190_search';
    document.forms[0].tcd190sortKey.value = fid;
    document.forms[0].tcd190order.value = order;
    document.forms[0].submit();
    return false;
}

function changeCombo() {
    document.forms[0].CMD.value='redraw';
    document.forms[0].submit();
    return false;
}

/* ページング next */
function changePageNext(){
    document.forms[0].CMD.value='page_right';
    document.forms[0].submit();
    return false;
}

/* ページング prev */
function changePagePrev(){
    document.forms[0].CMD.value='page_left';
    document.forms[0].submit();
    return false;
}

/*hover */
$('.js_listHover').live({
    mouseenter:function () {
        $(this).children().addClass("list_content-on");
        $(this).prev().children().addClass("list_content-topBorder");
    },
    mouseleave:function () {
        $(this).children().removeClass("list_content-on");
        $(this).prev().children().removeClass("list_content-topBorder");
    }
});

$('.js_yukyu-line').live({
    click:function () {
        document.forms[0].CMD.value='add';
        document.forms[0].tcd200Name.value= $(this).find(".js_userSid").val();
        document.forms[0].tcd200Group.value=document.forms[0].tcd190group.value;
        document.forms[0].tcd200Nendo.value=document.forms[0].tcd190nendo.value;
        document.forms[0].submit();
        return false;
    }
});

$('.js_paging_combo').live({
    change:function () {
        $("select[name='tcd190page']").val($(this).val());
        document.forms[0].CMD.value='redraw';
        document.forms[0].submit();
        return false;
    }
});
