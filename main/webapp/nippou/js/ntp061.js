function buttonCopy(cmd, mod){
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp060ProcMode.value=mod;
    document.forms[0].submit();
    return false;
}

$(function() {
  
    if (document.forms[0].ntp061AddCompFlg.value == 1) {
        setParentNtp();
    }

    /* hover */
    $('.js_listHover').on({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });

    /* アドレス帳ボタンクリック */
    $(".js_adrBtn").on("click", function(){
        var ScrTop = $(document).scrollTop();
        $('.js_adrArea').css("top",ScrTop + "px");
        if($('.js_adrArea').hasClass("display_n")){
            $('.js_adrArea').removeClass("display_n");
            Glayer.show();
            $(".adrselectbox").css('visibility','visible');
          } else {
            $('.js_adrArea').addClass("display_n");
            Glayer.hide();
          }
    });

    /* アドレス帳閉じるボタンクリック */
    $(".js_adrClose").on("click", function(){
        $('.js_adrArea').addClass("display_n");
        Glayer.hide();
    });

    /* 商品追加ボタンクリック */
    $(".js_itmAddBtn").on("click", function(){
        var ScrTop = $(document).scrollTop();
        $('.js_itmArea').css("top",ScrTop + "px");
        checkBoxCh();
        if($('.js_itmArea').hasClass("display_n")){
            $('.js_itmArea').removeClass("display_n")
            Glayer.show();
            $(".itmselectbox").css('visibility','visible');
        } else {
            $('.js_itmArea').addClass("display_n");
            Glayer.hide();
        }
    });

    /* 商品追加閉じるボタンクリック */
    $(".js_itmClose").on("click", function(){
        $('.js_itmArea').addClass("display_n");
        Glayer.hide();
    });

    /* 商品ポップアップ*/
    checkBoxCh();
    $("input:radio[name=ntp061NanPermitView]").change(function () {
        changeDspPermitMode();

    });
    $("input:radio[name=ntp061NanPermitEdit]").change(function () {
        changeDspPermitMode();

    });

    changeDspPermitMode();



    /* アドレス帳hover*/
    $('.comp_select_area').hover(

        function () {
            $(this).addClass("comp_select_area_hover");
          },
          function () {
              $(this).removeClass("comp_select_area_hover");
          }
    );

    //見込み度基準ボタン
    $(".js_mikomidoBtn").on("click", function(){
        $('.js_mikomidoPop').dialog({
            autoOpen: true,
            bgiframe: true,
            resizable: false,
            width:400,
            modal: true,
            closeOnEscape: false,
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
    });

    //権限設定ラジオ
    $("input:radio[name=ntp061NanPermitView]").change(
            function () {
                changeDspPermitMode();
            });
    $("input:radio[name=ntp061NanPermitEdit]").change(
            function () {
                changeDspPermitMode();
            });

    //担当者変更
    $('fieldset[name="tantoListUI"]').on('change', function() {
      return buttonPush('reload');
    });
});

/* 登録確認ダイアログ */
function addOkOpen() {
    $('#dialogAddOk').dialog({
        autoOpen: false,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 200,
        modal: true,
        overlay: {
        backgroundColor: '#000000',
        opacity: 0.5
        },
        buttons: {
          登録して日報に反映: function() {
            buttonPush('addOkPopNtp');
          },
          登録: function() {
              buttonPush('addOkPop');
          },
          ｷｬﾝｾﾙ: function() {
            $(this).dialog('close');
          }
        }
    });
    $('#dialogAddOk').dialog('open');
}

/* 選択されている値をチェック */
function checkBoxCh() {

    var selShohin = $('select[name=ntp061SelectShohin]')[0];
    var selList   = $("input:checkbox[name^='ntp061ItmShohinList']");
    var rowState  = 1;

    //チェックをすべてはずす
    selList.attr('checked', false);
    for (var j = 0; j < selList.length; j++) {
        if (j % 2 == 0) {
            rowState = 1;
        } else {
            rowState = 2;
        }
        resetShohinName(rowState, selList[j].value);
    }


    for (var i = 0; i < selShohin.length; i++) {
        for (var n = 0; n < selList.length; n++) {
            if (selShohin.options[i].value == selList[n].value) {
                //一致する値にチェック,色変更する
                clickShohinName(1, selList[n].value);
            }
        }
    }

    return false;
}

function adrWinClose() {
    //アドレス帳閉じる
    $('.js_adrArea')[0].style.display="none";
    Glayer.hide();
}

function selectLine(idx) {
    document.forms[0].CMD.value='init';
    document.forms[0].ntp061AdrIndex.value=idx;
    document.forms[0].ntp061AdrStr.value='-1';
    $("<input>", {
        type: 'hidden',
        name: 'ntp061AdrKbn',
        value: 1
        }).appendTo('form[name=ntp061Form]');
    document.forms[0].submit();
    return false;
}

function selectStr(str) {
    document.forms[0].CMD.value='init';
    document.forms[0].ntp061AdrStr.value=str;
    $("<input>", {
        type: 'hidden',
        name: 'ntp061AdrKbn',
        value: 1
        }).appendTo('form[name=ntp061Form]');

    document.forms[0].submit();
    return false;
}

function clickCompanyName(coSid, coBaseSid) {

    var companyId = coSid + ":" + coBaseSid;
    var coRadio = document.getElementsByName('ntp061AdrselectCompany');

    if (coRadio != null) {
        for (index = 0; index < coRadio.length; index++) {
            coRadio[index].checked = (coRadio[index].value == companyId);
        }
    }

    return selectCompany();
}

function selectCompany() {
    var coRadio = document.getElementsByName('ntp061AdrselectCompany');
    if (coRadio != null) {
        for (index = 0; index < coRadio.length; index++) {
            if (coRadio[index].checked == true) {
               var paramName = 'ntp061AdrselectCompanyName' + coRadio[index].value;
               var coParam = coRadio[index].value.split(':');
               viewTanto(coParam[0], coParam[1],
                         document.getElementsByName(paramName)[0].value);

               break;
            }
        }
    }
}

function viewTanto(adrSid, adrBaseSid, adrName) {

    document.forms['ntp061Form'].ntp061CompanySid.value = adrSid;
    document.forms['ntp061Form'].ntp061CompanyBaseSid.value = adrBaseSid;
    document.forms['ntp061Form'].ntp061CompanyName.value = adrName;
    var comCode = $('input[name=ntp061selectCompanyCode' + adrSid + '_' + adrBaseSid + ']').val();
    document.forms['ntp061Form'].ntp061CompanyCode.value = comCode;

//    var url = "../address/adr241.do";
//    url += "?adr240CompanySid=" + adrSid;
//    url += "&adr240CompanyBaseSid=" + adrBaseSid;
//
//    $.ajaxSetup({async:false});
//    $.post(url, function(data){
//        if ($('#tantoArea')[0] != null) {
//            $('#tantoArea')[0].innerHTML = data;
//        }
//    });
}

function setParent(coParamId) {

    var coParam = coParamId.split(':');

    document.forms['ntp061Form'].ntp061CompanySid.value = coParam[0];
    document.forms['ntp061Form'].ntp061CompanyBaseSid.value = coParam[1];
    document.forms['ntp061Form'].ntp061AdrCompanyName.value = document.getElementsByName('ntp061selectCompanyName' + coParamId)[0].value;
    var comCode = $('input[name=ntp061selectCompanyCode' + coParam[0] + '_' + coParam[1] + ']').val();
    document.forms['ntp061Form'].ntp061AdrCompanyCode.value = comCode;

    document.forms['ntp061Form'].CMD.value = 'selectedCompany';
    var parentId = 'ntp061Adr';

    var companySid = encodeURIComponent(document.forms['ntp061Form'].ntp061CompanySid.value);
    var companyBaseSid = encodeURIComponent(document.forms['ntp061Form'].ntp061CompanyBaseSid.value);
    var proAddFlg = encodeURIComponent(document.forms['ntp061Form'].ntp061AdrProAddFlg.value);
    var companyId = companySid + ":" + companyBaseSid;

    if (companyId.length <= 1) {
        adrWinClose();
        return false;
    }

        addParamNew('ntp061CompanyIdArea', 'ntp061CompanySid', companySid);
        addParamNew('ntp061CompanyBaseIdArea', 'ntp061CompanyBaseSid', companyBaseSid);

    var adrCheck = document.getElementsByName('ntp061AdrAddress');
    var nocheckFlg = 0;

    document.forms['ntp061Form'].submit();

    return false;
}

function addParamNew(parentAreaId, paramName, value) {
    var parentArea = document.getElementById(parentAreaId);

    paramHtml = '<input type="hidden" name="' + paramName + '" value="' + value + '">';
    parentArea.innerHTML = paramHtml;
}

function itmChangePage(pageCombo) {
    if (pageCombo == 0) {
        document.forms[0].ntp061ItmPageBottom.value = document.forms[0].ntp061ItmPageTop.value;
    } else {
        document.forms[0].ntp061ItmPageTop.value = document.forms[0].ntp061ItmPageBottom.value;
    }
    itemSearchPush('itmchangePage');
}


var checkBoxClickFlg = 0;

function clickMulti() {
    checkBoxClickFlg = 1;
    return false;
}

function clickShohinName(typeNo, itmSid) {

    if (checkBoxClickFlg == 0) {
        //tr押下時
        if (!$('#tr_' + itmSid).children().children().children().attr('checked')) {
            $('#tr_' + itmSid).children().children().children().attr('checked','checked');
        } else {
            $('#tr_' + itmSid).children().children().children().attr('checked','');
        }
    } else {
        //checkBox押下時
        if ($('#tr_' + itmSid).children().children().children().attr('checked')) {
            $('#tr_' + itmSid).children().children().children().attr('checked','checked');
        } else {
            $('#tr_' + itmSid).children().children().children().attr('checked','');
        }
        checkBoxClickFlg = 0;
    }

    return false;
}

function resetShohinName(typeNo, itmSid) {

    $('#tr_' + itmSid).children().children().children().attr('checked','');


    return false;
}

function setParentNtp() {

    var parentDocument          = window.opener.document;
    var parentId                = document.forms['ntp061Form'].ntp200parentPageId.value;
    var rowNumber               = document.forms['ntp061Form'].ntp200RowNumber.value;
    var ankenSid                = $('input:hidden[name=ntp061AnkenSid]').val();
    var ankenCode               = replaceHtmlTag($('input:text[name=ntp061NanCode]').val());
    var ankenName               = replaceHtmlTag($('input:text[name=ntp061NanName]').val());
    var ankenNameTitle          = $('input:text[name=ntp061NanName]').val();
    var ankenCompanySid         = $('input:hidden[name=ntp061SvCompanySid]').val();
    var ankenCompanyCode        = replaceHtmlTag($('input:hidden[name=ntp061SvCompanyCode]').val());
    var ankenCompanyName        = replaceHtmlTag($('input:hidden[name=ntp061SvCompanyName]').val());
    var ankenCompanyBaseSid     = $('input:hidden[name=ntp061SvCompanyBaseSid]').val();
    var ankenCompanyBaseName    = $('input:hidden[name=ntp061SvCompanyBaseName]').val();

    if (rowNumber != "") {
        rowNumber = "_" + rowNumber;
    }

    window.opener.$('#' + parentId + 'AnkenIdArea'       + rowNumber).html("");
    window.opener.$('#' + parentId + 'AnkenCodeArea'     + rowNumber).html("");
    window.opener.$('#' + parentId + 'AnkenNameArea'     + rowNumber).html("");



    addParentParam(parentId + 'AnkenIdArea' + rowNumber, parentId + 'AnkenSid' + rowNumber, ankenSid);

    window.opener.$('#' + parentId + 'AnkenCodeArea' + rowNumber).html("<span class=\"text_anken_code\">案件コード："
            + "<span class=\"anken_code_name" + rowNumber + "\">"
            + ankenCode
            + "</span>"
            + "</span>");

    window.opener.$('#' + parentId + 'AnkenNameArea' + rowNumber).html("<span class=\"text_anken\">"
            + "<a id=\"" + ankenSid + "\" class=\"cl_linkDef js_anken_click mr5\">"
            + "<img class=\"btn_classicImg-display\" src=\"../nippou/images/classic/icon_anken_18.png\">"
            + "<img class=\"btn_originalImg-display\" src=\"../nippou/images/original/icon_anken.png\">"
            + "<span class=\"ml5 anken_name" + rowNumber + "\">"
            + ankenName
            + "</span>"
            + "</a></span>"
            + "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\" onclick=\"delAnken('" + parentId + "','" + rowNumber + "');\">"
            + "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\" onclick=\"delAnken('" + parentId + "','" + rowNumber + "');\">");

    if (ankenCompanySid != null && ankenCompanySid != "" && ankenCompanySid != 0 && ankenCompanySid != -1
            && window.opener.$('#' + parentId + 'CompanyIdArea'     + rowNumber).html() != null
            && window.opener.$('#' + parentId + 'CompNameArea'      + rowNumber).html() != null
            && window.opener.$('#' + parentId + 'CompanyBaseIdArea' + rowNumber).html() != null
            && window.opener.$('#' + parentId + 'AddressIdArea'     + rowNumber).html() != null
            && window.opener.$('#' + parentId + 'AddressNameArea'   + rowNumber).html() != null) {

        window.opener.$('#' + parentId + 'CompanyIdArea'     + rowNumber).html("");
        window.opener.$('#' + parentId + 'CompNameArea'      + rowNumber).html("");
        window.opener.$('#' + parentId + 'CompanyBaseIdArea' + rowNumber).html("");
        window.opener.$('#' + parentId + 'AddressIdArea'     + rowNumber).html("");
        window.opener.$('#' + parentId + 'AddressNameArea'   + rowNumber).html("");

        addParentParam(parentId + 'CompanyIdArea' + rowNumber, parentId + 'CompanySid' + rowNumber, ankenCompanySid);
        if(ankenCompanyBaseSid != null && ankenCompanyBaseSid != "" && ankenCompanyBaseSid != 0 && ankenCompanyBaseSid != -1) {
            addParentParam(parentId + 'CompanyBaseIdArea' + rowNumber, parentId + 'CompanyBaseSid' + rowNumber, ankenCompanyBaseSid);
        }

        window.opener.$('#' + parentId + 'CompanyCodeArea' + rowNumber).html("<span class=\"text_anken_code\">企業コード："
                + "<span class=\"comp_code_name" + rowNumber + "\">"
                + ankenCompanyCode
                + "</span>"
                + "</span>");

        window.opener.$('#' + parentId + 'CompNameArea' + rowNumber).html("<span class=\"text_company mr5\">"
                     + "<a id=\"" + ankenCompanySid + "\" class=\"cl_linkDef js_compClick\">"
                     + "<img class=\"btn_classicImg-display wp18\" src=\"../common/images/classic/icon_company.png\">"
                     + "<img class=\"btn_originalImg-display wp18\" src=\"../common/images/original/icon_company.png\">"
                     + "<span class=\"ml5 comp_name" + rowNumber + "\">"
                     + ankenCompanyName + " " + ankenCompanyBaseName
                     + "</span>"
                     + "</a></span>"
                     + "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\" onclick=\"delCompany('" + parentId + "','" + rowNumber + "');\">"
                     + "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\" onclick=\"delCompany('" + parentId + "','" + rowNumber + "');\">");
    }

    //タイトル設定
    if (window.opener.$("input[name=" + parentId + "Title" + rowNumber + "]").val() != null) {
        var titlestr = window.opener.$("input[name=" + parentId + "Title" + rowNumber + "]").val();
        if (titlestr == '') {
            window.opener.$("input[name=" + parentId + "Title" + rowNumber + "]").val(ankenNameTitle);
        }
    }

    window.opener.$("#toastMessageBody").html("").append("aaa");
    window.opener.displayToast("ntpAnkenToast");

    window.close();

    return false;
}

function addParentParam(parentAreaId, paramName, value) {
    var parentArea = window.opener.document.getElementById(parentAreaId);

    var paramHtml = parentArea.innerHTML;
    paramHtml += '<input type="hidden" name="' + paramName + '" value="' + value + '">';
    parentArea.innerHTML = paramHtml;
}

function replaceHtmlTag(s) {
    return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/</g,"&lt;").replace(/>/g,"&gt;") ;
}

function change061Tab(tab) {
    document.forms[0].ntp061SearchMode.value = tab;

    document.forms[0].CMD.value='changeTab';
    document.forms[0].submit();
    return false;
}

String.prototype.replaceAll = function (org, dest){
    return this.split(org).join(dest);
}

function itemSearchPush(cmd){

    $('.js_shohinErrorStr').empty();

    var priceSel  = $('input:text[name=ntp061ItmNhnPriceSale]').val().replaceAll(",","");
    var priceCost = $('input:text[name=ntp061ItmNhnPriceCost]').val().replaceAll(",","");
    var numberReg = new RegExp(/^[0-9]*$/);
    var spaceReg = new RegExp(/(^[ 　]+$)/);
    var kaigyo = "";
    var errorFlg = false;

    //販売金額入力チェック
    if (priceSel.match(spaceReg)) {
        $('.js_shohinErrorStr').append(msglist_ntp061["err.space.only"].replace("0", msglist_ntp061["hanbai"]));
        errorFlg = true;
    } else if (priceSel != "" && (priceSel.charAt(0) == " " || priceSel.charAt(0) == "　")) {
        $('.js_shohinErrorStr').append(msglist_ntp061["err.space.start"].replace("0", msglist_ntp061["hanbai"]));
        errorFlg = true;
    } else if (priceSel.length > 9) {
        $('.js_shohinErrorStr').append(msglist_ntp061["err.length"].replace("0", msglist_ntp061["hanbai"]).replace("1", 9));
        errorFlg = true;
    } else if (!priceSel.match(numberReg)) {
        $('.js_shohinErrorStr').append(msglist_ntp061["err.not.number"].replace("0", msglist_ntp061["hanbai"]));
        errorFlg = true;
    }
    
    if (errorFlg) {
	    kaigyo = "<br>";
    }

    //原価金額入力チェック
    if (priceCost.match(spaceReg)) {
        $('.js_shohinErrorStr').append(kaigyo + msglist_ntp061["err.space.only"].replace("0", msglist_ntp061["genka"]));
        errorFlg = true;
    } else if (priceCost != "" && (priceCost.charAt(0) == " " || priceCost.charAt(0) == "　")) {
        $('.js_shohinErrorStr').append(kaigyo + msglist_ntp061["err.space.start"].replace("0", msglist_ntp061["genka"]));
        errorFlg = true;
    } else if (priceCost.length > 9) {
        $('.js_shohinErrorStr').append(kaigyo + msglist_ntp061["err.length"].replace("0", msglist_ntp061["genka"]).replace("1", 9));
        errorFlg = true;
    } else if (!priceCost.match(numberReg)) {
        $('.js_shohinErrorStr').append(kaigyo + msglist_ntp061["err.not.number"].replace("0", msglist_ntp061["genka"]));
        errorFlg = true;
    }
    
    if (!errorFlg) {
        document.forms[0].CMD.value=cmd;
        document.forms[0].submit();
    } else {
	    /* 販売金額入力エラー */
        $('#dialog_error').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 170,
            width: 400,
            modal: true,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.5
            },
            buttons: {
              はい: function() {
                  $(this).dialog('close');
              }
            }
        });
    }
    
    return false;
}

