var closeLoadingFlg = true;

//処理リトライ用
var retryFunction;
var eventFlg = false;

//メール一覧 メール情報
var mailListData;
var mailListMaxPage;

//検索結果一覧 メール情報
var searchListData;
var searchListMaxPage;

//ディレクトリ、ラベルツリー情報
var treeData;

//ラベルツリー 表示FLG
var labelTreeViewFlg;

//ユーザ情報 メールアドレス一覧
var shainMailList;

//アドレス帳情報 メールアドレス一覧
var addressMailList;

function buttonPush(cmd) {
    if (cmd == "exportPdf" || cmd == "exportMail") {
        document.getElementById('wml010Export').src = "../webmail/wml010.do"
            + '?CMD=' + cmd
            + '&wmlViewAccount=' + document.forms[0].wmlViewAccount.value
            + '&wml010selectMessageNum=' + document.forms[0].wml010selectMessageNum.value;
    } else {
        setCMD(cmd);
        wml010Submit();
        return false;
    }
}

function onTitleLinkSubmit(fid, order) {
    setCMD('sortDetail');
    setParamValue('wml010sortKey', fid);
    setParamValue('wml010order', order);
    wml010Submit();
    return false;
}

function moveMessage(sid) {
    setCMD('moveMessage');
    document.forms[0].wml010selectMessageNum.value = sid;
    wml010Submit();
    return false;
}

function getNewMail() {
    //新着メールを確認(メール受信)
    document.forms[0].CMD.value='getNewMail';
    loadingPop(msglist_wml010['cmn.loading']);
    var formData = getFormData($('#webmailForm'));
    $.ajax({
        async: true,
        url:"../webmail/wml010.do",
        type: "post",
        data:formData
    }).done(function( data ) {

        //メール一覧を再表示
        document.forms[0].CMD.value='getMailList';
        getMailData();

    }).fail(function(data){
        closeloadingPop();
    });
}

/* 新規作成フラグ */
var mail_create_flg = false;
/* 新規作成確認フラグ  */
var mail_create_kakunin_flg = false;

/* メール確認フラグ  */
var mail_kakunin_flg = false;
/* メール確認フラグ(検索)  */
var mail_search_kakunin_flg = false;
/* メール詳細SID */
var mail_kakunin_sid = 0;
/* メール詳細SID(検索) */
var mail_search_kakunin_sid = 0;

/* 確認メール 区分  */
var mail_kakunin_kbn = 0;
/* メール検索フラグ  */
var mail_search_list_flg = false;
/* テンポラリディレクトリ削除フラグ  */
var tmp_del_flg = true;
/* 選択中タブ 一覧 or 検索 */
var now_sel_tab = 'mail_list_tab';
/* 左メニューラベル開閉フラグ */
var left_menu_label_opnkbn = true;
/* 宛先 表示区分 0:スクロール表示 1:全て表示*/
var dsp_to_kbn = 0;
/* 宛先TO 表示区分 0:スクロール表示 1:全て表示*/
var dsp_cc_kbn = 0;
/* 宛先BCC 表示区分 0:スクロール表示 1:全て表示*/
var dsp_bcc_kbn = 0;
/* 受信メール 宛先 表示区分 0:スクロール表示 1:全て表示*/
var jmail_dsp_to_kbn = 0;
/* 受信メール 宛先TO 表示区分 0:スクロール表示 1:全て表示*/
var jmail_dsp_cc_kbn = 0;
/* 確認メッセージ取得通信中フラグ */
var load_kakunin_message_flg = false;

/* メッセージナンバー(保持) */
var mailSvSendNum = 0;
/* 差出人(保持用) */
var mailSvFrom = "";
/* 宛先(保持用) */
var mailSvTo = "";
/* CC(保持用) */
var mailSvCc = "";
/* BCC(保持用) */
var mailSvBcc = "";
/* 件名(保持用) */
var mailSvSubject = "";
/* 添付(保持用) */
var mailSvTenpuList = [];
/* 本文(保持用) */
var mailSvContent = "";
/* タイマーフラグ */
var auto_save_timer_flg = false;

/* 取得する添付ファイルリスト */
var tempuList = [];

function changeHelpParam(mode, submode) {

    if (submode == 0) {
        $('input:hidden[name=helpPrm]').val(mode);
    } else if (submode == 1) {
        if (!mail_create_kakunin_flg) {
            $('input:hidden[name=helpPrm]').val(6);
        } else {
            $('input:hidden[name=helpPrm]').val('6kn');
        }
    } else if (submode == 2) {
        if (mail_kakunin_kbn == 0) {
            //受信
            $('input:hidden[name=helpPrm]').val(8);
        } else if (mail_kakunin_kbn == 1) {
            //送信
            $('input:hidden[name=helpPrm]').val(9);
        } else if (mail_kakunin_kbn == 2) {
            //ゴミ箱 受信
            $('input:hidden[name=helpPrm]').val(10);
        } else if (mail_kakunin_kbn == 3) {
            //ゴミ箱 送信
            $('input:hidden[name=helpPrm]').val(11);
        } else if (mail_kakunin_kbn == 4) {
            //ゴミ箱 草稿
            $('input:hidden[name=helpPrm]').val(12);
        } else {
            $('input:hidden[name=helpPrm]').val(8);
        }
    } else if (submode == 3) {
        $('input:hidden[name=helpPrm]').val(7);
    }

}

