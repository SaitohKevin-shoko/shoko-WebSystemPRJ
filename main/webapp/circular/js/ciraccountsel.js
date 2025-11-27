$(function() {

    /* アカウント選択ボタンクリック */
    $("#accountSelBtn").live("click", function(){
        accountSelPop();
    });

    //検索ボタン
    $("#accountListSearchBtn").live("click", function(){
        accountSearch();
    });

    //ソート タイトル
    $(".sortAreaTitle").live("click", function(){
        accountSort(0, $(this).attr('id'));
    });

    //ソート ディスク容量
    $(".sortAreaDisk").live("click", function(){
        accountSort(3, $(this).attr('id'));
    });

    //前ページクリック
    $(".prevPage").live("click", function(){
        movePage(0);
    });

    //次ページクリック
    $(".nextPage").live("click", function(){
        movePage(1);
    });

    //ページコンボ変更 上
    $("#selectPageTop").live("change", function(){
        movePage(-1);
    });

    //ページコンボ変更 下
    $("#selectPageBttom").live("change", function(){
        document.forms['accountPopForm'].cir150pageTop.value = document.forms['accountPopForm'].cir150pageBottom.value;
        movePage(-1);
    });

    /* アカウント hover */
    $(".accountSelTr").live({
        mouseenter:function (e) {
          $(this).addClass("account_tr_on");
        },
        mouseleave:function (e) {
          $(this).removeClass("account_tr_on");
        }
    });

    /* アカウント hover */
    $(".accountSelTr").live("click", function(){
        selAccount($(this));
    });

    /* hover */
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

});


function accountSelPop() {

    var widthStr = 800;
    var heightStr = 550;

    var paramStr = "";
    paramStr += "CMD=getAccount";

    if ($('#cir150user').val() != null && $('#cir150user').val() > 0) {
        paramStr += "&cir150user=" + $('#cir150user').val();
    }

    $.ajax({
        async: true,
        url:  "../circular/cir150.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data != null && data.accountList.length > 0) {

            drawAccountArea(data);

            $('#accountSelPop').dialog({
                autoOpen: true,  // hide dialog
                bgiframe: true,   // for IE6
                resizable: false,
                height: heightStr,
                width: widthStr,
                modal: true,
                overlay: {
                  backgroundColor: '#000000',
                  opacity: 0.5
                },
                buttons: {
                  閉じる: function() {
                      $(this).dialog('close');
                  }
                }
            });
        } else {
            drawNoDataAccountArea(data)
        }

    }).fail(function(data){
        alert('error');
    });
}


function accountSearch() {

    var paramStr = "";
    paramStr += "CMD=getAccount&";
    paramStr += getFormData($('#accountPopForm'));



    $.ajax({
        async: true,
        url:  "../circular/cir150.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data != null && data.accountList.length > 0) {
            drawAccountArea(data);
        } else {
            drawNoDataAccountArea(data)
        }

    }).fail(function(data){
        alert('error');
    });

}

function accountSort(sortId, orderId) {

    var sortKey = sortId;
    var orderKey = orderId;

    document.forms['accountPopForm'].cir150sortKey.value = sortKey;
    document.forms['accountPopForm'].cir150order.value = orderKey;

    var paramStr = "";
    paramStr += "CMD=initData&";
    paramStr += getFormData($('#accountPopForm'));

    $.ajax({
        async: true,
        url:  "../circular/cir150.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data != null && data.accountList.length > 0) {
            drawAccountArea(data);
        } else {
            drawNoDataAccountArea(data)
        }

    }).fail(function(data){
        alert('error');
    });
}


function movePage(movekbn) {

    var cmd = "";
    if (movekbn == 0) {
        cmd = "prevPageData";
    } else if (movekbn == 1) {
        cmd = "nextPageData";
    } else {
        cmd = "initData";
    }

    var paramStr = "";
    paramStr += "CMD=" + cmd + "&";
    paramStr += getFormData($('#accountPopForm'));

    $.ajax({
        async: true,
        url:  "../circular/cir150.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data != null && data.accountList.length > 0) {
            drawAccountArea(data);
        } else {
            drawNoDataAccountArea(data)
        }

    }).fail(function(data){
        alert('error');
    });
}

