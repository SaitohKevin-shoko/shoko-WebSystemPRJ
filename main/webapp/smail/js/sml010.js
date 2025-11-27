var closeLoadingFlg = true;

function buttonPush(cmd) {

    if (cmd == "pdf" || cmd == "eml") {
        document.getElementById('sml010Export').src = "../smail/sml030.do"
            + '?CMD=' + cmd
            + '&smlViewAccount=' + document.forms[0].smlViewAccount.value
            + '&sml010SelectedSid=' + document.forms[0].sml010SelectedSid.value
            + '&sml010ProcMode=' + document.forms[0].sml010ProcMode.value
            + '&sml010SelectedMailKbn=' + document.forms[0].sml010SelectedMailKbn.value
            + '&sml010SelectLabelSid=' + document.forms[0].sml010SelectLabelSid.value
            + '&sml010Sort_key=' + document.forms[0].sml010Sort_key.value
            + '&sml010Order_key=' + document.forms[0].sml010Order_key.value;
    } else {
        document.forms[0].CMD.value=cmd;
        document.forms[0].submit();
        return false;
    }
}

function onTitleLinkSubmit(fid, order) {
    document.forms[0].CMD.value='sortDetail';
    document.forms[0].sml010Sort_key.value = fid;
    document.forms[0].sml010Order_key.value = order;
    document.forms[0].submit();
    return false;
}

