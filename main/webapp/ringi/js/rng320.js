$(function() {
  //新規登録時
  //・使用区分を「使用する」にセット
  //・ファイル形式パラメータの「要素を追加」リンクを非表示
  if ($('input[name=rng320ActionParamCmdMode]').val() == '0') {
    $('.js_reqBodyParam').each(function(index, key) {
      $(key).find('.js_useKbnToggle').prop('checked', true);
      if ($(key).data('paramtype') == "1") {
        $(key).find('.js_addElementInfo').hide();
      }
    });
  }

  //キャンセルボタン押下
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
			title: '警告',
			overlay: {
				backgroundColor: '#FF0000',
				opacity: 0.5
			},
			buttons: {
				OK: function() {
          //設定値を初期化
					$('#actionParamHiddenArea').html('');
          $('.js_hiddenCondition').html('');
          $('input[name="rng310ActionParamName"]').val('');
          $('input[name="rng310ConditionType"]').val('');
          document.forms[0].CMD.value = 'rng320_back';
          document.forms[0].submit();
				},
				閉じる: function() {
					$(this).dialog('close');
				}
			}
		});
	});

  //共有テンプレート名押下
	$('.js_cancel090').on('click', function () {
		$('#cancelPop').dialog({
			autoOpen: true,  // hide dialog
			bgiframe: true,   // for IE6
			resizable: false,
			modal: true,
			dialogClass:'dialog_button',
			maxHeight: 200,
			width: '400',
			overflow: 'auto',
			title: '警告',
			overlay: {
				backgroundColor: '#FF0000',
				opacity: 0.5
			},
			buttons: {
				OK: function() {
          //設定値を初期化
          document.forms[0].CMD.value = 'rng320_backToRng090';
          document.forms[0].submit();
				},
				閉じる: function() {
					$(this).dialog('close');
				}
			}
		});
	});

  //OKボタン押下
  $('.js_setActionParam').on('click', function() {
    //描画時のhiddenパラメータを削除
    $('.js_hiddenRapParamArea').html('');

    //実行条件の設定値を保持
    setActionParamHidden();
    //パラメータ情報の設定値にname属性を追加
    setFormName();

    //入力チェックを行う
    document.forms[0].CMD.value = 'validateParam';
    let paramStr = $('form[name="rng320Form"]').serialize();

    $.ajax({
      url: "../ringi/rng320.do",
      type: "POST",
      data: paramStr
    }).done(function(data) {
      if (data['success']) {
        document.forms[0].CMD.value = 'rng320_ok';
        document.forms[0].submit();
      } else {
        if (data['fileError']) {
          //決裁後アクション用ファイルの読み込みに失敗
          let errorMsg = '<div class=\"textError\">' + msglist_rng320['cmn.error.access'] + '</div>'
          $('.js_errorMsgArea').html(errorMsg);
        } else {
          //入力エラーがある場合
          if (data['paramError'] && data['paramError'].length > 0
            || data['conditionError'] && data['conditionError'].length > 0) {

            let errors = '';
            if (data['conditionError'] && data['conditionError'].length > 0) {
              errors += '<div class=\"textError js_conditionErrorMsg\">' + data['conditionError'] + '</div>'
            }
            if (data['paramError'] && data['paramError'].length > 0) {
              errors += '<div class=\"textError\">' + data['paramError'] + '</div>'
            }
            $('.js_errorMsgArea').html(errors);

            //パスパラメータ
            let pathErrorMsg = '';
            if (data['pathErrorMsgList'] && data['pathErrorMsgList'].length > 0) {
              for (let i = 0; i < data['pathErrorMsgList'].length; i++) {
                pathErrorMsg += '<div class=\"textError\">' + data['pathErrorMsgList'][i] + '</div>';
              }
            }
            $('.js_pathErrorMsgArea').html(pathErrorMsg);
            //クエリパラメータ
            let queryErrorMsg = '';
            if (data['queryErrorMsgList'] && data['queryErrorMsgList'].length > 0) {
              for (let i = 0; i < data['queryErrorMsgList'].length; i++) {
                queryErrorMsg += '<div class=\"textError\">' + data['queryErrorMsgList'][i] + '</div>';
              }
            }
            $('.js_queryErrorMsgArea').html(queryErrorMsg);
            //リクエストボディ
            let bodyErrorMsg = '';
            if (data['bodyErrorMsgList'] && data['bodyErrorMsgList'].length > 0) {
              for (let i = 0; i < data['bodyErrorMsgList'].length; i++) {
                bodyErrorMsg += '<div class=\"textError\">' + data['bodyErrorMsgList'][i] + '</div>';
              }
            }
            $('.js_bodyErrorMsgArea').html(bodyErrorMsg);
          } else {
            //アクセス権限がない場合
            let errorMsg = '<div class=\"textError\">' + msglist_rng320['cmn.error.access'] + '</div>'
            $('.js_errorMsgArea').html(errorMsg);
          }
          //配列要素のダミー行を削除
          $('.js_dammyElement').remove();
        }
      }
    }).fail(function() {
        alert(msglist_rng320['failed.communication']);
    });
  });

  //フォーム要素リストを取得
  let paramStr = 'CMD=getFormInfo'
  let formJson = $('input[name="rng090templateJSON"]').val();
  paramStr += '&rng090templateJSON=' + formJson;
  paramStr += createParamStr();

  $.ajax({
    url: "../ringi/rng320.do",
    type: "POST",
    data: paramStr
  }).done(function(data) {
    if (data['success']) {
      formCellList = data['formCellList'];
      //実行条件をセット
      dspConditionForEdit();
      //パラメータ情報 要素区分コンボをセット
      setElementKbnCombo(null, false, false, 0);
      //パラメータ情報をセット
      setParamInfo();
      //凡例を表示、要素を追加リンクを表示/非表示
      $('.js_reqBodyParam').each(function(index, key) {
        dspReqBodyParamValue($(key));
      });
    }
  }).fail(function() {
    alert(msglist_rng320['failed.communication']);
  });

  //モデル要素パラメータのレイアウト
  setModelParam();

  //アクションパラメータ編集ダイアログを表示
	$('.js_editActionParam').on('click', function () {
		$('#addActionParamPop').dialog({
			autoOpen: true,  // hide dialog
			bgiframe: true,   // for IE6
			resizable: false,
			modal: true,
			dialogClass:'dialog_button',
      maxHeight: 500,
			width: '1000',
			overflow: 'auto',
			title: msglist_rng320['rng.rng320.9'],
			overlay: {
				backgroundColor: '#FF0000',
				opacity: 0.5
			},
			buttons: {
        OK: function() {
          $(this).find('.js_errorMsgAreaForDialog').html('');
          setActionParamHidden();
          registExecuteCondition();
          //エラーメッセージを非表示にする
          $('.js_conditionErrorMsg').remove();
        },
				閉じる: function() {
          $('#executeConditionHelp').addClass('visibility-hidden');
          $(this).find('.js_errorMsgAreaForDialog').html('');
          $(this).dialog('close');
          //登録されていない変更内容を破棄
          $('#executeConditionList').html('');
          let hiddenActionParamName = $('.js_hiddenActionParamName').val();
          $('.js_addActionParamName').val(hiddenActionParamName);
          let hiddenConditionType = $('.js_hiddenConditionType').val();
          if (hiddenConditionType == '0') {
            $('.js_conditionType').eq(0).prop('checked', true);
          } else if (hiddenConditionType == '1') {
            $('.js_conditionType').eq(1).prop('checked', true);
          }
          dspConditionForEdit();
				}
			}
		});
	});

  //要素を追加
  $(document).on('click', '.js_addElementInfo', function() {
    addElementInfo($(this));
    //凡例を表示
    dspReqBodyParamValue($(this).closest('.js_reqBodyParam'));
  });

  //要素を削除
  $(document).on('click', '.js_delElementInfo', function() {
    let reqBodyParam = $(this).closest('.js_reqBodyParam');
    let arrayElement = $(this).closest('.js_arrayElement');
    $(this).closest('.js_elementInfo').remove();
    if (arrayElement.length > 0 && arrayElement.find('.js_elementInfo').length < 1) {
      //要素が0行の場合、要素を追加リンクを表示（配列パラメータ）
      arrayElement.find('.js_addElementInfo').show();
    } else if (reqBodyParam.find('.js_elementInfo').length < 1) {
      //要素が0行の場合、要素を追加リンクを表示（通常パラメータ）
      reqBodyParam.find('.js_addElementInfo').show();
    } else if (arrayElement.length > 0 && arrayElement.find('.js_elementInfo').length <= 1) {
      //要素が1行の場合、要素区分コンボをセット（配列パラメータ）
      setElementKbnCombo(arrayElement.find('.js_addElementInfo'), true, false, 0);
    } else if (reqBodyParam.data('paramtype') == 1 && reqBodyParam.find('.js_elementInfo').length <= 1) {
      //要素が1行の場合、要素区分コンボをセット（ファイル形式の通常パラメータ）
      setElementKbnCombo(reqBodyParam.find('.js_addElementInfo'), true, false, 0);
    }
    //凡例を表示
    dspReqBodyParamValue(reqBodyParam);
  });

  //要素をソート
  sortElementInfo();
  //配列要素をソート
  sortArrayElement();

  //配列要素にインデックスを振る
  dspArrayIndex();

  //要素区分コンボ変更時、要素詳細コンボをセット、選択要素の値を表示
  $(document).on('change', '.js_elementKbn', function() {
    setElementDetailCombo($(this));
    //凡例を表示
    dspReqBodyParamValue($(this).closest('.js_reqBodyParam'));
    hideAddElementLink($(this));
    setHidenFormId($(this));
  });

  //要素詳細コンボ変更時、選択要素の値を表示
  $(document).on('change', '.js_elementDetail', function() {
    //凡例を表示
    dspReqBodyParamValue($(this).closest('.js_reqBodyParam'));
    hideAddElementLink($(this));
  });

  //要素詳細フォーム変更時、選択要素の値を表示
  $(document).on('input', '.js_elementDetailForm', function() {
    //凡例を表示
    dspReqBodyParamValue($(this).closest('.js_reqBodyParam'));
    hideAddElementLink($(this));
  });

  //使用する行コンボ変更時
  $(document).on('click', '.js_useLineCombo', function() {
    hideAddElementLink($(this));
  });

  //使用する/しない時の背景色を設定
  $('.js_reqBodyParam[data-paramkbn="2"]').find('.js_useKbnToggle').each(function() {
    setParamBgc($(this), true);
  });
  $('.js_reqBodyParam[data-paramkbn="0"], .js_reqBodyParam[data-paramkbn="1"]').find('.js_useKbnToggle').each(function() {
    setParamBgc($(this), true);
  });
  $(document).on('change', '.js_useKbnToggle', function() {
    setParamBgc($(this));
    //凡例を表示
    if ($(this).closest('.js_reqBodyParam').data('paramkbn') == 2) {
      dspReqBodyParamValue($(this).closest('.js_reqBodyParam'));
    } else if ($(this).closest('.js_reqBodyParam').data('paramkbn') == 1 && $(this).prop("checked")) {
      $(this).closest('.js_reqBodyParam').nextUntil('.js_reqBodyParam[data-paramkbn="0"], .js_reqBodyParam[data-paramkbn="1"]').each(function(index, key) {
        dspReqBodyParamValue($(key));
      });
    }
  });

  //配列要素を追加
  $('.js_addArrayElement').on('click', function() {
    addArrayElement($(this));
    //凡例を表示
    dspReqBodyParamValue($(this).closest('.js_reqBodyParam'));
    //配列要素にインデックスを振る
    dspArrayIndex();
  });

  //配列要素を削除
  $(document).on('click', '.js_delArrayElement', function() {
    let reqBodyParam = $(this).closest('.js_reqBodyParam');
    $(this).closest('.js_arrayElement').remove();
    //凡例を表示
    dspReqBodyParamValue(reqBodyParam);
    //配列要素にインデックスを振る
    dspArrayIndex();
  });

  //パラメータの開閉
  $('.js_openCloseParam').on('click', function() {
    openCloseParam($(this));
  });

  //全て開くボタン
  $('.js_openAll').on('click', function() {
    openCloseAllParam($(this), false);
  });

  //全て閉じるボタン
  $('.js_closeAll').on('click', function() {
    openCloseAllParam($(this), true);
  });

  //ツールチップ表示
  $(document).on('mouseover', 'a:has(span.tooltips)', function(e) {
    if ($('#ttp').length <= 0) {
      $("form").append("<div id=\"ttp\">"+ ($(this).children("span.tooltips").html()) +"</div>");
      if ($("#ttp").width() < ttpMinWidth) {
        ttpMinWidth = $("#ttp").width();
      }
      setTooltipMouseOver(e);
      if ($("#ttp").outerWidth() > 350) {
        $("#ttp").css("width","350px").addClass("word_b-all");
      }
    }
  }).mousemove(function(e) {
    if ($("#ttp").width() < ttpMinWidth) {
      ttpMinWidth = $("#ttp").width();
    }
    setTooltipPosition(e);
    if ($("#ttp").outerWidth() > 350) {
      $("#ttp").css("width","350px").addClass("word_b-all");
    }
  }).mouseout(function() {
    $("#ttp").remove();
  });

  //要素ソート時、要素の値を表示
  $(document).on('mouseup mouseleave', '.js_elementInfoHandle', function() {
    //凡例を表示
    dspReqBodyParamValue($(this).closest('.js_reqBodyParam'));
  });

  //配列要素ソート時、要素の値を表示
  $(document).on('mouseup mouseleave', '.js_arrayElementHandle', function() {
    //凡例を表示
    dspReqBodyParamValue($(this).closest('.js_reqBodyParam'));
    //配列要素にインデックスを振る
    dspArrayIndex();
  });
});

