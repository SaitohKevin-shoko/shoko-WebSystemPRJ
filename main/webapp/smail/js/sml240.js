$(function() {
    $(this).tableTop().initRowHover();
    $('.js_click').live('click' , function() {
        editAccount(1, $(this).parent().data('sid'));
    });
});
function getForm() {
    return document.forms['sml240Form'];
}

function changePage(id){
    if (id == 1) {
        getForm().sml240pageTop.value=document.forms[0].sml240pageBottom.value;
    }

    getForm().CMD.value='init';
    getForm().submit();
    return false;
}

function editAccount(mode, accountId) {
    getForm().CMD.value = 'accountDetail';
    getForm().smlCmdMode.value = mode;
    getForm().smlAccountSid.value = accountId;
    getForm().submit();
    return false;
}

function sort(sortKey, orderKey) {
    getForm().CMD.value = 'init';
    getForm().sml240sortKey.value = sortKey;
    getForm().sml240order.value = orderKey;
    getForm().submit();
    return false;
}

function chgCheckAllChange(allChkName, chkName) {
    if (document.getElementsByName(allChkName)[0].checked) {
        $(".td_line_color1").addClass("td_type_selected");
        $(".td_line_color2").addClass("td_type_selected2");
    } else {
        $(".td_type_selected").addClass("td_line_color1");
        $(".td_type_selected2").addClass("td_line_color2");
        $(".td_line_color1").removeClass("td_type_selected");
        $(".td_line_color2").removeClass("td_type_selected2");
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
        var cssName = 'td_line_color' + typeNo;
        document.getElementById(key.value).className=cssName;
    }
}

function confLabel(accountId) {
    getForm().CMD.value = 'confLabel';
    getForm().smlAccountSid.value = accountId;
    getForm().submit();
    return false;
}

function confFilter(accountId) {
    getForm().CMD.value = 'confFilter';
    getForm().smlAccountSid.value = accountId;
    getForm().submit();
    return false;
}

function accountDelete() {


    document.forms[0].CMD.value='delAccount';
    var paramStr = "";
    paramStr += getFormData($('#sml240Form'));
    var height = 160;

    $.ajax({
        async: true,
        url:  "../smail/sml240.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.errorsList.length > 0) {

                var msg = "";

                for (i = 0; i < data.errorsList.length; i++) {

                    if (i != 0) {
                        msg += "<br>";
                    }

                    msg += data.errorsList[i];
                }

                messagePop(msg, height);
            } else {
                buttonPush('accountDelete');
            }
        } else {
            alert(msglist_sml010["sml.213"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.213"]);
    });

}

function messagePop(msg, height) {

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









