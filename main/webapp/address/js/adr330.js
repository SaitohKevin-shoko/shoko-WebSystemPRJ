
function sort(inputSortKey) {

    var sortKey = $("input:hidden[name='adr330searchSVBean.sortKey']").val();
    var orderKey = $("input:hidden[name='adr330searchSVBean.orderKey']").val();
    if (sortKey == inputSortKey) {
        if (orderKey == 1) {
            $("input:hidden[name='adr330searchSVBean.orderKey']").val(0);
            $("input:hidden[name='adr330searchBean.orderKey']").val(0);
        } else {
            $("input:hidden[name='adr330searchSVBean.orderKey']").val(1);
            $("input:hidden[name='adr330searchBean.orderKey']").val(1);
        }
    } else {
        $("input:hidden[name='adr330searchSVBean.orderKey']").val(0);
        $("input:hidden[name='adr330searchBean.orderKey']").val(0);
    }
    $("input:hidden[name='adr330searchSVBean.sortKey']").val(inputSortKey);
    $("input:hidden[name='adr330searchBean.sortKey']").val(inputSortKey);
       buttonPush('init');
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


function changePage(page) {
    document.getElementsByName('adr330searchSVBean.page')[0].value = page;
    document.getElementsByName('adr330searchSVBean.page')[1].value = page;
    buttonPush('init');
}


function changeChk(){
   var chkFlg;
   if (document.forms[0].allCheck.checked) {
       chkFlg = true;
   } else {
       chkFlg = false;
   }
   delAry = document.getElementsByName("adr330selectSid");
   for(i = 0; i < delAry.length; i++) {
       delAry[i].checked = chkFlg;
   }
}

function changCcategoryCombo(){
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
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

$(function() {

    /* 表示モード */
    var dspMode = $("input:hidden[name='adr010cmdMode']").val();
    if (dspMode == 0) {
        //グループ
        $("#0").addClass("sel_menu_title_select");
    } else if (dspMode == 1) {
        //詳細
        $("#1").addClass("sel_menu_title_select");
    } else if (dspMode == 2) {
        //詳細
        $("#2").addClass("sel_menu_title_select");
    } else if (dspMode == 3) {
        //詳細
        $("#3").addClass("sel_menu_title_select");
    } else if (dspMode == 4) {
        //詳細
        $("#4").addClass("sel_menu_title_select");
    } else {
        //詳細
        $("#5").addClass("sel_menu_title_select");
    }

    $('.js_tableTopCheck-header').live("change",function() {
     	changeChk();
    });


    /* メニュー  hover*/
    $('.toukei_optionText').hover(
        function () {
            $(this).addClass("toukei_optionText-hover");
        },
        function () {
            $(this).removeClass("toukei_optionText-hover");
        }
    );

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
    $('.toukei_optionText').live('click', function() {
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
            $(headId).removeClass("side_header-close");
            $(headId).addClass("side_header-open");
        } else {
            $(dataId).hide();
            $(headId).removeClass("side_header-open");
            $(headId).addClass("side_header-close");
        }
    }
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

    $(dataId).animate( { height: 'toggle'}, 'middle' );
    changeSelImg($(headId));


    var now = $("input:hidden[name='adr010CategoryOpenFlg']");

    if (now[catId].value == 1) {
        now[catId].value = 0;
    } else {
        now[catId].value = 1;
    }

}

function changeSelImg(id) {
    if (id.hasClass("side_header-close")) {
        id.removeClass("side_header-close");
        id.addClass("side_header-open");
    } else {
        id.removeClass("side_header-open");
        id.addClass("side_header-close");
    }
}

function changePopup() {
    var url = "../user/usr040.do?usr040webmail=1";
    url += "&usr040webmailAddress=" + document.getElementsByName('adr010webmailAddress')[0].value;
    url += "&usr040webmailType=" + document.getElementsByName('adr010webmailType')[0].value;
    location.href = url;
    return true;
}