$(function() {
    document.getElementById("head_menu_empty_trash_btn").addEventListener("click", function (e) {
        emptyTrash();
        e.stopPropagation();
    });

    $(document).on("mouseover", ".js_mailTooltip", function(e){

        $("#ttp").remove();

        var tooltipContent = "";
        if ($(this).children("span.tooltips_from").html() != "") {
            tooltipContent += "<div class=\"display_flex\"><div class=\"pl5 wp55\">差出人:</div><div class=\"pr5\">" + $(this).children("span.tooltips_from").html() + "</div></div>";
        }
        if ($(this).children("span.tooltips_to").html() != "") {
            tooltipContent += "<div class=\"display_flex\"><div class=\"pl5 wp55\">宛先:</div><div class=\"pr5\">" + $(this).children("span.tooltips_to").html() + "</div></div>";
        }
        if ($(this).children("span.tooltips_cc").html() != "") {
            tooltipContent += "<div class=\"display_flex\"><div class=\"pl5 wp55\">CC:</div><div class=\"pr5\">" + $(this).children("span.tooltips_cc").html() + "</div></div>";
        }
        if ($(this).children("span.tooltips_bcc").html() != "") {
            tooltipContent += "<div class=\"display_flex\"><div class=\"pl5 wp55\">BCC:</div><div class=\"pr5\">" + $(this).children("span.tooltips_bcc").html() + "</div></div>";
        }
        if (!tooltipContent) {
            return;
        }
        tooltipContent = "<div id=\"ttp\">" + tooltipContent + "</div>";
        $("#mailTooltip_area").append(tooltipContent);

        var topPosition = (e.pageY) - 10;
        var tipHeight = $("#ttp").height();
        var pageHeight = document.documentElement.offsetHeight;
        if (pageHeight - 15 < tipHeight + topPosition) {
            $("#ttp")
            .css("max-height", ((pageHeight - topPosition) - 15) + "px")
            .css("overflow", "hidden");
        }
        $("#ttp")
        .css("position","absolute")
        .css("top",(e.pageY) + -10 + "px")
        .css("left",(e.pageX) + 20 + "px")
        .removeClass('display_none')
        .css("filter","alpha(opacity=85)")
        .fadeIn("fast");
    }).on("mousemove", ".js_mailTooltip", function(e){
        $("#ttp")
        .css("top",(e.pageY) + -10 + "px")
        .css("left",(e.pageX) + 20 + "px");
    }).on("mouseout", ".js_mailTooltip", function(){
        $("#ttp").remove();
    });

    /* 初期データ取得 */
    setCMD('getMailList');
    loadingPop(msglist_wml010['cmn.loading']);
    getMailData(true);
    tinyMceInit();

    /* 詳細検索 検索条件エリア 表示設定 */
    setParamValue('detailSearchFlg', '1');
    changeSearchDateType();

    /* 再読み込み */
    $(document).on("click", "#btn_reload", function(){
        changeTab($('#mail_list_tab'));
        clearKakuninValue();
        loadingPop(msglist_wml010['cmn.loading']);
        reloadData();
    });

    $(document).on("change", ".js_tableTopCheck-header", function(){
        var chkFlg;
        if ($(this).children('input[name=allCheck]:checked').length > 0) {
            chkFlg = true;
        } else {
            chkFlg = false;
        }
        var searchFlg = $(this).parents('#mail_search_list_draw_table').length != 0;
        changeAllListCheck(chkFlg, searchFlg);
    });

    /* 左メニュー ラベル */
    $(document).on("click", ".js_changeLabelDir", function(){
        setCMD('getMailList');
        setDirectory(0);
        setDirectoryType(0);
        setLabel( $(this).data('labelid'));
        setViewDelMail(1);
        setInboxSelectPage(1);
        setInboxSort(0, 0);
        document.forms[0].wml010selectPage.value = 1;
        $('input[name="wml010pageTop"]').val(1);
        $('input[name="wml010pageBottom"]').val(1);

        var labelTxt = $(this).children('.side-folderText').next().val();
        if (labelTxt.length > 9) {
            labelTxt = labelTxt.substring(0, 8) + "…";
        }
        $("#mail_list_tab").html(labelTxt);

        changeTab($('#mail_list_tab'));

        //一覧 ボタン表示を元に戻す
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_label_add_btn2").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn2").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $('#head_menu_list_dust_btn, #head_menu_list_dust_btn2').removeClass('display_none');
        $('#head_menu_list_del_btn, #head_menu_list_del_btn2').addClass('display_none');

        clearKakuninValue();
        loadingPop(msglist_wml010['cmn.loading']);
        getMailData(false, false, true);
    });

    /* ページング next */
    $(document).on("click", ".js_paging-mail .js_paging_nextBtn", function(){
        //表示ページ設定
        var page = getSelectPage(false);
        page++;
        document.forms[0].wml010pageTop.value = page;
        document.forms[0].CMD.value='getMailList';
        loadingPop(msglist_wml010['cmn.loading']);
        getMailData();
    });

    /* ページング prev */
    $(document).on("click", ".js_paging-mail .js_paging_prevBtn", function(){
        //表示ページ設定
        var page = getSelectPage(false);
        page--;
        if (page <= 0) {
            page = 1;
        }
        document.forms[0].wml010pageTop.value = page;

        document.forms[0].CMD.value='getMailList';
        loadingPop(msglist_wml010['cmn.loading']);
        getMailData();
    });

    /* ページング コンボ変更  上*/
    $(document).on("change", ".js_paging-mail .js_paging_combo", function(){
        document.forms[0].CMD.value='getMailList';
        var sel = $(this).val();
        document.forms[0].wml010selectPage.value=sel;
        document.forms[0].wml010pageTop.value = sel;
        loadingPop(msglist_wml010['cmn.loading']);
        getMailData();
    });


    /* アカウントエリア クリック */
    $(document).on("click", "#wml_account_area", function(){
        $("#wml_account_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });

    /* ユーザ情報エリア クリック */
    $(document).on("click", "#wml_shain_area", function(){
        $("#wml_shain_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });

    /* アドレス帳エリア クリック */
    $(document).on("click", "#wml_addressbook_area", function(){
        $("#wml_addressbook_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });

    /* 送信先リストエリア クリック */
    $(document).on("click", "#wml_destlist_area", function(){
        $("#wml_destlist_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });


    /* ラベル クリック */
    $(document).on("click", "#lable_top", function(){
        $(this).prev().prev().click();

        if (left_menu_label_opnkbn) {
            left_menu_label_opnkbn = false;
        } else {
            left_menu_label_opnkbn = true;
        }
    });


    /* プラス、マイナス要素クリック */
    $(document).on("click", ".js_lineToggle", function(){

        if (labelTreeViewFlg) {
            $(this).parent().next().toggle(0);
        } else {
            $(this).parent().next().toggle('fast');
        }

        if ($(this).hasClass("mail_left_line_plus")) {
            $(this).removeClass("mail_left_line_plus");
            $(this).addClass("mail_left_line_minus");
        } else if ($(this).hasClass("mail_left_line_plus_top")) {
            $(this).removeClass("mail_left_line_plus_top");
            $(this).addClass("mail_left_line_minus_top");
        } else if ($(this).hasClass("side_folderImg-linePlusBottom")) {
            $(this).removeClass("side_folderImg-linePlusBottom");
            $(this).addClass("side_folderImg-lineMinusBottom");
        } else if ($(this).hasClass("mail_left_line_minus")) {
            $(this).removeClass("mail_left_line_minus");
            $(this).addClass("mail_left_line_plus");
        } else if ($(this).hasClass("mail_left_line_minus_top")) {
            $(this).removeClass("mail_left_line_minus_top");
            $(this).addClass("mail_left_line_plus_top");
        } else if ($(this).hasClass("side_folderImg-lineMinusBottom")) {
            $(this).removeClass("side_folderImg-lineMinusBottom");
            $(this).addClass("side_folderImg-linePlusBottom");
        }

    });

    /* 差出人 件名 日時  click */
    $(document).on("click", '.js_mailListHeadSel', function(){
        if (now_sel_tab == 'mail_search_list_tab') {
            onSearchTitleLinkClick($(this).data('sortkey'),$(this).data('orderkey'));
            return;
        }
        onTitleLinkClick($(this).data('sortkey'),$(this).data('orderkey'));
    });

    /* メール 行  hover */
    $(this).tableTop().initRowHover();


    /* メール  click */
    $(document).on("click", '.js_mailContent', function(){

        var searchFlg = false;
        var dirType = $("input[name=wml010viewDirectoryType]").val();

        //詳細検索リスト内の場合
        if ($(this).parents('#mail_search_list_draw_table').length != 0 ) {
            searchFlg = true;
        }

        var mailNum = $(this).parent().data('mailnum');
        var mailKbn = -1;

//        getDetail(mailNum, mailKbn, searchFlg, true, 0)
        getDetail(mailNum, mailKbn, searchFlg, false, 0);

    });

    /* メール確認 前へ  click */
    $(document).on("click", '#head_menu_prev_btn, #head_menu_prev_btn2', function(){


        var dirTypeTmp = $("input[name=wml010viewDirectoryType]").val();

        //「前へ」が押されたら詳細メールのモードに戻して詳細メールのSIDを取得する
        getSidEscape();

        var dirSid = $("input[name=wml010viewDirectory]").val();
        var mailNum = $('input:hidden[name=wml010selectMessageNum]').val();
        var searchFlg = (now_sel_tab == 'mail_search_list_tab');

        getDetail(mailNum, '-1', searchFlg, false, 1);

        //前のメールの詳細を取得したらモードを戻す
        document.forms[0].wml010viewDirectory.value = dirSid;
    });

    /* メール確認 次へ  click */
    $(document).on("click", '#head_menu_next_btn, #head_menu_next_btn2', function(){

        //「次へ」が押されたら詳細メールのモードに戻して詳細メールのSIDを取得する
        var dirTypeTmp = $("input[name=wml010viewDirectoryType]").val();
        getSidEscape()

        var procMode = $("input[name=wml010viewDirectory]").val();
        var mailNum = $('input:hidden[name=wml010selectMessageNum]').val();
        var searchFlg = (now_sel_tab == 'mail_search_list_tab');


        getDetail(mailNum, '-1', searchFlg, false, 2);
    });

    /* メール一覧  eml出力 */
    $(document).on("click", '#head_menu_list_eml_btn, #head_menu_list_eml_btn2', function(){
        emlListMail(false);
    });

    /* メール一覧  既読にする */
    $(document).on("click", '#head_menu_list_kidoku_btn, #head_menu_list_kidoku_btn2', function(){
        changeListMailReaded(0, false);
    });

    /* メール一覧 未読にする */
    $(document).on("click", '#head_menu_list_midoku_btn, #head_menu_list_midoku_btn2', function(){
        changeListMailReaded(1, false);
    });

    /* メール一覧  保管ボタン */
    $(document).on("click", '#head_menu_list_hokan_btn, #head_menu_list_hokan_btn2', function(){
        hokanListMail(false);
    });

    /* メール一覧  移動ボタン */
    $(document).on("click", '#head_menu_list_idou_btn, #head_menu_list_idou_btn2', function(){
        idouListMail(false);
    });

    /* メール一覧  削除ボタン */
    $(document).on("click", '#head_menu_list_del_btn, #head_menu_list_dust_btn, #head_menu_list_del_btn2, #head_menu_list_dust_btn2', function(){
        deleteListMail();
    });

    /* メール一覧  ラベル追加ボタン */
    $(document).on("click", '#head_menu_list_label_add_btn, #head_menu_list_label_add_btn2', function(){
        addLabelListMail(false);
    });

    /* メール一覧  ラベル削除ボタン */
    $(document).on("click", '#head_menu_list_label_del_btn, #head_menu_list_label_del_btn2', function(){
        deleteLabelListMail(false);
    });


    /* メール作成ボタン click */
    $(document).on("click", '.js_headMenuAddBtn', function(){
        createNewMail();
        createTempArea();
    });


    /*タブ閉じる hover*/
    $('.js_tabHeader_closeBtn')
        .mouseenter(function (e) {
            $(this).attr('src', '../smail/images/classic/icon_del_on.png');
        })
        .mouseleave(function (e) {
            $(this).attr('src', '../smail/images/classic/icon_del.png');
        });

    /* 削除ボタンフラグ */
    var del_btn_mini_flg = false;

    /* 新規作成 削除  click */
    $(document).on("click", '.js_mailDelBtnMini', function(){
        delNewCreateMail($(this), 0, -1, true);
    });

    /* メール検索 閉じる  click */
    $(document).on("click", '.js_searchMailCloseBtnMini', function(){

        del_btn_mini_flg = true;
        $(this).parents('li').eq(0).prev().remove();
        $(this).parents('li').eq(0).remove();

        //選択中メッセージ番号にメール一覧タブ内で開いているメッセージ番号を設定
        $('input:hidden[name=wml010selectMessageNum]').val(mail_kakunin_sid);
        $('input:hidden[name=selectMailNumEsc]').val(mail_kakunin_sid);
        $('input:hidden[name=editMailNumEsc]').val(mail_kakunin_sid);

        //メール詳細の表示を「メール一覧タブで表示しているメール情報」に切り替える
        if (mail_kakunin_sid && mail_kakunin_sid > 0) {
            getDetail(mail_kakunin_sid, '-1', false, false, 0);
        }

        changeTab($('#mail_list_tab'), true);
        clearSearchKakuninValue();

        mail_search_list_flg = false;

    });


    /* 上部タブ click */
    $(document).on("click", '.js_mailAreaHead.tabHeader_tab-off, .js_mailAreaHead2.tabHeader_tab-off', function(){

        if (!del_btn_mini_flg) {
            changeTab($(this), true);
        } else {
            del_btn_mini_flg = false;
            if ($(this).attr('id') == 'mail_list_tab') {
                changeTab($(this), true);
            }
        }

        if ($(this).attr('id') == 'mail_search_list_tab' && mail_search_kakunin_flg) {
            getDetail(mail_search_kakunin_sid, -1, true, false, 0);
        } else if ($(this).attr('id') == 'mail_list_tab' && mail_kakunin_flg) {
            getDetail(mail_kakunin_sid, -1, false, false, 0);
        }
    });


    /* 添付ファイルボタン マークボタン  hover */
    $('.mail_create_bttm')
        .mouseenter(function (e) {
            $(this).addClass("mail_create_bottom_sel_on");
        })
        .mouseleave(function (e) {
            $(this).removeClass("mail_create_bottom_sel_on");
        });

    /* 添付ファイルボタン click */
    $(document).on("click", '.mail_create_bottom_sel_tmp', function(){
        $('#mail_create_bottom_mark_area').addClass('display_none');
        $('#mail_create_bottom_tmp_area').removeClass('display_none');
        $('.mail_create_bttm').removeClass('mail_create_bottom_select');
        $(this).addClass('mail_create_bottom_select');
    });

    /* マークボタン click */
    $(document).on("click", '.mail_create_bottom_sel_mark', function(){
        $('#mail_create_bottom_mark_area').removeClass('display_none');
        $('#mail_create_bottom_tmp_area').addClass('display_none');
        $('.mail_create_bttm').removeClass('mail_create_bottom_select');
        $(this).addClass('mail_create_bottom_select');
    });

    /* テキスト形式 hover */
    $('.mail_create_bottom_sel_text_form')
        .mouseenter(function (e) {
            $(this).addClass("mail_create_bottom_sel_text_form_on");
        })
        .mouseleave(function (e) {
            $(this).removeClass("mail_create_bottom_sel_text_form_on");
        });

    /* テキスト形式 click */
    $(document).on("click", '.js_mailCreateBottomSelTextForm', function(){
        scrollBodyTop();
        changeSendMailType(0);
    });

    /* アカウントクリック */
    $(document).on("click", '.js_side_accountName', function(){
        var accountId = $(this).attr('data-accountid');
        changeAccount(accountId);
    });

    /* ディレクトリ 右クリック */
    $('.js_menu_folder').contextMenu('context_menu1',
            {
        bindings: {
            'all_read': function(t) {
                contextAllRead(0, getParamValue(t.id + "_id"));
            },
            'all_no_read': function(t) {
                contextAllRead(1, getParamValue(t.id + "_id"));
            }
        }
    });


    //グループコンボ変更
    $(document).on("change", "#wml010ChangeGrp", function(){
        redrawShainList();
    });

    //グループコンボ変更
    $(document).on("click", "#fakeGrpButton", function(){
        $("#wml010ChangeGrp").change();
    });


    //次へボタン
    $(document).on("click", '#head_menu_next', function(){
        buttonPush('next');
    });

    //前へボタン
    $(document).on("click", '#head_menu_prev', function(){
        buttonPush('next');
    });


    //pdf出力リンク
    $(document).on("click", '.js_mailCheckBodyBottomPdf', function(){
        var selectedSid = document.forms[0].selectMailNumEsc.value;
        var editSid = document.forms[0].editMailNumEsc.value;
        var dirTypeTmp = $("input[name=wml010viewDirectoryType]").val();

        //草稿モード時に詳細メールのPDF出力が押されたときは一時的にモードを戻す
        if (document.forms[0].dirTypeEsc.value != 2) {
            document.forms[0].wml010viewDirectoryType.value = document.forms[0].dirTypeEsc.value;
        }

        if (selectedSid != 0) {
            editSid = selectedSid;
        } else if (editSid != 0) {
            selectedSid = editSid;
        }

        //PDF出力する際は退避SIDを利用する
        if (selectedSid != 0 && editSid != 0) {
            document.forms[0].wml010selectMessageNum.value = selectedSid;
        }

        buttonPush('exportPdf');
        document.forms[0].wml010viewDirectoryType.value = dirTypeTmp;
    });

    //eml出力リンク
    $(document).on("click", '.js_mailCheckBodyBottomEml', function(){

        var selectedSid = document.forms[0].selectMailNumEsc.value;
        var editSid = document.forms[0].editMailNumEsc.value;
        var dirTypeTmp = $("input[name=wml010viewDirectoryType]").val();

        //草稿モード時に詳細メールの出力が押されたときは一時的にモードを戻す
        if (document.forms[0].dirTypeEsc.value != 2) {
            document.forms[0].wml010viewDirectoryType.value = document.forms[0].dirTypeEsc.value;
        }


        if (selectedSid != 0) {
            editSid = selectedSid;
        } else if (editSid != 0) {
            selectedSid = editSid;
        }

        //eml出力する際は退避SIDを利用する
        if (selectedSid != 0 && editSid != 0) {
            document.forms[0].wml010selectMessageNum.value = selectedSid;
        }

        buttonPush('exportMail');
        document.forms[0].wml010viewDirectoryType.value = dirTypeTmp;
    });

    //新規作成 送信ボタン
    $(document).on("click", '#head_menu_send_btn', function(){
        setDateParam();
        doMailSend();
    });

    //新規作成 添付ボタン
    $(document).on("click", '#head_menu_sendtemp_btn', function(){
        attachmentLoadFile('1');
    });

    //新規作成 草稿に保存ボタン
    $(document).on("click", '#head_menu_soko_btn', function(){
        setDateParam();
        doMailSoko();
    });

    //新規作成 テンプレートボタン
    $(document).on("click", '#head_menu_template_btn', function(){
        mailTemplatePop();
    });

    //メールテンプレート選択(ポップアップ時)
    $(document).on("click", '.js_templateSelTxt2', function(){
        var selTemplateId = $(this).data('templateid');
        setMailTemplate(selTemplateId);
    });

    //メールテンプレート ツールチップ(ポップアップ時)
    $(document).on("mouseover", ".js_templateSelTxt3", function(e){
        var txtVal = $(this).children("span.tooltips").html();
        txtVal = txtVal.replace(/\r\n/g, "<br />");
        txtVal = txtVal.replace(/(\n|\r)/g, "<br />");

        $("#tooltip_area").append("<div id=\"ttp\">"+ (txtVal) +"</div>");
        $("#ttp")
        .css("position","absolute")
        .css("top",(e.pageY) + -10 + "px")
        .css("left",(e.pageX) + 20 + "px")
        .removeClass('display_none')
        .css("filter","alpha(opacity=85)")
        .fadeIn("fast");
    }).on("mousemove", ".js_templateSelTxt3", function(e){
        $("#ttp")
        .css("top",(e.pageY) + -10 + "px")
        .css("left",(e.pageX) + 20 + "px");
    }).on("mouseout", ".js_templateSelTxt3", function(){
        $("#ttp").remove();
    });

    //メール確認   削除ボタン
    $(document).on("click", '#head_menu_dust_btn, #head_menu_dust_btn2', function(){
        deleteOnceMail();
    });

    //メール確認   戻るボタン
    $(document).on("click", '#head_menu_back_btn, #head_menu_back_btn2', function(){
        closeMailDetail(1);
    });

    //メール確認   保管ボタン
    $(document).on("click", '#head_menu_strage_btn, #head_menu_strage_btn2', function(){
        hokanOnceMail();
    });

    //メール確認   移動ボタン
    $(document).on("click", '#head_menu_move_btn, #head_menu_move_btn2', function(){
        idouOnceMail();
    });

    //メール確認   編集ボタン
    $(document).on("click", '#head_menu_edit_btn, #head_menu_edit_btn2', function(){
        replyMail(4);
    });

    //メール確認   返信ボタン
    $(document).on("click", '#head_menu_replay_btn, #head_menu_replay_btn2', function(){
        replyMail(1);
    });

    //メール確認   全返信ボタン
    $(document).on("click", '#head_menu_all_replay_btn, #head_menu_all_replay_btn2', function(){
        replyMail(2);
    });

    //メール確認   転送ボタン
    $(document).on("click", '#head_menu_forward_btn, #head_menu_forward_btn2', function(){
        replyMail(3);
    });

    /* メール確認  共有ボタン */
    $(document).on("click", '#head_menu_share_btn, #head_menu_share_btn2', function(){
        shareMail();
    });

    /* メール確認  ラベル追加ボタン */
    $(document).on("click", '#head_menu_addlabel_btn, #head_menu_addlabel_btn2', function(){
        addLabelOnceMail(false);
    });

    /* メール確認  ラベル削除ボタン */
    $(document).on("click", '#head_menu_dellabel_btn, #head_menu_dellabel_btn2', function(){
        deleteLabelOnceMail(false);
    });

    //検索ボタン
    $(document).on("click", '#wml_search_btn', function(){
        searchResultLoadInit(0);
    });

    //検索結果一覧 前ページクリック
    $(document).on("click", '.js_paging-search .js_paging_prevBtn', function(){
        //表示ページ設定
        var page = getSelectPage(true);
        page--;
        if (page <= 0) {
            page = 1;
        }
        setParamValue('wml010searchPageTop', page);

        setCMD('detailSearch');
        loadingPop(msglist_wml010['cmn.loading']);
        getSearchData();
    });

    //検索結果一覧 次ページクリック
    $(document).on("click", '.js_paging-search .js_paging_nextBtn', function(){
        //表示ページ設定
        var page = getSelectPage(true);
        page++;
        setParamValue('wml010searchPageTop', page);

        setCMD('detailSearch');
        loadingPop(msglist_wml010['cmn.loading']);
        getSearchData();
    });

    /* 検索結果一覧 ページング コンボ変更  上*/
    $(document).on("change", ".js_paging-search .js_paging_combo", function(){
        document.forms[0].CMD.value='detailSearch';
        var page = $(this).val();
        setParamValue('wml010selectPage', page);
        document.forms[0].wml010searchPageTop.value = page;
        getSearchData();
    });


    /* 検索エリア サイズ変更*/
    $(document).on("click", ".js_searchHeadBtn", function(){
        $('.js_searchToggleArea').toggle();
    });

    /* 検索結果一覧  削除ボタン */
    $(document).on("click", '#head_menu_search_list_del_btn, #head_menu_search_list_dust_btn, #head_menu_search_list_del_btn2, #head_menu_search_list_dust_btn2', function(){
        deleteSearchListMail();
    });

    /* 検索結果一覧  保管ボタン */
    $(document).on("click", '#head_menu_search_list_strage_btn, #head_menu_search_list_strage_btn2', function(){
        hokanListMail(true);
    });

    /* 検索結果一覧  移動ボタン */
    $(document).on("click", '#head_menu_search_list_move_btn, #head_menu_search_list_move_btn2', function(){
        idouListMail(true);
    });

    /* 検索結果一覧  ラベル追加ボタン */
    $(document).on("click", '#head_menu_search_list_label_add_btn, #head_menu_search_list_label_add_btn2', function(){
        addLabelListMail(true);
    });

    /* 検索結果一覧  ラベル削除ボタン */
    $(document).on("click", '#head_menu_search_list_label_del_btn, #head_menu_search_list_label_del_btn2', function(){
        deleteLabelListMail(true);
    });
    /* 検索結果一覧  既読にする */
    $(document).on("click", '#head_menu_search_list_kidoku_btn, #head_menu_search_list_kidoku_btn2', function(){
        changeListMailReaded(0, true);
    });

    /* 検索結果一覧 未読にする */
    $(document).on("click", '#head_menu_search_list_midoku_btn, #head_menu_search_list_midoku_btn2', function(){
        changeListMailReaded(1, true);
    });

    /* 検索結果一覧  eml出力 */
    $(document).on("click", '#head_menu_search_list_eml_btn, #head_menu_search_list_eml_btn2', function(){
        emlListMail(true);
    });

    /* 受信メール確認画面 宛先CC 全て表示リンククリック */
    $(document).on("click", '#wml_kakunin_body .js_mailKakunin-expandable > .js_allOpnTo', function() {
        var expList = $(this).before();
        if (expList.is('.ofy_a')) {
            expList.removeClass('ofy_a');
            expList.removeClass('hp50');
            $(this).text(msglist_wml010['cmn.close']);
        } else {
            expList.addClass('ofy_a');
            expList.addClass('hp50');
            $(this).text(msglist_wml010['sml.218']);
        }

    });


    //差出人アカウント変更時処理
    $('#send_account_comb_box').change(function() {

        paramStr = 'CMD=changeSendAccount';
        paramStr += '&wmlViewAccount=' + getAccount();
        paramStr += '&wml010sendAccount=' + $("#send_account_comb_box").val();

        $.ajax({
            async: true,
            url:  "../webmail/wml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            document.getElementById('sendSignCombo').innerHTML = createSignCombo(data.sign);
            setTemplateList(data.template);
        }).fail(function(data){
            clearErrorMessage();
            alert(msglist_wml010["sml.212"]);
        });
        return;

    })

    //閉じるボタン(ショートメールからの共有時)
    $(document).on("click", '#shareClose', function(){
        //ダイアログを閉じる処理
        var tempDirIdShare = getParamValue('wml010smlShareTemp');
        var tempDirId = getParamValue('wml010tempDirId');
        paramStr = 'CMD=editTabClose&wmlViewAccount=' + getAccount();
        paramStr += '&wml010smlShareTemp='+tempDirIdShare;
        paramStr += '&wml010tempDirId='+tempDirId;
        $.ajax({
            async: false,
            url:  "../webmail/wml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                windowParentCloseEvent();
            }
        }).fail(function(data){
        });

    });

});

//メール新規作成
function createNewMail(toAddress) {
    if (mail_create_flg) {
        delKakuninPopup('newMail', 0);
    } else {
        //送信アカウントを現在のアカウントへ設定する
        $('#send_account_comb_box').val(getAccount());

        paramStr = 'CMD=createSendMail'
                    + '&wmlViewAccount=' + $("#account_comb_box").val();

        var formData = new FormData();
        formData.append("CMD", "createSendMail");
        formData.append("wmlViewAccount", $("#account_comb_box").val());

        //ショートメールからの呼び出し(共有)の場合
        if (getShareFlg() == 1 && getParamValue('wml010smlShareInit') != 1) {
            formData.append("wml010smlShareFlg", getParamValue("wml010smlShareFlg"));
            formData.append("wml010smlShareTitle", getParamValue("wml010smlShareTitle"));
            formData.append("wml010smlShareBody", getParamValue("wml010smlShareBody"));
            formData.append("wml010smlShareHtml", getParamValue("wml010smlShareHtml"));
            formData.append("wml010smlShareTemp", getParamValue("wml010smlShareTemp"));
        }

        //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
        //送信対象メッセージ番号を初期化
        $('input:hidden[name=wml010sendMessageNum]').val("");

        $.ajax({
            async: true,
            url:  "../webmail/wml010.do",
            type: "post",
            processData: false,
            contentType: false,
//            data: paramStr
            data: formData
        }).done(function( data ) {
            tmp_del_flg = false;
            openSendTab();
            setCreateMail(0, data);
            resetSid();
            //formの値を保持用にセット
            setSvMail();
            //タイマースタート
            startTimer();

            //初期設定アドレスが設定されている場合
            if (toAddress) {
                document.getElementsByName('wml010sendAddressTo')[0].value = toAddress;
            }
        }).fail(function(data){
            alert(msglist_wml010['sml.190']);
            resetSid();
        });

    }
}

//"新規作成"タブ表示
function openSendTab() {
    if (!mail_create_flg) {

        mail_create_kakunin_flg = false;
        changeHelpParam(1,1);
        delCreateKakuninArea();

        tmp_del_flg = true;

        $('#inputlength').html("0");
        $("#text_input").val('');

        resetAllDispLink();

        if ($('#text_html').hasClass("display_none")) {
            $('#text_text').click();
        }

        try {
            tinyMCE.get('html_input').setContent('');
        } catch (ae) {
        }
        $('#mail_list_tab').after('<li class="classic-display bor_b1 wp5 m0"></li>'
                + '<li id="mail_create_tab" class="js_mailAreaHead2 bgI_none tabHeader_tab-off pt5 pr10 pl10">'
                + '  <div class="mwp40 verAlignMid js_mailKakuninTabTitle">'
                + msglist_wml010['cmn.create.new']
                + '    <span class="iconBtn-noBorder ml10 hp20 js_mailDelBtnMini cursor_p">'
                + '      <img class="btn_classicImg-display js_tabHeader_closeBtn" src="../smail/images/classic/icon_del.png">'
                + '      <i class="btn_originalImg-display txt_m fs_16 cl_webIcon icon-close"></i>'
                + '    </span>'
                + '  </div>'
                + '</li>');
        mail_create_flg = true;
        changeTab($('#mail_create_tab'));
        changeSendMailType(1);

    } else {
        $('#mail_create_tab').click();
    }

    wmlEditorBeforeUnloadManager.on();
}

//検索エリア ソート
function onSearchTitleLinkClick(fid, order) {
    setCMD('detailSearch');
    setParamValue('wml010searchSortKey', fid);
    setParamValue('wml010searchOrder', order);
    getSearchData();
}

//検索結果データ取得
function getSearchData(reloadFlg, changeTabFlg, detailKbn) {

    loadingPop(msglist_wml010['cmn.loading']);

    //ページング情報を設定
    var page =  getSelectPage(true);
    setParamValue('wml010selectPage', page);

    //エラー削除
    $('.js_errorMsgStr').remove();

    //フォームデータ成形
    var formData = getFormData($('#webmailForm'));
    var readSearchListData = false;

    //データ取得
    $.ajax({
        async: true,
        url:"../webmail/wml010.do",
        type: "post",
        data:formData
    }).done(function( data ) {
        clearErrorMessage();

        //検索結果一覧(一覧・ページング)の初期化
        clearSearchListArea();

        if (data["errors"] == 0) {
            readSearchListData = true;
            try {
                if (!mail_search_list_flg) {
                    $('#mail_list_tab').after('<li class="classic-display bor_b1 wp5 m0"></li>'
                            + '<li id="mail_search_list_tab" class="tabHeader_tab-off bgI_none js_mailAreaHead2  pt5 pr10 pl10" >'
                            + '  <div class="mwp40 verAlignMid">'
                            + msglist_wml010['cmn.search.result']
                            + '    <span class="iconBtn-noBorder ml10 hp20 js_searchMailCloseBtnMini cursor_p">'
                            + '      <img class="btn_classicImg-display js_tabHeader_closeBtn " src="../smail/images/classic/icon_del.png">'
                            + '      <i class="btn_originalImg-display txt_m fs_16 cl_webIcon icon-close"></i>'
                            + '    </span>'
                            + '  </div>'
                            + '</li>');

                    $('.js_mailListArea').addClass('display_none');
                    $('.js_mailCreateArea').addClass('display_none');
                    $('.js_mailCreateKakuninArea').addClass('display_none');
                    $('.js_mailKakuninArea').addClass('display_none');
                    $('.js_mailSearchListArea').removeClass('display_none');

                    mail_search_list_flg = true;
                    changeTab($('#mail_search_list_tab'));
                    clearSearchKakuninValue();

                } else {
                    if (reloadFlg == true
                    && document.forms[0].CMD.value != 'getLabelData') {
                        if (changeTabFlg != false) {
                            //$('#mail_search_list_tab').click();
                            clearSearchKakuninValue();
                            changeTab($('#mail_search_list_tab'));
                        }
                    }
                }

                //html出力
                var listHtml = createMailListHtml(data, true);

                //検索結果一覧の表示
                if (data.messages == null || data.messages.length == 0) { //検索結果 0件

                    //メール一覧表示
                    $('#mail_search_list_draw_table').append(listHtml);
                    //ヘッダー部分tableTop設定の初期化
                    $('#mail_search_list_draw_table th').tableTop().initHeader();

                } else if (data.messages != null && data.messages.length > 0) { //検索結果 1件以上

                    //検索結果一覧 メール情報を保持
                    searchListData = data.messages;
                    searchListMaxPage = data.maxPage;

                    //hidden項目設定
                    if (data.page > 0) {
                        $('input:hidden[name=wml010searchPageTop]').val(data.page);
                        $('input:hidden[name=wml010searchPageBottom]').val(data.page);
                    } else {
                        $('input:hidden[name=wml010searchPageTop]').val(1);
                        $('input:hidden[name=wml010searchPageBottom]').val(1);
                    }

                    //メール一覧表示
                    $('#mail_search_list_draw_table').append(listHtml);

                    //ヘッダー部分tableTop設定の初期化
                    $('#mail_search_list_draw_table th').tableTop().initHeader();

                    //ページ表示設定
                    var maxPage =  data.maxPage;
                    if (maxPage > 1) {
                        //ページング表示

                        $('.js_mailSearchListArea .js_paging_combo').children().remove();
                        var pageStr = '';
                        for (p = 1; p <= maxPage; p++) {
                            var pageSelected = '';
                            if (data.page == p) {
                                pageSelected = ' selected';
                            }

                            pageStr += '<option value="' + p + '"' + pageSelected + '>' + p + ' / ' + maxPage + '</option>';
                        }
                        $('.js_mailSearchListArea .js_paging_combo').append(pageStr);
                        $('.js_mailSearchListArea .js_paging').removeClass('display_none');



                        if (data.page > 1) {
                            $('.js_mailSearchListArea .js_paging_combo').val(data.page);
                        } else {
                            $('.js_mailSearchListArea .js_paging_combo').val(1);
                        }
                    }

                    //フォルダ、ラベル再描画
                    resetTreeArea(false);

                    //ディスク容量設定
                    writeAccountDiskData(data);

                    //検索結果一覧(メール行 右クリック時処理
                    $('#mail_search_list_draw_table .js_mailContent-line').contextMenu('context_menu2',
                            {
                        bindings: {
                            'mail_line_reply': function(t) {
                                //返信
                                doReplyListMail(1, $(t).data('mailnum'), 0);
                            },
                            'mail_line_allreply': function(t) {
                                //全て返信
                                doReplyListMail(2, $(t).data('mailnum'), 0);
                            },
                            'mail_line_forward': function(t) {
                                //転送
                                doReplyListMail(3, $(t).data('mailnum'), 0);
                            },
                            'mail_line_delete': function(t) {
                                //削除
                                var selectSidList = new Array(0);
                                selectSidList[0] = $(t).data('mailnum');
                                loadingPop(msglist_wml010['cmn.loading']);
                                doRequestMailList('dustMail', msglist_wml010["wml.failed.changemail"],
                                                true, true,
                                                selectSidList,
                                                false);

                            },
                            'mail_no_read': function(t) {
                                //未読にする
                                contextRead(1, t, true);
                            },
                            'mail_read': function(t) {
                                //既読にする
                                contextRead(0, t, true);
                            }
                        }
                    });

                    //メール詳細 前へボタン or 次へボタンクリック時はメール詳細を表示
                    if (detailKbn) {
                        if (detailKbn == 1) {
                            getDetail(searchListData[searchListData.length - 1].XID, -1, true, false, 0);
                        } else if (detailKbn == 2) {
                            getDetail(searchListData[0].XID, -1, true, false, 0);
                        }
                    }
                }

            } catch (ae) {
                alert(msglist_wml010["sml.192"] + ae);
            } finally {
                closeloadingPop();
            }
        } else {
            closeloadingPop();
            setErrorMessage(data.errorMessage);
        }

        if (readSearchListData == false) {
            searchListData = null;
            searchListMaxPage = 1;
        }

    }).fail(function(data) {
        //検索結果一覧(一覧・ページング)の初期化
        clearSearchListArea();

        searchListData = null;
        searchListMaxPage = 1;

        closeloadingPop();
        alert(msglist_wml010["sml.192"]);
    });
}

//検索結果一覧表示領域(一覧・ページング)の初期化
function clearSearchListArea() {
    //一覧BODY削除
    $('#mail_search_list_draw_table').children().remove();

    //ページング非表示
    $('.js_mailSearchListArea .js_paging_combo').children().remove();
    $('.js_mailSearchListArea .js_paging').addClass('display_none');

}

function deleteSearchListMail() {
    requestMailList('dustMail', msglist_wml010["wml.failed.changemail"], true);
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

function changeTab(elm, detailFlg) {
    $('.js_mailAreaHead').removeClass('tabHeader_tab-on');
    $('.js_mailAreaHead2').removeClass('bgC_header2');
    $('.js_mailAreaHead').addClass('tabHeader_tab-off');
    $('.js_mailAreaHead2').addClass('tabHeader_tab-off');

    elm.removeClass('tabHeader_tab-off');
    elm.addClass('tabHeader_tab-on');
    elm.addClass('bgC_header2');

    changeTabContents(elm.attr('id'), detailFlg);
}

function changeTabContents(contentsID, detailFlg) {

    if (contentsID == 'mail_list_tab') {
        //メール一覧タブ
        $('.js_mailCreateArea').addClass('display_none');
        $('.js_mailCreateKakuninArea').addClass('display_none');
        $('.js_mailKakuninArea').addClass('display_none');
        $('.js_mailSearchListArea').addClass('display_none');
        $('.js_mailListArea').removeClass('display_none');
        $('.js_tabHeader_serchSpace').removeClass('display_none');
        $('#search_area_table').addClass('display_none');
        now_sel_tab = 'mail_list_tab';

        //メール確認を開いていた場合
        if (detailFlg && mail_kakunin_flg) {
            $('.js_mailListArea').addClass('display_none');
            $('.js_mailSearchListArea').addClass('display_none');
            $('.js_mailCreateArea').addClass('display_none');
            $('.js_mailCreateKakuninArea').addClass('display_none');
            $('.js_mailKakuninArea').removeClass('display_none');
            $('.js_tabHeader_serchSpace').removeClass('display_none');
        } else {
            //メール詳細を閉じる場合、表示対象メールパラメータを初期化
            clearKakuninValue();
        }

    } else if (contentsID == 'mail_create_tab') {
        //新規作成タブ
        $('.js_mailListArea').addClass('display_none');
        $('.js_mailKakuninArea').addClass('display_none');
        $('.js_mailSearchListArea').addClass('display_none');
        $('#search_area_table').addClass('display_none');
        $('.js_tabHeader_serchSpace').removeClass('display_none');

        if (mail_create_kakunin_flg) {
            $('.js_mailCreateKakuninArea').removeClass('display_none');
            $('.js_mailCreateArea').addClass('display_none');
        } else {
            $('.js_mailCreateKakuninArea').addClass('display_none');
            $('.js_mailCreateArea').removeClass('display_none');
        }

    } else if (contentsID == 'mail_kakunin_tab') {
        //メール詳細
        $('.js_mailListArea').addClass('display_none');
        $('.js_mailSearchListArea').addClass('display_none');
        $('.js_mailCreateArea').addClass('display_none');
        $('.js_mailCreateKakuninArea').addClass('display_none');
        $('.js_mailKakuninArea').removeClass('display_none');
        $('.js_tabHeader_serchSpace').removeClass('display_none');
        $('#search_area_table').addClass('display_none');

    } else if (contentsID == 'mail_search_list_tab') {
        //検索結果タブ
        $('.js_mailListArea').addClass('display_none');
        $('.js_mailCreateArea').addClass('display_none');
        $('.js_mailCreateKakuninArea').addClass('display_none');
        $('.js_mailKakuninArea').addClass('display_none');
        $('.js_mailSearchListArea').removeClass('display_none');
        $('#search_area_table').removeClass('display_none');
        now_sel_tab = 'mail_search_list_tab';

    }
}

function delNewCreateMail(id, kbn, elm, detailFlg) {
    if (kbn == 0 || kbn == 2 || kbn == 3) {
        $('#delKakuninPop').dialog({
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
            buttons: [
                {
                  name:"DIALOG_OK_BUTTON",
                  text:msglist_wml010["cmn.ok"],
                  click: function() {
                    if (kbn == 2) {
                        var accountId = elm.attr('data-accountid');
                        resetParam();
                        $('select[name=wmlViewAccount]').val(accountId);
                        wmlEditorBeforeUnloadManager.onTemporary();
                        buttonPush();
                    } else if (kbn == 3) {
                        resetParam();
                        wmlEditorBeforeUnloadManager.onTemporary();
                        buttonPush();
                    } else {
                        deleteNewCreateMail(id, detailFlg)
                        $(this).dialog('close');
                        stopAutoSave();
                    }

                    $('#composeTempFile').empty();
                    $('#composeTempFile').addClass('display_none');
                    $('#wmlAttachmentIdArea').empty();

                  }
                },
                {
                    name:"DIALOG_CANCEL_BUTTON",
                    text:msglist_wml010["cmn.cancel"],
                    click: function() {
                        if (kbn == 3) {
                            $('select[name=wmlViewAccount]').val($('#wmlViewAccountSv').val());
                        }
                        openSendTab();
                        $(this).dialog('close');
                    }
                }
            ]
            ,open: function(event, ui) {
                document.getElementsByName('DIALOG_OK_BUTTON')[0].setAttribute("class","baseBtn");
                document.getElementsByName('DIALOG_OK_BUTTON')[0].innerHTML =
                    '<img class="btn_classicImg-display" src="../common/images/classic/icon_ok.png" alt="">'
                  + '<img class="btn_originalImg-display" src="../common/images/original/icon_check.png" alt="">'
                  + msglist_wml010["cmn.ok"];

                document.getElementsByName('DIALOG_CANCEL_BUTTON')[0].setAttribute("class","baseBtn");
                document.getElementsByName('DIALOG_CANCEL_BUTTON')[0].innerHTML =
                    '<img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="">'
                  + '<img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="">'
                  + msglist_wml010["cmn.cancel"];
                $('.ui-widget-overlay').css('position', 'fixed');
            },
            close: function() {
                $('.ui-widget-overlay').css('position', 'absolute');
            }
        });

    } else {
        deleteNewCreateMail(id, detailFlg);
        $('#composeTempFile').empty();
        $('#composeTempFile').addClass('display_none');
    }
}

function deleteNewCreateMail(id, detailFlg) {
    del_btn_mini_flg = true;
    $(id).parents('li').eq(0).prev().remove();
    $(id).parents('li').eq(0).remove();
    resetMailCreate();
    changeTab($('#mail_list_tab'), detailFlg);
    mail_create_flg = false;
    mail_create_kakunin_flg = false;
    changeHelpParam(1,1);
    delCreateKakuninArea();
    wmlEditorBeforeUnloadManager.off();

    setErrorMessage(null);

    dsp_to_kbn = 0;
    dsp_cc_kbn = 0;
    dsp_bcc_kbn = 0;
}

function closeMailDetail(reloadFlg) {
    del_btn_mini_flg = true;
    changeTab($('#' + now_sel_tab));

    if (now_sel_tab == 'mail_search_list_tab') {
        clearSearchKakuninValue();
    } else {
        clearKakuninValue();
    }

    if (reloadFlg != 1) {
        reloadData();
    }
};


var reloading_flg = false;
function reloadData(changeTabFlg) {
    if (!reloading_flg) {

        var dialodIsOpenDel = false;
        var dialodIsOpenLabelAdd = false;
        var dialodIsOpenLabelDel = false;
        if ($('#delMailMsgPop').attr('role')) {
            dialodIsOpenDel = $('#delMailMsgPop').dialog("isOpen");
        }
        if ($('#labelAddPop').attr('role')) {
            dialodIsOpenLabelAdd = $('#labelAddPop').dialog("isOpen");
        }
        if ($('#labelDelPop').attr('role')) {
            dialodIsOpenLabelDel = $('#labelDelPop').dialog("isOpen");
        }

        //確認メッセージロード中は更新しない
        if (load_kakunin_message_flg) {
            return;
        }
        //ダイアログが表示されていた場合は更新しない
        if (dialodIsOpenDel != true
                && dialodIsOpenLabelAdd != true
                && dialodIsOpenLabelDel != true
                && eventFlg != true) {
            document.forms[0].CMD.value='getMailList';
            getMailData();

            if(mail_search_list_flg) {
                document.forms[0].CMD.value='detailSearch';
                getSearchData(true, changeTabFlg);
            }
        }
    }

}

var html_input_flg = false;
function changeSendMailType(kbn, initFlg) {
    if (kbn != 0) {
        //ユーザのデフォルトの形式
        if (isEditorHtml() || initFlg) {
            //HTMLメール
            $("#text_input_area").removeClass('display_none');
            $("#html_input_area").addClass('display_none');
            $("#text_text").addClass('display_none');
            $("#text_html").removeClass('display_none');
        } else {
            //テキストメール
            $("#text_input_area").addClass('display_none');
            $("#html_input_area").removeClass('display_none');
            $("#text_text").removeClass('display_none');
            $("#text_html").addClass('display_none');
        }

    }

    if ($("#html_input_area").hasClass('display_none')) {
        $("#html_input_area").removeClass('display_none');
        $("#text_input_area").addClass('display_none');
        $("#text_count_area").removeClass('display_inline');
        $("#text_count_area").addClass('display_none');
    } else {
        $("#text_input_area").removeClass('display_none');
        $("#text_count_area").removeClass('display_none');
        $("#html_input_area").addClass('display_none');
        $("#text_count_area").addClass('display_inline');
        $("#text_count_area").removeClass('display_none');
    }

    if (!html_input_flg) {
        tinyMceInit();
        text_count_area
    }

    if ($("#text_html").hasClass('display_none')) {
        $("#text_text").addClass('display_none');
        $("#text_html").removeClass('display_none');
        setEditorTypeHtml(0);

        var htmlAreaStr = "";
        if (tinyMCE.get('html_input') != null) {
            htmlAreaStr = tinyMCE.activeEditor.getContent().replace(/<br \/>/gi, '\n').replace(/<\S[^><]*>/g, '');
        }
        if (htmlAreaStr != null && htmlAreaStr.length > 0 && htmlAreaStr != "\n") {
            htmlAreaStr = htmlDecode(htmlAreaStr);
            $("#text_input").val(htmlAreaStr);
            $('#inputlength').html(htmlAreaStr.length);
        }

    } else {
        $("#text_html").addClass('display_none');
        $("#text_text").removeClass('display_none');
        setEditorTypeHtml(1);
        setCopyTextAreaStr();
    }

    setContentInsertArea();
}

function setCopyTextAreaStr() {
    if ($("#text_input").val() != "" && $("#text_input").val() != null) {
        tinyMCE.get('html_input').setContent(textBr(htmlEscape($("#text_input").val())));
    }

}

function setTextHtmlAreaStr() {
    tinyMCE.get('html_input').setContent($('input:hidden[name=wml010sendContentHtml]').val());

}

function tinyMceInit() {
  var font  = "Andale Mono=Andale Mono, andale mono, monospace;Arial=Arial, arial, helvetica, sans-serif;Arial Black=Arial Black, arial black, sans-serif;";
    font += "Book Antiqua=Book Antiqua, book antiqua, palatino, serif;Comic Sans MS=Comic Sans MS, comic sans ms, sans-serif;";
    font += "Courier New=Courier New, courier new, courier, monospace;Georgia=Georgia, georgia, palatino, serif;Helvetica=Helvetica, helvetica, arial, sans-serif;";
    font += "Impact=Impact, impact, sans-serif;Σψµβολ=Σψµβολ, symbol;Tahoma=Tahoma, tahoma, arial, helvetica, sans-serif;Terminal=terminal, monaco, monospace;";
    font += "Times New Roman=Times New Roman, times new roman, times, serif;Trebuchet MS=Trebuchet MS, trebuchet ms, geneva, sans-serif;";
    font += "Verdana=Verdana, verdana, geneva, sans-serif;Webdings=Webdings, webdings;Wingdings=Wingdings,wingdings, zapf dingbats;";
    font += "メイリオ=メイリオ, Meiryo;明朝=ＭＳ Ｐ明朝,MS PMincho,ヒラギノ明朝 Pro W3,Hiragino Mincho Pro,serif;";
    font += "ゴシック=ＭＳ Ｐゴシック,MS PGothic,ヒラギノ角ゴ Pro W3,Hiragino Kaku Gothic Pro,sans-serif";
    var fontSize = "8pt 10pt デフォルト=11pt 12pt 14pt 18pt 24pt 36pt";
  tinyMCE.init({
    selector: '#html_input',
    plugins: [
      'advlist autolink link image lists charmap hr anchor pagebreak spellchecker',
      'searchreplace visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      'save table contextmenu directionality template paste textcolor preview colorpicker'
    ],
    menubar: false,
    toolbar1: 'undo redo | visualblocks | styleselect fontsizeselect fontselect bold italic strikethrough forecolor backcolor',
    toolbar2: 'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent table | link image media preview code addbodyfile',
    content_style: 'p {font-size: 11pt; font-family: "メイリオ";}',
    language: 'ja',
    font_formats: font,
    fontsize_formats: fontSize,
    width:"100%",
    resize: 'both',
    height : 500,
    deprecation_warnings: false,
    dragDropUpload: false,
    paste_filter_drop: false,
    setup: function (editor) {
        setupTinymce(editor);
    },
    init_instance_callback: (editor) => {
      editor.contentDocument.addEventListener("dragover", function(e) {
        if ('attachmentOverlayShow' in window) {
          if (!isDisplayAttachmentOverlay()) {
            attachmentOverlayShow(e);
          }
        }
      })
    }
  });

  setTimeout('setCopyTextAreaStr()', 200);
  html_input_flg = true;

}

function setupTinymce(editor) {
  editor.ui.registry.addButton('addbodyfile', {
    text: msglist["cmn.insert.content"],
    onAction: function () {
      attachmentLoadFile('2');
    }
  });
}
function addElementBody(type, src){
  tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), type, {src : src});
}

/**
 * メールリストの出力処理
 * @param data メール情報(メール一覧、ページ数等)
 * @param procMode メールボックス区分
 * @param dataSortKey ソートキー
 * @param dataOrderKey オーダーキー
 * @param dataPhotoDsp 写真表示フラグ
 * @param searchFLg 一覧区分 true: 検索結果一覧、false:一覧  "090"：検索結果一覧
 * @returns
 */
function createMailListHtml(data, searchFlg) {
    var mailDataList = data.messages;
    var dataSortKey = data.sortKey;
    var dataOrderKey = data.order;
    var dataDirType = data.dirType;

    var retHtml = '';
    function creatSortTh(sortKey, title, dataSortKey, dataOrderKey, width) {
        var sortUp   = '<span class="classic-display">▲</span><i class="original-display icon-sort_up"></i>';
        var sortDown = '<span class="classic-display">▼</span><i class="original-display icon-sort_down"></i>';
        var sort = '';
        var orderKey = 0;
        var strHeadTitle = '';

        orderKey = 0;
        if (dataSortKey == sortKey) {
            if (dataOrderKey == "0") {
                orderKey = 1;
                sort = sortUp;
            } else {
                sort = sortDown;
            }
        }
        strHeadTitle += '<th class="table_title-color '+ width +' cursor_p no_w">';
        strHeadTitle += '<a href="#" class="js_mailListHeadSel" data-sortkey="'
            + sortKey +'" data-orderkey="'+ orderKey +'">'
            + title
            + sort+ '</a>';
        strHeadTitle += '</th>';
        return strHeadTitle;
    }

    //ヘッダー行
    retHtml += '<tbody><tr class="js_mailListHeaderLine">';
    //チェックボックス
    retHtml += '<th class="table_title-color js_tableTopCheck js_tableTopCheck-header w3 cursor_p">';
    retHtml += '  <input class="" type="checkbox" name="allCheck" onclick="" >';
    retHtml += '</th>';
    //添付ファイル
    retHtml += creatSortTh(1,
                '<img class="classic-display" src="../common/images/classic/icon_temp_file.gif" ' + msglist_wml010['cmn.attach.file'] + '>'
                + '<img class="original-display" src="../common/images/original/icon_attach.png" ' + msglist_wml010['cmn.attach.file'] + '>',
                dataSortKey, dataOrderKey, 'w3');
    //未読
    retHtml += creatSortTh(5,
            '<img class="classic-display" src="../common/images/classic/icon_mail.png" ' + msglist_wml010['cmn.read.yet'] + '>'
            + '<img class="original-display" src="../common/images/original/icon_midoku_15.png" ' + msglist_wml010['cmn.read.yet'] + '>',
            dataSortKey, dataOrderKey, 'w3');

    //検索の場合、「検索対象のディレクトリ種別」を取得する
    if (searchFlg) {
        if (getParamValue('wml010searchType') == 1) {
            //詳細検索
            var keywordKbn = getParamValue('wml010searchKeywordKbn');
            if (keywordKbn && keywordKbn.indexOf('dir:') == 0) {
                var searchDirSid = keywordKbn.substring(4);
                for (dirIdx = 0; dirIdx < treeData.directory.length; dirIdx++) {
                    if (treeData.directory[dirIdx].ID == searchDirSid) {
                        dataDirType = treeData.directory[dirIdx].TYPE;
                        break;
                    }
                }
            }

        } else {
            //キーワード検索
            dataDirType = getParamValue('wml010viewDirectoryType');
        }
    }

    //宛先・差出人
    if (dataDirType == "2" || dataDirType == "3" || dataDirType == "4") {
        //送信済み・予約送信・の場合は"宛先"
        retHtml += creatSortTh(3, msglist_wml010["cmn.from"], dataSortKey, dataOrderKey, 'w20');
    } else {
        //それ以外は"差出人"
        retHtml += creatSortTh(3, msglist_wml010["cmn.sendfrom"], dataSortKey, dataOrderKey, 'w20');
    }

    //件名
    retHtml += creatSortTh(2, msglist_wml010["cmn.subject"], dataSortKey, dataOrderKey, 'w50');
    //日時
    retHtml += creatSortTh(4, msglist_wml010["cmn.date"], dataSortKey, dataOrderKey, 'wp100');
    //サイズ
    retHtml += creatSortTh(6, msglist_wml010["cmn.size"], dataSortKey, dataOrderKey, 'wp80');

    retHtml += "</tr>";


    /* メール一覧 */
    var mailListSize = mailDataList.length;
    if (mailListSize == 0) {
        retHtml += "<tr><td colspan=\"7\">" + msglist["thereMsg"] + "</td></tr>";
        return retHtml;
    }

    for (i = 0; i < mailListSize; i++) {
        var mailMdl = mailDataList[i];
        var mod = 0;
        var nextMailMdl, prevMailMdl;

        //次のメールのSID取得
        if (i < mailListSize) {
            var nextNum = i + 1;
            nextMailMdl = mailDataList[nextNum];
        }

        //前のメールのSID取得
        if (i != 0 && mailListSize > 1) {
            var prevNum = i - 1;
            prevMailMdl = mailDataList[prevNum];
        }

        //明細行特定class
        var mailListElmClass = 'js_mailListElm' + mailMdl.XID;

        //既読
        var mailContextClass = "js_mailContent-kidoku"
        var mailReadClass = "";
        var mailReadLinkClass = "cl_linkVisit";
        if (mailMdl.Readed == false) {
            mailReadClass="fw_bold";
            mailReadLinkClass = "cl_linkDef";
            mailContextClass = "js_mailContent-midoku"
        }
        mailReadClass += ' ' + mailListElmClass;
        mailReadLinkClass += ' ' + mailListElmClass + '-link';

        retHtml += '<tr class="js_listHover cursor_p js_mailContent-line '
                    + mailContextClass
                    + ' ' + mailListElmClass + '-line'
                    + '" '

//        retHtml += '<tr class="js_listHover cursor_p ' + mailContextClass + '" '
            + 'data-mailnum="' + mailMdl.XID + '"'
            + 'data-dirtype="' + mailMdl.dirType + '"';
        if (nextMailMdl != null) {
            retHtml += 'data-nextsid="' + nextMailMdl.XID + '"';
            retHtml += 'data-nextkbn="' + nextMailMdl.dirType + '"';
        }
        if (prevMailMdl != null) {
            retHtml += 'data-prevsid="' + prevMailMdl.XID + '"';
            retHtml += 'data-prevkbn="' + prevMailMdl.dirType + '"';
        }

        retHtml += ' >';

        //チェックボックス
        retHtml += ' <td class="js_tableTopCheck txt_c">';
        retHtml += '   <input type="checkbox" name="';
        if (searchFlg) {
            retHtml += 'wml010ListSearchSid';
        } else {
            retHtml += 'wml010ListSid';
        }
        retHtml += '" value="' + mailMdl.XID + '">';

        retHtml += ' </td>';

        //添付
        retHtml += ' <td class="js_mailContent ' + mailReadClass + '-file pl5 pr5 txt_c">';
        if (mailMdl.Attach == true) {
            retHtml += '<img class="classic-display" src="../common/images/classic/icon_temp_file.gif" ' + msglist_wml010['cmn.attach.file'] + '>';
            retHtml += '<img class="original-display" src="../common/images/original/icon_attach.png" ' + msglist_wml010['cmn.attach.file'] + '>';
        }
        retHtml += '</td>';


        //既読・未読
        retHtml += ' <td class="js_mailContent fw_n txt_c p0 pl5 pr5 '
                + mailListElmClass + '-readed">';

        if (mailMdl.Readed == false) {
            //未読アイコンを設定
            retHtml += getMidokuIconHtml();
        }

        retHtml += ' </td>';


        //差出人・宛先
        retHtml += ' <td class="js_mailContent ' + mailReadClass + ' pl5 pr5 word_b-all js_mailTooltip">';
        retHtml += '<div class="of_h">';
        retHtml += '<span>';
        //送信済み・予約送信・草稿の場合は「宛先」を表示する
        if (dataDirType == "2" || dataDirType == "3" || dataDirType == "4") {
            retHtml += formatViewListElement(mailMdl.ListTo);
        } else {
            retHtml += formatViewListElement(decodeURIComponent(mailMdl.ListFrom));
        }
        retHtml += '</span>';
        retHtml += '</div>';
        retHtml += '<span class="tooltips_from display_n">';
        if (mailMdl.tooltipFrom != "") {
            retHtml += replaceAll(mailMdl.tooltipFrom, ",", "<br>");
        }
        retHtml += '</span>';

        retHtml += '<span class="tooltips_to display_n">';
        if (mailMdl.To != "") {
            retHtml += createTooltipAddressList(mailMdl.To);
        }
        retHtml += '</span>';

        retHtml += '<span class="tooltips_cc display_n">';
        if (mailMdl.Cc != "") {
            retHtml += createTooltipAddressList(mailMdl.Cc);
        }
        retHtml += '</span>';

        retHtml += '<span class="tooltips_bcc display_n">';
        if (mailMdl.Bcc != "") {
            retHtml += createTooltipAddressList(mailMdl.Bcc);
        }
        retHtml += '</span>';

        retHtml += ' </td>';


        //件名
        retHtml += ' <td class="js_mailContent lh150 ' + mailReadClass + ' pl5 pr5 txt_l word_b-all">';

        //返信・転送
        if (mailMdl.Forward == true) {
            retHtml += '   <img class="classic-display" src="../common/images/classic/icon_forward.png">';
            retHtml += '   <img class="original-display" src="../common/images/original/icon_forward.png">';
        }
        if (mailMdl.Reply == true) {
            retHtml += '   <img class="classic-display" src="../common/images/classic/icon_replay.png">';
            retHtml += '   <img class="original-display" src="../common/images/original/icon_replay.png">';
        }


        if (mailMdl.LabelId != null && mailMdl.LabelId.length > 0) {
            //ラベル
            retHtml +=  "<span class=\"baseLabel fw_n\">";

            for (l = 0; l < mailMdl.LabelId.length; l++) {

                if (l != 0) {
                    retHtml +=  ",";
                }

                var lblMdl = mailMdl.LabelId[l];
                retHtml +=  mailMdl.LabelName[l];
            }

            retHtml +=  "</span>";

            for (l = 0; l < mailMdl.LabelId.length; l++) {
                retHtml +=  "<span class=\"display_n js_label" + mailMdl.XID + "\">" + mailMdl.LabelId[l] + "</span>"
            }
        }


        retHtml += '   <span class="' + mailReadLinkClass + ' ">';
        retHtml += formatViewListElement(decodeURIComponent(mailMdl.Subject)) + '</span>';
        retHtml += ' </td>';

        //日時
        retHtml += ' <td class="js_mailContent ' + mailReadClass + ' txt_c">';
        retHtml += '   <div class="txt_c no_w">';
        retHtml += '     <div>' + mailMdl.Date + '</div>';
        retHtml += '   </div>';
        retHtml += ' </td>';

        //サイズ
        retHtml += ' <td class="js_mailContent ' + mailReadClass + '  txt_c">';
        retHtml += '   <div>' + mailMdl.viewMailSize + '</div>';
        retHtml += ' </td>';

        retHtml + '</tr></tbody>'
    }

    return retHtml;
}

//初期データ取得
function getMailData(resetAdrAreaFlg, detailKbn, resetPageFlg) {

    reloading_flg = true;
    var readListData = false;
    var page;
    if (resetPageFlg == true) {
      page = 1;
    } else {
      page = getSelectPage(false);
    }
    setParamValue('wml010selectPage', page);
    //エラー削除
    $('.js_errorMsgStr').remove();
    //フォームデータ成形
    var formData = getFormData($('#webmailForm'));
    //データ取得
    $.ajax({
        async: true,
        url:"../webmail/wml010.do",
        type: "post",
        data:formData
    }).done(function( data ) {

        //一覧表示領域(一覧、ページング)初期化
        clearMailListArea();

        if (data["errors"] == 0) {
            try {
                //表示アカウントのメールアドレス(From)を設定
                setParamValue('wml010viewAccountAddress', decodeURIComponent(data.viewAccountFrom));

                var listHtml = createMailListHtml(data, false);

                //メール一覧 メール情報を設定
                mailListData = data.messages;
                mailListMaxPage = data.maxPage;
                readListData = true;

                //ページング非表示
                $('.js_mailListArea .js_paging_combo').children().remove();
                $('.js_mailListArea .js_paging').addClass('display_none');
                //html出力
                $('#mail_list_draw_table').append(listHtml);
                //ヘッダー部分tableTop設定の初期化
                $('#mail_list_draw_table th').tableTop().initHeader();
                //ページ表示設定
                var maxPage = data.maxPage;
                if (maxPage > 1) {
                    //ページング表示

                    $('.js_mailListArea .js_paging_combo').children().remove();
                    var pageStr = '';
                    for (p = 1; p <= maxPage; p++) {
                        pageStr +=  '<option value="' + p + '"';

                        if (p == data.page) {
                            pageStr += ' selected ';
                        }
                        pageStr += '>'
                             + p + ' / ' + maxPage
                             +   '</option>';

                    }
                    $('.js_mailListArea .js_paging_combo').append(pageStr);
                    $('.js_mailListArea .js_paging').removeClass('display_none');
                }

                //ページ設定
                $('input:hidden[name=wml010selectPage]').val(data.page);

                //ソート設定
                $('input:hidden[name=wml010sortKey]').val(data.wml010sortKey);
                $('input:hidden[name=wml010order]').val(data.wml010order);

                //チェックボックスリセット
                document.forms[0].allCheck.checked = false;

                //フォルダ、ラベル再描画
                resetTreeArea(resetAdrAreaFlg);

                //ディスク容量/警告の設定
                writeAccountDiskData(data);

                /**ショートメールからの呼び出しの場合、メール作成タブを表示*/
                if (getShareFlg() == 1 && getParamValue('wml010smlShareInit') != 1) {
                    createNewMail();
                    setParamValue('wml010smlShareInit', '1')
                }

                /* 右 click (メール行) */
                $('#mail_list_draw_table .js_mailContent-line').contextMenu('context_menu2',
                        {
                    bindings: {
                        'mail_line_reply': function(t) {
                            //返信
                            doReplyListMail(1, $(t).data('mailnum'), 0);
                        },
                        'mail_line_allreply': function(t) {
                            //全て返信
                            doReplyListMail(2, $(t).data('mailnum'), 0);
                        },
                        'mail_line_forward': function(t) {
                            //転送
                            doReplyListMail(3, $(t).data('mailnum'), 0);
                        },
                        'mail_line_delete': function(t) {
                            //削除
                            var selectSidList = new Array(0);
                            selectSidList[0] = $(t).data('mailnum');
                            loadingPop(msglist_wml010['cmn.loading']);
                            doRequestMailList('dustMail', msglist_wml010["wml.failed.changemail"],
                                            false, true,
                                            selectSidList,
                                            false);

                        },
                        'mail_no_read': function(t) {
                            //未読にする
                            contextRead(1, t, false);
                        },
                        'mail_read': function(t) {
                            //既読にする
                            contextRead(0, t, false);
                        }
                    }
                });

                //メール詳細 前へボタン or 次へボタンクリック時はメール詳細を表示
                if (detailKbn) {
                    if (detailKbn == 1) {
                        getDetail(mailListData[mailListData.length - 1].XID, -1, false, false, 0);
                    } else if (detailKbn == 2) {
                        getDetail(mailListData[0].XID, -1, false, false, 0);
                    }
                }
            } catch (ae) {
                closeloadingPop();
                alert(msglist_wml010["wml.wml010.37"] + ae);
            } finally {
                clearErrorMessage();
                if (resetAdrAreaFlg != true) {
                    closeloadingPop();
                }
            }
        } else {
            closeloadingPop();
            alert(msglist_wml010["wml.wml010.37"]);
        }

    }).fail(function(data){

        //一覧表示領域(一覧、ページング)初期化
        clearMailListArea();

        closeloadingPop();
//        alert(msglist_wml010["wml.wml010.37"]);
    });

    reloading_flg = false;

    if (readListData == false) {
        mailListData = null;
        mailListMaxPage = 1;
    }
}

//メール一覧タブの表示領域(一覧・ページング)を初期化する
function clearMailListArea() {
    //一覧BODY削除
    $('#mail_list_draw_table').children().remove();

    //ページング非表示
    $('.js_mailListArea .js_paging_combo').children().remove();
    $('.js_mailListArea .js_paging').addClass('display_none');
}


function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}


//メール情報取得(受信・送信・ごみ箱)
function getDetail(sid, kbn, searchFlg, reloadFlg, getMailKbn) {
    //現在の表示ページ、最大ページ、メール一覧の最終indexを取得
    var page = getSelectPage(searchFlg);
    var maxPage, maxIndex;
    if (searchFlg) {
        maxPage = searchListMaxPage;
        maxIndex = searchListData.length - 1;
    } else {
        if (mailListData) {
            maxPage = mailListMaxPage;
            maxIndex = mailListData.length - 1;
        } else {
            return;
        }
    }

    //選択されたメールが一覧の何番目かを取得
    var selectMailIdx = getSelectMailIndex(sid, searchFlg);
    if (selectMailIdx == -1 || selectMailIdx > maxIndex) {
        closeloadingPop();
        closeMailDetail(1);
        return;
    }

    var dspMailKbn__ = 0;

    setParamValue('selectMailNumEsc', sid);
    setParamValue('editMailNumEsc', sid);

    if (getMailKbn > 0) {

        //前のメール取得
        if (getMailKbn == 1) {
            if (selectMailIdx == 0) {
                //index = 0、かつ2ページ目以降の場合はデータ再取得
                if (page > 1) {
                    page--;
                    loadingPop(msglist_wml010['cmn.loading']);
                    document.forms[0].wml010selectPage.value=page;
                    if (searchFlg) {
                        document.forms[0].CMD.value='detailSearch';
                        document.forms[0].wml010searchPageTop.value=page;
                        getSearchData(false, false, 1);
                    } else {
                        document.forms[0].CMD.value='getMailList';
                        document.forms[0].wml010pageTop.value=page;
                        getMailData(false, 1);
                    }
                    return;
                }
            } else {
                selectMailIdx--;
            }
        //次のメール取得
        } else if (getMailKbn == 2) {
            if (selectMailIdx >= maxIndex) {
                //index >= 最終index、かつ最終ページ以外の場合はデータ再取得
                if (page < maxPage) {
                    page++;
                    document.forms[0].wml010selectPage.value = page;
                    loadingPop(msglist_wml010['cmn.loading']);

                    if (searchFlg) {
                        document.forms[0].CMD.value='detailSearch';
                        document.forms[0].wml010searchPageTop.value=page;
                        getSearchData(false, false, 2);
                    } else {
                        document.forms[0].CMD.value='getMailList';
                        document.forms[0].wml010pageTop.value=page;
                        getMailData(false, 2);
                    }
                    return;
                }
            } else {
                selectMailIdx++;
            }
        }
    }

    var accountSid = $("#account_comb_box").val();

    try {
        var mailSubject = "";
        //選択されたメール情報を取得
        var mailData;
        if (searchFlg) {
            mailData = searchListData[selectMailIdx];
        } else {
            mailData = mailListData[selectMailIdx];
        }

        //未読の場合、既読に変更する
        if (mailData.Readed == false) {
            //画面の再描画を行わない場合、対象メールの表示を「既読」に切り替え
            doContextRead(0, mailData.XID, searchFlg, false);
        }

        //確認部分設定
        $('input:hidden[name=wml010selectMessageNum]').val(mailData.XID);

        $('#wml_kakunin_body').children().remove();
        mailSubject = decodeURIComponent(mailData.Subject);

        var detailBlock = $('<div></div>');

        detailBlock.appendTo($('#wml_kakunin_body'));

        //メール情報詳細の表示
        __dspDetailJusin(detailBlock, mailData);

        //確認画面共通項目の出力
        __dspDetailMailCommon(detailBlock, mailData);

        //編集ボタンの表示/非表示 切り替え
        $('#head_menu_edit_btn').hide();
        $('#head_menu_edit_btn2').hide();
        if (mailData) {
            //ディレクトリ種別 = 送信済み or 予約送信 or 草稿の場合、編集ボタンを表示する
            var dirType = mailData.dirType;
            if (dirType == 2 || dirType == 3 || dirType == 4) {
                $('#head_menu_edit_btn').show();
                $('#head_menu_edit_btn2').show();
            }
            dirType = null;
        }

        //削除ボタンアイコンの切り替え(格納先フォルダ = ゴミ箱 or それ以外)
        if (mailData.dirType == '5') {
            $('.js_detailBtnIcon_Trash').addClass('display_none');
            $('.js_detailBtnIcon_Delete').removeClass('display_none');
        } else {
            $('.js_detailBtnIcon_Trash').removeClass('display_none');
            $('.js_detailBtnIcon_Delete').addClass('display_none');
        }

        changeTabContents('mail_kakunin_tab');

        if (reloadFlg) {
            reloadData(true);
        }

        //現在開いているメールのSIDを取得、退避する
        document.forms[0].selectMailNumEsc.value = document.forms[0].wml010selectMessageNum.value;
        document.forms[0].editMailNumEsc.value = document.forms[0].wml010selectMessageNum.value;

        //タブ切り替え用の退避SIDを設定
        if (searchFlg) {
            mail_search_kakunin_flg = true;
            mail_search_kakunin_sid = mailData.XID;
        } else {
            mail_kakunin_flg = true;
            mail_kakunin_sid = mailData.XID;
        }

        //詳細表示するメールの行の背景色を変更する
        clearSelectListColor(searchFlg);
        var listId = '#mail_list_draw_table';
        if (searchFlg) {
           listId = '#mail_search_list_draw_table';
        }
        $(listId + ' .js_mailListElm' + mailData.XID + '-line').removeClass('js_listHover');
        $(listId + ' .js_mailListElm' + mailData.XID + '-line').children('td').addClass('bgC_header3');


    } catch(exp) {
        messagePop(msglist_wml010["mobile.39"], 500, 'auto');
    }

    setTimeout('changeHelpParam(0, 2)', 1500);

    return;

    function __dspDetailJusin(detailBlock, mailData) {
        //テンプレートのクローンを挿入
        var mailHead = $('#wml_kakunin_body-jusin').clone();
        $.each(mailHead.children(), function() {
            $(this).appendTo(detailBlock);
        });

        var select = detailBlock.find('.js_mailKakunin_title').eq(0);
        //送信、転送区分表示
        if (mailData.Reply || mailData.Forward) {
            select = $('<div></div>').addClass('verAlignMid').appendTo(select);
            if (mailData.Forward) {
                select.append('<img alt="Fw" class="classic-display mr5" src="../common/images/classic/icon_forward.png">');
                select.append('<img alt="Fw" class="original-display mr5" src="../common/images/original/icon_forward.png">');
            }
            if (mailData.Reply) {
                select.append('<img alt="Re" class="classic-display mr5" src="../common/images/classic/icon_replay.png">');
                select.append('<img alt="Re" class="original-display mr5" src="../common/images/original/icon_replay.png">');
            }
        }
        //タイトル表示
        select.append(decodeURIComponent(mailData.Subject));

        //差出人
        __dspSender(detailBlock, mailData);

        //宛先設定
        __dspAtesaki(detailBlock, '.js_mailKakunin_to' , mailData.To, false);
        //CC設定
        __dspAtesaki(detailBlock, '.js_mailKakunin_cc', mailData.Cc, true);
        //BCC設定
        __dspAtesaki(detailBlock, '.js_mailKakunin_bcc', mailData.Bcc, true);

        //予約送信
        __dspSendplan(detailBlock, '.js_mailKakunin_sendplan', mailData.SendPlanDate);

        //ラベル設定
        __dspLabel(detailBlock, '.js_mailKakunin_label', mailData.Label);

        //"ヘッダ情報"リンクを設定
        $('#js_mailKakunin_headerInfo').attr('onClick', 'openMailHeader(' + mailData.XID + ');');

        return;

        /**
         * 受信確認差出人名称部分の描画を行う
         */
        function __dspSender(detailBlock, mailData) {
            var select = detailBlock.find('.js_mailKakunin_from').eq(0);
            var fromAddress = decodeURIComponent(mailData.From);
            if (!isNullZeroString(fromAddress)) {
                fromAddress = '<span class=\"verAlignMid\">' + fromAddress;
                fromAddress += '<a href=\"#\" class="ml5" onClick=\"openEntryAddress(' + mailData.XID + ');\">'
                    + '<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_add_address.gif\" alt=\"\">'
                    + '<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_add_address.png\" alt=\"\">';

                fromAddress += '</a></span>';
            }
            select.html(fromAddress);
        }

        /**
         * 宛先（CC）表示の描画を行う
         */
        function __dspAtesaki(detailBlock, targetClass, atesakiList, headerFlg) {

            var select = detailBlock.find(targetClass).eq(0);

            if (!atesakiList || atesakiList.length <= 0) {
                //なければ非表示
                if (headerFlg) {
                    select.parent().remove();
                    return;
                }
            }

            select.append(atesakiList);

        }

        /**
         * 予約送信表示の描画を行う
         */
        function __dspSendplan(detailBlock, targetClass, sendPlanDate) {

            var select = detailBlock.find(targetClass).eq(0);

            if (!sendPlanDate || sendPlanDate.length <= 0) {
                //なければ非表示
                select.parent().remove();
                return;
            }

            select.append(decodeURIComponent(sendPlanDate));

        }

        /**
         * ラベル表示の描画を行う
         */
        function __dspLabel(detailBlock, targetClass, labelList) {

            var select = detailBlock.find(targetClass).eq(0);

            if (!labelList || labelList.length <= 0) {
                select.append(' ');
                return;
            }
            select.append(labelList);

        }
    }

    /**
     * メール確認詳細共通部分
     */
    function __dspDetailMailCommon(detailBlock, mailData) {
        var select;
        //日付
        detailBlock.find('.js_mailKakunin_date').eq(0).append(mailData.Date);

        //本文
        detailBlock.find('.js_mailKakunin_body').eq(0).append(decodeURIComponent(mailData.Body));

        //添付ファイル
        if (mailData.fileId.length == 0) {
            return;
        }

        select = detailBlock.find('.js_mailKakunin_temp').eq(0);
        var lastChild, tempLine;

        if (mailData.fileId.length > 0) {
            $('#wmlMailDetailTempArea').removeClass('display_none');
        } else {
            $('#wmlMailDetailTempArea').addClass('display_none');
        }

        for (tmpIdx = 0; tmpIdx < mailData.fileId.length; tmpIdx++) {

            var dlUrl = "../webmail/wml010.do"
                + "?CMD=downloadFile"
                + "&wml010downloadMessageNum=" + mailData.XID
                + "&wmlViewAccount=" + getAccount()
                + "&wml010downloadFileId=" + mailData.fileId[tmpIdx]


            tempLine = '';
            tempLine += "<span id=\"mailDetailAttach_" + mailData.fileId[tmpIdx] + "\">";


            if (tmpIdx > 0) {
                tempLine += "<br>";
            }

            tempLine += "<div class=\"verAlignMid\">";

            if (mailData.fileName[tmpIdx] != 'attach.html') {
                tempLine += "<file-preview url=\""
                + dlUrl
                + "\" "
                + "filename= \""
                + decodeURIComponent(mailData.fileName[tmpIdx])
                + "\">"
            }

            tempLine += '<img class="classic-display" src="../common/images/classic/icon_temp_file.gif" ' + msglist_wml010['cmn.attach.file'] + '>'
            + '<img class="original-display" src="../common/images/original/icon_attach.png" ' + msglist_wml010['cmn.attach.file'] + '>';

            if (mailData.fileName[tmpIdx] != 'attach.html') {
                tempLine += "<a href=\"#!\" class=\"ml5\" onClick=\"tempDownload('"
                    + dlUrl
                    + "');\"";
            } else {
                tempLine += "<a href=\""
                    + dlUrl
                    + "\" class=\"ml5\" target=\"_blank\"";
            }

            tempLine += "><span class=\"fw_b fs_13\">"
                + decodeURIComponent(mailData.fileName[tmpIdx]) + ' (' + mailData.fileSize[tmpIdx] + ')'
                + "</span></a>"
                + "<span class=\"fs_13 ml5\">[<a href=\"#!\" onClick=\"deleteAttachForDetailPop("
                + mailData.XID + ","
                + mailData.fileId[tmpIdx] + ","
                + "'" + mailData.fileName[tmpIdx] + "'"
                + ");\">"
                + msglist_wml010['cmn.delete'] + "</a>]</span>";

            if (mailData.fileName[tmpIdx] != 'attach.html') {
                tempLine += "</filename>";
            }

            tempLine += "</div>";

            tempLine +="</span>";

            if (mailData.fileId.length > 1 && tmpIdx == mailData.fileId.length - 1) {
                tempLine += "<div class=\"flo_r no_w\">"
                    + "<a class=\"mrl_auto\""
                    + "href=\"#!\" onClick=\"return allTmpDownload("
                    + mailData.XID
                    + ");\">"
                    + "<span class=\"pr10 fs_13\">"
                    + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_zip_file.gif\" alt=\"" + msglist_wml010['cir.26'] + "\">"
                    + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_zipfile.png\" alt=\"" + msglist_wml010['cir.26'] + "\">"
                    +  msglist_wml010['cir.allTmep.download']
                    +  "</span></a>"
                    +"</div>";
            }

            lastChild = $(tempLine).appendTo(select);

        }
        tempLine = null;

    }

}

function getSelectMailIndex(mailNum, searchFlg) {
    var existsMail = false;
    var mailIdx = 0;
    if (searchFlg) {
        if (searchListData != null) {
            for (; mailIdx < searchListData.length; mailIdx++) {
                if (searchListData[mailIdx].XID == mailNum) {
                    existsMail = true;
                    break;
                }
            }
        }
    } else {
        for (; mailIdx < mailListData.length; mailIdx++) {
            if (mailListData[mailIdx].XID == mailNum) {
                existsMail = true;
                break;
            }
        }
    }

    if (!existsMail) {
        mailIdx = -1;
    }

    return mailIdx;
}


function changeDirectory(dirSid, dirType) {
    document.forms[0].CMD.value='getMailList';
    document.forms[0].wml010viewDirectory.value = dirSid;
    document.forms[0].wml010viewDirectoryType.value = dirType;
    document.forms[0].wml010selectPage.value = 1;
    $('input[name="wml010pageTop"]').val(1);
    $('input[name="wml010pageBottom"]').val(1);
    setLabel(0);

    $("#mail_list_tab").html("");
    if (dirType == 2) {
        //送信済み
        $("#mail_list_tab").html(msglist_wml010['wml.19']);
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_label_add_btn2").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $("#head_menu_list_kidoku_btn2").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $('#head_menu_list_dust_btn, #head_menu_list_dust_btn2').removeClass('display_none');
        $('#head_menu_list_del_btn, #head_menu_list_del_btn2').addClass('display_none');
    } else if (dirType == 3) {
        //予約送信
        $("#mail_list_tab").html(msglist_wml010['wml.211']);
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_label_add_btn2").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $("#head_menu_list_kidoku_btn2").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $('#head_menu_list_dust_btn, #head_menu_list_dust_btn2').removeClass('display_none');
        $('#head_menu_list_del_btn, #head_menu_list_del_btn2').addClass('display_none');
    } else if (dirType == 4) {
        //草稿
        $("#mail_list_tab").html(msglist_wml010['cmn.draft']);
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_label_add_btn2").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $("#head_menu_list_kidoku_btn2").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $('#head_menu_list_dust_btn, #head_menu_list_dust_btn2').removeClass('display_none');
        $('#head_menu_list_del_btn, #head_menu_list_del_btn2').addClass('display_none');
    } else if (dirType == 5) {
        //ゴミ箱
        $("#mail_list_tab").html(msglist_wml010['cmn.trash']);
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $("#head_menu_list_label_add_btn2").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn2").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $('#head_menu_list_dust_btn, #head_menu_list_dust_btn2').addClass('display_none');
        $('#head_menu_list_del_btn, #head_menu_list_del_btn2').removeClass('display_none');

    } else if (dirType == 7) {
        //保管
        $("#mail_list_tab").html(msglist_wml010['cmn.strage']);
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_label_add_btn2").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn2").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $('#head_menu_list_dust_btn, #head_menu_list_dust_btn2').removeClass('display_none');
        $('#head_menu_list_del_btn, #head_menu_list_del_btn2').addClass('display_none');

    } else {
        //受信
        $("#mail_list_tab").html(msglist_wml010['cmn.receive']);
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_label_add_btn2").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn2").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $('#head_menu_list_dust_btn, #head_menu_list_dust_btn2').removeClass('display_none');
        $('#head_menu_list_del_btn, #head_menu_list_del_btn2').addClass('display_none');
    }

    changeTab($('#mail_list_tab'));

    loadingPop(msglist_wml010['cmn.loading']);
    getMailData(false, false, true);
}

function onTitleLinkClick(fid, order) {
    setCMD('getMailList');
    setParamValue('wml010sortKey', fid);
    setParamValue('wml010order', order);
    loadingPop(msglist_wml010['cmn.loading']);
    getMailData();
}


function isViewFile(ext) {
    if (".gif" == ext
            || ".jpeg" == ext
            || ".jpg" == ext
            || ".png" == ext) {
        return true;
    }
    return false;
}


//画面左 ユーザ情報欄の描画
function drawShainList(shainList) {
    $("#selGrpUsrArea").children().remove();

    shainMailList = new Array();

    if (shainList && shainList.length > 0) {
        for (u = 0; u < shainList.length; u ++) {
            var usrMdl = shainList[u];

            var usrLabel = "<div class=\"hp_auto pl15 side_folder-focus cursor_p\"";
            usrLabel += " onClick=\"setAdrListAddress(\'"
                + usrMdl.NAME
                + "\', \'"
                + usrMdl.MAIL + "\');"
                + "\">";

            usrLabel += "<div class=\"verAlignMid txt_t pt5 pb5\">"
            usrLabel += "<img class=\"btn_classicImg-display\"  src=\"../webmail/images/classic/icon_card.gif\">";
            usrLabel += "<img class=\"btn_originalImg-display\" src=\"../webmail/images/original/icon_card.png\">";

            usrLabel += "<span class=\"ml5 fs_12 lh140 cursor_p>";
            if (usrMdl.usrUkoFlg == "1") {
                usrLabel = usrLabel + " mukoUser ";
            }
            usrLabel += "\">";

            usrLabel += usrMdl.NAME
                + '<br><span class="mt0 fs_10 lh110">' + usrMdl.MAIL + '</span>'
                + "</span>"
                + "</div>"
                + "</div>";
            $("#selGrpUsrArea").append(usrLabel);

            shainMailList.push(usrMdl.MAIL);

        }
    }
}

function redrawShainList() {
    var paramStr = 'CMD=getShainTreeData'
                 + '&wmlViewAccount=' + getAccount()
                 + '&wml010shainGroup=' + getSelectBoxValue('wml010shainGroup');
    $.ajax({
        async: true,
        url:"../webmail/wml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        drawShainList(data.shain);
    }).fail(function(data){
        alert(msglist_wml010["sml.191"]);
    });

}


//画面左 アドレス帳欄の描画
function drawAddressList(addressList) {
    $("#selAddressbookArea").children().remove();
    addressMailList = new Array();

    if (addressList && addressList.length > 0) {
        var addressSearchText = getParamValue('wml010searchTextAddressList');
        var addressSearchFlg = addressSearchText.length > 0;

        for (u = 0; u < addressList.length; u ++) {
            var adrMdl = addressList[u];

            if (addressSearchFlg == false || unescapeHtml(adrMdl.NAME).indexOf(addressSearchText) >= 0) {

                var adrLabel = "<div class=\"hp_auto pl15 side_folder-focus cursor_p\""
                    + "\" onClick=\"setAdrListAddress(\'"
                        + adrMdl.NAME
                        + "\', \'"
                        + adrMdl.MAIL + "\');"
                        + "\">";
                    + ">";

                adrLabel += "<div class=\"verAlignMid txt_t pt5 pb5\">"
                adrLabel += "<img class=\"btn_classicImg-display\"  src=\"../webmail/images/classic/icon_card.gif\">";
                adrLabel += "<img class=\"btn_originalImg-display\" src=\"../webmail/images/original/icon_card.png\">";

                adrLabel += "<span class=\"ml5 fs_12 lh140\">"
                        + adrMdl.NAME
                        + '<br><span class="fs_10 lh110">' + adrMdl.MAIL + '</span>'
                        + "</span>"
                        + "</div>"
                        + "</div>";
                $("#selAddressbookArea").append(adrLabel);

                addressMailList.push(adrMdl.MAIL);
            }
        }
    }
}

function redrawAddressList() {
    var paramStr = 'CMD=getAddressTreeData'
                + '&wmlViewAccount=' + getAccount()
                + '&wml010addressType=' + getRadioValue('wml010addressType');

    $.ajax({
        async: true,
        url:"../webmail/wml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        drawAddressList(data.address);
    }).fail(function(data){
        alert(msglist_wml010["sml.191"]);
    });

}

function searchAddressList() {

    var searchText = getParamValue('wml010searchTextAddressList');

    if (isSpaceOnly(searchText)) {
        alert(msglist.cantOnlySpase);

//    } else if (isNullZeroString(searchText)) {
//        alert(msglist.enterKeyWord);

    } else if (isSpaceStart(searchText)) {
        alert(msglistcantStartSpace);

    } else if (searchText.length > 100) {
        alert(msglist.inputSearchWord);

    } else {
        redrawAddressList();
    }
}


//画面左 送信先リスト欄の描画
function drawDestList(destList) {
  $("#selDestlistArea").children().remove();
  if (destList && destList.length > 0) {
      for (u = 0; u < destList.length; u ++) {
          var destMdl = destList[u];

          var destLabel = "<div class=\"hp_auto pl15 mb5 side_folder-focus cursor_p\""
              + " onClick=\"openDestlist(\'"
              + destMdl.SID
              + "\');\">";
              + ">";

          destLabel += "<div class=\"verAlignMid txt_t\">";
          destLabel += "<img class=\"btn_classicImg-display\"  src=\"../webmail/images/classic/icon_card.gif\">";
          destLabel += "<img class=\"btn_originalImg-display\" src=\"../webmail/images/original/icon_card.png\">";

          destLabel += "<span class=\"ml5\">"
                      + destMdl.NAME
                      + "</span>"
                      + "</div>"
                      + "</div>";

          $("#selDestlistArea").append(destLabel);

      }
  }
}

function redrawDestList() {
    var paramStr = 'CMD=getDestlistTreeData'
                + '&wmlViewAccount=' + getAccount();

    $.ajax({
        async: true,
        url: "../webmail/wml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        drawAddressList(data.address);
    }).fail(function(data){
        alert(msglist_wml010["sml.191"]);
    });

  }


//ユーザ情報、アドレス帳クリック時
function setAdrListAddress(adrName, address) {
  if (address != null && address.length > 0) {
      var adrAddress;
      if (adrName != null && adrName.length > 0) {
          var nbsp = String.fromCharCode( 160 );
          adrName = adrName.replace( nbsp, " " );
//          adrName = adrName.split('\\').join('\\\\');
          adrName = adrName.split('"').join('\\"');
          adrAddress = '\"' + adrName + "\" <" + address + ">";
      } else {
          adrAddress = address;
      }

      if (!mail_create_flg) {
          //表示位置を画面最上部へ移動する
          scrollBodyTop();
          createNewMail(adrAddress);
      } else if(wmlEditorFocusParamName == 'wml010sendAddressTo'
          || wmlEditorFocusParamName == 'wml010sendAddressCc'
          || wmlEditorFocusParamName == 'wml010sendAddressBcc')
      {
          var addressElement;
          addressElement = document.getElementsByName(wmlEditorFocusParamName)[0];
          if (addressElement.value != null && addressElement.value.length > 0) {
              addressElement.value = addressElement.value + ',' + adrAddress;
          } else {
              addressElement.value = adrAddress;
          }
      }
  }
}

function resetAllDispLink() {
    $('#alldsp_to_area').hide();
    $('#atesaki_area').removeClass('ofy_a');
    $('#atesaki_area').removeClass('hp75');

    $('#alldsp_cc_area').hide();
    $('#cc_area').removeClass('ofy_a');
    $('#cc_area').removeClass('hp75');

    $('#alldsp_bcc_area').hide();
    $('#bcc_area').removeClass('ofy_a');
    $('#bcc_area').removeClass('hp75');
}


/**
 * 追加した宛先エリアのスクロール
 * @param atesakiArea JQueryオブジェクト
 * @returns
 */
function resetAtesakiScr(atesakiArea) {

    var atesakiScr = $(atesakiArea).parent();
    atesakiScr.removeClass('ofy_a');
    atesakiScr.removeClass('hp75');

    var allDisp = atesakiScr.parent().children('.js_atesakiAllDisp');
    if (3 < atesakiArea.find('div').length) {
        allDisp.show();


        if (allDisp.text() != msglist_wml010['cmn.close']) {
            atesakiScr.addClass('ofy_a');
            atesakiScr.addClass('hp75');
            if (allDisp.text().length == 0) {
                allDisp.text(msglist_wml010['sml.218']);
            }
        }

    } else {
        allDisp.hide();
    }
}

function resetMailCreate() {

    $('#atesaki_to_area').children().remove();
    resetAtesakiScr($('#atesaki_to_area'));
    $('#atesaki_cc_area').children().remove();
    resetAtesakiScr($('#atesaki_cc_area'));
    $('#atesaki_bcc_area').children().remove();
    resetAtesakiScr($('#atesaki_bcc_area'));
    $('input[name=wml010sendSubject]').val('');

    if ($('input:hidden[name=wml010sendContentHtml]').val() != ""
        && tinyMCE.get('html_input') != null) {
        tinyMCE.get('html_input').setContent('');
    }

    $('#text_input').val('');
    $('#html_input').val('');
    $('input:hidden[name=wml010sendContentHtml]').val('');
}

function resetTreeArea(resetAdrAreaFlg) {

    document.forms[0].CMD.value='getTreeData';
    var paramStr = "";
    paramStr += getFormData($('#webmailForm'));
    $.ajax({
        async: true,
        url:  "../webmail/wml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        //ツリー情報の更新
        treeData = data;

        //--------フォルダの再描画--------
        if (data != null && data.directory != null && data.directory.length > 0) {

            var dirType;
            for (dirIdx = 0; dirIdx < data.directory.length; dirIdx++) {
                dirType = data.directory[dirIdx].TYPE;
                if ($('#wmllist_folder_' + dirType)) {
                    $('#wmllist_folder_' + dirType).attr('onclick', 'javascript:changeDirectory(' + data.directory[dirIdx].ID + ', ' + dirType + ');');
                    setParamValue('menu_folder_txt_' + dirType + '_id', data.directory[dirIdx].ID);

                    //未読・既読件数(予約送信 or 草稿の場合、フォルダ内メール件数)を設定

                    if (data.directory[dirIdx].NRCNT > 0) {
                        $('#wmllist_folder_count_' + dirType).html('(' + data.directory[dirIdx].NRCNT + ')');
                    } else {
                        $('#wmllist_folder_count_' + dirType).html('');
                    }
                }
            }
        }

        //--------ラベルの再描画--------
        var labelAreaStr = "";

        if (data != null && data.label != null && data.label.length > 0) {

            $('#hokan_bottom_div').addClass("side_folderImg-line");

            var dspClass = "";
            var line_class = "side_folderImg-lineMinusBottom";
            if (!left_menu_label_opnkbn) {
//                dspClass = "display_none";
//                line_class = "side_folderImg-linePlusBottom";
            }

            var labelAreaStr = "<div class=\"verAlignMid\">";

            labelAreaStr += "<div class=\"original-display ml10\"></div>"
                +  "<div class=\"side_folderImg cl_webIcon " + line_class + " verAlignMid js_lineToggle\"></div>"
                +  "<div class=\"side_folderImg side_folderImg-label ml0 \"></div>"
                +  "<div class=\"side-folderText \" id=\"lable_top\">"+msglist_wml010['cmn.label']+"</div>"
                +  "</div>"
                +  "<div id=\"wml010_left_labelListArea\" class=\"w100 "
                +  dspClass
                +  "\">";

            var labelsize = data.label.length;

            for (i = 0; i < data.label.length; i++) {
                var lblMdl = data.label[i];
                var leftLineClass = "side_folderImg-line2";

                if ((i + 1) == labelsize) {
                    leftLineClass = "side_folderImg-lineBottom";
                }

                var labelTxt = lblMdl.NAME;

                labelAreaStr += ""
                    +  "<div class=\"side_folder-focus js_file_hover js_changeLabelDir\" data-labelid=\""
                    +  lblMdl.ID
                    +  "\">"
                    +  "<div class=\"wp20 hp25 side_folderImg\"></div>"
                    +  "<div"
                    + " id=\"wmllist_label_line_" + lblMdl.ID + "\""
                    + " class=\""
                    +  leftLineClass
                    +  " verAlignMid side_folderImg\"></div>"
                    +  "<div class=\"side-folderText\" id=\"wmllist_label_text_" + lblMdl.ID + "\">"
                    + "<table class=\"table-noBorder\"><tr><td class=\"word_b-all\">"
                    +  labelTxt;

                labelAreaStr += "<span id=\"wmllist_label_count_" + lblMdl.ID + "\""
                            + "class=\"fs_11 fw_b\">";
                if (lblMdl.NRCNT > 0) {
                    labelAreaStr += "&nbsp;("
                        +  lblMdl.NRCNT
                        +  ")";
                }
                labelAreaStr += "</span>"
                + "</td></tr></table>";

                labelAreaStr += "</div>"
                    +  "<input type=\"hidden\" name=\"left_menu_label_name\" value=\""
                    +  lblMdl.NAME
                    +  "\" />"
                    +  "</div>"
                    +  "";

            }

            labelAreaStr += "</div>";

            $('#labelArea').children().remove();
            $('#hokan_bottom_div').removeClass("side_folderImg-lineBottom");
        } else {
            $('#hokan_bottom_div').addClass("side_folderImg-lineBottom");
        }

        $('#labelArea').append(labelAreaStr);


        for (i = 0; i < data.label.length; i++) {
            $('#wmllist_label_line_' + data.label[i].ID).css('height', document.getElementById('wmllist_label_text_' + data.label[i].ID).clientHeight);
        }

        //ラベルツリーを折り畳んだ状態で再表示を行った場合
        if (data != null && data.label != null && data.label.length > 0) {
            if (!left_menu_label_opnkbn) {
                labelTreeViewFlg = true;
                $(".js_lineToggle").click();
                labelTreeViewFlg = false;
            }
        }
        //--------ラベルの再描画--------

        //--------ユーザ情報、アドレス帳、送信先リストの再描画--------
        if (resetAdrAreaFlg == true) {
            drawShainList(data.shain);
            drawAddressList(data.address);
            drawDestList(data.destlist);

        }

        if (resetAdrAreaFlg) {
            closeloadingPop();
        }
    }).fail(function(data){
        closeloadingPop();
        alert(msglist_wml010["sml.198"]);
    });

}

//メール送信
function doMailSend() {
    //件名が未入力、かつ確認ポップアップを表示しない場合、警告ポップアップを表示
    if (trim(getParamValue('wml010sendSubject')).length <= 0
    && getParamValue("wml010checkAddress") != 1
    && getParamValue("wml010checkFile") != 1) {
        if (confirm(msglist.subjectEntered) == false) {
            return;
        }
    } else if (trim(getParamValue('wml010sendSubject')) == msglist["cmn.autoSave"]
    && getParamValue("wml010checkAddress") != 1
    && getParamValue("wml010checkFile") != 1) {
        if (confirm(msglist.subjectAutoSaveEntered) == false) {
            return;
        }
    }

    //メール本文を保存用パラメータに設定
    if (isEditorHtml()) {
        setParamValue('wml010svSendContent', tinyMCE.get('html_input').getContent());
    } else {
        setParamValue('wml010svSendContent', getParamValue('wml010sendContent'));
    }
    if (isEditorHtml() == false) {
        if (tinyMCE.get('html_input') != null) {
            $('input:hidden[name="wml010sendContentHtml"]').val(tinyMCE.get('html_input').getContent());
        }
    }

    //宛先の確認 or 添付ファイルの確認 == 確認する の場合、確認画面を表示する
    if (getParamValue("wml010checkAddress") == 1
    || getParamValue("wml010checkFile") == 1) {
        showSendmailConfirmDialog();
    } else {
        sendWebmail();
    }
}

function sendWebmail() {

    //処理中ダイアログが表示されていなければ表示する。
    if (!$('#loading_pop').dialog('isOpen')) {

        loadingPop("処理中");
    }
    //自動保存中の場合、リトライする。
    if (autoSaveFlg) {
        clearInterval(retryFunction);
        retryFunction = window.setInterval(function(){sendWebmail()}, 500);
        eventFlg = true;
    } else {
        eventFlg = false;
        clearInterval(retryFunction);
        stopAutoSave();

        document.forms[0].CMD.value='sendMail';
        var paramStr = "";
        paramStr += getFormData($('#webmailForm'));

        $.ajax({
            async: true,
            url:"../webmail/wml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            try {
                //添付ファイルでFileNotoFoundException発生
                try {
                    if ($(data).find('[name=errCause]')
                        && $(data).find('[name=errCause]').val() == 'GSAttachFileNotExistException') {
                        wmlEditorBeforeUnloadManager.off();
                        $('html').html('');
                        $('body').append($(data));
                        return;
                    }
                } catch (ee) {
                    //正常登録時のjsonをjqueryObjとして扱うとエクセプションになる
                }

                if (data["error"] == 1) {
                    auto_save_timer_flg = false;
                    startTimer();
                    try {
                        setErrorMessage(data.errorMessage);
                    } catch (ae) {
                        alert(msglist_wml010["sml.201"] + ae);
                    }
                } else {

                    //草稿を編集してメール送信した場合、メール詳細を閉じる
                    var detailCloseFlg = true;
                    if (data["sendToDraft"] && !data["beforeMail"]) {
                        detailCloseFlg = false;
                    }

                    //送信完了後、新規作成タブを閉じる
                    resetSid();
                    delNewCreateMail($('.js_mailDelBtnMini'), 1, -1, detailCloseFlg);
                    reloadData();
                }
            } catch (ae) {
                alert(msglist_wml010["wml.js.40"] + ae);
            } finally {
                $('#loading_pop').dialog('close');
            }
        }).fail(function(data){
            alert(msglist_wml010["wml.js.40"] + 1);
            $('#loading_pop').dialog('close');
        });
    }
}

function doMailSoko() {

    //処理中ダイアログが表示されていなければ表示する。
    if (!$('#loading_pop').dialog('isOpen')) {
        loadingPop("処理中");
    }
    //自動保存中の場合、リトライする。
    if (autoSaveFlg) {
        clearInterval(retryFunction);
        retryFunction = window.setInterval(function(){doMailSoko()}, 500);
        eventFlg = true;
    } else {
        eventFlg = false;
        clearInterval(retryFunction);
        stopAutoSave();
        //メール本文を保存用パラメータに設定
        if (isEditorHtml()) {
            setParamValue('wml010svSendContent', tinyMCE.get('html_input').getContent());
        } else {
            setParamValue('wml010svSendContent', getParamValue('wml010sendContent'));

            if (tinyMCE.get('html_input') != null) {
                $('input:hidden[name="wml010sendContentHtml"]').val(tinyMCE.get('html_input').getContent());
            }
        }
        document.forms[0].CMD.value='draftMail';
        var paramStr = "";
        paramStr += getFormData($('#webmailForm'));
        var editSid = 0;
        $.ajax({
            async: true,
            url:"../webmail/wml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            //添付ファイルでFileNotoFoundException発生
            try {
                if ($(data).find('[name=errCause]')
                    && $(data).find('[name=errCause]').val() == 'GSAttachFileNotExistException') {
                    wmlEditorBeforeUnloadManager.off();
                    $('html').html('');
                    $('body').append($(data));
                    return;
                }
            } catch (ee) {
                //正常登録時のjsonをjqueryObjとして扱うとエクセプションになる
            }
            if (data["error"] == 1) {
                $('#loading_pop').dialog('close');
                auto_save_timer_flg = false;
                startTimer();
                try {
                    setErrorMessage(data.errorMessage);
                } catch (ae) {
                    alert(msglist_wml010["sml.201"] + ae);
                }
            } else {
                //草稿保存が正常に完了した場合、メール作成タブを閉じる
                resetSid();
                delNewCreateMail($('.js_mailDelBtnMini'), 1, -1, false);
                reloadData();
            }
        }).fail(function(data){
            $('#loading_pop').dialog('close');
            alert(msglist_wml010["sml.201"]);
        });
    }
}


function delCreateKakuninArea() {
    //確認画面のリセット
    $('#sml_create_kakunin_body').children().remove();
    //テンプレートのクローンを挿入
    $.each($('#sml_create_kakunin_body-template').clone().children(), function() {
        $(this).appendTo('#sml_create_kakunin_body');
    });
}

function emlListMail(searchFlg) {
    var selectSidList = getListCheckSid(searchFlg);
    if (selectSidList == null || selectSidList.length == 0) {
        alert(msglist.mailSelect);
    } else {
        var isEdit = wmlEditorBeforeUnloadManager.isOpenEditor;
        if (isEdit) {
            wmlEditorBeforeUnloadManager.onTemporary();
        }

        var requestUrl;
        if (searchFlg) {
            requestUrl = getRequestMailListURL("emlOutput", searchListData, selectSidList);
        } else {
            requestUrl = getRequestMailListURL("emlOutput", mailListData, selectSidList);
        }
        location.href = requestUrl;
    }
}

//既読/未読変更(メール詳細画面から)
function changeOneMailReaded(mailNum, readedType, searchFlg) {

    var fd = new FormData();
    var errMsg = '';
    if (readedType == 1) {
        //未読に変更
        fd.append('CMD', 'noReadMail');
        errMsg = msglist_wml010["sml.203"];
    } else {
        //既読に変更
        fd.append('CMD', 'readedMail');
        errMsg = msglist_wml010["sml.202"];
    }

    fd.append('wmlViewAccount', getAccount());
    fd.append('wml010selectMessageNum', mailNum);

    loadingPop(msglist_wml010['cmn.loading']);

    $.ajax({
        async: true,
        url:  "../webmail/wml010.do",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false
    }).done(function( data ) {

        //メールデータの既読/未読を変更
        for (var idx = 0; idx < mailNumList.length; idx++) {
            if (searchFlg) {
                for (mailIdx = 0; mailIdx < searchListData.length; mailIdx++) {
                    if (mailNumList[idx] == searchListData[mailIdx].XID) {
                        searchListData[mailIdx].Readed = (readedType != 1);
                    }
                }
            } else {
                for (mailIdx = 0; mailIdx < mailListData.length; mailIdx++) {
                    if (mailNumList[idx] == mailListData[mailIdx].XID) {
                        mailListData[mailIdx].Readed = (readedType != 1);
                    }
                }
            }
        }
        closeloadingPop();

        mailList = null;
    }).fail(function(data){
        alert(errMsg);
    }).always(function(data){
        closeloadingPop();
        mailNumList = null;
    });
}

//既読/未読変更(メール一覧から複数選択)
function changeListMailReaded(readedType, searchFlg) {
    //対象メールが選択されていない場合、警告を表示
    var selectSidList = getListCheckSid(searchFlg);
    if (selectSidList == null || selectSidList.length == 0) {
        alert(msglist.mailSelect);
        return;
    }

    var changeCMD = 'readSelectMail';
    var errMessage = msglist_wml010["sml.202"];
    if (readedType == 1) {
        changeCMD = 'unreadSelectMail';
        errMessage = msglist_wml010["sml.203"];
    }

    var requestUrl;
    if (searchFlg) {
        requestUrl = getRequestMailListURL(changeCMD, searchListData, selectSidList);
    } else {
        requestUrl = getRequestMailListURL(changeCMD, mailListData, selectSidList);
    }

    loadingPop(msglist_wml010['cmn.loading']);
    $.ajax({
        async: true,
        url: requestUrl,
        type: "post"
    }).done(function( data ) {
        try {
            if (data.message == 'success') {
                var mailNum, selectMailIdx, selectSearchMailIdx;
                for (mailIdx = 0; mailIdx < selectSidList.length; mailIdx++) {
                    //一覧の既読/未読表示を変更
                    mailNum = selectSidList[mailIdx];
                    changeMailReadedView(mailNum, readedType);

                    //メール一覧情報の未読/既読を変更する
                    selectMailIdx = getSelectMailIndex(mailNum, false);
                    selectSearchMailIdx = getSelectMailIndex(mailNum, true);
                    if (selectMailIdx >= 0) {
                        mailListData[selectMailIdx].Readed = (readedType == 0);
                    }
                    if (selectSearchMailIdx >= 0) {
                        searchListData[selectSearchMailIdx].Readed = (readedType == 0);
                    }
                }

                //メール一覧 チェックボックスを未チェック状態に変更
                if (searchFlg) {
                    document.getElementsByName('allCheck')[1].checked = false;
                } else {
                    document.getElementsByName('allCheck')[0].checked = false;
                }
                changeAllListCheck(false, searchFlg);

                mailNum = null;
                selectMailIdx = null;
                selectSearchMailIdx = null;

                //一覧のメール選択状態を解除
                clearSelectListColor(searchFlg);

                //フォルダ、ラベル再描画
                resetTreeArea(false);

            } else {
                alert(data.message);
            }

        } catch (ae) {
            alert(ae);
        } finally {
            $('#loading_pop').dialog('close');
        }
    }).fail(function(data){
        $('#loading_pop').dialog('close');
        alert(errMessage);
    });
}

function hokanListMail(searchFlg) {
    requestMailList('keepMail', msglist_wml010["wml.failed.storemail"], searchFlg, false);
}

function hokanOnceMail() {
    requestMailOnce('keepMail', msglist_wml010["wml.failed.storemail"], isSearchTabView(), true);
}

function idouOnceMail() {
    moveMailPop(0);
}

function idouListMail(searchFlg) {
    moveMailPop(1, searchFlg);
}

function deleteOnceMail() {
    requestMailOnce('dustMail', msglist_wml010["wml.failed.changemail"], isSearchTabView(), true);
}

function deleteListMail(searchFlg) {
    requestMailList('dustMail', msglist_wml010["wml.failed.changemail"], searchFlg, false);
}

function emptyTrash() {
    requestMailList('emptyTrash', msglist.failedTrash, isSearchTabSelect(), true);
}

function shareMail() {
    shareMailPop();
}

function addLabelOnceMail() {
    labelAddPop(0, true);
}

function deleteLabelOnceMail() {
    var selectSidList = new Array(getDetailMailNum());
    var showFlg = false;

    var selectMailIdx = getSelectMailIndex(getDetailMailNum(), false);
    if (selectMailIdx < 0) {
        selectMailIdx = getSelectMailIndex(getDetailMailNum(), true);
        if (selectMailIdx >= 0) {
            showFlg = searchListData[selectMailIdx].LabelId.length;
        }
    } else {
        showFlg = mailListData[selectMailIdx].LabelId.length;
    }

    if (!showFlg) {
        alert(msglist_wml010["wml.js.72"]);
    } else {
        //ラベルコンボの更新を行う
        $('#label_dialog_del > option').remove();
        for(var i = 0; i < selectSidList.length; i++) {
            $(".js_label" + selectSidList[i]).each(function() {
                if($('#label_dialog_del option[value="' + $(this).text() + '"]').length == 0) {
                    $('#label_dialog_del').append($('<option>').html($("#delLabel_" + $(this).text()).text()).val($(this).text()));
                };
            });
        }
        labelDeletePop(0, true);
    }
}

function addLabelListMail(searchFlg) {
    var selectSidList = getListCheckSid(searchFlg);
    if (selectSidList == null || selectSidList.length == 0) {
        alert(msglist.mailSelect);
    } else {
        labelAddPop(1, searchFlg);
    }
}

function deleteLabelListMail(searchFlg) {
    var selectSidList = getListCheckSid(searchFlg);
    if (selectSidList == null || selectSidList.length == 0) {
        alert(msglist.mailSelect);
    } else {
        var showFlg = false;
        for(var i = 0; i < selectSidList.length; i++) {
            if ($(".js_label" + selectSidList[i]).length != 0) {
                showFlg = true;
            };
        }
        if (!showFlg) {
            alert(msglist_wml010["wml.js.72"]);
        } else {
            //ラベルコンボの更新を行う
            $('#label_dialog_del > option').remove();
            for(var i = 0; i < selectSidList.length; i++) {
                $(".js_label" + selectSidList[i]).each(function() {
                    if($('#label_dialog_del option[value="' + $(this).text() + '"]').length == 0) {
                        $('#label_dialog_del').append($('<option>').html($("#delLabel_" + $(this).text()).text()).val($(this).text()));
                    };
                });
            }
            labelDeletePop(1, searchFlg);
        }
    }
}

function changeAddLabelType() {
    if ($('input:radio[name=wml010addLabelType]:checked').val() == 1) {
        $('#label_dialog_sel').attr("disabled", "disabled");
        $('#label_dialog_new').removeAttr("disabled");
    } else {
        $('#label_dialog_sel').removeAttr("disabled");
        $('#label_dialog_new').attr("disabled", "disabled");
    }
}

function replyMail(mailkbn) {

    var selectedSid = document.forms[0].selectMailNumEsc.value;
    var editSid = document.forms[0].editMailNumEsc.value;

    //メール詳細を開き草稿を保存すると選択SIDが変わるので詳細メールに戻す
    if (selectedSid != 0) {
        editSid = selectedSid;
    } else if (editSid != 0) {
        selectedSid = editSid;
    }

    doReplyMail(mailkbn, selectedSid, editSid);
}


function doReplyListMail(mailkbn, selectedSid, editSid) {
    //メール作成タブが表示されている場合、処理を行わない
    if (mail_create_flg) {
        return;
    }

    doReplyMail(mailkbn, selectedSid, editSid);
}

function doReplyMail(mailkbn, selectedSid, editSid) {


    //草稿メールの場合は詳細メールのSIDに戻さない
    if (selectedSid != 0 && editSid != 0 && mailkbn != 4) {
        setParamValue('wml010selectMessageNum', selectedSid);
    }

    var cmdStr = 'replyMail';
    if (mailkbn == 1) {
        cmdStr = 'replyMail';
    } else if (mailkbn == 2) {
        cmdStr = 'replyMailAll';
    } else if (mailkbn == 3) {
        cmdStr = 'forwardMail';
    } else if (mailkbn == 4) {
        cmdStr = 'editMail';
    }
    setCMD(cmdStr);

    //返信・転送・編集元メールのメッセージ番号を設定
    $('input:hidden[name=wml010sendMessageNum]').val(selectedSid);

    var paramStr = "";
    if (mail_create_flg) {
        delKakuninPopup(paramStr, mailkbn);
    } else {

        paramStr += getFormData($('#webmailForm'));
        $.ajax({
            async: true,
            url:  "../webmail/wml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            tmp_del_flg = false;

            $('#send_account_comb_box').val(getAccount());
            $("#popHinaKojin").children().remove();

            openSendTab();
            setCreateMail(mailkbn, data);
            //formの値を保持用にセット
            setSvMail();
            //タイマースタート
            startTimer();

        }).fail(function(data){
            alert(msglist_wml010["sml.190"]);
        });
    }

}

function delKakuninPopup(paramStr, mailkbn) {
    $('#delKakuninPop').dialog({
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
        buttons: [
            {
                name:"DIALOG_OK_BUTTON",
                text:msglist_wml010["cmn.ok"],
                click: function() {
                    $(this).dialog('close');
                    deleteNewCreateMail($('.js_mailDelBtnMini'), true);
                    if (paramStr != 'newMail') {
                        replyMail(mailkbn)
                    } else {
                        createNewMail();
                    }
                }
            },{
                name:"DIALOG_CANCEL_BUTTON",
                text:msglist_wml010["cmn.cancel"],
                click:  function() {
                    $(this).dialog('close');
                }
            }
        ]

        ,open: function(event, ui) {
            document.getElementsByName('DIALOG_OK_BUTTON')[0].setAttribute("class","baseBtn");
            document.getElementsByName('DIALOG_OK_BUTTON')[0].innerHTML =
                '<img class="btn_classicImg-display" src="../common/images/classic/icon_ok.png" alt="">'
              + '<img class="btn_originalImg-display" src="../common/images/original/icon_check.png" alt="">'
              + msglist_wml010["cmn.ok"];

            document.getElementsByName('DIALOG_CANCEL_BUTTON')[0].setAttribute("class","baseBtn");
            document.getElementsByName('DIALOG_CANCEL_BUTTON')[0].innerHTML =
                '<img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="">'
              + '<img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="">'
              + msglist_wml010["cmn.cancel"];

            $('.ui-widget-overlay').css('position', 'fixed');
        },
        close: function() {
            $('.ui-widget-overlay').css('position', 'absolute');
        }
    });
}

function setCreateMail(mailkbn, mailData) {

    // テンポラリディレクトリIDを初期化
    setParamValue("wml010tempDirId", "");

    //各入力項目を初期化
    setParamValue('wml010sendSubject', '');
    setParamValue('wml010sendAddressTo', '');
    setParamValue('wml010sendAddressCc', '');
    setParamValue('wml010sendAddressBcc', '');
    setParamValue('wml010sendContent', '');
    setParamValue('wml010sendContentHtml', '');
    $('#composeTempFile').addClass('display_none');

    //予約送信コンボボックスを設定
    var sendPlanDateHtml = '';
    sendPlanDateHtml = "<div class=\"verAlignMid\">"
                     + "<input type=\"text\" name=\"wml010sendMailPlanDate\" maxlength=\"10\" id=\"selDate\" class=\"txt_c wp95 datepicker js_frDatePicker\" />"
                     + "<span class=\"picker-acs icon-date display_flex cursor_pointer iconKikanStart\"></span>"
                     + "<span class=\"clockpicker ml5 pos_rel display_flex input-group\">"
                     + "<input type=\"text\" name=\"wml010sendMailPlanTime\" maxlength=\"5\" id=\"clock_rsv\" class=\"clockpicker js_clockpicker txt_c wp60\" />"
                     + "<label for=\"clock_rsv\" class=\"picker-acs cursor_pointer icon-clock input-group-addon\"></label>"
                     + "</span>"
                     + "</div>";
    $('#sendPlanDateValueArea').html(sendPlanDateHtml);

    $.each($('.js_frDatePicker'), function() {
        startDatePicker($(this), 0);
    });
    $.each($('.js_clockpicker'), function() {
        startClockPicker($(this));
    });

    if (mailData != null) {

        //送信メール区分(返信、転送 等)を設定
        setParamValue('wml010sendMailType', mailkbn);

        //宛先、CC、BCC入力欄を設定
        setEditorAddrHtml(unescapeHtml(mailData.to), 0);
        setEditorAddrHtml(unescapeHtml(mailData.cc), 1);
        setEditorAddrHtml(unescapeHtml(mailData.bcc), 2);

        $('input[name=wml010sendSubject]').val(unescapeHtml(decodeURIComponent(mailData.subject)));

//        tinyMceInit();
        var mailBodyText = decodeURIComponent(mailData.content);
        mailBodyText = mailBodyText.replace(/<BR>/g, '\r\n');
        mailBodyText = mailBodyText.replace(/&nbsp;/g, ' ');
        mailBodyText = unescapeHtml(mailBodyText);
        $('textarea[name=wml010sendContent]').val(mailBodyText);
        $('#inputlength').html(mailBodyText.length);

        if (mailkbn == 4 || mailkbn == 11) {
            //草稿  複写
            if (mailData.sendFormat == 2) {

                if (mailData.sendFormat == 2) {
                    changeSendMailType(1);
                } else {
                    changeSendMailType(0);
                }
                $('input:hidden[name=wml010sendContentHtml]').val(mailBodyText);
                setTextHtmlAreaStr();

            } else {

                if (mailData.sendFormat == 2) {
                    changeSendMailType(0);
                } else {
                    changeSendMailType(1);
                }
                $('textarea[name=wml010sendContent]').val(mailBodyText);
                $('#inputlength').html(mailBodyText.length);

            }

        } else {
            if (mailkbn == 0) {
                //新規作成
                setParamValue('wml010sendMessageNum', '');
            }

            if (mailData.sendFormat == 2) {
                changeSendMailType(1, true);
            }

        }
        mailBodyText = null;

        //メール本文テキストエリアのキャレットを先頭に設定し、カーソルを宛先に変更
        document.getElementsByName('wml010sendContent')[0].selectionEnd = 0;
        document.getElementsByName('wml010sendContent')[0].selectionStart = 0;
        document.getElementsByName('wml010sendAddressTo')[0].selectionEnd = 0;
        document.getElementsByName('wml010sendAddressTo')[0].selectionStart = 0;
        $('#composeTo').focus();


        //宛先・CC・BCCの入力補完に使用するメールアドレスリストを作成
        var mailAddressList = new Array();
        if (shainMailList) {
            mailAddressList = mailAddressList.concat(shainMailList);
        }
        if (addressMailList) {
            mailAddressList = mailAddressList.concat(addressMailList);
        }
        //メールアドレスリストから重複を除外する
        try {
            mailAddressList = Array.from(new Set(mailAddressList));
        } catch (e) {
            mailAddressList = mailAddressList.filter(function (x, i, self) {
                return self.indexOf(x) === i;
            });
        }

        var inputIdx;
        var searchTerm, nowTerm;
        //宛先・CC・BCCの入力補完を設定
        $( ".js_wml010AddressText" ).autocomplete({
            autoFocus: true,
            delay: 1000,
            minLength: 2,
            source: function(request, response) {
              var cursorIdx = 0;
              if (this.element.context) {
                  cursorIdx = this.element[0].selectionStart;
              }
              nowTerm = request.term;
              searchTerm = getInputTerm(nowTerm, cursorIdx).toLowerCase();
              var list = [];
              list = mailAddressList.filter(function (mailAddress) {
                  if (searchTerm.length < 2) {
                      return false;
                  }
                  inputIdx = searchTerm;
                  return mailAddress.indexOf(searchTerm) === 0; //前方一致で候補を抽出する
              });
              response(list);

            }, focus: function(event, ui) {
                var startIdx = 0;
                if (nowTerm.indexOf(',') < 0) {
                    this.value = ui.item.value + ",";
                } else {
                    //補完対象に","が含まれる場合「一番最後の","の後ろ」を入力補完対象とする
                    allMailTxt = nowTerm;
                    startIdx = allMailTxt.lastIndexOf(',') + 1;
                    allMailTxt = allMailTxt.substring(0, startIdx);
                    this.value = allMailTxt + ui.item.value + ",";
                    allMailTxt = null;
                }

                //テキストボックスに表示した候補を選択状態にする
                this.selectionStart = startIdx + inputIdx.length;
                this.selectionEnd = this.value.length;
                this.focus();

                return false;
            }, select: function(event, ui) {
                //選択状態を解除する
                this.selectionStart = this.value.length;
                this.selectionEnd = this.value.length;
                this.focus();
                return false;
            }
        });

        //添付ファイルのパラメータを設定
        setParamValue('compressFileType', mailData.compressFileType);
        setParamValue('compressFileDef', mailData.compressFileDef);
        setParamValue('compressFilePlan', mailData.compressFilePlan);

        //予約送信入力項目の初期値を設定
        if (mailData.timeSent == "true") {
            $('#sendPlanDateKbnCheck').prop("checked", true);
        } else {
            $('#sendPlanDateKbnCheck').prop("checked", false);
        }
        if (mailData.timeSentType == 1) {
            if (mailData.timeSentDef == 1) {
                $('#sendPlanImm1').attr("checked", true);
            } else if (mailData.timeSentDef == 2) {
                $('#sendPlanImm2').attr("checked", true);
            }
            $('#sendPlanImmArea').removeClass('display_none');
        }
        var year = mailData.timeSentYear;
        var month = ("0" + mailData.timeSentMonth).slice(-2);
        var day = ("0" + mailData.timeSentDay).slice(-2);
        var hour = ("0" + mailData.timeSentHour).slice(-2);
        var minute = ("0" + mailData.timeSentMinute).slice(-2);
        $('input[name="wml010sendMailPlanDate"]').val(year + "/" + month + "/" + day);
        $('input[name="wml010sendMailPlanTime"]').val(hour + ":" + minute);

        //署名コンボボックスを設定
        document.getElementById('sendSignCombo').innerHTML = createSignCombo(mailData.sendSign);

        //送信先リストを設定
        setTemplateList(mailData.mailTemplate);

        //テンポラリディレクトリIDを設定
        setParamValue("wml010tempDirId", mailData.tempDirId);

        //添付ファイル表示
        if (mailData.fileList) {
            createTempArea();
            for (tempIdx = 0; tempIdx < mailData.fileList.length; tempIdx++) {
                setEditorTempFile(mailData.fileList[tempIdx]);
            }
        }
    }

    //予約送信入力欄の表示/非表示設定
    viewSendPlanDate();
}

function getInputTerm(term, cursorIdx) {
    var inputTerm = term;
    var lastIdx = inputTerm.lastIndexOf(',');

    //カーソル位置が","の前だった場合、検索を行わない
    if (lastIdx > 0 && lastIdx + 1 < inputTerm.length
        && lastIdx < cursorIdx) {
        inputTerm = inputTerm.substring(lastIdx + 1, inputTerm.length);
        inputTerm = inputTerm.trim();
    }
    return inputTerm;
}


function unescapeHtml(target) {
    if (typeof target !== 'string') return target;

    var patterns = {
        '&lt;'   : '<',
        '&gt;'   : '>',
        '&amp;'  : '&',
        '&quot;' : '"',
        '&nbsp;' : ' ',
        '&#x27;' : '\'',
        '&#x60;' : '`'
    };

    return target.replace(/&(lt|gt|amp|quot|nbsp|#x27|#x60);/g, function(match) {
        return patterns[match];
    });
};

function sendMailFileDelete(fileName, tmpDirId) {

    $('#sendFile_' + fileName).remove();
    $('#sendFile_confirm_' + fileName).remove();

    if (document.getElementsByName('sendFile_Links').length == 0) {
        $('#composeTempFile').addClass('display_none');
    }

    try {
        var paramStr = "CMD=sendFileDelete";
        paramStr += "&wmlViewAccount=" + getAccount();
        paramStr += "&wml010sendMailDownloadFile=" + fileName;
        paramStr += "&wml010tempDirId=" + tmpDirId;

        $.ajax({
            async: true,
            url:  "../webmail/wml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {

            closeloading();
        }).fail(function(data){
            alert(msg);
        });

    } catch (ae) {
        alert(msg + ae);
    } finally {
        closeloading();
    }
}


function messagePop(msg, width, height) {

    $('#messageArea').html("");
    $('#messageArea').append(msg);
    $('#messagePop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: height,
        width: width,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
            text:msglist_wml010["cmn.ok"],
            click: function() {
                $(this).dialog('close');
                $('#errorMsgArea').html("");
            }
        }]
    });
}

/*読み込み中ダイアログ*/
function loadingPop(popTxt) {

    $('#loading_pop').dialog({
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 100,
        width: 250,
        modal: true,
        title: popTxt,
        closeOnEscape: false,
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
        setTimeout('closeloading();',150)
    }
}

function closeloading() {
    if ($('#loading_pop') != null && closeLoadingFlg) {
        $('#loading_pop').dialog('close');
    }
}

function closeLoadingFlgChange() {
    closeLoadingFlg = true;
}

function contextRead(kbn, elm, searchFlg) {

    try {
        doContextRead(kbn, $(elm).data('mailnum'), searchFlg, false);
    } catch (ae) {
        alert(ae);
    }
}

function contextAllRead(kbn, directoryId) {

    var cmdStr = "readedMailAll";
    var msgPopStr = msglist_wml010['sml.sml010.15'];
    var msg = msglist_wml010["sml.202"];
    if (kbn != 0) {
        cmdStr = "noReadMailAll";
        msgPopStr = msglist_wml010['sml.sml010.16'];
        msg = msglist_wml010["sml.203"];
    }

    loadingPop(msglist_wml010['cmn.loading']);

    try {
        var paramStr = "CMD=" + cmdStr;
        paramStr += "&wmlViewAccount=" + getAccount();
        paramStr += "&wml010viewDirectory=" + directoryId;

        $.ajax({
            async: true,
            url:  "../webmail/wml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            document.forms[0].CMD.value='getMailList';
            getMailData();

            if(mail_search_list_flg) {
                document.forms[0].CMD.value='detailSearch';
                getSearchData(true, false);
            }

        }).fail(function(data){
            closeloading();
            alert(msg);
        });

    } catch (ae) {
        closeloading();
        alert(msg + ae);
    }

}

function doContextRead(kbn, mailNum, searchFlg, reloadFlg) {

    //対象メールが状態変更済みの場合、処理を終了する
    var selectMailIdx = getSelectMailIndex(mailNum, false);
    var selectSearchMailIdx = getSelectMailIndex(mailNum, true);
    var mailData;
    if (searchFlg) {
        mailData = searchListData[selectSearchMailIdx];
    } else {
        mailData = mailListData[selectMailIdx];
    }

    if ((kbn != 0 && mailData.Readed == false) || (kbn == 0 && mailData.Readed == true)) {
        return;
    }

    var cmdStr = "readedMail";
    var msgPopStr = msglist_wml010['sml.sml010.15'];
    var msg = msglist_wml010["sml.202"];
    if (kbn != 0) {
        cmdStr = "noReadMail";
        msgPopStr = msglist_wml010['sml.sml010.16'];
        msg = msglist_wml010["sml.203"];
    }

    try {

        if (reloadFlg) {
            loadingPop("");
        }

        document.forms[0].CMD.value=cmdStr;
        document.forms[0].wml010selectMessageNum.value=mailNum;
        var paramStr = "";
        paramStr += getFormData($('#webmailForm'));

        $.ajax({
            async: true,
            url:  "../webmail/wml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (reloadFlg) {
                //画面の再描画
                closeloading();
                reloadData();
            } else {
                //再描画を行わない場合、対象メールの表示を変更
                changeMailReadedView(mailNum, kbn);

                //メール一覧情報の未読/既読を変更する
                if (selectMailIdx >= 0) {
                    mailListData[selectMailIdx].Readed = (kbn == 0);
                }
                if (selectSearchMailIdx >= 0) {
                    searchListData[selectSearchMailIdx].Readed = (kbn == 0);
                }

                //メールの保管先ディレクトリが予約送信、草稿以外の場合、未読件数を更新する
                //※予約送信、草稿ディレクトリ右の件数は「ディレクトリ内の全メール件数」のため
                if (mailData.dirType != 3 && mailData.dirType != 4) {
                    for (dirIdx = 0; dirIdx < treeData.directory.length; dirIdx++) {
                        dirType = treeData.directory[dirIdx].TYPE;
                        if ($('#wmllist_folder_' + dirType) && dirType == mailData.dirType) {
                            var dirMidokuCnt = treeData.directory[dirIdx].NRCNT;
                            if (kbn != 0) {
                                dirMidokuCnt++;
                            } else if (dirMidokuCnt > 0) {
                                dirMidokuCnt--;
                            }

                            //未読・既読件数を設定
                            if (dirMidokuCnt > 0) {
                                $('#wmllist_folder_count_' + dirType).html('(' + dirMidokuCnt + ')');
                            } else {
                                $('#wmllist_folder_count_' + dirType).html('');
                            }

                            treeData.directory[dirIdx].NRCNT = dirMidokuCnt;
                        }
                    }
                }

                //対象メールにラベルが設定されている場合、ラベルの未読件数を更新する
                if (mailData.LabelId.length > 0 && treeData.label.length > 0) {

                    for (mailIdx = 0; mailIdx < mailData.LabelId.length; mailIdx++) {
                        for (i = 0; i < treeData.label.length; i++) {
                            if (mailData.LabelId[mailIdx] == treeData.label[i].ID) {
                                var labelMidokuCnt = treeData.label[i].NRCNT;
                                if (kbn != 0) {
                                    labelMidokuCnt++;
                                } else if (labelMidokuCnt > 0) {
                                    labelMidokuCnt--;
                                }

                                //未読・既読件数を設定
                                if (labelMidokuCnt > 0) {
                                    $('#wmllist_label_count_' + treeData.label[i].ID).html('&nbsp;(' + labelMidokuCnt + ')');
                                } else {
                                    $('#wmllist_label_count_' + treeData.label[i].ID).html('');
                                }

                                treeData.label[i].NRCNT = labelMidokuCnt;
                                break;
                            }
                        }
                    }
                }
            }
        }).fail(function(data){
            alert(msg);
        });

    } catch (ae) {
        alert(msg + ae);
    } finally {
        if (reloadFlg) {
            closeloading();
        }
    }

}

function changeMailReadedView(mailNum, kbn) {
    var listElmClass = '.js_mailListElm' + mailNum;
    if (kbn != 0) {
        //未読
        $(listElmClass).addClass('fw_bold');
        $(listElmClass + '-line').removeClass('js_mailContent-kidoku');
        $(listElmClass + '-line').addClass('js_mailContent-midoku');
        $(listElmClass + '-link').removeClass('cl_linkVisit');
        $(listElmClass + '-link').addClass('cl_linkDef');
        $(listElmClass + '-readed').html(getMidokuIconHtml());
    } else {
        //既読
        $(listElmClass).removeClass('fw_bold');
        $(listElmClass + '-line').removeClass('js_mailContent-midoku');
        $(listElmClass + '-line').addClass('js_mailContent-kidoku');
        $(listElmClass + '-link').removeClass('cl_linkDef');
        $(listElmClass + '-link').addClass('cl_linkVisit');
        $(listElmClass + '-readed').html('');
    }
}


function doContextAllRead(kbn) {

    var cmdStr = "allRead";
    var msgPopStr = msglist_wml010['sml.sml010.17'];
    var msg = msglist_wml010["sml.202"];
    if (kbn != 0) {
        cmdStr = "allNoRead";
        msgPopStr = msglist_wml010['sml.sml010.18'];
        msg = msglist_wml010["sml.203"];
    }

    try {

        loadingPop("");

        document.forms[0].CMD.value=cmdStr;
        var paramStr = "";
        paramStr += getFormData($('#webmailForm'));

        $.ajax({
            async: true,
            url:  "../webmail/wml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                closeloading();
            } else {
                alert(msg);
            }
       }).fail(function(data){
            alert(msg);
        });

    } catch (ae) {
        alert(msg + ae);
    } finally {
        closeloading();
    }

}

function resetParam() {
//    $('input:hidden[name=wml010sortKey]').val(3);
//    $('input:hidden[name=wml010order]').val(1);
    $('input:hidden[name=wml010selectPage]').val(1);
    $('input:hidden[name=wml010selectMessageNum]').val(0);
    $('input:hidden[name=tempDspFlg]').val(0);
}

function htmlEscape(s){

    return $('<span></span>').text(s).html()

}

function textBr(txtVal){
    txtVal = txtVal.replace(/\r?\n/g, "<br />");
    return txtVal;
}

function replaceAll(expression, org, dest){
    return expression.split(org).join(dest);
}

function resetSid() {
    //一通りの処理終了後に不要なSIDを保持しているとエラーのもとになるためリセット
    document.forms[0].wml010selectMessageNum.value = 0;
}

function getSidEscape() {

    //モードを一時的に詳細メールのモードに戻す
    document.forms[0].wml010viewDirectoryType.value = document.forms[0].dirTypeEsc.value;

    //退避していた詳細メールのSIDを取得する
    var selectedSid = document.forms[0].selectMailNumEsc.value;
    var editSid = document.forms[0].editMailNumEsc.value;
    if (selectedSid != 0) {
        editSid = selectedSid;
    } else if (editSid != 0){
        selectedSid = editSid;
    }

    //草稿モード且つ次へボタンクリック = 事前に開いていた詳細メールのボタンクリック
    //事前に退避していた詳細メールのSIDを取得する
    if (selectedSid != 0 && editSid != 0) {
        document.forms[0].wml010selectMessageNum.value = selectedSid;
    }

}

var wmlEditorBeforeUnloadManager = {
    isOpenEditor : false,
    isTemporary : false,
    /**
     * メール作成画面を開いている間のonUnload時に警告を行うイベントリスナー関数
     * アラートに表示するメッセージを変更する
     * ieとEdge以外はブラウザの仕様で現在はメッセージの変更はできない
     * @returns {}
     */
    unload : function (e) {
        if (wmlEditorBeforeUnloadManager.isTemporary) {
            wmlEditorBeforeUnloadManager.isTemporary = false;
            return;
        } else {
            var mes = msglist_wml010['sml.js.1'];
            e.returnValue = mes;
        }
    },
    /**
     * beforUnloadイベントリスナーのONにする
     * @returns {}
     */
    on : function() {
       if (!this.isOpenEditor) {
           window.addEventListener('beforeunload', this.unload, false);
           this.isOpenEditor = true;
       }
    },
    /**
     * beforUnloadイベントリスナーのOFFにする
     * @returns {}
     */
    off : function() {
       if (this.isOpenEditor) {
           window.removeEventListener('beforeunload', this.unload, false);
           this.isOpenEditor = false;
       }
    },
    /**
     * unloadイベントを無効化する
     * @returns {}
     */
    onTemporary : function() {
        this.isTemporary = true;
    },
    /**
     * unloadイベントを有効化する
     * @returns {}
     */
    offTemporary : function() {
        this.isTemporary = false;
    }
}

function warning_alert() {
    wmlEditorBeforeUnloadManager.onTemporary();

    $('#warningPop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height:160,
        width: 400,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [
            {
              text:msglist_wml010["cmn.ok"],
              click: function() {
                  window.parent.callSmailWindowClose();
              }
            },
            {
                text:msglist_wml010["cmn.cancel"],
                click: function() {
                    wmlEditorBeforeUnloadManager.offTemporary();
                    $(this).dialog('close');
                }
            }
        ]
    });
}

