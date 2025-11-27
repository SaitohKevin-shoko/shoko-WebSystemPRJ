
$(function(){
    if ($(".js_reminder").val() == 0 && $("js_checkbox") != undefined) {
        $(".js_checkbox").attr("disabled", true);
    }

    $(document).on("change", ".js_reminder", function(){
        if ($("js_checkbox") != undefined){
            if ($(this).val() == 0) {
                $(".js_checkbox").attr("disabled", true);
            } else {
                $(".js_checkbox").attr("disabled", false);
            }
        }
    });

    $(document).on("click", ".js_public",function(){
      var val = $(this).val();
      if (val == 4) {
        $(".js_selectUsrArea").show();
      } else {
        $(".js_selectUsrArea").hide();
      }
    });

    //初期表示
    if ($("#sch091PubFlg4").is(':checked')) {
      $(".js_selectUsrArea").show();
    } else {
      $(".js_selectUsrArea").hide();
    }
});

function selectPubUsersList() {
   var flg = true;
   if (document.forms[0].sch091SelectUsersKbn.checked) {
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