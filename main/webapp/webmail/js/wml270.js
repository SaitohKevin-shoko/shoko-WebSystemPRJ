function getForm() {
    return document.forms['wml270Form'];
}

function editDestlist(destlistId) {
    getForm().CMD.value = 'destListDetail';
    getForm().wmlCmdMode.value = 1;
    getForm().wmlEditDestList.value = destlistId;
    getForm().submit();
    return false;
}

function sort(sortKey, orderKey) {
    getForm().CMD.value = 'init';
    getForm().wml270sortKey.value = sortKey;
    getForm().wml270order.value = orderKey;
    getForm().submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        getForm().wml270pageTop.value=document.forms[0].wml270pageBottom.value;
    }

    getForm().CMD.value='init';
    getForm().submit();
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
    $('.js_tableTopCheck-header').live("change",function() {
        changeChk();
    });
    /* hover:click */
    $(".js_listClick").live("click", function(){
        var sid = $(this).parent().data("sid");
        editDestlist(sid);
    });
});


function changeChk(){
    var chkFlg;
    if (document.forms[0].allChk.checked) {
        checkAll('wml270selectDestList');
    } else {
        nocheckAll('wml270selectDestList');
    }
}

function checkAll(chkName){
   chkAry = document.getElementsByName(chkName);
   for(i = 0; i < chkAry.length; i++) {
       chkAry[i].checked = true;
   }
}

function nocheckAll(chkName){
   chkAry = document.getElementsByName(chkName);
   for(i = 0; i < chkAry.length; i++) {
       chkAry[i].checked = false;
   }
}