function setEditorAddrHtml(editorAddr, type) {
    var txtName;
    var iconTail;

    if (type == 0) {
        txtName = 'wml010sendAddressTo';
        iconTail = 'To';
    } else if (type == 1) {
        txtName = 'wml010sendAddressCc';
        iconTail = 'Cc';
    } else if (type == 2) {
        txtName = 'wml010sendAddressBcc';
        iconTail = 'Bcc';
    }

    //メール送信 アドレス帳アイコン
    iconObj = $('#sendAdrIcon' + iconTail);
    iconObj.removeClass('display_none');
    iconObj.removeClass('visible_hide');
    if (getParamValue('wml010pluginAddressUse') != 0) {
        iconObj.addClass('display_none');
        iconObj.addClass('visible_hide');
    }

    //メール送信 ユーザ情報アイコン
    iconObj = $('#sendSyainIcon' + iconTail);
    iconObj.removeClass('display_none');
    iconObj.removeClass('visible_hide');
    if (getParamValue('wml010pluginUserUse') != 0) {
        iconObj.addClass('display_none');
        iconObj.addClass('visible_hide');
    }

    //メール送信 送信先リストアイコン
    iconObj = $('#sendDestIcon' + iconTail);
    iconObj.removeClass('display_none');
    if (getParamValue('wml010pluginAddressUse') != 0 || getParamValue('wml010pluginUserUse') != 0) {
        iconObj.addClass('display_none');
        iconObj.addClass('visible_hide');
    }

    if (editorAddr) {
        setParamValue(txtName, editorAddr);
    }
}


