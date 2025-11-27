$(window).resize (function(){
    // 処理を記載
    var a = $('.formRoot').attr('width');
    $('.formRoot').css('max-width', $(window).width());
});

function fileNameClick(fileId) {

    document.forms[0].CMD.value='fileDownload';
    document.forms[0].rng030fileId.value=fileId;
    document.forms[0].submit();
    return false;

}

function copyApply() {
    document.forms[0].rng020copyApply.value = 'true';
    return buttonPush('copyApply');
}

function sasiRadioPush(disp,sortNo){
    var caution = $('#cautionMes_');
    if (disp == "none") {
        if (!caution.hasClass('display_n')) {
            caution.addClass('display_n');
        }
    } else {
        caution.removeClass('display_n');
    }
    document.forms[0].rng030SasiNo.value = sortNo;
}

function koetuRadioPush(disp,sortNo){
    document.forms[0].rng030koetuNo.value = sortNo;
}

function sasimodosi() {
    /* ポップアップ */
    $('#sasimodosiPop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        width: 750,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            閉じる: function() {
                $('#sasimodosiPop').dialog('close');
            }
        }
    });
}

function koetu() {
    /* ポップアップ */
    $('#koetuPop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        width: 750,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            閉じる: function() {
                $('#koetuPop').dialog('close');
            }
        }
    });
}
function commitAddKeiroPopup() {

    // パラメータ用のdiv要素生成
    var formElm = $('<div>', { id:'rng030CommitAddKeiro'});
    $('#rng030CommitAddKeiro').remove(); // 既に生成済みの場合、一旦削除(ダブルクリック対策)

    $.each($('#addKeiroPop input[type="hidden"]'), function() {
        formElm.append($('<input type=\"hidden\" name=\"' + $(this).attr('name') +'\" value=\"' + $(this).val() +'\"></input>'));
    });

    $('form[name="rng030Form"]').append(formElm); // フォームへdiv要素ごと追加

    buttonPush('addKeiro');
}
function drawAddKeiroPopup() {
    $('#addKeiroPop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        width: 800,
        modal: true,
        overlay: {
            backgroundColor: '#000000',
            opacity: 0.5
        },
        buttons: {
            閉じる: function() {
                $('#addKeiroPop').dialog('close');
                $('#addKeiroPop').empty();
            }
        }
    });
}
function loadAddKeiroPopup() {
    var param = new Array();
    param.push({
        name:"CMD",
        value:"loadAddKeiro",
        });

    $.each($('input[type="hidden"]'), function() {
        param.push({
            name:$(this).attr('name'),
            value:$(this).val()
            });
    });
    $.each($('select'), function() {
        param.push({
            name:$(this).attr('name'),
            value:$(this).val()
            });
    });
    var scrollY = $('#addKeiroPop > div').scrollTop();
    $('#addKeiroPop').load("../ringi/rng030.do",
            param,
            function() {
        $('#addKeiroPop > div').scrollTop(scrollY);

        if ($('#addKeiroPop').ui_multiselector) {
          $('#addKeiroPop').ui_multiselector({cmd:'init'});
        }

        drawAddKeiroPopup();
    });
}
function sasiPop(lineNo,rowNo){
    var disp = $('#dspPop_'+lineNo );

    if(disp.hasClass('display_n')){
        disp.removeClass('display_n');
         $("#linkPop_"+lineNo).html("隠す");
    }else{
        disp.addClass('display_n');
         $("#linkPop_"+lineNo).html("表示");
    }
}

function koetuPop(lineNo,rowNo){
    var disp = $('#koetuDsp_'+lineNo );

    if(disp.hasClass('display_n')){
         disp.removeClass('display_n');
         $("#koetuLink_"+lineNo).html("隠す");
    }else{
        disp.addClass('display_n');
         $("#koetuLink_"+lineNo).html("表示");
    }
}
function keiroPop(lineNo,rowNo){
    var disp = $('#keiroDsp_'+lineNo);
    if(disp.hasClass('display_n')){
        disp.removeClass('display_n');
         $("#keiroLink_"+lineNo).html("隠す");
    }else{
        disp.addClass('display_n');
         $("#keiroLink_"+lineNo).html("表示");
    }
}