function drawAccountArea(data) {

    $('#accountListArea').children().remove();

    var accountListStr = "";
    accountListStr += "<form id=\"accountPopForm\">"
                   +  "<input type=\"hidden\" name=\"cir150sortKey\" value=\"" + data.cir150sortKey + "\" />"
                   +  "<input type=\"hidden\" name=\"cir150order\" value=\"" + data.cir150order + "\" />"
                   +  "<input type=\"hidden\" name=\"cir150searchFlg\" value=\"" + data.cir150searchFlg + "\" />"
                   +  "<input type=\"hidden\" name=\"cir150svKeyword\" value=\"" + data.cir150svKeyword + "\" />"
                   +  "<input type=\"hidden\" name=\"cir150svUser\" value=\"" + data.cir150svUser + "\" />"
                   +  "<input type=\"hidden\" name=\"cir150user\" value=\"" + data.cir150user + "\" />"
                   +  "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"w100\">"
                   +  "<tr>"
                   +  "<td>"
                   +  "<p>"
                   +  "<input type=\"text\" name=\"cir150keyword\" value=\""
                   +  data.cir150keyword
                   +  "\" />"
                   +  "<input type=\"button\" id=\"accountListSearchBtn\" class=\"baseBtn\" value=\"検索\">"
                   +  "&nbsp;"
                   +  "</p>"
                   +  "<table class=\"w100\" cellpadding=\"5\" cellspacing=\"0\" border=\"0\">"
                   +  "<tr>"

    if (data.cir150pageDspFlg) {
        accountListStr += "<td class=\"txt_r no_w p0\">"
                       +  "<div class=\"paging\">"
                       +  "<button type=\"button\" class=\"webIconBtn prevPage\">"
                       +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\">"
                       +  "<span class=\"btn_originalImg-display webIconBtn\"><i class=\"icon-paging_left\"></i></span>"
                       +  "</button>"
                       +  "<select name=\"cir150pageTop\" id=\"selectPageTop\" class=\"paging_combo\">";

        var pageComboStr = "";
        for (n = 0; n < data.pageCombo.length; n++) {
            var pageComboData = data.pageCombo[n];

            var selectedStr = "";

            if (data.cir150pageTop == pageComboData.value) {
                selectedStr = "selected";
            }

            pageComboStr += "<option value=\""
                         +  pageComboData.value
                         +  "\" "
                         +  selectedStr
                         +  ">"
                         +  pageComboData.label
                         +  "</option>";
        }
        accountListStr += pageComboStr;

        accountListStr += "</select>"
                       +  "<button type=\"button\" class=\"webIconBtn nextPage\">"
                       +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\">"
                       +  "<span class=\"btn_originalImg-display webIconBtn\"><i class=\"icon-paging_right\"></i></span>"
                       +  "</button>"
                       +  "</div>"
                       +  "</td>";

    }

    accountListStr += "</tr>"
                   +  "</table>";

    if (data.accountList != null && data.accountList.length > 0) {
        var orderValue = data.cir150order;

        var account = "アカウント名";
        var mail = "メールアドレス";
        var user = "使用者";
        var disk = "ディスク使用量";
        var date = "受信日時";
        var down = "<span class=\"classic-display\">▼</span><span class=\"original-display\"><i class=\"icon-sort_down\"></i></span>";
        var up = "<span class=\"classic-display\">▲</span><span class=\"original-display\"><i class=\"icon-sort_up\"></i></span>";

        var orderRight = up;
        var nextOrder = 1;

        if (orderValue == 1) {
            orderRight = down;
            nextOrder = 0;
        }

        var sortValue = data.cir150sortKey;
        var orderList = new Array(0, 0, 0, 0, 0);
        var titleList = new Array(account, mail, user, disk, date);
        var titleIndex = 0;

        if (sortValue == 1) { titleIndex = 1; }
        if (sortValue == 2) { titleIndex = 2; }
        if (sortValue == 3) { titleIndex = 3; }
        if (sortValue == 4) { titleIndex = 4; }

        titleList[titleIndex] = titleList[titleIndex] + orderRight;
        orderList[titleIndex] = nextOrder;

        accountListStr += "<table class=\"table-top w100\" cellpadding=\"5\" cellspacing=\"0\" border=\"0\">"
                       +  "<tr>"
                       +  "<th class=\"txt_c w20 table_header-evt js_table_header-evt\">"
                       +  "<a href=\"#\" id=\"" + orderList[0] + "\" class=\"sortAreaTitle\">"
                       +  titleList[0]
                       +  "</a>"
                       +  "</th>"
                       +  "<th class=\"txt_c w15\"><span>備考</span></th>"
                       +  "</tr>";

        for (l = 0; l < data.accountList.length; l++) {

            var accountData = data.accountList[l];

            var backclass = "td_line_color";

            accountListStr += "<tr class=\"accountSelTr js_listHover cursor_p "
                           + backclass
                           + "\""
                           + " id=\""
                           + accountData.accountSid
                           + "\">";

              accountListStr += "<td class=\"txt_l\">"
                             +  "<a href=\"#\"><span class=\"textLink\">"
                             +  htmlEscape(accountData.accountName)
                             +  "</span></a>"
                             +  "<input type=\"hidden\" id=\""
                             +  "account_"
                             +  accountData.accountSid
                             +  "\" value=\""
                             +  htmlEscape(accountData.accountName)
                             +  "\" />"
                             +  "</td>"
                             +  "<td class=\"txt_l\"><span>"
                             +  accountData.viewBiko
                             +  "</span></td>"
                             +  "</tr>";
        }

        accountListStr += "</table>";

    }


    accountListStr += "</td></tr>";

    if (data.cir150pageDspFlg) {
        accountListStr += "<td class=\"txt_r no_w\">"
                       +  "<div class=\"paging\">"
                       +  "<button type=\"button\" class=\"webIconBtn prevPage\">"
                       +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\">"
                       +  "<i class=\"icon-paging_left webIconBtn original-display\"></i>"
                       +  "</button></a>"
                       +  "<select name=\"cir150pageBottom\" id=\"selectPageBttom\" class=\"paging_combo\">";

        var pageComboStr = "";
        for (n = 0; n < data.pageCombo.length; n++) {
            var pageComboData = data.pageCombo[n];

            var selectedStr = "";

            if (data.cir150pageBottom == pageComboData.value) {
                selectedStr = "selected";
            }

            pageComboStr += "<option value=\""
                         +  pageComboData.value
                         +  "\" "
                         +  selectedStr
                         +  ">"
                         +  pageComboData.label
                         +  "</option>";
        }
        accountListStr += pageComboStr;

        accountListStr += "</select>"
                       +  "<button type=\"button\" class=\"webIconBtn nextPage\">"
                       +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\">"
                       +  "<span class=\"btn_originalImg-display webIconBtn\"><i class=\"icon-paging_right\"></i></span>"
                       +  "</button>"
                       +  "</div>"
                       +  "</td>";
    }

    accountListStr += "</table>"
                   +  "</form>";

    $('#accountListArea').append(accountListStr);

}

