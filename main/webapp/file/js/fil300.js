function fil300ErrorTextReset() {
  $('#upperArea .js_errorArea').children().remove();
}

function fil300FileTreeClick() {
    fil300ErrorTextReset();
    loadingStart();
    document.forms[0].CMD.value = document.forms[0].escapeCmd.value;
    var param = createParamFil300();
    if (document.forms[0].fil300SelectPage.value == null) {
        param["fil300SelectPage"] = "1";
    }

    var paramStr = $.param(param, false);

    if ($("input[name='fil300BeforeInsertFile']").length > 0) {
        param["fil300BeforeInsertFile"] = "";
        for (var idx = 0; idx < $("input[name='fil300BeforeInsertFile']").length; idx++) {
            paramStr += "&fil300BeforeInsertFile=" + $("input[name='fil300BeforeInsertFile']").eq(idx).val();
        }
    }

    $.ajax({
       async: true,
       url : "../file/fil300.do",
       type: "post",
       data: paramStr,
       dataType: "html"
    }).done(function(data) {
        try {
          data = $.parseJSON(data);
        } catch (error) {
          //レスポンスがjsonではない
          $('html').html('');
          $('body').append($(data));
          return;
        }

        if (data["listSize"] > 0) {
            var detail = "";
            for (var i = 0; i < data["listSize"]; i++) {
                detail += "<div class='js_preview cursor_p display_flex p3 content-hoverChange' data-feasid='"+ data["sid_" + i] + "' data-filename='" + data["fileName_" + i] + "'>";
                detail += "  <div class='mwp70 wp70 no_w txt_r pr10'>";
                detail +=      data["sid_" + i];
                detail += "  </div>";
                detail += "  <div class='no_w'>";
                detail +=      data["fileName_" + i];
                detail += "    <span class='ml5'>"
                detail += "      <img class='btn_classicImg-display' src='../common/images/classic/icon_preview.png'>";
                detail += "      <img class='btn_originalImg-display' src='../common/images/original/icon_preview.png'>";
                detail += "    </span>"
                detail += "  </div>";
                detail += "</div>";
            }
            $(".js_multiFileListArea").empty();
            $(".js_multiFileListArea").append(detail);
            $(".js_importArea-select").removeClass("display_none");
            $(".js_importArea-noSelect").addClass("display_none");

            $(".js_kakuninPaging").addClass("display_none");
            var maxPage = data["maxPage"];
            if (maxPage > 1) {
                var selectOption = "";
                for (var num = 1; num <= maxPage; num++) {
                    selectOption += "<option value='" + num + "'";
                    if (num == document.forms[0].fil300SelectPage.value) {
                        selectOption += " selected ";
                        selectNum = num;
                    }
                    selectOption += ">";
                    selectOption +=   num + " / " + maxPage;
                    selectOption += "</option>";
                }
                $(".js_kakuninPage").html(selectOption);
                $(".js_kakuninPaging").removeClass("display_none");
            }

            $('.js_listHover')
                .mouseenter(function (e) {
                    $(this).children().addClass("list_content-on");
                    $(this).prev().children().addClass("list_content-topBorder");
                })
                .mouseleave(function (e) {
                    $(this).children().removeClass("list_content-on");
                    $(this).prev().children().removeClass("list_content-topBorder");
                });
        } else {
            $(".js_multiFileListArea").empty();
            $(".js_errors ").text("仮登録ファイルが存在しません。");
            $(".js_kakuninPaging").addClass("display_none");
        }
    }).fail(function(data) {
        //closeloadingPop();
        $(".js_kakuninPaging").addClass("display_none");
    }).always(function() {
        loadingFinish();
    });

    return false;
}

function fil300FileTreeClickFolder(kbn, sid, fcbSid, clickObj) {

    document.forms[0].fil300SelectCabinet.value = fcbSid;
    document.forms[0].fil300SelectPage.value = 1;
    $('#attachmentFileListArea').html('');
    //loadingPop(msglist["nowLoading"]);
    $(".js_folderLink").removeClass("cl_linkSelected fw_bold");
    if (kbn == 0) {
        document.forms[0].fil300SelectDir.value = sid;
        document.forms[0].CMD.value = "fil300selectDir";
        document.forms[0].escapeCmd.value = "fil300selectDir";
        $(".js_download-nosave").addClass("display_none");
        $(".js_download-normal").removeClass("display_none");
        fil300FileTreeClick();
        $(".js_folder" + sid).addClass("cl_linkSelected fw_bold");
    } else {
        document.forms[0].fil300SelectDir.value = 0;
        document.forms[0].CMD.value = "fil300noParent";
        document.forms[0].escapeCmd.value = "fil300noParent";
        $(".js_download-nosave").removeClass("display_none");
        $(".js_download-normal").addClass("display_none");
        fil300FileTreeClick();
        clickObj.classList.add('cl_linkSelected');
        clickObj.classList.add('fw_bold');
    }
}

