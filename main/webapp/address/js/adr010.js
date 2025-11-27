function setParams() {
	
	setYmdParam($("input[name='adr010SltFrContact']"),
	    $("input[name='adr010SltYearFrContact']"),
	    $("input[name='adr010SltMonthFrContact']"),
	    $("input[name='adr010SltDayFrContact']"));
	    
	setYmdParam($("input[name='adr010SltToContact']"),
	    $("input[name='adr010SltYearToContact']"),
	    $("input[name='adr010SltMonthToContact']"),
	    $("input[name='adr010SltDayToContact']"));
}


function changeCmdMode(cmdMode) {
    document.forms[0].adr010cmdMode.value = cmdMode;
    document.forms[0].adr010searchFlg.value = 0;
    document.forms[0].adr010InitDspContactFlg.value = 0;
    buttonPush('init');
}

function changeCmdModeForContact(cmdMode, sortKey, order) {

    if (document.forms[0].adr010cmdMode.value != cmdMode) {
        document.forms[0].adr010sortKey.value = sortKey;
        document.forms[0].adr010orderKey.value = order;
    }
    changeCmdMode(cmdMode);
}

function searchToKana(kana) {
    document.forms[0].adr010SearchKana.value = kana;

    buttonPush('search');
}

function searchToComKana(kana) {
    document.forms[0].adr010SearchComKana.value = kana;
    buttonPush('searchCompanyInit');
}

function sort(inputSortKey) {

    var sortKey = $("input:hidden[name='adr010sortKey']").val();
    var orderKey = $("input:hidden[name='adr010orderKey']").val();
    if (sortKey == inputSortKey) {
        if (orderKey == 1) {
            $("input:hidden[name='adr010orderKey']").val(0);
        } else {
            $("input:hidden[name='adr010orderKey']").val(1);
        }
    } else {
        $("input:hidden[name='adr010orderKey']").val(0);
    }

    $("input:hidden[name='adr010sortKey']").val(inputSortKey);
    buttonPush('init');
    return false;
}

function editAddress(procMode, adrSid) {
    document.forms[0].adr020ProcMode.value = procMode;
    document.forms[0].adr010EditAdrSid.value = adrSid;

    buttonPush('editAdrData');
}

function viewCompany(acoSid) {
    document.forms[0].adr100backFlg.value = 2;
    document.forms[0].adr110editAcoSid.value = acoSid;

    buttonPush('viewCompany');
}

function viewContact(adrSid) {
    document.forms[0].adr010EditAdrSid.value = adrSid;

    buttonPush('contact');
}

function changePage(pageCmbName) {
    setPageParam('adr010page', pageCmbName);

    buttonPush('init');
}

function labelCheck(id) {

    var chkObj = document.forms[0].adr010searchLabel;
    if (typeof chkObj.length == "undefined") {
        chkObj.checked = "true";
    } else {
        for (i = 0; i < chkObj.length; i++) {
            if (id == chkObj[i].value) {
                if (chkObj[i].checked) {
                    chkObj[i].checked = false;
                } else {
                    chkObj[i].checked = true;
                }
                break;
            }
        }
    }

    var dspMode = $("input:hidden[name='adr010cmdMode']").val();
    if (dspMode == 0) {
        buttonPush('searchCompanyInit');
    } else {
        buttonPush('search');
    }

}

function changeChk(){
   var chkFlg;
   if (document.forms[0].allCheck.checked) {
       chkFlg = true;
   } else {
       chkFlg = false;
   }
   delAry = document.getElementsByName("adr010selectSid");
   for(i = 0; i < delAry.length; i++) {
       delAry[i].checked = chkFlg;
   }
}

