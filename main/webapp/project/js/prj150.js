function changeTab(cmd){

    if (cmd == 'tabGaibuClick') {
        //新しい所属メンバ要素を作成
        createNewHiddenArray(1);
    }

    document.forms[0].CMD.value = cmd;
    document.forms[0].submit();
    return false;
}

function deleteCompany(companyId, companyBaseId, usrDelFlg) {
    document.forms['prj150Form'].CMD.value = 'deleteCompany';
    document.forms['prj150Form'].prj150delCompanyId.value = companyId;
    document.forms['prj150Form'].prj150delCompanyBaseId.value = companyBaseId;
    document.forms['prj150Form'].prj150UsrDelFlg.value = usrDelFlg;
    document.forms['prj150Form'].submit();
    return false;
}

function prj150ButtonPush(cmd, kbn){

    //新しい所属メンバ要素を作成
    createNewHiddenArray(kbn);

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function prj150GaiButtonPush(cmd, kbn){
    //外部タグの新しい所属メンバ要素を作成
    createAddNewHiddenArray(kbn);
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function createNewHiddenArray(kbn) {

    //所属メンバ配列
    var member020Array;
    var member140Array;
    var keyStr;

    if (kbn == 1) {
        member020Array = document.getElementsByName("prj020hdnMember");
        member140Array = document.getElementsByName("prj140hdnMember");
        keyStr = "key";
    } else if (kbn == 2) {
        member020Array = document.getElementsByName("prj020hdnMemberSv");
        member140Array = document.getElementsByName("prj140hdnMemberSv");
        keyStr = "keySv";
    }

    var write020Array;
    var write140Array;

    if (member020Array != null && member020Array.length > 0) {

        //一時保存用配列作成
        write020Array = new Array(member020Array.length);

        for (i = 0; i < member020Array.length; i++) {

            var tmpMember = document.createElement('input');
            tmpMember.type = 'hidden';
            tmpMember.name = 'prj020hdnMember';

            var keyNum = -1;

            //所属メンバ配列をセパレータで区切って取得
            var sp = member020Array[i].value.split(document.forms[0].sepKey.value);
            for (j = 0; j < member020Array.length; j++) {
                //フォーム入力値で、ユーザSIDが一致するユーザのメンバキーを取得
                if (sp[0] == document.getElementById("usr" + j).value) {
                    keyNum = document.getElementById(keyStr + j).value;
                    break;
                }
            }

            tmpMember.value = sp[0] + document.forms[0].sepKey.value;
            if (keyNum != -1) {
                tmpMember.value = tmpMember.value + keyNum;
            }

            //一時保存
            write020Array[i] = tmpMember;
        }
    }

    if (member140Array != null && member140Array.length > 0) {

        //一時保存用配列作成
        write140Array = new Array(member140Array.length);

        for (k = 0; k < member140Array.length; k++) {

            var tmpMember = document.createElement('input');
            tmpMember.type = 'hidden';
            tmpMember.name = 'prj140hdnMember';

            var keyNum = -1;

            //所属メンバ配列をセパレータで区切って取得
            var sp = member140Array[k].value.split(document.forms[0].sepKey.value);
            for (l = 0; l < member140Array.length; l++) {
                //フォーム入力値で、ユーザSIDが一致するユーザのメンバキーを取得
                if (sp[0] == document.getElementById("usr" + l).value) {
                    keyNum = document.getElementById(keyStr + l).value;
                    break;
                }
            }

            tmpMember.value = sp[0] + document.forms[0].sepKey.value;
            if (keyNum != -1) {
                tmpMember.value = tmpMember.value + keyNum;
            }

            //一時保存
            write140Array[k] = tmpMember;
        }
    }

    //ID = hiddenList に含まれる要素を削除
    var hiddenElement = document.getElementById('hiddenList');
    while (hiddenElement.hasChildNodes()) {
        hiddenElement.removeChild(hiddenElement.firstChild);
    }

    //ID = hiddenList に一時保存した配列の要素を出力
    if (write020Array != null && write020Array.length > 0) {
        for (m = 0; m < write020Array.length; m++) {
            hiddenElement.appendChild(write020Array[m]);
        }
    }

    if (write140Array != null && write140Array.length > 0) {
        for (n = 0; n < write140Array.length; n++) {
            hiddenElement.appendChild(write140Array[n]);
        }
    }
}

function createAddNewHiddenArray(kbn) {

    //アドレスメンバ配列
    var addressArray;
    var companyArray;
    var companyBaseArray;

    var keyStr;
    var keyStr2;

    if (kbn == 1) {
        addressArray = document.getElementsByName("prj150AddressId");
        companyArray = document.getElementsByName("prj150CompanySid");
        companyBaseArray = document.getElementsByName("prj150CompanyBaseSid");
        keyStr  = "key";
        keyStr2 = "key2";
    } else if (kbn == 2) {
        addressArray = document.getElementsByName("prj150AddressIdSv");
        companyArray = document.getElementsByName("prj150CompanySidSv");
        companyBaseArray = document.getElementsByName("prj150CompanyBaseSidSv");
        keyStr  = "keySv";
        keyStr2 = "key2Sv";
    }

    var wriAddressArray;
    var wriCompanyArray;
    var wricompanyBaseArray;

    if (addressArray != null && addressArray.length > 0) {
        //一時保存用配列作成
        wriAddressArray = new Array(addressArray.length);

        for (i = 0; i < addressArray.length; i++) {
            var tmpMember = document.createElement('input');
            tmpMember.type = 'hidden';
            tmpMember.name = 'prj150AddressIdSv';
            tmpMember.value = addressArray[i].value;

            //一時保存
            wriAddressArray[i] = tmpMember;
        }
    }


    if (companyArray != null && companyArray.length > 0) {

        //一時保存用配列作成
        wriCompanyArray = new Array(companyArray.length);

        for (i = 0; i < companyArray.length; i++) {

            var tmpMember = document.createElement('input');
            tmpMember.type = 'hidden';
            tmpMember.name = 'prj150CompanySid';

            var keyNum = -1;

            //所属メンバ配列を取得
            var sp = companyArray[i].value;

            for (j = 0; j < companyArray.length; j++) {
                //フォーム入力値で、ユーザSIDが一致するユーザのメンバキーを取得
                if (sp[0] == document.getElementById("adr" + j).value) {
                    keyNum = document.getElementById(keyStr + j).value;
                    break;
                }
            }

            tmpMember.value = sp[0] + document.forms[0].sepKey.value;
            if (keyNum != -1) {
                tmpMember.value = tmpMember.value + keyNum;
            }

            //一時保存
            wriCompanyArray[i] = tmpMember;
        }
    }

    if (companyBaseArray != null && companyBaseArray.length > 0) {
        //一時保存用配列作成
        wricompanyBaseArray = new Array(companyBaseArray.length);

        for (k = 0; k < companyBaseArray.length; k++) {

            var tmpMember = document.createElement('input');
            tmpMember.type = 'hidden';
            tmpMember.name = 'prj150CompanyBaseSid';

            var keyNum = -1;

            //所属メンバ配列を取得
            var sp = companyBaseArray[k].value;
            for (l = 0; l < companyBaseArray.length; l++) {
                //フォーム入力値で、ユーザSIDが一致するユーザのメンバキーを取得
                if (sp[0] == document.getElementById("adr" + l).value) {
                    keyNum = document.getElementById(keyStr2 + l).value;
                    break;
                }
            }

            tmpMember.value = sp[0] + document.forms[0].sepKey.value;
            if (keyNum != -1) {
                tmpMember.value = tmpMember.value + keyNum;
            }

            //一時保存
            wricompanyBaseArray[k] = tmpMember;
        }
    }

    //ID = prj150CompanyIdArea に含まれる要素を削除
    var hiddenElement = document.getElementById('prj150CompanyIdArea');
    while (hiddenElement.hasChildNodes()) {
        hiddenElement.removeChild(hiddenElement.firstChild);
    }

    //ID = prj150CompanyBaseIdArea に含まれる要素を削除
    var hiddenElement2 = document.getElementById('prj150CompanyBaseIdArea');
    while (hiddenElement2.hasChildNodes()) {
        hiddenElement2.removeChild(hiddenElement2.firstChild);
    }

    //ID = prj150AddressIdSvArea に含まれる要素を削除
    var hiddenElement3 = document.getElementById('prj150AddressIdSvArea');
    while (hiddenElement3.hasChildNodes()) {
        hiddenElement3.removeChild(hiddenElement3.firstChild);
    }

    //ID = prj150CompanyIdArea に一時保存した配列の要素を出力
    if (wriCompanyArray != null && wriCompanyArray.length > 0) {
        for (m = 0; m < wriCompanyArray.length; m++) {
            hiddenElement.appendChild(wriCompanyArray[m]);
        }
    }

    //ID = prj150CompanyBaseIdArea に一時保存した配列の要素を出力
    if (wricompanyBaseArray != null && wricompanyBaseArray.length > 0) {
        for (n = 0; n < wricompanyBaseArray.length; n++) {
            hiddenElement2.appendChild(wricompanyBaseArray[n]);
        }
    }


    //ID = prj150AddressIdSvArea に一時保存した配列の要素を出力
    if (wriAddressArray != null && wriAddressArray.length > 0) {
        for (n = 0; n < wriAddressArray.length; n++) {
            hiddenElement3.appendChild(wriAddressArray[n]);
        }
    }
}

$(function () {
    /* タブ変更 */
    $('.js_tab').live("click", function(){
        var showId = $(this).attr('id');
        $('#tab1_table').addClass('display_none');
        $('#tab2_table').addClass('display_none');
        $('#tab1').addClass('tabHeader_tab-off');
        $('#tab2').addClass('tabHeader_tab-off');
        $('#tab1').removeClass('tabHeader_tab-on');
        $('#tab2').removeClass('tabHeader_tab-on');
        $('#' + showId + '_table').removeClass('display_none');
        $('#' + showId).removeClass('tabHeader_tab-off');
        $('#' + showId).addClass('tabHeader_tab-on');
    });

    $('.js_tableTopCheck-header').live("change",function() {
      var tabCheck = $(this).attr('id');
      if (Object.is(tabCheck, 'naibu')) {
        chgCheckAll('prj150naibuAllCheck', 'prj150naibuSelectMemberSid');
      } else if(Object.is(tabCheck, 'gaibu')){
        chgCheckAll('prj150gaibuAllCheck', 'prj150gaibuSelectMemberSid');
      }

      });

    $(".js_radioCheck").live("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });

});
