//メモ一覧を最下部までスクロールした際に、複数リクエストが送られないよう制御するフラグ
var scrollFlg = true;
var agent = window.navigator.userAgent.toLowerCase();
//ブラウザがSafariであることを示すフラグ
var safariFlg = false;
//ブラウザにInternet Explorerを使用しているかを示すフラグ
var ieFlg = (agent.indexOf('msie') != -1 || agent.indexOf('trident') != -1);
$(function(){
    if (agent.indexOf("safari") != -1 && agent.indexOf("chrome") == -1 && agent.indexOf("edge") == -1) {
        safariFlg = true;
        localStorage.setItem("openMemoFlag", 1);
    } else if (ieFlg) {
        localStorage.setItem("openMemoFlag", 1);
    }
    if (agent.indexOf("mobile") != -1) {
        window.addEventListener("pagehide", function() {
            windowClose();
            closeMemoWindow();
        });
    } else {
        window.addEventListener("beforeunload", function() {
            windowClose();
            closeMemoWindow();
        });
    }

    setDatepicker($("#dp1"));
    setDatepicker($("#dp2"));
    setDatepicker($("#dp3"));

    var dspMode = document.forms[0].mem010DisplayMode.value;
    changeDisplay(dspMode);

    $(window).resize(function() {
      listScroll();
    });

    //メモ一覧をホバーした際に色が変わる
    $(document).on("mouseenter", ".js_listHover", function(){
        if ($(this).children().hasClass("bgC_header3")) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
            $(this).next().children().removeClass("list_content-bottomBorder");
            $(".js_memo-delete").removeClass("memo_hover_color");
            $(".js_memo-delete").addClass("bgC_header3");
        } else {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
            $(this).next().children().addClass("list_content-bottomBorder");
            $(".js_memo-delete").addClass("memo_hover_color");
            $(".js_memo-delete").removeClass("bgC_header3");
        }
    });

    //ホバーが外れたとき色を元に戻す
    $(document).on("mouseleave", ".js_listHover", function(){
        $(this).children().removeClass("list_content-on");
        $(this).prev().children().removeClass("list_content-topBorder");
        $(this).next().children().removeClass("list_content-bottomBorder");
    });

    //削除アイコンの表示と範囲選択を可能にする
    $(document).on("mouseenter", ".js_memo-title", function(){
        $(this).find(".js_edate").addClass("display_none");
        $(this).find(".js_memo-delete").removeClass("display_none");
    });

    //削除アイコンの非表示
    $(document).on("mouseleave", ".js_memolist tr", function(){
        $(this).find(".js_memo-delete").addClass("display_none");
        $(this).find(".js_edate").removeClass("display_none");
    });

    //ラベルクリック時、画面を最下部までスクロール
    $(".js_labelSetting").on("click", function(){
        var element = document.documentElement;
        var bottom = element.scrollHeight - element.clientHeight;
        window.scroll(0, bottom);
    });

    // textareaの文字数をカウント
    $("textarea").bind("keyup", function(){
        var textLengh = $(this).val().length;
        $(".js_textCount").html(textLengh);
        if (textLengh > 1000) {
            $(".js_textCount").addClass("formCounter_over");
        } else {
            $(".js_textCount").removeClass("formCounter_over");
        }
    });

    /** チェックボックスの範囲選択 */
    var cbx_last = null;
    $(document).on('click', '.js_tableCheck', function(event){
        if (!event.shiftKey && $(this).hasClass("js_memo-title")) {
           return;
        }
        if (event.shiftKey && cbx_last) {
            var $targets = $(".js_cbx");
            var p1 = $targets.index(cbx_last);
            var p2 = $targets.index($(this).parent().find(".js_cbx"));
            var min =Math.min(p1, p2);
            var max = Math.max(p1, p2);
            var bool;
            if ($(this).parent().find(".js_cbx").prop("checked")) {
                bool = false;
            } else {
                bool = true;
            }
            for (var i = min; i <= max; ++i) {
                $targets.get(i).checked = bool;
            }
        } else {
            if ($(this).parent().find(".js_cbx").prop("checked")) {
                $(this).parent().find(".js_cbx").prop("checked", false);
            } else {
                $(this).parent().find(".js_cbx").prop("checked", "true");
            }
        }
        cbx_last = $(this).parent().find(".js_cbx");
    });

    /** スクロールによるメモの取得 */
    $(".js_memo").on("scroll", function(){
        var nowTop = $(this).scrollTop();
        var sH = $(this).get(0).scrollHeight;
        var oH = $(this).get(0).offsetHeight;
        if (sH != oH) {
            var scrollHeight = sH - oH;
            var readMore = 0;
            if (nowTop > scrollHeight && scrollFlg) {
                readMore = 1;
                scrollFlg = false;
            }

            if (readMore == 1) {
                var param = createParamMem010();
                var sort = $("input[name='mem010Sort']:checked").val();
                param["CMD"] = "scrollRead";
                param["mem010MemoCount"] = $(".js_memo-title").length;
                param["mem010SearchNaiyo"] = document.forms[0].mem010SvSearchNaiyo.value;
                param["mem010SearchDateFr"] = document.forms[0].mem010SvSearchDateFr.value;
                param["mem010SearchDateTo"] = document.forms[0].mem010SvSearchDateTo.value;
                param["mem010SearchLabel"] = document.forms[0].mem010SvSearchLabel.value;
                param["mem010SearchTenpu"] = document.forms[0].mem010SvSearchTenpu.value;
                param["mem010Sort"] = document.forms[0].mem010SvSort.value;
                var paramStr = $.param(param, sort);

                $.ajax({
                    async: true,
                    url : "../memo/mem010.do",
                    type: "post",
                    data: paramStr
                }).done(function(data) {
                    if (data["success"]) {
                        var memoList = getMemoList(data);
                        $(".js_memolist tbody").append(memoList);
                        changeBorder();
                    } else {
                        if (data["size"] > 0) {
                            displayError(data);
                        } else {
                            displayErrorUnauthorized();
                        }
                    }
                    scrollFlg = true;
                }).fail(function(data) {
                     displayErrorSession();
                     scrollFlg = true;
                });

            }
         }
    });

    /* 詳細検索 */
    $("#head_menu_search_btn").on("click", function(){

        var param = createParamMem010();
        var sort = $("input[name='mem010Sort']:checked").val();
        param["CMD"] = "detailSearch";
        var paramStr = $.param(param, sort);

        $.ajax({
            async: true,
            url:  "../memo/mem010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                $("#errorMessageArea").html("");
                if (data["size"] == 0) {
                    $("#errorMessageArea").append("<div class=\"cl_fontWarn\">" + msglist["memo.get.error"] + "</div>");
                }
                $(".js_memo").scrollTop(0);

                $(".js_memolist tr").remove();
                var memoList = getMemoList(data);
                $(".js_memolist tbody").append(memoList);
                changeBorder();

                resetMemoInfo();
                $("input[name='mem010TargetMemoSid']").val("-1");
                $(".js_button1").removeClass("display_none");
                $(".js_button2").addClass("display_none");

                $("input[name='mem010SvSearchNaiyo']").val(data["svSearchNaiyo"]);
                $("input[name='mem010SvSearchDateFr']").val(data["svSearchDateFr"]);
                $("input[name='mem010SvSearchDateTo']").val(data["svSearchDateTo"]);
                $("input[name='mem010SvSearchLabel']").val(data["svSearchLabel"]);
                $("input[name='mem010SvSearchTenpu']").val(data["svSearchTenpu"]);
                $("input[name='mem010SvSort']").val(data["svSort"]);
            } else {
                if (data["size"] > 0) {
                    displayError(data);
                } else {
                    displayErrorUnauthorized();
                }
            }
        }).fail(function(data) {
            displayErrorSession();
        });
    });

    /* メモ一覧  ラベル追加ポップアップ ラジオボタン変更 */
    $('input:radio[name=mem010addLabelT]').on("change", function(){
        changeAddLabelType();
    });

    /* 詳細検索キャンセル時 */
    $("#searchCancel").on("click", function(){

        /* 検索条件リセット */
        $("input[name='mem010SearchNaiyo']").val("");
        $("input[name='mem010SearchDateFr']").val("");
        $("input[name='mem010SearchDateTo']").val("");
        $("select[name='mem010SearchLabel']").val("");
        changeTenpuChecked(0);
        changeSortChecked(0);

        var param = createParamMem010();
        param["CMD"] = "detailSearch";
        param["mem010SearchTenpu"] = 0;
        param["mem010Sort"] = 1;
        var paramStr = $.param(param, true);
        $.ajax({
            async: true,
            url:  "../memo/mem010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                $("#errorMessageArea").html("");
                if (data["size"] == 0) {
                    $("#errorMessageArea").append("<div class=\"cl_fontWarn\">" + msglist["memo.get.error"] + "</div>");
                }
                $(".js_memo").scrollTop(0);

                $(".js_memolist tr").remove();
                var memoList = getMemoList(data);
                $(".js_memolist tbody").append(memoList);
                changeBorder();

                resetMemoInfo();
                $("input[name='mem010TargetMemoSid']").val("-1");
                $(".js_button1").removeClass("display_none");
                $(".js_button2").addClass("display_none");

                $("input[name='mem010SvSearchNaiyo']").val(data["svSearchNaiyo"]);
                $("input[name='mem010SvSearchDateFr']").val(data["svSearchDateFr"]);
                $("input[name='mem010SvSearchDateTo']").val(data["svSearchDateTo"]);
                $("input[name='mem010SvSearchLabel']").val(data["svSearchLabel"]);
                $("input[name='mem010SvSearchTenpu']").val(data["svSearchTenpu"]);
                $("input[name='mem010SvSort']").val(data["svSort"]);
            } else {
                if (data["size"] > 0) {
                    displayError(data);
                } else {
                    displayErrorUnauthorized();
                }
            }
        }).fail(function(data) {
            displayErrorSession();
        });
    });

    /* メモ明細表示 */
    $(document).on("click", ".js_memo-title", function(event){

        if (event.shiftKey) {
            return;
        }

        var targetMemoSid = $(this).children("input[name='memSid']").val();
        var thisObj = $(this);

        var param = createParamMem010();
        param["CMD"] = "showMemoData";
        param["mem010TargetMemoSid"] = targetMemoSid;
        var paramStr = $.param(param, true);

        $.ajax({
            async: true,
            url:  "../memo/mem010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                resetMemoInfo();
                if (data["mmlSize"] > 0) {
                  $(".js_showLabel").children().remove();
                    for (var i = 0; i < data["mmlSize"]; i++) {
                        /** メモ情報ラベル一覧にラベル追加 */
                        $(".js_showLabel").append("<div><input type=\"hidden\" value=\""
                          + data["mmlSid_" + i] + "\"><span class='baseLabel mr5'>" + data["mmlName_" + i] + "</span>"
                          + "<img id='label_" + data["mmlSid_" + i] +"'class='btn_originalImg-display cursor_p'"
                          + "src='../common/images/original/icon_delete.png' alt='trash' onclick='deleteLabel("+ data["mmlSid_" + i] + ");'>"
                          + "<img id='label_" + data["mmlSid_" + i] +"'class='btn_classicImg-display cursor_p'"
                          + "src='../common/images/classic/icon_delete.png' alt='trash' onclick='deleteLabel("+ data["mmlSid_" + i] + ");'></div>");
                  }
                }

                /** メモ情報の表示 */
                $(".js_textarea").val(data["mmdContent"]);
                $(".js_textCount").text(data["mmdContent"].length);
                if (data.atdelDate != null) {
                    $("#dp3").val(data["atdelDate"]);
                } else {
                    $("#dp3").parent().text(data["atdelDate"]);
                    $("#dp3").val("");
                }

                $("#attachmentFileListArea").children("div").remove();
                $("#attachmentFileErrorArea").empty();
                if (data["fileSize"] != null) {
                    for (var i = 0; i < data["fileSize"]; i++) {
                        /** メモ情報ファイル一覧にファイル追加 */
                        addTempFile(data["value_" + i], data["fileName_" + i]);

                    }
                }
                $("#errorMessageArea").html("");
                $("input[name='mem010TargetMemoSid']").val(data["memSid"]);
                $(".js_button1").addClass("display_none");
                $(".js_button2").removeClass("display_none");
                $(".js_memo-title").removeClass("bgC_header3");
                $(".js_memo-title").siblings().removeClass("bgC_header3");
                $(".js_memo-delete").removeClass("memo_hover_color");
                thisObj.siblings().removeClass("list_content-on");
                thisObj.removeClass("list_content-on");
                thisObj.parents().prev().children().removeClass("list_content-topBorder");
                thisObj.siblings().addClass("bgC_header3");
                thisObj.addClass("bgC_header3");
                $(".js_memo-delete").addClass("bgC_header3");
            } else {
                if (data["size"] > 0) {
                    displayError(data);
                } else {
                    displayErrorUnauthorized();
                }
            }
        }).fail(function(data) {
            displayErrorSession();
        });
    });

    /* メモ登録 */
    $("#memo_insert_btn").on("click", function(){
        var param = createParamMem010();
        var labels = $(".js_showLabel input");
        var labelAry = [];
        if (labels.length > 0) {
            for(var i = 0; i < labels.length; i++) {
                labelAry.push(labels.eq(i).val());
            }
            param["mem010Label"] = labelAry;
        }
        var labelNames = $(".js_showLabel span");
        var nameAry = [];
        if (labelNames.length > 0) {
            for (var i = 0; i < labelNames.length; i++) {
                nameAry.push(labelNames.eq(i).text());
            }
            param["mem010LabelName"] = nameAry;
        }
        var atdelFlg = 0;
        var atdelDate = $("input[name='mem010AtdelDate']").val();
        if (atdelDate.length > 0) {
            atdelFlg = 1;
            var atdelDate = $("input[name='mem010AtdelDate']").val();
            param["mem010AtdelDate"] = atdelDate;
        }
        param["mem010AtdelFlg"] = atdelFlg;
        param["CMD"] = "insertMemo";
        param["mem010Naiyo"] = $(".js_textarea").val();
        param["mem010MemoCount"] = $(".side_multileft-memo tbody tr").length;
        param["mem010SearchNaiyo"] = document.forms[0].mem010SvSearchNaiyo.value;
        param["mem010SearchDateFr"] = document.forms[0].mem010SvSearchDateFr.value;
        param["mem010SearchDateTo"] = document.forms[0].mem010SvSearchDateTo.value;
        param["mem010SearchLabel"] = document.forms[0].mem010SvSearchLabel.value;
        param["mem010SearchTenpu"] = document.forms[0].mem010SvSearchTenpu.value;
        param["mem010Sort"] = document.forms[0].mem010SvSort.value;
        var paramStr = $.param(param, true);
        loadingPop(msglist["nowLoading"]);

        $.ajax({
            async: true,
            url:  "../memo/mem010.do",
            type: "post",
            data: paramStr,
            cache: false
        }).done(function( data ) {
            if (data["success"]) {
                $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
                resetMemoInfo();
                $("#errorMessageArea").html("");
                closeloadingPop();
                displayToast2(msglist["memo.insert"]);
                $("input[name='mem010TargetMemoSid']").val("-1");
                var memoList = getMemoList(data);
                var sort = document.forms[0].mem010SvSort.value;
                if (sort == 1) {
                    $(".side_multileft-memo tbody").prepend(memoList);
                } else {
                    $(".side_multileft-memo tbody").append(memoList);
                }
                changeBorder();
            } else {
                closeloadingPop();
                if (data["size"] > 0) {
                    displayError(data);
                    $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
                } else {
                    displayErrorUnauthorized();
                }
            }
        }).fail(function(data) {
            closeloadingPop();
            displayErrorSession();
        });
    });

    /* メモ複数削除 */
    $("#delete_btn").on("click", function(){
        var targetCbx = $(".js_cbx:checked");
        if (targetCbx.length > 0) {
            deleteMultiMemoPop();
        } else {
            messageMemoPop();
        }

    });

    /* メモ変更 */
    $("#update_btn").on("click", function(){
        var param = createParamMem010();
        var targetMemoSid = $("input[name='mem010TargetMemoSid']").val();
        var labels = $(".js_showLabel input");
        var labelAry = [];
        if (labels.length > 0) {
            for(var i = 0; i < labels.length; i++) {
                labelAry.push(labels.eq(i).val());
            }
            param["mem010Label"] = labelAry;
        }

        var labelNames = $(".js_showLabel span");
        var nameAry = [];
        if (labelNames.length > 0) {
            for (var i = 0; i < labelNames.length; i++) {
                nameAry.push(labelNames.eq(i).text());
            }
            param["mem010LabelName"] = nameAry;
        }

        var atdelFlg = 0;
        var atdelDate = $("input[name='mem010AtdelDate']").val();
        if (atdelDate.length > 0) {
            atdelFlg = 1;
            var atdelDate = $("input[name='mem010AtdelDate']").val();
            param["mem010AtdelDate"] = atdelDate;
        }
        param["CMD"] = "updateMemo";
        param["mem010Naiyo"] = $(".js_textarea").val();
        param["mem010AtdelFlg"] = atdelFlg;
        param["mem010MemoCount"] = $(".js_memolist tr").length;
        param["mem010SearchNaiyo"] = document.forms[0].mem010SvSearchNaiyo.value;
        param["mem010SearchDateFr"] = document.forms[0].mem010SvSearchDateFr.value;
        param["mem010SearchDateTo"] = document.forms[0].mem010SvSearchDateTo.value;
        param["mem010SearchLabel"] = document.forms[0].mem010SvSearchLabel.value;
        param["mem010SearchTenpu"] = document.forms[0].mem010SvSearchTenpu.value;
        param["mem010Sort"] = document.forms[0].mem010SvSort.value;
        var paramStr = $.param(param, true);
        loadingPop(msglist["nowLoading"]);

        $.ajax({
            async: true,
            url:  "../memo/mem010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                $("#errorMessageArea").html("");
                $(".js_button1").removeClass("display_none");
                $(".js_button2").addClass("display_none");
                resetMemoInfo();
                $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
                $("input[name='mem010TargetMemoSid']").val("-1");
                $("input[name='memSid'][value='" + targetMemoSid + "']").closest("tr").remove();
                closeloadingPop();
                displayToast2(msglist["memo.update"]);
                if (data["memSid_0"] != undefined) {
                    var memoList = getMemoList(data);
                    var sort = document.forms[0].mem010SvSort.value;
                    if (sort == 1) {
                        $(".js_memolist tbody").prepend(memoList);
                    } else {
                        $(".js_memolist tbody").append(memoList);
                    }
                    changeBorder();
                }
            } else {
                closeloadingPop();
                if (data["size"] > 0) {
                    displayError(data);
                    $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
                } else {
                    displayErrorUnauthorized();
                }
            }
        }).fail(function(data) {
            closeloadingPop();
            displayErrorSession();
        });
    });

    /** メモのクリア，変更の取消ボタン処理 */
    $(document).on("click", "#clear_btn", function(){
        thisBtn = $(this);
        paramStr = "CMD=deleteTmpAll";
        $.ajax({
            async: true,
            url:  "../memo/mem010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                $("#errorMessageArea").html("");
                resetMemoInfo();
                $(".js_memo-title").removeClass("bgC_header3");
                $(".js_memo-title").siblings().removeClass("bgC_header3");
                $(".js_memo-delete").removeClass("bgC_header3");
                $(".js_memo-delete").addClass("memo_hover_color");
                $("input[name='mem010TargetMemoSid']").val("-1");

                if (thisBtn.hasClass("js_button2")) {
                    $(".js_button2").addClass("display_none");
                    $(".js_button1").removeClass("display_none");
                }
            } else {
                $("#errorMessageArea").html("");
                $("#errorMessageArea").append("<div class=\"cl_fontWarn\">" + msglist["memo.clear.error"] + "</div>");
            }
        }).fail(function(data) {
            displayErrorSession();
        });
    });
});

