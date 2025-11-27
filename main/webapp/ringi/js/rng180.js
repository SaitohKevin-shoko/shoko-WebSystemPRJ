// 汎用稟議テンプレートを使用しない場合、個人テンプレート使用設定要素を隠す
function dspPersonalTemplate() {
	var chk = $("input[name='rng180HanyoFlg']:checked").val();
    if(chk == "1"){
    	$('#template').show();
    } else {
    	$('#template').hide();
    }
}


$(function(){
	dspPersonalTemplate();
    /* 使用する選択 */
    $("#yes").live("click", function(){
        $("#sinseiArea").show();
        $("#tyoufukuArea").show();
        if (!($("#all").is(':checked') || $("#temp").is(':checked'))) {
            document.getElementsByName("select")[0].checked = true;
        }
    });

    /* 使用しない選択 */
    $("#no").live("click", function(){
        $("#sinseiArea").hide();
        $("#tyoufukuArea").hide();
    });

    /* 全稟議統一選択 */
    $("#all").live("click", function(){
        $("#selectTemp").css("visibility", "visible");
    });
    /* テンプレート毎選択 */
    $("#temp").live("click", function(){
        $("#selectTemp").css("visibility", "hidden");
    });

    //初期表示  日報通知
    if ($("#yes").is(':checked')) {
        //管理者が設定する
        $("#sinseiArea").show();
        $("#tyoufukuArea").show();
    } else {
        //各ユーザが設定する
        $("#sinseiArea").hide();
        $("#tyoufukuArea").hide();
    }

    if ($("#all").is(':checked')) {
        $("#selectTemp").css("visibility", "visible");
    } else if ($("#temp").is(':checked') || $("#no").is(':checked')) {
        $("#selectTemp").css("visibility", "hidden");
    }
});

function okClick(cmd) {

    var sinseiId = 0;
    if (document.getElementById("yes").checked) {
       if (document.getElementById("all").checked) {
           sinseiId = 0;
       } else {
           sinseiId = 1;
       }
    } else {
       sinseiId = 2;
    }
    document.forms[0].CMD.value=cmd;
    document.forms[0].rng180sinseiKbn.value =sinseiId;

    document.forms[0].submit();
    return false;
}

