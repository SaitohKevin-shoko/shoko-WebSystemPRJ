function buttonPush(cmd, mod){
    document.forms[0].CMD.value=cmd;
    document.forms[0].cmd.value=mod;
    document.forms[0].submit();
    return false;
}

//戻るボタン
function backButtonPush(cmd, mod){

    var mitourokuFlg = false;
    var mikakuteiFlg = false;
    var notAddPoint = 0;
    var notEditPoint = 0;

    $(".edit_touroku_class").each(function() {
        mitourokuFlg = true;
        notAddPoint = $(this).offset().top;
    });


    $(".js_ntpCopyBtn").each(function() {
        if ($(this).parent().css('display') == 'none') {
            mikakuteiFlg = true;
            notEditPoint = $(this).parent().parent().offset().top;
        }
    });

    //未登録,未確定の日報がある場合はメッセージを表示
    if (mitourokuFlg) {

        addDialogOpen(cmd, mod, mikakuteiFlg, notAddPoint, notEditPoint, -1);

    } else if (mikakuteiFlg, notEditPoint) {

        editDialogOpen(cmd, mod, notEditPoint, -1);

    } else {
        buttonPush(cmd, mod);
    }

    return false;
}

function addDialogOpen(cmd, mod, mikakuteiFlg, notAddPoint, notEditPoint, ntpSid) {

    $('#notAddOk').dialog({
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        height: 180,
        width: 380,
        modal: true,
        closeOnEscape: false,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            はい: function() {

                $(this).dialog('close');

                if (mikakuteiFlg) {
                    editDialogOpen(cmd, mod, notEditPoint, ntpSid);
                } else {

                    if (ntpSid != -1) {
                        document.forms[0].ntp010NipSid.value=ntpSid;
                    }

                    buttonPush(cmd, mod);
                }

            },
            いいえ: function() {
                $('html,body').animate({scrollTop: notAddPoint - 140},'slow');
                $(this).dialog('close');
            }
        }
    });

}

function editDialogOpen(cmd, mod, notEditPoint, ntpSid) {

    $('#notEditOk').dialog({
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        height: 180,
        width: 390,
        modal: true,
        closeOnEscape: false,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            はい: function() {
                $(this).dialog('close');

                if (ntpSid != -1) {
                    document.forms[0].ntp010NipSid.value=ntpSid;
                }

                buttonPush(cmd, mod);
            },
            いいえ: function() {
                $('html,body').animate({scrollTop: notEditPoint - 140},'slow');
                $(this).dialog('close');
            }
        }
    });

}

