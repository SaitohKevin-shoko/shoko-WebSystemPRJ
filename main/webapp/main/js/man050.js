function onSelectFromEvent() {
    document.forms[0].CMD.value='search';
    document.forms[0].submit();
    return false;
}

function onSelectToEvent() {
    document.forms[0].CMD.value='search';
    document.forms[0].submit();
    return false;
}

$(function() {
    /* タブ変更 */
    $('.js_accTabHeader_tab').on("click", function(){
        var showId = $(this).attr('id');
        if (showId == 'lastLogin') {
            changeTab('list');
        } else if (showId == 'search') {
            changeTab('initsearch');
        }
    });
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
    /* hover:click */
    $(".js_listClick").on("click", function(){
        var id = $(this).parent().data("sid");
        openUserInfoWindow(id);
    });
});

function changePage(id) {
    document.forms[0].CMD.value = '';
    if (id == 1) {
        document.forms[0].man050PageTop.value=document.forms[0].man050PageBottom.value;
    }
    document.forms[0].submit();
    return false;
}

function changeTab(cmd){

    document.forms[0].CMD.value=cmd;

    if (cmd == 'initsearch') {
        document.forms[0].man050cmdMode.value = 1;
        document.forms[0].man050SearchFlg.value = 1;
        document.forms[0].CMD.value='search';
    }


    document.forms[0].submit();
    return false;
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value = 'sort';
    document.forms[0].man050SortKey.value = fid;
    document.forms[0].man050OrderKey.value = order;
    document.forms[0].submit();
    return false;
}

function changeGrp() {
    document.forms[0].CMD.value = '';
    document.forms[0].submit();
    return false;
}

function changeGrp2() {
    document.forms[0].CMD.value = 'search';
    document.forms[0].man050usrSid.value = -1;
    document.forms[0].submit();
    return false;
}

function buttonPush(cmd) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function moveDetail(usrSid) {
    document.forms[0].man050SelectedUsrSid.value = usrSid;
    document.forms[0].CMD.value='detail';
    document.forms[0].submit();
    return false;
}

function tarminalChange(kbn) {

    if (kbn == 1) {
        $('input:radio[name=man050Car]').val([0]);
    }

    buttonPush('search');
}

function tarminalChangeInit() {

    var terminalKbn = 0;
    for (i = 0; i < document.forms[0].man050Terminal.length; i++) {
        if (document.forms[0].man050Terminal[i].checked == true) {
            terminalKbn = i;
        }
    }
    var terminalKbnVal = document.forms[0].man050Terminal[terminalKbn].value;

    if (terminalKbnVal == 0 || terminalKbnVal == 2) {
        for (i = 0; i < document.forms[0].man050Car.length; i++) {
            document.forms[0].man050Car[i].disabled=false;
        }
    } else {
        document.forms[0].man050Car.value=0;
        for (i = 0; i < document.forms[0].man050Car.length; i++) {
            document.forms[0].man050Car[i].disabled=true;
        }
    }
}

function moveDay(elmDate, kbn) {

    systemDate = new Date();
    var year = convYear(systemDate.getFullYear());
    var month = ("0" + (systemDate.getMonth() + 1)).slice(-2);
    var day = ("0" + systemDate.getDate()).slice(-2);

    if (kbn == 2) {
        $(elmDate).val(year + "/" + month + "/" + day);
        return;
    }

    //「前日」or 「翌日」ボタン押下
    if (kbn == 1 || kbn == 3) {

        var ymdf = escape($(elmDate).val());
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {
            newDate = new Date($(elmDate).val());

            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = convYear(newDate.getFullYear());
            var systemYear = convYear(systemDate.getFullYear());
            if (newYear < systemYear - 10 || newYear > systemYear) {
                return;
            } else {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(elmDate).val(year + "/" + month + "/" + day);
            }

        } else {
            if ($(elmDate).val() == '') {
                $(elmDate).val(year + "/" + month + "/" + day);
            }
        }
    }
    buttonPush('search');
}

function convYear(yyyy) {
  if(yyyy<1900) {
    yyyy=1900+yyyy;
  }
  return yyyy;
}