function changePage1() {
    document.forms[0].CMD.value='';
    for (i = 0; i < document.forms[0].sml010Slt_page1.length; i++) {
        if (document.forms[0].sml010Slt_page1[i].selected) {
            document.forms[0].sml010Slt_page2.value=document.forms[0].sml010Slt_page1[i].value;
            document.forms[0].sml010PageNum.value=document.forms[0].sml010Slt_page1[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}

function changePage2() {
    document.forms[0].CMD.value='';
    for (i = 0; i < document.forms[0].sml010Slt_page2.length; i++) {
        if (document.forms[0].sml010Slt_page2[i].selected) {
            document.forms[0].sml010Slt_page1.value=document.forms[0].sml010Slt_page2[i].value;
            document.forms[0].sml010PageNum.value=document.forms[0].sml010Slt_page2[i].value;
        }
    }
    document.forms[0].submit();
    return false;
}


function changeMode(mode) {
    document.forms[0].CMD.value='changeMode';
    document.forms[0].sml010ProcMode.value = mode;
    document.forms[0].submit();
    return false;
}

function moveDetail(sid, kbn) {
    document.forms[0].CMD.value='moveDetail';
    document.forms[0].sml010SelectedSid.value = sid;
    document.forms[0].sml010SelectedMailKbn.value = kbn;
    document.forms[0].submit();
    return false;
}

function moveMessage(sid) {
    document.forms[0].CMD.value='moveMessage';
    document.forms[0].sml010SelectedSid.value = sid;
    document.forms[0].submit();
    return false;
}

function hinaEdit(hinaKbn) {
    document.forms[0].CMD.value='hina_edit';
    document.forms[0].sml050HinaKbn.value = hinaKbn;
    document.forms[0].submit();
    return false;
}

function sml010ChangeGrp() {
    document.forms[0].CMD.value = 'changeGrp';
    document.forms[0].submit();
    return false;
}

function changeChkAdd(){
    var chkFlg;
    if (document.forms[0].usrAllCheck.checked) {
        chkFlg = true;
    } else {
        chkFlg = false;
    }
    delAry = document.getElementsByName("sml010usrSids");
    for(i = 0; i < delAry.length; i++) {
        delAry[i].checked = chkFlg;
    }
}

function usrNameClick(usrsid) {
    document.forms[0].CMD.value='addUsr';
    document.forms[0].sml010usrSid.value = usrsid;
    document.forms[0].submit();
    return false;
}

function dispStyle() {

    $('#btnSearchAtesakiSelect')[0].disabled = $('#radio_jushin')[0].checked;
    $('#btnSearchAtesakiClear')[0].disabled = $('#radio_jushin')[0].checked;


    $('#head_menu_search_list_label_add_btn').parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');

    if ($('#radio_gomi')[0].checked) {
        $('#head_menu_search_list_label_add_btn').parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
    }

    $('#head_menu_search_list_kidoku_btn').parents('.mailMenu_buttonSet').eq(0).addClass('display_none');

    if ($('#radio_jushin')[0].checked || $('#radio_gomi')[0].checked) {
        $('#head_menu_search_list_kidoku_btn').parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
    }
    $('#head_menu_search_list_dust_btn').addClass('display_none');
    $('#head_menu_search_list_del_btn').addClass('display_none');
    if ($('#radio_gomi')[0].checked) {
        $('#head_menu_search_list_del_btn').removeClass('display_none');
    } else {
        $('#head_menu_search_list_dust_btn').removeClass('display_none');
    }

    $('#sml090SltGroup')[0].disabled = false;
    $('#sml090SltUser')[0].disabled = false;

    $('.js_searchGrpSelBtn').removeClass('display_none');

    if ($('#radio_soukou')[0].checked || $('#radio_soushin')[0].checked) {
        $('#sml090SltGroup')[0].disabled = true;
        $('#sml090SltUser')[0].disabled = true;
        $('#sml090SltGroup')[0].selectedIndex = 0;
        $('#sml090SltUser')[0].selectedIndex = 0;
        $('.js_searchGrpSelBtn').addClass('display_none');
    }
}

/* 新規作成フラグ */
var mail_create_flg = false;
/* 新規作成確認フラグ  */
var mail_create_kakunin_flg = false;
/* メール確認フラグ  */
var mail_kakunin_flg = false;
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
/* 選択メール親画面フラグ  0:通常 1:検索*/
var sel_mail_parent_kbn = 0;
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
/* 詳細メールSID */
var detail_mail_sid = 0;


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

    /* 初期データ取得 */
    document.forms[0].CMD.value='getInitData';
    loadingPop(msglist_sml010['cmn.loading']);
    getMailData();
    deleteTmpDir();
    tinyMceInit();

    /* 検索エリア初期化 */
    dispStyle();

    /* ひな形パラメータ初期化 */
    $('input:hidden[name=sml050HinaKbn]').val(1);

    /* 再読み込み */
    $(document).on("click", "#btn_reload",  function(){
        changeTab($('#mail_list_tab'));
        loadingPop(msglist_sml010['cmn.loading']);
        reloadData();
    });

    $(document).on("change", ".js_tableTopCheck-header", function(){
        var chkFlg;
        if ($(this).children('input[name=allCheck]:checked').length > 0) {
            chkFlg = true;
        } else {
            chkFlg = false;
        }

        var delAry = document.getElementsByName("sml010DelSid");
        if ($(this).parents('#mail_search_list_draw_table').length != 0 ) {
            delAry = document.getElementsByName("sml090DelSid");

        }
        for(i = 0; i < delAry.length; i++) {
            delAry[i].checked = chkFlg;
        }
    });

    /* 左メニュー ラベル */
    $(document).on("click", ".js_changeLabelDir",  function(){
        document.forms[0].CMD.value='changeDir';
        document.forms[0].sml010ProcMode.value = "5";
        document.forms[0].sml010SelectLabelSid.value = $(this).data('labelid');

        var labelTxt = $(this).children('.side-folderText').next().val();

        if (labelTxt.length > 9) {
            labelTxt = labelTxt.substring(0, 8) + "…";
        }

        $("#mail_list_tab").html(labelTxt);

        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $('#head_menu_list_dust_btn').removeClass('display_none');
        $('#head_menu_list_del_btn').addClass('display_none');
        $('#head_menu_return_btn').addClass('display_none');

        changeTab($('#mail_list_tab'));
        loadingPop(msglist_sml010['cmn.loading']);
        getMailData();

    });

    /* ページング next */
    $(document).on("click", ".js_paging-mail .js_paging_nextBtn",  function(){
        document.forms[0].CMD.value='page_right';
        loadingPop(msglist_sml010['cmn.loading']);
        getMailData();
    });

    /* ページング prev */
    $(document).on("click", ".js_paging-mail .js_paging_prevBtn",  function(){
        document.forms[0].CMD.value='page_left';
        loadingPop(msglist_sml010['cmn.loading']);
        getMailData();
    });

    /* ページング コンボ変更  上*/
    $(document).on("change", ".js_paging-mail .js_paging_combo",  function(){
        document.forms[0].CMD.value='getInitData';
        var sel = $(this).val();
        document.forms[0].sml010PageNum.value=sel;
        loadingPop(msglist_sml010['cmn.loading']);
        getMailData();
    });


    /* メールボックスエリア hover */
    $(document).on({
        mouseenter:function (e) {
            $(this).addClass("side_accountName-hover");
        },
        mouseleave:function (e) {
            $(this).removeClass("side_accountName-hover");
        }
    }, ".js_side_accountName");


    /* アカウントエリア クリック */
    $(document).on("click", "#sml_account_area",  function(){
        $("#sml_account_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });

    /* メールボックスエリア クリック */
    $(document).on("click", "#sml_mailbox_area",  function(){
        $("#sml_mailbox_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });


    /* ユーザ情報エリア クリック */
    $(document).on("click", "#sml_shain_area",  function(){
        $("#sml_shain_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });

    /* ひな形(共通)エリア クリック */
    $(document).on("click", "#sml_hina_kyotu_area",  function(){
        $("#sml_hina_kyotu_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });

    /* ひな形(個人)エリア クリック */
    $(document).on("click", "#sml_hina_kojin_area",  function(){
        $("#sml_hina_kojin_child_area").animate( { height: 'toggle'}, 'middle' );
        changeSelImg($(this).children());
    });


    /* ラベル クリック */
    $(document).on("click", "#lable_top",  function(){
        $(this).prev().prev().click();

        if (left_menu_label_opnkbn) {
            left_menu_label_opnkbn = false;
        } else {
            left_menu_label_opnkbn = true;
        }
    });


    /* プラス、マイナス要素クリック */
    $(document).on("click", ".js_lineToggle",  function(){

        $(this).parent().next().toggle('fast');

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
    $(document).on("click", '.js_mailListHeadSel',  function(){
        if (now_sel_tab == 'mail_search_list_tab') {
            onSearchTitleLinkClick($(this).data('sortkey'),$(this).data('orderkey'));
            return;
        }
        onTitleLinkClick($(this).data('sortkey'),$(this).data('orderkey'));
    });

    /* メール 行  hover */
    $(this).tableTop().initRowHover();


    /* メール  click */
    $(document).on("click", '.js_mailContent',  function(){

        var searchFlg = false;
        sel_mail_parent_kbn = 0;
        var procMode = $("input[name=sml010ProcMode]").val();
        //詳細検索リスト内の場合
        if ($(this).parents('#mail_search_list_draw_table').length != 0 ) {
            procMode = $("input:hidden[name=sml090SvMailSyubetsu]").val();
            searchFlg = true;
            sel_mail_parent_kbn = 1;
        }

        //草稿モード時のSID上書きに備えて退避しておく
        if (procMode != 2) {
            document.forms[0].selectEsc.value = document.forms[0].sml010SelectedSid.value;
            document.forms[0].editEsc.value = document.forms[0].sml010EditSid.value;
            document.forms[0].processEsc.value = procMode;
        }

        var smlSid = $(this).parent().data('smlsid');

        var mailKbn = $(this).parent().data('mailkbn');

        if (procMode == "0") {
            //受信
            getDetail(smlSid, '-1', searchFlg, true, 0);
        } else if (procMode == "1") {
            //送信
            getDetail(smlSid, '-1', searchFlg, true, 0)
        } else if (procMode == "2" || (procMode != "4" && mailKbn == "2")) {
            //草稿
            getMessage(smlSid)
        } else if (procMode == "4" || procMode == "5") {
            //ゴミ箱
            getDetail(smlSid, mailKbn, searchFlg, true, 0)
        }


    });

    /* メール確認 前へ  click */
    $(document).on("click", '#head_menu_prev_btn',  function(){

        loadingPop(msglist_sml010['cmn.loading']);

        var processTmp = document.forms[0].sml010ProcMode.value;
        //「前へ」が押されたら詳細メールのモードに戻して詳細メールのSIDを取得する
        getSidEscape();

        var procMode = $("input[name=sml010ProcMode]").val();
        var searchFlg = false;

        if (sel_mail_parent_kbn == 1) {
            procMode = $("input:hidden[name=sml090SvMailSyubetsu]").val();
            searchFlg = true;
        }

        var mailKbn = $('input:hidden[name=sml010SelectedMailKbn]').val();

        var smlSid = $('input:hidden[name=sml010SelectedSid]').val();

        if (procMode == "0") {
            //受信
            getDetail(smlSid, '-1', searchFlg, true, 1);
        } else if (procMode == "1") {
            //送信
            getDetail(smlSid, '-1', searchFlg, true, 1)

        } else if (procMode == "4" || procMode == "5") {
            //ゴミ箱
            getDetail(smlSid, mailKbn, searchFlg, true, 1)
        }

        //前のメールの詳細を取得したらモードを戻す
        document.forms[0].sml010ProcMode.value = processTmp;
    });

    /* メール確認 次へ  click */
    $(document).on("click", '#head_menu_next_btn',  function(){

        loadingPop(msglist_sml010['cmn.loading']);

        //「次へ」が押されたら詳細メールのモードに戻して詳細メールのSIDを取得する
        var processTmp = document.forms[0].sml010ProcMode.value;
        getSidEscape()


        var procMode = $("input[name=sml010ProcMode]").val();
        var searchFlg = false;

        if (sel_mail_parent_kbn == 1) {
            procMode = $("input:hidden[name=sml090SvMailSyubetsu]").val();
            searchFlg = true;
        }

        var mailKbn = $('input:hidden[name=sml010SelectedMailKbn]').val();
        var smlSid = $('input:hidden[name=sml010SelectedSid]').val();

        if (procMode == "0") {
            //受信
            getDetail(smlSid, '-1', searchFlg, true, 2);
        } else if (procMode == "1") {
            //送信
            getDetail(smlSid, '-1', searchFlg, true, 2)

        } else if (procMode == "4" || procMode == "5") {
            //ゴミ箱
            getDetail(smlSid, mailKbn, searchFlg, true, 2)
        }

        //次のメールの詳細を取得したらモードを戻す
        document.forms[0].sml010ProcMode.value = processTmp;

    });

    /* メール一覧  PDF出力 */
    $(document).on("click", '#head_menu_list_pdf_btn',  function(){
        pdfListMail();
    });

    /* メール一覧  eml出力 */
    $(document).on("click", '#head_menu_list_eml_btn',  function(){
        emlListMail();
    });

    /* メール一覧  既読にする */
    $(document).on("click", '#head_menu_list_kidoku_btn',  function(){
        kidokuListMail();
    });

    /* メール一覧 未読にする */
    $(document).on("click", '#head_menu_list_midoku_btn',  function(){
        midokuListMail();
    });

    /* メール一覧  削除ボタン */
    $(document).on("click", '#head_menu_list_del_btn',  function(){
        deleteListMail("delete");
    });
    $(document).on("click", '#head_menu_list_dust_btn',  function(){
        deleteListMail("dust");
    });

    /* メール一覧  元に戻すボタン */
    $(document).on("click", '#head_menu_return_btn',  function(){
        revivedListMail();
    });

    /* メール一覧  ゴミ箱を空にするボタン */
    $('#head_menu_empty_trash_btn').on('click', function(){
        emptyTrash();
        return false;
    });

    /* メール一覧  ラベル追加ボタン */
    $(document).on("click", '#head_menu_list_label_add_btn',  function(){
        addLabelListMail();
    });

    /* メール一覧  ラベル削除ボタン */
    $(document).on("click", '#head_menu_list_label_del_btn',  function(){
        deleteLabelListMail();
    });

    /* メール一覧  ラベル追加ポップアップ ラジオボタン変更 */
    $(document).on("change", 'input:radio[name=sml010addLabelT]',  function(){
        changeAddLabelType();
    });


    /* 新規作成ボタン click */
    $(document).on("click", '.js_headMenuAddBtn',  function(){
        if (mail_create_flg) {
            delKakuninPopup('newMail', 0);
        } else {
            paramStr = 'CMD=getNewmail&smlViewAccount='
                +   $("#account_comb_box").val();
          //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
            $('input:hidden[name=sml020ProcMode]').val(0);


            $.ajax({
                async: true,
                url:  "../smail/sml020.do",
                type: "post",
                data: paramStr
            }).done(function( data ) {
                if (data["confError"] == -100 || data["confError"] == -101) {
                    document.forms[0].CMD.value="shareError";
                    document.forms[0].sml010MailBodyLimit.value=Number(data["confError"]);
                    document.forms[0].submit();
                    return false;
                } else if (data["success"]) {
                    tmp_del_flg = false;
                    $('input:hidden[name=sml020ProcMode]').val(0);
                    $('#send_account_comb_box').val(data.sml020SendAccount);
                    $("#popHinaKojin").children().remove();
                    hinagataKjnSet(data.sml020HinaListKjn);
                    openSendTab();
                    setCreateMail(0, data);
                } else {
                    alert(msglist_sml010['sml.190']);
                }
                resetSid();
                changeSidData(0);
            }).fail(function(data){
                alert(msglist_sml010['sml.190']);
                resetSid();
            });

        }
    });


    /*タブ閉じる hover*/
    $(document).on({
        mouseenter:function (e) {
            $(this).attr('src', '../smail/images/classic/icon_del_on.png');
        },
        mouseleave:function (e) {
            $(this).attr('src', '../smail/images/classic/icon_del.png');
        }
    }, '.js_tabHeader_closeBtn');

    /* 削除ボタンフラグ */
    var del_btn_mini_flg = false;

    /* 新規作成 削除  click */
    $(document).on("click", '.js_mailDelBtnMini',  function(){
        delNewCreateMail($(this), 0, -1);
    });

    /* メール確認 閉じる  click */
    $(document).on("click", '.js_mailCloseBtnMini',  function(){

        del_btn_mini_flg = true;
        $(this).parents('li').eq(0).prev().remove();
        $(this).parents('li').eq(0).remove();
        changeTab($('#' + now_sel_tab));
        mail_kakunin_flg = false;
        reloadData();

    });

    /* メール検索 閉じる  click */
    $(document).on("click", '.js_searchMailCloseBtnMini',  function(){

        del_btn_mini_flg = true;
        $(this).parents('li').eq(0).prev().remove();
        $(this).parents('li').eq(0).remove();

        changeTab($('#mail_list_tab'));
        mail_search_list_flg = false;

    });


    /* 上部タブ click */
    $(document).on("click", '.js_mailAreaHead.tabHeader_tab-off, .js_mailAreaHead2.tabHeader_tab-off',  function(){

        if (!del_btn_mini_flg) {
            changeTab($(this));
        } else {
            del_btn_mini_flg = false;
            if ($(this).attr('id') == 'mail_list_tab') {
                changeTab($(this));
            }
        }

    });


    /* 添付ファイルボタン マークボタン  hover */
    $(document).on({
        mouseenter:function (e) {
            $(this).addClass("mail_create_bottom_sel_on");
        },
        mouseleave:function (e) {
            $(this).removeClass("mail_create_bottom_sel_on");
        }
    }, '.mail_create_bttm');

    /* 添付ファイルボタン click */
    $(document).on("click", '.mail_create_bottom_sel_tmp',  function(){
        $('#mail_create_bottom_mark_area').addClass('display_none');
        $('#mail_create_bottom_tmp_area').removeClass('display_none');
        $('.mail_create_bttm').removeClass('mail_create_bottom_select');
        $(this).addClass('mail_create_bottom_select');
    });

    /* マークボタン click */
    $(document).on("click", '.mail_create_bottom_sel_mark',  function(){
        $('#mail_create_bottom_mark_area').removeClass('display_none');
        $('#mail_create_bottom_tmp_area').addClass('display_none');
        $('.mail_create_bttm').removeClass('mail_create_bottom_select');
        $(this).addClass('mail_create_bottom_select');
    });

    /* テキスト形式 hover */
    $(document).on({
        mouseenter:function (e) {
            $(this).addClass("mail_create_bottom_sel_text_form_on");
        },
        mouseleave:function (e) {
            $(this).removeClass("mail_create_bottom_sel_text_form_on");
        }
    }, '.mail_create_bottom_sel_text_form');

    /* テキスト形式 click */
    $(document).on("click", '.js_mailCreateBottomSelTextForm',  function(){
        changeSendMailType(0);
    });


    /* 宛先名リンク hover */
    $(document).on({
        mouseenter:function (e) {
            $(this).addClass("td_u");
        },
        mouseleave:function (e) {
            $(this).removeClass("td_u");
        }
    }, ".js_smlAtesakiLink");

    /* アカウントクリック */
    $(document).on("click", '.js_side_accountName',  function(){

        if (mail_create_flg) {
            delNewCreateMail($('.js_mailDelBtnMini'), 2, $(this));
        } else {
            var accountId = $(this).attr('data-accountid');
            resetParam();
            $('select[name=smlViewAccount]').val(accountId);
            buttonPush();
        }

    });

    /* アカウント変更 */
    $(document).on("change", '#account_comb_box',  function(){

        if (mail_create_flg) {
            delNewCreateMail($('.js_mailDelBtnMini'), 3, -1);
        } else {
            resetParam();
            buttonPush();
        }

    });

    /* 右 click (受信)*/
    $('#menu_jushin_txt').contextMenu('context_menu1',
            {
        bindings: {
            'all_read': function(t) {
                contextAllRead(0);
            },
            'all_no_read': function(t) {
                contextAllRead(1);
            }
        }
            });


    //グループコンボ変更
    $(document).on("change", "#sml010ChangeGrp",  function(){
        var paramStr = "CMD=changeGrpData&";
        paramStr += getFormData($('#smlForm'));
        getGroupUsrData(paramStr);
    });

    //グループコンボ変更
    $(document).on("click", "#fakeGrpButton",  function(){
        $("#sml010ChangeGrp").change();
    });

    //非公開写真がクリックされたら名前部分がクリックされたことにする
    $(document).on("click", '.js_syain_sel_check_img',  function(){
        $(this).next().click();
    });

    //ユーザ選択
    $(document).on("click", '.js_syain_sel_check_a',  function(){
        var selUsrId = $(this).data('accountsid');
        var selUsrTxt = $(this).find('.js_syain_sel_check_txt').text();
        selUsrTxt = selUsrTxt.trim();
        var usrUkoFlg = "0";
        if ($(this).hasClass("mukoUser")) {
            usrUkoFlg = "1";
        }
        drawSelUsr(selUsrId, selUsrTxt, usrUkoFlg);
    });

    //宛先、CC、BCCボタン
    $(document).on("click", '.js_mailToAddBtn',  function(){
        setAtesakiSelectUsr($(this).attr('value'));
    });


    //ひな形選択
    $('.js_hinaSelTxt').on("click", function(){
        var selHinaId = $(this).data('hinaid');
        drawSelHina(selHinaId, 0);
    });

    //ひな形ツールチップ
    $(".js_hinaSelTxt").on({
        mouseover: function(e){

            var txtVal = $(this).find("span.tooltips").html();
            txtVal = txtVal.replace(/\r\n/g, "<br />");
            txtVal = txtVal.replace(/(\n|\r)/g, "<br />");
            $("#tooltip_area").append("<div id=\"ttp\">"+ (txtVal) +"</div>");

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
        },
        mousemove :function(e){
            $("#ttp")
            .css("top",(e.pageY) + -10 + "px")
            .css("left",(e.pageX) + 20 + "px");
        },
        mouseout :function(){
            $("#ttp").remove();
        }
    });


    //ひな形選択(ポップアップ時)
    $(document).on("click", '.js_hinaSelTxt2', function(){
        var selHinaId = $(this).data('hinaid');
        drawSelHina(selHinaId, 1);
    });

    //ひな形ツールチップ(ポップアップ時)
    $(document).on({
        "mouseover" : function(e){
            var txtVal = $(this).find("span.tooltips").html();
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
        },
        "mousemove" : function(e){
            $("#ttp")
            .css("top",(e.pageY) + -10 + "px")
            .css("left",(e.pageX) + 20 + "px");
        },
        "mouseout" : function(){
            $("#ttp").remove();
        },
    }, ".js_hinaSelTxt3");



    //次へボタン
    $(document).on("click", '#head_menu_next',  function(){
        buttonPush('next');
    });

    //前へボタン
    $(document).on("click", '#head_menu_prev',  function(){
        buttonPush('next');
    });


  //pdf出力リンク
    $(document).on("click", '.js_mailCheckBodyBottomPdf',  function(){
        var selectedSid = document.forms[0].selectEsc.value;
        var editSid = document.forms[0].editEsc.value;
        var processTemp = document.forms[0].sml010ProcMode.value;

        //草稿モード時に詳細メールのPDF出力が押されたときは一時的にモードを戻す
        if (document.forms[0].processEsc.value != 2) {
            document.forms[0].sml010ProcMode.value = document.forms[0].processEsc.value;
        }

        if (selectedSid != 0) {
            editSid = selectedSid;
        } else if (editSid != 0) {
            selectedSid = editSid;
        }

        //PDF出力する際は退避SIDを利用する
        if (selectedSid != 0 && editSid != 0) {
            document.forms[0].sml010SelectedSid.value = selectedSid;
        }

        buttonPush('pdf');
        document.forms[0].sml010ProcMode.value = processTemp;
    });

  //eml出力リンク
    $(document).on("click", '.js_mailCheckBodyBottomEml',  function(){

        var selectedSid = document.forms[0].selectEsc.value;
        var editSid = document.forms[0].editEsc.value;
        var processTemp = document.forms[0].sml010ProcMode.value;

        //草稿モード時に詳細メールの出力が押されたときは一時的にモードを戻す
        if (document.forms[0].processEsc.value != 2) {
            document.forms[0].sml010ProcMode.value = document.forms[0].processEsc.value;
        }


        if (selectedSid != 0) {
            editSid = selectedSid;
        } else if (editSid != 0) {
            selectedSid = editSid;
        }

        //eml出力する際は退避SIDを利用する
        if (selectedSid != 0 && editSid != 0) {
            document.forms[0].sml010SelectedSid.value = selectedSid;
        }

        buttonPush('eml');
        document.forms[0].sml010ProcMode.value = processTemp;
    });


    //宛先,CC,BCC選択ボタン
    $(document).on("click", ".js_mailSendSelBtn",  function(){
        $(this).smlatesaki('open');

    });



    //添付ボタン
    $(document).on("click", '.js_attacheBtn',  function(){
        attachmentLoadFile('1');
    });

    //添付削除ボタン
    $(document).on("click", '.js_dellTmpBtn',  function(){
        deleteTmp();
    });

    //新規作成 OKボタン
    $(document).on("click", '#head_menu_send_btn',  function(){
        doMailCreateOK();
    });

    //新規作成確認 戻るボタン
    $(document).on("click", '#head_menu_back_kakunin_btn',  function(){
        mail_create_kakunin_flg = false;
        changeHelpParam(1,1);
        $('.js_mailCreateKakuninArea').addClass('display_none');
        $('.js_mailCreateArea').removeClass('display_none');
        delCreateKakuninArea();
    });

    //新規作成確認 送信ボタン
    $(document).on("click", '#head_menu_send_kakunin_btn',  function(){
        doMailSendSoushin();
    });

    //新規作成 草稿に保存ボタン
    $(document).on("click", '#head_menu_soko_btn',  function(){
        doMailSoko();
    });

    //新規作成 ひな形ボタン
    $(document).on("click", '#head_menu_hinagata_btn',  function(){
        popHinaSelDsp();
    });


    /* 新規作成 ひな形  タブ 共通 */
    $(document).on("click", "#hina_kyotu_tab",  function(){
        $("#popHinaKyotu").removeClass('display_none');
        $("#popHinaKojin").addClass('display_none');
        $('#hina_kyotu_tab').removeClass('tabHeader_tab-off tabHeader_tab-on');
        $('#hina_kojin_tab').removeClass('tabHeader_tab-off tabHeader_tab-on');
        $('#hina_kyotu_tab').addClass('tabHeader_tab-on');
        $('#hina_kojin_tab').addClass('tabHeader_tab-off');
    });

    /* 新規作成 ひな形  タブ 個人 */
    $(document).on("click", "#hina_kojin_tab",  function(){
        $("#popHinaKyotu").addClass('display_none');
        $("#popHinaKojin").removeClass('display_none');
        $('#hina_kyotu_tab').removeClass('tabHeader_tab-off tabHeader_tab-on');
        $('#hina_kojin_tab').removeClass('tabHeader_tab-off tabHeader_tab-on');
        $('#hina_kojin_tab').addClass('tabHeader_tab-on');
        $('#hina_kyotu_tab').addClass('tabHeader_tab-off');
    });

    /* 新規作成 ひな形POP ひな形 click */
    $(document).on("click", ".accountSelTr",  function(){
        selAccount($(this));
    });

    //メール確認   削除ボタン
    $(document).on("click", '#head_menu_del_btn, #head_menu_dust_btn',  function(){
        deleteMail();
    });

    //メール確認   すべて削除ボタン
    $(document).on("click", '#head_menu_alldel_btn',  function(){
        deleteMailAll();
    });

    //メール確認   返信ボタン
    $(document).on("click", '#head_menu_replay_btn',  function(){
        if (!mail_create_flg) {
            //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
            $('input:hidden[name=sml020ProcMode]').val(1);
        }
        replayMail(1);
    });

    //メール確認   全返信ボタン
    $(document).on("click", '#head_menu_all_replay_btn',  function(){
        if (!mail_create_flg) {
            //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
            $('input:hidden[name=sml020ProcMode]').val(2);
        }
        replayMail(2);
    });

    //メール確認   転送ボタン
    $(document).on("click", '#head_menu_forward_btn',  function(){
        if (!mail_create_flg) {
            //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
            $('input:hidden[name=sml020ProcMode]').val(3);
        }
        replayMail(3);
    });

    //メール確認   複写して新規作成
    $(document).on("click", '#head_menu_copy_btn',  function(){
        if (!mail_create_flg) {
            //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
            $('input:hidden[name=sml020ProcMode]').val(0);
        }
        replayMail(11);
    });

    //メール確認   元に戻す
    $(document).on("click", '#head_menu_revived_btn',  function(){
        revivedMail();
    });

    //草稿  削除ボタン
    $(document).on("click", '#head_menu_del_soko_btn',  function(){
        deleteSokoMail();
    });
    //検索のテキストエリア内でエンターキー
    $(document).on("keydown", '#search_text_val',  function(e) {
        if (e.keyCode == 13) {
            $('#sml_search_btn').click();
        }
    });
    //検索ボタン
    $(document).on("click", '#sml_search_btn',  function(){
        $('#search_area_table').removeClass('display_none');
        $('input[name=sml090KeyWord]').val($('#search_text_val').val());

        $('#sml090SltGroup').val(-1);
        $('#sml090SltUser').val(-1);


        var procMode = $('input:hidden[name=sml010ProcMode]').val();
        var nextSyubetu;
        if (procMode < 5) {
            nextSyubetu = procMode;
        } else {
            nextSyubetu = 0;
        }
        if (nextSyubetu != $('input:radio[name=sml090MailSyubetsu]:checked').val()) {
            $('input:radio[name=sml090MailSyubetsu]').val([nextSyubetu]);
            changeSearchShubetu();
        }

        dispStyle();
        document.forms[0].CMD.value='smlSearchData';
        getSearchData();
        $('#sml090SltGroup').val(-1);
        $('#sml090SltUser').val(-1);

        $('#sml090SltGroup').val(-1);
        $('#sml090SltUser').val(-1);
    });
    //検索のテキストエリア内でエンターキー
    $(document).on("keydown", 'input[name=sml090KeyWord]',  function(e) {
        if (e.keyCode == 13) {
            $('#head_menu_search_btn2').click();
        }
    });
    //検索ボタン 詳細
    $(document).on("click", '#head_menu_search_btn2',  function(){
        //入力チェックを行う
        checkSearchKeyword();
    });

    /* 検索エリアメール種別変更*/
    $(document).on("change", "input[name=sml090MailSyubetsu]",  function(){
        dispStyle();
        changeSearchShubetu();
        $('#head_menu_search_btn2').click();
    });

    /* 検索エリア グループコンボ変更*/
    $(document).on("change", "#sml090SltGroup",  function(){
        getSearchGroupUser();
        $('#head_menu_search_btn2').click();
    });

    /*  検索エリア グループコンボ変更 */
    $(document).on("click", "#fakeSearchGrpButton",  function(){
        $("#sml090SltGroup").change();
    });

    /* 検索エリア ユーザコンボ変更*/
    $(document).on("change", "#sml090SltUser",  function(){
        $('#head_menu_search_btn2').click();
    });

    /* 検索エリア マーク変更*/
    $(document).on("change", "input:radio[name=sml090MailMark]",  function(){
        $('#head_menu_search_btn2').click();
    });

    /* 検索エリア キーワード 検索条件*/
    $(document).on("change", "input:radio[name=sml090KeyWordkbn]",  function(){
        $('#head_menu_search_btn2').click();
    });

    /* 検索エリア 検索対象*/
    $(document).on("change", "input:checkbox[name=sml090SearchTarget]",  function(){
        $('#head_menu_search_btn2').click();
    });


    /* 検索エリア 第1キー条件*/
    $(document).on("change", "select[name=sml090SearchSortKey1]",  function(){
        $('#head_menu_search_btn2').click();
    });

    /* 検索エリア 第1キー並び順*/
    $(document).on("change", "input:radio[name=sml090SearchOrderKey1]",  function(){
        $('#head_menu_search_btn2').click();
    });

    /* 検索エリア 第2キー条件*/
    $(document).on("change", "select[name=sml090SearchSortKey2]",  function(){
        $('#head_menu_search_btn2').click();
    });

    /* 検索エリア 第2キー並び順*/
    $(document).on("change", "input:radio[name=sml090SearchOrderKey2]",  function(){
        $('#head_menu_search_btn2').click();
    });

    /* 検索エリア クリアボタン クリック*/
    $(document).on("click", '#btnSearchAtesakiClear',  function(){
        clearSearchAtesaki();
        $('#head_menu_search_btn2').click();
    });

    //選択ユーザ  削除
    $(document).on("click", ".js_del_search_user",  function(){
        $(this).parent().remove();
        $('#head_menu_search_btn2').click();
    });

    //検索エリア 前ページクリック
    $(document).on("click", '.js_paging-search .js_paging_prevBtn',  function(){
        document.forms[0].CMD.value='searchPrevPage';
        getSearchData();
    });

    //検索エリア 次ページクリック
    $(document).on("click", '.js_paging-search .js_paging_nextBtn',  function(){
        document.forms[0].CMD.value='searchNextPage';
        getSearchData();
    });

    /* 検索エリア ページング コンボ変更  上*/
    $(document).on("change", ".js_paging-search .js_paging_combo",  function(){
        document.forms[0].CMD.value='changePageComboData';
        var sel = $(this).val();
        $('input:hidden[name=sml090page1]').val(sel);
        $('input:hidden[name=sml090page2]').val(sel);
        getSearchData();
    });


    /* 検索エリア サイズ変更*/
    $(document).on("click", ".js_searchHeadBtn",  function(){
        $('.js_searchToggleArea').toggle();
    });

    /* 検索エリア メール一覧  削除ボタン */
    $(document).on("click", '#head_menu_search_list_del_btn',  function(){
        deleteSearchListMail("delete");
    });
    $(document).on("click", '#head_menu_search_list_dust_btn',  function(){
        deleteSearchListMail("dust");
    });

    /* メール一覧  ラベル追加ボタン */
    $(document).on("click", '#head_menu_search_list_label_add_btn',  function(){
        addLabelSearchListMail();
    });

    /* メール一覧  ラベル削除ボタン */
    $(document).on("click", '#head_menu_search_list_label_del_btn',  function(){
        deleteLabelSearchListMail();
    });

    /* メール一覧  PDF出力 */
    $(document).on("click", '#head_menu_search_list_pdf_btn',  function(){
        pdfListSearchMail();
    });

    /* メール一覧  eml出力 */
    $(document).on("click", '#head_menu_search_list_eml_btn',  function(){
        emlListSearchMail();
    });

    /* メール一覧  既読にする */
    $(document).on("click", '#head_menu_search_list_kidoku_btn',  function(){
        kidokuSearchListMail();
    });

    /* メール一覧 未読にする */
    $(document).on("click", '#head_menu_search_list_midoku_btn',  function(){
        midokuSearchListMail();
    });

    /* 他プラグインから遷移時 */
    if ($('input:hidden[name=sml010scriptFlg]').val() == 1) {

        if ($('input:hidden[name=sml010scriptKbn]').val() == 1) {
            // パラメータ不足の為、ここで強制的に追加
            document.forms[0].processEsc.value = document.forms[0].sml010ProcMode.value;
            //選択メール表示
            getDetail($('input:hidden[name=sml010SelectedSid]').val(), '-1', false, false, 0);
        } else if ($('input:hidden[name=sml010scriptKbn]').val() == 3) {
            //WEBメール共有
            replayMail(12);
        } else {

            //メール作成
            var sml010scriptSelUsrSidVal = $('#sml010scriptSelUsrSid').val();
            var sml010scriptSelUsrNameVal = $('#sml010scriptSelUsrName').val()
            var sml010scriptSelSacSidVal = $('#sml010scriptSelSacSid').val();
            var selUsrId = null;
            var selUsrTxt = null;

            if (sml010scriptSelUsrSidVal != ""
                && sml010scriptSelUsrNameVal != ""
                    && sml010scriptSelSacSidVal == "") {
                selUsrId = sml010scriptSelUsrSidVal;
                selUsrTxt = sml010scriptSelUsrNameVal;
            } else if (sml010scriptSelSacSidVal != ""
                && sml010scriptSelUsrNameVal != "") {
                selUsrId = "sac" + sml010scriptSelSacSidVal;
                selUsrTxt = sml010scriptSelUsrNameVal;
            }
            drawSelUsr(selUsrId, selUsrTxt);

            $('.scriptSelUsrParams').each(function(){
                var selUsrArray = $(this).val().split(":");
                if (selUsrArray[0] != null && selUsrArray[0] != ""
                    && selUsrArray[1] != null && selUsrArray[1] != "") {
                    drawSelUsr(selUsrArray[0], selUsrArray[1]);
                }
            });
            $('#scriptSelUsrArea').remove();
            closeloadingPop();
        }
        $('input:hidden[name=sml010scriptFlg]').val(0);
        $('input:hidden[name=sml010scriptKbn]').val(0);
        $('input:hidden[name=sml010scriptSelUsrSid]').val("");
        $('input:hidden[name=sml010scriptSelUsrName]').val("");
    }

    /* メール一覧  ラベル追加ボタン */
    $(document).on("click", '#hogebtn',  function(){
        //54
        alert($("#jmail_atesaki_cell").height());
    });

    /* 受信メール確認画面 宛先CC 全て表示リンククリック */
    $(document).on("click", '#sml_kakunin_body .js_mailKakunin-expandable + .js_allOpnTo',  function() {
        var expList = $(this).prev();
        if (expList.is('.ofy_a')) {
            expList.removeClass('ofy_a');
            expList.removeClass('hp50');
            $(this).text(msglist_sml010['cmn.close']);
        } else {
            expList.addClass('ofy_a');
            expList.addClass('hp50');
            $(this).text(msglist_sml010['sml.218']);
        }

    });


    /* WEBメール共有 click */
    $(document).on("click", '#head_menu_webmail_share_btn',  function(){
        document.forms[0].CMD.value='shareClick';
        var paramStr = "";

        //詳細メールを開いたときに退避したSIDとモードを取得
        var processTemp = document.forms[0].sml010ProcMode.value;
        getSidEscape();
        paramStr += getFormData($('#smlForm'));

        $.ajax({
            async: true,
            url:  "../smail/sml030.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                var subWindowWidth = $(window).width() * 0.9;
                var subWindowHeight = $(window).height() * 0.9;

                $('#shareDialog').dialog({
                    autoOpen: true,  // hide dialog
                    bgiframe: true,   // for IE6
                    resizable: false,
                    height:subWindowHeight,
                    width: subWindowWidth,
                    minheight: 400,
                    minwidth: 600,
                    modal: true,
                    overlay: {
                        backgroundColor: '#000000',
                        opacity: 0.5
                    }
                });

                var formName = 'fnameShare';
                var url = '../webmail/wml010.do';
                var form = $('<form/>', {action: url, method: 'post', target:'shareFrameName', name:formName});
                form.append($('<input/>',{type:'hidden',name:'wml010smlShareFlg' ,value:1}));
                form.append($('<input/>',{type:'hidden',name:'wml010smlShareTitle' ,value:data["title"]}));
                form.append($('<input/>',{type:'hidden',name:'wml010smlShareBody' ,value:data["detail"]}));
                form.append($('<input/>',{type:'hidden',name:'wml010smlShareHtml' ,value:data["htmlFlg"]}));
                form.append($('<input/>',{type:'hidden',name:'wml010smlShareTemp' ,value:data["pass"]}));
                //body内にformを追加(IE対応)
                $("iframe[name='shareFrameName']").contents().find('body').append(form);
                //サブミット
                form.submit();
            } else {
            document.forms[0].CMD.value="shareError";
                document.forms[0].submit();
                return false;
            }
        }).fail(function(data){
            document.forms[0].CMD.value="shareError";
            document.forms[0].submit();
            return false;
        });
    });

    //差出人アカウント変更時処理
    $('#send_account_comb_box').on('change', function() {

        paramStr = 'CMD=changeSendAccount';
        paramStr += '&smlViewAccount=' + $("#account_comb_box").val();
        paramStr += '&sml020SendAccount= ' + $("#send_account_comb_box").val();
        $.ajax({
            async: true,
            url:  "../smail/sml020.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                $("#popHinaKojin").children().remove();
                hinagataKjnSet(data.sml020HinaListKjn);
            } else {
                alert(msglist_sml010["sml.197"]);
            }
        }).fail(function(data){
            alert(msglist_sml010["sml.197"]);
        });
        return;

    })

    $('#delMailMsgPop').dialog({autoOpen:false});
    $('#labelAddPop').dialog({autoOpen:false});
    $('#labelDelPop').dialog({autoOpen:false});


});

function hinagataKjnSet(hinalist) {
    $("#popHinaKojin").append('<tr class="display_none"></tr>');

    var detail = "";
    if (hinalist.length == 0) {
        detail += '<tr class=""><td  colspan="2">'
        detail += msglist_sml010['error.not.exist.hinagata'];
        detail += '</td></tr>';
    } else {

        for (d = 0; d < hinalist.length; d++) {
            var hinaMdl = hinalist[d];
            var markUrl = "";
            var markName= "";
            var mark = $('#sml_markList').find('[name=' + hinaMdl.shnMark + ']');
            detail += "<tr class=\"js_hinaSelTxt2 js_listHover cursor_p\" data-hinaid="+ hinaMdl.shnSid+">";
            detail += "  <td class=\"border_right_none border_top_none\">";
            if (mark.length > 0) {
            detail += mark.html();
            }
            detail += "  </td>";
            detail += "  <td class=\"w100 border_left_none border_top_none js_hinaSelTxt3\">";
            detail +=        hinaMdl.shnHnameDsp;
            detail += "      <span class=\"tooltips display_n\">"+msglist_sml010['cmn.subject']+"："+hinaMdl.shnTitle;
            detail += "        <br>" + msglist_sml010['cmn.content'] + ":"+ hinaMdl.shnBody;
            detail += "      </span>";
            detail += "  </td>";
            detail += "</tr>";
        }
    }
    $("#popHinaKojin").append(detail);
}

function changeSidData(mailSid) {
    if (mailSid != -1) {
        $('.js_mailBody').attr("data-sid", mailSid);
    }
}

//"新規作成"タブ表示
function openSendTab() {
    changeLeftMenu(0);
    if (!mail_create_flg) {

        mail_create_kakunin_flg = false;
        changeHelpParam(1,1);
        delCreateKakuninArea();

        if (tmp_del_flg) {
            deleteTmpDir();
        } else {
            tmp_del_flg = true;
        }

        $('#inputlength').html("0");

        $("#text_input").val('');

        resetAllDispLink();

        try {
            tinyMCE.get('html_input').setContent('');
        } catch (ae) {
        }
        $('#mail_list_tab').after('<li class="classic-display bor_b1 wp5 m0"></li>'
                + '<li id="mail_create_tab" class="js_mailAreaHead2 tabHeader_tab-off bgI_none pt5 pr10 pl10">'
                + '  <div class="mwp40 verAlignMid js_mailKakuninTabTitle">'
                + msglist_sml010['cmn.create.new']
                + '    <span  class="iconBtn-noBorder cursor_p ml10 hp20 js_mailDelBtnMini">'
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
    editorBeforeUnloadManager.on();
}


//検索エリア  メール種別変更
function changeSearchShubetu() {

    loadingPop(msglist_sml010['cmn.loading']);
    $('#atesaki_search_area').children().remove();
    $('#sml090SltGroup').val(-1);
    $('#sml090SltUser').val(-1);

    document.forms[0].CMD.value='changeMailShubetu';
    //フォームデータ成形
    var formData = getFormData($('#smlForm'));

    //データ取得
    $.ajax({
        async: false,
        url:"../smail/sml090.do",
        type: "post",
        data:formData
    }).done(function( data ) {
        if (data["success"]) {
            try {
                if (data != null && data.sml090SortKeyLabelList.length > 0) {

                    $('select[name=sml090SearchSortKey1]').children().remove();
                    $('select[name=sml090SearchSortKey2]').children().remove();

                    for (i = 0; i < data.sml090SortKeyLabelList.length; i++) {
                        var optStr = "<option value=\""
                            + data.sml090SortKeyLabelList[i].value
                            + "\">"
                            + data.sml090SortKeyLabelList[i].label
                            + "</option>";

                        $('select[name=sml090SearchSortKey1]').append(optStr);
                        $('select[name=sml090SearchSortKey2]').append(optStr);

                    }
                    $('select[name=sml090SearchSortKey1]').val(3);
                    $('select[name=sml090SearchSortKey2]').val(0);

                }
            } catch (ae) {
                alert(msglist_sml010["sml.192"] + ae);
            } finally {
                closeloadingPop();
            }
        } else {
            closeloadingPop();
            alert(msglist_sml010["sml.192"]);
        }

    }).fail(function(data){
        closeloadingPop();
        alert(msglist_sml010["sml.192"]);
    });

}


//検索エリア 選択ユーザ削除
function clearSearchAtesaki() {
    $('#atesaki_search_area').children().remove();
}

//検索結果データ取得
function getSearchGroupUser() {

    document.forms[0].CMD.value='getSearchGrpUsr';
    //フォームデータ成形
    var formData = getFormData($('#smlForm'));

    //データ取得
    $.ajax({
        async: true,
        url:"../smail/sml010.do",
        type: "post",
        data:formData
    }).done(function( data ) {
        if (data["success"]) {
            try {

                $('select[name=sml090SltUser]').children().remove();
                var optStr = "";
                if (data != null && data.sml090UserLabel != null && data.sml090UserLabel.length > 0) {

                    for (i = 0; i < data.sml090UserLabel.length; i++) {
                        var usrLabelMdl = data.sml090UserLabel[i];
                        optStr += "<option ";
                        if (usrLabelMdl.usrUkoFlg == "1") {
                            optStr += "class=\"mukoUserOption\" ";
                        }
                        optStr += "value=\""
                            + usrLabelMdl.value
                            + "\">"
                            + htmlEscape(usrLabelMdl.label)
                            + "</option>";
                    }
                }

                $('select[name=sml090SltUser]').append(optStr);

            } catch (ae) {
                alert(msglist_sml010["sml.191"] + ae);
            }
        } else {
            alert(msglist_sml010["sml.191"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.191"]);
    });

}

//検索エリア ソート
function onSearchTitleLinkClick(fid, order) {

    document.forms[0].CMD.value='changeSortData';
    $('select[name=sml090SearchSortKey1]').val(fid);
    $('input:radio[name=sml090SearchOrderKey1]').val([order]);
    $('input:hidden[name=sml090page1]').val(1);
    $('input:hidden[name=sml090page2]').val(1);
    $('#head_menu_search_btn2').click();
}

//検索結果データ取得
function getSearchData() {

    if (!$("#mail_create_tab").length || $("#mail_create_tab").hasClass("tabHeader_tab-off")) {
        loadingPop(msglist_sml010['cmn.loading']);
    }

    //一覧BODY削除
    $('#mail_search_list_draw_table').children().remove();
    $('#mail_search_list_draw_table').next().children().remove();
    $('#mail_search_list_draw_table').next().removeClass('display_n');
    //エラー削除
    $('.js_errorMsgStr').remove();

    //エラー削除
    $('.js_errorMsgStr').remove();

    //ページング非表示
    $('.js_mailSearchListArea .js_paging_combo').children().remove();
    $('.js_mailSearchListArea .js_paging').addClass('display_none');

    //フォームデータ成形
    var formData = getFormData($('#smlForm'));

    //データ取得
    $.ajax({
        async: true,
        url:"../smail/sml090.do",
        type: "post",
        data:formData
    }).done(function( data ) {
        if (data["success"]) {
            try {

                if (!mail_search_list_flg) {
                    $('#mail_list_tab').after('<li class="classic-display bor_b1 wp5 m0"></li>'
                            + '<li id="mail_search_list_tab" class="tabHeader_tab-off js_mailAreaHead2 bgI_none pt5 pr10 pl10" >'
                            + '  <div class="mwp40 verAlignMid">'
                            + msglist_sml010['cmn.search.result']
                            + '    <span class="iconBtn-noBorder cursor_p ml10 hp20 js_searchMailCloseBtnMini">'
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

                } else {
                    if (document.forms[0].CMD.value != 'reloadSearchData'
                        && document.forms[0].CMD.value != 'getLabelData') {
                        $('#mail_search_list_tab').click();
                    }
                }

                //検索結果 0件
                if (data.sml090SearchResultList == null || data.sml090SearchResultList.length == 0) {
                    $('#mail_search_list_draw_table').next().append("<span class=\"js_errorMsgStr cl_fontWarn errorMsgStr\">" + data.errorsList[0] + "</span>");
                }
                //検索結果 0件
                if (data.sml090SearchResultList != null && data.sml090SearchResultList.length > 0) {
                    $('#mail_search_list_draw_table').next().addClass('display_n');
                    for (i = 0; i < data.sml090SearchResultList.length; i++) {
                        var mailData = data.sml090SearchResultList[i];
                        //alert(mailData.smsTitle);
                    }

                    //hidden項目設定
                    $('#svAtesakiArea').children().remove();
                    $('#svTargetArea').children().remove();
                    $('input:hidden[name=sml090SvSltGroup]').val(data.sml090SvSltGroup);
                    $('input:hidden[name=sml090SvSltUser]').val(data.sml090SvSltUser);
                    $('input:hidden[name=sml090SvMailSyubetsu]').val(data.sml090SvMailSyubetsu);
                    $('input:hidden[name=sml090SvMailMark]').val(data.sml090SvMailMark);
                    $('input:hidden[name=sml090SvKeyWord]').val(data.sml090SvKeyWord);
                    $('input:hidden[name=sml090SvKeyWordkbn]').val(data.sml090SvKeyWordkbn);
                    $('input:hidden[name=sml090SvSearchOrderKey1]').val(data.sml090SvSearchOrderKey1);
                    $('input:hidden[name=sml090SvSearchSortKey1]').val(data.sml090SvSearchSortKey1);
                    $('input:hidden[name=sml090SvSearchOrderKey2]').val(data.sml090SvSearchOrderKey2);
                    $('input:hidden[name=sml090SvSearchSortKey2]').val(data.sml090SvSearchSortKey2);
                    if (data.sml090page1 > 0) {
                        $('input:hidden[name=sml090page1]').val(data.sml090page1);
                    } else {
                        $('input:hidden[name=sml090page1]').val(1);
                    }

                    if (data.sml090page2 > 0) {
                        $('input:hidden[name=sml090page2]').val(data.sml090page2);
                    } else {
                        $('input:hidden[name=sml090page2]').val(1);
                    }


                    if (data.sml090SvAtesaki != null && data.sml090SvAtesaki.length > 0) {
                        for (sva = 0; sva < data.sml090SvAtesaki.length; sva++) {
                            $('#svAtesakiArea').append("<input type=\"hidden\" name=\"sml090SvAtesaki\" value=\"" + data.sml090SvAtesaki[sva]+ "\">");
                        }
                    }

                    if (data.sml090SvSearchTarget != null && data.sml090SvSearchTarget.length > 0) {
                        for (svt = 0; svt < data.sml090SvSearchTarget.length; svt++) {
                            $('#svAtesakiArea').append("<input type=\"hidden\" name=\"sml090SvSearchTarget\" value=\"" + data.sml090SvSearchTarget[svt]+ "\">");
                        }
                    }

                    //html出力
                    var listHtml = createMailListHtml(data.sml090SearchResultList,
                            data.sml090SvMailSyubetsu,
                            data.sml090SvSearchSortKey1,
                            data.sml090SvSearchOrderKey1,
                            data.photoSearchDspFlg, "090");

                    $('#mail_search_list_draw_table').append(listHtml);
                    //ヘッダー部分tableTop設定の初期化
                    $('#mail_search_list_draw_table th').tableTop().initHeader();

                    //ページ表示設定
                    var count1 =  data.smlPageLabel.length;
                    if (count1 > 1) {
                        //ページング表示

                        $('.js_mailSearchListArea .js_paging_combo').children().remove();
                        var pageStr = '';
                        for (p = 0; p < count1; p++) {
                            var labelValue = data.smlPageLabel[p];
                            pageStr +=  '<option value="'
                                +   labelValue.value
                                +    '"';

                            if (data.sml090page1 == labelValue.value) {
                                pageStr += ' selected ';
                            }
                            pageStr += ">"
                                +   labelValue.label
                                +   '</option>';
                        }
                        $('.js_mailSearchListArea .js_paging_combo').append(pageStr);
                        $('.js_mailSearchListArea .js_paging').removeClass('display_none');
                    }


                    //未読メール件数設定
                    $('#midoku_txt').html("");
                    if (data.sml010MidokuCnt != 0) {
                        $('#midoku_txt').append("(" + data.sml010MidokuCnt + ")");
                    }
                    //草稿メール件数設定
                    $('#soko_txt').html("");
                    if (data.sml010SokoCnt != 0) {
                        $('#soko_txt').append("(" + data.sml010SokoCnt + ")");
                    }
                    //未読メール件数(ゴミ箱)設定
                    $('#gomi_txt').html("");
                    if (data.sml010GomiMidokuCnt != 0) {
                        $('#gomi_txt').append("(" + data.sml010GomiMidokuCnt + ")");
                    }

                    //ラベル再描画
                    resetLabelArea();

                    //ディスク容量設定
                    $('#disk_use').html("");
                    $('#disk_use').append(data.sml010AccountDisk);

                }

            } catch (ae) {
                alert(msglist_sml010["sml.192"] + ae);
                console.log(ae);
            } finally {
                closeloadingPop();
            }
        } else {
            closeloadingPop();
            alert(msglist_sml010["sml.192"]);
        }
    }).fail(function(data){
        closeloadingPop();
        alert(msglist_sml010["sml.192"]);
    });

}

function getPopUpMaildata(action, isSearch) {

    let targetList = getTargetList(action, isSearch);
    let mailInfo = [];
    targetList.each(function() {
        let mailData = $(this).closest(".js_listHover");
        let isMidoku = mailData.hasClass("js_mailContent-midoku");
        let title = mailData.find(".js_title").text();
        mailInfo.push({titleText: title, midokuFlg: isMidoku});
    });

    let actionStr = "";
    if (action == "pdf") {
        actionStr = msglist_sml010["sml.sml010.22"]
    } else if (action == "eml") {
        actionStr = msglist_sml010["sml.sml010.23"]
    } else if (action == "kidoku") {
        actionStr = msglist_sml010["sml.sml010.24"]
    } else if (action == "midoku") {
        actionStr = msglist_sml010["sml.sml010.25"]
    } else if (action == "delete") {
        actionStr = msglist_sml010["sml.sml010.30"]
    } else if (action == "revive") {
        actionStr = msglist_sml010["sml.sml010.27"]
    } else if (action == "dust") {
        actionStr = msglist_sml010["sml.sml010.26"]
    }

    let message = "";
    message += `${actionStr}<br><br>`;
    let isMidokuMessage = false;
    for (let i = 0; i < mailInfo.length; i++) {
        if (mailInfo[i].midokuFlg && action == "dust") {
            isMidokuMessage = true;
            message += `<font color='#ff0000'><strong>・${htmlEscape(mailInfo[i].titleText)}</strong></font>`;
        } else {
            message += `・${htmlEscape(mailInfo[i].titleText)}`;
        }
        message += "<br>";
    }
    if (isMidokuMessage) {
        message += `<br>${msglist_sml010["sml.sml010.29"]}`;
    } else {
        message += `<br>${msglist_sml010["cmn.confirm"]}`;
    }

    let messageData = new Object();
    messageData.messageList = new Array();
    messageData.messageList.push(message);

    return messageData;
}

function checkSelected(action, isSearch) {
    let targetList = getTargetList(action, isSearch);

    if (targetList == null || targetList.length == 0) {
        let errorMsgStr = "";
        if (action == "pdf") {
            errorMsgStr = msglist_sml010["sml.225"]
        } else if (action == "eml") {
            errorMsgStr = msglist_sml010["sml.226"]
        } else if (action == "kidoku") {
            errorMsgStr = msglist_sml010["sml.227"]
        } else if (action == "midoku") {
            errorMsgStr = msglist_sml010["sml.228"]
        } else if (action == "label") {
            errorMsgStr = msglist_sml010["sml.233"]
        } else if (action == "dust" || action == "delete") {
            errorMsgStr = msglist_sml010["sml.232"]
        } else if (action == "revive") {
            errorMsgStr = msglist_sml010["sml.234"]
        }
        messagePop(errorMsgStr, 400, 'auto');
        return false;
    }
    return true;
}

function getTargetList(action, isSearch) {
    let targetList;
    let mode;
    if (isSearch) {
        targetList = $(`input[name="sml090DelSid"]:checked`);
        mode = document.forms[0].sml090MailSyubetsu.value;
    } else {
        targetList = $(`input[name="sml010DelSid"]:checked`);
        mode = document.forms[0].sml010ProcMode.value;
    }
    if (targetList == null) {
        return targetList;
    }

    //削除フォルダ，ラベルフォルダが選択されていて既読/未読が実行される場合は、受信メールのみを対象とする
    if ((mode == 4 || mode == 5) && (action == "kidoku" || action == "midoku")) {
        targetList = targetList.filter(function() {
            return $(this).val().startsWith("0");
        });
    }
    return targetList;
}

function deleteSearchListMail(action) {

    if (!checkSelected(action, true)) {
        return;
    }
    let messageData = getPopUpMaildata(action, true);
    deleteMailPop(messageData, 5);
}

function doDeleteSearchListMail() {

    document.forms[0].CMD.value='deleteDataOk';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));
    var checked = false;
    $('input:checkbox[name=sml090DelSid]:checked').each(function(){
        checked = true;
    });
    if (!checked) {
        messagePop(msglist_sml010['sml.sml010.13'], 400, 'auto');
        return;
    }

    $.ajax({
        async: true,
        url:  "../smail/sml090.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                $("#toastMessageBody").html("").append(data.messageList[0]);
                displayToast("sml010MessageToast");
                $('#errorMsgArea').html("");
                reloadData();
            }
        } else {
            alert(msglist_sml010["sml.193"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.193"]);
    });
}


function changeLeftMenu(mode) {

    //0:新規作成
    //1:新規作成以外

    if (mode == 0) {
        if ($("#sml_account_area").children().hasClass("side_header-open")) {
            $("#sml_account_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($("#sml_account_area").children());
        }

        if ($("#sml_mailbox_area").children().hasClass("side_header-open")) {
            $("#sml_mailbox_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($("#sml_mailbox_area").children());
        }

        if ($("#sml_shain_area").children().hasClass("side_header-close")) {
            $("#sml_shain_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($("#sml_shain_area").children());
        }

        if ($("#sml_hina_kyotu_area").children().hasClass("side_header-close")) {
            $("#sml_hina_kyotu_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($("#sml_hina_kyotu_area").children());
        }

        if ($("#sml_hina_kojin_area").children().hasClass("side_header-close")) {
            $("#sml_hina_kojin_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($("#sml_hina_kojin_area").children());
        }

    } else {
        if ($("#sml_account_area").children().hasClass("side_header-close")) {
            $("#sml_account_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($("#sml_account_area").children());
        }

        if ($("#sml_mailbox_area").children().hasClass("side_header-close")) {
            $("#sml_mailbox_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($("#sml_mailbox_area").children());
        }

        if ($("#sml_hina_kyotu_area").children().hasClass("side_header-open")) {
            $("#sml_hina_kyotu_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($("#sml_hina_kyotu_area").children());
        }

        if ($("#sml_hina_kojin_area").children().hasClass("side_header-open")) {
            $("#sml_hina_kojin_child_area").animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
            changeSelImg($("#sml_hina_kojin_area").children());
        }
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

function changeTab(elm) {

    $('.js_mailAreaHead').removeClass('tabHeader_tab-on');
    $('.js_mailAreaHead2').removeClass('bgC_header2');
    $('.js_mailAreaHead').addClass('tabHeader_tab-off');
    $('.js_mailAreaHead2').addClass('tabHeader_tab-off');

    elm.removeClass('tabHeader_tab-off');
    elm.addClass('tabHeader_tab-on');
    elm.addClass('bgC_header2');

    if (elm.attr('id') == 'mail_list_tab') {
        //メール一覧タブ
        changeLeftMenu(1);
        $('.js_mailCreateArea').addClass('display_none');
        $('.js_mailCreateKakuninArea').addClass('display_none');
        $('.js_mailKakuninArea').addClass('display_none');
        $('.js_mailSearchListArea').addClass('display_none');
        $('.js_mailListArea').removeClass('display_none');
        $('.js_tabHeader_serchSpace').removeClass('display_none');
        $('#search_area_table').addClass('display_none');
        now_sel_tab = 'mail_list_tab';


        changeHelpParam($('input:hidden[name=sml010ProcMode]').val(), 0);

    } else if (elm.attr('id') == 'mail_create_tab') {
        //新規作成タブ
        changeLeftMenu(0);
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

        changeHelpParam($('input:hidden[name=sml010ProcMode]').val(), 1);

    } else if (elm.attr('id') == 'mail_kakunin_tab') {
        //確認タブ
        changeLeftMenu(1);
        $('.js_mailListArea').addClass('display_none');
        $('.js_mailSearchListArea').addClass('display_none');
        $('.js_mailCreateArea').addClass('display_none');
        $('.js_mailCreateKakuninArea').addClass('display_none');
        $('.js_mailKakuninArea').removeClass('display_none');
        $('.js_tabHeader_serchSpace').removeClass('display_none');
        $('#search_area_table').addClass('display_none');

        changeHelpParam($('input:hidden[name=sml010ProcMode]').val(), 2);

    } else if (elm.attr('id') == 'mail_search_list_tab') {
        //検索結果タブ
        changeLeftMenu(1);
        $('.js_mailListArea').addClass('display_none');
        $('.js_mailCreateArea').addClass('display_none');
        $('.js_mailCreateKakuninArea').addClass('display_none');
        $('.js_mailKakuninArea').addClass('display_none');
        $('.js_tabHeader_serchSpace').addClass('display_none');
        $('.js_mailSearchListArea').removeClass('display_none');
        $('#search_area_table').removeClass('display_none');
        now_sel_tab = 'mail_search_list_tab';

        changeHelpParam($('input:hidden[name=sml010ProcMode]').val(), 3);
    }
}

function delNewCreateMail(id, kbn, elm) {
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
                    text:msglist_sml010["cmn.ok"],
                    click: function() {
                        //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送 4:草稿)
                        $('input:hidden[name=sml020ProcMode]').val(0);

                        if (kbn == 2) {
                            var accountId = elm.attr('data-accountid');
                            resetParam();
                            $('select[name=smlViewAccount]').val(accountId);
                            editorBeforeUnloadManager.onTemporary();
                            buttonPush();
                        } else if (kbn == 3) {
                            resetParam();
                            editorBeforeUnloadManager.onTemporary();
                            buttonPush();
                        } else {
                            deleteNewCreateMail(id)
                            $(this).dialog('close');
                        }
                    }
                },
                {
                    name:"DIALOG_CANCEL_BUTTON",
                    text:msglist_sml010["cmn.cancel"],
                    click: function() {

                        if (kbn == 3) {
                            $('select[name=smlViewAccount]').val($('#smlViewAccountSv').val());
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
                    + msglist_sml010["cmn.ok"];

                document.getElementsByName('DIALOG_CANCEL_BUTTON')[0].setAttribute("class","baseBtn");
                document.getElementsByName('DIALOG_CANCEL_BUTTON')[0].innerHTML =
                    '<img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="">'
                    + '<img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="">'
                    + msglist_sml010["cmn.cancel"];
            }
        });

    } else {
        deleteNewCreateMail(id);
    }
}

function deleteNewCreateMail(id) {
    changeLeftMenu(1);
    del_btn_mini_flg = true;
    $(id).parents('li').eq(0).prev().remove();
    $(id).parents('li').eq(0).remove();
    resetMailCreate();
    changeTab($('#mail_list_tab'));
    mail_create_flg = false;
    mail_create_kakunin_flg = false;
    changeHelpParam(1,1);
    delCreateKakuninArea();
    editorBeforeUnloadManager.off();

    dsp_to_kbn = 0;
    dsp_cc_kbn = 0;
    dsp_bcc_kbn = 0;
}

var reloading_flg = false;
function reloadData() {

    if (!reloading_flg) {

        var dialodIsOpenDel = $('#delMailMsgPop').dialog('isOpen');
        var dialodIsOpenLabelAdd = $('#labelAddPop').dialog('isOpen');
        var dialodIsOpenLabelDel = $('#labelDelPop').dialog('isOpen');
        //確認メッセージロード中は更新しない
        if (load_kakunin_message_flg) {
            return;
        }
        //ダイアログが表示されていた場合は更新しない
        if (dialodIsOpenDel != true
                && dialodIsOpenLabelAdd != true
                && dialodIsOpenLabelDel != true) {

            document.forms[0].CMD.value='getInitData';
            getMailData();

            if(mail_search_list_flg) {
                document.forms[0].CMD.value='reloadSearchData';
                getSearchData();
            }
        }
    }

}

var html_input_flg = false;
function changeSendMailType(kbn) {


    if (kbn != 0) {
        //ユーザのデフォルトの形式
        var sendMailType = $('input:hidden[name=sml010AccountSendMailType]').val();
        if (sendMailType == 0) {
            $("#text_input_area").addClass('display_none');
            $("#html_input_area").removeClass('display_none');
            $("#text_text").removeClass('display_none');
            $("#text_html").addClass('display_none');
        } else {
            $("#text_input_area").removeClass('display_none');
            $("#html_input_area").addClass('display_none');
            $("#text_text").addClass('display_none');
            $("#text_html").removeClass('display_none');
        }
    }

    if ($("#html_input_area").hasClass('display_none')) {
        $("#html_input_area").removeClass('display_none');
        $("#text_input_area").addClass('display_none');
        $("#text_count_area").addClass('display_none');
    } else {
        $("#text_input_area").removeClass('display_none');
        $("#text_count_area").removeClass('display_none');
        $("#html_input_area").addClass('display_none');
    }

    if (!html_input_flg) {
        tinyMceInit();
    }

    if ($("#text_html").hasClass('display_none')) {

        $("#text_text").addClass('display_none');
        $("#text_html").removeClass('display_none');
        $('input:hidden[name=sml020MailType]').val(0);

        var htmlAreaStr = "";
        if (tinyMCE.get('html_input') != null) {
            htmlAreaStr = tinyMCE.activeEditor.getContent().replace(/<br \/>/gi, '\n').replace(/<\S[^><]*>/g, '');
        }

        if (htmlAreaStr != null && htmlAreaStr.length > 0 && htmlAreaStr != "\n") {
            htmlAreaStr = formatBodyText(htmlAreaStr);
            $("#text_input").val(htmlAreaStr);
            $('#inputlength').html(htmlAreaStr.length);
        }

    } else {
        $("#text_html").addClass('display_none');
        $("#text_text").removeClass('display_none');
        $('input:hidden[name=sml020MailType]').val(1);
        setCopyTextAreaStr();
    }

    setContentInsertArea();
}

function formatBodyText(txtVal) {
    var lines;
    if (txtVal.indexOf('\n') < 0) {
        lines = [txtVal];
    } else {
        lines = txtVal.split('\n');
    }

    var formatTxt = '';
    for (idx = 0; idx < lines.length; idx++) {
        if (idx >= 1) {
            formatTxt += '\n';
        }
        formatTxt += $('<div/>').html(lines[idx]).text();
    }
    return formatTxt;
}

function setCopyTextAreaStr() {


    if ($("#text_input").val() != "" && $("#text_input").val() != null) {
        tinyMCE.get('html_input').setContent(textBr(htmlEscape($("#text_input").val())));
    }
    $('html,body').scrollTop(0);
}

function setTextHtmlAreaStr() {

    tinyMCE.get('html_input').setContent($('input:hidden[name=sml020BodyHtml]').val());
    $('html,body').scrollTop(0);




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
        entity_encoding : "raw",
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

function addElementBody(type, src) {
    tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), type, {src : src});
}

function setupTinymce(editor) {
    editor.ui.registry.addButton('addbodyfile', {
        text: msglist["cmn.insert.content"],
        onAction: function () {
            attachmentLoadFile('2');
        }
    });
}

/**
 * メールリストの出力処理
 * @param smlList 出力メールリスト
 * @param procMode メールボックス区分
 * @param dataSortKey ソートキー
 * @param dataOrderKey オーダーキー
 * @param dataPhotoDsp 写真表示フラグ
 * @param listKbn 一覧区分 "010":一覧  "090"：検索結果一覧
 * @returns
 */
function createMailListHtml(smlList, procMode, dataSortKey, dataOrderKey, dataPhotoDsp, listKbn) {
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
        strHeadTitle += '<th class="table_title-color cursor_p '+ width +'">';
        strHeadTitle += '<a href="#!" class="js_mailListHeadSel" data-sortkey="'
            + sortKey +'" data-orderkey="'+ orderKey +'">'
            + title
            + sort+ '</a>';
        strHeadTitle += '</th>';
        return strHeadTitle;
    }

    //ヘッダー行
    retHtml += '<tr >';
    //チェックボックス
    retHtml += '<th class="table_title-color js_tableTopCheck js_tableTopCheck-header wp25 cursor_p">';
    retHtml += '  <input class="" type="checkbox" name="allCheck" onclick="" >';
    retHtml += '</th>';
    //未読
    retHtml += '<th class="table_title-color wp30">';
    retHtml += '  <div class="wp15"></div>';
    retHtml += '</th>';
    //宛先・差出人
    if (procMode == "0"
        || procMode == "4"
        || procMode == "5") {
        retHtml += creatSortTh(2, msglist_sml010["cmn.sendfrom"], dataSortKey, dataOrderKey, 'w20');
    } else {
        retHtml += '<th class="table_title-color w20">';
        retHtml += msglist_sml010["cmn.from"];
        retHtml += '</th>';
    }
    //件名
    retHtml += creatSortTh(1, msglist_sml010["cmn.subject"], dataSortKey, dataOrderKey, 'w50');
    //サイズ
    retHtml += creatSortTh(5, msglist_sml010["cmn.size"], dataSortKey, dataOrderKey, 'wp80');
    //日次
    retHtml += creatSortTh(3, msglist_sml010["cmn.date"], dataSortKey, dataOrderKey, 'wp100');
    retHtml += "</tr>";


    /* メール一覧 */

    for (i = 0; i < smlList.length; i++) {
        var smlMdl = smlList[i];
        var mod = 0;
        var nextSmlMdl, prevSmlMdl;
        //次のメールのSID取得
        if (i < smlList.length) {
            var nextNum = i + 1;
            nextSmlMdl = smlList[nextNum];
        }

        //前のメールのSID取得
        if (i != 0 && smlList.length > 1) {
            var prevNum = i - 1;
            prevSmlMdl = smlList[prevNum];
        }

        //既読
        var mailContextClass = "js_mailContent-kidoku"
        var mailReadClass = "";
        var mailReadLinkClass = "cl_linkVisit";
        if (procMode == "0" || (procMode == "5" && smlMdl.mailKbn == "0") || (procMode == "4" && smlMdl.mailKbn == "0")) {
            if (smlMdl.smjOpkbn == "0") {
                mailReadClass="fw_bold";
                mailReadLinkClass = "cl_linkDef";
                mailContextClass = "js_mailContent-midoku"
            }
        }

        retHtml += '<tr class="js_listHover cursor_p ' + mailContextClass + '" '
            + 'data-smlsid="' + smlMdl.smlSid+ '"'
            + 'data-mailkbn="' + smlMdl.mailKbn+ '"';
        if (nextSmlMdl != null) {
            retHtml += 'data-nextsid="' + nextSmlMdl.smlSid+ '"';
            retHtml += 'data-nextkbn="' + nextSmlMdl.mailKbn+ '"';
        }
        if (prevSmlMdl != null) {
            retHtml += 'data-prevsid="' + prevSmlMdl.smlSid+ '"';
            retHtml += 'data-prevkbn="' + prevSmlMdl.mailKbn+ '"';
        }

        retHtml += ' >';


        //既読
        var mailReadClass = "";
        var mailReadLinkClass = "cl_linkVisit";
        if (procMode == "0" || (procMode == "5" && smlMdl.mailKbn == "0") || (procMode == "4" && smlMdl.mailKbn == "0")) {
            if (smlMdl.smjOpkbn == "0") {
                mailReadClass="fw_bold";
                mailReadLinkClass = "cl_linkDef";
            }
        }

        //チェックボックス
        retHtml += ' <td class="js_tableTopCheck txt_c">';
        retHtml += '   <input type="checkbox" name="sml' + listKbn + 'DelSid" value="' + smlMdl.mailKey + '">';
        retHtml += ' </td>';

        //既読・未読・返信・転送
        retHtml += ' <td class="js_mailContent fw_n txt_c p0 pl5 pr5">';

        if (procMode == "0" || (procMode == "5" && smlMdl.mailKbn == "0") || (procMode == "4" && smlMdl.mailKbn == "0")) {
            if (smlMdl.smjOpkbn == "0") {
                retHtml += '   <img class="classic-display" src="../common/images/classic/icon_midoku.png">';
                retHtml += '   <img class="original-display" src="../common/images/original/icon_midoku.png">';
            }
            if (smlMdl.fwKbn != "0") {
                retHtml += '   <img class="classic-display" src="../common/images/classic/icon_forward.png">';
                retHtml += '   <img class="original-display" src="../common/images/original/icon_forward.png">';
            }
            if (smlMdl.returnKbn != "0") {
                retHtml += '   <img class="classic-display" src="../common/images/classic/icon_replay.png">';
                retHtml += '   <img class="original-display" src="../common/images/original/icon_replay.png">';
            }
        }
        retHtml += ' </td>';


        //差出人・宛先
        retHtml += ' <td class="js_mailContent ' + mailReadClass + ' p0 pl5 pr5 ">';
        if (procMode == "0"
            || procMode == "4"
            || procMode == "5") {
            //受信・ゴミ箱・ラベル
            retHtml += '<div class="verAlignMid">';

            if (dataPhotoDsp=="0") {
                if (smlMdl.photoFileDsp == "1") {
                    retHtml +=  "<div class=\"hikokai_photo-s wp25 verAlignMid mr5\"><span class=\"hikokai_text mrl_auto \">"+ msglist_sml010['cmn.private.photo'] +"</span></div>";
                } else if (smlMdl.binFileSid == "0"
                    || smlMdl.usrJkbn == "9" || smlMdl.usrJkbn == "1") {

                    retHtml +=  "<img src=\"../common/images/classic/icon_photo.gif\" name=\"userImage"
                        +   smlMdl.smlSid
                        +   "\" alt=\""+ msglist_sml010['cmn.photo'] +"\" class=\"wp25 mr5 btn_classicImg-display\" onload=\"initImageView50('userImage"
                        +   smlMdl.smlSid
                        +   "');\">";
                    retHtml +=  "<img src=\"../common/images/original/photo.png\" name=\"userImage"
                        +   smlMdl.smlSid
                        +   "\" alt=\""+ msglist_sml010['cmn.photo'] +"\" class=\"wp25 mr5 btn_originalImg-display\" onload=\"initImageView50('userImage"
                        +   smlMdl.smlSid
                        +   "');\">";

                } else {
                    retHtml +=  "<img src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid="
                        +   smlMdl.binFileSid
                        +   "&smlViewAccount="
                        +   $("#account_comb_box").val()
                        +   "\" name=\"userImage"
                        +   smlMdl.smlSid
                        +   "\" alt=\""+msglist_sml010['cmn.user']+"\" class=\"wp25 mr5\" onload=\"initImageView50('userImage"
                        +   smlMdl.smlSid
                        +   "');\">";
                }

            }
            var usrCls = '';
            if (smlMdl.usrJkbn == "9" || smlMdl.usrJkbn == "1") {
                usrCls = 'delete_border';
            } else if (smlMdl.usrUkoFlg == "1") {
                usrCls = "mukoUser";
            }
            retHtml += '<span class="' + usrCls + ' ">';
            if (smlMdl.usrSid <= 0) {
                retHtml +=   htmlEscape(smlMdl.accountName);
            } else {
                retHtml +=   htmlEscape(smlMdl.usiSei);
                retHtml +=   '&nbsp;'
                retHtml +=   htmlEscape(smlMdl.usiMei);
            }
            retHtml += '</span>'
            retHtml += '</div >';

        } else {
            //送信・草稿
            if (smlMdl.atesakiList != null) {
                var listSize = smlMdl.atesakiList.length;
                var cutFlg = 0;
                if (listSize > 3) {
                    cutFlg = 1;
                }

                for (n = 0; n < listSize; n++) {
                    var atesaki = smlMdl.atesakiList[n];
                    var inlineClass = 'verAlignMid';
                    if (listSize > 1) {
                        inlineClass = 'txt_m';
                    }
                    retHtml += '<span class="' + inlineClass + ' mr5">';
                    if (listSize < 2 && dataPhotoDsp=="0") {
                        if (atesaki.photoFileDsp == "1") {
                            retHtml +=  "<div class=\"hikokai_photo-s wp25 verAlignMid mr5\"><span class=\"hikokai_text mrl_auto\">"+ msglist_sml010['cmn.private.photo'] +"</span></div>";
                        } else if (atesaki.binFileSid == "0"
                            || atesaki.usrJkbn == "9" || atesaki.usrJkbn == "1") {

                            retHtml +=  "<img src=\"../common/images/classic/icon_photo.gif\" name=\"userImage"
                                +   atesaki.smlSid
                                +   "\" alt=\""+ msglist_sml010['cmn.photo'] +"\" class=\"wp25 mr5 btn_classicImg-display\" onload=\"initImageView50('userImage"
                                +   atesaki.smlSid
                                +   "');\">";
                            retHtml +=  "<img src=\"../common/images/original/photo.png\" name=\"userImage"
                                +   atesaki.smlSid
                                +   "\" alt=\""+ msglist_sml010['cmn.photo'] +"\" class=\"wp25 mr5 btn_originalImg-display\" onload=\"initImageView50('userImage"
                                +   atesaki.smlSid
                                +   "');\">";
                        } else {
                            retHtml +=  "<img src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid="
                                +   atesaki.binFileSid
                                +   "&smlViewAccount="
                                +   $("#account_comb_box").val()
                                +   "\" name=\"userImage"
                                +   atesaki.smlSid
                                +   "\" alt=\""+msglist_sml010['cmn.user']+"\" class=\"wp25 mr5\" onload=\"initImageView50('userImage"
                                +   atesaki.smlSid
                                +   "');\">";

                        }

                    }
                    var usrCls = '';
                    if (atesaki.usrJkbn == "9" || atesaki.usrJkbn == "1") {
                        usrCls = 'delete_border';
                    } else if (atesaki.usrUkoFlg == "1") {
                        usrCls = "mukoUser";
                    }

                    retHtml += '<span class="' + usrCls + ' ">';
                    if (atesaki.usrSid <= 0 ) {
                        retHtml +=   htmlEscape(atesaki.accountName);
                    } else {
                        retHtml +=   htmlEscape(atesaki.usiSei);
                        retHtml +=   '&nbsp;'
                        retHtml +=   htmlEscape(atesaki.usiMei);
                        retHtml += '</span>';

                    }

                    if (n < listSize -1) {
                        if ((cutFlg == 0) || (cutFlg != 0 && n != 2)) {
                            retHtml +=  ";";
                        }
                        if (n == 2 && cutFlg == 1) {
                            retHtml +=  "…";
                            break;
                        }
                    }
                    retHtml += '</span>';
                }

            }

        }
        retHtml += ' </td>';


        //件名
        retHtml += ' <td class="js_mailContent ' + mailReadClass + ' p0 pl5 pr5 txt_l">';

        var imgMark = smlMdl.smsMark;
        if ($('#sml_markList_mlnon div[name="'+imgMark+'"]').length > 0) {
            //マーク
            var markClone = $('#sml_markList_mlnon div[name="'+imgMark+'"]').clone();
            retHtml += markClone.html();
        }
        if (smlMdl.binCnt != 0) {
            //添付
            retHtml += '<img class="classic-display mr5 txt_m" src="../common/images/classic/icon_temp_file.gif" ' + msglist_sml010['cmn.attach.file'] + '>';
            retHtml += '<img class="original-display mr5 txt_m" src="../common/images/original/icon_attach.png" ' + msglist_sml010['cmn.attach.file'] + '>';
        }
        if (smlMdl.labelList != null && smlMdl.labelList.length > 0) {
            //ラベル
            retHtml +=  "<span class=\"baseLabel ml0 mr5 verAlignMid fw_n\">";

            for (l = 0; l < smlMdl.labelList.length; l++) {

                if (l != 0) {
                    retHtml +=  ",";
                }

                var lblMdl = smlMdl.labelList[l];

                retHtml += $('<span></span>').text(lblMdl.slbName).html();
            }

            retHtml +=  "</span>";
        }
        retHtml += '<span class="' + mailReadLinkClass + ' word_b-all js_title">';

        if (procMode == "4" || procMode == "5") {
            //ラベル ゴミ箱の場合は元フォルダ名
            if (smlMdl.mailKbn == "0") {
                retHtml +=  "["+ msglist_sml010['cmn.receive'] +"]";
            }
            if (smlMdl.mailKbn == "1") {
                retHtml +=  "["+ msglist_sml010['cmn.sent'] +"]";
            }
            if (smlMdl.mailKbn == "2") {
                retHtml +=  "["+ msglist_sml010['cmn.draft'] +"]";
            }
        }
        retHtml += smlMdl.smsTitle + '</span></span>';
        retHtml += ' </td>';

        //サイズ
        retHtml += ' <td class="js_mailContent ' + mailReadClass + '  txt_c">';
        retHtml += '   <div>' + smlMdl.smlSizeStr + '</div>';
        retHtml += ' </td>';
        //日時
        retHtml += ' <td class="js_mailContent ' + mailReadClass + ' txt_c">';
        retHtml += '   <div class="txt_c">';
        retHtml += '     <div>' + smlMdl.strSdate.substring(0, 11) + '</div>';
        retHtml += '     <div>' + smlMdl.strSdate.substring(11) + '</div>';
        retHtml += '   </div>';
        retHtml += ' </td>';


    }

    return retHtml;
}

//初期データ取得
function getMailData() {

    reloading_flg = true;

    //一覧BODY削除
    $('#mail_list_draw_table').children().remove();
    //ページング非表示
    $('.js_mailListArea .js_paging_combo').children().remove();
    $('.js_mailListArea .js_paging').addClass('display_none');
    //エラー削除
    $('.js_errorMsgStr').remove();

    //フォームデータ成形
    var formData = getFormData($('#smlForm'));

    //データ取得
    $.ajax({
        async: true,
        url:"../smail/sml010.do",
        type: "post",
        data:formData
    }).done(function( data ) {
        if (data["success"]) {
            try {

                var listHtml = createMailListHtml(data.sml010SmlList,
                        data.sml010ProcMode,
                        data.sml010Sort_key,
                        data.sml010Order_key,
                        data.photoDspFlg, "010");

                //html出力
                $('#mail_list_draw_table').append(listHtml);
                //ヘッダー部分tableTop設定の初期化
                $('#mail_list_draw_table th').tableTop().initHeader();

                //ページ表示設定
                var count1 = data.sml010PageLabel.length;
                if (count1 > 1) {
                    //ページング表示

                    $('.js_mailListArea .js_paging_combo').children().remove();
                    var pageStr = '';
                    for (p = 0; p < count1; p++) {
                        var labelValue = data.sml010PageLabel[p];

                        pageStr +=  '<option value="'
                            +   labelValue.value
                            +    '"';

                        if (data.sml010PageNum == labelValue.value) {
                            pageStr += ' selected ';
                        }
                        pageStr += '>'
                            +   labelValue.label
                            +   '</option>';

                    }
                    $('.js_mailListArea .js_paging_combo').append(pageStr);
                    $('.js_mailListArea .js_paging').removeClass('display_none');
                }

                //ページ設定
                $('input:hidden[name=sml010PageNum]').val(data.sml010PageNum);

                //ソート設定
                $('input:hidden[name=sml010Sort_key]').val(data.sml010Sort_key);
                $('input:hidden[name=sml010Order_key]').val(data.sml010Order_key);

                //チェックボックスリセット
                document.forms[0].allCheck.checked = false;

                //未読メール件数設定
                $('#midoku_txt').html("");
                if (data.sml010MidokuCnt != 0) {
                    $('#midoku_txt').append("(" + data.sml010MidokuCnt + ")");
                }
                //草稿メール件数設定
                $('#soko_txt').html("");
                if (data.sml010SokoCnt != 0) {
                    $('#soko_txt').append("(" + data.sml010SokoCnt + ")");
                }
                //未読メール件数(ゴミ箱)設定
                $('#gomi_txt').html("");
                if (data.sml010GomiMidokuCnt != 0) {
                    $('#gomi_txt').append('(' + data.sml010GomiMidokuCnt + ')');
                }

                //ラベル再描画
                resetLabelArea();

                //ディスク容量設定
                $('#disk_use').html("");
                $('#disk_use').append(data.sml010AccountDisk);

                if (data.sml010ProcMode == "0") {
                    /* 右 click (メール行) 既読にする*/
                    $('#mail_list_draw_table .js_mailContent-midoku').contextMenu('context_menu2',
                            {
                        bindings: {
                            'mail_read': function(t) {
                                contextRead(0, t);
                            }
                        }
                            });
                    /* 右 click (メール行) 未読にする*/
                    $('#mail_list_draw_table .js_mailContent-kidoku').contextMenu('context_menu3',
                            {
                        bindings: {
                            'mail_no_read': function(t) {
                                contextRead(1, t);
                            }
                        }
                            });
                }
                //送信先制限設定
                banGroupStr = "";
                if (data.sml010disableGroupSid != null && data.sml010disableGroupSid != "") {
                    for (i = 0; i < data.sml010disableGroupSid.length; i++) {
                        banGroupStr += "<input type=\"hidden\" name=\"sml010disableGroupSid\" value=\""
                            +   data.sml010disableGroupSid[i] + "\">";
                    }
                }
                $('#sml010disableGroupSidArea').children().remove();
                $('#sml010disableGroupSidArea').append(banGroupStr);
                banUserStr = "";
                if (data.sml010banUserSid != null && data.sml010banUserSid != "") {
                    for (i = 0; i < data.sml010banUserSid.length; i++) {
                        banUserStr += "<input type=\"hidden\" name=\"sml010banUserSid\" value=\""
                            +   data.sml010banUserSid[i] + "\">";
                    }
                }
                $('#sml010banUserSidArea').children().remove();
                $('#sml010banUserSidArea').append(banUserStr);
        } catch (ae) {
            alert(msglist_sml010["sml.194"] + ae);
            console.log(ae);
        } finally {
            closeloadingPop();
        }
        } else {
            closeloadingPop();
            alert(msglist_sml010["sml.194"]);
        }

    }).fail(function(data){
        closeloadingPop();
        alert(msglist_sml010["sml.194"]);
    });

    reloading_flg = false;

}

function getFormData(formObj) {

    var formData = "";
    formData = formObj.serialize();

    return formData;
}

function getFormParam(formObj) {

    var serialArr = formObj.serializeArray();
    var ret = {};
    $.each(serialArr, function () {
        if (ret[this.name]) {
            if (!Array.isArray(ret[this.name])) {
                ret[this.name] = [ret[this.name]];
            }
            ret[this.name].push(this.value);
        } else {
            ret[this.name]= this.value;
        }
    });
    return ret;
}

/**
 * 宛先（CC）表示の描画を行う
 * 登録確認、送信メール確認用
 *
 */
function dspAtesaki(detailBlock, targetClass, atesakiList, showPict) {

    var select = detailBlock.find(targetClass).eq(0);

    if (!atesakiList || atesakiList.length <= 0) {
        //なければ非表示
        select.parent().remove();
        return;
    }

    for (var t = 0; t < atesakiList.length; t++) {

        var atesakiMdl = atesakiList[t];

        var mukoFlg = false;
        var delFlg = false;
        var name;


        if (atesakiMdl.usrSid > 0) {
            name = atesakiMdl.usiSei + ' ' + atesakiMdl.usiMei;
            if (atesakiMdl.usrJkbn == "9") {
                delFlg = true;
            } else if (atesakiMdl.usrUkoFlg == "1") {
                mukoFlg = true;
            }

        } else {
            name = atesakiMdl.accountName;
            if (atesakiMdl.accountJkbn == "1") {
                delFlg = true;
            }
        }
        var dsp;
        if (showPict) {
            dsp = $('<div></div>').appendTo(select);
            dsp.addClass('photoList');

            __dispUserIcon(dsp, atesakiMdl);
            dsp = $('<div></div>').appendTo(dsp);
            dsp.addClass('txt_c');
        } else {
            dsp = $('<div></div>').appendTo(select);
            dsp.addClass('display_inline');

            if (t != 0) {
                name = ', ' + name;
            }
        }

        if (delFlg) {
            dsp = $('<span></span>').appendTo(dsp);
            dsp.addClass('delete_border');
            dsp.text(name);
            continue;
        }
        if (mukoFlg) {
            dsp = $('<div></div>').appendTo(dsp);
            dsp.addClass('mukoUser');
            dsp.text(name);
            continue;
        }

        dsp.text(name);


    }
    return;

    /**
     * 宛先部の画像表示
     */
    function __dispUserIcon(dsp, atesakiMdl) {

        //画像非公開
        if (atesakiMdl.photoFileDsp == "1") {
            dsp.append("<div class=\"hikokai_photo-m txt_c wp50\"><span class=\"hikokai_text\">"+msglist_sml010['cmn.private']+"</span></div>");
            return;
        }

        if (atesakiMdl.photoFileDsp == "0") {
            //デフォルト画像
            if (atesakiMdl.binFileSid == "0" || atesakiMdl.usrJkbn == "9") {
                dsp.append('<img alt="'+msglist_sml010['cmn.photo']+'" class="classic-display wp50" src="../common/images/classic/icon_photo.gif">');
                dsp.append('<img alt="'+msglist_sml010['cmn.photo']+'" class="original-display wp50" src="../common/images/original/photo.png">');
                return;
            }
            dsp.append("<img src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid="
                        +  atesakiMdl.binFileSid
                        +   "&smlViewAccount="
                        +   $("#account_comb_box").val()
                        +  "\" name=\"userImage"
                        +  atesakiMdl.usrSid
                        +  "\" alt=\""+msglist_sml010['cmn.photo']+"\" onload=\"initImageView50('userImage"
                        +  atesakiMdl.usrSid
                        +  "');\" class=\"wp50\">");
        }

    }

}


//メール情報取得(受信・送信・ごみ箱)
function getDetail(sid, kbn, searchFlg, reloadFlg, getMailKbn) {

    var dspMailKbn__ = 0;

    detail_mail_sid = sid;

    var cmdStr = "getDetail";
    document.forms[0].selectEsc.value = sid;
    document.forms[0].editEsc.value = sid;

    var procMode = $("input[name=sml010ProcMode]").val();
    if (searchFlg) {
        procMode = $("input:hidden[name=sml090SvMailSyubetsu]").val();
    }

    //前のメール取得
    if (getMailKbn == 1) {
        cmdStr = "prevData";
    //次のメール取得
    } else if (getMailKbn == 2) {
        cmdStr = "nextData";
    }

    var accountSid = $("#account_comb_box").val();

    try {

        document.forms[0].CMD.value=cmdStr;
        document.forms[0].SERCHFLG.value=searchFlg;

        document.forms[0].PROCMODE.value=procMode;
        document.forms[0].SELECTSID.value=sid;
        document.forms[0].SELECTKBN.value=kbn;
        document.forms[0].ACCOUNT.value=accountSid;

        var paramStr = "";
        paramStr += getFormData($('#smlForm'));

        $.ajax({
            async: true,
            url:  "../smail/sml030.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (!data["success"]) {
                alert(msglist_sml010["sml.195"]);
                return;
            }

            __dspMenuBtn(data);

            var smsTitle = "";
            //確認部分設定
            if (data.sml030SmlList.length > 0) {
                for (var s = 0; s < data.sml030SmlList.length; s++) {

                    var mailData = data.sml030SmlList[s];

                    $('input:hidden[name=sml010SelectedSid]').val(mailData.smlSid);
                    $('input:hidden[name=sml010SelectedMailKbn]').val(mailData.mailKbn);
                    $('#sml_kakunin_body').children().remove();
                    smsTitle = mailData.smsTitle;
                    var detailBlock = $('<div></div>');

                    detailBlock.appendTo($('#sml_kakunin_body'));

                    //受信詳細項目の出力
                    if (mailData.mailKbn == "0") {
                        __dspDetailJusin(detailBlock, data, mailData);
                    }
                    //送信詳細 ,草稿詳細 項目の出力
                    if (mailData.mailKbn != "0") {
                        __dspDetailSosin(detailBlock, data, mailData);
                    }
                    //確認画面共通項目の出力
                    __dspDetailMailCommon(detailBlock, data, mailData);

                    //確認画面表示時のhelpParamを保管
                    __changeKakuninHelpParam(data, mailData);

                }
            }

            //tab名 設定
            var mailTabTxt = "";
            var maxTabTxt = 15;
            //タイトルが規定文字数を超える場合、タブ表示用に省略する
            mailTabTxt = $("<textarea/>").html(smsTitle).val();
            if (mailTabTxt.length > maxTabTxt) {
                mailTabTxt = mailTabTxt.substring(0, maxTabTxt) + "…";
            }

            if (!mail_kakunin_flg) {
                /* タブ*/
                $('#mail_list_tab').after('<li class="classic-display bor_b1 wp5 m0"></li>'
                        + '<li id="mail_kakunin_tab" class="js_mailAreaHead2 bgI_none tabHeader_tab-off pt5 pr10 pl10">'
                        + '  <div class="mwp40 verAlignMid">'
                        + '    <span class="js_mailKakuninTabTitle">'
                        + '    </span>'
                        + '    <span class="iconBtn-noBorder cursor_p ml10 hp20 js_mailCloseBtnMini">'
                        + '      <img class="btn_classicImg-display js_tabHeader_closeBtn " src="../smail/images/classic/icon_del.png">'
                        + '      <i class="btn_originalImg-display txt_m fs_16 cl_webIcon icon-close"></i>'
                        + '    </span>'
                        + '  </div>'
                        + '</li>');

                mail_kakunin_flg = true;

                $('#mail_kakunin_tab .js_mailKakuninTabTitle').text(mailTabTxt);
                changeTab($('#mail_kakunin_tab'));

            } else {
                $('#mail_kakunin_tab .js_mailKakuninTabTitle').text(mailTabTxt);
                changeTab($('#mail_kakunin_tab'));
            }


            //メール確認画面の宛先CCにスクロールを設定
            $.each($('#sml_kakunin_body .js_mailKakunin-expandable'), function () {
                if ($(this).height() > 54) {
                    $(this).addClass('ofy_a');
                    $(this).addClass('hp50');
                    var allOpn = $('<div></div>').addClass('textLink').addClass('js_allOpnTo').addClass('cursor_p').html(msglist_sml010['sml.218']);
                    $(this).after(allOpn);
                }
            });

            if (reloadFlg) {
                reloadData();
            } else {
                setTimeout('reloadData()', 1000);
            }

            //現在開いているメールのSIDを取得、退避する
            document.forms[0].selectEsc.value = document.forms[0].sml010SelectedSid.value;
            document.forms[0].editEsc.value = document.forms[0].sml010SelectedSid.value;
        });
    } catch(exp) {
        messagePop(msglist_sml010["sml.195"], 500, 'auto');
    }

    setTimeout('changeHelpParam(0, 2)', 1500);

    return;

    function __dspDetailJusin(detailBlock, data, mailData) {
        //テンプレートのクローンを挿入
        var mailHead = $('#sml_kakunin_body-jusin').clone();
        $.each(mailHead.children(), function() {
            $(this).appendTo(detailBlock);
        });

        var select;

        //送信、転送区分表示
        select = detailBlock.find('.js_mailKakunin_title').eq(0);
        if (mailData.fwKbn != "0" || mailData.returnKbn != "0") {
            select = $('<div></div>').addClass('verAlignMid').appendTo(select);
            if (mailData.fwKbn != "0") {
                select.append('<img alt="Fw" class="classic-display" src="../common/images/classic/icon_forward.png">');
                select.append('<img alt="Fw" class="original-display" src="../common/images/original/icon_forward.png">');
            }
            if (mailData.returnKbn != "0") {
                select.append('<img alt="Re" class="classic-display" src="../common/images/classic/icon_replay.png">');
                select.append('<img alt="Re" class="original-display" src="../common/images/original/icon_replay.png">');
            }
        }
        //タイトル表示
        select.append(mailData.smsTitle);

        //受信メールの差出人画像表示
        if (data.photoDspFlg=="0") {
            __dspSenderImg(detailBlock, mailData);
        }
        //差出人
        __dspSender(detailBlock, mailData);

        //宛先設定
        __dspAtesaki(detailBlock, '.js_mailKakunin_to' , mailData.atesakiList);
        //CC設定
        __dspAtesaki(detailBlock, '.js_mailKakunin_cc', mailData.ccList);
        return;

        /**
         * 受信確認差出人画像部分の描画を行う
         */
        function __dspSenderImg(detailBlock, mailData) {
            var select;
            select = detailBlock.find('.js_dspFromImg').eq(0);
            //非公開の場合
            if (mailData.photoFileDsp == "1") {
                select.html("<div class=\"hikokai_photo-m txt_c\"><span class=\"hikokai_text\">"+msglist_sml010['cmn.private']+"</span></div>");
                return;
            }
            //公開でも非公開でもない場合メールアイコン
            if (mailData.photoFileDsp != "0") {
                select.append('<img alt="'+msglist_sml010['cmn.photo']+'" class="classic-display wp80" src="../smail/images/classic/menu_icon_single.gif">');
                select.append('<img alt="'+msglist_sml010['cmn.photo']+'" class="original-display wp80" src="../smail/images/original/menu_icon_single.png">');
                return;
            }
            //デフォルト画像
            if (mailData.binFileSid == "0" || mailData.usrJkbn == "9" || mailData.usrJkbn == "1") {

                select.append('<img alt="'+msglist_sml010['cmn.photo']+'" class="classic-display wp80" src="../common/images/classic/icon_photo.gif">');
                select.append('<img alt="'+msglist_sml010['cmn.photo']+'" class="original-display wp80" src="../common/images/original/photo.png">');
                return;
            }

            if (mailData.binFileSid != "0") {
                select.append("<img src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid="
                    +  mailData.binFileSid
                    +   "&smlViewAccount="
                    +   $("#account_comb_box").val()
                    +  "\" name=\"userImage"
                    +  mailData.smlSid
                    +  "\" alt=\""+msglist_sml010['cmn.photo']+"\" border=\"1\" class=\"wp80\" onload=\"initImageView130('userImage"
                    +  mailData.smlSid
                    +  "');\">");
            }
        }
        /**
         * 受信確認差出人名称部分の描画を行う
         */
        function __dspSender(detailBlock, mailData) {

            var select = detailBlock.find('.js_mailKakunin_from').eq(0);

            var mukoFlg = false;
            var delFlg = false;
            var isUsrLink = false;
            var name;

            if (mailData.usrSid > 0) {
                name = mailData.usiSei + ' ' + mailData.usiMei;
                if (mailData.usrJkbn == "9" || mailData.usrJkbn == "1") {
                    delFlg = true;
                } else if (mailData.usrUkoFlg == "1") {
                    mukoFlg = true;
                }
                if (mailData.usrSid > 100 && !delFlg) {
                    isUsrLink = true;
                }

            } else {
                name = mailData.accountName;
                if (mailData.accountJkbn == "1") {
                    delFlg = true;
                }
            }

            if (delFlg) {
                select.addClass('delete_border');
                select.text(name);
                return;
            }
            if (!isUsrLink) {
                select.text(name);
                return;
            }

            if (!isUsrLink) {
                select.text(name);
                return;
            }
            var mukoClass = '';
            if (mukoFlg) {
                mukoClass = 'mukoUser';
            }

            select.html('<a href="#!" class="js_smlAtesakiLink cl_fontBody '+mukoClass+'" '
                    + 'onClick="openUserInfoWindow('+mailData.usrSid+');">'
                    + htmlEscape(name)
                    + '</a>');

        }
        /**
         * 宛先（CC）表示の描画を行う
         */
        function __dspAtesaki(detailBlock, targetClass, atesakiList) {

            var select = detailBlock.find(targetClass).eq(0);

            if (!atesakiList || atesakiList.length <= 0) {
                //なければ非表示
                select.parent().parent().remove();
                return;
            }

            for (var t = 0; t < atesakiList.length; t++) {
                if (t != 0) {
                    select.append(', ');
                }


                var atesakiMdl = atesakiList[t];

                var mukoFlg = false;
                var delFlg = false;
                var isUsrLink = false;
                var name;

                if (atesakiMdl.usrSid > 0) {
                    name = atesakiMdl.usiSei + ' ' + atesakiMdl.usiMei;
                    if (atesakiMdl.usrJkbn == "9") {
                        delFlg = true;
                    } else if (atesakiMdl.usrUkoFlg == "1") {
                        mukoFlg = true;
                    }
                    if (atesakiMdl.usrSid > 100 && !delFlg) {
                        isUsrLink = true;
                    }

                } else {
                    name = atesakiMdl.accountName;
                    if (atesakiMdl.accountJkbn == "1") {
                        delFlg = true;
                    }
                }

                if (delFlg) {
                    $('<span></span>').addClass('delete_border').appendTo(select);
                    continue;
                }
                if (!isUsrLink) {
                    select.append(htmlEscape(name));
                    continue;
                }

                var mukoClass = '';
                if (mukoFlg) {
                    mukoClass = 'mukoUser';
                }

                select.append('<a href="#!" class="js_smlAtesakiLink cl_fontBody '+mukoClass+'" '
                        + 'onClick="openUserInfoWindow('+atesakiMdl.usrSid+');">'
                        + htmlEscape(name)
                        + '</a>');
            }
        }
    }
    function __dspDetailSosin(detailBlock, data, mailData) {
        //テンプレートのクローンを挿入
        var mailHead = $('#sml_kakunin_body-sosin').clone();
        $.each(mailHead.children(), function() {
            $(this).appendTo(detailBlock);
        });

        var photoDsp = false;
        if (data.photoDspFlg=="0") {
            photoDsp = true;
        }
        //宛先設定
        __dspAtesaki(detailBlock, '.js_mailKakunin_to' , mailData.atesakiList, photoDsp);
        //CC設定
        __dspAtesaki(detailBlock, '.js_mailKakunin_cc', mailData.ccList, photoDsp);
        //BCC設定
        __dspAtesaki(detailBlock, '.js_mailKakunin_bcc', mailData.bccList, photoDsp);

        //件名
        select = detailBlock.find('.js_mailKakunin_title').eq(0);
        select.append(mailData.smsTitle);

        //開封確認
        __dspOpenChk(detailBlock, mailData);
        return;

        /**
         * 宛先（CC）表示の描画を行う
         */
        function __dspAtesaki(detailBlock, targetClass, atesakiList, showPict) {
            dspAtesaki(detailBlock, targetClass, atesakiList, showPict);
        }
        /**
         * 送信確認画面の開封確認表示を行う
         */
        function __dspOpenChk(detailBlock, mailData) {

            var select = detailBlock.find('.js_mailKakunin_opnChk').eq(0);


            var opnSituation = "";
            if (mailData.mailKbn != "1") {
                select.remove();
                return;
            }
            //タイトル_開封確認
            select.append('<div class="fw_b">'+ msglist_sml010['sml.sml030.02'] +'</div>')

            //開封確認リスト
            __dspOpenCheckList(select, msglist_sml010['cmn.from'], mailData.atesakiList);
            __dspOpenCheckList(select, msglist_sml010['sml.sml030.09'],mailData.ccList);
            __dspOpenCheckList(select, msglist_sml010['sml.sml030.10'], mailData.bccList);

            return;

            /**
             * 開封確認リストの出力を行う
             */
            function __dspOpenCheckList(select, title, toList) {

                if (!toList || toList.length == 0) {
                    return;
                }

                var table = $('<table></table>').appendTo(select);
                table.addClass('table-top');
                table.addClass('wp550');
                table = $('<tbody></tbody>').appendTo(table);
                var tr = $('<tr></tr>').appendTo(table);
                tr.append('<th class="wp180">' + title + '</th>');
                tr.append('<th class="wp180">' + msglist_sml010['sml.sml030.03'] + '</th>');
                tr.append('<th class="wp180">' + msglist_sml010['sml.sml030.01'] + '</th>');


                for (var at = 0; at < toList.length; at++) {

                    var tr = $('<tr></tr>').appendTo(table);
                    var atesakiMdl = toList[at];
                    var mukoclass = "";

                    var mukoFlg = false;
                    var delFlg = false;
                    var name;

                    if (atesakiMdl.usrSid > 0) {
                        name = htmlEscape(atesakiMdl.usiSei + ' ' + atesakiMdl.usiMei);
                        if (mailData.usrJkbn == "9") {
                            delFlg = true;
                        } else if (atesakiMdl.usrUkoFlg == "1") {
                            mukoFlg = true;
                        }

                    } else {
                        name = atesakiMdl.accountName;
                        if (atesakiMdl.accountJkbn == "1") {
                            delFlg = true;
                        }
                    }
                    if (delFlg) {
                        name = $('<span class="delete_border">'+ name +'</span>').html();
                    }
                    if (mukoFlg) {
                        name = $('<span class="mukoUser">'+ name +'</span>').html();
                    }
                    tr.append('<td class="wp180">' + name + '</td>');

                    tr.append('<td class="wp180">' + atesakiMdl.smlOpdateStr + '</td>');

                    var fwTxt = '';
                    if (atesakiMdl.smjFwkbn == "1") {
                        fwTxt = msglist_sml010['sml.sml030.07'];
                    }
                    tr.append('<td class="wp180">' + fwTxt + '</td>');

                }


            }
        }
    }
    function __dspMenuBtn(data) {
        //ボタン設定
        $('.js_mailMenu > *').removeClass('display_none');
        $('.js_mailMenu > *').removeClass('visible_hide');

        //複写して登録
        if (data.sml010ProcMode == "4" || (data.sml010ProcMode != "1" && data.sml010SelectedMailKbn != 1)) {
            $('#head_menu_copy_btn').addClass('display_none');
        }
        //返信・全返信
        if (data.sml010ProcMode == "4") {
            $('#head_menu_replay_btn').addClass('display_none');
            $('#head_menu_all_replay_btn').addClass('display_none');
        }
        if (!data.sml030HensinDspFlg) {
            $('#head_menu_replay_btn').addClass('visible_hide');
            $('#head_menu_all_replay_btn').addClass('visible_hide');
        }
        if (data.sml010ProcMode == "4") {
            $('#head_menu_replay_btn').addClass('display_none');
            $('#head_menu_all_replay_btn').addClass('display_none');
        }
        //転送
        if (data.sml010ProcMode == "4") {
            $('#head_menu_forward_btn').addClass('display_none');
        }
        //削除（ゴミ箱外）
        if (data.sml010ProcMode == "4") {
            $('#head_menu_dust_btn').addClass('display_none');
        }
        //全削除
        if (data.sml010ProcMode != "1" && (data.sml010ProcMode == "4" || data.sml010SelectedMailKbn != 1)) {
            $('#head_menu_alldel_btn').addClass('display_none');
        }
        //削除（ゴミ箱内）
        if (data.sml010ProcMode != "4") {
            $('#head_menu_del_btn').addClass('display_none');
        }
        //元に戻すボタン
        if (data.sml010ProcMode != "4") {
            $('#head_menu_revived_btn').addClass('display_none');
        }
        //前へ・次へ ボタン
        if (data.sml010ProcMode == "4" && sel_mail_parent_kbn != 0) {
            $('#head_menu_prev_btn').parent().addClass('display_none');
        }
        //WEBメール共有
        if (data.sml010ProcMode == "4" || document.forms[0].sml010webmailShareFlg.value != 0) {
            $('#head_menu_webmail_share_btn').addClass('display_none');
        }
    }
    /**
     * メール確認詳細共通部分
     */
    function __dspDetailMailCommon(detailBlock, data, mailData) {
        var select;
        //日付
        detailBlock.find('.js_mailKakunin_date').eq(0).append(mailData.smsSdateStr);

        //マーク
        var mark = $('#sml_markList_mlnon').find('[name='+mailData.smsMark+']');
        if (mark.length > 0) {
            mark = mark.eq(0).clone();
            detailBlock.find('.js_mailKakunin_mark').eq(0).append(mark);
        } else {
            detailBlock.find('.js_mailKakunin_mark').eq(0).parent().remove();
        }

        //本文
        detailBlock.find('.js_mailKakunin_body').eq(0).attr('data-htmlbody',mailData.smsBody);

        //添付ファイル
        if (data.sml030FileList.length == 0) {
            return;
        }
        select = detailBlock.find('.js_mailKakunin_temp').eq(0);
        var lastChild;
        for (var e = 0; e < data.sml030FileList.length; e++) {
            var fileMdl = data.sml030FileList[e];
            if ($('input:hidden[name=tempDspFlg]').val() == "0"
                && fileMdl.binFileExtension != null && fileMdl.binFileExtension != "") {
                var fext = fileMdl.binFileExtension;
                if (fext != null) {
                    fext = fext.toLowerCase();
                    if (isViewFile(fext)) {

                        var atesakiKenmeiStr = "<div><img src=\"../smail/sml030.do?CMD=tempview&sml010SelectedSid="
                            + data.sml010SelectedSid
                            + "&sml030binSid="
                            + fileMdl.binSid
                            + "&smlViewAccount="
                            + $("#account_comb_box").val()
                            + "\" name=\"pictImage"
                            + fileMdl.binSid
                            + "\" onload=\"initImageView('pictImage"
                            + fileMdl.binSid
                            + "');\">";
                        atesakiKenmeiStr += "</div>";
                        select.append(atesakiKenmeiStr);
                    }
                }
            }
            lastChild = $("<div class=\"verAlignMid w100\">"
                    +  "<file-preview url=\"../smail/sml030.do?CMD=downLoad&sml010SelectedSid="
                    +  data.sml010SelectedSid
                    +  "&sml030binSid="
                    +  fileMdl.binSid
                    +  "&smlViewAccount="
                    +  $("#account_comb_box").val()
                    +  "\" filename=\""
                    +  fileMdl.binFileName
                    +  "\">"
                    +  "<a href=\"#!\" onClick=\"return fileLinkClick('downLoad',"
                    +  data.sml010SelectedSid
                    +  ","
                    +  fileMdl.binSid
                    +  ");\"><span class=\"fw_b fs_13\">"
                    +  htmlEscape(fileMdl.binFileName + fileMdl.binFileSizeDsp)
                    +  "</span></a></file-preview></div>").appendTo(select);

        }
        if (data.sml030FileList.length > 1) {
            lastChild.append( "<a class=\"ml_auto\""
                    + "href=\"#!\" onClick=\"return allTempClick('allTmpExp',"
                    +  data.sml010SelectedSid
                    +  ","
                    +  data.sml010SelectedMailKbn
                    +  ");\">"
                    +  "<span class=\"pr10 fs_13\">"
                    +  "<img class=\"btn_classicImg-display \" src=\"../common/images/classic/icon_zip_file.gif\" />"
                    +  "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_zipfile.png\" />"
                    +  msglist_sml010['cir.allTmep.download']
                    +  "</span></a>");
        }


    }

    /**
     * 確認画面表示時のhelpParamを保管
     */
    function __changeKakuninHelpParam(data, mailData) {
        //メール判別(ヘルプボタンの遷移先を設定する)
        if (data.sml010ProcMode == 0) {

            dspMailKbn__ = 0;

        } else if (data.sml010ProcMode == 1) {

            dspMailKbn__ = 1;

        } else if (data.sml010ProcMode == 4) {

            if (mailData.mailKbn == "0") {

                dspMailKbn__ = 2;
            } else if (mailData.mailKbn == "1") {

                dspMailKbn__ = 3;
            } else {

                dspMailKbn__ = 4;
            }

        } else if (data.sml010ProcMode == 5) {

            if (mailData.mailKbn == "0") {

                dspMailKbn__ = 0;
            } else if (mailData.mailKbn == "1") {

                dspMailKbn__ = 1;
            }

        }
        mail_kakunin_kbn = dspMailKbn__;

    }
}

//メール情報取得(草稿)
function getMessage(sid) {

    document.forms[0].sml010SelectedSid.value = sid;
    $('#sml020ProcModeArea').append("<input type=\"hidden\" name=\"sml020ProcMode\" value=\"4\" />");
    $('#head_menu_del_soko_btn').removeClass('display_none');
    $('#head_menu_del_soko_btn_spacer').removeClass('display_none');

    if (!mail_create_flg) {
        //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
        $('input:hidden[name=sml020ProcMode]').val(4);
    }
    replayMail(4);
}


function changeModeDir(mode) {
    document.forms[0].CMD.value='changeDir';
    document.forms[0].sml010ProcMode.value = mode;

    $("#mail_list_tab").html("");

    if (mode == 0) {
        $("#mail_list_tab").html(msglist_sml010['cmn.receive']);
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $('#head_menu_list_dust_btn').removeClass('display_none');
        $('#head_menu_list_del_btn').addClass('display_none');
        $('#head_menu_return_btn').addClass('display_none');

    } else if (mode == 1) {
        $("#mail_list_tab").html(msglist_sml010['cmn.sent']);
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $('#head_menu_list_dust_btn').removeClass('display_none');
        $('#head_menu_list_del_btn').addClass('display_none');
        $('#head_menu_return_btn').addClass('display_none');
    } else if (mode == 2) {
        $("#mail_list_tab").html(msglist_sml010['cmn.draft']);
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $('#head_menu_list_dust_btn').removeClass('display_none');
        $('#head_menu_list_del_btn').addClass('display_none');
        $('#head_menu_return_btn').addClass('display_none');
    } else if (mode == 4) {
        $("#mail_list_tab").html(msglist_sml010['cmn.trash']);
        $("#head_menu_list_label_add_btn").parents('.mailMenu_buttonSet').eq(0).addClass('display_none');
        $("#head_menu_list_kidoku_btn").parents('.mailMenu_buttonSet').eq(0).removeClass('display_none');
        $('#head_menu_list_dust_btn').addClass('display_none');
        $('#head_menu_list_del_btn').removeClass('display_none');
        $('#head_menu_return_btn').removeClass('display_none');

    }

    changeTab($('#mail_list_tab'));
    loadingPop(msglist_sml010['cmn.loading']);
    getMailData();

}

function onTitleLinkClick(fid, order) {
    document.forms[0].CMD.value='getInitData';
    document.forms[0].sml010Sort_key.value = fid;
    document.forms[0].sml010Order_key.value = order;
    loadingPop(msglist_sml010['cmn.loading']);
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
function allTempClick(cmd, sid, kbn) {
    editorBeforeUnloadManager.onTemporary();

    $('#sendHiddenParam').remove();

    $('#tempSendForm').append("<div id=\"sendHiddenParam\">");
    $('#tempSendForm').append("</div>");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"CMD\" value=\""
            + cmd
            + "\" />");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"sml010SelectedSid\" value=\""
            + sid
            + "\" />");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"sml010SelectedMailKbn\" value=\""
            + kbn
            + "\" />");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"smlViewAccount\" value=\""
            + $("#account_comb_box").val()
            + "\" />");

    $("#tempSendForm").attr("action", "../smail/sml030.do");
    $("#tempSendForm").submit();
}

function fileLinkClick(cmd, sid, binSid) {

    editorBeforeUnloadManager.onTemporary();
    $('#sendHiddenParam').remove();

    $('#tempSendForm').append("<div id=\"sendHiddenParam\">");
    $('#tempSendForm').append("</div>");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"CMD\" value=\""
            + cmd
            + "\" />");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"sml010SelectedSid\" value=\""
            + sid
            + "\" />");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"sml030binSid\" value=\""
            + binSid
            + "\" />");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"smlViewAccount\" value=\""
            + $("#account_comb_box").val()
            + "\" />");

    $("#tempSendForm").attr("action", "../smail/sml030.do");
    $("#tempSendForm").submit();

}

function attachmentFileDownload(binSid) {
    editorBeforeUnloadManager.onTemporary();

    $('#sendHiddenParam').remove();

    $('#tempSendForm').append("<div id=\"sendHiddenParam\">");
    $('#tempSendForm').append("</div>");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"CMD\" value=\"fileDownload\" />");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"sml020knBinSid\" value=\""
            + binSid
            + "\" />");

    $('#sendHiddenParam').append("<input type=\"hidden\" name=\"smlViewAccount\" value=\""
            + $("#account_comb_box").val()
            + "\" />");

    $("#tempSendForm").attr("action", "../smail/sml020kn.do");
    $("#tempSendForm").submit();
}




function getGroupUsrData(paramStr) {

    $.ajax({
        async: true,
        url:"../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            try {
                $("#selGrpUsrArea").children().remove();

                if (data.sml010userList.length > 0) {
                    for (u = 0; u < data.sml010userList.length; u ++) {
                        var usrMdl = data.sml010userList[u];
                        var usrLabel = '<div class="syain_checkbox_area pl5 mt5 "><div class="verAlignMid">';
                        var muko = '';
                        if (usrMdl.usrUkoFlg == 1) {
                            muko='mukoUser';
                        }
                        if (usrMdl.usrSid == null || usrMdl.usrSid <= 0) {
                            usrLabel += '<input class="txt_m cursor_p" type="checkbox" name="sml010usrSids" value="sac' + usrMdl.sacSid + '" />';
                            usrLabel += '<a href="#!" class="js_syain_sel_check_a  verAlignMid" data-accountsid="sac' + usrMdl.sacSid + '">';
                        } else {
                            usrLabel += '<input class="txt_m cursor_p" type="checkbox" name="sml010usrSids" value="' + usrMdl.usrSid + '" />';
                            usrLabel += '<a href="#!" class="js_syain_sel_check_a  verAlignMid ' + muko +'" data-accountsid="' + usrMdl.usrSid + '">';

                            if (data.photoDspFlg == 0) {
                                if (usrMdl.usiPictKf != 0) {
                                    usrLabel += '<div class="hikokai_photo-s wp25 verAlignMid js_syain_sel_check_img ml5 mr5"><span class="hikokai_text mrl_auto">'+ msglist_sml010["cmn.private.photo"] +'</span></div>';
                                } else if (usrMdl.binSid == 0) {
                                    usrLabel += '<img src="../common/images/classic/icon_photo.gif" name="userImage" onload="initImageView50(\'userImage' + usrMdl.usrSid + '\')"  class="wp25 btn_classicImg-display ml5 mr5"/>';
                                    usrLabel += '<img src="../common/images/original/photo.png" name="userImage" onload="initImageView50(\'userImage' + usrMdl.usrSid + '\')"  class="wp25 btn_originalImg-display ml5 mr5"/>';
                                } else {
                                    usrLabel += '<img src="../common/cmn100.do?CMD=getImageFile&cmn100binSid=' + usrMdl.binSid + '" name="userImage" onload="initImageView50(\'userImage' + usrMdl.usrSid + '\')" class="wp25 ml5 mr5"/>';
                                }
                            }
                        }
                        usrLabel += '<span class="js_syain_sel_check_txt">';
                        if (usrMdl.usrSid == null || usrMdl.usrSid <= 0) {
                            usrLabel += htmlEscape(usrMdl.sacName);
                        } else {
                            usrLabel += htmlEscape(usrMdl.usiSei)
                            + "&nbsp;"
                            + htmlEscape(usrMdl.usiMei)
                        }
                        usrLabel += '</span>';
                        usrLabel += '</a>';
                        usrLabel += '</div></div>';
                        $("#selGrpUsrArea").append(usrLabel);
                    }
                }

                $("input:checkbox[name=usrAllCheck]:checked").attr("checked", false)

            } catch (ae) {
                alert(msglist_sml010["sml.191"] + ae);
            }
        } else {
            alert(msglist_sml010["sml.191"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.191"]);
    });

}


function setAtesakiSelectUsr(id) {

    if ($('input:checkbox[name=sml010usrSids]:checked').length > 0) {

        if (!mail_create_flg) {
            //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
            $('input:hidden[name=sml020ProcMode]').val(0);
            paramStr = 'CMD=getNewmail&smlViewAccount='
                +   $("#account_comb_box").val();

            $.ajax({
                async: true,
                url:  "../smail/sml020.do",
                type: "post",
                data: paramStr
            }).done(function( data ) {
                if (data["confError"] == -100 || data["confError"] == -101) {
                    document.forms[0].CMD.value="shareError";
                    document.forms[0].sml010MailBodyLimit.value=data["confError"];
                    document.forms[0].submit();
                    return false;
                } else if (data["success"]) {
                    tmp_del_flg = false;
                    $('input:hidden[name=sml020ProcMode]').val(0);
                    $('#send_account_comb_box').val(data.sml020SendAccount);
                    $("#popHinaKojin").children().remove();
                    if (data.sml020HinaListKjn.length > 0) {
                        hinagataKjnSet(data.sml020HinaListKjn);
                    }
                    openSendTab();
                    setCreateMail(0, data);
                    setAtesakiSelectUsr(id);
                    changeSidData(data.sml010SelectedSid);
                } else {
                    alert(msglist_sml010["sml.196"]);
                }
            }).fail(function(data){
                alert(msglist_sml010["sml.196"]);
            });
            return;
        }
        //新規作成確認時に編集画面を表示
        $('#head_menu_back_kakunin_btn').click();

        openSendTab();

        var inputName = "sml020userSid";
        var areaName = "atesaki_to_area";

        if (id == 1) {
            inputName = "sml020userSidCc";
            areaName = "atesaki_cc_area";
        } else if (id == 2) {
            inputName = "sml020userSidBcc";
            areaName = "atesaki_bcc_area";
        }

        var toList = Array();


        $('input:checkbox[name=sml010usrSids]:checked').each(function(){

            var usrId = $(this).val();
            var usrTxt = $(this).next().find('.js_syain_sel_check_txt').text();

            var muko = $(this).next().hasClass("mukoUser");
            //画像非公開ユーザの場合は「次の次」がユーザ名オブジェクト
            if (usrTxt == msglist_sml010["cmn.private.photo"]) {
                usrTxt = $(this).next().next().text();
            }
            usrTxt = usrTxt.trim();
            var mukoclass = "";
            if (usrId != null) {
                toList.push(
                        {
                            sid: usrId,
                            name: usrTxt,
                            mukoUser: muko
                        }
                        );

            }
        });

        var appendTo;
        if (id == 0) {
            appendTo = $('#atesaki_to_area');
        } else if (id == 1) {
            appendTo = $('#atesaki_cc_area');
        } else if (id == 2) {
            appendTo = $('#atesaki_bcc_area');
        }
        $.each(toList, function() {
            $(window).smlatesaki().addAtesakiUsr(this, appendTo, inputName);

        });
        $(window).smlatesaki().resetAtesakiScr(appendTo);

        $('input:checkbox[name=usrAllCheck]:checked').attr("checked", false);
        $('input:checkbox[name=sml010usrSids]:checked').attr("checked", false);

    } else {

        messagePop(msglist_sml010['sml.222'], 300, 'auto');

    }

}


function drawSelUsr(id, txt, usrUkoFlg) {

    if (!mail_create_flg) {
        //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
        $('input:hidden[name=sml020ProcMode]').val(0);
        paramStr = 'CMD=getNewmail&smlViewAccount='
            +   $("#account_comb_box").val();

        $.ajax({
            async: true,
            url:  "../smail/sml020.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["confError"] == -100 || data["confError"] == -101) {
                document.forms[0].CMD.value="shareError";
                document.forms[0].sml010MailBodyLimit.value=data["confError"];
                document.forms[0].submit();
                return false;
            } else if (data["success"]) {
                tmp_del_flg = false;
                $('input:hidden[name=sml020ProcMode]').val(0);

                $('#send_account_comb_box').val(data.sml020SendAccount);
                $("#popHinaKojin").children().remove();
                if (data.sml020HinaListKjn.length > 0) {
                    hinagataKjnSet(data.sml020HinaListKjn);
                }
                openSendTab();
                setCreateMail(0, data);
                drawSelUsr(id, txt, usrUkoFlg);
                //changeSidData(0);
            } else {
                alert(msglist_sml010["sml.190"]);
            }
        }).fail(function(data){
            alert(msglist_sml010["sml.190"]);
        });
        return;
    }
    //新規作成確認時に編集画面を表示
    $('#head_menu_back_kakunin_btn').click();

    openSendTab();

    $(window).smlatesaki().addAtesakiUsr({
        sid:id,
        name:txt,
        mukoUser:(usrUkoFlg == "1")
    },
    $('#atesaki_to_area'),
    "sml020userSid");
    $(window).smlatesaki().resetAtesakiScr($('#atesaki_to_area'));
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


function getNowSelUsr(functinBtnKbn) {

    var paramStr = "";

    if (functinBtnKbn == 0) {

        $('input:hidden[name=sml020userSid]').each(function(){
            paramStr += "&cmn120userSid=" + $(this).val();
        });

    } else if (functinBtnKbn == 1) {

        $('input:hidden[name=sml020userSidCc]').each(function(){
            paramStr += "&cmn120userSid=" + $(this).val();
        });

    } else if (functinBtnKbn == 2) {

        $('input:hidden[name=sml020userSidBcc]').each(function(){
            paramStr += "&cmn120userSid=" + $(this).val();
        });

    } else if (functinBtnKbn == 3) {

        $('input:hidden[name=sml090Atesaki]').each(function(){
            paramStr += "&cmn120userSid=" + $(this).val();
        });

    }

    return paramStr;

}

function drawSelHina(hinaSid, kbn) {

    document.forms[0].CMD.value='hinagataSetData';
    $('#sml020SelectHinaIdArea').append("<input type=\"hidden\" name=\"sml020SelectHinaId\" value=\"" + hinaSid + "\" />")

    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:"../smail/sml020.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            try {

                if (data != null) {

                    var htmlAreaStr = "";
                    if ($('input:hidden[name=sml020MailType]').val() == 1) {
                        //HTMLテキスト取得
                        if (tinyMCE.get('html_input') != null) {
                            try {
                                htmlAreaStr = tinyMCE.activeEditor.getContent().replace(/<[^>]*>/g, "");
                            } catch (ae) {
                            }
                        }
                    }

                    if (mail_create_flg && ($('input[name=sml020Title]').val() != ""
                        || $('input[name=sml020Mark]:checked').val() != 0
                        || $('textarea[name=sml020Body]').val() != ""
                            || htmlAreaStr != "")
                    ) {

                        $('#hinaOverWritePop').dialog({
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
                                text:msglist_sml010["cmn.ok"],
                                click: function() {
                                    //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
                                    $('input:hidden[name=sml020ProcMode]').val(0);

                                    //新規作成確認時に編集画面を表示
                                    $('#head_menu_back_kakunin_btn').click();
                                    openSendTab();
                                    changeSidData(0);

                                    $('input[name=sml020Title]').val(data.sml020Title);

                                    $('input[name=sml020Mark]').val([data.sml020Mark]);
                                    $('textarea[name=sml020Body]').val(data.sml020Body);

                                    if ($('input:hidden[name=sml020MailType]').val() == 1) {
                                        //HTMLテキスト取得
                                        if (tinyMCE.get('html_input') != null) {
                                            try {
                                                htmlAreaStr = tinyMCE.get('html_input').setContent(textBr(data.sml020Body));
                                            } catch (ae) {
                                            }
                                        }
                                    }

                                    $(this).dialog('close');

                                    if (kbn != 0) {
                                        $('#hinagata_pop').dialog('close');
                                    }

                                }
                            },{
                                    text:msglist_sml010["cmn.cancel"],
                                    click: function() {
                                    $(this).dialog('close');
                                }
                            }]
                        });

                    } else {
                        //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送)
                        $('input:hidden[name=sml020ProcMode]').val(0);

                        //新規作成確認時に編集画面を表示
                        $('#head_menu_back_kakunin_btn').click();
                        var crFlg = mail_create_flg;
                        openSendTab();
                        changeSidData(0);

                        $('input[name=sml020Title]').val(data.sml020Title);
                        $('input[name=sml020Mark]').val([data.sml020Mark]);
                        $('textarea[name=sml020Body]').val(data.sml020Body);
                        //HTMLテキスト取得
                        if (tinyMCE.get('html_input') != null) {
                            try {
                                htmlAreaStr = tinyMCE.get('html_input').setContent(textBr(data.sml020Body));
                            } catch (ae) {
                            }
                        }

                        if (kbn != 0) {
                            $('#hinagata_pop').dialog('close');
                        }
                        if (!crFlg) {
                            document.forms[0].CMD.value='getNewmail';
                            var paramStr = "";
                            paramStr += getFormData($('#smlForm'));

                            $.ajax({
                                async: true,
                                url:  "../smail/sml020.do",
                                type: "post",
                                data: paramStr
                            }).done(function( data ) {
                                if (data["confError"] == -100 || data["confError"] == -101) {
                                    document.forms[0].CMD.value="shareError";
                                    document.forms[0].sml010MailBodyLimit.value=data["confError"];
                                    document.forms[0].submit();
                                    return false;
                                } else if (data["success"]) {
                                    tmp_del_flg = false;
                                    $('input:hidden[name=sml020ProcMode]').val(0);
                                    $('#send_account_comb_box').val(data.sml020SendAccount);
                                    $("#popHinaKojin").children().remove();
                                    if (data.sml020HinaListKjn.length > 0) {
                                        hinagataKjnSet(data.sml020HinaListKjn);
                                    }
                                    openSendTab();
                                    setCreateMail(0, data);
                                    changeSidData(0);
                                } else {
                                    alert(msglist_sml010["sml.190"]);
                                }
                            }).fail(function(data){
                                alert(msglist_sml010["sml.190"]);
                            });
                        }
                    }
                }
        } catch (ae) {
            alert(msglist_sml010["sml.197"] + ae);
        }
        } else {
            alert(msglist_sml010["sml.197"]);
        }

    }).fail(function(data){
        alert(msglist_sml010["sml.197"]);
    });

    $('#sml020SelectHinaIdArea').children().remove();
}



function resetMailCreate() {

    deleteTmpDir();
    $('#atesaki_to_area').children().remove();
    $(window).smlatesaki().resetAtesakiScr($('#atesaki_to_area'));
    $('#atesaki_cc_area').children().remove();
    $(window).smlatesaki().resetAtesakiScr($('#atesaki_cc_area'));
    $('#atesaki_bcc_area').children().remove();
    $(window).smlatesaki().resetAtesakiScr($('#atesaki_bcc_area'));
    $('input[name=sml020Title]').val('');
    $('input[name=sml020Mark]').val(['0']);

    if ($('input:hidden[name=sml020BodyHtml]').val() != ""
        && tinyMCE.get('html_input') != null) {
        tinyMCE.get('html_input').setContent('');
    }

    $('#text_input').val('');
    $('#html_input').val('');
    $('input:hidden[name=sml020BodyHtml]').val('');
    $('#attachmentFileListArea1').children().remove();
    $('#sml020ProcModeArea').children().remove();
    $('#head_menu_del_soko_btn').addClass('display_none');
    $('#head_menu_del_soko_btn_spacer').addClass('display_none');
}

function resetLabelArea() {

    document.forms[0].CMD.value='getLabelData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            var labelAreaStr = "";

            if (data != null && data.sml010LabelList != null && data.sml010LabelList.length > 0) {

                $('#gomibako_bottom_div').addClass("side_folderImg-line");

                var dspClass = "";
                var line_class = "side_folderImg-lineMinusBottom";
                if (!left_menu_label_opnkbn) {
                    dspClass = "display_none";
                    line_class = "side_folderImg-linePlusBottom";
                }

                var labelAreaStr = "<div class=\"verAlignMid\">";

                labelAreaStr += "<div class=\"original-display ml10\"></div>"
                    +  "<div class=\"side_folderImg cl_webIcon " + line_class + " verAlignMid js_lineToggle\"></div>"
                    +  "<div class=\"side_folderImg side_folderImg-label ml0 \"></div>"
                    +  "<div class=\"side-folderText \" id=\"lable_top\">"+msglist_sml010['cmn.label']+"</div>"
                    +  "</div>"
                    +  "<div class=\"w100 "
                    +  dspClass
                    +  "\">";

                var labelsize = data.sml010LabelList.length;

                for (i = 0; i < data.sml010LabelList.length; i++) {
                    var lblMdl = data.sml010LabelList[i];
                    var leftLineClass = "side_folderImg-line";

                    if ((i + 1) == labelsize) {
                        leftLineClass = "side_folderImg-lineBottom";
                    }

                    var labelTxt = lblMdl.slbName;

                    if (labelTxt.length > 9) {
                        labelTxt = labelTxt.substring(0, 8) + "…";
                    }

                    labelAreaStr += ""
                        +  "<div class=\"side_folder-focus js_file_hover js_changeLabelDir\" data-labelid=\""
                        +  lblMdl.slbSid
                        +  "\">"
                        +  "<div class=\"wp20 hp25 side_folderImg\"></div>"
                        +  "<div class=\""
                        +  leftLineClass
                        +  " verAlignMid side_folderImg\"></div>"
                        +  "<div class=\"side-folderText \">"
                        +   htmlEscape(labelTxt);

                    if (lblMdl.slbCount > 0) {
                        labelAreaStr += "<span class=\"fs_11 fw_b\"> ("
                            +  lblMdl.slbCount
                            +  ")</span>";
                    }

                    labelAreaStr += "</div>"
                        +  "<input type=\"hidden\" name=\"left_menu_label_name\" value=\""
                        +  htmlEscape(lblMdl.slbName)
                        +  "\" />"
                        +  "</div>"
                        +  "";

                }

                labelAreaStr += "</div>";

                $('#labelArea').children().remove();
                $('#gomibako_bottom_div').removeClass("side_folderImg-lineBottom");
        } else {
            $('#gomibako_bottom_div').addClass("side_folderImg-lineBottom");
        }
        } else {
            alert(msglist_sml010["sml.198"]);
        }

        $('#labelArea').append(labelAreaStr);

    }).fail(function(data){
        alert(msglist_sml010["sml.198"]);
    });

}

function deleteTmp() {

    var paramStr = "";

    paramStr += "CMD=deleteTmpData"
        +  "&sml020pluginId=smail";

    if ($('#sml020selectFiles').val() != null) {
        var fileList = $('#sml020selectFiles').val();
        for (p = 0; p < fileList.length; p++) {
            paramStr += "&sml020selectFiles="
                +  fileList[p];
        }
    }

    $.ajax({
        async: true,
        url:"../smail/sml020.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            try {

                if (data.sml020selectFiles.length > 0) {
                    for (s = 0; s < data.sml020selectFiles.length; s++) {
                        $('select#sml020selectFiles option[value=' + data.sml020selectFiles[s] + ']').remove();
                    }
                }

            } catch (ae) {
                alert(msglist_sml010["sml.199"] + ae);
            }
        } else {
            alert(msglist_sml010["sml.199"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.199"]);
    });

}

function deleteTmpDir() {

    var paramStr = "";

    paramStr += "CMD=deleteTmpDirData";

    $.ajax({
        async: true,
        url:"../smail/sml020.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

    }).fail(function(data){
        alert(msglist_sml010["sml.199"]);
    });
}

function doMailCreateOK() {

    loadingPop("処理中");

    document.forms[0].CMD.value='sendCheck';

    if ($('input:hidden[name=sml020MailType]').val() != 0) {
        if (tinyMCE.get('html_input') != null) {
            $('input:hidden[name="sml020BodyHtml"]').val(tinyMCE.get('html_input').getContent());
        }
    }

    let param = getFormParam($('#smlForm'));
    param["sml010SelectedSid"] = $('.js_mailBody').attr("data-sid");
    param["sml010EditSid"] = $('.js_mailBody').attr("data-sid");
    let paramStr = $.param(param, true);

    $.ajax({
        async: true,
        url:"../smail/sml020.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            try {

                if (data.errorsList != null && data.errorsList.length > 0) {
                    var dialogWidth = 'auto';
                    var dialogHeight = 'auto';
                    var errorMsg = "";
                    for (e = 0; e < data.errorsList.length; e++) {
                        errorMsg += "<div class=\"js_errorMsgStr cl_fontWarn errorMsgStr\">" + data.errorsList[e] + "</div>";
                        dialogWidth = 630;
                    }
                    messagePop(errorMsg, dialogWidth, dialogHeight);
                } else {
                    doMailSendKakunin();
                }
            } catch (ae) {
                alert(msglist_sml010["sml.200"] + ae);
            } finally {
                $('#loading_pop').dialog('close');
            }
        } else {
            alert(msglist_sml010["sml.200"]);
            $('#loading_pop').dialog('close');
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.200"]);
        $('#loading_pop').dialog('close');
    });

}

function doMailSoko() {

    if ($('input:hidden[name=sml020MailType]').val() != 0) {
        if (tinyMCE.get('html_input') != null) {
            $('input:hidden[name="sml020BodyHtml"]').val(tinyMCE.get('html_input').getContent());
        }
    }

    document.forms[0].CMD.value='sokoData';

    let param = getFormParam($('#smlForm'));
    param["sml010SelectedSid"] = $('.js_mailBody').attr("data-sid");
    param["sml010EditSid"] = $('.js_mailBody').attr("data-sid");
    let paramStr = $.param(param, true);
    var editSid = 0;

    $.ajax({
        async: true,
        url:"../smail/sml020.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        //添付ファイルでFileNotFoundException発生
        try {
            if ($(data).find('[name=errCause]')
                && $(data).find('[name=errCause]').val() == 'GSAttachFileNotExistException') {
                editorBeforeUnloadManager.off();
                $('html').html('');
                $('body').append($(data));
                return;
            }
        } catch (ee) {
            //正常登録時のjsonをjqueryObjとして扱うとエクセプションになる
        }

        if (data["success"]) {
            try {
                if (data.errorsList != null && data.errorsList.length > 0) {
                    var dialogWidth = 'auto';
                    var dialogHeight = 'auto';
                    var errorMsg = "";
                    for (e = 0; e < data.errorsList.length; e++) {
                        errorMsg += "<div class=\"js_errorMsgStr cl_fontWarn errorMsgStr\">" + data.errorsList[e] + "</div>";
                        dialogWidth = 630;
                    }

                    messagePop(errorMsg, dialogWidth, dialogHeight);

                } else {
                    $("#toastMessageBody").html("").append(msglist_sml010["sml.223"]);
                    displayToast("sml010MessageToast");
                    delNewCreateMail($('.js_mailDelBtnMini'), 1, -1);
                    reloadData();
                }

            } catch (ae) {
                alert(msglist_sml010["sml.201"] + ae);
            } finally {
                document.forms[0].sml010EditSid.value = editSid;
            }
        } else {
            alert(msglist_sml010["sml.201"]);
            document.forms[0].sml010EditSid.value = editSid;
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.201"]);
        document.forms[0].sml010EditSid.value = editSid;
    });
}


function doMailSendKakunin() {

    document.forms[0].CMD.value='getInitData';

    let param = getFormParam($('#smlForm'));
    param["sml010SelectedSid"] = $('.js_mailBody').attr("data-sid");
    param["sml010EditSid"] = $('.js_mailBody').attr("data-sid");
    let paramStr = $.param(param, true);

    $.ajax({
        async: true,
        url:  "../smail/sml020kn.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            mail_create_kakunin_flg = true;
            changeHelpParam(1,1);
            $('.js_mailCreateArea').addClass('display_none');
            $('.js_mailCreateKakuninArea').removeClass('display_none');

            var tokenName = $('input:hidden[name="org.apache.struts.taglib.html.TOKEN"]');
            if (!tokenName.length) {
                $('<input>').attr({
                    type: 'hidden',
                    name: 'org.apache.struts.taglib.html.TOKEN'
                }).prependTo($('#smlForm'));
            }
            $('input:hidden[name="org.apache.struts.taglib.html.TOKEN"]').val(data["token"]);

            //差出人
            var sendUser = "";
            sendUser += htmlEscape(data.sml020knSendAccount);
            $('#sml_create_kakunin_body .js_atesakiSenduserKakuninArea .js_mailCreateKakunin_content').append(sendUser);

            //宛先
            if (data.sml020Atesaki != null) {
                var detail = data.sml020Atesaki;

                dspAtesaki($('#sml_create_kakunin_body .js_atesakiToKakuninArea'),
                        '.js_mailCreateKakunin_content',
                        detail.atesakiList,
                        (data.photoDspFlg == "0"));

            } else {
                $('#sml_create_kakunin_body .js_atesakiToKakuninArea').remove();
            }

            //CC
            if (data.sml020AtesakiCc != null) {
                var detailCc = data.sml020AtesakiCc;
                dspAtesaki($('#sml_create_kakunin_body .js_atesakiCcKakuninArea'),
                        '.js_mailCreateKakunin_content',
                        detailCc.atesakiList,
                        (data.photoDspFlg == "0"));
            } else {
                $('#sml_create_kakunin_body .js_atesakiCcKakuninArea').remove();
            }

            //BCC
            if (data.sml020AtesakiBcc != null) {
                var detailBcc = data.sml020AtesakiBcc;
                dspAtesaki($('#sml_create_kakunin_body .js_atesakiBccKakuninArea'),
                        '.js_mailCreateKakunin_content',
                        detailBcc.atesakiList,
                        (data.photoDspFlg == "0"));
            } else {
                $('#sml_create_kakunin_body .js_atesakiBccKakuninArea').remove();
            }

            //件名
            $('#sml_create_kakunin_body .js_atesakiTitleKakuninArea').append(htmlEscape(data.sml020Title));

            //マーク
            var mark = $('#sml_markList_mlnon').find('[name='+data.sml020Mark+']');
            if (mark.length > 0) {
                mark = mark.eq(0).clone();
                $('#sml_create_kakunin_body .js_atesakiMarkKakuninArea').append(mark.html());
            } else {
                $('#sml_create_kakunin_body .js_atesakiMarkKakuninArea').remove();
            }

            //添付ファイル
            var tmpStr = "";
            if (data.sml020FileLabelList.length > 0) {
                for (e = 0; e < data.sml020FileLabelList.length; e++) {
                    var fileMdl = data.sml020FileLabelList[e];

                    $('#sml_create_kakunin_body .js_atesakiTmpKakuninArea').append('<div class="verAlignMid w100" >'
                        +   '<file-preview url="../smail/sml020kn.do?CMD=fileDownload&sml020knBinSid='
                        +   fileMdl.value
                        +   '&smlViewAccount='
                        +   $("#account_comb_box").val()
                        +   '" filename="' + htmlEscape(fileMdl.label) + '">'
                        +   '<a href="#!" onClick="attachmentFileDownload('
                        +   fileMdl.value
                        +   ');">'
                        + '<img class="classic-display" src="../common/images/classic/icon_temp_file_2.png" />'
                        + '<img class="original-display" src="../common/images/original/icon_attach.png" />'
                        +   htmlEscape(fileMdl.label)
                        +   "</a></file-preview></div>");
                }
            } else {
                $('#sml_create_kakunin_body .js_atesakiTmpKakuninArea').remove();
            }

            //本文
            var iframeObj = $('#sml_create_kakunin_body_htmlframe iframe').clone(true);
            iframeObj.attr('data-htmlbody', data.sml020knSmsBody);
            iframeObj = iframeObj.appendTo('#sml_create_kakunin_body .js_atesakiBodyKakuninArea');

        } else {
            alert(msglist_sml010["sml.200"]);
        }
    }).fail(function(data) {
        alert(msglist_sml010["sml.200"]);
    });
}

function delCreateKakuninArea() {
    //確認画面のリセット
    $('#sml_create_kakunin_body').children().remove();
    //テンプレートのクローンを挿入
    $.each($('#sml_create_kakunin_body-template').clone().children(), function() {
        $(this).appendTo('#sml_create_kakunin_body');
    });
}

function doMailSendSoushin() {

    document.forms[0].CMD.value='sendData';
    let param = getFormParam($('#smlForm'));
    param["sml010SelectedSid"] = $('.js_mailBody').attr("data-sid");
    param["sml010EditSid"] = $('.js_mailBody').attr("data-sid");
    let paramStr = $.param(param, true);
    loadingPop("送信中");

    $.ajax({
        async: true,
        url:  "../smail/sml020kn.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        //添付ファイルでFileNotFoundException発生
        try {
            if ($(data).find('[name=errCause]')
                && $(data).find('[name=errCause]').val() == 'GSAttachFileNotExistException') {
                editorBeforeUnloadManager.off();
                $('html').html('');
                $('body').append($(data));
                return;
            }
        } catch (ee) {
            //正常登録時のjsonをjqueryObjとして扱うとエクセプションになる
        }

        if (data["success"]) {
            if (data.errorsList != null && data.errorsList.length > 0) {
                var dialogWidth = 'auto';
                var dialogHeight = 'auto';
                var errorMsg = "";
                for (e = 0; e < data.errorsList.length; e++) {
                    errorMsg += "<div class=\"js_errorMsgStr cl_fontWarn errorMsgStr\">" + data.errorsList[e] + "</div>";
                    dialogWidth = 630;
                }

                $('#loading_pop').dialog('close');
                messagePop(errorMsg, dialogWidth, dialogHeight);

            } else {
                $('#loading_pop').dialog('close');
                $("#toastMessageBody").html("").append(msglist_sml010["sml.224"]);
                displayToast("sml010MessageToast");
                delNewCreateMail($('.js_mailDelBtnMini'), 1, -1);
                reloadData();
            }
            resetSid();
        } else {
            $('#loading_pop').dialog('close');
            alert(msglist_sml010["sml.200"]);
            resetSid();
        }
    }).fail(function(data){
        $('#loading_pop').dialog('close');
        alert(msglist_sml010["sml.200"]);
        resetSid();
    });
}


function deleteMail() {

    document.forms[0].CMD.value='deleteData';
    var paramStr = "";

    //詳細メールを開いたときに退避したSIDとモードを取得
    var processTemp = document.forms[0].sml010ProcMode.value;
    getSidEscape();
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml030.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                deleteMailPop(data, 0);
            }
        } else {
            alert(msglist_sml010["sml.193"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.193"]);
    });
    document.forms[0].sml010ProcMode.value = processTemp;
}

function exportMail(cmd, searchFlg) {
    var exportUrl = "../smail/sml010.do";
    if (searchFlg) {
        exportUrl = "../smail/sml090.do";
    }
    exportUrl += '?CMD=' + cmd
    + '&smlViewAccount=' + document.forms[0].smlViewAccount.value
    + '&sml010ProcMode=' + document.forms[0].sml010ProcMode.value
    + '&sml010SelectedMailKbn=' + document.forms[0].sml010SelectedMailKbn.value
    + '&sml010SelectLabelSid=' + document.forms[0].sml010SelectLabelSid.value
    + '&sml010Sort_key=' + document.forms[0].sml010Sort_key.value
    + '&sml010Order_key=' + document.forms[0].sml010Order_key.value;

    var delSidName = 'sml010DelSid';
    if (searchFlg) {
        delSidName = 'sml090DelSid';
        exportUrl += '&sml090SvMailSyubetsu=' + document.forms[0].sml090SvMailSyubetsu.value;
    }

    var delSidList = document.getElementsByName(delSidName);
    var checked = false;

    for (sidIdx = 0; sidIdx < delSidList.length; sidIdx++) {
        if (delSidList[sidIdx].checked) {
            checked = true;
            exportUrl += "&" + delSidName + "=" + delSidList[sidIdx].value;
        }
    }
    if (!checked) {
        messagePop(msglist_sml010['sml.sml010.13'], 400, 'auto');
        return;
    }

    document.getElementById('sml010Export').src = exportUrl;
}

function doExportByPdfMail() {
    exportMail('exportByPdfData', false);
}

function doExportByEmlMail() {
    exportMail('exportByEmlData', false);
}

function doExportByPdfSearchMail() {
    exportMail('exportByPdfData', true);
}

function doExportByEmlSearchMail() {
    exportMail('exportByEmlData', true);
}

function doDeleteMail() {

    document.forms[0].CMD.value='deleteOkData';
    var paramStr = "";
    var processTemp = document.forms[0].sml010ProcMode.value;
    getSidEscape();
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml030.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                $("#toastMessageBody").html("").append(data.messageList[0]);
                displayToast("sml010MessageToast");
                $('#errorMsgArea').html("");
                $('.js_mailCloseBtnMini').click();
            }
        } else {
            alert(msglist_sml010["sml.193"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.193"]);
    });
    document.forms[0].sml010ProcMode.value = processTemp;
}

function doDeleteMailAll() {

    document.forms[0].CMD.value='deleteAllOkData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml030.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                $("#toastMessageBody").html("").append(data.messageList[0]);
                displayToast("sml010MessageToast");
                $('#errorMsgArea').html("");
                $('.js_mailCloseBtnMini').click();
            }
        } else {
            alert(msglist_sml010["sml.193"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.193"]);
    });
}

function deleteMailAll() {

    document.forms[0].CMD.value='deleteAllData';
    var paramStr = "";

    //詳細メールを開いたときに退避したSIDとモードを取得
    var processTemp = document.forms[0].sml010ProcMode.value;
    getSidEscape();
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml030.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.errorsList != null && data.errorsList.length > 0) {
                var errorMsgStr = "";
                for (e = 0; e < data.errorsList.length; e++) {
                    errorMsgStr += data.errorsList[e];
                }
                messagePop(errorMsgStr, 450, 'auto');

            } else if (data.messageList != null && data.messageList.length > 0) {
                if (data.messageList.length > 0) {
                    deleteMailPop(data, 1);
                }
            }
        } else {
            alert(msglist_sml010["sml.193"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.193"]);
    });
    document.forms[0].sml010ProcMode.value = processTemp;
}

function doKidokuMail() {

    document.forms[0].CMD.value='kidokuOkData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            reloadData();
        } else {
            alert(msglist_sml010["sml.202"]);
            reloadData();
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.202"]);
    });
}

