$(function(){
	//初期描画レイアウトを設定
	setInitDsp();

	//閉じるボタン押下
	$('.js_closeWindow').on('click', function() {
		closeExecuteTestWindow();
	});

	//グループ選択ポップアップにて申請者のグループが選択された際の処理
	$(".js_sinseiReloadBtn").on("click", function() {
		reloadApplicantUserCombo($('select[name="rng330ApplicantGroup"]').val());
	})

	//申請者のグループコンボを変更
	$('select[name="rng330ApplicantGroup"]').on("change", function() {
		reloadApplicantUserCombo($(this).val());
	});

	function reloadApplicantUserCombo(groupSid) {
		$.ajax({
			url: "../ringi/rng330.do?CMD=changeSinseisyaGroup&rng330ApplicantGroup=" + groupSid,
			type: "POST",
			processData: false,
			contentType: false
		}).done(function(data) {
			if (data['success']) {
				let option = createUserCombo(data["userList"]);
				$("select[name='rng330ApplicantUser']").html(option);
			}
		}).fail(function() {
			alert('グループコンボの切り替えに失敗しました');
		});
	}

	//グループ選択ポップアップにて承認者のグループが選択された際の処理
	$(".js_syouninReloadBtn").on("click", function() {
		reloadApproverUserCombo($('select[name="rng330ApproverGroup"]').val());
	})

	//承認者のグループコンボを変更
	$('select[name="rng330ApproverGroup"]').on("change", function() {
		reloadApproverUserCombo($(this).val());
	});

	function reloadApproverUserCombo(groupSid) {
		$.ajax({
			url: "../ringi/rng330.do?CMD=changeSyouninsyaGroup&rng330ApproverGroup=" + groupSid,
			type: "POST",
			processData: false,
			contentType: false
		}).done(function(data) {
			if (data['success']) {
				let option = createUserCombo(data["userList"]);
				$("select[name='rng330ApproverUser']").html(option);
			}
		}).fail(function() {
			alert('グループコンボの切り替えに失敗しました');
		});
	}

	//実行ボタン押下
	$('.js_executeTest').on('click', function() {
		executeTest();
	});

	//リクエスト情報を生成ボタン押下
	$('.js_createReqInfo').on('click', function() {
		document.forms[0].CMD = "createRequest";
		let formData = new FormData($("form[name='rng330Form']").get(0));
		formData.delete('CMD');
    	formData.append('CMD', 'createRequest');
		$.ajax({
			url: "../ringi/rng330.do",
			type: "POST",
			processData: false,
			contentType: false,
			data: formData
		}).done(function(data) {
			if (data['success']) {
				if (data["errorMessage"] != null) {
					$('.js_errorMsgArea').html(data["errorMessage"]);
					$('.js_executeTestArea').hide();
					$("input[name='rng330RequestDspFlg']").val(0);
					return;
				}
				let requestInfo = data["result"];
				if (requestInfo.length == 0) {
					$('.js_executeTestArea').hide();
					$('.js_errorMsgArea').text(data["errorMessage"]);
					$("input[name='rng330RequestDspFlg']").val(0);
				}
				$("input[name='rng330testTarget']").val(1);
				$("input[name='rng330RequestDspFlg']").val(1);
				$("input[name='rng330testRepeatKbn']").val(data["repeatKbn"]);
				if (data["repeatKbn"] == 1) {
					$("input[name='rng330testRepeatName']").val(data["message"]);
				}

				createReqParameter(requestInfo);
				if (requestInfo.length > 0) {
					$('.js_response').val('');
					createReqInfo(0);
				}
				setRepeatCombo();
			}
		}).fail(function() {
			alert('リクエスト情報の作成に失敗しました');
		});
	});

	//繰り返し実行コンボ切り替え
	$(document).on('change', '.js_repeatCombo', function(){
		let val = $(this).val();
		$("input[name='rng330testTarget']").val(val);
		$('.js_response').val('');

		let index = val - 1;
		createReqInfo(index);
	});
});

