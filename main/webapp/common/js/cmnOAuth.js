var cmn270Window;

function doOAuth(providerParamName, mailaddressParamName, cotSidParamName) {

    // 選択されているvalue属性値を取り出す
    var provider = $('[name=' + providerParamName + ']').val();
    var mailAddress = $('[name=' + mailaddressParamName + ']').val();

    var oauthUrl = '../common/cmn270.do';
    var params = {
           'cmn270AuthSid' : provider,
           'cmn270MailAddress' : mailAddress,
           'cotSidParamName' : cotSidParamName
    };

    $.ajax({
        async: true,
        url:  oauthUrl + '?cmn270CMD=checkOauth',
        type: 'post',
//        data: '?cmn270CMD=checkOauth' + paramStr
        data: params
    }).done(function( data ) {
        if (!data.errorCode || data.errorCode == 1) {
            if (data.errorMessage) {
                alert(data.errorMessage);
            } else {
                alert('認証に失敗しました。\r\nプロバイダ、またはメールアドレスをご確認ください。');
            }
            return;
        }
        var url = oauthUrl;
        url += '?cmn270CMD=doAuth'
            + '&cmn270AuthSid=' + provider
            + '&cmn270MailAddress=' + mailAddress
            + '&cmn270cotSidParamName=' + cotSidParamName;
        cmn270Window = window.open(url,
              'receiver',
              'menubar=no,toolbar=no,location=no,status=no,resizable=yes');

    }).fail(function(data){
    });

    return;
}

function cmn270Finally() {
    try {
        var thisForm = document.forms[0];
        var parentForm = window.opener.document.forms[0];
        parentForm.CMD.value = 'oauthSuccess';
        var parentParamName = thisForm.cmn270cotSidParamName.value;
        window.opener.document.getElementsByName(parentParamName)[0].value = thisForm.cotSid.value;
        parentForm.submit();
        window.close();
    } catch (e) {
        alert(e);
    }
}

function cmn270Close() {
    if(cmn270Window != null){
        cmn270Window.close();
    }
    window.close();
}