function itemSelectPush(cmd){

    var priceSel  = $('input:text[name=ntp061ItmNhnPriceSale]').val();
    var priceCost = $('input:text[name=ntp061ItmNhnPriceCost]').val();

    if (isNaN(priceSel) && priceSel != "") {
      $('input:text[name=ntp061ItmNhnPriceSale]').val('');
    }

    if (isNaN(priceCost) && priceCost != "") {
      $('input:text[name=ntp061ItmNhnPriceCost]').val('');
    }

    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();

    return false;
}

function changeGroupCombo(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function moveUser(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function deleteDspCompany(){
    $('input:hidden[name=ntp061CompanySid]').val('');
    $('input:hidden[name=ntp061CompanyCode]').val('');
    $('input:hidden[name=ntp061CompanyName]').val('');
    $('input:hidden[name=ntp061CompanyBaseSid]').val('');
    $('input:hidden[name=ntp061CompanyBaseName]').val('');
    document.forms[0].submit();
    return false;
}

function moveDay(elm, kbn) {

    systemDate = new Date();

    //「今日ボタン押下」
    if (kbn == 2) {
        $(elm).val(systemDate.toISOString().split("T")[0].replaceAll("-", "/"));
        return;
    }

    //「前日」or 「翌日」ボタン押下
    if (kbn == 1 || kbn == 3) {

        var ymdf = $(elm).val();
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

            newDate = new Date(ymdf)
            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = newDate.getFullYear();
            var systemYear = systemDate.getFullYear();

            if (newYear >= systemYear - 5 && newYear <= systemYear + 5) {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(elm).val(year + "/" + month + "/" + day);
            }
        } else {
            if ($(elm).val() == '') {
                $(elm).val(systemDate.toISOString().split("T")[0].replaceAll("-", "/"));
            }
        }
    }
}
/**
  権限設定区分の選択で入力要素を切り替える
 */
function changeDspPermitMode() {
    var ENUM_PERM_KBN = {
            ALL:0,
            TANTO:1,
            SELECT:2,
    }
    var viewKbn = $('input:radio[name=ntp061NanPermitView]:checked').val();
    if (viewKbn == ENUM_PERM_KBN.SELECT) {
        $('.js_permissionViewLabel').addClass("display_n");
        $('.js_permissionEditRadio').addClass("display_n");
        $('.js_permissionViewLabel').parent().parent().parent().prev().attr("rowspan", 1);

        $('#nanPermitSelect').show();
        $('#nanPermitEditSelect').hide();
        return;
    }
    if (viewKbn == ENUM_PERM_KBN.TANTO) {
        //閲覧権限を担当のみの場合、編集権限区分を非表示、担当のみとする
        $('#ntp061NanPermitEdit1').attr("checked", true);
        $('.js_permissionViewLabel').addClass("display_n");
        $('.js_permissionViewLabel').parent().parent().parent().prev().attr("rowspan", 1);
        $('.js_permissionEditRadio').addClass("display_n");

        $('#nanPermitSelect').hide();
        $('#nanPermitEditSelect').hide();

        return;
    }
    if (viewKbn == ENUM_PERM_KBN.ALL) {
        //閲覧権限を制限しない場合、編集権限区分選択を表示
        $('.js_permissionViewLabel').removeClass("display_n");
        $('.js_permissionViewLabel').parent().parent().parent().prev().attr("rowspan", 2);
        $('.js_permissionEditRadio').removeClass("display_n");

        $('#nanPermitSelect').hide();

        var editKbn = $('input:radio[name=ntp061NanPermitEdit]:checked').val();
        if (editKbn == ENUM_PERM_KBN.ALL) {
        $('#nanPermitEditSelect').hide();
            return;
        }
        if (editKbn == ENUM_PERM_KBN.TANTO) {
        $('#nanPermitEditSelect').hide();
            return;
        }
        if (editKbn == ENUM_PERM_KBN.SELECT) {
        $('#nanPermitEditSelect').show();
            return;
        }
    }
}

function cmn110DropBan() {
    return !$('.js_itmArea').hasClass('display_n');
}