function changeGroupCombo(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function moveUser(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function moveDay(elm, kbn) {

    systemDate = new Date();

    //「今日ボタン押下」
    if (kbn == 2) {
        $(elm).val(systemDate.toISOString().split("T")[0].replaceAll("-", "/"));
        return;
    }

    //「前日」or 「翌日」ボタン押下
    if (kbn == 1 || kbn == 3) {

        var ymdf = $(elm).val();
        re = new RegExp(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        if (ymdf.match(re)) {

            newDate = new Date(ymdf)
            if (kbn == 1) {
                newDate.setDate(newDate.getDate() - 1);
            } else if (kbn == 3) {
                newDate.setDate(newDate.getDate() + 1);
            }

            var newYear = newDate.getFullYear();
            var systemYear = systemDate.getFullYear();

            if (newYear >= systemYear - 5 && newYear <= systemYear + 5) {
                year = newYear;
                month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                day = ("0" + newDate.getDate()).slice(-2);
                $(elm).val(year + "/" + month + "/" + day);
            }
        } else {
            if ($(elm).val() == '') {
                $(elm).val(systemDate.toISOString().split("T")[0].replaceAll("-", "/"));
            }
        }
    }
}


function selectUsersList() {

    var flg = true;
    if (document.forms[0].ntp040SelectUsersKbn.checked) {
        flg = true;
    } else {
        flg = false;
    }
    oElements = document.getElementsByName("users_l");
    var defUserAry = document.forms[0].users_l.options;
    var defLength = defUserAry.length;
    for (i = defLength - 1; i >= 0; i--) {
        if (defUserAry[i].value != -1) {
            defUserAry[i].selected = flg;
        }
    }
}
function selectResList() {

    var flg = true;
    if (document.forms[0].sch040SelectResKbn.checked) {
        flg = true;
    } else {
        flg = false;
    }
    oElements = document.getElementsByName("reserve_l");
    var defResAry = document.forms[0].reserve_l.options;
    var defLength = defResAry.length;
    for (i = defLength - 1; i >= 0; i--) {
        if (defResAry[i].value != -1) {
            defResAry[i].selected = flg;
        }
    }
}

function deleteCompany(companyId, companyBaseId) {
    document.forms['ntp040Form'].CMD.value = 'deleteCompany';
    document.forms['ntp040Form'].ntp040delCompanyId.value = companyId;
    document.forms['ntp040Form'].ntp040delCompanyBaseId.value = companyBaseId;
    document.forms['ntp040Form'].submit();
    return false;
}

var row_number = 1;
var delBtnId = '';
var ntpDelBtnId = '';
var delCmtNtpId = '';
$(function() {

    $(document).on({
        mouseenter:function () {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function () {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    }, '.js_listHover');

    //IE6用左側日付、ユーザ名固定
    $('#fix_content').exFixed();

    //ENTERボタンsubmit禁止
    $("#ntpTitleTextBox").keypress(function(ev) {
        if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
            return false;
        }
    });

    /* 目標 hover */
    $('.target_link_area').hover(
        function () {
            $(this).removeClass("target_link_area").addClass("target_link_area_hover, 1000");
        },
        function () {
            $(this).removeClass("target_link_area_hover").addClass("target_link_area, 1000");
        }
    );


    /* 目標リセットボタン */
    $(".js_resetTrgBtn").on("click", function(){
        var trgParam = $(this).attr('id').split("_");
        resetTargetRec(trgParam[1], trgParam[2], trgParam[3], trgParam[4]);
    });

    /* 目標変更ボタン */
    $(".js_changeTrgBtn").on("click", function(){
        var chTrgId = $(this).attr('id');
        $('.recordArea_' + chTrgId).removeClass("display_n");
        $('.trgBtnArea_' + chTrgId).addClass("display_n");
    });

    /* 目標キャンセルボタン */
    $(".js_targetCanselBtn").on("click", function(){
        var caTrgId = $(this).attr('id');
        var trgCaParam = $(this).attr('id').split("_");
        resetTargetRec2(trgCaParam[0], trgCaParam[1], trgCaParam[2], trgCaParam[3]);
        $('.recordArea_' + caTrgId).addClass("display_n");
        $('.trgBtnArea_' + caTrgId).removeClass("display_n");
    });


    /* 目標確定ボタンクリック */
    $(".js_targetJakuteiBtn").on("click", function(){

        var targetId = $(this).attr('id');

        $('#dialogEditOk').dialog({
            autoOpen: true,
            bgiframe: true,
            resizable: false,
            height: 180,
            modal: true,
            closeOnEscape: false,
            overlay: {
                backgroundColor: '#000000',
                opacity: 0.5
            },
            buttons: {
                はい: function() {

                    var recordVal = $('#trgRecord_' + targetId).val();
                    var targetVal = $('#valTrg_'    + targetId).text();

                    //データ送信
                    $.ajaxSetup({async:false});
                    $.post('../nippou/ntp040.do', {
                        "cmd":"trgEdit",
                        "CMD":"trgEdit",
                        "targetId":targetId,
                        "recordVal":recordVal,
                        "targetVal":targetVal},
                        function(data) {
                            if (data != null || data != "") {

                                if (data.length > 0) {

                                    //エラー
                                    $("#error_msg").html("");

                                    for (var d in data) {
                                        $("#error_msg").append("<span class=\"cl_fontWarn\">" + data[d] + "</span>");
                                    }

                                    //エラーメッセージ
                                    $('#dialog_error').dialog({
                                        autoOpen: true,
                                        bgiframe: true,
                                        resizable: false,
                                        width:500,
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
                                    //データ設定
                                    var trgIdParam = targetId.split("_");
                                    resetTargetRec2(trgIdParam[0], trgIdParam[1], trgIdParam[2], trgIdParam[3]);
                                    $('.recordArea_' + targetId).addClass("display_n");
                                    $('.trgBtnArea_' + targetId).removeClass("display_n");
                                }
                            }
                    });

                    $(this).dialog('close');
                },
                いいえ: function() {

                    $(this).dialog('close');

                }
            }
        });

    });

    /* 前日ボタン */
    $(".js_ntpPrevBtn").on("click", function(){

        var prevNtpSid = $(this).attr('id');
        document.forms[0].CMD.value='edit';
        document.forms['ntp040Form'].ntp040FrYear.value = '';
        document.forms['ntp040Form'].ntp040FrMonth.value = '';
        document.forms['ntp040Form'].ntp040FrDay.value = '';
        document.forms['ntp040Form'].ntp010DspDate.value = $('input:hidden[name=ntp040PrevNtpDate]').val();
        document.forms['ntp040Form'].ntp010SelectDate.value = $('input:hidden[name=ntp040PrevNtpDate]').val();
        document.forms['ntp040Form'].ntp010NipSid.value = prevNtpSid;

        var mitourokuFlg = false;
        var mikakuteiFlg = false;
        var notAddPoint = 0;
        var notEditPoint = 0;

        $(".edit_touroku_class").each(function() {
            mitourokuFlg = true;
            notAddPoint = $(this).offset().top;
        });


        $(".js_ntpCopyBtn").each(function() {
            if ($(this).parent().css('display') == 'none') {
                mikakuteiFlg = true;
                notEditPoint = $(this).parent().parent().offset().top;
            }
        });

        //未登録,未確定の日報がある場合はメッセージを表示
        if (mitourokuFlg) {

            addDialogOpen('edit', 'edit', mikakuteiFlg, notAddPoint, notEditPoint, prevNtpSid);

        } else if (mikakuteiFlg, notEditPoint) {

            editDialogOpen('edit', 'edit', notEditPoint, prevNtpSid);

        } else {
            buttonPush('edit', 'edit');
        }

        return false;
    });


    /* 今日ボタン */
    $(".js_ntpTodayBtn").on("click", function(){

        var todayNtpSid = $(this).attr('id');
        document.forms[0].CMD.value='edit';
        document.forms['ntp040Form'].ntp040FrYear.value = '';
        document.forms['ntp040Form'].ntp040FrMonth.value = '';
        document.forms['ntp040Form'].ntp040FrDay.value = '';
        document.forms['ntp040Form'].ntp010DspDate.value = $('input:hidden[name=ntp040TodayNtpDate]').val();
        document.forms['ntp040Form'].ntp010SelectDate.value = $('input:hidden[name=ntp040TodayNtpDate]').val();
        document.forms['ntp040Form'].ntp010NipSid.value = todayNtpSid;

        var mitourokuFlg = false;
        var mikakuteiFlg = false;
        var notAddPoint = 0;
        var notEditPoint = 0;

        $(".edit_touroku_class").each(function() {
            mitourokuFlg = true;
            notAddPoint = $(this).offset().top;
        });


        $(".js_ntpCopyBtn").each(function() {
            if ($(this).parent().css('display') == 'none') {
                mikakuteiFlg = true;
                notEditPoint = $(this).parent().parent().offset().top;
            }
        });

        //未登録,未確定の日報がある場合はメッセージを表示
        if (mitourokuFlg) {

            addDialogOpen('edit', 'edit', mikakuteiFlg, notAddPoint, notEditPoint, todayNtpSid);

        } else if (mikakuteiFlg, notEditPoint) {

            editDialogOpen('edit', 'edit', notEditPoint, todayNtpSid);

        } else {
            buttonPush('edit', 'edit');
        }

        return false;
    });


    /* 翌日ボタン */
    $(".js_ntpNextBtn").on("click", function(){
        var nextNtpSid = $(this).attr('id');
        document.forms[0].CMD.value='edit';
        document.forms['ntp040Form'].ntp040FrYear.value = '';
        document.forms['ntp040Form'].ntp040FrMonth.value = '';
        document.forms['ntp040Form'].ntp040FrDay.value = '';
        document.forms['ntp040Form'].ntp010DspDate.value = $('input:hidden[name=ntp040NextNtpDate]').val();
        document.forms['ntp040Form'].ntp010SelectDate.value = $('input:hidden[name=ntp040NextNtpDate]').val();
        document.forms['ntp040Form'].ntp010NipSid.value = nextNtpSid;

        var mitourokuFlg = false;
        var mikakuteiFlg = false;
        var notAddPoint = 0;
        var notEditPoint = 0;

        $(".edit_touroku_class").each(function() {
            mitourokuFlg = true;
            notAddPoint = $(this).offset().top;
        });


        $(".js_ntpCopyBtn").each(function() {
            if ($(this).parent().css('display') == 'none') {
                mikakuteiFlg = true;
                notEditPoint = $(this).parent().parent().offset().top;
            }
        });

        //未登録,未確定の日報がある場合はメッセージを表示
        if (mitourokuFlg) {

            addDialogOpen('edit', 'edit', mikakuteiFlg, notAddPoint, notEditPoint, nextNtpSid);

        } else if (mikakuteiFlg, notEditPoint) {

            editDialogOpen('edit', 'edit', notEditPoint, nextNtpSid);

        } else {
            buttonPush('edit', 'edit');
        }

//document.forms['ntp040Form'].submit();
        return false;
    });

    /* 投稿ボタン hover */
    $('.btn_base_toukou').on({
        mouseenter:function () {
            $(this).addClass("btn_base_toukou_hover");
        },
        mouseleave:function () {
            $(this).removeClass("btn_base_toukou_hover");
        }
    });

    /* 投稿ボタン */
    $(".js_commentBtn").on("click", function(){

        var rownum = $(this).parent().attr("id");
        var trId = "";

        /* ntp010DspGpSid */
        var ntp010DspGpSid       = document.forms['ntp040Form'].ntp010DspGpSid.value;

        if (rownum != null && rownum != "") {
            trId = "_" + rownum;
        }
        var commentStr = $("textarea[name=ntp040Comment" + trId + "]").val();


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
                width:350,
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
        } else {
            commentStr = encodeURIComponent(commentStr);
            var commentNtpSid = $(this).attr("id");

            //コメント送信,最新データ取得,画面書き換え
            $.ajaxSetup({async:false});
            $.post('../nippou/ntp040.do', {"cmd":"addComment",
                                            "CMD":"addComment",
                                            "commentNtpSid":commentNtpSid,
                                            "commentStr":commentStr,
                                            "rowNum":rownum,
                                            "ntp010DspGpSid":ntp010DspGpSid},
                function(data) {
                    if (data != null || data != "") {
                        setComment(trId, commentNtpSid, rownum, data);
                    }
                });
        }
    });



    /* コメント削除リンク */
    $(document).on("click", ".commentDel", function(){

        var rownum = $(this).parent().attr("id");
        var trId = "";
        if (rownum != null && rownum != "") {
            trId = "_" + rownum;
        }

        delCmtNtpId = $(this);
        $('#dialogCommentDel').dialog('open');

    });



    /* コメント削除確認 */
    $('#dialogCommentDel').dialog({
        autoOpen: false,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 180,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            はい: function() {

                //コメント送信,最新データ取得,画面書き換え
                $.ajaxSetup({async:false});
                $.post('../nippou/ntp040.do', {"cmd":"delComment",
                                                "CMD":"delComment",
                                                "commentNtpSid":delCmtNtpId.attr("id")
                                                },
                    function(data) {
                    });

                //行削除
                $("." + delCmtNtpId.parent().attr("id")).remove();
                $(this).dialog('close');
            },
            いいえ: function() {
                $(this).dialog('close');
            }
        }
    });




    /* 行追加ボタン */
    $(".js_newAddBtn").on("click", function(){
        addNewRow();
    });

    /* 行追加ボタン(編集時) */
    $(".js_newAddBtnInEdit").on("click", function(){


        row_number = getLastRowNumber(); //$("#editLastRowNum").val();

        //前の日報で設定されている終了時を取得
        var toRowId = "";
        var nextFromHour = "";
        var nextToHour   = "";
        var nextFromMin  = "";
        var nextToMin    = "";

        toRowId = "_" + row_number;

        re = new RegExp(/(\d{1,2})\:(\d{1,2})/);

        var toTime = $("input[name=ntp040ToTime" + toRowId + "]").val();
        if (toTime != undefined && toTime.match(re)) {
            nextToHour = parseInt(toTime.split(":")[0]) + 1;
            nextToMin  = parseInt(toTime.split(":")[1]);
            nextFromHour = parseInt(toTime.split(":")[0]);
            nextFromMin = parseInt(toTime.split(":")[1]);
        }

        if (nextFromHour >= 33) {
            nextFromHour = 33;
        }

        if (nextToHour >= 33) {
            nextToHour = 33;
        }

        var td_class = 'td_wt';
        row_number++;

        // 時分初期値
        var frHourSelect    = $('#frhourhide').val();
        var toHourSelect    = $('#tohourhide').val();
        var frMinSelect     = $('#frminhide').val();
        var toMinSelect     = $('#tominhide').val();

        /* option 時 */
        var frhourOptionStr = "";
        var tohourOptionStr = "";

        if (nextFromHour !== "" && !isNaN(nextFromHour)) {
            frHourSelect = nextToHour;
        }

        if (nextToHour !== "" && !isNaN(nextToHour)) {
            toHourSelect = nextToHour;
        }

        var frTimeStr = ("00" + (frHourSelect)).slice(-2) + ":" + ("00" + (nextFromMin)).slice(-2);
        var toTimeStr = ("00" + (toHourSelect)).slice(-2) + ":" + ("00" + (nextFromMin)).slice(-2);

        /* ユーザ情報・タイトル・時間 */
        var usrInfPhotoStr = "";
        var ntpUsrBinSid  = $('input:hidden[name=ntp040UsrBinSid]').val();
        var ntpUsrPctKbn  = $('input:hidden[name=ntp040UsrPctKbn]').val();
        var ntpUsrName    = $('input:hidden[name=ntp040UsrName]').val();
        var ntpUsrUkoFlg  = $('input:hidden[name=ntp040UsrUkoFlg]').val();
        var mukoUserClass = "";
        if (ntpUsrUkoFlg == 1) {
            mukoUserClass = "mukoUser";
        }


        if (ntpUsrBinSid == "0") {
            if (ntpUsrPctKbn == "0") {
                //写真なし 公開
                usrInfPhotoStr += "<img src=\"../common/images/classic/icon_photo.gif\" name=\"pitctImage\" class=\"classic-display wp50\" alt=\"写真\" >"
                                + "<img src=\"../common/images/original/photo.png\" name=\"pitctImage\" class=\"original-display wp50\" alt=\"写真\" >";
            } else {
                //写真なし 非公開
                usrInfPhotoStr += "<div class=\"hikokai_photo-m txt_c\">"
                                + "<span class=\"cl_fontWarn\">非公開</span>"
                                + "</div>";
            }
        } else {
            if (ntpUsrPctKbn == "0") {
                //写真あり 公開
                usrInfPhotoStr += "<img class=\"wp50\" src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid=" + ntpUsrBinSid + "\" alt=\"写真\" />";
            } else {
                //写真あり 非公開
                usrInfPhotoStr += "<div class=\"hikokai_photo-m txt_c\">"
                                + "<span class=\"cl_fontWarn\">非公開</span>"
                                + "</div>";
            }
        }

        var usrInfAreaStr = "";
        usrInfAreaStr = "<tr class=\"js_usrInfArea" + row_number + " display_n\">"
                        +  "<td class=\"txt_t w100\" colspan=\"4\">"
                        +  "<table class=\"w100 table-noBorder\">"
                        +  "<tr>"
                        +  "<td>"
                        +  usrInfPhotoStr
                        +  "</td>"
                        +  "<td class=\"w100\">"
                        +  "<div class=\"lh100 fw_b " + mukoUserClass + "\">"
                        +  ntpUsrName
                        +  "</div>"
                        +  "<div>"
                        +  "<span class=\"js_dspFrhour_" + row_number + "\"></span>"
                        +  "&nbsp;時&nbsp;"
                        +  "<span class=\"js_dspFrminute_" + row_number + "\"></span>"
                        +  "&nbsp;分&nbsp;"
                        +  "～"
                        +  "<span class=\"js_dspTohour_" + row_number + "\"></span>"
                        +  "&nbsp;時&nbsp;"
                        +  "<span class=\"js_dspTominute_" + row_number + "\"></span>"
                        +  "&nbsp;分"
                        +  "<span id=\"betWeenDays\"></span>"
                        +  "</div>"
                        +  "<div>"
                        +  "<div class=\"fw_b fs_16 mt5 js_dspTitle_" + row_number + "\">"
                        +  "</div>"
                        +  "</div>"
                        +  "</td>"
                        +  "</tr>"
                        +  "</table>"
                        +  "</td>"
                        +  "</tr>";


        /* 案件    企業・顧客 */
        var ankenCompanyStr = "";
        var noAnkenCompanyStr= "";
        if ($('input:hidden[name=ntp040AnkenCompanyUse]').val() == 0) {
            //両方
            ankenCompanyStr = "<tr>"
                            + "<th class=\"w20\">案件</td>"
                            + "<td class=\"w30 txt_t\">"
                            + "<div class=\"js_ankenDataArea" + row_number + " display_n\">"
                            + "<div class=\"ntp040AnkenCodeDspArea_" + row_number + "\">案件コード：</div>"
                            + "<div class=\"ntp040AnkenNameDspArea_" + row_number + "\"></div>"
                            + "</div>"
                            + "<div class=\"js_ankenDataArea" + row_number + "\">"
                            + "<button type=\"button\" class=\"baseBtn\" onclick=\"return openAnkenWindow('ntp040','" + row_number + "')\">"
                            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_search.png\" alt=\"案件検索\">"
                            + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_search.png\" alt=\"案件検索\">"
                            + "案件検索"
                            + "</button>&nbsp;"
                            + "<button type=\"button\" class=\"baseBtn js_ankenHistoryPop\" id=\"" + row_number  +"\">"
                            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_clock.png\" alt=\"履歴\">"
                            + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_log_18.png\" alt=\"履歴\">"
                            + "履歴"
                            + "</button>"
                            + "<div id=\"ntp040AnkenIdArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040AnkenCodeArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040AnkenNameArea_" + row_number + "\">"
                            + "</div>"
                            + "</div>"
                            + "</td>"
                            + "<th class=\"w20\">企業・顧客</th>"
                            + "<td class=\"w30 txt_t\">"
                            + "<div class=\"js_kigyouDataArea" + row_number + " display_n\">"
                            + "<div class=\"js_ntp040CompCodeDspArea_" + row_number + "\">企業コード：</div>"
                            + "<div class=\"js_ntp040CompNameDspArea_" + row_number + "\"></div>"
                            + "</div>"
                            + "<div class=\"js_kigyouDataArea" + row_number + "\">"
                            + "<button type=\"button\" class=\"baseBtn\" onclick=\"return openCompanyWindow2('ntp040','" + row_number + "')\">"
                            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_search.png\" alt=\"アドレス帳\">"
                            + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_search.png\" alt=\"アドレス帳\">"
                            + "アドレス帳"
                            + "</button>&nbsp;"
                            + "<button type=\"button\" class=\"baseBtn js_adrHistoryPop\" id=\"" + row_number  +"\">"
                            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_clock.png\" alt=\"履歴\">"
                            + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_log_18.png\" alt=\"履歴\">"
                            + "履歴"
                            + "</button>"
                            + "<div id=\"ntp040CompanyIdArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040CompanyBaseIdArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040CompanyCodeArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040CompNameArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040AddressIdArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040AddressNameArea_" + row_number + "\">"
                            + "</div>"
                            + "</div>"
                            + "</td>"
                            + "</tr>";

        } else if ($('input:hidden[name=ntp040AnkenCompanyUse]').val() == 1) {
            //案件のみ
            ankenCompanyStr = "<tr>"
                            + "<th class=\"w20\">案件</td>"
                            + "<td class=\"w80 txt_t\" colspan=\"3\">"
                            + "<div class=\"js_ankenDataArea" + row_number + " display_n\">"
                            + "<div class=\"ntp040AnkenCodeDspArea_" + row_number + "\">案件コード：</div>"
                            + "<div class=\"ntp040AnkenNameDspArea_" + row_number + "\"></div>"
                            + "</div>"
                            + "<div class=\"js_ankenDataArea" + row_number + "\">"
                            + "<button type=\"button\" class=\"baseBtn\" onclick=\"return openAnkenWindow('ntp040','" + row_number + "')\">"
                            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_search.png\" alt=\"案件検索\">"
                            + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_search.png\" alt=\"案件検索\">"
                            + "案件検索"
                            + "</button>&nbsp;"
                            + "<button type=\"button\" class=\"baseBtn js_ankenHistoryPop\" id=\"" + row_number  +"\">"
                            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_clock.png\" alt=\"履歴\">"
                            + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_log_18.png\" alt=\"履歴\">"
                            + "履歴"
                            + "</button>"
                            + "<div id=\"ntp040AnkenIdArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040AnkenCodeArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040AnkenNameArea_" + row_number + "\">"
                            + "</div>"
                            + "</div>"
                            + "</td>"
                            + "</tr>";
        } else if ($('input:hidden[name=ntp040AnkenCompanyUse]').val() == 2) {
            //企業・顧客のみ
            ankenCompanyStr = "<tr>"
                            + "<th class=\"w20\">企業・顧客</th>"
                            + "<td class=\"w80 txt_t\" colspan=\"3\">"
                            + "<div class=\"js_kigyouDataArea" + row_number + " display_n\">"
                            + "<div class=\"js_ntp040CompCodeDspArea_" + row_number + "\">企業コード：</div>"
                            + "<div class=\"js_ntp040CompNameDspArea_" + row_number + "\"></div>"
                            + "</div>"
                            + "<div class=\"js_kigyouDataArea" + row_number + "\">"
                            + "<button type=\"button\" class=\"baseBtn\" onclick=\"return openCompanyWindow2('ntp040','" + row_number + "')\">"
                            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_search.png\" alt=\"アドレス帳\">"
                            + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_search.png\" alt=\"アドレス帳\">"
                            + "アドレス帳"
                            + "</button>&nbsp;"
                            + "<button type=\"button\" class=\"baseBtn js_adrHistoryPop\" id=\"" + row_number  +"\">"
                            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_clock.png\" alt=\"履歴\">"
                            + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_log_18.png\" alt=\"履歴\">"
                            + "履歴"
                            + "</button>"
                            + "<div id=\"ntp040CompanyIdArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040CompanyBaseIdArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040CompanyCodeArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040CompNameArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040AddressIdArea_" + row_number + "\">"
                            + "</div>"
                            + "<div id=\"ntp040AddressNameArea_" + row_number + "\">"
                            + "</div>"
                            + "</div>"
                            + "</td>"
                            + "</tr>";
        }



        var dateInit = $('input:hidden[name=ntp040InitDate]').val();

        /* 活動分類 */
        var ktbunruiHouhouStr = "";
        if ($('input:hidden[name=ntp040KtBriHhuUse]').val() == 0) {

            /* option 活動分類 */
            var ktbunruiOptionStr = "";
            //var frBunruiSelect = $('#ktbunruihide').val();
            var frBunruiSelect = "";

            $('.ktbunruiclass').each(function() {
                var bunruiStr = $(this).attr('value').split("_");
                if (bunruiStr[0] == frBunruiSelect) {
                    ktbunruiOptionStr += "<option value=\"" + bunruiStr[0] + "\" selected=\"selected\">" + htmlEscape(bunruiStr[1]) + "</option>";
                } else {
                    ktbunruiOptionStr += "<option value=\"" + bunruiStr[0] + "\">" + htmlEscape(bunruiStr[1]) + "</option>";
                }
            });


            /* option 活動方法 */
            var kthouhouOptionStr = "";
            //var houhouSelect = $('#kthouhouhide').val();
            var houhouSelect = "";

            $('.kthouhouclass').each(function() {
                var houhouStr = $(this).attr('value').split("_");
                if (houhouStr[0] == houhouSelect) {
                    kthouhouOptionStr += "<option value=\"" + houhouStr[0] + "\" selected=\"selected\">" + htmlEscape(houhouStr[1]) + "</option>";
                } else {
                    kthouhouOptionStr += "<option value=\"" + houhouStr[0] + "\">" + htmlEscape(houhouStr[1]) + "</option>";
                }
            });

            ktbunruiHouhouStr = "<tr>"
                                + "<th class=\"w20\">活動分類/方法</th>"
                                + "<td class=\"w80\" colspan=\"3\">"
                                + "<div class=\"js_ktBunruiArea" + row_number + " display_n\">"
                                + "<span class=\"dsp_ktbunrui_" + row_number + "\"></span>&nbsp;"
                                + "<span class=\"dsp_kthouhou_" + row_number + "\" class=\"ml5\"></span>"
                                + "</div>"
                                + "<div class=\"js_ktBunruiArea" + row_number + "\">"
                                + "<select name=\"ntp040Ktbunrui_" + row_number + "\">"
                                + ktbunruiOptionStr
                                + "</select>&nbsp;"
                                + "<select name=\"ntp040Kthouhou_" + row_number + "\">"
                                + kthouhouOptionStr
                                + "</select>"
                                + "</div>"
                                + "</td>"
                                + "</tr>";
        }


        /* 見込み度 */
        var mikomidoStr = "";
        var mikomidoStandStr ="";
        if ($('input:hidden[name=ntp040MikomidoUse]').val() == 0) {

            //見込み度基準
            if ($('input:hidden[name=ntp040MikomidoFlg]').val() == 1) {
                mikomidoStandStr = "<div><button type=\"button\" class=\"baseBtn js_mikomidoBtn\">基準</button></div>";
            }

            mikomidoStr ="<tr>"
                        + "<th class=\"w20\">見込み度</th>"
                        + "<td class=\"w80\" colspan=\"3\">"
                        + "<div class=\"js_mikomidoArea" + row_number + " display_n\">"
                        + "<span class=\"dsp_mikomido_" + row_number + "\">10</span>％"
                        + "</div>"
                        + "<div class=\"js_mikomidoArea" + row_number + "\">"
                        + "<div class=\"verAlignMid\">"
                        + "<input name=\"ntp040Mikomido_" + row_number + "\" value=\"0\" checked=\"checked\" id=\"ntp040Mikomido0" + row_number + "\" type=\"radio\"><label for=\"ntp040Mikomido0" + row_number + "\">10%</label>"
                        + "<input name=\"ntp040Mikomido_" + row_number + "\" value=\"1\" id=\"ntp040Mikomido1" + row_number + "\" type=\"radio\" class=\"ml10\"><label for=\"ntp040Mikomido1" + row_number + "\">30%</label>"
                        + "<input name=\"ntp040Mikomido_" + row_number + "\" value=\"2\" id=\"ntp040Mikomido2" + row_number + "\" type=\"radio\" class=\"ml10\"><label for=\"ntp040Mikomido2" + row_number + "\">50%</label>"
                        + "<input name=\"ntp040Mikomido_" + row_number + "\" value=\"3\" id=\"ntp040Mikomido3" + row_number + "\" type=\"radio\" class=\"ml10\"><label for=\"ntp040Mikomido3" + row_number + "\">70%</label>"
                        + "<input name=\"ntp040Mikomido_" + row_number + "\" value=\"4\" id=\"ntp040Mikomido4" + row_number + "\" type=\"radio\" class=\"ml10\"><label for=\"ntp040Mikomido4" + row_number + "\">100%</label>"
                        + "</div>"
                        + mikomidoStandStr
                        + "</div>"
                        + "</td>"
                        + "</tr>";

        }


        /* 添付ファイル */
        var tempFileStr = "";
        if ($('input:hidden[name=ntp040TmpFileUse]').val() == 0) {
            tempFileStr = "<tr>"
                        + "<th class=\"w20\">添付<a id=\"naiyou\" name=\"naiyou\"></a></th>"
                        + "<td class=\"w80\" colspan=\"3\">"
                        + "<div class=\"js_tempFileArea" + row_number + " dsp_tmp_file_area_" + row_number + " display_n\"></div>"
                        + "<div class=\"js_tempFileArea" + row_number + "\">"
                        + "<div id=\"attachment_FormArea" + row_number + "\">"
                        + "<div>"
                        + "<input type=\"hidden\" name=\"attachmentFileListFlg" + row_number + "\" value=\"true\">"
                        + "<button type=\"button\" class=\"baseBtn ml0\" value=\"添付\" onclick=\"attachmentLoadFile('" + row_number + "');\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_temp_file_2.png\" alt=\"添付\">"
                        + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_attach.png\" alt=\"添付\">"
                        + "添付"
                        + "</button>"
                        + "<span class=\"txt_c ml5 fs_12\">ファイルのドラッグ&ドロップで添付が行えます。</span>"
                        + "<input type=\"file\" id=\"attachmentAreaBtn" + row_number + "\" class=\"display_none\" onchange=\"attachFileSelect(this, '" + row_number + "');\" multiple=\"\">"
                        + "</div>"
                        + "<span id=\"attachmentFileErrorArea" + row_number + "\"></span>"
                        + "<input type=\"hidden\" name=\"attachmentMode" + row_number + "\" value=\"0\">"
                        + "<input type=\"hidden\" name=\"attachmentPluginId" + row_number + "\" value=\"nippou\">"
                        + "<input type=\"hidden\" name=\"attachmentTempDirId" + row_number + "\" value=\"ntp040\">"
                        + "<input type=\"hidden\" name=\"attachmentTempDirPlus" + row_number + "\" value=\"row" + row_number + "\">"
                        + "<input type=\"hidden\" name=\"attachment_ID_list\" value=\"" + row_number + "\">"
                        + "<span id=\"attachmentFileListArea" + row_number + "\" class=\"mt5\"></span>"
                        + "</div>"
                        + "</td>"
                        + "</tr>"
        }

        //内容初期値
        var defaultValue = "";
        if ($('input:hidden[name=ntp040DefaultValue]').val() != null) {
            defaultValue = $('input:hidden[name=ntp040DefaultValue]').val();
        }

        var defaultLength = "0";
        if ($('input:hidden[name=ntp040DefaultValue2]').val() != null) {
            var defaultValue2 = "";
            defaultValue2 = $('input:hidden[name=ntp040DefaultValue2]').val();
            defaultLength = defaultValue2.length;
        }


        //カラーコメント
        var titileColStr1 = htmlEscape($('#msgCol1').val());
        var titileColStr2 = htmlEscape($('#msgCol2').val());
        var titileColStr3 = htmlEscape($('#msgCol3').val());
        var titileColStr4 = htmlEscape($('#msgCol4').val());
        var titileColStr5 = htmlEscape($('#msgCol5').val());



        /* 次のアクション */
        var actionAreaStr = "";
        if ($('input:hidden[name=ntp040NextActionUse]').val() == 0) {

            var dateActionInit = $('input:hidden[name=ntp040InitDate]').val();

            actionAreaStr = "<tr>"
                            + "<th class=\"w20\">次のアクション<a id=\"nextAction\" name=\"nextAction\"></a></th>"
                            + "<td class=\"w80\" colspan=\"3\">"
                            + "<div class=\"js_nextActionArea" + row_number + " display_n\">"
                            + "<span id=\"actionSelDateArea_" + row_number + "\">"
                            + "</span>"
                            + "<span class=\"dsp_nextaction_" + row_number + "\"></span>"
                            + "</div>"
                            + "<div class=\"js_nextActionArea" + row_number + "\">"
                            + "<div class=\"verAlignMid\">日付指定："
                            + "<input name=\"ntp040ActDateKbn_" + row_number + "\" value=\"1\" class=\"ml5\" onchange=\"toggleActionAreaShow('nxtActDateArea_" + row_number + "');\" id=\"actDate1_" + row_number + "\" type=\"radio\">"
                            + "<label for=\"actDate1_" + row_number + "\">する</label>"
                            + "<input name=\"ntp040ActDateKbn_" + row_number + "\" value=\"0\" class=\"ml10\" checked=\"checked\" onchange=\"toggleActionAreaHide('nxtActDateArea_" + row_number + "');\" id=\"actDate0_" + row_number + "\" type=\"radio\">"
                            + "<label for=\"actDate0_" + row_number + "\">しない</label>"
                            + "</div>"
                            + "<div id=\"nxtActDateArea_" + row_number + "\" class=\"display_n\">"
                            + "<input type=\"text\" name=\"selActionDate" + row_number + "\" id=\"selActionDate" + row_number + "\" maxlength=\"10\" styleClass=\"txt_c wp95 datepicker js_frDatePicker\" value=\"" +  dateInit + "\"/>"
                            + "<span class=\"picker-acs icon-date display_flex cursor_pointer iconKikanStart\"></span>"
                            + "<button type=\"button\" class=\"webIconBtn ml5\" onclick=\"return moveDay($('#selActionDate" + row_number + "')[0], 1)\">"
                            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\">"
                            + "<i class=\"icon-paging_left \"></i>"
                            + "</button>"
                            + "<button type=\"button\" class=\"baseBtn classic-display\" value=\"今日\" onclick=\"return moveDay($('#selActionDate" + row_number + "')[0], 2)\">"
                            + "今日"
                            + "</button>"
                            + "<span>"
                            + "<a class=\"fw_b todayBtn original-display\" onclick=\"return moveDay($('#selActionDate" + row_number + "')[0], 2)\">"
                            + "今日"
                            + "</a>"
                            + "</span>"
                            + "<button type=\"button\" class=\"webIconBtn\" onclick=\"return moveDay($('#selActionDate" + row_number + "')[0], 3)\">"
                            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\">"
                            + "<i class=\"icon-paging_right \"></i>"
                            + "</button>"
                            + "</div>"
                            + "<div>"
                            + "<textarea id=\"actionstr_" + row_number + "\" name=\"ntp040NextAction_" + row_number + "\" class=\"w100 mt10\" rows=\"3\" onkeyup=\"showLengthStr(value, 1000, 'actionlength" + row_number + "');\"></textarea>"
                            + "<span class=\"formCounter\">現在の文字数:</span><span id=\"actionlength" + row_number + "\" class=\"formCounter\">0</span>&nbsp;<span class=\"formCounter_max\">/&nbsp;1000&nbsp;文字</span>"
                            + "</div>"
                            + "</td>"
                            + "</tr>";
        }

        var rowIdx = getNextRowNumber();

        /* 日報行追加 */
        $('.js_nippouData').append("<table id=\"nippou_data_" + row_number + "\" class=\"table-left w100 js_nippouData_" + row_number + "\">"
                + "<tr id=\"" + row_number + "\" class=\"js_headNippou\">"
                + "<th colspan=\"4\" class=\"bgC_header1 js_ntpInfoNum w100\" id=\"pos" + row_number + "\">"
                + "<div class=\"w100 verAlignMid hp30\">"
                + "<img class=\"btn_classicImg-display\" src=\"../nippou/images/classic/icon_menu_single.gif\">"
                + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_siryo.png\">"
                + "<span class=\"js_nippouRowNumber cl_fontOutline\">NO." + rowIdx + "</span>"
                + "<div class=\"js_nipHeader_" + row_number + " w100 txt_r\" id=\"-1\">"
                + "<button type=\"button\" class=\"baseBtn js_ntpEditKakuteiBtn\" value=\"登録\" id=\"" + row_number + "\">"
                + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_add.png\" alt=\"登録\">"
                + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_add.png\" alt=\"登録\">"
                + "登録"
                + "</button>&nbsp;"
                + "<button type=\"button\" class=\"baseBtn js_ntpDelBtn\" value=\"削除\">"
                + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_delete.png\" alt=\"削除\">"
                + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_delete.png\" alt=\"削除\">"
                + "削除"
                + "</button>"
                + "</div>"
                + "</th>"
                + "</tr>"
                + usrInfAreaStr
                + "<tr class=\"js_titleArea" + row_number + "\">"
                + "<th class=\"w20\">タイトル<span class=\"cl_fontWarn\">※</span></th>"
                + "<td class=\"w80\" colspan=\"3\">"
                + "<span class=\"verAlignMid\"><input name=\"ntp040Title_" + row_number + "\" maxlength=\"100\" value=\"\" id=\"ntpTitleTextBox\" class=\"wp300\" type=\"text\">"
                + "<wbr><span class=\"no_w verAlignMid\"><span class=\"ntp_titlecolor-block bgc_fontSchTitleBlue ml10\"><input name=\"ntp040Bgcolor_" + row_number + "\" value=\"1\" id=\"bg_color1\" type=\"radio\"></span>"
                + "<label class=\"ml5 mr10\" for=\"bg_color1\">" + titileColStr1 + "</label></span></span>"
                + "<wbr><span class=\"no_w verAlignMid\"><span class=\"ntp_titlecolor-block bgc_fontSchTitleRed\"><input name=\"ntp040Bgcolor_" + row_number + "\" value=\"2\" id=\"bg_color2\" type=\"radio\"></span>"
                + "<label class=\"ml5 mr10\" for=\"bg_color2\">" + titileColStr2 + "</label></span>"
                + "<wbr><span class=\"no_w verAlignMid\"><span class=\"ntp_titlecolor-block bgc_fontSchTitleGreen\"><input name=\"ntp040Bgcolor_" + row_number + "\" value=\"3\" id=\"bg_color3\" type=\"radio\"></span>"
                + "<label class=\"ml5 mr10\" for=\"bg_color3\">" + titileColStr3 + "</label></span>"
                + "<wbr><span class=\"no_w verAlignMid\"><span class=\"ntp_titlecolor-block bgc_fontSchTitleYellow\"><input name=\"ntp040Bgcolor_" + row_number + "\" value=\"4\" id=\"bg_color4\" type=\"radio\"></span>"
                + "<label class=\"ml5 mr10\" for=\"bg_color4\">" + titileColStr4 + "</label></span>"
                + "<wbr><span class=\"no_w verAlignMid\"><span class=\"ntp_titlecolor-block bgc_fontSchTitleBlack\"><input name=\"ntp040Bgcolor_" + row_number + "\" value=\"5\" id=\"bg_color5\" type=\"radio\"></span>"
                + "<label class=\"ml5 \" for=\"bg_color5\">" + titileColStr5 + "</label></span>"
                + "</td>"
                + "</tr>"
                + "<tr class=\"js_ntpDateAreaTr" + row_number + "\">"
                + "<th class=\"w20\">報告日付</span></th>"
                + "<td class=\"w80\" colspan=\"3\">"
                + "<div class=\"verAlignMid w100\">"
                + "<input type=\"text\" name=\"selDate" + row_number + "\" id=\"selDate" + row_number + "\" maxlength=\"10\" class=\"txt_c wp95 datepicker js_frDatePicker\" value=\"" +  dateInit + "\"/>"
                + "<span class=\"picker-acs icon-date display_flex cursor_pointer iconKikanStart\"></span>"
                + "<button type=\"button\" class=\"webIconBtn ml5\" onclick=\"return moveDay($('#selDate" + row_number + "')[0], 1)\">"
                + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\">"
                + "<i class=\"icon-paging_left \"></i>"
                + "</button>"
                + "<button type=\"button\" class=\"baseBtn classic-display\" value=\"今日\" onclick=\"return moveDay($('#selDate" + row_number + "')[0], 2)\">"
                + "今日"
                + "</button>"
                + "<span>"
                + "<a class=\"fw_b todayBtn original-display\" onclick=\"return moveDay($('#selDate" + row_number + "')[0], 2)\">"
                + "今日"
                + "</a>"
                + "</span>"
                + "<button type=\"button\" class=\"webIconBtn\" onclick=\"return moveDay($('#selDate" + row_number + "')[0], 3)\">"
                + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\">"
                + "<i class=\"icon-paging_right \"></i>"
                + "</button>"
                + "</div>"
                + "</td>"
                + "</tr>"
                + "<tr class=\"js_ntpTimeArea" + row_number + "\">"
                + "<th class=\"w20\">時間</th>"
                + "<td class=\"w80\" colspan=\"3\">"
                + "<span class=\"display_flex\">"
                +   "<span class=\"clockpicker_fr pos_rel display_flex input-group\">"
                +      "<input type=\"text\" name=\"ntp040FrTime_" + row_number + "\" id=\"fr_clock" + row_number + "\" maxlength=\"5\" class=\"clockpicker js_clockpicker txt_c wp60\" value=\"" + frTimeStr + "\"/>"
                +      "<label for=\"fr_clock" + row_number + "\" class=\"picker-acs cursor_pointer icon-clock input-group-addon\"></label>"
                +   "</span>"
                +   "&nbsp;"
                +   "～&nbsp;"
                +   "<span class=\"clockpicker_to ml5 pos_rel display_flex input-group\">"
                +      "<input type=\"text\" name=\"ntp040ToTime_" + row_number + "\" id=\"to_clock" + row_number + "\" maxlength=\"5\" class=\"clockpicker js_clockpicker txt_c wp60\" value=\"" + toTimeStr + "\"/>"
                +      "<label for=\"to_clock" + row_number + "\" class=\"picker-acs cursor_pointer icon-clock input-group-addon\"></label>"
                +   "</span>"
                + "</span>"
                + "<span id=\"betWeenDays\"></span>"
                + "</td>"
                + "</tr>"
                +  ankenCompanyStr
                + "<tr>"
                + "<th class=\"w20\">内容<a id=\"naiyou\" name=\"naiyou\"></a></th>"
                + "<td class=\"w80\" colspan=\"3\">"
                + "<div class=\"js_naiyouArea" + row_number + " display_n\">"
                + "<span class=\"dsp_naiyou_" + row_number + "\"></span>"
                + "</div>"
                + "<div class=\"js_naiyouArea" + row_number + "\">"
                + "<textarea id=\"inputstr_" + row_number + "\" name=\"ntp040Value_" + row_number + "\" class=\"w100\" rows=\"5\" onkeyup=\"showLengthStr(value, 1000, 'inputlength" + row_number + "');\">" + defaultValue + "</textarea>"
                + "<span class=\"formCounter\">現在の文字数:</span><span id\=\"inputlength" + row_number + "\" class=\"formCounter\">" + defaultLength + "</span>&nbsp;<span class=\"formCounter_max\">/&nbsp;1000&nbsp;文字</span>"
                + "</td>"
                + "</tr>"
                +  ktbunruiHouhouStr
                +  mikomidoStr
                +  tempFileStr
                +  actionAreaStr
                + "<tr class=\"js_ntpAddUNameDate" + row_number + " display_n\">"
                + "<th class=\"w20\">登録者<a id=\"addUser\" name=\"addUser\"></a></th>"
                + "<td class=\"w80\" colspan=\"3\">"
                + "<div>"
                + "<span class=\"addUserName_" + row_number + "\"></span>"
                + "<span class=\"flo_r\">"
                + "<span class=\"addDate_" + row_number + "\">"
                + "</span>"
                + "</span>"
                + "</div>"
                + "</td>"
                + "</tr>"
                +  noAnkenCompanyStr
                + "<tr class=\"display_n\">"
                + "<td class=\"txt_c\" colspan=\"4\">"
                + "<span class=\"js_goodBtnArea_-1\">"
                + "<span class=\"js_textAlreadyGood fs_12 fw_b\">いいね!しています</span>"
                + "</span>"
                + "<span class=\"ml5 js_textGood cursor_p\" id=\"-1\">"
                + "<img class=\"btn_classicImg-display\" src=\"../nippou/images/classic/bg_good_2.gif\">"
                + "<img class=\"btn_originalImg-display\" src=\"../nippou/images/original/icon_good.png\">"
                + "<span class=\"js_goodCount_-1\"></span>"
                + "</span>"
                + "</td>"
                + "</tr>"
                + "<tr class=\"js_ntp040DspComment_tr_" + row_number + " display_n\">"
                + "<td class=\"js_ntp040DspComment_" + row_number + "\" colspan=\"4\">"
                + "<span class=\"js_commentDspArea" + row_number + "\">"
                + "</td>"
                + "</tr>"

                + "<tr class=\"js_commentArea" + row_number + " display_n\">"
                + "<td class=\"w100 display_n\" colspan=\"4\">"
                + "<table class=\"w100 table-noBorder\">"
                + "<tbody><tr>"
                + "<td>"
                + "<img src=\"../common/images/classic/icon_photo.gif\" name=\"pitctImage\" class=\"classic-display wp50\" alt=\"写真\" >"
                + "<img src=\"../common/images/original/photo.png\" name=\"pitctImage\" class=\"original-display wp50\" alt=\"写真\" >"
                + "</td>"
                + "<td class=\"w100\">"
                + "<div class=\"textfield verAlignMid w100\">"
                + "<label class=\"js_ntp_labelArea ntp_labelArea cl_fontWeek\" for=\"field_id" + row_number + "\">コメントする</label>"
                + "<textarea name=\"ntp040Comment_" + row_number + "\" cols=\"45\" rows=\"3\" class=\"w100\" id=\"field_id" + row_number + "\"></textarea>"
                + "</div>"
                + "</td>"
                + "<td id=\"" + row_number + "\" class=\"no_w\"><button type=\"button\" class=\"baseBtn js_commentBtn\" value=\"投稿\" id=\"-1\">投稿</button></td>"
                + "</tr>"
                + "</tbody></table>"
                + "</td>"
                + "</tr>"
                + "</tbody></table>"
                + "</td>"
                + "</tr>"
            );


        //ラジオボタン初期値設定
        $('input[name="ntp040Bgcolor_' + row_number + '"]').val([$("input:hidden[name='ntp040BgcolorInit']").val()]);

        $("#editLastRowNum").val(row_number);

        //追加した時間選択のclockpikcer起動
        startClockPicker($("#fr_clock" + row_number))
        startClockPicker($("#to_clock" + row_number))

        //追加した日付選択のdatepicker起動
        startDatePicker($("#selDate" + row_number), 0)

        //追加した行のテンポラリディレクトリを生成
        createTempDir(row_number);
        $("#fileDrop_Overlay").append(addUploadHtml(row_number));
        attachmentInitSetting(row_number);

        footerStart2("#footdiv");

    });



    /* 削除ボタン(新規登録時) */
    $(document).on("click", ".js_ntpDelBtn", function(){
        delBtnId = $(this);
        $('#dialog').dialog('open');
    });

    /* 確認ボタン */
    $('#dialog').dialog({
        autoOpen: false,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 180,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            はい: function() {

            //行番号
            var rownum = delBtnId.parent().parent().parent().parent().attr("id");

            //行ID
            var rowId = "";

            if (rownum == -1) {
                //編集画面で行追加時
                rowId = delBtnId.parent().parent().parent().parent().parent().parent().attr("id");
                if (rowId != null && rowId != "") {
                    rownum = rowId.split("nippou_data_")[1];
                }
            }

            $("#attachmentUploadArea" + rownum).remove();

            //添付ファイル削除
            var selectfiles = "";
            if ($('input:hidden[name=ntp040TmpFileUse]').val() == 0) {
                var sel = $('#attachmentFileListArea' + rownum).children('div');
                for (var i = 0; i < sel.length; i++) {
                    selectfiles += sel.attr('id').replace("attachmentFileDetail_", "") + ",";
                }
                if (selectfiles != null && selectfiles != "") {
                    jsonStr = '[' + selectfiles + ']';

                    //データ送信
                    $.ajaxSetup({async:false});
                    $.post('../nippou/ntp040.do', {
                        "cmd":"tempdel",
                        "CMD":"tempdel",
                        "rowNum":rownum,
                        "nippouTempData":jsonStr},
                        function(data) {
                            if (data == null || data == "") {
                            }
                        });
                }
            }

            //行削除
            if (rowId != null && rowId != "") {
                //編集画面
                $('#' + rowId).remove();
            } else {
                //新規登録画面
                delBtnId.parent().parent().parent().parent().parent().parent().remove();
            }
            resetRowNumber(); // 番号再採番

            $(this).dialog('close');
            },
            いいえ: function() {
                $(this).dialog('close');
            }
        }
    });



    /* 削除ボタン(編集時) */
    $(document).on("click", ".js_ntpDellBtn", function(){
        ntpDelBtnId = $(this);
        $('#dialogNtpDel').dialog('open');
    });

    /* 確認ボタン */
    $('#dialogNtpDel').dialog({
        autoOpen: false,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        height: 180,
        modal: true,
        overlay: {
        backgroundColor: '#000000',
        opacity: 0.5
        },
        buttons: {
            はい: function() {
                //エラーメッセージ削除
                $("#error_msg").text("");
                //日報SID
                var ntpSid = ntpDelBtnId.parent().attr("id");

                //行番号
                var rownum = ntpDelBtnId.parent().parent().parent().parent().attr("id");

                //データ送信
                $.ajaxSetup({async:false});
                $.post('../nippou/ntp040.do', {"cmd":"dodelete",
                                                "CMD":"dodelete",
                                                "delNtpSid":ntpSid,
                                                "rowNum":rownum},
                    function(data) {
                        if (data != null && data != "" && data.ntpSid == null) {
                            var jsonArray = eval('(' + data + ')');
                            var scrollId = "";

                            if (jsonArray.length > 0) {
                                //入力エラー
                                for(var i in jsonArray){
                                    if (scrollId == "") {
                                        scrollId = jsonArray[i].rownum;
                                    }

                                    if (jsonArray[i].rownum != -1) {
                                        //通常
                                        var rowIdx = getViewRowNumber(jsonArray[i].rownum);
                                        $("#error_msg").append("<b>" + rowIdx + "</b>");
                                    } else {
                                        //目標
                                        $("#error_msg").append("<b>目標");
                                    }

                                    var errormsgs = jsonArray[i].msg;
                                    for(var j in errormsgs){
                                        $("#error_msg").append("<span class=\"cl_fontWarn\">" + errormsgs[j] + "</span>");
                                    }
                                }
                                $('.ui-dialog-content').dialog('close');

                                $('#dialog_error').dialog({
                                    autoOpen: true,
                                    bgiframe: true,
                                    resizable: false,
                                    width:500,
                                    modal: true,
                                    closeOnEscape: false,
                                    overlay: {
                                        backgroundColor: '#000000',
                                        opacity: 0.5
                                    },
                                    buttons: {
                                        OK: function() {
                                            footerStart("#pos" + scrollId);
                                            $(this).dialog('close');
                                        }
                                    }
                                });
                            }
                    } else {
                    //行削除
                        ntpDelBtnId.parent().parent().parent().parent().parent().parent().remove();
                        resetRowNumber(); // 番号再採番
                    }
                });

                $(this).dialog('close');
            },
            いいえ: function() {
                //エラーメッセージ削除
                $("#error_msg").text("");
                $(this).dialog('close');
            }
        }
    });


    /* 登録ボタン */
    $(".js_ntpAddBtn").on("click", function(){

        //エラーメッセージ削除
        $("#error_msg").text("");

        /* json形成 */
        var nippouData = "[";
        var jsonStr = "";

        /* 登録日 */
        var ntpYear    = $("select[name=ntp040FrYear]").val();
        var ntpMonth   = $("select[name=ntp040FrMonth]").val();
        var ntpDay     = $("select[name=ntp040FrDay]").val();
        var ntpDate    = encodeURIComponent($("input[name=ntp040FrDate]").val());

        /* 選択ユーザ */
        var selectUsrSid        = document.forms['ntp040Form'].ntp010SelectUsrSid.value;
        /* listMod */
        var listMod             = document.forms['ntp040Form'].listMod.value;
        /* dspMod */
        var dspMod              = document.forms['ntp040Form'].dspMod.value;
        /* ntp010DspDate */
        var ntp010DspDate       = document.forms['ntp040Form'].ntp010DspDate.value;
        /* ntp010DspGpSid */
        var ntp010DspGpSid      = document.forms['ntp040Form'].ntp010DspGpSid.value;
        /* ntp010SelectUsrKbn */
        var ntp010SelectUsrKbn  = document.forms['ntp040Form'].ntp010SelectUsrKbn.value;
        /* ntp010SelectDate */
        var ntp010SelectDate    = document.forms['ntp040Form'].ntp010SelectDate.value;
        /* ntp020SelectUsrSid */
        var ntp020SelectUsrSid  = document.forms['ntp040Form'].ntp020SelectUsrSid.value;

        //日報データ取得
        $('.js_headNippou').each(function() {

            if (nippouData != "[") {
                nippouData += ",";
            }

            var ntpDspId = $(this).attr('id');

            var trId = "";

            if (ntpDspId != null && ntpDspId != "") {
                trId = "_" + ntpDspId;
            } else {
                ntpDspId = "1";
            }

            /* 時間 */
            var frhour         = $("select[name=ntp040FrHour"        + trId + "]").val();
            var frmin          = $("select[name=ntp040FrMin"         + trId + "]").val();
            var tohour         = $("select[name=ntp040ToHour"        + trId + "]").val();
            var tomin          = $("select[name=ntp040ToMin"         + trId + "]").val();
            var frTime         = encodeURIComponent($("input[name=ntp040FrTime"         + trId + "]").val());
            var toTime         = encodeURIComponent($("input[name=ntp040ToTime"         + trId + "]").val());

            /* 案件 */
            var ankenSid       = -1;
            if ($("input:hidden[name=ntp040AnkenSid" + trId + "]").val() !== undefined) {
                ankenSid = $("input[name=ntp040AnkenSid" + trId + "]").val();
            }

            /* 企業 */
            var companySid     = -1;
            if ($("input:hidden[name=ntp040CompanySid" + trId + "]").val() !== undefined) {
                companySid = $("input[name=ntp040CompanySid" + trId + "]").val();
            }

            /* 企業(拠点) */
            var companyBaseSid = -1;
            if ($("input:hidden[name=ntp040CompanyBaseSid" + trId + "]").val() !== undefined) {
                companyBaseSid = $("input[name=ntp040CompanyBaseSid" + trId + "]").val();
            }

            /* 活動分類・方法 */
            var ktbunruiSid = -1;
            var kthouhouSid = -1;
            if ($('input:hidden[name=ntp040KtBriHhuUse]').val() == 0) {
                /* 活動分類 */
                ktbunruiSid    = $("select[name=ntp040Ktbunrui"      + trId + "]").val();
                /* 活動方法 */
                kthouhouSid    = $("select[name=ntp040Kthouhou"      + trId + "]").val();
            }

            /* 見込み度 */
            var mikomido = 0;
            if ($('input:hidden[name=ntp040MikomidoUse]').val() == 0) {
                mikomido       = $("input[name=ntp040Mikomido"       + trId + "]:checked").val();
            }

            /* 背景色 */
            var bgColorStr     = $("input[name=ntp040Bgcolor"        + trId + "]:checked").val();
            /* タイトル */
            var titleStr       = encodeURIComponent($("input[name=ntp040Title"    + trId + "]").val());
            /* 内容 */
            var valueStr       = encodeURIComponent($("textarea[name=ntp040Value" + trId + "]").val());

            /* 次のアクション */
            var actDateKbn    = 0;
            var actionYear    = -1;
            var actionMonth   = -1;
            var actionDay     = -1;
            var actionDate    = "";
            var actionStr     = "";
            if ($('input:hidden[name=ntp040NextActionUse]').val() == 0) {
                /* 時間指定（次のアクション） */
                actDateKbn     = $("input[name=ntp040ActDateKbn"        + trId + "]:checked").val();

                if (actDateKbn == 1) {
                    actionYear    = $("select[name=ntp040NxtActYear"  + trId + "]").val();
                    actionMonth   = $("select[name=ntp040NxtActMonth" + trId + "]").val();
                    actionDay     = $("select[name=ntp040NxtActDay"   + trId + "]").val();
                    actionDate    = encodeURIComponent($("input[name=ntp040NxtActDate"   + trId + "]").val());
                }

                /* 次のアクション */
                actionStr       = encodeURIComponent($("textarea[name=ntp040NextAction" + trId + "]").val());
            }

            jsonStr =  "{rowId:"         +  ntpDspId        + ","
                    +  "selectUsrSid:"   +  selectUsrSid    + ","
                    +  "ntpDate:\""        +  ntpDate         + "\","
                    +  "frTime:\""         +  frTime          + "\","
                    +  "toTime:\""         +  toTime          + "\","
                    +  "ankenSid:"       +  ankenSid        + ","
                    +  "companySid:"     +  companySid      + ","
                    +  "companyBaseSid:" +  companyBaseSid  + ","
                    +  "ktbunruiSid:"    +  ktbunruiSid     + ","
                    +  "kthouhouSid:"    +  kthouhouSid     + ","
                    +  "mikomido:"       +  mikomido        + ","
                    +  "title:\""        +  titleStr        + "\","
                    +  "bgcolor:"        +  bgColorStr      + ","
                    +  "valueStr:\""     +  valueStr        + "\","
                    +  "actDateKbn:"     +  actDateKbn      + ","
                    +  "actionStr:\""    +  actionStr       +  "\","
                    +  "actionDate:\""   +  actionDate       +  "\"}";

            nippouData += jsonStr;
        });

        nippouData += "]";


        var targetData = "[";
        var targetJsonStr = "";

        $('.js_tdTarget').each(function() {

            if (targetData != "[") {
                targetData += ",";
            }

            var targetIdData  = $(this).attr('id').split("_");
            var targetYear    = targetIdData[0];
            var targetMonth   = targetIdData[1];
            var targetUsrSid  = targetIdData[2];
            var targetNtgSid  = targetIdData[3];
            var recordValue   = $('#val_'    + $(this).attr('id')).val();
            var targetValue   = $('#valTrg_' + $(this).attr('id')).text();

            targetJsonStr   =  "{year:"         +  targetYear      + ","
                            +  "month:"         +  targetMonth     + ","
                            +  "usrSid:"        +  targetUsrSid    + ","
                            +  "ntgSid:"        +  targetNtgSid    + ","
                            +  "recordStr:\""   +  recordValue     + "\","
                            +  "targetStr:\""   +  targetValue     + "\"}";

            targetData += targetJsonStr;
        });


        targetData += "]";

        if (targetJsonStr = "") {
            targetData = "";
        }

        //データ送信
        $.ajaxSetup({async:false});
        $.post('../nippou/ntp040.do', {
            "cmd":"addNtp",
            "CMD":"addNtp",
            "listMod":listMod,
            "dspMod":dspMod,
            "ntp010DspDate":ntp010DspDate,
            "ntp010DspGpSid":ntp010DspGpSid,
            "ntp010SelectDate":ntp010SelectDate,
            "ntp020SelectUsrSid":ntp020SelectUsrSid,
            "nippouData":nippouData,
            "targetData":targetData},
        function(data) {
            //添付ファイルでFileNotFoundException発生
            try {
                if ($(data).find('[name=errCause]')
                    && $(data).find('[name=errCause]').val() == 'GSAttachFileNotExistException') {
                    $('html').html('');
                    $('body').append($(data));
                    return;
                }
            } catch (ee) {
                //正常登録時のjsonをjqueryObjとして扱うとエクセプションになる
            }

            if (data != null && data != "" && data.ntpSid == null) {
                var jsonArray = eval('(' + data + ')');
                var scrollId = "";

                if (jsonArray.length > 0) {
                    //入力エラー
                    for(var i in jsonArray){
                        if (i != 0) {
                            $("#error_msg").append("<hr>");
                        }
                        if (scrollId == "") {
                            scrollId = jsonArray[i].rownum;
                        }

                        if (jsonArray[i].rownum != -1) {
                            //通常
                            var rowIdx = getViewRowNumber(jsonArray[i].rownum);
                            $("#error_msg").append("No," + jsonArray[i].rownum + "<br>");
                        } else {
                            //目標
                            $("#error_msg").append("目標<br>");
                        }

                        var errormsgs = jsonArray[i].msg;
                        for(var j in errormsgs){
                            $("#error_msg").append("<span class=\"cl_fontWarn\">" + errormsgs[j] + "</span>");
                            if (j != 1) {
                                $("#error_msg").append("<br>");
                            }
                        }
                    }

                    $('#dialog_error').dialog({
                        autoOpen: true,
                        bgiframe: true,
                        resizable: false,
                        width:500,
                        modal: true,
                        closeOnEscape: false,
                        overlay: {
                            backgroundColor: '#000000',
                            opacity: 0.5
                        },
                        buttons: {
                            OK: function() {
                                footerStart("#pos" + scrollId);
                                $(this).dialog('close');
                            }
                        }
                    });
                }
            } else {
                //登録した値を削除
                $("select[name=ntp040FrHour]").val($('#frhourhide').val());
                $("select[name=ntp040FrMin]").val($('#frminhide').val());
                $("select[name=ntp040ToHour]").val($('#tohourhide').val());
                $("select[name=ntp040ToMin]").val($('#tominhide').val());
                $("input[name=ntp040Title]").val("");
                $("textarea[name=ntp040Value]").val("");
                $("select[name=ntp040Ktbunrui]").val("-1");
                $("select[name=ntp040Kthouhou]").val("-1");
                $("input[name=ntp040Mikomido]").val(["0"]);
                $("input[name=ntp040Bgcolor]").val(["1"]);

                //登録完了
                document.forms[0].CMD.value="comp";
                document.forms[0].submit();
                return false;
            }
        });
    });


    /* 編集ボタン */
    $(document).on("click", ".js_ntpEditBtn", function(){
        var rownum = $(this).attr("id");
        var editNtpSid = $(this).parent().attr("id");

        createTempDir(rownum);
        //添付ファイルセット
        $.ajaxSetup({async:false});
        $.post('../nippou/ntp040.do', {
            "cmd":"editNtpData",
            "CMD":"editNtpData",
            "editNtpSid":editNtpSid,
            "rowNum":rownum},
        function(data) {
            if (data != null || data != "") {
                $('#attachmentFileListArea' + rownum).empty();
                for (i = 0; i < data.length; i++) {

                    //URL取得
                    var url = createDownloadUrl(data[i].value,rownum,0);

                    $('#attachmentFileListArea' + rownum).append(
                    '<div id=\"attachmentFileDetail'+ rownum + '_' + data[i].value + '\"'
                    + 'class=\"display_flex mt5\">'
                    + '<div class=\"verAlignMid\">'
                    + '<file-preview url="' + url + '" filename="' + data[i].label + '">'
                    + '<img class=\"classic-display\"'
                    + 'src=\"../common/images/classic/icon_temp_file_2.png\"'
                    + 'draggable=\"false\">'
                    + '<img class=\"original-display\"'
                    + 'src=\"../common/images/original/icon_attach.png\"'
                    + 'draggable=\"false\">'
                    + '<a href=\"#!\"'
                    + 'onClick=\"attachmentFileDownload(' + data[i].value + ', ' + rownum + ');\">'
                    + '<span class=\"textLink ml5\">' + data[i].label + '</span>'
                    + '</a>'
                    + '<img class=\"ml5 cursor_p btn_originalImg-display\"'
                    + 'src=\"../common/images/original/icon_delete.png\"'
                    + 'onClick=\"attachmentDeleteFile(' + data[i].value + ', ' + rownum + ');\"'
                    + 'draggable=\"false\">'
                    + '<img class=\"ml5 cursor_p btn_classicImg-display\"'
                    + 'src=\"../common/images/classic/icon_delete.png\"'
                    + 'onClick=\"attachmentDeleteFile(' + data[i].value + ', ' + rownum + ');\"'
                    + 'draggable=\"false\">'
                    + '</file-preview>'
                    + '</div>'
                    + '</div>'
                    );
                }
            }
        });

        //表示切替
        toggleDsp(rownum);

        //内容文字数カウント
        showLengthId($('#inputstr_' + rownum)[0], 1000, 'inputlength' + rownum);

        //次のアクション文字数カウント
        if ($('#actionstr_' + rownum)[0] != null) {
            showLengthId($('#actionstr_' + rownum)[0], 1000, 'actionlength' + rownum);
        }

    });


    /* 確定ボタン */
    $(document).on("click", ".js_ntpEditKakuteiBtn", function(){

        var thisObj       = $(this);
        var rownum        = $(this).attr("id");
        var changeNtpSid  = $(this).parent().attr("id");
        var trId          = "_" + rownum;
        var canselJsonStr = ""
        var dateChangeFlg = false;
        var prmCmd        = "editNtp";
        var dialogName    = "dialogEditOk";

        if (changeNtpSid == -1) {
            //確認画面で行追加した場合は新規登録処理にする
            prmCmd      = "addNtp";
            dialogName  = "dialogAddOk";
        }

        $('#' + dialogName).dialog({
            autoOpen: true,
            bgiframe: true,
            resizable: false,
            height: 180,
            modal: true,
            closeOnEscape: false,
            overlay: {
                backgroundColor: '#000000',
                opacity: 0.5
            },
            buttons: {
                はい: function() {

                    /* listMod */
                    var listMod             = document.forms['ntp040Form'].listMod.value;
                    /* dspMod */
                    var dspMod              = document.forms['ntp040Form'].dspMod.value;
                    /* ntp010DspDate */
                    var ntp010DspDate       = document.forms['ntp040Form'].ntp010DspDate.value;
                    /* ntp010DspGpSid */
                    var ntp010DspGpSid      = document.forms['ntp040Form'].ntp010DspGpSid.value;
                    /* ntp010SelectUsrKbn */
                    var ntp010SelectUsrKbn  = document.forms['ntp040Form'].ntp010SelectUsrKbn.value;
                    /* ntp010SelectDate */
                    var ntp010SelectDate    = document.forms['ntp040Form'].ntp010SelectDate.value;
                    /* ntp020SelectUsrSid */
                    var ntp020SelectUsrSid  = document.forms['ntp040Form'].ntp020SelectUsrSid.value;

                    //データ送信
                    $.ajaxSetup({async:false});
                    $.post('../nippou/ntp040.do', {
                        "cmd":prmCmd,
                        "CMD":prmCmd,
                        "ntp010NipSid":changeNtpSid,
                        "listMod":listMod,
                        "dspMod":dspMod,
                        "ntp010DspDate":ntp010DspDate,
                        "ntp010DspGpSid":ntp010DspGpSid,
                        "ntp010SelectDate":ntp010SelectDate,
                        "ntp020SelectUsrSid":ntp020SelectUsrSid,
                        "nippouData":createJsonData(thisObj, 1)},
                    function(data) {
                        //添付ファイルでFileNotFoundException発生
                        try {
                            if ($(data).find('[name=errCause]')
                                && $(data).find('[name=errCause]').val() == 'GSAttachFileNotExistException') {
                                $('html').html('');
                                $('body').append($(data));
                                return;
                            }
                        } catch (ee) {
                            //正常登録時のjsonをjqueryObjとして扱うとエクセプションになる
                        }

                        if (data != null && data != "" && data.ntpSid == null) {

                            var jsonArray = eval('(' + data + ')');
                            var scrollId = "";

                            if (jsonArray.length > 0) {
                                //入力エラー
                                for(var i in jsonArray){
                                    if (scrollId == "") {
                                        scrollId = jsonArray[i].rownum;
                                    }

                                    var rowIdx = getViewRowNumber(jsonArray[i].rownum);
                                    $("#error_msg").append("<b>" + rowIdx + "</b>");

                                    var errormsgs = jsonArray[i].msg;
                                    for(var j in errormsgs){
                                        $("#error_msg").append("<span class=\"cl_fontWarn\">" + errormsgs[j] + "</span>");
                                    }
                                }
                                $('.ui-dialog-content').dialog('close');
                                $('#dialog_error').dialog({
                                    autoOpen: true,
                                    bgiframe: true,
                                    resizable: false,
                                    width:500,
                                    modal: true,
                                    closeOnEscape: false,
                                    overlay: {
                                        backgroundColor: '#000000',
                                        opacity: 0.5
                                    },
                                    buttons: {
                                        OK: function() {
                                            footerStart("#pos" + scrollId);
                                            $(this).dialog('close');
                                        }
                                    }
                                });
                            }

                        } else {

                            var changeNtpFlg = 0;

                            if (changeNtpSid == -1) {
                                changeNtpSid = data.ntpSid;
                                changeNtpFlg = 1;
                            }

                            //日付変更チェック
                            dateChangeFlg = ChangeDateCheck(rownum);

                            if (dateChangeFlg) {
                                $('.ui-dialog-content').dialog('close');
                                //日付変更後画面遷移確認
                                $('#dspMoveOk').dialog({
                                    autoOpen: true,  // hide dialog
                                    bgiframe: true,   // for IE6
                                    resizable: false,
                                    height: 180,
                                    modal: true,
                                    overlay: {
                                        backgroundColor: '#000000',
                                        opacity: 0.5
                                    },
                                    buttons: {
                                        はい: function() {

                                            //遷移先の日付を取得
                                            var chDateStr = $("#selDate"  + rownum).val();

                                            var chDate = new Date(chDateStr);
                                            var chYear  = chDate.getFullYear();
                                            var chMonth = ("00" + (chDate.getMonth() + 1)).slice(-2);
                                            var chDay = ("00" + (chDate.getDate())).slice(-2);

                                            var chNtpDate = chYear + chMonth + chDay;

                                            editNippou('edit', chNtpDate, changeNtpSid, 0);
                                            $(this).dialog('close');

                                        },
                                        いいえ: function() {
                                            //登録完了 データ再設定
                                            getResetData(trId, changeNtpSid, rownum, canselJsonStr);
                                            //表示切替
                                            toggleDsp(rownum);

                                            //画面から削除
                                            $('.js_nippouData_' + rownum).remove();

                                            $(this).dialog('close');
                                        }
                                    }
                                });

                            } else {

                                if (changeNtpFlg == 1) {
                                    //新規登録時は日報SIDを取得
                                    changeNtpSid = data.ntpSid;
                                    //日報のヘッダー部分を書き換え
                                    rewriteNtpHeader(changeNtpSid, rownum);
                                }

                                //登録完了 データ再設定
                                getResetData(trId, changeNtpSid, rownum, canselJsonStr);
                                toggleDsp(rownum);

                                //日報未登録メッセージ削除
                                if ($('.js_ntpEmptyArea').attr('id') != null) {
                                    $('.js_ntpEmptyArea').remove();
                                }
                            }
                        }
                    });
                    $(this).dialog('close');
                },
                いいえ: function() {
                    $(this).dialog('close');
                }
            }
        });
    });


    /* 編集キャンセルボタン */
    $(document).on("click", ".js_ntpEditCancelBtn", function(){

        var rownum = $(this).attr("id");
        var trId   = "_" + $(this).attr("id");

        //編集前データ取得
        //日報SID
        var ntpSid = $(this).parent().attr("id");

        //行番号
        var rownum = $(this).parent().parent().parent().parent().attr("id");

        //添付ファイル削除
        var selectfiles = "";
        if ($('input:hidden[name=ntp040TmpFileUse]').val() == 0) {
            var sel = $('#attachmentFileListArea div');
            for (var i = 0; i < sel.length; i++) {
                selectfiles += "\"" + sel.eq(i).find(".textLink").text() + "\"" + ",";
            }
            var canselJsonStr="";
            if (selectfiles != null && selectfiles != "") {
                canselJsonStr = '[' + selectfiles + ']';
            }
        }
        //データ再設定
        getResetData(trId, ntpSid, rownum, canselJsonStr);

        //表示切替
        toggleDsp(rownum);
    });


    /* 複写して登録ボタン */
    $(document).on("click", ".js_ntpCopyBtn", function(){

        var copyNtpSid = $(this).attr("id");

        var mitourokuFlg = false;
        var mikakuteiFlg = false;
        var notAddPoint = 0;
        var notEditPoint = 0;

        $(".edit_touroku_class").each(function() {
            mitourokuFlg = true;
            notAddPoint = $(this).offset().top;
        });


        $(".js_ntpCopyBtn").each(function() {
            if ($(this).parent().css('display') == 'none') {
                mikakuteiFlg = true;
                notEditPoint = $(this).parent().parent().offset().top;
            }
        });

        //未登録,未確定の日報がある場合はメッセージを表示
        if (mitourokuFlg) {

            addDialogOpen('copy', 'copy', mikakuteiFlg, notAddPoint, notEditPoint, copyNtpSid);

        } else if (mikakuteiFlg, notEditPoint) {

            editDialogOpen('copy', 'copy', notEditPoint, copyNtpSid);

        } else {
            document.forms[0].ntp010NipSid.value=copyNtpSid;
            buttonPush('copy', 'copy');
        }

    });

    /* 添付ファイル削除ボタン */
    $(document).on("click", ".js_tempDelBtn", function(){

        var rownum = $(this).attr("id");


        //選択ファイル取得
        var selectfiles = $('select[name=ntp040selectFiles' + rownum + ']').val();

        if (selectfiles != null && selectfiles != "") {
            jsonStr = '[' + selectfiles + ']';

            //データ送信
            $.ajaxSetup({async:false});
            $.post('../nippou/ntp040.do', {
                "cmd":"tempdel",
                "CMD":"tempdel",
                "rowNum":rownum,
                "nippouTempData":jsonStr},
            function(data) {
                if (data == null || data == "") {
                    //option要素削除
                    $('select[name=ntp040selectFiles' + rownum + '] option:selected').remove();
                }
            });
        }
    });

    //案件名クリック
    $(document).on("click", ".js_anken_click", function(){
        var ankenSid = $(this).attr("id");
        openSubWindow("../nippou/ntp210.do?ntp210NanSid=" + ankenSid);
    });

    //企業名クリック
    $(document).on("click", ".js_compClick", function(){
        var compSid = $(this).attr("id");
        openSubWindow("../address/adr250.do?adr250AcoSid=" + compSid);
    });

    //スケジュール詳細ボタン
    $(document).on("click", ".js_schDetailBtn", function(){
        var schSid = $(this).attr("id");
        openSubWindow("../schedule/sch210.do?sch010SelectUsrKbn=0&sch010SchSid=" + schSid);
    });

    //TODO詳細ボタン
    $(document).on("click", ".js_prjDetailBtn", function(){
        var paramStr = $(this).attr('id').split("_");
        var prjSid = paramStr[0];
        var todoSid = paramStr[1];
        openSubWindowSet("../project/prj230.do?prj060prjSid=" + prjSid + "&prj060todoSid=" + todoSid, 700, 790);
    });

    //コンタクト履歴詳細ボタン
    $(document).on("click", ".js_contDetailBtn", function(){
        var paramStr = $(this).attr('id').split("_");
        var adcSid = paramStr[0];
        var adrSid = paramStr[1];
        openSubWindow("../address/adr162.do?adr160EditSid=" + adcSid + "&adr010EditAdrSid=" + adrSid);
    });

    //見込み度基準ボタン
    $(".js_mikomidoBtn").on("click", function(){
        $('#mikomidoPop').dialog({
            autoOpen: true,
            bgiframe: true,
            resizable: false,
            width:400,
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
    });

    /* 見込み度基準 hover */
    $('.mikomido_back').on({
        mouseenter:function () {
            $(this).addClass("mikomido_back_hover");
        },
        mouseleave:function () {
            $(this).removeClass("mikomido_back_hover");
        }
    });

    /* いいねボタン */
    $(".js_goodLink").on("click", function(){

        var goodNtpSid = $(this).attr('id');

        //いいねをしているか確認
        $.ajaxSetup({async:false});
        $.post('../nippou/ntp030.do', {
            "cmd":"addGood",
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
                                var goodBtnStr = "<span class=\"js_textAlreadyGood fs_12 fw_b\">いいね!しています</span>";
                                $('.js_goodBtnArea_' + goodNtpSid).html('');
                                $('.js_goodBtnArea_' + goodNtpSid).html(goodBtnStr);
                                $('.js_goodCount_' + goodNtpSid).html('');
                                $('.js_goodCount_' + goodNtpSid).html(gdata.cnt);
                                $('.js_goodCount_' + goodNtpSid).parent().data("count", gdata.cnt);
                            }
                        });
                }
            }
        });
    });

    /* いいねしてる人リンク */
    $(".js_textGood").on("click", function(){
        var thisEle = $(this);
        var goodAddNtpSid = $(this).attr('id');
        var ntpGoodCnt = $(this).data("count");
        if ($(this).data("count") != 0) {
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
                                        goodAddUsrImgStr += "<img src=\"../common/images/classic/icon_photo.gif\" name=\"pitctImage\" class=\"classic-display wp50\" alt=\"写真\" >"
                                                    +  "<img src=\"../common/images/original/photo.png\" name=\"pitctImage\" class=\"original-display wp50\" alt=\"写真\" >";
                                    } else {
                                        //写真なし 非公開
                                        goodAddUsrImgStr += "<div class=\"hikokai_photo-m txt_c\">"
                                                    +  "<span class=\"cl_fontWarn\">非公開</span>"
                                                    +  "</div>";
                                    }
                                } else {
                                    if (gudata[u].usrMdl.usiPictKf == "0") {
                                        //写真あり 公開
                                        goodAddUsrImgStr += "<img class=\"wp50\" src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid=" + gudata[u].usrMdl.binSid + "\" alt=\"写真\" />";
                                    } else {
                                        //写真あり 非公開
                                        goodAddUsrImgStr += "<div class=\"hikokai_photo-m txt_c\">"
                                                    +  "<span class=\"cl_fontWarn\">非公開</span>"
                                                    +  "</div>";
                                    }
                                }

                                //imgタグ文字列
                                var goodDelStr = "";
                                if (gudata[u].goodDelFlg == 1) {
                                    goodDelStr = "いいね!を取り消す";
                                }
                                var mukoUserClass="";
                                if (gudata[u].usrMdl.usrUkoFlg == 1) {
                                    mukoUserClass="mukoUser";
                                }
                            goodAddUsrInfstr   += "<table class=\"w100 borC_light bor_b1\">"
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
                width:400,
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
    $("#goodAddUsrClose").on("click", function(){
        Glayer.hide();
        $("#goodUsrInfArea")[0].style.display="none";
        $("#goodUsrInfArea2").html("");
    });

    //いいね取り消し
    $(document).on("click", ".goodDelLink", function(){

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
                    var goodBtnStr  = "<button type=\"button\" id=\"" + goodNtpSid + "\" class=\"baseBtn ntp_goodButton js_goodLink\" value=\"いいね!\">"
                                    + "いいね!"
                                    + "</button>";
                    $('.js_goodBtnArea_' + goodNtpSid).html('');
                    $('.js_goodBtnArea_' + goodNtpSid).html(goodBtnStr);
                    $('.js_goodCount_' + goodNtpSid).html('');
                    $('.js_goodCount_' + goodNtpSid).html(gdata.cnt);
                    $('.js_goodCount_' + goodNtpSid).parent().data("count", gdata.cnt);
                }
            });

        Glayer.hide();
        $("#goodUsrInfArea")[0].style.display="none";
        $("#goodUsrInfArea2").html("");
    });

    /* アドレス履歴ポップアップ */
    $(document).on("click", ".js_adrHistoryPop", function(){

        var rowNumber = $(this).prop('id');
        var pageNum   = $("input:hidden[name='ntp040AdrHistoryPageNum']").val();

        $('#adrHistoryArea').children().remove();

        /* ユーザ一覧ポップアップ */
        $('#adrHistoryPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 550,
            width: 400,
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

        //ユーザ一覧成形
        getAdrHistoryList(rowNumber, pageNum);
    });

    //アドレス履歴 次ページクリック
    $(document).on("click", ".js_nextPageBtn",function(){
        var paramStr = $(this).attr('id').split(":");

        getAdrHistoryList(paramStr[0], parseInt(paramStr[1]) + 1);
    });

    //アドレス履歴 前ページクリック
    $(document).on("click", ".js_prevPageBtn", function(){
        var paramStr = $(this).attr('id').split(":");


        getAdrHistoryList(paramStr[0], parseInt(paramStr[1]) - 1);
    });

    //アドレス履歴 コンボ変更
    $(document).on("change", ".js_selchange", function(){
        getAdrHistoryList($(this).attr('id'), $(this).val());
    });


    /* 案件履歴ポップアップ */
    $(document).on("click", ".js_ankenHistoryPop", function(){

        var rowNumber = $(this).prop('id');
        var pageNum   = $("input:hidden[name='ntp040AnkenHistoryPageNum']").val();

        $('#ankenHistoryArea').children().remove();

        /* 案件一覧ポップアップ */
        $('#ankenHistoryPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 550,
            width: 400,
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

        //ユーザ一覧成形
        getAnkenHistoryList(rowNumber, pageNum);
    });

    //案件履歴 次ページクリック
    $(document).on("click", ".js_nextAnkenPageBtn", function(){
        var paramStr = $(this).attr('id').split(":");

        getAnkenHistoryList(paramStr[0], parseInt(paramStr[1]) + 1);
    });

    //案件履歴 前ページクリック
    $(document).on("click", ".js_prevAnkenPageBtn", function(){
        var paramStr = $(this).attr('id').split(":");


        getAnkenHistoryList(paramStr[0], parseInt(paramStr[1]) - 1);
    });

    //案件履歴 コンボ変更
    $(document).on("change", ".js_selchangeAnken", function(){
        getAnkenHistoryList($(this).attr('id'), $(this).val());
    });


    //スケジュールデータ取得
    $(".js_schDataGetBtn").on("click", function(){

        var schUsrSid = document.forms['ntp040Form'].ntp010SelectUsrSid.value;

        var year  = $('input:hidden[name=ntp040InitYear]').val();
        var month = $('input:hidden[name=ntp040InitMonth]').val();
        var day   = $('input:hidden[name=ntp040InitDay]').val();


        if (month.length < 2) {
            month = "0" + month;
        }

        if (day.length < 2) {
            day = "0" + day;
        }

        var schDspDate = year + month + day;


        //スケジュールデータ取得
        $.ajaxSetup({async:false});
        $.post('../nippou/ntp040.do', {
            "cmd":"getSchDataList",
            "CMD":"getSchDataList",
            "schUsrSid":schUsrSid,
            "schDspDate":schDspDate},
            function(data) {
                if (data != null || data != "") {

                    var schDataStr = "";

                    if (data.length > 0) {

                        for (i = 0; i < data.length; i++) {

                            var schTime = "";
                            if (data[i].scdTime == "") {
                                schTime = "時間指定なし";
                            } else {
                                schTime = data[i].scdTime;
                            }

                            //スケジュール区分
                            var grpStr ="";
                            if (data[i].scdKbn != "0") {
                                grpStr = "<span class=\"cal_label-g classic-display mr5\">G</span><span class=\"cal_label-g original-display\"></span>";
                            }

                            schDataStr += "<tr id=\"tr_" + data[i].scdSid + "\">"
                                        + "<td onclick=\"clickSchName(3," + data[i].scdSid + ");\" class=\"cursor_p w5 border_left_none\">"
                                        + "<input type=\"checkbox\" name=\"popSchedule\" value=\"" + data[i].scdSid + "\" onclick=\"clickMulti();\">"
                                        + "</td>"
                                        + "<td onclick=\"clickSchName(3," + data[i].scdSid + ");\" class=\"w15 txt_c no_w cursor_p\">" + schTime + "</td>"
                                        + "<td onclick=\"clickSchName(3," + data[i].scdSid + ");\" class=\"w75 border_right_none cursor_p\">" + grpStr + data[i].scdTitle + "</td>"
                                        + "<td class=\"w5 no_w border_left_none border_right_none\">"
                                        + "<button type=\"button\" id=\"" + data[i].scdSid + "\" class=\"baseBtn js_schDetailBtn\">詳細</button>"
                                        + "</span>"
                                        + "</td>"
                                        + "</tr>";

                        }

                    } else {
                        schDataStr += "<tr>"
                        + "<td class=\"txt_c no_w border_left_none\" colspan=\"4\">"
                        + "<span class=\"cl_fontWarn fw_b\">該当するスケジュールがありません。</span>"
                        + "</td>"
                        + "</tr>";
                    }

                    $('#schDataTrArea').html(schDataStr);

                    /* スケジュール選択画面ポップアップ */
                    $('#schDataPop').dialog({
                        autoOpen: true,  // hide dialog
                        bgiframe: true,   // for IE6
                        resizable: false,
                        height: 400,
                        width: 500,
                        modal: true,
                        overlay: {
                            backgroundColor: '#000000',
                            opacity: 0.5
                        },
                        buttons: {
                            選択: function() {

                                //選択値取得
                                var scheduleList   = $("input:checkbox[name='popSchedule']:checked");
                                //データ記述行番号(先頭)
                                var addRow = 0;
                                //データ記述行番号
                                var selAddRow = 0;
                                //データ記述行識別文字
                                var selRowNum = "";

                                //画面表示
                                for (var j = 0; j < scheduleList.length; j++) {


                                    //スケジュールデータ取得
                                    $.ajaxSetup({async:false});
                                    $.post('../nippou/ntp040.do', {
                                        "cmd":"getSchSelectData",
                                        "CMD":"getSchSelectData",
                                        "selSchSid":scheduleList[j].value},
                                        function(schData) {
                                            if (schData != null || schData != "") {

                                                //データを入力する行をさがす

                                                for (i = 1; i <= row_number; i++) {

                                                    if (selAddRow == 0) {
                                                        if (i != 1) {
                                                            selRowNum = "_" + i;
                                                        }

                                                        if ($('input[name=ntp040Title' + selRowNum + ']').val() == "") {
                                                            //タイトルが入力されていない場合はデータ入力
                                                            if (selAddRow == 0) {
                                                                selAddRow = i;
                                                            }
                                                        } else {
                                                            //データを入力できる行がない場合は行追加
                                                            if (i == row_number && selAddRow == 0) {
                                                                addNewRow();
                                                                selAddRow = row_number;
                                                            }
                                                        }
                                                    }
                                                }

                                                var trId = "";
                                                if (selAddRow > 1) {
                                                    trId = "_" + selAddRow;
                                                }

                                                $('input[name=ntp040Title'   + trId + ']').val(schData.title);
                                                $('input[name=ntp040Bgcolor' + trId + '][value=\"' + schData.bgcolor + '\"]').prop("checked", true);

                                                var frHour = schData.frHour;
                                                if (frHour < 10) {
                                                    frHour = "0" + frHour;
                                                }
                                                var frMin = schData.frMin;
                                                if (frMin < 10) {
                                                    frMin = "0" + frMin;
                                                }
                                                var toHour = schData.toHour;
                                                if (toHour < 10) {
                                                    toHour = "0" + toHour;
                                                }
                                                var toMin = schData.toMin;
                                                if (toMin < 10) {
                                                    toMin = "0" + toMin;
                                                }
                                                $('input[name=ntp040FrTime' + trId + ']').val(frHour + ":" + frMin);
                                                $('input[name=ntp040ToTime' + trId + ']').val(toHour + ":" + toMin);

                                                //企業・顧客
                                                setCompanyData(schData, trId);
                                            }
                                        });

                                    if (addRow == 0) {
                                        addRow = selAddRow;
                                    }
                                    selAddRow = 0;

                                }
                                $(this).dialog('close');
                                footerStart("#pos" + addRow);
                            },
                            ｷｬﾝｾﾙ: function() {

                                //表示項目をリセット
                                resetScheduleObj();
                                $(this).dialog('close');
                            }
                        }
                    });
                }
            });
    });

    //TODOデータ取得
    $(".js_prjDataGetBtn").on("click", function(){

        var prjUsrSid = document.forms['ntp040Form'].ntp010SelectUsrSid.value;

        var year  = $('input:hidden[name=ntp040InitYear]').val();
        var month = $('input:hidden[name=ntp040InitMonth]').val();
        var day   = $('input:hidden[name=ntp040InitDay]').val();

        if (month.length < 2) {
            month = "0" + month;
        }

        if (day.length < 2) {
            day = "0" + day;
        }

        var prjDspDate = year + month + day;

        //プロジェクトTODO取得
        $.ajaxSetup({async:false});
        $.post('../nippou/ntp040.do', {
            "cmd":"getPrjDataList",
            "CMD":"getPrjDataList",
            "prjUsrSid":prjUsrSid,
            "prjDspDate":prjDspDate},
            function(data) {
                if (data != null || data != "") {

                    var prjDataStr = "";

                    if (data.length > 0) {

                        for (i = 0; i < data.length; i++) {

                            prjDataStr += "<tr id=\"tr_" + data[i].prjSid + "_" + data[i].todoSid + "\">"
                                        + "<td onclick=\"clickSchName(3," + "'" + data[i].prjSid + "_" + data[i].todoSid + "'" + ");\" class=\"cursor_p w5 border_left_none\">"
                                        + "<input type=\"checkbox\" name=\"popProject\" value=\"" + data[i].prjSid + "_" + data[i].todoSid + "\" onclick=\"clickMulti();\">"
                                        + "</td>"
                                        + "<td onclick=\"clickSchName(3," + "'" + data[i].prjSid + "_" + data[i].todoSid + "'" + ");\" class=\"w15 txt_c no_w cursor_p\">" + data[i].prjStartDate + "</td>"
                                        + "<td onclick=\"clickSchName(3," + "'" + data[i].prjSid + "_" + data[i].todoSid + "'" + ");\" class=\"w75 border_right_none cursor_p\">" + data[i].prjTitle + "</td>"
                                        + "<td class=\"w5 no_w border_left_none\">"
                                        + "<button type=\"button\" id=\"" + data[i].prjSid + "_" + data[i].todoSid + "\" class=\"baseBtn js_prjDetailBtn\">詳細</button>"
                                        + "</td>"
                                        + "</tr>";
                        }
                    } else {
                        prjDataStr += "<tr>"
                        + "<td class=\"txt_c no_w border_left_none\" colspan=\"4\">"
                        + "<span class=\"cl_fontWarn fw_b\">該当するTODOがありません。</span>"
                        + "</td>"
                        + "</tr>";
                    }

                    $('#prjDataTrArea').html(prjDataStr);

                    /* TODO選択画面ポップアップ */
                    $('#prjDataPop').dialog({
                        autoOpen: true,  // hide dialog
                        bgiframe: true,   // for IE6
                        resizable: false,
                        height: 400,
                        width: 500,
                        modal: true,
                        overlay: {
                            backgroundColor: '#000000',
                            opacity: 0.5
                        },
                        buttons: {
                            選択: function() {

                                //選択値取得
                                var projectList   = $("input:checkbox[name='popProject']:checked");
                                //データ記述行番号(先頭)
                                var addRow = 0;
                                //データ記述行番号
                                var selAddRow = 0;
                                //データ記述行識別文字
                                var selRowNum = "";


                                //画面表示
                                for (var j = 0; j < projectList.length; j++) {


                                    //プロジェクトTODO取得
                                    $.ajaxSetup({async:false});
                                    $.post('../nippou/ntp040.do', {
                                        "cmd":"getPrjSelectData",
                                        "CMD":"getPrjSelectData",
                                        "selPrjTodoSid":projectList[j].value},
                                        function(prjData) {
                                            if (prjData != null || prjData != "") {

                                                //データを入力する行をさがす
                                                for (i = 1; i <= row_number; i++) {

                                                    if (selAddRow == 0) {
                                                        if (i != 1) {
                                                            selRowNum = "_" + i;
                                                        }

                                                        if ($('input[name=ntp040Title' + selRowNum + ']').val() == "") {
                                                            //タイトルが入力されていない場合はデータ入力
                                                            if (selAddRow == 0) {
                                                                selAddRow = i;
                                                            }
                                                        } else {
                                                            //データを入力できる行がない場合は行追加
                                                            if (i == row_number && selAddRow == 0) {
                                                                addNewRow();
                                                                selAddRow = row_number;
                                                            }
                                                        }
                                                    }
                                                }

                                                var trId = "";
                                                if (selAddRow > 1) {
                                                    trId = "_" + selAddRow;
                                                }

                                                $('input[name=ntp040Title'   + trId + ']').val(prjData.title);

                                            }
                                        });

                                    if (addRow == 0) {
                                        addRow = selAddRow;
                                    }
                                    selAddRow = 0;

                                }
                                $(this).dialog('close');
                                footerStart("#pos" + addRow);
                            },
                            ｷｬﾝｾﾙ: function() {

                                //表示項目をリセット
                                resetProjectObj();
                                $(this).dialog('close');
                            }
                        }
                    });
                }
            });
    });

    //コンタクト履歴データ取得
    $(".js_contDataGetBtn").on("click", function(){

        var contUsrSid = document.forms['ntp040Form'].ntp010SelectUsrSid.value;

        var year  = $('input:hidden[name=ntp040InitYear]').val();
        var month = $('input:hidden[name=ntp040InitMonth]').val();
        var day   = $('input:hidden[name=ntp040InitDay]').val();


        if (month.length < 2) {
            month = "0" + month;
        }

        if (day.length < 2) {
            day = "0" + day;
        }

        var contDspDate = year + month + day;

        //コンタクト履歴データ取得
        $.ajaxSetup({async:false});
        $.post('../nippou/ntp040.do', {
            "cmd":"getContactDataList",
            "CMD":"getContactDataList",
            "contUsrSid":contUsrSid,
            "contDspDate":contDspDate},
            function(data) {
                if (data != null || data != "") {
                    var contDataStr = "";

                    if (data.length > 0) {

                        for (i = 0; i < data.length; i++) {
                            var dataSid  = data[i].adcSid + "_" + data[i].adrSid;

                            contDataStr += "<tr id=\"tr_" + dataSid + "\">"
                                        + "<td onclick=\"clickSchName(3,'" + dataSid + "');\" class=\"cursor_p w5 border_left_none\">"
                                        + "<input type=\"checkbox\" name=\"popContact\" value=\"" + data[i].adcSid + "\" onclick=\"clickMulti();\">"
                                        + "</td>"
                                        + "<td onclick=\"clickSchName(3,'" + dataSid + "');\" class=\"w15 txt_c no_w cursor_p\">" + data[i].adcTime + "</td>"
                                        + "<td onclick=\"clickSchName(3,'" + dataSid + "');\" class=\"w75 border_right_none cursor_p\">" + data[i].adcTitle + "</td>"
                                        + "<td class=\"w5 no_w border_left_none border_right_none\">"
                                        + "<button type=\"button\" id=\"" + dataSid + "\" class=\"baseBtn js_contDetailBtn\">詳細</button>"
                                        + "</span>"
                                        + "</td>"
                                        + "</tr>";
                        }

                    } else {
                        contDataStr += "<tr>"
                            + "<td class=\"txt_c no_w border_left_none\" colspan=\"4\">"
                            + "<span class=\"cl_fontWarn fw_b\">該当するコンタクト履歴がありません。</span>"
                            + "</td>"
                            + "</tr>";
                    }

                    $('#contDataTrArea').html(contDataStr);

                    /* コンタクト履歴選択画面ポップアップ */
                    $('#contDataPop').dialog({
                        autoOpen: true,  // hide dialog
                        bgiframe: true,   // for IE6
                        resizable: false,
                        height: 400,
                        width: 500,
                        modal: true,
                        overlay: {
                            backgroundColor: '#000000',
                            opacity: 0.5
                        },
                        buttons: {
                            選択: function() {
                                //選択値取得
                                var contactList = $("input:checkbox[name='popContact']:checked");
                                //データ記述行番号(先頭)
                                var addRow = 0;
                                //データ記述行番号
                                var selAddRow = 0;
                                //データ記述行識別文字
                                var selRowNum = "";

                                //画面表示
                                for (var j = 0; j < $(contactList).length; j++) {

                                    //コンタクト履歴データ取得
                                    $.ajaxSetup({async:false});
                                    $.post('../nippou/ntp040.do', {
                                        "cmd":"getContactSelectData",
                                        "CMD":"getContactSelectData",
                                        "contDspDate":contDspDate,
                                        "selAdrContSid":contactList[j].value},
                                        function(contData) {
                                            if (contData != null || contData != "") {

                                                //データを入力する行をさがす

                                                for (i = 1; i <= row_number; i++) {

                                                    if (selAddRow == 0) {
                                                        if (i != 1) {
                                                            selRowNum = "_" + i;
                                                        }

                                                        if ($('input[name=ntp040Title' + selRowNum + ']').val() == "") {
                                                            //タイトルが入力されていない場合はデータ入力
                                                            if (selAddRow == 0) {
                                                                selAddRow = i;
                                                            }
                                                        } else {
                                                            //データを入力できる行がない場合は行追加
                                                            if (i == row_number && selAddRow == 0) {
                                                                addNewRow();
                                                                selAddRow = row_number;
                                                            }
                                                        }
                                                    }
                                                }

                                                var trId = "";
                                                if (selAddRow > 1) {
                                                    trId = "_" + selAddRow;
                                                }

                                                $('input[name=ntp040Title'   + trId + ']').val(contData.title);
                                                $('select[name=ntp040FrHour' + trId + ']').val(contData.frHour);
                                                $('select[name=ntp040FrMin' + trId + ']').val(contData.frMin);
                                                $('select[name=ntp040ToHour' + trId + ']').val(contData.toHour);
                                                $('select[name=ntp040ToMin' + trId + ']').val(contData.toMin);

                                                //企業・顧客
                                                setCompanyData(contData, trId);
                                            }
                                        });

                                    if (addRow == 0) {
                                        addRow = selAddRow;
                                    }
                                    selAddRow = 0;

                                }
                                $(this).dialog('close');
                                footerStart("#pos" + addRow);
                            },
                            キャンセル: function() {

                                //表示項目をリセット
                                $(this).dialog('close');
                            }
                        }
                    });
                }
            });
    });

    footerStart("#initSelect");

    if ($('#inputstr')[0] != null) {
        showLengthId($('#inputstr')[0], 1000, 'inputlength');
    }

    if ($('#actionstr')[0] != null) {
        showLengthId($('#actionstr')[0], 1000, 'actionlength');
    }

});