function fil300NextPage() {
    var page = document.forms[0].fil300SelectPage.value;
    page = Number(page);
    if (document.forms[0].fil300SelectPage.length < Number(page) + 1) {
        return;
    }
    document.forms[0].fil300SelectPage.value = Number(page) + 1;
    fil300FileTreeClick();
}

function fil300PrevPage() {
    var page = document.forms[0].fil300SelectPage.value;
    page = Number(page);
    if (page <= 1) {
        return;
    }

    document.forms[0].fil300SelectPage.value = page -1;
    fil300FileTreeClick();
}

function fil300NextPageImp() {
    var page = $("select[name='fil300ImpPage']").val();
    page = Number(page) + 1;
    if ($("select[name='fil300ImpPage']").children().length < Number(page)) {
        return;
    }
    $("select[name='fil300ImpPage']").val(page);
    fil300ImportCheck();
}

function fil300PrevPageImp() {
    var page = $("select[name='fil300ImpPage']").val();
    page = Number(page);
    if (page <= 1) {
        return;
    }
    $("select[name='fil300ImpPage']").val(page -1);
    fil300ImportCheck();
}

function fil300ShowInputArea(feaSid) {

    var param = createParamFil300();
    param["CMD"] = "fil300getFileInfo";
    param["fil300SelectFile"] = feaSid;
    var paramStr = $.param(param, true);

    $.ajax({
       async: true,
       url : "../file/fil300.do",
       type: "post",
       data: paramStr,
       dataType: "html"
    }).done(function(data) {
        try {
          data = $.parseJSON(data);
        } catch (error) {
          //レスポンスがjsonではない
          $('html').html('');
          $('body').append($(data));
          return;
        }
        $(".js_inputArea").removeClass("display_none");
        $(".js_inputArea-noSelect").addClass("display_none");
        document.forms[0].fil300SelectFile.value=feaSid;

        $(this).closest("li").addClass("bgC_select");
        $(this).closest("li").addClass("file_select");

        if (data["success"]) {
            $(".js_inputArea input[name='fil300FileName']").val(data["fileName"]);

            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            var day = now.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            $('.js_frDatePicker').val(
                year + "/" + month + "/" + day
            );

            $(".js_fileExt").text(data["fileExt"]);
            if (data["filePathCabinet"] != null) {
                var saveFilePath = data["filePathCabinet"] + "/";
                var saveInitDate = year + "年" + month + "月";
                var defGrpName = data["defGrpName"];
                saveFilePath += createFolderPath(data["filePathFolder1"], saveInitDate, defGrpName);
                saveFilePath += createFolderPath(data["filePathFolder2"], saveInitDate, defGrpName);
                saveFilePath += createFolderPath(data["filePathFolder3"], saveInitDate, defGrpName);

                $(".js_savePath").removeClass("display_none");
                $(".js_savePath-str").empty();
                $(".js_savePath-str").append(saveFilePath);
            }
            $(".js_savePath-tree").addClass("display_none");
            $(".js_treeSavePath").empty();
            for (var idx = 0; data["treeSavePathLv" + idx] != null; idx++) {
                for (var j = 0; j < data["treeSavePathLv" + idx].length; j++) {
                    var savePathTree = "<span class='display_none' name='treeSavePathLv" + idx + "' data-treevalue='"
                    + htmlEscape(data["treeSavePathLv" + idx][j])
                    + "'></span>";
                    $(".js_treeSavePath").append(savePathTree);
                }
            }
            if (data["cabinetName"] != null) {
                $("#tree2").empty();
                $(".js_savePath-tree").removeClass("display_none");
                initSavePath();
                setSavePathTree();
            }
        } else {
            alert('指定した仮登録ファイルの変更は許可されていません。');
        }
    }).fail(function(data) {
        //closeloadingPop();
        $(".js_impCombo").addClass("display_none");
    }).always(function() {
        loadingFinish();
    });
}

