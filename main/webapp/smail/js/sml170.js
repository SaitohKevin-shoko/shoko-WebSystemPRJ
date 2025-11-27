function buttonPush(cmd) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function changeEnableDisable() {

    var bool1 = false;
    var bool2 = false;

    var huriwakeFlg = false;
    if (document.forms[0].sml170HuriwakeKbn) {
        if (document.forms[0].sml170HuriwakeKbn.length > 0) {
            huriwakeFlg = true;
        }
    }

    if (document.forms[0].sml170MailFw[0].checked) {
        bool1 = true;
        document.forms[0].sml170MailDf.value = '';
        document.forms[0].sml170MailDfSelected.value = 0;
        document.forms[0].sml170SmailOp[0].checked = true;
        if (huriwakeFlg) {
            document.forms[0].sml170HuriwakeKbn[0].checked = true;
        }
        document.forms[0].sml170Zmail1.value = '';
        document.forms[0].sml170Zmail2.value = '';
        document.forms[0].sml170Zmail3.value = '';
        document.forms[0].sml170Zmail1Selected.value = 0;
        document.forms[0].sml170Zmail2Selected.value = 0;
        document.forms[0].sml170Zmail3Selected.value = 0;

        $('.js_tensoConf').addClass('display_none');
    }

    document.forms[0].sml170MailDf.disabled = bool1;
    document.forms[0].sml170MailDfSelected.disabled = bool1;

    if (!bool1) {
        if (document.forms[0].sml170MailDfSelected.value != 0) {
             document.forms[0].sml170MailDf.value = document.forms[0].sml170MailDfSelected.value;
             document.forms[0].sml170MailDf.disabled = true;
        }
        $('.js_tensoConf').removeClass('display_none');
    }

    if (huriwakeFlg) {
        document.forms[0].sml170HuriwakeKbn[0].disabled = bool1;
        document.forms[0].sml170HuriwakeKbn[1].disabled = bool1;
        document.forms[0].sml170HuriwakeKbn[2].disabled = bool1;
    }
    document.forms[0].sml170SmailOp[0].disabled = bool1;
    document.forms[0].sml170SmailOp[1].disabled = bool1;

    if (document.forms[0].sml170HuriwakeKbn[0].checked) {
        document.forms[0].sml170Zmail1.value = '';
        document.forms[0].sml170Zmail2.value = '';
        document.forms[0].sml170Zmail3.value = '';
        document.forms[0].sml170Zmail1Selected.disabled = true;
        document.forms[0].sml170Zmail2Selected.disabled = true;
        document.forms[0].sml170Zmail3Selected.disabled = true;
        document.forms[0].sml170Zmail1.disabled = true;
        document.forms[0].sml170Zmail2.disabled = true;
        document.forms[0].sml170Zmail3.disabled = true;
        $('.js_send_default').addClass('display_none');
        $('.js_send_kobetu').addClass('display_none');
        $('.js_send_fuzai').addClass('display_none');
        $('.js_send_default').removeClass('display_none');
    } else if (document.forms[0].sml170HuriwakeKbn[1].checked) {
        document.forms[0].sml170MailDf.value = '';
        document.forms[0].sml170Zmail1Selected.disabled = false;
        document.forms[0].sml170Zmail2Selected.disabled = false;
        document.forms[0].sml170Zmail3Selected.disabled = false;
        document.forms[0].sml170Zmail1.disabled = false;
        document.forms[0].sml170Zmail2.disabled = false;
        document.forms[0].sml170Zmail3.disabled = false;
        $('.js_send_default').addClass('display_none');
        $('.js_send_kobetu').addClass('display_none');
        $('.js_send_fuzai').addClass('display_none');
        $('.js_send_kobetu').removeClass('display_none');
    } else if (document.forms[0].sml170HuriwakeKbn[2].checked) {
        document.forms[0].sml170MailDf.value = '';
        document.forms[0].sml170Zmail1.value = '';
        document.forms[0].sml170Zmail3.value = '';
        document.forms[0].sml170Zmail1Selected.disabled = true;
        document.forms[0].sml170Zmail2Selected.disabled = false;
        document.forms[0].sml170Zmail3Selected.disabled = true;
        document.forms[0].sml170Zmail1.disabled = true;
        document.forms[0].sml170Zmail2.disabled = false;
        document.forms[0].sml170Zmail3.disabled = true;
        $('.js_send_default').addClass('display_none');
        $('.js_send_kobetu').addClass('display_none');
        $('.js_send_fuzai').addClass('display_none');
        $('.js_send_fuzai').removeClass('display_none');
    }

    if (!bool2) {
        if (document.forms[0].sml170Zmail1Selected.value != 0) {
            document.forms[0].sml170Zmail1.value = document.forms[0].sml170Zmail1Selected.value;
            document.forms[0].sml170Zmail1.disabled = true;
        }
        if (document.forms[0].sml170Zmail2Selected.value != 0) {
            document.forms[0].sml170Zmail2.value = document.forms[0].sml170Zmail2Selected.value;
            document.forms[0].sml170Zmail2.disabled = true;
        }
        if (document.forms[0].sml170Zmail3Selected.value != 0) {
            document.forms[0].sml170Zmail3.value = document.forms[0].sml170Zmail3Selected.value;
            document.forms[0].sml170Zmail3.disabled = true;
        }
    }

    return;
}

$(function() {

    //削除区分ラジオボタン
    $(".accountSelKbn").live("change", function(){
        $('#accountSelArea').toggle();
    });

    //設定ボタンクリック
    $("#settingBtn").live("click", function(){
        if ($('input[name=sml170SelKbn]:checked').val() != 0) {
            kakuninPop();
        } else {
            buttonPush('edit');
        }
    });

});


function kakuninPop() {

    var paramStr = "";
    paramStr += "CMD=getAllAccount";

    $.ajax({
        async: true,
        url:  "../smail/sml170.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            var allAccountStr = "";

            if (data != null && data.sml170AllUseAccount.length > 0) {
                for (i = 0; i < data.sml170AllUseAccount.length; i++) {
                    var accountMdl = data.sml170AllUseAccount[i];

                    if (i != 0) {
                        allAccountStr += "<br>";
                    }
                    allAccountStr += accountMdl.accountName;
                }
                $('#accountKakuninListArea').html("");
                $('#accountKakuninListArea').append(allAccountStr);
            }
        } else {
            alert(msglist_sml010["sml.212"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.212"]);
    });

    $('#setKakuninPop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 250,
        width: 400,
        modal: true,
        overlay: {
          backgroundColor: '#000000',
          opacity: 0.5
        },
        buttons: {
          はい: function() {
              $(this).dialog('close');
              buttonPush('edit');
          },
          いいえ: function() {
              $(this).dialog('close');
          }
        }
    });
}