/** メモの削除(単体) */
function deleteMemo(deleteMemoSid) {

    var param = createParamMem010();
    param["CMD"] = "deleteMemo";
    param["mem010DeleteMemoSidArray"] = deleteMemoSid;
    param["mem010SearchNaiyo"] = document.forms[0].mem010SvSearchNaiyo.value;
    param["mem010SearchDateFr"] = document.forms[0].mem010SvSearchDateFr.value;
    param["mem010SearchDateTo"] = document.forms[0].mem010SvSearchDateTo.value;
    param["mem010SearchLabel"] = document.forms[0].mem010SvSearchLabel.value;
    param["mem010SearchTenpu"] = document.forms[0].mem010SvSearchTenpu.value;
    param["mem010Sort"] = document.forms[0].mem010SvSort.value;
    var paramStr = $.param(param, true);
    loadingPop(msglist["nowLoading"]);

    $.ajax({
        async: true,
        url:  "../memo/mem010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            $("#errorMessageArea").html("");
            $(".js_memolist tr").remove();
            $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
            if (data["delete"]) {
                resetMemoInfo();
                buttonToggle();
            }
            closeloadingPop();
            if (data["delSize"] > 0) {
                displayToast2(data["delSize"] + msglist["memo.delete"]);
            }
            var memoList = getMemoList(data);
            $(".js_memolist tbody").append(memoList);
            changeBorder();
        } else {
            closeloadingPop();
            if (data["size"] > 0) {
                displayError(data);
                $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
            } else {
                displayErrorUnauthorized();
            }
        }
    }).fail(function(data) {
        closeloadingPop();
        displayErrorSession();
    });
}

