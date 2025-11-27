$(function() {
    $(document).off("change", ".js_accountSelKbn");
    $(document).on("change", ".js_accountSelKbn", function(){
        $('#cirAccountSelArea').toggle();
    });
    if ($("#cir120SelKbn_0").is(":checked")) {
        $("#cirAccountSelArea").removeClass('display_n');
    } else {
        $("#cirAccountSelArea").addClass('display_n');
    }
    if ($("#cir120JdelKbn_0").is(":checked")) {
        $(".cir120JYear").prop("disabled", true);
        $(".cir120JMonth").prop("disabled", true);
    } else {
        $(".cir120JYear").prop("disabled", false);
        $(".cir120JMonth").prop("disabled", false);
    }

    if ($("#cir120SdelKbn_0").is(":checked")) {
        $(".cir120SYear").prop("disabled", true);
        $(".cir120SMonth").prop("disabled", true);
    } else {
        $(".cir120SYear").prop("disabled", false);
        $(".cir120SMonth").prop("disabled", false);
    }

    if ($("#cir120DdelKbn_0").is(":checked")) {
        $(".cir120DYear").prop("disabled", true);
        $(".cir120DMonth").prop("disabled", true);
    } else {
        $(".cir120DYear").prop("disabled", false);
        $(".cir120DMonth").prop("disabled", false);
    }

    /* アカウント選択ボタンクリック */
    $(document).off("click", "#cirAccountSelBtn");
    $(document).on("click", "#cirAccountSelBtn", function(){
        cirAccountSelPop();
    });

    //検索ボタン
    $(document).off("click", "#accountListSearchBtn");
    $(document).on("click", "#accountListSearchBtn", function(){
        cirAccountSearch();
    });

    //ソート タイトル
    $(document).off("click", ".sortAreaTitle");
    $(document).on("click", ".sortAreaTitle", function(){
        cirAccountSort(0, $(this).attr('id'));
    });

    //ソート ディスク容量
    $(document).off("click", ".sortAreaDisk");
    $(document).on("click", ".sortAreaDisk", function(){
        cirAccountSort(3, $(this).attr('id'));
    });

    //前ページクリック
    $(document).off("click", ".prevPage");
    $(document).on("click", ".prevPage", function(){
        movePage(0);
    });

    //次ページクリック
    $(document).off("click", ".nextPage");
    $(document).on("click", ".nextPage", function(){
        movePage(1);
    });

    //ページコンボ変更 上
    $(document).off("click", "#selectPageTop");
    $(document).on("change", "#selectPageTop", function(){
        movePage(-1);
    });

    //ページコンボ変更 下
    $(document).off("click", "#selectPageBttom");
    $(document).on("change", "#selectPageBttom", function(){
        document.forms['accountPopForm'].cir150pageTop.value = document.forms['accountPopForm'].cir150pageBottom.value;
        movePage(-1);
    });

    /* アカウント hover */
    $(".accountSelTr").on({
        mouseenter:function (e) {
          $(this).addClass("account_tr_on");
        },
        mouseleave:function (e) {
          $(this).removeClass("account_tr_on");
        }
    });

    /* アカウント hover */
    $(document).off("click", ".accountSelTr");
    $(document).on("click", ".accountSelTr", function(){
        selAccount($(this));
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
});

function cirDispState(kbnElem, yearElem, monthElem) {

    for (i = 0; i < kbnElem.length; i++) {
        if (kbnElem[i].checked == true) {
            batchKbn = i;
        }
    }
    batchKbnVal = kbnElem[batchKbn].value;

    if (batchKbnVal == 0) {
        yearElem.disabled = true;
        yearElem.style.backgroundColor = '#e0e0e0';
        monthElem.disabled = true;
        monthElem.style.backgroundColor = '#e0e0e0';
    } else {
        yearElem.disabled = false;
        yearElem.style.backgroundColor = '#ffffff';
        monthElem.disabled = false;
        monthElem.style.backgroundColor = '#ffffff';
    }
}

function setCirMessage(pluginId, btn) {
  var msg =  "<div>"
           + "<span>" + msglist_cmn['cmn.act'] + "</span>"
           + "<span class=\"ml10\">";

  if ($("#cir120SelKbn_0").is(":checked")) {
    msg += $("#selCirAccountNameArea").text();
  } else {
    msg += msglist_cmn['cmn.all'];
  }
  msg += "</span>"
          + "</div>";

  if (!$("#cir120JdelKbn_0").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.rng.apply'] + "</span>"
           + "<span class=\"ml10\">" + $(".cir120JYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".cir120JMonth").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if (!$("#cir120SdelKbn_0").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.comp']
           + "<span class=\"ml10\">" + $(".cir120SYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".cir120SMonth").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if (!$("#cir120DdelKbn_0").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.draft']
           + "<span class=\"ml10\">" + $(".cir120DYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".cir120DMonth").val()+ msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  msg += "<div class=\"mt5\">"
         + "<img class='original-display'src='../circular/images/original/menu_icon_single.png'>"
         + "<img class='classic-display'src='../circular/images/classic/menu_icon_single.gif'>"
         + "<span class=\"ml10\">" + msglist_cmn['cmn.cir'] + msglist_cmn['cmn.del.check'] + "</span>"
         + "</div>";

  deletePop(pluginId, btn, msg);
}

function cirAccountSelPop() {

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

            drawCirAccountArea(data);

            $('.js_cirAccountSelPop').dialog({
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
            drawNoDataCirAccountArea(data)
        }

    }).fail(function(data){
        alert('error');
    });
}


function cirAccountSearch() {

    var paramStr = "";
    paramStr += "CMD=getAccount&";
    paramStr += getCirFormData($('#accountPopForm'));



    $.ajax({
        async: true,
        url:  "../circular/cir150.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data != null && data.accountList.length > 0) {
            drawCirAccountArea(data);
        } else {
            drawNoDataCirAccountArea(data)
        }

    }).fail(function(data){
        alert('error');
    });

}

function cirAccountSort(sortId, orderId) {

    var sortKey = sortId;
    var orderKey = orderId;

    document.forms['accountPopForm'].cir150sortKey.value = sortKey;
    document.forms['accountPopForm'].cir150order.value = orderKey;

    var paramStr = "";
    paramStr += "CMD=initData&";
    paramStr += getCirFormData($('#accountPopForm'));

    $.ajax({
        async: true,
        url:  "../circular/cir150.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data != null && data.accountList.length > 0) {
            drawCirAccountArea(data);
        } else {
            drawNoDataCirAccountArea(data)
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
    paramStr += getCirFormData($('#accountPopForm'));

    $.ajax({
        async: true,
        url:  "../circular/cir150.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data != null && data.accountList.length > 0) {
            drawCirAccountArea(data);
        } else {
            drawNoDataCirAccountArea(data)
        }

    }).fail(function(data){
        alert('error');
    });
}

function drawCirAccountArea(data) {

    $('#cirAccountListArea').children().remove();

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

    $('#cirAccountListArea').append(accountListStr);

}

function drawNoDataCirAccountArea(data) {
    $('#cirAccountListArea').children().remove();
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

    $('#cirAccountListArea').append(accountListStr);
}


function getCirFormData(formObj) {

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

    var paramStr = "";
    paramStr += getFormData($(document.forms["cir120Form"]));
    paramStr = paramStr + '&CMD=accountChange';
    paramStr = paramStr + '&pluginId=circular';
    paramStr = paramStr + '&accountSid='+accountSid;
    paramStr = paramStr + '&accountName='+accountName;

    $.ajax({
        async: true,
        url:  "../common/cmn310.do",
        type: "post",
        data: paramStr,
        datatype: 'html'
    }).done(function( data ) {
        $('.js_cir').children().remove();
        $('.js_cirAccountSelPop').remove();
        $('.js_cir').append(data);
    });
    $('.js_cirAccountSelPop').dialog('close');
}

function htmlEscape(s){
    s=s.replace(/&/g,'&amp;');
    s=s.replace(/>/g,'&gt;');
    s=s.replace(/</g,'&lt;');
    return s;
}