//申請内容プレビュー表示
function getCenterX(winWidth) {
  var x = (screen.width - winWidth) / 2;
  return x;
}

function getCenterY(winHeight) {
  var y = (screen.height - winHeight) / 2;
  return y;
}

function openShinseiNaiyouPreview() {
  let url = '../ringi/rng300.do';
  let winTitle = 'rngShinseiNaiyouPreview';
  let previewWinWidth = 900;
  let previewWinHeight = 900;
  let winx = getCenterX(previewWinWidth);
  let winy = getCenterY(previewWinHeight);
  let newWinOpt
    ='width=' + previewWinWidth + ','
    + 'height=' + previewWinHeight + ','
    + 'resizable=yes, toolbar=no'
    + 'left=' + winx + ','
    + 'top=' + winy + ','
    + 'scrollbars=yes';
    window.open('', winTitle, newWinOpt);

  // form作成
  let form = document.createElement("form");
  form.target = winTitle;  // target属性 => どこにアクションURLを開くかを指定
  form.method = "post";    // POST通信設定。
  form.action = url;   //遷移先のAction

  let submitType;
  let rng090templateJSON = $('input[name="rng090templateJSON"]').val();
  submitType = document.createElement("input");
  submitType.setAttribute("name", "rng090templateJSON");
  submitType.setAttribute("type", "hidden");
  submitType.setAttribute("value", rng090templateJSON);
  form.appendChild(submitType);

  let rngTemplateMode = $('input[name="rngTemplateMode"]').val();
  submitType = document.createElement("input");
  submitType.setAttribute("name", "rngTemplateMode");
  submitType.setAttribute("type", "hidden");
  submitType.setAttribute("value", rngTemplateMode);
  form.appendChild(submitType);

  let rng090rtpSpecVer = $('input[name="rng090rtpSpecVer"]').val();
  submitType = document.createElement("input");
  submitType.setAttribute("name", "rng090rtpSpecVer");
  submitType.setAttribute("type", "hidden");
  submitType.setAttribute("value", rng090rtpSpecVer);
  form.appendChild(submitType);

  let rngTplCmdMode = $('input[name="rngTplCmdMode"]').val();
  submitType = document.createElement("input");
  submitType.setAttribute("name", "rngTplCmdMode");
  submitType.setAttribute("type", "hidden");
  submitType.setAttribute("value", rngTplCmdMode);
  form.appendChild(submitType);

  let rngSelectTplSid = $('input[name="rngSelectTplSid"]').val();
  submitType = document.createElement("input");
  submitType.setAttribute("name", "rngSelectTplSid");
  submitType.setAttribute("type", "hidden");
  submitType.setAttribute("value", rngSelectTplSid);
  form.appendChild(submitType);

  //form に作成したinput要素を追加。
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(form); //一旦domに書き出し
  form.submit();          //送信
  body.removeChild(form); //送信後に作成したform要素の削除
}

