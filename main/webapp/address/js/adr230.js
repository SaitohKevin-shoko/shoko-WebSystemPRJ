function selectCompany(code) {

    window.opener.document.forms[0].adr110coCode.value = code;
    window.close();
}

function changePage(id){
    if (id == 1) {
        document.forms[0].adr230PageTop.value=document.forms[0].adr230PageBottom.value;
    }
    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].adr230SortKey.value = fid;
    document.forms[0].adr230OrderKey.value = order;
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
        var sid = $(this).parent().attr("id");
        selectCompany(sid);
    });
    /* radio:click */
    $(".js_tableTopCheck").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});