function getForm() {
    return document.forms['sml380Form'];
}

function editBan(destlistId) {
    getForm().CMD.value = 'editBan';
    getForm().sml380EditBan.value = destlistId;
    getForm().submit();
    return false;
}
function addBan() {
    getForm().CMD.value = 'addBan';
    getForm().sml380EditBan.value = 0;
    getForm().submit();
    return false;
}

function sort(sortKey, orderKey) {
    getForm().CMD.value = 'init';
    getForm().sml380sortKey.value = sortKey;
    getForm().sml380order.value = orderKey;
    getForm().submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        getForm().sml380pageTop.value=document.forms[0].sml380pageBottom.value;
    }

    getForm().CMD.value='init';
    getForm().submit();
    return false;
}
$(function () {
    /* tabletop hover*/
    $(this).tableTop().initRowHover();
    $('[name=sml380AllCheck]').change(function () {

    });

});
