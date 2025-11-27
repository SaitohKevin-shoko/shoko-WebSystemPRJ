function editEnquete(enqSid) {
    document.forms[0].CMD.value='enq230edit';
    document.forms[0].enqEditMode.value='1';
    document.forms[0].editEnqSid.value=enqSid;
    document.forms[0].submit();
}

function changePage(id){
    if (id == 0) {
        document.forms[0].enq230pageBottom.value=document.forms[0].enq230pageTop.value;
    } else {
        document.forms[0].enq230pageTop.value=document.forms[0].enq230pageBottom.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function chgCheckAll(allChkName, chkName) {
    if (document.getElementsByName(allChkName)[0].checked) {
        checkAll(chkName);
    } else {
        nocheckAll(chkName);
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

$(function() {


    $('.js_tableTopCheck-header').live("change", function() {
        chgCheckAll('enq230allCheck', 'enq230selectEnqSid');
    });

    /* hover:click */
    $(".js_listClick").live("click", function(){
        var sid = $(this).parent().attr("id");
        editEnquete(sid);
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
