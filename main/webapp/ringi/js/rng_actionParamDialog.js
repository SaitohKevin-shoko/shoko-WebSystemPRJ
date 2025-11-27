$(function() {
  //既存の実行条件を複写コンボのレイアウト修正
  dspCopyConditionCombo();

	//実行条件の並び替え
  sortExecuteSortable();

	//条件対象コンボ変更時
  $(document).on('change', '.js_executeTargetCombo', function() {
    let index = $(this).closest('.js_executeCondition').data('index');
    setExecuteConditionForConditionTarget($(this), index);
    setHidenFormIdForActionParamDialog($(this));
  });

  //条件対象詳細コンボ変更時
  $(document).on('change', '.js_executeTargetDetailCombo', function() {
    let index = $(this).closest('.js_executeCondition').data('index');
    setExecuteConditionForConditionTargetDetail($(this).val(), index);
  });

  //実行条件を追加
  $('.js_addExecuteCondition').on('click', function() {
    addExecuteCondition();
  });

  //実行条件を複写
  $(document).on('click', '.js_copyExecuteCondition', function() {
    let index = $(this).closest('.js_executeCondition').data('index');
    copyExecuteCondition(htmlEscape(index));
  });

  //実行条件を削除
  $(document).on('click', '.js_delExecuteCondition', function() {
    let index = $(this).closest('.js_executeCondition').data('index');
    deleteExecuteCondition(index);
  });

  //既存の実行条件を複写
  $('.js_existExecuteConditionCombo').on('change', function() {
    copyExistExecuteCondition($(this));
  });

  //実行条件>グループコンボを切り替え
  $(document).on('change', '.js_groupCombo', function() {
    setUserCombo($(this));
  });

  //実行条件ヘルプを押下
  $('.js_dspExecuteConditionHelp').on('click', function() {
    dspExecuteConditionHelp();
  });
  $(document).click(function(e) {
    if (!$(e.target).closest('#executeConditionHelp, .js_dspExecuteConditionHelp').length) {
      $('#executeConditionHelp').addClass('visibility-hidden');
    }
  })
});

//フォーム要素タイプの定義
let TYPE_ENUM = {
  label : 'label',
  textbox : 'textbox',
  textarea : 'textarea',
  date : 'date',
  time : 'time',
  number : 'number',
  radio : 'radio',
  combo : 'combo',
  check : 'check',
  sum : 'sum',
  calc : 'calc',
  user : 'user',
  group : 'group',
  block : 'block',
  blocklist : 'blocklist',
  file : 'file'
}

//設定値の定義
let PARAMKBN_ENUM = {
  form : '0',
  addUser : '1',
  addDate : '2',
  letUser : '3',
  letDate : '4',
  ringiInfo : '5',
  manual : '6'
}

//設定値詳細の定義
let PARAMVALUE_ENUM = {
  noselect : '0',
  userSid : '101',
  userId : '102',
  userSei : '103',
  userMei : '104',
  userSeiMei : '105',
  userSeiKana : '106',
  userMeiKana : '107',
  userSeiMeiKana : '108',
  syainNo : '109',
  belongGroupSid : '110',
  belongGroupId : '111',
  belongGroupName : '112',
  belongGroupNameKana : '113',
  mailAddress1 : '114',
  mailAddress2 : '115',
  mailAddress3 : '116',
  position : '117',
  groupSid : '201',
  groupId : '202',
  groupName : '203',
  groupNameKana : '204',
  dateTimeSlash : '301',
  dateTimeHyphen : '302',
  dateTimeText : '303',
  dateSlash : '304',
  dateHyphen : '305',
  dateText : '306',
  timeSecondColon : '307',
  timeSecondText : '308',
  timeColon : '309',
  timeText : '310',
  year : '311',
  month : '312',
  day : '313',
  time : '314',
  minute : '315',
  second : '316',
  title : '401',
  sinseiID : '402',
  file : '403',
  fileTop : '404',
  fileBottom : '405'
}

//比較条件
let COMPARETYPE_ENUM = {
  equal : '1',
  notEqual : '2',
  contain : '3',
  notContain : '4',
  moreThan : '5',
  more : '6',
  less : '7',
  lessThan : '8',
  notExistFile : '9',
  existFile : '10'
}

//表要素インデックス区分
let PARAMINDEX_ENUM = {
  noselect : '-1',
  all : '0',
  top : '1',
  bottom : '2'
}

//フォーム要素リスト
let formCellList;
//グループリスト
let groupList;
//役職リスト
let posList;


//URLを取得
function getUrl() {
  let url;
  if ($('form').attr('name') == 'rng310Form') {
    url = '../ringi/rng310.do'
  } else if ($('form').attr('name') == 'rng320Form'){
    url = '../ringi/rng320.do'
  }
  return url;
}

//リクエスト送信するパラメータを生成
function createParamStr() {
  let rngTemplateMode = $('input[name="rngTemplateMode"]').val();
  let paramStr = '&rngTemplateMode=' + rngTemplateMode;
  let rng090rtpSpecVer = $('input[name="rng090rtpSpecVer"]').val();
  paramStr += '&rng090rtpSpecVer=' + rng090rtpSpecVer;
  let rngSelectTplSid = $('input[name="rngSelectTplSid"]').val();
  paramStr += '&rngSelectTplSid=' + rngSelectTplSid;
  let rng090CatSid = $('input[name="rng090CatSid"]').val();
  paramStr += '&rng090CatSid=' + rng090CatSid;
  let rngCmdMode = $('input[name="rngCmdMode"]').val();
  paramStr += '&rngCmdMode=' + rngCmdMode;
  let rng090SelectCacSid = $('input[name="rng090SelectCacSid"]').val();
  paramStr += '&rng090SelectCacSid=' + rng090SelectCacSid;
  let rng090SelectActionIndex = $('input[name="rng090SelectActionIndex"]').val();
  paramStr += '&rng090SelectActionIndex=' + rng090SelectActionIndex;
  let rngTplCmdMode = $('input[name="rngTplCmdMode"]').val();
  paramStr += '&rngTplCmdMode=' + rngTplCmdMode;
  return paramStr;
}

//フォーム要素リストを取得
function getFormCellList() {
  let url = getUrl();
  let paramStr = 'CMD=getFormInfo'
  let formJson = $('input[name="rng090templateJSON"]').val();
  paramStr += '&rng090templateJSON=' + formJson;
  paramStr += createParamStr();

  $.ajax({
    url: url,
    type: "POST",
    data: paramStr
  }).done(function(data) {
    if (data['success']) {
      formCellList = data['formCellList'];
    } else {
      //アクセス権限エラー
      let errorMsg = '<div class=\"textError\">' + msglist_actionParamDialog['cmn.error.access'] + '</div>'
      $('.js_errorMsgAreaForDialog').html(errorMsg);
    }
  }).fail(function(data) {
    alert(msglist_actionParamDialog['failed.communication']);
  });
}

