function selectPage(id){
    if (id == 1) {
        document.forms[0].rng010pageTop.value=document.forms[0].rng010pageBottom.value;
    }

    document.forms[0].CMD.value='init';
    document.forms[0].submit();
    return false;
}

function clickRingi(cmd, cmdMode, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].rngCmdMode.value=cmdMode;
    document.forms[0].rngSid.value=sid;
    document.forms[0].submit();
    return false;
}

function clickJyusinRingi(cmd, cmdMode, apprMode, sid) {
    document.forms[0].CMD.value=cmd;
    document.forms[0].rngSid.value=sid;
    document.forms[0].rngCmdMode.value=cmdMode;
    document.forms[0].rngApprMode.value=apprMode;
    document.forms[0].rng010userSid.value = $('#account_comb_box').val();
    document.forms[0].submit();
    return false;
}

function clickTitle(sortKey, orderKey) {
    document.forms[0].CMD.value='init';
    document.forms[0].rng010sortKey.value=sortKey;
    document.forms[0].rng010orderKey.value=orderKey;
    document.forms[0].submit();
    return false;
}

function changeMode(mode, sortKey, orderKey) {
    document.forms[0].CMD.value='changeMode';
    document.forms[0].rngProcMode.value=mode;
    document.forms[0].rng010sortKey.value=sortKey;
    document.forms[0].rng010orderKey.value=orderKey;
    document.forms[0].submit();
    return false;
}


$(function() {

	$('.js_tableTopCheck-header').live("change",function() {
		if (document.forms[0].allChk.checked) {
			checkAll('rng010DelSidList');
		} else {
			nocheckAll('rng010DelSidList');
        }
	});

    /* アカウントエリア クリック */
    $("#rng_account_area").live("click", function(){
	$("#rng_account_child_area").slideToggle("normal");
	changeSelImg($(this).children());

    });

    /* フォルダエリア クリック */
    $("#rng_folder_area").live("click", function(){
        $("#rng_folder_child_area").slideToggle("normal");
        changeSelImg($(this).children());
    });

    /* 共有テンプレートエリア クリック */
    $("#rng_template_area").live("click", function(){
        $("#rng_template_child_area").slideToggle("normal");
        changeSelImg($(this).children());
    });

    /* 個人テンプレートエリア クリック */
    $("#rng_template_user_area").live("click", function(){
        $("#rng_template_user_child_area").slideToggle("normal");
        changeSelImg($(this).children());
    });

    $(".js_listClick").live("click", function(){
    	var sid = $(this).parent().attr("id");
    	var appr = $(this).parent().attr("name");
    	clickJyusinRingi('rng030', 0, appr, sid);
    });

    $(".js_listClick_draft").live("click", function(){
    	var sid = $(this).parent().attr("id");
    	var appr = $(this).parent().attr("name");
    	clickRingi('rng020', 1, sid);
    });

    /* メール 行  hover */
    $('.js_listHover').live({
        mouseenter:function (e) {
            $(this).children().addClass("list_content-on");
            $(this).prev().children().addClass("list_content-topBorder");
        },
        mouseleave:function (e) {
            $(this).children().removeClass("list_content-on");
            $(this).prev().children().removeClass("list_content-topBorder");
        }
    });


});

function changeSelImg(id) {
    if (id.hasClass("side_header-close")) {
        id.removeClass("side_header-close");
        id.addClass("side_header-open");
    } else {
        id.removeClass("side_header-open");
        id.addClass("side_header-close");
    }
}

/* メールボックスエリア hover */
$(".js_side_accountName").live({
    mouseenter:function (e) {
        $(this).addClass("side_accountName-hover");
    },
    mouseleave:function (e) {
        $(this).removeClass("side_accountName-hover");
    }
});

/* アカウントクリック */
$('.js_side_accountName').live("click", function(){
    document.forms[0].CMD.value='changeAccount';
    var accountId = $(this).attr('id');
    $('select[name=rng010ViewAccount]').val(accountId);
    document.forms[0].submit();
    return false;
});

/* アカウント変更 */
$('#account_comb_box').live("change", function(){
    document.forms[0].CMD.value='changeAccount';
    document.forms[0].submit();
    return false;
});

function changeCategory(cmd, sid){
    document.forms[0].CMD.value=cmd;
    document.forms[0].rngSelectTplSid.value =sid;
    document.forms[0].submit();
    return false;
}

function categorySearch(){
    document.forms[0].CMD.value="categorySearch";
    document.forms[0].submit();
    return false;
}

function tempEdit(mode, move){
    document.forms[0].CMD.value=move;
    document.forms[0].rngTemplateMode.value=mode;
    document.forms[0].rng010TransitionFlg.value=1;
    document.forms[0].submit();
    return false;
}

/* テンプレート 編集 hover */
$("#template_edit").live({
    mouseenter:function (e) {
        $(this).addClass("template_edit_on");
    },
    mouseleave:function (e) {
        $(this).removeClass("template_edit_on");
    }
});

