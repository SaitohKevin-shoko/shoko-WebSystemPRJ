var checkBoxClickFlg = 0;

function clickMulti() {
    checkBoxClickFlg = 1;
    return false;
}

function clickShohinName(typeNo, itmSid) {

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

function resetShohinName(typeNo, itmSid) {

    $('#tr_' + itmSid).children().children().attr('checked','');
    var cssName = 'td_line_color' + typeNo;
    $('#tr_' + itmSid)[0].className = cssName;

    return false;
}


$(function() {
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
    /* radio:click */
    $(".js_sord_radio").live("click", function(){
        var check = $(this).children().children();
        check.attr("checked", true);
    });

    $(".js_apcUserBtn").live("click", function(){

        $('#tmpUsrArea').children().remove();
        $('#tmpUsrArea').append("<div class=\"w100 h100 txt_c\"><img class=\"btn_classicImg-display\" src=\"../common/images/classic/icon_loader.gif\" /><div class=\"loader-ball\"><span></span><span ></span><span ></span></div></div>");

        //ユーザ一覧取得
        var usrTmpSid = $(this).attr('id');
        var pageNum   = $("input:hidden[name='ntp086pageNum']").val();

        /* ユーザ一覧ポップアップ */
        $('#apcUserPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            height: 650,
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
        getUsrInfList(usrTmpSid, pageNum);
    });

    //ユーザ一覧 次ページクリック
    $(".js_nextPageBtn").live("click", function(){
        var paramStr = $(this).attr('id').split(":");
        getUsrInfList(paramStr[0], parseInt(paramStr[1]) + 1);
    });

    //ユーザ一覧 前ページクリック
    $(".js_prevPageBtn").live("click", function(){
        var paramStr = $(this).attr('id').split(":");
        getUsrInfList(paramStr[0], parseInt(paramStr[1]) - 1);
    });

    //ユーザ一覧 コンボ変更
    $(".js_selchange").live("change", function(){
        getUsrInfList($(this).attr('id'), $(this).val());
    });

    /* ユーザ一覧行  hover */
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

function buttonSubmit(mode, sid) {
    document.forms[0].ntp086NttSid.value=sid;
    buttonPush(mode);
}

//ユーザ一覧成形
function getUsrInfList(tmpSid, pageNum) {

    //ユーザ一覧取得
    $.ajaxSetup({async:false});
    $.post('../nippou/ntp086.do', {"cmd":"getUsrList",
                                   "CMD":"getUsrList",
                                   "tmpSid":tmpSid,
                                   "pageNum":pageNum},
      function(data) {
        if (data != null || data != "") {

            $('#tmpUsrArea').children().remove();

            if (data.usrInfDataList != null && data.usrInfDataList.length > 0) {

                var usrInfstr = "";
                var maxpagesize = data.maxPageSize;
                pageNum = data.pageNum;

                //ページング
                if (parseInt(maxpagesize) > 1) {
                    usrInfstr += "<div class=\"paging\">"
                              +  "  <button type=\"button\" class=\"webIconBtn js_prevPageBtn\" id=\"" + tmpSid + ":" + pageNum + "\" >"
                              +  "    <img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\" alt=\"前頁\">"
                              +  "    <i class=\"icon-paging_left fs_17\"></i>"
                              +  "  </button>"
                              +  "  <select name=\"usrInfChange\" id=\"" + tmpSid + "\" class=\"js_selchange paging_combo\">";

                    for (p=1; p <= parseInt(maxpagesize); p++) {
                        if (pageNum == p) {
                            usrInfstr +=  "<option value=\"" + p + "\" selected=\"selected\">" + p + " / " + maxpagesize + "</option>";
                        } else {
                            usrInfstr +=  "<option value=\"" + p + "\">" + p + " / " + maxpagesize + "</option>";
                        }
                    }

                    usrInfstr += "  </select>"
                              +  "  <button type=\"button\" class=\"webIconBtn js_nextPageBtn\" id=\"" + tmpSid + ":" + pageNum + "\" >"
                              +  "    <img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\" alt=\"次頁\">"
                              +  "    <i class=\"icon-paging_right fs_17\"></i>"
                              +  "  </button>"
                              +  "</div>";
                }

                //ユーザ一覧
                usrInfstr     += "<table class=\"table-top table_col-even w100\">";

                for (i=0; i<data.usrInfDataList.length; i++) {

                    usrInfstr += "  <tr class=\"js_listHover cursor_p\" onclick=\"return openUserInfoWindow("+ data.usrInfDataList[i].usrSid + ");\">"
                              +  "    <td class=\"w100\">"
                    if (data.usrInfDataList[i].binSid == "0") {
                        //写真なし
                        usrInfstr += "    <img class=\"classic-display wp30\" src=\"../common/images/classic/icon_photo.gif\" name=\"userImage\" alt=\"写真\" border=\"1\">"
                                  +  "    <img class=\"original-display wp30\" src=\"../common/images/original/photo.png\" name=\"userImage\" alt=\"写真\" border=\"1\">";
                    } else {
                        if (data.usrInfDataList[i].usiPictKf == "0") {
                            //写真あり 公開
                            usrInfstr += "<img class=\"wp30\" src=\"../common/cmn100.do?CMD=getImageFile&cmn100binSid=" + data.usrInfDataList[i].binSid + "\" alt=\"写真\" >";
                        } else {
                            //写真あり 非公開
                            usrInfstr += "<span class=\"pos_rel\">"
                                      +  "  <img class=\"classic-display wp30\" src=\"../common/images/classic/icon_photo_hikokai.gif\" name=\"userImage\" alt=\"写真\" border=\"1\">"
                                      +  "  <img class=\"original-display wp30\" src=\"../common/images/original/photo_hikoukai_bg.png\" name=\"userImage\" alt=\"写真\" border=\"1\">"
                                      +  "  <span class=\"cl_fontWarn fw_b pos_as fs_10\">非公開</span>"
                                      +  "</span>";
                        }
                    }
                    var mukoUserClass = "";
                    if (data.usrInfDataList[i].usrUkoFlg == 1) {
                        mukoUserClass = "mukoUser";
                    }
                    usrInfstr += "<span class=\"cl_linkDef ml5 " + mukoUserClass + "\">"
                              +  htmlEscape(data.usrInfDataList[i].usiSei) + "&nbsp;&nbsp;" + htmlEscape(data.usrInfDataList[i].usiMei) + "\</span>"
                              +  "</td>"
                              +  "</tr>";
                }

                usrInfstr += "</table>";


                //ページング
                if (parseInt(maxpagesize) > 1) {
                    usrInfstr += "<div class=\"paging\">"
                                +  "  <button type=\"button\" class=\"webIconBtn js_prevPageBtn\" id=\"" + tmpSid + ":" + pageNum + "\" >"
                                +  "    <img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\" alt=\"前頁\">"
                                +  "    <i class=\"icon-paging_left fs_17\"></i>"
                                +  "  </button>"
                              +  "  <select name=\"usrInfChange\" id=\"" + tmpSid + "\" class=\"js_selchange paging_combo\">";

                    for (p=1; p <= parseInt(maxpagesize); p++) {
                        if (pageNum == p) {
                            usrInfstr +=  "<option value=\"" + p + "\" selected=\"selected\">" + p + " / " + maxpagesize + "</option>";
                        } else {
                            usrInfstr +=  "<option value=\"" + p + "\">" + p + " / " + maxpagesize + "</option>";
                        }
                    }

                    usrInfstr += "</select>"
                                +  "  <button type=\"button\" class=\"webIconBtn js_nextPageBtn\" id=\"" + tmpSid + ":" + pageNum + "\" >"
                                +  "    <img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\" alt=\"次頁\">"
                                +  "    <i class=\"icon-paging_right fs_17\"></i>"
                                +  "  </button>"
                              +  "</div>";
                }

                $('#tmpUsrArea').append(usrInfstr);

                /* ユーザリンク hover */
                $('.user_select_area').hover(
                    function () {
                        $(this).removeClass("user_select_area").addClass("user_select_area_hover");
                      },
                      function () {
                          $(this).removeClass("user_select_area_hover").addClass("user_select_area");
                      }
                );
            } else {
                $('#tmpUsrArea').append("<span class=\"w100 h100 txt_c\">適用するユーザは設定されていません。</span>");
            }
        }
    });
}