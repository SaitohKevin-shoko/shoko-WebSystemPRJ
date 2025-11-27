$(function() {
    //キャンセルボタン
    $('.js_cancel').on('click', function () {
        $('#cancelPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            modal: true,
            dialogClass:'dialog_button',
            maxHeight: 200,
            width: '400',
            overflow: 'auto',
            title: msglist_rng310['cmn.warning'],
            overlay: {
                backgroundColor: '#FF0000',
                opacity: 0.5
            },
            buttons: {
                OK: function() {
                    document.forms[0].CMD.value = 'rng310_back';
                    document.forms[0].submit();
                },
                閉じる: function() {
                    $(this).dialog('close');
                }
            }
        });
    });
    $(".js_useKbnToggle").each( function() {
        if($(this).prop('checked')) {
            var inputParam = document.createElement("input");
            inputParam.setAttribute("name", "rng310ActionParamUseIndexList");
            inputParam.setAttribute("type", "hidden");
            inputParam.setAttribute("value", $(this).closest('.js_editActionParam').data('index'));
            $("form").append(inputParam);
        }
    });

        //アクションパラメータ設定画面に遷移
    $(document).on('click', '.js_editActionParam', function(e) {
        if (!$(e.target).closest('.js_actionParamSortHandle, .toggle-button, .js_copyDeleteIcon, .js_openCloseActionParam').length) {
            var selectIndex = $(this).data('index');
            $('.textError').empty();
            //入力チェック
            document.forms[0].CMD.value = 'checkApiSetting';
            let paramStr = $('form[name="rng310Form"]').serialize();
            $.ajax({
                url: "../ringi/rng310.do",
                type: "POST",
                data: paramStr
            }).done(function(data) {
                if (data['success']) {
                    document.forms[0].CMD.value = 'editActionParam';
                    document.forms[0].rng310SelectActionParamIndex.value = selectIndex;
                    document.forms[0].submit();
                } else {
                    let errorMsg = data['errorMsg'];
                    if (errorMsg == null) {
                        errorMsg = msglist_rng310["cmn.error.access"];
                    }
                    $('.js_textError').append(
                        "<b>" + errorMsg + "</b>"
                    );
                }
            });
        }
    });

    //アクションパラメータ削除確認ダイアログ表示
    $(document).on('click', '.js_delActionParam', function () {
        let content = $(this).closest('.js_editActionParam');
        let delActionParamName = $(this).closest('.js_editActionParam').data('actionparamname');
        let index = $(this).closest('.js_editActionParam').data('index');
        $('.js_delActionParamNameArea').text('・' + delActionParamName);
        $('#actionParamDelKakuninPop').dialog({
        autoOpen: true,  // hide dialog
        bgiframe: true,   // for IE6
        resizable: false,
        modal: true,
        dialogClass:'dialog_button',
        width: '500',
        overflow: 'auto',
        title: msglist_rng310['cmn.delete.check'],
        overlay: {
            backgroundColor: '#FF0000',
            opacity: 0.5
        },
        buttons: {
            OK: function() {
                content.remove();
                $("form").append("<input type=\"hidden\" name=\"rng310RemoveActionParamIndex\" value=\"" + index + "\" />");
                $(this).dialog('close');
            },
            キャンセル: function() {
            $(this).dialog('close');
            }
        }
        });
    });

      //アクションパラメータ追加ダイアログを表示
    $('.js_addActionParam').on('click', function () {
        $('.textError').empty();
        //入力チェック
        document.forms[0].CMD.value = 'checkApiSetting';
        let paramStr = $('form[name="rng310Form"]').serialize();
        $.ajax({
            url: "../ringi/rng310.do",
            type: "POST",
            data: paramStr
        }).done(function(data) {
            if (data['success']) {
                //初期化
                $('.js_addActionParamName').val('');
                $('.js_conditionType').first().prop('checked', true);
                $('.js_errorMsgAreaForDialog').empty();
                $('#executeConditionList').empty();
                $('.js_executeConditionNotSetMsg').removeClass('display_none');
                $('.js_executeConditionRadio').addClass('display_none');

                $('#addActionParamPop').dialog({
                    autoOpen: true,  // hide dialog
                    bgiframe: true,   // for IE6
                    resizable: false,
                    modal: true,
                    dialogClass:'dialog_button',
                    maxHeight: 500,
                    width: '1000',
                    overflow: 'auto',
                    title: msglist_rng310['rng.rng310.12'],
                    overlay: {
                        backgroundColor: '#FF0000',
                        opacity: 0.5
                    },
                    buttons: {
                        OK: function() {
                            setActionParamHidden();
                            document.forms[0].CMD.value = 'checkAddActionParam';
                            let paramStr = $('form[name="rng310Form"]').serialize();
                            $.ajax({
                                url: "../ringi/rng310.do",
                                type: "POST",
                                data: paramStr
                            }).done(function(data) {
                                if (data['success']) {
                                    document.forms[0].CMD.value = 'addActionParam';
                                    document.forms[0].rng310SelectActionParamIndex.value = "-1";
                                    document.forms[0].submit();
                                } else {
                                    let errorMsg = '';
                                    if (data['errorMsgList'] == null || data['errorMsgList'].length == 0) {
                                        errorMsg = '<div class=\"textError\">' + msglist_rng310["cmn.error.access"] + '</div>';
                                    } else {
                                        errorMsg += '<div class=\"textError\">' + data['errorMsgList'][i] + '</div>'
                                    }
                                    $('.js_errorMsgAreaForDialog').html(errorMsg);
                                }
                            });
                        },
                        閉じる: function() {
                            $('#executeConditionHelp').addClass('visibility-hidden');
                            $(this).dialog('close');
                        }
                    }
                });
            } else {
                let errorMsg = data['errorMsg'];
                if (errorMsg == null) {
                    errorMsg = msglist_rng310["cmn.error.access"];
                }
                $('.js_textError').append(
                    "<b>" + errorMsg + "</b>"
                );
            }
        });
    });

  //繰り返し実行ヘルプダイアログを表示
    $('.js_dspRepeatExecuteHelp').on('click', function () {
        $('#repeatExecuteHelpPop').dialog({
            autoOpen: true,  // hide dialog
            bgiframe: true,   // for IE6
            resizable: false,
            modal: true,
            dialogClass:'dialog_button',
            width: '900',
            height: 700,
            overflow: 'auto',
            title: '繰り返し実行とは',
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

    //アクションパラメータの並び替え
    sortActionParam();

    //対象要素コンボの表示/非表示
    changeRepeatElementComboDsp();
    $('input[name="rng310RepeatKbn"]').on('change', function() {
        changeRepeatElementComboDsp();
    });

    //使用する/しない時の背景色を設定
    $('.js_useKbnToggle').each(function() {
        setActionParamBgc($(this));
    });
    $(document).on('change', '.js_useKbnToggle', function () {
    // $('.js_useKbnToggle').on('change', function() {
        setActionParamBgc($(this));
        $('input[name="rng310ActionParamUseIndexList"]').remove();
        $(".js_useKbnToggle").each( function() {
            if($(this).prop('checked')) {
                var inputParam = document.createElement("input");
                inputParam.setAttribute("name", "rng310ActionParamUseIndexList");
                inputParam.setAttribute("type", "hidden");
                inputParam.setAttribute("value", $(this).closest('.js_editActionParam').data('index'));
                $("form").append(inputParam);
            }
        });
        //初期値として追加
        var inputParam = document.createElement("input");
        inputParam.setAttribute("name", "rng310ActionParamUseIndexList");
        inputParam.setAttribute("type", "hidden");
        inputParam.setAttribute("value", "-1");
        $("form").append(inputParam);
    });

    //アクションパラメータヘルプアイコン押下
    $('.js_dspActionParamHelp').on('click', function() {
        dspActionParamHelp();
    });
    $(document).click(function(e) {
        if (!$(e.target).closest('#actionParamHelp, .js_dspActionParamHelp').length) {
        $('#actionParamHelp').addClass('visibility-hidden');
        }
    })

    //アクションパラメータを複写
    $(document).on('click', '.js_copyActionParam', function() {
        copyActionParam($(this));
    });

    //使用不可アクションパラメータの背景色をセット
    $('.js_actionParamDisable').closest('.actionParam').addClass('bgC_lightGray');

    //ツールチップ表示
    $(document).on('mouseover', 'a:has(span.tooltips)', function(e) {
        if ($('#ttp').length <= 0) {
            $("form").append("<div id=\"ttp\">"+ ($(this).children("span.tooltips").html()) +"</div>");
            if ($("#ttp").width() < ttpMinWidth) {
                ttpMinWidth = $("#ttp").width();
            }
            setTooltipMouseOver(e);
        }
    }).mousemove(function(e) {
        if ($("#ttp").width() < ttpMinWidth) {
            ttpMinWidth = $("#ttp").width();
        }
        setTooltipPosition(e);
    }).mouseout(function() {
        $("#ttp").remove();
    });

    //アクションパラメータの開閉
    $(document).on('click', '.js_openCloseActionParam', function() {
        openCloseActinParam($(this));
    });

    //実行条件の表示/非表示
    $('input[name="executeConditionDspKbn"]').on('change', function() {
        if ($('input[name="executeConditionDspKbn"]:checked').val() == "0") {
            $('.js_executeConditionArea').show();
        } else if ($('input[name="executeConditionDspKbn"]:checked').val() == "1") {
            $('.js_executeConditionArea').hide();
        }
    });

    //初期値として追加
    var inputParam = document.createElement("input");
    inputParam.setAttribute("name", "rng310ActionParamUseIndexList");
    inputParam.setAttribute("type", "hidden");
    inputParam.setAttribute("value", "-1");
    $("form").append(inputParam);
});

//アクションパラメータをソート
function sortActionParam() {
    let el = document.getElementById('actionParamList');
    let actionParamSortable = new Sortable(el, {
        animation: 150,
        ghostClass: 'out3',
        preventOnFilter: false,
        handle: '.js_actionParamSortHandle',
        onStart: onStartEvent,
        onEnd: onEndEvent,
        onSort: onSortEvent
    });
    function onStartEvent(e) {
        $('.js_sortIcon').removeClass("sortIcon");
        $('.js_actionParamSortHandle').addClass("bgC_none");
        $('.js_copyDeleteIcon').removeClass("copyDeleteIcon");
        $('.js_actionParam').removeClass('bgC_contetHover');
    }
    function onEndEvent(e) {
        //ホバーイベントを元に戻す
        $('.js_sortIcon').addClass("sortIcon");
        $('.js_actionParamSortHandle').removeClass("bgC_none");
        $('.js_copyDeleteIcon').addClass("copyDeleteIcon");
        $('.js_actionParam').addClass('bgC_contetHover');
    }
    function onSortEvent(e) {
        //変更後の並び順一覧
        var indexArray = [];
        $(".js_editActionParam").each( function() {
            indexArray.push($(this).data('index'));
        });
        document.forms[0].rng310SortActionParamIndex.value = indexArray.toString();
    }
}

//繰り返し実行設定時、コンボを表示/非表示
function changeRepeatElementComboDsp() {
    if ($('input[name="rng310RepeatKbn"]:checked').val() == "0") {
        $('.js_repeatElementCombo').hide();
    } else if ($('input[name="rng310RepeatKbn"]:checked').val() == "1") {
        $('.js_repeatElementCombo').show();
    }
}

//使用しないアクションパラメータの背景色をセット
function setActionParamBgc(element) {
    if (element.prop('checked')) {
        element.closest('.actionParam').removeClass('bgC_lightGray');
    } else {
        element.closest('.actionParam').addClass('bgC_lightGray');
    }
}

//アクションパラメータヘルプ吹き出しを表示
function dspActionParamHelp() {
    let top = $('.js_dspActionParamHelp').offset().top - $('#actionParamHelp').outerHeight() - 20;
    let left = $('.js_dspActionParamHelp').offset().left - 35;
    $('#actionParamHelp').css({
        'top': top,
        'left': left
    })
    $('#actionParamHelp').removeClass('visibility-hidden');
}

//アクションパラメータを複写
function copyActionParam(element) {
    document.forms[0].CMD.value = 'copyActionParam';
    document.forms[0].rng310CopyActionParamIndex.value = element.closest('.actionParam').data('index');
    if (element.parent().parent().parent().find('.js_useKbnToggle').prop('checked') == true) {
        //使用する
        document.forms[0].rng310CopyActionParamUseKbn.value = "1";
    } else if (element.parent().parent().parent().find('.js_useKbnToggle').prop('checked') == false) {
        //使用しない
        document.forms[0].rng310CopyActionParamUseKbn.value = "0";
    } else {
        //入力に不備がある為、元の状態を引き継ぐ。
        document.forms[0].rng310CopyActionParamUseKbn.value = "-1";
    }
    let paramStr = $('form[name="rng310Form"]').serialize();
    $.ajax({
        url: "../ringi/rng310.do",
        type: "POST",
        data: paramStr
    }).done(function(data) {
        if (data['success']) {
            //アクションパラメータ追加
            let actionParam = '<tr class=\"actionParam js_editActionParam outC_deep bgC_contetHover bgC_tableCell cursor_p hp40\" data-actionparamname=\"'
                + data['copyName'] + '\" data-index=\"' + data['copyIndex'] + '\">'
                + element.closest('.actionParam').html() + '</tr>';
            $('#actionParamList').append(actionParam);
            $('.js_actionParamName').last().text(data['copyName']);

            //キャンセルボタン押下時、破棄するアクションパラメータリストに追加
            var inputParam = document.createElement("input");
            inputParam.setAttribute("name", "rng310CopyIndexList");
            inputParam.setAttribute("type", "hidden");
            inputParam.setAttribute("value", data['copyIndex']);
            $("form").append(inputParam);

            //使用区分トグル
            if (element.parent().parent().parent().find('.js_useKbnToggle').prop('checked') == true) {
                //使用する
                $('.js_editActionParam').last().find('.js_useKbnToggle').prop('checked', true);
                //使用するアクションパラメータリストに追加
                var inputParam = document.createElement("input");
                inputParam.setAttribute("name", "rng310ActionParamUseIndexList");
                inputParam.setAttribute("type", "hidden");
                inputParam.setAttribute("value", data['copyIndex']);
                $("form").append(inputParam);
            } else {
                $('.js_editActionParam').last().find('.js_useKbnToggle').prop('checked', false);
            }

            //複写した要素が「使用しない」または警告アイコン表示時、見た目を無効状態に切り替える。
            if (!$('.js_editActionParam').last().find('.js_useKbnToggle').prop('checked')) {
                $('.js_editActionParam').last().addClass('bgC_lightGray');
            }
        } else {
            alert("複写に失敗しました。");
        }
        document.forms[0].rng310CopyActionParamIndex.value = "";
        document.forms[0].rng310CopyActionParamUseKbn.value = "";
    });
}

//アクションパラメータの開閉
function openCloseActinParam(element) {
    element.closest('.actionParam').find('.js_executeConditionArea').animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );

    if (element.closest('.js_openCloseActionParam').hasClass("side_header-open")) {
        element.closest('.js_openCloseActionParam').removeClass("side_header-open");
        element.closest('.js_openCloseActionParam').addClass("side_header-close");
    } else {
        element.closest('.js_openCloseActionParam').removeClass("side_header-close");
        element.closest('.js_openCloseActionParam').addClass("side_header-open");
    }
}