//行追加(新規登録時)
function addNewRow(){

    // 最終行の要素を取得
    row_number = getLastRowNumber();

    //前の日報で設定されている終了時を取得
    var toRowId = "";
    var nextFromHour = "";
    var nextToHour   = "";
    var nextFromMin  = "";
    var nextToMin    = "";

    if ( row_number != 1) {
        toRowId = "_" + row_number;
    }

    re = new RegExp(/(\d{1,2})\:(\d{1,2})/);

    var frTime = $("input[name=ntp040FrTime" + toRowId + "]").val();
    if (frTime.match(re)) {
        nextFromHour = parseInt(frTime.split(":")[0]);
    }

    var toTime = $("input[name=ntp040ToTime" + toRowId + "]").val();
    if (toTime.match(re)) {
        nextToHour = parseInt(toTime.split(":")[0]);
        nextToMin  = parseInt(toTime.split(":")[1]);
        nextFromMin = parseInt(toTime.split(":")[1]);
    }

    if (nextFromHour >= 33) {
        nextFromHour = 33;
    }

    if (nextToHour >= 33) {
        nextToHour = 33;
    }

    var td_class = 'td_wt';
    row_number++;

    // 時分初期値
    var frHourSelect    = $('#frhourhide').val();
    var toHourSelect    = $('#tohourhide').val();
    var frMinSelect     = $('#frminhide').val();
    var toMinSelect     = $('#tominhide').val();

    /* option 時 */
    var frhourOptionStr = "";
    var tohourOptionStr = "";

    if (nextFromHour !== "" && !isNaN(nextFromHour)) {
        frHourSelect = nextToHour;
    }

    if (nextToHour !== "" && !isNaN(nextToHour)) {
        toHourSelect = nextToHour + 1;
    }

    var frTimeStr = ("00" + (frHourSelect)).slice(-2) + ":" + ("00" + (nextFromMin)).slice(-2)
    var toTimeStr = ("00" + (toHourSelect)).slice(-2) + ":" + ("00" + (nextFromMin)).slice(-2)

    nextToHour   = parseInt(nextFromHour) + 1;
    nextToMin    = parseInt(nextFromMin);


    /* 案件       企業・顧客 */
    var ankenCompanyStr = "";
    var noAnkenCompanyStr= "";
    if ($('input:hidden[name=ntp040AnkenCompanyUse]').val() == 0) {
        //両方
        ankenCompanyStr = "<tr>"
                        + "<th class=\"w20\">案件</th>"
                        + "<td class=\"w30 txt_t\">"
                        + "<div>"
                        + "<button type=\"button\" class=\"baseBtn\" onclick=\"return openAnkenWindow('ntp040','" + row_number + "')\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_search.png\" alt=\"案件検索\">"
                        + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_search.png\" alt=\"案件検索\">"
                        + "&nbsp;案件検索"
                        + "</button>&nbsp;"
                        + "<button type=\"button\" id=\"" + row_number + "\" class=\"baseBtn js_ankenHistoryPop\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_clock.png\" alt=\"履歴\">"
                        + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_log_18.png\" alt=\"履歴\">"
                        + "&nbsp;履歴"
                        + "</button>"
                        + "</div>"
                        + "<div id=\"ntp040AnkenIdArea_"   + row_number + "\"></div>"
                        + "<div id=\"ntp040AnkenCodeArea_" + row_number + "\"></div>"
                        + "<div id=\"ntp040AnkenNameArea_" + row_number + "\"></div>"
                        + "</td>"

                        + "<th class=\"w20\">企業・顧客</th>"
                        + "<td class=\"w30 txt_t\">"
                        + "<button type=\"button\" class=\"baseBtn\" onclick=\"return openCompanyWindow2('ntp040'," + row_number + ");\">"
                        + "<img class=\"btn_classicImg-display wp18hp20\" src=\"../nippou/images/classic/icon_address.gif\" alt=\"アドレス帳\">"
                        + "<img class=\"btn_originalImg-display wp18hp20\" src=\"../nippou/images/original/icon_address.png\" alt=\"アドレス帳\">"
                        + "&nbsp;アドレス帳"
                        + "</button>&nbsp;"
                        + "<button type=\"button\" id=\"" + row_number + "\" class=\"baseBtn js_adrHistoryPop\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_clock.png\" alt=\"履歴\">"
                        + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_log_18.png\" alt=\"履歴\">"
                        + "&nbsp;履歴"
                        + "</button>"
                        + "</div>"
                        + "<div id=\"ntp040CompanyIdArea_"     + row_number + "\"></div>"
                        + "<div id=\"ntp040CompanyBaseIdArea_" + row_number + "\"></div>"
                        + "<div id=\"ntp040CompanyCodeArea_"   + row_number + "\"></div>"
                        + "<div id=\"ntp040CompNameArea_"      + row_number + "\"></div>"
                        + "<div id=\"ntp040AddressIdArea_"     + row_number + "\"></div>"
                        + "<div id=\"ntp040AddressNameArea_"   + row_number + "\"></div>"
                        + "</td>"
                        + "</tr>";
    } else if ($('input:hidden[name=ntp040AnkenCompanyUse]').val() == 1) {
        //案件のみ
        ankenCompanyStr = "<tr>"
                        + "<th class=\"w20\">案件</th>"
                        + "<td class=\"w80 txt_t\" colspan=\"3\">"
                        + "<div>"
                        + "<button type=\"button\" class=\"baseBtn\" onclick=\"return openAnkenWindow('ntp040','" + row_number + "')\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_search.png\" alt=\"案件検索\">"
                        + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_search.png\" alt=\"案件検索\">"
                        + "&nbsp;案件検索"
                        + "</button>&nbsp;"
                        + "<button type=\"button\" id=\"" + row_number + "\" class=\"baseBtn js_ankenHistoryPop\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_clock.png\" alt=\"履歴\">"
                        + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_log_18.png\" alt=\"履歴\">"
                        + "&nbsp;履歴"
                        + "</button>"
                        + "</div>"
                        + "<div id=\"ntp040AnkenIdArea_"   + row_number + "\"></div>"
                        + "<div id=\"ntp040AnkenCodeArea_" + row_number + "\"></div>"
                        + "<div id=\"ntp040AnkenNameArea_" + row_number + "\"></div>"
                        + "</td>";
    } else if ($('input:hidden[name=ntp040AnkenCompanyUse]').val() == 2) {
        //企業・顧客のみ
        ankenCompanyStr = "<tr>"
                        + "<th class=\"w20\">企業・顧客</th>"
                        + "<td class=\"w80 txt_t\" colspan=\"3\">"
                        + "<button type=\"button\" class=\"baseBtn\" onclick=\"return openCompanyWindow2('ntp040'," + row_number + ");\">"
                        + "<img class=\"btn_classicImg-display wp18hp20\" src=\"../nippou/images/classic/icon_address.gif\" alt=\"アドレス帳\">"
                        + "<img class=\"btn_originalImg-display wp18hp20\" src=\"../nippou/images/original/icon_address.png\" alt=\"アドレス帳\">"
                        + "&nbsp;アドレス帳"
                        + "</button>&nbsp;"
                        + "<button type=\"button\" id=\"" + row_number + "\" class=\"baseBtn js_adrHistoryPop\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_clock.png\" alt=\"履歴\">"
                        + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_log_18.png\" alt=\"履歴\">"
                        + "&nbsp;履歴"
                        + "</button>"
                        + "</div>"
                        + "<div id=\"ntp040CompanyIdArea_"     + row_number + "\"></div>"
                        + "<div id=\"ntp040CompanyBaseIdArea_" + row_number + "\"></div>"
                        + "<div id=\"ntp040CompanyCodeArea_"   + row_number + "\"></div>"
                        + "<div id=\"ntp040CompNameArea_"      + row_number + "\"></div>"
                        + "<div id=\"ntp040AddressIdArea_"     + row_number + "\"></div>"
                        + "<div id=\"ntp040AddressNameArea_"   + row_number + "\"></div>"
                        + "</td>"
                        + "</tr>";
    }

    /* 活動分類 */
    var ktbunruiHouhouStr = "";
    if ($('input:hidden[name=ntp040KtBriHhuUse]').val() == 0) {

        /* option 活動分類 */
        var ktbunruiOptionStr = "";
        var frBunruiSelect = $('#ktbunruihide').val();

        $('.ktbunruiclass').each(function() {
            var bunruiStr = $(this).attr('value').split("_");
            if (bunruiStr[0] == frBunruiSelect) {
                ktbunruiOptionStr += "<option value=\"" + bunruiStr[0] + "\" selected=\"selected\">" + htmlEscape(bunruiStr[1]) + "</option>";
            } else {
                ktbunruiOptionStr += "<option value=\"" + bunruiStr[0] + "\">" + htmlEscape(bunruiStr[1]) + "</option>";
            }
        });


        /* option 活動方法 */
        var kthouhouOptionStr = "";
        var houhouSelect = $('#kthouhouhide').val();

        $('.kthouhouclass').each(function() {
            var houhouStr = $(this).attr('value').split("_");
            if (houhouStr[0] == houhouSelect) {
                kthouhouOptionStr += "<option value=\"" + houhouStr[0] + "\" selected=\"selected\">" + htmlEscape(houhouStr[1]) + "</option>";
            } else {
                kthouhouOptionStr += "<option value=\"" + houhouStr[0] + "\">" + htmlEscape(houhouStr[1]) + "</option>";
            }
        });

        ktbunruiHouhouStr = "<tr>"
                            + "<th class=\"w20\">活動分類/方法</th>"
                            + "<td class=\"w80\" colspan=\"3\">"
                            + "<select name=\"ntp040Ktbunrui_" + row_number + "\">"
                            + ktbunruiOptionStr
                            + "</select>&nbsp;"
                            + "<select name=\"ntp040Kthouhou_" + row_number + "\">"
                            + kthouhouOptionStr
                            + "</select>"
                            + "</td>"
                            + "</tr>";

    }


    /* 見込み度 */
    var mikomidoStr = "";
    var mikomidoStandStr = "";
    if ($('input:hidden[name=ntp040MikomidoUse]').val() == 0) {

        //見込み度基準
        if ($('input:hidden[name=ntp040MikomidoFlg]').val() == 1) {
            mikomidoStandStr = "<div><button type=\"button\" class=\"baseBtn js_mikomidoBtn\">基準</button></div>";
        }

        mikomidoStr ="<tr>"
                    + "<th class=\"w20\">見込み度</th>"
                    + "<td class=\"w80\" colspan=\"3\">"
                    + "<div class=\"verAlignMid\">"
                    + "<input name=\"ntp040Mikomido_" + row_number + "\" value=\"0\" checked=\"checked\" id=\"ntp040Mikomido0" + row_number + "\" type=\"radio\"><label for=\"ntp040Mikomido0" + row_number + "\">10%</label>"
                    + "<input name=\"ntp040Mikomido_" + row_number + "\" value=\"1\" id=\"ntp040Mikomido1" + row_number + "\" type=\"radio\" class=\"ml10\"><label for=\"ntp040Mikomido1" + row_number + "\">30%</label>"
                    + "<input name=\"ntp040Mikomido_" + row_number + "\" value=\"2\" id=\"ntp040Mikomido2" + row_number + "\" type=\"radio\" class=\"ml10\"><label for=\"ntp040Mikomido2" + row_number + "\">50%</label>"
                    + "<input name=\"ntp040Mikomido_" + row_number + "\" value=\"3\" id=\"ntp040Mikomido3" + row_number + "\" type=\"radio\" class=\"ml10\"><label for=\"ntp040Mikomido3" + row_number + "\">70%</label>"
                    + "<input name=\"ntp040Mikomido_" + row_number + "\" value=\"4\" id=\"ntp040Mikomido4" + row_number + "\" type=\"radio\" class=\"ml10\"><label for=\"ntp040Mikomido4" + row_number + "\">100%</label>"
                    + "</div>"
                    + mikomidoStandStr
                    + "</td>"
                    + "</tr>";
    }


    /* 添付ファイル */
    var tempFileStr = "";
    if ($('input:hidden[name=ntp040TmpFileUse]').val() == 0) {
        tempFileStr = "<tr>"
                    + "<th class=\"w20\">添付<a id=\"naiyou\" name=\"naiyou\"></a></th>"
                    + "<td class=\"w80\" colspan=\"3\">"
                    + "<div id=\"attachment_FormArea" + row_number + "\">"
                    + "<div>"
                    + "<input type=\"hidden\" name=\"attachmentFileListFlg" + row_number + "\" value=\"true\">"
                    + "<button type=\"button\" class=\"baseBtn ml0\" value=\"添付\" onclick=\"attachmentLoadFile('" + row_number + "');\">"
                    + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_temp_file_2.png\" alt=\"添付\">"
                    + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_attach.png\" alt=\"添付\">"
                    + "&nbsp;添付"
                    + "</button>"
                    + "<span class=\"txt_c ml5 fs_12\">ファイルのドラッグ&ドロップで添付が行えます。</span>"
                    + "<input type=\"file\" id=\"attachmentAreaBtn" + row_number + "\" class=\"display_none\" onchange=\"attachFileSelect(this, '" + row_number + "');\" multiple=\"\">"
                    + "</div>"
                    + "<span id=\"attachmentFileErrorArea" + row_number + "\"></span>"
                    + "<input type=\"hidden\" name=\"attachmentMode" + row_number + "\" value=\"0\">"
                    + "<input type=\"hidden\" name=\"attachmentPluginId" + row_number + "\" value=\"nippou\">"
                    + "<input type=\"hidden\" name=\"attachmentTempDirId" + row_number + "\" value=\"ntp040\">"
                    + "<input type=\"hidden\" name=\"attachmentTempDirPlus" + row_number + "\" value=\"row" + row_number + "\">"
                    + "<input type=\"hidden\" name=\"attachment_ID_list\" value=\"" + row_number + "\">"
                    + "<span id=\"attachmentFileListArea" + row_number + "\" class=\"mt5\"></span>"
                    + "</div>"
                    + "</td>"
                    + "</tr>";
    }



    /* 次のアクション */
    var actionAreaStr = "";
    if ($('input:hidden[name=ntp040NextActionUse]').val() == 0) {

        var newActionDateInit = $('input:hidden[name=ntp040InitDate]').val();
        actionAreaStr = "<tr>"
                        + "<th class=\"w20\">次のアクション<a id=\"nextaction\" name=\"nextaction\"></a></th>"
                        + "<td class=\"w80\" colspan=\"3\">"
                        + "<div>"
                        + "<div class=\"verAlignMid\">"
                        + "日付指定："
                        + "<input name=\"ntp040ActDateKbn_" + row_number + "\" value=\"1\" class=\"ml5\" onchange=\"toggleActionAreaShow('nxtActDateArea_" + row_number + "');\" id=\"actDate1_" + row_number + "\" type=\"radio\">"
                        + "<label for=\"actDate1_" + row_number + "\">する</label>"
                        + "<input name=\"ntp040ActDateKbn_" + row_number + "\" value=\"0\" class=\"ml10\" checked=\"checked\" onchange=\"toggleActionAreaHide('nxtActDateArea_" + row_number + "');\" id=\"actDate0_" + row_number + "\" type=\"radio\">"
                        + "<label for=\"actDate0_" + row_number + "\">しない</label>"
                        + "</div>"
                        + "</div>"
                        + "<div id=\"nxtActDateArea_" + row_number + "\" class=\"display_n\">"
                        + "<div class=\"verAlignMid\">"
                        + "<input type=\"text\" name=\"ntp040NxtActDate_" + row_number + "\" id=\"selActionDate" + row_number + "\" maxlength=\"10\" class=\"txt_c wp95 datepicker js_frDatePicker\" value=\"" +  newActionDateInit + "\"/>"
                        + "<span class=\"picker-acs icon-date display_flex cursor_pointer iconKikanStart\"></span>"
                        + "<button type=\"button\" class=\"webIconBtn ml5\" onclick=\"return moveDay($('#selActionDate" + row_number + "')[0], 1)\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\">"
                        + "<i class=\"icon-paging_left\"></i>"
                        + "</button>"
                        + "<button type=\"button\" class=\"baseBtn classic-display\" onclick=\"return moveDay($('#selActionDate" + row_number + "')[0], 2)\">"
                        + "今日"
                        + "</button>"
                        + "<span>"
                        + "<a class=\"fw_b todayBtn original-display\" onclick=\"return moveDay($('#selActionDate" + row_number + "')[0], 2)\">"
                        + "今日"
                        + "</a>"
                        + "</span>"
                        + "<button type=\"button\" class=\"webIconBtn ml5\" onclick=\"return moveDay($('#selActionDate" + row_number + "')[0], 3)\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\">"
                        + "<i class=\"icon-paging_right\"></i>"
                        + "</button>"
                        + "</div>"
                        + "</div>"
                        + "<div>"
                        + "<textarea name=\"ntp040NextAction_" + row_number + "\" rows=\"3\" class=\"w100 mt10\" onkeyup=\"showLengthStr(value, 1000, 'actionlength_" + row_number + "');\" id=\"actionstr_" + row_number + "\"></textarea>"
                        + "<span class=\"formCounter\">現在の文字数:</span><span id=\"actionlength_" + row_number + "\" class=\"formCounter\">0</span>&nbsp;<span class=\"formCounter_max\">/&nbsp;1000&nbsp;文字</span>"
                        + "</div>"
                        + "</td>"
                        + "</tr>";
    }

    //内容初期値
    var defaultValue = "";
    if ($('input:hidden[name=ntp040DefaultValue]').val() != null) {
        defaultValue = $('input:hidden[name=ntp040DefaultValue]').val();
    }

    var defaultLength = "0";
    if ($('input:hidden[name=ntp040DefaultValue2]').val() != null) {
        var defaultValue2 = "";
        defaultValue2 = $('input:hidden[name=ntp040DefaultValue2]').val();
        defaultLength = defaultValue2.length;
    }


    //カラーコメント
    var titileColStr1 = htmlEscape($('#msgCol1').val());
    var titileColStr2 = htmlEscape($('#msgCol2').val());
    var titileColStr3 = htmlEscape($('#msgCol3').val());
    var titileColStr4 = htmlEscape($('#msgCol4').val());
    var titileColStr5 = htmlEscape($('#msgCol5').val());

    var rowIdx = getNextRowNumber();

    /* 日報行追加 */
    $('.js_nippouData').append("<table id=\"nippou_data_" + row_number + "\" class=\"table-left w100\">"
            + "<tr id=\"" + row_number + "\" class=\"js_headNippou\">"
            + "<th colspan=\"4\" class=\"bgC_header1 js_ntpInfoNum\" id=\"pos" + row_number + "\">"
            + "<div class=\"w100 verAlignMid hp30\">"
            + "<img class=\"btn_classicImg-display\" src=\"../nippou/images/classic/icon_menu_single.gif\">"
            + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_siryo.png\">"
            + "<span class=\"js_nippouRowNumber cl_fontOutline\">NO." + rowIdx + "</span>"
            + "<div class=\"w100 txt_r\">"
            + "<button type=\"button\" class=\"baseBtn js_ntpDelBtn\" value=\"削除\">"
            + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_delete.png\" alt=\"削除\">"
            + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_delete.png\" alt=\"削除\">"
            + "削除"
            + "</button>"
            + "</div>"
            + "</div>"
            + "</th>"
            + "</tr>"
            + "<tr>"
            + "<th class=\"w20\">時間</th>"
            + "<td class=\"w80\" colspan=\"3\">"
            + "<span class=\"display_flex\">"
            +   "<span class=\"clockpicker_fr ml5 pos_rel display_flex input-group\">"
            +      "<input type=\"text\" name=\"ntp040FrTime_" + row_number + "\" id=\"fr_clock" + row_number + "\" maxlength=\"5\" class=\"clockpicker js_clockpicker txt_c wp60\" value=\"" + frTimeStr + "\"/>"
            +      "<label for=\"fr_clock" + row_number + "\" class=\"picker-acs cursor_pointer icon-clock input-group-addon\"></label>"
            +   "</span>"
            +   "&nbsp;"
            +   "～&nbsp;"
            +   "<span class=\"clockpicker_to ml5 pos_rel display_flex input-group\">"
            +      "<input type=\"text\" name=\"ntp040ToTime_" + row_number + "\" id=\"to_clock" + row_number + "\" maxlength=\"5\" class=\"clockpicker js_clockpicker txt_c wp60\" value=\"" + toTimeStr + "\"/>"
            +      "<label for=\"to_clock" + row_number + "\" class=\"picker-acs cursor_pointer icon-clock input-group-addon\"></label>"
            +   "</span>"
            + "</span>"
            + "<span id=\"betWeenDays\"></span>"
            + "</td>"
            + "</tr>"
            +  ankenCompanyStr
            +  ktbunruiHouhouStr
            +  mikomidoStr
            + "<tr>"
            + "<th class=\"w20\">タイトル<span class=\"cl_fontWarn\">※</span></th>"
            + "<td class=\"w80\" colspan=\"3\">"
            + "<input name=\"ntp040Title_" + row_number + "\" maxlength=\"100\" value=\"\" id=\"selectionSearchArea\" class=\"wp300\" type=\"text\">"
            + "</td>"
            + "</tr>"
            + "<tr>"
            + "<th class=\"w20\">タイトル色</th>"
            + "<td class=\"w80\" colspan=\"3\">"
            + "<div class=\"verAlignMid\">"
            + "<span class=\"ntp_titlecolor-block bgc_fontSchTitleBlue\"><input name=\"ntp040Bgcolor_" + row_number + "\" value=\"1\" id=\"bg_color1_" + row_number + "\" type=\"radio\"></span>"
            + "<label for=\"bg_color1_" + row_number + "\" class=\"no_w ml5 mr10\">" + titileColStr1 + "</label>"
            + "</div><wbr>"
            + "<div class=\"verAlignMid\">"
            + "<span class=\"ntp_titlecolor-block bgc_fontSchTitleRed\"><input name=\"ntp040Bgcolor_" + row_number + "\" value=\"2\" id=\"bg_color2_" + row_number + "\" type=\"radio\"></span>"
            + "<label for=\"bg_color2_" + row_number + "\" class=\"no_w ml5 mr10\">" + titileColStr2 + "</label>"
            + "</div><wbr>"
            + "<div class=\"verAlignMid\">"
            + "<span class=\"ntp_titlecolor-block bgc_fontSchTitleGreen\"><input name=\"ntp040Bgcolor_" + row_number + "\" value=\"3\" id=\"bg_color3_" + row_number + "\" type=\"radio\"></span>"
            + "<label for=\"bg_color3_" + row_number + "\" class=\"no_w ml5 mr10\">" + titileColStr3 + "</label>"
            + "</div><wbr>"
            + "<div class=\"verAlignMid\">"
            + "<span class=\"ntp_titlecolor-block bgc_fontSchTitleYellow\"><input name=\"ntp040Bgcolor_" + row_number + "\" value=\"4\" id=\"bg_color4_" + row_number + "\" type=\"radio\"></span>"
            + "<label for=\"bg_color4_" + row_number + "\" class=\"no_w ml5 mr10\">" + titileColStr4 + "</label>"
            + "</div><wbr>"
            + "<div class=\"verAlignMid\">"
            + "<span class=\"ntp_titlecolor-block bgc_fontSchTitleBlack\"><input name=\"ntp040Bgcolor_" + row_number + "\" value=\"5\" id=\"bg_color5_" + row_number + "\" type=\"radio\"></span>"
            + "<label for=\"bg_color5_" + row_number + "\" class=\"no_w ml5\">" + titileColStr5 + "</label>"
            + "</div>"
            + "</td>"
            + "</tr>"
            + "<tr>"
            + "<th class=\"w20\">内容<a id=\"naiyou\" name=\"naiyou\"></a></th>"
            + "<td class=\"w80\" colspan=\"3\">"
            + "<textarea name=\"ntp040Value_" + row_number + "\" rows=\"5\" class=\"w100\" onkeyup=\"showLengthStr(value, 1000, 'inputlength" + row_number + "');\" id=\"inputstr\">"
            + defaultValue2
            + "</textarea>"
            + "<span class=\"formCounter\">現在の文字数:</span><span id=\"inputlength" + row_number + "\" class=\"formCounter\">" + defaultLength + "</span>&nbsp;<span class=\"formCounter_max\">/&nbsp;1000&nbsp;文字</span>"
            + "</td>"
            + "</tr>"
            + tempFileStr
            + actionAreaStr
            + noAnkenCompanyStr
            + "</td></tr></table>"
            + "</td>"
            + "</tr>"
        );


    //ラジオボタン初期値設定
    $('input[name="ntp040Bgcolor_' + row_number + '"]').val([$("input:hidden[name='ntp040BgcolorInit']").val()]);

    //追加した時間選択のclockpikcer起動
    startClockPicker($("#fr_clock" + row_number))
    startClockPicker($("#to_clock" + row_number))

    //追加した日付選択のdatepicker起動
    startDatePicker($("#selActionDate" + row_number), 0)

    //追加した行のテンポラリディレクトリを生成
    createTempDir(row_number);
    $("#fileDrop_Overlay").append(addUploadHtml(row_number));
    attachmentInitSetting(row_number);

    footerStart("#footdiv");

}