//JSONからパラメータを作成
function createReqParameter(requestInfo) {
	$(".js_testParam").remove();
	$(".js_multipartParam").remove();
	if (requestInfo == null || requestInfo.length == 0) {
		return;
	}

	let rngForm = $("form[name='rng330Form']");
	rngForm.append(`<span class="js_testParam js_repeatCount" data-repeatcount="${requestInfo.length}"></span>`);
	$(".js_partCount").remove();

	for (let idx = 0; idx < requestInfo.length; idx++) {
		let testModel = requestInfo[idx];
		rngForm.append(`<input type="hidden" name="rng330Test[${idx}].url" value="" class="js_testParam">`);
		$(`input[name="rng330Test[${idx}].url"]`).val(testModel["url"]);

		rngForm.append(`<input type="hidden" name="rng330Test[${idx}].methodKbn" value="" class="js_testParam">`);
		$(`input[name="rng330Test[${idx}].methodKbn"]`).val(testModel["methodKbn"]);

		rngForm.append(`<input type="hidden" name="rng330Test[${idx}].contentType" value="" class="js_testParam">`);
		$(`input[name="rng330Test[${idx}].contentType"]`).val(testModel["contentType"]);

		if (testModel["headerList"] != null) {
			for (let headerIdx = 0; headerIdx < testModel["headerList"].length; headerIdx++) {
				rngForm.append(`<input type="hidden" name="rng330Test[${idx}].header" value="" class="js_testParam">`);
				$(`input[name="rng330Test[${idx}].header"]`).eq(headerIdx).val(testModel["headerList"][headerIdx]);
			}
		}

		rngForm.append(`<input type="hidden" name="rng330Test[${idx}].body" value="" class="js_testParam">`);
		$(`input[name="rng330Test[${idx}].body"]`).val(testModel["reqBody"]);

		rngForm.append(`<input type="hidden" name="rng330Test[${idx}].result" value="" class="js_testParam">`);
		$(`input[name="rng330Test[${idx}].result"]`).val(testModel["result"]);

		if (testModel["partList"] != null) {
			rngForm.append(`<span class="js_partCount" data-testidx="${idx}" data-partsize="${testModel["partList"].length}"></span>`);
			for (let partIdx = 0; partIdx < testModel["partList"].length; partIdx++) {
				let partMdl = testModel["partList"][partIdx];
				if (partMdl["charSet"] != null) {
					rngForm.append(`<input type="hidden" name="rng330Test[${idx}].part[${partIdx}].charSet" value="" class="js_multipartParam">`);
					$(`input[name="rng330Test[${idx}].part[${partIdx}].charSet"]`).val(partMdl["charSet"]);
				}
				if (partMdl["fileContentType"] != null) {
					rngForm.append(`<input type="hidden" name="rng330Test[${idx}].part[${partIdx}].fileContentType" value="" class="js_multipartParam">`);
					$(`input[name="rng330Test[${idx}].part[${partIdx}].fileContentType"]`).val(partMdl["fileContentType"]);
				}
				if (partMdl["numberFileName"] != null) {
					rngForm.append(`<input type="hidden" name="rng330Test[${idx}].part[${partIdx}].numberFileName" value="" class="js_multipartParam">`);
					$(`input[name="rng330Test[${idx}].part[${partIdx}].numberFileName"]`).val(partMdl["numberFileName"]);
				}
				if (partMdl["folderName"] != null) {
					rngForm.append(`<input type="hidden" name="rng330Test[${idx}].part[${partIdx}].folderName" value="" class="js_multipartParam">`);
					$(`input[name="rng330Test[${idx}].part[${partIdx}].folderName"]`).val(partMdl["folderName"]);
				}
				if (partMdl["paramName"] != null) {
					rngForm.append(`<input type="hidden" name="rng330Test[${idx}].part[${partIdx}].paramName" value="" class="js_multipartParam">`);
					$(`input[name="rng330Test[${idx}].part[${partIdx}].paramName"]`).val(partMdl["paramName"]);
				}
				if (partMdl["strValue"] != null) {
					rngForm.append(`<input type="hidden" name="rng330Test[${idx}].part[${partIdx}].strValue" value="" class="js_multipartParam">`);
					$(`input[name="rng330Test[${idx}].part[${partIdx}].strValue"]`).val(partMdl["strValue"]);
				}
			}
		}
	}
}

//初期描画レイアウトを設定
function setInitDsp() {
	//フォーム情報 申請者を非表示
	$('.formRow').eq(1).remove();

	//フォーム情報テーブルレイアウトを修正
	$('.form_title').addClass('w25 fw_n');
	$('.formContent').addClass('w75');

	if ($("input[name='rng330RequestDspFlg']").val() == 1) {
		createReqInfo($("input[name='rng330testTarget']").val() - 1);
	}
	setRepeatCombo();
	$(".js_repeatCombo").val($("input[name='rng330testTarget']").val());
}

