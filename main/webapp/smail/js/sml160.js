$(function() {
    $(document).off("change", ".accountSelKbn");
    $(document).on("change", ".accountSelKbn", function(){
        $('#smlAccountSelArea').toggle();
    });
    if ($("#sml160SelKbn_0").is(":checked")) {
        $("#smlAccountSelArea").removeClass('display_n');
    } else {
        $("#smlAccountSelArea").addClass('display_n');
    }
    if ($("#sml160JdelKbn_0").is(":checked")) {
        $(".sml160JYear").prop("disabled", true);
        $(".sml160JMonth").prop("disabled", true);
    } else {
        $(".sml160JYear").prop("disabled", false);
        $(".sml160JMonth").prop("disabled", false);
    }

    if ($("#sml160SdelKbn_0").is(":checked")) {
        $(".sml160SYear").prop("disabled", true);
        $(".sml160SMonth").prop("disabled", true);
    } else {
        $(".sml160SYear").prop("disabled", false);
        $(".sml160SMonth").prop("disabled", false);
    }

    if ($("#sml160WdelKbn_0").is(":checked")) {
        $(".sml160WYear").prop("disabled", true);
        $(".sml160WMonth").prop("disabled", true);
    } else {
        $(".sml160WYear").prop("disabled", false);
        $(".sml160WMonth").prop("disabled", false);
    }

    if ($("#sml160DdelKbn_0").is(":checked")) {
        $(".sml160DYear").prop("disabled", true);
        $(".sml160DMonth").prop("disabled", true);
    } else {
        $(".sml160DYear").prop("disabled", false);
        $(".sml160DMonth").prop("disabled", false);
    }

    /* アカウント選択ボタンクリック */
    $(document).off("click", "#smlAccountSelBtn");
    $(document).on("click", "#smlAccountSelBtn", function(){
        setSmlActSelPop();
    });

    //検索ボタン
    $(document).off("click", "#smlAccountListSearchBtn");
    $(document).on("click", "#smlAccountListSearchBtn", function(){
        smlAccountSearch();
    });

    //ソート タイトル
    $(document).off("click", ".js_sortAreaTitle");
    $(document).on("click", ".js_sortAreaTitle", function(){
        smlAccountSort(0, $(this).attr('id'));
    });

    //ソート ディスク容量
    $(document).off("click", ".js_sortAreaDisk");
    $(document).on("click", ".js_sortAreaDisk", function(){
        smlAccountSort(3, $(this).attr('id'));
    });

    //前ページクリック
    $(document).off("click", ".js_prevPage");
    $(document).on("click", ".js_prevPage", function(){
        smlMovePage(0);
    });

    //次ページクリック
    $(document).off("click", ".js_nextPage");
    $(document).on("click", ".js_nextPage", function(){
        smlMovePage(1);
    });

    //ページコンボ変更 上
    $(document).off("click", ".js_selectPage");
    $(document).on("change", ".js_selectPage", function() {
        $(".js_selectPage").val($(this).val());
        smlMovePage(-1);
    });

    /* アカウント hover */
    $(document).off("click", "#smlAccountListArea .js_listHover");
    $(document).on("click", "#smlAccountListArea .js_listHover", function(){
        selSmlAccount($(this));
    });
    /* アカウントリスト hover*/
    $(this).tableTop().initRowHover();

    //チェックボックス枠外押下判定
    if ($(window).on) {
        $(document).on("click", '.js_tableTopCheck', function(e){
            if (e.target.type != 'checkbox') {
                var check = $(this).children('input[type=checkbox]');
                if (check.attr('checked')) {
                    check.attr('checked',false);
                } else {
                    check.attr('checked',true);
                }
                if ($(this).hasClass('js_tableTopCheck-header')) {
                    $(this).change();
                }
            }
        });
    } else if ($(window).on) {
        $(document).on('click', '.js_tableTopCheck', function(e) {
            if (e.target.type != 'checkbox') {
                var check = $(this).children('input[type=checkbox]');
                if (check.prop('checked')) {
                    check.prop('checked', false);
                } else {
                    check.prop('checked', true);
                }
                if ($(this).hasClass('js_tableTopCheck-header')) {
                    $(this).change();
                }
            }
        });
    }

    if ($(window).on) {
        $(document).on('click', '.table-top .js_table_header-evt', function(e) {
            var className = e.target.className;
            var classList = className.split(" ");
            var flg = false;
            for (var idx = 0; idx < classList.length; idx++) {
                if (classList[idx] == "js_table_header-evt") {
                    flg = true;
                    break;
                }
            }
            if (flg) {
                $(this).find('a, button, select:not([multiple])').click();
            }
        });

        $(document).on('mouseenter', '.js_table_headerParts-evt', function(e) {
            $(this).parent('th').addClass('table_header-evt');
        });

        $(document).on('mouseleave', '.js_table_headerParts-evt', function(e) {
            $(this).parent('th').removeClass('table_header-evt');
        });

    } else if ($(window).on) {
        $('.table-top .js_table_header-evt').on('click', function(e) {
            if (e.target.type == undefined) {
                $(this).find('a, button, select:not([multiple])').click();
            }
        });
        $('.js_table_headerParts-evt').on('mouseenter', function(e) {
            $(this).parent('th').addClass('table_header-evt');
        });

        $('.js_table_headerParts-evt').on('mouseleave', function(e) {
            $(this).parent('th').removeClass('table_header-evt');
        });
    }

    //ヘッダーソートホバー設定
    var th = $('.table-top th');
    th.tableTop().initHeader();
});

