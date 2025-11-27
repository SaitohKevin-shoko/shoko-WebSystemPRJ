var ankenSubWindow;

function openAnkenWindow(parentPageId, rowNumber) {
    var winWidth=900;
    var winHeight=800;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var url = '../nippou/ntp200.do';
    url += '?ntp200parentPageId=' + parentPageId + "&ntp200RowNumber=" + rowNumber;
    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    ankenSubWindow = window.open(url, 'thissite', opt);
    return false;
}

function companyWindowClose() {
    if(ankenSubWindow != null){
        ankenSubWindow.close();
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
    document.forms[0].ntp200Index.value=idx;
    document.forms[0].ntp200Str.value='-1';
    document.forms[0].submit();
    return false;
}

function selectStr(str) {
    document.forms[0].CMD.value='init';
    document.forms[0].ntp200Str.value=str;
    document.forms[0].submit();
    return false;
}

function parentReload() {

    var parentDocument = window.opener.document;
    parentDocument.forms[0].CMD.value = 'selectedCompany';

    var parentId = document.forms['ntp200Form'].ntp200parentPageId.value;

    var companySid = encodeURIComponent(document.forms['ntp200Form'].ntp200CompanySid.value);
    var companyBaseSid = encodeURIComponent(document.forms['ntp200Form'].ntp200CompanyBaseSid.value);
    var proAddFlg = encodeURIComponent(document.forms['ntp200Form'].ntp200ProAddFlg.value);
    var companyId = companySid + ":" + companyBaseSid;
    if (companyId.length <= 1) {
        window.close();
        return false;
    }

    if (document.forms['ntp200Form'].ntp200mode.value == 0) {

        addParentParam(parentId + 'CompanyIdArea', parentId + 'CompanySid', companySid);
        addParentParam(parentId + 'CompanyBaseIdArea', parentId + 'CompanyBaseSid', companyBaseSid);
        if (proAddFlg != 1) {
            var parentTitle = getParentParam(parentId + 'Title');
            if (parentTitle == null || parentTitle.length == 0) {
                setParentParam(parentId + 'Title', document.forms['ntp200Form'].ntp200CompanyName.value);
            }
        }

        var addressId = document.getElementsByName('ntp200Address');
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

    var adrCheck = document.getElementsByName('ntp200Address');
    var nocheckFlg = 0;

    for (index = 0; index < adrCheck.length; index++) {
        if (adrCheck[index].checked) {
            nocheckFlg = 1;
        }
    }

    if (document.forms['ntp200Form'].ntp200ProAddFlg.value == 1 && nocheckFlg == 0) {
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
    var coRadio = document.getElementsByName('ntp200selectCompany');

    if (coRadio != null) {
        for (index = 0; index < coRadio.length; index++) {
            coRadio[index].checked = (coRadio[index].value == companyId);
        }
    }

    return selectCompany();
}

function selectCompany() {
    var coRadio = document.getElementsByName('ntp200selectCompany');
    if (coRadio != null) {
        for (index = 0; index < coRadio.length; index++) {
            if (coRadio[index].checked == true) {
               var paramName = 'ntp200selectCompanyName' + coRadio[index].value;
               var coParam = coRadio[index].value.split(':');
               viewTanto(coParam[0], coParam[1],
                         document.getElementsByName(paramName)[0].value);
               break;
            }
        }
    }
}

function viewTanto(adrSid, adrBaseSid, adrName) {

    document.forms['ntp200Form'].ntp200CompanySid.value = adrSid;
    document.forms['ntp200Form'].ntp200CompanyBaseSid.value = adrBaseSid;
    document.forms['ntp200Form'].ntp200CompanyName.value = adrName;

    var url = "../address/adr241.do";
    url += "?ntp200CompanySid=" + adrSid;
    url += "&ntp200CompanyBaseSid=" + adrBaseSid;

    $.ajaxSetup({async:false});
    $.post(url, function(data){
        if ($('#tantoArea')[0] != null) {
            $('#tantoArea')[0].innerHTML = data;
        }
    });
}


function clickAddressName(adrSid) {

    var adrCheck = document.getElementsByName('ntp200Address');
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


function setParent(selectSid) {

    var parentDocument          = window.opener.document;
    var parentId                = document.forms['ntp200Form'].ntp200parentPageId.value;
    var rowNumber               = document.forms['ntp200Form'].ntp200RowNumber.value;
    var ankenCode               = replaceHtmlTag($('input#ankenCode_'        + selectSid).val());
    var ankenName               = replaceHtmlTag($('input#ankenName_'        + selectSid).val());
    var ankenMikomido           = $('input#ankenMikomido_'    + selectSid).val();
    var ankenNameTitle           = $('input#ankenName_'        + selectSid).val();
    var ankenCompanySid         = $('input#ankenCompanySid_'  + selectSid).val();
    var ankenCompanyCode        = replaceHtmlTag($('input#ankenCompanyCode_'  + selectSid).val());
    var ankenCompanyName        = replaceHtmlTag($('input#ankenCompanyName_' + selectSid).val());
    var ankenCompanyBaseSid      = $('input#ankenBaseSid_'     + selectSid).val();
    var ankenCompanyBaseName    = replaceHtmlTag($('input#ankenBaseName_'    + selectSid).val());
    var comcodestr = "";
    var comdelstr = "";

    if (rowNumber != "") {
        rowNumber = "_" + rowNumber;
    }

    window.opener.$('#' + parentId + 'AnkenIdArea'       + rowNumber).html("");
    window.opener.$('#' + parentId + 'AnkenCodeArea'     + rowNumber).html("");
    window.opener.$('#' + parentId + 'AnkenNameArea'     + rowNumber).html("");


    addParentParam(parentId + 'AnkenIdArea' + rowNumber, parentId + 'AnkenSid' + rowNumber, selectSid);

    window.opener.$('#' + parentId + 'AnkenCodeArea' + rowNumber).append("案件コード："
            + ankenCode);

    window.opener.$('#' + parentId + 'AnkenNameArea' + rowNumber).html("<a id=\"" + selectSid + "\" class=\"cl_linkDef js_anken_click mr5\">"
            + "<img class=\"btn_classicImg-display\" src=\"../nippou/images/classic/icon_anken_18.png\">"
            + "<img class=\"btn_originalImg-display\" src=\"../nippou/images/original/icon_anken.png\">"
            + "<span class=\"ml5\">" + ankenName + "</span>"
            + "</a>"
            + "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\" onclick=\"delAnken('" + parentId + "','" + rowNumber + "');\">"
            + "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\" onclick=\"delAnken('" + parentId + "','" + rowNumber + "');\">");

    if (ankenCompanySid != null && ankenCompanySid != "" && ankenCompanySid != 0 && ankenCompanySid != -1) {
      comcodestr = "企業コード："
    }

    if (/*ankenCompanySid != null && ankenCompanySid != "" && ankenCompanySid != 0 && ankenCompanySid != -1
            && */window.opener.$('#' + parentId + 'CompanyIdArea'     + rowNumber).html() != null
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
        addParentParam(parentId + 'CompanyBaseIdArea' + rowNumber, parentId + 'CompanyBaseSid' + rowNumber, ankenCompanyBaseSid);

        window.opener.$('#' + parentId + 'CompanyCodeArea' + rowNumber).html("<span class=\"text_anken_code\">"
                + comcodestr
                + "<span class=\"comp_code_name" + rowNumber + "\">"
                + ankenCompanyCode
                + "</span>"
                + "</span>");

        if (ankenCompanyName != "") {
            window.opener.$('#' + parentId + 'CompNameArea' + rowNumber).html("<div class=\"text_company\">"
                    + "<a id=\"" + ankenCompanySid + "\""
                    + " class=\"cl_linkDef js_compClick mr5\">"
                    + "<img class=\"btn_classicImg-display wp18\" src=\"../common/images/classic/icon_company.png\">"
                    + "<img class=\"btn_originalImg-display wp18\" src=\"../common/images/original/icon_company.png\">"
                    + "<span class=\"ml5 comp_name" + rowNumber + "\">"
                    + ankenCompanyName + " " + ankenCompanyBaseName
                    + "</span>"
                    + "</a>"
                    + "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\" onclick=\"delCompany('" + parentId + "','" + rowNumber + "');\">"
                    + "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\" onclick=\"delCompany('" + parentId + "','" + rowNumber + "');\">");
        }
    }

    //タイトル設定
    if (window.opener.$("input[name=" + parentId + "Title" + rowNumber + "]").val() != null) {
        var titlestr = window.opener.$("input[name=" + parentId + "Title" + rowNumber + "]").val();
        if (titlestr == '') {
            window.opener.$("input[name=" + parentId + "Title" + rowNumber + "]").val(ankenNameTitle);
        }
    }

    //見込み度設定
    if (window.opener.$("input[name=" + parentId + "Mikomido" + rowNumber + "]").val() != null) {
        window.opener.$("input[name=" + parentId + "Mikomido" + rowNumber + "][value=" + ankenMikomido + "]").attr("checked", true);
    }


    window.close();

    return false;
}

function delAnken(parentId, rowNumber) {

    $('#' + parentId + 'AnkenIdArea' + rowNumber).html("");
    $('#' + parentId + 'AnkenCodeArea' + rowNumber).html("");
    $('#' + parentId + 'AnkenNameArea' + rowNumber).html("");

    return false;
}

function changePage(pageCombo) {
    if (pageCombo == 0) {
        document.forms[0].ntp200PageBottom.value = document.forms[0].ntp200PageTop.value;
    } else {
        document.forms[0].ntp200PageTop.value = document.forms[0].ntp200PageBottom.value;
    }
    buttonPush('changePage');
}

function replaceHtmlTag(s) {
    return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/</g,"&lt;").replace(/>/g,"&gt;") ;
}

$(function() {
    if ($(window).live) {
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

        $(".js_ankenSortLink").live({
            click:function(){
                if($(this).attr('id') == $("input[name=ntp200SortKey1]").val()){

                   if($("input[name=ntp200OrderKey1]").val() == 0) {
                       $("input[name=ntp200OrderKey1]").val(1);
                   } else {
                       $("input[name=ntp200OrderKey1]").val(0);
                   }
                } else {
                    $(this).addClass("anken_sort_sel_desc");
                    $("input[name=ntp200SortKey1]").val($(this).attr('id'));
                    $("input[name=ntp200OrderKey1]").val(1);
                }
                document.forms[0].submit();
            }
        });
    }
    if ($(window).on) {
        $('.js_listHover')
            .mouseenter(function (e) {
                $(this).children().addClass("list_content-on");
                $(this).prev().children().addClass("list_content-topBorder");
            })
            .mouseleave(function (e) {
                $(this).children().removeClass("list_content-on");
                $(this).prev().children().removeClass("list_content-topBorder");
            });

        $(document).on("click", ".js_ankenSortLink", function() {
            if ($(this).attr('id') == $("input[name=ntp200SortKey1]").val()) {

                if ($("input[name=ntp200OrderKey1]").val() == 0) {
                    $("input[name=ntp200OrderKey1]").val(1);
                } else {
                    $("input[name=ntp200OrderKey1]").val(0);
                }
            } else {
                $(this).addClass("anken_sort_sel_desc");
                $("input[name=ntp200SortKey1]").val($(this).attr('id'));
                $("input[name=ntp200OrderKey1]").val(1);
            }
            document.forms[0].submit();
        });
    }
});