function doMidokuMail() {

    document.forms[0].CMD.value='midokuOkData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            reloadData();
        } else {
            alert(msglist_sml010["sml.203"]);
            reloadData();
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.203"]);
    });
}

function doKidokuSearchMail() {

    document.forms[0].CMD.value='kidokuOkData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml090.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            reloadData();
        } else {
            alert(msglist_sml010["sml.202"]);
            reloadData();
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.202"]);
    });
}

function doMidokuSearchMail() {

    document.forms[0].CMD.value='midokuOkData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml090.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            reloadData();
        } else {
            alert(msglist_sml010["sml.203"]);
            reloadData();
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.203"]);
    });
}


function deleteSokoMail() {

    document.forms[0].CMD.value='deleteKnData';
    let param = getFormParam($('#smlForm'));
    param["sml010SelectedSid"] = $('.js_mailBody').attr("data-sid");
    param["sml010EditSid"] = $('.js_mailBody').attr("data-sid");
    let paramStr = $.param(param, true);

    $.ajax({
        async: true,
        url:  "../smail/sml020.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                deleteSokoMailPop(data, 0);
            }
        } else {
            alert(msglist_sml010["sml.193"]);
            resetSid();
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.193"]);
        resetSid();
    });
}

function doDeleteSokoMail() {

    document.forms[0].CMD.value='deleteOkData';
    let param = getFormParam($('#smlForm'));
    param["sml010SelectedSid"] = $('.js_mailBody').attr("data-sid");
    param["sml010EditSid"] = $('.js_mailBody').attr("data-sid");
    let paramStr = $.param(param, true);

    $.ajax({
        async: true,
        url:  "../smail/sml020.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                $("#toastMessageBody").html("").append(data.messageList[0]);
                displayToast("sml010MessageToast");
                delNewCreateMail($('.js_mailDelBtnMini'), 1, -1);
                reloadData();
            }
        } else {
            alert(msglist_sml010["sml.193"]);
        }
        resetSid();
    }).fail(function(data){
        alert(msglist_sml010["sml.193"]);
        resetSid();
    });
}

