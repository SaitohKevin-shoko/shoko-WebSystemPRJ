var proxValue = 0;
var addFlg = false;

function buttonPush(cmd){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function change030GroupCombo(){
    $("input[name=ntp030SelectUsrSid]").val('');
    document.forms[0].submit();
    return false;
}

function addNippou(cmd, ymd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectDate.value=ymd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}

function editNippou(cmd, ymd, sid, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectDate.value=ymd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].ntp010NipSid.value=sid;
    document.forms[0].submit();
    return false;
}

function moveMonthNippou(cmd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}

function moveCreateMsg(cmd, uid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=ukbn;
    document.forms[0].submit();
    return false;
}

var subWindow;
var flagSubWindow = false;

function windowClose(){
    if(subWindow != null){
        subWindow.close();
    }
}

function afterNewWinOpen(win){
    win.moveTo(0,0);
    subWindow.focus();
    return;
}

function setZaiseki(uid){
    document.forms[0].CMD.value='ntp030Zaiseki';
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].submit();
    return false;
}

function setFuzai(uid){
    document.forms[0].CMD.value='ntp030Fuzai';
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].submit();
    return false;
}

function setSonota(uid){
    document.forms[0].CMD.value='ntp030Sonota';
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].submit();
    return false;
}
function moveListNippou(cmd){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectUsrKbn.value=0;
    document.forms[0].submit();
    return false;
}
function keyPress(keycode) {
    if (keycode == 13) {
        document.forms[0].CMD.value='search';
        document.forms[0].submit();
        return false;
    }
}