function changeSendSign() {

    loadingPop("処理中");

    setCMD('changeSendSign');

    var paramStr = "";
    paramStr += getFormData($('#webmailForm'));
    $.ajax({
        async: true,
        url:"../webmail/wml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        try {
            changeMailBody(decodeURIComponent(data.sendBody));
            setParamValue('wml010sendSignOld', getSelectBoxValue('wml010sendSign'));
        } catch (ae) {
            clearErrorMessage();
            alert(ae);
        } finally {
            $('#loading_pop').dialog('close');
        }
    }).fail(function(data){
        $('#loading_pop').dialog('close');
    });
}

function isOpenEditor() {
    return mail_create_flg;
}

function getListCheckSid(searchFlg) {
    var listCheckName = 'wml010ListSid';
    if (searchFlg) {
        listCheckName = 'wml010ListSearchSid';
    }

    return $('input[name=' + listCheckName + ']:checked').map(function(){
                return $(this).val();
            }).get();
}

function requestMailOnce(cmd, errMessage, searchFlg, detailCloseFlg) {
    doRequestMailList(cmd, errMessage, searchFlg, true,
                    new Array(getDetailMailNum()), detailCloseFlg);
}

function requestMailList(cmd, errMessage, searchFlg, sidNoCheckFlg, notReloadFlg) {
    var selectSidList = getListCheckSid(searchFlg);
    doRequestMailList(cmd, errMessage, searchFlg, sidNoCheckFlg, selectSidList, false);
}