function pdfListMail() {

    if (!checkSelected("pdf", false)) {
        return;
    }
    let messageData = getPopUpMaildata("pdf", false);
    expMailPop(messageData, 1);

}

function emlListMail() {

    if (!checkSelected("eml", false)) {
        return;
    }
    let messageData = getPopUpMaildata("eml", false);
    expMailPop(messageData, 2);

}

function pdfListSearchMail() {

    if (!checkSelected("pdf", true)) {
        return;
    }
    let messageData = getPopUpMaildata("pdf", true);
    expMailSearchPop(messageData, 1);
}

function emlListSearchMail() {

    if (!checkSelected("eml", true)) {
        return;
    }
    let messageData = getPopUpMaildata("eml", true);
    expMailSearchPop(messageData, 2);

}

function kidokuListMail() {

    if (!checkSelected("kidoku", false)) {
        return;
    }
    let messageData = getPopUpMaildata("kidoku", false);
    readKbnMailPop(messageData, 1);

}

function midokuListMail() {

    if (!checkSelected("midoku", false)) {
        return;
    }
    let messageData = getPopUpMaildata("midoku", false);
    readKbnMailPop(messageData, 2);

}

function kidokuSearchListMail() {

    if (!checkSelected("kidoku", true)) {
        return;
    }
    let messageData = getPopUpMaildata("kidoku", true);
    readKbnSearchMailPop(messageData, 1);

}