$(function() {

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

    /* 案件履歴選択 */
    $(".js_ankenListClick").live("click", function(){
        var ankenSid = $(this).attr('id');
        document.forms[0].cmd.value='add';
        document.forms[0].CMD.value='add';
        document.forms[0].ntp010HistoryAnkenSid.value=ankenSid;
        document.forms[0].ntp010SelectUsrSid.value=$('input:hidden[name=ntp010SessionUsrId]').val();
        document.forms[0].ntp010SelectDate.value=$('input:hidden[name=ntp010DspDate]').val();
        document.forms[0].submit();
        return false;
    });

    /* 企業・顧客履歴選択 */
    $(".js_companyListClick").live("click", function(){
        var companySid = $(this).attr('id');
        var companyBaseSid = $(this).children().attr('id');
        document.forms[0].cmd.value='add';
        document.forms[0].CMD.value='add';
        document.forms[0].ntp010HistoryCompSid.value=companySid;
        document.forms[0].ntp010HistoryCompBaseSid.value=companyBaseSid;
        document.forms[0].ntp010SelectUsrSid.value=$('input:hidden[name=ntp010SessionUsrId]').val();
        document.forms[0].ntp010SelectDate.value=$('input:hidden[name=ntp010DspDate]').val();
        document.forms[0].submit();
        return false;
    });

    /* IE6用 日付選択固定*/
    $('#time_line_fix').exFixed();

    /* ユーザ名リンク クリック */
    $(".js_ntpUsrLink").live("click", function(){
        $("input[name=ntp030SelectUsrSid]").val($(this).attr('id'));
        $("input[name=ntp010SelectUsrSid]").val($(this).attr('id'));
        document.forms[0].submit();
        return false;
    });

    /* ユーザリンク hover */
    $('.user_select_area').hover(
        function () {
            $(this).removeClass("user_select_area").addClass("user_select_area_hover");
        },
        function () {
            $(this).removeClass("user_select_area_hover").addClass("user_select_area");
        }
    );

    /* グループの日報を表示 クリック */
    $(".js_selGroupBtn").live("click", function(){
        $("input[name=ntp030SelectUsrSid]").val('');
        document.forms[0].submit();
        return false;
    });

    /* グループの日報を表示 hover */
    $('.time_line_group_btn').hover(
        function () {
            $(this).removeClass("time_line_group_btn").addClass("time_line_group_btn_hover");
        },
        function () {
            $(this).removeClass("time_line_group_btn_hover").addClass("time_line_group_btn");
        }
    );

    /* 投稿ボタン hover */
    $('.btn_base_toukou').live({
        mouseenter:function () {
            $(this).addClass("btn_base_toukou_hover");
        },
        mouseleave:function () {
            $(this).removeClass("btn_base_toukou_hover");
        }
    });


    /* コメントするボタン */
    var cmtClickFlg = 0;
    $(".js_commentBtn").live("click", function(){
        var cmtNtpSid = $(this).attr("id");
        var cmtId = "";
        if (cmtNtpSid != null && cmtNtpSid != "") {
            cmtId = "_" + cmtNtpSid;
        }
        var commentStr = $("textarea[name=ntp030Comment" + cmtId + "]").val();

        if (!commentStr.match(/\S/g)) {
            //何も入力されていない場合はメッセージを表示する
            $('#commentError').dialog('open');
            $('#commentError').dialog({
                autoOpen: true,
                bgiframe: true,
                resizable: false,
                width:300,
                height: 160,
                modal: true,
                closeOnEscape: false,
                overlay: {
                    backgroundColor: '#000000',
                    opacity: 0.5
                },
                buttons: {
                    OK: function() {
                        $(this).dialog('close');
                    }
                }
            });
        } else if (commentStr.length > 1000) {
            //1000文字を超えていた場合
            $('#commentLengthError').dialog('open');
            $('#commentLengthError').dialog({
                autoOpen: true,
                bgiframe: true,
                resizable: false,
                width:410,
                modal: true,
                closeOnEscape: false,
                overlay: {
                    backgroundColor: '#000000',
                    opacity: 0.5
                },
                buttons: {
                    OK: function() {
                        $(this).dialog('close');
                    }
                }
            });
        } else {
            commentStr = encodeURIComponent(commentStr);
            var commentNtpSid = $(this).attr("id");

            //コメント送信,最新データ取得,画面書き換え
            $.ajaxSetup({async:false});
            $.post('../nippou/ntp030.do', { "cmd":"addComment",
                                            "CMD":"addComment",
                                            "commentNtpSid":commentNtpSid,
                                            "commentStr":commentStr},
            function(data) {
                if (data != null || data != "") {
                    setComment(commentNtpSid, data);
                }
            });
        }
    });

    /* コメントテキストエリア フォーカス時*/
    $(".js_commentTextArea").live("focus", function(){
        $(this).animate({ height:"60px"}, 500);
    }).live("blur", function(){
        $(this).animate({ height:"20px"}, 500);
    });


    /* コメント削除リンク */
    $(".commentDel").live("click", function(){
        delCmtNtpId = $(this);
        $('#dialogCommentDel').dialog('open');
    });


    /* コメント削除確認 */
    $('#dialogCommentDel').dialog({
        autoOpen: false,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 160,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            OK: function() {

                //コメント送信,最新データ取得,画面書き換え
                $.ajaxSetup({async:false});
                $.post('../nippou/ntp030.do', { "cmd":"delComment",
                                                "CMD":"delComment",
                                                "commentNtpSid":delCmtNtpId.attr("id")
                                                },
                function(data) {

                });

                //行削除
                $(".js_commentArea_" + delCmtNtpId.attr("id")).remove();
                $(this).dialog('close');
            },
            Cancel: function() {
                $(this).dialog('close');
            }
        }
    });

    /* いいねボタン */
    $(".js_goodLink").live("click", function(){

        var goodNtpSid = $(this).attr('id');

        //いいねをしているか確認
        $.ajaxSetup({async:false});
        $.post('../nippou/ntp030.do', { "cmd":"addGood",
                                        "CMD":"addGood",
                                        "goodNtpSid":goodNtpSid},
        function(data) {
            if (data != null || data != "") {
                if (data.cnt > 0) {
                    //すでに「いいね」していた場合
                    $('#goodError').dialog({
                    autoOpen: true,
                    bgiframe: true,
                    resizable: false,
                    width:350,
                    modal: true,
                    closeOnEscape: false,
                    overlay: {
                        backgroundColor: '#000000',
                        opacity: 0.5
                    },
                    buttons: {
                        OK: function() {
                                $(this).dialog('close');
                            }
                        }
                    });
                } else {
                    //いいね登録、最新データ取得
                    $.ajaxSetup({async:false});
                    $.post('../nippou/ntp030.do', {
                                    "cmd":"commitGood",
                                    "CMD":"commitGood",
                                    "goodNtpSid":goodNtpSid},
                        function(gdata) {
                            if (gdata != null || gdata != "") {
                                //いいね数の書き換え
                                $('.js_goodBtnArea_' + goodNtpSid).html("<span class=\"fs_12 fw_b\">いいね!しています</span>");
                                $('.js_goodCount_' + goodNtpSid).html(gdata.cnt);
                                $('.js_goodCount_' + goodNtpSid).parent().data("count", gdata.cnt);
                            }
                        });
                    $(this).dialog('close');
                }
            }
        });
    });

    /* いいねしてる人リンク */
    $(".js_textGood").live("click", function(){
        var thisEle = $(this);
        var goodAddNtpSid = $(this).attr('id');
        var ntpGoodCnt = $(this).data("count");
        if (ntpGoodCnt != 0) {
            $.ajaxSetup({async:false});
            $.post('../nippou/ntp030.do', {
                            "cmd":"goodAddUser",
                            "CMD":"goodAddUser",
                            "goodAddNtpSid":goodAddNtpSid},
                function(gudata) {
                    if (gudata != null || gudata != "") {
                        if (gudata.length > 0) {
                            var goodAddUsrInfstr = "";
                            for (u=0; u<gudata.length; u++) {
                                //imgタグ文字列
                                var goodAddUsrImgStr = "";
                                if (gudata[u].usrMdl.binSid == "0") {
                                    if (gudata[u].usrMdl.usiPictKf == "0") {
                                        //写真なし 公開
                                        goodAddUsrImgStr += "<img class=\"classic-display wp50\" src=\"../common/images/classic/icon_photo.gif\" name=\"pitctImage\" alt=\"写真\">"
                                            +  "<img class=\"original-display wp50\" src=\"../common/images/original/photo.png\" name=\"pitctImage\" alt=\"写真\">";
                                    } else {
                                        //写真なし 非公開
                                        goodAddUsrImgStr += "<div class=\"hikokai_photo-m txt_c\"><span class=\"cl_fontWarn\">非公開</span></div>";
                                    }
                                } else {
                                    if (gudata[u].usrMdl.usiPictKf == "0") {
                                        //写真あり 公開
                                        goodAddUsrImgStr += "<img class=\"wp50\" src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid="
                                            +  gudata[u].usrMdl.binSid + "\""
                                            +  " alt=\"写真\">";
                                    } else {
                                        //写真あり 非公開
                                        goodAddUsrImgStr += "<div class=\"hikokai_photo-m txt_c\"><span class=\"cl_fontWarn\">非公開</span></div>";
                                    }
                                }

                                //imgタグ文字列
                                var goodDelStr = "";
                                if (gudata[u].goodDelFlg == 1) {
                                    goodDelStr = "いいね!を取り消す";
                                }
                                var mukoUserClass = "";
                                if (gudata[u].usrMdl.usrUkoFlg == 1) {
                                    mukoUserClass = "mukoUser";
                                }

                                goodAddUsrInfstr    += "<table class=\"w100 borC_light bor_b1\">"
                                                    +    "<tbody>"
                                                    +      "<tr>"
                                                    +        "<td>"
                                                    +          "<a href=\"#!\" onclick=\"return openUserInfoWindow(" + gudata[u].usrMdl.usrSid + ");\">"
                                                    +            goodAddUsrImgStr
                                                    +          "</a>"
                                                    +        "</td>"
                                                    +        "<td class=\"w100\">"
                                                    +          "<span class=\"cl_linkDef " + mukoUserClass + "\">"
                                                    +            "<a href=\"#!\" onclick=\"return openUserInfoWindow(" + gudata[u].usrMdl.usrSid + ");\">" + gudata[u].usrMdl.usiSei + "&nbsp;&nbsp;" + gudata[u].usrMdl.usiMei + "</a>"
                                                    +          "</span>"
                                                    +          "<span class=\"flo_r cl_linkDef goodDelLink cursor_p\" id=\"" + goodAddNtpSid + "\">"
                                                    +            goodDelStr
                                                    +          "</span>"
                                                    +        "</td>"
                                                    +      "</tr>"
                                                    +    "</tbody>"
                                                    +  "</table>";
                            }
                            $("#goodUsrInfArea2").append(goodAddUsrInfstr);
                        }

                        $("#goodUsrInfArea").css("top",thisEle.offset().top - 200);
                        $("#goodUsrInfArea")[0].style.display="block";
                        Glayer.show();
                    }
            });
        } else {
            //いいねが0だった場合
            $('#goodZero').dialog({
                autoOpen: true,
                bgiframe: true,
                resizable: false,
                width:450,
                modal: true,
                closeOnEscape: false,
                overlay: {
                    backgroundColor: '#000000',
                    opacity: 0.5
                },
                buttons: {
                    OK: function() {
                        $(this).dialog('close');
                    }
                }
            });
        }
    });

    //いいね追加ユーザポップアップ閉じる
    $("#goodAddUsrClose").live("click", function(){
        Glayer.hide();
        $("#goodUsrInfArea")[0].style.display="none";
        $("#goodUsrInfArea2").html("");
    });

    //いいね取り消し
    $(".goodDelLink").live("click", function(){

        var goodNtpSid = $(this).attr('id');

        //いいね取り消し、最新データ取得
        $.ajaxSetup({async:false});
        $.post('../nippou/ntp030.do', {
                        "cmd":"deleteGood",
                        "CMD":"deleteGood",
                        "goodNtpSid":goodNtpSid},
            function(gdata) {
                if (gdata != null || gdata != "") {
                   //いいね数の書き換え
                    $('.js_goodBtnArea_' + goodNtpSid).html("<button type=\"button\" id=\"" + goodNtpSid + "\""
                            + "class=\"ntp_goodButton js_goodLink\" value=\"いいね!\">"
                            + "いいね!</button>");
                    $('.js_goodCount_' + goodNtpSid).html(gdata.cnt);
                    $('.js_goodCount_' + goodNtpSid).parent().data("count", gdata.cnt);
                }
            });

        Glayer.hide();
        $("#goodUsrInfArea")[0].style.display="none";
        $("#goodUsrInfArea2").html("");
    });

    proxValue = $('body').height() - $('.js_timeLine').offset().top  - $('.js_timeLine').height();
    proxValue = proxValue / $('body').height();

    //ヘッダーの日付選択表示判定
    $(window).scroll(function () {
        var pageTopArea = $('#pageTopArea'),
        offset = pageTopArea.offset();

        if($(window).scrollTop() > offset.top + 200) {
            $("#time_line_fix").removeClass('display_n');
        } else {
            $("#time_line_fix").addClass('display_n');
        }

        scrollPosition = $(window).height() + $(window).scrollTop();
        if ((($(document).height() - scrollPosition) / $(document).height()) <= proxValue) {
            if (!addFlg) {
                addFlg = true;
                addTimeline();
            }
        }
    });

    /* TOPボタンクリック*/
    $("#scTop").live("click", function(){
        $('html,body').animate({ scrollTop:0 }, 'normal');
    });


    /* 日付スクロール位置イベント */
    $('.js_dataDateArea').waypoint(function() {
        var scldata = $(this).attr('id');
        var sclOpDate = scldata.substring(0,8);
        var sel = document.getElementById("select_fix_date");

        var writeFlg = 0;

        if (sel.length == 0) {
            $('#select_fix_date').append($('<option>').html(sclOpDate).val(sclOpDate));
        } else {
            for (var op = 0; op < sel.length; op++) {
                if (sel.options[op].text == sclOpDate) {
                    writeFlg = 1;
                }
            }
            if (writeFlg == 0) {
                $('#select_fix_date').append($('<option>').html(sclOpDate).val(sclOpDate));
            }
        }
        writeFlg = 0;

        $('#select_fix_date').val(sclOpDate);

    });

    //案件名クリック
    $(".anken_click").live("click", function(){
        var ankenSid = $(this).attr("id");
        openSubWindow("../nippou/ntp210.do?ntp210NanSid=" + ankenSid);
    });

    //企業名クリック
    $(".comp_click").live("click", function(){
        var compSid = $(this).attr("id");
        openSubWindow("../address/adr250.do?adr250AcoSid=" + compSid);
    });

    //日付選択を隠す(IE対応)
    $("#time_line_fix").addClass('display_n');

    /* 再読み込み時はページの先頭を表示 */
    $('html,body').animate({ scrollTop: 0 }, 'normal');

});

