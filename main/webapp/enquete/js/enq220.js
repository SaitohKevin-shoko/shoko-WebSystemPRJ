function enq220Entry() {
    return buttonPush('enq220ok');
}

function enq220basicDetail() {
    if (document.forms[0].enq220viewDetailFlg.value == 1) {
        $('#enq220detailTitleArea').show();
        $('#enq220detailArea').show();
        $('#enq220detailArea1').hide();
        $('#enq210detailBtn0').hide();
        $('#enq210detailBtn1').show();
    } else {
        $('#enq220detailTitleArea').hide();
        $('#enq220detailArea').hide();
        $('#enq220detailArea1').show();
        $('#enq210detailBtn0').show();
        $('#enq210detailBtn1').hide();
    }
}

function cmn110Updated(window, tempName, tempSaveName, objId) {
	if (objId == "2") {
		var tempNameList = [tempName];
		var tempSaveNameList = [tempSaveName];
		setParentParamTinymceMode(tempNameList, tempSaveNameList, 0);
	}
	if (objId == "1") {
		window.close();
        document.forms[0].submit();
	}
}

function enq220changeBasicDetail(viewDetail) {
    document.forms[0].enq220viewDetailFlg.value = viewDetail;
    enq220basicDetail();
}

function changeAttached(attachedType) {
    $('#enq220attachPosition').hide();
    $('#enq220attachFile').hide();
    $('#enq220attachUrl').hide();
    $('#enq220attachDspName').hide();

    if (attachedType == 1) {
        $('#enq220attachPosition').show();
        $('#enq220attachFile').show();
    } else if (attachedType == 2) {
        $('#enq220attachPosition').show();
        $('#enq220attachFile').show();
        $('#enq220attachDspName').show();
    } else if (attachedType == 3) {
        $('#enq220attachPosition').show();
        $('#enq220attachUrl').show();
        $('#enq220attachDspName').show();
    }
}

// 行追加
function addRow() {
    return enq220ButtonPush('enq220addRow');
}

//削除
function enq220delRow(lineNo) {
    document.forms['enq220Form'].enq220deleteRow.value = lineNo;
    return enq220ButtonPush('enq220delRow');
}

// 上移動
function enq220UpRow(lineNo) {
    document.forms['enq220Form'].enq220selectRow.value = lineNo;
    return enq220ButtonPush('enq220upRow');
}

// 下移動
function enq220DownRow(lineNo) {
    document.forms['enq220Form'].enq220selectRow.value = lineNo;
    return enq220ButtonPush('enq220downRow');
}

function enq220ButtonPush(cmd) {
    document.forms['enq220Form'].CMD.value = cmd;
    document.forms['enq220Form'].submit();
    return false;
}

// 添付画像
function initImageView() {
    var objImg = document.getElementsByName('enqImgName');
    for (i = 0; i < objImg.length; i++) {
        if (objImg[i].width > 500) {
            objImg[i].width = 500;
        }
    }
}

/**
 * 初期値の表示切替
 * @param {} initType
 * @returns {}
 */
function changeInitArea(initType) {
    if (initType == 0) {
        enq220ChangeArea('enq220DefKbn', 'enq220TxtInitArea');
    } else if (initType == 1) {
        enq220ChangeArea('enq220DefKbn', 'enq220IntInitArea');
    } else if (initType == 2) {
        enq220ChangeArea('enq220DefKbn', 'enq220DateInitArea');
    }
}

/**
 * 入力範囲の表示切替
 * @param {} initType
 * @returns {}
 */
function changeRangeArea(rangeType) {
    if (rangeType == 0) {
        enq220ChangeArea('enq220RngKbn', 'enq220IntRangeArea');
    } else if (rangeType == 1) {
        enq220ChangeArea('enq220RngKbn', 'enq220DateRangeArea');
    }
}

function enq220ChangeArea(paramName, areaId) {
    if ($('input[name="' + paramName + '"]:checked').val() == 1) {
        $('#' + areaId).show();
    } else {
        $('#' + areaId).hide();
    }
}

function enq220ChechCheckBox(checkLineNo) {
    var queType = document.getElementsByName('enq210queType')[0].value;
    var count = document.forms['enq220Form'].enq230subFormListCount.value;
    if (queType == 1 && count > 0) {
        for (lineIdx = 0; lineIdx < count; lineIdx++) {
            if (lineIdx != checkLineNo) {
                document.getElementById('eqsRadioOn_' + lineIdx).checked = false;
            }
        }
    }
}

$(function(){
    enq220basicDetail();
    changeInitArea(0);
    changeInitArea(1);
    changeInitArea(2);
    changeRangeArea(0);
    changeRangeArea(1);

    if (document.forms[0].enq220scrollQuestonFlg.value == '1') {
        window.location.hash='enq220question';
        document.forms[0].enq220scrollQuestonFlg.value = '';
    }

    //添付ボタン又は削除ボタンを押したらクリック判断フラグ：1
    $("#attachment_FormArea button").on("click", function(){
        $("input:hidden[name='tempClickBtn']").val(1);
    });
    
    $("#attachment_FormArea1 img[onclick]").on("click", function() {
	  $("input[name='enq220fileName']").val("");
	  $("input[name='enq220AttachKbn']").val(0);
    });
});

$(function(){
    /* radio:click */
    $(".js_tableTopCheck").on("click", function(){
        var check = $(this).children();
        check.attr("checked", true);
    });
});