function midokuSearchListMail() {

    if (!checkSelected("midoku", true)) {
        return;
    }
    let messageData = getPopUpMaildata("midoku", true);
    readKbnSearchMailPop(messageData, 2);

}

function deleteListMail(action) {

    if (!checkSelected(action, false)) {
        return;
    }
    let messageData = getPopUpMaildata(action, false);
    deleteMailPop(messageData, 2);

}

function doDeleteListMail() {

    document.forms[0].CMD.value='deleteDataOk';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));
    //選択パラメータの最終チェック
    var checked = false;
    $('input:checkbox[name=sml010DelSid]:checked').each(function(){
        checked = true;
    });
    if (!checked) {
        messagePop(msglist_sml010['sml.sml010.13'], 400, 'auto');
        return;
    }
    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                $("#toastMessageBody").html("").append(data.messageList[0]);
                displayToast("sml010MessageToast");
                reloadData();
            }
        } else {
            alert(msglist_sml010["sml.193"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.193"]);
    });
}


function revivedListMail() {

    if (!checkSelected("revive", false)) {
        return;
    }
    let messageData = getPopUpMaildata("revive", false);
    deleteMailPop(messageData, 3);
}

function doRevivedListMail() {

    document.forms[0].CMD.value='revivedDataOk';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));
    var checked = false;
    $('input:checkbox[name=sml010DelSid]:checked').each(function(){
        checked = true;
    });
    if (!checked) {
        messagePop(msglist_sml010['sml.sml010.13'], 400, 'auto');
        return;
    }

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                $("#toastMessageBody").html("").append(data.messageList[0]);
                displayToast("sml010MessageToast");
                reloadData();
            }
        } else {
            alert(msglist_sml010["sml.206"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.206"]);
    });
}