function closeThisWindow() {
    if (safariFlg || ieFlg) {
        localStorage.removeItem("openMemoFlag");
    }
    window.close();
}

var count = 0;

function labelAddPop() {

    $('#labelAddPop').dialog({
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height:'auto',
        width: 400,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
            text:msglist["add"],
            click: function() {
                $(".cl_fontWarn").html("");
                doLabel();
            }
        },{
            text:msglist["close"],
            click: function() {
                $(this).dialog('close');
                $(".cl_fontWarn").html("");
            }
        }]
    });
}

/**
 * ラベルの追加を行う
 */
function doLabel() {

    var labelName = $("#label_dialog_new").val();
    var labelSid = $("#label_dialog_sel").val();
    var param = createParamMem010();
    param["CMD"] = "addLabel";
    var insertFlg = false;
    if ($('#addLabelType0').prop("checked") == true) {
        param["mem010addLabelMod"] = 0;
        param["mem010targetLabelSid"] = labelSid;
    } else if ($('#addLabelType1').prop("checked") == true) {
        param["mem010addLabelMode"] = 1;
        param["mem010addLabelName"] = labelName;
        insertFlg = true;
    }

    var paramStr = $.param(param, true);
    $('#labelAddPop').dialog('close');
    loadingPop(msglist["nowLoading"]);
    $.ajax({
        async: true,
        url:  "../memo/mem010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            $('#labelAddPop').dialog('close');
            $(".ui-dialog-content").children("div.cl_fontWarn").remove();
            $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);

            if (data.mmlName != undefined) {
                if (insertFlg) {
                    /**ラベル情報をコンボボックスに追加 */
                    $("select[name='mem010SearchLabel']").append("<option value=\""+data.mmlSid+"\">"+ data.mmlName +"</option>");
                    $("#label_dialog_sel").append("<option value=\""+data.mmlSid+"\">" + data.mmlName + "</option>");
                }
                /** ラベル一覧に既に同じSIDを持つラベルがなければ、メモ情報ラベル一覧にラベル追加 */
                if ($(".js_showLabel").find("#label_" + data.mmlSid).length == 0) {
                    var detail = "";
                    detail += "<div><input type=\"hidden\" value=\"" + data.mmlSid + "\"><span class='baseLabel mr5'>" + data.mmlName + "</span>";
                    detail +=  "<img id='label_" + data.mmlSid +"'class='btn_originalImg-display cursor_p' src='../common/images/original/icon_delete.png'"
                    detail +=      " alt='trash' onclick='deleteLabel("+ data.mmlSid + ");'>";
                    detail +=  "<img id='label_" + data.mmlSid +"'class='btn_classicImg-display cursor_p' src='../common/images/classic/icon_delete.png'"
                    detail +=      " alt='trash' onclick='deleteLabel("+ data.mmlSid + ");'>";
                    detail += "</div>"
                    $(".js_showLabel").append(detail);
                }
                $("#label_dialog_new").val("");
            }
        } else {
            $(".ui-dialog-content").children("div.cl_fontWarn").remove();
            if (data["size"] > 0) {
                for (var i = 0; i < data["size"]; i++) {
                    $(".ui-dialog-content").prepend("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
                }
                $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
            } else {
                $(".ui-dialog-content").prepend("<div class=\"cl_fontWarn\">" + msglist["memo.session.error"] + "</div>");
            }
        }
        closeloadingPop();
    }).fail(function(data) {
        closeloadingPop();
        $(".ui-dialog-content").children("div.cl_fontWarn").remove();
        $(".ui-dialog-content").prepend("<div class=\"cl_fontWarn\">" + msglist["memo.session.error"] + "</div>");
    });
}