function footerStart(selector){
    if ($(selector).offset() != null) {
        $('html,body').animate({scrollTop: $(selector).offset().top - 140},'slow');
    }
}

function footerStart2(selector){
    if ($(selector).offset() != null) {
        $('html,body').animate({scrollTop: $(selector).offset().top - 730},'slow');
    }
}

function fileLinkClick(ntpSid, binSid) {
    url = "../nippou/ntp040.do?CMD=fileDownload&ntp010NipSid=" + ntpSid + "&ntp040BinSid=" + binSid;
    navframe.location=url;
}


/* 日報のJsonデータを形成
 * mode:0 新規登録  1:編集
 */
function createJsonData(rowElm, mode){

    //エラーメッセージ削除
    $("#error_msg").text("");

    /* json形成 */
    var nippouData = "[";
    var jsonStr    = "";

    if (mode == 0) {
        /*新規登録 */
        var rownum = "";
        $('.js_headNippou').each(function() {
            //登録日
            var ntpDate   = encodeURIComponent($("#selDate"   + rownum).val());

            rownum = $(this).attr('id');
            nippouData = getNtpData(ntpDate, rownum, nippouData);
        });
    } else {
        /*編集 */
        rownum = rowElm.attr("id");

        //登録日
        var ntpDate   = encodeURIComponent($("#selDate"   + rownum).val());

        nippouData = getNtpData(ntpDate, rownum, nippouData);
    }
    nippouData += "]";

    return nippouData;
}