function emptyTrash() {

    document.forms[0].CMD.value='gomibakoDataClear';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.errorsList != null && data.errorsList.length > 0) {
                var errorMsgStr = "";
                for (e = 0; e < data.errorsList.length; e++) {
                    errorMsgStr += data.errorsList[e];
                }
                messagePop(errorMsgStr, 400, 'auto');
            } else {
                if (data.messageList != null && data.messageList.length > 0) {
                    deleteMailPop(data, 4);
                } else {
                    readPop(msglist_sml010["sml.229"], 400, 'auto');
                }
            }
        } else {
            alert(msglist_sml010["sml.207"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.207"]);
    });
}

function doEmptyTrash() {

    document.forms[0].CMD.value='clearDataOk';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                $("#toastMessageBody").html("").append(data.messageList[0]);
                displayToast("sml010MessageToast");
                $('#errorMsgArea').html("");
                reloadData();
            }
        } else {
            alert(msglist_sml010["sml.207"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.207"]);
    });
}


function addLabelListMail() {

    if (!checkSelected("label", false)) {
        return;
    }
    labelAddPop();

}

function deleteLabelListMail() {

    if (!checkSelected("label", false)) {
        return;
    }
    labelDeletePop();
}


function labelAddPop() {

    document.forms[0].CMD.value='getLabelData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data["success"]) {
            $('#labelAddContentArea').children().remove();
            var labelContentStr = "";

            if (data != null && data.labelCombo != null && data.labelCombo.length > 0) {

                var optionStr = "";
                for (i = 0; i < data.labelCombo.length; i++) {
                    var labelData = data.labelCombo[i];
                    optionStr += "<option value=\""
                        +  labelData.value
                        +  "\">"
                        +  htmlEscape(labelData.label)
                        +  "</option>";
                }

                labelContentStr = "<tr>"
                    + "<td class=\"w30\">"
                    + "<span class=\"verAlignMid\"><input type=\"radio\" name=\"sml010addLabelT\" value=\"0\" id=\"addLabelType0\" checked=\"\"><label class=\"fw_b fs_13\" for=\"addLabelType0\">"+msglist_sml010['sml.sml010.20']+"</label></span>"
                    + "</td>"
                    + "<td  class=\"w70\">"
                    + "<select id=\"label_dialog_sel\" class=\"wp180\">"
                    + optionStr
                    + "</select>"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td class=\"w30\">"
                    + "<span class=\"verAlignMid\"><input type=\"radio\" name=\"sml010addLabelT\" id=\"addLabelType1\" value=\"1\"><label  class=\"fw_b fs_13\" for=\"addLabelType1\">"+msglist_sml010['sml.sml010.21']+"</label></span>"
                    + "</td>"
                    + "<td  class=\"w70\">"
                    + "<input type=\"text\" id=\"label_dialog_new\" class=\"w100\" maxlength=\"100\" disabled=\"\">"
                    + "<span id=\"addLabelParam\"></span>"
                    + "</td>"
                    + "</tr>";

            } else {

                labelContentStr = "<tr>"
                    + "<td class=\"fw_b fs_13\ w25\">"
                    + msglist_sml010['sml.sml010.21']
                    + "</td>"
                    + "<td class=\"w75\">"
                    + "<input type=\"text\" id=\"label_dialog_new\" class=\"w100\" maxlength=\"100\" />"
                    + "<span id=\"addLabelParam\"></span>"
                    + "<input type=\"hidden\" name=\"sml010addLabelType\" value=\"1\">"
                    + "</td>"
                    + "</tr>";

            }

            $('#labelAddContentArea').append(labelContentStr);

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
                    text:msglist_sml010["cmn.add"],
                    click: function() {
                        doLabel(0);
                    }
                },{
                        text:msglist_sml010["cmn.close"],
                        click: function() {

                        $(this).dialog('close');

                    }
                }]
            });
        } else {
            alert(msglist_sml010["sml.208"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.208"]);
    });

}


