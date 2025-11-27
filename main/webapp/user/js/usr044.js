function buttonSubmit(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].usr044ProcMode.value=1;
    document.forms[0].usr043EditSid.value=sid;
    document.forms[0].submit();
    return false;
}

function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].usr044ProcMode.value=0;
    document.forms[0].submit();
    return false;
}

function changeChk(){
    var chkFlg;
    if (document.forms[0].allCheck.checked) {
        chkFlg = true;
    } else {
        chkFlg = false;
    }
    delAry = document.getElementsByName("selectLabel");
    for(i = 0; i < delAry.length; i++) {
        delAry[i].checked = chkFlg;
    }
}

function buttonPushWithSid(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].labelEditSid.value=sid;
    document.forms[0].usr044ProcMode.value=1;
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
        var cmd = "labelEdit";
        buttonPushWithSid(cmd,sid);
    });
    /* radio:click */
    $(".js_tableTopCheck").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});
