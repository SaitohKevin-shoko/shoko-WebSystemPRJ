function buttonPush_rsv230(cmd) {
    if($('#periodFlg').length){
        $('input:hidden[name="rsv230SvPeriodFlg"]').val(true);
    }
    if($('#editFlg').length){
        $('input:hidden[name="rsv230SvEditFlg"]').val(true);
    }
    if($('#publicFlg').length){
        $('input:hidden[name="rsv230SvPublicFlg"]').val(true);
    }
    document.forms[0].CMD.value=cmd;
    document.forms[0].submit();
    return false;
}

function selectPubUsersList() {
   var flg = true;
   if (document.forms[0].rsv230SelectUsersKbn.checked) {
       flg = true;
   } else {
       flg = false;
   }
   oElements = document.getElementById("users_r");
   var defUserAry = document.forms[0].users_r.options;
   var defLength = defUserAry.length;
   for (i = defLength - 1; i >= 0; i--) {
       if (defUserAry[i].value != -1) {
           defUserAry[i].selected = flg;
       }
   }
}

function setParams() {
	setHmParam($("input[name='rsv230DefFrTime']"),
      $("input[name='rsv230DefFrH']"),
      $("input[name='rsv230DefFrM']"));
	
	setHmParam($("input[name='rsv230DefToTime']"),
      $("input[name='rsv230DefToH']"),
      $("input[name='rsv230DefToM']"));
    
}

$(function() {
    $(document).on("click", ".js_public",function(){
      var val = $(this).val();
      if (val == 3) {
        $(".js_selectUsrArea").show();
      } else {
        $(".js_selectUsrArea").hide();
      }
    });

    //初期表示
    if ($("#rsv230Public3").is(':checked')) {
      $(".js_selectUsrArea").show();
    } else {
      $(".js_selectUsrArea").hide();
    }
});