function labelDeletePop() {

    document.forms[0].CMD.value='getLabelData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data["success"]) {
            $('#labelDelContentArea').children().remove();
            var labelContentStr = "";

            if (data != null && data.labelCombo != null && data.labelCombo.length > 0) {

                var optionStr = "";
                for (i = 0; i < data.labelCombo.length; i++) {
                    var labelData = data.labelCombo[i];
                    optionStr += "<option value=\""
                        +  labelData.value
                        +  "\">"
                        +  labelData.label
                        +  "</option>";
                }

                labelContentStr = "<tr>"
                    + "<td>"
                    + "<select id=\"label_del_dialog_sel\" class=\"wp180\">"
                    + optionStr
                    + "</select>"
                    + "</td>"
                    + "</tr>";


                $('#labelDelContentArea').append(labelContentStr);

                $('#labelDelPop').dialog({
                    dialogClass:"fs_13",
                    autoOpen: true,  // hide dialog
                    bgiframe: true,   // for IE6
                    resizable: false,
                    height:'auto',
                    width: 220,
                    modal: true,
                    overlay: {
                        backgroundColor: '#000000',
                        opacity: 0.5
                    },
                    buttons: [{
                    text:msglist_sml010["cmn.delete"],
                    click: function() {
                            doLabel(1);
                        }
                    },{
                        text:msglist_sml010["cmn.close"],
                        click: function() {

                            $(this).dialog('close');

                        }
                    }]
                });

            } else {
                messagePop(msglist_sml010["sml.219"], 400, 'auto');
            }
        } else {
            alert(msglist_sml010["sml.209"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.209"]);
    });

}

/**
 *
 * @param kbn 0:ラベル追加 1:ラベル除去
 * @returns
 */
function doLabel(kbn) {

    var widthStr = 400;
    var heightStr = 300;

    if (kbn == 0) {

        if ($('#label_dialog_sel') != null) {
            $('input:hidden[name=sml010addLabel]').val($('#label_dialog_sel').val());
        }

        if ($('#label_dialog_new') != null) {
            $('input:hidden[name=sml010addLabelName]').val($('#label_dialog_new').val());
        }

        if ($('input:radio[name=sml010addLabelT]') != null
                && $('input:radio[name=sml010addLabelT]:checked').val() != null) {
            $('input:hidden[name=sml010addLabelType]').val($('input:radio[name=sml010addLabelT]:checked').val());
        } else {
            $('input:hidden[name=sml010addLabelType]').val(1);
        }

    } else {

        if ($('#label_del_dialog_sel') != null) {
            $('input:hidden[name=sml010delLabel]').val($('#label_del_dialog_sel').val());
        }

    }

    //ラベルタブ時
    if ($('input:hidden[name=sml010ProcMode]').val() == 5) {
        $('input[name=sml010DelSid]:checked').each(function(){
            $('#sml010LabelTabSelArea').append(
                "<input type=\"hidden\" name=\"sml010LabelDelSid\" value=\""
                + $(this).parents('.js_listHover').data('mailkbn')
                + ":"
                + $(this).parents('.js_listHover').data('smlsid')
                + "\" />");
        });
    }

    var checked = false;
    $('input:checkbox[name=sml010DelSid]:checked').each(function(){
        checked = true;
    });
    if (!checked) {
        messagePop(msglist_sml010['sml.sml010.13'], 400, 'auto');
        return;
    }


    var cmd = "";
    var msg = "";
    if (kbn == 0) {
        cmd = "addMessageLabel";
        msg = msglist_sml010["sml.208"];
    } else {
        cmd = "delMessageLabel";
        msg = msglist_sml010["sml.209"];
    }

    document.forms[0].CMD.value = cmd;
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            $('#labelAddPop').dialog('close');
            $('#labelDelPop').dialog('close');
            if (data.errorsList != null && data.errorsList.length > 0) {
                var errorMsgStr = "";
                for (i = 0; i < data.errorsList.length; i++) {
                    if (i != 0) {
                        errorMsgStr += "<br>";
                    }
                    errorMsgStr += data.errorsList[i];
                }
                messagePop(errorMsgStr, 400, 'auto');
            } else {
                reloadData();
            }
        } else {
            alert(msg);
        }
    }).fail(function(data){
        alert(msg);
    });

    $('#sml010LabelTabSelArea').children().remove();
}


function addLabelSearchListMail() {

    if (!checkSelected("label", true)) {
        return;
    }
    labelAddSearchPop();
}

function deleteLabelSearchListMail() {

    if (!checkSelected("label", true)) {
        return;
    }
    labelDeleteSearchPop();
}


function labelAddSearchPop() {

    document.forms[0].CMD.value='getLabelData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data["success"]) {
            $('#labelAddContentArea').children().remove();
            var labelContentStr = "";

            if (data != null && data.labelCombo != null && data.labelCombo.length > 0) {

                var optionStr = "";
                for (i = 0; i < data.labelCombo.length; i++) {
                    var labelData = data.labelCombo[i];
                    optionStr += "<option value=\""
                        +  labelData.value
                        +  "\">"
                        +  labelData.label
                        +  "</option>";
                }

                labelContentStr = "<tr>"
                    + "<td>"
                    + "<input type=\"radio\" name=\"sml010addLabelT\" value=\"0\" id=\"addLabelType0\" checked=\"\"><label for=\"addLabelType0\">"+msglist_sml010['sml.sml010.20']+"</label>"
                    + "</td>"
                    + "<td>"
                    + "<select id=\"label_dialog_sel\">"
                    + optionStr
                    + "</select>"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td>"
                    + "<input type=\"radio\" name=\"sml010addLabelT\" id=\"addLabelType1\" value=\"1\"><label for=\"addLabelType1\">"+msglist_sml010['sml.sml010.21']+"</label>"
                    + "</td>"
                    + "<td>"
                    + "<input type=\"text\" id=\"label_dialog_new\" maxlength=\"100\" disabled=\"\">"
                    + "<span id=\"addLabelParam\"></span>"
                    + "</td>"
                    + "</tr>";

            } else {

                labelContentStr = "<tr>"
                    + "<td>"
                    + msglist_sml010['sml.sml010.21']
                    + "<input type=\"text\" id=\"label_dialog_new\" maxlength=\"100\" />"
                    + "<span id=\"addLabelParam\"></span>"
                    + "<input type=\"hidden\" name=\"sml010addLabelType\" value=\"1\">"
                    + "</td>"
                    + "</tr>";

            }

            $('#labelAddContentArea').append(labelContentStr);

            $('#labelAddPop').dialog({
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
                    text:msglist_sml010["cmn.add"],
                    click: function() {
                        doSearchLabel(0);
                    }
                },{
                    text:msglist_sml010["cmn.close"],
                    click: function() {

                        $(this).dialog('close');

                    }
                }]
            });
        } else {
            alert(msglist_sml010["sml.198"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.198"]);
    });

}


function labelDeleteSearchPop() {

    document.forms[0].CMD.value='getLabelData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));
    var checked = false;

    $.ajax({
        async: true,
        url:  "../smail/sml010.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {

        if (data["success"]) {
            $('#labelDelContentArea').children().remove();
            var labelContentStr = "";

            if (data != null && data.labelCombo != null && data.labelCombo.length > 0) {

                var optionStr = "";
                for (i = 0; i < data.labelCombo.length; i++) {
                    var labelData = data.labelCombo[i];
                    optionStr += "<option value=\""
                        +  labelData.value
                        +  "\">"
                        +  labelData.label
                        +  "</option>";
                }

                labelContentStr = "<tr>"
                    + "<td>"
                    + "<select id=\"label_del_dialog_sel\">"
                    + optionStr
                    + "</select>"
                    + "</td>"
                    + "</tr>";


                $('#labelDelContentArea').append(labelContentStr);

                $('#labelDelPop').dialog({
                    autoOpen: true,  // hide dialog
                    bgiframe: true,   // for IE6
                    resizable: false,
                    height:'auto',
                    width: 220,
                    modal: true,
                    overlay: {
                        backgroundColor: '#000000',
                        opacity: 0.5
                    },
                    buttons: [{
                    text:msglist_sml010["cmn.delete"],
                    click: function() {
                            doSearchLabel(1);
                        }
                    },{
                    text:msglist_sml010["cmn.close"],
                    click: function() {

                            $(this).dialog('close');

                        }
                    }]
                });

            } else {
                messagePop(msglist_sml010["sml.219"], 400, 'auto');
            }
        } else {
            alert(msglist_sml010["sml.198"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.198"]);
    });

}


function doSearchLabel(kbn) {

    var widthStr = 400;
    var heightStr = 300;

    if (kbn == 0) {

        if ($('#label_dialog_sel') != null) {
            $('input:hidden[name=sml010addLabel]').val($('#label_dialog_sel').val());
        }

        if ($('#label_dialog_new') != null) {
            $('input:hidden[name=sml010addLabelName]').val($('#label_dialog_new').val());
        }

        if ($('input:radio[name=sml010addLabelT]') != null
                && $('input:radio[name=sml010addLabelT]:checked').val() != null) {
            $('input:hidden[name=sml010addLabelType]').val($('input:radio[name=sml010addLabelT]:checked').val());
        } else {
            $('input:hidden[name=sml010addLabelType]').val(1);
        }

    } else {

        if ($('#label_del_dialog_sel') != null) {
            $('input:hidden[name=sml010delLabel]').val($('#label_del_dialog_sel').val());
        }

    }
    var checked = false;
    $('input:checkbox[name=sml090DelSid]:checked').each(function(){
        checked = true;
    });
    if (!checked) {
        messagePop(msglist_sml010['sml.sml010.13'], 400, 'auto');
        return;
    }

    var cmd = "";
    var msg = "";
    if (kbn == 0) {
        cmd = "addMessageLabel";
        msg = msglist_sml010["sml.208"];
    } else {
        cmd = "delMessageLabel";
        msg = msglist_sml010["sml.209"];
    }

    document.forms[0].CMD.value = cmd;
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml090.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            $('#labelAddPop').dialog('close');
            $('#labelDelPop').dialog('close');
            if (data.errorsList != null && data.errorsList.length > 0) {
                var errorMsgStr = "";
                for (i = 0; i < data.errorsList.length; i++) {
                    if (i != 0) {
                        errorMsgStr += "<br>";
                    }
                    errorMsgStr += data.errorsList[i];
                }
                messagePop(errorMsgStr, 400, 'auto');
            } else {
                reloadData();
            }
        } else {
            alert(msg);
        }
    }).fail(function(data){
        alert(msg);
    });
}


function changeAddLabelType() {
    if ($('input:radio[name=sml010addLabelT]:checked').val() == 1) {
        $('#label_dialog_sel').attr("disabled", "disabled");
        $('#label_dialog_new').removeAttr("disabled");
    } else {
        $('#label_dialog_sel').removeAttr("disabled");
        $('#label_dialog_new').attr("disabled", "disabled");
    }
}

function replayMail(mailkbn) {

    if (mail_create_flg) {
        delKakuninPopup(paramStr, mailkbn, "replayMail");
    } else {
        var cmdStr = 'hensinData';
        var selectedSid = document.forms[0].selectEsc.value;
        var editSid = document.forms[0].editEsc.value;

        //メール詳細を開き草稿を保存すると選択SIDが変わるので詳細メールに戻す
        if (selectedSid != 0) {
            editSid = selectedSid;
        } else if (editSid != 0) {
            selectedSid = editSid;
        }

        //草稿メールの場合は詳細メールのSIDに戻さない
        if (selectedSid != 0 && editSid != 0 && mailkbn != 4) {
            document.forms[0].sml010SelectedSid.value = selectedSid;
            document.forms[0].sml010EditSid.value = editSid;
        }

        if (mailkbn == 1) {
            cmdStr = 'hensinData';
        } else if (mailkbn == 2) {
            cmdStr = 'zenhensinData';
        } else if (mailkbn == 3) {
            cmdStr = 'tensoData';
        } else if (mailkbn == 4) {
            cmdStr = 'getSokoData';
        } else if (mailkbn == 11) {
            cmdStr = 'copyData';
        } else if (mailkbn == 12) {
            cmdStr = 'getCalledWebmail';
            //WEBメールからの場合は強制的にテキスト形式で表示する
            $('input:hidden[name=sml010AccountSendMailType]').val(0);
        }

        var paramStr = "";
        document.forms[0].CMD.value=cmdStr;

        document.forms[0].sml010EditSid.value = document.forms[0].sml010SelectedSid.value;
        paramStr += getFormData($('#smlForm'));
        $.ajax({
            async: true,
            url:  "../smail/sml020.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["confError"] == -100 || data["confError"] == -101) {
                document.forms[0].CMD.value="shareError";
                document.forms[0].sml010MailBodyLimit.value=Number(data["confError"]);
                document.forms[0].submit();
                return false;
            } else if (data["success"]) {
                tmp_del_flg = false;

                $('#send_account_comb_box').val(data.sml020SendAccount);
                $("#popHinaKojin").children().remove();
                if (data.sml020HinaListKjn.length > 0) {
                    hinagataKjnSet(data.sml020HinaListKjn);
                }

                openSendTab();
                setCreateMail(mailkbn, data);
                changeSidData(data.sml010SelectedSid);
            } else {
                alert(msglist_sml010["sml.190"]);
            }
        }).fail(function(data){
            alert(msglist_sml010["sml.190"]);
        });
    }

}

function delKakuninPopup(paramStr, mailkbn, callFunction) {
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
        buttons: [{
            name:"DIALOG_OK_BUTTON",
            text:msglist_sml010["cmn.ok"],
            click: function() {

                if (callFunction == "replayMail") {
                    var cmdStr = 'hensinData';
                    var selectedSid = document.forms[0].selectEsc.value;
                    var editSid = document.forms[0].editEsc.value;

                    //メール詳細を開き草稿を保存すると選択SIDが変わるので詳細メールに戻す
                    if (selectedSid != 0) {
                        editSid = selectedSid;
                    } else if (editSid != 0) {
                        selectedSid = editSid;
                    }

                    //草稿メールの場合は詳細メールのSIDに戻さない
                    if (selectedSid != 0 && editSid != 0 && mailkbn != 4) {
                        document.forms[0].sml010SelectedSid.value = selectedSid;
                        document.forms[0].sml010EditSid.value = editSid;
                    }

                    if (mailkbn == 1) {
                        cmdStr = 'hensinData';
                    } else if (mailkbn == 2) {
                        cmdStr = 'zenhensinData';
                    } else if (mailkbn == 3) {
                        cmdStr = 'tensoData';
                    } else if (mailkbn == 4) {
                        cmdStr = 'getSokoData';
                    } else if (mailkbn == 11) {
                        cmdStr = 'copyData';
                    } else if (mailkbn == 12) {
                        cmdStr = 'getCalledWebmail';
                        //WEBメールからの場合は強制的にテキスト形式で表示する
                        $('input:hidden[name=sml010AccountSendMailType]').val(0);
                    }
                    var paramStr = "";
                    document.forms[0].CMD.value=cmdStr;

                }

                if (paramStr != 'newMail') {
                    if (mailkbn === 1 || mailkbn === 2 || mailkbn === 3 || mailkbn === 11) {
                        document.forms[0].sml010SelectedSid.value=detail_mail_sid;
                    }
                    document.forms[0].sml010EditSid.value=document.forms[0].sml010SelectedSid.value;
                    paramStr += getFormData($('#smlForm'));
                } else {
                    paramStr = 'CMD=getNewmail&smlViewAccount='
                        +   $("#account_comb_box").val();
                }

                deleteNewCreateMail($('.js_mailDelBtnMini'));
                $(this).dialog('close');

                    $.ajax({
                        async: true,
                        url:  "../smail/sml020.do",
                        type: "post",
                        data: paramStr
                    }).done(function( data ) {
                        if (data["confError"] == -100 || data["confError"] == -101) {
                            document.forms[0].CMD.value="shareError";
                            document.forms[0].sml010MailBodyLimit.value=data["confError"];
                            document.forms[0].submit();
                            return false;
                        } else if (data["success"]) {
                            tmp_del_flg = false;
                            if (mailkbn === 1 || mailkbn === 2 || mailkbn === 3 || mailkbn === 4) {
                                //メール作成時の状態区分(0:新規 1:返信 2:全返信 3:転送 4:草稿)
                                $('input:hidden[name=sml020ProcMode]').val(mailkbn);
                            } else {
                                $('input:hidden[name=sml020ProcMode]').val(0);
                            }
                            $('#send_account_comb_box').val(data.sml020SendAccount);
                            $("#popHinaKojin").children().remove();
                            hinagataKjnSet(data.sml020HinaListKjn);
                            openSendTab();
                            setCreateMail(mailkbn, data);
                        } else {
                            alert(msglist_sml010["sml.193"]);
                        }

                        //草稿を開いたときはまだ処理が継続するためSIDのリセットは行わない
                        if (mailkbn != 4) {
                            resetSid();
                        }
                        let mailSid;
                        if (mailkbn == 0) {
                            mailSid = 0;
                        } else if (mailkbn == 4) {
                            mailSid = data.sml010SelectedSid;
                        } else {
                            mailSid = selectedSid;
                        }
                        changeSidData(mailSid);
                    }).fail(function(data){
                        alert(msglist_sml010["sml.193"]);
                        resetSid();
                    });
            }
        },{
            name:"DIALOG_CANCEL_BUTTON",
            text:msglist_sml010["cmn.cancel"],
            click:  function() {
                $(this).dialog('close');
            }
        }]

        ,open: function(event, ui) {
            document.getElementsByName('DIALOG_OK_BUTTON')[0].setAttribute("class","baseBtn");
            document.getElementsByName('DIALOG_OK_BUTTON')[0].innerHTML =
                '<img class="btn_classicImg-display" src="../common/images/classic/icon_ok.png" alt="">'
                + '<img class="btn_originalImg-display" src="../common/images/original/icon_check.png" alt="">'
                + msglist_sml010["cmn.ok"];

            document.getElementsByName('DIALOG_CANCEL_BUTTON')[0].setAttribute("class","baseBtn");
            document.getElementsByName('DIALOG_CANCEL_BUTTON')[0].innerHTML =
                '<img class="btn_classicImg-display" src="../common/images/classic/icon_delete.png" alt="">'
                + '<img class="btn_originalImg-display" src="../common/images/original/icon_delete.png" alt="">'
                + msglist_sml010["cmn.cancel"];
        }
    });
}

