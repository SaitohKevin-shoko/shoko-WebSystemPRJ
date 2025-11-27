var companySubWindow;

function openCompanyWindow(parentPageId) {
    var winWidth=900;
    var winHeight=700;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var url = '../address/adr240.do';
    url += '?adr240parentPageId=' + parentPageId;
    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    companySubWindow = window.open(url, 'thissite', opt);
    return false;
}

function openCompanyWindow2(parentPageId, rowNumber) {
    var winWidth=900;
    var winHeight=700;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var url = '../address/adr240.do';
    url += '?adr240parentPageId=' + parentPageId + "&adr240mode=1" + "&adr240PrsMode=1" + "&adr240RowNumber=" + rowNumber;
    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    companySubWindow = window.open(url, 'thissite', opt);
    return false;
}

function openCompanyWindow3(parentPageId) {
    var winWidth=900;
    var winHeight=700;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var url = '../address/adr240.do';
    url += '?adr240parentPageId=' + parentPageId;
    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    companySubWindow = window.open(url, 'thissite', opt);
    return false;
}

function companyWindowClose() {
    if(companySubWindow != null){
        companySubWindow.close();
    }
}

function getCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}

function selectLine(idx) {
    document.forms[0].CMD.value='init';
    document.forms[0].adr240Index.value=idx;
    document.forms[0].adr240Str.value='-1';
    document.forms[0].submit();
    return false;
}

function selectStr(str) {
    document.forms[0].CMD.value='init';
    document.forms[0].adr240Str.value=str;
    document.forms[0].submit();
    return false;
}

function parentReload() {

    var parentDocument = window.opener.document;
    parentDocument.forms[0].CMD.value = 'selectedCompany';

    var parentId = document.forms['adr240Form'].adr240parentPageId.value;

    var companySid = encodeURIComponent(document.forms['adr240Form'].adr240CompanySid.value);
    var companyBaseSid = encodeURIComponent(document.forms['adr240Form'].adr240CompanyBaseSid.value);
    var proAddFlg = encodeURIComponent(document.forms['adr240Form'].adr240ProAddFlg.value);
    var companyId = companySid + ":" + companyBaseSid;
    if (companyId.length <= 1) {
        window.close();
        return false;
    }

    if (document.forms['adr240Form'].adr240mode.value == 0) {

        addParentParam(parentId + 'CompanyIdArea', parentId + 'CompanySid', companySid);
        addParentParam(parentId + 'CompanyBaseIdArea', parentId + 'CompanyBaseSid', companyBaseSid);
        if (proAddFlg != 1) {
            var parentTitle = getParentParam(parentId + 'Title');
            if (parentTitle == null || parentTitle.length == 0) {
                setParentParam(parentId + 'Title', document.forms['adr240Form'].adr240CompanyName.value);
            }
        }

        var addressId = document.getElementsByName('adr240Address');
        if (addressId != null) {
            for (index = 0; index < addressId.length; index++) {
                if (addressId[index].checked == true) {
                    addParentParam(parentId + 'AddressIdArea',
                                   parentId + 'AddressId',
                                   encodeURIComponent(addressId[index].value));
                }
            }
        }

    } else {
        addParentParamNew(parentId + 'CompanyIdArea', parentId + 'CompanySid', companySid);
        addParentParamNew(parentId + 'CompanyBaseIdArea', parentId + 'CompanyBaseSid', companyBaseSid);
    }

    var adrCheck = document.getElementsByName('adr240Address');
    var nocheckFlg = 0;

    for (index = 0; index < adrCheck.length; index++) {
        if (adrCheck[index].checked) {
            nocheckFlg = 1;
        }
    }

    if (document.forms['adr240Form'].adr240ProAddFlg.value == 1 && nocheckFlg == 0) {
        document.forms[0].CMD.value = 'proNoSelTanto';
        document.forms[0].submit();
        return false;
    }

    parentDocument.forms[0].submit();
    if (proAddFlg == 1) {
      window.close();
    }

    return false;
}

function getParentParam(paramName) {
    return window.opener.document.getElementsByName(paramName)[0].value;
}

function setParentParam(paramName, value) {
    window.opener.document.getElementsByName(paramName)[0].value = value;
}

function addParentParam(parentAreaId, paramName, value) {
    var parentArea = window.opener.document.getElementById(parentAreaId);

    var paramHtml = parentArea.innerHTML;
    paramHtml += '<input type="hidden" name="' + paramName + '" value="' + value + '">';
    parentArea.innerHTML = paramHtml;
}

function addParentParamNew(parentAreaId, paramName, value) {
    var parentArea = window.opener.document.getElementById(parentAreaId);

    paramHtml = '<input type="hidden" name="' + paramName + '" value="' + value + '">';
    parentArea.innerHTML = paramHtml;
}