//グループコンボ切り替え時のユーザコンボの作成
function createUserCombo(userList) {
	if (userList == null || userList.length == 0) {
		return `<option value="-1">${msglist_rng330['cmn.select.plz']}</option>`;
	}

	let ret = "";
	let userLabel;

	for (let idx = 0; idx < userList.length; idx++) {
		userLabel = userList[idx];
		ret += `<option value="${userLabel["value"]}">${userLabel["label"]}</option>`;
	}
	return ret;
}

//ウィンドウを閉じる
function closeExecuteTestWindow() {
	$.ajax({
		url: "../ringi/rng330.do?CMD=closeWindow",
		type: "POST",
		processData: false,
		contentType: false
	});
	window.close();
}

//リクエスト情報を表示する
function displayReqInfo() {

	$('.js_executeTestArea').show();
	$('.js_errorMsgArea').text('');

	$('.js_url').text($("input[name='rng330TestUrl']").val());
	let method = "";
	let methodKbn = $("input[name='rng330TestMethodKbn']").val();
	if (methodKbn == 0) {
		method = "GET";
	} else if (methodKbn == 1) {
		method = "POST";
	} else if (methodKbn == 2) {
		method = "PUT";
	} else if (methodKbn == 3) {
		method = "PATCH";
	} else if (methodKbn == 4) {
		method = "DELETE";
	}
	$('.js_reqMethod').text(method);

	let reqHeader = "";
	if ($("input[name='rng330TestHeader']").length > 0) {
		for (let idx = 0; idx < $("input[name='rng330TestHeader']").length; idx++) {
			reqHeader += $("input[name='rng330TestHeader']").eq(idx).val();
			reqHeader += "<br>";
		}
	}

	if (methodKbn == 1 || methodKbn == 2 || methodKbn == 3) {
		reqHeader+= "Content-Type: " + $("input[name='rng330TestContentType']").val();
	}
	$('.js_reqHeader').html(reqHeader.replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;"));

	let body = $("input[name='rng330TestBody']").val();

	if (body != null && body.length > 0) {
		$('.js_reqBodyArea').show();
		$('.js_reqBodyArea td').html(body.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;"));
	} else {
		$('.js_reqBodyArea').hide();
	}
}
//リクエスト情報を生成
function createReqInfo(index) {

	$(".js_executeParam").remove();
	let rngForm = $("form[name='rng330Form']");

	let bodyValue = $(`input[name="rng330Test[${index}].body"]`).val();
	let body = `<input type="hidden" name="rng330TestBody" value="" class="js_executeParam">`;
	rngForm.append(body);
	$("input[name='rng330TestBody']").val(bodyValue);

	let urlValue = $(`input[name="rng330Test[${index}].url"]`).val();
	let url = `<input type="hidden" name="rng330TestUrl" value="" class="js_executeParam">`;
	rngForm.append(url);
	$("input[name='rng330TestUrl']").val(urlValue);

	let methodValue = $(`input[name="rng330Test[${index}].methodKbn"]`).val();
	let method = `<input type="hidden" name="rng330TestMethodKbn" value="" class="js_executeParam">`;
	rngForm.append(method);
	$("input[name='rng330TestMethodKbn']").val(methodValue);

	let headerList = $(`input[name="rng330Test[${index}].header"]`);
	if (headerList != null && headerList.length > 0) {
		for (let idx = 0; idx < headerList.length; idx++) {
			rngForm.append(`<input type="hidden" name="rng330TestHeader" value="" class="js_executeParam">`);
			$("input[name='rng330TestHeader']").eq(idx).val(headerList.eq(idx).val());
		}
	}

	let contentTypeValue = $(`input[name="rng330Test[${index}].contentType"]`).val();
	let contentType = `<input type="hidden" name="rng330TestContentType" value="" class="js_executeParam">`;
	rngForm.append(contentType);
	$("input[name='rng330TestContentType']").val(contentTypeValue);

	let partSize = $(`span[data-testidx='${index}']`).attr("data-partsize");
	for (let partIdx = 0; partIdx < partSize; partIdx++) {

		let charSetValue = $(`input[name="rng330Test[${index}].part[${partIdx}].charSet`).val();
		if (charSetValue != null && charSetValue.length > 0) {
			rngForm.append(`<input type="hidden" name="rng330Part[${partIdx}].charSet" value="" class="js_executeParam">`);
			$(`input[name='rng330Part[${partIdx}].charSet']`).val(charSetValue);
		}

		let fileContentTypeValue = $(`input[name="rng330Test[${index}].part[${partIdx}].fileContentType`).val();
		if (fileContentTypeValue != null && fileContentTypeValue.length > 0) {
			rngForm.append(`<input type="hidden" name="rng330Part[${partIdx}].fileContentType" value="" class="js_executeParam">`);
			$(`input[name='rng330Part[${partIdx}].fileContentType']`).val(fileContentTypeValue);
		}

		let numberFileNameValue = $(`input[name="rng330Test[${index}].part[${partIdx}].numberFileName`).val();
		if (numberFileNameValue != null && numberFileNameValue.length > 0) {
			rngForm.append(`<input type="hidden" name="rng330Part[${partIdx}].numberFileName" value="" class="js_executeParam">`);
			$(`input[name='rng330Part[${partIdx}].numberFileName']`).val(numberFileNameValue);
		}

		let folderNameValue = $(`input[name="rng330Test[${index}].part[${partIdx}].folderName`).val();
		if (folderNameValue != null && folderNameValue.length > 0) {
			rngForm.append(`<input type="hidden" name="rng330Part[${partIdx}].folderName" value="" class="js_executeParam">`);
			$(`input[name='rng330Part[${partIdx}].folderName']`).val(folderNameValue);
		}

		let paramNameValue = $(`input[name="rng330Test[${index}].part[${partIdx}].paramName`).val();
		if (paramNameValue != null && paramNameValue.length > 0) {
			rngForm.append(`<input type="hidden" name="rng330Part[${partIdx}].paramName" value="" class="js_executeParam">`);
			$(`input[name='rng330Part[${partIdx}].paramName']`).val(paramNameValue);
		}

		let strValue = $(`input[name="rng330Test[${index}].part[${partIdx}].strValue`).val();
		if (numberFileNameValue == null || numberFileNameValue.length == 0) {
			rngForm.append(`<input type="hidden" name="rng330Part[${partIdx}].strValue" value="" class="js_executeParam">`);
			$(`input[name='rng330Part[${partIdx}].strValue']`).val(strValue);
		}
	}

	displayReqInfo();
}

//繰り返し実行コンボをセット
function setRepeatCombo() {

	if ($("input[name='rng330testRepeatKbn']").val() == 0) {
		$('.js_repeatExecuteArea').hide();
		$('.js_repeatMessage').text('');
		$('.js_repeatComboArea').html('');
		return;
	}

	let maxNum = $(".js_repeatCount").attr("data-repeatcount");
	if (maxNum > 0) {
		$('.js_repeatExecuteArea').show();
		let repeatMsg = msglist_rng330['rng.rng330.8'];
		let index = repeatMsg.indexOf('{');
		let repeatMsgTop = repeatMsg.substring(0, index);
		let repeatMsgBottom = repeatMsg.substring(index + 2, repeatMsg.length);
		let message = $("input[name='rng330testRepeatName']").val();
		$('.js_repeatMessage').text(repeatMsgTop + message + repeatMsgBottom);
		let repeatCombo
		  = '<select class=\"js_repeatCombo\">';
		for (let num = 1; num <= maxNum; num++) {
			repeatCombo += `<option value="${num}">${num}${msglist_rng330["rng.rng330.14"]}</option>`;
		}
		repeatCombo += `</select>`;
		$('.js_repeatComboArea').html(repeatCombo);
	}
}

//テストを実行
function executeTest() {
	document.forms[0].CMD = "createRequest";
	let formData = new FormData($("form[name='rng330Form']").get(0));
	formData.delete('CMD');
	formData.append('CMD', 'doTest');
	loadingPop(msglist["nowLoading"]);
	$.ajax({
		url: "../ringi/rng330.do",
		type: "POST",
		processData: false,
		contentType: false,
		data: formData
	}).done(function(data) {
		if ($('#loading_pop').hasClass('ui-dialog-content')) {
			$('#loading_pop').dialog('close');
		  }
		if (data['success']) {
			$('.js_response').val(data["response"]);
		}
	}).fail(function() {
		alert('リクエスト情報の作成に失敗しました');
	});
}

/*読み込み中ダイアログ*/
function loadingPop(popTxt) {

	$('#loading_pop').dialog({
		autoOpen: true,  // hide dialog
		dialogClass:"fs_13",
		resizable: false,
		height: 130,
		width: 250,
		modal: true,
		title: popTxt,
		overlay: {
			backgroundColor: '#000000',
			opacity: 0.5
		},
		closeOnEscape:false,
		close: function() {
		},
		open: function() {
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