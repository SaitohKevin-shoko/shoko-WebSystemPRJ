//検索ボタン押下時
function searchpush() {
    document.forms[0].CMD.value='search';
    document.forms[0].wml320searchFlg.value='1';
    document.forms[0].submit();
    return false;
}

//ボタン押下時
function buttonPush(cmd){
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

//ページングコンボ
function selectPage(id){
    if (id == 1) {
        $('[name=wml320pageTop]').val($('[name=wml320pageBottom]').val());
    } else {
        $('[name=wml320pageBottom]').val($('[name=wml320pageTop]').val());
    }
    return buttonPush('init');
}

//ソート
function wml320Sort(sortKey, order) {
    document.getElementsByName('wml320sortKey')[0].value = sortKey;
    document.getElementsByName('wml320order')[0].value = order;
    document.forms[0].submit();
    return false;
}

//日付radio変更
function changeDateType(){
    controlInput();
    return false;
}

//disabled変更
function controlInput() {
  if (document.forms[0].wml320dateType.value == 0) {
    document.forms[0].wml320DateFr.disabled=true;
    document.forms[0].wml320DateTo.disabled=true;
  } else {
    document.forms[0].wml320DateFr.disabled=false;
    document.forms[0].wml320DateTo.disabled=false;
  }
}

//アカウント変更
function changeAccount() {
    document.forms[0].CMD.value='changeAccount';
    document.forms[0].submit();
    return false;
}

function setDateParam() {
    setYmdParam($("#selDatefr"),
                $("input[name='wml320dateYearFr']"),
                $("input[name='wml320dateMonthFr']"),
                $("input[name='wml320dateDayFr']"));
    setYmdParam($("#selDateto"),
                $("input[name='wml320dateYearTo']"),
                $("input[name='wml320dateMonthTo']"),
                $("input[name='wml320dateDayTo']"));
}

$(function() {
    if (document.getElementsByName('wml320Form').length > 0) {
        controlInput();
    }

    var delMailCount = $('#delMailCount').val();
    if (delMailCount && delMailCount > 0) {
        setTimeout(function() { checkDelProgress(); }, 10000);
    }
    $('.js_mailListHover')
        .mouseenter(function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        })
        .mouseleave(function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        });

    $(document).on("click", ".js_mailListClick", function(){
        var sid = $(this).data("sid");
        openDetail(sid);
    });
});

function checkDelProgress(json, count) {

    var wacSid = $('#accountSid').val();
    var paramStr = "CMD=getDeleteMailCount"
             + "&wml320account=" + wacSid;
    $.ajax({
        async: true,
        url:  "../webmail/wml320.do",
        type: "post",
        dataType: "json",
        processData: false,
        data: paramStr
    }).done(function( data ) {
        var mailCount = data.mailCount;
        if (mailCount && mailCount > 0) {
            $('#mailCountArea').html(mailCount);
            setTimeout(function() { checkDelProgress(); }, 10000);
        } else {
            $('#delProgressArea').addClass('display_none');
            $('.js_wmlHideBtn').removeClass('display_none');
        }
    }).fail(function(jqXHR, textStatus, errorThrown){
        $('#delProgressArea').html(msglist["wml.failed.delcount"]);
        $('.js_wmlHideBtn').removeClass('display_none');
    });
}