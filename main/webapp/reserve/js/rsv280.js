function changeEnableDisablePeriod() {
  if (document.forms[0].rsv280PeriodKbn[0].checked) {
     document.getElementById('rsvPeriodArea1').rowspan=2;
     $('#rsvPeriodArea2').show();
  } else {
     document.getElementById('rsvPeriodArea1').rowspan=1;
     $('#rsvPeriodArea2').hide();
  }
}

function changeEnableDisable() {
  if (document.forms[0].rsv280EditKbn[0].checked) {
     document.getElementById('rsvEditArea1').rowspan=2;
     $('#rsvEditArea2').show();
  } else {
     document.getElementById('rsvEditArea1').rowspan=1;
     $('#rsvEditArea2').hide();
  }
}

function changeEnableDisablePublic() {
    if (document.forms[0].rsv280PublicKbn[0].checked) {
       document.getElementById('rsvPublicArea1').rowspan=2;
       $('#rsvPublicArea2').show();
       if ($("#rsv280Public3").is(':checked')) {
        $(".js_selectUsrArea").show();
      } else {
        $(".js_selectUsrArea").hide();
      }
    } else {
       document.getElementById('rsvPublicArea1').rowspan=1;
       $('#rsvPublicArea2').hide();
    }
}

function selectPubUsersList() {
   var flg = true;
   if (document.forms[0].rsv280SelectUsersKbn.checked) {
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
	setHmParam($("input[name='rsv280DefFrTime']"),
        $("input[name='rsv280DefFrH']"),
        $("input[name='rsv280DefFrM']"));
    setHmParam($("input[name='rsv280DefToTime']"),
        $("input[name='rsv280DefToH']"),
        $("input[name='rsv280DefToM']"));
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
    if ($("#rsv280PublicKbn_01").is(':checked')) {
      if ($("#rsv280Public3").is(':checked')) {
        $(".js_selectUsrArea").show();
      } else {
        $(".js_selectUsrArea").hide();
      }
    }
});