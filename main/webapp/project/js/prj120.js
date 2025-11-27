
function parentEnable(){
    setAllReadOnly(parent.document, false);
}

function parentReadOnly(){

    setAllReadOnly(parent.document, true);
}

function posClose() {
    window.parent.jQuery('#subPanel').dialog('close');
    parentEnable();
}

function parentReload(sid){
    var CMD = parent.document.getElementsByName('CMD');
    CMD[0].value = 'copyClick';
    parent.document.forms[0].copyProjectSid.value = sid;

    parentEnable();
    parent.document.forms[0].submit();
}

$(function() {

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
        var prjId = $(this).attr('id');
        parentReload(prjId);
    });


});