//要素区分コンボをセット
//addFlgがtrueの場合、addNewIndexに追加する要素のインデックスを指定。その他の場合は0を指定。
function setElementKbnCombo(element, delFlg, addFlg, addNewIndex) {
  //テキスト形式パラメータ用コンボ
  let elementKbnCombo
  = '<select class=\"js_elementKbn wp190\">'
  + '<option value=\"-1\">' + msglist_rng320['cmn.select.plz'] + '</option>';

  //ファイル形式パラメータ用コンボ
  let elementKbnComboForFile
    = '<select class=\"js_elementKbn wp190\">'
    + '<option value=\"-1\">' + msglist_rng320['cmn.select.plz'] + '</option>';

  //表要素のボディに配置された要素のSIDを取得
  let repeatFormElement = [];
  for (let i = 0; i < formCellList.length; i++) {
    if (formCellList[i].type == TYPE_ENUM.blocklist) {
      for (let bodyIndex = 0; bodyIndex < formCellList[i].body.body.length; bodyIndex++) {
        for (let bodyFormIndex = 0; bodyFormIndex < formCellList[i].body.body[bodyIndex].formTable.length; bodyFormIndex++) {
          for (let bodyForm2Index = 0; bodyForm2Index < formCellList[i].body.body[bodyIndex].formTable[bodyFormIndex].length; bodyForm2Index++) {
            let formElement = formCellList[i].body.body[bodyIndex].formTable[bodyFormIndex][bodyForm2Index];
            repeatFormElement.push(formElement.sid);
          }
        }
      }
    }
  }

  //コンボの中身をセット
  for (let i = 0; i < formCellList.length; i++) {
    if (formCellList[i].type == ''
      || formCellList[i].type == TYPE_ENUM.blocklist
      || formCellList[i].type == TYPE_ENUM.block) {
      continue;
    } else {
      let bodyFlg = false;
      if (repeatFormElement.includes(formCellList[i].sid)) {
        //表要素ボディ内要素
        bodyFlg = true;
      }
      //配列要素にて、2行目以降に複数選択可能要素を表示しない
      if (formCellList[i].type == TYPE_ENUM.user && formCellList[i].body.multiFlg == "1"
        || formCellList[i].type == TYPE_ENUM.group && formCellList[i].body.multiFlg == "1"
        || formCellList[i].type == TYPE_ENUM.check) {
          if (!(element && element.closest('.js_arrayElement').length > 0 && element.closest('.js_arrayElement').find('.js_elementInfo').length > 1)) {
            if (bodyFlg) {
              elementKbnCombo += '<option value=\"BM' + formCellList[i].type + '.' + htmlEscape(formCellList[i].formID) + '\">' + htmlEscape(formCellList[i].title) + ' ${' + htmlEscape(formCellList[i].formID) + '}</option>';
            } else {
              elementKbnCombo += '<option value=\"M' + formCellList[i].type + '.' + htmlEscape(formCellList[i].formID) + '\">' + htmlEscape(formCellList[i].title) + ' ${' + htmlEscape(formCellList[i].formID) + '}</option>';
            }
          }
      } else if (formCellList[i].type != TYPE_ENUM.file) {
        if (bodyFlg) {
          elementKbnCombo += '<option value=\"B' + formCellList[i].type + '.' + htmlEscape(formCellList[i].formID) + '\">' + htmlEscape(formCellList[i].title) + ' ${' + htmlEscape(formCellList[i].formID) + '}</option>';
        } else {
          elementKbnCombo += '<option value=\"' + formCellList[i].type + '.' + htmlEscape(formCellList[i].formID) + '\">' + htmlEscape(formCellList[i].title) + ' ${' + htmlEscape(formCellList[i].formID) + '}</option>';
        }
      }

      if (formCellList[i].type == TYPE_ENUM.file) {
        //フォーム情報>添付ファイル
        //配列要素にて、2行目以降に複数選択可能要素を表示しない
        if (!(element && element.closest('.js_arrayElement').length > 0 && element.closest('.js_arrayElement').find('.js_elementInfo').length > 1)
          || !(element && element.closest('.js_reqBodyParam').find('.js_elementInfo').length > 1)) {
          if (bodyFlg) {
            elementKbnComboForFile += '<option value=\"B' + formCellList[i].type + '.' + htmlEscape(formCellList[i].formID) + '\">' + htmlEscape(formCellList[i].title) + ' ${' + htmlEscape(formCellList[i].formID) + '}</option>';
          } else {
            elementKbnComboForFile += '<option value=\"' + formCellList[i].type + '.' + htmlEscape(formCellList[i].formID) + '\">' + htmlEscape(formCellList[i].title) + ' ${' + htmlEscape(formCellList[i].formID) + '}</option>';
          }
        }
      }
    }
  }

  elementKbnCombo
    += '<option value=\"' + PARAMKBN_ENUM.addUser + '\">' + msglist_rng320['rng.47'] + '</option>'
    + '<option value=\"' + PARAMKBN_ENUM.addDate + '\">' + msglist_rng320['rng.application.date'] + '</option>'
    + '<option value=\"' + PARAMKBN_ENUM.letUser + '\">' + msglist_rng320['rng.rng330.2'] + '</option>'
    + '<option value=\"' + PARAMKBN_ENUM.letDate + '\">' + msglist_rng320['rng.rng330.3'] + '</option>'
    + '<option value=\"' + PARAMKBN_ENUM.ringiInfo + '\">' + msglist_rng320['rng.rng320.14'] + '</option>'
    + '<option value=\"' + PARAMKBN_ENUM.manual + '\">' + msglist_rng320['rng.rng320.15'] + '</option>'
    + '</select>';

  elementKbnComboForFile
    += '<option value=\"' + PARAMKBN_ENUM.ringiInfo + '\">' + msglist_rng320['rng.rng320.14'] + '</option>'
    + '</select>';

  if (!element) {
    //初期描画時
    $('.js_reqBodyParam[data-paramtype="0"]').each(function(index, key) {
      //テキスト形式
      if ($(key).find('.js_arrayElement').length > 0) {
        //配列
        $(key).find('.js_arrayElement').each(function(arrayIndex, arrayKey) {
          if ($(arrayKey).find('.js_elementInfo').length > 1) {
            //複数要素が設定されている場合、コンボを再設定
            setElementKbnCombo($(arrayKey).find('.js_addElementInfo'), false, false, 0);
          } else {
            //単一要素が設定されている場合、コンボを設定
            $(arrayKey).find('.js_elementInfo').find('.js_elementKbnComboArea').html(elementKbnCombo);
          }
        });
      } else {
        //通常
        $(key).find('.js_elementInfo').find('.js_elementKbnComboArea').html(elementKbnCombo);
      }
    });
    $('.js_reqBodyParam[data-paramtype="1"]').each(function(index, key) {
      //ファイル形式
      if ($(key).find('.js_arrayElement').length > 0) {
        //配列
        $(key).find('.js_arrayElement').each(function(arrayIndex, arrayKey) {
          if ($(arrayKey).find('.js_elementInfo').length > 1) {
            //複数要素が設定されている場合、コンボを再設定
            setElementKbnCombo($(arrayKey).find('.js_addElementInfo'), false, false, 0);
          } else {
            //単一要素が設定されている場合、コンボを設定
            $(arrayKey).find('.js_elementInfo').find('.js_elementKbnComboArea').html(elementKbnComboForFile);
          }
        });
      } else {
        //通常
        $(key).find('.js_elementInfo').find('.js_elementKbnComboArea').html(elementKbnComboForFile);
      }
    });
  } else if (element && !delFlg && !addFlg) {
    //初期描画（配列要素の再設定時）
    let arrayElementLength = element.closest('.js_reqBodyParam').find('.js_arrayElement').length;
    if (arrayElementLength > 0) {
      //配列パラメータ
      let elementInfoIndex = element.closest('.js_arrayElement').find('.js_elementInfo').length - 1;
      let useLineCombo
        = '<option value=\"' + PARAMINDEX_ENUM.top + '\">' + msglist_rng320['rng.rng320.17'] + '</option>'
        + '<option value=\"' + PARAMINDEX_ENUM.bottom + '\">' + msglist_rng320['rng.rng320.18'] + '</option>';
      if (element.closest('.js_reqBodyParam').data('paramtype') == 0) {
        //テキスト形式
        //2行目以降を追加した場合、それ以前のコンボを再設定
        if (elementInfoIndex >= 1) {
          element.closest('.js_arrayElement').find('.js_elementInfo').each(function(elementIndex, elementKey) {
            let elementInfoVal = $(elementKey).find('.js_elementKbn option:selected').val();
            if (elementInfoVal == null || elementInfoVal.length < 0) {
              //編集時、hiddenから設定値を取得
              elementInfoVal = $(elementKey).find('.js_hiddenParamKbn').val();
              if (elementInfoVal == PARAMKBN_ENUM.form) {
                //フォーム要素
                let formId = $(elementKey).find('.js_hiddenParamFormId').val();
                let formType = $(elementKey).find('.js_hiddenParamFormTypeStr').val();
                elementInfoVal = formType + '.' + formId;
              }
            }
            $(elementKey).find('.js_elementKbnComboArea').html(elementKbnCombo);
            $(elementKey).find('.js_elementKbn').val(elementInfoVal);
            let useLineComboVal = $(elementKey).find('.js_useLineCombo option:selected').val();
            if (useLineComboVal == null || useLineComboVal.length < 0) {
              //編集時、hiddenから設定値を取得
              useLineComboVal = $(elementKey).find('.js_hiddenParamIndex').val();
            }
            $(elementKey).find('.js_useLineCombo').html(useLineCombo);
            $(elementKey).find('.js_useLineCombo').val(useLineComboVal);
          });
        }
      } else {
        //ファイル形式
        //2行目以降を追加した場合、それ以前のコンボを再設定
        if (elementInfoIndex >= 1) {
          element.closest('.js_arrayElement').find('.js_elementInfo').each(function(elementIndex, elementKey) {
            let elementInfoVal = $(elementKey).find('.js_elementKbn option:selected').val();
            if (elementInfoVal == null || elementInfoVal.length < 0) {
              //編集時、hiddenから設定値を取得
              elementInfoVal = $(elementKey).find('.js_hiddenParamKbn').val();
              if (elementInfoVal == PARAMKBN_ENUM.form) {
                //フォーム要素
                let formId = $(elementKey).find('.js_hiddenParamFormId').val();
                let formType = $(elementKey).find('.js_hiddenParamFormTypeStr').val();
                elementInfoVal = formType + '.' + formId;
              }
            }
            $(elementKey).find('.js_elementKbnComboArea').html(elementKbnComboForFile);
            $(elementKey).find('.js_elementKbn').val(elementInfoVal);
          });
        }
      }
    }
  } else if (element && !delFlg && addFlg) {
    //追加時
    let arrayElementLength = element.closest('.js_reqBodyParam').find('.js_arrayElement').length;
    if (arrayElementLength > 0) {
      //配列パラメータ
      let elementInfoVal = element.closest('.js_arrayElement').find('.js_elementKbn').first().find('option:selected').val();
      let useLineComboVal = element.closest('.js_arrayElement').find('.js_useLineCombo option:selected').val();
      let useLineCombo
        = '<option value=\"' + PARAMINDEX_ENUM.top + '\">' + msglist_rng320['rng.rng320.17'] + '</option>'
        + '<option value=\"' + PARAMINDEX_ENUM.bottom + '\">' + msglist_rng320['rng.rng320.18'] + '</option>';
      if (element.closest('.js_reqBodyParam').data('paramtype') == 0) {
        //テキスト形式
        element.closest('.js_arrayElement').find('.js_elementInfo[data-index="' + addNewIndex + '"]').find('.js_elementKbnComboArea').html(elementKbnCombo);
        //2行目以降を追加した場合、1行目のコンボを再設定
        if (addNewIndex >= 1) {
          element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_elementKbnComboArea').html(elementKbnCombo);
          element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_elementKbn').val(elementInfoVal);
          element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_useLineCombo').html(useLineCombo);
          element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_useLineCombo').val(useLineComboVal);
        }
      } else {
        //ファイル形式
        element.closest('.js_arrayElement').find('.js_elementInfo[data-index="' + addNewIndex + '"]').find('.js_elementKbnComboArea').html(elementKbnComboForFile);
        //2行目以降を追加した場合、1行目のコンボを再設定
        if (addNewIndex >= 1) {
          element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_elementKbnComboArea').html(elementKbnComboForFile);
          element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_elementKbn').val(elementInfoVal);
        }
      }
    } else {
      //通常パラメータ
      if (element.closest('.js_reqBodyParam').data('paramtype') == 0) {
        //テキスト形式
        element.closest('.js_reqBodyParam').find('.js_elementInfo[data-index="' + addNewIndex + '"]').find('.js_elementKbnComboArea').html(elementKbnCombo);
      } else {
        //ファイル形式
        element.closest('.js_reqBodyParam').find('.js_elementInfo[data-index="' + addNewIndex + '"]').find('.js_elementKbnComboArea').html(elementKbnComboForFile);
      }
    }
  } else if (element && delFlg) {
    //削除時
    let arrayElementLength = element.closest('.js_reqBodyParam').find('.js_arrayElement').length;
    let elementInfoVal = element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_elementKbn option:selected').val();
    if (arrayElementLength > 0) {
      if (element.closest('.js_reqBodyParam').data('paramtype') == 0) {
        //テキスト形式
        element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_elementKbnComboArea').html(elementKbnCombo);
        element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_elementKbn').val(elementInfoVal);
      } else {
        //ファイル形式
        element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_elementKbnComboArea').html(elementKbnComboForFile);
        element.closest('.js_arrayElement').find('.js_elementInfo').first().find('.js_elementKbn').val(elementInfoVal);
      }
    }
  }
}

//要素を追加リンクを非表示
function hideAddElementLink(element) {
  //親要素
  let parent = '';
  if (element.closest('.js_arrayElement').length > 0) {
    //配列時
    parent = element.closest('.js_arrayElement');
  } else {
    //通常時
    parent = element.closest('.js_reqBodyParam');
  }
  let plainElementVal = parent.find('.js_elementKbn option:selected').val();
  let elementVal = '';
  if (plainElementVal.startsWith('BM')) {
    elementVal = plainElementVal.substring(2, plainElementVal.length);
  } else if (plainElementVal.startsWith('M')) {
    elementVal = plainElementVal.substring(1, plainElementVal.length);
  } else if (plainElementVal.startsWith('B')) {
    elementVal = plainElementVal.substring(1, plainElementVal.length);
  } else {
    elementVal = plainElementVal;
  }
  let index = elementVal.indexOf('.');
  let elementType = elementVal.substring(0, index);
  let elementDetail = parent.find('.js_elementDetail option:selected').val();
  let useLine = parent.find('.js_useLineCombo option:selected').val();
  if (element.closest('.js_arrayElement').length > 0
    && ((elementType == TYPE_ENUM.user && (plainElementVal.startsWith('M') || plainElementVal.startsWith('BM')))
      || (elementType == TYPE_ENUM.group && (plainElementVal.startsWith('M') || plainElementVal.startsWith('BM')))
      || (elementType == TYPE_ENUM.check && (plainElementVal.startsWith('M') || plainElementVal.startsWith('BM')))
      || (plainElementVal.startsWith('B') && useLine == PARAMINDEX_ENUM.all)
      || (elementVal == PARAMKBN_ENUM.ringiInfo && elementDetail == PARAMVALUE_ENUM.file))
    || (elementType == TYPE_ENUM.file)
    || (element.closest('.js_reqBodyParam').data('paramtype') == 1)) {
    parent.find('.js_addElementInfo').hide();
  } else {
    parent.find('.js_addElementInfo').show();
  }
}

