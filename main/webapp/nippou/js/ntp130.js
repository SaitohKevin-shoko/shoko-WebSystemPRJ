function buttonSubmit(mode, sid) {
    document.forms[0].ntp130NhnSid.value=sid;
    document.forms[0].ntp130ProcMode.value=mode;
    buttonPush(mode);
}
function changePage(pageCombo) {
    if (pageCombo == 0) {
        document.forms[0].ntp130PageBottom.value = document.forms[0].ntp130PageTop.value;
    } else {
        document.forms[0].ntp130PageTop.value = document.forms[0].ntp130PageBottom.value;
    }
    buttonPush('changePage');
}


function changeMode(cmd){
    document.forms[0].CMD.value = "";
    $("input[name=ntp130DspKbn]").val(cmd);
    document.forms[0].submit();
    return false;
}

function buttonSubmitCatagory(cmd, mode, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp130ProcMode.value=mode;
    document.forms[0].ntp130EditSid.value=sid;
    document.forms[0].submit();
    return false;
}

function buttonCatagoryAdd(cmd, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].ntp130ProcMode.value=cmd;
    document.forms[0].ntp130SelCategorySid.value=sid;
    document.forms[0].ntp130EditSid.value=0;
    document.forms[0].submit();
    return false;
}

//function buttonDspShohin(cmd, sid) {
//    document.forms[0].CMD.value=cmd;
//    document.forms[0].ntp130EditSid.value=sid;
//    document.forms[0].submit();
//    return false;
//}

$(function() {

    $(".js_shohinListBtn").live("click", function(){

        $('#tmpShohinArea').children().remove();

        //商品一覧取得
        var categorySid = $(this).attr('id');
        var pageNum   = $("input:hidden[name='ntp130ShohinPageNum']").val();

        /* 商品一覧ポップアップ */
        $('#shohinPop').dialog({
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

        //商品一覧成形
        getShohinList(categorySid, pageNum);
    });

    //商品一覧 次ページクリック
    $(".js_nextPageBtn").live("click", function(){
        var paramStr = $(this).attr('id').split(":");
        getShohinList(paramStr[0], parseInt(paramStr[1]) + 1);
    });

    //商品一覧 前ページクリック
    $(".js_prevPageBtn").live("click", function(){
        var paramStr = $(this).attr('id').split(":");
        getShohinList(paramStr[0], parseInt(paramStr[1]) - 1);
    });

    //商品一覧 コンボ変更
    $(".js_selchange").live("change", function(){
        getShohinList($(this).attr('id'), $(this).val());
    });

    /* 一覧行  hover */
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
        var check = $(this).children();
        check.attr("checked", true);
    });

});

//商品一覧成形
function getShohinList(categorySid, pageNum) {

    //商品一覧取得
    $.ajaxSetup({async:false});
    $.post('../nippou/ntp130.do', {"cmd":"getShohinList",
                                   "CMD":"getShohinList",
                                   "categorySid":categorySid,
                                   "pageNum":pageNum},
      function(data) {
        if (data != null || data != "") {

            $('#tmpShohinArea').children().remove();

            if (data.shohinDataList != null && data.shohinDataList.length > 0) {

                var shohinInfstr = "";
                var maxpagesize = data.maxPageSize;
                pageNum = data.pageNum;

                //ページング
                if (parseInt(maxpagesize) > 1) {
                    shohinInfstr += "<div class=\"paging\">"
                              +  "<button type=\"button\" class=\"webIconBtn js_prevPageBtn\" id=\"" + categorySid + ":" + pageNum + "\">"
                              +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\">"
                              +  "<i class=\"icon-paging_left fs_17\"></i>"
                              +  "</button>"
                              +  "<select name=\"shohinChange\" id=\"" + categorySid + "\" class=\"paging_combo js_selchange\">";

                    for (p=1; p <= parseInt(maxpagesize); p++) {
                        if (pageNum == p) {
                            shohinInfstr +=  "<option value=\"" + p + "\" selected=\"selected\">" + p + " / " + maxpagesize + "</option>";
                        } else {
                            shohinInfstr +=  "<option value=\"" + p + "\">" + p + " / " + maxpagesize + "</option>";
                        }
                    }

                    shohinInfstr +=  "</select>"
                                 +  "<button type=\"button\" class=\"webIconBtn js_nextPageBtn\" id=\"" + categorySid + ":" + pageNum + "\">"
                                 +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\">"
                                 +  "<i class=\"icon-paging_right fs_17\"></i>"
                                 +  "</button>"
                                 +   "</div>";
                }


                //商品一覧
                shohinInfstr += "<table class=\"table-top w100\">";

                for (i=0; i<data.shohinDataList.length; i++) {

                    shohinInfstr += "<tr class=\"cursor_p js_listHover\" onclick=\"return buttonSubmit('edit',"
                              +  data.shohinDataList[i].nhnSid + ");\">"

                    shohinInfstr += "<td>"
                              +  "<span class=\"cl_linkDef\">" + data.shohinDataList[i].nhnName + "</span>"
                              +  "</td>"
                              +  "</tr>";
                }

                shohinInfstr += "</table>";

                //ページング
                if (parseInt(maxpagesize) > 1) {
                    shohinInfstr += "<div class=\"paging\">"
                              +  "<button type=\"button\" class=\"webIconBtn js_prevPageBtn\" id=\"" + categorySid + ":" + pageNum + "\">"
                              +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_l.png\">"
                              +  "<i class=\"icon-paging_left fs_17\"></i>"
                              +  "</button>"
                              +  "<select name=\"shohinChange\" id=\"" + categorySid + "\" class=\"paging_combo js_selchange\">";

                    for (p=1; p <= parseInt(maxpagesize); p++) {
                        if (pageNum == p) {
                            shohinInfstr +=  "<option value=\"" + p + "\" selected=\"selected\">" + p + " / " + maxpagesize + "</option>";
                        } else {
                            shohinInfstr +=  "<option value=\"" + p + "\">" + p + " / " + maxpagesize + "</option>";
                        }
                    }

                    shohinInfstr +=  "</select>"
                                 +  "<button type=\"button\" class=\"webIconBtn js_nextPageBtn\" id=\"" + categorySid + ":" + pageNum + "\">"
                                 +  "<img class=\"m0 btn_classicImg-display\" src=\"../common/images/classic/icon_arrow_r.png\">"
                                 +  "<i class=\"icon-paging_right fs_17\"></i>"
                                 +  "</button>"
                                 +   "</div>";
                }

                $('#tmpShohinArea').append(shohinInfstr);

            } else {
                $('#tmpShohinArea').append("<div class=\"txt_c cl_fontWarn\">該当する商品はありません。</div>");
            }
        }
    });
}