function setCreateMail(mailkbn, mailData) {
    if (mailData != null) {

        if (mailData.sml020Atesaki != null && mailData.sml020Atesaki.atesakiList.length > 0) {
            for (u = 0; u < mailData.sml020Atesaki.atesakiList.length; u++) {

                var atesakiMdl = mailData.sml020Atesaki.atesakiList[u];
                var muko = false;
                var sid;
                var to ;
                if (atesakiMdl.usrSid > 0) {
                    to = {
                            sid : atesakiMdl.usrSid,
                            name : atesakiMdl.usiSei + ' ' + atesakiMdl.usiMei,
                            mukoUser : false
                    };

                    if (atesakiMdl.usrUkoFlg == "1") {
                        to.mukoUser = true;
                    }
                } else {
                    to = {
                            sid : 'sac' + atesakiMdl.accountSid,
                            name : atesakiMdl.accountName,
                            mukoUser : false
                    };
                }
                $(window).smlatesaki().addAtesakiUsr(
                        to,
                        $('#atesaki_to_area'),
                        'sml020userSid');

            }
            $(window).smlatesaki().resetAtesakiScr($('#atesaki_to_area'));
        }

        if ( mailData.sml020AtesakiCc != null && mailData.sml020AtesakiCc.atesakiList.length > 0) {
            for (u = 0; u < mailData.sml020AtesakiCc.atesakiList.length; u++) {

                var atesakiMdl = mailData.sml020AtesakiCc.atesakiList[u];
                var to ;
                if (atesakiMdl.usrSid > 0) {
                    to = {
                            sid : atesakiMdl.usrSid,
                            name : atesakiMdl.usiSei + ' ' + atesakiMdl.usiMei,
                            mukoUser : false
                    };

                    if (atesakiMdl.usrUkoFlg == "1") {
                        to.mukoUser = true;
                    }
                } else {
                    to = {
                            sid : 'sac' + atesakiMdl.accountSid,
                            name : atesakiMdl.accountName,
                            mukoUser : false
                    };
                }
                $(window).smlatesaki().addAtesakiUsr(
                        to,
                        $('#atesaki_cc_area'),
                        'sml020userSidCc');


            }
            $(window).smlatesaki().resetAtesakiScr($('#atesaki_cc_area'));

        }

        if (mailData.sml020AtesakiBcc != null && mailData.sml020AtesakiBcc.atesakiList.length > 0) {
            for (u = 0; u < mailData.sml020AtesakiBcc.atesakiList.length; u++) {

                var atesakiMdl = mailData.sml020AtesakiBcc.atesakiList[u];
                var to ;
                if (atesakiMdl.usrSid > 0) {
                    to = {
                            sid : atesakiMdl.usrSid,
                            name : atesakiMdl.usiSei + ' ' + atesakiMdl.usiMei,
                            mukoUser : false
                    };

                    if (atesakiMdl.usrUkoFlg == "1") {
                        to.mukoUser = true;
                    }
                } else {
                    to = {
                            sid : 'sac' + atesakiMdl.accountSid,
                            name : atesakiMdl.accountName,
                            mukoUser : false
                    };
                }
                $(window).smlatesaki().addAtesakiUsr(
                        to,
                        $('#atesaki_bcc_area'),
                        'sml020userSidBcc');


            }
            $(window).smlatesaki().resetAtesakiScr($('#atesaki_bcc_area'));

        }

        $('input[name=sml020Title]').val(mailData.sml020Title);

        //tinyMceInit();


        $('textarea[name=sml020Body]').val(mailData.sml020Body);
        $('#inputlength').html(mailData.sml020Body.length);

        if (mailkbn == 4 || mailkbn == 11) {
            //草稿  複写
            if (mailData.sml020MailType != 0) {

                if ($('input:hidden[name=sml010AccountSendMailType]').val() != 0) {
                    changeSendMailType(1);
                } else {
                    changeSendMailType(0);
                }
                $('input:hidden[name=sml020BodyHtml]').val(mailData.sml020Body);
                setTextHtmlAreaStr();

            } else {

                if ($('input:hidden[name=sml010AccountSendMailType]').val() != 0) {
                    changeSendMailType(0);
                } else {
                    changeSendMailType(1);
                }
                $('textarea[name=sml020Body]').val(mailData.sml020Body);
                $('#inputlength').html(mailData.sml020Body.length);

            }

        } else {

            if ($('input:hidden[name=sml010AccountSendMailType]').val() != 0) {
                changeSendMailType(1);
            }

        }
        if (mailData.sml020AtesakiDeletedMessage) {
            var dialogWidth = 630;
            var dialogHeight = 340;
            var errorMsg = "<div class=\"txt_m of_a wp500 hp200 fw_b fs_13\">" + mailData.sml020AtesakiDeletedMessage + "</div>";
            messagePop(errorMsg, dialogWidth, dialogHeight);
        }

    }

    $('#composeTempFile').empty();
    $('#composeTempFile').append(
    '<div>'
    + '<input type=\"hidden\" name=\"attachmentFileListFlg1\" value=\"true\" />'
    + '</div>'
    + '<span id=\"attachmentFileErrorArea1\"></span>'
    + '<input type="hidden" name="attachment_ID_list" value="1">'
    + '<input type=\"hidden\" name=\"attachmentMode1\" value=\"0\" />'
    + '<input type=\"hidden\" name=\"attachmentPluginId1\" value=\"smail\" />'
    + '<input type=\"hidden\" name=\"attachmentTempDirId1\" value=\"sml020\" />'
    + '<input type=\"hidden\" name=\"attachmentTempDirPlus1\" value=\"\" />'
    + '<span id=\"attachmentFileListArea1\" class=\"mt5\"></span>'
    );
    resetAttachmentDropArea();

    if (mailData != null) {
        if (mailkbn == 3 || mailkbn == 4 || mailkbn == 11 || mailkbn == 12) {
            $('input[name="sml020Mark"]').val([mailData.sml020Mark]);

            if (mailData.sml020FileLabelList != null && mailData.sml020FileLabelList.length) {
                for (f = 0; f < mailData.sml020FileLabelList.length; f++) {

                    var fileMdl = mailData.sml020FileLabelList[f];
                    var tempList = "";
                    tempList = "<div id=\"attachmentFileDetail1" + "_" + fileMdl.value
                                + '\" class=\"display_flex mt5\">'
                                + '<div class=\"verAlignMid\">'
                                + '<file-preview url="../smail/sml020kn.do?CMD=fileDownload&sml020knBinSid='
                                + fileMdl.value
                                + '&smlViewAccount='
                                + $("#account_comb_box").val()
                                + '" filename="' + fileMdl.label + '">'
                                + '<img class=\"classic-display\"'
                                + ' src=\"../common/images/classic/icon_temp_file_2.png\"'
                                + ' draggable=\"false\">'
                                + '<img class=\"original-display\"'
                                + ' src=\"../common/images/original/icon_attach.png\"'
                                + ' draggable=\"false\">'
                                + '<a href=\"#!\"'
                                + ' onClick=\"attachmentFileDownload(' + fileMdl.value + ');\">'
                                + '<span class=\"textLink ml5\">' + fileMdl.label + '</span>'
                                + '</a>'
                                + '<img class=\"ml5 cursor_p btn_originalImg-display\"'
                                + ' src=\"../common/images/original/icon_delete.png\"'
                                + ' onClick=\"attachmentDeleteFile(' + fileMdl.value + ', 1);\"'
                                + ' draggable=\"false\">'
                                + '<img class=\"ml5 cursor_p btn_classicImg-display\"'
                                + ' src=\"../common/images/classic/icon_delete.png\"'
                                + ' onClick=\"attachmentDeleteFile(' + fileMdl.value + ', 1);\"'
                                + ' draggable=\"false\">'
                                + '</file-preview>'
                                + '</div>'
                                + '</div>';
                    $('#attachmentFileListArea1').append(tempList);
                }
            }
        }
    }
}

function revivedMail() {

    document.forms[0].CMD.value='revivedData';
    var paramStr = "";
    getSidEscape();
    var processTemp = document.forms[0].sml010ProcMode.value;
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml030.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                revivedMailPop(data);
            }
        } else {
            alert(msglist_sml010["sml.206"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.206"]);
    });
    document.forms[0].sml010ProcMode.value = processTemp;
}

function dorevivedMail() {

    document.forms[0].CMD.value='revivedOkData';
    var paramStr = "";
    paramStr += getFormData($('#smlForm'));

    $.ajax({
        async: true,
        url:  "../smail/sml030.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {
            if (data.messageList != null && data.messageList.length > 0) {
                $("#toastMessageBody").html("").append(data.messageList[0]);
                displayToast("sml010MessageToast");
                $('.js_mailCloseBtnMini').click();
            }
        } else {
            alert(msglist_sml010["sml.206"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.206"]);
    });
}

function expMailPop(data, kbn) {

    var widthStr = 650;
    var heightStr = 'auto';

    $('#delMailMsgArea').html("");

    for (t = 0; t < data.messageList.length; t++) {
        var titleMsg = data.messageList[t];
        $('#delMailMsgArea').append(titleMsg);
    }

    $('#delMailMsgPop').dialog({
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
            text:msglist_sml010["cmn.ok"],
            click: function() {
                $(this).dialog('close');

                if (kbn == 1) {
                    doExportByPdfMail();
                } else if (kbn == 2) {
                    doExportByEmlMail();
                }

            }
        },{
            text:msglist_sml010["cmn.cancel"],
            click:  function() {
                $(this).dialog('close');
            }
        }]
    });
    $('#delScrollArea').scrollTop(0);
}

function expMailSearchPop(data, kbn) {

    var widthStr = 650;
    var heightStr = 'auto';

    $('#delMailMsgArea').html("");

    for (t = 0; t < data.messageList.length; t++) {
        var titleMsg = data.messageList[t];
        $('#delMailMsgArea').append(titleMsg);
    }

    $('#delMailMsgPop').dialog({
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
                    text:msglist_sml010["cmn.ok"],
                    click: function() {
                $(this).dialog('close');

                if (kbn == 1) {
                    doExportByPdfSearchMail();
                } else if (kbn == 2) {
                    doExportByEmlSearchMail();
                }

            }
        },{
                text:msglist_sml010["cmn.cancel"],
                click:  function() {
                $(this).dialog('close');
            }
        }]
    });
    $('#delScrollArea').scrollTop(0);
}

function readKbnMailPop(data, kbn) {

    var widthStr = 650;
    var heightStr = 'auto';

    $('#delMailMsgArea').html("");

    for (t = 0; t < data.messageList.length; t++) {
        var titleMsg = data.messageList[t];
        $('#delMailMsgArea').append(titleMsg);
    }

    $('#delMailMsgPop').dialog({
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
                    text:msglist_sml010["cmn.ok"],
                    click: function() {
                $(this).dialog('close');
                var checked = false;
                $('input:checkbox[name=sml010DelSid]:checked').each(function(){
                    checked = true;
                });
                if (!checked) {
                    messagePop(msglist_sml010['sml.sml010.13'], 400, 'auto');
                    return;
                }

                if (kbn == 1) {
                    doKidokuMail();
                } else if (kbn == 2) {
                    doMidokuMail();
                }

            }
        },{
            text:msglist_sml010["cmn.cancel"],
            click:  function() {
                $(this).dialog('close');
            }
        }]
    });
    $('#delScrollArea').scrollTop(0);
}

function readKbnSearchMailPop(data, kbn) {

    var widthStr = 650;
    var heightStr = 'auto';

    $('#delMailMsgArea').html("");

    for (t = 0; t < data.messageList.length; t++) {
        var titleMsg = data.messageList[t];
        $('#delMailMsgArea').append(titleMsg);
    }

    $('#delMailMsgPop').dialog({
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
            text:msglist_sml010["cmn.ok"],
            click: function() {
                $(this).dialog('close');
                var checked = false;
                $('input:checkbox[name=sml090DelSid]:checked').each(function(){
                    checked = true;
                });
                if (!checked) {
                    messagePop(msglist_sml010['sml.sml010.13'], 400, 'auto');
                    return;
                }

                if (kbn == 1) {
                    doKidokuSearchMail();
                } else if (kbn == 2) {
                    doMidokuSearchMail();
                }

            }
        },{
                text:msglist_sml010["cmn.cancel"],
                click:  function() {
                $(this).dialog('close');
            }
        }]
    });
    $('#delScrollArea').scrollTop(0);
}


function deleteMailPop(data, delkbn) {

    var widthStr = 650;
    var heightStr = 'auto';

    $('#delMailMsgArea').html("");

    for (t = 0; t < data.messageList.length; t++) {
        var titleMsg = data.messageList[t];
        $('#delMailMsgArea').append(titleMsg);
    }
    $('#delMailMsgPop').dialog({
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
            text:msglist_sml010["cmn.ok"],
            click:  function() {

                $(this).dialog('close');
                if (delkbn == 0) {
                    doDeleteMail();
                } else if (delkbn == 1) {
                    doDeleteMailAll();
                } else if (delkbn == 2) {
                    doDeleteListMail();
                } else if (delkbn == 3) {
                    doRevivedListMail();
                } else if (delkbn == 4) {
                    doEmptyTrash();
                } else if (delkbn == 5) {
                    doDeleteSearchListMail();
                }

            }
        },{
                text:msglist_sml010["cmn.cancel"],
                click:  function() {
                $(this).dialog('close');
            }
        }]
    });
    $('#delScrollArea').scrollTop(0);
}


function deleteSokoMailPop(data) {

    var widthStr = 400;
    var heightStr = 'auto';

    $('#delMailMsgArea').html("");

    if(data.messageList[0].length > 70) {
        var widthStr = 600;
    }

    for (t = 0; t < data.messageList.length; t++) {
        var titleMsg = data.messageList[t];
        $('#delMailMsgArea').append(titleMsg);
    }

    $('#delMailMsgPop').dialog({
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
            text:msglist_sml010["cmn.ok"],
            click: function() {
                doDeleteSokoMail();
                $(this).dialog('close');
            }
        },{
                text:msglist_sml010["cmn.cancel"],
                click: function() {
                $(this).dialog('close');
            }
        }]
    });
    $('#delScrollArea').scrollTop(0);
}


function revivedMailPop(data) {

    var widthStr = 400;
    var heightStr = 'auto';

    $('#revivedMailMsgArea').html("");

    for (t = 0; t < data.messageList.length; t++) {
        var titleMsg = data.messageList[t];
        $('#revivedMailMsgArea').append(titleMsg);
    }

    $('#revivedMailPop').dialog({
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
            text:msglist_sml010["cmn.ok"],
            click:  function() {
                dorevivedMail();
                $(this).dialog('close');
            }
        },{
                text:msglist_sml010["cmn.cancel"],
                click: function() {
                $(this).dialog('close');
            }
        }]
    });

}

function messagePop(msg, dialogWidth, dialogHeight) {

    $('#messageArea').html("");
    $('#messageArea').append(msg);
    $('#messagePop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: dialogHeight,
        width: dialogWidth,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
            text:msglist_sml010["cmn.ok"],
            click: function() {
                $(this).dialog('close');
                $('#errorMsgArea').html("");
            }
        }]
    });
}

function popHinaSelDsp() {

    paramStr = 'CMD=hinaCheck&sml020SendAccount='
        +   $("#send_account_comb_box").val();
    paramStr += '&smlViewAccount=' + document.forms[0].smlViewAccount.value;

    $.ajax({
        async: true,
        url:"../smail/sml020.do",
        type: "post",
        data: paramStr
    }).done(function( data ) {
        if (data["success"]) {

            try {
                if (data.errorsList != null && data.errorsList.length > 0) {
                    var dialogWidth = 350;
                    var dialogHeight = 'auto';
                    var errorMsg = "";
                    for (e = 0; e < data.errorsList.length; e++) {
                        errorMsg += "<div class=\"cl_fontWarn errorMsgStr\">" + data.errorsList[e] + "</div>";
                        dialogWidth = 630;
                    }
                    messagePop(errorMsg, dialogWidth, dialogHeight);
                } else {
                    $('#hinagata_pop').dialog({
                        dialogClass:"fs_13",
                        autoOpen: true,  // hide dialog
                        bgiframe: true,   // for IE6
                        resizable: false,
                        height: 'auto',
                        width: 650,
                        modal: true,
                        title: msglist_sml010['sml.sml010.19'],
                        overlay: {
                            backgroundColor: '#000000',
                            opacity: 0.5
                        },
                        buttons: [{
                            text:msglist_sml010["cmn.close"],
                            click: function() {
                                $(this).dialog('close');
                            }
                        }]
                    });

                    $('#hinagata_scroll').scrollTop(0);
                }
            } catch (ae) {
                alert(msglist_sml010["sml.197"]);
            }
        } else {
            alert(msglist_sml010["sml.197"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.197"]);
    });
}

/*読み込み中ダイアログ*/
function loadingPop(popTxt) {

    $('#loading_pop').dialog({
        dialogClass:"fs_13",
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 130,
        width: 250,
        modal: true,
        title: popTxt,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },

    });

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

function contextRead(kbn, elm) {

    try {
        contextReadPop(kbn, "", $(elm).data('smlsid'));
    } catch (ae) {
        alert(ae);
    }

}

function contextReadPop(kbn, title, mSid) {

    doContextRead(kbn, mSid);

}

function contextAllRead(kbn) {

    $('#allReadMsgArea').html("");

    if (kbn == 0) {
        $('#allReadMsgArea').append(msglist_sml010['sml.sml010.14']);
    } else {
        $('#allReadMsgArea').append(msglist_sml010['sml.sml010.11']);
    }


    $('#contextAllReadPop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 'auto',
        width: 450,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
                text:msglist_sml010["cmn.ok"],
                click: function() {
                    $(this).dialog('close');
                    doContextAllRead(kbn);
                }
            },{
                text:msglist_sml010["cmn.cancel"],
                click: function() {
                    $(this).dialog('close');
                }
            }]
    });

}

function doContextRead(kbn, smlSid) {

    var cmdStr = "read";
    var msgPopStr = msglist_sml010['sml.sml010.15'];
    var msg = msglist_sml010["sml.202"];
    if (kbn != 0) {
        cmdStr = "noRead";
        msgPopStr = msglist_sml010['sml.sml010.16'];
        msg = msglist_sml010["sml.203"];
    }

    try {

        loadingPop("");

        document.forms[0].CMD.value=cmdStr;
        document.forms[0].sml010SelectedSid.value=smlSid;
        var paramStr = "";
        paramStr += getFormData($('#smlForm'));

        $.ajax({
            async: true,
            url:  "../smail/sml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                closeloading();
                reloadData();
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


function doContextAllRead(kbn) {

    var cmdStr = "allRead";
    var msgPopStr = msglist_sml010['sml.sml010.17'];
    var msg = msglist_sml010["sml.202"];
    if (kbn != 0) {
        cmdStr = "allNoRead";
        msgPopStr = msglist_sml010['sml.sml010.18'];
        msg = msglist_sml010["sml.203"];
    }

    try {

        loadingPop("");

        document.forms[0].CMD.value=cmdStr;
        var paramStr = "";
        paramStr += getFormData($('#smlForm'));

        $.ajax({
            async: true,
            url:  "../smail/sml010.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data["success"]) {
                closeloading();
                $("#toastMessageBody").html("").append(msgPopStr);
                displayToast("sml010MessageToast");
                $('#errorMsgArea').html("");
                reloadData();
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


function readPop(msg, width, height) {

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
            text:msglist_sml010["cmn.ok"],
            click:  function() {
                    $(this).dialog('close');
                    $('#errorMsgArea').html("");
                    reloadData();
                }
        }]
    });
}

function resetParam() {
    $('input:hidden[name=sml010ProcMode]').val(0);
    $('input:hidden[name=sml010Sort_key]').val(3);
    $('input:hidden[name=sml010Order_key]').val(1);
    $('input:hidden[name=sml010PageNum]').val(1);
    $('input:hidden[name=sml010SelectedSid]').val(0);
    $('input:hidden[name=sml010SelectedSid]').val(0);
    $('input:hidden[name=sml010SelectedMailKbn]').val("");
    $('input:hidden[name=sml010scriptSelUsrSid]').val("");
    $('input:hidden[name=sml010scriptSelUsrName]').val("");
    $('input:hidden[name=sml010usrSid]').val(0);
    $('input:hidden[name=sml010scriptFlg]').val(0);
    $('input:hidden[name=sml010scriptKbn]').val(0);
    $('input:hidden[name=sml050HinaKbn]').val(0);
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

function checkSearchKeyword() {

    document.forms[0].CMD.value='smlCkeckKeyword';

    //フォームデータ成形
    var formData = "";
    formData += getFormData($('#smlForm'));

    //データ取得
    $.ajax({
        async: true,
        url:"../smail/sml090.do",
        type: "post",
        data:formData
    }).done(function( data ) {
        if (data["success"]) {
            if (data.errorsList != null && data.errorsList.length > 0) {
                var dialogWidth = 350;
                var dialogHeight = 'auto';
                var errorMsg = "";
                for (e = 0; e < data.errorsList.length; e++) {
                    errorMsg += "<div class=\"js_errorMsgStr cl_fontWarn errorMsgStr\">" + data.errorsList[e] + "</div>";
                    if (data.errorsList[e].length > 30) {
                        dialogWidth = 630;
                    }
                }

                messagePop(errorMsg, dialogWidth, dialogHeight);

            } else {
                document.forms[0].CMD.value='smlSearchData';
                getSearchData();
            }
        } else {
            alert(msglist_sml010["sml.211"]);
        }
    }).fail(function(data){
        alert(msglist_sml010["sml.211"]);
    });
}

function resetSid() {
    //一通りの処理終了後に不要なSIDを保持しているとエラーのもとになるためリセット
    document.forms[0].sml010EditSid.value = 0;
    document.forms[0].sml010SelectedSid.value = 0;
}

function getSidEscape() {

    //モードを一時的に詳細メールのモードに戻す
    document.forms[0].sml010ProcMode.value = document.forms[0].processEsc.value;

    //退避していた詳細メールのSIDを取得する
    var selectedSid = document.forms[0].selectEsc.value;
    var editSid = document.forms[0].editEsc.value;
    if (selectedSid != 0) {
        editSid = selectedSid;
    } else if (editSid != 0){
        selectedSid = editSid;
    }

    //草稿モード且つ次へボタンクリック = 事前に開いていた詳細メールのボタンクリック
    //事前に退避していた詳細メールのSIDを取得する
    if (selectedSid != 0 && editSid != 0) {
        document.forms[0].sml010SelectedSid.value = selectedSid;
        document.forms[0].sml010EditSid.value = editSid;
    }

}

var editorBeforeUnloadManager = {
    isOpenEditor : false,
    isTemporary : false,
    /**
     * メール作成画面を開いている間のonUnload時に警告を行うイベントリスナー関数
     * アラートに表示するメッセージを変更する
     * ieとEdge以外はブラウザの仕様で現在はメッセージの変更はできない
     * @returns {}
     */
    unload : function (e) {
        if (editorBeforeUnloadManager.isTemporary) {
            editorBeforeUnloadManager.isTemporary = false;
            return;
        } else {
            var mes = msglist_sml010['sml.js.1'];
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

function sml010delNewCreateMailDialog() {
    if (editorBeforeUnloadManager.isOpenEditor) {
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
            buttons:[{
                    text:msglist_sml010["cmn.ok"],
                    click:  function() {
                        $(this).dialog('close');
                        resetParam();
                        editorBeforeUnloadManager.off();
                        window.parent.webmailEntrySubWindowClose();
                    }
                },{
                    text:msglist_sml010["cmn.cancel"],
                    click:  function() {
                        $(this).dialog('close');
                    }
                }]
        });
    } else {
        editorBeforeUnloadManager.off();
        window.parent.webmailEntrySubWindowClose();
    }
}

function sml010getCloseFlg() {
    if (typeof editorBeforeUnloadManager.isOpenEditor == 'undefined') {
        return false;
    }
    return editorBeforeUnloadManager.isOpenEditor;
}

function warning_alert() {
    editorBeforeUnloadManager.onTemporary();

    $('#warningPop').dialog({
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
                text:msglist_sml010["cmn.ok"],
                click: function() {
                    window.parent.callSmailWindowClose();
                }
            },
            {
                text:msglist_sml010["cmn.cancel"],
                click: function() {
                    editorBeforeUnloadManager.offTemporary();
                    $(this).dialog('close');
                }
            }
        ]
    });
}

function cmn110DropBan() {
    if (!$("#mail_create_tab").length) {
        return true
    }

    if ($('body').find('div').hasClass('ui-widget-overlay')) {
        return true;
    }
    return $("#mail_create_tab").hasClass("tabHeader_tab-off");
}

function setContentInsertArea() {
    $('#smlComposeBodyContent').empty();
    $('#attachmentFileErrorArea2').empty();
    $('#smlAttachmentIdArea').empty();

    const smlMailBodyType = $('input:hidden[name=sml020MailType]').val();

    if (smlMailBodyType == 1) {
        $('#smlAttachmentIdArea').append('<input type="hidden" name="attachment_ID_list" value="2">');

        $('#smlComposeBodyContent').append(
            '<input type=\"hidden\" name=\"attachmentFileListFlg2\" value=\"false\" />'
            + '<input type=\"hidden\" name=\"attachmentMode2\" value=\"7\" />'
            + '<input type=\"hidden\" name=\"attachmentPluginId2\" value=\"smail\" />'
            + '<input type=\"hidden\" name=\"attachmentTempDirId2\" value=\"sml020\" />'
            + '<input type=\"hidden\" name=\"attachmentTempDirPlus2\" value=\"bodyFile\" />'
        );
    }

    resetAttachmentDropArea();
}

function getTinymceContentsSrc(tempSaveName) {
    return 'sml020.do?CMD=getBodyFile&sml020TempSaveId=' + tempSaveName;
}