//要素を追加
function addElementInfo(element) {
  let paramElement = element.closest('.js_reqBodyParam');
  paramElement.find('.js_toggleArea').text('');
  let arrayElementLength = paramElement.find('.js_arrayElement').length;
  let newIndex = 0;
  if (arrayElementLength > 0) {
    let arrayElementIndex = element.closest('.js_arrayElement').data('index');
    element.closest('.js_arrayElement[data-index="' + arrayElementIndex + '"]').find('.js_elementInfo').each(function(index, key) {
      if (newIndex <= $(key).data('index')) {
        newIndex = $(key).data('index') + 1;
      }
    });
  } else {
    paramElement.find('.js_elementInfo').each(function(index, key) {
      if (newIndex <= $(key).data('index')) {
        newIndex = $(key).data('index') + 1;
      }
    });
  }

  let elementInfo
    = '<tr class=\"elementInfo js_elementInfo outC_deep bgC_tableCell hp40\" data-index=\"' + htmlEscape(newIndex) + '\">'
    + '<td class=\"elementInfoHandle js_elementInfoHandle\">'
    + '<img src=\"../common/images/original/icon_sort.png\" class=\"sortIcon js_sortIcon display_none\">'
    + '</td>'
    + '<td>'
    + '<div class=\"verAlignMid mt3 mb3\">'
    + '<span class=\"js_elementKbnComboArea\"></span>'
    + '<span class=\"js_hiddenFormIdArea\"></span>'
    + '<span class=\"js_elementDetailComboArea ml5\"></span>'
    + '<span class=\"js_elementDetailFormArea\"></span>'
    + '</div>'
    + '<div class=\"js_useLineComboArea\"></div>'
    + '<div class=\"js_warnMsgArea\"></div>'
    + '</td>'
    + '<td class=\"wp30\">'
    + '<span class=\"js_delElementInfo\">'
    + '<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_trash.png\">'
    + '<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_trash.png\">'
    + '</span>'
    + '</td>'
    + '</tr>';

  if (arrayElementLength > 0) {
    let arrayElementIndex = element.closest('.js_arrayElement').data('index');
    element.closest('.js_arrayElement[data-index="' + arrayElementIndex + '"]').find('.js_elementInfoList').append(elementInfo);
  } else {
    element.closest('.js_reqBodyParam').find('.js_elementInfoList').append(elementInfo);
  }
  setElementKbnCombo(element, false, true, newIndex);
  setParamBgc(element.closest('.js_reqBodyParam').find('.js_useKbnToggle'));
  if (paramElement.data('paramtype') == 1) {
    paramElement.find('.js_addElementInfo').hide();
  }
}

//要素をソート
function sortElementInfo() {
  //パスパラメータ
  $('.paramTable[data-kbn="0"]').find('.js_reqBodyParam').each(function(index) {
    let el = document.getElementById('pathElementInfoList_' + index);
    if (el) {
      new Sortable(el, {
        animation: 150,
        ghostClass: 'out3',
        preventOnFilter: false,
        handle: '.js_elementInfoHandle',
        onStart: onStartEvent,
        onEnd: onEndEvent
      });
    }
  });
  //クエリパラメータ
  $('.paramTable[data-kbn="1"]').find('.js_reqBodyParam').each(function(index, key) {
    if ($(key).find('.js_arrayElement') && $(key).find('.js_arrayElement').length > 0) {
      //配列要素
      $(key).find('.js_arrayElement').each(function(arrayIndex) {
        let el = document.getElementById('queryElementInfoList_' + index + '_' + arrayIndex);
        if (el) {
          new Sortable(el, {
            animation: 150,
            ghostClass: 'out3',
            preventOnFilter: false,
            handle: '.js_elementInfoHandle',
            onStart: onStartEvent,
            onEnd: onEndEvent
          });
        }
      });
    } else {
      //通常パラメータ
      let el = document.getElementById('queryElementInfoList_' + index);
      if (el) {
        new Sortable(el, {
          animation: 150,
          ghostClass: 'out3',
          preventOnFilter: false,
          handle: '.js_elementInfoHandle',
          onStart: onStartEvent,
          onEnd: onEndEvent
        });
      }
    }
  });
  //リクエストボディパラメータ
  $('.paramTable[data-kbn="2"]').find('.js_reqBodyParam').each(function(index, key) {
    if ($(key).find('.js_arrayElement') && $(key).find('.js_arrayElement').length > 0) {
      //配列要素
      $(key).find('.js_arrayElement').each(function(arrayIndex) {
        let el = document.getElementById('reqBodyElementInfoList_' + index + '_' + arrayIndex);
        if (el) {
          new Sortable(el, {
            animation: 150,
            ghostClass: 'out3',
            preventOnFilter: false,
            handle: '.js_elementInfoHandle',
            onStart: onStartEvent,
            onEnd: onEndEvent
          });
        }
      });
    } else {
      //通常パラメータ
      let el = document.getElementById('reqBodyElementInfoList_' + index);
      if (el) {
        new Sortable(el, {
          animation: 150,
          ghostClass: 'out3',
          preventOnFilter: false,
          handle: '.js_elementInfoHandle',
          onStart: onStartEvent,
          onEnd: onEndEvent
        });
      }
    }
  });
	function onStartEvent(e) {
		$('.js_sortIcon').removeClass("sortIcon");
		$('.js_elementInfo').addClass("bgC_none");
	}
	function onEndEvent(e) {
		//ホバーイベントを元に戻す
		$('.js_sortIcon').addClass("sortIcon");
		$('.js_elementInfo').removeClass("bgC_none");
	}
}

//配列要素をソート
function sortArrayElement() {
  //クエリパラメータ
  $('.paramTable[data-kbn="1"]').find('.js_reqBodyParam').each(function(index) {
    let el = document.getElementById('queryArrayElementList_' + index);
    if (el) {
      new Sortable(el, {
        animation: 150,
        preventOnFilter: false,
        handle: '.js_arrayElementHandle',
        onStart: onStartEvent,
        onEnd: onEndEvent,
        ghostClass: 'arrayElementSort'
      });
    } else {
      return true;
    }
  });
  //リクエストボディパラメータ
  $('.paramTable[data-kbn="2"]').find('.js_reqBodyParam').each(function(index) {
    let el = document.getElementById('reqBodyArrayElementList_' + index);
    if (el) {
      new Sortable(el, {
        animation: 150,
        preventOnFilter: false,
        handle: '.js_arrayElementHandle',
        onStart: onStartEvent,
        onEnd: onEndEvent,
        ghostClass: 'arrayElementSort'
      });
    } else {
      return true;
    }
  });
	function onStartEvent(e) {
		$('.js_arrayElementSortIcon').removeClass("sortIcon");
		$('.js_arrayElementCard').addClass("bgC_none");
	}
	function onEndEvent(e) {
		//ホバーイベントを元に戻す
		$('.js_arrayElementSortIcon').addClass("sortIcon");
		$('.js_arrayElementCard').removeClass("bgC_none");
	}
}