//条件対象コンボをセット
function setExecuteTargetCombo(index) {
  if (formCellList && formCellList.length > 0) {
    createExecuteTargetCombo(index);
  } else {
    let url = getUrl();
    let paramStr = 'CMD=getFormInfo'
    let formJson = $('input[name="rng090templateJSON"]').val();
    paramStr += '&rng090templateJSON=' + formJson;
    paramStr += createParamStr();

    $.ajax({
      url: url,
      type: "POST",
      data: paramStr
    }).done(function(data) {
      if (data['success']) {
        formCellList = data['formCellList'];
        createExecuteTargetCombo(index);
      } else {
        //アクセス権限エラー
        let errorMsg = '<div class=\"textError\">' + msglist_actionParamDialog['cmn.error.access'] + '</div>'
        $('.js_errorMsgAreaForDialog').html(errorMsg);
      }
    }).fail(function(data) {
      alert(msglist_actionParamDialog['failed.communication']);
    });
  }
}

//条件対象コンボを作成
function createExecuteTargetCombo(index) {

  let executeTargetCombo
    = '<select class=\"js_executeTargetCombo wp200\">'
    + '<option value=\"-1\">' + msglist_actionParamDialog['rng.rng310.55'] + '</option>';

  //コンボの中身をセット
  for (let i = 0; i < formCellList.length; i++) {
    if (formCellList[i].type == ''
      || formCellList[i].type == TYPE_ENUM.blocklist
      || formCellList[i].type == TYPE_ENUM.block) {
      continue;
    } else {
      if (formCellList[i].type == TYPE_ENUM.user && formCellList[i].body.multiFlg == "1"
        || formCellList[i].type == TYPE_ENUM.group && formCellList[i].body.multiFlg == "1"
        || formCellList[i].type == TYPE_ENUM.check) {
        executeTargetCombo += '<option value=\"M' + formCellList[i].type + '.' + htmlEscape(formCellList[i].formID) + '\">' + htmlEscape(formCellList[i].title) + ' ${' + htmlEscape(formCellList[i].formID) + '}</option>';
      } else {
        executeTargetCombo += '<option value=\"' + formCellList[i].type + '.' + htmlEscape(formCellList[i].formID) + '\">' + htmlEscape(formCellList[i].title) + ' ${' + htmlEscape(formCellList[i].formID) + '}</option>';
      }
    }
  }

  executeTargetCombo
    += '<option value=\"' + PARAMKBN_ENUM.addUser + '\">' + msglist_actionParamDialog['rng.47'] + '</option>'
    + '<option value=\"' + PARAMKBN_ENUM.addDate + '\">' + msglist_actionParamDialog['rng.application.date'] + '</option>'
    + '<option value=\"' + PARAMKBN_ENUM.letUser + '\">' + msglist_actionParamDialog['rng.rng330.2'] + '</option>'
    + '<option value=\"' + PARAMKBN_ENUM.letDate + '\">' + msglist_actionParamDialog['rng.rng330.3'] + '</option>'
    + '<option value=\"' + PARAMKBN_ENUM.ringiInfo + '\">' + msglist_actionParamDialog['rng.rng320.14'] + '</option>'
    + '</select>';
  $('.js_executeCondition[data-index="' + index + '"]').find('.js_executeTargetComboArea').html(executeTargetCombo);
}

//実行条件をソート
function sortExecuteSortable() {
	let el = document.getElementById('executeConditionList');
	let executeConditionSortable = new Sortable(el, {
		animation: 150,
		ghostClass: 'out3',
		preventOnFilter: false,
		handle: '.js_executeConditionHandle',
		onStart: onStartEvent,
		onEnd: onEndEvent,
	});
	function onStartEvent(e) {
		$('.js_sortIcon').removeClass("sortIcon");
		$('.js_executeConditionHandle').addClass("bgC_none");
	}
	function onEndEvent(e) {
		//ホバーイベントを元に戻す
		$('.js_sortIcon').addClass("sortIcon");
		$('.js_executeConditionHandle').removeClass("bgC_none");
	}
}

