function searchKn(kana){
    document.forms[0].CMD.value='searchKn';
    document.forms[0].usr040SearchKana.value=kana;
    document.forms[0].submit();
    return false;
}

function changeTab(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].pushSearch.value=cmd
    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='init';
    document.forms[0].usr040sortKey.value = fid;
    document.forms[0].usr040orderKey.value = order;
    document.forms[0].submit();
    return false;
}

function changePage(id){
    if (id == 1) {
        document.forms[0].usr040pageNum2.value=document.forms[0].usr040pageNum1.value;
    } else {
        document.forms[0].usr040pageNum1.value=document.forms[0].usr040pageNum2.value;
    }
    document.forms[0].CMD.value='changepage';
    document.forms[0].submit();
    return false;
}

function clickSortTitle(sortValue) {
    if (document.forms[0].usr040sortKey.value == sortValue) {
        if (document.forms[0].usr040orderKey[0].checked == true) {
            document.forms[0].usr040orderKey[0].checked = false;
            document.forms[0].usr040orderKey[1].checked = true;
        } else {
            document.forms[0].usr040orderKey[1].checked = false;
            document.forms[0].usr040orderKey[0].checked = true;
        }
    } else {
        document.forms[0].usr040sortKey.value = sortValue;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function changeSortCombo(){
    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function changCcategoryCombo(){
    document.forms[0].CMD.value='init';
    document.forms[0].categorySid.value=document.forms[0].usr040categoryCmb.value;
    document.forms[0].submit();
    return false;
}

function openlabel(){
    checkAdd = document.getElementsByName("usr040selectUser");
    var chkCount = 0;
    for(i = 0; i < checkAdd.length; i++) {
      if (checkAdd[i].checked == false) {
        chkCount = chkCount + 1;
      }
    }
    if (checkAdd.length == chkCount) {
      alert("ユーザを選択してください。");
    } else {
      var labLoc = '../user/usr200.do?usr200parentLabelName=usr040selectLabel';
      $('iframe[name=lab]').attr({'src':labLoc});
      $('#labelPanel').dialog({
          modal: true,
          title:'ラベルを選択してください',
          autoOpen: true,  // hide dialog
          resizable: false,
          height: '340',
          width: '360',
          open: function() {
              $(".ui-dialog-titlebar-close", $(this).closest(".ui-dialog")).hide();
          }
      });
    }

    return false;
  }

function changeChk(){
    var chkFlg;
    if (document.forms[0].allCheck.checked) {
        chkFlg = true;
    } else {
        chkFlg = false;
    }
    delAry = document.getElementsByName("usr040selectUser");
    for(i = 0; i < delAry.length; i++) {
        delAry[i].checked = chkFlg;
    }
}

function btnOnly(cmd) {
    document.forms[0].CMD.value=cmd;
}

function labelCheck(id) {

    var chkObj = document.forms[0].usr040labSid;
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
    document.forms[0].usr040DetailExeFlg.value = 1;
    buttonPush('search');
}

function checkUsr(mode, usrSid, cmd) {
    checkUsr = document.getElementsByName("usr040selectUser");
    var chkCount = 0;
    for(i = 0; i < checkUsr.length; i++) {
        if (checkUsr[i].checked == false) {
            chkCount = chkCount + 1;
        }
    }
    if (checkUsr.length == chkCount) {
        if (mode == 0) {
            alert(msglist.selectAddress);
        } else if (mode == 1) {
            alert(msglist.selectCc);
        } else {
            alert(msglist.selectBcc);
        }
        document.forms[0].submit();
    } else {
        addAddress(mode, usrSid, cmd);
    }

  return false;
}

function addAddress(mode, usrSid, cmd) {
    document.forms[0].usr040SendMailMode.value = mode;
    document.forms[0].usr040AddressKbn.value = '0';
    if (usrSid > 0) {
        document.forms[0].usr040UsrSid.value = usrSid;
    }

    buttonPush(cmd);
}

function addAddressMail(usrSid, cmd, kbn) {
    document.forms[0].usr040SendMailMode.value = 0;
    document.forms[0].usr040AddressKbn.value = kbn;

    if (usrSid > 0) {
        document.forms[0].usr040UsrSid.value = usrSid;
    }

    buttonPush(cmd);
}

function deleteSend(mode, usrSid, kbn) {
    document.forms[0].CMD.value='deleteSend';
    document.forms[0].usr040SendMailMode.value=mode;
    document.forms[0].usr040DelUsrSid.value=usrSid;
    document.forms[0].usr040AddressKbn.value = kbn;
    document.forms[0].submit();
    return false;
}

function moveDay(elmYear, elmMonth, elmDay, kbn) {

    systemDate = new Date();

    if (kbn == 2) {
        $(elmYear).val(convYear(systemDate.getYear()));
        $(elmMonth).val(systemDate.getMonth() + 1);
        $(elmDay).val(systemDate.getDate());
        return;
    }

    if (kbn == 1 || kbn == 3) {

      var ymdf = escape(elmYear.value + '/' + elmMonth.value + "/" + elmDay.value);
    re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

        newDate = new Date(elmYear.value, elmMonth.value - 1, elmDay.value)

            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getYear());
            var systemYear = convYear(systemDate.getYear());

            if (newYear < systemYear - 50 || newYear > systemYear + 0) {
                $(elmYear).val('');
            } else {
                $(elmYear).val(newYear);
            }
            $(elmMonth).val(newDate.getMonth() + 1);
            $(elmDay).val(newDate.getDate());

        } else {

            if (elmYear.value == '' && elmMonth.value == '' && elmDay.value == '') {
                $(elmYear).val(convYear(systemDate.getYear()));
                $(elmMonth).val(systemDate.getMonth() + 1);
                $(elmDay).val(systemDate.getDate());
            }
        }
    }
}


function clearDate(year, month, day){
    day.val('');
    month.val('');
    year.val('');
}

$(function(){

    /* 表示モード */
    var dspMode = $("input:hidden[name='usr040cmdMode']").val();
    if (dspMode == 2) {
        //グループ
        $("#menu_group").removeClass("searchMenu_title");
        $("#menu_group").addClass("searchMenu_title-select");

    } else if (dspMode == 3) {
        //詳細
        $("#menu_shousai").removeClass("searchMenu_title");
        $("#menu_shousai").addClass("searchMenu_title-select");

    } else {
        //氏名
        $("#menu_name").removeClass("searchMenu_title");
        $("#menu_name").addClass("searchMenu_title-select");

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
    $(document).on('click', '.menuClick', function() {
        var selectMenu = $(this).attr('id');
        /* submitするかチェックする */
        if (submitCheck(selectMenu)) {
            changeTab(selectMenu);
        }
    });

    var openFlgs =  $("input:hidden[name='usr040CategoryOpenFlg']");
    for(var i=0, l=openFlgs.length; i<l; i++) {
        var dataId = "#" + "category_data_" + i;
        var headId = "#" + "category_head_" + i;
        if (openFlgs[i].value == 1) {
            $(dataId).show();
            $(headId).removeClass("labelSelect_category-close");
            $(headId).addClass("labelSelect_category-open");
        } else {
            $(dataId).hide();
            $(headId).removeClass("labelSelect_category-open");
            $(headId).addClass("labelSelect_category-close");
        }
    }

    $("iframe[name='ctgFrame']").one('load', function() {
        var dspMode = $("input:hidden[name='usr040cmdMode']").val();
        if (dspMode == 2) {

            //グループの絞込み済み(saveが存在する)の場合、検索を実行する
            var saveGrpId = $("input:hidden[name='usr040GrpSearchGIdSave']").val();
            var saveGrpName = $("input:hidden[name='usr040GrpSearchGNameSave']").val();

            if ((saveGrpId != null && saveGrpId.length > 0)
                    || (saveGrpName != null && saveGrpName.length > 0)) {
              groupShiborikomi(0);
            }
        }
    });

    /* hover:click */
    $(".js_listUsrClick").live("click", function(){
        var usrKana = $(this).data('kana');
        searchKn(usrKana)
    });

    $('.js_tableTopCheck-header').live("change",function() {
    if($('.js_mailFlg').length){
        chgCheckAll('usr040webAllCheck', 'usr040selectUser');
    } else {
        changeChk();
    }
  });
});

function submitCheck(selectMenu) {
    //表示モード
    var dspMode = $("input:hidden[name='usr040cmdMode']").val();

    if ((dspMode == 1 && selectMenu == "name")
            || (dspMode == 2 && selectMenu == "group")
            || (dspMode == 3 && selectMenu == "shousai")) {
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


    var now = $("input:hidden[name='usr040CategoryOpenFlg']");

    if (now[catId].value == 1) {
        now[catId].value = 0;
    } else {
        now[catId].value = 1;
    }

}

function changeSelImg(id) {
    if (id.hasClass("labelSelect_category-close")) {
        id.removeClass("labelSelect_category-close");
        id.addClass("labelSelect_category-open");
    } else {
        id.removeClass("labelSelect_category-open");
        id.addClass("labelSelect_category-close");
    }
}

function changePopup() {
    var url = "../address/adr010.do?adr010webmail=1";
    url += "&adr010webmailAddress=" + document.getElementsByName('usr040webmailAddress')[0].value;
    url += "&adr010webmailType=" + document.getElementsByName('usr040webmailType')[0].value;
    location.href = url;
    return true;
}

function groupShiborikomi(initFlg) {
    //初期表示中に再度初期表示処理が実行された場合、絞り込み処理を行わない
    if (initFlg == 0 && document.getElementsByName('usr040_02_init')[0].value == 1) {
        return;
    }

    document.getElementsByName('usr040_02_init')[0].value = 1;
    var grpId;
    var grpName;

    if (initFlg = 1) {
        grpId = $("input[name='usr040GrpSearchGId']").val();
        grpName = $("input[name='usr040GrpSearchGName']").val();

        //saveに保持
        $("input:hidden[name='usr040GrpSearchGIdSave']").val(grpId);
        $("input:hidden[name='usr040GrpSearchGNameSave']").val(grpName);

    } else {
        grpId = $("input[name='usr040GrpSearchGIdSave']").val();
        grpName = $("input[name='usr040GrpSearchGNameSave']").val();
    }

    var formName = 'fnameShiborikomi';
    var url = $("input:hidden[name='usr040BaseUrl']").val() + 'user/usr022.do';

    var form = $('<form/>', {action: url, method: 'post', target:'ctgFrame', name:formName});
    form.append($('<input/>',{type:'hidden',name:'searchGrpId' ,value:grpId}));
    form.append($('<input/>',{type:'hidden',name:'searchGrpName' ,value:grpName}));

    //body内にformを追加(IE対応)
    $("iframe[name='ctgFrame']").contents().find('body').append(form);

    //サブミット
    form.submit();
    //formの削除（jsp内の既存のformは削除されない）
    form.remove();
}
