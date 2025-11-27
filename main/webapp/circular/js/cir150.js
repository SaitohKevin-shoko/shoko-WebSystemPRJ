function getForm() {
    return document.forms['cir150Form'];
}

function changePage(id){
    if (id == 1) {
        getForm().cir150pageTop.value=document.forms[0].cir150pageBottom.value;
    }

    getForm().CMD.value='init';
    getForm().submit();
    return false;
}

function editAccount(mode, accountId) {
    getForm().CMD.value = 'accountDetail';
    getForm().cirCmdMode.value = mode;
    getForm().cirAccountSid.value = accountId;
    getForm().submit();
    return false;
}

function sort(sortKey, orderKey) {
    getForm().CMD.value = 'init';
    getForm().cir150sortKey.value = sortKey;
    getForm().cir150order.value = orderKey;
    getForm().submit();
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

function backGroundSetting(key, typeNo) {
    if (key.checked) {
        if (typeNo == 1) {
          document.getElementById(key.value).className='td_type_selected';
        } else {
          document.getElementById(key.value).className='td_type_selected2';
        }
    } else {
        document.getElementById(key.value).className= typeNo + ' js_listHover cursor_p';
    }
}

function accountDelete() {


    document.forms[0].CMD.value='delAccount';
    var paramStr = "";
    paramStr += getFormData($('#cir150Form'));
    var height = 160;

    $.ajax({
        async: true,
        url:  "../circular/cir150.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data.errorsList.length > 0) {
            $('#cir150_errorList').removeClass('mt10').removeClass('mt15');
            if (data.errorsList.length == 1) {
                $('#cir150_errorList').addClass('mt15');
            } else if (data.errorsList.length == 2) {
                $('#cir150_errorList').addClass('mt10');
            }

            var msg = "";

            for (i = 0; i < data.errorsList.length; i++) {

                if (i != 0) {
                    msg += "<br>";
                }

                msg += data.errorsList[i];
            }

            messagePop(msg);
        } else {
            buttonPush('accountDelete');
        }
    }).fail(function(data){
        alert('error');
    });
}

function messagePop(msg) {

    $('#messageArea').html("");
    $('#messageArea').append(msg);

    $('#messagePop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 'auto',
        width: 350,
        modal: true,
        overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
        },
        buttons: {
          OK: function() {
              $(this).dialog('close');
          }
        }
    });
}

function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

function confLabel(accountId) {
    getForm().CMD.value = 'confLabel';
    getForm().cirAccountSid.value = accountId;
    getForm().submit();
    return false;
}

$(function() {

  $('.js_tableTopCheck-header').live("change",function() {
    chgCheckAll('cir150AllCheck', 'cir150selectAcount');
  });

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
       var id = $(this).parent().attr('id');
       editAccount('1', id)
   });

});