function createFolderPath(sortFolder, saveInitDate, defGrpName) {
    let folderPath = '';
    if (sortFolder != null) {
        if (sortFolder == "uploadDate") {
            folderPath = saveInitDate;
        } else if (sortFolder == "tradeDate") {
            folderPath = "<span class='js_filePathTradeDate'>取引年月</span>";
        } else if (sortFolder == "tradeTarget") {
            folderPath = "<span class='js_filePathTradeTarget'>取引先</span>";
        } else if (sortFolder == "tradeDefgroup") {
            folderPath = htmlEscape(defGrpName);
        }
        folderPath += "/";
    }

    return folderPath;
}

function htmlEscape(s) {
    return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/</g,"&lt;").replace(/>/g,"&gt;") ;
}

function fil300SelectFolder(fdrSid) {
    fil300ErrorTextReset();
    loadingStart();

    document.forms[0].fil300SelectDir.value=fdrSid;
    var param = createParamFil300();
    param["CMD"] = "fil300getFolderPath";
    var paramStr = $.param(param, true);

    $.ajax({
       async: true,
       url : "../file/fil300.do",
       type: "post",
       data: paramStr,
       dataType: "html"
    }).done(function(data) {

        try {
          data = $.parseJSON(data);
        } catch (error) {
          //レスポンスがjsonではない
          $('html').html('');
          $('body').append($(data));
          return;
        }
        if (data["success"]) {
            $(".js_cabName").text(data["filePath"]);
        } else if (data["error"]) {
            var error = $('<div><b></b></div>');
            error.addClass('textError');

            error = error.appendTo('#upperArea .js_errorArea');
            error.find('b').text(data["error"]);
        }
    }).fail(function(data) {
        //closeloadingPop();
        $(".js_impCombo").addClass("display_none");
        alert("保存先パス情報の取得に失敗しました");
    }).always(function() {
        loadingFinish();
    });
}

function tradeMoneyNoKbn() {
    if (document.forms[0].fil300TradeMoneyKbn.checked == true) {
        document.forms[0].fil300TradeMoney.disabled=true;
        document.forms[0].fil300TradeMoneyGaika.disabled=true;
    } else {
        document.forms[0].fil300TradeMoney.disabled=false;
        document.forms[0].fil300TradeMoneyGaika.disabled=false;
    }
}


function fil300InsertFile() {
    document.forms[0].CMD.value="fil300insertFile"
    document.forms[0].submit();
}

function fil300HideInputArea() {
    $(".js_inputArea").addClass("display_none");
    $(".js_inputArea-noSelect").removeClass("display_none");
    $(".js_dirTable").removeClass("bgC_lightGray");
    $(".js_fileName").closest("li").removeClass("bgC_select");
    $(".js_errors").empty();
    $(".js_inputArea input[name='fil300FileName']").val("");
    $(".js_inputArea input[name='fil300TradeDate']").val("");
    $(".js_inputArea input[name='fil300TradeTarget']").val("");
    $(".js_inputArea input[name='fil300TradeMoneyKbn']").prop("checked", false);
    $(".js_inputArea input[name='fil300TradeMoney']").val("");
    $(".js_inputArea input[name='fil300TradeMoney']").prop("disabled", false);
    $(".js_inputArea select[name='fil300TradeMoneyGaika']").prop("disabled", false);
    $(".js_inputArea select[name='fil300TradeMoneyGaika']").prop("selectedIndex", 0);

    document.forms[0].fil300SelectDir.value="";
    $(".js_cabName").empty();
    $(".js_fileName").removeClass("cl_linkSelected fw_bold");
    $(".js_fileExt").text("");
    $(".js_treeview li").removeClass("bgC_select");
    $("#upperArea").addClass("js_yuko");
}

function fil300deletePop() {
    var h = window.innerHeight / 2;
    $('#deletePop').dialog({
        position: {
            of : 'body',
            at: 'top+' + h,
            my: 'center'
        },
          autoOpen: true,
          bgiframe: true,
          resizable: false,
          dialogClass:'dialog_button',
          height:200,
          width: 400,
          modal: true,
          overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
          },
          buttons: [{
              text: "はい",
              click: function () {
                  fil300deleteFile();
                  $(this).dialog('close');
              }
          }, {
              text: "いいえ",
              click: function () {
                  $(this).dialog('close');
              }
          }]
    });
}