/**
 * エラーメッセージを削除する
 */
function showMessage(msg) {
    $('#errorMessageArea').children().remove();
    $('#errorMessageArea').append(msg);
}

/**
 * 添付ラジオボタンのchecked属性を切り替える
 */
function changeTenpuChecked(idx) {
    $("input[name='mem010SearchTenpu']").removeAttr("checked");
    $("input[name='mem010SearchTenpu']").eq(idx).attr("checked", true);
}

/**
 * ソート順ラジオボタンのchecked属性を切り替える
 */
function changeSortChecked(idx) {
    $("input[name='mem010Sort']").removeAttr("checked");
    $("input[name='mem010Sort']").eq(idx).attr("checked", true);
}


/**
 * ラベル追加ダイアログの入力不可を切り替える
 */
function changeAddLabelType() {
    if ($('input:radio[name=mem010addLabelT]:checked').val() == 1) {
        $('#label_dialog_sel').attr("disabled", "disabled");
        $('#label_dialog_new').removeAttr("disabled");
    } else {
        $('#label_dialog_sel').removeAttr("disabled");
        $('#label_dialog_new').attr("disabled", "disabled");
    }
}

/**
 * メモ情報欄を初期状態にする
 */
function resetMemoInfo() {
    $("#attachmentFileListArea").addClass('word_b-all');
    $("#attachmentFileListArea div").remove();
    $("#attachmentFileErrorArea").empty();
    $(".js_textarea").val("");
    $(".js_showLabel").children().remove();
    $("input[name='mem010AtdelFlg']").removeProp("checked");
    $("#dp3").val("");
    $(".js_textCount").text("0");
    $(".js_textCount").removeClass("formCounter_over");
}

