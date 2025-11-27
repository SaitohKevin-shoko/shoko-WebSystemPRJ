function selectUsersList() {

    var flg = true;
   if (document.forms[0].rsv210SelectUsersKbn.checked) {
       flg = true;
   } else {
       flg = false;
   }
   oElements = document.getElementsByName("users_l");
   var defUserAry = document.forms[0].users_l.options;
   var defLength = defUserAry.length;
   for (i = defLength - 1; i >= 0; i--) {
       if (defUserAry[i].value != -1) {
           defUserAry[i].selected = flg;
       }
   }
}

function selectPubUsersList() {
   var flg = true;
   if (document.forms[0].rsv210SelectPubUsersKbn.checked) {
       flg = true;
   } else {
       flg = false;
   }
   oElements = document.getElementById("users_r");
   var defUserAry = document.forms[0].rsv210RightUsrGrpSid.options;
   var defLength = defUserAry.length;
   for (i = defLength - 1; i >= 0; i--) {
       if (defUserAry[i].value != -1) {
           defUserAry[i].selected = flg;
       }
   }
}

//午前
function setAmTime() {
  var frHour = $(':hidden[name="rsv210AmFrHour"]').val();
  var frMinute = $(':hidden[name="rsv210AmFrMin"]').val();
  var toHour = $(':hidden[name="rsv210AmToHour"]').val();
  var toMinute = $(':hidden[name="rsv210AmToMin"]').val();
  var frTime = String(frHour).padStart(2, '0') + ":" + String(frMinute).padStart(2, '0');
  var toTime = String(toHour).padStart(2, '0') + ":" + String(toMinute).padStart(2, '0');

  $("input[name='rsv210TimeFr']").val(frTime);
  $("input[name='rsv210TimeTo']").val(toTime);
}

//午後
function setPmTime() {
  var frHour = $(':hidden[name="rsv210PmFrHour"]').val();
  var frMinute = $(':hidden[name="rsv210PmFrMin"]').val();
  var toHour = $(':hidden[name="rsv210PmToHour"]').val();
  var toMinute = $(':hidden[name="rsv210PmToMin"]').val();
  var frTime = String(frHour).padStart(2, '0') + ":" + String(frMinute).padStart(2, '0');
  var toTime = String(toHour).padStart(2, '0') + ":" + String(toMinute).padStart(2, '0');

  $("input[name='rsv210TimeFr']").val(frTime);
  $("input[name='rsv210TimeTo']").val(toTime);
}

//終日
function setAllTime() {
  var frHour = $(':hidden[name="rsv210AllDayFrHour"]').val();
  var frMinute = $(':hidden[name="rsv210AllDayFrMin"]').val();
  var toHour = $(':hidden[name="rsv210AllDayToHour"]').val();
  var toMinute = $(':hidden[name="rsv210AllDayToMin"]').val();
  var frTime = String(frHour).padStart(2, '0') + ":" + String(frMinute).padStart(2, '0');
  var toTime = String(toHour).padStart(2, '0') + ":" + String(toMinute).padStart(2, '0');

  $("input[name='rsv210TimeFr']").val(frTime);
  $("input[name='rsv210TimeTo']").val(toTime);
}

$(function() {
    $(document).on("click", ".js_public", function(){
      var val = $(this).val();
      if (val == 3) {
        $(".js_selectUsrArea").show();
      } else {
        $(".js_selectUsrArea").hide();
      }
    });

    //初期表示
    if ($('input[name="rsv210RsyPublic"]:checked').val()) {
      var value = $('input[name="rsv210RsyPublic"]:checked').val();
      if (value == 3) {
        $(".js_selectUsrArea").show();
      } else {
        $(".js_selectUsrArea").hide();
      }
    }
});