function getForm() {
    return document.forms['wml030Form'];
}

function changePage(id){
    if (id == 1) {
        getForm().wml030pageTop.value=document.forms[0].wml030pageBottom.value;
    }

    getForm().CMD.value='init';
    getForm().submit();
    return false;
}

function editAccount(mode, accountId) {
    getForm().wmlCmdMode.value = mode;
    return wml030confBtn('accountDetail', accountId);
}

function confLabel(accountId) {
    return wml030confBtn('confLabel', accountId);
}

function confFilter(accountId) {
    return wml030confBtn('confFilter', accountId);
}

function confTemplate(accountId) {
    return wml030confBtn('confMailTemplate', accountId);
}

function wml030confBtn(cmd, accountId) {
    getForm().CMD.value = cmd;
    getForm().wmlAccountSid.value = accountId;
    getForm().submit();
    return false;
}

function sort(sortKey, orderKey) {
    getForm().CMD.value = 'init';
    getForm().wml030sortKey.value = sortKey;
    getForm().wml030order.value = orderKey;
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
$(function(){

    /* radio:click */
    $(".js_tableTopCheck").live("click", function(){
        var check = $(this).children();
        if (check.prop("checked")) {
            check.attr("checked", true);
        } else {
            check.attr("checked", false);
        }
    });

    $('.js_tableTopCheck-header').live("change",function() {
        changeChk();
    });
    
    $('.js_ninsyo-combo').live("change",function() {
        var comboValue = $(".js_ninsyo-combo").val();
        if (comboValue != 1) {
            $(".js_ninsyo-radio").addClass("display_none");
        } else {
            $(".js_ninsyo-radio").removeClass("display_none");
        }
    });
    
    var comboSelect = $(".js_ninsyo-combo").val();
    if (comboSelect != 1) {
        $(".js_ninsyo-radio").addClass("display_none");
    } else {
        $(".js_ninsyo-radio").removeClass("display_none");
    }
});

function changeChk(){
    var chkFlg;
    if (document.forms[0].allChk.checked) {
        checkAll('wml030selectAcount');
    } else {
        nocheckAll('wml030selectAcount');
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


function reloadAuthStatus() {
    loadingPop(msg_loading);
    getForm().CMD.value = 'reloadAuthStatus';
    formData = $('#webmailForm').serialize();

    $.ajax({
        async: true,
        url:"../webmail/wml030.do",
        type: "post",
        data:formData
    }).done(function( data ) {

        //メール一覧を再表示
        getForm().CMD.value='init';
        getForm().submit();

    }).fail(function(data){
        closeloadingPop();
    });
}

/*読み込み中ダイアログ*/
function loadingPop(popTxt) {

    $('#loading_pop').dialog({
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 130,
        width: 250,
        modal: true,
        title: popTxt,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            hideBtn: function() {
            }
        }
    });

    $('.ui-button-text').each(function() {
        if ($(this).text() == 'hideBtn') {
            $(this).parent().parent().parent().addClass('border_top_none');
            $(this).parent().parent().parent().addClass('border_bottom_none');
            $(this).parent().remove();
        }
    })

}


function closeloadingPop() {
    if ($('#loading_pop') != null) {
        setTimeout('closeloading();',150)
    }
}

function closeloading() {
    if ($('#loading_pop') != null && closeLoadingFlg) {
        $('#loading_pop').dialog('close');
    }
}