/* 行ごとのJsonデータを形成 */
function getNtpData(ntpDate, rownum, nippouData){

    /* 選択ユーザ */
    var selectUsrSid = document.forms['ntp040Form'].ntp010SelectUsrSid.value;

    if (nippouData != "[") {
        nippouData += ",";
    }

    var trId = "";

    if (rownum != null && rownum != "") {
        trId = "_" + rownum;
    } else {
        rownum = "1";
    }

    /* 時間 */
    var frhour  = $("select[name=ntp040FrHour" + trId + "]").val();
    var frmin   = $("select[name=ntp040FrMin"  + trId + "]").val();
    var tohour  = $("select[name=ntp040ToHour" + trId + "]").val();
    var tomin   = $("select[name=ntp040ToMin"  + trId + "]").val();
    var frTime  = encodeURIComponent($("input[name=ntp040FrTime"  + trId + "]").val());
    var toTime  = encodeURIComponent($("input[name=ntp040ToTime" + trId + "]").val());

    /* 案件 */
    var ankenSid       = -1;
    if ($("input:hidden[name=ntp040AnkenSid"     + trId + "]").val() !== undefined) {

        ankenSid = $("input[name=ntp040AnkenSid" + trId + "]").val();
    }

    /* 企業 */
    var companySid     = -1;
    if ($("input:hidden[name=ntp040CompanySid"       + trId + "]").val() !== undefined) {
        companySid = $("input[name=ntp040CompanySid" + trId + "]").val();
    }

    /* 企業(拠点) */
    var companyBaseSid = -1;
    if ($("input:hidden[name=ntp040CompanyBaseSid"           + trId + "]").val() !== undefined) {
        companyBaseSid = $("input[name=ntp040CompanyBaseSid" + trId + "]").val();
    }

    /* 活動分類・方法 */
    var ktbunruiSid = -1;
    var kthouhouSid = -1;
    if ($('input:hidden[name=ntp040KtBriHhuUse]').val() == 0) {
        /* 活動分類 */
        ktbunruiSid    = $("select[name=ntp040Ktbunrui" + trId + "]").val();
        /* 活動方法 */
        kthouhouSid    = $("select[name=ntp040Kthouhou" + trId + "]").val();
    }

    /* 見込み度 */
    var mikomido = 0;
    if ($('input:hidden[name=ntp040MikomidoUse]').val() == 0) {
        mikomido       = $("input[name=ntp040Mikomido"  + trId + "]:checked").val();
    }

    /* 背景色 */
    var bgColorStr     = $("input[name=ntp040Bgcolor"   + trId + "]:checked").val();
    /* タイトル */
    var titleStr       = encodeURIComponent($("input[name=ntp040Title"    + trId + "]").val());
    /* 内容 */
    var valueStr       = encodeURIComponent($("textarea[name=ntp040Value" + trId + "]").val());

    /* 次のアクション */
    var actDateKbn    = 0;
    var actionYear    = -1;
    var actionMonth   = -1;
    var actionDay     = -1;
    var actionDate     = -1;
    var actionStr     = "";

    if ($('input:hidden[name=ntp040NextActionUse]').val() == 0) {
        /* 時間指定（次のアクション） */
        actDateKbn     = $("input[name=ntp040ActDateKbn"        + trId + "]:checked").val();

        if (actDateKbn == 1) {
            actionYear    = $("select[name=selActionYear"  + rownum + "]").val();
            actionMonth   = $("select[name=selActionMonth" + rownum + "]").val();
            actionDay     = $("select[name=selActionDay"   + rownum + "]").val();
            actionDate     = encodeURIComponent($("input[name=selActionDate"   + rownum + "]").val());
        }

        /* 次のアクション */
        actionStr       = encodeURIComponent($("textarea[name=ntp040NextAction" + trId + "]").val());
    }


    jsonStr =  "{rowId:"         +  rownum          + ","
            +  "selectUsrSid:"   +  selectUsrSid    + ","
            +  "ntpDate:\""        +  ntpDate         + "\","
            +  "frTime:\""         +  frTime          + "\","
            +  "toTime:\""         +  toTime          + "\","
            +  "ankenSid:"       +  ankenSid        + ","
            +  "companySid:"     +  companySid      + ","
            +  "companyBaseSid:" +  companyBaseSid  + ","
            +  "ktbunruiSid:"    +  ktbunruiSid     + ","
            +  "kthouhouSid:"    +  kthouhouSid     + ","
            +  "mikomido:"       +  mikomido        + ","
            +  "title:\""        +  titleStr        + "\","
            +  "bgcolor:"        +  bgColorStr      + ","
            +  "valueStr:\""     +  valueStr        + "\","
            +  "actDateKbn:"     +  actDateKbn      + ","
            +  "actionDate:"     +  actionDate      + ","
            +  "actionStr:\""    +  actionStr       + "\"}";

    nippouData += jsonStr;

    return nippouData;
}

