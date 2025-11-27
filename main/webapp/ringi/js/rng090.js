var ringiTemplatePreview;

/**
 * buttonPushを上書き
 * @param cmd
 * @returns {Boolean}
 */
function buttonPush(cmd) {
	$('input[name="CMD"]').val(cmd);
	$('form[name="rng090Form"]').submit();
	return false;
}

/**
 * 経路選択処理
 */
function selectChannelTemplate(rctSid, kbn, usrSid) {
	$('#keirotemplateselect').dialog('close');

	$('input[name="rng090KeiroTemplateSid"]').val(rctSid);
	$('input[name="rng090KeiroTemplateUsrSid"]').val(usrSid);

	//経路設定部の再読み込み
	loadKeiro();
	return false;
}
function loadKeiro() {
	var param = new Array();
	param.push({
		name:"CMD",
		value:"loadKeiro",
	});
	param.push({
		name:'rngTemplateMode',
		value:$('input[name="rngTemplateMode"]').val()
	});
	param.push({
		name:'rng090KeiroTemplateSid',
		value:$('input[name="rng090KeiroTemplateSid"]').val()
	});
	param.push({
		name:'rng090KeiroTemplateUsrSid',
		value:$('input[name="rng090KeiroTemplateUsrSid"]').val()
	});
	param.push({
		name:'rng090useKeiroTemplate',
		value:$('input[name="rng090useKeiroTemplate"]:checked').val()
	});

	//経路設定HIDDENパラメータ生成
	$( '#keiro_maker' ).gs_dandd_select({cmd:'getAllParam',
		dropArea:$('.dropArea'),
		func: function(ret) {
			$.each(ret, function() {
				param.push({
					name:'rng090keiro.' + this.name,
					value:this.value
				});
			});
		}
	});
	$('div[name="rng090keiro"]').load("../ringi/rng090.do", param);
}

function openRingiTemplatePreview() {
	var winLocation=0;
	var winStatus=0;
	var winToolbar=0;
	var winScrollbars=1;
	var winTitle = "ringiTemplatePreview";
	var opt = 'location=' + winLocation + ', status=' + winStatus + ', toolbar=' + winToolbar + ', scrollbars=' + winScrollbars;
	var popHtml = '../ringi/rng290.do';

	ringiTemplatePreview = window.open('', winTitle, opt);

	// form作成
	var form = document.createElement("form");
	form.target = winTitle;  // target属性 => どこにアクションURLを開くかを指定
	form.method = "post";    // POST通信設定。
	form.action = popHtml;   //遷移先のAction

	var submitType;

	//input type=’hidden’ を作成し、送信データを設定。
	submitType = document.createElement("input");
	var rngTitle = $('input[name="rng090rngTitle"]').val();
	submitType.setAttribute("name", "rng290rngTitle");
	submitType.setAttribute("type", "hidden");
	submitType.setAttribute("value", rngTitle);
	form.appendChild(submitType);

	var ringiIdSid = $('input[name="rng090idSid"]').val();
	submitType = document.createElement("input");
	submitType.setAttribute("name", "rng290idSid");
	submitType.setAttribute("type", "hidden");
	submitType.setAttribute("value", ringiIdSid);
	form.appendChild(submitType);

	var idPrefManual = $('input[name="rng090idPrefManual"]:checked').val();
	submitType = document.createElement("input");
	submitType.setAttribute("name", "rng290idPrefManual");
	submitType.setAttribute("type", "hidden");
	submitType.setAttribute("value", idPrefManual);
	form.appendChild(submitType);

	if ($('input[name="rng090DspComment"]').length > 0) {
		var apiComment = $('input[name="rng090DspComment"]').val();
		submitType = document.createElement("input");
		submitType.setAttribute("name", "rng020ApiComment");
		submitType.setAttribute("type", "hidden");
		submitType.setAttribute("value", apiComment);
		form.appendChild(submitType);
	}


	var fileList = $('select[name="rng090files"]').children("option");
	var filesStr = "";
	if (fileList != null && fileList.length > 0) {
		var fileKey  = "";
		var fileName = "";
		fileList.each(function(index, option) {
			if (index > 0) {
				filesStr += ",";
			}
			filesStr += encodeURIComponent($(option).text());
		});
	}
	submitType = document.createElement("input");
	submitType.setAttribute("name", "rng290files");
	submitType.setAttribute("type", "hidden");
	submitType.setAttribute("value", filesStr);
	form.appendChild(submitType);

	// 共有テンプレート＋新バージョンテンプレート
	if ($('#form_builder').data('outputJSON')) {
		var postJsonStr = $('#form_builder').data('outputJSON')();
		submitType = document.createElement("input");
		submitType.setAttribute("name", "rng290templateJSON");
		submitType.setAttribute("type", "hidden");
		submitType.setAttribute("value", postJsonStr);
		form.appendChild(submitType);
	}
	// 個人テンプレートor旧バージョンテンプレート
	if ($('textarea[name="rng090content"]').length) {
		var content = $('textarea[name="rng090content"]').val();
		submitType = document.createElement("input");
		submitType.setAttribute("name", "rng290content");
		submitType.setAttribute("type", "hidden");
		submitType.setAttribute("value", content);
		form.appendChild(submitType);
	}

	//経路設定HIDDENパラメータ生成
	$( '#keiro_maker').gs_dandd_select({cmd:'getAllParam',
		dropArea:$('.dropArea'),
		func: function(ret) {
			$.each(ret, function() {
				submitType = document.createElement("input");
				submitType.setAttribute("name", "rng290keiro." + this.name);
				submitType.setAttribute("type", "hidden");
				submitType.setAttribute("value", this.value);
				form.appendChild(submitType);
			});
		}
	});

	//決裁後アクションパラメータ生成
	$("input[name^='rng090ApiMdl[']").each(function(){
		submitType = document.createElement("input");
		submitType.setAttribute("name", $(this).attr('name'));
		submitType.setAttribute("type", "hidden");
		submitType.setAttribute("value", $(this).val());
		form.appendChild(submitType);
	});

	//form に作成したinput要素を追加。
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(form); //一旦domに書き出し
	form.submit();          //送信
	body.removeChild(form); //送信後に作成したform要素の削除

}