function changCcategoryCombo(){
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function openlabel(){
  checkAdd = document.getElementsByName("adr010selectSid");
  var chkCount = 0;
  for(i = 0; i < checkAdd.length; i++) {
    if (checkAdd[i].checked == false) {
      chkCount = chkCount + 1;
    }
  }
  if (checkAdd.length == chkCount) {
    alert("アドレスを選択してください。");
  } else {
    var labLoc = '../address/adr260.do?adr260parentLabelName=adr010selectLabelSid';
    $('iframe[name=lab]').attr({'src':labLoc});
    $('#labelPanel').dialog({
        modal: true,
        title:'ラベルを選択してください',
        autoOpen: true,  // hide dialog
        resizable: false,
        height: '365',
        width: '360',
        open: function() {
            $(".ui-dialog-titlebar-close", $(this).closest(".ui-dialog")).hide();
        }
    });
  }

  return false;
}

function adr010DateKbn() {
    if (document.forms[0].adr010dateNoKbn.checked == true) {
        document.forms[0].adr010SltFrContact.disabled=true;
        document.forms[0].adr010SltToContact.disabled=true;
    } else {
        document.forms[0].adr010SltFrContact.disabled=false;
        document.forms[0].adr010SltToContact.disabled=false;
    }
}

function addAddress(mode, adrSid, cmd) {
    return addAddressExt(mode, adrSid, cmd, 0);
}

function addAddressExt(mode, adrSid, cmd, type) {
    document.forms[0].adr010SendMailMode.value = mode;
    if (adrSid > 0) {
        document.forms[0].adr010AdrSid.value = adrSid;
        document.forms[0].adr010AdrType.value = type;
    }

    buttonPush(cmd);
}

function deleteSend(mode, usrSid, kbn) {
    document.forms[0].CMD.value='deleteSend';
    document.forms[0].adr010SendMailMode.value=mode;
    document.forms[0].adr010DelAdrSid.value=usrSid;
    document.forms[0].adr010AdrType.value = kbn;
    document.forms[0].submit();
    return false;
}

$(function() {

    /* 表示モード */
    var dspMode = $("input:hidden[name='adr010cmdMode']").val();
    if (dspMode == 0) {
        //グループ
    	$("#0").removeClass("searchMenu_title");
        $("#0").addClass("searchMenu_title-select");
    } else if (dspMode == 1) {
        //詳細
    	$("#1").removeClass("searchMenu_title");
        $("#1").addClass("searchMenu_title-select");
    } else if (dspMode == 2) {
        //詳細
    	$("#2").removeClass("searchMenu_title");
        $("#2").addClass("searchMenu_title-select");
    } else if (dspMode == 3) {
        //詳細
    	$("#3").removeClass("searchMenu_title");
        $("#3").addClass("searchMenu_title-select");
    } else if (dspMode == 4) {
        //詳細
    	$("#4").removeClass("searchMenu_title");
        $("#4").addClass("searchMenu_title-select");
    } else {
        //詳細
    	$("#5").removeClass("searchMenu_title");
        $("#5").addClass("searchMenu_title-select");
    }

    /* 画面切り替え  hover*/
    $('.dialog_changeSel').hover(
        function () {
            $(this).addClass("dialog_changeSel-hover");
        },
        function () {
            $(this).removeClass("dialog_changeSel-hover");
        }
    );

    /* メニュークリック */
    $(document).on('click', '.js_search_menu_title', function() {
        var selectMenu = $(this).attr('id');
        /* submitするかチェックする */
        if (submitCheck(selectMenu)) {
            if (selectMenu == "5") {
                changeCmdModeForContact(selectMenu, 5, 1);
            } else {
                changeCmdMode(selectMenu);
            }
        }
    });

    var openFlgs =  $("input:hidden[name='adr010CategoryOpenFlg']");
    for(var i=0, l=openFlgs.length; i<l; i++) {
        var dataId = "#" + "category_data_" + i;
        var headId = "#" + "category_head_" + i;
        if (openFlgs[i].value == 1) {
            $(dataId).show();
            $(headId).removeClass("labelSelect_category-close");
        	$(headId).addClass("labelSelect_category-open");
        } else {
            $(dataId).hide();
        }
    }

    $('.js_tableTopCheck-header').on("change",function() {
    	if($('.js_mailFlg').length){
    		chgCheckAll('adr010webAllCheck', 'adr010selectSid');
        } else {
        	changeChk();
        }
    });
})

function submitCheck(selectMenu) {
    //表示モード
    var dspMode = $("input:hidden[name='adr010cmdMode']").val();

    if ((dspMode == 0 && selectMenu == "0")
            || (dspMode == 1 && selectMenu == "1")
            || (dspMode == 2 && selectMenu == "2")
            || (dspMode == 3 && selectMenu == "3")
            || (dspMode == 4 && selectMenu == "4")
            || (dspMode == 5 && selectMenu == "5")) {
        return false;
    } else {
        return true;
    }
}

function changeDspCategory(catId) {

    var dataId = "#" + "category_data_" + catId;
    var headId = "#" + "category_head_" + catId;

    if ($(headId).hasClass("labelSelect_category-close")) {
    	$(headId).removeClass("labelSelect_category-close");
    	$(headId).addClass("labelSelect_category-open");
    } else {
    	$(headId).removeClass("labelSelect_category-open");
    	$(headId).addClass("labelSelect_category-close");
    }

    $(dataId).animate( { height: 'toggle'}, 'middle' );

    var now = $("input:hidden[name='adr010CategoryOpenFlg']");

    if (now[catId].value == 1) {
        now[catId].value = 0;
    } else {
        now[catId].value = 1;
    }
}

function changePopup() {
    var url = "../user/usr040.do?usr040webmail=1";
    url += "&usr040webmailAddress=" + document.getElementsByName('adr010webmailAddress')[0].value;
    url += "&usr040webmailType=" + document.getElementsByName('adr010webmailType')[0].value;
    location.href = url;
    return true;
}
