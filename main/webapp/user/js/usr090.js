function selectUid(uid) {

    var uidNumber = document.forms[0].targetUidNumber.value;
    if (uidNumber == 1) {
        window.opener.document.forms[0].usr031CmuUid1.value = uid;
    } else if (uidNumber == 2) {
        window.opener.document.forms[0].usr031CmuUid2.value = uid;
    } else if (uidNumber == 3) {
        window.opener.document.forms[0].usr031CmuUid3.value = uid;
    }

    window.close();
}

function changePage(id){
    if (id == 1) {
        document.forms[0].usr090PageTop.value=document.forms[0].usr090PageBottom.value;
    }
    document.forms[0].CMD.value='pageChange';
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].usr090SortKey.value = fid;
    document.forms[0].usr090OrderKey.value = order;
    document.forms[0].submit();
    return false;
}

$(function() {

    /* hover:click */
    $(".js_listClick").live("click", function(){
        var sid = $(this).parent().attr("id");
        selectUid(sid);
    });

    /* hover */
    $('.js_listHover').live({
        mouseenter : function(e) {
        $(this).children().addClass("list_content-on");
        $(this).prev().children().addClass("list_content-topBorder");
      },
        mouseleave : function(e) {
        $(this).children().removeClass("list_content-on");
        $(this).prev().children().removeClass("list_content-topBorder");
        }
    });
});