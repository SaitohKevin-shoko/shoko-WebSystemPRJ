$(function(){
    setFormatDesc('enq210Desc', 'enq210DescText');
    setCheckEnq('enq110commit');
});

function setFormatDesc(descParam, formatParam) {
    document.getElementsByName(formatParam)[0].value
        = formatDesc(document.getElementsByName(descParam)[0].value, false);
}

function formatDesc(txtVal, type) {
    var lines;
    if (txtVal.indexOf('\n') < 0) {
        lines = [txtVal];
    } else {
        lines = txtVal.split('\n');
    }

    var formatTxt = '';
    for (idx = 0; idx < lines.length; idx++) {
        if (idx >= 1) {
            if (type) {
                formatTxt += '<br />';
            } else {
                formatTxt += '\n';
            }
        }
        if (type) {
            formatTxt += $('<div/>').text(lines[idx]).html();
        } else {
            formatTxt += $('<div/>').html(lines[idx]).text();
        }
    }

    return formatTxt;
}

function setParams() {

	var idx = 0;
	$(".js_enqDate").each(function() {
		id = $(this).prop("id");
		idx = id.substring(id.indexOf("_") + 1);
		setYmdParam($("#selDate_" + idx), $("#selYear_" + idx), $("#selMonth_" + idx), $("#selDay_" + idx));
	});

}

function setCheckEnq(entryCmd) {
    $(".js_kakuteibtn").on("click", function(){
        document.forms[0].CMD.value='checkEnq';
        var paramStr = "";
        paramStr += getFormData($('#enqForm'));
        $.ajax({
            async: true,
            url:  "../enquete/enq210kn.do",
            type: "post",
            data: paramStr

        }).done(function( data ) {
            //回答データあり 設問変更あり
            if (data.enqAnswerFlg == 1 && data.enqQchangeFlg == 1) {
                $('#enqAnswerDelete').dialog({
                    autoOpen: true,
                    bgiframe: true,
                    resizable: false,
                    width:580,
                    height: 160,
                    modal: true,
                    closeOnEscape: false,
                    overlay: {
                        backgroundColor: '#000000',
                        opacity: 0.5
                    },
                    buttons: {
                        'はい' : function() {
                            document.forms[0].CMD.value = entryCmd;
                            document.forms[0].enq210DelAnsFlg.value = "true";
                            document.forms[0].submit();

                            $(this).dialog('close');
                            loadingPop("処理中");
                        },
                        'キャンセル': function() {
                            $(this).dialog('close');
                        }
                    }
                });
                //回答データあり 設問変更なし
            } else if (data.enqAnswerFlg == 1 && data.enqQchangeFlg == 0) {
                $('#enqAnswerReset').dialog({
                    autoOpen: true,
                    bgiframe: true,
                    resizable: false,
                    width:420,
                    height: 175,
                    modal: true,
                    closeOnEscape: false,
                    overlay: {
                        backgroundColor: '#000000',
                        opacity: 0.5
                    },
                    buttons: {
                        '削除する': function() {
                            $("input:hidden[name='answerDataReset']").val(1);
                            document.forms[0].CMD.value = entryCmd;
                            document.forms[0].enq210DelAnsFlg.value = "true";
                            document.forms[0].submit();

                            $(this).dialog('close');
                            loadingPop("処理中");
                        },
                        '削除しない': function() {
                            $("input:hidden[name='answerDataReset']").val(0);
                            document.forms[0].CMD.value = entryCmd;
                            document.forms[0].enq210DelAnsFlg.value = "false";
                            document.forms[0].submit();

                            $(this).dialog('close');
                            loadingPop("処理中");
                        },
                        'キャンセル': function() {
                            $(this).dialog('close');
                        }
                    }
                });
                //回答削除確認不要 （変更無し OR 回答無し）
            } else {
                document.forms[0].CMD.value = entryCmd;
                document.forms[0].submit();
            }
        }).fail(function( data ){
            //該当するデータがありません。
            alert('データなし');
        });
    });
}