/** メモ一覧に追加するメモを取得する */
function getMemoList(data) {
    var detail = "";
    var divWidth = $(".js_caption").width();
    var titleWidth = divWidth - 110;
    if (data["size"] > 0) {
        for (var i = 0; i < data["size"]; i++) {
            detail += "<tr class='js_listHover'>";
            detail +=   "<td class='txt_c js_tableCheck cursor_p wp20 h100'>";
            detail +=     "<input type='checkbox' class='js_cbx list_checkbox'></td>";
            detail +=   "<td class='cursor_p js_tableCheck js_memo-title pos_rel'>";
            detail +=     "<input type='hidden' name='memSid' value='";
            detail +=       data["memSid_" + i];
            detail +=     "'>";
            detail +=     "<div class='display_flex'>";
            detail +=       "<div class='cal_content js_cal_content text-title fs_12' style='width: "+ titleWidth +"px'>";
            detail +=         data["mmdContent_" + i];
            detail +=       "</div>";
            detail +=       "<div class='cal_time p0 fs_11 mt2 memo_edate js_edate wp65 txt_r hp12'>";
            detail +=         data["mmdEdate_" +i];
            detail +=       "</div>";
            detail +=     "</div>";
            detail +=     "<div class='list_label-margin lh120 mt2 mb1'>";
            if (data["memBin_" + i] == 1) {
                detail +=   "<img class='btn_originalImg-display' src='../common/images/original/icon_attach.png' alt='" + msglist["attach"] + "'>";
                detail +=   "<img class='btn_classicImg-display' src='../common/images/classic/icon_temp_file_2.png' alt='" + msglist["attach"] + "'>";
            }
            if (typeof data["mmlName_" + i] != 'undefined') {
                detail += "  <span class='baseLabel m0 list_label-padding'>";
                detail +=      data["mmlName_" + i];
                detail += "  </span>"
            }
            detail +=     "</div>";
            detail +=     "<div class='verAlignMid txt_c mt2 js_memo-delete memo_hover_color delete_button-pos pos_abs cl_linkDef display_none' onclick='deleteMemoPop(event," +  data["memSid_" + i] +  ");'>";
            detail +=       "<img class='original-display ' src='../common/images/original/icon_delete.png' alt='trash'>";
            detail +=       "<img class='classic-display ' src='../common/images/classic/icon_delete.png' alt='trash'>";
            detail +=     "</div>";
            detail +=   "</td>";
            detail += "</tr>";
        }
    }
    return detail;
}