function fil300deleteFile() {
    loadingStart();
    var param = createParamFil300();
    param["CMD"] = "fil300deleteFile";
    param["fil300BeforeInsertFile"] = "";
    var paramStr = $.param(param, true);
    if ($("input[name='fil300BeforeInsertFile']").length > 0) {
        paramStr = paramStr.replace("&fil300BeforeInsertFile=", "");
        for (var idx = 0; idx < $("input[name='fil300BeforeInsertFile']").length; idx++) {
            paramStr += "&fil300BeforeInsertFile=" + $("input[name='fil300BeforeInsertFile']").eq(idx).val();
        }
    }

    $.ajax({
        async: true,
        url : "../file/fil300.do",
        type: "post",
       data: paramStr,
       dataType: "html"
    }).done(function(data) {

        try {
          data = $.parseJSON(data);
        } catch (error) {
          //レスポンスがjsonではない
          $('html').html('');
          $('body').append($(data));
          return;
        }
        if (data["errorSize"] > 0) {
            $(".js_errors").empty();
            for (var idx = 0; idx < data["errorSize"]; idx++) {
                $(".js_errors").append(data["error_" + idx] + "<br>");
            }
        } else if (data["success"]) {
            if (data["forward"] == "fil300") {
                var sid = $("input[name='fil300SelectFile']").val();
                $(".js_file" + sid).closest("li").remove();
                if (data["delFolderSize"] > 0) {
                    for (var i = 0; i < data["delFolderSize"]; i++) {
                        $(".js_folder" + data["delFolder_" + i]).closest("li").remove();
                    }
                }
                $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
                $("input[name='fil300BeforeInsertFile'][value='" + sid + "']").remove();

                $(".js_message").text(data["message"]);
                fil300HideInputArea();
                displayToast("finish");
            } else {
                document.forms[0].CMD.value = "fil300moveDelete";
                document.forms[0].submit();
            }
        } else {
            var sid = $("input[name='fil300SelectFile']").val();
            $(".js_file" + sid).closest("li").remove();
            $(".js_message").text("対象ファイルは存在しません。");
            fil300HideInputArea();
            displayToast("finish");
        }
    }).fail(function(data) {
    //closeloadingPop();
        alert("削除に失敗しました。画面を開きなおしてください。")
    }).always(function() {
        loadingFinish();
    });
}