function clickCompanyName(coSid, coBaseSid) {
    var companyId = coSid + ":" + coBaseSid;
    var coRadio = document.getElementsByName('adr240selectCompany');

    if (coRadio != null) {
        for (index = 0; index < coRadio.length; index++) {
            coRadio[index].checked = (coRadio[index].value == companyId);
        }
    }
    return selectCompany();
}

function clickCompanyName2(coParamId) {

    var coParam = coParamId.split(':');

    document.forms['adr240Form'].adr240CompanySid.value = coParam[0];
    document.forms['adr240Form'].adr240CompanyBaseSid.value = coParam[1];
    document.forms['adr240Form'].adr240CompanyName.value = document.getElementsByName('adr240selectCompanyName' + coParamId)[0].value;
    var comCode = $('input[name=adr240selectCompanyCode' + coParam[0] + '_' + coParam[1] + ']').val();
    document.forms['adr240Form'].adr240CompanyCode.value = comCode;

    return parentReload();
}

function selectCompany() {
    var coRadio = document.getElementsByName('adr240selectCompany');
    if (coRadio != null) {
        for (index = 0; index < coRadio.length; index++) {
            if (coRadio[index].checked == true) {
               var paramName = 'adr240selectCompanyName' + coRadio[index].value;
               var coParam = coRadio[index].value.split(':');
               viewTanto(coParam[0], coParam[1],
                         document.getElementsByName(paramName)[0].value);
               break;
            }
        }
    }
}

function viewTanto(adrSid, adrBaseSid, adrName) {

    document.forms['adr240Form'].adr240CompanySid.value = adrSid;
    document.forms['adr240Form'].adr240CompanyBaseSid.value = adrBaseSid;
    document.forms['adr240Form'].adr240CompanyName.value = adrName;
    var comCode = $('input[name=adr240selectCompanyCode' + adrSid + '_' + adrBaseSid + ']').val();
    document.forms['adr240Form'].adr240CompanyCode.value = comCode;

    var url = "../address/adr241.do";
    url += "?adr240CompanySid=" + adrSid;
    url += "&adr240CompanyBaseSid=" + adrBaseSid;

    $.ajaxSetup({async:false});
    $.post(url, function(data){
        if ($('#tantoAll') != null) {
        	$('.js_tantoArea').remove();
            $('#tantoAll').append(data);
        }
    });
}


function clickAddressName(adrSid) {

    var adrCheck = document.getElementsByName('adr240Address');
    if (adrCheck != null) {
        for (index = 0; index < adrCheck.length; index++) {
            if (adrCheck[index].value == adrSid) {
                if (adrCheck[index].checked == false) {
                    adrCheck[index].checked = true;
                } else {
                    adrCheck[index].checked = false;
                }
                break;
            }
        }
    }
}