/* データ再取得 設定 */
function getResetData(trId, ntpSid, rownum, canselJsonStr){
    //データ送信
    $.ajaxSetup({async:false});
    $.post('../nippou/ntp040.do', {"cmd":"resetData",
                                    "CMD":"resetData",
                                    "resetNtpSid":ntpSid,
                                    "rowNum":rownum,
                                    "nippouTempData":canselJsonStr},
    function(data) {
        if (data != null || data != "") {
            //データ再設定

            //報告日付
            $("select[name=selYear" + rownum + "]").val(data.ntpYear);
            $("select[name=selMonth" + rownum + "]").val(data.ntpMonth);
            $("select[name=selDay" + rownum + "]").val(data.ntpDay);
            $("select[name=selDate" + rownum + "]").val(data.ntpDate);

            //時間
            $("select[name=ntp040FrHour" + trId + "]").val(data.frHour);
            $("select[name=ntp040FrMin"  + trId + "]").val(data.frMin);
            $("select[name=ntp040ToHour" + trId + "]").val(data.toHour);
            $("select[name=ntp040ToMin"  + trId + "]").val(data.toMin);
            $("input[name=ntp040FrTime" + trId + "]").val(data.frTime);
            $("input[name=ntp040ToTime"  + trId + "]").val(data.toTime);
            $(".js_dspFrhour"              + trId).text(data.ntp040DspFrHour);
            $(".js_dspFrminute"            + trId).text(data.ntp040DspFrMinute);
            $(".js_dspTohour"              + trId).text(data.ntp040DspToHour);
            $(".js_dspTominute"            + trId).text(data.ntp040DspToMinute);

            //案件
            delAnken('ntp040',trId);
            $('#ntp040AnkenIdArea' + trId).html(
                    "<input name=\"ntp040AnkenSid" + trId + "\" value=\"" + data.ankenSid + "\" type=\"hidden\">");

            var ankencodestr = "";
            if (data.ankenSid != "") {
            ankencodestr = "案件コード：";
            }

            $('#ntp040AnkenCodeArea' + trId).html(ankencodestr
                    + data.ankenCode);
            if (data.ankenName != "") {
                $('#ntp040AnkenNameArea' + trId).html("<a id=\"" + data.ankenSid + "\" class=\"js_anken_click cl_linkDef\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../nippou/images/classic/icon_anken_18.png\">"
                        + "<img class=\"btn_originalImg-display\" src=\"../nippou/images/original/icon_anken.png\">"
                        + "<span class=\"anken_name" +  trId + "\">"
                        + "<span class=\"ml5\">" + htmlEscape(data.ankenName) + "</span>"
                        + "</span>"
                        + "</a>"
                        + "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\" onclick=\"delAnken('ntp040','" + trId + "');\">"
                        + "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\" onclick=\"delAnken('ntp040','" + trId + "');\">");
                $(".anken_name" + trId).parent().attr('id', data.ankenSid);
                $(".anken_name" + trId).text(data.ankenName);
            } else {
                $('#ntp040AnkenNameArea' + trId).html("");
            }

            $('.ntp040AnkenCodeDspArea' + trId).html("案件コード："
                    + data.ankenCode);

            if (data.ankenName != "") {
                $('.ntp040AnkenNameDspArea' + trId).html("<a id=\"" + data.ankenSid + "\" class=\"js_anken_click cl_linkDef\">"
                        + "<img class=\"btn_classicImg-display\" src=\"../nippou/images/classic/icon_anken_18.png\">"
                        + "<img class=\"btn_originalImg-display\" src=\"../nippou/images/original/icon_anken.png\">"
                        + "<span class=\"ml5" +  trId + "\">"
                        + htmlEscape(data.ankenName)
                        + "</span>"
                        + "</a>");
                $(".anken_name" + trId).parent().attr('id', data.ankenSid);
                $(".anken_name" + trId).text(data.ankenName);
            } else {
                $('.ntp040AnkenNameDspArea' + trId).html("");
            }
            //企業・顧客
            setCompanyData(data, trId);
            //活動分類
            $("select[name=ntp040Ktbunrui" + trId + "]").val(data.ktbunruiSid);
            $(".dsp_ktbunrui"              + trId).text(data.ntp040DspKtbunrui);

            //活動方法
            $("select[name=ntp040Kthouhou" + trId + "]").val(data.kthouhouSid);
            $(".dsp_kthouhou"              + trId).text(data.ntp040DspKthouhou);

            //見込み度
            $("input[name=ntp040Mikomido"  + trId + "][value=\"" + data.mikomido + "\"]").attr("checked", true);
            $(".dsp_mikomido"              + trId).text(data.ntp040DspMikomido);

            //タイトル
            $("input[name=ntp040Title"     + trId + "]").val(data.title);
            $(".js_dspTitle"                 + trId).text(data.title);

            //タイトル色
            $("input[name=ntp040Bgcolor"   + trId + "][value=\"" + data.bgcolor + "\"]").attr("checked", true);

            //内容
            $("textarea[name=ntp040Value"  + trId + "]").val(data.valueStr);
            $(".dsp_naiyou"                + trId).html(data.ntp040DspValueStr);

            //次のアクション
            if ($('input:hidden[name=ntp040NextActionUse]').val() == 0) {
                $("input[name=ntp040ActDateKbn"  + trId + "][value=\"" + data.actDateKbn + "\"]").attr("checked", true);

                $('#actionSelDateArea' + trId).html("");
                if (data.actDateKbn == 1) {
                    $('#actionSelDateArea' + trId).html(
                        "<div>日付："
                        + "<span class=\"dsp_actionyear"   + trId + "\">" + data.actionYear  + "</span>年"
                        + "<span class=\"dsp_actionmonth"  + trId + "\">" + data.actionMonth + "</span>月"
                        + "<span class=\"dsp_actionday"    + trId + "\">" + data.actionDay   + "</span>日"
                        + "</div>>");

                    $("select[name=selActionYear"  + rownum + "]").val(data.actionYear);
                    $("select[name=selActionMonth" + rownum + "]").val(data.actionMonth);
                    $("select[name=selActionDay"   + rownum + "]").val(data.actionDay);
                    $("select[name=selActionDate"   + rownum + "]").val(data.actionDate);
                    $('#nxtActDateArea' + trId).removeClass('display_n');
                } else {

                    $("select[name=selActionYear"  + rownum + "]").val($('input:hidden[name=ntp040InitYear]').val());
                    $("select[name=selActionMonth" + rownum + "]").val($('input:hidden[name=ntp040InitMonth]').val());
                    $("select[name=selActionDay"   + rownum + "]").val($('input:hidden[name=ntp040InitDay]').val());
                    var dateActionInit = new Date();
                    dateActionInit.setFullYear($('input:hidden[name=ntp040InitYear]').val());
                    dateActionInit.setMonth($('input:hidden[name=ntp040InitMonth]').val());
                    dateActionInit.setDate($('input:hidden[name=ntp040InitDay]').val());
                    $("select[name=selActionDate"   + rownum + "]").val(dateActionInit.toISOString().split("T")[0].replaceAll("-", "/"));
                    $('#nxtActDateArea' + trId).addClass('display_n');
                }

                $("textarea[name=ntp040NextAction"  + trId + "]").val(data.actionStr);
                $(".dsp_nextaction"                + trId).html(data.ntp040DspActionStr);
            }

                //登録者
                $(".addUserName"                 + trId).text(data.ntp040NtpAddUsrName);

                //登録日時
                $(".addDate"                 + trId).text(data.ntp040NtpDate);

            //添付ファイル
            $(".dsp_tmp_file_area"         + trId).html("");
            if (data.ntp040FileList.length > 0) {
                var tmpStr = "";
                for (i=0; i<data.ntp040FileList.length; i++) {
                    if (tmpStr != "") {
                        tmpStr += "<br>";
                    }
                    tmpStr += '<file-preview url="../nippou/ntp040.do?CMD=fileDownload&ntp010NipSid=' + ntpSid + '&ntp040BinSid=' + data.ntp040FileList[i].binSid + '" filename="' + data.ntp040FileList[i].binFileName + '">'
                    + '<img class="classic-display" src="../common/images/classic/icon_temp_file_2.png" alt="">'
                    + '<img class="original-display" src="../common/images/original/icon_attach.png" alt="">'
                    + "<a href=\"#!\" onclick=\"return fileLinkClick("
                            + ntpSid + ","
                            + data.ntp040FileList[i].binSid
                            + ");\"><span class=\"text_link_min\">"
                            + data.ntp040FileList[i].binFileName
                            + data.ntp040FileList[i].binFileSizeDsp
                            + "</span></a>"
                            + "</file-preview>";

                }
                $(".dsp_tmp_file_area"  + trId).html(tmpStr);
            }
        }
    });
}