//編集ボタン
function editNippou(cmd, sid, uid){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010SelectUsrSid.value=uid;
    document.forms[0].ntp010SelectUsrKbn.value=0;
    document.forms[0].ntp010NipSid.value=sid;
    document.forms[0].submit();
    return false;
}

/* コメント 再表示 */
function selConbChange(){
    var selComVal = "#position_" + $('#select_fix_date').val();
    $('html,body').animate({scrollTop: $(selComVal).offset().top - 60},'slow');
}

/* コメント 再表示 */
function setComment(ntpSid, cmtdata){

    if (cmtdata.length > 0) {
        $(".commentDspArea" + ntpSid).remove();
        var commentStr = "";
        for (i=0; i<cmtdata.length; i++) {
            commentStr += "<table class=\"table-noBorder js_commentArea_" + cmtdata[i].commentSid + "\"><tr><td class=\"txt_t\">";

            if (cmtdata[i].commentUserBinSid == "0") {
                if (cmtdata[i].commentUsiPictKf == "0") {
                    //写真なし 公開
                    commentStr += "<img class=\"classic-display wp25\" src=\"../common/images/classic/icon_photo.gif\" name=\"pitctImage\" alt=\"写真\">"
                                + "<img class=\"original-display wp25\" src=\"../common/images/original/photo.png\" name=\"pitctImage\" alt=\"写真\">";
                } else {
                    //写真なし 非公開
                    commentStr += "<div class=\"hikokai_photo-s txt_c\"><span class=\"cl_fontWarn\">非公</span></div>";
                }
            } else {
                if (cmtdata[i].commentUsiPictKf == "0") {
                    //写真あり 公開
                    commentStr += "<img class=\"wp25\" src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid="
                                + cmtdata[i].commentUserBinSid + "\""
                                + " alt=\"写真\">";
                } else {
                    //写真あり 非公開
                    commentStr += "<div class=\"hikokai_photo-s txt_c\"><span class=\"cl_fontWarn\">非公</span></div>";
                }
            }
            commentStr += "</td><td class=\"w100\"><div>";
            var mukoUserClass = "";
            if (cmtdata[i].commentUserUkoFlg == 1) {
                mukoUserClass = "mukoUser";
            }
            commentStr += "<span class=\"" + mukoUserClass + " fw_b mr20\">" + cmtdata[i].commentUserName
                        + "</span>" + cmtdata[i].commentDate;
            if (cmtdata[i].commentDelKbn == 1) {
                commentStr += "<span class=\"commentDel cursor_p\" id=\"" + cmtdata[i].commentSid + "\">"
                            + "<img class=\"classic-display ml5\" src=\"../common/images/classic/icon_delete_2.gif\">"
                            + "<img class=\"original-display ml5\" src=\"../common/images/original/icon_delete.png\">"
                            + "</span>";
            }
            commentStr += "</div><div>" + cmtdata[i].commentValue + "</div></td></tr></table>";
        }

        //コメントテキストエリアを空にする
        $("textarea[name=ntp030Comment_"  + ntpSid + "]").val("");
        $("#ntp030DspComment_"            + ntpSid).html(commentStr);
    }
}

