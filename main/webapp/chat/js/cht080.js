function getForm() {
    return document.forms['cht080Form'];
}

function editAccess(chsSid) {
    getForm().CMD.value = 'spAccessEdit';
    getForm().cht080editMode.value = 1;
    getForm().cht080editData.value = chsSid;
    getForm().submit();
    return false;
}

function sort(sortKey, orderKey) {
    getForm().CMD.value = 'init';
    getForm().cht080sortKey.value = sortKey;
    getForm().cht080order.value = orderKey;
    getForm().submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        getForm().cht080pageTop.value=document.forms[0].cht080pageBottom.value;
    }

    getForm().CMD.value='init';
    getForm().submit();
    return false;
}


//イベントを登録
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

    $(".js_list_Click").live("click", function(){
        var sid = $(this).parent().attr("id");
        return editAccess(sid);
    });

    $(".js_tableTopCheck-header").live("change",function() {
        chgCheckAll('cht080AllCheck', 'cht080selectSpAccessList');
    });
});