/** エラーメッセージを表示する */
function displayError(data) {
    $("#errorMessageArea").html("");
    for (var i = 0; i < data["size"]; i++) {
        $("#errorMessageArea").append("<div class=\"cl_fontWarn\">" + data["errorMsg_" + i] + "</div>");
    }
}

/** セッションが切断されたことを表示する */
function displayErrorSession() {
    $("#errorMessageArea").html("");
    $("#errorMessageArea").append("<div class=\"cl_fontWarn\">" + msglist["memo.session.error"] + "</div>");
}

/** 不正なアクセスが行われたことを表示する */
function displayErrorUnauthorized() {
    $("#errorMessageArea").html("");
    $("#errorMessageArea").append("<div class=\"cl_fontWarn\">" + msglist["memo.unauthorized.error"] + "</div>");
}

function setDatepicker(elm) {
    var dates = null;
    if (elm != null) {
        dates = elm.datepicker({
            showAnim: 'blind',
            changeMonth: true,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            showButtonPanel: true,
            dateFormat:'yy/mm/dd',
            onSelect: function( selectedDate ) {
            }
        });
    }
    return dates;
}

//詳細検索項目を表示する
function viewSearchDetail() {
    var height = $(".js_memoCount").offset().top + $(".js_memoCount").innerHeight()
                + window.outerHeight - window.innerHeight + 139;
    if ($("#top_detailSearch.display_none").length) {
        $("#top_detailSearch").removeClass("display_none");
        window.resizeTo(666, 790);
    } else {
        $("#top_detailSearch").addClass("display_none");
        window.resizeTo(666, 635);
    }
}