function doRequestMailList(cmd, errMessage, searchFlg, sidNoCheckFlg, selectSidList, detailCloseFlg) {
    if (!sidNoCheckFlg && (selectSidList == null || selectSidList.length == 0)) {
        //対象メールが選択されていない場合、警告を表示
        alert(msglist.mailSelect);
    } else {
        if ($('#loading_pop').dialog("isOpen") != true) {
            loadingPop(msglist_wml010['cmn.loading']);
        }

        var requestUrl;
        if (searchFlg) {
            requestUrl = getRequestMailListURL(cmd, searchListData, selectSidList);
            //選択したメールSIDがメール一覧にない場合の処理
            var nonExistSid = [];
            if (searchListData) {
                for (sidIdx = 0; sidIdx < selectSidList.length; sidIdx++) {
                    var existFlg = false;
                    for (i = 0; i < searchListData.length; i++) {
                        if (selectSidList[sidIdx] == searchListData[i].XID) {
                            existFlg = true;
                            break;
                        }
                    }
                    if (existFlg == false) {
                        nonExistSid.push(selectSidList[sidIdx]);
                    }
                }
            }
            for (var idx = 0; idx < nonExistSid.length; idx++) {
                requestUrl += '&wml010selectMessageNum=' + nonExistSid[idx];
            }
        } else {
            requestUrl = getRequestMailListURL(cmd, mailListData, selectSidList);
            //選択したメールSIDがメール一覧にない場合の処理
            var nonExistSid = [];
            if (mailListData) {
                for (sidIdx = 0; sidIdx < selectSidList.length; sidIdx++) {
                    var existFlg = false;
                    for (i = 0; i < mailListData.length; i++) {
                        if (selectSidList[sidIdx] == mailListData[i].XID) {
                            existFlg = true;
                            break;
                        }
                    }
                    if (existFlg == false) {
                        nonExistSid.push(selectSidList[sidIdx]);
                    }
                }
            }
            for (var idx = 0; idx < nonExistSid.length; idx++) {
                requestUrl += '&wml010selectMessageNum=' + nonExistSid[idx];
            }
        }

        $.ajax({
            async: true,
            url: requestUrl,
            type: "post"
        }).done(function( data ) {
            try {
                if (data.message == 'success') {
                    if (detailCloseFlg) {
                        //メール詳細を閉じる(メール一覧の再表示)
                        closeMailDetail();
                    } else {
                        loadingPop(msglist_wml010['cmn.loading']);
                        //メール一覧の再表示
                        if (searchFlg) {
                            reloadData();
                        } else {
                            setCMD('getMailList');
                            getMailData();
                        }
                    }
                } else {
                    $('#loading_pop').dialog('close');
                    alert(data.message);
                }

            } catch (ae) {
                $('#loading_pop').dialog('close');
                alert(ae);
            }
        }).fail(function(data){
            $('#loading_pop').dialog('close');
            alert(errMessage);
        });
    }
}

