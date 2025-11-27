function setWebmailAddress(mailAddress, paramName, msgAreaId) {

    if (mailAddress != null && mailAddress.length > 0) {
        var addressElement = window.opener.document.getElementsByName(paramName)[0];

        if (addressElement.value != null && addressElement.value.length > 0) {
            addressElement.value = addressElement.value + ',' + mailAddress;
        } else {
            addressElement.value = mailAddress;
        }

        setMailAddressMsg(msgAreaId, paramName);
    }
//    window.close();
    return false;
}

function setWebmailData(kbn, msgAreaId) {
    if (kbn == 0) {
        //ユーザ情報
        var addressAtsk = document.getElementsByName('usr040Atsk');
        var addressCc = document.getElementsByName('usr040Cc');
        var addressBcc = document.getElementsByName('usr040Bcc');
        setWebmailAddress2(addressAtsk, addressCc, addressBcc, msgAreaId);

    } else {
        //アドレス帳
        var addressAtsk = document.getElementsByName('adr010Atsk');
        var addressCc = document.getElementsByName('adr010Cc');
        var addressBcc = document.getElementsByName('adr010Bcc');
        setWebmailAddress2(addressAtsk, addressCc, addressBcc, msgAreaId);
    }
}

function setWebmailAddress2(addressAtsk, addressCc, addressBcc, msgAreaId) {

    if (addressAtsk != null && addressAtsk.length > 0) {
        var addressElementTo = window.opener.document.getElementsByName('wml010sendAddressTo')[0];

        for (index = 0; index < addressAtsk.length; index++) {
            if (addressElementTo.value != null && addressElementTo.value.length > 0) {
                //アドレスフォームに既にメールアドレスが入力されているとき
                addressElementTo.value = addressElementTo.value + ',' + addressAtsk[index].value;
            } else {
                //アドレスフォームが未入力
                if (index == 0) {
                    //アドレス初回登録
                    addressElementTo.value = addressAtsk[index].value;
                } else {
                    //アドレス初回登録以外
                    addressElementTo.value = addressElementTo.value + ',' + addressAtsk[index].value;
                }
            }
        }
    }

    if (addressCc != null && addressCc.length > 0) {
        var addressElementCc = window.opener.document.getElementsByName('wml010sendAddressCc')[0];
        for (index2 = 0; index2 < addressCc.length; index2++) {

            if (addressElementCc.value != null && addressElementCc.value.length > 0) {
                //アドレスフォームに既にメールアドレスが入力されているとき
                addressElementCc.value = addressElementCc.value + ',' + addressCc[index2].value;
            } else {
                //アドレスフォームが未入力
                if (index2 == 0) {
                    //アドレス初回登録
                    addressElementCc.value = addressCc[index2].value;
                } else {
                    //アドレス初回登録以外
                    addressElementCc.value = addressElementCc.value + ',' + addressCc[index2].value;
                }
            }
        }
    }

    if (addressBcc != null && addressBcc.length > 0) {
        var addressElementBcc = window.opener.document.getElementsByName('wml010sendAddressBcc')[0];
        for (index3 = 0; index3 < addressBcc.length; index3++) {

            if (addressElementBcc.value != null && addressElementBcc.value.length > 0) {
                //アドレスフォームに既にメールアドレスが入力されているとき
                addressElementBcc.value = addressElementBcc.value + ',' + addressBcc[index3].value;
            } else {
                //アドレスフォームが未入力
                if (index3 == 0) {
                    //アドレス初回登録
                    addressElementBcc.value = addressBcc[index3].value;
                } else {
                    //アドレス初回登録以外
                    addressElementBcc.value = addressElementBcc.value + ',' + addressBcc[index3].value;
                }
            }
        }
    }

    setMailAddressMsg2(msgAreaId);

    window.close();
    return false;
}

function setMailAddressMsg(id, paramName) {
    var msg = msglist.atesakiSet
    if (paramName == 'wml010sendAddressCc') {
        msg = msglist.ccSet
    } else if (paramName == 'wml010sendAddressBcc') {
        msg = msglist.bccSet
    }

    window.close();
}

function setMailAddressMsg2(id) {
    var msg = msglist.addressSet

    window.close();
}


function setWebmailSendList(kbn, msgAreaId) {
    if (kbn == 0) {
        //ユーザ情報
        var addressList = document.getElementsByName('usr040SidsAtsk');
        setWebmailSendList2(0, addressList, msgAreaId);

    } else {
        //アドレス帳
        var addressList = document.getElementsByName('adr010SidsAtsk');
        setWebmailSendList2(1, addressList, msgAreaId);
    }
}

function setWebmailSendList2(sendlistType, addressList, msgAreaId) {
    if (addressList != null && addressList.length > 0) {
        var addressElementArea = window.opener.document.getElementById('wml280destUserArea');
        var destUserAreaName = "wml280destUser";
        if (sendlistType == 1) {
            addressElementArea = window.opener.document.getElementById('wml280destAddressArea');
            destUserAreaName = "wml280destAddress";
        }
        for (index = 0; index < addressList.length; index++) {
            addressElementArea.innerHTML += '<input type=\"hidden\" name=\"' + destUserAreaName + '\" value=\"'
                + sendlistType + '-' + addressList[index].value + '\">' + '\r\n';
        }
    }
    setMailAddressMsg2(msgAreaId);

    window.opener.document.getElementsByName('CMD')[0].value='init';
    window.opener.document.forms[0].submit();
    window.close();
    return false;
}