//条件対象コンボ変更時、各コンボをセット
function setExecuteConditionForConditionTarget(element, index) {
  //条件対象詳細コンボをセット
  let elementVal = element.val();
  let executeTargetDetailCombo;
  let plainElementVal = elementVal;
  if (plainElementVal.startsWith('B')) {
    elementVal = plainElementVal.substring(1, plainElementVal.length)
  } else if (plainElementVal.startsWith('M')) {
    elementVal = plainElementVal.substring(1, plainElementVal.length)
  }
  let elementIndex = elementVal.indexOf('.');
  let elementType = elementVal.substring(0, elementIndex);

  //ユーザ情報
  if (elementType == TYPE_ENUM.user
      || elementVal == PARAMKBN_ENUM.addUser
      || elementVal == PARAMKBN_ENUM.letUser) {
    executeTargetDetailCombo
      = '<select class=\"js_executeTargetDetailCombo ml5\">'
      + '<option value=\"' + PARAMVALUE_ENUM.noselect + '\">' + msglist_actionParamDialog['cmn.not.selected'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.position + '\">' + msglist_actionParamDialog['cmn.post'] + '</option>'
      + '</select>';

  //稟議情報
  } else if (elementVal == PARAMKBN_ENUM.ringiInfo) {
    executeTargetDetailCombo
      = '<select class=\"js_executeTargetDetailCombo ml5\">'
      + '<option value=\"-1\">' + msglist_actionParamDialog['cmn.select.plz'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.title + '\">' + msglist_actionParamDialog['cmn.title'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.sinseiID + '\">' + msglist_actionParamDialog['rng.rng310.56'] + '</option>'
      + '<option value=\"' + PARAMVALUE_ENUM.file + '\">' + msglist_actionParamDialog['rng.rng330.4'] + '</option>'
      + '</select>';
  } else {
    executeTargetDetailCombo = '';
  }
  $('.js_executeCondition[data-index="' + index + '"]').find('.js_executeTargetDetailComboArea').html(executeTargetDetailCombo);

  //入力フォームを表示
  if (elementType == TYPE_ENUM.label
    || elementType == TYPE_ENUM.textbox
    || elementType == TYPE_ENUM.textarea
    || elementType == TYPE_ENUM.number
    || elementType == TYPE_ENUM.sum
    || elementType == TYPE_ENUM.calc) {
    let compareStr
      = '<input type=\"text\" placeholder=\"' + msglist_actionParamDialog['rng.rng310.20'] + '\" class=\"js_compareStr wp200 mr5\" maxlength=\"50\"/>';
    $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);

  //選択肢コンボを表示
  } else if (elementType == TYPE_ENUM.radio
    || elementType == TYPE_ENUM.combo
    || elementType == TYPE_ENUM.check) {

    if (formCellList && formCellList.length > 0) {
      //フォーム要素リスト取得済みの場合
      let compareStr = '<select class=\"js_compareStrCombo wp200 mr5\">';
      compareStr += createSelectOption(elementVal);
      compareStr += '</select>';
      $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
    } else {
      //フォーム要素リスト未取得の場合
      let url = getUrl();
      let paramStr = 'CMD=getFormInfo'
      let formJson = $('input[name="rng090templateJSON"]').val();
      paramStr += '&rng090templateJSON=' + formJson;
      paramStr += createParamStr();

      $.ajax({
        url: url,
        type: "POST",
        data: paramStr
      }).done(function(data) {
        if (data['success']) {
          formCellList = data['formCellList'];
          let compareStr = '<select class=\"js_compareStrCombo wp200 mr5\">';
          compareStr += createSelectOption(elementVal);
          compareStr += '</select>';
          $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
        } else {
          //アクセス権限エラー
          let errorMsg = '<div class=\"textError\">' + msglist_actionParamDialog['cmn.error.access'] + '</div>'
          $('.js_errorMsgAreaForDialog').html(errorMsg);
        }
      }).fail(function(data) {
        alert(msglist_actionParamDialog['failed.communication']);
      });
    }

  //日付/時間選択フォームを表示
  } else if (elementType == TYPE_ENUM.date
    || elementType == TYPE_ENUM.time
    || elementVal == PARAMKBN_ENUM.addDate
    || elementVal == PARAMKBN_ENUM.letDate) {

    let compareStr = '';
    //日付選択フォームを表示
    if (elementType == TYPE_ENUM.date
      || elementVal == PARAMKBN_ENUM.addDate
      || elementVal == PARAMKBN_ENUM.letDate) {
      compareStr
        += '<span class=\"pos_rel display_flex mr5\">'
        + '<input type=\"text\" name=\"compareStr\" maxlength=\"10\" value=\"\" class=\"js_compareStr txt_c wp95 datepicker js_frDatePicker js_compareDate\"/>'
        + '<span class=\"picker-acs icon-date display_flex cursor_pointer iconKikanStart\"></span></span>';
    }
    //時間選択フォームを表示
    if (elementType == TYPE_ENUM.time
      || elementVal == PARAMKBN_ENUM.addDate
      || elementVal == PARAMKBN_ENUM.letDate) {
      compareStr
        += '<span class=\"clockpicker_fr mr5 pos_rel display_flex input-group\">'
        + '<input type=\"text\" name=\"compareStr\" maxlength=\"5\" value=\"\" id=\"clock_' + index + '\" class=\"js_compareStr clockpicker js_clockpicker txt_c wp60\"/>'
        + '<label for=\"clock_' + index + '\" class=\"picker-acs cursor_pointer icon-clock input-group-addon\"></label></span>';
    }
    $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);

  //ユーザ選択コンボを表示
  } else if ((elementType == TYPE_ENUM.user
    || elementVal == PARAMKBN_ENUM.addUser
    || elementVal == PARAMKBN_ENUM.letUser)) {

    if (groupList && groupList.length > 0) {
      //グループリスト取得済みの場合
      let compareStr = createUserCombo();
      $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
    } else {
      //グループリスト未取得の場合
      let url = getUrl();
      let paramStr = 'CMD=getGroupList'
      paramStr += createParamStr();

      $.ajax({
        url: url,
        type: "POST",
        data: paramStr
      }).done(function(data) {
        if (data['success']) {
          groupList = data['groupList'];
          let compareStr = createUserCombo();
          $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
        } else {
          //アクセス権限エラー
          let errorMsg = '<div class=\"textError\">' + msglist_actionParamDialog['cmn.error.access'] + '</div>'
          $('.js_errorMsgAreaForDialog').html(errorMsg);
        }
      }).fail(function(data) {
        alert(msglist_actionParamDialog['failed.communication']);
      });
    }

  //グループ選択コンボを表示
  } else if (elementType == TYPE_ENUM.group) {

    if (groupList && groupList.length > 0) {
      //グループリスト取得済みの場合
      let compareStr = createGroupCombo();
      $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
    } else {
      //グループリスト未取得の場合
      let url = getUrl();
      let paramStr = 'CMD=getGroupList'
      paramStr += createParamStr();

      $.ajax({
        url: url,
        type: "POST",
        data: paramStr
      }).done(function(data) {
        if (data['success']) {
          groupList = data['groupList'];
          let compareStr = createGroupCombo();
          $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
        } else {
          //アクセス権限エラー
          let errorMsg = '<div class=\"textError\">' + msglist_actionParamDialog['cmn.error.access'] + '</div>'
          $('.js_errorMsgAreaForDialog').html(errorMsg);
        }
      }).fail(function(data) {
        alert(msglist_actionParamDialog['failed.communication']);
      });
    }
  } else {
    let compareStr = '';
    $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
  }

  if (elementType == TYPE_ENUM.date
    || elementVal == PARAMKBN_ENUM.addDate
    || elementVal == PARAMKBN_ENUM.letDate) {
    $('.js_compareStrArea .js_frDatePicker').each(function(index, key) {
      startDatePicker(key, 0);
    });
  }
  if (elementType == TYPE_ENUM.time
    || elementVal == PARAMKBN_ENUM.addDate
    || elementVal == PARAMKBN_ENUM.letDate) {
    $('.js_clockpicker').each(function(index, key) {
      startClockPicker($(key));
    });
  }

  //比較条件をセット
  let compareCondition;
  if (elementType == TYPE_ENUM.date
    || elementType == TYPE_ENUM.time
    || elementType == TYPE_ENUM.number
    || elementType == TYPE_ENUM.sum
    || elementType == TYPE_ENUM.calc
    || elementType == TYPE_ENUM.radio
    || elementType == TYPE_ENUM.combo
    || (elementType == TYPE_ENUM.user && !plainElementVal.startsWith('M'))
    || (elementType == TYPE_ENUM.group && !plainElementVal.startsWith('M'))
    || elementVal == PARAMKBN_ENUM.addUser
    || elementVal == PARAMKBN_ENUM.letUser) {
    compareCondition
      = '<select class=\"js_compareCondition\">'
      + '<option value=\"' + COMPARETYPE_ENUM.equal + '\">' + msglist_actionParamDialog['rng.rng310.57'] + '</option>'
      + '<option value=\"' + COMPARETYPE_ENUM.notEqual + '\">' + msglist_actionParamDialog['rng.rng310.58'] + '</option>';
    if (elementType == TYPE_ENUM.date
      || elementType == TYPE_ENUM.time
      || elementType == TYPE_ENUM.number
      || elementType == TYPE_ENUM.sum
      || elementType == TYPE_ENUM.calc) {
      compareCondition
        += '<option value=\"' + COMPARETYPE_ENUM.moreThan + '\">' + msglist_actionParamDialog['rng.rng310.59'] + '</option>'
        + '<option value=\"' + COMPARETYPE_ENUM.more + '\">' + msglist_actionParamDialog['rng.rng310.65'] + '</option>'
        + '<option value=\"' + COMPARETYPE_ENUM.less + '\">' + msglist_actionParamDialog['rng.rng310.66'] + '</option>'
        + '<option value=\"' + COMPARETYPE_ENUM.lessThan + '\">' + msglist_actionParamDialog['rng.rng310.67'] + '</option>';
    }
    compareCondition
      += '</select>';
  } else if (elementType == TYPE_ENUM.label
    || elementType == TYPE_ENUM.textbox
    || elementType == TYPE_ENUM.textarea
    || elementType == TYPE_ENUM.check
    || (elementType == TYPE_ENUM.user && plainElementVal.startsWith('M'))
    || (elementType == TYPE_ENUM.group && plainElementVal.startsWith('M'))) {
    compareCondition
      = '<select class=\"js_compareCondition\">'
      + '<option value=\"' + COMPARETYPE_ENUM.contain + '\">' + msglist_actionParamDialog['rng.rng310.60'] + '</option>'
      + '<option value=\"' + COMPARETYPE_ENUM.notContain + '\">' + msglist_actionParamDialog['rng.rng310.61'] + '</option>'
      + '</select>';
  } else if (elementVal == PARAMKBN_ENUM.addDate
    || elementVal == PARAMKBN_ENUM.letDate) {
    compareCondition
      = '<select class=\"js_compareCondition\">'
      + '<option value=\"' + COMPARETYPE_ENUM.moreThan + '\">' + msglist_actionParamDialog['rng.rng310.59'] + '</option>'
      + '<option value=\"' + COMPARETYPE_ENUM.more + '\">' + msglist_actionParamDialog['rng.rng310.65'] + '</option>'
      + '<option value=\"' + COMPARETYPE_ENUM.less + '\">' + msglist_actionParamDialog['rng.rng310.66'] + '</option>'
      + '<option value=\"' + COMPARETYPE_ENUM.lessThan + '\">' + msglist_actionParamDialog['rng.rng310.67'] + '</option>'
      + '</select>';
  } else if (elementType == TYPE_ENUM.file) {
    compareCondition
      = '<select class=\"js_compareCondition\">'
      + '<option value=\"' + COMPARETYPE_ENUM.existFile + '\">' + msglist_actionParamDialog['rng.rng310.62'] + '</option>'
      + '<option value=\"' + COMPARETYPE_ENUM.notExistFile + '\">' + msglist_actionParamDialog['rng.rng310.63'] + '</option>'
      + '</select>';
  } else {
    compareCondition = '';
  }
  $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareConditionComboArea').html(compareCondition);
}

//ユーザ選択コンボを作成
function createUserCombo() {
  let compareStr
  = '<select class=\"js_groupCombo wp200 mr5\">'
  + '<option value=\"-1\">' + msglist_actionParamDialog['cmn.select.plz'] + '</option>';

  for (let i = 0; i < groupList.length; i++) {
    compareStr += '<option value=\"' + groupList[i].value + '\">' + htmlEscape(groupList[i].label) + '</option>';
  }
  compareStr
    += '</select>'
    + '<select class=\"js_compareStrCombo wp200 mr5\">'
    + '<option value=\"-1\">' + msglist_actionParamDialog['cmn.select.plz'] + '</option>'
    + '</select>';
  return compareStr;
}

//グループ選択コンボを作成
function createGroupCombo() {
  let compareStr
    = '<select class=\"js_compareStrCombo wp200 mr5\">'
    + '<option value=\"-1\">' + msglist_actionParamDialog['cmn.select.plz'] + '</option>';

  for (let i = 0; i < groupList.length; i++) {
    compareStr += '<option value=\"' + groupList[i].value + '\">' + htmlEscape(groupList[i].label) + '</option>';
  }
  compareStr
    += '</select>';
  return compareStr;
}


//ラジオ/チェック/コンボの選択肢を作成
function createSelectOption(elementVal) {
  let compareStrOption
  = '<option value=\"-1\">' + msglist_actionParamDialog['cmn.select.plz'] + '</option>';

  for (let i = 0; i <formCellList.length; i++) {
    let elemIndex = elementVal.indexOf('.');
    let formId = elementVal.substring(elemIndex + 1, elementVal.length);
    if (formCellList[i].formID == formId) {
      for (let selElemIndex = 0; selElemIndex < formCellList[i].body.list.length; selElemIndex++) {
        compareStrOption += '<option value=\"' + htmlEscape(formCellList[i].body.list[selElemIndex]) + '\">' + htmlEscape(formCellList[i].body.list[selElemIndex]) + '</option>';
      }
    }
  }
  return compareStrOption;
}

//役職選択コンボを作成
function createPosCombo() {
  compareStr
    = '<select class=\"js_compareStrCombo js_posCombo wp100 mr5\">';
  for (let i = 0; i < posList.length; i++) {
    compareStr += '<option value=\"' + posList[i].posSid + '\">' + htmlEscape(posList[i].posName) + '</option>'
  }
  compareStr += '</select>';
  return compareStr;
}

//ユーザコンボをセット
function setUserCombo(element) {
  let url = getUrl();
  let grpSid = element.find('option:selected').val();
  let paramStr = 'CMD=getUserList&rng310SelectGroupSid=' + grpSid;
  paramStr += createParamStr();

  $.ajax({
    url: url,
    type: "POST",
    data: paramStr
  }).done(function(data) {
    if (data['success']) {
      let compareStr = '<option value=\"-1\">' + msglist_actionParamDialog['cmn.select.plz'] + '</option>'
      for (let i = 0; i < data['userList'].length; i++) {
        compareStr += '<option value=\"' + data['userList'][i].value + '\">' + htmlEscape(data['userList'][i].label) + '</option>';
      }
      element.closest('.js_compareStrArea').find('.js_compareStrCombo').html(compareStr);
    } else {
      //アクセス権限エラー
      let errorMsg = '<div class=\"textError\">' + msglist_actionParamDialog['cmn.error.access'] + '</div>'
      $('.js_errorMsgAreaForDialog').html(errorMsg);
    }
  }).fail(function(data) {
    alert(msglist_actionParamDialog['failed.communication']);
  });
}

//条件対象詳細コンボ変更時、各コンボをセット
function setExecuteConditionForConditionTargetDetail(elementVal, index) {
  //ユーザ情報>未選択
  if (elementVal == PARAMVALUE_ENUM.noselect) {

    if (groupList && groupList.length > 0) {
      //グループリスト取得済みの場合
      let compareStr = createUserCombo();
      $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
    } else {
      //グループリスト未取得の場合
      let url = getUrl();
      let paramStr = 'CMD=getGroupList'
      paramStr += createParamStr();

      $.ajax({
        url: url,
        type: "POST",
        data: paramStr
      }).done(function(data) {
        if (data['success']) {
          groupList = data['groupList'];
          let compareStr = createUserCombo();
          $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
        } else {
          //アクセス権限エラー
          let errorMsg = '<div class=\"textError\">' + msglist_actionParamDialog['cmn.error.access'] + '</div>'
          $('.js_errorMsgAreaForDialog').html(errorMsg);
        }
      }).fail(function(data) {
        alert(msglist_actionParamDialog['failed.communication']);
      });
    }

  //ユーザ情報>役職
  } else if (elementVal == PARAMVALUE_ENUM.position) {

    if (posList && posList.length > 0) {
      //役職リスト取得済みの場合
      let compareStr = createPosCombo();
      $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
    } else {
      //役職リスト未取得の場合
      let url;
      if ($('form').attr('name') == 'rng310Form') {
        url = '../ringi/rng310.do'
      } else if ($('form').attr('name') == 'rng320Form'){
        url = '../ringi/rng320.do'
      }

      let paramStr = 'CMD=getPosInfo'
      paramStr += createParamStr();

      $.ajax({
        url: url,
        type: "POST",
        data: paramStr
      }).done(function(data) {
        if (data['success']) {
          posList = data['positionList'];
          let compareStr = createPosCombo();
          $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
        } else {
          //アクセス権限エラー
          let errorMsg = '<div class=\"textError\">' + msglist_actionParamDialog['cmn.error.access'] + '</div>'
          $('.js_errorMsgAreaForDialog').html(errorMsg);
        }
      }).fail(function() {
        alert(msglist_actionParamDialog['failed.communication']);
      })
    }

  //稟議情報>タイトル/申請ID
  } else if (elementVal == PARAMVALUE_ENUM.title
    || elementVal == PARAMVALUE_ENUM.sinseiID) {
    let compareStr
      = '<input type=\"text\" placeholder=\"' + msglist_actionParamDialog['rng.rng310.20'] + '\" class=\"js_compareStr mr5 wp200\" maxlength=\"50\"/>';
    $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);

  } else {
    let compareStr = '';
    $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareStrArea').html(compareStr);
  }

  //比較条件をセット
  let compareCondition;
  let conditionTarget = $('.js_executeCondition[data-index="' + index + '"]').find('.js_executeTargetCombo');
  let conditionTargetVal = conditionTarget.val();
  if (conditionTarget.val().startsWith('B')) {
    conditionTargetVal = conditionTarget.val().substring(1, conditionTarget.val().length)
  } else if (conditionTarget.val().startsWith('M')) {
    conditionTargetVal = conditionTarget.val().substring(1, conditionTarget.val().length)
  }
  let elementIndex = conditionTargetVal.indexOf('.');
  let conditionTargetType = conditionTargetVal.substring(0, elementIndex);
  if (conditionTargetType == TYPE_ENUM.user && conditionTarget.val().startsWith('M')
    || elementVal == PARAMVALUE_ENUM.title
    || elementVal == PARAMVALUE_ENUM.sinseiID) {
    compareCondition
      = '<select class=\"js_compareCondition\">'
      + '<option value=\"' + COMPARETYPE_ENUM.contain + '\">' + msglist_actionParamDialog['rng.rng310.60'] + '</option>'
      + '<option value=\"' + COMPARETYPE_ENUM.notContain + '\">' + msglist_actionParamDialog['rng.rng310.61'] + '</option>'
      + '</select>';
  } else if (elementVal == PARAMVALUE_ENUM.noselect
    || elementVal == PARAMVALUE_ENUM.position) {
    compareCondition
      = '<select class=\"js_compareCondition\">'
      + '<option value=\"' + COMPARETYPE_ENUM.equal + '\">' + msglist_actionParamDialog['rng.rng310.57'] + '</option>'
      + '<option value=\"' + COMPARETYPE_ENUM.notEqual + '\">' + msglist_actionParamDialog['rng.rng310.58'] + '</option>'
      + '</select>';
  } else if (elementVal == PARAMVALUE_ENUM.file) {
    compareCondition
      = '<select class=\"js_compareCondition\">'
      + '<option value=\"' + COMPARETYPE_ENUM.existFile + '\">' + msglist_actionParamDialog['rng.rng310.62'] + '</option>'
      + '<option value=\"' + COMPARETYPE_ENUM.notExistFile + '\">' + msglist_actionParamDialog['rng.rng310.63'] + '</option>'
      + '</select>';
  } else {
    compareCondition = '';
  }
  $('.js_executeCondition[data-index="' + index + '"]').find('.js_compareConditionComboArea').html(compareCondition);
}