function getRequestMailListURL(cmd, recordData, sidList) {
    var url = '../webmail/wml010.do';
    url += '?CMD=' + cmd;
    url += '&wmlViewAccount=' + getAccount();

    if (recordData) {
        for (i = 0; i < recordData.length; i++) {
            for (sidIdx = 0; sidIdx < sidList.length; sidIdx++) {
                if (recordData[i].XID == sidList[sidIdx]) {
                    url += '&wml010selectMessageNum=' + recordData[i].XID;
                    url += '&wml010selectMessageDirId=' + recordData[i].dirId;
                }
            }
        }
    }
    return url;
}

//予約送信
function viewSendPlanDate() {
    if ($('#sendPlanDateKbnCheck').is(':checked')) {
        $('#sendPlanDateValueArea').show();
        $('#sendPlanImmArea').hide();
        $('#sendPlanImm').attr('checked', false);
    } else {
        $('#sendPlanDateValueArea').hide();
        $('#sendPlanImmArea').show();
    }
}

function setSendplanCombo(editorHtml, paramName, elName, startValue, endValue, incValue) {
    editorHtml += ' &nbsp;<select name=\"' + paramName + '\">';

    for (opValue = startValue; opValue <= endValue; opValue += incValue) {
        editorHtml += '<option value=\"' + opValue + '\">' + opValue + '</option>';
    }
    editorHtml += '</select>&nbsp;' + elName;
    return editorHtml;
}