function fileLinkClick(ntpSid, binSid) {
    url = "../nippou/ntp030.do?CMD=fileDownload&ntp010NipSid=" + ntpSid + "&ntp030BinSid=" + binSid;
    navframe.location=url;
}

function changeGroupCombo(){
    document.forms[0].cmd.value='';
    document.forms[0].CMD.value='';
    document.forms[0].submit();
    return false;
}

function addTimeline() {
    //オフセット
    var offset        = parseInt($("input[name=ntp030Offset]").val()) + 1;
    //選択グループ
    var selGpSid      = $("select[name=ntp010DspGpSid]").val();
    //選択ユーザ
    var selUsrSid     = $("input[name=ntp030SelectUsrSid]").val();
    //セッションユーザbinSid
    var sUsrBinSid    = parseInt($("input[name=sUsrBinSid]").val());
    //セッションユーザusiPictKf
    var sUsiPictKf    = parseInt($("input[name=sUsrPictKf]").val());
    //最終表示日
    var lastLabelDate = $("input[name=ntp030LabelDate]").val();
    //ソート
    var sortLabel     = $("select[name=ntp030Sort]").val();

    //データ取得
    $.ajaxSetup({async:true});
    $.post('../nippou/ntp030.do', {"cmd":"getTimeLineData",
                                    "CMD":"getTimeLineData",
                                    "ntpOffset":offset,
                                    "ntpDspGpSid":selGpSid,
                                    "ntpSelectUsrSid":selUsrSid,
                                    "ntpSortLabel":sortLabel
                                    },
    function(data) {

        //取得したデータを画面に出力
        if (data.length > 0) {
            for (i=0; i<data.length; i++) {

                //日報ユーザ情報
                var usrInfMdl   = data[i].ntp030UsrInfMdl;
                //日報ユーザSID
                var ntpUsrSid   = data[i].ntp030UsrSid;
                //日報SID
                var dataNtpSid  = data[i].ntp030NtpSid;
                //編集可能区分
                var editAuthKbn = data[i].ntp030AuthEditKbn;
                //添付情報
                var tmpMdlList  = data[i].ntp030FileList;
                //コメント情報
                var cmtdata     = data[i].ntp030CommentList;

                //imgタグ文字列
                var imgStr = "";
                if (usrInfMdl == null) {
                    break;
                }
                if (usrInfMdl.binSid == "0") {
                    if (usrInfMdl.usiPictKf == "0") {
                        //写真なし 公開
                        imgStr += "<img class=\"classic-display wp50\" src=\"../common/images/classic/icon_photo.gif\" name=\"pitctImage\" alt=\"写真\">"
                                + "<img class=\"original-display wp50\" src=\"../common/images/original/photo.png\" name=\"pitctImage\" alt=\"写真\">";
                    } else {
                        //写真なし 非公開
                        imgStr += "<div class=\"hikokai_photo-m txt_c\"><span class=\"cl_fontWarn\">非公開</span></div>";
                    }
                } else {
                    if (usrInfMdl.usiPictKf == "0") {
                        //写真あり 公開
                        imgStr += "<img class=\"wp50\" src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid="
                                + usrInfMdl.binSid + "\""
                                + " alt=\"写真\">";
                    } else {
                        //写真あり 非公開
                        imgStr += "<div class=\"hikokai_photo-m txt_c\"><span class=\"cl_fontWarn\">非公開</span></div>";
                    }
                }

                //添付ファイル文字列
                var tmpStr = "";
                if (tmpMdlList.length > 0) {
                    for (n=0; n<tmpMdlList.length; n++) {
                        tmpStr += "<div>"
                                + '<file-preview url="../nippou/ntp030.do?CMD=fileDownload&ntp010NipSid=' + dataNtpSid + '&ntp030BinSid=' + tmpMdlList[n].binSid + '" filename="' + tmpMdlList[n].binFileName + '">'
                                + "<a href=\"#!\" onclick=\"return fileLinkClick("
                                + dataNtpSid + ","
                                + tmpMdlList[n].binSid
                                + ");\"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_temp_file_2.png\">"
                                + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_attach.png\">"
                                + tmpMdlList[n].binFileName + tmpMdlList[n].binFileSizeDsp
                                + "</a>"
                                + "</file-preview>"
                                + "</div>";
                    }
                }

                var sUsrBinSid = $("input[name=sUsrBinSid]").val();
                //セッションユーザusiPictKf
                var sUsiPictKf = $("input[name=sUsrPictKf]").val();
                //コメント文字列
                var commentStr = "";
                if (cmtdata.length > 0) {
                    for (j=0; j<cmtdata.length; j++) {

                        var cmtUsrMdl = cmtdata[j].ntp030UsrInfMdl;
                        var cmtMdl    = cmtdata[j].ntp030CommentMdl;

                        commentStr += "<table class=\"table-noBorder js_commentArea_"
                                    + cmtMdl.npcSid
                                    + "\"><tbody><tr><td class=\"txt_t\">";

                        if (cmtUsrMdl.binSid == "0") {
                            if (cmtUsrMdl.usiPictKf == "0") {
                                //写真なし 公開
                                commentStr += "<img class=\"classic-display wp25\" src=\"../common/images/classic/icon_photo.gif\" name=\"pitctImage\" alt=\"写真\">"
                                            + "<img class=\"original-display wp25\" src=\"../common/images/original/photo.png\" name=\"pitctImage\" alt=\"写真\">";
                            } else {
                                //写真なし 非公開
                                commentStr += "<div class=\"hikokai_photo-s txt_c\"><span class=\"cl_fontWarn\">非公</span></div>";
                            }
                        } else {
                            if (cmtUsrMdl.usiPictKf == "0") {
                                //写真あり 公開
                                commentStr += "<img class=\"wp25\" src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid="
                                            + cmtUsrMdl.binSid + "\""
                                            + " alt=\"写真\">";
                            } else {
                                //写真あり 非公開
                                commentStr += "<div class=\"hikokai_photo-s txt_c\"><span class=\"cl_fontWarn\">非公</span></div>";
                            }
                        }

                        //削除
                        var delComStr = "";
                        if (cmtdata[j].ntp030CommentDelFlg == 1) {
                            delComStr = "<span class=\"commentDel cursor_p\" id=\""
                            +  cmtMdl.npcSid
                            +  "\"><img class=\"btn_classicImg-display ml5\" src=\"../common/images/classic/icon_delete_2.gif\">"
                            +  "<img class=\"btn_originalImg-display ml5\" src=\"../common/images/original/icon_delete.png\"></span>";
                        }
                        var cmtUsermukoClass = "";
                        if (cmtUsrMdl.usrUkoFlg == 1) {
                            cmtUsermukoClass = "mukoUser";
                        }

                        commentStr += "</td><td class=\"w100\"><div><span class=\"" + cmtUsermukoClass + " fw_b mr20\">"
                                    + cmtUsrMdl.usiSei + "&nbsp;" + cmtUsrMdl.usiMei
                                    + "</span>"
                                    + cmtdata[j].ntp030CommentDate
                                    + delComStr
                                    + "</div><div>"
                                    + cmtMdl.npcComment
                                    + "</div></td></tr></tbody></table>";
                    }
                }

                //コメント入力エリア文字列
                var cmtAddAreaStr = "";

                cmtAddAreaStr = "<div>";
                if (data[i].ankenViewable == true) {
                    cmtAddAreaStr+="<table class=\"table-noBorder\">"
                                +     "<tbody><tr><td>";

                            if (sUsrBinSid == "0") {
                                if (sUsiPictKf == "0") {
                                      //写真なし 公開
                                    cmtAddAreaStr  += "<img class=\"classic-display wp25\" src=\"../common/images/classic/icon_photo.gif\" name=\"pitctImage\" alt=\"写真\">"
                                                    + "<img class=\"original-display wp25\" src=\"../common/images/original/photo.png\" name=\"pitctImage\" alt=\"写真\">";
                                } else {
                                      //写真なし 非公開
                                    cmtAddAreaStr += "<div class=\"hikokai_photo-s txt_c\"><span class=\"cl_fontWarn\">非公</span></div>";
                                }
                            } else {
                                if (sUsiPictKf == "0") {
                                      //写真あり 公開
                                    cmtAddAreaStr += "<img class=\"wp25\" src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid="
                                                    + sUsrBinSid + "\""
                                                    + " alt=\"写真\">";
                                } else {
                                      //写真あり 非公開
                                    cmtAddAreaStr += "<div class=\"hikokai_photo-s txt_c\"><span class=\"cl_fontWarn\">非公</span></div>";
                                }
                            }
                cmtAddAreaStr += "</td>"
                                +  "<td class=\"w100\">"
                                +   "<div class=\"textfield verAlignMid w100\">"
                                +    "<label class=\"js_ntp_labelArea ntp_labelArea cl_fontWeek\" for=\"field_id" + dataNtpSid + "\">コメントする</label>"
                                +    "<textarea name=\"ntp030Comment_" + dataNtpSid + "\" rows=\"1\" class=\"w100 js_commentTextArea\" id=\"field_id" + dataNtpSid + "\"></textarea>"
                                +   "</div>"
                                +   "</td>"
                                +  "<td class=\"no_w\">"
                                +    "<button type=\"button\" class=\"baseBtn js_commentBtn\" value=\"投稿\" id=\"" + dataNtpSid + "\">投稿</button>"
                                +  "</td>"
                                +"</tr></tbody>"
                                +"</table>"
                }
                cmtAddAreaStr += "</div>";

                //コメント表示欄
                var cmtDspAreaStr = "";
                if (data[i].ankenViewable == true) {
                    cmtDspAreaStr = "<tr class=\"bgC_body\">"
                    +                 "<td class=\"border_right_none\">"
                    +                 "</td>"
                    +                 "<td class=\"border_left_none\">"
                    +                   "<div id=\"ntp030DspComment_" + dataNtpSid + "\">"
                    +                     "<span class=\"commentDspArea" + dataNtpSid + "\">"
                    +                       commentStr
                    +                     "</span>"
                    +                   "</div>"
                    +                   cmtAddAreaStr
                    +                 "</td>"
                    +               "</tr>"

                }

                //いいねボタン
                var goodBtnStr = "";
                if (data[i].ntp030GoodFlg == 0) {
                    goodBtnStr = "<button type=\"button\" id=" + dataNtpSid + " class=\"ntp_goodButton js_goodLink\" value=\"いいね!\">いいね!</button>";
                } else {
                    goodBtnStr = "<span class=\"fs_12 fw_b\">"+ msglist["how.nice.doing"] +"</span>";
                }

                //案件
                var ankenAreaStr = "";
                if (data[i].ankenName != "") {
                    ankenAreaStr = "<a id=\"" + data[i].ankenSid + "\" class=\"cl_linkDef anken_click mr20\">"
                                +  "<img class=\"btn_classicImg-display ml5\" src=\"../nippou/images/classic/icon_anken_25.png\">"
                                +  "<img class=\"btn_originalImg-display ml5\" src=\"../nippou/images/original/icon_anken.png\">"
                                +  htmlEscape(data[i].ankenName)
                                +  "</a>";
                }

                //企業
                var companyAreaStr = "";
                if (data[i].companyName != "") {
                    companyAreaStr += "<a id=\"" + data[i].companySid + "\" class=\"cl_linkDef comp_click comp_name_link_" + dataNtpSid + "\">"
                                    + "<span class=\"comp_name_" + dataNtpSid + "\">"
                                    + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_company.png\">"
                                    + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_company.png\">"
                                    + htmlEscape(data[i].companyName) + htmlEscape(data[i].companyBaseName)
                                    + "</span>"
                                    + "</a>";
                }

                //活動分類
                var actClass = "";
                if (data[i].ntp030DspKtbunrui != msglist["cmn.notset"]) {
                    actClass =  "<span class=\"mr20\">" + msglist["activities.class"] + "&nbsp;:&nbsp;" + htmlEscape(data[i].ntp030DspKtbunrui) + "</span>";
                }

                //活動方法
                var actMethod = "";
                if (data[i].ntp030DspKthouhou != msglist["cmn.notset"]) {
                    actMethod = msglist["activity.method"] + "&nbsp;:&nbsp;" + htmlEscape(data[i].ntp030DspKthouhou);
                }

                var usermukoClass = "";
                if (usrInfMdl.usrUkoFlg == 1) {
                    usermukoClass = "mukoUser";
                }
                //出力処理

                //タイムライン日付表示エリア
                if (lastLabelDate != data[i].ntp030NtpDate) {
                    var scldata = data[i].ntp030NtpDate;
                    var sclOpDate = scldata.substring(0,8);
                    var sel = document.getElementById("select_fix_date");
                    var writeFlg = 0;

                    if (sel.length == 0) {
                        $('#select_fix_date').append($('<option>').html(sclOpDate).val(sclOpDate));
                        $('#pageBottomArea').append("<div class=\"w100 js_dataDateArea mt50\" id=\"" + sclOpDate + "\">"
                                + "<p class=\"ntp_dayLine cl_fontWeek fw_b\">"
                                + scldata
                                + "</p>"
                                + "</div>");
                    } else {
                        for (var op = 0; op < sel.length; op++) {
                            if (sel.options[op].text == sclOpDate) {
                                writeFlg = 1;
                            }
                        }
                        if (writeFlg == 0) {
                            $('#select_fix_date').append($('<option>').html(sclOpDate).val(sclOpDate));
                            $('#pageBottomArea').append("<span id=\"position_" + sclOpDate + "\"></span>");
                        }
                        $('#pageBottomArea').append("<div class=\"w100 js_dataDateArea mt50\" id=\"" + sclOpDate + "\">"
                                + "<p class=\"ntp_dayLine cl_fontWeek fw_b\">"
                                + scldata
                                + "</p>"
                                + "</div>");
                    }
                    writeFlg = 0;
                }
                lastLabelDate = data[i].ntp030NtpDate;

                $('#pageBottomArea').append("<table class=\"table-top w100\">"
                +   "<tr><th class=\"border_right_none txt_t bgC_header2\">"
                +      imgStr
                +   "</th>"
                +   "<th class=\"w100 txt_l txt_t border_left_none bgC_header2 cl_fontBody\">"
                +      "<div class=\"fs_12 lh_normal\">"
                +       data[i].ntp030NtpDate
                +       data[i].ntp030DspFrHour + "&nbsp;時&nbsp;" + data[i].ntp030DspFrMinute + "分&nbsp;～&nbsp;" + data[i].ntp030DspToHour + "&nbsp;時&nbsp;" + data[i].ntp030DspToMinute + "分"
                +      "</div>"
                +      "<div class=\"fs_12 lh_normal\">"
                +        "<span class=\"" + usermukoClass + "\">" + usrInfMdl.usiSei + "&nbsp;&nbsp;" + usrInfMdl.usiMei + "</span>"
                +      "</div>"
                +      "<div class=\"cursor_p cl_linkDef fs_16 mt5 mb5\" onClick=\"return editNippou('edit', " + dataNtpSid + "," + data[i].ntp030UsrSid + ");\">"
                +         data[i].title
                +      "</div>"
                +      "<div>"
                +        ankenAreaStr
                +        companyAreaStr
                +      "</div>"
                +      "<div class=\"fs_12 lh_normal\">"
                +        actClass
                +        actMethod
                +      "</div>"
                +   "</th>"
                +   "</tr>"
                +   "<tr>"
                +   "<td class=\"border_right_none\">"
                +   "</td>"
                +   "<td class=\"border_left_none\">"
                +      "<div class=\"naiyouArea" + dataNtpSid + "\">"
                +         "<span class=\"dsp_naiyou_" + dataNtpSid + "\">" + data[i].ntp030DspValueStr + "</span>"
                +      "</div>"
                +      "<div class=\"dspTmpFileArea_" + dataNtpSid + "\">"
                +         tmpStr
                +      "</div>"
                +      "<div class=\"mt10\">"
                +         "<span class=\"js_goodBtnArea_" + dataNtpSid + "\">"
                +            goodBtnStr
                +         "</span>"
                +         "<span class=\"ml5 js_textGood cursor_p\" id=" + dataNtpSid + " data-count=" + data[i].ntp030GoodCnt + ">"
                +            "<img class=\"btn_classicImg-display\" src=\"../nippou/images/classic/bg_good_2.gif\">"
                +            "<img class=\"btn_originalImg-display\" src=\"../nippou/images/original/icon_good.png\">"
                +            "<span class=\"js_goodCount_" + dataNtpSid + "\">" + data[i].ntp030GoodCnt + "</span>"
                +         "</span>"
                +      "</div>"
                +   "</td>"
                +   "</tr>"
                +   cmtDspAreaStr
                +   "</table>");
            }
        }


        //オフセットを更新
        $("input[name=ntp030Offset]").val(offset);
        //最終表示日を更新
        $("input[name=ntp030LabelDate]").val(lastLabelDate);

        //出力終了後処理
        $('#pageBottom').html('');

        //コメントエリアのスクリプトを設定
        $('.js_ntp_labelArea').inFieldLabels();

        //日付スクロール位置イベント再設定
        $.waypoints('refresh')
        $('.js_dataDateArea').waypoint(function() {
            var scldata = $(this).attr('id');
            var sclOpDate = scldata.substring(0,8);
            $('#select_fix_date').val(sclOpDate);
        });
        proxValue = $('body').height() - $('.js_timeLine').offset().top  - $('.js_timeLine').height();
        proxValue = proxValue / $('body').height();
        addFlg = false;
    });

}