//実行条件を追加
function addExecuteCondition() {
  $('.js_executeConditionRadio').removeClass('display_none');
  $('.js_executeConditionList').removeClass('display_none');
  $('.js_executeConditionNotSetMsg').addClass('display_none');
  let newIndex = getNewIndex();
  let executeCondition
    = '<tr class=\"executeCondition js_executeCondition outC_deep bgC_tableCell hp40\" data-index=\"' + newIndex + '\">'
    + '<td class=\"executeConditionHandle js_executeConditionHandle\">'
    + '<img src=\"../common/images/original/icon_sort.png\" class=\"sortIcon js_sortIcon display_none\">'
    + '</td>'
    + '<td>'
    + '<div class=\"js_delMsgAreaForDialog cl_fontWarn\"></div>'
    + '<div class=\"verAlignMid\">'
    + '<span class=\"js_executeTargetComboArea\"></span>'
    + '<span class=\"js_executeTargetHiddenFormIdArea\"></span>'
    + '<span class=\"js_executeTargetDetailComboArea\"></span>'
    + '<span class=\"ml5 mr5\">' + msglist_actionParamDialog['rng.rng310.68'] + '</span>'
    + '<span class=\"js_compareStrArea verAlignMid\"></span>'
    + '<span class=\"js_hiddenCompareStrArea verAlignMid\"></span>'
    + '<span class=\"js_compareConditionComboArea\"></span>'
    + '</div>'
    + '</td>'
    + '<td class=\"wp30\">'
    + '<a href=\"#!\" class=\"js_copyExecuteCondition\">'
    + '<span class=\"tooltips display_n\">' + msglist_actionParamDialog['cmn.fukusha'] + '</span>'
    + '<img class=\"btn_classicImg-display img-18 cursor_p\" src=\"../common/images/classic/icon_copy.png\">'
    + '<img class=\"btn_originalImg-display img-18 cursor_p\" src=\"../common/images/original/icon_copy.png\">'
    + '</a>'
    + '</td>'
    + '<td class=\"wp30\">'
    + '<a href=\"#!\" class=\"js_delExecuteCondition\">'
    + '<span class=\"tooltips display_n\">' + msglist_actionParamDialog['cmn.delete'] + '</span>'
    + '<img class=\"btn_classicImg-display cursor_p\" src=\"../common/images/classic/icon_trash.png\">'
    + '<img class=\"btn_originalImg-display cursor_p\" src=\"../common/images/original/icon_trash.png\">'
    + '</a>'
    + '</td>'
    + '</tr>';
  $('#executeConditionList').append(executeCondition);
  setExecuteTargetCombo(newIndex);
}