//一覧の表示項目に改行(<wbr>)を追加
function formatViewListElement(value) {
    if (value == undefined || value.length <= 20) {
        return value;
    }

    var formatValue = '';
    if (value.indexOf('&') < 0) {
        for (idx = 0; idx < value.length; idx = idx + 20) {
            formatValue += value.substring(idx, idx + 20);
            formatValue += '<wbr>';
        }
    } else {
        formatValue = value;

        var replaceStr = new Array('..', '@', '-', '_', '&&')
        formatValue = formatValue.replace(/\//g, '<wbr>' + '/');
        formatValue = formatValue.replace(/\./g, '<wbr>' + '.');
        formatValue = formatValue.replace(/,/g, '<wbr>' + ',');
        formatValue = formatValue.replace(/&/g, '<wbr>' + '&');
        formatValue = formatValue.replace(/@/g, '<wbr>' + '@');
        formatValue = formatValue.replace(/-/g, '<wbr>' + '-');
        formatValue = formatValue.replace(/_/g, '<wbr>' + '_');
    }

    return formatValue;
}

//メールヘッダ情報をポップアップで表示
function openMailHeader(mailNum) {
    var detailWidth = 700;
    var detailHeight = 500;

    window.open('../webmail/wml011.do?wml011mailNum=' + mailNum, '_blank', 'width=' + detailWidth
              + ',height=' + detailHeight + ',titlebar=no,toolbar=no,scrollbars=yes'
              + ', left=' + getWml010CenterX(detailWidth) + ', top=' + getWml010CenterY(detailHeight));
    return false;
}

function getWml010CenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getWml010CenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}