/* 日報ヘッダー書き換え(編集画面新規登録時) */
function rewriteNtpHeader(ntpSid, rownum){

    $(".js_nipHeader_" + rownum).html("");
    $(".js_nipHeader_" + rownum).html("<button type=\"button\" class=\"baseBtn js_ntpCopyBtn js_editButtonArea" + rownum + " display_n\" value=\"複写登録\" id=\"" + ntpSid + "\">"
                                    + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_copy_add.png\" alt=\"複写登録\">"
                                    + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_copy.png\" alt=\"複写登録\">"
                                    + "複写登録"
                                    + "</button>"

                                    + "<button type=\"button\" class=\"baseBtn js_ntpEditBtn js_editButtonArea" + rownum + " display_n\" value=\"編集\" id=\"" + rownum + "\">"
                                    + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_edit_2.png\" alt=\"編集\">"
                                    + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_edit.png\" alt=\"編集\">"
                                    + "編集"
                                    + "</button>"

                                    + "<button type=\"button\" class=\"baseBtn js_ntpDellBtn js_editButtonArea" + rownum + " display_n\" value=\"削除\" id=\"" + rownum + "\">"
                                    + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_delete.png\" alt=\"削除\">"
                                    + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_delete.png\" alt=\"削除\">"
                                    + "削除"
                                    + "</button>"

                                    + "<button type=\"button\" class=\"baseBtn js_ntpEditKakuteiBtn js_editButtonArea" + rownum + "\" value=\"確定\" id=\"" + rownum + "\">"
                                    + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_edit_2.png\" alt=\"確定\">"
                                    + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_edit.png\" alt=\"確定\">"
                                    + "確定"
                                    + "</button>"

                                    + "<button type=\"button\" class=\"baseBtn js_ntpEditCancelBtn js_editButtonArea" + rownum + "\" value=\"キャンセル\" id=\"" + rownum + "\">"
                                    + "<img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_delete.png\" alt=\"キャンセル\">"
                                    + "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_delete.png\" alt=\"キャンセル\">"
                                    + "キャンセル"
                                    + "</button>"
                                    + "");

    $(".js_nipHeader_" + rownum).attr('id',ntpSid);
}

/* コメント 再表示 */
function setComment(trId, ntpSid, rownum, cmtdata){

    if (cmtdata.length > 0) {
        $(".commentDspArea" + rownum).remove();
        var commentStr = "<span class=\"commentDspArea" + rownum + "\">";
        for (i=0; i<cmtdata.length; i++) {
            if (i != 0) {
                commentStr += "<div class=\"settingForm_separator ml20 mr20\"></div>"
            }
            commentStr += "<table class=\"w100 table-noBorder commentDspAreaTable"
                        + trId
                        + "_"
                        + cmtdata[i].commentSid
                        + "\"><tbody><tr><td>";

            if (cmtdata[i].commentUserBinSid == "0") {
                if (cmtdata[i].commentUsiPictKf == "0") {
                    //写真なし 公開
                    commentStr += "<img src=\"../common/images/classic/icon_photo.gif\" name=\"pitctImage\" class=\"classic-display wp50\" alt=\"写真\" >"
                                + "<img src=\"../common/images/original/photo.png\" name=\"pitctImage\" class=\"original-display wp50\" alt=\"写真\" >";
                } else {
                    //写真なし 非公開
                    commentStr += "<div class=\"hikokai_photo-m txt_c\">"
                                + "<span class=\"cl_fontWarn\">非公開</span>"
                                + "</div>";
                }
            } else {
                if (cmtdata[i].commentUsiPictKf == "0") {
                    //写真あり 公開
                    commentStr += "<img class=\"wp50\" src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid=" + cmtdata[i].commentUserBinSid + "\" alt=\"写真\" />";
                } else {
                    //写真あり 非公開
                    commentStr += "<div class=\"hikokai_photo-m txt_c\">"
                                + "<span class=\"cl_fontWarn\">非公開</span>"
                                + "</div>";
                }
            }

            //削除
            var delComStr = "";
            if (cmtdata[i].commentDelKbn == 1) {
                delComStr = "<span class=\"commentDel cursor_p ml5\" id=\""
                +  cmtdata[i].commentSid
                +  "\"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_delete_2.gif\">"
                +  "<img class=\"btn_originalImg-display\" src=\"../common/images/original/icon_delete.png\"></span>";
            }
            if (cmtdata[i].commentUsrJkbn == 9) {
                commentStr +=  "</td><td class=\"w100 txt_t\" id=\"commentDspAreaTable"
                    +  trId
                    +  "_"
                    +  cmtdata[i].commentSid
                    +  "\"><del><span class=\"fw_b\">"
                    +  cmtdata[i].commentUserName
                    +  "</span></del><span class=\"ml10\">"
                    +  cmtdata[i].commentDate
                    +  "</span>"
                    +  delComStr
                    + "<div>"
                    +  cmtdata[i].commentValue
                    +  "</div></td></tr></tbody></table>";

            } else {
                var commUsrUkoClass = "";
                if (cmtdata[i].commentUsrUkoFlg == 1) {
                    commUsrUkoClass = "mukoUser";
                }
                commentStr +=  "</td><td class=\"w100 txt_t\" id=\"commentDspAreaTable"
                    +  trId
                    +  "_"
                    +  cmtdata[i].commentSid
                    +  "\"><span class=\"" + commUsrUkoClass + "\ fw_b\">"
                    +  cmtdata[i].commentUserName
                    +  "</span><span class=\"ml10\">"
                    +  cmtdata[i].commentDate
                    +  "</span>"
                    +  delComStr
                    + "<div>"
                    +  cmtdata[i].commentValue
                    +  "</div></td></tr></tbody></table>";

            }
        }
        //コメントテキストエリアを空にする
        $("textarea[name=ntp040Comment"  + trId + "]").val("");
        $(".js_ntp040DspComment"            + trId).html(commentStr);
        $(".js_ntp040DspComment_tr"         + trId).removeClass("display_n");
    }
}