//実行条件追加/複写時、新しいインデックスを取得
function getNewIndex() {
  let newIndex = 0;
  $('.js_executeCondition').each(function(index, key) {
    if (newIndex <= $(key).data('index')) {
      newIndex = $(key).data('index') + 1;
    }
  });
  return newIndex;
}

//実行条件を複写
function copyExecuteCondition(index) {
  //行を複写
  let newIndex = getNewIndex();
  let executeCondition = '<tr class=\"executeCondition js_executeCondition outC_deep bgC_tableCell hp40\" data-index=\"' + newIndex + '\">'
  let oldExecuteCondition = $('.js_executeCondition[data-index="' + index + '"]')
  executeCondition += oldExecuteCondition.html();
  executeCondition += '</tr>';
  $('#executeConditionList').append(executeCondition);
  //値をセット
  let newExecuteCondition = $('.js_executeCondition[data-index="' + newIndex + '"]');
  //フォーム要素削除時の警告を非表示
  newExecuteCondition.find('.js_delMsgAreaForDialog').html('');
  newExecuteCondition.find('.js_delMsgAreaForDialog').removeClass('mt5 mb5');
  newExecuteCondition.find('.js_executeTargetCombo').closest('div').removeClass('mb5');
  //条件対象
  let executeTargetVal = oldExecuteCondition.find('.js_executeTargetCombo option:selected').val();
  newExecuteCondition.find('.js_executeTargetCombo').val(String(executeTargetVal));
  //条件対象詳細
  let executeTargetDetailVal = oldExecuteCondition.find('.js_executeTargetDetailCombo option:selected').val();
  newExecuteCondition.find('.js_executeTargetDetailCombo').val(executeTargetDetailVal);
  //比較対象文字列
  oldExecuteCondition.find('.js_compareStr').each(function(compareStrIndex, compareStrKey) {
    newExecuteCondition.find('.js_compareStr').eq(compareStrIndex).val($(compareStrKey).val());
  });
  //比較対象コンボ
  let compareStrComboVal = oldExecuteCondition.find('.js_compareStrCombo option:selected').val();
  newExecuteCondition.find('.js_compareStrCombo').val(compareStrComboVal);
  if (oldExecuteCondition.find('.js_groupCombo').length > 0) {
    let compareStrGroupComboVal = oldExecuteCondition.find('.js_groupCombo option:selected').val();
  newExecuteCondition.find('.js_groupCombo').val(compareStrGroupComboVal);
  }
  //比較条件
  let compareCondition = oldExecuteCondition.find('.js_compareCondition option:selected').val();
  newExecuteCondition.find('.js_compareCondition').val(compareCondition);

  let valueIndex = executeTargetVal.indexOf('.');
  let valueType = executeTargetVal.substring(0, valueIndex);
  //datepickerの宣言
  if (valueType == TYPE_ENUM.date
    || executeTargetVal == PARAMKBN_ENUM.addDate
    || executeTargetVal == PARAMKBN_ENUM.letDate) {

    newExecuteCondition.find('.js_compareStrArea .js_frDatePicker').removeClass('hasDatepicker');
    newExecuteCondition.find('.js_compareStrArea .js_frDatePicker').attr('id', '');
    $('.js_compareStrArea .js_frDatePicker').each(function(dateIndex, dateKey) {
      startDatePicker(dateKey, 0);
    });
  }
  //clockpickerの宣言
  if (valueType == TYPE_ENUM.time
    || executeTargetVal == PARAMKBN_ENUM.addDate
    || executeTargetVal == PARAMKBN_ENUM.letDate) {

    let maxIdNum = 0;
    $('.js_clockpicker').each(function(timeIndex, timeKey) {
      startClockPicker($(timeKey));
      let clockpickerIdIndex = $(timeKey).attr('id').lastIndexOf('_');
      let clockpickerIdNum = $(timeKey).attr('id').substring(clockpickerIdIndex + 1, $(timeKey).attr('id').length);
      if (timeIndex == 0) {
        maxIdNum = clockpickerIdNum;
      } else {
        if (maxIdNum < clockpickerIdNum) {
          maxIdNum = clockpickerIdNum;
        }
      }
    });
    newExecuteCondition.find('.js_compareStrArea .js_clockpicker').attr('id', 'clock_' + (parseInt(maxIdNum) + 1));
    newExecuteCondition.find('.js_compareStrArea label').attr('for', 'clock_' + (parseInt(maxIdNum) + 1));
  }
}