//要素詳細コンボをセット
function setElementDetailCombo(element) {
  let elementDetalCombo;
  let elementDetailForm;
  let elementVal = element.val();
  if (element.val().startsWith('BM')) {
    elementVal = element.val().substring(2, element.val().length);
  } else if (element.val().startsWith('B')) {
    elementVal = element.val().substring(1, element.val().length);
  } else if (element.val().startsWith('M')) {
    elementVal = element.val().substring(1, element.val().length);
  } else {
    elementVal = element.val();
  }

  let index = elementVal.indexOf('.');
  let elementType = elementVal.substring(0, index);
  if (elementType == TYPE_ENUM.user
    || elementVal == PARAMKBN_ENUM.addUser
    || elementVal == PARAMKBN_ENUM.letUser) {
    //ユーザ選択、申請者、最終承認者
    elementDetalCombo
      = '<select class=\"js_elementDetail wp250\">'
      + '<option value=\"-1\">' + msglist_rng320['cmn.select.plz'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.userSid + '\">' + msglist_rng320['cmn.user.sid']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.userId + '\">' + msglist_rng320['cmn.user.id']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.userSei + '\">' + msglist_rng320['rng.rng090.26']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.userMei + '\">' + msglist_rng320['rng.rng090.27']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.userSeiMei + '\">' + msglist_rng320['rng.rng090.25']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.userSeiKana + '\">' + msglist_rng320['rng.rng090.29']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.userMeiKana + '\">' + msglist_rng320['rng.rng090.30']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.userSeiMeiKana + '\">' + msglist_rng320['rng.rng090.28']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.syainNo + '\">' + msglist_rng320['cmn.employee.staff.number']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.belongGroupSid + '\">' + msglist_rng320['cmn.belong.group.sid']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.belongGroupId + '\">' + msglist_rng320['cmn.belong.group.id']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.belongGroupName + '\">' + msglist_rng320['cmn.belong.group.name']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.belongGroupNameKana + '\">' + msglist_rng320['cmn.belong.group.name.kana']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.mailAddress1 + '\">' + msglist_rng320['cmn.mailaddress1']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.mailAddress2 + '\">' + msglist_rng320['cmn.mailaddress2']  + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.mailAddress3 + '\">' + msglist_rng320['cmn.mailaddress3']  + '</option>'
      + '</select>';
    elementDetailForm = '';
  } else if (elementType == TYPE_ENUM.group) {
    //グループ選択
    elementDetalCombo
      = '<select class=\"js_elementDetail wp250\">'
      + '<option value=\"-1\">' + msglist_rng320['cmn.select.plz'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.groupSid + '\">' + msglist_rng320['cmn.group.sid'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.groupId + '\">' + msglist_rng320['cmn.group.id'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.groupName + '\">' + msglist_rng320['cmn.group.name'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.groupNameKana + '\">' + msglist_rng320['cmn.group.name.kana'] + '</option>'
      + '</select>';
    elementDetailForm = '';
  } else if (elementType == TYPE_ENUM.date
    || elementVal == PARAMKBN_ENUM.addDate
    || elementVal == PARAMKBN_ENUM.letDate) {
    //日付選択、申請日時、最終承認日時
    elementDetalCombo
      = '<select class=\"js_elementDetail wp250\">'
      + '<option value=\"-1\">' + msglist_rng320['cmn.select.plz'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.dateTimeSlash + '\">' + msglist_rng320['cmn.format.date.time.slash'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.dateTimeHyphen + '\">' + msglist_rng320['cmn.format.date.time.hyphen'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.dateTimeText + '\">' + msglist_rng320['cmn.format.date.time.text'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.dateSlash + '\">' + msglist_rng320['cmn.format.date.slash'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.dateHyphen + '\">' + msglist_rng320['cmn.format.date.hyphen'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.dateText + '\">' + msglist_rng320['cmn.format.date.text'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.timeSecondColon + '\">' + msglist_rng320['cmn.format.time.second.colon'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.timeSecondText + '\">' + msglist_rng320['cmn.format.time.second.text'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.timeColon + '\">' + msglist_rng320['cmn.format.time.colon'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.timeText + '\">' + msglist_rng320['cmn.format.time.text'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.year + '\">' + msglist_rng320['cmn.format.year'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.month + '\">' + msglist_rng320['cmn.format.month'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.day + '\">' + msglist_rng320['cmn.format.day'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.time + '\">' + msglist_rng320['cmn.format.time2'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.minute + '\">' + msglist_rng320['cmn.format.minutes'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.second + '\">' + msglist_rng320['cmn.format.second'] + '</option>'
      + '</select>';
    elementDetailForm = '';
  } else if (elementType == TYPE_ENUM.time) {
    //時間選択
    elementDetalCombo
      = '<select class=\"js_elementDetail wp250\">'
      + '<option value=\"-1\">' + msglist_rng320['cmn.select.plz'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.timeSecondColon + '\">' + msglist_rng320['cmn.format.time.second.colon'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.timeSecondText + '\">' + msglist_rng320['cmn.format.time.second.text'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.timeColon + '\">' + msglist_rng320['cmn.format.time.colon'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.timeText + '\">' + msglist_rng320['cmn.format.time.text'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.time + '\">' + msglist_rng320['cmn.format.time2'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.minute + '\">' + msglist_rng320['cmn.format.minutes'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.second + '\">' + msglist_rng320['cmn.format.second'] + '</option>'
      + '</select>';
    elementDetailForm = '';
  } else if (elementVal == PARAMKBN_ENUM.ringiInfo) {
    elementDetalCombo
      = '<select class=\"js_elementDetail wp250\">'
      + '<option value=\"-1\">' + msglist_rng320['cmn.select.plz'] + '</option>';
      if (element.closest('.js_reqBodyParam').data('paramtype') == 0) {
        elementDetalCombo
          += '<option value=\"' + PARAMVALUE_ENUM.title + '\">' + msglist_rng320['cmn.title'] + '</option>'
          + '<option value=\"' + PARAMVALUE_ENUM.sinseiID + '\">' + msglist_rng320['rng.rng310.56'] + '</option>';
      } else {
        let repeatFlg = false;
        let repeatKbn = $('input[name=rng320RepeatKbn]').val();
        if (repeatKbn == '1') {
          let repeatType = $('input[name=rng320RepeatType]').val();
          if (repeatType == '1') {
            repeatFlg = true;
          }
        }
        if ((element.closest('.js_arrayElement').length > 0 && element.closest('.js_arrayElement').find('.js_elementInfo').length <= 1)
          || repeatFlg) {
          elementDetalCombo += '<option value=\"' + PARAMVALUE_ENUM.file + '\">' + msglist_rng320['rng.rng330.4'] + '</option>';
        } else {
          elementDetalCombo += '<option value=\"' + PARAMVALUE_ENUM.fileTop + '\">' + msglist_rng320['rng.rng320.19'] + '</option>'
          + '<option value=\"' + PARAMVALUE_ENUM.fileBottom + '\">' + msglist_rng320['rng.rng320.20'] + '</option>';
        }
      }
      elementDetalCombo += '</select>';
    elementDetailForm = '';
  }else if (elementVal == PARAMKBN_ENUM.manual) {
    elementDetailForm = '<input type=\"text\" class=\"js_elementDetailForm wp250\" maxlength=\"50\">';
    elementDetalCombo = '';
  } else {
    elementDetalCombo = '';
    elementDetailForm = '';
  }

  element.closest('.js_elementInfo').find('.js_elementDetailComboArea').html(elementDetalCombo);
  element.closest('.js_elementInfo').find('.js_elementDetailFormArea').html(elementDetailForm);

  //使用するボディ行コンボを表示
  let useLineCombo;
  let repeatElement = [];
  let repeatKbn = $('input[name=rng320RepeatKbn]').val();
  if (repeatKbn == '1') {
    let repeatType = $('input[name=rng320RepeatType]').val();
    if (repeatType == '0') {
      $('input[class=js_repeatFormId]').each(function(repeatIndex, repeatKey) {
        repeatElement.push($(repeatKey).val());
      });
    }
  }

  let elementFormId =  elementVal.substring(index + 1, elementVal.length);
  if (element.val().startsWith('B') && !repeatElement.includes(elementFormId)) {
    //表要素内の要素 かつ 繰り返し実行の対象ではない要素の場合
    useLineCombo
      = '<div class=\"mt3 mb3\">'
      + '<span>' + msglist_rng320['rng.rng320.12'] + ' : </span>'
      + '<select class=\"js_useLineCombo wp100\">';
      if (element.closest('.js_arrayElement').length > 0 && element.closest('.js_arrayElement').find('.js_elementInfo').length <= 1) {
        useLineCombo += '<option value=\"0\">' + msglist_rng320['rng.rng320.16'] + '</option>';
      }
    useLineCombo
      += '<option value=\"' + PARAMINDEX_ENUM.top + '\">' + msglist_rng320['rng.rng320.17'] + '</option>'
      + '<option value=\"' + PARAMINDEX_ENUM.bottom + '\">' + msglist_rng320['rng.rng320.18'] + '</option>'
      + '</select>'
      + '</div>';
  } else {
    useLineCombo = '';
  }
  element.closest('.js_elementInfo').find('.js_useLineComboArea').html(useLineCombo);

  //配列パラメータ以外に複数選択可能要素を選択した際の警告を表示
  let warnMsg;
  if (element.closest('.js_arrayElement').length <= 0) {
    let repeatKbn = $('input[name="rng320RepeatKbn"]').val();
    let repeatType = $('input[name="rng320RepeatType"]').val();
    let repeatTarget = $(".js_repeatTarget").val();
    if (repeatTarget.startsWith("P_")) {
      repeatTarget = repeatTarget.slice(2);
    }
    if (elementType == TYPE_ENUM.file
      && (repeatKbn == 0 || (repeatType == 0 && elementFormId != repeatTarget) || repeatType == 1)) {
      warnMsg = '<div class=\"mt3 mb3\">' + msglist_rng320['cmn.comments'] + msglist_rng320['rng.rng320.21']  + '</div>';
    } else if ((elementType == TYPE_ENUM.user || elementType == TYPE_ENUM.group || elementType == TYPE_ENUM.check)
      && (element.val().startsWith('M') || element.val().startsWith('BM'))) {
      warnMsg = '<div class=\"mt3 mb3\">' + msglist_rng320['cmn.comments'] + msglist_rng320['rng.rng320.22'] + '</div>';
    } else {
      warnMsg = '';
    }
  } else {
    warnMsg = '';
  }
  element.closest('.js_elementInfo').find('.js_warnMsgArea').html(warnMsg);
}

//凡例を表示
function dspReqBodyParamValue(element) {
  let dspValue = '';
  let arrayElementLength = element.find('.js_arrayElement').length;
  if (element.data('paramkbn') != 2 && arrayElementLength > 0) {
    //配列パラメータ
    let topCnt = 0;
    dspValue = '[ ';
    element.find('.js_arrayElement').each(function(index, key) {
      if ($(key).find('.js_elementInfo').length <= 0) {
        //要素区分コンボが表示されていない場合
        if (topCnt == index) {
          //先頭の場合
          topCnt++;
        }
        return true;
      } else {
        if (index != topCnt) {
          //先頭以外の場合
          dspValue += ' ,  ';
        }
        dspValue += createElementValue($(key));
      }
    });
    dspValue += ' ]';
    element.find('.js_reqBodyParamValue').html(dspValue);
  } else if (element.data('paramkbn') == 2) {
    //モデル要素パラメータ
    let parent = element.prevUntil('.js_reqBodyParam[data-paramkbn="1"]').prev();
    if (parent.length <= 0) {
      parent = element.prev();
    }
    dspValue = '{ ';
    let isFirst = true;
    parent.nextUntil('.js_reqBodyParam[data-paramkbn="0"], .js_reqBodyParam[data-paramkbn="1"]').each(function(index, key) {
      if ($(key).find('.js_useKbnToggle').length > 0
        && !$(key).find('.js_useKbnToggle').prop('checked')
        && $(key).find('.js_useKbnToggle').attr("type") == "checkbox") {
        return true;
      }
      if (!isFirst) {
        dspValue += ' ,  ';
      }
      isFirst = false;
      dspValue += htmlEscape($(key).data('name')) + ' = ';
      if ($(key).find('.js_arrayElement') && $(key).find('.js_arrayElement').length > 0) {
        //配列子パラメータ
        let topCnt = 0;
        dspValue += '[ ';
        $(key).find('.js_arrayElement').each(function(arrayIndex, arrayKey) {
          if ($(arrayKey).find('.js_elementInfo').length <= 0) {
            //要素区分コンボが表示されていない場合
            if (topCnt == arrayIndex) {
              //先頭の場合
              topCnt++;
            }
            return true;
          } else {
            if (arrayIndex != topCnt) {
              //先頭以外の場合
              dspValue += ' ,  ';
            }
            dspValue += createElementValue($(arrayKey));
          }
        });
        dspValue += ' ]';
      } else {
        //通常子パラメータ
        dspValue += createElementValue($(key));
      }
      if (index + 1 >= parent.nextUntil('.js_reqBodyParam[data-paramkbn="0"], .js_reqBodyParam[data-paramkbn="1"]').length) {
        dspValue += ' }';
      }
    });
    if (!dspValue.endsWith("}")) {
      if (dspValue.endsWith(" ")) {
        dspValue += "}";
      } else {
        dspValue += " }";
      }
    }
    parent.find('.js_reqBodyParamValue').html(dspValue);
  } else {
    //通常パラメータ
    dspValue = createElementValue(element);
    element.find('.js_reqBodyParamValue').html(dspValue);
  }
}

//要素情報1行の値を生成
function createElementValue(element) {
  let dspValue = '';
  if (element.find('.js_elementKbn') && element.find('.js_elementKbn').length > 0) {
    dspValue += '<span class=\"bgC_lightGray settingValueElement borC_deep\">';
    let emptyFlg = true;
    element.find('.js_elementKbn').each(function(index, key) {
      if ($(key).find('option:selected').val() != "-1") {
        let elementKbnVal = $(key).find('option:selected').val();
        if (elementKbnVal == PARAMKBN_ENUM.manual
          && $(key).closest('.js_elementInfo').find('.js_elementDetailForm').val()
          && $(key).closest('.js_elementInfo').find('.js_elementDetailForm').val().length >= 1) {
          //手入力 かつ 手入力値が入力されている場合
          emptyFlg = false;
          dspValue += '<span class=\"settingValue bgC_header3 ws_break-spaces borC_deep\">';
          if ($(key).closest('.js_elementInfo').find('.js_elementDetailForm').val()
            && $(key).closest('.js_elementInfo').find('.js_elementDetailForm').val().length > 0) {
            dspValue += htmlEscape($(key).closest('.js_elementInfo').find('.js_elementDetailForm').val());
          }
          dspValue += '</span>';
        } else if (elementKbnVal != PARAMKBN_ENUM.manual) {
          //手入力値以外の場合
          emptyFlg = false;
          dspValue += '<span class=\"settingValue bgC_header3 borC_deep\">';
          if (elementKbnVal && elementKbnVal.includes('.')) {
            //フォーム要素の場合
            let index = elementKbnVal.indexOf('.');
            dspValue += '${' + htmlEscape(elementKbnVal.substring(index + 1, elementKbnVal.length)) + '}';
          } else if (elementKbnVal != PARAMKBN_ENUM.manual) {
            //フォーム要素以外 かつ　手入力値以外の場合
            dspValue += htmlEscape($(key).find('option:selected').text());
          }
          if ($(key).closest('.js_elementInfo').find('.js_elementDetail').length > 0
            && $(key).closest('.js_elementInfo').find('.js_elementDetail option:selected').val() != "-1") {
            dspValue += ' ' + htmlEscape($(key).closest('.js_elementInfo').find('.js_elementDetail option:selected').text());
          }
          dspValue += '</span>'
        }
      }
    });
    if (emptyFlg) {
      dspValue = '';
    } else {
      dspValue += '</span>';
    }
  }
  return dspValue;
}

//使用しないパラメータの背景色をセット
function setParamBgc(element, isDspInit = false) {
  if (element.prop('checked') || element.closest('.js_reqBodyParam').data('required') == '1') {
    //使用する
    if (element.closest('.js_reqBodyParam').data('paramkbn') != 2) {
      //子パラメータ以外
      element.closest('.js_reqBodyParam').removeClass('bgC_lightGray preview_content').addClass("bgC_tableCell");
      element.closest('.js_reqBodyParam').find('.js_elementInfo').removeClass('bgC_lightGray preview_content').addClass("bgC_tableCell");
    }

    if (element.closest('.js_reqBodyParam').data('paramkbn') == 1) {
      //親パラメータ
      let child = element.closest('.js_reqBodyParam').nextUntil('.js_reqBodyParam[data-paramkbn="0"], .js_reqBodyParam[data-paramkbn="1"]');
      child.find('.toggle-button').addClass('pointer-events_auto');
      if (!isDspInit) {
        child.removeClass('bgC_lightGray preview_content').addClass("bgC_tableCell");
        child.find('.js_elementInfo ').removeClass('bgC_lightGray preview_content').addClass("bgC_tableCell");
        child.find('.js_useKbnToggle').attr('checked', true).prop('checked', true);
      }
    } else if (element.closest('.js_reqBodyParam').data('paramkbn') == 2) {
      //子パラメータ
      element.closest('.js_reqBodyParam').removeClass('bgC_lightGray preview_content').addClass("bgC_tableCell");
      element.closest('.js_reqBodyParam').find('.js_elementInfo ').removeClass('bgC_lightGray preview_content').addClass("bgC_tableCell");
      element.closest('.js_reqBodyParam').find('td').first().removeClass('bgC_tableCell');
    }
	} else {
    //使用しない
    if (element.closest('.js_reqBodyParam').data('paramkbn') != 2) {
      //子パラメータ以外
      element.closest('.js_reqBodyParam').addClass('bgC_lightGray preview_content').removeClass("bgC_tableCell");
      element.closest('.js_reqBodyParam').find('.js_elementInfo ').addClass('bgC_lightGray preview_content').removeClass("bgC_tableCell");
      element.closest('.toggle-button').addClass('pointer-events_auto');
      element.closest('.js_reqBodyParam').find('.js_openCloseParam').addClass('pointer-events_auto');
    }

    if (element.closest('.js_reqBodyParam').data('paramkbn') == 1) {
      //親パラメータ
      let child = element.closest('.js_reqBodyParam').nextUntil('.js_reqBodyParam[data-paramkbn="0"], .js_reqBodyParam[data-paramkbn="1"]');
      child.addClass('bgC_lightGray preview_content').removeClass("bgC_tableCell");
      child.find('.js_elementInfo ').addClass('bgC_lightGray preview_content').removeClass("bgC_tableCell");
      child.find('.toggle-button').removeClass('pointer-events_auto');
      child.find('td').each(function() {
        $(this).first().removeClass('bgC_tableCell');
      });
      child.find('.js_useKbnToggle').removeAttr('checked').prop('checked', false);
    } else if (element.closest('.js_reqBodyParam').data('paramkbn') == 2) {
      //子パラメータ
      element.closest('.js_reqBodyParam').addClass('bgC_lightGray preview_content').removeClass("bgC_tableCell");
      element.closest('.js_reqBodyParam').find('.js_elementInfo ').addClass('bgC_lightGray preview_content').removeClass("bgC_tableCell");
      element.closest('.js_reqBodyParam').find('td').first().addClass('bgC_tableCell');
    }
	}
}

//配列要素を追加
function addArrayElement(element) {
  let paramIndex = htmlEscape(element.closest('.js_reqBodyParam').data('index'));
  let newIndex = 0;
  element.closest('.js_reqBodyParam').find('.js_arrayElement').each(function(index, key) {
    if (newIndex <= $(key).data('index')) {
      newIndex = $(key).data('index') + 1;
    }
  });
  let paramName;
  if (element.closest('.paramTable').data('kbn') == 1) {
    paramName = 'query';
  } else if (element.closest('.paramTable').data('kbn') == 2) {
    paramName = 'reqBody';
  }
  let arrayElement
    = '<div class=\"verAlignMid w100 arrayElement js_arrayElement mt5 mb5 outC_deep\" data-index=\"' + newIndex + '\">'
    + '<div class=\"arrayElementHandle js_arrayElementHandle mr5 p0\">'
    + '<img src=\"../common/images/original/icon_sort.png\" class=\"arrayElementSortIcon js_arrayElementSortIcon display_none\">'
    + '</div>'
    + '<div class=\"arrayElementCard js_arrayElementCard w100 outC_deep\">'
    + '<div class=\"verAlignMid w100\">'
    + '<div class=\"mb10\">'
    + msglist_rng320['rng.rng320.7']
    + '<span class=\"js_arrayElementText\"></span>'
    + '</div>'
    + '<div class=\"js_delArrayElement ml_auto mr0 mb10\">'
    + '<img class=\"cursor_p btn_classicImg-display\" src=\"../common/images/classic/icon_delete_15.png\">'
    + '<img class=\"cursor_p btn_originalImg-display\" src=\"../common/images/original/icon_delete.png\">'
    + '</div>'
    + '</div>'
    + '<div class=\"ml20 mr5 mr20\">'
    + '<table class=\"table-top mt0 mb0 elementInfoTable\">'
    + '<tbody id=\"' + paramName + 'ElementInfoList_' + paramIndex + '_' + newIndex + '\" class=\"elementInfoList js_elementInfoList\"></tbody>'
    + '</table>'
    + '<div class=\"mt5\">'
    + '<span class=\"js_addElementInfo cl_linkDef cl_linkHoverChange cursor_p\">' + msglist_rng320['rng.rng320.6'] + '</span>';
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';
  element.closest('.js_reqBodyParam').find('.js_arrayElementList').append(arrayElement);
  element.closest('.js_reqBodyParam').find('.js_arrayElement').last().find('.js_addElementInfo').trigger('click');

  //追加した要素のソート
  let el = document.getElementById(paramName + 'ElementInfoList_' + paramIndex + '_' + newIndex);
    new Sortable(el, {
    animation: 150,
    ghostClass: 'out3',
    preventOnFilter: false,
    handle: '.js_elementInfoHandle',
    onStart: onStartEvent,
    onEnd: onEndEvent,
    onSort: onSortEvent
  });
	function onStartEvent(e) {
		$('.js_sortIcon').removeClass("sortIcon");
		$('.js_elementInfo').addClass("bgC_none");
	}
	function onEndEvent(e) {
		//ホバーイベントを元に戻す
		$('.js_sortIcon').addClass("sortIcon");
		$('.js_elementInfo').removeClass("bgC_none");
	}
	function onSortEvent(e) {
		//変更後の並び順一覧
	}
}

//モデル要素パラメータのレイアウト
function setModelParam() {
  $('.js_reqBodyParam[data-paramkbn="1"] td').addClass('border_bottom_none');
  $('.js_reqBodyParam[data-paramkbn="2"]').find('.js_elementInfo').first().find('td').addClass('border_top_none');
}

//パラメータの開閉
function openCloseParam(element) {
  if (element.closest('.js_reqBodyParam').data('paramkbn') == 1) {
    element.closest('.js_reqBodyParam').nextUntil('.js_reqBodyParam[data-paramkbn="0"], .js_reqBodyParam[data-paramkbn="1"]').each(function(index, key) {
      $(key).find('.paramHideArea').animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
    });
  } else {
    element.closest('.js_reqBodyParam').find('.paramHideArea').animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
  }

  if (element.closest('.js_openCloseParam').hasClass("side_header-open")) {
    element.closest('.js_openCloseParam').removeClass("side_header-open");
    element.closest('.js_openCloseParam').addClass("side_header-close");
  } else {
    element.closest('.js_openCloseParam').removeClass("side_header-close");
    element.closest('.js_openCloseParam').addClass("side_header-open");
  }
}

//パラメータを全て開く/閉じる
function openCloseAllParam(element, openCloseFlg) {
  if (openCloseFlg) {
    element.closest('.paramTable').find('.js_openCloseParam').each(function(index, key) {
      if ($(key).hasClass('side_header-open')) {
        if ($(key).closest('.js_reqBodyParam').data('paramkbn') == 1) {
          $(key).closest('.js_reqBodyParam').nextUntil('.js_reqBodyParam[data-paramkbn="0"], .js_reqBodyParam[data-paramkbn="1"]').each(function(index, key) {
            $(key).find('.paramHideArea').animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
          });
        } else {
          $(key).closest('.js_reqBodyParam').find('.paramHideArea').animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
        }
      }
    });
    element.closest('.paramTable').find('.js_openCloseParam').removeClass("side_header-open");
    element.closest('.paramTable').find('.js_openCloseParam').addClass("side_header-close");
  } else {
    element.closest('.paramTable').find('.js_openCloseParam').each(function(index, key) {
      if ($(key).hasClass('side_header-close')) {
        if ($(key).closest('.js_reqBodyParam').data('paramkbn') == 1) {
          $(key).closest('.js_reqBodyParam').nextUntil('.js_reqBodyParam[data-paramkbn="0"], .js_reqBodyParam[data-paramkbn="1"]').each(function(index, key) {
            $(key).find('.paramHideArea').animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
          });
        } else {
          $(key).closest('.js_reqBodyParam').find('.paramHideArea').animate( { height: 'toggle', opacity: 'toggle' }, 'middle' );
        }
      }
    });
    element.closest('.paramTable').find('.js_openCloseParam').removeClass("side_header-close");
    element.closest('.paramTable').find('.js_openCloseParam').addClass("side_header-open");
  }
}


//設定した要素にname属性をセット
function setFormName() {
  //パスパラメータ
  $('.paramTable[data-kbn="0"]').find('.js_reqBodyParam').each(function(index, key) {
    $(key).find('.js_hiddenParamName').attr('name', 'rng320PathParam[' + index + '].name');
    $(key).find('.js_hiddenParamFileKbn').attr('name', 'rng320PathParam[' + index + '].paramFileKbn');
    $(key).find('.js_hiddenParamRequiredKbn').attr('name', 'rng320PathParam[' + index + '].paramRequiredKbn');
    $(key).find('.js_useKbnToggle').attr('name', 'rng320PathParam[' + index + '].useKbn');
    $(key).find('.js_elementInfo').each(function(elemIndex, elemKey) {
      $(elemKey).find('.js_elementKbn').attr('name', 'rng320PathParam[' + index + '].paramInfo[' + elemIndex + '].paramKbn');
      $(elemKey).find('.js_hiddenFormId').attr('name', 'rng320PathParam[' + index + '].paramInfo[' + elemIndex + '].paramFormId');
      $(elemKey).find('.js_elementDetail').attr('name', 'rng320PathParam[' + index + '].paramInfo[' + elemIndex + '].paramValue');
      $(elemKey).find('.js_elementDetailForm').attr('name', 'rng320PathParam[' + index + '].paramInfo[' + elemIndex + '].paramValueManual');
      $(elemKey).find('.js_useLineCombo').attr('name', 'rng320PathParam[' + index + '].paramInfo[' + elemIndex + '].paramIndex');
    });
  });
  //クエリパラメータ
  $('.paramTable[data-kbn="1"]').find('.js_reqBodyParam').each(function(index, key) {
    $(key).find('.js_hiddenParamName').attr('name', 'rng320QueryParam[' + index + '].name');
    $(key).find('.js_hiddenParamFileKbn').attr('name', 'rng320QueryParam[' + index + '].paramFileKbn');
    $(key).find('.js_hiddenParamRequiredKbn').attr('name', 'rng320QueryParam[' + index + '].paramRequiredKbn');
    $(key).find('.js_useKbnToggle').attr('name', 'rng320QueryParam[' + index + '].useKbn');
    if ($(key).find('.js_arrayElement').length > 0) {
     //配列パラメータ
      $(key).find('.js_arrayElement').each(function(arrayIndex, arrayKey) {
      if ($(arrayKey).find('.js_elementInfo') && $(arrayKey).find('.js_elementInfo').length > 0) {
        $(arrayKey).find('.js_elementInfo').each(function(elemIndex, elemKey) {
          $(elemKey).find('.js_elementKbn').attr('name', 'rng320QueryParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[' + elemIndex + '].paramKbn');
          $(elemKey).find('.js_hiddenFormId').attr('name', 'rng320QueryParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[' + elemIndex + '].paramFormId');
          $(elemKey).find('.js_elementDetail').attr('name', 'rng320QueryParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[' + elemIndex + '].paramValue');
          $(elemKey).find('.js_elementDetailForm').attr('name', 'rng320QueryParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[' + elemIndex + '].paramValueManual');
          $(elemKey).find('.js_useLineCombo').attr('name', 'rng320QueryParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[' + elemIndex + '].paramIndex');
        });
      } else {
        let dammyElement = '<tr class=\"js_dammyElement\"><input type=\"hidden\" name=\"rng320QueryParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[0].paramKbn\" value=\"-1\"/></tr>'
        $(arrayKey).find('.js_elementInfoList').append(dammyElement);
      }
      });
    } else {
      //通常パラメータ
      $(key).find('.js_elementInfo').each(function(elemIndex, elemKey) {
        $(elemKey).find('.js_elementKbn').attr('name', 'rng320QueryParam[' + index + '].paramInfo[' + elemIndex + '].paramKbn');
        $(elemKey).find('.js_hiddenFormId').attr('name', 'rng320QueryParam[' + index + '].paramInfo[' + elemIndex + '].paramFormId');
        $(elemKey).find('.js_elementDetail').attr('name', 'rng320QueryParam[' + index + '].paramInfo[' + elemIndex + '].paramValue');
        $(elemKey).find('.js_elementDetailForm').attr('name', 'rng320QueryParam[' + index + '].paramInfo[' + elemIndex + '].paramValueManual');
        $(elemKey).find('.js_useLineCombo').attr('name', 'rng320QueryParam[' + index + '].paramInfo[' + elemIndex + '].paramIndex');
      });
    }
  });
  //リクエストボディパラメータ
  $('.paramTable[data-kbn="2"]').find('.js_reqBodyParam').each(function(index, key) {
    $(key).find('.js_hiddenParamName').attr('name', 'rng320ReqBodyParam[' + index + '].name');
    $(key).find('.js_hiddenParamFileKbn').attr('name', 'rng320ReqBodyParam[' + index + '].paramFileKbn');
    $(key).find('.js_hiddenParamRequiredKbn').attr('name', 'rng320ReqBodyParam[' + index + '].paramRequiredKbn');
    $(key).find('.js_useKbnToggle').attr('name', 'rng320ReqBodyParam[' + index + '].useKbn');
    if ($(key).find('.js_arrayElement').length > 0) {
      //配列パラメータ
      $(key).find('.js_arrayElement').each(function(arrayIndex, arrayKey) {
        if ($(arrayKey).find('.js_elementInfo') && $(arrayKey).find('.js_elementInfo').length > 0) {
          $(arrayKey).find('.js_elementInfo').each(function(elemIndex, elemKey) {
            $(elemKey).find('.js_elementKbn').attr('name', 'rng320ReqBodyParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[' + elemIndex + '].paramKbn');
            $(elemKey).find('.js_hiddenFormId').attr('name', 'rng320ReqBodyParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[' + elemIndex + '].paramFormId');
            $(elemKey).find('.js_elementDetail').attr('name', 'rng320ReqBodyParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[' + elemIndex + '].paramValue');
            $(elemKey).find('.js_elementDetailForm').attr('name', 'rng320ReqBodyParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[' + elemIndex + '].paramValueManual');
            $(elemKey).find('.js_useLineCombo').attr('name', 'rng320ReqBodyParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[' + elemIndex + '].paramIndex');
          });
        } else {
          let dammyElement = '<tr class=\"js_dammyElement\"><input type=\"hidden\" name=\"rng320ReqBodyParam[' + index + '].listParamInfo[' + arrayIndex + '].paramInfo[0].paramKbn\" value=\"-1\"/></tr>'
          $(arrayKey).find('.js_elementInfoList').append(dammyElement);
        }
      });
    } else {
      //通常パラメータ
      $(key).find('.js_elementInfo').each(function(elemIndex, elemKey) {
        $(elemKey).find('.js_elementKbn').attr('name', 'rng320ReqBodyParam[' + index + '].paramInfo[' + elemIndex + '].paramKbn');
        $(elemKey).find('.js_hiddenFormId').attr('name', 'rng320ReqBodyParam[' + index + '].paramInfo[' + elemIndex + '].paramFormId');
        $(elemKey).find('.js_elementDetail').attr('name', 'rng320ReqBodyParam[' + index + '].paramInfo[' + elemIndex + '].paramValue');
        $(elemKey).find('.js_elementDetailForm').attr('name', 'rng320ReqBodyParam[' + index + '].paramInfo[' + elemIndex + '].paramValueManual');
        $(elemKey).find('.js_useLineCombo').attr('name', 'rng320ReqBodyParam[' + index + '].paramInfo[' + elemIndex + '].paramIndex');
      });
    }
  });
}

//フォームIDをhiddenにセット
function setHidenFormId(element) {
  let elemVal = element.find('option:selected').val();
  let index = elemVal.indexOf('.');
  if (index != -1) {
    let formId = elemVal.substring(index + 1, elemVal.length);
    element.closest('.js_elementInfo').find('.js_hiddenFormIdArea').html('<input type=\"hidden\" value=\"' + htmlEscape(formId) + '\" class=\"js_hiddenFormId\">');
  } else {
    element.closest('.js_elementInfo').find('.js_hiddenFormIdArea').html('');
  }
}

//実行条件を登録
function registExecuteCondition() {
  document.forms[0].CMD.value = 'okActionParam';
  let paramStr = $('form[name="rng320Form"]').serialize();
  $.ajax({
		url: "../ringi/rng320.do",
		type: "POST",
    data: paramStr
	}).done(function(data) {
		if (data['success']) {
      $('#addActionParamPop').dialog('close');
      //アクションパラメータ情報を表示
      $('.js_actionParamName').text(data['actionParamName']);
      let conditionInfo;
      if (data['conditionList'] && data['conditionList'].length > 0) {
        //実行条件が存在する
        if (data['conditionType'] == 0) {
          conditionInfo = '<div>' + msglist_rng320['rng.rng320.4'] + '</div>'
        } else if (data['conditionType'] == 1) {
          conditionInfo = '<div>' + msglist_rng320['rng.rng320.5'] + '</div>'
        }
        for (let i = 0; i < data['conditionList'].length; i++) {
          conditionInfo += '<div>・' + htmlEscape(data['conditionList'][i]) + '</div>'
        }
      } else {
        conditionInfo = msglist_rng320['cmn.notset'];
      }
      $('.js_conditionArea').html(conditionInfo);
      //編集後の実行条件の設定値を保持
      if (data['rapConditionMdl']) {
        if (data['rapConditionMdl'].conditionList && data['rapConditionMdl'].conditionList.length > 0) {
          let conditionList = data['rapConditionMdl'].conditionList;
          let hiddenCondition = '';
          for (let i = 0; i < conditionList.length; i++) {
            let paramKbn = conditionList[i].paramKbn;
            hiddenCondition += '<input type=\"hidden\" value=\"' + paramKbn + '\" class=\"js_hiddenConditionParamKbn\">'
            let paramFormId = conditionList[i].paramFormId;
            hiddenCondition += '<input type=\"hidden\" value=\"' + paramFormId + '\" class=\"js_hiddenConditionParamFormId\">'
            let paramFormTypeStr = conditionList[i].paramFormTypeStr;
            hiddenCondition += '<input type=\"hidden\" value=\"' + paramFormTypeStr + '\" class=\"js_hiddenConditionParamFormTypeStr\">'
            let paramValue = conditionList[i].paramValue;
            hiddenCondition += '<input type=\"hidden\" value=\"' + paramValue + '\" class=\"js_hiddenConditionParamValue\">'
            let compareTarget = conditionList[i].compareTarget;
            hiddenCondition += '<input type=\"hidden\" value=\"' + compareTarget + '\" class=\"js_hiddenConditionCompareTarget\">'
            let compareType = conditionList[i].compareType;
            hiddenCondition += '<input type=\"hidden\" value=\"' + compareType + '\" class=\"js_hiddenConditionCompareType\">'
            let errorFlg = conditionList[i].errorFlg;
            hiddenCondition += '<input type=\"hidden\" value=\"' + errorFlg + '\" class=\"js_hiddenConditionErrorFlg\">'
            let conditionStr = conditionList[i].conditionStr;
            hiddenCondition += '<input type=\"hidden\" value=\"' + conditionStr + '\" class=\"js_hiddenConditionStr\">'
            let compareTargetGroupSid = conditionList[i].compareTargetGroupSid;
            hiddenCondition += '<input type=\"hidden\" value=\"' + compareTargetGroupSid + '\" class=\"js_hiddenConditionCompareTargetGroupSid\">'
          }
          $('.js_hiddenCondition').html(hiddenCondition);
        }
      }
      //フォーム要素削除時の警告を非表示
      $('.js_delMsgAreaForDialog').html('');
      $('.js_delMsgAreaForDialog').removeClass('mt5 mb5');
      $('.js_executeTargetCombo').closest('div').removeClass('mb5');
    } else {
      $('.js_errorMsgAreaForDialog').html('');
      $('#addActionParamPop').animate({scrollTop : 0}, 'fast');
      if (data['fileError']) {
        //決裁後アクション用ファイルの読み込みに失敗
        let errorMsg = '<div class=\"textError\">' + msglist_rng320['cmn.error.access'] + '</div>'
        $('.js_errorMsgAreaForDialog').html(errorMsg);
      } else if (data['errorMsgList']) {
        //入力チェックエラーメッセージ表示
        let errorMsg = '';
        for (let i = 0; i < data['errorMsgList'].length; i++) {
          errorMsg += '<div class=\"textError\">' + data['errorMsgList'][i] + '</div>'
        }
        $('.js_errorMsgAreaForDialog').html(errorMsg);
      } else {
        //アクセス権限がない場合
        let errorMsg = '<div class=\"textError\">' + msglist_rng320['cmn.error.access'] + '</div>'
        $('.js_errorMsgAreaForDialog').html(errorMsg);
      }
    }
  }).fail(function(data) {
    alert(msglist_rng320['failed.communication']);
  })
}

//パラメータ情報をセット
function setParamInfo() {
  $('.js_reqBodyParam').each(function(index, key) {
    let delFlg = false;
    if ($(key).find('.js_arrayElement').length > 0) {
      //配列パラメータ
      $(key).find('.js_arrayElement').each(function(arrayIndex, arrayKey) {
        $(arrayKey).find('.js_elementKbn').each(function(paramIndex, paramKey) {
          if ($(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').length > 0) {
            let errorFlg = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenErrorFlg').val();
            if (errorFlg == 'true') {
              //削除されたフォーム要素の場合
              delFlg = true;
              let delMsg = msglist_rng320['rng.rng320.23'];
              let formName = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamFormName').val();
              if (formName != null && formName.length > 0) {
                let formId = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamFormId').val();
                let paramValueStr = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamValueStr').val();
                delMsg += '<br>・' + htmlEscape(formName) + ' ${' + htmlEscape(formId) + '} ' + htmlEscape(paramValueStr);
              }
              $(paramKey).closest('.js_elementInfo').find('.js_delMsgArea').html(delMsg);
              $(paramKey).val("-1");
              $(paramKey).trigger("change");
            } else {
              let paramKbn = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamKbn').val();
              if (paramKbn == PARAMKBN_ENUM.form) {
                //フォーム要素
                let formId = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamFormId').val();
                let formType = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamFormTypeStr').val();
                paramKbn = formType + '.' + formId;
              }
              let paramValue = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamValue').val();
              let paramValueManual = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamValueManual').val();
              let paramIndexVal = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamIndex').val();
              $(paramKey).val(paramKbn).trigger('change');
              //要素詳細
              if (paramValue && paramValue != PARAMVALUE_ENUM.noselect) {
                $(paramKey).closest('.js_elementInfo').find('.js_elementDetail').val(paramValue).trigger('change');
              }
              //要素詳細（手入力値）
              if (paramKbn == PARAMKBN_ENUM.manual) {
                $(paramKey).closest('.js_elementInfo').find('.js_elementDetailForm').val(paramValueManual).trigger('input');
              }
              //使用するボディ行
              if (paramIndexVal != PARAMINDEX_ENUM.noselect) {
                $(paramKey).closest('.js_elementInfo').find('.js_useLineCombo').val(paramIndexVal);
              } else {
                $(paramKey).closest('.js_elementInfo').find('.js_useLineCombo').val(PARAMINDEX_ENUM.all);
              }
            }
          }
        });
      });
    } else {
      //通常パラメータ
      $(key).find('.js_elementKbn').each(function(paramIndex, paramKey) {
        if ($(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').length > 0) {
          let errorFlg = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenErrorFlg').val();
          if (errorFlg == 'true') {
            //削除されたフォーム要素の場合
            delFlg = true;
            let delMsg = msglist_rng320['rng.rng320.23'];
            let formName = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamFormName').val();
            if (formName != null && formName.length > 0) {
              let formId = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamFormId').val();
              let paramValueStr = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamValueStr').val();
              delMsg += '<br>・' + htmlEscape(formName) + ' ${' + htmlEscape(formId) + '} ' + htmlEscape(paramValueStr);
            }
            $(paramKey).closest('.js_elementInfo').find('.js_delMsgArea').html(delMsg);
            $(paramKey).val("-1");
            $(paramKey).trigger("change");
          } else {
            let paramKbn = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamKbn').val();
            if (paramKbn == PARAMKBN_ENUM.form) {
              //フォーム要素
              let formId = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamFormId').val();
              let formType = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamFormTypeStr').val();
              paramKbn = formType + '.' + formId;
            }
            $(paramKey).val(paramKbn).trigger('change');

            let paramValue = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamValue').val();
            //繰り返し実行対象が変更されたことによって、確認時添付ファイルの要素詳細コンボの値が空にならないように書き換える
            let paramValueOptions = $(paramKey).closest('.js_elementInfo').find('.js_elementDetail').find('option');
            for (let idx = 0; idx < paramValueOptions.length; idx++) {
              if (paramValue == paramValueOptions.eq(idx).val()) {
                break;
              }
              if (idx == paramValueOptions.length - 1) {
                //選択してください。の下にある値を設定
                paramValue = paramValueOptions.eq(1).val();
              }
            }
            let paramValueManual = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamValueManual').val();
            let paramIndexVal = $(paramKey).closest('.js_elementInfo').find('.js_hiddenRapParamArea').find('.js_hiddenParamIndex').val();
            //要素詳細
            if (paramValue && paramValue != PARAMVALUE_ENUM.noselect) {
              $(paramKey).closest('.js_elementInfo').find('.js_elementDetail').val(paramValue).trigger('change');
            }
            //要素詳細（手入力値）
            if (paramKbn == PARAMKBN_ENUM.manual) {
              $(paramKey).closest('.js_elementInfo').find('.js_elementDetailForm').val(paramValueManual).trigger('input');
            }
            //使用するボディ行
            if (paramIndexVal != PARAMINDEX_ENUM.noselect) {
              $(paramKey).closest('.js_elementInfo').find('.js_useLineCombo').val(paramIndexVal);
            } else {
              $(paramKey).closest('.js_elementInfo').find('.js_useLineCombo').val(PARAMINDEX_ENUM.top);
            }
          }
        }
      });
    }
    //削除されたフォーム要素があるパラメータに警告アイコンを表示
    if (delFlg) {
      $(key).find('.js_warnArea').html('<img src=\"../common/images/original/icon_warn.png\">');
    }
  });
}

//配列要素にインデックスを振る
function dspArrayIndex() {
  $('.js_reqBodyParam').each(function(index, key){
    if ($(key).find('.js_arrayElement') && $(key).find('.js_arrayElement').length > 0) {
      $(key).find('.js_arrayElement').each(function(arrayIndex, arrayKey) {
        $(arrayKey).find('.js_arrayElementText').html(arrayIndex + 1);
      });
    }
  });
}