//ラベルの削除
function deleteLabel(index) {
    $("#label_" + index).parent().remove();
}

//登録，編集ボタンを切り替える
function buttonToggle() {
    $(".js_button1").toggleClass("display_none");
    $(".js_button2").toggleClass("display_none");
}

//画面を閉じた際に、親画面のメモウィンドウ保持フラグを削除する
function closeMemoWindow() {
    if (window.opener != null && !ieFlg) {
        window.opener.deleteMemoWindow();
    }

    if (safariFlg || ieFlg) {
        localStorage.removeItem("openMemoFlag");
    }
}

//簡易表示，一覧表示を切り替える
function changeDisplay(mode) {
    $("#errorMessageArea").html("");
    var height = $(".js_memoCount").offset().top + $(".js_memoCount").innerHeight()
                + window.outerHeight - window.innerHeight + 139;
    if (mode == 0) {
        var searchCheckFlg = false;
        var searchElement = document.getElementById("top_detailSearch");
        if (!(searchElement.classList.contains("display_none") == true)) {
            searchCheckFlg = true;
        }
        $(".pageTitle button").eq(0).addClass("display_none");
        $(".js_display-compact").addClass("display_none");
        $(".js_display-normal").removeClass("display_none");
        $("#top_detailSearch").addClass("display_none");
        $(".side_multileft-memo").addClass("display_none");
        $(".js_block-right").removeClass("w50");
        $(".js_block-right").addClass("w100");
        window.resizeTo(360, 635);
    } else if (mode == 1) {
        $(".pageTitle button").eq(0).removeClass("display_none");
        $(".js_display-compact").removeClass("display_none");
        $(".js_display-normal").addClass("display_none");
        $(".side_multileft-memo").removeClass("display_none");
        $(".js_block-right").addClass("w50");
        $(".js_block-right").removeClass("w100");
        window.resizeTo(666, 635);
        changeBorder();
    }
}

//メモ機能表示状態を保存する
function saveDisplay(mode) {
    var param = createParamMem010();
    param["CMD"] = "saveDisplay";
    param["mem010DisplayMode"] = mode;
    var paramStr = $.param(param, true);
    $.ajax({
        async: true,
        url:  "../memo/mem010.do",
        type: "post",
        data: paramStr
    });
}

window.addEventListener('load', function() {
  setTimeout(initSetting, 10);
})

function initSetting() {
  changeBorder();
  listScroll();
  $(".js_cal_content").addClass("text-title");
}

function listScroll() {
  var divWidth = $(".js_caption").width();
  var edateWidth = $(".js_edate").width();
  $(".js_cal_content").width(divWidth - 20 - edateWidth - 20);
}

//メモ一覧に表示されているメモの数に応じて、メモ一覧の枠線を設定する
function changeBorder() {
    var height_table = $(".js_memolist").height();
    var height_div = $(".js_memo").height();
    if (height_table > height_div) {
        $(".js_memolist").parent().addClass("bor_r1 bor_b1");
        $(".js_memolist td").removeClass("bor_b1");
        $(".js_memolist tr:last-child").addClass("memo_list-bottom");
    } else {
        $(".js_memolist").parent().removeClass("bor_r1 bor_b1");
        $(".js_memolist td").addClass("bor_b1");
    }
}

//formの値からパラメータを生成する
function createParamMem010() {
    var serialArr = $('#js_memForm').serializeArray();
    var ret = {};
    $.each(serialArr, function () {
        ret[this.name]= this.value;
    });
    return ret;
}

//添付ファイルを追加表示する
var tempNameList = [];
function addTempFile(tempSaveName, tempName) {
    var detail = $('#attachmentFileListArea').append(
        '<file-preview url=\"../memo/mem010.do?CMD=fileDownload&mem010selectFile=' + tempSaveName + '\" filename=\"' + tempName + '\" >'
        + '<div id="attachmentFileDetail' + '_' + tempSaveName + '">'
        + '<span class="verAlignMid">'
        + '<a href="#!" onClick="attachmentFileDownload(' + tempSaveName + ');">'
        + '<span class="textLink">' + tempName + '</span>'
        + '</a>'
        + '<img class="ml5 cursor_p btn_originalImg-display" src="../common/images/original/icon_delete.png" onClick="attachmentDeleteFile(' + tempSaveName + ',);" draggable="false" alt=\"' + msglist["delet"] + '\">'
        + '<img class="ml5 cursor_p btn_classicImg-display" src="../common/images/classic/icon_delete.png" onClick="attachmentDeleteFile(' + tempSaveName + ',);" draggable="false" alt=\"' + msglist["delet"] + '\">'
        + '</span>'
        + '</div>'
        + '</file-preview>'
    );
}

