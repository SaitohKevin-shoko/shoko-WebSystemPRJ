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
    $(".js_sortAreaTitle").live("click", function(){
        accountSort(0, $(this).attr('id'));
    });

    //ソート ディスク容量
    $(".js_sortAreaDisk").live("click", function(){
        accountSort(3, $(this).attr('id'));
    });

    //前ページクリック
    $(".js_prevPage").live("click", function(){
        movePage(0);
    });

    //次ページクリック
    $(".js_nextPage").live("click", function(){
        movePage(1);
    });

    //ページコンボ変更 上
    $(".js_selectPage").live("change", function() {
        $(".js_selectPage").val($(this).val());
        movePage(-1);
    });


    /* アカウント hover */
    $("#accountListArea .js_listHover").live("click", function(){
        selAccount($(this));
    });
    /* アカウントリスト hover*/
    $(this).tableTop().initRowHover();

});


function accountSelPop() {

    var widthStr = 800;
    var heightStr = 550;

    var paramStr = "";
    paramStr += "CMD=getAccount";

    if ($('#sml240user').val() != null && $('#sml240user').val() > 0) {
        paramStr += "&sml240user=" + $('#sml240user').val();
    }

    $.ajax({
        async: true,
        url:  "../smail/sml240.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
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
        } else {
            alert(msglist_sml010["sml.212"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.212"]);
    });
}


function accountSearch() {

    var paramStr = "";
    paramStr += "CMD=getAccount&";
    paramStr += getFormData($('#accountPopForm'));



    $.ajax({
        async: true,
        url:  "../smail/sml240.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data != null && data.accountList.length > 0) {
                drawAccountArea(data);
            } else {
                drawNoDataAccountArea(data)
            }
        } else {
            alert(msglist_sml010["sml.212"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.212"]);
    });

}

function accountSort(sortId, orderId) {

    var sortKey = sortId;
    var orderKey = orderId;

    document.forms['accountPopForm'].sml240sortKey.value = sortKey;
    document.forms['accountPopForm'].sml240order.value = orderKey;

    var paramStr = "";
    paramStr += "CMD=initData&";
    paramStr += getFormData($('#accountPopForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml240.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data != null && data.accountList.length > 0) {
                drawAccountArea(data);
            } else {
                drawNoDataAccountArea(data)
            }
        } else {
            alert(msglist_sml010["sml.214"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.214"]);
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
        url:  "../smail/sml240.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data != null && data.accountList.length > 0) {
                drawAccountArea(data);
            } else {
                drawNoDataAccountArea(data)
            }
        } else {
            alert(msglist_sml010["sml.215"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.215"]);
    });
}

function drawAccountArea(data) {

    $('#accountListArea').children().remove();

    var accountListStr = "";

    accountListStr += "<form id=\"accountPopForm\">"
                   +  "<input type=\"hidden\" name=\"sml240sortKey\" value=\"" + data.sml240sortKey + "\" />"
                   +  "<input type=\"hidden\" name=\"sml240order\" value=\"" + data.sml240order + "\" />"
                   +  "<input type=\"hidden\" name=\"sml240searchFlg\" value=\"" + data.sml240searchFlg + "\" />"
                   +  "<input type=\"hidden\" name=\"sml240svKeyword\" value=\"" + data.sml240svKeyword + "\" />"
                   +  "<input type=\"hidden\" name=\"sml240svUser\" value=\"" + data.sml240svUser + "\" />"
                   +  "<input type=\"hidden\" name=\"sml240user\" value=\"" + data.sml240user + "\" />"
                   +  "<div class=\"w100 verAlignMid\">"
                   +  "<input type=\"text\" class=\"ml_auto\" name=\"sml240keyword\" value=\""
                   +  data.sml240keyword
                   +  "\" />"
                   +  "<button type=\"button\" class=\"baseBtn\" id=\"accountListSearchBtn\">"
                   +  "  <img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_search.png\" alt=\"" + msglist_smlacountsel['cmn.search'] + "\">"
                   +  "  <img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_search.png\" alt=\"" + msglist_smlacountsel['cmn.search'] + "\">"
                   +  msglist_smlacountsel['cmn.search']
                   +  "</button>"
                   +  "&nbsp;"
                   +  "</div>";

    if (data.accountList != null && data.accountList.length > 0) {



        var pageComboStr = "";

        if (data.sml240pageDspFlg) {

            for (n = 0; n < data.pageCombo.length; n++) {
                var pageComboData = data.pageCombo[n];

                var selectedStr = "";

                if (data.sml240pageTop == pageComboData.value) {
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

            accountListStr += '<div class="display_flex w100" >';

            accountListStr += "<div class=\"ml_auto paging\">"
                    + '<button type="button" class="webIconBtn js_prevPage" >'
                    + ' <img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png" />'
                    + ' <i class="icon-paging_left"></i>'
                    + '</button>'
                    +  "<select name=\"sml240pageTop\" id=\"selectPageTop\" class=\"paging_combo js_selectPage\">";

            accountListStr += pageComboStr;

            accountListStr += '</select>'
                    + '<button type="button" class="webIconBtn js_nextPage" >'
                    + '  <img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png" >'
                    + '  <i class="icon-paging_right"></i>'
                    + '</button>'
                    +  "</div>";
            accountListStr += '</div>';

        }

        var orderValue = data.sml240order;

        var account = msglist_smlacountsel['sml.sml240.01'];
        var mail = msglist_smlacountsel['cmn.mailaddress'];
        var user = msglist_smlacountsel['cmn.employer'];
        var disk = msglist_smlacountsel['sml.217'];
        var date = msglist_smlacountsel['cmn.received.date'];
        var down = '<span class="classic-display">▼</span><i class="original-display icon-sort_down"></i>';
        var up   = '<span class="classic-display">▲</span><i class="original-display icon-sort_up"></i>';


        var orderLeft = up;
        var orderRight = "";
        var nextOrder = 1;

        if (orderValue == 1) {
            orderLeft = "";
            orderRight = down;
            nextOrder = 0;
        }

        var sortValue = data.sml240sortKey;
        var orderList = new Array(0, 0, 0, 0, 0);
        var titleList = new Array(account, mail, user, disk, date);
        var titleIndex = 0;

        if (sortValue == 1) { titleIndex = 1; }
        if (sortValue == 2) { titleIndex = 2; }
        if (sortValue == 3) { titleIndex = 3; }
        if (sortValue == 4) { titleIndex = 4; }

        titleList[titleIndex] = titleList[titleIndex] + orderLeft + orderRight;
        orderList[titleIndex] = nextOrder;

        accountListStr += "<table class=\"table-top mt0 mb0 w100\">"
                       +  "<tr>"
                       +  "<th class=\"w35 txt_c cursor_p\">"
                       +  "<a href=\"#\" id=\"" + orderList[0] + "\" class=\"js_sortAreaTitle verAlignMid fw_b\">"
                       +  titleList[0]
                       +  "</a>"
                       +  "</th>"
                       +  "<th class=\"w35 txt_c cursor_p\">"
                       +  "<a href=\"#\" id=\"" + orderList[3] + "\" class=\"js_sortAreaDisk verAlignMid fw_b\">"
                       +  titleList[3]
                       +  "</a>"
                       +  "</th>"
                       +  "<th class=\"w30 txt_c fw_b\">" + msglist_smlacountsel['cmn.memo'] + "</th>"
                       +  "</tr>";

        for (l = 0; l < data.accountList.length; l++) {

            var accountData = data.accountList[l];

            accountListStr += "<tr class=\"js_listHover cursor_p"
                           + "\""
                           + " id=\""
                           + accountData.accountSid
                           + "\">";

              accountListStr += "<td>"
                             +  "<span class=\"cl_linkDef \">"
                             +  htmlEscape(accountData.accountName)
                             +  "</span>"
                             +  "<input type=\"hidden\" id=\""
                             +  "account_"
                             +  accountData.accountSid
                             +  "\" value=\""
                             +  accountData.accountName
                             +  "\" />"
                             +  "</td>"
                             +  "<td>"
                             +  accountData.diskSizeUse
                             +  "MB</td>"
                             +  "<td>"
                             +  accountData.viewBiko
                             +  "</td>"
                             +  "</tr>";
        }

        accountListStr += "</table>";

        if (data.sml240pageDspFlg) {

            accountListStr += '<div class="display_flex w100" >';

            accountListStr += "<div class=\"ml_auto paging\">"
                    + '<button type="button" class="webIconBtn js_prevPage" >'
                    + ' <img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_l.png" />'
                    + ' <i class="icon-paging_left"></i>'
                    + '</button>'
                    +  "<select name=\"sml240pageBottom\" id=\"selectPageBottom\" class=\"paging_combo js_selectPage\">";

            accountListStr += pageComboStr;

            accountListStr += '</select>'
                    + '<button type="button" class="webIconBtn js_nextPage" >'
                    + '  <img class="m0 btn_classicImg-display" src="../common/images/classic/icon_arrow_r.png" >'
                    + '  <i class="icon-paging_right"></i>'
                    + '</button>'
                    +  "</div>";
            accountListStr += '</div>';

        }

    }


    accountListStr += "</form>";

    $('#accountListArea').append(accountListStr);
    $('#accountListArea').find('.table-top').tableTop().initTable();

}

function drawNoDataAccountArea(data) {
    $('#accountListArea').children().remove();
    var accountListStr = "";

    accountListStr += "<form id=\"accountPopForm\">"
                   +  "<input type=\"hidden\" name=\"sml240sortKey\" value=\"" + data.sml240sortKey + "\" />"
                   +  "<input type=\"hidden\" name=\"sml240order\" value=\"" + data.sml240order + "\" />"
                   +  "<input type=\"hidden\" name=\"sml240searchFlg\" value=\"" + data.sml240searchFlg + "\" />"
                   +  "<input type=\"hidden\" name=\"sml240svKeyword\" value=\"" + data.sml240svKeyword + "\" />"
                   +  "<input type=\"hidden\" name=\"sml240svUser\" value=\"" + data.sml240svUser + "\" />"
                   +  "<input type=\"hidden\" name=\"sml240user\" value=\"" + data.sml240user + "\" />"
                   +  "<div class=\"w100 verAlignMid\">"
                   +  "<input type=\"text\" class=\"ml_auto\" name=\"sml240keyword\" value=\""
                   +  data.sml240keyword
                   +  "\" />"
                   +  "<button type=\"button\" class=\"baseBtn\" id=\"accountListSearchBtn\">"
                   +  "  <img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_search.png\" alt=\"" + msglist_smlacountsel['cmn.search'] + "\">"
                   +  "  <img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_search.png\" alt=\"" + msglist_smlacountsel['cmn.search'] + "\">"
                   +  msglist_smlacountsel['cmn.search']
                   +  "</button>"
                   +  "&nbsp;"
                   +  "</div>"
                   +  "<div class=\"cl_fontWarn\">" + msglist_smlacountsel['sml.230']
                   +  "</div>";

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

    accountName = htmlEscape(accountName);
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



