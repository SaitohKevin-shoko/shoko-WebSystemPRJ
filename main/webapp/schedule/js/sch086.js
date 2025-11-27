function changeEnableDisableTime() {
    if (document.forms[0].sch086TimeType[0].checked) {
       $('#schTimeArea').show();
    } else {
       $('#schTimeArea').hide();
    }
  }

function changeEnableDisable() {
  if (document.forms[0].sch086EditType[0].checked) {
     $('#schEditArea').show();
  } else {
     $('#schEditArea').hide();
  }
}

function changeEnableDisablePublic() {
    if (document.forms[0].sch086PublicType[0].checked) {
       $('#schPublicArea').show();
       if ($("#sch086public4").is(':checked')) {
        $(".js_selectUsrArea").show();
      } else {
        $(".js_selectUsrArea").hide();
      }
    } else {
       $('#schPublicArea').hide();
    }
  }

function changeEnableDisableSame() {
    if (document.forms[0].sch086SameType[0].checked) {
       $('#schSameArea').show();
    } else {
       $('#schSameArea').hide();
    }
}

function selectPubUsersList() {
   var flg = true;
   if (document.forms[0].sch086SelectUsersKbn.checked) {
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
	setHmParam($("input[name='sch086DefFrTime']"),
        $("input[name='sch086DefFrH']"),
        $("input[name='sch086DefFrM']"));
    setHmParam($("input[name='sch086DefToTime']"),
        $("input[name='sch086DefToH']"),
        $("input[name='sch086DefToM']"));
}


$(function() {
    $(document).on("click", ".js_public",function(){
      var val = $(this).val();
      if (val == 4) {
        $(".js_selectUsrArea").show();
      } else {
        $(".js_selectUsrArea").hide();
      }
    });

    //初期表示
    if ($("#sch086PublicType_01").is(':checked')) {
      if ($("#sch086public4").is(':checked')) {
        $(".js_selectUsrArea").show();
      } else {
        $(".js_selectUsrArea").hide();
      }
    }
});