function getMailListData(searchFlg) {
    if (searchFlg) {
        return searchListData;
    }

    return mailListData;
}

function isSearchTabSelect() {
    return  now_sel_tab == 'mail_search_list_tab';
}

function allTmpDownload(messageNum) {
    var taihi = {
       CMD : getWml010Form().CMD.value,
       wml010downloadMessageNum : getWml010Form().wml010downloadMessageNum.value
    }
    var isEdit = wmlEditorBeforeUnloadManager.isOpenEditor;
    if (isEdit) {
        wmlEditorBeforeUnloadManager.onTemporary();
    }
    getWml010Form().CMD.value = 'allTmpExp';
    getWml010Form().wml010downloadMessageNum.value = messageNum;
    getWml010Form().submit();

    window.setTimeout(function() {
            getWml010Form().CMD.value = taihi.CMD;
            getWml010Form().wml010downloadMessageNum.value = taihi.wml010downloadMessageNum;
        }, 0);

}

//メール作成 署名コンボボックスの設定
function createSignCombo(signData) {
    var defSign = 0, comboHtml = '';

    $('#sendSignSetting').hide();
    if (signData.length <= 0) {
        $('#composeSendSign').hide();
    } else {
        $('#composeSendSign').show();
        if (signData.length == 1) {
            $('#sendSignSetting').show();
        }
    }

    for (saIndex = 0; saIndex < signData.length; saIndex++) {
        comboHtml += '        <option value="' + signData[saIndex].ID + '"';
        if (signData[saIndex].DEF == 1) {
            comboHtml += ' selected';
            defSign = signData[saIndex].ID;
        }
        comboHtml += '>' + signData[saIndex].NAME + '</option>';
    }
    setParamValue('wml010sendSignOld', defSign);
    return comboHtml;
}

//メール作成 テンプレート一覧の設定
function setTemplateList(templateData) {
    var listHtml = '';

    if (templateData.length <= 1) {
      $('#composeSendTemplate').hide();
    } else {
      $('#composeSendTemplate').show();
    }

    $('#sendTemplateList tbody').empty();
    $('#sendTemplateList tbody').append('<tr class="display_none mt20"></tr>');

    for (tpIndex = 0; tpIndex < templateData.length; tpIndex++) {
        listHtml = '<tr class="js_templateSelTxt2 js_listHover cursor_p" data-templateid="' + templateData[tpIndex].ID + '">';

        listHtml += '<td class="w100 border_left_none border_top_none">'
            + '<span class="js_templateSelTxt3 cl_linkDef">'
            + templateData[tpIndex].NAME
            + ' <span class="tooltips display_none">'
            + '件名:' + templateData[tpIndex].TITLE + '<br>'
            + '内容:<br><br>' + templateData[tpIndex].BODY
            + ' </span>'
            + '</span>';

        listHtml += '</td></tr>';
        $('#sendTemplateList tbody').append(listHtml);
    }



//    $(".template_sel_txt").mouseover(function(e){
//
//        var txtVal = $(this).children("span.tooltips").html();
//        txtVal = txtVal.replace(/\r\n/g, "<br />");
//        txtVal = txtVal.replace(/(\n|\r)/g, "<br />");
//
//         $("#tooltip_area").append("<div id=\"ttp\">"+ (txtVal) +"</div>");
//         $("#ttp")
//          .css("position","absolute")
//          .css("top",(e.pageY) + -90 + "px")
//          .css("left",80 + "px")
//          .removeClass('display_none')
//          .css("filter","alpha(opacity=85)")
//          .fadeIn("fast");
//     }).mouseout(function(){
//         $("#ttp").remove();
//     });
}

//メールテンプレートポップアップからテンプレートを選択した際の処理
function setMailTemplate(templateId) {

    $('#mailTemplatePop').dialog('close');
    loadingPop(msglist_wml010['cmn.loading']);

    setSendBody();

    var formData = getFormData($('#webmailForm'));

    var cursorType = isEditorHtml()?'1':'0';
    var cursorIdx = document.getElementsByName('wml010sendContent')[0].selectionStart;
    if (!cursorIdx) {
        cursorType = 0;
    }
    var templateUrl = '../webmail/wml010.do?CMD=setMailTemplate'
                                + '&wml010sendTemplate=' + templateId
                                + '&wml010sendContentCursor=' + cursorIdx
                                + '&wml010sendContentCursorType=' + cursorType;
    var tempDirId = getTempDirId();
    if (tempDirId != null) {
        templateUrl += '&wml010tempDirId=' + tempDirId;
    }

    //データ取得
    $.ajax({
        async: true,
        url: templateUrl,
        type: "post",
        data:formData
    }).done(function( data ) {
        try {
            if (data) {
                setParamValue('wml010sendSubject', decodeURIComponent(data.subject));
                if (isEditorHtml()) {
                    var oldIEFlg = false;
                    if (jQuery.browser.msie) {
                        oldIEFlg = !jQuery.support.cors;
                        if (!oldIEFlg) {
                            var obj = $('#html_input').get(0);
                            obj.focus();
                        }
                    }

                    if (tinyMCE.get('#html_input')) {
                        if (!oldIEFlg) {
                            tinyMCE.get('#html_input').selection.setContent(
                                    wmlFormatHtml(decodeURIComponent(data.templateBody)));
                        } else {
                            changeMailBody(decodeURIComponent(data.content));
                        }
                    }
                } else {
                    changeMailBody(decodeURIComponent(data.content));
                }

                var sendTempFile = data.fileList;
                if (sendTempFile.length > 0) {
                    // テンプレートに添付ファイルがある場合
                    if (!getTempDirId()) {
                        setTempDirId(data.tempDirId);
                    }
                    $('#composeTempFile').empty();
                    createTempArea();
                    for (tempIdx = 0; tempIdx < sendTempFile.length; tempIdx++) {
                        setEditorTempFile(sendTempFile[tempIdx]);
                    }
                }
            } else {
                clearErrorMessage();
                alert(msglist_wml010["zsk.10"]);
            }
            $('#mailTemplatePop').dialog('close');
        } catch (e) {
            alert(msglist_wml010["zsk.10"]);
        } finally {
            closeloadingPop();
        }
    }).fail(function(data){
        closeloadingPop();
        alert(msglist_wml010["zsk.10"]);
    });
}

//アカウントディスク容量の警告表示
function writeAccountDiskData(data) {
    $('#limitDiskArea').hide();
    $('#useDiskSize').html(data.useDiskSize);

    if (data.limitDiskSize > 0) {
        document.getElementById('limitDiskArea').style.display='inline-block';
        $('#limitDiskSize').html(data.limitDiskSize);
        $('#useDiskRatio').html(data.useDiskRatio);
    }

    if (data.warnDiskRatio > 0) {
        $('#warnDiskArea').removeClass('display_none');
        $('#warnDiskRatio').html(data.warnDiskRatio);
    }
}

//検索結果一覧の再表示
function searchResultLoad(searchType) {
    $('#search_area_table').removeClass('display_none');

    setParamValue('CMD', 'detailSearch');
    setParamValue('wml010searchType', searchType);

    getSearchData(true);
}

//詳細検索
function searchResultLoadInit(searchType) {
    setParamValue('wml010selectPage', 0);
    setParamValue('wml010searchSortKey', 0);
    setParamValue('wml010searchOrder', 0);
    setParamValue('wml010searchPageTop', 0);
    searchResultLoad(searchType);
}

function shareTabClose() {
    document.forms[0].wml010smlShareCloseFlg.value = 1;
}

//"メール一覧"タブに表示したメール詳細情報の各値をクリア
function clearKakuninValue() {
    mail_kakunin_flg = false;
    mail_kakunin_sid = 0;
}

//"検索結果一覧"タブに表示したメール詳細情報の各値をクリア
function clearSearchKakuninValue() {
    mail_search_kakunin_flg = false;
    mail_search_kakunin_sid = 0;
}

//"検索結果"タブを表示しているかを判定
function isSearchTabView() {
    return (now_sel_tab == 'mail_search_list_tab');
}

//メール一覧 未読アイコンのHTML取得
function getMidokuIconHtml() {
    return '<img class="classic-display" src="../common/images/classic/icon_mail.png" ' + msglist_wml010['cmn.read.yet'] + '>'
        + '<img class="original-display" src="../common/images/original/icon_midoku_15.png" ' + msglist_wml010['cmn.read.yet'] + '>';
}

//メール詳細から添付ファイルを削除した際の処理
function deleteMailTempfileData(messageNum, deleteFileId) {
    var selectMailIdx = getSelectMailIndex(messageNum, false);
    if (selectMailIdx >= 0) {
        if (mailListData[selectMailIdx].fileId.length > 0) {
            var index = mailListData[selectMailIdx].fileId.indexOf(deleteFileId);
            if (index > -1) {
                mailListData[selectMailIdx].fileId.splice(index, 1);
                mailListData[selectMailIdx].fileName.splice(index, 1);
                mailListData[selectMailIdx].fileSize.splice(index, 1);
            }

            //添付ファイル0件の場合、一覧から添付アイコンを削除
            if (mailListData[selectMailIdx].fileId.length == 0) {
                $('.js_mailListElm' + messageNum + '-file').html('');
            }

            //詳細画面再表示
            if (isSearchTabView() == false && mail_kakunin_sid == messageNum) {
                getDetail(messageNum, -1, false, false, 0);
            }
        }

    }

    var selectSearchMailIdx = getSelectMailIndex(messageNum, true);
    if (selectSearchMailIdx >= 0) {
        if (searchListData[selectSearchMailIdx].fileId.length > 0) {
            var index = searchListData[selectSearchMailIdx].fileId.indexOf(deleteFileId);
            if (index > -1) {
                searchListData[selectSearchMailIdx].fileId.splice(index, 1);
                searchListData[selectSearchMailIdx].fileName.splice(index, 1);
                searchListData[selectSearchMailIdx].fileSize.splice(index, 1);
            }

            //添付ファイル0件の場合、一覧から添付アイコンを削除
            if (searchListData[selectSearchMailIdx].fileId.length == 0) {
                $('.js_mailListElm' + messageNum + '-file').html('');
            }

            //詳細画面再表示
            if (isSearchTabView() && mail_search_kakunin_sid == messageNum) {
                getDetail(messageNum, -1, true, false, 0);
            }
        }
    }
}

//メール一覧のチェックボックス チェック状態を変更
function changeAllListCheck(chkFlg, searchFlg) {
    var delAry;
    if (searchFlg) {
        delAry = document.getElementsByName("wml010ListSearchSid");
    } else {
        delAry = document.getElementsByName("wml010ListSid");
    }

    for(i = 0; i < delAry.length; i++) {
        delAry[i].checked = chkFlg;
    }

    delAry = null;
}


//タブの位置までスクロール
function wmlScrollTop() {
    $("#mail_list_tab").get(0).scrollIntoView(true)
}

//画面一番上までスクロール
function scrollBodyTop() {
  $(window).scrollTop(0);
};

//メール詳細表示時に選択したメール一覧 明細行の選択色を解除する
function clearSelectListColor(searchFlg) {
    var listId = '#mail_list_draw_table';
    if (searchFlg) {
        listId = '#mail_search_list_draw_table';
    }

    $(listId + ' tr').removeClass('list-on');
    $(listId + ' tr').addClass('js_listHover');
    $(listId + ' .js_mailListHeaderLine').removeClass('js_listHover');
    $(listId + ' tr').children('td').removeClass('list_content-on list_content-topBorder bgC_header3');
    $(listId + ' tr').children('th').removeClass('list_content-topBorder');
}

//formの値を保持用にセットする
function setSvMail() {
    mailSvFrom = $("select[name='wml010sendAccount']").val();
    mailSvTo = $("input[name='wml010sendAddressTo']").val();
    mailSvCc = $("input[name='wml010sendAddressCc']").val();
    mailSvBcc = $("input[name='wml010sendAddressBcc']").val();
    mailSvSubject = $("input[name='wml010sendSubject']").val();

    if (isEditorHtml()) {
        mailSvContent = $("#html_input").val();
    } else {
        mailSvContent = $("textarea[name='wml010sendContent']").val();
    }
    if (document.getElementsByName("sendMailFile").length > 0) {
        for (var i = 0; i < document.getElementsByName("sendMailFile").length; i++) {
            tempuList += document.getElementsByName("sendMailFile")[i].id;
        }
    }
    mailSvTenpuList = tempuList;
    tempuList = [];
}

//タイマーフラグが立っていないときにタイマーをスタートする
function startTimer() {
    if (auto_save_timer_flg) {
        stopAutoSave();
        auto_save_timer_flg = false;
    }
    if (!auto_save_timer_flg) {
        startAutoSave($("input[name='wml010viewAccountAutoSave']").val());
        auto_save_timer_flg = true;
    }
}

//グローバル変数を現在のformを比較する
function compareForm() {
    if (mailSvFrom != $("select[name='wml010sendAccount']").val()) {
        return true;
    }
    if (mailSvTo != $("input[name='wml010sendAddressTo']").val()) {
        return true;
    }
    if (mailSvCc != $("input[name='wml010sendAddressCc']").val()) {
        return true;
    }
    if (mailSvBcc != $("input[name='wml010sendAddressBcc']").val()) {
        return true;
    }
    if (mailSvSubject != $("input[name='wml010sendSubject']").val()) {
        return true;
    }
    if (document.getElementsByName("sendMailFile").length > 0) {
        tempuList = [];
        for (var i = 0; i < document.getElementsByName("sendMailFile").length; i++) {
            tempuList += document.getElementsByName("sendMailFile")[i].id;
        }
        if (mailSvTenpuList != tempuList) {
            return true;
        }
    }
    if (isEditorHtml()) {
        if (mailSvContent != $("#html_input").html()) {
            return true;
        }
    } else {
        if (mailSvContent.replace(/\s+/g, "")
            != $("textarea[name='wml010sendContent']").val().replace(/\s+/g, "")) {
            return true;
        }
    }
    return false;
}

//経過時間後のformの値を草稿に保存
function motionMethod(callback) {
    //メール本文を保存用パラメータに設定
    if (isEditorHtml()) {
        setParamValue('wml010svSendContent', tinyMCE.get('html_input').getContent());
    } else {
        setParamValue('wml010svSendContent', getParamValue('wml010sendContent'));

        if (tinyMCE.get('html_input') != null) {
            $('input:hidden[name="wml010sendContentHtml"]').val(tinyMCE.get('html_input').getContent());
        }
    }

    document.forms[0].CMD.value="autoSave";
    var paramStr = "";
    paramStr += getFormData($('#webmailForm'));

    $.ajax({
        async: true,
        url:  "../webmail/wml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        //添付ファイルでFileNotoFoundException発生
        try {
            if ($(data).find('[name=errCause]')
                && $(data).find('[name=errCause]').val() == 'GSAttachFileNotExistException') {
                wmlEditorBeforeUnloadManager.off();
                 $('html').html('');
                 $('body').append($(data));
                 return;
            }
        } catch (ee) {
            //正常登録時のjsonをjqueryObjとして扱うとエクセプションになる
        }
        if (data["success"]) {
         //件名が空白の時は"[自動保存]"を代入する
            if($("input[name='wml010sendSubject']").val() == "") {
                $("input[name='wml010sendSubject']").val(data["svSubject"]);
            }
            document.forms[0].wml010sendMessageNum.value = data["svSendNum"];
            mailSvFrom = data["svFrom"];
            mailSvTo = data["svTo"];
            mailSvCc = data["svCc"];
            mailSvBcc = data["svBcc"];
            mailSvContent = data["svContent"];
            mailSvTenpuList = tempuList;
            mailSvSubject = data["svSubject"];
            reloadData(true);

            //自動保存完了後は送信メール区分に"編集"を設定
            setParamValue('wml010sendMailType', '4');

            if (!eventFlg) {
                displayToast("autoSave");
            }
        } else {
            if (data["error"] == 1) {
                $('#loading_pop').dialog('close');
                try {
                    setErrorMessage(data.errorMessage);
                } catch (ae) {
                    alert(msglist_wml010["sml.201"] + ae);
                }
            }
        }
        callback();
    }).fail(function( data ) {
        $('#loading_pop').dialog('close');
        alert(msglist_wml010["sml.201"]);
        callback();
    });
}

function setDateParam() {
    setYmdParam($("#selDate"),
                $("input[name='wml010sendMailPlanDateYear']"),
                $("input[name='wml010sendMailPlanDateMonth']"),
                $("input[name='wml010sendMailPlanDateDay']"));
    setHmParam($("#clock_rsv"),
               $("input[name='wml010sendMailPlanDateHour']"),
               $("input[name='wml010sendMailPlanDateMinute']"));
}

function createTempArea() {
    var tempDirId = $("input:hidden[name=wml010tempDirId]").val();
    $('#composeTempFile').empty();
    $('#composeTempFile').append(
        '<div id=\"attachment_FormArea1\">'
        + '<div>'
        + '<input type=\"hidden\" name=\"attachmentFileListFlg1\" value=\"true\" />'
        + '</div>'
        + '<span id=\"attachmentFileErrorArea1\"></span>'
        + '<input type=\"hidden\" name=\"attachmentMode1"\" value=\"0\" />'
        + '<input type=\"hidden\" name=\"attachmentPluginId1"\" value=\"webmail\" />'
        + '<input type=\"hidden\" name=\"attachmentTempDirId1"\" value=\"' + tempDirId + '\" />'
        + '<input type=\"hidden\" name=\"attachmentTempDirPlus1"\" value=\"sendmail\" />'
        + '<span id=\"attachmentFileListArea1\" class=\"mt5\"></span>'
        + '</div>'
    );

    attachmentSettings();
}

function cmn110DropBan() {
    if ($('body').find('div').hasClass('ui-widget-overlay')) {
        return true;
    }
    return $("#mail_create_tab").hasClass("tabHeader_tab-off");
}

function setContentInsertArea(kbn) {
    $('#wmlComposeBodyContent').empty();
    $('#attachmentFileErrorArea2').empty();

    $('#wmlAttachmentIdArea').empty();
    $('#wmlAttachmentIdArea').append('<input type="hidden" name="attachment_ID_list" value="1">');

    if (isEditorHtml()) {
        var tempDirId = $("input:hidden[name=wml010tempDirId]").val();
        $('#wmlComposeBodyContent').append(
              '<input type=\"hidden\" name=\"attachmentFileListFlg2\" value=\"false\" />'
            + '<input type=\"hidden\" name=\"attachmentMode2\" value=\"7\" />'
            + '<input type=\"hidden\" name=\"attachmentPluginId2\" value=\"webmail\" />'
            + '<input type=\"hidden\" name=\"attachmentTempDirId2\" value=\"' + tempDirId + '\" />'
            + '<input type=\"hidden\" name=\"attachmentTempDirPlus2\" value=\"sendmail/bodyFile\" />'
          );
        $('#wmlAttachmentIdArea').append('<input type="hidden" name="attachment_ID_list" value="2">');
    }
    resetAttachmentDropArea();
}