//メモ複数削除時確認ダイアログを表示する
function deleteMultiMemoPop() {

    var widthStr = 250;
    var heightStr = 'auto';
    $("#delMemoMsgArea").html(msglist["memo.delete.confirm"]);

    $('#delMemoMsgPop').dialog({
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
        buttons: [{
            text:"OK",
            click:  function() {
                deleteMultiMemo();
                $(this).dialog('close');
            }
        },{
            text:msglist["cancel"],
            click:  function() {
            $(this).dialog('close');
            }
        }]
    });
}

//メモ単体削除時確認ダイアログを表示する
function deleteMemoPop(e, targetMemoSid) {
    e.stopPropagation();
    var widthStr = 250;
    var heightStr = 'auto';
    $("#delMemoMsgArea").html(msglist["memo.delete.confirm"]);

    $('#delMemoMsgPop').dialog({
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
        buttons: [{
            text:"OK",
            click:  function() {
                deleteMemo(targetMemoSid);
                $(this).dialog('close');
            }
        },{
            text:msglist["cancel"],
            click:  function() {
                $(this).dialog('close');
            }
        }]
    });
}

function messageMemoPop(){

    var widthStr = 300;
    var heightStr = 'auto';
    $("#delMemoMsgArea").html(msglist["memo.select.error"]);

    $('#delMemoMsgPop').dialog({
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
        buttons: [{
            text:"OK",
            click:  function() {
                $(this).dialog('close');
            }
        }]
    });
}

/* メモ複数削除 */
function deleteMultiMemo() {

    var targetCbx = $(".js_cbx:checked");
    var targetSidAry =[];
    for (var i = 0; i < targetCbx.length; i++) {
        targetSidAry.push(targetCbx.eq(i).closest("tr").find("input[name='memSid']").val());
    }

    var param = createParamMem010();
    param["CMD"] = "deleteMemo";
    param["mem010DeleteMemoSidArray"] = targetSidAry;
    param["mem010SearchNaiyo"] = document.forms[0].mem010SvSearchNaiyo.value;
    param["mem010SearchDateFr"] = document.forms[0].mem010SvSearchDateFr.value;
    param["mem010SearchDateTo"] = document.forms[0].mem010SvSearchDateTo.value;
    param["mem010SearchLabel"] = document.forms[0].mem010SvSearchLabel.value;
    param["mem010SearchTenpu"] = document.forms[0].mem010SvSearchTenpu.value;
    param["mem010Sort"] = document.forms[0].mem010SvSort.value;
    var paramStr = $.param(param, true);
    loadingPop(msglist["nowLoading"]);

    $.ajax({
        async: true,
        url:  "../memo/mem010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
            $("#errorMessageArea").html("");
            $(".js_memolist tr").remove();
            if (data["delete"]) {
                resetMemoInfo();
                buttonToggle();
            }
            closeloadingPop();
            if (data["delSize"] > 0) {
                displayToast2(data["delSize"] + msglist["memo.delete"]);
            }
            var memoList = getMemoList(data);
            $(".js_memolist tbody").append(memoList);
            changeBorder();
        } else {
            closeloadingPop();
            targetCbx.eq(i).closest("tr").remove();
            if (data["size"] > 0) {
                displayError(data);
                $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
            } else {
                displayErrorUnauthorized();
            }
        }
    }).fail(function(data) {
        closeloadingPop();
        displayErrorSession();
    });
}

function loadingPop(popTxt) {

    $('#loading_pop').dialog({
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 100,
        width: 250,
        modal: true,
        closeOnEscape: false,
        title: popTxt,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        }
    });

    $('.ui-button-text').each(function() {
        if ($(this).text() == 'hideBtn') {
            $(this).parent().parent().parent().addClass('border_top_none');
            $(this).parent().parent().parent().addClass('border_bottom_none');
            $(this).parent().remove();
        }
    })
}

function closeloadingPop() {
    if ($('#loading_pop') != null) {
        $('#loading_pop').dialog('close');
    }
}

/* ウィンドウ幅が770px以上の時、メモ欄のみを拡大 */
window.addEventListener('resize', function(){
    let dspList = $(".js_multileft-memo");
    if (!(dspList.hasClass("display_none")) && (window.innerWidth > 770)) {
        $(".js_block-right").addClass("change_memo-area");
        $(".js_block-right").removeClass("w50");

    } else if (!(dspList.hasClass("display_none")) && (window.innerWidth > 600)) {
        $(".js_block-right").removeClass("change_memo-area");
        $(".js_block-right").addClass("w50");
    }
});

function cmn110DropBan() {
    return $('body').find('div').hasClass('ui-widget-overlay');
}