/* 表示切替 */
function toggleDsp(rownum){
    for (var i = 0; i < $(".js_editButtonArea" + rownum).length; i++) {
        if ($(".js_editButtonArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_editButtonArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_editButtonArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_usrInfArea" + rownum).length; i++) {
        if ($(".js_usrInfArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_usrInfArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_usrInfArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_ntpTimeArea" + rownum).length; i++) {
        if ($(".js_ntpTimeArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_ntpTimeArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_ntpTimeArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_ankenDataArea" + rownum).length; i++) {
        if ($(".js_ankenDataArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_ankenDataArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_ankenDataArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_kigyouDataArea" + rownum).length; i++) {
        if ($(".js_kigyouDataArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_kigyouDataArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_kigyouDataArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_ktBunruiArea" + rownum).length; i++) {
        if ($(".js_ktBunruiArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_ktBunruiArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_ktBunruiArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_mikomidoArea" + rownum).length; i++) {
        if ($(".js_mikomidoArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_mikomidoArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_mikomidoArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_titleArea" + rownum).length; i++) {
        if ($(".js_titleArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_titleArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_titleArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_naiyouArea" + rownum).length; i++) {
        if ($(".js_naiyouArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_naiyouArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_naiyouArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_nextActionArea" + rownum).length; i++) {
        if ($(".js_nextActionArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_nextActionArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_nextActionArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_tempFileArea" + rownum).length; i++) {
        if ($(".js_tempFileArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_tempFileArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_tempFileArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_commentArea" + rownum).length; i++) {
        if ($(".js_commentArea" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_commentArea" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_commentArea" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_ntpDateAreaTr" + rownum).length; i++) {
        if ($(".js_ntpDateAreaTr" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_ntpDateAreaTr" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_ntpDateAreaTr" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
    for (var i = 0; i < $(".js_ntpAddUNameDate" + rownum).length; i++) {
        if ($(".js_ntpAddUNameDate" + rownum + ":eq(" + i + ")").hasClass("display_n")) {
            $(".js_ntpAddUNameDate" + rownum + ":eq(" + i + ")").removeClass("display_n");
        } else {
            $(".js_ntpAddUNameDate" + rownum + ":eq(" + i + ")").addClass("display_n");
        }
    }
}


/* 日付変更チェック */
function ChangeDateCheck(rownum){

    var changeDateFlg = false;

    var dspNtpYear  = $("input[name=ntp040FrYear]").val();
    var dspNtpMonth = $("input[name=ntp040FrMonth]").val();
    var dspNtpDay   = $("input[name=ntp040FrDay]").val();

    //編集データ登録日
    var ntpDate = $("#selDate"  + rownum).val();
    ntpDate = new Date(ntpDate);

    var ntpYear  = ntpDate.getFullYear();
    var ntpMonth = ntpDate.getMonth() + 1;
    var ntpDay   = ntpDate.getDate();

    var ntpDateStr  = ntpDate.toISOString().split("T")[0].replaceAll("-", "/");

    if (dspNtpYear != ntpYear) {
        changeDateFlg = true;
    } else if (dspNtpMonth != ntpMonth) {
        changeDateFlg = true;
    } else if (dspNtpDay != ntpDay) {
        changeDateFlg = true;
    }

    return changeDateFlg;
}

function editNippou(cmd, ymd, sid, ukbn){
    document.forms[0].cmd.value=cmd;
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp010DspDate.value=ymd;
    document.forms[0].ntp010SelectDate.value=ymd;
    document.forms[0].ntp010SelectUsrKbn.value=0;
    document.forms[0].ntp010NipSid.value=sid;
    document.forms[0].ntp040DspMoveFlg.value=1;
    document.forms[0].submit();
    return false;
}

function htmlEscape(s) {
    return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/</g,"&lt;").replace(/>/g,"&gt;") ;
}

/* 目標リンククリック */
var offsetTopVal = 0;
function scrollTarger(){

    //クリックした場所の座標を取得
    offsetTopVal = $('.targetSelBtnArea').offset().top;

    $('html,body').animate({scrollTop:0},'slow');
    $('.targetSelBtnArea').toggle();
}

/* ▼リンククリック */
function scrollInit(){

    if (offsetTopVal == 0 && offsetTopVal != null) {
        footerStart("#initSelect");
    } else {
        $('html,body').animate({scrollTop: offsetTopVal - 180},'slow');
    }

    $('.targetSelBtnArea').toggle();
}


//目標実績再設定(新規登録時)
function resetTargetRec(year, month, usrSid, ntgSid){

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp040.do', {
        "cmd":"getTrgRecData",
        "CMD":"getTrgRecData",
        "year":year,
        "month":month,
        "usrSid":usrSid,
        "ntgSid":ntgSid},
    function(data) {
        if (data != null || data != "") {
            //目標実績リセット
            $('#val_' + year + '_' + month + '_' + usrSid + '_' + ntgSid).val("");
            $('#val_' + year + '_' + month + '_' + usrSid + '_' + ntgSid).val(data.npgRecord);
        }
    });
}

//目標実績再設定(編集時)
function resetTargetRec2(year, month, usrSid, ntgSid){

    $.ajaxSetup({async:false});
    $.post('../nippou/ntp040.do', {
        "cmd":"getTrgRecData",
        "CMD":"getTrgRecData",
        "year":year,
        "month":month,
        "usrSid":usrSid,
        "ntgSid":ntgSid},
    function(data) {
        if (data != null || data != "") {
            //目標リセット
            $('#recordAreaText_' + year + '_' + month + '_' + usrSid + '_' + ntgSid).text("");
            $('#recordAreaText_' + year + '_' + month + '_' + usrSid + '_' + ntgSid).text(data.npgRecord);
            //目標実績リセット
            $('#trgRecord_' + year + '_' + month + '_' + usrSid + '_' + ntgSid).val("");
            $('#trgRecord_' + year + '_' + month + '_' + usrSid + '_' + ntgSid).val(data.npgRecord);

            if (data.npgTargetKbn == 0) {
                $('#recordAreaText_' + year + '_' + month + '_' + usrSid + '_' + ntgSid).removeClass("cl_fontWarn");
            } else {
                $('#recordAreaText_' + year + '_' + month + '_' + usrSid + '_' + ntgSid).addClass("cl_fontWarn");
            }

        }
    });
}


//アドレス履歴
function getAdrHistoryList(rowNumber, pageNum) {

    //ユーザSID
    var selUsrSid  = document.forms['ntp040Form'].ntp010SelectUsrSid.value;

    //アドレス履歴一覧取得
    $.ajaxSetup({async:false});
    $.post('../nippou/ntp040.do', {
        "cmd":"getAdrHistoryList",
        "CMD":"getAdrHistoryList",
        "adrHistoryUsrSid":selUsrSid,
        "adrPageNum":pageNum},
    function(data) {
        if (data != null || data != "") {

            $('#adrHistoryArea').children().remove();

            if (data.pageNum != null && data.adrList.length > 0) {

                var adrInfstr = "";
                var pageNum = data.pageNum;
                var maxpagesize = data.maxpagesize;

                //ページング
                if (parseInt(maxpagesize) > 1) {
                    adrInfstr  += "<div class=\"paging\">"
                                + "<button type=\"button\" class=\"webIconBtn js_prevPageBtn\" id=\"" + rowNumber + ":" + pageNum + "\">"
                                + "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\" alt=\"前頁\">"
                                + "<i class=\"icon-paging_left fs_17\"></i>"
                                + "</button>"
                                + "<select name=\"usrInfChange\" id=\"" + rowNumber + "\" class=\"js_selchange paging_combo\">"

                    for (p=1; p <= parseInt(maxpagesize); p++) {
                        if (pageNum == p) {
                            adrInfstr +=  "<option value=\"" + p + "\" selected=\"selected\">" + p + " / " + maxpagesize + "</option>";
                        } else {
                            adrInfstr +=  "<option value=\"" + p + "\">" + p + " / " + maxpagesize + "</option>";
                        }
                    }

                    adrInfstr  +=  "</select>"
                                +  "<button type=\"button\" class=\"webIconBtn js_nextPageBtn\" id=\"" + rowNumber + ":" + pageNum + "\">"
                                +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\" alt=\"次頁\">"
                                +  "<i class=\"icon-paging_right fs_17\"></i>"
                                +  "</button>"
                                +  "</div>";
                }


                //ユーザ一覧
                adrInfstr += "<table class=\"table-top w100\">";

                for (i=0; i<data.adrList.length; i++) {

                    adrInfstr  += "<tr class=\"js_listHover cursor_p\">"
                                +   "<td onClick=\"setParentAdrPop("
                                +       i + ",'" + rowNumber + "');\">"
                                +     "<input id=\"popCompanySid_"  + i + "\"  value=\"" + data.adrList[i].companySid + "\" type=\"hidden\" />"
                                +     "<input id=\"popCompanyCode_" + i + "\"  value=\"" + htmlEscape(data.adrList[i].companyCode) + "\" type=\"hidden\" />"
                                +     "<input id=\"popCompanyName_" + i + "\"  value=\"" + htmlEscape(data.adrList[i].companyName) + "\" type=\"hidden\" />"
                                +     "<input id=\"popBaseSid_"     + i + "\"  value=\"" + data.adrList[i].companyBaseSid + "\" type=\"hidden\" />"
                                +     "<input id=\"popBaseName_"    + i + "\"  value=\"" + htmlEscape(data.adrList[i].companyBaseName) + "\" type=\"hidden\" />"
                                +     "<span class=\"cl_linkDef\">"
                                +       htmlEscape(data.adrList[i].companyName) + "&nbsp;&nbsp;" + htmlEscape(data.adrList[i].companyBaseName)
                                +     "</span>"
                                +   "</td>"
                                + "</tr>";
                }

                adrInfstr += "</table>";

                //ページング
                if (parseInt(maxpagesize) > 1) {
                    adrInfstr +=  "<div class=\"paging\">"
                                + "<button type=\"button\" class=\"webIconBtn js_prevPageBtn\" id=\"" + rowNumber + ":" + pageNum + "\">"
                                + "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\" alt=\"前頁\">"
                                + "<i class=\"icon-paging_left fs_17\"></i>"
                                + "</button>"
                                + "<select name=\"usrInfChange\" id=\"" + rowNumber + "\" class=\"js_selchange paging_combo\">"
                    for (p=1; p <= parseInt(maxpagesize); p++) {
                        if (pageNum == p) {
                            adrInfstr +=  "<option value=\"" + p + "\" selected=\"selected\">" + p + " / " + maxpagesize + "</option>";
                        } else {
                            adrInfstr +=  "<option value=\"" + p + "\">" + p + " / " + maxpagesize + "</option>";
                        }
                    }

                    adrInfstr  +=  "</select>"
                                +  "<button type=\"button\" class=\"webIconBtn js_nextPageBtn\" id=\"" + rowNumber + ":" + pageNum + "\">"
                                +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\" alt=\"次頁\">"
                                +  "<i class=\"icon-paging_right fs_17\"></i>"
                                +  "</button>"
                                +  "</div>";
                }
                $('#adrHistoryArea').append(adrInfstr);
            }  else {

                $('#adrHistoryArea').append("<div class=\"txt_c mt20\">該当する履歴はありません。</div>");
            }
        }
    });
}

//アドレス履歴から会社選択
function setParentAdrPop(selectSid, rowNumber) {

    var parentId           = "ntp040";
    var companySid         = $('input#popCompanySid_'  + selectSid).val();
    var companyCode        = htmlEscape($('input#popCompanyCode_' + selectSid).val());
    var companyName        = htmlEscape($('input#popCompanyName_' + selectSid).val());
    var companyBaseSid     = $('input#popBaseSid_'     + selectSid).val();
    var companyBaseName    = htmlEscape($('input#popBaseName_'    + selectSid).val());

    if (rowNumber != "") {
        rowNumber = "_" + rowNumber;
    }

    if (companySid != null && companySid != "" && companySid != 0 && companySid != -1
            && $('#' + parentId + 'CompanyIdArea'     + rowNumber).html() != null
            && $('#' + parentId + 'CompNameArea'      + rowNumber).html() != null
            && $('#' + parentId + 'CompanyBaseIdArea' + rowNumber).html() != null
            && $('#' + parentId + 'AddressIdArea'     + rowNumber).html() != null
            && $('#' + parentId + 'AddressNameArea'   + rowNumber).html() != null) {

        $('#' + parentId + 'CompanyIdArea'     + rowNumber).html("");
        $('#' + parentId + 'CompNameArea'      + rowNumber).html("");
        $('#' + parentId + 'CompanyBaseIdArea' + rowNumber).html("");
        $('#' + parentId + 'AddressIdArea'     + rowNumber).html("");
        $('#' + parentId + 'AddressNameArea'   + rowNumber).html("");

        addParentParamAdrPop(parentId + 'CompanyIdArea' + rowNumber, parentId + 'CompanySid' + rowNumber, companySid);
        addParentParamAdrPop(parentId + 'CompanyBaseIdArea' + rowNumber, parentId + 'CompanyBaseSid' + rowNumber, companyBaseSid);

        $('#' + parentId + 'CompanyCodeArea' + rowNumber).html("企業コード："
                + "<span class=\"comp_code_name" + rowNumber + "\">"
                + companyCode
                + "</span>");

        $('#' + parentId + 'CompNameArea' + rowNumber).html("<a id=\"" + companySid + "\" class=\"js_compClick mr5 cl_linkDef\">"
                        + "<img class=\"btn_classicImg-display wp18hp20\" src=\"../common/images/classic/icon_company.png\">"
                        + "<img class=\"btn_originalImg-display wp18hp20\" src=\"../common/images/original/icon_company.png\">"
                        + "<span class=\"ml5 comp_name" + rowNumber + "\">"
                        + companyName + "<span class=\"ml5\">" + companyBaseName + "</span>"
                        + "</span>"
                        + "</a>"
                        + "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\"  onclick=\"delCompany('" + parentId + "','" + rowNumber + "');\">"
                        + "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\"  onclick=\"delCompany('" + parentId + "','" + rowNumber + "');\">");
    }

    //タイトル設定
    if ($("input[name=" + parentId + "Title" + rowNumber + "]").val() != null) {
        var titlestr = $("input[name=" + parentId + "Title" + rowNumber + "]").val();
        if (titlestr == '') {
            $("input[name=" + parentId + "Title" + rowNumber + "]").val(companyName);
        }
    }

    $('#adrHistoryPop').dialog('close');

    return false;
}

//案件履歴
function getAnkenHistoryList(rowNumber, pageNum) {

    //ユーザSID
    var selUsrSid  = document.forms['ntp040Form'].ntp010SelectUsrSid.value;

    //案件履歴一覧取得
    $.ajaxSetup({async:false});
    $.post('../nippou/ntp040.do', {
        "cmd":"getAnkenHistoryList",
        "CMD":"getAnkenHistoryList",
        "ankenHistoryUsrSid":selUsrSid,
        "ankenPageNum":pageNum},
    function(data) {
        if (data != null || data != "") {

            $('#ankenHistoryArea').children().remove();

            if (data.pageNum != null && data.ankenList.length > 0) {

                var ankenInfstr = "";
                var pageNum = data.pageNum;
                var maxpagesize = data.maxpagesize;
                //ページング
                if (parseInt(maxpagesize) > 1) {
                    ankenInfstr += "<div class=\"paging\">"
                        +  "<button type=\"button\" class=\"webIconBtn js_prevAnkenPageBtn\" id=\"" + rowNumber + ":" + pageNum + "\">"
                        +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\" alt=\"前頁\">"
                        +  "<i class=\"icon-paging_left fs_17\"></i>"
                        +  "</button>"
                        +  "<select name=\"usrInfChange\" id=\"" + rowNumber + "\" class=\"js_selchangeAnken paging_combo\">"

                    for (p=1; p <= parseInt(maxpagesize); p++) {
                        if (pageNum == p) {
                            ankenInfstr +=  "<option value=\"" + p + "\" selected=\"selected\">" + p + " / " + maxpagesize + "</option>";
                        } else {
                            ankenInfstr +=  "<option value=\"" + p + "\">" + p + " / " + maxpagesize + "</option>";
                        }
                    }

                    ankenInfstr +=  "</select>"
                                +   "<button type=\"button\" class=\"webIconBtn js_nextAnkenPageBtn\" id=\"" + rowNumber + ":" + pageNum + "\">"
                                +   "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\" alt=\"次頁\">"
                                +   "<i class=\"icon-paging_right fs_17\"></i>"
                                +   "</button>"
                                +   "</div>";
                }
                //案件一覧
                ankenInfstr += "<table class=\"table-top w100\">";

                for (i=0; i<data.ankenList.length; i++) {

                    ankenInfstr += "<tr class=\"js_listHover cursor_p\">"
                                +    "<td onClick=\"setParentAnkenPop("
                                +        i + ",'" + rowNumber + "');\">"
                                +      "<input id=\"popAnkenSid_"  + i + "\"  value=\"" + data.ankenList[i].nanSid + "\" type=\"hidden\" />"
                                +      "<input id=\"popAnkenCode_" + i + "\"  value=\"" + data.ankenList[i].nanCode + "\" type=\"hidden\" />"
                                +      "<input id=\"popAnkenName_" + i + "\"  value=\"" + htmlEscape(data.ankenList[i].nanName) + "\" type=\"hidden\" />"
                                +      "<span class=\"cl_linkDef\">"
                                +        htmlEscape(data.ankenList[i].nanName)
                                +      "</span>"
                                +    "</td>"
                                +  "</tr>";
                }

                ankenInfstr += "</table>";
                //ページング
                if (parseInt(maxpagesize) > 1) {
                    ankenInfstr += "<div class=\"paging\">"
                        +  "<button type=\"button\" class=\"webIconBtn js_prevAnkenPageBtn\" id=\"" + rowNumber + ":" + pageNum + "\">"
                        +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\" alt=\"前頁\">"
                        +  "<i class=\"icon-paging_left fs_17\"></i>"
                        +  "</button>"
                        +  "<select name=\"usrInfChange\" id=\"" + rowNumber + "\" class=\"js_selchangeAnken paging_combo\">"

                    for (p=1; p <= parseInt(maxpagesize); p++) {
                        if (pageNum == p) {
                            ankenInfstr +=  "<option value=\"" + p + "\" selected=\"selected\">" + p + " / " + maxpagesize + "</option>";
                        } else {
                            ankenInfstr +=  "<option value=\"" + p + "\">" + p + " / " + maxpagesize + "</option>";
                        }
                    }

                    ankenInfstr +=  "</select>"
                                +   "<button type=\"button\" class=\"webIconBtn js_nextAnkenPageBtn\" id=\"" + rowNumber + ":" + pageNum + "\">"
                                +   "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\" alt=\"次頁\">"
                                +   "<i class=\"icon-paging_right fs_17\"></i>"
                                +   "</button>"
                                +   "</div>";
                }

                $('#ankenHistoryArea').append(ankenInfstr);

                /* 案件リンク hover */
                $('.user_select_area').hover(
                    function () {
                        $(this).removeClass("user_select_area").addClass("user_select_area_hover");
                    },
                    function () {
                        $(this).removeClass("user_select_area_hover").addClass("user_select_area");
                    }
                );

            }  else {

                $('#ankenHistoryArea').append("<span style=\"padding-top:220px;height:100%;width:100%;font-weight:bold;text-align:center;\">該当する履歴はありません。</span>");
            }
        }
    });
}

//案件履歴から案件選択
function setParentAnkenPop(selectSid, rowNumber) {

    var ankenSid = $('input#popAnkenSid_'  + selectSid).val();

    //企業・案件情報取得
    $.ajaxSetup({async:false});
    $.post('../nippou/ntp040.do', {
        "cmd":"getInfoAnken",
        "CMD":"getInfoAnken",
        "ankenSid":ankenSid},
    function(data) {
        if (data["success"]) {
        if (data == null || data == "") {
            return;
        }
        //案件情報の書き出し
        setAnkenData(data, rowNumber);

        //企業・顧客の書き出し
        setCompanyData(data, rowNumber);
        }
    });

    $('#ankenHistoryPop').dialog('close');

    return false;
}

//案件情報の書き出し
function setAnkenData(data, rowNumber) {

    var parentId  = "ntp040";
    var ankenSid  = data.ankenSid;  // 案件SID
    var ankenCode = data.ankenCode; // 案件コード
    var ankenName = htmlEscape(data.ankenName); // 案件名
    var mikomido  = data.mikomido;  // 見込み度

    if (rowNumber != "") {
        rowNumber = "_" + rowNumber;
    }

    if (ankenSid != null && ankenSid != "" && ankenSid != 0 && ankenSid != -1
            && $('#' + parentId + 'AnkenIdArea'     + rowNumber).html() != null
            && $('#' + parentId + 'AnkenNameArea'   + rowNumber).html() != null) {

        $('#' + parentId + 'AnkenIdArea'     + rowNumber).html("");
        $('#' + parentId + 'AnkenNameArea'      + rowNumber).html("");

        addParentParamAnkenPop(parentId + 'AnkenIdArea' + rowNumber, parentId + 'AnkenSid' + rowNumber, ankenSid);

        $('#' + parentId + 'AnkenCodeArea' + rowNumber).html("<span class=\"text_anken_code\">案件コード："
                + "<span class=\"anken_code_name" + rowNumber + "\">"
                + ankenCode
                + "</span>"
                + "</span>");

        $('#' + parentId + 'AnkenNameArea' + rowNumber).html("<a id=\"" + ankenSid + "\" class=\"cl_linkDef js_anken_click mr5\">"
                    + "<img class=\"btn_classicImg-display\" src=\"../nippou/images/classic/icon_anken_18.png\">"
                    + "<img class=\"btn_originalImg-display\" src=\"../nippou/images/original/icon_anken.png\">"
                    + "<span class=\"ml5\">" + ankenName + "</span>"
                    + "</a>"
                    + "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\" onclick=\"delAnken('" + parentId + "','" + rowNumber + "');\">"
                    + "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\" onclick=\"delAnken('" + parentId + "','" + rowNumber + "');\">");

    }

    //タイトル設定
    if ($("input[name=" + parentId + "Title" + rowNumber + "]").val() != null) {
        var titlestr = $("input[name=" + parentId + "Title" + rowNumber + "]").val();
        if (titlestr == '') {
            $("input[name=" + parentId + "Title" + rowNumber + "]").val(ankenName);
        }
    }

    //見込み度
    $("input[name=" + parentId + "Mikomido"  + rowNumber + "][value=\"" + mikomido + "\"]").attr("checked", true);
}

//企業・顧客情報の書き出し
function setCompanyData(data, trId) {
    var comcodestr = "";
    if (data.companySid != "") {
        comcodestr = "企業コード：";

        $('#ntp040CompanyIdArea' + trId).html(
            "<input name=\"ntp040CompanySid"     + trId + "\" value=\"" + data.companySid + "\" type=\"hidden\">");
        $('#ntp040CompanyBaseIdArea' + trId).html(
            "<input name=\"ntp040CompanyBaseSid" + trId + "\" value=\"" + data.companyBaseSid + "\" type=\"hidden\">");

        $('#ntp040CompanyCodeArea' + trId).html(comcodestr
            + data.companyCode);
        if (data.companyName != "") {
            $('#ntp040CompNameArea' + trId).html("<div><a id=\"" + data.companySid + "\" class=\"js_compClick mr5 cl_linkDef\">"
                    + "<img class=\"btn_classicImg-display wp18hp20\" src=\"../common/images/classic/icon_company.png\">"
                    + "<img class=\"btn_originalImg-display wp18hp20\" src=\"../common/images/original/icon_company.png\">"
                    + htmlEscape(data.companyName) + "<span class=\"ml5\">" + htmlEscape(data.companyBaseName) + "</span>"
                    + "</a>"
                    + "<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_delete_2.gif\"  onclick=\"delCompany('ntp040','" + trId + "');\">"
                    + "<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_delete.png\"  onclick=\"delCompany('ntp040','" + trId + "');\"></div>");
        } else {
            $('#ntp040CompNameArea' + trId).html("");
        }

        $('.js_ntp040CompCodeDspArea' + trId).html(comcodestr
            + data.companyCode);
        if (data.companyName != "") {
            $('.js_ntp040CompNameDspArea' + trId).html("<div><a id=\"" + data.companySid + "\" class=\"js_compClick mr5 cl_linkDef\">"
                    + "<img class=\"btn_classicImg-display wp18hp20\" src=\"../common/images/classic/icon_company.png\">"
                    + "<img class=\"btn_originalImg-display wp18hp20\" src=\"../common/images/original/icon_company.png\">"
                    + htmlEscape(data.companyName) + "<span class=\"ml5\">" + htmlEscape(data.companyBaseName) + "</span>"
                    + "</a></div>");
        } else {
            $('.js_ntp040CompNameDspArea' + trId).html("");
        }
    } else {
        comcodestr = "企業コード：";
        $('.js_ntp040CompCodeDspArea' + trId).html(comcodestr);
        $('.js_ntp040CompNameDspArea' + trId).html("");
    }
}

function addParentParamAdrPop(parentAreaId, paramName, value) {
    var parentArea = document.getElementById(parentAreaId);

    var paramHtml = parentArea.innerHTML;
    paramHtml += '<input type="hidden" name="' + paramName + '" value="' + value + '">';
    parentArea.innerHTML = paramHtml;
}

function addParentParamAnkenPop(parentAreaId, paramName, value) {
    var parentArea = document.getElementById(parentAreaId);

    var paramHtml = parentArea.innerHTML;
    paramHtml += '<input type="hidden" name="' + paramName + '" value="' + value + '">';
    parentArea.innerHTML = paramHtml;
}


function toggleActionAreaShow(actionAreaId) {
    $('#' + actionAreaId).show();
    return false;
}

function toggleActionAreaHide(actionAreaId) {
    $('#' + actionAreaId).hide();
    return false;
}

var checkBoxClickFlg = 0;
function clickMulti() {
    checkBoxClickFlg = 1;
    return false;
}

function clickSchName(typeNo, itmSid) {

    if (checkBoxClickFlg == 0) {
        //tr押下時
        if (!$('#tr_' + itmSid).children().children().attr('checked')) {
            $('#tr_' + itmSid).children().children().attr('checked','checked');
        } else {
            $('#tr_' + itmSid).children().children().attr('checked','');
        }
    } else {
        //checkBox押下時
        if ($('#tr_' + itmSid).children().children().attr('checked')) {
            $('#tr_' + itmSid).children().children().attr('checked','checked');
        } else {
            $('#tr_' + itmSid).children().children().attr('checked','');
        }
        checkBoxClickFlg = 0;
    }
    return false;
}

function resetScheduleObj() {
    //チェックをすべてはずす
    var scheduleList   = $("input:checkbox[name='popSchedule']");
    scheduleList.attr('checked', false);
    return false;
}

function resetProjectObj() {
    //チェックをすべてはずす
    var projectList   = $("input:checkbox[name='popProject']");
    projectList.attr('checked', false);
    return false;
}

function resetRowNumber() {
    //行番号を振りなおし(表示のみ変更)
    $(".js_ntpInfoNum").each(function(i, elem) {
        var numElm = null;
        if (elem != null) {
            numElm = $(elem).children().children(".js_nippouRowNumber"); // 子要素取得
        }
        if (numElm != null) {
            var num = (i + 1);
            numElm.text("NO." + num); // 子要素の番号表示を変更
        }
    });
}

function getNextRowNumber() {
    // 最大行番号(行数)を返す
    return $(".js_ntpInfoNum").length + 1;
}

function getViewRowNumber(rownum) {
    // 行IDから表示番号を返す
    var num = "";
    $(".js_ntpInfoNum").each(function(i, elem) {
        var numElm = null;
        if (elem != null && $(elem).children("#pos" + rownum).length > 0) {
            numElm = $(elem).children(".js_nippouRowNumber"); // 子要素取得
        }
        if (numElm != null) {
            num = $(numElm).text();
            return false; // ループ終了
        }
    });
    return num;
}

function getLastRowNumber() {
    // 最後の行IDを返す
    var num = 1;
    $(".js_ntpInfoNum:last").each(function(i, elem) {
        num = $(elem).attr("id").substr("pos".length);
    });
    return num;
}

function openAnkenWindow(parentPageId, rowNumber) {
    var winWidth=900;
    var winHeight=800;
    var winx = getCenterX(winWidth);
    var winy = getCenterY(winHeight);

    var url = '../nippou/ntp200.do';
    url += '?ntp200parentPageId=' + parentPageId + "&ntp200RowNumber=" + rowNumber;
    var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes , toolbar=no ,' +
    'resizable=no , left=' + winx + ', top=' + winy + ',scrollbars=yes';
    ankenSubWindow = window.open(url, 'thissite', opt);
    return false;
}

function delAnken(parentId, rowNumber) {

    $('#' + parentId + 'AnkenIdArea' + rowNumber).html("");
    $('#' + parentId + 'AnkenCodeArea' + rowNumber).html("");
    $('#' + parentId + 'AnkenNameArea' + rowNumber).html("");

    return false;
}

function addOpen() {
    if ($('input[name="cmd"]').val() == "add") {
        createTempDir(1);
    }
}

function createTempDir(rownum){
    //データ送信
    $.ajaxSetup({async:false});
    $.post('../nippou/ntp040.do', {
        "cmd":"tempPopup",
        "CMD":"tempPopup",
        "rowNum":rownum},
    function(data) {
        if (data != null && data != "") {
            alert('指定されたパラメータが不正です。');
        }
    });
}

function addUploadHtml(rowNum) {
    var uploadAreaHtml = '';
    getAttachmentFileIdList();

    uploadAreaHtml = '<div id=\"attachmentUploadArea' + rowNum + '\"'
                    + ' class=\"fileDropArea-outline-multi\"'
                    + ' style=\"' + getDropAreaStyle(rowNum) + '\"'
                    + ' data-id=\"'  + rowNum + '\">'
                    + '<div class=\"fs_14 txt_c txt_m fileDropArea-label\"'
                    + ' id=\"attachmentUploadArea_label_' + rowNum + '\"'
                    + ' style=\"' + getDropLabelStyle(rowNum) + '\"'
                    + ' data-id=\"'  + rowNum + '\">'
                    + 'ここにファイルをドロップ'
                    + '</div>'
                    + '</div>';
    return uploadAreaHtml;
}

function cmn110DropBan() {
    var dropBan = true;
    if ($('body').find('div').hasClass('ui-widget-overlay')) {
        return dropBan;
    }
    for (idx = 0; idx < $('input[name="attachment_ID_list"]').length; idx++) {
        if (!$('#attachment_FormArea' + (idx + 1)).hasClass("display_n")) {
            dropBan = false;
            break;
        }
    }
    return dropBan;
}