//実行条件を削除
function deleteExecuteCondition(index) {
  $('.js_executeCondition[data-index="' + index + '"]').remove();
  if ($('.js_executeCondition').length <= 0) {
    $('.js_executeConditionNotSetMsg').removeClass('display_none');
    $('.js_executeConditionList').addClass('display_none');
    $('.js_executeConditionRadio').addClass('display_none');
  }
}

//実行条件ヘルプを表示
function dspExecuteConditionHelp() {
  let help = document.getElementById('executeConditionHelp')
  let calcLeft = (parseInt(window.getComputedStyle(help, '::before').width) / 2) + parseInt($('#executeConditionHelp').css('padding')) - (parseInt($('.js_dspExecuteConditionHelp').width()) / 2);
  let top = $('.js_dspExecuteConditionHelp').offset().top - $('#executeConditionHelp').outerHeight() - 20;
  let left = $('.js_dspExecuteConditionHelp').offset().left - calcLeft;
  $('#executeConditionHelp').css({
    'top': top,
    'left': left
  })
  $('#executeConditionHelp').removeClass('visibility-hidden');
}

//実行条件をhiddenで保持
function setActionParamHidden() {
  //アクションパラメータ名
  let actionParamName = $('.js_addActionParamName').val();
  $('.js_hiddenActionParamName').val(actionParamName);
  //実行条件区分
  let conditionType = $('.js_conditionType:checked').val();
  $('.js_hiddenConditionType').val(conditionType);
  //実行条件
  $('#actionParamHiddenArea').html('');
  $('.js_executeCondition').each(function(index, key) {
    //条件対象
    let paramKbn = $(key).find('.js_executeTargetCombo option:selected').val();
    $('#actionParamHiddenArea').append('<input type=\"hidden\" value=\"' + htmlEscape(paramKbn) + '\" name=\"rng310RapCondition[' + index + '].paramKbn\">');
    //フォームID
    if ($(key).find('.js_executeTargetHiddenFormId').length > 0) {
      let formId = $(key).find('.js_executeTargetHiddenFormId').val();
      $('#actionParamHiddenArea').append('<input type=\"hidden\" value=\"' + htmlEscape(formId) + '\" name=\"rng310RapCondition[' + index + '].paramFormId\">');
    }
    //設定値詳細
    let paramValue = $(key).find('.js_executeTargetDetailCombo option:selected').val();
    $('#actionParamHiddenArea').append('<input type=\"hidden\" value=\"' + htmlEscape(paramValue) + '\" name=\"rng310RapCondition[' + index + '].paramValue\">');
    //比較文字列
    let compareTarget = '';
    if ($(key).find('.js_compareStrCombo').length > 0) {
      compareTarget = $(key).find('.js_compareStrCombo option:selected').val();
    } else if ($(key).find('.js_compareStr').length > 0) {
      $(key).find('.js_compareStr').each(function(compareStrIndex, compareStrKey){
        if (compareStrIndex != 0) {
          compareTarget += ' ' + $(compareStrKey).val();
        } else {
          compareTarget += $(compareStrKey).val();
        }
      });
    }
    if (compareTarget != '') {
      $('#actionParamHiddenArea').append('<input type=\"hidden\" value=\"' + htmlEscape(compareTarget) + '\" name=\"rng310RapCondition[' + index + '].compareTarget\">');
    }
    //比較条件
    let compareCondition = $(key).find('.js_compareCondition option:selected').val();
    $('#actionParamHiddenArea').append('<input type=\"hidden\" value=\"' + htmlEscape(compareCondition) + '\" name=\"rng310RapCondition[' + index + '].compareType\">');
  });
}