function drawNoDataAccountArea(data) {
    $('#accountListArea').children().remove();
    var accountListStr = "";

    accountListStr += "<form name=\"accountPopForm\" id=\"accountPopForm\">"
                   +  "<input type=\"hidden\" name=\"cir150svKeyword\" value=\"" + data.cir150svKeyword + "\" />"
                   +  "<input type=\"hidden\" name=\"cir150svUser\" value=\"" + data.cir150svUser + "\" />"
                   +  "<input type=\"hidden\" name=\"cir150order\" value=\"" + data.cir150order + "\" />"
                   +  "<input type=\"hidden\" name=\"cir150searchFlg\" value=\"" + data.cir150searchFlg + "\" />"
                   +  "<input type=\"hidden\" name=\"cir150user\" value=\"" + data.cir150user + "\" />"
                   +  "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\">"
                   +  "<tr>"
                   +  "<td>"
                   +  "<p class=\"type_p\">"
                   +  "<input type=\"text\" name=\"cir150keyword\" value=\""
                   +  data.cir150keyword
                   +  "\" />"
                   +  "<input type=\"button\" id=\"accountListSearchBtn\" class=\"baseBtn\" value=\"検索\">"
                   +  "&nbsp;"
                   +  "</p>"
                   +  "</td>"
                   +  "</tr>"
                   +  "<tr><td>"
                   +  "<span class=\"text_r1\">該当するアカウント情報はありません。</span>"
                   +  "</td></tr>"
                   +  "</table>";

    $('#accountListArea').append(accountListStr);
}


function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

function selAccount(obj) {
    var accountSid = obj.attr('id');
    var accountName = $('#account_' + obj.attr('id')).val();
    $('input:hidden[name=' + $('#selAccountElm').val() + ']').val(accountSid);

    if ($('input:hidden[name=' + $('#resetParam').val() + ']') != null) {
        $('input:hidden[name=' + $('#resetParam').val() + ']').val(0);
    }

    $('#selAccountNameArea').html(accountName);
    $('#accountSelPop').dialog('close');
    if ($('#selAccountSubmit').val() == "true") {
        document.forms[0].submit();
    }
}

function htmlEscape(s){
    s=s.replace(/&/g,'&amp;');
    s=s.replace(/>/g,'&gt;');
    s=s.replace(/</g,'&lt;');
    return s;
}