function closeYukoCabinet() {
    $("#tree").addClass("display_none");
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

//formの値からパラメータを生成する
function createParamFil300() {
    var serialArr = $('#js_filForm').serializeArray();
    var ret = {};
    $.each(serialArr, function () {
        ret[this.name]= this.value;
    });
    return ret;
}

function showKakunin() {
    var h = window.innerHeight / 2;
    $('#impKakuninPop').dialog({
        position: {
            of : 'body',
            at: 'top+' + h,
            my: 'center'
        },
        autoOpen: true,
        bgiframe: true,
        resizable: false,
        dialogClass:'dialog_button',
        maxHeight:600,
        minHeight:300,
        width: 1000,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: [{
            text:"確定",
            click:  function() {
                buttonPush("fil300import")
                $(this).dialog('close');
            }
        },{
            text:"キャンセル",
                click:  function() {
                $("#upperArea").addClass("js_yuko");
                $(this).dialog('close');
            }
          }]
      });
      return false;
}

function fil300ImportCheck() {
    loadingStart();
    $('#impKakuninPop').dialog({
        autoOpen: false
        });
    //loadingPop(msglist["nowLoading"]);
    var param = createParamFil300();
    param["CMD"] = "fil300importCheck";
    var page = $("select[name='fil300ImpPage']").val();
    if (page == null) {
        page = 1;
    }
    param["fil300ImpPage"] = page;
    param["fil300BeforeInsertFile"] = "";
    var paramStr = $.param(param, true);
    if ($("input[name='fil300BeforeInsertFile']").length > 0) {
        paramStr = paramStr.replace("&fil300BeforeInsertFile=", "");
        for (var idx = 0; idx < $("input[name='fil300BeforeInsertFile']").length; idx++) {
            paramStr += "&fil300BeforeInsertFile=" + $("input[name='fil300BeforeInsertFile']").eq(idx).val();
        }
    }

    $.ajax({
        async: true,
        url : "../file/fil300.do",
        type: "post",
        data: paramStr,
        dataType: "html"
    }).done(function(data) {

        try {
          data = $.parseJSON(data);
        } catch (error) {
          //レスポンスがjsonではない
          $('html').html('');
          $('body').append($(data));
          return;
        }
        $('#impKakuninPop').dialog('close');
        if (data["listSize"] > 0) {
            $('.js_errorNum').empty();
            var detail = "";
            var tdClass = "";
            for (var i = 0; i < data["listSize"]; i++) {
                if (data["parentExistFlg_" + i] == false
                        && data["errorFlg_" + i] != 9) {
                    tdClass = "bgC_select";
                } else {
                    tdClass = "";
                }
                detail += "<tr class='js_addTr'>"
                detail += "<td class='" + tdClass + "'>";
                detail +=    data["sid_" + i];
                detail +=  "</td>";
                if (data["errorFlg_" + i] == 9) {
                    detail +=  "<td colspan='4' class=''>";
                    detail +=    data["errorText_" + i];
                    detail +=  "</td>";
                } else {
                    detail += "<td class='" + tdClass + "'>";
                    detail +=    data["fileName_" + i];
                    detail +=  "</td>";
                    detail += "<td class='" + tdClass + " txt_c'>";
                    detail +=    data["tradeDate_" + i];
                    detail +=  "</td>";
                    detail += "<td class='" + tdClass + "'>";
                    detail +=    data["tradeTarget_" + i];
                    detail +=  "</td>";
                    if (data["tradeMoney_" + i] == "-") {
                        detail += "<td class='" + tdClass + " txt_c'>";
                    } else {
                        detail += "<td class='" + tdClass + " txt_r'>";
                    }
                    detail +=    data["tradeMoney_" + i];
                    detail +=  "</td>";
                }
                detail += "</tr>"
            }
            $(".js_addTr").remove();
            $(".js_kakuninTable").append(detail);

            if (data["invalidCount"] > 0) {
                $(".js_errorNum").append("<span class='cl_fontWarn'>" + data['invalidMessage'] + "</span>");
            } else {
                $(".js_errorNum").text("");
            }

            $(".js_importPaging").addClass("display_none");
            var maxPage = data["maxPage"];
            if (maxPage > 1) {
                var selectOption = "";
                for (var num = 1; num <= maxPage; num++) {
                    selectOption += "<option value='" + num + "'";
                    if (num == page) {
                        selectOption += " selected ";
                        selectNum = num;
                    }
                    selectOption += ">";
                    selectOption +=   num + " / " + maxPage;
                    selectOption += "</option>";
                }
                $(".js_impCombo-opt").html(selectOption);
                $(".js_importPaging").removeClass("display_none");
            }
            showKakunin();
            $(".js_errors").html("");
        } else if (data["fileErrorSize"] > 0) {
            $(".js_errors").html("");
            for (var i = 0; i < data["fileErrorSize"]; i++) {
                $(".js_errors").append(data["error_" + i] + "<br>");
            }
        } else {
            $(".js_errors").text("ファイル情報の取得に失敗しました");
            $(".js_impCombo").addClass("display_none");
        }
    }).fail(function(data) {
        //closeloadingPop();
        $(".js_impCombo").addClass("display_none");
    }).always(function() {
        loadingFinish();
    });
    return false;
}

function openTreeFolder(target) {
    $("." + target).parent().children(".js_hitarea").trigger("click");
}

//ロード状態
var loadingTimer;
function loadingStart() {
  clearTimeout(loadingTimer);
  $('.js_loading').removeClass('opacity6');
  $('.js_loading').addClass('opacity0');
  $('.js_loading').removeClass('display_n');
  loadingTimer = setTimeout(function() {
    $('.js_loading').removeClass('opacity0');
    $('.js_loading').eq(0).addClass('opacity6');
  }, 500)
}

//ロード状態解除
function loadingFinish() {
  $('.js_loading').addClass('display_n');
}

var initFolderPath;
var initSavePath;
var setFolderPathTree;
var setSavePathTree;

//イベントを登録
$(function(){
    //画面左 フォルダツリー表示
    // ツリー表示初期化
    initFolderPath = function(){
    $("#tree").treeview({
      name : 'fileTree',
      allOpen : $('#sidetreecontrol a').eq(1),
      allClose : $('#sidetreecontrol a').eq(0),
      duration : 'fast'
    });}

    initSavePath = function() {
    $("#tree2").treeview({
      name : 'fileTree2',
      allOpen : $('#sidetreecontrol2 a').eq(1),
      allClose : $('#sidetreecontrol2 a').eq(0),
      duration : 'fast'
    });}

    function __makeTree(kbn) {
        if (kbn == 0) {
            return createTreesValueArray('treeFormLv', 0, 11);
        } else {
            return createTreesValueArray('treeSavePathLv', 0, 11);
        }
    }

    setFolderPathTree = function() {
    $('#tree').treeworker_ctrl().run({
        tree:__makeTree(0),
        sepKey:document.getElementsByName('sepKey')[0].value,
        treeClass:function (sp) {

            this.name = sp[0];
            this.paths = new Array();
            this.open = false;
            this.label =  '';
            var clickEvent = "";
            var insertMode = sp[4];
            //一括登録の場合
            if (insertMode == 1) {
                clickEvent = "fil300FileTreeClickFolder(0, " + sp[0] + ", " + sp[5] + ");";
                var dirSid = sp[0];
                if (dirSid == -3) {
                    clickEvent = "fil300FileTreeClickFolder(1," + sp[5] + ", " + sp[5] + ", this);"
                }

                if (dirSid != -1 && dirSid != -2) {
                    this.label += "<a href=\"#!\" class='js_folder" + sp[0] + " js_cabinet" + sp[5] + " js_folderLink display_inline-block' onClick=\"" + clickEvent + "\">";
                }

                this.label += '<img class="classic-display mr5" src="../common/images/classic/icon_folder.png" border="0" alt="">'
                               + '<img class="original-display mr5" src="../common/images/original/icon_folder_box.png" border="0" alt="">'
                               + sp[2];
                if (dirSid != -1 && dirSid != -2) {
                    this.label +=  " "+ "(<span class='js_countText'>" +  sp[3] + "</span>)"
                }

                if (sp[0] == -3) {
                    this.label += "<span class='ml5'><img class='btn_classicImg-display' src='../common/images/classic/icon_warn.png'>"
                                   + "<img class='btn_originalImg-display' src='../common/images/original/icon_warn.png'></span>";
                }
                if (dirSid != -1 && dirSid != -2) {
                    this.label += "</a>";
                }
                this.label += "<div class='pos_absolute w100'></div>";
                this.label += "<input type='hidden' name='fileCount' class='js_fileCount' value='" + sp[3] + "'>";
            }

            //単体登録の場合
            if (insertMode == 0) {
                //フォルダ
                if (sp.length < 9) {
                    this.label = "<div class='display_inline-block cursor_p textLink js_folder" + sp[0] + "' data-level='" + sp[sp.length - 1] + "' onclick=\"openTreeFolder('js_folder" + sp[0] + "');\">";
                    this.label += '<img class="classic-display mr5" src="../common/images/classic/icon_folder.png" border="0" alt="">'
                               + ' <img class="original-display mr5" src="../common/images/original/icon_folder_box.png" border="0" alt="">';
                    this.label += sp[2];
                    if (sp[0] == -1) {
                        this.label += "<span class='ml5'><img class='btn_classicImg-display' src='../common/images/classic/icon_warn.png'>"
                                   + "<img class='btn_originalImg-display' src='../common/images/original/icon_warn.png'></span>";
                    }
                    this.label += "</div>";
                }

                //ファイル
                if (sp.length >= 9) {
                    this.label = "<file-preview url=\"../file/fil300.do?CMD=fil300downloadImage&fil300SelectFile=" + sp[6] + "\" filename=\"" + sp[2] + "\">";
                    this.label += "<div class='display_inline-block' data-level='" + sp[sp.length - 1] + "'><a href=\"#!\" class='js_fileName js_file" + sp[6] + "'>";
                    this.label += sp[2];
                    this.label += "</a>";
                    this.label += "</div>";
                    this.label += "<input type='hidden' name='feaSid' class='js_feaSid' value='" + sp[6] + "'>";
                    this.label += "<input type='hidden' name='filename' value='" + sp[2] + "'>";
                    this.label += "</file-preview>";
                }
            }

            return this;
         }.toString()
    });}

    initFolderPath();
    setFolderPathTree();

    setSavePathTree = function() {
    $('#tree2').treeworker_ctrl().run({
        tree:__makeTree(1),
        sepKey:document.getElementsByName('sepKey')[0].value,
        treeClass:function (sp) {

            this.name = sp[0];
            this.paths = new Array();
            this.open = false;
            this.label =  '';

            var clickEv = '';
            if (sp[3] == 1) {
              clickEv = "fil300SelectFolder(" + sp[0] + ");";
            }

            this.label = "<div class='display_inline-block'>";
            if (sp[3] == 1) {
              this.label += "<a href='#!' onClick='" + clickEv + "' class='js_fileName'>";
            } else {
              this.label += '<span class="cl_fontWeek">';
            }
            this.label += '<img class="classic-display mr5" src="../common/images/classic/icon_folder.png" border="0" alt="">'
                       +  '<img class="original-display mr5" src="../common/images/original/icon_folder_box.png" border="0" alt="">';
            this.label += sp[2];
            if (sp[3] == 1) {
              this.label += "</a>";
            } else {
              this.label += "</span>";
            }
            this.label += "</div>";

            return this;
         }.toString()
    });}

    $(".js_tabHeader").on("click", function(){
        var showId = $(this).attr('id');
        if (showId == "single") {
            document.forms[0].fil300insertMode.value='0';
        } else if (showId == "multiple") {
            document.forms[0].fil300insertMode.value='1';
        } else {
            buttonPush('fil330')
            return false;
        }
        document.forms[0].CMD.value='init';
        $(".js_treeText").empty();
        document.forms[0].submit();

        return false;
    });

    //ヘルプ表示
    $(document).on("click", ".js_help",function(){
        var h = window.innerHeight / 2;
        $('#helpPop').dialog({
            position: {
                of : 'body',
                at: 'top+' + h,
                my: 'center'
            },
              autoOpen: true,
              bgiframe: true,
              resizable: false,
              dialogClass:'dialog_button',
              height:240,
              width: 800,
              modal: true,
              overlay: {
                backgroundColor: '#000000',
                opacity: 0.5
              },
              buttons: {
                閉じる: function() {
                  $(this).dialog('close');
                  return false;
                }
              }
        });
        return false;
      });

    $(document).on("click", ".js_impBtn",function(){
        $("select[name='fil300ImpPage']").val(1)
        fil300ImportCheck();
    });

    $(document).on("click", ".js_preview", function(){
      var feaSid = $(this).data("feasid");
      var filename = $(this).data("filename");
      var url = "../file/fil300.do?CMD=fil300downloadImage&fil300SelectFile=" + feaSid;
      openPreviewWindow(url, filename);
      $(".js_multiFileListArea div").removeClass("content-hoverChangeSelected");
      $(this).addClass("content-hoverChangeSelected");
      return false;
    });

    $(document).on("click", ".js_yuko .js_fileName", function(){
      if (!$(this).hasClass('cl_linkSelected')) {
          loadingStart();
          fil300HideInputArea();
          fil300ErrorTextReset();
          $(".js_fileName").removeClass("cl_linkSelected fw_bold");
          $(this).addClass("cl_linkSelected fw_bold");
          var level = $(this).parent().data("level");
          $(this).closest("li").addClass("file_select-" + level);
          var feaSid = $(this).closest("div").siblings("input[name='feaSid']").val();
          fil300ShowInputArea(feaSid);
          $("#upperArea").removeClass("js_yuko");

          if (existPreviewWindow()) {
              var feaSid = $(this).closest("div").siblings("input[name='feaSid']").val();
              var filename = $(this).closest("div").siblings("input[name='filename']").val();
              var url = "../file/fil300.do?CMD=fil300downloadImage&fil300SelectFile=" + feaSid;
              openPreviewWindow(url, filename);
          }
      }
      return false;
    });

    $(document).on("click", ".js_addBtn", function(){
        loadingStart();
        var param = createParamFil300();
        param["CMD"] = "fil300insertFile";
        param["fil300BeforeInsertFile"] = "";
        var paramStr = $.param(param, true);
        if ($("input[name='fil300BeforeInsertFile']").length > 0) {
            paramStr = paramStr.replace("&fil300BeforeInsertFile=", "");
            for (var idx = 0; idx < $("input[name='fil300BeforeInsertFile']").length; idx++) {
                paramStr += "&fil300BeforeInsertFile=" + $("input[name='fil300BeforeInsertFile']").eq(idx).val();
            }
        }

        $.ajax({
            async: true,
            url : "../file/fil300.do",
            type: "post",
            data: paramStr,
            dataType: "html"
        }).done(function(data) {

            try {
              data = $.parseJSON(data);
            } catch (error) {
              //レスポンスがjsonではない
              $('html').html('');
              $('body').append($(data));
              return;
            }
            if (data["errorSize"] > 0) {
                $(".js_errors").empty();
                for (var idx = 0; idx < data["errorSize"]; idx++) {
                    $(".js_errors").append(data["error_" + idx] + "<br>");
                }

                if (data["feaAuthError"] == true) {
                    $('.js_errorArea').html('<div class="textError"><b>' + data["error_0"] + '</b><br></div>');
                    fil300HideInputArea();
                    document.forms[0].fil300SelectFile.value = "-1";
                }

            } else if (data["success"]) {
                if (data["forward"] == "fil300") {
                    var sid = $("input[name='fil300SelectFile']").val();
                    $(".js_file" + sid).closest("li").remove();
                    if (data["delFolderSize"] > 0) {
                        for (var i = 0; i < data["delFolderSize"]; i++) {
                            $(".js_folder" + data["delFolder_" + i]).closest("li").remove();
                        }
                    }
                    $("input[name='fil300BeforeInsertFile'][value='" + sid + "']").remove();
                    $("input[name='org.apache.struts.taglib.html.TOKEN']").val(data["token"]);
                    $(".js_message").text(data["message"]);
                    fil300HideInputArea();
                    displayToast("finish");
                } else {
                    document.forms[0].CMD.value = "fil300moveAdd";
                    document.forms[0].submit();
                }
            } else {
                var sid = $("input[name='fil300SelectFile']").val();
                $(".js_file" + sid).closest("li").remove();
                $(".js_message").text("対象ファイルは存在しません。");
                fil300HideInputArea();
                displayToast("finish");
            }
        }).fail(function(data) {
        //closeloadingPop();
            alert("登録に失敗しました。画面を開きなおしてください。")
        }).always(function() {
            loadingFinish();
        });
    });

   $('.js_listHover')
       .mouseenter(function (e) {
           $(this).children().addClass("list_content-on");
           $(this).prev().children().addClass("list_content-topBorder");
       })
       .mouseleave(function (e) {
           $(this).children().removeClass("list_content-on");
           $(this).prev().children().removeClass("list_content-topBorder");
       });

    $('.js_frDatePicker').blur(function(){
        if (!$('.js_savePath').hasClass('display_none')) {
            if ($('.js_filePathTradeDate').length) {
                setTimeout(() => {
                    $('.js_filePathTradeDate').empty();
                    var date = $('.js_frDatePicker').val()
                    $('.js_filePathTradeDate').append(date.substring(0, 4) + "年" + date.substring(5, 7) + "月");
                }, "300");
            }
        }
    });
    $('.js_tradeTarget').blur(function(){
        if (!$('.js_savePath').hasClass('display_none')) {
            if ($('.js_filePathTradeTarget').length) {
                $('.js_filePathTradeTarget').empty();
                $('.js_filePathTradeTarget').text($('.js_tradeTarget').val());
            }
        }
    });
    $('#ui-datepicker-div').hide();

    // 元のmethodを保存
    var originalAddClassMethod = jQuery.fn.addClass;

    jQuery.fn.addClass = function(){
        // 元のmethodを実行
        var result = originalAddClassMethod.apply(this, arguments);

        // カスタムイベントを発火
        jQuery(this).trigger('cssClassAdd');

        return result;
    }
    $('.js_treeSideList').find('.js_tree_loader').bind('cssClassAdd', function(){
        //初回描画時、すべて開く
        $('#sidetreecontrol a').eq(1).trigger("click");
        if ($("input[name='fil300insertMode']").val() == 0) {
            //単体登録 初期選択用
            if ($('.js_folder' + $("input[name='fil300SelectFile']").val()).length > 0) {
                $('.js_folder' + $("input[name='fil300SelectFile']").val()).trigger("click");
            }
        } else {
            //一括登録 初期選択用
            if ($('.js_cabinet' + $("input[name='fil300SelectCabinet']").val()).length > 0) {
                $('.js_cabinet' + $("input[name='fil300SelectCabinet']").val()).eq(0).trigger("click");
            }
            if ($('.js_folder' + $("input[name='fil300SelectDir']").val()).length > 0) {
                $('.js_folder' + $("input[name='fil300SelectDir']").val()).trigger("click");
            }
        }

    });
    $('.js_treeSaveSelectList').find('.js_tree_loader').bind('cssClassAdd', function(){
        //初回描画時、すべて開く
        $('#sidetreecontrol2 a').eq(1).trigger("click");
    });
});
