//moves to TEMPLATE-LIST, and the sharing mode is set.
function selectTemplate(templateSid, templateCmd, move, catSid){
    document.forms[0].CMD.value=move;
    document.forms[0].rngSelectTplSid.value=templateSid;
    if (catSid != -1) {
        document.forms[0].rng090CatSid.value=catSid;
    } else {
        document.forms[0].rng090CatSid.value=0;
    }
    document.forms[0].rngTplCmdMode.value=templateCmd;
    document.forms[0].submit();
    return false;
}
function sortUp(templateMode) {
    document.forms[0].rng060TemplateMode.value = templateMode;
    return buttonPush('sortUp');
}
function sortDown(templateMode) {
    document.forms[0].rng060TemplateMode.value = templateMode;
    return buttonPush('sortDown');
}

function dispSortRadio() {
    if ($("select[name='rng060SelectCat']").val() == -1) {
        $(".js_sort_radio_are").hide();
    } else {
        $(".js_sort_radio_are").show();
    }
}

function dispSortRadioUsr() {
    if ($("select[name='rng060SelectCatUsr']").val() == -1) {
        $(".js_sort_radio_are_usr").hide();
    } else {
        $(".js_sort_radio_are_usr").show();
    }
}

$(function(){
    //カテゴリ全ての場合ソート用のラジオボタンを非表示にする。
    dispSortRadio();
    dispSortRadioUsr();
    /*hover */
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
    /*hover:click */
    $(".js_listClick").live("click", function(){
        var sid = $(this).parent().attr("id");
        selectTemplate(sid,1,"060title");
    });
    /* radio:click */
    $(".js_sort_radio_are").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
    /* radio:click */
    $(".js_sort_radio_are_usr").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});

