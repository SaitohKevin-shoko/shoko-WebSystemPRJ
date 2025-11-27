function changeSendServerAuth(auth) {
    document.getElementById('js_sendUser').disabled = (auth != 1);
    document.getElementById('js_sendPassword').disabled = (auth != 1);
}

function selectUsersList(chkObj, chkTargetName) {

    var flg = chkObj.checked;
    var defUserAry = document.forms[0].elements[chkTargetName].options;
    var defLength = defUserAry.length;
    for (i = defLength - 1; i >= 0; i--) {
        if (defUserAry[i].value != -1) {
            defUserAry[i].selected = flg;
        }
    }
}

function changeUrlKbn() {
    var kbn = Number($("input:radio[name=anp080UrlSetKbn]:checked").val());
    if (kbn == 0) {
        $('#js_baseUrlForm').hide();
        $('#js_baseUrlAuto').show();
    } else {
        $('#js_baseUrlForm').show();
        $('#js_baseUrlAuto').hide();
    }
}

function changeAuthMethod() {
    if ($('input:radio[name=anp080authMethod]:checked').val() == "1") {
        $('.js_BaseAuth').addClass('display_none');
        $('.js_OAuth').removeClass('display_none');
    } else {
        $('.js_BaseAuth').removeClass('display_none');
        $('.js_OAuth').addClass('display_none');
    }
}

$(function() {
    //SMTP認証
    var smtpObj = document.getElementsByName("anp080SmtpAuth");
    var smtpChk = 0;
    for (var i = 0; i< smtpObj.length; i++) {
        if (smtpObj[i].checked) {
            smtpChk = smtpObj[i].value;
            break;
        }
    }
    var oauthCompFlg = document.forms[0].anp080oauthCompFlg.value;
    if (oauthCompFlg == 1) {
        $(".js_oauthDone").removeClass("display_none");
        $(".js_oauthYet").addClass("display_none");
    } else {
        $(".js_oauthDone").addClass("display_none");
        $(".js_oauthYet").removeClass("display_none");
    }

    changeSendServerAuth(smtpChk);
    //URL
    changeUrlKbn();
    changeAuthMethod();
});