function closeRingiTemplatePreview() {
	if(ringiTemplatePreview != null){
		ringiTemplatePreview.close();
	}
}

$(function() {
	$(document).on({
		mouseenter:function (e) {
			$(this).children().addClass("list_content-on");
			$(this).prev().children().addClass("list_content-topBorder");
		},
		mouseleave:function (e) {
			$(this).children().removeClass("list_content-on");
			$(this).prev().children().removeClass("list_content-topBorder");
		}
	}, '.js_listHover');
//-------内部関数定義部---------------------------
//-------内部関数定義部 終了 ----------------------

//-------onload処理-----------------------------
	function createHiddenParam() {
		// パラメータ用のdiv要素生成
		var paramElm = $('<div>', { id:'rng090FormParamElement'});
		$('#rng090FormParamElement').remove(); // 既に生成済みの場合、一旦削除(ダブルクリック対策)

		if ($('#form_builder').data('outputJSON')) {
			//フォーム設定JSON生成
			var postJsonStr = $('#form_builder').data('outputJSON')();
			var hidden = $('<input type=\"hidden\" name=\"rng090templateJSON\"></input>')
			hidden.val(postJsonStr);
			paramElm.append(hidden);
		}

		//経路設定HIDDENパラメータ生成
		$( '#keiro_maker' ).gs_dandd_select({cmd:'getAllParam',
			dropArea:$('.dropArea'),
			func: function(ret) {
				$.each(ret, function() {
					paramElm.append($('<input type=\"hidden\" name=\"rng090keiro.' + this.name +'\" value=\"' + this.value +'\"></input>'));
				});
			}
		});
		$('form[name="rng090Form"]').append(paramElm); // フォーム要素へ追加
	};

	$('form[name="rng090Form"]').submit(function () {
		createHiddenParam();
		return true;
	});

	//稟議ID選択ボタンイベントを設定
	$('*[name=rng090idSelect]').click(function() {
		$('form:first').serializeArray()
		var param = new Array();
		param.push({
			name:"CMD",
			value:"loadIDList"
		});

		$('#idselect').load(
			'../ringi/rng090.do',
			param,
			function() {
				var buttons = {};
				buttons[msglist_rng090['cmn.cancel']] = function() {
					$('#idselect').dialog('close'); };
				$(".js_listClick").on("click", function(){
					$('#idselect').dialog('close');
					var id = $(this).parent().attr("name");
					$('input[name="rng090idSid"]').val(id);
					buttonPush('idReload')
					return false;
				});
				$('#idselect').dialog({
					autoOpen: true,  // hide dialog
					bgiframe: true,   // for IE6
					resizable: false,
					modal: true,
					//height:'384' ,
					//width: '700',
					height: "auto" ,
					width: "auto",
					overflow: "auto",
					overlay: {
							backgroundColor: '#000000',
							opacity: 0.5
					},
					buttons: buttons,
					open: function() {      // キャンセルボタンにフォーカスをあてる

							$( this ).siblings('.ui-dialog-buttonpane').find('button:eq(0)').focus();
					}
				});
			}
		)
	});

	//経路テンプレート選択ボタンイベントを設定
	$('*[name=rng090KeiroTemplateSelect]').click(function() {
		$('#keirotemplateselect').load(
			'../ringi/rng020.do',
			[{
				name:"CMD",
				value:"rctSelectDialog"
			}],
			function() {
				var buttons = {};
				buttons[msglist_rng090['cmn.cancel']] = function() {
					$('#keirotemplateselect').dialog('close');
				};
				$('#keirotemplateselect').dialog({
					autoOpen: true,  // hide dialog
					bgiframe: true,   // for IE6
					resizable: false,
					modal: true,
					//height:'384' ,
					//width: '700',
					height:"auto",
					width:"auto",
					overflow: "auto",
					overlay: {
						backgroundColor: '#000000',
						opacity: 0.5
					},
					buttons: buttons,
					open: function() {      // キャンセルボタンにフォーカスをあてる
						$( this ).siblings('.ui-dialog-buttonpane').find('button:eq(0)').focus();
					}
				}
			);
			//経路テンプレートダイアログ切り替えボタンイベントを設定
			$('#keirotemplateselect > div.tab > div.share').click(function () {
				$('#keirotemplateselect').removeClass("person");
				$('#keirotemplateselect').addClass("share");
			});
			$('#keirotemplateselect > div.tab > div.person').click(function () {
				$('#keirotemplateselect').removeClass("share");
				$('#keirotemplateselect').addClass("person");
			});
		});
	});

	//経路テンプレート使用ラジオ選択イベントを設定
	$('input[name=rng090useKeiroTemplate]').change(function() {
		//経路設定部の再読み込み
		loadKeiro();
	});


	//決裁後アクション
	/** ラジオ切り替えイベント */
	function selApiConnectUse() {
		if ($('input[name="rng090useApi"]:checked').val() == $('input.js_rng090useApi-use').val()) {
			$('.js_apiconnect').removeClass('display_none');
		}
		if ($('input[name="rng090useApi"]:checked').val() == $('input.js_rng090useApi-notuse').val()) {
			$('.js_apiconnect').addClass('display_none');
		}
	}

	$('input[name="rng090useApi"]').on('change', selApiConnectUse);
	selApiConnectUse();

	/** API連携dialogController*/
	function ApiConnectDialogControler() {
			this.dialog = $('.js_apiconnectAddDialog');
			$('.js_apiconnectAddDialog').data('controler', this);
			this.apiParamEditFlg = false;

	};
	var apiConnectDialogControler = new ApiConnectDialogControler();
	var senisakiGamen = 'list';
	//決裁後アクション追加ボタン
	$('.js_apiconnect_addBtn').on('click', function() {
		createHiddenParam();
		var maxindex = $('.js_apiconnect').attr('data-maxindex');
		if (!maxindex) {
			maxindex = 0;
		} else {
			maxindex++;
		}
		var param = {
			name:"rng090ApiMdl[" + maxindex + "].cacSid",
			value:'-1'
		};
		senisakiGamen = 'list';
		apiConnectDialogControler.openApilistDialog(param);
	});

	//決裁後アクション編集リンク
	$('.js_apiconnect').on('click','.js_apiconnect_cell .js_editcell', function() {
		createHiddenParam();
		senisakiGamen = 'connect';
		apiConnectDialogControler.openApiconnectDialog($(this).parent().find(':input').serializeArray());
	});


	/** 表示dialogコントロール
	 * 描画更新の制御
	 * 更新範囲内容からdspIdを取り出し、dspIdによって画面描画をコントロールする
	 */
	ApiConnectDialogControler.prototype.control = function (view) {
		var controler = this;
		var dialog = this.dialog;
		if ($(view).find('[data-apiconnect_dspid]').length <= 0) {
				var data = $(view).html();
				$('html').html('');
				$('body').append(data);
				return false;
		}
		var dspId = $(view).find('[data-apiconnect_dspid]').data('apiconnect_dspid');
		var selectSubForm = $(view).find('[data-apiconnect_selectsubform]').data('apiconnect_selectsubform');

		switch (dspId) {
			case 'rng090_apilist':
				var data = $(view).html();
				dialog.find('form').html('');
				dialog.find('form').append(data);
				return this.dspApilistDialog(selectSubForm);
			case 'rng090_apiconnect':
				var data = $(view).html();
				dialog.find('form').html('');
				dialog.find('form').append(data);
				return this.dspApiconnectDialog(selectSubForm);
			case 'rng090_apiconnect_result': return this.dspApiconnectResult(selectSubForm);
			case 'rng090_apiconnect_param': return this.dspApiconnectParamEditDialog(selectSubForm, 'init');
			case 'rng090_apiconnect_param_child': return this.inputInit(view);
			case 'rng090_apiconnect_param_cond': return this.inputInit(view);
		}
	}

	/** API選択ダイアログ描画変更*/
	ApiConnectDialogControler.prototype.openApilistDialog = function (editParam) {
		var controler = this;
		var dialog = this.dialog;
		var param = [{
			name:"CMD",
			value:"dialogPrefApiList"
		},
		{
			name:"rng090templateJSON",
			value:$('input[name="rng090templateJSON"]').val()
		},];
		param = param.concat(editParam)

		$(dialog).load(
			'../ringi/rng090.do',
			param,
			function () {
				controler.control(this);
			}
		);
	}

	/** API選択ダイアログ描画変更*/
	ApiConnectDialogControler.prototype.openApiconnectDialog = function (editParam) {
		var controler = this;
		var dialog = this.dialog;
		var param = [{
			name:"CMD",
			value:"dialogPrefApiConnect"
		},
		{
			name:"rng090templateJSON",
			value:$('input[name="rng090templateJSON"]').val()
		},];
		param = param.concat(editParam)

		$(dialog).load(
			'../ringi/rng090.do',
			param,
			function () {
				controler.control(this);
			}
		);
	}

	/** Api連携dialog内描画処理 */
	ApiConnectDialogControler.prototype.dspApilistDialog = function() {
		var controler = this;
		var dialog = this.dialog;

		//API選択値変更イベント
		function changeCacSid(cacsid) {
			createHiddenParam();
			var maxindex = $('.js_apiconnect').attr('data-maxindex');
			if (!maxindex) {
				maxindex = 0;
			} else {
				maxindex++;
			}

			var param = {
				name:"rng090ApiMdl[" + maxindex + "].cacSid",
				value:cacsid
			};
			apiConnectDialogControler.openApiconnectDialog(param);
		}

		$('.js_apiListSelect').on('click', function() {
			changeCacSid($(this).attr('id'));
		});

		var buttons = {};
		buttons[msglist_rng090['cmn.close']] = function() {
			$('.js_apiconnectAddDialog').dialog('close');
		};
		var title = '';
		if (this.dialog.find('[data-apiconnect_title]').length > 0) {
			title = this.dialog.find('[data-apiconnect_title]').data('apiconnect_title');
		}

		this.dialog = $(dialog).dialog({
				autoOpen: true,  // hide dialog
				bgiframe: true,   // for IE6
				resizable: false,
				modal: true,
				title: title,
				height:"auto",
				width:"1000px",
				overflow: "auto",
				overlay: {
					backgroundColor: '#000000',
					opacity: 0.5
				},
				buttons: buttons,
				open: function() {      // キャンセルボタンにフォーカスをあてる
					$( this ).siblings('.ui-dialog-buttonpane').find('button:eq(0)').focus();
				},
				close:function() {
					$( this ).children().remove();
				}
		});
	}

	/** Api連携dialog内描画処理 */
	ApiConnectDialogControler.prototype.dspApiconnectDialog = function() {
		var controler = this;
		var dialog = this.dialog;

		//依存表リスト選択
		dialog.find('.js_listFsIdSel').on('change', function () {
			controler.openApiconnectDialog($(this.form).serializeArray());
		});

		var buttons = {};

		buttons[msglist_rng090['cmn.close']] = function() {
			if (!controler.apiParamEditFlg) {
				controler.commitApiconnectDialog();
				$( dialog ).dialog('close')
				return true;
			}
			controler.closeKakuninParamEdit(function() {
				controler.diselectApiconnectParamEditDialog();
				controler.commitApiconnectDialog();
				$( dialog ).dialog('close');
			});
		};

		var title = '';
		if (this.dialog.find('[data-apiconnect_title]').length > 0) {
			title = this.dialog.find('[data-apiconnect_title]').data('apiconnect_title');
		}

		controler.diselectApiconnectParamEditDialog();

		this.dialog = $(dialog).dialog({
			autoOpen: true,  // hide dialog
			bgiframe: true,   // for IE6
			resizable: false,
			modal: true,
			title: title,
			height:"700",
			width:"1000",
			overflow: "auto",
			overlay: {
				backgroundColor: '#000000',
				opacity: 0.5
			},
			buttons: buttons,
			open: function() {      // キャンセルボタンにフォーカスをあてる
				$( this ).siblings('.ui-dialog-buttonpane').find('button:eq(0)').focus();
			},
			close:function() {
				$( this ).children().remove();
			}
		});
	}

	ApiConnectDialogControler.prototype.closeKakuninParamEdit = function(funcCloseOk) {
		var buttons = {};
		buttons[msglist_rng090['mobile.13']] = function() {
			$('#paramEditClose').dialog('close');
			funcCloseOk.call(this);
		};

		buttons[msglist_rng090['mobile.14']] = function() {
			$('#paramEditClose').dialog('close');
		};
		$('#paramEditClose').dialog({
			autoOpen: true,  // hide dialog
			bgiframe: true,   // for IE6
			resizable: false,
			modal: true,
			dialogClass:'dialog_button',
			height: 200,
			width: '400',
			overflow: 'auto',
			overlay: {
				backgroundColor: '#FF0000',
				opacity: 0.5
			},
			buttons: buttons
		});
	}

	//Api連携 パラメータ選択イベント
	ApiConnectDialogControler.prototype.selectApiconnectParamEditDialog = function() {
		var controler = this;
		var dialog = this.dialog;
		this.apiParamEditFlg = true;
		dialog.find('.js_paramPane').subform();
		dialog.find('select[name$="racListFsid"]').prop('disabled', true);

		dialog.find('.js_paramSelectMenu').prop('disabled', true);
		dialog.find('.js_paramSelectMenu').addClass('bgC_gray');
		dialog.find('.js_paramSelectMenu').find('.js_rngApiConnectConfParam').removeClass('rngApiConnectConfParam-select');
		dialog.find('.js_paramSelectMenu').find('input:checked').parent().parent().addClass('rngApiConnectConfParam-select');
	}

	//Api連携 パラメータ選択解除
	ApiConnectDialogControler.prototype.diselectApiconnectParamEditDialog = function() {
		var controler = this;
		var dialog = this.dialog;
		this.apiParamEditFlg = false;
		dialog.find('select[name$="racListFsid"]').prop('disabled', false);
		dialog.find('.js_paramSelectMenu').prop('disabled', false);
		dialog.find('.js_paramSelectMenu').removeClass('bgC_gray');
		dialog.find('.js_paramSelectMenu').find('.js_rngApiConnectConfParam').removeClass('rngApiConnectConfParam-select');
		dialog.find('input[name="selectSubForm"]:checked').prop('checked' , false);
		dialog.find('.js_paramPane').text('');
	}

	/** Api連携dialog 確定処理*/
	ApiConnectDialogControler.prototype.commitApiconnectDialog = function() {
		var controler = this;
		var dialog = this.dialog;
		createHiddenParam();
		var param = [{
			name:"CMD",
			value:"commitPrefApiConnect"
		},
		{
			name:"rng090templateJSON",
			value:$('input[name="rng090templateJSON"]').val()
		}];
		param = param.concat(
			$(dialog).find('form').serializeArray()
		);

		$(dialog).load(
			'../ringi/rng090.do',
			param,
			function () {
				controler.control(this);
			}
		);
	}

	/** Api連携dialog 確定表示*/
	ApiConnectDialogControler.prototype.dspApiconnectResult = function() {
		var controler = this;
		var dialog = this.dialog;
		//commit成功
		var data = this.dialog.find('.js_apiconnect_cell');
		var maxindex = $('.js_apiconnect').attr('data-maxindex');
		if (maxindex === undefined) {
			maxindex = 0;
		}
		var index = data.data('index');
		if (maxindex < index) {
			maxindex = index;
		}
		var rep = $('.js_apiconnect').find('.js_apiconnect_cell[data-index="' + index + '"]');
		if (rep.length > 0) {
			$('.js_apiconnect').find('.js_apiconnect_cell[data-index="' + index + '"]').replaceWith(data);
		} else {
			$('.js_apiconnect').append(data);
		}
		$('.js_apiconnect').attr('data-maxindex', index);

		$('.js_apiconnectAddDialog').dialog('close');
		return true;
	}

	/** Api連携dialog内 パラメータ詳細設定描画処理 */
	ApiConnectDialogControler.prototype.dspApiconnectParamEditDialog = function(selectSubForm, init) {
		var controler = this;
		var dialog = this.dialog;
		var editParam =  this.dialog.find('form').serializeArray()
		var buttons = {};

		dialog.find('.js_param_okbtn').on('click', function() {
			controler.commitApiconnectParamEditDialog(selectSubForm);
		});
		dialog.find('.js_param_ngbtn').on('click', function() {
			controler.diselectApiconnectParamEditDialog();
		});

		controler.cloneInitFunc(dialog.find('.js_paramPane').children().clonebtn());
		controler.subformInitFunc(dialog.find('.js_paramPane').children().subform({cmd:'init'}));
		controler.inputInit();

		if (init) {
			//ワーニング文字列の表示
			var errmsg = dialog.find('input[name="selectSubForm"]:checked + div > span[data-errmsg]');
			if (errmsg.length > 0) {
				$('<div></div>').addClass('textError').prependTo(dialog.find('.js_paramPane > fieldset'))
				.html(errmsg.data('errmsg'));
			}
		}
	};

	//Api連携 パラメータ詳細設定確定表示
	ApiConnectDialogControler.prototype.commitApiconnectParamEditDialog = function(selectSubForm) {
		var controler = this;
		var dialog = this.dialog;

		var param = [{
			name:"CMD",
			value:"commitPrefApiConnectParam"
		},
		{
			name:"rng090templateJSON",
			value:$('input[name="rng090templateJSON"]').val()
		},
		{
			name:'selectSubForm',
			value:selectSubForm
		}];
		param = param.concat(
			$(dialog).find('form').serializeArray()
		);

		$.ajax({
			async: true,
			url:  '../ringi/rng090.do',
			type: "post",
			data: param
		}).done(function( data ) {

			var dspId = $('<span></span>').html(data).find('[data-apiconnect_dspid]').data('apiconnect_dspid');
			if (dspId == 'rng090_apiconnect_param') {
				dialog.find('.js_paramPane').html(data);
				var selectSubForm = dialog.find('.js_paramPane').find('[data-apiconnect_selectsubform]').data('apiconnect_selectsubform');
				controler.dspApiconnectParamEditDialog(selectSubForm);
				return;
			}
			dialog.html(data);
			controler.control(dialog);
		});
	}

	ApiConnectDialogControler.prototype.subformInitFunc = function (form, selectSubForm) {
		//クローン用テンプレートを除外
		form = form.filter(function () {
			return ($(this).parents('[data-clonebtn_init]').length == 0)
		});

		var controler = this;
		var param = [
									{
										name:'rng090templateJSON',
										value:$('input[name="rng090templateJSON"]').val()
									}
								];
		if (selectSubForm) {
			param = param.concat([
				{
					name:'selectSubForm',
					value:selectSubForm
				}
			])
		}

		return form.subform({
			param:param,
			onloaded: function() {
				controler.control(this);
			}
		});
	}

	ApiConnectDialogControler.prototype.cloneInitFunc =  function (form) {
		form = form.filter(function () {
			return ($(this).parents('[data-clonebtn_init]').length == 0)
		});
		var controler = this;
		return form.clonebtn({
			param:[
							{
								name:'rng090templateJSON',
								value:$('input[name="rng090templateJSON"]').val()
							}
						],
			oncloned: function (clonedname) {
				var selectSubForm = clonedname;
				//全グループから選択ボタン・グループ選択ボタンの非表示
				$(this).find('.js_userSelect_btn, .js_groupSelect_btn').addClass('display_none');
				controler.cloneInitFunc($(this).clonebtn());
				controler.subformInitFunc($(this).subform({cmd:'init'}), selectSubForm).subform();
			}
		});
	}

	ApiConnectDialogControler.prototype.inputInit = function (view) {
		var controler = this;
		var dialog = this.dialog;

		controler.cloneInitFunc($(view).children().clonebtn());
		controler.subformInitFunc($(view).children().subform({cmd:'init'}));

		//全グループから選択ボタン・グループ選択ボタンの非表示
		$(view).find('.js_userSelect_btn, .js_groupSelect_btn').addClass('display_none');
		$(view).find('.js_datepicker').datepicker({
			showAnim: 'blind',
			changeMonth: true,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			showButtonPanel: true,
			dateFormat:'yy/mm/dd',
			onSelect: function( selectedDate ) {
				if (typeof $(this).data('onselect') === 'function') {
					$(this).data('onselect').call(this);
				}
			}
		});

		var choices = ["00","10","20","30","40","50"];
		$.each($(view).find('.js_clockpicker'), function() {
			var targetInput = $(this);
			targetInput.clockpicker({
				placement: 'bottom',
				align: 'left',
				autoclose: true,
				afterShow: function() {
					$('.clockpicker-span-minutes').text(targetInput.val().split(":")[1]);
					$('.clockpicker-span-hours').text(targetInput.val().split(":")[0]);
				},
				afterHourSelect: function() {
					targetInput.val(targetInput.data('clockpicker').spanHours.text() + ":" + targetInput.data('clockpicker').spanMinutes.text());
				},
				afterDone: function(){
					$('.clockpicker-span-hours').text("");
					$('.clockpicker-span-minutes').text("");
				}
			});
		});

		controler.calcParamSample();
	}

	//設定値サンプルの生成
	ApiConnectDialogControler.prototype.calcParamSample = function () {
		var controler = this;
		var dialog = this.dialog;

		var paramName = dialog.find('[data-apiconnect_captitle]').data('apiconnect_captitle');
		var rapJoin = dialog.find('[name$="rapChildJoin"]:checked').val();
		var contentType = dialog.find('[data-apiconnect_cactype]').data('apiconnect_cactype');

		dialog.find('.js_paramSample').children().remove();
		var value = [];
		dialog.find('.js_setting')
		.filter(function() {
			return $(this).closest('fieldset').not(':disabled').length == 1;
		})
		.filter(function() {
			return $(this).find('.js_sampleOutput:checked').length == 1;
		})
		.each(function () {
			var racType = $(this).find('.js_racType option:selected').val();
			var formType = $(this).find('.js_racType option:selected').data('formtype');
			if (racType == "FT1") {
				//手入力
				value = value.concat($(this).find('.js_racManual').val())
			} else if (racType == "FT6") {
				//タイトル
				value = value.concat("稟議タイトル")
			} else if (formType == "label") {
				value = value.concat("コメント")

			} else if (formType == "textbox") {
				value = value.concat("入力値")

			} else if (formType == "textarea") {
				value = value.concat("入力値")

			} else if (formType == "datetime") {
				var selectVal = $(this).find('[name$=\"rapFormater\"]').val();
				value = value.concat(getDateParamSampleMessage(selectVal));

			} else if (formType == "date") {
				var selectVal = $(this).find('[name$=\"rapFormater\"]').val();
				value = value.concat(getDateParamSampleMessage(selectVal));

			} else if (formType == "time") {
				var selectVal = $(this).find('[name$=\"rapFormater\"]').val();
				value = value.concat(getDateParamSampleMessage(selectVal));
			} else if (formType == "number") {
				value = value.concat("入力値")

			} else if (formType == "radio") {
				value = value.concat("選択値")

			} else if (formType == "combo") {
				value = value.concat("選択値")

			} else if (formType == "check") {
				value = value.concat("選択値1")
				value = value.concat("選択値2")

			} else if (formType == "sum") {
				value = value.concat("自動計算結果")

			} else if (formType == "calc") {
				value = value.concat("自動計算結果")

			} else if (formType == 'user') {
				//申請ユーザ
				var selectVal = $(this).find('[name$=\"rapFormater\"]').val();
				value = value.concat(getUserParamSampleMessage(selectVal));
			} else if (formType == "group") {
				//指定グループ
				var selectVal = $(this).find('[name$=\"rapFormater\"]').val();
				if (selectVal == 201) { value = value.concat("groupId"); }
				else if (selectVal == 202) { value = value.concat("札幌本社"); }
			} else if (formType == 'file') {
				if (contentType == 'MLT') {
					value =value.concat("ファイル");
				}
			}
		});
		var sampleMessage = getSample(paramName, value, rapJoin, contentType);

		dialog.find('.js_paramSample').append($('<span></span>').html($('<span></span>').text(sampleMessage).html().replace(/[ ]/g, '&nbsp;').replace(/[\n]/g, '<br />')));
	}

	//表示コメントにプレースホルダーを設定
	setPlaceholder();
	//連携APIをソート
	sortRenkeiApi();
	//使用不可連携APIの背景色を設定
	setRenkeiApiDisable();
	//使用する/しない時の背景色を設定
	$('.js_useKbnToggle').each(function() {
		setApiConnectBgc($(this));
	});
	$('.js_useKbnToggle').on('change', function(){
		setApiConnectBgc($(this));
		document.forms[0].CMD.value='changeUseKbn';
		document.forms[0].rng090SelectActionIndex.value=$(this).closest('.js_editRenkeiApi').data('index');
		document.forms[0].rng090SelectActionUseKbn.value=$(this).prop('checked');
		let paramStr = $('form[name="rng090Form"]').serialize();
		$.ajax({
			async: true,
			url:  '../ringi/rng090.do',
			type: "post",
			data: paramStr
		}).done(function( data ) {
			document.forms[0].rng090SelectActionIndex.value="-1";
			document.forms[0].rng090SelectActionUseKbn.value="";
		});
	});

	//連携API削除確認ダイアログ表示
	$('.js_renkeiApiDeleteIcon').on('click', function () {
		let content = $(this).closest('.js_selectedRenkeiApi');
		let delApiName = $(this).closest('.js_selectedRenkeiApi').data('apiname');
		let index = $(this).closest('.js_selectedRenkeiApi').data('index');
		$('.js_delApiNameArea').text('・' + delApiName);
		$('#renkeiApiDelKakuninPop').dialog({
			autoOpen: true,  // hide dialog
			bgiframe: true,   // for IE6
			resizable: false,
			modal: true,
			dialogClass:'dialog_button',
			width: '500',
			overflow: 'auto',
			title: msglist_rng090['cmn.delete.check'],
			overlay: {
				backgroundColor: '#FF0000',
				opacity: 0.5
			},
			buttons: {
				OK: function() {
					content.remove();
					$("form").append("<input type=\"hidden\" name=\"rng090RemoveActionIndex\" value=\"" + index + "\" />");
					$(this).dialog('close');
				},
				キャンセル: function() {
					$(this).dialog('close');
				}
			}
		});
	});

	//連携API選択ダイアログ表示
	$('.js_addRenkeiApi').on("click", function() {
	$('#selectApiPop').dialog({
			autoOpen: true,  // hide dialog
			bgiframe: true,   // for IE6
			resizable: false,
			modal: true,
			dialogClass:'dialog_button',
			maxHeight: 500,
			minHeight: 150,
			width: '700',
			overflow: 'auto',
			title: msglist_rng090['rng.rng090.83'],
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

	//連携APIをクリック
	$('.js_editRenkeiApi').on('click', function(e) {
		if (!$(e.target).closest('.js_renkeiApiSortHandle, .toggle-button, .renkeiApiDeleteArea').length) {
			createHiddenParam();
			document.forms[0].CMD.value = 'editAction';
			document.forms[0].rng090SelectActionIndex.value = $(this).data('index');
			document.forms[0].rng090ActionParamOperation.value = "1";
			document.forms[0].submit();
		}
	});

	//連携API追加ダイアログで連携APIを選択
	$('.js_selectRenkeiApi').on('click', function(){
		createHiddenParam();
		document.forms[0].CMD.value = 'addAction';
		document.forms[0].rng090SelectCacSid.value = $(this).data('cacsid');
		document.forms[0].rng090ActionParamOperation.value = "0";
		document.forms[0].submit();
	});

	//実行テストボタンをクリック
	$('.js_openExecuteTestWindow').on('click', function() {
		document.forms[0].CMD.value = "saveActionFile";
		let paramStr = $('form[name="rng090Form"]').serialize();
		//ボタン押下時の決裁後アクション情報を更新後、テスト画面を表示する。
		$.ajax({
			async: true,
			url:  '../ringi/rng090.do',
			type: "post",
			data: paramStr
		}).done(function( data ) {
			openExecuteTestWindow();
		});
	});

	//画面遷移時、実行テスト画面/プレビュー画面を閉じる
	window.addEventListener("beforeunload", function() {
		if(executeTestWindow != null){
			executeTestWindow.close();
		}
		closeRingiTemplatePreview();
	});

//-------onload処理 終了---------------------------

});

function getUserParamSampleMessage(selectVal) {
	if (selectVal == 100) { return "userId"; }
	else if (selectVal == 101) { return "山田太郎"; }
	else if (selectVal == 102) { return "山田"; }
	else if (selectVal == 103) { return "太郎"; }
	else if (selectVal == 104) { return "ヤマダタロウ"; }
	else if (selectVal == 105) { return "ヤマダ"; }
	else if (selectVal == 106) { return "タロウ"; }
	else if (selectVal == 107) { return "GS001"; }
	else if (selectVal == 108) { return "総務部"; }
	else if (selectVal == 109) { return "係長"; }
	else if (selectVal == 110) { return "男"; }
	else if (selectVal == 111) { return "2000/01/01"; }
	else if (selectVal == 112) { return "1980/01/01"; }
	else if (selectVal == 113) { return "mailaddress1@mail.jp"; }
	else if (selectVal == 114) { return "mailaddress2@mail.jp"; }
	else if (selectVal == 115) { return "mailaddress3@mail.jp"; }
	else if (selectVal == 116) { return "123-4567"; }
	else if (selectVal == 117) { return ""; }
	else if (selectVal == 118) { return "北海道札幌市厚別区下野幌"; }
	else if (selectVal == 119) { return "111-111-1111"; }
	else if (selectVal == 120) { return "222-222-2222"; }
	else if (selectVal == 121) { return "333-333-3333"; }
	else if (selectVal == 122) { return "444-444-4444"; }
	else if (selectVal == 123) { return "555-555-5555"; }
	else if (selectVal == 124) { return "666-666-6666"; }
}

function getDateParamSampleMessage(selectVal) {

	var now = new Date();
	var year = '' + now.getFullYear();
	var month = '' + ("0"+(now.getMonth() + 1)).slice(-2);
	var day = '' + ("0"+now.getDate()).slice(-2);
	var hour = '' + ("0"+now.getHours()).slice(-2);
	var minitu = '' +("0"+now.getMinutes()).slice(-2);
				if (selectVal == 301) { return year+"/"+month+"/"+day+" "+hour+":"+minitu; }
	else if (selectVal == 302) { return year+"-"+month+"-"+day+" "+hour+"-"+minitu; }
	else if (selectVal == 303) { return year+month+day+" "+hour+minitu; }
	else if (selectVal == 304) { return year+"/"+month+"/"+day; }
	else if (selectVal == 305) { return year+"-"+month+"-"+day; }
	else if (selectVal == 306) { return year+month+day; }
	else if (selectVal == 307) { return year; }
	else if (selectVal == 308) { return year.substring(2); }
	else if (selectVal == 309) { return month; }
	else if (selectVal == 310) { return day; }
	else if (selectVal == 311) { return hour+":"+minitu; }
	else if (selectVal == 312) { return hour+"-"+minitu; }
	else if (selectVal == 313) { return hour+minitu; }
	else if (selectVal == 314) { return hour; }
	else if (selectVal == 315) { return minitu; }
}

function getSample(paramName, values, rapJoin, contentType) {
	//文字列として結合する場合
	if (rapJoin == 0) {
		values = [values.join('')];
	}
	var paramResuqstStr = '';
	switch (contentType) {
		case 'JSON':
			var paramObj = {};
			paramObj[paramName] = "";
			if (values.length == 1) {
				paramObj[paramName] = values[0]
			}
			if (values.length  > 1) {
				paramObj[paramName] = values
			}

			paramResuqstStr = JSON.stringify(paramObj).substring();
			return paramResuqstStr.substring(1, paramResuqstStr.length -1);
		case 'XML':
			var paramRoot = $('<root ></root>');
			$.each(values, function (index, value) {
				if (index > 0) {
					paramResuqstStr += '\n';
				}
				paramResuqstStr += '<' + paramName + '>'+ value +'</' + paramName + '>'
			});
			return paramResuqstStr;
		case 'URL':
			$.each(values, function (index, value) {
				if (index > 0) {
					paramResuqstStr += '&';
				}
				paramResuqstStr += paramName+'=';
				paramResuqstStr += value;
			});
			return paramResuqstStr;
		case 'MLT':
			$.each(values, function (index, value) {
				paramResuqstStr += '------WebKitFormBoundaryA3NQz8OFmNvuhvUP\n'
				paramResuqstStr += 'Content-Disposition: form-data; name="';
				paramResuqstStr += paramName+'"\n';
				paramResuqstStr += value + '\n';
			});
			return paramResuqstStr;
		default:
			return '';
	}
}

function cmn110DropBan() {
	var dialogOpen = false;
	var dropBan = true;
	if ($('input[name="rngTemplateMode"]').val() == 2) {
		if (!$('body').find('div').hasClass('ui-widget-overlay')) {
			dropBan = false;
		}
		return dropBan;
	}
	var tmpDialog = $('#form_dialog');
	if (tmpDialog.parent().attr('role')) {
		dialogOpen = tmpDialog.dialog('isOpen');
	}
	if (dialogOpen && tmpDialog.find('input[name="attachmentFileListFlg"]')) {
		dropBan = false;
	}
	return dropBan;
}

//連携APIをソート
function sortRenkeiApi() {
	var el = document.getElementById('tplActionList');
	if (el != null) {
		var sortable = new Sortable(el, {
			animation: 150,
			ghostClass: 'out3',
			preventOnFilter: false,
			handle: '.js_renkeiApiSortHandle',
			onStart: onStartEvent,
			onEnd: onEndEvent,
			onSort: onSortEvent
		});
		function onStartEvent(e) {
			$('.js_sortIcon').removeClass("sortIcon");
			$('.js_renkeiApiSortHandle').addClass("bgC_none");
			$('.js_renkeiApiDeleteIcon').addClass("display_none");
		}
		function onEndEvent(e) {
			//ホバーイベントを元に戻す
			$('.js_sortIcon').addClass("sortIcon");
			$('.js_renkeiApiSortHandle').removeClass("bgC_none");
			$('.js_renkeiApiDeleteIcon').removeClass("display_none");
		}
		function onSortEvent(e) {
			//変更後の並び順一覧
			var indexArray = [];
			$(".js_selectedRenkeiApi").each( function() {
				indexArray.push($(this).data('index'));
			});
			document.forms[0].rng090SortActionIndex.value = indexArray.toString();
		}
	}
}

//表示コメントフォームにプレースホルダーをセット
function setPlaceholder() {
	$('.js_dspComment').attr('placeholder', msglist_rng090['rng.rng090.81']);
}

//連携APIの使用する/しない場合の背景色をセット
function setApiConnectBgc(element) {
	if (element.prop('checked')) {
		element.closest('.renkeiApi').removeClass('bgC_lightGray');
	} else {
		element.closest('.renkeiApi').addClass('bgC_lightGray');
	}
}

//使用できない連携APIの背景色をセット
function setRenkeiApiDisable() {
	$('.js_renkaiApiDisable').parent().addClass('bgC_lightGray');
		$('.js_renkaiApiDisable').parent().removeClass('js_editRenkeiApi bgC_contetHover cursor_p');
}

//実行テストウィンドウを表示
let executeTestWindow;
function openExecuteTestWindow() {
	var winWidth = 1024;
	var winHeight = 800;
	var winx = (screen.width - winWidth) / 2;
	var winy = (screen.height - winHeight) / 2;

	var url = '../ringi/rng330.do';
	var opt = 'width=' + winWidth + ', height=' + winHeight + ', resizable=yes, toolbar=no,' +
		'left=' + winx + ', top=' + winy + ',scrollbars=yes';
	executeTestWindow = window.open('', 'executeTest', opt);

	// form作成
	var form = document.createElement("form");
	form.target = 'executeTest';  // target属性 => どこにアクションURLを開くかを指定
	form.method = "post";    // POST通信設定。
	form.action = url;   //遷移先のAction

	var submitType;

	//input type=’hidden’ を作成し、送信データを設定。
	submitType = document.createElement("input");
	var rngTitle = $('input[name="rng090rngTitle"]').val();
	submitType.setAttribute("name", "rng330rngTitle");
	submitType.setAttribute("type", "hidden");
	submitType.setAttribute("value", rngTitle);
	form.appendChild(submitType);

	var ringiIdSid = $('input[name="rng090idSid"]').val();
	submitType = document.createElement("input");
	submitType.setAttribute("name", "rng330idSid");
	submitType.setAttribute("type", "hidden");
	submitType.setAttribute("value", ringiIdSid);
	form.appendChild(submitType);

	var idPrefManual = $('input[name="rng090idPrefManual"]:checked').val();
	submitType = document.createElement("input");
	submitType.setAttribute("name", "rng330idPrefManual");
	submitType.setAttribute("type", "hidden");
	submitType.setAttribute("value", idPrefManual);
	form.appendChild(submitType);

	var postJsonStr = $('#form_builder').data('outputJSON')();
	submitType = document.createElement("input");
	submitType.setAttribute("name", "rng330templateJSON");
	submitType.setAttribute("type", "hidden");
	submitType.setAttribute("value", postJsonStr);
	form.appendChild(submitType);

	//form に作成したinput要素を追加。
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(form); //一旦domに書き出し
	form.submit();          //送信
	body.removeChild(form); //送信後に作成したform要素の削除
}

//dandd 申請内容を削除した時、決裁後アクション登録用ファイルを更新する
function danddDeleteAfter(index) {
	if (index.length > 0) {
		document.forms[0].CMD.value='removeFormParam';
		document.forms[0].rng090RemoveFormId.value=index.data('content').formID;
		let paramStr = $('form[name="rng090Form"]').serialize();

		$.ajax({
			async: true,
			url:  '../ringi/rng090.do',
			type: "post",
			data: paramStr
		}).done(function( data ) {
			//レスポンスにて、入力チェック結果を元に必須パラメータかつ未入力になったものがあった場合はアイコンを表示
			for (var i in data.warnIndexArray) {
				if ($('#selectedActionApi_' + data.warnIndexArray[i]).find('.js_actionWarnIcon').length == 0) {
					$('#selectedActionApi_' + data.warnIndexArray[i]).append('<img class="ml5 js_actionWarnIcon" src="../common/images/original/icon_warn.png">');
				}
			}
		});
	}
}

//formbuilder 申請内容を更新した時、決裁後アクション登録用ファイルを更新する
function fbEditAfter(content, editFormId) {
	//ラジオ,コンボ,チェックのいずれかの時、更新後の選択肢
	if (content.body.list != null) {
		content.body.list.forEach( function(value) {
			var inputParam = document.createElement("input");
			inputParam.setAttribute("name", "rng090EditFormValue");
			inputParam.setAttribute("type", "hidden");
			inputParam.setAttribute("value", value);
			$("#rng090Form").append(inputParam);
		});
	};

	if (content.body.multiFlg != null) {
		var inputParam = document.createElement("input");
		inputParam.setAttribute("name", "rng090EditFormMultiFlg");
		inputParam.setAttribute("type", "hidden");
		inputParam.setAttribute("value", content.body.multiFlg);
		$("#rng090Form").append(inputParam);
	}

	document.forms[0].CMD.value='editFormParam';
	document.forms[0].rng090EditFormId.value=editFormId;
	document.forms[0].rng090NewFormId.value=content.formID;
	let paramStr = $('form[name="rng090Form"]').serialize();

	$.ajax({
		async: true,
		url:  '../ringi/rng090.do',
		type: "post",
		data: paramStr
	}).done(function( data ) {
		//レスポンスにて、入力チェック結果を元に必須パラメータかつ未入力になったものがあった場合はアイコンを表示
		for (var i in data.warnIndexArray) {
			if ($('#selectedActionApi_' + data.warnIndexArray[i]).find('.js_actionWarnIcon').length == 0) {
				$('#selectedActionApi_' + data.warnIndexArray[i]).append('<img class="ml5 js_actionWarnIcon" src="../common/images/original/icon_warn.png">');
			}
		}
		$('input[name="rng090EditFormValue"]').remove();
		$('input[name="rng090EditFormMultiFlg"]').remove();
	});
}

//dandd 表要素内の申請内容を移動した時、決裁後アクション登録用ファイルを更新する
function danddMoveAfter(formId, beforeContent, tableFormId, afterContent) {
	var beforeParent = "";
	var afterParent = "";
	var checkContent;
	//移動前の親要素を確認
	checkContent = beforeContent;
	for (var i = 0; i < 7; i++) {
		if (checkContent.attr('name') == "header"
		        || checkContent.attr('name') == "body"
				|| checkContent.attr('name') == "footer") {
			beforeParent = checkContent.attr('name');
			break;
		} else {
			checkContent = checkContent.parent();
		}
	}
	//移動後の親要素を確認
	checkContent = afterContent;
	for (var i = 0; i < 7; i++) {
		if (checkContent.attr('name') == "header"
		        || checkContent.attr('name') == "body"
				|| checkContent.attr('name') == "footer") {
			afterParent = checkContent.attr('name');
			break;
		} else {
			checkContent = checkContent.parent();
		}
	}
	var command = "";
	//ボディ から ヘッダーorフッター に移動した時、ボディ行指定の値を除去する
	if (beforeParent == "body"
		&& (afterParent == "header" || afterParent == "footer")) {
		command = "moveBodyToOther";
	}
	// ヘッダーorフッターから ボディ に移動した時、ボディ行指定の値を除去する
	if ((beforeParent == "header" || beforeParent == "footer")
		&& afterParent == "body") {
	    command = "moveOtherToBody";
	}

	document.forms[0].CMD.value = command;
	document.forms[0].rng090EditFormId.value = formId;
	document.forms[0].rng090EditTableFormId.value = tableFormId;
	let paramStr = $('form[name="rng090Form"]').serialize();
	$.ajax({
		async: true,
		url:  '../ringi/rng090.do',
		type: "post",
		data: paramStr
	}).done(function( data ) {
	});
}