//フォームIDをhiddenにセット
function setHidenFormIdForActionParamDialog(element) {
  let selectVal = element.find('option:selected').val();
  if (selectVal != PARAMKBN_ENUM.addUser
    && selectVal != PARAMKBN_ENUM.addDate
    && selectVal != PARAMKBN_ENUM.letUser
    && selectVal != PARAMKBN_ENUM.letDate
    && selectVal != PARAMKBN_ENUM.ringiInfo) {
    let index = selectVal.indexOf('.');
    let formId = selectVal.substring(index + 1, selectVal.length);
    element.closest('.js_executeCondition').find('.js_executeTargetHiddenFormIdArea').html('<input type=\"hidden\" value=\"' + htmlEscape(formId) + '\" class=\"js_executeTargetHiddenFormId\">');
  } else {
    element.closest('.js_executeCondition').find('.js_executeTargetHiddenFormIdArea').html('');
  }
}

//決裁後アクション用ファイルに保存されている実行条件を表示
function dspConditionForEdit() {
  $('.js_hiddenConditionParamKbn').each(function() {
    addExecuteCondition();
  });
  $('.js_executeCondition').each(async function(index, key) {
    let paramKbn = $('.js_hiddenConditionParamKbn').eq(index).val();
    let paramFormId = $('.js_hiddenConditionParamFormId').eq(index).val();
    let paramFormType = $('.js_hiddenConditionParamFormTypeStr').eq(index).val();
    let formType;
    if (paramFormType && paramFormType.startsWith('M')) {
      formType = paramFormType.substring(1, paramFormType.length);
    } else {
      formType = paramFormType;
    }
    let paramValue = $('.js_hiddenConditionParamValue').eq(index).val();
    let compareTarget = $('.js_hiddenConditionCompareTarget').eq(index).val();
    let compareType = $('.js_hiddenConditionCompareType').eq(index).val();
    let errorFlg = $('.js_hiddenConditionErrorFlg').eq(index).val();
    let groupSid = $('.js_hiddenConditionCompareTargetGroupSid').eq(index).val();

    if (errorFlg == 'true') {
      //フォーム要素が削除済みの場合
      let delMsg = msglist_actionParamDialog['rng.rng320.23'];
      delMsg += '<br>・' + htmlEscape($('.js_hiddenConditionStr').eq(index).val());
      $(key).find('.js_delMsgAreaForDialog').addClass('mt5 mb5');
      $(key).find('.js_executeTargetCombo').closest('div').addClass('mb5');
      $(key).find('.js_delMsgAreaForDialog').html(delMsg);
    } else {
      if (paramKbn == PARAMKBN_ENUM.form) {
        //フォーム要素
        paramKbn = paramFormType + '.' + paramFormId;
      }
      await isExistElement($(key), '.js_executeTargetCombo');
      $(key).find('.js_executeTargetCombo').val(paramKbn).trigger('change');
      //設定値詳細
      if (paramValue != PARAMVALUE_ENUM.noselect) {
        await isExistElement($(key), '.js_executeTargetDetailCombo');
        $(key).find('.js_executeTargetDetailCombo').val(paramValue).trigger('change');
      }
      //比較対象
      if (paramKbn == PARAMKBN_ENUM.addDate
        || paramKbn == PARAMKBN_ENUM.letDate) {
        //申請日時、最終承認日時
        let compareTargetIndex = compareTarget.indexOf(' ');
        let date = compareTarget.substring(0, compareTargetIndex);
        let time = compareTarget.substring(compareTargetIndex + 1, compareTarget.length);
        $(key).find('.js_frDatePicker').val(date);
        $(key).find('.js_clockpicker').val(time);
      } else if ((formType == TYPE_ENUM.user
        || paramKbn == PARAMKBN_ENUM.addUser
        || paramKbn == PARAMKBN_ENUM.letUser)
        && paramValue == PARAMVALUE_ENUM.noselect) {
        //ユーザ選択、申請者、最終承認者（未選択）
        await isExistElement($(key), '.js_groupCombo option[value="' + groupSid + '"]');
        $(key).find('.js_groupCombo').val(groupSid).trigger('change');
        await isExistElement($(key), '.js_compareStrCombo option[value="' + compareTarget + '"]');
        $(key).find('.js_compareStrCombo').val(compareTarget);
      } else if ((formType == TYPE_ENUM.user
        || paramKbn == PARAMKBN_ENUM.addUser
        || paramKbn == PARAMKBN_ENUM.letUser)
        && paramValue == PARAMVALUE_ENUM.position) {
        //ユーザ選択、申請者、最終承認者（役職）
        await isExistElement($(key), '.js_posCombo option[value="' + compareTarget + '"]');
        $(key).find('.js_posCombo').val(compareTarget);
      } else if (formType == TYPE_ENUM.check
        || formType == TYPE_ENUM.combo
        || formType == TYPE_ENUM.radio
        || formType == TYPE_ENUM.group) {
        //チェックボックス、コンボボックス、ラジオボタン、グループ選択
        await isExistElement($(key), '.js_compareStrCombo');
        $(key).find('.js_compareStrCombo').val(compareTarget);
      } else {
        $(key).find('.js_compareStr').val(compareTarget);
      }
      //比較条件
      $(key).find('.js_compareCondition').val(compareType);
    }
  });
}