function showDisp(keiroNo,singiNo){

    var link = $(this);
    var comClassName = document.getElementById("comment__"+keiroNo+singiNo) ;
    if(comClassName.className =="txt_comment"){
        comClassName.className = "txt_comment_all";
        link.html("隠す");
    }
    else {
        comClassName.className = "txt_comment";
        link.html("続きを表示");
    }
}

function delTemp(){

}

$(function(){
    var group = $('#group').text();
    var keiroCount = $('#keiroCount').text();
    for(var kIdx = 0; kIdx < keiroCount; kIdx++) {
        var singiCount = $('#singiCount'+ kIdx).text();
        for(var sIdx = 0; sIdx < singiCount; sIdx++) {
            var height= $('#comment__'+kIdx+sIdx).height();
            var comClassName = document.getElementById("comment__"+kIdx+sIdx) ;
            var dispMain = $('#disp__'+kIdx+sIdx);
            $("#kakutei__"+kIdx+sIdx).hide();
            $("#cansel__"+kIdx+sIdx).hide();
            if(height > 25) {
                comClassName.className = "txt_comment";
                dispMain.removeClass('display_n');
            }
        }
    }

    $(window).scroll(function () {
        var topHeader = $('#js_header_move').offset().top;
        var fheader = $('#js_fixed_header');
        if ($(window).scrollTop() > topHeader) {
            $('#js_fixed_header').css('width', $('#js_header_move').outerWidth());
            fheader.removeClass('display_n');
        } else {
            if (!fheader.hasClass('display_n')) {
                fheader.addClass('display_n');
            }
        }
     });


    /* ボタン hover */
    $(document).on({
          mouseenter:function () {
            $(this).addClass("btn_base_ringi_edit_hover");
          },
          mouseleave:function () {
              $(this).removeClass("btn_base_ringi_edit_hover");
          }
    }, '.btn_base_ringi_edit');

    /* 編集ボタン */
    $(document).on("click",".js_commentBtn", function(){
        var num = $(this).parent().attr("id");
        var text = $("#comment__"+num).text();
        $("#cmt__"+num).val(text.trim());
        var rksSid = $("#rksSid__" + num).text();
        var usrSid = $("#usrSid__" + num).text();

        var formId = "_commentEdit_row" + rksSid + usrSid;
        //現在の添付ファイル表示削除
        $("#attachmentFileListArea" + formId).children().remove();
        //コメント欄を入力状態に切替
        $("#edit__"+num).hide();
        $("#comment__"+num).hide();
        $("#linkTxt__"+num).hide();
        $("#temp__"+num).hide();
        $("#tempName__"+num).show();
        $("#kakutei__"+num).prop("disabled", true); // 確定ボタン表示前に無効化
        $("#kakutei__"+num).show();
        $("#cansel__"+num).show();
        $("#text__"+num).show();

        //添付ファイルセット
        paramStr = 'CMD=editRngData&editRksSid='
            +$("#rksSid__"+num).text()
            +'&rng030EditRowNo='
            +$("#rksSid__"+num).text()+$("#usrSid__"+num).text();
        paramStr = paramStr + '&rngSid=' + $('input[name="rngSid"]').val();
        paramStr = paramStr + '&rng010ViewAccount=' + $('input[name="rng010ViewAccount"]').val();

        $.ajax({
            async: true,
            url:  "../ringi/rng030.do",
            type: "post",
            data: paramStr
        }).done(function( data ) {
            if (data != null && $.isArray(data)) {
                $('#attachmentFileListArea').empty();
                for (i = 0; i < data.length; i++) {
                    //添付ファイルがある場合はoptionに設定
                    var elem           = document.createElement("option");
                    elem.text  = data[i].label;
                    elem.value = data[i].value;
                    var tempList = "";
                    tempList = "<div id=\"attachmentFileDetail" + "_" + elem.value
                            + '\" class=\"display_flex mt5\">'
                            + '<span class=\"verAlignMid\">'
                            + '<file-preview url="../common/cmn110.do?CMD=fileDownload&cmn110DlFileId=' + elem.value + '&cmn110Mode=0&cmn110pluginId=ringi&tempDirId=rng030&cmn110TempDirPlus=' + 'commentEdit/row' + rksSid + usrSid + '/" filename="' + elem.text + '"}>'
                            + '<img class=\"classic-display\"'
                            + ' src=\"../common/images/classic/icon_temp_file_2.png\"'
                            + ' draggable=\"false\">'
                            + '<img class=\"original-display\"'
                            + ' src=\"../common/images/original/icon_attach.png\"'
                            + ' draggable=\"false\">'
                            + '<a href=\"#!\"'
                            + ' onClick=\"attachmentFileDownload(' + elem.value + ', \'' + formId + '\');\">'
                            + '<span class=\"textLink ml5\">' + elem.text + '</span>'
                            + '</a>'
                            + '<img class=\"ml5 cursor_p btn_originalImg-display\"'
                            + ' src=\"../common/images/original/icon_delete.png\"'
                            + ' onClick=\"attachmentDeleteFile(' + elem.value + ', \'' + formId + '\');$(this).closest(\'div\').remove();\"'
                            + ' draggable=\"false\">'
                            + '<img class=\"ml5 cursor_p btn_classicImg-display\"'
                            + ' src=\"../common/images/classic/icon_delete.png\"'
                            + ' onClick=\"attachmentDeleteFile(' + elem.value + ', \'' + formId + '\');$(this).closest(\'div\').remove();\"'
                            + ' draggable=\"false\">'
                            + '</file-preview>'
                            + '</span>'
                            + '</div>';

                    $("#attachmentFileListArea" + formId).append(tempList);
                }
            }

            // 通信完了時に確定ボタン有効化(ボタン表示されている場合のみ)
            if ($("#kakutei__"+num).is(':visible')) {
                $("#kakutei__"+num).prop("disabled", false);
            }
        }).fail(function(data){
            if ($("#kakutei__"+num).is(':visible')) {
                $("#kakutei__"+num).prop("disabled", false);
            }
        });
    });

    /* 確定ボタン*/
    $(document).on("click", ".js_kakuteiBtn", function(){

        var num = $(this).parent().attr("id");
        var cmttext = $("#cmt__"+num).val();
        if (cmttext.length > 300) {
            $("#alert__"+num).show();
        } else {
            $("#alert__"+num).hide();
            $("#temp__"+num).empty();
            $("#edit__"+num).prop("disabled", true); // 編集ボタン表示前に無効化(連続押し防止)
            $("#edit__"+num).show();
            $("#comment__"+num).show();
            $("#temp__"+num).show();
            $("#kakutei__"+num).hide();
            $("#cansel__"+num).hide();
            $("#text__"+num).hide();
            $("#tempName__"+num).hide();

            var comClassName = document.getElementById("comment__"+num) ;
            comClassName.className = "txt_comment_all";

            cmttext = encodeURIComponent(cmttext);
            paramStr = 'CMD=editcomment&rng030Comment='
                +cmttext
                +'&rng030RksSid='
                +$("#rksSid__"+num).text()
                +'&rng010ViewAccount='
                +$("#usrSid__"+num).text()
                +'&rngSid='
                +$("#rngSid__"+num).text()
                +"&rng030EditRowNo="
                +$("#rksSid__"+num).text()+$("#usrSid__"+num).text();

            $.ajax({
                async: true,
                url:  "../ringi/rng030.do",
                type: "post",
                data: paramStr
            }).done(function( data ) {
                if (data != null || data != "") {
                    var roopInt = Object.keys(data).length;
                    roopInt = roopInt/3;
                    for(var i = 0; i < roopInt; i++) {
                        $("#temp__"+num).append(
                                "<file-preview url=\"../ringi/rng030.do?CMD=fileDownload&rng030fileId=" + data["sid"+i] + "&rngSid=" + $("#rngSid__"+num).text() + "&rng010ViewAccount=" + $("#usrSid__"+num).text() + "\" filename=\"" + data["name"+i] + "\"}>"
                                + "<img class=\"classic-display\" src=\"../common/images/classic/icon_temp_file.gif\">"
                                + "<img class=\"original-display\" src=\"../common/images/original/icon_attach.png\">"
                                + "<a href=\"#!\" onClick=\"return fileNameClick("+data["sid"+i]+");\">"
                                + "<span class=\"small_link\"><u>"+data["name"+i] + data["size"+i]
                                + "</u></span></a>"
                                + "</file-preview>"
                                + "<br>");
                    }
                }
                var text = $("#cmt__"+num).val();

                $("#comspan__"+num).text(text.trim());
                $("#comspan__"+num).addClass("text_base");

                if ($("#edit__"+num).is(':visible')) {
                    $("#edit__"+num).prop("disabled", false);
                }
            }).fail(function(data){
                var text = $("#comment__"+num).text();
                $("#cmt__"+num).val(text);
                if ($("#edit__"+num).is(':visible')) {
                    $("#edit__"+num).prop("disabled", false);
                }
                alert("コメント編集エラー");
            });
        }
    });


    /* キャンセルボタン*/
    $(document).on("click", ".js_canselBtn", function(){

        var num = $(this).parent().attr("id");
        $("#edit__"+num).show();
        $("#comment__"+num).show();
        $("#temp__"+num).show();
        $("#tempName__"+num).hide();
        $("#kakutei__"+num).hide();
        $("#cansel__"+num).hide();
        $("#text__"+num).hide();
        $("#alert__"+num).hide();
        var comClassName = document.getElementById("comment__"+num) ;
        comClassName.className = "txt_comment_all";
    });

    var jsonStr = null;
    /* 添付削除ボタン(経路一覧 コメント編集)*/
    $(document).on("click", "#js_header_move .js_delBtn", function(){

        var num = $(this).parent().attr("id");
        num = num.substr(10);

        //選択ファイル取得
        var selectfiles = $('select[name=rng030selectFiles' + num + ']').val();
        jsonStr = '[' + selectfiles + ']';
        paramStr = 'CMD=delEditTemp&rngTempDataEdit='
            +jsonStr
            +"&rng030EditRowNo="
            +$("#rksSid__"+num).text()+$("#usrSid__"+num).text();
        paramStr = paramStr + '&rngSid=' + $('input[name="rngSid"]').val();
        paramStr = paramStr + '&rng010ViewAccount=' + $('input[name="rng010ViewAccount"]').val();

        $.ajax({
            async: true,
            url:  "../ringi/rng030.do",
            type: "post",
            data: paramStr
        }).done(function(data) {
            //option要素削除
            $('select[name=rng030selectFiles' + num + '] option:selected').remove();
        }).fail(function(data){
            alert("添付編集エラー");
        });
    });

    /* 後閲時ラジオボタン要素クリック */
    $(document).on("click", ".js_select_radio_koetu", function(){
        var check = $(this).children();
        var radioValue = $(this).find(':hidden[name="select_radio"]').val();
        check.attr("checked", true);
        koetuRadioPush("none",radioValue);
    });

    /* 差し戻し時ラジオボタン要素 */
    /* hover */
    $(document).on({
       mouseenter:function (e) {
          if($(this).children().length) {
              $(this).addClass("js_select_radio_sasi cursor_p");
          }
       },
       mouseleave:function (e) {
           if($(this).children().length) {
               $(this).removeClass("js_select_radio_sasi cursor_p");
           }
       }
    }, '.js_radio_select');
    /* click */
    $(document).on("click", ".js_select_radio_sasi", function(){
        var check = $(this).children();
        var radioValue = $(this).find(':hidden[name="select_radio"]').val();
        var none = $(this).find(':hidden[name="select_radio_none"]').val();
        check.attr("checked", true);
        sasiRadioPush(none ,radioValue);
    });

    $(document).on("click", ".js_resultLink", function() {
        $('#apiResultPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            modal: true,
            dialogClass:'dialog_button',
            height: '400',
            width: '500',
            overflow: 'auto',
            title: '実行結果',
            overlay: {
                backgroundColor: '#FF0000',
                opacity: 0.5
            },
            buttons: {
              閉じる: function() {
                $(this).dialog('close');
              }
            }
        });
    });
});

function cmn110DropBan() {
    if ($('body').find('div').hasClass('ui-widget-overlay')) {
      return true;
    }

    var rngProcMode = $("input[name='rngProcMode']").val();
    var buttonDspFlg = $("button[onclick^='attachmentLoadFile']").is(":visible");
  if (rngProcMode == 0 || buttonDspFlg) {
    return false;
  }
    return true;
}