function setParent(coParamId) {

    var coParam = coParamId.split(':');

    document.forms['adr240Form'].adr240CompanySid.value = coParam[0];
    document.forms['adr240Form'].adr240CompanyBaseSid.value = coParam[1];
    document.forms['adr240Form'].adr240CompanyName.value = document.getElementsByName('adr240selectCompanyName' + coParamId)[0].value;
    var comCode = $('input[name=adr240selectCompanyCode' + coParam[0] + '_' + coParam[1] + ']').val();
    document.forms['adr240Form'].adr240CompanyCode.value = comCode;

    var parentDocument = window.opener.document;
    var parentId       = document.forms['adr240Form'].adr240parentPageId.value;
    var rowNumber      = document.forms['adr240Form'].adr240RowNumber.value;
    var companySid     = encodeURIComponent(document.forms['adr240Form'].adr240CompanySid.value);
    var companyCode    = replaceHtmlTag(document.forms['adr240Form'].adr240CompanyCode.value);
    var companyBaseSid = encodeURIComponent(document.forms['adr240Form'].adr240CompanyBaseSid.value);
    var proAddFlg      = encodeURIComponent(document.forms['adr240Form'].adr240ProAddFlg.value);
    var companyId      = companySid + ":" + companyBaseSid;
    if (companyId.length <= 1) {
        window.close();
        return false;
    }

    if (rowNumber != "") {
        rowNumber = "_" + rowNumber;
    }

    window.opener.$('#' + parentId + 'CompanyCodeArea' + rowNumber).html("");
    window.opener.$('#' + parentId + 'CompanyIdArea' + rowNumber).html("");
    window.opener.$('#' + parentId + 'CompNameArea' + rowNumber).html("");
    window.opener.$('#' + parentId + 'CompanyBaseIdArea' + rowNumber).html("");
    window.opener.$('#' + parentId + 'AddressIdArea' + rowNumber).html("");
    window.opener.$('#' + parentId + 'AddressNameArea' + rowNumber).html("");

    addParentParam(parentId + 'CompanyIdArea' + rowNumber, parentId + 'CompanySid' + rowNumber, companySid);
    addParentParam(parentId + 'CompanyBaseIdArea' + rowNumber, parentId + 'CompanyBaseSid' + rowNumber, companyBaseSid);


    window.opener.$('#' + parentId + 'CompanyCodeArea' + rowNumber).html("企業コード："
            + "<span class=\"comp_code_name" + rowNumber + "\">"
            + companyCode
            + "</span>");

    window.opener.$('#' + parentId + 'CompNameArea' + rowNumber).html("<a id=\"" + companySid + "\" class=\" cl_linkDef js_compClick mr5\">"
                 + "<img class=\"btn_classicImg-display wp18\" src=\"../common/images/classic/icon_company.png\">"
                 + "<img class=\"btn_originalImg-display wp18\" src=\"../common/images/original/icon_company.png\">"
                 + "<span class=\"comp_name" + rowNumber + " ml5\">"
                 + replaceHtmlTag(document.forms['adr240Form'].adr240CompanyName.value)
                 + "</span>"
                 + "</a>"
                 + "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\"  onclick=\"delCompany('" + parentId + "','" + rowNumber + "');\">"
                 + "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\"  onclick=\"delCompany('" + parentId + "','" + rowNumber + "');\">");

    var addressId = document.getElementsByName('adr240Address');
    if (addressId != null) {
        for (index = 0; index < addressId.length; index++) {
            if (addressId[index].checked == true) {
                addParentParam(parentId + 'AddressIdArea' + rowNumber,
                               parentId + 'AddressId' + rowNumber,
                               encodeURIComponent(addressId[index].value));

                var addresNameId = 'adrName_' + addressId[index].value;
                window.opener.$('#' + parentId + 'AddressNameArea' + rowNumber).append("<span class=\"text_tantou2\">"
                        + $('input#' + addresNameId).val() + "</span>");
            }
        }
    }


    var adrCheck = document.getElementsByName('adr240Address');
    var nocheckFlg = 0;

    for (index = 0; index < adrCheck.length; index++) {
        if (adrCheck[index].checked) {
            nocheckFlg = 1;
        }
    }

    //タイトル設定
    if (window.opener.$("input[name=" + parentId + "Title" + rowNumber + "]").val() != null) {
        var titlestr = window.opener.$("input[name=" + parentId + "Title" + rowNumber + "]").val();
        if (titlestr == '') {
            window.opener.$("input[name=" + parentId + "Title" + rowNumber + "]").val(document.forms['adr240Form'].adr240CompanyName.value);
        }
    }

//    if (document.forms['adr240Form'].adr240ProAddFlg.value == 1 && nocheckFlg == 0) {
//        document.forms[0].CMD.value = 'proNoSelTanto';
//        document.forms[0].submit();
//        return false;
//    }
//
//    parentDocument.forms[0].submit();


    window.close();

    return false;
}

function delCompany(parentId, rowNumber) {

    $('#' + parentId + 'CompanyIdArea' + rowNumber).html("");
    $('#' + parentId + 'CompanyCodeArea' + rowNumber).html("");
    $('#' + parentId + 'CompNameArea' + rowNumber).html("");
    $('#' + parentId + 'CompanyBaseIdArea' + rowNumber).html("");
    $('#' + parentId + 'AddressIdArea' + rowNumber).html("");
    $('#' + parentId + 'AddressNameArea' + rowNumber).html("");

    return false;
}

function replaceHtmlTag(s) {
    return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/</g,"&lt;").replace(/>/g,"&gt;") ;
}

function  changeGyoshuCombo() {
    document.forms[0].submit();
    return false;
}

function change240Tab(tab) {
    document.forms[0].adr240SearchMode.value = tab;

    document.forms[0].CMD.value='changeTab';
    document.forms[0].submit();
    return false;
}

$(function() {
    /* hover */
    if ($(window).live) {
      $('.js_listHover').live({
        "mouseenter": function(){
          setMouseEnterEvt($(this));
        },
        "mouseleave": function(){
           setMouseLeaveEvt($(this));
        }
      });
    } else if ($(window).on) {
      $('.js_listHover').on({
        "mouseenter": function(){
          setMouseEnterEvt($(this));
        },
        "mouseleave": function(){
           setMouseLeaveEvt($(this));
        }
      });
    }

    $('#tantoArea').remove();

});

function setMouseEnterEvt(obj) {
    obj.children().addClass("list_content-on");
    obj.prev().children().addClass("list_content-topBorder");
}

function setMouseLeaveEvt(obj) {
    obj.children().removeClass("list_content-on");
    obj.prev().children().removeClass("list_content-topBorder");
}