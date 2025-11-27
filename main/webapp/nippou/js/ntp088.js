function getForm() {
    return document.forms['ntp088Form'];
}

function editAccess(nsaSid) {
    getForm().CMD.value = 'spAccessEdit';
    getForm().ntp088editMode.value = 1;
    getForm().ntp088editData.value = nsaSid;
    getForm().submit();
    return false;
}

function sort(sortKey, orderKey) {
    getForm().CMD.value = 'init';
    getForm().ntp088sortKey.value = sortKey;
    getForm().ntp088order.value = orderKey;
    getForm().submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        getForm().ntp088pageTop.value=document.forms[0].ntp088pageBottom.value;
    }

    getForm().CMD.value='init';
    getForm().submit();
    return false;
}

$(function() {

    $('.js_tableTopCheck-header').live("change",function() {
        chgCheckAll('ntp088AllCheck', 'ntp088selectSpAccessList');
    });

    /* 行  hover */
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

    $(".js_listClick").live("click", function(){
    	editAccess($(this).parent().attr("id"));
    });
});