function smlDispState(kbnElem, yearElem, monthElem) {

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

function setSmlMessage(pluginId, btn) {
  var msg =  "<div>"
            + "<span>" + msglist_cmn['cmn.act'] + "</span>"
            + "<span class=\"ml10\">";
  if ($("#sml160SelKbn_0").is(":checked")) {
    msg += $("#selSmlAccountNameArea").text();
  } else {
    msg += msglist_cmn['cmn.all'];
  }
  msg += "</span>"
         + "</div>";

  if (!$("#sml160JdelKbn_0").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.receive'] + "</span>"
           + "<span class=\"ml10\">" + $(".sml160JYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".sml160JMonth").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if (!$("#sml160SdelKbn_0").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.send'] + "</span>"
           + "<span class=\"ml10\">" + $(".sml160SYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".sml160SMonth").val() + msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if (!$("#sml160WdelKbn_0").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.draft'] + "</span>"
           + "<span class=\"ml10\">" + $(".sml160WYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".sml160WMonth").val() + msglist_cmn['cmn.month']+ "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  if (!$("#sml160DdelKbn_0").is(":checked")) {
    msg += "<div>"
           + "<span>" + msglist_cmn['cmn.trash'] + "</span>"
           + "<span class=\"ml10\">" + $(".sml160DYear").val() + msglist_cmn['cmn.year'] + "</span>"
           + "<span class=\"ml10\">" + $(".sml160DMonth").val( )+ msglist_cmn['cmn.month'] + "</span>"
           + "<span class=\"ml10\">" + msglist_cmn['cmn.after'] + "</span>"
           + "</div>";
  }
  msg += "<div class=\"mt5\">"
         + "<img class='original-display'src='../smail/images/original/menu_icon_single.png'>"
         + "<img class='classic-display'src='../smail/images/classic/menu_icon_single.gif'>"
         + "<span class=\"ml10\">" + msglist_cmn['cmn.sml'] + msglist_cmn['cmn.del.check'] + "</span>"
         + "</div>";

  deletePop(pluginId, btn, msg);
}

function setSmlActSelPop() {

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

                drawSmlAccountArea(data);

                $('.js_smlAccountSelPop').dialog({
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
                drawNoDataSmlAccountArea(data)
            }
        } else {
            alert(msglist_sml010["sml.212"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.212"]);
    });
}


function smlAccountSearch() {

    var paramStr = "";
    paramStr += "CMD=getAccount&";
    paramStr += getSmlFormData($('#smlAccountPopForm'));



    $.ajax({
        async: true,
        url:  "../smail/sml240.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data != null && data.accountList.length > 0) {
                drawSmlAccountArea(data);
            } else {
                drawNoDataSmlAccountArea(data)
            }
        } else {
            alert(msglist_sml010["sml.212"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.212"]);
    });

}

function smlAccountSort(sortId, orderId) {

    var sortKey = sortId;
    var orderKey = orderId;

    document.forms['smlAccountPopForm'].sml240sortKey.value = sortKey;
    document.forms['smlAccountPopForm'].sml240order.value = orderKey;

    var paramStr = "";
    paramStr += "CMD=initData&";
    paramStr += getSmlFormData($('#smlAccountPopForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml240.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data != null && data.accountList.length > 0) {
                drawSmlAccountArea(data);
            } else {
                drawNoDataSmlAccountArea(data)
            }
        } else {
            alert(msglist_sml010["sml.214"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.214"]);
    });
}


function smlMovePage(movekbn) {

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
    paramStr += getSmlFormData($('#smlAccountPopForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml240.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data != null && data.accountList.length > 0) {
                drawSmlAccountArea(data);
            } else {
                drawNoDataSmlAccountArea(data)
            }
        } else {
            alert(msglist_sml010["sml.215"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.215"]);
    });
}

function drawSmlAccountArea(data) {

    $('#smlAccountListArea').children().remove();

    var accountListStr = "";

    accountListStr += "<form id=\"smlAccountPopForm\">"
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
                   +  "<button type=\"button\" class=\"baseBtn\" id=\"smlAccountListSearchBtn\">"
                   +  "  <img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_search.png\" alt=\"" + msglist_cmn['cmn.search'] + "\">"
                   +  "  <img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_search.png\" alt=\"" + msglist_cmn['cmn.search'] + "\">"
                   +  msglist_cmn['cmn.search']
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

        var account = msglist_cmn['sml.sml240.01'];
        var mail = msglist_cmn['cmn.mailaddress'];
        var user = msglist_cmn['cmn.employer'];
        var disk = msglist_cmn['sml.217'];
        var date = msglist_cmn['cmn.received.date'];
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
                       +  "<th class=\"w30 txt_c fw_b\">" + msglist_cmn['cmn.memo'] + "</th>"
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

    $('#smlAccountListArea').append(accountListStr);
    $('#smlAccountListArea').find('.table-top').tableTop().initTable();

}

function drawNoDataSmlAccountArea(data) {
    $('#smlAccountListArea').children().remove();
    var accountListStr = "";

    accountListStr += "<form id=\"smlAccountPopForm\">"
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
                   +  "<button type=\"button\" class=\"baseBtn\" id=\"smlAccountListSearchBtn\">"
                   +  "  <img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_search.png\" alt=\"" + msglist_cmn['cmn.search'] + "\">"
                   +  "  <img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_search.png\" alt=\"" + msglist_cmn['cmn.search'] + "\">"
                   +  msglist_cmn['cmn.search']
                   +  "</button>"
                   +  "&nbsp;"
                   +  "</div>"
                   +  "<div class=\"cl_fontWarn\">" + msglist_cmn['sml.230']
                   +  "</div>";

    $('#smlAccountListArea').append(accountListStr);
}


function getSmlFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

function selSmlAccount(obj) {
    var accountSid = obj.attr('id');
    var accountName = $('#account_' + obj.attr('id')).val();
    $('input:hidden[name=' + $('#selAccountElm').val() + ']').val(accountSid);

    if ($('input:hidden[name=' + $('#resetParam').val() + ']') != null) {
        $('input:hidden[name=' + $('#resetParam').val() + ']').val(0);
    }

    var actName = htmlEscape(accountName);
    $('#selSmlAccountNameArea').html(actName);

    var paramStr = "";
    paramStr += getFormData($(document.forms["sml160Form"]));
    paramStr = paramStr + '&CMD=accountChange';
    paramStr = paramStr + '&pluginId=smail';
    paramStr = paramStr + '&accountSid='+accountSid;
    paramStr = paramStr + '&accountName='+accountName;

    $.ajax({
        async: true,
        url:  "../common/cmn310.do",
        type: "post",
        data: paramStr,
        datatype: 'html'
    }).done(function( data ) {
        $('.js_sml').children().remove();
        $('.js_smlAccountSelPop').remove();
        $('.js_sml').append(data);
    });
    $('.js_smlAccountSelPop').dialog("close");
}

function htmlEscape(s){
    s=s.replace(/&/g,'&amp;');
    s=s.replace(/>/g,'&gt;');
    s=s.replace(/</g,'&lt;');
    return s;
}

//table-top 利用設定プラグイン
//スクリプトのロードで、画面内のtable.table-topの設定を行う
//ajaxで追加されたtableにはjqueryプラグインで後から初期化を行う

/**
 * jqueryプラグイン初期化処理
 * ここに書いた処理はDOM読み込みと並行処理になる
 */
;(function($) {

    if ($.fn.tableTop) {
        //読み込み済みの場合何もしない
        return;
    }


    /**
     * プラグインコントローラ
     *
     *
     * */
    function Plugin() {

    }
    /**
     * table-topプラグイン
     * 引数option指定でツリービューの初期化
     * optionなしでプラグインコントローラの取得
     *
     * @param option.class
     * @param option.listHover true：js_listHoverクラスへのリストホバーを入れる
     * @param option.allClose 全て閉じる要素への参照
     * @param option.duration アニメーション速度
     */
    $.fn.tableTop = function (option) {
        var ret =   new Plugin();
        ret.caller = this;
        if (option) {
            ret.initTable(option);
            return this;
        }
        return ret;
    };

    /**プラグインメソッド 初期化処理
     *  this:Pluginクラス
     *  */
    Plugin.prototype.initTable = function(option) {
        if ($(this.caller).is('table')) {
            $(this.caller).addClass('table-top');
        }
        $(this.caller).find('th').tableTop().initHeader();
        return $(this.caller)
    }
    /**プラグインメソッド thホバー設定処理
     *  this:Pluginクラス
     *
     * */
    Plugin.prototype.initHeader = function() {
        var target = this.caller;
        if (!target.is('th')) {
            target =  this.caller.find('th');
        }
        $.each(target, function() {
            var parts = $(this).find('a, select:not([multiple])');
            var partsCnt = parts.length;
            if (partsCnt == 1) {
                $(this).addClass('table_header-evt');
                $(this).addClass('js_table_header-evt');
            } else if (partsCnt > 0) {
                $(this).addClass('js_table_header-multiEvt');
                $(this).addClass('table_header-multiEvt');
                $.each(parts, function () {
                    $(this).addClass('js_table_headerParts-evt');
                });
            }
            $.each(parts, function () {
                $(this).addClass('table_headerSort-top');
            });
        });
    }
    /**
     * プラグインメソッド thホバー設定処理
     *  this:Pluginクラス
     *  cmd 'on' ：有効化 'off'：無効化
     * */
    Plugin.prototype.initRowHover = function(cmd) {

        if ($(window).on) {
            if (cmd == 'on' || cmd == undefined) {

                $(document).on('mouseenter','.js_listHover', mouseenterEvt);

                $(document).on('mouseleave', '.js_listHover', mouseleaveEvt);
            }
            if (cmd == 'off') {
                $(document).off('mouseenter','.js_listHover', mouseenterEvt);

                $(document).off('mouseleave', '.js_listHover', mouseleaveEvt);
            }
        } else if ($(window).on || cmd == undefined) {
            if (cmd == 'on' || cmd == undefined) {

                $('.js_listHover').on({
                    mouseenter:mouseenterEvt,
                    mouseleave:mouseleaveEvt
                });
            }
            if (cmd == 'off') {
                $('.js_listHover').die({
                    mouseenter:mouseenterEvt,
                    mouseleave:mouseleaveEvt
                });
            }
        }

    }
    function mouseenterEvt(e) {
        $(this).children().addClass("list_content-on");
        $(this).prev().children().addClass("list_content-topBorder");
    }

    function mouseleaveEvt(e) {
        $(this).children().removeClass("list_content-on");
        $(this).prev().children().removeClass("list_content-topBorder");
    }
})(jQuery);