//既存の実行条件を複写コンボのレイアウトを修正
function dspCopyConditionCombo() {
  $('.js_existExecuteConditionCombo').addClass('existExecuteConditionCombo cl_linkDef cl_linkHoverChange cursor_p boxshadow_none');
  $('.js_existExecuteConditionCombo').find('option').each(function(index, key) {
    if (index == 0) {
      $(key).attr('hidden', '');
    } else {
      $(key).addClass('cl_fontBody');
    }
  });
}

//既存の実行条件を複写
function copyExistExecuteCondition(element) {

  if (element.val() == '-1' || element.val() == '0') {
    $('.js_existExecuteConditionCombo').val('-1');
  } else {

    let url = getUrl();
    let paramStr = 'CMD=copyCondition'
    paramStr += '&rng310CopyCondition=' + element.val();
    paramStr += '&rng090SelectActionIndex=' + $('input[name="rng090SelectActionIndex"]').val();
    let formJson = $('input[name="rng090templateJSON"]').val();
    paramStr += '&rng090templateJSON=' + formJson;
    paramStr += createParamStr();

    $.ajax({
      url: url,
      type: "POST",
      data: paramStr
    }).done(async function(data) {
      if (data['success']) {
        //実行条件を追加
        addExecuteCondition();

        let formTypeIndex = data['paramKbn'].indexOf('.');
        let formType;
        if (data['paramKbn'].startsWith('M')) {
          formType = data['paramKbn'].substring(1, formTypeIndex);
        } else {
          formType = data['paramKbn'].substring(0, formTypeIndex);
        }
        let copyCondition = $('.js_executeCondition').last();
        await isExistElement(copyCondition, '.js_executeTargetCombo');
        copyCondition.find('.js_executeTargetCombo').val(data['paramKbn']).trigger('change');
        if (data['paramValue'] != PARAMVALUE_ENUM.noselect) {
          await isExistElement(copyCondition, '.js_executeTargetDetailCombo');
          copyCondition.find('.js_executeTargetDetailCombo').val(data['paramValue']).trigger('change');
        }
        //比較対象
        if (data['paramKbn'] == PARAMKBN_ENUM.addDate
          || data['paramKbn'] == PARAMKBN_ENUM.letDate) {
          //申請日時、最終承認日時
          let compareTargetIndex = data['compareTarget'].indexOf(' ');
          let date = data['compareTarget'].substring(0, compareTargetIndex);
          let time = data['compareTarget'].substring(compareTargetIndex + 1, data['compareTarget'].length);
          copyCondition.find('.js_frDatePicker').val(date);
          copyCondition.find('.js_clockpicker').val(time);
        } else if ((formType == TYPE_ENUM.user
          || data['paramKbn'] == PARAMKBN_ENUM.addUser
          || data['paramKbn'] == PARAMKBN_ENUM.letUser)
          && data['paramValue'] == PARAMVALUE_ENUM.noselect) {
          //ユーザ選択、申請者、最終承認者（未選択）
          await isExistElement(copyCondition, '.js_groupCombo option[value="' + data['compareTargetGroupSid'] + '"]');
          copyCondition.find('.js_groupCombo').val(data['compareTargetGroupSid']).trigger('change');
          await isExistElement(copyCondition, '.js_compareStrCombo option[value="' + data['compareTarget'] + '"]');
          copyCondition.find('.js_compareStrCombo').val(data['compareTarget']);
        } else if ((formType == TYPE_ENUM.user
          || data['paramKbn'] == PARAMKBN_ENUM.addUser
          || data['paramKbn'] == PARAMKBN_ENUM.letUser)
          && data['paramValue'] == PARAMVALUE_ENUM.position) {
          //ユーザ選択、申請者、最終承認者（役職）
          await isExistElement(copyCondition, '.js_posCombo option[value="' + data['compareTarget'] + '"]');
          copyCondition.find('.js_compareStrCombo').val(data['compareTarget']);
        } else if (formType == TYPE_ENUM.check
          || formType == TYPE_ENUM.combo
          || formType == TYPE_ENUM.radio
          || formType == TYPE_ENUM.group) {
          //チェックボックス、コンボボックス、ラジオボタン、グループ選択
          await isExistElement(copyCondition, '.js_compareStrCombo');
          copyCondition.find('.js_compareStrCombo').val(data['compareTarget']);
        } else {
          copyCondition.find('.js_compareStr').val(data['compareTarget']);
        }
        copyCondition.find('.js_compareCondition').val(data['compareType']);
        $('.js_existExecuteConditionCombo').val('-1');
      } else {
        //決裁後アクション用ファイルの読み込みに失敗
        let errorMsg = '<div class=\"textError\">' + msglist_actionParamDialog['cmn.error.access'] + '</div>'
        $('.js_errorMsgAreaForDialog').html(errorMsg);
        $('.js_existExecuteConditionCombo').val('-1');
      }
    }).fail(function() {
      alert(msglist_actionParamDialog['failed.communication']);
    })
  }
}

//指定した要素の描画の完了を判定する
async function isExistElement(element, className) {
  let checkFlg = true;
  let i = 0;
  while (checkFlg) {
    await new Promise(resolve => setTimeout(resolve, 50));
    if (element.find(className) && element.find(className).length > 0) {
      checkFlg = false;
      return true;
    }
    i++;
  }
}